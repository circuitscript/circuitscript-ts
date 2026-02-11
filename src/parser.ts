/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
    CircuitScriptParser, 
    ScriptContext} from './antlr/CircuitScriptParser.js';

import { MainLexer } from './lexer.js';
import { ParseSyntaxError, RuntimeExecutionError, SimpleStopwatch } from './utils.js';
import {
    ANTLRErrorListener, ATNConfigSet, ATNSimulator,
    BitSet, CharStream, CommonTokenStream, DFA, Parser,
    RecognitionException, Recognizer, Token
} from 'antlr4ng';
import { BaseVisitor, OnErrorHandler } from './BaseVisitor.js';

export async function parseFileWithVisitor(
    visitor: BaseVisitor,
    data: string,
    options?: {
        enableLexerDiagnostics?: boolean;
        enableLexerVerbose?: boolean;
        enableLexerTokenStream?: boolean;
    }
): Promise<{
    tree: ScriptContext,
    parser: CircuitScriptParser,
    tokens: CommonTokenStream,
    lexer: MainLexer,
    hasError: boolean, hasParseError: boolean,
    parserTimeTaken: number, lexerTimeTaken: number,
    throwError: any,
}> {

    const lexerErrorListener = new CircuitscriptParserErrorListener(
        visitor.onErrorHandler);

    const parserErrorListener = new CircuitscriptParserErrorListener(
        visitor.onErrorHandler);

    const chars = CharStream.fromString(data);

    const enableDiagnostics = options?.enableLexerDiagnostics ?? false;
    const enableVerbose = options?.enableLexerVerbose ?? false;
    const enableTokenStream = options?.enableLexerTokenStream ?? false;
    const lexer = new MainLexer(chars, enableDiagnostics);

    // Set source text for character-to-token visualization
    if (enableDiagnostics) {
        lexer.diagnosticCollector.setSourceText(data);
        lexer.diagnosticCollector.setVerboseLogging(enableVerbose);
        if (enableTokenStream) {
            lexer.diagnosticCollector.setRecordTokenStream(true);
        }
    }

    lexer.removeErrorListeners();
    lexer.addErrorListener(lexerErrorListener);

    const lexerTimer = new SimpleStopwatch();
    
    const tokens = new CommonTokenStream(lexer);
    tokens.fill();

    const lexerTimeTaken = lexerTimer.lap();
    const parserTimer = new SimpleStopwatch();

    const parser = new CircuitScriptParser(tokens); 
    parser.removeErrorListeners();
    parser.addErrorListener(parserErrorListener);

    const tree = parser.script();

    let throwError: any;
    let hasError = false;
    let hasParseError = false;

    try {
        await visitor.visitAsync(tree);
    } catch (error) {
        // Error is not handled by the ANTLR parsing code, since the
        // error will have cancelled subsequent parsing.
        if (visitor.onErrorHandler){
            if(error instanceof RuntimeExecutionError){
                visitor.onErrorHandler(error.message, null, error);
            } else {
                throwError = error;
            }
        } 

        hasError = true;
        hasParseError = true;
    }

    const parserTimeTaken = parserTimer.lap();

    return {
        tree, parser,
        tokens,
        lexer,
        hasParseError,
        hasError,
        parserTimeTaken,
        lexerTimeTaken,
        throwError
    };
}

export class CircuitscriptParserErrorListener implements ANTLRErrorListener {

    syntaxErrorCounter = 0;
    onErrorHandler: OnErrorHandler | null = null;

    constructor(onErrorHandler: OnErrorHandler | null = null) {
        this.onErrorHandler = onErrorHandler;
    }

    syntaxError<S extends Token, T extends ATNSimulator>(
        recognizer: Recognizer<T>, offendingSymbol: S | null,
        line: number, column: number, msg: string,
        e: RecognitionException | null): void {

        if (this.onErrorHandler && e) {
            this.onErrorHandler(msg, e.ctx!, e);
        } else {

            if (offendingSymbol && msg.match("extraneous input 'import' expecting")){
                msg = "Invalid import statement";
                throw new ParseSyntaxError("Invalid import statement",
                    offendingSymbol);
            }

            console.log("Syntax error at line", line, ':', column, ' - ', msg);
        }

        this.syntaxErrorCounter++;
    }

    reportAmbiguity(recognizer: Parser, dfa: DFA, startIndex: number,
        stopIndex: number, exact: boolean, ambigAlts: BitSet | undefined,
        configs: ATNConfigSet): void {
        // throw new Error('Method not implemented.');
    }
    reportAttemptingFullContext(recognizer: Parser, dfa: DFA,
        startIndex: number, stopIndex: number,
        conflictingAlts: BitSet | undefined, configs: ATNConfigSet): void {
        // throw new Error('Method not implemented.');
    }
    reportContextSensitivity(recognizer: Parser, dfa: DFA,
        startIndex: number, stopIndex: number, prediction: number,
        configs: ATNConfigSet): void {
        // throw new Error('Method not implemented.');
    }

    hasSyntaxErrors(): boolean {
        return (this.syntaxErrorCounter > 0);
    }
}