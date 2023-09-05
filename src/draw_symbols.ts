import { G } from "@svgdotjs/svg.js";
import { SymbolPinSide, bodyColor, defaultFont } from "./globals";

/**
 * Symbols should also define where their ports
 */

const defaultSymbolLineColor = '#333';
const defaultSymbolLineWidth = 2;

export abstract class SymbolGraphic {

    drawPortsName = true;
    
    displayBounds = true;

    abstract size(): { width: number, height: number }

    abstract draw(group: G, extra?: {}): void;

    // Returns the port position, relative to the symbol origin
    abstract pinPosition(id: number): { x: number, y: number, angle: number }

    protected drawBounds(group: G): void {
        const size = this.size();
        group.rect(size.width, size.height)
            .fill('none')
            .stroke({
                width: 1,
                color: '#ccc'
            });
    }
}

export function SymbolFactory(name: string): SymbolGraphic | null {
    switch (name) {
        case 'gnd':
            return new SymbolGnd();
        case 'net':
            return new SymbolPower();
        case 'label':
            return new SymbolLabel();
        case 'res':
            return new SymbolRes();
        case 'cap':
            return new SymbolCap();
    }
}


export class SymbolPower extends SymbolGraphic {

    drawPortsName = false;

    size(): { width: number; height: number; } {
        return {
            width: 50,
            height: 30,
        }
    }

    draw(group: G, extra?: {}): void {
        group.path('M10 20 h30 M25 20 v10')
            .stroke({
                width: defaultSymbolLineWidth,
                color: defaultSymbolLineColor
            });

        if (extra) {
            const netName = extra.net_name;
            group.text(netName)
                .translate(25, 20 - 2)
                .fill('#333')
                .font({
                    family: defaultFont,
                    size: 10,
                    anchor: 'middle',
                })
        }

        if (this.displayBounds) {
            this.drawBounds(group);
        }
    }

    pinPosition(id: number): { x: number; y: number; angle: number; } {
        if (id === 1) {
            return {
                x: 25,
                y: 30,
                angle: 90,
            }
        }
    }
}

export class SymbolGnd extends SymbolGraphic {

    drawPortsName = false;
    
    size(): { width: number; height: number; } {
        return {
            width: 50,
            height: 30,
        }
    }

    draw(group: G): void {
        // Assume that the symbol is vertical
        group.path('M25 0 V10 M10 10 h30 M15 15 h20 M20 20 h10')
            .stroke(
                {
                    width: defaultSymbolLineWidth,
                    color: defaultSymbolLineColor
                });
        if(this.displayBounds){
            this.drawBounds(group);
        }
    }

    pinPosition(id: number): { x: number; y: number; angle: number; } {
        if (id === 1) {
            return {
                x: 25,
                y: 0,
                angle: 270,
            }
        }
    }
}

export class SymbolLabel extends SymbolGraphic {
    pinPosition(id: number): { x: number; y: number; angle: number; } {
        throw new Error("Method not implemented.");
    }
    drawPortsName = false;

    width = 80;
    height = 50;

    size(): { width: number, height: number } {
        return {
            width: this.width,
            height: this.height,
        }
    }

    draw(group: G, extra?: {}): void {
        group.line(0, this.height, this.width, this.height)
                .fill('none')
                .stroke({width: 1, color: '#333'});

        if (extra) {
            const netName = extra.net_name;
            group.text(netName)
                .translate(this.width / 2, this.height - 2)
                .fill('#333')
                .font({
                    family: defaultFont,
                    size: 10,
                    anchor: 'middle',
                })
        }

        if(this.displayBounds){
            this.drawBounds(group);
        }
    }
}

export class SymbolRes extends SymbolGraphic {

    drawPortsName = false;

    size(): { width: number; height: number; } {
        return {
            width: 70,
            height: 30,
        }
    }

    draw(group: G, extra: {}): void {
        // Draw rectangle form instead
        group.path('M0 15 h10 v-10 h50 v20 h-50 v-10 M60 15 h10')
            .stroke(
                {
                    width: defaultSymbolLineWidth,
                    color: defaultSymbolLineColor
                })
            .fill('none');


        if (extra && (extra.value !== null && extra.value !== undefined)) {
            // Draw resistor value
            group.text(extra.value)
                .translate(35, 20 - 2)
                .fill('#333')
                .font({
                    family: defaultFont,
                    size: 10,
                    anchor: 'middle',
                })
        }

        if (extra && extra.instance_name) {
            // draw instance name
            group.text(extra.instance_name)
                .translate(10, 0)
                .fill('#333')
                .font({
                    family: defaultFont,
                    size: 10,
                    anchor: 'start',
                })
        }

        if(this.displayBounds){
            this.drawBounds(group);
        }
    }

    pinPosition(id: number): { x: number; y: number; angle: number;} {
        if (id === 1) {
            return { x: 0, y: 15, angle: 180}
        } else if (id === 2) {
            return { x: 70, y: 15, angle: 0}
        }
    }
}

