/*
 * Copyright 2023 Liu Weihao
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createHash } from 'crypto';
import path from 'path';
import { Geometry, GeometryProp, Feature, Textbox, HorizontalAlign, VerticalAlign } from './geometry.js';
import { SymbolDrawing, PinRenderInfo, SymbolCustom } from './draw_symbols.js';
import { SheetFrame, RenderComponent } from './layout.js';
import { ParserVisitor } from '../visitor.js';
import { Id, RawAtom, raw, printTree } from './s_expressions.js';
import { FrameParamKeys } from '../objects/Frame.js';
import { ClassComponent } from '../objects/ClassComponent.js';
import Flatten from '@flatten-js/core';

export enum KiCadVersion {
    V9 = 9,
    V10 = 10
}

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

/** Format a number for KiCad output: up to 4 decimal places, no trailing zeros */
function mm(v: number): string {
    return parseFloat(v.toFixed(4)).toString();
}

/** Deterministic UUID from a seed string using MD5 hash */
function deterministicUUID(seed: string): string {
    const h = createHash('md5').update(seed).digest('hex');
    return [h.slice(0, 8), h.slice(8, 12), '4' + h.slice(13, 16),
        h.slice(16, 20), h.slice(20, 32)].join('-');
}

// ---------------------------------------------------------------------------
// S-expression node builder helpers
// ---------------------------------------------------------------------------

/** A KiCad s-expression node: [IdObject, ...children] */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type N = any[];

/** Shorthand to create a named s-expression node. */
function n(id: string, ...children: any[]): N {
    return [Id(id), ...children];
}

// ---------------------------------------------------------------------------
// Generator
// ---------------------------------------------------------------------------

export class KiCadSchGenerator {

    constructor(private version: KiCadVersion, private circuitscriptVersion: string) {}

    // -----------------------------------------------------------------------
    // Version helpers
    // -----------------------------------------------------------------------

    private fileVersion(): number {
        return this.version >= KiCadVersion.V10 ? 20250513 : 20250114;
    }

    /**
     * Return the hide attribute as an s-expression node.
     * Both V9 and V10 use `(hide yes)`.
     */
    private hideAttrNode(): N {
        return n('hide', raw('yes'));
    }

    powerComponentIndexes = new Map<RenderComponent, number>();
    private currentProjectName = '';
    /** Maps definitionName → set of distinct numPins values seen across all components */
    private definitionPinCounts = new Map<string, Set<number>>();

    // -----------------------------------------------------------------------
    // Public entry point
    // -----------------------------------------------------------------------


