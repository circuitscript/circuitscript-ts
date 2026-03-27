/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { G } from "@svgdotjs/svg.js";

import { milsToMM } from "../helpers.js";
import { ColorScheme, CustomSymbolParamTextSize, CustomSymbolPinIdSize, CustomSymbolPinTextSize, 
    CustomSymbolRefDesSize, Defaults, PinTypesList, PortArrowSize, PortPaddingHorizontal, 
    PortPaddingVertical, ReferenceTypes, RenderFlags, SymbolPinSide, 
    defaultFont, defaultPinIdTextSize, defaultPinNameTextSize, defaultSymbolLineWidth,
    fontDisplayScale} from "../globals.js";
import { Feature, Geometry, GeometryProp, HorizontalAlign, HorizontalAlignProp, LabelStyle, 
    Textbox, VerticalAlign, 
    VerticalAlignProp} from "./geometry.js";
import { Logger } from "../logger.js";
import { PinTypes } from "../objects/PinTypes.js";
import { RuntimeExecutionError, throwWithContext } from "../errors.js";
import { DeclaredReference, UndeclaredReference } from "../objects/types.js";
import { ParserRuleContext } from "antlr4ng";
import { NumericValue, numeric, roundValue } from "../objects/NumericValue.js";
import { PinId } from "../objects/PinDefinition.js";
import { Styles } from "src/styles.js";


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

    styles?: Styles;

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

    calculateSize(): {
        bodyWidth: NumericValue, 
        bodyHeight: NumericValue,
        width: NumericValue,
        height: NumericValue
    } {
        const { width, height } = this.drawing.getBoundingBox();
        this.width = numeric(width);
        this.height = numeric(height);

        return {
            bodyWidth: numeric(-1),
            bodyHeight: numeric(-1),
            width: this.width,
            height: this.height
        }
    }

    setStyles(styles: Styles): void {
        this.styles = styles;
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
    pinPosition(id: PinId): { x: NumericValue; y: NumericValue; angle: NumericValue; } {
        const pin = this.drawing.getPinPosition(id);

        if (pin === null){
            throw new RuntimeExecutionError(`Could not determine pin ${id} position`);
        }

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
                originSize.neg().half().toNumber(), 
                originSize.neg().half().toNumber())
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

        for (const label of labels) {
            const tmpLabel = label as Textbox;

            const {
                fontSize = numeric(50),
                anchor = HorizontalAlign.Left,
                vanchor = VerticalAlign.Bottom,
                fontWeight = 'regular',
                fontStyle = 'normal',
                angle: tmpLabelAngle = numeric(0),

                textColor = "#333",
            } = tmpLabel.style ?? {};
  
            let anchorStyle = 'start';
            let dominantBaseline = 'auto';
            
            let useAnchor = anchor;
            let useDominantBaseline = vanchor;

            const labelAngle = tmpLabelAngle.toNumber();
            const finalLabelAngle = labelAngle + this.angle;

            // If this is true, it means the text is upside-down. For 
            // readability, flip it around again.
            const isRotation180 = Math.abs(finalLabelAngle) === 180;

            if (isRotation180) {
                // Special case to flip the text instead of rotating
                useAnchor = this.flipTextAnchor(anchor);
                useDominantBaseline = this.flipDominantBaseline(vanchor);
            }

            /** 
             *    Direction       | flipX                 | flipY      
             *    Horizontal      | if 1, flip anchor     | if 1, flip baseline
             *    Vertical        | if 1, flip baseline   | if 1, flip anchor
             */

            const isHorizontalLabel = finalLabelAngle === 0 || finalLabelAngle === 180;
            const isVerticalLabel = finalLabelAngle === 90 || finalLabelAngle === -90;

            if (useAnchor === HorizontalAlign.Center) {
                anchorStyle = HorizontalAlignProp.Middle;
            } else if (useAnchor === HorizontalAlign.Left) {
                anchorStyle = HorizontalAlignProp.Start
            } else if (useAnchor === HorizontalAlign.Right) {
                anchorStyle = HorizontalAlignProp.End;
            }

            if (useDominantBaseline === VerticalAlign.Center) {
                dominantBaseline = VerticalAlignProp.Central;
            } else if (useDominantBaseline === VerticalAlign.Top) {
                dominantBaseline = VerticalAlignProp.Hanging;
            } else if (useDominantBaseline === VerticalAlign.Bottom) {
                dominantBaseline = VerticalAlignProp.TextTop;
            }

            // If middle aligned, don't do anything
            if (anchorStyle !== HorizontalAlignProp.Middle && 
                ((isHorizontalLabel && this.flipX === 1) || (isVerticalLabel && this.flipY === 1))){
                anchorStyle = (anchorStyle === HorizontalAlignProp.Start) 
                        ? HorizontalAlignProp.End : HorizontalAlignProp.Start;
            }

            // If middle aligned, don't do anything.
            if (dominantBaseline !== VerticalAlignProp.Central && 
                ((isHorizontalLabel && this.flipY === 1) || (isVerticalLabel && this.flipX === 1))){
                dominantBaseline = (dominantBaseline === VerticalAlignProp.Hanging)
                    ? VerticalAlignProp.TextTop : VerticalAlignProp.Hanging;
            }
            
            const position = tmpLabel.getLabelPosition();

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

            translateX = position[0];
            translateY = position[1];
            useRotateAngle = this.angle;

            translateX = roundValue(translateX);
            translateY = roundValue(translateY);

            // The port type will add some padding to the component
            const { portType = null } = tmpLabel.style;

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

            if (RenderFlags.ShowLabelBoxBounds) {
                const box = tmpLabel.box;
                
                textContainer.rect(
                    box.width,
                    box.height
                )
                    .fill('none')
                    .stroke({
                        width: 0.1,
                        color: 'blue',
                    })
                    .translate(box.xmin, box.ymin)
                    .rotate(labelAngle, -box.xmin, -box.ymin);
            }

            // Display text bounds
            if (RenderFlags.ShowLabelBounds) {
                const textBounds = tmpLabel.textMeasurementBounds;
                // display text bounds

                const xOffset = (this.flipX !== 0) ? textBounds.width : 0;

                textContainer.rect(
                    textBounds.width, textBounds.height
                )
                .fill('none')
                .stroke({
                        width: 0.1,
                        color: 'red',
                    })
                    .translate(textBounds.x - xOffset, textBounds.y);
            }

            textContainer.translate(
                    translateX.toNumber(), translateY.toNumber())
                .rotate(useRotateAngle, 
                    -translateX.toNumber(), -translateY.toNumber());

            let useLabelAngle = labelAngle;
            if (isRotation180) {
                useLabelAngle = (labelAngle + 180) % 360;
            }

            const fontProperties = {
                family: useFont,
                size: fontSize.toNumber() * fontDisplayScale,
                anchor: anchorStyle,
                'dominant-baseline': dominantBaseline,
                weight: fontWeight,
            }

            if (fontStyle !== 'normal'){
                // Asume that default is normal.
                fontProperties.style = fontStyle;
            }

            textContainer.text(tmpLabel.text)
                .fill(textColor)
                .font(fontProperties)
                .attr("xml:space", "preserve")
                .rotate(useLabelAngle, 0, 0);

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
            if (RenderFlags.ShowLabelOrigin){
                const originSize = milsToMM(10).toNumber();
                textContainer.circle(originSize)
                    .translate(
                        -originSize/2, 
                        -originSize/2)
                    .fill('green');
            }
        }
    }

    flipTextAnchor(value: HorizontalAlign): HorizontalAlign {
        if (value === HorizontalAlign.Left) {
            return HorizontalAlign.Right
        } else if (value === HorizontalAlign.Right) {
            return HorizontalAlign.Left;
        } else {
            return HorizontalAlign.Center;
        }
    }

    flipDominantBaseline(value: VerticalAlign): VerticalAlign {
        if (value === VerticalAlign.Top) {
            return VerticalAlign.Bottom;
        } else if (value === VerticalAlign.Bottom) {
            return VerticalAlign.Top;
        } else {
            return VerticalAlign.Center;
        }
    }
}

