import fs from 'fs';
import CircuitScriptParser from './antlr/CircuitScriptParser.js';
import CircuitScriptLexer from './antlr/CircuitScriptLexer.js';

import { CharStream, CommonTokenStream } from 'antlr4';
import { MainVisitor } from './visitor.js';

export default function main(): void {

    const fileName = 'examples/example.cst';

    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }

        const chars = new CharStream(data);
        const lexer = new CircuitScriptLexer(chars);
        const tokens = new CommonTokenStream(lexer);

        const parser = new CircuitScriptParser(tokens);
        const tree = parser.script();

        console.log(tree.toStringTree(null, parser));
        
        const visitor = new MainVisitor();
        try {
            visitor.visit(tree);
        } catch (err) {
            console.log("got error", err);
        }
    });

    // const component = new Component("helloWorld", 100);
    // console.log(component + '');
}

main();