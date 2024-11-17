/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { readFileSync, writeFileSync } from "fs";

import { generateKiCADNetList, printTree } from "./export.js";
import { LayoutEngine } from "./layout.js";
import { SequenceAction } from "./objects/ExecutionScope.js";
import { parseFileWithVisitor } from "./parser.js";
import { generateSVG2 } from "./render.js";
import { SimpleStopwatch } from "./utils.js";
import { ParserVisitor, VisitorExecutionException } from "./visitor.js";
import { createContext } from "this-file";
import { SymbolValidatorResolveVisitor, SymbolValidatorVisitor } from "./SymbolValidatorVisitor.js";
import { ATNSimulator, BaseErrorListener, CharStream, CommonTokenStream, DefaultErrorStrategy, Parser, RecognitionException, Recognizer, Token } from "antlr4ng";
import { MainLexer } from "./lexer.js";
import { CircuitScriptParser } from "./antlr/CircuitScriptParser.js";
import { BaseVisitor, OnErrorCallback } from "./BaseVisitor.js";
import { CircuitScriptLexer } from "./antlr/CircuitScriptLexer.js";
import { IParsedToken, prepareTokens, SemanticTokensVisitor } from "./SemanticTokenVisitor.js";
import path from "path";
import { LengthUnit, MilsToMM, PxToMM } from "./globals.js";

export enum JSModuleType {
    CommonJs = 'cjs',
    ESM = 'mjs',
}

export type ScriptOptions = {
    currentDirectory: string | null, 
    defaultLibsPath: string,
    dumpNets: boolean,
    dumpData: boolean,
    kicadNetlistPath: string| null, 
    showStats: boolean,
};

export function prepareFile(textData: string): {
    parser: CircuitScriptParser,
    lexer: CircuitScriptLexer,
    lexerTimeTaken: number,
    tokens: CommonTokenStream,
} {
    const chars = CharStream.fromString(textData);
    const lexer = new MainLexer(chars);

    const lexerTimer = new SimpleStopwatch();
    const tokens = new CommonTokenStream(lexer);
    tokens.fill();

    const lexerTimeTaken = lexerTimer.lap();
    const parser = new CircuitScriptParser(tokens);

    return {
        parser,
        lexer,
        lexerTimeTaken,
        tokens
    };
}

export function getScriptText(filePath: string): string | null {
    try {
        return readFileSync(filePath, { encoding: 'utf-8' });
    } catch (err) {
        // File does not exist
        return null;
    }
}

export function getSemanticTokens(scriptData: string, options: ScriptOptions)
    : { visitor: SemanticTokensVisitor, parsedTokens: IParsedToken[] } {
    
    const { parser, lexer, tokens } = prepareFile(scriptData);
    const tree = parser.script();

    const {
        currentDirectory = null,
        defaultLibsPath,
    } = options;

    const visitor = new SemanticTokensVisitor(true, null,
        currentDirectory, defaultLibsPath,
        lexer, scriptData,
    );

    parser.removeErrorListeners();

    visitor.onImportFile = (visitor: BaseVisitor, textData: string)
        : { hasError: boolean, hasParseError: boolean } => {

        let hasError = false;
        let hasParseError = false;

        if (textData !== null) {
            const { parser } = prepareFile(textData);
            const tree = parser.script();

            try {
                visitor.visit(tree);
            } catch (err) {
                console.log('Error while parsing: ', err);
                hasParseError = true;
                hasError = true;
            }
        } else {
            console.log('File does not exist');
            hasError = true;
        }

        return {
            hasError, hasParseError
        }
    }

    visitor.visit(tree);

    const semanticTokens = visitor.getTokens();

    // Get all tokens
    const parsedTokens = prepareTokens(tokens.getTokens(), lexer, scriptData);
    const finalParsedTokens:IParsedToken[] = [];
    parsedTokens.forEach(token => {
        const location = `${token.line}_${token.column}`;
        if (semanticTokens.has(location)){
            finalParsedTokens.push(
                semanticTokens.get(location)!);
        } else{
            finalParsedTokens.push(token);
        }
    });

    return {
        visitor,
        parsedTokens: finalParsedTokens
    };
}

