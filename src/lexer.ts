/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Adapted from: 
 *  https://github.com/antlr/grammars-v4/blob/master/python/python3/TypeScript/Python3LexerBase.ts
 */

import { CharStream, Token, CommonToken } from "antlr4ng";
import { CircuitScriptParser } from "./antlr/CircuitScriptParser.js";
import { CircuitScriptLexer } from "./antlr/CircuitScriptLexer.js";
import { LexerDiagnosticCollector } from "./LexerDiagnosticListener.js";

export class MainLexer extends CircuitScriptLexer {

    // A queue where extra tokens are pushed on (see the NEWLINE lexer rule).
    tokens: Token[];

    // Head pointer for O(1) dequeue from the token queue.
    private tokensHead: number;

    // The stack that keeps track of the indentation level.
    indents: number[];

    // The amount of opened braces, brackets and parenthesis.
    opened: number;

    // Diagnostic collector for performance analysis
    diagnosticCollector: LexerDiagnosticCollector;

    constructor(input: CharStream, enableDiagnostics = false) {
        super(input);
        this.tokens = [];
        this.tokensHead = 0;
        this.indents = [];
        this.opened = 0;

        this.diagnosticCollector = new LexerDiagnosticCollector();
        this.diagnosticCollector.setEnabled(enableDiagnostics);
    }

    reset(): void {
        this.tokens = [];
        this.tokensHead = 0;
        this.indents = [];
        this.opened = 0;

        super.reset();
    }

    emitToken(token: Token): void {
        this.diagnosticCollector.onTokenStart();

        super.emitToken(token);
        this.tokens.push(token);

        this.diagnosticCollector.onTokenGenerated(token, this.tokens.length - this.tokensHead);
    }

    nextToken(): Token {
        // Check if the end-of-file is ahead and there are still some DEDENTS expected.
        if (this.inputStream.LA(1) === CircuitScriptParser.EOF && this.indents.length) {
            // Remove any trailing EOF tokens from our buffer.
            let writeIdx = this.tokensHead;
            for (let i = this.tokensHead; i < this.tokens.length; i++) {
                if (this.tokens[i].type !== CircuitScriptParser.EOF) {
                    this.tokens[writeIdx++] = this.tokens[i];
                }
            }
            this.tokens.length = writeIdx;

            // First emit an extra line break that serves as the end of the statement.
            const fillerNewLine = this.commonToken(CircuitScriptParser.NEWLINE, "");
            this.emitToken(fillerNewLine);

            // Set this property to indicate that this token should be skipped
            // during the refdes annotated output generation, because this
            // shouldn't have any text/char associated with it.
            fillerNewLine.__skip = true;

            // Now emit as much DEDENT tokens as needed.
            while (this.indents.length) {
                this.emitToken(this.createDedent());
                this.indents.pop();
            }
            // Put the EOF back on the token stream.
            this.emitToken(this.commonToken(CircuitScriptParser.EOF, ""));
        }
        const next = super.nextToken();

        let returnToken: Token;
        if (this.tokensHead < this.tokens.length) {
            returnToken = this.tokens[this.tokensHead++];
            // Compact the queue periodically to avoid unbounded memory growth.
            if (this.tokensHead > 64) {
                this.tokens = this.tokens.slice(this.tokensHead);
                this.tokensHead = 0;
            }
        } else {
            returnToken = next;
        }

        return returnToken;
    }

    createDedent(): Token {
        return this.commonToken(CircuitScriptParser.DEDENT, "");
    }

    getCharIndex(): number {
        return this.inputStream.index;
    }

    commonToken(type: number, text: string, start = -1, stop = -1): Token {
        // If no start and stop provided, then try to infer based on the
        // current char index and the length of the text.
        if (start === -1 && stop === -1) {
            stop = this.getCharIndex() - 1;
            start = text.length ? stop - text.length + 1 : stop;
        }

        const token =
            CommonToken.fromSource(
                [this, this.inputStream], type, 0, start, stop);

        let tokenTypeString: string | null = null;

        if (type === CircuitScriptParser.INDENT) {
            tokenTypeString = 'indent';
        } else if (type === CircuitScriptParser.DEDENT) {
            tokenTypeString = 'dedent';
        } else if (type === CircuitScriptParser.NEWLINE) {
            tokenTypeString = 'newline';
        } else if (type === CircuitScriptParser.EOF){
            tokenTypeString = 'EOF';
        }

        if (tokenTypeString !== null) {
            token.text = tokenTypeString;
        }

        return token;
    }

    private getIndentationCount(whitespace: string): number {
        let count = 0;
        for (let i = 0; i < whitespace.length; i++) {
            if (whitespace[i] === '\t') {
                count += 8 - count % 8;
            } else {
                count++;
            }
        }
        return count;
    }

    openBrace(): void {
        this.opened++;
    }

    closeBrace(): void {
        this.opened--;
    }

    onNewLine(): void {
        // Split this.text into the newline chars and the trailing whitespace.
        // this.text matches NEWLINE: ( '\r'? '\n' | '\r' | '\f' ) SPACES?
        // so it starts with newline chars followed by optional spaces/tabs.
        const text = this.text;
        let nlLen = 0;

        while (nlLen < text.length) {
            const c = text.charCodeAt(nlLen);
            if (c === 13 /* \r */ || c === 10 /* \n */ || c === 12 /* \f */) {
                nlLen++;
            } else {
                break;
            }
        }
        const newLine = text.substring(0, nlLen);
        const spaces = text.substring(nlLen);

        // Strip newlines inside open clauses except if we are near EOF. We keep NEWLINEs near EOF to
        // satisfy the final newline needed by the single_put rule used by the REPL.
        const next = this.inputStream.LA(1);
        const nextnext = this.inputStream.LA(2);

        if (this.opened > 0 || (nextnext != -1 /* EOF */ &&
            (next === 13 /* '\r' */ || next === 10 /* '\n' */ || next === 35 /* '#' */))) {

            // If we're inside a list or on a blank line, ignore all indents,
            // dedents and line breaks.
            this.skip();

        } else {
            const charIndex = this.getCharIndex();

            // New line will be at the start
            const start = charIndex - this.text.length;
            const stop = charIndex - 1;

            // The newline token should only be a single char token.
            this.emitToken(this.commonToken(CircuitScriptParser.NEWLINE, newLine, start, start));

            const indent = this.getIndentationCount(spaces);
            const previous = this.indents.length ? this.indents[this.indents.length - 1] : 0;

            if (indent === previous) {
                // skip indents of the same size as the present indent-size
                this.skip();
            } else if (indent > previous) {
                this.indents.push(indent);
                
                // Offset by 1, because of the newline char
                this.emitToken(this.commonToken(CircuitScriptParser.INDENT, 
                    spaces, start + 1, stop));
            } else {
                // Possibly emit more than 1 DEDENT token.
                while (this.indents.length && this.indents[this.indents.length - 1] > indent) {
                    this.emitToken(this.createDedent());
                    this.indents.pop();
                }
            }
        }
    }
}

