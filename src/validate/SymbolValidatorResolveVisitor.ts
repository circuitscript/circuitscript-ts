/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Token } from "antlr4ng";
import { ComplexType, FunctionDefinedParameter } from "../objects/types.js";
import { SymbolValidatorVisitor } from "./SymbolValidatorVisitor.js";

/**
 * @class SymbolValidatorResolveVisitor
 * @brief Specialized symbol validator for second-pass resolution
 *
 * This visitor extends SymbolValidatorVisitor to provide a second-pass
 * validation that focuses on symbol resolution without creating new symbols.
 * Used for resolving forward references and validating symbol usage.
 *
 * ## Purpose
 * - Second pass validation after initial symbol table construction
 * - Resolves forward references to functions and variables
 * - Updates existing function definitions if needed
 * - Validates symbol usage without side effects
 *
 * ## Usage
 * Typically used after SymbolValidatorVisitor has built the initial symbol
 * table to perform additional validation passes for complex symbol resolution.
 *
 * @see SymbolValidatorVisitor
 */

export class SymbolValidatorResolveVisitor extends SymbolValidatorVisitor {

    // Disable cache, because everything within import should be parsed.
    enableCacheImports = false;
    enableCachedImportsRead = false;
    enableCachedImportsWrite = false;

    /**
     * @brief Overrides variable addition to prevent new symbol creation
     * @param name Variable identifier name (unused)
     * @param value Variable value (unused)
     *
     * @details
     * No-op implementation that prevents creating new variable symbols
     * during the resolution pass. Only validates existing symbols.
     */
    protected addSymbolVariable(token: Token, name: string, value: ComplexType): void {
        // do nothing - resolution pass doesn't create new variables
    }

    /**
     * @brief Conditionally updates function symbols during resolution pass
     * @param functionName Function identifier name
     * @param funcDefinedParameters Function parameter definitions
     *
     * @details
     * Only updates function definitions if they already exist in the symbol
     * table. This allows for updating function signatures during resolution
     * without creating duplicate entries.
     */
    protected addSymbolFunction(token: Token, functionName: string,
        funcDefinedParameters: FunctionDefinedParameter[]): void {
        // Only overwrite existing function definitions during resolution
        if (this.symbolTable.exists(this.getExecutor(), functionName)) {
            this.symbolTable.addFunction(
                token,
                this.getCurrentFile(),
                this.getExecutor(),
                functionName,
                funcDefinedParameters);
        }
    }
}
