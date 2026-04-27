/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import path from "path";
import PDFDocument from "pdfkit";

import { CommonTokenStream, ParserRuleContext, RecognitionException } from "antlr4ng";
import { DefaultPostAnnotationCallback } from "./annotate/DefaultPostAnnotationCallback.js";
import { ScriptContext } from "./antlr/CircuitScriptParser.js";
import { OnErrorHandler, BaseVisitor, ImportFileResult } from "./BaseVisitor.js";
import { generateBom, generateBomCSV, saveBomOutputCsv } from "./BomGeneration.js";
import { NodeScriptEnvironment } from "./environment/environment.js";
import { defaultZoomScale, GlobalDocumentName, FrameType } from "./globals.js";
import { NetGraph } from "./render/graph.js";
import { ScriptOptions, RenderScriptReturn } from "./helpers.js";
import { LayoutEngine } from "./render/layout.js";
import { Logger } from "./logger.js";
import { ClassComponent } from "./objects/ClassComponent.js";
import { Frame, FrameParamKeys } from "./objects/Frame.js";
import { FrameAction, SequenceAction } from "./objects/ExecutionScope.js";
import { DocumentVariable, ImportedLibrary } from "./objects/types.js";
import { parseFileWithVisitor } from "./parser.js";
import { KiCadNetListOutputHandler, ParseOutputHandler } from "./render/KiCadNetListOutputHandler.js";
import { KiCadSchOutputHandler, KiCadVersion } from "./render/KiCadSchOutputHandler.js";
import { renderSheetsToSVG, generateSvgOutput, generatePdfOutput } from "./render/render.js";
import { EvaluateERCRules } from "./rules-check/rules.js";
import { printWarnings, generateDebugSequenceAction, 
    sequenceActionString, SimpleStopwatch} from "./utils.js";
import { ParserVisitor } from "./visitor.js";
import { getStylesFromDocument } from "./styles.js";
import { BaseError, RuntimeExecutionError, ParseSyntaxError, ParseError, 
    RenderError, AutoWireFailedError, 
    AutoWireFailedError_} from "./errors.js";

export async function renderScript(scriptData: string, outputPaths: string[],
    options: ScriptOptions): Promise<RenderScriptReturn> {

    const kiCadVersion = options.kiCadVersion === '10' ? KiCadVersion.V10 : KiCadVersion.V9;
    const env = options.environment;

    const parseHandlers = [
        new KiCadNetListOutputHandler(),
        new KiCadSchOutputHandler(kiCadVersion, env.getPackageVersion()),
    ];

    return renderScriptCustom(scriptData, outputPaths, options, parseHandlers,
        [DefaultPostAnnotationCallback]);
}

