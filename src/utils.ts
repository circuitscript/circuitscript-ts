
export class SimpleStopwatch {
    startTime: Date;

    constructor() {
        this.startTime = new Date();
    }

    lap(): number {
        return (new Date()).getTime() - this.startTime.getTime();
    }
}