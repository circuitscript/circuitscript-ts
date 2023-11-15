import graphlib from '@dagrejs/graphlib';

import { SymbolCustom, SymbolFactory, SymbolGraphic, SymbolPinDefintion } from "./draw_symbols";
import { ClassComponent } from "./objects/Component";
import { SequenceAction, SequenceItem } from "./objects/ExecutionScope";
import { GlobalNames } from './globals';
import { WireSegment } from './objects/Wire';
import { NumericValue } from './objects/ParamDefinition';
import { Geometry } from './geometry';
import { Net } from './objects/Net';

export type BoundBox = {
    xmin: number, ymin: number,
    xmax: number, ymax: number,
}

export async function prepareLayout2(
    sequence: SequenceItem[],
    nets: [ClassComponent, pin: number, net: Net][],
): Promise<{ components: RenderComponent[], wires: RenderWire[], 
    junctions: RenderJunction[], mergedWires: MergedWire[],
    debugRects: BoundBox[] }> {

    let previousNode: string | null = null;
    let previousPin: number | null = null;
    
    let debugRects: BoundBox[] = [];

    const graph = new graphlib.Graph({
        directed: false,
        compound: true,
    });

    // Based on the sequence steps create all the graph connections first and 
    // determine the size of all items
    for (let i = 0; i < sequence.length; i++) {

        const action = sequence[i][0];
        let tmpComponent: RenderComponent;

        // Component related actions
        if (action === SequenceAction.At || action === SequenceAction.To) {
            // Size all elements first
            const component = sequence[i][1] as ClassComponent;
            const pin = sequence[i][2] as number;

            if (!graph.hasNode(getInstanceName(component))) {
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
                if (component.styles) {
                    const { angle = 0 } = component.styles;
                    tmpSymbol.angle = angle as number;
                }

                if (tmpSymbol instanceof SymbolCustom && widthProp){
                    tmpSymbol.bodyWidth = widthProp;
                }

                // Draw symbol in memory to determine the size/bounds.
                tmpSymbol.refreshDrawing();

                const tmpSize = tmpSymbol.size();
                const useWidth = tmpSize.width;
                const useHeight = tmpSize.height;

                tmpComponent = new RenderComponent(component, useWidth, useHeight);
                tmpComponent.symbol = tmpSymbol;

                // Record the sequence number to determine priority
                graph.setNode(getInstanceName(component), [RenderItemType.Component, tmpComponent, i]);
            }

            if (action === SequenceAction.To) {
                graph.setEdge(previousNode, getInstanceName(component),
                    makeEdgeValue(previousNode, previousPin, getInstanceName(component), pin, i));
            }

            previousNode = getInstanceName(component);
            previousPin = pin;

        } else if (action === SequenceAction.Wire) {
            // draw wires
            const [, wireId, wireSegments] = sequence[i] as [SequenceAction.Wire, number, WireSegment[]];

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
            const wireName = 'wire:' + wire.id;

            // Record the sequence number to determine priority
            graph.setNode(wireName, [RenderItemType.Wire, wire, i]);

            // Connect previous node to pin:0 of the wire
            graph.setEdge(previousNode, wireName, makeEdgeValue(previousNode, previousPin, wireName, 0, i));

            previousNode = wireName;
            previousPin = 1;

        } else if (action === SequenceAction.WireJump) {
            const [, wireId] = sequence[i] as [SequenceAction.WireJump, number];
            previousNode = 'wire:' + wireId;
            previousPin = 1;
        }
    }

    const tmpBounds = placeGraph(graph);
    debugRects = debugRects.concat(tmpBounds);

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

        debugRects,
    };
}

