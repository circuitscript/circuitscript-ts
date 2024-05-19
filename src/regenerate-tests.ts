import fs from 'fs';
import { renderScript } from './helpers.js';

const mainDir = './__tests__/renderData/';

const cstFiles = [];

const files = fs.readdirSync(mainDir);
files.forEach(file => {
    if (file.endsWith('.cst')){
        cstFiles.push(file);
    }
});

const useCurrentDir = './examples/';

cstFiles.forEach(file => {
    const inputPath = mainDir + file;
    const scriptData = fs.readFileSync(inputPath, { encoding: 'utf-8' });

    const outputPath = inputPath + '.svg';
    renderScript(scriptData, outputPath, { currentDirectory: useCurrentDir });

    console.log('generated ', outputPath);
});