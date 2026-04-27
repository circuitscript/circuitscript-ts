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

import { ScriptOptions} from './helpers.js';
import { renderScript } from "./pipeline.js";
import { NodeScriptEnvironment } from "./environment/environment.js";
import { _id } from './render/export.js';
import { printErrorChain } from './errors.js';

export default async function main(): Promise<void> {
    const env = new NodeScriptEnvironment();
    NodeScriptEnvironment.setInstance(env);

    const version = env.getPackageVersion();

    const collectOutputPaths = (val: string, prev: string[]) => [...prev, val];

    program
        .description('generate graphical output from circuitscript files')
        .version(version)
        .argument('[input path]', 'Input path')
        .argument('[output path]', 'Output path')
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
        .option('--o <fileName>', 'Additional output path (can be repeated)', collectOutputPaths, [])
        ;

    program.addHelpText('before', figlet.textSync('circuitscript', {
        font: 'Small Slant'
    }));

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

                parseFile(scriptData, outputPaths, scriptOptions);
            }
        });
    }
}

async function parseFile(scriptData: string, outputPaths: string[],
    scriptOptions: ScriptOptions): Promise<string | null> {

    try {
        const { svgOutput: output, errors } =
            await renderScript(scriptData, outputPaths, scriptOptions);

        errors.forEach((err, index) => {
            console.log(`[${index}] ${err}`);
        });

        if (errors.length > 0) {
            console.log('Render failed due to syntax or parsing errors');
        }

        return output;
    } catch (error) {
        console.error(`Unexpected Error:`);
        printErrorChain(error);
    }

    return null;
}

main();