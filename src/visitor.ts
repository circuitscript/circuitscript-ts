/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
    Add_component_exprContext,
    AdditionExprContext,
    At_blockContext,
    At_block_pin_exprContext,
    At_component_exprContext,
    BinaryOperatorExprContext,
    Component_select_exprContext,
    Create_component_exprContext,
    Create_graphic_exprContext,
    Data_expr_with_assignmentContext,
    Double_dot_property_set_exprContext,
    Frame_exprContext,
    Function_def_exprContext,
    MultiplyExprContext,
    Nested_propertiesContext,
    Net_namespace_exprContext,
    Pin_select_exprContext,
    Point_exprContext,
    Property_exprContext,
    Property_key_exprContext,
    Single_line_propertyContext,
    To_component_exprContext,
    Wire_exprContext,
    UnaryOperatorExprContext,
    If_exprContext,
    If_inner_exprContext,
    LogicalOperatorExprContext,
    Expressions_blockContext,
    Create_module_exprContext,
    Property_block_exprContext,
    While_exprContext,
    For_exprContext,
    Data_exprContext,
    GraphicCommandExprContext,
    Graphic_expressions_blockContext,
    GraphicForExprContext,
    Graph_expressionsContext,
    Path_blockContext,
    Annotation_comment_exprContext,
    At_block_headerContext,
    Part_set_exprContext,
    Part_set_keyContext,
    Part_match_blockContext,
    Part_sub_exprContext,
    Part_value_exprContext,
    Part_condition_exprContext,
    CreateExprContext,
    Create_exprContext,
    Properties_blockContext,
} from './antlr/CircuitScriptParser.js';

import { ExecutionContext } from './execute.js';
import { ClassComponent, ModuleComponent } from './objects/ClassComponent.js';
import {
    NumberOperator,
    NumberOperatorType,
    NumericValue} from './objects/NumericValue.js';
import { ParamDefinition } from "./objects/ParamDefinition.js";
import { numeric } from "./objects/NumericValue.js";
import { PinDefinition, PinId, PinIdType } from './objects/PinDefinition.js';
import { PinTypes } from './objects/PinTypes.js';
import { ExecutionScope, PropertyTreeKey } from './objects/ExecutionScope.js';
import { AnyReference, CFunctionOptions, CallableParameter, ComplexType, ComponentPin, 
    ComponentPinNet, ComponentPinNetPair, ComponentUnitDefinition, DeclaredReference, 
    FunctionDefinedParameter, UndeclaredReference } from './objects/types.js';
import { ComponentTypes, Delimiter1, FrameType, GlobalDocumentName, 
    ModuleContainsKeyword, NoNetText, ParamKeys, RefdesFileSuffix, ReferenceTypes, SymbolPinSide, 
    ValidPinSides, 
    WireAutoDirection} from './globals.js';
import { BlockTypes } from "./objects/BlockTypes.js";
import { ExecutionWarning, unwrapValue } from "./utils.js";
import { Net } from './objects/Net.js';
import { GraphicExprCommand, PlaceHolderCommands, SymbolDrawingCommands } from './render/draw_symbols.js';
import { BaseVisitor, OnErrorHandler } from './BaseVisitor.js';
import { ParserRuleContext } from 'antlr4ng';
import { BaseError, getPortType, RuntimeExecutionError } from './utils.js';
import { UnitDimension } from './helpers.js';
import { FrameParamKeys } from './objects/Frame.js';
import { ComponentAnnotater } from './annotate/ComponentAnnotater.js';
import { Wire } from './objects/Wire.js';
import { applyPartConditions, ConditionNode, extractPartConditions, flattenConditionNodes } from './ComponentMatchConditions.js';
import { NodeScriptEnvironment } from './environment/environment.js';

export class ParserVisitor extends BaseVisitor {

    constructor(silent = false, 
            onErrorHandler: OnErrorHandler | null = null,
            environment: NodeScriptEnvironment){
        super(silent, onErrorHandler, environment);

        // Dump the environment information
        if (environment){
            this.log('-- Environment --');
            this.log('Module directory: ' + environment.getModuleDirectory());
            this.log('Default libs path: ' + environment.getDefaultLibsPath());
            this.log('Current file: ' + environment.getCurrentFile());
            this.log('-----------------');
        }
    }

    // Provides a numerical index when each component is created.
    componentCreationIndex = 0;

    // TODO: this should be in the scope object?
    creationCtx = new Map<Wire | ClassComponent, ParserRuleContext>();


    visitPin_select_expr = (ctx: Pin_select_exprContext): void => {
        let pinId: PinId | null = null;

        const ctxData = ctx.data_expr();
        const result = this.visitResult(ctxData);

        let pinValue: number | string;

        if (result instanceof NumericValue) {
            pinValue = result.toNumber();
        } else if (typeof result === 'string') {
            pinValue = result;
        } else {
            throw new RuntimeExecutionError("Invalid select pin: " + result, ctx);
        }

        if (pinValue !== undefined) {
            pinId = new PinId(pinValue);
        }

        this.setResult(ctx, pinId);
    }

    trackNewComponentCreated = (callback: () => void): boolean => {
        const preCreatedIndex = this.componentCreationIndex;

        callback();
        
        const postCreatedIndex = this.componentCreationIndex;

        let creationFlag = false;
        if (postCreatedIndex > preCreatedIndex){
            // New component was created!
            creationFlag = true;
        }

        return creationFlag;
    }

    visitAdd_component_expr = (ctx: Add_component_exprContext): void => {
        // Besides component, can also add graphic objects

        let refComponent: ClassComponent;
        const creationFlag = this.trackNewComponentCreated(() => {
            // The component is always the last item
            const [component, pinValue] = 
                this.visitResult(ctx.data_expr_with_assignment());

            this.getExecutor().addComponentExisting(component, pinValue);
            refComponent = component;
        });

        this.linkComponentToCtx(ctx, refComponent!, creationFlag);
    }

    visitAt_component_expr = (ctx: At_component_exprContext): ComponentPin => {
        let refComponent: ClassComponent;

        const creationFlag = this.trackNewComponentCreated(() => {
            const [component, pin] = this.visitResult(ctx.component_select_expr());
            this.getExecutor().atComponent(component, pin, {
                addSequence: true
            });
            
            refComponent = component;
        });

        this.linkComponentToCtx(ctx, refComponent!, creationFlag);
        return this.getExecutor().getCurrentPoint();
    }

    visitTo_component_expr = (ctx: To_component_exprContext): ComponentPin => {
        ctx.component_select_expr().forEach(item => {

            let refComponent: ClassComponent;
            const creationFlag = this.trackNewComponentCreated(() => {
                const [component, pin] = this.visitResult(item);

                try {
                    this.getExecutor().toComponent(component, pin, {
                        addSequence: true
                    });

                    refComponent = component;
                } catch (err) {
                    throw new RuntimeExecutionError(err.message, ctx);
                }
            });

            // Link each item within the 'to' component list
            this.linkComponentToCtx(item, refComponent!, creationFlag);
        });

        return this.getExecutor().getCurrentPoint();
    }

    visitComponent_select_expr = (ctx: Component_select_exprContext): void => {
        const ctxDataExprWithAssigment = ctx.data_expr_with_assignment();
        let componentPin: ComponentPin | null = null;

        if (ctx.Point()) {
            const [component, pin,] = this.getExecutor().getPointBlockLocation();
            componentPin = [component, pin];

        } else if (ctxDataExprWithAssigment) {
            componentPin = this.visitResult(ctxDataExprWithAssigment);

        } else {
            let component = this.getScope().currentComponent!;

            if (component._pointLinkComponent){
                // If the point link component is defined, then use it instead.
                // The current component is a point generated for path blocks.
                component = component._pointLinkComponent;
            }
            
            let pinId: PinId | null = null;

            const ctxPinSelectExpr = ctx.pin_select_expr();
            if (ctxPinSelectExpr) {
                pinId = this.visitResult(ctxPinSelectExpr);
            }

            if (pinId === null) {
                this.throwWithContext(ctx, "Could not resolve pin");
            }

            componentPin = [component, pinId];
        }

        this.setResult(ctx, componentPin);
    }

    visitPath_block = (ctx: Path_blockContext): void => {
        // Check if currently in a block

        let blockType = BlockTypes.Branch; // default first

        if (ctx.Branch()){
            blockType = BlockTypes.Branch;
        } else if (ctx.Join()){
            blockType = BlockTypes.Join;
        } else if (ctx.Parallel()){
            blockType = BlockTypes.Parallel;
        } else if (ctx.Point()){
            blockType = BlockTypes.Point;
        }

        const scope = this.getScope();
        const executor = this.getExecutor();
        const scopeLevel = scope.scopeLevel;

        if (scope.blockStack.has(scopeLevel)){
            const blockStackEntry = scope.blockStack.get(scopeLevel)!;
            if (blockStackEntry.type !== blockType){
                // If the block type is not the same, then close the path blocks
                executor.exitBlocks();
            }
        }

        if (!scope.blockStack.has(scopeLevel)){
            // If not exists, it means the block stack is currently not active,
            // so create it
            executor.enterBlocks(blockType);
        }

        const blockStackEntry = scope.blockStack.get(scopeLevel)!;
        const { current_index } = blockStackEntry;

        executor.enterBlock(current_index);
        this.visit(ctx.expressions_block());
        executor.exitBlock(current_index);

        blockStackEntry.current_index++;
    }

