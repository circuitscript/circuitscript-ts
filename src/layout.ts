import ELK, { ElkNode } from 'elkjs';
import { GlobalNames } from './globals';

export function prepareLayout(nodes: { name: string }[], edges: string[][]): any {

    const tmpNodes = [];
    const tmpEdges = [];

    const sortedNodes = nodes.sort((a, b) => {
        if (a.name === 'gnd'){
            return 1;
        } else if (b.name === 'gnd'){
            return -1;
        } else {
            return 0;
        }
    });

    sortedNodes.forEach(item => {
        const { name } = item;

        tmpNodes.push({
            id: name,
            width: 100,
            height: 50,
            labels: [
                {
                    text: name,
                    width: 50,
                    height: 12,
                }
            ],
        });
    });

    edges.forEach((pair, index) => {

        let tmpSource = pair[0];
        let tmpTarget = pair[1];

        if (pair[0] === GlobalNames.gnd){
            tmpSource = pair[1];
            tmpTarget = pair[0];
        }

        tmpEdges.push({
            id: `edge_${index}`,
            sources: [tmpSource],
            targets: [tmpTarget],
        });
        console.log('edge', tmpSource, tmpTarget);
    });

    return {
        id: "root",
        layoutOptions: {
            algorithm: "layered",
            "portLabels.placement": "[INSIDE]",
            "portConstraints": "FIXED_SIDE",
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