class TokenErrorListener extends BaseErrorListener {

    syntaxError<S extends Token, T extends ATNSimulator>(
        recognizer: Recognizer<T>, 
        offendingSymbol: S | null, 
        line: number, column: number, msg: string, 
        e: RecognitionException | null): void {
        console.log(msg);
    }

}

export class ParseErrorStrategy extends DefaultErrorStrategy {

    reportUnwantedToken(recognizer: Parser): void {
        if (this.inErrorRecoveryMode(recognizer)) {
            return;
        }

        this.beginErrorCondition(recognizer);
        
        const t = recognizer.getCurrentToken();
        const tokenName = this.getTokenErrorDisplay(t);
        const msg = "extraneous input " + tokenName;
        recognizer.notifyErrorListeners(msg, t, null);

        this.endErrorCondition(recognizer);
    }
}

export function validateScript(scriptData: string,
    options: ScriptOptions): SymbolValidatorVisitor {

    const { parser } = prepareFile(scriptData);
    parser.removeErrorListeners();

    parser.errorHandler = new ParseErrorStrategy();
    parser.addErrorListener(new TokenErrorListener());

    const tree = parser.script();

    const {
        currentDirectory = null,
        defaultLibsPath,
    } = options;

    const visitor = new SymbolValidatorVisitor(true, null, 
        currentDirectory, defaultLibsPath);

    visitor.onImportFile = (visitor: BaseVisitor, textData: string)
        : { hasError: boolean, hasParseError: boolean } => {

        let hasError = false;
        let hasParseError = false;

        if (textData !== null) {
            const { parser } = prepareFile(textData);
            const tree = parser.script();

            try {
                visitor.visit(tree);
            } catch (err) {
                console.log('got an error while parsing tree: ', err);
                hasParseError = true;
                hasError = true;
            }
        } else {
            console.log('file does not exist!');
            hasError = true;
        }

        return {
            hasError, hasParseError
        }
    }

    // First pass defines variables, functions
    visitor.visit(tree);
    
    const symbolTable = visitor.getSymbols();
    symbolTable.clearUndefined();

    const visitorResolver = new SymbolValidatorResolveVisitor(
        true, null, currentDirectory, defaultLibsPath);

    // Use the existing symbol tree as the starting point
    visitorResolver.setSymbols(visitor.getSymbols());
    
    visitorResolver.onImportFile = visitor.onImportFile;

    // Second pass to resolve variables, functions
    visitorResolver.visit(tree);
    
    return visitorResolver;
}

