/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Graph } from "@dagrejs/graphlib";

import { ParserVisitor } from "src/visitor";
import { RuleCheck_UnconnectedPinsWires } from "./unconnected-pins.js";
import { RuleCheck_NoConnectOnConnectedPin } from "./no-connect-on-connected-pin.js";
import { ComponentPinNetPair } from "src/objects/types";
import { ClassComponent } from "src/objects/ClassComponent.js";
import { Wire } from "src/objects/Wire.js";
import { Token } from "antlr4ng";

export enum ERC_Rules {

    // Connections related
    UnconnectedPin = 'UNCONNECTED-PIN',
    UnconnectedWire = 'UNCONNECTED-WIRE',
    NoConnectOnConnectedPin = 'NO-CONNECT-ON-CONNECTED-PIN'
}

export type ERCReportItem = {
    start: Token,
    type: ERC_Rules,
    message: string,
}

export function EvaluateERCRules(visitor: ParserVisitor, graph: Graph,
    nets: ComponentPinNetPair[]): ERCReportItem[] {
    const ruleCheckItems = [];
    const creationCtx = visitor.creationCtx;

    ruleCheckItems.push(
        ...RuleCheck_UnconnectedPinsWires(graph),
        ...RuleCheck_NoConnectOnConnectedPin(graph, nets)
    );

    const reportItems: ERCReportItem[] = [];

    ruleCheckItems.forEach(item => {
        const { type } = item;
        switch (type) {
            case ERC_Rules.UnconnectedPin: {
                const instance = item.instance as ClassComponent;
                const token = getComponentFirstCtxToken(instance);
                if (token) {
                    reportItems.push({
                        type,
                        start: token,
                        message: `Unconnected pin: ${instance.assignedRefDes} pin ${item.pin}`
                    });
                }
            }
                break;

            case ERC_Rules.UnconnectedWire: {
                const wire = item.wire as Wire;
                if (creationCtx.has(wire)) {
                    const tmpCtx = creationCtx.get(wire)!;
                    const startToken = tmpCtx.start!;

                    reportItems.push({
                        type,
                        start: startToken,
                        message: `Unconnected wire end`
                    });
                }
            }
                break;

            case ERC_Rules.NoConnectOnConnectedPin: {
                const instance = item.instance as ClassComponent; // The no connect component
                const {instance: targetComponent, pin: targetPin} = item.target;

                let extra = '';
                if (targetComponent && targetComponent.assignedRefDes) {
                    extra = `: ${targetComponent.assignedRefDes} pin ${targetPin}`;
                }

                const token = getComponentFirstCtxToken(instance);
                if (token) {
                    reportItems.push({
                        type,
                        start: token,
                        message: `No connect on connected pin${extra}`
                    });
                }
            }
                break;
        }
    });

    // Sort the report items based on file position.
    const sortedReport = reportItems.toSorted((a, b) => {
        return a.start.start - b.start.start;
    });

    return sortedReport;
}

function getComponentFirstCtxToken(instance: ClassComponent): Token | null {
    if (instance.ctxReferences.length > 0) {
        const { ctx } = instance.ctxReferences[0];
        return ctx.start!;
    }

    return null;
}