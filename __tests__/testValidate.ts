import { readFileSync } from "fs";
import { expectJsonOutput, runScript, runScriptExpectError, testValidateScript } from "./helpers";

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

    describe('erc_net_bridge property validation', () => {
        test('non-boolean value throws a validation error', async () => {
            const msg = await runScriptExpectError(
                'c1 = create component:\n    pins: 2\n    erc_net_bridge: "yes"\n'
            );
            expect(msg).toContain("Invalid value for 'erc_net_bridge' property");
        });

        test('true on a component with pins != 2 throws the pin-count error', async () => {
            const msg = await runScriptExpectError(
                'c1 = create component:\n    pins: 3\n    erc_net_bridge: true\n'
            );
            expect(msg).toContain("is only valid on components with exactly 2 pins");
        });

        test('true on a component with pins: 2 parses/executes without error', async () => {
            const { hasError } = await runScript(
                'c1 = create component:\n    pins: 2\n    erc_net_bridge: true\n'
            );
            expect(hasError).toBe(false);
        });

        test('can be set to a non-boolean post-creation and throws a validation error', async () => {
            const msg = await runScriptExpectError(
                'c1 = create component:\n    pins: 2\n\nc1.erc_net_bridge = "yes"\n'
            );
            expect(msg).toContain("Invalid value for 'erc_net_bridge' property");
        });

        test('true set post-creation on a component with pins != 2 throws the pin-count error', async () => {
            const msg = await runScriptExpectError(
                'c1 = create component:\n    pins: 3\n\nc1.erc_net_bridge = true\n'
            );
            expect(msg).toContain("is only valid on components with exactly 2 pins");
        });

        test('true set post-creation on a component with pins: 2 parses/executes without error', async () => {
            const { hasError } = await runScript(
                'c1 = create component:\n    pins: 2\n\nc1.erc_net_bridge = true\n'
            );
            expect(hasError).toBe(false);
        });
    });
});

