import { writeFileSync } from "fs";

import { generateKiCADNetList } from "./export.js";
import { LayoutEngine } from "./layout.js";
import { SequenceAction } from "./objects/ExecutionScope.js";
import { parseFileWithVisitor } from "./parser.js";
import { generateSVG2 } from "./render.js";
import { SimpleStopwatch } from "./utils.js";
import { MainVisitor } from "./visitor.js";
import { createContext } from "this-file";

export enum JSModuleType {
    CommonJs = 'cjs',
    ESM = 'mjs',
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

    try {
        visitor.annotateComponents();
    } catch (err) {
        console.log('Error during annotation: ', err);
    }

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

        if (outputPath) {
            writeFileSync(outputPath, svgOutput);
        }
    } catch (err) {
        console.log('Error during render: ', err);
    }

    return svgOutput;
}

export function detectJSModuleType(): JSModuleType {
    if (typeof __filename === 'undefined' && 
            typeof __dirname === 'undefined'
    ){
        return JSModuleType.ESM;
    } else {
        return JSModuleType.CommonJs;
    }
}

const context = createContext();

export function getCurrentPath(): { filePath: string } {
    const filename = context.filename;
    return { filePath: filename };
}