/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Token } from 'antlr4ng';
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

export type FunctionDefinedParameter = 
    [name: string, token: Token, defaultValue: ValueType] 
    | [name: string, token: Token];


export class UndeclaredReference {
    reference: ReferenceType;

    constructor(reference: ReferenceType) {
        this.reference = reference;
    }

    throwMessage(): string{
        return `Unknown symbol: ${this.reference.name}`;
    }

    toString(): string {
        return 'undefined';
    }

    nameString(): string {
        const {name, trailers = []} = this.reference;
        let extra = '';
        if (trailers.length > 0){
            extra = '.' + trailers.join('.');
        } 
        return name + extra;
    }
}

export class DeclaredReference {

    found: boolean;
    name?: string;
    trailers?: string[];
    type?: 'value' | 'instance' | 'variable';
    value?: any;

    parentValue?: any; // If trailers are available, then this holds the parent
                       // object of the trailers

    constructor(refType: ReferenceType) {
        this.found = refType.found;
        this.name = refType.name;
        this.trailers = refType.trailers;
        this.type = refType.type;
        this.value = refType.value;
        this.parentValue = refType.parentValue;
    }

    toString(): string {        
        return `[DeclaredReference name: ${this.name} trailers:${this.trailers} found: ${this.found}]`;
    }

    toDisplayString(): string {
        let returnValue: any = undefined;

        if (this.parentValue) {
            // Have trailers
            const trailersString = this.trailers.join(".");
            if (this.type === 'instance') {
                returnValue = (this.parentValue as ClassComponent).parameters.get(trailersString);
            } else if (this.type === 'variable') {
                returnValue = this.parentValue[trailersString];
            }
        } else {
            returnValue = this.value;
        }

        if (returnValue !== undefined) {
            if (returnValue !== null) {
                if (returnValue.toDisplayString) {
                    return returnValue.toDisplayString();
                } else {
                    return returnValue.toString();
                }
            } else {
                return 'null';
            }
        }

        throw 'Could not find string value: ' + this;
    }
}

export type ReferenceType =
    {
        found: boolean,
        name?: string,
        trailers?: string[],
        type?: 'value' | 'instance' | 'variable',
        value?: any,
        parentValue?: any,
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