/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { readFileSync, writeFileSync, createWriteStream, 
    existsSync, mkdirSync } from "fs";
import path from "path";

import PDFDocument from "pdfkit";

import { generateKiCADNetList, printTree } from "./export.js";
import { LayoutEngine } from "./layout.js";
import { SequenceAction } from "./objects/ExecutionScope.js";
import { parseFileWithVisitor } from "./parser.js";
import { generatePdfOutput, generateSvgOutput, renderSheetsToSVG } from "./render.js";
import { resolveToNumericValue, sequenceActionString, SimpleStopwatch } from "./utils.js";
import { ParserVisitor, VisitorExecutionException } from "./visitor.js";
import { createContext } from "this-file";
import { SymbolValidatorResolveVisitor, SymbolValidatorVisitor } from "./SymbolValidatorVisitor.js";
import { ATNSimulator, BaseErrorListener, CharStream, CommonTokenStream, DefaultErrorStrategy, Parser, RecognitionException, Recognizer, Token } from "antlr4ng";
import { MainLexer } from "./lexer.js";
import { CircuitScriptParser } from "./antlr/CircuitScriptParser.js";
import { BaseVisitor, OnErrorCallback } from "./BaseVisitor.js";
import { CircuitScriptLexer } from "./antlr/CircuitScriptLexer.js";
import { IParsedToken, prepareTokens, SemanticTokensVisitor } from "./SemanticTokenVisitor.js";
import { defaultPageMarginMM, defaultZoomScale, LengthUnit, MilsToMM, PxToMM } from "./globals.js";
import { FrameParamKeys } from "./objects/Frame.js";
import { NumericValue } from "./objects/ParamDefinition.js";
import Big from "big.js";
import { Logger } from "./logger.js";

export enum JSModuleType {
    CommonJs = 'cjs',
    ESM = 'mjs',
}

export type ScriptOptions = {
    currentDirectory: string | null, 
    defaultLibsPath: string,
    dumpNets: boolean,
    dumpData: boolean,
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
        nets.forEach((item, index: number) => {
            console.log(index, item.join(" | "));
        });
        // console.log(nets);
    }

    const dumpDirectory = currentDirectory + '/dump/';

    if (dumpData) {
        if (!existsSync(dumpDirectory)) {
            mkdirSync(dumpDirectory);
        }
    }

    dumpData && writeFileSync(dumpDirectory + 'tree.lisp', tree.toStringTree(null, parser));
    dumpData && writeFileSync(dumpDirectory + 'raw-parser.txt', visitor.logger.dump());

    if (hasError || hasParseError) {
        console.log('Error while parsing');
        return null;
    }

    const { frameComponent } = visitor.applySheetFrameComponent();

    try {
        visitor.annotateComponents();
    } catch (err) {
        console.log('Error during annotation: ', err);
    }

    // await writeFile('dump/raw-netlist.json', JSON.stringify(visitor.dump2(), null, 2));

    const { sequence, nets } = visitor.getGraph();

    // const tmpInstances = visitor.getExecutor().scope.instances;
    // for (const [instanceName, instance] of tmpInstances){
    //     console.log(instanceName);
    //     console.log(instance.pinNets);
    // }

    const tmpSequence = sequence.map(item => sequenceActionString(item));
    
    dumpData && writeFileSync(dumpDirectory + 'raw-sequence.txt', tmpSequence.join('\n'));

    let svgOutput = "";

    try {
        let fileExtension: string | null = null;
        let outputDefaultZoom = defaultZoomScale;

        if (outputPath) {
            fileExtension = path.extname(outputPath).substring(1);

            if (fileExtension === "pdf") {
                outputDefaultZoom = 1;
            }
        }

        if (fileExtension === 'net') {
            // Generate the kicad net list
            const { tree: kicadNetList, missingFootprints }
                = generateKiCADNetList(visitor.getNetList());

            missingFootprints.forEach(entry => {
                console.log(
                    `${entry.refdes} (${entry.instanceName}) does not have footprint`);
            });

            writeFileSync(outputPath, printTree(kicadNetList));
            console.log('Generated file', outputPath);

            // Quit here, since SVG output is not needed
            return null;
        }

        const layoutEngine = new LayoutEngine();
        const layoutTimer = new SimpleStopwatch();

        const sheetFrames = layoutEngine.runLayout(sequence, nets);

        layoutEngine.printWarnings();

        showStats && console.log('Layout took:', layoutTimer.lap());

        dumpData && writeFileSync(dumpDirectory + 'raw-layout.txt', layoutEngine.logger.dump());

        const generateSvgTimer = new SimpleStopwatch();

        const renderLogger = new Logger();
        const svgCanvas = renderSheetsToSVG(sheetFrames, renderLogger);

        showStats && console.log('Render took:', generateSvgTimer.lap());

        dumpData && writeFileSync(dumpDirectory + 'raw-render.txt', renderLogger.dump());

        svgOutput = generateSvgOutput(svgCanvas, outputDefaultZoom);

        if (outputPath) {
            if (fileExtension === 'svg') {
                writeFileSync(outputPath, svgOutput);

            } else if (fileExtension === 'pdf') {

                let sheetSize = "A4";
                let sheetSizeDefined = false;
                if (frameComponent) {
                    sheetSize = frameComponent.getParam(FrameParamKeys.PaperSize);
                    sheetSizeDefined = true;
                }

                const doc = new PDFDocument({
                    layout: 'landscape',
                    size: sheetSize
                });
                const outputStream = createWriteStream(outputPath);

                generatePdfOutput(doc, svgCanvas,
                    sheetSize, sheetSizeDefined, outputDefaultZoom);

                doc.pipe(outputStream);
                doc.end();
            } else {
                throw "Invalid output format";
            }
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

export function milsToMM(value: NumericValue | number): NumericValue {
    if (typeof value === 'number'){
        value = resolveToNumericValue(new Big(value));
    }

    return resolveToNumericValue(
        value.toBigNumber().mul(new Big(MilsToMM)).round(6)
    );
}

export function pxToMM(value: number): number {
    return value * PxToMM;
}

// Portrait
const PaperSizes: { [key: string]: [width: number, height: number] } = {
    'A0': [1189, 841],
    'A1': [841, 594],
    'A2': [594, 420],
    'A3': [420, 297],
    'A4': [297, 210],
    'A5': [210, 148],
    'A6': [148, 105],
}

export const PaperGridReferences: { [key: string]: [rows: number, columns: number] } = {
    'A0': [16, 24],
    'A1': [12, 16],
    'A2': [8, 12],
    'A3': [6, 8],
    'A4': [4, 6],
};

export function isSupportedPaperSize(type: string): boolean {
    if (PaperSizes[type]) {
        return true;
    }
    return false;
}

export function getPaperSize(type: string, margin = defaultPageMarginMM): {
    width: number, height: number,
    widthMM: number, heightMM: number,
    originalWidthMM: number, originalHeightMM: number
} {

    if (PaperSizes[type]) {
        const [width, height] = PaperSizes[type];

        // Margin is in mm
        const useWidth = width - margin * 2;
        const useHeight = height - margin * 2;

        return {
            // Mils
            width: Math.floor(useWidth * (1 / MilsToMM)),
            height: Math.floor(useHeight * (1 / MilsToMM)),

            widthMM: useWidth,
            heightMM: useHeight,
            originalWidthMM: width,
            originalHeightMM: height,
        }
    } else {
        return getPaperSize('A4'); // default
    }
}