/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export enum BlockTypes {
    Branch = 1,// split off circuit paths, same starting insertion point
    Join = 2,// join circuit paths, same ending insertion point
    Parallel = 3,// same starting and ending points for the circuit paths
    Point = 4,

    AtBlock = 5, // Very similar to point
}