    generate(visitor: ParserVisitor, sheetFrames: SheetFrame[], outputPath: string): string {

        // For kicad schematic output, enforce that a user-defined `sheet:` must
        // be specified.
        if (sheetFrames.length > 0 && sheetFrames[0].frame.frameId <= 0){
            throw "No sheet specified for kicad schematic output"; 
        }

        const allComponents: RenderComponent[] = [];
        for (const sf of sheetFrames) {
            allComponents.push(...sf.components);
        }

        const schematicUuid = deterministicUUID(outputPath);

        // Skip components that are internal to circuitscript (branches, points, etc.)
        const keepComponents = allComponents.filter(item =>
            !item.component._isInternalPathObject
        );

        // Build definitionName → numPins map to determine whether numPins needs
        // to be included in the library symbol id (only needed when the same
        // definitionName is used with different pin counts).
        this.definitionPinCounts.clear();
        for (const rc of keepComponents) {
            const { definitionName } = rc.component;
            if (definitionName) {
                const numPins = rc.component.numPins;
                if (!this.definitionPinCounts.has(definitionName)) {
                    this.definitionPinCounts.set(definitionName, new Set());
                }
                this.definitionPinCounts.get(definitionName)!.add(numPins);
            }
        }

        this.powerComponentIndexes.clear();
        let counter = 1;
        for (const rc of keepComponents) {
            if (rc.component.parameters.has('net_name')) {
                this.powerComponentIndexes.set(rc, counter++);
            }
        }

        // const netListMap = this.buildPinNetMap(visitor);
        const projectName = path.basename(outputPath, path.extname(outputPath));
        this.currentProjectName = projectName;

        // Resolve paper size from the sheet_type component's paper_size parameter
        let paperSize = 'A4';
        if (sheetFrames.length > 0) {
            const frameParams = sheetFrames[0].frame.frame.parameters;
            const frameComponent = frameParams.get(FrameParamKeys.SheetType) as ClassComponent | undefined;
            if (frameComponent) {
                const ps = frameComponent.getParam(FrameParamKeys.PaperSize);
                if (ps) paperSize = String(ps);
            }
        }

        // Deduplicate lib_symbols: components sharing a definitionName and
        // orientation (transforms are baked into the lib_symbol geometry) only
        // emit one entry.
        const seenSymbolIds = new Set<string>();
        const libSymbolComponents: RenderComponent[] = [];
        for (const rc of keepComponents) {
            const { symbolId } = this.librarySymbolId(rc);
            if (!seenSymbolIds.has(symbolId)) {
                seenSymbolIds.add(symbolId);
                libSymbolComponents.push(rc);
            }
        }

        const root = n('kicad_sch',
            n('version', raw(this.fileVersion())),
            n('generator', 'circuitscript'),
            n('generator_version', this.circuitscriptVersion),
            n('uuid', schematicUuid),
            n('paper', paperSize),

            // lib_symbols
            n('lib_symbols',
                ...libSymbolComponents.map(rc => this.buildLibrarySymbol(rc))
            ),

            // Wires and junctions
            ...sheetFrames.flatMap(sf => this.buildWires(sf)),
            ...sheetFrames.flatMap(sf => this.buildJunctions(sf)),
            ...sheetFrames.flatMap(sf => this.buildFrameRectangles(sf)),

            // Component instance placements
            ...keepComponents.map(rc =>
                this.buildSymbolPlacement(rc, schematicUuid, projectName)
            ),

            // Sheet instances
            n('sheet_instances',
                n('path', '/', n('page', '1'))
            )
        );

        return printTree(root);
    }

    // -----------------------------------------------------------------------
    // Build pin → net name map from the visitor net list
    // -----------------------------------------------------------------------

    private buildPinNetMap(visitor: ParserVisitor): Map<string, Map<string, string>> {
        const result = new Map<string, Map<string, string>>();
        for (const item of visitor.getNetList()) {
            const pinMap = new Map<string, string>();
            for (const [pinKey, netInfo] of Object.entries(item.pins)) {
                const netName = (netInfo as any).netName ?? netInfo;
                pinMap.set(String(pinKey), String(netName));
            }
            result.set(item.instanceName, pinMap);
        }
        return result;
    }

    // -----------------------------------------------------------------------
    // lib_symbol generation
    // -----------------------------------------------------------------------

