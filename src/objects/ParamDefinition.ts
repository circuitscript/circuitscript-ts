
export class ParamDefinition {
    paramName: string;
    paramValue: string | number | any;

    constructor(paramName: string, paramValue: any) {
        this.paramName = paramName;
        this.paramValue = paramValue;
    }
}
