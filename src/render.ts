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
import { BoundBox, combineMaps, getBoundsSize } from './utils.js';
import { getPaperSize, milsToMM, PaperGridReferences } from './helpers.js';
import SVGtoPDF from 'svg-to-pdfkit';
import { FrameParamKeys } from './objects/Frame.js';
import { SymbolPlaceholder } from './draw_symbols.js';
import { ClassComponent } from './objects/ClassComponent.js';
import { Logger } from './logger.js';

function createSvgCanvas(): Svg {
    const window = getCreateSVGWindow()();
    const document = window.document;

    registerWindow(window, document);

    const canvas:Svg = SVG(document.documentElement);
    applyFontsToSVG(canvas);
    
    return canvas;
}

export function renderSheetsToSVG(sheetFrames: SheetFrame[], logger: Logger): Svg {
    const canvas = createSvgCanvas();

    sheetFrames.forEach((sheet, index) => {
        const sheetGroup = canvas.group();
        sheetGroup.id('sheet-' + index).addClass('sheet');

        logger.add('rendering sheet: sheet-' + index);

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
            logger.add('drawing frame');

            // Get the frame component
            const frameComponent = sheet.frame.frame.parameters
                .get(FrameParamKeys.SheetType) as ClassComponent;

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
                    originalWidthMM = milsToMM(frameRects[0].width).toNumber();
                    originalHeightMM = milsToMM(frameRects[0].height).toNumber();
                    logger.add('first frame size: ' + originalWidthMM + ' ' + originalHeightMM);
                }

                if (frameRects[1]) {
                    widthMM = milsToMM(frameRects[1].width).toNumber();
                    heightMM = milsToMM(frameRects[1].height).toNumber();
                    logger.add('second frame size: ' + widthMM + ' ' + heightMM);
                }

                xOffset = (originalWidthMM - widthMM) / 2;
                yOffset = (originalHeightMM - heightMM) / 2;

                logger.add('offset', xOffset, yOffset);

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

        logger.add('sheet contents offset: ' + xOffset + ' ' + yOffset);

        logger.add('generating svg children in sheet');
        const sheetElements = sheetGroup.group().addClass('sheet-elements');

        // Draw all SVG children within the grid bounds only
        generateSVGChild(sheetElements, components, wires, junctions,
            mergedWires, allFrames, textObjects, gridBounds, extendGrid, logger);

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
    extendGrid: boolean, logger: Logger): void {

    const displayWireId = false;

    // Draw the display grid

    // The bounds will be in mm, since all the items are drawn in mm
    if (gridBounds === null){
        logger.add('get grid bounds');
        gridBounds = getBounds(components, wires, junctions, frameObjects);
    }

    logger.add('grid bounds',
        gridBounds.xmin, gridBounds.ymin, gridBounds.xmax, gridBounds.ymax);

    drawGrid(
        canvas.group().translate(0, 0),
        gridBounds, extendGrid, logger);

    components.forEach(item => {
        const { x, y, width, height } = item;
        const symbolGroup = canvas.group();
        symbolGroup.translate(x.toNumber(), y.toNumber());

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
                .translate(
                    wire.x.add(5).toNumber(), 
                    wire.y.add(5).toNumber())
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
            if (borderWidth.toNumber() > 0) {
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
                    .stroke({ 
                        width: milsToMM(borderWidth).toNumber(), 
                        color: strokeColor 
                    });

                tmpRect.translate(
                    item.x.toNumber(), item.y.toNumber());
            }
        }
    });

    textObjects.forEach(item => {
        const {x, y, symbol} = item;
        const innerGroup = canvas.group();
        innerGroup.translate(x.toNumber(), y.toNumber());
        symbol.draw(innerGroup);
    });

    // Draw origin
    const originSize = milsToMM(10).toNumber();

    RenderFlags.ShowOrigin && canvas.group().translate(0,0)
        .circle(originSize)
        .translate(-originSize/2, -originSize/2)
        .stroke('none').fill('red');
}

function drawGrid(group: G, 
    canvasSize: BoundBox,
    extendGrid: boolean, logger:Logger): void {
    
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
    const originSize = milsToMM(10).toNumber();
    RenderFlags.ShowGridOrigin && group.circle(originSize)
        .translate(-originSize/2, -originSize/2)
        .stroke('none').fill('blue');

    const lines = [];
    const smallOffset = milsToMM(3).toNumber();

    const startY = gridStartY - smallOffset/2;
    const endY = gridEndY + smallOffset;

    for (let i = 0; i < numCols; i++) {
        const startX = gridStartX + i * gridSize;
        lines.push(`M ${startX} ${startY} L ${startX} ${endY}`);
    }

    const strokeSize = milsToMM(3);
    group.addClass('grid')
        .path(lines.join(" "))
        .attr({
            'stroke-dasharray': `${strokeSize.toNumber()},${gridSize-strokeSize.toNumber()}`,
        })
        .stroke({
            width: strokeSize.toNumber(),
            color: '#000'
        })
}

function drawSheetFrameBorder(frameGroup: G, frame: RenderFrame): void {
    const frameParams = frame.frame.parameters;
    if (frameParams.has(FrameParamKeys.SheetType)) {
        const frameComponent = frameParams.get(FrameParamKeys.SheetType);
        const { displayProp = null } = frameComponent ?? {}

        if (displayProp) {
            const sheetFrameGroup = frameGroup.group();

            const symbol = new SymbolPlaceholder(displayProp);

            // Merge frame params into frame component params
            symbol.drawing.variables = combineMaps(frameComponent.parameters, 
                frameParams);

            symbol.refreshDrawing();
            symbol.draw(sheetFrameGroup);

            const offsetX = milsToMM(frameComponent.getParam('offset_x'));
            const offsetY = milsToMM(frameComponent.getParam('offset_y'));

            sheetFrameGroup.translate(
                -offsetX.toNumber(), -offsetY.toNumber());
        }
    }
}

interface SymbolExtras {
    net_name?: string;
    value?: string | number;
    instance_name?: string;
    place?: boolean;
}