import { CircuitScriptLexer } from './antlr/CircuitScriptLexer.js';
import {
    CircuitScriptParser, Atom_exprContext, Create_component_exprContext,
    Create_graphic_exprContext,
    Function_def_exprContext, Property_key_exprContext, ScriptContext,
    Sub_exprContext
} from './antlr/CircuitScriptParser.js';

import { MainLexer } from './lexer.js';
import { SimpleStopwatch } from './utils.js';
import {
    ANTLRErrorListener, ATNConfigSet, ATNSimulator,
    BitSet, CharStream, CommonTokenStream, DefaultErrorStrategy, DFA, Parser,
    RecognitionException, Recognizer, Token
} from 'antlr4ng';
import { CircuitScriptVisitor } from './antlr/CircuitScriptVisitor.js';
import { BaseVisitor, OnErrorCallback } from './BaseVisitor.js';

export function parseFileWithVisitor(visitor: BaseVisitor, data: string): {
    tree: ScriptContext,
    parser: CircuitScriptParser,
    hasError: boolean, hasParseError: boolean,
    parserTimeTaken: number, lexerTimeTaken: number,
    tokens: IParsedToken[]
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

    // Get all semantic tokens
    const semanticTokenVisitor = new SemanticTokensVisitor(lexer, data);
    semanticTokenVisitor.visit(tree);
    const semanticTokens = semanticTokenVisitor.semanticTokens;

    // Get all tokens
    const parsedTokens = prepareTokens(tokens.tokens, lexer, data);

    const finalParsedTokens:IParsedToken[] = [];
    parsedTokens.forEach(token => {
        const location = `${token.line}_${token.column}`;
        if (semanticTokens.has(location)){
            finalParsedTokens.push(
                semanticTokens.get(location)!!);
        } else{
            finalParsedTokens.push(token);
        }
    });

    return {
        tree, parser,
        hasParseError: false, //errorListener.hasSyntaxErrors(),
        hasError,
        parserTimeTaken,
        lexerTimeTaken,
        tokens: finalParsedTokens,
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


export class SemanticTokensVisitor extends CircuitScriptVisitor<any> {

    parsedTokens: IParsedToken[] = [];
    lexer: CircuitScriptLexer;
    script: string;

    semanticTokens: Map<string, IParsedToken> = new Map();

    constructor(lexer: CircuitScriptLexer,
        script: string) {
        super();
        this.lexer = lexer;
        this.script = script;

    }

    // visit(ctx: ParserRuleContext): any {
    //     const here = this;
    //     if (Array.isArray(ctx)) {
    //         return ctx.map(function (child) {
    //             try {
    //                 here.checkContext(child);
    //                 return child.accept(this);
    //             } catch (err) {
    //                 this.handleError(child, err);
    //             }
    //         }, this);
    //     } else {
    //         try {
    //             this.checkContext(ctx);
    //             return ctx.accept(this);
    //         } catch (err) {
    //             this.handleError(ctx, err);
    //         }
    //     }
    // }

    // handleError(ctx: ParserRuleContext, err: Error){
    //     console.log('error!', err);
    // }

    checkContext(ctx: ParserRuleContext): void {
        if (ctx instanceof Function_def_exprContext) {
            this.addSemanticToken(
                this.parseToken(ctx.ID(), ['declaration'], 'function'));
        } else if (ctx instanceof Create_component_exprContext 
                    || ctx instanceof Create_graphic_exprContext) {
            
            this.addSemanticToken(
                this.parseToken(ctx.Create(), ['defaultLibrary'], 'function'));

        } else if (ctx instanceof Atom_exprContext) {
            if (ctx.ID()) {
                if (ctx.trailer_expr_list().length > 0) {
                    this.addSemanticToken(
                        this.parseToken(
                            ctx.ID(), ['declaration'], 'function'));
                } else {
                    // trailer length is 0
                    this.addSemanticToken(
                        this.parseToken(ctx.ID(), ['declaration'], 'variable')
                    );
                }
            }
        } else if (ctx instanceof Property_key_exprContext) {
            let useToken: TerminalNode | null = null;

            if (ctx.ID()){
                useToken = ctx.ID();
            } else if (ctx.INTEGER_VALUE()){
                useToken = ctx.INTEGER_VALUE();
            } else if (ctx.STRING_VALUE()){
                useToken = ctx.STRING_VALUE();
            }

            useToken && this.addSemanticToken(
                this.parseToken(
                    useToken, ['declaration'], 'property',
                ));
        } else if (ctx instanceof Sub_exprContext) {
            let useToken: TerminalNode | null = null;

            if (ctx.ID()){
                useToken = ctx.ID();
            } else if (ctx.Pin()){
                useToken = ctx.Pin();
            }

            useToken && this.addSemanticToken(
                this.parseToken(useToken, ['defaultLibrary'], 'function')
            )
        }
    }

    addSemanticToken(parsedToken: IParsedToken): void {
        this.semanticTokens.set(parsedToken.line + "_" + parsedToken.column, parsedToken);
    }

    parseToken(node: TerminalNode, modifiers: string[], tokenType: string | null = null): IParsedToken {
        const token = node.symbol;
        let stringValue = "";
        let textPart = "";

        if (this.lexer.symbolicNames[token.type] !== null && this.lexer.symbolicNames[token.type] !== undefined) {
            stringValue = this.lexer.symbolicNames[token.type];
            if (stringValue !== "NEWLINE") {
                textPart = this.script.substring(token.start, token.stop + 1);
            } else {
                textPart = token.text.length-1;
            }
        } else if (this.lexer.literalNames[token.type] !== null && this.lexer.literalNames[token.type] !== undefined) {
            stringValue = this.lexer.literalNames[token.type];
            textPart = this.script.substring(token.start, token.stop + 1);
        } else {
            stringValue = token._text;
        }

        return {
            line: token.line,
            column: token.column,
            length: token.stop - token.start + 1,
            tokenType: tokenType !== null ? tokenType : stringValue,
            tokenModifiers: modifiers,
            textValue: textPart,
        }
    }

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
                    textPart = item.text.length - 1;
                }
            } else if (lexer.literalNames[item.type] !== null && lexer.literalNames[item.type] !== undefined) {
                stringValue = lexer.literalNames[item.type];
                textPart = script.substring(item.start, item.stop + 1);
            } else {
                stringValue = item._text;
            }

            if (textPart !== 0 && textPart !== '') {
                parsedTokens.push({
                    line: item.line,
                    column: item.column,
                    length: item.stop - item.start + 1,
                    tokenType: resolveTokenType(stringValue),
                    tokenModifiers: resolveTokenModifiers(stringValue),
                    textValue: textPart,
                });
            }

            // console.log('line', item.line + ':' + item.column, `\t${stringValue} (${item.type})`.padEnd(30), textPart);
        }
    });

    return parsedTokens;
}

