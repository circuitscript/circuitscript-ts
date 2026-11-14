/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ClassComponent } from './ClassComponent.js';
import { NumericValue } from './NumericValue.js';

function valueToString(value: unknown): string {
    if (value instanceof NumericValue) return value.toDisplayString();
    return String(value);
}

/* Replace {name} with the component's parameter value; unknown names stay as is. */
export function resolveValuesInTemplate(instance: ClassComponent, templateString: string): string {
    return templateString.replace(/\{(\w+)\}/g, (match, paramName) => {
        if (!instance.hasParam(paramName)) return match;
        return valueToString(instance.getParam<unknown>(paramName));
    });
}

/*
 * Same as above, with values from a lookup function. The lookup returns
 * undefined for unknown names, which are left as is.
 */
export function resolveValuesInTemplateWith(
    lookup: (name: string) => unknown, templateString: string): string {
    return templateString.replace(/\{(\w+)\}/g, (match, paramName) => {
        const value = lookup(paramName);
        return value === undefined ? match : valueToString(value);
    });
}
