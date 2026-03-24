/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { NodeScriptEnvironment } from "./environment";
import { ESMNodeScriptEnvironment } from "./esm-environment";

export function getNewEnvironment(): NodeScriptEnvironment {
    return new ESMNodeScriptEnvironment();
}