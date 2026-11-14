/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export type MarkdownAlign = 'left' | 'center' | 'right' | undefined;

export interface MarkdownTable {
    header: string[];
    align: MarkdownAlign[];
    rows: string[][];
}

/*
 * Split a line on unescaped pipes. Leading and trailing pipes are
 * optional. `\|` becomes `|` in the cell.
 */
function splitCells(line: string): string[] {
    const cells: string[] = [];
    let current = '';
    for (let i = line.startsWith('|') ? 1 : 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '\\' && line[i + 1] === '|') {
            current += '|';
            i++;
        } else if (ch === '|') {
            cells.push(current.trim());
            current = '';
        } else {
            current += ch;
        }
    }
    if (current.trim() !== '') {
        cells.push(current.trim());
    }
    return cells;
}

function hasUnescapedPipe(line: string): boolean {
    return /(^|[^\\])\|/.test(line);
}

export function parseMarkdownTable(text: string): MarkdownTable {
    const lines: { text: string, number: number }[] = [];
    text.split(/\r?\n/).forEach((raw, index) => {
        const trimmed = raw.trim();
        if (trimmed !== '') {
            lines.push({ text: trimmed, number: index + 1 });
        }
    });

    if (lines.length < 2) {
        throw new Error(
            'Markdown table needs a header line and a separator line');
    }

    for (const line of lines.slice(0, 2)) {
        if (!hasUnescapedPipe(line.text)) {
            throw new Error(
                `Markdown table line ${line.number} must contain a '|'`);
        }
    }

    const header = splitCells(lines[0].text);
    const separator = splitCells(lines[1].text);

    const align: MarkdownAlign[] = separator.map(cell => {
        if (!/^:?-+:?$/.test(cell)) {
            throw new Error(
                `Invalid separator cell '${cell}' on markdown table line ${lines[1].number}`);
        }
        const left = cell.startsWith(':');
        const right = cell.endsWith(':');
        if (left && right) {
            return 'center';
        }
        if (right) {
            return 'right';
        }
        return left ? 'left' : undefined;
    });

    const rows: string[][] = [];
    for (let i = 2; i < lines.length; i++) {
        const cells = splitCells(lines[i].text);
        if (cells.length > header.length) {
            throw new Error(
                `Too many cells on markdown table line ${lines[i].number}: ` +
                `${cells.length} cells but the header has ${header.length}`);
        }
        while (cells.length < header.length) {
            cells.push('');
        }
        rows.push(cells);
    }

    return { header, align, rows };
}
