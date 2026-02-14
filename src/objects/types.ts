/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CommonTokenStream, ParserRuleContext, Token } from 'antlr4ng';
import { ExecutionContext } from '../execute.js';
import { ClassComponent } from './ClassComponent.js';
import { Net } from './Net.js';
import { NumericValue, PercentageValue } from './ParamDefinition.js';
import { ReferenceTypes } from '../globals.js';
import { RuntimeExecutionError } from '../utils.js';
import { PinDefinition, PinId } from './PinDefinition.js';
import { ScriptContext } from 'src/antlr/CircuitScriptParser.js';
import { SymbolDrawingCommands } from 'src/draw_symbols.js';

export type CFunction = (args: CallableParameter[],
    options?: CFunctionOptions) => CFunctionResult;

export class CFunctionEntry {
    
    // Function name, without namespace/library
    name: string;

    // This may change depending on how the function is imported.
    namespace: string;

    // Holds the original namespace/library of the function entry and does not change.
    originalNamespace: string;

    execute: CFunction;

    uniqueId?: string;
    source?: ParserRuleContext;

    lazyLoaded = false;
    lazyLoader: (() => void) | null = null;

    constructor(namespace: string, name: string, 
        execute: CFunction, source?: ParserRuleContext, 
        uniqueId?: string) {
        
        this.name = name;
        this.namespace = namespace;
        this.originalNamespace = namespace;

        this.execute = execute;
        this.uniqueId = uniqueId;
        this.source = source;
    }

    toString(): string {
        return `[Function: ${this.name}]`;
    }

    getFunctionPath(): string {
        return `${this.namespace}${this.name}`;
    }
};

export type CFunctionOptions = {
    netNamespace?: string,

    // The nth time that the function was called within the executing scope.
    functionCallIndex: number,
}

export type NewContextOptions = {
    netNamespace?: string,
    namespace?: string,

    // The nth time that the function was called within the executing scope.
    functionCallIndex: number,
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
    pin: PinId,
    net: Net
];

export type ComponentPinWireId = [
    component: ClassComponent,
    pin: number,
    wireId: number,
]

export type ComponentPin = [
    component: ClassComponent,
    pinId: PinId
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

    // Stores the access key to retrieve the value from `rootValue`, only used
    // if `value` is a primitive and is a property of some object.
    trailers: (string| ['index', number])[] = [];

    // This indicates the depth within an object, relative to the 
    // rootValue/parentValue.
    trailerIndex = -1;

    type: ReferenceTypes;

    // Stores the final value pointed by the reference (i.e. the actual
    // value of an object property/param)
    value?: any;

    // Nested objects will hold this rootValue reference and this value should be present within
    // the scope's variables property.
    rootValue?: any; // If trailers are available, then this holds the parent
    // object of the trailers

    referenceName = 'AnyReference';

    constructor(refType: {
        found: boolean;
        name?: string;
        trailers?: (string| ['index', number])[];
        trailerIndex: number,
        type?: ReferenceTypes;
        value?: any;
        rootValue?: any;
    }) {

        // Only allow function references to be nested.
        if (refType.value instanceof AnyReference 
            && refType.value.type !== ReferenceTypes.function){
            throw new RuntimeExecutionError("Nested reference types!");
        }

        this.found = refType.found;
        this.name = refType.name;
        
        this.trailers = refType.trailers;
        this.trailerIndex = refType.trailerIndex;

        this.type = refType.type ?? ReferenceTypes.unknown;
        this.value = refType.value;
        this.rootValue = refType.rootValue;
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

        if (this.rootValue) {
            // Have trailers
            const trailersString = this.trailers.join(".");
            if (this.type === 'instance') {
                returnValue = (this.rootValue as ClassComponent).parameters.get(trailersString);
            } else if (this.type === 'variable') {
                returnValue = this.rootValue[trailersString];
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

export enum NetTypes {
    Any = 'any',
    Source = 'source',
}

export class ImportedLibrary {
    libraryName: string;

    context: ExecutionContext;

    importHandlingFlag: ImportFunctionHandling;
    specifiedImports: string[];
    libraryNamespace: string;
    libraryFilePath: string;

    enableRefdesAnnotation = false;

    // If true, generate the external refdes json file.
    enableRefdesAnnotationFile = false;

    // These are needed for the refdes annotation stage.
    tree: ScriptContext;
    tokens: CommonTokenStream;

    constructor(libraryName: string, libraryNamespace: string, 
        libraryFilePath: string,
        tree: ScriptContext, tokens: CommonTokenStream,
        context: ExecutionContext, 
        flag: ImportFunctionHandling, specifiedImports: string[]){
        
        this.libraryName = libraryName;
        this.libraryNamespace = libraryNamespace;
        this.libraryFilePath = libraryFilePath;
        
        this.tree = tree;
        this.tokens = tokens;

        this.context = context;
        this.importHandlingFlag = flag;

        this.specifiedImports = specifiedImports;
    }
}

/**
 * Determines handling of functions within the import/library.
 */
export enum ImportFunctionHandling {
    // Library namespace is needed to reference the function.
    AllWithNamespace = 'all-with-namespace',

    // Library namespace is no longer needed to reference the function. Function
    // should be in the current namespace.
    AllMergeIntoNamespace = 'all-merge-into-namespace',
    SpecificMergeIntoNamespace = 'specific-merge-into-namespace',
}

/** Defines the properties for a given component unit */
export type ComponentUnitDefinition = {
    width: NumericValue | null,
    height: NumericValue | null,
    angle: NumericValue | null,
    followWireOrientation: boolean | null,

    pins: PinDefinition[],

    display: SymbolDrawingCommands | null,
    arrange: any | null,

    suffix: string | null,
}