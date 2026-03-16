/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ParserRuleContext } from 'antlr4ng';
import { Expressions_blockContext } from 'src/antlr/CircuitScriptParser.js';
import { SymbolDrawingCommands } from '../render/draw_symbols.js';
import { Net } from './Net.js';
import { PinDefinition, PinId, PinIdType } from './PinDefinition.js';
import { PinTypes } from './PinTypes.js';
import { WireSegment } from './Wire.js';
import { ExecutionContext } from '../execute.js';
import { NumericValue } from './NumericValue.js';
import { DefaultComponentUnit, ParamKeys } from '../globals.js';
import { RuntimeExecutionError } from '../utils.js';

export class ComponentUnit {
    parent: ClassComponent;
    unitId: string;

    // This is appended to the end of the refdes to identify the
    // component unit.
    refdesSuffix = "A";

    // Value set by user
    suffix: string | null = null;

    public get instanceName(): string {
        return `${this.parent.instanceName},${this.unitId}`;
    }

    /** Component unit parameters in a map. These parameters may be defined by 
     * user code. 
     * */
    parameters: Map<string, number | string | NumericValue> = new Map();

    /** Maximum number of pins available on this component.
     * Pin number starts from 1. */
    numPins: number;

    /** Maps pin indexes to the pin definition */
    pins: Map<PinId, PinDefinition> = new Map();

    pinsFlat: PinDefinition[] = [];

    /** Stores the largest position for each side of the component. This is needed
     * to calculate the component width and height. */
    pinsMaxPositions: Map<string, number> = new Map();

    /** This determines how pins are arranged on the component/symbol. */
    arrangeProps: Map<string, PinId[]> | null = null;

    /** Used to identify what graphic to draw for this symbol. This will also
     * include pin placement as well. If `display` is defined, then it will
     * overwrite `arrange`
     */
    displayProp: SymbolDrawingCommands | null = null;

    /** User-defined width for the component */
    widthProp: number | null = null;

    /** User-defined height for component */
    heightProp: number | null = null;

    /** The angle that the graphical symbol is drawing with.
    * For example, a horizontal resistor will have an angle of 0.
    * A vertical capacitor will have an angle of 90. */
    angleProp = 0;

    /** User-defined value. If set to true, then the component's angle follows
     * the connected wire orientation. For all components, this is the default. */
    followWireOrientationProp = true;

    /** The angle/orientation of the wire that is connected */
    wireOrientationAngle = 0;

    /** If true, the wire orientation was used to set the angle
    * of the component. If flip or angle modifiers are set, those values
    * will have priority over the wire orientation angle. */
    useWireOrientationAngle = true;

    /** If true, the wire orientation angle was already set before. */
    didSetWireOrientationAngle = false;

    // Stores pin IDs of pins that are not defined in the
    // arrange property of the component.
    _unplacedPins:PinId[] = [];

    constructor(unitId: string, parent: ClassComponent) {
        this.unitId = unitId;
        this.parent = parent;
    }

    clone(): ComponentUnit {
        const unit = new ComponentUnit(this.unitId, this.parent);

        unit.numPins = this.numPins;
        unit.angleProp = this.angleProp;
        
        unit.widthProp = this.widthProp;
        unit.heightProp = this.heightProp;

        if (this.displayProp instanceof SymbolDrawingCommands) {
            unit.displayProp = this.displayProp.clone();
        }

        if (this.arrangeProps !== null) {
            unit.arrangeProps = new Map(this.arrangeProps);
        }

        for (const [key, value] of this.pins) {
            unit.pins.set(key, value);
        }

        unit.pinsFlat = [...this.pinsFlat];

        for (const [key, value] of this.pinsMaxPositions) {
            unit.pinsMaxPositions.set(key, value);
        }

        unit._unplacedPins = [...this._unplacedPins];

        unit.followWireOrientationProp = this.followWireOrientationProp;
        unit.wireOrientationAngle = this.wireOrientationAngle;
        unit.useWireOrientationAngle = this.useWireOrientationAngle;
        unit.didSetWireOrientationAngle = this.didSetWireOrientationAngle;

        return unit;
    }

    setParam(key: string, value: number | string | NumericValue): void {
        this.parameters.set(key, value);
    }

