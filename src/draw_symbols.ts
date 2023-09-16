import { G } from "@svgdotjs/svg.js";

import { SymbolPinSide, bodyColor, defaultFont } from "./globals";
import { Feature, Geometry, HorizontalAlign, Label, LabelStyle, VerticalAlign } from "./geometry";


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

    // Stores a reference of <labelID> to the label value
    labelTexts = new Map<string, string>();

    get angle(): number {
        return this._angle;
    }

    set angle(value: number) {
        this._angle = value;
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

        this.drawLabels(innerGroup);

        // this.displayBounds && this.drawBounds(group);
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

        group.circle(3)
            .translate(-3 / 2, -3 / 2)
            .fill('red')
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
            .fill(bodyColor);
    }

    protected drawPins(group: G): void {
        // Draw pins
        group.path(this.drawing.getPinsPath())
            .stroke({
                width: defaultSymbolLineWidth,
                color: '#333',
            });
    }

    protected drawLabels(group: G): void {
        const labels = this.drawing.getLabels();

        labels.forEach(label => {
            const tmpLabel = label as Label;

            const {
                fontSize = 10,
                anchor = HorizontalAlign.Left, 
                vanchor = VerticalAlign.Bottom,
            } = tmpLabel.style;

            let useAnchor = 'start';
            let dominantBaseline = 'auto';

            switch(anchor){
                case HorizontalAlign.Left:
                    useAnchor = 'start';
                    break;

                case HorizontalAlign.Middle:
                    useAnchor = 'middle';
                    break;

                case HorizontalAlign.Right:
                    useAnchor = 'end';
                    break;
            }

            switch(vanchor){
                case VerticalAlign.Top:
                    dominantBaseline = 'hanging';
                    break;

                case VerticalAlign.Middle:
                    dominantBaseline = 'middle';
                    break;

                case VerticalAlign.Bottom:
                    dominantBaseline = 'text-top';
                    break;
            }

            const position = tmpLabel.getLabelPosition();
            
            group.text(tmpLabel.text)
                .translate(position[0], position[1])
                .rotate(this.angle, -position[0], -position[1])
                .fill('#333')
                .font({
                    family: defaultFont,
                    size: fontSize,
                    anchor: useAnchor,
                    'dominant-baseline': dominantBaseline,
                })
        });
    }

    setLabelValue(labelId: string, labelValue: string): void {
        this.labelTexts.set(labelId, labelValue);
    }

    getLabelValue(labelId: string): string {
        if (this.labelTexts.has(labelId)) {
            return this.labelTexts.get(labelId);
        }
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

        const netName = this.getLabelValue("net_name");

        drawing.addHLine(-15, 0, 30)
            .addPin(0, 0, 0, 10, 1)
            .addLabel(0, -5, netName,
                { fontSize: 10, anchor: HorizontalAlign.Middle });

        this.drawing = drawing;

        const bbox = drawing.getBoundingBox();
        this.width = bbox.width;
        this.height = bbox.height;
    }

}

export class SymbolGnd extends SymbolGraphic {

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

    refreshDrawing(): void {

        const value = this.getLabelValue("value");

        const drawing = new SymbolDrawing();
        drawing.addLabel(0, -2, value, {
            fontSize: 10,
            anchor: HorizontalAlign.Left
        })
            .addPin(0, 0, 0, 0, 1);

        this.drawing = drawing;

        const bbox = drawing.getBoundingBox();
        this.width = bbox.width;
        this.height = bbox.height;
    }

}

export class SymbolRes extends SymbolGraphic {

    refreshDrawing(): void {
        const width = 50;
        const height = 20;

        const drawing = new SymbolDrawing();
        drawing.angle = this._angle;

        const value = this.getLabelValue("value");
        const refdes = this.getLabelValue("refdes");

        drawing.addRect(0, 0, width, height)
            .addPin(-width / 2, 0, -width / 2 - 10, 0, 1)
            .addPin(width / 2, 0, width / 2 + 10, 0, 2)
            .addLabel(0, 0, value, {
                fontSize: 10,
                anchor: HorizontalAlign.Middle,
                vanchor: VerticalAlign.Middle,
            })
            .addLabel(-width / 2, -height / 2 - 5, refdes, {
                fontSize: 8,
                anchor: HorizontalAlign.Left,
            })
            ;

        const bbox = drawing.getBoundingBox();
        this.width = bbox.width;
        this.height = bbox.height;

        this.drawing = drawing;
    }
}

export class SymbolCap extends SymbolGraphic {

