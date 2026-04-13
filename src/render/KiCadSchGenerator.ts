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

    // -----------------------------------------------------------------------
    // Public entry point
    // -----------------------------------------------------------------------

    /**
     * Generate a KiCad project (.kicad_pro) JSON file for the given schematic.
     * The project references the schematic UUID which must match the one used in generate().
     */
    generateProject(outputPath: string): string {
        const schematicUuid = deterministicUUID(outputPath);
        const projectName = path.basename(outputPath, path.extname(outputPath));

        const project = {
            board: {
                "3dviewports": [],
                design_settings: {
                    defaults: {
                        board_outline_line_width: 0.1,
                        copper_line_width: 0.2,
                        copper_text_size_h: 1.5,
                        copper_text_size_v: 1.5,
                        copper_text_thickness: 0.3,
                        other_line_width: 0.15,
                        silk_line_width: 0.15,
                        silk_text_size_h: 1.0,
                        silk_text_size_v: 1.0,
                        silk_text_thickness: 0.15
                    },
                    diff_pair_dimensions: [],
                    drc_exclusions: [],
                    rules: {
                        min_copper_edge_clearance: 0.0,
                        solder_mask_clearance: 0.0,
                        solder_mask_min_width: 0.0
                    },
                    track_widths: [],
                    via_dimensions: []
                },
                layer_presets: [],
                viewports: []
            },
            boards: [],
            cvpcb: { equivalence_files: [] },
            erc: {
                erc_exclusions: [],
                meta: { version: 0 },
                pin_map: [
                    [0,0,0,0,0,0,1,0,0,0,0,2],
                    [0,2,0,1,0,0,1,0,2,2,2,2],
                    [0,0,0,0,0,0,1,0,1,0,1,2],
                    [0,1,0,0,0,0,1,1,2,1,1,2],
                    [0,0,0,0,0,0,1,0,0,0,0,2],
                    [0,0,0,0,0,0,0,0,0,0,0,2],
                    [1,1,1,1,1,0,1,1,1,1,1,2],
                    [0,0,0,1,0,0,1,0,0,0,0,2],
                    [0,2,1,2,0,0,1,0,2,2,2,2],
                    [0,2,0,1,0,0,1,0,2,0,0,2],
                    [0,2,1,1,0,0,1,0,2,0,0,2],
                    [2,2,2,2,2,2,2,2,2,2,2,2]
                ],
                rule_severities: {
                    bus_definition_conflict: 'error',
                    bus_entry_needed: 'error',
                    bus_to_bus_conflict: 'error',
                    bus_to_net_conflict: 'error',
                    conflicting_netclasses: 'error',
                    different_unit_footprint: 'error',
                    different_unit_net: 'error',
                    duplicate_reference: 'error',
                    duplicate_sheet_names: 'error',
                    endpoint_off_grid: 'warning',
                    extra_units: 'error',
                    global_label_dangling: 'warning',
                    hier_label_mismatch: 'error',
                    label_dangling: 'error',
                    lib_symbol_issues: 'warning',
                    missing_bidi_pin: 'warning',
                    missing_input_pin: 'warning',
                    missing_power_pin: 'error',
                    missing_unit: 'warning',
                    multiple_net_names: 'warning',
                    net_not_bus_member: 'warning',
                    no_connect_connected: 'warning',
                    no_connect_dangling: 'warning',
                    pin_not_connected: 'error',
                    pin_not_driven: 'error',
                    pin_to_pin: 'warning',
                    power_pin_not_driven: 'error',
                    similar_labels: 'warning',
                    simulation_model_issue: 'ignore',
                    unannotated: 'error',
                    unit_value_mismatch: 'error',
                    unresolved_variable: 'error',
                    wire_dangling: 'error'
                }
            },
            libraries: {
                pinned_footprint_libs: [],
                pinned_symbol_libs: []
            },
            meta: {
                filename: `${projectName}.kicad_pro`,
                version: 1
            },
            net_settings: {
                classes: [{
                    bus_width: 12,
                    clearance: 0.2,
                    diff_pair_gap: 0.25,
                    diff_pair_via_gap: 0.25,
                    diff_pair_width: 0.2,
                    line_style: 0,
                    microvia_diameter: 0.3,
                    microvia_drill: 0.1,
                    name: 'Default',
                    pcb_color: 'rgba(0, 0, 0, 0.000)',
                    schematic_color: 'rgba(0, 0, 0, 0.000)',
                    track_width: 0.25,
                    via_diameter: 0.8,
                    via_drill: 0.4,
                    wire_width: 6
                }],
                meta: { version: 3 },
                net_colors: null,
                netclass_assignments: null,
                netclass_patterns: []
            },
            pcbnew: {
                last_paths: {
                    gencad: '',
                    idf: '',
                    netlist: '',
                    specctra_dsn: '',
                    step: '',
                    vrml: ''
                },
                page_layout_descr_file: ''
            },
            schematic: {
                annotate_start_num: 0,
                drawing: {
                    dashed_lines_dash_length_ratio: 12.0,
                    dashed_lines_gap_length_ratio: 3.0,
                    default_line_thickness: 6.0,
                    default_text_size: 50.0,
                    field_names: [],
                    intersheets_ref_own_page: false,
                    intersheets_ref_prefix: '',
                    intersheets_ref_short: false,
                    intersheets_ref_show: false,
                    intersheets_ref_suffix: '',
                    junction_size_choice: 3,
                    label_size_ratio: 0.375,
                    pin_symbol_size: 25.0,
                    text_offset_ratio: 0.15
                },
                legacy_lib_dir: '',
                legacy_lib_list: [],
                meta: { version: 1 },
                net_format_name: '',
                page_layout_descr_file: '',
                plot_directory: '',
                spice_current_sheet_as_root: false,
                spice_external_command: 'spice "%I"',
                spice_model_current_sheet_as_root: true,
                spice_save_all_currents: false,
                spice_save_all_voltages: false,
                subpart_first_id: 65,
                subpart_id_separator: 0
            },
            sheets: [[schematicUuid, '']],
            text_variables: {}
        };

        return JSON.stringify(project, null, 2);
    }

    generate(visitor: ParserVisitor, sheetFrames: SheetFrame[], outputPath: string): string {

        // For kicad schematic output, enforce that a user-defined `sheet:` must
        // be specified. Without a user-defined sheet, the first sheet frame
        // will be automatically generated.
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

        this.powerComponentIndexes.clear();
        let counter = 1;
        for (const rc of keepComponents) {
            if (rc.component.parameters.has('net_name')) {
                this.powerComponentIndexes.set(rc, counter++);
            }
        }

        const netListMap = this.buildPinNetMap(visitor);
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

        const root = n('kicad_sch',
            n('version', raw(this.fileVersion())),
            n('generator', 'circuitscript'),
            n('generator_version', this.circuitscriptVersion),
            n('uuid', schematicUuid),
            n('paper', paperSize),

            // lib_symbols
            n('lib_symbols',
                ...keepComponents.map(rc => this.buildLibrarySymbol(rc))
            ),

            // Wires and junctions
            ...sheetFrames.flatMap(sf => this.buildWires(sf)),
            ...sheetFrames.flatMap(sf => this.buildJunctions(sf)),
            ...sheetFrames.flatMap(sf => this.buildFrameRectangles(sf)),

            // Component instance placements
            ...keepComponents.map(rc =>
                this.buildSymbolPlacement(rc, netListMap, schematicUuid, projectName)
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
     * The symbol's geometry has all transforms (flip, rotation) baked in so
     * the instance placement uses angle 0.
     */
    private buildLibrarySymbol(rc: RenderComponent): N {
        const {symbolId:symbolId, symbolPart} = this.librarySymbolId(rc);
        const drawing = rc.symbol.drawing;
        const angle = drawing.angle;
        const flipX = drawing.flipX;
        const flipY = drawing.flipY;
        const isCustomSymbol = rc.symbol instanceof SymbolCustom;

        const children: Array<string | number | RawAtom | N> = [];

        if (rc.component.parameters.has('net_name')) {
            children.push(n('power'));
            children.push(
                n('property', 'Reference', '#PWR',
                    n('at', raw(0), raw(0), raw(0)),
                    n('effects', n('font', n('size', raw(1.27), raw(1.27))), n('hide', raw('yes')))
                )
            );
        }

        children.push(n('exclude_from_sim', raw('no')));
        children.push(n('in_bom', raw('yes')));
        children.push(n('on_board', raw('yes')));
        
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

                let feat = Geometry.flip(item as Feature, flipX, flipY);
                feat = Geometry.rotateDegs(feat, angle, drawing.mainOrigin);
                subSymChildren.push(this.buildFeature(feat, fillType, lineWidth));
            }
        }

        // Pins inside _1_1
        const isPower = rc.component.parameters.has('net_name');
        for (const pin of drawing.pins) {
            const pinNode = this.buildLibraryPin(pin, flipX, flipY, angle, drawing, isPower);
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
     */
    private transformedLabels(rc: RenderComponent): {
        index: number;
        name: string;
        text: string;
        x: number; y: number;
        kicadAngle: number; fontSizeMM: number;
        anchor: HorizontalAlign; vanchor: VerticalAlign;
    }[] {
        const drawing = rc.symbol.drawing;
        const angle = drawing.angle;
        const flipX = drawing.flipX;
        const flipY = drawing.flipY;

        return drawing.getLabels().map((label, index) => {
            let feat = Geometry.flip(label, flipX, flipY);
            feat = Geometry.rotateDegs(feat, angle, drawing.mainOrigin);

            const transformed = feat as Textbox;
            const [ax, ay] = transformed.getLabelPosition();

            const styleAngle = label.style?.angle?.toNumber() ?? 0;
            let kicadAngle = -(styleAngle + angle);

            if (kicadAngle < 0){
                kicadAngle += 360;
            }

            const fontSizeMils = label.style?.fontSize?.toNumber() ?? 50;
            const fontSizeMM = fontSizeMils * 0.0254;

            const anchor = label.style?.anchor ?? HorizontalAlign.Left;
            const vanchor = label.style?.vanchor ?? VerticalAlign.Bottom;

            return { index, name: label.id, text: label.text,
                x: ax.toNumber(), y: ay.toNumber(),
                kicadAngle, fontSizeMM, anchor, vanchor };
        });
    }

    /**
     * Build KiCad (property ...) nodes for all Textbox items in the drawing,
     * for use inside a lib_symbol (no placement offset, Y not negated).
     */
    private buildLibraryLabels(rc: RenderComponent): N[] {
        return this.buildLabels(rc, false);
    }

    /**
     * Build KiCad (property ...) nodes for all Textbox items in the drawing,
     * for use inside a symbol instance placement (with component origin added).
     */
    private buildPlacementLabels(rc: RenderComponent): N[] {
        return this.buildLabels(rc, true);
    }

    private buildLabels(rc: RenderComponent, useComponentOrigin: boolean): N[] {
        const offsetX = useComponentOrigin ? rc.x.toNumber() : 0;
        const offsetY = useComponentOrigin ? rc.y.toNumber() : 0;

        return this.transformedLabels(rc)
            .filter(({ name }) => {
                if (name) {
                    return !name.startsWith('pin-id_') && !name.startsWith('pin-name_');
                } else {
                    return true;
                }
            })
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
                const justifyParts = [justifyH, justifyV].filter(Boolean) as string[];

                const effectsChildren: Array<N | RawAtom> = [
                    n('font', n('size', raw(mm(fontSizeMM)), raw(mm(fontSizeMM))))
                ];
                if (justifyParts.length > 0) {
                    effectsChildren.push(n('justify', ...justifyParts.map(p => raw(p))));
                }

                // Schematic space = CircuitScript Y-down; add placement origin, no Y negation
                return n('property', propName, text,
                    n('at', raw(mm(offsetX + x)), raw(mm(offsetY + y)), raw(kicadAngle)),
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
        netListMap: Map<string, Map<string, string>>,
        schematicUuid: string, projectName: string): N {

        const {symbolId: symName} = this.librarySymbolId(rc);
        const x = rc.x.toNumber();
        const y = rc.y.toNumber();
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

        // Transforms baked into lib_symbol – use angle 0 here
        return n('symbol',
            n('lib_id', symName),
            n('at', raw(mm(x)), raw(mm(y)), raw(0)),
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

    /** Unique lib_symbol name for a component instance, prefixed with the project name as the library. */
    private librarySymbolId(rc: RenderComponent): {
        symbolId: string,
        symbolPart: string,
    } {
        const refdes = rc.component.assignedRefDes ?? rc.component.instanceName;
        const unit = rc.unitId !== '__default' ? `_${rc.unitId}` : '';
        // Sanitize the symbol part: replace colons with underscores since KiCad
        // parses colons as library:symbol separators and the symbol part must not
        // start with a digit.
        const symbolPart = `${refdes}${unit}_sym`.replace(/:/g, '_');
        return {
            symbolId: `${this.currentProjectName}:${symbolPart}`,
            symbolPart,
        }
    }

}
