import { Edge, Graph } from "@dagrejs/graphlib";
import { RenderItemType } from "../graph.js";
import { RenderComponent, RenderWire } from "../layout.js";
import { PinId } from "../objects/PinDefinition.js";
import { ERC_Rules } from "./rules.js";

/**
 * For each component pin, check the number of other pins in the same net.
 * @param components
 * @param nets 
 */
export function RuleCheck_UnconnectedPinsWires(graph: Graph) {
    const items: any[] = [];
    const allNodes = graph.nodes();

    allNodes.forEach(node => {
        const nodeInfo = graph.node(node);
        if (nodeInfo[0] === RenderItemType.Component) {
            const { component } = nodeInfo[1] as RenderComponent;

            // Find all edges connected to this node/component
            const edges = graph.nodeEdges(node) as Edge[];

            const instanceName = component.instanceName;
            const connectedPins: string[] = [];

            // Either side of the edge must be the component
            edges.forEach(edge => {
                const edgeInfo = graph.edge(edge.v, edge.w);
                let pin!: PinId;
                if (edge.v === instanceName) {
                    pin = edgeInfo[1];
                } else if (edge.w === instanceName) {
                    pin = edgeInfo[3];
                }
                
                connectedPins.push(pin.getHashValue());
            });

            const pinIds = Array.from(component.pins.keys());
            pinIds.forEach(pinId => {
                const hashValue = pinId.getHashValue();
                if (connectedPins.indexOf(hashValue) === -1) {
                    // Missing pin!
                    items.push({
                        type: ERC_Rules.UnconnectedPin,
                        instance: component,
                        pin: pinId,
                    })
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
    });

    return items;
}