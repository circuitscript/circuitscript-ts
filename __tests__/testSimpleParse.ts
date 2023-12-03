
import { ComponentPinNet } from '../src/objects/types';
import { findItem, runScript } from './helpers';

describe('test parsing', () => {

    test.each([
        [0, "create component command"],
        [1, "function to create component and branching"],
        [2, "nested branching, add with pin selected"],
        [3, "'at' and 'to' commands will clone net components"],
    ])('parse script - %d: %s', async (index, description) => {
        // Test only parsing, does not check the correctness of the 
        // parsed result!

        // Access scripts like this to prevent having to 
        // define the script content before the test itself
        const [script, expected] = allScripts[index];
        const {hasError, componentPinNets} = await runScript(script);

        expect(hasError).toBe(false);
        expect(componentPinNets).toStrictEqual(expected);
    });

    test('component annotation', async () => {
        const { hasError, visitor } = await runScript(script4);
        expect(hasError).toBe(false);

        visitor.annotateComponents();
        const instances = visitor.dumpInstances();

        expect(findItem(instances, 'res', 'R1', 'numeric:10k')).not.toBeNull();
        expect(findItem(instances, 'res', 'R2', 'numeric:20k')).not.toBeNull();
        expect(findItem(instances, 'cap', 'C1', 'numeric:100n')).not.toBeNull();
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
        expect(hasError).toBe(false);

        expect(visitor.printStream[0]).toBe(6);
    });

    test('double dot syntax', async () => {
        // Check that the double dot syntax works for 'place' parameter
        const {hasError, visitor} = await runScript(script5);
        expect(hasError).toBe(false);

        visitor.annotateComponents();
        const instances = visitor.dumpInstances();

        const item1 = findItem(instances, 'res', 'R1', 'numeric:10k');
        expect(item1.parameters.get('place')).toBe(false);

        const item2 = findItem(instances, 'res', 'R2', 'numeric:20k');
        expect(item2.parameters.get('place')).toBe(true);
    });
});


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

const expected1: ComponentPinNet[] = [
    ["NET_1", "U1", 2],
    ["NET_1", "U2", 1],
    ["NET_2", "U2", 3],
    ["NET_2", "U1", 10],
    ["NET_2", "U2", 5],
    ["gnd", "gnd", 1]
];

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

const expected2: ComponentPinNet[] = [
    ["gnd", "gnd", 1],
    ["gnd", "J1", 1],
    ["gnd", "J1", 3],
    ["gnd", "gnd:0", 1]
];

const script3 = `
def diode():
    return create component:
        pins: 2

def label(value):
    return create component:
        pins: 1
        display: "label"
        params:
            value: value

at label("hello")
wire right 40 

branch:
    wire down 40
    
    branch:
        wire down 20
        add diode() ..angle = 90

    wire left 20
    add diode() pin 2
    wire left 20 down 20
    add diode() ..angle = 90

wire right 40 
add diode()
`;
const expected3: ComponentPinNet[] = [
    ["NET_1", "label_0.COMP_1_hello", 1],
    ["NET_1", "diode_0.COMP_1", 1],
    ["NET_1", "diode_1.COMP_1", 2],
    ["NET_1", "diode_3.COMP_1", 1],
    ["NET_2", "diode_1.COMP_1", 1],
    ["NET_2", "diode_2.COMP_1", 1],
    ["gnd", "gnd", 1]
];

const script6 = `
import lib

vcc = net("3v3")
midpt = net("out")

at vcc
wire down 20
to gnd

at vcc
wire down 20
add res(20k) down
wire down 20
branch:
    wire down 20
    add res(20k) down
    wire down 20
    to gnd
wire right 60
to midpt ..angle = 90

at vcc
wire down 20
add res(10k) down
wire down 20 right 40 up 20
to midpt
`;

const expected6: ComponentPinNet[] = [
    ['gnd', 'gnd', 1],
    ['gnd', 'vcc', 1],
    ['gnd', 'vcc:0', 1],
    ['gnd', 'gnd:0', 1],
    ['gnd', 'vcc:1', 1],
    ['gnd', 'res_0.COMP_1_20k', 1],
    ['gnd', 'gnd:1', 1],
    ['gnd', 'res_1.COMP_1_20k', 2],
    ['gnd', 'vcc:2', 1],
    ['gnd', 'res_2.COMP_1_10k', 1],
    ['net_1.out', 'midpt', 1],
    ['net_1.out', 'res_0.COMP_1_20k', 2],
    ['net_1.out', 'res_1.COMP_1_20k', 1],
    ['net_1.out', 'midpt:0', 1],
    ['net_1.out', 'midpt:1', 1],
    ['net_1.out', 'res_2.COMP_1_10k', 2]
];

// Store in an array, so that it is accessible
// during the test itself.
const allScripts: [string, ComponentPinNet[]][] = [
    [script1, expected1],
    [script2, expected2],
    [script3, expected3],
    [script6, expected6],
];


const script4 = `
import lib

variant = "MainVariantX"

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

`;

const script5 = `
import lib
at net("5V")
wire down 20

add res(10k)
..place = false

wire down 20

add res(20k)
..place = true
wire down 20
to gnd
`;

