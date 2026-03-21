import { ImportFileResult } from "../BaseVisitor.js";
import { ScriptOptions, prepareFile, ParseErrorStrategy, TokenErrorListener } from "../helpers.js";
import { ParseError } from "../errors.js";
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

    await visitor.resolveImportsAndLoad(filePath, scriptData);
    
    visitor.enterFile(filePath);

    visitor.onImportFile = (visitor: SymbolValidatorVisitor, filePath: string, 
        textData: string): ImportFileResult => {

        visitor.enterFile(filePath);

        let hasError = false;
        let hasParseError = false;

        if (textData !== null) {
            const { parser } = prepareFile(textData);
            const tree = parser.script();

            try {
                visitor.visit(tree);
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
    visitor.visit(tree);

    const symbolTable = visitor.getSymbols();
    symbolTable.clearUndefined();

    const visitorResolver = new SymbolValidatorResolveVisitor(
        true, null, options.environment);

    // Share the same loaded files
    visitorResolver.loadedFiles = visitor.loadedFiles;
        
    visitorResolver.enterFile(filePath);

    // Use the existing symbol tree as the starting point
    visitorResolver.setSymbols(visitor.getSymbols());

    visitorResolver.onImportFile = visitor.onImportFile;

    // Second pass to resolve variables, functions
    visitorResolver.visit(tree);

    return visitorResolver;
}
