import path from 'path';
import fs from 'fs';

import CircuitScriptParser from '../src/antlr/CircuitScriptParser';

import { CharStream, CommonTokenStream } from 'antlr4';
import { MainVisitor } from '../src/visitor';
import { ComponentPinNet } from '../src/objects/types';
import { CircuitscriptParserErrorListener, parseFileWithVisitor } from '../src/parser';
import { ClassComponent } from '../src/objects/Component';
import { MainLexer } from '../src/lexer';


export async function runScript(script: string): Promise<{visitor: MainVisitor, 
    hasError: boolean, 
    componentPinNets:ComponentPinNet[]}> {
    
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

    const visitor = new MainVisitor(true);
    visitor.onImportFile = (visitor: MainVisitor, importPath: string): { hasError: boolean, hasParseError: boolean } => {
        const currentDirectory = path.dirname(scriptPath);

        // Check if different files exist first
        const tmpFilePath = path.join(currentDirectory, importPath + ".cst");
        visitor.print('importing path:', tmpFilePath);

        const fileData = fs.readFileSync(tmpFilePath, { encoding: 'utf8' });
        const { hasError, hasParseError, timeTaken } =
            parseFileWithVisitor(visitor, fileData);

        return { hasError, hasParseError };
    }

    let hasError = false;
    try {
        visitor.visit(tree);
    } catch (err) {
        hasError = true;
        console.log('got error:', err);
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