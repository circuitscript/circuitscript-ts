/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Graph, Edge, alg} from '@dagrejs/graphlib';

import { SymbolCustom, SymbolDrawing, SymbolFactory, SymbolGraphic, 
    SymbolCustomModule, SymbolPinDefintion, SymbolPlaceholder, 
    SymbolText, PlaceHolderCommands, SymbolDrawingCommands} from "./draw_symbols.js";
import { ClassComponent } from "./objects/ClassComponent.js";
import { FrameAction, SequenceAction, SequenceItem } from "./objects/ExecutionScope.js";
import { defaultFrameTitleTextSize, defaultGridSizeUnits, FrameType, GlobalNames, 
    ParamKeys, WireAutoDirection } from './globals.js';
import { WireSegment } from './objects/Wire.js';
import { NumericValue } from './objects/ParamDefinition.js';
import { Geometry } from './geometry.js';
import { Net } from './objects/Net.js';
import { Logger } from './logger.js';
import { Frame, FrameParamKeys, FramePlotDirection } from './objects/Frame.js';
import { BoundBox, getBoundsSize, printBounds, resizeBounds, resizeToNearestGrid, roundValue, toNearestGrid } from './utils.js';
import { Direction } from './objects/types.js';
import { PinDefinition } from './objects/PinDefinition.js';
import { milsToMM, UnitDimension } from './helpers.js';

export class LayoutEngine {

    logger: Logger;

    placeSubgraphVersion = 2;

    layoutWarnings: string[] = [];

    showBaseFrame = false;

    constructor(options: { showBaseFrame: boolean } = { showBaseFrame: false }) {
        this.logger = new Logger();

        const { showBaseFrame = false } = options ?? {};

        this.showBaseFrame = showBaseFrame;
    }

    protected print(...params: any[]): void {
        this.logger.add(params.join(' '));
    }

    protected printLevel(level: number, ...params: any[]): void {
        this.logger.add(this.padLevel(level) + params.join(' '));
    }

    protected padLevel(value: number): string {
        const padding = ''.padStart(value * 4, ' ');
        return "[" + value + "]" + padding
    }

    runLayout(
        sequence: SequenceItem[],
        nets: [ClassComponent, pin: number, net: Net][]
    ): SheetFrame[] {
        const logNodesAndEdges = false;
    
        this.print('===== creating graph and populating with nodes =====');
        const {graph, containerFrames } = 
            this.generateLayoutGraph(sequence, nets);
        
        this.print('===== done populating graph =====');
        this.print('');

        if (logNodesAndEdges){
            this.print('===== graph edges =====');
            // dump all edges in the graph
            const allEdges = graph.edges();
            allEdges.forEach(edge => {
                const [nodeId1, pin1, nodeId2, pin2] = graph.edge(edge);
                this.print(nodeId1, 'pin', pin1, '-----', nodeId2, 'pin', pin2);
            });
            this.print('===== end edges =====');
            this.print()

            this.print('===== graph nodes =====');
            const nodes = graph.nodes();
            nodes.forEach(node => {
                this.print(node, graph.node(node));
            });
            this.print('===== end nodes =====');
            this.print('');
        }
        
        const subgraphInfo = this.sizeSubGraphs(graph);

        const dumpSubgraphInfo = true;
        if (dumpSubgraphInfo){
            this.print('===== subgraphs =====');
            subgraphInfo.forEach(item => {
                this.print('first node:', item.firstNodeId, 'bounds:', 
                item.bounds.xmin, item.bounds.ymin, 
                item.bounds.xmax, item.bounds.ymax);
                
                this.print('-- items:', item.components);
            });
        }

        const {elementFrames} = 
            this.placeFrames(graph, subgraphInfo, containerFrames);
        const frameObjects = [...elementFrames, ...containerFrames];

        // Find sheet frames
        const sheetFrames = frameObjects.filter(item => {
            return item.frame.frameType === FrameType.Sheet;
        });

        // If no sheet frames are found, then use the base frame
        if (sheetFrames.length === 0){
            sheetFrames.push(containerFrames[0]);
        }

        const sheetFrameObjects: SheetFrame[] = sheetFrames.map(sheet => {
            const items = this.flattenFrameItems(sheet);
            const components = items.filter(item => item instanceof RenderComponent);
            const wires = items.filter(item => item instanceof RenderWire);
            const textObjects = items.filter(item => item instanceof RenderText);
            const frames = items.filter(item => item instanceof RenderFrame);

            const wireGroups = new Map<string, RenderWire[]>();
            wires.forEach(wire => {
                const { netName } = wire;
                if (!wireGroups.has(netName)) {
                    wireGroups.set(netName, []);
                }

                wireGroups.get(netName).push(wire);
            });

            const { junctions, mergedWires } = this.findJunctions(wireGroups);

            return {
                frame: sheet,
                frames,
                components,
                wires,
                textObjects,
                junctions,
                mergedWires,
            }
        });

        return sheetFrameObjects;
    }

    private flattenFrameItems(frame: RenderFrame):
        (RenderComponent | RenderWire | RenderText | RenderFrame)[] {

        // Find all nested items within this render frame and returns
        // as a single array.
        const items: (RenderComponent | RenderWire | RenderText | RenderFrame)[] = [];

        frame.innerItems.forEach(item => {
            items.push(item);

            if (item instanceof RenderFrame) {
                const inner = this.flattenFrameItems(item);
                items.push(...inner);
            }
        });

        return items;
    }

    findJunctions(wireGroups: Map<string, RenderWire[]>): {
        junctions: RenderJunction[],
        mergedWires: MergedWire[],
    } {
        const junctions: RenderJunction[] = [];

        const mergedWires: MergedWire[] = [];

        for (const [key, wires] of wireGroups) {

            // Create array of all wires with the same net name
            const allLines = wires.map(wire => {
                return wire.points.map(pt => {
                    return {
                        x: wire.x + pt.x,
                        y: wire.y + pt.y,
                    }
                });
            });

            const { intersectPoints, segments } = Geometry.mergeWires(allLines);
            mergedWires.push({
                netName: key,
                segments,
                intersectPoints,
            });

            intersectPoints.forEach(([x, y]) => {
                junctions.push(new RenderJunction(x, y));
            });
        }

        return {
            junctions,
            mergedWires
        }
    }

    placeFrames(graph: Graph, subgraphInfo: SubGraphInfo[],
        frameObjects: RenderFrame[]): {
            elementFrames: RenderFrame[],
            textObjects: RenderText[],
        } {

        // The base/default frame will always be the first element
        const baseFrame = frameObjects[0];
        baseFrame.padding = 0;
        baseFrame.borderWidth = 0;

        if (this.showBaseFrame){
            // Assume A4 for now

            baseFrame.borderWidth = 5;

            // Use A4 size first, with a margin of 400 mils around
            baseFrame.width = 11692 - 400 * 2;
            baseFrame.height = 8267 - 400 * 2;
        }

        baseFrame.x = 0;
        baseFrame.y = 0;

        let textObjects: RenderText[] = [];
        let elementFrames: RenderFrame[] = [];

        baseFrame.bounds = {
            xmin: 0, ymin: 0,
            xmax: 0, ymax: 0,
        }

        if (subgraphInfo.length > 0){
            // Update render frames so that frames consist of only nested frames.
            // Layout is easier, since it only has to consider frames.
            // Subgraphs are wrapped inside a subgraph frame.
            const result =
                this.prepareFrames(graph, subgraphInfo, baseFrame);
            textObjects = result.textObjects;
            elementFrames = result.elementFrames;

            const logFrames = true;
            if (logFrames) {
                this.print('===== dump frames =====');
                this.dumpFrame(baseFrame);
                this.print('===== dump frames =====');
            }

            this.placeAndSizeFrame(baseFrame);
        }
       
        // All items in the frames are now ready for final placement.   
        this.print('===== flatten frame items =====');
        this.applyFrameOffset(baseFrame);
        this.print('===== flatten frame items =====');

        return {
            elementFrames,
            textObjects,
        }
    }

