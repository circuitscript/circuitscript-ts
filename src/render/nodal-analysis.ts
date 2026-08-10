/*
 * Copyright 2023 Liu Weihao
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Matrix, { solve } from "ml-matrix";
import { ComponentTypes } from "../globals.js";
import { ClassComponent } from "../objects/ClassComponent.js";
import { Net } from "../objects/Net.js";
import { NumericValue } from "../objects/NumericValue.js";
import { ComponentPinNetPair, NetTypes } from "../objects/types.js";
import { HighImpedanceValue } from "../behavior.js";
import { NetMap } from "../objects/NetMap.js";
import { PinId } from "../objects/PinDefinition.js";

/** Union-find over `Net`s, used to merge nets shorted together by
 * zero-ohm resistors so they can be treated as a single node during
 * matrix construction and solving. */
class NetUnion {
    private nets = new Map<Net, Set<Net>>();
    private index = new Map<Net, number>();
    private counter = 0;

    /** Registers `net` as its own singleton set, if not already known. */
    setup(net: Net): void {
        if (!this.nets.has(net)){
            this.nets.set(net, new Set([net]));
            this.index.set(net, this.counter);
            this.counter++;
        }
    }

    /** Merges the sets containing `netA` and `netB` into one, keyed under
     * whichever net was registered first (lower `setup()` index). */
    union(netA: Net, netB: Net): void {
        const indexA = this.index.get(netA)!;
        const indexB = this.index.get(netB)!;

        const parentNet = indexA < indexB ? netA : netB;
        const childNet = indexA < indexB ? netB : netA;

        const parentSet = this.nets.get(parentNet)!;
        const childSet = this.nets.get(childNet)!;

        /* Merge the parent and child set. Because the parent net is always
         added first, the net with the lower assigned index will always be
         earlier in the list. */
        const newSet = new Set([...parentSet, ...childSet]);

        // Update each child set to point to the parent set
        newSet.forEach(net => {
            this.nets.set(net, newSet);
        });
    }

    /** Returns a representative net for the set containing `net`. This will be
     *  the net with the lowest assigned index. */
    getSetRoot(net: Net): Net {
        return this.nets.get(net)!.values().next().value;
    }
}

/** Builds the conductance matrix for every net in `netMap`, stamping only
 * resistor pins for now. Zero-ohm resistors are treated as a direct short:
 * rather than stamping a (near-)infinite conductance value, their two
 * endpoints are merged into a single representative net for matrix/solve
 * purposes via union-find. Every original net keeps its own identity in
 * `netsIndexed`/`representativeOf` so callers can still report a result for
 * both sides of a short. */
function buildConductanceMatrix(netMap: NetMap): {
    netsIndexed: Net[],
    conductanceMatrix: Matrix,
    representativeOf: Map<Net, Net>,
    representatives: Net[],
} {
    const nets = netMap.getNets();

    const netsIndexed = Array.from(new Set<Net>(nets.map(([,,net]) => net)));
    const components = new Set<ClassComponent>(nets.map(([component, , ]) => component));

    const netUnions = new NetUnion();
    netsIndexed.forEach(net => netUnions.setup(net));

    // Apply net union for nets joined with a zero-ohm resistor.
    components.forEach(item => {
        if (item.typeProp === ComponentTypes.resistor) {
            const resistance: NumericValue = item.parameters.get('value')!;

            if (resistance.toNumber() === 0) {
                const net1 = netMap.get(item, PinId.from(1));
                const net2 = netMap.get(item, PinId.from(2));

                if (net1 && net2) {
                    netUnions.union(net1, net2);
                }
            }
        }
    });

    const representativeOf = new Map<Net, Net>();
    netsIndexed.forEach(net => {
        representativeOf.set(net, netUnions.getSetRoot(net));
    });

    const representatives = Array.from(new Set(representativeOf.values()));
    const representativeIndex = new Map<Net, number>();
    representatives.forEach((net, index) => representativeIndex.set(net, index));

    const conductanceMatrix = Matrix.zeros(representatives.length, representatives.length);

    // Parse only resistors for now
    components.forEach(item => {
        if (item.typeProp === ComponentTypes.resistor){
            const net1 = netMap.get(item, PinId.from(1));
            const net2 = netMap.get(item, PinId.from(2));

            const resistance: NumericValue = item.parameters.get('value')!;
            const resistanceValue = resistance.toNumber();

            const net1Index = representativeIndex.get(representativeOf.get(net1!)!)!;
            const net2Index = representativeIndex.get(representativeOf.get(net2!)!)!;

            // Zero-ohm resistors were already folded into a shared
            // representative above. A nonzero resistor whose endpoints
            // still resolve to the same representative is a redundant loop
            // in parallel with an existing short, and contributes nothing.
            if (resistanceValue === 0 || net1Index === net2Index) {
                return;
            }

            const conductanceValue = 1/resistanceValue;

            const currentValue1 = conductanceMatrix.get(net1Index, net1Index);
            const currentValue2 = conductanceMatrix.get(net2Index, net2Index);

            const currentValue3 = conductanceMatrix.get(net1Index, net2Index);
            const currentValue4 = conductanceMatrix.get(net2Index, net1Index);

            conductanceMatrix.set(net1Index, net1Index, currentValue1 + conductanceValue);
            conductanceMatrix.set(net2Index, net2Index, currentValue2 + conductanceValue);

            conductanceMatrix.set(net1Index, net2Index, currentValue3 - conductanceValue);
            conductanceMatrix.set(net2Index, net1Index, currentValue4 - conductanceValue);
        }
    });

    return { netsIndexed, conductanceMatrix, representativeOf, representatives };
}

