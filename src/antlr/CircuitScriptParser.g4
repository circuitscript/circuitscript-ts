/*
 * Copyright 2023 Liu Weihao
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

parser grammar CircuitScriptParser;

options { tokenVocab=CircuitScriptLexer; }

// Only allow import expressions at start
script: (import_expr | NEWLINE)* expression* EOF;

expression: flow_expressions 
        | graph_expressions
        | function_def_expr
        | frame_expr
        | part_set_expr
        | annotation_comment_expr
        | double_dot_property_set_expr
        | assignment_expr
        | operator_assignment_expr
        | property_set_expr2
        | atom_expr
        | function_call_expr
        | NEWLINE
        ;

// Changes flow of the program
flow_expressions: if_expr
                    | while_expr
                    | for_expr
                    | Break
                    | Continue
                    ;

// Adds nodes and build connectivity
graph_expressions:  add_component_expr
                    | to_component_expr
                    | at_component_expr
                    | at_block
                    | wire_expr
                    | point_expr
                    | path_block
                    ;

expressions_block:
	NEWLINE INDENT expression+ DEDENT;

path_block:
	(Branch | Join | Parallel | Point) Colon expressions_block;

property_set_expr2:
	atom_expr Colon NEWLINE INDENT (NEWLINE | assignment_expr2)+ DEDENT;

assignment_expr2: (ID | INTEGER_VALUE) Colon value_expr;

pin_select_expr: Pin data_expr;
component_modifier_expr: ID Colon (value_expr | ID);

data_expr_with_assignment: (data_expr | assignment_expr) component_modifier_expr* pin_select_expr?;

add_component_expr: Add data_expr_with_assignment;

component_select_expr: data_expr_with_assignment | pin_select_expr | Point;

// This does not have the 'pin' word
pin_select_expr2: INTEGER_VALUE | STRING_VALUE;

at_component_expr: At component_select_expr;
to_component_expr: To component_select_expr (Comma component_select_expr)*;

at_block: at_block_header NEWLINE INDENT (NEWLINE | at_block_expressions) + DEDENT;
at_block_expressions: expression | at_block_pin_expr;

at_block_header: at_component_expr Colon annotation_comment_expr*;

// Expression to allow direct pin assignment
at_block_pin_expr: pin_select_expr2 Colon (at_block_pin_expression_simple | at_block_pin_expression_complex);

at_block_pin_expression_simple: (expression | NOT_CONNECTED);
at_block_pin_expression_complex: expressions_block;

assignment_expr:            (atom_expr | function_call_expr) Assign data_expr;
operator_assignment_expr:   atom_expr (AdditionAssign | MinusAssign | MultiplyAssign | DivideAssign | ModulusAssign) data_expr;

keyword_assignment_expr: ID Assign data_expr;

parameters: (data_expr (Comma data_expr)* (Comma keyword_assignment_expr)*)
            | (keyword_assignment_expr (Comma keyword_assignment_expr)*);

double_dot_property_set_expr: DoubleDot ID Assign data_expr;

data_expr:
    LParen data_expr RParen                             #RoundedBracketsExpr
    | Create create_expr                                #CreateExpr
    | (Not | Minus) data_expr                           #UnaryOperatorExpr
    | LSquare (data_expr (Comma data_expr)*)* RSquare   #ArrayExpr
    | data_expr (Multiply | Divide | Modulus) data_expr #MultiplyExpr
    | data_expr (Addition | Minus) data_expr            #AdditionExpr
    | data_expr (Equals
        | NotEquals
        | GreaterThan
        | GreatOrEqualThan
        | LessThan
        | LessOrEqualThan) data_expr                    #BinaryOperatorExpr
    | data_expr (LogicalAnd | LogicalOr) data_expr      #LogicalOperatorExpr
    | atom_expr                                         #AtomExpr
    | function_call_expr                                #FunctionCallExpr
    | value_expr                                        #ValueExpr 
    ;
    
value_expr: (Minus?
    (NUMERIC_VALUE
    | DECIMAL_VALUE
    | INTEGER_VALUE
    | STRING_VALUE
    | PERCENTAGE_VALUE
    | BOOLEAN_VALUE));

function_def_expr: Define ID LParen function_args_expr? RParen Colon NEWLINE INDENT (NEWLINE | function_expr)+ DEDENT;
function_expr: expression | function_return_expr;

function_args_expr:
    ID (Comma ID)* (Comma ID Assign value_expr)*
    | ID Assign value_expr (Comma ID Assign value_expr)*
    ;

atom_expr: ID trailer_expr2*;

trailer_expr: LParen parameters? RParen | trailer_expr2;

trailer_expr2: Dot ID
                | LSquare data_expr RSquare;

function_call_expr: net_namespace_expr? ID trailer_expr+;

net_namespace_expr: Addition? Divide data_expr?;

function_return_expr: Return data_expr ;

property_block_expr: property_key_expr Colon expressions_block;

graphic_expressions_block:
    NEWLINE INDENT (NEWLINE | graphic_expr)+ DEDENT;

create_expr: create_component_expr
            | create_graphic_expr
            | create_module_expr;

create_component_expr: Component Colon NEWLINE INDENT (NEWLINE | property_expr )+ DEDENT;

create_graphic_expr: Graphic (LParen ID RParen)? Colon graphic_expressions_block;

create_module_expr: Module Colon NEWLINE INDENT (NEWLINE | property_expr | property_block_expr) + DEDENT;

nested_properties_inner: (NEWLINE INDENT (NEWLINE | property_expr)+ DEDENT);
graphic_expr: For ID (Comma ID)* In data_expr Colon graphic_expressions_block                     # GraphicForExpr
              | command=(ID | Pin) Colon (parameters | LParen parameters RParen | nested_properties_inner)  # GraphicCommandExpr
              ;

property_expr: property_key_expr extra=STRING_VALUE* Colon property_value_expr;
property_key_expr: ID | INTEGER_VALUE | STRING_VALUE;
property_value_expr: nested_properties_inner        # nested_properties
                    | data_expr (Comma data_expr)*    # single_line_property
                    ;

wire_atom_expr: ID data_expr?;
wire_expr: Wire wire_atom_expr*;

point_expr: Point (ID | data_expr);
import_expr: Import libraryName=ID  import_annotation_expr?                                                   # import_simple
      | From libraryName=ID Import (all=Multiply | (funcNames+=ID (Comma funcNames+=ID)*)) import_annotation_expr?   # import_specific_or_all
      ;

import_annotation_expr: ANNOTATION_START (ID |Minus)*;

frame_expr: (Frame | Sheet) Colon expressions_block;
if_expr:    If data_expr Colon expressions_block if_inner_expr* else_expr?;

if_inner_expr: Else If data_expr Colon expressions_block;
else_expr: Else Colon expressions_block;

while_expr: While data_expr Colon expressions_block;
for_expr: For ID (Comma ID)* In data_expr Colon expressions_block;

// Part matching for parameters.
part_set_expr: Set Colon data_expr (Comma data_expr)* Colon part_match_block;
part_set_key: ID | INTEGER_VALUE | NUMERIC_VALUE | STRING_VALUE | PERCENTAGE_VALUE;

part_match_block: NEWLINE INDENT part_sub_expr+ DEDENT;
part_sub_expr: part_condition_expr | part_value_expr | part_condition_key_only_expr | NEWLINE;

part_condition_expr: key_id+=part_set_key Colon values+=data_expr (Comma key_id+=part_set_key Colon values+=data_expr)* (Comma id_only=part_set_key)*Colon (part_match_block | (last_data+=data_expr (Comma last_data+=data_expr)*));
part_condition_key_only_expr: part_set_key Colon part_match_block;
part_value_expr: part_set_key Colon data_expr (Comma data_expr)*;

annotation_comment_expr: ANNOTATION_START ID;
