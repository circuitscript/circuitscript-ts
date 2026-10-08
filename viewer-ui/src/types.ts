/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// Shared types for the preview UI, used by both the VSCode extension and Bench.

export interface ComponentPinMeta {
  id: string;
  name: string;
  type: string;
  side: string;
  position: number;
  netName: string | null;
}

export interface ComponentMeta {
  domId: string;
  /* Component type name (e.g. "resistor"), kept for backward compat with Bench's usage. */
  type: string;
  refDes: string | null;
  instanceName: string;
  /* Line/file of the add/at/to statement that first added this component to the circuit graph. Null if never added. */
  sourceLine: number | null;
  sourceFile: string | null;
  params: { key: string; value: string }[];
  pins: ComponentPinMeta[];
  /*
   * Discriminant for what this entry represents. The extension currently overloads
   * `type` for this ("net"/"graphic" vs. a component type name); `kind` is the
   * disambiguated replacement PreviewApp/InspectorPanel should switch on.
   */
  kind: 'component' | 'net' | 'graphic';
}

export interface FrameMeta {
  domId: string;
  frameId: number;
  sheetIndex: number;
  title: string;
  sourceLine: number | null;
  sourceFile: string | null;
  bounds: { x: number; y: number; width: number; height: number } | null;
}

export type ExportType = 'svg' | 'pdf' | 'bom' | 'netlist' | 'kicad_sch' | 'html';

export interface PreviewTransport {
  requestPreview(): void;
  requestExport(type: ExportType): Promise<void>;
  applyRefdes(): Promise<void>;
  runErcCheck(): Promise<void>;
  /* Optional: reveal a source location in the host editor. Line is 1-based. */
  navigateToSource?(file: string | null, line: number): void;
}
