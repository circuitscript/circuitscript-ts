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
import { SimpleStopwatch } from './utils.js';
import {
    ANTLRErrorListener, ATNConfigSet, ATNSimulator,
    BitSet, CharStream, CommonTokenStream, DFA, Parser,
    RecognitionException, Recognizer, Token
} from 'antlr4ng';
import { BaseVisitor, OnErrorCallback } from './BaseVisitor.js';

export function parseFileWithVisitor(visitor: BaseVisitor, data: string): {
    tree: ScriptContext,
    parser: CircuitScriptParser,
    hasError: boolean, hasParseError: boolean,
    parserTimeTaken: number, lexerTimeTaken: number
} {

    const lexerErrorListener = new CircuitscriptParserErrorListener(
        visitor.onSyntaxErrorHandler);

    const parserErrorListener = new CircuitscriptParserErrorListener(
        visitor.onParseErrorHandler);
    
    const chars = CharStream.fromString(data);

    const lexer = new MainLexer(chars);
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
    try {
        visitor.visit(tree);
    } catch (error) {
        // Error is not handled by the ANTLR parsing code, since the
        // error will have cancelled subsequent parsing.
        
        // if (error instanceof ParseError) {
        //     visitor.onParseErrorHandler(
        //         error.line, error.column, error.message, error);
        // }
        console.log(error);
    }

    const parserTimeTaken = parserTimer.lap();

    return {
        tree, parser,
        hasParseError: false,   // TODO: remove this?
        hasError: false,               // TODO: remove this?
        parserTimeTaken,
        lexerTimeTaken,
    };
}

export class CircuitscriptParserErrorListener implements ANTLRErrorListener {

    syntaxErrorCounter = 0;
    onErrorHandler: OnErrorCallback | null = null;

    constructor(onErrorHandler: OnErrorCallback | null = null) {
        this.onErrorHandler = onErrorHandler;
    }

    syntaxError<S extends Token, T extends ATNSimulator>(
        recognizer: Recognizer<T>, offendingSymbol: S | null,
        line: number, column: number, msg: string,
        e: RecognitionException | null): void {

        if (this.onErrorHandler) {
            this.onErrorHandler(line, column, msg, e);
        } else {
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