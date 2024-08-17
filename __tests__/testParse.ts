
import { findItem, findItemByRefDes, runScript } from './helpers.js';
import { script1, script10, script11, script12, script13, script14, script15, script16, script2, 
    script3, script6, script7, script8, script9 } from './parseScripts.js';

describe('test parsing', () => {

    test.each([
        ["create component command", script1],
        ["function to create component and branching", script2],
        ["nested branching, add with pin selected", script3],
        ["'at' and 'to' commands will clone net components", script6],
        ["resolve instances in upper contexts", script7],
        ["components in function parameters", script8],
        ["resolve nets in local and upper contexts", script9],
        ["assignment in at/to/add statement", script10],
        ["net namespace local and global", script11],
        ["create component with copy and is net", script12],
        ["correct nets after function call and also `join` keyword", script13],
        ["path with 'point' keyword", script14],
        ["path with 'parallel' keyword", script15],
        ["consecutive blocks with 'join' then 'point'", script16]
        
    ])('parse script - %s', async (description, scriptTest) => {
        // Test only parsing, does not check the correctness of the 
        // parsed result!

        // Access scripts like this to prevent having to 
        // define the script content before the test itself
        const {hasError, componentPinNets} = await runScript(scriptTest.script);

        expect(hasError).toBe(false);
        expect(componentPinNets).toStrictEqual(scriptTest.expected);
    });

    test('component annotation', async () => {
        const { hasError, visitor } = await runScript(`
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
`);
        expect(hasError).toBe(false);

        visitor.annotateComponents();
        const instances = visitor.dumpInstances();

        expect(findItem(instances, 'res', 'R1', 'numeric:10k')).not.toBeNull();
        expect(findItem(instances, 'res', 'R2', 'numeric:20k')).not.toBeNull();
        expect(findItem(instances, 'cap', 'C1', 'numeric:100n')).not.toBeNull();
    });

    test('component annotation with custom type param', async () => {

        const script = `
import lib

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
        expect(hasError).toBe(false);

        visitor.annotateComponents();

        const instances = visitor.dumpInstances();

        expect(findItemByRefDes(instances, 'X', 'X1')).not.toBeNull();
        expect(findItemByRefDes(instances, 'X', 'X2')).not.toBeNull();
    });

    test('component annotation with defined refdes', async () => {

        const script = `
import lib

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
        expect(hasError).toBe(false);

        visitor.annotateComponents();

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
        expect(hasError).toBe(false);

        expect(visitor.printStream[0]).toBe(6);
    });

    test('double dot syntax', async () => {
        // Check that the double dot syntax works for 'place' parameter

        const script = `
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
`
        const {hasError, visitor} = await runScript(script);
        expect(hasError).toBe(false);

        visitor.annotateComponents();
        const instances = visitor.dumpInstances();

        const item1 = findItem(instances, 'res', 'R1', 'numeric:10k');
        expect(item1.parameters.get('place')).toBe(false);

        const item2 = findItem(instances, 'res', 'R2', 'numeric:20k');
        expect(item2.parameters.get('place')).toBe(true);
    });

    test('instance assignment syntax', async () => {

        const script = `
import lib
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
        expect(hasError).toBe(false);

        visitor.annotateComponents();
        const instances = visitor.dumpInstances();

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
        expect(hasError).toBe(false);

        expect(visitor.printStream).toStrictEqual([20, -20, 20, -20]);
    });
});

// This tests that an error is generated at the right position for 
// overlapping connections
`
import lib
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