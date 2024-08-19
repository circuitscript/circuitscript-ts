import { TerminalNode, Token } from "antlr4ng";
import { CircuitScriptLexer } from "./antlr/CircuitScriptLexer";
import { Function_def_exprContext, Create_component_exprContext, 
    Create_graphic_exprContext, Atom_exprContext, Property_key_exprContext, 
    ValueAtomExprContext,
    Assignment_exprContext,
    Import_exprContext,
    Function_args_exprContext,
    Function_call_exprContext,
    Graphic_exprContext} from "./antlr/CircuitScriptParser";
import { BaseVisitor, OnErrorCallback } from "./BaseVisitor";

export class SemanticTokensVisitor extends BaseVisitor {
    /**
     * Generates information about semantic tokens for syntax highlighting
     */

    parsedTokens: IParsedToken[] = [];
    lexer: CircuitScriptLexer;
    script: string;

    semanticTokens: Map<string, IParsedToken> = new Map();

    constructor(silent = false,
        onErrorHandler: OnErrorCallback | null = null,
        currentDirectory: string | null,
        defaultsLibsPath: string,
        lexer: CircuitScriptLexer,
        script: string) {

        super(silent, onErrorHandler, currentDirectory, defaultsLibsPath);

        this.lexer = lexer;
        this.script = script;
    }

    visitFunction_args_expr = (ctx: Function_args_exprContext): void => {
        const IDs = ctx.ID();
        IDs.map(id => {    
            this.addSemanticToken(
                id, ['declaration'], 'parameter',
            )
        });
    }

    visitFunction_call_expr = (ctx: Function_call_exprContext): void => {
        this.addSemanticToken(ctx.ID(), [], 'function');
    }

    visitFunction_def_expr = (ctx: Function_def_exprContext): void => {
        const functionName = ctx.ID().getText();

        this.addSemanticToken(ctx.ID(), ['declaration'], 'function');

        // These are the defined arguments for the function
        const ctxFunctionArgsExpr = ctx.function_args_expr(); 
        if (ctxFunctionArgsExpr) {
            this.visit(ctxFunctionArgsExpr);
        }
        
        // create a new scope and evalutate the functions
        const executionContextName =
            functionName + '_validate';
            
        const newExecutor = this.enterNewChildContext(
            this.executionStack,
            this.getExecutor(),
            executionContextName,
            { netNamespace: "" },
            [],
            []
        );

        this.runExpressions(newExecutor,
            ctx.function_expr());

        // Leave the context
        this.executionStack.pop();
    }

    visitCreate_component_expr = (ctx: Create_component_exprContext): void => {
        this.addSemanticToken(ctx.Create(), ['defaultLibrary'], 'function');

        ctx.property_expr().forEach(property_expr => {
            this.visit(property_expr);
        });
    }

    visitCreate_graphic_expr = (ctx: Create_graphic_exprContext): void => {
        this.addSemanticToken(ctx.Create(), ['defaultLibrary'], 'function');

        ctx.graphic_expr().forEach(graphic_expr => {
            this.visit(graphic_expr);
        });
    }

    visitProperty_key_expr = (ctx: Property_key_exprContext): void => {
        let useValue: TerminalNode | null = null;
        const ctxId = ctx.ID();
        const ctxIntegerValue = ctx.INTEGER_VALUE();
        const ctxStringValue = ctx.STRING_VALUE();

        if (ctxId) {
            useValue = ctxId;
        } else if (ctxIntegerValue) {
            useValue = ctxIntegerValue;
        } else if (ctxStringValue) {
            useValue = ctxStringValue;
        }

        if (useValue) {
            this.addSemanticToken(useValue, [], 'property');
        }
    }

    visitGraphic_expr = (ctx: Graphic_exprContext): void  => {
        let useValue: TerminalNode | null = null;

        const ctxId = ctx.ID();
        const ctxPin = ctx.Pin();

        if (ctxId){
            useValue = ctxId;
        } else if (ctxPin){
            useValue = ctxPin;
        }

        if (useValue){
            this.addSemanticToken(useValue, [], 'property');
        }
    }

    visitValueAtomExpr = (ctx: ValueAtomExprContext): void => {
        const ctxValueExpr = ctx.value_expr();
        const ctxAtomExpr = ctx.atom_expr();

        if (ctxValueExpr) {
            this.visit(ctxValueExpr);
        } else if (ctxAtomExpr) {
            this.visit(ctxAtomExpr);
        }
    }

    visitAssignment_expr = (ctx: Assignment_exprContext): void => {
        this.visit(ctx.atom_expr());
        this.visit(ctx.data_expr());
    }

    visitAtom_expr = (ctx: Atom_exprContext): void => {
        if (ctx.parent instanceof Assignment_exprContext && ctx.ID(0)){
            this.addSemanticToken(ctx.ID(0)!, [], 'variable');
        }
    }

    visitImport_expr = (ctx: Import_exprContext): void => {
        // Do not handle the imported file...
        this.addSemanticToken(ctx.ID(), [], 'namespace');
    }

    addSemanticToken(node: TerminalNode, modifiers: string[], tokenType: string | null = null): void {
        const parsedToken = this.parseToken(node, modifiers, tokenType);
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

    dumpTokens(){
        for(const [id, value] of this.semanticTokens){
            console.log(id, value);
        }
    }

    getTokens(){
        return this.semanticTokens;
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

    path: string,
}

export function prepareTokens(tokens: Token[], lexer: CircuitScriptLexer, 
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