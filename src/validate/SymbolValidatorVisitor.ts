import { TerminalNode, Token } from "antlr4ng";
import { Import_exprContext, Assignment_exprContext, Atom_exprContext, 
    Function_call_exprContext, ValueAtomExprContext, UnaryOperatorExprContext, 
    MultiplyExprContext, AdditionExprContext, BinaryOperatorExprContext, 
    DataExprContext, Function_def_exprContext } from "src/antlr/CircuitScriptParser";

import { buildInMethodNamesList } from "../builtinMethods";
import { ExecutionContext } from "../execute";
import { ComplexType, FunctionDefinedParameter, ParseSymbolType, ValueType } from "../objects/types";
import { SymbolTableItem, SymbolTableItemDefined } from "./SymbolTable";
import { SymbolTable } from "./SymbolTable";
import { BaseVisitor } from "../BaseVisitor";
import { SymbolValidatorContext } from "../globals";

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

    /** @brief Symbol table maintaining all variables, functions, and undefined references */
    symbolTable = new SymbolTable();

    filePathStack: string[] = [];

    enterFile(filePath: string): void {
        this.filePathStack.push(filePath);
    }

    exitFile(): void {
        this.filePathStack.pop();
    }

    getCurrentFile(): string {
        return this.filePathStack[this.filePathStack.length - 1];
    }

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
                        this.getCurrentFile(), executor, atomId, atom);
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
    /**
     * @brief Visits import expressions and validates imported file existence
     * @param ctx Import expression context containing filename
     *
     * @details
     * Validates that imported files exist and are accessible. Adds undefined
     * symbol entries for missing imports to enable error reporting.
     *
     * Example: `import myLibrary`
     */
    visitImport_expr = (ctx: Import_exprContext): void => {
        const ID = ctx.ID().toString(); // filename
        const { pathExists } = this.handleImportFile(ID, false, ctx);

        if (!pathExists) {
            this.symbolTable.addUndefined(
                this.getCurrentFile(), this.getExecutor(), ID, ctx.ID());
        }
    };

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
        
        const atomId = ctx.atom_expr().ID(0)!;
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
     * @brief Visits atomic expressions and resolves symbol references
     * @param ctx Atom expression context containing identifier
     *
     * @details
     * Handles variable and function name references by looking up symbols
     * in the symbol table with proper scope resolution.
     */
    visitAtom_expr = (ctx: Atom_exprContext): void => {
        const tmpSymbol = this.handleAtomSymbol(ctx.ID(0)!);
        this.setResult(ctx, tmpSymbol);
    };

    /**
     * @brief Visits function call expressions and validates function symbols
     * @param ctx Function call expression context
     *
     * @details
     * Validates function references and processes function parameters.
     * Ensures that called functions exist in the symbol table and validates
     * parameter expressions.
     *
     * Example: `print("hello")` or `res(10k)`
     */
    visitFunction_call_expr = (ctx: Function_call_exprContext): void => {
        this.handleAtomSymbol(ctx.ID()!);

        if (ctx.trailer_expr().length > 0) {
            ctx.trailer_expr().forEach(item => {
                if (item.OPEN_PAREN() && item.CLOSE_PAREN()) {
                    const params = item.parameters();
                    if (params) {
                        this.visit(params);
                    }
                }
            });
        }
    };

    /**
     * @brief Visits value-atom expressions and delegates to appropriate handlers
     * @param ctx ValueAtom expression context
     *
     * @details
     * Handles expressions that can be either literal values or atom references.
     * Delegates to the appropriate visitor method based on the expression type.
     */
    visitValueAtomExpr = (ctx: ValueAtomExprContext): void => {
        let value: ComplexType | null = null;
        const ctxValueExpr = ctx.value_expr();
        const cxtAtomExpr = ctx.atom_expr();

        if (ctxValueExpr) {
            this.visit(ctxValueExpr);
            value = this.getResult(ctxValueExpr) as ValueType;

        } else if (cxtAtomExpr) {
            this.visit(cxtAtomExpr);
            value = this.getResult(cxtAtomExpr);
        }

        this.setResult(ctx, value);
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
     * @brief Visits data expressions (base case for expression hierarchy)
     * @param ctx Data expression context
     *
     * @details
     * Base visitor method for data expressions. Currently a no-op as
     * specific expression types are handled by their respective visitors.
     */
    visitDataExpr = (ctx: DataExprContext): void => {
        return;
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
