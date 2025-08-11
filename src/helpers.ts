/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { readFileSync, writeFileSync, createWriteStream, 
    existsSync, mkdirSync, 
    PathOrFileDescriptor,
    PathLike} from "fs";
import path from "path";

import PDFDocument from "pdfkit";

import { Dom, SVG, registerWindow } from '@svgdotjs/svg.js';

import { generateKiCADNetList, printTree } from "./export.js";
import { LayoutEngine } from "./layout.js";
import { parseFileWithVisitor } from "./parser.js";
import { generatePdfOutput, generateSvgOutput, renderSheetsToSVG } from "./render.js";
import { BaseError, generateDebugSequenceAction, ParseError, ParseSyntaxError, RenderError, resolveToNumericValue, RuntimeExecutionError, sequenceActionString, SimpleStopwatch } from "./utils.js";
import { ParserVisitor } from "./visitor.js";
import { ParserRuleContext } from "antlr4ng";
import { SymbolValidatorVisitor } from "./validate/SymbolValidatorVisitor.js";
import { SymbolValidatorResolveVisitor } from "./validate/SymbolValidatorResolveVisitor.js";
import { ATNSimulator, BaseErrorListener, CharStream, CommonTokenStream, DefaultErrorStrategy, Parser, RecognitionException, Recognizer, Token } from "antlr4ng";
import { MainLexer } from "./lexer.js";
import { CircuitScriptParser } from "./antlr/CircuitScriptParser.js";
import { BaseVisitor, OnErrorHandler } from "./BaseVisitor.js";
import { CircuitScriptLexer } from "./antlr/CircuitScriptLexer.js";
import { IParsedToken, prepareTokens, SemanticTokensVisitor } from "./SemanticTokenVisitor.js";
import { defaultPageMarginMM, defaultZoomScale, LengthUnit, MilsToMM, PxToMM, TOOL_VERSION } from "./globals.js";

// Dynamic type definition for svgdom since it's ESM-only
type SVGWindow = any;
import { FrameParamKeys } from "./objects/Frame.js";
import { NumericValue } from "./objects/ParamDefinition.js";
import Big from "big.js";
import { Logger } from "./logger.js";

export enum JSModuleType {
    CommonJs = 'cjs',
    ESM = 'mjs',
}