// TODO: have a unifying way to hook callbacks into different parts of the render flow.
export async function renderScriptCustom(scriptData: string, outputPaths: string[],
    options: ScriptOptions, parseHandlers: ParseOutputHandler[],

    postAnnotationCallbacks: (
        (options: ScriptOptions, 
            scriptData: string,
            tree: ScriptContext,
            tokens:CommonTokenStream, 
            componentLinks:Map<ParserRuleContext, ClassComponent>,
            importedLibraries: ImportedLibrary[],
            environment: NodeScriptEnvironment) => void)[]

): Promise<RenderScriptReturn> {

    const {
        dumpNets = false,
        dumpData = false,
        showStats = false,
        enableErc = false,
        enableBom = false,
        lexerDiagnostics = false,
        lexerVerbose = false,
        lexerTokens = false,
        lexerMapping = false,
        lexerSummary = false,

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

    const visitor = new ParserVisitor(true, onErrorHandler, environment);
    environment.setCurrentFile(inputPath);
    visitor.log(`current file: ${inputPath}`);

    visitor.onImportFile = (visitor: BaseVisitor, filePath:string, 
        fileData: string, errorHandler, fileLineOffset=0)
        : ImportFileResult => {

        visitor.enterFile(filePath);

        // Clear the errors array.
        const numErrors = errors.length;

        const result =
            parseFileWithVisitor(visitor, fileData, {
                enableLexerDiagnostics: lexerDiagnostics,
                enableLexerVerbose: lexerVerbose,
                lineOffset: fileLineOffset,
            });

        const { throwError, tree, tokens } = result;
        let { hasError, hasParseError } = result;

        if (errors.length > numErrors) {
            // Some parsing errors...
            hasError = true;
            hasParseError = true;
        }

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

    const dumpDirectory = environment.getRelativeToModule('/dump/');

    if (dumpData) {
        console.log('Dump data to:', dumpDirectory);
        if (!environment.existsSync(dumpDirectory)) {
            environment.mkdirSync(dumpDirectory);
        }
    }

    if (inputPath !== '') {
        // Set input path as the first file.
        visitor.enterFile(inputPath);
    }

    await visitor.resolveImportsAndLoad(inputPath, scriptData);

    const { tree, parser, tokens, lexer,
        parserTimeTaken,
        lexerTimeTaken, throwError } = await parseFileWithVisitor(visitor, scriptData, {
            enableLexerDiagnostics: lexerDiagnostics,
            enableLexerVerbose: lexerVerbose,
            enableLexerTokenStream: lexerTokens !== false || lexerMapping !== false,
        });

    printWarnings(visitor.getWarnings());

    showStats && console.log('Lexing took:', lexerTimeTaken);
    showStats && console.log('Parsing took:', parserTimeTaken);

    // Print lexer diagnostics if enabled
    if (lexerDiagnostics && lexer.diagnosticCollector) {
        console.log('\n');

        // Print operation summary if requested
        if (lexerSummary) {
            lexer.diagnosticCollector.printLexerOperationSummary();
        }

        // Print token stream if requested
        if (lexerTokens !== false) {
            const limit = typeof lexerTokens === 'number' ? lexerTokens : undefined;
            lexer.diagnosticCollector.printTokenStream(limit);
        }

        // Print character-to-token mapping if requested
        if (lexerMapping !== false) {
            if (typeof lexerMapping === 'string') {
                // Parse line range like "1-10"
                const match = lexerMapping.match(/^(\d+)-(\d+)$/);
                if (match) {
                    const startLine = parseInt(match[1], 10);
                    const endLine = parseInt(match[2], 10);
                    lexer.diagnosticCollector.printCharacterToTokenMapping(startLine, endLine);
                } else {
                    console.log('Invalid line range format. Use format like "1-10"');
                }
            } else {
                // Print all lines
                lexer.diagnosticCollector.printCharacterToTokenMapping();
            }
        }

        // Always print the performance report
        lexer.diagnosticCollector.printReport();

        const recommendations = lexer.diagnosticCollector.getRecommendations();
        if (recommendations.length > 0) {
            console.log('Performance Recommendations:');
            recommendations.forEach((rec, idx) => {
                console.log(`  ${idx + 1}. ${rec}`);
            });
            console.log('');
        }
    }

    try {
        visitor.annotateComponents(options.simplifyRefdes ?? true);
    } catch (err) {
        throw new RenderError(`Error during component annotation: ${err}`, 'annotation');
    }

    const componentLinks = visitor.getComponentCtxLinks();
    const importedLibraries = Array.from(visitor.getScope().libraries.values());
    for (let i = 0; i < postAnnotationCallbacks.length; i++) {
        await postAnnotationCallbacks[i](options, scriptData, tree, 
            tokens, componentLinks, importedLibraries, environment);
    }

    visitor.cacheLibraries();
    
    if (dumpNets) {
        const nets = visitor.dumpNets();
        nets.forEach(item => console.log(item.join(" | ")));
    }

    dumpData && environment.writeFileSync(dumpDirectory + 'tree.lisp', tree.toStringTree(null, parser));
    dumpData && environment.writeFileSync(dumpDirectory + 'raw-parser.txt', visitor.logger.dump());

    if (throwError){
        errors.push(throwError);
    }
    
    let svgOutput = "";

    if (errors.length === 0 && throwError === undefined){
        const { frameComponent } = visitor.applySheetFrameComponent();

        // await writeFile('dump/raw-netlist.json', JSON.stringify(visitor.dump2(), null, 2));

        const { sequence, nets } = visitor.getGraph();

        // If KiCad output is selected and no Sheet frame exists in the sequence,
        // wrap the entire sequence in an auto-generated Sheet frame.
        const isKiCadOutput = outputPaths.some(p => path.extname(p).substring(1) === 'kicad_sch') &&
            parseHandlers.some(h => h instanceof KiCadSchOutputHandler);

        // If is kicad output and there is not user defined sheet, then add
        // a sheet.
        if (isKiCadOutput) {
            const hasSheetFrame = sequence.some(
                item => item[0] === SequenceAction.Frame && (item[1] as Frame).frameType === FrameType.Sheet
            );

            if (!hasSheetFrame) {
                const autoFrame = new Frame(1, FrameType.Sheet);
                sequence.unshift([SequenceAction.Frame, autoFrame, FrameAction.Enter]);
                sequence.push([SequenceAction.Frame, autoFrame, FrameAction.Exit]);

                autoFrame.parameters
                    .set(FrameParamKeys.SheetType, frameComponent)
                    .set(FrameParamKeys.SheetNumber, 1)
                    .set(FrameParamKeys.SheetTotal, 1);
            }
        }

        // const tmpInstances = visitor.getExecutor().scope.instances;
        // for (const [instanceName, instance] of tmpInstances){
        //     console.log(instanceName);
        //     console.log(instance.pinNets);
        // }

        const documentVariable = visitor.getScope()
            .variables.get(GlobalDocumentName)! as unknown as DocumentVariable;

        if (enableBom && bomOutputPath) {
            const bomConfig = documentVariable.bom;
            const bomData = generateBom(bomConfig, visitor.getScope().getInstances());

            const bomCsvOutput = generateBomCSV(bomData);
            await saveBomOutputCsv(environment, bomCsvOutput, bomOutputPath);
            console.log('Generated BOM file', bomOutputPath);
        }

        const tmpSequence = generateDebugSequenceAction(sequence).map(item => sequenceActionString(item));
        dumpData && environment.writeFileSync(dumpDirectory + 'raw-sequence.txt', tmpSequence.join('\n'));

        try {
            // Track which output paths have been handled by a parse handler.
            const handledPaths = new Set<string>();

            // beforeRender phase: call handlers for each output path.
            for (const outPath of outputPaths) {
                const ext = path.extname(outPath).substring(1);
                for (const handler of parseHandlers) {
                    if (handler.beforeRender) {
                        const keepParsing = handler.parse(visitor, outPath, ext);
                        if (!keepParsing) {
                            handledPaths.add(outPath);
                            break;
                        }
                    }
                }
            }

            const logger = new Logger();
            const graphEngine = new NetGraph(logger);
            const layoutEngine = new LayoutEngine(logger);
            const layoutTimer = new SimpleStopwatch();

            const styles = getStylesFromDocument(documentVariable);

            // graphEngine.generateNetGraph(nets);

            let sheetFrames;
            try {
                graphEngine.setStyles(styles);

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
                let useErr = err;
                // This error is rewrapped to include ParserRuleContext info.
                if (err instanceof AutoWireFailedError_){
                    const errCtx = visitor.wireCtxLinks.get(err.wire)!;
                    useErr = new AutoWireFailedError(err.message, errCtx.start!,
                        errCtx.stop!);
                }

                dumpData && environment.writeFileSync(dumpDirectory + 'raw-layout.txt', layoutEngine.logger.dump());
                throw new RenderError(`Error during layout generation`,
                    'layout', {cause: useErr});
            }

            layoutEngine.printWarnings();

            showStats && console.log('Layout took:', layoutTimer.lap());

            dumpData && environment.writeFileSync(dumpDirectory + 'raw-layout.txt', layoutEngine.logger.dump());

            // afterRender phase: call handlers for each unhandled output path.
            for (const outPath of outputPaths) {
                if (handledPaths.has(outPath)) continue;
                const ext = path.extname(outPath).substring(1);
                for (const handler of parseHandlers) {
                    if (handler.afterRender) {
                        const keepParsing = handler.parse(visitor, outPath, ext, sheetFrames);
                        if (!keepParsing) {
                            handledPaths.add(outPath);
                            break;
                        }
                    }
                }
            }

            // Determine which paths still need SVG/PDF rendering.
            const remainingPaths = outputPaths.filter(p => !handledPaths.has(p));

            if (remainingPaths.length > 0 || outputPaths.length === 0) {
                const generateSvgTimer = new SimpleStopwatch();

                const renderLogger = new Logger();
                let svgCanvas;
                try {
                    svgCanvas = renderSheetsToSVG(sheetFrames, renderLogger, documentVariable, styles);
                } catch (err) {
                    throw new RenderError(`Error during SVG generation: ${err}`, 'svg_generation');
                }

                showStats && console.log('Render took:', generateSvgTimer.lap());

                dumpData && environment.writeFileSync(dumpDirectory + 'raw-render.txt', renderLogger.dump());

                try {
                    svgOutput = generateSvgOutput(svgCanvas, defaultZoomScale);
                } catch (err) {
                    throw new RenderError(`Error generating SVG output: ${err}`, 'svg_output');
                }

                if (remainingPaths.length === 0) {
                    // No output paths — SVG string will be returned to caller.
                } else {
                    let sheetSize = "A4";
                    let sheetSizeDefined = false;
                    if (frameComponent) {
                        sheetSize = frameComponent.getParam(FrameParamKeys.PaperSize);
                        sheetSizeDefined = true;
                    }

                    for (const outPath of remainingPaths) {
                        const ext = path.extname(outPath).substring(1);
                        if (ext === 'svg') {
                            try {
                                environment.writeFileSync(outPath, svgOutput);
                            } catch (err) {
                                throw new RenderError(`Error writing SVG file: ${err}`, 'file_output');
                            }
                        } else if (ext === 'pdf') {
                            try {
                                const doc = new PDFDocument({
                                    layout: 'landscape',
                                    size: sheetSize
                                });
                                const outputStream = environment.createWriteStream(outPath);

                                generatePdfOutput(doc, svgCanvas, sheetSize, sheetSizeDefined, 1);

                                doc.pipe(outputStream);
                                doc.end();
                            } catch (err) {
                                throw new RenderError(`Error generating PDF file: ${err}`, 'pdf_output');
                            }
                        } else {
                            throw new RenderError(`Invalid output format: ${ext}`, 'file_output');
                        }
                        console.log('Generated file', outPath);
                    }
                }
            }
        } catch (err) {
            throw new RenderError(`Error during rendering: ${err}`,
                'output_generation', {cause: err});
        }
    }

    return {
        svgOutput, 
        errors
    }
}