import { comparePinIds } from "../src/helpers.js";
import { PinId } from "../src/objects/PinDefinition.js";

describe('comparePinIds', () => {
    test.each([
        ['numeric ascending: 1 vs 2', new PinId(1), new PinId(2)],
        ['int sorts before numeric-looking string because it\'s a different group', new PinId(1), new PinId('2')],
        ['natural ordering: A2 vs A10', new PinId('A2'), new PinId('A10')],
        ['lexicographic tie-break: A vs B', new PinId('A'), new PinId('B')],
        ['group 0 (leading __) before group 1 (numeric)', new PinId('__hidden'), new PinId(5)],
        ['group 0 (leading __) before group 2 (string)', new PinId('__hidden'), new PinId('Z')],
        ['group 0 (embedded __, not a prefix) before group 1 (numeric)', new PinId('foo__bar'), new PinId(5)],
        ['group 0 (embedded __, not a prefix) before group 2 (string)', new PinId('foo__bar'), new PinId('Z')],
        ['within group 0, natural compare still applies: __a1 vs __a2', new PinId('__a1'), new PinId('__a2')],
        ['group 0 before group 1 (overall group ordering)', new PinId('__hidden'), new PinId(1)],
        ['group 1 before group 2 (overall group ordering)', new PinId(1), new PinId('Z')],
    ])('%s', (_name, a, b) => {
        expect(comparePinIds(a, b)).toBeLessThan(0);
        expect(comparePinIds(b, a)).toBeGreaterThan(0);
    });

    test('equal pin ids return 0', () => {
        expect(comparePinIds(new PinId('A2'), new PinId('A2'))).toBe(0);
        expect(comparePinIds(new PinId(1), new PinId(1))).toBe(0);
    });

    test('numeric ascending: 1 vs 2 including zero (equal) case', () => {
        expect(comparePinIds(new PinId(1), new PinId(2))).toBeLessThan(0);
        expect(comparePinIds(new PinId(2), new PinId(1))).toBeGreaterThan(0);
        expect(comparePinIds(new PinId(2), new PinId(2))).toBe(0);
    });

    test('sort stability across a mixed array of pin ids', () => {
        const pinIds = ['__hidden', 3, 1, 'A10', 'A2', 'B'].map((value) => new PinId(value));

        pinIds.sort(comparePinIds);

        expect(pinIds.map((pinId) => pinId.toString())).toEqual(
            ['__hidden', '1', '3', 'A2', 'A10', 'B']
        );
    });
});
