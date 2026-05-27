/**
 * Tests for SemanticTokensVisitor
 *
 * Verifies that semantic tokens are correctly generated for CircuitScript language constructs
 * including functions, variables, parameters, properties, imports, and more.
 */

import { IParsedToken } from '../src/semantic-tokens/SemanticTokenVisitor.js';
import { ESMNodeScriptEnvironment } from '../src/environment/esm-environment.js';
import { NodeScriptEnvironment } from '../src/environment/environment.js';
import { getSemanticTokens as getSemanticTokensImpl } from '../src/semantic-tokens/getSemanticTokens.js';
import { BaseVisitor, ImportFileResult } from '../src/BaseVisitor.js';
import { prepareFile } from '../src/helpers.js';

describe('SemanticTokensVisitor', () => {

    /**
     * Helper function to parse a script and generate semantic tokens
     * Returns a Map indexed by position for easy lookup
     */
    async function getSemanticTokens(script: string): Promise<Map<string, IParsedToken>> {
        const env = new ESMNodeScriptEnvironment();
        NodeScriptEnvironment.setInstance(env);

        const result = await getSemanticTokensImpl('test.cst', script, {
            environment: env,
            onImportFile: async (visitor: BaseVisitor, filePath: string, textData: string): Promise<ImportFileResult> => {
                let hasError = false;
                let hasParseError = false;

                if (textData !== null) {
                    const { parser } = prepareFile(textData);
                    const tree = parser.script();

                    try {
                        visitor.visit(tree);
                    } catch (err) {
                        console.log('Error while parsing: ', err);
                        hasParseError = true;
                        hasError = true;
                    }
                } else {
                    console.log('File does not exist');
                    hasError = true;
                }

                return {
                    hasError, hasParseError
                };
            }
        });

        // Convert parsedTokens array to Map for easier lookup in tests
        const tokenMap = new Map<string, IParsedToken>();
        result.parsedTokens.forEach(token => {
            const key = `${token.line}_${token.column}_${token.length}`;
            tokenMap.set(key, token);
        });

        return tokenMap;
    }

    /**
     * Helper to find a token by text value
     */
    function findTokenByText(tokens: Map<string, IParsedToken>, text: string): IParsedToken | undefined {
        for (const [, token] of tokens) {
            if (token.textValue === text) {
                return token;
            }
        }
        return undefined;
    }

    /**
     * Helper to find all tokens by type
     */
    function findTokensByType(tokens: Map<string, IParsedToken>, tokenType: string): IParsedToken[] {
        const result: IParsedToken[] = [];
        for (const [, token] of tokens) {
            if (token.tokenType === tokenType) {
                result.push(token);
            }
        }
        return result;
    }

    test('function definition tokens', async () => {
        const script = `
def myFunction(param1, param2):
    return param1 + param2
`;

        const tokens = await getSemanticTokens(script);

        // Function name should be marked as 'function' with 'declaration' modifier
        const funcToken = findTokenByText(tokens, 'myFunction');
        expect(funcToken).toBeDefined();
        expect(funcToken?.tokenType).toBe('function');
        expect(funcToken?.tokenModifiers).toContain('declaration');

        // Parameters should be marked as 'parameter' with 'declaration' modifier
        const param1Token = findTokenByText(tokens, 'param1');
        expect(param1Token).toBeDefined();
        expect(param1Token?.tokenType).toBe('parameter');
        expect(param1Token?.tokenModifiers).toContain('declaration');

        const param2Token = findTokenByText(tokens, 'param2');
        expect(param2Token).toBeDefined();
        expect(param2Token?.tokenType).toBe('parameter');
        expect(param2Token?.tokenModifiers).toContain('declaration');
    });

    test('variable assignment tokens', async () => {
        const script = `
R1 = 100
myVar = 200
`;

        const tokens = await getSemanticTokens(script);

        // Variable assignments should be marked as 'variable'
        const r1Token = findTokenByText(tokens, 'R1');
        expect(r1Token).toBeDefined();
        expect(r1Token?.tokenType).toBe('variable');

        const myVarToken = findTokenByText(tokens, 'myVar');
        expect(myVarToken).toBeDefined();
        expect(myVarToken?.tokenType).toBe('variable');
    });

    test('function call tokens', async () => {
        const script = `
from "std" import *
result = res(10k)
value = myFunc(1, 2)
`;

        const tokens = await getSemanticTokens(script);

        // Function calls should be marked as 'function'
        const resToken = findTokenByText(tokens, 'res');
        expect(resToken).toBeDefined();
        expect(resToken?.tokenType).toBe('function');

        const myFuncToken = findTokenByText(tokens, 'myFunc');
        expect(myFuncToken).toBeDefined();
        expect(myFuncToken?.tokenType).toBe('function');
    });

    test('create component tokens', async () => {
        const script = `
U1 = create component:
    pins: 10
    type: "custom"
`;

        const tokens = await getSemanticTokens(script);

        // 'create component' compound keyword should be marked as 'keyword'
        const createToken = findTokenByText(tokens, 'create component');

        expect(createToken).toBeDefined();
        expect(createToken?.tokenType).toBe('keyword');
        // expect(createToken?.tokenModifiers).toContain('defaultLibrary');

        // Property keys should be marked as 'property'
        const pinsToken = findTokenByText(tokens, 'pins');
        expect(pinsToken).toBeDefined();
        expect(pinsToken?.tokenType).toBe('property');

        const typeToken = findTokenByText(tokens, 'type');
        expect(typeToken).toBeDefined();
        expect(typeToken?.tokenType).toBe('property');
    });

    test('import statement tokens', async () => {
        const script = `
import "myLibrary"
from "anotherLib" import func1, func2
from "lib3" import *
`;

        const tokens = await getSemanticTokens(script);

        // Library names should be marked as 'namespace'
        const lib1Token = findTokenByText(tokens, '"myLibrary"');
        expect(lib1Token).toBeDefined();
        expect(lib1Token?.tokenType).toBe('string');

        const lib2Token = findTokenByText(tokens, '"anotherLib"');
        expect(lib2Token).toBeDefined();
        expect(lib2Token?.tokenType).toBe('string');

        // Imported function names should be marked as 'function' with 'defaultLibrary'
        const func1Token = findTokenByText(tokens, 'func1');
        expect(func1Token).toBeDefined();
        expect(func1Token?.tokenType).toBe('function');
        expect(func1Token?.tokenModifiers).toContain('defaultLibrary');

        const func2Token = findTokenByText(tokens, 'func2');
        expect(func2Token).toBeDefined();
        expect(func2Token?.tokenType).toBe('function');
        expect(func2Token?.tokenModifiers).toContain('defaultLibrary');
    });

    test('for loop tokens', async () => {
        const script = `
for i, j in range(10):
    print(i)
`;

        const tokens = await getSemanticTokens(script);

        // Loop variables should be marked as 'variable'
        const iToken = findTokenByText(tokens, 'i');
        expect(iToken).toBeDefined();
        expect(iToken?.tokenType).toBe('variable');

        const jToken = findTokenByText(tokens, 'j');
        expect(jToken).toBeDefined();
        expect(jToken?.tokenType).toBe('variable');
    });

    test('keyword tokens', async () => {
        const script = `from "std" import res
def myFunc(x):
    return x
for i in range(10):
    x = i
U1 = create component:
    pins: 2
    display: create graphic:
        circle: 0, 0, 10
`;

        const tokens = await getSemanticTokens(script);

        // Check common keywords
        const defToken = findTokenByText(tokens, 'def');
        expect(defToken).toBeDefined();
        expect(defToken?.tokenType).toBe('keyword');

        const returnToken = findTokenByText(tokens, 'return');
        expect(returnToken).toBeDefined();
        expect(returnToken?.tokenType).toBe('keyword');

        const fromToken = findTokenByText(tokens, 'from');
        expect(fromToken).toBeDefined();
        expect(fromToken?.tokenType).toBe('keyword');

        const importToken = findTokenByText(tokens, 'import');
        expect(importToken).toBeDefined();
        expect(importToken?.tokenType).toBe('keyword');

        const forToken = findTokenByText(tokens, 'for');
        expect(forToken).toBeDefined();
        expect(forToken?.tokenType).toBe('keyword');

        const inToken = findTokenByText(tokens, 'in');
        expect(inToken).toBeDefined();
        expect(inToken?.tokenType).toBe('keyword');

        const createTokens = findTokensByType(tokens, 'keyword').filter(t => t.textValue.startsWith('create '));
        expect(createTokens.length).toBeGreaterThan(0);

        const componentToken = findTokenByText(tokens, 'create component');
        expect(componentToken).toBeDefined();
        expect(componentToken?.tokenType).toBe('keyword');

        const graphicToken = findTokenByText(tokens, 'create graphic');
        expect(graphicToken).toBeDefined();
        expect(graphicToken?.tokenType).toBe('keyword');
    });

    test('annotation comment tokens', async () => {
        const script = `
#= myAnnotation
`;

        const tokens = await getSemanticTokens(script);

        // Annotation tokens should be marked as 'comment'
        const commentTokens = findTokensByType(tokens, 'comment');
        expect(commentTokens.length).toBeGreaterThan(0);

        // Verify the annotation ID is also marked as comment
        const annotationToken = findTokenByText(tokens, 'myAnnotation');
        expect(annotationToken).toBeDefined();
        expect(annotationToken?.tokenType).toBe('comment');
    });

    test('graphic command tokens', async () => {
        const script = `
U1 = create component:
    pins: 2
    display: create graphic:
        circle: 0, 0, 10
        rect: 0, 0, 20, 30
        pin: 1, "A", 0, 0, 10, 10
`;

        const tokens = await getSemanticTokens(script);

        // Graphic commands should be marked as 'property'
        const circleToken = findTokenByText(tokens, 'circle');
        expect(circleToken).toBeDefined();
        expect(circleToken?.tokenType).toBe('property');

        const rectToken = findTokenByText(tokens, 'rect');
        expect(rectToken).toBeDefined();
        expect(rectToken?.tokenType).toBe('property');
    });

    test('comprehensive semantic token coverage', async () => {
        const script = `
from "std" import res, cap

def calculate(value1, value2):
    result = value1 + value2
    return result

R1 = res(10k)
C1 = cap(100n)

total = calculate(10, 20)

for i in range(5):
    print(i)

U1 = create component:
    pins: 4
    type: "custom"
`;

        const tokens = await getSemanticTokens(script);

        // Verify we have tokens of each expected type
        const functionTokens = findTokensByType(tokens, 'function');
        expect(functionTokens.length).toBeGreaterThan(0);

        const variableTokens = findTokensByType(tokens, 'variable');
        expect(variableTokens.length).toBeGreaterThan(0);

        const parameterTokens = findTokensByType(tokens, 'parameter');
        expect(parameterTokens.length).toBeGreaterThan(0);

        const propertyTokens = findTokensByType(tokens, 'property');
        expect(propertyTokens.length).toBeGreaterThan(0);

        // Verify total token count is reasonable
        expect(tokens.size).toBeGreaterThan(10);
    });

    test('token position information', async () => {
        const script = `def test():
    x = 10`;

        const tokens = await getSemanticTokens(script);

        const testToken = findTokenByText(tokens, 'test');
        expect(testToken).toBeDefined();

        // Verify position information is present
        expect(testToken?.line).toBeGreaterThan(0);
        expect(testToken?.column).toBeGreaterThanOrEqual(0);
        expect(testToken?.length).toBeGreaterThan(0);
        expect(testToken?.textValue).toBe('test');
    });

    test('getTokens returns map indexed by position', async () => {
        const script = `
x = 10
`;
        const tokens = await getSemanticTokens(script);

        // Verify that tokens map uses position-based keys
        for (const [key, token] of tokens) {
            const expectedKey = `${token.line}_${token.column}_${token.length}`;
            expect(key).toBe(expectedKey);
        }
    });

    test('only keep useful tokens', async () => {
        const script=`
from "std" import supply, res, dgnd

at v5 = supply("5V")
wire down 100
add res(10k)
wire down 100
add res(20k)
wire down 100
to gnd = dgnd()
`
        const tokens = await getSemanticTokens(script);

        const jsonObject = {};
        for(const [key, value] of tokens){
            jsonObject[key] = value;
        }

        expect(expectedResult).toStrictEqual(jsonObject);
    });
});

