/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ExecutionContext } from '../execute.js';
import { ClassComponent } from './ClassComponent.js';
import { Net } from './Net.js';
import { NumericValue, PercentageValue } from './ParamDefinition.js';

export type CFunction = (args: CallableParameter[],
    options?: CFunctionOptions) => CFunctionResult;

export type CFunctionOptions = {
    netNamespace?: string
}

export type CFunctionResult = [
    executionContext: ExecutionContext, 
    result: ValueType | ClassComponent | null
];

// export type NetMap = Map<ComponentPin, Net>;

export type ComponentPinNet = [
    netName: string, instanceName: string, pin: number];

    // Need to improve name...
export type ComponentPinNetPair = [
    component: ClassComponent,
    pin: number,
    net: Net
];

export type ComponentPin = [
    component: ClassComponent,
    pinId: number|string
];

export type ComplexType = ValueType 
                        | ClassComponent 
                        | UndeclaredReference 
                        | null;

export type ValueType = boolean | number | string |
    NumericValue | PercentageValue;

export type CallableParameter = 
    ['keyword', key: string, value: ValueType] | 
    ['position', key: number, value: ValueType];

export type FunctionDefinedParameter = [name: string, defaultValue: ValueType] 
    | [name: string];


export class UndeclaredReference {
    reference: ReferenceType;

    constructor(reference: ReferenceType) {
        this.reference = reference;
    }

    throwMessage(): string{
        return `Unknown symbol: ${this.reference.name}`;
    }
}

export class DeclaredReference {

    found: boolean;
    name?: string;
    trailers?: string[];
    type?: string;
    value?: any


    constructor(refType: ReferenceType) {
        this.found = refType.found;
        this.name = refType.name;
        this.trailers = refType.trailers;
        this.type = refType.type;
        this.value = refType.value;
    }

    toString(): string {
        return `[DeclaredReference name: ${this.name} trailers:${this.trailers} found: ${this.found}]`;
    }
}

export type ReferenceType =
    {
        found: boolean,
        name?: string,
        trailers?: string[],
        type?: string,
        value?: any
    };

export enum ParseSymbolType {
    Variable = 'variable',
    Function = 'function',

    Undefined = 'undefined',
}

export enum Direction {
    Left = 'left',
    Right = 'right',
    Down = 'down',
    Up = 'up',
}