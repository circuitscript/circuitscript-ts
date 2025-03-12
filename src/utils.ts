/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Big } from 'big.js';

import { ParserRuleContext } from "antlr4ng";
import { SymbolDrawingCommands } from "./draw_symbols";
import { ClassComponent } from "./objects/ClassComponent";
import { NumericValue } from "./objects/ParamDefinition";

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

/** Given an input bounding box, returns a bounding box
 *  such that all edges are aligned with the grid size provided.
 */
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

export function roundValue(value: NumericValue): NumericValue {
    return resolveToNumericValue(
        new Big(
            value.toBigNumber().toFixed(7)));
}

export function throwWithContext(context: ParserRuleContext, message: string): void {
    const startLine = context.start?.line;
    const startColumn = context.start?.column;
    const startString = startLine + ":" + startColumn;

    const stopLine = context.stop?.line;
    const stopColumn = context.stop?.column;
    let stopString = "";
    if (startLine === stopLine) {
        stopString = stopColumn?.toString();
    } else {
        stopString = stopLine + ":" + stopString;
    }

    throw `Parse exception at [${startString} - ${stopString}] : ${message}`;
}

export function combineMaps(map1: Map<string, any>, map2: Map<string, any>)
    : Map<string, any> {

    const newMap = new Map(map1);
    map2.forEach((value, key) => {
        newMap.set(key, value);
    });
    return newMap;
}

export function getNumberExponential(value: string): number {
    value = value.trim();
    switch (value) {
        case 'G':
            return 9;
        case 'M':
            return 6;
        case 'k':
        case 'K':
            return 3;
        case 'm':
            return -3;
        case 'u':
            return -6;
        case 'n':
            return -9;
        case 'p':
            return -12;
        case 'f':
            return -15;
        default:
            return 0;
    }
}

export function getNumberExponentialText(value: number): string {
    switch (value) {
        case -15:
            return 'f';
        case -12:
            return 'p';
        case -9:
            return 'n';
        case -6:
            return 'u';
        case -3:
            return 'm';

        case 3:
            return 'k';
        case 6:
            return 'M';
        case 9:
            return 'G';

        case 0:
        default:
            return '';
    }
}

export function resolveToNumericValue(value: Big): NumericValue {
    // find the nearest exponential value
    if (value.toNumber() === 0) {
        return new NumericValue(0);
    }

    const isNeg = value.lt(0);
    const positiveValue = isNeg ? value.neg() : value;
    const prefixPart = Math.floor(Math.log10(positiveValue.toNumber()) / 3);

    let useValue = value;
    if (prefixPart !== 0) {
        const tmpValue1 = positiveValue.div(Math.pow(10, prefixPart * 3));
        useValue = isNeg ? tmpValue1.neg() : tmpValue1;
    }

    return new NumericValue(useValue, prefixPart * 3);
}