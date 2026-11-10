/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ClassComponent } from './ClassComponent.js';
import { NumericValue } from './NumericValue.js';

/* Replace {name} with the component's parameter value; unknown names stay as is. */
export function resolveValuesInTemplate(instance: ClassComponent, templateString: string): string {
    return templateString.replace(/\{(\w+)\}/g, (match, paramName) => {
        if (!instance.hasParam(paramName)) return match;
        const paramValue = instance.getParam<unknown>(paramName);
        if (paramValue instanceof NumericValue) return paramValue.toDisplayString();
        return String(paramValue);
    });
}
