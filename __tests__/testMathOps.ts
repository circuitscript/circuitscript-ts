import { runScript } from "./helpers";

describe('Simple math tests', () => {


    test.each([
        ["a = 1 + 2", 3],
        ["a = 1 + 2 * 3", 7],
        ["a = 5 - 1", 4],
        ["a = 5 - 1 * 2", 3],
        ["a = 10 / 2", 5],
        ["a = 1 + 9 / 3", 4]
    ])('math test - %s', async (script, expectedResult) => {
        const {visitor, hasError} = await runScript(script);

        expect(hasError).toBe(false);

        const variables = visitor.dumpVariables();
        expect(variables.get('a')).toBe(expectedResult);

    });

})