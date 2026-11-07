/*
 * Tests for the RefdesAnnotationVisitor output format.
 */

import { CharStream, CommonTokenStream } from 'antlr4ng';
import { MainLexer } from '../src/lexer.js';
import { CircuitScriptParser } from '../src/antlr/CircuitScriptParser.js';
import { ParserVisitor } from '../src/visitor.js';
import { BaseVisitor, OnErrorHandler, ImportFileResult } from '../src/BaseVisitor.js';
import { parseFileWithVisitor, CircuitscriptParserErrorListener } from '../src/parser.js';
import { RefdesAnnotationVisitor } from '../src/annotate/RefdesAnnotationVisitor.js';
import { ComponentTypes, RefdesMode } from '../src/globals.js';
import { readFileSync } from 'fs';
import { getTestEnvironment } from './helpers.js';
import { renderScript, renderScriptCustom } from '../src/pipeline.js';
import { generateAnnotatedFiles, AnnotationOutputFile } from '../src/annotate/DefaultPostAnnotationCallback.js';
import { mkdirSync, rmSync, copyFileSync, readdirSync, statSync } from 'fs';
import { join, resolve, basename } from 'path';

const SCRIPT_PATH = '__tests__/testData/annotateData/main.cst';

async function runScript(script: string, scriptPath: string, simplify = true, refdesMode: RefdesMode = RefdesMode.Indexed): Promise<{
    hasError: boolean;
    visitor: ParserVisitor;
    tree: ReturnType<CircuitScriptParser['script']>;
    tokens: CommonTokenStream;
}> {
    const env = getTestEnvironment();
    
    await env.prepareSVGEnvironment();
    env.setCurrentFile(scriptPath);

    const visitor = new ParserVisitor(true, null, env);
    visitor.printToConsole = false;

    visitor.onImportFile = (v: BaseVisitor, filePath: string, fileData: string,
        onErr: OnErrorHandler, fileLineOffset: number): ImportFileResult => {
        v.enterFile(filePath);
        const result = parseFileWithVisitor(v, fileData, { lineOffset: fileLineOffset });
        v.exitFile();
        return result;
    };

    visitor.enterFile(scriptPath);
    await visitor.resolveImportsAndLoad(scriptPath, script);

    const chars = CharStream.fromString(script);
    const lexer = new MainLexer(chars);
    const tokens = new CommonTokenStream(lexer);
    const parser = new CircuitScriptParser(tokens);
    parser.removeErrorListeners();

    const errorListener = new CircuitscriptParserErrorListener(visitor.onErrorHandler);
    parser.addErrorListener(errorListener);
    const tree = parser.script();

    let hasError = false;
    try {
        visitor.visit(tree);
    } catch (err) {
        console.log('got err', err);
        hasError = true;
    }
    visitor.exitFile();

    visitor.annotateComponents(simplify, refdesMode);

    hasError = hasError || errorListener.hasSyntaxErrors();

    return { hasError, visitor, tree, tokens };
}

async function annotate(script: string, refdesMode: RefdesMode = RefdesMode.Indexed) {
    const r = await runScript(script, SCRIPT_PATH, true, refdesMode);
    expect(r.hasError).toBe(false);
    const av = new RefdesAnnotationVisitor(true, script, r.tokens,
        r.visitor.getComponentCtxLinks(), refdesMode);
    av.visit(r.tree);
    return { ...r, av, output: av.getOutput() };
}

const CREATE_RES = '    type: "res"\n    pins: 2\n';
const CREATE_IC = '    type: "ic"\n    pins: 4\n';

