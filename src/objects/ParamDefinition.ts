/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export class ParamDefinition {
    paramName: string;
    paramValue: string | number | any;

    constructor(paramName: string, paramValue: any) {
        this.paramName = paramName;
        this.paramValue = paramValue;
    }
}

export class NumericValue {
    value: string | number;

    constructor(value: string | number) {
        this.value = value;
    }

    toString(): string {
        return 'numeric:' + this.value;
    }

    toDisplayString(): string {
        if (typeof this.value  === 'number'){
            return this.value.toString();
            
        } else if (typeof this.value === 'string'){
            return this.value;
        }
    }
}
export class PercentageValue {
    value: string | number;

    constructor(value: string | number) {
        this.value = value;
    }

    toString(): string {
        return this.value.toString();
    }
}

export class PinBlankValue {
    blank: number;

    constructor(value: number) {
        this.blank = value;
    }
}