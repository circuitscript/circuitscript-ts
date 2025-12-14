// Generated from src/antlr/CircuitScript.g4 by ANTLR 4.13.1

import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { CircuitScriptVisitor } from "./CircuitScriptVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class CircuitScriptParser extends antlr.Parser {
    public static readonly T__0 = 1;
    public static readonly T__1 = 2;
    public static readonly T__2 = 3;
    public static readonly T__3 = 4;
    public static readonly T__4 = 5;
    public static readonly T__5 = 6;
    public static readonly T__6 = 7;
    public static readonly Break = 8;
    public static readonly Branch = 9;
    public static readonly Create = 10;
    public static readonly Component = 11;
    public static readonly Graphic = 12;
    public static readonly Module = 13;
    public static readonly Wire = 14;
    public static readonly Pin = 15;
    public static readonly Add = 16;
    public static readonly At = 17;
    public static readonly To = 18;
    public static readonly Point = 19;
    public static readonly Join = 20;
    public static readonly Parallel = 21;
    public static readonly Return = 22;
    public static readonly Define = 23;
    public static readonly Import = 24;
    public static readonly For = 25;
    public static readonly In = 26;
    public static readonly While = 27;
    public static readonly Continue = 28;
    public static readonly If = 29;
    public static readonly Else = 30;
    public static readonly Not = 31;
    public static readonly Frame = 32;
    public static readonly Sheet = 33;
    public static readonly Equals = 34;
    public static readonly NotEquals = 35;
    public static readonly GreaterThan = 36;
    public static readonly GreatOrEqualThan = 37;
    public static readonly LessThan = 38;
    public static readonly LessOrEqualThan = 39;
    public static readonly LogicalAnd = 40;
    public static readonly LogicalOr = 41;
    public static readonly Addition = 42;
    public static readonly Minus = 43;
    public static readonly Divide = 44;
    public static readonly Multiply = 45;
    public static readonly Modulus = 46;
    public static readonly AdditionAssign = 47;
    public static readonly MinusAssign = 48;
    public static readonly DivideAssign = 49;
    public static readonly MultiplyAssign = 50;
    public static readonly ModulusAssign = 51;
    public static readonly ANNOTATION_START = 52;
    public static readonly OPEN_PAREN = 53;
    public static readonly CLOSE_PAREN = 54;
    public static readonly NOT_CONNECTED = 55;
    public static readonly BOOLEAN_VALUE = 56;
    public static readonly ID = 57;
    public static readonly INTEGER_VALUE = 58;
    public static readonly DECIMAL_VALUE = 59;
    public static readonly NUMERIC_VALUE = 60;
    public static readonly STRING_VALUE = 61;
    public static readonly PERCENTAGE_VALUE = 62;
    public static readonly ALPHA_NUMERIC = 63;
    public static readonly WS = 64;
    public static readonly NEWLINE = 65;
    public static readonly COMMENT = 66;
    public static readonly INDENT = 67;
    public static readonly DEDENT = 68;
    public static readonly RULE_script = 0;
    public static readonly RULE_expression = 1;
    public static readonly RULE_flow_expressions = 2;
    public static readonly RULE_graph_expressions = 3;
    public static readonly RULE_graph_linear_expression = 4;
    public static readonly RULE_expressions_block = 5;
    public static readonly RULE_path_block = 6;
    public static readonly RULE_property_set_expr2 = 7;
    public static readonly RULE_assignment_expr2 = 8;
    public static readonly RULE_pin_select_expr = 9;
    public static readonly RULE_component_modifier_expr = 10;
    public static readonly RULE_data_expr_with_assignment = 11;
    public static readonly RULE_add_component_expr = 12;
    public static readonly RULE_component_select_expr = 13;
    public static readonly RULE_pin_select_expr2 = 14;
    public static readonly RULE_at_component_expr = 15;
    public static readonly RULE_to_component_expr = 16;
    public static readonly RULE_at_to_multiple_expr = 17;
    public static readonly RULE_at_to_multiple_line_expr = 18;
    public static readonly RULE_at_to_multiple_line_expr_to_pin = 19;
    public static readonly RULE_at_block = 20;
    public static readonly RULE_at_block_expressions = 21;
    public static readonly RULE_at_block_header = 22;
    public static readonly RULE_at_block_pin_expr = 23;
    public static readonly RULE_at_block_pin_expression_simple = 24;
    public static readonly RULE_at_block_pin_expression_complex = 25;
    public static readonly RULE_assignment_expr = 26;
    public static readonly RULE_operator_assignment_expr = 27;
    public static readonly RULE_keyword_assignment_expr = 28;
    public static readonly RULE_parameters = 29;
    public static readonly RULE_property_set_expr = 30;
    public static readonly RULE_double_dot_property_set_expr = 31;
    public static readonly RULE_data_expr = 32;
    public static readonly RULE_binary_operator = 33;
    public static readonly RULE_unary_operator = 34;
    public static readonly RULE_value_expr = 35;
    public static readonly RULE_function_def_expr = 36;
    public static readonly RULE_function_expr = 37;
    public static readonly RULE_function_args_expr = 38;
    public static readonly RULE_atom_expr = 39;
    public static readonly RULE_trailer_expr = 40;
    public static readonly RULE_trailer_expr2 = 41;
    public static readonly RULE_function_call_expr = 42;
    public static readonly RULE_net_namespace_expr = 43;
    public static readonly RULE_function_return_expr = 44;
    public static readonly RULE_property_block_expr = 45;
    public static readonly RULE_create_component_expr = 46;
    public static readonly RULE_graphic_expressions_block = 47;
    public static readonly RULE_create_graphic_expr = 48;
    public static readonly RULE_create_module_expr = 49;
    public static readonly RULE_nested_properties_inner = 50;
    public static readonly RULE_graphic_expr = 51;
    public static readonly RULE_property_expr = 52;
    public static readonly RULE_property_key_expr = 53;
    public static readonly RULE_property_value_expr = 54;
    public static readonly RULE_wire_atom_expr = 55;
    public static readonly RULE_wire_expr = 56;
    public static readonly RULE_array_expr = 57;
    public static readonly RULE_point_expr = 58;
    public static readonly RULE_import_expr = 59;
    public static readonly RULE_frame_expr = 60;
    public static readonly RULE_if_expr = 61;
    public static readonly RULE_if_inner_expr = 62;
    public static readonly RULE_else_expr = 63;
    public static readonly RULE_while_expr = 64;
    public static readonly RULE_for_expr = 65;
    public static readonly RULE_annotation_comment_expr = 66;

    public static readonly literalNames = [
        null, "':'", "','", "'='", "'..'", "'['", "']'", "'.'", "'break'", 
        "'branch'", "'create'", "'component'", "'graphic'", "'module'", 
        "'wire'", "'pin'", "'add'", "'at'", "'to'", "'point'", "'join'", 
        "'parallel'", "'return'", "'def'", "'import'", "'for'", "'in'", 
        "'while'", "'continue'", "'if'", "'else'", null, "'frame'", "'sheet'", 
        "'=='", "'!='", "'>'", "'>='", "'<'", "'<='", null, null, "'+'", 
        "'-'", "'/'", "'*'", "'%'", "'+='", "'-='", "'/='", "'*='", "'%='", 
        "'#='", "'('", "')'"
    ];

    public static readonly symbolicNames = [
        null, null, null, null, null, null, null, null, "Break", "Branch", 
        "Create", "Component", "Graphic", "Module", "Wire", "Pin", "Add", 
        "At", "To", "Point", "Join", "Parallel", "Return", "Define", "Import", 
        "For", "In", "While", "Continue", "If", "Else", "Not", "Frame", 
        "Sheet", "Equals", "NotEquals", "GreaterThan", "GreatOrEqualThan", 
        "LessThan", "LessOrEqualThan", "LogicalAnd", "LogicalOr", "Addition", 
        "Minus", "Divide", "Multiply", "Modulus", "AdditionAssign", "MinusAssign", 
        "DivideAssign", "MultiplyAssign", "ModulusAssign", "ANNOTATION_START", 
        "OPEN_PAREN", "CLOSE_PAREN", "NOT_CONNECTED", "BOOLEAN_VALUE", "ID", 
        "INTEGER_VALUE", "DECIMAL_VALUE", "NUMERIC_VALUE", "STRING_VALUE", 
        "PERCENTAGE_VALUE", "ALPHA_NUMERIC", "WS", "NEWLINE", "COMMENT", 
        "INDENT", "DEDENT"
    ];
    public static readonly ruleNames = [
        "script", "expression", "flow_expressions", "graph_expressions", 
        "graph_linear_expression", "expressions_block", "path_block", "property_set_expr2", 
        "assignment_expr2", "pin_select_expr", "component_modifier_expr", 
        "data_expr_with_assignment", "add_component_expr", "component_select_expr", 
        "pin_select_expr2", "at_component_expr", "to_component_expr", "at_to_multiple_expr", 
        "at_to_multiple_line_expr", "at_to_multiple_line_expr_to_pin", "at_block", 
        "at_block_expressions", "at_block_header", "at_block_pin_expr", 
        "at_block_pin_expression_simple", "at_block_pin_expression_complex", 
        "assignment_expr", "operator_assignment_expr", "keyword_assignment_expr", 
        "parameters", "property_set_expr", "double_dot_property_set_expr", 
        "data_expr", "binary_operator", "unary_operator", "value_expr", 
        "function_def_expr", "function_expr", "function_args_expr", "atom_expr", 
        "trailer_expr", "trailer_expr2", "function_call_expr", "net_namespace_expr", 
        "function_return_expr", "property_block_expr", "create_component_expr", 
        "graphic_expressions_block", "create_graphic_expr", "create_module_expr", 
        "nested_properties_inner", "graphic_expr", "property_expr", "property_key_expr", 
        "property_value_expr", "wire_atom_expr", "wire_expr", "array_expr", 
        "point_expr", "import_expr", "frame_expr", "if_expr", "if_inner_expr", 
        "else_expr", "while_expr", "for_expr", "annotation_comment_expr",
    ];

    public get grammarFileName(): string { return "CircuitScript.g4"; }
    public get literalNames(): (string | null)[] { return CircuitScriptParser.literalNames; }
    public get symbolicNames(): (string | null)[] { return CircuitScriptParser.symbolicNames; }
    public get ruleNames(): string[] { return CircuitScriptParser.ruleNames; }
    public get serializedATN(): number[] { return CircuitScriptParser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, CircuitScriptParser._ATN, CircuitScriptParser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public script(): ScriptContext {
        let localContext = new ScriptContext(this.context, this.state);
        this.enterRule(localContext, 0, CircuitScriptParser.RULE_script);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 138;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 1, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    this.state = 136;
                    this.errorHandler.sync(this);
                    switch (this.tokenStream.LA(1)) {
                    case CircuitScriptParser.Import:
                        {
                        this.state = 134;
                        this.import_expr();
                        }
                        break;
                    case CircuitScriptParser.NEWLINE:
                        {
                        this.state = 135;
                        this.match(CircuitScriptParser.NEWLINE);
                        }
                        break;
                    default:
                        throw new antlr.NoViableAltException(this);
                    }
                    }
                }
                this.state = 140;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 1, this.context);
            }
            this.state = 143;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 143;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.T__3:
                case CircuitScriptParser.Break:
                case CircuitScriptParser.Branch:
                case CircuitScriptParser.Wire:
                case CircuitScriptParser.Add:
                case CircuitScriptParser.At:
                case CircuitScriptParser.To:
                case CircuitScriptParser.Point:
                case CircuitScriptParser.Join:
                case CircuitScriptParser.Parallel:
                case CircuitScriptParser.Define:
                case CircuitScriptParser.Import:
                case CircuitScriptParser.For:
                case CircuitScriptParser.While:
                case CircuitScriptParser.Continue:
                case CircuitScriptParser.If:
                case CircuitScriptParser.Frame:
                case CircuitScriptParser.Sheet:
                case CircuitScriptParser.Addition:
                case CircuitScriptParser.Divide:
                case CircuitScriptParser.ANNOTATION_START:
                case CircuitScriptParser.ID:
                    {
                    this.state = 141;
                    this.expression();
                    }
                    break;
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 142;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 145;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 4)) & ~0x1F) === 0 && ((1 << (_la - 4)) & 867955761) !== 0) || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 8422405) !== 0));
            this.state = 147;
            this.match(CircuitScriptParser.EOF);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public expression(): ExpressionContext {
        let localContext = new ExpressionContext(this.context, this.state);
        this.enterRule(localContext, 2, CircuitScriptParser.RULE_expression);
        try {
            this.state = 162;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 4, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 149;
                this.graph_expressions();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 150;
                this.assignment_expr();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 151;
                this.operator_assignment_expr();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 152;
                this.property_set_expr();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 153;
                this.property_set_expr2();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 154;
                this.double_dot_property_set_expr();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 155;
                this.function_def_expr();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 156;
                this.function_call_expr();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 157;
                this.import_expr();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 158;
                this.atom_expr();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 159;
                this.frame_expr();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 160;
                this.flow_expressions();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 161;
                this.annotation_comment_expr();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public flow_expressions(): Flow_expressionsContext {
        let localContext = new Flow_expressionsContext(this.context, this.state);
        this.enterRule(localContext, 4, CircuitScriptParser.RULE_flow_expressions);
        try {
            this.state = 169;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.If:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 164;
                this.if_expr();
                }
                break;
            case CircuitScriptParser.While:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 165;
                this.while_expr();
                }
                break;
            case CircuitScriptParser.For:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 166;
                this.for_expr();
                }
                break;
            case CircuitScriptParser.Break:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 167;
                this.match(CircuitScriptParser.Break);
                }
                break;
            case CircuitScriptParser.Continue:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 168;
                this.match(CircuitScriptParser.Continue);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public graph_expressions(): Graph_expressionsContext {
        let localContext = new Graph_expressionsContext(this.context, this.state);
        this.enterRule(localContext, 6, CircuitScriptParser.RULE_graph_expressions);
        try {
            this.state = 173;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 6, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 171;
                this.graph_linear_expression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 172;
                this.path_block();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public graph_linear_expression(): Graph_linear_expressionContext {
        let localContext = new Graph_linear_expressionContext(this.context, this.state);
        this.enterRule(localContext, 8, CircuitScriptParser.RULE_graph_linear_expression);
        try {
            this.state = 181;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 7, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 175;
                this.add_component_expr();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 176;
                this.to_component_expr();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 177;
                this.at_component_expr();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 178;
                this.at_block();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 179;
                this.wire_expr();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 180;
                this.point_expr();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public expressions_block(): Expressions_blockContext {
        let localContext = new Expressions_blockContext(this.context, this.state);
        this.enterRule(localContext, 10, CircuitScriptParser.RULE_expressions_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 183;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 184;
            this.match(CircuitScriptParser.INDENT);
            this.state = 187;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 187;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 185;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case CircuitScriptParser.T__3:
                case CircuitScriptParser.Break:
                case CircuitScriptParser.Branch:
                case CircuitScriptParser.Wire:
                case CircuitScriptParser.Add:
                case CircuitScriptParser.At:
                case CircuitScriptParser.To:
                case CircuitScriptParser.Point:
                case CircuitScriptParser.Join:
                case CircuitScriptParser.Parallel:
                case CircuitScriptParser.Define:
                case CircuitScriptParser.Import:
                case CircuitScriptParser.For:
                case CircuitScriptParser.While:
                case CircuitScriptParser.Continue:
                case CircuitScriptParser.If:
                case CircuitScriptParser.Frame:
                case CircuitScriptParser.Sheet:
                case CircuitScriptParser.Addition:
                case CircuitScriptParser.Divide:
                case CircuitScriptParser.ANNOTATION_START:
                case CircuitScriptParser.ID:
                    {
                    this.state = 186;
                    this.expression();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 189;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 4)) & ~0x1F) === 0 && ((1 << (_la - 4)) & 867955761) !== 0) || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 8422405) !== 0));
            this.state = 191;
            this.match(CircuitScriptParser.DEDENT);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public path_block(): Path_blockContext {
        let localContext = new Path_blockContext(this.context, this.state);
        this.enterRule(localContext, 12, CircuitScriptParser.RULE_path_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 193;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 3670528) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 194;
            this.match(CircuitScriptParser.T__0);
            this.state = 195;
            this.expressions_block();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public property_set_expr2(): Property_set_expr2Context {
        let localContext = new Property_set_expr2Context(this.context, this.state);
        this.enterRule(localContext, 14, CircuitScriptParser.RULE_property_set_expr2);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 197;
            this.atom_expr();
            this.state = 198;
            this.match(CircuitScriptParser.T__0);
            this.state = 199;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 200;
            this.match(CircuitScriptParser.INDENT);
            this.state = 203;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 203;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 201;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case CircuitScriptParser.ID:
                case CircuitScriptParser.INTEGER_VALUE:
                    {
                    this.state = 202;
                    this.assignment_expr2();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 205;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 259) !== 0));
            this.state = 207;
            this.match(CircuitScriptParser.DEDENT);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public assignment_expr2(): Assignment_expr2Context {
        let localContext = new Assignment_expr2Context(this.context, this.state);
        this.enterRule(localContext, 16, CircuitScriptParser.RULE_assignment_expr2);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 209;
            _la = this.tokenStream.LA(1);
            if(!(_la === 57 || _la === 58)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 210;
            this.match(CircuitScriptParser.T__0);
            this.state = 211;
            this.value_expr();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public pin_select_expr(): Pin_select_exprContext {
        let localContext = new Pin_select_exprContext(this.context, this.state);
        this.enterRule(localContext, 18, CircuitScriptParser.RULE_pin_select_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 213;
            this.match(CircuitScriptParser.Pin);
            this.state = 214;
            this.data_expr(0);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public component_modifier_expr(): Component_modifier_exprContext {
        let localContext = new Component_modifier_exprContext(this.context, this.state);
        this.enterRule(localContext, 20, CircuitScriptParser.RULE_component_modifier_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 216;
            this.match(CircuitScriptParser.ID);
            this.state = 217;
            this.match(CircuitScriptParser.T__0);
            this.state = 220;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.Minus:
            case CircuitScriptParser.BOOLEAN_VALUE:
            case CircuitScriptParser.INTEGER_VALUE:
            case CircuitScriptParser.DECIMAL_VALUE:
            case CircuitScriptParser.NUMERIC_VALUE:
            case CircuitScriptParser.STRING_VALUE:
            case CircuitScriptParser.PERCENTAGE_VALUE:
                {
                this.state = 218;
                this.value_expr();
                }
                break;
            case CircuitScriptParser.ID:
                {
                this.state = 219;
                this.match(CircuitScriptParser.ID);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public data_expr_with_assignment(): Data_expr_with_assignmentContext {
        let localContext = new Data_expr_with_assignmentContext(this.context, this.state);
        this.enterRule(localContext, 22, CircuitScriptParser.RULE_data_expr_with_assignment);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 224;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 13, this.context) ) {
            case 1:
                {
                this.state = 222;
                this.data_expr(0);
                }
                break;
            case 2:
                {
                this.state = 223;
                this.assignment_expr();
                }
                break;
            }
            this.state = 229;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 14, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 226;
                    this.component_modifier_expr();
                    }
                    }
                }
                this.state = 231;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 14, this.context);
            }
            this.state = 233;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 15) {
                {
                this.state = 232;
                this.pin_select_expr();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public add_component_expr(): Add_component_exprContext {
        let localContext = new Add_component_exprContext(this.context, this.state);
        this.enterRule(localContext, 24, CircuitScriptParser.RULE_add_component_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 235;
            this.match(CircuitScriptParser.Add);
            this.state = 236;
            this.data_expr_with_assignment();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public component_select_expr(): Component_select_exprContext {
        let localContext = new Component_select_exprContext(this.context, this.state);
        this.enterRule(localContext, 26, CircuitScriptParser.RULE_component_select_expr);
        try {
            this.state = 241;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.T__4:
            case CircuitScriptParser.Create:
            case CircuitScriptParser.Not:
            case CircuitScriptParser.Addition:
            case CircuitScriptParser.Minus:
            case CircuitScriptParser.Divide:
            case CircuitScriptParser.OPEN_PAREN:
            case CircuitScriptParser.BOOLEAN_VALUE:
            case CircuitScriptParser.ID:
            case CircuitScriptParser.INTEGER_VALUE:
            case CircuitScriptParser.DECIMAL_VALUE:
            case CircuitScriptParser.NUMERIC_VALUE:
            case CircuitScriptParser.STRING_VALUE:
            case CircuitScriptParser.PERCENTAGE_VALUE:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 238;
                this.data_expr_with_assignment();
                }
                break;
            case CircuitScriptParser.Pin:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 239;
                this.pin_select_expr();
                }
                break;
            case CircuitScriptParser.Point:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 240;
                this.match(CircuitScriptParser.Point);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public pin_select_expr2(): Pin_select_expr2Context {
        let localContext = new Pin_select_expr2Context(this.context, this.state);
        this.enterRule(localContext, 28, CircuitScriptParser.RULE_pin_select_expr2);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 243;
            _la = this.tokenStream.LA(1);
            if(!(_la === 58 || _la === 61)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public at_component_expr(): At_component_exprContext {
        let localContext = new At_component_exprContext(this.context, this.state);
        this.enterRule(localContext, 30, CircuitScriptParser.RULE_at_component_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 245;
            this.match(CircuitScriptParser.At);
            this.state = 246;
            this.component_select_expr();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public to_component_expr(): To_component_exprContext {
        let localContext = new To_component_exprContext(this.context, this.state);
        this.enterRule(localContext, 32, CircuitScriptParser.RULE_to_component_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 248;
            this.match(CircuitScriptParser.To);
            {
            this.state = 249;
            this.component_select_expr();
            this.state = 254;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 250;
                this.match(CircuitScriptParser.T__1);
                this.state = 251;
                this.component_select_expr();
                }
                }
                this.state = 256;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public at_to_multiple_expr(): At_to_multiple_exprContext {
        let localContext = new At_to_multiple_exprContext(this.context, this.state);
        this.enterRule(localContext, 34, CircuitScriptParser.RULE_at_to_multiple_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 257;
            this.match(CircuitScriptParser.At);
            this.state = 258;
            this.component_select_expr();
            this.state = 259;
            this.match(CircuitScriptParser.To);
            this.state = 260;
            this.component_select_expr();
            this.state = 265;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 261;
                this.match(CircuitScriptParser.T__1);
                this.state = 262;
                this.component_select_expr();
                }
                }
                this.state = 267;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 268;
            this.match(CircuitScriptParser.T__0);
            this.state = 269;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 270;
            this.match(CircuitScriptParser.INDENT);
            this.state = 273;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 273;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 271;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case CircuitScriptParser.INTEGER_VALUE:
                case CircuitScriptParser.STRING_VALUE:
                    {
                    this.state = 272;
                    this.at_to_multiple_line_expr();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 275;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 137) !== 0));
            this.state = 277;
            this.match(CircuitScriptParser.DEDENT);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public at_to_multiple_line_expr(): At_to_multiple_line_exprContext {
        let localContext = new At_to_multiple_line_exprContext(this.context, this.state);
        this.enterRule(localContext, 36, CircuitScriptParser.RULE_at_to_multiple_line_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 279;
            this.pin_select_expr2();
            this.state = 280;
            this.match(CircuitScriptParser.T__0);
            this.state = 281;
            this.at_to_multiple_line_expr_to_pin();
            this.state = 286;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 282;
                this.match(CircuitScriptParser.T__1);
                this.state = 283;
                this.at_to_multiple_line_expr_to_pin();
                }
                }
                this.state = 288;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public at_to_multiple_line_expr_to_pin(): At_to_multiple_line_expr_to_pinContext {
        let localContext = new At_to_multiple_line_expr_to_pinContext(this.context, this.state);
        this.enterRule(localContext, 38, CircuitScriptParser.RULE_at_to_multiple_line_expr_to_pin);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 289;
            _la = this.tokenStream.LA(1);
            if(!(_la === 55 || _la === 58)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public at_block(): At_blockContext {
        let localContext = new At_blockContext(this.context, this.state);
        this.enterRule(localContext, 40, CircuitScriptParser.RULE_at_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 291;
            this.at_block_header();
            this.state = 292;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 293;
            this.match(CircuitScriptParser.INDENT);
            this.state = 296;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 296;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 294;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case CircuitScriptParser.T__3:
                case CircuitScriptParser.Break:
                case CircuitScriptParser.Branch:
                case CircuitScriptParser.Wire:
                case CircuitScriptParser.Add:
                case CircuitScriptParser.At:
                case CircuitScriptParser.To:
                case CircuitScriptParser.Point:
                case CircuitScriptParser.Join:
                case CircuitScriptParser.Parallel:
                case CircuitScriptParser.Define:
                case CircuitScriptParser.Import:
                case CircuitScriptParser.For:
                case CircuitScriptParser.While:
                case CircuitScriptParser.Continue:
                case CircuitScriptParser.If:
                case CircuitScriptParser.Frame:
                case CircuitScriptParser.Sheet:
                case CircuitScriptParser.Addition:
                case CircuitScriptParser.Divide:
                case CircuitScriptParser.ANNOTATION_START:
                case CircuitScriptParser.ID:
                case CircuitScriptParser.INTEGER_VALUE:
                case CircuitScriptParser.STRING_VALUE:
                    {
                    this.state = 295;
                    this.at_block_expressions();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 298;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 4)) & ~0x1F) === 0 && ((1 << (_la - 4)) & 867955761) !== 0) || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 9012229) !== 0));
            this.state = 300;
            this.match(CircuitScriptParser.DEDENT);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public at_block_expressions(): At_block_expressionsContext {
        let localContext = new At_block_expressionsContext(this.context, this.state);
        this.enterRule(localContext, 42, CircuitScriptParser.RULE_at_block_expressions);
        try {
            this.state = 304;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.T__3:
            case CircuitScriptParser.Break:
            case CircuitScriptParser.Branch:
            case CircuitScriptParser.Wire:
            case CircuitScriptParser.Add:
            case CircuitScriptParser.At:
            case CircuitScriptParser.To:
            case CircuitScriptParser.Point:
            case CircuitScriptParser.Join:
            case CircuitScriptParser.Parallel:
            case CircuitScriptParser.Define:
            case CircuitScriptParser.Import:
            case CircuitScriptParser.For:
            case CircuitScriptParser.While:
            case CircuitScriptParser.Continue:
            case CircuitScriptParser.If:
            case CircuitScriptParser.Frame:
            case CircuitScriptParser.Sheet:
            case CircuitScriptParser.Addition:
            case CircuitScriptParser.Divide:
            case CircuitScriptParser.ANNOTATION_START:
            case CircuitScriptParser.ID:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 302;
                this.expression();
                }
                break;
            case CircuitScriptParser.INTEGER_VALUE:
            case CircuitScriptParser.STRING_VALUE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 303;
                this.at_block_pin_expr();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public at_block_header(): At_block_headerContext {
        let localContext = new At_block_headerContext(this.context, this.state);
        this.enterRule(localContext, 44, CircuitScriptParser.RULE_at_block_header);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 306;
            this.at_component_expr();
            this.state = 307;
            this.match(CircuitScriptParser.T__0);
            this.state = 309;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 52) {
                {
                this.state = 308;
                this.annotation_comment_expr();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public at_block_pin_expr(): At_block_pin_exprContext {
        let localContext = new At_block_pin_exprContext(this.context, this.state);
        this.enterRule(localContext, 46, CircuitScriptParser.RULE_at_block_pin_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 311;
            this.pin_select_expr2();
            this.state = 312;
            this.match(CircuitScriptParser.T__0);
            this.state = 315;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.T__3:
            case CircuitScriptParser.Break:
            case CircuitScriptParser.Branch:
            case CircuitScriptParser.Wire:
            case CircuitScriptParser.Add:
            case CircuitScriptParser.At:
            case CircuitScriptParser.To:
            case CircuitScriptParser.Point:
            case CircuitScriptParser.Join:
            case CircuitScriptParser.Parallel:
            case CircuitScriptParser.Define:
            case CircuitScriptParser.Import:
            case CircuitScriptParser.For:
            case CircuitScriptParser.While:
            case CircuitScriptParser.Continue:
            case CircuitScriptParser.If:
            case CircuitScriptParser.Frame:
            case CircuitScriptParser.Sheet:
            case CircuitScriptParser.Addition:
            case CircuitScriptParser.Divide:
            case CircuitScriptParser.ANNOTATION_START:
            case CircuitScriptParser.NOT_CONNECTED:
            case CircuitScriptParser.ID:
                {
                this.state = 313;
                this.at_block_pin_expression_simple();
                }
                break;
            case CircuitScriptParser.NEWLINE:
                {
                this.state = 314;
                this.at_block_pin_expression_complex();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public at_block_pin_expression_simple(): At_block_pin_expression_simpleContext {
        let localContext = new At_block_pin_expression_simpleContext(this.context, this.state);
        this.enterRule(localContext, 48, CircuitScriptParser.RULE_at_block_pin_expression_simple);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 319;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.T__3:
            case CircuitScriptParser.Break:
            case CircuitScriptParser.Branch:
            case CircuitScriptParser.Wire:
            case CircuitScriptParser.Add:
            case CircuitScriptParser.At:
            case CircuitScriptParser.To:
            case CircuitScriptParser.Point:
            case CircuitScriptParser.Join:
            case CircuitScriptParser.Parallel:
            case CircuitScriptParser.Define:
            case CircuitScriptParser.Import:
            case CircuitScriptParser.For:
            case CircuitScriptParser.While:
            case CircuitScriptParser.Continue:
            case CircuitScriptParser.If:
            case CircuitScriptParser.Frame:
            case CircuitScriptParser.Sheet:
            case CircuitScriptParser.Addition:
            case CircuitScriptParser.Divide:
            case CircuitScriptParser.ANNOTATION_START:
            case CircuitScriptParser.ID:
                {
                this.state = 317;
                this.expression();
                }
                break;
            case CircuitScriptParser.NOT_CONNECTED:
                {
                this.state = 318;
                this.match(CircuitScriptParser.NOT_CONNECTED);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public at_block_pin_expression_complex(): At_block_pin_expression_complexContext {
        let localContext = new At_block_pin_expression_complexContext(this.context, this.state);
        this.enterRule(localContext, 50, CircuitScriptParser.RULE_at_block_pin_expression_complex);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 321;
            this.expressions_block();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public assignment_expr(): Assignment_exprContext {
        let localContext = new Assignment_exprContext(this.context, this.state);
        this.enterRule(localContext, 52, CircuitScriptParser.RULE_assignment_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 325;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 28, this.context) ) {
            case 1:
                {
                this.state = 323;
                this.atom_expr();
                }
                break;
            case 2:
                {
                this.state = 324;
                this.function_call_expr();
                }
                break;
            }
            this.state = 327;
            this.match(CircuitScriptParser.T__2);
            this.state = 328;
            this.data_expr(0);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public operator_assignment_expr(): Operator_assignment_exprContext {
        let localContext = new Operator_assignment_exprContext(this.context, this.state);
        this.enterRule(localContext, 54, CircuitScriptParser.RULE_operator_assignment_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 330;
            this.atom_expr();
            this.state = 331;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 47)) & ~0x1F) === 0 && ((1 << (_la - 47)) & 31) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 332;
            this.data_expr(0);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public keyword_assignment_expr(): Keyword_assignment_exprContext {
        let localContext = new Keyword_assignment_exprContext(this.context, this.state);
        this.enterRule(localContext, 56, CircuitScriptParser.RULE_keyword_assignment_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 334;
            this.match(CircuitScriptParser.ID);
            this.state = 335;
            this.match(CircuitScriptParser.T__2);
            this.state = 336;
            this.data_expr(0);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public parameters(): ParametersContext {
        let localContext = new ParametersContext(this.context, this.state);
        this.enterRule(localContext, 58, CircuitScriptParser.RULE_parameters);
        let _la: number;
        try {
            let alternative: number;
            this.state = 361;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 32, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                {
                this.state = 338;
                this.data_expr(0);
                this.state = 343;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 29, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 339;
                        this.match(CircuitScriptParser.T__1);
                        this.state = 340;
                        this.data_expr(0);
                        }
                        }
                    }
                    this.state = 345;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 29, this.context);
                }
                this.state = 350;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                    {
                    {
                    this.state = 346;
                    this.match(CircuitScriptParser.T__1);
                    this.state = 347;
                    this.keyword_assignment_expr();
                    }
                    }
                    this.state = 352;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                {
                this.state = 353;
                this.keyword_assignment_expr();
                this.state = 358;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                    {
                    {
                    this.state = 354;
                    this.match(CircuitScriptParser.T__1);
                    this.state = 355;
                    this.keyword_assignment_expr();
                    }
                    }
                    this.state = 360;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public property_set_expr(): Property_set_exprContext {
        let localContext = new Property_set_exprContext(this.context, this.state);
        this.enterRule(localContext, 60, CircuitScriptParser.RULE_property_set_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 363;
            this.atom_expr();
            this.state = 364;
            this.match(CircuitScriptParser.T__2);
            this.state = 365;
            this.data_expr(0);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public double_dot_property_set_expr(): Double_dot_property_set_exprContext {
        let localContext = new Double_dot_property_set_exprContext(this.context, this.state);
        this.enterRule(localContext, 62, CircuitScriptParser.RULE_double_dot_property_set_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 367;
            this.match(CircuitScriptParser.T__3);
            this.state = 368;
            this.match(CircuitScriptParser.ID);
            this.state = 369;
            this.match(CircuitScriptParser.T__2);
            this.state = 370;
            this.data_expr(0);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public data_expr(): Data_exprContext;
    public data_expr(_p: number): Data_exprContext;
    public data_expr(_p?: number): Data_exprContext {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new Data_exprContext(this.context, parentState);
        let previousContext = localContext;
        let _startState = 64;
        this.enterRecursionRule(localContext, 64, CircuitScriptParser.RULE_data_expr, _p);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 389;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 34, this.context) ) {
            case 1:
                {
                localContext = new RoundedBracketsExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;

                this.state = 373;
                this.match(CircuitScriptParser.OPEN_PAREN);
                this.state = 374;
                this.data_expr(0);
                this.state = 375;
                this.match(CircuitScriptParser.CLOSE_PAREN);
                }
                break;
            case 2:
                {
                localContext = new ValueAtomExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 379;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.Minus:
                case CircuitScriptParser.BOOLEAN_VALUE:
                case CircuitScriptParser.INTEGER_VALUE:
                case CircuitScriptParser.DECIMAL_VALUE:
                case CircuitScriptParser.NUMERIC_VALUE:
                case CircuitScriptParser.STRING_VALUE:
                case CircuitScriptParser.PERCENTAGE_VALUE:
                    {
                    this.state = 377;
                    this.value_expr();
                    }
                    break;
                case CircuitScriptParser.ID:
                    {
                    this.state = 378;
                    this.atom_expr();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                break;
            case 3:
                {
                localContext = new UnaryOperatorExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 381;
                this.unary_operator();
                this.state = 382;
                this.data_expr(11);
                }
                break;
            case 4:
                {
                localContext = new DataExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 384;
                this.create_component_expr();
                }
                break;
            case 5:
                {
                localContext = new DataExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 385;
                this.create_graphic_expr();
                }
                break;
            case 6:
                {
                localContext = new DataExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 386;
                this.create_module_expr();
                }
                break;
            case 7:
                {
                localContext = new FunctionCallExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 387;
                this.function_call_expr();
                }
                break;
            case 8:
                {
                localContext = new ArrayExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 388;
                this.array_expr();
                }
                break;
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 411;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 36, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 409;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 35, this.context) ) {
                    case 1:
                        {
                        localContext = new MultiplyExprContext(new Data_exprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CircuitScriptParser.RULE_data_expr);
                        this.state = 391;
                        if (!(this.precpred(this.context, 10))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 10)");
                        }
                        this.state = 392;
                        _la = this.tokenStream.LA(1);
                        if(!(((((_la - 44)) & ~0x1F) === 0 && ((1 << (_la - 44)) & 7) !== 0))) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 393;
                        this.data_expr(11);
                        }
                        break;
                    case 2:
                        {
                        localContext = new AdditionExprContext(new Data_exprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CircuitScriptParser.RULE_data_expr);
                        this.state = 394;
                        if (!(this.precpred(this.context, 9))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 9)");
                        }
                        this.state = 395;
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 42 || _la === 43)) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 396;
                        this.data_expr(10);
                        }
                        break;
                    case 3:
                        {
                        localContext = new BinaryOperatorExprContext(new Data_exprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CircuitScriptParser.RULE_data_expr);
                        this.state = 397;
                        if (!(this.precpred(this.context, 8))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 8)");
                        }
                        this.state = 398;
                        this.binary_operator();
                        this.state = 399;
                        this.data_expr(9);
                        }
                        break;
                    case 4:
                        {
                        localContext = new LogicalOperatorExprContext(new Data_exprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CircuitScriptParser.RULE_data_expr);
                        this.state = 401;
                        if (!(this.precpred(this.context, 7))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 7)");
                        }
                        this.state = 402;
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 40 || _la === 41)) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 403;
                        this.data_expr(8);
                        }
                        break;
                    case 5:
                        {
                        localContext = new ArrayIndexExprContext(new Data_exprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CircuitScriptParser.RULE_data_expr);
                        this.state = 404;
                        if (!(this.precpred(this.context, 1))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                        }
                        this.state = 405;
                        this.match(CircuitScriptParser.T__4);
                        this.state = 406;
                        this.data_expr(0);
                        this.state = 407;
                        this.match(CircuitScriptParser.T__5);
                        }
                        break;
                    }
                    }
                }
                this.state = 413;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 36, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }
    public binary_operator(): Binary_operatorContext {
        let localContext = new Binary_operatorContext(this.context, this.state);
        this.enterRule(localContext, 66, CircuitScriptParser.RULE_binary_operator);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 414;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & 63) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public unary_operator(): Unary_operatorContext {
        let localContext = new Unary_operatorContext(this.context, this.state);
        this.enterRule(localContext, 68, CircuitScriptParser.RULE_unary_operator);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 416;
            _la = this.tokenStream.LA(1);
            if(!(_la === 31 || _la === 43)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public value_expr(): Value_exprContext {
        let localContext = new Value_exprContext(this.context, this.state);
        this.enterRule(localContext, 70, CircuitScriptParser.RULE_value_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            {
            this.state = 419;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 43) {
                {
                this.state = 418;
                this.match(CircuitScriptParser.Minus);
                }
            }

            this.state = 421;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 125) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public function_def_expr(): Function_def_exprContext {
        let localContext = new Function_def_exprContext(this.context, this.state);
        this.enterRule(localContext, 72, CircuitScriptParser.RULE_function_def_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 423;
            this.match(CircuitScriptParser.Define);
            this.state = 424;
            this.match(CircuitScriptParser.ID);
            this.state = 425;
            this.match(CircuitScriptParser.OPEN_PAREN);
            this.state = 427;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 57) {
                {
                this.state = 426;
                this.function_args_expr();
                }
            }

            this.state = 429;
            this.match(CircuitScriptParser.CLOSE_PAREN);
            this.state = 430;
            this.match(CircuitScriptParser.T__0);
            this.state = 431;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 432;
            this.match(CircuitScriptParser.INDENT);
            this.state = 435;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 435;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 433;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case CircuitScriptParser.T__3:
                case CircuitScriptParser.Break:
                case CircuitScriptParser.Branch:
                case CircuitScriptParser.Wire:
                case CircuitScriptParser.Add:
                case CircuitScriptParser.At:
                case CircuitScriptParser.To:
                case CircuitScriptParser.Point:
                case CircuitScriptParser.Join:
                case CircuitScriptParser.Parallel:
                case CircuitScriptParser.Return:
                case CircuitScriptParser.Define:
                case CircuitScriptParser.Import:
                case CircuitScriptParser.For:
                case CircuitScriptParser.While:
                case CircuitScriptParser.Continue:
                case CircuitScriptParser.If:
                case CircuitScriptParser.Frame:
                case CircuitScriptParser.Sheet:
                case CircuitScriptParser.Addition:
                case CircuitScriptParser.Divide:
                case CircuitScriptParser.ANNOTATION_START:
                case CircuitScriptParser.ID:
                    {
                    this.state = 434;
                    this.function_expr();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 437;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 4)) & ~0x1F) === 0 && ((1 << (_la - 4)) & 868217905) !== 0) || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 8422405) !== 0));
            this.state = 439;
            this.match(CircuitScriptParser.DEDENT);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public function_expr(): Function_exprContext {
        let localContext = new Function_exprContext(this.context, this.state);
        this.enterRule(localContext, 74, CircuitScriptParser.RULE_function_expr);
        try {
            this.state = 443;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.T__3:
            case CircuitScriptParser.Break:
            case CircuitScriptParser.Branch:
            case CircuitScriptParser.Wire:
            case CircuitScriptParser.Add:
            case CircuitScriptParser.At:
            case CircuitScriptParser.To:
            case CircuitScriptParser.Point:
            case CircuitScriptParser.Join:
            case CircuitScriptParser.Parallel:
            case CircuitScriptParser.Define:
            case CircuitScriptParser.Import:
            case CircuitScriptParser.For:
            case CircuitScriptParser.While:
            case CircuitScriptParser.Continue:
            case CircuitScriptParser.If:
            case CircuitScriptParser.Frame:
            case CircuitScriptParser.Sheet:
            case CircuitScriptParser.Addition:
            case CircuitScriptParser.Divide:
            case CircuitScriptParser.ANNOTATION_START:
            case CircuitScriptParser.ID:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 441;
                this.expression();
                }
                break;
            case CircuitScriptParser.Return:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 442;
                this.function_return_expr();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public function_args_expr(): Function_args_exprContext {
        let localContext = new Function_args_exprContext(this.context, this.state);
        this.enterRule(localContext, 76, CircuitScriptParser.RULE_function_args_expr);
        let _la: number;
        try {
            let alternative: number;
            this.state = 474;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 45, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 445;
                this.match(CircuitScriptParser.ID);
                this.state = 450;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 42, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 446;
                        this.match(CircuitScriptParser.T__1);
                        this.state = 447;
                        this.match(CircuitScriptParser.ID);
                        }
                        }
                    }
                    this.state = 452;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 42, this.context);
                }
                this.state = 459;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                    {
                    {
                    this.state = 453;
                    this.match(CircuitScriptParser.T__1);
                    this.state = 454;
                    this.match(CircuitScriptParser.ID);
                    this.state = 455;
                    this.match(CircuitScriptParser.T__2);
                    this.state = 456;
                    this.value_expr();
                    }
                    }
                    this.state = 461;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 462;
                this.match(CircuitScriptParser.ID);
                this.state = 463;
                this.match(CircuitScriptParser.T__2);
                this.state = 464;
                this.value_expr();
                this.state = 471;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                    {
                    {
                    this.state = 465;
                    this.match(CircuitScriptParser.T__1);
                    this.state = 466;
                    this.match(CircuitScriptParser.ID);
                    this.state = 467;
                    this.match(CircuitScriptParser.T__2);
                    this.state = 468;
                    this.value_expr();
                    }
                    }
                    this.state = 473;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public atom_expr(): Atom_exprContext {
        let localContext = new Atom_exprContext(this.context, this.state);
        this.enterRule(localContext, 78, CircuitScriptParser.RULE_atom_expr);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 476;
            this.match(CircuitScriptParser.ID);
            this.state = 480;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 46, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 477;
                    this.trailer_expr2();
                    }
                    }
                }
                this.state = 482;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 46, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public trailer_expr(): Trailer_exprContext {
        let localContext = new Trailer_exprContext(this.context, this.state);
        this.enterRule(localContext, 80, CircuitScriptParser.RULE_trailer_expr);
        let _la: number;
        try {
            this.state = 489;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.OPEN_PAREN:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 483;
                this.match(CircuitScriptParser.OPEN_PAREN);
                this.state = 485;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2147484704) !== 0) || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 2082823) !== 0)) {
                    {
                    this.state = 484;
                    this.parameters();
                    }
                }

                this.state = 487;
                this.match(CircuitScriptParser.CLOSE_PAREN);
                }
                break;
            case CircuitScriptParser.T__4:
            case CircuitScriptParser.T__6:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 488;
                this.trailer_expr2();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public trailer_expr2(): Trailer_expr2Context {
        let localContext = new Trailer_expr2Context(this.context, this.state);
        this.enterRule(localContext, 82, CircuitScriptParser.RULE_trailer_expr2);
        try {
            this.state = 497;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.T__6:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 491;
                this.match(CircuitScriptParser.T__6);
                this.state = 492;
                this.match(CircuitScriptParser.ID);
                }
                break;
            case CircuitScriptParser.T__4:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 493;
                this.match(CircuitScriptParser.T__4);
                this.state = 494;
                this.data_expr(0);
                this.state = 495;
                this.match(CircuitScriptParser.T__5);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public function_call_expr(): Function_call_exprContext {
        let localContext = new Function_call_exprContext(this.context, this.state);
        this.enterRule(localContext, 84, CircuitScriptParser.RULE_function_call_expr);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 500;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 42 || _la === 44) {
                {
                this.state = 499;
                this.net_namespace_expr();
                }
            }

            this.state = 502;
            this.match(CircuitScriptParser.ID);
            this.state = 504;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 503;
                    this.trailer_expr();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 506;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 51, this.context);
            } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public net_namespace_expr(): Net_namespace_exprContext {
        let localContext = new Net_namespace_exprContext(this.context, this.state);
        this.enterRule(localContext, 86, CircuitScriptParser.RULE_net_namespace_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 509;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 42) {
                {
                this.state = 508;
                this.match(CircuitScriptParser.Addition);
                }
            }

            this.state = 511;
            this.match(CircuitScriptParser.Divide);
            this.state = 513;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 53, this.context) ) {
            case 1:
                {
                this.state = 512;
                this.data_expr(0);
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public function_return_expr(): Function_return_exprContext {
        let localContext = new Function_return_exprContext(this.context, this.state);
        this.enterRule(localContext, 88, CircuitScriptParser.RULE_function_return_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 515;
            this.match(CircuitScriptParser.Return);
            this.state = 516;
            this.data_expr(0);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public property_block_expr(): Property_block_exprContext {
        let localContext = new Property_block_exprContext(this.context, this.state);
        this.enterRule(localContext, 90, CircuitScriptParser.RULE_property_block_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 518;
            this.property_key_expr();
            this.state = 519;
            this.match(CircuitScriptParser.T__0);
            this.state = 520;
            this.expressions_block();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public create_component_expr(): Create_component_exprContext {
        let localContext = new Create_component_exprContext(this.context, this.state);
        this.enterRule(localContext, 92, CircuitScriptParser.RULE_create_component_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 522;
            this.match(CircuitScriptParser.Create);
            this.state = 523;
            this.match(CircuitScriptParser.Component);
            this.state = 524;
            this.match(CircuitScriptParser.T__0);
            this.state = 525;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 526;
            this.match(CircuitScriptParser.INDENT);
            this.state = 529;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 529;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 527;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case CircuitScriptParser.ID:
                case CircuitScriptParser.INTEGER_VALUE:
                case CircuitScriptParser.STRING_VALUE:
                    {
                    this.state = 528;
                    this.property_expr();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 531;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 275) !== 0));
            this.state = 533;
            this.match(CircuitScriptParser.DEDENT);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public graphic_expressions_block(): Graphic_expressions_blockContext {
        let localContext = new Graphic_expressions_blockContext(this.context, this.state);
        this.enterRule(localContext, 94, CircuitScriptParser.RULE_graphic_expressions_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 535;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 536;
            this.match(CircuitScriptParser.INDENT);
            this.state = 539;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 539;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 537;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case CircuitScriptParser.Pin:
                case CircuitScriptParser.For:
                case CircuitScriptParser.ID:
                    {
                    this.state = 538;
                    this.graphic_expr();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 541;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 15 || _la === 25 || _la === 57 || _la === 65);
            this.state = 543;
            this.match(CircuitScriptParser.DEDENT);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public create_graphic_expr(): Create_graphic_exprContext {
        let localContext = new Create_graphic_exprContext(this.context, this.state);
        this.enterRule(localContext, 96, CircuitScriptParser.RULE_create_graphic_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 545;
            this.match(CircuitScriptParser.Create);
            this.state = 546;
            this.match(CircuitScriptParser.Graphic);
            this.state = 550;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 53) {
                {
                this.state = 547;
                this.match(CircuitScriptParser.OPEN_PAREN);
                this.state = 548;
                this.match(CircuitScriptParser.ID);
                this.state = 549;
                this.match(CircuitScriptParser.CLOSE_PAREN);
                }
            }

            this.state = 552;
            this.match(CircuitScriptParser.T__0);
            this.state = 553;
            this.graphic_expressions_block();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public create_module_expr(): Create_module_exprContext {
        let localContext = new Create_module_exprContext(this.context, this.state);
        this.enterRule(localContext, 98, CircuitScriptParser.RULE_create_module_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 555;
            this.match(CircuitScriptParser.Create);
            this.state = 556;
            this.match(CircuitScriptParser.Module);
            this.state = 557;
            this.match(CircuitScriptParser.T__0);
            this.state = 558;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 559;
            this.match(CircuitScriptParser.INDENT);
            this.state = 563;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 563;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 59, this.context) ) {
                case 1:
                    {
                    this.state = 560;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case 2:
                    {
                    this.state = 561;
                    this.property_expr();
                    }
                    break;
                case 3:
                    {
                    this.state = 562;
                    this.property_block_expr();
                    }
                    break;
                }
                }
                this.state = 565;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 275) !== 0));
            this.state = 567;
            this.match(CircuitScriptParser.DEDENT);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public nested_properties_inner(): Nested_properties_innerContext {
        let localContext = new Nested_properties_innerContext(this.context, this.state);
        this.enterRule(localContext, 100, CircuitScriptParser.RULE_nested_properties_inner);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            {
            this.state = 569;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 570;
            this.match(CircuitScriptParser.INDENT);
            this.state = 573;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 573;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 571;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case CircuitScriptParser.ID:
                case CircuitScriptParser.INTEGER_VALUE:
                case CircuitScriptParser.STRING_VALUE:
                    {
                    this.state = 572;
                    this.property_expr();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 575;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 275) !== 0));
            this.state = 577;
            this.match(CircuitScriptParser.DEDENT);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public graphic_expr(): Graphic_exprContext {
        let localContext = new Graphic_exprContext(this.context, this.state);
        this.enterRule(localContext, 102, CircuitScriptParser.RULE_graphic_expr);
        let _la: number;
        try {
            this.state = 605;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.Pin:
            case CircuitScriptParser.ID:
                localContext = new GraphicCommandExprContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 579;
                (localContext as GraphicCommandExprContext)._command = this.tokenStream.LT(1);
                _la = this.tokenStream.LA(1);
                if(!(_la === 15 || _la === 57)) {
                    (localContext as GraphicCommandExprContext)._command = this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 581;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 1) {
                    {
                    this.state = 580;
                    this.match(CircuitScriptParser.T__0);
                    }
                }

                this.state = 589;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 64, this.context) ) {
                case 1:
                    {
                    this.state = 583;
                    this.parameters();
                    }
                    break;
                case 2:
                    {
                    this.state = 584;
                    this.match(CircuitScriptParser.OPEN_PAREN);
                    this.state = 585;
                    this.parameters();
                    this.state = 586;
                    this.match(CircuitScriptParser.CLOSE_PAREN);
                    }
                    break;
                case 3:
                    {
                    this.state = 588;
                    this.nested_properties_inner();
                    }
                    break;
                }
                }
                break;
            case CircuitScriptParser.For:
                localContext = new GraphicForExprContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 591;
                this.match(CircuitScriptParser.For);
                this.state = 592;
                this.match(CircuitScriptParser.ID);
                this.state = 597;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                    {
                    {
                    this.state = 593;
                    this.match(CircuitScriptParser.T__1);
                    this.state = 594;
                    this.match(CircuitScriptParser.ID);
                    }
                    }
                    this.state = 599;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 600;
                this.match(CircuitScriptParser.In);
                this.state = 601;
                this.data_expr(0);
                this.state = 602;
                this.match(CircuitScriptParser.T__0);
                this.state = 603;
                this.graphic_expressions_block();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public property_expr(): Property_exprContext {
        let localContext = new Property_exprContext(this.context, this.state);
        this.enterRule(localContext, 104, CircuitScriptParser.RULE_property_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 607;
            this.property_key_expr();
            this.state = 608;
            this.match(CircuitScriptParser.T__0);
            this.state = 609;
            this.property_value_expr();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public property_key_expr(): Property_key_exprContext {
        let localContext = new Property_key_exprContext(this.context, this.state);
        this.enterRule(localContext, 106, CircuitScriptParser.RULE_property_key_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 611;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 19) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public property_value_expr(): Property_value_exprContext {
        let localContext = new Property_value_exprContext(this.context, this.state);
        this.enterRule(localContext, 108, CircuitScriptParser.RULE_property_value_expr);
        let _la: number;
        try {
            this.state = 622;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.NEWLINE:
                localContext = new Nested_propertiesContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 613;
                this.nested_properties_inner();
                }
                break;
            case CircuitScriptParser.T__4:
            case CircuitScriptParser.Create:
            case CircuitScriptParser.Not:
            case CircuitScriptParser.Addition:
            case CircuitScriptParser.Minus:
            case CircuitScriptParser.Divide:
            case CircuitScriptParser.OPEN_PAREN:
            case CircuitScriptParser.BOOLEAN_VALUE:
            case CircuitScriptParser.ID:
            case CircuitScriptParser.INTEGER_VALUE:
            case CircuitScriptParser.DECIMAL_VALUE:
            case CircuitScriptParser.NUMERIC_VALUE:
            case CircuitScriptParser.STRING_VALUE:
            case CircuitScriptParser.PERCENTAGE_VALUE:
                localContext = new Single_line_propertyContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 614;
                this.data_expr(0);
                this.state = 619;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                    {
                    {
                    this.state = 615;
                    this.match(CircuitScriptParser.T__1);
                    this.state = 616;
                    this.data_expr(0);
                    }
                    }
                    this.state = 621;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public wire_atom_expr(): Wire_atom_exprContext {
        let localContext = new Wire_atom_exprContext(this.context, this.state);
        this.enterRule(localContext, 110, CircuitScriptParser.RULE_wire_atom_expr);
        try {
            this.state = 630;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 70, this.context) ) {
            case 1:
                localContext = new Wire_expr_direction_valueContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 624;
                this.match(CircuitScriptParser.ID);
                this.state = 627;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 69, this.context) ) {
                case 1:
                    {
                    this.state = 625;
                    this.match(CircuitScriptParser.INTEGER_VALUE);
                    }
                    break;
                case 2:
                    {
                    this.state = 626;
                    this.data_expr(0);
                    }
                    break;
                }
                }
                break;
            case 2:
                localContext = new Wire_expr_direction_onlyContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 629;
                this.match(CircuitScriptParser.ID);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public wire_expr(): Wire_exprContext {
        let localContext = new Wire_exprContext(this.context, this.state);
        this.enterRule(localContext, 112, CircuitScriptParser.RULE_wire_expr);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 632;
            this.match(CircuitScriptParser.Wire);
            this.state = 636;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 71, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 633;
                    this.wire_atom_expr();
                    }
                    }
                }
                this.state = 638;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 71, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public array_expr(): Array_exprContext {
        let localContext = new Array_exprContext(this.context, this.state);
        this.enterRule(localContext, 114, CircuitScriptParser.RULE_array_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 639;
            this.match(CircuitScriptParser.T__4);
            this.state = 650;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2147484704) !== 0) || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 2082823) !== 0)) {
                {
                {
                this.state = 640;
                this.data_expr(0);
                this.state = 645;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                    {
                    {
                    this.state = 641;
                    this.match(CircuitScriptParser.T__1);
                    this.state = 642;
                    this.data_expr(0);
                    }
                    }
                    this.state = 647;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                }
                this.state = 652;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 653;
            this.match(CircuitScriptParser.T__5);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public point_expr(): Point_exprContext {
        let localContext = new Point_exprContext(this.context, this.state);
        this.enterRule(localContext, 116, CircuitScriptParser.RULE_point_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 655;
            this.match(CircuitScriptParser.Point);
            this.state = 658;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 74, this.context) ) {
            case 1:
                {
                this.state = 656;
                this.match(CircuitScriptParser.ID);
                }
                break;
            case 2:
                {
                this.state = 657;
                this.data_expr(0);
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public import_expr(): Import_exprContext {
        let localContext = new Import_exprContext(this.context, this.state);
        this.enterRule(localContext, 118, CircuitScriptParser.RULE_import_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 660;
            this.match(CircuitScriptParser.Import);
            this.state = 661;
            this.match(CircuitScriptParser.ID);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public frame_expr(): Frame_exprContext {
        let localContext = new Frame_exprContext(this.context, this.state);
        this.enterRule(localContext, 120, CircuitScriptParser.RULE_frame_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 663;
            _la = this.tokenStream.LA(1);
            if(!(_la === 32 || _la === 33)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 664;
            this.match(CircuitScriptParser.T__0);
            this.state = 665;
            this.expressions_block();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public if_expr(): If_exprContext {
        let localContext = new If_exprContext(this.context, this.state);
        this.enterRule(localContext, 122, CircuitScriptParser.RULE_if_expr);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 667;
            this.match(CircuitScriptParser.If);
            this.state = 668;
            this.data_expr(0);
            this.state = 669;
            this.match(CircuitScriptParser.T__0);
            this.state = 670;
            this.expressions_block();
            this.state = 674;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 75, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 671;
                    this.if_inner_expr();
                    }
                    }
                }
                this.state = 676;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 75, this.context);
            }
            this.state = 678;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 30) {
                {
                this.state = 677;
                this.else_expr();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public if_inner_expr(): If_inner_exprContext {
        let localContext = new If_inner_exprContext(this.context, this.state);
        this.enterRule(localContext, 124, CircuitScriptParser.RULE_if_inner_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 680;
            this.match(CircuitScriptParser.Else);
            this.state = 681;
            this.match(CircuitScriptParser.If);
            this.state = 682;
            this.data_expr(0);
            this.state = 683;
            this.match(CircuitScriptParser.T__0);
            this.state = 684;
            this.expressions_block();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public else_expr(): Else_exprContext {
        let localContext = new Else_exprContext(this.context, this.state);
        this.enterRule(localContext, 126, CircuitScriptParser.RULE_else_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 686;
            this.match(CircuitScriptParser.Else);
            this.state = 687;
            this.match(CircuitScriptParser.T__0);
            this.state = 688;
            this.expressions_block();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public while_expr(): While_exprContext {
        let localContext = new While_exprContext(this.context, this.state);
        this.enterRule(localContext, 128, CircuitScriptParser.RULE_while_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 690;
            this.match(CircuitScriptParser.While);
            this.state = 691;
            this.data_expr(0);
            this.state = 692;
            this.match(CircuitScriptParser.T__0);
            this.state = 693;
            this.expressions_block();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public for_expr(): For_exprContext {
        let localContext = new For_exprContext(this.context, this.state);
        this.enterRule(localContext, 130, CircuitScriptParser.RULE_for_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 695;
            this.match(CircuitScriptParser.For);
            this.state = 696;
            this.match(CircuitScriptParser.ID);
            this.state = 701;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 697;
                this.match(CircuitScriptParser.T__1);
                this.state = 698;
                this.match(CircuitScriptParser.ID);
                }
                }
                this.state = 703;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 704;
            this.match(CircuitScriptParser.In);
            this.state = 705;
            this.data_expr(0);
            this.state = 706;
            this.match(CircuitScriptParser.T__0);
            this.state = 707;
            this.expressions_block();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public annotation_comment_expr(): Annotation_comment_exprContext {
        let localContext = new Annotation_comment_exprContext(this.context, this.state);
        this.enterRule(localContext, 132, CircuitScriptParser.RULE_annotation_comment_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 709;
            this.match(CircuitScriptParser.ANNOTATION_START);
            this.state = 710;
            this.match(CircuitScriptParser.ID);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public override sempred(localContext: antlr.ParserRuleContext | null, ruleIndex: number, predIndex: number): boolean {
        switch (ruleIndex) {
        case 32:
            return this.data_expr_sempred(localContext as Data_exprContext, predIndex);
        }
        return true;
    }
    private data_expr_sempred(localContext: Data_exprContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 0:
            return this.precpred(this.context, 10);
        case 1:
            return this.precpred(this.context, 9);
        case 2:
            return this.precpred(this.context, 8);
        case 3:
            return this.precpred(this.context, 7);
        case 4:
            return this.precpred(this.context, 1);
        }
        return true;
    }

    public static readonly _serializedATN: number[] = [
        4,1,68,713,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,
        7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,
        2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,33,
        7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,39,
        2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,46,
        7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,52,
        2,53,7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,59,
        7,59,2,60,7,60,2,61,7,61,2,62,7,62,2,63,7,63,2,64,7,64,2,65,7,65,
        2,66,7,66,1,0,1,0,5,0,137,8,0,10,0,12,0,140,9,0,1,0,1,0,4,0,144,
        8,0,11,0,12,0,145,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,3,1,163,8,1,1,2,1,2,1,2,1,2,1,2,3,2,170,8,2,1,3,1,
        3,3,3,174,8,3,1,4,1,4,1,4,1,4,1,4,1,4,3,4,182,8,4,1,5,1,5,1,5,1,
        5,4,5,188,8,5,11,5,12,5,189,1,5,1,5,1,6,1,6,1,6,1,6,1,7,1,7,1,7,
        1,7,1,7,1,7,4,7,204,8,7,11,7,12,7,205,1,7,1,7,1,8,1,8,1,8,1,8,1,
        9,1,9,1,9,1,10,1,10,1,10,1,10,3,10,221,8,10,1,11,1,11,3,11,225,8,
        11,1,11,5,11,228,8,11,10,11,12,11,231,9,11,1,11,3,11,234,8,11,1,
        12,1,12,1,12,1,13,1,13,1,13,3,13,242,8,13,1,14,1,14,1,15,1,15,1,
        15,1,16,1,16,1,16,1,16,5,16,253,8,16,10,16,12,16,256,9,16,1,17,1,
        17,1,17,1,17,1,17,1,17,5,17,264,8,17,10,17,12,17,267,9,17,1,17,1,
        17,1,17,1,17,1,17,4,17,274,8,17,11,17,12,17,275,1,17,1,17,1,18,1,
        18,1,18,1,18,1,18,5,18,285,8,18,10,18,12,18,288,9,18,1,19,1,19,1,
        20,1,20,1,20,1,20,1,20,4,20,297,8,20,11,20,12,20,298,1,20,1,20,1,
        21,1,21,3,21,305,8,21,1,22,1,22,1,22,3,22,310,8,22,1,23,1,23,1,23,
        1,23,3,23,316,8,23,1,24,1,24,3,24,320,8,24,1,25,1,25,1,26,1,26,3,
        26,326,8,26,1,26,1,26,1,26,1,27,1,27,1,27,1,27,1,28,1,28,1,28,1,
        28,1,29,1,29,1,29,5,29,342,8,29,10,29,12,29,345,9,29,1,29,1,29,5,
        29,349,8,29,10,29,12,29,352,9,29,1,29,1,29,1,29,5,29,357,8,29,10,
        29,12,29,360,9,29,3,29,362,8,29,1,30,1,30,1,30,1,30,1,31,1,31,1,
        31,1,31,1,31,1,32,1,32,1,32,1,32,1,32,1,32,1,32,3,32,380,8,32,1,
        32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,3,32,390,8,32,1,32,1,32,1,
        32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,
        32,1,32,1,32,5,32,410,8,32,10,32,12,32,413,9,32,1,33,1,33,1,34,1,
        34,1,35,3,35,420,8,35,1,35,1,35,1,36,1,36,1,36,1,36,3,36,428,8,36,
        1,36,1,36,1,36,1,36,1,36,1,36,4,36,436,8,36,11,36,12,36,437,1,36,
        1,36,1,37,1,37,3,37,444,8,37,1,38,1,38,1,38,5,38,449,8,38,10,38,
        12,38,452,9,38,1,38,1,38,1,38,1,38,5,38,458,8,38,10,38,12,38,461,
        9,38,1,38,1,38,1,38,1,38,1,38,1,38,1,38,5,38,470,8,38,10,38,12,38,
        473,9,38,3,38,475,8,38,1,39,1,39,5,39,479,8,39,10,39,12,39,482,9,
        39,1,40,1,40,3,40,486,8,40,1,40,1,40,3,40,490,8,40,1,41,1,41,1,41,
        1,41,1,41,1,41,3,41,498,8,41,1,42,3,42,501,8,42,1,42,1,42,4,42,505,
        8,42,11,42,12,42,506,1,43,3,43,510,8,43,1,43,1,43,3,43,514,8,43,
        1,44,1,44,1,44,1,45,1,45,1,45,1,45,1,46,1,46,1,46,1,46,1,46,1,46,
        1,46,4,46,530,8,46,11,46,12,46,531,1,46,1,46,1,47,1,47,1,47,1,47,
        4,47,540,8,47,11,47,12,47,541,1,47,1,47,1,48,1,48,1,48,1,48,1,48,
        3,48,551,8,48,1,48,1,48,1,48,1,49,1,49,1,49,1,49,1,49,1,49,1,49,
        1,49,4,49,564,8,49,11,49,12,49,565,1,49,1,49,1,50,1,50,1,50,1,50,
        4,50,574,8,50,11,50,12,50,575,1,50,1,50,1,51,1,51,3,51,582,8,51,
        1,51,1,51,1,51,1,51,1,51,1,51,3,51,590,8,51,1,51,1,51,1,51,1,51,
        5,51,596,8,51,10,51,12,51,599,9,51,1,51,1,51,1,51,1,51,1,51,3,51,
        606,8,51,1,52,1,52,1,52,1,52,1,53,1,53,1,54,1,54,1,54,1,54,5,54,
        618,8,54,10,54,12,54,621,9,54,3,54,623,8,54,1,55,1,55,1,55,3,55,
        628,8,55,1,55,3,55,631,8,55,1,56,1,56,5,56,635,8,56,10,56,12,56,
        638,9,56,1,57,1,57,1,57,1,57,5,57,644,8,57,10,57,12,57,647,9,57,
        5,57,649,8,57,10,57,12,57,652,9,57,1,57,1,57,1,58,1,58,1,58,3,58,
        659,8,58,1,59,1,59,1,59,1,60,1,60,1,60,1,60,1,61,1,61,1,61,1,61,
        1,61,5,61,673,8,61,10,61,12,61,676,9,61,1,61,3,61,679,8,61,1,62,
        1,62,1,62,1,62,1,62,1,62,1,63,1,63,1,63,1,63,1,64,1,64,1,64,1,64,
        1,64,1,65,1,65,1,65,1,65,5,65,700,8,65,10,65,12,65,703,9,65,1,65,
        1,65,1,65,1,65,1,65,1,66,1,66,1,66,1,66,0,1,64,67,0,2,4,6,8,10,12,
        14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,
        58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,
        102,104,106,108,110,112,114,116,118,120,122,124,126,128,130,132,
        0,14,2,0,9,9,19,21,1,0,57,58,2,0,58,58,61,61,2,0,55,55,58,58,1,0,
        47,51,1,0,44,46,1,0,42,43,1,0,40,41,1,0,34,39,2,0,31,31,43,43,2,
        0,56,56,58,62,2,0,15,15,57,57,2,0,57,58,61,61,1,0,32,33,753,0,138,
        1,0,0,0,2,162,1,0,0,0,4,169,1,0,0,0,6,173,1,0,0,0,8,181,1,0,0,0,
        10,183,1,0,0,0,12,193,1,0,0,0,14,197,1,0,0,0,16,209,1,0,0,0,18,213,
        1,0,0,0,20,216,1,0,0,0,22,224,1,0,0,0,24,235,1,0,0,0,26,241,1,0,
        0,0,28,243,1,0,0,0,30,245,1,0,0,0,32,248,1,0,0,0,34,257,1,0,0,0,
        36,279,1,0,0,0,38,289,1,0,0,0,40,291,1,0,0,0,42,304,1,0,0,0,44,306,
        1,0,0,0,46,311,1,0,0,0,48,319,1,0,0,0,50,321,1,0,0,0,52,325,1,0,
        0,0,54,330,1,0,0,0,56,334,1,0,0,0,58,361,1,0,0,0,60,363,1,0,0,0,
        62,367,1,0,0,0,64,389,1,0,0,0,66,414,1,0,0,0,68,416,1,0,0,0,70,419,
        1,0,0,0,72,423,1,0,0,0,74,443,1,0,0,0,76,474,1,0,0,0,78,476,1,0,
        0,0,80,489,1,0,0,0,82,497,1,0,0,0,84,500,1,0,0,0,86,509,1,0,0,0,
        88,515,1,0,0,0,90,518,1,0,0,0,92,522,1,0,0,0,94,535,1,0,0,0,96,545,
        1,0,0,0,98,555,1,0,0,0,100,569,1,0,0,0,102,605,1,0,0,0,104,607,1,
        0,0,0,106,611,1,0,0,0,108,622,1,0,0,0,110,630,1,0,0,0,112,632,1,
        0,0,0,114,639,1,0,0,0,116,655,1,0,0,0,118,660,1,0,0,0,120,663,1,
        0,0,0,122,667,1,0,0,0,124,680,1,0,0,0,126,686,1,0,0,0,128,690,1,
        0,0,0,130,695,1,0,0,0,132,709,1,0,0,0,134,137,3,118,59,0,135,137,
        5,65,0,0,136,134,1,0,0,0,136,135,1,0,0,0,137,140,1,0,0,0,138,136,
        1,0,0,0,138,139,1,0,0,0,139,143,1,0,0,0,140,138,1,0,0,0,141,144,
        3,2,1,0,142,144,5,65,0,0,143,141,1,0,0,0,143,142,1,0,0,0,144,145,
        1,0,0,0,145,143,1,0,0,0,145,146,1,0,0,0,146,147,1,0,0,0,147,148,
        5,0,0,1,148,1,1,0,0,0,149,163,3,6,3,0,150,163,3,52,26,0,151,163,
        3,54,27,0,152,163,3,60,30,0,153,163,3,14,7,0,154,163,3,62,31,0,155,
        163,3,72,36,0,156,163,3,84,42,0,157,163,3,118,59,0,158,163,3,78,
        39,0,159,163,3,120,60,0,160,163,3,4,2,0,161,163,3,132,66,0,162,149,
        1,0,0,0,162,150,1,0,0,0,162,151,1,0,0,0,162,152,1,0,0,0,162,153,
        1,0,0,0,162,154,1,0,0,0,162,155,1,0,0,0,162,156,1,0,0,0,162,157,
        1,0,0,0,162,158,1,0,0,0,162,159,1,0,0,0,162,160,1,0,0,0,162,161,
        1,0,0,0,163,3,1,0,0,0,164,170,3,122,61,0,165,170,3,128,64,0,166,
        170,3,130,65,0,167,170,5,8,0,0,168,170,5,28,0,0,169,164,1,0,0,0,
        169,165,1,0,0,0,169,166,1,0,0,0,169,167,1,0,0,0,169,168,1,0,0,0,
        170,5,1,0,0,0,171,174,3,8,4,0,172,174,3,12,6,0,173,171,1,0,0,0,173,
        172,1,0,0,0,174,7,1,0,0,0,175,182,3,24,12,0,176,182,3,32,16,0,177,
        182,3,30,15,0,178,182,3,40,20,0,179,182,3,112,56,0,180,182,3,116,
        58,0,181,175,1,0,0,0,181,176,1,0,0,0,181,177,1,0,0,0,181,178,1,0,
        0,0,181,179,1,0,0,0,181,180,1,0,0,0,182,9,1,0,0,0,183,184,5,65,0,
        0,184,187,5,67,0,0,185,188,5,65,0,0,186,188,3,2,1,0,187,185,1,0,
        0,0,187,186,1,0,0,0,188,189,1,0,0,0,189,187,1,0,0,0,189,190,1,0,
        0,0,190,191,1,0,0,0,191,192,5,68,0,0,192,11,1,0,0,0,193,194,7,0,
        0,0,194,195,5,1,0,0,195,196,3,10,5,0,196,13,1,0,0,0,197,198,3,78,
        39,0,198,199,5,1,0,0,199,200,5,65,0,0,200,203,5,67,0,0,201,204,5,
        65,0,0,202,204,3,16,8,0,203,201,1,0,0,0,203,202,1,0,0,0,204,205,
        1,0,0,0,205,203,1,0,0,0,205,206,1,0,0,0,206,207,1,0,0,0,207,208,
        5,68,0,0,208,15,1,0,0,0,209,210,7,1,0,0,210,211,5,1,0,0,211,212,
        3,70,35,0,212,17,1,0,0,0,213,214,5,15,0,0,214,215,3,64,32,0,215,
        19,1,0,0,0,216,217,5,57,0,0,217,220,5,1,0,0,218,221,3,70,35,0,219,
        221,5,57,0,0,220,218,1,0,0,0,220,219,1,0,0,0,221,21,1,0,0,0,222,
        225,3,64,32,0,223,225,3,52,26,0,224,222,1,0,0,0,224,223,1,0,0,0,
        225,229,1,0,0,0,226,228,3,20,10,0,227,226,1,0,0,0,228,231,1,0,0,
        0,229,227,1,0,0,0,229,230,1,0,0,0,230,233,1,0,0,0,231,229,1,0,0,
        0,232,234,3,18,9,0,233,232,1,0,0,0,233,234,1,0,0,0,234,23,1,0,0,
        0,235,236,5,16,0,0,236,237,3,22,11,0,237,25,1,0,0,0,238,242,3,22,
        11,0,239,242,3,18,9,0,240,242,5,19,0,0,241,238,1,0,0,0,241,239,1,
        0,0,0,241,240,1,0,0,0,242,27,1,0,0,0,243,244,7,2,0,0,244,29,1,0,
        0,0,245,246,5,17,0,0,246,247,3,26,13,0,247,31,1,0,0,0,248,249,5,
        18,0,0,249,254,3,26,13,0,250,251,5,2,0,0,251,253,3,26,13,0,252,250,
        1,0,0,0,253,256,1,0,0,0,254,252,1,0,0,0,254,255,1,0,0,0,255,33,1,
        0,0,0,256,254,1,0,0,0,257,258,5,17,0,0,258,259,3,26,13,0,259,260,
        5,18,0,0,260,265,3,26,13,0,261,262,5,2,0,0,262,264,3,26,13,0,263,
        261,1,0,0,0,264,267,1,0,0,0,265,263,1,0,0,0,265,266,1,0,0,0,266,
        268,1,0,0,0,267,265,1,0,0,0,268,269,5,1,0,0,269,270,5,65,0,0,270,
        273,5,67,0,0,271,274,5,65,0,0,272,274,3,36,18,0,273,271,1,0,0,0,
        273,272,1,0,0,0,274,275,1,0,0,0,275,273,1,0,0,0,275,276,1,0,0,0,
        276,277,1,0,0,0,277,278,5,68,0,0,278,35,1,0,0,0,279,280,3,28,14,
        0,280,281,5,1,0,0,281,286,3,38,19,0,282,283,5,2,0,0,283,285,3,38,
        19,0,284,282,1,0,0,0,285,288,1,0,0,0,286,284,1,0,0,0,286,287,1,0,
        0,0,287,37,1,0,0,0,288,286,1,0,0,0,289,290,7,3,0,0,290,39,1,0,0,
        0,291,292,3,44,22,0,292,293,5,65,0,0,293,296,5,67,0,0,294,297,5,
        65,0,0,295,297,3,42,21,0,296,294,1,0,0,0,296,295,1,0,0,0,297,298,
        1,0,0,0,298,296,1,0,0,0,298,299,1,0,0,0,299,300,1,0,0,0,300,301,
        5,68,0,0,301,41,1,0,0,0,302,305,3,2,1,0,303,305,3,46,23,0,304,302,
        1,0,0,0,304,303,1,0,0,0,305,43,1,0,0,0,306,307,3,30,15,0,307,309,
        5,1,0,0,308,310,3,132,66,0,309,308,1,0,0,0,309,310,1,0,0,0,310,45,
        1,0,0,0,311,312,3,28,14,0,312,315,5,1,0,0,313,316,3,48,24,0,314,
        316,3,50,25,0,315,313,1,0,0,0,315,314,1,0,0,0,316,47,1,0,0,0,317,
        320,3,2,1,0,318,320,5,55,0,0,319,317,1,0,0,0,319,318,1,0,0,0,320,
        49,1,0,0,0,321,322,3,10,5,0,322,51,1,0,0,0,323,326,3,78,39,0,324,
        326,3,84,42,0,325,323,1,0,0,0,325,324,1,0,0,0,326,327,1,0,0,0,327,
        328,5,3,0,0,328,329,3,64,32,0,329,53,1,0,0,0,330,331,3,78,39,0,331,
        332,7,4,0,0,332,333,3,64,32,0,333,55,1,0,0,0,334,335,5,57,0,0,335,
        336,5,3,0,0,336,337,3,64,32,0,337,57,1,0,0,0,338,343,3,64,32,0,339,
        340,5,2,0,0,340,342,3,64,32,0,341,339,1,0,0,0,342,345,1,0,0,0,343,
        341,1,0,0,0,343,344,1,0,0,0,344,350,1,0,0,0,345,343,1,0,0,0,346,
        347,5,2,0,0,347,349,3,56,28,0,348,346,1,0,0,0,349,352,1,0,0,0,350,
        348,1,0,0,0,350,351,1,0,0,0,351,362,1,0,0,0,352,350,1,0,0,0,353,
        358,3,56,28,0,354,355,5,2,0,0,355,357,3,56,28,0,356,354,1,0,0,0,
        357,360,1,0,0,0,358,356,1,0,0,0,358,359,1,0,0,0,359,362,1,0,0,0,
        360,358,1,0,0,0,361,338,1,0,0,0,361,353,1,0,0,0,362,59,1,0,0,0,363,
        364,3,78,39,0,364,365,5,3,0,0,365,366,3,64,32,0,366,61,1,0,0,0,367,
        368,5,4,0,0,368,369,5,57,0,0,369,370,5,3,0,0,370,371,3,64,32,0,371,
        63,1,0,0,0,372,373,6,32,-1,0,373,374,5,53,0,0,374,375,3,64,32,0,
        375,376,5,54,0,0,376,390,1,0,0,0,377,380,3,70,35,0,378,380,3,78,
        39,0,379,377,1,0,0,0,379,378,1,0,0,0,380,390,1,0,0,0,381,382,3,68,
        34,0,382,383,3,64,32,11,383,390,1,0,0,0,384,390,3,92,46,0,385,390,
        3,96,48,0,386,390,3,98,49,0,387,390,3,84,42,0,388,390,3,114,57,0,
        389,372,1,0,0,0,389,379,1,0,0,0,389,381,1,0,0,0,389,384,1,0,0,0,
        389,385,1,0,0,0,389,386,1,0,0,0,389,387,1,0,0,0,389,388,1,0,0,0,
        390,411,1,0,0,0,391,392,10,10,0,0,392,393,7,5,0,0,393,410,3,64,32,
        11,394,395,10,9,0,0,395,396,7,6,0,0,396,410,3,64,32,10,397,398,10,
        8,0,0,398,399,3,66,33,0,399,400,3,64,32,9,400,410,1,0,0,0,401,402,
        10,7,0,0,402,403,7,7,0,0,403,410,3,64,32,8,404,405,10,1,0,0,405,
        406,5,5,0,0,406,407,3,64,32,0,407,408,5,6,0,0,408,410,1,0,0,0,409,
        391,1,0,0,0,409,394,1,0,0,0,409,397,1,0,0,0,409,401,1,0,0,0,409,
        404,1,0,0,0,410,413,1,0,0,0,411,409,1,0,0,0,411,412,1,0,0,0,412,
        65,1,0,0,0,413,411,1,0,0,0,414,415,7,8,0,0,415,67,1,0,0,0,416,417,
        7,9,0,0,417,69,1,0,0,0,418,420,5,43,0,0,419,418,1,0,0,0,419,420,
        1,0,0,0,420,421,1,0,0,0,421,422,7,10,0,0,422,71,1,0,0,0,423,424,
        5,23,0,0,424,425,5,57,0,0,425,427,5,53,0,0,426,428,3,76,38,0,427,
        426,1,0,0,0,427,428,1,0,0,0,428,429,1,0,0,0,429,430,5,54,0,0,430,
        431,5,1,0,0,431,432,5,65,0,0,432,435,5,67,0,0,433,436,5,65,0,0,434,
        436,3,74,37,0,435,433,1,0,0,0,435,434,1,0,0,0,436,437,1,0,0,0,437,
        435,1,0,0,0,437,438,1,0,0,0,438,439,1,0,0,0,439,440,5,68,0,0,440,
        73,1,0,0,0,441,444,3,2,1,0,442,444,3,88,44,0,443,441,1,0,0,0,443,
        442,1,0,0,0,444,75,1,0,0,0,445,450,5,57,0,0,446,447,5,2,0,0,447,
        449,5,57,0,0,448,446,1,0,0,0,449,452,1,0,0,0,450,448,1,0,0,0,450,
        451,1,0,0,0,451,459,1,0,0,0,452,450,1,0,0,0,453,454,5,2,0,0,454,
        455,5,57,0,0,455,456,5,3,0,0,456,458,3,70,35,0,457,453,1,0,0,0,458,
        461,1,0,0,0,459,457,1,0,0,0,459,460,1,0,0,0,460,475,1,0,0,0,461,
        459,1,0,0,0,462,463,5,57,0,0,463,464,5,3,0,0,464,471,3,70,35,0,465,
        466,5,2,0,0,466,467,5,57,0,0,467,468,5,3,0,0,468,470,3,70,35,0,469,
        465,1,0,0,0,470,473,1,0,0,0,471,469,1,0,0,0,471,472,1,0,0,0,472,
        475,1,0,0,0,473,471,1,0,0,0,474,445,1,0,0,0,474,462,1,0,0,0,475,
        77,1,0,0,0,476,480,5,57,0,0,477,479,3,82,41,0,478,477,1,0,0,0,479,
        482,1,0,0,0,480,478,1,0,0,0,480,481,1,0,0,0,481,79,1,0,0,0,482,480,
        1,0,0,0,483,485,5,53,0,0,484,486,3,58,29,0,485,484,1,0,0,0,485,486,
        1,0,0,0,486,487,1,0,0,0,487,490,5,54,0,0,488,490,3,82,41,0,489,483,
        1,0,0,0,489,488,1,0,0,0,490,81,1,0,0,0,491,492,5,7,0,0,492,498,5,
        57,0,0,493,494,5,5,0,0,494,495,3,64,32,0,495,496,5,6,0,0,496,498,
        1,0,0,0,497,491,1,0,0,0,497,493,1,0,0,0,498,83,1,0,0,0,499,501,3,
        86,43,0,500,499,1,0,0,0,500,501,1,0,0,0,501,502,1,0,0,0,502,504,
        5,57,0,0,503,505,3,80,40,0,504,503,1,0,0,0,505,506,1,0,0,0,506,504,
        1,0,0,0,506,507,1,0,0,0,507,85,1,0,0,0,508,510,5,42,0,0,509,508,
        1,0,0,0,509,510,1,0,0,0,510,511,1,0,0,0,511,513,5,44,0,0,512,514,
        3,64,32,0,513,512,1,0,0,0,513,514,1,0,0,0,514,87,1,0,0,0,515,516,
        5,22,0,0,516,517,3,64,32,0,517,89,1,0,0,0,518,519,3,106,53,0,519,
        520,5,1,0,0,520,521,3,10,5,0,521,91,1,0,0,0,522,523,5,10,0,0,523,
        524,5,11,0,0,524,525,5,1,0,0,525,526,5,65,0,0,526,529,5,67,0,0,527,
        530,5,65,0,0,528,530,3,104,52,0,529,527,1,0,0,0,529,528,1,0,0,0,
        530,531,1,0,0,0,531,529,1,0,0,0,531,532,1,0,0,0,532,533,1,0,0,0,
        533,534,5,68,0,0,534,93,1,0,0,0,535,536,5,65,0,0,536,539,5,67,0,
        0,537,540,5,65,0,0,538,540,3,102,51,0,539,537,1,0,0,0,539,538,1,
        0,0,0,540,541,1,0,0,0,541,539,1,0,0,0,541,542,1,0,0,0,542,543,1,
        0,0,0,543,544,5,68,0,0,544,95,1,0,0,0,545,546,5,10,0,0,546,550,5,
        12,0,0,547,548,5,53,0,0,548,549,5,57,0,0,549,551,5,54,0,0,550,547,
        1,0,0,0,550,551,1,0,0,0,551,552,1,0,0,0,552,553,5,1,0,0,553,554,
        3,94,47,0,554,97,1,0,0,0,555,556,5,10,0,0,556,557,5,13,0,0,557,558,
        5,1,0,0,558,559,5,65,0,0,559,563,5,67,0,0,560,564,5,65,0,0,561,564,
        3,104,52,0,562,564,3,90,45,0,563,560,1,0,0,0,563,561,1,0,0,0,563,
        562,1,0,0,0,564,565,1,0,0,0,565,563,1,0,0,0,565,566,1,0,0,0,566,
        567,1,0,0,0,567,568,5,68,0,0,568,99,1,0,0,0,569,570,5,65,0,0,570,
        573,5,67,0,0,571,574,5,65,0,0,572,574,3,104,52,0,573,571,1,0,0,0,
        573,572,1,0,0,0,574,575,1,0,0,0,575,573,1,0,0,0,575,576,1,0,0,0,
        576,577,1,0,0,0,577,578,5,68,0,0,578,101,1,0,0,0,579,581,7,11,0,
        0,580,582,5,1,0,0,581,580,1,0,0,0,581,582,1,0,0,0,582,589,1,0,0,
        0,583,590,3,58,29,0,584,585,5,53,0,0,585,586,3,58,29,0,586,587,5,
        54,0,0,587,590,1,0,0,0,588,590,3,100,50,0,589,583,1,0,0,0,589,584,
        1,0,0,0,589,588,1,0,0,0,590,606,1,0,0,0,591,592,5,25,0,0,592,597,
        5,57,0,0,593,594,5,2,0,0,594,596,5,57,0,0,595,593,1,0,0,0,596,599,
        1,0,0,0,597,595,1,0,0,0,597,598,1,0,0,0,598,600,1,0,0,0,599,597,
        1,0,0,0,600,601,5,26,0,0,601,602,3,64,32,0,602,603,5,1,0,0,603,604,
        3,94,47,0,604,606,1,0,0,0,605,579,1,0,0,0,605,591,1,0,0,0,606,103,
        1,0,0,0,607,608,3,106,53,0,608,609,5,1,0,0,609,610,3,108,54,0,610,
        105,1,0,0,0,611,612,7,12,0,0,612,107,1,0,0,0,613,623,3,100,50,0,
        614,619,3,64,32,0,615,616,5,2,0,0,616,618,3,64,32,0,617,615,1,0,
        0,0,618,621,1,0,0,0,619,617,1,0,0,0,619,620,1,0,0,0,620,623,1,0,
        0,0,621,619,1,0,0,0,622,613,1,0,0,0,622,614,1,0,0,0,623,109,1,0,
        0,0,624,627,5,57,0,0,625,628,5,58,0,0,626,628,3,64,32,0,627,625,
        1,0,0,0,627,626,1,0,0,0,628,631,1,0,0,0,629,631,5,57,0,0,630,624,
        1,0,0,0,630,629,1,0,0,0,631,111,1,0,0,0,632,636,5,14,0,0,633,635,
        3,110,55,0,634,633,1,0,0,0,635,638,1,0,0,0,636,634,1,0,0,0,636,637,
        1,0,0,0,637,113,1,0,0,0,638,636,1,0,0,0,639,650,5,5,0,0,640,645,
        3,64,32,0,641,642,5,2,0,0,642,644,3,64,32,0,643,641,1,0,0,0,644,
        647,1,0,0,0,645,643,1,0,0,0,645,646,1,0,0,0,646,649,1,0,0,0,647,
        645,1,0,0,0,648,640,1,0,0,0,649,652,1,0,0,0,650,648,1,0,0,0,650,
        651,1,0,0,0,651,653,1,0,0,0,652,650,1,0,0,0,653,654,5,6,0,0,654,
        115,1,0,0,0,655,658,5,19,0,0,656,659,5,57,0,0,657,659,3,64,32,0,
        658,656,1,0,0,0,658,657,1,0,0,0,659,117,1,0,0,0,660,661,5,24,0,0,
        661,662,5,57,0,0,662,119,1,0,0,0,663,664,7,13,0,0,664,665,5,1,0,
        0,665,666,3,10,5,0,666,121,1,0,0,0,667,668,5,29,0,0,668,669,3,64,
        32,0,669,670,5,1,0,0,670,674,3,10,5,0,671,673,3,124,62,0,672,671,
        1,0,0,0,673,676,1,0,0,0,674,672,1,0,0,0,674,675,1,0,0,0,675,678,
        1,0,0,0,676,674,1,0,0,0,677,679,3,126,63,0,678,677,1,0,0,0,678,679,
        1,0,0,0,679,123,1,0,0,0,680,681,5,30,0,0,681,682,5,29,0,0,682,683,
        3,64,32,0,683,684,5,1,0,0,684,685,3,10,5,0,685,125,1,0,0,0,686,687,
        5,30,0,0,687,688,5,1,0,0,688,689,3,10,5,0,689,127,1,0,0,0,690,691,
        5,27,0,0,691,692,3,64,32,0,692,693,5,1,0,0,693,694,3,10,5,0,694,
        129,1,0,0,0,695,696,5,25,0,0,696,701,5,57,0,0,697,698,5,2,0,0,698,
        700,5,57,0,0,699,697,1,0,0,0,700,703,1,0,0,0,701,699,1,0,0,0,701,
        702,1,0,0,0,702,704,1,0,0,0,703,701,1,0,0,0,704,705,5,26,0,0,705,
        706,3,64,32,0,706,707,5,1,0,0,707,708,3,10,5,0,708,131,1,0,0,0,709,
        710,5,52,0,0,710,711,5,57,0,0,711,133,1,0,0,0,78,136,138,143,145,
        162,169,173,181,187,189,203,205,220,224,229,233,241,254,265,273,
        275,286,296,298,304,309,315,319,325,343,350,358,361,379,389,409,
        411,419,427,435,437,443,450,459,471,474,480,485,489,497,500,506,
        509,513,529,531,539,541,550,563,565,573,575,581,589,597,605,619,
        622,627,630,636,645,650,658,674,678,701
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!CircuitScriptParser.__ATN) {
            CircuitScriptParser.__ATN = new antlr.ATNDeserializer().deserialize(CircuitScriptParser._serializedATN);
        }

        return CircuitScriptParser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(CircuitScriptParser.literalNames, CircuitScriptParser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return CircuitScriptParser.vocabulary;
    }

    private static readonly decisionsToDFA = CircuitScriptParser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class ScriptContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public EOF(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.EOF, 0)!;
    }
    public import_expr(): Import_exprContext[];
    public import_expr(i: number): Import_exprContext | null;
    public import_expr(i?: number): Import_exprContext[] | Import_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Import_exprContext);
        }

        return this.getRuleContext(i, Import_exprContext);
    }
    public NEWLINE(): antlr.TerminalNode[];
    public NEWLINE(i: number): antlr.TerminalNode | null;
    public NEWLINE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(CircuitScriptParser.NEWLINE);
    	} else {
    		return this.getToken(CircuitScriptParser.NEWLINE, i);
    	}
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_script;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitScript) {
            return visitor.visitScript(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public graph_expressions(): Graph_expressionsContext | null {
        return this.getRuleContext(0, Graph_expressionsContext);
    }
    public assignment_expr(): Assignment_exprContext | null {
        return this.getRuleContext(0, Assignment_exprContext);
    }
    public operator_assignment_expr(): Operator_assignment_exprContext | null {
        return this.getRuleContext(0, Operator_assignment_exprContext);
    }
    public property_set_expr(): Property_set_exprContext | null {
        return this.getRuleContext(0, Property_set_exprContext);
    }
    public property_set_expr2(): Property_set_expr2Context | null {
        return this.getRuleContext(0, Property_set_expr2Context);
    }
    public double_dot_property_set_expr(): Double_dot_property_set_exprContext | null {
        return this.getRuleContext(0, Double_dot_property_set_exprContext);
    }
    public function_def_expr(): Function_def_exprContext | null {
        return this.getRuleContext(0, Function_def_exprContext);
    }
    public function_call_expr(): Function_call_exprContext | null {
        return this.getRuleContext(0, Function_call_exprContext);
    }
    public import_expr(): Import_exprContext | null {
        return this.getRuleContext(0, Import_exprContext);
    }
    public atom_expr(): Atom_exprContext | null {
        return this.getRuleContext(0, Atom_exprContext);
    }
    public frame_expr(): Frame_exprContext | null {
        return this.getRuleContext(0, Frame_exprContext);
    }
    public flow_expressions(): Flow_expressionsContext | null {
        return this.getRuleContext(0, Flow_expressionsContext);
    }
    public annotation_comment_expr(): Annotation_comment_exprContext | null {
        return this.getRuleContext(0, Annotation_comment_exprContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_expression;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitExpression) {
            return visitor.visitExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Flow_expressionsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public if_expr(): If_exprContext | null {
        return this.getRuleContext(0, If_exprContext);
    }
    public while_expr(): While_exprContext | null {
        return this.getRuleContext(0, While_exprContext);
    }
    public for_expr(): For_exprContext | null {
        return this.getRuleContext(0, For_exprContext);
    }
    public Break(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.Break, 0);
    }
    public Continue(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.Continue, 0);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_flow_expressions;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitFlow_expressions) {
            return visitor.visitFlow_expressions(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Graph_expressionsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public graph_linear_expression(): Graph_linear_expressionContext | null {
        return this.getRuleContext(0, Graph_linear_expressionContext);
    }
    public path_block(): Path_blockContext | null {
        return this.getRuleContext(0, Path_blockContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_graph_expressions;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitGraph_expressions) {
            return visitor.visitGraph_expressions(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Graph_linear_expressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public add_component_expr(): Add_component_exprContext | null {
        return this.getRuleContext(0, Add_component_exprContext);
    }
    public to_component_expr(): To_component_exprContext | null {
        return this.getRuleContext(0, To_component_exprContext);
    }
    public at_component_expr(): At_component_exprContext | null {
        return this.getRuleContext(0, At_component_exprContext);
    }
    public at_block(): At_blockContext | null {
        return this.getRuleContext(0, At_blockContext);
    }
    public wire_expr(): Wire_exprContext | null {
        return this.getRuleContext(0, Wire_exprContext);
    }
    public point_expr(): Point_exprContext | null {
        return this.getRuleContext(0, Point_exprContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_graph_linear_expression;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitGraph_linear_expression) {
            return visitor.visitGraph_linear_expression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Expressions_blockContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public NEWLINE(): antlr.TerminalNode[];
    public NEWLINE(i: number): antlr.TerminalNode | null;
    public NEWLINE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(CircuitScriptParser.NEWLINE);
    	} else {
    		return this.getToken(CircuitScriptParser.NEWLINE, i);
    	}
    }
    public INDENT(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.INDENT, 0)!;
    }
    public DEDENT(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.DEDENT, 0)!;
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_expressions_block;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitExpressions_block) {
            return visitor.visitExpressions_block(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Path_blockContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expressions_block(): Expressions_blockContext {
        return this.getRuleContext(0, Expressions_blockContext)!;
    }
    public Branch(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.Branch, 0);
    }
    public Join(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.Join, 0);
    }
    public Parallel(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.Parallel, 0);
    }
    public Point(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.Point, 0);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_path_block;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitPath_block) {
            return visitor.visitPath_block(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Property_set_expr2Context extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public atom_expr(): Atom_exprContext {
        return this.getRuleContext(0, Atom_exprContext)!;
    }
    public NEWLINE(): antlr.TerminalNode[];
    public NEWLINE(i: number): antlr.TerminalNode | null;
    public NEWLINE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(CircuitScriptParser.NEWLINE);
    	} else {
    		return this.getToken(CircuitScriptParser.NEWLINE, i);
    	}
    }
    public INDENT(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.INDENT, 0)!;
    }
    public DEDENT(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.DEDENT, 0)!;
    }
    public assignment_expr2(): Assignment_expr2Context[];
    public assignment_expr2(i: number): Assignment_expr2Context | null;
    public assignment_expr2(i?: number): Assignment_expr2Context[] | Assignment_expr2Context | null {
        if (i === undefined) {
            return this.getRuleContexts(Assignment_expr2Context);
        }

        return this.getRuleContext(i, Assignment_expr2Context);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_property_set_expr2;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitProperty_set_expr2) {
            return visitor.visitProperty_set_expr2(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Assignment_expr2Context extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public value_expr(): Value_exprContext {
        return this.getRuleContext(0, Value_exprContext)!;
    }
    public ID(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.ID, 0);
    }
    public INTEGER_VALUE(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.INTEGER_VALUE, 0);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_assignment_expr2;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitAssignment_expr2) {
            return visitor.visitAssignment_expr2(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Pin_select_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Pin(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Pin, 0)!;
    }
    public data_expr(): Data_exprContext {
        return this.getRuleContext(0, Data_exprContext)!;
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_pin_select_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitPin_select_expr) {
            return visitor.visitPin_select_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Component_modifier_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ID(): antlr.TerminalNode[];
    public ID(i: number): antlr.TerminalNode | null;
    public ID(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(CircuitScriptParser.ID);
    	} else {
    		return this.getToken(CircuitScriptParser.ID, i);
    	}
    }
    public value_expr(): Value_exprContext | null {
        return this.getRuleContext(0, Value_exprContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_component_modifier_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitComponent_modifier_expr) {
            return visitor.visitComponent_modifier_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Data_expr_with_assignmentContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public data_expr(): Data_exprContext | null {
        return this.getRuleContext(0, Data_exprContext);
    }
    public assignment_expr(): Assignment_exprContext | null {
        return this.getRuleContext(0, Assignment_exprContext);
    }
    public component_modifier_expr(): Component_modifier_exprContext[];
    public component_modifier_expr(i: number): Component_modifier_exprContext | null;
    public component_modifier_expr(i?: number): Component_modifier_exprContext[] | Component_modifier_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Component_modifier_exprContext);
        }

        return this.getRuleContext(i, Component_modifier_exprContext);
    }
    public pin_select_expr(): Pin_select_exprContext | null {
        return this.getRuleContext(0, Pin_select_exprContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_data_expr_with_assignment;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitData_expr_with_assignment) {
            return visitor.visitData_expr_with_assignment(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Add_component_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Add(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Add, 0)!;
    }
    public data_expr_with_assignment(): Data_expr_with_assignmentContext {
        return this.getRuleContext(0, Data_expr_with_assignmentContext)!;
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_add_component_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitAdd_component_expr) {
            return visitor.visitAdd_component_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Component_select_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public data_expr_with_assignment(): Data_expr_with_assignmentContext | null {
        return this.getRuleContext(0, Data_expr_with_assignmentContext);
    }
    public pin_select_expr(): Pin_select_exprContext | null {
        return this.getRuleContext(0, Pin_select_exprContext);
    }
    public Point(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.Point, 0);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_component_select_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitComponent_select_expr) {
            return visitor.visitComponent_select_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Pin_select_expr2Context extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public INTEGER_VALUE(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.INTEGER_VALUE, 0);
    }
    public STRING_VALUE(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.STRING_VALUE, 0);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_pin_select_expr2;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitPin_select_expr2) {
            return visitor.visitPin_select_expr2(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class At_component_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public At(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.At, 0)!;
    }
    public component_select_expr(): Component_select_exprContext {
        return this.getRuleContext(0, Component_select_exprContext)!;
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_at_component_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitAt_component_expr) {
            return visitor.visitAt_component_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class To_component_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public To(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.To, 0)!;
    }
    public component_select_expr(): Component_select_exprContext[];
    public component_select_expr(i: number): Component_select_exprContext | null;
    public component_select_expr(i?: number): Component_select_exprContext[] | Component_select_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Component_select_exprContext);
        }

        return this.getRuleContext(i, Component_select_exprContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_to_component_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitTo_component_expr) {
            return visitor.visitTo_component_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class At_to_multiple_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public At(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.At, 0)!;
    }
    public component_select_expr(): Component_select_exprContext[];
    public component_select_expr(i: number): Component_select_exprContext | null;
    public component_select_expr(i?: number): Component_select_exprContext[] | Component_select_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Component_select_exprContext);
        }

        return this.getRuleContext(i, Component_select_exprContext);
    }
    public To(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.To, 0)!;
    }
    public NEWLINE(): antlr.TerminalNode[];
    public NEWLINE(i: number): antlr.TerminalNode | null;
    public NEWLINE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(CircuitScriptParser.NEWLINE);
    	} else {
    		return this.getToken(CircuitScriptParser.NEWLINE, i);
    	}
    }
    public INDENT(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.INDENT, 0)!;
    }
    public DEDENT(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.DEDENT, 0)!;
    }
    public at_to_multiple_line_expr(): At_to_multiple_line_exprContext[];
    public at_to_multiple_line_expr(i: number): At_to_multiple_line_exprContext | null;
    public at_to_multiple_line_expr(i?: number): At_to_multiple_line_exprContext[] | At_to_multiple_line_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(At_to_multiple_line_exprContext);
        }

        return this.getRuleContext(i, At_to_multiple_line_exprContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_at_to_multiple_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitAt_to_multiple_expr) {
            return visitor.visitAt_to_multiple_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class At_to_multiple_line_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public pin_select_expr2(): Pin_select_expr2Context {
        return this.getRuleContext(0, Pin_select_expr2Context)!;
    }
    public at_to_multiple_line_expr_to_pin(): At_to_multiple_line_expr_to_pinContext[];
    public at_to_multiple_line_expr_to_pin(i: number): At_to_multiple_line_expr_to_pinContext | null;
    public at_to_multiple_line_expr_to_pin(i?: number): At_to_multiple_line_expr_to_pinContext[] | At_to_multiple_line_expr_to_pinContext | null {
        if (i === undefined) {
            return this.getRuleContexts(At_to_multiple_line_expr_to_pinContext);
        }

        return this.getRuleContext(i, At_to_multiple_line_expr_to_pinContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_at_to_multiple_line_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitAt_to_multiple_line_expr) {
            return visitor.visitAt_to_multiple_line_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class At_to_multiple_line_expr_to_pinContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public INTEGER_VALUE(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.INTEGER_VALUE, 0);
    }
    public NOT_CONNECTED(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.NOT_CONNECTED, 0);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_at_to_multiple_line_expr_to_pin;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitAt_to_multiple_line_expr_to_pin) {
            return visitor.visitAt_to_multiple_line_expr_to_pin(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class At_blockContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public at_block_header(): At_block_headerContext {
        return this.getRuleContext(0, At_block_headerContext)!;
    }
    public NEWLINE(): antlr.TerminalNode[];
    public NEWLINE(i: number): antlr.TerminalNode | null;
    public NEWLINE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(CircuitScriptParser.NEWLINE);
    	} else {
    		return this.getToken(CircuitScriptParser.NEWLINE, i);
    	}
    }
    public INDENT(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.INDENT, 0)!;
    }
    public DEDENT(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.DEDENT, 0)!;
    }
    public at_block_expressions(): At_block_expressionsContext[];
    public at_block_expressions(i: number): At_block_expressionsContext | null;
    public at_block_expressions(i?: number): At_block_expressionsContext[] | At_block_expressionsContext | null {
        if (i === undefined) {
            return this.getRuleContexts(At_block_expressionsContext);
        }

        return this.getRuleContext(i, At_block_expressionsContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_at_block;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitAt_block) {
            return visitor.visitAt_block(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class At_block_expressionsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public at_block_pin_expr(): At_block_pin_exprContext | null {
        return this.getRuleContext(0, At_block_pin_exprContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_at_block_expressions;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitAt_block_expressions) {
            return visitor.visitAt_block_expressions(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class At_block_headerContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public at_component_expr(): At_component_exprContext {
        return this.getRuleContext(0, At_component_exprContext)!;
    }
    public annotation_comment_expr(): Annotation_comment_exprContext | null {
        return this.getRuleContext(0, Annotation_comment_exprContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_at_block_header;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitAt_block_header) {
            return visitor.visitAt_block_header(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class At_block_pin_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public pin_select_expr2(): Pin_select_expr2Context {
        return this.getRuleContext(0, Pin_select_expr2Context)!;
    }
    public at_block_pin_expression_simple(): At_block_pin_expression_simpleContext | null {
        return this.getRuleContext(0, At_block_pin_expression_simpleContext);
    }
    public at_block_pin_expression_complex(): At_block_pin_expression_complexContext | null {
        return this.getRuleContext(0, At_block_pin_expression_complexContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_at_block_pin_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitAt_block_pin_expr) {
            return visitor.visitAt_block_pin_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class At_block_pin_expression_simpleContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public NOT_CONNECTED(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.NOT_CONNECTED, 0);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_at_block_pin_expression_simple;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitAt_block_pin_expression_simple) {
            return visitor.visitAt_block_pin_expression_simple(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class At_block_pin_expression_complexContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expressions_block(): Expressions_blockContext {
        return this.getRuleContext(0, Expressions_blockContext)!;
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_at_block_pin_expression_complex;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitAt_block_pin_expression_complex) {
            return visitor.visitAt_block_pin_expression_complex(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Assignment_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public data_expr(): Data_exprContext {
        return this.getRuleContext(0, Data_exprContext)!;
    }
    public atom_expr(): Atom_exprContext | null {
        return this.getRuleContext(0, Atom_exprContext);
    }
    public function_call_expr(): Function_call_exprContext | null {
        return this.getRuleContext(0, Function_call_exprContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_assignment_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitAssignment_expr) {
            return visitor.visitAssignment_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Operator_assignment_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public atom_expr(): Atom_exprContext {
        return this.getRuleContext(0, Atom_exprContext)!;
    }
    public data_expr(): Data_exprContext {
        return this.getRuleContext(0, Data_exprContext)!;
    }
    public AdditionAssign(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.AdditionAssign, 0);
    }
    public MinusAssign(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.MinusAssign, 0);
    }
    public MultiplyAssign(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.MultiplyAssign, 0);
    }
    public DivideAssign(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.DivideAssign, 0);
    }
    public ModulusAssign(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.ModulusAssign, 0);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_operator_assignment_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitOperator_assignment_expr) {
            return visitor.visitOperator_assignment_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Keyword_assignment_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.ID, 0)!;
    }
    public data_expr(): Data_exprContext {
        return this.getRuleContext(0, Data_exprContext)!;
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_keyword_assignment_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitKeyword_assignment_expr) {
            return visitor.visitKeyword_assignment_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ParametersContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public data_expr(): Data_exprContext[];
    public data_expr(i: number): Data_exprContext | null;
    public data_expr(i?: number): Data_exprContext[] | Data_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Data_exprContext);
        }

        return this.getRuleContext(i, Data_exprContext);
    }
    public keyword_assignment_expr(): Keyword_assignment_exprContext[];
    public keyword_assignment_expr(i: number): Keyword_assignment_exprContext | null;
    public keyword_assignment_expr(i?: number): Keyword_assignment_exprContext[] | Keyword_assignment_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Keyword_assignment_exprContext);
        }

        return this.getRuleContext(i, Keyword_assignment_exprContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_parameters;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitParameters) {
            return visitor.visitParameters(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Property_set_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public atom_expr(): Atom_exprContext {
        return this.getRuleContext(0, Atom_exprContext)!;
    }
    public data_expr(): Data_exprContext {
        return this.getRuleContext(0, Data_exprContext)!;
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_property_set_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitProperty_set_expr) {
            return visitor.visitProperty_set_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Double_dot_property_set_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.ID, 0)!;
    }
    public data_expr(): Data_exprContext {
        return this.getRuleContext(0, Data_exprContext)!;
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_double_dot_property_set_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitDouble_dot_property_set_expr) {
            return visitor.visitDouble_dot_property_set_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Data_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_data_expr;
    }
    public override copyFrom(ctx: Data_exprContext): void {
        super.copyFrom(ctx);
    }
}
export class ArrayExprContext extends Data_exprContext {
    public constructor(ctx: Data_exprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public array_expr(): Array_exprContext {
        return this.getRuleContext(0, Array_exprContext)!;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitArrayExpr) {
            return visitor.visitArrayExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class ArrayIndexExprContext extends Data_exprContext {
    public constructor(ctx: Data_exprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public data_expr(): Data_exprContext[];
    public data_expr(i: number): Data_exprContext | null;
    public data_expr(i?: number): Data_exprContext[] | Data_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Data_exprContext);
        }

        return this.getRuleContext(i, Data_exprContext);
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitArrayIndexExpr) {
            return visitor.visitArrayIndexExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class FunctionCallExprContext extends Data_exprContext {
    public constructor(ctx: Data_exprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public function_call_expr(): Function_call_exprContext {
        return this.getRuleContext(0, Function_call_exprContext)!;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitFunctionCallExpr) {
            return visitor.visitFunctionCallExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class AdditionExprContext extends Data_exprContext {
    public constructor(ctx: Data_exprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public data_expr(): Data_exprContext[];
    public data_expr(i: number): Data_exprContext | null;
    public data_expr(i?: number): Data_exprContext[] | Data_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Data_exprContext);
        }

        return this.getRuleContext(i, Data_exprContext);
    }
    public Addition(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.Addition, 0);
    }
    public Minus(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.Minus, 0);
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitAdditionExpr) {
            return visitor.visitAdditionExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class MultiplyExprContext extends Data_exprContext {
    public constructor(ctx: Data_exprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public data_expr(): Data_exprContext[];
    public data_expr(i: number): Data_exprContext | null;
    public data_expr(i?: number): Data_exprContext[] | Data_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Data_exprContext);
        }

        return this.getRuleContext(i, Data_exprContext);
    }
    public Multiply(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.Multiply, 0);
    }
    public Divide(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.Divide, 0);
    }
    public Modulus(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.Modulus, 0);
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitMultiplyExpr) {
            return visitor.visitMultiplyExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class LogicalOperatorExprContext extends Data_exprContext {
    public constructor(ctx: Data_exprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public data_expr(): Data_exprContext[];
    public data_expr(i: number): Data_exprContext | null;
    public data_expr(i?: number): Data_exprContext[] | Data_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Data_exprContext);
        }

        return this.getRuleContext(i, Data_exprContext);
    }
    public LogicalAnd(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.LogicalAnd, 0);
    }
    public LogicalOr(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.LogicalOr, 0);
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitLogicalOperatorExpr) {
            return visitor.visitLogicalOperatorExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class DataExprContext extends Data_exprContext {
    public constructor(ctx: Data_exprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public create_component_expr(): Create_component_exprContext | null {
        return this.getRuleContext(0, Create_component_exprContext);
    }
    public create_graphic_expr(): Create_graphic_exprContext | null {
        return this.getRuleContext(0, Create_graphic_exprContext);
    }
    public create_module_expr(): Create_module_exprContext | null {
        return this.getRuleContext(0, Create_module_exprContext);
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitDataExpr) {
            return visitor.visitDataExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class UnaryOperatorExprContext extends Data_exprContext {
    public constructor(ctx: Data_exprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public unary_operator(): Unary_operatorContext {
        return this.getRuleContext(0, Unary_operatorContext)!;
    }
    public data_expr(): Data_exprContext {
        return this.getRuleContext(0, Data_exprContext)!;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitUnaryOperatorExpr) {
            return visitor.visitUnaryOperatorExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class ValueAtomExprContext extends Data_exprContext {
    public constructor(ctx: Data_exprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public value_expr(): Value_exprContext | null {
        return this.getRuleContext(0, Value_exprContext);
    }
    public atom_expr(): Atom_exprContext | null {
        return this.getRuleContext(0, Atom_exprContext);
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitValueAtomExpr) {
            return visitor.visitValueAtomExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class BinaryOperatorExprContext extends Data_exprContext {
    public constructor(ctx: Data_exprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public data_expr(): Data_exprContext[];
    public data_expr(i: number): Data_exprContext | null;
    public data_expr(i?: number): Data_exprContext[] | Data_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Data_exprContext);
        }

        return this.getRuleContext(i, Data_exprContext);
    }
    public binary_operator(): Binary_operatorContext {
        return this.getRuleContext(0, Binary_operatorContext)!;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitBinaryOperatorExpr) {
            return visitor.visitBinaryOperatorExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class RoundedBracketsExprContext extends Data_exprContext {
    public constructor(ctx: Data_exprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public OPEN_PAREN(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.OPEN_PAREN, 0)!;
    }
    public data_expr(): Data_exprContext {
        return this.getRuleContext(0, Data_exprContext)!;
    }
    public CLOSE_PAREN(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.CLOSE_PAREN, 0)!;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitRoundedBracketsExpr) {
            return visitor.visitRoundedBracketsExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Binary_operatorContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Equals(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.Equals, 0);
    }
    public NotEquals(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.NotEquals, 0);
    }
    public GreaterThan(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.GreaterThan, 0);
    }
    public GreatOrEqualThan(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.GreatOrEqualThan, 0);
    }
    public LessThan(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.LessThan, 0);
    }
    public LessOrEqualThan(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.LessOrEqualThan, 0);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_binary_operator;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitBinary_operator) {
            return visitor.visitBinary_operator(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Unary_operatorContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Not(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.Not, 0);
    }
    public Minus(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.Minus, 0);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_unary_operator;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitUnary_operator) {
            return visitor.visitUnary_operator(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Value_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public NUMERIC_VALUE(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.NUMERIC_VALUE, 0);
    }
    public DECIMAL_VALUE(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.DECIMAL_VALUE, 0);
    }
    public INTEGER_VALUE(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.INTEGER_VALUE, 0);
    }
    public STRING_VALUE(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.STRING_VALUE, 0);
    }
    public PERCENTAGE_VALUE(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.PERCENTAGE_VALUE, 0);
    }
    public BOOLEAN_VALUE(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.BOOLEAN_VALUE, 0);
    }
    public Minus(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.Minus, 0);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_value_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitValue_expr) {
            return visitor.visitValue_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Function_def_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Define(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Define, 0)!;
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.ID, 0)!;
    }
    public OPEN_PAREN(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.OPEN_PAREN, 0)!;
    }
    public CLOSE_PAREN(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.CLOSE_PAREN, 0)!;
    }
    public NEWLINE(): antlr.TerminalNode[];
    public NEWLINE(i: number): antlr.TerminalNode | null;
    public NEWLINE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(CircuitScriptParser.NEWLINE);
    	} else {
    		return this.getToken(CircuitScriptParser.NEWLINE, i);
    	}
    }
    public INDENT(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.INDENT, 0)!;
    }
    public DEDENT(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.DEDENT, 0)!;
    }
    public function_args_expr(): Function_args_exprContext | null {
        return this.getRuleContext(0, Function_args_exprContext);
    }
    public function_expr(): Function_exprContext[];
    public function_expr(i: number): Function_exprContext | null;
    public function_expr(i?: number): Function_exprContext[] | Function_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Function_exprContext);
        }

        return this.getRuleContext(i, Function_exprContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_function_def_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitFunction_def_expr) {
            return visitor.visitFunction_def_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Function_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public function_return_expr(): Function_return_exprContext | null {
        return this.getRuleContext(0, Function_return_exprContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_function_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitFunction_expr) {
            return visitor.visitFunction_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Function_args_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ID(): antlr.TerminalNode[];
    public ID(i: number): antlr.TerminalNode | null;
    public ID(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(CircuitScriptParser.ID);
    	} else {
    		return this.getToken(CircuitScriptParser.ID, i);
    	}
    }
    public value_expr(): Value_exprContext[];
    public value_expr(i: number): Value_exprContext | null;
    public value_expr(i?: number): Value_exprContext[] | Value_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Value_exprContext);
        }

        return this.getRuleContext(i, Value_exprContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_function_args_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitFunction_args_expr) {
            return visitor.visitFunction_args_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Atom_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.ID, 0)!;
    }
    public trailer_expr2(): Trailer_expr2Context[];
    public trailer_expr2(i: number): Trailer_expr2Context | null;
    public trailer_expr2(i?: number): Trailer_expr2Context[] | Trailer_expr2Context | null {
        if (i === undefined) {
            return this.getRuleContexts(Trailer_expr2Context);
        }

        return this.getRuleContext(i, Trailer_expr2Context);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_atom_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitAtom_expr) {
            return visitor.visitAtom_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Trailer_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public OPEN_PAREN(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.OPEN_PAREN, 0);
    }
    public CLOSE_PAREN(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.CLOSE_PAREN, 0);
    }
    public parameters(): ParametersContext | null {
        return this.getRuleContext(0, ParametersContext);
    }
    public trailer_expr2(): Trailer_expr2Context | null {
        return this.getRuleContext(0, Trailer_expr2Context);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_trailer_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitTrailer_expr) {
            return visitor.visitTrailer_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Trailer_expr2Context extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ID(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.ID, 0);
    }
    public data_expr(): Data_exprContext | null {
        return this.getRuleContext(0, Data_exprContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_trailer_expr2;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitTrailer_expr2) {
            return visitor.visitTrailer_expr2(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Function_call_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.ID, 0)!;
    }
    public net_namespace_expr(): Net_namespace_exprContext | null {
        return this.getRuleContext(0, Net_namespace_exprContext);
    }
    public trailer_expr(): Trailer_exprContext[];
    public trailer_expr(i: number): Trailer_exprContext | null;
    public trailer_expr(i?: number): Trailer_exprContext[] | Trailer_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Trailer_exprContext);
        }

        return this.getRuleContext(i, Trailer_exprContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_function_call_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitFunction_call_expr) {
            return visitor.visitFunction_call_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Net_namespace_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Divide(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Divide, 0)!;
    }
    public Addition(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.Addition, 0);
    }
    public data_expr(): Data_exprContext | null {
        return this.getRuleContext(0, Data_exprContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_net_namespace_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitNet_namespace_expr) {
            return visitor.visitNet_namespace_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Function_return_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Return(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Return, 0)!;
    }
    public data_expr(): Data_exprContext {
        return this.getRuleContext(0, Data_exprContext)!;
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_function_return_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitFunction_return_expr) {
            return visitor.visitFunction_return_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Property_block_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public property_key_expr(): Property_key_exprContext {
        return this.getRuleContext(0, Property_key_exprContext)!;
    }
    public expressions_block(): Expressions_blockContext {
        return this.getRuleContext(0, Expressions_blockContext)!;
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_property_block_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitProperty_block_expr) {
            return visitor.visitProperty_block_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Create_component_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Create(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Create, 0)!;
    }
    public Component(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Component, 0)!;
    }
    public NEWLINE(): antlr.TerminalNode[];
    public NEWLINE(i: number): antlr.TerminalNode | null;
    public NEWLINE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(CircuitScriptParser.NEWLINE);
    	} else {
    		return this.getToken(CircuitScriptParser.NEWLINE, i);
    	}
    }
    public INDENT(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.INDENT, 0)!;
    }
    public DEDENT(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.DEDENT, 0)!;
    }
    public property_expr(): Property_exprContext[];
    public property_expr(i: number): Property_exprContext | null;
    public property_expr(i?: number): Property_exprContext[] | Property_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Property_exprContext);
        }

        return this.getRuleContext(i, Property_exprContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_create_component_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitCreate_component_expr) {
            return visitor.visitCreate_component_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Graphic_expressions_blockContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public NEWLINE(): antlr.TerminalNode[];
    public NEWLINE(i: number): antlr.TerminalNode | null;
    public NEWLINE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(CircuitScriptParser.NEWLINE);
    	} else {
    		return this.getToken(CircuitScriptParser.NEWLINE, i);
    	}
    }
    public INDENT(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.INDENT, 0)!;
    }
    public DEDENT(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.DEDENT, 0)!;
    }
    public graphic_expr(): Graphic_exprContext[];
    public graphic_expr(i: number): Graphic_exprContext | null;
    public graphic_expr(i?: number): Graphic_exprContext[] | Graphic_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Graphic_exprContext);
        }

        return this.getRuleContext(i, Graphic_exprContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_graphic_expressions_block;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitGraphic_expressions_block) {
            return visitor.visitGraphic_expressions_block(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Create_graphic_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Create(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Create, 0)!;
    }
    public Graphic(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Graphic, 0)!;
    }
    public graphic_expressions_block(): Graphic_expressions_blockContext {
        return this.getRuleContext(0, Graphic_expressions_blockContext)!;
    }
    public OPEN_PAREN(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.OPEN_PAREN, 0);
    }
    public ID(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.ID, 0);
    }
    public CLOSE_PAREN(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.CLOSE_PAREN, 0);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_create_graphic_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitCreate_graphic_expr) {
            return visitor.visitCreate_graphic_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Create_module_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Create(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Create, 0)!;
    }
    public Module(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Module, 0)!;
    }
    public NEWLINE(): antlr.TerminalNode[];
    public NEWLINE(i: number): antlr.TerminalNode | null;
    public NEWLINE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(CircuitScriptParser.NEWLINE);
    	} else {
    		return this.getToken(CircuitScriptParser.NEWLINE, i);
    	}
    }
    public INDENT(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.INDENT, 0)!;
    }
    public DEDENT(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.DEDENT, 0)!;
    }
    public property_expr(): Property_exprContext[];
    public property_expr(i: number): Property_exprContext | null;
    public property_expr(i?: number): Property_exprContext[] | Property_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Property_exprContext);
        }

        return this.getRuleContext(i, Property_exprContext);
    }
    public property_block_expr(): Property_block_exprContext[];
    public property_block_expr(i: number): Property_block_exprContext | null;
    public property_block_expr(i?: number): Property_block_exprContext[] | Property_block_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Property_block_exprContext);
        }

        return this.getRuleContext(i, Property_block_exprContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_create_module_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitCreate_module_expr) {
            return visitor.visitCreate_module_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Nested_properties_innerContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public NEWLINE(): antlr.TerminalNode[];
    public NEWLINE(i: number): antlr.TerminalNode | null;
    public NEWLINE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(CircuitScriptParser.NEWLINE);
    	} else {
    		return this.getToken(CircuitScriptParser.NEWLINE, i);
    	}
    }
    public INDENT(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.INDENT, 0);
    }
    public DEDENT(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.DEDENT, 0);
    }
    public property_expr(): Property_exprContext[];
    public property_expr(i: number): Property_exprContext | null;
    public property_expr(i?: number): Property_exprContext[] | Property_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Property_exprContext);
        }

        return this.getRuleContext(i, Property_exprContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_nested_properties_inner;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitNested_properties_inner) {
            return visitor.visitNested_properties_inner(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Graphic_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_graphic_expr;
    }
    public override copyFrom(ctx: Graphic_exprContext): void {
        super.copyFrom(ctx);
    }
}
export class GraphicCommandExprContext extends Graphic_exprContext {
    public _command?: Token | null;
    public constructor(ctx: Graphic_exprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public ID(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.ID, 0);
    }
    public Pin(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.Pin, 0);
    }
    public parameters(): ParametersContext | null {
        return this.getRuleContext(0, ParametersContext);
    }
    public OPEN_PAREN(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.OPEN_PAREN, 0);
    }
    public CLOSE_PAREN(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.CLOSE_PAREN, 0);
    }
    public nested_properties_inner(): Nested_properties_innerContext | null {
        return this.getRuleContext(0, Nested_properties_innerContext);
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitGraphicCommandExpr) {
            return visitor.visitGraphicCommandExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class GraphicForExprContext extends Graphic_exprContext {
    public constructor(ctx: Graphic_exprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public For(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.For, 0)!;
    }
    public ID(): antlr.TerminalNode[];
    public ID(i: number): antlr.TerminalNode | null;
    public ID(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(CircuitScriptParser.ID);
    	} else {
    		return this.getToken(CircuitScriptParser.ID, i);
    	}
    }
    public In(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.In, 0)!;
    }
    public data_expr(): Data_exprContext {
        return this.getRuleContext(0, Data_exprContext)!;
    }
    public graphic_expressions_block(): Graphic_expressions_blockContext {
        return this.getRuleContext(0, Graphic_expressions_blockContext)!;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitGraphicForExpr) {
            return visitor.visitGraphicForExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Property_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public property_key_expr(): Property_key_exprContext {
        return this.getRuleContext(0, Property_key_exprContext)!;
    }
    public property_value_expr(): Property_value_exprContext {
        return this.getRuleContext(0, Property_value_exprContext)!;
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_property_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitProperty_expr) {
            return visitor.visitProperty_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Property_key_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ID(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.ID, 0);
    }
    public INTEGER_VALUE(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.INTEGER_VALUE, 0);
    }
    public STRING_VALUE(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.STRING_VALUE, 0);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_property_key_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitProperty_key_expr) {
            return visitor.visitProperty_key_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Property_value_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_property_value_expr;
    }
    public override copyFrom(ctx: Property_value_exprContext): void {
        super.copyFrom(ctx);
    }
}
export class Single_line_propertyContext extends Property_value_exprContext {
    public constructor(ctx: Property_value_exprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public data_expr(): Data_exprContext[];
    public data_expr(i: number): Data_exprContext | null;
    public data_expr(i?: number): Data_exprContext[] | Data_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Data_exprContext);
        }

        return this.getRuleContext(i, Data_exprContext);
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitSingle_line_property) {
            return visitor.visitSingle_line_property(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class Nested_propertiesContext extends Property_value_exprContext {
    public constructor(ctx: Property_value_exprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public nested_properties_inner(): Nested_properties_innerContext {
        return this.getRuleContext(0, Nested_properties_innerContext)!;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitNested_properties) {
            return visitor.visitNested_properties(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Wire_atom_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_wire_atom_expr;
    }
    public override copyFrom(ctx: Wire_atom_exprContext): void {
        super.copyFrom(ctx);
    }
}
export class Wire_expr_direction_valueContext extends Wire_atom_exprContext {
    public constructor(ctx: Wire_atom_exprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.ID, 0)!;
    }
    public INTEGER_VALUE(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.INTEGER_VALUE, 0);
    }
    public data_expr(): Data_exprContext | null {
        return this.getRuleContext(0, Data_exprContext);
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitWire_expr_direction_value) {
            return visitor.visitWire_expr_direction_value(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class Wire_expr_direction_onlyContext extends Wire_atom_exprContext {
    public constructor(ctx: Wire_atom_exprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.ID, 0)!;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitWire_expr_direction_only) {
            return visitor.visitWire_expr_direction_only(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Wire_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Wire(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Wire, 0)!;
    }
    public wire_atom_expr(): Wire_atom_exprContext[];
    public wire_atom_expr(i: number): Wire_atom_exprContext | null;
    public wire_atom_expr(i?: number): Wire_atom_exprContext[] | Wire_atom_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Wire_atom_exprContext);
        }

        return this.getRuleContext(i, Wire_atom_exprContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_wire_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitWire_expr) {
            return visitor.visitWire_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Array_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public data_expr(): Data_exprContext[];
    public data_expr(i: number): Data_exprContext | null;
    public data_expr(i?: number): Data_exprContext[] | Data_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Data_exprContext);
        }

        return this.getRuleContext(i, Data_exprContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_array_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitArray_expr) {
            return visitor.visitArray_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Point_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Point(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Point, 0)!;
    }
    public ID(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.ID, 0);
    }
    public data_expr(): Data_exprContext | null {
        return this.getRuleContext(0, Data_exprContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_point_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitPoint_expr) {
            return visitor.visitPoint_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Import_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Import(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Import, 0)!;
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.ID, 0)!;
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_import_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitImport_expr) {
            return visitor.visitImport_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Frame_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expressions_block(): Expressions_blockContext {
        return this.getRuleContext(0, Expressions_blockContext)!;
    }
    public Frame(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.Frame, 0);
    }
    public Sheet(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.Sheet, 0);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_frame_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitFrame_expr) {
            return visitor.visitFrame_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class If_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public If(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.If, 0)!;
    }
    public data_expr(): Data_exprContext {
        return this.getRuleContext(0, Data_exprContext)!;
    }
    public expressions_block(): Expressions_blockContext {
        return this.getRuleContext(0, Expressions_blockContext)!;
    }
    public if_inner_expr(): If_inner_exprContext[];
    public if_inner_expr(i: number): If_inner_exprContext | null;
    public if_inner_expr(i?: number): If_inner_exprContext[] | If_inner_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(If_inner_exprContext);
        }

        return this.getRuleContext(i, If_inner_exprContext);
    }
    public else_expr(): Else_exprContext | null {
        return this.getRuleContext(0, Else_exprContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_if_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitIf_expr) {
            return visitor.visitIf_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class If_inner_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Else(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Else, 0)!;
    }
    public If(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.If, 0)!;
    }
    public data_expr(): Data_exprContext {
        return this.getRuleContext(0, Data_exprContext)!;
    }
    public expressions_block(): Expressions_blockContext {
        return this.getRuleContext(0, Expressions_blockContext)!;
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_if_inner_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitIf_inner_expr) {
            return visitor.visitIf_inner_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Else_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Else(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Else, 0)!;
    }
    public expressions_block(): Expressions_blockContext {
        return this.getRuleContext(0, Expressions_blockContext)!;
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_else_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitElse_expr) {
            return visitor.visitElse_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class While_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public While(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.While, 0)!;
    }
    public data_expr(): Data_exprContext {
        return this.getRuleContext(0, Data_exprContext)!;
    }
    public expressions_block(): Expressions_blockContext {
        return this.getRuleContext(0, Expressions_blockContext)!;
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_while_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitWhile_expr) {
            return visitor.visitWhile_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class For_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public For(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.For, 0)!;
    }
    public ID(): antlr.TerminalNode[];
    public ID(i: number): antlr.TerminalNode | null;
    public ID(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(CircuitScriptParser.ID);
    	} else {
    		return this.getToken(CircuitScriptParser.ID, i);
    	}
    }
    public In(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.In, 0)!;
    }
    public data_expr(): Data_exprContext {
        return this.getRuleContext(0, Data_exprContext)!;
    }
    public expressions_block(): Expressions_blockContext {
        return this.getRuleContext(0, Expressions_blockContext)!;
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_for_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitFor_expr) {
            return visitor.visitFor_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Annotation_comment_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ANNOTATION_START(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.ANNOTATION_START, 0)!;
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.ID, 0)!;
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_annotation_comment_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitAnnotation_comment_expr) {
            return visitor.visitAnnotation_comment_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
