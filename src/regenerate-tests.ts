/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import fs from 'fs';
import { renderScript } from "./pipeline.js";
import { NodeScriptEnvironment } from "./environment/environment.js";

const mainDir = './__tests__/testData/renderData/';

const env = new NodeScriptEnvironment();
env.getPackageVersion = (): string => {
    return "0.0.0";
}

NodeScriptEnvironment.setInstance(env);

async function regenerateTests(extra = "", fileList: string[] = []): Promise<string[]> {
    await env.prepareSVGEnvironment();

    const cstFiles: string[] = [];

    const files = fs.readdirSync(mainDir);
    files.forEach(file => {
        if (file.endsWith('.cst') && file.startsWith('script')) {
            if (fileList.length === 0 || fileList.includes(file)) {
                cstFiles.push(file);
            }
        }
    });
    for (let i = 0; i < cstFiles.length; i++) {
        const file = cstFiles[i];
        const inputPath = mainDir + file;
        const scriptData = fs.readFileSync(inputPath, { encoding: 'utf-8' });

        const outputPath = mainDir + 'svgs/' + file + extra + '.svg';
        env.setModuleDirectory(mainDir);
        env.setDefaultLibsPath(mainDir + '../../../libs/');

        const {errors} = await renderScript(scriptData, outputPath, {
            inputPath,
            dumpNets: false,
            dumpData: false,
            showStats: false,
            environment: env,
        });

        if (errors.length > 0) {
            console.log(errors);
        }
    }

    return cstFiles;
}

(async () => {

    // Set to true, to not overwrite the existing .svg and use .next.svg. This
    // is used for comparing svg when there are significant changes to the
    // renderer.
    const generateDiff = (process.argv.indexOf('-diff') !== -1);
    console.log('diff flag: ', generateDiff);

    const listIndex = process.argv.indexOf('--list');
    const fileList = listIndex !== -1 && process.argv[listIndex + 1]
        ? process.argv[listIndex + 1].split(',').map(f => f.trim())
        : [];
    if (fileList.length > 0) {
        console.log('filtering to files: ', fileList);
    }

    const nextExtra = generateDiff ? '.next' : '';

    const cstFiles = await regenerateTests(nextExtra, fileList);

    const allFiles = [];

    if (generateDiff){
        cstFiles.forEach(file => {
            const svg1 = 'svgs/' + file + '.svg';
            const svg2 = 'svgs/' + file + '.next.svg';

            const cleanedName = file.replace('script', '')
                .replace('.cst', '')
                .replace('.annotated', '');
            allFiles.push([file, svg1, svg2, Number(cleanedName)])
        });

        const sortedFiles = allFiles.sort((a, b) => {
            const indexA: number = a[3];
            const indexB: number = b[3];

            if (indexA > indexB){
                return 1;
            } else if (indexA < indexB){
                return -1;
            } else {
                return 0;
            }
        });

        const output = [];
        sortedFiles.forEach(group => {
            const [file, svg1, svg2] = group;
            output.push(`<div class='group'>
                <h3>${file}</h3>
                <div class='items'>
                    <div style='margin-right: 10px'>
                        <h4>${svg1}</h4>
                        <img src='${svg1}'/>
                    </div>
                    <div>
                        <h4>${svg2}</h4>
                        <img src='${svg2}'/>
                    </div>
                </div>
            </div>`)
        });

        const result = `
            <html>
                <header>
                    <title>SVG compare</title>
                    <style>
                        img { border: solid thin #ccc; }
                        .items { display: flex; }
                        body { font-family: Arial; }
                    </style>
                </header>
                <body>
                    ${output.join('')}
                </body>
            </html>`;

        fs.writeFileSync(mainDir + "compiled.html", result);
    }
})()

