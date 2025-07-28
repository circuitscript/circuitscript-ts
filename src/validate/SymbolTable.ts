import { TerminalNode, Token } from "antlr4ng";
import { ExecutionContext } from "../execute";
import { FunctionDefinedParameter, ParseSymbolType, ValueType } from "../objects/types";

/**
 * @class SymbolTable
 * @brief Hierarchical symbol table for CircuitScript language constructs
 *
 * This class manages a comprehensive symbol table that tracks variables,
 * functions, and undefined references across different execution contexts
 * with proper scoping and namespace management.
 *
 * ## Features
 * - **Hierarchical Scoping**: Supports nested execution contexts
 * - **Symbol Types**: Variables, functions, and undefined references
 * - **Namespace Management**: Context-aware symbol resolution
 * - **Parent Context Search**: Lexical scoping with scope traversal
 * - **Debugging Support**: Symbol dumping and introspection
 *
 * ## Architecture
 * Symbols are stored with composite keys combining execution context
 * namespace and symbol identifier, enabling proper scoping and preventing
 * name collisions between different contexts.
 *
 * @see SymbolTableItem
 * @see ExecutionContext
 * @see ParseSymbolType
 */


export class SymbolTable {

    /** @brief Internal storage for symbol table entries */
    protected symbols: Map<string, SymbolTableItem> = new Map();

    /** @brief List of execution context namespaces for tracking */
    executonContextsNamespaces: string[] = [];

    /**
     * @brief Returns the internal symbol map for inspection
     * @return Map containing all symbol table entries
     */
    getSymbols(): Map<string, SymbolTableItem> {
        return this.symbols;
    }

    /**
     * @brief Adds a function symbol to the table
     * @param executionContext Execution context for scoping
     * @param id Function identifier name
     * @param funcDefinedParameters Function parameter definitions
     * @return Created SymbolTableItem for the function
     *
     * @details
     * Function symbols store parameter signatures for call validation
     * and overload resolution. Functions are scoped to their defining
     * execution context.
     */
    addFunction(token: Token | null, fileName: string, executionContext: ExecutionContext, id: string,
        funcDefinedParameters: FunctionDefinedParameter[]): SymbolTableItem {
        return this.add(
            fileName,
            executionContext,
            id,
            ParseSymbolType.Function,
            {
                funcDefinedParameters
            },
            token,
        );
    }

    /**
     * @brief Adds a variable symbol to the table
     * @param executionContext Execution context for scoping
     * @param id Variable identifier name
     * @param variableValue Variable value or type information
     * @return Created SymbolTableItem for the variable
     *
     * @details
     * Variable symbols can represent component instances, literal values,
     * or complex expressions. Variables are scoped to their defining
     * execution context and can shadow parent context variables.
     */
    addVariable(token: Token, fileName: string, executionContext: ExecutionContext, id: string,
        variableValue: SymbolTableItem | ValueType | null
    ): SymbolTableItem {
        return this.add(
            fileName,
            executionContext,
            id,
            ParseSymbolType.Variable,
            {
                variableValue
            },
            token
        );
    }

    /**
     * @brief Adds an undefined symbol reference for error reporting
     * @param executionContext Execution context where reference occurs
     * @param id Undefined identifier name
     * @param node AST node reference for error location
     * @return Created SymbolTableItem for the undefined reference
     *
     * @details
     * Undefined symbols track unresolved references for comprehensive
     * error reporting. The AST node reference enables precise error
     * location reporting with line/column information.
     */
    addUndefined(filePath: string, executionContext: ExecutionContext, 
        id: string, token: Token): SymbolTableItem {
        
        return this.add(
            filePath,
            executionContext,
            id,
            ParseSymbolType.Undefined,
            {},
            token
        );
    }

    /**
     * @brief Internal method to add symbols to the table with namespace tracking
     * @param executionContext Execution context for scoping
     * @param id Symbol identifier name
     * @param type Symbol type (Variable, Function, Undefined)
     * @param extra Additional symbol metadata
     * @return Created SymbolTableItem instance
     *
     * @details
     * Core symbol addition method that:
     * 1. Tracks execution context namespaces
     * 2. Creates composite symbol keys for proper scoping
     * 3. Stores symbols with full metadata
     * 4. Returns the created symbol item
     */
    add(fileName: string, executionContext: ExecutionContext, id: string,
        type: ParseSymbolType, extra: SymbolTableItemExtra, token: Token | null): SymbolTableItem {

        // Track execution contexts for namespace management
        if (this.executonContextsNamespaces.indexOf(executionContext.namespace) === -1) {
            this.executonContextsNamespaces.push(executionContext.namespace);
        }

        const item: SymbolTableItem = {
            id,
            type,
            context: executionContext,
            fileName,
            extra,
            token,
            instances: [],
        };

        if (token !== null){
            item.instances.push(token);
        }

        this.symbols.set(this.idName(executionContext, id), item);

        return item;
    }

    /**
     * @brief Creates composite symbol key from context namespace and identifier
     * @param executionContext Execution context providing namespace
     * @param id Symbol identifier name
     * @return Composite key string for symbol storage
     *
     * @details
     * Composite keys enable proper scoping by combining the execution context
     * namespace with the symbol identifier, preventing name collisions between
     * different scopes.
     */
    protected idName(executionContext: ExecutionContext, id: string): string {
        return executionContext.namespace + id;
    }

    /**
     * @brief Debug method to dump all symbols to console with formatting
     *
     * @details
     * Outputs all symbol table entries in a readable format showing:
     * - Symbol type (padded for alignment)
     * - Composite symbol key (namespace + identifier)
     *
     * Useful for debugging symbol resolution and scoping issues.
     */
    dumpSymbols(): void {
        for (const [key, value] of this.symbols) {
            console.log(value.type.padEnd(10, " "), key);
        }
    }

