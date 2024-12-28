import { runScript } from "./helpers.js";

const inlineScript1 = `
b = 10
a = -b
`

const inlineScript2 = `
b = 10
a = -b / 2 - 1
`

const inlineScript3 = `
a = 10
a += 5
a -= 2
a *= 30
a /= 5
`

const inlineScript4 = `
a = 10
a %= 3
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
        [inlineScript1, -10],
        [inlineScript2, -6],

        // Modulus operators
        ['a = 10 % 5', 0],
        ['a = 10 % 3', 1],
        ['a = 10 % 4', 2],
        ['a = 10 % 2', 0],

        [inlineScript3, 78],
        [inlineScript4, 1],

    ])('math test - %s', async (script, expectedResult) => {
        const {visitor, hasError} = await runScript(script);
        expect(hasError).toBe(false);

        const variables = visitor.dumpVariables();
        expect(variables.get('a')).toBe(expectedResult);
    });
})