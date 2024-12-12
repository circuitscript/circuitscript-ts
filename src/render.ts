/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { SVG, registerWindow, Svg, G } from '@svgdotjs/svg.js';

import {
    ExtractDrawingRects,
    MergedWire, RenderComponent, RenderFrame,
    RenderFrameType, RenderJunction, RenderText, RenderWire, SheetFrame, getBounds
} from "./layout.js";
import { applyFontsToSVG, getCreateSVGWindow } from './sizing.js';
import {
    ColorScheme, ComponentTypes, FrameType, MMToPt, MMToPx, ParamKeys, RenderFlags, defaultFont, defaultGridSizeUnits,
    defaultPageSpacingMM,
    defaultWireLineWidth, fontDisplayScale,
    junctionSize
} from './globals.js';
import { NumericValue } from './objects/ParamDefinition.js';
import { BoundBox, getBoundsSize } from './utils.js';
import { getPaperSize, milsToMM, PaperGridReferences } from './helpers.js';
import SVGtoPDF from 'svg-to-pdfkit';
import { FrameParamKeys } from './objects/Frame.js';
import { SymbolPlaceholder } from './draw_symbols.js';
import { ClassComponent } from './objects/ClassComponent.js';

function createSvgCanvas(): Svg {
    const window = getCreateSVGWindow()();
    const document = window.document;

    registerWindow(window, document);

    const canvas:Svg = SVG(document.documentElement);
    applyFontsToSVG(canvas);
    
    return canvas;
}

export function renderSheetsToSVG(sheetFrames: SheetFrame[]): Svg {
    const canvas = createSvgCanvas();

    sheetFrames.forEach((sheet, index) => {
        const sheetGroup = canvas.group();
        sheetGroup.id('sheet-' + index);

        const { components, wires, junctions,
            mergedWires, frames, textObjects } = sheet;

        // Draw the original sheet frame as well
        const allFrames = [sheet.frame, ...frames];

        let gridBounds: BoundBox | null = null;
        let extendGrid = true;

        let xOffset = 0;
        let yOffset = 0;

        let sheetYOffset = 0;

        if (sheet.frame.frame) {
            // Get the frame component
            const frameComponent = sheet.frame.frame.parameters
                .get(FrameParamKeys.SheetFrame) as ClassComponent;

            if (frameComponent) {

                if (frameComponent.displayProp === null) {
                    throw 'Invalid graphic object for sheet frame';
                }

                // First rect in the component is the paper size, 2nd rect
                // is the drawable area size
                const frameRects = ExtractDrawingRects(frameComponent.displayProp) ?? [];

                let originalWidthMM = 0;
                let originalHeightMM = 0;
                let widthMM = 0;
                let heightMM = 0;

                if (frameRects[0]) {
                    originalWidthMM = milsToMM(frameRects[0].width);
                    originalHeightMM = milsToMM(frameRects[0].height);
                }

                if (frameRects[1]) {
                    widthMM = milsToMM(frameRects[1].width);
                    heightMM = milsToMM(frameRects[1].height);
                }

                xOffset = (originalWidthMM - widthMM) / 2;
                yOffset = (originalHeightMM - heightMM) / 2;

                // Space out sheets with a fixed space
                sheetYOffset = index * (originalHeightMM + defaultPageSpacingMM);

                gridBounds = {
                    xmin: 0,
                    ymin: 0,
                    xmax: widthMM,
                    ymax: heightMM
                };

                extendGrid = false;
            }
        }

        const sheetElements = sheetGroup.group();
        generateSVGChild(sheetElements, components, wires, junctions,
            mergedWires, allFrames, textObjects, gridBounds, extendGrid);

        sheetElements.translate(xOffset, yOffset);
        sheetGroup.translate(0, sheetYOffset);    
    });

    return canvas;
}

export function generateSvgOutput(canvas: Svg, zoomScale = 1): string {
    // The final output document is in metric dimensions - mm.
    const scale = MMToPx * zoomScale; // 1mil = 0.0254mm

    //  Dimensions of bbox is in mm
    const { x, y, width, height } = canvas.bbox();

    // draw a rect around the bounds
    const scaledWidth = width * scale;
    const scaledHeight = height * scale;

    canvas.size(scaledWidth, scaledHeight);
    canvas.viewbox(x, y, width, height);

    return canvas.svg();
}

