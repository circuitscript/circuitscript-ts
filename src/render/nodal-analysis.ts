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
import { RuntimeExecutionError } from "../errors.js";

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
 * are treated as unknown/floating and solved for via nodal analysis.
 *
 * `voltageSources` are two-terminal fixed-voltage-offset constraints
 * (net1 - net2 = diff), e.g. a diode's forward-drop clamp registered via
 * set_voltage_diff(). A constraint where one side is already known/fixed
 * is resolved by direct substitution. A constraint between two otherwise-
 * unknown nets is folded into the linear system as an extra unknown
 * (branch current) and an extra constraint row, following modified nodal
 * analysis (MNA) - this is what lets e.g. a diode's clamp actually pull on
 * the node upstream of it, instead of only asserting the clamped pin's own
 * voltage in isolation.
 *
 * `driveConstraints` are asymmetric: each adds one unknown (current
 * injected at `driveNet`, letting it source/sink whatever current is
 * required, like an ideal driver) and one equation pinning `targetNet`'s
 * voltage to `targetValue`. Unlike `voltageSources`, this is not a
 * difference between two nets - only `targetNet`'s absolute voltage is
 * constrained, and `driveNet`'s own voltage falls out of the surrounding
 * resistor network. This is what `drive()` uses to find the output voltage
 * that drives a downstream node to a target value. */
