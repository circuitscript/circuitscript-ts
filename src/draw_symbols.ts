import { G } from "@svgdotjs/svg.js";

import { SymbolPinSide, bodyColor, defaultFont } from "./globals";
import { Feature, Geometry, Label } from "./geometry";


/**
 * Symbols should also define where their ports
 */

const defaultSymbolLineColor = '#333';
const defaultSymbolLineWidth = 2;

export abstract class SymbolGraphic {

    drawPortsName = true;

    displayBounds = true;

    drawing: SymbolDrawing;

    _angle = 0;

    width: number;
    height: number;

    get angle(): number {
        return this._angle;
    }

    set angle(value: number) {
        this._angle = value;
        this.refreshDrawing();
    }

    constructor() {
        this.refreshDrawing();
    }

    abstract refreshDrawing(): void;

    size(): { width: number; height: number; } {
        return {
            width: this.width,
            height: this.height
        }
    }

    bounds() {
        return this.drawing.getBoundingBox();
    }

    draw(group: G, extra?: {}): void {
        // Assume that the symbol is vertical
        const innerGroup = group.group();

        this.drawBody(innerGroup);

        this.drawPins(innerGroup);

        this.displayBounds && this.drawBounds(group);
    }

    // Returns the port position, relative to the symbol origin
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

    protected drawBounds(group: G): void {
        const bbox = this.drawing.getBoundingBox();

        group.circle(5)
            .translate(-5 / 2, -5 / 2)
            .fill('#333')
            .stroke('none');

        group.rect(bbox.width, bbox.height)
            .translate(bbox.start[0], bbox.start[1])
            .fill('none')
            .stroke({
                width: 1,
                color: '#ccc',
            })
    }

    protected drawBody(group: G): void {
        // Draws the symbol body
        group.path(this.drawing.getPath())
            .stroke({
                width: defaultSymbolLineWidth,
                color: defaultSymbolLineColor
            })
            .fill('none');
    }

