import { SVG, registerWindow } from '@svgdotjs/svg.js';
import { config, createSVGWindow } from 'svgdom';

let MainCanvas = null;

export async function prepareSizing(): Promise<void> {
    config.setFontDir('./fonts')
        .setFontFamilyMappings({ 'Roboto': 'Roboto-Regular.ttf' })
        .preloadFonts()
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