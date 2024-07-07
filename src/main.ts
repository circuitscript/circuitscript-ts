#! /usr/bin/env node

import { program } from 'commander';
import figlet from 'figlet';
import path from 'path';

import { readFileSync, watch } from 'fs';

import { prepareSVGEnvironment } from './sizing.js';
import { getCurrentPath, renderScript } from './helpers.js';


export default async function main(): Promise<void> {
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
        scriptData = readFileSync(inputFilePath, { encoding: 'utf-8' });

        if (currentDirectory === null) {
            currentDirectory = path.dirname(inputFilePath);
        }
    }    

    const renderOptions = {
        currentDirectory,
        defaultLibsPath,
        dumpNets, 
        dumpData,
        kicadNetlistPath: kicadNetlist,
        showStats: options.stats,
    }

    const output = renderScript(scriptData, outputPath,
        renderOptions);

    if (outputPath === null && output){
        console.log(output);
    }

    if (watchFileChanges) {
        watch(inputFilePath, event => {
            if (event === 'change') {
                const scriptData = readFileSync(inputFilePath, 
                    {encoding: 'utf-8'});

                renderScript(scriptData, outputPath, renderOptions);
                console.log('done');
            }
        });
    }
}

main();