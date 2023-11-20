export class Net {
    // Name may be transformed based on the namespace
    name: string;

    // Name that is specified when the net was defined.
    baseName: string;

    priority: number;
    type: any;

    constructor(name: string, priority = 0, type: any = null) {
        this.name = name;
        this.priority = priority;
        this.type = type;

        this.baseName = name;
    }

    toString(): string {
        return this.name;
    }
}
