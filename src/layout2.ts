import lodash from 'lodash';

import { SymbolCustom, SymbolFactory, SymbolGraphic, SymbolPinDefintion } from "./draw_symbols";
import { ClassComponent } from "./objects/Component";
import { SequenceAction, SequenceItem } from "./objects/ExecutionScope";
import { GlobalNames } from './globals';
import { WireSegment } from './objects/Wire';
import { NumericValue } from './objects/ParamDefinition';

export async function prepareLayout2(
    sequence: SequenceItem[]
): Promise<{components: RenderComponent[], wires: RenderWire[], junctions: RenderJunction[]}> {

    const placedItems: RenderItem[] = [];

    let isFirstItem = true;

    const connectionsGraph: LayoutPosition[] = [];

    let previousItem: RenderComponent | RenderWire | null = null;

    // For components, this offset will be used for the pin position
    let prevItemOffsetX = 0;
    let prevItemOffsetY = 0;

    // Keeps track of the wire positions.
    const wiresLookup = new Map<number, WireLookupInfo>();

    for (let i = 0; i < sequence.length; i++) {
        // Do not need to handle nested components for now

        const action = sequence[i][0];
        let tmpComponent: RenderComponent;

        // Component related actions
        if (action === SequenceAction.At || action === SequenceAction.To) {
            // Size all elements first
            const component = sequence[i][1] as ClassComponent;
            const pin = sequence[i][2];

            // Make sure component has not been placed yet
            const tmpIndex = placedItems.findIndex(item => {
                if (item instanceof RenderComponent) {
                    return lodash.isEqual(item.component, component);
                }
            });

            // Component not placed yet
            if (tmpIndex === -1) {
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

                // get the pin position relative to origin of symbol
                const pinPosition = tmpSymbol.pinPosition(pin);
                let referenceItem:RenderItem | null | 0 = null;

                if (isFirstItem) {
                    isFirstItem = false;
                    referenceItem = 0;
                } else {
                    if (action === SequenceAction.At) {
                        referenceItem = null;
                        prevItemOffsetX = 0;
                        prevItemOffsetY = 0;

                    } else if (action === SequenceAction.To) {
                        referenceItem = previousItem;

                        // assume previous item in connectionGraph array is connected to this item
                        connectionsGraph[connectionsGraph.length - 1].next = {
                            item: tmpComponent,
                            offsetX: pinPosition.x,
                            offsetY: pinPosition.y
                        }
                    }
                }

                connectionsGraph.push({
                    item: tmpComponent,
                    offsetX: pinPosition.x,
                    offsetY: pinPosition.y,

                    prev: {
                        item: referenceItem,
                        offsetX: prevItemOffsetX,
                        offsetY: prevItemOffsetY,
                    }
                });

                tmpComponent.position = [referenceItem, prevItemOffsetX, prevItemOffsetY, pinPosition.x, pinPosition.y];

                previousItem = tmpComponent;
                prevItemOffsetX = pinPosition.x;
                prevItemOffsetY = pinPosition.y;

                placedItems.push(tmpComponent);

            } else {
                // Component already placed, just move current position to the pin position
                const tmpComponent = placedItems[tmpIndex] as RenderComponent;
                const pinPosition = tmpComponent.symbol.pinPosition(pin);

                if (action === SequenceAction.At) {
                    previousItem = null;
                    prevItemOffsetX = 0;
                    prevItemOffsetY = 0;

                } else if (action === SequenceAction.To) {
                    connectionsGraph[connectionsGraph.length - 1].next = {
                        item: tmpComponent,
                        offsetX: pinPosition.x,
                        offsetY: pinPosition.y
                    }
                }

                connectionsGraph.push({
                    item: tmpComponent,
                    offsetX: pinPosition.x,
                    offsetY: pinPosition.y,

                    prev: {
                        item: previousItem,
                        offsetX: prevItemOffsetX,
                        offsetY: prevItemOffsetY,
                    }
                });

                previousItem = tmpComponent;
                prevItemOffsetX = pinPosition.x;
                prevItemOffsetY = pinPosition.y;
            }

        } else if (action === SequenceAction.Wire) {
            // draw wires
            const [,wireId, wireSegments] = sequence[i] as [SequenceAction.Wire, number, WireSegment[]];

            const wire = new RenderWire(0, 0, wireSegments);
            wire.id = wireId;

            // Start position of the wire
            wire.position = [previousItem, prevItemOffsetX, prevItemOffsetY, 0, 0];

            const wireEnd = wire.getWireEnd();

            placedItems.push(wire);

            wiresLookup.set(wireId, {
                wire,
                end: [wireEnd.x, wireEnd.y]
            });

            connectionsGraph[connectionsGraph.length-1].next = {
                item: wire,
                offsetX: 0,
                offsetY: 0,
            };

            connectionsGraph.push({
                item: wire,
                offsetX: 0, offsetY: 0,
                prev: {
                    item: previousItem,
                    offsetX: prevItemOffsetX,
                    offsetY: prevItemOffsetY
                }
            });

            previousItem = wire;
            prevItemOffsetX = wireEnd.x;
            prevItemOffsetY = wireEnd.y;

        } else if (action === SequenceAction.WireJump) {
            const [, wireId] = sequence[i] as [SequenceAction.WireJump, number];

            if (wiresLookup.has(wireId)) {
                const wireInfo = wiresLookup.get(wireId);
                previousItem = wireInfo.wire;
                [prevItemOffsetX, prevItemOffsetY] = wireInfo.end;
            }
        }
    }
    
    connectionsGraph.forEach((connection, index) => {
        const {item, prev, next} = connection;        
    });

    // Resolve the positions of items
    // placedItems.forEach((item, index) => {

    //     if (item instanceof RenderComponent){
    //         console.log(index, 'component', item.component.instanceName);
    //     } else if (item instanceof RenderWire){
    //         console.log(index, 'wire', item.id);
    //     }

    //     const dPositions = resolvePosition(item, placedItems);
    //     console.log(index, dPositions);

    //     if (dPositions !== null){

    //         // Do not add up if any item in the list is null.
    //         // If there is a null item, it means that somewhere a component's
    //         // position cannot be resolved.
    //         if (dPositions.indexOf(null) === -1){
    //             // Merge all results together
    //             const finalPosition = dPositions.reduce((accum, value) => {
    //                 accum[0] += value[0];
    //                 accum[1] += value[1];
    //                 return accum;
    //             }, [0, 0]);

    //             item.x = finalPosition[0];
    //             item.y = finalPosition[1];
    //         }
    //     }
    // });


    const junctions: RenderJunction[] = [];

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

    const placedComponents = placedItems.filter(item => {
        return item instanceof RenderComponent;
    }) as RenderComponent[];

    const placedWires = placedItems.filter(item => {
        return item instanceof RenderWire;
    }) as RenderWire[];

    return {
        components: placedComponents,
        wires: placedWires,
        junctions,
    };
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

    position: RenderPosition;

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

function isPointOverlap(x: number, y: number, other: RenderComponent): boolean {
    return (x >= other.x && y >= other.y && x <= (other.x + other.width) && y <= (other.y + other.height));
}