import { Delimiter1 } from "../globals.js";
import { RuntimeExecutionError } from "../errors.js";
import { ClassComponent } from "./ClassComponent.js";
import { Net } from "./Net.js";
import { PinId } from "./PinDefinition.js";
import { ComponentPinNet, ComponentPinNetPair } from "./types.js";

/** Tracks the association between (component, pin) pairs and the Net they
 * belong to, and provides operations to create, look up, link, and merge
 * nets as connections are made during execution. */
export class NetMap {
    protected items: ComponentPinNetPair[] = [];

    // Resolver function to find component pin net pairs from parent contexts.
    componentPinNetPairResolver!: 
        (instance: ClassComponent, pin: PinId) => ComponentPinNetPair | undefined;

    netCounter = 1;

    logCallback!: () => void;

    getUniqueNetName(): string {
        const tmpName = `NET${Delimiter1}${this.netCounter}`;
        this.netCounter++;
        return tmpName;
    }

    newNet(namespace: string): Net;
    newNet(namespace: string, name: string | null): Net;
    newNet(namespace: string, name: string | null = null, priority = 0): Net {
        return new Net(
            namespace,
            name === null ? this.getUniqueNetName() : name,
            priority
        );
    }

    getNets(): ComponentPinNetPair[] {
        return this.items;
    }

    set(instance: ClassComponent, pin: PinId, net: Net): void {
        const pair = this.findNet(instance, pin)!;
        const result = this.items.indexOf(pair);

        if (result === -1) {
            this.items.push([instance, pin, net]);
        } else {
            this.items[result][2] = net;
        }
        this.log(`set net: ${instance} ${pin} ${net}`);
        instance.pinNets.set(pin, net);
    }

    get(instance: ClassComponent, pin: PinId): Net | null {
        const result = this.findNet(instance, pin);
        return result ? result[2] : null;
    }

    getNetWithName(name: string): Net | null {
        const found = this.items.find(([, , net]) => {
            return net.name === name;
        });

        return found ? found[2] : null;
    }

    getNetWithNamespacePath(namespace: string, name: string): Net | null {
        const found = this.items.find(([, , net]) => {
            return net.namespace === namespace && net.name === name
        });

        return found ? found[2] : null;
    }

    remove(component: ClassComponent, pin: PinId): void {
        const pair = this.findNet(component, pin)!;
        const result = this.items.indexOf(pair);

        if (result !== -1) {
            this.items.splice(result, 1);
        }

        component.pinNets.delete(pin);
    }

    findNet(instance: ClassComponent, pin: PinId, resolve = true): ComponentPinNetPair | undefined {
        if (!(pin instanceof PinId)) {
            throw new RuntimeExecutionError('Invalid value for PinId: ' + pin);
        }
        
        const found = this.items.find(([tmpComponent, tmpPin]) => {
            // Use manual equality, much faster than using lodash
            return tmpComponent.isEqual(instance) && tmpPin.equals(pin);
        });

        if (found) {
            return found;
        }
        
        // If resolve is true, then search the parent contexts.
        if (resolve && found === undefined) {
            return this.componentPinNetPairResolver(instance, pin);
        }

        return undefined;
    }

    hasNet(instance: ClassComponent, pin: PinId): boolean {
        return this.findNet(instance, pin) !== undefined;
    }

    linkComponentPinNet(
        component1: ClassComponent,
        component1Pin: PinId,
        component2: ClassComponent,
        component2Pin: PinId,
        netNamespace: string,
    ): Net {
        const net1 = this.get(component1, component1Pin);
        const net2 = this.get(component2, component2Pin);

        this.log('link nets:', component1, component1Pin, net1, 'priority:' + net1?.priority,
            'to', component2, component2Pin, net2, 'priority:' + net2?.priority);

        let returnNet: Net;

        if (net1 === null && net2 === null) {
            // Both nets do not exist yet, so create a new one
            // that both will use.
            const tmpNet = this.newNet(netNamespace);

            this.set(component1, component1Pin, tmpNet);
            this.set(component2, component2Pin, tmpNet);

            returnNet = tmpNet;

        } else if (net1 === null && net2 !== null) {
            // If net1 does not exist, but net2 exists
            this.set(component1, component1Pin, net2);
            returnNet = net2;

        } else if (net1 !== null && net2 === null) {
            // If net1 exists, but net2 does not exist
            this.set(component2, component2Pin, net1);
            returnNet = net1;

        } else {
            if (net1 !== net2) {
                returnNet = this.mergeNets(net1, net2);
            } else {
                // Otherwise, both nets are the same.
                returnNet = net1;
            }
        }

        this.log('final net after link: ', returnNet, returnNet.priority);
        return returnNet!;
    }

    /** Combines 2 nets into a single net. Component-pin pairs in the nets will
     * also be merged. By default net2 will be merged into net1 and net2 will
     * no longer be used. */
    mergeNets(net1: Net, net2: Net): Net {
        if (net1 === net2) {
            return net1;
        }

        // Check priority to ensure that net1 always
        // has the higher priority. Swap both nets
        // if this is not the case.
        if (net2.priority > net1.priority) {
            const tmpNet = net1;
            net1 = net2;
            net2 = tmpNet;
        }

        // Get all (component, pin) pairs that are linked to net2
        // and change them to net1
        this.items.forEach(([component, pin, net]) => {
            if (Net.isSame(net, net2)) {
                this.set(component, pin, net1);
            }
        });

        return net1;
    }

    clone(): NetMap {
        const cloned = new NetMap();
        cloned.items = this.items.map(([instance, pin, net]) => [instance, pin, net] as ComponentPinNetPair);
        cloned.logCallback = this.logCallback;
        cloned.componentPinNetPairResolver = this.componentPinNetPairResolver;
        return cloned;
    }

    dump(): ComponentPinNet[] {
        const sortedNet = [...this.items].sort((a, b) => {
            const netA = a[2];
            const netB = b[2];

            const netAId = netA.toString();
            const netBId = netB.toString();

            if (netAId > netBId) {
                return 1;
            } else if (netAId < netBId) {
                return -1;
            } else {
                return 0;
            }
        });

        return sortedNet.map(([component, pin, net]) => {
            return [net.toString(), component.instanceName, pin.value];
        });
    }

    log(...params) {
        this.logCallback && this.logCallback(...params);
    }

}