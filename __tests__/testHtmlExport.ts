import { readFileSync, existsSync, unlinkSync } from 'fs';
import { renderScript } from '../src/pipeline.js';
import { getTestEnvironment } from './helpers';

const renderPath = '__tests__/testData/renderData/';

describe('interactive HTML viewer output', () => {
    const outputPath = `${renderPath}script1.cst.html`;
    const svgOutputPath = `${renderPath}script1.cst.svg`;

    afterEach(() => {
        if (existsSync(outputPath)) {
            unlinkSync(outputPath);
        }
        if (existsSync(svgOutputPath)) {
            unlinkSync(svgOutputPath);
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

        // With an explicit .html output path and the default outputReturnType
        // ('svg'), the base SVG pass never runs (no .svg/.pdf path requested,
        // and outputPaths is non-empty), so outputReturn stays "". The .html
        // file on disk (checked above) still has the correct interactive
        // HTML — outputReturn and outputPaths are independent knobs.
        expect(result.outputReturn).toBe('');
        expect(result.outputExtra).toBeNull();
    });

    test('returns HTML string via outputReturn when outputReturnType is html and no output paths given', async () => {
        const scriptData = readFileSync(`${renderPath}script1.cst`, { encoding: 'utf8' });
        const environment = getTestEnvironment();
        await environment.prepareSVGEnvironment();

        const result = await renderScript(scriptData, [], {
            dumpNets: false,
            dumpData: false,
            showStats: false,
            environment,
            inputPath: `${renderPath}script1.cst`,
            outputReturnType: 'html',
        });

        expect(result.errors.length).toBe(0);
        expect(result.outputReturn.length).toBeGreaterThan(0);
        expect(result.outputReturn).toContain('window.__CS_COMPONENTS__');
        expect(result.outputReturn).toContain('<svg');
        expect(result.outputExtra).toBeNull();
    });

    test('returns HTML string via outputReturn when outputPaths only contains a handler-consumed path', async () => {
        const scriptData = readFileSync(`${renderPath}script1.cst`, { encoding: 'utf8' });
        const environment = getTestEnvironment();
        await environment.prepareSVGEnvironment();

        const kicadPath = `${renderPath}script1.cst.kicad_sch`;
        try {
            const result = await renderScript(scriptData, [kicadPath], {
                dumpNets: false,
                dumpData: false,
                showStats: false,
                environment,
                inputPath: `${renderPath}script1.cst`,
                outputReturnType: 'html',
            });

            expect(result.errors.length).toBe(0);
            expect(result.outputReturn.length).toBeGreaterThan(0);
            expect(result.outputReturn).toContain('window.__CS_COMPONENTS__');
            expect(result.outputReturn).toContain('<svg');
            expect(result.outputExtra).toBeNull();
        } finally {
            if (existsSync(kicadPath)) {
                unlinkSync(kicadPath);
            }
        }
    });

    test('returns SVG string via outputReturn by default when no output paths given', async () => {
        const scriptData = readFileSync(`${renderPath}script1.cst`, { encoding: 'utf8' });
        const environment = getTestEnvironment();
        await environment.prepareSVGEnvironment();

        const result = await renderScript(scriptData, [], {
            dumpNets: false,
            dumpData: false,
            showStats: false,
            environment,
            inputPath: `${renderPath}script1.cst`,
        });

        expect(result.errors.length).toBe(0);
        expect(result.outputReturn.length).toBeGreaterThan(0);
        expect(result.outputReturn.trimStart()).toMatch(/^<svg/);
        expect(result.outputReturn).not.toContain('window.__CS_COMPONENTS__');
        expect(result.outputExtra).toBeNull();
    });

    test("'data-svg' returns interactive SVG string and componentMeta via outputExtra", async () => {
        const scriptData = readFileSync(`${renderPath}script1.cst`, { encoding: 'utf8' });
        const environment = getTestEnvironment();
        await environment.prepareSVGEnvironment();

        const result = await renderScript(scriptData, [], {
            dumpNets: false,
            dumpData: false,
            showStats: false,
            environment,
            inputPath: `${renderPath}script1.cst`,
            outputReturnType: 'data-svg',
        });

        expect(result.errors.length).toBe(0);
        expect(result.outputReturn.trimStart()).toMatch(/^<svg/);
        expect(result.outputReturn).not.toContain('<!DOCTYPE html>');
        expect(result.outputReturn).not.toContain('window.__CS_COMPONENTS__');
        expect(result.outputReturn).toContain('cs-component');

        expect(Array.isArray(result.outputExtra)).toBe(true);
        const components = result.outputExtra!;
        expect(components.length).toBeGreaterThan(0);

        const resistor = components.find((c: any) =>
            c.params.some((p: any) => p.key === 'value' && p.value === '10k'));
        expect(resistor).toBeDefined();
        expect(resistor.pins.length).toBe(2);

        for (const component of components) {
            expect(result.outputReturn).toContain(`id="${component.domId}"`);
        }
    });

    test("'data-svg' with a handler-consumed-only output path still returns componentMeta", async () => {
        const scriptData = readFileSync(`${renderPath}script1.cst`, { encoding: 'utf8' });
        const environment = getTestEnvironment();
        await environment.prepareSVGEnvironment();

        const kicadPath = `${renderPath}script1.cst.kicad_sch`;
        try {
            const result = await renderScript(scriptData, [kicadPath], {
                dumpNets: false,
                dumpData: false,
                showStats: false,
                environment,
                inputPath: `${renderPath}script1.cst`,
                outputReturnType: 'data-svg',
            });

            expect(result.errors.length).toBe(0);
            expect(result.outputReturn.length).toBeGreaterThan(0);
            expect(result.outputReturn.trimStart()).toMatch(/^<svg/);
            expect(result.outputReturn).not.toContain('<!DOCTYPE html>');
            expect(result.outputReturn).not.toContain('window.__CS_COMPONENTS__');
            expect(Array.isArray(result.outputExtra)).toBe(true);
            expect(result.outputExtra!.length).toBeGreaterThan(0);
        } finally {
            if (existsSync(kicadPath)) {
                unlinkSync(kicadPath);
            }
        }
    });

    test("'data-svg' alongside a real .svg output path returns both correctly", async () => {
        const scriptData = readFileSync(`${renderPath}script1.cst`, { encoding: 'utf8' });
        const environment = getTestEnvironment();
        await environment.prepareSVGEnvironment();

        const result = await renderScript(scriptData, [svgOutputPath], {
            dumpNets: false,
            dumpData: false,
            showStats: false,
            environment,
            inputPath: `${renderPath}script1.cst`,
            outputReturnType: 'data-svg',
        });

        expect(result.errors.length).toBe(0);
        expect(existsSync(svgOutputPath)).toBe(true);

        const baseSvg = readFileSync(svgOutputPath, { encoding: 'utf8' });
        expect(baseSvg.trimStart()).toMatch(/^<svg/);

        expect(result.outputReturn.trimStart()).toMatch(/^<svg/);
        expect(result.outputReturn).toContain('cs-component');
        expect(Array.isArray(result.outputExtra)).toBe(true);
        expect(result.outputExtra!.length).toBeGreaterThan(0);
    });

    test('returns empty outputReturn when errors occur before rendering', async () => {
        const environment = getTestEnvironment();
        await environment.prepareSVGEnvironment();

        const invalidScriptPath = '__tests__/testData/cliTest/syntaxError.cst';
        const invalidScript = readFileSync(invalidScriptPath, { encoding: 'utf8' });

        const svgResult = await renderScript(invalidScript, [], {
            dumpNets: false,
            dumpData: false,
            showStats: false,
            environment,
            inputPath: invalidScriptPath,
        });
        expect(svgResult.errors.length).toBeGreaterThan(0);
        expect(svgResult.outputReturn).toBe('');
        expect(svgResult.outputExtra).toBeNull();

        const htmlResult = await renderScript(invalidScript, [], {
            dumpNets: false,
            dumpData: false,
            showStats: false,
            environment,
            inputPath: invalidScriptPath,
            outputReturnType: 'html',
        });
        expect(htmlResult.errors.length).toBeGreaterThan(0);
        expect(htmlResult.outputReturn).toBe('');
        expect(htmlResult.outputExtra).toBeNull();

        const dataSvgResult = await renderScript(invalidScript, [], {
            dumpNets: false,
            dumpData: false,
            showStats: false,
            environment,
            inputPath: invalidScriptPath,
            outputReturnType: 'data-svg',
        });
        expect(dataSvgResult.errors.length).toBeGreaterThan(0);
        expect(dataSvgResult.outputReturn).toBe('');
        expect(dataSvgResult.outputExtra).toBeNull();
    });
});
