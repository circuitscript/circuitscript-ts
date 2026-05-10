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
import { ComponentPinNetPair } from "../objects/types.js";
import { ERC_Rules } from "./rules.js";

export function RuleCheck_UnconnectedPinsWires(graph: Graph, nets: ComponentPinNetPair[] = []) {
    const items: any[] = [];
    const allNodes = graph.nodes();

    for (const node of allNodes){
        const nodeInfo = graph.node(node);
        if (nodeInfo[0] === RenderItemType.Component) {
            const renderComponent = nodeInfo[1] as RenderComponent;
            const { component, unitId } = renderComponent;

            // Find all edges connected to this node/component
            const edges = graph.nodeEdges(node) as Edge[];

            const componentUnit = component.getUnit(unitId);
            const instanceName = componentUnit.instanceName;
            const connectedUnitPins: string[] = [];

            // Either side of the edge must be the component
            edges.forEach(edge => {
                const edgeInfo = graph.edge(edge.v, edge.w);
                let pin!: PinId;
                if (edge.v === instanceName) {
                    pin = edgeInfo[1];
                } else if (edge.w === instanceName) {
                    pin = edgeInfo[3];
                }

                connectedUnitPins.push(pin.getHashValue());
            });

            const pinIds = Array.from(componentUnit.pins.keys());
            pinIds.forEach(pinId => {
                const hashValue = pinId.getHashValue();
                if (connectedUnitPins.indexOf(hashValue) === -1) {
                    // Missing pin — check for power-specific type to emit targeted rule
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
            });
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