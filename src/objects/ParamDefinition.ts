/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export class ParamDefinition {
    paramName: string;
    paramValue: string | number | any;

    constructor(paramName: string, paramValue: any) {
        this.paramName = paramName;
        this.paramValue = paramValue;
    }
}
