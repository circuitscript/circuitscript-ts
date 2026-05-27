/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { TerminalNode, Token } from "antlr4ng";
import { Assignment_exprContext, CallableExprContext,
    UnaryOperatorExprContext,
    MultiplyExprContext, AdditionExprContext, BinaryOperatorExprContext,
    Function_def_exprContext,
    For_exprContext,
    Import_simpleContext,
    Import_specific_or_allContext,
    CreateGraphicExprContext,
    TrailerContext} from "../antlr/CircuitScriptParser.js";

import { buildInMethodNamesList } from "../builtinMethods.js";
import { ExecutionContext } from "../execute.js";
import { ComplexType, FunctionDefinedParameter, ImportedLibrary, ImportFunctionHandling, ParseSymbolType } from "../objects/types.js";
import { cloneSymbol, SymbolTableItem, SymbolTableItemDefined } from "./SymbolTable.js";
import { SymbolTable } from "./SymbolTable.js";
import { BaseVisitor } from "../BaseVisitor.js";
import { BaseNamespace, SymbolValidatorContext } from "../globals.js";
import { AllPinTypes } from "../objects/PinTypes.js";

/**
 * @class SymbolValidatorVisitor
 * @brief Primary symbol validation visitor for CircuitScript AST analysis
 *
 * This visitor extends BaseVisitor to perform symbol table construction and
 * validation during AST traversal. It maintains a comprehensive symbol table
 * of variables, functions, and undefined references across different execution
 * contexts and scopes.
 *
 * ## Architecture
 * - **Symbol Table Management**: Maintains hierarchical symbol tables across execution contexts
 * - **Scope Resolution**: Implements lexical scoping with parent context searching
 * - **Validation**: Tracks undefined symbols and validates references
 * - **Function Scoping**: Creates isolated scopes for function definitions
 *
 * ## Symbol Types Supported
 * - **Variables**: Component instances, values, and expressions
 * - **Functions**: User-defined and built-in function definitions
 * - **Undefined**: Unresolved symbol references for error reporting
 *
 * ## Usage
 * Used during the semantic analysis phase to:
 * - Build complete symbol tables for language server features
 * - Validate symbol references before execution
 * - Provide error reporting for undefined symbols
 * - Support code completion and navigation features
 *
 * @see BaseVisitor
 * @see SymbolTable
 * @see ExecutionContext
 */

export class SymbolValidatorVisitor extends BaseVisitor {

    // Disable cache, because everything within import should be parsed.
    enableCacheImports = false;
    enableCachedImportsRead = false;
    enableCachedImportsWrite = false;


    /** @brief Symbol table maintaining all variables, functions, and undefined references */
    symbolTable = new SymbolTable();

    /**
     * @brief Adds a variable symbol to the symbol table in the specified execution context
     *
     * @param name Variable identifier name
     * @param value Variable value or type information
     * @param executor Execution context for scoping (uses current if null)
     *
     * @details
     * Variables are stored with their execution context for proper scoping.
     * The variable can represent component instances, literal values, or
     * complex expressions that have been evaluated.
     */
    protected addSymbolVariable(token: Token, name: string, value: ComplexType,
        executor: ExecutionContext | null = null): void {
        const useExecutor = executor === null ? this.getExecutor() : executor;
        this.symbolTable.addVariable(
            token,
            this.getCurrentFile(),
            useExecutor,
            name,
            value);

        this.log2('add symbol variable: ' + name);
    }

    /**
     * @brief Adds a function symbol to the symbol table with parameter definitions
     *
     * @param functionName Function identifier name
     * @param funcDefinedParameters Array of function parameter definitions
     *
     * @details
     * Function symbols store their parameter signatures for validation of
     * function calls. Only adds the function if it doesn't already exist
     * in the current scope to prevent redefinition errors.
     */
    protected addSymbolFunction(token: Token, functionName: string,
        funcDefinedParameters: FunctionDefinedParameter[]): void {
        if (!this.symbolTable.exists(this.getExecutor(), functionName)) {
            this.symbolTable.addFunction(
                token,
                this.getCurrentFile(),
                this.getExecutor(),
                functionName,
                funcDefinedParameters);

            this.log2('add symbol function: ' + functionName);
        }
    }

