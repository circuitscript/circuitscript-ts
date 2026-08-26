/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Turns on V8's on-disk compile cache so that repeated CLI invocations reuse
 * the previous run's bytecode instead of recompiling the whole module graph.
 *
 * This has to happen before the rest of the module graph is pulled in, which is
 * why it lives in its own module and is imported first by main.ts - in the CJS
 * build the emitted `require` calls run in source order, so this one lands
 * ahead of the expensive ones.
 *
 * Requires Node 22.1+; older runtimes simply don't get the speedup. The ESM
 * build is unaffected because ES module imports are all resolved before any
 * module body runs.
 */
try {
    if (typeof require === 'function') {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('node:module').enableCompileCache?.();
    }
} catch {
    // Best effort only - a missing or failing compile cache must never stop
    // the CLI from starting.
}

export {};
