/*
 * Copyright 2023 Liu Weihao
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ImportedLibrary } from '../objects/types.js';
import { CACHE_SCHEMA_VERSION, LibraryCacheIR, SerializedFunctionDef, SerializedExpression } from './types.js';

export function serializeLibraryScope(
    importedLib: ImportedLibrary,
    contentHash: string
): LibraryCacheIR {
    const functions: SerializedFunctionDef[] = [];
    const topLevelExpressions: SerializedExpression[] = [];

    const scope = importedLib.context.scope;
    const tokens = importedLib.tokens;

    const inputStream = tokens.tokenSource?.inputStream ?? null;

    scope.functions.forEach((entry) => {
        if (entry.source != null && tokens != null) {
            // Use raw char positions to reconstruct source text instead of
            // concatenating token .text fields, which would include the synthetic
            // "newline" / "indent" / "dedent" strings inserted by the lexer.

            const startToken = entry.source.start!;
            const startChar = startToken.start ?? -1;
            const stopChar = entry.source.stop?.stop ?? -1;
            const sourceText =
                inputStream != null && startChar >= 0 && stopChar >= 0
                    ? inputStream.getTextFromRange(startChar, stopChar)
                    : tokens.getTextFromContext(entry.source);

            functions.push({
                name: entry.name,
                namespace: entry.originalNamespace,
                uniqueId: entry.uniqueId ?? '',

                // Original location within the file is needed to correctly
                // apply refdes annotations.
                sourceText: [
                    startToken.line, startToken.column, sourceText
                ]
            });
        }
    });

    // Collect all top-level expressions that are not function definitions, grouping
    // consecutive expressions into blocks. Expressions are considered continuous when
    // the next expression begins within one line of where the previous one ended
    // (i.e. no blank line between them). Blank lines and function definitions break
    // continuity and start a new block.
    const tree = importedLib.tree;
    if (tree != null) {
        let groupTexts: string[] = [];
        let groupStart: [number, number] | null = null;
        let prevStopLine: number | null = null;

        const flushGroup = () => {
            if (groupTexts.length > 0 && groupStart != null) {
                topLevelExpressions.push([
                    ...groupStart, 
                    groupTexts.join('\n')
                ]);
            }
            groupTexts = [];
            groupStart = null;
            prevStopLine = null;
        };

        for (const exprCtx of tree.expression()) {
            // Function definitions break continuity and are handled separately.
            if (exprCtx.function_def_expr() !== null) {
                flushGroup();
                continue;
            }
            // Standalone NEWLINEs carry no executable semantics; continuity is
            // determined by comparing line numbers of adjacent expressions instead.
            if (exprCtx.NEWLINE() !== null) continue;

            const startToken = exprCtx.start;
            if (startToken == null) continue;

            // A gap of more than one line between the end of the previous expression
            // and the start of this one indicates a blank line — start a new block.
            const currentStartLine = startToken.line;
            if (prevStopLine !== null && currentStartLine > prevStopLine + 1) {
                flushGroup();
            }

            const startChar = startToken.start ?? -1;
            const stopChar = exprCtx.stop?.stop ?? -1;
            const sourceText =
                inputStream != null && startChar >= 0 && stopChar >= 0
                    ? inputStream.getTextFromRange(startChar, stopChar)
                    : tokens.getTextFromContext(exprCtx);

            if (groupStart == null) {
                groupStart = [currentStartLine, startToken.column];
            }
            groupTexts.push(sourceText);
            prevStopLine = exprCtx.stop?.line ?? currentStartLine;
        }

        flushGroup();
    }

    const referencedLibraryFilePaths: string[] = [];
    importedLib.context.scope.libraries.forEach((lib) => {
        referencedLibraryFilePaths.push(lib.libraryFilePath);
    });

    return {
        schemaVersion: CACHE_SCHEMA_VERSION,
        contentHash,
        libraryFilePath: importedLib.libraryFilePath,
        referencedLibraryFilePaths,
        functions,
        topLevel: topLevelExpressions,
    };
}
