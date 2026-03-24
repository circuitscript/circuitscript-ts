/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { config, createSVGWindow } from 'svgdom';
import { NodeScriptEnvironment } from './environment';

export class ESMNodeScriptEnvironment extends NodeScriptEnvironment {
    protected async prepareSVGEnvironmentInternal(fontsPath: string | null): Promise<void> {
        try {
            this.globalCreateSVGWindow = createSVGWindow;
            if (fontsPath !== null) {
                await config.setFontDir(fontsPath)
                    .setFontFamilyMappings(this.supportedFonts)
                    .preloadFonts();
            }
        } catch (error) {
            throw new Error(`Failed to load svgdom ESM module: ${error}`);
        }
    }
}