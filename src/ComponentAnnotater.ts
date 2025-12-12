import { ParserRuleContext } from 'antlr4ng';
import { ClassComponent } from './objects/ClassComponent.js';
import { ComponentRefDesPrefixes } from './visitor.js';

/** Tracks annotations already assigned and determines refdes for components */

export class ComponentAnnotater {

    counter: { [key: string]: number; } = {};

    // Stores the loop-related context (while, for, etc.) to the refdes prefix 
    // that will be used for instances within the loop.
    loopContextPrefix = new Map<ParserRuleContext, string>();

    existingRefDes: string[] = [];

    constructor() {
        // Refdes counting should all start at 1. e.g. R1, C1, etc.
        for (const key in ComponentRefDesPrefixes) {
            this.counter[key] = 1;
        }
    }

    getAnnotation(instance: ClassComponent): string | null {
        // If type is null, then assume it is connector.
        const type = instance.typeProp ?? 'conn';

        // If type is unknown, then allow it to define a new range
        if (this.counter[type] === undefined && type.length <= 2) {
            for (const [, value] of Object.entries(ComponentRefDesPrefixes)) {
                if (value === type) {
                    throw "Refdes prefix is already in use!";
                }
            }

            if (ComponentRefDesPrefixes[type] === undefined) {
                // Define new type and start counting
                ComponentRefDesPrefixes[type] = type;
                this.counter[type] = 1;
            }
        }

        if (ComponentRefDesPrefixes[type] === undefined) {
            return null;
        }

        let prefix = ComponentRefDesPrefixes[type];
        let resultRefdes = '';

        const { ctxReferences } = instance;

        // Assume that the first usage of the component should determine
        // whether the refdes is unique or indexed.
        if (ctxReferences.length > 0) {
            const firstReference = ctxReferences[0];

            // If the creationFlag is true, it means that the component was 
            // created during that ctxReference.
            const { loopStack, creationFlag } = firstReference;

            if (loopStack.length > 0 && creationFlag) {
                // If loopStack is defined, then the instance was created within
                // a loop structure.

                // Collect the indexes from the loopStack.
                const loopIndexes = loopStack.map(item => {
                    return item[1] + 1; // Change from 0-indexed to 1-indexed.
                });

                const lastCtx = loopStack[loopStack.length - 1][0];

                // If the loop prefix has not been created before, then create it.
                if (!this.loopContextPrefix.has(lastCtx)) {

                    // Use the placeholder refdes if it was already defined.
                    if (instance.placeHolderRefDes) {
                        // Remove the '_' to get the main refdes.
                        prefix = instance.placeHolderRefDes.replace('_', '');
                    } else {
                        // Otherwise, generate the main refdes based on the type.
                        const { index: nextIndex, proposedName } =
                            this.getNextRefdesCounter(prefix, this.counter[type]);
                        this.counter[type] = nextIndex;
                        prefix = proposedName;
                    }

                    this.existingRefDes.push(prefix);
                    this.loopContextPrefix.set(lastCtx, prefix);
                }

                const prefixParts = [this.loopContextPrefix.get(lastCtx)!, ...loopIndexes];
                resultRefdes = prefixParts.join('_');
            } else {
                const refdesCounter = this.getNextRefdesCounter(prefix, this.counter[type]);
                this.counter[type] = refdesCounter.index;
                resultRefdes = refdesCounter.proposedName;
            }

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

    trackRefDes(name: string): void {
        this.existingRefDes.push(name);
    }
}
