/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TerminalNode, Token } from "antlr4ng";
import { CircuitScriptLexer } from "../antlr/CircuitScriptLexer.js";
import { Function_def_exprContext, Create_component_exprContext,
    Create_graphic_exprContext, Callable_exprContext, Property_key_exprContext,
    Assignment_exprContext,
    Function_args_exprContext,
    GraphicCommandExprContext,
    For_exprContext,
    Annotation_comment_exprContext,
    ScriptContext,
    CreateExprContext,
    Import_simpleContext,
    Import_specific_or_allContext,
    At_component_exprContext} from "../antlr/CircuitScriptParser.js";
import { BaseVisitor, OnErrorHandler } from "../BaseVisitor.js";
import { NodeScriptEnvironment } from "../environment/environment.js";
import { SymbolValidatorContext } from "../globals.js";

/**
 * SemanticTokensVisitor - Language Server Protocol (LSP) Semantic Tokens Provider
 * 
 * This visitor extends BaseVisitor to provide semantic highlighting information for CircuitScript
 * source code. It analyzes the Abstract Syntax Tree (AST) to generate semantic tokens that
 * enable rich syntax highlighting in code editors and IDEs.
 * 
 * ## Purpose
 * - Generate semantic token information for LSP-compatible editors
 * - Provide context-aware syntax highlighting beyond basic lexical analysis
 * - Support intelligent highlighting of variables, functions, parameters, properties
 * - Enable better developer experience with CircuitScript code
 * 
 * ## Architecture
 * - Extends BaseVisitor to leverage AST traversal infrastructure
 * - Implements visitor methods for specific AST node types
 * - Maps CircuitScript language constructs to semantic token types
 * - Maintains position information for precise token highlighting
 * 
 * ## Token Types Supported
 * - **Functions**: Function definitions and calls
 * - **Variables**: Variable assignments and references
 * - **Parameters**: Function parameter declarations
 * - **Properties**: Component properties and graphic attributes
 * - **Keywords**: Language keywords and operators
 * - **Namespaces**: Import statements and module references
 * 
 * ## Integration
 * Used by language servers and editor extensions to provide semantic highlighting
 * for CircuitScript (.cst) files in development environments.
 */
export class SemanticTokensVisitor extends BaseVisitor {

    /** Legacy token storage - maintained for compatibility */
    parsedTokens: IParsedToken[] = [];
    
    /** ANTLR lexer instance for token type resolution */
    lexer: CircuitScriptLexer;
    
    /** Original source script for text extraction */
    script: string;

    /** Map of semantic tokens indexed by position (line_column) */
    semanticTokens: Map<string, IParsedToken> = new Map();

    /**
     * Constructs a new SemanticTokensVisitor instance
     * 
     * @param silent - Whether to suppress logging output
     * @param onErrorHandler - Callback for handling parse/execution errors
     * @param environment - Environment abstraction for file system operations
     * @param lexer - ANTLR lexer instance for token analysis
     * @param script - Source script text for token text extraction
     */
    constructor(silent = false,
        onErrorHandler: OnErrorHandler | null = null,
        environment: NodeScriptEnvironment,
        lexer: CircuitScriptLexer,
        script: string) {

        super(silent, onErrorHandler, environment);

        this.lexer = lexer;
        this.script = script;
    }

    //
    // AST Visitor Methods - Handle specific CircuitScript language constructs
    //

    visitScript = async (ctx: ScriptContext): Promise<void> => {
        this.log('===', 'start', '===');

        ctx.import_expr().forEach(ctxImport => {
            this.visit(ctxImport);
        });

        const result = this.runExpressions(this.getExecutor(), ctx.expression());
        this.setResult(ctx, result);

        // If there are open blocks, then close them
        this.getExecutor().closeOpenPathBlocks();

        this.log('===', 'end', '===');
    }

    /**
     * Visits function argument declarations and marks them as parameter tokens
     * Example: def myFunction(param1, param2): ...
     */
    visitFunction_args_expr = (ctx: Function_args_exprContext): void => {
        const IDs = ctx.ID();
        IDs.map(id => {    
            this.addSemanticToken(
                id, ['declaration'], 'parameter',
            )
        });
    }

    /**
     * Visits function definition expressions and creates new execution scope
     * Handles both function name declaration and parameter processing
     * Example: def myFunction(params): body
     */
    visitFunction_def_expr = (ctx: Function_def_exprContext): void => {
        const functionName = ctx.ID().getText();

        // Mark function name as declaration
        this.addSemanticToken(ctx.ID(), ['declaration'], 'function');

        // Process function parameters
        const ctxFunctionArgsExpr = ctx.function_args_expr(); 
        if (ctxFunctionArgsExpr) {
            this.visit(ctxFunctionArgsExpr);
        }
        
        // Create new execution scope for function body validation
        const executionContextName = functionName + SymbolValidatorContext;
            
        const newExecutor = this.enterNewChildContext(
            this.executionStack,
            this.getExecutor(),
            executionContextName,
            { netNamespace: "" },
            [],
            []
        );

        // Visit function body expressions
        this.runExpressions(newExecutor, ctx.function_expr());

        // Exit function scope
        this.executionStack.pop();
    }

