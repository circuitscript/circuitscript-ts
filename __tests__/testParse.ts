/* eslint jest/expect-expect: ["warn", { "assertFunctionNames": ["expect", "expectInlineScriptTest"] }] */

import { NetGraph } from '../src/render/graph.js';
import { LayoutEngine } from '../src/render/layout.js';
import { Logger } from '../src/logger.js';
import { ComponentPinNet } from '../src/objects/types.js';
import { findItem, findItemByRefDes, runScript } from './helpers.js';
import {
    inlineScript17, inlineScript18, inlineScript19, 
    inlineScript20, inlineScript21, inlineScript22, inlineScript23, inlineScript24, inlineScript25, inlineScript26,
    inlineScript27, inlineScript28, inlineScript29, inlineScript30, inlineScript31, inlineScript32, 
    inlineScript33, inlineScript34, inlineScript35, inlineScript36, inlineScript37, inlineScript38, inlineScript39, 
    script21_,
    inlineScript40,
    inlineScript41,
    inlineScript42,
    inlineScript43,
    inlineScript44,
    inlineScript45,
    inlineScript46,
    inlineScript47,
    inlineScript48,
    inlineScript49,
    inlineScript50,
    inlineScript51,
    inlineScript52,
    inlineScript53,
    inlineScriptTests,
    inlineScript55,
    inlineScript56,
    inlineScript57,
    inlineScript58,
    inlineScript59,
    inlineScript60,
    inlineScript61,
    inlineScript62
} from './parseScripts.js';

async function expectInlineScriptTest(description, scriptTest): Promise<void> {
    const { hasError, visitor } = await runScript(scriptTest.script);
    expect(hasError).toEqual(false);
    expect(visitor.printStream).toStrictEqual(scriptTest.expected);
}

async function testInlineScriptTest(description, scriptTest){
    return test(description, async() => {
        await expectInlineScriptTest(description, scriptTest);
    });
}

