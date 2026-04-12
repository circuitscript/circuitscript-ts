/*
 * Copyright 2023 Liu Weihao
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export class IdObject {
    keyName: string;
    constructor(keyName: string) {
        this.keyName = keyName;
    }
}

export function _id(key: string): IdObject {
    return new IdObject(key);
}

export type SExpString = [id: IdObject, string];
export type SExpNested = [id: IdObject, SExp];

export type SExp = [id: IdObject, ...(SExpString | SExpNested)[]];

/**
 * An unquoted atom in an s-expression — used for keywords, numbers, and
 * identifiers that must NOT be wrapped in double-quotes in the output
 * (e.g. `passive`, `default`, `0`, `1.27`).
 */
export class RawAtom {
    constructor(public readonly value: string | number) {}
    toString(): string { return String(this.value); }
}

/** Create an unquoted atom. */
export function raw(value: string | number): RawAtom {
    return new RawAtom(value);
}

// TODO: fix type of tree
export function printTree(tree: any, level = 0): string {
    const output = [];

    // If a single item, then just return the value
    if (!Array.isArray(tree)) {
        if (tree instanceof RawAtom) {
            return String(tree.value);
        }
        if (typeof tree === 'number') {
            return String(tree);
        }
        return "\"" + tree + "\"";
    }

    const firstItem = tree[0] as IdObject;
    output.push(firstItem.keyName);

    const padding = "".padStart(2 * (level+1));

    for (let i = 1; i < tree.length; i++) {
        const result = printTree(tree[i], level + 1);
        if (result[0] === "(") {
            output.push("\n" + padding + result);
        } else {
            output.push(result);
        }
    }

    return "(" + output.join(" ") + ")";
}

export class SExpObject {

    object: SExp;

    constructor(object: SExp) {
        this.object = object;
    }

    getKey(object: SExp | null = null): IdObject {
        object = object ?? this.object;
        return object[0];
    }

    getValue(object: SExp | null = null): any {
        object = object ?? this.object;
        return object.slice(1);
    }

    getJSON(object: SExp | null = null): { [key: string]: any } {
        object = object ?? this.object;
        if (!Array.isArray(object)) {
            return object;
        }

        const properties: { [key: string]: any } = {};
        const keyName = object[0].keyName;

        if (object.length === 2) {
            properties[keyName] = this.getJSON(object[1]);
        } else {
            const innerProps: { [key: string]: any } = {};
            this.getValue(object).forEach(item => {
                // if key already exists, then change to an array
                const tmpValue = this.getJSON(item);
                if (typeof tmpValue === "object") {
                    for (const key in tmpValue) {
                        if (innerProps[key]) {
                            if (!Array.isArray(innerProps[key])) {
                                innerProps[key] = [innerProps[key]];
                            }
                            innerProps[key].push(tmpValue[key]);
                        } else {
                            innerProps[key] = tmpValue[key];
                        }
                    }
                } else {
                    innerProps[item[0].keyName] = tmpValue;
                }
            });

            properties[keyName] = innerProps;
        }

        return properties;
    }

    getWithId(id: string, object: SExp | null = null): SExp | null {
        object = object ?? this.object;

        let result: null | SExp = null;
        const key = object[0];
        if (key.keyName === id) {
            return object;
        } else {
            this.getValue(object).some(item => {
                if (Array.isArray(item)) {
                    result = this.getWithId(id, item);
                    if (result !== null) {
                        return true;
                    }
                }
                return false;
            });
        }

        return result;
    }

    print(): void {
        console.log(printTree(this.object));
    }
}


export function Id(name: string): IdObject {
    return new IdObject(name);
}
