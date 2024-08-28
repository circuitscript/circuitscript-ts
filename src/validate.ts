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

import { readFileSync } from 'fs';

import { prepareSVGEnvironment } from './sizing.js';
import { getCurrentPath, getScriptText, getSemanticTokens, 
    validateScript } from './helpers.js';


export async function validate(): Promise<void> {
    const { filePath } = getCurrentPath();
    const toolSrcPath = filePath;

    const toolDirectory = path.dirname(toolSrcPath) + '/../../';
    const fontsPath = toolDirectory + '/fonts';
    const defaultLibsPath = toolDirectory + '/libs'; 
    
    const packageJson = JSON.parse(readFileSync(toolDirectory + 'package.json').toString());;
    const {version} = packageJson;

    program
        .description('generate graphical output from circuitscript files')
        .version(version)
        .option('-i, --input text <input text>', 'Input text directly')
        .option('-f, --input-file <path>', 'Input file')
        .option('-o, --output <path>', 'Output path')
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

    const watchFileChanges = options.watch;
    const outputPath = options.output ?? null;
    const dumpNets = options.dumpNets;
    const dumpData = options.dumpData;
    const kicadNetlist = options.kicadNetlist;

    let currentDirectory = options.currentDirectory ?? null;

    if (watchFileChanges) {
        console.log('watching for file changes...');
    }

    await prepareSVGEnvironment(fontsPath);

    let inputFilePath: string = null;

    let scriptData: string;
    if (options.input) {
        scriptData = options.input;
    } else {
        inputFilePath = options.inputFile; // this should be provided
        const tmpScriptData = getScriptText(inputFilePath);

        if (tmpScriptData === null) {
            throw "File does not exists";
        }

        scriptData = tmpScriptData;

        if (currentDirectory === null) {
            currentDirectory = path.dirname(inputFilePath);
        }
    }    

    const scriptOptions = {
        currentDirectory,
        defaultLibsPath,
        dumpNets, 
        dumpData,
        kicadNetlistPath: kicadNetlist,
        showStats: options.stats,
    }
    
    const visitor = validateScript(scriptData, scriptOptions);
    // visitor.dumpSymbols();

    const semanticTokensVisitor = getSemanticTokens(scriptData, scriptOptions);


}

validate();