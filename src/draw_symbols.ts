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
        return (this._angle % 360);
    }

    set angle(value: number) {
        this._angle = value;
    }

    refreshDrawing(calculateSize = true): void {
        this.generateDrawing();
        calculateSize && this.calculateSize();
    }

    calculateSize(): void {
        const { width, height } = this.drawing.getBoundingBox();
        this.width = width;
        this.height = height;
    }

    // Subclasses should implement this
    abstract generateDrawing(): void;

    size(): { width: number; height: number; } {
        return {
            width: this.width,
            height: this.height
        }
    }

    draw(group: G, extra?: {}): void {
        // Assume that the symbol is vertical
        const innerGroup = group.group();

        this.drawBody(innerGroup);

        this.drawPins(innerGroup);

        this.drawLabels(innerGroup);

        this.drawPlaceRemove(innerGroup, extra);

        // this.displayBounds && this.drawBounds(group);
    }

    drawPlaceRemove(group: G, extra?: { place?: boolean }): void {
        if (extra && extra.place === false) {
            // Do not place this component!
            // Draw the x
            const { start, end } = this.drawing.getBoundingBox(true);

            group.path([
                "M", start[0], start[1], "L", end[0], end[1],
                "M", end[0], start[1], "L", start[0], end[1]
            ].join(" "))
                .stroke({
                    width: defaultSymbolLineWidth,
                    color: 'red'
                });
        }
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
                fontWeight = 'regular',
            } = tmpLabel.style ?? {};

            let anchorStyle = 'start';
            let dominantBaseline = 'auto';

            let useAnchor = anchor;
            if (this.angle === 180){
                // Special case to flip the text instead of rotating
                useAnchor = this.flipTextAnchor(anchor);
            }

            switch(useAnchor){
                case HorizontalAlign.Left:
                    anchorStyle = 'start';
                    break;

                case HorizontalAlign.Middle:
                    anchorStyle = 'middle';
                    break;

                case HorizontalAlign.Right:
                    anchorStyle = 'end';
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
            
            let useFont = defaultFont;
            if (fontWeight === 'bold'){
                useFont = 'Inter-Bold';
            }

            const text = group.text(tmpLabel.text)
                .fill('#333')
                .font({
                    family: useFont,
                    size: fontSize,
                    anchor: anchorStyle,
                    'dominant-baseline': dominantBaseline,
                    // weight: fontWeight,
                });

            if (this.angle === 180){
                text.translate(-position[0], position[1]);
            } else {
                text.translate(position[0], position[1])
                    .rotate(this.angle, -position[0], -position[1]);
            }
        });
    }

    flipTextAnchor(value: HorizontalAlign): HorizontalAlign {
        if (value === HorizontalAlign.Left) {
            return HorizontalAlign.Right
        } else if (value === HorizontalAlign.Right) {
            return HorizontalAlign.Left;
        } else {
            return HorizontalAlign.Middle;
        }
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
        case 'label':
            return new SymbolLabel();
        case 'point':
            return new SymbolPointHidden();

        case 'diode':
            return new SymbolDiode();
        case 'led':
            return new SymbolLED();
    }
}


export class SymbolPower extends SymbolGraphic {

    generateDrawing(): void {
        const drawing = new SymbolDrawing();
        drawing.angle = this._angle;

        const netName = this.getLabelValue("net_name");

        drawing.addHLine(-15, 0, 30)
            .addPin(0, 0, 0, 10, 1)
            .addLabel(0, -5, netName,
                { fontSize: 10, anchor: HorizontalAlign.Middle });

        this.drawing = drawing;
    }

}

export class SymbolGnd extends SymbolGraphic {

    generateDrawing(): void {
        const drawing = new SymbolDrawing();
        drawing.angle = this._angle;
        drawing.addHLine(-15, 0, 30)
            .addHLine(-10, 5, 20)
            .addHLine(-5, 10, 10)
            .addPin(0, 0, 0, -10, 1);

        this.drawing = drawing;
    }
}

