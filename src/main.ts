import 'source-map-support/register'

import fs from 'fs';
import path from 'path';

import { MainVisitor } from './visitor';
import { prepareSizing } from './sizing';
import { LayoutEngine } from './layout2';
import { generateSVG2 } from './render2';
import { SequenceAction } from './objects/ExecutionScope';
import { parseFileWithVisitor } from './parser';
import { generateKiCADNetList } from './export';

export default async function main(): Promise<void> {
    await prepareSizing();

    const fileName = process.argv[2];
    await renderScript(fileName);

    let watch = false;
    if (process.argv.length > 2) {
        if (process.argv[3] === "w") {
            watch = true;
        }
    }

    if (watch) {
        fs.watch(fileName, (event, targetFile) => {
            if (event === 'change') {
                renderScript(fileName).then(() => {
                    console.log('Done');
                });
            }
        });
    }
}


async function renderScript(scriptPath: string): Promise<void> {

    const visitor = new MainVisitor(true);

    visitor.onImportFile = (visitor: MainVisitor, importPath: string): { hasError: boolean, hasParseError: boolean } => {
        const currentDirectory = path.dirname(scriptPath);

        // Check if different files exist first
        const tmpFilePath = path.join(currentDirectory, importPath + ".cst");
        visitor.print('importing path:', tmpFilePath);

        const fileData = fs.readFileSync(tmpFilePath, { encoding: 'utf8' });
        const { hasError, hasParseError } =
            parseFileWithVisitor(visitor, fileData);

        return { hasError, hasParseError }
    }

    const scriptData = await readFile(scriptPath);

    const { tree, parser,
        hasParseError, hasError, 
        parserTimeTaken, 
        lexerTimeTaken } = parseFileWithVisitor(visitor, scriptData);

    console.log('Lexing took:', lexerTimeTaken);
    console.log('Parsing took:', parserTimeTaken);

    await writeFile('dump/tree.lisp', tree.toStringTree(null, parser));
    
    if (hasError || hasParseError) {
        console.log('Error while parsing');
        return;
    }

    visitor.annotateComponents();

    const kicadNetList = generateKiCADNetList(visitor.getNetList());
    await writeFile('dump/kicad.net', kicadNetList);

    await writeFile('dump/raw-netlist.json', JSON.stringify(visitor.dump2(), null, 2));

    await writeFile('dump/raw-parser.txt', visitor.logger.dump());

    const { sequence, nets } = visitor.getGraph();

    const tmpSequence = sequence.map(item => {
        const tmp = [...item];
        if (tmp[0] === SequenceAction.Wire) {
            tmp[2] = tmp[2].map(item2 => {
                return [item2.direction, item2.value].join(",");
            }).join(" ");

        } else if (tmp[0] === SequenceAction.WireJump) {

        } else {
            tmp[1] = item[1].instanceName;
        }

        return tmp.join(" | ");
    })

    await writeFile('dump/raw-sequence.txt', tmpSequence.join('\n'));

    const outputSvgPath = 'output.svg';

    try {
        const layoutEngine = new LayoutEngine();
        const time2 = new Date();
        const graph = await layoutEngine.runLayout(sequence, nets);

        const timeDiff = (new Date()) - time2;
        console.log('Layout took:', timeDiff);

        await writeFile('dump/raw-layout.txt', layoutEngine.logger.dump());

        const time3 = new Date();
        const svgOutput = generateSVG2(graph);

        fs.writeFile(outputSvgPath, svgOutput, (err) => {
            if (err) {
                console.log('error writing to file: ', err);
            } else {
                console.log('saved to', outputSvgPath);
            }
        });

        console.log('Render took:', (new Date()) - time3);
    } catch (err) {
        console.log('Failed to render:');
        console.log(err)
    }
}

enum LayoutType {
    ELKJS = 1,
    Custom = 2
}

async function writeFile(outputPath: string, contents: string): Promise<void> {
    return new Promise(resolve => {
        fs.writeFile(outputPath, contents, err => {
            if (err) {
                console.log('error writing file', err);
            }

            resolve();
        });
    });
}

async function readFile(fileName: string): Promise<string> {
    return new Promise((resolve) => {
        fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            resolve(data);
        });
    });
}

if (require.main === module) {
    main();
}
