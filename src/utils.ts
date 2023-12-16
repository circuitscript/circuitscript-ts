
export class SimpleStopwatch {
    startTime: Date;

    constructor() {
        this.startTime = new Date();
    }

    lap(): number {
        return (new Date()).getTime() - this.startTime.getTime();
    }
}

export type BoundBox = {
    xmin: number, ymin: number,
    xmax: number, ymax: number,
}

export function resizeBounds(bounds: BoundBox, value: number): BoundBox {
    return {
        xmin: bounds.xmin - value,
        xmax: bounds.xmax + value,

        ymin: bounds.ymin - value,
        ymax: bounds.ymax + value
    }
}

export function printBounds(bounds: BoundBox): string {
    if (bounds !== null){
        return `[${bounds.xmin}, ${bounds.ymin} to ${bounds.xmax}, ${bounds.ymax}]`;
    } else {
        return 'null';
    }
}

export function resizeToNearestGrid(bounds: BoundBox, gridSize = 20): BoundBox {
    
    // These extra values force the bounds to be expanded if it is already
    // to the grid, otherwise the expanded grid might "just nice" fit.
    const addXMin = (bounds.xmin % gridSize) === 0 ? -1: 0;
    const addYMin = (bounds.ymin % gridSize) === 0 ? -1: 0;
    const addXMax = (bounds.xmax % gridSize) === 0 ? 1 : 0;
    const addYMax = (bounds.ymax % gridSize) === 0 ? 1 : 0;

    return {
        xmin: Math.floor((bounds.xmin + addXMin) / gridSize) * gridSize,
        ymin: Math.floor((bounds.ymin + addYMin) / gridSize) * gridSize,

        xmax: Math.ceil((bounds.xmax + addXMax) / gridSize) * gridSize,
        ymax: Math.ceil((bounds.ymax + addYMax) / gridSize) * gridSize,
    }
}

export function toNearestGrid(value: number, gridSize: number): number {
    return Math.floor(value / gridSize) * gridSize;
}

export function getBoundsSize(bounds: BoundBox): {width: number, height: number} {
    return {
        width: bounds.xmax - bounds.xmin,
        height: bounds.ymax - bounds.ymin,
    }
}