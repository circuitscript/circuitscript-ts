import { ParserRuleContext, Token } from 'antlr4ng';
import { CircuitScriptParser } from '../antlr/CircuitScriptParser.js';

/**
 * Generate modified source text by walking through all tokens
 * including hidden channel tokens (comments), applying the given
 * modification map to replace matched contexts with annotated text.
 */

export function generateModifiedSourceText(
    modifications: Map<ParserRuleContext, RefdesModification>,
    tokens: Token[],
    sourceText: string,

    // This offset is needed if the tokens are a subset of a larger 
    // set of tokens.
    tokenStartOffset=0
): string {
    const output: string[] = [];
    const processedTokens = new Set<number>();
    
    // Value with offset already applied.
    let lastSourcePos = 0;

    // Build a map of token index ranges for each context
    const contextTokenRanges = new Map<ParserRuleContext, [number, number]>();
    for (const ctx of modifications.keys()) {
        if (ctx.start && ctx.stop) {
            contextTokenRanges.set(ctx, [ctx.start.tokenIndex, ctx.stop.tokenIndex]);
        }
    }

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        if (processedTokens.has(i)) {
            continue;
        }

        const tokenText = sourceText.substring(
            token.start - tokenStartOffset, token.stop + 1 - tokenStartOffset);

        if (token.type === CircuitScriptParser.DEDENT
            || token.type === CircuitScriptParser.EOF
            || (token.type === CircuitScriptParser.NEWLINE && token.__skip)) {
            continue;
        }

        // Check if this token belongs to a modified context
        let ctx: ParserRuleContext | null = null;
        for (const [c, [start, end]] of contextTokenRanges) {
            if (token.tokenIndex >= start && token.tokenIndex <= end) {
                ctx = c;
                break;
            }
        }

        if (ctx) {
            const isFirstTokenInContext = token.tokenIndex === ctx.start?.tokenIndex;

            if (isFirstTokenInContext) {
                if (token.start - tokenStartOffset > lastSourcePos) {
                    output.push(
                        sourceText.substring(
                            lastSourcePos, token.start - tokenStartOffset));
                }

                if (modifications.has(ctx)) {
                    const modification = modifications.get(ctx)!;
                    const joinedRefdes = modification.refdes.join(', ');
                    output.push(`${modification.originalText} #= ${joinedRefdes}`);

                    // Mark all tokens in this context as processed
                    if (ctx.start && ctx.stop) {

                        const tokensNum = ctx.stop.tokenIndex - ctx.start.tokenIndex;
                        for (let j = i; j <= i + tokensNum; j++) {
                            processedTokens.add(j);
                        }
                    }
                    if (ctx.stop) {
                        lastSourcePos = ctx.stop.stop + 1 - tokenStartOffset;
                    }
                    continue;
                }
            }
        }

        if (token.start - tokenStartOffset > lastSourcePos) {
            output.push(sourceText.substring(lastSourcePos, token.start - tokenStartOffset));
        }

        if (tokenText.length > 0) {
            output.push(tokenText);
        }

        processedTokens.add(i);
        lastSourcePos = token.stop + 1 - tokenStartOffset;
    }

    if (lastSourcePos < sourceText.length) {
        output.push(sourceText.substring(lastSourcePos));
    }

    return output.join('');
}export type RefdesModification = {
    originalText: string;
    refdes: string[];
};

