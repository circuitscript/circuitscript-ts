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
    Path_blocksContext,
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
} from './antlr/CircuitScriptParser.js';

import { ExecutionContext } from './execute.js';
import { ClassComponent } from './objects/ClassComponent.js';
import {
    NumericValue,
    ParamDefinition
} from './objects/ParamDefinition.js';
import { PinDefinition, PinIdType } from './objects/PinDefinition.js';
import { PinTypes } from './objects/PinTypes.js';
import { ExecutionScope } from './objects/ExecutionScope.js';
import { CFunctionOptions, CallableParameter, ComplexType, ComponentPin, 
    ComponentPinNet, DeclaredReference, FunctionDefinedParameter, UndeclaredReference } from './objects/types.js';
import { BlockTypes, ComponentTypes, FrameType, GlobalDocumentName, ModuleContainsKeyword, NoNetText, ReferenceTypes, WireAutoDirection } from './globals.js';
import { Net } from './objects/Net.js';
import { GraphicExprCommand, PlaceHolderCommands, SymbolDrawingCommands } from './draw_symbols.js';
import { BaseVisitor } from './BaseVisitor.js';
import { ParserRuleContext } from 'antlr4ng';
import { getPortType } from './utils.js';
import { UnitDimension } from './helpers.js';
import { FrameParamKeys } from './objects/Frame.js';


export class ParserVisitor extends BaseVisitor {

    visitKeyword_assignment_expr = (ctx: Keyword_assignment_exprContext): void => {
        const id = ctx.ID().getText();
        const ctxDataExpr = ctx.data_expr();

        this.visit(ctxDataExpr);
        const value = this.getResult(ctxDataExpr);
        
        this.setResult(ctx, [id, value]);
    }

    visitPin_select_expr = (ctx: Pin_select_exprContext): void => {
        let value: string| number | null = null;

        const ctxIntegerValue = ctx.INTEGER_VALUE();
        const ctxStringValue = ctx.STRING_VALUE();

        if (ctxIntegerValue) {
            value = Number(ctxIntegerValue.getText());

        } else if (ctxStringValue) {
            value = this.prepareStringValue(ctxStringValue.getText());
        }

        this.setResult(ctx, value);
    }

    visitAdd_component_expr = (ctx: Add_component_exprContext): void => {
        // Besides component, can also add graphic objects

        // The component is always the last item
        const ctxDataWithAssignmentExpr = ctx.data_expr_with_assignment();

        this.visit(ctxDataWithAssignmentExpr);
        const [component, pinValue] =
            this.getResult(ctxDataWithAssignmentExpr);

        this.getExecutor().addComponentExisting(component, pinValue);
    }

    visitAt_component_expr = (ctx: At_component_exprContext): ComponentPin => {
        if (ctx.Point()) {
            this.getExecutor().atPointBlock();

        } else {
            const ctxComponentSelectExpr = ctx.component_select_expr()!;
            this.visit(ctxComponentSelectExpr);

            const [component, pin] = this.getResult(ctxComponentSelectExpr);
            this.getExecutor().atComponent(component, pin, {
                addSequence: true
            });
        }

        return this.getExecutor().getCurrentPoint();
    }

    visitTo_component_expr = (ctx: To_component_exprContext): ComponentPin => {
        if (ctx.Point()) {
            this.getExecutor().toPointBlock();

        } else {
            ctx.component_select_expr().forEach(item => {
                this.visit(item);
                const [component, pin] = this.getResult(item);
                this.getExecutor().toComponent(component, pin, {
                    addSequence: true
                });
            });
        }

        return this.getExecutor().getCurrentPoint();
    }

    visitComponent_select_expr = (ctx: Component_select_exprContext): void => {
        const ctxDataExprWithAssigment = ctx.data_expr_with_assignment();
        if (ctxDataExprWithAssigment) {
            this.visit(ctxDataExprWithAssigment);
            this.setResult(ctx, this.getResult(ctxDataExprWithAssigment));
        } else {
            const component = this.getExecutor().scope.currentComponent;
            let pinId: number | string | null = null;

            const ctxPinSelectExpr = ctx.pin_select_expr();
            if (ctxPinSelectExpr) {
                this.visit(ctxPinSelectExpr);
                pinId = this.getResult(ctxPinSelectExpr);
            }
            
            this.setResult(ctx, [component, pinId]);
        }
    }

