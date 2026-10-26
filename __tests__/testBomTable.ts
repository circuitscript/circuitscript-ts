import { existsSync, readFileSync } from 'fs';
import { getTestEnvironment } from './helpers';
import { renderScriptCustom } from '../src/pipeline.js';

const scriptPath = '__tests__/testData/bomData/script1.cst';
const unplacedPath = '__tests__/testData/bomData/script3.cst';

async function renderBom(path: string, bomOutputPath?: string) {
    const environment = getTestEnvironment();
    await environment.prepareSVGEnvironment();
    return renderScriptCustom(readFileSync(path, { encoding: 'utf8' }), [], {
        dumpNets: false,
        dumpData: false,
        showStats: false,
        environment,
        inputPath: path,
        enableBom: true,
        bomOutputPath,
    }, [], []);
}

describe('BOM table return', () => {
    test('returns header and rows without writing a file', async () => {
        const outPath = `${scriptPath}.bom-test.csv`;
        const result = await renderBom(scriptPath);

        expect(result.errors).toHaveLength(0);
        const table = result.bomTable!;
        expect(table[0]).toEqual(['Refdes', 'Value', 'Mpn', 'Manufacturer', 'Footprint']);
        expect(table.length).toBeGreaterThan(1);
        table.forEach(row => {
            expect(row).toHaveLength(table[0].length);
            row.forEach(cell => expect(typeof cell).toBe('string'));
        });
        expect(result.bomWarnings).toBeDefined();
        expect(existsSync(outPath)).toBe(false);
    });

    test('reports unplaced items in warnings', async () => {
        const result = await renderBom(unplacedPath);
        expect(result.bomWarnings!.unplacedItems).toContain('R3');
    });

    test('bomTable is undefined when enableBom is off', async () => {
        const environment = getTestEnvironment();
        await environment.prepareSVGEnvironment();
        const result = await renderScriptCustom(
            readFileSync(scriptPath, { encoding: 'utf8' }), [], {
                dumpNets: false, dumpData: false, showStats: false,
                environment, inputPath: scriptPath,
            }, [], []);
        expect(result.bomTable).toBeUndefined();
    });
});