    refreshDrawing(): void {
        const width = 30;
        const height = 40;

        const drawing = new SymbolDrawing();
        drawing.angle = this._angle;

        const value = this.getLabelValue("value");

        drawing.addHLine(-width / 2, -3, width)
            .addHLine(-width / 2, 3, width)
            .addPin(0, -3, 0, -height / 2, 1)
            .addPin(0, 3, 0, height / 2, 2)
            .addLabel(width / 2 + 2, 0, value, {
                fontSize: 10,
                anchor: HorizontalAlign.Left,
            })
            ;

        const bbox = drawing.getBoundingBox();
        this.width = bbox.width;
        this.height = bbox.height;

        this.drawing = drawing;
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

    constructor(pinDefinition: SymbolPinDefintion[]) {
        super();

        // define the left and right pins only for now
        this.pinDefinition = pinDefinition;
    }

    refreshDrawing(): void {
        // Determine the size based on the definition

        const leftPins = this.pinDefinition.filter(item => {
            return item.side === SymbolPinSide.Left;
        });

        const rightPins = this.pinDefinition.filter(item => {
            return item.side === SymbolPinSide.Right;
        });

        const drawing = new SymbolDrawing();

        const bodyWidth = this.bodyWidth;
        const bodyHeight = (1 + Math.max(leftPins.length, rightPins.length)) * this.pinSpacing;

        drawing.addRect(0, 0, bodyWidth, bodyHeight);

        // Setup the pins
        const leftPinStart = -bodyWidth / 2;
        const rightPinStart = bodyWidth / 2;
        const pinStartY = -bodyHeight / 2;

        leftPins.forEach((pin, index) => {
            const pinY = pinStartY + (index + 1) * this.pinSpacing // Includes the offset too
            drawing.addPin(leftPinStart, pinY, leftPinStart - this.pinLength, pinY, pin.pinId);
            drawing.addLabel(leftPinStart + 4, pinY, pin.text, {
                fontSize: 10,
                anchor: HorizontalAlign.Left,
                vanchor: VerticalAlign.Middle,
            });
        });

        rightPins.forEach((pin, index) => {
            const pinY = pinStartY + (index + 1) * this.pinSpacing // Includes the offset too
            drawing.addPin(rightPinStart, pinY, rightPinStart + this.pinLength, pinY, pin.pinId);
            drawing.addLabel(rightPinStart - 4, pinY, pin.text, {
                fontSize: 10,
                anchor: HorizontalAlign.Right,
                vanchor: VerticalAlign.Middle,
            });
        });

        const instanceName = this.getLabelValue("refdes");
        const MPN = this.getLabelValue("MPN");

        drawing.addLabel(-bodyWidth/2, -bodyHeight/2 - 4, instanceName, {
            fontSize: 10,
            anchor: HorizontalAlign.Left,
        });

        drawing.addLabel(-bodyWidth/2, bodyHeight/2 + 4, MPN, {
            fontSize: 10,
            anchor: HorizontalAlign.Left,
            vanchor: VerticalAlign.Top,
        });

        this.drawing = drawing;

        // const {width, height} = drawing.getBoundingBox();
        // this.width = width;
        // this.height = height;

        // This width also includes the pin length
        this.width = this.bodyWidth + 2 * this.pinLength;
        this.height = (1 + Math.max(leftPins.length, rightPins.length)) * this.pinSpacing;
    }

}


class SymbolDrawing {

    items: Feature[] = [];

    // pinId, feature, angle
    pins: [number, Feature, number][] = [];

    angle = 0;

    mainOrigin:[number, number] = [0, 0];

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

    addLabel(x: number, y: number, textValue: string, style: LabelStyle): SymbolDrawing {
        this.items.push(
            Geometry.label(x, y, textValue, style)
        )

        return this;
    }

    getPath(): string {
        const nonLabels = this.items.filter(item => {
            return !(item instanceof Label);
        })

        const withAngle = Geometry.groupRotate(nonLabels, this.angle, this.mainOrigin);
        return this.featuresToPath(withAngle);
    }

    getPinsPath(): string {
        const features = this.pins.map(item => item[1]);
        const withAngle = Geometry.groupRotate(features, this.angle, this.mainOrigin);
        return this.featuresToPath(withAngle);
    }

    getLabels(): Label[] {
        return this.items.filter(item => item instanceof Label) as Label[];
    }

    private featuresToPath(items: Feature[]): string {
        return Geometry.featuresToPath(items);
    }

    getBoundingBox(): { width: number, height: number, start: [number, number], end: [number, number] } {
        const pinFeatures = this.pins.map(pin => {
            return pin[1];
        });

        const allItems = [...this.items, ...pinFeatures];

        const withAngle = Geometry.groupRotate(allItems, this.angle, this.mainOrigin);

        return Geometry.groupBounds(withAngle);
    }

    getPinPosition(pinId: number): { start: [number, number], end: [number, number], angle: number } {
        const pin = this.pins.find(item => {
            return item[0] === pinId;
        });

        if (pin) {
            const [pinId, feature, angle] = pin;

            // Apply angle to feature

            const withAngle = Geometry.rotateDegs(feature, this.angle, this.mainOrigin);
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

