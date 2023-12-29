// Generated from ./src/antlr/CircuitScript.g4 by ANTLR 4.13.1

import {ParseTreeVisitor} from 'antlr4';


import { ScriptContext } from "./CircuitScriptParser";
import { ExpressionContext } from "./CircuitScriptParser";
import { Branch_blocksContext } from "./CircuitScriptParser";
import { Branch_block_innerContext } from "./CircuitScriptParser";
import { Property_set_expr2Context } from "./CircuitScriptParser";
import { Assignment_expr2Context } from "./CircuitScriptParser";
import { Add_component_exprContext } from "./CircuitScriptParser";
import { Component_select_exprContext } from "./CircuitScriptParser";
import { Pin_select_exprContext } from "./CircuitScriptParser";
import { Pin_select_expr2Context } from "./CircuitScriptParser";
import { At_component_exprContext } from "./CircuitScriptParser";
import { To_component_exprContext } from "./CircuitScriptParser";
import { At_to_multiple_exprContext } from "./CircuitScriptParser";
import { At_to_multiple_line_exprContext } from "./CircuitScriptParser";
import { At_to_multiple_line_expr_to_pinContext } from "./CircuitScriptParser";
import { At_blockContext } from "./CircuitScriptParser";
import { At_block_expressionsContext } from "./CircuitScriptParser";
import { At_block_pin_exprContext } from "./CircuitScriptParser";
import { At_block_pin_expression_simpleContext } from "./CircuitScriptParser";
import { At_block_pin_expression_complexContext } from "./CircuitScriptParser";
import { Break_keywordContext } from "./CircuitScriptParser";
import { Assignment_exprContext } from "./CircuitScriptParser";
import { Keyword_assignment_exprContext } from "./CircuitScriptParser";
import { ParametersContext } from "./CircuitScriptParser";
import { Property_set_exprContext } from "./CircuitScriptParser";
import { Double_dot_property_set_exprContext } from "./CircuitScriptParser";
import { AdditionExprContext } from "./CircuitScriptParser";
import { MultiplyExprContext } from "./CircuitScriptParser";
import { DataExprContext } from "./CircuitScriptParser";
import { UnaryOperatorExprContext } from "./CircuitScriptParser";
import { BinaryOperatorExprContext } from "./CircuitScriptParser";
import { RoundedBracketsExprContext } from "./CircuitScriptParser";
import { Binary_operatorContext } from "./CircuitScriptParser";
import { Unary_operatorContext } from "./CircuitScriptParser";
import { Value_exprContext } from "./CircuitScriptParser";
import { Signed_value_exprContext } from "./CircuitScriptParser";
import { Print_exprContext } from "./CircuitScriptParser";
import { Function_def_exprContext } from "./CircuitScriptParser";
import { Function_exprContext } from "./CircuitScriptParser";
import { Function_args_exprContext } from "./CircuitScriptParser";
import { Function_call_exprContext } from "./CircuitScriptParser";
import { Atom_exprContext } from "./CircuitScriptParser";
import { Trailer_exprContext } from "./CircuitScriptParser";
import { Function_return_exprContext } from "./CircuitScriptParser";
import { Create_component_exprContext } from "./CircuitScriptParser";
import { Create_graphic_exprContext } from "./CircuitScriptParser";
import { Property_exprContext } from "./CircuitScriptParser";
import { Sub_exprContext } from "./CircuitScriptParser";
import { Property_key_exprContext } from "./CircuitScriptParser";
import { Nested_propertiesContext } from "./CircuitScriptParser";
import { Single_line_propertyContext } from "./CircuitScriptParser";
import { Rounded_brackets_exprContext } from "./CircuitScriptParser";
import { Style_exprContext } from "./CircuitScriptParser";
import { Blank_exprContext } from "./CircuitScriptParser";
import { Wire_exprContext } from "./CircuitScriptParser";
import { Point_exprContext } from "./CircuitScriptParser";
import { Import_exprContext } from "./CircuitScriptParser";
import { Frame_exprContext } from "./CircuitScriptParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `CircuitScriptParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class CircuitScriptVisitor<Result> extends ParseTreeVisitor<Result> {
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
	 * Visit a parse tree produced by `CircuitScriptParser.branch_blocks`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBranch_blocks?: (ctx: Branch_blocksContext) => Result;
	/**
	 * Visit a parse tree produced by `CircuitScriptParser.branch_block_inner`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBranch_block_inner?: (ctx: Branch_block_innerContext) => Result;
	/**
	 * Visit a parse tree produced by `CircuitScriptParser.property_set_expr2`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProperty_set_expr2?: (ctx: Property_set_expr2Context) => Result;
	/**
	 * Visit a parse tree produced by `CircuitScriptParser.assignment_expr2`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignment_expr2?: (ctx: Assignment_expr2Context) => Result;
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
	 * Visit a parse tree produced by `CircuitScriptParser.pin_select_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPin_select_expr?: (ctx: Pin_select_exprContext) => Result;
	/**
	 * Visit a parse tree produced by `CircuitScriptParser.pin_select_expr2`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPin_select_expr2?: (ctx: Pin_select_expr2Context) => Result;
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
	 * Visit a parse tree produced by `CircuitScriptParser.at_to_multiple_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAt_to_multiple_expr?: (ctx: At_to_multiple_exprContext) => Result;
	/**
	 * Visit a parse tree produced by `CircuitScriptParser.at_to_multiple_line_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAt_to_multiple_line_expr?: (ctx: At_to_multiple_line_exprContext) => Result;
	/**
	 * Visit a parse tree produced by `CircuitScriptParser.at_to_multiple_line_expr_to_pin`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAt_to_multiple_line_expr_to_pin?: (ctx: At_to_multiple_line_expr_to_pinContext) => Result;
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
	 * Visit a parse tree produced by `CircuitScriptParser.at_block_pin_expression_simple`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAt_block_pin_expression_simple?: (ctx: At_block_pin_expression_simpleContext) => Result;
	/**
	 * Visit a parse tree produced by `CircuitScriptParser.at_block_pin_expression_complex`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAt_block_pin_expression_complex?: (ctx: At_block_pin_expression_complexContext) => Result;
	/**
	 * Visit a parse tree produced by `CircuitScriptParser.break_keyword`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBreak_keyword?: (ctx: Break_keywordContext) => Result;
	/**
	 * Visit a parse tree produced by `CircuitScriptParser.assignment_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignment_expr?: (ctx: Assignment_exprContext) => Result;
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
	 * Visit a parse tree produced by `CircuitScriptParser.property_set_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProperty_set_expr?: (ctx: Property_set_exprContext) => Result;
	/**
	 * Visit a parse tree produced by `CircuitScriptParser.double_dot_property_set_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDouble_dot_property_set_expr?: (ctx: Double_dot_property_set_exprContext) => Result;
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
	 * Visit a parse tree produced by the `DataExpr`
	 * labeled alternative in `CircuitScriptParser.data_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDataExpr?: (ctx: DataExprContext) => Result;
	/**
	 * Visit a parse tree produced by the `UnaryOperatorExpr`
	 * labeled alternative in `CircuitScriptParser.data_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnaryOperatorExpr?: (ctx: UnaryOperatorExprContext) => Result;
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
	 * Visit a parse tree produced by `CircuitScriptParser.binary_operator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBinary_operator?: (ctx: Binary_operatorContext) => Result;
	/**
	 * Visit a parse tree produced by `CircuitScriptParser.unary_operator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnary_operator?: (ctx: Unary_operatorContext) => Result;
	/**
	 * Visit a parse tree produced by `CircuitScriptParser.value_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitValue_expr?: (ctx: Value_exprContext) => Result;
	/**
	 * Visit a parse tree produced by `CircuitScriptParser.signed_value_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSigned_value_expr?: (ctx: Signed_value_exprContext) => Result;
	/**
	 * Visit a parse tree produced by `CircuitScriptParser.print_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrint_expr?: (ctx: Print_exprContext) => Result;
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
	 * Visit a parse tree produced by `CircuitScriptParser.function_call_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_call_expr?: (ctx: Function_call_exprContext) => Result;
	/**
	 * Visit a parse tree produced by `CircuitScriptParser.atom_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAtom_expr?: (ctx: Atom_exprContext) => Result;
	/**
	 * Visit a parse tree produced by `CircuitScriptParser.trailer_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTrailer_expr?: (ctx: Trailer_exprContext) => Result;
	/**
	 * Visit a parse tree produced by `CircuitScriptParser.function_return_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_return_expr?: (ctx: Function_return_exprContext) => Result;
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
	 * Visit a parse tree produced by `CircuitScriptParser.property_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProperty_expr?: (ctx: Property_exprContext) => Result;
	/**
	 * Visit a parse tree produced by `CircuitScriptParser.sub_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSub_expr?: (ctx: Sub_exprContext) => Result;
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
	 * Visit a parse tree produced by `CircuitScriptParser.rounded_brackets_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRounded_brackets_expr?: (ctx: Rounded_brackets_exprContext) => Result;
	/**
	 * Visit a parse tree produced by `CircuitScriptParser.style_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStyle_expr?: (ctx: Style_exprContext) => Result;
	/**
	 * Visit a parse tree produced by `CircuitScriptParser.blank_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBlank_expr?: (ctx: Blank_exprContext) => Result;
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
	 * Visit a parse tree produced by `CircuitScriptParser.import_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImport_expr?: (ctx: Import_exprContext) => Result;
	/**
	 * Visit a parse tree produced by `CircuitScriptParser.frame_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFrame_expr?: (ctx: Frame_exprContext) => Result;
}

