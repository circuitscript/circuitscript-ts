import { createReadStream, createWriteStream, existsSync, readFileSync, unlinkSync } from 'fs';
import PDFDocument from "pdfkit";
import crypto from 'crypto';

import { LayoutEngine, SheetFrame } from "../src/layout.js";
import { generatePdfOutput, generateSvgOutput, renderSheetsToSVG } from "../src/render.js";
import { runScript } from "./helpers.js";
import { defaultZoomScale } from '../src/globals.js';
import { Logger } from '../src/logger.js';

const mainPath = '__tests__/renderData/';

describe('Render tests', () => {

    async function renderCommon(scriptPath: string): Promise<SheetFrame[]> {
        const script = readFileSync(mainPath + scriptPath, { encoding: 'utf8' });
        const { hasError, visitor } = await runScript(script);
        expect(hasError).toEqual(false);
        visitor.annotateComponents();
        visitor.applySheetFrameComponent();

        const { sequence, nets } = visitor.getGraph();

        const layoutEngine = new LayoutEngine();
        return await layoutEngine.runLayout(sequence, nets);
    }

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

        ['node1--node2 and node2--node1 should not be the same', 'script34.cst']
        
    ])('render - %s (%s)', async (title, scriptPath) => {
        const sheetFrames = await renderCommon(scriptPath);

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
        const sheetFrames = await renderCommon(scriptPath);
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
        expect(result).toEqual('4565b2b652a7dd7275a467daa5680bd6');
    });
});
