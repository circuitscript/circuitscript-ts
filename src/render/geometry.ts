/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Flatten from '@flatten-js/core'
import { measureTextSize2 } from '../sizing.js';
import { defaultFont, fontDisplayScale, PortArrowSize, PortPaddingHorizontal, PortPaddingVertical } from '../globals.js';
import { Box } from '@svgdotjs/svg.js';
import { NumericValue, numeric, roundValue } from '../objects/NumericValue.js';
import { AllPinTypes, PinTypes } from '../objects/PinTypes.js';
import { SimplePoint } from './draw_symbols.js';

export type Segment = Flatten.Segment;
export type Polygon = Flatten.Polygon;
export type Multiline = Flatten.Multiline;
export type Line = Flatten.Line;

export type Arc = Flatten.Arc;
export type Circle = Flatten.Circle;

export type Feature = Segment | Polygon | Textbox | Arc | Multiline | Circle;

export type LabelStyle = {
    font?: string,
    fontSize?: NumericValue,
    fontWeight?: string,
    fontStyle?: string, // normal (default), italic

    angle?: NumericValue,
    
    anchor?: HorizontalAlign.Left | HorizontalAlign.Center | HorizontalAlign.Right, // Horizontal anchor
    vanchor?: VerticalAlign.Top | VerticalAlign.Center | VerticalAlign.Bottom, // Vertical anchor

    textColor?: string,

    portType?: null | PinTypes;
}

export class Textbox extends Flatten.Polygon {

    id: string;

    text: string;

    anchorPoint: [NumericValue, NumericValue] = [
        numeric(0), numeric(0)]; // Without any rotation

    boundingBox: { width: number, height: number } = { width: -1, height: -1 };
    polygon: Polygon;

    font = 'default';

    style: LabelStyle;

    textMeasurementBounds: Box;

    // Use to indicate if this is a label or a textbox.
    label: boolean;

    get box() {
        return this.polygon.box;
    }

    constructor(id: string, text: string, anchorPoint: [NumericValue, NumericValue], 
        polygon: Flatten.Polygon, style: LabelStyle, bounds: Box, label: boolean) {

        super(polygon.vertices);

        this.id = id;

        this.text = text;
        this.anchorPoint = anchorPoint;

        this.style = style;

        this.boundingBox = polygon.box;
        this.polygon = polygon;

        this.textMeasurementBounds = bounds;

        this.label = label;
    }

    static fromPoint(id: string, x: NumericValue, y: NumericValue, 
        text: string, style: LabelStyle, label: boolean): Textbox {

        let useText: string;
        if (typeof text === 'number'){
            useText = (text as number).toString();
        } else if (typeof text === 'object' 
            && text instanceof NumericValue) {
            useText = (text as NumericValue).toDisplayString();
        } else if (typeof text === 'string'){
            useText = text;
        } else {
            throw 'Invalid string passed into textbox';
        }

        const {
            fontSize = numeric(50),
            anchor = HorizontalAlign.Left,
            vanchor = VerticalAlign.Bottom,
            fontWeight = 'regular',
            fontStyle = 'normal',

            portType = null,
         } = style ?? {};

        // Determine the size of the text, this is needed to determine the
        // bounding box of the text for layout purposes.
        const { box } =
            measureTextSize2(useText, defaultFont,
                fontSize.mul(fontDisplayScale).toNumber(),
                fontWeight, fontStyle, anchor, vanchor);

        let polygonCoords : SimplePoint[] = [];

        // This is used to offset the original anchor point
        let anchorOffsetX = 0;
        let anchorOffsetY = 0;

        if (portType === null){
            polygonCoords = [
                [box.x, box.y],
                [box.x2, box.y],
                [box.x2, box.y2],
                [box.x, box.y2],
                [box.x, box.y],
            ] as SimplePoint[];

        } else if (AllPinTypes.indexOf(portType) !== -1) {
            const paddingHorizontal = PortPaddingHorizontal;
            const paddingVert = PortPaddingVertical;

            // Need to account for the arrow head
            if (portType === PinTypes.Input) {
                polygonCoords = [
                    [box.x - paddingHorizontal - PortArrowSize, box.y - paddingVert],
                    [box.x2 + paddingHorizontal, box.y - paddingVert],
                    [box.x2 + paddingHorizontal, box.y2 + paddingVert],
                    [box.x - paddingHorizontal - PortArrowSize, box.y2 + paddingVert],
                    [box.x - paddingHorizontal - PortArrowSize, box.y - paddingVert],
                ];
                anchorOffsetX += (PortArrowSize + paddingHorizontal);
            } else if (portType === PinTypes.Output) {
                polygonCoords = [
                    [box.x - paddingHorizontal, box.y - paddingVert],
                    [box.x2 + paddingHorizontal + PortArrowSize, box.y - paddingVert],
                    [box.x2 + paddingHorizontal + PortArrowSize, box.y2 + paddingVert],
                    [box.x - paddingHorizontal, box.y2 + paddingVert],
                    [box.x - paddingHorizontal, box.y - paddingVert],
                ];
                anchorOffsetX += paddingHorizontal;
            } else if (portType === PinTypes.IO) {
                polygonCoords = [
                    [box.x - paddingHorizontal - PortArrowSize, box.y - paddingVert],
                    [box.x2 + paddingHorizontal + PortArrowSize, box.y - paddingVert],
                    [box.x2 + paddingHorizontal + PortArrowSize, box.y2 + paddingVert],
                    [box.x - paddingHorizontal - PortArrowSize, box.y2 + paddingVert],
                    [box.x - paddingHorizontal - PortArrowSize, box.y - paddingVert],
                ];
                anchorOffsetX += paddingHorizontal + PortArrowSize;
            } else if (portType === PinTypes.Any) {
                polygonCoords = [
                    [box.x - paddingHorizontal, box.y - paddingVert],
                    [box.x2 + paddingHorizontal, box.y - paddingVert],
                    [box.x2 + paddingHorizontal, box.y2 + paddingVert],
                    [box.x - paddingHorizontal, box.y2 + paddingVert],
                    [box.x - paddingHorizontal, box.y - paddingVert],
                ];
                anchorOffsetX += paddingHorizontal;
            }

            anchorOffsetY += paddingVert/2;
        }

        const polygon = new Flatten.Polygon(polygonCoords);
        
        // Create the bounds of the label
        return new Textbox(id, useText, [x.add(anchorOffsetX), y.add(anchorOffsetY)], 
            polygon, style, box, label);
    }

