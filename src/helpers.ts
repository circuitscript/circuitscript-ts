/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { writeFileSync, createWriteStream,
    existsSync, mkdirSync} from "fs";
import path from "path";

import PDFDocument from "pdfkit";

import { generateKiCadNetList, printTree } from "./export.js";
import { LayoutEngine } from "./layout.js";
import { parseFileWithVisitor } from "./parser.js";
import { generatePdfOutput, generateSvgOutput, renderSheetsToSVG } from "./render.js";
import { BaseError, generateDebugSequenceAction, ParseError, ParseSyntaxError, printWarnings, RenderError, resolveToNumericValue, RuntimeExecutionError, sequenceActionString, SimpleStopwatch } from "./utils.js";
import { ParserVisitor } from "./visitor.js";
import { ParserRuleContext } from "antlr4ng";
import { SymbolValidatorVisitor } from "./validate/SymbolValidatorVisitor.js";
import { SymbolValidatorResolveVisitor } from "./validate/SymbolValidatorResolveVisitor.js";
import { ATNSimulator, BaseErrorListener, CharStream, CommonTokenStream, DefaultErrorStrategy, Parser, RecognitionException, Recognizer, Token } from "antlr4ng";
import { MainLexer } from "./lexer.js";
import { CircuitScriptParser, ScriptContext } from "./antlr/CircuitScriptParser.js";
import { BaseVisitor, ImportFileResult, OnErrorHandler } from "./BaseVisitor.js";
import { CircuitScriptLexer } from "./antlr/CircuitScriptLexer.js";
import { IParsedToken, prepareTokens, SemanticTokensVisitor } from "./SemanticTokenVisitor.js";
import { defaultPageMarginMM, defaultZoomScale, LengthUnit, MilsToMM, PxToMM, RefdesFileSuffix } from "./globals.js";

// Dynamic type definition for svgdom since it's ESM-only
export type SVGWindow = any;
import { FrameParamKeys } from "./objects/Frame.js";
import { NumericValue } from "./objects/ParamDefinition.js";
import Big from "big.js";
import { Logger } from "./logger.js";
import { NodeScriptEnvironment } from "./environment.js";
import { NetGraph } from "./graph.js";
import { RefdesAnnotationVisitor } from "./RefdesAnnotationVisitor.js";
import { EvaluateERCRules } from "./rules-check/rules.js";
import { generateBom, generateBomCSV, saveBomOutputCsv } from "./BomGeneration.js";
import { ClassComponent } from "./objects/ClassComponent.js";
import { ImportedModule } from "./objects/types.js";

export enum JSModuleType {
    CommonJs = 'cjs',
    ESM = 'mjs',
}

