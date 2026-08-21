import { readFileSync } from "fs";

import { getTestEnvironment, testValidateScript } from "./helpers";
import { getSemanticTokens } from "../src/semantic-tokens/getSemanticTokens.js";
import { buildTokenAnnotations } from "../src/validate/buildValidationHtmlData.js";
import { renderValidationHtml } from "../src/validate/renderValidationHtml.js";

const fixturePath = '__tests__/testData/validateHtmlData/fixture.cst';

describe('validation HTML output', () => {

    async function buildAnnotations() {
        const scriptData = readFileSync(fixturePath, { encoding: 'utf8' });
        const environment = getTestEnvironment();

        const visitor = await testValidateScript(scriptData);
        const symbols = visitor.getSymbols().getSymbols();

        const { parsedTokens } = await getSemanticTokens(fixturePath, scriptData, {
            environment,
        });

        const annotations = buildTokenAnnotations(parsedTokens, symbols);

        return { scriptData, annotations };
    }

    test('marks defined and undefined symbols', async () => {
        const { annotations } = await buildAnnotations();

        const myVarDeclaration = annotations.find(a => a.text === 'myVar' && a.line === 1);
        expect(myVarDeclaration?.symbolInfo?.kind).toBe('defined');

        const myVarUsage = annotations.find(a => a.text === 'myVar' && a.line === 2);
        expect(myVarUsage?.symbolInfo?.kind).toBe('defined');

        const undefinedUsage = annotations.find(a => a.text === 'undefinedThing');
        expect(undefinedUsage?.symbolInfo?.kind).toBe('undefined');
    });

    test('renders HTML with token spans and tooltips', async () => {
        const { scriptData, annotations } = await buildAnnotations();

        const html = renderValidationHtml(scriptData, annotations, fixturePath);

        expect(html).toContain('<span class="tok tok-variable" title="type: variable\nsymbol:');
        expect(html).toContain('UNDEFINED SYMBOL');
        expect(html).toContain('tok-undefined');
    });

    test('escapes comparison operators in source', async () => {
        const { scriptData, annotations } = await buildAnnotations();

        const html = renderValidationHtml(scriptData, annotations, fixturePath);

        const bodyStart = html.indexOf('<pre>') + '<pre>'.length;
        const bodyEnd = html.indexOf('</pre>');
        const body = html.substring(bodyStart, bodyEnd);

        expect(body).toContain('&lt;');
        expect(body).toContain('&gt;');
        expect(body).toContain('&amp;&amp;');

        const withoutSpanTags = body.replace(/<\/?span[^>]*>/g, '');
        expect(withoutSpanTags).not.toContain('<');
        expect(withoutSpanTags).not.toContain('>');
    });
});
