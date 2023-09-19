import graphlib from '@dagrejs/graphlib';

import { SymbolCustom, SymbolFactory, SymbolGraphic, SymbolPinDefintion } from "./draw_symbols";
import { ClassComponent } from "./objects/Component";
import { SequenceAction, SequenceItem } from "./objects/ExecutionScope";
import { GlobalNames } from './globals';
import { WireSegment } from './objects/Wire';
import { NumericValue } from './objects/ParamDefinition';

export async function prepareLayout2(
    sequence: SequenceItem[]
): Promise<{components: RenderComponent[], wires: RenderWire[], junctions: RenderJunction[]}> {

    let previousNodePin: string | null = null;

    // Keeps track of the wire positions.
    const wiresLookup = new Map<number, WireLookupInfo>();

    const graph = new graphlib.Graph({
        directed: false,
        compound: true,
    });

    for (let i = 0; i < sequence.length; i++) {
        // Do not need to handle nested components for now

        const action = sequence[i][0];
        let tmpComponent: RenderComponent;

        // Component related actions
        if (action === SequenceAction.At || action === SequenceAction.To) {
            // Size all elements first
            const component = sequence[i][1] as ClassComponent;
            const pin = sequence[i][2] as number;

            if (!graph.hasNode(component.instanceName)) {
                let { displayProp = null } = component;
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

                // Draw symbol in memory to determine the size/bounds.
                tmpSymbol.refreshDrawing();

                const tmpSize = tmpSymbol.size();
                const useWidth = tmpSize.width;
                const useHeight = tmpSize.height;

                tmpComponent = new RenderComponent(component, useWidth, useHeight);
                tmpComponent.symbol = tmpSymbol;

                graph.setNode(component.instanceName, ['component', tmpComponent]);

                // Create nodes for the component pins and link it to the component
                for(const [pinId, ] of component.pins){
                    const edgeName = getPinNodeName(component, pinId);
                    graph.setNode(edgeName, ['pin', tmpComponent, pinId]);
                    graph.setEdge(component.instanceName, edgeName);
                }
            }

            if (action === SequenceAction.To) {
                graph.setEdge(previousNodePin, getPinNodeName(component, pin))
            }

            previousNodePin = getPinNodeName(component, pin);

        } else if (action === SequenceAction.Wire) {
            // draw wires
            const [, wireId, wireSegments] = sequence[i] as [SequenceAction.Wire, number, WireSegment[]];

            const wire = new RenderWire(0, 0, wireSegments);
            wire.id = wireId;

            const wireEnd = wire.getWireEnd();
            wiresLookup.set(wireId, {
                wire,
                end: [wireEnd.x, wireEnd.y]
            });

            const wireName = 'wire:'+wire.id;

            graph.setNode(wireName, ['wire', wire]);
            graph.setNode(wireName + ' pin:0', ['pin', wire, 0]);
            graph.setNode(wireName + ' pin:1', ['pin', wire, 1]);

            graph.setEdge(wireName, wireName + ' pin:0');
            graph.setEdge(wireName, wireName + ' pin:1');

            // Connect previous node to pin:0 of the wire
            graph.setEdge(previousNodePin, wireName + ' pin:0');
            previousNodePin = wireName + ' pin:1';

        } else if (action === SequenceAction.WireJump) {
            const [, wireId] = sequence[i] as [SequenceAction.WireJump, number];
            previousNodePin = 'wire:' + wireId + ' pin:1';
        }
    }

    console.log(graphlib.json.write(graph));

    // Go through the graph starting from the first node?
    const componentGraphs = graphlib.alg.components(graph);

    console.log('inner graphs', componentGraphs.length);

    componentGraphs.forEach(innerGraph => {

        let isFirstItem = false;
        
        let currentX = 0;
        let currentY = 0;

        const placedItems = [];

        // assume that the first position is at the origin
        innerGraph.forEach(nodeName => {
            const nodeValue = graph.node(nodeName);
            const nodeType = nodeValue[0];

            if (nodeType === 'pin'){
                // Only do something if it's a pin, otherwise do nothing
                const [,renderItem, pin] = nodeValue;
                // console.log(renderItemString(renderItem), pin);

                let offsetX = 0;
                let offsetY = 0;

                if (renderItem instanceof RenderComponent){
                    const pinPosition = renderItem.symbol.pinPosition(pin);
                    offsetX = pinPosition.x;
                    offsetY = pinPosition.y;

                    if (isFirstItem){
                        isFirstItem = false;
    
                        // Move item to origin
                        renderItem.x = -offsetX;
                        renderItem.y = -offsetY;
                        placedItems.push(renderItem.component.instanceName);

                    } else {
                        // If render item is not seen before, then place it down
                        if (placedItems.indexOf(renderItem.component.instanceName) === -1) {
                            renderItem.x = currentX - offsetX;
                            renderItem.y = currentY - offsetY;
                            placedItems.push(renderItem.component.instanceName);

                        } else {
                            // If render item is seen before, then just move the current position
                            // to the pin position
                            currentX = renderItem.x + offsetX;
                            currentY = renderItem.y + offsetY;
                        }
                    }

                } else if (renderItem instanceof RenderWire) {

                    if (placedItems.indexOf('wire:' + renderItem.id) === -1){
                        // If wire is not placed yet, then place the wire based on 
                        // the current pin.

                        if (pin === 0){
                            offsetX = 0;
                            offsetY = 0;

                        } else if (pin === 1){
                            const wireEnd = renderItem.getWireEnd();
                            offsetX = -wireEnd.x;
                            offsetY = -wireEnd.y;
                        }

                        currentX += offsetX;
                        currentY += offsetY;

                        renderItem.x = currentX;
                        renderItem.y = currentY;

                        placedItems.push('wire:' + renderItem.id);

                    } else {
                        // If wire is already placed, then depending on the
                        // pin number, update the current position
                        if (pin === 0) {
                            currentX = renderItem.x;
                            currentY = renderItem.y;

                        } else if (pin === 1){
                            const wireEnd = renderItem.getWireEnd();
                            currentX = renderItem.x + wireEnd.x;
                            currentY = renderItem.y + wireEnd.y;
                        }
                    }

                }   
            }
        });
    });

    const placedComponents = [];
    const placedWires = [];

    const tmpNodes = graph.nodes();
    tmpNodes.forEach(item => {
        const nodeValue = graph.node(item);
        const [nodeType] = nodeValue;
        if (nodeType === 'component'){
            placedComponents.push(nodeValue[1]);
        } else if(nodeType === 'wire'){
            placedWires.push(nodeValue[1]);
        }
    });


    const junctions: RenderJunction[] = [];


    if (false) {
        const wirePoints: [x: number, y: number][] = [];
        for (const [, wireInfo] of wiresLookup) {
            const { wire, end } = wireInfo;
            wirePoints.push([wire.x, wire.y]);
            wirePoints.push([wire.x + end[0], wire.y + end[1]]);
        }

        // Tracks if wire points (start and ends only) have been repeated.
        // This is used to determine junction points.
        const wirePointCounts = wirePoints.reduce((accum, point) => {
            const found = accum.find(item => {
                return item[0] === point[0] && item[1] === point[1]
            });

            if (found) {
                found[2]++;
            } else {
                accum.push([point[0], point[1], 1]);
            }

            return accum;

        }, [] as WirePointCount[]);


        wirePointCounts.forEach(item => {
            const [x, y, count] = item;

            // Need to be at least 3 or more. If there are 2,
            // then it could just be a bend or a straight line.
            if (count > 2) {
                junctions.push(new RenderJunction(x, y));
            }
        });
    }

    return {
        components: placedComponents,
        wires: placedWires,
        junctions,
    };
}

