import graphlib from '@dagrejs/graphlib';

import { SymbolCustom, SymbolFactory, SymbolGraphic, SymbolPinDefintion, SymbolText } from "./draw_symbols";
import { ClassComponent } from "./objects/ClassComponent";
import { FrameAction, SequenceAction, SequenceItem } from "./objects/ExecutionScope";
import { GlobalNames } from './globals';
import { WireSegment } from './objects/Wire';
import { NumericValue } from './objects/ParamDefinition';
import { Geometry } from './geometry';
import { Net } from './objects/Net';
import { Logger } from './logger';
import { Frame, FrameParamKeys } from './objects/Frame';
import { BoundBox, getBoundsSize, printBounds, resizeBounds, resizeToNearestGrid } from './utils';

export class LayoutEngine {

    logger: Logger;

    placeSubgraphVersion = 2;

    constructor() {
        this.logger = new Logger();
    }

    protected print(...params: any[]): void {
        this.logger.add(params.join(' '));
    }

    protected printLevel(level: number, ...params: any[]): void {
        this.logger.add(this.padLevel(level) + params.join(' '));
    }

    protected padLevel(value: number): string {
        const padding = ''.padStart(value * 4, ' ');
        return "[" + value + "]" + padding
    }

    runLayout(
        sequence: SequenceItem[],
        nets: [ClassComponent, pin: number, net: Net][]
    ): {
        components: RenderComponent[], wires: RenderWire[],
        junctions: RenderJunction[], mergedWires: MergedWire[],
        frameObjects: RenderFrame[],
        textObjects: RenderText[]
    } {
        const logNodesAndEdges = false;
    
        this.print('===== creating graph and populating with nodes =====');
        const {graph, containerFrames } = 
            this.generateLayoutGraph(sequence, nets);
        
        this.print('===== done populating graph =====');
        this.print('');

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
                this.print(node, graph.node(node));
            });
            this.print('===== end nodes =====');
            this.print('');
        }
        
        const subgraphInfo = this.sizeSubGraphs(graph);

        const dumpSubgraphInfo = true;
        if (dumpSubgraphInfo){
            this.print('===== subgraphs =====');
            subgraphInfo.forEach(item => {
                this.print('first node:', item.firstNodeId, 'bounds:', 
                item.bounds.xmin, item.bounds.ymin, 
                item.bounds.xmax, item.bounds.ymax);
                
                this.print('-- items:', item.components);
            });
        }

        const {textObjects, elementFrames} = 
            this.placeFrames(graph, subgraphInfo, containerFrames);
        const frameObjects = [...elementFrames, ...containerFrames];
        
        const placedComponents: RenderComponent[] = [];
        const placedWires: RenderWire[] = [];
    
        const tmpNodes = graph.nodes();
        tmpNodes.forEach(item => {
            const nodeValue = graph.node(item);
            const [nodeType, nodeItem]: [string, RenderItem] = nodeValue;
    
            if (nodeType === RenderItemType.Component) {
                placedComponents.push(nodeItem as RenderComponent);
    
            } else if (nodeType === RenderItemType.Wire) {
                placedWires.push(nodeItem as RenderWire);
            }
        });
    
        const wireGroups = new Map<string, RenderWire[]>();
    
        // Merge wires in the same group?
        placedWires.forEach(wire => {
            const {netName} = wire;
            if (!wireGroups.has(netName)){
                wireGroups.set(netName, []);
            }
    
            wireGroups.get(netName).push(wire);
        });
    
        const junctions: RenderJunction[] = [];
    
        const mergedWires:MergedWire[] = [];
    
        for (const [key, wires] of wireGroups) {
    
            // Create array of all wires with the same net name
            const allLines = wires.map(wire => {
                return wire.points.map(pt => {
                    return {
                        x: wire.x + pt.x,
                        y: wire.y + pt.y,
                    }
                });
            });
    
            const { intersectPoints, segments } = Geometry.mergeWires(allLines);
            mergedWires.push({
                netName: key,
                segments,
                intersectPoints,
            });
    
            intersectPoints.forEach(([x, y]) => {
                junctions.push(new RenderJunction(x, y));
            });
        }

        return {
            components: placedComponents,
            wires: placedWires,
            mergedWires,
            junctions,

            frameObjects,
            textObjects,
        };
    }

    placeFrames(graph: graphlib.Graph, subgraphInfo: SubGraphInfo[],
        frameObjects: RenderFrame[]): {
            elementFrames: RenderFrame[],
            textObjects: RenderText[],
        } {

        // Lays out frames and all the items within the frames.

        // The base/default frame will always be the first element
        const baseFrame = frameObjects[0];
        baseFrame.padding = 0;

        // Update render frames so that frames consist of only nested frames.
        // Layout is easier, since it only has to consider frames.
        // Subgraphs are wrapped inside a subgraph frame.
        const { textObjects, elementFrames } =
            this.prepareFrames(graph, subgraphInfo, baseFrame);

        const logFrames = false;
        if (logFrames) {
            this.print('===== dump frames =====');
            this.dumpFrame(baseFrame);
            this.print('===== dump frames =====');
        }

        this.placeAndSizeFrame(baseFrame);

        // All items in the frames are now ready for final placement.
        baseFrame.x = 0;
        baseFrame.y = 0;

        this.print('===== flatten frame items =====');
        this.applyFrameOffset(baseFrame);
        this.print('===== flatten frame items =====');

        return {
            elementFrames,
            textObjects,
        }
    }

    collectElementFrames(frame: RenderFrame, level = 0): RenderFrame[] {
        // Unwrap subgraph frames within nested frames.

        const innerItems = frame.innerItems as RenderFrame[];

        const frames: RenderFrame[] = [];

        innerItems.forEach(item => {
            if (item.type === RenderFrameType.Elements) {
                frames.push(item);
            } else if (item.type === RenderFrameType.Container) {
                const innerFrames = this.collectElementFrames(item, level + 1);    
                frames.push(...innerFrames);       
            }
        });

        return frames;
    }

    applyFrameOffset(frame: RenderFrame, level = 0): void {
        this.print(level, "".padStart(level * 4), 'frame', frame.x, frame.y);
        const innerItems = frame.innerItems as RenderFrame[];

        innerItems.forEach(innerFrame => {
            // Translate the subgraph frame by the parent frame's position
            innerFrame.x += frame.x;
            innerFrame.y += frame.y;

            if (innerFrame.type === RenderFrameType.Elements) {
                this.print(level, "".padStart(level * 4), 'element frame',
                    innerFrame.x, innerFrame.y);

                innerFrame.innerItems.forEach(item2 => {
                    item2.x += innerFrame.x - innerFrame.translateX;
                    item2.y += innerFrame.y - innerFrame.translateY;
                });

            } else {
                this.print(level, "".padStart(level * 4), 'container frame',
                    innerFrame.x, innerFrame.y);
                    
                this.applyFrameOffset(innerFrame, level + 1);
            }
        });
    }

    placeAndSizeFrame(frame: RenderFrame, level = 0): void {
        // Recursively walk through the frame's inner items and lay them out
        // depending on their bounds and position in the parent frame.

        const innerFrames = frame.innerItems as RenderFrame[];
        const gridSize = 20;

        let accumY = 0;

        // This is used to determine the final bounds of this frame
        const boundPoints = [];

        // First pass collects the size of all inner frames
        const frameSizes = innerFrames.map(innerFrame => {
            if (innerFrame.type === RenderFrameType.Elements) {
                // Set translate such that the origin of the frame is at it's 
                // upper left corner.
                innerFrame.bounds = resizeToNearestGrid(
                    innerFrame.bounds, gridSize);

                innerFrame.translateX = innerFrame.bounds.xmin;
                innerFrame.translateY = innerFrame.bounds.ymin;

            } else {
                // If this is a container frame, then apply the same strategy
                // to size the inner items of this frame.
                this.placeAndSizeFrame(innerFrame, level + 1);
            }

            return innerFrame.bounds;
        });

        // Find the largest width (should already be aligned to grid size).
        const maxWidth = Math.max(...frameSizes.map(item => {
            const { width } = getBoundsSize(item);
            return width;
        }));

        const offsetX = frame.padding;
        const offsetY = frame.padding;

        // Second pass arranges the items and sets the height
        innerFrames.forEach(innerFrame => {
            // Align to nearest grid
            const { width: frameWidth, height: frameHeight }
                = getBoundsSize(innerFrame.bounds);

            // Align to the center, but also to the nearest grid size.
            innerFrame.x = offsetX + Math.floor((maxWidth / 2 - frameWidth / 2) / gridSize) * gridSize;
            innerFrame.y = offsetY + accumY;

            accumY += (frameHeight + frame.padding);

            boundPoints.push(
                [innerFrame.x, innerFrame.y],
                [innerFrame.x + frameWidth, innerFrame.y + frameHeight]
            );
        });

        // Determine the bounds based on the points. The points should already
        // be aligned to the grid, add the frame padding to expand the bounds correctly.
        frame.bounds = resizeBounds(getBoundsFromPoints(boundPoints), 
            frame.padding);
    }

    dumpFrame(frame: RenderFrame, level = 0): void {
        this.print(level, "".padStart(level * 4), 'frame, items:', 
            frame.innerItems.length);

        frame.innerItems.forEach(item => {
            // items must only be of type RenderFrame
            item = item as RenderFrame;
            
            if (item.type === RenderFrameType.Elements) {
                this.print(level, "".padStart(level * 4),
                    'element frame, items:', item.innerItems.map(item => {
                        if (item instanceof RenderComponent) {
                            return item.component.instanceName;
                        } else if (item instanceof RenderWire) {
                            return getWireName(item.id);
                        }
                        return null;
                    }));
            } else {
                this.print(level, "".padStart(level * 4), 'container');
                this.dumpFrame((item as RenderFrame), level + 1);
            }
        });
    }

    prepareFrames(graph: graphlib.Graph, subgraphInfo: SubGraphInfo[], 
        frame: RenderFrame, level = 0): {
            elementFrames: RenderFrame[],
            textObjects: RenderText[] 
        } {
        
        const ignoreItems: string[] = [];
        const textObjects = [];
        const elementFrames = [];

        frame.innerItems = frame.innerItems.reduce((accum, item) => {
            if (item instanceof RenderFrame) {
                // If this is frame, then go into this frame and wrap it's 
                // elements into element frames.
                const objects = 
                    this.prepareFrames(graph, subgraphInfo, item, level + 1);
                textObjects.push(...objects.textObjects);
                elementFrames.push(...objects.elementFrames);

                accum.push(item);
            } else if (item instanceof RenderComponent){
                const instanceName = item.component.instanceName;

                if (ignoreItems.indexOf(instanceName) === -1) {
                    // Only if not ignored already, then create the elements
                    // frame for the subgraph containing the instance.
                    const subgraph = subgraphInfo.find(item => {
                        return item.components.indexOf(instanceName) !== -1;
                    });

                    if (subgraph !== undefined) {
                        const tmpFrame = new RenderFrame(new Frame(-2), 
                            RenderFrameType.Elements);
                        tmpFrame.subgraphId = instanceName;
                        tmpFrame.innerItems = 
                            subgraph.components.map(instanceName => {
                                const [, component,] = graph.node(instanceName);
                                return component;
                            });

                        // Set the size of the element frame to be the size of 
                        // the subgraph
                        tmpFrame.bounds = subgraph.bounds;
                        ignoreItems.push(...subgraph.components);

                        accum.push(tmpFrame);
                        elementFrames.push(tmpFrame);
                    } else {
                        throw `Could not find subgraph for ${instanceName}`;
                    }
                }
            }

            return accum;
        }, [] as RenderFrame[]);

        // If the frame has a title specified, then this is added as an 
        // element frame.
        if (frame.type === RenderFrameType.Container) {
            const frameObject = frame.frame;
            if (frameObject.parameters.has(FrameParamKeys.Title)) {
                const title = 
                    frameObject.parameters.get(FrameParamKeys.Title) as string;
                
                // Add the element frame containing the text item
                const tmpFrame = new RenderFrame(new Frame(-2),
                    RenderFrameType.Elements);
                tmpFrame.subgraphId = title.replace(/\s/g, "_");

                const textObject = new RenderText(title);
                textObject.fontSize = 16;
                textObject.fontWeight = 'bold';

                textObject.symbol.refreshDrawing();

                tmpFrame.innerItems.push(textObject);

                tmpFrame.bounds = {
                    xmin: 0,
                    ymin: 0,
                    xmax: textObject.symbol.width,
                    ymax: textObject.symbol.height
                }

                // For now, text is aligned to center and bottom of text.
                textObject.x = textObject.symbol.width/2;
                textObject.y = textObject.symbol.height/2;

                // Add as first element
                frame.innerItems.splice(0, 0, tmpFrame);

                this.printLevel(level, frame, 'added text', tmpFrame);

                textObjects.push(textObject);

                // Add the start
                elementFrames.splice(0, 0, tmpFrame);
            }
        }

        return {
            elementFrames,
            textObjects,
        }
    }

    generateLayoutGraph(sequence: SequenceItem[],
        nets: [ClassComponent, pin: number, net: Net][]): {
            graph: graphlib.Graph,
            containerFrames: RenderFrame[],
         } {
        // Based on the sequence of actions, generate a graph that links
        // the nodes (components and wires)

        let previousNode: string | null = null;
        let previousPin: number | null = null;

        const graph = new graphlib.Graph({
            directed: false,
            compound: true,
        });

        this.print('sequence length:', sequence.length);

        // This will be used to catch all other components that are not explicitly
        // within a defined frame.
        const baseRenderFrame = new RenderFrame(new Frame(-1));

        const frameStack: RenderFrame[] = [baseRenderFrame];
        const containerFrames: RenderFrame[] = [baseRenderFrame];

        // Based on the sequence steps create all the graph connections first and
        // determine the size of all items
        for (let i = 0; i < sequence.length; i++) {
    
            const action = sequence[i][0];
            let tmpComponent: RenderComponent;

            // Component related actions
            if (action === SequenceAction.At || action === SequenceAction.To) {
                this.print(...sequence[i]);

                // Size all elements first
                const component = sequence[i][1] as ClassComponent;
                const pin = sequence[i][2] as number;

                const tmpInstanceName = component.instanceName;
    
                if (!graph.hasNode(tmpInstanceName)) {
                    let { displayProp = null, widthProp = null } = component;
                    let tmpSymbol: SymbolGraphic;
    
                    // If it is a gnd net, then use the gnd symbol
                    if (displayProp === null && component.parameters.get('net_name') === GlobalNames.gnd) {
                        displayProp = 'gnd';
                    }
    
                    if (displayProp !== null) {
                        tmpSymbol = SymbolFactory(displayProp);
                    } else {
                        const symbolPinDefinitions = generateLayoutPinDefinition(component);
                        tmpSymbol = new SymbolCustom(symbolPinDefinitions);
                    }
    
                    applyComponentParamsToSymbol(displayProp, component, tmpSymbol);
    
                    // Set rotation of object
                    let didSetAngle = false;

                    if (component.parameters.has('angle')) {
                        didSetAngle = true;
                        tmpSymbol.angle = component.parameters.get('angle') as number;
                    }
    
                    if (tmpSymbol instanceof SymbolCustom && widthProp){
                        tmpSymbol.bodyWidth = widthProp;
                    }

                    if (component.assignedRefDes !== null){
                        tmpSymbol.setLabelValue("refdes", component.assignedRefDes);
                    }
    
                    if (!didSetAngle && component.parameters.has('_addDirection')){
                        // If there is an _addDirection specified, then the angle
                        // must be updated accordingly. If angle is already set,
                        // then skip this.
                        tmpSymbol.refreshDrawing(false);

                        tmpSymbol.angle = calculateSymbolAngle(
                            tmpSymbol,
                            component.parameters.get('_addPin') as number,
                            component.parameters.get('_addDirection') as string,
                        );
                    }

                    // Draw symbol in memory to determine the size/bounds.
                    tmpSymbol.refreshDrawing();
    
                    const { width: useWidth, height: useHeight } = tmpSymbol.size();

                    tmpComponent = new RenderComponent(component, useWidth, useHeight);
                    tmpComponent.symbol = tmpSymbol;
    
                    // Record the sequence number to determine priority
                    graph.setNode(tmpInstanceName, [RenderItemType.Component, tmpComponent, i]);

                    // All components must belong within a frame.
                    const currentFrame = frameStack[frameStack.length-1];
                    currentFrame && currentFrame.innerItems.push(tmpComponent);
                }
    
                if (action === SequenceAction.To) {
                    graph.setEdge(previousNode, tmpInstanceName,
                        makeEdgeValue(previousNode, previousPin, tmpInstanceName, pin, i));
                }
    
                previousNode = tmpInstanceName
                previousPin = pin;
    
            } else if (action === SequenceAction.Wire) {
                // draw wires
                const [, wireId, wireSegments] = 
                    sequence[i] as [SequenceAction.Wire, number, WireSegment[]];

                const wire = new RenderWire(0, 0, wireSegments);
                wire.id = wireId;
    
                let useNetName = null;
    
                if (previousNode !== null) {
                    const [prevNodeType, prevNodeItem] = graph.node(previousNode);
                    if (prevNodeType === RenderItemType.Component) {
                        // Find the net of the wire
                        const matchingItem = nets.find(([comp, pin]) => {
                            return comp.instanceName === previousNode && pin === previousPin;
                        });
    
                        useNetName = matchingItem !== undefined ? matchingItem[2].name : null;
    
                    } else if (prevNodeType === RenderItemType.Wire) {
                        useNetName = (prevNodeItem as RenderWire).netName;
                    }
                }
    
                wire.netName = useNetName;
                const wireName = getWireName(wire.id);
    
                // Record the sequence number to determine priority
                graph.setNode(wireName, [RenderItemType.Wire, wire, i]);
    
                // Connect previous node to pin:0 of the wire
                graph.setEdge(previousNode, wireName, 
                    makeEdgeValue(previousNode, previousPin, wireName, 0, i));
    
                previousNode = wireName;
                previousPin = 1;
   
                this.print(SequenceAction.Wire, wireId, JSON.stringify(wireSegments));
                
            } else if (action === SequenceAction.WireJump) {
                this.print(...sequence[i]);
                const [, wireId] = sequence[i] as [SequenceAction.WireJump, number];
                previousNode = getWireName(wireId);
                previousPin = 1;
            } else if (action === SequenceAction.Frame){
                const [, frameObject, frameAction] = sequence[i];

                if (frameAction === FrameAction.Enter){
                    const prevFrame = frameStack[frameStack.length-1];

                    const newFrame = new RenderFrame(frameObject);
                    containerFrames.push(newFrame);
                    frameStack.push(newFrame);

                    // If the previous frame exists, then add the new frame
                    // into the inner items of the previous frame. This allows
                    // the frame hierarchy to be tracked.
                    prevFrame && prevFrame.innerItems.push(newFrame);

                } else if (frameAction === FrameAction.Exit){
                    frameStack.pop();
                }
            }
        }

        return {
            graph,
            containerFrames,
        }
    }

    sizeSubGraphs(graph: graphlib.Graph): SubGraphInfo[] {
        
        // Layouts out all nodes within a subgraph and determines the size
        // of the subgraph.

        const subGraphs = graphlib.alg.components(graph);
        const subGraphsStarts = [];

        this.print('===== placing subgraphs =====');
        this.print('number of subgraphs: ', subGraphs.length);

        const subgraphInfo: SubGraphInfo[] = [];

        // Find the starting point of the graph
        subGraphs.forEach(innerGraph => {
            // Find node with the lowest sequence number and used 
            // as the starting node

            let smallestNodeIdLevel = Number.POSITIVE_INFINITY;
            let smallestNodeId: string | null = null;

            innerGraph.forEach(nodeId => {
                const [, , sequenceId] = graph.node(nodeId);

                if (sequenceId < smallestNodeIdLevel) {
                    smallestNodeIdLevel = sequenceId;
                    smallestNodeId = nodeId;
                }
            });

            subGraphsStarts.push(smallestNodeId);
        });


        subGraphsStarts.forEach((nodeId, index) => {
            const innerGraph = subGraphs[index];

            this.print('walk and place nodes in subgraph at index', index);
            this.print('starting node', nodeId);

            this.walkAndPlaceGraph(graph, nodeId, innerGraph);

            // Store all render objects to calculate bounds.
            const renderItems: (RenderComponent | RenderText)[] = [];

            const wires: RenderWire[] = [];

            innerGraph.forEach(nodeId => {
                const [nodeType, item,] = graph.node(nodeId);
                if (nodeType === RenderItemType.Component) {
                    renderItems.push(item);
                } else if (nodeType === RenderItemType.Wire) {
                    wires.push(item);
                }
            });

            // Get the existing bounds
            const bounds = getBounds(renderItems, wires, [], []);

            subgraphInfo.push({
                firstNodeId: nodeId,
                components: innerGraph,
                bounds,
            });
        });

        // For each subgraph, find the bounds of the subgraph
        return subgraphInfo;
    }


    walkAndPlaceGraph(graph: graphlib.Graph, firstNodeId: string, 
        subgraphNodes: string[]): void {
        // Go through all edges in the main graph and for each edge that contains
        // nodes within the subgraph, then try and place the nodes in the subgraph.

        const allEdges = graph.edges();

        const subgraphEdges = allEdges.reduce((accum, edge) => {
            const { v } = edge;
            // If the subgraph nodes v, then the edge is within the subgraph.
            // No need to check w, since w must also be in the subgraph.
            if (subgraphNodes.indexOf(v) !== -1) {
                accum.push(edge);
            }
            return accum;
        }, [] as graphlib.Edge[]);

        if (this.placeSubgraphVersion === 1){
            this.placeSubgraph(graph, firstNodeId, subgraphEdges);
        } else if (this.placeSubgraphVersion === 2) {
            this.placeSubgraphV2(graph, firstNodeId, subgraphEdges);
        }
    }

    placeSubgraphV2(graph:graphlib.Graph, firstNodeId: string,
        subgraphEdges: graphlib.Edge[]): void {
        
        let firstNodePlaced = false;

        // In this strategy, isFloating is used to indicate if the node 
        // has an assigned position. This strategy builds up groups of nodes
        // that share the same origin node. When group of nodes of overlap, they
        // are merged together and will have the same origin node.

        // Stores origin nodes. The earlier the node in this list, the 
        // higher the priority it has to be merged.
        const originNodes: RenderItem[] = [];
        
        // Stores the nodes that are linked to the node origin. The map key is 
        // the instance name of the origin node.
        const originNodeGroups: Map<string, RenderItem[]> = new Map();

        function findOriginNode(node: RenderItem): string | null {
            const keys = Array.from(originNodeGroups.keys());

            for (let i = 0; i < keys.length; i++) {
                const nodesLinkedToOrigin = originNodeGroups.get(keys[i]);
                if (nodesLinkedToOrigin.indexOf(node) !== -1) {
                    return keys[i];
                }
            }

            return null;
        }

        subgraphEdges.forEach(edge => {
            const [nodeId1, pin1, nodeId2, pin2]:
                [string, number, string, number] = graph.edge(edge);

            const [, node1]: [string, RenderItem] = graph.node(nodeId1);
            const [, node2]: [string, RenderItem] = graph.node(nodeId2);

            if (nodeId1 === firstNodeId && !firstNodePlaced) {
                this.print('first node placed at origin');
                this.placeNodeAtPosition(0, 0, node1, pin1);
                firstNodePlaced = true;
                node1.isFloating = false;

                originNodes.push(node1);
                originNodeGroups.set(node1.toString(), [node1]);
            }

            let fixedNode: RenderItem;
            let fixedNodePin: number;

            let floatingNode: RenderItem;
            let floatingNodePin: number;

            this.print('edge:', '[', node1, pin1, node1.isFloating, ']',
                '[', node2, pin2, node2.isFloating, ']');

            if (!node1.isFloating && node2.isFloating) {
                fixedNode = node1;
                fixedNodePin = pin1;

                floatingNode = node2;
                floatingNodePin = pin2;

            } else if (node1.isFloating && !node2.isFloating) {
                fixedNode = node2;
                fixedNodePin = pin2;

                floatingNode = node1;
                floatingNodePin = pin1;

            } else if (node1.isFloating && node2.isFloating) {
                // If both nodes are floating, then set node1 as an origin node
                // and set it as not floating.
                originNodes.push(node1);
                originNodeGroups.set(node1.toString(), [node1]);
                this.print('creating new origin node at', node1);

                this.placeNodeAtPosition(0, 0, node1, pin1);
                node1.isFloating = false;

                fixedNode = node1;
                fixedNodePin = pin1;

                floatingNode = node2;
                floatingNodePin = pin2;
            
            } else if(!node1.isFloating && !node2.isFloating){
                // If both nodes are fixed, then check how to merge them
                const originNode1 = findOriginNode(node1);
                const originNode2 = findOriginNode(node2);

                this.print('both nodes are already placed, comparing origin nodes:', originNode1, originNode2);

                // If have different node origins, then merge them together
                if (originNode1 !== originNode2){
                    // Merge both origin trees
                    this.mergeOriginNodes(
                        node1, pin1, node2, pin2,
                        originNode1, originNode2, originNodes,
                        originNodeGroups,
                    );
                }
            }

            if (fixedNode && floatingNode){
                this.print('place floating node', floatingNode, 'pin', floatingNodePin, 
                    'to', fixedNode, 'pin', fixedNodePin);

                const [x, y] = getNodePositionAtPin(fixedNode, fixedNodePin);
                this.placeNodeAtPosition(x, y, floatingNode, floatingNodePin);
                floatingNode.isFloating = false;

                this.print('set node as not floating:', floatingNode);

                // Find origin of the fixed node and add the floating node
                // into the node origin tree.
                const originNode = findOriginNode(fixedNode);
                originNodeGroups.get(originNode).push(floatingNode);
                this.print('linking node', floatingNode, 'to origin node', originNode);
            }

            [node1, node2].forEach(item => {
                if (item instanceof RenderWire && item.isEndAutoLength()){
                    this.print('auto length wire', item);

                    const [instance, pin] = item.getEndAuto();
                    const [, targetNode]:[string, RenderItem] = 
                        graph.node(instance.instanceName);

                    if (targetNode.isFloating){
                        throw "Cannot create auto wire with floating node! Wire id: " + item.id + " to node " +  instance + " pin "+ pin;
                    }
                    
                    const [untilX, untilY] = getNodePositionAtPin(targetNode, pin);
                    item.setEndAuto(untilX, untilY);
                }
            });

        });
    }

    mergeOriginNodes(node1: RenderItem, pin1: number, 
        node2: RenderItem, pin2: number,
        originNode1: string, originNode2: string,
        originNodes: RenderItem[],
        originNodeGroups: Map<string, RenderItem[]>): void {

        // Determine the priority of the merge
        const originNode1Index = originNodes.findIndex(item => {
            return item.toString() === originNode1;
        });

        const originNode2Index = originNodes.findIndex(item => {
            return item.toString() === originNode2;
        });

        // The higher index will be merged INTO the lower index, so the 
        // lower index node origin remains.
        let keepOriginNode: string;
        let otherOriginNode: string;

        let fixedNode: RenderItem;
        let fixedNodePin: number;

        let mergedNode: RenderItem;
        let mergedNodePin: number;

        if (originNode1Index < originNode2Index){
            keepOriginNode = originNode1;
            otherOriginNode = originNode2;

            fixedNode = node1;
            fixedNodePin = pin1;

            mergedNode = node2;
            mergedNodePin = pin2;

        } else {
            keepOriginNode = originNode2;
            otherOriginNode = originNode1;

            fixedNode = node2;
            fixedNodePin = pin2;

            mergedNode = node1;
            mergedNodePin = pin1;
        }

        this.print('merging origin node groups, fixed:', keepOriginNode, 
            ', other:', otherOriginNode);

        // Find position at pin of the fixed node, at the node origin
        // that remains.
        const [x, y] = getNodePositionAtPin(fixedNode, fixedNodePin);

        // Get the position of the node's pin relative to the node's origin
        // point. This returns the offset to the node origin.
        const [otherNodeOriginX, otherNodeOriginY] = 
            getNodePositionAtPin(mergedNode, mergedNodePin);

        const offsetX = x - otherNodeOriginX
        const offsetY = y - otherNodeOriginY;

        this.print('offset of other origin:', offsetX, offsetY);

        const otherItemsLinkedToOriginNode = originNodeGroups.get(otherOriginNode);
        this.print('nodes in other origin:' , otherItemsLinkedToOriginNode);

        otherItemsLinkedToOriginNode.forEach(item => {
            this.translateNodeBy(offsetX, offsetY, item);
        });   
        
        // Merge the list of items in other node origin into the node origin
        // that is kept.
        const newList = originNodeGroups.get(keepOriginNode)
            .concat(otherItemsLinkedToOriginNode);

        originNodeGroups.set(keepOriginNode, newList);
        
        // Remove other node origin as a key
        originNodeGroups.delete(otherOriginNode);

        this.print('removed other origin');
        this.print('merge completed');
    }


    placeSubgraph(graph: graphlib.Graph, firstNodeId: string,
        subgraphEdges: graphlib.Edge[]): void {

        let firstNodePlaced = false;

        subgraphEdges.forEach(edge => {
            const [nodeId1, pin1, nodeId2, pin2]:
                [string, number, string, number] = graph.edge(edge);

            const [, node1]: [string, RenderItem] = graph.node(nodeId1);
            const [, node2]: [string, RenderItem] = graph.node(nodeId2);

            if (nodeId1 === firstNodeId && !firstNodePlaced) {
                this.print('first node placed at origin');
                this.placeNodeAtPosition(0, 0, node1, pin1);
                firstNodePlaced = true;
                node1.isFloating = false;
            }

            let fixedNode: RenderItem;
            let fixedNodePin: number;

            let floatingNode: RenderItem;
            let floatingNodePin: number;

            this.print('edge:', '[', node1, pin1, node1.isFloating, ']',
                '[', node2, pin2, node2.isFloating, ']');

            if (!node1.isFloating && node2.isFloating) {
                fixedNode = node1;
                fixedNodePin = pin1;

                floatingNode = node2;
                floatingNodePin = pin2;

            } else if (node1.isFloating && !node2.isFloating) {
                fixedNode = node2;
                fixedNodePin = pin2;

                floatingNode = node1;
                floatingNodePin = pin1;

            } else if (node1.isFloating && node2.isFloating) {
                this.print('both nodes are floating', node1, 'pin', pin1,
                    'and', node2, 'pin', pin2);
                node1.floatingRelativeTo.push([pin1, nodeId2, pin2]);
                node2.floatingRelativeTo.push([pin2, nodeId1, pin1]);
            }

            if (fixedNode && floatingNode){
                this.print('place floating node', floatingNode, 'pin', floatingNodePin, 
                    'to', fixedNode, 'pin', fixedNodePin);

                const [x, y] = getNodePositionAtPin(fixedNode, fixedNodePin);
                this.placeNodeAtPosition(x, y, floatingNode, floatingNodePin);
                floatingNode.isFloating = false;

                this.placeFloatingItems(graph, floatingNode);
            }

            [node1, node2].forEach(item => {
                if (item instanceof RenderWire){

                    if (item.isEndAutoLength()){
                        const [instance, pin] = item.getEndAuto();
                        const [, targetNode]:[string, RenderItem] = 
                            graph.node(instance.instanceName);

                        const [untilX, untilY] = getNodePositionAtPin(targetNode, pin);
                        item.setEndAuto(untilX, untilY);
                    }
                } 
            });
        });
    }

    translateNodeBy(offsetX: number, offsetY: number, item: RenderItem): void {
        item.x += offsetX;
        item.y += offsetY;
    }

    placeNodeAtPosition(fromX: number, fromY: number, item: RenderItem, pin: number, depth=0): void {
        if (item instanceof RenderComponent){
            const pinPosition = item.symbol.pinPosition(pin);
            item.x = fromX - pinPosition.x;
            item.y = fromY - pinPosition.y; 

        } else if (item instanceof RenderWire){
            if (pin === 0){
                item.x = fromX;
                item.y = fromY;
            } else {
                const wireEnd = item.getWireEnd();
                item.x = fromX - wireEnd.x;
                item.y = fromY - wireEnd.y;
            }
        }

        this.print(this.padLevel(depth), 'place', item, 'pin', pin, 'at', item.x, item.y);
    }

    placeFloatingItems(graph: graphlib.Graph, item: RenderItem, depth = 0): void {
        // Assume that item already has a fixed position
    
        if (depth > 100) {
            throw "Too many levels when placing floating items";
        }

        const { floatingRelativeTo = [] } = item;

        if (floatingRelativeTo.length > 0){

            this.print(this.padLevel(depth), 'place relative to', item);
            this.print(this.padLevel(depth), 'relative to', 
                JSON.stringify(floatingRelativeTo));

            floatingRelativeTo.forEach(entry => {
                const [selfPin, nodeId, pin] = entry;
                const [, tmpNode] = graph.node(nodeId);
        
                if (tmpNode.isFloating) {
                    const [x, y] = getNodePositionAtPin(item, selfPin);
                    this.placeNodeAtPosition(x, y, tmpNode, pin, depth);
                    tmpNode.isFloating = false;
        
                    this.placeFloatingItems(graph, tmpNode, depth + 1);
                } else {
                    this.print(this.padLevel(depth), 'skipping', tmpNode, 'as it is not floating');
                }
            });

            this.print(this.padLevel(depth), '<<< done traversing floating nodes');
        } else {
            this.print(this.padLevel(depth), 'no nodes floating relative to', item);
        }
    }
}


