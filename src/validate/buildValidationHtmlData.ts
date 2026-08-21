/*
 * Copyright 2023 Liu Weihao
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Token } from 'antlr4ng';

import { IParsedToken } from '../semantic-tokens/SemanticTokenVisitor.js';
import { ParseSymbolType } from '../objects/types.js';
import { SymbolTableItem, SymbolTableItemDefined } from './SymbolTable.js';

export interface TokenAnnotation {
    line: number;
    column: number;
    length: number;
    text: string;
    tokenType: string;
    tokenModifiers: string[];
    symbolInfo?: {
        kind: 'defined' | 'undefined';
        id?: string;
        parseType?: ParseSymbolType;
        definedAt?: { line: number; column: number; fileName: string };
    };
}

/** Builds a lookup key for a token position within a source file. */
function annotationKey(line: number, column: number): string {
    return `${line}_${column}`;
}

/**
 * Merges semantic token data with symbol table information into a single
 * list of annotations, keyed by source position, sorted in document order.
 */
export function buildTokenAnnotations(
    parsedTokens: IParsedToken[],
    symbols: Map<string, SymbolTableItem>,
): TokenAnnotation[] {

    const annotations = new Map<string, TokenAnnotation>();

    parsedTokens.forEach(token => {
        annotations.set(annotationKey(token.line, token.column), {
            line: token.line,
            column: token.column,
            length: token.length,
            text: token.textValue,
            tokenType: token.tokenType,
            tokenModifiers: token.tokenModifiers,
        });
    });

    const attachSymbolInfo = (token: Token, symbolInfo: TokenAnnotation['symbolInfo']): void => {
        const annotation = annotations.get(annotationKey(token.line, token.column));
        if (annotation) {
            annotation.symbolInfo = symbolInfo;
        }
    };

    symbols.forEach((value, key) => {
        if (value.type !== ParseSymbolType.Undefined) {
            const definedValue = value as SymbolTableItemDefined;
            const token = definedValue.token;

            if (token !== null) {
                attachSymbolInfo(token, {
                    kind: 'defined',
                    id: key,
                    parseType: definedValue.type,
                    definedAt: {
                        line: token.line,
                        column: token.column,
                        fileName: definedValue.fileName,
                    },
                });
            }

            definedValue.instances.forEach(instance => {
                attachSymbolInfo(instance, {
                    kind: 'defined',
                    id: key,
                    parseType: definedValue.type,
                    definedAt: token !== null ? {
                        line: token.line,
                        column: token.column,
                        fileName: definedValue.fileName,
                    } : undefined,
                });
            });
        } else {
            if (value.token !== null) {
                attachSymbolInfo(value.token, { kind: 'undefined' });
            }
        }
    });

    return Array.from(annotations.values()).sort((a, b) => {
        if (a.line !== b.line) {
            return a.line - b.line;
        }
        return a.column - b.column;
    });
}
