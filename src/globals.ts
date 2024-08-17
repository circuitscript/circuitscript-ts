export enum GlobalNames {
    __root = '__root',
    gnd = 'gnd',

    DefaultResistor = 'res',
    DefaultCapacitor = 'cap',
    DefaultInductor = 'ind',

    symbol = 'symbol',
}

export const NoNetText = 'NO_NET';

export enum ParamKeys {
    priority = 'priority',
    net_name = 'net_name',
}

export enum LayoutDirection {
    RIGHT = "RIGHT",     // A --> B
    LEFT = "LEFT",       // B <-- A
}

export enum SymbolPinSide {
    Left = "left",
    Right = "right"
}

export const portWidth = 20;
export const portHeight = 2;

export const defaultFont = 'Open Sans-Regular, Arial';
export const defaultFontBold = 'Open Sans-Bold, Arial-Bold, Arial';

export const defaultFontSize = 10;

export const bodyColor = '#FFFEAF';
export const junctionSize = 5;
export const junctionColor = 'rgb(0, 132, 0)';
export const wireColor = 'rgb(0, 132, 0)';


export enum ComponentTypes {
    gnd = 'gnd',
    net = 'net',
    label = 'label',
    point = 'point'
}

export enum ReferenceTypes {
    function = 'function',
    value = 'value',
    variable = 'variable',
    instance = 'instance',
}

export enum BlockTypes {
    Branch = 1,     // split off circuit paths, same starting insertion point
    Join = 2,       // join circuit paths, same ending insertion point
    Parallel = 3,   // same starting and ending points for the circuit paths
    Point = 4,      // to this point
}