function getNodePositionAtPin(item:RenderItem, pin: number):[x: number, y: number]{
    if (item instanceof RenderComponent){
        const pinPosition = item.symbol.pinPosition(pin);
        return [
            item.x + pinPosition.x,
            item.y + pinPosition.y
        ];
    } else if (item instanceof RenderWire){
        if (pin === 0){
            return [item.x, item.y];
        } else {
            const wireEnd = item.getWireEnd();

            return [
                item.x + wireEnd.x,
                item.y + wireEnd.y
            ]
        }
    }
}


function getNeighbours(graph: graphlib.Graph, nodeIds: string[]): [from: string, to: string][] {
    
    return nodeIds.reduce((accum, nodeId) => {
        const tmp = graph.neighbors(nodeId);
        if (tmp) {
            tmp.forEach(neighborNodeId => {
                accum.push([nodeId, neighborNodeId]);
            });
        }
        return accum;
    }, [] as [from: string, to: string][]);
}

function makeEdgeValue(instanceName1: string, instancePin1: number, instanceName2: string, instancePin2: number, priority: number): 
    [instance1: string, instancePin1: number, instance2: string, instancePin2: number, priority: number] {
    return [instanceName1, instancePin1, instanceName2, instancePin2, priority];
    // return `${instanceName1}:pin:${instancePin1} -- ${instanceName2}:pin:${instancePin2}`;
}

