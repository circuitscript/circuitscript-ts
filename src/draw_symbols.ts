/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { G } from "@svgdotjs/svg.js";

import { milsToMM } from "./helpers.js";
import { ColorScheme, CustomSymbolParamTextSize, CustomSymbolPinIdSize, CustomSymbolPinTextSize, 
    CustomSymbolRefDesSize, PortArrowSize, PortPaddingHorizontal, 
    PortPaddingVertical, ReferenceTypes, SymbolPinSide, 
    defaultFont, defaultPinIdTextSize, defaultPinNameTextSize, defaultSymbolLineWidth,
    fontDisplayScale} from "./globals.js";
import { Feature, Geometry, GeometryProp, HorizontalAlign, LabelStyle, 
    Textbox, VerticalAlign } from "./geometry.js";
import { Logger } from "./logger.js";
import { PinTypes } from "./objects/PinTypes.js";
import { roundValue, throwWithContext } from "./utils.js";
import { DeclaredReference, UndeclaredReference } from "./objects/types.js";
import { ParserRuleContext } from "antlr4ng";


/**
 * Symbols should also define where their ports
 */

export abstract class SymbolGraphic {

    drawPortsName = true;

    displayBounds = false;

    drawing: SymbolDrawing;

    _angle = 0;

    _flipX = 0;
    _flipY = 0;

    width: number;
    height: number;
    
    // References the parameter map in the component that this
    // symbol represents.
    componentParams: Map<string, any>;

    // Stores a reference of <labelID> to the label value
    labelTexts = new Map<string, string>();

    get angle(): number {
        return (this._angle % 360);
    }

    set angle(value: number) {
        this._angle = value;
    }

    get flipX(): number {
        return this._flipX;
    }

    set flipX(value: number) {
        this._flipX = value;
    }

    get flipY(): number {
        return this._flipY;
    }

