/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CircuitScriptLexer } from "./antlr/CircuitScriptLexer.js";

// Keywords that the lexer defines with alternatives, so they have no
// single entry in the lexer's literal names.
const ExtraKeywords = ['not', 'and', 'or', 'nc', 'NC', 'true', 'false'];

/**
 * Words that cannot be used as identifiers. Derived from the lexer's
 * literal names so it follows the grammar.
 */
export const GrammarKeywords: string[] = Array.from(new Set([
    ...CircuitScriptLexer.literalNames
        .filter((name): name is string => name !== null)
        .map(name => name.slice(1, -1))
        .filter(name => /^[A-Za-z_]\w*$/.test(name)),
    ...ExtraKeywords,
]));
