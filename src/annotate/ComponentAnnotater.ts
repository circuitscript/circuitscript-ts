/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ParserRuleContext } from 'antlr4ng';
import { ClassComponent } from './../objects/ClassComponent.js';
import { CtxReference } from './../objects/types.js';
import { ComponentRefDesPrefixes } from './../visitor.js';
import { ParamKeys, RefdesAssignmentMode } from '../globals.js';
import { assertDefined, getOrThrow } from "../utils.js";
import { Logger } from '../logger.js';
import { RefDes } from '../objects/RefDes.js';

/** Tracks annotations already assigned and determines refdes for components */

const defaultFormatPath = (filePath: string): string => filePath.split(/[\\/]/).pop() ?? filePath;

export class ComponentAnnotater {

    counter: { [key: string]: number; } = {};

    // Stores the loop-related context (while, for, etc.) to the refdes prefix 
    // that will be used for instances within the loop.
    indexedContextPrefix = new Map<ParserRuleContext, RefDes>();

    existingRefDes: string[] = [];

    // Max candidate names tried when picking the next free refdes. Fixed for now.
    maxRefdesAttempts = 1000;

    private existingSet = new Set<string>();

    // Refdes -> "file:line" of the instance that claimed it.
    private claimedBy = new Map<string, string>();

    // Placeholder base (e.g. R5) -> ctx that owns it.
    private placeholderOwner = new Map<string, ParserRuleContext>();

    // Base prefix (e.g. R5) -> indexed refdes generated under it (R5_1, R5_2, ...).
    // Used by getIndexedRefdesSimplifications to collapse single-member groups
    // back to the base name.
    indexedRefdesGroups = new Map<string, RefDes[]>();

    // Group key -> base RefDes of the group.
    private indexedRefdesBases = new Map<string, RefDes>();

    // Base (e.g. R32) -> last counter value used.
    private flatCounters = new Map<string, number>();

    constructor(private formatPath: (filePath: string) => string = defaultFormatPath,
        private refdesMode: RefdesAssignmentMode = RefdesAssignmentMode.Indexed,
        private logger: Logger = new Logger()) {
        // Refdes counting should all start at 1. e.g. R1, C1, etc.
        for (const key in ComponentRefDesPrefixes) {
            this.counter[key] = 1;
        }
    }

    private log(...args: (string | number)[]): void {
        this.logger.add('[annotate]', ...args);
    }

