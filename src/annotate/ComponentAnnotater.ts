/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ParserRuleContext } from 'antlr4ng';
import { ClassComponent } from './../objects/ClassComponent.js';
import { ComponentRefDesPrefixes } from './../visitor.js';
import { KeywordRefdesPrefix, RefdesMode } from '../globals.js';

/** Tracks annotations already assigned and determines refdes for components */

const defaultFormatPath = (filePath: string) => filePath.split(/[\\/]/).pop() ?? filePath;

export class ComponentAnnotater {

    counter: { [key: string]: number; } = {};

    // Stores the loop-related context (while, for, etc.) to the refdes prefix 
    // that will be used for instances within the loop.
    indexedContextPrefix = new Map<ParserRuleContext, string>();

    existingRefDes: string[] = [];

    // Max candidate names tried when picking the next free refdes. Fixed for now.
    maxRefdesAttempts = 1000;

    private existingSet = new Set<string>();

    // Refdes -> "file:line" of the instance that claimed it.
    private claimedBy = new Map<string, string>();

    // Placeholder base (e.g. R5) -> ctx that owns it.
    private placeholderOwner = new Map<string, ParserRuleContext>();

    indexedRefdesGroups = new Map<string, string[]>();

    // Counter type key (e.g. 'res') -> shared base used by indexed-flat mode.
    private flatBaseByKey = new Map<string, string>();

    // Base (e.g. R32) -> last counter value used.
    private flatCounters = new Map<string, number>();

    constructor(private formatPath: (filePath: string) => string = defaultFormatPath,
        private refdesMode: RefdesMode = RefdesMode.Indexed) {
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

            if (this.refdesMode === RefdesMode.IndexedFlat && indexedStack.length > 0 && creationFlag) {
                resultRefdes = this.getFlatIndexedRefdes(instance, usePrefix, useCounterKey);

            } else if (this.refdesMode !== RefdesMode.Flat && indexedStack.length > 0 && creationFlag) {
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
                        // It was reserved up front by reservePlaceholder.
                        prefix = instance.placeHolderRefDes.replaceAll('_', '');
                        if (!this.placeholderOwner.has(prefix)) {
                            this.reservePlaceholder(prefix, instance);
                        }
                    } else {
                        // Otherwise, generate the main refdes based on the type.
                        const { index: nextIndex, proposedName } =
                            this.getNextRefdesCounter(usePrefix, this.counter[useCounterKey]);
                        this.counter[useCounterKey] = nextIndex;
                        prefix = proposedName;
                    }

                    // Store the prefix so it should not be used further. This
                    // is a normal refdes, not indexed.
                    if (!instance.placeHolderRefDes) {
                        this.markUsed(prefix, instance);
                    }
                    this.indexedContextPrefix.set(useCtx, prefix);
                }

                // Generate the indexed refdes based on the prefix and the indexes
                const prefixParts = [this.indexedContextPrefix.get(useCtx)!, ...indexes];
                resultRefdes = prefixParts.join('_');

                if (this.existingSet.has(resultRefdes)) {
                    throw new Error(`Refdes '${resultRefdes}' already used (${this.claimedBy.get(resultRefdes) ?? 'unknown'}), again at ${this.describeLocation(instance)}`);
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
            this.markUsed(resultRefdes, instance);

            return resultRefdes;
        }
    }

    private getFlatIndexedRefdes(instance: ClassComponent, usePrefix: string,
        useCounterKey: string): string {
        let base: string;

        if (instance.placeHolderRefDes) {
            // Remove the '_' to get the main refdes.
            base = instance.placeHolderRefDes.replaceAll('_', '');
            this.reservePlaceholder(base, instance);
        } else {
            const existing = this.flatBaseByKey.get(useCounterKey);
            if (existing !== undefined) {
                base = existing;
            } else {
                const { index: nextIndex, proposedName } =
                    this.getNextRefdesCounter(usePrefix, this.counter[useCounterKey]);
                this.counter[useCounterKey] = nextIndex;
                base = proposedName;
                this.markUsed(base, instance);
                this.flatBaseByKey.set(useCounterKey, base);
            }
        }

        const n = (this.flatCounters.get(base) ?? 0) + 1;
        const resultRefdes = `${base}_${n}`;

        if (this.existingSet.has(resultRefdes)) {
            throw new Error(`Refdes '${resultRefdes}' already used (${this.claimedBy.get(resultRefdes) ?? 'unknown'}), again at ${this.describeLocation(instance)}`);
        }
        this.flatCounters.set(base, n);

        if (!this.indexedRefdesGroups.has(base)) {
            this.indexedRefdesGroups.set(base, []);
        }
        this.indexedRefdesGroups.get(base)!.push(resultRefdes);

        return resultRefdes;
    }

    getNextRefdesCounter(prefix: string, startingIndex: number): { index: number, proposedName: string } {
        let index = startingIndex;
        const limit = startingIndex + this.maxRefdesAttempts;
        while (this.existingSet.has(prefix + index)) {
            index++;
            if (index >= limit) {
                throw new Error(`Annotation failed: no free refdes for '${prefix}' after ${this.maxRefdesAttempts} attempts`);
            }
        }
        return { index: index + 1, proposedName: prefix + index };
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

    trackRefDes(name: string, instance: ClassComponent): void {
        if (this.existingSet.has(name)) {
            throw new Error(`Duplicate refdes '${name}': first used at ${this.claimedBy.get(name) ?? 'unknown'}, again at ${this.describeLocation(instance)}`);
        }
        this.markUsed(name, instance);
    }

    /** Reserves the base name of an indexed placeholder (e.g. R5_ -> R5) */
    reservePlaceholder(base: string, instance: ClassComponent): void {
        const ctx = instance.ctxReferences[0]?.ctx;
        const loc = this.describeLocation(instance);
        const owner = this.placeholderOwner.get(base);

        if (owner === undefined) {
            if (this.existingSet.has(base)) {
                throw new Error(`Placeholder '${base}_' at ${loc} conflicts with explicit refdes '${base}' (${this.claimedBy.get(base) ?? 'unknown'})`);
            }
            this.placeholderOwner.set(base, ctx);
            this.markUsed(base, instance);
        } else if (owner !== ctx && this.refdesMode !== RefdesMode.IndexedFlat) {
            throw new Error(`Placeholder '${base}_' used at ${this.claimedBy.get(base) ?? 'unknown'} and ${loc}`);
        }
    }

    private markUsed(name: string, instance?: ClassComponent): void {
        this.existingSet.add(name);
        this.existingRefDes.push(name);
        if (instance && !this.claimedBy.has(name)) {
            this.claimedBy.set(name, this.describeLocation(instance));
        }
    }

    describeLocation(instance: ClassComponent): string {
        const refs = instance.ctxReferences;
        const ref = refs.find(r => r.creationFlag) ?? refs[0];
        const line = ref?.ctx?.start?.line;
        if (line === undefined) {
            return instance.instanceName;
        }
        const file = ref.filePath ? this.formatPath(ref.filePath) : '';
        return `${file ? file + ':' : 'line '}${line}`;
    }
}
