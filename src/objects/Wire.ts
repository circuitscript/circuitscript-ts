export class Wire {

    // Should have some net info too 

    path: WireSegment[]

    constructor(path: WireSegment[]) {
        this.path = path;
    }
}

export type WireSegment = {
    direction: 'up' | 'down' | 'left' | 'right';
    value: number,
    until?: [instanceName: string, pin: number],
}