function placeGraph(graph: graphlib.Graph): BoundBox [] {
    // Lays out nodes in each subgraph and spaces out 
    // each separate subgraph.

    const subGraphs = graphlib.alg.components(graph);
    const subGraphsStarts = [];

    const subgraphBounds: BoundBox[] = [];

    // Find the starting point of the graph
    subGraphs.forEach(innerGraph => {
        // Find node with the lowest sequence number and used 
        // as the starting node

        let smallestNodeIdLevel = Number.POSITIVE_INFINITY;
        let smallestNodeId: string | null = null;

        innerGraph.forEach(nodeId => {
            const [, , sequenceId] = graph.node(nodeId);

            if (sequenceId < smallestNodeIdLevel){
                smallestNodeIdLevel = sequenceId;
                smallestNodeId = nodeId;
            }
        });

        subGraphsStarts.push(smallestNodeId);
    });

    let offsetX = 0;
    let offsetY = 0;

    let firstOffsetX = 0;
    
    subGraphsStarts.forEach((nodeId, index) => {
        const innerGraph = subGraphs[index];

        walkAndPlaceGraph(graph, nodeId, innerGraph);

        const components: RenderComponent[] = [];
        const wires: RenderWire[] = [];

        innerGraph.forEach(nodeId => {
            const [nodeType, item,] = graph.node(nodeId);
            if (nodeType === RenderItemType.Component) {
                components.push(item);
            } else if (nodeType === RenderItemType.Wire) {
                wires.push(item);
            }
        });

        // Get the existing bounds
        const bounds = getBounds(components, wires, []);

        console.log(index, bounds);

        // Use the bounds of the first subgraph to determine the position
        // of the other subgraphs
        if (index === 0){
            firstOffsetX = bounds.xmin;

            // Items of the first subgraph do not need any offset
        } else {

            offsetX = 0; //firstOffsetX - bounds.xmin;

            const nearestGrid = Math.floor(bounds.ymin / 20) * 20;

            // Place the items in the subgraph with the given offset
            const combinedItems = [...components, ...wires];
            combinedItems.forEach(item => {
                item.x += offsetX;
                item.y += (offsetY - nearestGrid);
            });
        }

        // Find the next position to place next subgraph
        const finalBounds = getBounds(components, wires, []);
        offsetY = Math.ceil(finalBounds.ymax / 20 + 1) * 20;
        
        subgraphBounds.push(finalBounds);
    });

    // For each subgraph, find the bounds of the subgraph
    return subgraphBounds;
}

function walkAndPlaceGraph(graph: graphlib.Graph, firstNodeId: string, 
    subgraphNodes: string[]): void {
    const edges = graph.edges();

    let firstNodePlaced = false;

    edges.forEach(edge => {
        const { v } = edge;

        // If the subgraph nodes v, then the edge is within the subgraph.
        // No need to check w, since w must also be in the subgraph.
        if (subgraphNodes.indexOf(v) !== -1) {
            const [nodeId1, pin1, nodeId2, pin2]: [string, number, string, number] = graph.edge(edge);

            const [, node1]: [string, RenderItem] = graph.node(nodeId1);
            const [, node2]: [string, RenderItem] = graph.node(nodeId2);

            if (nodeId1 === firstNodeId && !firstNodePlaced) {
                placeNodeAtPosition(0, 0, node1, pin1);
                firstNodePlaced = true;
                node1.isFloating = false;
            }

            let fixedNode: RenderItem;
            let fixedNodePin: number;

            let floatingNode: RenderItem;
            let floatingNodePin: number;

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
                node1.floatingRelativeTo.push([pin1, nodeId2, pin2]);
                node2.floatingRelativeTo.push([pin2, nodeId1, pin1]);
            }

            if (fixedNode && floatingNode){
                const [x, y] = getNodePositionAtPin(fixedNode, fixedNodePin);
                placeNodeAtPosition(x, y, floatingNode, floatingNodePin);
                floatingNode.isFloating = false;

                placeFloatingItems(graph, floatingNode);
            }

            [node1, node2].forEach(item => {
                if (item instanceof RenderWire){
                    if (item.isEndAutoLength()){
                        const [instanceName, pin] = item.getEndAuto();
                        const [, targetNode]:[string, RenderItem] = graph.node(instanceName);

                        const [untilX, untilY] = getNodePositionAtPin(targetNode, pin);
                        item.setEndAuto(untilX, untilY);
                    }
                } 
            });
        }
    });
}

function placeFloatingItems(graph: graphlib.Graph, item: RenderItem, depth = 0): void {
    // Assume that item already has a fixed position

    if (depth > 100) {
        throw "Too many levels when placing floating items";
    }

    const { floatingRelativeTo = [] } = item;

    floatingRelativeTo.forEach(entry => {
        const [selfPin, nodeId, pin] = entry;
        const [, tmpNode] = graph.node(nodeId);

        if (tmpNode.isFloating) {
            const [x, y] = getNodePositionAtPin(item, selfPin);
            placeNodeAtPosition(x, y, tmpNode, pin);
            tmpNode.isFloating = false;

            placeFloatingItems(graph, tmpNode, depth + 1);
        }
    });
}

function placeNodeAtPosition(fromX: number, fromY: number, item: RenderItem, pin: number): void {
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

function getInstanceName(component: ClassComponent): string {
    // Gets the instance including the link ID
    let instanceName = component.instanceName;
    if (component._copyID) {
        instanceName += ("#" + component._copyID);
    }
    return instanceName;
}

type RenderItem = RenderComponent | RenderWire;

type WirePointCount = [x: number, y: number, count: number];

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


export function getBounds(components: RenderComponent[], 
    wires: RenderWire[], junctions: RenderJunction[]): BoundBox{
    
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
    points = [];

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

    getEndAuto():[instanceName:string, pin: number] {
        if (this.segments.length > 0){
            return this.segments[this.segments.length -1].until;
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