    getAnnotation(instance: ClassComponent): RefDes | null {
        this.log(`annotating '${instance.instanceName}' (${this.describeLocation(instance)})`);
        this.log(`componentNamespace: ${instance.getComponentNamespace()}`);
        // If instance has a refdesPrefix parameter, then use this instead.

        let usePrefix: string;
        let useCounterKey: string;
        let useComponentType: string | null = null;

        if (instance.hasParam(ParamKeys.RefdesPrefix)) {
            const prefix = assertDefined(instance.getParam(ParamKeys.RefdesPrefix), "Missing refdes prefix param") as string;
            if (this.counter[prefix] === undefined) {
                this.counter[prefix] = 1;
            }

            usePrefix = prefix;
            useCounterKey = prefix;
            useComponentType = instance.typeProp ?? null;
            this.log(`  prefix '${usePrefix}' from refdes_prefix param`);

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
            useComponentType = useType;
            this.log(`  prefix '${usePrefix}' from type '${type}'` +
                (useType !== type ? ` (unknown, using '${useType}')` : ''));
        }

        let prefix: RefDes;
        let resultRefdes: RefDes;

        // Assume that the first usage of the component should determine
        // whether the refdes is unique or indexed. The graphOnly is true,
        // so only graph related ctx references are returned. 
        const firstReference = instance.getFirstCtxReference(true) as CtxReference;

        if (firstReference){    
            // If the creationFlag is true, it means that the component was 
            // created during that ctxReference.

            // The context of the firstReference is used as the replication point.
            const { ctx: useCtx, indexedStack } = firstReference;
            this.log(`  first reference at line ${useCtx?.start?.line}, indexedStack depth ${indexedStack.length}`);

            if (this.refdesMode === RefdesAssignmentMode.IndexedFlat && indexedStack.length > 0) {
                this.log('  strategy: indexed-flat');
                resultRefdes = this.getIndexedFlatRefdes(useCtx, instance, usePrefix, useCounterKey,
                    useComponentType);

            } else if (this.refdesMode !== RefdesAssignmentMode.Flat && indexedStack.length > 0) {
                // If indexedStack is defined, then the instance was created within
                // a indexing structure (loops or functions).

                this.log('  strategy: indexed');
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
                        prefix = instance.placeHolderRefDes.base();
                        this.log(`  base '${prefix}' from placeholder '${instance.placeHolderRefDes}'`);
                        if (!this.placeholderOwner.has(prefix.toString())) {
                            this.reservePlaceholder(prefix, instance);
                        }
                    } else {
                        // Otherwise, generate the main refdes based on the type.
                        const { index: nextIndex } =
                            this.getNextRefdesCounter(usePrefix, this.counter[useCounterKey]);
                        this.counter[useCounterKey] = nextIndex;
                        prefix = new RefDes(useComponentType, usePrefix, nextIndex - 1);
                        this.log(`  base '${prefix}' from counter '${useCounterKey}', next=${nextIndex}`);
                    }

                    // Store the prefix so it should not be used further. This
                    // is a normal refdes, not indexed.
                    if (!instance.placeHolderRefDes) {
                        this.markUsed(prefix, instance);
                    }
                    this.indexedContextPrefix.set(useCtx, prefix);
                } else {
                    this.log(`  reusing base '${this.indexedContextPrefix.get(useCtx)}' for this context`);
                }

                // Generate the indexed refdes based on the prefix and the indexes
                const basePrefix = getOrThrow(this.indexedContextPrefix, useCtx, "indexed context prefix");
                const componentNamespace = instance.getComponentNamespace();
                resultRefdes = basePrefix.withIndexes(indexes).withNamespace(
                    `${componentNamespace}${basePrefix.componentNamespace}`);
                this.log(`  indexes [${indexes.join(',')}], namespace '${componentNamespace}' -> '${resultRefdes}'`);

                const resultKey = resultRefdes.toString();
                if (this.existingSet.has(resultKey)) {
                    throw new Error(`Refdes '${resultKey}' already used (${this.claimedBy.get(resultKey) ?? 'unknown'}), again at ${this.describeLocation(instance)}`);
                }

                const groupKey = basePrefix.toString();
                if (!this.indexedRefdesGroups.has(groupKey)) {
                    this.indexedRefdesGroups.set(groupKey, []);
                    this.indexedRefdesBases.set(groupKey, basePrefix);
                }
                getOrThrow(this.indexedRefdesGroups, groupKey, "refdes group").push(resultRefdes);

            } else {
                this.log('  strategy: unique (not in an indexed structure, or flat mode)');
                const refdesCounter = this.getNextRefdesCounter(
                    usePrefix, this.counter[useCounterKey]);
                this.counter[useCounterKey] = refdesCounter.index;
                resultRefdes = new RefDes(useComponentType, usePrefix, refdesCounter.index - 1);
            }

            // Track the refdes used.
            this.markUsed(resultRefdes, instance);
            this.log(`  result: '${instance.instanceName}' -> '${resultRefdes}'`);

