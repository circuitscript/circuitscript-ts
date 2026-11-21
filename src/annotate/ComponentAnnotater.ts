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
import { RuntimeExecutionError } from '../errors.js';

/** Tracks annotations already assigned and determines refdes for components */

const defaultFormatPath = (filePath: string): string => filePath.split(/[\\/]/).pop() ?? filePath;

export class ComponentAnnotater {

    counter: { [key: string]: number; } = {};

    // Stores the loop-related context (while, for, etc.) to the refdes prefix 
    // that will be used for instances within the loop.
    indexedContextPrefix = new Map<ParserRuleContext, RefDes>();

    // Max candidate names tried when picking the next free refdes. Fixed for now.
    maxRefdesAttempts = 1000;

    private assignedRefdes = new Set<string>();

    // Refdes -> "file:line" of the instance that claimed it.
    private claimedBy = new Map<string, string>();

    // Placeholder base (e.g. R5) -> ctx that owns it.
    private placeholderCtx = new Map<string, ParserRuleContext>();

    // Base prefix (e.g. R5) -> indexed refdes generated under it (R5_1, R5_2, ...).
    // Used by getIndexedRefdesSimplifications to collapse single-member groups
    // back to the base name.
    indexedRefdesGroups = new Map<string, RefDes[]>();

    // Group key -> base RefDes of the group.
    private indexedRefdesBases = new Map<string, RefDes>();

    // Base (e.g. R32) -> last counter value used.
    private flatCounters = new Map<string, number>();

