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

describe('Simple operator tests', () => {
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

        // With suffix

        // Multiplication cases
        ['a = 10k * 2', '20k'],
        ['a = 10.1k * 2', '20.2k'],
        ['a = 0.5k * 5', '2.5k'],
        ['a = 0.1k * 1', 100],
        ['a = 0.5k * 1', 500],

        // Division cases
        ['a = 33k / 3', '11k'],
        ['a = 50k / 4', '12.5k'],
        ['a = 50k / 5k', 10],
        ['a = 33.3k / 3', '11.1k'],

        // Addition cases
        ['a = 10k + 5k', '15k'],
        ['a = 10.1k + 5k', '15.1k'],
        
        // Subtraction cases
        ['a = 5k - 2', '4.998k'],
        ['a = 10k - 2.1k', '7.9k'],
        ['a = 5.5k - 3.1k', '2.4k'],

        // Modulus cases
        ['a = 3.3k % 21', 3],
        ['a = 100k % 3.23k', '3.1k'],
        
        // Different prefixes,
        ['a = 10k * 520', '5.2M'],
        ['a = 10k * 520k', '5.2G'],
        ['a = 1 / 10000', '100u'],
        ['a = 1 / 10M', '100n'],
        ['a = 1 / 10G', '100p'],

        // Javascript number quirk (in normal JS this returns 0.300...4)
        ['a = 0.1 + 0.2', '300m'],

        // Not operator (!) tests
        ['a = !0', true],
        ['a = !0.1', false],
        ['a = !10', false],

        // Logical And operator (&&) tests
        ['a = 10 && 20', 20],
        ['a = 20 && 10', 10],
        ['a = 10 && 0',  0],
        ['a = 0  && 10', 0],

        // Logical Or operator (||) tests
        ['a = 10 || 20', 10],
        ['a = 20 || 10', 20],
        ['a = 0  || 10', 10],
        ['a = 10 || 0',  10]

    ])('math test - %s', async (script, expectedResult) => {
        const { visitor, hasError } = await runScript(script);
        expect(hasError).toBe(false);

        const variables = visitor.dumpVariables();
        const value = variables.get('a');

        let useValue: any;
        if (typeof expectedResult === 'boolean'){
            useValue = value;
        } else if (typeof expectedResult === 'string'){
            useValue = value.toDisplayString();
        } else {
            useValue = value.toNumber();
        }

        expect(useValue).toEqual(expectedResult);
    });
})