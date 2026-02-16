import { ImportFileResult } from "../BaseVisitor.js";
import { ScriptOptions, prepareFile, ParseErrorStrategy, TokenErrorListener } from "../helpers.js";
import { ParseError } from "../utils.js";
import { SymbolValidatorResolveVisitor } from "./SymbolValidatorResolveVisitor.js";
import { SymbolValidatorVisitor } from "./SymbolValidatorVisitor.js";


export async function validateScript(filePath: string, scriptData: string,
    options: ScriptOptions): Promise<SymbolValidatorVisitor> {

    const { parser } = prepareFile(scriptData);
    parser.removeErrorListeners();

    parser.errorHandler = new ParseErrorStrategy();
    parser.addErrorListener(new TokenErrorListener());

    const tree = parser.script();

    const visitor = new SymbolValidatorVisitor(true, null,
        options.environment);

    visitor.enterFile(filePath);

    visitor.onImportFile = async (visitor: SymbolValidatorVisitor, filePath: string, textData: string): Promise<ImportFileResult> => {

        visitor.enterFile(filePath);

        let hasError = false;
        let hasParseError = false;

        if (textData !== null) {
            const { parser } = prepareFile(textData);
            const tree = parser.script();

            try {
                await visitor.visitAsync(tree);
                visitor.exitFile();

            } catch (err) {
                console.log('got an error while parsing tree: ', err);
                hasParseError = true;
                hasError = true;
                throw new ParseError(`Error parsing validation in imported file: ${err}`);
            }
        } else {
            console.log('file does not exist!');
            hasError = true;
        }

        return {
            hasError, hasParseError
        };
    };

    // First pass defines variables, functions
    await visitor.visitAsync(tree);

    const symbolTable = visitor.getSymbols();
    symbolTable.clearUndefined();

    const visitorResolver = new SymbolValidatorResolveVisitor(
        true, null, options.environment);
    visitorResolver.enterFile(filePath);

    // Use the existing symbol tree as the starting point
    visitorResolver.setSymbols(visitor.getSymbols());

    visitorResolver.onImportFile = visitor.onImportFile;

    // Second pass to resolve variables, functions
    await visitorResolver.visitAsync(tree);

    return visitorResolver;
}
