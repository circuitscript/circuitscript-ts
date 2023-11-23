import fs from 'fs';

import { createSVGWindow } from 'svgdom';
import { SVG, SVGTypeMapping, registerWindow } from '@svgdotjs/svg.js';

import { BoundBox, MergedWire, RenderComponent, RenderJunction, RenderWire, getBounds } from "./layout2";
import { applyFontsToSVG } from './sizing';
import { bodyColor, junctionColor, junctionSize, wireColor } from './globals';
import { NumericValue } from './objects/ParamDefinition';

export function generateSVG2(graph: {components: RenderComponent[], 
    wires: RenderWire[], junctions: RenderJunction[], 
    mergedWires: MergedWire[], debugRects: BoundBox[]}, outputPath: string): void {
    
    const window = createSVGWindow();
    const document = window.document;

    registerWindow(window, document);

    const canvas = SVG(document.documentElement);
    applyFontsToSVG(canvas);

    generateSVGChild(canvas, 
        graph.components, graph.wires, graph.junctions, graph.mergedWires,
        graph.debugRects,
        );
    const {x, y, width, height} = canvas.bbox();

    const margin = 5;
    const widthAndMargin = width + margin * 2;
    const heightAndMargin = height + margin * 2;

    canvas.size(widthAndMargin, heightAndMargin);
    canvas.viewbox(x - margin, y - margin, widthAndMargin, heightAndMargin);

    const svgOutput = canvas.svg();

    fs.writeFile(outputPath, svgOutput, (err) => {
        if (err) {
            console.log('error writing to file: ', err);
        } else {
            console.log('saved to', outputPath);
        }
    });
}

function generateSVGChild(canvas: SVGTypeMapping<SVGAElement>, 
    components: RenderComponent[], wires: RenderWire[], 
    junctions: RenderJunction[], mergedWires:MergedWire[],
    debugRects: BoundBox[]): void {

    const displayWireId = false;

    // Draw the display grid
    const bounds = getBounds(components, wires, junctions);

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
            let extra = {};
            if (item.component.parameters.has('__is_net')) {
                extra.net_name = item.component.parameters.get('net_name');

            } else if (item.component.parameters.has('value')) {
                let tmpValue = item.component.parameters.get('value');
                if (tmpValue instanceof NumericValue){
                    // Prepare value for display
                    tmpValue = (tmpValue as NumericValue).value;
                }
                
                extra.value = tmpValue;
            }

            extra.instance_name = item.component.instanceName;
            
            if (item.component.parameters.has('place')){
                extra.place = item.component.parameters.get('place');
            } else {
                extra.place = true; // Default is to place the item
            }

            symbol.draw(symbolGroup, extra);

        } else {
            // draw default shape
            symbolGroup.rect(width, height)
                .fill(bodyColor)
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
                .stroke({ width: 1, color: wireColor, linecap: 'square' })
                .fill('none');
        });

        intersectPoints.forEach(point => {
            const [x, y, count] = point;
            mergedWireGroup.circle(junctionSize)
                            .translate(x - junctionSize/2, y - junctionSize/2)
                            .fill(junctionColor)
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

    // Draw origin
    canvas.group().translate(0,0)
        .circle(5)
        .translate(-5/2, -5/2)
        .stroke('none').fill('red');
}

function drawGrid(group: G, canvasSize: { x: number, y: number, x2: number, y2: number }): void {
    const gridSize = 20;
    const { x, y, x2, y2 } = canvasSize;

    const gridStartX = (Math.floor(x / gridSize) - 1) * gridSize;
    const gridStartY = (Math.floor(y / gridSize) - 1) * gridSize;

    const gridEndX = (Math.ceil(x2 / gridSize) + 1) * gridSize;
    const gridEndY = (Math.ceil(y2 / gridSize) + 1) * gridSize;

    const numCols = Math.ceil((gridEndX - gridStartX) / gridSize);
    const numRows = Math.ceil((gridEndY - gridStartY) / gridSize);

    // Draws (0, 0) point
    // group.circle(5)
    //     .translate(-5 / 2, -5 / 2)
    //     .fill('red')
    //     .stroke('none');

    const lines = [];

    for (let i = 0; i <= numCols; i++) {
        const startX = gridStartX + i * gridSize;
        const startY = gridStartY;
        const endY = gridEndY;
        lines.push(`M ${startX} ${startY} L ${startX} ${endY}`);
    }

    for (let i = 0; i <= numRows; i++) {
        const startX = gridStartX;
        const startY = gridStartY + i * gridSize;
        const endX = gridEndX;
        lines.push(`M ${startX} ${startY} L ${endX} ${startY}`);
    }

    group.path(lines.join(" "))
        .fill('none')
        .stroke({
            width: 1,
            color: '#eee'
        });
}

function calculateBoundingBox(components: RenderComponent[]): { width: number, height: number } {
    let maxX = Number.NEGATIVE_INFINITY;
    let minX = Number.POSITIVE_INFINITY;

    let maxY = Number.NEGATIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;

    components.forEach(item => {
        minX = Math.min(item.x, minX);
        maxX = Math.max(item.x + item.width, maxX);

        minY = Math.min(item.y, minY);
        maxY = Math.max(item.y + item.height, maxY);
    });

    return {
        width: (maxX - minX),
        height: (maxY - minY)
    }
}