/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// Ported verbatim from preview.html. Mirrors sanitizeDomId() in the language
// server's utils - there is no shared source of truth between the TS and JS
// copies, so keep this regex in sync if that function changes.

export function sanitizeNetKey(name: string): string {
  return String(name).replace(/[^A-Za-z0-9_-]/g, '-');
}

export function sheetIndexFromDomId(domId: string): string {
  const m = /^comp-(\d+)-/.exec(domId || '');
  return m ? m[1] : '0';
}

export function buildNetKey(sheetIndex: string, rawNetName: string): string {
  return sheetIndex + '-' + sanitizeNetKey(rawNetName);
}
