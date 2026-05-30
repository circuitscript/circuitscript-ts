/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export enum PinTypes {
    // Default pin type
    Passive = 'passive',
    Any = 'any',
    
    Input = 'input',
    Output = 'output',
    IO = 'io',
    HiZ = 'hiz',
    OpenCollector = 'open_collector',
    OpenEmitter = 'open_emitter',
    
    // Used for supply/GND net declaration/membership
    Power = 'power',
    
    // Reference potential connection.
    PowerReference = 'power_reference',

    // Consumes from voltage rail.
    PowerInput = 'power_input',

    // Source/drives voltage rail.
    PowerOutput = 'power_output',
    
    NoConnect = 'no_connect',
}

export function normalizePinType(value: string): string {
    switch (value) {
        case 'in':        return PinTypes.Input;
        case 'out':       return PinTypes.Output;
        case 'power_in':  return PinTypes.PowerInput;
        case 'power_out': return PinTypes.PowerOutput;
        case 'power_ref': return PinTypes.PowerReference;
        case 'nc':        return PinTypes.NoConnect;
        default:          return value;
    }
}

export function resolvePinType(value: string): PinTypes {
    return Object.values(PinTypes).find((v) => v === value) as PinTypes;
}

export const AllPinTypes = [
    PinTypes.Any,
    PinTypes.Passive,

    PinTypes.Power,
    PinTypes.PowerInput,
    PinTypes.PowerOutput,
    PinTypes.PowerReference,
    
    PinTypes.Input,
    PinTypes.Output,
    PinTypes.IO,
    PinTypes.HiZ,
    PinTypes.Passive,
    PinTypes.OpenCollector,
    PinTypes.OpenEmitter,
    PinTypes.NoConnect,
]