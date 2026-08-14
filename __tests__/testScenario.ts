import { readFileSync } from 'fs';
import { renderScenarioCommon } from './helpers.js';

const mainPath = '__tests__/testData/scenarioData/';

describe('Scenario tests', () => {
    test.each([
        ['script1.cst', 'behavior-gated switch, all scenarios pass'],
        ['script2.cst', 'behavior-gated switch, one scenario fails'],
        ['script3.cst', 'drive() constraint, alone and alongside a concurrent short()'],
    ])('scenario - %s (%s)', async (scriptPath, _title) => {
        const { svgOutput, scenarioResultsText } = await renderScenarioCommon(mainPath + scriptPath);

        const expectedSvgOutput = readFileSync(mainPath + 'svgs/' + scriptPath + '.svg', { encoding: 'utf8' });
        expect(svgOutput).toEqual(expectedSvgOutput);

        const expectedResultsText = readFileSync(mainPath + 'results/' + scriptPath + '.results.txt', { encoding: 'utf8' });
        expect(scenarioResultsText).toEqual(expectedResultsText);
    });
});
