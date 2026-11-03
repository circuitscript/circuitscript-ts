/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Element, extend } from '@svgdotjs/svg.js';

/**
 * svg.js implements translate() as transform({ translate: [x, y] }, true),
 * and transform() resolves the origin through getOrigin(). With no origin
 * given the origin defaults to 'center', which makes svg.js call
 * element.bbox() - even though a translation never uses the origin.
 *
 * With svgdom the bbox of a group walks every descendant, so translating a
 * large group (e.g. a sheet containing hundreds of components) is very
 * expensive. Passing a numeric origin skips the bbox and produces the
 * identical transform matrix.
 */
extend(Element, {
    translate(this: Element, x: number, y: number): Element {
        return this.transform({ translate: [x, y], origin: [0, 0] }, true);
    }
});
