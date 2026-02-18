import { NodeScriptEnvironment } from './environment.js';

// Matches: import "<name>"  (import_simple)
const IMPORT_SIMPLE_RE = /^import\s+"([^"]+)"/;
// Matches: from "<name>" import ...  (import_specific_or_all)
const IMPORT_FROM_RE = /^from\s+"([^"]*)"\s+import\b/;

/**
 * Extracts the import library names from the leading import statements in a .cst file's content.
 * Only scans lines until the first non-import, non-blank line (matching parser grammar behaviour).
 */
export function extractImportNames(fileData: string): string[] {
    const names: string[] = [];
    for (const rawLine of fileData.split('\n')) {
        const line = rawLine.trim();
        if (line === '' || line.startsWith('//') || line.startsWith('#')) continue;
        const simple = IMPORT_SIMPLE_RE.exec(line);
        if (simple) { names.push(simple[1]); continue; }
        const from = IMPORT_FROM_RE.exec(line);
        if (from) { names.push(from[1]); continue; }
        // First non-import expression — stop scanning
        break;
    }
    return names;
}

/**
 * Resolves an import library name to filepath.
 * Searches relative to the current file first, then in the default libs directory.
 * If the import is relative to the current file, then a relative path is 
 * returned. Otherwise, an absolute file path is returned.
 * Returns null if the file cannot be found.
 */
async function resolveImportPath(
    name: string,
    environment: NodeScriptEnvironment
): Promise<string | null> {
    const absPath = environment.getAbsPathRelativeToCurrentFolder(name + '.cst');
    const executionDirectory = environment.getCurrentDirectory();
    const relPath = environment.relative(executionDirectory, absPath)

    if (await environment.exists(relPath)) {
        return relPath;
    }

    const libPath = environment.getRelativeToDefaultLibs(name + '.cst');
    if (await environment.exists(libPath)) {
        return libPath;
    }

    return null;
}

/**
 * Recursively resolves all transitive import filepaths starting from a root file.
 * Returns a deduplicated list of all resolved import filepaths in traversal order.
 */
export async function resolveAllImportFilepaths(
    rootFilePath: string | null,
    scriptData: string | null,
    environment: NodeScriptEnvironment
): Promise<string[]> {
    const visited = new Set<string>();
    const result: string[] = [];

    async function walk(filePath: string | null, passedInScriptData?: string | null): Promise<void> {
        if (filePath !== undefined && filePath !== null){
            if (visited.has(filePath)) return;

            visited.add(filePath);
        }

        let fileData: string;
        if (passedInScriptData === undefined || passedInScriptData === null) {
            try {
                fileData = await environment.readFile(filePath!, { encoding: 'utf8' });
            } catch {
                return;
            }
        } else {
            fileData = passedInScriptData;
        }

        if (fileData) {
            const importNames = extractImportNames(fileData);
            const savedFile = environment.getCurrentFile();

            if (filePath) {
                environment.setCurrentFile(filePath);
            }

            for (const name of importNames) {
                const resolvedPath = await resolveImportPath(name, environment);
                if (resolvedPath) {
                    result.push(resolvedPath);
                    await walk(resolvedPath);
                }
            }

            if (filePath) {
                environment.setCurrentFile(savedFile);
            }
        }
    }

    await walk(rootFilePath, scriptData);

    // Is there some order?
    const uniqueResults = new Set(result);
    return Array.from(uniqueResults);
}

/**
 * Loads the contents of the given filepaths into a memory store (Map<filepath, content>).
 */
export async function loadImportsIntoMemoryStore(
    filepaths: string[],
    environment: NodeScriptEnvironment
): Promise<Map<string, string>> {
    const store = new Map<string, string>();

    for (const filePath of filepaths) {
        if (store.has(filePath)) continue;
        try {
            const content = await environment.readFile(filePath, { encoding: 'utf8' });
            store.set(filePath, content);
        } catch {
            // File not readable; skip
        }
    }

    return store;
}
