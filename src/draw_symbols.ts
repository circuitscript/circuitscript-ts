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
import { numeric, NumericValue } from "./objects/ParamDefinition.js";


/**
 * Base class for a graphical object on the schematic. Defines the position
 * and stores a reference to the drawing object that provides the actual
 * drawing instructions for the symbol.
 */
export abstract class SymbolGraphic {

    drawPortsName = true;

    displayBounds = false;

    /** Instructions on how to draw the symbol */
    drawing: SymbolDrawing;

    _angle = 0;

    _flipX = 0;
    _flipY = 0;

    width: NumericValue = numeric(-1);
    height: NumericValue = numeric(-1);
    
    // Stores a reference of <labelID> to the label value
    labelTexts = new Map<string, string>();

    constructor(){
        this.drawing = new SymbolDrawing();
    }

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
        this.width = numeric(width);
        this.height = numeric(height);
    }

    // Subclasses should implement this
    abstract generateDrawing(): void;

    size(): { width: number; height: number; } {
        return {
            width: this.width.toNumber(),
            height: this.height.toNumber(),
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
    pinPosition(id: number): { x: NumericValue; y: NumericValue; angle: NumericValue; } {
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
        group.circle(originSize.toNumber())
            .translate(
                originSize.neg().div(2).toNumber(), 
                originSize.neg().div(2).toNumber())
            .fill('red')
            .stroke('none');

        group.rect(bbox.width, bbox.height)
            .translate(bbox.start[0], bbox.start[1])
            .fill('none')
            .stroke({
                width: milsToMM(2).toNumber(),
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
                    width: lineWidth.toNumber(),
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
                fontSize = numeric(50),
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
                position[0] = position[0].neg();
            }

            if (this.flipY !== 0){
                position[1] = position[1].neg();
            }

            const useFont = defaultFont;

            const textContainer = group.group();

            let translateX: NumericValue, translateY: NumericValue;
            let useRotateAngle = 0;

            if (isRotation180){
                translateX = position[0].neg();
                translateY = position[1].neg();
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
                            width: milsToMM(5).toNumber(),
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

            textContainer.translate(
                    translateX.toNumber(), translateY.toNumber())
                .rotate(useRotateAngle, 
                    -translateX.toNumber(), -translateY.toNumber());

            textContainer.text(tmpLabel.text)
                .fill(textColor)
                .font({
                    family: useFont,
                    size: fontSize.toNumber() * fontDisplayScale,
                    anchor: anchorStyle,
                    'dominant-baseline': dominantBaseline,
                    weight: fontWeight,
                })
                .rotate(labelAngle);

            const { a, b, c, d, e, f } = textContainer.matrix();
            const newMatrix = {
                a: roundValue(numeric(a)).toNumber(),
                b: roundValue(numeric(b)).toNumber(),
                c: roundValue(numeric(c)).toNumber(),
                d: roundValue(numeric(d)).toNumber(),
                e: roundValue(numeric(e)).toNumber(),
                f: roundValue(numeric(f)).toNumber(),
            };

            textContainer.transform(newMatrix);
            
            // For debug, show the origin of the text container
            if (drawOrigin){
                const originSize = milsToMM(10);
                textContainer.circle(originSize.toNumber())
                    .translate(
                        originSize.div(2).toNumber(), 
                        originSize.div(2).toNumber())
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

export class SymbolText extends SymbolGraphic {

    text: string;
    fontSize = numeric(40);
    fontWeight = 'regular';

    constructor(text: string){
        super();
        this.text = text;
    }

    generateDrawing(): void {
        const drawing = this.drawing;
        drawing.clear();
        
        drawing.addTextbox(numeric(0), numeric(0), this.text, {
            fontSize: this.fontSize,
            anchor: HorizontalAlign.Middle,
            fontWeight: this.fontWeight,
        });

        this.drawing = drawing;
    }
}

/** Extends the base graphic object and stores drawing instructions
 *  that are provided through circuitscript code itself. Drawing instructions
 *  are stored as an array of commands.
 */
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
            [PlaceHolderCommands.lineWidth, [numeric(5)], {}],
            ...drawing.getCommands()
            ];

        drawing.log('id: ', drawing.id, 'angle: ', this._angle, "commands:", commands.length);

        let lineColor = "#333";
        let textColor = "#333";

        commands.forEach(([commandName, positionParams, keywordParams, ctx]) => {

            // evaluate any declared references in the position and keywork params
            positionParams = (positionParams as any[]).map(param => {
                return this.resolveReference(param);
            });

            if (keywordParams instanceof Map) {
                const tmpKeywordParams = new Map(keywordParams);
                tmpKeywordParams.forEach((value, key) => {
                    tmpKeywordParams.set(key,
                        this.resolveReference(value));
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
                    drawing.addArc(...positionParams, numeric(0), numeric(360));
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
                    
                    let offsetX = numeric(0);
                    let offsetY = numeric(0);

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

    private resolveReference(param: any): any {
        if (param instanceof DeclaredReference) {
            return param.value;
        } else if (param instanceof UndeclaredReference) {
            throw "Undefined symbol: " + param.nameString();
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
            if (value instanceof NumericValue && value.toNumber() === 0){
                displayPinId = false;
            }

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
                startY.add(magnitude)
            ];
        } else if (commandName === PlaceHolderCommands.hpin) {
            const magnitude = milsToMM(positionParams[3]);
            positionParams = [
                positionParams[0],
                startX,
                startY,
                startX.add(magnitude),
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

        let pinIdOffsetX = numeric(0);
        let pinIdAlignment = HorizontalAlign.Left;

        let pinIdVAlignment = VerticalAlign.Bottom;
        let pinIdOffsetY = milsToMM(-offset2);

        const angleValue = angle.toNumber();

        switch (angleValue) {
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

        if (angleValue === 0 || angleValue === 90 || angleValue === 180 || angleValue === 270) {
            const usePinName = pinNameParam ?? "";

            // Draw the pinName
            usePinName !== "" && drawing.addLabel(
                endX.add(pinNameOffsetX), endY, usePinName, {
                fontSize: numeric(defaultPinNameTextSize),
                anchor: pinNameAlignment,
                vanchor: VerticalAlign.Middle,
                textColor: pinNameColor,
            });

            // Draw pin Id
            displayPinId && drawing.addLabel(
                endX.add(pinIdOffsetX), endY.add(pinIdOffsetY), 
                pinId.toDisplayString(), {
                fontSize: numeric(defaultPinIdTextSize),
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

/** Symbol that is generated only from pin definitions and does not have a 
 *  custom graphic to draw. */
export class SymbolCustom extends SymbolGraphic {

    pinDefinition: SymbolPinDefintion[] = [];

    bodyWidth = milsToMM(400);

    pinLength = milsToMM(100);

    width = milsToMM(100);
    height = milsToMM(100);

    pinSpacing = milsToMM(100);

    pinTextPadding = milsToMM(5);

    pins: SymbolPinLayout[] = [];

    _cacheLeftPins: SymbolPinDefintion[] = [];
    _cacheRightPins: SymbolPinDefintion[] = [];

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

        this.drawing.clear();

        const drawing = this.drawing;
        drawing.angle = this._angle;
        drawing.flipX = this._flipX;
        drawing.flipY = this._flipY;

        const bodyWidth = this.bodyWidth;
        
        const bodyHeight = numeric(
            (1 + Math.max(maxLeftPins, maxRightPins)) * this.pinSpacing.toNumber()
        );

        const defaultLineColor = ColorScheme.PinLineColor;
        drawing.addSetLineColor(defaultLineColor);
        // drawing.addSetFillColor(ColorScheme.BodyColor);

        drawing.addSetLineWidth(numeric(5));
        drawing.addRectMM(numeric(0), numeric(0), bodyWidth, bodyHeight);

        this.generateDrawingPins(drawing, bodyWidth, bodyHeight,
            leftPins, rightPins, defaultLineColor);

        this.drawing = drawing;
        this._cacheLeftPins = leftPins;
        this._cacheRightPins = rightPins;
    }

    generateDrawingPins(drawing: SymbolDrawing,
        bodyWidthMM: NumericValue, bodyHeightMM: NumericValue,
        leftPins: SymbolPinDefintion[],
        rightPins: SymbolPinDefintion[], defaultLineColor: string): void {

        // Setup the pins
        const leftPinStart = bodyWidthMM.neg().div(2);
        const rightPinStart = bodyWidthMM.div(2);
        const pinStartY = bodyHeightMM.neg().div(2);

        leftPins.forEach(pin => {
            const position = pin.position;
            const pinY = pinStartY.add((position + 1) * this.pinSpacing.toNumber()) // Includes the offset too
            drawing.addPinMM(numeric(pin.pinId), leftPinStart.sub(this.pinLength), pinY, 
                leftPinStart, pinY, defaultLineColor);

            drawing.addLabel(leftPinStart.add(milsToMM(20)), 
                pinY, pin.text, {
                
                fontSize: numeric(CustomSymbolPinTextSize),
                anchor: HorizontalAlign.Left,
                vanchor: VerticalAlign.Middle,
                textColor: ColorScheme.PinNameColor,
            });

            // Add the pin number
            drawing.addLabel(leftPinStart.sub(milsToMM(10)) , pinY.sub(milsToMM(10)), pin.pinId.toString(), {
                fontSize: numeric(CustomSymbolPinIdSize),
                anchor: HorizontalAlign.Right,
                vanchor: VerticalAlign.Bottom,
                textColor: defaultLineColor
            });
        });

        rightPins.forEach(pin => {
            const position = pin.position;
            const pinY = pinStartY.add((position + 1) * this.pinSpacing.toNumber()) // Includes the offset too
            drawing.addPinMM(numeric(pin.pinId), rightPinStart.add(this.pinLength), pinY, 
                rightPinStart, pinY, defaultLineColor);

            drawing.addLabel(rightPinStart.sub(milsToMM(20)), pinY, pin.text, {
                fontSize: numeric(CustomSymbolPinTextSize),
                anchor: HorizontalAlign.Right,
                vanchor: VerticalAlign.Middle,
                textColor: ColorScheme.PinNameColor,
            });

            // Add the pin number
            drawing.addLabel(rightPinStart.add(milsToMM(10)) , pinY.sub(milsToMM(10)), pin.pinId.toString(), {
                fontSize: numeric(CustomSymbolPinIdSize),
                anchor: HorizontalAlign.Left,
                vanchor: VerticalAlign.Bottom,
                textColor: defaultLineColor
            });
        });

        const instanceName = drawing.variables.get('refdes');
        instanceName && drawing.addLabel(
            bodyWidthMM.neg().div(2), 
            bodyHeightMM.neg().div(2).sub(milsToMM(20)
        ), instanceName, {
            fontSize: numeric(CustomSymbolRefDesSize),
            anchor: HorizontalAlign.Left,
        });

        const acceptedMPNKeys = ['MPN', 'mpn', 'manufacturer_pn'];

        acceptedMPNKeys.some(key => {
            const labelValue = drawing.variables.get(key);
            if (labelValue !== undefined){
                drawing.addLabel(
                    bodyWidthMM.neg().div(2), 
                    bodyHeightMM.div(2).add(milsToMM(20)), 
                    labelValue, {
                    fontSize: numeric(CustomSymbolParamTextSize),
                    anchor: HorizontalAlign.Left,
                    vanchor: VerticalAlign.Top,
                });
            }
        });
    }

    calculateSize(): void {
        // This width also includes the pin length
        this.width = this.bodyWidth.add(2 * this.pinLength.toNumber());
        this.height = numeric((1 + Math.max(this._cacheLeftPins.length, 
            this._cacheRightPins.length)) * this.pinSpacing.toNumber());
    }

}

export class SymbolCustomModule extends SymbolCustom {

    pinLength = milsToMM(0);

    portWidth = milsToMM(100);
    portHeight = milsToMM(50);

    generateDrawingPins(drawing: SymbolDrawing,
        bodyWidthMM: NumericValue, bodyHeightMM: NumericValue,
        leftPins: SymbolPinDefintion[],
        rightPins: SymbolPinDefintion[], defaultLineColor: string): void {

        // Values should already be in mm

        // Setup the pins
        const leftPinStart = bodyWidthMM.neg().div(2);
        const rightPinStart = bodyWidthMM.div(2);
        const pinStartY = bodyHeightMM.neg().div(2);

        leftPins.forEach(pin => {
            const position = pin.position;
            const pinY = pinStartY.add((position + 1) * this.pinSpacing.toNumber()) // Includes the offset too
            drawing.addPinMM(numeric(pin.pinId), leftPinStart.sub(this.pinLength), pinY,
                leftPinStart, pinY, defaultLineColor);

            drawing.addModulePort(leftPinStart, pinY, this.portWidth, this.portHeight, pin.pinType);

            drawing.addLabel(leftPinStart.add(this.portWidth).add(milsToMM(20)), pinY, pin.text, {
                fontSize: numeric(40),
                anchor: HorizontalAlign.Left,
                vanchor: VerticalAlign.Middle,
                textColor: ColorScheme.PinNameColor,
            });
        });

        rightPins.forEach(pin => {
            const position = pin.position;
            const pinY = pinStartY.add((position + 1) * this.pinSpacing.toNumber()) // Includes the offset too
            drawing.addPinMM(numeric(pin.pinId), rightPinStart.add(this.pinLength), pinY,
                rightPinStart, pinY, defaultLineColor);

            drawing.addModulePort(rightPinStart, pinY, this.portWidth, this.portHeight, pin.pinType, -1);

            drawing.addLabel(rightPinStart.sub(this.portWidth).sub(milsToMM(20)), pinY, pin.text, {
                fontSize: numeric(40),
                anchor: HorizontalAlign.Right,
                vanchor: VerticalAlign.Middle,
                textColor: ColorScheme.PinNameColor,
            });
        });
    }

}

/** Base class for that provides methods to draw the graphical symbol
 *  on the canvas.
 */
export class SymbolDrawing {

    items: (Feature | GeometryProp)[] = [];

    // pinId, feature, angle
    pins: [NumericValue, Feature, angle: NumericValue, lineColor: string][] = [];

    angle = 0;

    flipX = 0;
    flipY = 0;

    mainOrigin:[x: NumericValue, y:NumericValue] = [numeric(0), numeric(0)];

    logger: Logger = null;

    // Stores values that will be used to populate/fill up fields
    // in the graphic object.
    variables: Map<string, any> = new Map();

    clear(): void {
        this.items = [];
        this.pins = [];
    }

    log(...params: any[]): void {
        this.logger && this.logger.add(params.join(' '));
    }

    addLine(startX: NumericValue, startY: NumericValue, 
        endX: NumericValue, endY: NumericValue): SymbolDrawing {
        
        startX = milsToMM(startX);
        startY = milsToMM(startY);
        endX = milsToMM(endX);
        endY = milsToMM(endY);
        
        this.items.push(
            Geometry.segment([startX, startY], [endX, endY])
        );

        return this;
    }

    addPin(pinId: NumericValue, startX: NumericValue, startY: NumericValue,
        endX: NumericValue, endY: NumericValue, lineColor: string): SymbolDrawing {
        startX = milsToMM(startX);
        startY = milsToMM(startY);
        endX = milsToMM(endX);
        endY = milsToMM(endY);

        return this.addPinMM(pinId, startX, startY, endX, endY, lineColor);
    }

    addPinMM(pinId: NumericValue, startXMM: NumericValue, startYMM: NumericValue, 
        endXMM: NumericValue, endYMM: NumericValue, lineColor: string): SymbolDrawing {
        // Values should be in mm

        // Determine the pin angle based on vector with start point 
        // going to end point. The angle is relative to the x-axis. 
        //             270 
        //     180 -- start --> 0
        //             90

        let angle = 0;

        const tmpStartXMM = startXMM.toNumber();
        const tmpEndXMM = endXMM.toNumber();

        const tmpStartYMM = startYMM.toNumber();
        const tmpEndYMM = endYMM.toNumber();

        if (tmpStartXMM === tmpEndXMM) {
            if (tmpStartYMM > tmpEndYMM) {
                angle = 270;
            } else if (tmpStartYMM < tmpEndYMM) {
                angle = 90;
            }
        } else {
            if (tmpStartXMM < tmpEndXMM) {
                angle = 0;
            } else if (tmpStartXMM > tmpEndXMM) {
                angle = 180;
            }
        }

        this.pins.push([
            pinId,
            Geometry.segment([startXMM, startYMM], [endXMM, endYMM]),
            numeric(angle),
            lineColor
        ]);

        return this;
    }

    addVLine(startX: NumericValue, startY: NumericValue, value: NumericValue): SymbolDrawing {
        startX = milsToMM(startX);
        startY = milsToMM(startY);
        value = milsToMM(value);

        this.items.push(
            Geometry.segment([startX, startY], [startX, startY.add(value)])
        );
        return this;
    }

    addHLine(startX: NumericValue, startY: NumericValue, value: NumericValue): SymbolDrawing {
        startX = milsToMM(startX);
        startY = milsToMM(startY);
        value = milsToMM(value);

        this.items.push(
            Geometry.segment([startX, startY], [startX.add(value), startY])
        );
        return this;
    }

    addRect(centerX: NumericValue, centerY: NumericValue, 
        width: NumericValue, height: NumericValue): SymbolDrawing {
        
        centerX = milsToMM(centerX);
        centerY = milsToMM(centerY);
        width = milsToMM(width);
        height = milsToMM(height);

        return this.addRectMM(centerX, centerY, width, height);
    }

    addRectMM(centerX: NumericValue, centerY: NumericValue, 
        width: NumericValue, height: NumericValue): SymbolDrawing {
        
        const width2 = width.div(2);
        const height2 = height.div(2);

        this.items.push(
            Geometry.polygon([
                [centerX.sub(width2), centerY.sub(height2)],
                [centerX.add(width2), centerY.sub(height2)],
                [centerX.add(width2), centerY.add(height2)],
                [centerX.sub(width2), centerY.add(height2)],
                [centerX.sub(width2), centerY.sub(height2)]
            ])
        );

        return this;
    }

    addTriangle(startX: NumericValue, startY: NumericValue,
        endX: NumericValue, endY: NumericValue, width: NumericValue): SymbolDrawing {

        startX = milsToMM(startX);
        startY = milsToMM(startY);
        endX = milsToMM(endX);
        endY = milsToMM(endY);

        width = milsToMM(width);

        const line = Geometry.line(
            startX, startY,
            endX, endY);

        const normLine = line.norm;
        const dx1 = numeric(normLine.x).mul(width).div(2);
        const dy1 = numeric(normLine.y).mul(width).div(2);
        const dx2 = numeric(normLine.x).mul(width.neg()).div(2);
        const dy2 = numeric(normLine.y).mul(width.neg()).div(2);

        this.items.push(
            Geometry.polygon([
                [dx1.add(startX), dy1.add(startY)],
                [dx2.add(startX), dy2.add(startY)],
                [endX, endY],
                [dx1.add(startX), dy1.add(startY)],
            ])
        );

        return this;
    }

    // addRect2(x: NumericValue, y: NumericValue, x2: NumericValue, y2: NumericValue): SymbolDrawing {
    //     this.items.push(
    //         Geometry.polygon([
    //             [x, y],
    //             [x2, y],
    //             [x2, y2],
    //             [x, y2],
    //             [x, y]
    //         ])
    //     );

    //     return this;
    // }

    addLabel(x: NumericValue, y: NumericValue, textValue: string, style: LabelStyle): SymbolDrawing {
        this.items.push(
            Geometry.label(null, x, y, textValue, style)
        )

        return this;
    }

    addLabelMils( x: NumericValue, y: NumericValue, textValue: string, style: LabelStyle): SymbolDrawing {
        x = milsToMM(x);
        y = milsToMM(y);

        this.items.push(
            Geometry.label(null, x, y, textValue, style)
        )

        return this;
    }

    addTextbox(x: NumericValue, y: NumericValue, textValue: string, style: LabelStyle): SymbolDrawing {
        x = milsToMM(x);
        y = milsToMM(y);

        this.items.push(
            Geometry.textbox(null, x, y, textValue, style)
        );

        return this;
    }

    addModulePort(x: NumericValue, y: NumericValue, width: NumericValue, height: NumericValue,
        portType = PinTypes.Any, scaleX=1): SymbolDrawing {

        // y will be the vertical center of the port
        const height2 = height.div(2);

        let path: [x: NumericValue, y: NumericValue][] = [];
        const arrowSize = milsToMM(30);

        if (portType === PinTypes.Any) {
            path = [
                [numeric(0),    height2.neg()],
                [width,         height2.neg()],
                [width,         height2],
                [numeric(0),    height2],
                [numeric(0),    height2.neg()]
            ];
        } else if (portType === PinTypes.Output) {
            path = [
                [arrowSize,     height2.neg()],
                [width,         height2.neg()],
                [width,         height2],
                [arrowSize,     height2],
                [numeric(0),    numeric(0)],
                [arrowSize,     height2.neg()]
            ];
        } else if (portType === PinTypes.Input) {
            path = [
                [numeric(0),            height2.neg()],
                [width.sub(arrowSize),  height2.neg()],
                [width,                 numeric(0)],
                [width.sub(arrowSize),  height2],
                [numeric(0),            height2],
                [numeric(0),            height2.neg()],
            ];
        } else if (portType === PinTypes.IO) {
            path = [
                [arrowSize,             height2.neg()],
                [width.sub(arrowSize),  height2.neg()],
                [width,                 numeric(0)],
                [width.sub(arrowSize),  height2],
                [arrowSize,             height2],
                [numeric(0),            numeric(0)],
                [arrowSize,             height2.neg()],
            ];
        }

        path = path.map(point => {
            return [
                x.add(point[0].mul(scaleX)),
                y.add(point[1])
            ];
        });

        this.items.push(Geometry.polygon(path));
        return this;
    }

    addPath(...pathParts: any): SymbolDrawing {
        const parts = pathParts.reduce((accum, tmp) => {
            if (typeof tmp === "string") {
                accum = accum.concat(tmp.split(" "));
            } else if (typeof tmp === "number") {
                accum.push(numeric(tmp));
            } else if (tmp instanceof NumericValue) {
                accum.push(tmp);
            }
            return accum;
        }, [] as (NumericValue | string)[]);

        const geomObjects = [];
        let currentObj: [x: NumericValue, y: NumericValue][] = null;

        for (let i = 0; i < parts.length; i++) {
            const command = parts[i];
            if (command === 'M') {
                // Start a new object
                if (currentObj !== null) {
                    geomObjects.push(currentObj);
                }

                const x = milsToMM(parts[i + 1]);
                const y = milsToMM(parts[i + 2]);

                currentObj = [[x, y]];

                i += 2;

            } else if (command === 'L') {
                const x = milsToMM(parts[i + 1]);
                const y = milsToMM(parts[i + 2]);
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

    addSetLineWidth(value: NumericValue): SymbolDrawing {
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

    addArc(x: NumericValue, y: NumericValue, radius: NumericValue, 
        startAngle: NumericValue, endAngle: NumericValue): SymbolDrawing {

        x = milsToMM(x);
        y = milsToMM(y);
        radius = milsToMM(radius);

        // Angles in degrees, convert to radians
        startAngle = startAngle.mul(Math.PI).div(180);
        endAngle = endAngle.mul(Math.PI).div(180);
        
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
        lineWidth: NumericValue}[] {
        
        let currentFill = "#fff";
        let currentLineWidth = numeric(1);
        let currentLineColor = '#333';

        const pathItems = [];

        this.items.forEach(item => {
            if (!(item instanceof Textbox)){
                if (item instanceof GeometryProp){
                    if (item.name === 'lineWidth'){
                        currentLineWidth = item.value as NumericValue;
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

    getPinPosition(pinId: number): { start: [x: NumericValue, y: NumericValue], end: [x: NumericValue, y: NumericValue], angle: NumericValue } {
        const pin = this.pins.find(item => {
            return item[0].toNumber() === pinId;
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

/** Stores a list of instructions/commands that will call the drawing 
 *  methods in the base symbol drawing class.
 */
export class SymbolDrawingCommands extends SymbolDrawing {

    id = "";
    private commands: GraphicExprCommand[] = [];

    paramIds: string[] = [];    // For component reference when executing
                                // graphic commands
    
    callback: (variables: Map<string, any>) => GraphicExprCommand[];

    constructor(callback: (variables: Map<string, any>) => GraphicExprCommand[]){
        super();
        this.callback = callback;

        // this.commands = commands;
        this.id = Math.random().toString().slice(2);
    }

    runCommands(): void {
        this.commands = this.callback(this.variables);
    }

    getCommands(): GraphicExprCommand[] {
        this.runCommands();
        return this.commands;
    }

    clone(): SymbolDrawingCommands {
        const cloned = new SymbolDrawingCommands(this.callback);
        cloned.variables = this.variables;
        return cloned;
    }

    /** Returns true if both symbol drawing commands are equivalent */
    eq(other: SymbolDrawingCommands): boolean {
        return this.callback === other.callback;
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

