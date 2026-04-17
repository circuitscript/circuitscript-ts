/*
 * Copyright 2023 Liu Weihao
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import path from 'path';
import { ParseOutputHandler } from './KiCadNetListOutputHandler.js';
import { KiCadSchGenerator, KiCadVersion } from './KiCadSchGenerator.js';
import { SheetFrame } from './layout.js';
import { ParserVisitor } from '../visitor.js';

export { KiCadVersion } from './KiCadSchGenerator.js';

/**
 * Output handler that generates KiCad schematic (.kicad_sch) files.
 * Runs after the layout stage so it has access to component positions.
 */
export class KiCadSchOutputHandler extends ParseOutputHandler {

    afterRender = true;

    constructor(private version: KiCadVersion, private circuitscriptVersion: string) {
        super();
    }

    parse(visitor: ParserVisitor, outputPath: string | null,
        fileExtension: string | null, extra: SheetFrame[] | null): boolean {

        if (outputPath !== null && fileExtension === 'kicad_sch') {
            const sheetFrames = extra ?? [];
            const generator = new KiCadSchGenerator(this.version, this.circuitscriptVersion);

            const projectName = path.basename(outputPath, path.extname(outputPath));
            const projectDirectory = path.dirname(outputPath);

            const sheetOutputs = generator.generate(visitor, sheetFrames, projectName);

            for(const item of sheetOutputs){
                const {fileName, output} = item;
                const filePath = path.join(projectDirectory, fileName + ".kicad_sch");

                visitor.environment.writeFileSync(filePath, output);
                console.log('Generated file', filePath);
            }

            return false;
        }
        return true;
    }
}
