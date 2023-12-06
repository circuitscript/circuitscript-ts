export class Frame {
    properties: Map<string, any> = new Map();
    frameId: number;

    constructor(frameId: number) {
        this.frameId = frameId;
    }
}