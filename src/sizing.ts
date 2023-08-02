import { SVG, SVGTypeMapping, registerWindow } from '@svgdotjs/svg.js';
import { config, createSVGWindow } from 'svgdom';

let MainCanvas = null;

const supportedFonts = { 
    'Roboto': 'Roboto-Regular.ttf',
    'Inter': 'Inter-Regular.ttf', 
}

export async function prepareSizing(): Promise<void> {
    config.setFontDir('./fonts')
        .setFontFamilyMappings(supportedFonts)
        .preloadFonts()
}

export function applyFontsToSVG(canvas: SVGTypeMapping): void {
    for (const fontName in supportedFonts) {
        canvas.fontface(fontName, "url('fonts/" + supportedFonts[fontName] + "')");
    }
}

export async function measureTextSize(text: string, fontFamily: string, fontSize: number): Promise<{ width: number, height: number }> {
    // Reuse the canvas, so no need to keep creating
    if (MainCanvas === null) {
        const window = createSVGWindow();
        const { document } = window;
        registerWindow(window, document);
        MainCanvas = SVG(document.documentElement);
    }

    const tmpTextElement = MainCanvas.text(text).font({
        family: fontFamily,
        size: fontSize,
        anchor: 'start',
    }).fill('#333');

    const { width, height } = MainCanvas.bbox();
    tmpTextElement.remove();

    return {
        width, height
    }
}