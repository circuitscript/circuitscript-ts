/*
 * Copyright 2023 Liu Weihao
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ComponentMeta } from './generateComponentMetadata.js';
import { NodeScriptEnvironment } from '../environment/environment.js';
import { VERSION } from '../version.js';

export function generateHtmlOutput(
    svgOutput: string,
    components: ComponentMeta[],
    environment: NodeScriptEnvironment,
): string {
    let viewerCss: string;
    let viewerJs: string;
    try {
        viewerCss = environment.readFileSync(
            environment.getRelativeToViewerAssets('viewer.css'), 'utf8');
        viewerJs = environment.readFileSync(
            environment.getRelativeToViewerAssets('viewer.js'), 'utf8');
    } catch (err) {
        throw new Error(
            `Failed to load viewer assets from ${environment.getViewerAssetsPath()}: ${err}`);
    }

    return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>CircuitScript Viewer</title>
<style>${viewerCss}</style>
</head>
<body>
  <div id="cs-viewport">
    <div id="cs-pan-zoom">${svgOutput}</div>
  </div>
  <div id="cs-hint">
    <p>Scroll/pinch to zoom &middot; drag to pan &middot; click an item to inspect</p>
    <div id="cs-hint-controls">
        <button id="cs-zoom-in" type="button" title="Zoom in">+</button>
        <button id="cs-zoom-out" type="button" title="Zoom out">&minus;</button>
        <button id="cs-zoom-fit" type="button" title="Show all">Show all</button>
    </div>
    <p id="cs-hint-version">CircuitScript v${VERSION}</p>
  </div>
  <div id="cs-panel" class="cs-hidden">
    <button id="cs-panel-close">&times;</button>
    <div id="cs-panel-content"></div>
  </div>
  <script>
    window.__CS_COMPONENTS__ = ${JSON.stringify(components).replace(/<\/script/gi, '<\\/script')};
  </script>
  <script>${viewerJs}</script>
</body>
</html>`;
}