    /**
     * @brief Checks if a symbol exists in the specified execution context
     * @param executionContext Execution context to search in
     * @param id Symbol identifier name
     * @return true if symbol exists in the given context
     *
     * @details
     * Only checks the specified execution context, not parent contexts.
     * Use existsAny() for hierarchical scope searching.
     */
    exists(executionContext: ExecutionContext, id: string): boolean {
        const name = this.idName(executionContext, id);
        return this.symbols.has(name);
    }

    /**
     * @brief Checks if a symbol exists in current or any parent context
     * @param executionContext Execution context to start search from
     * @param id Symbol identifier name
     * @return true if symbol exists in current or parent contexts
     *
     * @details
     * Implements lexical scoping by searching current context first,
     * then traversing parent contexts until the symbol is found or
     * all contexts are exhausted.
     */
    existsAny(executionContext: ExecutionContext, id: string): boolean {
        if (this.exists(executionContext, id)) {
            return true;
        } else {
            return this.searchParentContext(executionContext, id) !== null;
        }
    }

    /**
     * @brief Retrieves a symbol from the specified execution context
     * @param executionContext Execution context containing the symbol
     * @param id Symbol identifier name
     * @return SymbolTableItem for the requested symbol
     *
     * @warning
     * Assumes the symbol exists in the given context. Use exists() to
     * verify existence before calling this method.
     */
    get(executionContext: ExecutionContext, id: string): SymbolTableItem {
        const name = this.idName(executionContext, id);
        return this.symbols.get(name)!;
    }

    /**
     * @brief Recursively collects parent context namespaces
     * @param executionContext Starting execution context
     * @param contextsNamespace Accumulator array for namespace strings
     * @return Array of parent context namespace strings
     *
     * @details
     * Traverses the execution context hierarchy to build a list of
     * all parent context namespaces for scope resolution.
     */
    getParentContexts(executionContext: ExecutionContext,
        contextsNamespace: string[]): string[] {
        if (executionContext.parentContext !== null) {
            contextsNamespace.push(executionContext.parentContext.namespace);
            this.getParentContexts(executionContext.parentContext,
                contextsNamespace);
        }

        return contextsNamespace;
    }

    /**
     * @brief Searches for a symbol in parent execution contexts
     * @param executionContext Current execution context to start search from
     * @param id Symbol identifier name to search for
     * @return ExecutionContext containing the symbol, or null if not found
     *
     * @details
     * Implements lexical scoping by searching through parent execution
     * contexts for symbol definitions. This enables proper variable
     * shadowing and scope resolution in nested contexts like function
     * definitions.
     */
    searchParentContext(executionContext: ExecutionContext, id: string): ExecutionContext | null {
        const contextNames = this.getParentContexts(executionContext, []);

        for (const [key,] of this.symbols) {
            if (key.endsWith(`.${id}`)) {
                const { context } = this.symbols.get(key)! as SymbolTableItem;

                if (contextNames.indexOf(context.namespace) !== -1) {
                    return context;
                }
            }
        }

        return null;
    }

    /**
     * @brief Removes all undefined symbol entries from the table
     *
     * @details
     * Utility method to clean up undefined symbol references after
     * symbol resolution is complete. Useful for preparing clean symbol
     * tables for language server features or final validation passes.
     */
    clearUndefined(): void {
        // Remove all undefined entries from symbol table
        for (const [key, value] of this.symbols) {
            if (value.type === ParseSymbolType.Undefined) {
                this.symbols.delete(key);
            }
        }
    }
}

export type SymbolTableItemDefined = {
    /** @brief Symbol identifier name */
    id: string;

    /** @brief Symbol type (Variable, Function, etc.) */
    type: ParseSymbolType;

    /** @brief Execution context where symbol is defined */
    context: ExecutionContext;

    fileName: string;       // If null, then this is an builtin/internal token
    token: Token | null,    // If null, then this is an builtin/internal token

    /** @brief Additional symbol-specific information */
    extra: SymbolTableItemExtra;

    instances: Token[],    // Stores instances of the symbol usage.
};

export type SymbolTableItemUndefined = {
    /** @brief Undefined symbol type marker */
    type: ParseSymbolType.Undefined;
    /** @brief Additional information including AST node reference */
    extra: SymbolTableItemExtra;

    token: Token | null,
}

/**
 * @typedef SymbolTableItem
 * @brief Union type representing different kinds of symbol table entries
 *
 * @details
 * Symbol table items can be either:
 * - **Defined symbols**: Have ID, type, context, and extra information
 * - **Undefined symbols**: Only have type (Undefined) and extra information
 *
 * This union type enables proper handling of both resolved and unresolved
 * symbol references during validation.
 */

export type SymbolTableItem = SymbolTableItemDefined | SymbolTableItemUndefined;



/**
 * @typedef SymbolTableItemExtra
 * @brief Additional metadata associated with symbol table entries
 *
 * @details
 * Contains optional additional information that varies by symbol type:
 * - **Functions**: Parameter definitions for signature validation
 * - **Variables**: Value or type information
 * - **Undefined**: AST node reference for error reporting
 */

export type SymbolTableItemExtra = {
    /** @brief Function parameter definitions (for function symbols) */
    funcDefinedParameters?: FunctionDefinedParameter[];
    /** @brief Variable value or type information (for variable symbols) */
    variableValue?: SymbolTableItem | ValueType | null;
    /** @brief AST node reference (for undefined symbols) */
    node?: TerminalNode;
};