function getWireName(wireId: number): string {
    return 'wire:' + wireId;
}

type RenderItem = RenderComponent | RenderWire | RenderText;

function generateLayoutPinDefinition(component: ClassComponent): SymbolPinDefintion[] {
    const pins = component.pins;
    const symbolPinDefinitions: SymbolPinDefintion[] = [];
    const existingPinIds = Array.from(pins.keys());

    if (component.arrangeProps === null) {
        // Automatically split pins
        for (let i = 0; i < existingPinIds.length; i++) {
            const pinPosition = Math.floor(i/2);

            symbolPinDefinitions.push({
                side: (i % 2 === 0) ? "left" : "right",
                pinId: existingPinIds[i],
                text: pins.get(existingPinIds[i]).name,
                position: pinPosition,
            })
        }
    } else {
        const addedPins = [];

        for (const [key, items] of component.arrangeProps) {

            let useItems;
            if (!Array.isArray(items)){
                useItems = [items];
            } else {
                // Do no mutate original array
                useItems = [...items];
            }

            useItems.forEach(pinId => {
                // Only use the pin if it exists!
                if (existingPinIds.indexOf(pinId) !== -1) {
                    symbolPinDefinitions.push({
                        side: key,
                        pinId: pinId,
                        text: pins.get(pinId).name,
                        position: pins.get(pinId).position,
                    });
                    addedPins.push(pinId);
                }
            });
        }
        
        // Make sure all existing pins are added, otherwise throw an error
        const unplacedPins = [];
        existingPinIds.forEach(item => {
            if (addedPins.indexOf(item) === -1){
                unplacedPins.push(item);
            }
        });

        if (unplacedPins.length > 0){
            throw "'arrange' property is defined, but not all pins are specified: " + unplacedPins.join(",");
        }
    }

    return symbolPinDefinitions;
}

