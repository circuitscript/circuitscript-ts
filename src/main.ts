import 'source-map-support/register'

import fs from 'fs';
import CircuitScriptParser from './antlr/CircuitScriptParser';
import CircuitScriptLexer from './antlr/CircuitScriptLexer';

import { CharStream, CommonTokenStream } from 'antlr4';
import { MainVisitor } from './visitor';
import { generateLayout, prepareLayout } from './layout';
import { generateSVG } from './render';
import { prepareSizing } from './sizing';
import { LayoutEngine } from './layout2';
import { generateSVG2 } from './render2';
import { SequenceAction } from './objects/ExecutionScope';

export default async function main(): Promise<void> {
    await prepareSizing();

    const fileName = process.argv[2];
    await renderScript(fileName);

    let watch = false;
    if (process.argv.length > 2){
        if (process.argv[3] === "w"){
            watch = true;
        }
    }

    if (watch){
        fs.watch(fileName, (event, targetFile) => {
            if (event === 'change') {
                renderScript(fileName).then(() => {
                    console.log('Done');
                });
            }
        });
    }
}

class CircuitscriptParserErrorListener {

    syntaxErrorCounter = 0;

    syntaxError(recognizer: Recognizer<TSymbol>,
        offendingSymbol: TSymbol,
        line: number,
        column: number,
        msg: string,
        e: RecognitionException | undefined) {
        console.log("Syntax error: ", msg);

        this.syntaxErrorCounter ++;
    }

    hasParseErrors(): boolean {
        return (this.syntaxErrorCounter > 0);
    }
}

async function renderScript(fileName: string): Promise<void> {
    
    const data = await readFile(fileName);

    const chars = new CharStream(data);
    const lexer = new CircuitScriptLexer(chars);
    const tokens = new CommonTokenStream(lexer);

    const parser = new CircuitScriptParser(tokens);

    // Clear any existing error listeners and use the custom one only
    parser.removeErrorListeners();

    const errorListener = new CircuitscriptParserErrorListener();

    parser.addErrorListener(errorListener);

    const tree = parser.script();
    
    await writeFile('dump/tree.lisp', tree.toStringTree(null, parser));

    const visitor = new MainVisitor(true);
    let didHaveParseError = false;
    try {
        visitor.visit(tree);
    } catch (err) {
        console.log('got error:', err);
        didHaveParseError = true;
    }

    if (didHaveParseError || errorListener.hasParseErrors()) {
        return;
    }

    await writeFile('dump/raw-netlist.json', JSON.stringify(visitor.dump2(), null, 2));

    await writeFile('dump/raw-parser.txt', visitor.logger.dump());

    const { sequence, nets } = visitor.getGraph();

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

    await writeFile('dump/raw-sequence.txt', tmpSequence.join('\n'));

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
            try {
                const layoutEngine = new LayoutEngine();
                const graph = await layoutEngine.runLayout(sequence, nets);
                await writeFile('dump/raw-layout.txt', layoutEngine.logger.dump());

                generateSVG2(graph, outputSvgPath);
            } catch(err) {
                console.log('Failed to render:');
                console.log(err)
            }
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
