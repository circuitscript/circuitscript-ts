import path from 'path';
import fs from 'fs';

import CircuitScriptParser from '../src/antlr/CircuitScriptParser';
import CircuitScriptLexer from '../src/antlr/CircuitScriptLexer';

import { CharStream, CommonTokenStream } from 'antlr4';
import { MainVisitor } from '../src/visitor';
import { ComponentPinNet } from '../src/objects/types';
import { parseFileWithVisitor } from '../src/parser';
import { ClassComponent } from '../src/objects/Component';


export async function runScript(script: string): Promise<[result: boolean, ComponentPinNet[], visitor: MainVisitor]> {
    const chars = new CharStream(script);
    const lexer = new CircuitScriptLexer(chars);
    const tokens = new CommonTokenStream(lexer);

    const parser = new CircuitScriptParser(tokens);
    const tree = parser.script();

    const scriptPath = "./examples/helpers.ts";

    const visitor = new MainVisitor(true);
    visitor.onImportFile = (visitor: MainVisitor, importPath: string): void => {
        const currentDirectory = path.dirname(scriptPath);

        // Check if different files exist first
        const tmpFilePath = path.join(currentDirectory, importPath + ".cst");
        visitor.print('importing path:', tmpFilePath);

        const fileData = fs.readFileSync(tmpFilePath, { encoding: 'utf8' });
        const { hasError, hasParseError, timeTaken } =
            parseFileWithVisitor(visitor, fileData);
    }

    try {
        visitor.visit(tree);
        return [true, visitor.dumpNets(), visitor];

    } catch (err) {
        console.log('got error:', err);
        return [false, null, null];
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