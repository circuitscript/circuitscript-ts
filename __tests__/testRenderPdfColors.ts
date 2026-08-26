import { jest } from '@jest/globals';
import { getStylesFromDocument } from '../src/styles.js';
import { Logger } from '../src/logger.js';

/**
 * Captures the raw SVG string handed to svg-to-pdfkit for each sheet, so we
 * can assert on it directly instead of round-tripping through compiled PDF
 * bytes (which don't preserve attribute text verbatim).
 *
 * Requires jest.unstable_mockModule() + dynamic import() below, not plain
 * jest.mock() + static imports: under this project's real ESM Jest config,
 * static imports resolve before jest.mock() would run, so render.ts would
 * already be bound to the real svg-to-pdfkit and the mock would be a no-op
 * (confirmed by trying it - capturedSvgStrings stayed empty). Registering
 * the mock first and only then dynamically import()-ing render.js keeps the
 * mock in place when render.ts's own `import ... from 'svg-to-pdfkit'`
 * resolves.
 */
const capturedSvgStrings: string[] = [];

jest.unstable_mockModule('svg-to-pdfkit', () => ({
    __esModule: true,
    default: (_doc: unknown, svgString: string) => {
        capturedSvgStrings.push(svgString);
    },
}));

const { renderCommon } = await import('./helpers.js');
const { default: PDFDocument } = await import('pdfkit');
const { renderSheetsToSVG, generatePdfOutput } = await import('../src/render/render.js');

const mainPath = '__tests__/testData/renderData/';

describe('PDF color resolution', () => {
    test('var=/dark= colored graphic resolves to literal colors in the PDF-bound SVG', async () => {
        capturedSvgStrings.length = 0;

        const scriptPath = 'script94.cst';

        const { sheetFrames, documentVariable } = await renderCommon(mainPath + scriptPath);
        const documentStyles = getStylesFromDocument(documentVariable);
        const { canvas: svgCanvas } = renderSheetsToSVG(sheetFrames, 
            new Logger(), documentVariable, documentStyles);

        const sheetSize = 'A4';
        const doc = new PDFDocument({ layout: 'landscape', size: sheetSize });

        generatePdfOutput(doc, svgCanvas, sheetSize, false, documentStyles, 1);

        expect(capturedSvgStrings.length).toBeGreaterThan(0);
        capturedSvgStrings.forEach(svgString => {
            expect(svgString).not.toContain('light-dark(');
            expect(svgString).not.toContain('var(--cs-');
        });
    });
});
