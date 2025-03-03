/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { PinTypes } from './PinTypes.js';

export type PinId = number | string;

export class PinDefinition {
    id: PinId;

    idType: PinIdType;

    pinType: PinTypes;

    name: string;
    altNames: string[];

    side: string = PortSide.EAST;

    position = -1;

    constructor(
        id: PinId,
        idType: PinIdType,
        name: string,
        pinType = PinTypes.Any,
        altNames = [],
    ) {
        this.id = id;
        this.idType = idType;

        this.pinType = pinType;

        this.name = name;
        this.altNames = altNames;
    }
}

export enum PinIdType {
    /** Pin specified as a number */
    Int = 'int',

    /** Pin specified as string (PA3, etc.) */
    Str = 'str',
}

export enum PortSide {
    WEST = 'WEST',
    EAST = 'EAST',
    SOUTH = 'SOUTH',
    NORTH = 'NORTH'
}