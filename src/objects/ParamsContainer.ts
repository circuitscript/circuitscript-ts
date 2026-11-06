
export class ParamsContainer {

    // Store parameters like net color, wire thickness, highlight, etc.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- heterogeneous parameter values read by many callers; narrowing breaks them
    parameters: Map<string, any> = new Map();

    hasParam(key: string): boolean {
        return this.parameters.has(key);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- callers rely on untyped param values
    getParam(key: string): any {
        return this.parameters.get(key);
    }

    setParam(key: string, value: unknown): void {
        this.parameters.set(key, value);
    }

    setNestedParam(trailers: string[], value: unknown): void {
        if (trailers.length === 1) {
            this.parameters.set(trailers[0], value);
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- walks arbitrary nested property trees
        let current: any = this.parameters.get(trailers[0]);
        for (let i = 1; i < trailers.length - 1; i++) {
            current = current[trailers[i]];
        }
        current[trailers[trailers.length - 1]] = value;
    }
}