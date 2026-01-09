/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { BlockTypes, ComponentTypes, Delimiter1, FrameType, GlobalNames, 
    NoNetText, ParamKeys, 
    ReferenceTypes, 
    SymbolPinSide} from './globals.js';
import { ExecutionWarning } from "./utils.js";
import { ClassComponent, ComponentUnit, ModuleComponent } from './objects/ClassComponent.js';
import { ActiveObject, ExecutionScope, FrameAction, 
    SequenceAction } from './objects/ExecutionScope.js';
import { Net } from './objects/Net.js';
import { numeric, NumericValue, ParamDefinition } from './objects/ParamDefinition.js';
import { PinDefinition, PinId, PortSide } from './objects/PinDefinition.js';
import { AnyReference, CFunction, CFunctionEntry, CFunctionResult, CallableParameter, ComponentPin, 
    ComponentUnitDefinition, 
    DeclaredReference, 
    Direction,
    ImportFunctionHandling,
    ImportedModule,
    NetTypes} from './objects/types.js';
import { Wire, WireSegment } from './objects/Wire.js';
import { Logger } from './logger.js';
import { Frame } from './objects/Frame.js';
import { CalculatePinPositions } from './layout.js';
import { UnitDimension } from './helpers.js';
import { ParserRuleContext } from 'antlr4ng';
import { PlaceHolderCommands, SymbolDrawingCommands } from './draw_symbols.js';
import { getBlockTypeString, RuntimeExecutionError } from './utils.js';

/** Contains the current running state of the circuit graph */
export class ExecutionContext {

    /** Local name of the execution context.  */
    name: string;      
    
    /** Namespace of current execution context, used for 
     * building the specific name of instances */
    namespace: string; 

    /** Namespace for building nets, split away from instance namespace so 
     * that the net names generated are cleaner. */
    netNamespace: string;

    /** Tracks how nested the current execution context is within the
     * execution stack */
    executionLevel: number;

    /** Contains variables, components within this execution context */
    scope: ExecutionScope;

    tmpPointId = 0;     // Counter for points created within the context

    /** Callback to determine how nets in parent execution contexts are resolved */
    resolveNet: (name: string, netNamespace:string) => ({
        found: boolean, net?: Net
    }) = null;

    resolveComponentPinNet!: (component: ClassComponent, pin: PinId) => Net | null;

    /** If true, then do no evaluate further expressions. 
     * Used for function state control */
    stopFurtherExpressions = false;

    /** Return result of the context */
    returnValue = null;

    /** If true, then do not print any messages */
    silent = false;

    logger: Logger;

    __functionCache = new Map<string, CFunction>();

    parentContext: ExecutionContext;

    // If true, the component angle will be adjusted based on the
    // wire that it is connected to.
    componentAngleFollowsWire = true;

    warnings: ExecutionWarning[] = [];

    // Stores the index for a given parser rule context
    indexedStack = new Map<ParserRuleContext, {
        index: number,
        funcCallIndex: Map<ParserRuleContext, number>
    }>();

    constructor(
        name: string,
        namespace: string,
        netNamespace: string,
        executionLevel = 0,
        scopeLevel = 0,
        silent = false,
        logger: Logger,
        warnings: ExecutionWarning[],

        parent: ExecutionContext
    ) {
        this.name = name;
        this.namespace = namespace;
        this.netNamespace = netNamespace;

        this.executionLevel = executionLevel;
        this.logger = logger;

        this.scope = ExecutionScope.create();
        this.scope.scopeLevel = scopeLevel;

        this.setupRoot();

        this.silent = silent;

        this.log(`create new execution context, namespace: ${this.namespace}, name: ${this.name}, level: ${this.scope.scopeLevel}`);
        this.parentContext = parent;
        this.warnings = warnings;
    }

    logWarning(message: string, context?: ParserRuleContext, fileName?: string): void {
        this.warnings.push({
            message, 
            ctx: context,
            fileName,
        })
    }

    log(...params: any[]): void {
        const indentOutput = ''.padStart(this.scope.scopeLevel * 4, '    ');
        const indentLevelText = this.scope.scopeLevel
            .toString()
            .padStart(3, ' ');

        const args = ['[' + indentLevelText + ']', indentOutput, ...params];

        this.logger.add(args.join(' '));

        if (this.silent) {
            return;
        }
        console.log.apply(null, args);
    }

    /** All scope will always have a root node. This is first added to the
     * canvas */
    private setupRoot(): void {
        const componentRoot = ClassComponent.simple(
            GlobalNames.__root, 1);
        componentRoot.typeProp = ComponentTypes.net;
        componentRoot.addDefaultUnit(this.getPointSymbol());

        this.scope.instances.set(GlobalNames.__root, componentRoot);

        this.scope.setCurrent(componentRoot);
        this.scope.componentRoot = componentRoot;
    }

    getUniqueInstanceName(): string {
        const tmpName = `COMP${Delimiter1}${this.scope.unnamedCounter}`;
        this.scope.unnamedCounter += 1;

        return tmpName;
    }

    private getUniqueNetName(): string {
        const tmpName = `NET${Delimiter1}${this.scope.netCounter}`;
        this.scope.netCounter++;
        return tmpName;
    }

    /** Returns current insertion point within the scope */
    getCurrentPoint(): ComponentPin {
        return [this.scope.currentComponent, this.scope.currentPin];
    }

    /** Connects two component-pin pairs into the same net. If either of
     * the pins have already been assigned nets, the nets with a higher priority
     * number will be used for both pins. Returns the final net that is used.
    */
    private linkComponentPinNet(
        component1: ClassComponent,
        component1Pin: PinId,
        component2: ClassComponent,
        component2Pin: PinId,
    ): Net {
        const net1 = this.scope.getNet(component1, component1Pin);
        const net2 = this.scope.getNet(component2, component2Pin);

        this.log('link nets', component1, component1Pin, net1, 'priority:' + net1?.priority,
            'to', component2, component2Pin, net2, 'priority:' + net2?.priority);

        let returnNet: Net;

        if (net1 === null && net2 === null) {
            // Both nets do not exist yet, so create a new one
            // that both will use.
            const tmpNet = new Net(this.netNamespace, this.getUniqueNetName());

            this.scope.setNet(component1, component1Pin, tmpNet);
            this.scope.setNet(component2, component2Pin, tmpNet);

            returnNet = tmpNet;

        } else if (net1 === null && net2 !== null) {
            // If net1 does not exist, but net2 exists
            this.scope.setNet(component1, component1Pin, net2);
            returnNet = net2;

        } else if (net1 !== null && net2 === null) {
            // If net1 exists, but net2 does not exist
            this.scope.setNet(component2, component2Pin, net1);
            returnNet = net1;

        } else {
            if (net1 !== net2) {
                returnNet = this.mergeNets(net1, net2);
            } else {
                // Otherwise, both nets are the same.
                returnNet = net1;
            }
        }

        this.log('final net after link: ', returnNet, returnNet.priority);

        return returnNet!;
    }

