/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Big from "big.js";
import { BaseVisitor } from "./BaseVisitor.js";
import { ExecutionContext } from "./execute.js";
import { NumericValue, numeric, resolveToNumericValue } from "./objects/NumericValue.js";
import { CallableParameter, CFunctionEntry, ImportedLibrary, NetTypes } from "./objects/types.js";
import { getLinePositionAsAtString, unwrapValue } from "./utils.js";
import { RuntimeExecutionError, ScenarioRuntimeError } from "./errors.js";
import { BaseNamespace, ComponentTypes, GlobalDocumentName } from "./globals.js";
import { ClassComponent } from "./objects/ClassComponent.js";
import { Net } from "./objects/Net.js";
import { PinId } from "./objects/PinDefinition.js";
import { AllPinTypes, normalizePinType, resolvePinType } from "./objects/PinTypes.js";
import { NetClass } from "./objects/NetClass.js";
import { AcceptedSeverityLevels, ERC_RuleSeverity } from "./rules-check/severity-defaults.js";
import { PercentageValue } from "./objects/PercentageValue.js";
import { ComponentBehavior, HighImpedanceValue } from "./behavior.js";
import { calculateNodeVoltages } from "./render/nodal-analysis.js";

const builtInFunctions: [name: string, impl: ((args: any) => any) | null][] = [
    ['enumerate', enumerate],
    ['to_mils', toMils],
    ['range', range],
    ['len', objectLength],
    ['str', strFunction],
    ['array_push', arrayPush],
    ['array_get', arrayGet],
    ['array_set', arraySet],

    // Set pin type
    ['pin_set_type', null],

    // Get pin type
    ['pin_get_type', null],
    
    // Returns true if component has given pin
    ['has_pin', null],
    
    // Methods that are defined at run time
    ['print', null],

    // Sets the ERC level fror the given ERC config
    ['erc_set', null],

    // Returns the ERC level for the given ERC config
    ['erc_get', null],

    // Returns the net of the current cursor
    ['net_get', null],
    
    // For scenarios
    // ['set_voltage', null],
    // ['evaluate', null],
    // ['expect', null],
    
    // ['is_z', null],
    // ['short', null]
];

export const buildInFunctionsNamesList:string[] = builtInFunctions.map(item => item[0]);

