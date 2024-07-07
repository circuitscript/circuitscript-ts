import { CharStream, CommonTokenStream, ErrorListener, Token } from 'antlr4';

import CircuitScriptLexer from './antlr/CircuitScriptLexer.js';
import CircuitScriptParser, { ScriptContext } from './antlr/CircuitScriptParser.js';

import { MainVisitor } from './visitor.js';
import { MainLexer } from './lexer.js';
import { SimpleStopwatch } from './utils.js';

export function parseFileWithVisitor(visitor: MainVisitor, data: string): {
    tree: ScriptContext,
    parser: CircuitScriptParser, 
    hasError: boolean, hasParseError: boolean,
    parserTimeTaken: number, lexerTimeTaken: number,
    tokens: IParsedToken[],
} {
    const chars = new CharStream(data);
    const lexer = new MainLexer(chars);

    const lexerTimer = new SimpleStopwatch();

    const tokens = new CommonTokenStream(lexer);
    tokens.fill();

    const lexerTimeTaken = lexerTimer.lap();

    const parserTimer = new SimpleStopwatch();
    const parser = new CircuitScriptParser(tokens);
    // Clear any existing error listeners and use the custom one only
    // @ts-ignore
    parser.removeErrorListeners();

    const errorListener = new CircuitscriptParserErrorListener();
    // @ts-ignore
    parser.addErrorListener(errorListener);

    const tree = parser.script();

    let hasError = false;

    try {
        visitor.visit(tree);
    } catch (err){
        // Error should be internally handled in visitor
        err.print(data);
        hasError = true;
    }

    const parserTimeTaken = parserTimer.lap();
    const parsedTokens = prepareTokens(tokens.tokens, lexer, data);
    
    return {
        tree, parser,
        hasParseError: errorListener.hasParseErrors(),
        hasError,
        parserTimeTaken,
        lexerTimeTaken,
        tokens: parsedTokens,
    };
}

export interface IParsedToken {
	line: number;
	column: number;
	length: number;
	tokenType: string;
	tokenModifiers: string[];
    // vsTokenType: string | null;

    textValue: string,
}

function prepareTokens(tokens: Token[], lexer: CircuitScriptLexer, 
    script: string): IParsedToken[] {
    
    const parsedTokens: IParsedToken[] = [];

    tokens.forEach(item => {
        if (item.type !== -1) {
            let stringValue = "";
            let textPart = "";

            if (lexer.symbolicNames[item.type] !== null && lexer.symbolicNames[item.type] !== undefined) {
                stringValue = lexer.symbolicNames[item.type];
                if (stringValue !== "NEWLINE") {
                    textPart = script.substring(item.start, item.stop + 1);
                } else {
                    textPart = item.text.length-1;
                }
            } else if (lexer.literalNames[item.type] !== null && lexer.literalNames[item.type] !== undefined) {
                stringValue = lexer.literalNames[item.type];
                textPart = script.substring(item.start, item.stop + 1);
            } else {
                stringValue = item._text;
            }

            // console.log(item);

            parsedTokens.push({
                line: item.line,
                column: item.column,
                length: item.stop - item.start + 1,
                tokenType: stringValue,
                tokenModifiers: [''],
                textValue: textPart,
            })

            // console.log('line', item.line + ':' + item.column, `\t${stringValue} (${item.type})`.padEnd(30), textPart);
        }
    });

    return parsedTokens;
}

function dumpTokens(tokens:Token[], lexer: CircuitScriptLexer, scriptData: string): void {
    tokens.forEach(item => {
        if (item.type !== -1) {
            let stringValue = "";
            let textPart = "";

            if (lexer.symbolicNames[item.type] !== null && lexer.symbolicNames[item.type] !== undefined) {
                stringValue = lexer.symbolicNames[item.type];
                if (stringValue !== "NEWLINE") {
                    textPart = scriptData.substring(item.start, item.stop + 1);
                } else {
                    textPart = item.text.length-1;
                }
            } else if (lexer.literalNames[item.type] !== null && lexer.literalNames[item.type] !== undefined) {
                stringValue = lexer.literalNames[item.type];
                textPart = scriptData.substring(item.start, item.stop + 1);
            } else {
                stringValue = item._text;
            }

            console.log('line', item.line + ':' + item.column, `\t${stringValue} (${item.type})`.padEnd(30), textPart);
        }
    });
}

export class CircuitscriptParserErrorListener extends ErrorListener {

    syntaxErrorCounter = 0;

    syntaxError(recognizer: any, offendingSymbol: any,
        line: number, column: number, msg: string, e: any | undefined) {
        console.log("Syntax error at line", line, ':', column, ' - ', msg);

        this.syntaxErrorCounter++;
    }

    // reportAmbiguity(recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs) {
    // }

    // reportAttemptingFullContext(recognizer, dfa, startIndex, stopIndex, conflictingAlts, configs) {
    // }

    // reportContextSensitivity(recognizer, dfa, startIndex, stopIndex, prediction, configs) {
    // }

    hasParseErrors(): boolean {
        return (this.syntaxErrorCounter > 0);
    }
}