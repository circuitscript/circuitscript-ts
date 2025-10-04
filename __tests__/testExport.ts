import { _id, generateKiCadNetList, SExpObject } from "../src/export";
import { runScript } from "./helpers";

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
});

const script = `
import std

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