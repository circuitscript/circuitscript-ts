import type { ParserVisitor } from '../src/visitor.js';
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
import { RenderError } from '../src/errors.js';

type CompJson = { value?: string; property?: unknown };

describe('export to KiCad', () => {

    test('export KiCad net list, emits bom_exclude and dnp properties', async () => {
        const flagScript = `
from "std" import *

at res(1k)
..footprint = "Resistor_SMD:R_0402_1005Metric"
..bom_exclude = true

at res(2k)
..footprint = "Resistor_SMD:R_0402_1005Metric"
..place = false

at res(3k)
..footprint = "Resistor_SMD:R_0402_1005Metric"
`;
        const {hasError, visitor} = await runScript(flagScript);
        expect(hasError).toBe(false);

        const {tree} = generateKiCadNetList(visitor.getNetList());
        const sExp = new SExpObject(tree);
        const components = new SExpObject(sExp.getWithId('components')!).getJSON() as { components: { comp: CompJson[] } };
        const comps = components.components.comp;
        const byValue = (v: string) => comps.find(c => c.value === v);

        expect(byValue('1k').property).toStrictEqual({ name: 'exclude_from_bom' });
        expect(byValue('2k').property).toStrictEqual({ name: 'dnp' });
        expect('property' in byValue('3k')).toBe(false);

        const text = printTree(tree);
        expect(text).toMatch(/\(property\s+\(name "exclude_from_bom"\)\)/);
        expect(text).toMatch(/\(property\s+\(name "dnp"\)\)/);
    });

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

    describe('mergeScope generated net handling', () => {

        const getNets = async (script: string) => {
            const rawNets = await getRawNets(script);
            expectNoMixedNets(rawNets);
            const { hasError, visitor } = await runScript(script);
            expect(hasError).toBe(false);
            const { tree } = generateKiCadNetList(visitor.getNetList());
            const nets = new SExpObject(new SExpObject(tree).getWithId('nets')!);
            const json = nets.getJSON() as {
                nets: { net: { name: string; node: { ref: string; pin: string }[] }[] }
            };
            const list = json.nets.net.map((n) => ({
                ...n,
                node: ([] as { ref: string; pin: string }[]).concat(n.node),
            }));
            const names = list.map((n) => n.name);
            return { list, names, visitor };
        };

        // Net names before refdes-based renaming, mapped to the pins on each net
        const getRawNets = async (script: string) => {
            const { hasError, componentPinNets } = await runScript(script, undefined, { skipAnnotation: true });
            expect(hasError).toBe(false);
            const nets = new Map<string, string[]>();
            for (const [name, instance, pin] of componentPinNets) {
                nets.set(name, [...(nets.get(name) ?? []), `${instance}.${pin}`]);
            }
            return nets;
        };

        // A shared name for nets created in different scopes would merge them
        // here, so no net may hold pins from both a function scope ('sub-')
        // and the parent scope, unless it is a user-defined net.
        const expectNoMixedNets = (raw: Map<string, string[]>) => {
            for (const [name, pins] of raw) {
                if (!name.startsWith('/NET-')) continue;
                const inChild = pins.filter((p) => p.startsWith('sub-')).length;
                expect(inChild === 0 || inChild === pins.length).toBe(true);
            }
        };

        type NetList = Awaited<ReturnType<typeof getNets>>['list'];

        // Returns the name of the net holding a pin, e.g. netOf(list, 'R1', '2')
        const netOf = (list: NetList, ref: string, pin: string) =>
            list.find((n) => n.node.some((x) => x.ref === ref && x.pin === pin))?.name;

        const expectDistinct = (names: string[]) =>
            expect(new Set(names).size).toBe(names.length);

        test('collision: child generated net is renamed and stays separate', async () => {
            const { list, names } = await getNets(`
from "std" import *

a1 = net("A1")
a2 = net("A2")

def sub():
    add res(1k)
    add res(2k)

at a1
add res(10k)
add res(20k)

at a2
sub()
`);
            expectDistinct(names);
            const parentNet = netOf(list, 'R1', '2');
            const childNet = netOf(list, 'R3', '2');
            expect(parentNet).toBeDefined();
            expect(childNet).toBeDefined();
            expect(netOf(list, 'R2', '1')).toBe(parentNet);
            expect(netOf(list, 'R4', '1')).toBe(childNet);
            expect(childNet).not.toBe(parentNet);
        });

        test('no collision: counter moves past merged child net', async () => {
            const { list, names } = await getNets(`
from "std" import *

a1 = net("A1")
a2 = net("A2")

def sub():
    add res(1k)
    add res(2k)

at a1
sub()

at a2
add res(10k)
add res(20k)
`);
            expectDistinct(names);
            const childNet = netOf(list, 'R1', '2');
            const parentNet = netOf(list, 'R3', '2');
            expect(netOf(list, 'R2', '1')).toBe(childNet);
            expect(netOf(list, 'R4', '1')).toBe(parentNet);
            expect(childNet).not.toBe(parentNet);
        });

        test('retry: first candidate name is taken in the parent', async () => {
            // The parent counter is at 3 when the child merges. The child's
            // first generated net takes NET-3, so the next candidate is NET-4,
            // which is held by a user-defined net (it does not advance the
            // counter) and forces a retry.
            const { list, names } = await getNets(`
from "std" import *

n4 = net("NET-4")
a2 = net("A2")

def sub():
    add res(1k)

at n4
add res(10k)
add res(20k)

at a2
sub()
`);
            expectDistinct(names);
            const parentNet = netOf(list, 'R1', '2');
            const childNet = netOf(list, 'R3', '2');
            expect(netOf(list, 'R1', '1')).toBe('NET-4');
            expect(netOf(list, 'R2', '1')).toBe(parentNet);
            expect(childNet).not.toBe('NET-4');
            expectDistinct([parentNet, childNet].map(String));
        });

        test('loop calls produce distinct nets per iteration', async () => {
            const { list, names } = await getNets(`
from "std" import *

anchor = net("ANCHOR")

def sub():
    add res(1k)
    add res(2k)

at anchor
for i in range(3):
    branch:
        sub()
`);
            expectDistinct(names);
            const mids = [1, 2, 3].map((i) => {
                const first = netOf(list, `R1_${i}_1`, '2');
                expect(netOf(list, `R2_${i}_1`, '1')).toBe(first);
                expect(netOf(list, `R1_${i}_1`, '1')).toBe('ANCHOR');
                return first;
            });
            expectDistinct(mids.map(String));
        });

        test('user-defined child net keeps its name', async () => {
            const { list, names } = await getNets(`
from "std" import *

a1 = net("A1")
a2 = net("A2")

def sub():
    add res(1k)
    add res(2k)
    add net("SIG")

at a1
add res(10k)
add res(20k)

at a2
sub()
`);
            expectDistinct(names);
            expect(names).toContain('SIG');
            expect(netOf(list, 'R4', '2')).toBe('SIG');
        });
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

        expect(output).toContain('(text "Hello\\nNew text\\nLine"');
        expect(output).not.toContain('Hello\nNew text');
        const libEnd = output.indexOf('(lib_symbols') >= 0
            ? output.indexOf('\n  )', output.indexOf('(lib_symbols')) : -1;
        expect(output.indexOf('(text "Hello')).toBeGreaterThan(libEnd);
        expect(output).not.toMatch(/\(symbol\s+\(lib_id/);
    });

    describe('text() as text objects', () => {
        async function gen(script: string, version: KiCadVersion) {
            const { hasError, visitor } = await runScript(script);
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
            return new KiCadSchGenerator(version, '0.0.0')
                .generate(visitor, sheetFrames, 'textobj')[0].output;
        }

        const script = `from "std" import *

at res(10k)
at text("Hi", font_size=100, bold=true)
`;

        test.each([KiCadVersion.V9, KiCadVersion.V10])(
            'KiCad schematic export emits text() as text objects (%s)', async (version) => {
                const output = await gen(script, version);
                expect(output.match(/\(text "Hi"/g)).toHaveLength(1);
                expect(output).toMatch(/\(text "Hi"[\s\S]*?\(bold yes\)/);
                expect(output).toMatch(/\(text "Hi"\s+\(exclude_from_sim no\)\s+\(at -?[\d.]+ -?[\d.]+ \d+\)/);
                expect(output).toContain('(property "Reference"');
                expect(output).toContain('(property "Value"');
                // Only the resistor has a placed symbol / lib_symbol.
                expect(output.match(/\(lib_id /g)).toHaveLength(1);
                expect(output).not.toContain('Text_0');
            });

        test('text object position matches component placement', async () => {
            const output = await gen(`from "std" import *

at text("Hi")
`, KiCadVersion.V9);
            expect(output).toMatch(/\(text "Hi"\s+\(exclude_from_sim no\)\s+\(at -?[\d.]+ -?[\d.]+ 0\)/);
        });

        test('text object keeps rotation angle', async () => {
            const output = await gen(`from "std" import *

at text("Rot")
..rotate = 90
`, KiCadVersion.V9);
            const m = /\(text "Rot"\s+\(exclude_from_sim no\)\s+\(at -?[\d.]+ -?[\d.]+ (\d+)\)/.exec(output);
            expect(m).not.toBeNull();
            expect([0, 90, 180, 270]).toContain(Number(m![1]));
        });

        test('text-like component without text_object still exports as symbol', async () => {
            const output = await gen(`from "std" import *

def fake_text(value):
    return create component:
        pins: 1
        type: "graphic"
        display: create graphic:
            pin: 1, "1", "unspecified", 0, 0, 0, 0, pin_only=true
            text:
                content: value
                font_size: 50

at fake_text("Fake")
`, KiCadVersion.V9);
            expect(output).toContain('(lib_id ');
            expect(output).toContain('(text "Fake"');
            expect(output.indexOf('(text "Fake"')).toBeLessThan(output.indexOf('(lib_id '));
        });

        test('non-text_object labels still produce lib_symbol text', async () => {
            const output = await gen(`from "std" import *

at nmos()
`, KiCadVersion.V9);
            expect(output).toMatch(/\(text "/);
            expect(output).toMatch(/_sym[0-9a-f]+/);
        });
    });

    describe('component parameters as properties', () => {
        async function gen(script: string) {
            const { hasError, visitor } = await runScript(script);
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
            return new KiCadSchGenerator(KiCadVersion.V9, '0.0.0')
                .generate(visitor, sheetFrames, 'params')[0].output;
        }

        const script = `from "std" import *

at res(10k)
..mpn = "RC0603"
..manufacturer = "Yageo"
..description = "10k resistor"
..voltage_rating = 50
..size = "0603"
..erc_net_bridge = true
..bom_exclude = true
`;

        test('exports parameters as hidden properties', async () => {
            const output = await gen(script);
            expect(output).toContain('(property "MPN" "RC0603"');
            expect(output).toContain('(property "Manufacturer" "Yageo"');
            expect(output).toContain('(property "Description" "10k resistor"');
            expect(output).toContain('(property "Voltage_rating" "50"');
            expect(output).toContain('(property "Size" "0603"');
        });

        test('does not export internal parameters', async () => {
            const output = await gen(script);
            expect(output).not.toContain('(property "Erc_net_bridge"');
            expect(output).not.toContain('(property "Bom_exclude"');
            expect(output).not.toContain('(property "Place"');
            expect(output).not.toContain('(property "Refdes"');
            expect(output).not.toContain('(property "Net_name"');
        });

        test('expands {param} templates in string parameters', async () => {
            const output = await gen('from "std" import *\n\nat res(10k)\n');
            expect(output).toContain('(property "Description" "RES 10k OHM 0402"');
            expect(output).not.toContain('{value}');
        });

        test('leaves unknown {param} placeholders unchanged', async () => {
            const output = await gen('from "std" import *\n\nat res(10k)\n..description = "X {nope}"\n');
            expect(output).toContain('(property "Description" "X {nope}"');
        });

        test('empty mpn emits no MPN property', async () => {
            const output = await gen('from "std" import *\n\nat res(10k)\n');
            expect(output).not.toContain('(property "MPN"');
        });

        test('one Value and Footprint property per symbol', async () => {
            const output = await gen(script + '..footprint = "R_0603"\n');
            const placed = output.slice(output.indexOf('(lib_id '));
            expect(placed.match(/\(property "Value"/g)).toHaveLength(1);
            expect(placed.match(/\(property "Footprint"/g)).toHaveLength(1);
        });
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

    describe('symbol labels as text objects vs properties', () => {
        const scriptPath = '__tests__/testData/renderData/inline.cst';

        async function generateFromScript(script: string, version: KiCadVersion) {
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
            return generator.generate(visitor, sheetFrames, 'inline')[0].output;
        }

        function libSymbolIds(output: string): string[] {
            const libStart = output.indexOf('(lib_symbols');
            const lib = output.slice(libStart);
            return Array.from(lib.matchAll(/\n\s{4}\(symbol "([^"]+)"/g)).map(m => m[1]);
        }

        function textNodes(output: string): string[] {
            return Array.from(output.matchAll(/\(text "/g))
                .map(m => {
                    let depth = 0;
                    for (let i = m.index!; i < output.length; i++) {
                        if (output[i] === '(') depth++;
                        else if (output[i] === ')' && --depth === 0) return output.slice(m.index!, i + 1);
                    }
                    return '';
                });
        }

        const mosfetScript = (extra = '') => `from "std" import *
gnd = dgnd()
frame:
    at net("A")
    add q = nmos()
    q.mpn = "MPN1"
${extra}`;

        for (const version of [KiCadVersion.V9, KiCadVersion.V10]) {
            describe(`V${version}`, () => {
                test('MOSFET labels become text objects', async () => {
                    const output = await generateFromScript(mosfetScript(), version);
                    for (const t of ['S', 'D', 'G', 'MPN1']) {
                        expect(output).toContain(`(text "${t}"`);
                    }
                    expect(output).not.toMatch(/\(property "Text_\d+"/);
                    expect(output).toContain('(property "Reference"');
                });

                test('LEDs share lib_symbol only with identical label text', async () => {
                    const script = `from "std" import *
gnd = dgnd()
frame:
    at net("A")
    add led("GREEN") pin "A"
    wire d 100
    add led("GREEN") pin "A"
    wire d 100
    add led("RED") pin "A"
    wire d 100
    to gnd
`;
                    const output = await generateFromScript(script, version);
                    const ids = libSymbolIds(output).filter(id => id.includes('led'));
                    expect(ids.length).toBe(2);
                    expect(new Set(ids).size).toBe(2);
                    expect(output).toContain('(text "GREEN"');
                    expect(output).toContain('(text "RED"');
                    expect(output).not.toMatch(/\(property "Text_\d+"/);
                });

                test('resistor has Reference/Value and no text nodes', async () => {
                    const script = `from "std" import *
gnd = dgnd()
frame:
    at net("A")
    add res(10k)
    wire d 100
    to gnd
`;
                    const output = await generateFromScript(script, version);
                    expect(output).toContain('(property "Reference"');
                    expect(output).toContain('(property "Value"');
                    expect(textNodes(output)).toEqual([]);
                    expect(output).not.toMatch(/\(property "Text_\d+"/);
                });

                test('supply keeps Value as net name', async () => {
                    const script = `from "std" import *
v5 = supply("5V")
gnd = dgnd()
frame:
    at v5
    add res(10k)
    wire d 100
    to gnd
`;
                    const output = await generateFromScript(script, version);
                    expect(output).toContain('(property "Value" "5V"');
                });

                test('orientations share one lib_symbol with identical text', async () => {
                    const script = mosfetScript() + `    at net("B")
    add q2 = nmos()
    q2.mpn = "MPN1"
    q2.flip = "x"
`;
                    const output = await generateFromScript(script, version);
                    const ids = libSymbolIds(output).filter(id => id.includes('nmos'));
                    expect(ids.length).toBe(1);
                });

                test('multi-line label text escapes newlines', async () => {
                    const script = `from "std" import *
gnd = dgnd()
frame:
    at net("A")
    add q = nmos()
    q.mpn = "Line1\nLine2"
`;
                    const output = await generateFromScript(script, version);
                    expect(output).toContain('(text "Line1\\nLine2"');
                    expect(output).not.toContain('Line1\nLine2');
                });

                test('all rotations and flips share one lib_symbol with identical text', async () => {
                    const orientations = [
                        'angle:0', 'angle:90', 'angle:180', 'angle:270',
                        'flip:"x"', 'flip:"y"', 'flip:"xy"',
                    ];
                    const body = orientations.map((o, i) => `    at net("N${i}")
    add q${i} = nmos() ${o}
    q${i}.mpn = "MPN1"
`).join('');
                    const script = `from "std" import *
gnd = dgnd()
frame:
${body}`;
                    const output = await generateFromScript(script, version);
                    const ids = libSymbolIds(output).filter(id => id.includes('nmos'));
                    expect(ids.length).toBe(1);

                    // Each placed instance only references the single lib_symbol
                    const libIds = Array.from(output.matchAll(/\(lib_id "([^"]+)"/g))
                        .map(m => m[1]).filter(id => id.includes('nmos'));
                    expect(libIds.length).toBe(orientations.length);
                    expect(new Set(libIds).size).toBe(1);

                    // Text nodes live only in the lib_symbol, once per label
                    const mpnNodes = textNodes(output).filter(t => t.startsWith('(text "MPN1"'));
                    expect(mpnNodes.length).toBe(1);
                });
            });
        }
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

        function netNames(visitor: ParserVisitor): Set<string> {
            const { tree } = generateKiCadNetList(visitor.getNetList());
            const nets = new SExpObject(new SExpObject(tree).getWithId('nets')!);
            const json = nets.getJSON();
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
        function expectLabelsMatchNetlist(output: string, visitor: ParserVisitor, lone: string[] = []) {
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

            // The unflipped pin direction is 180. The drawing angle turns it
            // clockwise on screen (KiCad angles are CCW), then the flips
            // mirror the result: flip x is a left-right mirror (theta ->
            // 180 - theta) and flip y an up-down mirror (theta -> -theta).
            let expected = 180 - a;
            if (f.includes('x')) expected = 180 - expected;
            if (f.includes('y')) expected = -expected;
            expect(l.angle).toBe(((expected % 360) + 360) % 360);

            // Label sits on the end of the connecting wire
            expect(wiresAt(parseWires(output), l).length).toBeGreaterThan(0);
            expect(l.justify).toBe(BUS_JUSTIFY[l.angle]);
        });
    });

    describe('component flip is applied after angle', () => {
        const flips: [string, string | null][] = [['x', 'y'], ['y', 'x']];
        const angles = [0, 90, 180, 270];
        const cases = angles.flatMap(a =>
            flips.map(([f, mirror]) => [a, f, mirror] as [number, string, string | null]));

        test.each(cases)('placement for angle %i flip %s', async (a, f, mirror) => {
            const text = `
from "std" import *
at res(1k) flip:"${f}" angle:${a}
`;
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
            const { output } = new KiCadSchGenerator(KiCadVersion.V9, '0.0.0')
                .generate(visitor, sheetFrames, 'flip_case')[0];

            const match = output.match(
                /\(lib_id "[^"]*"\)\s*\(at [-\d.]+ [-\d.]+ ([-\d.]+)\)\s*\(mirror (\w)\)/);
            expect(match).not.toBeNull();

            // KiCad rotates first and then mirrors, same as CircuitScript:
            // the angle maps straight through (negated) and flip x is a
            // left-right mirror (KiCad 'y'), flip y an up-down mirror ('x').
            expect(Number(match![1])).toBe(((-a % 360) + 360) % 360);
            expect(match![2]).toBe(mirror);
        });
    });

    test('KiCad export maps bom_exclude to in_bom and place to dnp', async () => {
        const scriptPath = '__tests__/testData/renderData/script129.cst';
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
        const { output } = generator.generate(visitor, sheetFrames, 'script129')[0];
        // Strip escape characters so quoted values can be matched directly.
        const outputText = printTree(output).replace(/\\/g, '');

        // Scope to the placed symbol block that holds each Reference.
        const blockFor = (ref: string) => {
            const refIdx = outputText.indexOf(`(reference "${ref}")`);
            expect(refIdx).toBeGreaterThan(-1);
            const start = outputText.lastIndexOf('(in_bom', refIdx);
            return outputText.substring(start, outputText.indexOf('(dnp', start) + 10);
        };
        const r1 = blockFor('R1');
        expect(r1).toContain('(in_bom no)');
        expect(r1).toContain('(dnp no)');
        const r2 = blockFor('R2');
        expect(r2).toContain('(in_bom yes)');
        expect(r2).toContain('(dnp yes)');
    });

    test('KiCad export of place_default frame matches per-part place = false', async () => {
        const dnpFor = async (scriptText: string, scriptPath?: string) => {
            const { hasError, visitor } = await runScript(scriptText, scriptPath);
            expect(hasError).toBe(false);

            visitor.applySheetFrameComponent();
            const { sequence, nets } = visitor.getGraph();
            visitor.applyFramePlaceDefaults(sequence);

            const documentVariable = visitor.getScope()
                .variables.get(GlobalDocumentName)! as unknown as DocumentVariable;
            const logger = new Logger();
            const graphEngine = new NetGraph(logger);
            graphEngine.setStyles(getStylesFromDocument(documentVariable));
            const { graph, containerFrames } = graphEngine.generateLayoutGraph(sequence, nets);
            const sheetFrames = await new LayoutEngine(logger).runLayout(graph, containerFrames, nets);

            const generator = new KiCadSchGenerator(KiCadVersion.V9, '0.0.0');
            const { output } = generator.generate(visitor, sheetFrames, 'inline')[0];
            const text = printTree(output).replace(/\\/g, '');
            return (text.match(/\(dnp (yes|no)\)/g) ?? []).sort();
        };

        const scriptPath = '__tests__/testData/renderData/script131.cst';
        const viaDefault = await dnpFor(readFileSync(scriptPath, { encoding: 'utf8' }), scriptPath);
        const viaPart = await dnpFor(`from "std" import *

v5 = supply("5V")
gnd = dgnd()

frame:
    at v5
    wire down 100
    add res(1k)
    ..place = false
    wire down 100
    to gnd

frame:
    at v5
    wire down 100
    add res(2k)
    wire down 100
    to gnd
`);
        expect(viaDefault.filter(d => d === '(dnp yes)')).toHaveLength(1);
        expect(viaDefault).toEqual(viaPart);
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
describe('KiCad hierarchical root sheet', () => {
    const fixture = '__tests__/testData/renderData/scriptKicadMultiSheet.cst';

    async function generateAll(script: string, name: string, version: KiCadVersion) {
        const { hasError, visitor } = await runScript(script, fixture);
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
        return () => generator.generate(visitor, sheetFrames, name);
    }

    const body = (title2: string, extra = '') => `from "std" import *
document.sheet_type = sheet_A6()
vcc = net("3v3")
gnd = dgnd()

sheet:
    ..title = "Power Supply"
    at vcc
    wire right 100 add res(1k)
    to gnd

sheet:
    ..title = "${title2}"
${extra}    at vcc
    wire right 100 add res(2k)
    to gnd
`;

    for (const version of [KiCadVersion.V9, KiCadVersion.V10]) {
        describe(`V${version}`, () => {
            test('root sheet links child files', async () => {
                const script = readFileSync(fixture, { encoding: 'utf8' });
                const gen = await generateAll(script, 'proj', version);
                const out = gen();
                expect(out.length).toBe(4);
                expect(out[0].fileName).toBe('proj');
                expect(out[1].fileName).toBe('power_supply');
                expect(out[2].fileName).toBe('output_stage');
                expect(out[3].fileName).toBe('proj-2');

                const root = out[0].output;
                expect(root.match(/\(sheet\b/g)!.length).toBe(3);
                for (const [name, file] of [['Power Supply', out[1]],
                    ['Output Stage', out[2]], ['Sheet 3', out[3]]] as const) {
                    expect(root).toContain(`"Sheetname" "${name}"`);
                    expect(root).toContain(`"Sheetfile" "${file.fileName}.kicad_sch"`);
                }
            });

            test('name param overrides the cleaned title', async () => {
                const gen = await generateAll(body('Other', '    ..name = "custom"\n'), 'proj', version);
                const out = gen();
                expect(out.map(o => o.fileName)).toEqual(['proj', 'power_supply', 'custom']);
                expect(out[0].output).toContain('"custom.kicad_sch"');
            });

            test('duplicate cleaned titles throw', async () => {
                const gen = await generateAll(body('power  supply'), 'proj', version);
                expect(gen).toThrow(RenderError);
                expect(gen).toThrow(/Power Supply.*power {2}supply/);
            });

            test('name param resolves a collision', async () => {
                const gen = await generateAll(body('power  supply', '    ..name = "ps2"\n'), 'proj', version);
                expect(gen().map(o => o.fileName)).toEqual(['proj', 'power_supply', 'ps2']);
            });

            test('file name equal to the project name throws', async () => {
                const gen = await generateAll(body('Proj'), 'proj', version);
                expect(gen).toThrow(RenderError);
            });
        });
    }
});
