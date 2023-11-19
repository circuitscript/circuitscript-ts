import { CharStream, CommonTokenStream, ErrorListener } from 'antlr4';

import CircuitScriptParser from './antlr/CircuitScriptParser';
import CircuitScriptLexer from './antlr/CircuitScriptLexer';
import { MainVisitor } from './visitor';

export function parseFileWithVisitor(visitor: MainVisitor, data: string) {
    const time1 = new Date();

    const chars = new CharStream(data);
    const lexer = new CircuitScriptLexer(chars);
    const tokens = new CommonTokenStream(lexer);

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

    const timeTaken = (new Date()) - time1;

    return {
        tree, parser,
        hasParseError: errorListener.hasParseErrors(),
        hasError,
        timeTaken,
    };
}

class CircuitscriptParserErrorListener extends ErrorListener {

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