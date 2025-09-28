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
import std

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
    [ '--.net_sym.net_name', 'variable' ],
    [ '--.net_sym.net_type', 'variable' ],
    [ '--.supply', 'function' ],
    [ '--.supply_sym.net_name', 'variable' ],
    [ '--.supply_sym.net_obj', 'variable' ],
    [ '--.label', 'function' ],
    [ '--.label_sym.value', 'variable' ],
    [ '--.label_sym.anchor', 'variable' ],
    [ '--.port', 'function' ],
    [ '--.port_sym.value', 'variable' ],
    [ '--.port_sym.portType', 'variable' ],
    [ '--.res', 'function' ],
    [ '--.res_sym.value', 'variable' ],
    [ '--.res_sym.width', 'variable' ],
    [ '--.res_sym.height', 'variable' ],
    [ '--.cap', 'function' ],
    [ '--.cap_sym.value', 'variable' ],
    [ '--.cap_sym.width', 'variable' ],
    [ '--.cap_sym.height', 'variable' ],
    [ '--.ind', 'function' ],
    [ '--.ind_sym.value', 'variable' ],
    [ '--.ind_sym.width', 'variable' ],
    [ '--.ind_sym.height', 'variable' ],
    [ '--.diode', 'function' ],
    [ '--.diode_sym.width', 'variable' ],
    [ '--.diode_sym.height', 'variable' ],
    [ '--.led', 'function' ],
    [ '--.led_sym.color', 'variable' ],
    [ '--.led_sym.width', 'variable' ],
    [ '--.led_sym.height', 'variable' ],
    [ '--.cgnd', 'function' ],
    [ '--.cgnd_sym.net_name', 'variable' ],
    [ '--.dgnd', 'function' ],
    [ '--.dgnd_sym.net_name', 'variable' ],
    [ '--.dgnd_sym.height', 'variable' ],
    [ '--.dgnd_sym.width', 'variable' ],
    [ '--.text', 'function' ],
    [ '--.text_sym.value', 'variable' ],
    [ '--.text_sym.offsetX', 'variable' ],
    [ '--.text_sym.offsetY', 'variable' ],
    [ '--.text_sym.fontSize', 'variable' ],
    [ '--.marker_point', 'function' ],
    [ '--.arrow_point', 'function' ],
    [ '--.no_connect', 'function' ],
    [ '--.no_connect_sym.size', 'variable' ],
    [ '--.dnc', 'function' ],
    [ '--.dnc_sym.size', 'variable' ],
    [ '--.sheet_generator', 'function' ],
    [ '--.sheet_generator_sym.paper_size_name', 'variable' ],
    [ '--.sheet_generator_sym.paper_width', 'variable' ],
    [ '--.sheet_generator_sym.paper_height', 'variable' ],
    [ '--.sheet_generator_sym.margin_x', 'variable' ],
    [ '--.sheet_generator_sym.margin_y', 'variable' ],
    [ '--.sheet_generator_sym.col_display_value', 'variable' ],
    [ '--.sheet_generator_sym.row_display_value', 'variable' ],
    [ '--.sheet_generator_sym.inner_frame_margin', 'variable' ],
    [ '--.sheet_generator_sym.horizontal_1', 'variable' ],
    [ '--.sheet_generator_sym.horizontal_2', 'variable' ],
    [ '--.sheet_generator_sym.vertical_1', 'variable' ],
    [ '--.sheet_generator_sym.vertical_2', 'variable' ],
    [ '--.sheet_generator_sym.inner_width', 'variable' ],
    [ '--.sheet_generator_sym.inner_height', 'variable' ],
    [ '--.sheet_generator_sym.tmp_height', 'variable' ],
    [ '--.sheet_generator_sym.tmp_y', 'variable' ],
    [ '--.sheet_generator_sym.tmp_width', 'variable' ],
    [ '--.sheet_generator_sym.tmp_x', 'variable' ],
    [ '--.sheet_generator_sym.fontSize', 'variable' ],
    [ '--.len', 'function' ],
    [ '--.sheet_generator_sym.num_columns', 'variable' ],
    [ '--.sheet_generator_sym.num_rows', 'variable' ],
    [ '--.sheet_generator_sym.ratio_x', 'variable' ],
    [ '--.sheet_generator_sym.ratio_y', 'variable' ],
    [ '--.sheet_generator_sym.title_block_width', 'variable' ],
    [ '--.sheet_generator_sym.title_block_height', 'variable' ],
    [ '--.sheet_generator_sym.title_block_x', 'variable' ],
    [ '--.sheet_generator_sym.title_block_y', 'variable' ],
    [ '--.sheet_generator_sym.title_block_x2', 'variable' ],
    [ '--.sheet_generator_sym.title_block_y2', 'variable' ],
    [ '--.sheet_A1', 'function' ],
    [ '--.toMils', 'function' ],
    [ '--.sheet_A1_sym.paper_width', 'variable' ],
    [ '--.sheet_A1_sym.paper_height', 'variable' ],
    [ '--.sheet_A1_sym.margin', 'variable' ],
    [ '--.range', 'function' ],
    [ '--.sheet_A2', 'function' ],
    [ '--.sheet_A2_sym.paper_width', 'variable' ],
    [ '--.sheet_A2_sym.paper_height', 'variable' ],
    [ '--.sheet_A2_sym.margin', 'variable' ],
    [ '--.sheet_A3', 'function' ],
    [ '--.sheet_A3_sym.paper_width', 'variable' ],
    [ '--.sheet_A3_sym.paper_height', 'variable' ],
    [ '--.sheet_A3_sym.margin', 'variable' ],
    [ '--.sheet_A4', 'function' ],
    [ '--.sheet_A4_sym.paper_width', 'variable' ],
    [ '--.sheet_A4_sym.paper_height', 'variable' ],
    [ '--.sheet_A4_sym.margin', 'variable' ],
    [ '--.sheet_A5', 'function' ],
    [ '--.sheet_A5_sym.paper_width', 'variable' ],
    [ '--.sheet_A5_sym.paper_height', 'variable' ],
    [ '--.sheet_A5_sym.margin', 'variable' ],
    [ '--.sheet_A6', 'function' ],
    [ '--.sheet_A6_sym.revision', 'variable' ],
    [ '--.sheet_A6_sym.paper_width', 'variable' ],
    [ '--.sheet_A6_sym.paper_height', 'variable' ],
    [ '--.sheet_A6_sym.margin', 'variable' ],
    [ '--.sheet_A6_sym.tmp_sheet', 'variable' ],
    [ '--.document', 'variable' ],
    [ '--.v5v', 'variable' ],
    [ '--.gnd', 'variable' ],
    [ '--.D1', 'variable' ],
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