    visitGraph_expressions = (ctx: Graph_expressionsContext): void => {
        this.getExecutor().log('graph expressions', this.getScope().scopeLevel);
        if (ctx.path_block() === null){
            // If this is not a path block statement, then check if a block
            // is currently open
            this.getExecutor().closeOpenPathBlocks();
        }

        this.visitChildren(ctx);

        // For each graph expression, check if there is a refdes file annotation.
        if (ctx.start && ctx.stop) {
            const startToken = ctx.start;
            const stopToken = ctx.stop;

            if (this.filePathStack.length > 0) {
                const useFilePath = this.getCurrentFile();

                const annotationKey = this.getRefdesFileAnnotationKey(
                    useFilePath,
                    startToken.line, startToken.column,
                    stopToken.line, stopToken.column
                );

                if (this.refdesFileAnnotations.has(annotationKey)) {
                    this.log(`refdes annotation key matched: ${annotationKey}`);
                    let refdesValue = this.refdesFileAnnotations.get(annotationKey)!;

                    // Only use the first value for now.
                    refdesValue = refdesValue.split(',')[0];

                    // Force the refdes value to be saved during annotation.
                    this.setCurrentComponentRefdes(refdesValue, true);
                }
            }
        }
    }

    visitCreate_component_expr = (ctx: Create_component_exprContext): void => {
        const scope = this.getScope();

        // Perform validation of the properties first to catch parsing errors.
        scope.setOnPropertyHandler(this.createComponentPropertyValidator());

        scope.enterContext(ctx);

        const ctxPropertiesBlock = ctx.properties_block();
        const properties = this.visitResult(ctxPropertiesBlock);

        scope.exitContext();
        scope.popOnPropertyHandler();

        // Use a unique instance name in the context for now
        let instanceName = this.getExecutor().getUniqueInstanceName();

        const propParams = properties.get('params');
        const params: ParamDefinition[] =
            this.parseCreateComponentParams(propParams);

        if (params.length > 0) {
            // Append the first value to the generated name to add a bit more
            // description/context.
            const firstParam = params[0];
            const paramValue = firstParam.paramValue;
            let appendValue = paramValue.toString();

            if (paramValue instanceof NumericValue) {
                appendValue = paramValue.value;
            }

            instanceName += `${Delimiter1}${appendValue}`;
        }

        const typeProp = properties.get('type') ?? null;
        const copy = properties.get('copy') ?? false;

        const unitDefinitions = this.extractComponentUnitProperties(properties, 
            typeProp);

        const props = {
            type: typeProp,
            copy,

            units: unitDefinitions
        };

        try {
            const createdComponent = this.getExecutor().createComponent(instanceName,
                [], params, props);
                
            this.setResult(ctx, createdComponent);

            createdComponent._creationIndex = this.componentCreationIndex++;

        } catch (error) {
            this.throwWithContext(ctx, (error as BaseError).message)
        }
    }

    private extractComponentUnitDefinition(properties: Map<string, unknown>, 
        typeProp: string | null = null,
        lastNumericPinId = 0): ComponentUnitDefinition {
        
        const width = (properties.get('width') as NumericValue)?? null;
        const height = (properties.get('height') as NumericValue) ?? null;
        const angle = (properties.get(ParamKeys.angle) as NumericValue) ?? null;
        const followWireOrientation = (properties.get('followWireOrientation') as boolean) ?? true;

        const arrange = properties.get('arrange') ?? null;
        const display = (properties.get('display') as SymbolDrawingCommands) ?? null;

        const suffix = (properties.get('suffix') as string) ?? null;

        let pins: PinDefinition[] = [];

        // Assume not a graphic component.
        if (display !== null && arrange === null && typeProp !== ComponentTypes.graphic) {
            // If the display prop is set, then extract the pin information 
            // from the graphic commands.
            // `pins` prop will be ignored.

            const drawCommands = display!.getCommands();
            drawCommands.forEach(command => {
                const [commandValue,] = command;
                if (commandValue === PlaceHolderCommands.vpin
                    || commandValue === PlaceHolderCommands.hpin
                    || commandValue === PlaceHolderCommands.pin) {

                    const id = PinId.from(command[1][0]);

                    const pinType = id.getType();
                    const pinName = id.toString();

                    // TODO: `pin` graphic commands should also allow pin 
                    // type to be set
                    pins.push(new PinDefinition(id, pinType,
                        pinName, PinTypes.Any));
                }
            });
        } else {
            pins = this.extractPinDefintion(properties.get('pins')!, lastNumericPinId);
        }

        return {
            width, 
            height,
            angle,
            followWireOrientation,

            display, arrange,
            pins,
            suffix
        }
    }

    /**
     * Extracts component unit from the properties provided in `create component`
     * @param properties 
     * @param typeProp 
     * @returns 
     */
    private extractComponentUnitProperties(properties: Map<string, any>,
        typeProp: string | null): [string, ComponentUnitDefinition][] {

        let lastNumericPinId = 0;
        
        const unitsProperties: [string, any][] = [];
        for (const [key, value] of properties) {
            if (key.split(':')[0] === 'unit') {
                const unitDef = this.extractComponentUnitDefinition(value, typeProp, lastNumericPinId);

                // Find the largest value for pinId
                unitDef.pins.forEach(pin => {
                    if (pin.id.isNumeric()){
                        lastNumericPinId = Math.max(lastNumericPinId, 
                            pin.id.getValue() as number);
                    }
                });
                
                unitsProperties.push([key, unitDef]);
            }
        }

        // If no unit properties are found, then use the top level component
        // properties to extract the unit definition
        if (unitsProperties.length === 0) {
            unitsProperties.push(['unit',
                this.extractComponentUnitDefinition(properties, typeProp)]);
        }

        return unitsProperties;
    }

    // Creates a validator for the component property definition.
    private createComponentPropertyValidator(): ((path: PropertyTreeKey[], value: any, ctx: ParserRuleContext) => void) {
        const definedPinIds: number[] = []; // Store pin IDs defined
        const arrangedPinIds: number[] = []; //Store pin IDs defined in arrange props

        // Either `arrange` or `display` can be specified, but not both.
        let didDefineArrangeProp = false;
        let didDefineDisplayProp = false;

        const checkPinExistsAndNotDuplicated = (pinId: number, ctx: ParserRuleContext): void => {
            if (definedPinIds.indexOf(pinId) === -1) {
                this.warnings.push({
                    message: `Invalid pin ${pinId}`, ctx
                });
            }

            if (arrangedPinIds.indexOf(pinId) !== -1) {
                this.warnings.push({
                    message: `Pin ${pinId} specified more than once`,
                    ctx,
                });
            }

            arrangedPinIds.push(pinId);
        }

        return (path: PropertyTreeKey[], value: any, ctx: ParserRuleContext) => {
            // const pathText = path.map(item => item[1]);

            if (path.length === 1) {
                const [, keyName] = path[0];

                switch (keyName) {
                    case 'type':
                        this.validateString(value, ctx);
                        break;
                    case 'angle':
                    case 'width':
                    case 'height':
                        this.validateNumeric(value, ctx);
                        break;

                    case 'display':
                        if (didDefineArrangeProp) {
                            throw new RuntimeExecutionError("arrange property has already been defined", ctx);
                        }
                        didDefineDisplayProp = true;
                        break;
                    case 'arrange':
                        if (didDefineDisplayProp) {
                            throw new RuntimeExecutionError("display property already defined", ctx);
                        }
                        didDefineArrangeProp = true;
                        break;

                    case 'pins':
                        if (!(value instanceof Map)) {
                            this.validateNumeric(value, ctx);

                            // If a number is defined for the pins property, then
                            // it indicates a running sequence of pins from 1-n.
                            // Populate the definedPinIds with this running
                            // sequence.
                            const numPins = (value as NumericValue).toNumber();
                            for (let i = 0; i < numPins; i++) {
                                definedPinIds.push(i + 1);
                            }
                        }
                        break;
                    case 'copy':
                        if (value instanceof NumericValue) {
                            this.validateNumeric(value, ctx);
                        } else if (typeof value === 'boolean') {
                            this.validateBoolean(value, ctx);
                        } else {
                            // All other types
                            throw new RuntimeExecutionError("Invalid value for 'copy' property", ctx);
                        }
                        break;
                }
            } else {
                const [, keyName] = path[0] as [ParserRuleContext, string];
                if (keyName === 'arrange') {
                    const [sideKeyCtx, sideKeyName] = path[1] as [ParserRuleContext, string];
                    if (ValidPinSides.indexOf(sideKeyName) === -1) {
                        throw new RuntimeExecutionError(`Invalid side ${sideKeyName} in arrange`, sideKeyCtx);
                    } else {
                        if (path.length === 2 && value instanceof NumericValue) {
                            // Where only a single pin is defined in the arrange.<side> key,
                            // then the only value will be a numeric value
                            checkPinExistsAndNotDuplicated(value.toNumber(), ctx);

                        } else if (path.length > 2 && path[2][0] === 'index') {
                            // Checking each element
                            if (Array.isArray(value)) {
                                const goodBlank = value.length === 1 &&
                                    value[0] instanceof NumericValue;
                                if (!goodBlank) {
                                    throw new RuntimeExecutionError(`Invalid blank specifier`, ctx);
                                }
                            } else {
                                // Only allow numbers for now, next time will support ID names/strings
                                if (!(value instanceof NumericValue) && !(typeof value === 'string')) {
                                    throw new RuntimeExecutionError(`Invalid numeric value for arrange.${sideKeyName}`, ctx);
                                } else {
                                    let useValue: any;
                                    if (value instanceof NumericValue) {
                                        useValue = value.toNumber();
                                    } else if (typeof value === 'string') {
                                        useValue = value;
                                    }
                                    value && checkPinExistsAndNotDuplicated(useValue, ctx);
                                }
                            }
                        }
                    }
                } else if (keyName === 'params') {
                    const [, subKeyName] = path[1] as [ParserRuleContext, string];
                    switch (subKeyName) {
                        case 'mpn':
                        case 'refdes':
                        case 'footprint':
                            this.validateString(value, ctx);
                            break;
                        case 'place':
                            this.validateBoolean(value, ctx);
                            break;

                    }
                } else if (keyName === 'pins') {
                    if (path.length === 2) {

                        const idName = path[1][1];  // The property key token
                        definedPinIds.push(idName);

                        if (value.length === 2) {
                            // Pin type is defined as the first item 
                            const [pinType,] = value;
                            if (pinType instanceof UndeclaredReference) {
                                throw new RuntimeExecutionError(`Invalid pin type: ${pinType.reference.name}`, ctx);
                            }
                        }
                    }
                }
            }
        }
    }

