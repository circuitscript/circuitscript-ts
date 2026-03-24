/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ColorScheme, Defaults } from "./globals.js";
import { FrameParamKeys } from "./objects/Frame.js";
import { NumericValue } from "./objects/NumericValue.js";
import { DocumentVariable } from "./objects/types.js";

export class Styles {
    lineColor?: string;
    lineWidth?: NumericValue;
    fillColor?: string;

    textColor?: string;

    wireColor?: string;

    // in Mils
    wireWidth?: NumericValue;
}

export function getStylesFromDocument(document: DocumentVariable): Styles {
    const styles = new Styles();
    styles.lineColor = document[FrameParamKeys.LineColor] ?? ColorScheme.PinLineColor;
    styles.lineWidth = document[FrameParamKeys.LineWidth] ?? Defaults.LineWidth;
    styles.fillColor = document[FrameParamKeys.FillColor];

    styles.textColor = document[FrameParamKeys.TextColor] ?? ColorScheme.PinNameColor;

    styles.wireColor = document[FrameParamKeys.WireColor] ?? ColorScheme.WireColor;
    
    styles.wireWidth = document[FrameParamKeys.WireWidth] ?? Defaults.WireLineWidth;

    return styles;
}