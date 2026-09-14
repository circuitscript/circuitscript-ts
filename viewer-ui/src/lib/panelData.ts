/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { ComponentMeta, FrameMeta } from '../types';
import { sheetIndexFromDomId } from './net';

// Ported verbatim from preview.html's formatPinType. No default case is
// intentional: unrecognized pin types fall through to `undefined`, existing
// behavior preserved as-is rather than "fixed".
export function formatPinType(type: string): string | undefined {
  switch (type) {
    case 'passive':
      return 'Passive';
    case 'any':
      return 'Any';

    case 'input':
      return 'Input';
    case 'output':
      return 'Output';
    case 'io':
      return 'IO';

    case 'hiz':
      return 'High impedance';
    case 'open_collector':
      return 'Open collector';
    case 'open_emitter':
      return 'Open emitter';

    case 'power':
      return 'Power';
    case 'power_reference':
      return 'Power reference';
    case 'power_input':
      return 'Power input';
    case 'power_output':
      return 'Power output';

    case 'no_connect':
      return 'No connect';
    case 'bus':
      return 'Bus';
  }
  return undefined;
}

export interface PanelPinData {
  id: string;
  name: string;
  typeLabel: string | undefined;
  netName: string | null | undefined;
}

export interface PanelParamData {
  key: string;
  value: string;
}

export interface PanelData {
  title: string;
  isNet: boolean;
  netName?: string;
  sheetIndex: string;
  instanceId: string;
  sourceLine: number | null;
  sourceFile: string | null;
  pins: PanelPinData[];
  params: PanelParamData[];
}

export function getPanelData(meta: ComponentMeta): PanelData {
  const sheetIndex = sheetIndexFromDomId(meta.domId);
  const isNet = meta.kind === 'net';
  const isGraphic = meta.kind === 'graphic';

  const netNameItem = isNet ? meta.params.find((item) => item.key === 'net_name') : undefined;
  const netName = netNameItem?.value;

  let title = meta.refDes || meta.instanceName;
  if (isNet) {
    title = 'Net: ' + (netName ?? '');
  } else if (isGraphic) {
    title = 'Graphic';
  }

  return {
    title,
    isNet,
    netName,
    sheetIndex,
    instanceId: meta.instanceName,
    sourceLine: meta.sourceLine,
    sourceFile: meta.sourceFile,
    pins: meta.pins.map((pin) => ({
      id: pin.id,
      name: pin.name,
      typeLabel: formatPinType(pin.type),
      netName: pin.netName,
    })),
    params: meta.params,
  };
}

export interface FramePanelData {
  title: string;
  sourceLine: number | null;
}

export function getFramePanelData(meta: FrameMeta): FramePanelData {
  return {
    title: meta.title,
    sourceLine: meta.sourceLine,
  };
}