describe('test parsing', () => {

    function orderNets(componentPinNets: ComponentPinNet): ComponentPinNet[] {
        const tmp = [...componentPinNets];
        tmp.sort((a, b) => {
            const valueA = `${a[0]} ${a[1]} ${a[2]}`;
            const valueB = `${b[0]} ${b[1]} ${b[2]}`;
            if (valueA < valueB) {
                return -1;
            } else if (valueA > valueB) {
                return 1;
            } else {
                return 0;
            }
        });

        return tmp;
    }


    test.each(inlineScriptTests)('parse script - %s', async (description, scriptTest) => {
        // Test only parsing, does not check the correctness of the 
        // parsed result!

        // Access scripts like this to prevent having to 
        // define the script content before the test itself
        const {hasError, componentPinNets} = await runScript(scriptTest.script);

        expect(hasError).toEqual(false);

        const orderedNets = orderNets(componentPinNets);
        const expectedOrderedNets = orderNets(scriptTest.expected);

        expect(orderedNets)
            .toStrictEqual(expectedOrderedNets);
    });

    test('component annotation', async () => {
        const { hasError, visitor } = await runScript(`
from "std" import *

variant = "MainVariantX"
gnd = dgnd()

at net("5V")
wire down 20
branch:
    wire down 20
    add res(10k) ..angle = 90
    ..place = (variant == "MainVariant")
    wire down 20 to gnd

wire right 40
branch:
    wire down 20
    add res(20k) ..angle = 90
    ..place = true
    wire down 20
    to gnd

wire right 40
branch:
    wire down 20
    add cap(100n)
    wire down 20
    to gnd
`);
        expect(hasError).toEqual(false);

        const instances = visitor.dumpInstances();

        expect(findItem(instances, 'res', 'R1', 'numeric:10k')).not.toBeNull();
        expect(findItem(instances, 'res', 'R2', 'numeric:20k')).not.toBeNull();
        expect(findItem(instances, 'cap', 'C1', 'numeric:100n')).not.toBeNull();
    });

    test('component annotation with custom type param', async () => {

        const script = `
from "std" import *

v5v = supply("5V")
gnd = dgnd()

a = create component:
        type: "X"
        pins: 2

a2 = create component:
        type: "X"
        pins: 3

at v5v
wire down 20 right 20
to a pin 1

at v5v
wire down 20 right 20
to a2 pin 3

`
        const {hasError, visitor} = await runScript(script);
        expect(hasError).toEqual(false);

        const instances = visitor.dumpInstances();

        expect(findItemByRefDes(instances, 'X', 'X1')).not.toBeNull();
        expect(findItemByRefDes(instances, 'X', 'X2')).not.toBeNull();
    });

    test('component annotation with defined refdes', async () => {

        const script = `
from "std" import *

v5v = supply("5V")
gnd = dgnd()

at v5v
wire down 10 
add res(10k)
..refdes = "R2"

wire down 10
add res(20k)

wire down 10
add res(30k)

wire down 10
add res(40k)
..refdes = "R100"
`
        const {hasError, visitor} = await runScript(script);
        expect(hasError).toEqual(false);

        const instances = visitor.dumpInstances();

        expect(findItem(instances, 'res', 'R2', 'numeric:10k')).not.toBeNull();
        expect(findItem(instances, 'res', 'R1', 'numeric:20k')).not.toBeNull();
        expect(findItem(instances, 'res', 'R3', 'numeric:30k')).not.toBeNull();
        expect(findItem(instances, 'res', 'R100', 
            'numeric:40k')).not.toBeNull();
    });

    test('indents in function definition', async() => {
        // Check that indents within parantheses/brackets are ignored.
        const script = `
def test1(a, 
  b,
    c):
    return a + b + c

print(test1(1,2,3))
`
        const { hasError, visitor } = await runScript(script);
        expect(hasError).toEqual(false);

        expect(visitor.printStream[0]).toBe('6');
    });

    test('double dot syntax', async () => {
        // Check that the double dot syntax works for 'place' parameter

        const script = `
from "std" import *
gnd = dgnd()

at net("5V")
wire down 20

add res(10k)
..place = false

wire down 20

add res(20k)
..place = true
wire down 20
to gnd
`
        const {hasError, visitor} = await runScript(script);
        expect(hasError).toEqual(false);

        const instances = visitor.dumpInstances();

        const item1 = findItem(instances, 'res', 'R1', 'numeric:10k');
        expect(item1.parameters.get('place')).toBe(false);

        const item2 = findItem(instances, 'res', 'R2', 'numeric:20k');
        expect(item2.parameters.get('place')).toBe(true);
    });

    test('instance assignment syntax', async () => {

        const script = `
from "std" import *
gnd = dgnd()

at supply("5V")
wire down 20
add R1 = res(10k)
wire down 20
to gnd

# update resistor value
R1.value = 20k
R1.place = false
R1.mpn = "res-12345"
`;

        const {hasError, visitor} = await runScript(script);
        expect(hasError).toEqual(false);

        const instances = visitor.dumpInstances();

        // console.log('instances', instances);

        const item1 = findItem(instances, 'res', 'R1', 'numeric:20k');
        expect(item1.parameters.get('place')).toBe(false);
        expect(item1.parameters.get('mpn')).toBe('res-12345');
    });

    test('unary minus operator', async () => {
        const script = `
b = 20
print(b)
print(-b)
print(--b)
print(---b)
`;

        const { hasError, visitor } = await runScript(script);
        expect(hasError).toEqual(false);

        expect(visitor.printStream).toStrictEqual(['20', '-20', '20', '-20']);
    });

    test.each([
        ["greater than case 1", inlineScript17],
        ["greater than case 2", inlineScript18],
        ["greater than case 3", inlineScript19],

        ["less than case 1", inlineScript20],
        ["less than case 2", inlineScript21],
        ["less than case 3", inlineScript22],

        ["greater than or equal case 1", inlineScript23],
        ["greater than or equal case 2", inlineScript24],
        ["greater than or equal case 3", inlineScript25],

        ["less than or equal case 1", inlineScript26],
        ["less than or equal case 2", inlineScript27],
        ["less than or equal case 3", inlineScript28],

        ["and case 1", inlineScript29],
        ["and case 2", inlineScript30],
        ["and case 3", inlineScript31],

        ["or case 1", inlineScript32],
        ["or case 2", inlineScript33],
        ["or case 3", inlineScript34],

        ["if, else if, else case 1", inlineScript35],
        ["if, else if, else case 2", inlineScript36],
        ["if, else if, else case 3", inlineScript37],
        ["if, else if, else case 4", inlineScript38],
        ["if, else if, else case 5", inlineScript39],

    ])('comparison, logical operators and if, else if, else - %s', async (description, scriptTest) => 
        await expectInlineScriptTest(description, scriptTest)
    );

    test.each([
        ['while loop with continue', inlineScript40],
        ['basic while loop', inlineScript42],
        ['nested while loop', inlineScript43],
        ['infinite loop with break', inlineScript44],
        ['while loop should not run', inlineScript45],

        ['while with continue (skip even numbers)', inlineScript46],
        ['while infinite loop with `continue` and break', inlineScript47],
        ['nested `while` with `continue`', inlineScript48],

        ['for loop with array', inlineScript41],
        ['for, skipping even numbers', inlineScript49],
        ['for, skipping all iterations', inlineScript50]

    ])('while, for loop - %s',  async (description, scriptTest) => 
        await expectInlineScriptTest(description, scriptTest)
    );

    test.each([
        ['range function', inlineScript51],
        ['enumerate function', inlineScript52],
        ['enumerate function with `for` loop', inlineScript53]

        // TODO add arrayPush, arrayGet, arraySet, etc.

    ])('built-in functions - %s',  async (description, scriptTest) => 
        await expectInlineScriptTest(description, scriptTest)
    );

    test('wire auto failure case', async () => {

        const { hasError, visitor } = await runScript(script21_);

        expect(hasError).toEqual(false);

        const { sequence, nets } = visitor.getGraph();

        const logger = new Logger();
        const graphEngine = new NetGraph(logger);
        const layoutEngine = new LayoutEngine(logger);

        let errorMessage = "";
        try {
            const {graph, containerFrames} = 
                graphEngine.generateLayoutGraph(sequence, nets);

            await layoutEngine.runLayout(graph, containerFrames, nets);
        } catch (err) {
            errorMessage = err;
        }

        expect(errorMessage).toEqual("Wire auto length failed. Please specify a fixed wire length.");
    });

    testInlineScriptTest('test builtin methods', inlineScript55);

    testInlineScriptTest('test component parameters', inlineScript56);

    testInlineScriptTest('test setting of net params', inlineScript57);

    testInlineScriptTest('test function return values and referenced values', inlineScript58);
});

describe('atom expr and trailers tests', () => {
    testInlineScriptTest('test nested array access (atom expr)', inlineScript59);

    testInlineScriptTest('test nested function calls', inlineScript60);

    testInlineScriptTest('test nested function calls mixed with array access', inlineScript61);

    testInlineScriptTest('test nested objects in variables', inlineScript62);
});

// This tests that an error is generated at the right position for 
// overlapping connections
`
from "std" import *
import { async } from '../src/sizing';
v5v = supply("5v")
gnd = dgnd()

c1 = cap(100n)

at v5v
wire down 20
branch:
    wire down 20
    add c1
    wire down 20
    to gnd

wire down 40    # error should be here
to c1 pin 1
`