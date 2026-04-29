import { readFileSync } from 'fs';
import { Resvg } from '@resvg/resvg-js';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { CircuitScriptParser } from '../src/antlr/CircuitScriptParser.js';

import { ParserVisitor, VisitorExecutionException } from '../src/visitor.js';
import { ComponentPinNet, DocumentVariable } from '../src/objects/types.js';
import { CircuitscriptParserErrorListener, parseFileWithVisitor } from '../src/parser.js';
import { ClassComponent } from '../src/objects/ClassComponent.js';
import { MainLexer } from '../src/lexer.js';
import { CharStream, CommonTokenStream, ParserRuleContext } from 'antlr4ng';
import { BaseVisitor, OnErrorHandler } from '../src/BaseVisitor.js';
import { validateScript } from '../src/validate/validateScript.js';
import { SymbolValidatorVisitor } from '../src/validate/SymbolValidatorVisitor.js';
import { ParseSyntaxError } from "../src/errors.js";
import { ESMNodeScriptEnvironment } from '../src/environment/esm-environment.js';
import { NodeScriptEnvironment } from '../src/environment/environment.js';
import { LayoutEngine, SheetFrame } from '../src/render/layout.js';
import { NetGraph } from '../src/render/graph.js';
import { Logger } from '../src/logger.js';
import { ERCReportItem, EvaluateERCRules } from '../src/rules-check/rules.js';
import { generateBom, generateBomCSV } from '../src/BomGeneration.js';
import { GlobalDocumentName } from '../src/globals.js';
import { getStylesFromDocument } from '../src/styles.js';

export function getTestEnvironment(): NodeScriptEnvironment {
    const env = new ESMNodeScriptEnvironment();
    NodeScriptEnvironment.setInstance(env);
    return env;
}

export async function runScript(script: string, scriptPath?: string, options?: {
    simplifyRefdes?: boolean,
}): Promise<{
    visitor: ParserVisitor,
    hasError: boolean,
    componentPinNets: ComponentPinNet[]
}> {
    const chars = CharStream.fromString(script);
    const lexer = new MainLexer(chars);
    const tokens = new CommonTokenStream(lexer);

    const env = new ESMNodeScriptEnvironment();
    NodeScriptEnvironment.setInstance(env);

    await env.prepareSVGEnvironment();

    // Important for resolving imports
    if (scriptPath){
        env.setCurrentFile(scriptPath);
    }

    const errorHandler: OnErrorHandler =
        (message: string, context: ParserRuleContext, error: any) => {
            if (error instanceof VisitorExecutionException) {
                throw new ParseSyntaxError(message);
            }
        };
        
    const visitor = new ParserVisitor(true, errorHandler, env);

    visitor.printToConsole = false; // do not clutter the console log

    const parser = new CircuitScriptParser(tokens);
    // Clear any existing error listeners and use the custom one only
    parser.removeErrorListeners();

    const errorListener = new CircuitscriptParserErrorListener(
        visitor.onErrorHandler
    );

    parser.addErrorListener(errorListener);

    const tree = parser.script();

    visitor.onImportFile = (visitor: BaseVisitor, filePath: string, fileData: string,
        errorHandler: OnErrorHandler, fileLineOffset = 0): { hasError: boolean, hasParseError: boolean } => {
        const { hasError, hasParseError } = parseFileWithVisitor(visitor, fileData, {
            lineOffset: fileLineOffset
        });
        return { hasError, hasParseError };
    }

    if (scriptPath && scriptPath !== '') {
        visitor.enterFile(scriptPath);
    }

    await visitor.resolveImportsAndLoad(scriptPath, script);

    // visitor.loadedFiles = loadedFiles;

    let hasError = false;
    try {
        visitor.visit(tree);
    } catch (err) {
        // Error should be internally handled in visitor
        console.log(err);
        hasError = true;
    }

    visitor.exitFile();

    hasError = hasError || errorListener.hasSyntaxErrors();

    visitor.annotateComponents(options?.simplifyRefdes ?? true);

    // Do not write cached libraries for tests
    // visitor.cacheLibraries();

    return {
        visitor, hasError,
        componentPinNets: visitor.dumpNets(),
    }
}

