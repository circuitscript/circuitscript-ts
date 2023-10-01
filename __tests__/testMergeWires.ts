import { Geometry } from "../src/geometry";

describe('geometry merge wires test', () => {

    test('wire connected end to end', () => {

        const wire1 = [
            { x: 100, y: 100 },
            { x: 200, y: 100 }
        ];

        const wire2 = [
            { x: 200, y: 100 },
            { x: 200, y: 120 }
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

        expect(intersectPoints).toStrictEqual([
            [ 200, 100, 2 ]
        ])
    });

    test('wire connected at some point of wire 1', () => {

        const wire1 = [
            { x: 100, y: 100 },
            { x: 200, y: 100 }
        ];

        const wire2 = [
            { x: 160, y: 100 },
            { x: 160, y: 120 }
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
            { x: 100, y: 100 },
            { x: 200, y: 100 }
        ];

        const wire2 = [
            { x: 160, y: 100 },
            { x: 160, y: 120 }
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

});