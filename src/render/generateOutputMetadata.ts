/*
 * Copyright 2023 Liu Weihao
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SheetFrame } from './layout.js';
import { boundBoxToRect } from './render.js';
import { sanitizeDomId } from '../utils.js';
import { ComponentTypes, FrameType } from '../globals.js';
import { NumericValue } from '../objects/NumericValue.js';
import { FixedFrameIds, FrameParamKeys } from '../objects/Frame.js';

export type FrameMeta = {
    domId: string;
    frameId: number;
    sheetIndex: number;
    title: string;
    sourceLine: number | null;
    sourceFile: string | null;
    bounds: { x: number; y: number; width: number; height: number } | null;
};

export type ComponentPinMeta = {
    id: string;
    name: string;
    type: string;
    side: string;
    position: number;
    netName: string | null;
};

export type ComponentMeta = {
    domId: string;
    type: ComponentTypes,
    refDes: string | null;
    instanceName: string;
    // Line/file of the first statement (assignment, add/at/to) that
    // referenced this component, derived from ctxReferences[0]. Null if the
    // component was never referenced.
    sourceLine: number | null;
    sourceFile: string | null;
    params: { key: string; value: string }[];
    pins: ComponentPinMeta[];
};

function stringifyParamValue(value: number | string | NumericValue): string {
    if (value instanceof NumericValue) {
        return value.toDisplayString();
    }
    return String(value);
}

export function generateFrameMetadata(sheetFrames: SheetFrame[]): FrameMeta[] {
    const result: FrameMeta[] = [];

    sheetFrames.forEach((sheet, sheetIndex) => {
        sheet.frames.forEach(renderFrame => {
            const frame = renderFrame.frame;

            // synthetic title-only wrapper frame - not a real user frame
            if (renderFrame.containsTitle) return;

            if (frame.frameId === FixedFrameIds.BaseFrame
                || frame.frameId === FixedFrameIds.FrameIdNotUsed) return;

            // sheet titles are drawn via drawSheetFrameBorder, never tagged
            // with cs-frame-title - out of scope for this plan.
            if (frame.frameType === FrameType.Sheet) return;

            const title = frame.parameters.get(FrameParamKeys.Title);
            if (title === undefined || title === null) return; // nothing to click

            result.push({
                domId: sanitizeDomId(`frame-${sheetIndex}-${frame.frameId}`),
                frameId: frame.frameId,
                sheetIndex,
                title: String(title),
                sourceLine: frame.sourceLine,
                sourceFile: frame.sourceFile,
                bounds: renderFrame.bounds
                    ? boundBoxToRect(renderFrame.bounds,
                        { x: renderFrame.x.toNumber(), y: renderFrame.y.toNumber() })
                    : null,
            });
        });
    });

    return result;
}

export function generateComponentMetadata(sheetFrames: SheetFrame[]): ComponentMeta[] {
    const result: ComponentMeta[] = [];

    const nc_nets: string[] = [];

    sheetFrames.forEach((sheet, sheetIndex) => {
        // Get nets that have NC component.
        for (const item of sheet.components) {
            const { component } = item;
            if (component.typeProp === ComponentTypes.graphic
                && component.hasParam('no_connect')
                && component.getParam('no_connect') === true
            ) {
                nc_nets.push(
                    component.pinNets.get(component.getDefaultPin())!.toString());
            }
        }

        for (const item of sheet.components) {
            const { component: instance } = item;
            const pins = Array.from(instance.pins.values()).sort((a, b) => {
                const av = Number(a.id.toString());
                const bv = Number(b.id.toString());
                const aNum = Number.isFinite(av);
                const bNum = Number.isFinite(bv);
                if (aNum && bNum) return av - bv;
                if (aNum) return -1;
                if (bNum) return 1;
                return a.id.toString().localeCompare(b.id.toString());
            }).map(p => {
                let usePinName = p.name;
                if (p.name instanceof NumericValue) {
                    usePinName = (p.name as NumericValue).toNumber().toString();
                }

                let netName: string | null = null;
                for (const [pinId, net] of instance.pinNets) {
                    if (pinId.equals(p.id)) {
                        netName = net.name;
                        // If pin is on a NC net, then do not display the
                        // net name.
                        if (nc_nets.indexOf(net.toString()) !== -1) {
                            netName = null;
                        }
                        break;
                    }
                }

                return {
                    id: p.id.toString(),
                    name: usePinName,
                    type: p.pinType,
                    side: p.side,
                    position: p.position,
                    netName,
                }
            });

            const firstCtxReference = instance.ctxReferences[0];

            result.push({
                domId: sanitizeDomId(`comp-${sheetIndex}-${instance.instanceName}`),
                type: instance.typeProp,
                refDes: instance.assignedRefDes,
                instanceName: instance.instanceName,
                sourceLine: firstCtxReference?.ctx.start?.line ?? null,
                sourceFile: firstCtxReference?.filePath ?? null,
                params: Array.from(instance.parameters.entries()).map(([key, value]) => ({
                    key,
                    value: stringifyParamValue(value),
                })),
                pins,
            });
        }
    });

    return result;
}
