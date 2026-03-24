/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { defaultPageMarginMM, MilsToMM } from "../globals.js";

// Portrait
const PaperSizes: { [key: string]: [width: number, height: number]; } = {
    'A0': [1189, 841],
    'A1': [841, 594],
    'A2': [594, 420],
    'A3': [420, 297],
    'A4': [297, 210],
    'A5': [210, 148],
    'A6': [148, 105],
};

export const PaperGridReferences: { [key: string]: [rows: number, columns: number]; } = {
    'A0': [16, 24],
    'A1': [12, 16],
    'A2': [8, 12],
    'A3': [6, 8],
    'A4': [4, 6],
};

export function isSupportedPaperSize(type: string): boolean {
    if (PaperSizes[type]) {
        return true;
    }
    return false;
}

export function getPaperSize(type: string, margin = defaultPageMarginMM): {
    width: number; height: number;
    widthMM: number; heightMM: number;
    originalWidthMM: number; originalHeightMM: number;
} {

    if (PaperSizes[type]) {
        const [width, height] = PaperSizes[type];

        // Margin is in mm
        const useWidth = width - margin * 2;
        const useHeight = height - margin * 2;

        return {
            // Mils
            width: Math.floor(useWidth * (1 / MilsToMM)),
            height: Math.floor(useHeight * (1 / MilsToMM)),

            widthMM: useWidth,
            heightMM: useHeight,
            originalWidthMM: width,
            originalHeightMM: height,
        };
    } else {
        return getPaperSize('A4'); // default
    }
}
