import Flatten from '@flatten-js/core'

export type Segment = Flatten.Segment;
export type Polygon = Flatten.Polygon;

export type Feature = Segment | Polygon | Label;


export class Label extends Flatten.Polygon {

    text: string;
    anchor: string;

    constructor(polygon: Flatten.Polygon, text: string, anchor = 'left') {
        super(polygon.vertices);
        this.text = text;
        this.anchor = anchor;
    }

    static fromPoint(x: number, y: number, text: string, anchor = 'left'): Label {
        const tmpWidth = 100;
        const tmpHeight = 20;

        const polygon = new Flatten.Polygon([
            [x, y],
            [x + tmpWidth, y],
            [x + tmpWidth, y + tmpHeight],
            [x, y + tmpHeight]
        ]);

        // Create the bounds of the label
        return new Label(polygon, text, anchor);
    }

    rotate(angle: number, center: Flatten.Point): Label {
        const polygonRotate = super.rotate(angle, center);
        return new Label(polygonRotate, this.text, this.anchor);
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