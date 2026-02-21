
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
