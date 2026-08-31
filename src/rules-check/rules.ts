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
import { RuleCheck_PinTypeERC } from "./pin-type-erc.js";
import { mergeErcNetBridgedNets } from "./erc-net-bridge.js";
import { ComponentPinNetPair } from "src/objects/types";
import { ClassComponent } from "src/objects/ClassComponent.js";
import { Wire } from "src/objects/Wire.js";
import { Token } from "antlr4ng";
import { RuntimeExecutionError } from "../errors.js";
import { ERCSeverity, ERC_Rules, ERC_RuleSeverity } from './severity-defaults.js';

export { ERCSeverity, ERC_Rules, ERC_RuleSeverity } from './severity-defaults.js';

export type ERCReportItem = {
    start: Token | null,
    type: ERC_Rules,
    severity: ERCSeverity,
    message: string,
}

export function EvaluateERCRules(visitor: ParserVisitor, graph: Graph,
    nets: ComponentPinNetPair[], documentRules: Record<string, string> = {}): ERCReportItem[] {
    const ruleCheckItems = [];
    const creationCtx = visitor.creationCtx;
    const ercNets = mergeErcNetBridgedNets(nets);

    ruleCheckItems.push(
        ...RuleCheck_UnconnectedPinsWires(graph, nets),
        ...RuleCheck_NoConnectOnConnectedPin(graph, nets),
        ...RuleCheck_PowerNetERC(nets),
        ...RuleCheck_PinTypeERC(ercNets)
    );

    const reportItems: ERCReportItem[] = [];

    ruleCheckItems.forEach(item => {
        const { type } = item;
        switch (type) {
            case ERC_Rules.UnconnectedPin: {
                const instance = item.instance as ClassComponent;
                const token = getComponentFirstCtxToken(instance);
                if (token) {
                    const refdes = instance.assignedRefDes
                        ? `: ${instance.assignedRefDes} pin ${item.pin}`
                        : '';
                    reportItems.push({
                        type,
                        start: token,
                        message: `Unconnected pin${refdes}`
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
                if (token) {
                    const refdes = instance.assignedRefDes
                        ? `: ${instance.assignedRefDes} pin ${item.pin}`
                        : '';
                    reportItems.push({ type, start: token,
                        message: `Unconnected power_reference pin${refdes}` });
                }
            }
                break;

            case ERC_Rules.PowerInputUnconnected: {
                const instance = item.instance as ClassComponent;
                const token = getComponentFirstCtxToken(instance);
                if (token) {
                    const refdes = instance.assignedRefDes
                        ? `: ${instance.assignedRefDes} pin ${item.pin}`
                        : '';
                    reportItems.push({ type, start: token,
                        message: `Unconnected power_input pin${refdes}` });
                }
            }
                break;

            case ERC_Rules.PowerOutputUnconnected: {
                const instance = item.instance as ClassComponent;
                const token = getComponentFirstCtxToken(instance);
                if (token) {
                    const refdes = instance.assignedRefDes
                        ? `: ${instance.assignedRefDes} pin ${item.pin}`
                        : '';
                    reportItems.push({ type, start: token,
                        message: `Unconnected power_output pin${refdes}` });
                }
            }
                break;

            case ERC_Rules.PowerSymbolUnconnected: {
                const instance = item.instance as ClassComponent;
                const token = getComponentFirstCtxToken(instance);
                if (token) {
                    let displayValue = "";
                    if (instance.assignedRefDes) {
                        displayValue = instance.assignedRefDes;
                    }

                    if (displayValue !== "") {
                        displayValue = `: ${displayValue}`;
                    }
                    reportItems.push({
                        type, start: token,
                        message: `Unconnected power symbol pin${displayValue}`
                    })
                };
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

            case ERC_Rules.PinTypeOutputMultiple: {
                const instance = item.instance as ClassComponent;
                const token = getComponentFirstCtxToken(instance);
                if (token) reportItems.push({ type, start: token,
                    message: `Net '${item.netName}' has multiple output pins — possible signal conflict` });
            }
                break;

            case ERC_Rules.PinTypeInputUndriven: {
                const instance = item.instance as ClassComponent;
                const token = getComponentFirstCtxToken(instance);
                if (token) reportItems.push({ type, start: token,
                    message: `Net '${item.netName}' has input pin(s) but no driving output` });
            }
                break;

            case ERC_Rules.PinTypePassiveOnly: {
                const instance = item.instance as ClassComponent;
                const token = getComponentFirstCtxToken(instance);
                if (token) reportItems.push({ type, start: token,
                    message: `Net '${item.netName}' has only passive pins — no driver or typed receiver` });
            }
                break;

            case ERC_Rules.PinTypeBidirectionalOnPowerNet: {
                const instance = item.instance as ClassComponent;
                const token = getComponentFirstCtxToken(instance);
                if (token) reportItems.push({ type, start: token,
                    message: `Bidirectional pin on power net '${item.netName}'` });
            }
                break;

            case ERC_Rules.PinTypeOutputDrivingPowerInput: {
                const instance = item.instance as ClassComponent;
                const token = getComponentFirstCtxToken(instance);
                if (token) reportItems.push({ type, start: token,
                    message: `Signal output pin driving power net '${item.netName}' directly — missing power symbol` });
            }
                break;
        }
    });

    // Attach severity (with optional per-rule override) and filter out off rules.
    const validSeverities = new Set<string>(Object.values(ERCSeverity));
    const withSeverity = reportItems
        .map(item => {
            const override = documentRules[item.type];
            if (override !== undefined && !validSeverities.has(override)) {
                throw new RuntimeExecutionError(
                    `Invalid severity '${override}' for rule '${item.type}'. ` +
                    `Valid values: ${[...validSeverities].join(', ')}`
                );
            }
            const severity = (override as ERCSeverity | undefined) ?? ERC_RuleSeverity[item.type];
            return { ...item, severity };
        })
        .filter(item => item.severity !== ERCSeverity.Off);

    // Sort the report items based on file position. Null-start items (schematic-level) sort last.
    const sortedReport = withSeverity.toSorted((a, b) => {
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