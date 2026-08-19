/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Error class for rendering-related failures
 */

import { Token, ParserRuleContext } from "antlr4ng";
import { Wire } from "./objects/Wire.js";
import { getLinePositionAsAtString } from "./utils.js";

/**
 * Errors that have a ParserRuleContext associated.
 */
export class BaseError extends Error {

    name = 'BaseError';

    message: string;
    
    startToken?: Token;
    endToken?: Token;
    filePath?: string;

    constructor(message: string, startTokenOrCtx?: Token | ParserRuleContext, 
        endToken?: Token, filePath?: string, options?: ErrorOptions) {
        
        super(message, options);

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

        const linePosition = getLinePositionAsAtString({
            start: this.startToken,
            stop: this.endToken
        });

        if(linePosition !== null){
            parts.push(` ${linePosition}`);
        }

        parts.push(`: ${this.message}`);
        return parts.join('');
    }
}

export function throwWithContext(context: ParserRuleContext, messageOrError: string | BaseError): void {
    if (messageOrError instanceof BaseError && messageOrError.startToken 
        || messageOrError instanceof ScenarioRuntimeError
        || messageOrError instanceof RuntimeExecutionError) {
        
        messageOrError.startToken = context.start;
        messageOrError.endToken = context.stop;
        throw messageOrError;
    }
    const message = messageOrError instanceof BaseError ? messageOrError.message : messageOrError;
    throwWithTokenRange(message, context.start!, context.stop!);
}

export function throwWithTokenRange(message: string, startToken: Token, endToken?: Token): void {
    throw new ParseError(message, startToken, endToken);
}

export class RenderError extends Error {
    public stage?: string;

    constructor(message: string, stage?: string, options?:ErrorOptions) {
        super(message, options);
        this.name = 'RenderError';
        this.stage = stage;
    }
}

export class AutoWireFailedError_ extends Error {
    name = 'AutoWireFailedError_';

    wire: Wire;
    constructor(message: string, wire: Wire) {
        super(message);
        this.wire = wire;
    }
}

// This has ParserRuleContext info
export class AutoWireFailedError extends BaseError {
    name = 'AutoWireFailedError';
}

/**
 * Error class for runtime execution failures during visitor traversal
 * These should halt execution immediately
 */
export class RuntimeExecutionError extends BaseError {
    name = 'RuntimeExecutionError';
}

export class ScenarioRuntimeError extends BaseError {
    name = 'ScenarioRuntimeError';
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


export function collectErrorChain(error: Error): Error[] {
    const items: Error[] = [];

    let currentError = error;

    for (let i = 0; i < 100; i++) {
        if (currentError.cause) {
            items.push(currentError.cause);
            currentError = currentError.cause!;
        } else {
            break;
        }
    }

    return items;
}

export function printErrorChain(error: Error): void {
    let useErrors = collectErrorChain(error);

    if (useErrors.length === 0){
        useErrors = [error];
    }

    // Show the deepest error first
    useErrors.reverse();

    for (const err of useErrors) {
        console.log("  " + err.toString());
    }
}