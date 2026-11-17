/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


/**
 * Structured reference designator. Immutable: all `with*` methods return
 * copies. `toString()` yields the text form used in all outputs.
 */
export class RefDes {
    // Original text, set only when it could not be parsed (e.g. TP_GND).
    // When set, toString() returns it and the structured fields are unused.
    private raw: string | null = null;

    /**
     * Examples for the fields below, as (text -> fields):
     *   R11     -> prefix 'R', componentTypeId 11
     *   R4_2_3  -> prefix 'R', componentTypeId 4, indexedIds [2, 3]
     *   R5__    -> prefix 'R', componentTypeId 5, placeholderDepth 2
     *   A1R49   -> componentNamespace 'A1', prefix 'R', componentTypeId 49
     *   U3A     -> prefix 'U', componentTypeId 3, unitSuffix 'A'
     */
    constructor(
        /** Component type name the prefix maps to (e.g. 'res'). Null if unknown. */
        public componentType: string | null,
        /** Letters of the designator (R in R11, U in U3A). */
        public prefix: string,
        /** Number following the prefix (11 in R11, 4 in R4_2). */
        public componentTypeId: number,
        /** Loop indexes after the id (R4_2_3 -> [2, 3]). Empty if not in a loop. */
        public indexedIds: number[] = [],
        /**
         * Module instance qualifier before the prefix. Each level is the
         * parent's prefix and id (A1R49 -> 'A1', nested A1B2R3 -> 'A1B2').
         */
        public componentNamespace: string = '',
        /**
         * Number of trailing '_' when the index is not yet known
         * (R5_ -> 1, R5__ -> 2). Ignored when indexedIds is non-empty.
         */
        public placeholderDepth: number = 0,
        /** Multi-unit part letter appended last (U3 unit A -> 'A'). */
        public unitSuffix: string = '',
    ) {}

    toString(): string {
        if (this.raw !== null) {
            return this.raw + this.unitSuffix;
        }
        let text = `${this.componentNamespace}${this.prefix}${this.componentTypeId}`;
        if (this.indexedIds.length > 0) {
            text += this.indexedIds.map(i => `_${i}`).join('');
        } else {
            text += '_'.repeat(this.placeholderDepth);
        }
        return text + this.unitSuffix;
    }

    equals(other: RefDes): boolean {
        return this.toString() === other.toString();
    }

    /** True if the text form contains '_' (indexed or placeholder). */
    isIndexedOrPlaceholder(): boolean {
        if (this.raw !== null) {
            return this.raw.includes('_');
        }
        return this.indexedIds.length > 0 || this.placeholderDepth > 0;
    }

    private copy(): RefDes {
        const result = new RefDes(this.componentType, this.prefix, this.componentTypeId,
            [...this.indexedIds], this.componentNamespace, this.placeholderDepth,
            this.unitSuffix);
        result.raw = this.raw;
        return result;
    }

    /** Same as this, with indexes and placeholder cleared (R4_2 -> R4) */
    base(): RefDes {
        const result = this.copy();
        result.indexedIds = [];
        result.placeholderDepth = 0;
        if (result.raw !== null) {
            result.raw = result.raw.replaceAll('_', '');
        }
        return result;
    }

    /** R4 -> R4_ (placeholder form) */
    toPlaceholder(depth = 1): RefDes {
        const result = this.copy();
        if (result.raw !== null) {
            result.raw = result.raw.split('_')[0] + '_'.repeat(depth);
            return result;
        }
        result.indexedIds = [];
        result.placeholderDepth = depth;
        return result;
    }

    withIndexes(ids: number[]): RefDes {
        const result = this.copy();
        result.indexedIds = [...ids];
        result.placeholderDepth = 0;
        return result;
    }

    /** Copy with the multi-unit suffix set (R4 -> R4A) */
    withUnitSuffix(suffix: string): RefDes {
        const result = this.copy();
        result.unitSuffix = suffix;
        return result;
    }

    /** Copy with the namespace set */
    withNamespace(namespace: string): RefDes {
        const result = this.copy();
        result.componentNamespace = namespace;
        return result;
    }

    static parse(text: string,
        prefixToType: (prefix: string) => string | null = () => null): RefDes | null {
        const match = /^((?:[A-Za-z?]+\d+)+)(?:((?:_\d+)+)|(_+))?$/.exec(text);
        if (!match) {
            return null;
        }

        const segments = [...match[1].matchAll(/([A-Za-z?]+)(\d+)/g)];
        const last = segments[segments.length - 1];
        const namespace = segments.slice(0, -1).map(s => s[0]).join('');
        const prefix = last[1];
        const indexedIds = match[2]
            ? match[2].split('_').filter(s => s !== '').map(Number)
            : [];
        const depth = match[3] ? match[3].length : 0;

        return new RefDes(prefixToType(prefix), prefix, Number(last[2]),
            indexedIds, namespace, depth);
    }

    /** Wraps unparseable text; structured fields are blank. */
    static opaque(text: string): RefDes {
        const result = new RefDes(null, '', 0);
        result.raw = text;
        return result;
    }
}