    /**
     * Each RenderComponent gets its own lib_symbol entry (named by refdes).
     * The symbol geometry is canonical (no angle, no flip); transforms are
     * applied in the instance placement via angle and mirror tokens.
     */
    private buildLibrarySymbol(rc: RenderComponent): N {
        const {symbolId:symbolId, symbolPart} = this.librarySymbolId(rc);
        const drawing = rc.symbol.drawing;
        const isCustomSymbol = rc.symbol instanceof SymbolCustom;

        const children: Array<string | number | RawAtom | N> = [];

        let componentInBom = true;
        let componentOnBoard = true;

        // Components with the 'net_name' parameter are power/net components.
        const isNetComponent = rc.component.parameters.has('net_name');

        if (isNetComponent) {
            children.push(n('power'));
            children.push(
                n('property', 'Reference', '#PWR',
                    n('at', raw(0), raw(0), raw(0)),
                    n('effects', n('font', n('size', raw(1.27), raw(1.27))), n('hide', raw('yes')))
                )
            );

            componentInBom = false;
            componentOnBoard = false;
        }

        children.push(n('exclude_from_sim', raw('no')));
        children.push(n('in_bom', raw(componentInBom ? 'yes': 'no')));
        children.push(n('on_board', raw(componentOnBoard ? 'yes': 'no')));
        
        // The value at position 4 is whether pin id/number is displayed.
        const showPinNumbers = isCustomSymbol || drawing.pins.some(pin => pin[4] === true);

        // The value at position 5 is whether pin name is displayed.
        const showPinNames = isCustomSymbol || drawing.pins.some(pin => pin[5] === true);

        const pinNameOffset = isCustomSymbol ? 0.002 : 0;

        if (showPinNumbers) {
            children.push(n('pin_numbers'));
        } else {
            children.push(n('pin_numbers', n('hide', raw('yes'))));
        }
        if (showPinNames) {
            children.push(n('pin_names', n('offset', raw(pinNameOffset))));
        } else {
            children.push(n('pin_names', n('offset', raw(pinNameOffset)), n('hide', raw('yes'))));
        }

        // Body geometry and pins (inside sub-symbol _1_1)
        let fillType = 'none';
        let lineWidth = 0;

        const subSymChildren: N[] = [];

        // First pass: extract style properties and build geometry nodes with
        // the current selected style properties.
        for (const item of drawing.items) {
            if (item.name === 'fillColor') {
                const fc = item.value as string;
                fillType = fc === 'none' ? 'none'
                    : (fc === '#fff' || fc === 'white') ? 'background' : 'outline';
            } else if (item.name === 'lineWidth') {
                const lw = item.value as any;
                lineWidth = (typeof lw === 'object' && lw !== null && typeof lw.toNumber === 'function')
                    ? lw.toNumber()
                    : Number(lw);
            } else {
                if (item instanceof GeometryProp || (item instanceof Textbox)){
                    continue;
                }

                subSymChildren.push(this.buildFeature(item as Feature, fillType, lineWidth));
            }
        }

        // Pins inside _1_1
        for (const pin of drawing.pins) {
            const pinNode = this.buildLibraryPin(pin, 0, 0, 0, drawing, isNetComponent);
            if (pinNode !== null) subSymChildren.push(pinNode);
        }

        if (subSymChildren.length > 0) {
            children.push(n('symbol', `${symbolPart}_1_1`, ...subSymChildren));
        }

        // Labels as KiCad property tokens
        children.push(...this.buildLibraryLabels(rc));

        return n('symbol', symbolId, ...children);
    }

