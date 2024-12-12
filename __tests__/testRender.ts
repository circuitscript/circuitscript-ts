import { createReadStream, createWriteStream, readFileSync } from 'fs';
import PDFDocument from "pdfkit";
import crypto from 'crypto';

import { LayoutEngine, SheetFrame } from "../src/layout.js";
import { generatePdfOutput, generateSvgOutput, renderSheetsToSVG } from "../src/render.js";
import { runScript } from "./helpers.js";
import { prepareSVGEnvironment } from '../src/sizing.js';
import { defaultZoomScale } from '../src/globals.js';

const mainPath = '__tests__/renderData/';

describe('Render tests', () => {

    async function renderCommon(scriptPath: string): Promise<SheetFrame[]> {
        const fontsPath = "./fonts";
        await prepareSVGEnvironment(fontsPath);

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
        ['single sheet command', 'script24.cst']
        
    ])('render - %s (%s)', async (title, scriptPath) => {
        const sheetFrames = await renderCommon(scriptPath);

        const svgCanvas = renderSheetsToSVG(sheetFrames);
        const svgOutput = generateSvgOutput(svgCanvas, defaultZoomScale);

        const expectedSvgOutput = readFileSync(mainPath + "svgs/" + scriptPath + ".svg", { encoding: 'utf8' });
        expect(svgOutput).toEqual(expectedSvgOutput);

        // const isSame = svgOutput == expectedSvgOutput;
        // expect(isSame).toEqual(true);
    });
    
    test('pdf output', async () => {
        const scriptPath = 'script1.cst';

        // First, generate the PDF
        const sheetFrames = await renderCommon(scriptPath);
        const svgCanvas = renderSheetsToSVG(sheetFrames);

        const sheetSize = "A4";
        const doc = new PDFDocument({
            layout: 'landscape',
            size: sheetSize,
            info: {
                CreationDate: new Date(2024, 10, 1, 0, 0, 0, 0),
            }
        });

        generatePdfOutput(doc, svgCanvas, sheetSize, false, 1);

        const targetPdf = mainPath + "pdfs/" + scriptPath + ".pdf";
        const outputStream = createWriteStream(targetPdf);
        doc.pipe(outputStream);
        doc.end();

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
        expect(result).toEqual('f393653f5a848afcb1125ed3cda5b124');

    });
});
