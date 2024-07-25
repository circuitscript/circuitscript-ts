import { readFileSync, writeFileSync } from "fs";

import { generateKiCADNetList } from "./export.js";
import { LayoutEngine } from "./layout.js";
import { SequenceAction } from "./objects/ExecutionScope.js";
import { parseFileWithVisitor } from "./parser.js";
import { generateSVG2 } from "./render.js";
import { SimpleStopwatch } from "./utils.js";
import { ParserVisitor, VisitorExecutionException } from "./visitor.js";
import { createContext } from "this-file";
import { SymbolValidatorResolveVisitor, SymbolValidatorVisitor } from "./SymbolValidatorVisitor.js";
import { CharStream, CommonTokenStream } from "antlr4ng";
import { MainLexer } from "./lexer.js";
import { CircuitScriptParser } from "./antlr/CircuitScriptParser.js";
import { BaseVisitor, OnErrorCallback } from "./BaseVisitor.js";
import { CircuitScriptLexer } from "./antlr/CircuitScriptLexer.js";
import { IParsedToken, prepareTokens, SemanticTokensVisitor } from "./SemanticTokenVisitor.js";

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

    // finalParsedTokens.forEach(item => {
    //     console.log(item.line.toString().padEnd(5), 
    //         item.column.toString().padEnd(5), 
    //         item.textValue.padEnd(10), 
    //         item.tokenType, item.tokenModifiers)
    // });

    // writeFileSync('dump/tree.lisp', tree.toStringTree(null, parser));

    return {
        visitor,
        parsedTokens: finalParsedTokens
    };
}

export function validateScript(scriptData: string,
    options: ScriptOptions): SymbolValidatorVisitor {

    const { parser } = prepareFile(scriptData);
    const tree = parser.script();

    const {
        currentDirectory = null,
        defaultLibsPath,
    } = options;

    const visitor = new SymbolValidatorVisitor(true, null, currentDirectory, defaultLibsPath);

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
    // writeFileSync('dump/raw-parser.txt', visitor.logger.dump());

    const symbolTable = visitor.getSymbols();
    symbolTable.clearUndefined();

    const visitorResolver = new SymbolValidatorResolveVisitor(
        true, null, currentDirectory, defaultLibsPath);

    // Use the existing symbol tree as the starting point
    visitorResolver.setSymbols(visitor.getSymbols());
    
    visitorResolver.onImportFile = visitor.onImportFile;

    // Second pass to resolve variables, functions
    visitorResolver.visit(tree);

    // writeFileSync('dump/raw-parser-2.txt', visitorResolver.logger.dump());

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
    dumpNets && console.log(visitor.dumpNets());

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
        const kicadNetList = generateKiCADNetList(visitor.getNetList());
        writeFileSync(kicadNetlistPath, kicadNetList);
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