    visitPath_blocks = (ctx: Path_blocksContext): ComponentPin => {
        const blocks = ctx.path_block_inner();

        let blockIndex = 0; // Tracks the index of the block with the given type
        let blockType = BlockTypes.Branch;
        let prevBlockType = null;

        blocks.forEach((block, index) => {
            if (block.Branch()) {
                blockType = BlockTypes.Branch
            } else if (block.Join()) {
                blockType = BlockTypes.Join;
            } else if (block.Parallel()) {
                blockType = BlockTypes.Parallel;
            } else if (block.Point()) {
                blockType = BlockTypes.Point;
            }

            if (prevBlockType !== blockType) {
                if (index > 0) { 
                    // If not the first block, then exit the 
                    // group of blocks.
                    this.getExecutor().exitBlocks();
                }

                this.getExecutor().enterBlocks(blockType);
                blockIndex = 0; // Reset counter.
            }

            this.getExecutor().enterBlock(blockIndex);
            this.visit(block);
            this.getExecutor().exitBlock(blockIndex);
            blockIndex += 1;

            prevBlockType = blockType;
        });

        this.getExecutor().exitBlocks();
        return this.getExecutor().getCurrentPoint();
    }

    visitCreate_component_expr = (ctx: Create_component_exprContext): void => {
        const properties = this.getPropertyExprList(ctx.property_expr());

        const pins: PinDefinition[] = this.parseCreateComponentPins(
            properties.get('pins'),
        );

        // Use a unique instance name in the context for now
        let instanceName = this.getExecutor().getUniqueInstanceName('');

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

            instanceName += '_' + appendValue;
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

        // This angle refers to the orientation that the graphic of the 
        // component is draw with.
        const angle = properties.has('angle') ?
            properties.get('angle') : null;

        const followWireOrientation = properties.has('followWireOrientation') ?
            properties.get('followWireOrientation') : true;

        const props = {
            arrange, display, type, width, copy,
            angle, followWireOrientation
        }

        const createdComponent = this.getExecutor().createComponent(instanceName,
            pins, params, props);

        this.setResult(ctx, createdComponent);
    }

    visitCreate_graphic_expr = (ctx: Create_graphic_exprContext): void => {
        const ctxId = ctx.ID();
        const paramIds = [];
        if (ctxId !== null) {
            const varName = ctxId.getText();
            // assign this value to the component value
            paramIds.push(varName);

            // create blank object first, so that the reference exists
            this.getExecutor().scope.variables.set(varName, {});
        }

        const graphicsExpressionsCtx = ctx.graphic_expressions_block();
        this.visit(graphicsExpressionsCtx);
        const commands = this.getResult(graphicsExpressionsCtx);

        const drawing = new SymbolDrawingCommands(commands);
        drawing.source = ctx.getText();
        drawing.paramIds = paramIds;

        const executor = this.getExecutor();

        // Save stack structure to reference the variables
        const stack = [...this.executionStack];

        // Setup the scope for variable references
        drawing.prepareVariables = (params: Map<string, any>) => {
            if (params && paramIds.length > 0) {
                // Evaluate into an object
                const obj = {};
                params.forEach((value, key) => {
                    obj[key] = value;
                });

                executor.scope.variables.set(paramIds[0], obj);
            }
        }

        // Used for resolving variable references during the drawing phase.
        drawing.resolveVariables = (name: string, trailers: string[] = []) => {
            return executor.resolveVariable(stack, name, trailers);
        }

        this.setResult(ctx, drawing);
    }

