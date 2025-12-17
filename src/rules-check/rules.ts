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

export function EvaluateERCRules(visitor: ParserVisitor, graph: Graph,
    nets: ComponentPinNetPair[]) {
    const ruleCheckItems = [];
    const creationCtx = visitor.creationCtx;

    ruleCheckItems.push(
        ...RuleCheck_UnconnectedPinsWires(graph),
        ...RuleCheck_NoConnectOnConnectedPin(graph, nets)
    );

    const reportItems: { start: Token, type: ERC_Rules, message: string }[] = [];

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
                        message: `Unconnected pin ${item.pin} for component`
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
                const token = getComponentFirstCtxToken(instance);
                if (token) {
                    reportItems.push({
                        type,
                        start: token,
                        message: `No connect on connected pin`
                    });
                }
            }
                break;
        }
    });

    // Sort the report items
    const sortedReport = reportItems.toSorted((a, b) => {
        return a.start.start - b.start.start;
    });

    if (sortedReport.length > 0) {
        console.log(`ERC found ${sortedReport.length} items:`);

        sortedReport.forEach((item, index) => {
            console.log(`${(index + 1).toString().padStart(3)}. line ${item.start.line}, column ${item.start.column}: ${item.type} - ${item.message}`);
        });
    }
}

function getComponentFirstCtxToken(instance: ClassComponent): Token | null {
    if (instance.ctxReferences.length > 0) {
        const { ctx } = instance.ctxReferences[0];
        return ctx.start!;
    }

    return null;
}