    /**
     * Compute transformed label data for all Textbox items in the drawing.
     * Returns position in CircuitScript Y-down local coordinates (before placement offset).
     * When canonical=true, all transforms are identity (for lib_symbol entries).
     */
    private transformedLabels(rc: RenderComponent, canonical = false): {
        index: number;
        name: string;
        text: string;
        x: number; y: number;
        kicadAngle: number; fontSizeMM: number;
        anchor: HorizontalAlign; vanchor: VerticalAlign;
    }[] {
        const drawing = rc.symbol.drawing;
        const angle = canonical ? 0 : drawing.angle;
        const flipX = canonical ? 0 : drawing.flipX;
        const flipY = canonical ? 0 : drawing.flipY;

        return drawing.getLabels().filter(label => {
            // Ignore/skip certain label names.
            const { id: name } = label;
            if (name) {
                return !name.startsWith('pin-id_') && !name.startsWith('pin-name_');
            } else {
                return true;
            }
        }).map((label, index) => {
            let feat = Geometry.flip(label, flipX, flipY);
            feat = Geometry.rotateDegs(feat, angle, drawing.mainOrigin);

            const transformed = feat as Textbox;
            const [ax, ay] = transformed.getLabelPosition();

            // Compute kicadAngle accounting for flip and rotation.
            // In Flatten.js Y-up space: flipX reflects θ → 180-θ, flipY reflects θ → -θ.
            // KiCad negates the angle (Y-up lib space vs Y-down schematic space).
            const styleAngle = label.style?.angle?.toNumber() ?? 0;
            const totalAngle = styleAngle + angle;
            let kicadAngle: number;
            if (flipX !== 0 && flipY !== 0) {
                kicadAngle = 180 - totalAngle;
            } else if (flipX !== 0) {
                kicadAngle = totalAngle - 180;
            } else if (flipY !== 0) {
                kicadAngle = totalAngle;
            } else {
                kicadAngle = -totalAngle;
            }
            kicadAngle = ((kicadAngle % 360) + 360) % 360;

            const fontSizeMils = label.style?.fontSize?.toNumber() ?? 50;
            const fontSizeMM = fontSizeMils * 0.0254;

            // Mirror the anchor/vanchor flipping logic from SymbolGraphic.drawLabels.
            let anchor = label.style?.anchor ?? HorizontalAlign.Left;
            let vanchor = label.style?.vanchor ?? VerticalAlign.Bottom;

            // totalAngle already computed above; reuse it for direction detection.
            const isRotation180 = Math.abs(totalAngle) === 180;
            const isHorizontalLabel = totalAngle === 0 || totalAngle === 180;
            const isVerticalLabel = totalAngle === 90 || totalAngle === -90;

            // isRotation180: flip both anchor and vanchor (text is upside-down, so
            // we conceptually flip it, matching drawLabels' flipTextAnchor / flipDominantBaseline).
            if (isRotation180) {
                if (anchor === HorizontalAlign.Left) anchor = HorizontalAlign.Right;
                else if (anchor === HorizontalAlign.Right) anchor = HorizontalAlign.Left;
                if (vanchor === VerticalAlign.Top) vanchor = VerticalAlign.Bottom;
                else if (vanchor === VerticalAlign.Bottom) vanchor = VerticalAlign.Top;
            }

            /**
             *    Direction       | flipX                 | flipY
             *    Horizontal      | if 1, flip anchor     | if 1, flip baseline
             *    Vertical        | if 1, flip baseline   | if 1, flip anchor
             */
            if (anchor !== HorizontalAlign.Center &&
                ((isHorizontalLabel && flipX !== 0) || (isVerticalLabel && flipY !== 0))) {
                anchor = (anchor === HorizontalAlign.Left) ? HorizontalAlign.Right : HorizontalAlign.Left;
            }
            if (vanchor !== VerticalAlign.Center &&
                ((isHorizontalLabel && flipY !== 0) || (isVerticalLabel && flipX !== 0))) {
                vanchor = (vanchor === VerticalAlign.Top) ? VerticalAlign.Bottom : VerticalAlign.Top;
            }

            return { index, name: label.id, text: label.text,
                x: ax.toNumber(), y: ay.toNumber(),
                kicadAngle, fontSizeMM, anchor, vanchor };
        });
    }

    /**
     * Build KiCad (property ...) nodes for all Textbox items in the drawing,
     * for use inside a lib_symbol (no placement offset, canonical transforms).
     */
    private buildLibraryLabels(rc: RenderComponent): N[] {
        return this.buildLabels(rc, false, true);
    }

    /**
     * Build KiCad (property ...) nodes for all Textbox items in the drawing,
     * for use inside a symbol instance placement (with component origin added).
     */
    private buildPlacementLabels(rc: RenderComponent): N[] {
        return this.buildLabels(rc, true, false, true);
    }

