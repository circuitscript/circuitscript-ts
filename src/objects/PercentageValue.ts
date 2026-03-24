/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export class PercentageValue {
    value: string | number;

    constructor(value: string | number) {
        this.value = value;
    }

    toString(): string {
        return this.value.toString();
    }

    toNumber(): number {
        return 0;
    }
}