    /**
     * @brief Handles symbol resolution for atomic identifiers with scope traversal
     *
     * @param atom Terminal node containing the identifier text
     * @return SymbolTableItem representing the resolved or undefined symbol
     *
     * @details
     * Implements lexical scoping by:
     * 1. Checking current execution context for the symbol
     * 2. Searching parent contexts if not found locally
     * 3. Creating an undefined symbol entry if not found anywhere
     *
     * This enables proper variable shadowing and scope resolution while
     * tracking undefined references for error reporting.
     */
    protected handleAtomSymbol(atom: TerminalNode): SymbolTableItem {
        const atomId = atom.getText();
        const executor = this.getExecutor();

        let tmpSymbol: SymbolTableItem;

        if (this.symbolTable.exists(executor, atomId)) {
            tmpSymbol = this.symbolTable.get(executor, atomId);
        } else {
            if (buildInMethodNamesList.indexOf(atomId) !== -1) {
                // If it's built-in method and the symbol does not exist
                // in the symbol table yet, then add it
                tmpSymbol = this.symbolTable.addFunction(
                    null,
                    "<builtIn>", // Builtin function does not have a file defined.
                    this.getRootExecutor(),
                    atomId, {});
            } else {
                const foundContext = this.symbolTable.searchParentContext(executor, atomId);
                if (foundContext === null) {
                    // Undefined symbol is found, save it too
                    tmpSymbol = this.symbolTable.addUndefined(
                        this.getCurrentFile(), executor, atomId, 
                            atom.getSymbol());
                    this.log2('symbol not found: ' + atomId);
                } else {
                    tmpSymbol = this.symbolTable.get(foundContext, atomId);
                }
            }
        }

        if (tmpSymbol.type !== ParseSymbolType.Undefined){
            this.addSymbolInstance(tmpSymbol, atom.getSymbol());
        }
        
        return tmpSymbol;
    }

    protected addSymbolInstance(symbol: SymbolTableItem, token: Token){
        symbol = symbol as SymbolTableItemDefined;
        if (symbol.instances.indexOf(token) == -1){
            symbol.instances.push(token);
        }
    }

    /**
     * @brief Sets the symbol table for this visitor instance
     * @param symbolTable Pre-constructed symbol table to use
     */
    setSymbols(symbolTable: SymbolTable): void {
        this.symbolTable = symbolTable;
    }

    //
    // AST Visitor Methods - Symbol table construction and validation
    //
    
    private importCommon(ctx: Import_simpleContext | Import_specific_or_allContext,
        handling: ImportFunctionHandling): void {

        const specifiedImports: string[] = [];

        if (ctx instanceof Import_specific_or_allContext) {
            const tmpImports = ctx._funcNames.map(item => {
                return item.text!;
            });
            specifiedImports.push(...tmpImports);
        }

        const id = ctx._libraryName!.text!.slice(1, -1);
        const { pathExists, importedLibrary } =
            this.handleImportFile(id, handling,
                true, ctx, specifiedImports);

        if (!pathExists) {
            this.symbolTable.addUndefined(
                this.getCurrentFile(), this.getExecutor(), id,
                ctx._libraryName!);
        } else {
            this.applyLibraryImports(importedLibrary);
        }
    }

    visitImport_simple = (ctx: Import_simpleContext): void => {
        this.importCommon(ctx, ImportFunctionHandling.AllWithNamespace);
    }
    
    visitImport_specific_or_all = (ctx: Import_specific_or_allContext): void => {
        let importType = ImportFunctionHandling.SpecificMergeIntoNamespace;
        if (ctx._all){
            importType = ImportFunctionHandling.AllMergeIntoNamespace
        }

        this.importCommon(ctx, importType);
    }

