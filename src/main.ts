import fs from 'fs';
import CircuitScriptParser from './antlr/CircuitScriptParser';
import CircuitScriptLexer from './antlr/CircuitScriptLexer';

import { CharStream, CommonTokenStream } from 'antlr4';
import { MainVisitor } from './visitor';
import { generateLayout, prepareLayout } from './layout';
import { generateSVG } from './render';

export default async function main(): Promise<void> {
    const fileName = process.argv[2];
    const data = await readFile(fileName);

    const chars = new CharStream(data);
    const lexer = new CircuitScriptLexer(chars);
    const tokens = new CommonTokenStream(lexer);

    const parser = new CircuitScriptParser(tokens);
    const tree = parser.script();

    const visitor = new MainVisitor();
    try {
        visitor.visit(tree);
    } catch (err) {
        console.log('got error', err);
    }

    const { sequence } = visitor.getGraph();
    const graph = prepareLayout(sequence);

    const elkOutput = await generateLayout(graph);

    generateSVG(elkOutput, 'output.svg');
}

async function readFile(fileName: string): Promise<string> {
    return new Promise((resolve) => {
        fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            resolve(data);
        });
    });
}

if (require.main === module) {
    main();
}