    /** Combines 2 nets into a single net. Component-pin pairs in the nets will
     * also be merged. By default net2 will be merged into net1 and net2 will
     * no longer be used. */
    private mergeNets(net1: Net, net2: Net): Net {
        if (net1 === net2) {
            return net1;
        }

        // Check priority to ensure that net1 always
        // has the higher priority. Swap both nets
        // if this is not the case.
        if (net2.priority > net1.priority) {
            const tmpNet = net1;
            net1 = net2;
            net2 = tmpNet;
        }

        // Get all (component, pin) pairs that are linked to net2
        // and change them to net1
        this.scope.getNets().forEach(([component, pin, net]) => {
            if (Net.isSame(net, net2)) {
                this.scope.setNet(component, pin, net1);
            }
        });

        return net1;
    }

    /** Given the component parameters, returns a component */
    createComponent(
        instanceName: string,
        pins: PinDefinition[],
        params: ParamDefinition[],
        props: {
            arrange?: Map<string, PinId[]>,
            display?: SymbolDrawingCommands,
            type?: string,
            width?: number,
            height?: number,
            copy: boolean,
            angle?: NumericValue,
            followWireOrientation: boolean,

            units: [string, ComponentUnitDefinition][],
        },
        isModule = false
    ): ClassComponent {
        const className = isModule ? ModuleComponent : ClassComponent;
        pins = this.extractPinsFromUnits(props.units);

        const component: ClassComponent = new className(
            instanceName,
            pins.length
        );

        pins.forEach((pin) => {
            component.pins.set(pin.id, pin);
        });

        component.typeProp = props.type ?? null;
        component.copyProp = props.copy ?? false;


        const paramsMap = new Map<string, any>();
        params.forEach((param) => {
            component.parameters.set(param.paramName, param.paramValue);
            paramsMap.set(param.paramName, param.paramValue);
        });
        
        if (component.typeProp === ComponentTypes.net) {
            // If the net name is not defined, then generate a unique net name
            const netName = paramsMap.get(ParamKeys.net_name) ?? this.getUniqueNetName();

            // If net type not defined, use any as default.
            const netType = paramsMap.get(ParamKeys.net_type) ?? NetTypes.Any;

            let priority = 0;
            if (paramsMap.has(ParamKeys.priority)) {
                priority = (paramsMap.get(ParamKeys.priority) as NumericValue).toNumber();
            }

            // Check if the net exists
            const result = this.resolveNet(netName, this.netNamespace);
            let tmpNet: Net;

            if (result.found) {
                tmpNet = result.net!;
                this.log('net found', tmpNet.namespace, tmpNet.name);

            } else {
                tmpNet = new Net(this.netNamespace, netName, priority, netType);
                this.log('net not found, added net instance', 
                    tmpNet.namespace, tmpNet.name);
            }

            // Assume net is on 1 pin for now
            const defaultPin = new PinId(1);
            this.scope.setNet(component, defaultPin, tmpNet);
            this.log('set net', netName, 'component', component, defaultPin);
        }
        
        this.scope.instances.set(instanceName, component);

        const pinsOutput = pins.map((pin) => {
            return pin.id + ':' + pin.name;
        });

        this.log(
            'add symbol',
            instanceName,
            '[' + pinsOutput.join(', ') + ']',
        );

        component.units = this.generateComponentUnits(props.units, component);
        component.refreshPinUnitMap();

        return component;
    }

    private extractPinsFromUnits(units: [key: string, ComponentUnitDefinition][]): PinDefinition[] {
        const pins: PinDefinition[] = [];
        units.forEach(([, definition]) => {
            pins.push(...definition.pins);
        });
        return pins;
    }

    private generateComponentUnits(units: [key: string, ComponentUnitDefinition][], parent: ClassComponent): ComponentUnit[] {
        return units.map(([key, unitDef]) => {

            unitDef = { ...unitDef }; // Generate a copy

            let useAngle = null;
            const { pins } = unitDef;

            const pinsMap = new Map<PinId, PinDefinition>();
            pins.forEach(pin => {
                pinsMap.set(pin.id, pin);
            });

            if (unitDef.angle) {
                // Make sure it is within 0 to 360
                useAngle = unitDef.angle.toNumber() % 360;
                if (useAngle < 0) {
                    useAngle += 360;
                }
            }

            if (unitDef.display === null && unitDef.arrange === null) {
                // If display is not defined and arrange is not defined, then
                // automatically populate the arrange prop with a predefined pin
                // arrangement.

                const tmpArrangeLeft: PinId[] = [];
                const tmpArrangeRight: PinId[] = [];

                // TODO: pins should be sorted!
                pins.forEach((pin, index) => {
                    const useArray = (index % 2 === 0) ? tmpArrangeLeft : tmpArrangeRight;
                    useArray.push(pin.id);
                });

                const arrangeProp = new Map<string, PinId[]>([
                    [SymbolPinSide.Left, tmpArrangeLeft],
                    [SymbolPinSide.Right, tmpArrangeRight]
                ]);

                unitDef.arrange = arrangeProp;
            }

            // Remove duplicates from component.arrangeProps
            if (unitDef.arrange !== null) {
                unitDef.arrange = this.removeArrangePropDuplicates(unitDef.arrange);
                const arrangePropPins = this.getArrangePropPins(unitDef.arrange);

                pins.forEach(pin => {
                    if (arrangePropPins.find(id => id.equals(pin.id)) === undefined) {
                        // Pin not found in the arrange props, show a warning
                        this.logWarning(`Pin ${pin.id} is not specified in arrange property`);
                    }
                });

            } else {
                unitDef.arrange = null;
            }

            unitDef.angle = useAngle ?? 0;

            // Determine the side for each pin and update the
            // pin definition
            const { pins: pinSides, maxPositions } =
                getPortSide(pinsMap, unitDef.arrange);

            const pinIdKeys = Array.from(pinsMap.keys());

            pinSides.forEach(({ pinId, side, position }) => {
                const matchedPinId = pinIdKeys.find(id => id.equals(pinId));
                if (matchedPinId) {
                    const tmpPin = pinsMap.get(matchedPinId)!;
                    tmpPin.side = side;
                    tmpPin.position = position;
                } else {
                    throw 'Not found!';
                }
            });

            const componentUnit = new ComponentUnit(key, parent);

            componentUnit.widthProp = unitDef.width;
            componentUnit.heightProp = unitDef.height;
            componentUnit.angleProp = unitDef.angle;
            componentUnit.followWireOrientationProp = unitDef.followWireOrientation;

            componentUnit.pins = pinsMap;
            componentUnit.pinsFlat = pins;

            componentUnit.numPins = unitDef.pins.length;

            componentUnit.pinsMaxPositions = maxPositions;

            componentUnit.displayProp = unitDef.display;
            componentUnit.arrangeProps = unitDef.arrange;
            
            componentUnit.suffix = unitDef.suffix ?? null;

            return componentUnit;
        });
    }