    isEqual(other: ComponentUnit): boolean {
        if (this === other) return true;

        if (this.unitId !== other.unitId) return false;
        if (this.numPins !== other.numPins) return false;
        if (this.angleProp !== other.angleProp) return false;
        if (this.widthProp !== other.widthProp) return false;
        if (this.heightProp !== other.heightProp) return false;
        if (this.followWireOrientationProp !== other.followWireOrientationProp) return false;
        if (this.wireOrientationAngle !== other.wireOrientationAngle) return false;
        if (this.useWireOrientationAngle !== other.useWireOrientationAngle) return false;
        if (this.didSetWireOrientationAngle !== other.didSetWireOrientationAngle) return false;

        // Compare displayProp
        if (this.displayProp === null && other.displayProp !== null) return false;
        if (this.displayProp !== null && other.displayProp === null) return false;
        if (this.displayProp !== null && other.displayProp !== null && !this.displayProp.eq(other.displayProp)) return false;

        // Compare arrangeProps
        if (this.arrangeProps === null && other.arrangeProps !== null) return false;
        if (this.arrangeProps !== null && other.arrangeProps === null) return false;
        if (this.arrangeProps !== null && other.arrangeProps !== null) {
            if (this.arrangeProps.size !== other.arrangeProps.size) return false;
            for (const [key, value] of this.arrangeProps) {
                const otherValue = other.arrangeProps.get(key);
                if (!otherValue || value.length !== otherValue.length) return false;
                for (let i = 0; i < value.length; i++) {
                    if (!value[i].equals(otherValue[i])) return false;
                }
            }
        }

        // Compare parameters
        if (this.parameters.size !== other.parameters.size) return false;
        for (const [key, value] of this.parameters) {
            if (!other.parameters.has(key) || other.parameters.get(key) !== value) return false;
        }

        // Compare pins
        if (this.pins.size !== other.pins.size) return false;
        for (const [key, value] of this.pins) {
            let found = false;
            for (const [otherKey, otherValue] of other.pins) {
                if (key.equals(otherKey) && value === otherValue) {
                    found = true;
                    break;
                }
            }
            if (!found) return false;
        }

        if (this.parent !== other.parent) {
            return false;
        }

        return true;
    }

}

export class ClassComponent {

    /** A component has an instance_name to identify it. This is unique and
     *  should not be changed. The instance name can be changed based on the
     * context/scope that the component was first defined in. 
     * 
     * '.' - used to separate different contexts/namespaces
     * ':' - used to denote clones/copies
     * ',' - used to denote units
     * */
    instanceName: string;

    /** Maximum number of pins available on this component.
     * Pin number starts from 1. */
    numPins: number;

    /** Component parameters in a map. These parameters may be defined by 
     * user code. These are defined in the `params` property in the 
     * `create component` command. */
    parameters: Map<string, number | string | NumericValue> = new Map();

    /** Maps pin indexes to the pin definition */
    pins: Map<PinId, PinDefinition> = new Map();

    /** Maps pin indexes to the nets */
    pinNets: Map<PinId, Net> = new Map();

    /** Maps pin indexes to wire segments */
    pinWires: Map<number, WireSegment[]> = new Map();

    /** Stores the largest position for each side of the component. This is needed
     * to calculate the component width and height. */
    pinsMaxPositions: Map<string, number> = new Map();

    /** Array of component units for multi-unit components */
    units: ComponentUnit[] = [];

    // The cached values are used for easier comparison/equality check.
    _cachedPins: string;
    _cachedParams: string;

    /** For nets, labels and gnds, this can be used to identify different 
     * copies of the same symbol on the schematic */
    _copyID?: number = null;
    _copyFrom?: ClassComponent = null;

    /** Used by point objects to indicate the actual ClassComponent that is
     *  the currentComponent */
    _pointLinkComponent?: ClassComponent;

    /** @deprecated */
    // Stores pin IDs of pins that are not defined in the
    // arrange property of the component.
    _unplacedPins:PinId[] = [];

    /** User-defined type prop for the component. The type is important to 
     * provide additionality functionality to the component.
    */
    typeProp: string| null = null;
    
    /** If true, then this component is copied upon reference. 
     * Used for nets, supply, gnd, labels */
    copyProp = false;

    /** Assigned refdes that is set for the component during the annotation step. */
    assignedRefDes: string | null = null;

