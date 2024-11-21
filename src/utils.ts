/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { SymbolDrawingCommands } from "./draw_symbols";
import { ClassComponent } from "./objects/ClassComponent";

export class SimpleStopwatch {
    startTime: Date;

    constructor() {
        this.startTime = new Date();
    }

    lap(): number {
        return (new Date()).getTime() - this.startTime.getTime();
    }
}

export type BoundBox = {
    xmin: number, ymin: number,
    xmax: number, ymax: number,
}

export function resizeBounds(bounds: BoundBox, value: number): BoundBox {
    return {
        xmin: bounds.xmin - value,
        xmax: bounds.xmax + value,

        ymin: bounds.ymin - value,
        ymax: bounds.ymax + value
    }
}

export function printBounds(bounds: BoundBox): string {
    if (bounds !== null){
        return `[${bounds.xmin}, ${bounds.ymin} to ${bounds.xmax}, ${bounds.ymax}]`;
    } else {
        return 'null';
    }
}

function hasRemainder(value: number, value2: number): number {
    const tmpValue = Math.abs(value) / value2;
    const flooredValue = Math.floor(tmpValue);
    const diff = tmpValue - flooredValue;
    return diff;
}

export function resizeToNearestGrid(bounds: BoundBox, gridSize = 20): BoundBox {

    // These extra values force the bounds to be expanded if it is already
    // to the grid, otherwise the expanded grid might "just nice" fit.
    const addXMin = hasRemainder(bounds.xmin, gridSize) === 0 ? -1: 0;
    const addYMin = hasRemainder(bounds.ymin, gridSize) === 0 ? -1: 0;
    const addXMax = hasRemainder(bounds.xmax, gridSize) === 0 ? 1 : 0;
    const addYMax = hasRemainder(bounds.ymax, gridSize) === 0 ? 1 : 0;

    return {
        xmin: Math.floor((bounds.xmin + addXMin) / gridSize) * gridSize,
        ymin: Math.floor((bounds.ymin + addYMin) / gridSize) * gridSize,

        xmax: Math.ceil((bounds.xmax + addXMax) / gridSize) * gridSize,
        ymax: Math.ceil((bounds.ymax + addYMax) / gridSize) * gridSize,
    }
}

export function toNearestGrid(value: number, gridSize: number): number {
    return Math.floor(value / gridSize) * gridSize;
}

export function getBoundsSize(bounds: BoundBox): {width: number, height: number} {
    return {
        width: bounds.xmax - bounds.xmin,
        height: bounds.ymax - bounds.ymin,
    }
}

export function getPortType(component: ClassComponent): string | null {
    const drawingCommands = component.displayProp as SymbolDrawingCommands;
    let foundPinType: string | null = null;

    const commands = drawingCommands.getCommands();

    commands.some(item => {
        if (item[0] === 'label' && item[2].has('portType')) {
            foundPinType = item[2].get('portType');
            return true;
        }

        return false;
    });

    return foundPinType;
}

export function roundValue(value: number): number {
    return +value.toFixed(7);
}