    collectElementFrames(frame: RenderFrame, level = 0): RenderFrame[] {
        // Unwrap subgraph frames within nested frames.

        const innerItems = frame.innerItems as RenderFrame[];

        const frames: RenderFrame[] = [];

        innerItems.forEach(item => {
            if (item.type === RenderFrameType.Elements) {
                frames.push(item);
            } else if (item.type === RenderFrameType.Container) {
                const innerFrames = this.collectElementFrames(item, level + 1);    
                frames.push(...innerFrames);       
            }
        });

        return frames;
    }

    applyFrameOffset(frame: RenderFrame, level = 0): void {
        this.print(level, "".padStart(level * 4), 'frame', frame.x, frame.y);
        const innerItems = frame.innerItems as RenderFrame[];

        innerItems.forEach(innerFrame => {
            if (innerFrame.frame.frameType === FrameType.Sheet){
                // If frame is a sheet, then do not offset by frame position
                innerFrame.x = 0;
                innerFrame.y = 0;
            } else {
                // Translate the subgraph frame by the parent frame's position
                innerFrame.x += frame.x;
                innerFrame.y += frame.y;
            }

            if (innerFrame.type === RenderFrameType.Elements) {
                this.print(level, "".padStart(level * 4), 'element frame',
                    innerFrame.x, innerFrame.y);

                innerFrame.innerItems.forEach(item2 => {
                    item2.x += innerFrame.x - innerFrame.translateX;
                    item2.y += innerFrame.y - innerFrame.translateY;
                });

            } else {
                this.print(level, "".padStart(level * 4), 'container frame',
                    innerFrame.x, innerFrame.y);
                    
                this.applyFrameOffset(innerFrame, level + 1);
            }
        });
    }

    placeAndSizeFrame(frame: RenderFrame, level = 0): void {
        // Recursively walk through the frame's inner items and lay them out
        // depending on their bounds and position in the parent frame.

        const innerFrames = frame.innerItems as RenderFrame[];
        const gridSize = defaultGridSizeUnits;

        let accumX = 0;
        let accumY = 0;

        // This is used to determine the final bounds of this frame
        const boundPoints = [];

        // First pass collects the size of all inner frames
        const frameSizes = innerFrames.map(innerFrame => {
            if (innerFrame.type === RenderFrameType.Elements) {
                // Set translate such that the origin of the frame is at it's 
                // upper left corner.
                innerFrame.bounds = resizeToNearestGrid(
                    innerFrame.bounds, gridSize);

                innerFrame.translateX = innerFrame.bounds.xmin;
                innerFrame.translateY = innerFrame.bounds.ymin;

            } else {
                // If this is a container frame, then apply the same strategy
                // to size the inner items of this frame.
                this.placeAndSizeFrame(innerFrame, level + 1);
            }

            return innerFrame.bounds;
        });

        // Find the largest width (should already be aligned to grid size).
        const maxWidth = Math.max(...frameSizes.map(item => {
            const { width } = getBoundsSize(item);
            return width;
        }));

        let accumRowWidth = 0;
        let titleFrameWidth = null;

        const inRowShouldCenterInnerFrames = true;

        if (frame.direction === FramePlotDirection.Row) {

            // When plot direction is row, then sum all inner frame widths. 
            accumRowWidth = frameSizes.reduce((accum, item, index) => {
                const { width } = getBoundsSize(item);

                if ((frame.innerItems[index] as RenderFrame).containsTitle){
                    // If frame contains title, then skip it for 
                    // the width calculation
                    titleFrameWidth = width;
                    return accum;
                }
                
                return accum + width + 
                    ((index + 1 < frameSizes.length) ? frame.gap: 0);
            }, 0);

        } else {
            accumRowWidth = maxWidth;
        }

        // Always start arranging inner frames (excluding frame with title)
        // from the top left corner.
        const offsetX = frame.padding;
        const offsetY = frame.padding;

        let centeredOffsetX = 0;

        // This is used to determine position of the title in the frame.
        let widthForTitle: number;

        if (titleFrameWidth > accumRowWidth){
            widthForTitle = titleFrameWidth;
        } else {
            widthForTitle = accumRowWidth;
        }
        
        if (frame.direction === FramePlotDirection.Row && 
            inRowShouldCenterInnerFrames &&
            titleFrameWidth !== null && titleFrameWidth > accumRowWidth) {
            
            centeredOffsetX = toNearestGrid(titleFrameWidth / 2 - accumRowWidth / 2, gridSize);
        }

        // Second pass arranges the items and sets the height
        innerFrames.forEach(innerFrame => {
            // Align to nearest grid
            const { width: frameWidth, height: frameHeight }
                = getBoundsSize(innerFrame.bounds);

            if (innerFrame.containsTitle) {
                innerFrame.x = offsetX + accumX + toNearestGrid(widthForTitle / 2 - frameWidth / 2, gridSize);
                innerFrame.y = offsetY + accumY;
                accumY += (frameHeight + frame.gap);

            } else {
                if (frame.direction === FramePlotDirection.Column) {
                    // Align to the center, but also to the nearest grid size.
                    innerFrame.x = offsetX + accumX + toNearestGrid(maxWidth / 2 - frameWidth / 2, gridSize);
                    innerFrame.y = offsetY + accumY;

                    accumY += (frameHeight + frame.gap);

                } else if (frame.direction === FramePlotDirection.Row) {
                    // Align to the top?
                    innerFrame.x = offsetX + centeredOffsetX + accumX;
                    innerFrame.y = offsetY + accumY; //+ toNearestGrid(maxHeight / 2 - frameHeight / 2, gridSize);

                    accumX += (frameWidth + frame.gap);
                }
            }

            boundPoints.push(
                [innerFrame.x, innerFrame.y],
                [innerFrame.x + frameWidth, innerFrame.y + frameHeight]
            );
        });

        // Determine the bounds based on the points. The points should already
        // be aligned to the grid, add the frame padding to expand the bounds correctly.
        const contentsBounds = resizeBounds(getBoundsFromPoints(boundPoints),
            frame.padding);

        // If frame component is specified, then center the contents within
        if (frame.frame.parameters.has(FrameParamKeys.SheetType)){
            const frameComponent = frame.frame.parameters.get
                                (FrameParamKeys.SheetType) as ClassComponent;

            const rects = ExtractDrawingRects(frameComponent.displayProp);
            let frameWidth = 0;
            let frameHeight = 0;

            if (rects[1]) {
                frameWidth = milsToMM(rects[1].width);
                frameHeight = milsToMM(rects[1].height);
            }

            const contentsWidth = contentsBounds.xmax - contentsBounds.xmin;
            const contentsHeight = contentsBounds.ymax - contentsBounds.ymin;

            const frameOffsetX = toNearestGrid((frameWidth - contentsWidth) / 2, gridSize);
            const frameOffsetY = toNearestGrid((frameHeight - contentsHeight) / 2, gridSize);

            innerFrames.forEach(innerFrame => {
                // apply the offset to all the frames
                innerFrame.x += frameOffsetX;
                innerFrame.y += frameOffsetY;
            });

            frame.bounds = {
                xmin: 0,
                ymin: 0,
                xmax: frameWidth,
                ymax: frameHeight
            };
        } else {
            frame.bounds = contentsBounds;
        }
    }

