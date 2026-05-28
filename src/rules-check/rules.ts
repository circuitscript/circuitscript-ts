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
import { RuleCheck_PowerNetERC } from "./power-net-erc.js";
import { ComponentPinNetPair } from "src/objects/types";
import { ClassComponent } from "src/objects/ClassComponent.js";
import { Wire } from "src/objects/Wire.js";
import { Token } from "antlr4ng";

export enum ERC_Rules {

    // Power related
    PowerNetWithoutDriver = 'POWER-NET-WITHOUT-DRIVER', // legacy — remove after migration

    /** [ERROR] power_reference pin is connected to a signal/unnamed net with no power symbol */
    PowerReferenceOnUnnamedNet = 'POWER-REFERENCE-ON-UNNAMED-NET',

    /** [WARNING] power_input pin is connected to a net with no power symbol declaration */
    PowerInputOnUnnamedNet = 'POWER-INPUT-ON-UNNAMED-NET',

    /** [WARNING] power_output pin is driving a net with no power symbol declaration */
    PowerOutputOnUnnamedNet = 'POWER-OUTPUT-ON-UNNAMED-NET',

    /** [WARNING] power net has power_input pins but no power_output source */
    PowerNetNoSource = 'POWER-NET-NO-SOURCE',

    /** [WARNING] power net has power_input pins but no power_reference connection */
    PowerNetNoReference = 'POWER-NET-NO-REFERENCE',

    /** [WARNING] power net is declared (has power symbol) but has no physical pin connections */
    PowerNetUnused = 'POWER-NET-UNUSED',

    /** [ERROR] two differently-named power symbols are shorted onto the same net */
    PowerNetNameConflict = 'POWER-NET-NAME-CONFLICT',

    /** [WARNING] multiple power_output pins on the same net — possible power conflict */
    PowerNetMultipleOutputs = 'POWER-NET-MULTIPLE-OUTPUTS',

    /** [ERROR] power_reference pin is on a net with conflicting power symbol names */
    PowerReferenceAmbiguousNet = 'POWER-REFERENCE-AMBIGUOUS-NET',

    /** [ERROR] power_reference pin is not wired to any net */
    PowerReferenceUnconnected = 'POWER-REFERENCE-UNCONNECTED',

    /** [ERROR] power_input pin is not wired to any net */
    PowerInputUnconnected = 'POWER-INPUT-UNCONNECTED',

    /** [WARNING] power_output pin is not wired to any net */
    PowerOutputUnconnected = 'POWER-OUTPUT-UNCONNECTED',

    /** [WARNING] power symbol pin is not wired to any net */
    PowerSymbolUnconnected = 'POWER-SYMBOL-UNCONNECTED',

    /** [WARNING] no power_reference pins found anywhere in the schematic — no ground reference defined */
    NoPowerReferenceInSchematic = 'NO-POWER-REFERENCE-IN-SCHEMATIC',

    // Connections related
    UnconnectedPin = 'UNCONNECTED-PIN',
    UnconnectedWire = 'UNCONNECTED-WIRE',
    NoConnectOnConnectedPin = 'NO-CONNECT-ON-CONNECTED-PIN'
}

export type ERCReportItem = {
    start: Token | null,
    type: ERC_Rules,
    message: string,
}

