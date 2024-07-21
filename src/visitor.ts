
import {
    Add_component_exprContext,
    AdditionExprContext,
    At_blockContext,
    At_block_pin_exprContext,
    At_block_pin_expression_complexContext,
    At_block_pin_expression_simpleContext,
    At_component_exprContext,
    BinaryOperatorExprContext,
    Blank_exprContext,
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
    ScriptContext,
    Single_line_propertyContext,
    Sub_exprContext,
    To_component_exprContext,
    Wire_exprContext,
    UnaryOperatorExprContext,
    Wire_atom_exprContext,
    Wire_expr_direction_onlyContext,
    Wire_expr_direction_valueContext,
} from './antlr/CircuitScriptParser.js';

import { ExecutionContext } from './execute.js';
import { ClassComponent } from './objects/ClassComponent.js';
import {
    NumericValue,
    ParamDefinition,
    PinBlankValue,
} from './objects/ParamDefinition.js';
import { PinDefinition, PinIdType } from './objects/PinDefinition.js';
import { PinTypes } from './objects/PinTypes.js';
import { ExecutionScope } from './objects/ExecutionScope.js';
import { CFunctionOptions, CallableParameter, ComplexType, ComponentPin, 
    ComponentPinNet, FunctionDefinedParameter, UndeclaredReference } from './objects/types.js';
import { BlockTypes, ComponentTypes, NoNetText } from './globals.js';
import { Net } from './objects/Net.js';
import { SubExpressionCommand, SymbolDrawingCommands } from './draw_symbols.js';
import { BaseVisitor } from './BaseVisitor.js';


export class ParserVisitor extends BaseVisitor {

    visitKeyword_assignment_expr = (ctx: Keyword_assignment_exprContext):
        [key: string, value: any] => {
        const id = ctx.ID().getText();
        const value = this.visit(ctx.data_expr());
        return [id, value];
    }
    
    visitBlank_expr = (ctx: Blank_exprContext): PinBlankValue => {
        // There must be an integer value, otherwise the rule wouldn't match.
        return new PinBlankValue(Number(ctx.INTEGER_VALUE().getText()));
    }

    visitPin_select_expr = (ctx: Pin_select_exprContext): string | number | null => {
        if (ctx.INTEGER_VALUE()) {
            return Number(ctx.INTEGER_VALUE()!.getText());

        } else if (ctx.STRING_VALUE()) {
            return this.prepareStringValue(ctx.STRING_VALUE()!.getText());
        }

        return null;
    }

    visitAdd_component_expr = (ctx: Add_component_exprContext): ComponentPin => {
        // The component is always the last item
        const [component, pinValue] = 
            this.visit(ctx.data_expr_with_assignment());

        if (ctx.ID()){
            this.setComponentOrientation(
                component, pinValue, ctx.ID()!.getText());
        }

        return this.getExecutor().addComponentExisting(component, pinValue);
    }

    visitAt_component_expr = (ctx: At_component_exprContext): ComponentPin => {
        if (ctx.Point()) {
            this.getExecutor().atPointBlock();

        } else {
            const [component, pin] = this.visit(ctx.component_select_expr()!);

            const currentPoint = this.getExecutor().atComponent(component, pin, {
                addSequence: true,
                cloneNetComponent: true
            });

            if (ctx.ID()) {
                // If there is ID specified, then it can only be for the 
                // component orientation.
                this.setComponentOrientation(currentPoint[0],
                    currentPoint[1], ctx.ID()!.getText())
            }
        }

        return this.getExecutor().getCurrentPoint();
    }

    visitTo_component_expr = (ctx: To_component_exprContext): ComponentPin => {
        let currentPoint: ComponentPin;

        if (ctx.Point()) {
            this.getExecutor().toPointBlock();

        } else {
            ctx.component_select_expr().forEach(item => {
                const [component, pin] = this.visit(item);
                currentPoint = this.getExecutor().toComponent(component, pin, {
                    addSequence: true, cloneNetComponent: true
                });
            });

            if (ctx.ID()) {
                // If there is ID specified, then it can only be for the 
                // component orientation.
                this.setComponentOrientation(currentPoint[0],
                    currentPoint[1], ctx.ID()!.getText())
            }
        }

        return this.getExecutor().getCurrentPoint();
    }

