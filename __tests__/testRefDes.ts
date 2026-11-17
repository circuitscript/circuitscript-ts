/*
 * Tests for the RefDes object parser and formatter.
 */

import { RefDes } from '../src/objects/RefDes.js';

const typeOf = (prefix: string): string | null => (prefix === 'R' ? 'res' : null);

describe('RefDes', () => {
    test('plain refdes', () => {
        const r = RefDes.parse('R11', typeOf)!;
        expect(r.componentType).toBe('res');
        expect(r.prefix).toBe('R');
        expect(r.componentTypeId).toBe(11);
        expect(r.indexedIds).toEqual([]);
        expect(r.componentNamespace).toBe('');
        expect(r.toString()).toBe('R11');
    });

    test('namespaced refdes', () => {
        const r = RefDes.parse('A1R49', typeOf)!;
        expect(r.componentNamespace).toBe('A1');
        expect(r.prefix).toBe('R');
        expect(r.componentTypeId).toBe(49);
        expect(r.toString()).toBe('A1R49');
    });

    test('namespaced indexed refdes', () => {
        const r = RefDes.parse('A1R4_2', typeOf)!;
        expect(r.componentNamespace).toBe('A1');
        expect(r.componentTypeId).toBe(4);
        expect(r.indexedIds).toEqual([2]);
        expect(r.toString()).toBe('A1R4_2');
    });

    test('placeholders', () => {
        const r = RefDes.parse('R5_')!;
        expect(r.componentTypeId).toBe(5);
        expect(r.indexedIds).toEqual([]);
        expect(r.placeholderDepth).toBe(1);
        expect(r.toString()).toBe('R5_');
        expect(RefDes.parse('R5__')!.placeholderDepth).toBe(2);
        expect(r.base().toString()).toBe('R5');
    });

    test('nested indexes', () => {
        const r = RefDes.parse('R4_2_3')!;
        expect(r.indexedIds).toEqual([2, 3]);
        expect(r.base().toString()).toBe('R4');
        expect(r.toPlaceholder(1).toString()).toBe('R4_');
        expect(r.base().withIndexes([7]).toString()).toBe('R4_7');
    });

    test('multi-segment namespace', () => {
        const r = RefDes.parse('A1B2R3')!;
        expect(r.componentNamespace).toBe('A1B2');
        expect(r.prefix).toBe('R');
        expect(r.componentTypeId).toBe(3);
    });

    test('unparseable text', () => {
        expect(RefDes.parse('TP_GND')).toBeNull();
        expect(RefDes.opaque('TP_GND').toString()).toBe('TP_GND');
    });

    test('unit suffix', () => {
        expect(RefDes.parse('U3')!.withUnitSuffix('B').toString()).toBe('U3B');
    });

    test.each(['R11', 'A1R49', 'A1R4_2', 'R5_', 'R5__', 'R4_2_3', 'A1B2R3', 'R?1'])(
        'round trip %s', (text) => {
            expect(RefDes.parse(text)!.toString()).toBe(text);
        });
});