    protected drawPins(group: G): void {
        // Draw pins
        group.path(this.drawing.getPinsPath())
            .stroke({
                width: defaultSymbolLineWidth,
                color: '#c00',
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

    refreshDrawing(): void {
        const drawing = new SymbolDrawing();
        drawing.angle = this._angle;

        drawing.addHLine(-15, 0, 30)
                .addPin(0, 0, 0, 10, 1)
                .addLabel(0, -20, "POWER", 'center');
        
        this.drawing = drawing;

        const bbox = drawing.getBoundingBox();
        this.width = bbox.width;
        this.height = bbox.height;
    }

    drawPortsName = false;


    // draw(group: G, extra?: {}): void {
    //     group.path('M10 20 h30 M25 20 v10')
    //         .stroke({
    //             width: defaultSymbolLineWidth,
    //             color: defaultSymbolLineColor
    //         });

    //     if (extra) {
    //         const netName = extra.net_name;
    //         group.text(netName)
    //             .translate(25, 20 - 2)
    //             .fill('#333')
    //             .font({
    //                 family: defaultFont,
    //                 size: 10,
    //                 anchor: 'middle',
    //             })
    //     }

    //     if (this.displayBounds) {
    //         this.drawBounds(group);
    //     }
    // }
}

export class SymbolGnd extends SymbolGraphic {

    drawPortsName = false;

    drawing: SymbolDrawing;

    width = 50;
    height = 30;

    refreshDrawing(): void {
        const drawing = new SymbolDrawing();
        drawing.angle = this._angle;
        drawing.addHLine(-15, 0, 30)
            .addHLine(-10, 5, 20)
            .addHLine(-5, 10, 10)
            .addPin(0, 0, 0, -10, 1);

        this.drawing = drawing;
        const bbox = drawing.getBoundingBox();
        this.width = bbox.width;
        this.height = bbox.height;
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

    drawing: SymbolDrawing;

    width: number;
    height: number;

    refreshDrawing(): void {
        const width = 50;
        const height = 20;

        const drawing = new SymbolDrawing();
        drawing.angle = this._angle;

        drawing.addRect(0, 0, width, height)
            .addPin(-width / 2, 0, -width / 2 - 10, 0, 1)
            .addPin(width / 2, 0, width / 2 + 10, 0, 2);

        const bbox = drawing.getBoundingBox();
        this.width = bbox.width;
        this.height = bbox.height;

        this.drawing = drawing;
    }

    drawOld(group: G, extra: {}): void {

        const innerGroup = group.group();

        innerGroup.path(this.drawing.getPath())
                .fill('none')
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

        // // Draw rectangle form instead
        // innerGroup.path('M0 15 h10 v-10 h50 v20 h-50 v-10 M60 15 h10')
        //     .stroke(
        //         {
        //             width: defaultSymbolLineWidth,
        //             color: defaultSymbolLineColor
        //         })
        //     .fill('none');

        // if (extra && (extra.value !== null && extra.value !== undefined)) {
        //     // Draw resistor value
        //     innerGroup.text(extra.value)
        //         .translate(35, 20 - 2)
        //         .fill('#333')
        //         .font({
        //             family: defaultFont,
        //             size: 10,
        //             anchor: 'middle',
        //         })
        // }

        // if (extra && extra.instance_name) {
        //     // draw instance name
        //     innerGroup.text(extra.instance_name)
        //         .translate(10, 0)
        //         .fill('#333')
        //         .font({
        //             family: defaultFont,
        //             size: 10,
        //             anchor: 'start',
        //         })
        // }

        // // Draw the pin position
        // innerGroup.translate(-this.width / 2, -this.height / 2)
        //     .rotate(this.angle, this.width / 2, this.height / 2);

        // if (this.displayBounds) {
        //     this.drawBounds(group, 0, 0);
        // }

        this.displayBounds && this.drawBounds(group);
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

    refreshDrawing(): void {
        // throw new Error("Method not implemented.");
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

    items: Feature[] = [];

    // pinId, feature, angle
    pins: [number, Feature, number][] = [];

    angle = 0;

    addLine(startX: number, startY: number, endX: number, endY: number): SymbolDrawing {
        this.items.push(
            Geometry.segment([startX, startY], [endX, endY])
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
            Geometry.segment([startX, startY], [endX, endY]),
            angle
        ]);

        return this;
    }

    addVLine(startX: number, startY: number, value: number): SymbolDrawing {
        this.items.push(
            Geometry.segment([startX, startY], [startX, startY + value])
        );
        return this;
    }

    addHLine(startX: number, startY: number, value: number): SymbolDrawing {
        this.items.push(
            Geometry.segment([startX, startY], [startX + value, startY])
        );
        return this;
    }

    addRect(centerX: number, centerY: number,width: number, height: number): SymbolDrawing {
        const width2 = width/2;
        const height2 = height/2;

        this.items.push(
            Geometry.polygon([
                [centerX - width2, centerY - height2],
                [centerX + width2, centerY - height2],
                [centerX + width2, centerY + height2],
                [centerX - width2, centerY + height2],
                [centerX - width2, centerY - height2]
            ])
        );

        return this;
    }

    addLabel(x: number, y: number, textValue: string, align = 'left'): SymbolDrawing {
        this.items.push(
            Geometry.label(x, y, textValue, align)
        )

        return this;
    }

    getPath(): string {
        const withAngle = Geometry.groupRotate(this.items, this.angle, [0, 0]);
        return this.featuresToPath(withAngle);
    }

    getPinsPath(): string {
        const features = this.pins.map(item => item[1]);
        const withAngle = Geometry.groupRotate(features, this.angle, [0, 0]);
        return this.featuresToPath(withAngle);
    }

    private featuresToPath(items: Feature[]): string {
        const paths = [];

        items.forEach(item => {

            console.log(item);

            // Do not draw labels here
            if (item instanceof Label){
                return;
            }

            const coords = Geometry.getCoords(item);
            const path = [];
            for (let i = 0; i < coords.length; i++) {
                const [x, y] = coords[i];
                const command = (i === 0) ? 'M' : 'L';
                path.push(`${command} ${x} ${y}`);
            }

            paths.push(path.join(' '));
        });

        return paths.join(" ");
    }

    getBoundingBox(): { width: number, height: number, start: [number, number], end: [number, number] } {
        const pinFeatures = this.pins.map(pin => {
            return pin[1];
        })
        const allItems = [...this.items, ...pinFeatures];
        const withAngle = Geometry.groupRotate(allItems, this.angle, [0, 0]);
        
        return Geometry.groupBounds(withAngle);
    }

    getPinPosition(pinId: number): { start: [number, number], end: [number, number], angle: number } {
        const pin = this.pins.find(item => {
            return item[0] === pinId;
        });

        if (pin) {
            const [pinId, feature, angle] = pin;

            // Apply angle to feature

            const withAngle = Geometry.rotateDegs(feature, this.angle, [0, 0]);
            const coords = Geometry.getCoords(withAngle);

            return {
                start: coords[0],
                end: coords[1],
                angle,
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