    private buildLabels(rc: RenderComponent, useComponentOrigin: boolean, canonical = false, ignoreLabelAngle=false): N[] {
        const offsetX = useComponentOrigin ? rc.x.toNumber() : 0;
        const offsetY = useComponentOrigin ? rc.y.toNumber() : 0;

        return this.transformedLabels(rc, canonical)
            .map(({ index, name, text, x, y, kicadAngle, fontSizeMM, anchor, vanchor }) => {
                let propName = `Text_${index}`;
                if (name === 'refdes') propName = 'Reference';
                else if (name === 'value') propName = 'Value';

                // Map CircuitScript anchor/vanchor to KiCad justify terms.
                const justifyH = anchor === HorizontalAlign.Left ? 'left'
                    : anchor === HorizontalAlign.Right ? 'right'
                        : null;
                const justifyV = vanchor === VerticalAlign.Top ? 'top'
                    : vanchor === VerticalAlign.Bottom ? 'bottom'
                        : null;
                const justifyParts = [justifyH, justifyV].filter(Boolean) as string[];;

                const effectsChildren: Array<N | RawAtom> = [
                    n('font', n('size', raw(mm(fontSizeMM)), raw(mm(fontSizeMM))))
                ];
                if (justifyParts.length > 0) {
                    effectsChildren.push(n('justify', ...justifyParts.map(p => raw(p))));
                }

                const useAngle = ignoreLabelAngle ? 0: kicadAngle;

                // Schematic space = CircuitScript Y-down; add placement origin, no Y negation
                return n('property', propName, text,
                    n('at', raw(mm(offsetX + x)), raw(mm(offsetY + y)), raw(useAngle)),
                    n('effects', ...effectsChildren)
                );
            });
    }

    /**
     * Build a single geometry feature as a KiCad polyline or arc node.
     */
    private buildFeature(feat: Feature, fillType: string, lineWidth: number): N {
        const f = feat as any;
        const stroke = n('stroke', n('width', raw(mm(lineWidth))), n('type', raw('default')));
        const fill = n('fill', n('type', raw(fillType)));

        // Circle: Flatten.Circle has center and r but no startAngle
        if (f instanceof Flatten.Circle) {
            return n('circle',
                n('center', raw(mm(f.center.x)), raw(mm(-f.center.y))),
                n('radius', raw(mm(f.r))),
                stroke,
                fill
            );
        } else if (f instanceof Flatten.Arc) {
            const start = f.start;
            const end = f.end;
            // KiCad lib symbols use Y-up; negate all y coordinates and mid-angle sin term.
            const midAngle = f.counterClockwise
                ? f.startAngle + (f.endAngle - f.startAngle) / 2
                : (f.startAngle + f.endAngle) / 2 + Math.PI;
            const midX = f.center.x + f.r * Math.cos(midAngle);
            const midY = -(f.center.y + f.r * Math.sin(midAngle));

            return n('arc',
                n('start', raw(mm(start.x)), raw(mm(-start.y))),
                n('mid', raw(mm(midX)), raw(mm(midY))),
                n('end', raw(mm(end.x)), raw(mm(-end.y))),
                stroke,
                fill
            );
        }

        // Segment, Polygon, Multiline – all expose vertices
        // KiCad lib symbols use Y-up; negate all y coordinates
        const vertices = Array.from(f.vertices) as { x: number; y: number }[];
        const ptsChildren: N[] = vertices.map(v => n('xy', raw(mm(v.x)), raw(mm(-v.y))));

        let useFill:N;

        // Close polygon if 3+ vertices and last vertex differs from first
        if (f instanceof Flatten.Polygon) {
            const first = vertices[0];
            const last = vertices[vertices.length - 1];
            if (first.x !== last.x || first.y !== last.y) {
                ptsChildren.push(n('xy', raw(mm(first.x)), raw(mm(-first.y))));
            }
            useFill = fill;
        } else {
            useFill = n('fill', n('type', raw('none')));
        }

        return n('polyline', n('pts', ...ptsChildren), stroke, useFill);
    }

