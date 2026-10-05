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

    test('frame modifiers are not reported as undefined symbols', async () => {
        const visitor = await testValidateScript(`
from "std" import *
frame row:
    R1 = res(10k)
frame "t" column layout:
    R2 = res(10k)
`);
        const undefinedSymbols = [...visitor.symbolTable.getSymbols()]
            .filter(([, value]) => value.type === 'undefined')
            .map(([key]) => key);
        expect(undefinedSymbols).toEqual([]);
    });

    test('sheet modifiers are not reported as undefined symbols', async () => {
        const visitor = await testValidateScript(`
from "std" import *
sheet row:
    R1 = res(10k)
sheet "t" column:
    R2 = res(10k)
`);
        const undefinedSymbols = [...visitor.symbolTable.getSymbols()]
            .filter(([, value]) => value.type === 'undefined')
            .map(([key]) => key);
        expect(undefinedSymbols).toEqual([]);
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

        test('parameter is not set when not specified by the user', async () => {
            const { hasError, visitor } = await runScript(
                'c1 = create component:\n    pins: 2\n'
            );
            expect(hasError).toBe(false);

            const c1 = visitor.dumpVariables().get('c1')!;

            expect(c1.parameters.has('erc_net_bridge')).toBe(false);
            expect(c1.ercNetBridgeProp).toBe(false);
        });

        test('parameter is set to true when specified at creation', async () => {
            const { hasError, visitor } = await runScript(
                'c1 = create component:\n    pins: 2\n    erc_net_bridge: true\n'
            );
            expect(hasError).toBe(false);

            const c1 = visitor.dumpVariables().get('c1')!;

            expect(c1.parameters.get('erc_net_bridge')).toBe(true);
            expect(c1.ercNetBridgeProp).toBe(true);
        });

        test('parameter is set to false when explicitly specified as false at creation', async () => {
            const { hasError, visitor } = await runScript(
                'c1 = create component:\n    pins: 2\n    erc_net_bridge: false\n'
            );
            expect(hasError).toBe(false);

            const c1 = visitor.dumpVariables().get('c1')!;

            expect(c1.parameters.get('erc_net_bridge')).toBe(false);
            expect(c1.ercNetBridgeProp).toBe(false);
        });
    });
});

