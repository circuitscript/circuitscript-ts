import {jest} from '@jest/globals'

import { createReadStream, createWriteStream, existsSync, readFileSync, unlinkSync } from 'fs';
import PDFDocument from "pdfkit";
import crypto from 'crypto';

import { generatePdfOutput, generateSvgOutput, renderSheetsToSVG } from "../src/render/render.js";
import { renderCommon } from "./helpers.js";
import { defaultZoomScale } from '../src/globals.js';
import { Logger } from '../src/logger.js';

const mainPath = '__tests__/testData/renderData/';

describe('Render tests', () => {

    jest.setTimeout(20000);

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

        // ['script35.cst', 'arrange prop with repeated pins and missing pins']


    ])('render - %s (%s)', async (scriptPath, title, extra = "") => {
        const { sheetFrames } = await renderCommon(mainPath + scriptPath);

        const svgCanvas = renderSheetsToSVG(sheetFrames, new Logger());
        const svgOutput = generateSvgOutput(svgCanvas, defaultZoomScale);

        let useSvgPath = scriptPath;
        if (extra !== ""){
            useSvgPath = extra;
        }

        const expectedSvgOutput = readFileSync(mainPath + "svgs/" + useSvgPath + ".svg", { encoding: 'utf8' });
        // expect(svgOutput).toEqual(expectedSvgOutput);

        // Do not spit out all the differences
        expect(svgOutput === expectedSvgOutput).toEqual(true);
    });

    test.only('pdf output', async () => {
        const scriptPath = 'script1.cst';
        const targetPdf = mainPath + "pdfs/" + scriptPath + ".pdf";

        // Remove the original file first
        if (existsSync(targetPdf)) {
            unlinkSync(targetPdf);
        }

        console.log('removed original if exists');

        // First, generate the PDF
        const { sheetFrames } = await renderCommon(mainPath + scriptPath);
        
        console.log('done render');

        const svgCanvas = renderSheetsToSVG(sheetFrames, new Logger());

        console.log('done generate svg canvas');

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

        console.log('before generate pdf');

        generatePdfOutput(doc, svgCanvas, sheetSize, false, 1);
        const outputStream = createWriteStream(targetPdf);
        doc.pipe(outputStream);
        doc.end();

        console.log('done genereate pdf');

        try {
            // Wait for stream to finish
            await new Promise(resolve => {
                outputStream.on('finish', () => {
                    resolve();
                });
            });
        } catch (err) {
            console.log('err 1', err);
        }

        console.log('stream finished');

        expect(existsSync(targetPdf)).toEqual(true);

        console.log('check hash');

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

        console.log('done waiting for hash');

        // Use file hash to verify that files are the same.
        expect(result).toEqual('419525617b50e7ca75a63a6425fa7a60');
    });
});
