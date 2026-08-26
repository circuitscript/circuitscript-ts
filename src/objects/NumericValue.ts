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

// NaN-like sentinel: represents an unsolved/floating net voltage. Propagates
// through arithmetic and short-circuits comparisons to false, mirroring
// IEEE-754 NaN semantics.
export class HighImpedanceValue {
    // Nominal brand: without a unique member, this class has no fields and is
    // structurally compatible with any type (every object satisfies
    // `toString(): string` via Object.prototype), which breaks TS's ability
    // to narrow it out of a union in `instanceof`-based type guards.
    private readonly __brand = "HighImpedanceValue";

    toString(): string {
        return "[HighImpedance]";
    }
}

export const HIGH_IMPEDANCE = new HighImpedanceValue();

export function isHighImpedance(value: unknown): value is HighImpedanceValue {
    return value instanceof HighImpedanceValue;
}

export class NumericValue {
    /**
     * This type wraps around values that are parsed from circuitscript code.
     * Ensures that the decimal precision is preserved.
     */

    value: string | number | Big;

    valuePart: Big;
    prefixPart: number;

    tolerances: (NumericValue | PercentageValue)[] = [];

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

    // Used to return a duplicate, without modifying the original
    // value.
    copy(): NumericValue {
        return this.add(0);
    }

    toDisplayString(): string {
        if (typeof this.value  === 'number'){
            return this.value.toString() + this.getToleranceString();
        } else {
            return this.valuePart.toString() 
                + getNumberExponentialText(this.prefixPart) + this.getToleranceString();
        } 
    }

    getToleranceString(): string {
        if (this.tolerances.length > 0){
            if (this.tolerances.length === 1){
                return ' +- ' + this.tolerances[0].toDisplayString();

            } else if (this.tolerances.length === 2){
                return ' +' + this.tolerances[0].toDisplayString() + '/-' + this.tolerances[1].toDisplayString();
            }
        }
        return '';
    }

    toNumber(): number {
        return this.toBigNumber().toNumber();
    }

    // valuePart and prefixPart are only ever assigned in the constructor, so
    // the scaled Big is stable for the lifetime of the instance and is worth
    // caching - toBigNumber() sits on the hot path of every arithmetic op.
    private scaledValue: Big | undefined;

    toBigNumber(): Big {
        if (this.scaledValue === undefined) {
            this.scaledValue = this.valuePart.mul(
                new Big(
                    Math.pow(10, this.prefixPart)));
        }
        return this.scaledValue;
    }

    div(value: NumericValue | number): NumericValue {
        if (typeof value === 'number') {
            value = numeric(value);
        }

        const result = resolveToNumericValue(
            this.toBigNumber().div(value.toBigNumber())
        );
        return propagateMultiplicative(this, value, true, result);
    }

    half(): NumericValue {
        return this.div(2);
    }

    mul(value: NumericValue | number): NumericValue {
        if (typeof value === 'number') {
            value = numeric(value);
        }

        const result = resolveToNumericValue(
            this.toBigNumber().mul(value.toBigNumber())
        );
        return propagateMultiplicative(this, value, false, result);
    }

    add(value: NumericValue | number): NumericValue {
        if (typeof value === 'number') {
            value = numeric(value);
        }

        const result = resolveToNumericValue(
            this.toBigNumber().add(value.toBigNumber())
        );
        return propagateAdditive(this, value, false, result);
    }

    sub(value: NumericValue | number): NumericValue {
        if (typeof value === 'number') {
            value = numeric(value);
        }

        const result = resolveToNumericValue(
            this.toBigNumber().sub(value.toBigNumber())
        );
        return propagateAdditive(this, value, true, result);
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
        const result = resolveToNumericValue(
            this.toBigNumber().neg()
        );
        const t = getAbsoluteTolerance(this);
        return applyAbsoluteTolerance(result, t.minus, t.plus);
    }

