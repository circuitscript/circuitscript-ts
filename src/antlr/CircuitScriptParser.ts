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
    public static readonly T__7 = 8;
    public static readonly Break = 9;
    public static readonly Branch = 10;
    public static readonly Create = 11;
    public static readonly Component = 12;
    public static readonly Graphic = 13;
    public static readonly Module = 14;
    public static readonly Wire = 15;
    public static readonly Pin = 16;
    public static readonly Add = 17;
    public static readonly At = 18;
    public static readonly To = 19;
    public static readonly Point = 20;
    public static readonly Join = 21;
    public static readonly Parallel = 22;
    public static readonly Return = 23;
    public static readonly Define = 24;
    public static readonly Import = 25;
    public static readonly From = 26;
    public static readonly For = 27;
    public static readonly In = 28;
    public static readonly While = 29;
    public static readonly Continue = 30;
    public static readonly If = 31;
    public static readonly Else = 32;
    public static readonly Not = 33;
    public static readonly Frame = 34;
    public static readonly Sheet = 35;
    public static readonly Equals = 36;
    public static readonly NotEquals = 37;
    public static readonly GreaterThan = 38;
    public static readonly GreatOrEqualThan = 39;
    public static readonly LessThan = 40;
    public static readonly LessOrEqualThan = 41;
    public static readonly LogicalAnd = 42;
    public static readonly LogicalOr = 43;
    public static readonly Addition = 44;
    public static readonly Minus = 45;
    public static readonly Divide = 46;
    public static readonly Multiply = 47;
    public static readonly Modulus = 48;
    public static readonly AdditionAssign = 49;
    public static readonly MinusAssign = 50;
    public static readonly DivideAssign = 51;
    public static readonly MultiplyAssign = 52;
    public static readonly ModulusAssign = 53;
    public static readonly OPEN_PAREN = 54;
    public static readonly CLOSE_PAREN = 55;
    public static readonly NOT_CONNECTED = 56;
    public static readonly BOOLEAN_VALUE = 57;
    public static readonly ID = 58;
    public static readonly ANNOTATION_START = 59;
    public static readonly INTEGER_VALUE = 60;
    public static readonly DECIMAL_VALUE = 61;
    public static readonly NUMERIC_VALUE = 62;
    public static readonly STRING_VALUE = 63;
    public static readonly PERCENTAGE_VALUE = 64;
    public static readonly WS = 65;
    public static readonly NEWLINE = 66;
    public static readonly COMMENT = 67;
    public static readonly INDENT = 68;
    public static readonly DEDENT = 69;
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
    public static readonly RULE_import_annotation_expr = 60;
    public static readonly RULE_frame_expr = 61;
    public static readonly RULE_if_expr = 62;
    public static readonly RULE_if_inner_expr = 63;
    public static readonly RULE_else_expr = 64;
    public static readonly RULE_while_expr = 65;
    public static readonly RULE_for_expr = 66;
    public static readonly RULE_part_set_expr = 67;
    public static readonly RULE_part_set_key = 68;
    public static readonly RULE_part_match_block = 69;
    public static readonly RULE_part_sub_expr = 70;
    public static readonly RULE_part_condition_expr = 71;
    public static readonly RULE_part_condition_key_only_expr = 72;
    public static readonly RULE_part_value_expr = 73;
    public static readonly RULE_annotation_comment_expr = 74;

    public static readonly literalNames = [
        null, "':'", "','", "'='", "'..'", "'['", "']'", "'.'", "'set'", 
        "'break'", "'branch'", "'create'", "'component'", "'graphic'", "'module'", 
        "'wire'", "'pin'", "'add'", "'at'", "'to'", "'point'", "'join'", 
        "'parallel'", "'return'", "'def'", "'import'", "'from'", "'for'", 
        "'in'", "'while'", "'continue'", "'if'", "'else'", null, "'frame'", 
        "'sheet'", "'=='", "'!='", "'>'", "'>='", "'<'", "'<='", null, null, 
        "'+'", "'-'", "'/'", "'*'", "'%'", "'+='", "'-='", "'/='", "'*='", 
        "'%='", "'('", "')'", null, null, null, "'#='"
    ];

    public static readonly symbolicNames = [
        null, null, null, null, null, null, null, null, null, "Break", "Branch", 
        "Create", "Component", "Graphic", "Module", "Wire", "Pin", "Add", 
        "At", "To", "Point", "Join", "Parallel", "Return", "Define", "Import", 
        "From", "For", "In", "While", "Continue", "If", "Else", "Not", "Frame", 
        "Sheet", "Equals", "NotEquals", "GreaterThan", "GreatOrEqualThan", 
        "LessThan", "LessOrEqualThan", "LogicalAnd", "LogicalOr", "Addition", 
        "Minus", "Divide", "Multiply", "Modulus", "AdditionAssign", "MinusAssign", 
        "DivideAssign", "MultiplyAssign", "ModulusAssign", "OPEN_PAREN", 
        "CLOSE_PAREN", "NOT_CONNECTED", "BOOLEAN_VALUE", "ID", "ANNOTATION_START", 
        "INTEGER_VALUE", "DECIMAL_VALUE", "NUMERIC_VALUE", "STRING_VALUE", 
        "PERCENTAGE_VALUE", "WS", "NEWLINE", "COMMENT", "INDENT", "DEDENT"
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
        "point_expr", "import_expr", "import_annotation_expr", "frame_expr", 
        "if_expr", "if_inner_expr", "else_expr", "while_expr", "for_expr", 
        "part_set_expr", "part_set_key", "part_match_block", "part_sub_expr", 
        "part_condition_expr", "part_condition_key_only_expr", "part_value_expr", 
        "annotation_comment_expr",
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
            this.state = 154;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 1, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    this.state = 152;
                    this.errorHandler.sync(this);
                    switch (this.tokenStream.LA(1)) {
                    case CircuitScriptParser.Import:
                    case CircuitScriptParser.From:
                        {
                        this.state = 150;
                        this.import_expr();
                        }
                        break;
                    case CircuitScriptParser.NEWLINE:
                        {
                        this.state = 151;
                        this.match(CircuitScriptParser.NEWLINE);
                        }
                        break;
                    default:
                        throw new antlr.NoViableAltException(this);
                    }
                    }
                }
                this.state = 156;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 1, this.context);
            }
            this.state = 159;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 159;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.T__3:
                case CircuitScriptParser.T__7:
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
                case CircuitScriptParser.For:
                case CircuitScriptParser.While:
                case CircuitScriptParser.Continue:
                case CircuitScriptParser.If:
                case CircuitScriptParser.Frame:
                case CircuitScriptParser.Sheet:
                case CircuitScriptParser.Addition:
                case CircuitScriptParser.Divide:
                case CircuitScriptParser.ID:
                case CircuitScriptParser.ANNOTATION_START:
                    {
                    this.state = 157;
                    this.expression();
                    }
                    break;
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 158;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 161;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 4)) & ~0x1F) === 0 && ((1 << (_la - 4)) & 3466061937) !== 0) || ((((_la - 44)) & ~0x1F) === 0 && ((1 << (_la - 44)) & 4243461) !== 0));
            this.state = 163;
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
            this.state = 178;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 4, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 165;
                this.graph_expressions();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 166;
                this.assignment_expr();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 167;
                this.operator_assignment_expr();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 168;
                this.property_set_expr();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 169;
                this.property_set_expr2();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 170;
                this.double_dot_property_set_expr();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 171;
                this.function_def_expr();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 172;
                this.function_call_expr();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 173;
                this.atom_expr();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 174;
                this.frame_expr();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 175;
                this.flow_expressions();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 176;
                this.annotation_comment_expr();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 177;
                this.part_set_expr();
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
            this.state = 185;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.If:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 180;
                this.if_expr();
                }
                break;
            case CircuitScriptParser.While:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 181;
                this.while_expr();
                }
                break;
            case CircuitScriptParser.For:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 182;
                this.for_expr();
                }
                break;
            case CircuitScriptParser.Break:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 183;
                this.match(CircuitScriptParser.Break);
                }
                break;
            case CircuitScriptParser.Continue:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 184;
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
            this.state = 189;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 6, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 187;
                this.graph_linear_expression();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 188;
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
            this.state = 197;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 7, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 191;
                this.add_component_expr();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 192;
                this.to_component_expr();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 193;
                this.at_component_expr();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 194;
                this.at_block();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 195;
                this.wire_expr();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 196;
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
                case CircuitScriptParser.T__3:
                case CircuitScriptParser.T__7:
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
                case CircuitScriptParser.For:
                case CircuitScriptParser.While:
                case CircuitScriptParser.Continue:
                case CircuitScriptParser.If:
                case CircuitScriptParser.Frame:
                case CircuitScriptParser.Sheet:
                case CircuitScriptParser.Addition:
                case CircuitScriptParser.Divide:
                case CircuitScriptParser.ID:
                case CircuitScriptParser.ANNOTATION_START:
                    {
                    this.state = 202;
                    this.expression();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 205;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 4)) & ~0x1F) === 0 && ((1 << (_la - 4)) & 3466061937) !== 0) || ((((_la - 44)) & ~0x1F) === 0 && ((1 << (_la - 44)) & 4243461) !== 0));
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
    public path_block(): Path_blockContext {
        let localContext = new Path_blockContext(this.context, this.state);
        this.enterRule(localContext, 12, CircuitScriptParser.RULE_path_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 209;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 7341056) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 210;
            this.match(CircuitScriptParser.T__0);
            this.state = 211;
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
            this.state = 213;
            this.atom_expr();
            this.state = 214;
            this.match(CircuitScriptParser.T__0);
            this.state = 215;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 216;
            this.match(CircuitScriptParser.INDENT);
            this.state = 219;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 219;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 217;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case CircuitScriptParser.ID:
                case CircuitScriptParser.INTEGER_VALUE:
                    {
                    this.state = 218;
                    this.assignment_expr2();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 221;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 261) !== 0));
            this.state = 223;
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
            this.state = 225;
            _la = this.tokenStream.LA(1);
            if(!(_la === 58 || _la === 60)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 226;
            this.match(CircuitScriptParser.T__0);
            this.state = 227;
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
            this.state = 229;
            this.match(CircuitScriptParser.Pin);
            this.state = 230;
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
            this.state = 232;
            this.match(CircuitScriptParser.ID);
            this.state = 233;
            this.match(CircuitScriptParser.T__0);
            this.state = 236;
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
                this.state = 234;
                this.value_expr();
                }
                break;
            case CircuitScriptParser.ID:
                {
                this.state = 235;
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
            this.state = 240;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 13, this.context) ) {
            case 1:
                {
                this.state = 238;
                this.data_expr(0);
                }
                break;
            case 2:
                {
                this.state = 239;
                this.assignment_expr();
                }
                break;
            }
            this.state = 245;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 14, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 242;
                    this.component_modifier_expr();
                    }
                    }
                }
                this.state = 247;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 14, this.context);
            }
            this.state = 249;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 16) {
                {
                this.state = 248;
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
            this.state = 251;
            this.match(CircuitScriptParser.Add);
            this.state = 252;
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
            this.state = 257;
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
                this.state = 254;
                this.data_expr_with_assignment();
                }
                break;
            case CircuitScriptParser.Pin:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 255;
                this.pin_select_expr();
                }
                break;
            case CircuitScriptParser.Point:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 256;
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
            this.state = 259;
            _la = this.tokenStream.LA(1);
            if(!(_la === 60 || _la === 63)) {
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
            this.state = 261;
            this.match(CircuitScriptParser.At);
            this.state = 262;
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
            this.state = 264;
            this.match(CircuitScriptParser.To);
            {
            this.state = 265;
            this.component_select_expr();
            this.state = 270;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 266;
                this.match(CircuitScriptParser.T__1);
                this.state = 267;
                this.component_select_expr();
                }
                }
                this.state = 272;
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
            this.state = 273;
            this.match(CircuitScriptParser.At);
            this.state = 274;
            this.component_select_expr();
            this.state = 275;
            this.match(CircuitScriptParser.To);
            this.state = 276;
            this.component_select_expr();
            this.state = 281;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 277;
                this.match(CircuitScriptParser.T__1);
                this.state = 278;
                this.component_select_expr();
                }
                }
                this.state = 283;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 284;
            this.match(CircuitScriptParser.T__0);
            this.state = 285;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 286;
            this.match(CircuitScriptParser.INDENT);
            this.state = 289;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 289;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 287;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case CircuitScriptParser.INTEGER_VALUE:
                case CircuitScriptParser.STRING_VALUE:
                    {
                    this.state = 288;
                    this.at_to_multiple_line_expr();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 291;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 60)) & ~0x1F) === 0 && ((1 << (_la - 60)) & 73) !== 0));
            this.state = 293;
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
            this.state = 295;
            this.pin_select_expr2();
            this.state = 296;
            this.match(CircuitScriptParser.T__0);
            this.state = 297;
            this.at_to_multiple_line_expr_to_pin();
            this.state = 302;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 298;
                this.match(CircuitScriptParser.T__1);
                this.state = 299;
                this.at_to_multiple_line_expr_to_pin();
                }
                }
                this.state = 304;
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
            this.state = 305;
            _la = this.tokenStream.LA(1);
            if(!(_la === 56 || _la === 60)) {
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
            this.state = 307;
            this.at_block_header();
            this.state = 308;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 309;
            this.match(CircuitScriptParser.INDENT);
            this.state = 312;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 312;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 310;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case CircuitScriptParser.T__3:
                case CircuitScriptParser.T__7:
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
                case CircuitScriptParser.For:
                case CircuitScriptParser.While:
                case CircuitScriptParser.Continue:
                case CircuitScriptParser.If:
                case CircuitScriptParser.Frame:
                case CircuitScriptParser.Sheet:
                case CircuitScriptParser.Addition:
                case CircuitScriptParser.Divide:
                case CircuitScriptParser.ID:
                case CircuitScriptParser.ANNOTATION_START:
                case CircuitScriptParser.INTEGER_VALUE:
                case CircuitScriptParser.STRING_VALUE:
                    {
                    this.state = 311;
                    this.at_block_expressions();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 314;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 4)) & ~0x1F) === 0 && ((1 << (_la - 4)) & 3466061937) !== 0) || ((((_la - 44)) & ~0x1F) === 0 && ((1 << (_la - 44)) & 4833285) !== 0));
            this.state = 316;
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
            this.state = 320;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.T__3:
            case CircuitScriptParser.T__7:
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
            case CircuitScriptParser.For:
            case CircuitScriptParser.While:
            case CircuitScriptParser.Continue:
            case CircuitScriptParser.If:
            case CircuitScriptParser.Frame:
            case CircuitScriptParser.Sheet:
            case CircuitScriptParser.Addition:
            case CircuitScriptParser.Divide:
            case CircuitScriptParser.ID:
            case CircuitScriptParser.ANNOTATION_START:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 318;
                this.expression();
                }
                break;
            case CircuitScriptParser.INTEGER_VALUE:
            case CircuitScriptParser.STRING_VALUE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 319;
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
            this.state = 322;
            this.at_component_expr();
            this.state = 323;
            this.match(CircuitScriptParser.T__0);
            this.state = 327;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 59) {
                {
                {
                this.state = 324;
                this.annotation_comment_expr();
                }
                }
                this.state = 329;
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
    public at_block_pin_expr(): At_block_pin_exprContext {
        let localContext = new At_block_pin_exprContext(this.context, this.state);
        this.enterRule(localContext, 46, CircuitScriptParser.RULE_at_block_pin_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 330;
            this.pin_select_expr2();
            this.state = 331;
            this.match(CircuitScriptParser.T__0);
            this.state = 334;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.T__3:
            case CircuitScriptParser.T__7:
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
            case CircuitScriptParser.For:
            case CircuitScriptParser.While:
            case CircuitScriptParser.Continue:
            case CircuitScriptParser.If:
            case CircuitScriptParser.Frame:
            case CircuitScriptParser.Sheet:
            case CircuitScriptParser.Addition:
            case CircuitScriptParser.Divide:
            case CircuitScriptParser.NOT_CONNECTED:
            case CircuitScriptParser.ID:
            case CircuitScriptParser.ANNOTATION_START:
                {
                this.state = 332;
                this.at_block_pin_expression_simple();
                }
                break;
            case CircuitScriptParser.NEWLINE:
                {
                this.state = 333;
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
            this.state = 338;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.T__3:
            case CircuitScriptParser.T__7:
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
            case CircuitScriptParser.For:
            case CircuitScriptParser.While:
            case CircuitScriptParser.Continue:
            case CircuitScriptParser.If:
            case CircuitScriptParser.Frame:
            case CircuitScriptParser.Sheet:
            case CircuitScriptParser.Addition:
            case CircuitScriptParser.Divide:
            case CircuitScriptParser.ID:
            case CircuitScriptParser.ANNOTATION_START:
                {
                this.state = 336;
                this.expression();
                }
                break;
            case CircuitScriptParser.NOT_CONNECTED:
                {
                this.state = 337;
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
            this.state = 340;
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
            this.state = 344;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 28, this.context) ) {
            case 1:
                {
                this.state = 342;
                this.atom_expr();
                }
                break;
            case 2:
                {
                this.state = 343;
                this.function_call_expr();
                }
                break;
            }
            this.state = 346;
            this.match(CircuitScriptParser.T__2);
            this.state = 347;
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
            this.state = 349;
            this.atom_expr();
            this.state = 350;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 31) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 351;
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
            this.state = 353;
            this.match(CircuitScriptParser.ID);
            this.state = 354;
            this.match(CircuitScriptParser.T__2);
            this.state = 355;
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
            this.state = 380;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 32, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                {
                this.state = 357;
                this.data_expr(0);
                this.state = 362;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 29, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 358;
                        this.match(CircuitScriptParser.T__1);
                        this.state = 359;
                        this.data_expr(0);
                        }
                        }
                    }
                    this.state = 364;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 29, this.context);
                }
                this.state = 369;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                    {
                    {
                    this.state = 365;
                    this.match(CircuitScriptParser.T__1);
                    this.state = 366;
                    this.keyword_assignment_expr();
                    }
                    }
                    this.state = 371;
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
                this.state = 372;
                this.keyword_assignment_expr();
                this.state = 377;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                    {
                    {
                    this.state = 373;
                    this.match(CircuitScriptParser.T__1);
                    this.state = 374;
                    this.keyword_assignment_expr();
                    }
                    }
                    this.state = 379;
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
            this.state = 382;
            this.atom_expr();
            this.state = 383;
            this.match(CircuitScriptParser.T__2);
            this.state = 384;
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
            this.state = 386;
            this.match(CircuitScriptParser.T__3);
            this.state = 387;
            this.match(CircuitScriptParser.ID);
            this.state = 388;
            this.match(CircuitScriptParser.T__2);
            this.state = 389;
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
            this.state = 408;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 34, this.context) ) {
            case 1:
                {
                localContext = new RoundedBracketsExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;

                this.state = 392;
                this.match(CircuitScriptParser.OPEN_PAREN);
                this.state = 393;
                this.data_expr(0);
                this.state = 394;
                this.match(CircuitScriptParser.CLOSE_PAREN);
                }
                break;
            case 2:
                {
                localContext = new ValueAtomExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 398;
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
                    this.state = 396;
                    this.value_expr();
                    }
                    break;
                case CircuitScriptParser.ID:
                    {
                    this.state = 397;
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
                this.state = 400;
                this.unary_operator();
                this.state = 401;
                this.data_expr(11);
                }
                break;
            case 4:
                {
                localContext = new DataExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 403;
                this.create_component_expr();
                }
                break;
            case 5:
                {
                localContext = new DataExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 404;
                this.create_graphic_expr();
                }
                break;
            case 6:
                {
                localContext = new DataExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 405;
                this.create_module_expr();
                }
                break;
            case 7:
                {
                localContext = new FunctionCallExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 406;
                this.function_call_expr();
                }
                break;
            case 8:
                {
                localContext = new ArrayExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 407;
                this.array_expr();
                }
                break;
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 430;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 36, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 428;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 35, this.context) ) {
                    case 1:
                        {
                        localContext = new MultiplyExprContext(new Data_exprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CircuitScriptParser.RULE_data_expr);
                        this.state = 410;
                        if (!(this.precpred(this.context, 10))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 10)");
                        }
                        this.state = 411;
                        _la = this.tokenStream.LA(1);
                        if(!(((((_la - 46)) & ~0x1F) === 0 && ((1 << (_la - 46)) & 7) !== 0))) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 412;
                        this.data_expr(11);
                        }
                        break;
                    case 2:
                        {
                        localContext = new AdditionExprContext(new Data_exprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CircuitScriptParser.RULE_data_expr);
                        this.state = 413;
                        if (!(this.precpred(this.context, 9))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 9)");
                        }
                        this.state = 414;
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 44 || _la === 45)) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 415;
                        this.data_expr(10);
                        }
                        break;
                    case 3:
                        {
                        localContext = new BinaryOperatorExprContext(new Data_exprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CircuitScriptParser.RULE_data_expr);
                        this.state = 416;
                        if (!(this.precpred(this.context, 8))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 8)");
                        }
                        this.state = 417;
                        this.binary_operator();
                        this.state = 418;
                        this.data_expr(9);
                        }
                        break;
                    case 4:
                        {
                        localContext = new LogicalOperatorExprContext(new Data_exprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CircuitScriptParser.RULE_data_expr);
                        this.state = 420;
                        if (!(this.precpred(this.context, 7))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 7)");
                        }
                        this.state = 421;
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 42 || _la === 43)) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 422;
                        this.data_expr(8);
                        }
                        break;
                    case 5:
                        {
                        localContext = new ArrayIndexExprContext(new Data_exprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CircuitScriptParser.RULE_data_expr);
                        this.state = 423;
                        if (!(this.precpred(this.context, 1))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                        }
                        this.state = 424;
                        this.match(CircuitScriptParser.T__4);
                        this.state = 425;
                        this.data_expr(0);
                        this.state = 426;
                        this.match(CircuitScriptParser.T__5);
                        }
                        break;
                    }
                    }
                }
                this.state = 432;
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
            this.state = 433;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & 63) !== 0))) {
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
            this.state = 435;
            _la = this.tokenStream.LA(1);
            if(!(_la === 33 || _la === 45)) {
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
            this.state = 438;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 45) {
                {
                this.state = 437;
                this.match(CircuitScriptParser.Minus);
                }
            }

            this.state = 440;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 249) !== 0))) {
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
            this.state = 442;
            this.match(CircuitScriptParser.Define);
            this.state = 443;
            this.match(CircuitScriptParser.ID);
            this.state = 444;
            this.match(CircuitScriptParser.OPEN_PAREN);
            this.state = 446;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 58) {
                {
                this.state = 445;
                this.function_args_expr();
                }
            }

            this.state = 448;
            this.match(CircuitScriptParser.CLOSE_PAREN);
            this.state = 449;
            this.match(CircuitScriptParser.T__0);
            this.state = 450;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 451;
            this.match(CircuitScriptParser.INDENT);
            this.state = 454;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 454;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 452;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case CircuitScriptParser.T__3:
                case CircuitScriptParser.T__7:
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
                case CircuitScriptParser.For:
                case CircuitScriptParser.While:
                case CircuitScriptParser.Continue:
                case CircuitScriptParser.If:
                case CircuitScriptParser.Frame:
                case CircuitScriptParser.Sheet:
                case CircuitScriptParser.Addition:
                case CircuitScriptParser.Divide:
                case CircuitScriptParser.ID:
                case CircuitScriptParser.ANNOTATION_START:
                    {
                    this.state = 453;
                    this.function_expr();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 456;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 4)) & ~0x1F) === 0 && ((1 << (_la - 4)) & 3466586225) !== 0) || ((((_la - 44)) & ~0x1F) === 0 && ((1 << (_la - 44)) & 4243461) !== 0));
            this.state = 458;
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
            this.state = 462;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.T__3:
            case CircuitScriptParser.T__7:
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
            case CircuitScriptParser.For:
            case CircuitScriptParser.While:
            case CircuitScriptParser.Continue:
            case CircuitScriptParser.If:
            case CircuitScriptParser.Frame:
            case CircuitScriptParser.Sheet:
            case CircuitScriptParser.Addition:
            case CircuitScriptParser.Divide:
            case CircuitScriptParser.ID:
            case CircuitScriptParser.ANNOTATION_START:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 460;
                this.expression();
                }
                break;
            case CircuitScriptParser.Return:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 461;
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
            this.state = 493;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 45, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 464;
                this.match(CircuitScriptParser.ID);
                this.state = 469;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 42, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 465;
                        this.match(CircuitScriptParser.T__1);
                        this.state = 466;
                        this.match(CircuitScriptParser.ID);
                        }
                        }
                    }
                    this.state = 471;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 42, this.context);
                }
                this.state = 478;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                    {
                    {
                    this.state = 472;
                    this.match(CircuitScriptParser.T__1);
                    this.state = 473;
                    this.match(CircuitScriptParser.ID);
                    this.state = 474;
                    this.match(CircuitScriptParser.T__2);
                    this.state = 475;
                    this.value_expr();
                    }
                    }
                    this.state = 480;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 481;
                this.match(CircuitScriptParser.ID);
                this.state = 482;
                this.match(CircuitScriptParser.T__2);
                this.state = 483;
                this.value_expr();
                this.state = 490;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                    {
                    {
                    this.state = 484;
                    this.match(CircuitScriptParser.T__1);
                    this.state = 485;
                    this.match(CircuitScriptParser.ID);
                    this.state = 486;
                    this.match(CircuitScriptParser.T__2);
                    this.state = 487;
                    this.value_expr();
                    }
                    }
                    this.state = 492;
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
            this.state = 495;
            this.match(CircuitScriptParser.ID);
            this.state = 499;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 46, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 496;
                    this.trailer_expr2();
                    }
                    }
                }
                this.state = 501;
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
            this.state = 508;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.OPEN_PAREN:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 502;
                this.match(CircuitScriptParser.OPEN_PAREN);
                this.state = 504;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 5 || _la === 11 || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 4213192705) !== 0)) {
                    {
                    this.state = 503;
                    this.parameters();
                    }
                }

                this.state = 506;
                this.match(CircuitScriptParser.CLOSE_PAREN);
                }
                break;
            case CircuitScriptParser.T__4:
            case CircuitScriptParser.T__6:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 507;
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
            this.state = 516;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.T__6:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 510;
                this.match(CircuitScriptParser.T__6);
                this.state = 511;
                this.match(CircuitScriptParser.ID);
                }
                break;
            case CircuitScriptParser.T__4:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 512;
                this.match(CircuitScriptParser.T__4);
                this.state = 513;
                this.data_expr(0);
                this.state = 514;
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
            this.state = 519;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 44 || _la === 46) {
                {
                this.state = 518;
                this.net_namespace_expr();
                }
            }

            this.state = 521;
            this.match(CircuitScriptParser.ID);
            this.state = 523;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 522;
                    this.trailer_expr();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 525;
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
            this.state = 528;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 44) {
                {
                this.state = 527;
                this.match(CircuitScriptParser.Addition);
                }
            }

            this.state = 530;
            this.match(CircuitScriptParser.Divide);
            this.state = 532;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 53, this.context) ) {
            case 1:
                {
                this.state = 531;
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
            this.state = 534;
            this.match(CircuitScriptParser.Return);
            this.state = 535;
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
            this.state = 537;
            this.property_key_expr();
            this.state = 538;
            this.match(CircuitScriptParser.T__0);
            this.state = 539;
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
            this.state = 541;
            this.match(CircuitScriptParser.Create);
            this.state = 542;
            this.match(CircuitScriptParser.Component);
            this.state = 543;
            this.match(CircuitScriptParser.T__0);
            this.state = 544;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 545;
            this.match(CircuitScriptParser.INDENT);
            this.state = 548;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 548;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 546;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case CircuitScriptParser.ID:
                case CircuitScriptParser.INTEGER_VALUE:
                case CircuitScriptParser.STRING_VALUE:
                    {
                    this.state = 547;
                    this.property_expr();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 550;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 293) !== 0));
            this.state = 552;
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
            this.state = 554;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 555;
            this.match(CircuitScriptParser.INDENT);
            this.state = 558;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 558;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 556;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case CircuitScriptParser.Pin:
                case CircuitScriptParser.For:
                case CircuitScriptParser.ID:
                    {
                    this.state = 557;
                    this.graphic_expr();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 560;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 16 || _la === 27 || _la === 58 || _la === 66);
            this.state = 562;
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
            this.state = 564;
            this.match(CircuitScriptParser.Create);
            this.state = 565;
            this.match(CircuitScriptParser.Graphic);
            this.state = 569;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 54) {
                {
                this.state = 566;
                this.match(CircuitScriptParser.OPEN_PAREN);
                this.state = 567;
                this.match(CircuitScriptParser.ID);
                this.state = 568;
                this.match(CircuitScriptParser.CLOSE_PAREN);
                }
            }

            this.state = 571;
            this.match(CircuitScriptParser.T__0);
            this.state = 572;
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
            this.state = 574;
            this.match(CircuitScriptParser.Create);
            this.state = 575;
            this.match(CircuitScriptParser.Module);
            this.state = 576;
            this.match(CircuitScriptParser.T__0);
            this.state = 577;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 578;
            this.match(CircuitScriptParser.INDENT);
            this.state = 582;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 582;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 59, this.context) ) {
                case 1:
                    {
                    this.state = 579;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case 2:
                    {
                    this.state = 580;
                    this.property_expr();
                    }
                    break;
                case 3:
                    {
                    this.state = 581;
                    this.property_block_expr();
                    }
                    break;
                }
                }
                this.state = 584;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 293) !== 0));
            this.state = 586;
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
            this.state = 588;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 589;
            this.match(CircuitScriptParser.INDENT);
            this.state = 592;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 592;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 590;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case CircuitScriptParser.ID:
                case CircuitScriptParser.INTEGER_VALUE:
                case CircuitScriptParser.STRING_VALUE:
                    {
                    this.state = 591;
                    this.property_expr();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 594;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 293) !== 0));
            this.state = 596;
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
            this.state = 624;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.Pin:
            case CircuitScriptParser.ID:
                localContext = new GraphicCommandExprContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 598;
                (localContext as GraphicCommandExprContext)._command = this.tokenStream.LT(1);
                _la = this.tokenStream.LA(1);
                if(!(_la === 16 || _la === 58)) {
                    (localContext as GraphicCommandExprContext)._command = this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 600;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 1) {
                    {
                    this.state = 599;
                    this.match(CircuitScriptParser.T__0);
                    }
                }

                this.state = 608;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 64, this.context) ) {
                case 1:
                    {
                    this.state = 602;
                    this.parameters();
                    }
                    break;
                case 2:
                    {
                    this.state = 603;
                    this.match(CircuitScriptParser.OPEN_PAREN);
                    this.state = 604;
                    this.parameters();
                    this.state = 605;
                    this.match(CircuitScriptParser.CLOSE_PAREN);
                    }
                    break;
                case 3:
                    {
                    this.state = 607;
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
                this.state = 610;
                this.match(CircuitScriptParser.For);
                this.state = 611;
                this.match(CircuitScriptParser.ID);
                this.state = 616;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                    {
                    {
                    this.state = 612;
                    this.match(CircuitScriptParser.T__1);
                    this.state = 613;
                    this.match(CircuitScriptParser.ID);
                    }
                    }
                    this.state = 618;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 619;
                this.match(CircuitScriptParser.In);
                this.state = 620;
                this.data_expr(0);
                this.state = 621;
                this.match(CircuitScriptParser.T__0);
                this.state = 622;
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
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 626;
            this.property_key_expr();
            this.state = 630;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 63) {
                {
                {
                this.state = 627;
                localContext._extra = this.match(CircuitScriptParser.STRING_VALUE);
                }
                }
                this.state = 632;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 633;
            this.match(CircuitScriptParser.T__0);
            this.state = 634;
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
            this.state = 636;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 37) !== 0))) {
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
            this.state = 647;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.NEWLINE:
                localContext = new Nested_propertiesContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 638;
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
                this.state = 639;
                this.data_expr(0);
                this.state = 644;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                    {
                    {
                    this.state = 640;
                    this.match(CircuitScriptParser.T__1);
                    this.state = 641;
                    this.data_expr(0);
                    }
                    }
                    this.state = 646;
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
            this.state = 655;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 71, this.context) ) {
            case 1:
                localContext = new Wire_expr_direction_valueContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 649;
                this.match(CircuitScriptParser.ID);
                this.state = 652;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 70, this.context) ) {
                case 1:
                    {
                    this.state = 650;
                    this.match(CircuitScriptParser.INTEGER_VALUE);
                    }
                    break;
                case 2:
                    {
                    this.state = 651;
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
                this.state = 654;
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
            this.state = 657;
            this.match(CircuitScriptParser.Wire);
            this.state = 661;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 72, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 658;
                    this.wire_atom_expr();
                    }
                    }
                }
                this.state = 663;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 72, this.context);
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
            this.state = 664;
            this.match(CircuitScriptParser.T__4);
            this.state = 675;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5 || _la === 11 || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 4213192705) !== 0)) {
                {
                {
                this.state = 665;
                this.data_expr(0);
                this.state = 670;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                    {
                    {
                    this.state = 666;
                    this.match(CircuitScriptParser.T__1);
                    this.state = 667;
                    this.data_expr(0);
                    }
                    }
                    this.state = 672;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                }
                this.state = 677;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 678;
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
            this.state = 680;
            this.match(CircuitScriptParser.Point);
            this.state = 683;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 75, this.context) ) {
            case 1:
                {
                this.state = 681;
                this.match(CircuitScriptParser.ID);
                }
                break;
            case 2:
                {
                this.state = 682;
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
        let _la: number;
        try {
            this.state = 707;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.Import:
                localContext = new Import_simpleContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 685;
                this.match(CircuitScriptParser.Import);
                this.state = 686;
                (localContext as Import_simpleContext)._libraryName = this.match(CircuitScriptParser.ID);
                this.state = 688;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 76, this.context) ) {
                case 1:
                    {
                    this.state = 687;
                    this.import_annotation_expr();
                    }
                    break;
                }
                }
                break;
            case CircuitScriptParser.From:
                localContext = new Import_specific_or_allContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 690;
                this.match(CircuitScriptParser.From);
                this.state = 691;
                (localContext as Import_specific_or_allContext)._libraryName = this.match(CircuitScriptParser.ID);
                this.state = 692;
                this.match(CircuitScriptParser.Import);
                this.state = 702;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.Multiply:
                    {
                    this.state = 693;
                    (localContext as Import_specific_or_allContext)._all = this.match(CircuitScriptParser.Multiply);
                    }
                    break;
                case CircuitScriptParser.ID:
                    {
                    {
                    this.state = 694;
                    (localContext as Import_specific_or_allContext)._ID = this.match(CircuitScriptParser.ID);
                    (localContext as Import_specific_or_allContext)._funcNames.push((localContext as Import_specific_or_allContext)._ID!);
                    this.state = 699;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 2) {
                        {
                        {
                        this.state = 695;
                        this.match(CircuitScriptParser.T__1);
                        this.state = 696;
                        (localContext as Import_specific_or_allContext)._ID = this.match(CircuitScriptParser.ID);
                        (localContext as Import_specific_or_allContext)._funcNames.push((localContext as Import_specific_or_allContext)._ID!);
                        }
                        }
                        this.state = 701;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 705;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 79, this.context) ) {
                case 1:
                    {
                    this.state = 704;
                    this.import_annotation_expr();
                    }
                    break;
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
    public import_annotation_expr(): Import_annotation_exprContext {
        let localContext = new Import_annotation_exprContext(this.context, this.state);
        this.enterRule(localContext, 120, CircuitScriptParser.RULE_import_annotation_expr);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 709;
            this.match(CircuitScriptParser.ANNOTATION_START);
            this.state = 713;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 81, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 710;
                    _la = this.tokenStream.LA(1);
                    if(!(_la === 45 || _la === 58)) {
                    this.errorHandler.recoverInline(this);
                    }
                    else {
                        this.errorHandler.reportMatch(this);
                        this.consume();
                    }
                    }
                    }
                }
                this.state = 715;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 81, this.context);
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
    public frame_expr(): Frame_exprContext {
        let localContext = new Frame_exprContext(this.context, this.state);
        this.enterRule(localContext, 122, CircuitScriptParser.RULE_frame_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 716;
            _la = this.tokenStream.LA(1);
            if(!(_la === 34 || _la === 35)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 717;
            this.match(CircuitScriptParser.T__0);
            this.state = 718;
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
        this.enterRule(localContext, 124, CircuitScriptParser.RULE_if_expr);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 720;
            this.match(CircuitScriptParser.If);
            this.state = 721;
            this.data_expr(0);
            this.state = 722;
            this.match(CircuitScriptParser.T__0);
            this.state = 723;
            this.expressions_block();
            this.state = 727;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 82, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 724;
                    this.if_inner_expr();
                    }
                    }
                }
                this.state = 729;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 82, this.context);
            }
            this.state = 731;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 32) {
                {
                this.state = 730;
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
        this.enterRule(localContext, 126, CircuitScriptParser.RULE_if_inner_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 733;
            this.match(CircuitScriptParser.Else);
            this.state = 734;
            this.match(CircuitScriptParser.If);
            this.state = 735;
            this.data_expr(0);
            this.state = 736;
            this.match(CircuitScriptParser.T__0);
            this.state = 737;
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
        this.enterRule(localContext, 128, CircuitScriptParser.RULE_else_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 739;
            this.match(CircuitScriptParser.Else);
            this.state = 740;
            this.match(CircuitScriptParser.T__0);
            this.state = 741;
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
        this.enterRule(localContext, 130, CircuitScriptParser.RULE_while_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 743;
            this.match(CircuitScriptParser.While);
            this.state = 744;
            this.data_expr(0);
            this.state = 745;
            this.match(CircuitScriptParser.T__0);
            this.state = 746;
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
        this.enterRule(localContext, 132, CircuitScriptParser.RULE_for_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 748;
            this.match(CircuitScriptParser.For);
            this.state = 749;
            this.match(CircuitScriptParser.ID);
            this.state = 754;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 750;
                this.match(CircuitScriptParser.T__1);
                this.state = 751;
                this.match(CircuitScriptParser.ID);
                }
                }
                this.state = 756;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 757;
            this.match(CircuitScriptParser.In);
            this.state = 758;
            this.data_expr(0);
            this.state = 759;
            this.match(CircuitScriptParser.T__0);
            this.state = 760;
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
    public part_set_expr(): Part_set_exprContext {
        let localContext = new Part_set_exprContext(this.context, this.state);
        this.enterRule(localContext, 134, CircuitScriptParser.RULE_part_set_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 762;
            this.match(CircuitScriptParser.T__7);
            this.state = 763;
            this.match(CircuitScriptParser.T__0);
            this.state = 764;
            this.data_expr(0);
            this.state = 769;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 765;
                this.match(CircuitScriptParser.T__1);
                this.state = 766;
                this.data_expr(0);
                }
                }
                this.state = 771;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 772;
            this.match(CircuitScriptParser.T__0);
            this.state = 773;
            this.part_match_block();
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
    public part_set_key(): Part_set_keyContext {
        let localContext = new Part_set_keyContext(this.context, this.state);
        this.enterRule(localContext, 136, CircuitScriptParser.RULE_part_set_key);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 775;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 117) !== 0))) {
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
    public part_match_block(): Part_match_blockContext {
        let localContext = new Part_match_blockContext(this.context, this.state);
        this.enterRule(localContext, 138, CircuitScriptParser.RULE_part_match_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 777;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 778;
            this.match(CircuitScriptParser.INDENT);
            this.state = 781;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 781;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 779;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case CircuitScriptParser.ID:
                case CircuitScriptParser.INTEGER_VALUE:
                case CircuitScriptParser.NUMERIC_VALUE:
                case CircuitScriptParser.STRING_VALUE:
                case CircuitScriptParser.PERCENTAGE_VALUE:
                    {
                    this.state = 780;
                    this.part_sub_expr();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 783;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 373) !== 0));
            this.state = 785;
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
    public part_sub_expr(): Part_sub_exprContext {
        let localContext = new Part_sub_exprContext(this.context, this.state);
        this.enterRule(localContext, 140, CircuitScriptParser.RULE_part_sub_expr);
        try {
            this.state = 790;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 88, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 787;
                this.part_condition_expr();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 788;
                this.part_value_expr();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 789;
                this.part_condition_key_only_expr();
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
    public part_condition_expr(): Part_condition_exprContext {
        let localContext = new Part_condition_exprContext(this.context, this.state);
        this.enterRule(localContext, 142, CircuitScriptParser.RULE_part_condition_expr);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 792;
            localContext._part_set_key = this.part_set_key();
            localContext._key_id.push(localContext._part_set_key!);
            this.state = 793;
            this.match(CircuitScriptParser.T__0);
            this.state = 794;
            localContext._data_expr = this.data_expr(0);
            localContext._values.push(localContext._data_expr!);
            this.state = 802;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 89, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 795;
                    this.match(CircuitScriptParser.T__1);
                    this.state = 796;
                    localContext._part_set_key = this.part_set_key();
                    localContext._key_id.push(localContext._part_set_key!);
                    this.state = 797;
                    this.match(CircuitScriptParser.T__0);
                    this.state = 798;
                    localContext._data_expr = this.data_expr(0);
                    localContext._values.push(localContext._data_expr!);
                    }
                    }
                }
                this.state = 804;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 89, this.context);
            }
            this.state = 809;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 805;
                this.match(CircuitScriptParser.T__1);
                this.state = 806;
                localContext._id_only = this.part_set_key();
                }
                }
                this.state = 811;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 812;
            this.match(CircuitScriptParser.T__0);
            this.state = 822;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.NEWLINE:
                {
                this.state = 813;
                this.part_match_block();
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
                {
                {
                this.state = 814;
                localContext._data_expr = this.data_expr(0);
                localContext._last_data.push(localContext._data_expr!);
                this.state = 819;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                    {
                    {
                    this.state = 815;
                    this.match(CircuitScriptParser.T__1);
                    this.state = 816;
                    localContext._data_expr = this.data_expr(0);
                    localContext._last_data.push(localContext._data_expr!);
                    }
                    }
                    this.state = 821;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
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
    public part_condition_key_only_expr(): Part_condition_key_only_exprContext {
        let localContext = new Part_condition_key_only_exprContext(this.context, this.state);
        this.enterRule(localContext, 144, CircuitScriptParser.RULE_part_condition_key_only_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 824;
            this.part_set_key();
            this.state = 825;
            this.match(CircuitScriptParser.T__0);
            this.state = 826;
            this.part_match_block();
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
    public part_value_expr(): Part_value_exprContext {
        let localContext = new Part_value_exprContext(this.context, this.state);
        this.enterRule(localContext, 146, CircuitScriptParser.RULE_part_value_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 828;
            this.part_set_key();
            this.state = 829;
            this.match(CircuitScriptParser.T__0);
            this.state = 830;
            this.data_expr(0);
            this.state = 835;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 831;
                this.match(CircuitScriptParser.T__1);
                this.state = 832;
                this.data_expr(0);
                }
                }
                this.state = 837;
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
    public annotation_comment_expr(): Annotation_comment_exprContext {
        let localContext = new Annotation_comment_exprContext(this.context, this.state);
        this.enterRule(localContext, 148, CircuitScriptParser.RULE_annotation_comment_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 838;
            this.match(CircuitScriptParser.ANNOTATION_START);
            this.state = 839;
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
        4,1,69,842,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,
        7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,
        2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,33,
        7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,39,
        2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,46,
        7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,52,
        2,53,7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,59,
        7,59,2,60,7,60,2,61,7,61,2,62,7,62,2,63,7,63,2,64,7,64,2,65,7,65,
        2,66,7,66,2,67,7,67,2,68,7,68,2,69,7,69,2,70,7,70,2,71,7,71,2,72,
        7,72,2,73,7,73,2,74,7,74,1,0,1,0,5,0,153,8,0,10,0,12,0,156,9,0,1,
        0,1,0,4,0,160,8,0,11,0,12,0,161,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,179,8,1,1,2,1,2,1,2,1,2,1,2,3,2,
        186,8,2,1,3,1,3,3,3,190,8,3,1,4,1,4,1,4,1,4,1,4,1,4,3,4,198,8,4,
        1,5,1,5,1,5,1,5,4,5,204,8,5,11,5,12,5,205,1,5,1,5,1,6,1,6,1,6,1,
        6,1,7,1,7,1,7,1,7,1,7,1,7,4,7,220,8,7,11,7,12,7,221,1,7,1,7,1,8,
        1,8,1,8,1,8,1,9,1,9,1,9,1,10,1,10,1,10,1,10,3,10,237,8,10,1,11,1,
        11,3,11,241,8,11,1,11,5,11,244,8,11,10,11,12,11,247,9,11,1,11,3,
        11,250,8,11,1,12,1,12,1,12,1,13,1,13,1,13,3,13,258,8,13,1,14,1,14,
        1,15,1,15,1,15,1,16,1,16,1,16,1,16,5,16,269,8,16,10,16,12,16,272,
        9,16,1,17,1,17,1,17,1,17,1,17,1,17,5,17,280,8,17,10,17,12,17,283,
        9,17,1,17,1,17,1,17,1,17,1,17,4,17,290,8,17,11,17,12,17,291,1,17,
        1,17,1,18,1,18,1,18,1,18,1,18,5,18,301,8,18,10,18,12,18,304,9,18,
        1,19,1,19,1,20,1,20,1,20,1,20,1,20,4,20,313,8,20,11,20,12,20,314,
        1,20,1,20,1,21,1,21,3,21,321,8,21,1,22,1,22,1,22,5,22,326,8,22,10,
        22,12,22,329,9,22,1,23,1,23,1,23,1,23,3,23,335,8,23,1,24,1,24,3,
        24,339,8,24,1,25,1,25,1,26,1,26,3,26,345,8,26,1,26,1,26,1,26,1,27,
        1,27,1,27,1,27,1,28,1,28,1,28,1,28,1,29,1,29,1,29,5,29,361,8,29,
        10,29,12,29,364,9,29,1,29,1,29,5,29,368,8,29,10,29,12,29,371,9,29,
        1,29,1,29,1,29,5,29,376,8,29,10,29,12,29,379,9,29,3,29,381,8,29,
        1,30,1,30,1,30,1,30,1,31,1,31,1,31,1,31,1,31,1,32,1,32,1,32,1,32,
        1,32,1,32,1,32,3,32,399,8,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,
        1,32,3,32,409,8,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,
        1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,5,32,429,8,32,10,32,
        12,32,432,9,32,1,33,1,33,1,34,1,34,1,35,3,35,439,8,35,1,35,1,35,
        1,36,1,36,1,36,1,36,3,36,447,8,36,1,36,1,36,1,36,1,36,1,36,1,36,
        4,36,455,8,36,11,36,12,36,456,1,36,1,36,1,37,1,37,3,37,463,8,37,
        1,38,1,38,1,38,5,38,468,8,38,10,38,12,38,471,9,38,1,38,1,38,1,38,
        1,38,5,38,477,8,38,10,38,12,38,480,9,38,1,38,1,38,1,38,1,38,1,38,
        1,38,1,38,5,38,489,8,38,10,38,12,38,492,9,38,3,38,494,8,38,1,39,
        1,39,5,39,498,8,39,10,39,12,39,501,9,39,1,40,1,40,3,40,505,8,40,
        1,40,1,40,3,40,509,8,40,1,41,1,41,1,41,1,41,1,41,1,41,3,41,517,8,
        41,1,42,3,42,520,8,42,1,42,1,42,4,42,524,8,42,11,42,12,42,525,1,
        43,3,43,529,8,43,1,43,1,43,3,43,533,8,43,1,44,1,44,1,44,1,45,1,45,
        1,45,1,45,1,46,1,46,1,46,1,46,1,46,1,46,1,46,4,46,549,8,46,11,46,
        12,46,550,1,46,1,46,1,47,1,47,1,47,1,47,4,47,559,8,47,11,47,12,47,
        560,1,47,1,47,1,48,1,48,1,48,1,48,1,48,3,48,570,8,48,1,48,1,48,1,
        48,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,4,49,583,8,49,11,49,12,
        49,584,1,49,1,49,1,50,1,50,1,50,1,50,4,50,593,8,50,11,50,12,50,594,
        1,50,1,50,1,51,1,51,3,51,601,8,51,1,51,1,51,1,51,1,51,1,51,1,51,
        3,51,609,8,51,1,51,1,51,1,51,1,51,5,51,615,8,51,10,51,12,51,618,
        9,51,1,51,1,51,1,51,1,51,1,51,3,51,625,8,51,1,52,1,52,5,52,629,8,
        52,10,52,12,52,632,9,52,1,52,1,52,1,52,1,53,1,53,1,54,1,54,1,54,
        1,54,5,54,643,8,54,10,54,12,54,646,9,54,3,54,648,8,54,1,55,1,55,
        1,55,3,55,653,8,55,1,55,3,55,656,8,55,1,56,1,56,5,56,660,8,56,10,
        56,12,56,663,9,56,1,57,1,57,1,57,1,57,5,57,669,8,57,10,57,12,57,
        672,9,57,5,57,674,8,57,10,57,12,57,677,9,57,1,57,1,57,1,58,1,58,
        1,58,3,58,684,8,58,1,59,1,59,1,59,3,59,689,8,59,1,59,1,59,1,59,1,
        59,1,59,1,59,1,59,5,59,698,8,59,10,59,12,59,701,9,59,3,59,703,8,
        59,1,59,3,59,706,8,59,3,59,708,8,59,1,60,1,60,5,60,712,8,60,10,60,
        12,60,715,9,60,1,61,1,61,1,61,1,61,1,62,1,62,1,62,1,62,1,62,5,62,
        726,8,62,10,62,12,62,729,9,62,1,62,3,62,732,8,62,1,63,1,63,1,63,
        1,63,1,63,1,63,1,64,1,64,1,64,1,64,1,65,1,65,1,65,1,65,1,65,1,66,
        1,66,1,66,1,66,5,66,753,8,66,10,66,12,66,756,9,66,1,66,1,66,1,66,
        1,66,1,66,1,67,1,67,1,67,1,67,1,67,5,67,768,8,67,10,67,12,67,771,
        9,67,1,67,1,67,1,67,1,68,1,68,1,69,1,69,1,69,1,69,4,69,782,8,69,
        11,69,12,69,783,1,69,1,69,1,70,1,70,1,70,3,70,791,8,70,1,71,1,71,
        1,71,1,71,1,71,1,71,1,71,1,71,5,71,801,8,71,10,71,12,71,804,9,71,
        1,71,1,71,5,71,808,8,71,10,71,12,71,811,9,71,1,71,1,71,1,71,1,71,
        1,71,5,71,818,8,71,10,71,12,71,821,9,71,3,71,823,8,71,1,72,1,72,
        1,72,1,72,1,73,1,73,1,73,1,73,1,73,5,73,834,8,73,10,73,12,73,837,
        9,73,1,74,1,74,1,74,1,74,0,1,64,75,0,2,4,6,8,10,12,14,16,18,20,22,
        24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,
        68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,102,104,106,
        108,110,112,114,116,118,120,122,124,126,128,130,132,134,136,138,
        140,142,144,146,148,0,16,2,0,10,10,20,22,2,0,58,58,60,60,2,0,60,
        60,63,63,2,0,56,56,60,60,1,0,49,53,1,0,46,48,1,0,44,45,1,0,42,43,
        1,0,36,41,2,0,33,33,45,45,2,0,57,57,60,64,2,0,16,16,58,58,3,0,58,
        58,60,60,63,63,2,0,45,45,58,58,1,0,34,35,3,0,58,58,60,60,62,64,891,
        0,154,1,0,0,0,2,178,1,0,0,0,4,185,1,0,0,0,6,189,1,0,0,0,8,197,1,
        0,0,0,10,199,1,0,0,0,12,209,1,0,0,0,14,213,1,0,0,0,16,225,1,0,0,
        0,18,229,1,0,0,0,20,232,1,0,0,0,22,240,1,0,0,0,24,251,1,0,0,0,26,
        257,1,0,0,0,28,259,1,0,0,0,30,261,1,0,0,0,32,264,1,0,0,0,34,273,
        1,0,0,0,36,295,1,0,0,0,38,305,1,0,0,0,40,307,1,0,0,0,42,320,1,0,
        0,0,44,322,1,0,0,0,46,330,1,0,0,0,48,338,1,0,0,0,50,340,1,0,0,0,
        52,344,1,0,0,0,54,349,1,0,0,0,56,353,1,0,0,0,58,380,1,0,0,0,60,382,
        1,0,0,0,62,386,1,0,0,0,64,408,1,0,0,0,66,433,1,0,0,0,68,435,1,0,
        0,0,70,438,1,0,0,0,72,442,1,0,0,0,74,462,1,0,0,0,76,493,1,0,0,0,
        78,495,1,0,0,0,80,508,1,0,0,0,82,516,1,0,0,0,84,519,1,0,0,0,86,528,
        1,0,0,0,88,534,1,0,0,0,90,537,1,0,0,0,92,541,1,0,0,0,94,554,1,0,
        0,0,96,564,1,0,0,0,98,574,1,0,0,0,100,588,1,0,0,0,102,624,1,0,0,
        0,104,626,1,0,0,0,106,636,1,0,0,0,108,647,1,0,0,0,110,655,1,0,0,
        0,112,657,1,0,0,0,114,664,1,0,0,0,116,680,1,0,0,0,118,707,1,0,0,
        0,120,709,1,0,0,0,122,716,1,0,0,0,124,720,1,0,0,0,126,733,1,0,0,
        0,128,739,1,0,0,0,130,743,1,0,0,0,132,748,1,0,0,0,134,762,1,0,0,
        0,136,775,1,0,0,0,138,777,1,0,0,0,140,790,1,0,0,0,142,792,1,0,0,
        0,144,824,1,0,0,0,146,828,1,0,0,0,148,838,1,0,0,0,150,153,3,118,
        59,0,151,153,5,66,0,0,152,150,1,0,0,0,152,151,1,0,0,0,153,156,1,
        0,0,0,154,152,1,0,0,0,154,155,1,0,0,0,155,159,1,0,0,0,156,154,1,
        0,0,0,157,160,3,2,1,0,158,160,5,66,0,0,159,157,1,0,0,0,159,158,1,
        0,0,0,160,161,1,0,0,0,161,159,1,0,0,0,161,162,1,0,0,0,162,163,1,
        0,0,0,163,164,5,0,0,1,164,1,1,0,0,0,165,179,3,6,3,0,166,179,3,52,
        26,0,167,179,3,54,27,0,168,179,3,60,30,0,169,179,3,14,7,0,170,179,
        3,62,31,0,171,179,3,72,36,0,172,179,3,84,42,0,173,179,3,78,39,0,
        174,179,3,122,61,0,175,179,3,4,2,0,176,179,3,148,74,0,177,179,3,
        134,67,0,178,165,1,0,0,0,178,166,1,0,0,0,178,167,1,0,0,0,178,168,
        1,0,0,0,178,169,1,0,0,0,178,170,1,0,0,0,178,171,1,0,0,0,178,172,
        1,0,0,0,178,173,1,0,0,0,178,174,1,0,0,0,178,175,1,0,0,0,178,176,
        1,0,0,0,178,177,1,0,0,0,179,3,1,0,0,0,180,186,3,124,62,0,181,186,
        3,130,65,0,182,186,3,132,66,0,183,186,5,9,0,0,184,186,5,30,0,0,185,
        180,1,0,0,0,185,181,1,0,0,0,185,182,1,0,0,0,185,183,1,0,0,0,185,
        184,1,0,0,0,186,5,1,0,0,0,187,190,3,8,4,0,188,190,3,12,6,0,189,187,
        1,0,0,0,189,188,1,0,0,0,190,7,1,0,0,0,191,198,3,24,12,0,192,198,
        3,32,16,0,193,198,3,30,15,0,194,198,3,40,20,0,195,198,3,112,56,0,
        196,198,3,116,58,0,197,191,1,0,0,0,197,192,1,0,0,0,197,193,1,0,0,
        0,197,194,1,0,0,0,197,195,1,0,0,0,197,196,1,0,0,0,198,9,1,0,0,0,
        199,200,5,66,0,0,200,203,5,68,0,0,201,204,5,66,0,0,202,204,3,2,1,
        0,203,201,1,0,0,0,203,202,1,0,0,0,204,205,1,0,0,0,205,203,1,0,0,
        0,205,206,1,0,0,0,206,207,1,0,0,0,207,208,5,69,0,0,208,11,1,0,0,
        0,209,210,7,0,0,0,210,211,5,1,0,0,211,212,3,10,5,0,212,13,1,0,0,
        0,213,214,3,78,39,0,214,215,5,1,0,0,215,216,5,66,0,0,216,219,5,68,
        0,0,217,220,5,66,0,0,218,220,3,16,8,0,219,217,1,0,0,0,219,218,1,
        0,0,0,220,221,1,0,0,0,221,219,1,0,0,0,221,222,1,0,0,0,222,223,1,
        0,0,0,223,224,5,69,0,0,224,15,1,0,0,0,225,226,7,1,0,0,226,227,5,
        1,0,0,227,228,3,70,35,0,228,17,1,0,0,0,229,230,5,16,0,0,230,231,
        3,64,32,0,231,19,1,0,0,0,232,233,5,58,0,0,233,236,5,1,0,0,234,237,
        3,70,35,0,235,237,5,58,0,0,236,234,1,0,0,0,236,235,1,0,0,0,237,21,
        1,0,0,0,238,241,3,64,32,0,239,241,3,52,26,0,240,238,1,0,0,0,240,
        239,1,0,0,0,241,245,1,0,0,0,242,244,3,20,10,0,243,242,1,0,0,0,244,
        247,1,0,0,0,245,243,1,0,0,0,245,246,1,0,0,0,246,249,1,0,0,0,247,
        245,1,0,0,0,248,250,3,18,9,0,249,248,1,0,0,0,249,250,1,0,0,0,250,
        23,1,0,0,0,251,252,5,17,0,0,252,253,3,22,11,0,253,25,1,0,0,0,254,
        258,3,22,11,0,255,258,3,18,9,0,256,258,5,20,0,0,257,254,1,0,0,0,
        257,255,1,0,0,0,257,256,1,0,0,0,258,27,1,0,0,0,259,260,7,2,0,0,260,
        29,1,0,0,0,261,262,5,18,0,0,262,263,3,26,13,0,263,31,1,0,0,0,264,
        265,5,19,0,0,265,270,3,26,13,0,266,267,5,2,0,0,267,269,3,26,13,0,
        268,266,1,0,0,0,269,272,1,0,0,0,270,268,1,0,0,0,270,271,1,0,0,0,
        271,33,1,0,0,0,272,270,1,0,0,0,273,274,5,18,0,0,274,275,3,26,13,
        0,275,276,5,19,0,0,276,281,3,26,13,0,277,278,5,2,0,0,278,280,3,26,
        13,0,279,277,1,0,0,0,280,283,1,0,0,0,281,279,1,0,0,0,281,282,1,0,
        0,0,282,284,1,0,0,0,283,281,1,0,0,0,284,285,5,1,0,0,285,286,5,66,
        0,0,286,289,5,68,0,0,287,290,5,66,0,0,288,290,3,36,18,0,289,287,
        1,0,0,0,289,288,1,0,0,0,290,291,1,0,0,0,291,289,1,0,0,0,291,292,
        1,0,0,0,292,293,1,0,0,0,293,294,5,69,0,0,294,35,1,0,0,0,295,296,
        3,28,14,0,296,297,5,1,0,0,297,302,3,38,19,0,298,299,5,2,0,0,299,
        301,3,38,19,0,300,298,1,0,0,0,301,304,1,0,0,0,302,300,1,0,0,0,302,
        303,1,0,0,0,303,37,1,0,0,0,304,302,1,0,0,0,305,306,7,3,0,0,306,39,
        1,0,0,0,307,308,3,44,22,0,308,309,5,66,0,0,309,312,5,68,0,0,310,
        313,5,66,0,0,311,313,3,42,21,0,312,310,1,0,0,0,312,311,1,0,0,0,313,
        314,1,0,0,0,314,312,1,0,0,0,314,315,1,0,0,0,315,316,1,0,0,0,316,
        317,5,69,0,0,317,41,1,0,0,0,318,321,3,2,1,0,319,321,3,46,23,0,320,
        318,1,0,0,0,320,319,1,0,0,0,321,43,1,0,0,0,322,323,3,30,15,0,323,
        327,5,1,0,0,324,326,3,148,74,0,325,324,1,0,0,0,326,329,1,0,0,0,327,
        325,1,0,0,0,327,328,1,0,0,0,328,45,1,0,0,0,329,327,1,0,0,0,330,331,
        3,28,14,0,331,334,5,1,0,0,332,335,3,48,24,0,333,335,3,50,25,0,334,
        332,1,0,0,0,334,333,1,0,0,0,335,47,1,0,0,0,336,339,3,2,1,0,337,339,
        5,56,0,0,338,336,1,0,0,0,338,337,1,0,0,0,339,49,1,0,0,0,340,341,
        3,10,5,0,341,51,1,0,0,0,342,345,3,78,39,0,343,345,3,84,42,0,344,
        342,1,0,0,0,344,343,1,0,0,0,345,346,1,0,0,0,346,347,5,3,0,0,347,
        348,3,64,32,0,348,53,1,0,0,0,349,350,3,78,39,0,350,351,7,4,0,0,351,
        352,3,64,32,0,352,55,1,0,0,0,353,354,5,58,0,0,354,355,5,3,0,0,355,
        356,3,64,32,0,356,57,1,0,0,0,357,362,3,64,32,0,358,359,5,2,0,0,359,
        361,3,64,32,0,360,358,1,0,0,0,361,364,1,0,0,0,362,360,1,0,0,0,362,
        363,1,0,0,0,363,369,1,0,0,0,364,362,1,0,0,0,365,366,5,2,0,0,366,
        368,3,56,28,0,367,365,1,0,0,0,368,371,1,0,0,0,369,367,1,0,0,0,369,
        370,1,0,0,0,370,381,1,0,0,0,371,369,1,0,0,0,372,377,3,56,28,0,373,
        374,5,2,0,0,374,376,3,56,28,0,375,373,1,0,0,0,376,379,1,0,0,0,377,
        375,1,0,0,0,377,378,1,0,0,0,378,381,1,0,0,0,379,377,1,0,0,0,380,
        357,1,0,0,0,380,372,1,0,0,0,381,59,1,0,0,0,382,383,3,78,39,0,383,
        384,5,3,0,0,384,385,3,64,32,0,385,61,1,0,0,0,386,387,5,4,0,0,387,
        388,5,58,0,0,388,389,5,3,0,0,389,390,3,64,32,0,390,63,1,0,0,0,391,
        392,6,32,-1,0,392,393,5,54,0,0,393,394,3,64,32,0,394,395,5,55,0,
        0,395,409,1,0,0,0,396,399,3,70,35,0,397,399,3,78,39,0,398,396,1,
        0,0,0,398,397,1,0,0,0,399,409,1,0,0,0,400,401,3,68,34,0,401,402,
        3,64,32,11,402,409,1,0,0,0,403,409,3,92,46,0,404,409,3,96,48,0,405,
        409,3,98,49,0,406,409,3,84,42,0,407,409,3,114,57,0,408,391,1,0,0,
        0,408,398,1,0,0,0,408,400,1,0,0,0,408,403,1,0,0,0,408,404,1,0,0,
        0,408,405,1,0,0,0,408,406,1,0,0,0,408,407,1,0,0,0,409,430,1,0,0,
        0,410,411,10,10,0,0,411,412,7,5,0,0,412,429,3,64,32,11,413,414,10,
        9,0,0,414,415,7,6,0,0,415,429,3,64,32,10,416,417,10,8,0,0,417,418,
        3,66,33,0,418,419,3,64,32,9,419,429,1,0,0,0,420,421,10,7,0,0,421,
        422,7,7,0,0,422,429,3,64,32,8,423,424,10,1,0,0,424,425,5,5,0,0,425,
        426,3,64,32,0,426,427,5,6,0,0,427,429,1,0,0,0,428,410,1,0,0,0,428,
        413,1,0,0,0,428,416,1,0,0,0,428,420,1,0,0,0,428,423,1,0,0,0,429,
        432,1,0,0,0,430,428,1,0,0,0,430,431,1,0,0,0,431,65,1,0,0,0,432,430,
        1,0,0,0,433,434,7,8,0,0,434,67,1,0,0,0,435,436,7,9,0,0,436,69,1,
        0,0,0,437,439,5,45,0,0,438,437,1,0,0,0,438,439,1,0,0,0,439,440,1,
        0,0,0,440,441,7,10,0,0,441,71,1,0,0,0,442,443,5,24,0,0,443,444,5,
        58,0,0,444,446,5,54,0,0,445,447,3,76,38,0,446,445,1,0,0,0,446,447,
        1,0,0,0,447,448,1,0,0,0,448,449,5,55,0,0,449,450,5,1,0,0,450,451,
        5,66,0,0,451,454,5,68,0,0,452,455,5,66,0,0,453,455,3,74,37,0,454,
        452,1,0,0,0,454,453,1,0,0,0,455,456,1,0,0,0,456,454,1,0,0,0,456,
        457,1,0,0,0,457,458,1,0,0,0,458,459,5,69,0,0,459,73,1,0,0,0,460,
        463,3,2,1,0,461,463,3,88,44,0,462,460,1,0,0,0,462,461,1,0,0,0,463,
        75,1,0,0,0,464,469,5,58,0,0,465,466,5,2,0,0,466,468,5,58,0,0,467,
        465,1,0,0,0,468,471,1,0,0,0,469,467,1,0,0,0,469,470,1,0,0,0,470,
        478,1,0,0,0,471,469,1,0,0,0,472,473,5,2,0,0,473,474,5,58,0,0,474,
        475,5,3,0,0,475,477,3,70,35,0,476,472,1,0,0,0,477,480,1,0,0,0,478,
        476,1,0,0,0,478,479,1,0,0,0,479,494,1,0,0,0,480,478,1,0,0,0,481,
        482,5,58,0,0,482,483,5,3,0,0,483,490,3,70,35,0,484,485,5,2,0,0,485,
        486,5,58,0,0,486,487,5,3,0,0,487,489,3,70,35,0,488,484,1,0,0,0,489,
        492,1,0,0,0,490,488,1,0,0,0,490,491,1,0,0,0,491,494,1,0,0,0,492,
        490,1,0,0,0,493,464,1,0,0,0,493,481,1,0,0,0,494,77,1,0,0,0,495,499,
        5,58,0,0,496,498,3,82,41,0,497,496,1,0,0,0,498,501,1,0,0,0,499,497,
        1,0,0,0,499,500,1,0,0,0,500,79,1,0,0,0,501,499,1,0,0,0,502,504,5,
        54,0,0,503,505,3,58,29,0,504,503,1,0,0,0,504,505,1,0,0,0,505,506,
        1,0,0,0,506,509,5,55,0,0,507,509,3,82,41,0,508,502,1,0,0,0,508,507,
        1,0,0,0,509,81,1,0,0,0,510,511,5,7,0,0,511,517,5,58,0,0,512,513,
        5,5,0,0,513,514,3,64,32,0,514,515,5,6,0,0,515,517,1,0,0,0,516,510,
        1,0,0,0,516,512,1,0,0,0,517,83,1,0,0,0,518,520,3,86,43,0,519,518,
        1,0,0,0,519,520,1,0,0,0,520,521,1,0,0,0,521,523,5,58,0,0,522,524,
        3,80,40,0,523,522,1,0,0,0,524,525,1,0,0,0,525,523,1,0,0,0,525,526,
        1,0,0,0,526,85,1,0,0,0,527,529,5,44,0,0,528,527,1,0,0,0,528,529,
        1,0,0,0,529,530,1,0,0,0,530,532,5,46,0,0,531,533,3,64,32,0,532,531,
        1,0,0,0,532,533,1,0,0,0,533,87,1,0,0,0,534,535,5,23,0,0,535,536,
        3,64,32,0,536,89,1,0,0,0,537,538,3,106,53,0,538,539,5,1,0,0,539,
        540,3,10,5,0,540,91,1,0,0,0,541,542,5,11,0,0,542,543,5,12,0,0,543,
        544,5,1,0,0,544,545,5,66,0,0,545,548,5,68,0,0,546,549,5,66,0,0,547,
        549,3,104,52,0,548,546,1,0,0,0,548,547,1,0,0,0,549,550,1,0,0,0,550,
        548,1,0,0,0,550,551,1,0,0,0,551,552,1,0,0,0,552,553,5,69,0,0,553,
        93,1,0,0,0,554,555,5,66,0,0,555,558,5,68,0,0,556,559,5,66,0,0,557,
        559,3,102,51,0,558,556,1,0,0,0,558,557,1,0,0,0,559,560,1,0,0,0,560,
        558,1,0,0,0,560,561,1,0,0,0,561,562,1,0,0,0,562,563,5,69,0,0,563,
        95,1,0,0,0,564,565,5,11,0,0,565,569,5,13,0,0,566,567,5,54,0,0,567,
        568,5,58,0,0,568,570,5,55,0,0,569,566,1,0,0,0,569,570,1,0,0,0,570,
        571,1,0,0,0,571,572,5,1,0,0,572,573,3,94,47,0,573,97,1,0,0,0,574,
        575,5,11,0,0,575,576,5,14,0,0,576,577,5,1,0,0,577,578,5,66,0,0,578,
        582,5,68,0,0,579,583,5,66,0,0,580,583,3,104,52,0,581,583,3,90,45,
        0,582,579,1,0,0,0,582,580,1,0,0,0,582,581,1,0,0,0,583,584,1,0,0,
        0,584,582,1,0,0,0,584,585,1,0,0,0,585,586,1,0,0,0,586,587,5,69,0,
        0,587,99,1,0,0,0,588,589,5,66,0,0,589,592,5,68,0,0,590,593,5,66,
        0,0,591,593,3,104,52,0,592,590,1,0,0,0,592,591,1,0,0,0,593,594,1,
        0,0,0,594,592,1,0,0,0,594,595,1,0,0,0,595,596,1,0,0,0,596,597,5,
        69,0,0,597,101,1,0,0,0,598,600,7,11,0,0,599,601,5,1,0,0,600,599,
        1,0,0,0,600,601,1,0,0,0,601,608,1,0,0,0,602,609,3,58,29,0,603,604,
        5,54,0,0,604,605,3,58,29,0,605,606,5,55,0,0,606,609,1,0,0,0,607,
        609,3,100,50,0,608,602,1,0,0,0,608,603,1,0,0,0,608,607,1,0,0,0,609,
        625,1,0,0,0,610,611,5,27,0,0,611,616,5,58,0,0,612,613,5,2,0,0,613,
        615,5,58,0,0,614,612,1,0,0,0,615,618,1,0,0,0,616,614,1,0,0,0,616,
        617,1,0,0,0,617,619,1,0,0,0,618,616,1,0,0,0,619,620,5,28,0,0,620,
        621,3,64,32,0,621,622,5,1,0,0,622,623,3,94,47,0,623,625,1,0,0,0,
        624,598,1,0,0,0,624,610,1,0,0,0,625,103,1,0,0,0,626,630,3,106,53,
        0,627,629,5,63,0,0,628,627,1,0,0,0,629,632,1,0,0,0,630,628,1,0,0,
        0,630,631,1,0,0,0,631,633,1,0,0,0,632,630,1,0,0,0,633,634,5,1,0,
        0,634,635,3,108,54,0,635,105,1,0,0,0,636,637,7,12,0,0,637,107,1,
        0,0,0,638,648,3,100,50,0,639,644,3,64,32,0,640,641,5,2,0,0,641,643,
        3,64,32,0,642,640,1,0,0,0,643,646,1,0,0,0,644,642,1,0,0,0,644,645,
        1,0,0,0,645,648,1,0,0,0,646,644,1,0,0,0,647,638,1,0,0,0,647,639,
        1,0,0,0,648,109,1,0,0,0,649,652,5,58,0,0,650,653,5,60,0,0,651,653,
        3,64,32,0,652,650,1,0,0,0,652,651,1,0,0,0,653,656,1,0,0,0,654,656,
        5,58,0,0,655,649,1,0,0,0,655,654,1,0,0,0,656,111,1,0,0,0,657,661,
        5,15,0,0,658,660,3,110,55,0,659,658,1,0,0,0,660,663,1,0,0,0,661,
        659,1,0,0,0,661,662,1,0,0,0,662,113,1,0,0,0,663,661,1,0,0,0,664,
        675,5,5,0,0,665,670,3,64,32,0,666,667,5,2,0,0,667,669,3,64,32,0,
        668,666,1,0,0,0,669,672,1,0,0,0,670,668,1,0,0,0,670,671,1,0,0,0,
        671,674,1,0,0,0,672,670,1,0,0,0,673,665,1,0,0,0,674,677,1,0,0,0,
        675,673,1,0,0,0,675,676,1,0,0,0,676,678,1,0,0,0,677,675,1,0,0,0,
        678,679,5,6,0,0,679,115,1,0,0,0,680,683,5,20,0,0,681,684,5,58,0,
        0,682,684,3,64,32,0,683,681,1,0,0,0,683,682,1,0,0,0,684,117,1,0,
        0,0,685,686,5,25,0,0,686,688,5,58,0,0,687,689,3,120,60,0,688,687,
        1,0,0,0,688,689,1,0,0,0,689,708,1,0,0,0,690,691,5,26,0,0,691,692,
        5,58,0,0,692,702,5,25,0,0,693,703,5,47,0,0,694,699,5,58,0,0,695,
        696,5,2,0,0,696,698,5,58,0,0,697,695,1,0,0,0,698,701,1,0,0,0,699,
        697,1,0,0,0,699,700,1,0,0,0,700,703,1,0,0,0,701,699,1,0,0,0,702,
        693,1,0,0,0,702,694,1,0,0,0,703,705,1,0,0,0,704,706,3,120,60,0,705,
        704,1,0,0,0,705,706,1,0,0,0,706,708,1,0,0,0,707,685,1,0,0,0,707,
        690,1,0,0,0,708,119,1,0,0,0,709,713,5,59,0,0,710,712,7,13,0,0,711,
        710,1,0,0,0,712,715,1,0,0,0,713,711,1,0,0,0,713,714,1,0,0,0,714,
        121,1,0,0,0,715,713,1,0,0,0,716,717,7,14,0,0,717,718,5,1,0,0,718,
        719,3,10,5,0,719,123,1,0,0,0,720,721,5,31,0,0,721,722,3,64,32,0,
        722,723,5,1,0,0,723,727,3,10,5,0,724,726,3,126,63,0,725,724,1,0,
        0,0,726,729,1,0,0,0,727,725,1,0,0,0,727,728,1,0,0,0,728,731,1,0,
        0,0,729,727,1,0,0,0,730,732,3,128,64,0,731,730,1,0,0,0,731,732,1,
        0,0,0,732,125,1,0,0,0,733,734,5,32,0,0,734,735,5,31,0,0,735,736,
        3,64,32,0,736,737,5,1,0,0,737,738,3,10,5,0,738,127,1,0,0,0,739,740,
        5,32,0,0,740,741,5,1,0,0,741,742,3,10,5,0,742,129,1,0,0,0,743,744,
        5,29,0,0,744,745,3,64,32,0,745,746,5,1,0,0,746,747,3,10,5,0,747,
        131,1,0,0,0,748,749,5,27,0,0,749,754,5,58,0,0,750,751,5,2,0,0,751,
        753,5,58,0,0,752,750,1,0,0,0,753,756,1,0,0,0,754,752,1,0,0,0,754,
        755,1,0,0,0,755,757,1,0,0,0,756,754,1,0,0,0,757,758,5,28,0,0,758,
        759,3,64,32,0,759,760,5,1,0,0,760,761,3,10,5,0,761,133,1,0,0,0,762,
        763,5,8,0,0,763,764,5,1,0,0,764,769,3,64,32,0,765,766,5,2,0,0,766,
        768,3,64,32,0,767,765,1,0,0,0,768,771,1,0,0,0,769,767,1,0,0,0,769,
        770,1,0,0,0,770,772,1,0,0,0,771,769,1,0,0,0,772,773,5,1,0,0,773,
        774,3,138,69,0,774,135,1,0,0,0,775,776,7,15,0,0,776,137,1,0,0,0,
        777,778,5,66,0,0,778,781,5,68,0,0,779,782,5,66,0,0,780,782,3,140,
        70,0,781,779,1,0,0,0,781,780,1,0,0,0,782,783,1,0,0,0,783,781,1,0,
        0,0,783,784,1,0,0,0,784,785,1,0,0,0,785,786,5,69,0,0,786,139,1,0,
        0,0,787,791,3,142,71,0,788,791,3,146,73,0,789,791,3,144,72,0,790,
        787,1,0,0,0,790,788,1,0,0,0,790,789,1,0,0,0,791,141,1,0,0,0,792,
        793,3,136,68,0,793,794,5,1,0,0,794,802,3,64,32,0,795,796,5,2,0,0,
        796,797,3,136,68,0,797,798,5,1,0,0,798,799,3,64,32,0,799,801,1,0,
        0,0,800,795,1,0,0,0,801,804,1,0,0,0,802,800,1,0,0,0,802,803,1,0,
        0,0,803,809,1,0,0,0,804,802,1,0,0,0,805,806,5,2,0,0,806,808,3,136,
        68,0,807,805,1,0,0,0,808,811,1,0,0,0,809,807,1,0,0,0,809,810,1,0,
        0,0,810,812,1,0,0,0,811,809,1,0,0,0,812,822,5,1,0,0,813,823,3,138,
        69,0,814,819,3,64,32,0,815,816,5,2,0,0,816,818,3,64,32,0,817,815,
        1,0,0,0,818,821,1,0,0,0,819,817,1,0,0,0,819,820,1,0,0,0,820,823,
        1,0,0,0,821,819,1,0,0,0,822,813,1,0,0,0,822,814,1,0,0,0,823,143,
        1,0,0,0,824,825,3,136,68,0,825,826,5,1,0,0,826,827,3,138,69,0,827,
        145,1,0,0,0,828,829,3,136,68,0,829,830,5,1,0,0,830,835,3,64,32,0,
        831,832,5,2,0,0,832,834,3,64,32,0,833,831,1,0,0,0,834,837,1,0,0,
        0,835,833,1,0,0,0,835,836,1,0,0,0,836,147,1,0,0,0,837,835,1,0,0,
        0,838,839,5,59,0,0,839,840,5,58,0,0,840,149,1,0,0,0,94,152,154,159,
        161,178,185,189,197,203,205,219,221,236,240,245,249,257,270,281,
        289,291,302,312,314,320,327,334,338,344,362,369,377,380,398,408,
        428,430,438,446,454,456,462,469,478,490,493,499,504,508,516,519,
        525,528,532,548,550,558,560,569,582,584,592,594,600,608,616,624,
        630,644,647,652,655,661,670,675,683,688,699,702,705,707,713,727,
        731,754,769,781,783,790,802,809,819,822,835
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
    public part_set_expr(): Part_set_exprContext | null {
        return this.getRuleContext(0, Part_set_exprContext);
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
    public annotation_comment_expr(): Annotation_comment_exprContext[];
    public annotation_comment_expr(i: number): Annotation_comment_exprContext | null;
    public annotation_comment_expr(i?: number): Annotation_comment_exprContext[] | Annotation_comment_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Annotation_comment_exprContext);
        }

        return this.getRuleContext(i, Annotation_comment_exprContext);
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
    public _extra?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public property_key_expr(): Property_key_exprContext {
        return this.getRuleContext(0, Property_key_exprContext)!;
    }
    public property_value_expr(): Property_value_exprContext {
        return this.getRuleContext(0, Property_value_exprContext)!;
    }
    public STRING_VALUE(): antlr.TerminalNode[];
    public STRING_VALUE(i: number): antlr.TerminalNode | null;
    public STRING_VALUE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(CircuitScriptParser.STRING_VALUE);
    	} else {
    		return this.getToken(CircuitScriptParser.STRING_VALUE, i);
    	}
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
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_import_expr;
    }
    public override copyFrom(ctx: Import_exprContext): void {
        super.copyFrom(ctx);
    }
}
export class Import_specific_or_allContext extends Import_exprContext {
    public _libraryName?: Token | null;
    public _all?: Token | null;
    public _ID?: Token | null;
    public _funcNames: antlr.Token[] = [];
    public constructor(ctx: Import_exprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public From(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.From, 0)!;
    }
    public Import(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Import, 0)!;
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
    public Multiply(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.Multiply, 0);
    }
    public import_annotation_expr(): Import_annotation_exprContext | null {
        return this.getRuleContext(0, Import_annotation_exprContext);
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitImport_specific_or_all) {
            return visitor.visitImport_specific_or_all(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class Import_simpleContext extends Import_exprContext {
    public _libraryName?: Token | null;
    public constructor(ctx: Import_exprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public Import(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Import, 0)!;
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.ID, 0)!;
    }
    public import_annotation_expr(): Import_annotation_exprContext | null {
        return this.getRuleContext(0, Import_annotation_exprContext);
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitImport_simple) {
            return visitor.visitImport_simple(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Import_annotation_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ANNOTATION_START(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.ANNOTATION_START, 0)!;
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
    public Minus(): antlr.TerminalNode[];
    public Minus(i: number): antlr.TerminalNode | null;
    public Minus(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(CircuitScriptParser.Minus);
    	} else {
    		return this.getToken(CircuitScriptParser.Minus, i);
    	}
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_import_annotation_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitImport_annotation_expr) {
            return visitor.visitImport_annotation_expr(this);
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


export class Part_set_exprContext extends antlr.ParserRuleContext {
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
    public part_match_block(): Part_match_blockContext {
        return this.getRuleContext(0, Part_match_blockContext)!;
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_part_set_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitPart_set_expr) {
            return visitor.visitPart_set_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Part_set_keyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ID(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.ID, 0);
    }
    public INTEGER_VALUE(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.INTEGER_VALUE, 0);
    }
    public NUMERIC_VALUE(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.NUMERIC_VALUE, 0);
    }
    public STRING_VALUE(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.STRING_VALUE, 0);
    }
    public PERCENTAGE_VALUE(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.PERCENTAGE_VALUE, 0);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_part_set_key;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitPart_set_key) {
            return visitor.visitPart_set_key(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Part_match_blockContext extends antlr.ParserRuleContext {
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
    public part_sub_expr(): Part_sub_exprContext[];
    public part_sub_expr(i: number): Part_sub_exprContext | null;
    public part_sub_expr(i?: number): Part_sub_exprContext[] | Part_sub_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Part_sub_exprContext);
        }

        return this.getRuleContext(i, Part_sub_exprContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_part_match_block;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitPart_match_block) {
            return visitor.visitPart_match_block(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Part_sub_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public part_condition_expr(): Part_condition_exprContext | null {
        return this.getRuleContext(0, Part_condition_exprContext);
    }
    public part_value_expr(): Part_value_exprContext | null {
        return this.getRuleContext(0, Part_value_exprContext);
    }
    public part_condition_key_only_expr(): Part_condition_key_only_exprContext | null {
        return this.getRuleContext(0, Part_condition_key_only_exprContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_part_sub_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitPart_sub_expr) {
            return visitor.visitPart_sub_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Part_condition_exprContext extends antlr.ParserRuleContext {
    public _part_set_key?: Part_set_keyContext;
    public _key_id: Part_set_keyContext[] = [];
    public _data_expr?: Data_exprContext;
    public _values: Data_exprContext[] = [];
    public _id_only?: Part_set_keyContext;
    public _last_data: Data_exprContext[] = [];
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public part_set_key(): Part_set_keyContext[];
    public part_set_key(i: number): Part_set_keyContext | null;
    public part_set_key(i?: number): Part_set_keyContext[] | Part_set_keyContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Part_set_keyContext);
        }

        return this.getRuleContext(i, Part_set_keyContext);
    }
    public data_expr(): Data_exprContext[];
    public data_expr(i: number): Data_exprContext | null;
    public data_expr(i?: number): Data_exprContext[] | Data_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Data_exprContext);
        }

        return this.getRuleContext(i, Data_exprContext);
    }
    public part_match_block(): Part_match_blockContext | null {
        return this.getRuleContext(0, Part_match_blockContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_part_condition_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitPart_condition_expr) {
            return visitor.visitPart_condition_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Part_condition_key_only_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public part_set_key(): Part_set_keyContext {
        return this.getRuleContext(0, Part_set_keyContext)!;
    }
    public part_match_block(): Part_match_blockContext {
        return this.getRuleContext(0, Part_match_blockContext)!;
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_part_condition_key_only_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitPart_condition_key_only_expr) {
            return visitor.visitPart_condition_key_only_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Part_value_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public part_set_key(): Part_set_keyContext {
        return this.getRuleContext(0, Part_set_keyContext)!;
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
        return CircuitScriptParser.RULE_part_value_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitPart_value_expr) {
            return visitor.visitPart_value_expr(this);
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
