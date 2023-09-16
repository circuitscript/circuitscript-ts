import fs from 'fs';

import { createSVGWindow } from 'svgdom';
import { SVG, SVGTypeMapping, registerWindow } from '@svgdotjs/svg.js';

import { RenderComponent, RenderJunction, RenderWire } from "./layout2";
import { applyFontsToSVG } from './sizing';
import { bodyColor, edgeColor } from './globals';
import { NumericValue } from './objects/ParamDefinition';

export function generateSVG2(graph: {components: RenderComponent[], wires: RenderWire[], junctions: RenderJunction[]}, outputPath: string): void {
    const window = createSVGWindow();
    const document = window.document;

    registerWindow(window, document);

    const canvas = SVG(document.documentElement);
    applyFontsToSVG(canvas);

    generateSVGChild(canvas, graph.components, graph.wires, graph.junctions);
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

function generateSVGChild(canvas: SVGTypeMapping<SVGAElement>, components: RenderComponent[], wires: RenderWire[], junctions: RenderJunction[]): void {

    const drawPinPosition = false;

    components.forEach(item => {
        const { x, y, width, height } = item;
        const symbolGroup = canvas.group();
        symbolGroup.translate(x, y);

        const { symbol = null } = item;

        if (symbol !== null) {
            if (symbol) {
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
                symbol.draw(symbolGroup, extra);
            }

            if (drawPinPosition) {
                const numPins = item.component.numPins;
                for (let i = 0; i < numPins; i++) {
                    // draw a circle at each port
                    const pinPosition = symbol.pinPosition(i + 1); // 1 - indexed
                    symbolGroup.circle(5)
                        .translate(pinPosition.x - 5 / 2, pinPosition.y - 5 / 2)
                        .fill('#333')
                        .stroke('none');
                }
            }

        } else {
            // draw default shape

            symbolGroup.rect(width, height)
                .fill(bodyColor)
                .stroke({ width: 1, color: '#333' });
        }
    });

    const wiresGroup = canvas.group().translate(0, 0);
    
    wires.forEach(wire => {
        const points = wire.points.map(item => {
            return [item.x, item.y];
        });
        wiresGroup.polyline(points)
            .fill('none')
            .stroke({ width: 1, color: edgeColor });
    });

    const junctionRadius = 5;

    const junctionGroup = canvas.group().translate(0, 0);
    junctions.forEach(item => {
        junctionGroup.circle(junctionRadius)
                     .translate(item.x - junctionRadius/2, item.y - junctionRadius/2)
                     .fill('#333')
                     .stroke('none');
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