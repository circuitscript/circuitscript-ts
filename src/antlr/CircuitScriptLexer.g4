/*
 * Copyright 2023 Liu Weihao
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

lexer grammar CircuitScriptLexer;

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
From:       'from';

For:        'for';
In:         'in';
While:      'while';
Continue:   'continue';

If:         'if';
Else:       'else';
Not:        '!' | 'not';

Frame:      'frame';
Sheet:      'sheet';
Set:        'set';

// Punctuation and operators
Colon:              ':';
Comma:              ',';
Dot:                '.';
DoubleDot:          '..';
LSquare:            '[';
RSquare:            ']';
Assign:             '=';

Equals:             '==';
NotEquals:          '!=';
GreaterThan:        '>';
GreatOrEqualThan:   '>=';
LessThan:           '<';
LessOrEqualThan:    '<=';
LogicalAnd:         '&&' | 'and';
LogicalOr:          '||' | 'or';

Addition:           '+';
Minus:              '-';
Divide:             '/';
Multiply:           '*';
Modulus:            '%';

AdditionAssign:     '+=';
MinusAssign:        '-=';
DivideAssign:       '/=';
MultiplyAssign:     '*=';
ModulusAssign:      '%=';


NEWLINE
 : ( '\r'? '\n' | '\r' | '\f' ) SPACES? {this.onNewLine();}
 ;
WS: [ \t]+ -> skip;

fragment SPACES
 : [ \t]+
;

// Follow python's comment symbol for now
fragment COMMENT_FRAGMENT:
	'#' ~[=\r\n\f] ~[\r\n\f]* // Don't match #=
	| '#'; // Allow standalone #

COMMENT: (WS | COMMENT_FRAGMENT) -> channel(2);

LParen : '(' {this.openBrace();};
RParen : ')' {this.closeBrace();};

// A place holder to indicate that a pin is not connected
NOT_CONNECTED: 'nc' | 'NC';
BOOLEAN_VALUE:  'true' | 'false';

ANNOTATION_START: '#=';

fragment DecimalIntegerLiteral: '0' | [1-9] [0-9_]*;
fragment DecimalLiteral: DecimalIntegerLiteral '.' [0-9][0-9_]*;

INTEGER_VALUE: DecimalIntegerLiteral;
DECIMAL_VALUE: DecimalLiteral;

// This value takes a number with an alphabet at the end to indicate
// the multipler to the number
NUMERIC_VALUE: (DecimalIntegerLiteral | DecimalLiteral) [GMKkmunpf];

PERCENTAGE_VALUE: [1-9][0-9]* '%';

STRING_VALUE: '"' (('\\' .) | ~["\\])* '"';

ID: [_a-zA-Z][_a-zA-Z0-9]*;