    // If set, then use the placeholder refdes extracted from refdes annotation 
    // comment. This should be in the format <type>___. The number of '_' will 
    // given an idea of the loop depth.
    placeHolderRefDes: string|null = null;

    // If true, then during the annotation output stage, this will 
    // force the refdes to be saved to the external file.
    forceSaveRefdesAnnotation = false;

    // Store references to components in the context rules. If the context rule
    // is within a loop structure (while, for, etc.), the loop index is also stored.
    ctxReferences: CtxReference[] = [];

    // Value to indicate when the component was created relative to other
    // components.
    _creationIndex = -1; // Not defined yet.

    pinUnitMap = new Map<PinId, ComponentUnit>();

    constructor(instanceName: string, numPins: number) {
        this.instanceName = instanceName;
        this.numPins = numPins;
    }

    setupPins(): void {
        // Let pin index start from 1.
        for (let i = 1; i < this.numPins + 1; i++) {
            const pinIndex = i;
            this.pins.set(
                new PinId(pinIndex),
                new PinDefinition(
                    pinIndex,
                    PinIdType.Int,
                    pinIndex.toString(),
                    PinTypes.Any,
                ),
            );
        }

        this.refreshPinsCache();
    }

    getDefaultPin(): PinId {
        // Return id of the default pin
        const pins = Array.from(this.pins.keys());
        pins.sort();

        return pins[0];
    }

    hasPin(pinId: PinId): boolean {
        // Check if we have a pin that matches by ID value
        for (const [pin, pinDef] of this.pins) {
            if (pin.equals(pinId)) {
                return true;
            }
            // Also check pin name and alt names for string matching
            if (pinId.getType() === PinIdType.Str && (
                pinDef.name === pinId.getValue() ||
                pinDef.altNames.indexOf(pinId.getValue()) !== -1
            )) {
                return true;
            }
        }
        return false;
    }

    getPin(pinId: PinId): PinId {
        // Given a pinId, which is either a number of string,
        // this returns the matching PinId object in the component.
        // If the pinId does not match, then null is returned.

        // First check for exact pin ID match
        for (const [pin, ] of this.pins) {
            if (pin.equals(pinId)) {
                return pin;
            }
        }

        // If string, also check pin name and alt names
        if (pinId.getType() === PinIdType.Str) {
            const pinIdStringValue = pinId.getValue() as string;

            for (const [pin, pinDef] of this.pins) {
                if (
                    pinDef.name === pinIdStringValue ||
                    pinDef.altNames.indexOf(pinIdStringValue) !== -1
                ) {
                    return pin;
                }
            }
        }

        throw new RuntimeExecutionError(
            `Could not find pin '${pinId}' on component '${this.instanceName}'`);
    }

    /**
     * Returns the next pin after the current pin. This will wrap around once
     * the last pin is reached.
     * @param pinIndex
     * @returns 
     */
    getNextPinAfter(pinIndex: PinId): PinId {
        const pins = Array.from(this.pins.keys());
        pins.sort();

        const index = pins.findIndex(tmp => tmp.equals(pinIndex));
        if (index + 1 < pins.length) {
            return pins[index + 1];
        } else {
            return this.getDefaultPin();
        }
    }

    setParam(key: string, value: number | string | NumericValue | Net): void {
        this.parameters.set(key, value);
        this.refreshParamCache();
    }

    hasParam(key: string): boolean {
        return this.parameters.has(key);
    }

    private refreshParamCache(): void {
        this._cachedParams =
            JSON.stringify(Object.fromEntries(this.parameters));
    }

    private refreshPinsCache(): void {
        this._cachedPins = JSON.stringify(Object.fromEntries(this.pins));
    }

    refreshCache(): void {
        this.refreshParamCache();
        this.refreshPinsCache();
    }

    getParam<T>(key: string): T {
        if (this.parameters.has(key)) {
            return this.parameters.get(key) as T;
        } else {
            throw 'Invalid parameter key: ' + key;
        }
    }

    toString(): string {
        return this.instanceName;
    }

    static simple(
        instanceName: string,
        numPins: number
    ): ClassComponent {
        const component = new ClassComponent(instanceName, numPins);
        component.setupPins();
        return component;
    }

