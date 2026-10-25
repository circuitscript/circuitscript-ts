/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'preact/hooks';
import type { FunctionComponent } from 'preact';
import type { ComponentMeta, ExportType, FrameMeta, PreviewTransport } from '../types';
import { buildNetKey } from '../lib/net';
import { searchRefdes } from '../lib/search';
import { previewStyles } from './styles';
import { Toolbar } from './Toolbar';
import { Viewport, type ViewportHandle } from './Viewport';
import { InspectorPanel } from './InspectorPanel';

export interface PreviewAppProps {
  transport: PreviewTransport;
  activeDocumentFilePath: string | null;
  svgMarkup: string;
  componentsById: Record<string, ComponentMeta>;
  /** Defaults to {}: consumers that don't yet pass frame metadata simply get no frame click affordance. */
  framesById?: Record<string, FrameMeta>;
  /** Fires when a frame title is selected/deselected in the viewport - e.g. for click-to-jump. */
  onFrameSelect?: (frame: FrameMeta | null) => void;
  error: string | null;
  /** Default true: the extension sends error as an HTML string (a styled <div>), not plain text. */
  errorIsHtml?: boolean;
  exportOptions: { type: ExportType; label: string }[];
  pendingActions: Set<ExportType | 'refdes' | 'erc'>;
}

export const PreviewApp: FunctionComponent<PreviewAppProps> = ({
  transport,
  activeDocumentFilePath,
  svgMarkup,
  componentsById,
  framesById = {},
  onFrameSelect,
  error,
  errorIsHtml = true,
  exportOptions,
  pendingActions,
}) => {
  const viewportRef = useRef<ViewportHandle>(null);
  const [selectedDomId, setSelectedDomId] = useState<string | null>(null);
  const [selectedFrameDomId, setSelectedFrameDomId] = useState<string | null>(null);

  const selectedMeta = selectedDomId ? componentsById[selectedDomId] ?? null : null;
  const selectedFrameMeta = selectedFrameDomId ? framesById[selectedFrameDomId] ?? null : null;

  // Sticky selection: if the currently selected component still exists in a
  // newly-arrived componentsById, keep it selected; otherwise clear it (the
  // underlying DOM/metadata it pointed to is gone).
  useEffect(() => {
    if (selectedDomId && !(selectedDomId in componentsById)) {
      setSelectedDomId(null);
    }
  }, [componentsById, selectedDomId]);

  useEffect(() => {
    if (selectedFrameDomId && !(selectedFrameDomId in framesById)) {
      setSelectedFrameDomId(null);
    }
  }, [framesById, selectedFrameDomId]);

  const handleNetClick = useCallback((netName: string) => {
    viewportRef.current?.highlightNet(buildNetKey(netName));
  }, []);

  const handleClose = useCallback(() => {
    setSelectedDomId(null);
    setSelectedFrameDomId(null);
  }, []);

  const handleSelectFrame = useCallback(
    (domId: string | null) => {
      setSelectedFrameDomId(domId);
      onFrameSelect?.(domId ? framesById[domId] ?? null : null);
    },
    [framesById, onFrameSelect]
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [searchedQuery, setSearchedQuery] = useState<string | null>(null);
  const [resultIndex, setResultIndex] = useState(-1);

  const results = useMemo(
    () => (searchedQuery ? searchRefdes(componentsById, searchedQuery) : []),
    [componentsById, searchedQuery]
  );

  // Live reload: keep the index within the new result list, no auto-jump.
  useEffect(() => {
    if (resultIndex >= results.length) {
      setResultIndex(results.length - 1);
    }
  }, [results, resultIndex]);

  const jumpTo = useCallback((list: string[], index: number) => {
    setResultIndex(index);
    setSelectedDomId(list[index]);
    setSelectedFrameDomId(null);
    viewportRef.current?.centerOn(list[index]);
  }, []);

  const stepResult = useCallback(
    (delta: number) => {
      if (results.length === 0) return;
      const base = resultIndex < 0 ? 0 : resultIndex;
      jumpTo(results, (base + delta + results.length) % results.length);
    },
    [results, resultIndex, jumpTo]
  );

  const handleSearchQueryChange = useCallback((q: string) => {
    setSearchQuery(q);
    if (!q.trim()) {
      setSearchedQuery(null);
      setResultIndex(-1);
    }
  }, []);

  const handleSearchSubmit = useCallback(() => {
    const q = searchQuery.trim();
    if (!q) return;
    if (q === searchedQuery) {
      stepResult(1);
      return;
    }
    const list = searchRefdes(componentsById, q);
    setSearchedQuery(q);
    if (list.length > 0) {
      jumpTo(list, 0);
    } else {
      setResultIndex(-1);
    }
  }, [searchQuery, searchedQuery, componentsById, stepResult, jumpTo]);

  const hasActiveFile = !!activeDocumentFilePath && activeDocumentFilePath.trim() !== '';

  return (
    <>
      <style>{previewStyles}</style>
      <Toolbar
        exportOptions={exportOptions}
        hasActiveFile={hasActiveFile}
        pendingActions={pendingActions}
        activeDocumentFilePath={activeDocumentFilePath}
        onZoomIn={() => viewportRef.current?.zoomIn()}
        onZoomOut={() => viewportRef.current?.zoomOut()}
        onZoomFit={() => viewportRef.current?.zoomFit()}
        onExport={(type) => {
          transport.requestExport(type);
        }}
        onApplyRefdes={() => {
          transport.applyRefdes();
        }}
        onRunErc={() => {
          transport.runErcCheck();
        }}
        searchQuery={searchQuery}
        onSearchQueryChange={handleSearchQueryChange}
        resultCount={results.length}
        currentResultIndex={resultIndex}
        hasSearched={searchedQuery !== null}
        onSearchSubmit={handleSearchSubmit}
        onSearchPrev={() => stepResult(-1)}
        onSearchNext={() => stepResult(1)}
      />
      <div id="svg-view-area">
        {error && errorIsHtml && (
          <div id="error-output" style={{ display: 'block' }} dangerouslySetInnerHTML={{ __html: error }} />
        )}
        {error && !errorIsHtml && (
          <div id="error-output" style={{ display: 'block' }}>
            {error}
          </div>
        )}
        <Viewport
          ref={viewportRef}
          svgMarkup={svgMarkup}
          componentsById={componentsById}
          selectedDomId={selectedDomId}
          onSelect={setSelectedDomId}
          framesById={framesById}
          selectedFrameDomId={selectedFrameDomId}
          onSelectFrame={handleSelectFrame}
        />
        <InspectorPanel
          meta={selectedMeta}
          frameMeta={selectedFrameMeta}
          onClose={handleClose}
          onNetClick={handleNetClick}
          onSourceClick={transport.navigateToSource
            ? (file, line) => transport.navigateToSource!(file, line)
            : undefined}
        />
      </div>
    </>
  );
};
