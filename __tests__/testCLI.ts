import { execSync } from 'child_process';
import figlet from 'figlet';
import { existsSync, mkdirSync, readFileSync, unlinkSync } from 'fs';
import { loadScriptFromFile, readFile } from './helpers';

describe('test cli program', () => {
    const tmpFolder = '__tests__/tmp';
    const mainPath = '__tests__/testData/cliTest/';
    const renderPath = '__tests__/testData/renderData/';

    const baseCommandESM = 'dist/esm/main.js';
    const baseCommandCJS = 'dist/cjs/main.js';

    const baseCommand = `node ${baseCommandESM}`;

    test('start program and display help', () => {
        const result = execSync(baseCommand).toString();

        const circuitscriptText = figlet.textSync('circuitscript', {
            font: 'Small Slant'
        });
        
        expect(result.includes(circuitscriptText)).toBe(true);

        const options =
            `Options:
  -V, --version                     output the version number
  -i, --input text <input text>     Input text directly
  -u, --update-source               Update source file with refdes annotation
  -j, --annotated-path [file-path]  Save annotated source file at given path
  -w, --watch                       Watch for file changes
  -n, --dump-nets                   Dump out net information
  -d, --dump-data                   Dump data during parsing
  -s, --stats                       Show stats during generation
  -x, --skip-output                 Skip output generation
  -e, --erc                         Enable ERC output
  -b, --bom [output-path]           Generate Bill of Materials in csv format
  -l, --lexer-diagnostics           Enable lexer performance diagnostics
  --lexer-verbose                   Log each token as it is generated (requires
                                    -l)
  --lexer-tokens [limit]            Print token stream (optionally limit number
                                    of tokens, requires -l)
  --lexer-mapping [lines]           Print character-to-token mapping
                                    (optionally specify line range like "1-10",
                                    requires -l)
  --lexer-summary                   Print lexer operation summary (requires -l)
  -h, --help                        display help for command`

        expect(result.includes(options)).toBe(true);
    });

    test.each([
        baseCommandESM,
        baseCommandCJS
    ])('pass in file and output directly: %s', (useCommand) => {
        const result = execSync('node ' + useCommand + ` ${renderPath}script1.cst`).toString();
        const expected = readFileSync(`${renderPath}svgs/script1.cst.svg`).toString();
        const isSimilar = result.trim() == expected;
        expect(isSimilar).toEqual(true);
    });

    test.each([false, true])('pass in file and output file (with stats: %s)', (withStatsFlag: boolean) => {
        const outputPath = '__tests__/tmp/result1.svg';
        if (existsSync(outputPath)) {
            unlinkSync(outputPath);
        }

        if (!existsSync(tmpFolder)) {
            mkdirSync(tmpFolder);
        }

        const statsFlag = withStatsFlag ? ' -s ' : '';

        const result = execSync(`${baseCommand} ${renderPath}script1.cst ${outputPath} ${statsFlag}`).toString();

        const outputFile = readFileSync(outputPath).toString();
        const expected = readFileSync(`${renderPath}svgs/script1.cst.svg`).toString();

        const isSimilar = outputFile.trim() == expected.trim();
        expect(isSimilar).toEqual(true);

        expect(
            result.includes('Lexing took:') &&
            result.includes('Parsing took:') &&
            result.includes('Layout took:') &&
            result.includes('Render took:')
        ).toBe(withStatsFlag);
    });

    test('generate pdf output', async () => {
        const folderPath = `${renderPath}pdfs/`;
        const outputPdf = `${folderPath}script1.cst.pdf`;

        if (existsSync(outputPdf)) {
            unlinkSync(outputPdf);
        }

        if (!existsSync(folderPath)){
            mkdirSync(folderPath);
        }

        execSync(baseCommand + ` ${renderPath}script1.cst ${outputPdf}`).toString();

        // A new pdf file should be created. Another test will be used
        // to test if the pdf generated is correct.
        expect(existsSync(outputPdf)).toEqual(true);
    });

    // Test that the generated annotation files matches the expected results.
    test.each([
        ['script44'],
        ['script45'],
        ['script46'],
    ])('test generated annotations - %s', async (scriptName: string) => {
        
        execSync(baseCommand + ` ${renderPath}${scriptName}.cst -xj ${mainPath}${scriptName}.annotated.cst`);

        const annotatedFile = await loadScriptFromFile(`${mainPath}${scriptName}.annotated.cst`);
        const expectedAnnotatedFile = await loadScriptFromFile(`${mainPath}${scriptName}.expected.annotated.cst`);
        expect(expectedAnnotatedFile).toEqual(annotatedFile);
    });

    // Test script taken from renderData/script59
    test('test generate refdes external file', async () => {
        execSync(baseCommand + ` ${mainPath}script59/main.cst -xu`);

        // Check the generated refdes file (now named after main schematic file)
        const createdRefdesJson = await readFile(`${mainPath}script59/main.refdes.json`);
        const expectedRefdesJson = await readFile(`${mainPath}script59/main.expected.refdes.json`);

        const json1 = JSON.parse(createdRefdesJson);
        const json2 = JSON.parse(expectedRefdesJson);

        expect(JSON.stringify(json1)).toEqual(JSON.stringify(json2));
    });

    test('test CLI direct text input and output', async () => {
        const textInput = "from std import *\n\nv5 = supply(\"5V\")\ngnd = dgnd()\nat v5\nwire down 100\nadd res(10k)\nwire down 100\nto gnd";
        const result = execSync(baseCommand + ` -i '${textInput}'`).toString();

        const expectedSvgOutput = await readFile(`${mainPath}/textInput.expected.svg`);

        expect(result.trim()).toEqual(expectedSvgOutput.trim());
    });
});