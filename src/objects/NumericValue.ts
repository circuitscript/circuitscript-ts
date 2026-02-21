/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
    isReference
} from "../utils.js";
import { Big } from 'big.js';
import { PercentageValue } from "./PercentageValue.js";
import { WrappedNumber } from "./WrappedNumber.js";

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

    half(): NumericValue {
        return this.div(2);
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

export type NumberOperatorType = NumericValue | PercentageValue 
                                | WrappedNumber;


export class NumberOperator {

    prepare(value: number | NumberOperatorType): NumberOperatorType {
        if (typeof value === 'number') {
            return new WrappedNumber(value);
        } else if (isReference(value)){
            return value.value;
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

export function numeric(value: number | string): NumericValue {
    return new NumericValue(value);
}export function getNumberExponentialText(value: number): string {
    switch (value) {
        case -15:
            return 'f';
        case -12:
            return 'p';
        case -9:
            return 'n';
        case -6:
            return 'u';
        case -3:
            return 'm';

        case 3:
            return 'k';
        case 6:
            return 'M';
        case 9:
            return 'G';

        case 0:
        default:
            return '';
    }
}
export function getNumberExponential(value: string): number {
    value = value.trim();
    switch (value) {
        case 'G':
            return 9;
        case 'M':
            return 6;
        case 'k':
        case 'K':
            return 3;
        case 'm':
            return -3;
        case 'u':
            return -6;
        case 'n':
            return -9;
        case 'p':
            return -12;
        case 'f':
            return -15;
        default:
            return 0;
    }
}

export function resolveToNumericValue(value: Big): NumericValue {
    // find the nearest exponential value
    if (value.toNumber() === 0) {
        return new NumericValue(0);
    }

    const isNeg = value.lt(0);
    const positiveValue = isNeg ? value.neg() : value;
    const prefixPart = Math.floor(Math.log10(positiveValue.toNumber()) / 3);

    let useValue = value;
    if (prefixPart !== 0) {
        const tmpValue1 = positiveValue.div(Math.pow(10, prefixPart * 3));
        useValue = isNeg ? tmpValue1.neg() : tmpValue1;
    }

    return new NumericValue(useValue, prefixPart * 3);
}

export function roundValue(value: NumericValue): NumericValue {
    return resolveToNumericValue(
        new Big(
            value.toBigNumber().toFixed(7)));
}