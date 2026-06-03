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

const EXCLUDED_TYPES  = new Set([PinTypes.PowerReference, PinTypes.NoConnect]);
const POWER_NET_TYPES = new Set([PinTypes.PowerInput, PinTypes.PowerOutput, PinTypes.Power]);
const SIGNAL_TYPES    = new Set([
    PinTypes.Input, PinTypes.Output, PinTypes.IO, PinTypes.Passive,
    PinTypes.Any, PinTypes.OpenCollector, PinTypes.OpenEmitter, PinTypes.HiZ,
]);
const DRIVER_TYPES    = new Set([PinTypes.Output, PinTypes.IO, PinTypes.OpenCollector, PinTypes.OpenEmitter]);
const PASSIVE_TYPES   = new Set([PinTypes.Passive, PinTypes.Any]);

type PinEntry = { component: ClassComponent; pin: PinId; pinType: PinTypes };

function makeViolation(type: ERC_Rules, instance: ClassComponent, pin: PinId | null, netName: string) {
    return { type, instance, pin, netName };
}

export function RuleCheck_PinTypeERC(nets: ComponentPinNetPair[]) {
    const netMap = new Map<Net, PinEntry[]>();

    for (const [component, pin, net] of nets) {
        if (!netMap.has(net)) {
            netMap.set(net, []);
        }

        const unit = component.getUnitForPin(pin);
        const pinKey = Array.from(unit.pins.keys()).find(k => k.equals(pin));
        if (!pinKey) continue;

        const pinDef = unit.pins.get(pinKey);
        if (!pinDef) continue;

        const pinType = pinDef.pinType as PinTypes;
        if (EXCLUDED_TYPES.has(pinType)) continue;

        netMap.get(net)!.push({ component, pin, pinType });
    }

    const items: ReturnType<typeof makeViolation>[] = [];

    for (const [net, allPins] of netMap) {
        const netName = net.toString();
        const signalPins = allPins.filter(p => SIGNAL_TYPES.has(p.pinType));
        const powerPins  = allPins.filter(p => POWER_NET_TYPES.has(p.pinType));
        const outputPins = signalPins.filter(p => p.pinType === PinTypes.Output);
        const inputPins  = signalPins.filter(p => p.pinType === PinTypes.Input);
        const ioPins     = signalPins.filter(p => p.pinType === PinTypes.IO);
        const hasDriver  = signalPins.some(p => DRIVER_TYPES.has(p.pinType));

        if (outputPins.length >= 2) {
            for (const p of outputPins.slice(1)) {
                items.push(makeViolation(ERC_Rules.PinTypeOutputMultiple, p.component, p.pin, netName));
            }
        }

        if (inputPins.length > 0 && !hasDriver) {
            const first = inputPins[0];
            items.push(makeViolation(ERC_Rules.PinTypeInputUndriven, first.component, first.pin, netName));
        }

        if (signalPins.length > 0 && signalPins.every(p => PASSIVE_TYPES.has(p.pinType))) {
            const first = signalPins[0];
            items.push(makeViolation(ERC_Rules.PinTypePassiveOnly, first.component, first.pin, netName));
        }

        if (ioPins.length > 0 && powerPins.length > 0) {
            for (const p of ioPins) {
                items.push(makeViolation(ERC_Rules.PinTypeBidirectionalOnPowerNet, p.component, p.pin, netName));
            }
        }

        if (outputPins.length > 0 && powerPins.some(p => p.pinType === PinTypes.PowerInput)) {
            for (const p of outputPins) {
                items.push(makeViolation(ERC_Rules.PinTypeOutputDrivingPowerInput, p.component, p.pin, netName));
            }
        }
    }

    return items;
}
