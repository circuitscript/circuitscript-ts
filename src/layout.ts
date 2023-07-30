import ELK, { ElkNode } from 'elkjs';
import { ClassComponent } from './objects/Component';
import { NumericValue } from './objects/ParamDefinition';

function createNode(component: ClassComponent): any {

    const nodeValue = {
        id: component.instanceName,
        width: 100,
        height: 50,
        labels: [{
            text: component.instanceName,
            width: 50,
            height: 12,
        }],
        layoutOptions: {
            "nodeLabels.placement": "[INSIDE V_CENTER H_CENTER]"
        }
    }

    let displayValue = null;
    if (component.parameters.has("value")) {
        const tmpValue = component.parameters.get("value");
        if (tmpValue instanceof NumericValue) {
            displayValue = tmpValue.value.toString();
        } else {
            displayValue = tmpValue.toString();
        }

        nodeValue.labels.push({
            text: displayValue,
            width: 50,
            height: 12
        });
    }

    return nodeValue;
}

export function prepareLayout(sequence: [string, ClassComponent, number][]): any {

    const tmpNodes = [];
    const tmpEdges = [];

    const addedNodes = [];
    let prevNode = null;

    let edgeCounter = 0;

    for (let i = 0; i < sequence.length; i++) {
        const [action, component] = sequence[i];

        // Add the node if it has not been added before
        if (addedNodes.indexOf(component.instanceName) === -1) {
            tmpNodes.push(createNode(component));
            addedNodes.push(component.instanceName);
        }

        // Create the edge, if possible
        if (action === 'to' && prevNode !== null) {
            tmpEdges.push({
                id: `edge_${edgeCounter}`,
                sources: [prevNode],
                targets: [component.instanceName]
            });

            edgeCounter++;
        }

        prevNode = component.instanceName;
    }

    return {
        id: "root",
        layoutOptions: {
            algorithm: "layered",
            "portLabels.placement": "[INSIDE]",
            "portConstraints": "FIXED_SIDE",

            // So the order of the nodes will also be considered
            "considerModelOrder.strategy": "NODES_AND_EDGES",

            // https://eclipse.dev/elk/reference/options/org-eclipse-elk-layered-crossingMinimization-forceNodeModelOrder.html
            "crossingMinimization.forceNodeModelOrder": "true"
        },
        children: tmpNodes,
        edges: tmpEdges,
    };
}

export async function generateLayout(graph): Promise<ElkNode> {
    const elk = new ELK();
    const result = await elk.layout(graph);
    return result;
}

export type OutputGraphItem = {
    name: string,
    pins: {
        [key: string]: string
    }
};

export type OutputGraph = OutputGraphItem[];