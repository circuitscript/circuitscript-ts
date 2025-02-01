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
    [ '__.port', 'function' ],
    [ '__.port_validate.value', 'variable' ],
    [ '__.port_validate.portType', 'variable' ],
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
    [ '__.sheet_generator', 'function' ],
    [ '__.sheet_generator_validate.paper_size_name', 'variable' ],
    [ '__.sheet_generator_validate.paper_width', 'variable' ],
    [ '__.sheet_generator_validate.paper_height', 'variable' ],
    [ '__.sheet_generator_validate.margin_x', 'variable' ],
    [ '__.sheet_generator_validate.margin_y', 'variable' ],
    [ '__.sheet_generator_validate.col_display_value', 'variable' ],
    [ '__.sheet_generator_validate.row_display_value', 'variable' ],
    [ '__.sheet_generator_validate.inner_frame_margin', 'variable' ],
    [ '__.sheet_generator_validate.horizontal_1', 'variable' ],
    [ '__.sheet_generator_validate.horizontal_2', 'variable' ],
    [ '__.sheet_generator_validate.vertical_1', 'variable' ],
    [ '__.sheet_generator_validate.vertical_2', 'variable' ],
    [ '__.sheet_generator_validate.inner_width', 'variable' ],
    [ '__.sheet_generator_validate.inner_height', 'variable' ],
    [ '__.sheet_generator_validate.tmp_height', 'variable' ],
    [ '__.sheet_generator_validate.tmp_y', 'variable' ],
    [ '__.sheet_generator_validate.tmp_width', 'variable' ],
    [ '__.sheet_generator_validate.tmp_x', 'variable' ],
    [ '__.sheet_generator_validate.fontSize', 'variable' ],
    [ '__.sheet_generator_validate.num_columns', 'variable' ],
    [ '__.sheet_generator_validate.num_rows', 'variable' ],
    [ '__.sheet_generator_validate.ratio_x', 'variable' ],
    [ '__.sheet_generator_validate.ratio_y', 'variable' ],
    [ '__.sheet_generator_validate.title_block_width', 'variable' ],
    [ '__.sheet_generator_validate.title_block_height', 'variable' ],
    [ '__.sheet_generator_validate.title_block_x', 'variable' ],
    [ '__.sheet_generator_validate.title_block_y', 'variable' ],
    [ '__.sheet_generator_validate.title_block_x2', 'variable' ],
    [ '__.sheet_generator_validate.title_block_y2', 'variable' ],
    [ '__.sheet_A1', 'function' ],
    [ '__.sheet_A1_validate.paper_width', 'variable' ],
    [ '__.sheet_A1_validate.paper_height', 'variable' ],
    [ '__.sheet_A1_validate.margin', 'variable' ],
    [ '__.sheet_A2', 'function' ],
    [ '__.sheet_A2_validate.paper_width', 'variable' ],
    [ '__.sheet_A2_validate.paper_height', 'variable' ],
    [ '__.sheet_A2_validate.margin', 'variable' ],
    [ '__.sheet_A3', 'function' ],
    [ '__.sheet_A3_validate.paper_width', 'variable' ],
    [ '__.sheet_A3_validate.paper_height', 'variable' ],
    [ '__.sheet_A3_validate.margin', 'variable' ],
    [ '__.sheet_A4', 'function' ],
    [ '__.sheet_A4_validate.paper_width', 'variable' ],
    [ '__.sheet_A4_validate.paper_height', 'variable' ],
    [ '__.sheet_A4_validate.margin', 'variable' ],
    [ '__.sheet_A5', 'function' ],
    [ '__.sheet_A5_validate.paper_width', 'variable' ],
    [ '__.sheet_A5_validate.paper_height', 'variable' ],
    [ '__.sheet_A5_validate.margin', 'variable' ],
    [ '__.sheet_A6', 'function' ],
    [ '__.sheet_A6_validate.paper_width', 'variable' ],
    [ '__.sheet_A6_validate.paper_height', 'variable' ],
    [ '__.sheet_A6_validate.margin', 'variable' ],
    [ '__.document.sheet_type', 'variable' ],
    [ '__.v5v', 'variable' ],
    [ '__.gnd', 'variable' ],
    [ '__.D1', 'variable' ],
    [ '__.sheet_generator_validate.len', 'undefined' ],
    [ '__.sheet_A1_validate.toMils', 'undefined' ],
    [ '__.sheet_A1_validate.range', 'undefined' ],
    [ '__.sheet_A2_validate.toMils', 'undefined' ],
    [ '__.sheet_A2_validate.range', 'undefined' ],
    [ '__.sheet_A3_validate.toMils', 'undefined' ],
    [ '__.sheet_A3_validate.range', 'undefined' ],
    [ '__.sheet_A4_validate.toMils', 'undefined' ],
    [ '__.sheet_A4_validate.range', 'undefined' ],
    [ '__.sheet_A5_validate.toMils', 'undefined' ],
    [ '__.sheet_A5_validate.range', 'undefined' ],
    [ '__.sheet_A6_validate.toMils', 'undefined' ],
    [ '__.sheet_A6_validate.range', 'undefined' ],
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

        // Uncomment to print out value
        // const output = [];
        // result.forEach(value => {
        //     output.push(`[ '${value[0]}', '${value[1]}' ]`);
        // });
        
        // console.log(output.join(",\n"));
        
        expect(result).toStrictEqual(scriptTest.expected);
    });
});

