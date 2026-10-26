import { RuntimeExecutionError } from "../src/errors";
import { expectJsonOutput, renderCommon } from "./helpers";

const mainPath = '__tests__/testData/bomData/';

describe('BOM generation', () => {

    test.each([
        ['script1', 'script1.cst',  {
            columns: ['refdes', 'description', 'mpn', 'manufacturer'],
            group_by: ['mpn', 'manufacturer'],
        }],
        ['script2', 'script2.cst',  {
            columns: ['refdes', 'description', 'lcsc'],
            group_by: ['lcsc'],
        }],
        ['script4', 'script4.cst', {
            columns: ['refdes', 'mpn', 'manufacturer'],
            group_by: ['mpn', 'manufacturer'],
        }],
        ['script5', 'script5.cst', {
            columns: ['refdes', 'mpn', 'manufacturer'],
            group_by: ['mpn', 'manufacturer'],
        }],
        ['script6', 'script6.cst', {
            columns: ['refdes', 'value', 'footprint'],
            group_by: ['value', 'footprint'],
        }],
    ])('script - %s (%s)', async (title, scriptPath, bomConfig) => {
        const { bomCsvOutput } = await renderCommon(mainPath + scriptPath, {
            generateBom: true,
            bomConfig,
        });

        const jsonString = JSON.stringify(bomCsvOutput);
        expectJsonOutput(jsonString, `${mainPath}expected/${scriptPath}.json`);
    });

    test('unplaced items are excluded from BOM rows and reported', async () => {
        const { bomResult } = await renderCommon(mainPath + 'script3.cst', {
            generateBom: true,
            bomConfig: { columns: ['refdes', 'mpn', 'manufacturer'], group_by: ['mpn', 'manufacturer'] },
        });
        expect(bomResult!.unplacedItems).toContain('R3');
        expect(bomResult!.bom.map(r => r['refdes'])).not.toContain('R3');
    });

    test('components with missing BOM values are tracked in missingValues', async () => {
        const { bomResult } = await renderCommon(mainPath + 'script3.cst', {
            generateBom: true,
            bomConfig: { columns: ['refdes', 'mpn', 'manufacturer'], group_by: ['mpn', 'manufacturer'] },
        });
        const affectedRefdes = [...bomResult!.missingValues.values()].flat();
        expect(affectedRefdes).toContain('R2');
    });

    test.each([true, false])('bom_exclude removes part from BOM and unplaced list (only_placed=%s)', async (onlyPlaced) => {
        const { bomResult } = await renderCommon(mainPath + 'script7.cst', {
            generateBom: true,
            bomConfig: {
                columns: ['refdes', 'value', 'footprint'],
                group_by: ['value', 'footprint'],
                only_placed: onlyPlaced,
            },
        });
        const refdes = JSON.stringify(bomResult!.bom);
        expect(refdes).not.toContain('R2');
        expect(bomResult!.unplacedItems).not.toContain('R2');
        expect(bomResult!.unplacedItems.includes('R3')).toBe(onlyPlaced);
        expect(refdes).toContain('R1');
        expect(refdes.includes('R3')).toBe(!onlyPlaced);
    });

    const qtyBase = { columns: ['refdes', 'qty', 'mpn', 'manufacturer'], group_by: ['mpn', 'manufacturer'] };

    test('qty column counts grouped items', async () => {
        const { bomCsvOutput } = await renderCommon(mainPath + 'script1.cst', {
            generateBom: true, bomConfig: qtyBase,
        });
        expect(bomCsvOutput[0]).toEqual(['Refdes', 'Qty', 'Mpn', 'Manufacturer']);
        expectJsonOutput(JSON.stringify(bomCsvOutput), `${mainPath}expected/script1_qty.cst.json`);
    });

    test('display_name_qty overrides qty header', async () => {
        const { bomCsvOutput } = await renderCommon(mainPath + 'script1.cst', {
            generateBom: true, bomConfig: { ...qtyBase, display_name_qty: 'Quantity' },
        });
        expect(bomCsvOutput[0]).toEqual(['Refdes', 'Quantity', 'Mpn', 'Manufacturer']);
    });

    test('qty as last column has no missing values', async () => {
        const { bomCsvOutput, bomResult } = await renderCommon(mainPath + 'script1.cst', {
            generateBom: true,
            bomConfig: { columns: ['refdes', 'mpn', 'manufacturer', 'qty'], group_by: ['mpn', 'manufacturer'] },
        });
        expect(bomCsvOutput[0]).toEqual(['Refdes', 'Mpn', 'Manufacturer', 'Qty']);
        expect([...bomResult!.missingValues.keys()].join()).not.toContain('qty');
    });

    test('display_name_refdes overrides refdes header only', async () => {
        const base = { columns: ['refdes', 'mpn', 'manufacturer'], group_by: ['mpn', 'manufacturer'] };
        const plain = await renderCommon(mainPath + 'script1.cst', { generateBom: true, bomConfig: base });
        const named = await renderCommon(mainPath + 'script1.cst', {
            generateBom: true, bomConfig: { ...base, display_name_refdes: 'Reference' },
        });
        expect(named.bomCsvOutput[0]).toEqual(['Reference', 'Mpn', 'Manufacturer']);
        expect(named.bomCsvOutput.slice(1)).toEqual(plain.bomCsvOutput.slice(1));
    });

    test('both display names keep grouping and refdes cells', async () => {
        const plain = await renderCommon(mainPath + 'script1.cst', { generateBom: true, bomConfig: qtyBase });
        const named = await renderCommon(mainPath + 'script1.cst', {
            generateBom: true,
            bomConfig: { ...qtyBase, display_name_qty: 'Quantity', display_name_refdes: 'Reference' },
        });
        expect(named.bomCsvOutput[0]).toEqual(['Reference', 'Quantity', 'Mpn', 'Manufacturer']);
        expect(named.bomCsvOutput.slice(1)).toEqual(plain.bomCsvOutput.slice(1));
        expect(named.bomCsvOutput.map(r => r[0])).toContain('R2, R3');
    });

    test.each([
        ['display_name_qty', ''],
        ['display_name_qty', 5],
        ['display_name_refdes', ''],
        ['display_name_refdes', 5],
    ])('invalid %s (%p) throws', async (key, value) => {
        await expect(renderCommon(mainPath + 'script1.cst', {
            generateBom: true,
            bomConfig: { ...qtyBase, [key]: value } as any,
        })).rejects.toThrow(RuntimeExecutionError);
    });

});