export class SymbolLabel extends SymbolGraphic {

    generateDrawing(): void {

        const value = this.getLabelValue("value");

        const drawing = new SymbolDrawing();
        drawing.addLabel(0, -2, value, {
            fontSize: 10,
            anchor: HorizontalAlign.Left
        })
            .addPin(0, 0, 0, 0, 1);

        this.drawing = drawing;
    }

}

export class SymbolRes extends SymbolGraphic {

    generateDrawing(): void {
        const width = 40;
        const height = 20;

        const drawing = new SymbolDrawing();
        drawing.angle = this._angle;

        const value = this.getLabelValue("value");
        const refdes = this.getLabelValue("refdes");

        drawing.addRect(0, 0, width, height)
            .addPin(-width / 2, 0, -width / 2 - 20, 0, 1)
            .addPin(width / 2, 0, width / 2 + 20, 0, 2)
            .addLabel(0, 0, value, {
                fontSize: 10,
                anchor: HorizontalAlign.Middle,
                vanchor: VerticalAlign.Middle,
            })
            .addLabel(-width / 2, -height / 2 - 5, refdes, {
                fontSize: 10,
                anchor: HorizontalAlign.Left,
            })
            ;

        this.drawing = drawing;
    }
}

export class SymbolCap extends SymbolGraphic {

    generateDrawing(): void {
        const width = 20;
        const height = 40;

        const drawing = new SymbolDrawing();
        drawing.angle = this._angle;

        const refdes = this.getLabelValue("refdes");
        const value = this.getLabelValue("value");

        drawing.addHLine(-width / 2, -3, width)
            .addHLine(-width / 2, 3, width)
            .addPin(0, -3, 0, -height / 2, 1)
            .addPin(0, 3, 0, height / 2, 2)
            .addLabel(width / 2 + 2, 0, refdes, {
                fontSize: 10,
                anchor: HorizontalAlign.Left,
            })
            .addLabel(width / 2 + 2, 12, value, {
                fontSize: 10,
                anchor: HorizontalAlign.Left,
                vanchor: VerticalAlign.Top,
            })
            ;

        this.drawing = drawing;
    }
}

export class SymbolDiode extends SymbolGraphic {
    
    generateDrawing(): void {
        const width = 20;
        const height = 20;

        const drawing = new SymbolDrawing();
        drawing.angle = this._angle;
        const refdes = this.getLabelValue("refdes");

        // Diode is drawn horizontally
        //  -|>|-
        drawing.addVLine(width/2, -height/2, height)
            .addVLine(-width/2, -height/2, height)
            .addLine(-width/2, -height/2, width/2, 0)
            .addLine(-width/2, height/2, width/2, 0)
            .addPin(width/2, 0, width/2 + 20, 0, 2)     // Cathode
            .addPin(-width/2, 0, -width/2 -20, 0, 1)    // Anode

            .addLabel(width / 2 + 5, 5, refdes, {
                fontSize: 10,
                anchor: HorizontalAlign.Left,
                vanchor: VerticalAlign.Top,
            });

        this.drawing = drawing;
    }
}

export class SymbolLED extends SymbolGraphic {
    
    generateDrawing(): void {
        const width = 20;
        const height = 20;

        const drawing = new SymbolDrawing();
        drawing.angle = this._angle;

        const refdes = this.getLabelValue("refdes");
    
        drawing.addVLine(width/2, -height/2, height)
            .addVLine(-width/2, -height/2, height)
            .addLine(-width/2, -height/2, width/2, 0)
            .addLine(-width/2, height/2, width/2, 0)
            .addLine(0, 8, 5, 18)
            .addLine(3, 8, 8, 18)
            .addPin(width/2, 0, width/2 + 20, 0, 1)
            .addPin(-width/2, 0, -width/2 -20, 0, 2)

            .addLabel(width / 2 + 5, 5, refdes, {
                fontSize: 10,
                anchor: HorizontalAlign.Left,
                vanchor: VerticalAlign.Top,
            });

        this.drawing = drawing;
    }
}

