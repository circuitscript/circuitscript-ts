/*
 * Copyright 2023 Liu Weihao
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ComponentMeta, FrameMeta } from './generateOutputMetadata.js';
import { NodeScriptEnvironment } from '../environment/environment.js';

export function generateHtmlOutput(
    svgOutput: string,
    components: ComponentMeta[],
    frames: FrameMeta[],
    environment: NodeScriptEnvironment,
): string {
    let viewerJs: string;
    try {
        viewerJs = environment.readFileSync(
            environment.getRelativeToViewerAssets('generated/viewer.js'), 'utf8');
    } catch (err) {
        throw new Error(
            `Failed to load viewer assets from ${environment.getViewerAssetsPath()}: ${err}`);
    }

    return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>CircuitScript Viewer</title>
</head>
<body>
  <div id="root"></div>
  <template id="cs-svg-source">${svgOutput}</template>
  <script>
    window.__CS_COMPONENTS__ = ${JSON.stringify(components).replace(/<\/script/gi, '<\\/script')};
    window.__CS_FRAMES__ = ${JSON.stringify(frames).replace(/<\/script/gi, '<\\/script')};
  </script>
  <script>${viewerJs}</script>
</body>
</html>`;
}
