import ELK, { ElkNode } from 'elkjs';
import { ClassComponent } from './objects/Component';
import { NumericValue } from './objects/ParamDefinition';
import { SequenceAction } from './objects/ExecutionScope';
import { isNetComponent } from './execute';
import { GlobalNames } from './globals';
import { measureTextSize } from './sizing';

const portWidth = 10;
const portHeight = 1;

const defaultFont = 'Arial';
const defaultFontSize = 10;

async function createNode(nodeId: string, component: ClassComponent): Promise<any> {
    const tmpIsNetComponent = isNetComponent(component);

    const { width: labelWidth, height: labelHeight } = await measureTextSize(nodeId, defaultFont, defaultFontSize);

    const nodeValue = {
        id: nodeId,
        width: 100,
        height: 100,
        labels: [
            {
                text: nodeId,
                width: labelWidth,
                height: labelHeight,
            },
        ],
        layoutOptions: {
            'nodeLabels.placement': '[OUTSIDE H_LEFT V_TOP]',
            'portLabels.placement': 'INSIDE'
        },
        ports: [],
        __symbol: null,
    };

    // If is a net component, then it is a single port symbol,
    // so do not enforce the fixed side constraint.

    // For all other symbols/components, enforce this constraint.
    if (!tmpIsNetComponent) {
        // FIXED_ORDER is needed over FIXED_SIDE, so that port.order
        // is taken into consideration too.
        nodeValue.layoutOptions["portConstraints"] = "FIXED_ORDER";
    }

    // If arrange props are set, then use it to generate 
    // the placement of the ports
    const portSides = getPortSide(component.numPins, component.arrangeProps);

    const ports = [];
    
    for (let i = 0; i < portSides.length; i++) {
        const { pinId, side } = portSides[i];

        const pinDef = component.pins.get(pinId);

        if (pinDef) {
            const port = {
                id: `${nodeId}.${pinId}`,
                width: portWidth,
                height: portHeight,
                properties: {},
                labels: []
            }

            if (!tmpIsNetComponent) {
                port.properties = {
                    "port.side": side,
                }

                const pinIdSize = await measureTextSize(pinId.toString(), defaultFont, defaultFontSize);
                const pinNameSize = await measureTextSize(pinDef.name, defaultFont, defaultFontSize);


                port.labels = [
                    {
                        text: pinId.toString(),
                        width: pinIdSize.width,
                        height: pinIdSize.height,
                    }, {
                        text: pinDef.name,
                        width: pinNameSize.width,
                        height: pinNameSize.height,
                    }]
            }

            ports.push(port);
        }
    }

    nodeValue.ports = ports;

    if (tmpIsNetComponent) {
        nodeValue.layoutOptions["portConstraints"] = "FIXED_ORDER";
        const tmpPort = nodeValue.ports[0];
        let tmpPortSide = PortSide.NORTH;

        if (component.parameters.get('net_name') === GlobalNames.gnd) {
            nodeValue.__symbol = 'gnd';
            tmpPortSide = PortSide.NORTH;
        } else {
            nodeValue.__symbol = 'net';
            tmpPortSide = PortSide.SOUTH;
        }

        tmpPort.properties["port.side"] = tmpPortSide;

        // Align port to be vertical instead of horizontal
        tmpPort.width = portHeight;
        tmpPort.height = portWidth;

        nodeValue.width = 50;
        nodeValue.height = 50;
    }

    let displayValue = null;
    if (component.parameters.has('value')) {
        const tmpValue: any = component.parameters.get('value');
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

function getPortSide(numPins: number, arrangeProps: null | Map<string, number[]>): { pinId: number, side: string, order: number }[] {
    // Takes the arrangeProps and determines how to arrange pins in the symbol.

    const result = [];

    if (arrangeProps === null) {
        for (let i = 0; i < numPins; i++) {
            result.push({
                pinId: i + 1,
                side: i % 2 === 0 ? PortSide.WEST : PortSide.EAST,
                order: i + 1,
            });
        }
    } else {
        let counter = numPins;

        for (const [key, items] of arrangeProps) {

            const useItems = [...items];

            let useSide = PortSide.WEST;
            if (key === 'left') {
                useSide = PortSide.WEST;
                useItems.reverse();
            } else if (key === 'right') {
                useSide = PortSide.EAST;
            }

            useItems.forEach(item => {
                result.push({
                    pinId: item,
                    side: useSide,
                    order: counter
                });
                counter--;
            });
        }
    }

    return result;
}

function dumpSequence(sequence: [string, ClassComponent, number][]): void  {
    sequence.forEach(([action, component, number]) => {
        console.log(action, component.instanceName, number);
    });
}

export async function prepareLayout(
    sequence: [string, ClassComponent, number][],
): any {

    // dumpSequence(sequence);

    const tmpNodes = [];
    const tmpEdges = [];

    const addedNodes = [];
    let prevNode = null;
    let prevPin = null;

    let edgeCounter = 0;

    for (let i = 0; i < sequence.length; i++) {
        const [action, component, pin] = sequence[i];

        let useName = component.instanceName;
        if (component._linkID !== undefined) {
            useName = `${component.instanceName}@${component._linkID}`;
        }

        // Add the node if it has not been added before
        if (addedNodes.indexOf(useName) === -1 && !(prevNode === null && action === SequenceAction.To)) {
            const tmpNode = await createNode(useName, component);

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
                sources: [`${prevNode}.${prevPin}`],
                targets: [`${useName}.${pin}`],
            });

            edgeCounter++;
        }

        prevNode = useName;
        prevPin = pin;
    }

    return {
        id: 'root',
        layoutOptions: {
            algorithm: 'layered',
            'portLabels.placement': '[INSIDE]',

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

export enum PortSide {
    WEST = 'WEST',
    EAST = 'EAST',
    SOUTH = 'SOUTH',
    NORTH = 'NORTH'
}