const languageKeywords = [
    'break', 'branch', 'create', 'component',
    'graphic', 'wire', 'pin', 'add', 'at', 'to',
    'point', 'join', 'parallel', 'return', 'def', 'import',
    'true', 'false', 'nc', 'frame',
];

const operatorKeywords = [
    'at', 'to', 'wire', 'add', 'frame', 'join', 'parallel', 'point'
]

function resolveTokenType(tokenType: string): string {
    if (operatorKeywords.indexOf(tokenType.toLowerCase()) !== -1) {
        return 'graphKeyword';

    } else if (languageKeywords.indexOf(tokenType.toLowerCase()) !== -1) {
        return 'keyword';
    } else {
        switch (tokenType) {
            case 'INTEGER_VALUE':
            case 'NUMERIC_VALUE':
            case 'DECIMAL_VALUE':
            case 'PERCENTAGE_VALUE':
                return 'number';
            case 'STRING_VALUE':
                return 'string';
            case 'ID':
                return 'variable';
            case 'Define':
                return 'keyword';
            case 'COMMENT':
                return 'comment';
        }

        return null;
    }
}

function resolveTokenModifiers(tokenType: string): string[] {
    return [];
}

function dumpTokens(tokens: Token[], lexer: CircuitScriptLexer, scriptData: string): void {
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