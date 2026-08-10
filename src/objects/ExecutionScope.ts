/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ClassComponent } from './ClassComponent.js';
import { Net } from './Net.js';
import { CFunction, CFunctionEntry, 
    ComponentPinWireId, 
    ImportedLibrary, 
    ValueType } from './types.js';
import { LayoutDirection } from '../globals.js';
import { BlockTypes } from "./BlockTypes.js";
import { Wire, WireSegment } from './Wire.js';
import { Frame } from './Frame.js';
import { ParserRuleContext } from 'antlr4ng';
import { Property_key_exprContext } from '../antlr/CircuitScriptParser.js';
import { BaseVisitor } from 'src/BaseVisitor.js';
import { PinId } from './PinDefinition.js';
import { NetClass } from './NetClass.js';
import { NetMap } from './NetMap.js';
import { Scenario } from './Scenario.js';

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
    netMap = new NetMap();

    instances: Map<string, ClassComponent> = new Map();

    functions: Map<string, CFunctionEntry> = new Map();

    functionCounter = new Map<CFunction, number>();

    variables: Map<string, ValueType | ClassComponent> = new Map();

    // Libraries are imported files that contain functions, etc.
    libraries: Map<string, ImportedLibrary> = new Map();

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

    // Used to track the last component referenced in graph operations AND
    // in assignment operations.
    lastObjectReference: ClassComponent | Net | NetClass | Frame | null = null;
    
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

    scenario: Scenario| null = null;

    private constructor(scopeId: number, logCallback: any) {
        this.scopeId = scopeId;
        this.netMap.logCallback = logCallback;
    }

    static scopeId = 0;

    static create(logCallback: any): ExecutionScope {
        const scope = new ExecutionScope(ExecutionScope.scopeId, logCallback);
        ExecutionScope.scopeId += 1;
        return scope;
    }

    printNets(): void {
        this.netMap.dump().forEach(item => {
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

        this.lastObjectReference = component;
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