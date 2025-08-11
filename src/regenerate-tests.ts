import fs from 'fs';
import { NodeScriptEnvironment, renderScript } from './helpers.js';

const mainDir = './__tests__/renderData/';

const env = new NodeScriptEnvironment();
NodeScriptEnvironment.setInstance(env);

async function regenerateTests(extra=""): Promise<string[]> {
    env.prepareSVGEnvironment();

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

        const outputPath = mainDir + 'svgs/' + file + extra + '.svg';
        env.setModuleDirectory(mainDir);
        renderScript(scriptData, outputPath, {
            dumpNets: false,
            dumpData: false,
            showStats: false,
            environment: env,
        });

        console.log('generated ', outputPath);
    });

    return cstFiles;
}

(async () => {

    // Set to true, to not overwrite the existing .svg and use .next.svg. This
    // is used for comparing svg when there are significant changes to the 
    // renderer.
    const generateDiff = (process.argv.indexOf('-diff') !== -1);
    console.log('diff flag: ', generateDiff);

    const nextExtra = generateDiff ? '.next' : '';

    const cstFiles = await regenerateTests(nextExtra);

    const allFiles = [];

    if (generateDiff){
        cstFiles.forEach(file => {
            const svg1 = 'svgs/' + file + '.svg';
            const svg2 = 'svgs/' + file + '.next.svg';

            const cleanedName = file.replace('script', '').replace('.cst', '');
            allFiles.push([file, svg1, svg2, cleanedName])
        });

        const sortedFiles = allFiles.sort((a, b) => {
            const nameA: string = a[3];
            const nameB: string = b[3];

            const indexA = Number(nameA);
            const indexB = Number(nameB);
            
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