    private removeArrangePropDuplicates(arrangeProp: Map<string, PinId[]>)
        : Map<string, PinId[]> {
        
        const sides = [
            SymbolPinSide.Left,
            SymbolPinSide.Right,
            SymbolPinSide.Top,
            SymbolPinSide.Bottom
        ];

        const result = new Map();
        const seenIds: PinId[] = [];

        sides.forEach(side => {
            let items = arrangeProp.get(side) ?? [];

            // If there is only a single pin specified, then it will need
            // to be wrapped in an array.
            if (!Array.isArray(items)){
                items = [items];
            }

            // Convert items to PinId objects
            items = items.map(item => {
                if (item instanceof NumericValue) {
                    item = item.toNumber();
                }

                if (item instanceof PinId) {
                    return item;
                } else if (PinId.isPinIdType(item)) {
                    return new PinId(item);
                }

                return item;
            });

            arrangeProp.set(side, items);

            
            if (!Array.isArray(items)) {
                items = [items];
            }

            const uniqueItems: PinId[] = [];

            items.forEach(item => {
                // Only if valid PinId, then check for duplicates
                if (item instanceof PinId) {
                    const found = seenIds.find(id => id.equals(item));
                    if (!found) {
                        seenIds.push(item);
                        uniqueItems.push(item);
                    } else {
                        this.logWarning(`Pin ${item.toString()} specified more than once in arrange property`);
                    }
                } else {
                    // Otherwise if not numeric value, then probably
                    // an array to indicate the blank values
                    uniqueItems.push(item);
                }
            });

            result.set(side, uniqueItems);
        });

        return result;
    }

    private getArrangePropPins(arrangeProps: Map<string, PinId[]>): PinId[] {
        const pins: PinId[] = [];
        const sides = [
            SymbolPinSide.Left,
            SymbolPinSide.Right,
            SymbolPinSide.Top,
            SymbolPinSide.Bottom
        ];

        sides.forEach(side => {
            const items = arrangeProps.get(side);
            if (items) {
                items.forEach(item => {
                    if (item instanceof PinId){
                        pins.push(item);
                    }
                });
            }
        });

        return pins;
    }

    printPoint(extra = ''): void {
        let netString = NoNetText;

        if (this.scope.currentComponent === null || this.scope.currentPin === null){
            this.log(
                (extra !== '' ? (extra + ' ') : '') + 'point is null'
            );
            return;
        }

        if (this.scope.hasNet(
            this.scope.currentComponent,
            this.scope.currentPin
        )) {
            netString = this.scope
                .getNet(this.scope.currentComponent, this.scope.currentPin)
                .toString();
        }

        this.log(
            (extra !== '' ? (extra + ' ') : '') + 'point: ' +
            this.scope.currentComponent.instanceName +
            ' ' +
            this.scope.currentPin + ' ' + netString
        );
    }

    addComponentExisting(component: ClassComponent, pin: PinId): ComponentPin {
        const nextPin = component.getNextPinAfter(pin);

        this.applyComponentAngleFromWire(component, pin);

        // Connect previous position to the component pin
        this.toComponent(component, pin, {addSequence: true});

        // Continue the circuit graph from the next pin of the component
        this.log('move to next pin: ' + nextPin);
        this.atComponent(component, nextPin, {
            addSequence: true
        });

        return this.getCurrentPoint();
    }

    toComponent(
        component: ClassComponent,
        pinId: number | null,
        options?: {
            addSequence?: boolean,
        }): ComponentPin {
        this.log('to component');

        const { addSequence = false } = options ?? {};
        
        if (!(component instanceof ClassComponent)){
            throw new RuntimeExecutionError("Not a valid component!");
        }

        if (pinId === null) {
            pinId = component.getDefaultPin();
        } else {

            if (component.hasPin(pinId)) {
                pinId = component.getPin(pinId);
            } else {
                console.trace();
                throw new RuntimeExecutionError(
                    'Invalid pin number ' +
                    pinId +
                    ' in ' +
                    component.instanceName
                );
            }
        }

        if (
            this.scope.hasNet(
                this.scope.currentComponent,
                this.scope.currentPin,
            )
        ) {
            this.log(
                'net: ',
                this.scope
                    .getNet(this.scope.currentComponent, this.scope.currentPin)
                    .toString(),
            );
        }

        const linkedNet = this.linkComponentPinNet(
            this.scope.currentComponent,
            this.scope.currentPin,
            component,
            pinId,
        );

        // If wire is connected, then apply the wire orientation, if 
        // applicable.
        this.applyComponentAngleFromWire(component, pinId);
        this.scope.setCurrent(component, pinId);

        this.scope.clearActive();

        if (addSequence) {
            if (this.scope.sequence.length > 0) {
                
                // Prevent component pin from being connected to multiple
                // wires at the same time. This happens if the user tries
                // to add the same (non-net) component at multiple places.
                // if (component.pinWires.has(pinId) && component.typeProp !== ComponentTypes.point) {
                //     // throw "Component pin already connected to wire"
                // }

                // Check if the previous entry is a wire
                const [entryType, , segments]: [SequenceAction, number, WireSegment[]] =
                    this.scope.sequence[this.scope.sequence.length - 1];

                if (entryType === SequenceAction.Wire && isWireSegmentsEndAuto(segments)) {
                    segments[segments.length - 1].until = [
                        component, pinId
                    ];
                }

                component.pinWires.set(pinId, segments);
            }

            this.scope.sequence.push([SequenceAction.To, component, 
                pinId, linkedNet]);
        }

        this.printPoint();

        return this.getCurrentPoint();
    }

    atComponent(
        component: ClassComponent,
        pinId: PinId | null,
        options?: {
            addSequence?: boolean,
        }): ComponentPin {
        this.log('at component');

        const { addSequence = false } = options ?? {};

        let usePinId: PinId;
        if (pinId === null) {
            usePinId = component.getDefaultPin();
        } else if (component.hasPin(pinId)) {
            usePinId = component.getPin(pinId);
        } else {
            throw new RuntimeExecutionError('Invalid pin number ' 
                + pinId + ' in ' + component);
        }

        this.scope.setCurrent(component, usePinId);

        // Check if there is an existing net, otherwise create the net
        if (!this.scope.hasNet(component, usePinId)) {
            const tmpNet = new Net(
                this.netNamespace,
                this.getUniqueNetName()
            );

            this.scope.setNet(component, usePinId, tmpNet);
        }

        // If component is first referenced by this at command, then do not
        // allow it's orientation to be set by wires any more.
        // if (!component.didSetWireOrientationAngle) {
        //     component.didSetWireOrientationAngle = true;
        // }

        // Insertion point is currently at a component pin, so clear
        // any wire/frame selected.
        this.scope.clearActive();

        if (addSequence) {
            this.scope.sequence.push([SequenceAction.At, 
                component, usePinId]);
        }

        this.printPoint();

        return this.getCurrentPoint();
    }

