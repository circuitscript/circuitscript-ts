import { dirname } from 'path';

import CircuitScriptParser from '../src/antlr/CircuitScriptParser.js';

import { CharStream, CommonTokenStream } from 'antlr4';
import { MainVisitor } from '../src/visitor.js';
import { ComponentPinNet } from '../src/objects/types.js';
import { CircuitscriptParserErrorListener } from '../src/parser.js';
import { ClassComponent } from '../src/objects/ClassComponent.js';
import { MainLexer } from '../src/lexer.js';


export async function runScript(script: string): Promise<{
    visitor: MainVisitor,
    hasError: boolean,
    componentPinNets: ComponentPinNet[]
}> {

    const chars = new CharStream(script);
    const lexer = new MainLexer(chars);
    const tokens = new CommonTokenStream(lexer);

    const parser = new CircuitScriptParser(tokens);
    // Clear any existing error listeners and use the custom one only
    parser.removeErrorListeners();

    const errorListener = new CircuitscriptParserErrorListener();
    parser.addErrorListener(errorListener);

    const tree = parser.script();

    const scriptPath = "./examples/helpers.ts";
    const defaultLibsPath = "./libs";

    const visitor = new MainVisitor(true);
    visitor.printToConsole = false; // do not clutter the console log

    const currentDirectory = dirname(scriptPath);
    visitor.onImportFile = visitor.createImportFileHandler(currentDirectory, defaultLibsPath);

    let hasError = false;
    try {
        visitor.visit(tree);
    } catch (err) {
        // Error should be internally handled in visitor
        err.print(script);
        hasError = true;
    }

    hasError = hasError || errorListener.hasParseErrors();

    return {
        visitor, hasError,
        componentPinNets: visitor.dumpNets(),
    }
}

export function findItem(instances: Map<string, ClassComponent>, typeProp: string,
    refdes: string, value: string): ClassComponent | null {

    for (const [, instance] of instances) {
        if (instance.typeProp === typeProp && instance.assignedRefDes === refdes) {
            if (instance.parameters.get('value').toString() === value) {
                return instance;
            }
        }
    }

    return null;
}