import { LayoutEngine } from "../src/layout";
import { generateSVG2 } from "../src/render";
import { runScript } from "./helpers";
import { RenderTestExpectedOutput1, RenderTestExpectedOutput2, 
    RenderTestExpectedOutput3, 
    RenderTestScript1, RenderTestScript2, RenderTestScript3 } from "./renderTestData";

describe('Render tests', () => {

    test.each([
        [RenderTestScript1, RenderTestExpectedOutput1],
        [RenderTestScript2, RenderTestExpectedOutput2],
        [RenderTestScript3, RenderTestExpectedOutput3],
    ])('component annotation and render', async (script, expectedSvgOutput) => {
        const {hasError, visitor} = await runScript(script);
        expect(hasError).toBe(false);
        visitor.annotateComponents();

        const { sequence, nets } = visitor.getGraph();

        const layoutEngine = new LayoutEngine();
        const graph = await layoutEngine.runLayout(sequence, nets);

        const svgOutput = generateSVG2(graph);
        expect(svgOutput).toBe(expectedSvgOutput);
    });
});
