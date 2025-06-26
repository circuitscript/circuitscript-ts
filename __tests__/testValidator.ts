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
    ['--.a', 'variable'],
    ['--.b', 'variable'],
    ['--.c', 'variable'],
    ['--.d', 'variable'],
    ['--.e', 'variable'],
    ['--.f', 'undefined']
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
    [ '--.net', 'function' ],
    [ '--.net_validate.net_name', 'variable' ],
    [ '--.supply', 'function' ],
    [ '--.supply_validate.net_name', 'variable' ],
    [ '--.supply_validate.net_obj', 'variable' ],
    [ '--.label', 'function' ],
    [ '--.label_validate.value', 'variable' ],
    [ '--.label_validate.anchor', 'variable' ],
    [ '--.port', 'function' ],
    [ '--.port_validate.value', 'variable' ],
    [ '--.port_validate.portType', 'variable' ],
    [ '--.res', 'function' ],
    [ '--.res_validate.value', 'variable' ],
    [ '--.res_validate.width', 'variable' ],
    [ '--.res_validate.height', 'variable' ],
    [ '--.cap', 'function' ],
    [ '--.cap_validate.value', 'variable' ],
    [ '--.cap_validate.width', 'variable' ],
    [ '--.cap_validate.height', 'variable' ],
    [ '--.ind', 'function' ],
    [ '--.ind_validate.value', 'variable' ],
    [ '--.ind_validate.width', 'variable' ],
    [ '--.ind_validate.height', 'variable' ],
    [ '--.diode', 'function' ],
    [ '--.diode_validate.width', 'variable' ],
    [ '--.diode_validate.height', 'variable' ],
    [ '--.led', 'function' ],
    [ '--.led_validate.color', 'variable' ],
    [ '--.led_validate.width', 'variable' ],
    [ '--.led_validate.height', 'variable' ],
    [ '--.cgnd', 'function' ],
    [ '--.cgnd_validate.net_name', 'variable' ],
    [ '--.dgnd', 'function' ],
    [ '--.dgnd_validate.net_name', 'variable' ],
    [ '--.dgnd_validate.height', 'variable' ],
    [ '--.dgnd_validate.width', 'variable' ],
    [ '--.text', 'function' ],
    [ '--.text_validate.value', 'variable' ],
    [ '--.text_validate.offsetX', 'variable' ],
    [ '--.text_validate.offsetY', 'variable' ],
    [ '--.text_validate.fontSize', 'variable' ],
    [ '--.marker_point', 'function' ],
    [ '--.arrow_point', 'function' ],
    [ '--.no_connect', 'function' ],
    [ '--.no_connect_validate.size', 'variable' ],
    [ '--.dnc', 'function' ],
    [ '--.dnc_validate.size', 'variable' ],
    [ '--.sheet_generator', 'function' ],
    [ '--.sheet_generator_validate.paper_size_name', 'variable' ],
    [ '--.sheet_generator_validate.paper_width', 'variable' ],
    [ '--.sheet_generator_validate.paper_height', 'variable' ],
    [ '--.sheet_generator_validate.margin_x', 'variable' ],
    [ '--.sheet_generator_validate.margin_y', 'variable' ],
    [ '--.sheet_generator_validate.col_display_value', 'variable' ],
    [ '--.sheet_generator_validate.row_display_value', 'variable' ],
    [ '--.sheet_generator_validate.inner_frame_margin', 'variable' ],
    [ '--.sheet_generator_validate.horizontal_1', 'variable' ],
    [ '--.sheet_generator_validate.horizontal_2', 'variable' ],
    [ '--.sheet_generator_validate.vertical_1', 'variable' ],
    [ '--.sheet_generator_validate.vertical_2', 'variable' ],
    [ '--.sheet_generator_validate.inner_width', 'variable' ],
    [ '--.sheet_generator_validate.inner_height', 'variable' ],
    [ '--.sheet_generator_validate.tmp_height', 'variable' ],
    [ '--.sheet_generator_validate.tmp_y', 'variable' ],
    [ '--.sheet_generator_validate.tmp_width', 'variable' ],
    [ '--.sheet_generator_validate.tmp_x', 'variable' ],
    [ '--.sheet_generator_validate.fontSize', 'variable' ],
    [ '--.sheet_generator_validate.num_columns', 'variable' ],
    [ '--.sheet_generator_validate.num_rows', 'variable' ],
    [ '--.sheet_generator_validate.ratio_x', 'variable' ],
    [ '--.sheet_generator_validate.ratio_y', 'variable' ],
    [ '--.sheet_generator_validate.title_block_width', 'variable' ],
    [ '--.sheet_generator_validate.title_block_height', 'variable' ],
    [ '--.sheet_generator_validate.title_block_x', 'variable' ],
    [ '--.sheet_generator_validate.title_block_y', 'variable' ],
    [ '--.sheet_generator_validate.title_block_x2', 'variable' ],
    [ '--.sheet_generator_validate.title_block_y2', 'variable' ],
    [ '--.sheet_A1', 'function' ],
    [ '--.sheet_A1_validate.paper_width', 'variable' ],
    [ '--.sheet_A1_validate.paper_height', 'variable' ],
    [ '--.sheet_A1_validate.margin', 'variable' ],
    [ '--.sheet_A2', 'function' ],
    [ '--.sheet_A2_validate.paper_width', 'variable' ],
    [ '--.sheet_A2_validate.paper_height', 'variable' ],
    [ '--.sheet_A2_validate.margin', 'variable' ],
    [ '--.sheet_A3', 'function' ],
    [ '--.sheet_A3_validate.paper_width', 'variable' ],
    [ '--.sheet_A3_validate.paper_height', 'variable' ],
    [ '--.sheet_A3_validate.margin', 'variable' ],
    [ '--.sheet_A4', 'function' ],
    [ '--.sheet_A4_validate.paper_width', 'variable' ],
    [ '--.sheet_A4_validate.paper_height', 'variable' ],
    [ '--.sheet_A4_validate.margin', 'variable' ],
    [ '--.sheet_A5', 'function' ],
    [ '--.sheet_A5_validate.paper_width', 'variable' ],
    [ '--.sheet_A5_validate.paper_height', 'variable' ],
    [ '--.sheet_A5_validate.margin', 'variable' ],
    [ '--.sheet_A6', 'function' ],
    [ '--.sheet_A6_validate.revision', 'variable' ],
    [ '--.sheet_A6_validate.paper_width', 'variable' ],
    [ '--.sheet_A6_validate.paper_height', 'variable' ],
    [ '--.sheet_A6_validate.margin', 'variable' ],
    [ '--.sheet_A6_validate.tmp_sheet', 'variable' ],
    [ '--.sheet_A6_validate.tmp_sheet.revision', 'variable' ],
    [ '--.document.sheet_type', 'variable' ],
    [ '--.v5v', 'variable' ],
    [ '--.gnd', 'variable' ],
    [ '--.D1', 'variable' ],
    [ '--.sheet_generator_validate.len', 'undefined' ],
    [ '--.sheet_A1_validate.toMils', 'undefined' ],
    [ '--.sheet_A1_validate.range', 'undefined' ],
    [ '--.sheet_A2_validate.toMils', 'undefined' ],
    [ '--.sheet_A2_validate.range', 'undefined' ],
    [ '--.sheet_A3_validate.toMils', 'undefined' ],
    [ '--.sheet_A3_validate.range', 'undefined' ],
    [ '--.sheet_A4_validate.toMils', 'undefined' ],
    [ '--.sheet_A4_validate.range', 'undefined' ],
    [ '--.sheet_A5_validate.toMils', 'undefined' ],
    [ '--.sheet_A5_validate.range', 'undefined' ],
    [ '--.sheet_A6_validate.toMils', 'undefined' ],
    [ '--.sheet_A6_validate.range', 'undefined' ],
    [ '--.tmp', 'undefined' ]
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

