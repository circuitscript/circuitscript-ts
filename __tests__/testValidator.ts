import { testValidateScript } from "./helpers";

class ValidateScriptTest {
    script: string;
    expected: [longName: string, type: string][];

    constructor(script: string, expected: [longName: string, type: string][]) {
        this.script = script;
        this.expected = expected;
    }
}

const script1 = new ValidateScriptTest(
`
a = 10
b = 20
c = 30
d = a
e = f
`, [
    ['__.a', 'variable'],
    ['__.b', 'variable'],
    ['__.c', 'variable'],
    ['__.d', 'variable'],
    ['__.e', 'variable'],
    ['__.f', 'undefined']
]
);

const script2 = new ValidateScriptTest(
`
import lib

v5v = supply("5v")
gnd = dgnd()

#tmp = 100

at gnd
wire up tmp right tmp
to D1 = led("GREEN") angle:180 pin 2
at D1 pin 1
wire right 20 up 20
to v5v

at v5v
wire down 20 right 20
add led("RED")
wire right 20 down 20
to gnd

#wire down 20 
#add led("GREEN")
#wire down 20
#to gnd
`, [
    [ '__.net', 'function' ],
    [ '__.net_validate.net_name', 'variable' ],
    [ '__.supply', 'function' ],
    [ '__.supply_validate.net_name', 'variable' ],
    [ '__.label', 'function' ],
    [ '__.label_validate.value', 'variable' ],
    [ '__.label_validate.anchor', 'variable' ],
    [ '__.res', 'function' ],
    [ '__.res_validate.value', 'variable' ],
    [ '__.res_validate.width', 'variable' ],
    [ '__.res_validate.height', 'variable' ],
    [ '__.cap', 'function' ],
    [ '__.cap_validate.value', 'variable' ],
    [ '__.cap_validate.width', 'variable' ],
    [ '__.cap_validate.height', 'variable' ],
    [ '__.ind', 'function' ],
    [ '__.ind_validate.value', 'variable' ],
    [ '__.ind_validate.width', 'variable' ],
    [ '__.ind_validate.height', 'variable' ],
    [ '__.diode', 'function' ],
    [ '__.diode_validate.width', 'variable' ],
    [ '__.diode_validate.height', 'variable' ],
    [ '__.led', 'function' ],
    [ '__.led_validate.color', 'variable' ],
    [ '__.led_validate.width', 'variable' ],
    [ '__.led_validate.height', 'variable' ],
    [ '__.cgnd', 'function' ],
    [ '__.cgnd_validate.net_name', 'variable' ],
    [ '__.dgnd', 'function' ],
    [ '__.dgnd_validate.net_name', 'variable' ],
    [ '__.dgnd_validate.height', 'variable' ],
    [ '__.dgnd_validate.width', 'variable' ],
    [ '__.text', 'function' ],
    [ '__.text_validate.value', 'variable' ],
    [ '__.text_validate.offsetX', 'variable' ],
    [ '__.text_validate.offsetY', 'variable' ],
    [ '__.text_validate.fontSize', 'variable' ],
    [ '__.marker_point', 'function' ],
    [ '__.arrow_point', 'function' ],
    [ '__.v5v', 'variable' ],
    [ '__.gnd', 'variable' ],
    [ '__.D1', 'variable' ],
    [ '__.tmp', 'undefined' ]
  ]
);

describe('test validation', () => {

    test.each([
        ["some variables", script1],
        ["variables and import", script2]

    ])('parse script - %s', async (description, scriptTest) => {
        // Test only parsing, does not check the correctness of the 
        // parsed result!

        const visitor = await testValidateScript(scriptTest.script);

        const symbols = visitor.symbolTable.getSymbols();

        const result: [string, string][] = [];

        for (const [key, value] of symbols) {
            result.push([key, value.type]);
        }
        
        expect(result).toStrictEqual(scriptTest.expected);
    });
});

