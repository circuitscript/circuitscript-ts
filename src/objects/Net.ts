export class Net {

    name: string;
    
    // Name that is specified when the net was defined. 
    baseName: string;

    // Defines where the net was created. This is important for determining
    // the 'location' of global nets.
    namespace: string;

    priority: number;
    type: any;

    constructor(namespace: string, name: string, priority = 0, type: any = null) {
        if (namespace.indexOf(' ') !== -1){
            throw "Invalid net namespace provided";
        }

        if (name.indexOf(' ') !== -1) {
            throw "Invalid net name provided!";
        }

        this.namespace = namespace;
        this.name = name;
        
        this.priority = priority;
        this.type = type;

        this.baseName = name;
    }

    toString(): string {
        return this.name;
    }

    static isSame(netA: Net, netB: Net): boolean {
        return netA.name === netB.name &&
            netA.baseName === netB.baseName &&
            netA.priority === netB.priority &&
            netA.type === netB.type;
    }
}
