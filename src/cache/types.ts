/*
 * Copyright 2023 Liu Weihao
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const CACHE_SCHEMA_VERSION = 3;

export type SerializedExpression = [
    line: number,
    column: number,
    sourceText: string,     // source text of the expression
]

export interface SerializedFunctionDef {
    name: string;
    namespace: string;
    uniqueId: string;
    sourceText: SerializedExpression,
}

export interface LibraryCacheIR {
    schemaVersion: number;
    contentHash: string;
    libraryFilePath: string;
    imports: SerializedExpression[];
    functions: SerializedFunctionDef[];
    topLevel: SerializedExpression[];
}