export type ScriptOptions = {
    dumpNets: boolean,
    dumpData: boolean,
    showStats: boolean,
    environment: NodeScriptEnvironment,

    inputPath?: string,

    enableErc?: boolean,
    enableBom?: boolean,
    bomOutputPath?: string,
    
    // If true, then replace the current file with annotated refdes in comments.
    updateSource?: boolean,

    // Contains file path to save annotated copy. If left as blank/null, then
    // save to .annotated.cst file.
    saveAnnotatedCopy?: string | boolean,
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

export async function getSemanticTokens(scriptData: string, options: ScriptOptions)
    : Promise<{ visitor: SemanticTokensVisitor, parsedTokens: IParsedToken[] }> {
    
    const { parser, lexer, tokens } = prepareFile(scriptData);
    const tree = parser.script();

    const visitor = new SemanticTokensVisitor(true, null,
        options.environment,
        lexer, scriptData,
    );

    parser.removeErrorListeners();

    visitor.onImportFile = async (visitor: BaseVisitor, filePath: string, textData: string)
        : Promise<ImportFileResult> => {

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

    await visitor.visitAsync(tree);

    const semanticTokens = visitor.getTokens();

    // Get all tokens
    const parsedTokens = prepareTokens(tokens.getTokens(), lexer, scriptData);
    const finalParsedTokens:IParsedToken[] = [];
    parsedTokens.forEach(token => {
        const location = `${token.line}_${token.column}_${token.length}`;
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

export async function validateScript(filePath: string, scriptData: string,
    options: ScriptOptions): Promise<SymbolValidatorVisitor> {

    const { parser } = prepareFile(scriptData);
    parser.removeErrorListeners();

    parser.errorHandler = new ParseErrorStrategy();
    parser.addErrorListener(new TokenErrorListener());

    const tree = parser.script();

    const visitor = new SymbolValidatorVisitor(true, null, 
        options.environment);

    visitor.enterFile(filePath);

    visitor.onImportFile = async (visitor: SymbolValidatorVisitor, filePath: string, textData: string)
        : Promise<ImportFileResult> => {

        visitor.enterFile(filePath);

        let hasError = false;
        let hasParseError = false;

        if (textData !== null) {
            const { parser } = prepareFile(textData);
            const tree = parser.script();

            try {
                await visitor.visitAsync(tree);
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
    await visitor.visitAsync(tree);
   
    const symbolTable = visitor.getSymbols();
    symbolTable.clearUndefined();

    const visitorResolver = new SymbolValidatorResolveVisitor(
        true, null, options.environment);
    visitorResolver.enterFile(filePath);

    // Use the existing symbol tree as the starting point
    visitorResolver.setSymbols(visitor.getSymbols());
    
    visitorResolver.onImportFile = visitor.onImportFile;

    // Second pass to resolve variables, functions
    await visitorResolver.visitAsync(tree);
    
    return visitorResolver;
}

type RenderScriptReturn = {
    svgOutput: string | null,
    errors: BaseError[]
};

async function DefaultPostAnnotationCallback(options: ScriptOptions,
    scriptData: string,
    tree: ScriptContext,
    tokens: CommonTokenStream,
    componentLinks: Map<ParserRuleContext, ClassComponent>,
    importedModules: ImportedModule[],
    environment: NodeScriptEnvironment
): Promise<void> {
    const {
        inputPath = null,
        updateSource = false,
        saveAnnotatedCopy = undefined,
    } = options;

    // Generate refdes annotation comments
    if (inputPath && (updateSource || saveAnnotatedCopy !== undefined)) {
        
        // The main file should be annotated.
        const annotatedFiles: AnnotatedFile[] = [{
            isMainFile: true,
            scriptData,
            tokens,
            tree,
            filePath: inputPath,
            outputType: RefdesOutputType.WithSource
        }];

        // For the imported modules, check if refdes annotation is enabled.
        for (const module of importedModules) {

            let outputType = RefdesOutputType.None;
            if (module.enableRefdesAnnotation) {
                outputType = RefdesOutputType.WithSource;
            } else if (module.enableRefdesAnnotationFile) {
                outputType = RefdesOutputType.CreateExternalFile;
            }

            if (outputType !== RefdesOutputType.None) {
                const { moduleFilePath, moduleName,
                    tokens: moduleTokens, tree: moduleTree } = module;
                const moduleScriptData = await environment.readFile(
                    moduleFilePath, { encoding: 'utf8' });
                
                annotatedFiles.push({
                    tokens: moduleTokens,
                    tree: moduleTree,
                    filePath: moduleFilePath,
                    scriptData: moduleScriptData,
                    moduleName,
                    outputType
                });
            }
        }

        for (const item of annotatedFiles) {
            const { scriptData, tokens, tree, filePath, moduleName,
                isMainFile = false } = item;

            const tmpVisitor = new RefdesAnnotationVisitor(true,
                scriptData, tokens, componentLinks);

            await tmpVisitor.visit(tree);

            let usePath = filePath;

            // What path to save to for module files??
            if (isMainFile && saveAnnotatedCopy === true) {
                const dir = environment.dirname(filePath);
                const ext = environment.extname(filePath);
                const basename = environment.basename(filePath, ext);
                usePath = environment.join(dir, `${basename}.annotated${ext}`);
            } else if (isMainFile && typeof saveAnnotatedCopy === 'string') {
                usePath = saveAnnotatedCopy as string;
            }

            if (item.outputType === RefdesOutputType.WithSource){
                environment.writeFileSync(
                    usePath, tmpVisitor.getOutput());
            } else if (item.outputType === RefdesOutputType.CreateExternalFile){
                // If external file, then save to the save path, but with an extension.
                const dir = environment.dirname(usePath);
                const ext = environment.extname(usePath);
                const basename = environment.basename(filePath, ext);
                usePath = environment.join(dir, `${basename}${RefdesFileSuffix}`);

                const output = tmpVisitor.getOutputForExternalRefdesFile();
                const jsonFile = {
                    format: 'v1',
                    module: moduleName,
                    file: filePath,
                    items: output,
                }

                environment.writeFileSync(
                    usePath,
                    JSON.stringify(jsonFile, null, 4)
                )
            }

            let display = 'Refdes annotations'
            if (moduleName) {
                display += ` for module ${moduleName}`
            }

            console.log(`${display} saved to ${usePath}`);
        }
    }
}

type AnnotatedFile = {
    isMainFile?: boolean,
    tokens: CommonTokenStream,
    tree: ScriptContext,
    filePath: string,
    scriptData: string,
    moduleName?: string,

    outputType: RefdesOutputType,
}

enum RefdesOutputType {
    None = 'none',

    // Comment refdes annotations are added to the target source file.
    WithSource = 'with-source',

    // External file is used to store the refdes annotations.
    CreateExternalFile = 'create-external-file'
}

export async function renderScript(scriptData: string, outputPath: string | null,
    options: ScriptOptions): Promise<RenderScriptReturn> {

    const parseHandlers = [
        new KiCadNetListOutputHandler(),
    ];

    return renderScriptCustom(scriptData, outputPath, options, parseHandlers, 
        [DefaultPostAnnotationCallback]);
}

// TODO: have a unifying way to hook callbacks into different parts of the render flow.
export async function renderScriptCustom(scriptData: string, outputPath: string | null,
    options: ScriptOptions, parseHandlers: ParseOutputHandler[],

    postAnnotationCallbacks: (
        (options: ScriptOptions, 
            scriptData: string,
            tree: ScriptContext,
            tokens:CommonTokenStream, 
            componentLinks:Map<ParserRuleContext, ClassComponent>,
            importedModule: ImportedModule[],
            environment: NodeScriptEnvironment) => void)[]

): Promise<RenderScriptReturn> {

    const {
        dumpNets = false,
        dumpData = false,
        showStats = false,
        enableErc = false,
        enableBom = false,

        inputPath = '',

        bomOutputPath = undefined,
        environment
    } = options;
    
    const errors: BaseError[] = [];
    const onErrorHandler: OnErrorHandler =
        (message: string, context: ParserRuleContext, error?: any) => {
            if (error && error instanceof RuntimeExecutionError) {
                errors.push(error);
            } else if (error && error instanceof RecognitionException) {
                if (context !== null){
                    errors.push(new ParseSyntaxError(message, context.start!, context.stop!));
                } else {
                    if (error.recognizer){
                        const recognizer = error.recognizer;
                        errors.push(new ParseSyntaxError(message, {
                            line: recognizer.currentTokenStartLine,
                            column: recognizer.currentTokenColumn
                        }));
                    } else {
                        errors.push(new ParseSyntaxError(message));
                    }
                }
            } else {
                errors.push(new ParseError(message, context.start!, context.stop!));
            }
        };

    environment.setCurrentFile(inputPath);

    const visitor = new ParserVisitor(true, 
        onErrorHandler, environment);

    visitor.onImportFile = async (visitor: BaseVisitor, filePath:string, fileData: string)
        : Promise<ImportFileResult> => {

        visitor.enterFile(filePath);

        const { hasError, hasParseError, throwError, tree, tokens } = 
            await parseFileWithVisitor(visitor, fileData);
        
        visitor.exitFile();

        // Raise exception if there are errors in imported files
        if (hasError || hasParseError) {

            let importErrorMsg = "";
            if (throwError){
                importErrorMsg = ": " + throwError.message;
            }

            throw new ParseError(`Error parsing imported file: ${filePath}${importErrorMsg}`, undefined, undefined, filePath);
        }
        
        return { hasError, hasParseError, tree, tokens};
    }

    visitor.log('reading file');
    visitor.log('done reading file');

    const dumpDirectory = environment.getRelativeToModule('/dump/');

    if (dumpData) {
        console.log('Dump data to:', dumpDirectory);
        if (!existsSync(dumpDirectory)) {
            mkdirSync(dumpDirectory);
        }
    }

    if (inputPath !== '') {
        // Set input path as the first file.
        visitor.enterFile(inputPath);
    }

    const { tree, parser, tokens,
        parserTimeTaken, 
        lexerTimeTaken, throwError } = await parseFileWithVisitor(visitor, scriptData);

    printWarnings(visitor.getWarnings());

    showStats && console.log('Lexing took:', lexerTimeTaken);
    showStats && console.log('Parsing took:', parserTimeTaken);

    try {
        visitor.annotateComponents();
    } catch (err) {
        throw new RenderError(`Error during component annotation: ${err}`, 'annotation');
    }

    const componentLinks = visitor.getComponentCtxLinks();
    const importedModules = Array.from(visitor.getScope().modules.values());
    for (let i = 0; i < postAnnotationCallbacks.length; i++) {
        await postAnnotationCallbacks[i](options, scriptData, tree, 
            tokens, componentLinks, importedModules, environment);
    }
    
    if (dumpNets) {
        const nets = visitor.dumpNets();
        nets.forEach(item => console.log(item.join(" | ")));
    }

    dumpData && writeFileSync(dumpDirectory + 'tree.lisp', tree.toStringTree(null, parser));
    dumpData && writeFileSync(dumpDirectory + 'raw-parser.txt', visitor.logger.dump());

    if (throwError){
        throw throwError;
    }
    
    let svgOutput = "";

    if (errors.length === 0){
        const { frameComponent } = visitor.applySheetFrameComponent();

        // await writeFile('dump/raw-netlist.json', JSON.stringify(visitor.dump2(), null, 2));

        const { sequence, nets } = visitor.getGraph();

        // const tmpInstances = visitor.getExecutor().scope.instances;
        // for (const [instanceName, instance] of tmpInstances){
        //     console.log(instanceName);
        //     console.log(instance.pinNets);
        // }

        if (enableBom && bomOutputPath) {
            const documentVariable = visitor.getScope().variables.get('document')!;
            const bomConfig = documentVariable.bom;
            const bomData = generateBom(bomConfig, visitor.getScope().getInstances());

            const bomCsvOutput = generateBomCSV(bomData);
            await saveBomOutputCsv(bomCsvOutput, bomOutputPath);
            console.log('Generated BOM file', bomOutputPath);
        }

        const tmpSequence = generateDebugSequenceAction(sequence).map(item => sequenceActionString(item));
        dumpData && writeFileSync(dumpDirectory + 'raw-sequence.txt', tmpSequence.join('\n'));

        try {
            let fileExtension: string | null = null;
            let outputDefaultZoom = defaultZoomScale;

            if (outputPath) {
                fileExtension = path.extname(outputPath).substring(1);
            }

            for (let i = 0; i < parseHandlers.length; i++) {
                const handler = parseHandlers[i];
                if (handler.beforeRender) {
                    const keepParsing = handler.parse(visitor,
                        outputPath, fileExtension);

                    if (!keepParsing) {
                        return {
                            svgOutput: null,
                            errors
                        }
                    }
                }
            }

            const logger = new Logger();
            const graphEngine = new NetGraph(logger);
            const layoutEngine = new LayoutEngine(logger);
            const layoutTimer = new SimpleStopwatch();

            // graphEngine.generateNetGraph(nets);

            let sheetFrames;
            try {
                const { graph, containerFrames } =
                    graphEngine.generateLayoutGraph(sequence, nets);

                sheetFrames = layoutEngine.runLayout(graph,
                    containerFrames, nets);

                if (enableErc) {
                    const ercResults = EvaluateERCRules(visitor, graph, nets);

                    if (ercResults.length > 0) {
                        console.log(`ERC found ${ercResults.length} items:`);

                        ercResults.forEach((item, index) => {
                            console.log(`${(index + 1).toString().padStart(3)}. line ${item.start.line}, column ${item.start.column}: ${item.type} - ${item.message}`);
                        });
                    } else {
                        console.log('No ERC issues found');
                    }
                }

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
                if (fileExtension === "pdf") {
                    outputDefaultZoom = 1;
                }

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

/**
 * Parse output handler class to handle different output formats after the 
 * script parsing is completed.
 */
export abstract class ParseOutputHandler {

    // If true, this output handler should be called before the render stage
    beforeRender = false;

    // If true, this output handler should be called after the render stage
    afterRender = false;

    abstract parse(visitor: ParserVisitor, outputPath: string | null, 
        fileExtension: string | null, extra: any| null): boolean;
}

/** Generates KiCAD compatible netlist. This netlist can be loaded into 
 * KiCAD PCBView */
export class KiCadNetListOutputHandler extends ParseOutputHandler {

    beforeRender = true;

    parse(visitor: ParserVisitor, outputPath: string | null, fileExtension: string| null): boolean {
        // Generate the kicad net list

        if (outputPath !== null && fileExtension === "net") {    
            const { tree: kiCadNetList, missingFootprints }
                = generateKiCadNetList(visitor.getNetList());

            missingFootprints.forEach(entry => {
                console.log(
                    `${entry.refdes} (${entry.instanceName}) does not have footprint`);
            });

            writeFileSync(outputPath, printTree(kiCadNetList));
            console.log('Generated file', outputPath);

            return false;
        }
        return true;
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
