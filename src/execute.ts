import lodash from 'lodash';

import { GlobalNames, LayoutDirection, ParamKeys } from './globals';
import { ClassComponent, Component } from './objects/Component';
import { ExecutionScope, SequenceAction } from './objects/ExecutionScope';
import { Net } from './objects/Net';
import { ParamDefinition } from './objects/ParamDefinition';
import { PinDefinition } from './objects/PinDefinition';
import { CFunction, CFunctionResult } from './objects/types';
import { PortSide, getPortSide } from './layout';
import { Wire, WireSegment } from './objects/Wire';

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

    // Move into scope instead?
    linkIDs: Map<string, number> = new Map();

    constructor(
        name: string,
        executionLevel = 0,
        indentLevel = 0,
        silent = false,
    ) {
        this.name = name;
        this.executionLevel = executionLevel;

        this.scope = ExecutionScope.create();
        this.scope.indentLevel = indentLevel;

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
        if (this.silent) {
            return;
        }

        const indentOutput = ''.padStart(this.scope.indentLevel * 4, '    ');
        const indentLevelText = this.scope.indentLevel
            .toString()
            .padStart(3, ' ');

        const args = ['[' + indentLevelText + ']', indentOutput, ...params];
        console.log.apply(null, args);
    }

    private setupRoot(): void {
        // Setup the root node in the scope
        const componentRoot = ClassComponent.simple(
            GlobalNames.__root,
            1,
            '__root',
        );
        this.scope.instances.set(GlobalNames.__root, componentRoot);

        this.scope.currentComponent = componentRoot;
        this.scope.currentPin = componentRoot.getDefaultPin();

        this.scope.componentRoot = componentRoot;
    }

    private setupGnd(): void {
        const componentGnd = ClassComponent.simple(GlobalNames.gnd, 1, 'gnd');
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

    linkComponent(
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
            if (lodash.isEqual(net, net2)) {
                this.scope.setNet(component, pin, net1);
            }
        });

        return net1;
    }

    createComponent(
        instanceName: string,
        pins: PinDefinition[],
        params: ParamDefinition[],
        arrangeProps: any,
        displayProp: any,
        width: null | number,
    ): Component {

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

        component.arrangeProps = arrangeProps;
        component.displayProp = displayProp;
        component.widthProp = width;

        // Determine the side for each pin and update the
        // pin definition
        const portSides = getPortSide(component.pins, arrangeProps);
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

    addComponentExisting(component: ClassComponent, pin = null): void {
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
    }

    toComponent(
        component: ClassComponent,
        pinId: number | null,
        addSequence = false,
    ): void {
        this.print('to component');

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

        this.printPoint();

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

        const linkedNet = this.linkComponent(
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
                const [entryType, , segments]: [SequenceAction, number, WireSegment[]] = this.scope.sequence[this.scope.sequence.length - 1];
                if (entryType === SequenceAction.Wire) {
                    if (isWireSegmentsEndAuto(segments)) {
                        segments[segments.length - 1].until = [
                            sequenceComponent.instanceName, pinId
                        ];
                    }
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
    ): void {
        this.print('at component');
        this.printPoint();

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
        functionParams: any[] | null = null,
    ): CFunctionResult {
        let __runFunc: CFunction | null = null;

        if (this.hasFunction(functionName)) {
            __runFunc = this.getFunction(functionName);
        }

        // If the function does not exist in the current execution context,
        // then try to search in the upper execution context
        if (__runFunc === null && this.resolveFunction !== null) {
            __runFunc = this.resolveFunction(functionName);
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

        // move all instances into the parent scope first, with a namespace extension
        const tmpInstances = childScope.instances;
        const tmpNets = childScope.getNets();

        const tmpIgnore = [childScope.componentGnd, childScope.componentRoot];

        // Rename instance names with the addition of the namespace
        for (const [instanceName, component] of tmpInstances) {
            // Ignore the root component of the child scope
            if (tmpIgnore.indexOf(component) !== -1) {
                continue;
            }

            const newInstanceName = `${namespace}.${instanceName}`;
            component.instanceName = newInstanceName;
            this.scope.instances.set(newInstanceName, component);
        }

        // Update all net names in the child scope with the namespace
        const uniqueNets = [];
        tmpNets.forEach(([, , net]) => {
            if (uniqueNets.indexOf(net) === -1) {
                net.name = namespace + '.' + net.name;
                uniqueNets.push(net);
            }
        });

        // Merge nets
        tmpNets.forEach(([component, pin, net]) => {
            // Do not carry over the gnd component from the child scope
            if (component !== childScope.componentGnd) {
                this.scope.setNet(component, pin, net);
            }
        });

        // If true, then then __root component of the child_scope will
        // be connected to the current component/pin of the parent
        const linkRootComponent = false;

        if (linkRootComponent) {
            // join the child_scope's __root net to the current component / pin
            const tmpRoot = childScope.componentRoot;

            // put the __root of the child component at the current component pin
            this.toComponent(tmpRoot, 1);
        }

        // Link the GND nets together
        // To ensure the root GND has precedence, increase the priority temporarily
        this.scope.netGnd.priority += 1;

        const childGnd = childScope.componentGnd;
        this.atComponent(childGnd, null);

        this.toComponent(this.scope.componentGnd, 1);

        this.scope.netGnd.priority -= 1;

        this.scope.currentComponent = currentComponent;
        this.scope.currentPin = currentPin;

        this.print('-- done merging scope --');
    }

    private prepareSequenceComponent(component: ClassComponent, createNewNetSymbol = true): ClassComponent {
        let sequenceComponent: ClassComponent;

        if (isNetComponent(component) && !isLabelComponent(component)) {
            // If is a net component and not a label component, then
            // create a new copy of the same net component.
            if (!this.linkIDs.has(component.instanceName)) {
                this.linkIDs.set(component.instanceName, 0);
            }

            const idNum = this.linkIDs.get(component.instanceName);
            sequenceComponent = lodash.cloneDeep(component);

            // For now, only allow gnd symbols to create new instances
            // automatically.
            if (component.parameters.get('net_name') !== 'gnd'){
                createNewNetSymbol = false;
            }

            if (createNewNetSymbol) {
                sequenceComponent._linkID = idNum;
                this.linkIDs.set(component.instanceName, idNum + 1);
            } else {
                // If false, then do no create a new net symbol,
                // reuse the previous id num. This assumes that the
                // id num would be correct...
                if (idNum > 0) {
                    sequenceComponent._linkID = idNum - 1;
                }
            }
        } else {
            sequenceComponent = component;
        }

        return sequenceComponent;
    }

    private getPinLayoutDirection(component: ClassComponent, pinId: number): LayoutDirection {
        // Returns the layout direction for a given pin
        let layoutDirection = LayoutDirection.RIGHT;

        if (component.pins.size > 1) {
            const portSide = component.pins.get(pinId).side;

            if (portSide === PortSide.EAST) {
                layoutDirection = LayoutDirection.RIGHT;
            } else if (portSide === PortSide.WEST) {
                layoutDirection = LayoutDirection.LEFT;
            }
        }

        return layoutDirection;
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
        this.print('add wire: ', segments);

        this.scope.currentWireId = wireId;
        this.scope.sequence.push([SequenceAction.Wire, wireId, tmp]);
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
