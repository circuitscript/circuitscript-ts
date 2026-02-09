/*
 * Copyright 2023 Liu Weihao
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Token } from "antlr4ng";
import { CircuitScriptParser } from "./antlr/CircuitScriptParser.js";

/**
 * Represents a token in the token stream with its position and metadata
 */
export interface TokenStreamEntry {
    index: number;
    type: string;
    text: string;
    line: number;
    column: number;
    startPos: number;
    stopPos: number;
    channel: number;
    timeUs: number;
}

/**
 * Diagnostic information collected during lexing
 */
export interface LexerDiagnostics {
    // Total statistics
    totalTokens: number;
    totalCharactersProcessed: number;
    totalTimeMicroseconds: number;

    // Token type statistics
    tokenTypeStats: Map<string, TokenTypeStats>;

    // Performance metrics
    averageTokenTimeUs: number;
    slowestTokens: Array<{ type: string; timeUs: number; text: string; line: number; column: number }>;

    // Character stream statistics
    peakCharacterPosition: number;

    // Indentation tracking (specific to CircuitScript)
    indentCount: number;
    dedentCount: number;
    newlineCount: number;

    // Token queue statistics
    maxQueueSize: number;
    averageQueueSize: number;
    largeQueueLocations: Array<{ queueSize: number; tokenIndex: number; line: number; column: number; tokenType: string; text: string }>;

    // Token stream
    tokenStream: TokenStreamEntry[];
}

export interface TokenTypeStats {
    count: number;
    totalTimeUs: number;
    averageTimeUs: number;
    totalCharacters: number;
}

/**
 * Diagnostic listener that wraps lexer operations to collect performance data
 */
export class LexerDiagnosticCollector {
    private startTime = 0n;
    private tokenStartTime = 0n;

    private totalTokens = 0;
    private totalCharactersProcessed = 0;

    private tokenTypeStats = new Map<string, TokenTypeStats>();
    private slowestTokens: Array<{ type: string; timeUs: number; text: string; line: number; column: number }> = [];

    private peakCharacterPosition = 0;

    private indentCount = 0;
    private dedentCount = 0;
    private newlineCount = 0;

    private queueSizeSamples: number[] = [];
    private maxQueueSize = 0;
    private largeQueueLocations: Array<{ queueSize: number; tokenIndex: number; line: number; column: number; tokenType: string; text: string }> = [];

    private tokenStream: TokenStreamEntry[] = [];
    private verboseLogging = false;
    private sourceText = '';

    private enabled = true;

    constructor() {
        this.reset();
    }

    /**
     * Enable or disable diagnostic collection
     */
    setEnabled(enabled: boolean): void {
        this.enabled = enabled;
    }

    /**
     * Enable or disable verbose logging (prints each token as it's generated)
     */
    setVerboseLogging(enabled: boolean): void {
        this.verboseLogging = enabled;
    }

    /**
     * Set the source text for character-to-token visualization
     */
    setSourceText(sourceText: string): void {
        this.sourceText = sourceText;
    }

    /**
     * Reset all diagnostic data
     */
    reset(): void {
        this.startTime = process.hrtime.bigint();
        this.tokenStartTime = 0n;

        this.totalTokens = 0;
        this.totalCharactersProcessed = 0;

        this.tokenTypeStats.clear();
        this.slowestTokens = [];

        this.peakCharacterPosition = 0;

        this.indentCount = 0;
        this.dedentCount = 0;
        this.newlineCount = 0;

        this.queueSizeSamples = [];
        this.maxQueueSize = 0;
        this.largeQueueLocations = [];
        this.tokenStream = [];
    }

    /**
     * Mark the start of token generation
     */
    onTokenStart(): void {
        if (!this.enabled) return;
        this.tokenStartTime = process.hrtime.bigint();
    }