    set flipY(value: number) {
        this._flipY = value;
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

    draw(group: G, extra?: unknown): void {
        // Assume that the symbol is vertical
        const innerGroup = group.group();

        this.drawBody(innerGroup);

        this.drawPins(innerGroup);

        this.drawLabels(innerGroup);

        this.drawPlaceRemove(innerGroup, extra);

        this.displayBounds && this.drawBounds(group);
    }

    drawPlaceRemove(group: G, extra?: { place?: boolean }): void {
        if (extra && extra.place === false) {
            // Do not place this component!
            // Draw the x
            const { start, end } = this.drawing.getBoundingBox(true);

            const path = Geometry.roundPathValues([
                "M", start[0], start[1], "L", end[0], end[1],
                "M", end[0], start[1], "L", start[0], end[1]
            ]);

            group.path(path)
                .stroke({
                    width: defaultSymbolLineWidth,
                    color: 'red'
                });
        }
    }

    // Returns the port position, relative to the symbol origin
    pinPosition(id: number): { x: number; y: number; angle: number; } {
        const pin = this.drawing.getPinPosition(id);

        // Allow pin position values to be rounded to 4 d.p
        const [x, y] = pin.start;
        const useX = roundValue(x);
        const useY = roundValue(y);

        return {
            x: useX,
            y: useY,
            angle: pin.angle,
        } 
    }

    protected drawBounds(group: G): void {
        const bbox = this.drawing.getBoundingBox();

        const originSize = milsToMM(10)
        group.circle(originSize)
            .translate(-originSize / 2, -originSize / 2)
            .fill('red')
            .stroke('none');

        group.rect(bbox.width, bbox.height)
            .translate(bbox.start[0], bbox.start[1])
            .fill('none')
            .stroke({
                width: milsToMM(2),
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
        const pinPaths = this.drawing.getPinsPath();
        pinPaths.forEach(({ path, lineColor }) => {
            group.path(path)
                .stroke({
                    width: defaultSymbolLineWidth,
                    color: lineColor
                })
        });
    }

    protected drawLabels(group: G): void {
        const labels = this.drawing.getLabels();

        labels.forEach(label => {
            const tmpLabel = label as Textbox;

            const {
                fontSize = 50,
                anchor = HorizontalAlign.Left, 
                vanchor = VerticalAlign.Bottom,
                fontWeight = 'regular',
                angle: labelAngle = 0,

                textColor = "#333",
            } = tmpLabel.style ?? {};

            let anchorStyle = 'start';
            let dominantBaseline = 'auto';

            let useAnchor = anchor;
            let useDominantBaseline = vanchor;
            const isRotation180 = Math.abs(this.angle) === 180;

            if (isRotation180) {
                // Special case to flip the text instead of rotating
                useAnchor = this.flipTextAnchor(anchor);
                useDominantBaseline = this.flipDominantBaseline(vanchor);
            }

            switch (useAnchor) {
                case HorizontalAlign.Left:
                    anchorStyle = (this.flipX === 0) ? 'start' : 'end';
                    break;

                case HorizontalAlign.Middle:
                    anchorStyle = 'middle';
                    break;

                case HorizontalAlign.Right:
                    anchorStyle = (this.flipX === 0) ? 'end' : 'start';
                    break;
            }

            switch (useDominantBaseline) {
                case VerticalAlign.Top:
                    dominantBaseline = (this.flipY === 0) ? 'hanging' : 'text-top';
                    break;

                case VerticalAlign.Middle:
                    dominantBaseline = 'middle';
                    break;

                case VerticalAlign.Bottom:
                    dominantBaseline = (this.flipY === 0) ? 'text-top' : 'hanging';
                    break;
            }

            const position = tmpLabel.getLabelPosition();
            // const position2 = [position[0], position[1]];

            if (this.flipX !== 0) {
                position[0] *= -1;
            }

            if (this.flipY !== 0){
                position[1] *= -1;
            }

            const useFont = defaultFont;

            const textContainer = group.group();

            let translateX: number, translateY: number;
            let useRotateAngle = 0;

            if (isRotation180){
                translateX = -position[0];
                translateY = -position[1];
                useRotateAngle = 0;
            } else {
                translateX = position[0];
                translateY = position[1];
                useRotateAngle = this.angle;
            }

            translateX = roundValue(translateX);
            translateY = roundValue(translateY);

            // The port type will add some padding to the component
            const {portType = null} = tmpLabel.style;

            if (portType !== null) {
                const { x: boundsX, y: boundsY }
                    = tmpLabel.textMeasurementBounds;

                const paddingHorizontal = PortPaddingHorizontal;
                const paddingVert = PortPaddingVertical;

                const boundsWidth = tmpLabel.textMeasurementBounds.width 
                                        + paddingHorizontal * 2;
                const boundsHeight = tmpLabel.textMeasurementBounds.height 
                                        + paddingVert * 2;

                let path: (string | number)[] = [];
                let boundsTranslateX = -paddingHorizontal;

                switch (portType) {
                    case PinTypes.Input:
                        path = ['M', 0, 0,
                            'L', boundsWidth, 0,
                            'L', boundsWidth, boundsHeight,
                            'L', 0, boundsHeight,
                            'L', -PortArrowSize, boundsHeight / 2,
                            'Z',
                        ];
                        break;

                    case PinTypes.Output:
                        path = ['M', 0, 0,
                            'L', boundsWidth, 0,
                            'L', boundsWidth + PortArrowSize, 
                                boundsHeight/2,
                            'L', boundsWidth, boundsHeight,
                            'L', 0, boundsHeight,
                            'Z',
                        ];
                        break;

                    case PinTypes.IO:
                        path = ['M', 0, 0,
                            'L', boundsWidth, 0,
                            'L', boundsWidth + PortArrowSize, 
                                boundsHeight/2,
                            'L', boundsWidth, boundsHeight,
                            'L', 0, boundsHeight,
                            'L', -PortArrowSize, boundsHeight / 2,
                            'Z',
                        ];
                        break;

                    case PinTypes.Any:
                    case PinTypes.Power:
                        path = ['M', 0, 0,
                            'L', boundsWidth, 0,
                            'L', boundsWidth, boundsHeight,
                            'L', 0, boundsHeight,
                            'Z',
                        ];
                        break;
                }

                if (path.length > 0) {
                    let flip = 1;
                    if (this.flipX !== 0) {
                        flip = -1;
                        boundsTranslateX = paddingHorizontal;
                    }

                    textContainer.path(path)
                        .stroke({
                            width: milsToMM(5),
                            color: '#333'
                        })
                        .fill('none')
                        .scale(flip, 1, 0, 0)
                        .translate(boundsTranslateX, boundsY - paddingVert)
                        ;
                }
            }

            const drawTextBounds = false;
            const drawBoxBounds = false;
            const drawOrigin = false;

            if (drawBoxBounds) {
                const box = tmpLabel.box;
                textContainer.rect(
                    box.width,
                    box.height
                ).fill('red')
                    .translate(box.xmin, box.ymin)
                    .scale(
                        this.flipX !== 0 ? -1 : 1,
                        1,
                        -box.xmin,
                        box.ymin
                    )
            }

            // Display text bounds
            if (drawTextBounds) {
                const textBounds = tmpLabel.textMeasurementBounds;
                // display text bounds

                const xOffset = (this.flipX !== 0) ? textBounds.width : 0;

                textContainer.rect(
                    textBounds.width, textBounds.height
                ).fill('#cccccc')
                    .translate(textBounds.x - xOffset, textBounds.y);
            }

            textContainer.translate(translateX, translateY)
                .rotate(useRotateAngle, -translateX, -translateY);

            textContainer.text(tmpLabel.text)
                .fill(textColor)
                .font({
                    family: useFont,
                    size: fontSize * fontDisplayScale,
                    anchor: anchorStyle,
                    'dominant-baseline': dominantBaseline,
                    weight: fontWeight,
                })
                .rotate(labelAngle);

            const { a, b, c, d, e, f } = textContainer.matrix();
            const newMatrix = {
                a: roundValue(a),
                b: roundValue(b),
                c: roundValue(c),
                d: roundValue(d),
                e: roundValue(e),
                f: roundValue(f),
            };

            textContainer.transform(newMatrix);
            
            // For debug, show the origin of the text container
            if (drawOrigin){
                const originSize = milsToMM(10);
                textContainer.circle(originSize)
                    .translate(originSize/2, originSize/2)
                    .fill('green');
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

    flipDominantBaseline(value: VerticalAlign): VerticalAlign {
        if (value === VerticalAlign.Top) {
            return VerticalAlign.Bottom;
        } else if (value === VerticalAlign.Bottom) {
            return VerticalAlign.Top;
        } else {
            return VerticalAlign.Middle;
        }
    }
}

export function SymbolFactory(name: string): SymbolGraphic {
    switch (name) {
        case 'point':
            return new SymbolPointHidden();
    }

    return null;
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
    fontSize = 40;
    fontWeight = 'regular';

    constructor(text: string){
        super();
        this.text = text;
    }

    generateDrawing(): void {
        const drawing = new SymbolDrawing();
        drawing.addTextbox(0, 0, this.text, {
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

        // Store the transform properties to the drawing itself too.
        drawing.angle = this._angle;
        drawing.flipX = this._flipX;
        drawing.flipY = this._flipY;
        
        // Add default commands at the start to provide consistent style
        const commands = [
            [PlaceHolderCommands.units, ['mils'], {}],
            [PlaceHolderCommands.lineColor, [ColorScheme.PinLineColor], {}],
            [PlaceHolderCommands.textColor, [ColorScheme.PinNameColor], {}],
            [PlaceHolderCommands.lineWidth, [5], {}],
            ...drawing.getCommands()
            ];

        drawing.log('id: ', drawing.id, 'angle: ', this._angle, "commands:", commands.length);

        let lineColor = "#333";
        let textColor = "#333";

        // Setup the variable references
        drawing.prepareVariables(this.componentParams ?? new Map());

        // Go through position params and resolve it

        commands.forEach(([commandName, positionParams, keywordParams, ctx]) => {

            // evaluate any declared references in the position and keywork params
            positionParams = (positionParams as any[]).map(param => {
                return this.resolveReference(drawing, param);
            });

            if (keywordParams instanceof Map) {
                const tmpKeywordParams = new Map(keywordParams);
                tmpKeywordParams.forEach((value, key) => {
                    tmpKeywordParams.set(key,
                        this.resolveReference(drawing, value));
                });

                keywordParams = tmpKeywordParams;
            }

            switch (commandName) {
                case PlaceHolderCommands.rect:
                    drawing.log('add rect', ...positionParams);
                    // @ts-ignore
                    drawing.addRect(...positionParams);
                    break;

                case PlaceHolderCommands.hline:
                    drawing.log('add hline', ...positionParams);
                    // @ts-ignore
                    drawing.addHLine(...positionParams);
                    break;

                case PlaceHolderCommands.vline:
                    drawing.log('add vline', ...positionParams);
                    // @ts-ignore
                    drawing.addVLine(...positionParams);
                    break;

                case PlaceHolderCommands.line:
                    drawing.log('add line', ...positionParams);
                    // @ts-ignore
                    drawing.addLine(...positionParams);
                    break;

                case PlaceHolderCommands.path:
                    // @ts-ignore
                    drawing.addPath(...positionParams);
                    break;

                case PlaceHolderCommands.lineWidth:
                    // @ts-ignore
                    drawing.addSetLineWidth(...positionParams);
                    break;

                case PlaceHolderCommands.fill:
                    // @ts-ignore
                    drawing.addSetFillColor(...positionParams);
                    break;

                case PlaceHolderCommands.lineColor:
                    // @ts-ignore
                    drawing.addSetLineColor(...positionParams);
                    lineColor = positionParams[0];
                    break;

                case PlaceHolderCommands.textColor:
                    // @ts-ignore
                    drawing.addSetTextColor(...positionParams);
                    textColor = positionParams[0];
                    break;

                case PlaceHolderCommands.arc:
                    // @ts-ignore
                    drawing.addArc(...positionParams);
                    break;

                case PlaceHolderCommands.circle:
                    // circle params: center x, center y, radius
                    // @ts-ignore
                    drawing.addArc(...positionParams, 0, 360);
                    break;

                case PlaceHolderCommands.triangle:
                    // @ts-ignore
                    drawing.addTriangle(...positionParams);
                    break;

                case PlaceHolderCommands.pin: 
                case PlaceHolderCommands.hpin:
                case PlaceHolderCommands.vpin:
                {
                    this.drawPinParams(drawing, commandName, 
                        keywordParams, positionParams, lineColor, textColor);
                    break;
                }

                case PlaceHolderCommands.label: {
                    const style = this.parseLabelStyle(keywordParams);

                    if (style['textColor'] === undefined) {
                        style['textColor'] = textColor;
                    }

                    const tmpPositionParams = [
                        positionParams[1], positionParams[2],
                        positionParams[0], style
                    ];

                    drawing.log('add label', JSON.stringify(tmpPositionParams));

                    //@ts-ignore
                    try {
                        drawing.addLabelMils(...tmpPositionParams);
                    } catch (err) {
                        throwWithContext(ctx, err);
                    }
                    break;
                }

                case PlaceHolderCommands.text: {
                    const style = this.parseLabelStyle(keywordParams);
                    
                    // TODO: also support positional parameters
                    const content = keywordParams.get('content');
                    
                    let offsetX = 0;
                    let offsetY = 0;

                    if (keywordParams.has('offset')){
                        const offset = keywordParams.get('offset');
                        offsetX = offset[0];
                        offsetY = offset[1];
                    }

                    drawing.addTextbox(offsetX, offsetY, content, style);
                    break;
                }

                case PlaceHolderCommands.units: {
                    drawing.addSetUnits(...positionParams);
                    break;
                }
            }
        });

        drawing.log("=== end generate drawing ===");
    }

    private resolveReference(drawing: SymbolDrawingCommands, param: any): any {
        if (param instanceof UndeclaredReference
            || param instanceof DeclaredReference) {

            const { name, trailers = [] } =
                (param instanceof UndeclaredReference) ? param.reference : param;

            const updatedRef = drawing.resolveVariables(name!, trailers);
            if (updatedRef instanceof DeclaredReference) {
                return updatedRef.value;
            }
            return undefined;
        }

        return param;
    }

    parseLabelStyle(keywordParams: Map<string, any>): { [key: string]: any } {
        const keywords = ['fontSize', 'anchor', 'vanchor', 
            'angle', 'textColor', 'portType', 'bold'];

        // Create the style object
        const style: { [key: string]: any } = {};
        keywords.forEach(item => {
            if (keywordParams.has(item)) {
                style[item] = keywordParams.get(item);
                
                if (item === 'bold'){
                    if (keywordParams.get(item) === true){
                        style['fontWeight'] = 'bold';
                    } else {
                        style['fontWeight'] = 'normal';
                    }
                }

            }
        });

        return style;
    }

    drawPinParams(drawing: SymbolDrawingCommands,
        commandName: string, keywordParams: Map<string, any>,
        positionParams: any[], lineColor: string, pinNameColor: string): void {

        drawing.log('add pin', ...positionParams);

        positionParams = [...positionParams]; // Shallow copy

        const keywordDisplayPinId = 'display_pin_id';
        let displayPinId = true;

        if (keywordParams.has(keywordDisplayPinId)) {
            const value = keywordParams.get(keywordDisplayPinId);
            if (value === 0 || value === false) {
                displayPinId = false;
            }
        }

        let pinNameParam: string | null = null;
        let pinType = PinTypes.Any;

        // Store for now, not used for anything yet.
        if (positionParams[1].type && positionParams[1].type === ReferenceTypes.pinType){
            pinType = positionParams[1].value;
            positionParams = [positionParams[0], ...positionParams.slice(2)];
        }

        if (typeof positionParams[1] === 'string') {
            // If the type of the second position is a string, then
            // use the string value as the pin name
            pinNameParam = positionParams[1];
            positionParams = [positionParams[0], ...positionParams.slice(2)];
        }

        // create the next point
        const startX = milsToMM(positionParams[1]);
        const startY = milsToMM(positionParams[2]);
        
        if (commandName === PlaceHolderCommands.vpin) {
            const magnitude = milsToMM(positionParams[3]);
            positionParams = [
                positionParams[0],
                startX,
                startY,
                startX,
                startY + magnitude
            ];
        } else if (commandName === PlaceHolderCommands.hpin) {
            const magnitude = milsToMM(positionParams[3]);
            positionParams = [
                positionParams[0],
                startX,
                startY,
                startX + magnitude,
                startY
            ];
        } else {
            // Convert to mils
            const [, , , endX, endY] = positionParams;
            positionParams = [
                positionParams[0],
                startX,
                startY,
                milsToMM(endX),
                milsToMM(endY)
            ]
        }

        // @ts-ignore
        drawing.addPinMM(...positionParams, lineColor);

        // Add a label for the pinId and pinName
        const lastAddedPin = this.drawing.pins[this.drawing.pins.length - 1];
        const [pinId, , angle] = lastAddedPin;
        const [, , , endX, endY] = positionParams;

        let pinNameAlignment = HorizontalAlign.Left;
        const offset1 = 15;
        const offset2 = 15;

        let pinNameOffsetX = milsToMM(offset1);

        let pinIdOffsetX = 0;
        let pinIdAlignment = HorizontalAlign.Left;

        let pinIdVAlignment = VerticalAlign.Bottom;
        let pinIdOffsetY = milsToMM(-offset2);

        switch (angle) {
            case 0:
                pinNameAlignment = HorizontalAlign.Left;
                pinNameOffsetX = milsToMM(offset1);
                pinIdAlignment = HorizontalAlign.Right;
                pinIdOffsetX = milsToMM(-offset2);
                break;
            case 90:
            case 180:
                pinNameAlignment = HorizontalAlign.Right;
                pinNameOffsetX = milsToMM(-offset1);
                pinIdAlignment = HorizontalAlign.Left;
                pinIdOffsetX = milsToMM(offset2);
                break;
            case 270:
                pinNameAlignment = HorizontalAlign.Left;
                pinNameOffsetX = milsToMM(offset1);
                pinIdAlignment = HorizontalAlign.Left;
                pinIdOffsetX = milsToMM(offset2);
                pinIdOffsetY = milsToMM(offset2);
                pinIdVAlignment = VerticalAlign.Top;
                break;
        }

        if (angle === 0 || angle === 90 || angle === 180 || angle === 270) {
            const usePinName = pinNameParam ?? "";

            // Draw the pinName
            usePinName !== "" && drawing.addLabel(
                endX + pinNameOffsetX, endY, usePinName, {
                fontSize: defaultPinNameTextSize,
                anchor: pinNameAlignment,
                vanchor: VerticalAlign.Middle,
                textColor: pinNameColor,
            });

            // Draw pin Id
            displayPinId && drawing.addLabel(
                endX + pinIdOffsetX, endY + pinIdOffsetY, pinId.toString(), {
                fontSize: defaultPinIdTextSize,
                anchor: pinIdAlignment,
                vanchor: pinIdVAlignment,
                textColor: lineColor
            });
        }
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
    hpin = 'hpin',
    vpin = 'vpin',
    hline = 'hline',
    vline = 'vline',
    line = 'line',
    label = 'label',
    path = 'path',
    lineWidth = 'lineWidth',
    fill = 'fill',
    lineColor = 'lineColor',
    textColor = 'textColor',
    text = 'text',

    units = 'units',

    for = 'for',
}

export class SymbolCustom extends SymbolGraphic {
    // For generating symbols for multi-pin components.

    pinDefinition: SymbolPinDefintion[] = [];

    bodyWidth = milsToMM(400);

    pinLength = milsToMM(100);

    width = milsToMM(100);
    height = milsToMM(100);

    pinSpacing = milsToMM(100);

    pinTextPadding = milsToMM(5);

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
        drawing.flipX = this._flipX;
        drawing.flipY = this._flipY;

        const bodyWidth = this.bodyWidth;
        
        const bodyHeight = (1 + Math.max(maxLeftPins, maxRightPins)) * this.pinSpacing;

        const defaultLineColor = ColorScheme.PinLineColor;
        drawing.addSetLineColor(defaultLineColor);
        // drawing.addSetFillColor(ColorScheme.BodyColor);

        drawing.addSetLineWidth(5);
        drawing.addRectMM(0, 0, bodyWidth, bodyHeight);

        this.generateDrawingPins(drawing, bodyWidth, bodyHeight,
            leftPins, rightPins, defaultLineColor);

        this.drawing = drawing;
        this._cacheLeftPins = leftPins;
        this._cacheRightPins = rightPins;
    }

    generateDrawingPins(drawing: SymbolDrawing,
        bodyWidthMM: number, bodyHeightMM: number,
        leftPins: SymbolPinDefintion[],
        rightPins: SymbolPinDefintion[], defaultLineColor: string): void {

        // Setup the pins
        const leftPinStart = -bodyWidthMM / 2;
        const rightPinStart = bodyWidthMM / 2;
        const pinStartY = -bodyHeightMM / 2;

        leftPins.forEach(pin => {
            const position = pin.position;
            const pinY = pinStartY + (position + 1) * this.pinSpacing // Includes the offset too
            drawing.addPinMM(pin.pinId, leftPinStart - this.pinLength, pinY, 
                leftPinStart, pinY, defaultLineColor);

            drawing.addLabel(leftPinStart + milsToMM(20), 
                pinY, pin.text, {
                
                fontSize: CustomSymbolPinTextSize,
                anchor: HorizontalAlign.Left,
                vanchor: VerticalAlign.Middle,
                textColor: ColorScheme.PinNameColor,
            });

            // Add the pin number
            drawing.addLabel(leftPinStart - milsToMM(10) , pinY - milsToMM(10), pin.pinId.toString(), {
                fontSize: CustomSymbolPinIdSize,
                anchor: HorizontalAlign.Right,
                vanchor: VerticalAlign.Bottom,
                textColor: defaultLineColor
            });
        });

        rightPins.forEach(pin => {
            const position = pin.position;
            const pinY = pinStartY + (position + 1) * this.pinSpacing // Includes the offset too
            drawing.addPinMM(pin.pinId, rightPinStart + this.pinLength, pinY, 
                rightPinStart, pinY, defaultLineColor);

            drawing.addLabel(rightPinStart - milsToMM(20), pinY, pin.text, {
                fontSize: CustomSymbolPinTextSize,
                anchor: HorizontalAlign.Right,
                vanchor: VerticalAlign.Middle,
                textColor: ColorScheme.PinNameColor,
            });

            // Add the pin number
            drawing.addLabel(rightPinStart + milsToMM(10) , pinY - milsToMM(10), pin.pinId.toString(), {
                fontSize: CustomSymbolPinIdSize,
                anchor: HorizontalAlign.Left,
                vanchor: VerticalAlign.Bottom,
                textColor: defaultLineColor
            });
        });

        const instanceName = this.componentParams.get('refdes');
        instanceName && drawing.addLabel(-bodyWidthMM/2, -bodyHeightMM/2 - milsToMM(20), instanceName, {
            fontSize: CustomSymbolRefDesSize,
            anchor: HorizontalAlign.Left,
        });

        const acceptedMPNKeys = ['MPN', 'mpn', 'manufacturer_pn'];

        acceptedMPNKeys.some(key => {
            const labelValue = this.componentParams.get(key);
            if (labelValue !== undefined){
                drawing.addLabel(-bodyWidthMM/2, bodyHeightMM/2 + milsToMM(20), labelValue, {
                    fontSize: CustomSymbolParamTextSize,
                    anchor: HorizontalAlign.Left,
                    vanchor: VerticalAlign.Top,
                });
            }
        });
    }

    calculateSize(): void {
        // This width also includes the pin length
        this.width = this.bodyWidth + 2 * this.pinLength;
        this.height = (1 + Math.max(this._cacheLeftPins.length, 
            this._cacheRightPins.length)) * this.pinSpacing;
    }

}

export class SymbolCustomModule extends SymbolCustom {

    pinLength = 0;

    portWidth = milsToMM(100);
    portHeight = milsToMM(50);

    generateDrawingPins(drawing: SymbolDrawing,
        bodyWidthMM: number, bodyHeightMM: number,
        leftPins: SymbolPinDefintion[],
        rightPins: SymbolPinDefintion[], defaultLineColor: string): void {

        // Values should already be in mm

        // Setup the pins
        const leftPinStart = -bodyWidthMM / 2;
        const rightPinStart = bodyWidthMM / 2;
        const pinStartY = -bodyHeightMM / 2;

        leftPins.forEach(pin => {
            const position = pin.position;
            const pinY = pinStartY + (position + 1) * this.pinSpacing // Includes the offset too
            drawing.addPinMM(pin.pinId, leftPinStart - this.pinLength, pinY,
                leftPinStart, pinY, defaultLineColor);

            drawing.addModulePort(leftPinStart, pinY, this.portWidth, this.portHeight, pin.pinType);

            drawing.addLabel(leftPinStart + this.portWidth + milsToMM(20), pinY, pin.text, {
                fontSize: 40,
                anchor: HorizontalAlign.Left,
                vanchor: VerticalAlign.Middle,
                textColor: ColorScheme.PinNameColor,
            });
        });

        rightPins.forEach(pin => {
            const position = pin.position;
            const pinY = pinStartY + (position + 1) * this.pinSpacing // Includes the offset too
            drawing.addPinMM(pin.pinId, rightPinStart + this.pinLength, pinY,
                rightPinStart, pinY, defaultLineColor);

            drawing.addModulePort(rightPinStart, pinY, this.portWidth, this.portHeight, pin.pinType, -1);

            drawing.addLabel(rightPinStart - this.portWidth - milsToMM(20), pinY, pin.text, {
                fontSize: 40,
                anchor: HorizontalAlign.Right,
                vanchor: VerticalAlign.Middle,
                textColor: ColorScheme.PinNameColor,
            });
        });
    }

}


export class SymbolDrawing {

    items: (Feature | GeometryProp)[] = [];

    // pinId, feature, angle
    pins: [number, Feature, number, lineColor: string][] = [];

    angle = 0;

    flipX = 0;
    flipY = 0;

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
        startX = milsToMM(startX);
        startY = milsToMM(startY);
        endX = milsToMM(endX);
        endY = milsToMM(endY);
        
        this.items.push(
            Geometry.segment([startX, startY], [endX, endY])
        );

        return this;
    }

    addPin(pinId: number, startX: number, startY: number,
        endX: number, endY: number, lineColor: string): SymbolDrawing {
        startX = milsToMM(startX);
        startY = milsToMM(startY);
        endX = milsToMM(endX);
        endY = milsToMM(endY);

        return this.addPinMM(pinId, startX, startY, endX, endY, lineColor);
    }

    addPinMM(pinId: number, startXMM: number, startYMM: number, 
        endXMM: number, endYMM: number, lineColor: string): SymbolDrawing {
        // Values should be in mm

        // Determine the pin angle based on vector with start point 
        // going to end point. The angle is relative to the x-axis. 
        //             270 
        //     180 -- start --> 0
        //             90

        let angle = 0;
        if (startXMM === endXMM) {
            if (startYMM > endYMM) {
                angle = 270;
            } else if (startYMM < endYMM) {
                angle = 90;
            }
        } else {
            if (startXMM < endXMM) {
                angle = 0;
            } else if (startXMM > endXMM) {
                angle = 180;
            }
        }

        this.pins.push([
            pinId,
            Geometry.segment([startXMM, startYMM], [endXMM, endYMM]),
            angle,
            lineColor
        ]);

        return this;
    }

    addVLine(startX: number, startY: number, value: number): SymbolDrawing {
        startX = milsToMM(startX);
        startY = milsToMM(startY);
        value = milsToMM(value);

        this.items.push(
            Geometry.segment([startX, startY], [startX, startY + value])
        );
        return this;
    }

    addHLine(startX: number, startY: number, value: number): SymbolDrawing {
        startX = milsToMM(startX);
        startY = milsToMM(startY);
        value = milsToMM(value);

        this.items.push(
            Geometry.segment([startX, startY], [startX + value, startY])
        );
        return this;
    }

    addRect(centerX: number, centerY: number, width: number, height: number): SymbolDrawing {
        centerX = milsToMM(centerX);
        centerY = milsToMM(centerY);
        width = milsToMM(width);
        height = milsToMM(height);

        return this.addRectMM(centerX, centerY, width, height);
    }

    addRectMM(centerX: number, centerY: number, width: number, height: number): SymbolDrawing {
        const width2 = width / 2;
        const height2 = height / 2;

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
        startX = milsToMM(startX);
        startY = milsToMM(startY);
        endX = milsToMM(endX);
        endY = milsToMM(endY);

        width = milsToMM(width);

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

    addLabelMils( x: number, y: number, textValue: string, style: LabelStyle): SymbolDrawing {
        x = milsToMM(x);
        y = milsToMM(y);

        this.items.push(
            Geometry.label(null, x, y, textValue, style)
        )

        return this;
    }

    addTextbox(x: number, y: number, textValue: string, style: LabelStyle): SymbolDrawing {
        x = milsToMM(x);
        y = milsToMM(y);

        this.items.push(
            Geometry.textbox(null, x, y, textValue, style)
        );

        return this;
    }

    addModulePort(x: number, y: number, width: number, height: number,
        portType = PinTypes.Any, scaleX=1): SymbolDrawing {

        // y will be the vertical center of the port
        const height2 = height / 2;

        let path: [x: number, y: number][] = [];
        const arrowSize = milsToMM(30);

        if (portType === PinTypes.Any) {
            path = [
                [0, - height2],
                [width, - height2],
                [width, + height2],
                [0, + height2],
                [0, - height2]
            ];
        } else if (portType === PinTypes.Output) {
            path = [
                [arrowSize, -height2],
                [width, -height2],
                [width, height2],
                [arrowSize, height2],
                [0, 0],
                [arrowSize, - height2]
            ];
        } else if (portType === PinTypes.Input) {
            path = [
                [0, - height2],
                [width - arrowSize, -height2],
                [width, 0],
                [width - arrowSize, height2],
                [0, + height2],
                [0, - height2],
            ];
        } else if (portType === PinTypes.IO) {
            path = [
                [arrowSize, - height2],
                [width - arrowSize, - height2],
                [width, 0],
                [width - arrowSize, + height2],
                [arrowSize, + height2],
                [0, 0],
                [0 + arrowSize, - height2],
            ];
        }

        path = path.map(point => {
            return [x + point[0] *scaleX, y + point[1]];
        });

        this.items.push(Geometry.polygon(path));
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

                const x = milsToMM(Number(parts[i + 1]));
                const y = milsToMM(Number(parts[i + 2]));

                currentObj = [[x, y]];

                i += 2;

            } else if (command === 'L') {
                const x = milsToMM(Number(parts[i + 1]));
                const y = milsToMM(Number(parts[i + 2]));
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
        value = milsToMM(value);
        this.items.push(new GeometryProp('lineWidth', value));
        return this;
    }

    addSetLineColor(value: string): SymbolDrawing {
        this.items.push(new GeometryProp('lineColor', value));
        return this;
    }

    addSetTextColor(value: string): SymbolDrawing {
        this.items.push(new GeometryProp('textColor', value));
        return this;
    }

    addSetFillColor(value: string): SymbolDrawing {
        this.items.push(new GeometryProp('fillColor', value));
        return this;
    }

    addArc(x: number, y: number, radius: number, 
        startAngle: number, endAngle: number): SymbolDrawing {

        x = milsToMM(x);
        y = milsToMM(y);
        radius = milsToMM(radius);

        // Angles in degrees, convert to radians
        startAngle = startAngle * Math.PI / 180;
        endAngle = endAngle * Math.PI / 180;
        
        this.items.push(
            Geometry.arc([x, y], radius, startAngle, endAngle, true));

        return this;
    }

    addSetUnits(value: string): SymbolDrawing {
        this.items.push(new GeometryProp('units', value));
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
            if (!(item instanceof Textbox)){
                if (item instanceof GeometryProp){
                    if (item.name === 'lineWidth'){
                        currentLineWidth = item.value as number;
                    } else if (item.name === 'lineColor'){
                        currentLineColor = item.value as string;
                    } else if (item.name === 'fillColor'){
                        currentFill = item.value as string;
                    }
                } else {
                    let tmpResult = Geometry.groupFlip([item], this.flipX, this.flipY);
                    tmpResult = Geometry.groupRotate(tmpResult, this.angle,
                        this.mainOrigin);

                    const { path, isClosedPolygon } =
                        this.featuresToPath(tmpResult, this.flipX, this.flipY);

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

    getPinsPath(): { path: string, lineColor: string }[] {
        return this.pins.map(item => {
            let features = Geometry.groupFlip([item[1]], this.flipX, this.flipY);
            features = Geometry.groupRotate(features, this.angle, this.mainOrigin);
            const { path } = this.featuresToPath(features, this.flipX, this.flipY);
            return {
                path,
                lineColor: item[3],
            }
        });
    }

    getLabels(): Textbox[] {
        return this.items.filter(item => item instanceof Textbox) as Textbox[];
    }

    private featuresToPath(items: Feature[], flipX: number, flipY: number): 
        {path: string, isClosedPolygon: boolean} {
        return Geometry.featuresToPath(items, flipX, flipY);
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
            if (!excludeLabels || (excludeLabels && !(item instanceof Textbox && item.label))) {
                if (!(item instanceof GeometryProp)) {
                    accum.push(item);
                }
            }

            return accum;

        }, [] as Feature[]);

        let features = [...drawingFeatures, ...pinFeatures];
        features = Geometry.groupFlip(features, this.flipX, this.flipY);
        features = Geometry.groupRotate(features, this.angle, this.mainOrigin);

        return Geometry.groupBounds(features);
    }

    getPinPosition(pinId: number): { start: [number, number], end: [number, number], angle: number } {
        const pin = this.pins.find(item => {
            return item[0] === pinId;
        });

        if (pin) {
            const [, feature, angle] = pin;

            // Apply flip, angle to feature
            let tmpFeature = Geometry.flip(feature, this.flipX, this.flipY);
            tmpFeature = Geometry.rotateDegs(tmpFeature, this.angle, this.mainOrigin);
            const coords = Geometry.getCoords(tmpFeature);

            return {
                start: coords[0],
                end: coords[1],
                angle,
            }
        }

        return null;
    }
}

export type GraphicExprCommand = [commandName: string,
    positionParams: any[],
    keywordParams: Map<string, any>,
    ctx: ParserRuleContext
];

export class SymbolDrawingCommands extends SymbolDrawing {

    id = "";
    private commands: GraphicExprCommand[];

    paramIds: string[] = [];    // For component reference when executing
                                // graphic commands
    

    // TODO: move these somewhere else to keep this class clean!!
    resolveVariables: (name: string, trailers?: string[]) => DeclaredReference;

    // TODO: move this method elsewhere.
    // Called before resolveVariables is used. This sets up the context for
    // resolving variables properly.
    prepareVariables: (params: Map<string, any>) => void;

    constructor(commands: GraphicExprCommand[]){
        super();
        this.commands = commands;
        this.id = Math.random().toString().slice(2);
    }

    getCommands(): GraphicExprCommand[] {
        return this.commands;
    }

    clone(): SymbolDrawingCommands {
        // Force a deep clone
        const tmpCommands: GraphicExprCommand[] = this.commands.map(item => {
            if (item[0] === PlaceHolderCommands.label) {
                const [commandName, positionParams, keywordParams, ctx] = item;
                return [commandName, positionParams, new Map(keywordParams), ctx];
            } else {
                return [...item];
            }
        });
        
        const cloned = new SymbolDrawingCommands(tmpCommands);
        cloned.prepareVariables = this.prepareVariables;
        cloned.resolveVariables = this.resolveVariables;
        
        return cloned;
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
    pinType: PinTypes,
}

