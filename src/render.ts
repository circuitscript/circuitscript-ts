/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { SVG, SVGTypeMapping, registerWindow } from '@svgdotjs/svg.js';

import { BoundBox, MergedWire, RenderComponent, RenderFrame, 
    RenderFrameType, RenderJunction, RenderText, RenderWire, getBounds } from "./layout.js";
import { applyFontsToSVG, getCreateSVGWindow } from './sizing.js';
import { ColorScheme, ComponentTypes, MMToPx, ParamKeys, defaultGridSizeUnits, defaultScale, junctionSize } from './globals.js';
import { NumericValue } from './objects/ParamDefinition.js';
import { getBoundsSize } from './utils.js';
import { milsToMM } from './helpers.js';

export function generateSVG2(graph: {
    components: RenderComponent[],
    wires: RenderWire[], junctions: RenderJunction[],
    mergedWires: MergedWire[], debugRects?: BoundBox[],
    frameObjects: RenderFrame[],
    textObjects: RenderText[],
    }): string {

    const window = getCreateSVGWindow()();
    const document = window.document;

    registerWindow(window, document);

    const canvas = SVG(document.documentElement);
    applyFontsToSVG(canvas);

    generateSVGChild(canvas, 
        graph.components, graph.wires, graph.junctions, graph.mergedWires,
        graph.frameObjects, graph.textObjects,
        );

    // Dimensions of bbox is in mm
    const {x, y, width, height} = canvas.bbox();
    const margin = milsToMM(10);
    const widthAndMargin = width + margin * 2;
    const heightAndMargin = height + margin * 2;

    // 1 mil = 0.0254mm
    // 10 mils = 0.254mm
    // 100 mils = 2.54mm
    // Formula: mm = 25.4 * (px / 96)

    // The final output document is in metric dimensions - mm.
    const scale = MMToPx * defaultScale; // 1mil = 0.0254mm

    canvas.size(widthAndMargin * scale, heightAndMargin * scale);
    canvas.viewbox(x - margin, y - margin, widthAndMargin, heightAndMargin);

    return canvas.svg();
}

function generateSVGChild(canvas: SVGTypeMapping<SVGAElement>, 
    components: RenderComponent[], wires: RenderWire[], 
    junctions: RenderJunction[], mergedWires:MergedWire[],
    frameObjects:RenderFrame[], textObjects: RenderText[] ): void {

    const displayWireId = false;

    // Draw the display grid

    // The bounds will be in mm, since all the items are drawn in mm
    const bounds = getBounds(components, wires, junctions, frameObjects);

    drawGrid(
        canvas.group().translate(0, 0),
        {
            x: bounds.xmin,
            y: bounds.ymin,
            x2: bounds.xmax,
            y2: bounds.ymax
        });

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

    if (displayWireId){
        // Debugging method to draw the wire id next to the wires.
        const wiresGroup = canvas.group().translate(0, 0);
        
        wires.forEach(wire => {
            // Draw the wire id at the start of the wire
            wiresGroup.text(wire.id.toString())
                .font({
                    family: 'Inter',
                    size: 10,
                })
                .translate(wire.x+5, wire.y+5)
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
                    width: milsToMM(5), 
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
    const showElementFrames = false;

    frameObjects.forEach(item => {
        const { bounds, borderWidth } = item;

        if (borderWidth > 0){
            const { width, height } = getBoundsSize(bounds);

            let strokeColor = '#111';
            if (item.type === RenderFrameType.Container) {
                strokeColor = '#111';
            } else if (item.type === RenderFrameType.Elements){
                strokeColor = '#aaa';
                if (!showElementFrames){
                    return;
                }
            }

            const tmpRect = frameGroup.rect(width, height)
                .fill('none')
                .stroke({ width: milsToMM(borderWidth), color: strokeColor });

            tmpRect.translate(item.x, item.y);
        }
    });

    textObjects.forEach(item => {
        const {x, y, symbol} = item;
        const innerGroup = canvas.group();
        innerGroup.translate(x, y);
        symbol.draw(innerGroup);
    });

    const drawOrigin = false;

    // Draw origin
    const originSize = milsToMM(10);

    drawOrigin && canvas.group().translate(0,0)
        .circle(originSize)
        .translate(-originSize/2, -originSize/2)
        .stroke('none').fill('red');
}

function drawGrid(group: G, canvasSize: { x: number, y: number, x2: number, y2: number }): void {
    const gridSize = defaultGridSizeUnits;
    const { x, y, x2, y2 } = canvasSize;

    const gridStartX = (Math.floor(x / gridSize) - 1) * gridSize;
    const gridStartY = (Math.floor(y / gridSize) - 1) * gridSize;

    const gridEndX = (Math.ceil(x2 / gridSize) + 1) * gridSize;
    const gridEndY = (Math.ceil(y2 / gridSize) + 1) * gridSize;

    const numCols = Math.ceil((gridEndX - gridStartX) / gridSize);
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

    for (let i = 0; i <= numCols; i++) {
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

// function calculateBoundingBox(components: RenderComponent[]): { width: number, height: number } {
//     let maxX = Number.NEGATIVE_INFINITY;
//     let minX = Number.POSITIVE_INFINITY;

//     let maxY = Number.NEGATIVE_INFINITY;
//     let minY = Number.POSITIVE_INFINITY;

//     components.forEach(item => {
//         minX = Math.min(item.x, minX);
//         maxX = Math.max(item.x + item.width, maxX);

//         minY = Math.min(item.y, minY);
//         maxY = Math.max(item.y + item.height, maxY);
//     });

//     return {
//         width: (maxX - minX),
//         height: (maxY - minY)
//     }
// }

interface SymbolExtras {
    net_name?: string;
    value?: string | number;
    instance_name?: string;
    place?: boolean;
}