import { readFileSync } from "fs";
import { expectJsonOutput, testValidateScript } from "./helpers";

const mainPath = '__tests__/testData/validationData/';

/**
 * Validation is used mainly in the IDE, for syntax highlighting and 
 * semantic tokens.
 */
describe('test validation', () => {

    test.each([
        ["some variables", 'script1'],
        ["variables and import", 'script2'],
        ["complex script", 'script3'],

    ])('parse script - %s', async (description, scriptPath) => {
        // Test only parsing, does not check the correctness of the 
        // parsed result!

        const scriptData = readFileSync(`${mainPath}${scriptPath}.cst`, { encoding: 'utf8' });

        // Import caching is disabled.
        const visitor = await testValidateScript(scriptData);

        const symbols = visitor.symbolTable.getSymbols();
        const result: [string, string][] = [];

        for (const [key, value] of symbols) {
            result.push([key, value.type]);
        }

        // const sorted = result.sort((a, b) => {
        //     return a[0].localeCompare(b[0]);
        // });

        const jsonString = JSON.stringify(result);

        expectJsonOutput(jsonString, `${mainPath}expected/${scriptPath}.cst.json`);
    });
});

