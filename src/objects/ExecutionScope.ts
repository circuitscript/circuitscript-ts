import { ClassComponent, Component } from "./Component.js";
import { Net } from "./Net.js";
import { NetMap } from "./types.js";

export class ExecutionScope {

    scopeId: number;
    nets: NetMap;

    instances: Map<string, ClassComponent | Component> = new Map();

    functions: any;

    variables: any;

    branchStack: any;

    indentLevel = 0;
    netCounter = 1;
    unnamedCounter = 1;

    currentComponent: Component | null = null;
    currentPin: number | null = null;

    constructor(scopeId: number) {
        this.scopeId = scopeId;
    }

    static scopeId = 0;

    static create(): ExecutionScope {
        const scope = new ExecutionScope(ExecutionScope.scopeId);
        ExecutionScope.scopeId += 1;
        return scope;
    }

    hasNet(component: Component, pin: number): boolean {
        return this.nets.has([component, pin]);
    }

    getNet(component: Component, pin: number): Net {
        return this.nets.get([component, pin]);
    }

    setNet(component: Component, pin: number, net: Net): void {
        this.nets.set([component, pin], net);
    }
}