    /**
     * Build a single pin definition node for inside a lib_symbol.
     * Returns null if the pin segment has fewer than 2 coordinates.
     */
    private buildLibraryPin(pin: PinRenderInfo, flipX: number, flipY: number,
        drawingAngle: number, drawing: SymbolDrawing, isPower = false): N | null {

        const [pinId, feature,, , displayId, displayName, pinName] = pin;

        // Apply transforms to pin segment
        let feat = Geometry.flip(feature, flipX, flipY);
        feat = Geometry.rotateDegs(feat, drawingAngle, drawing.mainOrigin);

        const coords = Geometry.getCoords(feat);
        if (coords.length < 2) return null;

        const [startPt, endPt] = coords;
        const sx = startPt[0].toNumber();
        const sy = startPt[1].toNumber();
        const ex = endPt[0].toNumber();
        const ey = endPt[1].toNumber();

        const dx = ex - sx;
        const dy = ey - sy;
        const length = Math.sqrt(dx * dx + dy * dy);

        // KiCad lib symbols use Y-up; negate y coordinates.
        const nsy = -sy;
        const ney = -ey;
        const ndy = ney - nsy; // = -dy

        // Determine the KiCad pin angle from the direction (start → end = connection → body)
        // In KiCad lib Y-up: 0=right, 90=up, 180=left, 270=down
        let kicadAngle: number;
        if (Math.abs(dx) >= Math.abs(ndy)) {
            kicadAngle = dx >= 0 ? 0 : 180;
        } else {
            kicadAngle = ndy >= 0 ? 90 : 270;
        }

        const pinNum = pinId.getValue().toString();
        const nameStr = pinName ?? '~';

        const nameEffectsChildren: Array<N | RawAtom> = [
            n('font', n('size', raw(1.27), raw(1.27)))
        ];
        if (pinName !== null && pinName !== '' && displayName === false) {
            nameEffectsChildren.push(this.hideAttrNode());
        }

        const numEffectsChildren: Array<N | RawAtom> = [
            n('font', n('size', raw(1.27), raw(1.27)))
        ];
        if (displayId === false) {
            numEffectsChildren.push(this.hideAttrNode());
        }

        // For power symbols, have to use power_in, otherwise KiCad will have
        // a weird error of "Pin not connected".
        return n('pin', raw(isPower ? 'power_in' : 'passive'), raw('line'),
            n('at', raw(mm(sx)), raw(mm(nsy)), raw(kicadAngle)),
            n('length', raw(mm(length))),
            n('name', nameStr, n('effects', ...nameEffectsChildren)),
            n('number', pinNum, n('effects', ...numEffectsChildren))
        );
    }

    // -----------------------------------------------------------------------
    // Symbol instance placement
    // -----------------------------------------------------------------------

