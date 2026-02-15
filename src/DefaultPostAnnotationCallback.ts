import { CommonTokenStream, ParserRuleContext } from "antlr4ng";
import { ScriptContext } from "./antlr/CircuitScriptParser.js";
import { NodeScriptEnvironment } from "./environment.js";
import { RefdesFileSuffix } from "./globals.js";
import { ScriptOptions, AnnotatedFile, RefdesOutputType, ExternalLibAnnotationFile } from "./helpers.js";
import { ClassComponent } from "./objects/ClassComponent.js";
import { ImportedLibrary } from "./objects/types.js";
import { RefdesAnnotationVisitor } from "./RefdesAnnotationVisitor.js";

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

    // Generate refdes annotation comments
    if (inputPath && (updateSource || saveAnnotatedCopy !== undefined)) {

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
            const { scriptData, tokens, tree, filePath, libraryName, 
                referencedTokens = [], isMainFile = false } = item;

            let usePath = filePath;

            // What path to save to for libary files??
            if (isMainFile && saveAnnotatedCopy === true) {
                const dir = environment.dirname(filePath);
                const ext = environment.extname(filePath);
                const basename = environment.basename(filePath, ext);
                usePath = environment.join(dir, `${basename}.annotated${ext}`);
            } else if (isMainFile && typeof saveAnnotatedCopy === 'string') {
                usePath = saveAnnotatedCopy as string;
            }

            let updatedScriptData = scriptData;

            const isCachedLibrary = tokens === null && tree === null;

            // Handled cached libraries
            if (isCachedLibrary && referencedTokens) {
                const updatedLines = updatedScriptData.split('\n');

                for (const [tokens, tree] of referencedTokens) {
                    const inputStream = tokens.tokenSource.inputStream!;

                    // Only a section of the entire code file.
                    const scriptChunk = 
                        inputStream.getTextFromRange(0, inputStream.size);

                    const tmpVisitor = new RefdesAnnotationVisitor(true,
                        scriptChunk, tokens, componentLinks);
                    tmpVisitor.visit(tree);

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
                    scriptData, tokens, componentLinks);
                tmpVisitor.visit(tree);

                updatedScriptData = tmpVisitor.getOutput();
            }

            environment.writeFileSync(usePath, updatedScriptData);

            let display = 'Refdes annotations';
            if (libraryName) {
                display += ` for library ${libraryName}`;
            }

            console.log(`${display} saved to ${usePath}`);
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
                    scriptData, tokens, componentLinks);

                await tmpVisitor.visit(tree);

                const output = tmpVisitor.getOutputForExternalRefdesFile();

                // Use relative path from inputPath to filePath
                const relativeFilePath = environment.relative(inputDir, filePath);

                libraries.push({
                    name: libraryName!!,
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

            environment.writeFileSync(
                refdesFilePath,
                JSON.stringify(jsonFile, null, 4)
            );

            console.log(`External refdes annotations saved to ${refdesFilePath}`);
        }
    }
}
