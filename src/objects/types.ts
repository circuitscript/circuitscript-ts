/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ParserRuleContext, Token } from 'antlr4ng';
import { ExecutionContext } from '../execute.js';
import { ClassComponent } from './ClassComponent.js';
import { Net } from './Net.js';
import { NumericValue, PercentageValue } from './ParamDefinition.js';
import { ReferenceTypes } from '../globals.js';
import { RuntimeExecutionError } from '../utils.js';

export type CFunction = (args: CallableParameter[],
    options?: CFunctionOptions) => CFunctionResult;

export class CFunctionEntry {
    name: string;
    execute: CFunction;
    uniqueId?: string;
    source?: ParserRuleContext;

    constructor(name: string, execute: CFunction, source?: ParserRuleContext, uniqueId?: string) {
        this.name = name;
        this.execute = execute;
        this.uniqueId = uniqueId;
        this.source = source;
    }

    toString(): string {
        return `[Function: ${this.name}]`;
    }
};

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

export type ComponentPinWireId = [
    component: ClassComponent,
    pin: number,
    wireId: number,
]

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

/**
 * Parent class for references to instances, variables, etc.
 */
export class AnyReference {

    // If true, then the value pointed by value or by 
    // (parentValue, value) exists within the current execution scope.
    found = false;

    name?: string;

    // Stores the access key to retrieve the value from `parentValue`, only used
    // if `value` is a primitive and is a property of some object.
    trailers: (string| ['index', number])[] = [];

    type: ReferenceTypes;

    // Stores the final value pointed by the reference (i.e. the actual
    // value of an object property/param)
    value?: any;

    parentValue?: any; // If trailers are available, then this holds the parent
    // object of the trailers

    referenceName = 'AnyReference';

    constructor(refType: {
        found: boolean;
        name?: string;
        trailers?: (string| ['index', number])[];
        type?: ReferenceTypes;
        value?: any;
        parentValue?: any;
    }) {

        // Only allow function references to be nested.
        if (refType.value instanceof AnyReference 
            && refType.value.type !== ReferenceTypes.function){
            throw new RuntimeExecutionError("Nested reference types!");
        }

        this.found = refType.found;
        this.name = refType.name;
        this.trailers = refType.trailers;
        this.type = refType.type ?? ReferenceTypes.unknown;
        this.value = refType.value;
        this.parentValue = refType.parentValue;
    }

    toString(): string {        
        return `[${this.referenceName} name: ${this.name} trailers:${this.trailers} found: ${this.found}]`;
    }
}


export class UndeclaredReference extends AnyReference {
    reference: AnyReference;

    constructor(reference: AnyReference) {
        super(reference);
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

/**
 * Reference that is explicitly declared by the user.
 */
export class DeclaredReference extends AnyReference {

    referenceName = 'DeclaredReference';

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