    dumpFrame(frame: RenderFrame, level = 0): void {
        this.print(level, "".padStart(level * 4), 'frame, items:', 
            frame.innerItems.length);

        frame.innerItems.forEach(item => {
            // items must only be of type RenderFrame
            item = item as RenderFrame;
            
            if (item.type === RenderFrameType.Elements) {
                this.print(level, "".padStart(level * 4),
                    'element frame, items:', item.innerItems.map(item => {
                        if (item instanceof RenderComponent) {
                            return item.component.instanceName;
                        } else if (item instanceof RenderWire) {
                            return getWireName(item.id);
                        }
                        return null;
                    }));
            } else {
                this.print(level, "".padStart(level * 4), 'container');
                this.dumpFrame((item as RenderFrame), level + 1);
            }
        });
    }

    prepareFrames(graph: Graph, subgraphInfo: SubGraphInfo[], 
        frame: RenderFrame, level = 0): {
            elementFrames: RenderFrame[],
            textObjects: RenderText[] 
        } {
        
        const ignoreItems: string[] = [];
        const textObjects = [];
        const elementFrames = [];

        frame.innerItems = frame.innerItems.reduce((accum, item) => {
            if (item instanceof RenderFrame) {
                // If this is frame, then go into this frame and wrap it's 
                // elements into element frames.
                const objects = 
                    this.prepareFrames(graph, subgraphInfo, item, level + 1);
                textObjects.push(...objects.textObjects);
                elementFrames.push(...objects.elementFrames);

                accum.push(item);
            } else if (item instanceof RenderComponent){
                const instanceName = item.component.instanceName;

                if (ignoreItems.indexOf(instanceName) === -1) {
                    // Only if not ignored already, then create the elements
                    // frame for the subgraph containing the instance.
                    const subgraph = subgraphInfo.find(item => {
                        return item.components.indexOf(instanceName) !== -1;
                    });

                    if (subgraph !== undefined) {
                        const tmpFrame = new RenderFrame(new Frame(-2), 
                            RenderFrameType.Elements);
                        tmpFrame.subgraphId = instanceName;
                        tmpFrame.innerItems = 
                            subgraph.components.map(instanceName => {
                                const [, component,] = graph.node(instanceName);
                                return component;
                            });

                        // Set the size of the element frame to be the size of 
                        // the subgraph
                        tmpFrame.bounds = subgraph.bounds;
                        ignoreItems.push(...subgraph.components);

                        accum.push(tmpFrame);
                        elementFrames.push(tmpFrame);
                    } else {
                        throw `Could not find subgraph for ${instanceName}`;
                    }
                }
            }

            return accum;
        }, [] as RenderFrame[]);

        // If the frame has a title specified, then this is added as an 
        // element frame.
        if (frame.type === RenderFrameType.Container) {
            const frameObject = frame.frame;
            if (frameObject.parameters.has(FrameParamKeys.Title)) {
                const title = 
                    frameObject.parameters.get(FrameParamKeys.Title) as string;
                
                // Add the element frame containing the text item
                const tmpFrame = new RenderFrame(new Frame(-2),
                    RenderFrameType.Elements);

                // Mark this render frame as containing only the title element,
                // this is used later during inner item placement of the frame.
                tmpFrame.containsTitle = true;

                tmpFrame.subgraphId = title.replace(/\s/g, "_");

                const textObject = new RenderText(title);
                textObject.fontSize = defaultFrameTitleTextSize;
                textObject.fontWeight = 'bold';

                textObject.symbol.refreshDrawing();
                tmpFrame.innerItems.push(textObject);

                const tmpBox = textObject.symbol.drawing.getBoundingBox();
                tmpFrame.bounds = {
                    xmin: tmpBox.start[0],
                    ymin: tmpBox.start[1],
                    xmax: tmpBox.start[0] + tmpBox.width,
                    ymax: tmpBox.start[1] + tmpBox.height
                };

                textObject.x = 0;
                textObject.y = 0;

                // Add as first element
                frame.innerItems.splice(0, 0, tmpFrame);

                this.printLevel(level, frame, 'added text', tmpFrame);

                textObjects.push(textObject);

                // Add frame to the start
                elementFrames.splice(0, 0, tmpFrame);
            }
        }

        return {
            elementFrames,
            textObjects,
        }
    }

