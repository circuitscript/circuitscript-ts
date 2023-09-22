import 'source-map-support/register'

import fs from 'fs';
import CircuitScriptParser from './antlr/CircuitScriptParser';
import CircuitScriptLexer from './antlr/CircuitScriptLexer';

import { CharStream, CommonTokenStream } from 'antlr4';
import { MainVisitor } from './visitor';
import { generateLayout, prepareLayout } from './layout';
import { generateSVG } from './render';
import { prepareSizing } from './sizing';
import { prepareLayout2 } from './layout2';
import { generateSVG2 } from './render2';
import { SequenceAction } from './objects/ExecutionScope';

export default async function main(): Promise<void> {
    await prepareSizing();

    const fileName = process.argv[2];
    const data = await readFile(fileName);

    const chars = new CharStream(data);
    const lexer = new CircuitScriptLexer(chars);
    const tokens = new CommonTokenStream(lexer);

    const parser = new CircuitScriptParser(tokens);
    const tree = parser.script();
    await writeFile('dump/tree.lisp', tree.toStringTree(null, parser));

    const visitor = new MainVisitor();
    try {
        visitor.visit(tree);
    } catch (err) {
        console.log('got error', err);
    }

    await writeFile('dump/raw-output.json', JSON.stringify(visitor.dump2(), null, 2));

    const { sequence } = visitor.getGraph();

    const tmpSequence = sequence.map(item => {
        const tmp = [...item];
        if (tmp[0] === SequenceAction.Wire){
            tmp[2] = tmp[2].map(item2 => {
                return [item2.direction, item2.value].join(",");
            }).join(" "); 
            
        } else if (tmp[0] === SequenceAction.WireJump){
            
        } else {
            tmp[1] = item[1].instanceName;
        }

        return tmp.join(" | ");
    })

    await writeFile('dump/raw-sequence.json', JSON.stringify(tmpSequence, null, 2));

    const layoutType: LayoutType = LayoutType.Custom;
    const outputSvgPath = 'output.svg';

    switch(layoutType){
        case LayoutType.ELKJS: {
            const graph = await prepareLayout(sequence);
            // Use ELKJS to plot
            await writeFile("dump/pre-elk.json", JSON.stringify(graph, null, 2));
    
            const elkOutput = await generateLayout(graph);
            await writeFile("dump/elk-output.json", JSON.stringify(elkOutput, null, 2));
    
            generateSVG(graph, outputSvgPath);
            break;
        }

        case LayoutType.Custom: {
            const graph = await prepareLayout2(sequence);
            generateSVG2(graph, outputSvgPath);
            break;
        }

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
