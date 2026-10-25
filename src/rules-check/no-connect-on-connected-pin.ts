/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Edge, Graph } from "@dagrejs/graphlib";
import { GraphNodeInfo, RenderItemType } from "../render/graph.js";
import { RenderComponent } from "../render/layout.js";
import { ComponentPinNetPair } from "src/objects/types.js";
import { ClassComponent } from "../objects/ClassComponent.js";
import { PinTypes } from "../objects/PinTypes.js";
import { ComponentTypes } from "../globals.js";
import { Net } from "../objects/Net.js";
import { PinId } from "../objects/PinDefinition.js";
import { ERC_Rules } from "./rules.js";

/**
 * A pin counts as a physical pin unless it belongs to a net marker (supply,
 * label), bus, port, module, graphic or internal path object, or is a bus pin.
 */
function isPhysicalPin(component: ClassComponent, pin: PinId): boolean {
    switch (component.typeProp) {
        case ComponentTypes.net:
        case ComponentTypes.bus:
        case ComponentTypes.port:
        case ComponentTypes.module:
        case ComponentTypes.graphic:
            return false;
    }

    if (component.isNetLabel || component._isInternalPathObject) {
        return false;
    }

    return component.pins.get(pin)?.pinType !== PinTypes.Bus;
}

/**
 * A no_connect is valid on a net with at most one physical pin. This is a net
 * check.
 * @param graph 
 * @returns 
 */
export function RuleCheck_NoConnectOnConnectedPin(graph: Graph, 
    nets: ComponentPinNetPair[]) {
    const items = [];

    // Physical pins in each net
    const netPhysicalPins = new Map<Net, [ClassComponent, PinId][]>();

    // Links component-pin to net.
    const pinMapping = new Map<string, Net>();

    const makeComponentPinHash =
        (instanceName: string, pin: PinId): string => {
            return instanceName + '-' + pin.getHashValue();
        };

    for (const [component, pin, net] of nets) {
        const unit = component.getUnitForPin(pin);
        pinMapping.set(makeComponentPinHash(unit.instanceName, pin), net);

        if (isPhysicalPin(component, pin)) {
            if (!netPhysicalPins.has(net)) {
                netPhysicalPins.set(net, []);
            }
            netPhysicalPins.get(net)!.push([component, pin]);
        }
    };

    for (const node of graph.nodes()) {
        const nodeInfo = graph.node(node) as GraphNodeInfo;
        if (nodeInfo[0] !== RenderItemType.Component) {
            continue;
        }

        const { component } = nodeInfo[1] as RenderComponent;
        if (!component.hasParam('no_connect')) {
            continue;
        }

        const instanceName = component.getUnit().instanceName;
        const edges = graph.nodeEdges(node) as Edge[];
        const reportedNets = new Set<Net>();

        edges.forEach(edge => {
            const edgeInfo = graph.edge(edge.v, edge.w);
            let targetComponentName: string;
            let targetPin: PinId;

            if (edge.v === instanceName) {
                targetComponentName = edge.w;
                targetPin = edgeInfo[3];
            } else {
                targetComponentName = edge.v;
                targetPin = edgeInfo[1];
            }

            const net = pinMapping.get(
                makeComponentPinHash(targetComponentName, targetPin));
            if (net === undefined || reportedNets.has(net)) {
                return;
            }

            const physicalPins = netPhysicalPins.get(net) ?? [];
            if (physicalPins.length <= 1) {
                return;
            }

            reportedNets.add(net);

            // Report the edge target if it is a physical pin, otherwise the
            // first physical pin in the net.
            const [targetComponent, reportPin] = physicalPins.find(
                ([c, p]) => p.getHashValue() === targetPin.getHashValue()
                    && c.getUnitForPin(p).instanceName === targetComponentName
            ) ?? physicalPins[0];

            items.push({
                type: ERC_Rules.NoConnectOnConnectedPin,
                instance: component, // The no_connect component
                target: {
                    instance: targetComponent,
                    pin: reportPin
                }
            })
        });
    }

    return items;
}
