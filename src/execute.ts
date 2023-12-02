import lodash from 'lodash';

import { ComponentTypes, GlobalNames, ParamKeys } from './globals';
import { ClassComponent } from './objects/Component';
import { ExecutionScope, SequenceAction } from './objects/ExecutionScope';
import { Net } from './objects/Net';
import { ParamDefinition } from './objects/ParamDefinition';
import { PinDefinition, PortSide } from './objects/PinDefinition';
import { CFunction, CFunctionResult, CallableParameter, ComponentPin } from './objects/types';
import { Wire, WireSegment } from './objects/Wire';
import { Logger } from './logger';

export class ExecutionContext {
    // Contains the current running state of the circuit web

    name: string;
    executionLevel: number;

    scope: ExecutionScope;

    resolveFunction: any = null;

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
        executionLevel = 0,
        indentLevel = 0,
        silent = false,
        logger: Logger,
    ) {
        this.name = name;
        this.executionLevel = executionLevel;
        this.logger = logger;

        this.scope = ExecutionScope.create();
        this.scope.indentLevel = indentLevel;

        // setup the print function
        this.scope.functions.set('print', (value) => {
            console.log(value);
        });

        this.setupRoot();
        this.setupGnd();

        this.silent = silent;

        this.print(
            'create new execution context',
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

    private setupGnd(): void {
        const componentGnd = ClassComponent.simple(GlobalNames.gnd, 1, 'gnd');
        componentGnd.typeProp = ComponentTypes.net;

        const params = componentGnd.parameters;

        const defaultPriority = 100;

        // Setup the parameters of the gnd
        params.set(ParamKeys.__is_net, 1);
        params.set(ParamKeys.priority, defaultPriority);
        params.set(ParamKeys.net_name, GlobalNames.gnd);

        this.scope.instances.set(GlobalNames.gnd, componentGnd);

        const net_gnd = new Net(GlobalNames.gnd, defaultPriority, 'gnd');
        this.scope.setNet(componentGnd, 1, net_gnd);

        this.scope.componentGnd = componentGnd;
        this.scope.netGnd = net_gnd;
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

        let returnNet: Net;

        if (net1 === null && net2 === null) {
            // Both nets do not exist yet, so create a new one
            // that both will use.
            const tmpNet = new Net(this.getUniqueNetName());

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
            const netName = paramsMap.get('net_name');
            const priority = paramsMap.get(ParamKeys.priority);

            const tmpNet = new Net(netName, priority);
            this.print('added net instance', tmpNet.toString());

            // Assume net is on 1 pin for now
            this.scope.setNet(component, 1, tmpNet);
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

    printPoint(): void {
        this.print(
            'point: ' +
                this.scope.currentComponent.instanceName +
                ' ' +
                this.scope.currentPin,
        );
    }

    addComponentExisting(component: ClassComponent, pin = null): ComponentPin {
        let startPin;

        if (pin === null) {
            startPin = component.getDefaultPin();
        } else {
            startPin = pin;
        }

        const nextPin = component.getNextPinAfter(startPin);

        // Add to sequence
        this.toComponent(component, startPin, true);

        this.print('move to next pin: ' + nextPin);
        this.atComponent(component, nextPin, true);

        this.printPoint();

        return this.getCurrentPoint();
    }

    toComponent(
        component: ClassComponent,
        pinId: number | null,
        addSequence = false,
    ): void {
        this.print('to component');

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

        // Currently no wire references
        this.scope.currentWireId = -1;

        if (addSequence) {
            const sequenceComponent = this.prepareSequenceComponent(component);

            if (this.scope.sequence.length > 0) {
                // Check if the previous entry is a wire
                const [entryType, , segments]: [SequenceAction, number, WireSegment[]] = 
                    this.scope.sequence[this.scope.sequence.length - 1];
                
                if (entryType === SequenceAction.Wire && isWireSegmentsEndAuto(segments)) {
                    segments[segments.length - 1].until = [
                        sequenceComponent, pinId
                    ];
                }
            }

            this.scope.sequence.push([SequenceAction.To, sequenceComponent, pinId, linkedNet.name]);
        }

        this.printPoint();
    }

    atComponent(
        component: ClassComponent,
        pinId: number | null,
        addSequence = false,
        createNetComponent=true,
    ): ComponentPin {
        this.print('at component');
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

        // Insertion point is current at a component pin, so clear
        // any wire references
        this.scope.currentWireId = -1;

        if (addSequence) {
            const sequenceComponent = this.prepareSequenceComponent(component, createNetComponent);
            this.scope.sequence.push([SequenceAction.At, sequenceComponent, usePinId]);
        }

        this.printPoint();

        return this.getCurrentPoint();
    }

    enterBranches(): void {
        this.scope.branchStack.set(this.scope.indentLevel, {
            // Tracks the position when the branch is entered
            entered_at: [this.scope.currentComponent, this.scope.currentPin, this.scope.currentWireId],
            inner_branches: new Map<number, any>(),
            current_index: null,
        });

        this.print('enter branches');
    }

    exitBranches(): void {
        false && this.joinBranches();
        
        this.print('exit branches');
    }

    joinBranches(): void {
        // When exiting/leaving a group of branches
        const innerBranches = this.scope.branchStack.get(
            this.scope.indentLevel,
        )['inner_branches'];

        const lastNets: [number, [ClassComponent, number, Net]][] = [];

        // Gather all the last nets that should be joined together
        for (const [key, value] of innerBranches) {
            if (value['ignore_last_net'] === false) {
                const [component, pin] = value['last_net'];

                let netPriority = 0;
                if (this.scope.hasNet(component, pin)) {
                    netPriority = this.scope.getNet(component, pin).priority;
                }

                lastNets.push([netPriority, value['last_net']]);
            }
        }

        if (lastNets.length > 0) {
            // Items in the lastNets list might not have an actual net created/defined yet

            // Sort the nets so that the net with the highest priority is first
            const sortedNets = lastNets.sort((a, b) => {
                if (a[0] > b[0]) {
                    return -1;
                } else if (a[0] < b[0]) {
                    return 1;
                } else {
                    return 0;
                }
            });

            // Not always a good idea to always use the first item for combining...
            const [comp1, pin1] = sortedNets[0][1];

            const tmpList = sortedNets.slice(1);
            tmpList.forEach((item) => {
                const [, [comp2, pin2]] = item;

                this.atComponent(comp1, pin1, true);
                this.toComponent(comp2, pin2, true);
            });

            this.scope.currentComponent = comp1;
            this.scope.currentPin = pin1;
        }
    }

    enterBranch(branchIndex: number): void {
        this.print('enter inner branch >>>');

        // Current net before any branching is already stored in enterBranches()
        const stackRef = this.scope.branchStack.get(this.scope.indentLevel);

        stackRef['branch_index'] = branchIndex;

        // Setup the state for the inner branch at the given index
        stackRef['inner_branches'].set(branchIndex, {
            last_net: null,
            ignore_last_net: false,
        });

        this.scope.indentLevel += 1;
    }

    exitBranch(branchIndex: number): void {
        const stackRef = this.scope.branchStack.get(this.scope.indentLevel - 1);

        // Save the last net reference
        const branchIndexRef = stackRef['inner_branches'].get(branchIndex);
        branchIndexRef['last_net'] = [
            this.scope.currentComponent,
            this.scope.currentPin,
        ];

        stackRef['branch_index'] = null;

        // Restore the latest entry in the branch stack
        const [preBranchComponent, preBranchPin, preBranchWireId] = stackRef['entered_at'];

        this.scope.indentLevel -= 1;

        this.print('exit inner branch <<<');

        // Do not duplicate any net symbol since this is a branch
        this.atComponent(preBranchComponent, preBranchPin, true, false);

        if (preBranchWireId !== -1){
            this.scope.sequence.push([SequenceAction.WireJump, preBranchWireId]);
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

    callFunction(
        functionName: string,
        functionParams: CallableParameter[],
    ): CFunctionResult {
        let __runFunc: CFunction | null = null;

        // Function is not cached yet, so look for it
        if (this.__functionCache[functionName] === undefined){
            if (this.hasFunction(functionName)) {
                __runFunc = this.getFunction(functionName);
            }
    
            // If the function does not exist in the current execution context,
            // then try to search in the upper execution context
            if (__runFunc === null && this.resolveFunction !== null) {
                this.print(`searching for function ${functionName} in upper context`)
                __runFunc = this.resolveFunction(functionName);
            }
            this.print('save function to cache:', functionName);
            this.__functionCache[functionName] = __runFunc;

        } else {
            this.print('found function in cache:', functionName);
            __runFunc = this.__functionCache[functionName];
        }        

        if (__runFunc !== null) {
            this.print(`call function '${functionName}'`);

            const functionResult = __runFunc(functionParams);

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

        // Update all net names in the child scope with the namespace
        const uniqueNets = [];
        tmpNets.forEach(([, , net]) => {
            if (uniqueNets.indexOf(net) === -1) {
                net.name = namespace + '.' + net.name;
                uniqueNets.push(net);
            }
        });

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
                    const tmpNet = new Net(this.getUniqueNetName());

                    this.scope.setNet(currentComponent, currentPin, tmpNet);
                    currentNet = tmpNet
                }

                netConnectedToRoot.priority = currentNet.priority - 1;

                // Connect current component to the root component, since the
                // net priority of the current component and pin is higher,
                // then the root component's net will be merged in.
                this.toComponent(tmpRoot, 1);
            }
        }

        // Link the GND nets together
        // To ensure the root GND has precedence, increase the priority temporarily
        this.scope.netGnd.priority += 1;

        const childGnd = childScope.componentGnd;
        this.atComponent(childGnd, 1);

        this.toComponent(this.scope.componentGnd, 1);
        this.scope.netGnd.priority -= 1;

        // Remove the child scope gnd since it is absorbed 
        // into parent scope.
        this.scope.removeNet(childScope.componentGnd, 1);

        // Merge the sequences together, need to renumber the wire ids
        const wireIdOffset = this.scope.wires.length;

        const componentGndName = this.scope.componentGnd.instanceName;

        let gndCopyIdOffset = 0;
        if (!this.scope.copyIDs.has(componentGndName)) {
            this.scope.copyIDs.set(componentGndName, 0);
        } else {
            gndCopyIdOffset = this.scope.copyIDs.get(componentGndName);
        }


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
                    [SequenceAction.WireJump, jumpWireId]
                );
            } else if (action === SequenceAction.At || action === SequenceAction.To) {
                const tmpComponent: ClassComponent = sequenceAction[1];

                // Check if the component is a gnd component
                if (isNetComponent(tmpComponent) && tmpComponent.parameters.get('net_name') === 'gnd') {
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
            }
        });

        // Update the link ID counter for the gnd component
        this.scope.copyIDs.set(componentGndName, 
            gndCopyIdOffset + incrementGndLinkId);

        this.scope.currentComponent = currentComponent;
        this.scope.currentPin = currentPin;

        this.print('-- done merging scope --');
    }

    private prepareSequenceComponent(component: ClassComponent, createNewNetSymbol = true): ClassComponent {
        let sequenceComponent: ClassComponent;

        if (isNetComponent(component) && !isLabelComponent(component)) {
            // If is a net component and not a label component, then
            // create a new copy of the same net component.
            if (!this.scope.copyIDs.has(component.instanceName)) {
                this.scope.copyIDs.set(component.instanceName, 0);
            }

            const idNum = this.scope.copyIDs.get(component.instanceName);
            sequenceComponent = lodash.cloneDeep(component);

            // For now, only allow gnd symbols to create new instances
            // automatically.
            if (component.parameters.get('net_name') !== 'gnd'){
                createNewNetSymbol = false;
            }

            if (createNewNetSymbol) {
                sequenceComponent._copyID = idNum;

                // Set linkIDs to the next value to use
                this.scope.copyIDs.set(component.instanceName, idNum + 1);
            } else {
                // If false, then do no create a new net symbol,
                // reuse the previous id num. This assumes that the
                // id num would be correct...
                if (idNum > 0) {
                    sequenceComponent._copyID = idNum - 1;
                }
            }
        } else {
            sequenceComponent = component;
        }

        return sequenceComponent;
    }

    // private getPinLayoutDirection(component: ClassComponent, pinId: number): LayoutDirection {
    //     // Returns the layout direction for a given pin
    //     let layoutDirection = LayoutDirection.RIGHT;

    //     if (component.pins.size > 1) {
    //         const portSide = component.pins.get(pinId).side;

    //         if (portSide === PortSide.EAST) {
    //             layoutDirection = LayoutDirection.RIGHT;
    //         } else if (portSide === PortSide.WEST) {
    //             layoutDirection = LayoutDirection.LEFT;
    //         }
    //     }

    //     return layoutDirection;
    // }

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

        this.scope.currentWireId = wireId;
        this.scope.sequence.push([SequenceAction.Wire, wireId, tmp]);
    }

    addPoint(pointId: string): ComponentPin {
        if (this.scope.instances.has(pointId)) {
            this.print('Warning: ' + pointId + ' is being redefined');
        }

        const componentPoint = ClassComponent.simple("point." + pointId, 1, "point");
        componentPoint.displayProp = "point";
        componentPoint.typeProp = ComponentTypes.point;

        this.scope.instances.set(pointId, componentPoint);
        this.toComponent(componentPoint, 1, true);

        return this.getCurrentPoint();
    }

    setProperty(nameWithProp: string, value: any): void {
        this.print('set property', nameWithProp, 'value', value);

        let idName: string;
        let paramName: string;

        if (nameWithProp.startsWith('..')){
            idName = this.scope.currentComponent.instanceName;
            paramName = nameWithProp.substring(2);
        } else {
            const parts = nameWithProp.split(".");
            idName = parts[0];
            paramName = parts[1];
        }

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

    setCurrentComponentStyle(styles: { [key: string]: number | string }): void {
        // Add onto to the current component styles
        for (const key in styles) {
            this.scope.currentComponent.styles[key] = styles[key];
        }
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