export type ScriptOptions = {
    dumpNets: boolean,
    dumpData: boolean,
    showStats: boolean,

    environment: NodeScriptEnvironment,
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

export function getSemanticTokens(scriptData: string, options: ScriptOptions)
    : { visitor: SemanticTokensVisitor, parsedTokens: IParsedToken[] } {
    
    const { parser, lexer, tokens } = prepareFile(scriptData);
    const tree = parser.script();

    const visitor = new SemanticTokensVisitor(true, null,
        options.environment,
        lexer, scriptData,
    );

    parser.removeErrorListeners();

    visitor.onImportFile = (visitor: BaseVisitor, filePath: string, textData: string)
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
                throw new ParseError(`Error parsing semantic tokens in imported file: ${err}`);
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

export function validateScript(filePath: string, scriptData: string,
    options: ScriptOptions): SymbolValidatorVisitor {

    const { parser } = prepareFile(scriptData);
    parser.removeErrorListeners();

    parser.errorHandler = new ParseErrorStrategy();
    parser.addErrorListener(new TokenErrorListener());

    const tree = parser.script();

    const visitor = new SymbolValidatorVisitor(true, null, 
        options.environment);

    visitor.enterFile(filePath);

    visitor.onImportFile = (visitor: SymbolValidatorVisitor, filePath: string, textData: string)
        : { hasError: boolean, hasParseError: boolean } => {

        visitor.enterFile(filePath);

        let hasError = false;
        let hasParseError = false;

        if (textData !== null) {
            const { parser } = prepareFile(textData);
            const tree = parser.script();

            try {
                visitor.visit(tree);
                visitor.exitFile();
                
            } catch (err) {
                console.log('got an error while parsing tree: ', err);
                hasParseError = true;
                hasError = true;
                throw new ParseError(`Error parsing validation in imported file: ${err}`);
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
        true, null, options.environment);
    visitorResolver.enterFile(filePath);

    // Use the existing symbol tree as the starting point
    visitorResolver.setSymbols(visitor.getSymbols());
    
    visitorResolver.onImportFile = visitor.onImportFile;

    // Second pass to resolve variables, functions
    visitorResolver.visit(tree);
    
    return visitorResolver;
}

export function renderScript(scriptData: string, outputPath: string | null,
    options: ScriptOptions): {
        svgOutput: string | null,
        errors: BaseError[]
    } {

    const {
        dumpNets = false,
        dumpData = false,
        showStats = false,
        environment
    } = options;
    
    const errors: BaseError[] = [];
    const onErrorHandler: OnErrorHandler =
        (message: string, context: ParserRuleContext, error?: any) => {
            if (error && error instanceof RuntimeExecutionError) {
                errors.push(error);
            } else if (error && error instanceof RecognitionException) {
                errors.push(new ParseSyntaxError(message, context.start!, context.stop!));
            } else {
                errors.push(new ParseError(message, context.start!, context.stop!));
            }
        };

    const visitor = new ParserVisitor(true, 
        onErrorHandler, options.environment);

    visitor.onImportFile = (visitor: BaseVisitor, filePath:string, fileData: string)
        : { hasError: boolean, hasParseError: boolean } => {

        const { hasError, hasParseError } = parseFileWithVisitor(visitor, fileData);
        
        // Raise exception if there are errors in imported files
        if (hasError || hasParseError) {
            throw new ParseError(`Error parsing imported file: ${filePath}`, undefined, undefined, filePath);
        }
        
        return { hasError, hasParseError };
    }

    visitor.log('reading file');
    visitor.log('done reading file');

    const { tree, parser,
        parserTimeTaken, 
        lexerTimeTaken } = parseFileWithVisitor(visitor, scriptData);

    showStats && console.log('Lexing took:', lexerTimeTaken);
    showStats && console.log('Parsing took:', parserTimeTaken);

    if (dumpNets) {
        const nets = visitor.dumpNets();
        nets.forEach(item => console.log(item.join(" | ")));
    }

    const dumpDirectory = environment.getRelativeToModule('/dump/');

    if (dumpData) {
        if (!existsSync(dumpDirectory)) {
            mkdirSync(dumpDirectory);
        }
    }

    dumpData && writeFileSync(dumpDirectory + 'tree.lisp', tree.toStringTree(null, parser));
    dumpData && writeFileSync(dumpDirectory + 'raw-parser.txt', visitor.logger.dump());
    
    let svgOutput = "";

    if (errors.length === 0){
        const { frameComponent } = visitor.applySheetFrameComponent();
        try {
            visitor.annotateComponents();
        } catch (err) {
            throw new RenderError(`Error during component annotation: ${err}`, 'annotation');
        }

        // await writeFile('dump/raw-netlist.json', JSON.stringify(visitor.dump2(), null, 2));

        const { sequence, nets } = visitor.getGraph();

        // const tmpInstances = visitor.getExecutor().scope.instances;
        // for (const [instanceName, instance] of tmpInstances){
        //     console.log(instanceName);
        //     console.log(instance.pinNets);
        // }

        const tmpSequence = generateDebugSequenceAction(sequence).map(item => sequenceActionString(item));
        dumpData && writeFileSync(dumpDirectory + 'raw-sequence.txt', tmpSequence.join('\n'));

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

            let sheetFrames;
            try {
                sheetFrames = layoutEngine.runLayout(sequence, nets);
            } catch (err) {
                throw new RenderError(`Error during layout generation: ${err}`, 'layout');
            }

            layoutEngine.printWarnings();

            showStats && console.log('Layout took:', layoutTimer.lap());

            dumpData && writeFileSync(dumpDirectory + 'raw-layout.txt', layoutEngine.logger.dump());

            const generateSvgTimer = new SimpleStopwatch();

            const renderLogger = new Logger();
            let svgCanvas;
            try {
                svgCanvas = renderSheetsToSVG(sheetFrames, renderLogger);
            } catch (err) {
                throw new RenderError(`Error during SVG generation: ${err}`, 'svg_generation');
            }

            showStats && console.log('Render took:', generateSvgTimer.lap());

            dumpData && writeFileSync(dumpDirectory + 'raw-render.txt', renderLogger.dump());

            try {
                svgOutput = generateSvgOutput(svgCanvas, outputDefaultZoom);
            } catch (err) {
                throw new RenderError(`Error generating SVG output: ${err}`, 'svg_output');
            }

            if (outputPath) {
                if (fileExtension === 'svg') {
                    try {
                        writeFileSync(outputPath, svgOutput);
                    } catch (err) {
                        throw new RenderError(`Error writing SVG file: ${err}`, 'file_output');
                    }

                } else if (fileExtension === 'pdf') {

                    let sheetSize = "A4";
                    let sheetSizeDefined = false;
                    if (frameComponent) {
                        sheetSize = frameComponent.getParam(FrameParamKeys.PaperSize);
                        sheetSizeDefined = true;
                    }

                    try {
                        const doc = new PDFDocument({
                            layout: 'landscape',
                            size: sheetSize
                        });
                        const outputStream = createWriteStream(outputPath);

                        generatePdfOutput(doc, svgCanvas,
                            sheetSize, sheetSizeDefined, outputDefaultZoom);

                        doc.pipe(outputStream);
                        doc.end();
                    } catch (err) {
                        throw new RenderError(`Error generating PDF file: ${err}`, 'pdf_output');
                    }
                } else {
                    throw new RenderError(`Invalid output format: ${fileExtension}`, 'file_output');
                }
                console.log('Generated file', outputPath);
            }
        } catch (err) {
            throw new RenderError(`Error during rendering: ${err}`, 'output_generation');
        }
    }

    return {
        svgOutput, 
        errors
    }
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

// TODO: create an interface for this. Default is to use node 
// as the environment.
export class NodeScriptEnvironment {

    // Maintain a global instance for ease of access
    // TODO: in the future, this should be changed away from this singleton.
    static _instance: NodeScriptEnvironment |null = null;

    static setInstance(instance: NodeScriptEnvironment): void {
        NodeScriptEnvironment._instance = instance;
    }

    static getInstance(): NodeScriptEnvironment {
        return NodeScriptEnvironment._instance!;
    }

    protected useModuleDirectoryPath: string | null = null;
    protected useDefaultLibsPath: string | null = null;
    
    protected globalCreateSVGWindow: (() => SVGWindow) | null = null;
    
    // Supported fonts for SVG rendering
    protected supportedFonts = { 
        'Arial': 'Arial.ttf',
    };

    setModuleDirectory(path: string): void {
        this.useModuleDirectoryPath = path;
    }

    setDefaultLibsPath(path: string): void {
        this.useDefaultLibsPath = path;
    }

    getPackageVersion(): string {
        return TOOL_VERSION;
    }

    /**
     * Returns the directory where the circuitscript executable is at. This
     * path will be used to find the fonts/ and libs/ folders.
     * @returns
     */
    getModuleDirectory(): string {
        if (this.useModuleDirectoryPath !== null) {
            return this.useModuleDirectoryPath;
        }

        // Try CommonJS approach first
        if (typeof __dirname !== 'undefined') {
            return __dirname;
        }

        // For ESM environments, use stack trace to find current file location
        const stackLine = new Error().stack?.split('\n')[1];
        if (stackLine) {
            // Look for file:// URLs (ESM) or regular paths (Jest/CJS)
            const fileMatch = stackLine.match(/\((.+)\:[\d]+\:[\d]+\)/);
            if (fileMatch) {
                const filePath = fileMatch[1].replace('file://', '');
                return path.dirname(filePath);
            }
        }

        throw new RuntimeExecutionError("Failed to get current module directory");
    }

    getRelativeToModule(filePath: string): string {
        return path.join(this.getModuleDirectory(), filePath);
    }

    getRelativeToDefaultLibs(filePath: string): string {
        return path.join(this.getDefaultLibsPath(), filePath);
    }

    /**
     * Gets the root tools directory path relative to the current file location.
     * 
     * This function calculates the base directory of the CircuitScript package by
     * navigating up two levels from the current source file location. The tools path
     * serves as the root directory containing package resources like fonts, libraries,
     * and configuration files.
     * 
     * @returns {string} The normalized absolute path to the tools directory
     * 
     * @example
     * // If current file is at /path/to/circuitscript/dist/src/helpers.js
     * // Returns: /path/to/circuitscript/dist
     * const toolsPath = getToolsPath();
     * 
     * @throws {Error} May throw if file system operations are not supported
     * 
     * @internal This is a private function used by other path utility functions
     */
    getToolsPath(): string {
        return path.normalize(this.getModuleDirectory() + '/../');
    }

    getFontsPath(): string {
        return path.normalize(this.getToolsPath() + "fonts");
    }

    getDefaultLibsPath(): string {
        if (this.useDefaultLibsPath !== null) {
            return this.useDefaultLibsPath;
        }

        return path.normalize(this.getToolsPath() + "libs");
    }

    /**
     * Prepares the SVG environment by loading the svgdom ESM module and configuring fonts
     */
    private async prepareSVGEnvironmentInternal(fontsPath: string | null): Promise<void> {    
        try {
            // Use Function constructor to prevent TypeScript from converting to require() in CJS build
            const dynamicImport = new Function('specifier', 'return import(specifier)');
            const { config, createSVGWindow } = await dynamicImport('svgdom');

            this.globalCreateSVGWindow = createSVGWindow;
            if (fontsPath !== null) {
                await config.setFontDir(fontsPath)
                    .setFontFamilyMappings(this.supportedFonts)
                    .preloadFonts();
            }
        } catch (error) {
            throw new Error(`Failed to load svgdom ESM module: ${error}`);
        }
    }

    /**
     * Gets the SVG window creation function
     */
    createSVGWindow(): SVGWindow {
        if (this.globalCreateSVGWindow === null) {
            throw new Error("SVG environment is not set up yet. Call prepareSVGEnvironment() first.");
        }
        return this.globalCreateSVGWindow();
    }

    // Re-usable canvas for the text measurement
    textMeasurementCanvas: Dom | undefined;

    getCanvasWindow(): Dom {
        if (this.textMeasurementCanvas === undefined) {
            const window = this.createSVGWindow();
            const { document } = window;
            registerWindow(window, document);
            this.textMeasurementCanvas = SVG(document.documentElement);
        }

        return this.textMeasurementCanvas!;
    }

    prepareSVGEnvironment(): Promise<void> {
        return this.prepareSVGEnvironmentInternal(this.getFontsPath());
    }

    readFileSync(path: PathOrFileDescriptor, options): string {
        return readFileSync(path, options);
    }

    existsSync(path: PathLike): ReturnType<typeof existsSync> {
        return existsSync(path);
    }
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