    visitGraphic_expressions_block = (ctx: Graphic_expressions_blockContext): void => {
        const commands = ctx.graphic_expr().reduce((accum, item) => {
            this.visit(item);
            const [commandName, parameters] =
                this.getResult(item) as [string, CallableParameter[]];

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

                accum.push([commandName, positionParams, keywordParams, item]);
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
            this.visit(ctxNestedProperties);
            const nestedKeyValues = this.getResult(ctxNestedProperties);

            nestedKeyValues.forEach((value: any, key: any) => {
                parameters.push(['keyword', key, value]);
            });

        } else {
            const ctxParameters = ctx.parameters()!;
            this.visit(ctxParameters);
            parameters = this.getResult(ctxParameters);
        }

        // For the `label` command, allow both 'in' and 'out' as shortform
        // values to portType
        if (commandName === 'label') {
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
        const ctxDataExpr = ctx.data_expr();

        this.visit(ctxDataExpr);
        const listItems = this.getResult(ctxDataExpr);

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
                    this.getExecutor().scope.variables.set(
                        forVariableNames[index], value);
                });

                const graphicsExpressionsCtx = ctx.graphic_expressions_block()!;
                this.visit(graphicsExpressionsCtx);
                const commands = this.getResult(graphicsExpressionsCtx);

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

        const { left: leftPorts, right: rightPorts }
            = this.parseCreateModulePorts(
                properties.get('ports'),
            );

        const allPorts = [...leftPorts, ...rightPorts].filter(item => {
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

        const arrangeLeftItems = leftPorts.map(item => {
            if (Array.isArray(item)){
                return item;
            } else {
                return nameToPinId.get(item);
            }
        });

        const arrangeRightItems = rightPorts.map(item => {
            if (Array.isArray(item)){
                return item;
            } else {
                return nameToPinId.get(item);
            }
        });

        // Generate the arrange property
        const arrange = new Map<string, any>();
        if (arrangeLeftItems.length > 0){
            arrange.set('left', arrangeLeftItems);
        }

        if (arrangeRightItems.length > 0){
            arrange.set('right', arrangeRightItems);
        }

        const width = properties.has('width') ?
            properties.get('width') : null;

        const blankParams = [];
        const props = {
            arrange, width
        };

        const moduleInstanceName = this.getExecutor().getUniqueInstanceName('');
        const createdComponent = this.getExecutor().createComponent(
            moduleInstanceName, tmpPorts, blankParams, props);

        createdComponent.typeProp = 'module';

        const ctxPropertyBlock = ctx.property_block_expr();
        if (ctxPropertyBlock) {
            // Only parse the first one, ignore the others!
            const [firstBlock] = ctxPropertyBlock;
            this.visit(firstBlock);
            const [keyName, expressionsBlock] = this.getResult(firstBlock);

            if (keyName === ModuleContainsKeyword) {
                createdComponent.moduleContainsExpressions = expressionsBlock;
                
                this.expandModuleContains(createdComponent, 
                    this.getExecutor().netNamespace);
            }
        }

        this.setResult(ctx, createdComponent);
    }

    visitProperty_block_expr = (ctx: Property_block_exprContext): void  => {
        const tmpCtx = ctx.property_key_expr();
        this.visit(tmpCtx);
        const keyName = this.getResult(tmpCtx);

        const expressionsBlock = ctx.expressions_block();

        this.setResult(ctx, [keyName, expressionsBlock]);
    }

    visitProperty_expr = (ctx: Property_exprContext): void => {

        const ctxPropertyKeyExpr = ctx.property_key_expr();
        const ctxPropertyValueExpr = ctx.property_value_expr();

        this.visit(ctxPropertyKeyExpr);
        this.visit(ctxPropertyValueExpr);

        const keyName = this.getResult(ctxPropertyKeyExpr);
        const value = this.getResult(ctxPropertyValueExpr);

        if (value instanceof UndeclaredReference && (
            value.reference.parentValue === undefined 
            && value.reference.value ===undefined
        )) {
            
            throw value.throwMessage();
        }

        const map = new Map<string, any>();
        map.set(keyName, value);

        this.setResult(ctx, map);
    }

    visitSingle_line_property = (ctx: Single_line_propertyContext): void => {
        let value;
        if (ctx.data_expr().length === 1) {
            const ctxFirst = ctx.data_expr(0)!;
            this.visit(ctxFirst);
            value = this.getResult(ctxFirst);
        } else {
            value = ctx.data_expr().map(item => {
                this.visit(item);
                return this.getResult(item);
            });
        }

        this.setResult(ctx, value);
    }

    visitNested_properties_inner = (ctx: Nested_properties_innerContext): void => {
        const result = new Map<string, any>();
        ctx.property_expr().forEach((item) => {
            this.visit(item);
            const property: Map<string, any> = this.getResult(item);

            // Get out all items, by default
            for (const [key, value] of property) {
                result.set(key, value);
            }
        });

        this.setResult(ctx, result);
    }

    visitNested_properties = (ctx: Nested_propertiesContext): void => {
        const ctxNested = ctx.nested_properties_inner();
        this.visit(ctxNested);
        this.setResult(ctx, this.getResult(ctxNested));
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
            this.visit(ctxDataExpr);
            component = this.getResult(ctxDataExpr);
            componentCtx = ctxDataExpr;

            if (component === null || component === undefined) {
                this.throwWithContext(ctxDataExpr, 
                    "Could not find component: " + ctxDataExpr.getText());
            }

        } else if (ctxAssignmentExpr) {
            this.visit(ctxAssignmentExpr);
            component = this.getResult(ctxAssignmentExpr);
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
                this.placeModuleContains(component);
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
                    this.visit(ctxValueExpr);
                    result = this.getResult(ctxValueExpr);
                } else if (ctxID2) {
                    result = ctxID2.getText();
                }

                let shouldIgnoreWireOrientation = false;

                if (modifierText === 'flip') {
                    const flipValue = result as string;
                    if (flipValue.indexOf('x') !== -1) {
                        component.setParam('flipX', 1);
                        shouldIgnoreWireOrientation = true;
                    }

                    if (flipValue.indexOf('y') !== -1) {
                        component.setParam('flipY', 1);
                        shouldIgnoreWireOrientation = true;
                    }
                } else if (modifierText === 'angle') {
                    const angleValue = Number(result);
                    component.setParam('angle', angleValue);
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
            this.visit(ctxPinSelectExpr);
            pinValue = this.getResult(ctxPinSelectExpr);
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

    private expandModuleContains(component: ClassComponent, netNamespace: string): void {
        this.getExecutor().log('expanding module `contains`')

        const executionStack = this.executionStack;
        const resolveNet = this.createNetResolver(executionStack);

        const executionContextName = 
            this.getExecutor().namespace + "_"
            + component.instanceName
            + '_' + component.moduleCounter;

        const tmpNamespace = this.getNetNamespace(
            netNamespace,
            "+/" + component.instanceName + "_" + component.moduleCounter
        );

        const newExecutor = this.enterNewChildContext(
            executionStack,
            this.getExecutor(),
            executionContextName,
            { netNamespace: tmpNamespace }, [], []
        );

        component.moduleCounter += 1;
        newExecutor.resolveNet = resolveNet;

        // Create all the internal circuits of the module
        this.visit(component.moduleContainsExpressions);

        // Done with the new context
        const executionContext = executionStack.pop()!;

        // Defer the merging of execution context
        component.moduleExecutionContext = executionContext;
        component.moduleExecutionContextName = executionContextName;

        this.linkModuleSymbolWithContains(component, executionContext);
    }

    private linkModuleSymbolWithContains(moduleComponent: ClassComponent,
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

        for (const [key, component] of executionContext.scope.instances) {
            if (component._copyID !== null && component.typeProp === 'port') {
                // Link sub-circuit ports to module pin

                // Get the port name, which is the net name
                const portName = component.parameters.get('net_name');
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

    private placeModuleContains(moduleComponent: ClassComponent):void {
        if (moduleComponent.typeProp === 'module'
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
        this.visit(ctx.data_expr());
        let value = this.getResult(ctx.data_expr());

        const unaryOp = ctx.unary_operator();
        if (unaryOp) {
            if (unaryOp.Not()) {
                if (typeof value === "boolean") {
                    value = !value;
                } else if (typeof value === "number"){
                    value = (value === 0) ? false: true;
                } else {
                    throw "Failed to do Not operator";
                }
            } else if (unaryOp.Minus()) {
                if (typeof value === 'number') {
                    value = -value;
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
            this.visit(ctxCreateComponentExpr);
            value = this.getResult(ctxCreateComponentExpr);
        } else if (ctxCreateGraphicExpr) {
            this.visit(ctxCreateGraphicExpr);
            value = this.getResult(ctxCreateGraphicExpr);
        } else if (ctxCreateModuleExpr) {
            this.visit(ctxCreateModuleExpr);
            value = this.getResult(ctxCreateModuleExpr);
        } else {
            throw "Invalid data expression";
        }

        this.setResult(ctx, value);
    }

    visitBinaryOperatorExpr = (ctx: BinaryOperatorExprContext): void => {
        const ctx0 = ctx.data_expr(0)!;
        const ctx1 = ctx.data_expr(1)!;

        this.visit(ctx0);
        this.visit(ctx1);

        const value1: number | boolean = this.getResult(ctx0);
        const value2: number | boolean = this.getResult(ctx1);

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

        this.visit(ctx0);
        const value1: number | boolean = this.getResult(ctx0);
        let value2: number | boolean = false;

        let skipNext = false;

        if (ctx.LogicalOr() && value1){
            // Since evaluated true already, can skip the parsing of the next
            skipNext = true;
        }

        if (!skipNext){
            this.visit(ctx1);
            value2 = this.getResult(ctx1);
        }
        
        let result: boolean | null = null;

        if (ctx.LogicalAnd()) {
            result = value1 && value2;
        } else if (ctx.LogicalOr()) {
            result = value1 || value2;
        }

        this.setResult(ctx, result);
    }

    visitMultiplyExpr = (ctx: MultiplyExprContext): void => {
        const value1 = this.resolveDataExpr<number>(ctx.data_expr(0));
        const value2 = this.resolveDataExpr<number>(ctx.data_expr(1));
        
        let result: number | null = null;
        if (ctx.Multiply()) {
            result = value1 * value2;
        } else if (ctx.Divide()) {
            result = value1 / value2;
        } else if (ctx.Modulus()) {
            result = value1 % value2;
        }

        this.setResult(ctx, result);
    }

    visitAdditionExpr = (ctx: AdditionExprContext): void => {
        const value1 = this.resolveDataExpr<number>(ctx.data_expr(0));
        const value2 = this.resolveDataExpr<number>(ctx.data_expr(1));
        
        let result: number | null = null;
        if (ctx.Addition()) {
            result = value1 + value2;
        } else if (ctx.Minus()) {
            result = value1 - value2;
        }

        this.setResult(ctx, result);
    }

    visitFunction_def_expr = (ctx: Function_def_exprContext): void => {
        const functionName = ctx.ID().getText();

        // These are the defined arguments for the function
        let funcDefinedParameters: FunctionDefinedParameter[] = [];
        const ctxFunctionArgsExpr = ctx.function_args_expr();
        if (ctxFunctionArgsExpr) {
            this.visit(ctxFunctionArgsExpr);
            funcDefinedParameters = this.getResult(ctxFunctionArgsExpr);
        }

        const executionStack = this.executionStack;
        const functionCounter = { counter: 0 };

        const resolveNet = this.createNetResolver(this.executionStack);

        const __runFunc = (passedInParameters:CallableParameter[], 
            options: CFunctionOptions): [
            executionContext: ExecutionContext, 
            result: ComplexType | null] => {

            const executionContextName = 
                functionName + '_' + functionCounter['counter'];

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
        const ctxPinSelectExpr2 = ctx.pin_select_expr2();
        this.visit(ctxPinSelectExpr2);
        const atPin: number | string = this.getResult(ctxPinSelectExpr2);

        const executor = this.getExecutor();

        const currentComponent = executor.scope.currentComponent!;
        const currentPin = executor.scope.currentPin;

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

        const currentComponent = executor.scope.currentComponent;
        const currentPin = executor.scope.currentPin;

        executor.scope.indentLevel += 1;

        ctx.at_block_expressions().forEach(expression => {
            this.visit(expression);
        });

        executor.scope.indentLevel -= 1;

        // Once all done, then restore
        executor.scope.currentComponent = currentComponent;
        executor.scope.currentPin = currentPin;

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
                this.visit(ctxDataExpr);
                useValue = this.getResult(ctxDataExpr);
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
            this.visit(wireSegment);
            return this.getResult(wireSegment);
        });

        this.getExecutor().addWire(segments);
    }

    visitPoint_expr = (ctx: Point_exprContext): ComponentPin => {
        const ID = ctx.ID();
        return this.getExecutor().addPoint(ID.getText());
    }

    visitProperty_set_expr = (ctx: Property_set_exprContext): void => {
        const ctxDataExpr = ctx.data_expr();
        this.visit(ctxDataExpr);
        const result = this.getResult(ctxDataExpr);
        

        // To check if this works
        const ctxAtomExpr = ctx.atom_expr();
        this.visit(ctxAtomExpr);
        const resolvedProperty = this.getResult(ctxAtomExpr);

        // TODO: check if this works correctly
        this.getExecutor().setProperty(resolvedProperty, result);
    }
    
    visitDouble_dot_property_set_expr = (ctx: Double_dot_property_set_exprContext): void => {
        const ctxDataExpr = ctx.data_expr();
        this.visit(ctxDataExpr);
        const result = this.getResult(ctxDataExpr);

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
            this.visit(ctxDataExpr);
            dataValue = this.getResult(ctxDataExpr);

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
        const ctxDataExpr = ctx.data_expr();
        this.visit(ctxDataExpr);
        const result = this.getResult(ctxDataExpr);

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
                const tmpCtx = ctxInnerIfExprs[i];
                this.visit(tmpCtx);
                const innerResult = this.getResult(tmpCtx);

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
        const ctxDataExpr = ctx.data_expr();
        this.visit(ctxDataExpr);
        const result = this.getResult(ctxDataExpr);

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
            this.visit(dataExpr);
            const result = this.getResult(dataExpr);

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
        const forVariableNames = ctx.ID().map(item => item.getText());
        const ctxDataExpr = ctx.data_expr();

        this.visit(ctxDataExpr);
        const listItems = this.getResult(ctxDataExpr);

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
                    this.getExecutor().scope.variables.set(
                        forVariableNames[index], value);
                });

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

                counter += 1;
            } else {
                keepLooping = false;
            }
        }

        this.getExecutor().popBreakContext();
    }

    private resolveDataExpr<T>(data_expr: Data_exprContext | null): T {
        this.visit(data_expr!);
        const value: T | UndeclaredReference = this.getResult(data_expr!);

        if (value instanceof UndeclaredReference) {
            this.throwWithContext(data_expr, value.throwMessage());
        }

        return value;
    }

    pinTypes = [
        PinTypes.Any,
        PinTypes.IO,
        PinTypes.Input,
        PinTypes.Output,
        PinTypes.Power,
    ];


    private parseCreateComponentPins(
        pinData: number | Map<string, any>,
    ): PinDefinition[] {
        const pins: PinDefinition[] = [];

        if (typeof pinData === 'number') {
            const lastPin = pinData;
            for (let i = 0; i < lastPin; i++) {
                const pinId = i + 1;
                pins.push(
                    new PinDefinition(pinId, PinIdType.Int, pinId.toString()),
                );
            }
        } else if (pinData instanceof Map) {
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
        }

        return pins;
    }

    private parseCreateModulePorts(portsDefinition: Map<string, any>)
        : {
            left: (string | [blank: number])[],
            right: (string | [blank: number])[]
        } {

        let leftItems: (string | [blank: number])[] = [];
        let rightItems: (string | [blank: number])[] = [];

        if (portsDefinition.has('left')) {
            leftItems = portsDefinition.get('left');

            if (!Array.isArray(leftItems)) {
                leftItems = [leftItems];
            }
        }

        if (portsDefinition.has('right')) {
            rightItems = portsDefinition.get('right');

            if (!Array.isArray(rightItems)) {
                rightItems = [rightItems];
            }
        }

        return {
            left: leftItems,
            right: rightItems
        }
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
        this.getExecutor().scope.printNets();
    }

    dumpNets(): ComponentPinNet[]  {
        return this.getExecutor().scope.dumpNets();
    }

    dumpUniqueNets(): Net[] {
        const nets = this.getExecutor().scope.getNets();
        return nets.reduce((accum, [, , net]) => {
            accum.push(net);
            return accum;
        }, [] as Net[])
    }

    dumpVariables(): Map<string, any> {
        return this.getExecutor().scope.variables;
    }

    dumpInstances(): Map<string, ClassComponent> {
        return this.getExecutor().scope.instances;
    }

    dump2() {
        const instances = this.getExecutor().scope.instances;
        const items = [];

        for (const [instanceName, instance] of instances) {
            if (instance.assignedRefDes === null) {
                continue;
            }

            const pinNets = this.resolveNets(
                this.getExecutor().scope,
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

        const instances = this.getExecutor().scope.instances;
        for (const [instanceName, instance] of instances) {
            const pinNets = this.resolveNets(
                this.getExecutor().scope,
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

    getGraph() {
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
            nets,
            components: Array.from(executor.scope.instances.values())
        };
    }

    annotateComponents(): void {
        this.log('===== annotate components =====');

        const annotater = new ComponentAnnotater();
        const instances = this.getExecutor().scope.instances;

        const toAnnotate:ClassComponent[] = [];

        for (const [, instance] of instances) {
            if (instance.assignedRefDes === null) {
                if (instance.typeProp === ComponentTypes.label ||
                    instance.typeProp === ComponentTypes.net ||
                    instance.typeProp === ComponentTypes.point) {
                    continue;
                }

                if (instance.typeProp === null){
                    this.log('Instance has no type:', instance.instanceName, ' assuming connector');
                    instance.typeProp = 'conn';
                }

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
            const newRefDes = annotater.getAnnotation(instance.typeProp);

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

    applySheetFrameComponent(): {
        frameComponent: ClassComponent | null
    } {
        // Applies sheet frame component to the sheet frames
        const baseScope = this.getExecutor().scope;
        const document = baseScope.variables.get(GlobalDocumentName);

        let frameComponent: ClassComponent | null = null;

        if (document && document[FrameParamKeys.SheetType]) {
            frameComponent = document[FrameParamKeys.SheetType] as ClassComponent;

            // If page size is set, then use it for sheet frames
            baseScope.frames.forEach(item => {
                if (item.frameType === FrameType.Sheet) {
                    item.parameters.set(FrameParamKeys.SheetType, frameComponent);
                }
            });
        }

        return {
            frameComponent
        };
    }

    private resolveNets(
        scope: ExecutionScope,
        instance: ClassComponent,
    ): { pin: PinDefinition; netName: string, netBaseName: string }[] {
        // Returns the list of nets that the component pins are
        // connected to.

        const result = [];

        for (const [pinId, pin] of instance.pins) {
            let netName = NoNetText;
            let netBaseName = NoNetText;

            if (scope.hasNet(instance, pinId)) {
                const netObject = scope.getNet(instance, pinId);
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

    private setComponentOrientation(component: ClassComponent, pin: number,
        orientation: string): void {

        // This can be used to modify the orientation of the component.
        if (this.acceptedDirections.indexOf(orientation) !== -1) {
            // a valid direction
            component.setParam('_addDirection', orientation);
            component.setParam('_addPin', pin);
        } else {
            throw "Invalid modifier for orientation";
        }
    }

    private setComponentFlip(component: ClassComponent, flipValue: string): void {
        if (this.acceptedFlip.indexOf(flipValue) !== -1) {
            component.setParam(flipValue, 1);
        }
    }

    private getPropertyExprList(items: Property_exprContext[]): Map<string, any> {
        const properties = new Map<string, any>();

        items.forEach((item) => {
            this.visit(item);
            const result: Map<string, any> = this.getResult(item); // Map should be returned

            for (const [key, value] of result) {
                properties.set(key, value);
            }
        });

        return properties;
    }


    // private checkNetNamespaceIncludes(
    //     targetNetName: string, targetNamespaceParts: string[], net: Net): boolean {

    //     // Returns true if the namespace of <net> is a fit for 
    //     // the target namespace supplied

    //     if (net.name === targetNetName) {
    //         // split the net namespace into parts for comparison.
    //         // For true to be returned, all parts in net must also be in
    //         // targetNamespaceParts.
    //         const netNamespaceParts = this.getNamespaceParts(net.namespace);
    //         this.print('check namespace', targetNetName,
    //             targetNamespaceParts, netNamespaceParts);

    //         let matches = 0;
    //         for (let i = 0; i < netNamespaceParts.length; i++) {
    //             if (netNamespaceParts[i] === targetNamespaceParts[i]) {
    //                 matches++;
    //             }
    //         }

    //         if (matches === netNamespaceParts.length) {
    //             return true;
    //         }
    //     }

    //     return false;
    // }

    // private getNamespaceParts(namespace: string): string[] {
    //     return namespace.split(".").slice(0, -2);
    // }

}


const ComponentRefDesPrefixes = {
    'res': 'R',
    'cap': 'C',
    'ind': 'L',
    'diode': 'D',
    'conn': 'J',
    'transistor': 'Q',
    'relay': 'K',
    'ic': 'U',

    '?': '?',
}

class ComponentAnnotater {

    counter = {};

    existingRefDes: string[] = [];

    constructor(){
        for(const key in ComponentRefDesPrefixes){
            this.counter[key] = 1;
        }

        this.counter['?'] = 1;
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
        let proposedName: string;

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