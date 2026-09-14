/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// Pure-ish bbox helpers, ported from preview.html's getCleanBBox/positionHighlight.
// The cache and any highlight rects that might be attached to the target are
// passed in explicitly instead of read from module-level closure state.

import type { Bbox } from './zoom';

export type BboxCache = WeakMap<Element, Bbox>;

const HIGHLIGHT_GAP_PX = 2;

// A highlight rect attached as a child of the target becomes part of that
// target's own bbox, so measuring with it attached would make the rect grow
// a little on every reposition. Detach any known highlight rects first, then
// reattach them after measuring, and cache the result since geometry never
// changes.
export function getCleanBBox(
  el: SVGGraphicsElement,
  cache: BboxCache,
  attachedRects: SVGRectElement[]
): Bbox {
  if (cache.has(el)) {
    return cache.get(el) as Bbox;
  }

  const toReattach = attachedRects.filter((rect) => rect.parentNode === el);
  for (const rect of toReattach) {
    el.removeChild(rect);
  }

  const raw = el.getBBox();
  const bbox: Bbox = { x: raw.x, y: raw.y, width: raw.width, height: raw.height };

  for (const rect of toReattach) {
    el.appendChild(rect);
  }

  cache.set(el, bbox);
  return bbox;
}

export function positionHighlight(
  rect: SVGRectElement,
  targetEl: SVGGraphicsElement,
  svgInternalScale: number,
  scale: number,
  cache: BboxCache,
  attachedRects: SVGRectElement[]
): void {
  const bbox = getCleanBBox(targetEl, cache, attachedRects);
  const totalScale = svgInternalScale * scale;
  const gap = totalScale > 0 ? HIGHLIGHT_GAP_PX / totalScale : HIGHLIGHT_GAP_PX;

  rect.setAttribute('x', String(bbox.x - gap));
  rect.setAttribute('y', String(bbox.y - gap));
  rect.setAttribute('width', String(bbox.width + gap * 2));
  rect.setAttribute('height', String(bbox.height + gap * 2));

  if (rect.parentNode !== targetEl) {
    targetEl.appendChild(rect);
  }
}

// A frame's bounds span many DOM elements, not one, so unlike
// getCleanBBox/positionHighlight above, there's no single target element to
// measure - the rect is positioned directly from FrameMeta.bounds instead.
export function positionBoundsRect(
  rect: SVGRectElement,
  bounds: { x: number; y: number; width: number; height: number }
): void {
  rect.setAttribute('x', String(bounds.x));
  rect.setAttribute('y', String(bounds.y));
  rect.setAttribute('width', String(bounds.width));
  rect.setAttribute('height', String(bounds.height));
}
