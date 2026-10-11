import { readFileSync } from "fs";
import { expectJsonOutput, runScript, runScriptExpectError, testValidateScript } from "./helpers";

const mainPath = '__tests__/testData/validationData/';

async function undefinedOf(script: string): Promise<string[]> {
    const visitor = await testValidateScript(script);
    return [...visitor.symbolTable.getSymbols()]
        .filter(([, value]) => value.type === 'undefined')
        .map(([key]) => key);
}

/**
 * Validation is used mainly in the IDE, for syntax highlighting and 
 * semantic tokens.
 */
describe('test validation', () => {

    test.each([
        ["some variables", 'script1'],
        ["variables and import", 'script2'],
        ["complex script", 'script3'],

    ])('parse script - %s', async (description, scriptPath) => {
        // Test only parsing, does not check the correctness of the 
        // parsed result!

        const scriptData = readFileSync(`${mainPath}${scriptPath}.cst`, { encoding: 'utf8' });

        // Import caching is disabled.
        const visitor = await testValidateScript(scriptData);

        const symbols = visitor.symbolTable.getSymbols();
        const result: [string, string][] = [];

        for (const [key, value] of symbols) {
            result.push([key, value.type]);
        }

        // const sorted = result.sort((a, b) => {
        //     return a[0].localeCompare(b[0]);
        // });

        const jsonString = JSON.stringify(result);

        expectJsonOutput(jsonString, `${mainPath}expected/${scriptPath}.cst.json`);
    });

    test('frame modifiers are not reported as undefined symbols', async () => {
        const visitor = await testValidateScript(`
from "std" import *
frame row:
    R1 = res(10k)
frame "t" column layout:
    R2 = res(10k)
`);
        const undefinedSymbols = [...visitor.symbolTable.getSymbols()]
            .filter(([, value]) => value.type === 'undefined')
            .map(([key]) => key);
        expect(undefinedSymbols).toEqual([]);
    });

    test('pre: block variables are not reported as undefined symbols', async () => {
        const positive = await undefinedOf(`
def mk():
    return create component:
        pins: 1
        display: create graphic (params):
            pre:
                x = 1
            label: "a", x, 0
`);
        expect(positive).toEqual([]);

        // Control: an undeclared name in the same graphic is reported
        const control = await undefinedOf(`
def mk():
    return create component:
        pins: 1
        display: create graphic (params):
            pre:
                x = 1
            label: "a", y, 0
            label: "b", x, 0
`);
        expect(control).toEqual(['--.mk_sym.y']);
    });

    test('graphic body reports undefined names', async () => {
        const wrap = (body: string, params = '(params)') => `
def mk():
    return create component:
        pins: 1
        display: create graphic ${params}:
${body.split('\n').map(l => '            ' + l).join('\n')}
`;
        const cases: [string, string, string, string?][] = [
            ['positional arg', 'label: "a", y, 0', 'y'],
            ['keyword arg', 'label: "a", 0, 0, anchor=y', 'y'],
            ['properties block', 'label:\n    x: 0\n    y: yy', 'yy'],
            ['if condition', 'if cond:\n    label: "a", 0, 0', 'cond'],
            ['else if condition', 'if true:\n    label: "a", 0, 0\nelse if cond2:\n    label: "b", 0, 0', 'cond2'],
            ['for iterable', 'for i in items:\n    label: "a", i, 0', 'items'],
            ['params without identifier', 'label: params.refdes, 0, 0', 'params', ''],
        ];

        for (const [name, body, key, params] of cases) {
            const result = await undefinedOf(wrap(body, params));
            expect([name, result]).toEqual([name, [`--.mk_sym.${key}`]]);
        }
    });

    test('graphic body declared names are not reported', async () => {
        const scripts: [string, string][] = [
            ['params identifier', `
def mk():
    return create component:
        pins: 1
        display: create graphic (params):
            label: params.refdes, 0, 0
`],
            ['two graphics in one def', `
def mk():
    a = create component:
        pins: 1
        display: create graphic (params):
            label: params.refdes, 0, 0
    b = create component:
        pins: 1
        display: create graphic (params):
            label: params.refdes, 0, 0
    return a
`],
            ['for variable', `
def mk():
    return create component:
        pins: 1
        display: create graphic (params):
            for i in range(3):
                label: "a", i, 0
`],
            ['for two variables', `
def mk():
    return create component:
        pins: 1
        display: create graphic (params):
            for a, b in enumerate(range(3)):
                label: "a", a, b
`],
            ['pre assignment', `
def mk():
    return create component:
        pins: 1
        display: create graphic (params):
            pre:
                x = 1
            label: "a", x, 0
            line: 0, 0, x, x
`],
            ['def argument', `
def mk(w):
    return create component:
        pins: 1
        display: create graphic (params):
            rect: 0, 0, w, w
`],
            ['module variable', `
size = 10
def mk():
    return create component:
        pins: 1
        display: create graphic (params):
            rect: 0, 0, size, size
`],
            ['forward reference', `
def mk():
    return create component:
        pins: 1
        display: create graphic (params):
            rect: 0, 0, later_size, later_fn(1)
def later_fn(a):
    return a
later_size = 10
`],
            ['builtin', `
def mk():
    return create component:
        pins: 1
        display: create graphic (params):
            label: str(1), 0, 0
`],
        ];

        for (const [name, script] of scripts) {
            expect([name, await undefinedOf(script)]).toEqual([name, []]);
        }
    });

    test('graphic command names are not reported as undefined', async () => {
        const result = await undefinedOf(`
def mk():
    return create component:
        pins: 1
        display: create graphic (params):
            pre:
                x = 1
            line: 0, 0, 10, 10
            rect: 0, 0, 10, 10
            label: "a", x, 0
            pin: 1, "1", "passive", 0, 0, 0, 0
`);
        expect(result).toEqual([]);
    });

    test('graphic pin command accepts a bare pin id', async () => {
        const result = await undefinedOf(`
def mk():
    return create component:
        pins: 1
        display: create graphic (params):
            pin: B, input, "B", 0, 0, 0, 0
`);
        expect(result).toEqual([]);
    });

    test('sheet modifiers are not reported as undefined symbols', async () => {
        const visitor = await testValidateScript(`
from "std" import *
sheet row:
    R1 = res(10k)
sheet "t" column:
    R2 = res(10k)
`);
        const undefinedSymbols = [...visitor.symbolTable.getSymbols()]
            .filter(([, value]) => value.type === 'undefined')
            .map(([key]) => key);
        expect(undefinedSymbols).toEqual([]);
    });

    describe('erc_net_bridge property validation', () => {
        test('non-boolean value throws a validation error', async () => {
            const msg = await runScriptExpectError(
                'c1 = create component:\n    pins: 2\n    erc_net_bridge: "yes"\n'
            );
            expect(msg).toContain("Invalid value for 'erc_net_bridge' property");
        });

        test('true on a component with pins != 2 throws the pin-count error', async () => {
            const msg = await runScriptExpectError(
                'c1 = create component:\n    pins: 3\n    erc_net_bridge: true\n'
            );
            expect(msg).toContain("is only valid on components with exactly 2 pins");
        });

        test('true on a component with pins: 2 parses/executes without error', async () => {
            const { hasError } = await runScript(
                'c1 = create component:\n    pins: 2\n    erc_net_bridge: true\n'
            );
            expect(hasError).toBe(false);
        });

        test('can be set to a non-boolean post-creation and throws a validation error', async () => {
            const msg = await runScriptExpectError(
                'c1 = create component:\n    pins: 2\n\nc1.erc_net_bridge = "yes"\n'
            );
            expect(msg).toContain("Invalid value for 'erc_net_bridge' property");
        });

        test('true set post-creation on a component with pins != 2 throws the pin-count error', async () => {
            const msg = await runScriptExpectError(
                'c1 = create component:\n    pins: 3\n\nc1.erc_net_bridge = true\n'
            );
            expect(msg).toContain("is only valid on components with exactly 2 pins");
        });

        test('true set post-creation on a component with pins: 2 parses/executes without error', async () => {
            const { hasError } = await runScript(
                'c1 = create component:\n    pins: 2\n\nc1.erc_net_bridge = true\n'
            );
            expect(hasError).toBe(false);
        });

        test('parameter is not set when not specified by the user', async () => {
            const { hasError, visitor } = await runScript(
                'c1 = create component:\n    pins: 2\n'
            );
            expect(hasError).toBe(false);

            const c1 = visitor.dumpVariables().get('c1')!;

            expect(c1.parameters.has('erc_net_bridge')).toBe(false);
            expect(c1.ercNetBridgeProp).toBe(false);
        });

        test('parameter is set to true when specified at creation', async () => {
            const { hasError, visitor } = await runScript(
                'c1 = create component:\n    pins: 2\n    erc_net_bridge: true\n'
            );
            expect(hasError).toBe(false);

            const c1 = visitor.dumpVariables().get('c1')!;

            expect(c1.parameters.get('erc_net_bridge')).toBe(true);
            expect(c1.ercNetBridgeProp).toBe(true);
        });

        test('parameter is set to false when explicitly specified as false at creation', async () => {
            const { hasError, visitor } = await runScript(
                'c1 = create component:\n    pins: 2\n    erc_net_bridge: false\n'
            );
            expect(hasError).toBe(false);

            const c1 = visitor.dumpVariables().get('c1')!;

            expect(c1.parameters.get('erc_net_bridge')).toBe(false);
            expect(c1.ercNetBridgeProp).toBe(false);
        });
    });
});

