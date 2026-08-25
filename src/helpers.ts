/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Big from "big.js";
import { ParserRuleContext } from "antlr4ng";

import { SimpleStopwatch } from "./utils.js";
import { BaseError } from './errors.js';
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
import { ComponentPinNet, ImportedLibrary } from "./objects/types.js";
import { ERCReportItem, ERCSeverity } from "./rules-check/rules.js";
import { PinId, PinIdType } from "./objects/PinDefinition.js";
import { ComponentMeta } from "./render/generateComponentMetadata.js";

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

    // KiCad schematic output version: '9' or '10' (default '9')
    kiCadVersion?: string,

    // If false, disables simplification of single-instance indexed refdes (e.g. R1_1 → R1)
    simplifyRefdes?: boolean,

    /* Selects which rendered output (SVG, interactive HTML, or the raw
       interactive SVG) is generated and returned via `outputReturn` when
       `outputPaths` doesn't already force it via a matching file extension.
       'data-svg' returns the interactive SVG string (with the accompanying
       ComponentMeta[] via `outputExtra`) without the HTML wrapper. Defaults
       to 'svg'. */
    outputReturnType?: 'svg' | 'html' | 'data-svg',
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
    /* The SVG, HTML, or interactive SVG string requested via `outputReturnType`
       ('svg', 'html', or 'data-svg' respectively), or "" if nothing was generated. */
    outputReturn: string,
    /* Additional data accompanying `outputReturn`. 'svg'/'html' -> null;
       'data-svg' -> the ComponentMeta[] produced by generateComponentMetadata. */
    outputExtra: ComponentMeta[] | null,
    errors: BaseError[],
    ercResults?: ERCReportItem[],
    nets?: ComponentPinNet[],
    scenarioResults?: string[],
    scenarioFailureCount?: number,
};

export function renderResultHasFailure(result: RenderScriptReturn): boolean {
    if (result.errors.length > 0) {
        return true;
    }
    if (result.ercResults?.some(item => item.severity === ERCSeverity.Error)) {
        return true;
    }
    if ((result.scenarioFailureCount ?? 0) > 0) {
        return true;
    }
    return false;
}

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

/** Sort precedence group for a pin id: '__'-containing values first,
 * then plain numbers, then alphanumeric (e.g. 'A1', 'A2', ..., 'A10'). */
function getPinSortGroup(pinId: PinId): number {
    const value = pinId.getValue();

    if (pinId.getType() === PinIdType.Str && (value as string).includes('__')) {
        return 0;
    }

    if (pinId.getType() === PinIdType.Int) {
        return 1;
    }

    return 2;
}

/** Splits a pin id string into alternating text/number chunks so that
 * numeric suffixes compare by value instead of lexicographically
 * (e.g. 'A2' before 'A10'). */
function naturalComparePinIds(a: string, b: string): number {
    const aParts = a.match(/(\d+|\D+)/g) ?? [];
    const bParts = b.match(/(\d+|\D+)/g) ?? [];

    const len = Math.max(aParts.length, bParts.length);
    for (let i = 0; i < len; i++) {
        const aPart = aParts[i] ?? '';
        const bPart = bParts[i] ?? '';

        if (aPart === bPart) {
            continue;
        }

        const aIsNumeric = /^\d+$/.test(aPart);
        const bIsNumeric = /^\d+$/.test(bPart);

        if (aIsNumeric && bIsNumeric) {
            const diff = parseInt(aPart, 10) - parseInt(bPart, 10);
            if (diff !== 0) {
                return diff;
            }
        } else if (aPart < bPart) {
            return -1;
        } else if (aPart > bPart) {
            return 1;
        }
    }

    return 0;
}

/** Orders pin ids so that '__'-prefixed/containing values come first,
 * followed by plain numbers (in numeric order), followed by alphanumeric
 * ids in natural order (e.g. 'A1', 'A2', ..., 'A10', 'A20'). */
export function comparePinIds(a: PinId, b: PinId): number {
    const groupA = getPinSortGroup(a);
    const groupB = getPinSortGroup(b);

    if (groupA !== groupB) {
        return groupA - groupB;
    }

    if (groupA === 1) {
        const aValue = a.getType() === PinIdType.Int
            ? a.getValue() as number
            : parseInt(a.getValue() as string, 10);
        const bValue = b.getType() === PinIdType.Int
            ? b.getValue() as number
            : parseInt(b.getValue() as string, 10);

        return aValue - bValue;
    }

    return naturalComparePinIds(a.toString(), b.toString());
}