    generateLayoutGraph(sequence: SequenceItem[],
        nets: [ClassComponent, pin: number, net: Net][]): {
            graph: Graph,
            containerFrames: RenderFrame[],
         } {
        // Based on the sequence of actions, generate a graph that links
        // the nodes (components and wires)

        let previousNode: string | null = null;
        let previousPin: number | null = null;

        const graph = new Graph({
            directed: false,
            compound: true,
        });

        this.print('sequence length:', sequence.length);

        // This will be used to catch all other components that are not explicitly
        // within a defined frame.
        const baseRenderFrame = new RenderFrame(new Frame(-1));

        const frameStack: RenderFrame[] = [baseRenderFrame];
        const containerFrames: RenderFrame[] = [baseRenderFrame];

        // Based on the sequence steps create all the graph connections first and
        // determine the size of all items
        for (let i = 0; i < sequence.length; i++) {
    
            const action = sequence[i][0];
            let tmpComponent: RenderComponent;

            // Component related actions
            if (action === SequenceAction.At || action === SequenceAction.To) {
                this.print(...sequence[i]);

                // Size all elements first
                const component = sequence[i][1] as ClassComponent;
                const pin = sequence[i][2] as number;

                const tmpInstanceName = component.instanceName;
    
                if (!graph.hasNode(tmpInstanceName)) {
                    this.print('create instance', tmpInstanceName);

                    let { displayProp = null, widthProp = null, 
                        typeProp = null } = component;
                    
                    let tmpSymbol: SymbolGraphic;
    
                    // If it is a gnd net, then use the gnd symbol
                    if (displayProp === null && 
                        component.parameters.get(ParamKeys.net_name) === GlobalNames.gnd) {
                        
                        displayProp = 'gnd';
                    }
    
                    if (displayProp !== null) {
                        if (displayProp instanceof SymbolDrawing){
                            tmpSymbol = new SymbolPlaceholder(displayProp);
                            tmpSymbol.drawing.logger = this.logger;
                            
                        } else if (typeof displayProp === "string"){
                            tmpSymbol = SymbolFactory(displayProp);
                        }
                    } else {
                        const symbolPinDefinitions = generateLayoutPinDefinition(component);

                        if (component.typeProp === 'module'){
                            tmpSymbol = new SymbolCustomModule(symbolPinDefinitions);
                        } else {
                            tmpSymbol = new SymbolCustom(symbolPinDefinitions);
                        }
                    }
    
                    applyComponentParamsToSymbol(component, tmpSymbol);
    
                    // Set rotation of object
                    let didSetAngle = false;

                    if (component.parameters.has('angle')) {
                        didSetAngle = true;
                        tmpSymbol.angle = component.parameters.get('angle') as number;
                    }
   
                    if (component.parameters.has('flipX')){
                        // either 1 or 0
                        tmpSymbol.flipX = 
                            component.parameters.get('flipX') as number; 
                    }

                    if (component.parameters.has('flipY')){
                        // either 1 or 0
                        tmpSymbol.flipY = 
                            component.parameters.get('flipY') as number; 
                    }

                    if (tmpSymbol instanceof SymbolCustom && widthProp){
                        tmpSymbol.bodyWidth = milsToMM(widthProp);
                    }
    
                    if (!didSetAngle && component.parameters.has('_addDirection')){
                        // If there is an _addDirection specified, then the angle
                        // must be updated accordingly. If angle is already set,
                        // then skip this.
                        tmpSymbol.refreshDrawing(false);

                        tmpSymbol.angle = calculateSymbolAngle(
                            tmpSymbol,
                            component.parameters.get('_addPin') as number,
                            component.parameters.get('_addDirection') as string,
                        );
                    }

                    // Draw symbol in memory to determine the size/bounds.
                    tmpSymbol.refreshDrawing();
    
                    const { width: useWidth, height: useHeight } = tmpSymbol.size();

                    tmpComponent = new RenderComponent(component, useWidth, useHeight);
                    tmpComponent.symbol = tmpSymbol;
    
                    // Record the sequence number to determine priority
                    graph.setNode(tmpInstanceName, [RenderItemType.Component, tmpComponent, i]);

                    // All components must belong within a frame.
                    const currentFrame = frameStack[frameStack.length-1];
                    currentFrame && currentFrame.innerItems.push(tmpComponent);
                }
    
                if (action === SequenceAction.To) {
                    this.setGraphEdge(graph, previousNode, tmpInstanceName,
                        makeEdgeValue(previousNode, previousPin, tmpInstanceName, pin, i));
                }
    
                previousNode = tmpInstanceName
                previousPin = pin;
    
            } else if (action === SequenceAction.Wire) {
                // draw wires
                const [, wireId, wireSegments] = 
                    sequence[i] as [SequenceAction.Wire, number, WireSegment[]];

                const wire = new RenderWire(0, 0, wireSegments);
                wire.id = wireId;
                let useNetName = null;

                if (previousNode !== null) {
                    const [prevNodeType, prevNodeItem] = graph.node(previousNode);
                    if (prevNodeType === RenderItemType.Component) {
                        // Find the net of the wire
                        const matchingItem = nets.find(([comp, pin]) => {
                            return comp.instanceName === previousNode && pin === previousPin;
                        });
    
                        useNetName = matchingItem !== undefined ? matchingItem[2].name : null;
    
                    } else if (prevNodeType === RenderItemType.Wire) {
                        useNetName = (prevNodeItem as RenderWire).netName;
                    }
                }
    
                wire.netName = useNetName;
                const wireName = getWireName(wire.id);
    
                // Record the sequence number to determine priority
                graph.setNode(wireName, [RenderItemType.Wire, wire, i]);
    
                // Connect previous node to pin:0 of the wire
                this.setGraphEdge(graph, previousNode, wireName, 
                    makeEdgeValue(previousNode, previousPin, wireName, 0, i));

                previousNode = wireName;
                previousPin = 1;
                
                const wireSegmentsInfo = wireSegments.map(item => {
                    const tmp: {
                        direction: string,
                        value: number,
                        valueXY?: [x: number, y: number],
                        until?: [instanceName: string, pin: number]
                    } = {
                        direction: item.direction,
                        value: item.value,
                    };

                    if (item.valueXY) {
                        tmp.valueXY = item.valueXY;
                    }

                    if (item.until) {
                        tmp.until = [item.until[0].toString(), item.until[1]];
                    }

                    return tmp;
                });

                this.print(SequenceAction.Wire, wireId, 
                    JSON.stringify(wireSegmentsInfo));
                
            } else if (action === SequenceAction.WireJump) {
                this.print(...sequence[i]);
                const wireId = sequence[i][1] as number;
                const wireName = getWireName(wireId);

                let wirePin = 1;

                if (sequence[i].length === 3) {
                    wirePin = sequence[i][2] as number;
                }

                previousNode = wireName;
                previousPin = wirePin;              
            } else if (action === SequenceAction.Frame){
                const [, frameObject, frameAction] = sequence[i];

                if (frameAction === FrameAction.Enter){
                    const prevFrame = frameStack[frameStack.length-1];

                    const newFrame = new RenderFrame(frameObject);

                    if (frameObject.parameters.has(FrameParamKeys.Direction)){
                        newFrame.direction = 
                            frameObject.parameters.get(FrameParamKeys.Direction);
                    }

                    if (frameObject.parameters.has(FrameParamKeys.Padding)){
                        newFrame.padding = 
                            frameObject.parameters.get(FrameParamKeys.Padding);
                    }

                    if (frameObject.parameters.has(FrameParamKeys.Border)){
                        newFrame.borderWidth = 
                            frameObject.parameters.get(FrameParamKeys.Border);
                    }

                    if (frameObject.parameters.has(FrameParamKeys.Width)) {
                        newFrame.width =
                            frameObject.parameters.get(FrameParamKeys.Width);
                    }

                    if (frameObject.parameters.has(FrameParamKeys.Height)) {
                        newFrame.height =
                            frameObject.parameters.get(FrameParamKeys.Height);
                    }

                    containerFrames.push(newFrame);
                    frameStack.push(newFrame);

                    // If the previous frame exists, then add the new frame
                    // into the inner items of the previous frame. This allows
                    // the frame hierarchy to be tracked.
                    prevFrame && prevFrame.innerItems.push(newFrame);

                } else if (frameAction === FrameAction.Exit) {
                    frameStack.pop();
                }
            }
        }

        return {
            graph,
            containerFrames,
        }
    }

    setGraphEdge(graph: Graph, node1: string, node2: string,
        edgeValue: EdgeValue): void {
        graph.setEdge(node1, node2, edgeValue);
    }

    sizeSubGraphs(graph: Graph): SubGraphInfo[] {
        
        // Layouts out all nodes within a subgraph and determines the size
        // of the subgraph.

        const subGraphs = alg.components(graph);
        const subGraphsStarts = [];

        this.print('===== placing subgraphs =====');
        this.print('number of subgraphs: ', subGraphs.length);

        const subgraphInfo: SubGraphInfo[] = [];

        // Find the starting point of the graph
        subGraphs.forEach(innerGraph => {
            // Find node with the lowest sequence number and used 
            // as the starting node

            let smallestNodeIdLevel = Number.POSITIVE_INFINITY;
            let smallestNodeId: string | null = null;

            innerGraph.forEach(nodeId => {
                const [, , sequenceId] = graph.node(nodeId);

                if (sequenceId < smallestNodeIdLevel) {
                    smallestNodeIdLevel = sequenceId;
                    smallestNodeId = nodeId;
                }
            });

            subGraphsStarts.push(smallestNodeId);
        });


        subGraphsStarts.forEach((nodeId, index) => {
            const innerGraph = subGraphs[index];

            this.print('walk and place nodes in subgraph at index', index);
            this.print('starting node', nodeId);

            this.walkAndPlaceGraph(graph, nodeId, innerGraph);

            // Store all render objects to calculate bounds.
            const renderItems: (RenderComponent | RenderText)[] = [];

            const wires: RenderWire[] = [];

            innerGraph.forEach(nodeId => {
                const [nodeType, item,] = graph.node(nodeId);
                if (nodeType === RenderItemType.Component) {
                    renderItems.push(item);
                } else if (nodeType === RenderItemType.Wire) {
                    wires.push(item);
                }
            });

            // Get the existing bounds
            const bounds = getBounds(renderItems, wires, [], []);

            subgraphInfo.push({
                firstNodeId: nodeId,
                components: innerGraph,
                bounds,
            });
        });

        // For each subgraph, find the bounds of the subgraph
        return subgraphInfo;
    }


