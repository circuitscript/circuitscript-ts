/*
 * Copyright 2023 Liu Weihao
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync, renameSync } from 'fs';
import { dirname, basename, join } from 'path';
import { CACHE_SCHEMA_VERSION, LibraryCacheIR } from './types.js';

export function getCachePath(libFilePath: string): string {
    const dir = dirname(libFilePath);
    const base = basename(libFilePath);
    return join(dir, '.cst.cache', `${base}.json`);
}

export function readCache(libFilePath: string, hash: string): LibraryCacheIR | null {
    try {
        const cachePath = getCachePath(libFilePath);
        if (!existsSync(cachePath)) {
            return null;
        }
        const raw = readFileSync(cachePath, 'utf8');
        const ir = JSON.parse(raw) as LibraryCacheIR;
        if (ir.schemaVersion !== CACHE_SCHEMA_VERSION || ir.contentHash !== hash) {
            return null;
        }
        return ir;
    } catch {
        return null;
    }
}

export function writeCache(libFilePath: string, hash: string, ir: LibraryCacheIR): void {
    try {
        const cachePath = getCachePath(libFilePath);
        const cacheDir = dirname(cachePath);
        if (!existsSync(cacheDir)) {
            mkdirSync(cacheDir, { recursive: true });
        }
        const tmp = cachePath + '.tmp';
        writeFileSync(tmp, JSON.stringify(ir), 'utf8');
        renameSync(tmp, cachePath);
    } catch {
        // Cache write failures are non-fatal
    }
}
