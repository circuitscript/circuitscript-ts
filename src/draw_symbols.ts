import { G } from "@svgdotjs/svg.js";

import { SymbolPinSide, bodyColor, defaultFontBold, defaultFont } from "./globals.js";
import { Feature, Geometry, GeometryProp, HorizontalAlign, Label, LabelStyle, VerticalAlign } from "./geometry.js";
import { Logger } from "./logger.js";


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
                x: pin.start[0],
                y: pin.start[1],
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

        const paths = this.drawing.getPaths();
        paths.forEach(pathInfo => {
            const {path, lineColor, fillColor, lineWidth} = pathInfo;
            group.path(path)
                .stroke({
                    width: lineWidth,
                    color: lineColor,
                })
                .fill(fillColor)
        });
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
            const isRotation180 = Math.abs(this.angle) === 180;

            if (isRotation180){
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
            const useFont = defaultFont;

            const text = group.text(tmpLabel.text)
                .fill('#333')
                .font({
                    family: useFont,
                    size: fontSize,
                    anchor: anchorStyle,
                    'dominant-baseline': dominantBaseline,
                    weight: fontWeight,
                });

            if (isRotation180){
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
        case 'point':
            return new SymbolPointHidden();
    }
}

export class SymbolPointHidden extends SymbolGraphic {
    generateDrawing(): void {
        const drawing = new SymbolDrawing();
        drawing.addPin(1, 0, 0, 0, 0);

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

        drawing.log("=== start generate drawing ===");
        
        drawing.clear();
        drawing.angle = this._angle;
        const commands = drawing.getCommands();

        drawing.log('id: ', drawing.id, 'angle: ', this._angle, "commands:", commands.length);

        commands.forEach(([commandName, positionParams, keywordParams]) => {
            switch (commandName) {
                case PlaceHolderCommands.rect:
                    drawing.log('add rect', ...positionParams);
                    drawing.addRect(...positionParams);
                    break;

                case PlaceHolderCommands.hline:
                    drawing.log('add hline', ...positionParams);
                    drawing.addHLine(...positionParams);
                    break;

                case PlaceHolderCommands.vline:
                    drawing.log('add vline', ...positionParams);
                    drawing.addVLine(...positionParams);
                    break;

                case PlaceHolderCommands.line:
                    drawing.log('add line', ...positionParams);
                    drawing.addLine(...positionParams);
                    break;

                case PlaceHolderCommands.path:
                    drawing.addPath(...positionParams);
                    break;

                case PlaceHolderCommands.lineWidth:
                    drawing.addSetLineWidth(...positionParams);
                    break;

                case PlaceHolderCommands.fill:
                    drawing.addSetFillColor(...positionParams);
                    break;

                case PlaceHolderCommands.lineColor:
                    drawing.addSetLineColor(...positionParams);
                    break;

                case PlaceHolderCommands.arc:
                    drawing.addArc(...positionParams);
                    break;

                case PlaceHolderCommands.circle:
                    // circle params: center x, center y, radius
                    drawing.addArc(...positionParams, 0, 359.999);
                    break;

                case PlaceHolderCommands.triangle:
                    drawing.addTriangle(...positionParams);
                    break;

                case PlaceHolderCommands.pin: {
                    drawing.log('add pin', ...positionParams);

                    const keywordDisplayPinId = 'display_pin_id';
                    let displayPinId = true;

                    if (keywordParams.has(keywordDisplayPinId)) {
                        if (keywordParams.get(keywordDisplayPinId) === 0) {
                            displayPinId = false;
                        }
                    }

                    let pinNameParam: string | null = null;
                    if (typeof positionParams[1] === 'string') {
                        // If the type of the second position is a string, then
                        // use the string value as the pin name
                        pinNameParam = positionParams[1];
                        positionParams = [positionParams[0], ...positionParams.slice(2)];
                    }

                    drawing.addPin(...positionParams);

                    // Add a label for the pinId and pinName
                    const latestPin = this.drawing.pins[this.drawing.pins.length - 1];
                    const [pinId, , angle] = latestPin;
                    const [, , , endX, endY] = positionParams;

                    let pinNameAlignment = HorizontalAlign.Left;
                    let pinNameOffsetX = 4;

                    let pinIdOffsetX = 0;
                    let pinIdAlignment = HorizontalAlign.Left;

                    let pinIdVAlignment = VerticalAlign.Bottom;
                    let pinIdOffsetY = -2;

                    switch (angle) {
                        case 0:
                            pinNameAlignment = HorizontalAlign.Left;
                            pinNameOffsetX = 4;
                            pinIdAlignment = HorizontalAlign.Right;
                            pinIdOffsetX = -2;
                            break;
                        case 90:
                        case 180:
                            pinNameAlignment = HorizontalAlign.Right;
                            pinNameOffsetX = -4;
                            pinIdAlignment = HorizontalAlign.Left;
                            pinIdOffsetX = 2;
                            break;
                        case 270:
                            pinNameAlignment = HorizontalAlign.Left;
                            pinNameOffsetX = 4;
                            pinIdAlignment = HorizontalAlign.Left;
                            pinIdOffsetX = 2;
                            pinIdOffsetY = 2;
                            pinIdVAlignment = VerticalAlign.Top;
                            break;
                    }

                    if (angle === 0 || angle === 90 || angle === 180 || angle === 270) {
                        const usePinName = pinNameParam ?? "";

                        // Draw the pinName
                        usePinName !== "" && drawing.addLabel(
                            endX + pinNameOffsetX, endY, usePinName, {
                            fontSize: 10,
                            anchor: pinNameAlignment,
                            vanchor: VerticalAlign.Middle,
                        });

                        // Draw pin Id
                        displayPinId && drawing.addLabel(
                            endX + pinIdOffsetX, endY + pinIdOffsetY, pinId.toString(), {
                            fontSize: 8,
                            anchor: pinIdAlignment,
                            vanchor: pinIdVAlignment,
                        });
                    }
                    break;
                }

                case PlaceHolderCommands.label: {
                    const keywords = ['fontSize', 'anchor', 'vanchor'];

                    // Create the style object
                    const style = {};
                    keywords.forEach(item => {
                        if (keywordParams.has(item)) {
                            style[item] = keywordParams.get(item);
                        }
                    });

                    positionParams = [...positionParams];
                    positionParams.push(style);

                    const labelId = positionParams[0];

                    const tmpPositionParams = [...positionParams];

                    const tmpLabelValue = this.getLabelValue(labelId);
                    if (tmpLabelValue !== undefined) {
                        tmpPositionParams[3] = tmpLabelValue;
                    }

                    drawing.log('add label', JSON.stringify(tmpPositionParams));
                    drawing.addLabelId(...tmpPositionParams);
                    break;
                }
            }
        });

        drawing.log("=== end generate drawing ===");
    }

