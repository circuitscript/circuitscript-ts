grammar CircuitScript;

// Generate with: antlr4 -Dlanguage=Python3 CircuitScript.g4 -no-listener -visitor
// Generate with: antlr4 -Dlanguage=TypeScript CircuitScript.g4 -no-listener -visitor

tokens { INDENT, DEDENT }

// Keywords
Break:      'break';
Branch:     'branch';
Create:     'create';
Component:  'component';
Wire:       'wire';
Pin:        'pin';
Add:        'add';
At:         'at';
To:         'to';
Point:      'point';

Return:     'return';
Define:     'def';
Import:     'import';

If:         'if';
Not:        '!';

Equals:     '==';
NotEquals:  '!=';
Addition:   '+';
Minus:      '-';
Divide:     '/';
Multiply:   '*';

script: (expression | NEWLINE)+ EOF;

// These expressions are related to circuit building only
expression: add_component_expr
        | at_to_multiple_expr
		| to_component_expr
        | at_component_expr
        | property_set_expr
        | property_set_expr2
        | double_dot_property_set_expr
        | break_keyword
        | function_def_expr
        | function_call_expr
        | assignment_expr
        | wire_expr
        | point_expr
        | import_expr

        | at_block
        | branch_blocks
        | style_expr
        | print_expr
        ;

branch_blocks: branch_block_inner+;
branch_block_inner:
	Branch ':' NEWLINE INDENT (NEWLINE | expression)+ DEDENT;

property_set_expr2:
	INSTANCE_NAME_WITH_PROPERTY ':' NEWLINE INDENT ( NEWLINE | assignment_expr2)+ DEDENT;
assignment_expr2: (ID | INTEGER_VALUE) ':' value_expr;

add_component_expr: Add data_expr pin_select_expr?;

component_select_expr: (data_expr pin_select_expr?) | pin_select_expr;
pin_select_expr:        Pin (INTEGER_VALUE | STRING_VALUE);
// This does not have the 'pin' word
pin_select_expr2: INTEGER_VALUE | STRING_VALUE;

at_component_expr:      At component_select_expr;
// at_component_expr_next:   'at' component_select_expr (',' component_select_expr)*;

to_component_expr: To component_select_expr (',' component_select_expr)*;
// pin_select_expr_next:   'pin' INTEGER_VALUE (',' INTEGER_VALUE)?;

at_to_multiple_expr: At component_select_expr To component_select_expr (',' component_select_expr)* ':' NEWLINE INDENT (NEWLINE | at_to_multiple_line_expr) + DEDENT;
at_to_multiple_line_expr: pin_select_expr2 ':' at_to_multiple_line_expr_to_pin (',' at_to_multiple_line_expr_to_pin)*;

at_to_multiple_line_expr_to_pin: (INTEGER_VALUE | NOT_CONNECTED);

at_block: at_component_expr ':' NEWLINE INDENT (NEWLINE | at_block_expressions) + DEDENT;
at_block_expressions: expression | at_block_pin_expr;

// Expression to allow direct pin assignment
at_block_pin_expr: pin_select_expr2 ':' (at_block_pin_expression_simple | at_block_pin_expression_complex);

at_block_pin_expression_simple: (expression | NOT_CONNECTED);
at_block_pin_expression_complex: NEWLINE INDENT ( NEWLINE | expression)+ DEDENT;

break_keyword: Break;

assignment_expr: ID '=' data_expr;
keyword_assignment_expr: ID '=' data_expr;

parameters: (data_expr (',' data_expr)* (',' keyword_assignment_expr)*)
            | (keyword_assignment_expr (',' keyword_assignment_expr)*);

property_set_expr: INSTANCE_NAME_WITH_PROPERTY '=' data_expr;
double_dot_property_set_expr: '..' ID '=' data_expr;

data_expr: data_expr (Multiply | Divide) data_expr      #MultiplyExpr
    | data_expr (Addition | Minus) data_expr            #AdditionExpr
    | ID                                                #DataExpr
    | function_call_expr                                #DataExpr
    | create_component_expr                             #DataExpr
    | assignment_expr                                   #DataExpr
    | data_expr binary_operator data_expr               #BinaryOperatorExpr
    | unary_operator data_expr                          #UnaryOperatorExpr
    | '(' data_expr ')'                                 #RoundedBracketsExpr
    | value_expr                                        #DataExpr
    ;           

binary_operator: Equals 
    | NotEquals
    ;

unary_operator: Not;

value_expr: NUMERIC_VALUE 
    | DECIMAL_VALUE 
    | INTEGER_VALUE 
    | STRING_VALUE 
    | PERCENTAGE_VALUE
    | BOOLEAN_VALUE 
    | blank_expr;

print_expr: 'print' '(' data_expr ')';

function_def_expr: Define ID '(' function_args_expr? ')' ':' NEWLINE INDENT (NEWLINE | function_expr)+ DEDENT;
function_expr: expression | function_return_expr;

function_args_expr: ID (',' ID)*;
function_call_expr: ID '(' parameters? ')';
function_return_expr: Return data_expr ;

create_component_expr: Create Component ':' NEWLINE INDENT (NEWLINE | property_expr)+ DEDENT;

property_expr: property_key_expr ':' property_value_expr;
property_key_expr: ID | INTEGER_VALUE | STRING_VALUE;
property_value_expr: NEWLINE INDENT (NEWLINE | property_expr)+ DEDENT     # nested_properties
                    | data_expr (',' data_expr)*                          # single_line_property
                    ;

rounded_brackets_expr: '(' ( expression | data_expr ) ')';

style_expr: '[' ID '=' value_expr (',' ID '=' value_expr)* ']';
blank_expr: '[' INTEGER_VALUE ']';

wire_expr: Wire ID (INTEGER_VALUE | ID)*;
point_expr: Point ID;

import_expr: Import ID;

OPEN_PAREN : '(' {this.openBrace();};
CLOSE_PAREN : ')' {this.closeBrace();};

// A place holder to indicate that a pin is not connected
NOT_CONNECTED: 'nc' | 'NC';

BOOLEAN_VALUE:  'true' | 'false';

ID: [_a-zA-Z][_a-zA-Z0-9]*;
INSTANCE_NAME_WITH_PROPERTY: ID '.' [a-zA-Z][a-zA-Z0-9_]+;

// This value takes a number with an alphabet at the end to indicate 
// the multipler to the number

fragment DecimalIntegerLiteral
    : '0'
    | [1-9] [0-9_]*
    ;

INTEGER_VALUE: ([-]? [1-9]+ [0-9]*) | [0];
DECIMAL_VALUE: DecimalIntegerLiteral '.' [0-9][0-9_]*;
NUMERIC_VALUE: (INTEGER_VALUE | DECIMAL_VALUE) [kmMunp]?;

STRING_VALUE: '"' (.)*? '"';
PERCENTAGE_VALUE: [1-9]+[0-9]* '%';
ALPHA_NUMERIC: [a-zA-Z0-9]+;

OPERATOR: '-'
        | '+'
        | '*'
        | '/';

WS: [ \t]+ -> skip;

NEWLINE
 : ( {this.atStartOfInput()}?   SPACES
   | ( '\r'? '\n' | '\r' | '\f' ) SPACES?
   )
   {this.onNewLine();}
 ;

 fragment SPACES
 : [ \t]+
 ;

// Follow python's comment symbol for now
fragment COMMENT: '#' ~[\r\n\f]*;

SKIP_: (WS | COMMENT) -> skip;
