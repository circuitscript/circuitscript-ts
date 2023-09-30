import Flatten from '@flatten-js/core'
import { measureTextSize2 } from './sizing';

export type Segment = Flatten.Segment;
export type Polygon = Flatten.Polygon;

export type Feature = Segment | Polygon | Label;

export type LabelStyle = {
    font?: string,
    fontSize?: number,
    
    anchor?: HorizontalAlign.Left | HorizontalAlign.Middle | HorizontalAlign.Right, // Horizontal anchor
    vanchor?: VerticalAlign.Top | VerticalAlign.Middle | VerticalAlign.Bottom, // Vertical anchor
}

export class Label extends Flatten.Polygon {

    text: string;

    anchorPoint: [number, number] = [0, 0];

    boundingBox: { width: number, height: number } = { width: -1, height: -1 };
    polygon: Polygon;

    font = 'default';

    style: LabelStyle;

    constructor(text: string, anchorPoint: [number, number], polygon: Flatten.Polygon, style: LabelStyle) {
        super(polygon.vertices);

        this.text = text;
        this.anchorPoint = anchorPoint;

        this.style = style;

        this.boundingBox = polygon.box;
        this.polygon = polygon;
    }

    static fromPoint(x: number, y: number, text: string, style: LabelStyle): Label {

        const defaultFont = 'Inter';

        const { fontSize = 10,
            anchor = HorizontalAlign.Left,
            vanchor = VerticalAlign.Bottom } = style;

        // Determine the size of the text
        const textBoundingBox = measureTextSize2(text, defaultFont, fontSize);

        const tmpWidth = textBoundingBox.width;
        const tmpHeight = textBoundingBox.height;

        let polygonCoords: [number, number][] = [];
        if (anchor === HorizontalAlign.Left) {
            polygonCoords = [
                [x, y - tmpHeight],
                [x + tmpWidth, y - tmpHeight],
                [x + tmpWidth, y],
                [x, y]
            ];
        } else if (anchor === HorizontalAlign.Middle && vanchor === VerticalAlign.Middle) {
            polygonCoords = [
                [x - tmpWidth / 2, y - tmpHeight / 2],
                [x + tmpWidth / 2, y - tmpHeight / 2],
                [x + tmpWidth / 2, y + tmpHeight / 2],
                [x - tmpWidth / 2, y + tmpHeight / 2]];
                
        } else if (anchor === HorizontalAlign.Middle) {
            polygonCoords = [
                [x - tmpWidth / 2, y - tmpHeight],
                [x + tmpWidth / 2, y - tmpHeight],
                [x + tmpWidth / 2, y],
                [x - tmpWidth / 2, y]
            ]
        } 

        const polygon = new Flatten.Polygon(polygonCoords);

        // Create the bounds of the label
        return new Label(text, [x, y], polygon, style);
    }

    rotate(angle: number, origin: Flatten.Point): Label {
        const polygonRotate = super.rotate(angle, origin);
        return new Label(this.text, this.anchorPoint, polygonRotate, this.style);
    }

    getLabelPosition(): [number, number] {
        return this.anchorPoint;
    }
}


export class Geometry {


    static point(x: number, y: number): Flatten.Point {
        return new Flatten.Point(x, y);
    }

    static label(x: number, y: number, text: string, style: LabelStyle): Label {
        return Label.fromPoint(x, y, text, style);
    }

    static segment(start: [number, number], end: [number, number]): Segment {
        return new Flatten.Segment(
            Geometry.point(start[0], start[1]),
            Geometry.point(end[0], end[1])
        );
    }

    static polygon(coords: [number, number][]): Polygon {
        return new Flatten.Polygon(coords);
    }

    static getCoords(item: Feature): [number, number][] {
        const points = item.vertices.map(vertex => {
            return [vertex.x, vertex.y];
        });

        // If is polygon, then add an additional point to "close" the polygon... (might not always be needed)..
        if (item instanceof Flatten.Polygon){
            return [...points, points[0]];
        }
        
        return points;
    }

    static rotateDegs(feature: Feature, angleDegrees: number, center: [number, number]): Feature {
        const angleRads = angleDegrees * Math.PI / 180;
        return feature.rotate(angleRads, Geometry.point(center[0], center[1]));
    }

    static groupRotate(features: Feature[], angle: number, center: [number, number]): Feature[] {
        const angleRads = angle * Math.PI / 180;
        const rotateAboutPoint = Geometry.point(center[0], center[1]);

        return features.map(feature => {
            return feature.rotate(angleRads, rotateAboutPoint);
        });
    }

