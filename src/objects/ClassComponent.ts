/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { SymbolDrawingCommands } from '../draw_symbols.js';
import { Net } from './Net.js';
import { PinDefinition, PinId, PinIdType } from './PinDefinition.js';
import { PinTypes } from './PinTypes.js';
import { WireSegment } from './Wire.js';

export class ClassComponent {

    // A component has an instance_name to identify it
    // num_pins: The maximum number of pins that are avaible from this component
    // Note: the pin number starts from 1

    instanceName: string;
    numPins: number;

    parameters: Map<string, number | string> = new Map();

    // Maps pin indexes to the pin definition
    pins: Map<number, PinDefinition> = new Map();

    // Maps pin indexes to the nets.
    pinNets: Map<number, Net> = new Map();

    pinWires: Map<number, WireSegment[]> = new Map();

    // The cached values are used for easier comparison/equality check.
    _cachedPins: string;
    _cachedParams: string;

    className: string;

    // For nets, labels and gnds, this can be used to identify different
    // copies of the same symbol on the schematic
    _copyID?: number = null;
    _copyFrom?: ClassComponent = null;

    // This determines how pins are arrange on the component/symbol.
    arrangeProps: Map<string, number[]> | null = null;

    // Used to identify what graphic to draw for this symbol
    displayProp: string | SymbolDrawingCommands | null = null;

    widthProp: number | null = null;

    typeProp: string | null = null;
    
    // If true, then this component is copied upon reference.
    // Used for nets, supply, gnd, labels
    copyProp = false;

    // The angle that the graphical symbol is drawing with.
    // For example, a horizontal resistor will have an angle of 0.
    // A vertical capacitor will have an angle of 90.
    angleProp = 0;

    // If true, then the component's angle will follow the connected
    // wire orientation.
    followWireOrientationProp = true;

    styles: { [key: string]: number | string } = {};

    assignedRefDes: string | null = null;

    constructor(instanceName: string, numPins: number, className: string) {
        this.instanceName = instanceName;
        this.numPins = numPins;
        this.className = className;
    }

    setupPins(): void {
        // Let pin index start from 1.
        for (let i = 1; i < this.numPins + 1; i++) {
            const pinIndex = i;
            this.pins.set(
                pinIndex,
                new PinDefinition(
                    pinIndex,
                    PinIdType.Int,
                    pinIndex.toString(),
                    PinTypes.Any,
                ),
            );
        }

        this.refreshPinsCache();
    }

    getDefaultPin(): number {
        // Return id of the default pin
        return 1;
    }

    hasPin(pinId: number | string): boolean {
        if (typeof pinId === 'number') {
            return this.pins.has(pinId);
        } else {
            // assume is string
            for (const [, pinDef] of this.pins) {
                if (
                    pinDef.name === pinId ||
                    pinDef.altNames.indexOf(pinId) !== -1
                ) {
                    return true;
                }
            }
        }

        return false;
    }

    getPin(pinId: number | string): PinId {
        // Given a pinId, which is either a number of string,
        // this returns the pin index in the component.
        // If the pinId does not match, then a -1 is returned.

        if (typeof pinId === 'number') {
            return pinId;
        } else {
            // assume is string
            for (const [pin, pinDef] of this.pins) {
                if (
                    pinDef.name === pinId ||
                    pinDef.altNames.indexOf(pinId) !== -1
                ) {
                    return pin;
                }
            }

            return -1;
        }
    }

    getNextPinAfter(pinIndex: number): number {
        if (pinIndex + 1 <= this.numPins) {
            return pinIndex + 1;
        } else {
            // No more next pin, so just wrap around.
            // Might not be the right behaviour...
            return 1;
        }
    }

    setParam(key: string, value: number | string): void {
        this.parameters.set(key, value);
        this.refreshParamCache();
    }

    private refreshParamCache(): void {
        this._cachedParams = 
            JSON.stringify(Object.fromEntries(this.parameters));
    }

    private refreshPinsCache(): void {
        this._cachedPins = JSON.stringify(Object.fromEntries(this.pins));
    }

    refreshCache(): void {
        this.refreshParamCache();
        this.refreshPinsCache();
    }

    getParam(key: string): number | string {
        if (this.parameters.has(key)) {
            return this.parameters.get(key);
        } else {
            throw 'Invalid parameter key';
        }
    }

    toString(): string {
        return this.instanceName;
    }

    static simple(
        instanceName: string,
        numPins: number,
        className: string,
    ): ClassComponent {
        const component = new ClassComponent(instanceName, numPins, className);
        component.setupPins();
        return component;
    }

    isEqual(other: ClassComponent): boolean {
        // Use manual comparison as this is faster than lodash.
        // Make sure that all important props are added.
        return this.instanceName === other.instanceName 
            && this.numPins === other.numPins
            && this.className === other.className
            && this._copyID === other._copyID
            && this.arrangeProps === other.arrangeProps
            && this.displayProp === other.displayProp 
            && this.widthProp === other.widthProp
            && this.typeProp === other.typeProp
            && this._cachedPins === other._cachedPins
            && this._cachedParams === other._cachedParams;
    }

    clone(): ClassComponent {
        // returns new copy, angle, flipX, flipY should be reset
        const component = new ClassComponent(
            this.instanceName, this.numPins, this.className);

        component._copyID = this._copyID;
        component.arrangeProps = this.arrangeProps;
        component.widthProp = this.widthProp;
        component.typeProp = this.typeProp;

        if (this.displayProp) {
            if (typeof this.displayProp === "string") {
                component.displayProp = this.displayProp;
            } else if (this.displayProp instanceof SymbolDrawingCommands) {
                // Do a proper clone, otherwise, cloned objects will share the 
                // same drawing object.
                component.displayProp =
                    (this.displayProp as SymbolDrawingCommands).clone();
            }
        }

        for (const [key, value] of this.parameters) {
            if (key === 'flipX' || key === 'flipY' || key === 'angle') {
                continue;
            }

            component.parameters.set(key, value);
        }

        for (const [key, value] of this.pins) {
            component.pins.set(key, value);
        }

        for (const key in this.styles) {
            component.styles[key] = this.styles[key];
        }

        component.refreshCache();
        return component;
    }
}
