import Big from "big.js";
import { BaseVisitor } from "./BaseVisitor.js";
import { ExecutionContext } from "./execute.js";
import { NumericValue, numeric, resolveToNumericValue } from "./objects/NumericValue.js";
import { CallableParameter, CFunctionEntry, ImportedLibrary } from "./objects/types.js";
import { unwrapValue } from "./utils.js";
import { RuntimeExecutionError } from "./errors.js";
import { BaseNamespace } from "./globals.js";
import { ClassComponent } from "./objects/ClassComponent.js";
import { Net } from "./objects/Net.js";

const builtInMethods: [name: string, impl: ((args: any) => any) | null][] = [
    ['enumerate', enumerate],
    ['to_mils', toMils],
    ['range', range],
    ['len', objectLength],
    ['array_push', arrayPush],
    ['array_get', arrayGet],
    ['array_set', arraySet],
    ['print', null],
];

export const buildInMethodNamesList:string[] = builtInMethods.map(item => item[0]);

export function linkBuiltInMethods(context: ExecutionContext, visitor: BaseVisitor): void {
    context.createFunction(BaseNamespace, 'print', (params) => {
        const args = getPositionParams(params);
        const items = args.map(item => {
            return toString(unwrapValue(item));
        });

        if (visitor.printToConsole) {
            console.log('::', ...items);
        }
        const printedValue = items.join(" ");
        visitor.printStream.push(printedValue);

        return [visitor, printedValue];
    });

    builtInMethods.forEach(([functionName, functionImpl]) => {
        if (functionImpl !== null){
            context.createFunction(BaseNamespace, functionName, params => {
                const args = getPositionParams(params);
                const functionReturn = functionImpl(...args);
                return [visitor, functionReturn];
            });
        }
    });
}

function range(...args) {
    let startValue = numeric(0);
    let endValue = numeric(0);

    if (args.length === 1) {
        endValue = args[0] as NumericValue;
    } else if (args.length === 2) {
        startValue = args[0] as NumericValue;
        endValue = args[1] as NumericValue;
    }

    const startValueNum = startValue.toNumber();
    const endValueNum = endValue.toNumber();

    const returnArray = [];
    for (let i = startValueNum; i < endValueNum; i++) {
        returnArray.push(i);
    }

    return returnArray;
}

function enumerate(array:any[]): [index: number, value: any][] {
    if (!Array.isArray(array)) {
        throw "Invalid parameter for enumerate function";
    }
    const output = array.map((item, index) => {
        return [index, item];
    });

    return output;
}

function toMils(value: number | NumericValue): NumericValue {
    let bigValue: Big;
    if (value instanceof NumericValue) {
        bigValue = value.toBigNumber();
    } else {
        if (isNaN(value)) {
            throw "Invalid input for method toMils";
        }

        // Assume is number type
        bigValue = new Big(value as number);
    }

    bigValue = bigValue.div(new Big(25.4 / 1000));
    return resolveToNumericValue(bigValue);
}

function objectLength(obj: any[] | any): NumericValue {
    obj = unwrapValue(obj);

    if (Array.isArray(obj)){
        return numeric(obj.length);
    } else {
        // If object has some length property
        if (obj.length){
            return numeric(obj.length);
        } else {
            throw "Could not get length of object: " + obj;
        }
    }
}

function arrayPush(arrayObject: unknown[], valueToPush: unknown): unknown[] {
    if (!Array.isArray(arrayObject)) {
        throw "Invalid array object to push";
    }
    arrayObject.push(valueToPush);
    return arrayObject;
}

function arrayGet(arrayObject: unknown[], index: number | NumericValue): any {
    if (!Array.isArray(arrayObject)) {
        throw "Invalid array object to get";
    }

    let useValue: number;
    if (index instanceof NumericValue){
        useValue = index.toNumber();
    } else {
        useValue = index;
    }

    if (isNaN(useValue)){
        throw new RuntimeExecutionError("Invalid index for arrayGet");
    }

    return arrayObject[useValue];
}

function arraySet(arrayObject:unknown[], index: number|NumericValue, setValue: any): any {
    if (!Array.isArray(arrayObject)) {
        throw "Invalid array object";
    }

    let useValue: number;
    if (index instanceof NumericValue){
        useValue = index.toNumber();
    } else {
        useValue = index;
    }

    arrayObject[useValue] = setValue;
    return arrayObject;
}

function getPositionParams(params: CallableParameter[]): unknown[] {
    return params.map(([, , value]) => value); 
}

function toString(obj: any): string {
    if (typeof obj === 'string') {
        return `"${obj}"`;
    } else if (typeof obj === 'number') {
        return obj.toString();
    } else if (Array.isArray(obj)) {
        const inner = obj.map(item => toString(item)).join(", ");
        return "[" + inner + "]";
    } else if (obj instanceof NumericValue) {
        // Display as a big number string, instead of numeric value
        return obj.toBigNumber().toString();
    } else if (obj instanceof CFunctionEntry){
        return obj.toString();
    } else if (obj instanceof ImportedLibrary){
        return `[library: ${obj.libraryName}]`;
    } else if (obj instanceof ClassComponent) {
        return `[component: ${obj.instanceName}]`;
    } else if (obj instanceof Net){
        return `[net: ${obj.toString()}]`
    } else {
        if (obj === undefined){
            return 'undefined'; 
        } else if (obj === null){
            return 'null';
        } else if (obj.toDisplayString) {
            return obj.toDisplayString();
        } else if (obj.toString) {
            if (typeof obj === 'object'){
                return JSON.stringify(obj);
            } else {
                return obj.toString();
            }
        } else {
            throw "Could not create string from object: " + obj;
        }
    }
}