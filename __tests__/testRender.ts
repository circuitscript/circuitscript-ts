import { createReadStream, createWriteStream, existsSync, mkdirSync, readFileSync, 
    unlinkSync, writeFileSync } from 'fs';
import PDFDocument from "pdfkit";
import crypto from 'crypto';

import { generatePdfOutput, generateSvgOutput, renderSheetsToSVG } from "../src/render/render.js";
import { compareSvgToFile, orderNets, parseNets, renderCommon, runScript, runScriptExpectError } from "./helpers.js";
import { PNG } from 'pngjs';
import { defaultZoomScale } from '../src/globals.js';
import { Logger } from '../src/logger.js';
import { getStylesFromDocument } from '../src/styles.js';

const mainPath = '__tests__/testData/renderData/';

describe('Render tests', () => {

    test.each([
        ['script1.cst', 'variant and branch rendering'],
        ['script2.cst', 'simple function'],
        ['script3.cst', 'simple frame'],
        ['script4.cst', 'drawing functions for graphics'],
        ['script5.cst', 'drawing 180 deg flipped components'],
        ['script6.cst', 'join command'],
        ['script7.cst', 'parallel command'],
        ['script8.cst', 'point block command'],
        ['script9.cst', 'start immediately with `add component` command'],
        ['script10.cst', 'start immediately with `wire` command'],
        ['script11.cst', 'flipX and flipY parameters'],
        ['script12.cst', 'flipX, flipY, angle parameters with multiple components'],
        ['script13.cst', 'anchor modifier'],

        ['script14.cst', 'text graphic expression'],
        ['script15.cst', 'component follows wire orientation'],
        ['script16.cst', 'component with defined pin follows wire orientation'],
        ['script17.cst', 'component with arc graphic expr'],

        // Check that the correct pin positions are generated for
        // custom drawn symbols
        ['script18.cst', 'symbol custom with pin position'],

        ['script19.cst', 'ports (in, out, io, any)'],

        ['script20.cst', 'module with ports'],

        ['script21.cst', 'decimal places causing issues with junctions and layout'],

        ['script22.cst', 'catch repeated nodes in the origin nodes list'],

        ['script23.cst', 'multiple sheet commands'],
        ['script24.cst', 'single sheet command'],
        ['script25.cst', 'test blank spaces at start and end in symbol custom'],

        ['script26.cst', 'for command in graphics expr'],
        ['script27.cst', 'label angle check'],
        ['script28.cst', 'component width and height prop'],

        ['script29.cst', 'frame direction arrange row to next line'],
        ['script30.cst', 'frame direction arrange column to next line'],

        ['script31.cst', 'branch within function'],

        ['script32.cst', 'complex wire merging and intersections'],
        ['script33.cst', 'maintain current component through multiple branch levels'],
        
        ['script34.cst', 'node1--node2 and node2--node1 should not be the same'],
        ['script35.cst', 'pin_only=true hides pin id and name (equivalent to display_id=false, display_name=false)'],
        
        ['script36.cst', 'data expression parsing in pin selection'],
        ['script37.cst', 'rendering circle in symbol'],
        ['script38.cst', 'net graphical properties, multi net component references same net'],
        ['script39.cst', 'Path blocks nested within for loop'],
        ['script40.cst', 'Test correct graph when `at` block contains `point` path block'],
        ['script41.cst', 'string and number Pin Ids for create component'],
        ['script42.cst', 'extract PinIds from create component `display` prop'],
        ['script43.cst', 'do not move non-copy component in frame'],
        
        // Refdes generation related
        ['script44.cst', 'refdes within for and while loop'],
        ['script45.cst', 'refdes within functions'],
        ['script46.cst', 'refdes in at blocks'],
        ['script48.cst', 'refdes number for repeated function calls'],

        // Refdes annotation parsing
        ['script47.cst', 'refdes annotation parsing: script44.cst with changed refdes and annotations'],
        ['script49.cst', 'refdes annotation parsing: script45.cst with changed refdes and annotations'],
        ['script50.cst', 'refdes annotation parsing: script46.cst with changed refdes and annotations'],
        ['script51.cst', 'refdes annotation parsing: script48.cst with changed refdes and annotations'],
        ['script52.cst', 'refdes annotation parsing with repeated annotations'],

        // import syntax forms
        ['script53.cst', 'import syntax forms'],
        ['script54.cst', 'repeated specific imports'],
        ['script55.cst', 'specific imports followed by wildcard import'],

        // multi-unit components
        ['script56.cst', 'multi-unit component'],
        ['script57.cst', 'multi-unit component with pins expansion'],
        ['script58.cst', 'multi-unit component with arrange property'],

        // multi-file schematic with refdes loaded from external file
        ['script59/main.cst', 'multi file refdes with refdes from external file', 'script59'],

        ['script60.cst', 'grid style none'],
        ['script61.cst', 'grid color red'],

        ['script62.cst', 'label net color and properties'],
        ['script63.cst', 'document background color, line color and line width'],

        ['script64.cst', 'proper exit of path block levels'],

        // frame title alignment
        ['script65.cst', 'title alignment parameter in frame'],

        // frame alignment options for single and multi lines
        ['script66.cst', 'frame row direction alignment options, single line'],
        ['script67.cst', 'frame column direction alignment options, single line'],
        ['script68.cst', 'frame row direction alignment options, multi line'],
        ['script69.cst', 'frame column direction alignment options, multi line'],

        // wire direction after branch statement
        ['script70.cst', 'wire direction after branch and parallel statements'],

        ['script71.cst', 'single line expressions in at block'],

        ['script72.cst', 'nested point path block'],

        ['script73.cst', 'blank frames or sheets are still accepted'],
        ['script74.cst', 'title color, bold and italic font style'],
        ['script75.cst', 'different path block join styles'],
        ['script76.cst', 'flip:y works properly with wire direction.'],
        ['script77.cst', 'wire expression with different direction symbols'],
        ['script78.cst', 'Pin selection using pin name'],
        ['script79.cst', 'correct label text alignment (anchor, vanchor) for different angles and flipxy'],
        ['script80.cst', 'brackets in properties and drawing commands are handled properly'],
        ['script81.cst', 'double dot syntax works for assignment'],
        ['script82.cst', 'netclass properties set via double dot syntax after creation'],
        ['script83.cst', 'pin type short-forms normalize to canonical forms'],
        ['script84.cst', 'all std.cst components rendered'],
        ['script85.cst', 'Pin order declaration does not affect the next pin selected'],
        ['script86.cst', 'Multiple pin ids/keys in the at command block.'],
        ['script87.cst', 'Multiple keys in the create components pins assignment.'],
        ['script88.cst', 'String literal syntax for points'],
        ['script89.cst', 'Graphical path commands for m and l'],
        ['script90.cst', 'Bus creation and nets linking through buses'],
        ['script91.cst', 'multiple buses'],
        ['script92.cst', 'Custom symbol with stroke and fill color for light/dark mode'],
        ['script93.cst', 'multi-line text with newlines and blank-space lines renders correctly (regression)'],
        ['script94.cst', 'named var= custom color hooks, alongside a plain dark= only color'],

        ['script98.cst',  'arrange entries reference pins by name on all four sides'],
        ['script99.cst',  'arrange list mixes pin ids, pin names and blank slots'],
        ['script100.cst', 'pin referenced by both id and name is de-duplicated'],

    ])('render - %s (%s)', async (scriptPath, title, extra = "") => {
        const { sheetFrames, documentVariable, componentPinNets } = await renderCommon(mainPath + scriptPath);

        const styles = getStylesFromDocument(documentVariable);
        const svgCanvas = renderSheetsToSVG(sheetFrames, new Logger(), documentVariable, styles);
        const svgOutput = generateSvgOutput(svgCanvas, defaultZoomScale);

        let useSvgPath = scriptPath;
        if (extra !== ""){
            useSvgPath = extra;
        }

        const netFileBase = useSvgPath.endsWith('.cst') ? useSvgPath.slice(0, -'.cst'.length) : useSvgPath;
        const expectedNets = parseNets(
            readFileSync(mainPath + "nets/" + netFileBase + ".cst.net", { encoding: 'utf8' }));
        expect(orderNets(componentPinNets)).toStrictEqual(orderNets(expectedNets));

        const expectedSvgOutput = readFileSync(mainPath + "svgs/" + useSvgPath + ".svg", { encoding: 'utf8' });
        const doPixelCheck = false;

        if (doPixelCheck && svgOutput !== expectedSvgOutput){
            const expectedSvgPath = `${mainPath}svgs/${useSvgPath}.svg`;
            console.log("run manual pixel check: " + useSvgPath);
            const pixCompare = compareSvgToFile(expectedSvgPath, svgOutput);

            // const outputDiff = pixCompare.diffPng;
            // writeFileSync(`${expectedSvgPath}-diff.png`, outputDiff);
            // writeFileSync(`${expectedSvgPath}-img1.png`, PNG.sync.write(pixCompare.img1));
            // writeFileSync(`${expectedSvgPath}-img2.png`, PNG.sync.write(pixCompare.img2));

            expect(pixCompare.numDiffPixels >= 0 && pixCompare.numDiffPixels < 10).toBe(true);
        } else {
            expect(svgOutput).toEqual(expectedSvgOutput);
            
            // Do not spit out all the differences
            expect(svgOutput === expectedSvgOutput).toEqual(true);
        }
    });

    test('pdf output', async () => {
        const scriptPath = 'script1.cst';
        
        const targetFolder = mainPath + "pdfs/";
        const targetPdf = targetFolder + scriptPath + ".pdf";

        if (!existsSync(targetFolder)){
            mkdirSync(targetFolder);
        }

        // Remove the original file first
        if (existsSync(targetPdf)) {
            unlinkSync(targetPdf);
        }

        // First, generate the PDF
        const { sheetFrames, documentVariable } = await renderCommon(mainPath + scriptPath);

        const documentStyles = getStylesFromDocument(documentVariable);
        const svgCanvas = renderSheetsToSVG(sheetFrames, new Logger(), documentVariable, documentStyles);

        // Full ISO time string is given, because the CI server might
        // have a different timezone
        const useDate = new Date("2024-10-31T16:00:00.000Z");

        const sheetSize = "A4";
        const doc = new PDFDocument({
            layout: 'landscape',
            size: sheetSize,
            info: {
                CreationDate: useDate,
            }
        });

        generatePdfOutput(doc, svgCanvas, sheetSize, false, documentStyles, 1);
        const outputStream = createWriteStream(targetPdf);
        doc.pipe(outputStream);
        doc.end();

        // Wait for stream to finish
        await new Promise(resolve => {
            outputStream.on('finish', () => {
                resolve();
            });
        });

        expect(existsSync(targetPdf)).toEqual(true);

        // Done creating PDF, now generate the md5 hash for comparison
        const hash = crypto.createHash('md5');
        hash.setEncoding('hex');

        const result = await new Promise(resolve => {
            const fd = createReadStream(targetPdf);

            fd.on('end', () => {
                hash.end();
                resolve(hash.read());
            });

            fd.pipe(hash);
        });

        // Use file hash to verify that files are the same.
        expect(result).toEqual('08998adfaedf1ea9ae6e29bb8953c49b');
    });

    test('text newline handling - svg height regression', async () => {
        const scriptPath = 'script93.cst';

        const { sheetFrames, documentVariable } = await renderCommon(mainPath + scriptPath);
        const styles = getStylesFromDocument(documentVariable);
        const svgCanvas = renderSheetsToSVG(sheetFrames, new Logger(), documentVariable, styles);
        const svgOutput = generateSvgOutput(svgCanvas, defaultZoomScale);

        const widthMatch = svgOutput.match(/width="([\d.]+)"/);
        const heightMatch = svgOutput.match(/height="([\d.]+)"/);

        expect(widthMatch).not.toBeNull();
        expect(heightMatch).not.toBeNull();

        const width = Number(widthMatch![1]);
        const height = Number(heightMatch![1]);

        // Values captured once the multi-line text height regression (`.plain()` not
        // measuring `\n`-separated lines) is fixed. A height regression that collapses
        // the 6-line text block back down will fail this bound.
        expect(width).toBeCloseTo(335.9776364, 1);
        expect(height).toBeCloseTo(265.062356717, 1);
    });

    test('var= custom color compiles to var(--cs-<name>) with a :root declaration', async () => {
        const scriptPath = 'script94.cst';

        const { sheetFrames, documentVariable } = await renderCommon(mainPath + scriptPath);
        const styles = getStylesFromDocument(documentVariable);
        const svgCanvas = renderSheetsToSVG(sheetFrames, new Logger(), documentVariable, styles);
        const svgOutput = generateSvgOutput(svgCanvas, defaultZoomScale);

        expect(svgOutput).toContain('var(--cs-my-line)');
        expect(svgOutput).toContain('--cs-my-line:light-dark(blue, red);');

        expect(svgOutput).toContain('var(--cs-my-text)');
        expect(svgOutput).toContain('--cs-my-text:light-dark(purple, pink);');

        // fill uses dark= only (no var=) - stays an inline light-dark(), unchanged
        expect(svgOutput).toContain('light-dark(green, orange)');
        expect(svgOutput).not.toContain('--cs-my-fill');
    });

    // PDF-safe color resolution (no light-dark()/var() surviving into the
    // PDF-bound SVG) is covered separately in testRenderPdfColors.ts, which
    // mocks svg-to-pdfkit to inspect the string handed to it - doing that
    // here would break this file's 'pdf output' MD5 hash test below.

    test('the old bare two-positional-value color syntax throws a clear error', async () => {
        const scriptPath = 'script95.cst';

        await expect(renderCommon(mainPath + scriptPath)).rejects.toThrow();
    });

    test('var= colliding with a built-in theme variable name throws', async () => {
        const scriptPath = 'script96.cst';

        const { sheetFrames, documentVariable } = await renderCommon(mainPath + scriptPath);
        const styles = getStylesFromDocument(documentVariable);

        expect(() => renderSheetsToSVG(sheetFrames, new Logger(), documentVariable, styles)).toThrow();
    });

    test('arrange entries resolved cleanly by name emit no arrange warnings', async () => {
        const scriptPath = mainPath + 'script98.cst';
        const { hasError, visitor } = await runScript(
            readFileSync(scriptPath, { encoding: 'utf8' }), scriptPath);

        expect(hasError).toEqual(false);

        const messages = visitor.getWarnings().map(warning => warning.message);
        expect(messages).not.toContainEqual(
            expect.stringMatching(/arrange property/));
        expect(messages).not.toContainEqual(
            expect.stringMatching(/does not match pin definition/));
    });

    test('arrange entry matching no pin id or name throws', async () => {
        const scriptPath = mainPath + 'script101.cst';
        const message = await runScriptExpectError(
            readFileSync(scriptPath, { encoding: 'utf8' }));

        expect(message).toContain('Could not find pin MISSING');
    });

    test('pin referenced by both id and name warns as a duplicate', async () => {
        const scriptPath = mainPath + 'script100.cst';
        const { hasError, visitor } = await runScript(
            readFileSync(scriptPath, { encoding: 'utf8' }), scriptPath);

        expect(hasError).toEqual(false);

        const messages = visitor.getWarnings().map(warning => warning.message);
        expect(messages).toContainEqual(
            expect.stringContaining('specified more than once in arrange property'));
    });

    test('unknown frame property name warns instead of being silently dropped', async () => {
        const scriptPath = mainPath + 'script102.cst';
        const { hasError, visitor } = await runScript(
            readFileSync(scriptPath, { encoding: 'utf8' }), scriptPath);

        expect(hasError).toEqual(false);

        const messages = visitor.getWarnings().map(warning => warning.message);
        expect(messages).toContainEqual(
            expect.stringContaining('Unknown frame property "..widht"'));
        expect(messages).toContainEqual(
            expect.stringContaining('Unknown frame property "..dirction"'));
    });

    test.each(['script3.cst', 'script23.cst'])(
        'valid frame/sheet property names do not warn (%s)', async (fixture) => {
        const scriptPath = mainPath + fixture;
        const { hasError, visitor } = await runScript(
            readFileSync(scriptPath, { encoding: 'utf8' }), scriptPath);

        expect(hasError).toEqual(false);

        const messages = visitor.getWarnings().map(warning => warning.message);
        expect(messages).not.toContainEqual(
            expect.stringMatching(/Unknown frame property/));
    });
});
