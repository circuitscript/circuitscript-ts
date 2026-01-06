/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ParserRuleContext } from 'antlr4ng';
import { Expressions_blockContext } from 'src/antlr/CircuitScriptParser.js';
import { SymbolDrawingCommands } from '../draw_symbols.js';
import { Net } from './Net.js';
import { PinDefinition, PinId, PinIdType } from './PinDefinition.js';
import { PinTypes } from './PinTypes.js';
import { WireSegment } from './Wire.js';
import { ExecutionContext } from '../execute.js';
import { NumericValue } from './ParamDefinition.js';
import { ParamKeys } from '../globals.js';
import { RuntimeExecutionError } from '../utils.js';

export class ClassComponent {

    /** A component has an instance_name to identify it. This is unique and
     *  should not be changed. */
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

    // Stores pin IDs of pins that are not defined in the
    // arrange property of the component.
    _unplacedPins:PinId[] = [];

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

    /** User-defined type prop for the component. The type is important to 
     * provide additionality functionality to the component.
    */
    typeProp: string| null = null;
    
    /** If true, then this component is copied upon reference. 
     * Used for nets, supply, gnd, labels */
    copyProp = false;

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

    setParam(key: string, value: number | string | NumericValue): void {
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
        // Use manual comparison as this is faster than lodash.
        // Make sure that all important props are added.
        return this.instanceName === other.instanceName 
            && this.numPins === other.numPins
            && this._copyID === other._copyID
            && this.arrangeProps === other.arrangeProps
            && (
                (this.displayProp === null && other.displayProp === null)
                ||
                (this.displayProp !== null && other.displayProp !== null && this.displayProp.eq(other.displayProp))
            ) 
            && this.widthProp === other.widthProp
            && this.typeProp === other.typeProp
            && this._cachedPins === other._cachedPins
            && this._cachedParams === other._cachedParams;
    }

    clone(): ClassComponent {
        // returns new copy, angle, flipX, flipY should be reset
        const component = new ClassComponent(
            this.instanceName, this.numPins);

        component._copyID = this._copyID;
        component.arrangeProps = this.arrangeProps;
        component.widthProp = this.widthProp;
        component.typeProp = this.typeProp;

        component.angleProp = this.angleProp;
        component.followWireOrientationProp = this.followWireOrientationProp;
        component.useWireOrientationAngle = this.useWireOrientationAngle;

        if (this.displayProp instanceof SymbolDrawingCommands) {
            // Do a proper clone, otherwise, cloned objects will share the 
            // same drawing object.
            component.displayProp =
                (this.displayProp as SymbolDrawingCommands).clone();
        }

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

        component.refreshCache();
        return component;
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