/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useEffect, useRef, useState } from 'preact/hooks';
import type { FunctionComponent } from 'preact';
import type { ExportType } from '../types';

export interface ToolbarProps {
  exportOptions: { type: ExportType; label: string }[];
  hasActiveFile: boolean;
  pendingActions: Set<ExportType | 'refdes' | 'erc'>;
  activeDocumentFilePath: string | null;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomFit: () => void;
  onExport: (type: ExportType) => void;
  onApplyRefdes: () => void;
  onRunErc: () => void;
}

export const Toolbar: FunctionComponent<ToolbarProps> = ({
  exportOptions,
  hasActiveFile,
  pendingActions,
  activeDocumentFilePath,
  onZoomIn,
  onZoomOut,
  onZoomFit,
  onExport,
  onApplyRefdes,
  onRunErc,
}) => {
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const exportMenuRef = useRef<HTMLDivElement>(null);

  // Close the export dropdown on outside click, ported from webview-shell.html's
  // export-menu/dropdown-toggle click-outside handling.
  useEffect(() => {
    if (!isExportMenuOpen) return undefined;
    const handleClickOutside = (event: MouseEvent) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
        setIsExportMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isExportMenuOpen]);

  const anyExportPending = exportOptions.some((opt) => pendingActions.has(opt.type));
  const exportMenuDisabled = !hasActiveFile || anyExportPending;

  const handleExportClick = (type: ExportType) => {
    setIsExportMenuOpen(false);
    onExport(type);
  };

  return (
    <div id="toolbar">
      <button className="toolbar-btn" type="button" title="Zoom in" onClick={onZoomIn}>
        +
      </button>
      <button className="toolbar-btn" type="button" title="Zoom out" onClick={onZoomOut}>
        &minus;
      </button>
      <button className="toolbar-btn" type="button" title="Show all" onClick={onZoomFit}>
        Show all
      </button>
      <button
        className="toolbar-btn"
        type="button"
        disabled={!hasActiveFile || pendingActions.has('refdes')}
        onClick={onApplyRefdes}
      >
              Apply Refdes
          </button>
          <button
              className="toolbar-btn"
              type="button"
              disabled={!hasActiveFile || pendingActions.has('erc')}
              onClick={onRunErc}
          >
              Run ERC
          </button>

          {exportOptions.length > 0 && (
              <div className="dropdown" id="export-dropdown" ref={exportMenuRef}>
                  <button
                      className="dropdown-toggle"
                      type="button"
                      disabled={exportMenuDisabled}
                      onClick={() => setIsExportMenuOpen((prev) => !prev)}
                  >
                      Export
                  </button>
                  <div className={`dropdown-menu${isExportMenuOpen ? ' open' : ''}`}>
                      {exportOptions.map((option) => (
                          <button
                              key={option.type}
                              className="dropdown-item"
                              type="button"
                              disabled={!hasActiveFile || pendingActions.has(option.type)}
                              onClick={() => handleExportClick(option.type)}
                          >
                              {option.label}
                          </button>
                      ))}
                  </div>
              </div>
          )}

          <span id="file-path">{activeDocumentFilePath || '(No file)'}</span>
      </div>
  );
};
