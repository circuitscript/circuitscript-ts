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