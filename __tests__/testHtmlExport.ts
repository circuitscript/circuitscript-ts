import { readFileSync, existsSync, unlinkSync } from 'fs';
import { renderScript } from '../src/pipeline.js';
import { getTestEnvironment } from './helpers';

const renderPath = '__tests__/testData/renderData/';

describe('interactive HTML viewer output', () => {
    const outputPath = `${renderPath}script1.cst.html`;

    afterEach(() => {
        if (existsSync(outputPath)) {
            unlinkSync(outputPath);
        }
    });

    function extractComponents(html: string): any[] {
        const match = html.match(/window\.__CS_COMPONENTS__ = (\[.*?\]);/s);
        expect(match).not.toBeNull();
        return JSON.parse(match![1]);
    }

    test('generates a well-formed standalone HTML file', async () => {
        const scriptData = readFileSync(`${renderPath}script1.cst`, { encoding: 'utf8' });
        const environment = getTestEnvironment();
        await environment.prepareSVGEnvironment();

        const result = await renderScript(scriptData, [outputPath], {
            dumpNets: false,
            dumpData: false,
            showStats: false,
            environment,
            inputPath: `${renderPath}script1.cst`,
        });

        expect(result.errors.length).toBe(0);
        expect(existsSync(outputPath)).toBe(true);

        const html = readFileSync(outputPath, { encoding: 'utf8' });

        expect(html).toContain('<!DOCTYPE html>');
        expect(html).toContain('<svg');
        expect(html).toContain('window.__CS_COMPONENTS__ = ');

        const components = extractComponents(html);
        expect(components.length).toBeGreaterThan(0);

        const resistor = components.find((c: any) =>
            c.params.some((p: any) => p.key === 'value' && p.value === '10k'));
        expect(resistor).toBeDefined();
        expect(resistor.pins.length).toBe(2);

        for (const component of components) {
            expect(html).toContain(`id="${component.domId}"`);
            const groupMatch = html.match(
                new RegExp(`<g[^>]*id="${component.domId}"[^>]*>`));
            expect(groupMatch).not.toBeNull();
            expect(groupMatch![0]).toContain('cs-component');
        }
    });
});
