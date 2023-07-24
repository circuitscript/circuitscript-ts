import { GlobalNames } from "./globals.js";
import { ClassComponent, Component } from "./objects/Component.js";
import { ExecutionScope } from "./objects/ExecutionScope.js";
import { Net } from "./objects/Net.js";
import { ParamDefinition } from "./objects/ParamDefinition.js";
import { PinDefinition } from "./objects/PinDefinition.js";
import { ComponentPin } from "./objects/types.js";

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

    private print(...params: any[]): void {
        const indentOutput = "".padStart(this.indentLevel * 4, "    ");
        const indentLevelText = this.indentLevel.toString().padStart(3, " ");

        const args = ["[" + indentLevelText + "]", indentOutput, ...params];
        console.log.apply(args);
    }

    private setupRoot(): void {
        // Setup the root node in the scope
        const component_root = Component.simple(GlobalNames.__root, 1);
        this.scope.instances.set(GlobalNames.__root, component_root);

        this.scope.currentComponent = component_root;
        this.scope.currentPin = component_root.getDefaultPin();
    }

    private setupGndNet(): void {
        const component_gnd = Component.simple(GlobalNames.gnd, 1);
        this.scope.instances[GlobalNames.gnd] = component_gnd;

        const net_gnd = new Net(GlobalNames.gnd, 100, 'gnd');
        const pair: ComponentPin = [component_gnd, 1];
        this.scope.nets.set(pair, net_gnd);
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
                scopeNets.set(componentPair, net1);
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
            component.parameters[param.paramName] = param.paramValue;
            paramsMap[param.paramName] = param.paramValue;
        });

        if (paramsMap.has('__is_net')) {
            const netName = paramsMap.get('net_name');
            const priority = paramsMap.get('priority');

            const tmpNet = new Net(netName, priority);
            this.print('Added net instance', tmpNet);

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
        this.print('point: ', this.scope.currentComponent, this.scope.currentPin);
    }

    addComponentExist(component: ClassComponent): void {
        const startPin = component.getDefaultPin();
        const nextPin = component.getNextPinAfter(startPin);

        this.toComponent(component, startPin);

        this.print('move to next pin');
        this.atComponent(component, nextPin);

        this.printPoint();
    }

    toComponent(component: Component, pinId: number | null): void {
        this.print('to component');

        if (pinId === null) {
            pinId = component.getDefaultPin();
        } else {
            if (component.pins.get(pinId) === undefined) {
                throw "Invalid pin number " + pinId + " in " + component.instanceName;
            }
        }

        this.printPoint();

        if (this.scope.hasNet(this.scope.currentComponent, this.scope.currentPin)) {
            this.print('net: ', this.scope.getNet(this.scope.currentComponent, this.scope.currentPin));
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
}