    private buildSymbolPlacement(rc: RenderComponent,
        schematicUuid: string, projectName: string): N {

        const {symbolId: symName} = this.librarySymbolId(rc);
        const x = rc.x.toNumber();
        const y = rc.y.toNumber();
        const drawing = rc.symbol.drawing;
        const placementAngle = drawing.angle;
        let flipX = drawing.flipX;
        let flipY = drawing.flipY;
        const refdes = rc.component.assignedRefDes ?? rc.component.instanceName;
        const instanceUuid = deterministicUUID(`sym_${rc.component.instanceName}_${rc.unitId}`);

        const children: Array<N> = [
            n('uuid', instanceUuid)
        ];

        const params = rc.component.parameters;

        let setNotPlaced = false;
        if (params.has('place') && (params.get('place') as boolean) === false){
            setNotPlaced = true;
        }

        if (params.has('net_name')) {
            // Power component: manually add Reference since there is no refdes label.
            children.push(
                n('property', 'Reference', this.getPowerComponentRef(rc),
                    n('at', raw(0), raw(0), raw(0)),
                    n('effects', n('font', n('size', raw(1.27), raw(1.27))), n('hide', raw('yes')))
                )
            );
        }

        if (params.has('footprint')) {
            const fp = String(params.get('footprint') ?? '');
            children.push(
                n('property', 'Footprint', fp,
                    n('at', raw(mm(x)), raw(mm(y)), raw(0)),
                    n('effects', n('font', n('size', raw(1.27), raw(1.27))), this.hideAttrNode())
                )
            );
        }

        // Label properties mirroring the lib_symbol text items
        children.push(...this.buildPlacementLabels(rc));

        // Kicad uses 
        let usePlacementAngle = placementAngle * -1;

        if (usePlacementAngle < 0){
            usePlacementAngle += 360;
        } else if (usePlacementAngle > 360){
            usePlacementAngle = usePlacementAngle % 360;
        }

        if (flipX && flipY){
            usePlacementAngle += 180;
            usePlacementAngle = usePlacementAngle % 360;

            flipX = 0;
            flipY = 0;
        }

        // Pin UUID entries
        const unit = rc.component.getUnit(rc.unitId);
        unit.pins.forEach((_pinDef, pinId) => {
            const pinUuid = deterministicUUID(`pin_${rc.component.instanceName}_${pinId.toString()}`);
            children.push(n('pin', pinId.getValue().toString(), n('uuid', pinUuid)));
        });

        // Instances block
        const instanceRef = params.has('net_name')
            ? this.getPowerComponentRef(rc)
            : (refdes ?? 'U?');

        children.push(
            n('instances',
                n('project', projectName,
                    n('path', `/${schematicUuid}`,
                        n('reference', instanceRef),
                        n('unit', raw(1))
                    )
                )
            )
        );

        const mirrorNodes: N[] = [];

        /**
         * Circuitscript will applies the flip first then the rotation. But
         * Kicad seems to do the opposite, it applies the rotation first, 
         * then the flip.
         */

        const isConsideredHorizontal = usePlacementAngle === 0 || usePlacementAngle == 180;

        let useMirrorValue: string | null = null;

        if (flipX) {
            if (isConsideredHorizontal) {
                useMirrorValue = 'y';
            } else {
                useMirrorValue = 'x';
            }
        }

        if (useMirrorValue === null && flipY) {
            if (isConsideredHorizontal) {
                useMirrorValue = 'x';
            } else {
                useMirrorValue = 'y';
            }
        }

        if (useMirrorValue !== null) {
            mirrorNodes.push(n('mirror', raw(useMirrorValue)));
        }

        return n('symbol',
            n('lib_id', symName),
            n('at', raw(mm(x)), raw(mm(y)), raw(usePlacementAngle)),
            ...mirrorNodes,
            n('unit', raw(1)),
            n('in_bom', raw('yes')),
            n('on_board', raw('yes')),
            n('dnp', raw(setNotPlaced ? 'yes' : 'no')),
            ...children
        );
    }

    private getPowerComponentRef(rc: RenderComponent): string {
        const index = this.powerComponentIndexes.get(rc) ?? 0;
        return '#PWR' + index.toString().padStart(2, '0');
    }

    // -----------------------------------------------------------------------
    // Frame rectangle generation
    // -----------------------------------------------------------------------

    /**
     * For each user-defined frame in the sheet (frameId > 0), emit a KiCad
     * rectangle graphic using the frame's bounding box.
     */
    private buildFrameRectangles(sf: SheetFrame): N[] {
        const rects: N[] = [];
        for (const rf of sf.frames) {
            // If frameId is <= 0, then it is not a user-defined frame (i.e.
            // not created by the user code)
            if (rf.frame.frameId <= 0) continue;
            if (!rf.bounds) continue;

            if (rf.frame.parameters.has('border')){
                const borderWidthValue = rf.frame.parameters.get('border').toNumber();
                if (borderWidthValue === 0){
                    continue;
                }
            }

            const xpos = rf.x.toNumber();
            const ypos = rf.y.toNumber();

            const xmax = xpos + rf.bounds.xmax;
            const ymax = ypos + rf.bounds.ymax;

            const rectUuid = deterministicUUID(`frame_rect_${rf.frame.frameId}_${xpos}_${ypos}`);
            rects.push(
                n('rectangle',
                    n('start', raw(mm(xpos)), raw(mm(ypos))),
                    n('end', raw(mm(xmax)), raw(mm(ymax))),
                    n('stroke', n('width', raw(0)), n('type', raw('default'))),
                    n('fill', n('type', raw('none'))),
                    n('uuid', rectUuid)
                )
            );
        }
        return rects;
    }

