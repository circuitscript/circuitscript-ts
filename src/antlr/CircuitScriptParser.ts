// Generated from src/antlr/CircuitScriptParser.g4 by ANTLR 4.13.1

import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { CircuitScriptParserVisitor } from "./CircuitScriptParserVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class CircuitScriptParser extends antlr.Parser {
    public static readonly INDENT = 1;
    public static readonly DEDENT = 2;
    public static readonly Break = 3;
    public static readonly Branch = 4;
    public static readonly Create = 5;
    public static readonly Component = 6;
    public static readonly Graphic = 7;
    public static readonly Module = 8;
    public static readonly Wire = 9;
    public static readonly Pin = 10;
    public static readonly Add = 11;
    public static readonly At = 12;
    public static readonly To = 13;
    public static readonly Point = 14;
    public static readonly Join = 15;
    public static readonly Parallel = 16;
    public static readonly Return = 17;
    public static readonly Define = 18;
    public static readonly Import = 19;
    public static readonly From = 20;
    public static readonly For = 21;
    public static readonly In = 22;
    public static readonly While = 23;
    public static readonly Continue = 24;
    public static readonly If = 25;
    public static readonly Else = 26;
    public static readonly Not = 27;
    public static readonly Frame = 28;
    public static readonly Sheet = 29;
    public static readonly Set = 30;
    public static readonly Colon = 31;
    public static readonly Comma = 32;
    public static readonly Dot = 33;
    public static readonly DoubleDot = 34;
    public static readonly LSquare = 35;
    public static readonly RSquare = 36;
    public static readonly Assign = 37;
    public static readonly Equals = 38;
    public static readonly NotEquals = 39;
    public static readonly GreaterThan = 40;
    public static readonly GreatOrEqualThan = 41;
    public static readonly LessThan = 42;
    public static readonly LessOrEqualThan = 43;
    public static readonly LogicalAnd = 44;
    public static readonly LogicalOr = 45;
    public static readonly Addition = 46;
    public static readonly Minus = 47;
    public static readonly Divide = 48;
    public static readonly Multiply = 49;
    public static readonly Modulus = 50;
    public static readonly AdditionAssign = 51;
    public static readonly MinusAssign = 52;
    public static readonly DivideAssign = 53;
    public static readonly MultiplyAssign = 54;
    public static readonly ModulusAssign = 55;
    public static readonly WS = 56;
    public static readonly NEWLINE = 57;
    public static readonly COMMENT = 58;
    public static readonly LParen = 59;
    public static readonly RParen = 60;
    public static readonly NOT_CONNECTED = 61;
    public static readonly BOOLEAN_VALUE = 62;
    public static readonly ANNOTATION_START = 63;
    public static readonly INTEGER_VALUE = 64;
    public static readonly DECIMAL_VALUE = 65;
    public static readonly NUMERIC_VALUE = 66;
    public static readonly PERCENTAGE_VALUE = 67;
    public static readonly STRING_VALUE = 68;
    public static readonly ID = 69;
    public static readonly RULE_script = 0;
    public static readonly RULE_expression = 1;
    public static readonly RULE_flow_expressions = 2;
    public static readonly RULE_graph_expressions = 3;
    public static readonly RULE_expressions_block = 4;
    public static readonly RULE_path_block = 5;
    public static readonly RULE_property_set_expr2 = 6;
    public static readonly RULE_assignment_expr2 = 7;
    public static readonly RULE_pin_select_expr = 8;
    public static readonly RULE_component_modifier_expr = 9;
    public static readonly RULE_data_expr_with_assignment = 10;
    public static readonly RULE_add_component_expr = 11;
    public static readonly RULE_component_select_expr = 12;
    public static readonly RULE_pin_select_expr2 = 13;
    public static readonly RULE_at_component_expr = 14;
    public static readonly RULE_to_component_expr = 15;
    public static readonly RULE_at_block = 16;
    public static readonly RULE_at_block_expressions = 17;
    public static readonly RULE_at_block_header = 18;
    public static readonly RULE_at_block_pin_expr = 19;
    public static readonly RULE_at_block_pin_expression_simple = 20;
    public static readonly RULE_at_block_pin_expression_complex = 21;
    public static readonly RULE_assignment_expr = 22;
    public static readonly RULE_operator_assignment_expr = 23;
    public static readonly RULE_keyword_assignment_expr = 24;
    public static readonly RULE_parameters = 25;
    public static readonly RULE_property_set_expr = 26;
    public static readonly RULE_double_dot_property_set_expr = 27;
    public static readonly RULE_data_expr = 28;
    public static readonly RULE_binary_operator = 29;
    public static readonly RULE_value_expr = 30;
    public static readonly RULE_function_def_expr = 31;
    public static readonly RULE_function_expr = 32;
    public static readonly RULE_function_args_expr = 33;
    public static readonly RULE_atom_expr = 34;
    public static readonly RULE_trailer_expr = 35;
    public static readonly RULE_trailer_expr2 = 36;
    public static readonly RULE_function_call_expr = 37;
    public static readonly RULE_net_namespace_expr = 38;
    public static readonly RULE_function_return_expr = 39;
    public static readonly RULE_property_block_expr = 40;
    public static readonly RULE_graphic_expressions_block = 41;
    public static readonly RULE_create_expr = 42;
    public static readonly RULE_create_component_expr = 43;
    public static readonly RULE_create_graphic_expr = 44;
    public static readonly RULE_create_module_expr = 45;
    public static readonly RULE_nested_properties_inner = 46;
    public static readonly RULE_graphic_expr = 47;
    public static readonly RULE_property_expr = 48;
    public static readonly RULE_property_key_expr = 49;
    public static readonly RULE_property_value_expr = 50;
    public static readonly RULE_wire_atom_expr = 51;
    public static readonly RULE_wire_expr = 52;
    public static readonly RULE_point_expr = 53;
    public static readonly RULE_import_expr = 54;
    public static readonly RULE_import_annotation_expr = 55;
    public static readonly RULE_frame_expr = 56;
    public static readonly RULE_if_expr = 57;
    public static readonly RULE_if_inner_expr = 58;
    public static readonly RULE_else_expr = 59;
    public static readonly RULE_while_expr = 60;
    public static readonly RULE_for_expr = 61;
    public static readonly RULE_part_set_expr = 62;
    public static readonly RULE_part_set_key = 63;
    public static readonly RULE_part_match_block = 64;
    public static readonly RULE_part_sub_expr = 65;
    public static readonly RULE_part_condition_expr = 66;
    public static readonly RULE_part_condition_key_only_expr = 67;
    public static readonly RULE_part_value_expr = 68;
    public static readonly RULE_annotation_comment_expr = 69;

    public static readonly literalNames = [
        null, null, null, "'break'", "'branch'", "'create'", "'component'", 
        "'graphic'", "'module'", "'wire'", "'pin'", "'add'", "'at'", "'to'", 
        "'point'", "'join'", "'parallel'", "'return'", "'def'", "'import'", 
        "'from'", "'for'", "'in'", "'while'", "'continue'", "'if'", "'else'", 
        null, "'frame'", "'sheet'", "'set'", "':'", "','", "'.'", "'..'", 
        "'['", "']'", "'='", "'=='", "'!='", "'>'", "'>='", "'<'", "'<='", 
        null, null, "'+'", "'-'", "'/'", "'*'", "'%'", "'+='", "'-='", "'/='", 
        "'*='", "'%='", null, null, null, "'('", "')'", null, null, "'#='"
    ];

    public static readonly symbolicNames = [
        null, "INDENT", "DEDENT", "Break", "Branch", "Create", "Component", 
        "Graphic", "Module", "Wire", "Pin", "Add", "At", "To", "Point", 
        "Join", "Parallel", "Return", "Define", "Import", "From", "For", 
        "In", "While", "Continue", "If", "Else", "Not", "Frame", "Sheet", 
        "Set", "Colon", "Comma", "Dot", "DoubleDot", "LSquare", "RSquare", 
        "Assign", "Equals", "NotEquals", "GreaterThan", "GreatOrEqualThan", 
        "LessThan", "LessOrEqualThan", "LogicalAnd", "LogicalOr", "Addition", 
        "Minus", "Divide", "Multiply", "Modulus", "AdditionAssign", "MinusAssign", 
        "DivideAssign", "MultiplyAssign", "ModulusAssign", "WS", "NEWLINE", 
        "COMMENT", "LParen", "RParen", "NOT_CONNECTED", "BOOLEAN_VALUE", 
        "ANNOTATION_START", "INTEGER_VALUE", "DECIMAL_VALUE", "NUMERIC_VALUE", 
        "PERCENTAGE_VALUE", "STRING_VALUE", "ID"
    ];
    public static readonly ruleNames = [
        "script", "expression", "flow_expressions", "graph_expressions", 
        "expressions_block", "path_block", "property_set_expr2", "assignment_expr2", 
        "pin_select_expr", "component_modifier_expr", "data_expr_with_assignment", 
        "add_component_expr", "component_select_expr", "pin_select_expr2", 
        "at_component_expr", "to_component_expr", "at_block", "at_block_expressions", 
        "at_block_header", "at_block_pin_expr", "at_block_pin_expression_simple", 
        "at_block_pin_expression_complex", "assignment_expr", "operator_assignment_expr", 
        "keyword_assignment_expr", "parameters", "property_set_expr", "double_dot_property_set_expr", 
        "data_expr", "binary_operator", "value_expr", "function_def_expr", 
        "function_expr", "function_args_expr", "atom_expr", "trailer_expr", 
        "trailer_expr2", "function_call_expr", "net_namespace_expr", "function_return_expr", 
        "property_block_expr", "graphic_expressions_block", "create_expr", 
        "create_component_expr", "create_graphic_expr", "create_module_expr", 
        "nested_properties_inner", "graphic_expr", "property_expr", "property_key_expr", 
        "property_value_expr", "wire_atom_expr", "wire_expr", "point_expr", 
        "import_expr", "import_annotation_expr", "frame_expr", "if_expr", 
        "if_inner_expr", "else_expr", "while_expr", "for_expr", "part_set_expr", 
        "part_set_key", "part_match_block", "part_sub_expr", "part_condition_expr", 
        "part_condition_key_only_expr", "part_value_expr", "annotation_comment_expr",
    ];

    public get grammarFileName(): string { return "CircuitScriptParser.g4"; }
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
            this.state = 144;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 1, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    this.state = 142;
                    this.errorHandler.sync(this);
                    switch (this.tokenStream.LA(1)) {
                    case CircuitScriptParser.Import:
                    case CircuitScriptParser.From:
                        {
                        this.state = 140;
                        this.import_expr();
                        }
                        break;
                    case CircuitScriptParser.NEWLINE:
                        {
                        this.state = 141;
                        this.match(CircuitScriptParser.NEWLINE);
                        }
                        break;
                    default:
                        throw new antlr.NoViableAltException(this);
                    }
                    }
                }
                this.state = 146;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 1, this.context);
            }
            this.state = 150;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 3)) & ~0x1F) === 0 && ((1 << (_la - 3)) & 2390015811) !== 0) || ((((_la - 46)) & ~0x1F) === 0 && ((1 << (_la - 46)) & 8521733) !== 0)) {
                {
                {
                this.state = 147;
                this.expression();
                }
                }
                this.state = 152;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 153;
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
            this.state = 169;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 155;
                this.graph_expressions();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 156;
                this.assignment_expr();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 157;
                this.operator_assignment_expr();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 158;
                this.property_set_expr();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 159;
                this.property_set_expr2();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 160;
                this.double_dot_property_set_expr();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 161;
                this.function_def_expr();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 162;
                this.atom_expr();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 163;
                this.function_call_expr();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 164;
                this.frame_expr();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 165;
                this.flow_expressions();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 166;
                this.annotation_comment_expr();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 167;
                this.part_set_expr();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 168;
                this.match(CircuitScriptParser.NEWLINE);
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
            this.state = 176;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.If:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 171;
                this.if_expr();
                }
                break;
            case CircuitScriptParser.While:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 172;
                this.while_expr();
                }
                break;
            case CircuitScriptParser.For:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 173;
                this.for_expr();
                }
                break;
            case CircuitScriptParser.Break:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 174;
                this.match(CircuitScriptParser.Break);
                }
                break;
            case CircuitScriptParser.Continue:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 175;
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
            this.state = 185;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 5, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 178;
                this.add_component_expr();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 179;
                this.to_component_expr();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 180;
                this.at_component_expr();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 181;
                this.at_block();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 182;
                this.wire_expr();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 183;
                this.point_expr();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 184;
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
    public expressions_block(): Expressions_blockContext {
        let localContext = new Expressions_blockContext(this.context, this.state);
        this.enterRule(localContext, 8, CircuitScriptParser.RULE_expressions_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 187;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 188;
            this.match(CircuitScriptParser.INDENT);
            this.state = 190;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 189;
                this.expression();
                }
                }
                this.state = 192;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 3)) & ~0x1F) === 0 && ((1 << (_la - 3)) & 2390015811) !== 0) || ((((_la - 46)) & ~0x1F) === 0 && ((1 << (_la - 46)) & 8521733) !== 0));
            this.state = 194;
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
        this.enterRule(localContext, 10, CircuitScriptParser.RULE_path_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 196;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 114704) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 197;
            this.match(CircuitScriptParser.Colon);
            this.state = 198;
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
        this.enterRule(localContext, 12, CircuitScriptParser.RULE_property_set_expr2);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 200;
            this.atom_expr();
            this.state = 201;
            this.match(CircuitScriptParser.Colon);
            this.state = 202;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 203;
            this.match(CircuitScriptParser.INDENT);
            this.state = 206;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 206;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 204;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case CircuitScriptParser.INTEGER_VALUE:
                case CircuitScriptParser.ID:
                    {
                    this.state = 205;
                    this.assignment_expr2();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 208;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 4225) !== 0));
            this.state = 210;
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
        this.enterRule(localContext, 14, CircuitScriptParser.RULE_assignment_expr2);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 212;
            _la = this.tokenStream.LA(1);
            if(!(_la === 64 || _la === 69)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 213;
            this.match(CircuitScriptParser.Colon);
            this.state = 214;
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
        this.enterRule(localContext, 16, CircuitScriptParser.RULE_pin_select_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 216;
            this.match(CircuitScriptParser.Pin);
            this.state = 217;
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
        this.enterRule(localContext, 18, CircuitScriptParser.RULE_component_modifier_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 219;
            this.match(CircuitScriptParser.ID);
            this.state = 220;
            this.match(CircuitScriptParser.Colon);
            this.state = 223;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.Minus:
            case CircuitScriptParser.BOOLEAN_VALUE:
            case CircuitScriptParser.INTEGER_VALUE:
            case CircuitScriptParser.DECIMAL_VALUE:
            case CircuitScriptParser.NUMERIC_VALUE:
            case CircuitScriptParser.PERCENTAGE_VALUE:
            case CircuitScriptParser.STRING_VALUE:
                {
                this.state = 221;
                this.value_expr();
                }
                break;
            case CircuitScriptParser.ID:
                {
                this.state = 222;
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
        this.enterRule(localContext, 20, CircuitScriptParser.RULE_data_expr_with_assignment);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 227;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 10, this.context) ) {
            case 1:
                {
                this.state = 225;
                this.data_expr(0);
                }
                break;
            case 2:
                {
                this.state = 226;
                this.assignment_expr();
                }
                break;
            }
            this.state = 232;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 11, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 229;
                    this.component_modifier_expr();
                    }
                    }
                }
                this.state = 234;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 11, this.context);
            }
            this.state = 236;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 10) {
                {
                this.state = 235;
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
        this.enterRule(localContext, 22, CircuitScriptParser.RULE_add_component_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 238;
            this.match(CircuitScriptParser.Add);
            this.state = 239;
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
        this.enterRule(localContext, 24, CircuitScriptParser.RULE_component_select_expr);
        try {
            this.state = 244;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.Create:
            case CircuitScriptParser.Not:
            case CircuitScriptParser.LSquare:
            case CircuitScriptParser.Addition:
            case CircuitScriptParser.Minus:
            case CircuitScriptParser.Divide:
            case CircuitScriptParser.LParen:
            case CircuitScriptParser.BOOLEAN_VALUE:
            case CircuitScriptParser.INTEGER_VALUE:
            case CircuitScriptParser.DECIMAL_VALUE:
            case CircuitScriptParser.NUMERIC_VALUE:
            case CircuitScriptParser.PERCENTAGE_VALUE:
            case CircuitScriptParser.STRING_VALUE:
            case CircuitScriptParser.ID:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 241;
                this.data_expr_with_assignment();
                }
                break;
            case CircuitScriptParser.Pin:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 242;
                this.pin_select_expr();
                }
                break;
            case CircuitScriptParser.Point:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 243;
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
        this.enterRule(localContext, 26, CircuitScriptParser.RULE_pin_select_expr2);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 246;
            _la = this.tokenStream.LA(1);
            if(!(_la === 64 || _la === 68)) {
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
        this.enterRule(localContext, 28, CircuitScriptParser.RULE_at_component_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 248;
            this.match(CircuitScriptParser.At);
            this.state = 249;
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
        this.enterRule(localContext, 30, CircuitScriptParser.RULE_to_component_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 251;
            this.match(CircuitScriptParser.To);
            this.state = 252;
            this.component_select_expr();
            this.state = 257;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 32) {
                {
                {
                this.state = 253;
                this.match(CircuitScriptParser.Comma);
                this.state = 254;
                this.component_select_expr();
                }
                }
                this.state = 259;
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
    public at_block(): At_blockContext {
        let localContext = new At_blockContext(this.context, this.state);
        this.enterRule(localContext, 32, CircuitScriptParser.RULE_at_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 260;
            this.at_block_header();
            this.state = 261;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 262;
            this.match(CircuitScriptParser.INDENT);
            this.state = 265;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 265;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 15, this.context) ) {
                case 1:
                    {
                    this.state = 263;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case 2:
                    {
                    this.state = 264;
                    this.at_block_expressions();
                    }
                    break;
                }
                }
                this.state = 267;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 3)) & ~0x1F) === 0 && ((1 << (_la - 3)) & 2390015811) !== 0) || ((((_la - 46)) & ~0x1F) === 0 && ((1 << (_la - 46)) & 12978181) !== 0));
            this.state = 269;
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
        this.enterRule(localContext, 34, CircuitScriptParser.RULE_at_block_expressions);
        try {
            this.state = 273;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
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
            case CircuitScriptParser.Set:
            case CircuitScriptParser.DoubleDot:
            case CircuitScriptParser.Addition:
            case CircuitScriptParser.Divide:
            case CircuitScriptParser.NEWLINE:
            case CircuitScriptParser.ANNOTATION_START:
            case CircuitScriptParser.ID:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 271;
                this.expression();
                }
                break;
            case CircuitScriptParser.INTEGER_VALUE:
            case CircuitScriptParser.STRING_VALUE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 272;
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
        this.enterRule(localContext, 36, CircuitScriptParser.RULE_at_block_header);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 275;
            this.at_component_expr();
            this.state = 276;
            this.match(CircuitScriptParser.Colon);
            this.state = 280;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 63) {
                {
                {
                this.state = 277;
                this.annotation_comment_expr();
                }
                }
                this.state = 282;
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
        this.enterRule(localContext, 38, CircuitScriptParser.RULE_at_block_pin_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 283;
            this.pin_select_expr2();
            this.state = 284;
            this.match(CircuitScriptParser.Colon);
            this.state = 287;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 19, this.context) ) {
            case 1:
                {
                this.state = 285;
                this.at_block_pin_expression_simple();
                }
                break;
            case 2:
                {
                this.state = 286;
                this.at_block_pin_expression_complex();
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
    public at_block_pin_expression_simple(): At_block_pin_expression_simpleContext {
        let localContext = new At_block_pin_expression_simpleContext(this.context, this.state);
        this.enterRule(localContext, 40, CircuitScriptParser.RULE_at_block_pin_expression_simple);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 291;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
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
            case CircuitScriptParser.Set:
            case CircuitScriptParser.DoubleDot:
            case CircuitScriptParser.Addition:
            case CircuitScriptParser.Divide:
            case CircuitScriptParser.NEWLINE:
            case CircuitScriptParser.ANNOTATION_START:
            case CircuitScriptParser.ID:
                {
                this.state = 289;
                this.expression();
                }
                break;
            case CircuitScriptParser.NOT_CONNECTED:
                {
                this.state = 290;
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
        this.enterRule(localContext, 42, CircuitScriptParser.RULE_at_block_pin_expression_complex);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 293;
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
        this.enterRule(localContext, 44, CircuitScriptParser.RULE_assignment_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 297;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 21, this.context) ) {
            case 1:
                {
                this.state = 295;
                this.atom_expr();
                }
                break;
            case 2:
                {
                this.state = 296;
                this.function_call_expr();
                }
                break;
            }
            this.state = 299;
            this.match(CircuitScriptParser.Assign);
            this.state = 300;
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
        this.enterRule(localContext, 46, CircuitScriptParser.RULE_operator_assignment_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 302;
            this.atom_expr();
            this.state = 303;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 31) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 304;
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
        this.enterRule(localContext, 48, CircuitScriptParser.RULE_keyword_assignment_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 306;
            this.match(CircuitScriptParser.ID);
            this.state = 307;
            this.match(CircuitScriptParser.Assign);
            this.state = 308;
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
        this.enterRule(localContext, 50, CircuitScriptParser.RULE_parameters);
        let _la: number;
        try {
            let alternative: number;
            this.state = 333;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 25, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                {
                this.state = 310;
                this.data_expr(0);
                this.state = 315;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 22, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 311;
                        this.match(CircuitScriptParser.Comma);
                        this.state = 312;
                        this.data_expr(0);
                        }
                        }
                    }
                    this.state = 317;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 22, this.context);
                }
                this.state = 322;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 32) {
                    {
                    {
                    this.state = 318;
                    this.match(CircuitScriptParser.Comma);
                    this.state = 319;
                    this.keyword_assignment_expr();
                    }
                    }
                    this.state = 324;
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
                this.state = 325;
                this.keyword_assignment_expr();
                this.state = 330;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 32) {
                    {
                    {
                    this.state = 326;
                    this.match(CircuitScriptParser.Comma);
                    this.state = 327;
                    this.keyword_assignment_expr();
                    }
                    }
                    this.state = 332;
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
        this.enterRule(localContext, 52, CircuitScriptParser.RULE_property_set_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 335;
            this.atom_expr();
            this.state = 336;
            this.match(CircuitScriptParser.Assign);
            this.state = 337;
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
        this.enterRule(localContext, 54, CircuitScriptParser.RULE_double_dot_property_set_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 339;
            this.match(CircuitScriptParser.DoubleDot);
            this.state = 340;
            this.match(CircuitScriptParser.ID);
            this.state = 341;
            this.match(CircuitScriptParser.Assign);
            this.state = 342;
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
        let _startState = 56;
        this.enterRecursionRule(localContext, 56, CircuitScriptParser.RULE_data_expr, _p);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 371;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 28, this.context) ) {
            case 1:
                {
                localContext = new RoundedBracketsExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;

                this.state = 345;
                this.match(CircuitScriptParser.LParen);
                this.state = 346;
                this.data_expr(0);
                this.state = 347;
                this.match(CircuitScriptParser.RParen);
                }
                break;
            case 2:
                {
                localContext = new CreateExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 349;
                this.match(CircuitScriptParser.Create);
                this.state = 350;
                this.create_expr();
                }
                break;
            case 3:
                {
                localContext = new UnaryOperatorExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 351;
                _la = this.tokenStream.LA(1);
                if(!(_la === 27 || _la === 47)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 352;
                this.data_expr(9);
                }
                break;
            case 4:
                {
                localContext = new ArrayExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 353;
                this.match(CircuitScriptParser.LSquare);
                this.state = 364;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (((((_la - 5)) & ~0x1F) === 0 && ((1 << (_la - 5)) & 1077936129) !== 0) || ((((_la - 46)) & ~0x1F) === 0 && ((1 << (_la - 46)) & 16588807) !== 0)) {
                    {
                    {
                    this.state = 354;
                    this.data_expr(0);
                    this.state = 359;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 32) {
                        {
                        {
                        this.state = 355;
                        this.match(CircuitScriptParser.Comma);
                        this.state = 356;
                        this.data_expr(0);
                        }
                        }
                        this.state = 361;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    }
                    }
                    this.state = 366;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 367;
                this.match(CircuitScriptParser.RSquare);
                }
                break;
            case 5:
                {
                localContext = new AtomExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 368;
                this.atom_expr();
                }
                break;
            case 6:
                {
                localContext = new FunctionCallExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 369;
                this.function_call_expr();
                }
                break;
            case 7:
                {
                localContext = new ValueExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 370;
                this.value_expr();
                }
                break;
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 388;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 30, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 386;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 29, this.context) ) {
                    case 1:
                        {
                        localContext = new MultiplyExprContext(new Data_exprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CircuitScriptParser.RULE_data_expr);
                        this.state = 373;
                        if (!(this.precpred(this.context, 7))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 7)");
                        }
                        this.state = 374;
                        _la = this.tokenStream.LA(1);
                        if(!(((((_la - 48)) & ~0x1F) === 0 && ((1 << (_la - 48)) & 7) !== 0))) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 375;
                        this.data_expr(8);
                        }
                        break;
                    case 2:
                        {
                        localContext = new AdditionExprContext(new Data_exprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CircuitScriptParser.RULE_data_expr);
                        this.state = 376;
                        if (!(this.precpred(this.context, 6))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 6)");
                        }
                        this.state = 377;
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 46 || _la === 47)) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 378;
                        this.data_expr(7);
                        }
                        break;
                    case 3:
                        {
                        localContext = new BinaryOperatorExprContext(new Data_exprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CircuitScriptParser.RULE_data_expr);
                        this.state = 379;
                        if (!(this.precpred(this.context, 5))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 5)");
                        }
                        this.state = 380;
                        this.binary_operator();
                        this.state = 381;
                        this.data_expr(6);
                        }
                        break;
                    case 4:
                        {
                        localContext = new LogicalOperatorExprContext(new Data_exprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CircuitScriptParser.RULE_data_expr);
                        this.state = 383;
                        if (!(this.precpred(this.context, 4))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 4)");
                        }
                        this.state = 384;
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 44 || _la === 45)) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 385;
                        this.data_expr(5);
                        }
                        break;
                    }
                    }
                }
                this.state = 390;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 30, this.context);
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
        this.enterRule(localContext, 58, CircuitScriptParser.RULE_binary_operator);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 391;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 38)) & ~0x1F) === 0 && ((1 << (_la - 38)) & 63) !== 0))) {
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
        this.enterRule(localContext, 60, CircuitScriptParser.RULE_value_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            {
            this.state = 394;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 47) {
                {
                this.state = 393;
                this.match(CircuitScriptParser.Minus);
                }
            }

            this.state = 396;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 62)) & ~0x1F) === 0 && ((1 << (_la - 62)) & 125) !== 0))) {
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
        this.enterRule(localContext, 62, CircuitScriptParser.RULE_function_def_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 398;
            this.match(CircuitScriptParser.Define);
            this.state = 399;
            this.match(CircuitScriptParser.ID);
            this.state = 400;
            this.match(CircuitScriptParser.LParen);
            this.state = 402;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 69) {
                {
                this.state = 401;
                this.function_args_expr();
                }
            }

            this.state = 404;
            this.match(CircuitScriptParser.RParen);
            this.state = 405;
            this.match(CircuitScriptParser.Colon);
            this.state = 406;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 407;
            this.match(CircuitScriptParser.INDENT);
            this.state = 410;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 410;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 33, this.context) ) {
                case 1:
                    {
                    this.state = 408;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case 2:
                    {
                    this.state = 409;
                    this.function_expr();
                    }
                    break;
                }
                }
                this.state = 412;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 3)) & ~0x1F) === 0 && ((1 << (_la - 3)) & 2390032195) !== 0) || ((((_la - 46)) & ~0x1F) === 0 && ((1 << (_la - 46)) & 8521733) !== 0));
            this.state = 414;
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
        this.enterRule(localContext, 64, CircuitScriptParser.RULE_function_expr);
        try {
            this.state = 418;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
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
            case CircuitScriptParser.Set:
            case CircuitScriptParser.DoubleDot:
            case CircuitScriptParser.Addition:
            case CircuitScriptParser.Divide:
            case CircuitScriptParser.NEWLINE:
            case CircuitScriptParser.ANNOTATION_START:
            case CircuitScriptParser.ID:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 416;
                this.expression();
                }
                break;
            case CircuitScriptParser.Return:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 417;
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
        this.enterRule(localContext, 66, CircuitScriptParser.RULE_function_args_expr);
        let _la: number;
        try {
            let alternative: number;
            this.state = 449;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 39, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 420;
                this.match(CircuitScriptParser.ID);
                this.state = 425;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 36, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 421;
                        this.match(CircuitScriptParser.Comma);
                        this.state = 422;
                        this.match(CircuitScriptParser.ID);
                        }
                        }
                    }
                    this.state = 427;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 36, this.context);
                }
                this.state = 434;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 32) {
                    {
                    {
                    this.state = 428;
                    this.match(CircuitScriptParser.Comma);
                    this.state = 429;
                    this.match(CircuitScriptParser.ID);
                    this.state = 430;
                    this.match(CircuitScriptParser.Assign);
                    this.state = 431;
                    this.value_expr();
                    }
                    }
                    this.state = 436;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 437;
                this.match(CircuitScriptParser.ID);
                this.state = 438;
                this.match(CircuitScriptParser.Assign);
                this.state = 439;
                this.value_expr();
                this.state = 446;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 32) {
                    {
                    {
                    this.state = 440;
                    this.match(CircuitScriptParser.Comma);
                    this.state = 441;
                    this.match(CircuitScriptParser.ID);
                    this.state = 442;
                    this.match(CircuitScriptParser.Assign);
                    this.state = 443;
                    this.value_expr();
                    }
                    }
                    this.state = 448;
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
        this.enterRule(localContext, 68, CircuitScriptParser.RULE_atom_expr);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 451;
            this.match(CircuitScriptParser.ID);
            this.state = 455;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 40, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 452;
                    this.trailer_expr2();
                    }
                    }
                }
                this.state = 457;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 40, this.context);
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
        this.enterRule(localContext, 70, CircuitScriptParser.RULE_trailer_expr);
        let _la: number;
        try {
            this.state = 464;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.LParen:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 458;
                this.match(CircuitScriptParser.LParen);
                this.state = 460;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (((((_la - 5)) & ~0x1F) === 0 && ((1 << (_la - 5)) & 1077936129) !== 0) || ((((_la - 46)) & ~0x1F) === 0 && ((1 << (_la - 46)) & 16588807) !== 0)) {
                    {
                    this.state = 459;
                    this.parameters();
                    }
                }

                this.state = 462;
                this.match(CircuitScriptParser.RParen);
                }
                break;
            case CircuitScriptParser.Dot:
            case CircuitScriptParser.LSquare:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 463;
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
        this.enterRule(localContext, 72, CircuitScriptParser.RULE_trailer_expr2);
        try {
            this.state = 472;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.Dot:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 466;
                this.match(CircuitScriptParser.Dot);
                this.state = 467;
                this.match(CircuitScriptParser.ID);
                }
                break;
            case CircuitScriptParser.LSquare:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 468;
                this.match(CircuitScriptParser.LSquare);
                this.state = 469;
                this.data_expr(0);
                this.state = 470;
                this.match(CircuitScriptParser.RSquare);
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
        this.enterRule(localContext, 74, CircuitScriptParser.RULE_function_call_expr);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 475;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 46 || _la === 48) {
                {
                this.state = 474;
                this.net_namespace_expr();
                }
            }

            this.state = 477;
            this.match(CircuitScriptParser.ID);
            this.state = 479;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 478;
                    this.trailer_expr();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 481;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 45, this.context);
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
        this.enterRule(localContext, 76, CircuitScriptParser.RULE_net_namespace_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 484;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 46) {
                {
                this.state = 483;
                this.match(CircuitScriptParser.Addition);
                }
            }

            this.state = 486;
            this.match(CircuitScriptParser.Divide);
            this.state = 488;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 47, this.context) ) {
            case 1:
                {
                this.state = 487;
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
        this.enterRule(localContext, 78, CircuitScriptParser.RULE_function_return_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 490;
            this.match(CircuitScriptParser.Return);
            this.state = 491;
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
        this.enterRule(localContext, 80, CircuitScriptParser.RULE_property_block_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 493;
            this.property_key_expr();
            this.state = 494;
            this.match(CircuitScriptParser.Colon);
            this.state = 495;
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
    public graphic_expressions_block(): Graphic_expressions_blockContext {
        let localContext = new Graphic_expressions_blockContext(this.context, this.state);
        this.enterRule(localContext, 82, CircuitScriptParser.RULE_graphic_expressions_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 497;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 498;
            this.match(CircuitScriptParser.INDENT);
            this.state = 501;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 501;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 499;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case CircuitScriptParser.Pin:
                case CircuitScriptParser.For:
                case CircuitScriptParser.ID:
                    {
                    this.state = 500;
                    this.graphic_expr();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 503;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 10 || _la === 21 || _la === 57 || _la === 69);
            this.state = 505;
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
    public create_expr(): Create_exprContext {
        let localContext = new Create_exprContext(this.context, this.state);
        this.enterRule(localContext, 84, CircuitScriptParser.RULE_create_expr);
        try {
            this.state = 510;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.Component:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 507;
                this.create_component_expr();
                }
                break;
            case CircuitScriptParser.Graphic:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 508;
                this.create_graphic_expr();
                }
                break;
            case CircuitScriptParser.Module:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 509;
                this.create_module_expr();
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
    public create_component_expr(): Create_component_exprContext {
        let localContext = new Create_component_exprContext(this.context, this.state);
        this.enterRule(localContext, 86, CircuitScriptParser.RULE_create_component_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 512;
            this.match(CircuitScriptParser.Component);
            this.state = 513;
            this.match(CircuitScriptParser.Colon);
            this.state = 514;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 515;
            this.match(CircuitScriptParser.INDENT);
            this.state = 518;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 518;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 516;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case CircuitScriptParser.INTEGER_VALUE:
                case CircuitScriptParser.STRING_VALUE:
                case CircuitScriptParser.ID:
                    {
                    this.state = 517;
                    this.property_expr();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 520;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 6273) !== 0));
            this.state = 522;
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
        this.enterRule(localContext, 88, CircuitScriptParser.RULE_create_graphic_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 524;
            this.match(CircuitScriptParser.Graphic);
            this.state = 528;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 59) {
                {
                this.state = 525;
                this.match(CircuitScriptParser.LParen);
                this.state = 526;
                this.match(CircuitScriptParser.ID);
                this.state = 527;
                this.match(CircuitScriptParser.RParen);
                }
            }

            this.state = 530;
            this.match(CircuitScriptParser.Colon);
            this.state = 531;
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
        this.enterRule(localContext, 90, CircuitScriptParser.RULE_create_module_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 533;
            this.match(CircuitScriptParser.Module);
            this.state = 534;
            this.match(CircuitScriptParser.Colon);
            this.state = 535;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 536;
            this.match(CircuitScriptParser.INDENT);
            this.state = 540;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 540;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 54, this.context) ) {
                case 1:
                    {
                    this.state = 537;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case 2:
                    {
                    this.state = 538;
                    this.property_expr();
                    }
                    break;
                case 3:
                    {
                    this.state = 539;
                    this.property_block_expr();
                    }
                    break;
                }
                }
                this.state = 542;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 6273) !== 0));
            this.state = 544;
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
        this.enterRule(localContext, 92, CircuitScriptParser.RULE_nested_properties_inner);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            {
            this.state = 546;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 547;
            this.match(CircuitScriptParser.INDENT);
            this.state = 550;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 550;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 548;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case CircuitScriptParser.INTEGER_VALUE:
                case CircuitScriptParser.STRING_VALUE:
                case CircuitScriptParser.ID:
                    {
                    this.state = 549;
                    this.property_expr();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 552;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 6273) !== 0));
            this.state = 554;
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
        this.enterRule(localContext, 94, CircuitScriptParser.RULE_graphic_expr);
        let _la: number;
        try {
            this.state = 580;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.For:
                localContext = new GraphicForExprContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 556;
                this.match(CircuitScriptParser.For);
                this.state = 557;
                this.match(CircuitScriptParser.ID);
                this.state = 562;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 32) {
                    {
                    {
                    this.state = 558;
                    this.match(CircuitScriptParser.Comma);
                    this.state = 559;
                    this.match(CircuitScriptParser.ID);
                    }
                    }
                    this.state = 564;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 565;
                this.match(CircuitScriptParser.In);
                this.state = 566;
                this.data_expr(0);
                this.state = 567;
                this.match(CircuitScriptParser.Colon);
                this.state = 568;
                this.graphic_expressions_block();
                }
                break;
            case CircuitScriptParser.Pin:
            case CircuitScriptParser.ID:
                localContext = new GraphicCommandExprContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 570;
                (localContext as GraphicCommandExprContext)._command = this.tokenStream.LT(1);
                _la = this.tokenStream.LA(1);
                if(!(_la === 10 || _la === 69)) {
                    (localContext as GraphicCommandExprContext)._command = this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 571;
                this.match(CircuitScriptParser.Colon);
                this.state = 578;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 59, this.context) ) {
                case 1:
                    {
                    this.state = 572;
                    this.parameters();
                    }
                    break;
                case 2:
                    {
                    this.state = 573;
                    this.match(CircuitScriptParser.LParen);
                    this.state = 574;
                    this.parameters();
                    this.state = 575;
                    this.match(CircuitScriptParser.RParen);
                    }
                    break;
                case 3:
                    {
                    this.state = 577;
                    this.nested_properties_inner();
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
    public property_expr(): Property_exprContext {
        let localContext = new Property_exprContext(this.context, this.state);
        this.enterRule(localContext, 96, CircuitScriptParser.RULE_property_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 582;
            this.property_key_expr();
            this.state = 586;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 68) {
                {
                {
                this.state = 583;
                localContext._extra = this.match(CircuitScriptParser.STRING_VALUE);
                }
                }
                this.state = 588;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 589;
            this.match(CircuitScriptParser.Colon);
            this.state = 590;
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
        this.enterRule(localContext, 98, CircuitScriptParser.RULE_property_key_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 592;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 49) !== 0))) {
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
        this.enterRule(localContext, 100, CircuitScriptParser.RULE_property_value_expr);
        let _la: number;
        try {
            this.state = 603;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.NEWLINE:
                localContext = new Nested_propertiesContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 594;
                this.nested_properties_inner();
                }
                break;
            case CircuitScriptParser.Create:
            case CircuitScriptParser.Not:
            case CircuitScriptParser.LSquare:
            case CircuitScriptParser.Addition:
            case CircuitScriptParser.Minus:
            case CircuitScriptParser.Divide:
            case CircuitScriptParser.LParen:
            case CircuitScriptParser.BOOLEAN_VALUE:
            case CircuitScriptParser.INTEGER_VALUE:
            case CircuitScriptParser.DECIMAL_VALUE:
            case CircuitScriptParser.NUMERIC_VALUE:
            case CircuitScriptParser.PERCENTAGE_VALUE:
            case CircuitScriptParser.STRING_VALUE:
            case CircuitScriptParser.ID:
                localContext = new Single_line_propertyContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 595;
                this.data_expr(0);
                this.state = 600;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 32) {
                    {
                    {
                    this.state = 596;
                    this.match(CircuitScriptParser.Comma);
                    this.state = 597;
                    this.data_expr(0);
                    }
                    }
                    this.state = 602;
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
        this.enterRule(localContext, 102, CircuitScriptParser.RULE_wire_atom_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 605;
            this.match(CircuitScriptParser.ID);
            this.state = 607;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 64, this.context) ) {
            case 1:
                {
                this.state = 606;
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
    public wire_expr(): Wire_exprContext {
        let localContext = new Wire_exprContext(this.context, this.state);
        this.enterRule(localContext, 104, CircuitScriptParser.RULE_wire_expr);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 609;
            this.match(CircuitScriptParser.Wire);
            this.state = 613;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 65, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 610;
                    this.wire_atom_expr();
                    }
                    }
                }
                this.state = 615;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 65, this.context);
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
    public point_expr(): Point_exprContext {
        let localContext = new Point_exprContext(this.context, this.state);
        this.enterRule(localContext, 106, CircuitScriptParser.RULE_point_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 616;
            this.match(CircuitScriptParser.Point);
            this.state = 619;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 66, this.context) ) {
            case 1:
                {
                this.state = 617;
                this.match(CircuitScriptParser.ID);
                }
                break;
            case 2:
                {
                this.state = 618;
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
        this.enterRule(localContext, 108, CircuitScriptParser.RULE_import_expr);
        let _la: number;
        try {
            this.state = 643;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.Import:
                localContext = new Import_simpleContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 621;
                this.match(CircuitScriptParser.Import);
                this.state = 622;
                (localContext as Import_simpleContext)._libraryName = this.match(CircuitScriptParser.ID);
                this.state = 624;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 67, this.context) ) {
                case 1:
                    {
                    this.state = 623;
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
                this.state = 626;
                this.match(CircuitScriptParser.From);
                this.state = 627;
                (localContext as Import_specific_or_allContext)._libraryName = this.match(CircuitScriptParser.ID);
                this.state = 628;
                this.match(CircuitScriptParser.Import);
                this.state = 638;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.Multiply:
                    {
                    this.state = 629;
                    (localContext as Import_specific_or_allContext)._all = this.match(CircuitScriptParser.Multiply);
                    }
                    break;
                case CircuitScriptParser.ID:
                    {
                    {
                    this.state = 630;
                    (localContext as Import_specific_or_allContext)._ID = this.match(CircuitScriptParser.ID);
                    (localContext as Import_specific_or_allContext)._funcNames.push((localContext as Import_specific_or_allContext)._ID!);
                    this.state = 635;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 32) {
                        {
                        {
                        this.state = 631;
                        this.match(CircuitScriptParser.Comma);
                        this.state = 632;
                        (localContext as Import_specific_or_allContext)._ID = this.match(CircuitScriptParser.ID);
                        (localContext as Import_specific_or_allContext)._funcNames.push((localContext as Import_specific_or_allContext)._ID!);
                        }
                        }
                        this.state = 637;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 641;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 70, this.context) ) {
                case 1:
                    {
                    this.state = 640;
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
        this.enterRule(localContext, 110, CircuitScriptParser.RULE_import_annotation_expr);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 645;
            this.match(CircuitScriptParser.ANNOTATION_START);
            this.state = 649;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 72, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 646;
                    _la = this.tokenStream.LA(1);
                    if(!(_la === 47 || _la === 69)) {
                    this.errorHandler.recoverInline(this);
                    }
                    else {
                        this.errorHandler.reportMatch(this);
                        this.consume();
                    }
                    }
                    }
                }
                this.state = 651;
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
    public frame_expr(): Frame_exprContext {
        let localContext = new Frame_exprContext(this.context, this.state);
        this.enterRule(localContext, 112, CircuitScriptParser.RULE_frame_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 652;
            _la = this.tokenStream.LA(1);
            if(!(_la === 28 || _la === 29)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 653;
            this.match(CircuitScriptParser.Colon);
            this.state = 654;
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
        this.enterRule(localContext, 114, CircuitScriptParser.RULE_if_expr);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 656;
            this.match(CircuitScriptParser.If);
            this.state = 657;
            this.data_expr(0);
            this.state = 658;
            this.match(CircuitScriptParser.Colon);
            this.state = 659;
            this.expressions_block();
            this.state = 663;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 73, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 660;
                    this.if_inner_expr();
                    }
                    }
                }
                this.state = 665;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 73, this.context);
            }
            this.state = 667;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 26) {
                {
                this.state = 666;
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
        this.enterRule(localContext, 116, CircuitScriptParser.RULE_if_inner_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 669;
            this.match(CircuitScriptParser.Else);
            this.state = 670;
            this.match(CircuitScriptParser.If);
            this.state = 671;
            this.data_expr(0);
            this.state = 672;
            this.match(CircuitScriptParser.Colon);
            this.state = 673;
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
        this.enterRule(localContext, 118, CircuitScriptParser.RULE_else_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 675;
            this.match(CircuitScriptParser.Else);
            this.state = 676;
            this.match(CircuitScriptParser.Colon);
            this.state = 677;
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
        this.enterRule(localContext, 120, CircuitScriptParser.RULE_while_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 679;
            this.match(CircuitScriptParser.While);
            this.state = 680;
            this.data_expr(0);
            this.state = 681;
            this.match(CircuitScriptParser.Colon);
            this.state = 682;
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
        this.enterRule(localContext, 122, CircuitScriptParser.RULE_for_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 684;
            this.match(CircuitScriptParser.For);
            this.state = 685;
            this.match(CircuitScriptParser.ID);
            this.state = 690;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 32) {
                {
                {
                this.state = 686;
                this.match(CircuitScriptParser.Comma);
                this.state = 687;
                this.match(CircuitScriptParser.ID);
                }
                }
                this.state = 692;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 693;
            this.match(CircuitScriptParser.In);
            this.state = 694;
            this.data_expr(0);
            this.state = 695;
            this.match(CircuitScriptParser.Colon);
            this.state = 696;
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
        this.enterRule(localContext, 124, CircuitScriptParser.RULE_part_set_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 698;
            this.match(CircuitScriptParser.Set);
            this.state = 699;
            this.match(CircuitScriptParser.Colon);
            this.state = 700;
            this.data_expr(0);
            this.state = 705;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 32) {
                {
                {
                this.state = 701;
                this.match(CircuitScriptParser.Comma);
                this.state = 702;
                this.data_expr(0);
                }
                }
                this.state = 707;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 708;
            this.match(CircuitScriptParser.Colon);
            this.state = 709;
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
        this.enterRule(localContext, 126, CircuitScriptParser.RULE_part_set_key);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 711;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 61) !== 0))) {
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
        this.enterRule(localContext, 128, CircuitScriptParser.RULE_part_match_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 713;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 714;
            this.match(CircuitScriptParser.INDENT);
            this.state = 716;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 715;
                this.part_sub_expr();
                }
                }
                this.state = 718;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 7809) !== 0));
            this.state = 720;
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
        this.enterRule(localContext, 130, CircuitScriptParser.RULE_part_sub_expr);
        try {
            this.state = 726;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 78, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 722;
                this.part_condition_expr();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 723;
                this.part_value_expr();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 724;
                this.part_condition_key_only_expr();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 725;
                this.match(CircuitScriptParser.NEWLINE);
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
        this.enterRule(localContext, 132, CircuitScriptParser.RULE_part_condition_expr);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 728;
            localContext._part_set_key = this.part_set_key();
            localContext._key_id.push(localContext._part_set_key!);
            this.state = 729;
            this.match(CircuitScriptParser.Colon);
            this.state = 730;
            localContext._data_expr = this.data_expr(0);
            localContext._values.push(localContext._data_expr!);
            this.state = 738;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 79, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 731;
                    this.match(CircuitScriptParser.Comma);
                    this.state = 732;
                    localContext._part_set_key = this.part_set_key();
                    localContext._key_id.push(localContext._part_set_key!);
                    this.state = 733;
                    this.match(CircuitScriptParser.Colon);
                    this.state = 734;
                    localContext._data_expr = this.data_expr(0);
                    localContext._values.push(localContext._data_expr!);
                    }
                    }
                }
                this.state = 740;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 79, this.context);
            }
            this.state = 745;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 32) {
                {
                {
                this.state = 741;
                this.match(CircuitScriptParser.Comma);
                this.state = 742;
                localContext._id_only = this.part_set_key();
                }
                }
                this.state = 747;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 748;
            this.match(CircuitScriptParser.Colon);
            this.state = 758;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.NEWLINE:
                {
                this.state = 749;
                this.part_match_block();
                }
                break;
            case CircuitScriptParser.Create:
            case CircuitScriptParser.Not:
            case CircuitScriptParser.LSquare:
            case CircuitScriptParser.Addition:
            case CircuitScriptParser.Minus:
            case CircuitScriptParser.Divide:
            case CircuitScriptParser.LParen:
            case CircuitScriptParser.BOOLEAN_VALUE:
            case CircuitScriptParser.INTEGER_VALUE:
            case CircuitScriptParser.DECIMAL_VALUE:
            case CircuitScriptParser.NUMERIC_VALUE:
            case CircuitScriptParser.PERCENTAGE_VALUE:
            case CircuitScriptParser.STRING_VALUE:
            case CircuitScriptParser.ID:
                {
                {
                this.state = 750;
                localContext._data_expr = this.data_expr(0);
                localContext._last_data.push(localContext._data_expr!);
                this.state = 755;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 32) {
                    {
                    {
                    this.state = 751;
                    this.match(CircuitScriptParser.Comma);
                    this.state = 752;
                    localContext._data_expr = this.data_expr(0);
                    localContext._last_data.push(localContext._data_expr!);
                    }
                    }
                    this.state = 757;
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
        this.enterRule(localContext, 134, CircuitScriptParser.RULE_part_condition_key_only_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 760;
            this.part_set_key();
            this.state = 761;
            this.match(CircuitScriptParser.Colon);
            this.state = 762;
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
        this.enterRule(localContext, 136, CircuitScriptParser.RULE_part_value_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 764;
            this.part_set_key();
            this.state = 765;
            this.match(CircuitScriptParser.Colon);
            this.state = 766;
            this.data_expr(0);
            this.state = 771;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 32) {
                {
                {
                this.state = 767;
                this.match(CircuitScriptParser.Comma);
                this.state = 768;
                this.data_expr(0);
                }
                }
                this.state = 773;
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
        this.enterRule(localContext, 138, CircuitScriptParser.RULE_annotation_comment_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 774;
            this.match(CircuitScriptParser.ANNOTATION_START);
            this.state = 775;
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
        case 28:
            return this.data_expr_sempred(localContext as Data_exprContext, predIndex);
        }
        return true;
    }
    private data_expr_sempred(localContext: Data_exprContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 0:
            return this.precpred(this.context, 7);
        case 1:
            return this.precpred(this.context, 6);
        case 2:
            return this.precpred(this.context, 5);
        case 3:
            return this.precpred(this.context, 4);
        }
        return true;
    }

    public static readonly _serializedATN: number[] = [
        4,1,69,778,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,
        7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,
        2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,33,
        7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,39,
        2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,46,
        7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,52,
        2,53,7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,59,
        7,59,2,60,7,60,2,61,7,61,2,62,7,62,2,63,7,63,2,64,7,64,2,65,7,65,
        2,66,7,66,2,67,7,67,2,68,7,68,2,69,7,69,1,0,1,0,5,0,143,8,0,10,0,
        12,0,146,9,0,1,0,5,0,149,8,0,10,0,12,0,152,9,0,1,0,1,0,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,170,8,1,1,2,1,
        2,1,2,1,2,1,2,3,2,177,8,2,1,3,1,3,1,3,1,3,1,3,1,3,1,3,3,3,186,8,
        3,1,4,1,4,1,4,4,4,191,8,4,11,4,12,4,192,1,4,1,4,1,5,1,5,1,5,1,5,
        1,6,1,6,1,6,1,6,1,6,1,6,4,6,207,8,6,11,6,12,6,208,1,6,1,6,1,7,1,
        7,1,7,1,7,1,8,1,8,1,8,1,9,1,9,1,9,1,9,3,9,224,8,9,1,10,1,10,3,10,
        228,8,10,1,10,5,10,231,8,10,10,10,12,10,234,9,10,1,10,3,10,237,8,
        10,1,11,1,11,1,11,1,12,1,12,1,12,3,12,245,8,12,1,13,1,13,1,14,1,
        14,1,14,1,15,1,15,1,15,1,15,5,15,256,8,15,10,15,12,15,259,9,15,1,
        16,1,16,1,16,1,16,1,16,4,16,266,8,16,11,16,12,16,267,1,16,1,16,1,
        17,1,17,3,17,274,8,17,1,18,1,18,1,18,5,18,279,8,18,10,18,12,18,282,
        9,18,1,19,1,19,1,19,1,19,3,19,288,8,19,1,20,1,20,3,20,292,8,20,1,
        21,1,21,1,22,1,22,3,22,298,8,22,1,22,1,22,1,22,1,23,1,23,1,23,1,
        23,1,24,1,24,1,24,1,24,1,25,1,25,1,25,5,25,314,8,25,10,25,12,25,
        317,9,25,1,25,1,25,5,25,321,8,25,10,25,12,25,324,9,25,1,25,1,25,
        1,25,5,25,329,8,25,10,25,12,25,332,9,25,3,25,334,8,25,1,26,1,26,
        1,26,1,26,1,27,1,27,1,27,1,27,1,27,1,28,1,28,1,28,1,28,1,28,1,28,
        1,28,1,28,1,28,1,28,1,28,1,28,1,28,5,28,358,8,28,10,28,12,28,361,
        9,28,5,28,363,8,28,10,28,12,28,366,9,28,1,28,1,28,1,28,1,28,3,28,
        372,8,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,
        1,28,1,28,5,28,387,8,28,10,28,12,28,390,9,28,1,29,1,29,1,30,3,30,
        395,8,30,1,30,1,30,1,31,1,31,1,31,1,31,3,31,403,8,31,1,31,1,31,1,
        31,1,31,1,31,1,31,4,31,411,8,31,11,31,12,31,412,1,31,1,31,1,32,1,
        32,3,32,419,8,32,1,33,1,33,1,33,5,33,424,8,33,10,33,12,33,427,9,
        33,1,33,1,33,1,33,1,33,5,33,433,8,33,10,33,12,33,436,9,33,1,33,1,
        33,1,33,1,33,1,33,1,33,1,33,5,33,445,8,33,10,33,12,33,448,9,33,3,
        33,450,8,33,1,34,1,34,5,34,454,8,34,10,34,12,34,457,9,34,1,35,1,
        35,3,35,461,8,35,1,35,1,35,3,35,465,8,35,1,36,1,36,1,36,1,36,1,36,
        1,36,3,36,473,8,36,1,37,3,37,476,8,37,1,37,1,37,4,37,480,8,37,11,
        37,12,37,481,1,38,3,38,485,8,38,1,38,1,38,3,38,489,8,38,1,39,1,39,
        1,39,1,40,1,40,1,40,1,40,1,41,1,41,1,41,1,41,4,41,502,8,41,11,41,
        12,41,503,1,41,1,41,1,42,1,42,1,42,3,42,511,8,42,1,43,1,43,1,43,
        1,43,1,43,1,43,4,43,519,8,43,11,43,12,43,520,1,43,1,43,1,44,1,44,
        1,44,1,44,3,44,529,8,44,1,44,1,44,1,44,1,45,1,45,1,45,1,45,1,45,
        1,45,1,45,4,45,541,8,45,11,45,12,45,542,1,45,1,45,1,46,1,46,1,46,
        1,46,4,46,551,8,46,11,46,12,46,552,1,46,1,46,1,47,1,47,1,47,1,47,
        5,47,561,8,47,10,47,12,47,564,9,47,1,47,1,47,1,47,1,47,1,47,1,47,
        1,47,1,47,1,47,1,47,1,47,1,47,1,47,3,47,579,8,47,3,47,581,8,47,1,
        48,1,48,5,48,585,8,48,10,48,12,48,588,9,48,1,48,1,48,1,48,1,49,1,
        49,1,50,1,50,1,50,1,50,5,50,599,8,50,10,50,12,50,602,9,50,3,50,604,
        8,50,1,51,1,51,3,51,608,8,51,1,52,1,52,5,52,612,8,52,10,52,12,52,
        615,9,52,1,53,1,53,1,53,3,53,620,8,53,1,54,1,54,1,54,3,54,625,8,
        54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,5,54,634,8,54,10,54,12,54,
        637,9,54,3,54,639,8,54,1,54,3,54,642,8,54,3,54,644,8,54,1,55,1,55,
        5,55,648,8,55,10,55,12,55,651,9,55,1,56,1,56,1,56,1,56,1,57,1,57,
        1,57,1,57,1,57,5,57,662,8,57,10,57,12,57,665,9,57,1,57,3,57,668,
        8,57,1,58,1,58,1,58,1,58,1,58,1,58,1,59,1,59,1,59,1,59,1,60,1,60,
        1,60,1,60,1,60,1,61,1,61,1,61,1,61,5,61,689,8,61,10,61,12,61,692,
        9,61,1,61,1,61,1,61,1,61,1,61,1,62,1,62,1,62,1,62,1,62,5,62,704,
        8,62,10,62,12,62,707,9,62,1,62,1,62,1,62,1,63,1,63,1,64,1,64,1,64,
        4,64,717,8,64,11,64,12,64,718,1,64,1,64,1,65,1,65,1,65,1,65,3,65,
        727,8,65,1,66,1,66,1,66,1,66,1,66,1,66,1,66,1,66,5,66,737,8,66,10,
        66,12,66,740,9,66,1,66,1,66,5,66,744,8,66,10,66,12,66,747,9,66,1,
        66,1,66,1,66,1,66,1,66,5,66,754,8,66,10,66,12,66,757,9,66,3,66,759,
        8,66,1,67,1,67,1,67,1,67,1,68,1,68,1,68,1,68,1,68,5,68,770,8,68,
        10,68,12,68,773,9,68,1,69,1,69,1,69,1,69,0,1,56,70,0,2,4,6,8,10,
        12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,
        56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,
        100,102,104,106,108,110,112,114,116,118,120,122,124,126,128,130,
        132,134,136,138,0,15,2,0,4,4,14,16,2,0,64,64,69,69,2,0,64,64,68,
        68,1,0,51,55,2,0,27,27,47,47,1,0,48,50,1,0,46,47,1,0,44,45,1,0,38,
        43,2,0,62,62,64,68,2,0,10,10,69,69,2,0,64,64,68,69,2,0,47,47,69,
        69,1,0,28,29,2,0,64,64,66,69,824,0,144,1,0,0,0,2,169,1,0,0,0,4,176,
        1,0,0,0,6,185,1,0,0,0,8,187,1,0,0,0,10,196,1,0,0,0,12,200,1,0,0,
        0,14,212,1,0,0,0,16,216,1,0,0,0,18,219,1,0,0,0,20,227,1,0,0,0,22,
        238,1,0,0,0,24,244,1,0,0,0,26,246,1,0,0,0,28,248,1,0,0,0,30,251,
        1,0,0,0,32,260,1,0,0,0,34,273,1,0,0,0,36,275,1,0,0,0,38,283,1,0,
        0,0,40,291,1,0,0,0,42,293,1,0,0,0,44,297,1,0,0,0,46,302,1,0,0,0,
        48,306,1,0,0,0,50,333,1,0,0,0,52,335,1,0,0,0,54,339,1,0,0,0,56,371,
        1,0,0,0,58,391,1,0,0,0,60,394,1,0,0,0,62,398,1,0,0,0,64,418,1,0,
        0,0,66,449,1,0,0,0,68,451,1,0,0,0,70,464,1,0,0,0,72,472,1,0,0,0,
        74,475,1,0,0,0,76,484,1,0,0,0,78,490,1,0,0,0,80,493,1,0,0,0,82,497,
        1,0,0,0,84,510,1,0,0,0,86,512,1,0,0,0,88,524,1,0,0,0,90,533,1,0,
        0,0,92,546,1,0,0,0,94,580,1,0,0,0,96,582,1,0,0,0,98,592,1,0,0,0,
        100,603,1,0,0,0,102,605,1,0,0,0,104,609,1,0,0,0,106,616,1,0,0,0,
        108,643,1,0,0,0,110,645,1,0,0,0,112,652,1,0,0,0,114,656,1,0,0,0,
        116,669,1,0,0,0,118,675,1,0,0,0,120,679,1,0,0,0,122,684,1,0,0,0,
        124,698,1,0,0,0,126,711,1,0,0,0,128,713,1,0,0,0,130,726,1,0,0,0,
        132,728,1,0,0,0,134,760,1,0,0,0,136,764,1,0,0,0,138,774,1,0,0,0,
        140,143,3,108,54,0,141,143,5,57,0,0,142,140,1,0,0,0,142,141,1,0,
        0,0,143,146,1,0,0,0,144,142,1,0,0,0,144,145,1,0,0,0,145,150,1,0,
        0,0,146,144,1,0,0,0,147,149,3,2,1,0,148,147,1,0,0,0,149,152,1,0,
        0,0,150,148,1,0,0,0,150,151,1,0,0,0,151,153,1,0,0,0,152,150,1,0,
        0,0,153,154,5,0,0,1,154,1,1,0,0,0,155,170,3,6,3,0,156,170,3,44,22,
        0,157,170,3,46,23,0,158,170,3,52,26,0,159,170,3,12,6,0,160,170,3,
        54,27,0,161,170,3,62,31,0,162,170,3,68,34,0,163,170,3,74,37,0,164,
        170,3,112,56,0,165,170,3,4,2,0,166,170,3,138,69,0,167,170,3,124,
        62,0,168,170,5,57,0,0,169,155,1,0,0,0,169,156,1,0,0,0,169,157,1,
        0,0,0,169,158,1,0,0,0,169,159,1,0,0,0,169,160,1,0,0,0,169,161,1,
        0,0,0,169,162,1,0,0,0,169,163,1,0,0,0,169,164,1,0,0,0,169,165,1,
        0,0,0,169,166,1,0,0,0,169,167,1,0,0,0,169,168,1,0,0,0,170,3,1,0,
        0,0,171,177,3,114,57,0,172,177,3,120,60,0,173,177,3,122,61,0,174,
        177,5,3,0,0,175,177,5,24,0,0,176,171,1,0,0,0,176,172,1,0,0,0,176,
        173,1,0,0,0,176,174,1,0,0,0,176,175,1,0,0,0,177,5,1,0,0,0,178,186,
        3,22,11,0,179,186,3,30,15,0,180,186,3,28,14,0,181,186,3,32,16,0,
        182,186,3,104,52,0,183,186,3,106,53,0,184,186,3,10,5,0,185,178,1,
        0,0,0,185,179,1,0,0,0,185,180,1,0,0,0,185,181,1,0,0,0,185,182,1,
        0,0,0,185,183,1,0,0,0,185,184,1,0,0,0,186,7,1,0,0,0,187,188,5,57,
        0,0,188,190,5,1,0,0,189,191,3,2,1,0,190,189,1,0,0,0,191,192,1,0,
        0,0,192,190,1,0,0,0,192,193,1,0,0,0,193,194,1,0,0,0,194,195,5,2,
        0,0,195,9,1,0,0,0,196,197,7,0,0,0,197,198,5,31,0,0,198,199,3,8,4,
        0,199,11,1,0,0,0,200,201,3,68,34,0,201,202,5,31,0,0,202,203,5,57,
        0,0,203,206,5,1,0,0,204,207,5,57,0,0,205,207,3,14,7,0,206,204,1,
        0,0,0,206,205,1,0,0,0,207,208,1,0,0,0,208,206,1,0,0,0,208,209,1,
        0,0,0,209,210,1,0,0,0,210,211,5,2,0,0,211,13,1,0,0,0,212,213,7,1,
        0,0,213,214,5,31,0,0,214,215,3,60,30,0,215,15,1,0,0,0,216,217,5,
        10,0,0,217,218,3,56,28,0,218,17,1,0,0,0,219,220,5,69,0,0,220,223,
        5,31,0,0,221,224,3,60,30,0,222,224,5,69,0,0,223,221,1,0,0,0,223,
        222,1,0,0,0,224,19,1,0,0,0,225,228,3,56,28,0,226,228,3,44,22,0,227,
        225,1,0,0,0,227,226,1,0,0,0,228,232,1,0,0,0,229,231,3,18,9,0,230,
        229,1,0,0,0,231,234,1,0,0,0,232,230,1,0,0,0,232,233,1,0,0,0,233,
        236,1,0,0,0,234,232,1,0,0,0,235,237,3,16,8,0,236,235,1,0,0,0,236,
        237,1,0,0,0,237,21,1,0,0,0,238,239,5,11,0,0,239,240,3,20,10,0,240,
        23,1,0,0,0,241,245,3,20,10,0,242,245,3,16,8,0,243,245,5,14,0,0,244,
        241,1,0,0,0,244,242,1,0,0,0,244,243,1,0,0,0,245,25,1,0,0,0,246,247,
        7,2,0,0,247,27,1,0,0,0,248,249,5,12,0,0,249,250,3,24,12,0,250,29,
        1,0,0,0,251,252,5,13,0,0,252,257,3,24,12,0,253,254,5,32,0,0,254,
        256,3,24,12,0,255,253,1,0,0,0,256,259,1,0,0,0,257,255,1,0,0,0,257,
        258,1,0,0,0,258,31,1,0,0,0,259,257,1,0,0,0,260,261,3,36,18,0,261,
        262,5,57,0,0,262,265,5,1,0,0,263,266,5,57,0,0,264,266,3,34,17,0,
        265,263,1,0,0,0,265,264,1,0,0,0,266,267,1,0,0,0,267,265,1,0,0,0,
        267,268,1,0,0,0,268,269,1,0,0,0,269,270,5,2,0,0,270,33,1,0,0,0,271,
        274,3,2,1,0,272,274,3,38,19,0,273,271,1,0,0,0,273,272,1,0,0,0,274,
        35,1,0,0,0,275,276,3,28,14,0,276,280,5,31,0,0,277,279,3,138,69,0,
        278,277,1,0,0,0,279,282,1,0,0,0,280,278,1,0,0,0,280,281,1,0,0,0,
        281,37,1,0,0,0,282,280,1,0,0,0,283,284,3,26,13,0,284,287,5,31,0,
        0,285,288,3,40,20,0,286,288,3,42,21,0,287,285,1,0,0,0,287,286,1,
        0,0,0,288,39,1,0,0,0,289,292,3,2,1,0,290,292,5,61,0,0,291,289,1,
        0,0,0,291,290,1,0,0,0,292,41,1,0,0,0,293,294,3,8,4,0,294,43,1,0,
        0,0,295,298,3,68,34,0,296,298,3,74,37,0,297,295,1,0,0,0,297,296,
        1,0,0,0,298,299,1,0,0,0,299,300,5,37,0,0,300,301,3,56,28,0,301,45,
        1,0,0,0,302,303,3,68,34,0,303,304,7,3,0,0,304,305,3,56,28,0,305,
        47,1,0,0,0,306,307,5,69,0,0,307,308,5,37,0,0,308,309,3,56,28,0,309,
        49,1,0,0,0,310,315,3,56,28,0,311,312,5,32,0,0,312,314,3,56,28,0,
        313,311,1,0,0,0,314,317,1,0,0,0,315,313,1,0,0,0,315,316,1,0,0,0,
        316,322,1,0,0,0,317,315,1,0,0,0,318,319,5,32,0,0,319,321,3,48,24,
        0,320,318,1,0,0,0,321,324,1,0,0,0,322,320,1,0,0,0,322,323,1,0,0,
        0,323,334,1,0,0,0,324,322,1,0,0,0,325,330,3,48,24,0,326,327,5,32,
        0,0,327,329,3,48,24,0,328,326,1,0,0,0,329,332,1,0,0,0,330,328,1,
        0,0,0,330,331,1,0,0,0,331,334,1,0,0,0,332,330,1,0,0,0,333,310,1,
        0,0,0,333,325,1,0,0,0,334,51,1,0,0,0,335,336,3,68,34,0,336,337,5,
        37,0,0,337,338,3,56,28,0,338,53,1,0,0,0,339,340,5,34,0,0,340,341,
        5,69,0,0,341,342,5,37,0,0,342,343,3,56,28,0,343,55,1,0,0,0,344,345,
        6,28,-1,0,345,346,5,59,0,0,346,347,3,56,28,0,347,348,5,60,0,0,348,
        372,1,0,0,0,349,350,5,5,0,0,350,372,3,84,42,0,351,352,7,4,0,0,352,
        372,3,56,28,9,353,364,5,35,0,0,354,359,3,56,28,0,355,356,5,32,0,
        0,356,358,3,56,28,0,357,355,1,0,0,0,358,361,1,0,0,0,359,357,1,0,
        0,0,359,360,1,0,0,0,360,363,1,0,0,0,361,359,1,0,0,0,362,354,1,0,
        0,0,363,366,1,0,0,0,364,362,1,0,0,0,364,365,1,0,0,0,365,367,1,0,
        0,0,366,364,1,0,0,0,367,372,5,36,0,0,368,372,3,68,34,0,369,372,3,
        74,37,0,370,372,3,60,30,0,371,344,1,0,0,0,371,349,1,0,0,0,371,351,
        1,0,0,0,371,353,1,0,0,0,371,368,1,0,0,0,371,369,1,0,0,0,371,370,
        1,0,0,0,372,388,1,0,0,0,373,374,10,7,0,0,374,375,7,5,0,0,375,387,
        3,56,28,8,376,377,10,6,0,0,377,378,7,6,0,0,378,387,3,56,28,7,379,
        380,10,5,0,0,380,381,3,58,29,0,381,382,3,56,28,6,382,387,1,0,0,0,
        383,384,10,4,0,0,384,385,7,7,0,0,385,387,3,56,28,5,386,373,1,0,0,
        0,386,376,1,0,0,0,386,379,1,0,0,0,386,383,1,0,0,0,387,390,1,0,0,
        0,388,386,1,0,0,0,388,389,1,0,0,0,389,57,1,0,0,0,390,388,1,0,0,0,
        391,392,7,8,0,0,392,59,1,0,0,0,393,395,5,47,0,0,394,393,1,0,0,0,
        394,395,1,0,0,0,395,396,1,0,0,0,396,397,7,9,0,0,397,61,1,0,0,0,398,
        399,5,18,0,0,399,400,5,69,0,0,400,402,5,59,0,0,401,403,3,66,33,0,
        402,401,1,0,0,0,402,403,1,0,0,0,403,404,1,0,0,0,404,405,5,60,0,0,
        405,406,5,31,0,0,406,407,5,57,0,0,407,410,5,1,0,0,408,411,5,57,0,
        0,409,411,3,64,32,0,410,408,1,0,0,0,410,409,1,0,0,0,411,412,1,0,
        0,0,412,410,1,0,0,0,412,413,1,0,0,0,413,414,1,0,0,0,414,415,5,2,
        0,0,415,63,1,0,0,0,416,419,3,2,1,0,417,419,3,78,39,0,418,416,1,0,
        0,0,418,417,1,0,0,0,419,65,1,0,0,0,420,425,5,69,0,0,421,422,5,32,
        0,0,422,424,5,69,0,0,423,421,1,0,0,0,424,427,1,0,0,0,425,423,1,0,
        0,0,425,426,1,0,0,0,426,434,1,0,0,0,427,425,1,0,0,0,428,429,5,32,
        0,0,429,430,5,69,0,0,430,431,5,37,0,0,431,433,3,60,30,0,432,428,
        1,0,0,0,433,436,1,0,0,0,434,432,1,0,0,0,434,435,1,0,0,0,435,450,
        1,0,0,0,436,434,1,0,0,0,437,438,5,69,0,0,438,439,5,37,0,0,439,446,
        3,60,30,0,440,441,5,32,0,0,441,442,5,69,0,0,442,443,5,37,0,0,443,
        445,3,60,30,0,444,440,1,0,0,0,445,448,1,0,0,0,446,444,1,0,0,0,446,
        447,1,0,0,0,447,450,1,0,0,0,448,446,1,0,0,0,449,420,1,0,0,0,449,
        437,1,0,0,0,450,67,1,0,0,0,451,455,5,69,0,0,452,454,3,72,36,0,453,
        452,1,0,0,0,454,457,1,0,0,0,455,453,1,0,0,0,455,456,1,0,0,0,456,
        69,1,0,0,0,457,455,1,0,0,0,458,460,5,59,0,0,459,461,3,50,25,0,460,
        459,1,0,0,0,460,461,1,0,0,0,461,462,1,0,0,0,462,465,5,60,0,0,463,
        465,3,72,36,0,464,458,1,0,0,0,464,463,1,0,0,0,465,71,1,0,0,0,466,
        467,5,33,0,0,467,473,5,69,0,0,468,469,5,35,0,0,469,470,3,56,28,0,
        470,471,5,36,0,0,471,473,1,0,0,0,472,466,1,0,0,0,472,468,1,0,0,0,
        473,73,1,0,0,0,474,476,3,76,38,0,475,474,1,0,0,0,475,476,1,0,0,0,
        476,477,1,0,0,0,477,479,5,69,0,0,478,480,3,70,35,0,479,478,1,0,0,
        0,480,481,1,0,0,0,481,479,1,0,0,0,481,482,1,0,0,0,482,75,1,0,0,0,
        483,485,5,46,0,0,484,483,1,0,0,0,484,485,1,0,0,0,485,486,1,0,0,0,
        486,488,5,48,0,0,487,489,3,56,28,0,488,487,1,0,0,0,488,489,1,0,0,
        0,489,77,1,0,0,0,490,491,5,17,0,0,491,492,3,56,28,0,492,79,1,0,0,
        0,493,494,3,98,49,0,494,495,5,31,0,0,495,496,3,8,4,0,496,81,1,0,
        0,0,497,498,5,57,0,0,498,501,5,1,0,0,499,502,5,57,0,0,500,502,3,
        94,47,0,501,499,1,0,0,0,501,500,1,0,0,0,502,503,1,0,0,0,503,501,
        1,0,0,0,503,504,1,0,0,0,504,505,1,0,0,0,505,506,5,2,0,0,506,83,1,
        0,0,0,507,511,3,86,43,0,508,511,3,88,44,0,509,511,3,90,45,0,510,
        507,1,0,0,0,510,508,1,0,0,0,510,509,1,0,0,0,511,85,1,0,0,0,512,513,
        5,6,0,0,513,514,5,31,0,0,514,515,5,57,0,0,515,518,5,1,0,0,516,519,
        5,57,0,0,517,519,3,96,48,0,518,516,1,0,0,0,518,517,1,0,0,0,519,520,
        1,0,0,0,520,518,1,0,0,0,520,521,1,0,0,0,521,522,1,0,0,0,522,523,
        5,2,0,0,523,87,1,0,0,0,524,528,5,7,0,0,525,526,5,59,0,0,526,527,
        5,69,0,0,527,529,5,60,0,0,528,525,1,0,0,0,528,529,1,0,0,0,529,530,
        1,0,0,0,530,531,5,31,0,0,531,532,3,82,41,0,532,89,1,0,0,0,533,534,
        5,8,0,0,534,535,5,31,0,0,535,536,5,57,0,0,536,540,5,1,0,0,537,541,
        5,57,0,0,538,541,3,96,48,0,539,541,3,80,40,0,540,537,1,0,0,0,540,
        538,1,0,0,0,540,539,1,0,0,0,541,542,1,0,0,0,542,540,1,0,0,0,542,
        543,1,0,0,0,543,544,1,0,0,0,544,545,5,2,0,0,545,91,1,0,0,0,546,547,
        5,57,0,0,547,550,5,1,0,0,548,551,5,57,0,0,549,551,3,96,48,0,550,
        548,1,0,0,0,550,549,1,0,0,0,551,552,1,0,0,0,552,550,1,0,0,0,552,
        553,1,0,0,0,553,554,1,0,0,0,554,555,5,2,0,0,555,93,1,0,0,0,556,557,
        5,21,0,0,557,562,5,69,0,0,558,559,5,32,0,0,559,561,5,69,0,0,560,
        558,1,0,0,0,561,564,1,0,0,0,562,560,1,0,0,0,562,563,1,0,0,0,563,
        565,1,0,0,0,564,562,1,0,0,0,565,566,5,22,0,0,566,567,3,56,28,0,567,
        568,5,31,0,0,568,569,3,82,41,0,569,581,1,0,0,0,570,571,7,10,0,0,
        571,578,5,31,0,0,572,579,3,50,25,0,573,574,5,59,0,0,574,575,3,50,
        25,0,575,576,5,60,0,0,576,579,1,0,0,0,577,579,3,92,46,0,578,572,
        1,0,0,0,578,573,1,0,0,0,578,577,1,0,0,0,579,581,1,0,0,0,580,556,
        1,0,0,0,580,570,1,0,0,0,581,95,1,0,0,0,582,586,3,98,49,0,583,585,
        5,68,0,0,584,583,1,0,0,0,585,588,1,0,0,0,586,584,1,0,0,0,586,587,
        1,0,0,0,587,589,1,0,0,0,588,586,1,0,0,0,589,590,5,31,0,0,590,591,
        3,100,50,0,591,97,1,0,0,0,592,593,7,11,0,0,593,99,1,0,0,0,594,604,
        3,92,46,0,595,600,3,56,28,0,596,597,5,32,0,0,597,599,3,56,28,0,598,
        596,1,0,0,0,599,602,1,0,0,0,600,598,1,0,0,0,600,601,1,0,0,0,601,
        604,1,0,0,0,602,600,1,0,0,0,603,594,1,0,0,0,603,595,1,0,0,0,604,
        101,1,0,0,0,605,607,5,69,0,0,606,608,3,56,28,0,607,606,1,0,0,0,607,
        608,1,0,0,0,608,103,1,0,0,0,609,613,5,9,0,0,610,612,3,102,51,0,611,
        610,1,0,0,0,612,615,1,0,0,0,613,611,1,0,0,0,613,614,1,0,0,0,614,
        105,1,0,0,0,615,613,1,0,0,0,616,619,5,14,0,0,617,620,5,69,0,0,618,
        620,3,56,28,0,619,617,1,0,0,0,619,618,1,0,0,0,620,107,1,0,0,0,621,
        622,5,19,0,0,622,624,5,69,0,0,623,625,3,110,55,0,624,623,1,0,0,0,
        624,625,1,0,0,0,625,644,1,0,0,0,626,627,5,20,0,0,627,628,5,69,0,
        0,628,638,5,19,0,0,629,639,5,49,0,0,630,635,5,69,0,0,631,632,5,32,
        0,0,632,634,5,69,0,0,633,631,1,0,0,0,634,637,1,0,0,0,635,633,1,0,
        0,0,635,636,1,0,0,0,636,639,1,0,0,0,637,635,1,0,0,0,638,629,1,0,
        0,0,638,630,1,0,0,0,639,641,1,0,0,0,640,642,3,110,55,0,641,640,1,
        0,0,0,641,642,1,0,0,0,642,644,1,0,0,0,643,621,1,0,0,0,643,626,1,
        0,0,0,644,109,1,0,0,0,645,649,5,63,0,0,646,648,7,12,0,0,647,646,
        1,0,0,0,648,651,1,0,0,0,649,647,1,0,0,0,649,650,1,0,0,0,650,111,
        1,0,0,0,651,649,1,0,0,0,652,653,7,13,0,0,653,654,5,31,0,0,654,655,
        3,8,4,0,655,113,1,0,0,0,656,657,5,25,0,0,657,658,3,56,28,0,658,659,
        5,31,0,0,659,663,3,8,4,0,660,662,3,116,58,0,661,660,1,0,0,0,662,
        665,1,0,0,0,663,661,1,0,0,0,663,664,1,0,0,0,664,667,1,0,0,0,665,
        663,1,0,0,0,666,668,3,118,59,0,667,666,1,0,0,0,667,668,1,0,0,0,668,
        115,1,0,0,0,669,670,5,26,0,0,670,671,5,25,0,0,671,672,3,56,28,0,
        672,673,5,31,0,0,673,674,3,8,4,0,674,117,1,0,0,0,675,676,5,26,0,
        0,676,677,5,31,0,0,677,678,3,8,4,0,678,119,1,0,0,0,679,680,5,23,
        0,0,680,681,3,56,28,0,681,682,5,31,0,0,682,683,3,8,4,0,683,121,1,
        0,0,0,684,685,5,21,0,0,685,690,5,69,0,0,686,687,5,32,0,0,687,689,
        5,69,0,0,688,686,1,0,0,0,689,692,1,0,0,0,690,688,1,0,0,0,690,691,
        1,0,0,0,691,693,1,0,0,0,692,690,1,0,0,0,693,694,5,22,0,0,694,695,
        3,56,28,0,695,696,5,31,0,0,696,697,3,8,4,0,697,123,1,0,0,0,698,699,
        5,30,0,0,699,700,5,31,0,0,700,705,3,56,28,0,701,702,5,32,0,0,702,
        704,3,56,28,0,703,701,1,0,0,0,704,707,1,0,0,0,705,703,1,0,0,0,705,
        706,1,0,0,0,706,708,1,0,0,0,707,705,1,0,0,0,708,709,5,31,0,0,709,
        710,3,128,64,0,710,125,1,0,0,0,711,712,7,14,0,0,712,127,1,0,0,0,
        713,714,5,57,0,0,714,716,5,1,0,0,715,717,3,130,65,0,716,715,1,0,
        0,0,717,718,1,0,0,0,718,716,1,0,0,0,718,719,1,0,0,0,719,720,1,0,
        0,0,720,721,5,2,0,0,721,129,1,0,0,0,722,727,3,132,66,0,723,727,3,
        136,68,0,724,727,3,134,67,0,725,727,5,57,0,0,726,722,1,0,0,0,726,
        723,1,0,0,0,726,724,1,0,0,0,726,725,1,0,0,0,727,131,1,0,0,0,728,
        729,3,126,63,0,729,730,5,31,0,0,730,738,3,56,28,0,731,732,5,32,0,
        0,732,733,3,126,63,0,733,734,5,31,0,0,734,735,3,56,28,0,735,737,
        1,0,0,0,736,731,1,0,0,0,737,740,1,0,0,0,738,736,1,0,0,0,738,739,
        1,0,0,0,739,745,1,0,0,0,740,738,1,0,0,0,741,742,5,32,0,0,742,744,
        3,126,63,0,743,741,1,0,0,0,744,747,1,0,0,0,745,743,1,0,0,0,745,746,
        1,0,0,0,746,748,1,0,0,0,747,745,1,0,0,0,748,758,5,31,0,0,749,759,
        3,128,64,0,750,755,3,56,28,0,751,752,5,32,0,0,752,754,3,56,28,0,
        753,751,1,0,0,0,754,757,1,0,0,0,755,753,1,0,0,0,755,756,1,0,0,0,
        756,759,1,0,0,0,757,755,1,0,0,0,758,749,1,0,0,0,758,750,1,0,0,0,
        759,133,1,0,0,0,760,761,3,126,63,0,761,762,5,31,0,0,762,763,3,128,
        64,0,763,135,1,0,0,0,764,765,3,126,63,0,765,766,5,31,0,0,766,771,
        3,56,28,0,767,768,5,32,0,0,768,770,3,56,28,0,769,767,1,0,0,0,770,
        773,1,0,0,0,771,769,1,0,0,0,771,772,1,0,0,0,772,137,1,0,0,0,773,
        771,1,0,0,0,774,775,5,63,0,0,775,776,5,69,0,0,776,139,1,0,0,0,84,
        142,144,150,169,176,185,192,206,208,223,227,232,236,244,257,265,
        267,273,280,287,291,297,315,322,330,333,359,364,371,386,388,394,
        402,410,412,418,425,434,446,449,455,460,464,472,475,481,484,488,
        501,503,510,518,520,528,540,542,550,552,562,578,580,586,600,603,
        607,613,619,624,635,638,641,643,649,663,667,690,705,718,726,738,
        745,755,758,771
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public atom_expr(): Atom_exprContext | null {
        return this.getRuleContext(0, Atom_exprContext);
    }
    public function_call_expr(): Function_call_exprContext | null {
        return this.getRuleContext(0, Function_call_exprContext);
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
    public NEWLINE(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.NEWLINE, 0);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_expression;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public path_block(): Path_blockContext | null {
        return this.getRuleContext(0, Path_blockContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_graph_expressions;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitGraph_expressions) {
            return visitor.visitGraph_expressions(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Expressions_blockContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public NEWLINE(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.NEWLINE, 0)!;
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public Colon(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Colon, 0)!;
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public Colon(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Colon, 0)!;
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public Colon(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Colon, 0)!;
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public Colon(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Colon, 0)!;
    }
    public value_expr(): Value_exprContext | null {
        return this.getRuleContext(0, Value_exprContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_component_modifier_expr;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public Comma(): antlr.TerminalNode[];
    public Comma(i: number): antlr.TerminalNode | null;
    public Comma(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(CircuitScriptParser.Comma);
    	} else {
    		return this.getToken(CircuitScriptParser.Comma, i);
    	}
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_to_component_expr;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitTo_component_expr) {
            return visitor.visitTo_component_expr(this);
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public Colon(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Colon, 0)!;
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public Colon(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Colon, 0)!;
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public Assign(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Assign, 0)!;
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public Assign(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Assign, 0)!;
    }
    public data_expr(): Data_exprContext {
        return this.getRuleContext(0, Data_exprContext)!;
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_keyword_assignment_expr;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public Comma(): antlr.TerminalNode[];
    public Comma(i: number): antlr.TerminalNode | null;
    public Comma(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(CircuitScriptParser.Comma);
    	} else {
    		return this.getToken(CircuitScriptParser.Comma, i);
    	}
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public Assign(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Assign, 0)!;
    }
    public data_expr(): Data_exprContext {
        return this.getRuleContext(0, Data_exprContext)!;
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_property_set_expr;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public DoubleDot(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.DoubleDot, 0)!;
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.ID, 0)!;
    }
    public Assign(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Assign, 0)!;
    }
    public data_expr(): Data_exprContext {
        return this.getRuleContext(0, Data_exprContext)!;
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_double_dot_property_set_expr;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
export class ValueExprContext extends Data_exprContext {
    public constructor(ctx: Data_exprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public value_expr(): Value_exprContext {
        return this.getRuleContext(0, Value_exprContext)!;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitValueExpr) {
            return visitor.visitValueExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class ArrayExprContext extends Data_exprContext {
    public constructor(ctx: Data_exprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public LSquare(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.LSquare, 0)!;
    }
    public RSquare(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.RSquare, 0)!;
    }
    public data_expr(): Data_exprContext[];
    public data_expr(i: number): Data_exprContext | null;
    public data_expr(i?: number): Data_exprContext[] | Data_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Data_exprContext);
        }

        return this.getRuleContext(i, Data_exprContext);
    }
    public Comma(): antlr.TerminalNode[];
    public Comma(i: number): antlr.TerminalNode | null;
    public Comma(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(CircuitScriptParser.Comma);
    	} else {
    		return this.getToken(CircuitScriptParser.Comma, i);
    	}
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitArrayExpr) {
            return visitor.visitArrayExpr(this);
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitLogicalOperatorExpr) {
            return visitor.visitLogicalOperatorExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class CreateExprContext extends Data_exprContext {
    public constructor(ctx: Data_exprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public Create(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Create, 0)!;
    }
    public create_expr(): Create_exprContext {
        return this.getRuleContext(0, Create_exprContext)!;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitCreateExpr) {
            return visitor.visitCreateExpr(this);
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
    public data_expr(): Data_exprContext {
        return this.getRuleContext(0, Data_exprContext)!;
    }
    public Not(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.Not, 0);
    }
    public Minus(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.Minus, 0);
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitUnaryOperatorExpr) {
            return visitor.visitUnaryOperatorExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class AtomExprContext extends Data_exprContext {
    public constructor(ctx: Data_exprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public atom_expr(): Atom_exprContext {
        return this.getRuleContext(0, Atom_exprContext)!;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitAtomExpr) {
            return visitor.visitAtomExpr(this);
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public LParen(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.LParen, 0)!;
    }
    public data_expr(): Data_exprContext {
        return this.getRuleContext(0, Data_exprContext)!;
    }
    public RParen(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.RParen, 0)!;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitBinary_operator) {
            return visitor.visitBinary_operator(this);
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public LParen(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.LParen, 0)!;
    }
    public RParen(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.RParen, 0)!;
    }
    public Colon(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Colon, 0)!;
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public Comma(): antlr.TerminalNode[];
    public Comma(i: number): antlr.TerminalNode | null;
    public Comma(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(CircuitScriptParser.Comma);
    	} else {
    		return this.getToken(CircuitScriptParser.Comma, i);
    	}
    }
    public Assign(): antlr.TerminalNode[];
    public Assign(i: number): antlr.TerminalNode | null;
    public Assign(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(CircuitScriptParser.Assign);
    	} else {
    		return this.getToken(CircuitScriptParser.Assign, i);
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public LParen(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.LParen, 0);
    }
    public RParen(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.RParen, 0);
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public Dot(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.Dot, 0);
    }
    public ID(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.ID, 0);
    }
    public LSquare(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.LSquare, 0);
    }
    public data_expr(): Data_exprContext | null {
        return this.getRuleContext(0, Data_exprContext);
    }
    public RSquare(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.RSquare, 0);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_trailer_expr2;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public Colon(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Colon, 0)!;
    }
    public expressions_block(): Expressions_blockContext {
        return this.getRuleContext(0, Expressions_blockContext)!;
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_property_block_expr;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitProperty_block_expr) {
            return visitor.visitProperty_block_expr(this);
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitGraphic_expressions_block) {
            return visitor.visitGraphic_expressions_block(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Create_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
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
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_create_expr;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitCreate_expr) {
            return visitor.visitCreate_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Create_component_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Component(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Component, 0)!;
    }
    public Colon(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Colon, 0)!;
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitCreate_component_expr) {
            return visitor.visitCreate_component_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Create_graphic_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Graphic(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Graphic, 0)!;
    }
    public Colon(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Colon, 0)!;
    }
    public graphic_expressions_block(): Graphic_expressions_blockContext {
        return this.getRuleContext(0, Graphic_expressions_blockContext)!;
    }
    public LParen(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.LParen, 0);
    }
    public ID(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.ID, 0);
    }
    public RParen(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.RParen, 0);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_create_graphic_expr;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public Module(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Module, 0)!;
    }
    public Colon(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Colon, 0)!;
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public Colon(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Colon, 0)!;
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
    public LParen(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.LParen, 0);
    }
    public RParen(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.RParen, 0);
    }
    public nested_properties_inner(): Nested_properties_innerContext | null {
        return this.getRuleContext(0, Nested_properties_innerContext);
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public Colon(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Colon, 0)!;
    }
    public graphic_expressions_block(): Graphic_expressions_blockContext {
        return this.getRuleContext(0, Graphic_expressions_blockContext)!;
    }
    public Comma(): antlr.TerminalNode[];
    public Comma(i: number): antlr.TerminalNode | null;
    public Comma(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(CircuitScriptParser.Comma);
    	} else {
    		return this.getToken(CircuitScriptParser.Comma, i);
    	}
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public Colon(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Colon, 0)!;
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public Comma(): antlr.TerminalNode[];
    public Comma(i: number): antlr.TerminalNode | null;
    public Comma(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(CircuitScriptParser.Comma);
    	} else {
    		return this.getToken(CircuitScriptParser.Comma, i);
    	}
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public ID(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.ID, 0)!;
    }
    public data_expr(): Data_exprContext | null {
        return this.getRuleContext(0, Data_exprContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_wire_atom_expr;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitWire_atom_expr) {
            return visitor.visitWire_atom_expr(this);
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitWire_expr) {
            return visitor.visitWire_expr(this);
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public Comma(): antlr.TerminalNode[];
    public Comma(i: number): antlr.TerminalNode | null;
    public Comma(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(CircuitScriptParser.Comma);
    	} else {
    		return this.getToken(CircuitScriptParser.Comma, i);
    	}
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public Colon(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Colon, 0)!;
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public Colon(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Colon, 0)!;
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public Colon(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Colon, 0)!;
    }
    public expressions_block(): Expressions_blockContext {
        return this.getRuleContext(0, Expressions_blockContext)!;
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_if_inner_expr;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public Colon(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Colon, 0)!;
    }
    public expressions_block(): Expressions_blockContext {
        return this.getRuleContext(0, Expressions_blockContext)!;
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_else_expr;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public Colon(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Colon, 0)!;
    }
    public expressions_block(): Expressions_blockContext {
        return this.getRuleContext(0, Expressions_blockContext)!;
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_while_expr;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public Colon(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Colon, 0)!;
    }
    public expressions_block(): Expressions_blockContext {
        return this.getRuleContext(0, Expressions_blockContext)!;
    }
    public Comma(): antlr.TerminalNode[];
    public Comma(i: number): antlr.TerminalNode | null;
    public Comma(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(CircuitScriptParser.Comma);
    	} else {
    		return this.getToken(CircuitScriptParser.Comma, i);
    	}
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_for_expr;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public Set(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Set, 0)!;
    }
    public Colon(): antlr.TerminalNode[];
    public Colon(i: number): antlr.TerminalNode | null;
    public Colon(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(CircuitScriptParser.Colon);
    	} else {
    		return this.getToken(CircuitScriptParser.Colon, i);
    	}
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
    public Comma(): antlr.TerminalNode[];
    public Comma(i: number): antlr.TerminalNode | null;
    public Comma(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(CircuitScriptParser.Comma);
    	} else {
    		return this.getToken(CircuitScriptParser.Comma, i);
    	}
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_part_set_expr;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public NEWLINE(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.NEWLINE, 0)!;
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public NEWLINE(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.NEWLINE, 0);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_part_sub_expr;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public Colon(): antlr.TerminalNode[];
    public Colon(i: number): antlr.TerminalNode | null;
    public Colon(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(CircuitScriptParser.Colon);
    	} else {
    		return this.getToken(CircuitScriptParser.Colon, i);
    	}
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
    public Comma(): antlr.TerminalNode[];
    public Comma(i: number): antlr.TerminalNode | null;
    public Comma(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(CircuitScriptParser.Comma);
    	} else {
    		return this.getToken(CircuitScriptParser.Comma, i);
    	}
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_part_condition_expr;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public Colon(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Colon, 0)!;
    }
    public part_match_block(): Part_match_blockContext {
        return this.getRuleContext(0, Part_match_blockContext)!;
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_part_condition_key_only_expr;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public Colon(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Colon, 0)!;
    }
    public data_expr(): Data_exprContext[];
    public data_expr(i: number): Data_exprContext | null;
    public data_expr(i?: number): Data_exprContext[] | Data_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Data_exprContext);
        }

        return this.getRuleContext(i, Data_exprContext);
    }
    public Comma(): antlr.TerminalNode[];
    public Comma(i: number): antlr.TerminalNode | null;
    public Comma(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(CircuitScriptParser.Comma);
    	} else {
    		return this.getToken(CircuitScriptParser.Comma, i);
    	}
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_part_value_expr;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitAnnotation_comment_expr) {
            return visitor.visitAnnotation_comment_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