    visitComponent_select_expr = (ctx: Component_select_exprContext): ComponentPin => {
        if (ctx.data_expr_with_assignment()) {
            return this.visit(ctx.data_expr_with_assignment()!);
        } else {
            const component = this.getExecutor().scope.currentComponent;
            let pinId: number | string | null = null;

            if (ctx.pin_select_expr()) {
                pinId = this.visit(ctx.pin_select_expr()!);
            }
            return [component, pinId];
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

    
    visitCreate_component_expr = (ctx: Create_component_exprContext): ClassComponent => {
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

        const width = properties.has('width') ?
            properties.get('width') : null;

        const props = {
            arrange,
            display,
            type,
            width,
        }

        return this.getExecutor().createComponent(instanceName, 
            pins, params, props);
    }

    visitCreate_graphic_expr = (ctx: Create_graphic_exprContext): 
        SymbolDrawingCommands => {
        
        const commands = ctx.sub_expr().reduce((accum, item) => {
            const [commandName, parameters] = this.visit(item);

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

            accum.push([commandName, positionParams, keywordParams]);
            return accum;
        }, [] as SubExpressionCommand[]);

        return new SymbolDrawingCommands(commands);
    }

    visitSub_expr= (ctx: Sub_exprContext):
        [id: string, parameters: CallableParameter[]] => {
        let commandName: string | null = null;
        if (ctx.ID()) {
            commandName = ctx.ID()!.getText();
        } else if (ctx.Pin()) {
            commandName = ctx.Pin()!.getText();
        } else {
            throw "Invalid command!";
        }

        const parameters: CallableParameter[] = this.visit(ctx.parameters()!);
        return [commandName, parameters];
    }

    visitProperty_expr = (ctx: Property_exprContext): Map<string, any> => {
        const keyName = this.visit(ctx.property_key_expr());
        const value = this.visit(ctx.property_value_expr());

        const map = new Map<string, any>();
        map.set(keyName, value);

        return map;
    }

    visitSingle_line_property = (ctx: Single_line_propertyContext): any | any[] => {
        let value;
        if (ctx.data_expr().length === 1) {
            value = this.visit(ctx.data_expr(0)!);
        } else {
            value = ctx.data_expr().map(item => {
                return this.visit(item);
            });
        }
        return value;
    }

    visitNested_properties = (ctx: Nested_propertiesContext): Map<string, any> => {
        const result = new Map<string, any>();
        ctx.property_expr().forEach((item) => {
            const property: Map<string, any> = this.visit(item);

            // Get out all items, by default
            for (const [key, value] of property) {
                result.set(key, value);
            }
        });

        return result;
    }

    visitProperty_key_expr = (ctx: Property_key_exprContext): string | number | null => {
        const ctxID = ctx.ID();
        const ctxIntegerValue = ctx.INTEGER_VALUE();
        const ctxStringValue = ctx.STRING_VALUE();

        if (ctxID) {
            return ctxID.getText();
        } else if (ctxIntegerValue) {
            return Number(ctxIntegerValue.getText());
        } else if (ctxStringValue) {
            return this.prepareStringValue(ctxStringValue.getText());
        }

        return null;
    }

    visitData_expr_with_assignment = (ctx: Data_expr_with_assignmentContext):
        [component: ComplexType, pin: string | number | null] => {

        let component: ComplexType;
        if (ctx.data_expr()) {
            component = this.visit(ctx.data_expr()!);

            if (component === null || component === undefined) {
                throw "Could not find component: " + ctx.data_expr()!.getText();
            }

        } else if (ctx.assignment_expr()) {
            component = this.visit(ctx.assignment_expr()!)
        }

        let pinValue: number | string = null;
        if (ctx.pin_select_expr()) {
            pinValue = this.visit(ctx.pin_select_expr()!);
        } else {
            pinValue = (component as ClassComponent).getDefaultPin();
        }

        return [component, pinValue];
    }

    
    visitUnaryOperatorExpr = (ctx: UnaryOperatorExprContext): ComplexType => {
        let value = this.visit(ctx.data_expr());

        const unaryOp = ctx.unary_operator();
        if (unaryOp) {
            if (unaryOp.Not()) {
                if (typeof value === "boolean") {
                    value = !value;
                } else {
                    throw "Failed to do Not operator";
                }
            } else if (unaryOp.Minus()) {
                if (typeof value === 'number') {
                    return -value;
                } else {
                    throw "Failed to do Negation operator";
                }
            }
        }

        return value;
    }

    visitDataExpr = (ctx: DataExprContext): ComplexType => {
        let value: ComplexType;

        if (ctx.create_component_expr()) {
            value = this.visit(ctx.create_component_expr()!) as ClassComponent;

        } else if (ctx.create_graphic_expr()) {
            value = this.visit(ctx.create_graphic_expr()!) as ClassComponent;
        } else {
            throw "Invalid data expression";
        }

        return value;
    }

    visitBinaryOperatorExpr = (ctx: BinaryOperatorExprContext): boolean | number => {
        const value1 = this.visit(ctx.data_expr(0)!);
        const value2 = this.visit(ctx.data_expr(1)!);

        const binaryOperatorType = ctx.binary_operator();

        if (binaryOperatorType.Equals()) {
            return value1 == value2; // Boolean result
        } else if (binaryOperatorType.NotEquals()) {
            return value1 != value2;
        }
    }

    visitMultiplyExpr = (ctx: MultiplyExprContext): number => {
        const value1 = this.visit(ctx.data_expr(0)!) as number;
        const value2 = this.visit(ctx.data_expr(1)!) as number;

        if (ctx.Multiply()) {
            return value1 * value2;
        } else if (ctx.Divide()) {
            return value1 / value2;
        }
    }

    visitAdditionExpr = (ctx: AdditionExprContext): number => {
        const value1 = this.visit(ctx.data_expr(0)) as number;
        const value2 = this.visit(ctx.data_expr(1)) as number;

        if (ctx.Addition()) {
            return value1 + value2;
        } else if (ctx.Minus()) {
            return value1 - value2;
        }
    }

    visitFunction_def_expr = (ctx: Function_def_exprContext): void => {
        const functionName = ctx.ID().getText();

        // These are the defined arguments for the function
        let funcDefinedParameters: FunctionDefinedParameter[] = [];
        if (ctx.function_args_expr()) {
            funcDefinedParameters = this.visit(ctx.function_args_expr()!);
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

    visitPin_select_expr2 = (ctx: Pin_select_expr2Context): string | number => {
        if (ctx.STRING_VALUE()) {
            return this.prepareStringValue(ctx.STRING_VALUE().getText());
        } else if (ctx.INTEGER_VALUE()) {
            return Number(ctx.INTEGER_VALUE().getText());
        }
    }

    visitAt_block_pin_expr = (ctx: At_block_pin_exprContext): ComponentPin => {
        const atPin: number | string = this.visit(ctx.pin_select_expr2());

        const executor = this.getExecutor();

        const currentComponent = executor.scope.currentComponent;
        const currentPin = executor.scope.currentPin;

        executor.atComponent(currentComponent, atPin, {
            addSequence: true
        });

        executor.print('at block pin expressions');

        if (ctx.at_block_pin_expression_simple()) {
            this.visit(ctx.at_block_pin_expression_simple());
        } else if (ctx.at_block_pin_expression_complex()) {
            this.visit(ctx.at_block_pin_expression_complex());
        }

        executor.print('end at block pin expressions');

        // Go back to the original position
        return executor.atComponent(currentComponent, currentPin);
    }

    visitAt_block = (ctx: At_blockContext): ComponentPin => {
        const executor = this.getExecutor();
        executor.print('entering at block');

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

        executor.print('leaving at block');

        return executor.getCurrentPoint();
    }

    visitAt_block_pin_expression_simple = (ctx: At_block_pin_expression_simpleContext): void => {
        if (ctx.expression()) {
            // Handle any expressions within
            this.visit(ctx.expression());
        } else if (ctx.NOT_CONNECTED()) {
            // Do nothing
            return;
        }
    }

    visitAt_block_pin_expression_complex = (ctx: At_block_pin_expression_complexContext): ComponentPin => {
        ctx.expression().forEach(item => {
            this.visit(item);
        })

        return this.getExecutor().getCurrentPoint();
    }

    visitWire_atom_expr = (ctx: Wire_atom_exprContext) => {
        const id = ctx.ID(0); // direction

        if (ctx.ID(1)){
            // this is either the keyword auto or a variable name
        } else {
            // must be a number

        }
    }

    visitWire_expr_direction_only = (ctx: Wire_expr_direction_onlyContext) => {
        const value = ctx.ID().getText();
        if (value === 'auto' || value === 'auto_'){
            return [value];
        } else {
            throw 'Invalid direction for wire';
        }
    }

    visitWire_expr_direction_value = (ctx: Wire_expr_direction_valueContext) => {
        const direction = ctx.ID().getText();

        if (this.acceptedDirections.indexOf(direction) !== -1) {
            let useValue: number | null = null;
            if (ctx.INTEGER_VALUE()) {
                useValue = Number(ctx.INTEGER_VALUE());
            } else if (ctx.data_expr()) {
                useValue = this.visit(ctx.data_expr()!);
            }

            if (useValue !== null) {
                return [direction, useValue];
            }
        }

        throw "Invalid direction or value for wire";
    }

    visitWire_expr = (ctx: Wire_exprContext): void => {
        const wireAtomExpr = ctx.wire_atom_expr();
        const segments = wireAtomExpr.map(wireSegment => {
            return this.visit(wireSegment);
        });

        this.getExecutor().addWire(segments);
    }

    visitPoint_expr = (ctx: Point_exprContext): ComponentPin => {
        const ID = ctx.ID();
        return this.getExecutor().addPoint(ID.getText());
    }

    visitProperty_set_expr = (ctx: Property_set_exprContext): void => {
        const result = this.visit(ctx.data_expr());

        // To check if this works
        const resolvedProperty = this.visit(ctx.atom_expr());

        // TODO: check if this works correctly
        this.getExecutor().setProperty(resolvedProperty, result);
    }
    
    visitDouble_dot_property_set_expr = (ctx: Double_dot_property_set_exprContext) => {
        const result = this.visit(ctx.data_expr());
        const propertyName = ctx.ID().getText();
        this.getExecutor().setProperty('..' + propertyName, result);
    }

    visitFrame_expr = (ctx: Frame_exprContext): void => {
        const frameId = this.getExecutor().enterFrame();
        this.runExpressions(this.getExecutor(), ctx.expression());
        this.getExecutor().exitFrame(frameId);
    }

    visitNet_namespace_expr = (ctx: Net_namespace_exprContext): string => {
        let dataValue: ComplexType = null;

        let netNamespace = null;
        const hasPlus = ctx.Addition();

        if (ctx.data_expr()) {
            dataValue = this.visit(ctx.data_expr()) as ComplexType;

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

        return (hasPlus ? "+" : "") + netNamespace;
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
                    if (this.pinTypes.indexOf(firstValue) !== -1) {
                        // First value matches a pin type
                        pinType = firstValue;
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
        const sequence = executor.scope.sequence;
        const nets = executor.scope.getNets();

        return {
            sequence,
            nets,
            components: Array.from(executor.scope.instances.values())
        };
    }

    annotateComponents(): void {
        this.print('===== annotate components =====');

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
                    this.print('Instance has no type:', instance.instanceName, ' assuming connector');
                    instance.typeProp = 'conn';
                }

                if (instance.parameters.has('refdes')) {
                    const refdes = instance.parameters.get('refdes') as string;

                    if (refdes) {
                        instance.assignedRefDes = refdes;
                        annotater.trackRefDes(refdes);
                        this.print(refdes, '-', instance.instanceName);
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
                this.print(newRefDes, '-', instance.instanceName);
            } else {
                this.print('Failed to annotate:', instance.instanceName);
            }
        });

        this.print('===== annotate done =====');
        this.print('');
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

    private getPropertyExprList(items: Property_exprContext[]): Map<string, any>{
        const properties = new Map<string, any>();

        items.forEach((item) => {
            const result: Map<string, any> = this.visit(item); // Map should be returned

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