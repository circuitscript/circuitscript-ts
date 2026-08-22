/*
 * Copyright 2023 Liu Weihao
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SheetFrame } from './layout.js';
import { NumericValue } from '../objects/NumericValue.js';
import { sanitizeDomId } from '../utils.js';
import { ComponentTypes } from 'src/globals.js';

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

    sheetFrames.forEach((sheet, sheetIndex) => {
        for (const item of sheet.components) {
            const c = item.component;

            result.push({
                domId: sanitizeDomId(`comp-${sheetIndex}-${c.instanceName}`),
                type: c.typeProp,
                refDes: c.assignedRefDes,
                instanceName: c.instanceName,
                params: Array.from(c.parameters.entries()).map(([key, value]) => ({
                    key,
                    value: stringifyParamValue(value),
                })),
                pins: Array.from(c.pins.values()).map(p => {
                    let usePinName = p.name;
                    if (p.name instanceof NumericValue){
                        usePinName = (p.name as NumericValue).toNumber().toString();
                    }

                    let netName: string | null = null;
                    for (const [pinId, net] of c.pinNets) {
                        if (pinId.equals(p.id)) {
                            netName = net.name;
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
                }),
            });
        }
    });

    return result;
}
