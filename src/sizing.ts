/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Box, Dom, SVG, SVGTypeMapping, registerWindow } from '@svgdotjs/svg.js';

import { HorizontalAlign, VerticalAlign } from './geometry.js';
import { defaultFont } from './globals.js';
import { SVGWindow } from 'svgdom';
import { JSModuleType, detectJSModuleType } from './helpers.js';

let MainCanvas: Dom | null = null;

const supportedFonts = { 
    // 'Roboto': 'Roboto-Regular.ttf',
    // 'Inter': 'Inter-Regular.ttf', 
    // 'Inter-Bold': 'Inter-Bold.ttf',
    // 'Open Sans': 'OpenSans-Regular.ttf',
    'Arial': 'Arial.ttf',
}

let globalCreateSVGWindow: () => SVGWindow;

export async function prepareSVGEnvironment(fontsPath: string | null): Promise<void> {    
    const moduleType = detectJSModuleType();
    if (moduleType === JSModuleType.CommonJs){
        const { config, createSVGWindow } = await import('svgdom');

        globalCreateSVGWindow = createSVGWindow;
        if (fontsPath !== null) {
            await config.setFontDir(fontsPath)
                .setFontFamilyMappings(supportedFonts)
                .preloadFonts();
        }
    }
}

export function getCreateSVGWindow(): () => SVGWindow {
    if (globalCreateSVGWindow === undefined) {
        throw "SVG environment is not set up yet";
    }
    return globalCreateSVGWindow;
}

export function applyFontsToSVG(canvas: SVGTypeMapping): void {
    // for (const fontName in supportedFonts) {
    //     canvas.fontface(fontName, "url('" + InterFontEncoded + "')");
    // }
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
        const window = getCreateSVGWindow()();
        const { document } = window;
        registerWindow(window, document);
        MainCanvas = SVG(document.documentElement);
    }

    // Check if entry already exists in the cache
    const key = `${text}-${fontFamily}-${fontSize}-${fontWeight}-${anchor}-${vanchor}`;

    if (measureTextSizeCache[key] === undefined) {
        let dominantBaseline = 'hanging';
        switch (vanchor) {
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

        let useAnchor = 'start';
        switch(anchor){
            case HorizontalAlign.Left:
                useAnchor = 'start';
                break;
            case HorizontalAlign.Middle:
                useAnchor = 'middle';
                break;
            case HorizontalAlign.Right:
                useAnchor = 'end';
                break;
        }

        fontFamily = defaultFont;

        const tmpTextElement = MainCanvas!.text(text).font({
            family: fontFamily,
            size: fontSize,
            anchor: useAnchor,
            'dominant-baseline': dominantBaseline,
            weight: fontWeight,
        })
        .attr("xml:space", "preserve")
        .fill('#333');

        let textbox = tmpTextElement.bbox();
        const tmpTextBox = {...textbox};

        if (dominantBaseline === 'hanging') {
            // Not sure if this is a bug or intended, but code below
            // is needed to set the correct .y and .y2
            tmpTextBox.y = textbox.cy - textbox.height;
            tmpTextBox.y2 = tmpTextBox.y + textbox.height;
            textbox = tmpTextBox;
        }

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