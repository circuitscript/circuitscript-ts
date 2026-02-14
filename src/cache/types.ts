/*
 * Copyright 2023 Liu Weihao
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const CACHE_SCHEMA_VERSION = 1;

export interface SerializedFunctionDef {
    name: string;
    namespace: string;
    uniqueId: string;
    sourceText: string; // full "function name(...) { ... }" text
}

export interface SerializedVariable {
    name: string;
    value: boolean | number | string | null;
}

export interface LibraryCacheIR {
    schemaVersion: number;
    contentHash: string;
    libraryFilePath: string;
    referencedLibraryFilePaths: string[];
    functions: SerializedFunctionDef[];
    variables: SerializedVariable[];
}
