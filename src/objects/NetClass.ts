import { ParamsContainer } from "./ParamsContainer.js";

export class NetClass extends ParamsContainer {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- must match ParamsContainer.parameters
    constructor(properties: Map<string, any>) {
        super();
        this.parameters = properties;
    }

    get name(): string {
        return this.getParam('name');
    }

    toString(): string {
        return "NetClass: " + this.name;
    }
}