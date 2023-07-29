import fs from 'fs';
import CircuitScriptParser from './../src/antlr/CircuitScriptParser';
import CircuitScriptLexer from './../src/antlr/CircuitScriptLexer';

import { CharStream, CommonTokenStream } from 'antlr4';
import { MainVisitor } from './../src/visitor';
import { Example1Expected, Example2Expected, Example3Expected } from './expectedResults';

describe('test examples', () => {

    test.each([
        ['examples/example.cst', Example1Expected],
        ['examples/example2.cst', Example2Expected],
        ['examples/example3.cst', Example3Expected],
    ])("file %s", async (fileName, expectedResult) => {
        const data = await getFile(fileName);
        const result = getScriptOutput(data);
        expect(result).toStrictEqual(expectedResult);
    });

    function getFile(filename: string): Promise<string> {
        return new Promise(resolve => {
            fs.readFile(filename, 'utf8', (err, data) => {
                if (err) {
                    throw err;
                }

                resolve(data);
            });
        });
    }

    function getScriptOutput(data: string): object {
        const chars = new CharStream(data);
        const lexer = new CircuitScriptLexer(chars);
        const tokens = new CommonTokenStream(lexer);

        const parser = new CircuitScriptParser(tokens);
        const tree = parser.script();

        const visitor = new MainVisitor();
        visitor.silent = true;
        visitor.getExecutor().silent = true;

        try {
            visitor.visit(tree);
        } catch (err) {
            console.log("got error", err);
        }

        const result = visitor.dump2();
        return result;
    }
});
