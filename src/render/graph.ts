/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Edge, Graph } from "@dagrejs/graphlib";
import { SymbolGraphic, SymbolDrawing, SymbolPlaceholder, SymbolCustomModule, 
    SymbolCustom, SymbolPinDefintion } from "./draw_symbols.js";
import { ComponentTypes } from "../globals.js";
import { milsToMM } from "../helpers.js";
import { RenderFrame, RenderComponent, applyComponentParamsToSymbol, 
    RenderWire } from "./layout.js";
import { ClassComponent, ComponentUnit } from "../objects/ClassComponent.js";
import { SequenceItem, SequenceAction, FrameAction, SequenceActionWire } from "../objects/ExecutionScope.js";
import { Frame, FixedFrameIds, FrameParamKeys } from "../objects/Frame.js";
import { Net } from "../objects/Net.js";
import { NumericValue, numeric } from "../objects/NumericValue.js";
import { Logger } from "../logger.js";
import { ComponentPinNetPair, NetTypes } from "../objects/types.js";
import Matrix, { solve } from "ml-matrix";
import { getPinDefinition, PinId } from "../objects/PinDefinition.js";
import { Styles } from "src/styles.js";

export class NetGraph {

    logger: Logger;

    styles!: Styles;

    constructor(logger: Logger) {
        this.logger = logger;
    }

    setStyles(styles: Styles): void {
        this.styles = styles;
    }

