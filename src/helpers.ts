/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Big from "big.js";
import { ParserRuleContext } from "antlr4ng";

import { BaseError, SimpleStopwatch } from "./utils.js";
import { ATNSimulator, BaseErrorListener, CharStream, CommonTokenStream, 
    DefaultErrorStrategy, Parser, RecognitionException, Recognizer, Token } from "antlr4ng";
import { MainLexer } from "./lexer.js";
import { CircuitScriptParser, ScriptContext } from "./antlr/CircuitScriptParser.js";
import { CircuitScriptLexer } from "./antlr/CircuitScriptLexer.js";
import { LengthUnit, MilsToMM, PxToMM } from "./globals.js";

// Dynamic type definition for svgdom since it's ESM-only
export type SVGWindow = any;
import { NumericValue, resolveToNumericValue } from "./objects/NumericValue.js";
import { NodeScriptEnvironment } from "./environment/environment.js";
import { ImportedLibrary } from "./objects/types.js";

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

    // If true, enable lexer diagnostic collection and reporting
    lexerDiagnostics?: boolean,

    // Lexer diagnostic display options
    lexerVerbose?: boolean,
    lexerTokens?: number | boolean,
    lexerMapping?: string | boolean,
    lexerSummary?: boolean,
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

export class TokenErrorListener extends BaseErrorListener {

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

export type RenderScriptReturn = {
    svgOutput: string | null,
    errors: BaseError[]
};

export type ExternalLibAnnotationFile = {
    name: string,
    path: string,
    items: Record<string, string>,
}

export type AnnotatedFile = {
    isMainFile?: boolean,
    tokens: CommonTokenStream,
    tree: ScriptContext,
    filePath: string,
    scriptData: string,
    libraryName?: string,

    outputType: RefdesOutputType,

    library?: ImportedLibrary,
    referencedTokens?: [tokens: CommonTokenStream, tree: ParserRuleContext][],
}

export enum RefdesOutputType {
    None = 'none',

    // Comment refdes annotations are added to the target source file.
    WithSource = 'with-source',

    // External file is used to store the refdes annotations.
    CreateExternalFile = 'create-external-file'
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