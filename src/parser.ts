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
    BitSet, CharStream, CommonTokenStream, DefaultErrorStrategy, DFA, Parser,
    RecognitionException, Recognizer, Token
} from 'antlr4ng';
import { BaseVisitor, OnErrorCallback } from './BaseVisitor.js';

export function parseFileWithVisitor(visitor: BaseVisitor, data: string): {
    tree: ScriptContext,
    parser: CircuitScriptParser,
    hasError: boolean, hasParseError: boolean,
    parserTimeTaken: number, lexerTimeTaken: number
} {
    const chars = CharStream.fromString(data);
    const lexer = new MainLexer(chars);

    const lexerTimer = new SimpleStopwatch();

    const tokens = new CommonTokenStream(lexer);
    tokens.fill();

    const lexerTimeTaken = lexerTimer.lap();

    const parserTimer = new SimpleStopwatch();
    const parser = new CircuitScriptParser(tokens);
    // parser.errorHandler = new TempErrorStrategy();

    // // Clear any existing error listeners and use the custom one only
    // // @ts-ignore
    // parser.removeErrorListeners();

    // const errorListener = new CircuitscriptParserErrorListener(
    //     visitor.onErrorCallbackHandler);
    
    // // // @ts-ignore
    // parser.addErrorListener(errorListener);

    const tree = parser.script();

    let hasError = false;

    try {
        visitor.visit(tree);
    } catch (err){
        // Error should be internally handled in visitor
        console.log(err);
        hasError = true;
    }
    
    const parserTimeTaken = parserTimer.lap();

    return {
        tree, parser,
        hasParseError: false, //errorListener.hasSyntaxErrors(),
        hasError,
        parserTimeTaken,
        lexerTimeTaken,
    };
}

export class TempErrorStrategy extends DefaultErrorStrategy {
    // reset(recognizer: Parser): void {
    //     throw new Error('Method not implemented.');
    // }
    // recoverInline(recognizer: Parser): Token {
    //     throw new Error('Method not implemented.');
    // }
    recover(recognizer: Parser, e: RecognitionException): void {
        throw new Error('Method not implemented.');
    }
    // sync(recognizer: Parser): void {
    //     throw new Error('Method not implemented.');
    // }
    // reportMatch(recognizer: Parser): void {
    //     throw new Error('Method not implemented.');
    // }
    reportError(recognizer: Parser, e: RecognitionException): void {
        throw new Error('Method not implemented.');
    }
}


// function dumpTokens(tokens: Token[], lexer: CircuitScriptLexer, scriptData: string): void {
//     tokens.forEach(item => {
//         if (item.type !== -1) {
//             let stringValue = "";
//             let textPart = "";

//             if (lexer.symbolicNames[item.type] !== null && lexer.symbolicNames[item.type] !== undefined) {
//                 stringValue = lexer.symbolicNames[item.type];
//                 if (stringValue !== "NEWLINE") {
//                     textPart = scriptData.substring(item.start, item.stop + 1);
//                 } else {
//                     textPart = item.text.length-1;
//                 }
//             } else if (lexer.literalNames[item.type] !== null && lexer.literalNames[item.type] !== undefined) {
//                 stringValue = lexer.literalNames[item.type];
//                 textPart = scriptData.substring(item.start, item.stop + 1);
//             } else {
//                 stringValue = item._text;
//             }

//             console.log('line', item.line + ':' + item.column, `\t${stringValue} (${item.type})`.padEnd(30), textPart);
//         }
//     });
// }

export class CircuitscriptParserErrorListener implements ANTLRErrorListener {

    syntaxErrorCounter = 0;
    onErrorHandler: OnErrorCallback | null = null;

    constructor(onErrorHandler: OnErrorCallback | null = null) {
        this.onErrorHandler = onErrorHandler;
    }
    syntaxError<S extends Token, T extends ATNSimulator>(
        recognizer: Recognizer<T>, offendingSymbol: S | null, 
        line: number, charPositionInLine: number, msg: string, 
        e: RecognitionException | null): void {
        
        if (this.onErrorHandler) {
            this.onErrorHandler(line, charPositionInLine, msg, e);
        } else {
            console.log("Syntax error at line", line, ':', charPositionInLine, ' - ', msg);
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