    copyComponent(component: ClassComponent): ClassComponent {
        this.log('create clone of net component:', component);

        // This creates a clone from a given component
        let componentCopy: ClassComponent = null;
        
        if (!this.scope.copyIDs.has(component.instanceName)) {
            this.scope.copyIDs.set(component.instanceName, 0);
        }

        const idNum = this.scope.copyIDs.get(component.instanceName);
        componentCopy = component.clone();
        componentCopy._copyID = idNum;
        componentCopy._copyFrom = component;

        // Set linkIDs to the next value to use
        this.scope.copyIDs.set(component.instanceName, idNum + 1);

        const cloneInstanceName = component.instanceName + ':' + idNum;

        // Add the cloned component
        this.scope.instances.set(cloneInstanceName, 
            componentCopy);
        componentCopy.instanceName = cloneInstanceName;

        const defaultPin = new PinId(1);

        if(this.scope.getNet(component, defaultPin) === null){
            // If component is not in the same scope, then need to 
            // copy the net in the scope itself.
            const foundNet = this.resolveComponentPinNet(component, defaultPin);
            if (foundNet !== null){
                this.log('found net in upper scopes', foundNet);
                this.scope.setNet(component, defaultPin, foundNet);
            }
        }

        // Link pin of cloned component onto the same net
        this.linkComponentPinNet(
            component, defaultPin,
            componentCopy, defaultPin
        );

        this.log('created clone of net component:', cloneInstanceName);

        return componentCopy;
    }

    enterBlocks(blockType: BlockTypes): void {
        // Create object to track all the inner blocks of 
        // the block group

        if (blockType === BlockTypes.Point
            || blockType === BlockTypes.Parallel
            || blockType === BlockTypes.Branch) {

            // For these block types, create a point so that it is easier to
            // connect future components/wires.
            
            const key = getBlockTypeString(blockType);
            this.addPoint(`${Delimiter1}${key}.${this.name}.${this.tmpPointId}`, false);
            this.tmpPointId += 1;
        }

        this.scope.blockStack.set(this.scope.scopeLevel, {
            // Tracks the position when the block is entered
            start_point: [
                this.scope.currentComponent!,
                this.scope.currentPin!,
                this.scope.currentWireId],
            end_point: null,
            inner_blocks: new Map<number, any>(),
            current_index: 0,
            type: blockType,
        });

        this.log('enter blocks');
    }

    exitBlocks(scopeLevel: number | null = null): void {
        if (scopeLevel === null) {
            scopeLevel = this.scope.scopeLevel;
        }

        const stackRef = this.scope.blockStack.get(
            scopeLevel,
        )!;

        const { type: blockType } = stackRef;

        if (blockType === BlockTypes.Join || blockType === BlockTypes.Parallel) {
            // Move to the end location of the first block
            const { end_point: finalPoint } = stackRef;
            const [component, pin, wireId] = finalPoint;

            this.scope.setCurrent(component, pin);
            this.scope.currentWireId = wireId;

            if (wireId !== -1) {
                this.scope.sequence.push([
                    SequenceAction.WireJump, wireId, 1
                ]);
            }
        } else if (blockType === BlockTypes.Point) {
            const { start_point: [component, pin,] } =
                stackRef;

            // Preblock location should be a created point without any wires
            this.atComponent(component, pin, { addSequence: true });
        }

        this.scope.blockStack.delete(scopeLevel);
        this.log('exit blocks');
    }

    closeOpenPathBlocks(): void {
        const scope = this.scope;
        const scopeLevel = scope.scopeLevel;

        if(scope.blockStack.has(scopeLevel)){
            this.exitBlocks();
        }
    }

    enterBlock(blockIndex: number): void {
        // Current net before any blocks is already stored in enterBlocks()
        const stackRef = this.scope.blockStack.get(this.scope.scopeLevel)!;

        const { type: blockType } = stackRef;

        const blockTypeName = getBlockTypeString(blockType);

        // Setup the state for the inner block at the given index
        stackRef.inner_blocks.set(blockIndex, {
            last_net: null,
            ignore_last_net: false,
        });

        if (blockType === BlockTypes.Join || blockType === BlockTypes.Point) {
            // Clear current component, pin, wire before entering the block
            this.scope.setCurrent(null);
            this.scope.currentWireId = -1;

        } else if (blockType === BlockTypes.Parallel) {
            // Move to starting point of the parallel blocks
            const { start_point: [component, pin,] } = stackRef;
            this.atComponent(component, pin, { addSequence: true });
        }

        this.log(`enter inner block of type (${blockTypeName}) >>>`);

        this.scope.scopeLevel += 1;
    }

    exitBlock(blockIndex: number): void {
        const stackRef = this.scope.blockStack.get(this.scope.scopeLevel - 1)!;
        const { type: blockType } = stackRef;

        // Save the last net reference
        const blockIndexRef = stackRef.inner_blocks.get(blockIndex)!;
        blockIndexRef.last_net = [
            this.scope.currentComponent!,
            this.scope.currentPin!,
            this.scope.currentWireId
        ];

        this.scope.scopeLevel -= 1;

        this.log('exit inner block <<<');

        if (blockType === BlockTypes.Branch) {

            // Restore the latest entry in the branch stack
            const { start_point: [component, pin, wireId] } =
                stackRef;

            // Do not duplicate any net symbol since this is a branch
            this.atComponent(component, pin, { addSequence: true });

            if (wireId !== -1) {
                // If previous node is a wire, then jump to END of wire
                const wireObject = this.scope.wires[wireId];
                this.scope.sequence.push([SequenceAction.WireJump, 
                    wireId, PinId.from(1), wireObject]);
            }
        } else if (blockType === BlockTypes.Join || blockType === BlockTypes.Parallel) {
            if (blockIndex === 0) {
                // First join block will determine the final join location

                const pointIdName = `${Delimiter1}${getBlockTypeString(blockType)}`;

                // Add point to current location, start with _join keyword to
                // indicate that this is a point for join keyword
                this.addPoint(`${pointIdName}.${this.name}.${this.tmpPointId}`, false);
                this.tmpPointId += 1;

                stackRef.end_point = [
                    this.scope.currentComponent!,
                    this.scope.currentPin!,
                    this.scope.currentWireId
                ];

            } else {
                const { end_point: finalPoint } = stackRef;
                const [component, pin,] = finalPoint;

                // Link the current component to the join component and join pin
                this.toComponent(component, pin, { addSequence: true });
            }
        }
    }

    atPointBlock(): void {
        const [component, pin,] = this.getPointBlockLocation();
        this.atComponent(component, pin, {
            addSequence: true
        });
    }

    toPointBlock(): void {
        // Point has been specifically created for block, wireId should be -1
        const [component, pin,] = this.getPointBlockLocation();
        this.toComponent(component, pin, {
            addSequence: true
        });
    }

