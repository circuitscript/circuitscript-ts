import { BaseVisitor, ImportFileResult } from "../BaseVisitor.js";
import { ScriptOptions, prepareFile } from "../helpers.js";
import { IParsedToken, prepareTokens, SemanticTokensVisitor } from "./SemanticTokenVisitor.js";
import { ParseError } from "../utils.js";

export async function getSemanticTokens(
    filePath: string, scriptData: string, options: ScriptOptions): Promise<{ visitor: SemanticTokensVisitor; parsedTokens: IParsedToken[]; }> {

    const { parser, lexer, tokens } = prepareFile(scriptData);
    const tree = parser.script();

    const visitor = new SemanticTokensVisitor(true, null,
        options.environment,
        lexer, scriptData
    );

    parser.removeErrorListeners();

    visitor.onImportFile = async (visitor: BaseVisitor, filePath: string, textData: string): Promise<ImportFileResult> => {

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
                throw new ParseError(`Error parsing semantic tokens in imported file: ${err}`);
            }
        } else {
            console.log('File does not exist');
            hasError = true;
        }

        return {
            hasError, hasParseError
        };
    };

    // Pre-load all imported files so they are available during sync visiting
    await visitor.resolveImportsAndLoad(filePath, scriptData);

    visitor.visit(tree);

    const semanticTokens = visitor.getTokens();

    // Get all tokens
    const parsedTokens = prepareTokens(tokens.getTokens(), lexer, scriptData);
    const finalParsedTokens: IParsedToken[] = [];
    parsedTokens.forEach(token => {
        const location = `${token.line}_${token.column}_${token.length}`;
        if (semanticTokens.has(location)) {
            finalParsedTokens.push(
                semanticTokens.get(location)!);
        } else {
            finalParsedTokens.push(token);
        }
    });

    return {
        visitor,
        parsedTokens: finalParsedTokens
    };
}
