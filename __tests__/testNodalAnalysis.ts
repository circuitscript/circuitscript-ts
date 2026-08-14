import { calculateNodeVoltages } from '../src/render/nodal-analysis.js';
import { RuntimeExecutionError } from '../src/errors.js';
import { numeric, NumericValue } from '../src/objects/NumericValue.js';
import { PinId } from '../src/objects/PinDefinition.js';
import { ClassComponent } from '../src/objects/ClassComponent.js';
import { Net } from '../src/objects/Net.js';
import { NetMap } from '../src/objects/NetMap.js';
import { runScript } from './helpers.js';

const TOLERANCE = 1e-3;

function expectClose(actual: number, expected: number): void {
    expect(Math.abs(actual - expected)).toBeLessThan(TOLERANCE);
}

// Strips the common leading-whitespace indentation template literals pick
// up from being nested inside test functions - the language is
// indentation-sensitive, so a script's own indentation must start at
// column 0.
function dedent(script: string): string {
    const lines = script.split('\n').filter((_, index, arr) =>
        !(index === 0 && arr[index].trim() === '') && !(index === arr.length - 1 && arr[index].trim() === ''));
    const indents = lines.filter(line => line.trim() !== '').map(line => line.match(/^ */)![0].length);
    const minIndent = Math.min(...indents);
    return lines.map(line => line.slice(minIndent)).join('\n');
}

async function buildNetwork(script: string): Promise<{
    netMap: NetMap,
    net: (varName: string, pin: number) => Net,
}> {
    const { hasError, visitor } = await runScript(dedent(script));
    expect(hasError).toEqual(false);

    const scope = visitor.getScope();
    const netMap = scope.netMap;

    const net = (varName: string, pin: number): Net => {
        const component = scope.variables.get(varName) as ClassComponent;
        return netMap.get(component, PinId.from(pin))!;
    };

    return { netMap, net };
}

// A simple OUT -> R1 -> CHECK -> R2 -> GND divider, used by several tests
// below. OUT has no direct resistor to GND (only a path to CHECK), which
// is exactly the case the Step 1.2 sourceDegree pruning fix exists for.
const DIVIDER_SCRIPT = `
    from "std" import *
    gnd = dgnd()
    out_pin = net("OUT")

    r1 = res(10k)
    r2 = res(10k)

    at out_pin
    wire right 100
    to r1 pin 1

    at r1 pin 2
    wire right 100
    to r2 pin 1

    at r2 pin 2
    wire down 100
    to gnd
`;

