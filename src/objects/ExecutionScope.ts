/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ClassComponent } from './ClassComponent.js';
import { Net } from './Net.js';
import { CFunction, CFunctionEntry, ComponentPinNet, ComponentPinNetPair, 
    ComponentPinWireId, 
    ImportedModule, 
    ParseSymbolType, ValueType } from './types.js';
import { BlockTypes, LayoutDirection } from '../globals.js';
import { Wire, WireSegment } from './Wire.js';
import { Frame } from './Frame.js';
import { ParserRuleContext } from 'antlr4ng';
import { Property_key_exprContext } from '../antlr/CircuitScriptParser.js';
import { BaseVisitor } from 'src/BaseVisitor.js';
import { PinId } from './PinDefinition.js';
import { RuntimeExecutionError } from '../utils.js';

/** 
 * Handler when property key/value pairs are being parsed. This allows validation 
 * to occur with the key/value pairs immediately and exceptions will have
 * access to the relevant context/token info.
 **/
type OnPropertyHandler = (path: PropertyTreeKey[], value: any, valueContext:ParserRuleContext) => void;

/** 
Stores the path of the property tree, which can have nested properties.
If the property tree contains an item in the array, then it have the word 'index'
as the first item instead of the context.
**/
export type PropertyTreeKey = [ctx: ParserRuleContext, value: any] | ['index', number];

export class ExecutionScope {
    scopeId: number;
    private nets: ComponentPinNetPair[] = [];

    instances: Map<string, ClassComponent> = new Map();

    functions: Map<string, CFunctionEntry> = new Map();

    functionCounter = new Map<CFunction, number>();

    variables: Map<string, ValueType | ClassComponent> = new Map();

    symbols: Map<string, { type: ParseSymbolType }> = new Map();

    // Modules are imported files that contain functions, etc.
    modules: Map<string, ImportedModule> = new Map();

    blockStack: Map<number, BlockStackEntry> = new Map();

    // Used to keep track of properties, nested properties, etc.
    contextStack: ParserRuleContext[] = [];
    onPropertyHandler: OnPropertyHandler[] = [];

    // Store references to the start of context/blocks that can 
    // have 'break' within the execution blocks
    breakStack: ParserRuleContext[] = [];

    wires: Wire[] = [];
    frames: Frame[] = [];

    // Contains the current scope level/depth of execution.
    scopeLevel = 0;
    netCounter = 1;

    /** Counter for unnamed components */
    unnamedCounter = 1;

    currentComponent: ClassComponent | null = null;
    currentPin: PinId | null = null;

    currentWireId = -1;
    currentFrameId = -1;

    // This is the first component in the circuit scope
    componentRoot: ClassComponent | null = null;
    
    // Tracks the counter for copies of each component instance
    // Copies are the same component electrically, but different symbols.
    copyIDs: Map<string, number> = new Map();

    /** circuitscript code is converted into a sequence of smaller execution steps
     * to determine how components are added/joined into the graph. This is important
     * to ensure that the graph construction is done according to user's order.
     * 
     * This allows the implementation of the parser/visitor/executor engine to 
     * be separate from the layout engine. The layout engine only needs to 
     * parse the sequence to generate the desired circuit layout.
     */
    sequence: SequenceItem[] = [];

    private constructor(scopeId: number) {
        this.scopeId = scopeId;
    }

    static scopeId = 0;

    static create(): ExecutionScope {
        const scope = new ExecutionScope(ExecutionScope.scopeId);
        ExecutionScope.scopeId += 1;
        return scope;
    }

    /** Returns the component pin net pair, if the component pin pair matches */
    private findNet(component: ClassComponent, pin: PinId): ComponentPinNetPair | undefined {
        if (!(pin instanceof PinId)){
            throw new RuntimeExecutionError('Invalid value for PinId: ' + pin);
        }

        return this.nets.find(([tmpComponent, tmpPin]) => {
            // Use manual equality, much faster than using lodash
            return tmpComponent.isEqual(component) &&  tmpPin.equals(pin);
        });
    }

    getNetWithName(name: string): Net {
        const found = this.nets.find(([,, net]) => {
            return net.name === name;
        });
        
        return found ? found[2]: null;
    }

    getNetWithNamespacePath(namespace: string, name: string): Net | null {
        const found = this.nets.find(([, , net]) => {
            return net.namespace === namespace && net.name === name
        });

        return found ? found[2] : null;
    }

    hasNet(component: ClassComponent, pin: PinId): boolean {
        return this.findNet(component, pin) !== undefined;
    }

    /** Returns net if found, otherwise returns null */
    getNet(component: ClassComponent, pin: PinId): Net | null {
        const result = this.findNet(component, pin);
        return result ? result[2] : null;
    }

    setNet(component: ClassComponent, pin: PinId, net: Net): void {
        const pair = this.findNet(component, pin)!;
        const result = this.nets.indexOf(pair);

        if (result === -1) {
            this.nets.push([component, pin, net]);
        } else {
            this.nets[result][2] = net;
        }

        component.pinNets.set(pin, net);
    }

