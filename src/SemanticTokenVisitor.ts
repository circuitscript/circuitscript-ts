import { ParserRuleContext, TerminalNode, Token } from "antlr4ng";
import { CircuitScriptLexer } from "./antlr/CircuitScriptLexer";
import { Function_def_exprContext, Create_component_exprContext, 
    Create_graphic_exprContext, Atom_exprContext, Property_key_exprContext, 
    Sub_exprContext, 
    ValueAtomExprContext,
    Assignment_exprContext,
    Import_exprContext,
    Function_args_exprContext} from "./antlr/CircuitScriptParser";
import { BaseVisitor, OnErrorCallback } from "./BaseVisitor";

export class SemanticTokensVisitor extends BaseVisitor {

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

    visitFunction_args_expr = (ctx: Function_args_exprContext) => {
        // The last <defaultValuesProvided> IDs have default values
        const IDs = ctx.ID(); // Do in reverse
        return IDs.map(id => {
            
            this.addSemanticToken(
                this.parseToken(
                    id, ['declaration'], 'parameter',
                )
            )
        });
    }

    visitFunction_def_expr = (ctx: Function_def_exprContext): void => {

        const functionName = ctx.ID().getText();

        // These are the defined arguments for the function
        if (ctx.function_args_expr()) {
            this.visit(ctx.function_args_expr()!);
        }
        
        this.addSemanticToken(
            this.parseToken(ctx.ID(), ['declaration'], 'function'));

        // create a new scope and evalutate the functions
        const executionContextName =
            functionName + '_validate';

        // const passedInParamsNull = funcDefinedParameters.map((param, index) => {
        //     return ['position', index, null];
        // });

        const newExecutor = this.enterNewChildContext(
            this.executionStack,
            this.getExecutor(),
            executionContextName,
            { netNamespace: "" },
            [],
            []
        )

        // For each funcDefinedParameters, create the variable in scope
        // funcDefinedParameters.forEach(param => {
        //     this.addSemanticToken(
        //         this.parseToken(
                    
        //         )
        //     )
        // });

        this.runExpressions(newExecutor,
            ctx.function_expr());

        // Leave the context
        this.executionStack.pop();
    }

    visitCreate_component_expr = (ctx: Create_component_exprContext) => {
        this.addSemanticToken(
            this.parseToken(ctx.Create(), ['defaultLibrary'], 'function'));

        ctx.property_expr().forEach(property_expr => {
            this.visit(property_expr);
        });
    }

    visitCreate_graphic_expr = (ctx: Create_graphic_exprContext) => {
        this.addSemanticToken(
            this.parseToken(ctx.Create(), ['defaultLibrary'], 'function'));

        ctx.sub_expr().forEach(sub_expr => {
            this.visit(sub_expr);
        });
    }

    visitProperty_key_expr = (ctx: Property_key_exprContext) => {
        let useValue: TerminalNode;
        if (ctx.ID()) {
            useValue = ctx.ID();
        } else if (ctx.INTEGER_VALUE()) {
            useValue = ctx.INTEGER_VALUE();
        } else if (ctx.STRING_VALUE()) {
            useValue = ctx.STRING_VALUE();
        }

        this.addSemanticToken(
            this.parseToken(useValue, [], 'property')
        )
    }

    visitSub_expr = (ctx: Sub_exprContext) => {
        let useValue: TerminalNode;
        if (ctx.ID()){
            useValue = ctx.ID();
        } else if (ctx.Pin()){
            useValue = ctx.Pin();
        }

        this.addSemanticToken(
            this.parseToken(
                useValue, [], 'property'
            )
        )
    }

    visitValueAtomExpr = (ctx: ValueAtomExprContext): ComplexType => {
        let value: ComplexType;
        if (ctx.value_expr()) {
            value = this.visit(ctx.value_expr()!) as ValueType;

        } else if (ctx.atom_expr()) {
            value = this.visit(ctx.atom_expr()!);
        }
    }

    visitAssignment_expr = (ctx: Assignment_exprContext): ComplexType => {
        this.visit(ctx.atom_expr());
        this.visit(ctx.data_expr());
    }

    visitAtom_expr = (ctx: Atom_exprContext): ReferenceType => {
        if (ctx.parent instanceof Assignment_exprContext && ctx.ID()){
            this.addSemanticToken(
                this.parseToken(
                    ctx.ID(), [], 'variable'))
        }
    }

    visitImport_expr = (ctx: Import_exprContext): void => {
        // Do not handle the imported file...
        this.addSemanticToken(
            this.parseToken(
                ctx.ID(), [], 'namespace'
            )
        )
    }


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