    visitCreate_graphic_expr = (ctx: Create_graphic_exprContext): void => {
        const ctxId = ctx.ID();
        const paramIds = [];
        if (ctxId !== null) {
            const varName = ctxId.getText();
            // assign this value to the component value
            paramIds.push(varName);

            // create blank object first, so that the reference exists
            this.getScope().setVariable(varName, {});
        }

        const executor = this.getExecutor();

        // Save stack structure to reference the variables
        const stack = [...this.executionStack];

        const drawing = new SymbolDrawingCommands(variables => {
            if (variables && paramIds.length > 0) {
                // Evaluate into an object
                const obj = {};
                variables.forEach((value, key) => {
                    obj[key] = value;
                });

                executor.scope.setVariable(paramIds[0], obj);
            }

            // Set to execution stack for running the callbacks, do not
            // override the reference!!
            const currentStack = this.executionStack.splice(0); // remove all elements
            this.executionStack.push(...stack);

            const graphicsExpressionsCtx = ctx.graphic_expressions_block();
            const commands = this.visitResult(graphicsExpressionsCtx);

            // Restore the stack
            this.executionStack.splice(0);
            this.executionStack.push(...currentStack);

            return commands;
        });

        drawing.source = ctx.getText();
        // drawing.paramIds = paramIds;

        this.setResult(ctx, drawing);
    }

    visitGraphic_expressions_block = (ctx: Graphic_expressions_blockContext): void => {
        const commands = ctx.graphic_expr().reduce((accum, item) => {
            const [commandName, parameters] =
                this.visitResult(item) as [string, CallableParameter[]];

            if (commandName === PlaceHolderCommands.for) {
                accum = accum.concat(parameters);
            } else {
                const keywordParams = new Map<string, any>();
                const positionParams = parameters.reduce(
                    (accum, [argType, name, value]) => {
                        if (argType === 'position') {
                            accum.push(value);
                        } else {
                            keywordParams.set(name, value);
                        }
                        return accum;
                    }, [] as any[]);

                let useCommandName = commandName;
                let usePositionParams = positionParams;

                // Replace center-rects with normal rects
                if (commandName === PlaceHolderCommands.crect) {
                    useCommandName = PlaceHolderCommands.rect;
                    const [centerX, centerY, width, height] = positionParams as NumericValue[];

                    // Keep in original user-land units
                    const newX = centerX.sub(width.half());
                    const newY = centerY.sub(height.half());
                    usePositionParams = [newX, newY, width, height];
                }

                accum.push([useCommandName, usePositionParams, keywordParams, item]);
            }

            return accum;
        }, [] as GraphicExprCommand[]);

        this.setResult(ctx, commands);
    }

    visitGraphicCommandExpr = (ctx:GraphicCommandExprContext): void => {
        let commandName: string | null = null;
        const command = ctx._command;

        if (command) {
            commandName = command.text!;
        } else {
            throw "Invalid command!";
        }

        let parameters: CallableParameter[] = [];

        const ctxPropertiesBlock = ctx.properties_block();
        if (ctxPropertiesBlock) {
            const nestedKeyValues = this.visitResult(ctxPropertiesBlock);

            nestedKeyValues.forEach((value: any, key: any) => {
                // Values will be used by graphics command, so unwrap any
                // references.
                parameters.push(['keyword', key, unwrapValue(value)]);
            });

        } else {
            parameters = this.visitResult(ctx.parameters()!);
        }

        // For the `label` command, allow both 'in' and 'out' as shortform
        // values to portType
        if (commandName === PlaceHolderCommands.label) {
            parameters.forEach(item => {
                if (item[0] == 'keyword' && item[1] === 'portType') {
                    if (item[2] === 'in') {
                        item[2] = 'input';
                    } else if (item[2] === 'out') {
                        item[2] = 'output';
                    }
                }
            });
        }

        this.setResult(ctx, [commandName, parameters]);
    }

    visitGraphicForExpr = (ctx: GraphicForExprContext): void => {
        const forVariableNames = ctx.ID().map(item => item.getText());
        const listItems = unwrapValue(this.visitResult(ctx.data_expr()));

        let keepLooping = true;
        let counter = 0;
        let allCommands: CallableParameter[] = [];

        while (keepLooping) {
            if (counter < listItems.length) {
                let useValueArray: unknown[] = listItems[counter];
                if (!Array.isArray(useValueArray)) {
                    useValueArray = [useValueArray];
                }

                useValueArray.forEach((value, index) => {
                    this.getScope().setVariable(
                        forVariableNames[index], value);
                });

                const commands = 
                    this.visitResult(ctx.graphic_expressions_block()!);

                allCommands = allCommands.concat(commands);

                counter += 1;
            } else {
                keepLooping = false;
            }
        }

        this.setResult(ctx, [PlaceHolderCommands.for, allCommands]);
    }

    visitCreate_module_expr = (ctx: Create_module_exprContext): void => {
        const properties = this.getPropertyExprList(ctx.property_expr());

        const modulePorts = this.parseCreateModulePorts(properties.get('ports'));

        const { 
            [SymbolPinSide.Left]: leftPorts, 
            [SymbolPinSide.Right]: rightPorts, 
            [SymbolPinSide.Top]: topPorts, 
            [SymbolPinSide.Bottom]: bottomPorts 
        } = modulePorts; 

        // Go through all ports in the list and skip items that are arrays. Arrays
        // are blank pin/port definition.
        const allPorts = [...leftPorts, ...rightPorts, 
            ...topPorts, ...bottomPorts].filter(item => {
            
            return !(Array.isArray(item));
        }) as string[];

        const nameToPinId = new Map<string, number>();

        // Assign pin Id
        const tmpPorts = allPorts.map((portName, index) => {
            nameToPinId.set(portName, index+1);
            
            return new PinDefinition(
                index + 1,
                PinIdType.Int,
                portName,
                PinTypes.Any
            );
        });

        const arrange = this.getArrangePropFromModulePorts(
            modulePorts, nameToPinId
        );

        const unitProperties = this.extractComponentUnitProperties(properties, 
            ComponentTypes.module);

        const firstUnitDef = unitProperties[0][1];
        firstUnitDef.pins = tmpPorts;
        firstUnitDef.arrange = arrange;

        const blankParams: ParamDefinition[] = [];
        const props = {
            /** Should behave like a normal component (resistor, cap, etc.), 
             * do not duplicate the module if referenced. */
            copy: false,

            units: unitProperties,
        };

        const moduleInstanceName = this.getExecutor().getUniqueInstanceName();
        const moduleComponent = this.getExecutor().createComponent(
            moduleInstanceName, tmpPorts, blankParams, props, true) as ModuleComponent;

        moduleComponent.typeProp = ComponentTypes.module;

        const ctxPropertyBlock = ctx.property_block_expr();
        if (ctxPropertyBlock) {
            // Only parse the first one, ignore the others!
            const [firstBlock] = ctxPropertyBlock;
            const [keyName, expressionsBlock] = this.visitResult(firstBlock);

            if (keyName === ModuleContainsKeyword) {
                moduleComponent.moduleContainsExpressions = expressionsBlock;
                
                this.expandModuleContains(moduleComponent, 
                    this.getExecutor().netNamespace);
            }
        }

        if (moduleComponent.moduleContainsExpressions === undefined){
            throw 'Module has no `contains` block defined!';
        }

        this.setResult(ctx, moduleComponent);
    }

    visitProperty_block_expr = (ctx: Property_block_exprContext): void  => {
        const keyName = this.visitResult(ctx.property_key_expr());

        const expressionsBlock = ctx.expressions_block();

        this.setResult(ctx, [keyName, expressionsBlock]);
    }

    visitProperty_expr = (ctx: Property_exprContext): void => {
        const ctxKey = ctx.property_key_expr();
        const ctxValue = ctx.property_value_expr();
        
        const scope = this.getScope();

        this.getScope().enterContext(ctxKey);
        this.getScope().enterContext(ctxValue);

        const keyName = this.visitResult(ctxKey);
        const value = this.visitResult(ctxValue);

        scope.triggerPropertyHandler(this, value, ctxValue);

        this.getScope().exitContext();
        this.getScope().exitContext();

        if (value instanceof UndeclaredReference && (
            value.reference.rootValue === undefined
            && value.reference.value === undefined
        )) {
            throw value.throwMessage();
        }

        const map = new Map<string, unknown>();
        map.set(keyName, value);
        this.setResult(ctx, map);
    }