    /**
     * Add library function imports into the symbolTable based on the import handling.
     * @param library
     */
    private applyLibraryImports(library: ImportedLibrary): void {
        const { importHandlingFlag: importHandling, specifiedImports } = library;

        const addedSymbols: [key:string, symbol: SymbolTableItemDefined][] = [];

        const executor = this.getExecutor();

        const symbolTable = this.symbolTable.getSymbols();
        symbolTable.forEach((value, key) => {
            if (value.type === ParseSymbolType.Function) {
                const definedSymbol = (value as SymbolTableItemDefined);
                // The symbol is part of the library
                if (definedSymbol.fileName === library.libraryFilePath) {

                    const addSymbolToNamespace = importHandling === ImportFunctionHandling.AllMergeIntoNamespace
                        || (
                            importHandling === ImportFunctionHandling.SpecificMergeIntoNamespace
                            && specifiedImports.indexOf(definedSymbol.id) !== -1
                        );

                    if (addSymbolToNamespace) {
                        const funcPath = `${BaseNamespace}${definedSymbol.id}`;

                        // Clone symbol and update the context, so that it is 
                        // not the import context, but the main
                        const tmpSymbol = cloneSymbol(value);
                        tmpSymbol.context = executor;

                        addedSymbols.push([funcPath, tmpSymbol]);
                    }
                }
            }
        });

        addedSymbols.forEach(item => {
            const [key, value] = item;
            symbolTable.set(key, value);
        });
    }

    /**
     * @brief Visits assignment expressions and adds variables to symbol table
     * @param ctx Assignment expression context
     * @return null (assignments don't return values)
     *
     * @details
     * Processes variable assignments by evaluating the right-hand side expression
     * and creating a symbol table entry for the assigned variable.
     *
     * Example: `R1 = res(10k)`
     */
    visitAssignment_expr = (ctx: Assignment_exprContext): ComplexType => {
        const ctxDataExpr = ctx.data_expr();
        this.visit(ctxDataExpr);
        const value = this.getResult(ctxDataExpr) as ComplexType;
        
        const atomId = ctx.callable_expr().ID();
        const atomText = atomId.getText();
        const executor = this.getExecutor();

        if (!this.symbolTable.exists(executor, atomText)){
            // If the symbol does not exist yet, then create it.
            this.addSymbolVariable(atomId.getSymbol(), atomId.getText(), value);
        } else {
            // If symbol is already defined, then add this as an instance, and
            // do not overwrite the existing symbol. In circuitscript, there is
            // no specific keyword for variable declaration, so the very first
            // instance of variable assignment will be used.
            const tmpSymbol = this.symbolTable.get(executor, atomText);
            this.addSymbolInstance(tmpSymbol, atomId.getSymbol()); 
        }
        
        return null;
    };

    /**
     * @brief Visits callable expressions (variable references and function calls)
     * @param ctx CallableExpr context from data_expr labeled alternative
     *
     * @details
     * Handles both simple variable references (`f`) and function calls (`res(10k)`)
     * since both parse as `callable_expr` in the grammar. Resolves the symbol
     * and visits any call parameters for scope analysis.
     */
    visitCallableExpr = (ctx: CallableExprContext): void => {
        const innerCtx = ctx.callable_expr();

        const innerCtxID = innerCtx.ID();
        if (AllPinTypes.indexOf(innerCtxID.getText()) !== -1 && innerCtx.trailer().length === 0) {
            // Ignore pin types constants.
            return;
        } else {
            const tmpSymbol = this.handleAtomSymbol(innerCtxID);
            innerCtx.trailer().forEach(trailer => {
                if (trailer.LParen() && trailer.RParen()) {
                    
                    const params = trailer.parameters();
                    if (params) {
                        this.visit(params);
                    }
                }
            });
    
            this.setResult(ctx, tmpSymbol);
        }
    };

    /**
     * @brief Visits unary operator expressions and validates operands
     * @param ctx Unary operator expression context
     *
     * @details
     * Processes unary operators (e.g., -x, +x) by visiting the operand expression
     * to ensure proper symbol validation.
     */
    visitUnaryOperatorExpr = (ctx: UnaryOperatorExprContext): void => {
        this.visit(ctx.data_expr());
    };

