import { Geometry } from "../src/render/geometry.js";

const pinAngles = [0, 90, 180, 270];
const targets = [0, 90, 180, 270];
const flips: [number, number][] = [[0, 0], [1, 0], [0, 1], [1, 1]];

const cases: [string, number, number, number, number][] = [];
for (const p of pinAngles) {
    for (const t of targets) {
        for (const [fx, fy] of flips) {
            cases.push([`pin ${p} -> target ${t}, flip x=${fx} y=${fy}`, p, t, fx, fy]);
        }
    }
}

describe("resolveWireOrientation", () => {
    test.each(cases)("%s", (_name, pinAngle, target, userFlipX, userFlipY) => {
        const result = Geometry.resolveWireOrientation(
            pinAngle, target, userFlipX, userFlipY);

        const angle = result.angle ?? 0;
        const fx = userFlipX || (result.flipX ? 1 : 0);
        const fy = userFlipY || (result.flipY ? 1 : 0);

        // Pin reaches target
        expect(Geometry.flipDirection((pinAngle + angle) % 360, fx, fy))
            .toBe(target);

        // User flips preserved
        expect(fx).toBeGreaterThanOrEqual(userFlipX);
        expect(fy).toBeGreaterThanOrEqual(userFlipY);
        expect(userFlipX === 1 && result.flipX).toBeFalsy();
        expect(userFlipY === 1 && result.flipY).toBeFalsy();

        // Rotation reported
        const expected = (Geometry.flipDirection(target, userFlipX, userFlipY)
            - pinAngle + 360) % 360;
        expect(result.rotation).toBe(expected);
    });

    test("pin 180, target 0, user flip y", () => {
        const r = Geometry.resolveWireOrientation(180, 0, 0, 1);
        expect(r.flipX).toBe(true);
        expect(r.angle).toBeUndefined();
    });

    test("pin 180, target 180, user flip x falls back to rotation", () => {
        const r = Geometry.resolveWireOrientation(180, 180, 1, 0);
        expect(r.angle).toBe(180);
    });

    test("pin 180, target 0, no flips", () => {
        const r = Geometry.resolveWireOrientation(180, 0, 0, 0);
        expect(r.flipX).toBe(true);
        expect(r.angle).toBeUndefined();
    });

    test("pin 90, target 270, no flips", () => {
        const r = Geometry.resolveWireOrientation(90, 270, 0, 0);
        expect(r.flipY).toBe(true);
        expect(r.angle).toBeUndefined();
    });

    test("pin 90, target 0, no flips", () => {
        const r = Geometry.resolveWireOrientation(90, 0, 0, 0);
        expect(r.angle).toBe(270);
    });

    test("non-multiple of 90 pin angle is unchanged", () => {
        const r = Geometry.resolveWireOrientation(45, 0, 0, 0);
        expect(r).toEqual({ rotation: 315 });
    });
});
