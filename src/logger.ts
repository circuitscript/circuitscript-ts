export class Logger {

    logs: string[] = [];

    constructor() {
        this.add((new Date()).toISOString());
        this.add('starting logger...');
    }

    add(message: string): void {
        this.logs.push((new Date()).toISOString()+" | " + message);
    }

    dump(): string {
        return this.logs.join('\n');
    }
}