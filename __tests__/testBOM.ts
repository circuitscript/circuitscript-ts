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
    ])('script - %s (%s)', async (title, scriptPath, bomConfig) => {
        const { bomCsvOutput } = await renderCommon(mainPath + scriptPath, {
            generateBom: true,
            bomConfig,
        });

        const jsonString = JSON.stringify(bomCsvOutput);
        expectJsonOutput(jsonString, `${mainPath}expected/${scriptPath}.json`);
    });

});