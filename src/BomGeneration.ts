/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as csv from '@fast-csv/format';

import { ClassComponent } from "./objects/ClassComponent.js";
import { NumericValue } from "./objects/NumericValue.js";
import { NodeScriptEnvironment } from './environment/environment.js';

export type BomConfig = {
    columns: string[], // Specifies paramKeys that will be used in the columns of the BOM
}

// Determines the sort order in the BOM.
const TypeSortOrder = {
    "res": 1,
    "cap": 2,
    "ind": 3,

    "diode": 9,
    "ic": 10,
    "conn": 20,
}

/**
 * Generate the full list of parts on indivdual rows
 * @param bomConfig 
 * @param instances 
 * @returns 
 */
export function generateBom(bomConfig: BomConfig, instances: ClassComponent[]): Record<string, unknown>[] {
    const bomComponents = extractComponentValuesForBom(bomConfig, instances);
    const tmpGroupedComponents = groupComponents(bomConfig, bomComponents);

    const groupedBom: Record<string, unknown>[] = [];
    tmpGroupedComponents.forEach(value => {
        groupedBom.push({
            // Use properties from the first item.
            ...value.items[0],
            refdes: value.allRefdes.join(', ')
        });
    });

    // Sort the items by refdes
    const sortedGroupedBom = groupedBom.toSorted((a, b) => {
        const typeSortA = TypeSortOrder[a['.type']] ?? 100;
        const typeSortB = TypeSortOrder[b['.type']] ?? 100;
        return typeSortA - typeSortB;
    });

    return sortedGroupedBom;
}

type GroupEntry = {
    allRefdes: string[],
    items: Record<string, unknown>[],
}
export function groupComponents(bomConfig: BomConfig, bomComponents: Record<string, unknown>[]): Map<string, GroupEntry> {
    const { group_by } = bomConfig;

    const grouped = new Map<string, GroupEntry>();

    // Try to group up the components first
    bomComponents.forEach(row => {
        // Extract the values from the row
        const groupKeyParts = {};
        group_by.forEach(paramKey => {
            groupKeyParts[paramKey] = row[paramKey];
        });

        const groupKey = JSON.stringify(groupKeyParts);

        if (!grouped.has(groupKey)) {
            grouped.set(groupKey, {
                allRefdes: [],
                items: [],
            });
        }

        const entry = grouped.get(groupKey)!;
        entry.items.push(row);
        entry.allRefdes.push(row.refdes);

        grouped.set(groupKey, entry);
    });

    // Generate a new grouped bom instead
    return grouped;
}

/**
 * Gets components and their parameters that will be part of the BOM.
 * @param bomConfig
 * @param instances 
 * @returns 
 */
function extractComponentValuesForBom(bomConfig: BomConfig, instances: ClassComponent[]): Record<string, unknown>[] {
    const { columns = [] } = bomConfig;
    // console.log('Generating BOM with columns: ' + columns.join(', '));

    const resultRows: Record<string, unknown>[] = [];

    instances.forEach(instance => {
        if (instance.assignedRefDes !== null) {
            // Refdes is always included.
            const row = {
                '.type': instance.typeProp,
            };

            columns.forEach(paramKey => {
                let useValue: any = '';

                if (paramKey === 'refdes') {
                    useValue = instance.assignedRefDes;
                } else {
                    if (instance.hasParam(paramKey)) {
                        useValue = instance.getParam(paramKey);

                        // If paramValue is a string, it might be a template 
                        // string, so try to resolve values
                        if (typeof useValue === 'string') {
                            useValue = resolveValuesInTemplate(instance, useValue);
                        } else if (useValue instanceof NumericValue) {
                            useValue = useValue.toDisplayString();
                        }
                    }
                }

                // Expand value
                row[paramKey] = useValue;
            });
            resultRows.push(row);
        }
    });

    return resultRows;
}

function resolveValuesInTemplate(instance: ClassComponent, templateString: string): string {
    return templateString.replace(/\{(\w+)\}/g, (match, paramName) => {
        if (instance.hasParam(paramName)) {
            const paramValue = instance.getParam(paramName);
            if (paramValue instanceof NumericValue) {
                return paramValue.toDisplayString();
            }

            return instance.getParam(paramName);
        }

        return match; // Keep original if parameter not found
    });
}

export function generateBomCSV(bomData: Record<string, GroupEntry>[]): string[][] {
    // extract headers from the first record
    const useHeaders: string[] = [];
    const rows:string[][] = [];

    if (bomData.length > 0) {
        const [firstRow] = bomData;
        for (const key in firstRow) {
            if (key.startsWith('.')) {
                continue;
            }
            // Capitalize the first char
            const useKey = key[0].toUpperCase() + key.substring(1);
            useHeaders.push(useKey);
        }
    }

    rows.push(useHeaders);

    const keys: string[] = [];
    if (bomData.length > 0) {
        for (const key in bomData[0]) {
            if (key.startsWith('.')) {
                continue;
            }

            keys.push(key);
        }
    }

    bomData.forEach(row => {
        const result = keys.map(key => {
            return row[key];
        });

        rows.push(result);
    });

    return rows;
}

export async function saveBomOutputCsv(environment:NodeScriptEnvironment, 
    bomCsvOutput: string[][], filePath: string): Promise<void> {
    
    return new Promise(resolve => {
        const outputStream = environment.createWriteStream(filePath);
        const csvStream = csv.format();
        csvStream.pipe(outputStream).on("finish", () => {
            resolve();
        });

        bomCsvOutput.forEach(row => {
            csvStream.write(row);
        });

        csvStream.end();
    });
}