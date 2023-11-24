import CircuitScriptParser from '../src/antlr/CircuitScriptParser';
import CircuitScriptLexer from '../src/antlr/CircuitScriptLexer';

import { CharStream, CommonTokenStream } from 'antlr4';
import { MainVisitor } from '../src/visitor';
import { ComponentPinNet } from '../src/objects/types';

export async function runScript(script: string): Promise<[result: boolean, ComponentPinNet[], visitor: MainVisitor]> {
    const chars = new CharStream(script);
    const lexer = new CircuitScriptLexer(chars);
    const tokens = new CommonTokenStream(lexer);

    const parser = new CircuitScriptParser(tokens);
    const tree = parser.script();

    const visitor = new MainVisitor(true);

    try {
        visitor.visit(tree);
        return [true, visitor.dumpNets(), visitor];

    } catch (err) {
        console.log('got error', err);
        return [false, null, null];
    }
}
