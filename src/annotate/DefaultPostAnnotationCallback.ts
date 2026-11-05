/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CommonTokenStream, ParserRuleContext } from "antlr4ng";
import { ScriptContext } from "../antlr/CircuitScriptParser.js";
import { NodeScriptEnvironment } from "../environment/environment.js";
import { RefdesFileSuffix } from "../globals.js";
import { ScriptOptions, AnnotatedFile, RefdesOutputType, ExternalLibAnnotationFile } from "../helpers.js";
import { ClassComponent } from "../objects/ClassComponent.js";
import { ImportedLibrary } from "../objects/types.js";
import { RefdesAnnotationVisitor } from "./RefdesAnnotationVisitor.js";
import { RefdesModification, resolveRefdesMode } from "./utils.js";

export type AnnotationOutputFile = {
    filePath: string;
    content: string;
    isMainFile: boolean;
    kind: 'source' | 'external-refdes';
    libraryName?: string;
};

export type GenerateAnnotatedFilesOptions = {
    // Skip library cache side effects (modifications, writeToCache)
    skipCacheSideEffects?: boolean;
};

/*
 * Computes annotated file contents without writing anything.
 */
export async function generateAnnotatedFiles(options: ScriptOptions,
    scriptData: string,
    tree: ScriptContext,
    tokens: CommonTokenStream,
    componentLinks: Map<ParserRuleContext, ClassComponent>,
    importedLibraries: ImportedLibrary[],
    environment: NodeScriptEnvironment,
    genOptions: GenerateAnnotatedFilesOptions = {}): Promise<{ files: AnnotationOutputFile[]; skippedIndexed: number }> {
    const { skipCacheSideEffects = false } = genOptions;
    const {
        indexedRefdes, refdesMode: optRefdesMode, inputPath = null,
    } = options;

    const refdesMode = resolveRefdesMode(optRefdesMode, indexedRefdes);
    let skippedIndexed = 0;
    const files: AnnotationOutputFile[] = [];

    if (inputPath) {
        // Files where the source is updated
        const sourceAnnotatedFiles: AnnotatedFile[] = [{
            isMainFile: true,
            scriptData,
            tokens,
            tree,
            filePath: inputPath,
            outputType: RefdesOutputType.WithSource
        }];

        // Collect all libraries that need external refdes annotation files
        const externalRefdesLibraries: AnnotatedFile[] = [];

        // For the imported libraries, check if refdes annotation is enabled.
        for (const library of importedLibraries) {
            let outputType = RefdesOutputType.None;
            if (library.enableRefdesAnnotation) {
                outputType = RefdesOutputType.WithSource;
            } else if (library.enableRefdesAnnotationFile) {
                outputType = RefdesOutputType.CreateExternalFile;
            }

            if (outputType !== RefdesOutputType.None) {
                const { libraryFilePath, libraryName, 
                    tokens: libTokens, tree: libTree } = library;

                // TODO: load file from the visitor loadedFiles instead.
                const libraryScriptData = await environment.readFile(
                    libraryFilePath, { encoding: 'utf8' });

                const annotatedFile = {
                    tokens: libTokens,
                    tree: libTree,
                    filePath: libraryFilePath,
                    scriptData: libraryScriptData,
                    libraryName,
                    outputType,

                    library: library,
                    referencedTokens: library.referencedTokens,
                };

                if (outputType === RefdesOutputType.CreateExternalFile) {
                    externalRefdesLibraries.push(annotatedFile);
                } else {
                    sourceAnnotatedFiles.push(annotatedFile);
                }
            }
        }

        // Process files that need inline annotation
        for (const item of sourceAnnotatedFiles) {
            const { 
                scriptData, tokens, tree, filePath, libraryName, 
                referencedTokens = [], isMainFile = false,
                library
            } = item;

            let updatedScriptData = scriptData;

            const isCachedLibrary = tokens === null && tree === null;
            let modifications!: Map<ParserRuleContext, RefdesModification>;

            // Handled cached libraries
            if (isCachedLibrary && referencedTokens) {
                const updatedLines = updatedScriptData.split('\n');

                for (const [tokens, tree] of referencedTokens) {
                    const inputStream = tokens.tokenSource.inputStream!;

                    // Only a section of the entire code file.
                    const scriptChunk = 
                        inputStream.getTextFromRange(0, inputStream.size);

                    const tmpVisitor = new RefdesAnnotationVisitor(true,
                        scriptChunk, tokens, componentLinks, refdesMode);
                    tmpVisitor.visit(tree);
                    skippedIndexed += tmpVisitor.getSkippedIndexedCount();

                    modifications = tmpVisitor.getModifications();

                    // If there are some modifications, then update the
                    // write to cache flag.
                    if (!skipCacheSideEffects && modifications.size > 0 && library && !library.writeToCache){
                        library.writeToCache = true;
                    }

                    const resultOutput = tmpVisitor.getOutput();
                    const resultLines = resultOutput.split('\n');

                    // Offset to copy over in the final output
                    const replaceStartLine = tokens.get(0).line;

                    // Replace the corresponding lines in updatedScriptData with resultOutput
                    updatedLines.splice(replaceStartLine - 1, resultLines.length, ...resultLines);
                }

                updatedScriptData = updatedLines.join('\n');

            } else {
                const tmpVisitor = new RefdesAnnotationVisitor(true,
                    scriptData, tokens, componentLinks, refdesMode);
                tmpVisitor.visit(tree);
                skippedIndexed += tmpVisitor.getSkippedIndexedCount();
                modifications = tmpVisitor.getModifications();

                updatedScriptData = tmpVisitor.getOutput();
            }

            if (!skipCacheSideEffects) {
                library && library.addRefdesModifications(modifications);
            }

            files.push({
                filePath,
                content: updatedScriptData,
                isMainFile,
                kind: 'source',
                libraryName,
            });
        }

        // Process all external refdes libraries into a single JSON file
        if (externalRefdesLibraries.length > 0) {
            const inputDir = environment.dirname(inputPath!);
            const inputExt = environment.extname(inputPath!);
            const inputBasename = environment.basename(inputPath!, inputExt);
            const refdesFilePath = environment.join(inputDir, `${inputBasename}${RefdesFileSuffix}`);

            const libraries: ExternalLibAnnotationFile[] = [];

            for (const item of externalRefdesLibraries) {
                const { scriptData, tokens, tree, filePath, libraryName } = item;

                const tmpVisitor = new RefdesAnnotationVisitor(true,
                    scriptData, tokens, componentLinks, refdesMode);

                await tmpVisitor.visit(tree);
                skippedIndexed += tmpVisitor.getSkippedIndexedCount();

                const output = tmpVisitor.getOutputForExternalRefdesFile();

                // Use relative path from inputPath to filePath
                const relativeFilePath = environment.relative(inputDir, filePath);

                libraries.push({
                    name: libraryName!,
                    path: relativeFilePath,
                    items: output,
                });
            }

            // Sort libraries according to library name
            const sortedLibs = libraries.sort((a, b) => {
                return a.name.localeCompare(b.name);
            });

            const jsonFile = {
                format: 'v1',
                description: 'Stores external refdes for libraries',
                libraries: sortedLibs,
            };

            files.push({
                filePath: refdesFilePath,
                content: JSON.stringify(jsonFile, null, 4),
                isMainFile: false,
                kind: 'external-refdes',
            });
        }
    }

    return { files, skippedIndexed };
}