    getPointBlockLocation(): [component: ClassComponent, pin: number, wireId: number] {
        // Returns the position at the nearest `point:` block, searches within
        // previous block stacks
        this.log('get block point');

        for (let i = 0; i < this.scope.scopeLevel; i++) {
            const stackRef = this.scope.blockStack.get(this.scope.scopeLevel - 1 - i)!;
            const { start_point } = stackRef;
            const component: ClassComponent = start_point[0];

            if (component.instanceName.startsWith(`${Delimiter1}point.`)) {
                return start_point;
            }
        }

        this.log('did not find block point');

        return null;
    }

    getParentBreakContext(): null | ParserRuleContext {
        if (this.scope.breakStack.length > 0) {
            return this.scope.breakStack[this.scope.breakStack.length - 1];
        }
        return null;
    }

    addBreakContext(ctx: ParserRuleContext): void {
        this.log('add break context');
        this.scope.breakStack.push(ctx);
        this.indexedStack.set(ctx, {
            index: 0,
            funcCallIndex: new Map(),
        }); // Initialize to 0
    }

    setBreakContextIndex(index: number): void {
        // If the break context is a indexed structure (while, for, function), 
        // then indicates the current index within the structure.
        const latestCtx = this.scope.breakStack[this.scope.breakStack.length - 1];
        if (latestCtx) {
            const current = this.indexedStack.get(latestCtx)!;
            this.indexedStack.set(latestCtx, {
                ...current,
                index,
            });
        }
    }

    /** 
     * This resets the function call counters within the latest breakContext. 
     * It is easier to do this, rather than keep track of all the different 
     * counters for different function contexts.
     */
    resetBreakContextFunctionCalls(): void {
        const latestCtx = this.scope.breakStack[this.scope.breakStack.length - 1];
        if (latestCtx) {
            const current = this.indexedStack.get(latestCtx)!;
            this.indexedStack.set(latestCtx, {
                index: current.index,
                funcCallIndex: new Map(), // Reset the function calls
            });
        }
    }

    popBreakContext(): ParserRuleContext {
        this.log('pop break context');
        // Find the nearest break
        return this.scope.breakStack.pop()!;
    }

    getBreakContext(): ParserRuleContext {
        return this.scope.breakStack[this.scope.breakStack.length-1];
    }

    /**
     * 
     * @param namespace Used to determine where (which module) function was defined
     * @param functionName 
     * @param uniqueId Used if the function does not have a defined name.
     * @param __runFunc 
     */
    createFunction(namespace: string, functionName: string, __runFunc: CFunction,
        source?: ParserRuleContext, uniqueId?: string): void {

        const functionPath = `${namespace}${functionName}`;
        this.scope.functions.set(functionPath, new CFunctionEntry(
            namespace, functionName, __runFunc,
            source,
            uniqueId,
        ));

        this.__functionCache.set(functionPath, __runFunc);
        this.log(`defined new function: ${functionPath}`);
    }

    hasFunction(functionName: string): boolean {
        return this.scope.functions.has(functionName);
    }

    getFunction(functionName: string): CFunctionEntry {
        return this.scope.functions.get(functionName)!;
    }

    /**
     * Resolves a variable, component instance, or function by searching through the execution stack.
     * Searches from most recent to oldest execution context until a match is found.
     */
    resolveVariable(executionStack: ExecutionContext[], idName: string, 
        trailers:string[] = []): AnyReference {

        this.log('resolve variable name:', idName, 'trailers:', trailers);
        const reversed = [...executionStack].reverse();

        for (let i = 0; i < reversed.length; i++) {
            const context = reversed[i];
            const functionPath = `${context.namespace}${idName}`;
            if (context.hasFunction(functionPath)) {
                return new DeclaredReference({
                    found: true,
                    value: context.getFunction(functionPath),
                    type: ReferenceTypes.function,
                    name: idName,
                });

            } else {

                // Go through all modules and check if the id matches any
                // functions within the module.
                const modules = Array.from(context.scope.modules.values());
                for (let j = 0; j < modules.length; j++) {
                    const module = modules[j];
                    if (module.importHandlingFlag === ImportFunctionHandling.AllMergeIntoNamespace ||
                        (module.importHandlingFlag === ImportFunctionHandling.SpecificMergeIntoNamespace
                            && module.specifiedImports.indexOf(idName) !== -1)
                    ) {
                        const moduleContext = module.context;
                        const functionPath = `${moduleContext.namespace}${idName}`;
                        if (module.context.hasFunction(functionPath)) {
                            return new DeclaredReference({
                                found: true,
                                rootValue: module,
                                value: module.context.getFunction(functionPath),
                                type: ReferenceTypes.function,
                                name: idName,
                                trailerIndex: 1,
                                trailers: [idName],
                            });
                        }
                    }
                }

                // Check if the idName is a module name
                let isModule = false;
                if (context.scope.modules.has(idName)) {
                    const module = context.scope.modules.get(idName)!;
                    if (module.importHandlingFlag === ImportFunctionHandling.AllWithNamespace) {
                        // Only if this flag is set, then allow using the
                        // module/namespace.
                        isModule = true;
                    }
                }

                let isVariable = context.scope.variables.has(idName);

                // TODO: idName will not resolve due to different naming
                // format of instances
                let isComponentInstance = context.scope.instances.has(idName);

                if (isModule || isVariable || isComponentInstance) {                    

                    const scopeList = 
                        isModule ? context.scope.modules :
                        (isVariable ? context.scope.variables : context.scope.instances);

                    const useValue = scopeList.get(idName);
                    
                    if (!isComponentInstance && (useValue instanceof ClassComponent)){
                        isComponentInstance = true;
                        isVariable = false;
                    }

                    const referenceType = 
                        isModule ? ReferenceTypes.module :
                        (isVariable ? ReferenceTypes.variable: ReferenceTypes.instance);
                        
                    const tmpReference = this.resolveTrailers(
                        referenceType,
                        useValue, 
                        trailers
                    );

                    return new DeclaredReference({
                        type: referenceType,
                        found: (tmpReference.value !== undefined),
                        rootValue: tmpReference.rootValue,
                        value: tmpReference.value,
                        name: idName,
                        trailers,
                    });
                }
            }
        }

        return new DeclaredReference({
            found: false,
            name: idName,
        });
    }

