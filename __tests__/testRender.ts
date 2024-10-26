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
        ['flipX, flipY, angle parameters with multiple components', 'script12.cst'],
        ['anchor modifier', 'script13.cst'],
        
        ['text graphic expression', 'script14.cst'],
        ['component follows wire orientation', 'script15.cst'],
        ['component with defined pin follows wire orientation', 'script16.cst'],
        ['component with arc graphic expr', 'script17.cst'],

        // Check that the correct pin positions are generated for
        // custom drawn symbols 
        ['symbol custom with pin position', 'script18.cst'],

        ['ports (in, out, io, any)', 'script19.cst'],
        
        ['module with ports', 'script20.cst']
        
    ])('render - %s (%s)', async (title, scriptPath) => {
        
        const fontsPath = "./fonts";
        await prepareSVGEnvironment(fontsPath);

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
