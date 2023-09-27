import { PinDefinition, PinIdType } from './PinDefinition';
import { PinTypes } from './PinTypes';

export class Component {
    // A component has an instance_name to identify it
    // num_pins: The maximum number of pins that are avaible from this component
    // Note: the pin number starts from 1

    instanceName: string;
    numPins: number;

    parameters: Map<string, number | string> = new Map();

    // Maps pin indexes to the pin definition
    pins: Map<number, PinDefinition> = new Map();

    constructor(instanceName: string, numPins = 1) {
        this.instanceName = instanceName;
        this.numPins = numPins;
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

    getPin(pinId: number | string): number {
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
            // No more next pin, so just return the
            // same index
            return pinIndex;
        }
    }

    setParam(key: string, value: number | string): void {
        this.parameters.set(key, value);
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
}

export class ClassComponent extends Component {
    className: string;

    // For nets, labels and gnds, this can be used to identify different
    // copies of the same symbol on the schematic
    _linkID?: string | number;

    // This determines how pins are arrange on the component/symbol.
    arrangeProps: Map<string, number[]> | null = null;

    // Used to identify what graphic to draw for this symbol
    displayProp: string | null = null;

    widthProp: number | null = null;

    styles: { [key: string]: number | string } = {};

    constructor(instanceName: string, numPins: number, className: string) {
        super(instanceName, numPins);
        this.className = className;
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
}
