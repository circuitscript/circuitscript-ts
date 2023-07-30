import lodash from 'lodash';

import { GlobalNames } from "./globals";
import { ClassComponent, Component } from "./objects/Component";
import { ExecutionScope } from "./objects/ExecutionScope";
import { Net } from "./objects/Net";
import { ParamDefinition } from "./objects/ParamDefinition";
import { PinDefinition } from "./objects/PinDefinition";
import { CFunction, CFunctionResult } from "./objects/types";

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

    constructor(name: string, executionLevel = 0, indentLevel = 0, silent = false) {
        this.name = name;
        this.executionLevel = executionLevel;

        this.scope = ExecutionScope.create();
        this.scope.indentLevel = indentLevel;

        this.setupRoot();
        this.setupGndNet();

        this.silent = silent;

        this.print('create new execution context', this.name, this.scope.indentLevel);
    }

    print(...params: any[]): void {
        if (this.silent) {
            return;
        }

        const indentOutput = "".padStart(this.scope.indentLevel * 4, "    ");
        const indentLevelText = this.scope.indentLevel.toString().padStart(3, " ");

        const args = ["[" + indentLevelText + "]", indentOutput, ...params];
        console.log.apply(null, args);
    }

    private setupRoot(): void {
        // Setup the root node in the scope
        const component_root = ClassComponent.simple(GlobalNames.__root, 1, '__root');
        this.scope.instances.set(GlobalNames.__root, component_root);

        this.scope.currentComponent = component_root;
        this.scope.currentPin = component_root.getDefaultPin();

        this.scope.componentRoot = component_root;
    }

    private setupGndNet(): void {
        const component_gnd = ClassComponent.simple(GlobalNames.gnd, 1, 'gnd');
        this.scope.instances.set(GlobalNames.gnd, component_gnd);

        const net_gnd = new Net(GlobalNames.gnd, 100, 'gnd');
        this.scope.setNet(component_gnd, 1, net_gnd);

        this.scope.componentGnd = component_gnd;
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

        switch(className){
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
        this.scope.netCounter ++;
        return tmpName;
    }

    linkComponent(component1: ClassComponent, component1Pin: number, component2: ClassComponent, component2Pin: number): void {
        const net1_exists = this.scope.hasNet(component1, component1Pin);
        const net2_exists = this.scope.hasNet(component2, component2Pin);
        
        const net1 = net1_exists ? this.scope.getNet(component1, component1Pin) : null;
        const net2 = net2_exists ? this.scope.getNet(component2, component2Pin) : null;

        if (net1 === null && net2 === null){
            // Both nets do not exist yet, so create a new one
            // that both will use.
            const tmpNet = new Net(this.getUniqueNetName());
            
            this.scope.setNet(component1, component1Pin, tmpNet);
            this.scope.setNet(component2, component2Pin, tmpNet);
        
        } else if (net1 === null && net2 !== null){
            // If net1 does not exist, but net2 exists
            this.scope.setNet(component1, component1Pin, net2);
        
        } else if (net1 !== null && net2 === null){
            // If net1 exists, but net2 does not exist
            this.scope.setNet(component2, component2Pin, net1);

        } else {
            if (net1 !== net2){
                this.mergeNets(net1, net2);
            }
            // Otherwise, both nets are the same.
        }

    }

    private mergeNets(net1: Net, net2: Net): void {
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
    }

    createComponent(instanceName: string, pins: PinDefinition[], params: ParamDefinition[]): Component {
        const numPins = pins.length;
        const component = new ClassComponent(instanceName, numPins, GlobalNames.symbol);

        pins.forEach(pin => {
            // @ts-ignore
            component.pins.set(pin.id, pin);
        });

        const paramsMap = new Map<string, any>();

        params.forEach(param => {
            component.parameters.set(param.paramName, param.paramValue);
            paramsMap.set(param.paramName, param.paramValue);
        });

        if (paramsMap.has('__is_net')) {
            const netName = paramsMap.get('net_name');
            const priority = paramsMap.get('priority');

            const tmpNet = new Net(netName, priority);
            this.print('added net instance', tmpNet.toString());

            // Assume net is on 1 pin for now
            this.scope.setNet(component, 1, tmpNet);
        } 

        this.scope.instances.set(instanceName, component);

        const pinsOutput = pins.map(pin => {
           return pin.id + ":" + pin.name; 
        });

        this.print('add symbol', instanceName, '[' + pinsOutput.join(', ') + ']');

        return component;
    }

    printPoint(): void {
        this.print('point: ' + this.scope.currentComponent.instanceName +" " + this.scope.currentPin);
    }

    addComponentExisting(component: ClassComponent): void {
        const startPin = component.getDefaultPin();
        const nextPin = component.getNextPinAfter(startPin);

        // Add to sequence
        this.toComponent(component, startPin, true);

        this.print('move to next pin: ' + nextPin);
        this.atComponent(component, nextPin, true);

        this.printPoint();
    }

    toComponent(component: ClassComponent, pinId: number | null, addSequence = false): void {
        this.print('to component');

        if (pinId === null) {
            pinId = component.getDefaultPin();
        } else {
            if (component.pins.get(pinId) === undefined) {
                console.trace();
                throw "Invalid pin number " + pinId + " in " + component.instanceName;
            }
        }

        this.printPoint();

        if (this.scope.hasNet(this.scope.currentComponent, this.scope.currentPin)) {
            this.print('net: ', this.scope.getNet(this.scope.currentComponent, this.scope.currentPin).toString());
        }

        this.linkComponent(this.scope.currentComponent, this.scope.currentPin, component, pinId);

        this.scope.currentComponent = component;
        this.scope.currentPin = pinId;

        if (addSequence) {
            this.scope.sequence.push(['to', component, pinId]);
        }

        this.printPoint();
    }

    atComponent(component: ClassComponent, pinId: number | null, addSequence = false): void {
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
                throw "Invalid pin number " + pinId + " in " + component;
            }
        }

        if (usePinId) {
            this.scope.currentPin = usePinId;
        }

        if (addSequence){
            this.scope.sequence.push(['at', component, usePinId]);
        }

        this.printPoint();
    }

    enterBranches(): void {
        this.scope.branchStack.set(this.scope.indentLevel, {
            // Tracks the position when the branch is entered
            "entered_at": [this.scope.currentComponent, this.scope.currentPin], 
            "inner_branches": new Map<number, any>(),
            "current_index": null
        });

        this.print('enter branches');
    }

    exitBranches(): void {
        // When exiting/leaving a group of branches
        const innerBranches = this.scope.branchStack.get(this.scope.indentLevel)["inner_branches"];
        const lastNets:[number, [ClassComponent, number, Net]][] = [];

        // Gather all the last nets that should be joined together
        for(const [key, value] of innerBranches){
            if (value["ignore_last_net"] === false){

                const [component, pin] = value["last_net"];

                let netPriority = 0;
                if (this.scope.hasNet(component, pin)){
                    netPriority = this.scope.getNet(component, pin).priority;
                }

                lastNets.push([netPriority, value["last_net"]]);
            }
        }

        if (lastNets.length > 0){
            // Items in the lastNets list might not have an actual net created/defined yet

            // Sort the nets so that the net with the highest priority is first
            const sortedNets = lastNets.sort((a, b) => {
                if (a[0] > b[0]){
                    return -1;
                } else if (a[0] < b[0]){
                    return 1;
                } else {
                    return 0;
                }
            });

            // Not always a good idea to always use the first item for combining...
            const [comp1, pin1] = sortedNets[0][1];

            const tmpList = sortedNets.slice(1);
            tmpList.forEach(item => {
                const [, [comp2, pin2]] = item;

                this.atComponent(comp1, pin1, true);
                this.toComponent(comp2, pin2, true);
            });

            this.scope.currentComponent = comp1;
            this.scope.currentPin = pin1;
        }

        this.print('exit branches');
    }

    enterBranch(branchIndex: number): void {
        this.print('enter inner branch >>>');

        // Current net before any branching is already stored in enterBranches()
        const stackRef = this.scope.branchStack.get(this.scope.indentLevel);

        stackRef["branch_index"] = branchIndex;

        // Setup the state for the inner branch at the given index
        stackRef["inner_branches"].set(branchIndex, {
            "last_net": null,
            "ignore_last_net": false
        });

        this.scope.indentLevel += 1;
    }

    exitBranch(branchIndex: number): void {
        const stackRef = this.scope.branchStack.get(this.scope.indentLevel -1);

        // Save the last net reference
        const branchIndexRef = stackRef["inner_branches"].get(branchIndex);
        branchIndexRef["last_net"] = [this.scope.currentComponent, this.scope.currentPin];

        stackRef["branch_index"] = null;

        // Restore the latest entry in the branch stack
        const [preBranchComponent, preBranchPin] = stackRef["entered_at"];
        
        this.scope.indentLevel -= 1;

        this.print('exit inner branch <<<');
        this.atComponent(preBranchComponent, preBranchPin, true);
    }

    breakBranch(): void {
        this.print('break branch')
        // Mark that the branch stack at the current indent level
        // should be ignored

        const branchesInfo = this.scope.branchStack.get(this.scope.indentLevel - 1);
        const branchIndex = branchesInfo["branch_index"];

        const branchIndexRef = branchesInfo["inner_branches"].get(branchIndex);
        branchIndexRef["ignore_last_net"] = true;
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

    callFunction(functionName: string, functionParams: any[] | null = null): CFunctionResult {
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

    mergeScope(childScope: ExecutionScope, namespace:string): void {
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
        for (const [instanceName, component] of tmpInstances){

            // Ignore the root component of the child scope
            if (tmpIgnore.indexOf(component) !== -1){
                continue;
            }

            const newInstanceName = `${namespace}.${instanceName}`;
            component.instanceName = newInstanceName;
            this.scope.instances.set(newInstanceName, component);
        }

        // Update all net names in the child scope with the namespace
        const uniqueNets = [];
        tmpNets.forEach(([,, net]) => {
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
            this.toComponent(tmpRoot, 1)
        }

        // Link the GND nets together
        // To ensure the root GND has precedence, increase the priority temporarily
        this.scope.netGnd.priority += 1

        const childGnd = childScope.componentGnd;
        this.atComponent(childGnd, null);

        this.toComponent(this.scope.componentGnd, 1);

        this.scope.netGnd.priority -= 1

        this.scope.currentComponent = currentComponent;
        this.scope.currentPin = currentPin;

        this.print('-- done merging scope --');
    }
}