function getPinNodeName(component: ClassComponent, pin:number): string {
    return component.instanceName + " pin:" + pin;
}

type RenderItem = RenderComponent | RenderWire;

// Components are always position relative to another position
// The position of ANOTHER component is described by:
//      refItem has position = [x1, y1]
//      At a given pin, the pin has an offset relative to the origin of refItem, let this offset be [offsetX, offsetY]
//      The position at the pin in absolute coords is [x1 + offsetX, y1 + offsetY]
// The current component pin has an offset relative to it's own origin (not refItem) of [pinX, pinY]
// So the current component position is [x1 + offsetX - pinX, y1 + offsetY - pinY]
type RenderPosition = [refItem: RenderItem | 0, offsetX: number, offsetY: number, pinX: number, pinY: number];

function resolvePosition(targetItem: RenderItem, renderItems: RenderItem[], depth = 0): [x: number, y: number][] | null {    
    const [refItem, refOffsetX, refOffsetY, pinX, pinY] = targetItem.position;

    if (refItem === 0) {
        // If is the first item, then return the pin offset
        return [[-pinX, -pinY]];

    } else if (refItem === null){
        return null;

    } else {
        const result = [[refOffsetX - pinX, refOffsetY - pinY]];

        for (let i = 0; i < renderItems.length; i++) {
            if (refItem === renderItems[i]) {
                const innerResults = resolvePosition(refItem, renderItems, depth + 1);
                return result.concat(innerResults);
            }
        }

        // If reached here, it means there was no matches found for refItem
        return result;
    }
}

