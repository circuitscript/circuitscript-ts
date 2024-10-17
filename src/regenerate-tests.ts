import fs from 'fs';
import { getDefaultLibsPath, getFontsPath, renderScript } from './helpers.js';
import { prepareSVGEnvironment } from './sizing.js';

const mainDir = './__tests__/renderData/';

const fontsPath = getFontsPath();
const defaultLibsPath = getDefaultLibsPath();

async function regenerateTests(): Promise<void> {
    await prepareSVGEnvironment(fontsPath);

    const cstFiles: string[] = [];

    const files = fs.readdirSync(mainDir);
    files.forEach(file => {
        if (file.endsWith('.cst')) {
            cstFiles.push(file);
        }
    });

    cstFiles.forEach(file => {
        const inputPath = mainDir + file;
        const scriptData = fs.readFileSync(inputPath, { encoding: 'utf-8' });

        const outputPath = inputPath + '.svg';
        renderScript(scriptData, outputPath, {
            currentDirectory: mainDir,
            defaultLibsPath,
        });

        console.log('generated ', outputPath);
    });
}

regenerateTests();