describe('Refdes annotation: output format', () => {
    test('single add expression generates correct #= refdes comment', async () => {
        const script = `import "lib1"\nadd lib1.my_ic()\n`;
        const { hasError, visitor, tree, tokens } = await runScript(script, SCRIPT_PATH);
        expect(hasError).toBe(false);

        const componentLinks = visitor.getComponentCtxLinks();
        const annotationVisitor = new RefdesAnnotationVisitor(true, script, tokens, componentLinks);
        annotationVisitor.visit(tree);
        const output = annotationVisitor.getOutput();

        // IC type maps to prefix "U", first instance is U1
        expect(output).toContain('#= U1');
        expect(output).toMatch(/add lib1.my_ic\(\) #= U1/);
    });

    test('multiple add expressions receive sequential refdes annotations', async () => {
        const script = `import "lib1"\nadd lib1.my_ic()\nadd lib1.my_resistor()\n`;
        const { hasError, visitor, tree, tokens } = await runScript(script, SCRIPT_PATH);
        expect(hasError).toBe(false);

        const componentLinks = visitor.getComponentCtxLinks();
        const annotationVisitor = new RefdesAnnotationVisitor(true, script, tokens, componentLinks);
        annotationVisitor.visit(tree);
        const output = annotationVisitor.getOutput();

        // IC gets U prefix, resistor gets R prefix
        expect(output).toContain('#= U1');
        expect(output).toContain('#= R1');
        expect(output).toMatch(/add lib1.my_ic\(\) #= U1/);
        expect(output).toMatch(/add lib1.my_resistor\(\) #= R1/);
    });

    test('annotation format matches the #= <refdes> pattern', async () => {
        const script = `import "lib1"\nadd lib1.my_resistor()\n`;
        const { hasError, visitor, tree, tokens } = await runScript(script, SCRIPT_PATH);
        expect(hasError).toBe(false);

        const componentLinks = visitor.getComponentCtxLinks();
        const annotationVisitor = new RefdesAnnotationVisitor(true, script, tokens, componentLinks);
        annotationVisitor.visit(tree);
        const output = annotationVisitor.getOutput();

        // Annotation format must be " #= <PREFIX><number>"
        expect(output).toMatch(/#= [A-Z]+\d+/);
        // Must not include extra whitespace or punctuation inside the refdes token
        expect(output).not.toMatch(/#= [A-Z]+ \d+/);
    });

    test('component inside a loop receives placeholder refdes annotation', async () => {
        const script = `import "lib1"\nfor i in range(0, 3):\n    branch:\n        add lib1.my_resistor()\n`;
        const { hasError, visitor, tree, tokens } = await runScript(script, SCRIPT_PATH);
        expect(hasError).toBe(false);

        const componentLinks = visitor.getComponentCtxLinks();
        const annotationVisitor = new RefdesAnnotationVisitor(true, script, tokens, componentLinks);
        annotationVisitor.visit(tree);
        const output = annotationVisitor.getOutput();

        // Components in loops use placeholder format: #= R1_ (trailing underscore)
        expect(output).toContain('#= R1_');
        expect(output).toMatch(/add lib1.my_resistor\(\) #= R1_/);
        // Must not contain a fully-resolved (non-placeholder) refdes for a loop component
        expect(output).not.toMatch(/add lib1.my_resistor\(\) #= R1[^_]/);
    });

    test('indexedRefdes disabled: loop instance not annotated, non-loop instance is', async () => {
        const script = `import "lib1"\nadd lib1.my_resistor()\nfor i in range(0, 3):\n    branch:\n        add lib1.my_resistor()\n`;
        const { hasError, visitor, tree, tokens } = await runScript(script, SCRIPT_PATH, true, RefdesMode.Flat);
        expect(hasError).toBe(false);

        const annotationVisitor = new RefdesAnnotationVisitor(true, script, tokens,
            visitor.getComponentCtxLinks(), RefdesMode.Flat);
        annotationVisitor.visit(tree);
        const output = annotationVisitor.getOutput();

        expect(output).toMatch(/^add lib1.my_resistor\(\) #= R\d+$/m);
        expect(output).not.toMatch(/    {8}add lib1.my_resistor\(\) #=/);
        expect(output).not.toMatch(/#= [A-Z]+\d*_/);
        expect(annotationVisitor.getSkippedIndexedCount()).toBeGreaterThan(0);
    });

    test('indexed-flat: source update writes placeholder for loop component', async () => {
        const script = `import "lib1"\nfor i in range(0, 3):\n    branch:\n        add lib1.my_resistor()\n`;
        const { hasError, visitor, tree, tokens } = await runScript(script, SCRIPT_PATH, true, RefdesMode.IndexedFlat);
        expect(hasError).toBe(false);

        const annotationVisitor = new RefdesAnnotationVisitor(true, script, tokens,
            visitor.getComponentCtxLinks(), RefdesMode.IndexedFlat);
        annotationVisitor.visit(tree);
        expect(annotationVisitor.getOutput()).toMatch(/add lib1.my_resistor\(\) #= R1_$/m);
        expect(annotationVisitor.getSkippedIndexedCount()).toBe(0);
    });

    test('indexed-flat: two loops write distinct placeholders', async () => {
        const loop = `for i in range(0, 3):\n    branch:\n        add lib1.my_resistor()\n`;
        const script = `import "lib1"\n${loop}${loop}`;
        const { hasError, visitor, tree, tokens } = await runScript(script, SCRIPT_PATH, true, RefdesMode.IndexedFlat);
        expect(hasError).toBe(false);

        const annotationVisitor = new RefdesAnnotationVisitor(true, script, tokens,
            visitor.getComponentCtxLinks(), RefdesMode.IndexedFlat);
        annotationVisitor.visit(tree);
        const output = annotationVisitor.getOutput();
        expect((output.match(/#= R1_$/gm) ?? []).length).toBe(1);
        expect((output.match(/#= R2_$/gm) ?? []).length).toBe(1);
        expect(annotationVisitor.getSkippedIndexedCount()).toBe(0);
    });

    test('indexed-flat: re-annotating written placeholders is stable', async () => {
        const loop = `for i in range(0, 3):\n    branch:\n        add lib1.my_resistor()\n`;
        const script = `import "lib1"\n${loop}${loop}`;
        const first = await runScript(script, SCRIPT_PATH, true, RefdesMode.IndexedFlat);
        expect(first.hasError).toBe(false);
        const v1 = new RefdesAnnotationVisitor(true, script, first.tokens,
            first.visitor.getComponentCtxLinks(), RefdesMode.IndexedFlat);
        v1.visit(first.tree);
        const output = v1.getOutput();

        const second = await runScript(output, SCRIPT_PATH, true, RefdesMode.IndexedFlat);
        expect(second.hasError).toBe(false);
        const v2 = new RefdesAnnotationVisitor(true, output, second.tokens,
            second.visitor.getComponentCtxLinks(), RefdesMode.IndexedFlat);
        v2.visit(second.tree);
        const output2 = v2.getOutput();
        expect((output2.match(/#= R1_$/gm) ?? []).length).toBe(1);
        expect((output2.match(/#= R2_$/gm) ?? []).length).toBe(1);
        expect(output2).toEqual(output);
    });

    describe.each([RefdesMode.Indexed, RefdesMode.IndexedFlat])('loop placeholder dedupe (%s)', (mode) => {
        const count = (s: string, re: RegExp): number => (s.match(re) ?? []).length;

        test('loop component is annotated exactly once and is stable', async () => {
            const script = `import "lib1"\nfor i in range(0, 5):\n    branch:\n        add lib1.my_resistor()\n`;
            const { output } = await annotate(script, mode);
            expect(count(output, /#= R1_$/gm)).toBe(1);
            expect(count(output, /#=/g)).toBe(1);
            const second = await annotate(output, mode);
            expect(second.output).toEqual(output);
        });

        test('non-loop component then loop component get distinct refdes', async () => {
            const script = `import "lib1"\nadd lib1.my_resistor()\nfor i in range(0, 3):\n    branch:\n        add lib1.my_resistor()\n`;
            const { output } = await annotate(script, mode);
            expect(count(output, /#= R1$/gm)).toBe(1);
            expect(count(output, /#= R2_$/gm)).toBe(1);
            expect(count(output, /#=/g)).toBe(2);
            const second = await annotate(output, mode);
            expect(second.output).toEqual(output);
        });

        test('two components of the same type in one loop get distinct placeholders', async () => {
            const script = `import "lib1"\nfor i in range(0, 3):\n    branch:\n        add lib1.my_resistor()\n        add lib1.my_resistor()\n`;
            const { output } = await annotate(script, mode);
            expect(count(output, /#= R1_$/gm)).toBe(1);
            expect(count(output, /#= R2_$/gm)).toBe(1);
            const second = await annotate(output, mode);
            expect(second.output).toEqual(output);
        });

        test('nested loop component is annotated once', async () => {
            const script = `import "lib1"\nfor i in range(0, 2):\n    for j in range(0, 2):\n        branch:\n            add lib1.my_resistor()\n`;
            const { output } = await annotate(script, mode);
            expect(count(output, /#= R1_$/gm)).toBe(1);
            expect(count(output, /#=/g)).toBe(1);
            const second = await annotate(output, mode);
            expect(second.output).toEqual(output);
        });
    });

    test('annotation visitor produces no modifications for non-component expressions', async () => {
        // Script with only a variable assignment — no add/at/to component expressions
        const script = `x = 42\n`;
        const { hasError, visitor, tree, tokens } = await runScript(script, SCRIPT_PATH);
        expect(hasError).toBe(false);

        const componentLinks = visitor.getComponentCtxLinks();
        const annotationVisitor = new RefdesAnnotationVisitor(true, script, tokens, componentLinks);
        annotationVisitor.visit(tree);

        // No component contexts means no modifications and no annotation comments
        expect(annotationVisitor.getModifications().size).toBe(0);
        const output = annotationVisitor.getOutput();
        expect(output).not.toContain('#=');
    });

    test('at block header gets annotation after the call', async () => {
        const script = `import "lib1"\nat lib1.my_resistor():\n    wire right 50\n`;
        const { output } = await annotate(script);
        expect(output).toMatch(/^at lib1\.my_resistor\(\): #= R1$/m);
    });

    test('at with assignment form is annotated at end of line', async () => {
        const script = `import "lib1"\nat X = lib1.my_resistor()\n`;
        const { output } = await annotate(script);
        expect(output).toMatch(/^at X = lib1\.my_resistor\(\) #= R1$/m);
    });

    test('at an existing variable gets no annotation', async () => {
        const script = `from "std" import *\ngnd = dgnd()\nat gnd\nwire up 50\nto gnd\n`;
        const { output, av } = await annotate(script);
        expect(output).toBe(script);
        expect(av.getModifications().size).toBe(0);
    });

    test('to with a single call gets annotation', async () => {
        const script = `import "lib1"\nat lib1.my_ic()\nwire right 50\nto lib1.my_resistor()\n`;
        const { output } = await annotate(script);
        expect(output).toMatch(/^to lib1\.my_resistor\(\) #= R1$/m);
    });

    test('add of a plain call is unchanged in placement', async () => {
        const script = `import "lib1"\nadd lib1.my_resistor()\n`;
        const { output } = await annotate(script);
        expect(output).toBe(`import "lib1"\nadd lib1.my_resistor() #= R1\n`);
    });

    test('to a, b annotates only the first item (known limitation)', async () => {
        // Known limitation: only the first item of a 'to' list is annotated.
        const script = `import "lib1"\nat lib1.my_ic()\nwire right 50\nto lib1.my_resistor(), lib1.my_ic()\n`;
        const { output } = await annotate(script);
        expect(output).toMatch(/^to lib1\.my_resistor\(\) #= R1, lib1\.my_ic\(\)$/m);
    });
});

describe('Refdes annotation: inline create component', () => {
    test('at create component: gets annotation after the colon', async () => {
        const script = `at create component:\n${CREATE_RES}`;
        const { output } = await annotate(script);
        expect(output).toMatch(/^at create component: #= R1$/m);
        expect(output).toContain('    type: "res"\n');
        expect(output).toContain('    pins: 2\n');
        expect(output).not.toMatch(/(type|pins).*#=/);
    });

    test('two at create component blocks get R1 and U1', async () => {
        const script = `at create component:\n${CREATE_RES}wire right 50\nat create component:\n${CREATE_IC}`;
        const { output } = await annotate(script);
        expect(output.match(/#=/g)!.length).toBe(2);
        expect(output).toContain('#= R1');
        expect(output).toContain('#= U1');
    });

    test('to create component: gets annotation after the colon', async () => {
        const script = `import "lib1"\nadd lib1.my_resistor()\nwire right 50\nto create component:\n${CREATE_RES}`;
        const { output } = await annotate(script);
        expect(output).toMatch(/^add lib1\.my_resistor\(\) #= R1$/m);
        expect(output).toMatch(/^to create component: #= R2$/m);
    });

    test('inline create inside a loop gets a placeholder', async () => {
        const script = `for i in range(0, 3):\n    branch:\n        at create component:\n            type: "res"\n            pins: 2\n`;
        const { output } = await annotate(script);
        expect(output).toMatch(/at create component: #= R1_$/m);
    });

    test('one modification per inline create, wrapping the colon', async () => {
        const script = `at create component:\n${CREATE_RES}`;
        const { av } = await annotate(script);
        const mods = av.getModifications();
        expect(mods.size).toBe(1);
        expect([...mods.values()][0].originalText).toBe(':');
    });

    test('explicit annotation is preserved', async () => {
        const script = `at create component: #= R7\n${CREATE_RES}`;
        const { output, av } = await annotate(script);
        expect(output).toBe(script);
        expect(av.getModifications().size).toBe(0);
    });

    test('explicit annotation binds to the created component', async () => {
        const script = `at create component: #= R7\n${CREATE_RES}wire right 50\nat create component:\n${CREATE_RES}`;
        const { visitor, output } = await annotate(script);
        const refdes = [...visitor.getScope().instances.values()].map(i => i.assignedRefDes);
        expect(refdes).toContain('R7');
        expect(refdes).toContain('R1');
        const r7 = [...visitor.getScope().instances.values()].find(i => i.assignedRefDes === 'R7')!;
        expect(r7.getParam('refdes')).toBe('R7');
        expect(output).toMatch(/^at create component: #= R7$/m);
        expect(output).toMatch(/^at create component: #= R1$/m);
    });

    test('re-annotating the output is stable', async () => {
        const script = `at create component:\n${CREATE_RES}`;
        const first = await annotate(script);
        const second = await annotate(first.output);
        expect(second.output).toEqual(first.output);
    });

    test('explicit placeholder in a loop is kept and not duplicated', async () => {
        const script = `for i in range(0, 3):\n    branch:\n        at create component: #= R1_\n            type: "res"\n            pins: 2\n`;
        const first = await annotate(script);
        expect(first.output.match(/#=/g)!.length).toBe(1);
        const second = await annotate(first.output);
        expect(second.output).toEqual(first.output);
    });

    test('add create component: gets annotation after the colon', async () => {
        const script = `add create component:\n${CREATE_RES}`;
        const { output, av } = await annotate(script);
        expect(output).toMatch(/^add create component: #= R1$/m);
        expect(output.match(/#=/g)!.length).toBe(1);
        expect(av.getModifications().size).toBe(1);
    });

    test('explicit add create component: annotation is preserved', async () => {
        const script = `add create component: #= R7\n${CREATE_RES}`;
        const { output, av } = await annotate(script);
        expect(output).toBe(script);
        expect(av.getModifications().size).toBe(0);
    });

    test('add create component: re-annotation is stable', async () => {
        const first = await annotate(`add create component:\n${CREATE_RES}`);
        const second = await annotate(first.output);
        expect(second.output).toEqual(first.output);
    });

    test('annotation on a created component does not overwrite the current component', async () => {
        const script = `import "lib1"\nadd lib1.my_resistor() #= R5\nwire right 50\nat create component: #= R9\n${CREATE_RES}`;
        const { visitor } = await annotate(script);
        const refs = [...visitor.getScope().instances.values()]
            .filter(i => i.hasParam('refdes')).map(i => i.getParam('refdes'));
        expect(refs.sort()).toEqual(['R5', 'R9']);
    });
});

describe('Refdes annotation: bus components', () => {
    const busDef = `spi = create bus:\n    name: "SPI"\n    pins: "MOSI", "MISO", "CLK"\n\nat spi\nwire right 100\n`;

    const getBuses = (visitor: ParserVisitor): ReturnType<ParserVisitor["getScope"]>["instances"] extends Map<string, infer V> ? V[] : never =>
        [...visitor.getScope().instances.values()]
            .filter(i => i.typeProp === ComponentTypes.bus);

    test('bus instance gets no refdes', async () => {
        const { hasError, visitor } = await runScript(busDef, SCRIPT_PATH);
        expect(hasError).toBe(false);
        const buses = getBuses(visitor);
        expect(buses.length).toBe(1);
        buses.forEach(b => expect(b.assignedRefDes).toBeNull());
    });

    test('annotation output has no #= for a bus', async () => {
        const { hasError, visitor, tree, tokens } = await runScript(busDef, SCRIPT_PATH);
        expect(hasError).toBe(false);
        const annotationVisitor = new RefdesAnnotationVisitor(
            true, busDef, tokens, visitor.getComponentCtxLinks());
        annotationVisitor.visit(tree);
        expect(annotationVisitor.getOutput()).not.toContain('#=');
        expect(annotationVisitor.getModifications().size).toBe(0);
    });

    test('bus does not consume a refdes or disturb other components', async () => {
        const script = `import "lib1"\n${busDef}at lib1.my_resistor()\n`;
        const { hasError, visitor, tree, tokens } = await runScript(script, SCRIPT_PATH);
        expect(hasError).toBe(false);
        const annotationVisitor = new RefdesAnnotationVisitor(
            true, script, tokens, visitor.getComponentCtxLinks());
        annotationVisitor.visit(tree);
        const output = annotationVisitor.getOutput();
        expect(output).toMatch(/at lib1.my_resistor\(\) #= R1/);
        expect(output).not.toMatch(/at spi.*#=/);
        expect(output).not.toMatch(/create bus.*#=/);
        getBuses(visitor).forEach(b => expect(b.assignedRefDes).toBeNull());
        const res = [...visitor.getScope().instances.values()]
            .filter(i => i.typeProp !== ComponentTypes.bus && i.assignedRefDes);
        expect(res.map(r => r.assignedRefDes)).toContain('R1');
    });
});

describe('Refdes annotation: clashes', () => {
    const dir = '__tests__/testData/annotateData/clash/';

    async function refdesOf(script: string, simplify: boolean): Promise<string[]> {
        const { visitor } = await runScript(script, dir + 'x.cst', simplify);
        return [...visitor.getScope().instances.values()]
            .filter(i => i.typeProp === ComponentTypes.resistor && i.assignedRefDes)
            .map(i => i.assignedRefDes!)
            .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    }

    const load = (n: string) => readFileSync(dir + n + '.cst', 'utf8');

    test('script4: same placeholder in two functions errors', async () => {
        await expect(refdesOf(load('script4'), true)).rejects.toThrow(/R5_.*:6.*:12/);
    });

    test('script5: placeholder conflicting with explicit refdes errors', async () => {
        await expect(refdesOf(load('script5'), true)).rejects.toThrow(/R7_.*conflicts with explicit.*R7/);
    });

    test('script7: duplicate explicit refdes errors with both lines', async () => {
        await expect(refdesOf(load('script7'), true)).rejects.toThrow(/Duplicate refdes 'R1'.*:5.*:7/);
    });

    test('inline create and add with same explicit refdes errors with both lines', async () => {
        const script = 'from "std" import *\nat create component: #= R1\n    type: "res"\n    pins: 2\nwire right 50\nadd res(1k) #= R1\n';
        await expect(refdesOf(script, true)).rejects.toThrow(/Duplicate refdes 'R1'.*:2.*:6/);
    });

    test('inline: more than 100 explicit refdes, auto gets next free name', async () => {
        const lines = ['from "std" import *', 'gnd = dgnd()', 'at gnd'];
        for (let i = 1; i <= 101; i++) lines.push('wire up 50', `add res(1k) #= R${i}`);
        lines.push('wire up 50', 'add res(2k)');
        const result = await refdesOf(lines.join('\n') + '\n', true);
        expect(result.length).toBe(102);
        expect(new Set(result).size).toBe(102);
        expect(result).toContain('R102');
    });

    test('inline boundary: 100 explicit refdes, auto gets R101', async () => {
        const lines = ['from "std" import *', 'gnd = dgnd()', 'at gnd'];
        for (let i = 1; i <= 100; i++) lines.push('wire up 50', `add res(1k) #= R${i}`);
        lines.push('wire up 50', 'add res(2k)');
        const result = await refdesOf(lines.join('\n') + '\n', true);
        expect(result.length).toBe(101);
        expect(result).toContain('R101');
    });

    const cases: [string, boolean, string[]][] = [
        ['script1', true, ['R1', 'R2_1', 'R2_2', 'R3_1', 'R3_2', 'R3_3']],
        ['script1', false, ['R1', 'R2_1', 'R2_2', 'R3_1', 'R3_2', 'R3_3']],
        ['script2', true, ['R1']],
        ['script2', false, ['R1_1']],
        ['script3', true, ['R1', 'R2', 'R3', 'R4']],
        ['script3', false, ['R1', 'R2', 'R3', 'R4']],
        ['script6', true, ['R1', 'R2', 'R3']],
        ['script6', false, ['R1_1', 'R2_1', 'R3']],
    ];
    test.each(cases)('regression %s (simplify=%s)', async (name, simplify, expected) => {
        expect(await refdesOf(load(name), simplify)).toEqual(expected);
    });
});

describe('generateAnnotatedFiles', () => {
    const tmpRoot = resolve('__tests__/tmp/annotateGen');
    const fixtureDir = resolve('__tests__/testData/cliTest/script59');
    const names = ['main.cst', 'file1.cst', 'file2.cst'];

    function setup(name: string): string {
        const dir = join(tmpRoot, name);
        rmSync(dir, { recursive: true, force: true });
        mkdirSync(dir, { recursive: true });
        for (const n of names) {
            copyFileSync(join(fixtureDir, n), join(dir, n));
        }
        return dir;
    }

    function readAll(dir: string): Map<string, string> {
        return new Map(readdirSync(dir).filter(n => statSync(join(dir, n)).isFile()).map(n => [n, readFileSync(join(dir, n), 'utf8')]));
    }

    afterAll(() => {
        rmSync(tmpRoot, { recursive: true, force: true });
    });

    test('returns file contents without writing, matching the CLI path', async () => {
        const dirA = setup('compute');
        const dirB = setup('cli');
        const before = readAll(dirA);
        const env = getTestEnvironment();
        await env.prepareSVGEnvironment();

        let generated: AnnotationOutputFile[] = [];
        const inputA = join(dirA, 'main.cst');
        await renderScriptCustom(before.get('main.cst')!, [], {
            dumpNets: false, dumpData: false, showStats: false,
            environment: env, inputPath: inputA, updateSource: true,
        }, [], [async (...args) => {
            const res = await generateAnnotatedFiles(...args, { skipCacheSideEffects: true });
            generated = res.files;
        }]);

        // main, file1 (inline) and the external refdes file
        expect(generated.length).toBe(3);
        expect(generated.filter(f => f.isMainFile).length).toBe(1);
        expect(generated.filter(f => f.kind === 'external-refdes').length).toBe(1);
        expect(readAll(dirA)).toEqual(before);

        const inputB = join(dirB, 'main.cst');
        await renderScript(before.get('main.cst')!, [], {
            dumpNets: false, dumpData: false, showStats: false,
            environment: env, inputPath: inputB, updateSource: true,
        });

        for (const file of generated) {
            const written = readFileSync(join(dirB, basename(file.filePath)), 'utf8');
            expect(file.content).toEqual(written);
        }
    });
});

describe('Refdes annotation: empty frame', () => {
    const dir = '__tests__/testData/annotateData/';

    test('empty frame body does not throw', async () => {
        const script = readFileSync(`${dir}script8.cst`, 'utf8');
        await expect(annotate(script)).resolves.toBeDefined();
    });

    test('component after an empty frame is annotated', async () => {
        const script = readFileSync(`${dir}script8.cst`, 'utf8');
        const { output } = await annotate(script);
        expect(output).toMatch(/add cap\(100n\) #= C1/);
    });

    test('already annotated script is unchanged', async () => {
        const script = readFileSync(`${dir}script9.cst`, 'utf8');
        const { output, av } = await annotate(script);
        expect(output).toEqual(script);
        expect(av.getModifications().size).toBe(0);
    });

    test('empty frame only script', async () => {
        const script = 'from "std" import *\n\nframe row layout:\n';
        const { output } = await annotate(script);
        expect(output).toEqual(script);
    });
});
