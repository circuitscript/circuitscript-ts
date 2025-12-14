/*
 * Copyright 2023 Liu Weihao
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ParserRuleContext, Token, CommonTokenStream } from 'antlr4ng';
import { Add_component_exprContext, At_block_headerContext, 
    At_blockContext, 
    At_component_exprContext, CircuitScriptParser, 
    Component_select_exprContext, 
    Frame_exprContext, 
    Function_def_exprContext, Function_return_exprContext, ScriptContext, 
    To_component_exprContext} from './antlr/CircuitScriptParser.js';
import { BaseVisitor } from './BaseVisitor.js';
import { ClassComponent } from './objects/ClassComponent.js';

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
    private modifications: Map<ParserRuleContext, string> = new Map();

    resultText = '';

    debug = false;

    componentCtxLinks: Map<ParserRuleContext, ClassComponent>;

    constructor(silent: boolean, sourceText: string,
        tokenStream: CommonTokenStream,
        componentCtxLinks: Map<ParserRuleContext, ClassComponent>) {

        // super(silent, null, null);
        super(true);
        this.sourceText = sourceText;
        this.tokenStream = tokenStream;
        this.componentCtxLinks = componentCtxLinks;
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
    visitScript = async (ctx: ScriptContext): Promise<void> => {
        const result = this.runExpressions(this.getExecutor(), ctx.expression());
        this.setResult(ctx, result);

        // If there are open blocks, then close them
        this.getExecutor().closeOpenPathBlocks();

        // Build output by processing the entire token stream
        this.resultText = this.generateModifiedText();
    }

    visitAdd_component_expr = (ctx: Add_component_exprContext): void => {
        this.addRefdesAnnotationComment(ctx);
    }
    
    visitAt_component_expr = (ctx: At_component_exprContext): void => {
        this.addRefdesAnnotationComment(ctx);
    }

    visitComponent_select_expr = (ctx: Component_select_exprContext): void => {
        this.addRefdesAnnotationComment(ctx);
    }

    visitAt_block_header = (ctx: At_block_headerContext): void => {
        this.addRefdesAnnotationComment(ctx);
    }
    
    visitAt_block = (ctx: At_blockContext):void => {
        this.visit(ctx.at_block_header());

        ctx.at_block_expressions().forEach(expression => {
            this.visit(expression);
        });
    }

    visitTo_component_expr = (ctx: To_component_exprContext): void => {
        const allRefdes: string[] = [];

        // Extract the refdes from the components that are part of the 
        // 'to' list.
        ctx.component_select_expr().forEach(item => {
            if (this.componentCtxLinks.has(item)) {
                const instance = this.componentCtxLinks.get(item)!;

                if (!instance.hasParam('refdes') && instance.assignedRefDes) {
                    allRefdes.push(instance.assignedRefDes);
                }
            }
        });

        if (allRefdes.length > 0) {
            const originalText = this.getOriginalText(ctx);
            const annotation = ' #= ' + allRefdes.join(',');

            this.modifications.set(ctx, originalText + annotation);
        }
    }

    visitFunction_def_expr = (ctx: Function_def_exprContext): void => {
        this.runExpressions(this.getExecutor(), ctx.function_expr());
    };

    visitFunction_return_expr = (ctx: Function_return_exprContext): void => {
        // Do nothing and don't signal the end.
    }

    visitFrame_expr = (ctx: Frame_exprContext): void  => {
        this.visit(ctx.expressions_block());
    }

    visitFunction_call_expr = (ctx: Function_call_exprContext): void => {
        // Do nothing
    }

    visitParameters = (ctx: ParametersContext): void => {
        // Do nothing;
    }

    addedRefdesAnnotations:string[] = [];

    private addRefdesAnnotationComment(ctx: ParserRuleContext): void {
        if (this.componentCtxLinks.has(ctx)) {
            const instance = this.componentCtxLinks.get(ctx)!;

            // Only if the component does not have the refdes param, it means
            // that there was no explicit refdes assigned.
            //
            // If component already has refdes annotation in comment, then it
            // will have the refdes param set, so this part will be skipped.
            if (!instance.hasParam('refdes') 
                && instance.placeHolderRefDes === null 
                && instance.assignedRefDes) {

                let useRefDes = instance.assignedRefDes;

                // If false, then the instance does not have a placeholder 
                // refdes. Only components in a loop structure can have a 
                // placeholder refdes.
                let isPlaceholderRefdes = false;

                const { ctxReferences } = instance;
                if (ctxReferences.length > 0) {
                    const firstReference = ctxReferences[0];
                    const { indexedStack: loopStack = [] } = firstReference;

                    if (loopStack.length > 0) {
                        // If instance is within a loop structure, then use a 
                        // placeholder refdes instead
                        isPlaceholderRefdes = true;

                        // Placeholder refdes is indicated by the '_' after
                        // the prefix.
                        const parts = instance.assignedRefDes.split('_');
                        useRefDes = parts[0] + '_';
                    }

                    const originalText = this.getOriginalText(ctx);
                    const annotation = ' #= ' + useRefDes;

                    // Default behavior: append annotation at end
                    this.modifications.set(ctx, originalText + annotation);

                    if (this.addedRefdesAnnotations.indexOf(instance.assignedRefDes) === -1
                        && !isPlaceholderRefdes) {

                        this.addedRefdesAnnotations.push(instance.assignedRefDes);
                    }
                }
            }
        }
    }

    getOutput(): string {
        return this.resultText;
    }

    /**
     * Generate the modified text by walking through all tokens
     * including hidden channel tokens (comments)
     */
    private generateModifiedText(): string {
        const output: string[] = [];
        const allTokens = this.tokenStream.getTokens();
        const processedTokens = new Set<number>();
        let lastSourcePos = 0; // Track last position in source text we've written

        // Build a map of token indices that belong to each context
        const contextTokenRanges = this.buildContextTokenRanges();

        for (let i = 0; i < allTokens.length; i++) {
            const token = allTokens[i];

            if (processedTokens.has(i)) {
                continue;
            }
            
            const tokenText = this.sourceText.substring(token.start, token.stop + 1);
            
            //Dump all token info
            this.log(i, `token: [${tokenText}], length: ${tokenText.length}, text: [${token.text}]`);
            
            if (token.type === CircuitScriptParser.DEDENT 
                || token.type === CircuitScriptParser.EOF
                || (token.type === CircuitScriptParser.NEWLINE && token.__skip)) {
                this.log('--skip dedent/EOF token');
                continue;
            }

            // Check if this token belongs to a modified/deleted context
            const ctx = this.findContextForToken(token, contextTokenRanges);

            if (ctx) {
                // For contexts, we need to handle the first token specially
                // to preserve whitespace before the context
                const isFirstTokenInContext = token.tokenIndex === ctx.start?.tokenIndex;

                if (isFirstTokenInContext) {
                    // Preserve any whitespace/formatting between last position and start of context
                    if (token.start > lastSourcePos) {
                        output.push(this.sourceText.substring(lastSourcePos, token.start));
                    }

                    // Check if modified
                    if (this.modifications.has(ctx)) {
                        // Add the replacement text
                        output.push(this.modifications.get(ctx)!);
                        // Mark all tokens in this context as processed
                        this.markTokensAsProcessed(ctx, processedTokens);
                        if (ctx.stop) {
                            lastSourcePos = ctx.stop.stop + 1;
                        }
                        continue;
                    }
                }
            }

            // No modification for this token - preserve exact source including whitespace
            // First, copy any whitespace between last position and this token
            if (token.start > lastSourcePos) {
                output.push(this.sourceText.substring(lastSourcePos, token.start));
            }

            // Then copy the token itself
            // const tokenText = this.sourceText.substring(token.start, token.stop + 1);

            if (tokenText.length > 0){
                output.push(tokenText);
            }

            processedTokens.add(i);
            lastSourcePos = token.stop + 1;
        }

        // Don't forget any remaining text after the last token
        if (lastSourcePos < this.sourceText.length) {
            output.push(this.sourceText.substring(lastSourcePos));
        }

        return output.join('');
    }

    /**
     * Build a map of contexts to their token ranges
     */
    private buildContextTokenRanges(): Map<ParserRuleContext, [number, number]> {
        const ranges = new Map<ParserRuleContext, [number, number]>();

        // Build ranges for all contexts we care about
        for (const ctx of this.modifications.keys()) {
            if (ctx.start && ctx.stop) {
                ranges.set(ctx, [ctx.start.tokenIndex, ctx.stop.tokenIndex]);
            }
        }

        return ranges;
    }

    /**
     * Find which context (if any) a token belongs to
     */
    private findContextForToken(
        token: Token,
        contextRanges: Map<ParserRuleContext, [number, number]>
    ): ParserRuleContext | null {

        for (const [ctx, [start, end]] of contextRanges) {
            if (token.tokenIndex >= start && token.tokenIndex <= end) {
                return ctx;
            }
        }

        return null;
    }

    /**
     * Mark all tokens in a context as processed
     */
    private markTokensAsProcessed(ctx: ParserRuleContext, processedTokens: Set<number>): void {
        if (!ctx.start || !ctx.stop) {
            return;
        }

        for (let i = ctx.start.tokenIndex; i <= ctx.stop.tokenIndex; i++) {
            processedTokens.add(i);
        }
    }

    private log(...message: any[]): void {
        if (this.debug) {
            console.log(...message);
        }
    }
}
