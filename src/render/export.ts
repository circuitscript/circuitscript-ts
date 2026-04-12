/*
 * Copyright 2023 Liu Weihao
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NoNetText } from "../globals.js";
import { NumericValue } from "../objects/NumericValue.js";
import { NetListItem } from "../visitor.js";
import { Id, IdObject, SExp } from "./s_expressions.js";

export { IdObject, SExpObject, SExpString, SExpNested, SExp, printTree, _id } from "./s_expressions.js";

export function generateKiCadNetList(netlist: NetListItem[])
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
