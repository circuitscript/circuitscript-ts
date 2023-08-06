import ELK, { ElkNode } from 'elkjs';
import { ClassComponent } from './objects/Component';
import { NumericValue } from './objects/ParamDefinition';
import { SequenceAction, SequenceItem } from './objects/ExecutionScope';
import { isLabelComponent, isNetComponent } from './execute';
import { GlobalNames, LayoutDirection, defaultFont, defaultFontSize, portHeight, portWidth } from './globals';
import { measureTextSize } from './sizing';
import { SymbolFactory, SymbolLabel } from './draw_symbols';
import { PinDefinition } from './objects/PinDefinition';

async function createNode(nodeId: string, component: ClassComponent): Promise<any> {
    const tmpIsNetComponent = isNetComponent(component);
    const tmpIsLabelComponent = isLabelComponent(component);

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
    if (!tmpIsNetComponent || (tmpIsNetComponent && tmpIsLabelComponent)) {
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

            if (side === PortSide.WEST || side === PortSide.EAST) {
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

            if (!tmpIsNetComponent || (tmpIsNetComponent && tmpIsLabelComponent)) {
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
    
    if (tmpIsNetComponent && !tmpIsLabelComponent) {
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

        tmpPort.width = portHeight;
        tmpPort.height = portWidth;

        nodeValue.width = symbolSize.width;
        nodeValue.height = symbolSize.height;

    } else if (tmpIsLabelComponent) {
        const netName = component.parameters.get('net_name') as string;
        nodeValue.__symbol = "label";
        nodeValue.__symbolExtra = { 'net_name': netName };

        const { width: labelWidth, height: labelHeight } = await measureTextSize(netName, defaultFont, defaultFontSize);

        const tmpSymbol = SymbolFactory("label") as SymbolLabel;
        tmpSymbol.width = labelWidth;
        tmpSymbol.height = labelHeight;

        const tmpSize = tmpSymbol.size();

        nodeValue.width = tmpSize.width;
        nodeValue.height = tmpSize.height;

        // Force the ports to be at the end of the node.
        // Although the ports are removed, this seems to work still.
        nodeValue.layoutOptions["portAlignment.east"] = "END";
        nodeValue.layoutOptions["portAlignment.west"] = "END";

        // Remove the port
        nodeValue.ports = [];

        // Force entire node to be referenced as a port.
        nodeValue.id = nodeValue.id + ".1";

    } else {
        if (component.displayProp !== null) {
            nodeValue.__symbol = component.displayProp;

            if (nodeValue.__symbol === 'res' || nodeValue.__symbol === 'cap' || nodeValue.__symbol === 'label') {
                const tmpSymbol = SymbolFactory(nodeValue.__symbol);
                const tmpSize = tmpSymbol.size();

                nodeValue.width = tmpSize.width;
                nodeValue.height = tmpSize.height;
            }
        } else {
            // Determine the node height based on the max pin height
            const longestVerticalSide = getLongestVerticalSide(component, portSides);
            nodeValue.height = longestVerticalSide * 40;

            const longestHorizontalSide = getLongestHorizontalSide(component, portSides);
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
        const existingPinIds = Array.from(pins.keys());

        for (const [key, items] of arrangeProps) {

            let useItems;
            if (!Array.isArray(items)){
                useItems = [items];
            } else {
                // Do no mutate original array
                useItems = [...items];
            }

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
                // Only use the pin if it exists!
                if (existingPinIds.indexOf(item) !== -1) {
                    result.push({
                        pinId: item,
                        side: useSide,
                        order: counter
                    });
                    counter--;
                }
            });
        }
    }

    return result;
}

function getLongestVerticalSide(component: ClassComponent, portSides: PortSideItem[]): number {
    return commonGetMostSide(component, portSides, [PortSide.EAST, PortSide.WEST]);
}

function getLongestHorizontalSide(component: ClassComponent, portSides: PortSideItem[]): number {
    return commonGetMostSide(component, portSides, [PortSide.NORTH, PortSide.SOUTH]);
}

function commonGetMostSide(component: ClassComponent, portSides: PortSideItem[], keys: PortSide[]): number {

    const counters: { [key: string]: number } = {};
    keys.forEach(key => {
        counters[key] = 0;
    });

    portSides.forEach(item => {
        const { pinId } = item;
        if (component.pins.has(pinId) && keys.indexOf(item.side) !== -1) {
            counters[item.side] += 1;
        }
    });

    const finalCount = keys.map(item => {
        return counters[item];
    });

    return Math.max.apply(null, finalCount);
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

    sequence = applyLayoutDirection(sequence);
    
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
            // https://eclipse.dev/elk/reference/options/org-eclipse-elk-priority_org-eclipse-elk-layered.html
            tmpNode.layoutOptions["priority"] = sequence.length - i;
            
            tmpNodes.push(tmpNode);
            addedNodes.push(useName);
        }

        // Create the edge, if possible
        if (action === SequenceAction.To && prevNode !== null) {

            const netName = sequence[i][4];

            tmpEdges.push({
                id: `edge_${edgeCounter}`,
                sources: [`${prevNode}.${prevPin}`],
                targets: [`${useName}.${pin}`],
                __netName: netName,

                priority: sequence.length - i,
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

            // So the order of the nodes AND edges in the array are also be considered.
            'considerModelOrder.strategy': 'NODES_AND_EDGES',
            
            // https://eclipse.dev/elk/blog/posts/2023/23-01-09-constraining-the-model.html
            'crossingMinimization.strategy': 'NONE',

            // https://eclipse.dev/elk/reference/options/org-eclipse-elk-layered-crossingMinimization-forceNodeModelOrder.html
            'crossingMinimization.forceNodeModelOrder': 'true',
        },
        children: tmpNodes,
        edges: tmpEdges,
    };
}

function applyLayoutDirection(sequence: SequenceItem[]): SequenceItem[] {
    const newSequence: SequenceItem[] = [];

    for (let i = 0; i < sequence.length; i++) {
        const [action, component, pinId] = sequence[i];

        // If current action is At and the next action is To, then 
        // check if need to swap the order to ensure that the 
        // layout looks graphically ok.
        if (action === SequenceAction.At && i + 1 < sequence.length - 1 && sequence[i + 1][0] === SequenceAction.To) {
            const direction = sequence[i][3];
            if (direction === LayoutDirection.LEFT) {

                const [, nextComponent, nextPinId, , netName] = sequence[i + 1];

                // swap the order of components
                newSequence.push([SequenceAction.At, nextComponent, nextPinId, LayoutDirection.RIGHT]);
                newSequence.push([SequenceAction.To, component, pinId, null, netName]);

                // Skip over the i+1 item.
                i += 1;
            } else {
                newSequence.push(sequence[i]);
            }
        } else {
            // If next item is no a 'to' action, then just add
            // the item to the new sequence.
            newSequence.push(sequence[i]);
        }
    }

    return newSequence;
}

function cleanupEdges(graph){
    const {edges} = graph;

    const tmpNets = new Map<string, Set<string>>();

    edges.forEach(item => {
        if (!tmpNets.has(item.__netName)){
            tmpNets.set(item.__netName, new Set<string>());
        }

        const tmpSet = tmpNets.get(item.__netName);

        // There is only ever 1 source and 1 target
        const source = item.sources[0];
        const target = item.targets[0];

        tmpSet.add(source);
        tmpSet.add(target);
    });

    const newEdges = [];
    let edgeCounter = 0;

    for (const [netName, items] of tmpNets) {
        const tmpArray = Array.from(items);

        if (tmpArray.length > 1) {
            newEdges.push({
                id: `edge_${edgeCounter}`,
                sources: [tmpArray[0]],
                targets: tmpArray.slice(1),
                __netName: netName
            });
        }

        edgeCounter++;
    }

    const newGraph = {
        ...graph,
        edges: edges,
    }

    return newGraph;
}


export async function generateLayout(graph): Promise<ElkNode> {
    const elk = new ELK();
    const result = await elk.layout(graph, { logging: true, measureExecutionTime: true });
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