    rotate(angle: number, origin: Flatten.Point): Textbox {
        // Override this so that a Label object is returned.
        const feature = super.rotate(angle, origin);
        const newAnchorPoint = this.transformAnchorPoint(
            segment => segment.rotate(angle, origin)
        );

        const tmpAnchorPoint = [
            numeric(newAnchorPoint[0]),
            numeric(newAnchorPoint[1])
        ] as [x: NumericValue, y: NumericValue];

        return new Textbox(this.id, this.text, tmpAnchorPoint, feature,
            this.style, this.textMeasurementBounds, this.label);
    }

    transform(matrix: Flatten.Matrix): Textbox {
        // Override this so that a Label object is returned.
        const feature = super.transform(matrix);

        const newAnchorPoint = this.transformAnchorPoint(
            segment => segment.transform(matrix)
        );

        const tmpAnchorPoint = [
            numeric(newAnchorPoint[0]),
            numeric(newAnchorPoint[1])
        ] as [x: NumericValue, y: NumericValue];

        return new Textbox(this.id, this.text, tmpAnchorPoint, feature,
            this.style, this.textMeasurementBounds, this.label
        );
    }

    private transformAnchorPoint(callback: (segment: Segment) => Segment): [x: number, y: number] {
        const anchorPointSegment = new Flatten.Segment(
            new Flatten.Point(0, 0),
            new Flatten.Point([
                this.anchorPoint[0].toNumber(),
                this.anchorPoint[1].toNumber(),
            ])
        );

        const newSegment = callback(anchorPointSegment);
        const lastPoint = newSegment.vertices[newSegment.vertices.length - 1];
        return [
            lastPoint.x, lastPoint.y
        ];
    }

    getLabelPosition(): [x: NumericValue, y: NumericValue] {
        return this.anchorPoint;
    }
}

export class GeometryProp {
    name: string;
    value: string | number;
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}

export class Geometry {
    
    static point(x: NumericValue, y: NumericValue): Flatten.Point {
        return new Flatten.Point(
            x.toNumber(),
            y.toNumber());
    }

    static line(x1: NumericValue, y1: NumericValue, x2: NumericValue, y2: NumericValue): Flatten.Line {
        return new Flatten.Line(
            Geometry.point(x1, y1),
            Geometry.point(x2, y2)
        )
    }

    static label(id: string, x: NumericValue, y: NumericValue, text: string, style: LabelStyle): Textbox {
        return Textbox.fromPoint(id, x, y, text, style, true);
    }

