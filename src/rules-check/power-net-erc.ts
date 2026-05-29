/*
 * Copyright 2023 Liu Weihao
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ComponentPinNetPair } from "src/objects/types.js";
import { Net } from "../objects/Net.js";
import { PinTypes } from "../objects/PinTypes.js";
import { ClassComponent } from "../objects/ClassComponent.js";
import { PinId } from "../objects/PinDefinition.js";
import { ERC_Rules } from "./rules.js";

type NetState = {
    powerSymbolNames: Set<string>;
    firstPowerSymbolComponent: ClassComponent | null;

    hasPowerReference: boolean;
    hasPowerInput: boolean;
    hasPowerOutput: boolean;
    powerOutputCount: number;

    firstPowerReferenceComponent: ClassComponent | null;
    firstPowerReferencePin: PinId | null;
    firstPowerInputComponent: ClassComponent | null;
    firstPowerInputPin: PinId | null;
    firstPowerOutputComponent: ClassComponent | null;
    firstPowerOutputPin: PinId | null;

    netName: string;

    netComponents: ClassComponent[],
};

function makeViolation(
    type: ERC_Rules,
    instance: ClassComponent,
    pin: PinId | null,
    netName: string
) {
    return { type, instance, pin, netName };
}

export function RuleCheck_PowerNetERC(nets: ComponentPinNetPair[]) {
    const netMap = new Map<Net, NetState>();
    let schematicHasPowerReference = false;

    for (const [component, pin, net] of nets) {
        if (!netMap.has(net)) {
            netMap.set(net, {
                powerSymbolNames: new Set(),
                firstPowerSymbolComponent: null,
                hasPowerReference: false,
                hasPowerInput: false,
                hasPowerOutput: false,
                powerOutputCount: 0,
                firstPowerReferenceComponent: null,
                firstPowerReferencePin: null,
                firstPowerInputComponent: null,
                firstPowerInputPin: null,
                firstPowerOutputComponent: null,
                firstPowerOutputPin: null,
                netName: net.toString(),

                netComponents: [],
            });
        }

        const state = netMap.get(net)!;
        const unit = component.getUnitForPin(pin);
        const pinKey = Array.from(unit.pins.keys()).find(k => k.equals(pin));
        if (!pinKey) continue;

        const pinDef = unit.pins.get(pinKey);
        if (!pinDef) continue;

        switch (pinDef.pinType) {
            case PinTypes.Power: {
                // Use the component's declared net_name (e.g. "VCC", "GND") so that two
                // differently-named power symbols shorted onto the same merged net each
                // contribute their own name to the set, making conflicts detectable.
                const declaredName = component.parameters.get('net_name');
                state.powerSymbolNames.add(declaredName != null ? String(declaredName) : net.toString());
                if (!state.firstPowerSymbolComponent) {
                    // The first net instance should be the main component,
                    // and should not be a copy.
                    state.firstPowerSymbolComponent = component;
                }

                if (state.netComponents.indexOf(component) === -1) {
                    state.netComponents.push(component);
                }
                break;
            }

            case PinTypes.PowerReference:
                schematicHasPowerReference = true;
                if (!state.hasPowerReference) {
                    state.firstPowerReferenceComponent = component;
                    state.firstPowerReferencePin = pin;
                }
                state.hasPowerReference = true;
                break;

            case PinTypes.PowerInput:
                if (!state.hasPowerInput) {
                    state.firstPowerInputComponent = component;
                    state.firstPowerInputPin = pin;
                }
                state.hasPowerInput = true;
                break;

            case PinTypes.PowerOutput:
                if (!state.hasPowerOutput) {
                    state.firstPowerOutputComponent = component;
                    state.firstPowerOutputPin = pin;
                }
                state.hasPowerOutput = true;
                state.powerOutputCount++;
                break;
        }
    }

    type ViolationItem = ReturnType<typeof makeViolation> | { type: ERC_Rules; instance: null; pin: null; netName: string };
    const items: ViolationItem[] = [];

    for (const state of netMap.values()) {
        const hasPowerSymbol = state.powerSymbolNames.size > 0;

        // ERC rule for: power_reference on net with no power symbol
        if (state.hasPowerReference && !hasPowerSymbol) {
            items.push(makeViolation(
                ERC_Rules.PowerReferenceOnUnnamedNet,
                state.firstPowerReferenceComponent!,
                state.firstPowerReferencePin,
                state.netName
            ));
        }

        // ERC rule for: power_input on net with no power symbol
        if (state.hasPowerInput && !hasPowerSymbol) {
            items.push(makeViolation(
                ERC_Rules.PowerInputOnUnnamedNet,
                state.firstPowerInputComponent!,
                state.firstPowerInputPin,
                state.netName
            ));
        }

        // ERC rule for: power_output on net with no power symbol
        if (state.hasPowerOutput && !hasPowerSymbol) {
            items.push(makeViolation(
                ERC_Rules.PowerOutputOnUnnamedNet,
                state.firstPowerOutputComponent!,
                state.firstPowerOutputPin,
                state.netName
            ));
        }

        // ERC rule for: power net with power_input but no power_output
        if (hasPowerSymbol && state.hasPowerInput && !state.hasPowerOutput) {
            items.push(makeViolation(
                ERC_Rules.PowerNetNoSource,
                state.firstPowerInputComponent!,
                state.firstPowerInputPin,
                state.netName
            ));
        }

        // ERC rule for: power net with power_input but no power_reference
        if (hasPowerSymbol && state.hasPowerInput && !state.hasPowerReference) {
            items.push(makeViolation(
                ERC_Rules.PowerNetNoReference,
                state.firstPowerInputComponent!,
                state.firstPowerInputPin,
                state.netName
            ));
        }

        // ERC rule for: power net with only power symbol pins (no physical connections)
        if (hasPowerSymbol && !state.hasPowerInput && !state.hasPowerReference && !state.hasPowerOutput) {

            // Find the first net component that is a copy. This is the instance
            // to use for error messages.
            const netSymbol = state.netComponents.find(component => {
                return component._copyFrom !== null;
            }) ?? state.firstPowerSymbolComponent!;

            items.push(makeViolation(
                ERC_Rules.PowerNetUnused,
                netSymbol,
                null,
                state.netName
            ));
        }

        // ERC rule for: multiple power symbols with different names on same net
        if (state.powerSymbolNames.size > 1) {

            // Find the first copy instance
            const useComponent =
                state.netComponents.find(
                    component => component._copyFrom !== null)
                ?? state.firstPowerSymbolComponent!;

            items.push(makeViolation(
                ERC_Rules.PowerNetNameConflict,
                useComponent,
                null,
                Array.from(state.powerSymbolNames).sort().join(', ')
            ));
        }

        // ERC rule for: multiple power_output pins on same net
        if (state.powerOutputCount > 1) {
            items.push(makeViolation(
                ERC_Rules.PowerNetMultipleOutputs,
                state.firstPowerOutputComponent!,
                state.firstPowerOutputPin,
                state.netName
            ));
        }

        // ERC rule for: power_reference on net with conflicting power symbol names
        if (state.hasPowerReference && state.powerSymbolNames.size > 1) {
            items.push(makeViolation(
                ERC_Rules.PowerReferenceAmbiguousNet,
                state.firstPowerReferenceComponent!,
                state.firstPowerReferencePin,
                Array.from(state.powerSymbolNames).sort().join(', ')
            ));
        }
    }

    // ERC rule for: no power_reference pins anywhere in schematic
    if (!schematicHasPowerReference) {
        items.push({
            type: ERC_Rules.NoPowerReferenceInSchematic,
            instance: null,
            pin: null,
            netName: '',
        });
    }

    return items;
}