    /** Given the sequence of actions (generated from parser), return a 
         * graph that links nodes (components and wires). */
    generateLayoutGraph(sequence: SequenceItem[],
        nets: [ClassComponent, pin: PinId, net: Net][]): {
            graph: Graph,
            containerFrames: RenderFrame[],
        } {

        this.print('===== creating graph and populating with nodes =====');

        let previousNode: string | null = null;
        let previousPin: number | null = null;

        const graph = new Graph({
            directed: true, // Set to true so that node1 -- node2 is 
            // not the same as node2 -- node1. Otherwise this
            // will replace the previously defined edge.

            compound: true, // Subgraphs supported
        });

        this.print('sequence length:', sequence.length);

        // This will be used to catch all other components that are not explicitly
        // within a defined frame.
        const baseFrame = new RenderFrame(new Frame(FixedFrameIds.BaseFrame));

        // Tracks the current frame that is active as the sequence actions
        // are executed.
        const frameStack: RenderFrame[] = [baseFrame];

        // Holds all frames that are encountered
        const containerFrames: RenderFrame[] = [baseFrame];

        // Maps nodes to the frames that are within
        const nodeFrames = new Map<string, RenderFrame>();

        // Based on the sequence steps create all the graph connections first and
        // determine the size of all items
        sequence.forEach((sequenceStep, index) => {
            const action = sequenceStep[0];
            let tmpComponent: RenderComponent;

            // Component related actions
            switch (action) {
                case SequenceAction.To:
                case SequenceAction.At: {
                    this.print(...sequenceStep);

                    // The pin number can be used to resolve the unitId.
                    const [, component, pin] =
                        sequenceStep as [string, ClassComponent, number];

                    const componentUnit = component.getUnitForPin(pin);
                    const tmpInstanceName = componentUnit.instanceName;

                    // If 'at' action, then previous node/pin should be reset.
                    if (action === SequenceAction.At){
                        previousNode = null;
                        previousPin = null;
                    }

                    if (!graph.hasNode(tmpInstanceName)) {
                        this.print('create instance', tmpInstanceName);

                        const { displayProp = null } = componentUnit;

                        let tmpSymbol: SymbolGraphic;

                        if (displayProp instanceof SymbolDrawing) {
                            tmpSymbol = new SymbolPlaceholder(displayProp);
                            tmpSymbol.setStyles(this.styles);

                            tmpSymbol.drawing.logger = this.logger;

                        } else {
                            const symbolPinDefinitions = generateLayoutPinDefinition(componentUnit);

                            if (component.typeProp === ComponentTypes.module) {
                                tmpSymbol = new SymbolCustomModule(symbolPinDefinitions,
                                    componentUnit.pinsMaxPositions);
                            } else {
                                tmpSymbol = new SymbolCustom(symbolPinDefinitions,
                                    componentUnit.pinsMaxPositions);
                            }
                        }

                        // TODO: change this to take the params from the
                        // component unit.
                        applyComponentParamsToSymbol(componentUnit, tmpSymbol);

                        // Draw symbol in memory to determine the size/bounds.
                        tmpSymbol.refreshDrawing();

                        const { width: useWidth, height: useHeight } = tmpSymbol.size();

                        tmpComponent = new RenderComponent(component, 
                            componentUnit.unitId, useWidth, useHeight);
                        tmpComponent.symbol = tmpSymbol;

                        // Record the sequence number (index of the array) to determine priority
                        graph.setNode(tmpInstanceName, [RenderItemType.Component, tmpComponent, index]);

                        // All components must belong within a frame.
                        let useFrame = frameStack[frameStack.length - 1];
                        if (nodeFrames.has(previousNode)){
                            const previousNodeFrame = nodeFrames.get(previousNode)!;
                            if (previousNodeFrame !== useFrame){
                                useFrame = previousNodeFrame;
                            }
                        }

                        // The component may not be explicitly assigned within a frame, but 
                        // indirectly assigned.. so this component should go within the frame too
                        useFrame && useFrame.innerItems.push(tmpComponent);

                        nodeFrames.set(tmpInstanceName, useFrame);
                    }

                    if (action === SequenceAction.To && previousNode && previousPin) {
                        this.setGraphEdge(graph, previousNode, tmpInstanceName,
                            makeEdgeValue(previousNode, previousPin, tmpInstanceName, pin, index));
                    }

                    previousNode = tmpInstanceName
                    previousPin = pin;
                    break;
                }

                case SequenceAction.Wire: {
                    // draw wires
                    const [, wireId, , wire] =
                        sequenceStep as SequenceActionWire;

                    let useNet!: Net;
                    const wireSegments = wire.path;

                    if (previousNode !== null) {
                        const [prevNodeType, prevNodeItem] = graph.node(previousNode);
                        if (prevNodeType === RenderItemType.Component) {
                            // Find the net of the wire
                            const matchingItem = nets.find(([comp, pin]) => {
                                // Assume first unit
                                const unit = comp.getUnitForPin(pin);
                                return unit.instanceName === previousNode
                                    && pin.equals(previousPin);
                            });

                            if (matchingItem !== undefined) {
                                useNet = matchingItem[2];
                            }

                        } else if (prevNodeType === RenderItemType.Wire) {
                            useNet = (prevNodeItem as RenderWire).net;
                        }
                    }

                    const renderWire = new RenderWire(useNet, numeric(0), 
                        numeric(0), wireSegments, wire);
                    renderWire.id = wireId;
                    renderWire.netName = useNet.toString();

                    const wireName = getWireName(renderWire.id);

                    // Record the sequence number to determine priority
                    graph.setNode(wireName, [RenderItemType.Wire, renderWire, index]);

                    let tmpPreviousNode = previousNode;

                    // Connect previous node to pin:0 of the wire
                    this.setGraphEdge(graph, previousNode, wireName,
                        makeEdgeValue(previousNode, previousPin, 
                            wireName, PinId.from(0), index));

                    previousNode = wireName;
                    previousPin = PinId.from(1);

                    // Only for debugging purposes
                    const wireSegmentsInfo = wireSegments.map(item => {
                        const tmp: {
                            direction: string,
                            value: number,
                            valueXY?: [x: number, y: number],
                            until?: [instanceName: string, pin: number]
                        } = {
                            direction: item.direction,
                            value: item.value,
                        };

                        if (item.valueXY) {
                            tmp.valueXY = item.valueXY;
                        }

                        if (item.until) {
                            tmp.until = [item.until[0].toString(), item.until[1]];
                        }

                        return tmp;
                    });

                    let useFrame = frameStack[frameStack.length - 1];
                    // Get frame of previous ndoe
                    if (nodeFrames.has(tmpPreviousNode)){
                        const previousNodeFrame = nodeFrames.get(tmpPreviousNode);

                        if (previousNodeFrame !== useFrame){
                            // Force assignment to previous node frame!
                            useFrame = previousNodeFrame;
                        }
                    }

                    nodeFrames.set(wireName, useFrame);

                    this.print(SequenceAction.Wire, wireId,
                        JSON.stringify(wireSegmentsInfo));
                    break;
                }

                case SequenceAction.WireJump: {
                    this.print(...sequenceStep);
                    const wireId = sequenceStep[1] as number;
                    const wireName = getWireName(wireId);

                    let wirePin = 1;

                    if (sequenceStep.length === 3) {
                        wirePin = sequenceStep[2] as number;
                    }

                    previousNode = wireName;
                    previousPin = PinId.from(wirePin);
                    break;
                }

                case SequenceAction.Frame: {
                    const [, frameObject, frameAction] = sequenceStep;

                    if (frameAction === FrameAction.Enter) {
                        const prevFrame = frameStack[frameStack.length - 1];

                        const newFrame = new RenderFrame(frameObject);

                        if (frameObject.parameters.has(FrameParamKeys.Direction)) {
                            newFrame.direction =
                                frameObject.parameters.get(FrameParamKeys.Direction);
                        }

                        if (frameObject.parameters.has(FrameParamKeys.Padding)) {
                            newFrame.padding = milsToMM(
                                frameObject.parameters.get(FrameParamKeys.Padding)
                            );
                        }

                        if (frameObject.parameters.has(FrameParamKeys.Border)) {
                            newFrame.borderWidth =
                                frameObject.parameters.get(FrameParamKeys.Border);
                        }

                        if (frameObject.parameters.has(FrameParamKeys.Width)) {
                            newFrame.width = milsToMM(
                                frameObject.parameters.get(FrameParamKeys.Width)
                            );
                        }

                        if (frameObject.parameters.has(FrameParamKeys.Height)) {
                            newFrame.height = milsToMM(
                                frameObject.parameters.get(FrameParamKeys.Height)
                            );
                        }

                        containerFrames.push(newFrame);
                        frameStack.push(newFrame);

                        // If the previous frame exists, then add the new frame
                        // into the inner items of the previous frame. This allows
                        // the frame hierarchy to be tracked.
                        prevFrame && prevFrame.innerItems.push(newFrame);

                    } else if (frameAction === FrameAction.Exit) {
                        frameStack.pop();
                    }
                    break;
                }
            }
        });

        this.print('===== done populating graph =====');
        this.print('');

        const logNodesAndEdges = true;

        if (logNodesAndEdges){
            this.print('===== graph edges =====');
            // dump all edges in the graph
            const allEdges = graph.edges();
            allEdges.forEach(edge => {
                const [nodeId1, pin1, nodeId2, pin2] = graph.edge(edge);
                this.print(nodeId1, 'pin', pin1, '-----', nodeId2, 'pin', pin2);
            });
            this.print('===== end edges =====');
            this.print()

            this.print('===== graph nodes =====');
            const nodes = graph.nodes();
            nodes.forEach(node => {
                this.print(`name:${node}, value:${graph.node(node)}`);
            });
            this.print('===== end nodes =====');
            this.print('');
        }

        return {
            graph,
            containerFrames,
        }
    }