export function linkBuiltInFunctions(context: ExecutionContext, visitor: BaseVisitor): void {

    context.createFunction(BaseNamespace, 'print', (params) => {
        const args = getPositionParams(params);
        const items = args.map(item => {
            return toString(unwrapValue(item));
        });

        if (visitor.printToConsole) {
            console.log('::', ...items);
        }
        const printedValue = items.join(" ");
        visitor.printStream.push(printedValue);

        return [visitor, printedValue];
    });

    context.createFunction(BaseNamespace, 'erc_set', (params) => {
        const [ruleName, severityLevel] = getPositionParams(params);

        // Check that rule exists
        if (ERC_RuleSeverity[ruleName] === undefined){
            throw new RuntimeExecutionError("Invalid rule: " + ruleName);
        }

        if (AcceptedSeverityLevels.indexOf(severityLevel) === -1){
            throw new RuntimeExecutionError("Invalid severity level: " + severityLevel);
        }

        // For initial stage, only have global ERC rules
        const globalDocument = visitor.getScope().variables.get(GlobalDocumentName);
        globalDocument.rules[ruleName] = severityLevel;

        return [visitor];
    });

    context.createFunction(BaseNamespace, 'erc_get', (params) => {
        const [ruleName] = getPositionParams(params);

        // Check that rule exists
        if (ERC_RuleSeverity[ruleName] === undefined){
            throw new RuntimeExecutionError("Invalid rule: " + ruleName);
        }

        // For initial stage, only have global ERC rules
        const globalDocument = visitor.getScope().variables.get(GlobalDocumentName);
        const result = globalDocument.rules[ruleName] ?? "unknown";

        return [visitor, result];
    });

    context.createFunction(BaseNamespace, 'net_get', (params) => {
        let componentParam;
        let useComponent: ClassComponent;
        let usePinId: PinId;

        const args = getPositionParams(params);

        if (args.length === 0) {
            // No params specified
            useComponent = visitor.getScope().currentComponent!;
            usePinId = visitor.getScope().currentPin!;
        } else {
            componentParam = args[0];
            if (!(componentParam instanceof ClassComponent)) {
                throw new RuntimeExecutionError("Invalid parameter for net_get function, expected a component");
            }

            useComponent = (componentParam as ClassComponent);
            usePinId = useComponent.getDefaultPin();

            if (args.length > 1) {
                const pinId = args[1];
                usePinId = useComponent.getPin(PinId.from(pinId));
            }
        }

        const result = visitor.getScope().netMap.get(useComponent, usePinId);
        return [visitor, result];
    });

    context.createFunction(BaseNamespace, 'pin_set_type', (params) => {
        let useComponent: ClassComponent;
        let usePinId: PinId;

        let newType: string;

        const args = getPositionParams(params);

        if (args.length === 1) {
            useComponent = visitor.getScope().currentComponent!;
            usePinId = visitor.getScope().currentPin!.getValue();
            newType = args[0] as string;
        } else if (args.length === 2){
            useComponent = visitor.getScope().currentComponent!;
            usePinId = args[0] as string;
            newType = args[1] as string;
        } else {
            useComponent = args[0] as ClassComponent;
            usePinId = args[1] as string;
            newType = args[2] as string;
        }

        if (!(useComponent instanceof ClassComponent)) {
            throw `Invalid parameters for pin_set_type method`;
        }

        newType = normalizePinType(newType);
        if (AllPinTypes.indexOf(newType) === -1) {
            throw `Invalid pin type: ${newType}`;
        }

        usePinId = useComponent.getPin(PinId.from(usePinId));

        if (useComponent.pins.has(usePinId)) {
            useComponent.pins.get(usePinId)!.pinType = resolvePinType(newType);

            // Nothing returned.
            return [visitor];
        }

        throw `Invalid pin ${usePinId} for component ${useComponent}`;
    });

    context.createFunction(BaseNamespace, 'pin_get_type', (params) => {
        let useComponent: ClassComponent;
        let usePinId: PinId;

        const args = getPositionParams(params);

        if (args.length === 0) {
            useComponent = visitor.getScope().currentComponent!;
            usePinId = visitor.getScope().currentPin!.getValue();
        } else if (args.length === 1) {
            useComponent = visitor.getScope().currentComponent!;
            usePinId = args[0] as string;
        } else {
            useComponent = args[0] as ClassComponent;
            usePinId = args[1] as string;
        }

        if (!(useComponent instanceof ClassComponent)) {
            throw `Invalid parameters for pin_get_type method`;
        }

        usePinId = useComponent.getPin(PinId.from(usePinId));

        if (useComponent.pins.has(usePinId)) {
            return [visitor, useComponent.pins.get(usePinId)!.pinType];
        }

        throw `Invalid pin ${usePinId} for component ${useComponent}`;
    });

    context.createFunction(BaseNamespace, 'has_pin', (params) => {
        let useComponent!: ClassComponent;
        let usePinId!: PinId;

        const args = getPositionParams(params);

        if (args.length === 1) {
            useComponent = visitor.getScope().currentComponent!;
            usePinId = PinId.from(args[0]);
        } else if (args.length === 2) {
            useComponent = args[0] as ClassComponent;
            usePinId = PinId.from(args[1]);
        } else {
            throw `Invalid parameters for has_pin method`;
        }

        if (!(useComponent instanceof ClassComponent) ||
            (!(usePinId instanceof PinId))) {
            throw `Invalid parameters for has_pin method`;
        }

        return [visitor, useComponent.hasPin(usePinId)];
    });

    builtInFunctions.forEach(([functionName, functionImpl]) => {
        if (functionImpl !== null){
            context.createFunction(BaseNamespace, functionName, params => {
                const args = getPositionParams(params);
                const functionReturn = functionImpl(...args);
                return [visitor, functionReturn];
            });
        }
    });
}

