import { _id, generateKiCADNetList, SExpObject } from "../src/export";
import { prepareSVGEnvironment } from "../src/sizing";
import { runScript } from "./helpers";

describe('export to kicad', () => {

    test('export kicad net list, catch missing footprints', async () => {
        
        await prepareSVGEnvironment(null);

        const {hasError, visitor} = await runScript(script);
        expect(hasError).toBe(false);

        visitor.annotateComponents();

        const {tree: kicadNetList, missingFootprints} = generateKiCADNetList(visitor.getNetList());

        const sExp = new SExpObject(kicadNetList);

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
                "nets":
                {
                    "net":
                        [
                            { "code": 1, "name": "/NET-2", "node": [{ "ref": "J1", "pin": "2", "pintype": "passive" }, { "ref": "R3", "pin": "1", "pintype": "passive" }] },
                            { "code": 2, "name": "/5V", "node": [{ "ref": "C1", "pin": "1", "pintype": "passive" }, { "ref": "R1", "pin": "1", "pintype": "passive" }] },
                            { "code": 3, "name": "/GND", "node": [{ "ref": "C1", "pin": "2", "pintype": "passive" }, { "ref": "R2", "pin": "2", "pintype": "passive" }, { "ref": "R3", "pin": "2", "pintype": "passive" }] },
                            { "code": 4, "name": "/NET-1", "node": [{ "ref": "R1", "pin": "2", "pintype": "passive" }, { "ref": "R2", "pin": "1", "pintype": "passive" }] }]
                }
            });

        expect(missingFootprints).toStrictEqual([
            { refdes: 'J1', instanceName: 'COMP-1' }
        ]);

    });
});

const script = `
import lib

v5v = supply("5V")
gnd = dgnd()

tmp = create component:
    pins: 4

at v5v
wire down 20
branch:
    wire right 60 down 20
    add cap(100n)
    wire down 20
    to gnd
wire down 20
add res(10k) angle:90
wire down 20
add res(20k) angle:90
wire down 20
to gnd

at tmp pin 2
wire right 20 down 20
add res(1k) angle:90
wire down 20 
to gnd
`;