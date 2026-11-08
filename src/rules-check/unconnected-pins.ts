/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Edge, Graph } from "@dagrejs/graphlib";
import { RenderItemType } from "../render/graph.js";
import { RenderComponent, RenderWire } from "../render/layout.js";
import { PinId } from "../objects/PinDefinition.js";
import { PinTypes } from "../objects/PinTypes.js";
import { Net } from "../objects/Net.js";
import { ClassComponent } from "../objects/ClassComponent.js";
import { ERC_Rules, isPhysicalPin, makeComponentPinHash } from "./rules.js";
import { ComponentTypes } from "../globals.js";
import { Wire } from "../objects/Wire.js";

export type UnconnectedItem = {
    type: ERC_Rules;
    instance?: ClassComponent;
    pin?: PinId;
    wire?: Wire;
};

export function RuleCheck_UnconnectedPinsWires(graph: Graph,
    netPhysicalPins: Map<Net, [ClassComponent, PinId][]>,
    pinMapping: Map<string, Net>,
    noConnectNets: Set<Net>): UnconnectedItem[] {
    const items: UnconnectedItem[] = [];
    const allNodes = graph.nodes();

    for (const node of allNodes){
        const nodeInfo = graph.node(node);
        if (nodeInfo[0] === RenderItemType.Component) {
            const renderComponent = nodeInfo[1] as RenderComponent;
            const { component, unitId } = renderComponent;

            // Graphic components (text, no_connect, frames) are not electrical parts
            if (component.typeProp === ComponentTypes.graphic) {
                continue;
            }

            const componentUnit = component.getUnit(unitId);
            const instanceName = componentUnit.instanceName;

            for (const pinId of componentUnit.pins.keys()) {
                if (!isPhysicalPin(component, pinId)) {
                    continue;
                }

                const net = pinMapping.get(makeComponentPinHash(instanceName, pinId));
                if (net !== undefined && noConnectNets.has(net)) {
                    continue;
                }
                if (net !== undefined && (netPhysicalPins.get(net)?.length ?? 0) > 1) {
                    continue;
                }

                // Check for power-specific type to emit targeted rule
                const pinDef = componentUnit.pins.get(pinId);
                let ruleType = ERC_Rules.UnconnectedPin;
                if (pinDef) {
                    switch (pinDef.pinType) {
                        case PinTypes.PowerReference: ruleType = ERC_Rules.PowerReferenceUnconnected; break;
                        case PinTypes.PowerInput:     ruleType = ERC_Rules.PowerInputUnconnected;     break;
                        case PinTypes.PowerOutput:    ruleType = ERC_Rules.PowerOutputUnconnected;    break;
                        case PinTypes.Power:          ruleType = ERC_Rules.PowerSymbolUnconnected;    break;
                    }
                }
                items.push({
                    type: ruleType,
                    instance: component,
                    pin: pinId,
                });
            }
        } else if (nodeInfo[0] === RenderItemType.Wire){
            const renderWire = nodeInfo[1] as RenderWire;
            const edges = graph.nodeEdges(node) as Edge[];

            // If the wire only has 1 edge, then it is not connected anywhere else.
            if (edges.length < 2){
                items.push({
                    type: ERC_Rules.UnconnectedWire,
                    wire: renderWire.wire,  // Reference the wire object 
                                            //  that cause this issue.
                })
            }
        }
    }

    return items;
}