/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ComponentTypes, NoNetText } from "./globals.js";
import { NumericValue } from "./objects/ParamDefinition.js";
import { NetListItem } from "./visitor.js";

export function generateKiCADNetList(netlist: NetListItem[])
    : {
        tree: SExp,
        missingFootprints: { refdes: string, instanceName: string }[]
    } {

    const componentsList = [];

    // Dictionary storing net name to the list of nodes/pins
    const nets = {};

    const missingFootprints: { refdes: string, instanceName: string }[] = [];

    netlist.forEach(entry => {
        const { instance, pins } = entry;
        if (instance.assignedRefDes !== null) {

            const instanceDetails = [
                Id('comp'),
                [Id('ref'), instance.assignedRefDes],
            ];

            if (instance.parameters.has('value')){
                let value = instance.parameters.get('value');
                if (value instanceof NumericValue){
                    value = value.value;
                }
                instanceDetails.push([Id('value'), value]);
            }

            if (instance.parameters.has('footprint')){
                instanceDetails.push([Id('footprint'), 
                    instance.parameters.get('footprint')]);
            } else {
                missingFootprints.push({
                    refdes: instance.assignedRefDes,
                    instanceName: instance.instanceName
                })
            }

            componentsList.push(instanceDetails);

            for(const key in pins){
                const netInfo = pins[key];
                const netName = netInfo.netName;

                if (netName === NoNetText){
                    continue;
                }

                if (nets[netName] === undefined){
                    nets[netName] = [];
                }

                nets[netName].push([
                    Id('node'), 
                    [Id('ref'), instance.assignedRefDes],
                    [Id('pin'), key],
                    [Id('pintype'), "passive"]
                ])
            }
        } else {
            // console.log('Skipping', instance.instanceName);
        }
    });

    const netItems = [];
    let counter = 1;

    for(const netName in nets){
        const netPins = nets[netName];
        netItems.push([
            Id('net'),
            [Id('code'), counter],
            [Id('name'), netName],
            ...netPins
        ]);
        counter++;
    }

    const dateString = new Date().toISOString().slice(0, 10);

    const tree: SExp = [
        Id("export"),
        [Id("version"), "E"],
        [Id("design"),
            [Id("source"), "/unknown-file"],
            [Id("date"), dateString],
            [Id("tool"), "circuitscript-to-kicad"]
        ],
        [Id('components'), ...componentsList],
        [Id('nets'), ...netItems]
    ];

    return {
        tree,
        missingFootprints
    };
}

export function printTree(tree: (IdObject | string)[] | string, level = 0): string {
    const output = [];

    // If a single item, then just return the value
    if (!Array.isArray(tree)) {
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


function Id(name: string): IdObject {
    return new IdObject(name);
}

export class IdObject {
    keyName: string;
    constructor(keyName: string) {
        this.keyName = keyName;
    }
}

export function _id(key: string): IdObject {
    return new IdObject(key);
}


export class SExpObject {

    object: SExp;


    constructor(object: SExp) {
        this.object = object;
    }

    getKey(object:SExp | null = null): IdObject {
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

export type SExpString = [id: IdObject, string];
export type SExpNested = [id: IdObject, SExp];

export type SExp = [id: IdObject, ...(SExpString | SExpNested)[]];