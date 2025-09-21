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
    At_block_pin_expression_complexContext,
    At_block_pin_expression_simpleContext,
    At_component_exprContext,
    BinaryOperatorExprContext,
    Component_select_exprContext,
    Create_component_exprContext,
    Create_graphic_exprContext,
    DataExprContext,
    Data_expr_with_assignmentContext,
    Double_dot_property_set_exprContext,
    Frame_exprContext,
    Function_def_exprContext,
    Keyword_assignment_exprContext,
    MultiplyExprContext,
    Nested_propertiesContext,
    Net_namespace_exprContext,
    Pin_select_expr2Context,
    Pin_select_exprContext,
    Point_exprContext,
    Property_exprContext,
    Property_key_exprContext,
    Property_set_exprContext,
    Single_line_propertyContext,
    To_component_exprContext,
    Wire_exprContext,
    UnaryOperatorExprContext,
    Wire_expr_direction_onlyContext,
    Wire_expr_direction_valueContext,
    If_exprContext,
    If_inner_exprContext,
    LogicalOperatorExprContext,
    Nested_properties_innerContext,
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
} from './antlr/CircuitScriptParser.js';

import { ExecutionContext } from './execute.js';
import { ClassComponent, ModuleComponent } from './objects/ClassComponent.js';
import {
    NumberOperator,
    NumberOperatorType,
    numeric,
    NumericValue,
    ParamDefinition
} from './objects/ParamDefinition.js';
import { PinDefinition, PinId, PinIdType } from './objects/PinDefinition.js';
import { PinTypes } from './objects/PinTypes.js';
import { ExecutionScope, PropertyTreeKey } from './objects/ExecutionScope.js';
import { CFunctionOptions, CallableParameter, ComplexType, ComponentPin, 
    ComponentPinNet, ComponentPinNetPair, DeclaredReference, 
    FunctionDefinedParameter, UndeclaredReference } from './objects/types.js';
import { BlockTypes, ComponentTypes, Delimiter1, FrameType, GlobalDocumentName, 
    ModuleContainsKeyword, NoNetText, ParamKeys, ReferenceTypes, SymbolPinSide, 
    ValidPinSides, 
    WireAutoDirection } from './globals.js';
import { ExecutionWarning, unwrapValue } from "./utils.js";
import { Net } from './objects/Net.js';
import { GraphicExprCommand, PlaceHolderCommands, SymbolDrawingCommands } from './draw_symbols.js';
import { BaseVisitor } from './BaseVisitor.js';
import { ParserRuleContext } from 'antlr4ng';
import { BaseError, getPortType, RuntimeExecutionError } from './utils.js';
import { UnitDimension } from './helpers.js';
import { FrameParamKeys } from './objects/Frame.js';

export class ParserVisitor extends BaseVisitor {

    visitKeyword_assignment_expr = (ctx: Keyword_assignment_exprContext): void => {
        const id = ctx.ID().getText();
        const value = this.visitResult(ctx.data_expr());
        
        this.setResult(ctx, [id, value]);
    }

    visitPin_select_expr = (ctx: Pin_select_exprContext): void => {
        let value: PinId | null = null;

        const ctxData = ctx.data_expr();
        const result = this.visitResult(ctxData);

        if (result instanceof NumericValue){
            value = result.toNumber();
        } else if (typeof result === 'string'){
            value = result;
        } else {
            throw new RuntimeExecutionError("Invalid value for pin", ctx);
        }

        this.setResult(ctx, value);
    }

    visitAdd_component_expr = (ctx: Add_component_exprContext): void => {
        // Besides component, can also add graphic objects

        // The component is always the last item
        const [component, pinValue] = 
            this.visitResult(ctx.data_expr_with_assignment());

        this.getExecutor().addComponentExisting(component, pinValue);
    }

    visitAt_component_expr = (ctx: At_component_exprContext): ComponentPin => {
        const [component, pin] = this.visitResult(ctx.component_select_expr());
        this.getExecutor().atComponent(component, pin, {
            addSequence: true
        });

        return this.getExecutor().getCurrentPoint();
    }

