import fs from 'fs';

import { ElkNode } from 'elkjs';
import { SVG, SVGTypeMapping, registerWindow } from '@svgdotjs/svg.js';
import { createSVGWindow } from 'svgdom';

const bodyColor = '#FFFEAF';

export function generateSVG(elkNode: ElkNode, outputPath: string): void {
    const window = createSVGWindow();
    const document = window.document;

    registerWindow(window, document);

    const canvas = SVG(document.documentElement);

    const { width, height } = elkNode;

    canvas.size(width, height);

    generateSVGChild(canvas, elkNode);

    fs.writeFile(outputPath, canvas.svg(), (err) => {
        if (err) {
            console.log('error writing to file: ', err);
        } else {
            console.log('saved to', outputPath);
        }
    });
}

function generateSVGChild(canvas: SVGTypeMapping, elkNode: ElkNode): void {
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
    } = elkNode;
    group.translate(x, y);

    if (id !== 'root') {
        // Draw the main body of the child view
        group
            .rect(width, height)
            .fill(bodyColor)
            .stroke({ width: 1, color: '#333' });
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
            const { x, y, text } = label;

            portGroup
                .text(text)
                .translate(x, y)
                .fill('#333')
                .font({
                    family: 'Arial',
                    size: 10,
                })
                .css({
                    'dominant-baseline': 'hanging',
                });
        });
    });

    // Draw edges
    edges.forEach((edge) => {
        const { sections = [] } = edge;

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
                .stroke({ width: 1, color: 'black' });
        });
    });

    labels.forEach((label) => {
        const { text, x, y } = label;
        group
            .text(text)
            .translate(x, y)
            .fill('#333')
            .font({
                family: 'Arial',
                size: 10,
            })
            .css({
                'dominant-baseline': 'hanging',
            });
    });
}