    constructor(drawing: SymbolDrawing) {
        super();
        this.drawing = drawing;
    }
}

export enum PlaceHolderCommands { 
    arc = 'arc',
    circle = 'circle',
    rect = 'rect',
    triangle = 'triangle',
    pin = 'pin',
    hline = 'hline',
    vline = 'vline',
    line = 'line',
    label = 'label',
    path = 'path',
    lineWidth = 'lineWidth',
    fill = 'fill',
    lineColor = 'lineColor'
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

        // drawing.addSetFillColor(bodyColor);

        drawing.addRect(0, 0, bodyWidth, bodyHeight);

        // Setup the pins
        const leftPinStart = -bodyWidth / 2;
        const rightPinStart = bodyWidth / 2;
        const pinStartY = -bodyHeight / 2;

        leftPins.forEach(pin => {
            const position = pin.position;
            const pinY = pinStartY + (position + 1) * this.pinSpacing // Includes the offset too
            drawing.addPin(pin.pinId, leftPinStart - this.pinLength, pinY, leftPinStart, pinY);

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
            drawing.addPin(pin.pinId, rightPinStart + this.pinLength, pinY, rightPinStart, pinY);

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

    items: (Feature | GeometryProp)[] = [];

    // pinId, feature, angle
    pins: [number, Feature, number][] = [];

    angle = 0;

    mainOrigin:[number, number] = [0, 0];

    logger: Logger = null;

    clear(): void {
        this.items = [];
        this.pins = [];
    }

    log(...params: any[]): void {
        this.logger && this.logger.add(params.join(' '));
    }

    addLine(startX: number, startY: number, endX: number, endY: number): SymbolDrawing {
        this.items.push(
            Geometry.segment([startX, startY], [endX, endY])
        );

        return this;
    }

    addPin(pinId: number, startX: number, startY: number, 
        endX: number, endY: number): SymbolDrawing {

        // Determine the pin angle based on the start and end values.
        // The angle is relative to the x-axis and rotates ANTI-CLOCKWISE 
        //           90 
        //     180 --+--> 0
        //          270

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

    addTriangle(startX: number, startY: number, endX: number, endY: number, width: number): SymbolDrawing {
        const line = Geometry.line(
            startX, startY,
            endX, endY);

        const normLine = line.norm;
        const dx1 = normLine.x * width / 2;
        const dy1 = normLine.y * width / 2;
        const dx2 = normLine.x * -width / 2;
        const dy2 = normLine.y * -width / 2;

        this.items.push(
            Geometry.polygon([
                [dx1 + startX, dy1 + startY],
                [dx2 + startX, dy2 + startY],
                [endX, endY],
                [dx1 + startX, dy1 + startY],
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

    addPath(...pathParts:any): SymbolDrawing {
        const parts = pathParts.reduce((accum, tmp) => {
            if (typeof tmp === "string"){
                accum = accum.concat(tmp.split(" "));
            } else if (typeof tmp === "number"){
                accum.push(tmp);
            }
            return accum;
        }, [] as (number|string)[]);

        const geomObjects = [];
        let currentObj: [x: number, y: number][] = null;

        for (let i = 0; i < parts.length; i++) {
            const command = parts[i];
            if (command === 'M') {
                // Start a new object
                if (currentObj !== null) {
                    geomObjects.push(currentObj);
                }

                const x = Number(parts[i + 1]);
                const y = Number(parts[i + 2]);

                currentObj = [[x, y]];

                i += 2;

            } else if (command === 'L') {
                const x = Number(parts[i + 1]);
                const y = Number(parts[i + 2]);
                currentObj.push([x, y]);

                i += 2;

            } else if (command === 'Z'){
                // Return back to first point in path
                const firstPoint = currentObj[0];
                currentObj.push(firstPoint);
            }
        }

        if (currentObj !== null){
            geomObjects.push(currentObj);
            currentObj = null;
        }

        geomObjects.forEach(coords => {
            const [first] = coords;
            const last = coords[coords.length - 1];

            if (first[0] === last[0] && first[1] === last[1]){
                // If both are the same, then this is a polygon
                this.items.push(Geometry.polygon(coords));
            } else {
                this.items.push(Geometry.multiline(coords));
            }
        })

        return this;
    }

    addSetLineWidth(value: number): SymbolDrawing {
        this.items.push(new GeometryProp('lineWidth', value));
        return this;
    }

    addSetLineColor(value: string): SymbolDrawing {
        this.items.push(new GeometryProp('lineColor', value));
        return this;
    }

    addSetFillColor(value: string): SymbolDrawing {
        this.items.push(new GeometryProp('fillColor', value));
        return this;
    }

    addArc(x: number, y: number, radius: number, 
        startAngle: number, endAngle: number): SymbolDrawing {

        // Angles in degrees, convert to radians
        startAngle = startAngle * Math.PI / 180;
        endAngle = endAngle * Math.PI / 180;
        
        this.items.push(
            Geometry.arc([x, y], radius, startAngle, endAngle, true));

        return this;
    }

    getPaths(): {path: string, 
        fillColor: string, 
        lineColor: string, 
        lineWidth: number}[] {
        
        let currentFill = "#fff";
        let currentLineWidth = 1;
        let currentLineColor = '#333';

        const pathItems = [];

        this.items.forEach(item => {
            if (!(item instanceof Label)){
                if (item instanceof GeometryProp){
                    if (item.name === 'lineWidth'){
                        currentLineWidth = item.value as number;
                    } else if (item.name === 'lineColor'){
                        currentLineColor = item.value as string;
                    } else if (item.name === 'fillColor'){
                        currentFill = item.value as string;
                    }
                } else {
                    const rotatedPath = Geometry.groupRotate([item], this.angle, 
                        this.mainOrigin);

                    const {path, isClosedPolygon} = 
                        this.featuresToPath(rotatedPath);
                
                    pathItems.push({
                        path: path,
                        lineWidth: currentLineWidth,
                        lineColor: currentLineColor,
                        fillColor: isClosedPolygon ? currentFill : 'none',
                    });
                }
            }
        });
        
        return pathItems;
    }

    getPinsPath(): string {
        const features = this.pins.map(item => item[1]);
        const withAngle = Geometry.groupRotate(features, this.angle, this.mainOrigin);
        const { path } = this.featuresToPath(withAngle);
        return path;
    }

    getLabels(): Label[] {
        return this.items.filter(item => item instanceof Label) as Label[];
    }

    private featuresToPath(items: Feature[]): 
        {path: string, isClosedPolygon: boolean} {
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
                if (!(item instanceof GeometryProp)){
                    accum.push(item);
                }
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

    id = "";
    private commands: SubExpressionCommand[];

    constructor(commands: SubExpressionCommand[]){
        super();
        this.commands = commands;
        this.id = Math.random().toString().slice(2);
    }

    getCommands(): SubExpressionCommand[] {
        return this.commands;
    }

    clone(): SymbolDrawingCommands {
        // Force a deep clone
        const tmpCommands: SubExpressionCommand[] = this.commands.map(item => {
            if (item[0] === PlaceHolderCommands.label) {
                const commandName = item[0];
                const positionParams = item[1];
                const keywordParams = item[2];

                const newMap = new Map<string, any>();
                for (const [key, value] of keywordParams) {
                    newMap.set(key, value);
                }

                return [commandName, positionParams, newMap];
            } else {
                return [...item];
            }
        });
        return new SymbolDrawingCommands(tmpCommands);
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

