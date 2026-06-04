/* eslint-disable jest/expect-expect */
import { ERCReportItem } from "../src/rules-check/rules";
import { expectJsonOutput, renderCommon, runScript } from "./helpers";

const mainPath = '__tests__/testData/rulesCheckData/';

describe('ERC rules', () => {

    function extractSimpleERCResult(results: ERCReportItem[]) {
        return results.map(item => {
            return {
                start: item.start ? { line: item.start.line, column: item.start.column } : null,
                type: item.type,
                severity: item.severity,
                message: item.message,
            }
        });
    }

    test.each([
        ['unconnected pins', 'script1.cst'],
        ['unconnected wires', 'script2.cst'],
        ['connected on no_connect pin', 'script3.cst'],
        ['multiple different items', 'script4.cst'],
        ['power pins on unnamed nets', 'script5.cst'],
        ['power_reference on unnamed net', 'script6.cst'],
        ['power net no source or reference', 'script7.cst'],
        ['power net name conflict and ambiguous reference', 'script8.cst'],
        ['multiple power outputs on same net', 'script9.cst'],
        ['valid power net - no violations', 'script10.cst'],
        ['same-named power_output pins on one component (no violation)', 'script12.cst'],
        ['differently-named power_output pins on one component', 'script13.cst'],
        ['one placed, one unplaced power_output (no violation)', 'script14.cst'],
        ['two placed, one unplaced power_output', 'script15.cst'],
        ['two output pins on same net', 'script16.cst'],
        ['input pin with no driver', 'script17.cst'],
        ['passive-only net (off by default)', 'script18.cst'],
        ['output driving input - no violations', 'script19.cst'],
        ['io pin on power net', 'script20.cst'],
        ['signal output driving power_input directly', 'script21.cst'],
        ['erc_set raises UNCONNECTED-PIN to error', 'script22.cst'],
        ['erc_set suppresses UNCONNECTED-PIN (off)', 'script23.cst'],
    ])('ERC check - %s (%s)', async (title, scriptPath) => {
        const { ercResults } = await renderCommon(mainPath + scriptPath, { runErc: true });
        const simplified = extractSimpleERCResult(ercResults);
        const jsonString = JSON.stringify(simplified);

        expectJsonOutput(jsonString, `${mainPath}expected/${scriptPath}.json`);
    });

    // test('ERC check - unconnected pin without refdes', async () => {
    //     const { ercResults } = await renderCommon(mainPath + 'script11.cst', {
    //         runErc: true,
    //         skipAnnotation: true,
    //     });
    //     const simplified = extractSimpleERCResult(ercResults);
    //     const jsonString = JSON.stringify(simplified);
    //     expectJsonOutput(jsonString, `${mainPath}expected/script11.cst.json`);
    // });

    describe('erc_get and erc_set built-ins', () => {
        const scriptPath = '__tests__/testData/rulesCheckData/';

        test('erc_get returns default severity', async () => {
            const { visitor, hasError } = await runScript(
                'from "std" import *\nprint(erc_get("UNCONNECTED-PIN"))',
                scriptPath
            );
            expect(hasError).toBe(false);
            expect(visitor.printStream.join(' ')).toContain('warning');
        });

        test('erc_get reflects a previous erc_set', async () => {
            const { visitor, hasError } = await runScript(
                'from "std" import *\nerc_set("UNCONNECTED-PIN", "error")\nprint(erc_get("UNCONNECTED-PIN"))',
                scriptPath
            );
            expect(hasError).toBe(false);
            expect(visitor.printStream.join(' ')).toContain('error');
        });

        test('erc_set with invalid rule name throws RuntimeExecutionError', async () => {
            const { hasError } = await runScript(
                'from "std" import *\nerc_set("NOT-A-REAL-RULE", "error")',
                scriptPath
            );
            expect(hasError).toBe(true);
        });

        test('erc_set with invalid severity level throws RuntimeExecutionError', async () => {
            const { hasError } = await runScript(
                'from "std" import *\nerc_set("UNCONNECTED-PIN", "critical")',
                scriptPath
            );
            expect(hasError).toBe(true);
        });

        test('erc_get with invalid rule name throws RuntimeExecutionError', async () => {
            const { hasError } = await runScript(
                'from "std" import *\nerc_get("NOT-A-REAL-RULE")',
                scriptPath
            );
            expect(hasError).toBe(true);
        });
    });

});