    walkAndPlaceGraph(graph: Graph, firstNodeId: string, 
        subgraphNodes: string[]): void {
        // Go through all edges in the main graph and for each edge that contains
        // nodes within the subgraph, then try and place the nodes in the subgraph.

        const allEdges = graph.edges();

        const subgraphEdges = allEdges.reduce((accum, edge) => {
            const { v } = edge;
            // If the subgraph nodes v, then the edge is within the subgraph.
            // No need to check w, since w must also be in the subgraph.
            if (subgraphNodes.indexOf(v) !== -1) {
                accum.push(edge);
            }
            return accum;
        }, [] as Edge[]);

        if (this.placeSubgraphVersion === 1){
            this.placeSubgraph(graph, firstNodeId, subgraphEdges);
        } else if (this.placeSubgraphVersion === 2) {
            this.placeSubgraphV2(graph, firstNodeId, subgraphEdges);
        }
    }

    placeSubgraphV2(graph:Graph, firstNodeId: string,
        subgraphEdges: Edge[]): void {
        
        let firstNodePlaced = false;

        // In this strategy, isFloating is used to indicate if the node 
        // has an assigned position. This strategy builds up groups of nodes
        // that share the same origin node. When group of nodes of overlap, they
        // are merged together and will have the same origin node.

        // Stores origin nodes. The earlier the node in this list, the 
        // higher the priority it has to be merged.
        const originNodes: RenderItem[] = [];
        
        // Stores the nodes that are linked to the node origin. The map key is 
        // the instance name of the origin node.
        const originNodeGroups: Map<string, RenderItem[]> = new Map();

        function findOriginNode(node: RenderItem): string | null {
            const keys = Array.from(originNodeGroups.keys());

            for (let i = 0; i < keys.length; i++) {
                const nodesLinkedToOrigin = originNodeGroups.get(keys[i]);
                if (nodesLinkedToOrigin.indexOf(node) !== -1) {
                    return keys[i];
                }
            }

            return null;
        }
 
        if (subgraphEdges.length === 0) {
            // If there is only 1 component in the subgraph, then there
            // will not be any edges. Align the component to the grid first
            const [, node1]: [string, RenderItem] = graph.node(firstNodeId);

            // By default align pin 1 to the grid
            this.placeNodeAtPosition(0, 0, node1, 1);
            return;
        }

        let fixedNode: RenderItem;
        let fixedNodePin: number;

        let floatingNode: RenderItem;
        let floatingNodePin: number;

        subgraphEdges.forEach(edge => {
            const [nodeId1, pin1, nodeId2, pin2]:
                [string, number, string, number] = graph.edge(edge);

            const [, node1]: [string, RenderItem] = graph.node(nodeId1);
            const [, node2]: [string, RenderItem] = graph.node(nodeId2);

            if (nodeId1 === firstNodeId && !firstNodePlaced) {
                this.print('first node placed at origin');
                this.placeNodeAtPosition(0, 0, node1, pin1);
                firstNodePlaced = true;
                node1.isFloating = false;

                originNodes.push(node1);
                originNodeGroups.set(node1.toString(), [node1]);
            }

            this.print('edge:', '[', node1, pin1, node1.isFloating, ']',
                '[', node2, pin2, node2.isFloating, ']');

            if (!node1.isFloating && node2.isFloating) {
                fixedNode = node1;
                fixedNodePin = pin1;

                floatingNode = node2;
                floatingNodePin = pin2;

            } else if (node1.isFloating && !node2.isFloating) {
                fixedNode = node2;
                fixedNodePin = pin2;

                floatingNode = node1;
                floatingNodePin = pin1;

            } else if (node1.isFloating && node2.isFloating) {
                // If both nodes are floating, then set node1 as an origin node
                // and set it as not floating.
                originNodes.push(node1);
                originNodeGroups.set(node1.toString(), [node1]);
                this.print('creating new origin node at', node1);

                this.placeNodeAtPosition(0, 0, node1, pin1);
                node1.isFloating = false;

                fixedNode = node1;
                fixedNodePin = pin1;

                floatingNode = node2;
                floatingNodePin = pin2;
            
            } else if(!node1.isFloating && !node2.isFloating){
                // If both nodes are fixed, then check how to merge them
                const originNode1 = findOriginNode(node1);
                const originNode2 = findOriginNode(node2);

                this.print('both nodes are already placed, comparing origin nodes:', originNode1, originNode2);

                // If have different node origins, then merge them together
                if (originNode1 !== originNode2){
                    // Merge both origin trees
                    this.mergeOriginNodes(
                        node1, pin1, node2, pin2,
                        originNode1, originNode2, originNodes,
                        originNodeGroups,
                    );
                } else {
                    // If have same node, then compare their position
                    const [x1, y1] = getNodePositionAtPin(node1, pin1);
                    const [x2, y2] = getNodePositionAtPin(node2, pin2);
                    if (x1 !== x2 && y1 !== y2) {
                        if (node1 instanceof RenderWire &&
                            node2 instanceof RenderComponent) {

                            const refdes = node2.component.assignedRefDes;
                            this.layoutWarnings.push(`component ${refdes} may not be placed correctly`);
                        }
                    }
                }
            }

            if (fixedNode && floatingNode) {
                this.print('place floating node', floatingNode, 'pin', floatingNodePin,
                    'to', fixedNode, 'pin', fixedNodePin);

                const [x, y] = getNodePositionAtPin(fixedNode, fixedNodePin);
                this.placeNodeAtPosition(x, y, floatingNode, floatingNodePin);
                floatingNode.isFloating = false;

                this.print('set node as not floating:', floatingNode);

                // Find origin of the fixed node and add the floating node
                // into the node origin tree.
                const originNode = findOriginNode(fixedNode);

                const itemsArray = originNodeGroups.get(originNode)!;
                if (itemsArray.indexOf(floatingNode) === -1) {
                    itemsArray.push(floatingNode);
                    this.print('linking node', floatingNode, 'to origin node', originNode);
                } else {
                    this.print('node is alread linked', floatingNode, 'to origin node', originNode);
                }
            }

            [node1, node2].forEach(item => {
                if (item instanceof RenderWire && item.isEndAutoLength()) {
                    const [instance, pin] = item.getEndAuto();
                    const [, targetNode]: [string, RenderItem] =
                        graph.node(instance.instanceName);

                    this.print('wire', item, 'auto length to target:', instance, pin)

                    if (targetNode.isFloating) {
                        throw "Cannot create auto wire with floating node! Wire id: " + item.id + " to node " + instance + " pin " + pin;
                    }

                    // Check that both share the same origin node
                    const targetOriginNode = findOriginNode(targetNode);
                    const itemOriginNode = findOriginNode(item);

                    if (targetOriginNode !== itemOriginNode) {
                        throw "Wire auto length failed. Please specify a fixed wire length."
                    }

                    const [untilX, untilY] = getNodePositionAtPin(targetNode, pin);
                    item.setEndAuto(untilX, untilY);

                    this.print(`set wire auto end at: ${untilX} ${untilY}`)
                }
            });

        });
    }