    static textbox(id: string | null, x: NumericValue, y: NumericValue, text: string, style: LabelStyle): Textbox {
        return Textbox.fromPoint(id, x, y, text, style, false);
    }

    static segment(start: [NumericValue, NumericValue], end: [NumericValue, NumericValue]): Segment {
        return new Flatten.Segment(
            Geometry.point(start[0], start[1]),
            Geometry.point(end[0], end[1])
        );
    }

    static polygon(coords: [NumericValue, NumericValue][]): Polygon {
        return new Flatten.Polygon(coords.map(item => {
            return [
                item[0].toNumber(),
                item[1].toNumber(),
            ]
        }));
    }

    static multiline(coords: [NumericValue, NumericValue][]): Multiline {
        const segments: Flatten.Segment[] = [];

        // Create the segments
        for (let i = 0; i < coords.length - 1; i++) {
            segments.push(new Flatten.Segment(
                Geometry.point(coords[i][0], coords[i][1]),
                Geometry.point(coords[i + 1][0], coords[i + 1][1])
            ))
        }

        return new Flatten.Multiline(segments);
    }

    static arc(center: [x: NumericValue, y: NumericValue], radius: NumericValue,
        startAngle: NumericValue, endAngle: NumericValue, sweepDirection: boolean): Arc {
        // Angle should be in radians for Flatten library.
        return new Flatten.Arc(Geometry.point(center[0], center[1]),
            radius.toNumber(),
            startAngle.toNumber(), endAngle.toNumber(), sweepDirection);
    }

    static circle(center: [x: NumericValue, y: NumericValue], radius: NumericValue): Circle {
        return new Flatten.Circle(Geometry.point(center[0], center[1]),
            radius.toNumber());
    }

    static getCoords(item: Feature): [x: NumericValue, y: NumericValue][] {
        const points = item.vertices.map(vertex => {
            return [
                numeric(vertex.x), numeric(vertex.y)
            ];
        }) as [x: NumericValue, y: NumericValue][];

        return points;
    }

    static rotateDegs(feature: Feature, angleDegrees: number, center: [x: NumericValue, y: NumericValue]): Feature {
        const angleRads = angleDegrees * Math.PI / 180;
        return feature.rotate(angleRads, Geometry.point(center[0], center[1]));
    }

    static translate(feature: Feature, dx: number, dy: number): Feature {
        const matrix = (new Flatten.Matrix()).translate(dx, dy);
        return feature.transform(matrix);
    }

    static flip(feature: Feature, flipX: number, flipY: number): Feature {
        const flipMatrix = (new Flatten.Matrix()).scale(
            flipX === 0 ? 1 : -1,
            flipY == 0 ? 1 : -1);

        return feature.transform(flipMatrix);
    }

    static groupRotate(features: Feature[], angle: number, center: [x: NumericValue, y: NumericValue]): Feature[] {
        const angleRads = angle * Math.PI / 180;
        const rotateAboutPoint = Geometry.point(center[0], center[1]);

        return features.map(feature => {
            return feature.rotate(angleRads, rotateAboutPoint);
        });
    }

    static groupFlip(features: Feature[], flipX: number, flipY: number): Feature[] {
        const flipMatrix = (new Flatten.Matrix()).scale(
            flipX === 0 ? 1 : -1,
            flipY == 0 ? 1 : -1);

        return features.map(feature => {
            return feature.transform(flipMatrix);
        });
    }

    static groupBounds(features: Feature[]): {
        start: [number, number], end: [number, number],
        width: number, height: number
    } {

        let minX = Number.POSITIVE_INFINITY;
        let minY = Number.POSITIVE_INFINITY;

        let maxX = Number.NEGATIVE_INFINITY;
        let maxY = Number.NEGATIVE_INFINITY;

        features.forEach(feature => {
            const tmpBox = feature.box;
            let box = {
                xmin: tmpBox.xmin,
                ymin: tmpBox.ymin,
                xmax: tmpBox.xmax,
                ymax: tmpBox.ymax
            };

            if (feature instanceof Textbox
                && feature.label
                && typeof feature.text === 'string'
                && feature.text.trim().length === 0) {
                return;
            }

            if (feature instanceof Textbox) {
                const [x, y] = feature.anchorPoint;
                box = {
                    xmin: box.xmin + x.toNumber(),
                    ymin: box.ymin + y.toNumber(),
                    xmax: box.xmax + x.toNumber(),
                    ymax: box.ymax + y.toNumber()
                }
            }


            if (box.xmin === undefined) {
                throw "Invalid box!";
            }

            minX = Math.min(minX, box.xmin);
            minY = Math.min(minY, box.ymin);

            maxX = Math.max(maxX, box.xmax);
            maxY = Math.max(maxY, box.ymax);
        });

        return {
            start: [minX, minY],
            end: [maxX, maxY],
            width: maxX - minX,
            height: maxY - minY,
        }
    }

