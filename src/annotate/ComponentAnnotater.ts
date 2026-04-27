/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ParserRuleContext } from 'antlr4ng';
import { ClassComponent } from './../objects/ClassComponent.js';
import { ComponentRefDesPrefixes } from './../visitor.js';
import { KeywordRefdesPrefix } from '../globals.js';

/** Tracks annotations already assigned and determines refdes for components */

export class ComponentAnnotater {

    counter: { [key: string]: number; } = {};

    // Stores the loop-related context (while, for, etc.) to the refdes prefix 
    // that will be used for instances within the loop.
    indexedContextPrefix = new Map<ParserRuleContext, string>();

    existingRefDes: string[] = [];

    indexedRefdesGroups = new Map<string, string[]>();

    constructor() {
        // Refdes counting should all start at 1. e.g. R1, C1, etc.
        for (const key in ComponentRefDesPrefixes) {
            this.counter[key] = 1;
        }
    }

    getAnnotation(instance: ClassComponent): string | null {
        // If instance has a refdesPrefix parameter, then use this instead.

        let usePrefix: string;
        let useCounterKey: string;

        if (instance.hasParam(KeywordRefdesPrefix)) {
            const prefix = instance.getParam(KeywordRefdesPrefix)! as string;
            if (this.counter[prefix] === undefined) {
                this.counter[prefix] = 1;
            }

            usePrefix = prefix;
            useCounterKey = prefix;

        } else {
            // If type is null, then assume it is connector.
            const type = instance.typeProp ?? 'conn';

            // If type is unknown, then allow it to define a new range
            if (this.counter[type] === undefined && type.length <= 2) {
                // Define new type and start counting
                ComponentRefDesPrefixes[type] = type;
                this.counter[type] = 1;
            }

            // If the type is undefined,then set it as a conn
            let useType = type;
            if (ComponentRefDesPrefixes[type] === undefined) {
                useType = 'conn';
            }

            usePrefix = ComponentRefDesPrefixes[useType];
            useCounterKey = useType;
        }

        let prefix = '';
        let resultRefdes = '';

        const { ctxReferences } = instance;

        if (ctxReferences.length > 0) {
            // Assume that the first usage of the component should determine
            // whether the refdes is unique or indexed.
            const firstReference = ctxReferences[0];

            // If the creationFlag is true, it means that the component was 
            // created during that ctxReference.

            // The context of the firstReference is used as the replication point.
            const { ctx: useCtx, indexedStack, creationFlag } = firstReference;

            if (indexedStack.length > 0 && creationFlag) {
                // If indexedStack is defined, then the instance was created within
                // a indexing structure (loops or functions).

                // Collect the indexes from the indexedStack.
                const indexes = indexedStack.map(item => {
                    return item[1] + 1; // Change from 0-indexed to 1-indexed.
                });

                // If the indexed prefix has not been created before, then create it.
                if (!this.indexedContextPrefix.has(useCtx)) {

                    // Use the placeholder refdes if it was already defined.
                    if (instance.placeHolderRefDes) {
                        // Remove the '_' to get the main refdes.
                        prefix = instance.placeHolderRefDes.replaceAll('_', '');
                    } else {
                        // Otherwise, generate the main refdes based on the type.
                        const { index: nextIndex, proposedName } =
                            this.getNextRefdesCounter(usePrefix, this.counter[useCounterKey]);
                        this.counter[useCounterKey] = nextIndex;
                        prefix = proposedName;
                    }

                    // Store the prefix so it should not be used further. This
                    // is a normal refdes, not indexed.
                    this.existingRefDes.push(prefix);
                    this.indexedContextPrefix.set(useCtx, prefix);
                }

                // Generate the indexed refdes based on the prefix and the indexes
                const prefixParts = [this.indexedContextPrefix.get(useCtx)!, ...indexes];
                resultRefdes = prefixParts.join('_');

                if (this.existingRefDes.indexOf(resultRefdes) !== -1){
                    console.log('Warning: Refdes already used:', resultRefdes);
                }

                const basePrefix = this.indexedContextPrefix.get(useCtx)!;
                if (!this.indexedRefdesGroups.has(basePrefix)) {
                    this.indexedRefdesGroups.set(basePrefix, []);
                }
                this.indexedRefdesGroups.get(basePrefix)!.push(resultRefdes);

            } else {
                const refdesCounter = this.getNextRefdesCounter(
                    usePrefix, this.counter[useCounterKey]);
                this.counter[useCounterKey] = refdesCounter.index;
                resultRefdes = refdesCounter.proposedName;
            }

            // Track the refdes used.
            this.existingRefDes.push(resultRefdes);

            return resultRefdes;
        }
    }

    getNextRefdesCounter(prefix: string, startingIndex: number): { index: number, proposedName: string } {
        let attempts = 100;
        let proposedName = "";

        let index = startingIndex;

        while (attempts >= 0) {
            proposedName = prefix + index;
            index++;

            if (this.existingRefDes.indexOf(proposedName) === -1) {
                break;
            }
            attempts--;
        }

        if (attempts === 0) {
            throw "Annotation failed";
        }

        return { index, proposedName };
    }

    getIndexedRefdesSimplifications(): Map<string, string> {
        const simplifications = new Map<string, string>();

        for (const [basePrefix, indexedList] of this.indexedRefdesGroups) {
            if (indexedList.length === 1) {
                simplifications.set(indexedList[0], basePrefix);
            }
        }

        return simplifications;
    }

    trackRefDes(name: string): void {
        this.existingRefDes.push(name);
    }
}