    mergeOriginNodes(node1: RenderItem, pin1: number, 
        node2: RenderItem, pin2: number,
        originNode1: string, originNode2: string,
        originNodes: RenderItem[],
        originNodeGroups: Map<string, RenderItem[]>): void {

        // Determine the priority of the merge
        const originNode1Index = originNodes.findIndex(item => {
            return item.toString() === originNode1;
        });

        const originNode2Index = originNodes.findIndex(item => {
            return item.toString() === originNode2;
        });

        // The higher index will be merged INTO the lower index, so the 
        // lower index node origin remains.
        let keepOriginNode: string;
        let otherOriginNode: string;

        let fixedNode: RenderItem;
        let fixedNodePin: number;

        let mergedNode: RenderItem;
        let mergedNodePin: number;

        if (originNode1Index < originNode2Index){
            keepOriginNode = originNode1;
            otherOriginNode = originNode2;

            fixedNode = node1;
            fixedNodePin = pin1;

            mergedNode = node2;
            mergedNodePin = pin2;

        } else {
            keepOriginNode = originNode2;
            otherOriginNode = originNode1;

            fixedNode = node2;
            fixedNodePin = pin2;

            mergedNode = node1;
            mergedNodePin = pin1;
        }

        this.print('merging origin node groups, fixed:', keepOriginNode, 
            ', other:', otherOriginNode);

        // Find position at pin of the fixed node, at the node origin
        // that remains.
        const [x, y] = getNodePositionAtPin(fixedNode, fixedNodePin);

        // Get the position of the node's pin relative to the node's origin
        // point. This returns the offset to the node origin.
        const [otherNodeOriginX, otherNodeOriginY] = 
            getNodePositionAtPin(mergedNode, mergedNodePin);

        const offsetX = x - otherNodeOriginX
        const offsetY = y - otherNodeOriginY;

        this.print('offset of other origin:', offsetX, offsetY);

        const otherItemsLinkedToOriginNode = originNodeGroups.get(otherOriginNode);
        this.print('nodes in other origin:' , otherItemsLinkedToOriginNode);

        otherItemsLinkedToOriginNode.forEach(item => {
            this.translateNodeBy(offsetX, offsetY, item);
            // this.print('translate', item, 'to', item.x, item.y);
        });   
        
        // Merge the list of items in other node origin into the node origin
        // that is kept.
        const newList = originNodeGroups.get(keepOriginNode)
            .concat(otherItemsLinkedToOriginNode);

        originNodeGroups.set(keepOriginNode, newList);
        
        // Remove other node origin as a key
        originNodeGroups.delete(otherOriginNode);

        this.print('removed other origin');
        this.print('merge completed');
    }


    /**
     * @deprecated
     */
    placeSubgraph(graph: Graph, firstNodeId: string,
        subgraphEdges: Edge[]): void {

        let firstNodePlaced = false;

        subgraphEdges.forEach(edge => {
            const [nodeId1, pin1, nodeId2, pin2]:
                [string, number, string, number] = graph.edge(edge);

            const [, node1]: [string, RenderItem] = graph.node(nodeId1);
            const [, node2]: [string, RenderItem] = graph.node(nodeId2);

            if (nodeId1 === firstNodeId && !firstNodePlaced) {
                this.print('first node placed at origin');
                this.placeNodeAtPosition(0, 0, node1, pin1);
                firstNodePlaced = true;
                node1.isFloating = false;
            }

            let fixedNode: RenderItem;
            let fixedNodePin: number;

            let floatingNode: RenderItem;
            let floatingNodePin: number;

            this.print('edge:', '[', node1, pin1, node1.isFloating, ']',
                '[', node2, pin2, node2.isFloating, ']');

            if (!node1.isFloating && node2.isFloating) {
                fixedNode = node1;
                fixedNodePin = pin1;

                floatingNode = node2;
                floatingNodePin = pin2;

            } else if (node1.isFloating && !node2.isFloating) {
                fixedNode = node2;
                fixedNodePin = pin2;

                floatingNode = node1;
                floatingNodePin = pin1;

            } else if (node1.isFloating && node2.isFloating) {
                this.print('both nodes are floating', node1, 'pin', pin1,
                    'and', node2, 'pin', pin2);
                node1.floatingRelativeTo.push([pin1, nodeId2, pin2]);
                node2.floatingRelativeTo.push([pin2, nodeId1, pin1]);
            }

            if (fixedNode && floatingNode){
                this.print('place floating node', floatingNode, 'pin', floatingNodePin, 
                    'to', fixedNode, 'pin', fixedNodePin);

                const [x, y] = getNodePositionAtPin(fixedNode, fixedNodePin);
                this.placeNodeAtPosition(x, y, floatingNode, floatingNodePin);
                floatingNode.isFloating = false;

                this.placeFloatingItems(graph, floatingNode);
            }

            [node1, node2].forEach(item => {
                if (item instanceof RenderWire){

                    if (item.isEndAutoLength()){
                        const [instance, pin] = item.getEndAuto();
                        const [, targetNode]:[string, RenderItem] = 
                            graph.node(instance.instanceName);

                        const [untilX, untilY] = getNodePositionAtPin(targetNode, pin);
                        item.setEndAuto(untilX, untilY);
                    }
                } 
            });
        });
    }

    translateNodeBy(offsetX: number, offsetY: number, item: RenderItem): void {
        item.x += offsetX;
        item.y += offsetY;
    }

    placeNodeAtPosition(fromX: number, fromY: number, item: RenderItem, pin: number, depth=0): void {
        if (item instanceof RenderComponent){
            const pinPosition = item.symbol.pinPosition(pin);
            item.x = fromX - pinPosition.x;
            item.y = fromY - pinPosition.y; 

        } else if (item instanceof RenderWire){
            if (pin === 0) { // Start of the wire
                item.x = fromX;
                item.y = fromY;
            } else { // End of wire
                const wireEnd = item.getWireEnd();
                item.x = fromX - wireEnd.x;
                item.y = fromY - wireEnd.y;
            }
        }

        this.print(this.padLevel(depth), 'place', item, 'pin', pin, 'at', item.x, item.y);
    }

    placeFloatingItems(graph: Graph, item: RenderItem, depth = 0): void {
        // Assume that item already has a fixed position
    
        if (depth > 100) {
            throw "Too many levels when placing floating items";
        }

        const { floatingRelativeTo = [] } = item;

        if (floatingRelativeTo.length > 0){

            this.print(this.padLevel(depth), 'place relative to', item);
            this.print(this.padLevel(depth), 'relative to', 
                JSON.stringify(floatingRelativeTo));

            floatingRelativeTo.forEach(entry => {
                const [selfPin, nodeId, pin] = entry;
                const [, tmpNode] = graph.node(nodeId);
        
                if (tmpNode.isFloating) {
                    const [x, y] = getNodePositionAtPin(item, selfPin);
                    this.placeNodeAtPosition(x, y, tmpNode, pin, depth);
                    tmpNode.isFloating = false;
        
                    this.placeFloatingItems(graph, tmpNode, depth + 1);
                } else {
                    this.print(this.padLevel(depth), 'skipping', tmpNode, 'as it is not floating');
                }
            });

            this.print(this.padLevel(depth), '<<< done traversing floating nodes');
        } else {
            this.print(this.padLevel(depth), 'no nodes floating relative to', item);
        }
    }

    printWarnings(): void {
        this.layoutWarnings.forEach(message => {
            console.log('Warning: ' + message);
        });
    }
}


function getNodePositionAtPin(item: RenderItem, pin: number): [x: number, y: number] {
    let x = 0;
    let y = 0;

    if (item instanceof RenderComponent) {
        const pinPosition = item.symbol.pinPosition(pin);
        x = item.x + pinPosition.x;
        y = item.y + pinPosition.y;

    } else if (item instanceof RenderWire) {
        if (pin === 0) {
            x = item.x;
            y = item.y;
        } else {
            const wireEnd = item.getWireEnd();
            x = item.x + wireEnd.x;
            y = item.y + wireEnd.y;
        }
    }

    return [
        roundValue(x), roundValue(y)
    ]
}