export class SymbolText extends SymbolGraphic {

    text: string;
    fontSize = numeric(40);
    fontWeight = 'regular';
    fontStyle = 'normal';
    color: string | undefined = undefined;

    constructor(text: string){
        super();
        this.text = text;
    }

    generateDrawing(): void {
        const drawing = this.drawing;
        drawing.clear();

        drawing.addTextbox(numeric(0), numeric(0), this.text, {
            fontSize: this.fontSize,
            anchor: HorizontalAlign.Center,
            fontWeight: this.fontWeight,
            fontStyle: this.fontStyle,
            textColor: this.color
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

    styles!: Styles;

    generateDrawing(): void {
        const drawing = this.drawing as SymbolDrawingCommands;

        drawing.log("=== start generate drawing ===");
        
        drawing.clear();

        // Store the transform properties to the drawing itself too.
        drawing.angle = this._angle;
        drawing.flipX = this._flipX;
        drawing.flipY = this._flipY;

        // Styles might not be set before rendering stage.
        const styles = this.styles ?? {
            lineColor: ColorScheme.PinLineColor,
            textColor: ColorScheme.PinNameColor,
            lineWidth: Defaults.LineWidth,
        };

        const defaultLineColor = styles.lineColor;
        const defaultLineWidth = styles.lineWidth;
        const defaultTextColor = styles.textColor;

        // Add default commands at the start to provide consistent style
        const commands = [
            [PlaceHolderCommands.units, ['mils'], {}],
            [PlaceHolderCommands.lineColor, [defaultLineColor], {}],
            [PlaceHolderCommands.textColor, [defaultTextColor], {}],
            [PlaceHolderCommands.lineWidth, [defaultLineWidth], {}],
            [PlaceHolderCommands.fill, ['none']],
            ...drawing.getCommands()
            ];

        drawing.log('id: ', drawing.id, 'angle: ', this._angle, "commands:", commands.length);

        let lineColor = defaultLineColor;
        let textColor = defaultTextColor;
        
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
                    // Circle consists of drawing two arcs of 180 degrees each
                    // @ts-ignore
                    drawing.addArc(...positionParams, numeric(0), numeric(180));
                    // @ts-ignore
                    drawing.addArc(...positionParams, numeric(180), numeric(360));
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

    parseLabelStyle(keywordParams: Map<string, any>): LabelStyle {
        const keywords = ['fontSize', 'anchor', 'vanchor', 
            'angle', 'textColor', 'portType', 'bold', 'italic'];

        // Create the style object
        const style: { [key: string]: any } = {};
        keywords.forEach(item => {
            if (keywordParams.has(item)) {
                style[item] = keywordParams.get(item);
                
                if (item === 'bold'){
                    style.fontWeight = keywordParams.get(item) === true ? 'bold' : 'regular';
                } else if (item === 'italic'){
                    style.fontStyle = keywordParams.get(item) === true ? 'italic' : 'normal';
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

        const keywordDisplayPinId = 'display_id';
        const keywordDisplayPinName = 'display_name';

        let displayPinId = true;
        let displayPinName = true;

        if (keywordParams.has(keywordDisplayPinId)) {
            const value = keywordParams.get(keywordDisplayPinId);
            displayPinId = (
                (value instanceof NumericValue && value.toNumber() === 0)
                || (value === 0)
                || (value === false)
            ) ? false: true;
        }

        if (keywordParams.has(keywordDisplayPinName)) {
            const value = keywordParams.get(keywordDisplayPinName);
            displayPinName = (
                (value instanceof NumericValue && value.toNumber() === 0)
                || (value === 0)
                || (value === false)
            ) ? false: true;
        }

        let pinNameParam: string | null = null;
        let pinType = PinTypes.Any;

        // Store for now, not used for anything yet.
        if (positionParams[1].type && positionParams[1].type === ReferenceTypes.pinType){
            pinType = positionParams[1].value;
            positionParams = [positionParams[0], ...positionParams.slice(2)];

        // If the pin type param is still a string and not parsed as a PinType yet.
        } else if (typeof positionParams[1] === 'string' && PinTypesList.indexOf(positionParams[1]) !== -1){
            pinType = positionParams[1] as PinTypes;
            positionParams = [positionParams[0], ...positionParams.slice(2)];
        }

        // If the type of the second position is a string, then
        // use the string value as the pin name
        if (typeof positionParams[1] === 'string') {
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
        if (positionParams[0] instanceof NumericValue){
            positionParams[0] = new PinId(positionParams[0].toNumber());
        } else if (typeof positionParams[0] === 'number' || typeof positionParams[0] === 'string') {
            positionParams[0] = new PinId(positionParams[0]);
        }

        drawing.addPinMM(...positionParams, lineColor);

        // Add a label for the pinId and pinName
        const lastAddedPin = this.drawing.pins[this.drawing.pins.length - 1];
        const [pinId, , angle] = lastAddedPin;
        const [, , , endX, endY] = positionParams;

        let pinNameAlignment = HorizontalAlign.Left;
        const offset1 = 15;
        const offset2 = 15;

        let pinNameOffsetX = milsToMM(0);
        let pinNameOffsetY = milsToMM(0);

        let pinIdOffsetX = numeric(0);
        let pinIdAlignment = HorizontalAlign.Left;

        let pinIdVAlignment = VerticalAlign.Bottom;
        let pinIdOffsetY = milsToMM(-offset2);

        const angleValue = angle.toNumber();

        let usePinIdAngle = 0;

        switch (angleValue) {
            case 0:
                pinNameAlignment = HorizontalAlign.Left;
                pinNameOffsetX = milsToMM(offset1);
                pinIdAlignment = HorizontalAlign.Right;
                pinIdOffsetX = milsToMM(-offset2);
                break;

            case 90:
                pinNameAlignment = HorizontalAlign.Right;
                pinNameOffsetX = milsToMM(0);
                pinNameOffsetY = milsToMM(offset1);

                pinIdAlignment = HorizontalAlign.Left;
                pinIdOffsetX = milsToMM(-offset2);
                pinIdOffsetY = milsToMM(-offset2);
                pinIdVAlignment = VerticalAlign.Bottom;
                usePinIdAngle = -90;
                break;

            case 180:
                pinNameAlignment = HorizontalAlign.Right;
                pinNameOffsetX = milsToMM(-offset1);
                pinIdAlignment = HorizontalAlign.Left;
                pinIdOffsetX = milsToMM(offset2);
                break;

            case 270:
                pinNameAlignment = HorizontalAlign.Left;
                pinNameOffsetX = milsToMM(0);
                pinNameOffsetY = milsToMM(-offset1);

                pinIdAlignment = HorizontalAlign.Right;
                pinIdOffsetX = milsToMM(-offset2);
                pinIdOffsetY = milsToMM(offset2);
                pinIdVAlignment = VerticalAlign.Bottom;
                usePinIdAngle = -90;
                break;
        }

        if (angleValue === 0 || angleValue === 90 || angleValue === 180 || angleValue === 270) {
            const usePinName = pinNameParam ?? "";

            // Draw the pinName
            displayPinName && usePinName !== "" && drawing.addLabel(
                endX.add(pinNameOffsetX), endY.add(pinNameOffsetY), 
                usePinName, {
                fontSize: numeric(defaultPinNameTextSize),
                anchor: pinNameAlignment,
                vanchor: VerticalAlign.Center,
                textColor: pinNameColor,
                angle: numeric(usePinIdAngle)
            });

            const pinDisplayText = pinId.toString();

            // Draw pin Id
            displayPinId && drawing.addLabel(
                endX.add(pinIdOffsetX), endY.add(pinIdOffsetY), 
                pinDisplayText, {
                fontSize: numeric(defaultPinIdTextSize),
                anchor: pinIdAlignment,
                vanchor: pinIdVAlignment,
                textColor: lineColor,
                angle: numeric(usePinIdAngle)
            });
        }
    }

    constructor(drawing: SymbolDrawing) {
        super();
        this.drawing = drawing;
    }

    setStyles(styles: Styles): void {
        this.styles = styles;
    }
}

export enum PlaceHolderCommands { 
    arc = 'arc',
    circle = 'circle',
    rect = 'rect',          // (x, y) with width and height
    crect = 'crect',        // Rect defined from center (x, y)
    triangle = 'triangle',
    pin = 'pin',
    hpin = 'hpin',
    vpin = 'vpin',
    hline = 'hline',
    vline = 'vline',
    line = 'line',
    label = 'label',
    path = 'path',
    lineWidth = 'line_width',
    fill = 'fill',
    lineColor = 'line_color',
    textColor = 'text_color',
    text = 'text',

    units = 'units',

    for = 'for',
}

/** Symbol that is generated only from pin definitions and does not have a 
 *  custom graphic to draw. */
export class SymbolCustom extends SymbolGraphic {

    pinDefinition: SymbolPinDefintion[] = [];

    bodyWidth = milsToMM(400);
    bodyHeight = milsToMM(100);

    pinLength = milsToMM(100);

    width = milsToMM(100);
    height = milsToMM(100);

    pinSpacing = milsToMM(100);

    pinTextPadding = milsToMM(5);

    pins: SymbolPinLayout[] = [];

    _cacheLeftPins: SymbolPinDefintion[] = [];
    _cacheRightPins: SymbolPinDefintion[] = [];
    _cacheTopPins: SymbolPinDefintion[] = [];
    _cacheBottomPins: SymbolPinDefintion[] = [];

    pinMaxPositions: Map<string, number>;

    constructor(pinDefinition: SymbolPinDefintion[], pinMaxPositions: Map<string, number>) {
        super();

        // define the left and right pins only for now
        this.pinDefinition = pinDefinition;

        this.pinMaxPositions = pinMaxPositions;
    }

    generateDrawing(): void {
        // Determine the size based on the definition

        const leftPins = this.getPins(SymbolPinSide.Left);
        const rightPins = this.getPins(SymbolPinSide.Right);
        const topPins = this.getPins(SymbolPinSide.Top);
        const bottomPins = this.getPins(SymbolPinSide.Bottom);

        this.drawing.clear();

        const drawing = this.drawing;
        drawing.angle = this._angle;
        drawing.flipX = this._flipX;
        drawing.flipY = this._flipY;

        const { bodyWidth, bodyHeight } = this.calculateSize();

        const defaultLineColor = ColorScheme.PinLineColor;
        drawing.addSetLineColor(defaultLineColor);
        // drawing.addSetFillColor(ColorScheme.BodyColor);

        drawing.addSetLineWidth(numeric(5));

        const xBody = bodyWidth.half().neg();
        const yBody = bodyHeight.half().neg();

        drawing.addRectMM(xBody, yBody, bodyWidth, bodyHeight);
        this.generateDrawingPins(drawing, bodyWidth, bodyHeight,
            {
                left: leftPins, right: rightPins, top: topPins, bottom: bottomPins
            }, defaultLineColor);

        this.drawing = drawing;

        this._cacheLeftPins = leftPins;
        this._cacheRightPins = rightPins;
        this._cacheTopPins = topPins;
        this._cacheBottomPins = bottomPins;
    }

    private getPins(side: SymbolPinSide): SymbolPinDefintion[] {
        const pins = this.pinDefinition.filter(item => {
            return item.side === side;
        });

        return pins;
    }

    generateDrawingPins(drawing: SymbolDrawing,
        bodyWidthMM: NumericValue, bodyHeightMM: NumericValue,
        pins: {
            left: SymbolPinDefintion[],
            right: SymbolPinDefintion[],
            top: SymbolPinDefintion[], 
            bottom: SymbolPinDefintion[],
        }, defaultLineColor: string): void {

        const {left: leftPins, right: rightPins, 
            top: topPins, bottom: bottomPins} = pins;

        // Setup the pins
        const leftPinStart = bodyWidthMM.neg().half();
        const rightPinStart = bodyWidthMM.half();

        const topPinStart = bodyHeightMM.neg().half();
        const bottomPinStart = bodyHeightMM.half();

        const pinStartY = bodyHeightMM.neg().half();
        const pinStartX = bodyWidthMM.neg().half();

        const tmpPinSpacing = this.pinSpacing.toNumber();

        for (const pin of leftPins) {
            const position = pin.position;
            const pinY = pinStartY.add((position + 1) * tmpPinSpacing) // Includes the offset too
            drawing.addPinMM(pin.pinId, leftPinStart.sub(this.pinLength), pinY,
                leftPinStart, pinY, defaultLineColor);

            drawing.addLabel(leftPinStart.add(milsToMM(20)),
                pinY, pin.text, {

                fontSize: numeric(CustomSymbolPinTextSize),
                anchor: HorizontalAlign.Left,
                vanchor: VerticalAlign.Center,
                textColor: ColorScheme.PinNameColor,
            });

            // Add the pin number
            drawing.addLabel(leftPinStart.sub(milsToMM(10)), pinY.sub(milsToMM(10)), pin.pinId.toString(), {
                fontSize: numeric(CustomSymbolPinIdSize),
                anchor: HorizontalAlign.Right,
                vanchor: VerticalAlign.Bottom,
                textColor: defaultLineColor
            });
        }

        for (const pin of rightPins) {
            const position = pin.position;
            const pinY = pinStartY.add((position + 1) * tmpPinSpacing) // Includes the offset too
            drawing.addPinMM(pin.pinId, rightPinStart.add(this.pinLength), pinY,
                rightPinStart, pinY, defaultLineColor);

            drawing.addLabel(rightPinStart.sub(milsToMM(20)), pinY, pin.text, {
                fontSize: numeric(CustomSymbolPinTextSize),
                anchor: HorizontalAlign.Right,
                vanchor: VerticalAlign.Center,
                textColor: ColorScheme.PinNameColor,
            });

            // Add the pin number
            drawing.addLabel(rightPinStart.add(milsToMM(10)), pinY.sub(milsToMM(10)), pin.pinId.toString(), {
                fontSize: numeric(CustomSymbolPinIdSize),
                anchor: HorizontalAlign.Left,
                vanchor: VerticalAlign.Bottom,
                textColor: defaultLineColor
            });
        }

        for (const pin of topPins) {
            const position = pin.position;
            const pinX = pinStartX.add((position + 1) * tmpPinSpacing) // Includes the offset too

            drawing.addPinMM(pin.pinId,
                pinX, topPinStart.sub(this.pinLength),
                pinX, topPinStart, defaultLineColor);

            drawing.addLabel(pinX, topPinStart.add(milsToMM(20)), pin.text, {
                fontSize: numeric(CustomSymbolPinTextSize),
                anchor: HorizontalAlign.Right,
                vanchor: VerticalAlign.Center,
                textColor: ColorScheme.PinNameColor,
                angle: numeric(-90),
            });

            // Add the pin number
            drawing.addLabel(pinX.sub(milsToMM(10)), topPinStart.sub(milsToMM(10)), pin.pinId.toString(), {
                fontSize: numeric(CustomSymbolPinIdSize),
                anchor: HorizontalAlign.Left,
                vanchor: VerticalAlign.Bottom,
                textColor: defaultLineColor,
                angle: numeric(-90),
            });
        }

        for (const pin of bottomPins) {
            const position = pin.position;
            const pinX = pinStartX.add((position + 1) * tmpPinSpacing) // Includes the offset too
            drawing.addPinMM(pin.pinId,
                pinX, bottomPinStart.add(this.pinLength),
                pinX, bottomPinStart, defaultLineColor);

            drawing.addLabel(pinX, bottomPinStart.sub(milsToMM(20)), pin.text, {
                fontSize: numeric(CustomSymbolPinTextSize),
                anchor: HorizontalAlign.Left,
                vanchor: VerticalAlign.Center,
                textColor: ColorScheme.PinNameColor,
                angle: numeric(-90),
            });

            // Add the pin number
            drawing.addLabel(pinX.sub(milsToMM(10)), bottomPinStart.add(milsToMM(10)), pin.pinId.toString(), {
                fontSize: numeric(CustomSymbolPinIdSize),
                anchor: HorizontalAlign.Right,
                vanchor: VerticalAlign.Bottom,
                textColor: defaultLineColor,
                angle: numeric(-90)
            });
        } 

        const instanceName = drawing.variables.get('refdes');
        instanceName && drawing.addLabel(
            bodyWidthMM.neg().half(), 
            bodyHeightMM.neg().half().sub(milsToMM(20)
        ), instanceName, {
            fontSize: numeric(CustomSymbolRefDesSize),
            anchor: HorizontalAlign.Left,
        });

        const acceptedMPNKeys = ['MPN', 'mpn', 'manufacturer_pn'];

        acceptedMPNKeys.some(key => {
            const labelValue = drawing.variables.get(key);
            if (labelValue !== undefined){
                drawing.addLabel(
                    bodyWidthMM.neg().half(), 
                    bodyHeightMM.half().add(milsToMM(20)), 
                    labelValue, {
                    fontSize: numeric(CustomSymbolParamTextSize),
                    anchor: HorizontalAlign.Left,
                    vanchor: VerticalAlign.Top,
                });
            }
        });
    }

    calculateSize(): {
        bodyWidth: NumericValue,
        bodyHeight: NumericValue,
        width: NumericValue,
        height: NumericValue
    } {
        // This width also includes the pin length
        const tmpPinSpacing = this.pinSpacing.toNumber();
        const tmpPinLength = this.pinLength.toNumber();

        const maxTopPins = this.pinMaxPositions.get(SymbolPinSide.Top) as number;
        const maxBottomPins = this.pinMaxPositions.get(SymbolPinSide.Bottom) as number;
        const maxLeftPins = this.pinMaxPositions.get(SymbolPinSide.Left) as number;
        const maxRightPins = this.pinMaxPositions.get(SymbolPinSide.Right) as number;

        const bodyWidthFromPins = numeric(
            (1 + Math.max(maxTopPins, maxBottomPins)) * tmpPinSpacing
        );

        const bodyWidth = Math.max(bodyWidthFromPins.toNumber(),
            this.bodyWidth.toNumber());

        let tmpBodyHeight = 0;

        if (maxLeftPins === 0 && maxRightPins === 0){
            tmpBodyHeight = 3;
        } else {
            tmpBodyHeight = (1 + Math.max(maxLeftPins, maxRightPins));
        }

        const bodyHeight = Math.max(
            tmpBodyHeight * tmpPinSpacing,
            this.bodyHeight.toNumber()
        );

        const useHeight = bodyHeight
            + ((this._cacheTopPins.length > 0) ? tmpPinLength : 0)
            + ((this._cacheBottomPins.length > 0) ? tmpPinLength : 0);

        const useWidth = bodyWidth
            + ((this._cacheLeftPins.length > 0) ? tmpPinLength : 0)
            + ((this._cacheRightPins.length > 0) ? tmpPinLength : 0);

        this.width = numeric(useWidth);
        this.height = numeric(useHeight);
        
        return {
            bodyWidth: numeric(bodyWidth), 
            bodyHeight: numeric(bodyHeight),
            width: this.width, 
            height: this.height
        }
    }

}

export class SymbolCustomModule extends SymbolCustom {

    pinLength = milsToMM(0);

    portWidth = milsToMM(100);
    portHeight = milsToMM(50);

    generateDrawingPins(drawing: SymbolDrawing,
        bodyWidthMM: NumericValue, bodyHeightMM: NumericValue,
        pins: {
            left: SymbolPinDefintion[],
            right: SymbolPinDefintion[],
            top: SymbolPinDefintion[], 
            bottom: SymbolPinDefintion[],
        }, defaultLineColor: string): void {

        // Values should already be in mm

        // Setup the pins
        const leftPinStart = bodyWidthMM.neg().half();
        const rightPinStart = bodyWidthMM.half();

        const topPinStart = bodyHeightMM.neg().half();
        const bottomPinStart = bodyHeightMM.half();

        const pinStartY = bodyHeightMM.neg().half();
        const pinStartX = bodyWidthMM.neg().half();

        const tmpPinSpacing = this.pinSpacing.toNumber();

        const {left: leftPins, right: rightPins, 
            top: topPins, bottom: bottomPins} = pins;
        
        leftPins.forEach(pin => {
            const position = pin.position;
            const pinY = pinStartY.add((position + 1) * tmpPinSpacing) // Includes the offset too
            drawing.addPinMM(pin.pinId, leftPinStart.sub(this.pinLength), pinY,
                leftPinStart, pinY, defaultLineColor);

            drawing.addModulePort(leftPinStart, pinY, this.portWidth, this.portHeight, pin.pinType);

            drawing.addLabel(leftPinStart.add(this.portWidth).add(milsToMM(20)), pinY, pin.text, {
                fontSize: numeric(40),
                anchor: HorizontalAlign.Left,
                vanchor: VerticalAlign.Center,
                textColor: ColorScheme.PinNameColor,
            });
        });

        rightPins.forEach(pin => {
            const position = pin.position;
            const pinY = pinStartY.add((position + 1) * tmpPinSpacing) // Includes the offset too
            drawing.addPinMM(pin.pinId, rightPinStart.add(this.pinLength), pinY,
                rightPinStart, pinY, defaultLineColor);

            drawing.addModulePort(rightPinStart, pinY, this.portWidth, this.portHeight, pin.pinType, -1);

            drawing.addLabel(rightPinStart.sub(this.portWidth).sub(milsToMM(20)), pinY, pin.text, {
                fontSize: numeric(40),
                anchor: HorizontalAlign.Right,
                vanchor: VerticalAlign.Center,
                textColor: ColorScheme.PinNameColor,
            });
        });

        topPins.forEach(pin => {
            const position = pin.position;
            const pinX = pinStartX.add((position + 1) * tmpPinSpacing) // Includes the offset too
            drawing.addPinMM(pin.pinId, 
                pinX, topPinStart.sub(this.pinLength), 
                pinX, topPinStart, defaultLineColor);

            drawing.addModulePort(pinX, topPinStart, this.portWidth, this.portHeight, pin.pinType, 1, 90);

            drawing.addLabel(pinX, topPinStart.add(this.portWidth).add(milsToMM(20)), pin.text, {
                fontSize: numeric(40),
                anchor: HorizontalAlign.Right,
                vanchor: VerticalAlign.Center,
                textColor: ColorScheme.PinNameColor,
                angle: numeric(-90),
            });
        });

        bottomPins.forEach(pin => {
            const position = pin.position;
            const pinX = pinStartX.add((position + 1) * tmpPinSpacing) // Includes the offset too
            drawing.addPinMM(pin.pinId, 
                pinX, bottomPinStart, 
                pinX, bottomPinStart.sub(this.pinLength), defaultLineColor);

            drawing.addModulePort(pinX, bottomPinStart, this.portWidth, this.portHeight, pin.pinType, 1, -90);

            drawing.addLabel(pinX, bottomPinStart.sub(this.portWidth).sub(milsToMM(20)), pin.text, {
                fontSize: numeric(40),
                anchor: HorizontalAlign.Left,
                vanchor: VerticalAlign.Center,
                textColor: ColorScheme.PinNameColor,
                angle: numeric(-90),
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
    pins: PinRenderInfo[] = [];

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

    addPinMM(pinId: PinId, startXMM: NumericValue, startYMM: NumericValue, 
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

    addRect(x: NumericValue, y: NumericValue,
        width: NumericValue, height: NumericValue): SymbolDrawing {

        return this.addRectMM(
            milsToMM(x), milsToMM(y),
            milsToMM(width), milsToMM(height)
        );
    }

    addRectMM(x: NumericValue, y: NumericValue,
        width: NumericValue, height: NumericValue): SymbolDrawing {

        const x2 = x.add(width);
        const y2 = y.add(height);

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
        const dx1 = numeric(normLine.x).mul(width).half();
        const dy1 = numeric(normLine.y).mul(width).half();
        const dx2 = numeric(normLine.x).mul(width.neg()).half();
        const dy2 = numeric(normLine.y).mul(width.neg()).half();

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
        portType = PinTypes.Any, scaleX=1, angle=0): SymbolDrawing {

        // y will be the vertical center of the port
        const height2 = height.half();

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

        const polygon = Geometry.polygon(path)
            .rotate(angle * Math.PI / 180, Geometry.point(x, y))

        this.items.push(polygon);
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

    getPinPosition(pinId: PinId): 
        { 
            start: [x: NumericValue, y: NumericValue], 
            end: [x: NumericValue, y: NumericValue], 
            angle: NumericValue 
        } {
        const pin = this.pins.find(item => {
            return item[0].equals(pinId);
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
    protected commands: GraphicExprCommand[] = [];

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

export type SimplePoint = [x: number, y: number];

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
    pinId: PinId,
    text: string, // Display value at the pin
    position: number,
    pinType: PinTypes,
}

export type PinRenderInfo = 
    [PinId, Feature, angle: NumericValue, lineColor: string];