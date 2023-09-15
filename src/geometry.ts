import Flatten from '@flatten-js/core'
import { measureTextSize2 } from './sizing';

export type Segment = Flatten.Segment;
export type Polygon = Flatten.Polygon;

export type Feature = Segment | Polygon | Label;


export class Label extends Flatten.Polygon {

    text: string;
    anchor: string;

    anchorPoint: [number, number] = [0, 0];

    font = 'default';
    fontSize = 10;

    constructor(text: string, anchorPoint:[number, number], polygon: Flatten.Polygon, anchor = 'left') {
        super(polygon.vertices);

        this.text = text;
        this.anchor = anchor;
        this.anchorPoint = anchorPoint;
    }

    static fromPoint(x: number, y: number, text: string, anchor = 'left'): Label {

        const defaultFont = 'Inter';

        // Determine the size of the text
        const textBoundingBox = measureTextSize2(text, defaultFont, 10);

        const tmpWidth = textBoundingBox.width;
        const tmpHeight = textBoundingBox.height;

        let polygonCoords: [number, number][] = [];
        if (anchor === 'left') {
            polygonCoords = [
                [x, y - tmpHeight],
                [x + tmpWidth, y - tmpHeight],
                [x + tmpWidth, y],
                [x, y]
            ];
        } else if (anchor === 'center') {
            polygonCoords = [
                [x - tmpWidth / 2, y - tmpHeight],
                [x + tmpWidth / 2, y - tmpHeight],
                [x + tmpWidth / 2, y],
                [x - tmpWidth / 2, y]
            ]
        }

        const polygon = new Flatten.Polygon(polygonCoords);

        // Create the bounds of the label
        return new Label(text, [x, y], polygon, anchor);
    }

    rotate(angle: number, origin: Flatten.Point): Label {
        const polygonRotate = super.rotate(angle, origin);
        return new Label(this.text, this.anchorPoint, polygonRotate, this.anchor);
    }
}


export class Geometry {


    static point(x: number, y: number): Flatten.Point {
        return new Flatten.Point(x, y);
    }

    static label(x: number, y: number, text: string, anchor = 'left'): Label {
        return Label.fromPoint(x, y, text, anchor);
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

}