    visitSingle_line_property = (ctx: Single_line_propertyContext): void => {
        this.getScope().enterContext(ctx);

        let value;
        if (ctx.data_expr().length === 1) {
            value = this.visitResult(ctx.data_expr(0)!);
        } else {
            value = ctx.data_expr().map((item, index) => {
                this.getScope().enterContext(index);
                const result = this.visitResult(item);
                this.getScope().triggerPropertyHandler(this, result, item);
                this.getScope().exitContext();
                return result;
            });
        }

        this.getScope().exitContext();
        this.setResult(ctx, value);
    }

    visitProperties_block = (ctx: Properties_blockContext): void => {
        const result = new Map<string, any>();

        // For duplicated keys, track a counter value with the key.
        const keyCounter = new Map<string, number>();

        ctx.property_expr().forEach(item => {
            const property: Map<string, any> = this.visitResult(item);

            // Get out all items, by default
            for (const [key, value] of property) {

                let useKey = key;

                const counterValue = keyCounter.get(key) ?? 0;
                keyCounter.set(key, counterValue + 1);

                if (counterValue > 0){
                    useKey = key + ':' + counterValue;
                }

                result.set(useKey, value);
            }
        });

        this.setResult(ctx, result);
    }

    visitNested_properties = (ctx: Nested_propertiesContext): void => {
        this.passResult(ctx, ctx.children[0]);
    }

    visitProperty_key_expr = (ctx: Property_key_exprContext): void => {
        const ctxID = ctx.ID();
        const ctxIntegerValue = ctx.INTEGER_VALUE();
        const ctxStringValue = ctx.STRING_VALUE();

        let result: string| number| null = null;
        if (ctxID) {
            result = ctxID.getText();
        } else if (ctxIntegerValue) {
            result = Number(ctxIntegerValue.getText());
        } else if (ctxStringValue) {
            result = this.prepareStringValue(ctxStringValue.getText());
        }
        this.setResult(ctx, result);
    }

    visitData_expr_with_assignment = (ctx: Data_expr_with_assignmentContext): void => {
        let dataResult: ComplexType = null;
        let componentCtx!: ParserRuleContext;

        const ctxDataExpr = ctx.data_expr();
        const ctxAssignmentExpr = ctx.assignment_expr();

        if (ctxDataExpr) {
            componentCtx = ctxDataExpr;

            this.setResult(ctxDataExpr, { keepReference: true });
            const reference = this.visitResult(ctxDataExpr) as AnyReference;
            if (reference.found) {
                dataResult = unwrapValue(reference);
            } else {
                const { trailers = [], rootValue = null } = reference;
                if (rootValue instanceof ClassComponent && trailers.length > 0 
                    && trailers[0] === ModuleContainsKeyword) {
                    
                    dataResult = rootValue;
                    this.placeModuleContains(dataResult as ModuleComponent);
                }
            }

        } else if (ctxAssignmentExpr) {
            dataResult = this.visitResult(ctxAssignmentExpr);
            componentCtx = ctxAssignmentExpr;
        }

        // Unwrap the reference, if it is a reference.
        dataResult = unwrapValue(dataResult);

        if (dataResult === null || dataResult === undefined) {
            if (componentCtx){
                this.throwWithContext(componentCtx, 
                    "Could not find component: " + componentCtx.getText());
            } else {
                this.throwWithContext(ctx, "Failed to parse");
            }
        }

        if (dataResult instanceof ClassComponent
            && dataResult.copyProp) {
            dataResult = this.getExecutor().copyComponent(dataResult);
        }

        if (dataResult && dataResult instanceof ClassComponent) {
            // Modifiers will only affect the default component unit.
            const defaultUnit = dataResult.getUnit();

            const modifiers = ctx.component_modifier_expr();
            modifiers.forEach(modifier => {
                const modifierText = modifier.ID(0)!.getText();
                const ctxDataExpr = modifier.data_expr()!;

                // This is needed to preserve the IDs for xy, etc.
                this.setResult(ctxDataExpr, {keepReference: true});
                const result = this.visitResult(ctxDataExpr);

                let shouldIgnoreWireOrientation = false;

                if (modifierText === ParamKeys.flip) {
                    const flipValue = result.name;
                    if (flipValue.indexOf('x') !== -1) {
                        defaultUnit.setParam(ParamKeys.flipX, numeric(1));
                        shouldIgnoreWireOrientation = true;
                    }

                    if (flipValue.indexOf('y') !== -1) {
                        defaultUnit.setParam(ParamKeys.flipY, numeric(1));
                        shouldIgnoreWireOrientation = true;
                    }
                } else if (modifierText === ParamKeys.angle) {
                    defaultUnit.setParam(ParamKeys.angle, result as NumericValue);
                    shouldIgnoreWireOrientation = true;
                } else if (modifierText === 'anchor') {
                    // Do not apply to the component unit, but to component itself.
                    dataResult.setParam('anchor', result.name as string);
                }

                if (shouldIgnoreWireOrientation) {
                    // User defined modifiers will overwrite the
                    // wire orientation
                    defaultUnit.useWireOrientationAngle = false;
                }
            });
        }

        let pinValue: number | string | null = null;
        const ctxPinSelectExpr = ctx.pin_select_expr();

        if (ctxPinSelectExpr) {
            pinValue = this.visitResult(ctxPinSelectExpr);
        } else {
            if (dataResult instanceof ClassComponent) {
                pinValue = (dataResult as ClassComponent).getDefaultPin();
            } else {
                const undeclaredRef = (dataResult as UndeclaredReference);
                this.throwWithContext(
                    componentCtx,
                    'Invalid component: ' + undeclaredRef.reference.name
                )
            }
        }

        this.setResult(ctx, [dataResult, pinValue]);
    }

    /** Creates a new context and execute the expressions within the module
     *  `contains` block. */
    private expandModuleContains(component: ModuleComponent, netNamespace: string): void {
        this.getExecutor().log('expanding module `contains`')

        const executionStack = this.executionStack;
        const executor = this.getExecutor();

        const executionContextName = 
            executor.namespace + Delimiter1
            + component.instanceName
            + Delimiter1 + component.moduleCounter;

        const tmpNamespace = this.getNetNamespace(
            netNamespace,
            "+/" + component.instanceName + Delimiter1 + component.moduleCounter
        );

        this.enterNewChildContext(
            executionStack,
            executor,
            executionContextName,
            { netNamespace: tmpNamespace }, [], []
        );

        component.moduleCounter += 1;

        // Create all the internal circuits of the module
        this.visit(component.moduleContainsExpressions);

        // Done with the new context
        const executionContext = executionStack.pop()!;

        // Defer the merging of execution context
        component.moduleExecutionContext = executionContext;
        component.moduleExecutionContextName = executionContextName;

        this.linkModuleSymbolWithContains(component, executionContext);
    }

    private linkModuleSymbolWithContains(moduleComponent: ModuleComponent,
        executionContext: ExecutionContext): void {

        this.log('link module symbol')

        // Link the module pins with the internal pins
        const modulePinMapping = new Map<string, number>();

        moduleComponent.pins.forEach(pin => {
            const pinName = pin.name;
            modulePinMapping.set(pinName, pin.id);
        });

        const pinIdToPortMap = new Map<number, ClassComponent>();
        moduleComponent.modulePinIdToPortMap = pinIdToPortMap;

        for (const [, component] of executionContext.scope.instances) {
            if (component._copyID !== null && component.typeProp === ComponentTypes.port) {
                // Link sub-circuit ports to module pin

                // Get the port name, which is the net name
                const portName = component.parameters.get(ParamKeys.net_name);
                const modulePinId = modulePinMapping.get(portName)!;

                pinIdToPortMap.set(modulePinId, component);

                // Determine the port type and apply back to the module
                // symbol
                const portType = getPortType(component);
                const tmpPin = moduleComponent.pins.get(modulePinId)!;
                tmpPin.pinType = portType;
            }
        }
    }

    private placeModuleContains(moduleComponent: ModuleComponent):void {
        if (moduleComponent.typeProp === ComponentTypes.module
            && moduleComponent.moduleContainsExpressions) {
            this.log('place module `contains`');

            // Merge directly into the current execution namespace
            this.getExecutor().mergeScope(
                moduleComponent.moduleExecutionContext.scope,
                moduleComponent.moduleExecutionContextName
            );

            this.log('connect module ports');
            // Link module ports to inner ports
            for(const [pinId, portComponent] of moduleComponent.modulePinIdToPortMap){
                this.getExecutor().atComponent(
                    moduleComponent, pinId
                );

                this.getExecutor().toComponent(
                    portComponent, 1
                );
            }
        }
    }

    visitUnaryOperatorExpr = (ctx: UnaryOperatorExprContext): void => {
        let value = this.visitResult(ctx.data_expr());

        if (ctx.Not()) {
            if (typeof value === "boolean") {
                value = !value;
            } else if (value instanceof NumericValue){
                value = (value.toNumber() === 0) ? true: false;
            } else {
                throw "Failed to do Not operator";
            }
        } else if (ctx.Minus()) {
            if (value instanceof NumericValue){
                value = value.neg();
            } else {
                throw "Failed to do Negation operator";
            }
        }

        this.setResult(ctx, value);
    }

