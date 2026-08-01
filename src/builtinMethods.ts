/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Big from "big.js";
import { BaseVisitor } from "./BaseVisitor.js";
import { ExecutionContext } from "./execute.js";
import { NumericValue, numeric, resolveToNumericValue } from "./objects/NumericValue.js";
import { CallableParameter, CFunctionEntry, ImportedLibrary, NoneValue } from "./objects/types.js";
import { unwrapValue } from "./utils.js";
import { RuntimeExecutionError } from "./errors.js";
import { BaseNamespace, GlobalDocumentName } from "./globals.js";
import { ClassComponent } from "./objects/ClassComponent.js";
import { Net } from "./objects/Net.js";
import { PinId } from "./objects/PinDefinition.js";
import { AllPinTypes, normalizePinType, resolvePinType } from "./objects/PinTypes.js";
import { NetClass } from "./objects/NetClass.js";
import { AcceptedSeverityLevels, ERC_RuleSeverity } from "./rules-check/severity-defaults.js";
import { PercentageValue } from "./objects/PercentageValue.js";

const builtInMethods: [name: string, impl: ((args: any) => any) | null][] = [
    ['enumerate', enumerate],
    ['to_mils', toMils],
    ['range', range],
    ['len', objectLength],
    ['str', strFunction],
    ['array_push', arrayPush],
    ['array_get', arrayGet],
    ['array_set', arraySet],

    // Set pin type
    ['pin_set_type', null],

    // Get pin type
    ['pin_get_type', null],
    
    // Returns true if component has given pin
    ['has_pin', null],
    
    // Methods that are defined at run time
    ['print', null],

    // Sets the ERC level fror the given ERC config
    ['erc_set', null],

    // Returns the ERC level for the given ERC config
    ['erc_get', null],

    // Returns the net of the current cursor
    ['net_get', null],
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

    context.createFunction(BaseNamespace, 'erc_set', (params) => {
        const ruleName = params[0][2];
        const severityLevel = params[1][2];

        // Check that rule exists
        if (ERC_RuleSeverity[ruleName] === undefined){
            throw new RuntimeExecutionError("Invalid rule: " + ruleName);
        }

        if (AcceptedSeverityLevels.indexOf(severityLevel) === -1){
            throw new RuntimeExecutionError("Invalid severity level: " + severityLevel);
        }

        // For initial stage, only have global ERC rules
        const globalDocument = visitor.getScope().variables.get(GlobalDocumentName);
        globalDocument.rules[ruleName] = severityLevel;

        return [visitor];
    });

    context.createFunction(BaseNamespace, 'erc_get', (params) => {
        const ruleName = params[0][2];

        // Check that rule exists
        if (ERC_RuleSeverity[ruleName] === undefined){
            throw new RuntimeExecutionError("Invalid rule: " + ruleName);
        }

        // For initial stage, only have global ERC rules
        const globalDocument = visitor.getScope().variables.get(GlobalDocumentName);
        const result = globalDocument.rules[ruleName] ?? "unknown";

        return [visitor, result];
    });

    context.createFunction(BaseNamespace, 'net_get', (params) => {
        let componentParam;
        let useComponent: ClassComponent;
        let usePinId: PinId;

        if (params.length === 0) {
            // No params specified
            useComponent = visitor.getScope().currentComponent!;
            usePinId = visitor.getScope().currentPin!;
        } else {
            componentParam = params[0][2];
            if (!(componentParam instanceof ClassComponent)) {
                throw new RuntimeExecutionError("Invalid parameter for net_get function, expected a component");
            }

            useComponent = (componentParam as ClassComponent);
            usePinId = useComponent.getDefaultPin();

            if (params.length > 1) {
                const pinId = params[1][2];
                usePinId = useComponent.getPin(PinId.from(pinId));
            }
        }

        const result = visitor.getScope().getNet(useComponent, usePinId);
        return [visitor, result];
    });

    context.createFunction(BaseNamespace, 'pin_set_type', (params) => {
        let useComponent: ClassComponent;
        let usePinId: PinId;

        let newType: string;

        if (params.length === 1) {
            useComponent = visitor.getScope().currentComponent!;
            usePinId = visitor.getScope().currentPin!.getValue();
            newType = params[0][2] as string;
        } else if (params.length === 2){
            useComponent = visitor.getScope().currentComponent!;
            usePinId = params[0][2] as string;
            newType = params[1][2] as string;
        } else {
            useComponent = params[0][2] as ClassComponent;
            usePinId = params[1][2] as string;
            newType = params[2][2] as string;
        }

        if (!(useComponent instanceof ClassComponent)) {
            throw `Invalid parameters for pin_set_type method`;
        }

        newType = normalizePinType(newType);
        if (AllPinTypes.indexOf(newType) === -1) {
            throw `Invalid pin type: ${newType}`;
        }

        usePinId = useComponent.getPin(PinId.from(usePinId));

        if (useComponent.pins.has(usePinId)) {
            useComponent.pins.get(usePinId)!.pinType = resolvePinType(newType);

            // Nothing returned.
            return [visitor];
        }

        throw `Invalid pin ${usePinId} for component ${useComponent}`;
    });

    context.createFunction(BaseNamespace, 'pin_get_type', (params) => {
        let useComponent: ClassComponent;
        let usePinId: PinId;

        if (params.length === 0) {
            useComponent = visitor.getScope().currentComponent!;
            usePinId = visitor.getScope().currentPin!.getValue();
        } else if (params.length === 1) {
            useComponent = visitor.getScope().currentComponent!;
            usePinId = params[0][2] as string;
        } else {
            useComponent = params[0][2] as ClassComponent;
            usePinId = params[1][2] as string;
        }

        if (!(useComponent instanceof ClassComponent)) {
            throw `Invalid parameters for pin_get_type method`;
        }

        usePinId = useComponent.getPin(PinId.from(usePinId));

        if (useComponent.pins.has(usePinId)) {
            return [visitor, useComponent.pins.get(usePinId)!.pinType];
        }

        throw `Invalid pin ${usePinId} for component ${useComponent}`;
    });

    context.createFunction(BaseNamespace, 'has_pin', (params) => {
        let useComponent!: ClassComponent;
        let usePinId!: PinId;

        if (params.length === 1) {
            useComponent = visitor.getScope().currentComponent!;
            usePinId = PinId.from(params[0][2]);
        } else if (params.length === 2) {
            useComponent = params[0][2] as ClassComponent;
            usePinId = PinId.from(params[1][2]);
        } else {
            throw `Invalid parameters for has_pin method`;
        }

        if (!(useComponent instanceof ClassComponent) ||
            (!(usePinId instanceof PinId))) {
            throw `Invalid parameters for has_pin method`;
        }

        return [visitor, useComponent.hasPin(usePinId)];
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
        returnArray.push(numeric(i));
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
        return obj.toDisplayString();
    } else if (obj instanceof PercentageValue) {
        return obj.toString();
    } else if (obj instanceof CFunctionEntry){
        return obj.toString();
    } else if (obj instanceof ImportedLibrary){
        return `[library: ${obj.libraryName}]`;
    } else if (obj instanceof ClassComponent) {
        return `[component: ${obj.instanceName}]`;
    } else if (obj instanceof Net){
        return `[net: ${obj.toString()}]`
    } else if (obj instanceof NetClass) {
        return `[netClass: ${obj.name}]`;
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

function strFunction(object: any): string {
    if (object instanceof NumericValue){
        return object.toDisplayString();
    } else if (object.toString) {
        return object.toString();
    } else {
        throw "str() method failed";
    }
}