export async function testValidateScript(scriptData: string): Promise<SymbolValidatorVisitor> {
    const scriptPath = "./__tests__/testData/validationData/";
    const environment = getTestEnvironment();

    return validateScript(
        scriptPath,
        scriptData,
        {
            environment,
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
    return readFile(filePath);
}

export function loadRawNetFromFile(filePath: string): string {
    return readFile(filePath);
}

export function readFile(filePath:string): string{
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

        const tmp = Number(line[2]);
        if(!isNaN(tmp)){
            line[2] = tmp;
        }
        
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

type RenderCommonOptions = {
    runErc?: boolean,
    generateBom?: boolean,
    bomConfig?: {
        columns: string[],
        group_by: string[],
    }
}

export async function renderCommon(scriptPath: string, options?: RenderCommonOptions):
    Promise<{ 
        sheetFrames: SheetFrame[], 
        ercResults: ERCReportItem[],
        bomCsvOutput: string[][], 
        documentVariable: DocumentVariable
    }> {

    const script = readFileSync(scriptPath, { encoding: 'utf8' });
    const { hasError, visitor } = await runScript(script, scriptPath);
    expect(hasError).toEqual(false);

    visitor.applySheetFrameComponent();

    const { sequence, nets } = visitor.getGraph();

    const logger = new Logger();
    const graphEngine = new NetGraph(logger);
    const layoutEngine = new LayoutEngine(logger);

    const documentVariable = visitor.getScope()
        .variables.get(GlobalDocumentName)! as unknown as DocumentVariable;

    const styles = getStylesFromDocument(documentVariable); 
    graphEngine.setStyles(styles);

    const { graph, containerFrames } =
        graphEngine.generateLayoutGraph(sequence, nets);

    const sheetFrames = 
        await layoutEngine.runLayout(graph, containerFrames, nets);

    options = options ?? {};
    const {runErc = false, generateBom: generateBomOption = false} = options;

    const ercResults = runErc ? EvaluateERCRules(visitor, graph, nets) : [];

    let bomCsvOutput:string[][] = [];
    if (generateBomOption){
        const bomData = generateBom(options.bomConfig, visitor.getScope().getInstances());
        bomCsvOutput = generateBomCSV(bomData);
    }
    

    return {
        sheetFrames,
        ercResults,
        bomCsvOutput,
        documentVariable
    }
}

export type SvgDiffResult = {
    numDiffPixels: number;
    width: number;
    height: number;
    diffPng: Buffer;
    img1: PNG,
    img2: PNG,
};

function svgToPng(svgString: string): PNG {
    const resvg = new Resvg(svgString);
    const pngBuffer = resvg.render().asPng();
    return PNG.sync.read(pngBuffer);
}

export function compareSvgToFile(svgFilePath: string, svgString: string, threshold = 0.1): SvgDiffResult {
    const fileContents = readFileSync(svgFilePath, { encoding: 'utf8' });

    const img1 = svgToPng(fileContents);
    const img2 = svgToPng(svgString);

    if (img1.width !== img2.width || img1.height !== img2.height){
        
        // Use this to indicate dimensions do not match.
        return {
            numDiffPixels: -1,
        }
    }

    const width = Math.max(img1.width, img2.width);
    const height = Math.max(img1.height, img2.height);

    // Pad images to the same dimensions if they differ
    function padImage(img: PNG): Buffer {
        if (img.width === width && img.height === height) return img.data;
        const padded = Buffer.alloc(width * height * 4, 0);
        for (let y = 0; y < img.height; y++) {
            img.data.copy(padded, y * width * 4, y * img.width * 4, (y + 1) * img.width * 4);
        }
        return padded;
    }

    const diff = new PNG({ width, height });
    const numDiffPixels = pixelmatch(padImage(img1), padImage(img2), diff.data, width, height, { threshold });

    return {
        numDiffPixels,
        width,
        height,
        diffPng: PNG.sync.write(diff),
        img1,
        img2,
    };
}

export function expectJsonOutput(inputString: string, targetPath: string): void {
    const expectedJsonString = readFileSync(targetPath, { encoding: 'utf8' });
            
    // Parse the JSON again, so that later when stringified the format
    // is minimal.
    const expectedJson = JSON.parse(expectedJsonString);

    if (JSON.stringify (expectedJson) !== inputString){
        console.log('inputString', inputString);
        console.log('expected', JSON.stringify(expectedJson));
    }

    expect(JSON.stringify(expectedJson)).toEqual(inputString);
}