export async function DefaultPostAnnotationCallback(options: ScriptOptions,
    scriptData: string,
    tree: ScriptContext,
    tokens: CommonTokenStream,
    componentLinks: Map<ParserRuleContext, ClassComponent>,
    importedLibraries: ImportedLibrary[],
    environment: NodeScriptEnvironment): Promise<void> {
    const {
        inputPath = null, updateSource = false, saveAnnotatedCopy = undefined,
    } = options;

    if (!(inputPath && (updateSource || saveAnnotatedCopy !== undefined))) {
        return;
    }

    const { files, skippedIndexed } = await generateAnnotatedFiles(options,
        scriptData, tree, tokens, componentLinks, importedLibraries, environment);

    for (const file of files) {
        let usePath = file.filePath;

        if (file.isMainFile && saveAnnotatedCopy === true) {
            const dir = environment.dirname(file.filePath);
            const ext = environment.extname(file.filePath);
            const basename = environment.basename(file.filePath, ext);
            usePath = environment.join(dir, `${basename}.annotated${ext}`);
        } else if (file.isMainFile && typeof saveAnnotatedCopy === 'string') {
            usePath = saveAnnotatedCopy as string;
        }

        environment.writeFileSync(usePath, file.content);

        if (file.kind === 'external-refdes') {
            console.log(`External refdes annotations saved to ${usePath}`);
        } else {
            let display = 'Refdes annotations';
            if (file.libraryName) {
                display += ` for library ${file.libraryName}`;
            }
            console.log(`${display} saved to ${usePath}`);
        }
    }

    if (skippedIndexed > 0) {
        console.log(`Warning: ${skippedIndexed} loop/function-created components were not annotated in source (indexed refdes disabled); their refdes may change between runs.`);
    }
}
