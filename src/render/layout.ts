/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import graphlib, { Graph, Edge } from '@dagrejs/graphlib';
const { alg } = graphlib;

import { SymbolCustom, SymbolDrawing, SymbolGraphic, 
    SymbolPlaceholder, 
    SymbolText, PlaceHolderCommands, SymbolDrawingCommands,
    SimplePoint} from "./draw_symbols.js";
import { ClassComponent, ComponentUnit } from "../objects/ClassComponent.js";
import { DefaultComponentUnit, defaultFrameTitleTextSize, defaultGridSizeUnits, FrameType, 
    NetGraphicsParams, 
    ParamKeys, WireAutoDirection } from '../globals.js';
import { Wire, WireSegment } from '../objects/Wire.js';
import { Geometry, HorizontalAlign, VerticalAlign } from './geometry.js';
import { Net } from '../objects/Net.js';
import { Logger } from '../logger.js';
import { FixedFrameIds, Frame, FrameParamKeys, FramePlotDirection } from '../objects/Frame.js';
import { areasOverlap, BoundBox, BoundBox2, combineMaps, getBoundsSize, 
    printBounds, resizeBounds, resizeToNearestGrid, 
    toNearestGrid} from '../utils.js';
import { AutoWireFailedError_ } from "../errors.js";
import { ComponentPinNetPair, Direction } from '../objects/types.js';
import { PinDefinition, PinId } from '../objects/PinDefinition.js';
import { milsToMM, UnitDimension } from '../helpers.js';
import { NumericValue, numeric, roundValue } from '../objects/NumericValue.js';
import { generateLayoutPinDefinition, getWireName, RenderItemType } from './graph.js';

export class LayoutEngine {

    logger: Logger;

    layoutWarnings: string[] = [];

    showBaseFrame = false;

