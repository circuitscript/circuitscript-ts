/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Box, SVGTypeMapping } from '@svgdotjs/svg.js';
import { Big } from 'big.js';

import { HorizontalAlign, HorizontalAlignProp, VerticalAlign, VerticalAlignProp, resolveDominantBaseline } from './render/geometry.js';
import { defaultFont } from './globals.js';
import { NodeScriptEnvironment } from "./environment/environment.js";

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

export function measureTextSize2(
    text: string, fontFamily: string,
    fontSize: number, fontWeight = 'regular',
    fontStyle = 'normal',
    anchor = HorizontalAlign.Left,
    vanchor = VerticalAlign.Bottom): { width: number, height: number, box: Box } {

    const environment = NodeScriptEnvironment.getInstance();

    // Reuse the canvas, so no need to keep creating
    const mainCanvas = environment.getCanvasWindow();

    /* fontFamily is always forced to defaultFont below - keying on defaultFont
    * here (rather than the caller's fontFamily) avoids fragmenting the cache
    * with distinct entries for callers that pass different families but end
    * up with identical measurements. */
    const key = `${text}-${defaultFont}-${fontSize}-${fontWeight}-${fontStyle}-${anchor}-${vanchor}`;

    if (measureTextSizeCache[key] === undefined) {
        const dominantBaseline = resolveDominantBaseline(vanchor);

        let useAnchor = HorizontalAlignProp.Start;
        switch(anchor){
            case HorizontalAlign.Left:
                useAnchor = HorizontalAlignProp.Start;
                break;
            case HorizontalAlign.Center:
                useAnchor = HorizontalAlignProp.Middle;
                break;
            case HorizontalAlign.Right:
                useAnchor = HorizontalAlignProp.End;
                break;
        }

        fontFamily = defaultFont;

        const tmpTextElement = mainCanvas.text(text).font({
            family: fontFamily,
            size: fontSize,
            anchor: useAnchor,
            'dominant-baseline': dominantBaseline,
            weight: fontWeight,
            style: fontStyle,
        })
        .css("white-space", "pre")
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