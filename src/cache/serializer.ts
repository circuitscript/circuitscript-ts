/*
 * Copyright 2023 Liu Weihao
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CommonTokenStream, ParserRuleContext } from 'antlr4ng';
import { ImportedLibrary } from '../objects/types.js';
import { CACHE_SCHEMA_VERSION, LibraryCacheIR, SerializedFunctionDef, 
    SerializedExpression } from './types.js';
import { CircuitScriptLexer } from '../antlr/CircuitScriptLexer.js';
import { generateModifiedSourceText } from '../annotate/utils.js';

export function serializeLibraryScope(
    importedLib: ImportedLibrary,
    contentHash: string
): LibraryCacheIR {
    const functions: SerializedFunctionDef[] = [];
    const topLevelExpressions: SerializedExpression[] = [];

    const scope = importedLib.context.scope;
    const { tokens: libraryTokens, refdesAnnotations } = importedLib;

    const libraryInputStream = libraryTokens.tokenSource!.inputStream!;

    scope.functions.forEach((entry) => {

        let useSource = '';
        let useTokenLine = 0;
        let useTokenColumn = 0;

        // Complete library was parsed and loaded, not just the function!
        if (libraryTokens !== null && entry.source !== null) {
            const source = entry.source!;
            const startIndex = source.start?.tokenIndex ?? 0;
            const stopIndex = source.stop?.tokenIndex ?? -1;
            const contextTokens = libraryTokens.getTokens(startIndex, stopIndex);

            const startToken = source.start!;
            const startChar = startToken.start ?? -1;
            const stopChar = getFunctionDefinitionEnding(source, libraryTokens);

            // Derive source text from the complete library tokens.
            const sourceText =
                        libraryInputStream != null && startChar >= 0 && stopChar >= 0
                        ? libraryInputStream.getTextFromRange(startChar, stopChar)
                        : libraryTokens.getTextFromContext(source);

            useSource = generateModifiedSourceText(
                refdesAnnotations,
                contextTokens,
                sourceText,
                startToken.start
            );

            useTokenLine = startToken.line;
            useTokenColumn = startToken.column;
        }

        functions.push({
            name: entry.name,
            namespace: entry.originalNamespace,
            uniqueId: entry.uniqueId ?? '',

            sourceText: [
                useTokenLine, useTokenColumn, useSource
            ]
        });
    });

    // Collect all top-level expressions that are not function definitions, grouping
    // consecutive expressions into blocks. Expressions are considered continuous when
    // the next expression begins within one line of where the previous one ended
    // (i.e. no blank line between them). Blank lines and function definitions break
    // continuity and start a new block.
    const tree = importedLib.tree;
    if (tree != null) {

        let groupCtx: ParserRuleContext[] = [];
        let groupStart: [number, number] | null = null;
        let prevStopLine: number | null = null;

        const flushGroup = () => {
            let useSource = '';
            if (groupCtx.length > 0 && groupStart !== null) {

                // extract the output
                const startToken = groupCtx[0].start!;
                const stopToken = groupCtx[groupCtx.length - 1].stop!;

                const startIndex = startToken.tokenIndex ?? 0;
                const stopIndex = stopToken.tokenIndex ?? -1;
                const contextTokens = libraryTokens.getTokens(startIndex, stopIndex);

                const startChar = startToken.start ?? -1;
                const stopChar = stopToken.stop ?? -1;

                const sourceText = libraryInputStream.getTextFromRange(startChar, stopChar);

                // The token start offset is needed because the tokens are 
                // part of a larger array of tokens.
                useSource = generateModifiedSourceText(
                    refdesAnnotations,
                    contextTokens,
                    sourceText,
                    startToken.start
                );

                topLevelExpressions.push([
                    ...groupStart,
                    useSource
                ]);
            }

            groupCtx = [];
            groupStart = null;
            prevStopLine = null;
        };

        for (const exprCtx of tree.expression()) {
            // Function definitions break continuity and are handled separately.
            if (exprCtx.function_def_expr() !== null) {
                flushGroup();
                continue;
            }
            // NEWLINEs carry no executable semantics but are used as explicit
            // line separators within a group so that joining with '' produces
            // correctly formatted output.
            if (exprCtx.NEWLINE() !== null) {
                if (groupCtx.length > 0){
                    groupCtx.push(exprCtx);
                }
                continue;
            }

            const startToken = exprCtx.start;
            if (startToken == null) continue;

            // A gap of more than one line between the end of the previous expression
            // and the start of this one indicates a blank line — start a new block.
            const currentStartLine = startToken.line;
            if (prevStopLine !== null && currentStartLine > prevStopLine + 1) {
                flushGroup();
            }

            if (groupStart == null) {
                groupStart = [currentStartLine, startToken.column];
            }
            
            groupCtx.push(exprCtx);
            prevStopLine = exprCtx.stop?.line ?? currentStartLine;
        }

        flushGroup();
    }

    const imports: SerializedExpression[] = [];
    for (const [libName, lib] of importedLib.context.scope.libraries) {
        imports.push(lib.importStatement);
    }

    return {
        schemaVersion: CACHE_SCHEMA_VERSION,
        contentHash,
        libraryFilePath: importedLib.libraryFilePath,
        imports,
        functions,
        topLevel: topLevelExpressions,
    };
}

function getFunctionDefinitionEnding(source: ParserRuleContext, tokens: CommonTokenStream): number {
    // Walk backwards from the declared stop token to find the last token
    // before any trailing NEWLINE / DEDENT tokens (which are synthetic).
    let stopChar = source.stop?.stop ?? -1;
    const stopTokenIndex = source.stop?.tokenIndex ?? -1;
    if (stopTokenIndex >= 0) {
        for (let i = stopTokenIndex; i >= 0; i--) {
            const tok = tokens.get(i);
            if (
                tok.type !== CircuitScriptLexer.NEWLINE &&
                tok.type !== CircuitScriptLexer.DEDENT &&
                tok.type !== CircuitScriptLexer.INDENT
            ) {
                stopChar = tok.stop ?? stopChar;
                break;
            }
        }
    }

    return stopChar;
}