function getNeighbours(graph: Graph, nodeIds: string[]): [from: string, to: string][] {
    
    return nodeIds.reduce((accum, nodeId) => {
        const tmp = graph.neighbors(nodeId);
        if (tmp) {
            tmp.forEach(neighborNodeId => {
                accum.push([nodeId, neighborNodeId]);
            });
        }
        return accum;
    }, [] as [from: string, to: string][]);
}

type EdgeValue = [instance1: string, instancePin1: number, 
    instance2: string, instancePin2: number, priority: number];

function makeEdgeValue(instanceName1: string, instancePin1: number, 
        instanceName2: string, instancePin2: number, priority: number)
    : EdgeValue {
    return [instanceName1, instancePin1, instanceName2, instancePin2, priority];
    // return `${instanceName1}:pin:${instancePin1} -- ${instanceName2}:pin:${instancePin2}`;
}

function getWireName(wireId: number): string {
    return 'wire:' + wireId;
}

type RenderItem = RenderComponent | RenderWire | RenderText;

function generateLayoutPinDefinition(component: ClassComponent): SymbolPinDefintion[] {
    const pins = component.pins;
    const symbolPinDefinitions: SymbolPinDefintion[] = [];
    const existingPinIds = Array.from(pins.keys());

    if (component.arrangeProps === null) {
        // Automatically split pins
        for (let i = 0; i < existingPinIds.length; i++) {
            const pinPosition = Math.floor(i/2);
            const pin = pins.get(existingPinIds[i])!;

            symbolPinDefinitions.push({
                side: (i % 2 === 0) ? "left" : "right",
                pinId: existingPinIds[i],
                text: pin.name,
                position: pinPosition,
                pinType: pin.pinType,
            })
        }
    } else {
        const addedPins = [];

        for (const [key, items] of component.arrangeProps) {

            let useItems;
            if (!Array.isArray(items)) {
                useItems = [items];
            } else {
                // Do no mutate original array
                useItems = [...items];
            }

            useItems.forEach(pinId => {
                // Only use the pin if it exists!
                if (existingPinIds.indexOf(pinId) !== -1) {
                    const pin = pins.get(pinId)!;
                    symbolPinDefinitions.push({
                        side: key,
                        pinId: pinId,
                        text: pin.name,
                        position: pin.position,
                        pinType: pin.pinType,
                    });
                    addedPins.push(pinId);
                }
            });
        }
        
        // Make sure all existing pins are added, otherwise throw an error
        const unplacedPins = [];
        existingPinIds.forEach(item => {
            if (addedPins.indexOf(item) === -1){
                unplacedPins.push(item);
            }
        });

        if (unplacedPins.length > 0){
            throw "'arrange' property is defined, but not all pins are specified: " + unplacedPins.join(",");
        }
    }

    return symbolPinDefinitions;
}

export function applyComponentParamsToSymbol(component: ClassComponent,
    symbol: SymbolGraphic): void {
        
    const newMap = new Map(component.parameters);
    if (!newMap.has('refdes')) {
        newMap.set('refdes', component.assignedRefDes ?? "?");
    }

    symbol.componentParams = newMap;
}

function calculateSymbolAngle(symbol: SymbolGraphic,
    pin: number, direction: string): number {

    let directionVector = 0;
    switch (direction) {
        case Direction.Right:
            directionVector = 0;
            break;
        case Direction.Down:
            directionVector = 90;
            break;
        case Direction.Left:
            directionVector = 180;
            break;
        case Direction.Up:
            directionVector = 270;
            break;
    }

    const { angle: pinVector } = symbol.pinPosition(pin);
    const useAngle = directionVector - (pinVector % 360);

    return useAngle;
}

export function getBounds(
    components: (RenderComponent|RenderText)[], 
    wires: RenderWire[], junctions: RenderJunction[], frames: RenderFrame[]): BoundBox{
    // Returns the bounds in mm.
    
    const points = [];

    components.forEach(item => {
        const bbox = item.symbol.drawing.getBoundingBox();

        const [x1, y1] = bbox.start;
        const [x2, y2] = bbox.end;

        points.push([x1 + item.x, y1 + item.y]);
        points.push([x2 + item.x, y2 + item.y]);
    });

    wires.forEach(wire => {
        wire.points.forEach(point => {
            points.push([wire.x + point.x, wire.y + point.y]);
        });
    });

    junctions.forEach(item => {
        points.push([item.x, item.y]);
    });

    frames.forEach(item => {
        const {width, height} = getBoundsSize(item.bounds);
        points.push([item.x, item.y]);
        points.push([item.x + width, item.y + height]);
    })

    return getBoundsFromPoints(points);
}

function getBoundsFromPoints(points: [x: number, y: number][]): BoundBox {
    const xValues = points.map(item => item[0]);
    const yValues = points.map(item => item[1]);

    const xmin = Math.min(...xValues);
    const xmax = Math.max(...xValues);

    const ymin = Math.min(...yValues);
    const ymax = Math.max(...yValues);

    return {
        xmin, xmax, ymin, ymax,
    }
}

export class RenderObject {
    x = -1;
    y = -1;

    isFloating = true;
    floatingRelativeTo: [selfPin: number, nodeId: string, pin: number][] = [];
}


export class RenderWire extends RenderObject {
    id: number;
    segments: WireSegment[] = [];
    points:{x: number, y:number}[] = [];

    // Net name is used to determine if wires
    // can overlap
    netName: string;

    constructor(x: number, y: number, segments: WireSegment[]) {
        super();
        this.x = x;
        this.y = y;
        this.segments = segments;

        this.refreshPoints();
    }

    refreshPoints(): void {
        let tmpX = 0;
        let tmpY = 0;

        const points = [{ x: tmpX, y: tmpY }];

        this.segments.forEach(segment => {
            const { direction, value } = segment;

            let didAddPoint = false;
            let useValue: number;

            if (value instanceof UnitDimension){
                useValue = value.getMM();
            } else {
                useValue = value;
            }

            if (direction === Direction.Down) {
                tmpY += useValue;
            } else if (direction === Direction.Up) {
                tmpY -= useValue;
            } else if (direction === Direction.Left) {
                tmpX -= useValue;
            } else if (direction === Direction.Right) {
                tmpX += useValue;
            } else if (direction === WireAutoDirection.Auto || direction === WireAutoDirection.Auto_) {
                // 'auto' means both x and y. 'auto_' is the same as 'auto', but
                // uses the alternative path to the target.
                const { valueXY = [0, 0] } = segment;

                const tmpPoints = this.getAutoPoints(valueXY, direction);

                tmpPoints.forEach(point => {
                    if (point[0] !== 0 || point[1] !== 0){
                        tmpX += point[0];
                        tmpY += point[1];
                        points.push({ x: tmpX, y: tmpY });
                    }
                });
                didAddPoint = true;
            }

            if(!didAddPoint){
                points.push({ x: tmpX, y: tmpY });
            }
        });

        this.points = points;
    }

    getAutoPoints(value: [x: number, y: number], direction: WireAutoDirection): [dx: number, dy: number][] {
        const valueX = roundValue(value[0]);
        const valueY = roundValue(value[1]);

        const inQuadrant = Geometry.getQuadrant(valueX, valueY);
        const [dx, dy] = [valueX, valueY];

        // Clockwise direction
        if (direction === WireAutoDirection.Auto) {
            switch (inQuadrant) {
                case 0:
                case 2:
                    return [[dx, 0], [0, dy]];
                case 1:
                case 3:
                    return [[0, dy], [dx, 0]];
            }
        } else if (direction === WireAutoDirection.Auto_) {
            switch (inQuadrant) {
                case 0:
                case 2:
                    return [[0, dy], [dx, 0]];
                case 1:
                case 3:
                    return [[dx, 0], [0, dy]];
            }
        }

        return [[0, 0]];
    }