    /**
     * Record a generated token and its timing
     */
    onTokenGenerated(token: Token, queueSize: number): void {
        if (!this.enabled) return;

        const endTime = process.hrtime.bigint();
        const elapsedNs = endTime - this.tokenStartTime;
        const elapsedUs = Number(elapsedNs) / 1000;

        this.totalTokens++;

        // Track character position
        if (token.stop > this.peakCharacterPosition) {
            this.peakCharacterPosition = token.stop;
        }

        const tokenLength = token.stop - token.start + 1;
        this.totalCharactersProcessed += tokenLength;

        // Get token type name
        const tokenTypeName = this.getTokenTypeName(token.type);

        // Update token type statistics
        let stats = this.tokenTypeStats.get(tokenTypeName);
        if (!stats) {
            stats = {
                count: 0,
                totalTimeUs: 0,
                averageTimeUs: 0,
                totalCharacters: 0
            };
            this.tokenTypeStats.set(tokenTypeName, stats);
        }

        stats.count++;
        stats.totalTimeUs += elapsedUs;
        stats.averageTimeUs = stats.totalTimeUs / stats.count;
        stats.totalCharacters += tokenLength;

        // Track special token types
        if (token.type === CircuitScriptParser.INDENT) {
            this.indentCount++;
        } else if (token.type === CircuitScriptParser.DEDENT) {
            this.dedentCount++;
        } else if (token.type === CircuitScriptParser.NEWLINE) {
            this.newlineCount++;
        }

        // Track slowest tokens (keep top 10)
        if (elapsedUs > 10) { // Only track tokens that took more than 10 microseconds
            this.slowestTokens.push({
                type: tokenTypeName,
                timeUs: elapsedUs,
                text: token.text?.substring(0, 50) || '',
                line: token.line,
                column: token.column
            });

            // Keep only top 20 slowest
            this.slowestTokens.sort((a, b) => b.timeUs - a.timeUs);
            if (this.slowestTokens.length > 20) {
                this.slowestTokens = this.slowestTokens.slice(0, 20);
            }
        }

        // Track queue size
        this.queueSizeSamples.push(queueSize);
        if (queueSize > this.maxQueueSize) {
            this.maxQueueSize = queueSize;
        }

        // Track large queue sizes (above threshold of 50)
        if (queueSize > 50) {
            this.largeQueueLocations.push({
                queueSize,
                tokenIndex: this.totalTokens,
                line: token.line,
                column: token.column,
                tokenType: tokenTypeName,
                text: token.text?.substring(0, 50) || ''
            });

            // Keep only the largest 50 queue sizes for analysis
            this.largeQueueLocations.sort((a, b) => b.queueSize - a.queueSize);
            if (this.largeQueueLocations.length > 50) {
                this.largeQueueLocations = this.largeQueueLocations.slice(0, 50);
            }
        }

        // Record token in stream
        const tokenEntry: TokenStreamEntry = {
            index: this.totalTokens - 1,
            type: tokenTypeName,
            text: token.text || '',
            line: token.line,
            column: token.column,
            startPos: token.start,
            stopPos: token.stop,
            channel: token.channel,
            timeUs: elapsedUs
        };
        this.tokenStream.push(tokenEntry);

        // Verbose logging
        if (this.verboseLogging) {
            this.logToken(tokenEntry);
        }
    }

    /**
     * Get human-readable token type name
     */
    private getTokenTypeName(tokenType: number): string {
        // Use the parser's vocabulary to get the symbolic name
        const symbolicName = CircuitScriptParser.vocabulary.getSymbolicName(tokenType);
        if (symbolicName) {
            return symbolicName;
        }

        // Fallback to literal name or token type number
        const literalName = CircuitScriptParser.vocabulary.getLiteralName(tokenType);
        if (literalName) {
            return literalName;
        }

        return `TOKEN_TYPE_${tokenType}`;
    }

    /**
     * Log a single token to console (for verbose mode)
     */
    private logToken(token: TokenStreamEntry): void {
        const textPreview = token.text.length > 40
            ? token.text.substring(0, 37) + '...'
            : token.text;
        const displayText = textPreview.replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t');
        console.log(
            `[${token.index.toString().padStart(5)}] ` +
            `${token.type.padEnd(18)} ` +
            `@${token.line}:${token.column.toString().padStart(3)} ` +
            `[${token.startPos}-${token.stopPos}] ` +
            `"${displayText}"`
        );
    }

