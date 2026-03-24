/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
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
