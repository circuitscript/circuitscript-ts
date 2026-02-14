/*
 * Copyright 2023 Liu Weihao
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ExecutionContext } from '../execute.js';
import { ImportedLibrary, ImportFunctionHandling } from '../objects/types.js';
import { ImportFileResult } from '../BaseVisitor.js';
import { LibraryCacheIR } from './types.js';

/**
 * Deserializes a cached library IR back into an ImportedLibrary.
 *
 * @param ir            - The cached IR to restore
 * @param name          - Library name (import identifier, no extension)
 * @param libraryNamespace  - Namespace string for the library
 * @param filePathUsed  - Absolute file path of the library file
 * @param importHandling    - How functions are imported
 * @param specificImports   - Specific functions to import, if any
 * @param importContext     - The ExecutionContext created for this import
 * @param parseAndVisit     - Callback that runs lex+parse+visit on text and
 *                            fills importContext.scope with the parsed functions
 */
export function deserializeLibraryScope(
    ir: LibraryCacheIR,
    name: string,
    libraryNamespace: string,
    filePathUsed: string,
    importHandling: ImportFunctionHandling,
    specificImports: string[],
    importContext: ExecutionContext,
    parseAndVisit: (miniScript: string, lineOffset: number) => ImportFileResult,

    enterContext: () => ExecutionContext,
    exitContext: () => void,

): ImportedLibrary {
    // Concatenate all function source texts into a single mini-script
    // const miniScript = ir.functions.map(f => f.sourceText).join('\n');

    ir.functions.forEach(func => {
        const { name, uniqueId, start } = func;
        const [line] = start;

        const functionEntry = importContext.createFunctionLazyLoaded(importContext.namespace, name, uniqueId);
        functionEntry.lazyLoader = () => {
            importContext.log(`loading lazy function ${name}`);

            // Enter previously created library context
            enterContext();

            // Line offset is needed to correctly position the code chunk.
            // Needed to ensure correct refdes annotations.
            parseAndVisit(func.sourceText, line-1);

            exitContext();
        }
    });

    // Re-parse only the function definitions (much smaller than full library)
    // const importResult = parseAndVisit(miniScript);

    // Build the ImportedLibrary — tree/tokens from the mini-script parse
    const importedLibrary = new ImportedLibrary(
        name,
        libraryNamespace,
        filePathUsed,
        null, null,
        importContext,
        importHandling,
        specificImports
    );

    // Inject cached primitive variables directly (skipping re-execution)
    for (const serializedVar of ir.variables) {
        if (serializedVar.value !== null) {
            importContext.scope.variables.set(serializedVar.name, serializedVar.value as boolean | number | string);
        }
    }

    return importedLibrary;
}
