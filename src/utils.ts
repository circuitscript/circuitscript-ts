/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Big } from 'big.js';

import { ParserRuleContext, Token } from "antlr4ng";
import { SymbolDrawingCommands } from "./draw_symbols.js";
import { ClassComponent } from "./objects/ClassComponent.js";
import { NumericValue } from "./objects/ParamDefinition.js";
import { SequenceAction, SequenceActionAssign, SequenceActionAtTo, SequenceItem } from './objects/ExecutionScope.js';
import { UnitDimension } from './helpers.js';
import { BlockTypes } from './globals.js';

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

export type BoundBox2 = 
    [xmin: number, ymin: number, xmax: number, ymax: number];

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

export function throwWithContext(context: ParserRuleContext, messageOrError: string | BaseError): void {
    if (messageOrError instanceof BaseError){
        throw messageOrError;
    }
    throwWithTokenRange(messageOrError as string, context.start!, context.stop!);
}

export function throwWithToken(message: string, token: Token): void {
    throw new ParseError(message, token);
}

export function throwWithTokenRange(message: string, startToken: Token, endToken?: Token): void {
    throw new ParseError(message, startToken, endToken);
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

export function isPointWithinArea(
    point: [x: number, y: number],
    bounds: BoundBox2): boolean {

    const [xPt, yPt] = point;
    const [xmin, ymin, xmax, ymax] = bounds;

    return (xPt > xmin && xPt < xmax && yPt > ymin && yPt < ymax);
}

export function areasOverlap(
    area1: BoundBox2,
    area2: BoundBox2
): boolean {
    const [xmin, ymin, xmax, ymax] = area1;
    const pt1: [x: number, y: number] = [xmin, ymin];
    const pt2: [x: number, y: number] = [xmin, ymax];
    const pt3: [x: number, y: number] = [xmax, ymin];
    const pt4: [x: number, y: number] = [xmax, ymax];

    return isPointWithinArea(pt1, area2)
        || isPointWithinArea(pt2, area2)
        || isPointWithinArea(pt3, area2)
        || isPointWithinArea(pt4, area2);
}

export function sequenceActionString(sequenceAction: SequenceAction): string {
    const tmp = [...sequenceAction];
    const action = tmp[0];

    if (action === SequenceAction.Wire) {
        tmp[2] = tmp[2].map(item2 => {
            const lengthValue = item2.value as UnitDimension;

            const useValue = [item2.direction];
            if (lengthValue !== null){
                useValue.push(lengthValue.value);
                useValue.push(lengthValue.type);
            }

            return useValue.join(",");
        }).join(" ");
    } else if (action === SequenceAction.Frame) {
        tmp[1] = sequenceAction[1].frameId;
    } else if (action !== SequenceAction.WireJump) {
        const [, component] = sequenceAction;
        if (component instanceof ClassComponent){
            tmp[1] = sequenceAction[1].instanceName;
        }
    }

    return tmp.join(" | ");
}

export function generateDebugSequenceAction(sequence: SequenceItem[]): string[] {
    const variableMapping = new Map<string, ClassComponent>();

    // In the sequence, resolve assigned name to the components
    return sequence.map(item => {
        const returnResult = [...item];

        const [action,] = item;
        if (action === SequenceAction.Assign) {
            const [, name, component] = item as SequenceActionAssign;
            variableMapping.set(name, component);

        } else {
            if (action === SequenceAction.At || action === SequenceAction.To) {
                const [, component,] = item as SequenceActionAtTo;

                const foundIndex = Array.from(variableMapping.values()).findIndex(item2 => {
                    if (component._copyFrom !== null) {
                        return component._copyFrom === item2;
                    }

                    return component === item2;
                });

                if (foundIndex !== -1) {
                    const name = Array.from(variableMapping.keys())[foundIndex];
                    returnResult[1] = name + ':' + component._copyID;
                }
            }
        }

        return returnResult;
    });
}

export function getBlockTypeString(type: BlockTypes): string {
    let returnValue = 'branch';
    switch (type) {
        case BlockTypes.Branch:
            returnValue = 'branch';
            break;
        case BlockTypes.Join:
            returnValue = 'join';
            break;
        case BlockTypes.Parallel:
            returnValue = 'parallel';
            break;
        case BlockTypes.Point:
            returnValue = 'point';
            break;
    }

    return returnValue;
}

export class BaseError extends Error {

    name = 'BaseError';

    message: string;
    
    startToken?: Token;
    endToken?: Token;
    filePath?: string;

    constructor(message: string, startToken?: Token, endToken?: Token, filePath?: string) {
        super(message);
        this.message = message;

        this.startToken = startToken;
        this.endToken = endToken;
        this.filePath = filePath;
    }

    toString(): string {
        const parts = [this.name];
        if (this.startToken){
            const {line, column} = this.startToken;
            if (this.endToken && (this.endToken.line !== this.startToken.line || this.endToken.column !== this.startToken.column)) {
                const endLine = this.endToken.line;
                const endColumn = this.endToken.column + (this.endToken.stop - this.endToken.start);
                parts.push(` at ${line}:${column}-${endLine}:${endColumn}`);
            } else {
                parts.push(` at ${line}:${column}`);
            }
        }

        parts.push(`: ${this.message}`);
        return parts.join('');
    }
}


/** Errors that occur within the lexing of tokens */
export class ParseSyntaxError extends BaseError {
    name = 'ParseSyntaxError';
}

/**
 * Error class for parsing-related failures (i.e. actual execution of the code)
 */
export class ParseError extends ParseSyntaxError {
    name = 'ParseError';
}

/**
 * Error class for runtime execution failures during visitor traversal
 * These should halt execution immediately
 */
export class RuntimeExecutionError extends BaseError {
    name = 'RuntimeExecutionError';
}

/**
 * Error class for rendering-related failures
 */
export class RenderError extends Error {
    public stage?: string;

    constructor(message: string, stage?: string) {
        super(message);
        this.name = 'RenderError';
        this.stage = stage;
    }
}

