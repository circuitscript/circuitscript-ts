/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TerminalNode } from "antlr4ng";
import { AdditionExprContext, Assignment_exprContext, Atom_exprContext, 
    BinaryOperatorExprContext, DataExprContext, Function_call_exprContext, Function_def_exprContext, 
    Import_exprContext, 
    MultiplyExprContext, UnaryOperatorExprContext, 
    ValueAtomExprContext } from "./antlr/CircuitScriptParser.js";
import { BaseVisitor } from "./BaseVisitor.js";
import { ExecutionContext } from "./execute.js";
import { ComplexType, FunctionDefinedParameter, ParseSymbolType, ValueType } from "./objects/types.js";

export class SymbolValidatorVisitor extends BaseVisitor {

    symbolTable: SymbolTable = new SymbolTable();

    protected addSymbolVariable(name: string, value: ComplexType,
        executor: ExecutionContext | null = null): void {
        const useExecutor = executor === null ? this.getExecutor() : executor;
        this.symbolTable.addVariable(
            useExecutor,
            name,
            value);

        this.log2('add symbol variable: ' + name);
    }

    protected addSymbolFunction(functionName: string,
        funcDefinedParameters: FunctionDefinedParameter[]): void {
        if (!this.symbolTable.exists(this.getExecutor(), functionName)) {
        //     throw "Function name already exists in scope";
        // } else {
            this.symbolTable.addFunction(this.getExecutor(),
                functionName,
                funcDefinedParameters);

            this.log2('add symbol function: ' + functionName);
        }
    }

    protected handleAtomSymbol(atom: TerminalNode): SymbolTableItem {
        const atomId = atom.getText();
        const executor = this.getExecutor();

        let tmpSymbol: SymbolTableItem;
        if (this.symbolTable.exists(executor, atomId)) {
            tmpSymbol = this.symbolTable.get(executor, atomId);
        } else {
            const foundContext = this.symbolTable.searchParentContext(executor, atomId);
            if (foundContext === null) {
                // Undefined symbol is found, save it too
                tmpSymbol = this.symbolTable.addUndefined(executor, atomId, atom);
                this.log2('symbol not found: ' + atomId);
            } else {
                tmpSymbol = this.symbolTable.get(foundContext, atomId);
            }
        }

        return tmpSymbol;
    }

    setSymbols(symbolTable: SymbolTable): void {
        this.symbolTable = symbolTable;
    }

    visitImport_expr = (ctx: Import_exprContext): void => {
        const ID = ctx.ID().toString(); // filename
        const { pathExists } =
            this.handleImportFile(ID, false, ctx);

        if (!pathExists) {
            this.symbolTable.addUndefined(this.getExecutor(), ID, ctx.ID());
        }
    }

    visitAssignment_expr = (ctx: Assignment_exprContext): ComplexType => {
        const atomStr = ctx.atom_expr().getText();

        const ctxDataExpr = ctx.data_expr();
        this.visit(ctxDataExpr);
        const value = this.getResult(ctxDataExpr) as ComplexType;

        this.addSymbolVariable(atomStr, value);
        return null;
    }

    visitAtom_expr = (ctx: Atom_exprContext): void => {
        const tmpSymbol = this.handleAtomSymbol(ctx.ID(0)!);
        this.setResult(ctx, tmpSymbol);
    }

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
    }

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
    }

    visitUnaryOperatorExpr = (ctx: UnaryOperatorExprContext): void => {
        this.visit(ctx.data_expr());
    }

    visitMultiplyExpr = (ctx: MultiplyExprContext): void => {
        this.visit(ctx.data_expr(0)!);
        this.visit(ctx.data_expr(1)!);
    }

    visitAdditionExpr = (ctx: AdditionExprContext): void => {
        this.visit(ctx.data_expr(0)!);
        this.visit(ctx.data_expr(1)!);
    };

    visitBinaryOperatorExpr = (ctx: BinaryOperatorExprContext):void => {
        this.visit(ctx.data_expr(0)!);
        this.visit(ctx.data_expr(1)!);
    }

    visitDataExpr = (ctx: DataExprContext):void => {
        return;
    }

    visitFunction_def_expr = (ctx: Function_def_exprContext): void => {
        const functionName = ctx.ID().getText();

        // These are the defined arguments for the function
        let funcDefinedParameters: FunctionDefinedParameter[] = [];
        const ctxFunctionArgsExpr = ctx.function_args_expr();
        if (ctxFunctionArgsExpr) {
            this.visit(ctxFunctionArgsExpr);
            funcDefinedParameters = this.getResult(ctxFunctionArgsExpr);
        }

        this.addSymbolFunction(functionName, funcDefinedParameters);

        // create a new scope and evalutate the functions
        const executionContextName =
            functionName + '_validate';

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
        )

        // For each funcDefinedParameters, create the variable in scope
        funcDefinedParameters.forEach(param => {
            this.addSymbolVariable(
                param[0],
                null,
                newExecutor
            );
        });

        this.runExpressions(newExecutor,
            ctx.function_expr());

        // Leave the context
        this.executionStack.pop();
    }

    getSymbols(){
        return this.symbolTable;
    }

    dumpSymbols() {
        this.symbolTable.dumpSymbols();
    }
}

