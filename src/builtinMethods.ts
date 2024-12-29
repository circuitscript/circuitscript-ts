import { BaseVisitor } from "./BaseVisitor";
import { ExecutionContext } from "./execute";
import { CallableParameter } from "./objects/types";

export function linkBuiltInMethods(context: ExecutionContext, visitor: BaseVisitor): void {
    context.createFunction('print', (params) => {
        const args = getPositionParams(params);
        const items = args.map(item => toString(item));

        if (visitor.printToConsole) {
            console.log('::', ...items);
        }
        const printedValue = items.join(" ");
        visitor.printStream.push(printedValue);

        return [visitor, printedValue];
    });

    const builtIns: [name: string, impl: (args: any) => any][] = [
        ['enumerate', enumerate],
        ['toMils', toMils],
        ['range', range],
        ['len', objectLength],
    ];

    builtIns.forEach(([functionName, functionImpl]) => {
        context.createFunction(functionName, params => {
            const args = getPositionParams(params);
            const functionReturn = functionImpl(...args);
            return [visitor, functionReturn];
        });
    });
}

function range(...args) {
    let startValue = 0;
    let endValue = 0;

    if (args.length === 1) {
        endValue = args[0] as number;
    } else if (args.length === 2) {
        startValue = args[0] as number;
        endValue = args[1] as number;
    }

    const returnArray = [];
    for (let i = startValue; i < endValue; i++) {
        returnArray.push(i);
    }

    return returnArray;
}

function enumerate(array:any[]): [index: number, value: any][] {
    if (!Array.isArray(array)) {
        throw "Invalid parameter for enumerate function!";
    }
    const output = array.map((item, index) => {
        return [index, item];
    });

    return output;
}

function toMils(value: number): number {
    if (isNaN(value)) {
        throw "Invalid input for method toMils";
    }

    return (value as number) / 25.4 * 1000;
}

function objectLength(obj: any[] | any): number {
    if (Array.isArray(obj)){
        return obj.length;
    } else {
        // If object has some length property
        if (obj.length){
            return obj.length;
        } else {
            throw "Could not get length of object: " + obj;
        }
    }
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
    } else {
        if (obj.toString) {
            return obj.toString();
        } else {
            throw "Could not create string from object: " + obj;
        }
    }
}