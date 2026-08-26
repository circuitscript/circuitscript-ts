/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export class Logger {

    logs: string[] = [];
    enabled: boolean;

    constructor(enabled = false) {
        this.enabled = enabled;

        if (this.enabled) {
            this.add((new Date()).toISOString());
            this.add('starting logger...');
        }
    }

    add(...args: (string | number)[]): void {
        if (!this.enabled) {
            return;
        }

        let message = "";
        if (args.length === 1) {
            message = args[0].toString();
        } else {
            message = args.join(" ");
        }
        this.logs.push((new Date()).toISOString() + " | " + message);
    }

    dump(): string {
        return this.logs.join('\n');
    }
}