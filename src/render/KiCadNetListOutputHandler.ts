/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { generateKiCadNetList, printTree } from "./export.js";
import { ParserVisitor } from "../visitor.js";

/**
 * Parse output handler class to handle different output formats after the
 * script parsing is completed.
 */

export abstract class ParseOutputHandler {

    // If true, this output handler should be called before the render stage
    beforeRender = false;

    // If true, this output handler should be called after the render stage
    afterRender = false;

    abstract parse(visitor: ParserVisitor, outputPath: string | null,
        fileExtension: string | null, extra: any | null): boolean;
}
/** Generates KiCAD compatible netlist. This netlist can be loaded into
 * KiCAD PCBView */

export class KiCadNetListOutputHandler extends ParseOutputHandler {

    beforeRender = true;

    parse(visitor: ParserVisitor, outputPath: string | null, fileExtension: string | null): boolean {
        // Generate the kicad net list
        if (outputPath !== null && fileExtension === "net") {
            const { tree: kiCadNetList, missingFootprints } = generateKiCadNetList(visitor.getNetList());

            missingFootprints.forEach(entry => {
                console.log(
                    `${entry.refdes} (${entry.instanceName}) does not have footprint`);
            });

            visitor.environment.writeFileSync(outputPath, printTree(kiCadNetList));
            console.log('Generated file', outputPath);

            return false;
        }
        return true;
    }
}
