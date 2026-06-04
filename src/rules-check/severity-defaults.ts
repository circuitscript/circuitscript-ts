/*
 * Copyright 2023 Liu Weihao
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export enum ERCSeverity {
    Error   = 'error',
    Warning = 'warning',
    Info    = 'info',
    Off     = 'off',
}

export const AcceptedSeverityLevels = [
    ERCSeverity.Error,
    ERCSeverity.Warning,
    ERCSeverity.Info,
    ERCSeverity.Off
];

export enum ERC_Rules {

    // Power related
    PowerNetWithoutDriver = 'POWER-NET-WITHOUT-DRIVER',

    /** [ERROR] power_reference pin is connected to a signal/unnamed net with no power symbol */
    PowerReferenceOnUnnamedNet = 'POWER-REFERENCE-ON-UNNAMED-NET',

    /** [WARNING] power_input pin is connected to a net with no power symbol declaration */
    PowerInputOnUnnamedNet = 'POWER-INPUT-ON-UNNAMED-NET',

    /** [WARNING] power_output pin is driving a net with no power symbol declaration */
    PowerOutputOnUnnamedNet = 'POWER-OUTPUT-ON-UNNAMED-NET',

    /** [WARNING] power net has power_input pins but no power_output source */
    PowerNetNoSource = 'POWER-NET-NO-SOURCE',

    /** [WARNING] power net is declared (has power symbol) but has no physical pin connections */
    PowerNetUnused = 'POWER-NET-UNUSED',

    /** [ERROR] two differently-named power symbols are shorted onto the same net */
    PowerNetNameConflict = 'POWER-NET-NAME-CONFLICT',

    /** [WARNING] multiple power_output pins on the same net — possible power conflict */
    PowerNetMultipleOutputs = 'POWER-NET-MULTIPLE-OUTPUTS',

    /** [ERROR] power_reference pin is on a net with conflicting power symbol names */
    PowerReferenceAmbiguousNet = 'POWER-REFERENCE-AMBIGUOUS-NET',

    /** [ERROR] power_reference pin is not wired to any net */
    PowerReferenceUnconnected = 'POWER-REFERENCE-UNCONNECTED',

    /** [ERROR] power_input pin is not wired to any net */
    PowerInputUnconnected = 'POWER-INPUT-UNCONNECTED',

    /** [WARNING] power_output pin is not wired to any net */
    PowerOutputUnconnected = 'POWER-OUTPUT-UNCONNECTED',

    /** [WARNING] power symbol pin is not wired to any net */
    PowerSymbolUnconnected = 'POWER-SYMBOL-UNCONNECTED',

    /** [WARNING] no power_reference pins found anywhere in the schematic — no ground reference defined */
    NoPowerReferenceInSchematic = 'NO-POWER-REFERENCE-IN-SCHEMATIC',

    // Connections related
    UnconnectedPin = 'UNCONNECTED-PIN',
    UnconnectedWire = 'UNCONNECTED-WIRE',
    NoConnectOnConnectedPin = 'NO-CONNECT-ON-CONNECTED-PIN',

    // Pin type compatibility
    PinTypeOutputMultiple           = 'PIN-TYPE-OUTPUT-MULTIPLE',
    PinTypeInputUndriven            = 'PIN-TYPE-INPUT-UNDRIVEN',
    PinTypePassiveOnly              = 'PIN-TYPE-PASSIVE-ONLY',
    PinTypeBidirectionalOnPowerNet  = 'PIN-TYPE-BIDIRECTIONAL-POWER',
    PinTypeOutputDrivingPowerInput  = 'PIN-TYPE-OUTPUT-POWER-INPUT',
}

export const ERC_RuleSeverity: Record<ERC_Rules, ERCSeverity> = {
    [ERC_Rules.PowerNetWithoutDriver]:         ERCSeverity.Info,
    [ERC_Rules.PowerReferenceOnUnnamedNet]:    ERCSeverity.Error,
    [ERC_Rules.PowerInputOnUnnamedNet]:        ERCSeverity.Info,
    [ERC_Rules.PowerOutputOnUnnamedNet]:       ERCSeverity.Info,
    [ERC_Rules.PowerNetNoSource]:              ERCSeverity.Warning,
    [ERC_Rules.PowerNetUnused]:                ERCSeverity.Warning,
    [ERC_Rules.PowerNetNameConflict]:          ERCSeverity.Error,
    [ERC_Rules.PowerNetMultipleOutputs]:       ERCSeverity.Warning,
    [ERC_Rules.PowerReferenceAmbiguousNet]:    ERCSeverity.Error,
    [ERC_Rules.PowerReferenceUnconnected]:     ERCSeverity.Error,
    [ERC_Rules.PowerInputUnconnected]:         ERCSeverity.Error,
    [ERC_Rules.PowerOutputUnconnected]:        ERCSeverity.Warning,
    [ERC_Rules.PowerSymbolUnconnected]:        ERCSeverity.Warning,
    [ERC_Rules.NoPowerReferenceInSchematic]:   ERCSeverity.Warning,

    [ERC_Rules.UnconnectedPin]:                ERCSeverity.Warning,
    [ERC_Rules.UnconnectedWire]:               ERCSeverity.Warning,
    [ERC_Rules.NoConnectOnConnectedPin]:       ERCSeverity.Error,

    [ERC_Rules.PinTypeOutputMultiple]:          ERCSeverity.Warning,
    [ERC_Rules.PinTypeInputUndriven]:           ERCSeverity.Warning,
    [ERC_Rules.PinTypePassiveOnly]:             ERCSeverity.Off,
    [ERC_Rules.PinTypeBidirectionalOnPowerNet]: ERCSeverity.Warning,
    [ERC_Rules.PinTypeOutputDrivingPowerInput]: ERCSeverity.Warning,
};
