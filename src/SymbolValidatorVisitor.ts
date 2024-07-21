import { AdditionExprContext, Assignment_exprContext, Atom_exprContext, 
    BinaryOperatorExprContext, DataExprContext, Function_def_exprContext, 
    MultiplyExprContext, UnaryOperatorExprContext, 
    ValueAtomExprContext } from "./antlr/CircuitScriptParser.js";
import { BaseVisitor } from "./BaseVisitor.js";
import { ExecutionContext } from "./execute.js";
import { ComplexType, FunctionDefinedParameter, ParseSymbolType, ReferenceType, ValueType } from "./objects/types.js";

export class SymbolValidatorVisitor extends BaseVisitor {

    symbolTable: SymbolTable = new SymbolTable();

    visitAssignment_expr = (ctx: Assignment_exprContext): ComplexType => {
        const atomStr = ctx.atom_expr().getText();
        const value = this.visit(ctx.data_expr()) as ComplexType;

        this.symbolTable.addVariable(
            this.getExecutor(),            
            atomStr,
            value);


        return null;
    }

    visitAtom_expr = (ctx: Atom_exprContext): ReferenceType => {
        const atomId = ctx.ID().getText();
        let tmpSymbol: SymbolTableItem;

        const executor = this.getExecutor();

        if (this.symbolTable.exists(executor, atomId)) {
            tmpSymbol = this.symbolTable.get(executor, atomId);
        } else {
            const foundContext = this.symbolTable.searchParentContext(executor, atomId);
            if (foundContext === null) {
                // Undefined symbol is found, save it too
                tmpSymbol = this.symbolTable.addUndefined(executor, atomId)
            } else {
                tmpSymbol = this.symbolTable.get(foundContext, atomId);
            }
        }

        // This is a function call, check if function 
        // parameter arguments exists
        if (ctx.trailer_expr().length > 0){
            
            ctx.trailer_expr().forEach(item => {
                if (item.OPEN_PAREN() && item.CLOSE_PAREN()) {
                    if (item.parameters()) {
                        this.visit(item.parameters()!);
                    }
                }
            });
        }

        return tmpSymbol;
    }

    visitValueAtomExpr = (ctx: ValueAtomExprContext): ComplexType => {
        let value: ComplexType;

        if (ctx.value_expr()) {
            value = this.visit(ctx.value_expr()!) as ValueType;

        } else if (ctx.atom_expr()) {
            value = this.visit(ctx.atom_expr()!);
        }

        return value;
    }

    visitUnaryOperatorExpr = (ctx: UnaryOperatorExprContext) => {
        return this.visit(ctx.data_expr());
    }

    visitMultiplyExpr = (ctx: MultiplyExprContext) => {
        this.visit(ctx.data_expr(0)!);
        this.visit(ctx.data_expr(1)!);
    }

    visitAdditionExpr = (ctx: AdditionExprContext) => {
        this.visit(ctx.data_expr(0)!);
        this.visit(ctx.data_expr(1)!);
    };

    visitBinaryOperatorExpr = (ctx: BinaryOperatorExprContext) => {
        this.visit(ctx.data_expr(0)!);
        this.visit(ctx.data_expr(1)!);
    }

    visitDataExpr = (ctx: DataExprContext) => {
        return;
    }

    visitFunction_def_expr = (ctx: Function_def_exprContext): void => {
        const functionName = ctx.ID().getText();

        // These are the defined arguments for the function
        let funcDefinedParameters: FunctionDefinedParameter[] = [];
        if (ctx.function_args_expr()) {
            funcDefinedParameters = this.visit(ctx.function_args_expr()!);
        }

        if (this.symbolTable.exists(this.getExecutor(), functionName)) {
            throw "Function name already exists in scope";
        } else {
            this.symbolTable.addFunction(this.getExecutor(),
                functionName,
                funcDefinedParameters);
        }

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
            this.symbolTable.addVariable(
                newExecutor, 
                param[0],
                null
            )
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

type SymbolTableItem = {
    id: string,
    type: ParseSymbolType,
    context: ExecutionContext,
    extra: SymbolTableItemExtra
} | {
    type: ParseSymbolType.Undefined
}

type SymbolTableItemExtra = {
    funcDefinedParameters?: FunctionDefinedParameter[],
    variableValue?: SymbolTableItem | ValueType | null,
}


export class SymbolTable {

    symbols: Map<string, SymbolTableItem> = new Map();

    executionContexts: ExecutionContext[] = [];

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

    addUndefined(executionContext: ExecutionContext, id: string): SymbolTableItem {
        return this.add(
            executionContext,
            id,
            ParseSymbolType.Undefined,
            {}
        );
    }

    protected add(executionContext: ExecutionContext, id: string,
        type: ParseSymbolType, extra: SymbolTableItemExtra): SymbolTableItem {

        // track execution contexts
        if (this.executionContexts.indexOf(executionContext) === -1) {
            this.executionContexts.push(executionContext);
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
            console.log(key, value.type);
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

    getParentContexts(executionContext: ExecutionContext, contexts: ExecutionContext[]): ExecutionContext[] {
        if (executionContext.parentContext !== null) {
            contexts.push(executionContext.parentContext);
            this.getParentContexts(executionContext.parentContext, contexts);
        }

        return contexts;
    }

    searchParentContext(executionContext: ExecutionContext, id: string): ExecutionContext | null {
        const parentContexts: ExecutionContext[] = this.getParentContexts(executionContext, []);

        for (const [key,] of this.symbols) {
            if (key.endsWith(`.${id}`)) {
                const { context } = this.symbols.get(key)!;
                if (parentContexts.indexOf(context) !== -1) {
                    return context
                }
            }
        }

        return null;
    }
}