    /**
     * Resolves property access chains (dot notation) on variables and component instances.
     * For variables, accesses properties directly. For component instances, resolves 
     * parameters from the component's parameter map or associated net parameters.
     * 
     * @param type - reference type for <item>
     */
    resolveTrailers(type: ReferenceTypes, item: any, trailers: string[] = []): AnyReference {
        let rootValue: any;
        let useValue = item;

        if (trailers.length > 0) {
            rootValue = useValue;
            const trailersPath = trailers.join(".");

            switch(type){
                case ReferenceTypes.variable:
                    useValue = rootValue;
                    trailers.forEach(trailerPath => {
                        useValue = useValue[trailerPath];
                    });
                    break;
                    
                case ReferenceTypes.instance: {
                    // If is a net component, then try to access the 
                    // the net instance used globally

                    const tmpComponent = (rootValue as ClassComponent)
                    if (tmpComponent.typeProp === ComponentTypes.net) {
                        const usedNet = this.scope.getNet(tmpComponent, new PinId(1));
                        if (usedNet) {
                            const trailerValue = trailers.join(".");
                            useValue = usedNet.params.get(trailerValue) ?? null;
                        }
                    } else {
                        useValue = (rootValue as ClassComponent)
                            .parameters.get(trailersPath);
                    }
                    break;
                }

                case ReferenceTypes.module: {
                    const funcName = trailers[0];
                    const module = rootValue as ImportedModule;

                    const functionPath = `${module.moduleNamespace}${funcName}`;
                    if (module.context.hasFunction(functionPath)){
                        const foundFunc = module.context.getFunction(functionPath);

                        return new AnyReference({
                            found: true,
                            type: ReferenceTypes.function,
                            rootValue,
                            trailers,
                            trailerIndex: trailers.length,
                            value: foundFunc, 
                        });
                    }

                    break;
                }
            }
        }

        let found = false;
        if (useValue !== undefined){
            found = true;
        } 

        return new AnyReference({
            found, // Always true, assumes that item is not undefined
            type,
            rootValue,
            trailers,
            trailerIndex: trailers.length,
            value: useValue,
        });
    }

    callFunction(
        functionReference: AnyReference,
        functionParams: CallableParameter[],
        executionStack: ExecutionContext[],
        netNamespace: string
    ): CFunctionResult {

        const functionEntry = functionReference.value as CFunctionEntry;
        const { name: functionName,
            execute: __runFunc } = functionEntry;

        // TODO: function caching disabled for now, not sure if caching is 
        // actually useful at this point.
        // let __runFunc: CFunction | null = null;
        // // Function is not cached yet, so look for it
        // if (!this.__functionCache.has(functionName)) {
        //     if (this.hasFunction(functionName)) {
        //         const entry = this.getFunction(functionName);
        //         __runFunc = entry.execute;
        //     }
    
        //     // If the function does not exist in the current execution context,
        //     // then try to search in the upper execution context
        //     if (__runFunc === null) {
        //         this.log(`searching for function ${functionName} in upper context`);

        //         const tmpResolveResult = 
        //             this.resolveVariable(executionStack, functionName);
                
        //         if (tmpResolveResult.found) {
        //             const entry = tmpResolveResult.value as CFunctionEntry;
        //             __runFunc = entry.execute;
        //         } else {
        //             this.log(`Could not find function: ${functionName}`);
        //             throw `Could not find function ${functionName}`;
        //         }
        //     }
        //     this.log('save function to cache:', functionName);
        //     this.__functionCache.set(functionName, __runFunc!);

        // } else {
        //     this.log('found function in cache:', functionName);
        //     __runFunc = this.__functionCache.get(functionName)!;
        // }        

        if (__runFunc !== null) {
            // Get function usage call within the current scope. This is used
            // to identify each unique function call, which is important for
            // refdes assignment.
            let functionCallIndex = -1;
            if (!this.scope.functionCounter.has(__runFunc)){
                this.scope.functionCounter.set(__runFunc, 0);
                functionCallIndex = 0;
            } else {
                functionCallIndex = this.scope.functionCounter.get(__runFunc)!;
            }

            this.scope.functionCounter.set(__runFunc, functionCallIndex + 1);

            this.log(`call function '${functionName}'`);
            this.log(`net namespace: ${netNamespace}`);

            const functionResult = __runFunc(
                functionParams,
                { netNamespace, functionCallIndex });

            this.log(`done call function '${functionName}'`);
            
            return functionResult;
        } else {
            this.log(`Invalid function: ${functionName}`);
            throw `Invalid function '${functionName}'`;
        }
    }

    mergeScope(childScope: ExecutionScope, namespace: string): ClassComponent[] {
        /**
         * Merges a child scope (instances, nets) into the parent scope.
         */
        this.log('-- merging scope to parent --');

        // Save these position first, because this needs to be restored
        // after the merge operation
        const {currentComponent, currentPin, currentWireId} = this.scope;

        // move all instances into the parent scope first, with a namespace extension
        const tmpInstances = childScope.instances;
        const tmpNets = childScope.getNets();

        const mergedInstances: ClassComponent[] = [];

        for (const [instanceName, component] of tmpInstances) {
            // Rename instance names with the addition of the namespace

            // If namespace is not blank string, then append it, otherwise
            // keep the exisiting instanceName.
            const newInstanceName = namespace !== "" ? `${namespace}.${instanceName}`: instanceName;
            component.instanceName = newInstanceName;

            // Do not add root and gnd components of child scope to the
            // parent scope
            if (component === childScope.componentRoot) {
                continue;
            }

            if (!this.scope.instances.has(newInstanceName)) {
                this.scope.instances.set(newInstanceName, component);
            } else {
                throw "Invalid instance name to merge into parent scope!";
            }
            
            mergedInstances.push(component);
        }

        // Get all unique nets in the scope
        const childScopeUniqueNets = new Set<Net>(tmpNets.map(([,,net]) => net));

        // Re-name child scope nets that exist in the parent scope
        childScopeUniqueNets.forEach(net => {
            // If the same net exists, then rename it with a new unique name.
            // Net with priority 0 are generated nets (not user-defined).
            if (net.priority === 0 
                && this.scope.getNetWithNamespacePath(net.namespace, net.name) !== null){
                this.log('net namespace and name already used in parent scope', net);
                
                const newNetName = this.getUniqueNetName();
                net.name = newNetName;
                this.log('assigned new name: ', net);
            }
        });

        // Merge all nets into parent scope
        tmpNets.forEach(([component, pin, net]) => {
            this.scope.setNet(component, pin, net);
        });

        // If true, then __root component of the child_scope will
        // be connected to the current component/pin of the parent
        const linkRootComponent = true;

        const tmpRoot = childScope.componentRoot;

        if (linkRootComponent) {
            // Join the child_scope's __root net to the current component / pin

            // Get the net of the child scope's root
            const netConnectedToRoot = childScope.getNet(tmpRoot!, new PinId(1));

            if (netConnectedToRoot !== null){
                // Only if the child scope root component is connected 
                // to a net, then merge them together.
                let currentNet = this.scope.getNet(
                    currentComponent, currentPin
                );

                if (currentNet === null){
                    // Current net does not exist yet, so create it
                    const tmpNet = new Net(this.netNamespace, 
                        this.getUniqueNetName());
                    
                    this.scope.setNet(
                        currentComponent, currentPin, netConnectedToRoot);
                    currentNet = tmpNet
                }

                // Connect current component to the root component. The final
                // net will depend on the priority.
                this.toComponent(tmpRoot, 1);
            }
        }

        // Merge the sequences together, need to renumber the wire ids.
        const wireIdOffset = this.scope.wires.length;

        // Need to renumber the frame ids too.
        const frameIdOffset = this.scope.frames.length;

        childScope.sequence.forEach(sequenceAction => {
            const [action] = sequenceAction;

            if (action === SequenceAction.Wire) {
                // Need to have new IDs for wires
                const [, innerWireId, segments, wire] = sequenceAction;

                this.scope.sequence.push(
                    [SequenceAction.Wire, wireIdOffset + innerWireId, 
                        segments, wire]
                );

                this.scope.wires.push(new Wire(segments));

            } else if (action === SequenceAction.WireJump) {
                // Wire IDs in wire jumps need to be updated.
                const jumpWireId = wireIdOffset + sequenceAction[1];
                const wireObject = this.scope.wires[jumpWireId];
                this.scope.sequence.push(
                    [SequenceAction.WireJump, jumpWireId, 
                        PinId.from(1), wireObject]
                );

            } else if (action === SequenceAction.At || action === SequenceAction.To) {    
                this.scope.sequence.push(sequenceAction);

            } else if (action === SequenceAction.Frame){
                const frame: Frame = sequenceAction[1];
                const frameAction: string = sequenceAction[2];
                if (frameAction === FrameAction.Enter){
                    frame.frameId += frameIdOffset;   
                    this.scope.frames.push(frame);
                }
                
                this.scope.sequence.push(sequenceAction);
            }
        });

        if (childScope.currentComponent === childScope.componentRoot) {
            // If child scope is current at the root node, then use the 
            // location in the parent scope as the current component 
            // since that would be equivalent
            this.scope.setCurrent(currentComponent, currentPin);
            this.scope.currentWireId = currentWireId;

        } else {
            // Otherwise move the current scope to the current node within 
            // the child scope
            this.scope.setCurrent(childScope.currentComponent, 
                childScope.currentPin);

            this.scope.currentWireId = childScope.currentWireId + wireIdOffset;
        }

        this.printPoint('resume at');
        
        this.log('-- nets --');

        // dump the list of nets in the current scope
        const currentNets = this.scope.getNets();

        currentNets.reduce((accum, [,,net]) => {
            if (accum.indexOf(net) === -1){
                accum.push(net);
                this.log(`${net.namespace}${net.name} ${net.priority}`);
            }
            return accum;
        }, []);

        this.log('-- done merging scope --');

        return mergedInstances;
    }