export function linkScenarioFunctions(context: ExecutionContext, visitor: BaseVisitor): void {

    context.createFunction(BaseNamespace, 'set_voltage_diff', (params) => {
        const args = getPositionParams(params);
        const scope = visitor.getScope();
        const scenario = scope.scenario!;
        const useInstance = scenario.currentComponent!;

        const diffAmt = args[2] as NumericValue;

        const pinId1 = useInstance.getPin(PinId.from(args[0]));
        const net1 = scope.netMap.get(useInstance, pinId1)!;

        const pinId2 = useInstance.getPin(PinId.from(args[1]));
        const net2 = scope.netMap.get(useInstance, pinId2)!;

        /*
         * Register the constraint (net1 - net2 = diffAmt) so this
         * iteration's nodal solve can couple the two nets directly, even
         * when neither is otherwise a fixed source (e.g. a diode pulling
         * on the node upstream of it while it conducts).
         */
        scenario.voltageSourceBranches.push({ net1, net2, diff: diffAmt.toNumber() });

        /*
         * Also derive an immediate estimate when one side is already known,
         * so behavior conditions reading voltage() later this same pass see
         * a fresh value rather than last iteration's stale solve.
         */
        const value1 = scenario.sourceVoltages.get(net1) ?? scenario.solvedVoltages.get(net1);
        const value2 = scenario.sourceVoltages.get(net2) ?? scenario.solvedVoltages.get(net2);
        const known1 = value1 instanceof NumericValue;
        const known2 = value2 instanceof NumericValue;

        if (known1 && !known2) {
            scenario.sourceVoltages.set(net2, (value1 as NumericValue).sub(diffAmt));
        } else if (!known1 && known2) {
            scenario.sourceVoltages.set(net1, (value2 as NumericValue).add(diffAmt));
        }

        return [visitor];
    });

    context.createFunction(BaseNamespace, 'set_voltage', (params) => {
        const args = getPositionParams(params);

        let useInstance!: ClassComponent;
        if (args[0] instanceof ClassComponent) {
            useInstance = args[0] as ClassComponent;
        } else {
            useInstance = visitor.getScope().scenario!.currentComponent!;
        }

        let pinId!: PinId;
        let voltage!: NumericValue;

        if (args.length === 3) {
            // First param is ClassComponent
            pinId = useInstance.getPin(PinId.from(args[1]));
            voltage = args[2] as NumericValue;
        } else if (args.length === 2) {
            if (args[0] instanceof ClassComponent) {
                // ClassComponent, voltage
                pinId = useInstance.getDefaultPin();
                voltage = args[1] as NumericValue;
            } else {
                // PinId, voltage
                pinId = useInstance.getPin(PinId.from(args[0]));
                voltage = args[1] as NumericValue;
            }
        }

        const scope = visitor.getScope();
        const net = scope.netMap.get(useInstance, pinId)!;

        const netVoltage = scope.scenario!.solvedVoltages.get(net);
        if (netVoltage instanceof NumericValue) {
            const linePosition = visitor.functionCallCtx ?
                `${getLinePositionAsAtString(visitor.functionCallCtx)}` : '';

            console.log(`Warning ${linePosition}: net already has voltage set`);
        }

        scope.scenario!.sourceVoltages.set(net, voltage);
        net.type = NetTypes.Source;

        return [visitor];
    });

    context.createFunction(BaseNamespace, 'set_net_voltage', (params) => {
        const args = getPositionParams(params);
        const netName = args[0] as string;
        const voltage = args[1] as NumericValue;

        const scope = visitor.getScope();
        const net = scope.netMap.getNetWithName(netName);
        if (net !== null) {
            const scenario = scope.scenario!;
            scenario.sourceVoltages.set(net, voltage);
        } else {
            throw new RuntimeExecutionError(`net not found: ${netName}`);
        }
        return [visitor];
    });

    context.createFunction(BaseNamespace, 'voltage', (params) => {
        const args = getPositionParams(params);
        const scope = visitor.getScope();

        let useComponent: ClassComponent;
        let pinId: PinId;

        let pinIdArg = args[0];

        if (args[0] instanceof ClassComponent) {
            useComponent = args[0];

            if (args.length === 1){
                pinIdArg = useComponent.getDefaultPin();
            } else {
                pinIdArg = args[1];
            }
        } else {
            if (scope.scenario!.currentComponent === null) {
                throw new RuntimeExecutionError("voltage: no active component");
            }

            useComponent = scope.scenario!.currentComponent!;
        }

        if (typeof pinIdArg === "string") {
            pinId = useComponent.getPin(PinId.from(pinIdArg));
        } else if (pinIdArg instanceof NumericValue) {
            pinId = useComponent.getPin(PinId.from(pinIdArg));
        } else if (pinIdArg instanceof PinId){
            pinId = pinIdArg;
        }

        const net = scope.netMap.get(useComponent, pinId);

        let voltageValue;
        if (scope.scenario!.sourceVoltages.has(net)) {
            voltageValue = scope.scenario!.sourceVoltages.get(net);

        } else if (scope.scenario!.solvedVoltages.has(net)) {
            voltageValue = scope.scenario!.solvedVoltages.get(net);
        } else {
            voltageValue = new HighImpedanceValue();
        }

        return [visitor, voltageValue];
    });

    context.createFunction(BaseNamespace, 'evaluate', (params) => {
        const scope = visitor.getScope();
        const scenario = scope.scenario!;

        if (scenario.evaluateCalled) {
            throw new RuntimeExecutionError('evaluate: already called');
        }

        scenario.evaluateCalled = true;
        const instances = scope.getInstances();
        const originalNetMap = scope.netMap.clone();
        const gndNet = scope.netMap.getNetWithName("GND");

        /*
         * Voltages fixed by the scenario itself (its own
         * set_voltage calls, made before evaluate() runs) plus GND. These
         * are the only voltages that persist across iterations. Anything a
         * component's behavior clamps via set_voltage during evaluate() is
         * scoped to that single iteration, so a clamp that no longer
         * applies (e.g. a diode that stops conducting) doesn't linger.
         */
        const scenarioInitialVoltages = new Map(scenario.sourceVoltages);
        scenarioInitialVoltages.set(gndNet, numeric(0));

        const convergenceThreshold = 1e-6;
        let previousVoltages: Map<Net, number> | null = null;

        for (let i = 0; i < 100; i++) {
            // console.log(`-- Run ${i} --`);

            // Reset source voltages to the original state.
            scenario.sourceVoltages = new Map(scenarioInitialVoltages);
            scenario.voltageSourceBranches = [];
            scenario.driveConstraints = [];

            scope.netMap = originalNetMap.clone();

            // Apply all states for the instances
            for (const instance of instances) {
                scenario.currentComponent = instance;
                if (instance.behaviorProp !== null) {
                    const behaviorProp = instance.behaviorProp as ComponentBehavior;

                    // Changes to voltage states will be accumulated
                    behaviorProp.evaluate();
                }
                scenario.currentComponent = null;
            }

            const { netVoltages } = calculateNodeVoltages(
                scope.netMap, scenario.sourceVoltages, 
                scenario.voltageSourceBranches,
                scenario.driveConstraints);

            for (const [net, voltage] of netVoltages) {
                scenario.solvedVoltages.set(net, numeric(voltage));
            }

            // A net that dropped out of this iteration's solve (e.g. it
            // became a floating island) no longer has a real voltage;
            // revert it so the next iteration's behavior evaluation sees
            // high impedance instead of a stale solved value.
            for (const net of scenario.solvedVoltages.keys()) {
                if (!netVoltages.has(net)) {
                    scenario.solvedVoltages.set(net, new HighImpedanceValue());
                }
            }

            if (previousVoltages !== null) {
                let maxDiff = 0;
                for (const [net, voltage] of netVoltages) {
                    const previousVoltage = previousVoltages.get(net) ?? 0;
                    maxDiff = Math.max(maxDiff, Math.abs(voltage - previousVoltage));
                }

                if (maxDiff < convergenceThreshold) {
                    break;
                }
            }

            previousVoltages = netVoltages;
        }

        return [visitor];
    });

    // Returns true if the passed in argument is a high impedance value
    context.createFunction(BaseNamespace, 'is_z', (params) => {
        const args = getPositionParams(params);
        if (args.length > 1) {
            throw new RuntimeExecutionError('Invalid parameters');
        }
        return [visitor, args[0] instanceof HighImpedanceValue];
    });

    context.createFunction(BaseNamespace, 'expect', (params) => {
        if (!visitor.getScope().scenario!.evaluateCalled) {
            throw new RuntimeExecutionError('expect: evaluate() has not been called');
        }

        const args = getPositionParams(params);
        if (!args[0]) {
            throw new ScenarioRuntimeError('expect: condition is false');
        }

        return [visitor];
    });

    // The params can be an array
    context.createFunction(BaseNamespace, 'short', (params) => {
        const args = getPositionParams(params);
        const scope = visitor.getScope();
        const activeComponent = scope.scenario!.currentComponent;
        if (activeComponent === null) {
            throw new RuntimeExecutionError('short function failed: invalid component');
        }

        const pinIds = args.map(item =>
            activeComponent.getPin(PinId.from(item))
        );

        if (pinIds.length < 2) {
            throw new RuntimeExecutionError('short failed: invalid number of parameters');
        }

        const netMap = scope.netMap;
        const firstNet = netMap.get(activeComponent, pinIds[0])!;

        /*
         * Register a zero-diff branch constraint (net1 - net2 = 0) rather
         * than inserting a persistent virtual resistor. This is scoped to
         * the current evaluate() iteration.
         */
        for (let i = 1; i < pinIds.length; i++) {
            const secondNet = netMap.get(activeComponent, pinIds[i])!;
            scope.scenario!.voltageSourceBranches.push({ net1: firstNet, net2: secondNet, diff: 0 });
        }

        return [visitor];
    });

    context.createFunction(BaseNamespace, 'open', (params) => {
        return [visitor];
    });

    context.createFunction(BaseNamespace, 'drive', (params) => {
        const args = getPositionParams(params);

        const scope = visitor.getScope();
        const scenario = scope.scenario!;
        const activeComponent = scenario.currentComponent!;

        const outPin = activeComponent.getPin(PinId.from(args[0] as string));
        const checkPin = activeComponent.getPin(PinId.from(args[1] as string));
        const haltValue = (args[2] as NumericValue).toNumber();

        const outNet = scope.netMap.get(activeComponent, outPin)!;
        const checkNet = scope.netMap.get(activeComponent, checkPin)!;

        /*
         * Register the constraint so this iteration's nodal solve pins
         * checkNet's voltage to haltValue via an unknown current injected
         * at outNet, resolved by the single calculateNodeVoltages() call
         * already made at the end of the current evaluate() iteration -
         * same as short()'s zero-diff branches.
         */
        scenario.driveConstraints.push({ driveNet: outNet, targetNet: checkNet, targetValue: haltValue });

        return [visitor];
    });

    /**
     * Creates a pull condition from a given pin to another pin. This can be 
     * used to create pull-ups or pull-downs between pins.
     */
    context.createFunction(BaseNamespace, 'set_pull', (params) => {
        const args = getPositionParams(params);
        const scope = visitor.getScope();
        const scenario = scope.scenario!;

        const activeComponent = scenario.currentComponent!;
        const pinId1 = activeComponent.getPin(PinId.from(args[0] as string)); // Target pin
        const pinId2 = activeComponent.getPin(PinId.from(args[1] as string)); // Pull to pin
        const value = args[2] as NumericValue;

        const tmpRes = ClassComponent.simple('VIRTUAL-RES-' + scenario.virtualCounter, 2);
        tmpRes.typeProp = ComponentTypes.resistor;
        scenario.virtualCounter++;

        tmpRes.setParam('value', value);

        const netNamespace = visitor.getExecutor().netNamespace;

        scope.netMap.linkComponentPinNet(activeComponent, pinId1, tmpRes,
            tmpRes.getPin(PinId.from(1)), netNamespace);
        scope.netMap.linkComponentPinNet(activeComponent, pinId2,
            tmpRes, tmpRes.getPin(PinId.from(2)), netNamespace);

        return [visitor];
    });
}

