
export class ParamsContainer {

    // Store parameters like net color, wire thickness, highlight, etc.
    parameters: Map<string, any> = new Map();

    hasParam(key: string): boolean {
        return this.parameters.has(key);
    }

    getParam(key: string): any {
        return this.parameters.get(key);
    }

    setParam(key: string, value: any): void {
        this.parameters.set(key, value);
    }

    setNestedParam(trailers: string[], value: any): void {
        if (trailers.length === 1) {
            this.parameters.set(trailers[0], value);
            return;
        }
        let current: any = this.parameters.get(trailers[0]);
        for (let i = 1; i < trailers.length - 1; i++) {
            current = current[trailers[i]];
        }
        current[trailers[trailers.length - 1]] = value;
    }
}