export function calculateNodeVoltages(
    netMap: NetMap,
    voltages: Map<Net, NumericValue | HighImpedanceValue>,
    voltageSources: { net1: Net, net2: Net, diff: number }[] = [],
    driveConstraints: { driveNet: Net, targetNet: Net, targetValue: number }[] = []
): {
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

    const repIndexOfNet = new Map<Net, number>();
    representatives.forEach((rep, index) => repIndexOfNet.set(rep, index));

    // Map each voltage-source constraint onto representative nets, dropping
    // any that resolve to the same representative (already merged/shorted
    // together via a zero-ohm resistor - the constraint is then redundant).
    const sourceEdges: { repA: Net, repB: Net, diff: number }[] = [];
    voltageSources.forEach(({ net1, net2, diff }) => {
        const repA = representativeOf.get(net1);
        const repB = representativeOf.get(net2);
        if (!repA || !repB || repA === repB) {
            return;
        }
        sourceEdges.push({ repA, repB, diff });
    });

    // Propagate: a constraint with one side already known directly
    // determines the other side's voltage by substitution. Repeat until no
    // more edges can be resolved this way; only edges left with both sides
    // unknown afterwards need the branch-current MNA handling below.
    let changed = true;
    while (changed) {
        changed = false;
        for (const edge of sourceEdges) {
            const aKnown = knownVoltageOf.has(edge.repA);
            const bKnown = knownVoltageOf.has(edge.repB);
            if (aKnown && !bKnown) {
                knownVoltageOf.set(edge.repB, knownVoltageOf.get(edge.repA)! - edge.diff);
                changed = true;
            } else if (bKnown && !aKnown) {
                knownVoltageOf.set(edge.repA, knownVoltageOf.get(edge.repB)! + edge.diff);
                changed = true;
            }
        }
    }

    // After propagation, any edge still touching an unknown net has both
    // sides unknown (a one-side-unknown edge would have been resolved
    // above); edges with both sides known are already satisfied/redundant.
    const unresolvedSourceEdges = sourceEdges.filter(edge =>
        !knownVoltageOf.has(edge.repA) || !knownVoltageOf.has(edge.repB));

    // Map drive constraints onto representative nets, validating now that
    // propagation has settled (so nets only known via a chain of other
    // constraints in this same solve are correctly seen as known) and
    // before the unknownIndices.length === 0 early return below (which
    // would otherwise let a drive() call on an all-fixed-voltage circuit
    // silently skip this check).
    const driveEdges: { driveRep: Net, targetRep: Net, targetValue: number }[] = [];
    driveConstraints.forEach(({ driveNet, targetNet, targetValue }) => {
        const driveRep = representativeOf.get(driveNet);
        const targetRep = representativeOf.get(targetNet);
        if (!driveRep || !targetRep) {
            return;
        }
        if (driveRep === targetRep) {
            throw new RuntimeExecutionError('drive() cannot drive a net to itself');
        }
        if (knownVoltageOf.has(driveRep) || knownVoltageOf.has(targetRep)) {
            throw new RuntimeExecutionError('drive() target/output net is already fixed to a known voltage');
        }
        driveEdges.push({ driveRep, targetRep, targetValue });
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

    // Express the remaining voltage-source edges in terms of position
    // within solvableIndices (same index space as Guu/Guk).
    const repIndexToLocal = new Map<number, number>();
    unknownIndices.forEach((repIndex, localIndex) => repIndexToLocal.set(repIndex, localIndex));

    const localSourceEdges = unresolvedSourceEdges.map(edge => ({
        a: repIndexToLocal.get(repIndexOfNet.get(edge.repA)!)!,
        b: repIndexToLocal.get(repIndexOfNet.get(edge.repB)!)!,
        diff: edge.diff,
    }));

    // Same two-stage mapping as localSourceEdges above, built fresh from
    // the already-validated driveEdges (not reused from an earlier stage).
    const localDriveEdges = driveEdges.map(edge => ({
        driveLocal: repIndexToLocal.get(repIndexOfNet.get(edge.driveRep)!)!,
        targetLocal: repIndexToLocal.get(repIndexOfNet.get(edge.targetRep)!)!,
        targetValue: edge.targetValue,
    }));

    // Remove unknown nets with zero total conductance and no voltage-source
    // coupling (not connected to any resistor or constraint edge),
    // otherwise the matrix remains singular and solve() will throw.
    const sourceDegree = new Array(solvableIndices.length).fill(0);
    localSourceEdges.forEach(edge => {
        sourceDegree[edge.a]++;
        sourceDegree[edge.b]++;
    });
    localDriveEdges.forEach(edge => {
        sourceDegree[edge.driveLocal]++;
        sourceDegree[edge.targetLocal]++;
    });

    for (let i = solvableIndices.length - 1; i >= 0; i--) {
        if (Guu.get(i, i) === 0 && sourceDegree[i] === 0) {
            Guu.removeColumn(i);
            Guu.removeRow(i);
            Guk.removeRow(i);
            solvableIndices.splice(i, 1);
            sourceDegree.splice(i, 1);
            localSourceEdges.forEach(edge => {
                if (edge.a > i) edge.a--;
                if (edge.b > i) edge.b--;
            });
            localDriveEdges.forEach(edge => {
                if (edge.driveLocal > i) edge.driveLocal--;
                if (edge.targetLocal > i) edge.targetLocal--;
            });
        }
    }

    // A driveNet with no real resistor connection anywhere (only the
    // abstract drive edge itself) produces a singular augmented matrix -
    // see plan risk note. Reject it explicitly rather than let solve()
    // fail opaquely or silently misbehave.
    localDriveEdges.forEach(edge => {
        const i = edge.driveLocal;
        const hasSelfConductance = Guu.get(i, i) !== 0;
        const hasSourceEdge = localSourceEdges.some(sourceEdge => sourceEdge.a === i || sourceEdge.b === i);
        if (!hasSelfConductance && !hasSourceEdge) {
            throw new RuntimeExecutionError('drive() output net has no electrical connection to the rest of the circuit');
        }
    });

    if (solvableIndices.length === 0) {
        return { nets: instancePinNets, netVoltages };
    }

    // Iu = 0, since only resistors (no independent current sources) are
    // modeled: Guu . Vu = Iu - Guk . Vk = -Guk . Vk
    const knownVoltageVector = Matrix.columnVector(
        knownIndices.map(index => getKnownVoltage(representatives[index]))
    );

    // Group solvable unknown nets into connected components, via direct
    // resistor coupling in Guu OR a voltage-source edge between them (a
    // component with no path to any known net is an unreferenced "floating
    // island" with no voltage reference and cannot be solved; solving it
    // together with the rest of the matrix would make the whole system
    // singular, so each component is solved independently and unreferenced
    // ones are simply skipped).
    const adjacency: number[][] = solvableIndices.map(() => []);
    for (let i = 0; i < solvableIndices.length; i++) {
        for (let j = i + 1; j < solvableIndices.length; j++) {
            if (Guu.get(i, j) !== 0) {
                adjacency[i].push(j);
                adjacency[j].push(i);
            }
        }
    }
    localSourceEdges.forEach(edge => {
        adjacency[edge.a].push(edge.b);
        adjacency[edge.b].push(edge.a);
    });
    localDriveEdges.forEach(edge => {
        adjacency[edge.driveLocal].push(edge.targetLocal);
        adjacency[edge.targetLocal].push(edge.driveLocal);
    });

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
        const componentIndex = new Set(component);
        const componentDriveEdges = localDriveEdges.filter(edge =>
            componentIndex.has(edge.driveLocal) && componentIndex.has(edge.targetLocal));

        // A drive constraint's row (v_targetNet = targetValue) is itself an
        // absolute voltage reference, so it counts alongside a path to a
        // known net when deciding whether this component is solvable.
        const isReferenced = component.some(localIndex => {
            return allKnownColumns.some(column => Guk.get(localIndex, column) !== 0);
        }) || componentDriveEdges.length > 0;

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

        // Voltage-source edges fully contained in this component each add
        // one extra unknown (branch current) and one extra constraint row
        // (v_p - v_m = diff), following modified nodal analysis.
        const componentEdges = localSourceEdges.filter(edge =>
            componentIndex.has(edge.a) && componentIndex.has(edge.b));

        // Two drive constraints in the same component sharing a target or
        // drive net would over-determine the system - reject rather than
        // let solve() fail opaquely or silently pick one. Scoped per
        // component: the same net reused across independent components is
        // not a conflict.
        for (let i = 0; i < componentDriveEdges.length; i++) {
            for (let j = i + 1; j < componentDriveEdges.length; j++) {
                const edgeA = componentDriveEdges[i];
                const edgeB = componentDriveEdges[j];
                if (edgeA.targetLocal === edgeB.targetLocal || edgeA.driveLocal === edgeB.driveLocal) {
                    throw new RuntimeExecutionError('conflicting drive() constraints on the same net');
                }
            }
        }

        const n = component.length;
        const m = componentEdges.length;
        const d = componentDriveEdges.length;

        let A = componentGuu;
        let rhs = componentRhs;

        if (m > 0 || d > 0) {
            const localOf = new Map<number, number>();
            component.forEach((uIndex, cIndex) => localOf.set(uIndex, cIndex));

            A = Matrix.zeros(n + m + d, n + m + d);
            rhs = Matrix.zeros(n + m + d, 1);

            for (let r = 0; r < n; r++) {
                for (let c = 0; c < n; c++) {
                    A.set(r, c, componentGuu.get(r, c));
                }
                rhs.set(r, 0, componentRhs.get(r, 0));
            }

            componentEdges.forEach((edge, edgeIdx) => {
                const row = n + edgeIdx;
                const pLocal = localOf.get(edge.a)!;
                const mLocal = localOf.get(edge.b)!;

                // KCL: branch current leaves node p, enters node m.
                A.set(pLocal, row, A.get(pLocal, row) + 1);
                A.set(mLocal, row, A.get(mLocal, row) - 1);

                // Constraint row: v_p - v_m = diff
                A.set(row, pLocal, 1);
                A.set(row, mLocal, -1);
                rhs.set(row, 0, edge.diff);
            });

            componentDriveEdges.forEach((edge, edgeIdx) => {
                const row = n + m + edgeIdx;
                const driveLocal = localOf.get(edge.driveLocal)!;
                const targetLocal = localOf.get(edge.targetLocal)!;

                // Column: injected current at driveNet only - asymmetric
                // vs. a diff branch's +1/-1 pair. The drive node
                // sources/sinks whatever current is required, balanced
                // implicitly by the surrounding resistor network's own
                // (unmodified) KCL rows rather than by a second unknown
                // node. Only solvable when driveNet has a real resistor
                // path (direct or indirect) to targetNet - see the
                // pruning-stage dangling-driveNet check above.
                A.set(driveLocal, row, A.get(driveLocal, row) + 1);

                // Row: pin targetNet's voltage to targetValue.
                A.set(row, targetLocal, 1);
                rhs.set(row, 0, edge.targetValue);
            });
        }

        try {
            const solution = solve(A, rhs);

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