export function unlinkScenarioFunctions(context: ExecutionContext): void {
    // Assume that the functions are in the correct context level
    const functions = [
        'set_voltage',
        'set_voltage_diff',
        'set_pull',
        'set_net_voltage',
        'voltage',
        'evaluate',
        'expect',
        'open',
        'short',
        'is_z',
        'drive',
    ];

    functions.forEach(functionName => {
        const functionPath = `${context.namespace}${functionName}`;
        if (context.scope.functions.has(functionPath)) {
            context.scope.functions.delete(functionPath);
        }
    });
}

function range(...args) {
    let startValue = numeric(0);
    let endValue = numeric(0);

    if (args.length === 1) {
        endValue = args[0] as NumericValue;
    } else if (args.length === 2) {
        startValue = args[0] as NumericValue;
        endValue = args[1] as NumericValue;
    }

    const startValueNum = startValue.toNumber();
    const endValueNum = endValue.toNumber();

    const returnArray = [];
    for (let i = startValueNum; i < endValueNum; i++) {
        returnArray.push(numeric(i));
    }

    return returnArray;
}

function enumerate(array:any[]): [index: number, value: any][] {
    if (!Array.isArray(array)) {
        throw "Invalid parameter for enumerate function";
    }
    const output = array.map((item, index) => {
        return [index, item];
    });

    return output;
}