function applyComponentParamsToSymbol(displayProp: string, component: ClassComponent, symbol: SymbolGraphic): void {
    if (displayProp === 'net') {
        symbol.setLabelValue("net_name", component.parameters.get('net_name') as string);
    }

    if (component.parameters.has('value')) {

        let displayString = "";
        const tmpValue = component.parameters.get('value');
        if (typeof tmpValue == 'object' && (tmpValue instanceof NumericValue)) {
            displayString = (tmpValue as NumericValue).toDisplayString();
        } else {
            displayString = tmpValue;
        }

        symbol.setLabelValue('value', displayString);
    }

    symbol.setLabelValue('refdes', component.instanceName);

    if (component.parameters.has('MPN')) {
        symbol.setLabelValue('MPN', component.parameters.get('MPN') as string);
    }
}

function calculateSymbolAngle(symbol: SymbolGraphic, 
    pin: number, direction:string): number {
    let useAngle = 0;

    let directionVector = 0;
    switch(direction){
        case 'right':
            directionVector = 0;
            break;
        case 'down':
            directionVector = 90;
            break;
        case 'left':
            directionVector = 180;
            break;
        case 'up':
            directionVector = 270;
            break;
    }

    const {angle: pinVector} = symbol.pinPosition(pin);

    // Reverse the vector to point the other way
    const pinVectorReversed = (pinVector + 180) % 360;

    useAngle = directionVector - pinVectorReversed;

    return useAngle;
}

