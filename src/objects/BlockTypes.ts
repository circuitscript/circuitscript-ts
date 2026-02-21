
export enum BlockTypes {
    Branch = 1,// split off circuit paths, same starting insertion point
    Join = 2,// join circuit paths, same ending insertion point
    Parallel = 3,// same starting and ending points for the circuit paths
    Point = 4
}
