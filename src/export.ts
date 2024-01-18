import { ComponentTypes } from "./globals";
import { NumericValue } from "./objects/ParamDefinition";
import { NetListItem } from "./visitor";

export function generateKiCADNetList(netlist: NetListItem[]): string {

    const componentsList = [];

    // Dictionary storing net name to the list of nodes/pins
    const nets = {};

    netlist.forEach(entry => {
        const { instance, pins } = entry;
        if (instance.assignedRefDes !== null){

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
                console.log(instance.assignedRefDes, instance.instanceName, 'does not have footprint');
            }

            componentsList.push(instanceDetails);

            for(const key in pins){
                const netInfo = pins[key];
                const netName = netInfo.netName;

                if (netName === 'NO_NET'){
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
            if (instance.typeProp !== ComponentTypes.label && 
                instance.typeProp !== ComponentTypes.net && 
                instance.typeProp !== ComponentTypes.point && 
                instance.typeProp !== null){
                console.log('Skipping', instance.instanceName);
            }
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

    const tree = [
        Id("export"),
        [Id("version"), "E"],
        [Id("design"),
            [Id("source"), "/somefile"],
            [Id("date"), "2023-11-19"],
            [Id("tool"), "circuitscript-to-kicad"]
        ],
        [Id('components'), ...componentsList],
        [Id('nets'), ...netItems]
    ];

    return printTree(tree);
}

function printTree(tree: (IdObject | string)[] | string, level = 0): string {
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


function Id(name): IdObject {
    return new IdObject(name);
}

class IdObject {
    keyName: string;
    constructor(keyName: string) {
        this.keyName = keyName;
    }
}