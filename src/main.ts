#! /usr/bin/env node

/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


import { program } from 'commander';
import figlet from 'figlet';
import path from 'path';

import { watch } from 'fs';

import { NodeScriptEnvironment, 
    renderScript, 
    ScriptOptions} from './helpers.js';
import { _id } from './export.js';

export default async function main(): Promise<void> {
    const env = new NodeScriptEnvironment();
 
    const version = env.getPackageVersion();

    program
        .description('generate graphical output from circuitscript files')
        .version(version)
        .argument('[input path]', 'Input path')
        .argument('[output path]', 'Output path')
        .option('-i, --input text <input text>', 'Input text directly')
        .option('-c, --current-directory <path>', 'Set current directory')
        .option('-w, --watch', 'Watch for file changes')
        .option('-n, --dump-nets', 'Dump out net information')
        .option('-d, --dump-data', 'Dump data during parsing')
        .option('-s, --stats', 'Show stats during generation')
        .option('-x, --skip-output', 'Skip output generation')
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

    if (options.currentDirectory){
        env.setCurrentDirectory(options.currentDirectory);
    }
    
    if (watchFileChanges) {
        console.log('watching for file changes...');
    }

    await env.prepareSVGEnvironment();

    let inputFilePath = "";

    if (args.length > 2) {
        console.log("Error: Extra arguments passed");
        return;
    }

    let scriptData: string;
    if (args.length > 0 && args[0]) {
        inputFilePath = args[0];

        if (env.existsSync(inputFilePath)) {
            scriptData = env.readFileSync(inputFilePath, { encoding: 'utf-8' });
        } else {
            console.error("Error: File could not be found");
            return;
        }
    } else if (options.input) {
        scriptData = options.input;
    } else {
        console.error("Error: No input provided");
        return;
    }    

    const scriptOptions: ScriptOptions = {
        dumpNets, 
        dumpData,
        showStats: options.stats,
        environment: env,
    }

    let outputPath: string | null = null;
    if (args.length > 0 && args[1]) {
        // This is the output path
        outputPath = args[1];
    }

    const output = parseFile(scriptData, outputPath, scriptOptions);
    
    if (outputPath === null && output && (options.skipOutput === undefined)) {
        console.log(output);
    }
    
    if (watchFileChanges) {
        watch(inputFilePath, event => {
            if (event === 'change') {
                const scriptData = env.readFileSync(inputFilePath, 
                    {encoding: 'utf-8'});

                parseFile(scriptData, outputPath, scriptOptions);
            }
        });
    }
}

function parseFile(scriptData: string, outputPath: string | null, scriptOptions): string | null {
    try {
        const { svgOutput: output, errors } =
            renderScript(scriptData, outputPath, scriptOptions);

        errors.forEach((err, index) => {
            console.log(`[${index}] ${err}`);
        });

        if (errors.length > 0) {
            console.log('Render failed due to syntax or parsing errors');
        }

        return output;
    } catch (error) {
        console.error(`Unexpected Error: ${error}`);
    }
}

main();