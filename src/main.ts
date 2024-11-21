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

import { readFileSync, watch, existsSync } from 'fs';

import { prepareSVGEnvironment } from './sizing.js';
import { getDefaultLibsPath, getFontsPath, getPackageVersion, 
    renderScript } from './helpers.js';
import { _id } from './export.js';

export default async function main(): Promise<void> {
    const fontsPath = getFontsPath();
    const defaultLibsPath = getDefaultLibsPath(); 
    const version = getPackageVersion();

    program
        .description('generate graphical output from circuitscript files')
        .version(version)
        .argument('[input path]', 'Input path')
        .argument('[output path]', 'Output path')
        .option('-i, --input text <input text>', 'Input text directly')
        .option('-c, --current-directory <path>', 'Set current directory')
        .option('-k, --kicad-netlist <filename>', 'Create KiCad netlist')
        .option('-w, --watch', 'Watch for file changes')
        .option('-n, --dump-nets', 'Dump out net information')
        .option('-d, --dump-data', 'Dump data during parsing')
        .option('-s, --stats', 'Show stats during generation')
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
    const kicadNetlist = options.kicadNetlist;

    let currentDirectory = options.currentDirectory ?? null;

    if (watchFileChanges) {
        console.log('watching for file changes...');
    }

    await prepareSVGEnvironment(fontsPath);

    let inputFilePath = "";

    if (args.length > 2) {
        console.log("Error: Extra arguments passed");
        return;
    }

    let scriptData: string;
    if (args.length > 0 && args[0]) {
        inputFilePath = args[0];

        if (existsSync(inputFilePath)) {
            scriptData = readFileSync(inputFilePath, { encoding: 'utf-8' });

            if (currentDirectory === null) {
                currentDirectory = path.dirname(inputFilePath);
            }
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

    const scriptOptions = {
        currentDirectory,
        defaultLibsPath,
        dumpNets, 
        dumpData,
        kicadNetlistPath: kicadNetlist,
        showStats: options.stats,
    }

    let outputPath: string | null = null;
    if (args.length > 0 && args[1]) {
        // This is the output path
        outputPath = args[1];
    }
    
    const output = renderScript(scriptData, outputPath,
        scriptOptions);

    if (outputPath === null && output){
        console.log(output);
    }

    if (watchFileChanges) {
        watch(inputFilePath, event => {
            if (event === 'change') {
                const scriptData = readFileSync(inputFilePath, 
                    {encoding: 'utf-8'});

                renderScript(scriptData, outputPath, scriptOptions);
                console.log('done');
            }
        });
    }
}

main();