    eq(value: NumericValue | number | HighImpedanceValue): boolean {
        if (isHighImpedance(value)) {
            return false;
        }
        if (typeof value === 'number') {
            value = numeric(value);
        }
        return this.toBigNumber().eq(value.toBigNumber());
    }

    floor(): NumericValue {
        return numeric(Math.floor(this.toNumber()));
    }

    ceil(): NumericValue {
        return numeric(Math.ceil(this.toNumber()));
    }

    // Change the value to a rounded dp with fixed precision.
    roundDp(): NumericValue {
        const rounded = roundValue(this.toNumber());
        if (this.hasTolerances()) {
            rounded.setTolerances(this.tolerances);
        }
        return rounded;
    }

    hasTolerances(): boolean {
        return this.tolerances.length > 0;
    }

    setTolerances(tolerances: (PercentageValue| NumericValue)[]): void {
        if (Array.isArray(tolerances)) {
            tolerances.forEach(item => {
                if (item instanceof NumericValue && item.hasTolerances()) {
                    throw "Invalid tolerance value";
                }
            });

            this.tolerances = [...tolerances];

        } else {
            throw "Invalid format for tolerances";
        }
    }
}

export type NumberOperatorType = NumericValue | PercentageValue
                                | WrappedNumber;

function isPercentage(value: NumberOperatorType): value is PercentageValue {
    return value instanceof PercentageValue;
}

// Resolves a PercentageValue operand against a numeric "base" operand,
// returning the equivalent absolute Big value: (pct/100) * base.
function percentAgainstBase(pct: PercentageValue, base: NumberOperatorType): Big {
    return pct.toBigNumber().div(100).mul(base.toBigNumber());
}

function resolveToPercentageValue(value: Big): PercentageValue {
    return new PercentageValue(value.toNumber());
}

// Resolves a NumericValue's tolerances into absolute Big plus/minus bounds
// relative to its own nominal value. Zero tolerances => {plus: 0, minus: 0}.
function getAbsoluteTolerance(value: NumericValue): { plus: Big; minus: Big } {
    const base = value.toBigNumber();
    const resolveOne = (item: NumericValue | PercentageValue): Big => {
        if (item instanceof PercentageValue) {
            return item.toBigNumber().div(100).mul(base).abs();
        }
        return item.toBigNumber().abs();
    };

    if (value.tolerances.length === 0) {
        return { plus: new Big(0), minus: new Big(0) };
    } else if (value.tolerances.length === 1) {
        const t = resolveOne(value.tolerances[0]);
        return { plus: t, minus: t };
    } else {
        return {
            plus: resolveOne(value.tolerances[0]),
            minus: resolveOne(value.tolerances[1]),
        };
    }
}

// Attaches absolute plus/minus tolerance bounds to a result NumericValue,
// collapsing to a single symmetric entry when plus === minus.
function applyAbsoluteTolerance(result: NumericValue, plus: Big, minus: Big): NumericValue {
    if (plus.eq(0) && minus.eq(0)) {
        return result;
    }
    if (plus.eq(minus)) {
        result.setTolerances([resolveToNumericValue(plus)]);
    } else {
        result.setTolerances([resolveToNumericValue(plus), resolveToNumericValue(minus)]);
    }
    return result;
}

// Only a NumericValue can carry tolerance; everything else (WrappedNumber,
// PercentageValue) contributes zero tolerance to a propagation.
function getOperandTolerance(v: NumberOperatorType): { plus: Big; minus: Big } {
    if (v instanceof NumericValue) {
        return getAbsoluteTolerance(v);
    }
    return { plus: new Big(0), minus: new Big(0) };
}

// Worst-case linear propagation for addition/subtraction: absolute
// tolerances add. For subtraction (v1 - v2), v1's plus pairs with v2's
// minus (and vice versa) since that's the combination that maximizes /
// minimizes the result.
function propagateAdditive(
    value1: NumberOperatorType,
    value2: NumberOperatorType,
    isSubtraction: boolean,
    result: NumericValue
): NumericValue {
    const t1 = getOperandTolerance(value1);
    const t2 = getOperandTolerance(value2);

    const plus = isSubtraction ? t1.plus.add(t2.minus) : t1.plus.add(t2.plus);
    const minus = isSubtraction ? t1.minus.add(t2.plus) : t1.minus.add(t2.minus);

    return applyAbsoluteTolerance(result, plus, minus);
}

