import { Edge, Graph } from "@dagrejs/graphlib";
import { GraphNodeInfo, RenderItemType } from "../graph.js";
import { RenderComponent } from "../layout.js";
import { ComponentPinNetPair } from "src/objects/types.js";
import { Net } from "../objects/Net.js";
import { PinId } from "../objects/PinDefinition.js";
import { ERC_Rules } from "./rules.js";

/**
 * If component pin is connected to another component pin. This is a net check
 * @param graph 
 * @returns 
 */
export function RuleCheck_NoConnectOnConnectedPin(graph: Graph, 
    nets: ComponentPinNetPair[]) {
    // Find all the no connect pins
    const allNodes = graph.nodes();

    const items = [];

    // Collate number of components in each net
    const netComponentPins = new Map<Net, [instanceName: string, PinId][]>();

    // Links component-pin to net.
    const pinMapping = new Map<string, Net>();

    const makeComponentPinHash =
        (instanceName: string, pin: PinId): string => {
            return instanceName + '-' + pin.getHashValue();
        };

    nets.forEach(item => {
        const [component, pin, net] = item;

        if (!netComponentPins.has(net)) {
            netComponentPins.set(net, []);
        }

        const items = netComponentPins.get(net)!;
        items.push([
            component.instanceName,
            pin
        ]);

        netComponentPins.set(net, items);

        const unit = component.getUnitForPin(pin);
        pinMapping.set(makeComponentPinHash(
            unit.instanceName, pin), net);
    });

    allNodes.forEach(node => {
        const nodeInfo = graph.node(node) as GraphNodeInfo;
        if (nodeInfo[0] === RenderItemType.Component) {
            const { component } = nodeInfo[1] as RenderComponent;
            if (component.hasParam('no_connect')) {
                const instanceName = component.getUnit().instanceName;
                const edges = graph.nodeEdges(node) as Edge[];

                const otherNodes: string[] = [];

                edges.forEach(edge => {
                    const edgeInfo = graph.edge(edge.v, edge.w);
                    let targetComponentName: string;
                    let targetPin: PinId;

                    if (edge.v === instanceName) {
                        otherNodes.push(edge.w);
                        targetComponentName = edge.w;
                        targetPin = edgeInfo[3];

                    } else {
                        targetComponentName = edge.v;
                        targetPin = edgeInfo[1];
                    }

                    const componentPinHash =
                        makeComponentPinHash(targetComponentName, targetPin);

                    if (pinMapping.has(componentPinHash)) {
                        const net = pinMapping.get(componentPinHash)!;
                        const tmpNetComponentPins = netComponentPins.get(net)!;

                        // Go through all component pins in the net and remove
                        // the no_connect component-pin and the current target
                        // component-pin.
                        const remainingItems = tmpNetComponentPins.filter(item => {
                            if (item[0] === instanceName) {
                                return false;
                            } else if (item[0] === targetComponentName 
                                && item[1].getHashValue() === targetPin.getHashValue()) {
                                
                                return false;
                            }

                            return true;
                        });

                        if (remainingItems.length > 0) {
                            const targetInfo = 
                                graph.node(targetComponentName) as GraphNodeInfo;
                            const tmpComponent = targetInfo[1] as RenderComponent;

                            items.push({
                                type: ERC_Rules.NoConnectOnConnectedPin,
                                instance: component, // The no_connect component
                                target: {
                                    instance: tmpComponent.component,
                                    pin: targetPin
                                }
                            })
                        }
                    }
                });
            }
        }
    });

    return items;
}
