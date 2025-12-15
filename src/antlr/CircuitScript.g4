/*
 * Copyright 2023 Liu Weihao
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
 
grammar CircuitScript;

// Generate with: antlr4 -Dlanguage=Python3 CircuitScript.g4 -no-listener -visitor
// Generate with: antlr4 -Dlanguage=TypeScript CircuitScript.g4 -no-listener -visitor

tokens { INDENT, DEDENT }

// Keywords
Break:      'break';
Branch:     'branch';
Create:     'create';
Component:  'component';
Graphic:    'graphic';
Module:     'module';

Wire:       'wire';
Pin:        'pin';
Add:        'add';
At:         'at';
To:         'to';
Point:      'point';
Join:       'join';
Parallel:   'parallel';

Return:     'return';
Define:     'def';
Import:     'import';

For:        'for';
In:         'in';
While:      'while';
Continue:   'continue';

If:         'if';
Else:       'else';
Not:        '!' | 'not';

Frame:      'frame';
Sheet:      'sheet';

Equals:             '==';
NotEquals:          '!=';
GreaterThan:        '>';
GreatOrEqualThan:   '>=';
LessThan:           '<';
LessOrEqualThan:    '<=';
LogicalAnd:         '&&' | 'and';
LogicalOr:          '||' | 'or';

Addition:   '+';
Minus:      '-';
Divide:     '/';
Multiply:   '*';
Modulus:    '%';

AdditionAssign:     '+=';
MinusAssign:        '-=';
DivideAssign:       '/=';
MultiplyAssign:     '*=';
ModulusAssign:      '%=';

script: (import_expr | NEWLINE)* (expression | NEWLINE)+ EOF;

// These expressions are related to circuit building only
expression: graph_expressions
        | assignment_expr
        | operator_assignment_expr
        | property_set_expr
        | property_set_expr2
        | double_dot_property_set_expr

        | function_def_expr
        | function_call_expr
        | import_expr
        | atom_expr
        | frame_expr
        | flow_expressions
        | annotation_comment_expr
        ;

// Changes flow of the program
flow_expressions: if_expr
                    | while_expr
                    | for_expr
                    | Break
                    | Continue
                    ;

// Adds nodes to the circuit graph
graph_expressions:  graph_linear_expression
                    | path_block
                    ;

graph_linear_expression: add_component_expr
                    | to_component_expr
                    | at_component_expr
                    | at_block
                    | wire_expr
                    | point_expr
                    ;


expressions_block:
	NEWLINE INDENT (NEWLINE | expression)+ DEDENT;

path_block:
	(Branch | Join | Parallel | Point) ':' expressions_block;


property_set_expr2:
	atom_expr ':' NEWLINE INDENT (NEWLINE | assignment_expr2)+ DEDENT;
assignment_expr2: (ID | INTEGER_VALUE) ':' value_expr;

pin_select_expr: Pin data_expr;
component_modifier_expr: ID ':' (value_expr | ID);

data_expr_with_assignment: (data_expr | assignment_expr) component_modifier_expr* pin_select_expr?;

add_component_expr: Add data_expr_with_assignment;

component_select_expr: data_expr_with_assignment | pin_select_expr | Point;

// This does not have the 'pin' word
pin_select_expr2: INTEGER_VALUE | STRING_VALUE;

at_component_expr:      At component_select_expr;                           // ID? is for orientation
// at_component_expr_next:   'at' component_select_expr (',' component_select_expr)*;

to_component_expr: To (component_select_expr (',' component_select_expr)*);   // ID? is for orientation
// pin_select_expr_next:   'pin' INTEGER_VALUE (',' INTEGER_VALUE)?;

at_to_multiple_expr: At component_select_expr To component_select_expr (',' component_select_expr)* ':' NEWLINE INDENT (NEWLINE | at_to_multiple_line_expr) + DEDENT;
at_to_multiple_line_expr: pin_select_expr2 ':' at_to_multiple_line_expr_to_pin (',' at_to_multiple_line_expr_to_pin)*;

at_to_multiple_line_expr_to_pin: (INTEGER_VALUE | NOT_CONNECTED);

at_block: at_block_header NEWLINE INDENT (NEWLINE | at_block_expressions) + DEDENT;
at_block_expressions: expression | at_block_pin_expr;

at_block_header: at_component_expr ':' annotation_comment_expr*;

// Expression to allow direct pin assignment
at_block_pin_expr: pin_select_expr2 ':' (at_block_pin_expression_simple | at_block_pin_expression_complex);

at_block_pin_expression_simple: (expression | NOT_CONNECTED);
at_block_pin_expression_complex: expressions_block;

assignment_expr:            (atom_expr | function_call_expr) '=' data_expr;
operator_assignment_expr:   atom_expr (AdditionAssign | MinusAssign | MultiplyAssign | DivideAssign | ModulusAssign) data_expr;

keyword_assignment_expr: ID '=' data_expr;

parameters: (data_expr (',' data_expr)* (',' keyword_assignment_expr)*)
            | (keyword_assignment_expr (',' keyword_assignment_expr)*);

property_set_expr: atom_expr '=' data_expr;
double_dot_property_set_expr: '..' ID '=' data_expr;

data_expr: 
    '(' data_expr ')'                                   #RoundedBracketsExpr
    | (value_expr | atom_expr)                          #ValueAtomExpr
    | unary_operator data_expr                          #UnaryOperatorExpr
    | data_expr (Multiply | Divide | Modulus) data_expr #MultiplyExpr
    | data_expr (Addition | Minus) data_expr            #AdditionExpr
    | data_expr binary_operator data_expr               #BinaryOperatorExpr
    | data_expr (LogicalAnd | LogicalOr) data_expr      #LogicalOperatorExpr
    | create_component_expr                             #DataExpr
    | create_graphic_expr                               #DataExpr
    | create_module_expr                                #DataExpr
    | function_call_expr                                #FunctionCallExpr
    | array_expr                                        #ArrayExpr
    | data_expr '[' data_expr ']'                       #ArrayIndexExpr
    ;           

binary_operator: Equals 
    | NotEquals
    | GreaterThan
    | GreatOrEqualThan
    | LessThan
    | LessOrEqualThan
    ;

unary_operator: Not | Minus;

value_expr: ('-'? 
    (NUMERIC_VALUE
    | DECIMAL_VALUE
    | INTEGER_VALUE
    | STRING_VALUE 
    | PERCENTAGE_VALUE
    | BOOLEAN_VALUE));

function_def_expr: Define ID '(' function_args_expr? ')' ':' NEWLINE INDENT (NEWLINE | function_expr)+ DEDENT;
function_expr: expression | function_return_expr;

function_args_expr: 
    ID (',' ID)* (',' ID '=' value_expr)*
    | ID '=' value_expr (',' ID '=' value_expr)*
    ;

atom_expr: ID trailer_expr2*;

trailer_expr: '(' parameters? ')' | trailer_expr2;

trailer_expr2: '.' ID
                | '[' data_expr ']';
        
function_call_expr: net_namespace_expr? ID trailer_expr+;

net_namespace_expr: '+'? '/' data_expr?;

function_return_expr: Return data_expr ;

property_block_expr: property_key_expr ':' expressions_block;

create_component_expr: Create Component ':' NEWLINE INDENT (NEWLINE | property_expr )+ DEDENT;

graphic_expressions_block:
    NEWLINE INDENT (NEWLINE | graphic_expr)+ DEDENT;

create_graphic_expr: Create Graphic ('(' ID ')')? ':' graphic_expressions_block;

create_module_expr: Create Module ':' NEWLINE INDENT (NEWLINE | property_expr | property_block_expr) + DEDENT;

// Remove the ':' in the future?
nested_properties_inner: (NEWLINE INDENT (NEWLINE | property_expr)+ DEDENT);
graphic_expr: command=(ID | Pin) ':'? (parameters | '(' parameters ')' | nested_properties_inner)  # GraphicCommandExpr
              | For ID (',' ID)* 'in' data_expr ':' graphic_expressions_block                      # GraphicForExpr
              ;

property_expr: property_key_expr ':' property_value_expr;
property_key_expr: ID | INTEGER_VALUE | STRING_VALUE;
property_value_expr: nested_properties_inner        # nested_properties
                    | data_expr (',' data_expr)*    # single_line_property
                    ;

wire_atom_expr: ID (INTEGER_VALUE | data_expr)     # wire_expr_direction_value
                | ID                               # wire_expr_direction_only
                ;    
wire_expr: Wire wire_atom_expr*;

array_expr: '[' (data_expr (',' data_expr)*)* ']';

point_expr: Point (ID | data_expr);
import_expr: Import ID;

frame_expr: (Frame | Sheet) ':' expressions_block;

if_expr:    If data_expr ':' 
                expressions_block
            if_inner_expr* else_expr?;

if_inner_expr: Else If data_expr ':' expressions_block;
else_expr: Else ':' expressions_block;

while_expr: While data_expr ':' expressions_block;
for_expr: For ID (',' ID)* 'in' data_expr ':' expressions_block;

ANNOTATION_START: '#=';
annotation_comment_expr: ANNOTATION_START ID;

OPEN_PAREN : '(' {this.openBrace();};
CLOSE_PAREN : ')' {this.closeBrace();};

// A place holder to indicate that a pin is not connected
NOT_CONNECTED: 'nc' | 'NC';

BOOLEAN_VALUE:  'true' | 'false';

ID: [_a-zA-Z][_a-zA-Z0-9]*;

// This value takes a number with an alphabet at the end to indicate 
// the multipler to the number

fragment DecimalIntegerLiteral
    : '0'
    | [1-9] [0-9_]*
    ;

INTEGER_VALUE: ([1-9]+ [0-9]*) | [0];
DECIMAL_VALUE: DecimalIntegerLiteral '.' [0-9][0-9_]*;
NUMERIC_VALUE: (INTEGER_VALUE | DECIMAL_VALUE) [GMKkmunpf]?;

STRING_VALUE: '"' (.)*? '"';
PERCENTAGE_VALUE: [1-9]+[0-9]* '%';
ALPHA_NUMERIC: [a-zA-Z0-9]+;

WS: [ \t]+ -> skip;

NEWLINE
 : ( '\r'? '\n' | '\r' | '\f' ) SPACES? {this.onNewLine();}
 ;

 fragment SPACES
 : [ \t]+
;

// Follow python's comment symbol for now
fragment COMMENT_FRAGMENT:
	'#' ~[=\r\n\f] ~[\r\n\f]* // Don't match #=
	| '#'; // Allow standalone #

COMMENT: (WS | COMMENT_FRAGMENT) -> channel(2);