describe('calculateNodeVoltages - drive constraints', () => {

    test('solves a simple resistor divider for the driving voltage (also exercises the sourceDegree pruning fix, since OUT has no direct resistor to GND)', async () => {
        const { netMap, net } = await buildNetwork(DIVIDER_SCRIPT);

        const outNet = net('out_pin', 1);
        const checkNet = net('r1', 2);
        const gndNet = netMap.getNetWithName('GND');

        const voltages = new Map<Net, NumericValue>([[gndNet, numeric(0)]]);
        const target = 1;

        const { netVoltages } = calculateNodeVoltages(netMap, voltages, [], [
            { driveNet: outNet, targetNet: checkNet, targetValue: target },
        ]);

        // (Vout - target) / R1 = target / R2, with R1 == R2 => Vout = 2 * target
        expectClose(netVoltages.get(outNet)!, 2 * target);
        expectClose(netVoltages.get(checkNet)!, target);
    });

    test('throws when driveNet has zero resistor edges anywhere (fully dangling)', async () => {
        const { netMap, net } = await buildNetwork(`
            from "std" import *
            gnd = dgnd()
            out_pin = net("OUT")

            r2 = res(10k)

            at out_pin
            wire right 10

            at r2 pin 1
            wire right 10

            at r2 pin 2
            wire down 100
            to gnd
        `);

        const outNet = net('out_pin', 1);
        const checkNet = net('r2', 1);
        const gndNet = netMap.getNetWithName('GND');

        const voltages = new Map<Net, NumericValue>([[gndNet, numeric(0)]]);

        expect(() => calculateNodeVoltages(netMap, voltages, [], [
            { driveNet: outNet, targetNet: checkNet, targetValue: 1 },
        ])).toThrow(new RuntimeExecutionError('drive() output net has no electrical connection to the rest of the circuit'));
    });

    test('resolves a drive constraint that is the only voltage reference in its component (floating reference)', async () => {
        const { netMap, net } = await buildNetwork(`
            from "std" import *
            out_pin = net("OUT")
            r1 = res(10k)

            at out_pin
            wire right 100
            to r1 pin 1

            at r1 pin 2
            wire right 10
        `);

        const outNet = net('out_pin', 1);
        const checkNet = net('r1', 2);

        const voltages = new Map<Net, NumericValue>();
        const target = 2.5;

        const { netVoltages } = calculateNodeVoltages(netMap, voltages, [], [
            { driveNet: outNet, targetNet: checkNet, targetValue: target },
        ]);

        // Isolated loop: no current can flow anywhere else, so both nets
        // settle at the same, target voltage.
        expectClose(netVoltages.get(outNet)!, target);
        expectClose(netVoltages.get(checkNet)!, target);
    });

    test('throws when two drive constraints in the same component target the same net', async () => {
        const { netMap, net } = await buildNetwork(`
            from "std" import *
            gnd = dgnd()

            r1 = res(10k)
            r2 = res(10k)
            r3 = res(10k)

            at r1 pin 1
            wire right 10

            at r2 pin 1
            wire right 10

            at r1 pin 2
            wire right 10
            to r3 pin 1

            at r2 pin 2
            wire right 10
            to r3 pin 1

            at r3 pin 2
            wire down 100
            to gnd
        `);

        const outNet1 = net('r1', 1);
        const outNet2 = net('r2', 1);
        const checkNet = net('r3', 1);
        const gndNet = netMap.getNetWithName('GND');

        const voltages = new Map<Net, NumericValue>([[gndNet, numeric(0)]]);

        expect(() => calculateNodeVoltages(netMap, voltages, [], [
            { driveNet: outNet1, targetNet: checkNet, targetValue: 1 },
            { driveNet: outNet2, targetNet: checkNet, targetValue: 2 },
        ])).toThrow(new RuntimeExecutionError('conflicting drive() constraints on the same net'));
    });

    test('throws when driving a net already fixed to a known voltage directly', async () => {
        const { netMap, net } = await buildNetwork(DIVIDER_SCRIPT);

        const outNet = net('out_pin', 1);
        const checkNet = net('r1', 2);
        const gndNet = netMap.getNetWithName('GND');

        const voltages = new Map<Net, NumericValue>([
            [gndNet, numeric(0)],
            [outNet, numeric(5)],
        ]);

        expect(() => calculateNodeVoltages(netMap, voltages, [], [
            { driveNet: outNet, targetNet: checkNet, targetValue: 1 },
        ])).toThrow(new RuntimeExecutionError('drive() target/output net is already fixed to a known voltage'));
    });

    test('throws when driveNet only becomes known via voltage-source propagation within the same solve', async () => {
        const { netMap, net } = await buildNetwork(`
            from "std" import *
            gnd = dgnd()
            out_pin = net("OUT")
            fixed_pin = net("FIXED")

            r1 = res(10k)
            r2 = res(10k)

            at out_pin
            wire right 100
            to r1 pin 1

            at fixed_pin
            wire right 10

            at r1 pin 2
            wire right 100
            to r2 pin 1

            at r2 pin 2
            wire down 100
            to gnd
        `);

        const fixedNet = net('fixed_pin', 1);
        const outNet = net('out_pin', 1);
        const checkNet = net('r1', 2);
        const gndNet = netMap.getNetWithName('GND');

        const voltages = new Map<Net, NumericValue>([
            [gndNet, numeric(0)],
            [fixedNet, numeric(5)],
        ]);

        // A zero-diff voltage-source edge propagates fixedNet's known
        // voltage onto outNet before the drive-constraint validation runs.
        expect(() => calculateNodeVoltages(netMap, voltages, [
            { net1: fixedNet, net2: outNet, diff: 0 },
        ], [
            { driveNet: outNet, targetNet: checkNet, targetValue: 1 },
        ])).toThrow(new RuntimeExecutionError('drive() target/output net is already fixed to a known voltage'));
    });

    test('throws the already-known-net error even when every net in the circuit is already known (unknownIndices.length === 0 early return)', async () => {
        const { netMap, net } = await buildNetwork(`
            from "std" import *
            gnd = dgnd()
            r1 = res(10k)

            at r1 pin 1
            wire right 10

            at r1 pin 2
            wire down 100
            to gnd
        `);

        const outNet = net('r1', 1);
        const checkNet = net('r1', 2);
        const gndNet = netMap.getNetWithName('GND');

        const voltages = new Map<Net, NumericValue>([
            [gndNet, numeric(0)],
            [outNet, numeric(5)],
        ]);

        expect(() => calculateNodeVoltages(netMap, voltages, [], [
            { driveNet: outNet, targetNet: checkNet, targetValue: 1 },
        ])).toThrow(new RuntimeExecutionError('drive() target/output net is already fixed to a known voltage'));
    });

    test('does not false-positive a conflict across two electrically independent components reusing the same driveNet/targetNet pattern', async () => {
        const { netMap, net } = await buildNetwork(`
            from "std" import *
            gnd = dgnd()

            out_a = net("OUTA")
            out_b = net("OUTB")

            r1a = res(10k)
            r2a = res(10k)

            r1b = res(10k)
            r2b = res(10k)

            at out_a
            wire right 100
            to r1a pin 1

            at r1a pin 2
            wire right 100
            to r2a pin 1

            at r2a pin 2
            wire down 100
            to gnd

            at out_b
            wire right 100
            to r1b pin 1

            at r1b pin 2
            wire right 100
            to r2b pin 1

            at r2b pin 2
            wire down 100
            to gnd
        `);

        const outNetA = net('out_a', 1);
        const checkNetA = net('r1a', 2);
        const outNetB = net('out_b', 1);
        const checkNetB = net('r1b', 2);
        const gndNet = netMap.getNetWithName('GND');

        const voltages = new Map<Net, NumericValue>([[gndNet, numeric(0)]]);

        const { netVoltages } = calculateNodeVoltages(netMap, voltages, [], [
            { driveNet: outNetA, targetNet: checkNetA, targetValue: 1 },
            { driveNet: outNetB, targetNet: checkNetB, targetValue: 3 },
        ]);

        expectClose(netVoltages.get(outNetA)!, 2 * 1);
        expectClose(netVoltages.get(outNetB)!, 2 * 3);
    });
});
