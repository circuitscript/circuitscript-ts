import lodash from 'lodash';

import { SymbolCustom, SymbolFactory, SymbolGraphic, SymbolPinDefintion } from "./draw_symbols";
import { ClassComponent } from "./objects/Component";
import { SequenceAction, SequenceItem } from "./objects/ExecutionScope";
import { GlobalNames } from './globals';
import { WireSegment } from './objects/Wire';

export async function prepareLayout2(
    sequence: SequenceItem[]
): Promise<{components: RenderComponent[], wires: RenderWire[]}> {

    // TODO: automatically determine where wires can be added for spacing out
    // components.

    const placedComponents: RenderComponent[] = [];
    const placedWires: RenderWire[] = [];

    // Flag to ensure that the first item is well within the canvas
    let isFirstItem = true;

    // The starting position for layout
    let currentX = 0;
    let currentY = 0;

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

                // Provide some defaults first
                let useWidth = 100;
                let useHeight = 100;

                // If it is a gnd net, then use the gnd symbol
                if (displayProp === null && component.parameters.get('net_name') === GlobalNames.gnd){
                    displayProp = 'gnd';
                }

                let tmpSymbol: SymbolGraphic;

                if (displayProp !== null) {
                    tmpSymbol = SymbolFactory(displayProp);
                } else {
                    const symbolPinDefinitions = generateLayoutPinDefinition(component);
                    tmpSymbol = new SymbolCustom(symbolPinDefinitions);
                }

                const tmpSize = tmpSymbol.size();
                useWidth = tmpSize.width;
                useHeight = tmpSize.height;
    
                // get the pin position relative to origin of symbol
                const pinPosition = tmpSymbol.pinPosition(pin);

                const tmpComponent = new RenderComponent(component, useWidth, useHeight);
                
                if (isFirstItem){
                    // Make sure that the component is fully within canvas
                    isFirstItem = false;
                    currentX = pinPosition.x;
                    currentY = pinPosition.y;
                }
                
                tmpComponent.x = currentX - pinPosition.x;
                tmpComponent.y = currentY - pinPosition.y;

                tmpComponent.displaySymbol = displayProp;
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
            const wireSegments = sequence[i][1];
            const wire = new RenderWire(currentX, currentY, wireSegments);

            const wireEnd = wire.getWireEnd();
            currentX = wireEnd.x;
            currentY = wireEnd.y;

            placedWires.push(wire);
        }
    }

    return {
        components: placedComponents, 
        wires: placedWires
    };
}

function findFreeSpace(existingComponents: RenderComponent[], nextComponent: RenderComponent): RenderComponent {

    // Shallow clone to get the positon only
    const tmpComponent = new RenderComponent(nextComponent.component, nextComponent.width, nextComponent.height);
    tmpComponent.x = nextComponent.x;
    tmpComponent.y = nextComponent.y;

    const margin = 20;

    // Finds a location that does not overlap with existing components
    for (let i = 0; i < existingComponents.length; i++) {
        const currentComponent = existingComponents[i];

        if (tmpComponent.doesOverlap(currentComponent)){
            // move right to the "end" of the current component
            const moveToX = currentComponent.x + currentComponent.width + margin;
            tmpComponent.x = moveToX;
        }
    }

    return tmpComponent;
}

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