// function resolvePosition2(position:LayoutPosition){
//     const {prev, next, item, offsetX, offsetY} = position;

//     if (prev && prev.item === 0){
//         return [[-offsetX, -offsetY]];
    
//     } else if (prev && prev.item !== 0 && prev.item !== null){
//         // If prev item is valid, then use it to find the correct position
//         const result = [prev.offsetX - offsetX, prev.offsetY - offsetY];

//         resolvePosition2(prev.item);
//     }
// }

type LayoutPosition = {
    item: RenderItem,
    offsetX: number,
    offsetY: number, 

    prev: {
        item: RenderItem | 0, 
        offsetX: number, 
        offsetY: number,
    }

    next?: {
        item: RenderItem,
        offsetX: number, 
        offsetY: number,
    }
}

type WireLookupInfo = {
    wire: RenderWire,
    end: [x: number, y: number]
}
type WirePointCount = [x: number, y: number, count: number];

function generateLayoutPinDefinition(component: ClassComponent): SymbolPinDefintion[] {
    const pins = component.pins;
    const symbolPinDefinitions: SymbolPinDefintion[] = [];
    const existingPinIds = Array.from(pins.keys());

    if (component.arrangeProps === null) {
        // Automatically split pins 
        
        for (let i = 0; i < existingPinIds.length; i++) {
            symbolPinDefinitions.push({
                side: (i % 2 === 0) ? "left" : "right",
                pinId: existingPinIds[i],
                text: pins.get(existingPinIds[i]).name
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
                        text: pins.get(pinId).name
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

export class RenderWire {
    // Starting point of the wire
    x = -1;
    y = -1;

    id: number;

    position: RenderPosition;

    segments: WireSegment[] = [];
    points = [];

    constructor(x: number, y: number, segments: WireSegment[]) {
        this.x = x;
        this.y = y;
        this.segments = segments;

        let tmpX = this.x;
        let tmpY = this.y;

        const points = [{ x: tmpX, y: tmpY }];

        this.segments.forEach(segment => {
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

            points.push({ x: tmpX, y: tmpY });
        });

        this.points = points;
    }

    getWireEnd(): { x: number, y: number } {
        return this.points[this.points.length - 1];
    }
}

export class RenderJunction {
    x: number;
    y: number;

    position: RenderPosition;

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }
}

export class RenderComponent {
    // Holds the render information of the component (position)

    component: ClassComponent;
    symbol: SymbolGraphic;

    x = -1;
    y = -1;

    width: number;
    height: number;

    displaySymbol: string | null = null;

    constructor(component: ClassComponent, width: number, height: number) {
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

function renderItemString(renderItem: RenderItem): string {
    if (renderItem instanceof RenderComponent) {
        return `component:${renderItem.component.instanceName}`;
    } else if (renderItem instanceof RenderWire) {
        return `wire:${renderItem.id}`;
    }
}

function isPointOverlap(x: number, y: number, other: RenderComponent): boolean {
    return (x >= other.x && y >= other.y && x <= (other.x + other.width) && y <= (other.y + other.height));
}