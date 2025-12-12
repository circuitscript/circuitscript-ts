import { ComponentRefDesPrefixes } from './visitor.js';

/** Tracks annotations already assigned and determines refdes for components */

export class ComponentAnnotater {

    counter: { [key: string]: number; } = {};

    existingRefDes: string[] = [];

    constructor() {
        // Refdes counting should all start at 1. e.g. R1, C1, etc.
        for (const key in ComponentRefDesPrefixes) {
            this.counter[key] = 1;
        }
    }

    getAnnotation(type: string): string | null {

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

        let attempts = 100;
        let proposedName = "";

        while (attempts >= 0) {
            proposedName = ComponentRefDesPrefixes[type] + this.counter[type];
            this.counter[type]++;

            if (this.existingRefDes.indexOf(proposedName) === -1) {
                break;
            }
            attempts--;
        }

        if (attempts === 0) {
            throw "Annotation failed!";
        }

        return proposedName;
    }

    trackRefDes(name: string): void {
        this.existingRefDes.push(name);
    }
}
