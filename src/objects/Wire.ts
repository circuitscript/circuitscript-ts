/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { UnitDimension } from "src/helpers.js";
import { ClassComponent } from "./ClassComponent.js";
import { Direction } from "./types.js";
import { WireAutoDirection } from "src/globals.js";

export class Wire {

    // Should have some net info too 

    path: WireSegment[]

    constructor(path: WireSegment[]) {
        this.path = path;
    }
}

export type WireSegment = {
    direction: Direction.Up | Direction.Down | Direction.Left
    | Direction.Right | WireAutoDirection;
    
    value: number | UnitDimension,

    // If direction is auto, then both x and y might be set.
    valueXY?: [x: number, y: number],

    // Used when direction is auto, to set the component and pin that
    // it will auto connected to.
    until?: [instance: ClassComponent, pin: number],
}