const expectedResult = {
    "2_0_4": {
        "line": 2,
        "column": 0,
        "length": 4,
        "tokenType": "keyword",
        "tokenModifiers": [],
        "textValue": "from",
        "path": ""
    },
    "2_5_5": {
        "line": 2,
        "column": 5,
        "length": 5,
        "tokenType": "string",
        "tokenModifiers": [],
        "textValue": "\"std\"",
        "path": ""
    },
    "2_11_6": {
        "line": 2,
        "column": 11,
        "length": 6,
        "tokenType": "keyword",
        "tokenModifiers": [],
        "textValue": "import",
        "path": ""
    },
    "2_18_6": {
        "line": 2,
        "column": 18,
        "length": 6,
        "tokenType": "function",
        "tokenModifiers": [
            "defaultLibrary"
        ],
        "textValue": "supply",
        "path": ""
    },
    "2_26_3": {
        "line": 2,
        "column": 26,
        "length": 3,
        "tokenType": "function",
        "tokenModifiers": [
            "defaultLibrary"
        ],
        "textValue": "res",
        "path": ""
    },
    "2_31_4": {
        "line": 2,
        "column": 31,
        "length": 4,
        "tokenType": "function",
        "tokenModifiers": [
            "defaultLibrary"
        ],
        "textValue": "dgnd",
        "path": ""
    },
    "4_0_2": {
        "line": 4,
        "column": 0,
        "length": 2,
        "tokenType": "keyword",
        "tokenModifiers": [],
        "textValue": "at",
        "path": ""
    },
    "4_3_2": {
        "line": 4,
        "column": 3,
        "length": 2,
        "tokenType": "variable",
        "tokenModifiers": [],
        "textValue": "v5",
        "path": ""
    },
    "4_8_6": {
        "line": 4,
        "column": 8,
        "length": 6,
        "tokenType": "function",
        "tokenModifiers": [],
        "textValue": "supply",
        "path": ""
    },
    "4_15_4": {
        "line": 4,
        "column": 15,
        "length": 4,
        "tokenType": "string",
        "tokenModifiers": [],
        "textValue": "\"5V\"",
        "path": ""
    },
    "5_0_4": {
        "line": 5,
        "column": 0,
        "length": 4,
        "tokenType": "keyword",
        "tokenModifiers": [],
        "textValue": "wire",
        "path": ""
    },
    "5_5_4": {
        "line": 5,
        "column": 5,
        "length": 4,
        "tokenType": "variable",
        "tokenModifiers": [],
        "textValue": "down",
        "path": ""
    },
    "5_10_3": {
        "line": 5,
        "column": 10,
        "length": 3,
        "tokenType": "number",
        "tokenModifiers": [],
        "textValue": "100",
        "path": ""
    },
    "6_0_3": {
        "line": 6,
        "column": 0,
        "length": 3,
        "tokenType": "keyword",
        "tokenModifiers": [],
        "textValue": "add",
        "path": ""
    },
    "6_4_3": {
        "line": 6,
        "column": 4,
        "length": 3,
        "tokenType": "function",
        "tokenModifiers": [],
        "textValue": "res",
        "path": ""
    },
    "6_8_3": {
        "line": 6,
        "column": 8,
        "length": 3,
        "tokenType": "number",
        "tokenModifiers": [],
        "textValue": "10k",
        "path": ""
    },
    "7_0_4": {
        "line": 7,
        "column": 0,
        "length": 4,
        "tokenType": "keyword",
        "tokenModifiers": [],
        "textValue": "wire",
        "path": ""
    },
    "7_5_4": {
        "line": 7,
        "column": 5,
        "length": 4,
        "tokenType": "variable",
        "tokenModifiers": [],
        "textValue": "down",
        "path": ""
    },
    "7_10_3": {
        "line": 7,
        "column": 10,
        "length": 3,
        "tokenType": "number",
        "tokenModifiers": [],
        "textValue": "100",
        "path": ""
    },
    "8_0_3": {
        "line": 8,
        "column": 0,
        "length": 3,
        "tokenType": "keyword",
        "tokenModifiers": [],
        "textValue": "add",
        "path": ""
    },
    "8_4_3": {
        "line": 8,
        "column": 4,
        "length": 3,
        "tokenType": "function",
        "tokenModifiers": [],
        "textValue": "res",
        "path": ""
    },
    "8_8_3": {
        "line": 8,
        "column": 8,
        "length": 3,
        "tokenType": "number",
        "tokenModifiers": [],
        "textValue": "20k",
        "path": ""
    },
    "9_0_4": {
        "line": 9,
        "column": 0,
        "length": 4,
        "tokenType": "keyword",
        "tokenModifiers": [],
        "textValue": "wire",
        "path": ""
    },
    "9_5_4": {
        "line": 9,
        "column": 5,
        "length": 4,
        "tokenType": "variable",
        "tokenModifiers": [],
        "textValue": "down",
        "path": ""
    },
    "9_10_3": {
        "line": 9,
        "column": 10,
        "length": 3,
        "tokenType": "number",
        "tokenModifiers": [],
        "textValue": "100",
        "path": ""
    },
    "10_0_2": {
        "line": 10,
        "column": 0,
        "length": 2,
        "tokenType": "keyword",
        "tokenModifiers": [],
        "textValue": "to",
        "path": ""
    },
    "10_3_3": {
        "line": 10,
        "column": 3,
        "length": 3,
        "tokenType": "variable",
        "tokenModifiers": [],
        "textValue": "gnd",
        "path": ""
    },
    "10_9_4": {
        "line": 10,
        "column": 9,
        "length": 4,
        "tokenType": "function",
        "tokenModifiers": [],
        "textValue": "dgnd",
        "path": ""
    }
};