// Worst-case linear propagation for multiplication/division: relative
// (percentage) tolerances add. For division (v1 / v2), v1's plus pairs
// with v2's minus (denominator tolerating low inflates the quotient).
function propagateMultiplicative(
    value1: NumberOperatorType,
    value2: NumberOperatorType,
    isDivision: boolean,
    result: NumericValue
): NumericValue {
    const t1 = getOperandTolerance(value1);
    const t2 = getOperandTolerance(value2);

    const mag1 = value1.toBigNumber().abs();
    const mag2 = value2.toBigNumber().abs();

    const relPlus1 = mag1.eq(0) ? new Big(0) : t1.plus.div(mag1);
    const relMinus1 = mag1.eq(0) ? new Big(0) : t1.minus.div(mag1);
    const relPlus2 = mag2.eq(0) ? new Big(0) : t2.plus.div(mag2);
    const relMinus2 = mag2.eq(0) ? new Big(0) : t2.minus.div(mag2);

    const relPlus = isDivision ? relPlus1.add(relMinus2) : relPlus1.add(relPlus2);
    const relMinus = isDivision ? relMinus1.add(relPlus2) : relMinus1.add(relMinus2);

    const magResult = result.toBigNumber().abs();
    const plus = relPlus.mul(magResult);
    const minus = relMinus.mul(magResult);

    return applyAbsoluteTolerance(result, plus, minus);
}

export class NumberOperator {

    prepare(value: number | NumberOperatorType | HighImpedanceValue): NumberOperatorType | HighImpedanceValue {
        if (typeof value === 'number') {
            return new WrappedNumber(value);
        } else if (isHighImpedance(value)) {
            return value;
        } else if (isReference(value)){
            return value.value;
        } else {
            return value;
        }
    }

    multiply(value1: NumberOperatorType | HighImpedanceValue, value2: NumberOperatorType | HighImpedanceValue)
        : NumberOperatorType | HighImpedanceValue {

        if (isHighImpedance(value1) || isHighImpedance(value2)) {
            return HIGH_IMPEDANCE;
        }

        if (isPercentage(value1) && isPercentage(value2)) {
            // fraction * fraction, converted back to percent
            const frac1 = value1.toBigNumber().div(100);
            const frac2 = value2.toBigNumber().div(100);
            return resolveToPercentageValue(frac1.mul(frac2).mul(100));
        }

        if (isPercentage(value1)) {
            return propagateMultiplicative(value1, value2, false, resolveToNumericValue(
                percentAgainstBase(value1, value2)));
        }

        if (isPercentage(value2)) {
            return propagateMultiplicative(value1, value2, false, resolveToNumericValue(
                percentAgainstBase(value2, value1)));
        }

        const big1 = value1.toBigNumber();
        const big2 = value2.toBigNumber();

        return propagateMultiplicative(value1, value2, false, resolveToNumericValue(
            big1.mul(big2)
        ));
    }

    divide(value1: NumberOperatorType | HighImpedanceValue, value2: NumberOperatorType | HighImpedanceValue)
        : NumberOperatorType | HighImpedanceValue {

        if (isHighImpedance(value1) || isHighImpedance(value2)) {
            return HIGH_IMPEDANCE;
        }

        if (isPercentage(value1) && isPercentage(value2)) {
            // % cancels: plain ratio
            const frac1 = value1.toBigNumber().div(100);
            const frac2 = value2.toBigNumber().div(100);
            return resolveToNumericValue(frac1.div(frac2));
        }

        if (isPercentage(value1)) {
            // Percent ÷ Numeric: scale the percent by a plain number
            const frac1 = value1.toBigNumber().div(100);
            const scaled = frac1.div(value2.toBigNumber());
            return resolveToPercentageValue(scaled.mul(100));
        }

        if (isPercentage(value2)) {
            // Numeric ÷ Percent
            return propagateMultiplicative(value1, value2, true, resolveToNumericValue(
                value1.toBigNumber().div(value2.toBigNumber().div(100))));
        }

        const big1 = value1.toBigNumber();
        const big2 = value2.toBigNumber();

        return propagateMultiplicative(value1, value2, true, resolveToNumericValue(
            big1.div(big2)
        ));
    }