export class SymbolPointHidden extends SymbolGraphic {
    generateDrawing(): void {
        const drawing = new SymbolDrawing();
        drawing.addPin(0, 0, 0, 0, 1);

        this.drawing = drawing;
    }
}

export class SymbolText extends SymbolGraphic {

    text: string;
    fontSize = 10;
    fontWeight = 'regular';

    constructor(text: string){
        super();
        this.text = text;
    }

    generateDrawing(): void {
        const drawing = new SymbolDrawing();
        drawing.addLabel(0, 0, this.text, {
            fontSize: this.fontSize,
            anchor: HorizontalAlign.Middle,
            fontWeight: this.fontWeight,
        });

        this.drawing = drawing;
    }
}

export class SymbolPlaceholder extends SymbolGraphic {
    // This is used if the drawing object is defined within
    // circuitscript code itself.
    generateDrawing(): void {

        const drawing = this.drawing as SymbolDrawingCommands;
        drawing.angle = this._angle;

        const commands = drawing.getCommands();

        commands.forEach(([commandName, positionParams, keywordParams]) => {
            if (commandName === 'rect') {
                drawing.addRect(...positionParams);

            } else if (commandName === 'pin') {
                drawing.addPin2(...positionParams);

            } else if (commandName === 'hline') {
                drawing.addHLine(...positionParams);

            } else if (commandName === 'vline') {
                drawing.addVLine(...positionParams);

            } else if (commandName === 'line') {
                drawing.addLine(...positionParams);

            } else if (commandName === 'label') {
                const keywords = ['fontSize', 'anchor', 'vanchor'];

                // Create the style object
                const style = {};
                keywords.forEach(item => {
                    if (keywordParams.has(item)){
                        style[item] = keywordParams.get(item);
                    }
                });

                positionParams.push(style);

                const labelId = positionParams[0];

                const tmpPositionParams = [...positionParams];
                tmpPositionParams[3] = this.getLabelValue(labelId);

                drawing.addLabelId(...tmpPositionParams);
            }
        });
    }

