/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { render } from 'preact';
import type { ComponentMeta, FrameMeta, PreviewTransport } from '../viewer-ui/src/index';
import { PreviewApp } from '../viewer-ui/src/index';

declare global {
  interface Window {
    __CS_COMPONENTS__?: ComponentMeta[];
    __CS_FRAMES__?: FrameMeta[];
  }
}

// The SVG markup is carried in an inert <template> element rather than a
// JS string/global: a JSON- or JS-string-escaped copy would turn its
// `id="..."` attributes into `id=\"...\"`, which the .html output's own
// consumers (and tests) match against literally in the raw file text.
function readSvgSource(): string {
  const template = document.getElementById('cs-svg-source') as HTMLTemplateElement | null;
  return template?.innerHTML ?? '';
}

const noopTransport: PreviewTransport = {
  requestPreview: () => undefined,
  requestExport: async () => undefined,
  applyRefdes: async () => undefined,
  runErcCheck: async () => undefined,
};

function buildById<T extends { domId: string }>(items: T[] | undefined): Record<string, T> {
  const byId: Record<string, T> = {};
  for (const item of items ?? []) {
    byId[item.domId] = item;
  }
  return byId;
}

const componentsById = buildById(window.__CS_COMPONENTS__);
const framesById = buildById(window.__CS_FRAMES__);

render(
  <PreviewApp
    transport={noopTransport}
    activeDocumentFilePath={null}
    svgMarkup={readSvgSource()}
    componentsById={componentsById}
    framesById={framesById}
    error={null}
    exportOptions={[]}
    pendingActions={new Set()}
  />,
  document.getElementById('root')!
);