    static featuresToPath(items: Feature[], flipX: number, flipY: number): 
        { path: string, isClosedPolygon: boolean } {

        const paths: (string | number)[] = [];
        let isClosedPolygon = false;

        items.forEach(item => {
            // Do not draw labels here
            if (item instanceof Textbox) {
                return;
            }

            const path = [];

            if (item instanceof Flatten.Arc){
                const x = item.center.x;
                const y = item.center.y;
                const radius = item.r as number;

                let extraEnd = '';

                const { startAngle: useStartAngle,
                    endAngle: useEndAngle } = item;

                // Assume angle is clockwise for now
                const startPoint = getArcPointRadians(x, y, radius,
                    useStartAngle);

                const endPoint = getArcPointRadians(x, y, radius,
                    useEndAngle);

                let largeArcSweepFlag = 0;
                if (useEndAngle - useStartAngle > Math.PI) {
                    largeArcSweepFlag = 1;
                }

                let sweepFlag = 1;
                if (flipX === 1 && flipY === 0) {
                    sweepFlag = 0;
                }

                paths.push('M', startPoint[0],
                    startPoint[1], 'A', radius, radius, 0, largeArcSweepFlag, sweepFlag,
                    endPoint[0], endPoint[1], extraEnd);


            } else {
                const coords = Geometry.getCoords(item);

                if (item instanceof Flatten.Polygon) {
                    isClosedPolygon = true;
                }

                for (let i = 0; i < coords.length; i++) {
                    const [x, y] = coords[i];
                    const command = (i === 0) ? 'M' : 'L';
                    path.push(`${command}`, x.toNumber(), y.toNumber());
                }

                if (isClosedPolygon){
                    path.push('Z');
                }

                paths.push(...path);
            }
        });

        return {
            path: this.roundPathValues(paths),
            isClosedPolygon,
        }
    }

    static roundPathValues(pathItems:(string|number)[]): string {
        // Ensure that values do not have very very small numbers
        return pathItems.map(item => {
            if (typeof item === 'number') {
                return (+item.toFixed(7)).toString();
            }

            return item
        }).join(" ");
    }

    static angle(dx: number, dy: number): number {
        // Angle is relative to the x-axis going clockwise
        const line = new Flatten.Segment(new Flatten.Point(0, 0), new Flatten.Point(dx, dy));
        return line.slope * 180 / Math.PI;
    }

    static getQuadrant(dx: number, dy: number): number {
        const angle = Geometry.angle(dx, dy);
        return Number(Math.floor(angle/90));
    }

