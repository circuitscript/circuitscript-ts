/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export class Frame {
    parameters: Map<string, any> = new Map();
    frameId: number;

    constructor(frameId: number) {
        this.frameId = frameId;
    }
}

export enum FrameParamKeys {
    Title = 'title',
    Direction = 'direction',
    Padding = 'padding',
    Border = 'border',
}

export enum FramePlotDirection {
    Row = 'row',
    Column = 'column',
}