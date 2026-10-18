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
 * Returns `line:column` of every recorded use of a symbol, sorted and
 * deduplicated by token start. `scope` is the symbol key prefix.
 */
async function instancesOf(script: string, name: string, scope = '--.'): Promise<string[]> {
    const visitor = await testValidateScript(script);
    const symbol = visitor.symbolTable.getSymbols().get(scope + name);
    if (!symbol || !('instances' in symbol)) {
        return [];
    }
    const byStart = new Map<number, string>();
    symbol.instances.forEach(token => {
        byStart.set(token.start, `${token.line}:${token.column}`);
    });
    return [...byStart.entries()].sort((a, b) => a[0] - b[0]).map(item => item[1]);
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

describe('nested imports', () => {
    test('std imported by both the main file and an imported file keeps separate symbols', async () => {
        const scriptData = readFileSync('__tests__/testData/validationData/script4.cst', { encoding: 'utf8' });
        const visitor = await testValidateScript(scriptData, './__tests__/testData/validationData/script4.cst');
        const symbols = visitor.symbolTable.getSymbols();

        const mainRes = symbols.get('--.res')!;
        const importedRes = symbols.get('--.[script4-import].res')!;

        expect(mainRes.type).toBe('function');
        expect(importedRes.type).toBe('function');
        expect(mainRes.context.namespace).toBe('--.');
        expect(importedRes.context.namespace).toBe('--.[script4-import].');

        // Every std function merged into the main file stays in the main context
        const stdFunctions = [...symbols].filter(([key, value]) =>
            value.type === 'function' && key.split('.').length === 2 &&
            'fileName' in value && value.fileName.endsWith('std.cst'));
        expect(stdFunctions.length).toBeGreaterThan(0);
        stdFunctions.forEach(([, value]) => {
            expect(value.context.namespace).toBe('--.');
        });
    });
});

describe('validation usage tracking', () => {
    const forSample = `from "std" import *

r1 = res(1k)
lst = [1, 2]
cnt = 3

for q in lst:
    add res(q)
    r1.value = q
    add res(cnt)

for q in lst:
    z = q

k = z
`;

    describe('for loops', () => {
        test('iterable, body uses, outer variables and property sets are recorded', async () => {
            expect(await instancesOf(forSample, 'lst')).toEqual(['4:0', '7:9', '12:9']);
            expect(await instancesOf(forSample, 'r1')).toEqual(['3:0', '9:4']);
            expect(await instancesOf(forSample, 'cnt')).toEqual(['5:0', '10:12']);
        });

        test('loops sharing a variable name keep all instances', async () => {
            expect(await instancesOf(forSample, 'q')).toEqual(
                ['7:4', '8:12', '9:15', '12:4', '13:8']);
        });

        test('variable defined in a for body is defined after the loop', async () => {
            expect(await undefinedOf(forSample)).toEqual([]);
            expect(await instancesOf(forSample, 'z')).toEqual(['13:4', '15:4']);
        });

        test('loop variable reusing a global name joins the global', async () => {
            const script = `x = 1
for x in [1, 2]:
    y = x
`;
            const visitor = await testValidateScript(script);
            const symbol = visitor.symbolTable.getSymbols().get('--.x')!;
            expect('instances' in symbol && symbol.instances[0].line).toBe(1);
            expect(await instancesOf(script, 'x')).toEqual(['1:0', '2:4', '3:8']);
        });

        test('multi-id loop', async () => {
            const script = `lst = [1, 2]
for index, val in enumerate(lst):
    t = index + val
`;
            expect(await instancesOf(script, 'index')).toEqual(['2:4', '3:8']);
            expect(await instancesOf(script, 'val')).toEqual(['2:11', '3:16']);
            expect(await instancesOf(script, 'lst')).toEqual(['1:0', '2:28']);
            expect(await undefinedOf(script)).toEqual([]);
        });

        test('nested loops', async () => {
            const script = `lst = [1, 2]
for a in lst:
    for b in lst:
        c = a + b
d = c
`;
            expect(await instancesOf(script, 'a')).toEqual(['2:4', '4:12']);
            expect(await instancesOf(script, 'b')).toEqual(['3:8', '4:16']);
            expect(await instancesOf(script, 'c')).toEqual(['4:8', '5:4']);
            expect(await undefinedOf(script)).toEqual([]);
        });

        test('loop inside def is separate from a same-named global', async () => {
            const script = `lst = 1
def g():
    for lst in [1]:
        lv = lst
    return lv
`;
            expect(await instancesOf(script, 'lst')).toEqual(['1:0']);
            expect(await instancesOf(script, 'lst', '--.g_sym.')).toEqual(['3:8', '4:13']);
            expect(await instancesOf(script, 'lv', '--.g_sym.')).toEqual(['4:8', '5:11']);
        });

        test('break and continue do not stop validation of later statements', async () => {
            const script = `lst = [1, 2]
def h():
    for i in lst:
        if i:
            continue
        in_loop = 1
    for j in lst:
        break
    after_def = lst
    return after_def
for m in lst:
    if m:
        break
    first = 1
    if first:
        continue
    second = 1
later = lst
`;
            expect(await undefinedOf(script)).toEqual([]);
            expect(await instancesOf(script, 'in_loop', '--.h_sym.')).toEqual(['6:8']);
            expect(await instancesOf(script, 'after_def', '--.h_sym.')).toEqual(['9:4', '10:11']);
            expect(await instancesOf(script, 'second')).toEqual(['17:4']);
            expect(await instancesOf(script, 'lst')).toEqual(
                ['1:0', '3:13', '7:13', '9:16', '11:9', '18:8']);
        });

        test('undefined name in a for body is reported', async () => {
            expect(await undefinedOf(`
for i in [1, 2]:
    a = missing + i
`)).toEqual(['--.missing']);
        });

        test('break inside a while body does not drop later symbols', async () => {
            const script = `flag = 1
while flag:
    break
later = flag
`;
            expect(await instancesOf(script, 'later')).toEqual(['4:0']);
            expect(await instancesOf(script, 'flag')).toEqual(['1:0', '2:6', '4:8']);
        });
    });

    describe('existing constructs', () => {
        const preamble = `from "std" import *
r1 = res(1k)
r2 = res(2k)
r3 = res(3k)
r4 = res(4k)
`;

        test.each([
            ['at ... pin', 'at r1 pin 1', 'r1', ['2:0', '6:3']],
            ['to ... pin', 'at r1 pin 1\nto r2 pin 1', 'r2', ['3:0', '7:3']],
            ['at block header and pin lines', 'at r3 pin 1:\n    2: r4', 'r4', ['5:0', '7:7']],
            ['at block header', 'at r3 pin 1:\n    2: r4', 'r3', ['4:0', '6:3']],
            ['while body', 'w = 1\nwhile w:\n    add r2', 'r2', ['3:0', '8:8']],
            ['wire direction target', 'v = r1\nwire right v', 'v', ['6:0', '7:11']],
            ['if body', 'v = 1\nif v:\n    add r1', 'r1', ['2:0', '8:8']],
            ['else body', 'v = 1\nif v:\n    add r1\nelse:\n    add r2', 'r2', ['3:0', '10:8']],
            ['modifier value', 'c = "red"\nadd r1 color: c', 'c', ['6:0', '7:14']],
        ])('%s', async (_description, body, name, expected) => {
            expect(await instancesOf(preamble + body, name)).toEqual(expected);
        });

        test('property names, modifier names, directions and keyword names are not recorded', async () => {
            const script = `${preamble}color = 1
right = 2
x = 3
def f(x):
    return x
v = r1
v.color = "red"
add r1 color: "red"
wire right 10
f(x=1)
`;
            // `color` and `right` are only declared, never used
            expect(await instancesOf(script, 'color')).toEqual(['6:0']);
            expect(await instancesOf(script, 'right')).toEqual(['7:0']);
            expect(await instancesOf(script, 'x')).toEqual(['8:0']);
            expect(await instancesOf(script, 'v')).toEqual(['11:0', '12:0']);
        });

        test('function-local variable is separate from a same-named global', async () => {
            const script = `x = 1
def f():
    x = 2
    return x
y = x
`;
            expect(await instancesOf(script, 'x')).toEqual(['1:0', '5:4']);
            expect(await instancesOf(script, 'x', '--.f_sym.')).toEqual(['3:4', '4:11']);
        });
    });

    describe('parameter identification', () => {
        test('parameter token start matches the function parameter list', async () => {
            const script = `x = 1
def f(x, y):
    z = x
    return z
`;
            const visitor = await testValidateScript(script);
            const symbols = visitor.symbolTable.getSymbols();
            const func = symbols.get('--.f')!;
            const params = ('extra' in func && func.extra.funcDefinedParameters) || [];
            expect(params.length).toBe(2);

            const starts = new Map<string, number>();
            for (const [key, value] of symbols) {
                if (key.startsWith('--.f_sym.') && 'token' in value && value.token) {
                    starts.set(key.slice('--.f_sym.'.length), value.token.start);
                }
            }

            params.forEach(param => {
                expect(starts.get(param[0] as string)).toBe(param[1].start);
            });

            // Local variable does not share a start with any parameter
            const paramStarts = params.map(param => param[1].start);
            expect(paramStarts).not.toContain(starts.get('z'));

            // Parameter named like a global has a different start
            const globalX = symbols.get('--.x')!;
            expect('token' in globalX && globalX.token!.start).not.toBe(starts.get('x'));
        });
    });
});
