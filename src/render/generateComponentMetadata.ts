/*
 * Copyright 2023 Liu Weihao
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SheetFrame } from './layout.js';
import { NumericValue } from '../objects/NumericValue.js';
import { sanitizeDomId } from '../utils.js';
import { ComponentTypes } from '../globals.js';

export type ComponentPinMeta = {
    id: string;
    name: string;
    type: string;
    side: string;
    position: number;
    netName: string | null;
};

export type ComponentMeta = {
    domId: string;
    type: ComponentTypes,
    refDes: string | null;
    instanceName: string;
    params: { key: string; value: string }[];
    pins: ComponentPinMeta[];
};

function stringifyParamValue(value: number | string | NumericValue): string {
    if (value instanceof NumericValue) {
        return value.toDisplayString();
    }
    return String(value);
}

export function generateComponentMetadata(sheetFrames: SheetFrame[]): ComponentMeta[] {
    const result: ComponentMeta[] = [];

    const nc_nets: string[] = [];

    sheetFrames.forEach((sheet, sheetIndex) => {
        // Get nets that have NC component.
        for (const item of sheet.components) {
            const { component } = item;
            if (component.typeProp === ComponentTypes.graphic
                && component.hasParam('no_connect')
                && component.getParam('no_connect') === true
            ) {
                nc_nets.push(
                    component.pinNets.get(component.getDefaultPin())!.toString());
            }
        }

        for (const item of sheet.components) {
            const { component: instance } = item;
            const pins = Array.from(instance.pins.values()).sort((a, b) => {
                const av = Number(a.id.toString());
                const bv = Number(b.id.toString());
                const aNum = Number.isFinite(av);
                const bNum = Number.isFinite(bv);
                if (aNum && bNum) return av - bv;
                if (aNum) return -1;
                if (bNum) return 1;
                return a.id.toString().localeCompare(b.id.toString());
            }).map(p => {
                let usePinName = p.name;
                if (p.name instanceof NumericValue) {
                    usePinName = (p.name as NumericValue).toNumber().toString();
                }

                let netName: string | null = null;
                for (const [pinId, net] of instance.pinNets) {
                    if (pinId.equals(p.id)) {
                        netName = net.name;
                        // If pin is on a NC net, then do not display the 
                        // net name.
                        if (nc_nets.indexOf(net.toString()) !== -1) {
                            netName = null;
                        }
                        break;
                    }
                }

                return {
                    id: p.id.toString(),
                    name: usePinName,
                    type: p.pinType,
                    side: p.side,
                    position: p.position,
                    netName,
                }
            });

            result.push({
                domId: sanitizeDomId(`comp-${sheetIndex}-${instance.instanceName}`),
                type: instance.typeProp,
                refDes: instance.assignedRefDes,
                instanceName: instance.instanceName,
                params: Array.from(instance.parameters.entries()).map(([key, value]) => ({
                    key,
                    value: stringifyParamValue(value),
                })),
                pins,
            });
        }
    });

    return result;
}
