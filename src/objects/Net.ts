export class Net {
    name: string;
    priority: number;
    type: any;

    constructor(name: string, priority = 0, type: any = null) {
        this.name = name;
        this.priority = priority;
        this.type = type;
    }
}