    visitCreate_expr = (ctx: Create_exprContext):void => {
        let value: ComplexType;

        const ctxCreateComponentExpr = ctx.create_component_expr();
        const ctxCreateGraphicExpr = ctx.create_graphic_expr();
        const ctxCreateModuleExpr = ctx.create_module_expr();

        if (ctxCreateComponentExpr) {
            value = this.visitResult(ctxCreateComponentExpr);
        } else if (ctxCreateGraphicExpr) {
            value = this.visitResult(ctxCreateGraphicExpr);
        } else if (ctxCreateModuleExpr) {
            value = this.visitResult(ctxCreateModuleExpr);
        } else {
            throw "Invalid data expression";
        }

        this.setResult(ctx, value);
    }

    visitCreateExpr = (ctx: CreateExprContext): void => {
        const result = this.visitResult(ctx.create_expr());
        this.setResult(ctx, result);
    }

    visitBinaryOperatorExpr = (ctx: BinaryOperatorExprContext): void => {
        const ctx0 = ctx.data_expr(0)!;
        const ctx1 = ctx.data_expr(1)!;

        let value1: number | boolean | NumericValue = this.visitResult(ctx0);
        let value2: number | boolean | NumericValue = this.visitResult(ctx1);

        if (value1 instanceof NumericValue) {
            value1 = value1.toNumber();
        }

        if (value2 instanceof NumericValue) {
            value2 = value2.toNumber();
        }

        let result: boolean | null = null;

        if (ctx.Equals()) {
            result = value1 == value2; // Boolean result
        } else if (ctx.NotEquals()) {
            result = value1 != value2;
        } else if (ctx.GreaterThan()) {
            result = value1 > value2;
        } else if (ctx.GreatOrEqualThan()) {
            result = value1 >= value2;
        } else if (ctx.LessThan()) {
            result = value1 < value2;
        } else if (ctx.LessOrEqualThan()) {
            result = value1 <= value2;
        }

        this.setResult(ctx, result);
    }

    visitLogicalOperatorExpr = (ctx: LogicalOperatorExprContext): void => {
        const ctx0 = ctx.data_expr(0)!;
        const ctx1 = ctx.data_expr(1)!;

        let value1: number | boolean | NumericValue = this.visitResult(ctx0);
        if (value1 instanceof NumericValue){
            value1 = value1.toNumber();
        }

        let value2: number | boolean = false;

        let skipNext = false;

        const isLogicalOr = ctx.LogicalOr();

        if (isLogicalOr && value1){
            // Since evaluated true already, can skip the parsing of the next
            skipNext = true;
        }

        if (!skipNext){
            value2 = this.visitResult(ctx1);
            if (value2 instanceof NumericValue){
                value2 = value2.toNumber();
            }    
        }
        
        let result: number | boolean | null = null;

        if (ctx.LogicalAnd()) {
            result = value1 && value2;

        } else if (isLogicalOr) {
            result = value1 || value2;
        }

        if (typeof result === "number"){
            result = numeric(result);
        }

        this.setResult(ctx, result);
    }

    visitMultiplyExpr = (ctx: MultiplyExprContext): void => {
        const value1 = this.resolveDataExpr<number>(ctx.data_expr(0));
        const value2 = this.resolveDataExpr<number>(ctx.data_expr(1));
        
        const operator = new NumberOperator();
        const tmpValue1 = operator.prepare(value1);
        const tmpValue2 = operator.prepare(value2);

        let result: number | null | NumberOperatorType = null;
        if (ctx.Multiply()) {
            result = operator.multiply(tmpValue1, tmpValue2);
        } else if (ctx.Divide()) {
            result = operator.divide(tmpValue1, tmpValue2);
        } else if (ctx.Modulus()) {
            result = operator.modulus(tmpValue1, tmpValue2);
        }

        this.setResult(ctx, result);
    }

    visitAdditionExpr = (ctx: AdditionExprContext): void => {
        const value1 = unwrapValue(
            this.resolveDataExpr<number>(ctx.data_expr(0)));
        const value2 = unwrapValue(
            this.resolveDataExpr<number>(ctx.data_expr(1)));

        if (ctx.Addition() && (typeof value1 === 'string' || typeof value2 === 'string')) {
            // String concatenation

            let tmpValue1 = value1;
            if (value1 instanceof NumericValue) {
                tmpValue1 = value1.toDisplayString();
            }

            let tmpValue2 = value2;
            if (value2 instanceof NumericValue) {
                tmpValue2 = value2.toDisplayString();
            }

            const result = tmpValue1 + tmpValue2;
            this.setResult(ctx, result);

        } else {
            const operator = new NumberOperator();
            const tmpValue1 = operator.prepare(value1);
            const tmpValue2 = operator.prepare(value2);

            let result: number | null | NumberOperatorType = null;
            if (ctx.Addition()) {
                result = operator.addition(tmpValue1, tmpValue2);
            } else if (ctx.Minus()) {
                result = operator.subtraction(tmpValue1, tmpValue2);
            }
            this.setResult(ctx, result);
        }
    }

    visitFunction_def_expr = (ctx: Function_def_exprContext): void => {
        const functionName = ctx.ID().getText();
        
        // TODO: include the filepath
        const uniqueFunctionID = '__._' + ctx.start!.line + '_' 
            + ctx.start!.column + '_' + functionName + '_' + this.environment.hashStringSHA256(ctx.getText());

        // These are the defined arguments for the function
        let funcDefinedParameters: FunctionDefinedParameter[] = [];
        const ctxFunctionArgsExpr = ctx.function_args_expr();
        if (ctxFunctionArgsExpr) {
            funcDefinedParameters = this.visitResult(ctxFunctionArgsExpr);
        }

        const executionStack = this.executionStack;
        const functionCounter = { counter: 0 };

        const resolveNet = this.createNetResolver(executionStack);
        const resolveComponentPinNet = this.createComponentPinNetResolver(executionStack);

        const __runFunc = (passedInParameters:CallableParameter[], 
            options: CFunctionOptions): [
            executionContext: ExecutionContext, 
            result: ComplexType | null] => {

            // The function definition context is used, because this is the 
            // part where the repetition starts, so the refdes needs to be
            // indexed.
            const executor = this.getExecutor();

            const functionCounterIndex = functionCounter['counter'];
            functionCounter['counter'] += 1;
            
            const executionContextName = `${functionName}-${functionCounterIndex}`;
        
            const newExecutor = this.handleEnterContext(executor, executionStack, 
                executionContextName, ctx, options, 
                funcDefinedParameters, passedInParameters);

            // TODO: check if need to overwrite this.
            newExecutor.resolveNet = resolveNet;
            newExecutor.resolveComponentPinNet = resolveComponentPinNet;

            const returnValue = this.runExpressions(newExecutor,
                ctx.function_expr());
            
            // Function execution is completed, get the last executor
            const lastExecution = this.handlePopContext(executor,
                executionStack,
                executionContextName
            );

            // Return the last execution context and the final return value of the function
            return [lastExecution, returnValue];
        };

        this.getExecutor().createFunction(
            this.getExecutor().namespace, functionName, __runFunc, 
            ctx, uniqueFunctionID);
    }

    visitAt_block_pin_expr = (ctx: At_block_pin_exprContext): void => {
        const executor = this.getExecutor();

        // Store the current location
        const [currentComponent, currentPin] = executor.getCurrentPoint();

        // Close any open path blocks. Depending on path block type, 
        // this might change the current location, so the earlier statement
        // saves the correct location within the `at` block.
        executor.closeOpenPathBlocks(); 

        const propKey = this.visitResult(ctx.property_key_expr());
        const atPin: PinId = new PinId(propKey);

        executor.atComponent(currentComponent, atPin, {
            addSequence: true
        });

        executor.log('at block pin expressions');

        const ctxExpression = ctx.expression();
        const ctxExpressionsBlock = ctx.expressions_block();

        if (ctxExpression) {
            this.visit(ctxExpression);
        } else if (ctxExpressionsBlock) {
            this.visit(ctxExpressionsBlock);
        }

        executor.log('end at block pin expressions');

        // Go back to the original position
        executor.atComponent(currentComponent, currentPin);
    }

    visitAt_block_header = (ctx: At_block_headerContext):void => {
        // This is only used for adding refdes annotation.
        // Extract the component link and attach it to this context instead, so
        // that the insertion point for the comment will be correct (after
        // the ':' character)

        const ctxAtComponent = ctx.at_component_expr();
        this.visit(ctxAtComponent);

        const [currentComponent, ] = this.getExecutor().getCurrentPoint();  

        this.componentCtxLinks.delete(ctxAtComponent);
        this.componentCtxLinks.set(ctx, currentComponent);

        // Multiple annotation comments might be set.
        ctx.annotation_comment_expr().forEach(ctx => {
            this.visit(ctx);
        });
    }

    visitAt_block = (ctx: At_blockContext): void => {
        const executor = this.getExecutor();
        executor.log('entering at block');

        const ctxAtBlockComponent = ctx.at_block_header();
        this.visit(ctxAtBlockComponent);

        const [currentComponent, currentPin] = executor.getCurrentPoint();        
        executor.scope.scopeLevel += 1;

        ctx.at_block_expressions().forEach(expression => {
            this.visit(expression);
        });

        executor.scope.scopeLevel -= 1;

        // Once all done, then restore
        executor.scope.setCurrent(currentComponent, currentPin);

        executor.log('leaving at block');

        // executor.getCurrentPoint();
    }

