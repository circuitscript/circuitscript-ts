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

    priority = 'priority',
    net_name = 'net_name',
}

export const portWidth = 20;
export const portHeight = 1;

export const defaultFont = 'Inter';
export const defaultFontSize = 10;

export const bodyColor = '#FFFEAF';
export const junctionSize = 8;
export const junctionColor = '#111';
export const edgeColor = '#111';
