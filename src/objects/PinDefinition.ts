import { PortSide } from '../layout';
import { PinTypes } from './PinTypes';

export type PinId = number | string;

export class PinDefinition {
    id: PinId;

    idType: PinIdType;

    pinType: PinTypes;

    name: string;
    altNames: string[];

    side: string = PortSide.EAST;

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
    Int = 'int',
    Str = 'str',
}

export class PinReference {}
