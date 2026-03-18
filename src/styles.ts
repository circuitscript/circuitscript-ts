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