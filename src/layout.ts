import ELK, { ElkNode } from 'elkjs';
import { ClassComponent } from './objects/Component';
import { NumericValue } from './objects/ParamDefinition';
import { SequenceAction, SequenceItem } from './objects/ExecutionScope';
import { isNetComponent } from './execute';
import { GlobalNames, LayoutDirection, defaultFont, defaultFontSize, portHeight, portWidth } from './globals';
import { measureTextSize } from './sizing';
import { SymbolFactory } from './draw_symbols';
import { PinDefinition } from './objects/PinDefinition';

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
    const portSides = getPortSide(component.pins, component.arrangeProps);

    const ports = [];

    for (let i = 0; i < portSides.length; i++) {
        const { pinId, side } = portSides[i];

        const pinDef = component.pins.get(pinId);

        if (pinDef) {

            let useWidth = portWidth;
            let useHeight = portHeight;

            if (side === PortSide.WEST || side === PortSide.EAST){
                useWidth = portWidth;
                useHeight = portHeight;
            } else {
                // Must be vertical port
                useWidth = portHeight;
                useHeight = portWidth;
            }

            const port = {
                id: `${nodeId}.${pinId}`,
                width: useWidth,
                height: useHeight,
                properties: {},
                labels: [],

                __pinId: pinId,
            }

            if (!tmpIsNetComponent) {
                port.properties = {
                    "port.side": side,
                }

                const pinNameSize = await measureTextSize(pinDef.name, defaultFont, defaultFontSize);
                port.labels = [
                    {
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
            nodeValue.__symbolExtra = {'name': "GND"}
            tmpPortSide = PortSide.NORTH;
        } else {
            nodeValue.__symbol = 'net';
            nodeValue.__symbolExtra = {'net_name': component.parameters.get('net_name')}
            tmpPortSide = PortSide.SOUTH;
        }

        const tmpSymbol = SymbolFactory(nodeValue.__symbol);
        const symbolSize = tmpSymbol.size();

        tmpPort.properties["port.side"] = tmpPortSide;

        // Align port to be vertical instead of horizontal
        tmpPort.width = portHeight;
        tmpPort.height = portWidth;

        nodeValue.width = symbolSize.width;
        nodeValue.height = symbolSize.height;
    } else {
        if (component.displayProp !== null) {
            nodeValue.__symbol = component.displayProp;

            if (nodeValue.__symbol === 'res' || nodeValue.__symbol == 'cap') {
                const tmpSymbol = SymbolFactory(nodeValue.__symbol);
                const tmpSize = tmpSymbol.size();

                nodeValue.width = tmpSize.width;
                nodeValue.height = tmpSize.height;
            }
        } else {
            // Determine the node height based on the max pin height
            const longestVerticalSide = getLongestVerticalSide(portSides);
            nodeValue.height = longestVerticalSide * 40;

            const longestHorizontalSide = getLongestHorizontalSide(portSides);
            let useWidth = 0;
            if (longestHorizontalSide === 0){
                useWidth = 100; 
            } else {
                useWidth = longestHorizontalSide * 40;
            }

            nodeValue.width = useWidth;
        }
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

type PortSideItem = {
    pinId: number,
    side: string,
    order: number
};

export function getPortSide(pins: Map<number, PinDefinition>, arrangeProps: null | Map<string, number[]>): PortSideItem[] {
    // Takes the arrangeProps and determines how to arrange pins in the symbol.

    const result = [];

    if (arrangeProps === null) {

        let counter = 0;
        for (const [pinId] of pins) {
            result.push({
                pinId,
                side: counter % 2 === 0 ? PortSide.WEST : PortSide.EAST,
                order: counter,
            });
            counter++;
        }

    } else {
        let counter = pins.size;

        for (const [key, items] of arrangeProps) {

            const useItems = [...items];

            let useSide = PortSide.WEST;
            if (key === 'left') {
                useSide = PortSide.WEST;
                useItems.reverse();
            } else if (key === 'right') {
                useSide = PortSide.EAST;
            } else if (key === 'top') {
                useSide = PortSide.NORTH;
            } else if (key === 'bottom') {
                useSide = PortSide.SOUTH;
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

function getLongestVerticalSide(portSides: PortSideItem[]): number {
    const counters = {
        [PortSide.EAST]: 0,
        [PortSide.WEST]: 0,
    }

    portSides.forEach(item => {
        counters[item.side] += 1;
    });

    return Math.max(counters[PortSide.EAST], counters[PortSide.WEST]);
}

function getLongestHorizontalSide(portSides: PortSideItem[]): number {
    const counters = {
        [PortSide.NORTH]: 0,
        [PortSide.SOUTH]: 0,
    }

    portSides.forEach(item => {
        counters[item.side] += 1;
    });

    return Math.max(counters[PortSide.NORTH], counters[PortSide.SOUTH]);
}

function dumpSequence(sequence: SequenceItem[]): void {
    sequence.forEach(item => {
        item = [...item];
        item[1] = item[1].instanceName;
        console.log(item.join(" "));
    });
}

export async function prepareLayout(
    sequence: SequenceItem[],
): any {

    dumpSequence(sequence);
    sequence = applyLayoutDirection(sequence);

    console.log('--');
    console.log('after apply');
    dumpSequence(sequence);

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
            // 'considerModelOrder.strategy': 'PREFER_EDGES',

            // https://eclipse.dev/elk/reference/options/org-eclipse-elk-layered-crossingMinimization-forceNodeModelOrder.html
            // 'crossingMinimization.forceNodeModelOrder': 'true',
        },
        children: tmpNodes,
        edges: tmpEdges,
    };
}

function applyLayoutDirection(sequence: SequenceItem[]): SequenceItem[] {
    const newSequence: SequenceItem[] = [];

    for (let i = 0; i < sequence.length; i++) {
        const [action, component, pinId] = sequence[i];
        if (action === SequenceAction.At) {
            if (i + 1 < sequence.length-1 && sequence[i + 1][0] === SequenceAction.To) {
                const direction = sequence[i][3];
                if (direction === LayoutDirection.LEFT){

                    const [,nextComponent, nextPinId] = sequence[i+1];

                    // swap the order of components
                    newSequence.push([SequenceAction.At, nextComponent, nextPinId, LayoutDirection.RIGHT]);
                    newSequence.push([SequenceAction.To, component, pinId]);

                    // Skip over the i+1 item.
                    i += 1;
                }
            } else {
                // If next item is no a 'to' action, then just add
                // the item to the new sequence.
                newSequence.push(sequence[i]);
            }
        } else {
            newSequence.push(sequence[i]);
        }
    }

    return newSequence;
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

// Port placement, similar to the values passed into ELK
export enum PortSide {
    WEST = 'WEST',
    EAST = 'EAST',
    SOUTH = 'SOUTH',
    NORTH = 'NORTH'
}
