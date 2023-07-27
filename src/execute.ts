import { GlobalNames } from "./globals.js";
import { ClassComponent, Component } from "./objects/Component.js";
import { ExecutionScope } from "./objects/ExecutionScope.js";
import { Net } from "./objects/Net.js";
import { ParamDefinition } from "./objects/ParamDefinition.js";
import { PinDefinition } from "./objects/PinDefinition.js";
import { CFunction, CFunctionResult, ComponentPin } from "./objects/types.js";

export class ExecutionContext {
    // Contains the current running state of the circuit web

    name: string;
    executionLevel: number;
    indentLevel: number;

    scope: ExecutionScope;

    resolveFunction: any = null;

    // If true, then do no evaluate further expressions.
    // Used for function state control    
    stopFurtherExpressions = false;

    // Return result of the context
    returnValue = null;

    constructor(name: string, executionLevel = 0, indentLevel = 0) {
        this.name = name;
        this.executionLevel = executionLevel;
        this.indentLevel = indentLevel;

        this.scope = ExecutionScope.create();
        this.scope.indentLevel = this.indentLevel;

        this.setupRoot();
        this.setupGndNet();

        this.print('create new execution context', this.name, this.scope.indentLevel);
    }

    print(...params: any[]): void {
        const indentOutput = "".padStart(this.indentLevel * 4, "    ");
        const indentLevelText = this.indentLevel.toString().padStart(3, " ");

        const args = ["[" + indentLevelText + "]", indentOutput, ...params];
        console.log.apply(null, args);
    }

    private setupRoot(): void {
        // Setup the root node in the scope
        const component_root = Component.simple(GlobalNames.__root, 1);
        this.scope.instances.set(GlobalNames.__root, component_root);

        this.scope.currentComponent = component_root;
        this.scope.currentPin = component_root.getDefaultPin();

        this.scope.componentRoot = component_root;
    }

    private setupGndNet(): void {
        const component_gnd = Component.simple(GlobalNames.gnd, 1);
        this.scope.instances[GlobalNames.gnd] = component_gnd;

        const net_gnd = new Net(GlobalNames.gnd, 100, 'gnd');
        const pair: ComponentPin = [component_gnd, 1];
        this.scope.setNet(component_gnd, 1, net_gnd);

        this.scope.componentGnd = component_gnd;
        this.scope.netGnd = net_gnd;
    }

    instanceExists(instanceName: string): boolean {
        return this.scope.instances.has(instanceName);
    }

    getComponent(instanceName: string): Component { 
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

    linkComponent(component1: Component, component1Pin: number, component2: Component, component2Pin: number): void {
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
        const scopeNets = this.scope.nets;
        for (const [componentPair, net] of scopeNets) {
            if (net === net2){
                this.scope.setNet(componentPair[0], componentPair[1], net1);
            }
        }
    }

    createComponent(instanceName: string, pins: PinDefinition[], params: ParamDefinition[]): Component {
        const numPins = pins.length;
        const component = new ClassComponent(instanceName, GlobalNames.symbol, numPins);

        pins.forEach(pin => {
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

        this.print('add symbol', instanceName, '[' + pinsOutput.join(',') + ']');

        return component;
    }

    printPoint(): void {
        this.print('point: ' + this.scope.currentComponent.instanceName +" " + this.scope.currentPin);
    }

    addComponentExisting(component: ClassComponent): void {
        const startPin = component.getDefaultPin();
        const nextPin = component.getNextPinAfter(startPin);

        this.toComponent(component, startPin);

        this.print('move to next pin: ' + nextPin);
        this.atComponent(component, nextPin);

        this.printPoint();
    }

    toComponent(component: Component, pinId: number | null): void {
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

        this.printPoint();
    }

    atComponent(component: Component, pinId: number | null): void {
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

        this.printPoint();
    }

    createFunction(functionName: string, __runFunc: CFunction): void {
        this.scope.functions.set(functionName, __runFunc);
        this.print(`defined new function ${functionName}`);
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

        // Update net names with the namespace
        const uniqueNets = [];
        tmpNets.forEach(([component, pin, net]) => {
            if (uniqueNets.indexOf(net) === -1) {
                net.name = namespace + '.' + net.name;
                uniqueNets.push(net);
            }
        });

        // Merge nets
        tmpNets.forEach(([component, pin, net]) => {
            if (net.name !== GlobalNames.gnd){
                this.scope.setNet(component, pin , net);
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

        this.print('-- done merging scope --')
    }
}