export class SymbolCap extends SymbolGraphic {

    drawPortsName = false;

    size(): { width: number; height: number; } {
        return {
            width: 50,
            height: 50,
        }
    }

    draw(group: G): void {
        group.path('M20 10 v30 M30 10 v30 M0 25 h20 M50 25 h-20')
            .stroke(
                {
                    width: defaultSymbolLineWidth,
                    color: defaultSymbolLineColor
                })
            .fill('none');

        if(this.displayBounds){
            this.drawBounds(group);
        }
    }

    pinPosition(id: number): { x: number; y: number; angle: number; } {
        if (id === 1){
            return {x: 0, y: 25, angle: 180}
        } else if (id === 2){
            return {x: 50, y: 25, angle: 0}
        }
    }

}

export class SymbolCustom extends SymbolGraphic {

    pinDefinition: SymbolPinDefintion[] = [];

    bodyWidth = 100;

    pinLength = 20;

    width = 100;
    height = 100;

    pinSpacing = 20;

    pinTextPadding = 5;

    pins: SymbolPinLayout[] = [];

    constructor(pinDefinition: SymbolPinDefintion[]){
        super();
        // define the left and right pins only for now
        this.pinDefinition = pinDefinition;

        // Determine the size based on the definition
        const leftPins = this.pinDefinition.filter(item => {
            return item.side === SymbolPinSide.Left;
        });

        const rightPins = this.pinDefinition.filter(item => {
            return item.side === SymbolPinSide.Right;
        });

        // This width also includes the width size
        this.width = this.bodyWidth + 2 * this.pinLength;

        this.height = (1 + Math.max(leftPins.length, rightPins.length)) * this.pinSpacing;

        // Setup the pins
        leftPins.forEach((pin, index) => {
            const pinY = (index + 1) * this.pinSpacing // Includes the offset too
            this.pins.push({
                pinId: pin.pinId,
                angle: 180,
                text: pin.text,
                start: {
                    x: 0,
                    y: pinY,
                },
                end: {
                    x: -this.pinLength,
                    y: pinY
                }
            });
        });

        rightPins.forEach((pin, index) => {
            const pinY = (index + 1) * this.pinSpacing // Includes the offset too
            this.pins.push({
                pinId: pin.pinId,
                angle: 0,
                text: pin.text,
                start: {
                    x: this.bodyWidth,
                    y: pinY,
                },
                end: {
                    x: this.bodyWidth + this.pinLength,
                    y: pinY
                }
            });
        });
    }

    size(): {width: number, height: number} {
        return {
            width: this.width,
            height: this.height,
        }
    }

    pinPosition(id: number): { x: number; y: number; angle: number; } {
        const matchingPin = this.pins.find(item => {
            return item.pinId === id;
        });

        if (matchingPin) {
            return {
                x: matchingPin.end.x,
                y: matchingPin.end.y,
                angle: matchingPin.angle,
            }
        }
    }

    draw(group: G, extra={}): void {
        // Draw the body first
        group.rect(this.bodyWidth, this.height)
             .fill(bodyColor)
             .stroke({
                width: defaultSymbolLineWidth,
                color: defaultSymbolLineColor
             });

        this.pins.forEach(item => {
            group.line([
                [item.start.x, item.start.y],
                [item.end.x, item.end.y]
            ]).stroke({
                width: defaultSymbolLineWidth,
                color: defaultSymbolLineColor
            });

            let textX = item.start.x;
            const textY = item.start.y;
            let textAnchor = 'start';

            let pinIdX = item.start.x - 5;
            const pinIdY = item.start.y - 3;
            let pinIdAnchor = 'start';

            if (item.angle === 180) {
                textX = item.start.x + this.pinTextPadding;
                textAnchor = 'start';

                pinIdX = item.start.x - 5;
                pinIdAnchor = 'end';
            } else {
                textX = item.start.x - this.pinTextPadding;
                textAnchor = 'end';

                pinIdX = item.start.x + 5;
                pinIdAnchor = 'start';
            }

            // Position pin text/name within body
            group.text(item.text)
                .translate(textX, textY)
                .font({
                    family: defaultFont,
                    size: 10,
                    anchor: textAnchor,
                    'dominant-baseline': 'central',
                });

            group.text(item.pinId.toString())
                 .translate(pinIdX, pinIdY)
                 .font({
                    family: defaultFont,
                    size: 10,
                    anchor: pinIdAnchor,
                 })
        });
        
        if (extra){
            const {instance_name = null} = extra;

            if (instance_name !== null){
                // draw the instance name
                group.text(instance_name)
                     .translate(0, -5)
                     .font({
                        family: defaultFont,
                        size: 10,
                        anchor: 'start',
                     })
            }
        }
    }
}


type SymbolPinLayout = {
    pinId: number,
    angle: number,
    text: string,
    start: {
        x: number, y: number
    },
    end: {
        x: number, y: number
    }
}

export type SymbolPinDefintion = {
    side: string,
    pinId: number,
    text: string, // Display value at the pin
}