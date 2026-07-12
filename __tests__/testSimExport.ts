import { readFileSync, existsSync, rmSync } from 'fs';
import { renderSimNetList } from './helpers';

const mainPath = '__tests__/testData/simData/';

describe('ngspice netlist generation', () => {
    const outputPaths: string[] = [];

    afterEach(() => {
        for (const p of outputPaths.splice(0)) {
            if (existsSync(p)) rmSync(p);
        }
    });

    test.each([['script1', 'script1.cst']])(
        'script - %s (%s)',
        async (title, scriptPath) => {
            const outputPath = `${mainPath}${scriptPath}.cir`;
            outputPaths.push(outputPath);
            const generated = await renderSimNetList(
                mainPath + scriptPath,
                outputPath,
            );
            const expected = readFileSync(
                `${mainPath}expected/${scriptPath}.cir`,
                { encoding: 'utf8' },
            );
            expect(generated).toEqual(expected);
        },
    );
});
