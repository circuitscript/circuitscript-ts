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

    function extractFrames(html: string): any[] {
        const match = html.match(/window\.__CS_FRAMES__ = (\[.*?\]);/s);
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

        // sourceLine/sourceFile should point at the `add res(10k) ..angle = 90`
        // statement in script1.cst (line 10), which first adds this resistor to
        // the graph -- not at res()'s definition in libs/std.cst.
        expect(resistor.sourceLine).toBe(10);
        expect(resistor.sourceFile).toContain('script1.cst');
        expect(resistor.sourceFile).not.toContain('std.cst');

        for (const component of components) {
            expect(result.outputReturn).toContain(`id="${component.domId}"`);
        }
    });

    test("'data-svg' componentMeta reports distinct sourceLine per copyProp clone", async () => {
        const scriptData = `from "std" import *

n = net("5V")
add n
wire right 100
to n
wire right 100
to dgnd()
`;
        const environment = getTestEnvironment();
        await environment.prepareSVGEnvironment();

        const result = await renderScript(scriptData, [], {
            dumpNets: false,
            dumpData: false,
            showStats: false,
            environment,
            inputPath: 'scratch.cst',
            outputReturnType: 'data-svg',
        });

        expect(result.errors.length).toBe(0);
        const components = result.outputExtra! as any[];

        const netInstances = components.filter((c: any) =>
            c.params.some((p: any) => p.key === 'net_name' && p.value === '5V'));
        expect(netInstances.length).toBe(2);

        // `n` is used twice (`add n` then `to n`); since net() has `copy: true`,
        // the second usage clones the component. Each clone should report the
        // sourceLine of its own add/to statement, not both pointing at the same
        // line and not silently keeping the first clone's stamped value.
        const lines = netInstances.map((c: any) => c.sourceLine).sort((a: number, b: number) => a - b);
        expect(lines).toEqual([4, 6]);
        for (const instance of netInstances) {
            expect(instance.sourceFile).toContain('scratch.cst');
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

    test('window.__CS_FRAMES__ describes titled frames, tagged in the SVG, excluding sheet/untitled frames', async () => {
        const framePath = `${renderPath}frameMetadata.cst`;
        const scriptData = readFileSync(`${framePath}`, { encoding: 'utf8' });
        const environment = getTestEnvironment();
        await environment.prepareSVGEnvironment();

        const frameOutputPath = `${framePath}.html`;
        try {
            const result = await renderScript(scriptData, [frameOutputPath], {
                dumpNets: false,
                dumpData: false,
                showStats: false,
                environment,
                inputPath: framePath,
            });

            expect(result.errors.length).toBe(0);
            expect(existsSync(frameOutputPath)).toBe(true);

            const html = readFileSync(frameOutputPath, { encoding: 'utf8' });
            const frames = extractFrames(html);

            // Only the one titled `frame:` block should be present.
            expect(frames.length).toBe(1);

            const frame = frames[0];
            expect(frame.title).toBe('Titled Frame');
            expect(frame.sourceLine).not.toBeNull();
            expect(frame.sourceFile).toContain('frameMetadata.cst');
            expect(frame.bounds).not.toBeNull();
            expect(frame.bounds.width).toBeGreaterThan(0);
            expect(frame.bounds.height).toBeGreaterThan(0);

            expect(html).toContain(`id="${frame.domId}"`);
            const groupMatch = html.match(new RegExp(`<[a-zA-Z]+[^>]*id="${frame.domId}"[^>]*>`));
            expect(groupMatch).not.toBeNull();
            expect(groupMatch![0]).toContain('cs-frame-title');

            // Regression guards: the untitled `frame:` block, the titled
            // `sheet:` block (out of scope for this plan), and any
            // synthetic/base frame must not appear in the metadata.
            const titles = frames.map((f: any) => f.title);
            expect(titles).not.toContain('Titled Sheet');
            expect(titles.length).toBe(1);
        } finally {
            if (existsSync(frameOutputPath)) {
                unlinkSync(frameOutputPath);
            }
        }
    });

    test("'data-svg' returns frameMeta via frameExtra alongside outputExtra", async () => {
        const framePath = `${renderPath}frameMetadata.cst`;
        const scriptData = readFileSync(framePath, { encoding: 'utf8' });
        const environment = getTestEnvironment();
        await environment.prepareSVGEnvironment();

        const result = await renderScript(scriptData, [], {
            dumpNets: false,
            dumpData: false,
            showStats: false,
            environment,
            inputPath: framePath,
            outputReturnType: 'data-svg',
        });

        expect(result.errors.length).toBe(0);
        expect(Array.isArray(result.frameExtra)).toBe(true);
        const frames = result.frameExtra!;
        expect(frames.length).toBe(1);
        expect(frames[0].title).toBe('Titled Frame');
        expect(frames[0].bounds).not.toBeNull();

        for (const frame of frames) {
            expect(result.outputReturn).toContain(`id="${frame.domId}"`);
        }
    });
});