export function EvaluateERCRules(visitor: ParserVisitor, graph: Graph,
    nets: ComponentPinNetPair[]): ERCReportItem[] {
    const ruleCheckItems = [];
    const creationCtx = visitor.creationCtx;

    ruleCheckItems.push(
        ...RuleCheck_UnconnectedPinsWires(graph, nets),
        ...RuleCheck_NoConnectOnConnectedPin(graph, nets),
        ...RuleCheck_PowerNetERC(nets)
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

            case ERC_Rules.PowerNetWithoutDriver: {
                const instance = item.instance as ClassComponent;
                const token = getComponentFirstCtxToken(instance);
                if (token) {
                    reportItems.push({
                        type,
                        start: token,
                        message: `Power net '${item.netName}' has no power driver`
                    });
                }
            }
                break;

            case ERC_Rules.PowerReferenceOnUnnamedNet: {
                const instance = item.instance as ClassComponent;
                const token = getComponentFirstCtxToken(instance);
                if (token) reportItems.push({ type, start: token,
                    message: `Pin 'power_reference' on net '${item.netName}' has no power symbol — possibly connected to a signal net` });
            }
                break;

            case ERC_Rules.PowerInputOnUnnamedNet: {
                const instance = item.instance as ClassComponent;
                const token = getComponentFirstCtxToken(instance);
                if (token) reportItems.push({ type, start: token,
                    message: `Power input pin on net '${item.netName}' has no power symbol declaration` });
            }
                break;

            case ERC_Rules.PowerOutputOnUnnamedNet: {
                const instance = item.instance as ClassComponent;
                const token = getComponentFirstCtxToken(instance);
                if (token) reportItems.push({ type, start: token,
                    message: `Power output pin on net '${item.netName}' has no power symbol declaration` });
            }
                break;

            case ERC_Rules.PowerNetNoSource: {
                const instance = item.instance as ClassComponent;
                const token = getComponentFirstCtxToken(instance);
                if (token) reportItems.push({ type, start: token,
                    message: `Power net '${item.netName}' has power_input pins but no power_output source` });
            }
                break;

            case ERC_Rules.PowerNetNoReference: {
                const instance = item.instance as ClassComponent;
                const token = getComponentFirstCtxToken(instance);
                if (token) reportItems.push({ type, start: token,
                    message: `Power net '${item.netName}' has power_input pins but no power_reference connection` });
            }
                break;

            case ERC_Rules.PowerNetUnused: {
                const instance = item.instance as ClassComponent;
                const token = getComponentFirstCtxToken(instance);
                if (token) reportItems.push({ type, start: token,
                    message: `Power net '${item.netName}' is declared but has no physical connections` });
            }
                break;

            case ERC_Rules.PowerNetNameConflict: {
                const instance = item.instance as ClassComponent;
                const token = getComponentFirstCtxToken(instance);
                if (token) reportItems.push({ type, start: token,
                    message: `Power net name conflict: nets ${item.netName} are shorted together` });
            }
                break;

            case ERC_Rules.PowerNetMultipleOutputs: {
                const instance = item.instance as ClassComponent;
                const token = getComponentFirstCtxToken(instance);
                if (token) reportItems.push({ type, start: token,
                    message: `Power net '${item.netName}' has multiple power_output pins — possible power conflict` });
            }
                break;

            case ERC_Rules.PowerReferenceAmbiguousNet: {
                const instance = item.instance as ClassComponent;
                const token = getComponentFirstCtxToken(instance);
                if (token) reportItems.push({ type, start: token,
                    message: `power_reference pin is on a net with conflicting power symbol names: ${item.netName}` });
            }
                break;

            case ERC_Rules.PowerReferenceUnconnected: {
                const instance = item.instance as ClassComponent;
                const token = getComponentFirstCtxToken(instance);
                if (token) reportItems.push({ type, start: token,
                    message: `Unconnected power_reference pin: ${instance.assignedRefDes} pin ${item.pin}` });
            }
                break;

            case ERC_Rules.PowerInputUnconnected: {
                const instance = item.instance as ClassComponent;
                const token = getComponentFirstCtxToken(instance);
                if (token) reportItems.push({ type, start: token,
                    message: `Unconnected power_input pin: ${instance.assignedRefDes} pin ${item.pin}` });
            }
                break;

            case ERC_Rules.PowerOutputUnconnected: {
                const instance = item.instance as ClassComponent;
                const token = getComponentFirstCtxToken(instance);
                if (token) reportItems.push({ type, start: token,
                    message: `Unconnected power_output pin: ${instance.assignedRefDes} pin ${item.pin}` });
            }
                break;

            case ERC_Rules.PowerSymbolUnconnected: {
                const instance = item.instance as ClassComponent;
                const token = getComponentFirstCtxToken(instance);
                if (token) reportItems.push({ type, start: token,
                    message: `Unconnected power symbol pin: ${instance.assignedRefDes}` });
            }
                break;

            case ERC_Rules.NoPowerReferenceInSchematic: {
                reportItems.push({ type, start: null,
                    message: `No power_reference pin found in schematic — no ground reference defined` });
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

    // Sort the report items based on file position. Null-start items (schematic-level) sort last.
    const sortedReport = reportItems.toSorted((a, b) => {
        if (a.start === null && b.start === null) return 0;
        if (a.start === null) return 1;
        if (b.start === null) return -1;
        return a.start.line !== b.start.line
            ? a.start.line - b.start.line
            : a.start.column - b.start.column;
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