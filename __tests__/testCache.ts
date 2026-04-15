/*
 * Tests for the library file pre-compile cache system.
 */

import { existsSync, readFileSync, rmSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { CharStream, CommonTokenStream } from 'antlr4ng';
import { MainLexer } from '../src/lexer.js';
import { CircuitScriptParser } from '../src/antlr/CircuitScriptParser.js';
import { ParserVisitor } from '../src/visitor.js';
import { BaseVisitor, OnErrorHandler, ImportFileResult } from '../src/BaseVisitor.js';
import { parseFileWithVisitor, CircuitscriptParserErrorListener } from '../src/parser.js';
import { computeContentHash } from '../src/cache/hash.js';
import { getCachePath, readCache, writeCache } from '../src/cache/storage.js';
import { CACHE_SCHEMA_VERSION } from '../src/cache/types.js';
import { RefdesAnnotationVisitor } from '../src/annotate/RefdesAnnotationVisitor.js';
import { getTestEnvironment } from './helpers.js';

const LIB_PATH = '__tests__/testData/cacheData/lib1.cst';
const LIB_CONTENT = readFileSync(LIB_PATH, 'utf8');

const LIB2_PATH = '__tests__/testData/cacheData/lib2.cst';
const LIB2_CONTENT = readFileSync(LIB2_PATH, 'utf8');
const LIB3_PATH = '__tests__/testData/cacheData/lib3.cst';
const LIB3_CONTENT = readFileSync(LIB3_PATH, 'utf8');

function getCacheDir(libPath: string): string {
    return join(dirname(libPath), '.cst.cache');
}

function removeCacheDir(libPath: string): void {
    const cacheDir = getCacheDir(libPath);
    if (existsSync(cacheDir)) {
        rmSync(cacheDir, { recursive: true, force: true });
    }
}

async function runImportScript(script: string, scriptPath: string): Promise<{
    hasError: boolean;
    visitor: ParserVisitor;
    tree: ReturnType<CircuitScriptParser['script']>;
    tokens: CommonTokenStream;
}> {
    const env = getTestEnvironment();
    
    await env.prepareSVGEnvironment();
    env.setCurrentFile(scriptPath);

    const visitor = new ParserVisitor(true, null, env);
    visitor.printToConsole = false;
    visitor.enableCachedImportsRead = true;

    // Full onImportFile that returns tree + tokens (needed for cache serialization)
    visitor.onImportFile = (v: BaseVisitor, filePath: string, fileData: string,
        onErr: OnErrorHandler, fileLineOffset: number): ImportFileResult => {
        v.enterFile(filePath);
        const result = parseFileWithVisitor(v, fileData, { lineOffset: fileLineOffset });
        v.exitFile();
        return result;
    };

    visitor.enterFile(scriptPath);
    await visitor.resolveImportsAndLoad(scriptPath, script);

    const chars = CharStream.fromString(script);
    const lexer = new MainLexer(chars);
    const tokens = new CommonTokenStream(lexer);
    const parser = new CircuitScriptParser(tokens);
    parser.removeErrorListeners();

    const errorListener = new CircuitscriptParserErrorListener(visitor.onErrorHandler);
    parser.addErrorListener(errorListener);
    const tree = parser.script();

    let hasError = false;
    try {
        visitor.visit(tree);
    } catch (err){
        console.log('got err', err);
        hasError = true;
    }
    visitor.exitFile();

    // Annotate components (mirrors the real execution flow in helpers.ts)
    visitor.annotateComponents();
    visitor.cacheLibraries();

    hasError = hasError || errorListener.hasSyntaxErrors();

    return { hasError, visitor, tree, tokens };
}

describe('Cache hash utility', () => {
    test('produces consistent SHA-256 hex strings', () => {
        const hash1 = computeContentHash('hello world');
        const hash2 = computeContentHash('hello world');
        expect(hash1).toEqual(hash2);
        expect(hash1).toMatch(/^[0-9a-f]{64}$/);
    });

    test('different content produces different hashes', () => {
        const hash1 = computeContentHash('content A');
        const hash2 = computeContentHash('content B');
        expect(hash1).not.toEqual(hash2);
    });
});

describe('Cache storage', () => {
    const libPath = LIB_PATH;

    beforeEach(() => {
        removeCacheDir(libPath);
    });

    afterEach(() => {
        removeCacheDir(libPath);
    });

    test('getCachePath returns expected path format', () => {
        const cachePath = getCachePath(libPath);
        expect(cachePath).toContain('.cst.cache');
        expect(cachePath).toContain('lib1.cst.json');
    });

    test('readCache returns null when no file exists', () => {
        const hash = computeContentHash(LIB_CONTENT);
        const result = readCache(libPath, hash);
        expect(result).toBeNull();
    });

    test('writeCache then readCache returns the same IR', () => {
        const hash = computeContentHash(LIB_CONTENT);
        const ir = {
            schemaVersion: CACHE_SCHEMA_VERSION,
            contentHash: hash,
            libraryFilePath: libPath,
            functions: [
                { name: 'my_ic', namespace: '__lib__.', uniqueId: 'uid1', sourceText: [0, 0, 'def my_ic(): ...']}
            ],
            topLevel: [
                [3, 0, 'MY_CONST = 42']
            ],
        };
        writeCache(libPath, hash, ir);
        const result = readCache(libPath, hash);
        expect(result).not.toBeNull();
        expect(result!.functions).toHaveLength(1);
        expect(result!.functions[0].name).toEqual('my_ic');
        expect(result!.topLevel[0][2]).toEqual('MY_CONST = 42');
    });

    test('readCache returns null on wrong hash', () => {
        const hash = computeContentHash(LIB_CONTENT);
        const ir = {
            schemaVersion: CACHE_SCHEMA_VERSION,
            contentHash: hash,
            libraryFilePath: libPath,
            functions: [],
            topLevel: [],
        };
        writeCache(libPath, hash, ir);
        // Try to read with a different hash
        const result = readCache(libPath, 'wronghash');
        expect(result).toBeNull();
    });

    test('readCache returns null on corrupt JSON', () => {
        const hash = computeContentHash(LIB_CONTENT);
        const cachePath = getCachePath(libPath);
        const cacheDir = dirname(cachePath);
        if (!existsSync(cacheDir)) {
            mkdirSync(cacheDir, { recursive: true });
        }
        writeFileSync(cachePath, '{not valid json!!', 'utf8');
        const result = readCache(libPath, hash);
        expect(result).toBeNull();
    });
});

describe('Cache integration: import with cache', () => {
    const libPath = LIB_PATH;
    const scriptPath = '__tests__/testData/cacheData/main.cst';
    const importScript = `import "lib1"\n\nU1 = lib1.my_ic()\n`;

    beforeEach(() => {
        removeCacheDir(libPath);
    });

    afterEach(() => {
        removeCacheDir(libPath);
    });

    test('first run creates cache file', async () => {
        const cachePath = getCachePath(libPath);

        expect(existsSync(cachePath)).toBe(false);

        const { hasError } = await runImportScript(importScript, scriptPath);
        expect(hasError).toBe(false);

        expect(existsSync(cachePath)).toBe(true);
    });

    test('cache hit: second run uses cache and produces same result', async () => {
        // First run — populates cache
        const { hasError: err1, visitor: v1 } = await runImportScript(importScript, scriptPath);
        expect(err1).toBe(false);

        // Second run — should hit cache
        const { hasError: err2, visitor: v2 } = await runImportScript(importScript, scriptPath);
        expect(err2).toBe(false);

        // Both runs should find the same imported library scope
        const scope1 = v1.getScope();
        const scope2 = v2.getScope();

        const lib1 = scope1.libraries.get('lib1');
        const lib2 = scope2.libraries.get('lib1');

        expect(lib1).toBeDefined();
        expect(lib2).toBeDefined();

        // Both should have the same function names
        const funcNames1 = [...lib1!.context.scope.functions.keys()].sort();
        const funcNames2 = [...lib2!.context.scope.functions.keys()].sort();
        expect(funcNames1).toEqual(funcNames2);
    });

    test('cache invalidation: modified library content causes cache miss', async () => {
        const hash = computeContentHash(LIB_CONTENT);
        const cachePath = getCachePath(libPath);

        // First run to create cache
        await runImportScript(importScript, scriptPath);
        expect(existsSync(cachePath)).toBe(true);

        // A different content hash won't match the stored contentHash
        const differentContent = LIB_CONTENT + '\n# modified';
        const newHash = computeContentHash(differentContent);
        expect(newHash).not.toEqual(hash);

        // readCache with the new hash should return null (stored hash doesn't match)
        const result = readCache(libPath, newHash);
        expect(result).toBeNull();
    });

    test('cache corruption resilience: malformed cache file falls back to normal parse', async () => {
        const cachePath = getCachePath(libPath);
        const cacheDir = dirname(cachePath);

        // Pre-create a corrupt cache file
        if (!existsSync(cacheDir)) {
            mkdirSync(cacheDir, { recursive: true });
        }
        writeFileSync(cachePath, '{corrupted: json content!!!', 'utf8');
        expect(existsSync(cachePath)).toBe(true);

        // Should still succeed by falling back to full parse
        const { hasError } = await runImportScript(importScript, scriptPath);
        expect(hasError).toBe(false);
    });

    test('serialize/deserialize round-trip: function names match', async () => {
        // First run parses and caches
        const { hasError: err1, visitor: v1 } = await runImportScript(importScript, scriptPath);
        expect(err1).toBe(false);

        // Verify cache was written
        const hash = computeContentHash(LIB_CONTENT);
        const cachePath = getCachePath(libPath);
        expect(existsSync(cachePath)).toBe(true);

        const ir = readCache(libPath, hash);
        expect(ir).not.toBeNull();
        expect(ir!.functions.length).toBeGreaterThan(0);

        // Second run loads from cache
        const { hasError: err2, visitor: v2 } = await runImportScript(importScript, scriptPath);
        expect(err2).toBe(false);

        const lib1 = v1.getScope().libraries.get('lib1');
        const lib2 = v2.getScope().libraries.get('lib1');

        const funcNames1 = [...lib1!.context.scope.functions.keys()].sort();
        const funcNames2 = [...lib2!.context.scope.functions.keys()].sort();

        // Cached run should have same function names as non-cached run
        expect(funcNames2).toEqual(funcNames1);

        // Verify cached IR contains expected function names (stripped of namespace prefix)
        const cachedFuncNames = ir!.functions.map(f => f.name).sort();
        expect(cachedFuncNames).toContain('my_ic');
        expect(cachedFuncNames).toContain('my_resistor');
    });
});

describe('Refdes annotation: cache consistency', () => {
    const libPath = LIB_PATH;
    const scriptPath = '__tests__/testData/cacheData/main.cst';

    beforeEach(() => {
        removeCacheDir(libPath);
    });

    afterEach(() => {
        removeCacheDir(libPath);
    });

    test('annotation output is identical between fresh parse and cache hit', async () => {
        const script = `import "lib1"\nadd lib1.my_ic()\nadd lib1.my_resistor()\n`;

        // First run — full parse, populates cache
        const { hasError: err1, visitor: v1, tree: tree1, tokens: tok1 } =
            await runImportScript(script, scriptPath);
        expect(err1).toBe(false);

        const av1 = new RefdesAnnotationVisitor(true, script, tok1, v1.getComponentCtxLinks());
        await av1.visit(tree1);
        const output1 = av1.getOutput();

        // Second run — loads lib1 from cache
        const { hasError: err2, visitor: v2, tree: tree2, tokens: tok2 } =
            await runImportScript(script, scriptPath);
        expect(err2).toBe(false);

        const av2 = new RefdesAnnotationVisitor(true, script, tok2, v2.getComponentCtxLinks());
        await av2.visit(tree2);
        const output2 = av2.getOutput();

        // Both runs must produce identical annotation comments
        expect(output1).toContain('#= U1');
        expect(output2).toContain('#= U1');
        expect(output1).toContain('#= R1');
        expect(output2).toContain('#= R1');
        expect(output1).toEqual(output2);
    });
});

describe('Cache integration: transitive imports (lib2 → lib3)', () => {
    const scriptPath = '__tests__/testData/cacheData/main.cst';
    const importScript = `import "lib2"\n\nU1 = lib2.my_comp1()\n`;

    function removeBothCacheDirs(): void {
        removeCacheDir(LIB2_PATH);
        removeCacheDir(LIB3_PATH);
    }

    beforeEach(() => {
        removeBothCacheDirs();
    });

    afterEach(() => {
        removeBothCacheDirs();
    });

    test('first run creates cache files for lib2 and lib3', async () => {
        const cachePath2 = getCachePath(LIB2_PATH);
        const cachePath3 = getCachePath(LIB3_PATH);

        expect(existsSync(cachePath2)).toBe(false);
        expect(existsSync(cachePath3)).toBe(false);

        const { hasError } = await runImportScript(importScript, scriptPath);
        expect(hasError).toBe(false);

        expect(existsSync(cachePath2)).toBe(true);
        expect(existsSync(cachePath3)).toBe(true);
    });

    test('lib2 cache IR contains my_comp1; lib3 cache IR contains my_comp2', async () => {
        const { hasError } = await runImportScript(importScript, scriptPath);
        expect(hasError).toBe(false);

        const hash2 = computeContentHash(LIB2_CONTENT);
        const hash3 = computeContentHash(LIB3_CONTENT);

        const ir2 = readCache(LIB2_PATH, hash2);
        const ir3 = readCache(LIB3_PATH, hash3);

        expect(ir2).not.toBeNull();
        expect(ir3).not.toBeNull();

        const funcNames2 = ir2!.functions.map(f => f.name);
        const funcNames3 = ir3!.functions.map(f => f.name);

        expect(funcNames2).toContain('my_comp1');
        expect(funcNames3).toContain('my_comp2');
    });

    test('cache hit: second run uses cache and produces same scope as first run', async () => {
        // First run — full parse, populates both caches
        const { hasError: err1, visitor: v1 } = await runImportScript(importScript, scriptPath);
        expect(err1).toBe(false);

        // Second run — should hit cache for lib2 and lib3
        const { hasError: err2, visitor: v2 } = await runImportScript(importScript, scriptPath);
        expect(err2).toBe(false);

        const lib1 = v1.getScope().libraries.get('lib2');
        const lib2 = v2.getScope().libraries.get('lib2');

        expect(lib1).toBeDefined();
        expect(lib2).toBeDefined();

        const funcNames1 = [...lib1!.context.scope.functions.keys()].sort();
        const funcNames2 = [...lib2!.context.scope.functions.keys()].sort();
        expect(funcNames1).toEqual(funcNames2);
    });

    test('transitive function my_comp1 resolves correctly after cache hit', async () => {
        // First run — parse and cache
        const { hasError: err1, visitor: v1 } = await runImportScript(importScript, scriptPath);
        expect(err1).toBe(false);

        const lib1 = v1.getScope().libraries.get('lib2');
        expect(lib1).toBeDefined();
        expect([...lib1!.context.scope.functions.keys()]).toContain('--.[lib2].my_comp1');

        // Second run — cache hit
        const { hasError: err2, visitor: v2 } = await runImportScript(importScript, scriptPath);
        expect(err2).toBe(false);

        const lib2 = v2.getScope().libraries.get('lib2');
        expect(lib2).toBeDefined();
        expect([...lib2!.context.scope.functions.keys()]).toContain('--.[lib2].my_comp1');
    });

    test('cache invalidation: modified lib3 causes cache miss on lib3', async () => {
        // Populate lib3 cache
        await runImportScript(importScript, scriptPath);

        const hash3 = computeContentHash(LIB3_CONTENT);
        expect(existsSync(getCachePath(LIB3_PATH))).toBe(true);

        // Simulate lib3 content change — different hash won't match stored hash
        const modifiedContent = LIB3_CONTENT + '\n# modified';
        const newHash = computeContentHash(modifiedContent);
        expect(newHash).not.toEqual(hash3);

        const result = readCache(LIB3_PATH, newHash);
        expect(result).toBeNull();
    });

    test('cache corruption in lib3 falls back to normal parse', async () => {
        const cachePath3 = getCachePath(LIB3_PATH);
        const cacheDir3 = dirname(cachePath3);

        // Pre-create a corrupt lib3 cache
        if (!existsSync(cacheDir3)) {
            mkdirSync(cacheDir3, { recursive: true });
        }
        writeFileSync(cachePath3, '{corrupted: json!!!', 'utf8');
        expect(existsSync(cachePath3)).toBe(true);

        // Should succeed — corrupted lib3 cache causes fresh parse of lib3
        const { hasError } = await runImportScript(importScript, scriptPath);
        expect(hasError).toBe(false);
    });

    test('serialize/deserialize round-trip: lib2 and lib3 function names match across runs', async () => {
        // First run — parse and cache both libs
        const { hasError: err1, visitor: v1 } = await runImportScript(importScript, scriptPath);
        expect(err1).toBe(false);

        const hash2 = computeContentHash(LIB2_CONTENT);
        const hash3 = computeContentHash(LIB3_CONTENT);

        const ir2 = readCache(LIB2_PATH, hash2);
        const ir3 = readCache(LIB3_PATH, hash3);
        expect(ir2).not.toBeNull();
        expect(ir3).not.toBeNull();
        expect(ir2!.functions.length).toBeGreaterThan(0);
        expect(ir3!.functions.length).toBeGreaterThan(0);

        // Second run — both libs loaded from cache
        const { hasError: err2, visitor: v2 } = await runImportScript(importScript, scriptPath);
        expect(err2).toBe(false);

        const lib1 = v1.getScope().libraries.get('lib2');
        const lib2 = v2.getScope().libraries.get('lib2');

        const funcNames1 = [...lib1!.context.scope.functions.keys()].sort();
        const funcNames2 = [...lib2!.context.scope.functions.keys()].sort();
        expect(funcNames2).toEqual(funcNames1);

        // Cached IRs must contain the expected function names
        expect(ir2!.functions.map(f => f.name)).toContain('my_comp1');
        expect(ir3!.functions.map(f => f.name)).toContain('my_comp2');
    });
});
