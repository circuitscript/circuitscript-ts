import { PinDefinition, PinIdType } from "./PinDefinition.js";
import { PinTypes } from "./PinTypes.js";
import { ComponentPin, NetMap } from "./types.js";

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

    static simple(instanceName: string, numPins = 1): Component {
        const component = new Component(instanceName, numPins);
        component.setupPins();
        return component;
    }

    setupPins(): void {
        // Let pin index start from 1.
        for (let i = 1; i < this.numPins + 1; i++) {
            const pinIndex = i;
            this.pins[pinIndex] = new PinDefinition(pinIndex, PinIdType.Int, pinIndex.toString(), PinTypes.Any);
        }
    }

    getNets(allNets: NetMap): { pin: PinDefinition, net: string }[] {
        // Returns the list of nets that the component pins are 
        // connected to.

        const result = [];

        for (const [pinId, pin] of this.pins) {
            let netName = 'NO_NET';
            const componentPin: ComponentPin = [this, pinId];

            if (allNets.has(componentPin)) {
                netName = allNets.get(componentPin).name;
            }

            result.push({
                pin: pin,
                net: netName
            })
        }

        return result;
    }

    getDefaultPin(): number {
        // Return id of the default pin
        return 1;
    }

    hasPin(pinId: number | string): boolean {
        if (typeof (pinId) === 'number') {
            return this.pins.has(pinId);

        } else {
            // assume is string
            this.pins.forEach(pin => {
                if (pin.name === pinId || pin.altNames.indexOf(pinId) !== -1) {
                    return true;
                }
            });
        }

        return false;
    }

    getPin(pinId: number | string): number {
        // Given a pinId, which is either a number of string,
        // this returns the pin index in the component.
        // If the pinId does not match, then a -1 is returned.

        if (typeof (pinId) === 'number') {
            return pinId;
        } else {
            // assume is string
            this.pins.forEach((pin, key) => {
                if (pin.name === pinId || pin.altNames.indexOf(pinId) === -1) {
                    return key;
                }
            });

            return -1;
        }
    }

    getNextPinAfter(pinIndex: number): number {
        if (pinIndex + 1 < this.numPins){
            return pinIndex + 1;
        } else {
            // No more next pin, so just return the
            // same index
            return pinIndex;
        }
    }

    setParam(key: string, value: any): void {
        this.parameters.set(key, value);
    }

    getParam(key: string): any {
        if (this.parameters.has(key)){
            return this.parameters.get(key);
        } else {
            throw "Invalid parameter key";
        }
    }

    toString(): string {
        return this.instanceName;
    }
}

export class ClassComponent extends Component {

    className: string;
    constructor(instanceName: string, className: string, numPins = 1) {
        super(instanceName, numPins);
        this.className = className;
    }

    static simple(instanceName: string, className: string, numPins): ClassComponent {
        const component = new ClassComponent(instanceName, className, numPins);
        component.setupPins();
        return component;
    }

}