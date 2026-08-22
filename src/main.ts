#! /usr/bin/env node

/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


import { program } from 'commander';
import figlet from 'figlet';

import { watch } from 'fs';

import { ScriptOptions, renderResultHasFailure } from './helpers.js';
import { renderScript } from "./pipeline.js";
import { NodeScriptEnvironment } from "./environment/environment.js";
import { printErrorChain } from './errors.js';
import { VERSION } from './version.js';

export default async function main(): Promise<void> {
    const env = new NodeScriptEnvironment();
    NodeScriptEnvironment.setInstance(env);

    const collectOutputPaths = (val: string, prev: string[]) => [...prev, val];

    program
        .description('generate graphical output from circuitscript files (supported output formats: svg, pdf, kicad_sch, net, cir, html)')
        .version(VERSION)
        .argument('[input path]', 'Input path')
        .argument('[output path]', 'Output path (extension selects format, see below)')
        .option('-i, --input text <input text>', 'Input text directly')
        .option('-u, --update-source', 'Update source file with refdes annotation')
        .option('-j, --annotated-path [file-path]', 'Save annotated source file at given path')
        .option('-w, --watch', 'Watch for file changes')
        .option('-n, --dump-nets', 'Dump out net information')
        .option('-d, --dump-data', 'Dump data during parsing')
        .option('-s, --stats', 'Show stats during generation')
        .option('-x, --skip-output', 'Skip output generation')
        .option('-e, --erc', 'Enable ERC output')
        .option('-b, --bom [output-path]', 'Generate Bill of Materials in csv format')
        // .option('-l, --lexer-diagnostics', 'Enable lexer performance diagnostics')
        // .option('--lexer-verbose', 'Log each token as it is generated (requires -l)')
        // .option('--lexer-tokens [limit]', 'Print token stream (optionally limit number of tokens, requires -l)')
        // .option('--lexer-mapping [lines]', 'Print character-to-token mapping (optionally specify line range like "1-10", requires -l)')
        // .option('--lexer-summary', 'Print lexer operation summary (requires -l)')
        .option('--kicad-version <version>', 'KiCad schematic output version (9 or 10)', '9')
        .option('--no-simplify-refdes', 'Disable simplification of single-instance indexed refdes (e.g. R1_1 → R1)')
        .option('--o <fileName>', 'Additional output path (can be repeated), see below', collectOutputPaths, [])
        ;

    program.addHelpText('before', figlet.textSync('circuitscript', {
        font: 'Small Slant'
    }));

    program.addHelpText('after', `
Supported output formats (selected by output path extension):
  .svg         Scalable Vector Graphics schematic drawing
  .net         KiCad netlist file (for PCB import)
  .kicad_sch   KiCad schematic file
  .pdf         PDF schematic drawing
  .cir         ngspice simulation netlist
  .html        Interactive HTML viewer (pan/zoom, click-to-inspect)
`);

    if (process.argv.length < 3){
        program.help();
    }
    
    program.parse();    

    const options = program.opts();
    const args = program.args;

    const watchFileChanges = options.watch;
    const dumpNets = options.dumpNets;
    const dumpData = options.dumpData;
    const enableErc = options.erc;
    const enableBom = options.bom !== undefined;
    let bomOutputPath = options.bom;

    if (watchFileChanges) {
        console.log('watching for file changes...');
    }

    await env.prepareSVGEnvironment();

    let inputFilePath = "";

    let scriptData: string;

    if (options.input) {
        // If the input is provided, then use it
        scriptData = options.input;
    } else {
        // Otherwise the first argument should be the script data
        if (args.length > 0 && args[0]) {
            inputFilePath = args[0];

            if ((await env.exists(inputFilePath))) {
                scriptData = await env.readFile(inputFilePath, { encoding: 'utf-8' });
            } else {
                console.error("Error: File could not be found");
                process.exitCode = 1;
                return;
            }
        }
    }

    let updateSource = false;
    if (options.updateSource !== undefined){
        updateSource = options.updateSource;
    }
    
    let saveAnnotatedCopyPath = undefined;
    if (options.annotatedPath !== undefined){
        saveAnnotatedCopyPath = options.annotatedPath;
    }

    // Generate default BOM output path if not specified
    if (enableBom && (bomOutputPath === true || bomOutputPath === undefined)) {
        if (inputFilePath) {
            bomOutputPath = inputFilePath + '.bom.csv';
        } else {
            bomOutputPath = 'output.bom.csv';
        }
    }

    const scriptOptions: ScriptOptions = {
        dumpNets,
        dumpData,
        showStats: options.stats,
        enableErc,
        enableBom,
        bomOutputPath,
        environment: env,
        lexerDiagnostics: options.lexerDiagnostics,
        lexerVerbose: options.lexerVerbose,
        lexerTokens: options.lexerTokens,
        lexerMapping: options.lexerMapping,
        lexerSummary: options.lexerSummary,

        inputPath: inputFilePath,
        updateSource,
        saveAnnotatedCopy: saveAnnotatedCopyPath,
        kiCadVersion: options.kicadVersion,
        simplifyRefdes: options.simplifyRefdes,
    }

    // Build the list of output paths.
    const outputPaths: string[] = [];
    if (options.input && args.length > 0 && args[0]) {
        outputPaths.push(args[0]);
    } else if (args.length > 1 && args[1]) {
        outputPaths.push(args[1]);
    }
    outputPaths.push(...(options.o as string[]));

    const output = await parseFile(scriptData, outputPaths, scriptOptions);

    if (outputPaths.length === 0 && output && (options.skipOutput === undefined)) {
        console.log(output);
    }

    if (watchFileChanges) {
        watch(inputFilePath, async event => {
            if (event === 'change') {
                const scriptData = await env.readFile(inputFilePath,
                    {encoding: 'utf-8'});

                // Watch mode is a long-running dev loop; a failure on reload
                // shouldn't affect the process exit code. parseFile always
                // sets process.exitCode on failure, so save and restore it
                // around the reload to isolate this call's effect.
                const exitCodeBeforeReload = process.exitCode;
                await parseFile(scriptData, outputPaths, scriptOptions);
                process.exitCode = exitCodeBeforeReload;
            }
        });
    }
}

async function parseFile(scriptData: string, outputPaths: string[],
    scriptOptions: ScriptOptions): Promise<string | null> {

    try {
        const result = await renderScript(scriptData, outputPaths, scriptOptions);
        const { svgOutput: output, errors } = result;

        errors.forEach((err, index) => {
            console.log(`[${index}] ${err}`);
        });

        if (errors.length > 0) {
            console.log('Render failed due to syntax or parsing errors');
        }

        if (renderResultHasFailure(result)) {
            process.exitCode = 1;
        }

        return output;
    } catch (error) {
        console.error(`Unexpected Error:`);
        printErrorChain(error);

        process.exitCode = 1;
    }

    return null;
}

main();