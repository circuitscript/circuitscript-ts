#! /usr/bin/env node

/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { program } from 'commander';
import path from 'path';

import { readFileSync, existsSync } from 'fs';

import { 
    NodeScriptEnvironment, 
    validateScript} from './helpers.js';
import { _id } from './export.js';
import { Token } from 'antlr4ng';
import { ParseSymbolType } from './objects/types.js';
import { SymbolTableItemDefined } from './validate/SymbolTable.js';

export default async function validate(): Promise<void> {
    const env = new NodeScriptEnvironment();
 
    const version = env.getPackageVersion();

    program
        .description('generate validation output circuitscript files')
        .version(version)
        .argument('[input path]', 'Input path')
        .argument('[output path]', 'Output path')
        .option('-i, --input text <input text>', 'Input text directly')
        .option('-c, --current-directory <path>', 'Set current directory')
        .option('-w, --watch', 'Watch for file changes')
        .option('-n, --dump-nets', 'Dump out net information')
        .option('-d, --dump-data', 'Dump data during parsing')
        .option('-s, --stats', 'Show stats during generation')
        .option('-x, --skip-output', 'Skip output generation');

    if (process.argv.length < 3){
        program.help();
    }
    
    program.parse();    

    const options = program.opts();
    const args = program.args;

    const watchFileChanges = options.watch;
    const dumpNets = options.dumpNets;
    const dumpData = options.dumpData;

    if (options.currentDirectory){
        env.setCurrentDirectory(options.currentDirectory);
    }

    if (watchFileChanges) {
        console.log('watching for file changes...');
    }

    await env.prepareSVGEnvironment();

    let inputFilePath = "";

    if (args.length > 2) {
        console.log("Error: Extra arguments passed");
        return;
    }

    let scriptData: string;
    if (args.length > 0 && args[0]) {
        inputFilePath = args[0];

        if (existsSync(inputFilePath)) {
            scriptData = readFileSync(inputFilePath, { encoding: 'utf-8' });
        } else {
            console.error("Error: File could not be found");
            return;
        }
    } else if (options.input) {
        scriptData = options.input;
    } else {
        console.error("Error: No input provided");
        return;
    }    

    const scriptOptions = {
        dumpNets, 
        dumpData,
        showStats: options.stats,
        environment: env,
    }

    const visitor = validateScript(inputFilePath, scriptData, scriptOptions);
    const symbols = visitor.getSymbols().getSymbols();

    symbols.forEach((value, key) => {
        if (value.type !== ParseSymbolType.Undefined) {
            value = value as SymbolTableItemDefined;

            const token = (value.token as Token);
            console.log(key, value.fileName, token !== null ? (token.line + ":" + token.column) : "");

            value.instances.forEach(instance => {
                console.log("    " + instance.line + ":" + instance.column+ " " + instance.start);
            });
        }
    });

    // const { parsedTokens} = getSemanticTokens(scriptData, scriptOptions);

    // parsedTokens.forEach(item => {
    //     const {line, column, tokenType, tokenModifiers, textValue} = item;
    //     console.log(`${line}:${column} - ${textValue} - ${tokenType} | ${tokenModifiers.join(',')}`);
    // });
}

validate();