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
