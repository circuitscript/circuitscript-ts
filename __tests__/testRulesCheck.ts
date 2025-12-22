import { ERCReportItem } from "../src/rules-check/rules";
import { expectJsonOutput, renderCommon } from "./helpers";

const mainPath = '__tests__/testData/rulesCheckData/';

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
        const jsonString = JSON.stringify(simplified);

        expectJsonOutput(jsonString, `${mainPath}expected/${scriptPath}.json`);
    });

});