function toMils(value: number | NumericValue): NumericValue {
    let bigValue: Big;
    if (value instanceof NumericValue) {
        bigValue = value.toBigNumber();
    } else {
        if (isNaN(value)) {
            throw "Invalid input for method toMils";
        }

        // Assume is number type
        bigValue = new Big(value as number);
    }

    bigValue = bigValue.div(new Big(25.4 / 1000));
    return resolveToNumericValue(bigValue);
}

function objectLength(obj: any[] | any): NumericValue {
    obj = unwrapValue(obj);

    if (Array.isArray(obj)){
        return numeric(obj.length);
    } else {
        // If object has some length property
        if (obj.length){
            return numeric(obj.length);
        } else {
            throw "Could not get length of object: " + obj;
        }
    }
}

function arrayPush(arrayObject: unknown[], valueToPush: unknown): unknown[] {
    if (!Array.isArray(arrayObject)) {
        throw "Invalid array object to push";
    }
    arrayObject.push(valueToPush);
    return arrayObject;
}

function arrayGet(arrayObject: unknown[], index: number | NumericValue): any {
    if (!Array.isArray(arrayObject)) {
        throw "Invalid array object to get";
    }

    let useValue: number;
    if (index instanceof NumericValue){
        useValue = index.toNumber();
    } else {
        useValue = index;
    }

    if (isNaN(useValue)){
        throw new RuntimeExecutionError("Invalid index for arrayGet");
    }

    return arrayObject[useValue];
}

