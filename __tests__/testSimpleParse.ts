
import { ComponentPinNet } from '../src/objects/types';
import { runScript } from './helpers';

describe('test parsing', () => {

    test.each([
        [0, "create component command"],
        [1, "function to create component and branching"],
        [2, "nested branching, add with pin selected"]
    ])('parse script - %d: %s', async (index, description) => {
        // Test only parsing, does not check the correctness of the 
        // parsed result!

        // Access scripts like this to prevent having to 
        // define the script content before the test itself
        const [script, expected] = allScripts[index];
        const [parseStatus, netOutput] = await runScript(script);

        expect(parseStatus).toBe(true);
        expect(netOutput).toStrictEqual(expected);
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
    ["gnd", "J1", 3]
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
        add diode() [angle=90]

    wire left 20
    add diode() pin 2
    wire left 20 down 20
    add diode() [angle=90]

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
]

// Store in an array, so that it is accessible
// during the test itself.
const allScripts: [string, ComponentPinNet[]][] = [
    [script1, expected1],
    [script2, expected2],
    [script3, expected3],
];
