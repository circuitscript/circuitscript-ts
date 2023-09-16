import fs from 'fs';

import { ElkNode } from 'elkjs';
import { G, SVG, SVGTypeMapping, registerWindow } from '@svgdotjs/svg.js';
import { createSVGWindow } from 'svgdom';
import { applyFontsToSVG } from './sizing';
import { SymbolFactory } from './draw_symbols';
import { PortSide } from './layout';
import { bodyColor, defaultFont, wireColor, junctionSize, junctionColor, portWidth, defaultFontSize } from './globals';

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
        __symbolExtra = {},
    } = elkNode;
    group.translate(x, y);

    let drawPortsName = true;

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
                if (__symbol === "label"){
                    tmpSymbol.width = width;
                    tmpSymbol.height = height;

                    // Get the port information
                    __symbolExtra.ports = ports;
                }
                tmpSymbol.draw(group, __symbolExtra);
            }

            drawPortsName = tmpSymbol.drawPortsName;
        }
    }

    children.forEach((child) => {
        generateSVGChild(group, child);
    });

    // draw the ports
    ports.forEach((port) => {
        const { x, y, width, height, labels = [], __pinId, properties } = port;
        const portGroup = group.group();

        portGroup.translate(x, y);
        portGroup
            .rect(width, height)
            .fill('#333');
            // .stroke({ width: 1, color: '#333' });

        if (drawPortsName) {
            // Port should only have 1 label for ELK layout.
            // The pin ID is drawn after ELK layout.
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
            });

            const portSide = properties["port.side"];
            let fontAnchor = 'start';
            let translateX = 0;

            if (portSide === PortSide.WEST) {
                fontAnchor = 'end';
                translateX = portWidth - 2;

            } else if (portSide === PortSide.EAST) {
                fontAnchor = 'start';
                translateX = 2;
            }

            portGroup.text(__pinId)
                .translate(translateX, -2)
                .fill('#333')
                .font({
                    family: defaultFont,
                    size: 10,
                    anchor: fontAnchor,
                });
        }
    });

    // Draw these later, so that they are above other elements
    const allJunctionPoints = [];

    // Draw edges
    edges.forEach((edge) => {
        const { sections = [], junctionPoints = [], priority, labels = [] } = edge;

        sections.forEach((section, index) => {
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
                .stroke({ width: 1, color: wireColor });

            // Draw something at the end to mark the 'arrow head'
            // group.circle(6)
            //      .translate(endPoint.x-3, endPoint.y-3)
            //      .fill('red')
            //      .stroke({width: 0});

            if (index === 0) {
                group.text(priority.toString())
                    .translate(startPoint.x, startPoint.y)
                    .fill('red')
                    .font({
                        family: defaultFont,
                        size: defaultFontSize
                    });
            }
        });

        junctionPoints.forEach(point => {
            allJunctionPoints.push(point);
        });

        // Draw edge labels
        labels.forEach(label => {
            group.text(label.text)
                .translate(label.x, label.y)
                .fill('blue')
                .font({
                    family: defaultFont,
                    size: defaultFontSize
                });
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
            .fill('#33333355')
            .font({
                family: defaultFont,
                size: 10,
            })
            .css({
                'dominant-baseline': 'hanging',
            });
    });

    // Display priority of the node
    const { priority=-1 } = elkNode.layoutOptions;
    group.text(priority.toString())
        .translate(0,0)
        .fill('green')
        .font({
            family: defaultFont,
            size: 10
        }).css({
            'dominant-baseline': 'hanging',
        });

}