    visitWire_expr = (ctx: Wire_exprContext): void => {
        const segments = [];
        ctx.ID().forEach((ctxId, index) => {
            const value = ctxId.getText();
            const ctxDataExpr = ctx.data_expr(index);

            if ((value === WireAutoDirection.Auto || value === WireAutoDirection.Auto_) && ctxDataExpr === null) {
                segments.push([value]);
            } else if (this.acceptedDirections.indexOf(value) !== -1 && ctxDataExpr) {
                let useValue: number | null = null;
                useValue = this.visitResult(ctxDataExpr);

                if (useValue instanceof NumericValue) {
                    useValue = useValue.toNumber();
                }

                segments.push([value, new UnitDimension(useValue)]);
            } else {
                // Invalid segment
                this.throwWithContext(ctx, "Invalid wire expression");
            }
        });

        if (segments.length === 0){
            this.throwWithContext(ctx, "Invalid wire expression");
        }
        
        const newWire = this.getExecutor().addWire(segments);
        this.creationCtx.set(newWire, ctx);
    }

    visitPoint_expr = (ctx: Point_exprContext): ComponentPin => {
        const ctxDataExpr = ctx.data_expr();

        this.setResult(ctxDataExpr, { keepReference: true });
        const result = this.visitResult(ctxDataExpr);

        let pointValue: string;
        if (result.found) {
            const resultValue = unwrapValue(result);
            if (typeof resultValue === 'string') {
                pointValue = resultValue;
            } else {
                throw new RuntimeExecutionError('Invalid value for point');
            }
        } else {
            pointValue = result.name;
        }

        return this.getExecutor().addPoint(pointValue);
    }
    
    visitDouble_dot_property_set_expr = (ctx: Double_dot_property_set_exprContext): void => {
        const result = this.visitResult(ctx.data_expr());
        const propertyName = ctx.ID().getText();
        this.getExecutor().setProperty('..' + propertyName, result);
    }

    visitExpressions_block = (ctx: Expressions_blockContext): void => {
        this.runExpressions(this.getExecutor(), ctx.expression());
    }

    visitFrame_expr = (ctx: Frame_exprContext): void => {
        // Frame can be either a 'sheet' or 'frame'. 'sheet' frames have 
        // fixed dimensions based on the document page size.

        let frameType = FrameType.Frame;
        if (ctx.Sheet()) {
            frameType = FrameType.Sheet;
        }

        const frameId = this.getExecutor().enterFrame(frameType);
        this.visit(ctx.expressions_block());
        this.getExecutor().exitFrame(frameId);
    }

    visitNet_namespace_expr = (ctx: Net_namespace_exprContext): void => {
        let dataValue: AnyReference;

        let netNamespace = null;
        const hasPlus = ctx.Addition();

        const ctxDataExpr = ctx.data_expr();

        if (ctxDataExpr) {
            this.setResult(ctxDataExpr, {keepReference: true});
            dataValue = this.visitResult(ctxDataExpr);

            if (!dataValue.found) {
                netNamespace = "/" + dataValue.name;
            } else if (typeof dataValue === "string") {
                netNamespace = "/" + dataValue;
            } else {
                throw "Failed to resolve net namespace value";
            }

        } else {
            // If no net namespace specified, then the global namespace
            // is assumed.
            netNamespace = "/";
        }

        this.setResult(ctx, (hasPlus ? "+" : "") + netNamespace);
    }

    visitIf_expr = (ctx: If_exprContext): void => {
        const result = this.visitResult(ctx.data_expr());

        let resultValue = result;
        if (result instanceof UndeclaredReference){
            resultValue = false;
        }

        if (resultValue) {
            this.visit(ctx.expressions_block());
        } else {
            const ctxInnerIfExprs = ctx.if_inner_expr();
            let innerIfWasTrue = false;

            for (let i = 0; i < ctxInnerIfExprs.length; i++) {
                const innerResult = this.visitResult(ctxInnerIfExprs[i]);

                // If this was true, then ignore further states
                if (innerResult) {
                    innerIfWasTrue = true;
                    break;
                }
            }

            if (!innerIfWasTrue) {
                // Run the else statement
                const elseCtx = ctx.else_expr();

                if (elseCtx) {
                    this.visit(elseCtx);
                }
            }
        }
    }

    visitIf_inner_expr = (ctx: If_inner_exprContext): void => {
        const result = this.visitResult(ctx.data_expr());

        if (result) {
            this.visit(ctx.expressions_block());
        }

        this.setResult(ctx, result);
    };

    visitWhile_expr = (ctx: While_exprContext): void => {
        const dataExpr = ctx.data_expr();
        let keepLooping = true;

        this.log('enter while loop');

        const executor = this.getExecutor();
        executor.addBreakContext(ctx);

        let counter = 0;

        while (keepLooping) {
            // Evaulate the while condition
            const result = this.visitResult(dataExpr);

            if (result) { // some truthy value

                executor.setBreakContextIndex(counter);

                // Reset counter for any function calls within
                executor.resetBreakContextFunctionCalls();

                this.visit(ctx.expressions_block());
                keepLooping = true;

                const currentResult = this.getResult(ctx) ?? {};
                const {breakSignal = false, continueSignal = false} = currentResult;
               
                if (breakSignal && !continueSignal) {
                    keepLooping = false;

                } else if (breakSignal && continueSignal) {
                    // Reset these signals
                    this.setResult(ctx, {
                        ...currentResult,
                        breakSignal: false,
                        continueSignal: false
                    });
                }

                counter++;
            } else {
                keepLooping = false;
            }
        }

        this.getExecutor().popBreakContext();
        this.log('exit while loop');
    }

    visitFor_expr = (ctx: For_exprContext): void => {
        this.log('in for loop');
        const forVariableNames = ctx.ID().map(item => item.getText());
        let listItems = this.visitResult(ctx.data_expr());
        listItems = unwrapValue(listItems);

        const executor = this.getExecutor();
        executor.addBreakContext(ctx);

        let keepLooping = true;
        let counter = 0;

        while (keepLooping) {
            if (counter < listItems.length) {

                let useValueArray: unknown[] = listItems[counter];
                if (!Array.isArray(useValueArray)) {
                    useValueArray = [useValueArray];
                }

                useValueArray.forEach((value, index) => {
                    this.getScope().setVariable(
                        forVariableNames[index], value);
                });

                executor.setBreakContextIndex(counter);
                
                // Reset counter for any function calls within
                executor.resetBreakContextFunctionCalls();

                this.visit(ctx.expressions_block());
                keepLooping = true;

                const currentResult = this.getResult(ctx) ?? {};
                const {breakSignal = false, continueSignal = false} = currentResult;
                this.log('condition result: ', breakSignal, continueSignal);
               
                if (breakSignal && !continueSignal) {
                    keepLooping = false;

                } else if (breakSignal && continueSignal) {
                    // Reset these signals
                    this.setResult(ctx, {
                        ...currentResult,
                        breakSignal: false,
                        continueSignal: false
                    });
                }

                counter += 1;
            } else {
                keepLooping = false;
            }
        }

        executor.popBreakContext();
    }

    private setCurrentComponentRefdes(refdesValue: string, forceSave = false): void {
        const currentComponent = this.getScope().currentComponent;

        if (currentComponent !== null) {
            if (refdesValue.indexOf('_') === -1) {
                // Normal refdes, not a placeholder refdes
                currentComponent.setParam('refdes', refdesValue);
            } else {
                // Store the placeholder refdes. In the annotation stage, this
                // will be used.
                currentComponent.placeHolderRefDes = refdesValue;
            }
            currentComponent.forceSaveRefdesAnnotation = forceSave;
        }
    }

    /** Applies refdes to components using the comment annotation syntax */
    visitAnnotation_comment_expr = (ctx: Annotation_comment_exprContext): void => {
        // Only parse a single ID for now
        const refdesID = ctx.getText().replace('#=', '').trim();
        this.setCurrentComponentRefdes(refdesID);
    }
    
    visitPart_set_expr = (ctx: Part_set_exprContext): void => {
        // The initial set expression captures the param keys to be updated
        // and follows with the matching condition blocks.
        const paramKeys = ctx.data_expr().map(ctx => {
            return this.visitResult(ctx) as string;
        });

        const partConditionTree = this.visitResult(ctx.part_match_block());

        // Flatten this tree
        const flattenedTree = flattenConditionNodes(partConditionTree);
        const partConditions = extractPartConditions(flattenedTree);

        // Get all components
        const instances = this.getScope().getInstances();
        applyPartConditions(instances, paramKeys, partConditions);
    }

    visitPart_match_block = (ctx: Part_match_blockContext): void => {
        const results = ctx.part_sub_expr().reduce((accum, ctxExpr) => {
            const result = this.visitResult(ctxExpr);
            if (result !== undefined){
                accum.push(result);
            }
            return accum;
        }, []);

        this.setResult(ctx, results);
    }

    visitPart_sub_expr = (ctx: Part_sub_exprContext): void => {
        this.visitChildren(ctx);
        const result = this.getResult(ctx.children[0]);

        if (result !== undefined){
            this.setResult(ctx, result);
        }
    }

