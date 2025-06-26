import { readFileSync } from 'fs';
import { dirname } from 'path';

import { CircuitScriptParser } from '../src/antlr/CircuitScriptParser.js';

import { ParserVisitor, VisitorExecutionException } from '../src/visitor.js';
import { ComponentPinNet } from '../src/objects/types.js';
import { CircuitscriptParserErrorListener, parseFileWithVisitor } from '../src/parser.js';
import { ClassComponent } from '../src/objects/ClassComponent.js';
import { MainLexer } from '../src/lexer.js';
import { CharStream, CommonTokenStream } from 'antlr4ng';
import { BaseVisitor, OnErrorCallback } from '../src/BaseVisitor.js';
import { validateScript } from '../src/helpers.js';
import { SymbolValidatorVisitor } from '../src/SymbolValidatorVisitor.js';

export async function runScript(script: string): Promise<{
    visitor: ParserVisitor,
    hasError: boolean,
    componentPinNets: ComponentPinNet[]
}> {

    const chars = CharStream.fromString(script);
    const lexer = new MainLexer(chars);
    const tokens = new CommonTokenStream(lexer);

    const scriptPath = "./examples/helpers.ts";
    const defaultLibsPath = "./libs";

    const currentDirectory = dirname(scriptPath);

    const onErrorHandler: OnErrorCallback =
    (line: number, column: number, message: string, error: any) => {
        if (error instanceof VisitorExecutionException) {
            console.log('Error', line, column, message, error.errorMessage);
        }
    };

    const visitor = new ParserVisitor(true, onErrorHandler, currentDirectory, defaultLibsPath);
    visitor.printToConsole = false; // do not clutter the console log

    const parser = new CircuitScriptParser(tokens);
    // Clear any existing error listeners and use the custom one only
    parser.removeErrorListeners();

    const errorListener = new CircuitscriptParserErrorListener(
        visitor.onErrorCallbackHandler
    );

    parser.addErrorListener(errorListener);

    const tree = parser.script();

    visitor.onImportFile = (visitor: BaseVisitor, fileData: string,
        errorHandler: OnErrorCallback): { hasError: boolean, hasParseError: boolean } => {
        const { hasError, hasParseError } = parseFileWithVisitor(visitor, fileData);
        return { hasError, hasParseError };
    }


    let hasError = false;
    try {
        visitor.visit(tree);
    } catch (err) {
        // Error should be internally handled in visitor
        console.log(err);
        hasError = true;
    }

    hasError = hasError || errorListener.hasSyntaxErrors();

    return {
        visitor, hasError,
        componentPinNets: visitor.dumpNets(),
    }
}

export function testValidateScript(scriptData: string): SymbolValidatorVisitor {
    const scriptPath = "./examples/";
    const defaultLibsPath = "./libs";
    const currentDirectory = dirname(scriptPath);

    return validateScript(
        scriptData,
        {
            currentDirectory,
            defaultLibsPath
        }
    );
}

export function findItem(instances: Map<string, ClassComponent>, typeProp: string,
    refdes: string, value: string): ClassComponent | null {
    // Find matching item by refdes and by value parameter

    for (const [, instance] of instances) {
        if (instance.typeProp === typeProp && instance.assignedRefDes === refdes) {
            if (instance.parameters.get('value').toString() === value) {
                return instance;
            }
        }
    }

    return null;
}

export function findItemByRefDes(instances: Map<string, ClassComponent>, typeProp: string,
    refdes: string): ClassComponent | null {
    for (const [, instance] of instances) {
        if (instance.typeProp === typeProp && instance.assignedRefDes === refdes) {
            return instance;
        }
    }

    return null;
}

export function loadScriptFromFile(filePath: string): string {
    return readFileSync(filePath).toString();
}

export function loadRawNetFromFile(filePath: string): string {
    return readFileSync(filePath).toString();
}

export class ScriptTest<T> {

    script: string;
    expected: T[];

    constructor(script: string, expected: string | T[]) {
        this.script = script;

        if (typeof expected == "string") {
            expected = parseNets(expected);
        }

        this.expected = expected;
    }
}

export function parseNets(stringValue: string): [string, string, number][] {
    stringValue = stringValue.trim();
    const result = stringValue.split("\n").map(line => {
        line = line.split('|').map(item => item.trim());
        line[2] = Number(line[2]);
        return line;
    });

    return result;
}


export function createParseTest(rootFolder: string, scriptName: string): ScriptTest<ComponentPinNet> {
    return new ScriptTest<ComponentPinNet>(
        loadScriptFromFile(`${rootFolder}/${scriptName}.cst`),
        loadRawNetFromFile(`${rootFolder}/nets/${scriptName}.cst.net`)
    );
}