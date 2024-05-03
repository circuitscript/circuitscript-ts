#! /usr/bin/env node

import { program } from 'commander';
import figlet from 'figlet';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync, watch, writeFileSync } from 'fs';

import { MainVisitor } from './visitor.js';
import { prepareSizing } from './sizing.js';
import { LayoutEngine } from './layout.js';
import { generateSVG2 } from './render.js';
import { SequenceAction } from './objects/ExecutionScope.js';
import { parseFileWithVisitor } from './parser.js';
import { generateKiCADNetList } from './export.js';
import { SimpleStopwatch } from './utils.js';

export default async function main(): Promise<void> {
    const toolSrcPath = fileURLToPath(import.meta.url);

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

    await prepareSizing(fontsPath);

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


export function renderScript(scriptData: string, outputPath: string, options): string {

    const {
        currentDirectory = null, 
        defaultLibsPath,
        dumpNets = false,
        dumpData = false,
        kicadNetlistPath = null,
        showStats = false} = options;

    const visitor = new MainVisitor(true);

    visitor.onImportFile = visitor.createImportFileHandler(currentDirectory, defaultLibsPath);

    visitor.print('reading file');
    visitor.print('done reading file');

    const { tree, parser,
        hasParseError, hasError, 
        parserTimeTaken, 
        lexerTimeTaken } = parseFileWithVisitor(visitor, scriptData);

    showStats && console.log('Lexing took:', lexerTimeTaken);
    showStats && console.log('Parsing took:', parserTimeTaken);
    dumpNets && console.log(visitor.dumpNets());

    dumpData && writeFileSync('dump/tree.lisp', tree.toStringTree(null, parser));
    dumpData && writeFileSync('dump/raw-parser.txt', visitor.logger.dump());
    
    if (hasError || hasParseError) {
        console.log('Error while parsing');
        return null;
    }

    visitor.annotateComponents();

    if (kicadNetlistPath) {
        const kicadNetList = generateKiCADNetList(visitor.getNetList());
        writeFileSync(kicadNetlistPath, kicadNetList);
        console.log('Generated KiCad netlist file');
    }
    

    // await writeFile('dump/raw-netlist.json', JSON.stringify(visitor.dump2(), null, 2));

    const { sequence, nets } = visitor.getGraph();

    // const tmpInstances = visitor.getExecutor().scope.instances;
    // for (const [instanceName, instance] of tmpInstances){
    //     console.log(instanceName);
    //     console.log(instance.pinNets);
    // }


    const tmpSequence = sequence.map(item => {
        const tmp = [...item];

        const action = tmp[0];

        if (action === SequenceAction.Wire) {
            tmp[2] = tmp[2].map(item2 => {
                return [item2.direction, item2.value].join(",");
            }).join(" ");
        } else if (action === SequenceAction.Frame) {
            tmp[1] = item[1].frameId;
            
        } else if (action !== SequenceAction.WireJump) {
            tmp[1] = item[1].instanceName;
        }

        return tmp.join(" | ");
    });

    dumpData && writeFileSync('dump/raw-sequence.txt', tmpSequence.join('\n'));
    let svgOutput: string = null;

    try {
        const layoutEngine = new LayoutEngine();
        const layoutTimer = new SimpleStopwatch();

        const graph = layoutEngine.runLayout(sequence, nets);

        layoutEngine.printWarnings();

        showStats && console.log('Layout took:', layoutTimer.lap());

        dumpData && writeFileSync('dump/raw-layout.txt', layoutEngine.logger.dump());

        const generateSvgTimer = new SimpleStopwatch();
        svgOutput = generateSVG2(graph);
        showStats && console.log('Render took:', generateSvgTimer.lap());

        if (outputPath){
            writeFileSync(outputPath, svgOutput);
        } 
    } catch (err) {
        console.log('Failed to render:');
        console.log(err)
    }

    return svgOutput;
}

main();