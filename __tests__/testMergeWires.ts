import { Geometry } from "../src/geometry.js";
import { numeric, NumericValue } from "../src/objects/ParamDefinition.js";

describe('geometry merge wires test', () => {

    function makePoint(x: number, y:number): {x: NumericValue, y: NumericValue} {
        return {
            x: numeric(x),
            y: numeric(y)
        }
    }

    test('wire connected end to end', () => {

        const wire1 = [
            makePoint(100, 100),
            makePoint(200, 100),
        ];

        const wire2 = [
            makePoint(200, 100),
            makePoint(200, 120),
        ];

        const { intersectPoints, segments } = Geometry.mergeWires([wire1, wire2]);
        expect(segments).toStrictEqual([
            [
                [100, 100], [200, 100]
            ],
            [
                [200, 100], [200, 120],
            ]
        ]);

        expect(intersectPoints).toStrictEqual([]);
    });

    test('wire connected at some point of wire 1', () => {

        const wire1 = [
            makePoint(100, 100),
            makePoint(200, 100),
        ];

        const wire2 = [
            makePoint(160, 100),
            makePoint(160, 120)
        ];

        const { intersectPoints, segments } = Geometry.mergeWires([wire1, wire2]);

        expect(segments).toStrictEqual([
            [
                [100, 100], [160, 100]
            ],
            [
                [160, 100], [200, 100],
            ],
            [
                [160, 100], [160, 120],
            ]
        ]);

        expect(intersectPoints).toStrictEqual([
            [160, 100, 3],
        ])
    });

    test('wire connected at some point of wire 2', () => {

        const wire1 = [
            makePoint(100, 100),
            makePoint(200, 100),
        ];

        const wire2 = [
            makePoint(160, 100),
            makePoint(160, 120),
        ];

        const { intersectPoints, segments } = Geometry.mergeWires([wire2, wire1]);

        expect(segments).toStrictEqual([
            [
                [160, 100], [160, 120]
            ],
            [
                [100, 100], [160, 100],
            ],
            [
                [160, 100], [200, 100],
            ]
        ]);

        expect(intersectPoints).toStrictEqual([
            [160, 100, 3],
        ])
    });

    test('overlapping wires', () => {

        const wire1 = [
            makePoint(100, 100),
            makePoint(140, 100)
        ];

        const wire2 = [
            makePoint(120, 100),
            makePoint(160, 100),
        ];

        const { intersectPoints, segments } = Geometry.mergeWires([wire1, wire2]);

        // No intersection points, because only have two segments
        // connected at each point.
        expect(intersectPoints).toStrictEqual([]);

        expect(segments).toStrictEqual(
            [
                [[120, 100], [140, 100]],
                [[100, 100], [120, 100]],
                [[140, 100], [160, 100]]
            ]
        );
    });

    test('reversed wires', () => {

        const wire1 = [
            makePoint(100, 100),
            makePoint(140, 100),
        ];

        const wire2 = [
            makePoint(140, 100),
            makePoint(100, 100),
        ];

        const { intersectPoints, segments } = Geometry.mergeWires([wire1, wire2]);

        expect(intersectPoints).toStrictEqual([]);
        expect(segments).toStrictEqual(
            [
                [[100, 100], [140, 100]]
            ]
        );
    });

});