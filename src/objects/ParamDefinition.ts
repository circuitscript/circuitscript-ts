/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
    getNumberExponential, getNumberExponentialText,
    resolveToNumericValue
} from "../utils";
import { Big } from 'big.js';

export class ParamDefinition {
    paramName: string;
    paramValue: string | number | any;

    constructor(paramName: string, paramValue: any) {
        this.paramName = paramName;
        this.paramValue = paramValue;
    }
}

export class NumericValue {
    /**
     * This type wraps around values that are parsed from circuitscript code.
     * Ensures that the decimal precision is preserved.
     */

    value: string | number | Big;

    valuePart: Big;
    prefixPart: number;

    constructor(value: string | number | Big, prefix = 0) {
        this.value = value;
        if (typeof value === 'string') {
            // Extract the prefix value
            const matches = value.match(/^([\d]+(?:.[\d]+)?)([\w]*)$/);
            if (matches) {
                this.valuePart = new Big(matches[1]);
                this.prefixPart = getNumberExponential(matches[2]);
            } else {
                throw new Error("Invalid numeric value: " + value);
            }
        } else {
            this.valuePart = new Big(value);
            this.prefixPart = prefix;
            this.value = this.valuePart.toString()
                + getNumberExponentialText(prefix);
        }
    }

    toString(): string {
        return 'numeric:' + this.value;
    }

    toDisplayString(): string {
        if (typeof this.value  === 'number'){
            return this.value.toString();
        } else {
            return this.valuePart.toString() 
                + getNumberExponentialText(this.prefixPart);
        } 
    }

    toNumber(): number {
        return this.toBigNumber().toNumber();
    }

    toBigNumber(): Big {
        return this.valuePart.mul(
            new Big(
                Math.pow(10, this.prefixPart)))
    }

    div(value: NumericValue | number): NumericValue {
        if (typeof value === 'number') {
            value = numeric(value);
        }

        return resolveToNumericValue(
            this.toBigNumber().div(value.toBigNumber())
        );
    }

    mul(value: NumericValue | number): NumericValue {
        if (typeof value === 'number') {
            value = numeric(value);
        }

        return resolveToNumericValue(
            this.toBigNumber().mul(value.toBigNumber())
        );
    }

    add(value: NumericValue | number): NumericValue {
        if (typeof value === 'number') {
            value = numeric(value);
        }

        return resolveToNumericValue(
            this.toBigNumber().add(value.toBigNumber())
        );
    }

    sub(value: NumericValue | number): NumericValue {
        if (typeof value === 'number') {
            value = numeric(value);
        }

        return resolveToNumericValue(
            this.toBigNumber().sub(value.toBigNumber())
        );
    }

    mod(value: NumericValue | number): NumericValue {
        if (typeof value === 'number') {
            value = numeric(value);
        }

        return resolveToNumericValue(
            this.toBigNumber().mod(value.toBigNumber())
        );
    }

    neg(): NumericValue {
        return resolveToNumericValue(
            this.toBigNumber().neg()
        )
    }

    eq(value: NumericValue): boolean {
        return this.toBigNumber().eq(value.toBigNumber());
    }
}

export function numeric(value: number): NumericValue {
    return new NumericValue(value);
}

export class PercentageValue {
    value: string | number;

    constructor(value: string | number) {
        this.value = value;
    }

    toString(): string {
        return this.value.toString();
    }

    toNumber(): number{
        return 0;
    }
}

/**
 * Wraps the native number type, so that the same operations can be used.
 */
export class WrappedNumber {
    value: number;

    constructor(value: number) {
        this.value = value;
    }

    toString(): string {
        return this.value.toString();
    }

    toNumber(): number {
        return this.value;
    }
}

export type NumberOperatorType = NumericValue | PercentageValue 
                                | WrappedNumber;


export class NumberOperator {

    prepare(value: number | NumberOperatorType): NumberOperatorType {
        if (typeof value === 'number') {
            return new WrappedNumber(value);
        } else {
            return value;
        }
    }

    multiply(value1: NumberOperatorType, value2: NumberOperatorType)
        : NumberOperatorType {

        const big1 = new Big(value1.toNumber());
        const big2 = new Big(value2.toNumber());
        
        return resolveToNumericValue(
            big1.mul(big2)
        );
    }

    divide(value1: NumberOperatorType, value2: NumberOperatorType)
        : NumberOperatorType {
        const big1 = new Big(value1.toNumber());
        const big2 = new Big(value2.toNumber());

        return resolveToNumericValue(
            big1.div(big2)
        );
    }

    addition(value1: NumberOperatorType, value2: NumberOperatorType)
        : NumberOperatorType {

        const big1 = new Big(value1.toNumber());
        const big2 = new Big(value2.toNumber());

        return resolveToNumericValue(
            big1.add(big2)
        );
    }

    subtraction(value1: NumberOperatorType, value2: NumberOperatorType)
        : NumberOperatorType {

        const big1 = new Big(value1.toNumber());
        const big2 = new Big(value2.toNumber());

        return resolveToNumericValue(
            big1.sub(big2)
        );
    }

    modulus(value1: NumberOperatorType, value2: NumberOperatorType)
        : NumberOperatorType {
        
        const big1 = new Big(value1.toNumber());
        const big2 = new Big(value2.toNumber());

        return resolveToNumericValue(
            big1.mod(big2)
        );
    }
}