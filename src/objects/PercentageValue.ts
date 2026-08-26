/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Big from "big.js";

export class PercentageValue {
    value: Big;

    constructor(value: string | number) {
        let useNumber = 0;
        if (typeof value === 'string') {
            if (value.lastIndexOf('%') === value.length - 1) {
                // remove the '%' char
                useNumber = Number(value.substring(0, value.length - 1));
            }
        } else {
            useNumber = value;
        }

        if (isNaN(useNumber)) {
            throw "Invalid percentage value";
        }

        this.value = new Big(useNumber);
    }

    toDisplayString(): string {
        return this.toString();
    }

    toString(): string {
        return this.value.toString() + '%';
    }

    toNumber(): number {
        return this.value.toNumber();
    }

    toBigNumber(): Big {
        return this.value;
    }
}