    addition(value1: NumberOperatorType | HighImpedanceValue, value2: NumberOperatorType | HighImpedanceValue)
        : NumberOperatorType | HighImpedanceValue {

        if (isHighImpedance(value1) || isHighImpedance(value2)) {
            return HIGH_IMPEDANCE;
        }

        if (isPercentage(value1) && isPercentage(value2)) {
            return resolveToPercentageValue(
                value1.toBigNumber().add(value2.toBigNumber()));
        }

        if (isPercentage(value1)) {
            return resolveToNumericValue(
                value2.toBigNumber().add(percentAgainstBase(value1, value2)));
        }

        if (isPercentage(value2)) {
            return resolveToNumericValue(
                value1.toBigNumber().add(percentAgainstBase(value2, value1)));
        }

        const big1 = value1.toBigNumber();
        const big2 = value2.toBigNumber();

        return propagateAdditive(value1, value2, false, resolveToNumericValue(
            big1.add(big2)
        ));
    }

    subtraction(value1: NumberOperatorType | HighImpedanceValue, value2: NumberOperatorType | HighImpedanceValue)
        : NumberOperatorType | HighImpedanceValue {

        if (isHighImpedance(value1) || isHighImpedance(value2)) {
            return HIGH_IMPEDANCE;
        }

        if (isPercentage(value1) && isPercentage(value2)) {
            return resolveToPercentageValue(
                value1.toBigNumber().sub(value2.toBigNumber()));
        }

        if (isPercentage(value1)) {
            // Percent - Numeric: base is the numeric operand (value2)
            return resolveToNumericValue(
                percentAgainstBase(value1, value2).sub(value2.toBigNumber()));
        }

        if (isPercentage(value2)) {
            // Numeric - Percent: base is value1
            return resolveToNumericValue(
                value1.toBigNumber().sub(percentAgainstBase(value2, value1)));
        }

        const big1 = value1.toBigNumber();
        const big2 = value2.toBigNumber();

        return propagateAdditive(value1, value2, true, resolveToNumericValue(
            big1.sub(big2)
        ));
    }

    // Tolerance is intentionally not propagated through modulus: there is no
    // well-defined worst-case bound for an interval-valued modulus without
    // full interval arithmetic, so the result always has empty tolerances.
    modulus(value1: NumberOperatorType | HighImpedanceValue, value2: NumberOperatorType | HighImpedanceValue)
        : NumberOperatorType | HighImpedanceValue {

        if (isHighImpedance(value1) || isHighImpedance(value2)) {
            return HIGH_IMPEDANCE;
        }

        if (isPercentage(value1) && isPercentage(value2)) {
            return resolveToPercentageValue(
                value1.toBigNumber().mod(value2.toBigNumber()));
        }

        if (isPercentage(value1)) {
            return resolveToNumericValue(
                percentAgainstBase(value1, value2).mod(value2.toBigNumber()));
        }

        if (isPercentage(value2)) {
            return resolveToNumericValue(
                value1.toBigNumber().mod(percentAgainstBase(value2, value1)));
        }

        const big1 = value1.toBigNumber();
        const big2 = value2.toBigNumber();

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

export function roundValue(value: NumericValue | number): NumericValue {
    if (typeof value === "number"){
        value = numeric(value);
    }
    
    return resolveToNumericValue(
        new Big(
            value.toBigNumber().toFixed(7)));
}