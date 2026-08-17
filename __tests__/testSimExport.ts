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

    test('computed net namespace produces three distinct nets per loop iteration', async () => {
        const scriptPath = 'script2.cst';
        const outputPath = `${mainPath}${scriptPath}.cir`;
        outputPaths.push(outputPath);
        const generated = await renderSimNetList(
            mainPath + scriptPath,
            outputPath,
        );

        // Each iteration's SIG net must be distinct and namespaced, not
        // collapsed onto a single shared/undefined net.
        expect(generated).toContain('ch0/SIG');
        expect(generated).toContain('ch1/SIG');
        expect(generated).toContain('ch2/SIG');
        expect(generated).not.toContain('undefined');

        // Each iteration's resistor pair should only ever connect to its
        // own namespace's nets, never to another iteration's.
        expect(generated).toContain('R2_1_1 ch0/NET__R1_1_1_2_ ch0/SIG 0');
        expect(generated).toContain('R2_2_1 ch1/NET__R1_2_1_2_ ch1/SIG 0');
        expect(generated).toContain('R2_3_1 ch2/NET__R1_3_1_2_ ch2/SIG 0');
    });
});
