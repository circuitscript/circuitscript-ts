/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// Pure zoom/fit math, ported from preview.html's zoomBy/fitToView. Signatures
// take explicit params instead of closure/module-level scale/translate state
// so the math is usable from React state or plain tests alike.

export interface Point {
  x: number;
  y: number;
}

export interface Transform {
  scale: number;
  translate: Point;
}

export interface Bbox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ViewportRect {
  width: number;
  height: number;
}

const DEFAULT_MIN_SCALE = 0.1;
const DEFAULT_MAX_SCALE = 10;
const FIT_PADDING = 0.9;

export function zoomBy(
  scale: number,
  translate: Point,
  factor: number,
  centerPoint: Point,
  opts?: { min?: number; max?: number }
): Transform {
  const min = opts?.min ?? DEFAULT_MIN_SCALE;
  const max = opts?.max ?? DEFAULT_MAX_SCALE;

  const newScale = Math.min(max, Math.max(min, scale * factor));

  return {
    scale: newScale,
    translate: {
      x: centerPoint.x - (centerPoint.x - translate.x) * (newScale / scale),
      y: centerPoint.y - (centerPoint.y - translate.y) * (newScale / scale),
    },
  };
}

export function computeFitTransform(
  bbox: Bbox,
  svgInternalScale: number,
  viewportRect: ViewportRect
): Transform {
  const identity: Transform = { scale: 1, translate: { x: 0, y: 0 } };

  const contentWidth = bbox.width * svgInternalScale;
  const contentHeight = bbox.height * svgInternalScale;
  const contentX = bbox.x * svgInternalScale;
  const contentY = bbox.y * svgInternalScale;

  if (contentWidth <= 0 || contentHeight <= 0) {
    return identity;
  }

  let fitScale =
    Math.min(viewportRect.width / contentWidth, viewportRect.height / contentHeight) * FIT_PADDING;

  if (!isFinite(fitScale) || fitScale <= 0) {
    return identity;
  }

  fitScale = Math.min(DEFAULT_MAX_SCALE, Math.max(DEFAULT_MIN_SCALE, fitScale));

  return {
    scale: fitScale,
    translate: {
      x: viewportRect.width / 2 - (contentX + contentWidth / 2) * fitScale,
      y: viewportRect.height / 2 - (contentY + contentHeight / 2) * fitScale,
    },
  };
}
