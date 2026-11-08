/*
 * Copyright 2023 Liu Weihao
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ParserRuleContext, CommonTokenStream, TerminalNode } from 'antlr4ng';
import { Add_component_exprContext, Assignment_exprContext, At_block_headerContext, 
    At_blockContext, 
    At_component_exprContext, 
    Callable_exprContext, 
    Component_select_exprContext, 
    CreateComponentExprContext, 
    Frame_exprContext, 
    Function_def_exprContext, Function_return_exprContext, ScriptContext, 
    To_component_exprContext,
    TrailerContext} from '../antlr/CircuitScriptParser.js';
import { BaseVisitor } from '../BaseVisitor.js';
import { ClassComponent } from '../objects/ClassComponent.js';
import { generateModifiedSourceText, RefdesModification } from './utils.js';
import { RefdesMode } from '../globals.js';
import { assertDefined, getOrThrow } from "../utils.js";

/**
 * A visitor that preserves original formatting including:
 * - Whitespace and indentation
 * - Comments (including annotated information in comments)
 * - Original token spacing
 *
 * This is useful for generating modified versions of CircuitScript files
 * while maintaining the original formatting and comments.
 */
export class RefdesAnnotationVisitor extends BaseVisitor {

    private sourceText: string;
    private tokenStream: CommonTokenStream;
    private modifications: Map<ParserRuleContext, RefdesModification> = new Map();

    resultText = '';

    debug = false;

    componentCtxLinks: Map<ParserRuleContext, ClassComponent>;

    inPathCommand = false;
    inPathCommandUseCtx: ParserRuleContext | null = null;

    constructor(silent: boolean, sourceText: string,
        tokenStream: CommonTokenStream,
        componentCtxLinks: Map<ParserRuleContext, ClassComponent>,
        refdesMode: RefdesMode = RefdesMode.Indexed) {

        // super(silent, null, null);
        super(true);
        this.sourceText = sourceText;
        this.tokenStream = tokenStream;
        this.componentCtxLinks = componentCtxLinks;
        this.refdesMode = refdesMode;
    }

    private refdesMode: RefdesMode;
    private skippedIndexed = 0;

    getSkippedIndexedCount(): number {
        return this.skippedIndexed;
    }

    getModifications(): Map<ParserRuleContext, RefdesModification> {
        return this.modifications;
    }

    /**
     * Get the original text for a context, preserving all formatting
     */
    private getOriginalText(ctx: ParserRuleContext): string {
        if (!ctx.start || !ctx.stop) {
            return '';
        }

        const startIndex = ctx.start.start;
        const stopIndex = ctx.stop.stop;

        return this.sourceText.substring(startIndex, stopIndex + 1);
    }

    /**
     * Main method to generate output with all modifications applied
     */
    visitScript = (ctx: ScriptContext): void => {
        // Imports do not need to be handled.
        this.runExpressions(this.getExecutor(), ctx.expression());

        // If there are open blocks, then close them
        this.getExecutor().closeOpenPathBlocks();

        // Build output by processing the entire token stream
        this.resultText = generateModifiedSourceText(
            this.modifications,
            this.tokenStream.getTokens(),
            this.sourceText,
        );
    }

    visitCallable_expr = (_ctx: Callable_exprContext): void => {
        // Do nothing
    }

    visitAssignment_expr = (_ctx: Assignment_exprContext): void => {
        // Do nothing
    }

    visitAdd_component_expr = (ctx: Add_component_exprContext): void => {
        const ctxDataExpr = ctx.data_expr_with_assignment();
        if (ctxDataExpr) {
            this.inPathCommandUseCtx = ctx;
            this.visit(ctxDataExpr);
            this.inPathCommandUseCtx = null;
        }

        this.addRefdesAnnotationComment(ctx);
    }
    
