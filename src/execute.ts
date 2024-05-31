import { BranchType, ComponentTypes, GlobalNames, NoNetText, ParamKeys, ReferenceTypes } from './globals.js';
import { ClassComponent } from './objects/ClassComponent.js';
import { ActiveObject, ExecutionScope, FrameAction, SequenceAction } from './objects/ExecutionScope.js';
import { Net } from './objects/Net.js';
import { ParamDefinition } from './objects/ParamDefinition.js';
import { PinDefinition, PortSide } from './objects/PinDefinition.js';
import { CFunction, CFunctionResult, CallableParameter, ComponentPin, ReferenceType } from './objects/types.js';
import { Wire, WireSegment } from './objects/Wire.js';
import { Logger } from './logger.js';
import { Frame } from './objects/Frame.js';

export class ExecutionContext {
    // Contains the current running state of the circuit web

    name: string;      // Local name of the execution context.
    
    // Namespace of current execution context, used for 
    // building the specific name of instances
    namespace: string; 

    // Namespace for building nets, split away from instance namespace so 
    // that the net names generated are cleaner.
    netNamespace: string;

    executionLevel: number;

    scope: ExecutionScope;

    joinPointId = 0;

    resolveNet: (name: string, netNamespace:string) => ({
        found: boolean, net?: Net
    }) = null;

    // If true, then do no evaluate further expressions.
    // Used for function state control
    stopFurtherExpressions = false;

    // Return result of the context
    returnValue = null;

    // If true, then do not print any messages
    silent = false;

    logger: Logger;

    __functionCache = {};


    constructor(
        name: string,
        namespace: string,
        netNamespace: string,
        executionLevel = 0,
        indentLevel = 0,
        silent = false,
        logger: Logger
    ) {
        this.name = name;
        this.namespace = namespace;
        this.netNamespace = netNamespace;

        this.executionLevel = executionLevel;
        this.logger = logger;

        this.scope = ExecutionScope.create();
        this.scope.indentLevel = indentLevel;

        this.setupRoot();

        this.silent = silent;

        this.print(
            'create new execution context',
            this.namespace,
            this.name,
            this.scope.indentLevel,
        );
    }

    print(...params: any[]): void {
        const indentOutput = ''.padStart(this.scope.indentLevel * 4, '    ');
        const indentLevelText = this.scope.indentLevel
            .toString()
            .padStart(3, ' ');

        const args = ['[' + indentLevelText + ']', indentOutput, ...params];

        this.logger.add(args.join(' '));

        if (this.silent) {
            return;
        }
        console.log.apply(null, args);
    }

    private setupRoot(): void {
        // Setup the root node in the scope
        const componentRoot = ClassComponent.simple(
            GlobalNames.__root,
            1,
            '__root',
        );
        componentRoot.typeProp = ComponentTypes.net;

        this.scope.instances.set(GlobalNames.__root, componentRoot);

        this.scope.currentComponent = componentRoot;
        this.scope.currentPin = componentRoot.getDefaultPin();

        this.scope.componentRoot = componentRoot;
    }


    instanceExists(instanceName: string): boolean {
        return this.scope.instances.has(instanceName);
    }

    getComponent(instanceName: string): ClassComponent {
        return this.scope.instances.get(instanceName);
    }

    getUniqueInstanceName(className: string): string {
        let extraPrefix = '';

        switch (className) {
            case GlobalNames.DefaultResistor:
                extraPrefix = 'R_';
                break;
            case GlobalNames.DefaultCapacitor:
                extraPrefix = 'C_';
                break;
            case GlobalNames.DefaultInductor:
                extraPrefix = 'L_';
                break;
        }

        const tmpName = extraPrefix + 'COMP_' + this.scope.unnamedCounter;
        this.scope.unnamedCounter += 1;

        return tmpName;
    }

    getUniqueNetName(): string {
        const tmpName = 'NET_' + this.scope.netCounter;
        this.scope.netCounter++;
        return tmpName;
    }