    visitCreateExpr = (ctx: CreateExprContext):void => {
        this.visit(ctx.create_expr());
    }

    /**
     * Visits component creation expressions
     * Example: U1 = create component: pins: 10
     */
    visitCreate_component_expr = (ctx: Create_component_exprContext): void => {
        this.visitResult(ctx.properties_block());
    }

    /**
     * Visits graphic creation expressions
     * Example: create graphic: circle center (0, 0) radius 5
     */
    visitCreate_graphic_expr = (ctx: Create_graphic_exprContext): void => {
        this.visitResult(ctx.graphic_expressions_block());
    }

    /**
     * Visits property key expressions in component/graphic definitions
     * Handles ID, INTEGER_VALUE, and STRING_VALUE property keys
     */
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

    /**
     * Visits graphic expressions for drawing commands
     * Example: circle, rect, line, pin, etc.
     */
    visitGraphicCommandExpr = (ctx: GraphicCommandExprContext): void  => {
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

    /**
     * Visits assignment expressions
     * Example: R1 = res(10k)
     */
    visitAssignment_expr = (ctx: Assignment_exprContext): void => {
        this.visit(ctx.callable_expr());
        this.visit(ctx.data_expr());
    }

    /**
     * Visits callable expressions and identifies:
     * - Variable declarations in assignments
     * - Function calls (callable with parameters)
     */
    visitCallable_expr = (ctx: Callable_exprContext): void => {
        const id = ctx.ID();
        if (!id) return;

        // Check if this is a variable declaration (left side of assignment)
        if (ctx.parent instanceof Assignment_exprContext) {
            this.addSemanticToken(id, [], 'variable');
            return;
        }

        // Check if this is a function call (has parentheses trailer)
        const trailers = ctx.trailer();
        if (trailers && trailers.length > 0) {
            // Check if the first trailer is a function call (has LParen)
            const firstTrailer = trailers[0];
            if (firstTrailer.LParen()) {
                this.addSemanticToken(id, [], 'function');
                return;
            }
        }
    }

    /**
     * Visits simple import expressions and marks library name as namespace
     * Example: import "myLibrary"
     */
    visitImport_simple = (ctx: Import_simpleContext): void => {
        // libraryName should be passed as a string
    }

    /**
     * Visits specific/all import expressions and marks library name and imported functions
     * Example: from "myLibrary" import func1, func2
     * Example: from "myLibrary" import *
     */
    visitImport_specific_or_all = (ctx: Import_specific_or_allContext): void => {
        // libraryName should be passed as a string

        // Mark imported function names as functions
        const funcNames = ctx.ID();
        if (funcNames && funcNames.length > 0) {
            funcNames.forEach(funcName => {
                this.addSemanticToken(funcName, ['defaultLibrary'], 'function');
            });
        }
    }

    visitFor_expr = (ctx: For_exprContext): void => {
        ctx.ID().forEach(item => {
            this.addSemanticToken(item, [], 'variable');
        });

        this.visit(ctx.data_expr());
        this.visit(ctx.expressions_block());
    }

    visitAnnotation_comment_expr = (ctx: Annotation_comment_exprContext): void => {
        this.addSemanticToken(ctx.ANNOTATION_START(), [], 'comment');
        const ids = ctx.ID();
        if (ids && ids.length > 0) {
            ids.forEach(id => {
                this.addSemanticToken(id, [], 'comment');
            });
        }
    } 

    //
    // Token Processing Methods
    //

    /**
     * Adds a semantic token to the collection for a given AST node
     * 
     * @param node - ANTLR terminal node containing position and text information
     * @param modifiers - Array of semantic modifiers (e.g., ['declaration', 'readonly'])
     * @param tokenType - Override token type (uses lexer type if null)
     */
    addSemanticToken(node: TerminalNode, modifiers: string[], tokenType: string | null = null): void {
        const parsedToken = this.parseToken(node, modifiers, tokenType);
        this.semanticTokens.set(`${parsedToken.line}_${parsedToken.column}_${parsedToken.length}`, parsedToken);
    }
    
    /**
     * Parses a terminal node into a semantic token with position and type information
     * 
     * @param node - ANTLR terminal node to parse
     * @param modifiers - Semantic modifiers for the token
     * @param tokenType - Optional token type override
     * @returns Parsed token with all semantic information
     */
    parseToken(node: TerminalNode, modifiers: string[], tokenType: string | null = null): IParsedToken {
        const token = node.symbol;
        let stringValue = "";
        let textPart = "";

        // Resolve token type from lexer symbolic names
        if (this.lexer.symbolicNames[token.type] !== null && this.lexer.symbolicNames[token.type] !== undefined) {
            stringValue = this.lexer.symbolicNames[token.type] ?? '';
            if (stringValue !== "NEWLINE") {
                textPart = this.script.substring(token.start, token.stop + 1);
            } else {
                textPart = token.text || '';
            }
        }
        // Resolve token type from lexer literal names
        else if (this.lexer.literalNames[token.type] !== null && this.lexer.literalNames[token.type] !== undefined) {
            stringValue = this.lexer.literalNames[token.type] ?? '';
            textPart = this.script.substring(token.start, token.stop + 1);
        }
        // Fallback to token text
        else {
            stringValue = token.text ?? '';
            textPart = token.text || '';
        }

        return {
            line: token.line,
            column: token.column,
            length: token.stop - token.start + 1,
            tokenType: tokenType !== null ? tokenType : stringValue,
            tokenModifiers: modifiers,
            textValue: textPart,
            path: '',
        }
    }

    //
    // Public API Methods
    //

    /**
     * Debug method to dump all collected semantic tokens to console
     */
    dumpTokens(){
        for(const [id, value] of this.semanticTokens){
            console.log(id, value);
        }
    }

    /**
     * Returns the map of collected semantic tokens
     * @returns Map of semantic tokens indexed by position
     */
    getTokens(){
        return this.semanticTokens;
    }
}

/**
 * Interface representing a parsed semantic token with position and type information
 * Used by Language Server Protocol (LSP) implementations for semantic highlighting
 */
export interface IParsedToken {
    /** Line number in the source file (1-based) */
	line: number;
    
