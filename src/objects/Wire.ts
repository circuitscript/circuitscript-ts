/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ClassComponent } from "./ClassComponent.js";

export class Wire {

    // Should have some net info too 

    path: WireSegment[]

    constructor(path: WireSegment[]) {
        this.path = path;
    }
}

export type WireSegment = {
    direction: 'up' | 'down' | 'left' | 'right' | 'auto' | 'auto_';
    value: number,
    valueXY?: [x: number, y: number],
    until?: [instance: ClassComponent, pin: number],
}