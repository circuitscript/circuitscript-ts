export enum GlobalNames {
    __root = '__root',
    gnd = 'gnd',

    DefaultResistor = 'res',
    DefaultCapacitor = 'cap',
    DefaultInductor = 'ind',

    symbol = 'symbol',
}


export enum ParamKeys {

    // If this is set to 1 (number), then use the component as a net.
    __is_net = '__is_net',
    __is_label = '__is_label',

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

export enum BranchType {
    Branch = 1,
    Join = 2,
}