    addWire(segments: [string, (number | UnitDimension)?][]): Wire {

        if (this.scope.currentComponent === null) {
            throw "No current component";
        }

        const tmp = segments.map(item => {
            const [direction, value = null] = item;

            return {
                direction,
                value
            } as WireSegment
        });

        // This ID is used to identify/jump to wires later
        const wireId = this.scope.wires.length;
        const newWire = new Wire(tmp);
        this.scope.wires.push(newWire);

        const output: string[] = [];
        segments.forEach(item => {

            const tmpArray = item.map(item2 => {
                if (item2 instanceof UnitDimension) {
                    return item2.value;
                } else {
                    return item2;
                }
            });

            output.push(tmpArray.join(","));
        });

        this.log('add wire: ', output.join("|"));

        this.scope.setActive(ActiveObject.Wire, wireId);
        this.scope.sequence.push([SequenceAction.Wire, wireId, tmp, newWire]);

        // if (this.scope.currentComponent.pinWires.has(this.scope.currentPin)) {
        //     throw "Component pin already connected to wire"
        // }

        this.scope.currentComponent.pinWires.set(
            this.scope.currentPin, tmp
        );

        const currentUnit = 
            this.scope.currentComponent.getUnitForPin(this.scope.currentPin!);

        if (!currentUnit.didSetWireOrientationAngle) {
            this.applyComponentAngleFromWire(
                this.scope.currentComponent,
                this.scope.currentPin!, true);
            currentUnit.didSetWireOrientationAngle = true;
        }
        
        return newWire;
    }

    addPoint(pointId: string, userDefined = true): ComponentPin {
        if (this.scope.instances.has(pointId)) {
            this.log('Warning: ' + pointId + ' is being redefined');
        }

        const useName = userDefined ? 'point.' + pointId : pointId;
        const componentPoint = ClassComponent.simple(useName, 1);
        componentPoint.typeProp = ComponentTypes.net;

        let usePointLinkComponent = null;
        if (this.scope.currentComponent._pointLinkComponent) {
            usePointLinkComponent = this.scope.currentComponent!._pointLinkComponent;
        } else {
            usePointLinkComponent = this.scope.currentComponent;
        }

        componentPoint._pointLinkComponent = usePointLinkComponent;
        componentPoint.addDefaultUnit(this.getPointSymbol(useName));

        this.scope.instances.set(pointId, componentPoint);
        this.toComponent(componentPoint, 1, { addSequence: true });

        return this.getCurrentPoint();
    }

    /** Provides the drawing commands for a point object on the canvas */
    private getPointSymbol(name=""): SymbolDrawingCommands {

        const commands = [
            [PlaceHolderCommands.pin,
            [numeric(1), numeric(0), numeric(0),
            numeric(0), numeric(0)],
            new Map([
                ["display_pin_id", false]
            ]),
                null
            ]
        ];

        if (false){
            commands.push(...[
                [PlaceHolderCommands.lineColor,
                ["red"],
                new Map(), null
                ],

                [PlaceHolderCommands.hline,
                [numeric(-25), numeric(0), numeric(50)],
                new Map(),
                    null
                ],

                [PlaceHolderCommands.vline,
                [numeric(0), numeric(-25), numeric(50)],
                new Map(),
                    null
                ],

                [PlaceHolderCommands.hline,
                [numeric(0), numeric(0),
                numeric(10)],

                new Map([]), null
                ],

                [PlaceHolderCommands.text,
                [],
                new Map([
                    ["content", name],
                    ["fontSize", numeric(10)],
                ]),
                    null
                ]
            ]);
        }

        return new SymbolDrawingCommands(() => {
            return commands;
        });
    }

    setProperty(nameWithProp: string, value: any): void {
        this.log('set property', nameWithProp, 'value', value);

        let idName: string;
        let paramName: string;
        
        let useActive = false;

        if (nameWithProp.startsWith('..')){
            useActive = true;
            paramName = nameWithProp.substring(2);
        } else {
            const parts = nameWithProp.split(".");
            idName = parts[0];
            paramName = parts[1];
        }

        if (useActive && this.scope.currentFrameId !== -1) {
            // If there is some frame selected, then update frame params
            this.scope.frames[this.scope.currentFrameId - 1]
                .parameters.set(paramName, value);
        } else {
            idName = this.scope.currentComponent.instanceName;

            // Check if instance exists
            if (this.scope.instances.has(idName)) {
                const component = this.scope.instances.get(idName)!;
                component.setParam(paramName, value);

                const unitModifiers = [
                    ParamKeys.angle,
                    ParamKeys.flip,
                    ParamKeys.flipX,
                    ParamKeys.flipY,
                ];

                if (unitModifiers.indexOf(paramName) !== -1){
                    component.getUnit().setParam(paramName, value);
                }

            } else if (this.scope.variables.has(idName)) {
                throw "Not implemented yet!";
            } else {
                throw "Unknown identifier: " + idName;
            }
        }
    }

