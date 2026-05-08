/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export enum PinTypes {
    Any = 'any',
    Input = 'input',
    Output = 'output',
    IO = 'io',
    HiZ = 'hiz',
    Passive = 'passive',
    OpenCollector = 'open_collector',
    OpenEmitter = 'open_emitter',
    Power = 'power',
    PowerInput = 'power_input',
    PowerOutput = 'power_output',
    Unspecified = 'unspecified',
    NoConnect = 'no_connect',
}

export const AllPinTypes = [
    PinTypes.Any,
    PinTypes.Input,
    PinTypes.Output,
    PinTypes.IO,
    PinTypes.HiZ,
    PinTypes.Passive,
    PinTypes.OpenCollector,
    PinTypes.OpenEmitter,
    PinTypes.Power,
    PinTypes.PowerInput,
    PinTypes.PowerOutput,
    PinTypes.Unspecified,
    PinTypes.NoConnect,
]