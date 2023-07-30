import ELK, { ElkNode } from 'elkjs';
import { ClassComponent } from './objects/Component';
import { NumericValue } from './objects/ParamDefinition';
import { SequenceAction } from './objects/ExecutionScope';

function createNode(id: string, component: ClassComponent): any {
    const nodeValue = {
        id: id,
        width: 100,
        height: 50,
        labels: [
            {
                text: id,
                width: 50,
                height: 12,
            },
        ],
        layoutOptions: {
            'nodeLabels.placement': '[INSIDE V_CENTER H_CENTER]',
        },
    };

    let displayValue = null;
    if (component.parameters.has('value')) {
        const tmpValue = component.parameters.get('value');
        if (tmpValue instanceof NumericValue) {
            displayValue = tmpValue.value.toString();
        } else {
            displayValue = tmpValue.toString();
        }

        nodeValue.labels.push({
            text: displayValue,
            width: 50,
            height: 12,
        });
    }

    return nodeValue;
}

function dumpSequence(sequence: [string, ClassComponent, number][]): void  {
    sequence.forEach(([action, component, number]) => {
        console.log(action, component.instanceName, number);
    });
}

export function prepareLayout(
    sequence: [string, ClassComponent, number][],
): any {

    dumpSequence(sequence);

    const tmpNodes = [];
    const tmpEdges = [];

    const addedNodes = [];
    let prevNode = null;

    let edgeCounter = 0;

    for (let i = 0; i < sequence.length; i++) {
        const [action, component] = sequence[i];

        let useName = component.instanceName;
        if (component._linkID !== undefined) {
            useName = `${component.instanceName}@${component._linkID}`;
        }

        // Add the node if it has not been added before
        if (addedNodes.indexOf(useName) === -1 && !(prevNode === null && action === SequenceAction.To)) {
            const tmpNode = createNode(useName, component);

            // Priority is used to determine which node is plotted first
            // Earlier elements in the sequence list should have higher priortiy,
            // so that's why the priority is backwards
            tmpNode.layoutOptions["priority"] = sequence.length - i;
            tmpNodes.push(tmpNode);
            addedNodes.push(useName);
        }

        // Create the edge, if possible
        if (action === SequenceAction.To && prevNode !== null) {
            tmpEdges.push({
                id: `edge_${edgeCounter}`,
                sources: [prevNode],
                targets: [useName],
            });

            edgeCounter++;
        }

        prevNode = useName;
    }

    return {
        id: 'root',
        layoutOptions: {
            algorithm: 'layered',
            'portLabels.placement': '[INSIDE]',
            portConstraints: 'FIXED_SIDE',

            // So the order of the nodes will also be considered
            // 'considerModelOrder.strategy': 'NODES_AND_EDGES',

            // https://eclipse.dev/elk/reference/options/org-eclipse-elk-layered-crossingMinimization-forceNodeModelOrder.html
            // 'crossingMinimization.forceNodeModelOrder': 'true',
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
    name: string;
    pins: {
        [key: string]: string;
    };
};

export type OutputGraph = OutputGraphItem[];