export function getBounds(
    components: (RenderComponent|RenderText)[], 
    wires: RenderWire[], junctions: RenderJunction[], frames: RenderFrame[]): BoundBox{
    
        const points = [];

    components.forEach(item => {
        const bbox = item.symbol.drawing.getBoundingBox();

        const [x1, y1] = bbox.start;
        const [x2, y2] = bbox.end;

        points.push([x1 + item.x, y1 + item.y]);
        points.push([x2 + item.x, y2 + item.y]);
    });

    wires.forEach(wire => {
        wire.points.forEach(point => {
            points.push([wire.x + point.x, wire.y + point.y]);
        });
    });

    junctions.forEach(item => {
        points.push([item.x, item.y]);
    });

    frames.forEach(item => {
        const {width, height} = getBoundsSize(item.bounds);
        points.push([item.x, item.y]);
        points.push([item.x + width, item.y + height]);
    })

    return getBoundsFromPoints(points);
}

function getBoundsFromPoints(points: [x: number, y: number][]): BoundBox {
    const xValues = points.map(item => item[0]);
    const yValues = points.map(item => item[1]);

    const xmin = Math.min(...xValues);
    const xmax = Math.max(...xValues);

    const ymin = Math.min(...yValues);
    const ymax = Math.max(...yValues);

    return {
        xmin, xmax, ymin, ymax,
    }
}