    visitAt_component_expr = (ctx: At_component_exprContext): void => {
        const ctxComponentSel = ctx.component_select_expr();
        if (ctxComponentSel) {
            this.inPathCommandUseCtx = ctx;
            this.visit(ctxComponentSel);
        }

        this.addRefdesAnnotationComment(ctx);
    }

    visitComponent_select_expr = (ctx: Component_select_exprContext): void => {
        const ctxDataExpr = ctx.data_expr_with_assignment();
        if (ctxDataExpr){
            this.visit(ctxDataExpr);
        }
        this.addRefdesAnnotationComment(ctx);
    }

    visitCreateComponentExpr = (ctx: CreateComponentExprContext): void => {
        if (this.inPathCommandUseCtx !== null) {
            // This is a special case to put the refdes annotation comment
            // just beside the create component.
            // The component link may be on an enclosing context (e.g. the
            // component_select_expr of a 'to'), so walk up to find it.
            let linkCtx: ParserRuleContext = this.inPathCommandUseCtx;
            let walk = ctx.parent as ParserRuleContext | null;
            while (walk !== null && walk !== undefined) {
                if (this.componentCtxLinks.has(walk)) {
                    linkCtx = walk;
                    break;
                }
                walk = walk.parent as ParserRuleContext | null;
            }

            this.addRefdesAnnotationComment(linkCtx, ctx.Colon());
            this.inPathCommandUseCtx = null;
        }
    }

    visitAt_block_header = (ctx: At_block_headerContext): void => {
        this.addRefdesAnnotationComment(ctx);
    }
    
    // Override the visitor.ts version.
    visitAt_block = (ctx: At_blockContext):void => {
        this.visit(ctx.at_block_header());
        this.visit(ctx.at_block_expressions());
    }

    visitTo_component_expr = (ctx: To_component_exprContext): void => {
        // const allRefdes: string[] = [];

        // // Extract the refdes from the components that are part of the 
        // // 'to' list.
        // ctx.component_select_expr().forEach(itemCtx => {
        //     const tmpRefdes = this.generateRefdesAnnotationComment(itemCtx);
        //     if (tmpRefdes !== null){
        //         allRefdes.push(tmpRefdes);
        //     }
        // });

        // if (allRefdes.length > 0) {
        //     const originalText = this.getOriginalText(ctx);
        //     // const annotation = ' #= ' + allRefdes.join(',');

        //     this.modifications.set(ctx, {
        //         originalText,
        //         refdes: allRefdes,
        //     });
        // }

        const ctxComponentSel = ctx.component_select_expr();
        if (ctxComponentSel) {
            this.inPathCommandUseCtx = ctx;
            this.visit(ctxComponentSel[0]);
        }

        this.addRefdesAnnotationComment(ctx);
    }

    visitFunction_def_expr = (ctx: Function_def_exprContext): void => {
        this.runExpressions(this.getExecutor(), ctx.function_expr());
    };

    visitFunction_return_expr = (_ctx: Function_return_exprContext): void => {
        // Do nothing and don't signal the end.
    }

    visitFrame_expr = (ctx: Frame_exprContext): void => {
        const ctxExpressionsBlock = ctx.expressions_block();
        if (ctxExpressionsBlock) {
            this.visit(ctxExpressionsBlock);
        }
    }

    visitFunction_call_expr = (_ctx: Function_call_exprContext): void => {
        // Do nothing
        this.inPathCommand = false;
    }

    visitParameters = (_ctx: ParametersContext): void => {
        // Do nothing;
    }

    visitTrailer = (_ctx: TrailerContext): void => {
        // Do nothing
    }

    // Refdes annotations that have already been aded
    addedRefdesAnnotations:string[] = [];

    // Refdes placeholder annotations that have already been added
    addedRefdesPlaceholderAnnotations:string[] = [];

