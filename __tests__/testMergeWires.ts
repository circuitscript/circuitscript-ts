import { Geometry } from "../src/render/geometry.js";
import { numeric, NumericValue } from "../src/objects/ParamDefinition.js";

describe('geometry merge wires test', () => {

    function makePoint(x: number, y:number): {x: NumericValue, y: NumericValue} {
        return {
            x: numeric(x),
            y: numeric(y)
        }
    }

    function parseWires(wires:[x: number, y: number][][]){
        return wires.map(points => {
            return points.map(([x, y]) => {
                return {
                    x: numeric(x),
                    y: numeric(y)
                }
            })
        })
    }

    test('wire connected end to end', () => {
        const wires = parseWires([
            [   // Wire 1
                [100, 100],
                [200, 100],
            ],

            [
                // Wire 2
                [200, 100],
                [200, 120]
            ]
        ]);

        const { intersectPoints, segments, lines } = Geometry.mergeWires(wires);
        expect(segments).toStrictEqual([
            [
                [100, 100], [200, 100]
            ],
            [
                [200, 100], [200, 120],
            ]
        ]);

        expect(intersectPoints).toStrictEqual([]);

        expect(lines).toStrictEqual([
            [[100, 100], [200, 100], [200, 120]]
        ]);
    });

    test('wire connected at some point of wire 1', () => {

        const wires = parseWires([
            [
                // Wire 1
                [100, 100],
                [200, 100]
            ],
            [
                // Wire 2,
                [160, 100],
                [160, 120],
            ]
        ]);

        const { intersectPoints, segments, lines } = Geometry.mergeWires(wires);
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
        ]);

        expect(lines).toStrictEqual(
            [
                [[100, 100], [160, 100], [200, 100]],
                [[160, 100], [160, 120]]
            ]
        );
    });

    test('wire connected at some point of wire 2', () => {

        const wires = parseWires([
            [
                // Wire 2
                [160, 100], [160, 120],
            ],
            [
                // Wire 1
                [100, 100], [200, 100],
            ]
        ]);

        const { intersectPoints, segments, lines } = Geometry.mergeWires(wires);

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
        ]);

        expect(lines).toStrictEqual([
            [ [160, 100], [160, 120] ],
            [ [100, 100], [160, 100], [200, 100]]
        ]);
    });

    test('overlapping wires', () => {

        const wires = parseWires([
            [
                // Wire 1
                [100, 100], [140, 100],
            ],

            [
                // Wire 2,
                [120, 100], [160, 100]
            ]
        ]);

        const { intersectPoints, segments, lines } = Geometry.mergeWires(wires);

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

        // TODO: the segments could be re-ordered to form a single sine
    });

    test('reversed wires', () => {
        const wires = parseWires([
            [
                // Wire 1
                [100, 100], [140, 100],
            ],
            [
                // Wire 2
                [140, 100], [100, 100]
            ]
        ])

        const { intersectPoints, segments, lines } = Geometry.mergeWires(wires);

        expect(intersectPoints).toStrictEqual([]);
        expect(segments).toStrictEqual(
            [
                [[100, 100], [140, 100]]
            ]
        );

        expect(lines).toStrictEqual([
            [[100, 100], [140, 100]]
        ]);
    });

    test('complex wires to force splitting and re-parsing wires', () => {
        const wires = parseWires([
            [
                // Wire 1
                [7.62, 10.16], [2.54, 10.16]
            ],
            [
                // Wire 2
                [2.54, 10.16], [2.54, 7.62],
            ],
            [
                // Wire 3
                [2.54, 7.62], [2.54, 5.08],
            ],
            [
                // Wire 4
                [2.54, 5.08], [7.62, 5.08]
            ],
            [
                // Wire 5
                [2.54, 5.08], [2.54, 2.54], [5.08, 2.54], [5.08, 7.62]
            ]
        ]);

        const { intersectPoints, segments, lines } = Geometry.mergeWires(wires);

        expect(intersectPoints).toStrictEqual([[2.54, 5.08, 3], [5.08, 5.08, 4]]);
        expect(segments).toStrictEqual(
            [
                [[7.62, 10.16], [2.54, 10.16]],
                [[2.54, 10.16], [2.54, 7.62]],
                [[2.54, 7.62], [2.54, 5.08]],
                [[2.54, 5.08], [5.08, 5.08]],
                [[5.08, 5.08], [7.62, 5.08]],
                [[2.54, 5.08], [2.54, 2.54]],
                [[2.54, 2.54], [5.08, 2.54]],
                [[5.08, 2.54], [5.08, 5.08]],
                [[5.08, 5.08], [5.08, 7.62]]
            ]
        );

        expect(lines).toStrictEqual([
            [
              [ 7.62, 10.16 ],
              [ 2.54, 10.16 ],
              [ 2.54, 7.62 ],
              [ 2.54, 5.08 ],
              [ 5.08, 5.08 ],
              [ 7.62, 5.08 ]
            ],
            [
              [ 2.54, 5.08 ],
              [ 2.54, 2.54 ],
              [ 5.08, 2.54 ],
              [ 5.08, 5.08 ],
              [ 5.08, 7.62 ]
            ]
          ])
    })

});