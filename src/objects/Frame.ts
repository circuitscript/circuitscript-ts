/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { FrameType } from "../globals.js";

export class Frame {
    parameters: Map<string, any> = new Map();
    frameId: number;
    frameType: FrameType;

    constructor(frameId: number, frameType = FrameType.Frame) {
        this.frameId = frameId;
        this.frameType = frameType;
    }
}

export enum FrameParamKeys {
    Title = 'title',
    Direction = 'direction',
    Padding = 'padding',
    Border = 'border',

    Width = 'width',
    Height = 'height',

    PaperSize = 'paper_size',

    // Same parameter is used in 'document' and 'sheet(frame)' objects
    SheetType = 'sheet_type',

    SheetNumber = 'sheet_number',   // Current sheet number
    SheetTotal = 'sheet_total',     // Total number of sheets
}

export enum FramePlotDirection {
    Row = 'row',
    Column = 'column',
}