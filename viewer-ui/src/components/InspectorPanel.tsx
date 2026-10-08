/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useCallback, useEffect, useRef, useState } from 'preact/hooks';
import type { FunctionComponent, JSX } from 'preact';
import type { ComponentMeta, FrameMeta } from '../types';
import { getPanelData, getFramePanelData } from '../lib/panelData';

const PANEL_MIN_WIDTH = 220;

export interface InspectorPanelProps {
  meta: ComponentMeta | null;
  frameMeta?: FrameMeta | null;
  onClose: () => void;
  onNetClick: (netName: string) => void;
  onSourceClick?: (file: string | null, line: number) => void;
}

const SourceLine: FunctionComponent<{
  line: number;
  file: string | null;
  onClick?: (file: string | null, line: number) => void;
}> = ({ line, file, onClick }) => {
  if (!onClick) {
    return <div className="cs-source-line">Line {line}</div>;
  }
  const go = () => onClick(file, line);
  return (
    <div
      className="cs-source-line cs-source-link"
      role="button"
      tabIndex={0}
      title="Go to source"
      onClick={go}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          go();
        }
      }}
    >
      Line {line}
      <svg className="cs-source-link-icon" viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
        <path d="M5 11L11 5M6 5h5v5" />
      </svg>
    </div>
  );
};

export const InspectorPanel: FunctionComponent<InspectorPanelProps> = ({ meta, frameMeta = null, onClose, onNetClick, onSourceClick }) => {
  const [width, setWidth] = useState(300);
  const [isResizing, setIsResizing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const resizeStateRef = useRef({ startX: 0, startWidth: 0 });

  const isOpen = meta !== null || frameMeta !== null;
  const panelData = meta ? getPanelData(meta) : null;
  const framePanelData = !meta && frameMeta ? getFramePanelData(frameMeta) : null;

  const handleResizeStart = useCallback((event: JSX.TargetedPointerEvent<HTMLDivElement>) => {
    resizeStateRef.current = { startX: event.clientX, startWidth: panelRef.current?.getBoundingClientRect().width ?? width };
    setIsResizing(true);
    event.preventDefault();
  }, [width]);

  useEffect(() => {
    if (!isResizing) return undefined;
    const handleMove = (event: PointerEvent) => {
      const viewport = panelRef.current?.parentElement;
      const viewportWidth = viewport?.getBoundingClientRect().width ?? Infinity;
      const maxWidth = Math.max(PANEL_MIN_WIDTH, viewportWidth - 40);
      const { startX, startWidth } = resizeStateRef.current;
      let newWidth = startWidth - (event.clientX - startX);
      newWidth = Math.min(maxWidth, Math.max(PANEL_MIN_WIDTH, newWidth));
      setWidth(newWidth);
    };
    const endResize = () => setIsResizing(false);
    document.addEventListener('pointermove', handleMove);
    document.addEventListener('pointerup', endResize);
    document.addEventListener('pointercancel', endResize);
    return () => {
      document.removeEventListener('pointermove', handleMove);
      document.removeEventListener('pointerup', endResize);
      document.removeEventListener('pointercancel', endResize);
    };
  }, [isResizing]);

  return (
    <div
      id="cs-panel"
      ref={panelRef}
      className={`${isOpen ? '' : 'cs-hidden'}${isResizing ? ' cs-resizing' : ''}`.trim()}
      style={{ width }}
    >
      <div id="cs-panel-resize-handle" onPointerDown={handleResizeStart} />
      <button id="cs-panel-close" onClick={onClose}>
        &times;
      </button>
      <div id="cs-panel-content">
        {framePanelData && (
          <>
            <h2>{framePanelData.title}</h2>
            {framePanelData.sourceLine != null && (
              <SourceLine line={framePanelData.sourceLine} file={framePanelData.sourceFile} onClick={onSourceClick} />
            )}
          </>
        )}
        {panelData && (
          <>
            <h2>
              {panelData.isNet && panelData.netName ? (
                <span
                  className="cs-net-link"
                  onClick={() => onNetClick(panelData.netName!)}
                >
                  {panelData.title}
                </span>
              ) : (
                panelData.title
              )}
            </h2>
            {panelData.sourceLine != null && (
              <SourceLine line={panelData.sourceLine} file={panelData.sourceFile} onClick={onSourceClick} />
            )}
            <h3>Pins</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Pin Type</th>
                  <th>Net</th>
                </tr>
              </thead>
              <tbody>
                {panelData.pins.map((pin) => (
                  <tr key={pin.id}>
                    <td>{pin.id}</td>
                    <td>{pin.name}</td>
                    <td>{pin.typeLabel}</td>
                    {pin.netName ? (
                      <td
                        className="cs-net-link"
                        onClick={() => onNetClick(pin.netName!)}
                      >
                        {pin.netName}
                      </td>
                    ) : (
                      <td />
                    )}
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>Parameters</h3>
            <table className="parameters">
              <thead>
                <tr>
                  <th>Key</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {panelData.params.map((param, index) => (
                  <tr key={`${param.key}-${index}`}>
                    <td>{param.key}</td>
                    <td>{param.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};
