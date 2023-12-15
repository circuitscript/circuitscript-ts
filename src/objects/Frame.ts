export class Frame {
    parameters: Map<string, any> = new Map();
    frameId: number;

    constructor(frameId: number) {
        this.frameId = frameId;
    }
}

export enum FrameParamKeys {
    Title = 'title'
}