    static mergeWires(wirePoints: { x: NumericValue, y: NumericValue }[][]): {
        intersectPoints: WirePointCount[],
        segments: SimplePoint[][],
        lines: SimplePoint[][],
    } {
        // Merge wire segments to reduce overlaps and minimize segments

        // This array stores segments that only intersect
        // at the endpoints.
        const existingSegments: Flatten.Segment[] = [];

        wirePoints.forEach(points => {

            const tmpPoints = points.map(pt => {
                const roundedX = roundValue(pt.x).toNumber();
                const roundedY = roundValue(pt.y).toNumber();

                return new Flatten.Point(roundedX, roundedY);
            });

            // Generate segments from the points
            for (let i = 0; i < tmpPoints.length - 1; i++) {
                const pt1 = tmpPoints[i];
                const pt2 = tmpPoints[i + 1];

                // Array stores segments to be added to existing segments.
                // The initial segment may be split into small segments,
                // so this is maintained in a array
                const newSegments = [
                    new Flatten.Segment(pt1, pt2)
                ];

                // Check if the new segment overlaps other existing segments
                for (let j = 0; j < existingSegments.length; j++) {
                    const currentSegment = existingSegments[j];

                    for (let k = 0; k < newSegments.length; k++) {
                        const newSegment = newSegments[k];

                        // Check if segments are equivalent
                        const segmentsAreSame = newSegment.equalTo(currentSegment) || newSegment.reverse().equalTo(currentSegment);

                        if (segmentsAreSame){
                            // remove segment from new segments
                            newSegments.splice(k, 1);
                            j = Math.max(0, j-1);
                            break;
                        }

                        const intersectPoints = currentSegment.intersect(newSegment);
                        if (intersectPoints.length > 0) {

                            // There should only be one possible intersection between two 
                            // segments (that are not parallel).

                            // If they are parallel and overlapping, then there will be
                            // two intersection points

                            const endToEndIntersect = intersectPoints.length === 1 &&
                                (
                                    currentSegment.end.equalTo(newSegment.start) || currentSegment.end.equalTo(newSegment.end) ||
                                    currentSegment.start.equalTo(newSegment.start) || currentSegment.start.equalTo(newSegment.end)
                                );

                            if (endToEndIntersect) {
                                // If end to end intersect, then do nothing and continue
                                continue;
                            }

                            // There will be a max of 4 segments in this array.
                            const splitSegments: Flatten.Segment[] = [];

                            intersectPoints.forEach(intersectPoint => {
                                const splitResult1 = currentSegment.split(intersectPoint);
                                const splitResult2 = newSegment.split(intersectPoint);

                                // Merge all segments into same array
                                [...splitResult1, ...splitResult2].forEach(segment => {
                                    if (segment !== null) {

                                        const matchingSegmentIndex = splitSegments.findIndex(item => {
                                            return item.equalTo(segment);
                                        });

                                        // Make sure segment does not already exist, to prevent duplicates.
                                        // Ensure that segment does not match the current segment or new segment,
                                        // this only ensures that segments that have been split are added!
                                        if (matchingSegmentIndex === -1 &&
                                            !segment.equalTo(currentSegment) && !segment.equalTo(newSegment)) {
                                            splitSegments.push(segment);
                                        }
                                    }
                                });
                            });

                            // Find split segments that are part of currentSegment
                            const splitCurrentSegments: Flatten.Segment[] = [];

                            // Find split segments that are part of new segment
                            const splitNewSegments: Flatten.Segment[] = [];

                            splitSegments.forEach(segment => {
                                // Priority is given to current segment, since it is already in the existing
                                // segments array.
                                if (currentSegment.contains(segment.start) && currentSegment.contains(segment.end)) {
                                    splitCurrentSegments.push(segment);
                                } else {
                                    // If split segments not part of current segment, they must
                                    // belong to the new segment!
                                    splitNewSegments.push(segment);
                                }
                            });

                            replaceSegments(existingSegments, j, splitCurrentSegments);
                            replaceSegments(newSegments, k, splitNewSegments);

                            // Decrement j and break out of this loop, so that 
                            // the segment is parsed again
                            j = Math.max(0, j-1);
                            break;
                        }
                    }
                }

                newSegments.forEach(segment => {
                    existingSegments.push(segment);
                });
            }
        });

        const trackWirePoints: SimplePoint[] = [];

        existingSegments.forEach(segment => {
            trackWirePoints.push([segment.start.x, segment.start.y]);
            trackWirePoints.push([segment.end.x, segment.end.y]);
        });

        // Determine intersection points by going through each segment start
        // and end points and accumulating on overlapping points.
        const accumPoints = trackWirePoints.reduce((accum, point) => {
            const found = accum.find(item => {
                return item[0] === point[0] && item[1] === point[1]
            });

            if (found) {
                found[2]++;
            } else {
                accum.push([point[0], point[1], 1]);
            }
            return accum;

        }, [] as WirePointCount[]);

        // Filter out points that have less than 3 intersections
        const intersectPoints = accumPoints.reduce((accum, entry) => {
            if (entry[2] > 2){
                accum.push(entry);
            }
            return accum;
        }, [] as WirePointCount[]);

        // Convert to just a simple array
        const segments:SimplePoint[][] = existingSegments.map(segment => {
            return [
                [segment.start.x, segment.start.y],
                [segment.end.x, segment.end.y]
            ]
        });

        // Convert segments into continuous lines if the 2nd point in a 
        // segment is the same as the 1st point of the next segment.
        const lines: SimplePoint[][] = [];
        let prevPoint!:SimplePoint;
        let currentLine: SimplePoint[] = [];

        segments.forEach((segment, index) => {
            const [pt1, pt2] = segment;

            // If first segment OR the prevPoint is not the same as pt1
            if (index === 0 || (prevPoint[0] !== pt1[0] || prevPoint[1] !== pt1[1])) {
                if (currentLine.length > 0) {
                    lines.push(currentLine);
                    currentLine = [];
                }

                currentLine.push([pt1[0], pt1[1]]);
            }

            currentLine.push(pt2);
            prevPoint = pt2;
        });

        if (currentLine.length > 0) {
            lines.push(currentLine);
        }

        return {
            intersectPoints,
            segments,
            lines,
        }
    }
}