    /**
     * Generate diagnostic report
     */
    getDiagnostics(): LexerDiagnostics {
        const endTime = process.hrtime.bigint();
        const totalTimeNs = endTime - this.startTime;
        const totalTimeUs = Number(totalTimeNs) / 1000;

        const averageQueueSize = this.queueSizeSamples.length > 0
            ? this.queueSizeSamples.reduce((a, b) => a + b, 0) / this.queueSizeSamples.length
            : 0;

        return {
            totalTokens: this.totalTokens,
            totalCharactersProcessed: this.totalCharactersProcessed,
            totalTimeMicroseconds: totalTimeUs,

            tokenTypeStats: this.tokenTypeStats,

            averageTokenTimeUs: this.totalTokens > 0 ? totalTimeUs / this.totalTokens : 0,
            slowestTokens: this.slowestTokens,

            peakCharacterPosition: this.peakCharacterPosition,

            indentCount: this.indentCount,
            dedentCount: this.dedentCount,
            newlineCount: this.newlineCount,

            maxQueueSize: this.maxQueueSize,
            averageQueueSize: averageQueueSize,
            largeQueueLocations: this.largeQueueLocations,

            tokenStream: this.tokenStream
        };
    }

    /**
     * Print a formatted diagnostic report to console
     */
    printReport(): void {
        const diagnostics = this.getDiagnostics();

        console.log('\n=== Lexer Diagnostic Report ===\n');

        console.log('Overall Statistics:');
        console.log(`  Total tokens generated: ${diagnostics.totalTokens}`);
        console.log(`  Total characters processed: ${diagnostics.totalCharactersProcessed}`);
        console.log(`  Total time: ${(diagnostics.totalTimeMicroseconds / 1000).toFixed(2)} ms`);
        console.log(`  Average time per token: ${diagnostics.averageTokenTimeUs.toFixed(2)} μs`);
        console.log(`  Tokens per second: ${(diagnostics.totalTokens / (diagnostics.totalTimeMicroseconds / 1000000)).toFixed(0)}`);

        console.log('\nIndentation Statistics:');
        console.log(`  INDENT tokens: ${diagnostics.indentCount}`);
        console.log(`  DEDENT tokens: ${diagnostics.dedentCount}`);
        console.log(`  NEWLINE tokens: ${diagnostics.newlineCount}`);

        console.log('\nToken Queue Statistics:');
        console.log(`  Max queue size: ${diagnostics.maxQueueSize}`);
        console.log(`  Average queue size: ${diagnostics.averageQueueSize.toFixed(2)}`);

        console.log('\nTop Token Types by Count:');
        const sortedByCount = Array.from(diagnostics.tokenTypeStats.entries())
            .sort((a, b) => b[1].count - a[1].count)
            .slice(0, 10);

        sortedByCount.forEach(([type, stats]) => {
            const percentage = (stats.count / diagnostics.totalTokens * 100).toFixed(1);
            console.log(`  ${type.padEnd(20)} ${stats.count.toString().padStart(6)} (${percentage}%)  avg: ${stats.averageTimeUs.toFixed(2)} μs`);
        });

        console.log('\nTop Token Types by Time:');
        const sortedByTime = Array.from(diagnostics.tokenTypeStats.entries())
            .sort((a, b) => b[1].totalTimeUs - a[1].totalTimeUs)
            .slice(0, 10);

        sortedByTime.forEach(([type, stats]) => {
            const percentage = (stats.totalTimeUs / diagnostics.totalTimeMicroseconds * 100).toFixed(1);
            console.log(`  ${type.padEnd(20)} ${(stats.totalTimeUs / 1000).toFixed(2).padStart(8)} ms (${percentage}%)  count: ${stats.count}`);
        });

        if (diagnostics.slowestTokens.length > 0) {
            console.log('\nSlowest Individual Tokens:');
            diagnostics.slowestTokens.slice(0, 10).forEach((token, idx) => {
                const textPreview = token.text.length > 30
                    ? token.text.substring(0, 27) + '...'
                    : token.text;
                console.log(`  ${(idx + 1).toString().padStart(2)}. ${token.type.padEnd(15)} ${token.timeUs.toFixed(2).padStart(8)} μs  at ${token.line}:${token.column}  "${textPreview}"`);
            });
        }

        if (diagnostics.largeQueueLocations.length > 0) {
            // Separate early (expected) vs later (unexpected) large queues
            const earlyThreshold = Math.min(100, diagnostics.totalTokens * 0.05); // First 5% or 100 tokens
            const earlyQueues = diagnostics.largeQueueLocations.filter(loc => loc.tokenIndex <= earlyThreshold);
            const laterQueues = diagnostics.largeQueueLocations.filter(loc => loc.tokenIndex > earlyThreshold);

            if (earlyQueues.length > 0) {
                console.log('\nLarge Token Queue Locations (Early - Expected from script rule):');
                console.log(`  Max queue: ${earlyQueues[0]?.queueSize || 0} at token ${earlyQueues[0]?.tokenIndex || 0}`);
            }

            if (laterQueues.length > 0) {
                console.log('\nLarge Token Queue Locations (Later - Potentially Problematic):');
                laterQueues.slice(0, 15).forEach((location, idx) => {
                    const textPreview = location.text.length > 30
                        ? location.text.substring(0, 27) + '...'
                        : location.text;
                    console.log(`  ${(idx + 1).toString().padStart(2)}. Queue: ${location.queueSize.toString().padStart(4)}  Token #${location.tokenIndex.toString().padStart(6)}  ${location.tokenType.padEnd(15)}  at ${location.line}:${location.column}  "${textPreview}"`);
                });
            } else if (earlyQueues.length > 0) {
                console.log('\nNo large token queues detected after initial parsing (Good!)');
            }
        }

        console.log('\n=== End of Report ===\n');
    }