    applyComponentAngleFromWire(component: ClassComponent, pin: number, 
        opposite = false): void {
        // By default the last segment of the wire is used. But if opposite
        // is set to true, then use the first segment and also flip the
        // wire direction that is used.

        const targetUnit = component.getUnitForPin(pin);

        if (this.componentAngleFollowsWire 
            && targetUnit.followWireOrientationProp 
            && targetUnit.useWireOrientationAngle
            && !targetUnit.didSetWireOrientationAngle
            && this.scope.currentWireId !== -1) {

            const currentWire = this.scope.wires[this.scope.currentWireId];
            
            let useSegment = currentWire.path[currentWire.path.length - 1];
            if (opposite){
                useSegment = currentWire.path[0];
            }

            // Graphical symbol of component unit is drawn to determine the 
            // pin positions.
            const pinPositions = CalculatePinPositions(targetUnit);

            if (pinPositions.has(pin)){
                const connectedPinPos = pinPositions.get(pin)!;

                // This is the final angle that the component unit will have
                let targetAngle: number | null = null;

                let useDirection = useSegment.direction;
                if (opposite){
                    if (useDirection === Direction.Down){
                        useDirection = Direction.Up;
                    } else if (useDirection === Direction.Up){
                        useDirection = Direction.Down;
                    } else if (useDirection === Direction.Right){
                        useDirection = Direction.Left;
                    } else if (useDirection === Direction.Left){
                        useDirection = Direction.Right;
                    }
                }

                switch (useDirection) {
                    case Direction.Down:
                        targetAngle = 90;
                        break;
                    case Direction.Up:
                        targetAngle = 270;
                        break;
                    case Direction.Right:
                        targetAngle = 0;
                        break;
                    case Direction.Left:
                        targetAngle = 180;
                        break;
                    default:
                        targetAngle = null;
                }

                // If wire direction is auto or auto_, then do not
                // apply the wire orientation
                if (targetAngle === null) {
                    return;
                }
            
                this.log('set component unit angle from wire, target angle:', targetAngle,
                    ', component unit angle:', targetUnit.angleProp, 'pin angle:',
                    connectedPinPos.angle);

                let useAngle = (targetAngle - connectedPinPos.angle.toNumber()) % 360;
                if (useAngle < 0) {
                    useAngle += 360;
                }

                if (useAngle === 90) {
                    // Just rotate the component
                    targetUnit.setParam(ParamKeys.angle, numeric(90));
                } else if (useAngle === 180) {
                    if (targetUnit.angleProp === 0 || targetUnit.angleProp === 180) {
                        targetUnit.setParam(ParamKeys.flipX, 1);
                    } else if (targetUnit.angleProp === 90 || targetUnit.angleProp === 270) {
                        targetUnit.setParam(ParamKeys.flipY, 1);
                    }

                } else if (useAngle === 270) {
                    targetUnit.setParam(ParamKeys.angle, numeric(270));
                }

                targetUnit.wireOrientationAngle = useAngle;
                targetUnit.didSetWireOrientationAngle = true;     
            }
        }
    }

    enterFrame(frameType: FrameType): number {
        // Frame 0 is the 'base' frame
        const frameId = this.scope.frames.length + 1;
        const frameObject = new Frame(frameId, frameType);

        this.log('Enter frame', frameId);

        this.scope.frames.push(frameObject);

        this.scope.sequence.push([SequenceAction.Frame,
            frameObject, FrameAction.Enter]);

        this.scope.currentFrameId = frameId;
        this.scope.setActive(ActiveObject.Frame, frameId);
        
        return frameId;
    }

    exitFrame(frameId: number): void {
        const frame = this.scope.frames[frameId-1];
        this.scope.sequence.push([SequenceAction.Frame,
            frame, FrameAction.Exit]);

        this.log('Leave frame', frameId);
    }
}

function isWireSegmentsEndAuto(segments:WireSegment[]): boolean {
    if (segments.length > 0){
        if (segments[segments.length -1].value === null){
            return true;
        }
    }

    return false;
}

export function getPortSide(pins: Map<PinId, PinDefinition>, arrangeProps: null | Map<string, number[]>): 
    { 
        pins: PortSideItem[],
        maxPositions: Map<string, number>
    } {
    // Takes the arrangeProps and determines how to arrange pins in the symbol.

    const result = [];

    const maxPositions: Map<string, number> = new Map();
    maxPositions.set(SymbolPinSide.Left, 0);
    maxPositions.set(SymbolPinSide.Right, 0);
    maxPositions.set(SymbolPinSide.Top, 0);
    maxPositions.set(SymbolPinSide.Bottom, 0);

    // If arrangeProps are not defined, then follow this sequence to assign
    // the pin positions.
    if (arrangeProps === null) {
        let counter = 0;
        for (const [pinId] of pins) {
            result.push({
                pinId,
                side: counter % 2 === 0 ? PortSide.WEST : PortSide.EAST,
                order: counter,
                position: Math.floor(counter/2),
            });
            counter++;
        }

        const leftSideItems = result.filter(item => {
            return item.side === PortSide.WEST
        });

        const rightSideItems = result.filter(item => {
            return item.side === PortSide.EAST
        });

        maxPositions.set(SymbolPinSide.Left, leftSideItems.length);
        maxPositions.set(SymbolPinSide.Right, rightSideItems.length);

    } else {
        let counter = pins.size;
        const existingPinIds = Array.from(pins.keys());

        for (const [key, items] of arrangeProps) {
            let useItems;
            if (!Array.isArray(items)){
                useItems = [items];
            } else {
                // Do not mutate original array
                useItems = [...items];
            }

            let useSide = PortSide.WEST;
            switch(key){
                case SymbolPinSide.Left:
                    useSide = PortSide.WEST;
                    break;
                case SymbolPinSide.Right:
                    useSide = PortSide.EAST;
                    break;
                case SymbolPinSide.Top:
                    useSide = PortSide.NORTH;
                    break;
                case SymbolPinSide.Bottom:
                    useSide = PortSide.SOUTH;
                    break;
            }

            let position = 0;

            useItems.forEach(item => {
                if (typeof item === 'object' && Array.isArray(item)) {
                    // This is for blank spaces
                    position += (item[0] as NumericValue).toNumber();
                } else {
                    if (existingPinIds.find(id => id.equals(item))) {
                        result.push({
                            pinId: item,
                            side: useSide,
                            position,
                            order: counter
                        });
                        counter--;
                        position += 1;
                    }
                }
            });

            maxPositions.set(key, position);
        }
    }
    
    return {
        pins: result,
        maxPositions,
    }
}

type PortSideItem = {
    pinId: PinId,
    side: string,
    order: number,
    position: number,
};