    getCurrentPoint(): ComponentPin {
        return [this.scope.currentComponent, this.scope.currentPin];
    }

    private linkComponentPinNet(
        component1: ClassComponent,
        component1Pin: number,
        component2: ClassComponent,
        component2Pin: number,
    ): Net {
        const net1_exists = this.scope.hasNet(component1, component1Pin);
        const net2_exists = this.scope.hasNet(component2, component2Pin);

        const net1 = net1_exists
            ? this.scope.getNet(component1, component1Pin)
            : null;
        const net2 = net2_exists
            ? this.scope.getNet(component2, component2Pin)
            : null;

        this.print('link nets', component1, component1Pin, net1,
            'to', component2, component2Pin, net2);

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
                return net1;
            }
        }

        return returnNet;
    }

    private mergeNets(net1: Net, net2: Net): Net {
        // By default merge net2 into net1, net2 will no longer be used.
        if (net1 === net2) {
            return;
        }

        let tmpNet: Net;

        // Check priority to ensure that net1 always
        // has the higher priority. Swap both nets
        // if this is not the case.
        if (net2.priority > net1.priority) {
            tmpNet = net1;
            net1 = net2;
            net2 = tmpNet;
        }

        // Get all (component, pin) pairs that are linked to net2
        // and change them to net1
        const scopeNets = this.scope.getNets();
        scopeNets.forEach(([component, pin, net]) => {
            if (Net.isSame(net, net2)) {
                this.scope.setNet(component, pin, net1);
            }
        });

        return net1;
    }

    createComponent(
        instanceName: string,
        pins: PinDefinition[],
        params: ParamDefinition[],
        props: {
            arrange?: Map<string, number[]>,
            display?: string,
            type?: string,
            width?: number
        }
    ): ClassComponent {

        const numPins = pins.length;
        const component = new ClassComponent(
            instanceName,
            numPins,
            GlobalNames.symbol,
        );
        pins.forEach((pin) => {
            component.pins.set(pin.id, pin);
        });

        const paramsMap = new Map<string, any>();

        params.forEach((param) => {
            component.parameters.set(param.paramName, param.paramValue);
            paramsMap.set(param.paramName, param.paramValue);
        });

        if (paramsMap.has(ParamKeys.__is_net)) {
            const netName = paramsMap.get(ParamKeys.net_name);
            const priority = paramsMap.get(ParamKeys.priority);

            // Check if the net exists
            const result = this.resolveNet(netName, this.netNamespace);
            let tmpNet: Net;

            if (result.found) {
                tmpNet = result.net;
                this.print('net found', tmpNet.namespace, tmpNet.name);

            } else {
                tmpNet = new Net(this.netNamespace, netName, priority);
                this.print('net not found, added net instance', 
                    tmpNet.namespace, tmpNet.name);
            }

            // Assume net is on 1 pin for now
            this.scope.setNet(component, 1, tmpNet);
            this.print('set net', netName, 'component', component);
        }

        const {arrange = null} = props;

        component.arrangeProps = arrange;
        component.displayProp = props.display ?? null;
        component.widthProp = props.width ?? null;
        component.typeProp = props.type ?? null;

        // Determine the side for each pin and update the
        // pin definition
        const portSides = getPortSide(component.pins, arrange);
        portSides.forEach(({ pinId, side, position }) => {
            if (component.pins.has(pinId)){
                const tmpPin = component.pins.get(pinId);
                tmpPin.side = side;
                tmpPin.position = position;
            }
        });
        
        this.scope.instances.set(instanceName, component);

        const pinsOutput = pins.map((pin) => {
            return pin.id + ':' + pin.name;
        });

        this.print(
            'add symbol',
            instanceName,
            '[' + pinsOutput.join(', ') + ']',
        );

        return component;
    }

    printPoint(extra = ''): void {
        let netName = NoNetText;
        if (this.scope.hasNet(
            this.scope.currentComponent,
            this.scope.currentPin
        )) {
            netName = this.scope
                .getNet(this.scope.currentComponent, this.scope.currentPin)
                .toString();
        }

        this.print(
            (extra !== '' ? (extra + ' ') : '') + 'point: ' +
            this.scope.currentComponent.instanceName +
            ' ' +
            this.scope.currentPin + ' ' + netName
        );
    }

    addComponentExisting(component: ClassComponent, pin: number): ComponentPin {
        const startPin = pin;
        const nextPin = component.getNextPinAfter(startPin);

        // Add to sequence
        this.toComponent(component, startPin, {addSequence: true});

        this.print('move to next pin: ' + nextPin);
        this.atComponent(component, nextPin, {
            addSequence: true
        });

        this.printPoint();

        return this.getCurrentPoint();
    }

    toComponent(
        component: ClassComponent,
        pinId: number | null,
        options?: {
            addSequence?: boolean,
            cloneNetComponent?: boolean,
        }): ComponentPin {
        this.print('to component');

        const { addSequence = false, cloneNetComponent = false } = options ?? {};

        if (cloneNetComponent && this.isNetOnlyComponent(component)) {
            component = this.cloneComponent(component);
        }

        if (!(component instanceof ClassComponent)){
            throw "Not a valid component!";
        }

        if (pinId === null) {
            pinId = component.getDefaultPin();
        } else {

            if (component.hasPin(pinId)) {
                pinId = component.getPin(pinId);
            } else {
                console.trace();
                throw (
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
            this.print(
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

        this.scope.currentComponent = component;
        this.scope.currentPin = pinId;

        this.scope.clearActive();

        if (addSequence) {
            if (this.scope.sequence.length > 0) {
                
                // Prevent component pin from being connected to multiple
                // wires at the same time. This happens if the user tries
                // to add the same (non-net) component at multiple places.
                if (component.pinWires.has(pinId) && component.typeProp !== ComponentTypes.point) {
                    // throw "Component pin already connected to wire"
                }

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
        pinId: number | null,
        options?: {
            addSequence?: boolean,
            cloneNetComponent?: boolean,
        }): ComponentPin {
        this.print('at component');

        const { addSequence = false, cloneNetComponent = false } = options ?? {};

        if (cloneNetComponent && this.isNetOnlyComponent(component)) {
            component = this.cloneComponent(component);
        }

        this.scope.currentComponent = component;

        let usePinId: number;
        if (pinId === null) {
            usePinId = component.getDefaultPin();
        } else {
            if (component.hasPin(pinId)) {
                usePinId = component.getPin(pinId);
            } else {
                throw 'Invalid pin number ' + pinId + ' in ' + component;
            }
        }

        if (usePinId) {
            this.scope.currentPin = usePinId;
        }

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

    private isNetOnlyComponent(component: ClassComponent): boolean {
        return isNetComponent(component) && !isLabelComponent(component);
    }

    private cloneComponent(component: ClassComponent): ClassComponent {
        // This creates a clone from a given net component, assume only
        // has 1 pin

        let clonedComponent: ClassComponent = null;

        // If is a net component and not a label component, then
        // create a new copy of the same net component.
        if (!this.scope.copyIDs.has(component.instanceName)) {
            this.scope.copyIDs.set(component.instanceName, 0);
        }

        const idNum = this.scope.copyIDs.get(component.instanceName);
        clonedComponent = component.clone();
        clonedComponent._copyID = idNum;
        clonedComponent._copyFrom = component;

        // Set linkIDs to the next value to use
        this.scope.copyIDs.set(component.instanceName, idNum + 1);

        const cloneInstanceName = component.instanceName + ':' + idNum;

        // Add the cloned component
        this.scope.instances.set(cloneInstanceName, 
            clonedComponent);
        clonedComponent.instanceName = cloneInstanceName;

        // Link pin of cloned component onto the same net
        this.linkComponentPinNet(
            component, 1,
            clonedComponent, 1
        );

        this.print('created clone of net component:', cloneInstanceName);

        return clonedComponent;
    }

    enterBranches(branchType: BranchType): void {
        // Create object to track all the inner branches of 
        // the branch group

        this.scope.branchStack.set(this.scope.indentLevel, {
            // Tracks the position when the branch is entered
            entered_at: [
                this.scope.currentComponent,
                this.scope.currentPin,
                this.scope.currentWireId],
            inner_branches: new Map<number, any>(),
            current_index: null,
            type: branchType,
        });

        this.print('enter branches');
    }

    exitBranches(): void {
        const stackRef = this.scope.branchStack.get(
            this.scope.indentLevel,
        );

        const { type: branchType } = stackRef;
        if (branchType === BranchType.Join) {
            // Move to the end location of the first branch
            const { join_final_point: finalPoint } = stackRef;
            const [component, pin, wireId] = finalPoint;

            this.scope.currentComponent = component;
            this.scope.currentPin = pin;
            this.scope.currentWireId = wireId;

            if (wireId !== -1) {
                this.scope.sequence.push([
                    SequenceAction.WireJump, wireId, 1
                ]);
            }
        }

        this.print('exit branches');
    }

    enterBranch(branchIndex: number): void {
        // Current net before any branching is already stored in enterBranches()
        const stackRef = this.scope.branchStack.get(this.scope.indentLevel);
        stackRef['branch_index'] = branchIndex;

        const { type: branchType } = stackRef;

        // Setup the state for the inner branch at the given index
        stackRef['inner_branches'].set(branchIndex, {
            last_net: null,
            ignore_last_net: false,
        });

        if (branchType === BranchType.Join) {
            // Clear current component, pin, wire before entering the branch
            this.scope.currentComponent = null;
            this.scope.currentPin = null;
            this.scope.currentWireId = -1;
        }

        this.print(`enter inner branch of type (${branchType}) >>>`);

        this.scope.indentLevel += 1;
    }

    exitBranch(branchIndex: number): void {
        const stackRef = this.scope.branchStack.get(this.scope.indentLevel - 1);
        const { type: branchType } = stackRef;
        // Save the last net reference
        const branchIndexRef = stackRef['inner_branches'].get(branchIndex);
        branchIndexRef['last_net'] = [
            this.scope.currentComponent,
            this.scope.currentPin,
            this.scope.currentWireId
        ];

        stackRef['branch_index'] = null;

        // Restore the latest entry in the branch stack
        const [preBranchComponent, preBranchPin, preBranchWireId] =
            stackRef['entered_at'];

        this.scope.indentLevel -= 1;

        this.print('exit inner branch <<<');

        if (branchType === BranchType.Branch) {
            // Do not duplicate any net symbol since this is a branch
            this.atComponent(preBranchComponent, preBranchPin, { addSequence: true });

            if (preBranchWireId !== -1) {
                // If previous node is a wire, then jump to END of wire
                this.scope.sequence.push([SequenceAction.WireJump, preBranchWireId, 1]);
            }
        } else if (branchType === BranchType.Join) {
            if (branchIndex === 0) {
                // First join branch will determine the final join location

                // Add point to current location
                this.addPoint(`_join.${this.name}.${this.joinPointId}`, false);
                
                this.joinPointId += 1;

                stackRef['join_final_point'] = [
                    this.scope.currentComponent,
                    this.scope.currentPin,
                    this.scope.currentWireId
                ];

            } else {
                const { join_final_point: finalPoint } = stackRef;
                const [joinComponent, joinPin, joinWireId] = finalPoint;

                // Link the current component to the join component and join pin
                this.toComponent(joinComponent, joinPin, { addSequence: true });
            }
        }
    }

    breakBranch(): void {
        this.print('break branch');
        // Mark that the branch stack at the current indent level
        // should be ignored

        const branchesInfo = this.scope.branchStack.get(
            this.scope.indentLevel - 1,
        );
        const branchIndex = branchesInfo['branch_index'];

        const branchIndexRef = branchesInfo['inner_branches'].get(branchIndex);
        branchIndexRef['ignore_last_net'] = true;
    }

    createFunction(functionName: string, __runFunc: CFunction): void {
        this.scope.functions.set(functionName, __runFunc);
        this.__functionCache[functionName] = __runFunc;
        this.print(`defined new function '${functionName}'`);
    }

    hasFunction(functionName: string): boolean {
        return this.scope.functions.has(functionName);
    }

    getFunction(functionName: string): CFunction {
        return this.scope.functions.get(functionName);
    }

    resolveVariable(executionStack: ExecutionContext[], idName: string):
        ReferenceType {
        // this.print('resolve variable', idName);
        const reversed = [...executionStack].reverse();

        for (let i = 0; i < reversed.length; i++) {
            const context = reversed[i];
            if (context.hasFunction(idName)) {
                return {
                    found: true,
                    value: context.getFunction(idName),
                    type: ReferenceTypes.function,
                    name: idName,
                }

            } else if (context.scope.variables.has(idName)) {
                return {
                    found: true,
                    value: context.scope.variables.get(idName),
                    type: ReferenceTypes.variable,
                    name: idName,
                };

            } else if (context.scope.instances.has(idName)) {
                return {
                    found: true,
                    value: context.scope.instances.get(idName),
                    type: ReferenceTypes.instance,
                    name: idName,
                }
            }
        }

        return {
            found: false,
            name: idName,
        }
    }

    callFunction(
        functionName: string,
        functionParams: CallableParameter[],
        executionStack: ExecutionContext[],
        netNamespace: string,
    ): CFunctionResult {
        let __runFunc: CFunction | null = null;

        // Function is not cached yet, so look for it
        if (this.__functionCache[functionName] === undefined){
            if (this.hasFunction(functionName)) {
                __runFunc = this.getFunction(functionName);
            }
    
            // If the function does not exist in the current execution context,
            // then try to search in the upper execution context
            if (__runFunc === null) {
                this.print(`searching for function ${functionName} in upper context`)
                
                const tmpResolveResult = 
                    this.resolveVariable(executionStack, functionName);
                
                if (tmpResolveResult.found) {
                    __runFunc = tmpResolveResult.value;
                } else {
                    throw `Invalid function ${functionName}`;
                }
            }
            this.print('save function to cache:', functionName);
            this.__functionCache[functionName] = __runFunc;

        } else {
            this.print('found function in cache:', functionName);
            __runFunc = this.__functionCache[functionName];
        }        

        if (__runFunc !== null) {
            this.print(`call function '${functionName}'`);

            const functionResult = __runFunc(
                functionParams,
                { netNamespace });

            this.print(`done call function '${functionName}'`);
            
            return functionResult;
        } else {
            throw `Invalid function '${functionName}'`;
        }
    }

    mergeScope(childScope: ExecutionScope, namespace: string): void {
        this.print('-- merging scope to parent --');

        // Save these position first, because this needs to be restored
        // after the merge operation
        const currentComponent = this.scope.currentComponent;
        const currentPin = this.scope.currentPin;
        const currentWireId = this.scope.currentWireId;

        // move all instances into the parent scope first, with a namespace extension
        const tmpInstances = childScope.instances;
        const tmpNets = childScope.getNets();

        for (const [instanceName, component] of tmpInstances) {
            // Rename instance names with the addition of the namespace
            const newInstanceName = `${namespace}.${instanceName}`;
            component.instanceName = newInstanceName;

            // Do not add root and gnd components of child scope to the
            // parent scope
            if (component === childScope.componentGnd || 
                component === childScope.componentRoot){
                continue;
            }

            if (!this.scope.instances.has(newInstanceName)) {
                this.scope.instances.set(newInstanceName, component);
            } else {
                throw "Invalid instance name to merge into parent scope!";
            }
        }

        // Merge all nets into parent scope
        tmpNets.forEach(([component, pin, net]) => {
            this.scope.setNet(component, pin, net);
        });

        // If true, then then __root component of the child_scope will
        // be connected to the current component/pin of the parent
        const linkRootComponent = true;

        const tmpRoot = childScope.componentRoot;

        if (linkRootComponent) {
            // Join the child_scope's __root net to the current component / pin

            // Get the net of the root scope first
            const netConnectedToRoot = childScope.getNet(tmpRoot, 1);

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

                netConnectedToRoot.priority = currentNet.priority - 1;

                // Connect current component to the root component, since the
                // net priority of the current component and pin is higher,
                // then the root component's net will be merged in.
                this.toComponent(tmpRoot, 1);
            }
        }

        // Merge the sequences together, need to renumber the wire ids.
        const wireIdOffset = this.scope.wires.length;

        // Need to renumber the frame ids too.
        const frameIdOffset = this.scope.frames.length;

        let incrementGndLinkId = 0;

        childScope.sequence.forEach(sequenceAction => {
            const [action] = sequenceAction;

            if (action === SequenceAction.Wire) {
                // Need to have new IDs for wires
                const [, innerWireId, segments] = sequenceAction;

                this.scope.sequence.push(
                    [SequenceAction.Wire, wireIdOffset + innerWireId, segments]
                );

                this.scope.wires.push(new Wire(segments));

            } else if (action === SequenceAction.WireJump) {
                // Wire IDs in wire jumps need to be updated.
                const jumpWireId = wireIdOffset + sequenceAction[1];
                this.scope.sequence.push(
                    [SequenceAction.WireJump, jumpWireId, 1]
                );
            } else if (action === SequenceAction.At || action === SequenceAction.To) {
                const tmpComponent: ClassComponent = sequenceAction[1];

                // Check if the component is a gnd component
                if (isNetComponent(tmpComponent) && tmpComponent.parameters.get(ParamKeys.net_name) === 'gnd') {
                    // Is a gnd net
                    tmpComponent._copyID = gndCopyIdOffset + incrementGndLinkId;
                    incrementGndLinkId += 1;

                } else if (tmpComponent === tmpRoot) {
                    // If this sequence action contains the root component,
                    // then replace it with a corresponding sequence action.
                    // If current wire id is set, then use a wire jump sequence
                    // action, otherwise use at/to action.

                    if (currentWireId !== -1){
                        sequenceAction = [SequenceAction.WireJump, currentWireId];

                    } else {
                        // If is the root component, then replace it by the current
                        // component and pin
                        sequenceAction = [action, currentComponent, currentPin];
                    }                    
                }
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
            this.scope.currentComponent = currentComponent;
            this.scope.currentPin = currentPin;
            this.scope.currentWireId = currentWireId;

        } else {
            // Otherwise move the current scope to the current node within 
            // the child scope
            this.scope.currentComponent = childScope.currentComponent;
            this.scope.currentPin = childScope.currentPin;
            this.scope.currentWireId = childScope.currentWireId + wireIdOffset;
        }

        this.printPoint('resume at');
        
        this.print('-- nets --');

        // dump the list of nets in the current scope
        const currentNets = this.scope.getNets();

        currentNets.reduce((accum, [,,net]) => {
            if (accum.indexOf(net) === -1){
                accum.push(net);
                this.print(`${net.namespace}${net.name} ${net.priority}`);
            }
            return accum;
        }, []);

        this.print('-- done merging scope --');
    }

    addWire(segments: [string, number?][]): void {
        const tmp = segments.map(item => {
            const [direction, value=null] = item;
            return {
                direction,
                value
            } as WireSegment
        });

        // This ID is used to identify/jump to wires later
        const wireId = this.scope.wires.length;

        this.scope.wires.push(new Wire(tmp));

        const output = [];
        segments.forEach(item => {
            output.push(item.join(","));
        });

        this.print('add wire: ', output.join("|"));

        this.scope.setActive(ActiveObject.Wire, wireId);
        this.scope.sequence.push([SequenceAction.Wire, wireId, tmp]);

        // if (this.scope.currentComponent.pinWires.has(this.scope.currentPin)) {
        //     throw "Component pin already connected to wire"
        // }

        this.scope.currentComponent.pinWires.set(
            this.scope.currentPin, tmp
        )
    }

    addPoint(pointId: string, userDefined = true): ComponentPin {
        if (this.scope.instances.has(pointId)) {
            this.print('Warning: ' + pointId + ' is being redefined');
        }

        const useName = userDefined ? 'point.' + pointId : pointId;
        const componentPoint = ClassComponent.simple(useName, 1, "point");
        componentPoint.displayProp = "point";
        componentPoint.typeProp = ComponentTypes.point;

        this.scope.instances.set(pointId, componentPoint);
        this.toComponent(componentPoint, 1, { addSequence: true });

        return this.getCurrentPoint();
    }

    setProperty(nameWithProp: string, value: any): void {
        this.print('set property', nameWithProp, 'value', value);

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
                const component = this.scope.instances.get(idName);
                component.parameters.set(paramName, value);

            } else if (this.scope.variables.has(idName)) {
                throw "Not implemented yet!";
            } else {
                throw "Unknown identifier: " + idName;
            }
        }
    }

    setCurrentComponentStyle(styles: { [key: string]: number | string }): void {
        // Add onto to the current component styles
        for (const key in styles) {
            this.scope.currentComponent.styles[key] = styles[key];
        }
    }

    enterFrame(): number {
        // Frame 0 is the 'base' frame
        const frameId = this.scope.frames.length + 1;
        const frameObject = new Frame(frameId);
        this.scope.frames.push(frameObject);

        this.scope.sequence.push([SequenceAction.Frame,
            frameObject, FrameAction.Enter]);

        this.scope.currentFrameId = frameId;
        this.scope.setActive(ActiveObject.Frame, frameId);

        // TODO: allow frame properties to be set in double dot expressions
        // TODO: also allow frames to be assigned in variables for reuse?

        return frameId;
    }

    exitFrame(frameId: number): void {
        const frame = this.scope.frames[frameId-1];
        this.scope.sequence.push([SequenceAction.Frame,
            frame, FrameAction.Exit]);
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

export function isNetComponent(component: ClassComponent): boolean {
    // Returns true if the component is a net component
    return component.parameters.has(ParamKeys.__is_net);
}

export function isLabelComponent(component: ClassComponent): boolean {
    return component.parameters.has(ParamKeys.__is_label);
}

export function getPortSide(pins: Map<number, PinDefinition>, arrangeProps: null | Map<string, number[]>): PortSideItem[] {
    // Takes the arrangeProps and determines how to arrange pins in the symbol.

    const result = [];

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

    } else {
        let counter = pins.size;
        const existingPinIds = Array.from(pins.keys());

        for (const [key, items] of arrangeProps) {
            let useItems;
            if (!Array.isArray(items)){
                useItems = [items];
            } else {
                // Do no mutate original array
                useItems = [...items];
            }

            let useSide = PortSide.WEST;
            if (key === 'left') {
                useSide = PortSide.WEST;
            } else if (key === 'right') {
                useSide = PortSide.EAST;
            } else if (key === 'top') {
                useSide = PortSide.NORTH;
            } else if (key === 'bottom') {
                useSide = PortSide.SOUTH;
            }

            let position = 0;

            useItems.forEach(item => {
                if (typeof item === 'object'){
                    if (item.blank){
                        position += item.blank;
                    }
                }

                // Only use the pin if it exists!
                if (existingPinIds.indexOf(item) !== -1) {
                    result.push({
                        pinId: item,
                        side: useSide,
                        position,
                        order: counter
                    });
                    counter--;
                    position += 1;
                }
            });
        }
    }
    
    return result;
}

type PortSideItem = {
    pinId: number,
    side: string,
    order: number,
    position: number,
};

