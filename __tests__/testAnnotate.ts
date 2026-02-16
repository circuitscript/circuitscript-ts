/*
 * Tests for the RefdesAnnotationVisitor output format.
 */

import { CharStream, CommonTokenStream } from 'antlr4ng';
import { MainLexer } from '../src/lexer.js';
import { CircuitScriptParser } from '../src/antlr/CircuitScriptParser.js';
import { ParserVisitor } from '../src/visitor.js';
import { BaseVisitor, OnErrorHandler, ImportFileResult } from '../src/BaseVisitor.js';
import { parseFileWithVisitor, CircuitscriptParserErrorListener } from '../src/parser.js';
import { NodeScriptEnvironment } from '../src/environment.js';
import { RefdesAnnotationVisitor } from '../src/annotate/RefdesAnnotationVisitor.js';

const SCRIPT_PATH = '__tests__/testData/annotateData/main.cst';

async function runScript(script: string, scriptPath: string): Promise<{
    hasError: boolean;
    visitor: ParserVisitor;
    tree: ReturnType<CircuitScriptParser['script']>;
    tokens: CommonTokenStream;
}> {
    const env = new NodeScriptEnvironment();
    NodeScriptEnvironment.setInstance(env);
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

    visitor.annotateComponents();

    hasError = hasError || errorListener.hasSyntaxErrors();

    return { hasError, visitor, tree, tokens };
}

describe('Refdes annotation: output format', () => {
    test('single add expression generates correct #= refdes comment', async () => {
        const script = `import lib1\nadd lib1.my_ic()\n`;
        const { hasError, visitor, tree, tokens } = await runScript(script, SCRIPT_PATH);
        expect(hasError).toBe(false);

        const componentLinks = visitor.getComponentCtxLinks();
        const annotationVisitor = new RefdesAnnotationVisitor(true, script, tokens, componentLinks);
        await annotationVisitor.visit(tree);
        const output = annotationVisitor.getOutput();

        // IC type maps to prefix "U", first instance is U1
        expect(output).toContain('#= U1');
        expect(output).toMatch(/add lib1.my_ic\(\) #= U1/);
    });

    test('multiple add expressions receive sequential refdes annotations', async () => {
        const script = `import lib1\nadd lib1.my_ic()\nadd lib1.my_resistor()\n`;
        const { hasError, visitor, tree, tokens } = await runScript(script, SCRIPT_PATH);
        expect(hasError).toBe(false);

        const componentLinks = visitor.getComponentCtxLinks();
        const annotationVisitor = new RefdesAnnotationVisitor(true, script, tokens, componentLinks);
        await annotationVisitor.visit(tree);
        const output = annotationVisitor.getOutput();

        // IC gets U prefix, resistor gets R prefix
        expect(output).toContain('#= U1');
        expect(output).toContain('#= R1');
        expect(output).toMatch(/add lib1.my_ic\(\) #= U1/);
        expect(output).toMatch(/add lib1.my_resistor\(\) #= R1/);
    });

    test('annotation format matches the #= <refdes> pattern', async () => {
        const script = `import lib1\nadd lib1.my_resistor()\n`;
        const { hasError, visitor, tree, tokens } = await runScript(script, SCRIPT_PATH);
        expect(hasError).toBe(false);

        const componentLinks = visitor.getComponentCtxLinks();
        const annotationVisitor = new RefdesAnnotationVisitor(true, script, tokens, componentLinks);
        await annotationVisitor.visit(tree);
        const output = annotationVisitor.getOutput();

        // Annotation format must be " #= <PREFIX><number>"
        expect(output).toMatch(/#= [A-Z]+\d+/);
        // Must not include extra whitespace or punctuation inside the refdes token
        expect(output).not.toMatch(/#= [A-Z]+ \d+/);
    });

    test('component inside a loop receives placeholder refdes annotation', async () => {
        const script = `import lib1\nfor i in range(0, 3):\n    branch:\n        add lib1.my_resistor()\n`;
        const { hasError, visitor, tree, tokens } = await runScript(script, SCRIPT_PATH);
        expect(hasError).toBe(false);

        const componentLinks = visitor.getComponentCtxLinks();
        const annotationVisitor = new RefdesAnnotationVisitor(true, script, tokens, componentLinks);
        await annotationVisitor.visit(tree);
        const output = annotationVisitor.getOutput();

        // Components in loops use placeholder format: #= R1_ (trailing underscore)
        expect(output).toContain('#= R1_');
        expect(output).toMatch(/add lib1.my_resistor\(\) #= R1_/);
        // Must not contain a fully-resolved (non-placeholder) refdes for a loop component
        expect(output).not.toMatch(/add lib1.my_resistor\(\) #= R1[^_]/);
    });

    test('annotation visitor produces no modifications for non-component expressions', async () => {
        // Script with only a variable assignment — no add/at/to component expressions
        const script = `x = 42\n`;
        const { hasError, visitor, tree, tokens } = await runScript(script, SCRIPT_PATH);
        expect(hasError).toBe(false);

        const componentLinks = visitor.getComponentCtxLinks();
        const annotationVisitor = new RefdesAnnotationVisitor(true, script, tokens, componentLinks);
        await annotationVisitor.visit(tree);

        // No component contexts means no modifications and no annotation comments
        expect(annotationVisitor.getModifications().size).toBe(0);
        const output = annotationVisitor.getOutput();
        expect(output).not.toContain('#=');
    });
});
