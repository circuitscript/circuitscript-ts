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