    removeNet(component: ClassComponent, pin: PinId): void {
        const pair = this.findNet(component, pin)!;
        const result = this.nets.indexOf(pair);

        if (result !== -1) {
            this.nets.splice(result, 1);
        }

        component.pinNets.delete(pin);
    }

    getNets(): ComponentPinNetPair[] {
        return this.nets;
    }

    dumpNets(): ComponentPinNet[] {
        const sortedNet = [...this.nets].sort((a, b) => {
            const netA = a[2];
            const netB = b[2];

            const netAId = netA.toString();
            const netBId = netB.toString();

            if (netAId > netBId) {
                return 1;
            } else if (netAId < netBId) {
                return -1;
            } else {
                return 0;
            }
        });

        return sortedNet.map(([component, pin, net]) => {
            return [net.toString(), component.instanceName, pin.value];
        });
    }

    printNets(): void {
        this.dumpNets().forEach(item => {
            const [netName, instanceName, pin] = item;
            console.log(netName.padEnd(10), '=>', instanceName, pin);
        });
    }

    setVariable(name: string, value: any): void {
        this.variables.set(name, value);
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

    /** Sets current insertion point in the scope */
    setCurrent(component: ClassComponent | null, pin: PinId | null = null): void {
        this.currentComponent = component;
        if (component !== null) {
            this.currentPin = (pin === null) ? component.getDefaultPin() : pin;
        } else {
            this.currentPin = null;
        }
    }

    enterContext(context: ParserRuleContext): void {
        this.contextStack.push(context);
    }

    exitContext(): ParserRuleContext {
        return this.contextStack.pop()!;
    }

    private findPropertyKeyTree(visitor: BaseVisitor): PropertyTreeKey[] {
        // Keep searching up the context stack to get the name
        const keyNames: PropertyTreeKey[] = [];

        for (let i = this.contextStack.length - 1; i >= 0; i--) {
            const ctx = this.contextStack[i];
            if (ctx instanceof Property_key_exprContext) {
                const result = visitor.visitResult(ctx);
                keyNames.push([ctx, result]);
            } else if (typeof ctx === 'number') {
                keyNames.push(['index', ctx]);
            }
        }

        return keyNames.reverse();
    }

    setOnPropertyHandler(handler:OnPropertyHandler):void{
        this.onPropertyHandler.push(handler);
    }

    popOnPropertyHandler(): OnPropertyHandler {
        return this.onPropertyHandler.pop()!;
    }

    triggerPropertyHandler(visitor: BaseVisitor, value: any, 
        valueCtx:ParserRuleContext): void {
        
        const lastHandler = this.onPropertyHandler[this.onPropertyHandler.length-1];
        const propertyTree = this.findPropertyKeyTree(visitor);
        lastHandler && lastHandler(propertyTree, value, valueCtx);
    }
    
    getInstances(): ClassComponent[] {
        return Array.from(this.instances.values());
    }

    copyTo(scope: ExecutionScope): void {
        // Copies functions, variables to the provided scope
        this.functions.forEach((value, key) => {
            scope.functions.set(key, value);
        });

        this.variables.forEach((value, key) => {
            scope.variables.set(key, value);
        });
    }
}

export enum SequenceAction {
    // Link current insertion point to component pin
    To = 'to',

    // Move insertion point at component pin
    At = 'at',

    // Link current insertion point with wire of given segments
    Wire = 'wire',

    // Jump to wire with target ID. Pin 0 of wire is the start of the 
    // wire, pin 1 is the other end of the wire.
    WireJump = 'wire-jump',

    // Creates a new frame group
    Frame = 'frame',

    Assign = 'assign',
}

export enum FrameAction {
    Enter = 'enter',
    Exit = 'exit',
}

export enum ActiveObject {
    Frame = 'frame',
    Wire = 'wire',
}


export type SequenceActionAtTo = [SequenceAction.To | SequenceAction.At, 
    ClassComponent, pinId: number, LayoutDirection?, string?];
export type SequenceActionWire = [SequenceAction.Wire, wireId: number, 
    WireSegment[], wire:Wire];

export type SequenceActionAssign = [SequenceAction.Assign, variable: string, ClassComponent];

export type SequenceItem =
    SequenceActionAtTo
    | SequenceActionWire
    | [SequenceAction.WireJump, wireId: number, pinId: PinId, wire: Wire]
    | [SequenceAction.Frame, Frame, "enter" | "exit"]
    | SequenceActionAssign
    ;


export type InnerBlockStackEntry = {
    last_net: ComponentPinWireId | null,
    ignore_last_net: boolean
}

export type BlockStackEntry = {
    start_point: ComponentPinWireId,
    end_point: ComponentPinWireId | null,
    inner_blocks: Map<number, InnerBlockStackEntry>,
    current_index: number,
    type: BlockTypes,
}