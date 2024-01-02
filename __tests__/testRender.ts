import fs from 'fs';

import { LayoutEngine } from "../src/layout";
import { generateSVG2 } from "../src/render";
import { runScript } from "./helpers";

const mainPath = '__tests__/renderData/';

describe('Render tests', () => {

    test.each([
        ['variant and branch rendering', 'script1.cst'],
        ['simple function', 'script2.cst'],
        ['simple frame', 'script3.cst'],
        ['drawing functions for graphics', 'script4.cst']
        
    ])('render - %s (%s)', async (title, scriptPath) => {

        const script = fs.readFileSync(mainPath + scriptPath, { encoding: 'utf8' });
        const {hasError, visitor} = await runScript(script);
        expect(hasError).toBe(false);
        visitor.annotateComponents();

        const { sequence, nets } = visitor.getGraph();

        const layoutEngine = new LayoutEngine();
        const graph = await layoutEngine.runLayout(sequence, nets);

        const svgOutput = generateSVG2(graph);

        const expectedSvgOutput = fs.readFileSync(mainPath + scriptPath + ".svg", { encoding: 'utf8' });
        expect(svgOutput).toBe(expectedSvgOutput);
    });
});
