import { ClassComponent } from './ClassComponent';
import { Net } from './Net';
import { CFunction, ComponentPinNet, ComponentPinNetPair, ValueType } from './types';
import { LayoutDirection } from '../globals';
import { Wire, WireSegment } from './Wire';
import { Frame } from './Frame';

export class ExecutionScope {
    scopeId: number;
    private nets: ComponentPinNetPair[] = [];

    instances: Map<string, ClassComponent> = new Map();

    functions: Map<string, CFunction> = new Map();

    variables: Map<string, ValueType | ClassComponent> = new Map();

    branchStack: Map<number, any> = new Map();

    wires: Wire[] = [];
    frames: Frame[] = [];

    indentLevel = 0;
    netCounter = 1;
    unnamedCounter = 1;

    currentComponent: ClassComponent | null = null;
    currentPin: number | null = null;

    currentWireId = -1;
    currentFrameId = -1;

    netGnd: Net | null = null;

    // This is the main gnd net of the circuit scope
    componentGnd: ClassComponent | null = null;

    // This is the first component in the circuit scope
    componentRoot: ClassComponent | null = null;
    
    // Tracks the counter for copies of each component instance
    // Copies are the same component electrically, but different symbols.
    copyIDs: Map<string, number> = new Map();

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

    private findNet(component: ClassComponent, pin: number): ComponentPinNetPair {
        return this.nets.find(([tmpComponent, tmpPin]) => {
            // Use manual equality, much faster than using lodash
            return tmpComponent.isEqual(component) && tmpPin === pin;
        });
    }

    hasNet(component: ClassComponent, pin: number): boolean {
        return this.findNet(component, pin) !== undefined;
    }

    getNet(component: ClassComponent, pin: number): Net {
        const result = this.findNet(component, pin);
        if (result) {
            return result[2]; // net
        }

        return null;
    }

    setNet(component: ClassComponent, pin: number, net: Net): void {
        const pair = this.findNet(component, pin);
        const result = this.nets.indexOf(pair);

        if (result === -1) {
            this.nets.push([component, pin, net]);
        } else {
            this.nets[result][2] = net;
        }
    }

    removeNet(component: ClassComponent, pin: number): void {
        const pair = this.findNet(component, pin);
        const result = this.nets.indexOf(pair);

        if (result !== -1) {
            this.nets.splice(result, 1);
        }
    }

    getNets(): ComponentPinNetPair[] {
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
    
    setActive(type: ActiveObject, item: any): void {
        // Reset the state and ensure that only one of the 
        // active object is selected.

        this.clearActive();

        if (type === ActiveObject.Wire) {
            this.currentWireId = item;
        } else if (type === ActiveObject.Frame) {
            this.currentFrameId = item;
        }
    }

    clearActive(): void {
        // Clears any current selected wire or frame
        this.currentWireId = -1;
        this.currentFrameId = -1;
    }
}

export enum SequenceAction {
    To = 'to',
    At = 'at',
    Wire = 'wire',

    WireJump = 'wire-jump',

    Frame = 'frame',
}

export enum FrameAction {
    Enter = 'enter',
    Exit = 'exit',
}

export enum ActiveObject {
    Frame = 'frame',
    Wire = 'wire',
}


export type SequenceItem =
    [SequenceAction.To | SequenceAction.At, ClassComponent, number, LayoutDirection?, string?]
    | [SequenceAction.Wire, number, WireSegment[]]
    | [SequenceAction.WireJump, number]
    | [SequenceAction.Frame, Frame, "enter" | "exit"]
    ;