    /**
     * Print the complete token stream
     */
    printTokenStream(limit?: number): void {
        console.log('\n=== Token Stream ===\n');

        const tokens = limit ? this.tokenStream.slice(0, limit) : this.tokenStream;

        tokens.forEach(token => {
            this.logToken(token);
        });

        if (limit && this.tokenStream.length > limit) {
            console.log(`\n... and ${this.tokenStream.length - limit} more tokens`);
        }

        console.log(`\nTotal: ${this.tokenStream.length} tokens\n`);
    }

    /**
     * Print character-to-token visualization showing how source text maps to tokens
     */
    printCharacterToTokenMapping(startLine?: number, endLine?: number): void {
        if (!this.sourceText) {
            console.log('\nNo source text available. Call setSourceText() before lexing.\n');
            return;
        }

        console.log('\n=== Character-to-Token Mapping ===\n');

        const lines = this.sourceText.split('\n');
        const start = startLine !== undefined ? Math.max(0, startLine - 1) : 0;
        const end = endLine !== undefined ? Math.min(lines.length, endLine) : lines.length;

        for (let lineNum = start; lineNum < end; lineNum++) {
            const line = lines[lineNum];
            const lineTokens = this.tokenStream.filter(t => t.line === lineNum + 1);

            console.log(`Line ${(lineNum + 1).toString().padStart(4)}: ${line}`);

            if (lineTokens.length > 0) {
                // Create a character map showing which characters belong to which token
                const charMap: string[] = new Array(line.length).fill(' ');
                const tokenLabels: Array<{ col: number; label: string }> = [];

                lineTokens.forEach((token, idx) => {
                    const char = String.fromCharCode(65 + (idx % 26)); // A, B, C, ...
                    const startCol = token.column;
                    const endCol = Math.min(token.column + token.text.length, line.length);

                    for (let i = startCol; i < endCol; i++) {
                        charMap[i] = char;
                    }

                    tokenLabels.push({
                        col: startCol,
                        label: `${char}=${token.type}`
                    });
                });

                console.log('       ' + charMap.join(''));
                tokenLabels.forEach(({ col, label }) => {
                    console.log('       ' + ' '.repeat(col) + '└─ ' + label);
                });
            }
            console.log('');
        }
    }

