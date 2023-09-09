import { G } from "@svgdotjs/svg.js";
import { vec2 } from "gl-matrix";
import * as turf from '@turf/turf';

import { SymbolPinSide, bodyColor, defaultFont } from "./globals";


/**
 * Symbols should also define where their ports
 */

const defaultSymbolLineColor = '#333';
const defaultSymbolLineWidth = 2;

export abstract class SymbolGraphic {

    drawPortsName = true;
    
    displayBounds = true;
    
    angle = 0;

    abstract size(): { width: number, height: number }

    abstract draw(group: G, extra?: {}): void;

    // Returns the port position, relative to the symbol origin
    abstract pinPosition(id: number): { x: number, y: number, angle: number }

    protected drawBounds(group: G, originX = 0, originY = 0): void {
        // const size = this.size();

        // group.rect(size.width, size.height)
        //     .translate(originX - size.width / 2, originY - size.height / 2)
        //     .fill('none')
        //     .stroke({
        //         width: 1,
        //         color: '#ccc'
        //     });
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

    drawing: SymbolDrawing;

    width = 50;
    height = 30;

    constructor(){
        super();

        const drawing = new SymbolDrawing();
        drawing.addHLine(-15, 0, 30)
                .addHLine(-10, 5, 20)
                .addHLine(-5, 10, 10)
                .addPin(0, 0, 0, -10, 1);

        this.drawing = drawing;
        const bbox = drawing.getBoundingBox();
        this.width = bbox.width;
        this.height = bbox.height;
    }

    
    size(): { width: number; height: number; } {
        return {
            width: this.width,
            height: this.height,
        }
    }

    draw(group: G): void {
        // Assume that the symbol is vertical
        const innerGroup = group.group();

        // Draw main symbol
        innerGroup.path(this.drawing.getPath())
            .stroke({
                width: defaultSymbolLineWidth,
                color: defaultSymbolLineColor
            });

        // Draw pins
        innerGroup.path(this.drawing.getPinsPath())
            .stroke({
                width: defaultSymbolLineWidth,
                color: '#c00',
            });

        if (this.displayBounds) {
            const bbox = this.drawing.getBoundingBox();
            
            innerGroup.circle(5)
                      .translate(-5/2, -5/2)
                      .fill('#333')
                      .stroke('none');
            
            innerGroup.rect(bbox.width, bbox.height)
                .translate(bbox.start[0], bbox.start[1])
                .fill('none')
                .stroke({
                    width: 1,
                    color: '#ccc',
                })
        }
    }

    pinPosition(id: number): { x: number; y: number; angle: number; } {
        const pin = this.drawing.getPinPosition(id);

        if (pin) {
            return {
                x: pin.end[0],
                y: pin.end[1],
                angle: pin.angle,
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

    // Dimensions when angle = 0
    width = 70;
    height = 30;

    size(): { width: number; height: number; } {
        const outVect: vec2 = [0, 0];
        const originVect: vec2 = [0, 0];
        const tmpVect: vec2 = [this.width, this.height];

        vec2.rotate(outVect, tmpVect, originVect, this.angle * Math.PI / 180);

        return {
            width: Math.abs(outVect[0]),
            height: Math.abs(outVect[1])
        }
    }

    draw(group: G, extra: {}): void {

        const innerGroup = group.group();
        
        // Draw rectangle form instead
        innerGroup.path('M0 15 h10 v-10 h50 v20 h-50 v-10 M60 15 h10')
            .stroke(
                {
                    width: defaultSymbolLineWidth,
                    color: defaultSymbolLineColor
                })
            .fill('none');

        if (extra && (extra.value !== null && extra.value !== undefined)) {
            // Draw resistor value
            innerGroup.text(extra.value)
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
            innerGroup.text(extra.instance_name)
                .translate(10, 0)
                .fill('#333')
                .font({
                    family: defaultFont,
                    size: 10,
                    anchor: 'start',
                })
        }

        // Draw the pin position
        innerGroup.translate(-this.width / 2, -this.height / 2)
            .rotate(this.angle, this.width / 2, this.height / 2);

        if (this.displayBounds) {
            this.drawBounds(group, 0, 0);
        }
    }

    pinPosition(id: number): { x: number; y: number; angle: number; } {
        const originPoint: vec2 = [0, 0];
        const newVec: vec2 = [0, 0];
        let newAngle;
        let pinVector: vec2;

        if (id === 1) {
            pinVector = [-this.width / 2, 0];
            newAngle = (180 + this.angle) % 360;

        } else if (id === 2) {
            pinVector = [this.width / 2, 0];
            newAngle = (0 + this.angle) % 360;
        }

        vec2.rotate(newVec, pinVector, originPoint, this.angle * Math.PI / 180);
        const [newX, newY] = newVec;

        return {
            x: newX,
            y: newY,
            angle: newAngle,
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


class SymbolDrawing {

    items: turf.Feature[] = [];

    // pinId, feature, angle
    pins: [number, turf.Feature, number][] = [];

    addLine(startX: number, startY: number, endX: number, endY: number): SymbolDrawing {
        this.items.push(
            turf.lineString([[startX, startY], [endX, endY]])
        );

        return this;
    }

    addPin(startX: number, startY: number, endX: number, endY: number, pinId: number): SymbolDrawing {
        // Determine the pin angle based on the start and end values.

        let angle = 0;

        if (startX === endX) {
            if (startY > endY) {
                angle = 270;
            } else if (startY < endY) {
                angle = 90;
            }
        } else {
            if (startX < endX) {
                angle = 0;
            } else if (startX > endX) {
                angle = 180;
            }
        }

        this.pins.push([
            pinId,
            turf.lineString([[startX, startY], [endX, endY]]),
            angle
        ])
        return this;
    }

    getPinPosition(pinId: number): { start: [number, number], end: [number, number], angle: number } {
        const pin = this.pins.find(item => {
            return item[0] === pinId;
        });

        if (pin) {
            const [pinId ,feature, angle] = pin;
            const coords = turf.getCoords(feature);

            return {
                start: coords[0],
                end: coords[1],
                angle,
            }
        }
    }

    addVLine(startX: number, startY: number, value: number): SymbolDrawing {
        this.items.push(
            turf.lineString([[startX, startY], [startX, startY + value]])
        );
        return this;
    }

    addHLine(startX: number, startY: number, value: number): SymbolDrawing {
        this.items.push(
            turf.lineString([[startX, startY], [startX + value, startY]])
        );
        return this;
    }

    getPath():string {
        return this.featuresToPath(this.items);
    }

    getPinsPath(): string {
        return this.featuresToPath(this.pins.map(item => {
            return item[1]
        }));
    }

    private featuresToPath(items: turf.Feature[]): string {
        const paths = [];
        items.forEach(item => {
            const coords = turf.getCoords(item);
            const [startX, startY] = coords[0];
            const [endX, endY] = coords[1];

            paths.push(`M${startX} ${startY} L${endX} ${endY}`);
        });

        return paths.join(" ");
    }

    getBoundingBox(): { width: number, height: number, start: [number, number], end: [number, number] } {
        const pinFeatures = this.pins.map(pin => {
            return pin[1];
        })

        const allItems = [...this.items, ...pinFeatures];
        const collection = turf.featureCollection(allItems);
        const [startX, startY, endX, endY] = turf.bbox(collection);

        return {
            start: [startX, startY],
            end: [endX, endY],
            width: endX - startX,
            height: endY - startY
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