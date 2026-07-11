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

});