function replaceSegments(segments: Flatten.Segment[], index: number, replacedSegments: Flatten.Segment[]): number {
    // Remove the original segment at position
    if (replacedSegments.length > 0){
        segments.splice(index, 1);
    }

    // Update the split sections back into the original existing
    // segments array
    let counter = 0;
    replacedSegments.forEach(item => {
        if (item !== null) {
            segments.splice(index + counter, 0, item);
            counter++;
        }
    });

    return counter;
}

function labelPolygonForAnchors(x: number, y: number, width: number, height: number, 
    hAnchor: HorizontalAlign, vAnchor: VerticalAlign): [x: number, y: number][]{

    // Vectors in terms of width and height, with respect
    // to the anchor point (both hAnchor and vAnchor)
    let coordVectors = [];

    if (hAnchor === HorizontalAlign.Left){
        if (vAnchor === VerticalAlign.Bottom){
            coordVectors = [
                [0, 0],
                [0, -1],
                [1, -1],
                [1, 1],
            ];
        } else if (vAnchor === VerticalAlign.Center){
            coordVectors = [
                [0, -0.5],
                [0, 0.5],
                [1, 0.5],
                [1, -0.5],
            ]; 
        } else if (vAnchor === VerticalAlign.Top){
            coordVectors = [
                [0, 0],
                [1, 0],
                [1, 1],
                [0, 1],
            ]; 
        }
    } else if (hAnchor === HorizontalAlign.Right){
        if (vAnchor === VerticalAlign.Bottom){
            coordVectors = [
                [0, 0],
                [-1, 0],
                [-1, -1],
                [0, -1],
            ]; 
        } else if (vAnchor === VerticalAlign.Center){
            coordVectors = [
                [0, -0.5],
                [0, 0.5],
                [-1, 0.5],
                [-1, -0.5],
            ]; 
        } else if (vAnchor === VerticalAlign.Top){
            coordVectors = [
                [0, 0],
                [0, 1],
                [-1, 1],
                [-1, 0]
            ]; 
        }
    }
    else if (hAnchor === HorizontalAlign.Center){
        if (vAnchor === VerticalAlign.Bottom){
            coordVectors = [
                [-0.5, 0],
                [-0.5, -1],
                [0.5, -1],
                [0.5, 0]
            ]; 
        } else if (vAnchor === VerticalAlign.Center){
            coordVectors = [
                [-0.5, 0.5],
                [-0.5, -0.5],
                [0.5, -0.5],
                [0.5, 0.5],
            ]; 
        } else if (vAnchor === VerticalAlign.Top){
            coordVectors = [
                [0.5, 0],
                [0.5, 1],
                [-0.5, 1],
                [-0.5, 0]
            ]; 
        }
    }
    
    return coordVectors.map(([vx, vy]) => {
        return [
            x + vx * width,
            y + vy * height
        ]
    });
}

type WirePointCount = [x: number, y: number, count: number];

export enum HorizontalAlign {
    Left = 'left',
    Center = 'center',
    Right = 'right',
}

export enum VerticalAlign {
    Top = 'top',
    Center = 'center',
    Bottom = 'bottom',
}

export enum HorizontalAlignProp {
    Start = 'start',
    Middle = 'middle',
    End = 'end',
}

export enum VerticalAlignProp {
    Hanging = 'hanging',
    Middle = 'middle',
    Central = 'central',
    TextTop = 'text-top',
    Alphabetic = 'alphabetic',
}

// function getArcPoint(centerX: number, centerY: number, radius: number,
//     angleDegrees: number): [x: number, y: number] {
//     const angleRads = angleDegrees * Math.PI / 180;
//     return getArcPointRadians(centerX, centerY, radius, angleRads);
// }

function getArcPointRadians(centerX: number, centerY: number,
    radius: number, angleRads: number): SimplePoint {

    // X-axis is 0 degree and rotation clockwise is positive.
    const dx = Math.cos(angleRads);
    const dy = Math.sin(angleRads);

    return [
        centerX + dx * radius,
        centerY + dy * radius
    ];
}