    private setGraphEdge(graph: Graph, node1: string, node2: string,
        edgeValue: EdgeValue): void {
        if (!graph.isDirected && graph.hasEdge(node1, node2)){
            this.print(`Warning: edge already exists ${node1} ${node2}`);
        }
        graph.setEdge(node1, node2, edgeValue);
        this.print(`created edge: node1:${node1} node2:${node2} edgeValue:${edgeValue}`);
    }

    protected print(...params: any[]): void {
        this.logger.add(params.join(' '));
    }

    generateNetGraph(nets: ComponentPinNetPair[]): void {
        // Get all unique nets
        const uniqueNets = new Set<Net>(nets.map(([,,net]) => net));
        const components = new Set<ClassComponent>(nets.map(([component, , ]) => component));

        const tmpNets = Array.from(uniqueNets);

        const gndNet = tmpNets.find(item => {
            return item.toString() === '/GND';
        })!;

        const otherNets = tmpNets.filter(item => {
            return item !== gndNet;
        })
        
        const netsIndexed: Net[] = [];

        // Set GND net as first item
        if (gndNet){
            netsIndexed.push(gndNet);
        }

        netsIndexed.push(...otherNets);

        const netsLength = netsIndexed.length;
        const conductanceMatrix = Matrix.zeros(netsLength, netsLength);

        // Parse only resistors for now
        components.forEach(item => {
            if (item.typeProp === ComponentTypes.resistor){
                const net1 = item.pinNets.get(1)!;
                const net2 = item.pinNets.get(2)!;

                const net1Index = netsIndexed.indexOf(net1);
                const net2Index = netsIndexed.indexOf(net2);

                const resistance: NumericValue = item.parameters.get('value')!;
                const resistanceValue = resistance.toNumber();

                const conductanceValue = 1/resistanceValue;

                const currentValue1 = conductanceMatrix.get(net1Index, net1Index);
                const currentValue2 = conductanceMatrix.get(net2Index, net2Index);

                const currentValue3 = conductanceMatrix.get(net1Index, net2Index);
                const currentValue4 = conductanceMatrix.get(net2Index, net1Index);

                conductanceMatrix.set(net1Index, net1Index, currentValue1 + conductanceValue);
                conductanceMatrix.set(net2Index, net2Index, currentValue2 + conductanceValue);

                conductanceMatrix.set(net1Index, net2Index, currentValue3 - conductanceValue);
                conductanceMatrix.set(net2Index, net1Index, currentValue4 - conductanceValue);
            }
        });

        // Remove GND net from the conductance matrix, otherwise the 
        // matrix is singular and will throw an error with solve()
        if (gndNet){
            conductanceMatrix.removeColumn(0);
            conductanceMatrix.removeRow(0);
        }

        const netsWithoutGnd = netsIndexed.filter(net => {
            return (net !== gndNet);
        });

        const netResistances = new Map<Net, number>();

        try {
            netsWithoutGnd.forEach((net, index) => {
                // Ignore the GND net and only parse nets with type "source"
                if (net.type === NetTypes.Source) {
                    const currentVector = Matrix.zeros(netsWithoutGnd.length, 1);

                    // Subtract 1 because of the GND net
                    // Use a test current of 1A.
                    currentVector.set(index, 0, 1);

                    const solution = solve(conductanceMatrix, currentVector);

                    for (let i = 0; i < solution.rows; i++) {
                        const resValue = solution.get(i, 0);
                        if (resValue > 0) {
                            const targetNet = netsIndexed[i];
                            netResistances.set(targetNet, resValue);
                        }
                    }
                }
            });
        } catch (err) {
            // Failed to solve matrix
        }

        return {
            nets,
            netResistances,
        }
    }