    getWireEnd(): { x: number, y: number } {
        return this.points[this.points.length - 1];
    }

    isEndAutoLength(): boolean {
        if (this.segments.length > 0) {
            // If only direction, then it is an auto length
            return this.segments[this.segments.length - 1].value === null;
        }

        return false;
    }

    getEndAuto(): [instance: ClassComponent, pin: number] {
        if (this.segments.length > 0) {
            return this.segments[this.segments.length - 1].until;
        } else {
            throw "No segments in wire!"
        }
    }

    setEndAuto(untilX: number, untilY: number): void {

        // Find the last accumulated position up to the last item
        const excludeLastSegment = this.segments.slice(0, this.segments.length-1);

        let tmpX = this.x; // Accumulated x and y values
        let tmpY = this.y;

        excludeLastSegment.forEach(segment => {
            const { direction, value } = segment;

            let useValue: number;
            if (value instanceof UnitDimension){
                useValue = value.getMM();
            } else {
                useValue = value;
            }

            if (direction === Direction.Down) {
                tmpY += useValue;
            } else if (direction === Direction.Up) {
                tmpY -= useValue;
            } else if (direction === Direction.Left) {
                tmpX -= useValue;
            } else if (direction === Direction.Right) {
                tmpX += useValue;
            }
        });

        // Based on the last segment direction, determine the
        // value. Since value is set, then the segment will no longer
        // be considered as an 'auto length' segment.
        let useValue = null;
        let valueXY = null;
        const lastSegment = this.segments[this.segments.length-1];

        switch(lastSegment.direction){
            case Direction.Left:
                useValue = tmpX - untilX;
                break;
            case Direction.Right:
                useValue = untilX - tmpX;
                break;
            case Direction.Up:
                useValue = untilY - tmpY;
                break;
            case Direction.Down:
                useValue = tmpY - untilY;
                break;

            case WireAutoDirection.Auto:
            case WireAutoDirection.Auto_:
                // Always assume positive values
                valueXY = [
                    untilX - tmpX,
                    untilY - tmpY,
                ];

                // Set to 0, to mark that auto length
                // calculation has already been done.
                useValue = 0;
                break;
        }

        lastSegment.value = useValue;
        lastSegment.valueXY = valueXY !== null ? valueXY : null;

        this.refreshPoints();
    }

    toString(): string {
        return getWireName(this.id);
    }
}

export type MergedWire = {
    netName: string,
    segments: [x: number, y:number][][],
    intersectPoints: [x: number, y: number, count: number][],
}

export class RenderComponent extends RenderObject {
    // Holds the render information of the component (position)

    component: ClassComponent;
    symbol: SymbolGraphic;

    width: number;
    height: number;

    displaySymbol: string | null = null;

    constructor(component: ClassComponent, width: number, height: number) {
        super();
        this.component = component;
        this.width = width;
        this.height = height;
    }

    doesOverlap(other: RenderComponent): boolean {
        const condition1 = isPointOverlap(this.x, this.y, other);
        const condition2 = isPointOverlap(this.x + this.width, this.y, other);
        const condition3 = isPointOverlap(this.x + this.width, this.y + this.height, other);
        const condition4 = isPointOverlap(this.x, this.y + this.height, other);

        return condition1 || condition2 || condition3 || condition4; 
    }

    toString(): string {
        return "component:" + this.component.instanceName;
    }
}

export class RenderText extends RenderObject {
    symbol: SymbolText;

    _fontSize = 12;
    _fontWeight = 'regular';

    get fontSize (): number {
        return this._fontSize;
    }

    set fontSize(value: number) {
        this._fontSize = value;
        this.symbol.fontSize = value;
    }

    get fontWeight(): string {
        return this._fontWeight;
    }

    set fontWeight(value: string) {
        this._fontWeight = value;
        this.symbol.fontWeight = value;
    }

    constructor(text: string) {
        super();
        this.symbol = new SymbolText(text);
    }
}

export class RenderFrame extends RenderObject {
    bounds: BoundBox | null = null;
    frame: Frame;

    // Store all items in the same array so that the order of frames
    // can be identified.
    innerItems: (RenderComponent | RenderFrame | RenderText)[] = [];
    
    translateX = 0;
    translateY = 0;

    padding = milsToMM(100); // Inner frame padding

    gap = milsToMM(100);     // Spacing between inner frames

    direction = FramePlotDirection.Column;

    borderWidth = 5; //mils

    // If width and height are null, then frame size is determined
    // based on internal contents

    width: number | null = null; // mils
    height: number | null = null; // mils

    size: string | null = null;

    subgraphId = "";

    type: RenderFrameType;

    // If true, then frame only contains text for frame title.
    containsTitle = false;

    constructor(frame: Frame, type: RenderFrameType = RenderFrameType.Container) {
        super();
        this.frame = frame;
        this.type = type;
    }

    toString(): string {
        let name = "";
        if (this.type === RenderFrameType.Container) {
            name = 'container_' + this.frame.frameId;
        } else if (this.type === RenderFrameType.Elements) {
            name = 'elements_' + this.subgraphId;
        }

        return name + ": " + this.x + "," + this.y + " bounds:" + printBounds(this.bounds);
    }
}

export enum RenderFrameType {
    Container = 1,
    Elements = 2, // Holds subgraphs and text.
}

export class RenderJunction {
    x: number;
    y: number;

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }
}

// Stores all render objects referenced in the frame
export type SheetFrame = {
    frame: RenderFrame,
    frames: RenderFrame[], // inner frames

    components: RenderComponent[],
    wires: RenderWire[],
    textObjects: RenderText[],

    junctions: RenderJunction[],
    mergedWires: MergedWire[],
}

export function CalculatePinPositions(component: ClassComponent)
    : Map<number, { x: number; y: number; angle: number; }> {

    const pinPositionMapping = new Map<number, { x: number; y: number; angle: number; }>();

    let tmpSymbol: SymbolGraphic;
    if (component.displayProp !== null
        && component.displayProp instanceof SymbolDrawing) {

        tmpSymbol = new SymbolPlaceholder(component.displayProp);

    } else {
        const symbolPinDefinitions = generateLayoutPinDefinition(component);
        tmpSymbol = new SymbolCustom(symbolPinDefinitions);
    }

    // Force a render of the symbol
    applyComponentParamsToSymbol(component, tmpSymbol);
    tmpSymbol.refreshDrawing();

    const pins = component.pins;

    pins.forEach((value: PinDefinition, key: number) => {
        pinPositionMapping.set(key, tmpSymbol.pinPosition(key));
    });

    return pinPositionMapping;
}

export function ExtractDrawingRects(drawing: SymbolDrawingCommands): { width: number, height: number }[] {
    return drawing.getCommands().filter(item => {
        return (item[0] === PlaceHolderCommands.rect);
    }).map(item => {
        return {
            width: item[1][2],
            height: item[1][3],
        }
    });
}

function isPointOverlap(x: number, y: number, other: RenderComponent): boolean {
    return (x >= other.x && y >= other.y && x <= (other.x + other.width) && y <= (other.y + other.height));
}

enum RenderItemType {
    Wire = 'wire',
    Component = 'component',
}

type SubGraphInfo = {
    firstNodeId: string;
    components: string[];
    bounds: BoundBox;
}

export { BoundBox };