            return resultRefdes;
        }

        this.log(`  no graph reference, '${instance.instanceName}' not annotated`);
        return null;
    }

    private getIndexedFlatRefdes(ctx: ParserRuleContext, 
        instance: ClassComponent, usePrefix: string,
        useCounterKey: string, useComponentType: string | null): RefDes {
        let prefix: RefDes;

        // Not indexed, yet so create it
        if (!this.indexedContextPrefix.has(ctx)) {

            // Use placeholder refdes if already defined.
            if (instance.placeHolderRefDes) {
                // Remove the '_' to get the main refdes.
                prefix = instance.placeHolderRefDes.base();
                this.log(`  flat base '${prefix}' from placeholder '${instance.placeHolderRefDes}'`);
                this.reservePlaceholder(prefix, instance);
            } else {
                const { index: nextIndex } =
                    this.getNextRefdesCounter(usePrefix, this.counter[useCounterKey]);
                this.counter[useCounterKey] = nextIndex;
                prefix = new RefDes(useComponentType, usePrefix, nextIndex - 1);
                this.log(`  flat base '${prefix}' from counter '${useCounterKey}', next=${nextIndex}`);

                this.markUsed(prefix, instance);
            }
            this.indexedContextPrefix.set(ctx, prefix);

        } else {
            prefix = getOrThrow(this.indexedContextPrefix, ctx, "indexed context prefix");
            this.log(`  flat reusing base '${prefix}' for this context`);
        }

        const prefixKey = prefix.toString();
        const n = (this.flatCounters.get(prefixKey) ?? 0) + 1;
        let resultRefdes = prefix.withIndexes([n]);
        const resultKey = resultRefdes.toString();

        if (instance.componentNamespace){
            resultRefdes = resultRefdes.withNamespace(instance.getComponentNamespace());
        }

        if (this.existingSet.has(resultKey)) {
            throw new Error(`Refdes '${resultKey}' already used (${this.claimedBy.get(resultKey) ?? 'unknown'}), again at ${this.describeLocation(instance)}`);
        }
        this.flatCounters.set(prefixKey, n);
        this.log(`  flat counter for '${prefixKey}' = ${n} -> '${resultKey}'`);

        if (!this.indexedRefdesGroups.has(prefixKey)) {
            this.indexedRefdesGroups.set(prefixKey, []);
            this.indexedRefdesBases.set(prefixKey, prefix);
        }
        getOrThrow(this.indexedRefdesGroups, prefixKey, "refdes group").push(resultRefdes);

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
        if (index !== startingIndex) {
            this.log(`  '${prefix}${startingIndex}'..'${prefix}${index - 1}' already taken, picked '${prefix}${index}'`);
        }
        return { index: index + 1, proposedName: prefix + index };
    }

    getIndexedRefdesSimplifications(): Map<string, RefDes> {
        const simplifications = new Map<string, RefDes>();

        for (const [baseKey, indexedList] of this.indexedRefdesGroups) {
            if (indexedList.length === 1) {
                const base = getOrThrow(this.indexedRefdesBases, baseKey, "refdes group base");
                simplifications.set(indexedList[0].toString(), base);
                this.log(`simplify '${indexedList[0]}' -> '${base}' (only member of group)`);
            }
        }

        return simplifications;
    }

    trackRefDes(refdes: RefDes | string, instance: ClassComponent): void {
        const name = refdes.toString();
        if (this.existingSet.has(name)) {
            throw new Error(`Duplicate refdes '${name}': first used at ${this.claimedBy.get(name) ?? 'unknown'}, again at ${this.describeLocation(instance)}`);
        }
        this.log(`explicit refdes '${name}' at ${this.describeLocation(instance)}`);
        this.markUsed(name, instance);
    }

    /** Reserves the base name of an indexed placeholder (e.g. R5_ -> R5) */
    reservePlaceholder(baseRefdes: RefDes, instance: ClassComponent): void {
        const base = baseRefdes.toString();
        const ctx = instance.getFirstCtxReference()?.ctx;
        const loc = this.describeLocation(instance);
        const owner = this.placeholderOwner.get(base);

        if (owner === undefined) {
            if (this.existingSet.has(base)) {
                throw new Error(`Placeholder '${base}_' at ${loc} conflicts with explicit refdes '${base}' (${this.claimedBy.get(base) ?? 'unknown'})`);
            }
            this.log(`  reserved placeholder base '${base}' at ${loc}`);
            this.placeholderOwner.set(base, ctx);
            this.markUsed(base, instance);
        } else if (owner !== ctx && this.refdesMode !== RefdesAssignmentMode.IndexedFlat) {
            throw new Error(`Placeholder '${base}_' used at ${this.claimedBy.get(base) ?? 'unknown'} and ${loc}`);
        }
    }

    private markUsed(refdes: RefDes | string, instance?: ClassComponent): void {
        const name = refdes.toString();
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
