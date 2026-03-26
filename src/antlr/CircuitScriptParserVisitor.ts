// Generated from src/antlr/CircuitScriptParser.g4 by ANTLR 4.13.1

import { AbstractParseTreeVisitor } from "antlr4ng";


import { ScriptContext } from "./CircuitScriptParser.js";
import { ExpressionContext } from "./CircuitScriptParser.js";
import { Non_newline_expressionContext } from "./CircuitScriptParser.js";
import { Flow_expressionsContext } from "./CircuitScriptParser.js";
import { Graph_expressionsContext } from "./CircuitScriptParser.js";
import { Expressions_blockContext } from "./CircuitScriptParser.js";
import { Path_blockContext } from "./CircuitScriptParser.js";
import { Pin_select_exprContext } from "./CircuitScriptParser.js";
import { Component_modifier_exprContext } from "./CircuitScriptParser.js";
import { Data_expr_with_assignmentContext } from "./CircuitScriptParser.js";
import { Assignment_exprContext } from "./CircuitScriptParser.js";
import { Add_component_exprContext } from "./CircuitScriptParser.js";
import { Component_select_exprContext } from "./CircuitScriptParser.js";
import { At_component_exprContext } from "./CircuitScriptParser.js";
import { To_component_exprContext } from "./CircuitScriptParser.js";
import { At_block_headerContext } from "./CircuitScriptParser.js";
import { At_blockContext } from "./CircuitScriptParser.js";
import { At_block_expressionsContext } from "./CircuitScriptParser.js";
import { At_block_pin_exprContext } from "./CircuitScriptParser.js";
import { Keyword_assignment_exprContext } from "./CircuitScriptParser.js";
import { ParametersContext } from "./CircuitScriptParser.js";
import { Double_dot_property_set_exprContext } from "./CircuitScriptParser.js";
import { ValueExprContext } from "./CircuitScriptParser.js";
import { ArrayExprContext } from "./CircuitScriptParser.js";
import { AdditionExprContext } from "./CircuitScriptParser.js";
import { MultiplyExprContext } from "./CircuitScriptParser.js";
import { LogicalOperatorExprContext } from "./CircuitScriptParser.js";
import { CreateExprContext } from "./CircuitScriptParser.js";
import { UnaryOperatorExprContext } from "./CircuitScriptParser.js";
import { CallableExprContext } from "./CircuitScriptParser.js";
import { BinaryOperatorExprContext } from "./CircuitScriptParser.js";
import { RoundedBracketsExprContext } from "./CircuitScriptParser.js";
import { Value_exprContext } from "./CircuitScriptParser.js";
import { Function_def_exprContext } from "./CircuitScriptParser.js";
import { Function_exprContext } from "./CircuitScriptParser.js";
import { Function_args_exprContext } from "./CircuitScriptParser.js";
import { Function_return_exprContext } from "./CircuitScriptParser.js";
import { Net_namespace_exprContext } from "./CircuitScriptParser.js";
import { Callable_exprContext } from "./CircuitScriptParser.js";
import { TrailerContext } from "./CircuitScriptParser.js";
import { Property_block_exprContext } from "./CircuitScriptParser.js";
import { Properties_blockContext } from "./CircuitScriptParser.js";
import { Graphic_expressions_blockContext } from "./CircuitScriptParser.js";
import { Create_exprContext } from "./CircuitScriptParser.js";
import { Create_component_exprContext } from "./CircuitScriptParser.js";
import { Create_graphic_exprContext } from "./CircuitScriptParser.js";
import { Create_module_exprContext } from "./CircuitScriptParser.js";
import { GraphicForExprContext } from "./CircuitScriptParser.js";
import { GraphicCommandExprContext } from "./CircuitScriptParser.js";
import { Property_exprContext } from "./CircuitScriptParser.js";
import { Property_key_exprContext } from "./CircuitScriptParser.js";
import { Nested_propertiesContext } from "./CircuitScriptParser.js";
import { Single_line_propertyContext } from "./CircuitScriptParser.js";
import { Wire_exprContext } from "./CircuitScriptParser.js";
import { Point_exprContext } from "./CircuitScriptParser.js";
import { Import_simpleContext } from "./CircuitScriptParser.js";
import { Import_specific_or_allContext } from "./CircuitScriptParser.js";
import { Frame_exprContext } from "./CircuitScriptParser.js";
import { If_exprContext } from "./CircuitScriptParser.js";
import { If_inner_exprContext } from "./CircuitScriptParser.js";
import { Else_exprContext } from "./CircuitScriptParser.js";
import { While_exprContext } from "./CircuitScriptParser.js";
import { For_exprContext } from "./CircuitScriptParser.js";
import { Part_set_exprContext } from "./CircuitScriptParser.js";
import { Part_set_keyContext } from "./CircuitScriptParser.js";
import { Part_match_blockContext } from "./CircuitScriptParser.js";
import { Part_sub_exprContext } from "./CircuitScriptParser.js";
import { Part_condition_exprContext } from "./CircuitScriptParser.js";
import { Part_value_exprContext } from "./CircuitScriptParser.js";
import { Annotation_comment_exprContext } from "./CircuitScriptParser.js";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `CircuitScriptParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export class CircuitScriptParserVisitor<Result> extends AbstractParseTreeVisitor<Result> {
    /**
     * Visit a parse tree produced by `CircuitScriptParser.script`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitScript?: (ctx: ScriptContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExpression?: (ctx: ExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.non_newline_expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitNon_newline_expression?: (ctx: Non_newline_expressionContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.flow_expressions`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFlow_expressions?: (ctx: Flow_expressionsContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.graph_expressions`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitGraph_expressions?: (ctx: Graph_expressionsContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.expressions_block`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExpressions_block?: (ctx: Expressions_blockContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.path_block`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPath_block?: (ctx: Path_blockContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.pin_select_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPin_select_expr?: (ctx: Pin_select_exprContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.component_modifier_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitComponent_modifier_expr?: (ctx: Component_modifier_exprContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.data_expr_with_assignment`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitData_expr_with_assignment?: (ctx: Data_expr_with_assignmentContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.assignment_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAssignment_expr?: (ctx: Assignment_exprContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.add_component_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAdd_component_expr?: (ctx: Add_component_exprContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.component_select_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitComponent_select_expr?: (ctx: Component_select_exprContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.at_component_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAt_component_expr?: (ctx: At_component_exprContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.to_component_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTo_component_expr?: (ctx: To_component_exprContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.at_block_header`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAt_block_header?: (ctx: At_block_headerContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.at_block`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAt_block?: (ctx: At_blockContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.at_block_expressions`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAt_block_expressions?: (ctx: At_block_expressionsContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.at_block_pin_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAt_block_pin_expr?: (ctx: At_block_pin_exprContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.keyword_assignment_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitKeyword_assignment_expr?: (ctx: Keyword_assignment_exprContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.parameters`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitParameters?: (ctx: ParametersContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.double_dot_property_set_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDouble_dot_property_set_expr?: (ctx: Double_dot_property_set_exprContext) => Result;
    /**
     * Visit a parse tree produced by the `ValueExpr`
     * labeled alternative in `CircuitScriptParser.data_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitValueExpr?: (ctx: ValueExprContext) => Result;
    /**
     * Visit a parse tree produced by the `ArrayExpr`
     * labeled alternative in `CircuitScriptParser.data_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitArrayExpr?: (ctx: ArrayExprContext) => Result;
    /**
     * Visit a parse tree produced by the `AdditionExpr`
     * labeled alternative in `CircuitScriptParser.data_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAdditionExpr?: (ctx: AdditionExprContext) => Result;
    /**
     * Visit a parse tree produced by the `MultiplyExpr`
     * labeled alternative in `CircuitScriptParser.data_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMultiplyExpr?: (ctx: MultiplyExprContext) => Result;
    /**
     * Visit a parse tree produced by the `LogicalOperatorExpr`
     * labeled alternative in `CircuitScriptParser.data_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLogicalOperatorExpr?: (ctx: LogicalOperatorExprContext) => Result;
    /**
     * Visit a parse tree produced by the `CreateExpr`
     * labeled alternative in `CircuitScriptParser.data_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCreateExpr?: (ctx: CreateExprContext) => Result;
    /**
     * Visit a parse tree produced by the `UnaryOperatorExpr`
     * labeled alternative in `CircuitScriptParser.data_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitUnaryOperatorExpr?: (ctx: UnaryOperatorExprContext) => Result;
    /**
     * Visit a parse tree produced by the `CallableExpr`
     * labeled alternative in `CircuitScriptParser.data_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCallableExpr?: (ctx: CallableExprContext) => Result;
    /**
     * Visit a parse tree produced by the `BinaryOperatorExpr`
     * labeled alternative in `CircuitScriptParser.data_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBinaryOperatorExpr?: (ctx: BinaryOperatorExprContext) => Result;
    /**
     * Visit a parse tree produced by the `RoundedBracketsExpr`
     * labeled alternative in `CircuitScriptParser.data_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitRoundedBracketsExpr?: (ctx: RoundedBracketsExprContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.value_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitValue_expr?: (ctx: Value_exprContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.function_def_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFunction_def_expr?: (ctx: Function_def_exprContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.function_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFunction_expr?: (ctx: Function_exprContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.function_args_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFunction_args_expr?: (ctx: Function_args_exprContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.function_return_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFunction_return_expr?: (ctx: Function_return_exprContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.net_namespace_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitNet_namespace_expr?: (ctx: Net_namespace_exprContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.callable_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCallable_expr?: (ctx: Callable_exprContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.trailer`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTrailer?: (ctx: TrailerContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.property_block_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProperty_block_expr?: (ctx: Property_block_exprContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.properties_block`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProperties_block?: (ctx: Properties_blockContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.graphic_expressions_block`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitGraphic_expressions_block?: (ctx: Graphic_expressions_blockContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.create_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCreate_expr?: (ctx: Create_exprContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.create_component_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCreate_component_expr?: (ctx: Create_component_exprContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.create_graphic_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCreate_graphic_expr?: (ctx: Create_graphic_exprContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.create_module_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCreate_module_expr?: (ctx: Create_module_exprContext) => Result;
    /**
     * Visit a parse tree produced by the `GraphicForExpr`
     * labeled alternative in `CircuitScriptParser.graphic_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitGraphicForExpr?: (ctx: GraphicForExprContext) => Result;
    /**
     * Visit a parse tree produced by the `GraphicCommandExpr`
     * labeled alternative in `CircuitScriptParser.graphic_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitGraphicCommandExpr?: (ctx: GraphicCommandExprContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.property_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProperty_expr?: (ctx: Property_exprContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.property_key_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProperty_key_expr?: (ctx: Property_key_exprContext) => Result;
    /**
     * Visit a parse tree produced by the `nested_properties`
     * labeled alternative in `CircuitScriptParser.property_value_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitNested_properties?: (ctx: Nested_propertiesContext) => Result;
    /**
     * Visit a parse tree produced by the `single_line_property`
     * labeled alternative in `CircuitScriptParser.property_value_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSingle_line_property?: (ctx: Single_line_propertyContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.wire_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitWire_expr?: (ctx: Wire_exprContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.point_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPoint_expr?: (ctx: Point_exprContext) => Result;
    /**
     * Visit a parse tree produced by the `import_simple`
     * labeled alternative in `CircuitScriptParser.import_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitImport_simple?: (ctx: Import_simpleContext) => Result;
    /**
     * Visit a parse tree produced by the `import_specific_or_all`
     * labeled alternative in `CircuitScriptParser.import_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitImport_specific_or_all?: (ctx: Import_specific_or_allContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.frame_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFrame_expr?: (ctx: Frame_exprContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.if_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIf_expr?: (ctx: If_exprContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.if_inner_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIf_inner_expr?: (ctx: If_inner_exprContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.else_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitElse_expr?: (ctx: Else_exprContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.while_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitWhile_expr?: (ctx: While_exprContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.for_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFor_expr?: (ctx: For_exprContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.part_set_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPart_set_expr?: (ctx: Part_set_exprContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.part_set_key`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPart_set_key?: (ctx: Part_set_keyContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.part_match_block`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPart_match_block?: (ctx: Part_match_blockContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.part_sub_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPart_sub_expr?: (ctx: Part_sub_exprContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.part_condition_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPart_condition_expr?: (ctx: Part_condition_exprContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.part_value_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPart_value_expr?: (ctx: Part_value_exprContext) => Result;
    /**
     * Visit a parse tree produced by `CircuitScriptParser.annotation_comment_expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAnnotation_comment_expr?: (ctx: Annotation_comment_exprContext) => Result;
}