    constructor(logger:Logger, options: { showBaseFrame: boolean } = { showBaseFrame: false }) {
        this.logger = logger;

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
        graph: Graph,
        containerFrames: RenderFrame[],
        nets: ComponentPinNetPair[]
    ): SheetFrame[] {
        const renderNets = this.collectRenderNets(nets);
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

        const { elementFrames } =
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
            const renderWires = items.filter(item => item instanceof RenderWire);
            const textObjects = items.filter(item => item instanceof RenderText);
            const frames = items.filter(item => item instanceof RenderFrame);

            const renderWireGroups = new Map<string, RenderWire[]>();
            renderWires.forEach(wire => {
                const { netName } = wire;
                if (!renderWireGroups.has(netName)) {
                    renderWireGroups.set(netName, []);
                }

                renderWireGroups.get(netName).push(wire);
            });

            const { junctions, mergedWires } = 
                this.findJunctions(renderWireGroups, renderNets);

            return {
                frame: sheet,
                frames,
                components,
                wires: renderWires,
                textObjects,
                junctions,
                mergedWires
            }
        });

        return sheetFrameObjects;
    }

    private collectRenderNets(nets: ComponentPinNetPair[]): Map<string, RenderNet> {
        // Find the unique nets and then convert the Net into a 
        // RenderNet object.
        const renderNets = new Map<string, RenderNet>();

        const uniqueNets = new Set<Net>(nets.map(([,,net]) => net));
        uniqueNets.forEach(net => {
            const renderNet: RenderNet = {
                netName: net.toString(),
                net,
            }

            if (net.params.has(NetGraphicsParams.Color)) {
                renderNet.color = net.params.get(NetGraphicsParams.Color);
            }

            if (net.params.has(NetGraphicsParams.LineWidth)) {
                // In mils, convert to mm
                const value = net.params.get(NetGraphicsParams.LineWidth);
                renderNet.lineWidth = milsToMM(value).toNumber();
            }

            if (net.params.has(NetGraphicsParams.Highlight)) {
                renderNet.highlight = 
                    net.params.get(NetGraphicsParams.Highlight);
            }

            if (net.params.has(NetGraphicsParams.HighlightWidth)) {
                renderNet.highlightWidth =
                    milsToMM(net.params.get(NetGraphicsParams.HighlightWidth))
                        .toNumber();
            }

            if (net.params.has(NetGraphicsParams.HighlightOpacity)){
                // 0 to 1
                renderNet.highlightOpacity = 
                    (net.params.get(NetGraphicsParams.HighlightOpacity) as NumericValue)
                        .toNumber();
            }

            renderNets.set(net.toString(), renderNet);
        });

        return renderNets;
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

    private findJunctions(renderWireGroups: Map<string, RenderWire[]>, 
        nets: Map<string, RenderNet>): {
            junctions: RenderJunction[],
            mergedWires: MergedWire[],
        } {
        const junctions: RenderJunction[] = [];

        const mergedWires: MergedWire[] = [];

        const debugSegments = false;

        for (const [netName, renderWires] of renderWireGroups) {
            // Create array of all wires with the same net name
            const allLines = renderWires.map(wire => {
                return wire.points.map(pt => {
                    return {
                        x: wire.x.add(pt.x),
                        y: wire.y.add(pt.y),
                    }
                });
            });

            let renderNet: RenderNet | null = null;
            if (nets.has(netName)) {
                renderNet = nets.get(netName)!;
            }

            if (debugSegments) {
                const tmpSegments = [];
                allLines.forEach(wire => {
                    for (let i = 1; i < wire.length; i++) {
                        const pt1 = wire[i - 1];
                        const pt2 = wire[i];

                        tmpSegments.push([
                            [pt1.x.toNumber(), pt1.y.toNumber()],
                            [pt2.x.toNumber(), pt2.y.toNumber()],
                        ]);
                    }
                });

                // Wire segments are not merged and all segments (even overlaps)
                // are kept.
                mergedWires.push({
                    netName: netName,
                    segments: tmpSegments,
                    intersectPoints: [],
                    net: renderNet,
                });
            } else {
                const { intersectPoints, segments, lines } = Geometry.mergeWires(allLines);
                mergedWires.push({
                    netName: netName,
                    segments,
                    intersectPoints,
                    net: renderNet,
                    lines,
                });

                intersectPoints.forEach(([x, y]) => {
                    junctions.push(
                        new RenderJunction(numeric(x), numeric(y), renderNet));
                });
            }
        }

        return {
            junctions,
            mergedWires
        }
    }

    /** 
     * Goes through all frame objects and handles placement of components/
     * sub frames within.
     */
    private placeFrames(graph: Graph, subgraphInfo: SubGraphInfo[],
        frameObjects: RenderFrame[]): {
            elementFrames: RenderFrame[],
            textObjects: RenderText[],
        } {

        // The base/default frame will always be the first element
        const baseFrame = frameObjects[0];
        baseFrame.padding = numeric(0);
        baseFrame.gap = numeric(defaultGridSizeUnits);
        baseFrame.borderWidth = numeric(0);

        if (this.showBaseFrame) {
            // Assume A4 for now
            baseFrame.borderWidth = numeric(5);

            // Use A4 size first, with a margin of 400 mils around
            baseFrame.width = numeric(11692 - 400 * 2);
            baseFrame.height = numeric(8267 - 400 * 2);
        }

        baseFrame.x = numeric(0);
        baseFrame.y = numeric(0);
        baseFrame.bounds = {
            xmin: 0, ymin: 0,
            xmax: 0, ymax: 0,
        }

        let textObjects: RenderText[] = [];
        let elementFrames: RenderFrame[] = [];

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
            if (item.renderType === RenderFrameType.Elements) {
                frames.push(item);
            } else if (item.renderType === RenderFrameType.Container) {
                const innerFrames = this.collectElementFrames(item, level + 1);    
                frames.push(...innerFrames);       
            }
        });

        return frames;
    }

    /** Goes through all frames and nested frames and determines the final
     *  x and y positions of the elements relative to the absolute origin.
     */
    applyFrameOffset(frame: RenderFrame, level = 0): void {
        this.print(level, "".padStart(level * 4), 'frame', frame.x, frame.y);
        const innerItems = frame.innerItems as RenderFrame[];

        innerItems.forEach(innerFrame => {
            if (innerFrame.frame.frameType === FrameType.Sheet){
                // If frame is a sheet, then there is no offset as the sheet
                // will be placed at the absolute origin.
                innerFrame.x = numeric(0);
                innerFrame.y = numeric(0);
            } else {
                // Translate the subgraph frame by the parent frame's position
                innerFrame.x = innerFrame.x.add(frame.x);
                innerFrame.y = innerFrame.y.add(frame.y);
            }

            if (innerFrame.renderType === RenderFrameType.Elements) {
                this.print(level, "".padStart(level * 4), 'element frame',
                    innerFrame.x, innerFrame.y);

                const diffX = innerFrame.x.sub(innerFrame.translateX);
                const diffY = innerFrame.y.sub(innerFrame.translateY);

                // Calculate the positionof each inner item based on the 
                // parent frame's position and the relative position.
                innerFrame.innerItems.forEach(item => {
                    item.x = item.x.add(diffX);
                    item.y = item.y.add(diffY);
                });

            } else {
                this.print(level, "".padStart(level * 4), 'container frame',
                    innerFrame.x, innerFrame.y);

                this.applyFrameOffset(innerFrame, level + 1);
            }
        });
    }

    /**
     * Recursively walk through the frame's inner items and lay them out
     * depending on their bounds and position in the parent frame.
     */
    private placeAndSizeFrame(frame: RenderFrame, level = 0): void {
        // All inner items are either Container or Element frames.

        if (level > 50){
            throw 'Exceeded placeAndSizeFrame depth limit!';
        }

        this.printLevel(level, `placeAndSizeFrame called`);
        
        const innerFrames = frame.innerItems as RenderFrame[];
        const gridSize = defaultGridSizeUnits;
        
        const frameDirection = frame.direction;
        const isFrameDirectionRow = frameDirection === FramePlotDirection.Row;

        this.printLevel(level, `frame info, id: ${frame.frameId}, direction: ${frameDirection}, virtual: ${frame.virtual}`);

        const frameParams = frame.frame.parameters;

        // Default alignment options
        let hAlign = HorizontalAlign.Center;
        let vAlign = VerticalAlign.Top;
        
        // Load alignment parameters.
        if (frameParams.has(FrameParamKeys.HorizontalAlign)){
            hAlign = 
                frameParams.get(FrameParamKeys.HorizontalAlign) as HorizontalAlign;
        }

        if (frameParams.has(FrameParamKeys.VerticalAlign)){
            vAlign = 
                frameParams.get(FrameParamKeys.VerticalAlign) as VerticalAlign;
        }

        if (frame.overwriteAlignParamsForTitleLayout){
            // This is a frame with title, do not apply the alignment params
            // in the direct children.

            hAlign = HorizontalAlign.Center;
            vAlign = VerticalAlign.Top;
        }

        this.printLevel(level, `align params: ${hAlign} ${vAlign}`);

        // This is used to determine the final bounds of this frame
        // const boundPoints: [x: number, y: number][] = [];

        this.printLevel(level, `size inner frames, length: ${innerFrames.length}`);

        // First pass collects the size of all inner frames
        for (const innerFrame of innerFrames) {
            if (innerFrame.renderType === RenderFrameType.Elements) {

                if (!innerFrame.didResize){
                    // Set translate such that the origin of the frame is at it's 
                    // upper left corner.
                    innerFrame.bounds = resizeToNearestGrid(
                        innerFrame.bounds!, gridSize);
                    innerFrame.didResize = true;
                }

                // Bounds calculation does not include any padding.

                innerFrame.translateX = innerFrame.bounds.xmin;
                innerFrame.translateY = innerFrame.bounds.ymin;

                this.printLevel(level, `element frame, id: ${innerFrame.frameId}, bounds: ${JSON.stringify(innerFrame.bounds)}`);

            } else {
                // If this is a container frame, then apply the same strategy
                // to size the inner items of this frame.
                this.placeAndSizeFrame(innerFrame, level + 1);
            }
        }

        this.printLevel(level, 'done sizing inner frames');

        let frameWidth = numeric(0);
        let frameHeight = numeric(0);

        const avoidAreas: BoundBox2[] = [];

        if (frameParams.has(FrameParamKeys.SheetType)) {
            const frameComponent = frameParams.get
                (FrameParamKeys.SheetType) as ClassComponent;

            const frameComponentUnit = frameComponent.getUnit();
            const frameDrawing = (frameComponentUnit.displayProp as SymbolDrawingCommands);

            // Variables may be accessible by the drawing itself
            frameDrawing.variables = combineMaps(frameComponent.parameters,
                frameParams);

            // The first rect (rect[0]) is the actual dimensions of the 
            // sheet (A4, A5, etc.). The second rect (rect[1]) is the dimensions
            // of the drawable area within the sheet.
            const rects = ExtractDrawingRects(frameDrawing);

            // The drawable area for components, etc.
            const drawableRect = rects.find(
                rect => rect.className === 'plot-area');

            // This is needed to offset the drawing areas
            let frameMinX = numeric(0);
            let frameMinY = numeric(0);

            if (drawableRect) {
                frameMinX = milsToMM(drawableRect.x);
                frameMinY = milsToMM(drawableRect.y);
                frameWidth = milsToMM(drawableRect.width);
                frameHeight = milsToMM(drawableRect.height);
            }

            // This is the title frame, keep out area for components
            const infoAreaRect = rects.filter(
                rect => rect.className === 'keepout-area');

            infoAreaRect.forEach(area => {
                const x1 = area.x;
                const y1 = area.y;
                const x2 = area.x.add(area.width);
                const y2 = area.y.add(area.height);

                avoidAreas.push([
                    milsToMM(x1).sub(frameMinX).toNumber(),
                    milsToMM(y1).sub(frameMinY).toNumber(),
                    milsToMM(x2).sub(frameMinX).toNumber(),
                    milsToMM(y2).sub(frameMinY).toNumber(),
                ]);
            });

            // If no valign parameter was set, then change default to 
            // middle fo the sheet.
            if (!frameParams.has(FrameParamKeys.VerticalAlign)){
                vAlign = VerticalAlign.Center;
            }

        } else {
            // If not sheet frame, then check if width and height is defined
            if (frame.width !== null) {
                frameWidth = frame.width;
            }
            if (frame.height !== null) {
                frameHeight = frame.height;
            }
        }

        // if (frame.frame.parameters.get('id')){
        //     const idParam = frame.frame.parameters.get('id') as NumericValue;
        //     if (idParam.toNumber() === 100){
        //         console.log('stop here');
        //     }
        // }

        const innerFramesWithoutTitle = innerFrames.filter(item => !item.containsTitle);

        this.printLevel(level, `split into lines, width: ${frameWidth.toNumber()} height: ${frameHeight.toNumber()}, padding: ${frame.padding.toNumber()}, gap: ${frame.gap.toNumber()}, direction: ${frameDirection}`);

        const frameLines = SplitIntoLines(
            frameWidth, frameHeight, frame.padding, frame.gap, frameDirection,
            innerFramesWithoutTitle, avoidAreas
        );

        this.printLevel(level, `frame lines: ${frameLines.length}`);

        if (frameLines.length > 1){
            this.printLevel(level, `split lines to containers`);

            // If there are multiple lines, need to split them up again.
            const newInnerFrames: RenderFrame[] = [];

            for (const line of frameLines) {
                const container = RenderFrame.createContainer(frame.gap);
                container.innerItems = [...line];
                container.direction = frameDirection;

                container.frame.parameters.set(FrameParamKeys.HorizontalAlign, hAlign);
                container.frame.parameters.set(FrameParamKeys.VerticalAlign, vAlign);

                if (isFrameDirectionRow){
                    if (frameWidth.toNumber() !== 0){
                        container.width = frameWidth.sub(frame.padding.mul(2));
                    }

                    // Set height to the largest height of the inner items
                    const itemHeights = container.innerItems.map(frame => {
                        const bounds = (frame as RenderFrame).bounds!;
                        return (bounds.ymax - bounds.ymin);
                    });

                    const maxHeight = Math.max(...itemHeights);
                    container.height = numeric(maxHeight);

                    this.printLevel(level, `set container size w: ${container.width}, h: ${container.height}`);

                } else {
                    if (frameHeight.toNumber() !== 0){
                        container.height = frameHeight.sub(frame.padding.mul(2));
                    }
                }

                newInnerFrames.push(container);
            }

            const container = RenderFrame.createContainer(frame.gap);
            container.direction = isFrameDirectionRow ? FramePlotDirection.Column : FramePlotDirection.Row;
            container.innerItems = newInnerFrames;

            frame.innerItems = [container];
            
            // Size and place the inner frames.
            this.placeAndSizeFrame(frame, level + 1);
        } else {
            // If only one line, then place it
            let accumValue = frame.padding.copy();
            const bounds: [x: number, y: number][] = [];

            for (const innerFrame of innerFrames) {
                const { width: innerFrameWidth, height: innerFrameHeight }
                    = getBoundsSize(innerFrame.bounds!);

                if (isFrameDirectionRow) {
                    innerFrame.x = accumValue.copy();
                    innerFrame.y = frame.padding.copy();
                    accumValue = accumValue.add(innerFrameWidth).add(frame.gap);
                } else {
                    innerFrame.x = frame.padding.copy();
                    innerFrame.y = accumValue.copy();
                    accumValue = accumValue.add(innerFrameHeight).add(frame.gap);
                }

                bounds.push(
                    [innerFrame.x.toNumber(), innerFrame.y.toNumber()],
                    [
                        innerFrame.x.add(innerFrameWidth).toNumber(),
                        innerFrame.y.add(innerFrameHeight).toNumber(),
                    ]
                )
            }

            const frameInnerBounds = getBoundsFromPoints(bounds);

            // Expands the bounds by padding size.
            const contentsPaddedBounds = resizeBounds(frameInnerBounds, frame.padding.toNumber());

            const contentsPaddedWidth = roundValue(contentsPaddedBounds.xmax - contentsPaddedBounds.xmin).toNumber();
            const contentsPaddedHeight = roundValue(contentsPaddedBounds.ymax - contentsPaddedBounds.ymin).toNumber();

            const contentsWidth = roundValue(frameInnerBounds.xmax - frameInnerBounds.xmin).toNumber();
            const contentsHeight = roundValue(frameInnerBounds.ymax - frameInnerBounds.ymin).toNumber();

            if (frameWidth.toNumber() === 0) {
                frameWidth = numeric(contentsPaddedWidth);
            }

            if (frameHeight.toNumber() === 0) {
                frameHeight = numeric(contentsPaddedHeight);
            }

            frame.bounds = {
                xmin: contentsPaddedBounds.xmin,
                xmax: contentsPaddedBounds.xmin + frameWidth.toNumber(),

                ymin: contentsPaddedBounds.ymin,
                ymax: contentsPaddedBounds.ymin + frameHeight.toNumber(),
            }

            this.printLevel(level, `alignment h: ${hAlign}, v: ${vAlign}`);

            // Without the padding
            const tmpFrameWidth = frameWidth.sub(frame.padding.mul(2));
            const tmpFrameHeight = frameHeight.sub(frame.padding.mul(2));

            this.printLevel(level, `inner frame size, width: ${tmpFrameWidth}, height: ${tmpFrameHeight}`);

            let offsetX = 0;
            let offsetY = 0;

            if (isFrameDirectionRow){
                // Main axis - Offset for all items.
                switch (hAlign) {
                    case HorizontalAlign.Left:
                        offsetX = 0;
                        break;
                    case HorizontalAlign.Center:
                        offsetX = toNearestGrid(
                            tmpFrameWidth.sub(contentsWidth).div(2).toNumber(), gridSize);
                        break;
                    case HorizontalAlign.Right:
                        offsetX = toNearestGrid(
                            tmpFrameWidth.sub(contentsWidth).toNumber(), gridSize
                        );
                        break;
                }

                offsetX = roundValue(offsetX).toNumber();
                
                // Default for vertical is align to top.
                offsetY = 0;

                for (const innerFrame of innerFrames) {
                    const { height: innerFrameHeight }
                        = getBoundsSize(innerFrame.bounds!);

                    // For this case, then have to use the innerFrame's height
                    // to determine the offsetY.
                    if (vAlign === VerticalAlign.Center) {
                        offsetY = toNearestGrid(
                            tmpFrameHeight.sub(innerFrameHeight).div(2).toNumber(), gridSize);
                    } else if (vAlign === VerticalAlign.Bottom) {
                        offsetY = toNearestGrid(
                            tmpFrameHeight.sub(innerFrameHeight).toNumber(), gridSize);
                    }

                    offsetY = roundValue(offsetY).toNumber();

                    innerFrame.x = innerFrame.x.add(offsetX);
                    innerFrame.y = innerFrame.y.add(offsetY);
                }

            } else {
                // Main axis
                switch(vAlign){
                    case VerticalAlign.Top:
                        offsetY = 0;
                        break;
                    case VerticalAlign.Center:
                        offsetY = toNearestGrid(
                            tmpFrameHeight.sub(contentsHeight).div(2).toNumber(), gridSize);
                        break;
                    case VerticalAlign.Bottom:
                        offsetY = toNearestGrid(
                            tmpFrameHeight.sub(contentsHeight).toNumber(), gridSize
                        );
                        break;
                }

                // Default for horizontal is align to left.
                offsetX = 0;
                offsetY = roundValue(offsetY).toNumber();

                // Offset all inner frames.
                for(const innerFrame of innerFrames){

                    const { width: innerFrameHeight }
                        = getBoundsSize(innerFrame.bounds!);

                    // For this case, then have to use the innerFrame's width
                    // to determine the offsetY.
                    if (hAlign === HorizontalAlign.Center) {
                        offsetX = toNearestGrid(
                            tmpFrameWidth.sub(innerFrameHeight).div(2).toNumber(), gridSize);
                    } else if (hAlign === HorizontalAlign.Right){
                        offsetX = toNearestGrid(
                            tmpFrameWidth.sub(innerFrameHeight).toNumber(), gridSize);
                    }

                    offsetX = roundValue(offsetX).toNumber();
                        
                    innerFrame.x = innerFrame.x.add(offsetX);
                    innerFrame.y = innerFrame.y.add(offsetY);
                }
            }
        }

        return;
    }

    dumpFrame(frame: RenderFrame, level = 0): void {
        this.print(level, "".padStart(level * 4), 'frame, items:', 
            frame.innerItems.length);

        frame.innerItems.forEach(item => {
            // items must only be of type RenderFrame
            item = item as RenderFrame;
            
            if (item.renderType === RenderFrameType.Elements) {
                this.print(level, "".padStart(level * 4),
                    '- element frame, items:', item.innerItems.map(item => {
                        if (item instanceof RenderComponent) {
                            return item.component.instanceName;
                        } else if (item instanceof RenderWire) {
                            return getWireName(item.id);
                        }
                        return null;
                    }));
            } else {
                this.print(level, "".padStart(level * 4), '- container');
                this.dumpFrame((item as RenderFrame), level + 1);
            }
        });
    }

    /** 
     * Prepare render frame objects for placement. Components will be 
     * wrapped within element frames to simplify the frame placement flow.
     * At the same time, extract all frame and text objects within the frames 
     * and sub-frames.
     */
    private prepareFrames(graph: Graph, subgraphInfo: SubGraphInfo[], 
        frame: RenderFrame, level = 0): {
            elementFrames: RenderFrame[],
            textObjects: RenderText[] 
        } {
        
        const ignoreItems: string[] = [];
        const textObjects: RenderText[] = [];
        const elementFrames: RenderFrame[] = [];

        frame.innerItems = frame.innerItems.reduce((accum, item) => {
            if (item instanceof RenderFrame) {
                // If this is frame, wrap it's inner items within an 
                // element frame.
                const objects = 
                    this.prepareFrames(graph, subgraphInfo, item, level + 1);
                textObjects.push(...objects.textObjects);
                elementFrames.push(...objects.elementFrames);

                accum.push(item);
            } else if (item instanceof RenderComponent){
                const { instanceName } = item.component.getUnit(item.unitId);

                // Only if not ignored already, then create the elements
                // frame for the subgraph containing the instance.
                if (ignoreItems.indexOf(instanceName) === -1) {
                    
                    const withinSubgraph = subgraphInfo.find(subgraphInfo => {
                        return subgraphInfo.components.indexOf(instanceName) !== -1;
                    });

                    if (withinSubgraph !== undefined) {
                        const tmpFrame = new RenderFrame(
                            new Frame(FixedFrameIds.FrameIdNotUsed), 
                            RenderFrameType.Elements);
                        tmpFrame.subgraphId = instanceName;
                        tmpFrame.innerItems = 
                            withinSubgraph.components.map(instanceName => {
                                const [, component,] = graph.node(instanceName);
                                return component;
                            });

                        // Set the size of the element frame to be the size of 
                        // the subgraph
                        tmpFrame.bounds = withinSubgraph.bounds;
                        ignoreItems.push(...withinSubgraph.components);

                        accum.push(tmpFrame);
                        elementFrames.push(tmpFrame);
                    } else {
                        throw `Could not find subgraph for ${instanceName}`;
                    }
                }
            }

            return accum;
        }, [] as RenderFrame[]);

        this.checkAddFrameTitle(frame, elementFrames, textObjects, level);

        return {
            elementFrames,
            textObjects,
        }
    }

    /** If frame type is container and a title is specified, then add 
     * an element frame to contain the title text object.
     */
    private checkAddFrameTitle(frame: RenderFrame, 
        elementFrames: RenderFrame[], textObjects: RenderText[], level: number): void {
        
        if (frame.renderType !== RenderFrameType.Container){
            return;
        }

        // If the frame has a title specified, then this is added as an 
        // element frame.
        const frameObject = frame.frame;
        const frameParams = frame.frame.parameters;

        // Do not draw title if this is a sheet frame
        const isSheetFrame = frameObject.frameType === FrameType.Sheet;

        if (frameParams.has(FrameParamKeys.Title) && !isSheetFrame) {
            const title = 
                frameParams.get(FrameParamKeys.Title) as string;

            const fontSize = 
                (frameParams.get(FrameParamKeys.FontSize) as NumericValue) ?? numeric(defaultFrameTitleTextSize);

            const isBold =
                (frameParams.get(FrameParamKeys.Bold) as boolean) ?? true;

            const isItalic =
                (frameParams.get(FrameParamKeys.Italic) as boolean) ?? false;

            const titleColor =
                (frameParams.get(FrameParamKeys.Color) as string) ?? null;
  
            // Add the element frame containing the text item
            const titleFrame = new RenderFrame(
                new Frame(FixedFrameIds.FrameIdNotUsed),
                RenderFrameType.Elements);

            // Mark this render frame as containing only the title element,
            // this is used later during inner item placement of the frame.
            titleFrame.containsTitle = true;

            titleFrame.subgraphId = title.replace(/\s/g, "_");

            const textObject = new RenderText(title);
            textObject.fontSize = fontSize;
            textObject.fontWeight = isBold ? 'bold': 'regular';
            textObject.fontStyle = isItalic ? 'italic': 'normal';
            
            if (titleColor !==null){
                textObject.color = titleColor;
            }

            textObject.x = numeric(0);
            textObject.y = numeric(0);

            textObject.symbol.refreshDrawing();
            titleFrame.innerItems = [textObject];

            const tmpBox = textObject.symbol.drawing.getBoundingBox();
            const tmpBounds = {
                xmin: tmpBox.start[0],
                ymin: tmpBox.start[1],
                xmax: tmpBox.start[0] + tmpBox.width,
                ymax: tmpBox.start[1] + tmpBox.height
            };

            titleFrame.bounds = resizeToNearestGrid(tmpBounds,
                defaultGridSizeUnits);
            titleFrame.didResize = true;

            const titleFrameContainer = RenderFrame.createContainer(numeric(0));
            titleFrameContainer.innerItems = [titleFrame];

            if (frameParams.has(FrameParamKeys.TitleAlign)) {
                const alignValue = frameParams.get(FrameParamKeys.TitleAlign);
                titleFrameContainer.frame.parameters.set(FrameParamKeys.HorizontalAlign, alignValue);
            }

            // If there is a title, then re-wrap the entire frame as a 
            // column layout, where the title element is the first item
            // the remaining items will be in a container in the second
            // element in the column layout.

            const container = RenderFrame.createContainer(frame.gap);
            container.direction = frame.direction;
            container.innerItems = [...frame.innerItems];

            let hAlign = HorizontalAlign.Center;
            let vAlign = VerticalAlign.Center;
            if (frameParams.has(FrameParamKeys.HorizontalAlign)){
                hAlign = 
                    frameParams.get(FrameParamKeys.HorizontalAlign) as HorizontalAlign;
            }

            if (frameParams.has(FrameParamKeys.VerticalAlign)){
                vAlign = 
                    frameParams.get(FrameParamKeys.VerticalAlign) as VerticalAlign;
            }
                
            // Make sure that container take sall the properties of the frame.
            container.frame.parameters.set(FrameParamKeys.HorizontalAlign, hAlign);
            container.frame.parameters.set(FrameParamKeys.VerticalAlign, vAlign);

            const columnLayoutContainer = RenderFrame.createContainer(numeric(defaultGridSizeUnits));
            columnLayoutContainer.direction = FramePlotDirection.Column;
            columnLayoutContainer.innerItems = [
                titleFrameContainer,
                container,
            ];

            // columnLayoutContainer.borderWidth = numeric(1);
            // container.borderWidth = numeric(1);
            // container.borderColor = 'red';

            const frameWidth = frame.width ?? numeric(0);
            if (frameWidth.toNumber() !== 0) {
                columnLayoutContainer.width = frameWidth.sub(frame.padding.mul(2));
                container.width = columnLayoutContainer.width.copy();
                titleFrameContainer.width = columnLayoutContainer.width.copy();
            }

            const frameHeight = frame.height ?? numeric(0);
            if (frameHeight.toNumber() !== 0) {
                columnLayoutContainer.height = frameHeight.sub(frame.padding.mul(2));

                const { height: titleFrameHeight } = getBoundsSize(titleFrame.bounds);

                // Container height depends on title height too.
                container.height = columnLayoutContainer.height
                    .sub(titleFrameHeight)
                    .sub(columnLayoutContainer.gap);
            }

            frame.innerItems = [columnLayoutContainer];

            // Set flag, so that this frame's alignment parameters will
            // be overwritten.
            frame.overwriteAlignParamsForTitleLayout = true;
            columnLayoutContainer.overwriteAlignParamsForTitleLayout = true;

            this.printLevel(level, frame, 'added text', titleFrame);

            textObjects.push(textObject);

            // Add frame to the start
            elementFrames.splice(0, 0, titleFrame);
        }
    }

    /** Lays out nodes within a subgraph and determines the size of the subgraphs */
    private sizeSubGraphs(graph: Graph): SubGraphInfo[] {
        // Gets all the subgraphs within the circuit graph. Subgraphs are 
        // standalone graphs.
        const subGraphs = alg.components(graph);
        const subGraphsStarts: string[] = [];

        this.print('===== placing subgraphs =====');
        this.print('number of subgraphs: ', subGraphs.length);

        const subgraphInfo: SubGraphInfo[] = [];

        // Find the starting point of the graph
        subGraphs.forEach(subGraph => {
            // Find node with the lowest sequence number and used 
            // as the starting node

            let smallestNodeIdLevel = Number.POSITIVE_INFINITY;
            let smallestNodeId = "";

            subGraph.forEach(nodeId => {
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


    /**
     * Go through all edges in the main graph and for each edge that contains
     * nodes within the subgraph, then try and place the nodes in the subgraph.
     */
    private walkAndPlaceGraph(graph: Graph, firstNodeId: string, 
        subgraphNodes: string[]): void {
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

        this.placeSubgraphV2(graph, firstNodeId, subgraphEdges);
    }

    private placeSubgraphV2(graph: Graph, firstNodeId: string,
        subgraphEdges: Edge[]): void {

        // It is assumed that subgraph edges array is defined in the order
        // that the edges should be added onto the graph.

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

            // By default align pin first pin of the component unit to the grid.
            let defaultPin = new PinId(1);
            if (node1 instanceof RenderComponent) {
                const unitId = node1.unitId;
                const componentUnit = node1.component.getUnit(unitId);
                // Get the first pin
                defaultPin = componentUnit.pinsFlat[0].id;
            }

            this.placeNodeAtPosition(numeric(0), numeric(0), node1, defaultPin);
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

                this.placeNodeAtPosition(numeric(0), numeric(0), node1, pin1);
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

                    if (!x1.eq(x2) && !y1.eq(y2)) {
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
                    const [component, pin] = item.getEndAuto();
                    const instance = component.getUnitForPin(pin);
                    
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
                        throw new AutoWireFailedError_(
                            "Wire auto length failed. Please specify a fixed wire length.", item.wire);
                    }

                    const [untilX, untilY] = getNodePositionAtPin(targetNode, pin);
                    item.setEndAuto(untilX, untilY);

                    this.print(`set wire auto end at: ${untilX} ${untilY}`)
                }
            });

            this.print('----');
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

        const offsetX = x.sub(otherNodeOriginX);
        const offsetY = y.sub(otherNodeOriginY);

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

    translateNodeBy(offsetX: number, offsetY: number, item: RenderItem): void {
        item.x = item.x.add(offsetX);
        item.y = item.y.add(offsetY);
    }

    placeNodeAtPosition(fromX: NumericValue, fromY: NumericValue, 
        item: RenderItem, pin: PinId, depth=0): void {
        
        if (item instanceof RenderComponent){
            const pinPosition = item.symbol.pinPosition(pin);
            item.x = fromX.sub(pinPosition.x);
            item.y = fromY.sub(pinPosition.y); 

        } else if (item instanceof RenderWire){
            if (pin.getValue() === 0) { // Start of the wire
                item.x = fromX;
                item.y = fromY;
            } else { // End of wire
                const wireEnd = item.getWireEnd();
                item.x = fromX.sub(wireEnd.x);
                item.y = fromY.sub(wireEnd.y);
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


function getNodePositionAtPin(item: RenderItem, pin: number): [x: NumericValue, y: NumericValue] {
    let x = numeric(0);
    let y = numeric(0);

    if (item instanceof RenderComponent) {
        const pinPosition = item.symbol.pinPosition(pin);
        x = item.x.add(pinPosition.x);
        y = item.y.add(pinPosition.y);

    } else if (item instanceof RenderWire) {
        if (pin === 0) {
            x = item.x;
            y = item.y;
        } else {
            const wireEnd = item.getWireEnd();
            x = item.x.add(wireEnd.x);
            y = item.y.add(wireEnd.y);
        }
    }

    return [
        roundValue(x), roundValue(y)
    ]
}

type RenderItem = RenderComponent | RenderWire | RenderText;

export function applyComponentParamsToSymbol(componentUnit: ComponentUnit,
    symbol: SymbolGraphic): void {

    const { widthProp = null, heightProp = null } = componentUnit;
    
    const newMap = new Map(componentUnit.parameters);

    const ignoreParams = [
        ParamKeys.angle,
        ParamKeys.flip,
        ParamKeys.flipX,
        ParamKeys.flipY,
    ];

    const parentParams = componentUnit.parent.parameters;
    parentParams.forEach((value, key) => {
        // copy all params except for certain params;
        if (ignoreParams.indexOf(key) === -1){
            newMap.set(key, value);
        }
    });

    const refdesKey = 'refdes';

    if (!newMap.has(refdesKey)) {
        newMap.set(refdesKey, componentUnit.parent.assignedRefDes ?? "?");
    }

    if (componentUnit.refdesSuffix !== "") {
        const tmpRefdes = newMap.get(refdesKey) as string;
        newMap.set(refdesKey, `${tmpRefdes}${componentUnit.refdesSuffix}`);
    }

    symbol.drawing.variables = newMap;

    if (componentUnit.parameters.has(ParamKeys.angle)) {
        const value = (
            componentUnit.parameters.get(ParamKeys.angle) as NumericValue
        ).toNumber();

        symbol.angle = value;
    }

    if (componentUnit.parameters.has(ParamKeys.flipX)) {
        // either 1 or 0
        symbol.flipX =
            (componentUnit.parameters.get(ParamKeys.flipX) as NumericValue)
            .toNumber();
    }

    if (componentUnit.parameters.has(ParamKeys.flipY)) {
        // either 1 or 0
        symbol.flipY =
            (componentUnit.parameters.get(ParamKeys.flipY) as NumericValue)
            .toNumber();
    }
    
    if (symbol instanceof SymbolCustom) {
        if (widthProp) {
            symbol.bodyWidth = milsToMM(widthProp);
        }
        if (heightProp) {
            symbol.bodyHeight = milsToMM(heightProp);
        }
    }

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
    
    const points: [x: number, y: number][] = [];

    components.forEach(item => {
        const bbox = item.symbol.drawing.getBoundingBox();

        const [x1, y1] = bbox.start;
        const [x2, y2] = bbox.end;

        points.push([x1 + item.x.toNumber(), y1 + item.y.toNumber()]);
        points.push([x2 + item.x.toNumber(), y2 + item.y.toNumber()]);
    });

    wires.forEach(wire => {
        wire.points.forEach(point => {
            points.push([wire.x.add(point.x).toNumber(), wire.y.add(point.y).toNumber()]);
        });
    });

    junctions.forEach(item => {
        points.push([item.x.toNumber(), item.y.toNumber()]);
    });

    frames.forEach(item => {
        const { width, height } = getBoundsSize(item.bounds);
        points.push([item.x.toNumber(), item.y.toNumber()]);
        points.push([item.x.toNumber() + width, item.y.toNumber() + height]);
    });

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
    x = numeric(-1);
    y = numeric(-1);

    isFloating = true;
    floatingRelativeTo: [selfPin: number, nodeId: string, pin: number][] = [];
}

export type RenderNet = {
    netName: string; // Net Name
    net: Net;

    color?: string;
    lineWidth?: number;
    highlight?: string; // Highlight color

    highlightOpacity?: number;
    highlightWidth?: number;
}


export class RenderWire extends RenderObject {
    /** Uniquely identifies each wire */
    id: number;

    segments: WireSegment[] = [];

    /** Wire segments are flattened into the actual (x,y) positions that
     * define the wire. The (x,y) positions are relative to the (x,y) position
     * of the wire itself. */
    points:{x: number, y:number}[] = [];

    // Net name is used to determine if wires
    // can overlap
    netName!: string;

    net: Net;

    wire: Wire;

    constructor(net: Net, x: NumericValue, y: NumericValue, 
        segments: WireSegment[], wire: Wire) {
        
        super();
        this.net = net;
        this.x = x;
        this.y = y;
        this.segments = segments;
        this.wire = wire;

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
                const { valueXY = [numeric(0), numeric(0)] } = segment;

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

    getAutoPoints(value: [x: NumericValue, y: NumericValue], direction: WireAutoDirection): [dx: number, dy: number][] {
        const valueX = roundValue(value[0]).toNumber();
        const valueY = roundValue(value[1]).toNumber();

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

    setEndAuto(untilX: NumericValue, untilY: NumericValue): void {

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
                tmpY = tmpY.add(useValue);
            } else if (direction === Direction.Up) {
                tmpY = tmpY.sub(useValue);
            } else if (direction === Direction.Left) {
                tmpX = tmpX.sub(useValue);
            } else if (direction === Direction.Right) {
                tmpX = tmpX.add(useValue);
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
                useValue = tmpX.sub(untilX);
                break;
            case Direction.Right:
                useValue = untilX.sub(tmpX);
                break;
            case Direction.Up:
                useValue = untilY.sub(tmpY);
                break;
            case Direction.Down:
                useValue = tmpY.sub(untilY);
                break;

            case WireAutoDirection.Auto:
            case WireAutoDirection.Auto_:
                // Always assume positive values
                valueXY = [
                    untilX.sub(tmpX),
                    untilY.sub(tmpY),
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
    segments: SimplePoint[][],
    intersectPoints: [x: number, y: number, count: number][],
    net: RenderNet,
    lines?: SimplePoint[][],
}

// TODO: change to RenderComponentUnit.
export class RenderComponent extends RenderObject {
    // Holds the render information of the component (position)

    component: ClassComponent;
    unitId = DefaultComponentUnit;

    symbol: SymbolGraphic;

    width: number;
    height: number;

    displaySymbol: string | null = null;

    constructor(component: ClassComponent, unitId: string, width: number, height: number) {
        super();
        this.component = component;
        this.unitId = unitId;

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

    _fontSize = numeric(12);
    _fontWeight = 'regular';
    _fontStyle = 'normal';
    _color: string | undefined = undefined;

    get fontSize (): NumericValue {
        return this._fontSize;
    }

    set fontSize(value: NumericValue) {
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

    get fontStyle(): string {
        return this._fontStyle;
    }

    set fontStyle(value: string) {
        this._fontStyle = value;
        this.symbol.fontStyle = value;
    }

    get color(): string | undefined {
        return this._color;
    }

    set color(value: string | undefined) {
        this._color = value;
        this.symbol.color = value;
    }

    constructor(text: string) {
        super();
        this.symbol = new SymbolText(text);
    }
}

/**
 * Frame that will be rendered. Can contain other frames and components.
 */
export class RenderFrame extends RenderObject {

    static FrameIdCounter = 0;
    
    /** Bounds of the render frame */
    bounds: BoundBox | null = null;

    /** Holds the parameters of the frame that this RenderFrame is for */
    frame: Frame;

    /**
     * Store all items in the same array so that the order of frames
     * can be identified.
     */
    innerItems: (RenderComponent | RenderFrame | RenderText)[] = [];
    
    /** x offset relative to the parent frame's origin */
    translateX = 0;

    /** y offset relative to the parent frame's origin */
    translateY = 0;

    /** Frame inner padding (between frame border and inner elements) */
    padding = milsToMM(100);

    /** Spacing between frames within this frame */
    gap = milsToMM(100);

    borderWidth = numeric(5); //mils
    borderColor = "#111";

    /** Direction that frame elements are plotted. By default frame elements
     * are plotted in a ROW (horizontal direction) */
    direction = FramePlotDirection.Row;

    // If width and height are null, then frame size is determined
    // based on internal contents

    width: NumericValue | null = null;  // units: mm
    height: NumericValue | null = null; // units: mm

    subgraphId = "";

    /** Indicates if this RenderFrame is a container frame, or a frame that 
     *   holds sub components/frames
     */
    renderType: RenderFrameType;

    /** If true, then frame only contains text for frame title. */
    containsTitle = false;

    // If true, then the align params are ignored.
    overwriteAlignParamsForTitleLayout = false;

    // If true, then this frame is not an actual defined frame, but a virtual
    // frame that is used in multi-line layout.
    virtual  = false;

    // Flag for Element type frames to indicate if they have already been
    // resized once. 
    didResize = false;

    lineIndex = 0;

    frameId: number;

    constructor(frame: Frame, type: RenderFrameType = RenderFrameType.Container, 
        virtual = false) {
        
        super();
        this.frame = frame;
        this.renderType = type;

        this.frameId = RenderFrame.FrameIdCounter;
        RenderFrame.FrameIdCounter++;

        this.virtual = virtual;
    }

    toString(): string {
        let name = "";
        if (this.renderType === RenderFrameType.Container) {
            name = 'container_' + this.frame.frameId;
        } else if (this.renderType === RenderFrameType.Elements) {
            name = 'elements_' + this.subgraphId;
        }

        return name + ": " + this.x + "," + this.y 
            + " bounds:" + (this.bounds && printBounds(this.bounds));
    }

    static createContainer(gap: NumericValue): RenderFrame {
        const tmpFrame = new RenderFrame(
            new Frame(FixedFrameIds.FrameIdNotUsed),
            RenderFrameType.Container,
            true
        );

        tmpFrame.gap = gap.copy();
        tmpFrame.borderWidth = numeric(0);
        tmpFrame.padding = numeric(0);

        return tmpFrame;
    }
}

/** The RenderFrame type simplifies the frame layout process. Instead of 
 * having to consider each inner item of the frame, all inner items are grouped
 * into an element frame instead. The layout flow only needs to consider this
 * element frame.
 */
export enum RenderFrameType {
    /** Only holds element frames or containers */
    Container = 1,

    /** Holds subgraphs/frames/components, etc. */
    Elements = 2,
}

export class RenderJunction {
    x: NumericValue;
    y: NumericValue;

    net: RenderNet;

    constructor(x: NumericValue, y: NumericValue, net: RenderNet) {
        this.x = x;
        this.y = y;
        this.net = net;
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

export function CalculatePinPositions(unit: ComponentUnit)
    : Map<number, { x: NumericValue; y: NumericValue; angle: NumericValue; }> {

    const pinPositionMapping = new Map<number, { x: NumericValue; y: NumericValue; angle: NumericValue; }>();

    let tmpSymbol: SymbolGraphic;
    if (unit.displayProp !== null
        && unit.displayProp instanceof SymbolDrawing) {

        tmpSymbol = new SymbolPlaceholder(unit.displayProp);

    } else {
        const symbolPinDefinitions = generateLayoutPinDefinition(unit);
        tmpSymbol = new SymbolCustom(symbolPinDefinitions, 
            unit.pinsMaxPositions);
    }

    // Force a render of the symbol
    applyComponentParamsToSymbol(unit, tmpSymbol);
    tmpSymbol.refreshDrawing();

    const { pins } = unit;

    pins.forEach((value: PinDefinition, key: number) => {
        // If the component pin is unplaced (not in arrange prop), then do
        // not determine it's position.
        if (unit._unplacedPins.indexOf(key) === -1){
            pinPositionMapping.set(key, tmpSymbol.pinPosition(key));
        }
    });

    return pinPositionMapping;
}

export function ExtractDrawingRects(drawing: SymbolDrawingCommands)
    : {
        x: NumericValue, y: NumericValue, width: NumericValue,
        height: NumericValue, className: string | undefined
    }[] {

    return drawing.getCommands().filter(item => {
        return (item[0] === PlaceHolderCommands.rect);
    }).map(item => {
        const map = item[2];
        let className: string | undefined = undefined;
        if (map.has('class')) {
            className = map.get('class');
        }

        // Rect dimensions are in mils
        return {
            x: item[1][0],
            y: item[1][1],
            width: item[1][2],
            height: item[1][3],
            className
        }
    });
}

function isPointOverlap(x: number, y: number, other: RenderComponent): boolean {
    return (x >= other.x && y >= other.y && x <= (other.x + other.width) && y <= (other.y + other.height));
}


/** Holds information for a subgraph. 
 * A subgraph cannot contain further subgraphs*/
type SubGraphInfo = {
    /** This is the starting node of the entire subgraph */
    firstNodeId: string;

    /** Instance names of the components within this subgraph */
    components: string[];

    /** Dimensions of the subgraph */
    bounds: BoundBox;
}

export { BoundBox };

function SplitIntoLines(frameWidth: NumericValue, frameHeight: NumericValue, 
    framePadding: NumericValue, frameGap: NumericValue, frameDirection: string, 
    innerFrames: RenderFrame[], avoidAreas: BoundBox2[]): RenderFrame[][] {

    if (frameWidth.toNumber() === 0){
        // Assume no limits
        frameWidth = numeric(1e24);
    } 

    if (frameHeight.toNumber() === 0){
        frameHeight = numeric(1e24);
    }

    const allGroups: LayoutItem[][] = [];
    let currentGroup: LayoutItem[] = [];

    const tmpFrameWidth = frameWidth.sub(framePadding.mul(2)).toNumber();
    const tmpFrameHeight = frameHeight.sub(framePadding.mul(2)).toNumber();

    // Can only be row or column.
    const isRowDirection = frameDirection === FramePlotDirection.Row;

    const dimensionLimit = isRowDirection ? tmpFrameWidth: tmpFrameHeight;

    // Start at 0, since the frame padding is already accounted for.
    let accumX = numeric(0);
    let accumY = numeric(0);

    // Offset framePadding for the avoid areas, so that the overlap handling
    // is correct.
    const framePaddingValue = framePadding.toNumber();
    avoidAreas = avoidAreas.map(bounds => {
        return [
            bounds[0] - framePaddingValue,
            bounds[1] - framePaddingValue,
            bounds[2] - framePaddingValue,
            bounds[3] - framePaddingValue
        ]
    });

    // Group into lines and consider overlap areas
    for (const innerFrame of innerFrames) {
        const { width: innerFrameWidth, height: innerFrameHeight }
            = getBoundsSize(innerFrame.bounds!);

        const tmpX1 = accumX.toNumber();
        const tmpY1 = accumY.toNumber();
        const tmpX2 = tmpX1 + innerFrameWidth;
        const tmpY2 = tmpY1 + innerFrameHeight;
        const frameArea: BoundBox2 = [tmpX1, tmpY1, tmpX2, tmpY2];

        const conditionOverlapAvoidAreas = 
            avoidAreas.filter(area => areasOverlap(frameArea, area)).length > 0;

       if (isRowDirection){
            const tmpX = accumX.add(innerFrameWidth).toNumber();
            const conditionExceedDimension = tmpX > dimensionLimit;

            if ((conditionExceedDimension || conditionOverlapAvoidAreas) && currentGroup.length > 0){
                allGroups.push(currentGroup);

                // Find largest height of group.
                const heightsInLine = currentGroup.map(item => item.height);
                const maxHeight = Math.max(...heightsInLine);

                accumX = numeric(0);
                accumY = accumY.add(frameGap).add(maxHeight);

                currentGroup = [];
            }

            accumX = accumX.add(innerFrameWidth).add(frameGap);
        } else {
            const tmpY = accumY.add(innerFrameHeight).toNumber();
            const conditionExistDimension = tmpY > dimensionLimit;

            if ((conditionExistDimension || conditionOverlapAvoidAreas) && currentGroup.length > 0){
                allGroups.push(currentGroup);

                // Find largest width of group.
                const widthsInLine = currentGroup.map(item => item.width);
                const maxWidth = Math.max(...widthsInLine);

                accumX = accumX.add(frameGap).add(maxWidth);
                accumY = numeric(0);

                currentGroup = [];
            }

            accumY = accumY.add(innerFrameHeight).add(frameGap);
        }

        currentGroup.push({
            x: accumX.toNumber(),
            y: accumY.toNumber(),
            width: innerFrameWidth,
            height: innerFrameHeight,
            frame: innerFrame
        });
    }

    if (currentGroup.length > 0){
        allGroups.push(currentGroup);
    }

    // Return only the render frames, layout info is not needed
    // at the moment.
    return allGroups.map(lines => {
        return lines.map(layoutItem => layoutItem.frame);
    });
}

type LayoutItem = {
    x: number, y: number,
    width: number, height: number,
    frame: RenderFrame,
}