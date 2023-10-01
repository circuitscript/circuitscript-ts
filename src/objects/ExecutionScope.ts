import lodash from 'lodash';

import { ClassComponent, Component } from './Component';
import { Net } from './Net';
import { CFunction, ComponentPinNet } from './types';
import { LayoutDirection } from '../globals';
import { Wire, WireSegment } from './Wire';

export class ExecutionScope {
    scopeId: number;
    private nets: [Component, number, Net][] = [];

    instances: Map<string, ClassComponent> = new Map();

    functions: Map<string, CFunction> = new Map();

    variables: Map<string, any> = new Map();

    branchStack: Map<number, any> = new Map();

    wires: Wire[] = [];

    indentLevel = 0;
    netCounter = 1;
    unnamedCounter = 1;

    currentComponent: ClassComponent | null = null;
    currentPin: number | null = null;

    currentWireId = -1;

    netGnd: Net | null = null;
    componentGnd: ClassComponent | null = null;
    componentRoot: ClassComponent | null = null;

    // Determines how components are added/joined on the graph graphically.
    // This is very important in "building" up the graph
    // according to the user's order.
    sequence: any[] = [];

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
        const result = this.nets.findIndex(([tmpComponent, tmpPin]) => {
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

    dumpNets(): ComponentPinNet[] {
        const sortedNet = [...this.nets].sort((a, b) => {
            const netA = a[2].name;
            const netB = b[2].name;

            if (netA > netB) {
                return 1;
            } else if (netA < netB) {
                return -1;
            } else {
                return 0;
            }
        });

        return sortedNet.map(([component, pin, net]) => {
            return [net.name, component.instanceName, pin];
        });
    }

    printNets(): void {
        this.dumpNets().forEach(item => {
            const [netName, instanceName, pin] = item;
            console.log(netName.padEnd(10), '=>', instanceName, pin);
        });
    }
}

export enum SequenceAction {
    To = 'to',
    At = 'at',
    Wire = 'wire',

    WireJump = 'wire-jump',
}

export type SequenceItem =
    [SequenceAction.To | SequenceAction.At, ClassComponent, number, LayoutDirection?, string?] |
    [SequenceAction.Wire, number, WireSegment[]] |
    [SequenceAction.WireJump, number];