    constructor(private formatPath: (filePath: string) => string = defaultFormatPath,
        private refdesMode: RefdesAssignmentMode = RefdesAssignmentMode.IndexedFlat,
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
                resultRefdes = this.getIndexedFlatRefdes2(useCtx, instance, 
                    usePrefix, useComponentType);

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
                        if (!this.placeholderCtx.has(prefix.toString())) {
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
                if (this.assignedRefdes.has(resultKey)) {
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

    // Maps contexts to base refdes (no component namespaces, no indexes)
    ctxRefdes = new Map<ParserRuleContext, RefDes>();

    refdesPrefixIndexCounters = new Map<string, number>();
    refdesPrefixMap = new Map<string, RefDes>();

    // Stores last counter of base refdes. 
    baseRefdesCounters = new Map<string, number>();
   
    // Stores base refdes created
    baseRefdesSet = new Set<string>();

    private getIndexedFlatRefdes2(ctx: ParserRuleContext, 
        instance: ClassComponent, usePrefix: string,
        useComponentType: string | null): RefDes {

        // Generate base refdes        
        if (!this.ctxRefdes.has(ctx)){
            // If this context has not been assigned a refdes base yet. (R11, etc.)

            this.log(`creating base refdes for ctx`);

            if (!this.baseRefdesCounters.has(usePrefix)){
                this.baseRefdesCounters.set(usePrefix, 1);
                this.log(`setup base refdes counter`);
            }

            let index = this.baseRefdesCounters.get(usePrefix) as number;
            this.log(`base refdes counter: ${index}`);

            const endIndex = index + this.maxRefdesAttempts;

            while (index < endIndex) {
                const tmpRefdes = new RefDes(useComponentType, usePrefix, index);
                if (this.baseRefdesSet.has(tmpRefdes.toString())) {
                    index++;
                } else {
                    // Found available slot
                    this.baseRefdesCounters.set(usePrefix, index);
                    this.baseRefdesSet.add(tmpRefdes.toString());

                    this.log(`base refdes assigned: ${tmpRefdes.toString()}`);
                    break;
                }
            }

            // Failed to find an available slot.
            if (index === endIndex) {
                throw new RuntimeExecutionError("Failed to find index for refdes base");
            }

            this.ctxRefdes.set(ctx, new RefDes(
                useComponentType, usePrefix, index));
        }

        const ctxRefdes = this.ctxRefdes.get(ctx) as RefDes;
        let useRefdes = ctxRefdes.base();

        const componentNamespace = instance.getComponentNamespace();
        if (componentNamespace) {
            useRefdes = ctxRefdes.withNamespace(componentNamespace);
        }

        const refdesPrefixStr = useRefdes.toString();
        this.log(`refdes prefix: ${refdesPrefixStr}`);

        // Start tracking the refdes prefix as a counter. This includes 
        // component namespace with the base.
        if (!this.refdesPrefixIndexCounters.has(refdesPrefixStr)) {
            this.refdesPrefixIndexCounters.set(refdesPrefixStr, 1);
            this.refdesPrefixMap.set(refdesPrefixStr, useRefdes);

            this.log(`setup refdes prefix counter`);
        }

        let index = this.refdesPrefixIndexCounters.get(refdesPrefixStr) as number;
        this.log(`refdes prefix counter: ${index}`);

        const endIndex = index + this.maxRefdesAttempts;

        let tmpRefdes!: RefDes;

        while (index < endIndex) {
            tmpRefdes = useRefdes.withIndexes([index]);

            if (this.assignedRefdes.has(tmpRefdes.toString())) {
                index++;
            } else {
                // Found available index.

                // Update the counter
                this.refdesPrefixIndexCounters.set(refdesPrefixStr, index);

                // Mark the refdes as already assigned/used.
                this.assignedRefdes.add(tmpRefdes.toString());
                this.log(`refdes prefix counter assigned: ${tmpRefdes.toString()}`);

                break;
            }
        }

        if (index === endIndex) {
            // assume not found, throw an error
            throw new RuntimeExecutionError("Failed to find index for namespaced refdes");
        }

        return tmpRefdes;
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

        if (this.assignedRefdes.has(resultKey)) {
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
        while (this.assignedRefdes.has(prefix + index)) {
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

        if (this.refdesMode === RefdesAssignmentMode.IndexedFlat){
            for (const [refdesPrefixStr, counter] of this.refdesPrefixIndexCounters) {
                if (counter === 1) {
                    const refdes = this.refdesPrefixMap.get(refdesPrefixStr) as RefDes;
                    // Remove the indexes
                    simplifications.set(refdes.withIndexes([1]).toString(), refdes.withIndexes([]));
                }
            }
        } else {
            for (const [baseKey, indexedList] of this.indexedRefdesGroups) {
                if (indexedList.length === 1) {
                    const base = getOrThrow(this.indexedRefdesBases, baseKey, "refdes group base");
                    simplifications.set(indexedList[0].toString(), base);
                    this.log(`simplify '${indexedList[0]}' -> '${base}' (only member of group)`);
                }
            }
        }
        return simplifications;
    }

    trackRefDes(refdes: RefDes, instance: ClassComponent, ctx: ParserRuleContext): void {
        const name = refdes.toString();
        if (this.assignedRefdes.has(name)) {
            throw new Error(`Duplicate refdes '${name}': first used at ${this.claimedBy.get(name) ?? 'unknown'}, again at ${this.describeLocation(instance)}`);
        }
        this.log(`explicit refdes '${name}' at ${this.describeLocation(instance)}`);
        this.markUsed(refdes, instance, ctx);
    }

    /** Reserves the base name of an indexed placeholder (e.g. R5_ -> R5) */
    reservePlaceholder(baseRefdes: RefDes, instance: ClassComponent): void {
        const base = baseRefdes.toString();
        const firstReferenceCtx = instance.getFirstCtxReference() as CtxReference;
        const ctx = firstReferenceCtx.ctx;
        const loc = this.describeLocation(instance);

        if (!this.placeholderCtx.has(base)) {
            if (this.assignedRefdes.has(base)) {
                throw new Error(`Placeholder '${base}_' at ${loc} conflicts with explicit refdes '${base}' (${this.claimedBy.get(base) ?? 'unknown'})`);
            }
            this.log(`  reserved placeholder base '${base}' at ${loc}`);
            this.placeholderCtx.set(base, ctx);
            this.markUsed(baseRefdes, instance, ctx);
        } else {
            const linkedCtx = this.placeholderCtx.get(base) as ParserRuleContext;
            if (linkedCtx !== ctx) {
                throw new Error(`Placeholder '${base}_' used at ${this.claimedBy.get(base) ?? 'unknown'} and ${loc}`);
            }
        }
    }

    private markUsed(refdes: RefDes, instance?: ClassComponent, ctx: ParserRuleContext): void {
        const name = refdes.toString();
        this.assignedRefdes.add(name);
        if (instance && !this.claimedBy.has(name)) {
            this.claimedBy.set(name, this.describeLocation(instance));
        }

        const baseRefdes = refdes.base();
        const baseRefdesStr = baseRefdes.toString();
        if (!this.baseRefdesCounters.has(baseRefdesStr)){
            this.baseRefdesCounters.set(baseRefdesStr, 1);
        }

        this.baseRefdesSet.add(baseRefdes.toString());
        this.ctxRefdes.set(ctx, baseRefdes);
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