export class RenderObject {
    x = -1;
    y = -1;

    isFloating = true;
    floatingRelativeTo: [selfPin: number, nodeId: string, pin: number][] = [];
}


export class RenderWire extends RenderObject {
    id: number;
    segments: WireSegment[] = [];
    points:{x: number, y:number}[] = [];

    // Net name is used to determine if wires
    // can overlap
    netName: string;

    constructor(x: number, y: number, segments: WireSegment[]) {
        super();
        this.x = x;
        this.y = y;
        this.segments = segments;

        this.refreshPoints();
    }

    refreshPoints(): void {
        let tmpX = 0;
        let tmpY = 0;

        const points = [{ x: tmpX, y: tmpY }];

        this.segments.forEach(segment => {
            const { direction, value } = segment;

            let didAddPoint = false;

            if (direction === 'down') {
                tmpY += value;
            } else if (direction === 'up') {
                tmpY -= value;
            } else if (direction === 'left') {
                tmpX -= value;
            } else if (direction === 'right') {
                tmpX += value;
            } else if (direction === 'auto' || direction === "auto_") {
                // 'auto' means both x and y. 'auto_' is the same as 'auto', but
                // uses the alternative path to the target.
                const { valueXY = [0, 0] } = segment;

                const tmpPoints = this.getAutoPoints(valueXY, direction);

                tmpPoints.forEach(point => {
                    if (point[0] !== 0 || point[1] !== 0){
                        tmpX += point[0];
                        tmpY += point[1];
                        points.push({ x: tmpX, y: tmpY });
                    }
                });
                didAddPoint = true;
            }

            if(!didAddPoint){
                points.push({ x: tmpX, y: tmpY });
            }
        });

        this.points = points;
    }

