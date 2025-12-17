/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { RuntimeExecutionError } from '../utils.js';
import { NumericValue } from './ParamDefinition.js';
import { PinTypes } from './PinTypes.js';

export class PinId {
    private value: number | string;
    private type: PinIdType;

    constructor(value: number | string) {
        if (typeof value !== 'string' && typeof value !== 'number'){
            throw new RuntimeExecutionError("Invalid value for PinId: " + value);
        }

        this.value = value;
        this.type = typeof value === 'number' ? PinIdType.Int : PinIdType.Str;
    }

    getValue(): number | string {
        return this.value;
    }

    getType(): PinIdType {
        return this.type;
    }

    isNumeric(): boolean {
        return this.type === PinIdType.Int;
    }

    isString(): boolean {
        return this.type === PinIdType.Str;
    }

    toString(): string {
        return this.value.toString();
    }

    equals(other: PinId | number | string): boolean {
        if (other instanceof PinId) {
            return this.value === other.value 
                && this.getType() === other.getType();
        }
        return this.value === other;
    }

    /** 
     * This value allows for easier comparison
     */
    getHashValue(): string {
        if (this.type === PinIdType.Int) {
            return 'int-' + this.value;
        } else if (this.type === PinIdType.Str) {
            return 'str-' + this.value;
        }

        return '';
    }

    static from(value: number | string | NumericValue): PinId {
        if (value instanceof NumericValue) {
            return new PinId(value.toNumber());
        }
        return new PinId(value);
    }

    static isPinIdType(value: number | string): boolean {
        return (typeof value === 'number' || typeof value === 'string');
    }
}

export class PinDefinition {
    id: PinId;

    idType: PinIdType;

    pinType: PinTypes;

    name: string;
    altNames: string[];

    side: string = PortSide.EAST;

    position = -1;

    constructor(
        id: PinId | number | string,
        idType: PinIdType,
        name: string,
        pinType = PinTypes.Any,
        altNames = [],
    ) {
        this.id = id instanceof PinId ? id : new PinId(id);
        this.idType = this.id.getType();

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

export function isPinId(item: any): boolean {
    return item instanceof PinId || (typeof item === 'number' || typeof item === 'string');
}

export function getPinDefinition(map: Map<PinId, PinDefinition>, id: PinId): PinDefinition {
    const keys = Array.from(map.keys());

    // Method is needed to ensure that the correct object is used as the key.
    const tmpKey = keys.find(item => item.equals(id))!;

    return map.get(tmpKey)!;
}