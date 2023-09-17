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

    const placedComponents: RenderComponent[] = [];
    const placedWires: RenderWire[] = [];

    // The starting position for layout.
    let currentX = 0;
    let currentY = 0;

    // Keeps track of the wire positions.
    const wiresLookup = new Map<number, WireLookupInfo>();

    for (let i = 0; i < sequence.length; i++) {
        // Do not need to handle nested components for now

        const action = sequence[i][0];

        // Component related actions
        if (action === SequenceAction.At || action === SequenceAction.To) {
            // Size all elements first
            const component = sequence[i][1] as ClassComponent;
            const pin = sequence[i][2];

            // Make sure component has not been placed yet
            const tmpIndex = placedComponents.findIndex(item => {
                return lodash.isEqual(item.component, component);
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

                // get the pin position relative to origin of symbol
                const pinPosition = tmpSymbol.pinPosition(pin);
                const tmpComponent = new RenderComponent(component, useWidth, useHeight);

                tmpComponent.x = currentX - pinPosition.x;
                tmpComponent.y = currentY - pinPosition.y;

                tmpComponent.symbol = tmpSymbol;

                placedComponents.push(tmpComponent);

                currentX = tmpComponent.x + pinPosition.x;
                currentY = tmpComponent.y + pinPosition.y;

            } else {
                // Component already placed, just move curent position to the pin position
                const tmpComponent = placedComponents[tmpIndex];
                const relativePinPosition = tmpComponent.symbol.pinPosition(pin);

                currentX = tmpComponent.x + relativePinPosition.x;
                currentY = tmpComponent.y + relativePinPosition.y;
            }

        } else if (action === SequenceAction.Wire) {
            // draw wires
            const [,wireId, wireSegments] = sequence[i] as [SequenceAction.Wire, number, WireSegment[]];
            const startX = currentX;
            const startY = currentY;

            const wire = new RenderWire(startX, startY, wireSegments);

            const wireEnd = wire.getWireEnd();
            currentX = wireEnd.x;
            currentY = wireEnd.y;

            placedWires.push(wire);

            wiresLookup.set(wireId, {
                start: [startX, startY],
                end: [currentX, currentY]
            });

        } else if (action === SequenceAction.WireJump) {
            const [, wireId] = sequence[i] as [SequenceAction.WireJump, number];

            if (wiresLookup.has(wireId)) {
                const wireInfo = wiresLookup.get(wireId);
                currentX = wireInfo.end[0];
                currentY = wireInfo.end[1];
            }
        }
    }

    const wirePoints: [x: number, y: number][] = [];
    for (const [, wireInfo] of wiresLookup) {
        const { start, end } = wireInfo;
        wirePoints.push(start);
        wirePoints.push(end);
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

    const junctions: RenderJunction[] = [];
    wirePointCounts.forEach(item => {
        const [x, y, count] = item;

        // Need to be at least 3 or more. If there are 2,
        // then it could just be a bend or a straight line.
        if (count > 2) {
            junctions.push(new RenderJunction(x, y));
        }
    });

    return {
        components: placedComponents,
        wires: placedWires,
        junctions,
    };
}

type WireLookupInfo = {
    start: [x: number, y: number],
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

function isPointOverlap(x: number, y: number, other: RenderComponent): boolean {
    return (x >= other.x && y >= other.y && x <= (other.x + other.width) && y <= (other.y + other.height));
}