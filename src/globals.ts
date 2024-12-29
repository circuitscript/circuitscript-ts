/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export enum GlobalNames {
    __root = '__root',
    gnd = 'gnd',

    DefaultResistor = 'res',
    DefaultCapacitor = 'cap',
    DefaultInductor = 'ind',

    symbol = 'symbol',
}

export const NoNetText = 'NO_NET';

export enum ParamKeys {
    priority = 'priority',
    net_name = 'net_name',
}

export enum LayoutDirection {
    RIGHT = "RIGHT",     // A --> B
    LEFT = "LEFT",       // B <-- A
}

export enum SymbolPinSide {
    Left = "left",
    Right = "right"
}

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

export const defaultGridSizeUnits = MilsToMM * 100;

export const defaultZoomScale = 2.5; // Convert language units into output units

// Re-size fonts based on a custom defined scale.
// A font size of 10 (before applying scale), should fit around 50 mils
export const fontDisplayScale = 0.032;

export const defaultSymbolLineWidth = MilsToMM * 6;
export const defaultWireLineWidth = MilsToMM * 6;

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

export const junctionSize = MilsToMM * 20;

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
    gnd = 'gnd',
    net = 'net',
    label = 'label',
    point = 'point',
    frame = 'frame',
}

export enum ReferenceTypes {
    function = 'function',
    value = 'value',
    variable = 'variable',
    instance = 'instance',
    pinType = 'pinType',
}

export enum BlockTypes {
    Branch = 1,     // split off circuit paths, same starting insertion point
    Join = 2,       // join circuit paths, same ending insertion point
    Parallel = 3,   // same starting and ending points for the circuit paths
    Point = 4,      // to this point
}

export enum FrameType {
    Frame = 1,
    Sheet = 2
}

export const GlobalDocumentName = 'document';

export const RenderFlags = {
    ShowElementFrames: false,
    ShowOrigin: false,
}