function arraySet(arrayObject:unknown[], index: number|NumericValue, setValue: any): any {
    if (!Array.isArray(arrayObject)) {
        throw "Invalid array object";
    }

    let useValue: number;
    if (index instanceof NumericValue){
        useValue = index.toNumber();
    } else {
        useValue = index;
    }

    arrayObject[useValue] = setValue;
    return arrayObject;
}

function getPositionParams(params: CallableParameter[]): unknown[] {
    return params.map(([, , value]) => value); 
}

function toString(obj: any): string {
    if (typeof obj === 'string') {
        return `"${obj}"`;
    } else if (typeof obj === 'number') {
        obj = Object.is(obj, -0) ? 0 : obj;
        return obj.toString();
    } else if (Array.isArray(obj)) {
        const inner = obj.map(item => toString(item)).join(", ");
        return "[" + inner + "]";
    } else if (obj instanceof NumericValue) {
        // Display as a big number string, instead of numeric value
        return obj.toDisplayString();
    } else if (obj instanceof PercentageValue) {
        return obj.toString();
    } else if (obj instanceof CFunctionEntry){
        return obj.toString();
    } else if (obj instanceof ImportedLibrary){
        return `[library: ${obj.libraryName}]`;
    } else if (obj instanceof ClassComponent) {
        return `[component: ${obj.instanceName}]`;
    } else if (obj instanceof Net){
        return `[net: ${obj.toString()}]`
    } else if (obj instanceof NetClass) {
        return `[netClass: ${obj.name}]`;
    } else if (obj instanceof HighImpedanceValue) {
        return obj.toString()
    } else {
        if (obj === undefined) {
            return 'undefined';
        } else if (obj === null) {
            return 'null';
        } else if (obj.toDisplayString) {
            return obj.toDisplayString();
        } else if (typeof obj === 'object') {
            return JSON.stringify(obj);
        } else if (obj.toString) {
            return obj.toString();
        } else {
            throw "Could not create string from object: " + obj;
        }
    }
}

function strFunction(object: any): string {
    if (object instanceof NumericValue){
        return object.toDisplayString();
    } else if (object.toString) {
        return object.toString();
    } else {
        throw "str() method failed";
    }
}