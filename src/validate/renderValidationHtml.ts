/*
 * Copyright 2023 Liu Weihao
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { TokenAnnotation } from './buildValidationHtmlData.js';

/** Escapes characters that are special in HTML text/attribute content. */
function escapeHtml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/** Builds the hover tooltip text for a token, including symbol info when available. */
function buildTooltipText(annotation: TokenAnnotation): string {
    const { tokenType, tokenModifiers, symbolInfo } = annotation;

    let text = `type: ${tokenType}`;
    if (tokenModifiers.length > 0) {
        text += ` [${tokenModifiers.join(', ')}]`;
    }

    if (symbolInfo) {
        if (symbolInfo.kind === 'undefined') {
            text += '\nUNDEFINED SYMBOL';
        } else {
            text += `\nsymbol: ${symbolInfo.id} (${symbolInfo.parseType})`;
            if (symbolInfo.definedAt) {
                text += `\ndefined at ${symbolInfo.definedAt.fileName}:${symbolInfo.definedAt.line}:${symbolInfo.definedAt.column}`;
            }
        }
    }

    return text;
}

/**
 * Renders source text as a standalone HTML document, wrapping annotated
 * tokens in styled spans with hover tooltips showing token/symbol info.
 */
export function renderValidationHtml(
    sourceText: string,
    annotations: TokenAnnotation[],
    fileName: string,
): string {

    const annotationsByLine = new Map<number, TokenAnnotation[]>();
    annotations.forEach(annotation => {
        const list = annotationsByLine.get(annotation.line);
        if (list) {
            list.push(annotation);
        } else {
            annotationsByLine.set(annotation.line, [annotation]);
        }
    });
    annotationsByLine.forEach(list => list.sort((a, b) => a.column - b.column));

    const lines = sourceText.split('\n');
    let body = '';

    lines.forEach((lineText, index) => {
        const lineNumber = index + 1;
        const lineAnnotations = annotationsByLine.get(lineNumber) ?? [];

        let cursor = 0;
        let annotationIndex = 0;

        while (cursor < lineText.length) {
            const annotation = lineAnnotations[annotationIndex];

            if (annotation && annotation.column === cursor) {
                annotationIndex++;

                if (annotation.tokenType !== '') {
                    const text = lineText.substring(cursor, cursor + annotation.length);
                    const classes = ['tok', `tok-${annotation.tokenType}`];
                    if (annotation.symbolInfo?.kind === 'undefined') {
                        classes.push('tok-undefined');
                    }
                    const title = escapeHtml(buildTooltipText(annotation));
                    body += `<span class="${classes.join(' ')}" title="${title}">${escapeHtml(text)}</span>`;
                    cursor += annotation.length;
                    continue;
                } else {
                    cursor += annotation.length;
                    continue;
                }
            }

            const nextColumn = annotation ? annotation.column : lineText.length;
            body += escapeHtml(lineText.substring(cursor, nextColumn));
            cursor = nextColumn;
        }

        if (index < lines.length - 1) {
            body += '\n';
        }
    });

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${escapeHtml(fileName)}</title>
<style>
  body {
    background: #ffffff;
    color: #1e1e1e;
    margin: 0;
    padding: 0;
  }
  pre {
    margin: 0;
    padding: 1em;
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
    font-size: 13px;
    line-height: 1.5;
    white-space: pre;
    tab-size: 4;
  }
  .tok-keyword { color: #0000ff; }
  .tok-number { color: #098658; }
  .tok-string { color: #a31515; }
  .tok-variable { color: #001080; }
  .tok-comment { color: #008000; font-style: italic; }
  .tok-function { color: #795e26; }
  .tok-parameter { color: #001080; font-style: italic; }
  .tok-property { color: #a95e00; }
  .tok-undefined { text-decoration: underline wavy red; }
  .tok[title]:hover { background: rgba(0, 0, 0, 0.08); cursor: help; }
</style>
</head>
<body>
<pre>${body}</pre>
</body>
</html>
`;
}
