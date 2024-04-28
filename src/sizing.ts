import { Box, SVG, SVGTypeMapping, registerWindow } from '@svgdotjs/svg.js';
import { config, createSVGWindow } from 'svgdom';
import { HorizontalAlign, VerticalAlign } from './geometry.js';

let MainCanvas = null;

const supportedFonts = { 
    // 'Roboto': 'Roboto-Regular.ttf',
    'Inter': 'Inter-Regular.ttf', 
    'Inter-Bold': 'Inter-Bold.ttf',
}

export async function prepareSizing(fontsPath): Promise<void> {
    await config.setFontDir(fontsPath)
        .setFontFamilyMappings(supportedFonts)
        .preloadFonts()
}

export function applyFontsToSVG(canvas: SVGTypeMapping): void {
    // for (const fontName in supportedFonts) {
    //     canvas.fontface(fontName, "url('" + InterFontEncoded + "')");
    // }
}

export async function measureTextSize(text: string, fontFamily: string, fontSize: number): Promise<{ width: number, height: number }> {
    // Async version, in case measuring text sizes need more time
    return measureTextSize2(text, fontFamily, fontSize);
}

// Cache measurements to avoid recalculations
const measureTextSizeCache: {
    [key: string]: {
        width: number,
        height: number, box: Box
    }
} = {};
const measureTextSizeCacheHits: { [key: string]: number } = {};

export function measureTextSize2(text: string, fontFamily: string,
    fontSize: number, fontWeight = 'regular',
    anchor = HorizontalAlign.Left,
    vanchor = VerticalAlign.Bottom): { width: number, height: number, box: Box } {

    // Reuse the canvas, so no need to keep creating
    if (MainCanvas === null) {
        const window = createSVGWindow();
        const { document } = window;
        registerWindow(window, document);
        MainCanvas = SVG(document.documentElement);
    }

    // Check if entry already exists in the cache
    const key = `${text}-${fontFamily}-${fontSize}-${fontWeight}-${anchor}-${vanchor}`;

    if (measureTextSizeCache[key] === undefined) {
        let dominantBaseline = 'hanging';
        switch(vanchor){
            case VerticalAlign.Top:
                dominantBaseline = 'hanging';
                break;

            case VerticalAlign.Middle:
                dominantBaseline = 'middle';
                break;

            case VerticalAlign.Bottom:
                dominantBaseline = 'text-top';
                break;
        }

        if (fontWeight === 'bold'){
            fontFamily = 'Inter-Bold';
        } else {
            fontFamily = 'Inter-Regular';
        }
        
        const tmpTextElement = MainCanvas.text(text).font({
            family: fontFamily,
            size: fontSize,
            anchor: anchor,
            'dominant-baseline': dominantBaseline,
            // weight: fontWeight,
        }).fill('#333');

        const textbox = tmpTextElement.bbox();
        const { width, height } = textbox;
        tmpTextElement.remove();

        measureTextSizeCache[key] = {
            width: Math.round(width * 100) / 100,
            height: Math.round(height * 100) / 100,
            box: textbox,
        }
        measureTextSizeCacheHits[key] = 0;
    }

    measureTextSizeCacheHits[key]++;
    return measureTextSizeCache[key];
}