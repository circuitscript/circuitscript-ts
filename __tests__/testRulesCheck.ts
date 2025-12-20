import { readFileSync } from "fs";
import { ERCReportItem } from "../src/rules-check/rules";
import { renderCommon } from "./helpers";

const mainPath = '__tests__/rulesCheckData/';

describe('ERC rules', () => {

    function extractSimpleERCResult(results: ERCReportItem[]) {
        return results.map(item => {
            return {
                start: {
                    line: item.start.line,
                    column: item.start.column,
                },
                type: item.type,
                message: item.message,
            }
        });
    }

    test.each([
        ['unconnected pins', 'script1.cst'],
        ['unconnected wires', 'script2.cst'],
        ['connected on no_connect pin', 'script3.cst'],
        ['multiple different items', 'script4.cst']
    ])('ERC check - %s (%s)', async (title, scriptPath) => {
        const { ercResults } = await renderCommon(mainPath + scriptPath, { runErc: true });
        const simplified = extractSimpleERCResult(ercResults);
        const simplifiedJson = JSON.stringify(simplified);

        const expectedJsonString = readFileSync(`${mainPath}expected/${scriptPath}.json`, { encoding: 'utf8' });
        
        // Parse the JSON again, so that later when stringified the format
        // is minimal.
        const expectedJson = JSON.parse(expectedJsonString);

        if (JSON.stringify (expectedJson) !== simplifiedJson){
            console.log(simplifiedJson);
        }

        expect(JSON.stringify(expectedJson)).toEqual(simplifiedJson);
    });

});