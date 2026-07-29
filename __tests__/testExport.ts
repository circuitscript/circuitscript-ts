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
                            "name": "/NET-(J1-2)",
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
                            "name": "/5V",
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
                            "name": "/GND",
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
                            "name": "/NET-(R1-2)",
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