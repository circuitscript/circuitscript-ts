import { createReadStream, createWriteStream, existsSync, readFileSync, unlinkSync } from 'fs';
import PDFDocument from "pdfkit";
import crypto from 'crypto';

import { generatePdfOutput, generateSvgOutput, renderSheetsToSVG } from "../src/render.js";
import { renderCommon } from "./helpers.js";
import { defaultZoomScale } from '../src/globals.js';
import { Logger } from '../src/logger.js';

const mainPath = '__tests__/renderData/';

describe('Render tests', () => {

    test.each([
        ['variant and branch rendering', 'script1.cst'],
        ['simple function', 'script2.cst'],
        ['simple frame', 'script3.cst'],
        ['drawing functions for graphics', 'script4.cst'],
        ['drawing 180 deg flipped components', 'script5.cst'],
        ['join command', 'script6.cst'],
        ['parallel command', 'script7.cst'],
        ['point block command', 'script8.cst'],
        ['start immediately with `add component` command', 'script9.cst'],
        ['start immediately with `wire` command', 'script10.cst'],
        ['flipX and flipY parameters', 'script11.cst'],
        ['flipX, flipY, angle parameters with multiple components', 'script12.cst'],
        ['anchor modifier', 'script13.cst'],
        
        ['text graphic expression', 'script14.cst'],
        ['component follows wire orientation', 'script15.cst'],
        ['component with defined pin follows wire orientation', 'script16.cst'],
        ['component with arc graphic expr', 'script17.cst'],

        // Check that the correct pin positions are generated for
        // custom drawn symbols 
        ['symbol custom with pin position', 'script18.cst'],

        ['ports (in, out, io, any)', 'script19.cst'],
        
        ['module with ports', 'script20.cst'],

        ['decimal places causing issues with junctions and layout', 'script21.cst'],

        ['catch repeated nodes in the origin nodes list', 'script22.cst'],

        ['multiple sheet commands', 'script23.cst'],
        ['single sheet command', 'script24.cst'],
        ['test blank spaces at start and end in symbol custom', 'script25.cst'],
        
        ['for command in graphics expr', 'script26.cst'],
        ['label angle check', 'script27.cst'],
        ['component width and height prop', 'script28.cst'],

        ['frame direction arrange row to next line', 'script29.cst'],
        ['frame direction arrange column to next line', 'script30.cst'],

        ['branch within function', 'script31.cst'],
        
        ['complex wire merging and intersections', 'script32.cst'],
        ['maintain current component through multiple branch levels', 'script33.cst'],

        ['node1--node2 and node2--node1 should not be the same', 'script34.cst'],

        ['data expression parsing in pin selection', 'script36.cst'],
        ['rendering circle in symbol', 'script37.cst'],
        ['net graphical properties, multi net component references same net', 'script38.cst'],
        ['Path blocks nested within for loop', 'script39.cst'],
        ['Test corrcet graph when `at` block contains `point` path block', 'script40.cst'],
        ['string and number Pin Ids for create component', 'script41.cst'],
        ['extract PinIds from create component `display` prop', 'script42.cst'],
        ['do not move non-copy component in frame', 'script43.cst'],

        // Refdes generation related
        ['refdes within for and while loop', 'script44.cst'],
        ['refdes within functions', 'script45.cst'],
        ['refdes in at blocks', 'script46.cst'],
        ['refdes number for repeated function calls', 'script48.cst'],

        // Refdes annotation parsing
        ['refdes annotation parsing: script44.cst with changed refdes and annotations', 'script47.cst'],
        ['refdes annotation parsing: script45.cst with changed refdes and annotations', 'script49.cst'],
        ['refdes annotation parsing: script46.cst with changed refdes and annotations', 'script50.cst'],
        ['refdes annotation parsing: script48.cst with changed refdes and annotations', 'script51.cst'],
        ['refdes annotation parsing with repeated annotations', 'script52.cst'],

        // ['arrange prop with repeated pins and missing pins', 'script35.cst']

        
    ])('render - %s (%s)', async (title, scriptPath) => {
        const { sheetFrames } = await renderCommon(mainPath + scriptPath);

        const svgCanvas = renderSheetsToSVG(sheetFrames, new Logger());
        const svgOutput = generateSvgOutput(svgCanvas, defaultZoomScale);

        const expectedSvgOutput = readFileSync(mainPath + "svgs/" + scriptPath + ".svg", { encoding: 'utf8' });
        // expect(svgOutput).toEqual(expectedSvgOutput);

        // Do not spit out all the differences
        expect(svgOutput === expectedSvgOutput).toEqual(true);
    });
    
    test('pdf output', async () => {
        const scriptPath = 'script1.cst';
        const targetPdf = mainPath + "pdfs/" + scriptPath + ".pdf";

        // Remove the original file first
        if (existsSync(targetPdf)) {
            unlinkSync(targetPdf);
        }

        // First, generate the PDF
        const { sheetFrames } = await renderCommon(mainPath + scriptPath);
        const svgCanvas = renderSheetsToSVG(sheetFrames, new Logger());

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
        expect(result).toEqual('8dc01f37ccd0300bbac25aeb4e705e30');
    });
});
