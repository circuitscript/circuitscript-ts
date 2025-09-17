import { execSync } from 'child_process';
import figlet from 'figlet';
import { existsSync, mkdirSync, readFileSync, unlinkSync } from 'fs';

describe('test cli program', () => {

    const tmpFolder = '__tests__/tmp';

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
  -V, --version                   output the version number
  -i, --input text <input text>   Input text directly
  -c, --current-directory <path>  Set current directory
  -w, --watch                     Watch for file changes
  -n, --dump-nets                 Dump out net information
  -d, --dump-data                 Dump data during parsing
  -s, --stats                     Show stats during generation
  -x, --skip-output               Skip output generation
  -h, --help                      display help for command`

        expect(result.includes(options)).toBe(true);
    });

    test.each([
        baseCommandESM,
        baseCommandCJS
    ])('pass in file and output directly: %s', (useCommand) => {
        const result = execSync('node ' + useCommand + ' __tests__/renderData/script1.cst').toString();
        const expected = readFileSync('__tests__/renderData/svgs/script1.cst.svg').toString();
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

        const result = execSync(`${baseCommand} __tests__/renderData/script1.cst ${outputPath} ${statsFlag}`).toString();

        const outputFile = readFileSync(outputPath).toString();
        const expected = readFileSync('__tests__/renderData/svgs/script1.cst.svg').toString();

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
        const outputPdf = '__tests__/renderData/pdfs/script1.cst.pdf';

        if (existsSync(outputPdf)) {
            unlinkSync(outputPdf);
        }

        execSync(baseCommand + ` __tests__/renderData/script1.cst ${outputPdf}`).toString();

        // A new pdf file should be created. Another test will be used
        // to test if the pdf generated is correct.
        expect(existsSync(outputPdf)).toEqual(true);
    });
});