    static groupBounds(features: Feature[]): {start: [number, number], end: [number, number], width: number, height: number} {

        let minX = Number.POSITIVE_INFINITY;
        let minY = Number.POSITIVE_INFINITY;

        let maxX = Number.NEGATIVE_INFINITY;
        let maxY = Number.NEGATIVE_INFINITY;

        features.forEach(feature => {
            const box = feature.box;
            box.xmin !== undefined && (minX = Math.min(minX, box.xmin));
            box.ymin !== undefined && (minY = Math.min(minY, box.ymin));
            
            box.xmax !== undefined && (maxX = Math.max(maxX, box.xmax));
            box.ymax !== undefined && (maxY = Math.max(maxY, box.ymax));
        });

        return {
            start: [minX, minY],
            end: [maxX, maxY],
            width: maxX - minX,
            height: maxY - minY,
        }
    }

    static getType(feature: Feature): string {
        if (feature instanceof Label) {
            return 'label';
        } else if (feature instanceof Flatten.Polygon) {
            return 'polygon';
        } else if (feature instanceof Flatten.Segment) {
            return 'segment';
        }

        console.log('unknown type', feature);
    }

    static featuresToPath(items: Feature[]): string {
        const paths = [];

        items.forEach(item => {
            // Do not draw labels here
            if (item instanceof Label){
                return;
            }

            const coords = Geometry.getCoords(item);
            const path = [];
            for (let i = 0; i < coords.length; i++) {
                const [x, y] = coords[i];
                const command = (i === 0) ? 'M' : 'L';
                path.push(`${command} ${x} ${y}`);
            }

            paths.push(path.join(' '));
        });

        return paths.join(" ");
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

    static mergeWires(wirePoints: {x: number, y:number}[][]): {intersectPoints:[x: number, y:number][], segments: Flatten.Segment[]}{

        // This array stores segments that only intersect
        // at the endpoints.
        const keepSegments:Flatten.Segment[] = [];

        wirePoints.forEach(points => {
            
            const tmpPoints = points.map(pt => {
                return new Flatten.Point(pt.x, pt.y);
            });

            // Generate segments from the points
            for (let i = 0; i < tmpPoints.length - 1; i++) {
                const pt1 = tmpPoints[i];
                const pt2 = tmpPoints[i + 1];

                let addSegment = true;
                // Check if the segment overlaps other segments
                for (let j = 0; j < keepSegments.length; j++) {
                    const tmpSegment = keepSegments[j];
                    const dist1 = tmpSegment.distanceTo(pt1);
                    const dist2 = tmpSegment.distanceTo(pt2);

                    if (dist1[0] === 0 && dist2[0] !== 0) {
                        // If one point is in the segment, then split this segment into
                        // 2
                        const splitResult = tmpSegment.split(pt1);
                        if (splitResult[0] !== null && splitResult[1] !== null){
                            keepSegments.splice(j, 1, splitResult[0]);
                            keepSegments.splice(j+1, 0, splitResult[1]);
                            break;
                        }

                    } else if (dist1[0] !== 0 && dist2[0] === 0){
                        const splitResult = tmpSegment.split(pt2);
                        if (splitResult[0] !== null && splitResult[1] !== null){
                            keepSegments.splice(j, 1, splitResult[0]);
                            keepSegments.splice(j+1, 0, splitResult[1]);
                            break;
                        }

                    } else if (dist1[0] === 0 && dist2[0] === 0) {
                        // If both points have zero distance, it means that the segment is
                        // completely overlapping. Need to determine which is the longer segment.
                        addSegment = false;
                        break;
                    }
                }

                if (addSegment) {
                    const newSegment = new Flatten.Segment(pt1, pt2);
                    keepSegments.push(newSegment);
                }
            }
        });

        const trackWirePoints: [x: number, y: number][] = [];

        keepSegments.forEach(segment => {
            trackWirePoints.push([segment.start.x, segment.start.y]);
            trackWirePoints.push([segment.end.x, segment.end.y]);
        });

        // Determine intersection points by going through each segment start
        // and end points and accumulating on overlapping points.
        const wirePointCounts = trackWirePoints.reduce((accum, point) => {
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

        const intersectPoints = wirePointCounts.reduce((accum, entry) => {
            const [x, y, count] = entry;
            if (count > 1){
                accum.push([x, y, count]);
            }
            return accum;
        }, []);

        return {
            intersectPoints,
            segments: keepSegments,
        }
    }
}

type WirePointCount = [x: number, y: number, count: number];

export enum HorizontalAlign {
    Left = 'left',
    Middle = 'middle',
    Right = 'right',
}

export enum VerticalAlign {
    Top = 'top',
    Middle = 'middle',
    Bottom = 'bottom',
}