    findNodePaths(graph: Graph, startNode: string, endNode: string, seenNodes:string[]=[]): string[][] {
        const edges = graph.nodeEdges(startNode);
        const paths:string[][] = [];

        for (let i = 0; i < edges.length; i++) {
            const edge = edges[i] as Edge;
            const node1 = edge.v;
            const node2 = edge.w;

            let nextNode = "";
            if (node1 === startNode) {
                nextNode = node2;
            } else {
                nextNode = node1;
            }

            if (nextNode === endNode) {
                // Stop!
                paths.push([startNode, endNode]);
                continue;

            } else if (seenNodes.indexOf(nextNode) !== -1) {
                // If seen before then go on to next
                continue;
            }

            seenNodes.push(startNode);
            const routes = this.findNodePaths(graph, nextNode, endNode, seenNodes);

            for (let j = 0; j < routes.length; j++) {
                paths.push([startNode, ...routes[j]]);
            }
        }

        return paths;
    }

    private getNetNodeName(net: Net):string{
        return 'net:' + net.toString();
    }

    private getComponentName(component: ClassComponent):string{
        return 'component:' + component.instanceName;
    }
}

type EdgeValue = [instance1: string, instancePin1: number, 
    instance2: string, instancePin2: number, priority: number];

function makeEdgeValue(instanceName1: string, instancePin1: number,
    instanceName2: string, instancePin2: number, priority: number)
    : EdgeValue {
    return [instanceName1, instancePin1, instanceName2, instancePin2, priority];
    // return `${instanceName1}:pin:${instancePin1} -- ${instanceName2}:pin:${instancePin2}`;
}

export function getWireName(wireId: number): string {
    return 'wire:' + wireId;
}

/**
 * Generates the pin layout definition when arrangeProp is present.
 * @param component
 * @returns 
 */
export function generateLayoutPinDefinition(componentUnit: ComponentUnit): SymbolPinDefintion[] {
    const pins = componentUnit.pins;
    const symbolPinDefinitions: SymbolPinDefintion[] = [];
    const existingPinIds = Array.from(pins.keys());

    const arrangeProps = componentUnit.arrangeProps ?? [];
    const addedPins: PinId[] = [];
    for (const [key, items] of arrangeProps) {

        let useItems: PinId[];
        if (!Array.isArray(items)) {
            useItems = [items];
        } else {
            // Do not mutate original array
            useItems = [...items];
        }

        useItems.forEach(pinId => {
            // Only use the pin if it exists in the pins map.
            const existingPin = existingPinIds.find(pin => pin.equals(pinId));
            if (existingPin) {
                const pin = getPinDefinition(pins, existingPin);
                symbolPinDefinitions.push({
                    side: key,
                    pinId: pinId,
                    text: pin.name,
                    position: pin.position,
                    pinType: pin.pinType,
                });
                addedPins.push(pinId);
            }
        });
    }

    // Make sure all existing pins are added, otherwise throw an error
    const unplacedPins: PinId[] = existingPinIds.filter(pinId => {
        return addedPins.find(id => id.equals(pinId)) === undefined;
    });

    if (unplacedPins.length > 0) {
        componentUnit._unplacedPins = unplacedPins;
        console.warn("Warning: There are unplaced pins: " + unplacedPins);
    }

    return symbolPinDefinitions;
}


export enum RenderItemType {
    Wire = 'wire',
    Component = 'component',
}

export type GraphNodeInfo = [
    type: RenderItemType,
    item: RenderComponent | RenderWire,
    index: number
]