    getAutoPoints(value: [x: number, y: number], direction: 'auto' | 'auto_'): [dx: number, dy: number][] {
        const inQuadrant = Geometry.getQuadrant(value[0], value[1]);
        const [dx, dy] = value;

        // Clockwise direction
        if (direction === 'auto') {
            switch (inQuadrant) {
                case 0:
                case 2:
                    return [[dx, 0], [0, dy]];
                case 1:
                case 3:
                    return [[0, dy], [dx, 0]];
            }
        } else if (direction === 'auto_') {
            switch (inQuadrant) {
                case 0:
                case 2:
                    return [[0, dy], [dx, 0]];
                case 1:
                case 3:
                    return [[dx, 0], [0, dy]];
            }
        }

        return [[0, 0]];
    }

    getWireEnd(): { x: number, y: number } {
        return this.points[this.points.length - 1];
    }

    isEndAutoLength(): boolean {
        if (this.segments.length > 0) {
            // If only direction, then it is an auto length
            return this.segments[this.segments.length - 1].value === null;
        }

        return false;
    }

    getEndAuto(): [instance: ClassComponent, pin: number] {
        if (this.segments.length > 0) {
            return this.segments[this.segments.length - 1].until;
        } else {
            throw "No segments in wire!"
        }
    }

    setEndAuto(untilX: number, untilY: number): void {

        // Find the last accumulated position up to the last item
        const excludeLastSegment = this.segments.slice(0, this.segments.length-1);

        let tmpX = this.x;
        let tmpY = this.y;

        excludeLastSegment.forEach(segment => {
            const { direction, value } = segment;
            if (direction === 'down') {
                tmpY += value;
            } else if (direction === 'up') {
                tmpY -= value;
            } else if (direction === 'left') {
                tmpX -= value;
            } else if (direction === 'right') {
                tmpX += value;
            }
        });

        // Based on the last segment direction, determine the
        // value. Since value is set, then the segment will no longer
        // be considered as an 'auto length' segment.
        let useValue = null;
        let valueXY = null;
        const lastSegment = this.segments[this.segments.length-1];

        switch(lastSegment.direction){
            case 'left':
                useValue = tmpX - untilX;
                break;
            case 'right':
                useValue = untilX - tmpX;
                break;
            case 'up':
                useValue = untilY - tmpY;
                break;
            case 'down':
                useValue = tmpY - untilY;
                break;

            case 'auto':
            case 'auto_':
                // Always assume positive values
                valueXY = [
                    untilX - tmpX,
                    untilY - tmpY,
                ];

                // Set to 0, to mark that auto length
                // calculation has already been done.
                useValue = 0;
                break;
        }

        lastSegment.value = useValue;
        lastSegment.valueXY = valueXY !== null ? valueXY : null;

        this.refreshPoints();
    }

