/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Box, Dom, SVG, SVGTypeMapping, registerWindow } from '@svgdotjs/svg.js';
import { Big } from 'big.js';

import { HorizontalAlign, HorizontalAlignProp, VerticalAlign, VerticalAlignProp } from './geometry.js';
import { defaultFont } from './globals.js';
import { SVGWindow } from 'svgdom';
// import { JSModuleType, detectJSModuleType } from './helpers.js';

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
    // const moduleType = detectJSModuleType();
    // if (moduleType === JSModuleType.CommonJs || true){
    const { config, createSVGWindow } = await import('svgdom');

    globalCreateSVGWindow = createSVGWindow;
    if (fontsPath !== null) {
        await config.setFontDir(fontsPath)
            .setFontFamilyMappings(supportedFonts)
            .preloadFonts();
    }
    // }
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
        let dominantBaseline = VerticalAlignProp.Hanging;
        switch (vanchor) {
            case VerticalAlign.Top:
                dominantBaseline = VerticalAlignProp.Hanging;
                break;

            case VerticalAlign.Middle:
                dominantBaseline = VerticalAlignProp.Central;
                break;

            case VerticalAlign.Bottom:
                dominantBaseline = VerticalAlignProp.TextTop;
                break;
        }

        let useAnchor = HorizontalAlignProp.Start;
        switch(anchor){
            case HorizontalAlign.Left:
                useAnchor = HorizontalAlignProp.Start;
                break;
            case HorizontalAlign.Middle:
                useAnchor = HorizontalAlignProp.Middle;
                break;
            case HorizontalAlign.Right:
                useAnchor = HorizontalAlignProp.End;
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

        if (dominantBaseline === VerticalAlignProp.Hanging) {
            // Not sure if this is a bug or intended, but code below
            // is needed to set the correct .y and .y2
            tmpTextBox.y = textbox.cy - textbox.height;
            tmpTextBox.y2 = tmpTextBox.y + textbox.height;
            textbox = tmpTextBox;
        } else if (dominantBaseline === VerticalAlignProp.Central){
            // .cy is the offset from the center point, so use it to "negate" 
            // the offset
            tmpTextBox.y -= textbox.cy;
            tmpTextBox.y2 -= textbox.cy;
            tmpTextBox.cy = 0;
            textbox = tmpTextBox;
        }

        const { width, height } = textbox;
        tmpTextElement.remove();

        const finalWidth = new Big(width).round(4).toNumber();
        const finalHeight = new Big(height).round(4).toNumber();

        measureTextSizeCache[key] = {
            width: finalWidth,
            height: finalHeight,
            box: textbox,
        }
        
        measureTextSizeCacheHits[key] = 0;
    }

    measureTextSizeCacheHits[key]++;
    return measureTextSizeCache[key];
}