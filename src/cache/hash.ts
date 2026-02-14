/*
 * Copyright 2023 Liu Weihao
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createHash } from 'crypto';

export function computeContentHash(fileContent: string): string {
    return createHash('sha256').update(fileContent, 'utf8').digest('hex');
}
