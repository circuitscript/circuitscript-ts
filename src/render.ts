import fs from 'fs';

import { ElkNode } from 'elkjs';
import { G, SVG, SVGTypeMapping, registerWindow } from '@svgdotjs/svg.js';
import { createSVGWindow } from 'svgdom';
import { applyFontsToSVG } from './sizing';
import { SymbolFactory } from './draw_symbols';

const bodyColor = '#FFFEAF';
const junctionSize = 8;
const junctionColor = '#111';
const edgeColor = '#111';

const defaultFont = 'Inter';

export function generateSVG(elkNode: ElkNode, outputPath: string): void {
    const window = createSVGWindow();
    const document = window.document;

    registerWindow(window, document);

    const canvas = SVG(document.documentElement);
    const { width, height } = elkNode;

    canvas.size(width, height);
    applyFontsToSVG(canvas);

    generateSVGChild(canvas, elkNode);

    const svgOutput = canvas.svg();

    fs.writeFile(outputPath, svgOutput, (err) => {
        if (err) {
            console.log('error writing to file: ', err);
        } else {
            console.log('saved to', outputPath);
        }
    });
}

function generateSVGChild(canvas: SVGTypeMapping<SVGAElement>, elkNode: ElkNode): void {
    const group = canvas.group();
    const {
        id,
        children = [],
        edges = [],
        ports = [],
        labels = [],
        x,
        y,
        width,
        height,
        __symbol = null,
    } = elkNode;
    group.translate(x, y);

    if (id !== 'root') {
        // Draw the main body of the child view
        if (__symbol === null) {
            group
                .rect(width, height)
                .fill(bodyColor)
                .stroke({ width: 1, color: '#333' });
        } else {
            const tmpSymbol = SymbolFactory(__symbol);
            if (tmpSymbol) {
                tmpSymbol.draw(group);
            }
        }
    }

    children.forEach((child) => {
        generateSVGChild(group, child);
    });

    // draw the ports
    ports.forEach((port) => {
        const { x, y, width, height, labels = [] } = port;
        const portGroup = group.group();

        portGroup.translate(x, y);
        portGroup
            .rect(width, height)
            .fill('#888')
            .stroke({ width: 1, color: '#333' });

        labels.forEach((label) => {
            const { x, y, text } = label

            portGroup
                .text(text)
                .translate(x, y)
                .fill('#333')
                .font({
                    family: defaultFont,
                    size: 10,
                })
                .css({
                    'dominant-baseline': 'hanging',
                });

            // Draw the text boundaries
            // portGroup.rect(label.width, label.height)
            //     .translate(x, y)
            //     .fill('none')
            //     .stroke({
            //         width: 1,
            //         color: '#333',
            //     })
        });
    });

    // Draw these later, so that they are above other elements
    const allJunctionPoints = [];

    // Draw edges
    edges.forEach((edge) => {
        const { sections = [], junctionPoints = [] } = edge;

        sections.forEach((section) => {
            const { startPoint, endPoint, bendPoints = [] } = section;

            const points = [];
            points.push([startPoint.x, startPoint.y]);

            bendPoints.forEach((point) => {
                points.push([point.x, point.y]);
            });

            points.push([endPoint.x, endPoint.y]);

            group
                .polyline(points)
                .fill('none')
                .stroke({ width: 1, color: edgeColor });
        });

        junctionPoints.forEach(point => {
            allJunctionPoints.push(point);
        });
    });

    allJunctionPoints.forEach((point) => {
        group.circle(junctionSize)
            .fill(junctionColor)
            .stroke({ width: 0 })
            .translate(point.x - junctionSize / 2, point.y - junctionSize / 2);
    });

    labels.forEach((label) => {
        const { text, x, y } = label;
        group
            .text(text)
            .translate(x, y)
            .fill('#333')
            .font({
                family: defaultFont,
                size: 10,
            })
            .css({
                'dominant-baseline': 'hanging',
            });
    });
}