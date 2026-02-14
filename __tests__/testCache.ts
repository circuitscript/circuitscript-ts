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
import { NodeScriptEnvironment } from '../src/environment.js';
import { computeContentHash } from '../src/cache/hash.js';
import { getCachePath, readCache, writeCache } from '../src/cache/storage.js';
import { CACHE_SCHEMA_VERSION } from '../src/cache/types.js';

const LIB_PATH = '__tests__/testData/cacheData/lib1.cst';
const LIB_CONTENT = readFileSync(LIB_PATH, 'utf8');

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
}> {
    const env = new NodeScriptEnvironment();
    NodeScriptEnvironment.setInstance(env);
    await env.prepareSVGEnvironment();
    env.setCurrentFile(scriptPath);

    const visitor = new ParserVisitor(true, null, env);
    visitor.printToConsole = false;

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
    } catch {
        hasError = true;
    }
    visitor.exitFile();
    hasError = hasError || errorListener.hasSyntaxErrors();

    return { hasError, visitor };
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
                { name: 'my_ic', namespace: '__lib__.', uniqueId: 'uid1', sourceText: 'def my_ic(): ...' }
            ],
            variables: [
                { name: 'MY_CONST', value: 42 }
            ],
        };
        writeCache(libPath, hash, ir);
        const result = readCache(libPath, hash);
        expect(result).not.toBeNull();
        expect(result!.functions).toHaveLength(1);
        expect(result!.functions[0].name).toEqual('my_ic');
        expect(result!.variables[0].value).toEqual(42);
    });

    test('readCache returns null on wrong hash', () => {
        const hash = computeContentHash(LIB_CONTENT);
        const ir = {
            schemaVersion: CACHE_SCHEMA_VERSION,
            contentHash: hash,
            libraryFilePath: libPath,
            functions: [],
            variables: [],
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
    const importScript = `import lib1\n\nU1 = my_ic()\n`;

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