    constructor(drawing: SymbolDrawing) {
        super();
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

    _cacheLeftPins: SymbolPinDefintion[];
    _cacheRightPins: SymbolPinDefintion[];

    constructor(pinDefinition: SymbolPinDefintion[]) {
        super();

        // define the left and right pins only for now
        this.pinDefinition = pinDefinition;
    }

    generateDrawing(): void {
        // Determine the size based on the definition

        const leftPins = this.pinDefinition.filter(item => {
            return item.side === SymbolPinSide.Left;
        });

        const rightPins = this.pinDefinition.filter(item => {
            return item.side === SymbolPinSide.Right;
        });

        const maxLeftPins = Math.max(...leftPins.map(item => item.position)) + 1;
        const maxRightPins = Math.max(...rightPins.map(item => item.position)) + 1;

        const drawing = new SymbolDrawing();
        drawing.angle = this._angle;

        const bodyWidth = this.bodyWidth;
        const bodyHeight = (1 + Math.max(maxLeftPins, maxRightPins)) * this.pinSpacing;

        drawing.addRect(0, 0, bodyWidth, bodyHeight);

        // Setup the pins
        const leftPinStart = -bodyWidth / 2;
        const rightPinStart = bodyWidth / 2;
        const pinStartY = -bodyHeight / 2;

        leftPins.forEach(pin => {
            const position = pin.position;
            const pinY = pinStartY + (position + 1) * this.pinSpacing // Includes the offset too
            drawing.addPin(leftPinStart, pinY, leftPinStart - this.pinLength, pinY, pin.pinId);
            drawing.addLabel(leftPinStart + 4, pinY, pin.text, {
                fontSize: 10,
                anchor: HorizontalAlign.Left,
                vanchor: VerticalAlign.Middle,
            });

            // Add the pin number
            drawing.addLabel(leftPinStart - 2 , pinY - 2, pin.pinId.toString(), {
                fontSize: 8,
                anchor: HorizontalAlign.Right,
                vanchor: VerticalAlign.Bottom,
            });
        });

        rightPins.forEach(pin => {
            const position = pin.position;
            const pinY = pinStartY + (position + 1) * this.pinSpacing // Includes the offset too
            drawing.addPin(rightPinStart, pinY, rightPinStart + this.pinLength, pinY, pin.pinId);
            drawing.addLabel(rightPinStart - 4, pinY, pin.text, {
                fontSize: 10,
                anchor: HorizontalAlign.Right,
                vanchor: VerticalAlign.Middle,
            });

            // Add the pin number
            drawing.addLabel(rightPinStart + 2 , pinY - 2, pin.pinId.toString(), {
                fontSize: 8,
                anchor: HorizontalAlign.Left,
                vanchor: VerticalAlign.Bottom,
            });
        });

        const instanceName = this.getLabelValue("refdes");
        const MPN = this.getLabelValue("MPN");

        instanceName && drawing.addLabel(-bodyWidth/2, -bodyHeight/2 - 4, instanceName, {
            fontSize: 10,
            anchor: HorizontalAlign.Left,
        });

        MPN && drawing.addLabel(-bodyWidth/2, bodyHeight/2 + 4, MPN, {
                fontSize: 10,
                anchor: HorizontalAlign.Left,
                vanchor: VerticalAlign.Top,
            });

        this.drawing = drawing;
        this._cacheLeftPins = leftPins;
        this._cacheRightPins = rightPins;
    }

    calculateSize(): void {
        // This width also includes the pin length
        this.width = this.bodyWidth + 2 * this.pinLength;
        this.height = (1 + Math.max(this._cacheLeftPins.length, 
            this._cacheRightPins.length)) * this.pinSpacing;
    }

}


export class SymbolDrawing {

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
        return this.addPin2(pinId, startX, startY, endX, endY);
    }

    addPin2(pinId: number, startX: number, startY: number, 
        endX: number, endY: number): SymbolDrawing {

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

    addRect2(x: number, y: number, x2: number, y2: number): SymbolDrawing {
        this.items.push(
            Geometry.polygon([
                [x, y],
                [x2, y],
                [x2, y2],
                [x, y2],
                [x, y]
            ])
        );

        return this;
    }

    addLabel(x: number, y: number, textValue: string, style: LabelStyle): SymbolDrawing {
        this.items.push(
            Geometry.label(null, x, y, textValue, style)
        )

        return this;
    }

    addLabelId(id: string, x: number, y: number, textValue: string, style: LabelStyle,): SymbolDrawing {
        this.items.push(
            Geometry.label(id, x, y, textValue, style)
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

    getBoundingBox(excludeLabels = false): {
        width: number, height: number,
        start: SimplePoint, end: SimplePoint
    } {
        // If excludeLabels is true, then do not add labels to the list
        // of items to measure the boundaries.

        const pinFeatures = this.pins.map(pin => {
            return pin[1];
        });

        const drawingFeatures = this.items.reduce((accum, item) => {
            if (!excludeLabels || (excludeLabels && !(item instanceof Label))){
                accum.push(item);
            }

            return accum;

        }, [] as Feature[]);

        const measureItems = [...drawingFeatures, ...pinFeatures];

        const withAngle = Geometry.groupRotate(measureItems, this.angle, this.mainOrigin);

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

export type SubExpressionCommand = [commandName: string,
    positionParams: any[],
    keywordParams: Map<string, any>];

export class SymbolDrawingCommands extends SymbolDrawing {

    private commands: SubExpressionCommand[];

    constructor(commands: SubExpressionCommand[]){
        super();
        this.commands = commands;
    }

    getCommands(): SubExpressionCommand[] {
        return this.commands;
    }
}

type SimplePoint = [x: number, y: number];

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
    position: number,
}

