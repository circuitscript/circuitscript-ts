import { readFileSync } from 'fs';
import { renderScenarioCommon, runScriptExpectError } from './helpers.js';

const mainPath = '__tests__/testData/scenarioData/';

describe('Scenario tests', () => {
    test.each([
        ['script1.cst', 'behavior-gated switch, all scenarios pass'],
        ['script2.cst', 'behavior-gated switch, one scenario fails'],
        ['script3.cst', 'drive() constraint, alone and alongside a concurrent short()'],
        ['script4.cst', 'set_voltage_diff() and two-arg voltage()'],
        ['script5.cst', 'set_pull()'],
        ['script6.cst', 'open() and is_z() on a floating pin'],
    ])('scenario - %s (%s)', async (scriptPath, _title) => {
        const { svgOutput, scenarioResultsText } = await renderScenarioCommon(mainPath + scriptPath);

        const expectedSvgOutput = readFileSync(mainPath + 'svgs/' + scriptPath + '.svg', { encoding: 'utf8' });
        expect(svgOutput).toEqual(expectedSvgOutput);

        const expectedResultsText = readFileSync(mainPath + 'results/' + scriptPath + '.results.txt', { encoding: 'utf8' });
        expect(scenarioResultsText).toEqual(expectedResultsText);
    });
});

describe('Scenario error paths', () => {
    const minimalCircuit = `
from "std" import *

v5 = supply("5V", 5)
gnd = dgnd()

at v5
wire right 100
add res(1k)
wire right 100
to gnd
`;

    test('nested scenarios are rejected', async () => {
        const script = `${minimalCircuit}
create scenario "Outer":
    set_voltage(v5, 5)
    create scenario "Inner":
        set_voltage(v5, 5)
`;

        const message = await runScriptExpectError(script);
        expect(message).toMatch(/Nested scenarios not allowed/);
    });

    test('calling evaluate() twice throws', async () => {
        const script = `${minimalCircuit}
create scenario "Double evaluate":
    set_voltage(v5, 5)
    evaluate()
    evaluate()
`;

        const message = await runScriptExpectError(script);
        expect(message).toMatch(/evaluate: already called/);
    });

    test('calling expect() before evaluate() throws', async () => {
        const script = `${minimalCircuit}
create scenario "Expect before evaluate":
    set_voltage(v5, 5)
    expect(voltage(v5) == 5)
`;

        const message = await runScriptExpectError(script);
        expect(message).toMatch(/expect: evaluate\(\) has not been called/);
    });
});
