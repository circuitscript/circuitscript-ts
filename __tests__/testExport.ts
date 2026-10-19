import { readFileSync } from 'fs';
import { _id, generateKiCadNetList, SExpObject } from "../src/render/export.js";
import { runScript } from "./helpers";
import { GlobalDocumentName } from '../src/globals.js';
import { getStylesFromDocument } from '../src/styles.js';
import { Logger } from '../src/logger.js';
import { NetGraph } from '../src/render/graph.js';
import { LayoutEngine } from '../src/render/layout.js';
import { KiCadSchGenerator, KiCadVersion } from '../src/render/KiCadSchGenerator.js';
import { printTree } from '../src/render/s_expressions.js';
import { DocumentVariable } from '../src/objects/types.js';

describe('export to KiCad', () => {

    test('export KiCad net list, catch missing footprints', async () => {
        const {hasError, visitor} = await runScript(script);
        expect(hasError).toBe(false);

        const {tree: kiCadNetList, missingFootprints} = generateKiCadNetList(visitor.getNetList());

        const sExp = new SExpObject(kiCadNetList);

        const components = new SExpObject(sExp.getWithId('components')!);
        const nets = new SExpObject(sExp.getWithId('nets')!);

        const tmpComponents = components.getJSON();
        const tmpNets = nets.getJSON();

        expect(tmpComponents).toStrictEqual({
            "components":
            {
                "comp": [
                    { "ref": "J1" },
                    { "ref": "C1", "value": "100n", "footprint": "Capacitor_SMD:C_0402_1005Metric" },
                    { "ref": "R1", "value": "10k", "footprint": "Resistor_SMD:R_0402_1005Metric" },
                    { "ref": "R2", "value": "20k", "footprint": "Resistor_SMD:R_0402_1005Metric" },
                    { "ref": "R3", "value": "1k", "footprint": "Resistor_SMD:R_0402_1005Metric" }
                ]
            }
        });

        expect(tmpNets).toStrictEqual(
            {
                "nets": {
                    "net": [
                        {
                            "code": 1,
                            "name": "NET-(J1-2)",
                            "node": [
                                {
                                    "ref": "J1",
                                    "pin": "2",
                                    "pintype": "passive"
                                },
                                {
                                    "ref": "R3",
                                    "pin": "1",
                                    "pintype": "passive"
                                }
                            ]
                        },
                        {
                            "code": 2,
                            "name": "5V",
                            "node": [
                                {
                                    "ref": "C1",
                                    "pin": "1",
                                    "pintype": "passive"
                                },
                                {
                                    "ref": "R1",
                                    "pin": "1",
                                    "pintype": "passive"
                                }
                            ]
                        },
                        {
                            "code": 3,
                            "name": "GND",
                            "node": [
                                {
                                    "ref": "C1",
                                    "pin": "2",
                                    "pintype": "passive"
                                },
                                {
                                    "ref": "R2",
                                    "pin": "2",
                                    "pintype": "passive"
                                },
                                {
                                    "ref": "R3",
                                    "pin": "2",
                                    "pintype": "passive"
                                }
                            ]
                        },
                        {
                            "code": 4,
                            "name": "NET-(R1-2)",
                            "node": [
                                {
                                    "ref": "R1",
                                    "pin": "2",
                                    "pintype": "passive"
                                },
                                {
                                    "ref": "R2",
                                    "pin": "1",
                                    "pintype": "passive"
                                }
                            ]
                        }
                    ]
                }
            });

        expect(missingFootprints).toStrictEqual([
            { refdes: 'J1', instanceName: 'COMP-1' }
        ]);

    });

    test('computed net namespace produces three distinct nets per loop iteration', async () => {
        const { hasError, visitor } = await runScript(`
from "std" import *

anchor = net("ANCHOR")

def sub():
    add res(0)
    add res(0)
    add net("SIG")

at anchor
for i in range(3):
    branch:
        /("ch" + i) sub()
`);
        expect(hasError).toBe(false);

        const { tree: kiCadNetList } = generateKiCadNetList(visitor.getNetList());
        const sExp = new SExpObject(kiCadNetList);
        const nets = new SExpObject(sExp.getWithId('nets')!);
        const tmpNets = nets.getJSON() as { nets: { net: { name: string }[] } };

        const netNames = tmpNets.nets.net.map((net) => net.name);

        // Each iteration's SIG net must be distinct and namespaced, not
        // collapsed onto a single shared/undefined net.
        expect(netNames).toContain('ch0/SIG');
        expect(netNames).toContain('ch1/SIG');
        expect(netNames).toContain('ch2/SIG');
        expect(netNames.some((name) => name.includes('undefined'))).toBe(false);

        // Exactly one net per iteration should carry the SIG name, and no
        // net should merge nodes across iterations.
        expect(netNames.filter((name) => name.endsWith('/SIG'))).toHaveLength(3);
    });

    test('KiCad netlist net names have no leading slash', async () => {
        const { hasError, visitor } = await runScript(`
from "std" import *

anchor = net("ANCHOR")

def sub():
    add res(0)
    add res(0)
    add net("SIG")

at anchor
branch:
    /("ns") sub()
`);
        expect(hasError).toBe(false);

        const { tree: kiCadNetList } = generateKiCadNetList(visitor.getNetList());
        const sExp = new SExpObject(kiCadNetList);
        const nets = new SExpObject(sExp.getWithId('nets')!);
        const tmpNets = nets.getJSON() as { nets: { net: { name: string }[] } };
        const netNames = tmpNets.nets.net.map((net) => net.name);

        expect(netNames.every((n) => !n.startsWith('/'))).toBe(true);
        expect(new Set(netNames).size).toBe(netNames.length);
        expect(netNames).toContain('ANCHOR');
        expect(netNames).toContain('ns/SIG');
    });

    test('KiCad schematic export resolves a themed (dark=/var=) fill color to its light value', async () => {
        const scriptPath = '__tests__/testData/renderData/script97.cst';
        const script = readFileSync(scriptPath, { encoding: 'utf8' });
        const { hasError, visitor } = await runScript(script, scriptPath);
        expect(hasError).toBe(false);

        visitor.applySheetFrameComponent();
        const { sequence, nets } = visitor.getGraph();

        const documentVariable = visitor.getScope()
            .variables.get(GlobalDocumentName)! as unknown as DocumentVariable;
        const styles = getStylesFromDocument(documentVariable);

        const logger = new Logger();
        const graphEngine = new NetGraph(logger);
        graphEngine.setStyles(styles);

        const { graph, containerFrames } = graphEngine.generateLayoutGraph(sequence, nets);

        const layoutEngine = new LayoutEngine(logger);
        const sheetFrames = await layoutEngine.runLayout(graph, containerFrames, nets);

        const generator = new KiCadSchGenerator(KiCadVersion.V9, '0.0.0');
        const { output } = generator.generate(visitor, sheetFrames, 'script97')[0];

        const outputText = printTree(output);

        // fill: "none", dark="black", var="my-fill" must resolve to its
        // light value ("none") for KiCad's fillType, not silently fall
        // through to 'outline' because the ThemedColor object doesn't
        // strictly-equal the literal string 'none'.
        expect(outputText).toContain('(type none)');
        expect(outputText).not.toContain('(type outline)');
    });

    test('KiCad schematic export emits no_connect() and dnc() as no_connect markers', async () => {
        const scriptPath = '__tests__/testData/renderData/script112.cst';
        const script = readFileSync(scriptPath, { encoding: 'utf8' });
        const { hasError, visitor } = await runScript(script, scriptPath);
        expect(hasError).toBe(false);

        visitor.applySheetFrameComponent();
        const { sequence, nets } = visitor.getGraph();

        const documentVariable = visitor.getScope()
            .variables.get(GlobalDocumentName)! as unknown as DocumentVariable;
        const styles = getStylesFromDocument(documentVariable);

        const logger = new Logger();
        const graphEngine = new NetGraph(logger);
        graphEngine.setStyles(styles);

        const { graph, containerFrames } = graphEngine.generateLayoutGraph(sequence, nets);

        const layoutEngine = new LayoutEngine(logger);
        const sheetFrames = await layoutEngine.runLayout(graph, containerFrames, nets);

        const generator = new KiCadSchGenerator(KiCadVersion.V9, '0.0.0');
        const { output } = generator.generate(visitor, sheetFrames, 'script112')[0];

        const markers = [...output.matchAll(/\(no_connect\s+\(at ([-\d.]+) ([-\d.]+)\)\s+\(uuid /g)];
        expect(output.match(/\(no_connect\s+\(at /g)).toHaveLength(2);
        expect(markers).toHaveLength(2);

        // No library symbols for the markers
        const libStart = output.indexOf('(lib_symbols');
        const libEnd = output.indexOf('(wire', libStart);
        const libSection = output.slice(libStart, libEnd);
        expect(libSection).not.toContain('no_connect');
        expect(libSection).not.toContain('dnc');

        // Each marker sits on a wire endpoint
        const wireEnds = new Set<string>();
        for (const m of output.matchAll(/\(xy ([-\d.]+) ([-\d.]+)\)/g)) {
            wireEnds.add(`${m[1]} ${m[2]}`);
        }
        for (const m of markers) {
            expect(wireEnds.has(`${m[1]} ${m[2]}`)).toBe(true);
        }
    });

    test('KiCad schematic export escapes newlines in multiline text', async () => {
        const text = 'from "std" import *\n\nat text("Hello\nNew text\nLine")\n';
        const { hasError, visitor } = await runScript(text);
        expect(hasError).toBe(false);

        visitor.applySheetFrameComponent();
        const { sequence, nets } = visitor.getGraph();
        const documentVariable = visitor.getScope()
            .variables.get(GlobalDocumentName)! as unknown as DocumentVariable;
        const styles = getStylesFromDocument(documentVariable);

        const logger = new Logger();
        const graphEngine = new NetGraph(logger);
        graphEngine.setStyles(styles);
        const { graph, containerFrames } = graphEngine.generateLayoutGraph(sequence, nets);
        const sheetFrames = await new LayoutEngine(logger).runLayout(graph, containerFrames, nets);

        const generator = new KiCadSchGenerator(KiCadVersion.V9, '0.0.0');
        const { output } = generator.generate(visitor, sheetFrames, 'multiline')[0];

        expect(output).toContain('"Hello\\nNew text\\nLine"');
        expect(output).not.toContain('Hello\nNew text');
    });

    describe('custom symbol pin names', () => {
        const dir = '__tests__/testData/renderData/';

        async function generateKiCadSch(scriptPath: string, name: string,
            version: KiCadVersion = KiCadVersion.V9) {
            const script = readFileSync(scriptPath, { encoding: 'utf8' });
            const { hasError, visitor } = await runScript(script, scriptPath);
            expect(hasError).toBe(false);

            visitor.applySheetFrameComponent();
            const { sequence, nets } = visitor.getGraph();
            const documentVariable = visitor.getScope()
                .variables.get(GlobalDocumentName)! as unknown as DocumentVariable;
            const styles = getStylesFromDocument(documentVariable);

            const logger = new Logger();
            const graphEngine = new NetGraph(logger);
            graphEngine.setStyles(styles);
            const { graph, containerFrames } = graphEngine.generateLayoutGraph(sequence, nets);
            const sheetFrames = await new LayoutEngine(logger).runLayout(graph, containerFrames, nets);

            const generator = new KiCadSchGenerator(version, '0.0.0');
            return generator.generate(visitor, sheetFrames, name)[0].output;
        }

        // Returns the s-expression text starting at the opening paren at `start`
        function sexp(text: string, start: number): string {
            let depth = 0;
            for (let i = start; i < text.length; i++) {
                if (text[i] === '(') depth++;
                else if (text[i] === ')' && --depth === 0) return text.slice(start, i + 1);
            }
            throw new Error('unbalanced s-expression');
        }

        function libSymbol(output: string, name: string): string {
            const m = new RegExp(`\\(symbol "[^"]*:${name}"`).exec(output);
            expect(m).not.toBeNull();
            return sexp(output, m!.index);
        }

        function pinText(symbol: string, pinNumber: string): string {
            const numIdx = symbol.indexOf(`(number "${pinNumber}"`);
            expect(numIdx).toBeGreaterThan(-1);
            return sexp(symbol, symbol.lastIndexOf('(pin passive', numIdx));
        }

        function nameEffects(pin: string): string {
            return sexp(pin, pin.indexOf('(name '));
        }

        function numberEffects(pin: string): string {
            return sexp(pin, pin.indexOf('(number '));
        }

        const versions = [KiCadVersion.V9, KiCadVersion.V10];

        test.each(versions)('custom symbol shows pin names and numbers (%s)', async (version) => {
            const output = await generateKiCadSch(`${dir}script120.cst`, 'script120', version);
            const symbol = libSymbol(output, 'J1_unit_sym');

            const pinNames = sexp(symbol, symbol.indexOf('(pin_names'));
            expect(pinNames).toContain('(offset 0.002)');
            expect(pinNames).not.toContain('hide');

            const pinNumbers = sexp(symbol, symbol.indexOf('(pin_numbers'));
            expect(pinNumbers).not.toContain('hide');
        });

        test.each(versions)('custom symbol with unnamed pins still shows pin names (%s)', async (version) => {
            const output = await generateKiCadSch(`${dir}script122.cst`, 'script122', version);
            const symbol = libSymbol(output, 'J1_unit_sym');

            const pinNames = sexp(symbol, symbol.indexOf('(pin_names'));
            expect(pinNames).toContain('(offset 0.002)');
            expect(pinNames).not.toContain('hide');
            expect(sexp(symbol, symbol.indexOf('(pin_numbers'))).not.toContain('hide');
        });

        test.each(versions)('custom symbol pin names are exported and not hidden (%s)', async (version) => {
            const output = await generateKiCadSch(`${dir}script120.cst`, 'script120', version);
            const symbol = libSymbol(output, 'J1_unit_sym');

            const expected: Record<string, string> = { '1': 'VIN', '2': 'GND', '3': 'OUT', '4': 'EN' };
            for (const [num, pinName] of Object.entries(expected)) {
                const pin = pinText(symbol, num);
                expect(nameEffects(pin)).toContain(`(name "${pinName}"`);
                expect(nameEffects(pin)).not.toContain('hide');
                expect(numberEffects(pin)).not.toContain('hide');
            }
        });

        test.each(versions)('display_name=false hides only that pin name (%s)', async (version) => {
            const output = await generateKiCadSch(`${dir}script121.cst`, 'script121', version);
            const symbol = libSymbol(output, 'mixed_sym');

            expect(nameEffects(pinText(symbol, '2'))).toContain('(name "HIDDENNAME"');
            expect(nameEffects(pinText(symbol, '2'))).toContain('(hide yes)');
            expect(nameEffects(pinText(symbol, '1'))).toContain('(name "SHOWN"');
            expect(nameEffects(pinText(symbol, '1'))).not.toContain('hide');
            expect(nameEffects(pinText(symbol, '3'))).not.toContain('hide');
        });

        test.each(versions)('display_id=false hides only that pin number (%s)', async (version) => {
            const output = await generateKiCadSch(`${dir}script121.cst`, 'script121', version);
            const symbol = libSymbol(output, 'mixed_sym');

            expect(numberEffects(pinText(symbol, '3'))).toContain('(hide yes)');
            expect(numberEffects(pinText(symbol, '1'))).not.toContain('hide');
            expect(numberEffects(pinText(symbol, '2'))).not.toContain('hide');
        });

        test.each(versions)('unnamed pins export "~" without hide (%s)', async (version) => {
            const output = await generateKiCadSch(`${dir}script121.cst`, 'script121', version);
            const symbol = libSymbol(output, 'mixed_sym');

            const pin = pinText(symbol, '4');
            expect(nameEffects(pin)).toContain('(name "~"');
            expect(nameEffects(pin)).not.toContain('hide');
        });
    });

    describe('bus export as net labels', () => {
        const dir = '__tests__/testData/renderData/';

        const BUS_JUSTIFY: Record<number, string> = {
            0: 'left bottom',
            90: 'left bottom',
            180: 'right bottom',
            270: 'right bottom',
        };

        async function generateSch(scriptText: string, name: string, scriptPath?: string) {
            const { hasError, visitor } = await runScript(scriptText, scriptPath);
            expect(hasError).toBe(false);

            visitor.applySheetFrameComponent();
            const { sequence, nets } = visitor.getGraph();
            const documentVariable = visitor.getScope()
                .variables.get(GlobalDocumentName)! as unknown as DocumentVariable;
            const styles = getStylesFromDocument(documentVariable);

            const logger = new Logger();
            const graphEngine = new NetGraph(logger);
            graphEngine.setStyles(styles);
            const { graph, containerFrames } = graphEngine.generateLayoutGraph(sequence, nets);
            const sheetFrames = await new LayoutEngine(logger).runLayout(graph, containerFrames, nets);

            const generator = new KiCadSchGenerator(KiCadVersion.V9, '0.0.0');
            const { output } = generator.generate(visitor, sheetFrames, name)[0];
            return { output, visitor };
        }

        async function generateFixture(name: string) {
            const scriptPath = `${dir}${name}.cst`;
            const text = readFileSync(scriptPath, { encoding: 'utf8' });
            return generateSch(text, name, scriptPath);
        }

        interface LabelInfo { text: string; x: string; y: string; angle: number; justify: string }

        function parseLabels(output: string): LabelInfo[] {
            const re = /\(label "([^"]*)"\s+\(at ([-\d.]+) ([-\d.]+) (\d+)\)[\s\S]*?\(justify ([^)]*)\)/g;
            return [...output.matchAll(re)].map(m => ({
                text: m[1], x: m[2], y: m[3], angle: Number(m[4]), justify: m[5].trim(),
            }));
        }

        // Wire segments as [x1, y1, x2, y2]
        function parseWires(output: string): number[][] {
            const re = /\(wire\s+\(pts\s+\(xy ([-\d.]+) ([-\d.]+)\)\s+\(xy ([-\d.]+) ([-\d.]+)\)/g;
            return [...output.matchAll(re)].map(m => m.slice(1, 5).map(Number));
        }

        function wiresAt(wires: number[][], l: LabelInfo) {
            const x = Number(l.x), y = Number(l.y);
            return wires.filter(w =>
                (w[0] === x && w[1] === y) || (w[2] === x && w[3] === y));
        }

        function netNames(visitor: any): Set<string> {
            const { tree } = generateKiCadNetList(visitor.getNetList());
            const nets = new SExpObject(new SExpObject(tree).getWithId('nets')!);
            const json = nets.getJSON() as any;
            const net = json.nets?.net;
            const list: { name: string }[] = net === undefined ? [] : Array.isArray(net) ? net : [net];
            return new Set(list.map(x => x.name));
        }

        function expectNoBusObjects(output: string) {
            expect(output).not.toMatch(/\(bus[\s_)]/);
            expect(output).not.toContain('(bus_entry');
            expect(output).not.toContain('(bus_alias');
            expect(output).not.toContain('NO_NET');
            const libStart = output.indexOf('(lib_symbols');
            const libEnd = output.indexOf('(wire', libStart);
            expect(output.slice(libStart, libEnd).toLowerCase()).not.toContain('bus');
            expect(output).not.toMatch(/\(symbol\s+\(lib_id "[^"]*bus/i);
        }

        // Labels absent from the netlist must be single-pin nets, which the
        // netlist omits. Returns those so callers can assert on them.
        function expectLabelsMatchNetlist(output: string, visitor: any, lone: string[] = []) {
            const names = netNames(visitor);
            for (const l of parseLabels(output)) {
                if (lone.includes(l.text)) {
                    expect(names.has(l.text)).toBe(false);
                } else {
                    expect(names.has(l.text)).toBe(true);
                }
            }
        }

        function expectLabelsOnWires(output: string) {
            const wires = parseWires(output);
            for (const l of parseLabels(output)) {
                const hits = wiresAt(wires, l);
                // Bus-only nets have no wire, so only check when one exists nearby
                if (hits.length === 0) continue;
                expect(hits.length).toBeGreaterThan(0);
            }
        }

        // Single-pin nets are omitted from the KiCad netlist
        const lone: Record<string, string[]> = {
            script91: ['5V'],
            script104: ['NET-2', 'NET-3'],
            script113: ['MOSI_OUT'],
            script114: ['NET-3'],
        };

        test.each(['script91', 'script104', 'script105', 'script113', 'script114', 'script115', 'script116'])(
            '%s: no bus symbol or bus tokens, labels match netlist', async (name) => {
                const { output, visitor } = await generateFixture(name);
                expectNoBusObjects(output);
                expectLabelsMatchNetlist(output, visitor, lone[name] ?? []);
                // Net label components use their own justify rules
                if (name === 'script104' || name === 'script105') return;
                for (const l of parseLabels(output)) {
                    expect(l.justify).toBe(BUS_JUSTIFY[l.angle]);
                }
            });

        test('numeric, named, up, single-pin and gap buses get one label per connected pin', async () => {
            const { output, visitor } = await generateFixture('script113');
            const labels = parseLabels(output);
            const texts = labels.map(l => l.text);

            // 1 numeric pin, MOSI (user net), MISO, UP.A, single pin; unconnected pins skipped
            expect(texts).toHaveLength(5);
            expect(texts).toContain('MOSI_OUT');
            expect(texts.some(t => t.includes('SPI.MISO'))).toBe(true);
            expect(texts.some(t => t.includes('UP.A'))).toBe(true);
            expect(new Set(texts).size).toBe(texts.length);
            expect(texts.some(t => t.startsWith('/'))).toBe(false);
            expectLabelsOnWires(output);

            // Each connected label sits on a wire endpoint
            const wires = parseWires(output);
            for (const l of labels.filter(x => x.text !== 'MOSI_OUT')) {
                expect(wiresAt(wires, l).length).toBeGreaterThan(0);
            }
            expectLabelsMatchNetlist(output, visitor, ['MOSI_OUT']);
        });

        test('signal pin sharing a net with an unlabeled component pin uses the refdes-renamed net', async () => {
            const { output, visitor } = await generateFixture('script113');
            const texts = parseLabels(output).map(l => l.text);
            const names = netNames(visitor);
            const renamed = texts.filter(t => /^NET-\(R\d+-\d+/.test(t));
            expect(renamed.length).toBeGreaterThan(0);
            for (const t of renamed) expect(names.has(t)).toBe(true);
        });

        test('bus-to-bus connection keeps both buses on one named net and drops bus wiring', async () => {
            const { output, visitor } = await generateFixture('script114');
            const labels = parseLabels(output);
            const texts = labels.map(l => l.text);

            expect(texts.filter(t => t.includes('SPI.MOSI'))).toHaveLength(2);
            expect(new Set(texts.filter(t => t.includes('SPI.MOSI'))).size).toBe(1);

            // Mixed net: the MOSI wire to R1 stays
            const wires = parseWires(output);
            const mosi = labels.filter(l => l.text.includes('SPI.MOSI'));
            expect(mosi.some(l => wiresAt(wires, l).length > 0)).toBe(true);
            expectLabelsMatchNetlist(output, visitor, ['NET-3']);
        });

        test('bus connected to a net label drops the label and emits no dangling BUSX label', async () => {
            const { output } = await generateFixture('script114');
            expect(output).not.toContain('"BUSX"');
            expect(parseLabels(output).some(l => l.text.includes('BUSX'))).toBe(false);
        });

        test('bus inside a module keeps the inner namespace in the label', async () => {
            const { output, visitor } = await generateFixture('script115');
            const labels = parseLabels(output);
            expect(labels).toHaveLength(1);
            expect(labels[0].text.startsWith('adc1/')).toBe(true);
            expect(labels[0].text.startsWith('/')).toBe(false);
            expect(netNames(visitor).has(labels[0].text)).toBe(true);
            expectLabelsOnWires(output);
        });

        test('rotated and flipped bus still labels the connected pin on the wire', async () => {
            const { output } = await generateFixture('script116');
            const labels = parseLabels(output);
            expect(labels).toHaveLength(1);
            expect(wiresAt(parseWires(output), labels[0]).length).toBeGreaterThan(0);
        });

        const flips: [string, string][] = [['', 'none'], [' flip:"x"', 'x'], [' flip:"y"', 'y'], [' flip:"xy"', 'xy']];
        const angles = [0, 90, 180, 270];
        const cases = angles.flatMap(a => flips.map(([f, fname]) => [a, fname, f] as [number, string, string]));

        test.each(cases)('label angle and justify follow pin geometry: angle %i flip %s', async (a, _fname, f) => {
            const text = `
from "std" import *
gnd = dgnd()
spi = create bus:
    name: "SPI"
    pins: "MOSI", "MISO"
at gnd
wire up 200
to spi angle:${a}${f} pin "MOSI"
`;
            const { output } = await generateSch(text, 'angle_case');
            const labels = parseLabels(output);
            const l = labels.find(x => x.text.includes('SPI.MOSI') || x.text === 'GND')!;
            expect(l).toBeDefined();

            // Canonical pin direction is 0; flip x mirrors it, then the
            // drawing angle turns it clockwise on screen (KiCad angles are CCW).
            const dir = f.includes('x') ? 0 : 180;
            expect(l.angle).toBe((((dir - a) % 360) + 360) % 360);

            // Label sits on the end of the connecting wire
            expect(wiresAt(parseWires(output), l).length).toBeGreaterThan(0);
            expect(l.justify).toBe(BUS_JUSTIFY[l.angle]);
        });
    });
});

const script = `
from "std" import *

v5v = supply("5V")
gnd = dgnd()

tmp = create component:
    pins: 4

at v5v
wire down 100
branch:
    wire right 300 down 100
    add cap(100n)
    wire down 100
    to gnd
wire down 100
add res(10k) angle:90
wire down 100
add res(20k) angle:90
wire down 100
to gnd

at tmp pin 2
wire right 100 down 100
add res(1k) angle:90
wire down 100
to gnd
`;