    private generateRefdesAnnotationComment(ctx:ParserRuleContext): string | null {
        if (this.componentCtxLinks.has(ctx)) {
            const instance = getOrThrow(this.componentCtxLinks, ctx, "component context link");

            // If the refdes annotation was already added, then do not
            // add it again.
            let alreadyHaveRefdesAnnotation = instance.assignedRefDes !== null ?
                (this.addedRefdesAnnotations.indexOf(instance.assignedRefDes) !== -1) : false;

            if (instance.assignedRefDes !== null){
                // extract placeholder
                const parts = instance.assignedRefDes.split('_');
                if (parts.length > 1){
                    const placeholder = parts[0] + '_';
                    alreadyHaveRefdesAnnotation = this.addedRefdesPlaceholderAnnotations.indexOf(placeholder) !== -1;
                }
            }

            const { forceSaveRefdesAnnotation: forceSaveRefdes } = instance;

            // Only if the component does not have the refdes param, it means
            // that there was no explicit refdes assigned.
            //
            // If component already has refdes annotation in comment, then it
            // will have the refdes param set, so this part will be skipped.
            if (!alreadyHaveRefdesAnnotation && (forceSaveRefdes || (!instance.hasParam('refdes') 
                && instance.placeHolderRefDes === null 
                && instance.assignedRefDes))) {

                let useRefDes = instance.assignedRefDes;

                // If false, then the instance does not have a placeholder 
                // refdes. Only components in a loop structure can have a 
                // placeholder refdes.
                let isPlaceholderRefdes = false;

                const { ctxReferences } = instance;
                if (ctxReferences.length > 0) {
                    const firstReference = ctxReferences[0];
                    const { indexedStack: loopStack = [] } = firstReference;

                    if (this.refdesMode === RefdesMode.Flat && loopStack.length > 0) {
                        this.skippedIndexed++;
                        return null;
                    }

                    if (loopStack.length > 0) {
                        // If instance is within a loop structure, then use a 
                        // placeholder refdes instead
                        isPlaceholderRefdes = true;

                        // Placeholder refdes is indicated by the '_' after
                        // the prefix.
                        const parts = instance.assignedRefDes.split('_');
                        useRefDes = parts[0] + '_';
                    }

                    if (this.addedRefdesAnnotations.indexOf(instance.assignedRefDes) === -1) {
                        this.addedRefdesAnnotations.push(instance.assignedRefDes);
                        if (isPlaceholderRefdes) {
                            this.addedRefdesPlaceholderAnnotations.push(useRefDes);
                        }
                    }

                    return useRefDes;
                }
            }
        }

        return null;
    }

    private addRefdesAnnotationComment(ctx: ParserRuleContext, insertCtx?: ParserRuleContext | TerminalNode): void {
        const refdes = this.generateRefdesAnnotationComment(ctx);
        if (refdes !== null) {

            if (insertCtx === undefined) {
                insertCtx = ctx;
            } else if (insertCtx instanceof TerminalNode) {
                // Wrap the terminal's token in a context spanning only
                // that token.
                const terminalCtx = new ParserRuleContext(ctx);
                terminalCtx.start = insertCtx.symbol;
                terminalCtx.stop = insertCtx.symbol;
                insertCtx = terminalCtx;
            }

            const originalText = this.getOriginalText(insertCtx);

            // Default behavior: append annotation at end
            this.modifications.set(insertCtx, {
                originalText,
                refdes: [refdes]
            });
        }
    }

    getOutput(): string {
        return this.resultText;
    }

    getOutputForExternalRefdesFile(): Record<string, string> {
        const result:Record<string, string> = {};

        this.modifications.forEach((modification, ctx) => {
            const { line: startLine, column: startColumn } = assertDefined(ctx.start, "Missing start token");
            const { line: stopLine, column: stopColumn } = assertDefined(ctx.stop, "Missing stop token");
            const joinedRefdes = modification.refdes.join(',');
            result[joinedRefdes] = `${startLine}:${startColumn}:${stopLine}:${stopColumn}`;
        });

        return result;
    }
    
    private log(...message: unknown[]): void {
        if (this.debug) {
            console.log(...message);
        }
    }
}
