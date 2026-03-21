
/**
 * Error class for rendering-related failures
 */

import { Token, ParserRuleContext } from "antlr4ng";
import { Wire } from "./objects/Wire.js";

export class BaseError extends Error {

    name = 'BaseError';

    message: string;
    
    startToken?: Token;
    endToken?: Token;
    filePath?: string;

    constructor(message: string, startTokenOrCtx?: Token | ParserRuleContext, 
        endToken?: Token, filePath?: string) {
        
        super(message);
        this.message = message;

        if (startTokenOrCtx instanceof ParserRuleContext) {
            this.startToken = startTokenOrCtx.start;
            this.endToken = startTokenOrCtx.stop;
        } else {
            this.startToken = startTokenOrCtx;
            this.endToken = endToken;
        }

        this.filePath = filePath;
    }

    toString(): string {
        const parts = [this.name];

        const linePosition = getLinePositionAsString({
            start: this.startToken,
            stop: this.endToken
        });

        if(linePosition !== null){
            parts.push(linePosition);
        }

        parts.push(`: ${this.message}`);
        return parts.join('');
    }
}

export function getLinePositionAsString(ctx: ParserRuleContext): string | null {
    if (ctx === null || ctx === undefined) {
        return null;
    }

    const { start: startToken, stop: stopToken } = ctx;
    let result: string | null = null;

    if (startToken) {
        const { line, column } = startToken;

        let stopLine = 0;
        let stopCol = 0;

        if (stopToken && (stopToken.line !== startToken.line || stopToken.column !== startToken.column)) {
            stopLine = stopToken.line;
            stopCol = stopToken.column + (stopToken.stop - stopToken.start);
        } else if (startToken === stopToken || startToken) {
            // If both tokens are the same, then it is only a single token.
            stopLine = line;
            stopCol = column + 1 + (startToken.stop - startToken.start);
        } else {
            stopCol = -1;
        }

        result = ` at ${line}:${column + 1}`;
        if (stopCol !== -1) {
            result += `-${stopLine}:${stopCol + 1}`;
        }
    }

    return result;
}export function throwWithContext(context: ParserRuleContext, messageOrError: string | BaseError): void {
    if (messageOrError instanceof BaseError) {
        throw messageOrError;
    }
    throwWithTokenRange(messageOrError as string, context.start!, context.stop!);
}

export function throwWithTokenRange(message: string, startToken: Token, endToken?: Token): void {
    throw new ParseError(message, startToken, endToken);
}

export class RenderError extends Error {
    public stage?: string;

    constructor(message: string, stage?: string) {
        super(message);
        this.name = 'RenderError';
        this.stage = stage;
    }
}

export class AutoWireFailedError extends RenderError {
    wire: Wire;
    constructor(message: string, wire: Wire) {
        super(message, 'layout');
        this.name = 'AutoWireFailedError';
        this.wire = wire;
    }
}

/**
 * Error class for runtime execution failures during visitor traversal
 * These should halt execution immediately
 */
export class RuntimeExecutionError extends BaseError {
    name = 'RuntimeExecutionError';
}

/** Errors that occur within the lexing of tokens */

export class ParseSyntaxError extends BaseError {
    name = 'ParseSyntaxError';
}

/**
 * Error class for parsing-related failures (i.e. actual execution of the code)
 */
export class ParseError extends ParseSyntaxError {
    name = 'ParseError';
}
