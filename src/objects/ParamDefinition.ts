/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export class ParamDefinition {
    paramName: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- read by callers as untyped value
    paramValue: any;

    constructor(paramName: string, paramValue: unknown) {
        this.paramName = paramName;
        this.paramValue = paramValue;
    }
}
