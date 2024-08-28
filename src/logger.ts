/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

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