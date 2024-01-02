
import { ComponentPinNet } from '../src/objects/types';
import { findItem, runScript } from './helpers';

describe('test parsing', () => {

    test.each([
        [0, "create component command"],
        [1, "function to create component and branching"],
        [2, "nested branching, add with pin selected"],
        [3, "'at' and 'to' commands will clone net components"],
        [4, "resolve instances in upper contexts"],
        [5, "components in function parameters"],
        [6, "resolve nets in local and upper contexts"],
        [7, "assignment in at/to/add statement"]
        
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

const script1Expected: ComponentPinNet[] = [
    ['__.NET_1', 'U1', 2],
    ['__.NET_1', 'U2', 1],
    ['__.NET_2', 'U2', 3],
    ['__.NET_2', 'U1', 10],
    ['__.NET_2', 'U2', 5],
];

const script2 = `
import lib
gnd = dgnd()

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

const script2Expected: ComponentPinNet[] = [
    ['__.dgnd_0.GND', 'gnd', 1],
    ['__.dgnd_0.GND', 'J1', 1],
    ['__.dgnd_0.GND', 'J1', 3],
    ['__.dgnd_0.GND', 'gnd:0', 1]
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
const script3Expected: ComponentPinNet[] = [
    [ '__.NET_1', 'label_0.COMP_1_hello', 1 ],
    [ '__.NET_1', 'diode_0.COMP_1', 1 ],
    [ '__.NET_1', 'diode_1.COMP_1', 2 ],
    [ '__.NET_1', 'diode_3.COMP_1', 1 ],
    [ '__.NET_2', 'diode_1.COMP_1', 1 ],
    [ '__.NET_2', 'diode_2.COMP_1', 1 ],
  ];

const script6 = `
import lib

vcc = net("3v3")
midpt = net("out")
gnd = dgnd()

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

const script6Expected: ComponentPinNet[] = [
    ['__.dgnd_0.GND', 'gnd', 1],
    ['__.dgnd_0.GND', 'gnd:0', 1],
    ['__.dgnd_0.GND', 'res_1.COMP_1_20k', 2],
    ['__.net_0.3v3', 'vcc', 1],
    ['__.net_0.3v3', 'vcc:0', 1],
    ['__.net_0.3v3', 'res_0.COMP_1_20k', 1],
    ['__.net_0.3v3', 'vcc:1', 1],
    ['__.net_0.3v3', 'res_2.COMP_1_10k', 1],
    ['__.net_1.out', 'midpt', 1],
    ['__.net_1.out', 'res_0.COMP_1_20k', 2],
    ['__.net_1.out', 'res_1.COMP_1_20k', 1],
    ['__.net_1.out', 'midpt:0', 1],
    ['__.net_1.out', 'midpt:1', 1],
    ['__.net_1.out', 'res_2.COMP_1_10k', 2]
];

const script7 = `
import lib

v5v = net("5V")
gnd = dgnd()

def tmp1():
    at v5v
    wire down 20
    add res(10k)
    wire down 20
    to gnd

tmp1()

tmp1()`

const script7Expected: ComponentPinNet[] = [
    ['__.dgnd_0.GND', 'gnd', 1],
    ['__.dgnd_0.GND', 'tmp1_0.gnd:0', 1],
    ['__.dgnd_0.GND', 'tmp1_0.res_0.COMP_1_10k', 2],
    ['__.dgnd_0.GND', 'tmp1_1.gnd:0', 1],
    ['__.dgnd_0.GND', 'tmp1_1.res_1.COMP_1_10k', 2],
    ['__.net_0.5V', 'v5v', 1],
    ['__.net_0.5V', 'tmp1_0.v5v:0', 1],
    ['__.net_0.5V', 'tmp1_0.res_0.COMP_1_10k', 1],
    ['__.net_0.5V', 'tmp1_1.v5v:0', 1],
    ['__.net_0.5V', 'tmp1_1.res_1.COMP_1_10k', 1]
];

const script4 = `
import lib

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

`;

const script5 = `
import lib
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
`;

const script8 = `
import lib

v5v = supply("5v")
gnd = dgnd()

def divider(power_net, r1, r2, output_net):
    at power_net
    wire down 20
    add res(r1) down
    wire down 20

    branch:
        wire right 20
        add output_net
        wire right 20

    wire down 20
    add res(r2) down
    wire down 20
    to gnd

divider(v5v, 10k, 20k, label("hello"))
`

const script8Expected: ComponentPinNet[] = [
    ['__.dgnd_0.GND', 'gnd', 1],
    ['__.dgnd_0.GND', 'divider_0.gnd:0', 1],
    ['__.dgnd_0.GND', 'divider_0.res_1.COMP_1_20k', 2],
    ['__.label_0.hello', 'label_0.COMP_1_1', 1],
    ['__.label_0.hello', 'divider_0.res_0.COMP_1_10k', 2],
    ['__.label_0.hello', 'divider_0.res_1.COMP_1_20k', 1],
    ['__.supply_0.5v', 'v5v', 1],
    ['__.supply_0.5v', 'divider_0.v5v:0', 1],
    ['__.supply_0.5v', 'divider_0.res_0.COMP_1_10k', 1]
];

const script9 = `
import lib

v5v = supply("5v")
gnd = dgnd()

net("global_name")

def divider(power_net, r1, r2, net_name):
    frame:
        ..border = 0
        
        at power_net
        wire down 20
        add res(r1) down
        wire down 20

        branch:
            wire right 20
            add label("inner_name")
            wire right 60
            add res(100k) right
            wire right 20
            add label("global_name")
            wire right 40

        wire down 20
        add res(r2) down
        wire down 20
        to gnd

frame:
    ..border = 0
    ..direction = "row"

    divider(v5v, 10k, 20k, "hello2")
    divider(v5v, 10k, 20k, "hello1")
`;

const script9Expected: ComponentPinNet[] = [
    ['__.dgnd_0.GND', 'gnd', 1],
    ['__.dgnd_0.GND', 'divider_0.gnd:0', 1],
    ['__.dgnd_0.GND', 'divider_0.res_2.COMP_1_20k', 2],
    ['__.dgnd_0.GND', 'divider_1.gnd:0', 1],
    ['__.dgnd_0.GND', 'divider_1.res_5.COMP_1_20k', 2],
    [
        '__.divider_0.label_0.inner_name',
        'divider_0.label_0.COMP_1_1',
        1
    ],
    [
        '__.divider_0.label_0.inner_name',
        'divider_0.res_0.COMP_1_10k',
        2
    ],
    [
        '__.divider_0.label_0.inner_name',
        'divider_0.res_1.COMP_1_100k',
        1
    ],
    [
        '__.divider_0.label_0.inner_name',
        'divider_0.res_2.COMP_1_20k',
        1
    ],
    [
        '__.divider_1.label_2.inner_name',
        'divider_1.label_2.COMP_1_1',
        1
    ],
    [
        '__.divider_1.label_2.inner_name',
        'divider_1.res_3.COMP_1_10k',
        2
    ],
    [
        '__.divider_1.label_2.inner_name',
        'divider_1.res_4.COMP_1_100k',
        1
    ],
    [
        '__.divider_1.label_2.inner_name',
        'divider_1.res_5.COMP_1_20k',
        1
    ],
    ['__.net_0.global_name', 'net_0.COMP_1_1', 1],
    ['__.net_0.global_name', 'divider_0.label_1.COMP_1_1', 1],
    ['__.net_0.global_name', 'divider_0.res_1.COMP_1_100k', 2],
    ['__.net_0.global_name', 'divider_1.label_3.COMP_1_1', 1],
    ['__.net_0.global_name', 'divider_1.res_4.COMP_1_100k', 2],
    ['__.supply_0.5v', 'v5v', 1],
    ['__.supply_0.5v', 'divider_0.v5v:0', 1],
    ['__.supply_0.5v', 'divider_0.res_0.COMP_1_10k', 1],
    ['__.supply_0.5v', 'divider_1.v5v:0', 1],
    ['__.supply_0.5v', 'divider_1.res_3.COMP_1_10k', 1]
];

const script10 = `
import lib
gnd = dgnd()

at v5v = supply("5V")
wire down 20
add R1 = res(10k) down
wire down 20
add R2 = res(10k) down
wire down 20
to C1 = cap(10n) down

at C1 pin 2
wire down 20
to gnd
`

const script10Expected: ComponentPinNet[] =[
    [ '__.NET_1', 'R1', 2 ],
    [ '__.NET_1', 'R2', 1 ],
    [ '__.NET_2', 'R2', 2 ],
    [ '__.NET_2', 'C1', 1 ],
    [ '__.dgnd_0.GND', 'gnd', 1 ],
    [ '__.dgnd_0.GND', 'gnd:0', 1 ],
    [ '__.dgnd_0.GND', 'C1', 2 ],
    [ '__.supply_0.5V', 'v5v', 1 ],
    [ '__.supply_0.5V', 'v5v:0', 1 ],
    [ '__.supply_0.5V', 'R1', 1 ]
  ]

// Store in an array, so that it is accessible
// during the test itself.
const allScripts: [string, ComponentPinNet[]][] = [
    [script1, script1Expected],
    [script2, script2Expected],
    [script3, script3Expected],
    [script6, script6Expected],
    [script7, script7Expected],
    [script8, script8Expected],
    [script9, script9Expected],
    [script10, script10Expected],
];
