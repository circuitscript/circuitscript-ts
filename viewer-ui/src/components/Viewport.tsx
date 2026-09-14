/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { forwardRef, useImperativeHandle } from 'preact/compat';
import type { JSX } from 'preact';
import type { ComponentMeta, FrameMeta } from '../types';
import { zoomBy, computeFitTransform, type Point } from '../lib/zoom';
import { positionHighlight, positionBoundsRect, type BboxCache } from '../lib/bbox';

const SVG_NS = 'http://www.w3.org/2000/svg';
const NET_HIGHLIGHT_CLASS = 'cs-net-highlighted';
const FRAME_HIGHLIGHT_COLOR = '#9c27b0';

function makeHighlightRect(): SVGRectElement {
  const rect = document.createElementNS(SVG_NS, 'rect');
  rect.setAttribute('fill', 'none');
  rect.setAttribute('stroke-width', '2');
  rect.setAttribute('vector-effect', 'non-scaling-stroke');
  rect.style.pointerEvents = 'none';
  return rect;
}

// Frame bounding-box overlay: unlike component highlights, a frame's box
// comes directly from its metadata's `bounds` field (computed by layout)
// rather than from getBBox() on a single element - a frame's bounds span
// many DOM elements, not one. So this rect is positioned directly from
// FrameMeta.bounds and appended into the SVG root rather than a target
// element.
function makeFrameBoundsRect(): SVGRectElement {
  const rect = makeHighlightRect();
  rect.setAttribute('stroke', FRAME_HIGHLIGHT_COLOR);
  rect.setAttribute('stroke-dasharray', '6 4');
  return rect;
}

export interface ViewportHandle {
  zoomIn(): void;
  zoomOut(): void;
  zoomFit(): void;
  highlightNet(netKey: string): void;
  clearNetHighlight(): void;
}

export interface ViewportProps {
  svgMarkup: string;
  componentsById: Record<string, ComponentMeta>;
  selectedDomId: string | null;
  onSelect: (domId: string | null) => void;
  framesById: Record<string, FrameMeta>;
  selectedFrameDomId: string | null;
  onSelectFrame: (domId: string | null) => void;
}

