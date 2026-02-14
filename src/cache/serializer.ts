/*
 * Copyright 2023 Liu Weihao
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NumericValue, PercentageValue } from '../objects/ParamDefinition.js';
import { ImportedLibrary } from '../objects/types.js';
import { CACHE_SCHEMA_VERSION, LibraryCacheIR, SerializedFunctionDef, SerializedVariable } from './types.js';

function isPrimitiveValue(value: unknown): value is boolean | number | string {
    return typeof value === 'boolean' || typeof value === 'number' || typeof value === 'string';
}

export function serializeLibraryScope(
    importedLib: ImportedLibrary,
    contentHash: string
): LibraryCacheIR {
    const functions: SerializedFunctionDef[] = [];
    const variables: SerializedVariable[] = [];

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
                sourceText,

                // Original location within the file is needed to correctly
                // apply refdes annotations.
                start: [startToken.line, startToken.column]
            });
        }
    });

    scope.variables.forEach((value, name) => {
        if (isPrimitiveValue(value)) {
            variables.push({ name, value });
        } else if (value instanceof NumericValue) {
            variables.push({ name, value: value.value });
        } else if (value instanceof PercentageValue) {
            variables.push({ name, value: value.value });
        }
        // Skip ClassComponent and other non-serializable types
    });

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
        variables,
    };
}