    /** Column number in the source line (0-based) */
	column: number;
    
    /** Length of the token in characters */
	length: number;
    
    /** Semantic token type (function, variable, parameter, etc.) */
	tokenType: string;
    
    /** Array of semantic modifiers (declaration, readonly, etc.) */
	tokenModifiers: string[];

    /** The actual text content of the token */
    textValue: string,

    /** File path (currently unused but part of interface) */
    path: string,
}

/**
 * Utility function to prepare semantic tokens from raw ANTLR tokens
 * Used for basic lexical token analysis without AST context
 * 
 * @param tokens - Array of ANTLR tokens from lexer
 * @param lexer - CircuitScript lexer instance for type resolution
 * @param script - Source script text for token text extraction
 * @returns Array of parsed tokens with basic semantic information
 */
export function prepareTokens(tokens: Token[], lexer: CircuitScriptLexer, 
    script: string): IParsedToken[] {
    
    const parsedTokens: IParsedToken[] = [];

    for (const item of tokens){
        // Skip EOF tokens
        if (item.type !== -1) {
            let stringValue = "";
            let textPart = "";

            // Resolve token type from lexer symbolic names
            if (lexer.symbolicNames[item.type] !== null && lexer.symbolicNames[item.type] !== undefined) {
                stringValue = lexer.symbolicNames[item.type] ?? '';
                if (stringValue !== "NEWLINE") {
                    textPart = script.substring(item.start, item.stop + 1);
                } else {
                    textPart = item.text || '';
                }
            }
            // Fallback to token text
            else {
                stringValue = item.text ?? '';
                textPart = item.text || '';
            }

            // Only add tokens with valid text content
            if (textPart !== '') {
                const tokenType = resolveTokenType(stringValue);

                // Only keep tokens that have a valid type.
                if (tokenType !== ''){
                    parsedTokens.push({
                        line: item.line,
                        column: item.column,
                        length: item.stop - item.start + 1,
                        tokenType: tokenType,
                        tokenModifiers: resolveTokenModifiers(stringValue),
                        textValue: textPart,
                        path: '',
                    });
                }
            }
        }
    }

    return parsedTokens;
}

//
// Token Classification Constants and Functions
//

/** CircuitScript language keywords for basic syntax highlighting */
const languageKeywords = [
    'break', 'branch', 'create', 'component',
    'graphic', 'wire', 'pin', 'add', 'at', 'to',
    'point', 'join', 'parallel', 'return', 'def', 'from', 'import',
    'true', 'false', 'nc', 'sheet', 'frame', 'if', 'else', 'for', 'in',

    /** Circuit graph construction operators for specialized highlighting */
    'at', 'to', 'wire', 'add', 'frame', 'join', 'parallel', 'point'
];

/**
 * Resolves ANTLR token type to semantic token type for syntax highlighting
 * Maps lexer token types to semantic categories for editor highlighting
 *
 * @param tokenType - ANTLR lexer token type name
 * @returns Semantic token type string (defaults to empty string if not recognized)
 */
function resolveTokenType(tokenType: string): string {
    // Circuit graph construction operators and general language keywords
    if (languageKeywords.indexOf(tokenType.toLowerCase()) !== -1) {
        return 'keyword';
    }
    // Specific token type mappings
    else {
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
            case 'BOOLEAN_VALUE':
                return 'keyword';
            case 'COMMENT':
                return 'comment';
        }

        return '';
    }
}

/**
 * Resolves token modifiers for semantic highlighting
 * Currently returns empty array - could be extended for readonly, deprecated, etc.
 * 
 * @param tokenType - ANTLR lexer token type name
 * @returns Array of semantic modifiers (currently empty)
 */
function resolveTokenModifiers(tokenType: string): string[] {
    return [];
}