// Exposes zoom controls and net-highlight triggers via a forwardRef +
// useImperativeHandle imperative handle rather than a callback-ref/lifted-state
// prop, so Toolbar (zoom buttons) and InspectorPanel (net links), both siblings
// of Viewport, can drive it through a single ref held by PreviewApp.
export const Viewport = forwardRef<ViewportHandle, ViewportProps>(function Viewport(
  { svgMarkup, componentsById, selectedDomId, onSelect, framesById, selectedFrameDomId, onSelectFrame },
  ref
) {
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState<Point>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const [svgOpacity, setSvgOpacity] = useState(0);

  const viewportRef = useRef<HTMLDivElement>(null);
  const panZoomRef = useRef<HTMLDivElement>(null);

  const scaleRef = useRef(scale);
  scaleRef.current = scale;
  const translateRef = useRef(translate);
  translateRef.current = translate;

  const svgInternalScaleRef = useRef(1);
  const bboxCacheRef = useRef<BboxCache>(new WeakMap());
  const hasFittedRef = useRef(false);

  const selectedHighlightRef = useRef<SVGRectElement | undefined>(undefined);
  if (!selectedHighlightRef.current) {
    selectedHighlightRef.current = makeHighlightRect();
    selectedHighlightRef.current.style.stroke = 'var(--cs-highlight-selected)';
  }
  const hoverHighlightRef = useRef<SVGRectElement | undefined>(undefined);
  if (!hoverHighlightRef.current) {
    hoverHighlightRef.current = makeHighlightRect();
    hoverHighlightRef.current.style.stroke = 'var(--cs-highlight-hover)';
  }
  const frameHighlightRef = useRef<SVGRectElement | undefined>(undefined);
  if (!frameHighlightRef.current) {
    frameHighlightRef.current = makeFrameBoundsRect();
  }
  const highlightedNetElsRef = useRef<Element[]>([]);

  const dragStateRef = useRef({ dragging: false, startX: 0, startY: 0, translateStartX: 0, translateStartY: 0 });

  // React's dangerouslySetInnerHTML diffs the { __html } object by reference,
  // not by string value, so an inline literal would re-assign innerHTML (and
  // destroy any mid-interaction DOM state) on every render, not just when
  // svgMarkup actually changes. Memoizing keeps the reference stable.
  const svgHtml = useMemo(() => ({ __html: svgMarkup }), [svgMarkup]);
  const hasContent = !!svgMarkup;

  const applyTransform = useCallback((nextScale: number, nextTranslate: Point) => {
    setScale(nextScale);
    setTranslate(nextTranslate);
    scaleRef.current = nextScale;
    translateRef.current = nextTranslate;
  }, []);

  const attachedRects = useMemo(
    () => [selectedHighlightRef.current!, hoverHighlightRef.current!],
    []
  );

  const refreshHighlightPositions = useCallback(() => {
    const selRect = selectedHighlightRef.current!;
    if (selRect.parentNode) {
      positionHighlight(
        selRect,
        selRect.parentNode as SVGGraphicsElement,
        svgInternalScaleRef.current,
        scaleRef.current,
        bboxCacheRef.current,
        attachedRects
      );
    }
    const hoverRect = hoverHighlightRef.current!;
    if (hoverRect.parentNode) {
      positionHighlight(
        hoverRect,
        hoverRect.parentNode as SVGGraphicsElement,
        svgInternalScaleRef.current,
        scaleRef.current,
        bboxCacheRef.current,
        attachedRects
      );
    }
  }, [attachedRects]);

  const removeHighlight = (rect: SVGRectElement) => {
    if (rect.parentNode) rect.parentNode.removeChild(rect);
  };

  const clearNetHighlight = useCallback(() => {
    for (const el of highlightedNetElsRef.current) {
      el.classList.remove(NET_HIGHLIGHT_CLASS);
    }
    highlightedNetElsRef.current = [];
  }, []);

  const highlightNet = useCallback(
    (netKey: string) => {
      clearNetHighlight();
      const host = panZoomRef.current;
      if (!host || !netKey) return;
      const matches = host.querySelectorAll(`.wires-highlight [data-net="${CSS.escape(netKey)}"]`);
      const matchList: Element[] = [];
      matches.forEach((el) => {
        el.classList.add(NET_HIGHLIGHT_CLASS);
        matchList.push(el);
      });
      highlightedNetElsRef.current = matchList;
    },
    [clearNetHighlight]
  );

  const zoomByFactor = useCallback(
    (factor: number, centerPoint: Point) => {
      const next = zoomBy(scaleRef.current, translateRef.current, factor, centerPoint);
      applyTransform(next.scale, next.translate);
      refreshHighlightPositions();
    },
    [applyTransform, refreshHighlightPositions]
  );

  const zoomIn = useCallback(() => {
    const rect = viewportRef.current?.getBoundingClientRect();
    zoomByFactor(1.2, { x: (rect?.width ?? 0) / 2, y: (rect?.height ?? 0) / 2 });
  }, [zoomByFactor]);

  const zoomOut = useCallback(() => {
    const rect = viewportRef.current?.getBoundingClientRect();
    zoomByFactor(1 / 1.2, { x: (rect?.width ?? 0) / 2, y: (rect?.height ?? 0) / 2 });
  }, [zoomByFactor]);

  const zoomFit = useCallback(() => {
    const svg = panZoomRef.current?.querySelector('svg');
    const vrect = viewportRef.current?.getBoundingClientRect();
    if (!svg || !vrect) return;
    const raw = svg.getBBox();
    const next = computeFitTransform(
      { x: raw.x, y: raw.y, width: raw.width, height: raw.height },
      svgInternalScaleRef.current,
      { width: vrect.width, height: vrect.height }
    );
    applyTransform(next.scale, next.translate);
    refreshHighlightPositions();
  }, [applyTransform, refreshHighlightPositions]);

  useImperativeHandle(ref, () => ({ zoomIn, zoomOut, zoomFit, highlightNet, clearNetHighlight }), [
    zoomIn,
    zoomOut,
    zoomFit,
    highlightNet,
    clearNetHighlight,
  ]);

  // Pointer-based panning. Pointer capture is deliberately not used here:
  // capturing the pointer on the viewport also retargets the resulting
  // 'click' event to the captured element, which breaks click-to-select on
  // the actual component under the cursor. Tracking move/up on 'document'
  // instead handles drags that leave the viewport bounds (e.g. over the side
  // panel) without that side effect.
  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      const drag = dragStateRef.current;
      if (!drag.dragging) return;
      const nextTranslate = {
        x: drag.translateStartX + (event.clientX - drag.startX),
        y: drag.translateStartY + (event.clientY - drag.startY),
      };
      translateRef.current = nextTranslate;
      setTranslate(nextTranslate);
    };
    const endDrag = () => {
      if (!dragStateRef.current.dragging) return;
      dragStateRef.current.dragging = false;
      setIsDragging(false);
    };
    document.addEventListener('pointermove', handleMove);
    document.addEventListener('pointerup', endDrag);
    document.addEventListener('pointercancel', endDrag);
    return () => {
      document.removeEventListener('pointermove', handleMove);
      document.removeEventListener('pointerup', endDrag);
      document.removeEventListener('pointercancel', endDrag);
    };
  }, []);

  const handlePointerDown = useCallback((event: JSX.TargetedPointerEvent<HTMLDivElement>) => {
    dragStateRef.current = {
      dragging: true,
      startX: event.clientX,
      startY: event.clientY,
      translateStartX: translateRef.current.x,
      translateStartY: translateRef.current.y,
    };
    setIsDragging(true);
  }, []);

  // Wheel zoom centered on the cursor. Attached via a non-passive listener
  // (React's synthetic onWheel can't reliably preventDefault on some
  // browsers/versions) so the page doesn't scroll while zooming.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return undefined;
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const rect = el.getBoundingClientRect();
      const cursor = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      const zoomFactor = Math.exp(-event.deltaY * 0.001);
      zoomByFactor(zoomFactor, cursor);
    };
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [zoomByFactor]);

  // Recompute svgInternalScale and reset the bbox cache whenever the SVG
  // markup changes, then auto-fit only on the first successful render (not
  // on every subsequent live-reload update).
  useEffect(() => {
    bboxCacheRef.current = new WeakMap();
    const svg = panZoomRef.current?.querySelector('svg');
    if (svg) {
      const viewBoxWidth = svg.viewBox?.baseVal?.width;
      const attrWidth = parseFloat(svg.getAttribute('width') || '');
      svgInternalScaleRef.current = viewBoxWidth && attrWidth ? attrWidth / viewBoxWidth : 1;
    } else {
      svgInternalScaleRef.current = 1;
    }

    const isFirstRender = !hasFittedRef.current;
    if (isFirstRender && hasContent) {
        hasFittedRef.current = true;
        zoomFit();
    } else {
        refreshHighlightPositions();
    }
    
    if (svg) setSvgOpacity(1);

  }, [svgMarkup]);

  // Re-attach/reposition the selection highlight whenever the selected
  // component or the underlying DOM (new svgMarkup) changes.
  useEffect(() => {
    const host = panZoomRef.current;
    const selRect = selectedHighlightRef.current!;
    if (!selectedDomId || !host) {
      removeHighlight(selRect);
      return;
    }
    const targetEl = host.querySelector(`#${CSS.escape(selectedDomId)}`) as SVGGraphicsElement | null;
    if (!targetEl) {
      removeHighlight(selRect);
      return;
    }
    positionHighlight(selRect, targetEl, svgInternalScaleRef.current, scaleRef.current, bboxCacheRef.current, attachedRects);
  }, [selectedDomId, svgMarkup]);

  // Re-attach/reposition the frame bounds overlay whenever the selected frame
  // or the underlying metadata/DOM changes. Positioned from FrameMeta.bounds
  // rather than getBBox(). frameMeta.bounds is in the local coordinate space
  // of that sheet's own '.sheet-elements' group (same space the actual frame
  // rect/title are drawn in) - that group carries its own translate() for the
  // sheet's paper margin, and its parent '#sheet-N' group carries another
  // translate() for stacking multiple sheets vertically. Appending to the SVG
  // root directly would skip both, offsetting the overlay from the real frame.
  useEffect(() => {
    const frameRect = frameHighlightRef.current!;
    const meta = selectedFrameDomId ? framesById[selectedFrameDomId] : undefined;
    const sheetElements = meta
      ? panZoomRef.current?.querySelector(`#sheet-${meta.sheetIndex} .sheet-elements`)
      : null;
    if (!sheetElements || !meta || !meta.bounds) {
      if (frameRect.parentNode) frameRect.parentNode.removeChild(frameRect);
      return;
    }
    positionBoundsRect(frameRect, meta.bounds);
    if (frameRect.parentNode !== sheetElements) {
      sheetElements.appendChild(frameRect);
    }
  }, [selectedFrameDomId, framesById, svgMarkup]);

  const handlePointerOver = useCallback((event: JSX.TargetedPointerEvent<HTMLDivElement>) => {
    const target = (event.target as Element).closest?.('.cs-component') as SVGGraphicsElement | null;
    if (!target) {
      removeHighlight(hoverHighlightRef.current!);
      return;
    }
    positionHighlight(
      hoverHighlightRef.current!,
      target,
      svgInternalScaleRef.current,
      scaleRef.current,
      bboxCacheRef.current,
      attachedRects
    );
  }, [attachedRects]);

  const handlePointerOut = useCallback((event: JSX.TargetedPointerEvent<HTMLDivElement>) => {
    const related = (event.relatedTarget as Element | null)?.closest?.('.cs-component');
    if (!related) {
      removeHighlight(hoverHighlightRef.current!);
    }
  }, []);

  const handleClick = useCallback(
    (event: JSX.TargetedMouseEvent<HTMLDivElement>) => {
      const drag = dragStateRef.current;
      if (Math.abs(event.clientX - drag.startX) > 3 || Math.abs(event.clientY - drag.startY) > 3) {
        return;
      }
      const frameTarget = (event.target as Element).closest?.('.cs-frame-title') as Element | null;
      if (frameTarget) {
        const frameMeta = framesById[frameTarget.id];
        onSelect(null);
        onSelectFrame(frameMeta ? frameTarget.id : null);
        return;
      }
      const target = (event.target as Element).closest?.('.cs-component') as Element | null;
      if (!target) {
        onSelect(null);
        onSelectFrame(null);
        return;
      }
      const meta = componentsById[target.id];
      if (!meta) {
        onSelect(null);
        onSelectFrame(null);
        return;
      }
      onSelect(target.id);
      onSelectFrame(null);
    },
    [componentsById, onSelect, framesById, onSelectFrame]
  );

  return (
    <div
      id="cs-viewport"
      ref={viewportRef}
      className={isDragging ? 'cs-dragging' : undefined}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <div
        id="cs-pan-zoom"
        ref={panZoomRef}
        style={{ 
          transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`, 
          opacity: svgOpacity,
        }}
        dangerouslySetInnerHTML={svgHtml}
      />
    </div>
  );
});
