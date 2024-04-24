import { ExecutionContext } from '../execute.js';
import { ClassComponent } from './ClassComponent.js';
import { Net } from './Net.js';
import { NumericValue, PercentageValue, PinBlankValue } from './ParamDefinition.js';

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
    NumericValue | PercentageValue | PinBlankValue;

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
}

export type ReferenceType =
    {
        found: boolean,
        name?: string,
        trailers?: string[],
        type?: string,
        value?: any
    };