    visitPart_set_key = (ctx: Part_set_keyContext): void => {
        // The key for each condition/matcher in the condition tree.
        const ctxID = ctx.ID();
        const ctxIntegerValue = ctx.INTEGER_VALUE();
        const ctxNumericValue = ctx.NUMERIC_VALUE();
        const ctxStringValue = ctx.STRING_VALUE();

        let useType = '';
        let useValue: any;

        if (ctxID) {
            useType = 'ID';
            useValue = ctxID.getText();
        } else if (ctxIntegerValue){
            useType = 'number',
            useValue = Number(ctxIntegerValue.getText());
        } else if (ctxNumericValue) {
            useType = 'NUMERIC_VALUE';
            useValue = numeric(ctxNumericValue.getText());
        } else if (ctxStringValue) {
            useType = 'STRING_VALUE';
            useValue = this.prepareStringValue(ctxStringValue.getText());
        }

        this.setResult(ctx, {
            type: useType,
            value: useValue
        });
    }

    visitPart_value_expr = (ctx: Part_value_exprContext): void => {
        const key = this.visitResult(ctx.part_set_key());

        const ctxPartMatchBlock = ctx.part_match_block();
        if (ctxPartMatchBlock) {
            const children = this.visitResult(ctxPartMatchBlock);
            this.setResult(ctx, { key, children });
        } else {
            const values = ctx.data_expr().map(ctxData => {
                return this.visitResult(ctxData);
            });
            this.setResult(ctx, { key, endValue: values });
        }
    }

    visitPart_condition_expr = (ctx: Part_condition_exprContext): void => {
        const allKeys = ctx._key_id.map(ctx => {
            return this.visitResult(ctx);
        });

        const allValues = ctx._values.map(ctx => {
            return this.visitResult(ctx);
        })

        // If there is a match block children, then it should be set to
        // the children of the deepest node
        let deepestChildren: ConditionNode[] = [];
        const ctxPartMatchBlock = ctx.part_match_block();
        if (ctxPartMatchBlock) {
            deepestChildren = this.visitResult(ctxPartMatchBlock);
        }

        // If the expression ends with value(s), instead of the part match block
        let lastValue = undefined;
        if (ctx._last_data.length > 0){
            lastValue = ctx._last_data.map(ctxData => {
                return this.visitResult(ctxData); 
            });
        }

        // If the expression ends with a key, instead of complete key-value pairs.
        if (ctx._id_only){
            // If this is set, this should be the inner most value.
            allKeys.push(this.visitResult(ctx._id_only));

            // Add place holder value.
            allValues.push(undefined);
        }

        // Reverse they key-value pairs so that the first one in code becomes
        // the outer-most item.
        const reversedKeys = [...allKeys].reverse();
        const reversedValues = [...allValues].reverse();

        // Parse from the inner most item first (at index 0).
        let tmpKeyValues: ConditionNode;
        reversedKeys.forEach((key, index) => {
            const node: ConditionNode = {
                key,
                values: (reversedValues[index] !== undefined) ? [reversedValues[index]]: undefined,
                children: (index === 0) ? deepestChildren : [tmpKeyValues],
            };

            if (index === 0 && lastValue !== undefined){
                node.endValue = lastValue;
            }

            tmpKeyValues = node;
        });

        this.setResult(ctx, tmpKeyValues);
    }

    getPathRefdesFile(filePath: string): string {
        // Get the main schematic file path (first file in the stack)
        const mainDir = this.environment.dirname(filePath);
        const mainExt = this.environment.extname(filePath);
        const mainBasename = this.environment.basename(filePath, mainExt);

        // Look for <mainSchematicFile>.refdes.json
        return this.environment.join(mainDir, `${mainBasename}${RefdesFileSuffix}`);
    }

    checkLibraryInRefdesFile(filePath: string): void {
        // Checks if the main schematic file has an refdes json file with
        // annotations for the given library import.

        // If the filePathStack is empty, then it is a script being parsed in 
        // directly, not a file.
        if (this.filePathStack.length === 0){
            return;
        }

        // Look for <mainSchematicFile>.refdes.json
        const [baseFile] = this.filePathStack;
        const mainDir = this.environment.dirname(baseFile);
        const refdesFilePath = this.getPathRefdesFile(baseFile);

        const exists = this.loadedFiles.has(refdesFilePath);
        if (exists) {
            this.log(`Main schematic has refdes file: ${refdesFilePath}`);

            // Load the file and extract the annotations
            const fileData = this.loadedFiles.get(refdesFilePath)!;
            const jsonData = JSON.parse(fileData);

            // Get relative path from main file to the library file being checked
            const relativeLibraryPath = this.environment.relative(mainDir, filePath);

            const { libraries = [] } = jsonData;
            for (const library of libraries) {
                const { path: libraryPath, items } = library;

                // Match by relative path
                if (libraryPath === relativeLibraryPath) {
                    this.log(`Found refdes annotations for library at: ${libraryPath}`);

                    const useFilePath = this.environment.join(mainDir, libraryPath);

                    for (const refdes in items) {
                        const val = items[refdes];
                        const parts = val.split(':');

                        const key = this.getRefdesFileAnnotationKey(useFilePath,
                            Number(parts[0]),
                            Number(parts[1]),
                            Number(parts[2]),
                            Number(parts[3]));

                        this.refdesFileAnnotations.set(key, refdes);
                    }

                    // Once library is matched, no need to process any others
                    break;
                }
            }
        }
    }

    private resolveDataExpr<T>(data_expr: Data_exprContext | null): T {
        const value: T | UndeclaredReference = this.visitResult(data_expr!);

        if (value instanceof UndeclaredReference) {
            this.throwWithContext(data_expr, value.throwMessage());
        } else if (value instanceof DeclaredReference) {
            return this.resolveDataValue(value);
        }

        return value;
    }

    private resolveDataValue(reference: DeclaredReference): any {
        const { value } = reference;
        if (value instanceof NumericValue) {
            return value.toDisplayString();
        } else {
            return value;
        }
    }

    pinTypes = [
        PinTypes.Any,
        PinTypes.IO,
        PinTypes.Input,
        PinTypes.Output,
        PinTypes.Power,
    ];

    /** Parses the pin defintion from the `pins` property */
    private extractPinDefintion(
        pinData: NumericValue | Map<string, any>,
        lastNumericPinId = 0,
    ): PinDefinition[] {
        const pins: PinDefinition[] = [];

        if (pinData instanceof NumericValue) {
            // Convert to a map
            const tmpMap = new Map<number, NumericValue>();
            const lastPin = pinData.toNumber();
            for (let i = 0; i < lastPin; i++) {
                const pinId = lastNumericPinId + i + 1;
                tmpMap.set(pinId, numeric(pinId));
            }

            pinData = tmpMap;
        }

        pinData = pinData ?? [];

        for (const [pinId, pinDef] of pinData) {
            let pinIdType = PinIdType.Int;
            let pinType = PinTypes.Any;
            let pinName: string | null = null;
            let altPinNames: string[] = [];

            if (typeof pinId === 'string') {
                pinIdType = PinIdType.Str;
            }

            if (Array.isArray(pinDef)) {
                const firstValue = pinDef[0];

                // Check if firstValue matches a pin type
                if (firstValue.type
                    && firstValue.type === ReferenceTypes.pinType
                    && this.pinTypes.indexOf(firstValue.value) !== -1) {
                    // First value matches a pin type
                    pinType = firstValue.value;
                    pinName = pinDef[1];

                    if (pinDef.length > 2) {
                        altPinNames = pinDef.slice(2);
                    }
                } else {
                    pinName = pinDef[0];
                    if (pinDef.length > 1) {
                        altPinNames = pinDef.slice(1);
                    }
                }
            } else {
                pinName = pinDef;
            }

            this.log('pins', pinId, pinIdType, pinName, pinType, altPinNames);

            pins.push(
                new PinDefinition(
                    pinId,
                    pinIdType,
                    pinName,
                    pinType,
                    altPinNames,
                ),
            );
        }

        return pins;
    }

    /**
     * Returns module ports defined in the `create module` command
     */
    private parseCreateModulePorts(portsDefinition: Map<string, any>)
        : {
            left: (string | [blank: number])[],
            right: (string | [blank: number])[],
            top: (string | [blank: number])[],
            bottom: (string | [blank: number])[]
        } {

        return {
            left: this.getPortItems(portsDefinition, SymbolPinSide.Left),
            right: this.getPortItems(portsDefinition, SymbolPinSide.Right),
            top: this.getPortItems(portsDefinition, SymbolPinSide.Top),
            bottom: this.getPortItems(portsDefinition, SymbolPinSide.Bottom),
        }
    }

    private getArrangePropFromModulePorts(
        modulePorts: { [key: string]: (string | [blank: number])[] },
        nameToPinId: Map<string, number>
    ): Map<string, any> {
        const keys = [SymbolPinSide.Left, SymbolPinSide.Right, SymbolPinSide.Top, SymbolPinSide.Bottom];

        const arrangeProp = new Map<string, any>();

        keys.forEach(key => {
            // Prepare for the arrange prop
            if (modulePorts[key]) {
                const items = modulePorts[key].map(item => {
                    if (Array.isArray(item)) {
                        return item;
                    } else {
                        return new PinId(nameToPinId.get(item) as number);
                    }
                });

                if (items.length > 0){
                    arrangeProp.set(key, items);
                }
            }
        });
        
        return arrangeProp;
    }

    private getPortItems(portsDefinition: Map<string, any>, key: string)
        : (string | [blank: number])[] {

        let tmpItems: (string | [blank: number])[] = [];
        if (portsDefinition.has(key)) {
            tmpItems = portsDefinition.get(key);

            if (!Array.isArray(tmpItems)) {
                tmpItems = [tmpItems];
            }
        }

        return tmpItems;
    }

