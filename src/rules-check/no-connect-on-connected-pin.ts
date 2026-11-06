/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ClassComponent } from "../objects/ClassComponent.js";
import { Net } from "../objects/Net.js";
import { PinId } from "../objects/PinDefinition.js";
import { ERC_Rules, NoConnectTarget } from "./rules.js";

/**
 * A no_connect is valid on a net with at most one physical pin. This is a net
 * check.
 */
export function RuleCheck_NoConnectOnConnectedPin(targets: NoConnectTarget[],
    netPhysicalPins: Map<Net, [ClassComponent, PinId][]>) {
    const items: any[] = [];
    const reportedNets = new Map<ClassComponent, Set<Net>>();

    for (const { component, net, targetComponentName, targetPin } of targets) {
        if (!reportedNets.has(component)) {
            reportedNets.set(component, new Set());
        }
        const reported = reportedNets.get(component)!;
        if (reported.has(net)) {
            continue;
        }

        const physicalPins = netPhysicalPins.get(net) ?? [];
        if (physicalPins.length <= 1) {
            continue;
        }

        reported.add(net);

        // Report the edge target if it is a physical pin, otherwise the
        // first physical pin in the net.
        const [targetComponent, reportPin] = physicalPins.find(
            ([c, p]) => p.getHashValue() === targetPin.getHashValue()
                && c.getUnitForPin(p).instanceName === targetComponentName
        ) ?? physicalPins[0];

        items.push({
            type: ERC_Rules.NoConnectOnConnectedPin,
            instance: component, // The no_connect component
            target: {
                instance: targetComponent,
                pin: reportPin
            }
        });
    }

    return items;
}