/** Groups `netsIndexed` by their representative net, so a representative's
 * merged group (nets tied together by zero-ohm resistors) can be looked up
 * and broadcast a shared result back to every original net in the group. */
function groupNetsByRepresentative(netsIndexed: Net[], representativeOf: Map<Net, Net>): Map<Net, Net[]> {
    const membersOf = new Map<Net, Net[]>();
    netsIndexed.forEach(net => {
        const rep = representativeOf.get(net)!;
        if (!membersOf.has(rep)) {
            membersOf.set(rep, []);
        }
        membersOf.get(rep)!.push(net);
    });
    return membersOf;
}

export function printConductanceMatrix(matrix: Matrix, netsIndexed: Net[]): void {
    const netNames = netsIndexed.map(net => net.toString());

    const cells: string[][] = [];
    for (let row = 0; row < matrix.rows; row++) {
        const rowValues: string[] = [];
        for (let col = 0; col < matrix.columns; col++) {
            rowValues.push(matrix.get(row, col).toFixed(6));
        }
        cells.push(rowValues);
    }

    const rowLabelWidth = Math.max(0, ...netNames.map(name => name.length));
    const colWidths = netNames.map((name, col) => {
        const cellWidths = cells.map(row => row[col].length);
        return Math.max(name.length, ...cellWidths);
    });

    const padRow = (label: string, values: string[]): string => {
        const paddedLabel = label.padEnd(rowLabelWidth);
        const paddedValues = values.map((value, col) => value.padStart(colWidths[col]));
        return [paddedLabel, ...paddedValues].join('  ');
    };

    console.log(padRow('', netNames.map((name, col) => name.padStart(colWidths[col]))));

    for (let row = 0; row < matrix.rows; row++) {
        console.log(padRow(netNames[row], cells[row]));
    }
}

/** Solves for the voltage of every net given a set of fixed net voltages.
 * Nets not present in `voltages`, or explicitly set to a `HighImpedanceValue`,
 * are treated as unknown/floating and solved for via nodal analysis. */
