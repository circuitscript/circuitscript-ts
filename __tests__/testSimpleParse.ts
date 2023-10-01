import CircuitScriptParser from '../src/antlr/CircuitScriptParser';
import CircuitScriptLexer from '../src/antlr/CircuitScriptLexer';

import { CharStream, CommonTokenStream } from 'antlr4';
import { MainVisitor } from '../src/visitor';

describe('test parsing', () => {

    test.each([
        [0, "create component command"],
        [1, "function to create component and branching"]
    ])('parse script - %d: %s', async (index, description) => {
        // Test only parsing, does not check the correctness of the 
        // parsed result!

        // Access scripts like this to prevent having to 
        // define the script content before the test itself
        const script = allScripts[index];
        const result = await runScript(script);
        expect(result).toBe(true);
    });
});

async function runScript(script: string): Promise<boolean> {
    const chars = new CharStream(script);
    const lexer = new CircuitScriptLexer(chars);
    const tokens = new CommonTokenStream(lexer);

    const parser = new CircuitScriptParser(tokens);
    const tree = parser.script();

    const visitor = new MainVisitor(true);
    try {
        visitor.visit(tree);
        return true;
    } catch (err) {
        console.log('got error', err);
        return false;
    }
}

const script1 = `
U1 = create component:
    pins: 10

U2 = create component:
    pins: 10

at U1: 
    2:
        wire right 200 
        to U2 pin 1

at U2 pin 3
wire left 20
to U1 pin 10

at U2 pin 5
wire left 20
to U1 pin 10

at U1 pin 10
wire right 180 up 60
`;

const script2 = `
# Test functions
def power_input():
    return create component:
        pins: 3
        arrange:
            left: 1,3
            right: 2


J1 = power_input()

at J1 pin 1
wire left 20 down 20

branch:
    wire right 20
    to J1 pin 3

wire down 20
to gnd
`;

// Store in an array, so that it is accessible
// during the test itself.
const allScripts = [script1, script2];