export class SymbolValidatorResolveVisitor extends SymbolValidatorVisitor {
    
    protected addSymbolVariable(name: string, value: ComplexType): void {
        // do nothing
    }

    protected addSymbolFunction(functionName: string,
        funcDefinedParameters: FunctionDefinedParameter[]): void {
        // Overwrite the function name in the symbol table if it exists
        if (this.symbolTable.exists(this.getExecutor(), functionName)) {
            this.symbolTable.addFunction(this.getExecutor(),
                functionName,
                funcDefinedParameters);
        }
    }
}

type SymbolTableItem = {
    id: string,
    type: ParseSymbolType,
    context: ExecutionContext,
    extra: SymbolTableItemExtra
} | {
    type: ParseSymbolType.Undefined
    extra: SymbolTableItemExtra
}

type SymbolTableItemExtra = {
    funcDefinedParameters?: FunctionDefinedParameter[],
    variableValue?: SymbolTableItem | ValueType | null,
    node?: TerminalNode
}


export class SymbolTable {

    protected symbols: Map<string, SymbolTableItem> = new Map();

    executonContextsNamespaces: string[] = [];

    getSymbols(): Map<string, SymbolTableItem> {
        return this.symbols;
    }

    addFunction(executionContext: ExecutionContext, id: string,
        funcDefinedParameters: FunctionDefinedParameter[]): SymbolTableItem {
        return this.add(
            executionContext,
            id,
            ParseSymbolType.Function,
            {
                funcDefinedParameters
            }
        )
    }

    addVariable(executionContext: ExecutionContext, id: string,
        variableValue: SymbolTableItem | ValueType | null): SymbolTableItem {
        return this.add(
            executionContext,
            id,
            ParseSymbolType.Variable,
            {
                variableValue
            }
        )
    }

    addUndefined(executionContext: ExecutionContext, id: string, node: TerminalNode): SymbolTableItem {
        return this.add(
            executionContext,
            id,
            ParseSymbolType.Undefined,
            {
                node
            }
        );
    }

    protected add(executionContext: ExecutionContext, id: string,
        type: ParseSymbolType, extra: SymbolTableItemExtra): SymbolTableItem {

        // track execution contexts
        if (this.executonContextsNamespaces.indexOf(executionContext.namespace) === -1) {
            this.executonContextsNamespaces.push(executionContext.namespace);
        }

        const item: SymbolTableItem = {
            id,
            type,
            context: executionContext,
            extra
        };

        this.symbols.set(this.idName(executionContext, id), item);

        return item;
    }

    protected idName(executionContext: ExecutionContext, id: string): string {
        return executionContext.namespace + id;
    }

    dumpSymbols(): void {
        for(const [key, value] of this.symbols){
            console.log(value.type.padEnd(10, " "), key);
        }
    }

    exists(executionContext: ExecutionContext, id: string): boolean {
        const name = this.idName(executionContext, id);
        return this.symbols.has(name);
    }

    existsAny(executionContext: ExecutionContext, id: string): boolean {
        if (this.exists(executionContext, id)) {
            return true;
        } else {
            return this.searchParentContext(executionContext, id) !== null;
        }
    }

    get(executionContext: ExecutionContext, id: string): SymbolTableItem {
        const name = this.idName(executionContext, id);
        return this.symbols.get(name)!;
    }

    getParentContexts(executionContext: ExecutionContext, 
        contextsNamespace: string[]): string[] {
        if (executionContext.parentContext !== null) {
            contextsNamespace.push(executionContext.parentContext.namespace);
            this.getParentContexts(executionContext.parentContext, 
                contextsNamespace);
        }

        return contextsNamespace;
    }

    searchParentContext(executionContext: ExecutionContext, id: string)
        : ExecutionContext | null {
        const contextNames = this.getParentContexts(executionContext, []);

        for (const [key,] of this.symbols) {
            if (key.endsWith(`.${id}`)) {
                const { context } = this.symbols.get(key)! as SymbolTableItem;

                if (contextNames.indexOf(context.namespace) !== -1) {
                    return context
                }
            }
        }

        return null;
    }

    clearUndefined(): void {
        // Remove all undefined entries
        for(const [key, value] of this.symbols){
            if (value.type === ParseSymbolType.Undefined){
                this.symbols.delete(key);
            }
        }
    }
}