import { ExecutionContext } from '../execute';
import { ClassComponent } from './Component';
import { NumericValue, PercentageValue, PinBlankValue } from './ParamDefinition';

export type CFunction = (args: CallableParameter[]) => CFunctionResult;

export type CFunctionResult = [
    executionContext: ExecutionContext, 
    result: ValueType | ClassComponent | null
];

// export type NetMap = Map<ComponentPin, Net>;

export type ComponentPinNet = [netName: string, instanceName: string, pin: number];

export type ComponentPin = [
    component: ClassComponent,
    pinId: number|string
];

export type ComplexType = ValueType | ClassComponent | null;

export type ValueType = boolean | number | string | 
    NumericValue | PercentageValue | PinBlankValue;

export type CallableParameter = 
    ['keyword', key: string, value: ValueType] | 
    ['position', key: number, value: ValueType];

export type FunctionDefinedParameter = [name: string, defaultValue: ValueType] 
    | [name: string];