export function renderScript(scriptData: string, outputPath: string,
    options: ScriptOptions): string | null {

    const {
        currentDirectory = null,
        defaultLibsPath,
        dumpNets = false,
        dumpData = false,
        kicadNetlistPath = null,
        showStats = false } = options;

    const onErrorHandler: OnErrorCallback =
        (line: number, column: number, message: string, error: any) => {
            if (error instanceof VisitorExecutionException) {
                console.log('Error', line, column, message, error.errorMessage);
            }
        };

    const visitor = new ParserVisitor(
        true, onErrorHandler, currentDirectory, defaultLibsPath);

    visitor.onImportFile = (visitor: BaseVisitor, fileData: string)
        : { hasError: boolean, hasParseError: boolean } => {

        const { hasError, hasParseError } = parseFileWithVisitor(visitor, fileData);
        return { hasError, hasParseError };
    }

    visitor.log('reading file');
    visitor.log('done reading file');

    const { tree, parser,
        hasParseError, hasError, 
        parserTimeTaken, 
        lexerTimeTaken } = parseFileWithVisitor(visitor, scriptData);

    showStats && console.log('Lexing took:', lexerTimeTaken);
    showStats && console.log('Parsing took:', parserTimeTaken);

    if (dumpNets) {
        const nets = visitor.dumpNets();
        // nets.forEach((item, index: number) => {
        //     console.log(index, item.join(" | "));
        // });
        console.log(nets);
    }

    dumpData && writeFileSync('dump/tree.lisp', tree.toStringTree(null, parser));
    dumpData && writeFileSync('dump/raw-parser.txt', visitor.logger.dump());

    if (hasError || hasParseError) {
        console.log('Error while parsing');
        return null;
    }

    try {
        visitor.annotateComponents();
    } catch (err) {
        console.log('Error during annotation: ', err);
    }

    if (kicadNetlistPath) {
        const { tree: kicadNetList, missingFootprints }
            = generateKiCADNetList(visitor.getNetList());

        missingFootprints.forEach(entry => {
            console.log(
                `${entry.refdes} (${entry.instanceName}) does not have footprint`);
        });

        writeFileSync(kicadNetlistPath, printTree(kicadNetList));
        console.log('Generated KiCad netlist file');
    }

    // await writeFile('dump/raw-netlist.json', JSON.stringify(visitor.dump2(), null, 2));

    const { sequence, nets } = visitor.getGraph();

    // const tmpInstances = visitor.getExecutor().scope.instances;
    // for (const [instanceName, instance] of tmpInstances){
    //     console.log(instanceName);
    //     console.log(instance.pinNets);
    // }

    const tmpSequence = sequence.map(item => {
        const tmp = [...item];

        const action = tmp[0];

        if (action === SequenceAction.Wire) {
            tmp[2] = tmp[2].map(item2 => {
                return [item2.direction, item2.value].join(",");
            }).join(" ");
        } else if (action === SequenceAction.Frame) {
            tmp[1] = item[1].frameId;
            
        } else if (action !== SequenceAction.WireJump) {
            tmp[1] = item[1].instanceName;
        }

        return tmp.join(" | ");
    });

    dumpData && writeFileSync('dump/raw-sequence.txt', tmpSequence.join('\n'));
    let svgOutput: string | null = null;

    try {
        const layoutEngine = new LayoutEngine();
        const layoutTimer = new SimpleStopwatch();

        const graph = layoutEngine.runLayout(sequence, nets);

        layoutEngine.printWarnings();

        showStats && console.log('Layout took:', layoutTimer.lap());

        dumpData && writeFileSync('dump/raw-layout.txt', layoutEngine.logger.dump());

        const generateSvgTimer = new SimpleStopwatch();
        svgOutput = generateSVG2(graph);
        showStats && console.log('Render took:', generateSvgTimer.lap());

        if (outputPath) {
            writeFileSync(outputPath, svgOutput);
            console.log('Generated file', outputPath);
        }
    } catch (err) {
        console.log('Error during render: ', err);
    }

    return svgOutput;
}

export function detectJSModuleType(): JSModuleType {
    if (typeof __filename === 'undefined' && 
            typeof __dirname === 'undefined'
    ){
        return JSModuleType.ESM;
    } else {
        return JSModuleType.CommonJs;
    }
}

const context = createContext();

export function getCurrentPath(): { filePath: string } {
    const filename = context.filename;
    return { filePath: filename };
}

function getToolsPath(): string {
    const { filePath } = getCurrentPath();
    return path.normalize(path.dirname(filePath) + '/../../');
}

export function getFontsPath(): string {
    const toolsPath = getToolsPath();
    return path.normalize(toolsPath + "fonts");
}

export function getDefaultLibsPath(): string {
    const toolsPath = getToolsPath();
    return path.normalize(toolsPath + "libs");
}

export function getPackageVersion(): string {
    const packageJson = JSON.parse(
        readFileSync(getToolsPath() + 'package.json').toString());
    const {version} = packageJson;
    return version;
}

export class UnitDimension {
    type: LengthUnit;
    value: number;

    constructor(value: number, type = LengthUnit.mils) {
        this.value = value;
        this.type = type;
    }

    getMM(): number {
        switch(this.type){
            case LengthUnit.mm:
                return this.value;
            case LengthUnit.mils:
                return this.value * MilsToMM;
            case LengthUnit.px:
                return this.value * PxToMM;
        }
    }

    static mm(value: number): UnitDimension {
        return new UnitDimension(value, LengthUnit.mm);
    }

    static mils(value: number): UnitDimension {
        return new UnitDimension(value, LengthUnit.mils);
    }

    static px(value: number): UnitDimension {
        return new UnitDimension(value, LengthUnit.px);
    }
}

export function milsToMM(value: number): number {
    return value * MilsToMM;
}