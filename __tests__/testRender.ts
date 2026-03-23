import { createReadStream, createWriteStream, existsSync, mkdirSync, readFileSync, unlinkSync } from 'fs';
import PDFDocument from "pdfkit";
import crypto from 'crypto';

import { generatePdfOutput, generateSvgOutput, renderSheetsToSVG } from "../src/render/render.js";
import { renderCommon } from "./helpers.js";
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

        ['script36.cst', 'data expression parsing in pin selection'],
        ['script37.cst', 'rendering circle in symbol'],
        ['script38.cst', 'net graphical properties, multi net component references same net'],
        ['script39.cst', 'Path blocks nested within for loop'],
        ['script40.cst', 'Test corrcet graph when `at` block contains `point` path block'],
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

        // ['script35.cst', 'arrange prop with repeated pins and missing pins']

    ])('render - %s (%s)', async (scriptPath, title, extra = "") => {
        const { sheetFrames, documentVariable } = await renderCommon(mainPath + scriptPath);

        const styles = getStylesFromDocument(documentVariable);
        const svgCanvas = renderSheetsToSVG(sheetFrames, new Logger(), documentVariable, styles);
        const svgOutput = generateSvgOutput(svgCanvas, defaultZoomScale);

        let useSvgPath = scriptPath;
        if (extra !== ""){
            useSvgPath = extra;
        }
        
        const expectedSvgOutput = readFileSync(mainPath + "svgs/" + useSvgPath + ".svg", { encoding: 'utf8' });
        
        // if (svgOutput !== expectedSvgOutput){
        // const expectedSvgPath = `${mainPath}svgs/${useSvgPath}.svg`;
        // Use pixel compare to check.
        // console.log("run manual pixel check: " + useSvgPath);
        // const pixCompare = compareSvgToFile(expectedSvgPath, svgOutput);
        // expect(pixCompare.numDiffPixels >= 0 && pixCompare.numDiffPixels < 10).toBe(true);

        // expect(svgOutput).toEqual(expectedSvgOutput);
        
        // Do not spit out all the differences
        expect(svgOutput === expectedSvgOutput).toEqual(true);
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

        const styles = getStylesFromDocument(documentVariable);
        const svgCanvas = renderSheetsToSVG(sheetFrames, new Logger(), documentVariable, styles);

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

        generatePdfOutput(doc, svgCanvas, sheetSize, false, 1);
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
        expect(result).toEqual('6f406981eb7a8746047fa851579c206e');
    });
});
