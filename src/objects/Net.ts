/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NetTypes } from "./types.js";

export class Net {

    name: string;
    
    // Name that is specified when the net was defined. 
    baseName: string;

    // Defines where the net was created. This is important for determining
    // the 'location' of global nets.
    namespace: string;

    // If priority is 0, then this is NOT a user-defined net.
    priority: number;

    type: NetTypes;

    // Store parameters like net color, wire thickness, highlight, etc.
    parameters: Map<string, any> = new Map();

    // If set, then the net class params are used by default.
    class?: Net;

    // private randomId: string;

    constructor(namespace: string, name: string, priority = 0) {
        if (namespace.indexOf(' ') !== -1){
            throw "Invalid net namespace provided";
        }

        if (name.indexOf(' ') !== -1) {
            throw "Invalid net name provided!";
        }

        this.namespace = namespace;
        this.name = name;
        
        this.priority = priority;
        this.baseName = name;

        // this.randomId = Math.random().toString();
    }

    toString(): string {
        return this.namespace + this.name;
    }

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

    static isSame(netA: Net, netB: Net): boolean {
        return netA.namespace === netB.namespace &&
            netA.name === netB.name &&
            netA.baseName === netB.baseName &&
            netA.priority === netB.priority;
    }
}
