import { CharStream, CommonTokenStream, ErrorListener, Token } from 'antlr4';

import CircuitScriptLexer from './antlr/CircuitScriptLexer';
import CircuitScriptParser from './antlr/CircuitScriptParser';

import { MainVisitor } from './visitor';
import { MainLexer } from './lexer';

export function parseFileWithVisitor(visitor: MainVisitor, data: string) {
    const chars = new CharStream(data);
    const lexer = new MainLexer(chars);

    const time0 = new Date();

    const tokens = new CommonTokenStream(lexer);
    tokens.fill();

    const lexerTimeTaken = (new Date()).getTime() - time0.getTime();

    const time1 = new Date();
    const parser = new CircuitScriptParser(tokens);
    // Clear any existing error listeners and use the custom one only
    parser.removeErrorListeners();

    const errorListener = new CircuitscriptParserErrorListener();
    parser.addErrorListener(errorListener);

    const tree = parser.script();

    let hasError = false;

    try {
        visitor.visit(tree);
    } catch (err) {
        console.log('got error:', err);
        hasError = true;
    }

    const parserTimeTaken = (new Date()).getTime() - time1.getTime();

    // dumpTokens(tokens.tokens, lexer, data);
    
    return {
        tree, parser,
        hasParseError: errorListener.hasParseErrors(),
        hasError,
        parserTimeTaken,
        lexerTimeTaken,
    };
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

    syntaxError(recognizer: Recognizer<TSymbol>,
        offendingSymbol: TSymbol,
        line: number,
        column: number,
        msg: string,
        e: RecognitionException | undefined) {
        console.log("Syntax error at line", line, ':', column, ' - ', msg);

        this.syntaxErrorCounter++;
    }

    reportAmbiguity(recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs) {
    }

    reportAttemptingFullContext(recognizer, dfa, startIndex, stopIndex, conflictingAlts, configs) {
    }

    reportContextSensitivity(recognizer, dfa, startIndex, stopIndex, prediction, configs) {
    }

    hasParseErrors(): boolean {
        return (this.syntaxErrorCounter > 0);
    }
}