/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { numeric } from "./objects/NumericValue.js";
import { PinTypes } from "./objects/PinTypes.js";

// Delimiter should not include chars that can be in instance name 
// or in variable names.
export const Delimiter1 = '-';
export const DoubleDelimiter1 = `${Delimiter1}${Delimiter1}`;

// Root/starting namespace
export const BaseNamespace = `${DoubleDelimiter1}.`;

export const RefdesFileSuffix = '.refdes.json';

export enum GlobalNames {
    __root = `${DoubleDelimiter1}root`,
    symbol = 'symbol',
}

export const NoNetText = 'NO_NET';

export enum ParamKeys {
    priority = 'priority',
    net_name = 'net_name',

    /** @deprecated */
    net_type = 'net_type',

    flip = 'flip',
    flipX = 'flipX',
    flipY = 'flipY',
    angle = 'angle',

}

export enum LayoutDirection {
    RIGHT = "RIGHT",     // A --> B
    LEFT = "LEFT",       // B <-- A
}

export enum SymbolPinSide {
    Left = "left",
    Right = "right",

    Top = "top",

    Bottom = "bottom"
}

// Validate side key
export const ValidPinSides: string[] = [
    SymbolPinSide.Left, SymbolPinSide.Right, SymbolPinSide.Top, SymbolPinSide.Bottom];

export enum LengthUnit {
    mm = 'mm',
    mils = 'mils',
    px = 'px',
}

export enum WireAutoDirection {
    Auto = 'auto',
    Auto_ = 'auto_',
}

export const MilsToMM = 0.0254;
export const MMToPx = 3.779276;

export const MMToPt = 2.8346456693;
export const PxToMM = 0.2645833;

export const portWidth = 20;
export const portHeight = 2;

export const defaultGridSizeUnits = numeric(MilsToMM).mul(100).toNumber();

export const defaultZoomScale = 2.5; // Convert language units into output units

// Re-size fonts based on a custom defined scale.
// A font size of 10 (before applying scale), should fit around 50 mils
export const fontDisplayScale = 0.032;

export const Defaults = {
    WireLineWidth:  numeric(6),
    LineWidth:      numeric(5),
}

export const defaultSymbolLineWidth = numeric(MilsToMM).mul(6).toNumber();

export const defaultPinNameTextSize = 40;
export const defaultPinIdTextSize = 30;

export const defaultPageMarginMM = 10;

export const defaultPageSpacingMM = 10;

export const CustomSymbolPinTextSize = defaultPinNameTextSize;
export const CustomSymbolPinIdSize = defaultPinIdTextSize;
export const CustomSymbolRefDesSize = 50;
export const CustomSymbolParamTextSize = 40;

export const defaultFrameTitleTextSize = 60;

// For now default is in mm?
export const displayUnits = LengthUnit.mils;

export const defaultFont = 'Arial';
export const defaultFontBold = 'Arial';

export const defaultFontSize = 10;

export const junctionSize = numeric(MilsToMM).mul(20);

export const PortArrowSize = MilsToMM * 50;
export const PortPaddingHorizontal = MilsToMM * 10;
export const PortPaddingVertical = MilsToMM * 10;

export const ColorScheme = {
    BodyColor: 'rgb(255, 255, 194)',
    JunctionColor: 'rgb(0, 132, 0)',
    WireColor: 'rgb(0, 132, 0)',

    PinLineColor: '#333',
    PinNameColor: '#333',
}


export enum ComponentTypes {
    /** For net related components (power supplies, gnd, labels) */
    net = 'net',

    /** For components that are purely graphical (sheet frames, text) */
    graphic = 'graphic',

    /** Ports are used to connect different circuits together across 
     *  module boundaries. */
    port = 'port',

    /** Component is a module and contains an internal circuit */
    module = 'module',

    resistor = 'res',
}

export enum ReferenceTypes {
    function = 'function',
    value = 'value',
    variable = 'variable',
    instance = 'instance',
    library = 'library',
    
    unknown = 'unknown',
}

export enum NetGraphicsParams {
    Color = 'color',
    LineWidth = 'line_width',
    Highlight = 'highlight',
    HighlightWidth = 'highlight_width',
    HighlightOpacity = 'highlight_opacity',
}

export enum FrameType {
    Frame = 1,
    Sheet = 2
}

// The keyword for module contains
export const ModuleContainsKeyword = 'contains';

export const GlobalDocumentName = 'document';

export const KeywordRefdesPrefix = 'refdes_prefix';

export const RenderFlags = {
    ShowElementFrames:      false,
    ShowOrigin:             false,
    ShowGridOrigin:         false,
    
    ShowLabelBoxBounds:     false,
    ShowLabelOrigin:        false,
    ShowLabelBounds:        false,
}


// Used to differentiate between the main execution context and
// validation context (only used in editors)
export const SymbolValidatorContext = '_sym';

export const TrailerArrayIndex = 'index';

export const DefaultComponentUnit = '__default';

