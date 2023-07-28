import { ClassComponent, Component } from "./Component.js";
import { Net } from "./Net.js";
import { CFunction } from "./types.js";
import lodash from 'lodash';

export class ExecutionScope {

    scopeId: number;
    private nets: [Component, number, Net][] = [];

    instances: Map<string, ClassComponent> = new Map();

    functions: Map<string, CFunction> = new Map();

    variables: Map<string, any> = new Map();

    branchStack: any;

    indentLevel = 0;
    netCounter = 1;
    unnamedCounter = 1;

    currentComponent: ClassComponent | null = null;
    currentPin: number | null = null;

    netGnd: Net | null = null;
    componentGnd: ClassComponent | null = null;
    componentRoot: ClassComponent | null = null;

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
        const result = this.nets.find(([tmpComponent, tmpPin, net]) => {
            // lodash isEqual is needed because deep equality is needed
            return lodash.isEqual(component, tmpComponent) && tmpPin === pin;
        });

        return result !== undefined;
    }

    getNet(component: Component, pin: number): Net {
        const result = this.nets.find(([tmpComponent, tmpPin, net]) => {
            // lodash isEqual is needed because deep equality is needed
            return lodash.isEqual(component, tmpComponent) && tmpPin === pin;
        });

        if (result) {
            return result[2]; // net
        }

        return null;
    }

    setNet(component: Component, pin: number, net: Net): void {
        const result = this.nets.findIndex(([tmpComponent, tmpPin, net]) => {
            // lodash isEqual is needed because deep equality is needed
            return lodash.isEqual(component, tmpComponent) && tmpPin === pin;
        });

        if (result === -1) {
            this.nets.push([component, pin, net]);
        } else {
            this.nets[result][2] = net;
        }
    }

    getNets(): [Component, number, Net][] {
        return this.nets;
    }

    printNets(): void {
        this.nets.forEach(([component, pin, net]) => {
            console.log(component.instanceName, pin, '=>', net.name);
        });
    }
}