    /**
     * @brief Visits multiplication expressions and validates both operands
     * @param ctx Multiply expression context
     *
     * @details
     * Processes multiplication and division operations by visiting both
     * operand expressions to ensure symbol validation.
     */
    visitMultiplyExpr = (ctx: MultiplyExprContext): void => {
        this.visit(ctx.data_expr(0)!);
        this.visit(ctx.data_expr(1)!);
    };

    /**
     * @brief Visits addition expressions and validates both operands
     * @param ctx Addition expression context
     *
     * @details
     * Processes addition and subtraction operations by visiting both
     * operand expressions to ensure symbol validation.
     */
    visitAdditionExpr = (ctx: AdditionExprContext): void => {
        this.visit(ctx.data_expr(0)!);
        this.visit(ctx.data_expr(1)!);
    };

    /**
     * @brief Visits binary operator expressions and validates both operands
     * @param ctx Binary operator expression context
     *
     * @details
     * Processes binary comparison and logical operations by visiting both
     * operand expressions to ensure symbol validation.
     */
    visitBinaryOperatorExpr = (ctx: BinaryOperatorExprContext): void => {
        this.visit(ctx.data_expr(0)!);
        this.visit(ctx.data_expr(1)!);
    };

    /**
     * @brief Visits function definition expressions and creates isolated scopes
     * @param ctx Function definition expression context
     *
     * @details
     * Processes function definitions by:
     * 1. Adding the function symbol to the current scope
     * 2. Creating a new execution context for the function body
     * 3. Adding parameter symbols to the function scope
     * 4. Validating the function body expressions
     * 5. Restoring the previous execution context
     *
     * This ensures proper scoping for function parameters and local variables.
     *
     * Example: `def myFunction(param1, param2): body`
     */
    visitFunction_def_expr = (ctx: Function_def_exprContext): void => {
        const functionName = ctx.ID().getText();
        
        // Process function parameter definitions
        let funcDefinedParameters: FunctionDefinedParameter[] = [];
        const ctxFunctionArgsExpr = ctx.function_args_expr();
        if (ctxFunctionArgsExpr) {
            this.visit(ctxFunctionArgsExpr);
            funcDefinedParameters = this.getResult(ctxFunctionArgsExpr);
        }

        this.addSymbolFunction(ctx.ID().getSymbol(), 
            functionName, funcDefinedParameters);

        // Create isolated execution context for function validation
        const executionContextName = functionName + SymbolValidatorContext;

        const passedInParamsNull = funcDefinedParameters.map((param, index) => {
            return ['position', index, null];
        });

        const newExecutor = this.enterNewChildContext(
            this.executionStack,
            this.getExecutor(),
            executionContextName,
            { netNamespace: "" },
            funcDefinedParameters,
            passedInParamsNull
        );

        // Add function parameters as variables in the function scope
        funcDefinedParameters.forEach(param => {
            this.addSymbolVariable(
                param[1], // Add token value
                param[0],
                null,
                newExecutor
            );
        });

        // Validate function body expressions in isolated scope
        this.runExpressions(newExecutor, ctx.function_expr());

        // Restore previous execution context
        this.executionStack.pop();
    };

    visitFor_expr = (ctx: For_exprContext): void => {
        ctx.ID().forEach(item => {
            this.addSymbolVariable(item.getSymbol(), item.getText(), null);
        });
    }

    visitCreateGraphicExpr = (ctx: CreateGraphicExprContext): void => {
        const ctxID = ctx.ID();
        if (ctxID){
            this.addSymbolVariable(ctxID.getSymbol(), ctxID.getText(), null);
        }
    }
    
    visitTrailer = (ctx: TrailerContext): void => {
        // Do nothing
    }

    //
    // Public API Methods
    //
    /**
     * @brief Returns the symbol table containing all validated symbols
     * @return SymbolTable with variables, functions, and undefined references
     */
    getSymbols() {
        return this.symbolTable;
    }

    /**
     * @brief Debug method to dump all symbols to console
     *
     * @details
     * Outputs all symbol table entries for debugging and development.
     * Useful for understanding symbol resolution and scope issues.
     */
    dumpSymbols() {
        this.symbolTable.dumpSymbols();
    }
}
