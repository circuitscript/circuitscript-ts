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
import { RuntimeExecutionError } from './errors.js';

export type BomConfig = {
    // Specifies paramKeys that will be used in the columns of the BOM.
    columns: string[],

    // ParamKeys that are used to sort/group instances.
    group_by: string[],

    // If true, only display placed items in the BOM.
    only_placed?: boolean,
}

type BomExtractionResult = {
    resultRows: Record<string, unknown>[],
    unplacedItems: string[],
    missingValues: Map<string, string[]>,
}

export type BomGenerationResult = {
    bom: Record<string, unknown>[],
    unplacedItems: string[],
    missingValues: Map<string, string[]>,
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
 * Generate the full list of parts on individual rows
 * @param bomConfig
 * @param instances
 * @param verbose - when true, print warnings and totals to console
 * @returns
 */
export function generateBom(
    bomConfig: BomConfig,
    instances: ClassComponent[],
    verbose = false
): BomGenerationResult {
    const { resultRows, unplacedItems, missingValues } = extractComponentValuesForBom(bomConfig, instances);
    const tmpGroupedComponents = groupComponents(bomConfig, resultRows);

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

    if (verbose) {
        for (const [key, items] of missingValues) {
            const sortedItems = items.sort();
            console.log(`Warning: Missing values for parameters: ${key}:\n  ${sortedItems.join(", ")}`);
        }

        if (unplacedItems.length > 0) {
            const sortedUnplaced = unplacedItems.sort();
            console.log(`Not placed: ${sortedUnplaced.join(", ")}`);
        }

        console.log(`Total items: ${resultRows.length}`);
    }

    return { bom: sortedGroupedBom, unplacedItems, missingValues };
}

type GroupEntry = {
    allRefdes: string[],
    items: Record<string, unknown>[],
}
export function groupComponents(bomConfig: BomConfig, bomComponents: Record<string, unknown>[]): Map<string, GroupEntry> {
    const { group_by, columns } = bomConfig;

    // group_by parameter keys must be present in columns.
    const missingColumns = group_by.filter(key => {
        return columns.indexOf(key) === -1;
    });

    if (missingColumns.length > 0){
        throw new RuntimeExecutionError("Invalid group_by keys: " + missingColumns);
    }

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
function extractComponentValuesForBom(bomConfig: BomConfig, instances: ClassComponent[]): BomExtractionResult {
    const { columns = [], only_placed = true } = bomConfig;

    const resultRows: Record<string, unknown>[] = [];
    const missingValues = new Map<string, string[]>();
    const unplacedItems: string[] = [];

    instances.forEach(instance => {
        if (instance.assignedRefDes !== null) {
            // Refdes is always included.
            const row = {
                '.type': instance.typeProp,
            };

            let instancePlaced = true;
            if (instance.hasParam('place') && only_placed) {
                instancePlaced = instance.getParam('place') ?? true;
            }

            if (instancePlaced) {
                const keysUndefined: string[] = [];
                columns.forEach(paramKey => {
                    let useValue: any = undefined;

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

                    if (useValue === undefined) {
                        keysUndefined.push(paramKey);
                    }

                    // Expand value
                    row[paramKey] = useValue;
                });

                if (keysUndefined.length > 0) {
                    const useKey = keysUndefined.join(", ");
                    if (!missingValues.has(useKey)) {
                        missingValues.set(useKey, []);
                    }

                    missingValues.get(useKey)!.push(instance.assignedRefDes);
                }

                resultRows.push(row);
            } else {
                unplacedItems.push(instance.assignedRefDes);
            }
        }
    });

    return { resultRows, unplacedItems, missingValues };
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
            // Keys that start with '.' are temp keys and should not be in the
            // final bom.
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