    private parseCreateComponentParams(
        params: Map<string, any>,
    ): ParamDefinition[] {
        const result = [];
        if (params) {
            for (const [key, value] of params) {
                result.push(new ParamDefinition(key, value));
            }
        }

        return result;
    }


    printNets(): void {
        this.getScope().printNets();
    }

    dumpNets(): ComponentPinNet[]  {
        return this.getScope().dumpNets();
    }

    dumpUniqueNets(): Net[] {
        const nets = this.getScope().getNets();
        return nets.reduce((accum, [, , net]) => {
            accum.push(net);
            return accum;
        }, [] as Net[])
    }

    dumpVariables(): Map<string, any> {
        return this.getScope().variables;
    }

    dumpInstances(): Map<string, ClassComponent> {
        return this.getScope().instances;
    }

    dump2() {
        const instances = this.getScope().instances;
        const items = [];

        for (const [instanceName, instance] of instances) {
            if (instance.assignedRefDes === null) {
                continue;
            }

            const pinNets = this.resolveNets(
                this.getScope(),
                instance,
            );

            const componentItem = {
                name: instanceName,
                refdes: instance.assignedRefDes,
                pins: {},
            };

            pinNets.forEach((item) => {
                componentItem.pins[item.pin.id] = item.netName;
            });

            items.push(componentItem);
        }

        return items;
    }

    getNetList(): NetListItem[] {
        const netlist: NetListItem[] = [];

        const instances = this.getScope().instances;
        for (const [instanceName, instance] of instances) {
            const pinNets = this.resolveNets(
                this.getScope(),
                instance,
            );

            const componentItem = {
                instanceName,
                instance,
                pins: {},
            };
            pinNets.forEach((item) => {
                componentItem.pins[item.pin.id] = {
                    netName: item.netName,
                    netBaseName: item.netBaseName
                }
            });

            netlist.push(componentItem)
        }

        return netlist;
    }

    /** 
     * Returns the sequence of commands in the script and the final list of
     * nets generated when executed.
     */
    getGraph(): {sequence: any[], nets: ComponentPinNetPair[]} {
        const executor = this.getExecutor();
        const fullSequence = executor.scope.sequence;

        // If the __root component is not connected to any nets, then remove
        // it as the first action in the sequence. Otherwise it will occupy
        // some space in the final graphical output.
        const tmpNet = executor.scope.getNet(
            executor.scope.componentRoot!, new PinId(1)
        );

        const sequence = (tmpNet === null) 
            ? fullSequence.slice(1) : fullSequence;
        
        const nets = executor.scope.getNets();

        return {
            sequence,
            nets
        };
    }

    /** Performs simple annotation for components and rename nets */
    annotateComponents(): void {
        this.log('===== annotate components =====');

        const annotater = new ComponentAnnotater();
        const instances = this.getScope().instances;
        const toAnnotate: ClassComponent[] = [];

        for (const [, instance] of instances) {
            // Net and graphic components are skipped as they do not need
            // to be annotated
            if (instance.typeProp === ComponentTypes.net
                || instance.typeProp == ComponentTypes.graphic) {
                continue;
            }

            if (instance.assignedRefDes === null) {
                /** If component has a refdes parameter already defined, then
                 * use it for the final value as well. */
                if (instance.hasParam('refdes')) {
                    const refdes = instance.getParam('refdes') as string;

                    if (refdes) {
                        instance.assignedRefDes = refdes;
                        this.setComponentUnitRefdesSuffix(instance);
                        
                        annotater.trackRefDes(refdes);
                        this.log(refdes, '-', instance.instanceName);
                        continue;
                    }
                }

                toAnnotate.push(instance);
            }
        }

        toAnnotate.forEach(instance => {
            const newRefDes = annotater.getAnnotation(instance);

            if (newRefDes !== null) {
                instance.assignedRefDes = newRefDes;
                this.log(newRefDes, '-', instance.instanceName);
                this.setComponentUnitRefdesSuffix(instance);
            } else {
                this.log('Failed to annotate:', instance.instanceName);
            }
        });

        this.log('===== annotate components done =====');

        this.log('===== rename nets =====');
        this.renameNetsWithRefdes();
        this.log('===== rename nets done =====');
    }

    private setComponentUnitRefdesSuffix(instance: ClassComponent): void {
        if (instance.assignedRefDes){
            const {units} = instance;

            if (units.length > 1){
                // By default assign in alphabetical sequence
                units.forEach((unit, index) => {
                    let useRefdes = String.fromCharCode("A".charCodeAt(0) + index);
                    if (unit.suffix !== null){
                        useRefdes = unit.suffix;
                    }
                    
                    unit.refdesSuffix = useRefdes;
                });
            } else {
                // There will be at least one component unit, set the refdes
                // suffix to blank.
                const [firstUnit] = units;
                firstUnit.refdesSuffix = '';
            }
        }
    }

    /**
     * Renames nets that have a priority of 0 (not directly defined by user) 
     * based on the first component and component pin that it is connected to.
     */
    private renameNetsWithRefdes(): void {
        const nets = this.getScope().getNets();
        const seenNets:Net[] = [];

        // Get all net names first
        const uniqueNets = new Set<Net>(nets.map(([,,net]) => net));
        const fullNetNames = Array.from(uniqueNets).map(item => item.toString());

        nets.forEach(([component, pin, net]) => {
            if (net.priority === 0 && seenNets.indexOf(net) === -1 
                && component.typeProp !== ComponentTypes.module
                && component.typeProp !== ComponentTypes.net) {
                
                // Update both names, since both are originally system
                // created net names.
                net.name = net.baseName = 
                    `NET-(${component.assignedRefDes}-${pin.toString()})`;
                
                // If net already exists, this is an unhandled case, since it
                if (fullNetNames.indexOf(net.toString()) !== -1) {
                    throw new RuntimeExecutionError('Net renaming failed due to clash: ' + net);
                }

                seenNets.push(net);
            }
        });

    }

    /** Sets the frame component used for the document sheet type as the sheet
     *  type for each frame. */
    applySheetFrameComponent(): {
        frameComponent: ClassComponent | null
    } {
        const baseScope = this.getScope();
        const document = baseScope.variables.get(GlobalDocumentName);

        let frameComponent: ClassComponent | null = null;

        if (document && document[FrameParamKeys.SheetType]) {
            frameComponent = document[FrameParamKeys.SheetType] as ClassComponent;

            // Get all sheet type frames
            const sheets = baseScope.frames.filter(item => {
                return item.frameType === FrameType.Sheet;
            });

            const totalSheets = sheets.length;

            // Assign frame component, sheet number and sheet total. This will
            // override existing params!
            sheets.forEach((item, index) => {
                item.parameters.set(FrameParamKeys.SheetType, frameComponent)
                    .set(FrameParamKeys.SheetNumber, index + 1)
                    .set(FrameParamKeys.SheetTotal, totalSheets);
            });
        }

        return {
            frameComponent
        };
    }

    /** Returns the list of nets that a component's pins are assigned to */
    private resolveNets(
        scope: ExecutionScope,
        instance: ClassComponent,
    ): { pin: PinDefinition; netName: string, netBaseName: string }[] {

        const result = [];

        for (const [pinId, pin] of instance.pins) {
            let netName = NoNetText;
            let netBaseName = NoNetText;

            if (scope.hasNet(instance, pinId)) {
                const netObject = scope.getNet(instance, pinId)!;
                netName = netObject.namespace + netObject.name;
                netBaseName = netObject.baseName;
            }

            result.push({
                pin: pin,
                netName: netName,
                netBaseName,
            });
        }

        return result;
    }

    private getPropertyExprList(items: Property_exprContext[]): Map<string, unknown> {
        const properties = new Map<string, unknown>();

        // For duplicated keys, track a counter value with the key.
        const keyCounter = new Map<string, number>();

        items.forEach((item) => {
            const result: Map<string, unknown> = this.visitResult(item); // Map should be returned
            
            for (const [key, value] of result) {
                let useKey = key;

                const counterValue = keyCounter.get(key) ?? 0;
                keyCounter.set(key, counterValue + 1);

                if (counterValue > 0){
                    useKey = key + ':' + counterValue;
                }

                properties.set(useKey, value);
            }
        });

        return properties;
    }

    getWarnings(): ExecutionWarning[] {
        return this.warnings;
    }
}


/**
 * Standard prefixes for components
 */
export const ComponentRefDesPrefixes: { [key: string]: string } = {
    res: 'R',
    cap: 'C',
    ind: 'L',
    diode: 'D',
    conn: 'J',
    transistor: 'Q',
    relay: 'K',
    ic: 'U',

    '?': '?',
}

export type NetListItem = {
    instanceName: string,
    instance: ClassComponent,
    pins: { [key: string | number]: string },
}

export class VisitorExecutionException {
    
    errorMessage: string;
    context: ParserRuleContext;
    
    constructor(context: ParserRuleContext, errorMessage: string){
        this.errorMessage = errorMessage;
        this.context = context;
    }

    print(scriptData: string): void {
        const startPoint = this.context.start.start;
        const endPoint = this.context.stop.stop + 1;

        console.log('Error at line ' + 
            this.context.start.line + "," + this.context.start.column + ": " 
            + scriptData.slice(startPoint, endPoint) + " - " + this.errorMessage);

    }
}