export function generatePdfOutput(doc: PDFKit.PDFDocument, canvas: Svg,
    sheetSize: string, sheetSizeDefined: boolean, zoomScale = 1): void {

    // Split the canvas up into different canvases

    const children = canvas.children();
    const numChildren = children.length;

    // 1 mil = 0.0254mm
    // 10 mils = 0.254mm
    // 100 mils = 2.54mm
    // Formula: mm = 25.4 * (px / 96)
    const scale = MMToPx * zoomScale; // 1mil = 0.0254mm

    const { originalWidthMM, originalHeightMM } = getPaperSize(sheetSize);

    children.forEach((child, index) => {
        const sheetCanvas = createSvgCanvas();
        sheetCanvas.add(child);

        const { x, y, width, height } = sheetCanvas.bbox();

        // Remove the border rect
        const sheetBorder = child.find('#sheet-border');
        if (sheetBorder.length > 0) {
            sheetBorder[0].remove();
        }

        // draw a rect around the bounds
        const scaledWidth = width * scale;
        const scaledHeight = height * scale;

        sheetCanvas.size(scaledWidth, scaledHeight);
        sheetCanvas.viewbox(x, y, width, height);

        let xOffset = 0;
        let yOffset = 0;
        if (!sheetSizeDefined) {
            // Center the svg
            xOffset = (originalWidthMM - width) / 2;
            yOffset = (originalHeightMM - height) / 2;
        }

        SVGtoPDF(doc, sheetCanvas.svg(), xOffset * MMToPt, yOffset * MMToPt);

        if (index + 1 < numChildren) {
            doc.addPage();
        }
    });
}

function generateSVGChild(canvas: Svg | G, 
    components: RenderComponent[], wires: RenderWire[], 
    junctions: RenderJunction[], mergedWires:MergedWire[],
    frameObjects:RenderFrame[], textObjects: RenderText[], 
    gridBounds: BoundBox | null,
    extendGrid: boolean): void {

    const displayWireId = false;

    // Draw the display grid

    // The bounds will be in mm, since all the items are drawn in mm
    if (gridBounds === null){
        gridBounds = getBounds(components, wires, junctions, frameObjects);
    }

    drawGrid(
        canvas.group().translate(0, 0),
        gridBounds, extendGrid);

    components.forEach(item => {
        const { x, y, width, height } = item;
        const symbolGroup = canvas.group();
        symbolGroup.translate(x, y);

        const { symbol = null } = item;

        if (symbol !== null && symbol) {
            const extra: SymbolExtras = {};

            if (item.component.typeProp === ComponentTypes.net) {
                extra.net_name = item.component.parameters.get(ParamKeys.net_name) as string;

            } else if (item.component.parameters.has('value')) {
                let tmpValue = item.component.parameters.get('value') as unknown;
                if (tmpValue instanceof NumericValue){
                    // Prepare value for display
                    tmpValue = (tmpValue as NumericValue).value;
                }
                
                extra.value = tmpValue as (string | number);
            }

            extra.instance_name = item.component.instanceName;
            
            if (item.component.parameters.has('place')){
                extra.place = (item.component.parameters.get('place') as unknown) as boolean;
            } else {
                extra.place = true; // Default is to place the item
            }

            symbol.draw(symbolGroup, extra);

        } else {
            // draw default shape
            symbolGroup.rect(width, height)
                .fill(ColorScheme.BodyColor)
                .stroke({ width: 1, color: '#333' });
        }
    });

    if (displayWireId) {
        // Debugging method to draw the wire id next to the wires.
        const wiresGroup = canvas.group().translate(0, 0);

        wires.forEach(wire => {
            // Draw the wire id at the start of the wire
            wiresGroup.text(wire.id.toString())
                .font({
                    family: 'Arial',
                    size: 50 * fontDisplayScale,
                })
                .translate(wire.x + 5, wire.y + 5)
        });
    }

    const mergedWireGroup = canvas.group();

    // draw the merged wires
    mergedWires.forEach(tmpItem => {
        const { segments, intersectPoints } = tmpItem;

        segments.forEach(segment => {
            const pt1 = segment[0];
            const pt2 = segment[1];
            mergedWireGroup.line([pt1, pt2])
                .stroke({ 
                    width: defaultWireLineWidth, 
                    color: ColorScheme.WireColor, 
                    linecap: 'square' })
                .fill('none');
        });

        intersectPoints.forEach(point => {
            const [x, y, count] = point;
            mergedWireGroup.circle(junctionSize)
                            .translate(x - junctionSize/2, y - junctionSize/2)
                            .fill(ColorScheme.JunctionColor)
                            .stroke('none');
                            
            // mergedWireGroup.text(count.toString())
            //                 .translate(x + 2, y + 2)
            //                 .font({
            //                     family: 'Inter',
            //                     size: 10,
            //                 })
        });
    });

    // const debugRectsGroup = canvas.group();
    // debugRects.forEach(box => {
    //     // Draw a rect
    //     const width = box.xmax - box.xmin;
    //     const height = box.ymax - box.ymin;
    //     const tmpRect = debugRectsGroup.rect(width, height)
    //                         .fill('none')
    //                         .stroke({ width: 1, color: '#000'});
    //     tmpRect.translate(box.xmin, box.ymin);
    // });

    const frameGroup = canvas.group();

    frameObjects.forEach(item => {
        const { bounds, borderWidth } = item;
        const { width, height } = getBoundsSize(bounds);
        let strokeColor = '#111';

        if (item.frame.frameType === FrameType.Sheet) {
            drawSheetFrameBorder(frameGroup, item);
        } else {
            if (borderWidth > 0) {
                if (item.type === RenderFrameType.Container) {
                    strokeColor = '#111';
                } else if (item.type === RenderFrameType.Elements) {
                    strokeColor = '#aaa';
                    if (!RenderFlags.ShowElementFrames) {
                        return;
                    }
                }

                const tmpRect = frameGroup.rect(width, height)
                    .fill('none')
                    .stroke({ width: milsToMM(borderWidth), color: strokeColor });

                tmpRect.translate(item.x, item.y);
            }
        }
    });

    textObjects.forEach(item => {
        const {x, y, symbol} = item;
        const innerGroup = canvas.group();
        innerGroup.translate(x, y);
        symbol.draw(innerGroup);
    });

    // Draw origin
    const originSize = milsToMM(10);

    RenderFlags.ShowOrigin && canvas.group().translate(0,0)
        .circle(originSize)
        .translate(-originSize/2, -originSize/2)
        .stroke('none').fill('red');
}

