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
  searchQuery: string;
  onSearchQueryChange: (q: string) => void;
  resultCount: number;
  currentResultIndex: number;
  hasSearched: boolean;
  onSearchSubmit: () => void;
  onSearchPrev: () => void;
  onSearchNext: () => void;
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
    searchQuery,
    onSearchQueryChange,
    resultCount,
    currentResultIndex,
    hasSearched,
    onSearchSubmit,
    onSearchPrev,
    onSearchNext,
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

            <div id="search-box">
                <input
                    type="text"
                    id="search-input"
                    placeholder="Search refdes (R*, C1?)"
                    value={searchQuery}
                    onInput={(e) => onSearchQueryChange((e.target as HTMLInputElement).value)}
                    onKeyDown={(e) => {
                        e.stopPropagation();
                        if (e.key === 'Enter') {
                            if (e.shiftKey) onSearchPrev();
                            else onSearchSubmit();
                        } else if (e.key === 'Escape') {
                            onSearchQueryChange('');
                        }
                    }}
                />
                <button className="toolbar-btn" type="button" title="Search" onClick={onSearchSubmit}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8">
                        <circle cx="6.5" cy="6.5" r="4.5" />
                        <line x1="10" y1="10" x2="14.5" y2="14.5" />
                    </svg>
                </button>
                {hasSearched && (
                    <>
                        <button
                            className="toolbar-btn"
                            type="button"
                            title="Previous result"
                            disabled={resultCount <= 1}
                            onClick={onSearchPrev}
                        >
                            &uarr;
                        </button>
                        <button
                            className="toolbar-btn"
                            type="button"
                            title="Next result"
                            disabled={resultCount <= 1}
                            onClick={onSearchNext}
                        >
                            &darr;
                        </button>
                        <span id="search-count">
                            {resultCount > 0 ? `${currentResultIndex + 1} of ${resultCount} results` : 'No results'}
                        </span>
                    </>
                )}
            </div>

            <span id="file-path">{activeDocumentFilePath || '(No file)'}</span>
        </div>
    );
};