    /**
     * Print a summary of the lexer operation showing the parsing process
     */
    printLexerOperationSummary(): void {
        console.log('\n=== Lexer Operation Summary ===\n');

        console.log('Input Processing:');
        console.log(`  Source characters: ${this.sourceText.length}`);
        console.log(`  Characters tokenized: ${this.totalCharactersProcessed}`);
        console.log(`  Peak position: ${this.peakCharacterPosition}`);
        console.log(`  Coverage: ${((this.totalCharactersProcessed / Math.max(this.sourceText.length, 1)) * 100).toFixed(1)}%`);

        console.log('\nToken Generation:');
        console.log(`  Total tokens: ${this.totalTokens}`);
        console.log(`  Unique token types: ${this.tokenTypeStats.size}`);
        console.log(`  Average token length: ${(this.totalCharactersProcessed / Math.max(this.totalTokens, 1)).toFixed(2)} chars`);

        console.log('\nToken Type Distribution:');
        const topTypes = Array.from(this.tokenTypeStats.entries())
            .sort((a, b) => b[1].count - a[1].count)
            .slice(0, 8);

        topTypes.forEach(([type, stats]) => {
            const percentage = (stats.count / this.totalTokens * 100).toFixed(1);
            const bar = '█'.repeat(Math.floor(stats.count / this.totalTokens * 40));
            console.log(`  ${type.padEnd(18)} ${stats.count.toString().padStart(5)} (${percentage.padStart(5)}%) ${bar}`);
        });

        console.log('\nLexing Process:');
        console.log(`  INDENT tokens: ${this.indentCount}`);
        console.log(`  DEDENT tokens: ${this.dedentCount}`);
        console.log(`  NEWLINE tokens: ${this.newlineCount}`);
        console.log(`  Max token queue: ${this.maxQueueSize}`);
        console.log(`  Avg token queue: ${this.queueSizeSamples.length > 0 ? (this.queueSizeSamples.reduce((a, b) => a + b, 0) / this.queueSizeSamples.length).toFixed(1) : 0}`);

        console.log('\n=== End of Summary ===\n');
    }

    /**
     * Get recommendations for performance improvements
     */
    getRecommendations(): string[] {
        const diagnostics = this.getDiagnostics();
        const recommendations: string[] = [];

        // Check for excessive indentation tokens
        const indentationTokens = diagnostics.indentCount + diagnostics.dedentCount + diagnostics.newlineCount;
        const indentationPercentage = (indentationTokens / diagnostics.totalTokens) * 100;
        if (indentationPercentage > 20) {
            recommendations.push(`High percentage of indentation tokens (${indentationPercentage.toFixed(1)}%). Consider optimizing INDENT/DEDENT/NEWLINE processing.`);
        }

        // Check for large queue sizes (excluding early tokens from script rule)
        const earlyThreshold = Math.min(100, diagnostics.totalTokens * 0.05);
        const laterQueues = diagnostics.largeQueueLocations.filter(loc => loc.tokenIndex > earlyThreshold);

        if (laterQueues.length > 0 && laterQueues[0].queueSize > 100) {
            recommendations.push(`Large token queue detected after initial parsing (max: ${laterQueues[0].queueSize} at line ${laterQueues[0].line}:${laterQueues[0].column}). This may indicate excessive lookahead or buffering in specific grammar rules.`);
        } else if (diagnostics.maxQueueSize > 200) {
            recommendations.push(`Very large token queue detected during initial parsing (max: ${diagnostics.maxQueueSize}). This is expected for the script rule but consider if it's excessive.`);
        }

        // Check for slow token types
        const slowTokenTypes = Array.from(diagnostics.tokenTypeStats.entries())
            .filter(([, stats]) => stats.averageTimeUs > 50)
            .sort((a, b) => b[1].averageTimeUs - a[1].averageTimeUs);

        if (slowTokenTypes.length > 0) {
            slowTokenTypes.forEach(([type, stats]) => {
                recommendations.push(`Token type '${type}' has high average generation time (${stats.averageTimeUs.toFixed(2)} μs). Review lexer rule.`);
            });
        }

        // Check overall throughput
        const tokensPerSecond = diagnostics.totalTokens / (diagnostics.totalTimeMicroseconds / 1000000);
        if (tokensPerSecond < 100000) {
            recommendations.push(`Low token generation rate (${tokensPerSecond.toFixed(0)} tokens/sec). Consider lexer optimization.`);
        }

        return recommendations;
    }
}