    // -----------------------------------------------------------------------
    // Wire generation
    // -----------------------------------------------------------------------

    private buildWires(sf: SheetFrame): N[] {
        const wires: N[] = [];
        for (const wire of sf.mergedWires) {
            for (const segment of wire.segments) {
                for (let i = 0; i < segment.length - 1; i++) {
                    const [x1, y1] = segment[i];
                    const [x2, y2] = segment[i + 1];

                    // Skip zero-length segments
                    if (x1 === x2 && y1 === y2) continue;

                    const wireUuid = deterministicUUID(`wire_${x1}_${y1}_${x2}_${y2}`);
                    wires.push(
                        n('wire',
                            n('pts',
                                n('xy', raw(mm(x1)), raw(mm(y1))),
                                n('xy', raw(mm(x2)), raw(mm(y2)))
                            ),
                            n('stroke', n('width', raw(0)), n('type', raw('default'))),
                            n('uuid', wireUuid)
                        )
                    );
                }
            }
        }
        return wires;
    }

    // -----------------------------------------------------------------------
    // Junction generation
    // -----------------------------------------------------------------------

    private buildJunctions(sf: SheetFrame): N[] {
        return sf.junctions.map(junc => {
            const jx = junc.x.toNumber();
            const jy = junc.y.toNumber();
            const juncUuid = deterministicUUID(`junc_${jx}_${jy}`);
            return n('junction',
                n('at', raw(mm(jx)), raw(mm(jy))),
                n('diameter', raw(0)),
                n('color', raw(0), raw(0), raw(0), raw(0)),
                n('uuid', juncUuid)
            );
        });
    }

    // -----------------------------------------------------------------------
    // Helpers
    // -----------------------------------------------------------------------

    /** Unique lib_symbol name for a component instance, prefixed with the project name as the library.
     *
     * Components with a `definitionName` (created from a named class definition) share a single
     * canonical lib_symbol entry. Orientation (angle + flip) is applied in the instance placement
     * via the `at` angle and `mirror` tokens, so no orientation suffix is needed.
     */
    private librarySymbolId(rc: RenderComponent): {
        projectName: string,
        symbolId: string,
        symbolPart: string,
    } {
        const { definitionName = null } = rc.component;

        if (definitionName) {
            const numPins = rc.component.numPins;
            const pinCounts = this.definitionPinCounts.get(definitionName);
            const needsPinSuffix = pinCounts !== undefined && pinCounts.size > 1;
            const baseName = needsPinSuffix
                ? `${definitionName}-${numPins}_sym`
                : `${definitionName}_sym`;
            const symbolPart = baseName.replace(/:/g, '_');

            return {
                projectName: this.currentProjectName,
                symbolId: `${this.currentProjectName}:${symbolPart}`,
                symbolPart,
            };
        }

        const refdes = rc.component.assignedRefDes ?? rc.component.instanceName;
        const unit = rc.unitId !== '__default' ? `_${rc.unitId}` : '';
        // Sanitize the symbol part: replace colons with underscores since KiCad
        // parses colons as library:symbol separators and the symbol part must not
        // start with a digit.
        const symbolPart = `${refdes}${unit}_sym`.replace(/:/g, '_');
        return {
            projectName: this.currentProjectName,
            symbolId: `${this.currentProjectName}:${symbolPart}`,
            symbolPart,
        }
    }

}
