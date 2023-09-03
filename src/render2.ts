import fs from 'fs';

import { createSVGWindow } from 'svgdom';
import { G, SVG, SVGTypeMapping, registerWindow } from '@svgdotjs/svg.js';

import { RenderComponent, RenderWire } from "./layout2";
import { applyFontsToSVG } from './sizing';
import { bodyColor, edgeColor } from './globals';
import { SymbolFactory } from './draw_symbols';

export function generateSVG2(graph: {components: RenderComponent[], wires: RenderWire[]}, outputPath: string): void {
    const window = createSVGWindow();
    const document = window.document;

    registerWindow(window, document);

    const canvas = SVG(document.documentElement);
    const { width, height } = calculateBoundingBox(graph.components);

    canvas.size(width, height);
    applyFontsToSVG(canvas);

    generateSVGChild(canvas, graph.components, graph.wires);

    const svgOutput = canvas.svg();

    fs.writeFile(outputPath, svgOutput, (err) => {
        if (err) {
            console.log('error writing to file: ', err);
        } else {
            console.log('saved to', outputPath);
        }
    });
}

function generateSVGChild(canvas: SVGTypeMapping<SVGAElement>, components: RenderComponent[], wires: RenderWire[]): void {

    components.forEach(item => {
        const { x, y, width, height } = item;
        const group = canvas.group();
        group.translate(x, y);

        const { displaySymbol } = item;

        if (displaySymbol !== null) {
            const tmpSymbol = SymbolFactory(displaySymbol);
            if (tmpSymbol) {
                tmpSymbol.draw(group, {});
            }

            const numPins = item.component.numPins;
            for (let i = 0; i < numPins; i++) {
                // draw a circle at each port
                const portPosition = tmpSymbol.pinPosition(i + 1); // 1 - indexed
                group.circle(5)
                    .translate(portPosition.x - 5/2, portPosition.y - 5/2)
                    .fill('#333')
                    .stroke('none');
            }

        } else {
            // draw default shape

            group.rect(width, height)
                .fill(bodyColor)
                .stroke({ width: 1, color: '#333' });
        }
    });

    const wiresGroup = canvas.group().translate(0, 0);

    // Draw wires first
    wires.forEach(wire => {
        const points = wire.points.map(item => {
            return [item.x, item.y];
        });
        wiresGroup.polyline(points)
            .fill('none')
            .stroke({ width: 1, color: edgeColor });
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