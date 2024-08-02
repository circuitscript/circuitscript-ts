import { readFileSync } from 'fs';

import { LayoutEngine } from "../src/layout.js";
import { generateSVG2 } from "../src/render.js";
import { runScript } from "./helpers.js";
import { prepareSVGEnvironment } from '../src/sizing.js';

const mainPath = '__tests__/renderData/';

describe('Render tests', () => {

    test.each([
        ['variant and branch rendering', 'script1.cst'],
        ['simple function', 'script2.cst'],
        ['simple frame', 'script3.cst'],
        ['drawing functions for graphics', 'script4.cst'],
        ['drawing 180 deg flipped components', 'script5.cst'],
        ['join command', 'script6.cst'],
        ['parallel command', 'script7.cst'],
        ['point block command', 'script8.cst'],
        ['start immediately with `add component` command', 'script9.cst'],
        ['start immediately with `wire` command', 'script10.cst'],
        ['flipX and flipY parameters', 'script11.cst'],
        ['flipX, flipY, angle parameters with multiple components', 'script12.cst']

    ])('render - %s (%s)', async (title, scriptPath) => {
        
        await prepareSVGEnvironment(null);

        const script = readFileSync(mainPath + scriptPath, { encoding: 'utf8' });
        const { hasError, visitor } = await runScript(script);
        expect(hasError).toBe(false);
        visitor.annotateComponents();

        const { sequence, nets } = visitor.getGraph();

        const layoutEngine = new LayoutEngine();
        const graph = await layoutEngine.runLayout(sequence, nets);

        const svgOutput = generateSVG2(graph);

        const expectedSvgOutput = readFileSync(mainPath + scriptPath + ".svg", { encoding: 'utf8' });
        expect(svgOutput).toBe(expectedSvgOutput);
    });
});
