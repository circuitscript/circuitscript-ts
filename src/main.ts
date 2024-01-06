#! /usr/bin/env node

import { program } from 'commander';
import figlet from 'figlet';

import fs from 'fs';
import path from 'path';

import { MainVisitor } from './visitor';
import { prepareSizing } from './sizing';
import { LayoutEngine } from './layout';
import { generateSVG2 } from './render';
import { SequenceAction } from './objects/ExecutionScope';
import { parseFileWithVisitor } from './parser';
import { generateKiCADNetList } from './export';
import { SimpleStopwatch } from './utils';

export default async function main(): Promise<void> {

    program
        .argument('input', 'Input path')
        .option('-o, --output <type>', 'Output path')
        .option('-w, --watch', 'Watch for file changes')
        .option('-n, --dump-nets', 'Dump out net information')
        ;

    program.addHelpText('before', figlet.textSync('circuitscript', {
        font: 'Small Slant'
    }));

    program.parse();

    const options = program.opts();
    const [inputPath] = program.args;

    const watchFileChanges = options.watch;
    const outputPath = options.output ?? null;
    const dumpNets = options.dumpNets;

    if (watchFileChanges) {
        console.log('watching for file changes...');
    }

    await prepareSizing();

    const scriptData = fs.readFileSync(inputPath, {encoding: 'utf-8'});
    const currentDirectory = path.dirname(inputPath);

    const output = renderScript(scriptData, outputPath, 
        currentDirectory, dumpNets);

    if (outputPath === null){
        console.log(output);
    }

    if (watchFileChanges) {
        fs.watch(inputPath, (event, targetFile) => {
            if (event === 'change') {
                const scriptData = fs.readFileSync(inputPath, 
                    {encoding: 'utf-8'});

                renderScript(scriptData, outputPath,
                    currentDirectory, dumpNets);
                console.log('done');
            }
        });
    }
}


export function renderScript(scriptData: string, outputPath: string, 
    currentDirectory:string = null, dumpNets = false): string {

    const visitor = new MainVisitor(true);

    visitor.onImportFile = (visitor: MainVisitor, importPath: string): { hasError: boolean, hasParseError: boolean } => {
        // Check if different files exist first
        const tmpFilePath = path.join(currentDirectory, importPath + ".cst");
        visitor.print('importing path:', tmpFilePath);

        const fileData = fs.readFileSync(tmpFilePath, { encoding: 'utf8' });
        visitor.print('done reading imported file data');

        const { hasError, hasParseError } =
            parseFileWithVisitor(visitor, fileData);

        return { hasError, hasParseError }
    }

    visitor.print('reading file');
    visitor.print('done reading file');

    const { tree, parser,
        hasParseError, hasError, 
        parserTimeTaken, 
        lexerTimeTaken } = parseFileWithVisitor(visitor, scriptData);

    console.log('Lexing took:', lexerTimeTaken);
    console.log('Parsing took:', parserTimeTaken);
    
    if (dumpNets){
        console.log(visitor.dumpNets());
    }
    // console.log(visitor.dumpUniqueNets());

    // await writeFile('dump/tree.lisp', tree.toStringTree(null, parser));

    // await writeFile('dump/raw-parser.txt', visitor.logger.dump());
    
    if (hasError || hasParseError) {
        console.log('Error while parsing');
        return;
    }

    visitor.annotateComponents();

    const kicadNetList = generateKiCADNetList(visitor.getNetList());
    // await writeFile('dump/kicad.net', kicadNetList);

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

    // await writeFile('dump/raw-sequence.txt', tmpSequence.join('\n'));
    let svgOutput: string = null;

    try {
        const layoutEngine = new LayoutEngine();
        const layoutTimer = new SimpleStopwatch();

        const graph = layoutEngine.runLayout(sequence, nets);

        console.log('Layout took:', layoutTimer.lap());

        // await writeFile('dump/raw-layout.txt', layoutEngine.logger.dump());

        const generateSvgTimer = new SimpleStopwatch();
        svgOutput = generateSVG2(graph);
        console.log('Render took:', generateSvgTimer.lap());

        if (outputPath){
            fs.writeFileSync(outputPath, svgOutput);
        } 
    } catch (err) {
        console.log('Failed to render:');
        console.log(err)
    }

    return svgOutput;
}

if (require.main === module){
    main();
}