    isEqual(other: ClassComponent): boolean {
        if (this === other) return true;

        // Use manual comparison as this is faster than lodash.
        // Make sure that all important props are added.
        if (this.instanceName !== other.instanceName) return false;
        if (this._copyID !== other._copyID) return false;

        if (this.typeProp !== other.typeProp) return false;
        if (this._cachedPins !== other._cachedPins) return false;
        if (this._cachedParams !== other._cachedParams) return false;

        // Check if units are the same
        for (let i = 0; i < this.units.length; i++) {
            if (other.units[i] === undefined) {
                return false;
            }

            if (!other.units[i].isEqual(this.units[i])) {
                return false;
            }
        }

        return true;
    }

    clone(): ClassComponent {
        // returns new copy, angle, flipX, flipY should be reset
        const component = new ClassComponent(
            this.instanceName, this.numPins);

        component._copyID = this._copyID;
        component.typeProp = this.typeProp;

        for (const [key, value] of this.parameters) {
            if (key === ParamKeys.flipX || key === ParamKeys.flipY || key === ParamKeys.angle) {
                continue;
            }

            component.parameters.set(key, value);
        }

        for (const [key, value] of this.pins) {
            component.pins.set(key, value);
        }

        for(const [key, value] of this.pinsMaxPositions){
            component.pinsMaxPositions.set(key, value);
        }

        // Clone the units as well
        component.units = this.units.map(unit => {
            const tmpUnit = unit.clone();
            tmpUnit.parent = component;
            return tmpUnit;
        });

        component.refreshCache();

        // Use this method to refresh the pin unit mapping
        component.refreshPinUnitMap();
        return component;
    }

    // Component is composed of units and should have at least one.
    getUnit(unitId: string | null = null): ComponentUnit {
        if (unitId === null) {
            return this.units[0];
        } else {
            return this.units.find(item => {
                return item.unitId === unitId;
            })!;
        }
    }

    addDefaultUnit(displayProp: SymbolDrawingCommands): void {
        const tmpUnit = new ComponentUnit(DefaultComponentUnit, this);
        tmpUnit.pins = this.pins;

        const pinsFlat: PinDefinition[] = [];
        this.pins.forEach(pin => {
            pinsFlat.push(pin);
        });

        tmpUnit.pinsFlat = pinsFlat;

        tmpUnit.numPins = this.numPins;
        tmpUnit.pinsMaxPositions = new Map();

        tmpUnit.displayProp = displayProp;
        tmpUnit.angleProp = 0;
        tmpUnit.followWireOrientationProp = true;

        this.units.push(tmpUnit);
        this.refreshPinUnitMap();
    }

    refreshPinUnitMap(): void {
        for (const unit of this.units) {
            const { pinsFlat } = unit;
            for (const pin of pinsFlat) {
                this.pinUnitMap.set(pin.id, unit);
            }
        }
    }

    getUnitForPin(pinId: PinId): ComponentUnit {
        if (typeof pinId === "number") {
            throw new RuntimeExecutionError("Invalid pin id");
        }

        for (const [tmpPin, componentUnit] of this.pinUnitMap) {
            if (tmpPin.equals(pinId)) {
                return componentUnit;
            }
        }

        throw new RuntimeExecutionError("Could not find unit for pin: " + pinId);
    }
}

export class ModuleComponent extends ClassComponent {
    /** The expressions that define the circuit within the module. */
    moduleContainsExpressions?: Expressions_blockContext;

    /** Number of module instances */
    moduleCounter = 0;
    
    moduleExecutionContext?: ExecutionContext;
    moduleExecutionContextName?: string;

    /** Module is the same as a component, except the component pins are mapped
     * to ports that are defined within the module's inner circuits. */
    modulePinIdToPortMap?: Map<number, ClassComponent>;
}

export type CtxReference = {
    
    // Rule context that uses/references the component.
    ctx: ParserRuleContext,

    // Stores the stack of the current execution stack and the corresponding
    // index. For example, a loop rule context (while, for) will have the 
    // current iteration index. For a function rule context, the current 
    // number of invocation within the scope is used (i.e. the nth time the
    // function is called).
    indexedStack: [ParserRuleContext, number][],

    // If true, then the component reference was created during the 
    // execution of the rule.
    creationFlag: boolean,

    // Identify filepath of this ctx reference.
    filePath: string,
}