function drawGrid(group: G, 
    canvasSize: BoundBox,
    extendGrid: boolean): void {
    
    const gridSize = defaultGridSizeUnits;
    const { xmin, ymin, xmax, ymax } = canvasSize;

    // If extend grid is true, then draw outside of the canvas size
    const extraValue = extendGrid ? 1 : 0;

    const gridStartX = (Math.floor(xmin / gridSize) - extraValue) * gridSize;
    const gridStartY = (Math.floor(ymin / gridSize) - extraValue) * gridSize;

    const gridEndX = extendGrid
        ? (Math.ceil(xmax / gridSize) + extraValue) * gridSize
        : (xmax - xmin);

    const gridEndY = extendGrid
        ? (Math.ceil(ymax / gridSize) + extraValue) * gridSize
        : (ymax - ymin);

    const numCols = Math.floor((gridEndX - gridStartX) / gridSize)
        + (extendGrid ? 1 : 0);
    // const numRows = Math.ceil((gridEndY - gridStartY) / gridSize);

    // Draws (0, 0) point
    // group.circle(5)
    //     .translate(-5 / 2, -5 / 2)
    //     .fill('red')
    //     .stroke('none');

    const lines = [];
    const smallOffset = milsToMM(3);

    const startY = gridStartY - smallOffset/2;
    const endY = gridEndY + smallOffset;

    for (let i = 0; i < numCols; i++) {
        const startX = gridStartX + i * gridSize;
        lines.push(`M ${startX} ${startY} L ${startX} ${endY}`);
    }

    const strokeSize = milsToMM(3);
    group.path(lines.join(" "))
        .attr({
            'stroke-dasharray': `${strokeSize},${gridSize-strokeSize}`,
        })
        .stroke({
            width: strokeSize,
            color: '#000'
        })
}