    toString(): string {
        return getWireName(this.id);
    }
}

export type MergedWire = {
    netName: string,
    segments: [x: number, y:number][][],
    intersectPoints: [x: number, y: number, count: number][],
}

export class RenderComponent extends RenderObject {
    // Holds the render information of the component (position)

    component: ClassComponent;
    symbol: SymbolGraphic;

    width: number;
    height: number;

    displaySymbol: string | null = null;

    constructor(component: ClassComponent, width: number, height: number) {
        super();
        this.component = component;
        this.width = width;
        this.height = height;
    }

    doesOverlap(other: RenderComponent): boolean {
        const condition1 = isPointOverlap(this.x, this.y, other);
        const condition2 = isPointOverlap(this.x + this.width, this.y, other);
        const condition3 = isPointOverlap(this.x + this.width, this.y + this.height, other);
        const condition4 = isPointOverlap(this.x, this.y + this.height, other);

        return condition1 || condition2 || condition3 || condition4; 
    }

    toString(): string {
        return "component:" + this.component.instanceName;
    }
}

export class RenderText extends RenderObject {
    symbol: SymbolText;

    _fontSize = 12;
    _fontWeight = 'regular';

    get fontSize (): number {
        return this._fontSize;
    }

    set fontSize(value: number) {
        this._fontSize = value;
        this.symbol.fontSize = value;
    }

    get fontWeight(): string {
        return this._fontWeight;
    }

    set fontWeight(value: string) {
        this._fontWeight = value;
        this.symbol.fontWeight = value;
    }

    constructor(text: string) {
        super();
        this.symbol = new SymbolText(text);
    }
}

export class RenderFrame extends RenderObject {
    bounds: BoundBox | null = null;
    frame: Frame;

    // Store all items in the same array so that the order of frames
    // can be identified.
    innerItems: (RenderComponent | RenderFrame | RenderText)[] = [];
    
    translateX = 0;
    translateY = 0;

    padding = 20;

    subgraphId = "";

    type: RenderFrameType;

    constructor(frame: Frame, type: RenderFrameType = RenderFrameType.Container) {
        super();
        this.frame = frame;
        this.type = type;
    }

    toString(): string {
        let name = "";
        if (this.type === RenderFrameType.Container) {
            name = 'container_' + this.frame.frameId;
        } else if (this.type === RenderFrameType.Elements) {
            name = 'elements_' + this.subgraphId;
        }

        return name + ": " + this.x + "," + this.y + " bounds:" + printBounds(this.bounds);
    }
}

export enum RenderFrameType {
    Container = 1,
    Elements = 2, // Holds subgraphs and text.
}

export class RenderJunction {
    x: number;
    y: number;

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }
}



function isPointOverlap(x: number, y: number, other: RenderComponent): boolean {
    return (x >= other.x && y >= other.y && x <= (other.x + other.width) && y <= (other.y + other.height));
}

enum RenderItemType {
    Wire = 'wire',
    Component = 'component',
}

type SubGraphInfo = {
    firstNodeId: string;
    components: string[];
    bounds: BoundBox;
}

export { BoundBox };