    visitTo_component_expr = (ctx: To_component_exprContext): ComponentPin => {
        ctx.component_select_expr().forEach(item => {
            const [component, pin] = this.visitResult(item);
            
            try {
                this.getExecutor().toComponent(component, pin, {
                    addSequence: true
                });
            } catch (err){
                throw new RuntimeExecutionError(err.message, ctx);
            }
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
        const indentLevel = scope.indentLevel;

        if (scope.blockStack.has(indentLevel)){
            const blockStackEntry = scope.blockStack.get(indentLevel)!;
            if (blockStackEntry.type !== blockType){
                // If the block type is not the same, then close the path blocks
                executor.exitBlocks();
            }
        }

        if (!scope.blockStack.has(indentLevel)){
            // If not exists, it means the block stack is currently not active,
            // so create it
            executor.enterBlocks(blockType);
        }

        const blockStackEntry = scope.blockStack.get(indentLevel)!;
        const { current_index } = blockStackEntry;

        executor.enterBlock(current_index);
        this.visit(ctx.expressions_block());
        executor.exitBlock(current_index);

        blockStackEntry.current_index++;
    }

    visitGraph_expressions = (ctx: Graph_expressionsContext): void => {
        if (ctx.path_block() === null){
            // If this is not a path block statement, then check if a block
            // is currently open
            const scope = this.getScope();
            const indentLevel = scope.indentLevel;

            if(scope.blockStack.has(indentLevel)){
                this.getExecutor().exitBlocks();
            }
        }

        const ctxPathBlock = ctx.path_block();
        const ctxNotPathBlock = ctx.graph_linear_expression();

        if (ctxPathBlock){
            this.visit(ctxPathBlock);
        }

        if (ctxNotPathBlock){
            this.visit(ctxNotPathBlock);
        }
    }

    visitCreate_component_expr = (ctx: Create_component_exprContext): void => {
        const scope = this.getScope();

        const definedPinIds:number[] = []; // Store pin IDs defined
        const arrangedPinIds:number[] = []; //Store pin IDs defined in arrange props

        const checkPinExistsAndNotDuplicated = (pinId: number, ctx:ParserRuleContext): void => {
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

        // Either `arrange` or `display` can be specified, but not both.
        let didDefineArrangeProp = false;
        let didDefineDisplayProp = false;

        // Perform validation of the properties first to catch parsing errors.
        scope.setOnPropertyHandler((path:PropertyTreeKey[], value: any, ctx: ParserRuleContext) => {
            // const pathText = path.map(item => item[1]);

            if (path.length === 1){
                const [, keyName] = path[0];

                switch(keyName){
                    case 'type':
                        this.validateString(value, ctx);
                        break;
                    case 'angle':
                    case 'width':
                    case 'height':
                        this.validateNumeric(value, ctx);
                        break;

                    case 'display':
                        if (didDefineArrangeProp){
                            throw new RuntimeExecutionError("arrange property has already been defined", ctx);
                        }
                        didDefineDisplayProp = true;
                        break;
                    case 'arrange':
                        if (didDefineDisplayProp){
                            throw new RuntimeExecutionError("display property already defined", ctx);
                        }
                        didDefineArrangeProp = true;
                        break;

                    case 'pins':
                        if (!(value instanceof Map)){
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
                        if (value instanceof NumericValue){
                            this.validateNumeric(value, ctx);
                        } else if (typeof value === 'boolean'){
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
                        if (path.length === 2 && value instanceof NumericValue){
                            // Where only a single pin is defined in the arrange.<side> key,
                            // then the only value will be a numeric value
                            checkPinExistsAndNotDuplicated(value.toNumber(), ctx);

                        } else if (path.length > 2 && path[2][0] === 'index'){
                            // Checking each element
                            if (Array.isArray(value)) {
                                const goodBlank = value.length === 1 &&
                                    value[0] instanceof NumericValue;
                                if (!goodBlank) {
                                    throw new RuntimeExecutionError(`Invalid blank specifier`, ctx);
                                }
                            } else {
                                // Only allow numbers for now, next time will support ID names/strings
                                if (!(value instanceof NumericValue)){
                                    throw new RuntimeExecutionError(`Invalid numeric value for arrange.${sideKeyName}`, ctx);
                                } else {
                                    checkPinExistsAndNotDuplicated(value.toNumber(), ctx);
                                }
                            }
                        }
                    }
                } else if (keyName === 'params'){
                    const [, subKeyName] = path[1] as [ParserRuleContext, string];
                    switch(subKeyName) {
                        case 'mpn':
                        case 'refdes':
                        case 'footprint':
                            this.validateString(value, ctx);
                            break;
                        case 'place':
                            this.validateBoolean(value, ctx);
                            break;
                        
                    }
                } else if (keyName === 'pins'){
                    if (path.length === 2){

                        const idName = path[1][1];  // The property key token
                        definedPinIds.push(idName);

                        if(value.length === 2){
                            // Pin type is defined as the first item 
                            const [pinType, ] = value;
                            if (pinType instanceof UndeclaredReference){
                                throw new RuntimeExecutionError(`Invalid pin type: ${pinType.reference.name}`, ctx);
                            }
                        }
                    }
                }
            }
        });

        scope.enterContext(ctx);

        ctx.property_expr().forEach(item => {
            this.visitResult(item);
        });

        scope.exitContext();
        scope.popOnPropertyHandler();

        // Now parse here again
        const properties = this.getPropertyExprList(ctx.property_expr());
        const pins: PinDefinition[] = this.parseCreateComponentPins(
            properties.get('pins'),
        );

        // Use a unique instance name in the context for now
        let instanceName = this.getExecutor().getUniqueInstanceName();

        const propParams = properties.get('params');
        const params: ParamDefinition[] =
            this.parseCreateComponentParams(propParams);

        if (params.length > 0) {
            // Always append the first value
            // to the generated name.
            const firstParam = params[0];
            const paramValue = firstParam.paramValue;
            let appendValue = paramValue.toString();

            if (paramValue instanceof NumericValue) {
                appendValue = paramValue.value;
            }

            instanceName += `${Delimiter1}${appendValue}`;
        }

        const arrange = properties.has('arrange') ?
            properties.get('arrange') : null;

        const display = properties.has('display') ?
            properties.get('display') : null;

        const type = properties.has('type') ?
            properties.get('type') : null;

        const copy = properties.has('copy') ?
            properties.get('copy') : false;

        const width = properties.has('width') ?
            properties.get('width') : null;

        const height = properties.has('height') ?
            properties.get('height') : null;

        // This angle refers to the orientation that the graphic of the 
        // component is draw with.
        const angle = properties.has(ParamKeys.angle) ?
            properties.get(ParamKeys.angle) : null;

        const followWireOrientation = properties.has('followWireOrientation') ?
            properties.get('followWireOrientation') : true;

        const props = {
            arrange, display, type, width, height, copy,
            angle, followWireOrientation
        }

        try {
            const createdComponent = this.getExecutor().createComponent(instanceName,
                pins, params, props);
            this.setResult(ctx, createdComponent);
        } catch (error) {
            this.throwWithContext(ctx, (error as BaseError).message)
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

        const ctxNestedProperties = ctx.nested_properties_inner();
        if (ctxNestedProperties) {
            const nestedKeyValues = this.visitResult(ctxNestedProperties);

            nestedKeyValues.forEach((value: any, key: any) => {
                parameters.push(['keyword', key, value]);
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

        const width = properties.has('width') ?
            properties.get('width') : null;

        const height = properties.has('height') ?
            properties.get('height') : null;

        const blankParams: ParamDefinition[] = [];
        const props = {
            arrange, width, height,

            /** Should behave like a normal component (resistor, cap, etc.), 
             * do not duplicate the module if referenced. */
            copy: false,

            followWireOrientation: true,
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
            value.reference.parentValue === undefined
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

    visitNested_properties_inner = (ctx: Nested_properties_innerContext): void => {
        const result = new Map<string, any>();
        ctx.property_expr().forEach((item) => {
            const property: Map<string, any> = this.visitResult(item);

            // Get out all items, by default
            for (const [key, value] of property) {
                result.set(key, value);
            }
        });

        this.setResult(ctx, result);
    }

    visitNested_properties = (ctx: Nested_propertiesContext): void => {
        this.setResult(ctx, this.visitResult(ctx.nested_properties_inner()));
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

        let component: ComplexType = null;
        let componentCtx: ParserRuleContext | null = null;

        const ctxDataExpr = ctx.data_expr();
        const ctxAssignmentExpr = ctx.assignment_expr();

        if (ctxDataExpr) {
            component = this.visitResult(ctxDataExpr);
            component = unwrapValue(component);
            componentCtx = ctxDataExpr;

            if (component === null || component === undefined) {
                this.throwWithContext(ctxDataExpr, 
                    "Could not find component: " + ctxDataExpr.getText());
            }

        } else if (ctxAssignmentExpr) {
            component = this.visitResult(ctxAssignmentExpr);
            componentCtx = ctxAssignmentExpr;
        }

        if (component instanceof ClassComponent
            && component.copyProp) {
            component = this.getExecutor().copyComponent(component);
        }

        if (component instanceof UndeclaredReference){
            const {reference : {trailers = [], parentValue = null}} = component;
            if (parentValue instanceof ClassComponent
                && trailers.length > 0
                && trailers[0] === ModuleContainsKeyword
            ) {
                component = parentValue;
                this.placeModuleContains(component as ModuleComponent);
            }
        }

        if (component && component instanceof ClassComponent) {
            // get the modifiers for the component
            const modifiers = ctx.component_modifier_expr();
            modifiers.forEach(modifier => {
                const modifierText = modifier.ID(0)!.getText();
                const ctxValueExpr = modifier.value_expr();
                const ctxID2 = modifier.ID(1);

                let result: ComplexType = null;
                if (ctxValueExpr) {
                    result = this.visitResult(ctxValueExpr);
                } else if (ctxID2) {
                    result = ctxID2.getText();
                }

                let shouldIgnoreWireOrientation = false;

                if (modifierText === ParamKeys.flip) {
                    const flipValue = result as string;
                    if (flipValue.indexOf('x') !== -1) {
                        component.setParam(ParamKeys.flipX, 1);
                        shouldIgnoreWireOrientation = true;
                    }

                    if (flipValue.indexOf('y') !== -1) {
                        component.setParam(ParamKeys.flipY, 1);
                        shouldIgnoreWireOrientation = true;
                    }
                } else if (modifierText === ParamKeys.angle) {
                    component.setParam(ParamKeys.angle, result as NumericValue);
                    shouldIgnoreWireOrientation = true;
                } else if (modifierText === 'anchor'){
                    component.setParam('anchor', result as string);
                }

                if (shouldIgnoreWireOrientation) {
                    // User defined modifiers will overwrite the
                    // wire orientation
                    component.useWireOrientationAngle = false;
                }
            });
        }

        let pinValue: number | string | null = null;
        const ctxPinSelectExpr = ctx.pin_select_expr();

        if (ctxPinSelectExpr) {
            pinValue = this.visitResult(ctxPinSelectExpr);
        } else {
            if (component instanceof ClassComponent) {
                pinValue = (component as ClassComponent).getDefaultPin();
            } else {
                const undeclaredRef = (component as UndeclaredReference);
                this.throwWithContext(
                    componentCtx,
                    'Invalid component: ' + undeclaredRef.reference.name
                )
            }
        }

        this.setResult(ctx, [component, pinValue]);
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

        const newExecutor = this.enterNewChildContext(
            executionStack,
            executor,
            executionContextName,
            { netNamespace: tmpNamespace }, [], []
        );

        component.moduleCounter += 1;
        newExecutor.resolveNet = this.createNetResolver(executionStack);
        newExecutor.resolveComponentPinNet = this.createComponentPinNetResolver(executionStack);

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

        const unaryOp = ctx.unary_operator();
        if (unaryOp) {
            if (unaryOp.Not()) {
                if (typeof value === "boolean") {
                    value = !value;
                } else if (value instanceof NumericValue){
                    value = (value.toNumber() === 0) ? true: false;
                } else {
                    throw "Failed to do Not operator";
                }
            } else if (unaryOp.Minus()) {
                if (value instanceof NumericValue){
                    value = value.neg();
                } else {
                    throw "Failed to do Negation operator";
                }
            }
        }

        this.setResult(ctx, value);
    }

    visitDataExpr = (ctx: DataExprContext): void => {
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

        const binaryOperatorType = ctx.binary_operator();
        let result: boolean | null = null;

        if (binaryOperatorType.Equals()) {
            result = value1 == value2; // Boolean result
        } else if (binaryOperatorType.NotEquals()) {
            result = value1 != value2;
        } else if (binaryOperatorType.GreaterThan()) {
            result = value1 > value2;
        } else if (binaryOperatorType.GreatOrEqualThan()) {
            result = value1 >= value2;
        } else if (binaryOperatorType.LessThan()) {
            result = value1 < value2;
        } else if (binaryOperatorType.LessOrEqualThan()) {
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
        const value1 = this.resolveDataExpr<number>(ctx.data_expr(0));
        const value2 = this.resolveDataExpr<number>(ctx.data_expr(1));

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

        // These are the defined arguments for the function
        let funcDefinedParameters: FunctionDefinedParameter[] = [];
        const ctxFunctionArgsExpr = ctx.function_args_expr();
        if (ctxFunctionArgsExpr) {
            funcDefinedParameters = this.visitResult(ctxFunctionArgsExpr);
        }

        const executionStack = this.executionStack;
        const functionCounter = { counter: 0 };

        const resolveNet = this.createNetResolver(this.executionStack);
        const resolveComponentPinNet = this.createComponentPinNetResolver(this.executionStack);

        const __runFunc = (passedInParameters:CallableParameter[], 
            options: CFunctionOptions): [
            executionContext: ExecutionContext, 
            result: ComplexType | null] => {

            const executionContextName = `${functionName}-${functionCounter['counter']}`;

            const newExecutor = this.enterNewChildContext(
                executionStack,
                this.getExecutor(),
                executionContextName,
                options,
                funcDefinedParameters,
                passedInParameters
            );

            functionCounter['counter'] += 1;
            newExecutor.resolveNet = resolveNet;
            newExecutor.resolveComponentPinNet = resolveComponentPinNet;

            const returnValue = this.runExpressions(newExecutor,
                ctx.function_expr());

            // Function execution is completed, get the last executor
            const lastExecution = executionStack.pop()!;

            // Merge what ever was created in the scope with the outer scope
            const nextLastExecution = executionStack[executionStack.length - 1];
            nextLastExecution.mergeScope(
                lastExecution.scope,
                executionContextName,
            );

            // Return the last execution context and the final return value of the function
            return [lastExecution, returnValue];
        };

        this.getExecutor().createFunction(functionName, __runFunc);
    }

    visitPin_select_expr2 = (ctx: Pin_select_expr2Context): void => {
        const ctxStringValue = ctx.STRING_VALUE();
        const ctxIntegerValue = ctx.INTEGER_VALUE();
        let result: string| number | null = null;

        if (ctxStringValue) {
            result = this.prepareStringValue(ctxStringValue.getText());
        } else if (ctxIntegerValue) {
            result = Number(ctxIntegerValue.getText());
        }

        this.setResult(ctx, result);
    }

    visitAt_block_pin_expr = (ctx: At_block_pin_exprContext): void => {
        const atPin: number | string = this.visitResult(ctx.pin_select_expr2());

        const executor = this.getExecutor();

        const [currentComponent, currentPin] = executor.getCurrentPoint();

        executor.atComponent(currentComponent, atPin, {
            addSequence: true
        });

        executor.log('at block pin expressions');

        const ctxAtBlockSimple = ctx.at_block_pin_expression_simple();
        const ctxAtBlockComplex = ctx.at_block_pin_expression_complex();

        if (ctxAtBlockSimple) {
            this.visit(ctxAtBlockSimple);
        } else if (ctxAtBlockComplex) {
            this.visit(ctxAtBlockComplex);
        }

        executor.log('end at block pin expressions');

        // Go back to the original position
        executor.atComponent(currentComponent, currentPin);
    }

    visitAt_block = (ctx: At_blockContext): void => {
        const executor = this.getExecutor();
        executor.log('entering at block');

        this.visit(ctx.at_component_expr());

        const [currentComponent, currentPin] = executor.getCurrentPoint();        
        executor.scope.indentLevel += 1;

        ctx.at_block_expressions().forEach(expression => {
            this.visit(expression);
        });

        executor.scope.indentLevel -= 1;

        // Once all done, then restore
        executor.scope.setCurrent(currentComponent, currentPin);

        executor.log('leaving at block');

        // executor.getCurrentPoint();
    }

    visitAt_block_pin_expression_simple = (ctx: At_block_pin_expression_simpleContext): void => {
        const ctxExpression = ctx.expression();
        if (ctxExpression) {
            // Handle any expressions within
            this.visit(ctxExpression);
        } else if (ctx.NOT_CONNECTED()) {
            // Do nothing
            return;
        }
    }

    visitAt_block_pin_expression_complex = (ctx: At_block_pin_expression_complexContext): void => {
        this.visit(ctx.expressions_block());
    }
    
    visitWire_expr_direction_only = (ctx: Wire_expr_direction_onlyContext): void => {
        const value = ctx.ID().getText();
        if (value === WireAutoDirection.Auto|| value === WireAutoDirection.Auto_){
            this.setResult(ctx, [value]);
        } else {
            throw 'Invalid direction for wire';
        }
    }

    visitWire_expr_direction_value = (ctx: Wire_expr_direction_valueContext): void => {
        const direction = ctx.ID().getText();

        if (this.acceptedDirections.indexOf(direction) !== -1) {
            let useValue: number | null = null;

            const ctxIntegerValue = ctx.INTEGER_VALUE();
            const ctxDataExpr = ctx.data_expr();

            if (ctxIntegerValue) {
                useValue = Number(ctxIntegerValue);
            } else if (ctxDataExpr) {
                useValue = this.visitResult(ctxDataExpr);

                if (useValue instanceof NumericValue){
                    useValue = useValue.toNumber();
                }
            }

            if (useValue !== null) {
                // Assume dimension is mils
                this.setResult(ctx, [direction, new UnitDimension(useValue)]);
                return;
            }
        }

        throw "Invalid direction or value for wire";
    }

    visitWire_expr = (ctx: Wire_exprContext): void => {
        const wireAtomExpr = ctx.wire_atom_expr();
        const segments = wireAtomExpr.map(wireSegment => {
            return this.visitResult(wireSegment);
        });

        this.getExecutor().addWire(segments);
    }

    visitPoint_expr = (ctx: Point_exprContext): ComponentPin => {
        // Point can be defined either with an ID or a string.
        const ID = ctx.ID();
        const ctxData = ctx.data_expr();

        let pointValue: string;
        if (ctxData){
            const resultValue = this.visitResult(ctxData);
            if (typeof resultValue === 'string'){
                pointValue = resultValue;
            } else {
                throw new RuntimeExecutionError('Invalid value for point');
            }
        } else if (ID){
            pointValue = ID.getText();
        }

        return this.getExecutor().addPoint(pointValue);
    }

    visitProperty_set_expr = (ctx: Property_set_exprContext): void => {
        const result = this.visitResult(ctx.data_expr());

        // To check if this works
        const resolvedProperty = this.visitResult(ctx.atom_expr());

        // TODO: check if this works correctly
        this.getExecutor().setProperty(resolvedProperty, result);
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
        let dataValue: ComplexType = null;

        let netNamespace = null;
        const hasPlus = ctx.Addition();

        const ctxDataExpr = ctx.data_expr();

        if (ctxDataExpr) {
            dataValue = this.visitResult(ctxDataExpr);

            if (dataValue instanceof UndeclaredReference) {
                netNamespace = "/" + dataValue.reference.name;
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
        this.getExecutor().addBreakContext(ctx);

        while (keepLooping) {
            const result = this.visitResult(dataExpr);

            if (result) { // some truthy value
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

        this.getExecutor().addBreakContext(ctx);

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

        this.getExecutor().popBreakContext();
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


    private parseCreateComponentPins(
        pinData: NumericValue | Map<string, any>,
    ): PinDefinition[] {
        const pins: PinDefinition[] = [];

        if (pinData instanceof NumericValue) {
            // Convert to a map
            const tmpMap = new Map<number, NumericValue>();
            const lastPin = pinData.toNumber();
            for (let i = 0; i < lastPin; i++) {
                const pinId = i + 1;
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
                        return numeric(nameToPinId.get(item) as number);
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
            executor.scope.componentRoot!, 1
        );

        const sequence = (tmpNet === null) 
            ? fullSequence.slice(1) : fullSequence;
        
        const nets = executor.scope.getNets();

        return {
            sequence,
            nets
        };
    }

    /** Performs annotation for components */
    annotateComponents(): void {
        this.log('===== annotate components =====');

        const annotater = new ComponentAnnotater();
        const instances = this.getScope().instances;

        const toAnnotate:ClassComponent[] = [];

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
                if (instance.parameters.has('refdes')) {
                    const refdes = instance.parameters.get('refdes') as string;

                    if (refdes) {
                        instance.assignedRefDes = refdes;
                        annotater.trackRefDes(refdes);
                        this.log(refdes, '-', instance.instanceName);
                        continue;
                    }
                }

                toAnnotate.push(instance);
            }
        }

        toAnnotate.forEach(instance => {
            const useTypeProp = instance.typeProp ?? 'conn';
            instance.typeProp === null 
                && this.log('Instance has no type:', instance.instanceName, ' assuming connector');

            const newRefDes = annotater.getAnnotation(useTypeProp);

            if (newRefDes !== null) {
                instance.assignedRefDes = newRefDes;
                this.log(newRefDes, '-', instance.instanceName);
            } else {
                this.log('Failed to annotate:', instance.instanceName);
            }
        });

        this.log('===== annotate done =====');
        this.log('');
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

        items.forEach((item) => {
            const result: Map<string, unknown> = this.visitResult(item); // Map should be returned
            
            for (const [key, value] of result) {
                properties.set(key, value);
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
const ComponentRefDesPrefixes: { [key: string]: string } = {
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

/** Tracks annotations already assigned and determines refdes for components */
class ComponentAnnotater {

    counter:{[key: string]: number } = {};

    existingRefDes: string[] = [];

    constructor() {
        // Refdes counting should all start at 1. e.g. R1, C1, etc.
        for (const key in ComponentRefDesPrefixes) {
            this.counter[key] = 1;
        }
    }

    getAnnotation(type: string): string | null {

        // If type is unknown, then allow it to define a new range
        if (this.counter[type] === undefined && type.length <= 2) {
            for (const [, value] of Object.entries(ComponentRefDesPrefixes)) {
                if (value === type) {
                    throw "Refdes prefix is already in use!";
                }
            }

            if (ComponentRefDesPrefixes[type] === undefined) {
                // Define new type and start counting
                ComponentRefDesPrefixes[type] = type;
                this.counter[type] = 1;
            }
        }

        if (ComponentRefDesPrefixes[type] === undefined) {
            return null;
        }

        let attempts = 100;
        let proposedName = "";

        while (attempts >= 0) {
            proposedName = ComponentRefDesPrefixes[type] + this.counter[type];
            this.counter[type]++;

            if (this.existingRefDes.indexOf(proposedName) === -1) {
                break;
            }
            attempts--;
        }

        if (attempts === 0) {
            throw "Annotation failed!";
        }

        return proposedName;
    }

    trackRefDes(name: string): void {
        this.existingRefDes.push(name);
    }
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