function drawSheetFrameBorder(frameGroup: G, frame: RenderFrame): void {
    const frameParams = frame.frame.parameters;
    if (frameParams.has(FrameParamKeys.SheetFrame)) {
        const frameComponent = frameParams.get(FrameParamKeys.SheetFrame);
        const { displayProp = null } = frameComponent ?? {}

        if (displayProp) {
            const sheetFrameGroup = frameGroup.group();

            const symbol = new SymbolPlaceholder(displayProp);
            symbol.refreshDrawing();
            symbol.draw(sheetFrameGroup);

            const offsetX = milsToMM(frameComponent.getParam('offset_x'));
            const offsetY = milsToMM(frameComponent.getParam('offset_y'));

            sheetFrameGroup.translate(-offsetX, -offsetY);
        }
    }
}

/** @deprecated */
function drawSheetFrameBorderDirect(frameGroup: G, frame: RenderFrame,
    borderWidth: number, strokeColor: string, width: number, 
    height: number): void {
    
    const commonStroke = {
        width: milsToMM(borderWidth),
        color: strokeColor
    };

    const commonFont = {
        family: defaultFont,
        size: 50 * fontDisplayScale,
        'dominant-baseline': 'middle',
        'text-anchor': 'middle',
    };


    let rows = 1;
    let columns = 1;
    let showGridReference = true;

    if (PaperGridReferences[frame.size]) {
        [rows, columns] = PaperGridReferences[frame.size];
    } else {
        showGridReference = false;
    }

    if (!showGridReference) {
        return;
    }

    const outerMargin = 2;
    const outerWidth = width + outerMargin * 2;
    const outerHeight = height + outerMargin * 2;
    const outerRect = frameGroup.rect(outerWidth, outerHeight)
        .fill('none')
        .stroke(commonStroke);

    outerRect.translate(frame.x - outerMargin, frame.y - outerMargin);

    const gridWidth = outerWidth / columns;
    const gridHeight = outerHeight / rows;

    const pathPoints = [];

    // Draw row lines and add text
    for (let i = 1; i < rows + 1; i++) {
        const lineStartX = frame.x - outerMargin;
        const lineStartX2 = frame.x - outerMargin + outerWidth - outerMargin;

        const lineY = frame.y - outerMargin + (gridHeight * i);

        if (i < rows) {
            pathPoints.push(...[
                "M", lineStartX, lineY, "L", lineStartX + outerMargin, lineY,
                "M", lineStartX2, lineY, "L", lineStartX2 + outerMargin, lineY
            ]);
        }

        // Add text
        const displayValue = String.fromCharCode(i + 64);

        frameGroup.text(displayValue)
            .font(commonFont)
            .translate(lineStartX + outerMargin / 2, lineY - gridHeight / 2);

        frameGroup.text(displayValue)
            .font(commonFont)
            .translate(lineStartX2 + outerMargin / 2, lineY - gridHeight / 2);
    }

    // Draw column lines and add text
    for (let i = 1; i < columns + 1; i++) {
        const lineStartY = frame.y - outerMargin;
        const lineStartY2 = frame.y - outerMargin + outerHeight - outerMargin;
        const lineX = frame.x - outerMargin + (gridWidth * i);

        if (i < columns) {
            pathPoints.push(...[
                "M", lineX, lineStartY, "L", lineX, lineStartY + outerMargin,
                "M", lineX, lineStartY2, "L", lineX, lineStartY2 + outerMargin
            ]);
        }

        frameGroup.text(i.toString())
            .font(commonFont)
            .translate(lineX - gridWidth / 2, lineStartY + outerMargin / 2 + milsToMM(10));

        frameGroup.text(i.toString())
            .font(commonFont)
            .translate(
                lineX - gridWidth / 2, 
                lineStartY2 + outerMargin / 2 + milsToMM(10)
            );
    }

    frameGroup.path(pathPoints).stroke(commonStroke);

    const titleWidth = milsToMM(3000);
    const titleHeight = milsToMM(1000);
    const rowHeight = milsToMM(200);

    const points = [
        "M", width - titleWidth, height,
        "L", width - titleWidth, height - titleHeight,
        "L", width, height - titleHeight,

        "M", width - titleWidth, height - rowHeight,
        "L", width, height - rowHeight,

        "M", width - titleWidth, height - rowHeight * 2,
        "L", width, height - rowHeight * 2,

        "M", width - titleWidth, height - rowHeight * 3,
        "L", width, height - rowHeight * 3
    ];

    frameGroup.path(points).stroke(commonStroke).fill('none');

    if(frame.containsTitle) {
        // console.log(frame.frame.)
    }
}

interface SymbolExtras {
    net_name?: string;
    value?: string | number;
    instance_name?: string;
    place?: boolean;
}