export function calculateNodeVoltages(netMap: NetMap, voltages: Map<Net, NumericValue | HighImpedanceValue>): {
    nets: ComponentPinNetPair[],
    netVoltages: Map<Net, number>,
} {

    const gndNet = netMap.getNetWithName("GND");
    if (voltages.get(gndNet) instanceof HighImpedanceValue) {
        console.log('Warning, GND net not set');
    }

    const instancePinNets = netMap.getNets();

    const { netsIndexed, conductanceMatrix, representativeOf, representatives } = buildConductanceMatrix(netMap);
    const membersOf = groupNetsByRepresentative(netsIndexed, representativeOf);

    // printConductanceMatrix(conductanceMatrix, representatives);

    // A representative's voltage is known if any net merged into its group
    // (via a zero-ohm resistor) has an explicit voltage. If more than one
    // member disagrees, the first one found (in netsIndexed order) wins.
    const knownVoltageOf = new Map<Net, number>();
    representatives.forEach(rep => {
        const knownMember = membersOf.get(rep)!.find(net => voltages.get(net) instanceof NumericValue);
        if (knownMember) {
            knownVoltageOf.set(rep, (voltages.get(knownMember) as NumericValue).toNumber());
        }
    });

    const getKnownVoltage = (rep: Net): number => {
        return knownVoltageOf.get(rep)!;
    };

    // Returns true for representatives that have some voltage defined (not high impedance)
    const isKnownNet = (rep: Net): boolean => {
        return knownVoltageOf.has(rep);
    };

    // Partition representative nets into known (fixed voltage) and unknown (floating) nets
    const knownIndices: number[] = [];
    const unknownIndices: number[] = [];

    representatives.forEach((rep, index) => {
        if (isKnownNet(rep)) {
            knownIndices.push(index);
        } else {
            unknownIndices.push(index);
        }
    });

    const netVoltages = new Map<Net, number>();

    const setVoltageForRepresentative = (rep: Net, value: number): void => {
        membersOf.get(rep)!.forEach(net => {
            netVoltages.set(net, value);
        });
    };

    knownIndices.forEach(index => {
        const rep = representatives[index];
        setVoltageForRepresentative(rep, getKnownVoltage(rep));
    });

    if (unknownIndices.length === 0) {
        return { nets: instancePinNets, netVoltages };
    }

    // Guu: conductance between unknown nets. Guk: conductance between
    // unknown and known nets, used to fold the known voltages into an
    // equivalent injected current on the right-hand side.
    const Guu = conductanceMatrix.selection(unknownIndices, unknownIndices);
    const Guk = conductanceMatrix.selection(unknownIndices, knownIndices);

    const solvableIndices = [...unknownIndices];

    // Remove unknown nets with zero total conductance (not connected to
    // any resistor), otherwise the matrix remains singular and solve()
    // will throw.
    for (let i = solvableIndices.length - 1; i >= 0; i--) {
        if (Guu.get(i, i) === 0) {
            Guu.removeColumn(i);
            Guu.removeRow(i);
            Guk.removeRow(i);
            solvableIndices.splice(i, 1);
        }
    }

    if (solvableIndices.length === 0) {
        return { nets: instancePinNets, netVoltages };
    }

    // Iu = 0, since only resistors (no independent current sources) are
    // modeled: Guu . Vu = Iu - Guk . Vk = -Guk . Vk
    const knownVoltageVector = Matrix.columnVector(
        knownIndices.map(index => getKnownVoltage(representatives[index]))
    );

    // Group solvable unknown nets into connected components (via direct
    // resistor coupling in Guu). A component with no path to any known net
    // is an unreferenced "floating island" with no voltage reference and
    // cannot be solved; solving it together with the rest of the matrix
    // would make the whole system singular, so each component is solved
    // independently and unreferenced ones are simply skipped.
    const adjacency: number[][] = solvableIndices.map(() => []);
    for (let i = 0; i < solvableIndices.length; i++) {
        for (let j = i + 1; j < solvableIndices.length; j++) {
            if (Guu.get(i, j) !== 0) {
                adjacency[i].push(j);
                adjacency[j].push(i);
            }
        }
    }

    const visited = new Array(solvableIndices.length).fill(false);
    const components: number[][] = [];

    for (let start = 0; start < solvableIndices.length; start++) {
        if (visited[start]) continue;

        const stack = [start];
        const component: number[] = [];
        visited[start] = true;

        while (stack.length > 0) {
            const current = stack.pop()!;
            component.push(current);
            for (const neighbor of adjacency[current]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    stack.push(neighbor);
                }
            }
        }

        components.push(component);
    }

    const allKnownColumns = knownIndices.map((_, index) => index);

    components.forEach(component => {
        const isReferenced = component.some(localIndex => {
            return allKnownColumns.some(column => Guk.get(localIndex, column) !== 0);
        });

        if (!isReferenced) {
            // Floating island: no path to a fixed-voltage net, so its
            // voltages are indeterminate.
            console.log('skipping unreferenced floating net(s):',
                component.map(localIndex => representatives[solvableIndices[localIndex]].toString()).join(', '));
            return;
        }

        const componentGuu = Guu.selection(component, component);
        const componentGuk = Guk.selection(component, allKnownColumns);
        const componentRhs = knownIndices.length > 0
            ? componentGuk.mmul(knownVoltageVector).mul(-1)
            : Matrix.zeros(component.length, 1);

        try {
            const solution = solve(componentGuu, componentRhs);

            component.forEach((localIndex, row) => {
                const repIndex = solvableIndices[localIndex];
                setVoltageForRepresentative(representatives[repIndex], solution.get(row, 0));
            });
        } catch (err) {
            // Failed to solve matrix
            console.log('failed to solve matrix', err);
        }
    });

    return {
        nets: instancePinNets,
        netVoltages,
    }
}
