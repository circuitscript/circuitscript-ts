import { runScript } from "./helpers.js";

const script1 = `
b = 10
a = -b
`

const script2 = `
b = 10
a = -b / 2 - 1
`

describe('Simple math tests', () => {
    test.each([
        ["a = -1 + 2", 1],
        ["a = 1 + 2", 3],
        ["a = 1 + 2 * 3", 7],
        ["a = 5 - 1", 4],
        ["a = 5 - 1 * 2", 3],
        ["a = 10 / 2", 5],
        ["a = 1 + 9 / 3", 4],
        ["a = 1+20-2", 19],
        ["a = -1+2", 1],
        ["a = -123", -123],
        ["a = 0-123", -123],
        [script1, -10],
        [script2, -6]
    ])('math test - %s', async (script, expectedResult) => {
        const {visitor, hasError} = await runScript(script);

        expect(hasError).toBe(false);

        const variables = visitor.dumpVariables();
        expect(variables.get('a')).toBe(expectedResult);
    });
})