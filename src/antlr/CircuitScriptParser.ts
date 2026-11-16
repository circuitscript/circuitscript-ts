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
    public static readonly CreateComponent = 5;
    public static readonly CreateGraphic = 6;
    public static readonly CreateModule = 7;
    public static readonly CreateNetClass = 8;
    public static readonly CreateBus = 9;
    public static readonly CreateBehavior = 10;
    public static readonly CreateScenario = 11;
    public static readonly Wire = 12;
    public static readonly Pin = 13;
    public static readonly Add = 14;
    public static readonly At = 15;
    public static readonly To = 16;
    public static readonly Point = 17;
    public static readonly Join = 18;
    public static readonly Parallel = 19;
    public static readonly Return = 20;
    public static readonly Define = 21;
    public static readonly Import = 22;
    public static readonly From = 23;
    public static readonly For = 24;
    public static readonly In = 25;
    public static readonly While = 26;
    public static readonly Continue = 27;
    public static readonly If = 28;
    public static readonly Else = 29;
    public static readonly Not = 30;
    public static readonly Frame = 31;
    public static readonly Sheet = 32;
    public static readonly Set = 33;
    public static readonly State = 34;
    public static readonly Colon = 35;
    public static readonly Comma = 36;
    public static readonly Dot = 37;
    public static readonly DoubleDot = 38;
    public static readonly LSquare = 39;
    public static readonly RSquare = 40;
    public static readonly Assign = 41;
    public static readonly Equals = 42;
    public static readonly NotEquals = 43;
    public static readonly GreaterThan = 44;
    public static readonly GreatOrEqualThan = 45;
    public static readonly LessThan = 46;
    public static readonly LessOrEqualThan = 47;
    public static readonly LogicalAnd = 48;
    public static readonly LogicalOr = 49;
    public static readonly Addition = 50;
    public static readonly Minus = 51;
    public static readonly Divide = 52;
    public static readonly Multiply = 53;
    public static readonly Modulus = 54;
    public static readonly AdditionAssign = 55;
    public static readonly MinusAssign = 56;
    public static readonly DivideAssign = 57;
    public static readonly MultiplyAssign = 58;
    public static readonly ModulusAssign = 59;
    public static readonly LINE_CONTINUATION = 60;
    public static readonly NEWLINE = 61;
    public static readonly WS = 62;
    public static readonly COMMENT = 63;
    public static readonly LParen = 64;
    public static readonly RParen = 65;
    public static readonly NOT_CONNECTED = 66;
    public static readonly BOOLEAN_VALUE = 67;
    public static readonly ANNOTATION_START = 68;
    public static readonly INTEGER_VALUE = 69;
    public static readonly DECIMAL_VALUE = 70;
    public static readonly NUMERIC_VALUE = 71;
    public static readonly PERCENTAGE_VALUE = 72;
    public static readonly STRING_VALUE = 73;
    public static readonly ID = 74;
    public static readonly RULE_script = 0;
    public static readonly RULE_expression = 1;
    public static readonly RULE_non_newline_expression = 2;
    public static readonly RULE_flow_expressions = 3;
    public static readonly RULE_graph_expressions = 4;
    public static readonly RULE_expressions_block = 5;
    public static readonly RULE_path_block = 6;
    public static readonly RULE_pin_select_expr = 7;
    public static readonly RULE_component_modifier_expr = 8;
    public static readonly RULE_data_expr_with_assignment = 9;
    public static readonly RULE_assignment_expr = 10;
    public static readonly RULE_add_component_expr = 11;
    public static readonly RULE_component_select_expr = 12;
    public static readonly RULE_at_component_expr = 13;
    public static readonly RULE_to_component_expr = 14;
    public static readonly RULE_at_block_header = 15;
    public static readonly RULE_at_block = 16;
    public static readonly RULE_at_block_expressions = 17;
    public static readonly RULE_at_block_expressions_inner = 18;
    public static readonly RULE_at_block_pin_expr = 19;
    public static readonly RULE_data_expr_with_doubledot = 20;
    public static readonly RULE_keyword_assignment_expr = 21;
    public static readonly RULE_parameters = 22;
    public static readonly RULE_double_dot_property_set_expr = 23;
    public static readonly RULE_data_expr = 24;
    public static readonly RULE_value_expr = 25;
    public static readonly RULE_function_def_expr = 26;
    public static readonly RULE_function_expr = 27;
    public static readonly RULE_function_args_expr = 28;
    public static readonly RULE_function_return_expr = 29;
    public static readonly RULE_net_namespace_expr = 30;
    public static readonly RULE_call_trailer = 31;
    public static readonly RULE_non_call_trailer = 32;
    public static readonly RULE_callable_expr = 33;
    public static readonly RULE_trailer = 34;
    public static readonly RULE_module_callable_expr = 35;
    public static readonly RULE_property_block_expr = 36;
    public static readonly RULE_properties_block = 37;
    public static readonly RULE_graphic_expressions_block = 38;
    public static readonly RULE_create_expr = 39;
    public static readonly RULE_behavior_state_expr = 40;
    public static readonly RULE_behavior_block_expr = 41;
    public static readonly RULE_behavior_block = 42;
    public static readonly RULE_create_scenario_expr = 43;
    public static readonly RULE_if_inner_graphic_expr = 44;
    public static readonly RULE_else_graphic_expr = 45;
    public static readonly RULE_graphics_data_expr = 46;
    public static readonly RULE_graphics_data_expressions_block = 47;
    public static readonly RULE_graphic_expr = 48;
    public static readonly RULE_property_expr = 49;
    public static readonly RULE_property_key_expr = 50;
    public static readonly RULE_property_value_expr = 51;
    public static readonly RULE_wire_expr = 52;
    public static readonly RULE_point_expr = 53;
    public static readonly RULE_import_expr = 54;
    public static readonly RULE_frame_expr = 55;
    public static readonly RULE_if_expr = 56;
    public static readonly RULE_if_inner_expr = 57;
    public static readonly RULE_else_expr = 58;
    public static readonly RULE_while_expr = 59;
    public static readonly RULE_for_expr = 60;
    public static readonly RULE_part_set_expr = 61;
    public static readonly RULE_part_set_key = 62;
    public static readonly RULE_part_match_block = 63;
    public static readonly RULE_part_sub_expr = 64;
    public static readonly RULE_part_condition_expr = 65;
    public static readonly RULE_part_value_expr = 66;
    public static readonly RULE_annotation_comment_expr = 67;

    public static readonly literalNames = [
        null, null, null, "'break'", "'branch'", null, null, null, null, 
        null, null, null, "'wire'", "'pin'", "'add'", "'at'", "'to'", "'point'", 
        "'join'", "'parallel'", "'return'", "'def'", "'import'", "'from'", 
        "'for'", "'in'", "'while'", "'continue'", "'if'", "'else'", null, 
        "'frame'", "'sheet'", "'set'", "'state'", "':'", "','", "'.'", "'..'", 
        "'['", "']'", "'='", "'=='", "'!='", "'>'", "'>='", "'<'", "'<='", 
        null, null, "'+'", "'-'", "'/'", "'*'", "'%'", "'+='", "'-='", "'/='", 
        "'*='", "'%='", null, null, null, null, "'('", "')'", null, null, 
        "'#='"
    ];

    public static readonly symbolicNames = [
        null, "INDENT", "DEDENT", "Break", "Branch", "CreateComponent", 
        "CreateGraphic", "CreateModule", "CreateNetClass", "CreateBus", 
        "CreateBehavior", "CreateScenario", "Wire", "Pin", "Add", "At", 
        "To", "Point", "Join", "Parallel", "Return", "Define", "Import", 
        "From", "For", "In", "While", "Continue", "If", "Else", "Not", "Frame", 
        "Sheet", "Set", "State", "Colon", "Comma", "Dot", "DoubleDot", "LSquare", 
        "RSquare", "Assign", "Equals", "NotEquals", "GreaterThan", "GreatOrEqualThan", 
        "LessThan", "LessOrEqualThan", "LogicalAnd", "LogicalOr", "Addition", 
        "Minus", "Divide", "Multiply", "Modulus", "AdditionAssign", "MinusAssign", 
        "DivideAssign", "MultiplyAssign", "ModulusAssign", "LINE_CONTINUATION", 
        "NEWLINE", "WS", "COMMENT", "LParen", "RParen", "NOT_CONNECTED", 
        "BOOLEAN_VALUE", "ANNOTATION_START", "INTEGER_VALUE", "DECIMAL_VALUE", 
        "NUMERIC_VALUE", "PERCENTAGE_VALUE", "STRING_VALUE", "ID"
    ];
    public static readonly ruleNames = [
        "script", "expression", "non_newline_expression", "flow_expressions", 
        "graph_expressions", "expressions_block", "path_block", "pin_select_expr", 
        "component_modifier_expr", "data_expr_with_assignment", "assignment_expr", 
        "add_component_expr", "component_select_expr", "at_component_expr", 
        "to_component_expr", "at_block_header", "at_block", "at_block_expressions", 
        "at_block_expressions_inner", "at_block_pin_expr", "data_expr_with_doubledot", 
        "keyword_assignment_expr", "parameters", "double_dot_property_set_expr", 
        "data_expr", "value_expr", "function_def_expr", "function_expr", 
        "function_args_expr", "function_return_expr", "net_namespace_expr", 
        "call_trailer", "non_call_trailer", "callable_expr", "trailer", 
        "module_callable_expr", "property_block_expr", "properties_block", 
        "graphic_expressions_block", "create_expr", "behavior_state_expr", 
        "behavior_block_expr", "behavior_block", "create_scenario_expr", 
        "if_inner_graphic_expr", "else_graphic_expr", "graphics_data_expr", 
        "graphics_data_expressions_block", "graphic_expr", "property_expr", 
        "property_key_expr", "property_value_expr", "wire_expr", "point_expr", 
        "import_expr", "frame_expr", "if_expr", "if_inner_expr", "else_expr", 
        "while_expr", "for_expr", "part_set_expr", "part_set_key", "part_match_block", 
        "part_sub_expr", "part_condition_expr", "part_value_expr", "annotation_comment_expr",
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
            this.state = 140;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 1, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    this.state = 138;
                    this.errorHandler.sync(this);
                    switch (this.tokenStream.LA(1)) {
                    case CircuitScriptParser.Import:
                    case CircuitScriptParser.From:
                        {
                        this.state = 136;
                        this.import_expr();
                        }
                        break;
                    case CircuitScriptParser.NEWLINE:
                        {
                        this.state = 137;
                        this.match(CircuitScriptParser.NEWLINE);
                        }
                        break;
                    default:
                        throw new antlr.NoViableAltException(this);
                    }
                    }
                }
                this.state = 142;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 1, this.context);
            }
            this.state = 146;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2637158424) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 538705987) !== 0) || _la === 68 || _la === 74) {
                {
                {
                this.state = 143;
                this.expression();
                }
                }
                this.state = 148;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 149;
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
            this.state = 153;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.Break:
            case CircuitScriptParser.Branch:
            case CircuitScriptParser.CreateScenario:
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
            case CircuitScriptParser.Minus:
            case CircuitScriptParser.Divide:
            case CircuitScriptParser.ANNOTATION_START:
            case CircuitScriptParser.ID:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 151;
                this.non_newline_expression();
                }
                break;
            case CircuitScriptParser.NEWLINE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 152;
                this.match(CircuitScriptParser.NEWLINE);
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
    public non_newline_expression(): Non_newline_expressionContext {
        let localContext = new Non_newline_expressionContext(this.context, this.state);
        this.enterRule(localContext, 4, CircuitScriptParser.RULE_non_newline_expression);
        try {
            this.state = 166;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 4, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 155;
                this.flow_expressions();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 156;
                this.graph_expressions();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 157;
                this.function_def_expr();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 158;
                this.frame_expr();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 159;
                this.part_set_expr();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 160;
                this.annotation_comment_expr();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 161;
                this.double_dot_property_set_expr();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 162;
                this.assignment_expr();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 163;
                this.module_callable_expr();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 164;
                this.callable_expr();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 165;
                this.create_scenario_expr();
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
        this.enterRule(localContext, 6, CircuitScriptParser.RULE_flow_expressions);
        try {
            this.state = 173;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.If:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 168;
                this.if_expr();
                }
                break;
            case CircuitScriptParser.While:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 169;
                this.while_expr();
                }
                break;
            case CircuitScriptParser.For:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 170;
                this.for_expr();
                }
                break;
            case CircuitScriptParser.Break:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 171;
                this.match(CircuitScriptParser.Break);
                }
                break;
            case CircuitScriptParser.Continue:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 172;
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
        this.enterRule(localContext, 8, CircuitScriptParser.RULE_graph_expressions);
        try {
            this.state = 182;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 6, this.context) ) {
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
                this.at_component_expr();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 177;
                this.at_block();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 178;
                this.to_component_expr();
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
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 181;
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
        this.enterRule(localContext, 10, CircuitScriptParser.RULE_expressions_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 184;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 185;
            this.match(CircuitScriptParser.INDENT);
            this.state = 187;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 186;
                this.expression();
                }
                }
                this.state = 189;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2637158424) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 538705987) !== 0) || _la === 68 || _la === 74);
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
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 193;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 917520) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 194;
            this.match(CircuitScriptParser.Colon);
            this.state = 202;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 9, this.context) ) {
            case 1:
                {
                this.state = 196;
                this.errorHandler.sync(this);
                alternative = 1;
                do {
                    switch (alternative) {
                    case 1:
                        {
                        {
                        this.state = 195;
                        this.non_newline_expression();
                        }
                        }
                        break;
                    default:
                        throw new antlr.NoViableAltException(this);
                    }
                    this.state = 198;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 8, this.context);
                } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                }
                break;
            case 2:
                {
                this.state = 200;
                this.expressions_block();
                }
                break;
            case 3:
                {
                this.state = 201;
                this.at_block_expressions();
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
    public pin_select_expr(): Pin_select_exprContext {
        let localContext = new Pin_select_exprContext(this.context, this.state);
        this.enterRule(localContext, 14, CircuitScriptParser.RULE_pin_select_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 204;
            this.match(CircuitScriptParser.Pin);
            this.state = 205;
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
        this.enterRule(localContext, 16, CircuitScriptParser.RULE_component_modifier_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 207;
            this.match(CircuitScriptParser.ID);
            this.state = 208;
            this.match(CircuitScriptParser.Colon);
            this.state = 209;
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
    public data_expr_with_assignment(): Data_expr_with_assignmentContext {
        let localContext = new Data_expr_with_assignmentContext(this.context, this.state);
        this.enterRule(localContext, 18, CircuitScriptParser.RULE_data_expr_with_assignment);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 213;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 10, this.context) ) {
            case 1:
                {
                this.state = 211;
                this.data_expr(0);
                }
                break;
            case 2:
                {
                this.state = 212;
                this.assignment_expr();
                }
                break;
            }
            this.state = 218;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 11, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 215;
                    this.component_modifier_expr();
                    }
                    }
                }
                this.state = 220;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 11, this.context);
            }
            this.state = 222;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 13) {
                {
                this.state = 221;
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
    public assignment_expr(): Assignment_exprContext {
        let localContext = new Assignment_exprContext(this.context, this.state);
        this.enterRule(localContext, 20, CircuitScriptParser.RULE_assignment_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 224;
            this.callable_expr();
            this.state = 225;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 507905) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 226;
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
    public add_component_expr(): Add_component_exprContext {
        let localContext = new Add_component_exprContext(this.context, this.state);
        this.enterRule(localContext, 22, CircuitScriptParser.RULE_add_component_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 228;
            this.match(CircuitScriptParser.Add);
            this.state = 229;
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
            this.state = 234;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.CreateComponent:
            case CircuitScriptParser.CreateGraphic:
            case CircuitScriptParser.CreateModule:
            case CircuitScriptParser.CreateNetClass:
            case CircuitScriptParser.CreateBus:
            case CircuitScriptParser.CreateBehavior:
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
                this.state = 231;
                this.data_expr_with_assignment();
                }
                break;
            case CircuitScriptParser.Pin:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 232;
                this.pin_select_expr();
                }
                break;
            case CircuitScriptParser.Point:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 233;
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
    public at_component_expr(): At_component_exprContext {
        let localContext = new At_component_exprContext(this.context, this.state);
        this.enterRule(localContext, 26, CircuitScriptParser.RULE_at_component_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 236;
            this.match(CircuitScriptParser.At);
            this.state = 238;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 14, this.context) ) {
            case 1:
                {
                this.state = 237;
                this.component_select_expr();
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
    public to_component_expr(): To_component_exprContext {
        let localContext = new To_component_exprContext(this.context, this.state);
        this.enterRule(localContext, 28, CircuitScriptParser.RULE_to_component_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 240;
            this.match(CircuitScriptParser.To);
            this.state = 241;
            this.component_select_expr();
            this.state = 246;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 36) {
                {
                {
                this.state = 242;
                this.match(CircuitScriptParser.Comma);
                this.state = 243;
                this.component_select_expr();
                }
                }
                this.state = 248;
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
    public at_block_header(): At_block_headerContext {
        let localContext = new At_block_headerContext(this.context, this.state);
        this.enterRule(localContext, 30, CircuitScriptParser.RULE_at_block_header);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 249;
            this.at_component_expr();
            this.state = 250;
            this.match(CircuitScriptParser.Colon);
            this.state = 254;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 68) {
                {
                {
                this.state = 251;
                this.annotation_comment_expr();
                }
                }
                this.state = 256;
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
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 257;
            this.at_block_header();
            this.state = 258;
            this.at_block_expressions();
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
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 260;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 261;
            this.match(CircuitScriptParser.INDENT);
            this.state = 263;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 262;
                this.at_block_expressions_inner();
                }
                }
                this.state = 265;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2637158424) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 538705987) !== 0) || ((((_la - 68)) & ~0x1F) === 0 && ((1 << (_la - 68)) & 99) !== 0));
            this.state = 267;
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
    public at_block_expressions_inner(): At_block_expressions_innerContext {
        let localContext = new At_block_expressions_innerContext(this.context, this.state);
        this.enterRule(localContext, 36, CircuitScriptParser.RULE_at_block_expressions_inner);
        try {
            this.state = 271;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 18, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 269;
                this.at_block_pin_expr();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 270;
                this.expression();
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
    public at_block_pin_expr(): At_block_pin_exprContext {
        let localContext = new At_block_pin_exprContext(this.context, this.state);
        this.enterRule(localContext, 38, CircuitScriptParser.RULE_at_block_pin_expr);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 273;
            this.property_key_expr();
            this.state = 278;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 36) {
                {
                {
                this.state = 274;
                this.match(CircuitScriptParser.Comma);
                this.state = 275;
                this.property_key_expr();
                }
                }
                this.state = 280;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 281;
            this.match(CircuitScriptParser.Colon);
            this.state = 289;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.Break:
            case CircuitScriptParser.Branch:
            case CircuitScriptParser.CreateScenario:
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
            case CircuitScriptParser.Minus:
            case CircuitScriptParser.Divide:
            case CircuitScriptParser.ANNOTATION_START:
            case CircuitScriptParser.ID:
                {
                this.state = 283;
                this.errorHandler.sync(this);
                alternative = 1;
                do {
                    switch (alternative) {
                    case 1:
                        {
                        {
                        this.state = 282;
                        this.non_newline_expression();
                        }
                        }
                        break;
                    default:
                        throw new antlr.NoViableAltException(this);
                    }
                    this.state = 285;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 20, this.context);
                } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                }
                break;
            case CircuitScriptParser.NEWLINE:
                {
                this.state = 287;
                this.expressions_block();
                }
                break;
            case CircuitScriptParser.NOT_CONNECTED:
                {
                this.state = 288;
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
    public data_expr_with_doubledot(): Data_expr_with_doubledotContext {
        let localContext = new Data_expr_with_doubledotContext(this.context, this.state);
        this.enterRule(localContext, 40, CircuitScriptParser.RULE_data_expr_with_doubledot);
        try {
            this.state = 293;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.CreateComponent:
            case CircuitScriptParser.CreateGraphic:
            case CircuitScriptParser.CreateModule:
            case CircuitScriptParser.CreateNetClass:
            case CircuitScriptParser.CreateBus:
            case CircuitScriptParser.CreateBehavior:
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
                this.state = 291;
                this.data_expr(0);
                }
                break;
            case CircuitScriptParser.DoubleDot:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 292;
                this.match(CircuitScriptParser.DoubleDot);
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
    public keyword_assignment_expr(): Keyword_assignment_exprContext {
        let localContext = new Keyword_assignment_exprContext(this.context, this.state);
        this.enterRule(localContext, 42, CircuitScriptParser.RULE_keyword_assignment_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 295;
            this.match(CircuitScriptParser.ID);
            this.state = 296;
            this.match(CircuitScriptParser.Assign);
            this.state = 297;
            this.data_expr_with_doubledot();
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
        this.enterRule(localContext, 44, CircuitScriptParser.RULE_parameters);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 308;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 24, this.context) ) {
            case 1:
                {
                {
                this.state = 299;
                this.data_expr_with_doubledot();
                this.state = 304;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 23, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 300;
                        this.match(CircuitScriptParser.Comma);
                        this.state = 301;
                        this.data_expr_with_doubledot();
                        }
                        }
                    }
                    this.state = 306;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 23, this.context);
                }
                }
                }
                break;
            case 2:
                {
                this.state = 307;
                this.keyword_assignment_expr();
                }
                break;
            }
            this.state = 314;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 36) {
                {
                {
                this.state = 310;
                this.match(CircuitScriptParser.Comma);
                this.state = 311;
                this.keyword_assignment_expr();
                }
                }
                this.state = 316;
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
    public double_dot_property_set_expr(): Double_dot_property_set_exprContext {
        let localContext = new Double_dot_property_set_exprContext(this.context, this.state);
        this.enterRule(localContext, 46, CircuitScriptParser.RULE_double_dot_property_set_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 317;
            this.match(CircuitScriptParser.DoubleDot);
            this.state = 318;
            this.match(CircuitScriptParser.ID);
            this.state = 322;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 134217733) !== 0)) {
                {
                {
                this.state = 319;
                this.trailer();
                }
                }
                this.state = 324;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 325;
            this.match(CircuitScriptParser.Assign);
            this.state = 326;
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
        let _startState = 48;
        this.enterRecursionRule(localContext, 48, CircuitScriptParser.RULE_data_expr, _p);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 354;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 29, this.context) ) {
            case 1:
                {
                localContext = new RoundedBracketsExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;

                this.state = 329;
                this.match(CircuitScriptParser.LParen);
                this.state = 330;
                this.data_expr(0);
                this.state = 331;
                this.match(CircuitScriptParser.RParen);
                }
                break;
            case 2:
                {
                localContext = new CreateExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 333;
                this.create_expr();
                }
                break;
            case 3:
                {
                localContext = new UnaryOperatorExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 334;
                _la = this.tokenStream.LA(1);
                if(!(_la === 30 || _la === 51)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 335;
                this.data_expr(9);
                }
                break;
            case 4:
                {
                localContext = new ArrayExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 336;
                this.match(CircuitScriptParser.LSquare);
                this.state = 347;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1073743840) !== 0) || ((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 3523229697) !== 0) || ((((_la - 71)) & ~0x1F) === 0 && ((1 << (_la - 71)) & 15) !== 0)) {
                    {
                    {
                    this.state = 337;
                    this.data_expr(0);
                    this.state = 342;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 36) {
                        {
                        {
                        this.state = 338;
                        this.match(CircuitScriptParser.Comma);
                        this.state = 339;
                        this.data_expr(0);
                        }
                        }
                        this.state = 344;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    }
                    }
                    this.state = 349;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 350;
                this.match(CircuitScriptParser.RSquare);
                }
                break;
            case 5:
                {
                localContext = new ValueExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 351;
                this.value_expr();
                }
                break;
            case 6:
                {
                localContext = new CallableExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 352;
                this.callable_expr();
                }
                break;
            case 7:
                {
                localContext = new ModuleCallableExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 353;
                this.module_callable_expr();
                }
                break;
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 370;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 31, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 368;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 30, this.context) ) {
                    case 1:
                        {
                        localContext = new MultiplyExprContext(new Data_exprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CircuitScriptParser.RULE_data_expr);
                        this.state = 356;
                        if (!(this.precpred(this.context, 7))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 7)");
                        }
                        this.state = 357;
                        _la = this.tokenStream.LA(1);
                        if(!(((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 7) !== 0))) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 358;
                        this.data_expr(8);
                        }
                        break;
                    case 2:
                        {
                        localContext = new AdditionExprContext(new Data_exprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CircuitScriptParser.RULE_data_expr);
                        this.state = 359;
                        if (!(this.precpred(this.context, 6))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 6)");
                        }
                        this.state = 360;
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 50 || _la === 51)) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 361;
                        this.data_expr(7);
                        }
                        break;
                    case 3:
                        {
                        localContext = new BinaryOperatorExprContext(new Data_exprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CircuitScriptParser.RULE_data_expr);
                        this.state = 362;
                        if (!(this.precpred(this.context, 5))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 5)");
                        }
                        this.state = 363;
                        _la = this.tokenStream.LA(1);
                        if(!(((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 63) !== 0))) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 364;
                        this.data_expr(6);
                        }
                        break;
                    case 4:
                        {
                        localContext = new LogicalOperatorExprContext(new Data_exprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CircuitScriptParser.RULE_data_expr);
                        this.state = 365;
                        if (!(this.precpred(this.context, 4))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 4)");
                        }
                        this.state = 366;
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 48 || _la === 49)) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 367;
                        this.data_expr(5);
                        }
                        break;
                    }
                    }
                }
                this.state = 372;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 31, this.context);
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
    public value_expr(): Value_exprContext {
        let localContext = new Value_exprContext(this.context, this.state);
        this.enterRule(localContext, 50, CircuitScriptParser.RULE_value_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 374;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 51) {
                {
                this.state = 373;
                this.match(CircuitScriptParser.Minus);
                }
            }

            this.state = 376;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 67)) & ~0x1F) === 0 && ((1 << (_la - 67)) & 125) !== 0))) {
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
    public function_def_expr(): Function_def_exprContext {
        let localContext = new Function_def_exprContext(this.context, this.state);
        this.enterRule(localContext, 52, CircuitScriptParser.RULE_function_def_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 378;
            this.match(CircuitScriptParser.Define);
            this.state = 379;
            this.match(CircuitScriptParser.ID);
            this.state = 380;
            this.match(CircuitScriptParser.LParen);
            this.state = 382;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 74) {
                {
                this.state = 381;
                this.function_args_expr();
                }
            }

            this.state = 384;
            this.match(CircuitScriptParser.RParen);
            this.state = 385;
            this.match(CircuitScriptParser.Colon);
            this.state = 386;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 387;
            this.match(CircuitScriptParser.INDENT);
            this.state = 389;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 388;
                this.function_expr();
                }
                }
                this.state = 391;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2638207000) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 538705987) !== 0) || _la === 68 || _la === 74);
            this.state = 393;
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
        this.enterRule(localContext, 54, CircuitScriptParser.RULE_function_expr);
        try {
            this.state = 397;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.Break:
            case CircuitScriptParser.Branch:
            case CircuitScriptParser.CreateScenario:
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
            case CircuitScriptParser.Minus:
            case CircuitScriptParser.Divide:
            case CircuitScriptParser.NEWLINE:
            case CircuitScriptParser.ANNOTATION_START:
            case CircuitScriptParser.ID:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 395;
                this.expression();
                }
                break;
            case CircuitScriptParser.Return:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 396;
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
        this.enterRule(localContext, 56, CircuitScriptParser.RULE_function_args_expr);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 399;
            this.match(CircuitScriptParser.ID);
            this.state = 409;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.Comma:
            case CircuitScriptParser.RParen:
                {
                this.state = 404;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 36, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 400;
                        this.match(CircuitScriptParser.Comma);
                        this.state = 401;
                        this.match(CircuitScriptParser.ID);
                        }
                        }
                    }
                    this.state = 406;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 36, this.context);
                }
                }
                break;
            case CircuitScriptParser.Assign:
                {
                {
                this.state = 407;
                this.match(CircuitScriptParser.Assign);
                this.state = 408;
                this.value_expr();
                }
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.state = 417;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 36) {
                {
                {
                this.state = 411;
                this.match(CircuitScriptParser.Comma);
                this.state = 412;
                this.match(CircuitScriptParser.ID);
                this.state = 413;
                this.match(CircuitScriptParser.Assign);
                this.state = 414;
                this.value_expr();
                }
                }
                this.state = 419;
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
    public function_return_expr(): Function_return_exprContext {
        let localContext = new Function_return_exprContext(this.context, this.state);
        this.enterRule(localContext, 58, CircuitScriptParser.RULE_function_return_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 420;
            this.match(CircuitScriptParser.Return);
            this.state = 421;
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
    public net_namespace_expr(): Net_namespace_exprContext {
        let localContext = new Net_namespace_exprContext(this.context, this.state);
        this.enterRule(localContext, 60, CircuitScriptParser.RULE_net_namespace_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 424;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 50) {
                {
                this.state = 423;
                this.match(CircuitScriptParser.Addition);
                }
            }

            this.state = 426;
            this.match(CircuitScriptParser.Divide);
            this.state = 428;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 40, this.context) ) {
            case 1:
                {
                this.state = 427;
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
    public call_trailer(): Call_trailerContext {
        let localContext = new Call_trailerContext(this.context, this.state);
        this.enterRule(localContext, 62, CircuitScriptParser.RULE_call_trailer);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 430;
            this.match(CircuitScriptParser.LParen);
            this.state = 432;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1073743840) !== 0) || ((((_la - 38)) & ~0x1F) === 0 && ((1 << (_la - 38)) & 2751492099) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & 31) !== 0)) {
                {
                this.state = 431;
                this.parameters();
                }
            }

            this.state = 434;
            this.match(CircuitScriptParser.RParen);
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
    public non_call_trailer(): Non_call_trailerContext {
        let localContext = new Non_call_trailerContext(this.context, this.state);
        this.enterRule(localContext, 64, CircuitScriptParser.RULE_non_call_trailer);
        try {
            this.state = 442;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.Dot:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 436;
                this.match(CircuitScriptParser.Dot);
                this.state = 437;
                this.match(CircuitScriptParser.ID);
                }
                break;
            case CircuitScriptParser.LSquare:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 438;
                this.match(CircuitScriptParser.LSquare);
                this.state = 439;
                this.data_expr(0);
                this.state = 440;
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
    public callable_expr(): Callable_exprContext {
        let localContext = new Callable_exprContext(this.context, this.state);
        this.enterRule(localContext, 66, CircuitScriptParser.RULE_callable_expr);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 444;
            this.match(CircuitScriptParser.ID);
            this.state = 448;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 43, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 445;
                    this.trailer();
                    }
                    }
                }
                this.state = 450;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 43, this.context);
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
    public trailer(): TrailerContext {
        let localContext = new TrailerContext(this.context, this.state);
        this.enterRule(localContext, 68, CircuitScriptParser.RULE_trailer);
        try {
            this.state = 453;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.LParen:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 451;
                this.call_trailer();
                }
                break;
            case CircuitScriptParser.Dot:
            case CircuitScriptParser.LSquare:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 452;
                this.non_call_trailer();
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
    public module_callable_expr(): Module_callable_exprContext {
        let localContext = new Module_callable_exprContext(this.context, this.state);
        this.enterRule(localContext, 70, CircuitScriptParser.RULE_module_callable_expr);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 455;
            this.net_namespace_expr();
            this.state = 456;
            this.match(CircuitScriptParser.ID);
            this.state = 460;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 45, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 457;
                    this.trailer();
                    }
                    }
                }
                this.state = 462;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 45, this.context);
            }
            this.state = 463;
            this.call_trailer();
            this.state = 465;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 46, this.context) ) {
            case 1:
                {
                this.state = 464;
                this.annotation_comment_expr();
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
    public property_block_expr(): Property_block_exprContext {
        let localContext = new Property_block_exprContext(this.context, this.state);
        this.enterRule(localContext, 72, CircuitScriptParser.RULE_property_block_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 467;
            this.property_key_expr();
            this.state = 468;
            this.match(CircuitScriptParser.Colon);
            this.state = 469;
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
    public properties_block(): Properties_blockContext {
        let localContext = new Properties_blockContext(this.context, this.state);
        this.enterRule(localContext, 74, CircuitScriptParser.RULE_properties_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 471;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 472;
            this.match(CircuitScriptParser.INDENT);
            this.state = 475;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 475;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.INTEGER_VALUE:
                case CircuitScriptParser.STRING_VALUE:
                case CircuitScriptParser.ID:
                    {
                    this.state = 473;
                    this.property_expr();
                    }
                    break;
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 474;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 477;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 61)) & ~0x1F) === 0 && ((1 << (_la - 61)) & 12545) !== 0));
            this.state = 479;
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
        this.enterRule(localContext, 76, CircuitScriptParser.RULE_graphic_expressions_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 481;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 482;
            this.match(CircuitScriptParser.INDENT);
            this.state = 485;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 485;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 483;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case CircuitScriptParser.Pin:
                case CircuitScriptParser.For:
                case CircuitScriptParser.If:
                case CircuitScriptParser.ID:
                    {
                    this.state = 484;
                    this.graphic_expr();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 487;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 285220864) !== 0) || _la === 61 || _la === 74);
            this.state = 489;
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
        this.enterRule(localContext, 78, CircuitScriptParser.RULE_create_expr);
        let _la: number;
        try {
            this.state = 526;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.CreateComponent:
                localContext = new CreateComponentExprContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 491;
                this.match(CircuitScriptParser.CreateComponent);
                this.state = 492;
                this.match(CircuitScriptParser.Colon);
                this.state = 494;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 68) {
                    {
                    this.state = 493;
                    this.annotation_comment_expr();
                    }
                }

                this.state = 496;
                this.properties_block();
                }
                break;
            case CircuitScriptParser.CreateNetClass:
                localContext = new CreateNetClassExprContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 497;
                this.match(CircuitScriptParser.CreateNetClass);
                this.state = 498;
                this.match(CircuitScriptParser.Colon);
                this.state = 499;
                this.properties_block();
                }
                break;
            case CircuitScriptParser.CreateBus:
                localContext = new CreateBusExprContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 500;
                this.match(CircuitScriptParser.CreateBus);
                this.state = 501;
                this.match(CircuitScriptParser.Colon);
                this.state = 502;
                this.properties_block();
                }
                break;
            case CircuitScriptParser.CreateBehavior:
                localContext = new CreateBehaviorExprContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 503;
                this.match(CircuitScriptParser.CreateBehavior);
                this.state = 504;
                this.match(CircuitScriptParser.Colon);
                this.state = 505;
                this.behavior_block();
                }
                break;
            case CircuitScriptParser.CreateGraphic:
                localContext = new CreateGraphicExprContext(localContext);
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 506;
                this.match(CircuitScriptParser.CreateGraphic);
                this.state = 510;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 64) {
                    {
                    this.state = 507;
                    this.match(CircuitScriptParser.LParen);
                    this.state = 508;
                    this.match(CircuitScriptParser.ID);
                    this.state = 509;
                    this.match(CircuitScriptParser.RParen);
                    }
                }

                this.state = 512;
                this.match(CircuitScriptParser.Colon);
                this.state = 513;
                this.graphic_expressions_block();
                }
                break;
            case CircuitScriptParser.CreateModule:
                localContext = new CreateModuleExprContext(localContext);
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 514;
                this.match(CircuitScriptParser.CreateModule);
                this.state = 515;
                this.match(CircuitScriptParser.Colon);
                this.state = 516;
                this.match(CircuitScriptParser.NEWLINE);
                this.state = 517;
                this.match(CircuitScriptParser.INDENT);
                this.state = 521;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                do {
                    {
                    this.state = 521;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 53, this.context) ) {
                    case 1:
                        {
                        this.state = 518;
                        this.property_expr();
                        }
                        break;
                    case 2:
                        {
                        this.state = 519;
                        this.property_block_expr();
                        }
                        break;
                    case 3:
                        {
                        this.state = 520;
                        this.match(CircuitScriptParser.NEWLINE);
                        }
                        break;
                    }
                    }
                    this.state = 523;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                } while (((((_la - 61)) & ~0x1F) === 0 && ((1 << (_la - 61)) & 12545) !== 0));
                this.state = 525;
                this.match(CircuitScriptParser.DEDENT);
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
    public behavior_state_expr(): Behavior_state_exprContext {
        let localContext = new Behavior_state_exprContext(this.context, this.state);
        this.enterRule(localContext, 80, CircuitScriptParser.RULE_behavior_state_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 528;
            this.match(CircuitScriptParser.State);
            this.state = 530;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 529;
                this.data_expr(0);
                }
                }
                this.state = 532;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1073743840) !== 0) || ((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 3523229697) !== 0) || ((((_la - 71)) & ~0x1F) === 0 && ((1 << (_la - 71)) & 15) !== 0));
            this.state = 534;
            this.match(CircuitScriptParser.Colon);
            this.state = 535;
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
    public behavior_block_expr(): Behavior_block_exprContext {
        let localContext = new Behavior_block_exprContext(this.context, this.state);
        this.enterRule(localContext, 82, CircuitScriptParser.RULE_behavior_block_expr);
        try {
            this.state = 541;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 57, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 537;
                this.assignment_expr();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 538;
                this.flow_expressions();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 539;
                this.callable_expr();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 540;
                this.behavior_state_expr();
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
    public behavior_block(): Behavior_blockContext {
        let localContext = new Behavior_blockContext(this.context, this.state);
        this.enterRule(localContext, 84, CircuitScriptParser.RULE_behavior_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 543;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 544;
            this.match(CircuitScriptParser.INDENT);
            this.state = 547;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 547;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.Break:
                case CircuitScriptParser.For:
                case CircuitScriptParser.While:
                case CircuitScriptParser.Continue:
                case CircuitScriptParser.If:
                case CircuitScriptParser.State:
                case CircuitScriptParser.ID:
                    {
                    this.state = 545;
                    this.behavior_block_expr();
                    }
                    break;
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 546;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 549;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 3)) & ~0x1F) === 0 && ((1 << (_la - 3)) & 2208301057) !== 0) || _la === 61 || _la === 74);
            this.state = 551;
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
    public create_scenario_expr(): Create_scenario_exprContext {
        let localContext = new Create_scenario_exprContext(this.context, this.state);
        this.enterRule(localContext, 86, CircuitScriptParser.RULE_create_scenario_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 553;
            this.match(CircuitScriptParser.CreateScenario);
            this.state = 555;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1073743840) !== 0) || ((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 3523229697) !== 0) || ((((_la - 71)) & ~0x1F) === 0 && ((1 << (_la - 71)) & 15) !== 0)) {
                {
                this.state = 554;
                this.data_expr(0);
                }
            }

            this.state = 557;
            this.match(CircuitScriptParser.Colon);
            this.state = 558;
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
    public if_inner_graphic_expr(): If_inner_graphic_exprContext {
        let localContext = new If_inner_graphic_exprContext(this.context, this.state);
        this.enterRule(localContext, 88, CircuitScriptParser.RULE_if_inner_graphic_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 560;
            this.match(CircuitScriptParser.Else);
            this.state = 561;
            this.match(CircuitScriptParser.If);
            this.state = 562;
            this.data_expr(0);
            this.state = 563;
            this.match(CircuitScriptParser.Colon);
            this.state = 564;
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
    public else_graphic_expr(): Else_graphic_exprContext {
        let localContext = new Else_graphic_exprContext(this.context, this.state);
        this.enterRule(localContext, 90, CircuitScriptParser.RULE_else_graphic_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 566;
            this.match(CircuitScriptParser.Else);
            this.state = 567;
            this.match(CircuitScriptParser.Colon);
            this.state = 568;
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
    public graphics_data_expr(): Graphics_data_exprContext {
        let localContext = new Graphics_data_exprContext(this.context, this.state);
        this.enterRule(localContext, 92, CircuitScriptParser.RULE_graphics_data_expr);
        try {
            this.state = 573;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 61, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 570;
                this.assignment_expr();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 571;
                this.callable_expr();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 572;
                this.flow_expressions();
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
    public graphics_data_expressions_block(): Graphics_data_expressions_blockContext {
        let localContext = new Graphics_data_expressions_blockContext(this.context, this.state);
        this.enterRule(localContext, 94, CircuitScriptParser.RULE_graphics_data_expressions_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 575;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 576;
            this.match(CircuitScriptParser.INDENT);
            this.state = 579;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 579;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 577;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case CircuitScriptParser.Break:
                case CircuitScriptParser.For:
                case CircuitScriptParser.While:
                case CircuitScriptParser.Continue:
                case CircuitScriptParser.If:
                case CircuitScriptParser.ID:
                    {
                    this.state = 578;
                    this.graphics_data_expr();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 581;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 486539272) !== 0) || _la === 61 || _la === 74);
            this.state = 583;
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
    public graphic_expr(): Graphic_exprContext {
        let localContext = new Graphic_exprContext(this.context, this.state);
        this.enterRule(localContext, 96, CircuitScriptParser.RULE_graphic_expr);
        let _la: number;
        try {
            let alternative: number;
            this.state = 630;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 68, this.context) ) {
            case 1:
                localContext = new GraphicForExprContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 585;
                this.match(CircuitScriptParser.For);
                this.state = 586;
                this.match(CircuitScriptParser.ID);
                this.state = 591;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 36) {
                    {
                    {
                    this.state = 587;
                    this.match(CircuitScriptParser.Comma);
                    this.state = 588;
                    this.match(CircuitScriptParser.ID);
                    }
                    }
                    this.state = 593;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 594;
                this.match(CircuitScriptParser.In);
                this.state = 595;
                this.data_expr(0);
                this.state = 596;
                this.match(CircuitScriptParser.Colon);
                this.state = 597;
                this.graphic_expressions_block();
                }
                break;
            case 2:
                localContext = new GraphicIfExprContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 599;
                this.match(CircuitScriptParser.If);
                this.state = 600;
                this.data_expr(0);
                this.state = 601;
                this.match(CircuitScriptParser.Colon);
                this.state = 602;
                this.graphic_expressions_block();
                this.state = 606;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 65, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 603;
                        this.if_inner_graphic_expr();
                        }
                        }
                    }
                    this.state = 608;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 65, this.context);
                }
                this.state = 610;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 29) {
                    {
                    this.state = 609;
                    this.else_graphic_expr();
                    }
                }

                }
                break;
            case 3:
                localContext = new GraphicPreExprContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 612;
                this.match(CircuitScriptParser.ID);
                this.state = 613;
                this.match(CircuitScriptParser.Colon);
                this.state = 614;
                this.graphics_data_expressions_block();
                }
                break;
            case 4:
                localContext = new GraphicTableExprContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 615;
                this.match(CircuitScriptParser.ID);
                this.state = 616;
                this.match(CircuitScriptParser.Colon);
                this.state = 617;
                this.parameters();
                this.state = 618;
                this.graphic_expressions_block();
                }
                break;
            case 5:
                localContext = new GraphicCommandExprContext(localContext);
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 620;
                (localContext as GraphicCommandExprContext)._command = this.tokenStream.LT(1);
                _la = this.tokenStream.LA(1);
                if(!(_la === 13 || _la === 74)) {
                    (localContext as GraphicCommandExprContext)._command = this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 621;
                this.match(CircuitScriptParser.Colon);
                this.state = 628;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 67, this.context) ) {
                case 1:
                    {
                    this.state = 622;
                    this.parameters();
                    }
                    break;
                case 2:
                    {
                    this.state = 623;
                    this.match(CircuitScriptParser.LParen);
                    this.state = 624;
                    this.parameters();
                    this.state = 625;
                    this.match(CircuitScriptParser.RParen);
                    }
                    break;
                case 3:
                    {
                    this.state = 627;
                    this.properties_block();
                    }
                    break;
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
    public property_expr(): Property_exprContext {
        let localContext = new Property_exprContext(this.context, this.state);
        this.enterRule(localContext, 98, CircuitScriptParser.RULE_property_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 632;
            this.property_key_expr();
            this.state = 637;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 36) {
                {
                {
                this.state = 633;
                this.match(CircuitScriptParser.Comma);
                this.state = 634;
                this.property_key_expr();
                }
                }
                this.state = 639;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 640;
            this.match(CircuitScriptParser.Colon);
            this.state = 641;
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
        this.enterRule(localContext, 100, CircuitScriptParser.RULE_property_key_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 643;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & 49) !== 0))) {
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
        this.enterRule(localContext, 102, CircuitScriptParser.RULE_property_value_expr);
        let _la: number;
        try {
            this.state = 665;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 72, this.context) ) {
            case 1:
                localContext = new Nested_propertiesContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 645;
                this.properties_block();
                }
                break;
            case 2:
                localContext = new Single_line_propertyContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 646;
                this.data_expr(0);
                this.state = 651;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 36) {
                    {
                    {
                    this.state = 647;
                    this.match(CircuitScriptParser.Comma);
                    this.state = 648;
                    this.data_expr(0);
                    }
                    }
                    this.state = 653;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                break;
            case 3:
                localContext = new WithBracketsPropertyContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 654;
                this.match(CircuitScriptParser.LParen);
                this.state = 655;
                this.data_expr(0);
                this.state = 660;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 36) {
                    {
                    {
                    this.state = 656;
                    this.match(CircuitScriptParser.Comma);
                    this.state = 657;
                    this.data_expr(0);
                    }
                    }
                    this.state = 662;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 663;
                this.match(CircuitScriptParser.RParen);
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
        this.enterRule(localContext, 104, CircuitScriptParser.RULE_wire_expr);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 670;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.Wire:
                {
                this.state = 667;
                this.match(CircuitScriptParser.Wire);
                }
                break;
            case CircuitScriptParser.Minus:
                {
                this.state = 668;
                this.match(CircuitScriptParser.Minus);
                this.state = 669;
                this.match(CircuitScriptParser.Minus);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.state = 676;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 672;
                    this.match(CircuitScriptParser.ID);
                    this.state = 674;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 74, this.context) ) {
                    case 1:
                        {
                        this.state = 673;
                        this.data_expr(0);
                        }
                        break;
                    }
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 678;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 75, this.context);
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
    public point_expr(): Point_exprContext {
        let localContext = new Point_exprContext(this.context, this.state);
        this.enterRule(localContext, 106, CircuitScriptParser.RULE_point_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 680;
            this.match(CircuitScriptParser.Point);
            this.state = 681;
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
    public import_expr(): Import_exprContext {
        let localContext = new Import_exprContext(this.context, this.state);
        this.enterRule(localContext, 108, CircuitScriptParser.RULE_import_expr);
        let _la: number;
        try {
            this.state = 705;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.Import:
                localContext = new Import_simpleContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 683;
                this.match(CircuitScriptParser.Import);
                this.state = 684;
                (localContext as Import_simpleContext)._libraryName = this.match(CircuitScriptParser.STRING_VALUE);
                this.state = 686;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 76, this.context) ) {
                case 1:
                    {
                    this.state = 685;
                    this.annotation_comment_expr();
                    }
                    break;
                }
                }
                break;
            case CircuitScriptParser.From:
                localContext = new Import_specific_or_allContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 688;
                this.match(CircuitScriptParser.From);
                this.state = 689;
                (localContext as Import_specific_or_allContext)._libraryName = this.match(CircuitScriptParser.STRING_VALUE);
                this.state = 690;
                this.match(CircuitScriptParser.Import);
                this.state = 700;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.Multiply:
                    {
                    this.state = 691;
                    (localContext as Import_specific_or_allContext)._all = this.match(CircuitScriptParser.Multiply);
                    }
                    break;
                case CircuitScriptParser.ID:
                    {
                    {
                    this.state = 692;
                    (localContext as Import_specific_or_allContext)._ID = this.match(CircuitScriptParser.ID);
                    (localContext as Import_specific_or_allContext)._funcNames.push((localContext as Import_specific_or_allContext)._ID!);
                    this.state = 697;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 36) {
                        {
                        {
                        this.state = 693;
                        this.match(CircuitScriptParser.Comma);
                        this.state = 694;
                        (localContext as Import_specific_or_allContext)._ID = this.match(CircuitScriptParser.ID);
                        (localContext as Import_specific_or_allContext)._funcNames.push((localContext as Import_specific_or_allContext)._ID!);
                        }
                        }
                        this.state = 699;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 703;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 79, this.context) ) {
                case 1:
                    {
                    this.state = 702;
                    this.annotation_comment_expr();
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
    public frame_expr(): Frame_exprContext {
        let localContext = new Frame_exprContext(this.context, this.state);
        this.enterRule(localContext, 110, CircuitScriptParser.RULE_frame_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 707;
            _la = this.tokenStream.LA(1);
            if(!(_la === 31 || _la === 32)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 709;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 81, this.context) ) {
            case 1:
                {
                this.state = 708;
                localContext._title = this.data_expr(0);
                }
                break;
            }
            this.state = 714;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 74) {
                {
                {
                this.state = 711;
                localContext._ID = this.match(CircuitScriptParser.ID);
                localContext._modifiers.push(localContext._ID!);
                }
                }
                this.state = 716;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 717;
            this.match(CircuitScriptParser.Colon);
            this.state = 719;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 83, this.context) ) {
            case 1:
                {
                this.state = 718;
                this.expressions_block();
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
    public if_expr(): If_exprContext {
        let localContext = new If_exprContext(this.context, this.state);
        this.enterRule(localContext, 112, CircuitScriptParser.RULE_if_expr);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 721;
            this.match(CircuitScriptParser.If);
            this.state = 722;
            this.data_expr(0);
            this.state = 723;
            this.match(CircuitScriptParser.Colon);
            this.state = 724;
            this.expressions_block();
            this.state = 728;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 84, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 725;
                    this.if_inner_expr();
                    }
                    }
                }
                this.state = 730;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 84, this.context);
            }
            this.state = 732;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 29) {
                {
                this.state = 731;
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
        this.enterRule(localContext, 114, CircuitScriptParser.RULE_if_inner_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 734;
            this.match(CircuitScriptParser.Else);
            this.state = 735;
            this.match(CircuitScriptParser.If);
            this.state = 736;
            this.data_expr(0);
            this.state = 737;
            this.match(CircuitScriptParser.Colon);
            this.state = 738;
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
        this.enterRule(localContext, 116, CircuitScriptParser.RULE_else_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 740;
            this.match(CircuitScriptParser.Else);
            this.state = 741;
            this.match(CircuitScriptParser.Colon);
            this.state = 742;
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
        this.enterRule(localContext, 118, CircuitScriptParser.RULE_while_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 744;
            this.match(CircuitScriptParser.While);
            this.state = 745;
            this.data_expr(0);
            this.state = 746;
            this.match(CircuitScriptParser.Colon);
            this.state = 747;
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
        this.enterRule(localContext, 120, CircuitScriptParser.RULE_for_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 749;
            this.match(CircuitScriptParser.For);
            this.state = 750;
            this.match(CircuitScriptParser.ID);
            this.state = 755;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 36) {
                {
                {
                this.state = 751;
                this.match(CircuitScriptParser.Comma);
                this.state = 752;
                this.match(CircuitScriptParser.ID);
                }
                }
                this.state = 757;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 758;
            this.match(CircuitScriptParser.In);
            this.state = 759;
            this.data_expr(0);
            this.state = 760;
            this.match(CircuitScriptParser.Colon);
            this.state = 761;
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
        this.enterRule(localContext, 122, CircuitScriptParser.RULE_part_set_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 763;
            this.match(CircuitScriptParser.Set);
            this.state = 764;
            this.match(CircuitScriptParser.Colon);
            this.state = 765;
            this.data_expr(0);
            this.state = 770;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 36) {
                {
                {
                this.state = 766;
                this.match(CircuitScriptParser.Comma);
                this.state = 767;
                this.data_expr(0);
                }
                }
                this.state = 772;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 773;
            this.match(CircuitScriptParser.Colon);
            this.state = 774;
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
        this.enterRule(localContext, 124, CircuitScriptParser.RULE_part_set_key);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 776;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & 61) !== 0))) {
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
        this.enterRule(localContext, 126, CircuitScriptParser.RULE_part_match_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 778;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 779;
            this.match(CircuitScriptParser.INDENT);
            this.state = 781;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 780;
                this.part_sub_expr();
                }
                }
                this.state = 783;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 61)) & ~0x1F) === 0 && ((1 << (_la - 61)) & 15617) !== 0));
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
        this.enterRule(localContext, 128, CircuitScriptParser.RULE_part_sub_expr);
        try {
            this.state = 790;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 89, this.context) ) {
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
        this.enterRule(localContext, 130, CircuitScriptParser.RULE_part_condition_expr);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 792;
            localContext._part_set_key = this.part_set_key();
            localContext._key_id.push(localContext._part_set_key!);
            this.state = 793;
            this.match(CircuitScriptParser.Colon);
            this.state = 794;
            localContext._data_expr = this.data_expr(0);
            localContext._values.push(localContext._data_expr!);
            this.state = 802;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 90, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 795;
                    this.match(CircuitScriptParser.Comma);
                    this.state = 796;
                    localContext._part_set_key = this.part_set_key();
                    localContext._key_id.push(localContext._part_set_key!);
                    this.state = 797;
                    this.match(CircuitScriptParser.Colon);
                    this.state = 798;
                    localContext._data_expr = this.data_expr(0);
                    localContext._values.push(localContext._data_expr!);
                    }
                    }
                }
                this.state = 804;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 90, this.context);
            }
            this.state = 809;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 36) {
                {
                {
                this.state = 805;
                this.match(CircuitScriptParser.Comma);
                this.state = 806;
                localContext._id_only = this.part_set_key();
                }
                }
                this.state = 811;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 812;
            this.match(CircuitScriptParser.Colon);
            this.state = 822;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.NEWLINE:
                {
                this.state = 813;
                this.part_match_block();
                }
                break;
            case CircuitScriptParser.CreateComponent:
            case CircuitScriptParser.CreateGraphic:
            case CircuitScriptParser.CreateModule:
            case CircuitScriptParser.CreateNetClass:
            case CircuitScriptParser.CreateBus:
            case CircuitScriptParser.CreateBehavior:
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
                this.state = 814;
                localContext._data_expr = this.data_expr(0);
                localContext._last_data.push(localContext._data_expr!);
                this.state = 819;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 36) {
                    {
                    {
                    this.state = 815;
                    this.match(CircuitScriptParser.Comma);
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
    public part_value_expr(): Part_value_exprContext {
        let localContext = new Part_value_exprContext(this.context, this.state);
        this.enterRule(localContext, 132, CircuitScriptParser.RULE_part_value_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 824;
            this.part_set_key();
            this.state = 825;
            this.match(CircuitScriptParser.Colon);
            this.state = 835;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.NEWLINE:
                {
                this.state = 826;
                this.part_match_block();
                }
                break;
            case CircuitScriptParser.CreateComponent:
            case CircuitScriptParser.CreateGraphic:
            case CircuitScriptParser.CreateModule:
            case CircuitScriptParser.CreateNetClass:
            case CircuitScriptParser.CreateBus:
            case CircuitScriptParser.CreateBehavior:
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
                this.state = 827;
                this.data_expr(0);
                this.state = 832;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 36) {
                    {
                    {
                    this.state = 828;
                    this.match(CircuitScriptParser.Comma);
                    this.state = 829;
                    this.data_expr(0);
                    }
                    }
                    this.state = 834;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
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
    public annotation_comment_expr(): Annotation_comment_exprContext {
        let localContext = new Annotation_comment_exprContext(this.context, this.state);
        this.enterRule(localContext, 134, CircuitScriptParser.RULE_annotation_comment_expr);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 837;
            this.match(CircuitScriptParser.ANNOTATION_START);
            this.state = 841;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 96, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 838;
                    _la = this.tokenStream.LA(1);
                    if(!(_la === 51 || _la === 74)) {
                    this.errorHandler.recoverInline(this);
                    }
                    else {
                        this.errorHandler.reportMatch(this);
                        this.consume();
                    }
                    }
                    }
                }
                this.state = 843;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 96, this.context);
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

    public override sempred(localContext: antlr.ParserRuleContext | null, ruleIndex: number, predIndex: number): boolean {
        switch (ruleIndex) {
        case 24:
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
        4,1,74,845,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,
        7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,
        2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,33,
        7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,39,
        2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,46,
        7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,52,
        2,53,7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,59,
        7,59,2,60,7,60,2,61,7,61,2,62,7,62,2,63,7,63,2,64,7,64,2,65,7,65,
        2,66,7,66,2,67,7,67,1,0,1,0,5,0,139,8,0,10,0,12,0,142,9,0,1,0,5,
        0,145,8,0,10,0,12,0,148,9,0,1,0,1,0,1,1,1,1,3,1,154,8,1,1,2,1,2,
        1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,3,2,167,8,2,1,3,1,3,1,3,1,3,
        1,3,3,3,174,8,3,1,4,1,4,1,4,1,4,1,4,1,4,1,4,3,4,183,8,4,1,5,1,5,
        1,5,4,5,188,8,5,11,5,12,5,189,1,5,1,5,1,6,1,6,1,6,4,6,197,8,6,11,
        6,12,6,198,1,6,1,6,3,6,203,8,6,1,7,1,7,1,7,1,8,1,8,1,8,1,8,1,9,1,
        9,3,9,214,8,9,1,9,5,9,217,8,9,10,9,12,9,220,9,9,1,9,3,9,223,8,9,
        1,10,1,10,1,10,1,10,1,11,1,11,1,11,1,12,1,12,1,12,3,12,235,8,12,
        1,13,1,13,3,13,239,8,13,1,14,1,14,1,14,1,14,5,14,245,8,14,10,14,
        12,14,248,9,14,1,15,1,15,1,15,5,15,253,8,15,10,15,12,15,256,9,15,
        1,16,1,16,1,16,1,17,1,17,1,17,4,17,264,8,17,11,17,12,17,265,1,17,
        1,17,1,18,1,18,3,18,272,8,18,1,19,1,19,1,19,5,19,277,8,19,10,19,
        12,19,280,9,19,1,19,1,19,4,19,284,8,19,11,19,12,19,285,1,19,1,19,
        3,19,290,8,19,1,20,1,20,3,20,294,8,20,1,21,1,21,1,21,1,21,1,22,1,
        22,1,22,5,22,303,8,22,10,22,12,22,306,9,22,1,22,3,22,309,8,22,1,
        22,1,22,5,22,313,8,22,10,22,12,22,316,9,22,1,23,1,23,1,23,5,23,321,
        8,23,10,23,12,23,324,9,23,1,23,1,23,1,23,1,24,1,24,1,24,1,24,1,24,
        1,24,1,24,1,24,1,24,1,24,1,24,1,24,5,24,341,8,24,10,24,12,24,344,
        9,24,5,24,346,8,24,10,24,12,24,349,9,24,1,24,1,24,1,24,1,24,3,24,
        355,8,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,
        1,24,5,24,369,8,24,10,24,12,24,372,9,24,1,25,3,25,375,8,25,1,25,
        1,25,1,26,1,26,1,26,1,26,3,26,383,8,26,1,26,1,26,1,26,1,26,1,26,
        4,26,390,8,26,11,26,12,26,391,1,26,1,26,1,27,1,27,3,27,398,8,27,
        1,28,1,28,1,28,5,28,403,8,28,10,28,12,28,406,9,28,1,28,1,28,3,28,
        410,8,28,1,28,1,28,1,28,1,28,5,28,416,8,28,10,28,12,28,419,9,28,
        1,29,1,29,1,29,1,30,3,30,425,8,30,1,30,1,30,3,30,429,8,30,1,31,1,
        31,3,31,433,8,31,1,31,1,31,1,32,1,32,1,32,1,32,1,32,1,32,3,32,443,
        8,32,1,33,1,33,5,33,447,8,33,10,33,12,33,450,9,33,1,34,1,34,3,34,
        454,8,34,1,35,1,35,1,35,5,35,459,8,35,10,35,12,35,462,9,35,1,35,
        1,35,3,35,466,8,35,1,36,1,36,1,36,1,36,1,37,1,37,1,37,1,37,4,37,
        476,8,37,11,37,12,37,477,1,37,1,37,1,38,1,38,1,38,1,38,4,38,486,
        8,38,11,38,12,38,487,1,38,1,38,1,39,1,39,1,39,3,39,495,8,39,1,39,
        1,39,1,39,1,39,1,39,1,39,1,39,1,39,1,39,1,39,1,39,1,39,1,39,1,39,
        3,39,511,8,39,1,39,1,39,1,39,1,39,1,39,1,39,1,39,1,39,1,39,4,39,
        522,8,39,11,39,12,39,523,1,39,3,39,527,8,39,1,40,1,40,4,40,531,8,
        40,11,40,12,40,532,1,40,1,40,1,40,1,41,1,41,1,41,1,41,3,41,542,8,
        41,1,42,1,42,1,42,1,42,4,42,548,8,42,11,42,12,42,549,1,42,1,42,1,
        43,1,43,3,43,556,8,43,1,43,1,43,1,43,1,44,1,44,1,44,1,44,1,44,1,
        44,1,45,1,45,1,45,1,45,1,46,1,46,1,46,3,46,574,8,46,1,47,1,47,1,
        47,1,47,4,47,580,8,47,11,47,12,47,581,1,47,1,47,1,48,1,48,1,48,1,
        48,5,48,590,8,48,10,48,12,48,593,9,48,1,48,1,48,1,48,1,48,1,48,1,
        48,1,48,1,48,1,48,1,48,5,48,605,8,48,10,48,12,48,608,9,48,1,48,3,
        48,611,8,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,
        48,1,48,1,48,1,48,1,48,1,48,3,48,629,8,48,3,48,631,8,48,1,49,1,49,
        1,49,5,49,636,8,49,10,49,12,49,639,9,49,1,49,1,49,1,49,1,50,1,50,
        1,51,1,51,1,51,1,51,5,51,650,8,51,10,51,12,51,653,9,51,1,51,1,51,
        1,51,1,51,5,51,659,8,51,10,51,12,51,662,9,51,1,51,1,51,3,51,666,
        8,51,1,52,1,52,1,52,3,52,671,8,52,1,52,1,52,3,52,675,8,52,4,52,677,
        8,52,11,52,12,52,678,1,53,1,53,1,53,1,54,1,54,1,54,3,54,687,8,54,
        1,54,1,54,1,54,1,54,1,54,1,54,1,54,5,54,696,8,54,10,54,12,54,699,
        9,54,3,54,701,8,54,1,54,3,54,704,8,54,3,54,706,8,54,1,55,1,55,3,
        55,710,8,55,1,55,5,55,713,8,55,10,55,12,55,716,9,55,1,55,1,55,3,
        55,720,8,55,1,56,1,56,1,56,1,56,1,56,5,56,727,8,56,10,56,12,56,730,
        9,56,1,56,3,56,733,8,56,1,57,1,57,1,57,1,57,1,57,1,57,1,58,1,58,
        1,58,1,58,1,59,1,59,1,59,1,59,1,59,1,60,1,60,1,60,1,60,5,60,754,
        8,60,10,60,12,60,757,9,60,1,60,1,60,1,60,1,60,1,60,1,61,1,61,1,61,
        1,61,1,61,5,61,769,8,61,10,61,12,61,772,9,61,1,61,1,61,1,61,1,62,
        1,62,1,63,1,63,1,63,4,63,782,8,63,11,63,12,63,783,1,63,1,63,1,64,
        1,64,1,64,3,64,791,8,64,1,65,1,65,1,65,1,65,1,65,1,65,1,65,1,65,
        5,65,801,8,65,10,65,12,65,804,9,65,1,65,1,65,5,65,808,8,65,10,65,
        12,65,811,9,65,1,65,1,65,1,65,1,65,1,65,5,65,818,8,65,10,65,12,65,
        821,9,65,3,65,823,8,65,1,66,1,66,1,66,1,66,1,66,1,66,5,66,831,8,
        66,10,66,12,66,834,9,66,3,66,836,8,66,1,67,1,67,5,67,840,8,67,10,
        67,12,67,843,9,67,1,67,0,1,48,68,0,2,4,6,8,10,12,14,16,18,20,22,
        24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,
        68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,102,104,106,
        108,110,112,114,116,118,120,122,124,126,128,130,132,134,0,13,2,0,
        4,4,17,19,2,0,41,41,55,59,2,0,30,30,51,51,1,0,52,54,1,0,50,51,1,
        0,42,47,1,0,48,49,2,0,67,67,69,73,2,0,13,13,74,74,2,0,69,69,73,74,
        1,0,31,32,2,0,69,69,71,74,2,0,51,51,74,74,914,0,140,1,0,0,0,2,153,
        1,0,0,0,4,166,1,0,0,0,6,173,1,0,0,0,8,182,1,0,0,0,10,184,1,0,0,0,
        12,193,1,0,0,0,14,204,1,0,0,0,16,207,1,0,0,0,18,213,1,0,0,0,20,224,
        1,0,0,0,22,228,1,0,0,0,24,234,1,0,0,0,26,236,1,0,0,0,28,240,1,0,
        0,0,30,249,1,0,0,0,32,257,1,0,0,0,34,260,1,0,0,0,36,271,1,0,0,0,
        38,273,1,0,0,0,40,293,1,0,0,0,42,295,1,0,0,0,44,308,1,0,0,0,46,317,
        1,0,0,0,48,354,1,0,0,0,50,374,1,0,0,0,52,378,1,0,0,0,54,397,1,0,
        0,0,56,399,1,0,0,0,58,420,1,0,0,0,60,424,1,0,0,0,62,430,1,0,0,0,
        64,442,1,0,0,0,66,444,1,0,0,0,68,453,1,0,0,0,70,455,1,0,0,0,72,467,
        1,0,0,0,74,471,1,0,0,0,76,481,1,0,0,0,78,526,1,0,0,0,80,528,1,0,
        0,0,82,541,1,0,0,0,84,543,1,0,0,0,86,553,1,0,0,0,88,560,1,0,0,0,
        90,566,1,0,0,0,92,573,1,0,0,0,94,575,1,0,0,0,96,630,1,0,0,0,98,632,
        1,0,0,0,100,643,1,0,0,0,102,665,1,0,0,0,104,670,1,0,0,0,106,680,
        1,0,0,0,108,705,1,0,0,0,110,707,1,0,0,0,112,721,1,0,0,0,114,734,
        1,0,0,0,116,740,1,0,0,0,118,744,1,0,0,0,120,749,1,0,0,0,122,763,
        1,0,0,0,124,776,1,0,0,0,126,778,1,0,0,0,128,790,1,0,0,0,130,792,
        1,0,0,0,132,824,1,0,0,0,134,837,1,0,0,0,136,139,3,108,54,0,137,139,
        5,61,0,0,138,136,1,0,0,0,138,137,1,0,0,0,139,142,1,0,0,0,140,138,
        1,0,0,0,140,141,1,0,0,0,141,146,1,0,0,0,142,140,1,0,0,0,143,145,
        3,2,1,0,144,143,1,0,0,0,145,148,1,0,0,0,146,144,1,0,0,0,146,147,
        1,0,0,0,147,149,1,0,0,0,148,146,1,0,0,0,149,150,5,0,0,1,150,1,1,
        0,0,0,151,154,3,4,2,0,152,154,5,61,0,0,153,151,1,0,0,0,153,152,1,
        0,0,0,154,3,1,0,0,0,155,167,3,6,3,0,156,167,3,8,4,0,157,167,3,52,
        26,0,158,167,3,110,55,0,159,167,3,122,61,0,160,167,3,134,67,0,161,
        167,3,46,23,0,162,167,3,20,10,0,163,167,3,70,35,0,164,167,3,66,33,
        0,165,167,3,86,43,0,166,155,1,0,0,0,166,156,1,0,0,0,166,157,1,0,
        0,0,166,158,1,0,0,0,166,159,1,0,0,0,166,160,1,0,0,0,166,161,1,0,
        0,0,166,162,1,0,0,0,166,163,1,0,0,0,166,164,1,0,0,0,166,165,1,0,
        0,0,167,5,1,0,0,0,168,174,3,112,56,0,169,174,3,118,59,0,170,174,
        3,120,60,0,171,174,5,3,0,0,172,174,5,27,0,0,173,168,1,0,0,0,173,
        169,1,0,0,0,173,170,1,0,0,0,173,171,1,0,0,0,173,172,1,0,0,0,174,
        7,1,0,0,0,175,183,3,22,11,0,176,183,3,26,13,0,177,183,3,32,16,0,
        178,183,3,28,14,0,179,183,3,104,52,0,180,183,3,106,53,0,181,183,
        3,12,6,0,182,175,1,0,0,0,182,176,1,0,0,0,182,177,1,0,0,0,182,178,
        1,0,0,0,182,179,1,0,0,0,182,180,1,0,0,0,182,181,1,0,0,0,183,9,1,
        0,0,0,184,185,5,61,0,0,185,187,5,1,0,0,186,188,3,2,1,0,187,186,1,
        0,0,0,188,189,1,0,0,0,189,187,1,0,0,0,189,190,1,0,0,0,190,191,1,
        0,0,0,191,192,5,2,0,0,192,11,1,0,0,0,193,194,7,0,0,0,194,202,5,35,
        0,0,195,197,3,4,2,0,196,195,1,0,0,0,197,198,1,0,0,0,198,196,1,0,
        0,0,198,199,1,0,0,0,199,203,1,0,0,0,200,203,3,10,5,0,201,203,3,34,
        17,0,202,196,1,0,0,0,202,200,1,0,0,0,202,201,1,0,0,0,203,13,1,0,
        0,0,204,205,5,13,0,0,205,206,3,48,24,0,206,15,1,0,0,0,207,208,5,
        74,0,0,208,209,5,35,0,0,209,210,3,48,24,0,210,17,1,0,0,0,211,214,
        3,48,24,0,212,214,3,20,10,0,213,211,1,0,0,0,213,212,1,0,0,0,214,
        218,1,0,0,0,215,217,3,16,8,0,216,215,1,0,0,0,217,220,1,0,0,0,218,
        216,1,0,0,0,218,219,1,0,0,0,219,222,1,0,0,0,220,218,1,0,0,0,221,
        223,3,14,7,0,222,221,1,0,0,0,222,223,1,0,0,0,223,19,1,0,0,0,224,
        225,3,66,33,0,225,226,7,1,0,0,226,227,3,48,24,0,227,21,1,0,0,0,228,
        229,5,14,0,0,229,230,3,18,9,0,230,23,1,0,0,0,231,235,3,18,9,0,232,
        235,3,14,7,0,233,235,5,17,0,0,234,231,1,0,0,0,234,232,1,0,0,0,234,
        233,1,0,0,0,235,25,1,0,0,0,236,238,5,15,0,0,237,239,3,24,12,0,238,
        237,1,0,0,0,238,239,1,0,0,0,239,27,1,0,0,0,240,241,5,16,0,0,241,
        246,3,24,12,0,242,243,5,36,0,0,243,245,3,24,12,0,244,242,1,0,0,0,
        245,248,1,0,0,0,246,244,1,0,0,0,246,247,1,0,0,0,247,29,1,0,0,0,248,
        246,1,0,0,0,249,250,3,26,13,0,250,254,5,35,0,0,251,253,3,134,67,
        0,252,251,1,0,0,0,253,256,1,0,0,0,254,252,1,0,0,0,254,255,1,0,0,
        0,255,31,1,0,0,0,256,254,1,0,0,0,257,258,3,30,15,0,258,259,3,34,
        17,0,259,33,1,0,0,0,260,261,5,61,0,0,261,263,5,1,0,0,262,264,3,36,
        18,0,263,262,1,0,0,0,264,265,1,0,0,0,265,263,1,0,0,0,265,266,1,0,
        0,0,266,267,1,0,0,0,267,268,5,2,0,0,268,35,1,0,0,0,269,272,3,38,
        19,0,270,272,3,2,1,0,271,269,1,0,0,0,271,270,1,0,0,0,272,37,1,0,
        0,0,273,278,3,100,50,0,274,275,5,36,0,0,275,277,3,100,50,0,276,274,
        1,0,0,0,277,280,1,0,0,0,278,276,1,0,0,0,278,279,1,0,0,0,279,281,
        1,0,0,0,280,278,1,0,0,0,281,289,5,35,0,0,282,284,3,4,2,0,283,282,
        1,0,0,0,284,285,1,0,0,0,285,283,1,0,0,0,285,286,1,0,0,0,286,290,
        1,0,0,0,287,290,3,10,5,0,288,290,5,66,0,0,289,283,1,0,0,0,289,287,
        1,0,0,0,289,288,1,0,0,0,290,39,1,0,0,0,291,294,3,48,24,0,292,294,
        5,38,0,0,293,291,1,0,0,0,293,292,1,0,0,0,294,41,1,0,0,0,295,296,
        5,74,0,0,296,297,5,41,0,0,297,298,3,40,20,0,298,43,1,0,0,0,299,304,
        3,40,20,0,300,301,5,36,0,0,301,303,3,40,20,0,302,300,1,0,0,0,303,
        306,1,0,0,0,304,302,1,0,0,0,304,305,1,0,0,0,305,309,1,0,0,0,306,
        304,1,0,0,0,307,309,3,42,21,0,308,299,1,0,0,0,308,307,1,0,0,0,309,
        314,1,0,0,0,310,311,5,36,0,0,311,313,3,42,21,0,312,310,1,0,0,0,313,
        316,1,0,0,0,314,312,1,0,0,0,314,315,1,0,0,0,315,45,1,0,0,0,316,314,
        1,0,0,0,317,318,5,38,0,0,318,322,5,74,0,0,319,321,3,68,34,0,320,
        319,1,0,0,0,321,324,1,0,0,0,322,320,1,0,0,0,322,323,1,0,0,0,323,
        325,1,0,0,0,324,322,1,0,0,0,325,326,5,41,0,0,326,327,3,48,24,0,327,
        47,1,0,0,0,328,329,6,24,-1,0,329,330,5,64,0,0,330,331,3,48,24,0,
        331,332,5,65,0,0,332,355,1,0,0,0,333,355,3,78,39,0,334,335,7,2,0,
        0,335,355,3,48,24,9,336,347,5,39,0,0,337,342,3,48,24,0,338,339,5,
        36,0,0,339,341,3,48,24,0,340,338,1,0,0,0,341,344,1,0,0,0,342,340,
        1,0,0,0,342,343,1,0,0,0,343,346,1,0,0,0,344,342,1,0,0,0,345,337,
        1,0,0,0,346,349,1,0,0,0,347,345,1,0,0,0,347,348,1,0,0,0,348,350,
        1,0,0,0,349,347,1,0,0,0,350,355,5,40,0,0,351,355,3,50,25,0,352,355,
        3,66,33,0,353,355,3,70,35,0,354,328,1,0,0,0,354,333,1,0,0,0,354,
        334,1,0,0,0,354,336,1,0,0,0,354,351,1,0,0,0,354,352,1,0,0,0,354,
        353,1,0,0,0,355,370,1,0,0,0,356,357,10,7,0,0,357,358,7,3,0,0,358,
        369,3,48,24,8,359,360,10,6,0,0,360,361,7,4,0,0,361,369,3,48,24,7,
        362,363,10,5,0,0,363,364,7,5,0,0,364,369,3,48,24,6,365,366,10,4,
        0,0,366,367,7,6,0,0,367,369,3,48,24,5,368,356,1,0,0,0,368,359,1,
        0,0,0,368,362,1,0,0,0,368,365,1,0,0,0,369,372,1,0,0,0,370,368,1,
        0,0,0,370,371,1,0,0,0,371,49,1,0,0,0,372,370,1,0,0,0,373,375,5,51,
        0,0,374,373,1,0,0,0,374,375,1,0,0,0,375,376,1,0,0,0,376,377,7,7,
        0,0,377,51,1,0,0,0,378,379,5,21,0,0,379,380,5,74,0,0,380,382,5,64,
        0,0,381,383,3,56,28,0,382,381,1,0,0,0,382,383,1,0,0,0,383,384,1,
        0,0,0,384,385,5,65,0,0,385,386,5,35,0,0,386,387,5,61,0,0,387,389,
        5,1,0,0,388,390,3,54,27,0,389,388,1,0,0,0,390,391,1,0,0,0,391,389,
        1,0,0,0,391,392,1,0,0,0,392,393,1,0,0,0,393,394,5,2,0,0,394,53,1,
        0,0,0,395,398,3,2,1,0,396,398,3,58,29,0,397,395,1,0,0,0,397,396,
        1,0,0,0,398,55,1,0,0,0,399,409,5,74,0,0,400,401,5,36,0,0,401,403,
        5,74,0,0,402,400,1,0,0,0,403,406,1,0,0,0,404,402,1,0,0,0,404,405,
        1,0,0,0,405,410,1,0,0,0,406,404,1,0,0,0,407,408,5,41,0,0,408,410,
        3,50,25,0,409,404,1,0,0,0,409,407,1,0,0,0,410,417,1,0,0,0,411,412,
        5,36,0,0,412,413,5,74,0,0,413,414,5,41,0,0,414,416,3,50,25,0,415,
        411,1,0,0,0,416,419,1,0,0,0,417,415,1,0,0,0,417,418,1,0,0,0,418,
        57,1,0,0,0,419,417,1,0,0,0,420,421,5,20,0,0,421,422,3,48,24,0,422,
        59,1,0,0,0,423,425,5,50,0,0,424,423,1,0,0,0,424,425,1,0,0,0,425,
        426,1,0,0,0,426,428,5,52,0,0,427,429,3,48,24,0,428,427,1,0,0,0,428,
        429,1,0,0,0,429,61,1,0,0,0,430,432,5,64,0,0,431,433,3,44,22,0,432,
        431,1,0,0,0,432,433,1,0,0,0,433,434,1,0,0,0,434,435,5,65,0,0,435,
        63,1,0,0,0,436,437,5,37,0,0,437,443,5,74,0,0,438,439,5,39,0,0,439,
        440,3,48,24,0,440,441,5,40,0,0,441,443,1,0,0,0,442,436,1,0,0,0,442,
        438,1,0,0,0,443,65,1,0,0,0,444,448,5,74,0,0,445,447,3,68,34,0,446,
        445,1,0,0,0,447,450,1,0,0,0,448,446,1,0,0,0,448,449,1,0,0,0,449,
        67,1,0,0,0,450,448,1,0,0,0,451,454,3,62,31,0,452,454,3,64,32,0,453,
        451,1,0,0,0,453,452,1,0,0,0,454,69,1,0,0,0,455,456,3,60,30,0,456,
        460,5,74,0,0,457,459,3,68,34,0,458,457,1,0,0,0,459,462,1,0,0,0,460,
        458,1,0,0,0,460,461,1,0,0,0,461,463,1,0,0,0,462,460,1,0,0,0,463,
        465,3,62,31,0,464,466,3,134,67,0,465,464,1,0,0,0,465,466,1,0,0,0,
        466,71,1,0,0,0,467,468,3,100,50,0,468,469,5,35,0,0,469,470,3,10,
        5,0,470,73,1,0,0,0,471,472,5,61,0,0,472,475,5,1,0,0,473,476,3,98,
        49,0,474,476,5,61,0,0,475,473,1,0,0,0,475,474,1,0,0,0,476,477,1,
        0,0,0,477,475,1,0,0,0,477,478,1,0,0,0,478,479,1,0,0,0,479,480,5,
        2,0,0,480,75,1,0,0,0,481,482,5,61,0,0,482,485,5,1,0,0,483,486,5,
        61,0,0,484,486,3,96,48,0,485,483,1,0,0,0,485,484,1,0,0,0,486,487,
        1,0,0,0,487,485,1,0,0,0,487,488,1,0,0,0,488,489,1,0,0,0,489,490,
        5,2,0,0,490,77,1,0,0,0,491,492,5,5,0,0,492,494,5,35,0,0,493,495,
        3,134,67,0,494,493,1,0,0,0,494,495,1,0,0,0,495,496,1,0,0,0,496,527,
        3,74,37,0,497,498,5,8,0,0,498,499,5,35,0,0,499,527,3,74,37,0,500,
        501,5,9,0,0,501,502,5,35,0,0,502,527,3,74,37,0,503,504,5,10,0,0,
        504,505,5,35,0,0,505,527,3,84,42,0,506,510,5,6,0,0,507,508,5,64,
        0,0,508,509,5,74,0,0,509,511,5,65,0,0,510,507,1,0,0,0,510,511,1,
        0,0,0,511,512,1,0,0,0,512,513,5,35,0,0,513,527,3,76,38,0,514,515,
        5,7,0,0,515,516,5,35,0,0,516,517,5,61,0,0,517,521,5,1,0,0,518,522,
        3,98,49,0,519,522,3,72,36,0,520,522,5,61,0,0,521,518,1,0,0,0,521,
        519,1,0,0,0,521,520,1,0,0,0,522,523,1,0,0,0,523,521,1,0,0,0,523,
        524,1,0,0,0,524,525,1,0,0,0,525,527,5,2,0,0,526,491,1,0,0,0,526,
        497,1,0,0,0,526,500,1,0,0,0,526,503,1,0,0,0,526,506,1,0,0,0,526,
        514,1,0,0,0,527,79,1,0,0,0,528,530,5,34,0,0,529,531,3,48,24,0,530,
        529,1,0,0,0,531,532,1,0,0,0,532,530,1,0,0,0,532,533,1,0,0,0,533,
        534,1,0,0,0,534,535,5,35,0,0,535,536,3,10,5,0,536,81,1,0,0,0,537,
        542,3,20,10,0,538,542,3,6,3,0,539,542,3,66,33,0,540,542,3,80,40,
        0,541,537,1,0,0,0,541,538,1,0,0,0,541,539,1,0,0,0,541,540,1,0,0,
        0,542,83,1,0,0,0,543,544,5,61,0,0,544,547,5,1,0,0,545,548,3,82,41,
        0,546,548,5,61,0,0,547,545,1,0,0,0,547,546,1,0,0,0,548,549,1,0,0,
        0,549,547,1,0,0,0,549,550,1,0,0,0,550,551,1,0,0,0,551,552,5,2,0,
        0,552,85,1,0,0,0,553,555,5,11,0,0,554,556,3,48,24,0,555,554,1,0,
        0,0,555,556,1,0,0,0,556,557,1,0,0,0,557,558,5,35,0,0,558,559,3,10,
        5,0,559,87,1,0,0,0,560,561,5,29,0,0,561,562,5,28,0,0,562,563,3,48,
        24,0,563,564,5,35,0,0,564,565,3,76,38,0,565,89,1,0,0,0,566,567,5,
        29,0,0,567,568,5,35,0,0,568,569,3,76,38,0,569,91,1,0,0,0,570,574,
        3,20,10,0,571,574,3,66,33,0,572,574,3,6,3,0,573,570,1,0,0,0,573,
        571,1,0,0,0,573,572,1,0,0,0,574,93,1,0,0,0,575,576,5,61,0,0,576,
        579,5,1,0,0,577,580,5,61,0,0,578,580,3,92,46,0,579,577,1,0,0,0,579,
        578,1,0,0,0,580,581,1,0,0,0,581,579,1,0,0,0,581,582,1,0,0,0,582,
        583,1,0,0,0,583,584,5,2,0,0,584,95,1,0,0,0,585,586,5,24,0,0,586,
        591,5,74,0,0,587,588,5,36,0,0,588,590,5,74,0,0,589,587,1,0,0,0,590,
        593,1,0,0,0,591,589,1,0,0,0,591,592,1,0,0,0,592,594,1,0,0,0,593,
        591,1,0,0,0,594,595,5,25,0,0,595,596,3,48,24,0,596,597,5,35,0,0,
        597,598,3,76,38,0,598,631,1,0,0,0,599,600,5,28,0,0,600,601,3,48,
        24,0,601,602,5,35,0,0,602,606,3,76,38,0,603,605,3,88,44,0,604,603,
        1,0,0,0,605,608,1,0,0,0,606,604,1,0,0,0,606,607,1,0,0,0,607,610,
        1,0,0,0,608,606,1,0,0,0,609,611,3,90,45,0,610,609,1,0,0,0,610,611,
        1,0,0,0,611,631,1,0,0,0,612,613,5,74,0,0,613,614,5,35,0,0,614,631,
        3,94,47,0,615,616,5,74,0,0,616,617,5,35,0,0,617,618,3,44,22,0,618,
        619,3,76,38,0,619,631,1,0,0,0,620,621,7,8,0,0,621,628,5,35,0,0,622,
        629,3,44,22,0,623,624,5,64,0,0,624,625,3,44,22,0,625,626,5,65,0,
        0,626,629,1,0,0,0,627,629,3,74,37,0,628,622,1,0,0,0,628,623,1,0,
        0,0,628,627,1,0,0,0,629,631,1,0,0,0,630,585,1,0,0,0,630,599,1,0,
        0,0,630,612,1,0,0,0,630,615,1,0,0,0,630,620,1,0,0,0,631,97,1,0,0,
        0,632,637,3,100,50,0,633,634,5,36,0,0,634,636,3,100,50,0,635,633,
        1,0,0,0,636,639,1,0,0,0,637,635,1,0,0,0,637,638,1,0,0,0,638,640,
        1,0,0,0,639,637,1,0,0,0,640,641,5,35,0,0,641,642,3,102,51,0,642,
        99,1,0,0,0,643,644,7,9,0,0,644,101,1,0,0,0,645,666,3,74,37,0,646,
        651,3,48,24,0,647,648,5,36,0,0,648,650,3,48,24,0,649,647,1,0,0,0,
        650,653,1,0,0,0,651,649,1,0,0,0,651,652,1,0,0,0,652,666,1,0,0,0,
        653,651,1,0,0,0,654,655,5,64,0,0,655,660,3,48,24,0,656,657,5,36,
        0,0,657,659,3,48,24,0,658,656,1,0,0,0,659,662,1,0,0,0,660,658,1,
        0,0,0,660,661,1,0,0,0,661,663,1,0,0,0,662,660,1,0,0,0,663,664,5,
        65,0,0,664,666,1,0,0,0,665,645,1,0,0,0,665,646,1,0,0,0,665,654,1,
        0,0,0,666,103,1,0,0,0,667,671,5,12,0,0,668,669,5,51,0,0,669,671,
        5,51,0,0,670,667,1,0,0,0,670,668,1,0,0,0,671,676,1,0,0,0,672,674,
        5,74,0,0,673,675,3,48,24,0,674,673,1,0,0,0,674,675,1,0,0,0,675,677,
        1,0,0,0,676,672,1,0,0,0,677,678,1,0,0,0,678,676,1,0,0,0,678,679,
        1,0,0,0,679,105,1,0,0,0,680,681,5,17,0,0,681,682,3,48,24,0,682,107,
        1,0,0,0,683,684,5,22,0,0,684,686,5,73,0,0,685,687,3,134,67,0,686,
        685,1,0,0,0,686,687,1,0,0,0,687,706,1,0,0,0,688,689,5,23,0,0,689,
        690,5,73,0,0,690,700,5,22,0,0,691,701,5,53,0,0,692,697,5,74,0,0,
        693,694,5,36,0,0,694,696,5,74,0,0,695,693,1,0,0,0,696,699,1,0,0,
        0,697,695,1,0,0,0,697,698,1,0,0,0,698,701,1,0,0,0,699,697,1,0,0,
        0,700,691,1,0,0,0,700,692,1,0,0,0,701,703,1,0,0,0,702,704,3,134,
        67,0,703,702,1,0,0,0,703,704,1,0,0,0,704,706,1,0,0,0,705,683,1,0,
        0,0,705,688,1,0,0,0,706,109,1,0,0,0,707,709,7,10,0,0,708,710,3,48,
        24,0,709,708,1,0,0,0,709,710,1,0,0,0,710,714,1,0,0,0,711,713,5,74,
        0,0,712,711,1,0,0,0,713,716,1,0,0,0,714,712,1,0,0,0,714,715,1,0,
        0,0,715,717,1,0,0,0,716,714,1,0,0,0,717,719,5,35,0,0,718,720,3,10,
        5,0,719,718,1,0,0,0,719,720,1,0,0,0,720,111,1,0,0,0,721,722,5,28,
        0,0,722,723,3,48,24,0,723,724,5,35,0,0,724,728,3,10,5,0,725,727,
        3,114,57,0,726,725,1,0,0,0,727,730,1,0,0,0,728,726,1,0,0,0,728,729,
        1,0,0,0,729,732,1,0,0,0,730,728,1,0,0,0,731,733,3,116,58,0,732,731,
        1,0,0,0,732,733,1,0,0,0,733,113,1,0,0,0,734,735,5,29,0,0,735,736,
        5,28,0,0,736,737,3,48,24,0,737,738,5,35,0,0,738,739,3,10,5,0,739,
        115,1,0,0,0,740,741,5,29,0,0,741,742,5,35,0,0,742,743,3,10,5,0,743,
        117,1,0,0,0,744,745,5,26,0,0,745,746,3,48,24,0,746,747,5,35,0,0,
        747,748,3,10,5,0,748,119,1,0,0,0,749,750,5,24,0,0,750,755,5,74,0,
        0,751,752,5,36,0,0,752,754,5,74,0,0,753,751,1,0,0,0,754,757,1,0,
        0,0,755,753,1,0,0,0,755,756,1,0,0,0,756,758,1,0,0,0,757,755,1,0,
        0,0,758,759,5,25,0,0,759,760,3,48,24,0,760,761,5,35,0,0,761,762,
        3,10,5,0,762,121,1,0,0,0,763,764,5,33,0,0,764,765,5,35,0,0,765,770,
        3,48,24,0,766,767,5,36,0,0,767,769,3,48,24,0,768,766,1,0,0,0,769,
        772,1,0,0,0,770,768,1,0,0,0,770,771,1,0,0,0,771,773,1,0,0,0,772,
        770,1,0,0,0,773,774,5,35,0,0,774,775,3,126,63,0,775,123,1,0,0,0,
        776,777,7,11,0,0,777,125,1,0,0,0,778,779,5,61,0,0,779,781,5,1,0,
        0,780,782,3,128,64,0,781,780,1,0,0,0,782,783,1,0,0,0,783,781,1,0,
        0,0,783,784,1,0,0,0,784,785,1,0,0,0,785,786,5,2,0,0,786,127,1,0,
        0,0,787,791,3,130,65,0,788,791,3,132,66,0,789,791,5,61,0,0,790,787,
        1,0,0,0,790,788,1,0,0,0,790,789,1,0,0,0,791,129,1,0,0,0,792,793,
        3,124,62,0,793,794,5,35,0,0,794,802,3,48,24,0,795,796,5,36,0,0,796,
        797,3,124,62,0,797,798,5,35,0,0,798,799,3,48,24,0,799,801,1,0,0,
        0,800,795,1,0,0,0,801,804,1,0,0,0,802,800,1,0,0,0,802,803,1,0,0,
        0,803,809,1,0,0,0,804,802,1,0,0,0,805,806,5,36,0,0,806,808,3,124,
        62,0,807,805,1,0,0,0,808,811,1,0,0,0,809,807,1,0,0,0,809,810,1,0,
        0,0,810,812,1,0,0,0,811,809,1,0,0,0,812,822,5,35,0,0,813,823,3,126,
        63,0,814,819,3,48,24,0,815,816,5,36,0,0,816,818,3,48,24,0,817,815,
        1,0,0,0,818,821,1,0,0,0,819,817,1,0,0,0,819,820,1,0,0,0,820,823,
        1,0,0,0,821,819,1,0,0,0,822,813,1,0,0,0,822,814,1,0,0,0,823,131,
        1,0,0,0,824,825,3,124,62,0,825,835,5,35,0,0,826,836,3,126,63,0,827,
        832,3,48,24,0,828,829,5,36,0,0,829,831,3,48,24,0,830,828,1,0,0,0,
        831,834,1,0,0,0,832,830,1,0,0,0,832,833,1,0,0,0,833,836,1,0,0,0,
        834,832,1,0,0,0,835,826,1,0,0,0,835,827,1,0,0,0,836,133,1,0,0,0,
        837,841,5,68,0,0,838,840,7,12,0,0,839,838,1,0,0,0,840,843,1,0,0,
        0,841,839,1,0,0,0,841,842,1,0,0,0,842,135,1,0,0,0,843,841,1,0,0,
        0,97,138,140,146,153,166,173,182,189,198,202,213,218,222,234,238,
        246,254,265,271,278,285,289,293,304,308,314,322,342,347,354,368,
        370,374,382,391,397,404,409,417,424,428,432,442,448,453,460,465,
        475,477,485,487,494,510,521,523,526,532,541,547,549,555,573,579,
        581,591,606,610,628,630,637,651,660,665,670,674,678,686,697,700,
        703,705,709,714,719,728,732,755,770,783,790,802,809,819,822,832,
        835,841
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
    public non_newline_expression(): Non_newline_expressionContext | null {
        return this.getRuleContext(0, Non_newline_expressionContext);
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


export class Non_newline_expressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public flow_expressions(): Flow_expressionsContext | null {
        return this.getRuleContext(0, Flow_expressionsContext);
    }
    public graph_expressions(): Graph_expressionsContext | null {
        return this.getRuleContext(0, Graph_expressionsContext);
    }
    public function_def_expr(): Function_def_exprContext | null {
        return this.getRuleContext(0, Function_def_exprContext);
    }
    public frame_expr(): Frame_exprContext | null {
        return this.getRuleContext(0, Frame_exprContext);
    }
    public part_set_expr(): Part_set_exprContext | null {
        return this.getRuleContext(0, Part_set_exprContext);
    }
    public annotation_comment_expr(): Annotation_comment_exprContext | null {
        return this.getRuleContext(0, Annotation_comment_exprContext);
    }
    public double_dot_property_set_expr(): Double_dot_property_set_exprContext | null {
        return this.getRuleContext(0, Double_dot_property_set_exprContext);
    }
    public assignment_expr(): Assignment_exprContext | null {
        return this.getRuleContext(0, Assignment_exprContext);
    }
    public module_callable_expr(): Module_callable_exprContext | null {
        return this.getRuleContext(0, Module_callable_exprContext);
    }
    public callable_expr(): Callable_exprContext | null {
        return this.getRuleContext(0, Callable_exprContext);
    }
    public create_scenario_expr(): Create_scenario_exprContext | null {
        return this.getRuleContext(0, Create_scenario_exprContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_non_newline_expression;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitNon_newline_expression) {
            return visitor.visitNon_newline_expression(this);
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
    public at_component_expr(): At_component_exprContext | null {
        return this.getRuleContext(0, At_component_exprContext);
    }
    public at_block(): At_blockContext | null {
        return this.getRuleContext(0, At_blockContext);
    }
    public to_component_expr(): To_component_exprContext | null {
        return this.getRuleContext(0, To_component_exprContext);
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
    public expressions_block(): Expressions_blockContext | null {
        return this.getRuleContext(0, Expressions_blockContext);
    }
    public at_block_expressions(): At_block_expressionsContext | null {
        return this.getRuleContext(0, At_block_expressionsContext);
    }
    public non_newline_expression(): Non_newline_expressionContext[];
    public non_newline_expression(i: number): Non_newline_expressionContext | null;
    public non_newline_expression(i?: number): Non_newline_expressionContext[] | Non_newline_expressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Non_newline_expressionContext);
        }

        return this.getRuleContext(i, Non_newline_expressionContext);
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
    public ID(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.ID, 0)!;
    }
    public Colon(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Colon, 0)!;
    }
    public data_expr(): Data_exprContext {
        return this.getRuleContext(0, Data_exprContext)!;
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


export class Assignment_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public callable_expr(): Callable_exprContext {
        return this.getRuleContext(0, Callable_exprContext)!;
    }
    public data_expr(): Data_exprContext {
        return this.getRuleContext(0, Data_exprContext)!;
    }
    public Assign(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.Assign, 0);
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


export class At_component_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public At(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.At, 0)!;
    }
    public component_select_expr(): Component_select_exprContext | null {
        return this.getRuleContext(0, Component_select_exprContext);
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


export class At_blockContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public at_block_header(): At_block_headerContext {
        return this.getRuleContext(0, At_block_headerContext)!;
    }
    public at_block_expressions(): At_block_expressionsContext {
        return this.getRuleContext(0, At_block_expressionsContext)!;
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
    public NEWLINE(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.NEWLINE, 0)!;
    }
    public INDENT(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.INDENT, 0)!;
    }
    public DEDENT(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.DEDENT, 0)!;
    }
    public at_block_expressions_inner(): At_block_expressions_innerContext[];
    public at_block_expressions_inner(i: number): At_block_expressions_innerContext | null;
    public at_block_expressions_inner(i?: number): At_block_expressions_innerContext[] | At_block_expressions_innerContext | null {
        if (i === undefined) {
            return this.getRuleContexts(At_block_expressions_innerContext);
        }

        return this.getRuleContext(i, At_block_expressions_innerContext);
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


export class At_block_expressions_innerContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public at_block_pin_expr(): At_block_pin_exprContext | null {
        return this.getRuleContext(0, At_block_pin_exprContext);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_at_block_expressions_inner;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitAt_block_expressions_inner) {
            return visitor.visitAt_block_expressions_inner(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class At_block_pin_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public property_key_expr(): Property_key_exprContext[];
    public property_key_expr(i: number): Property_key_exprContext | null;
    public property_key_expr(i?: number): Property_key_exprContext[] | Property_key_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Property_key_exprContext);
        }

        return this.getRuleContext(i, Property_key_exprContext);
    }
    public Colon(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Colon, 0)!;
    }
    public expressions_block(): Expressions_blockContext | null {
        return this.getRuleContext(0, Expressions_blockContext);
    }
    public NOT_CONNECTED(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.NOT_CONNECTED, 0);
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
    public non_newline_expression(): Non_newline_expressionContext[];
    public non_newline_expression(i: number): Non_newline_expressionContext | null;
    public non_newline_expression(i?: number): Non_newline_expressionContext[] | Non_newline_expressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Non_newline_expressionContext);
        }

        return this.getRuleContext(i, Non_newline_expressionContext);
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


export class Data_expr_with_doubledotContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public data_expr(): Data_exprContext | null {
        return this.getRuleContext(0, Data_exprContext);
    }
    public DoubleDot(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.DoubleDot, 0);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_data_expr_with_doubledot;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitData_expr_with_doubledot) {
            return visitor.visitData_expr_with_doubledot(this);
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
    public data_expr_with_doubledot(): Data_expr_with_doubledotContext {
        return this.getRuleContext(0, Data_expr_with_doubledotContext)!;
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
    public keyword_assignment_expr(): Keyword_assignment_exprContext[];
    public keyword_assignment_expr(i: number): Keyword_assignment_exprContext | null;
    public keyword_assignment_expr(i?: number): Keyword_assignment_exprContext[] | Keyword_assignment_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Keyword_assignment_exprContext);
        }

        return this.getRuleContext(i, Keyword_assignment_exprContext);
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
    public data_expr_with_doubledot(): Data_expr_with_doubledotContext[];
    public data_expr_with_doubledot(i: number): Data_expr_with_doubledotContext | null;
    public data_expr_with_doubledot(i?: number): Data_expr_with_doubledotContext[] | Data_expr_with_doubledotContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Data_expr_with_doubledotContext);
        }

        return this.getRuleContext(i, Data_expr_with_doubledotContext);
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
    public trailer(): TrailerContext[];
    public trailer(i: number): TrailerContext | null;
    public trailer(i?: number): TrailerContext[] | TrailerContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TrailerContext);
        }

        return this.getRuleContext(i, TrailerContext);
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
export class ModuleCallableExprContext extends Data_exprContext {
    public constructor(ctx: Data_exprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public module_callable_expr(): Module_callable_exprContext {
        return this.getRuleContext(0, Module_callable_exprContext)!;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitModuleCallableExpr) {
            return visitor.visitModuleCallableExpr(this);
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
export class CallableExprContext extends Data_exprContext {
    public constructor(ctx: Data_exprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public callable_expr(): Callable_exprContext {
        return this.getRuleContext(0, Callable_exprContext)!;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitCallableExpr) {
            return visitor.visitCallableExpr(this);
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
    public NEWLINE(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.NEWLINE, 0)!;
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


export class Call_trailerContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LParen(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.LParen, 0)!;
    }
    public RParen(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.RParen, 0)!;
    }
    public parameters(): ParametersContext | null {
        return this.getRuleContext(0, ParametersContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_call_trailer;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitCall_trailer) {
            return visitor.visitCall_trailer(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Non_call_trailerContext extends antlr.ParserRuleContext {
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
        return CircuitScriptParser.RULE_non_call_trailer;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitNon_call_trailer) {
            return visitor.visitNon_call_trailer(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Callable_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.ID, 0)!;
    }
    public trailer(): TrailerContext[];
    public trailer(i: number): TrailerContext | null;
    public trailer(i?: number): TrailerContext[] | TrailerContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TrailerContext);
        }

        return this.getRuleContext(i, TrailerContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_callable_expr;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitCallable_expr) {
            return visitor.visitCallable_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TrailerContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public call_trailer(): Call_trailerContext | null {
        return this.getRuleContext(0, Call_trailerContext);
    }
    public non_call_trailer(): Non_call_trailerContext | null {
        return this.getRuleContext(0, Non_call_trailerContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_trailer;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitTrailer) {
            return visitor.visitTrailer(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Module_callable_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public net_namespace_expr(): Net_namespace_exprContext {
        return this.getRuleContext(0, Net_namespace_exprContext)!;
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.ID, 0)!;
    }
    public call_trailer(): Call_trailerContext {
        return this.getRuleContext(0, Call_trailerContext)!;
    }
    public trailer(): TrailerContext[];
    public trailer(i: number): TrailerContext | null;
    public trailer(i?: number): TrailerContext[] | TrailerContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TrailerContext);
        }

        return this.getRuleContext(i, TrailerContext);
    }
    public annotation_comment_expr(): Annotation_comment_exprContext | null {
        return this.getRuleContext(0, Annotation_comment_exprContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_module_callable_expr;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitModule_callable_expr) {
            return visitor.visitModule_callable_expr(this);
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


export class Properties_blockContext extends antlr.ParserRuleContext {
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
    public property_expr(): Property_exprContext[];
    public property_expr(i: number): Property_exprContext | null;
    public property_expr(i?: number): Property_exprContext[] | Property_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Property_exprContext);
        }

        return this.getRuleContext(i, Property_exprContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_properties_block;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitProperties_block) {
            return visitor.visitProperties_block(this);
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
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_create_expr;
    }
    public override copyFrom(ctx: Create_exprContext): void {
        super.copyFrom(ctx);
    }
}
export class CreateNetClassExprContext extends Create_exprContext {
    public constructor(ctx: Create_exprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public CreateNetClass(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.CreateNetClass, 0)!;
    }
    public Colon(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Colon, 0)!;
    }
    public properties_block(): Properties_blockContext {
        return this.getRuleContext(0, Properties_blockContext)!;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitCreateNetClassExpr) {
            return visitor.visitCreateNetClassExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class CreateModuleExprContext extends Create_exprContext {
    public constructor(ctx: Create_exprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public CreateModule(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.CreateModule, 0)!;
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitCreateModuleExpr) {
            return visitor.visitCreateModuleExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class CreateComponentExprContext extends Create_exprContext {
    public constructor(ctx: Create_exprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public CreateComponent(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.CreateComponent, 0)!;
    }
    public Colon(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Colon, 0)!;
    }
    public properties_block(): Properties_blockContext {
        return this.getRuleContext(0, Properties_blockContext)!;
    }
    public annotation_comment_expr(): Annotation_comment_exprContext | null {
        return this.getRuleContext(0, Annotation_comment_exprContext);
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitCreateComponentExpr) {
            return visitor.visitCreateComponentExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class CreateGraphicExprContext extends Create_exprContext {
    public constructor(ctx: Create_exprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public CreateGraphic(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.CreateGraphic, 0)!;
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
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitCreateGraphicExpr) {
            return visitor.visitCreateGraphicExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class CreateBehaviorExprContext extends Create_exprContext {
    public constructor(ctx: Create_exprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public CreateBehavior(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.CreateBehavior, 0)!;
    }
    public Colon(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Colon, 0)!;
    }
    public behavior_block(): Behavior_blockContext {
        return this.getRuleContext(0, Behavior_blockContext)!;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitCreateBehaviorExpr) {
            return visitor.visitCreateBehaviorExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class CreateBusExprContext extends Create_exprContext {
    public constructor(ctx: Create_exprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public CreateBus(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.CreateBus, 0)!;
    }
    public Colon(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Colon, 0)!;
    }
    public properties_block(): Properties_blockContext {
        return this.getRuleContext(0, Properties_blockContext)!;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitCreateBusExpr) {
            return visitor.visitCreateBusExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Behavior_state_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public State(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.State, 0)!;
    }
    public Colon(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Colon, 0)!;
    }
    public expressions_block(): Expressions_blockContext {
        return this.getRuleContext(0, Expressions_blockContext)!;
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
        return CircuitScriptParser.RULE_behavior_state_expr;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitBehavior_state_expr) {
            return visitor.visitBehavior_state_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Behavior_block_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public assignment_expr(): Assignment_exprContext | null {
        return this.getRuleContext(0, Assignment_exprContext);
    }
    public flow_expressions(): Flow_expressionsContext | null {
        return this.getRuleContext(0, Flow_expressionsContext);
    }
    public callable_expr(): Callable_exprContext | null {
        return this.getRuleContext(0, Callable_exprContext);
    }
    public behavior_state_expr(): Behavior_state_exprContext | null {
        return this.getRuleContext(0, Behavior_state_exprContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_behavior_block_expr;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitBehavior_block_expr) {
            return visitor.visitBehavior_block_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Behavior_blockContext extends antlr.ParserRuleContext {
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
    public behavior_block_expr(): Behavior_block_exprContext[];
    public behavior_block_expr(i: number): Behavior_block_exprContext | null;
    public behavior_block_expr(i?: number): Behavior_block_exprContext[] | Behavior_block_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Behavior_block_exprContext);
        }

        return this.getRuleContext(i, Behavior_block_exprContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_behavior_block;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitBehavior_block) {
            return visitor.visitBehavior_block(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Create_scenario_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public CreateScenario(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.CreateScenario, 0)!;
    }
    public Colon(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Colon, 0)!;
    }
    public expressions_block(): Expressions_blockContext {
        return this.getRuleContext(0, Expressions_blockContext)!;
    }
    public data_expr(): Data_exprContext | null {
        return this.getRuleContext(0, Data_exprContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_create_scenario_expr;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitCreate_scenario_expr) {
            return visitor.visitCreate_scenario_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class If_inner_graphic_exprContext extends antlr.ParserRuleContext {
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
    public graphic_expressions_block(): Graphic_expressions_blockContext {
        return this.getRuleContext(0, Graphic_expressions_blockContext)!;
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_if_inner_graphic_expr;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitIf_inner_graphic_expr) {
            return visitor.visitIf_inner_graphic_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Else_graphic_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Else(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Else, 0)!;
    }
    public Colon(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Colon, 0)!;
    }
    public graphic_expressions_block(): Graphic_expressions_blockContext {
        return this.getRuleContext(0, Graphic_expressions_blockContext)!;
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_else_graphic_expr;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitElse_graphic_expr) {
            return visitor.visitElse_graphic_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Graphics_data_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public assignment_expr(): Assignment_exprContext | null {
        return this.getRuleContext(0, Assignment_exprContext);
    }
    public callable_expr(): Callable_exprContext | null {
        return this.getRuleContext(0, Callable_exprContext);
    }
    public flow_expressions(): Flow_expressionsContext | null {
        return this.getRuleContext(0, Flow_expressionsContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_graphics_data_expr;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitGraphics_data_expr) {
            return visitor.visitGraphics_data_expr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Graphics_data_expressions_blockContext extends antlr.ParserRuleContext {
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
    public graphics_data_expr(): Graphics_data_exprContext[];
    public graphics_data_expr(i: number): Graphics_data_exprContext | null;
    public graphics_data_expr(i?: number): Graphics_data_exprContext[] | Graphics_data_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Graphics_data_exprContext);
        }

        return this.getRuleContext(i, Graphics_data_exprContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_graphics_data_expressions_block;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitGraphics_data_expressions_block) {
            return visitor.visitGraphics_data_expressions_block(this);
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
export class GraphicPreExprContext extends Graphic_exprContext {
    public constructor(ctx: Graphic_exprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.ID, 0)!;
    }
    public Colon(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Colon, 0)!;
    }
    public graphics_data_expressions_block(): Graphics_data_expressions_blockContext {
        return this.getRuleContext(0, Graphics_data_expressions_blockContext)!;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitGraphicPreExpr) {
            return visitor.visitGraphicPreExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class GraphicTableExprContext extends Graphic_exprContext {
    public constructor(ctx: Graphic_exprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.ID, 0)!;
    }
    public Colon(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Colon, 0)!;
    }
    public parameters(): ParametersContext {
        return this.getRuleContext(0, ParametersContext)!;
    }
    public graphic_expressions_block(): Graphic_expressions_blockContext {
        return this.getRuleContext(0, Graphic_expressions_blockContext)!;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitGraphicTableExpr) {
            return visitor.visitGraphicTableExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class GraphicIfExprContext extends Graphic_exprContext {
    public constructor(ctx: Graphic_exprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
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
    public graphic_expressions_block(): Graphic_expressions_blockContext {
        return this.getRuleContext(0, Graphic_expressions_blockContext)!;
    }
    public if_inner_graphic_expr(): If_inner_graphic_exprContext[];
    public if_inner_graphic_expr(i: number): If_inner_graphic_exprContext | null;
    public if_inner_graphic_expr(i?: number): If_inner_graphic_exprContext[] | If_inner_graphic_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(If_inner_graphic_exprContext);
        }

        return this.getRuleContext(i, If_inner_graphic_exprContext);
    }
    public else_graphic_expr(): Else_graphic_exprContext | null {
        return this.getRuleContext(0, Else_graphic_exprContext);
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitGraphicIfExpr) {
            return visitor.visitGraphicIfExpr(this);
        } else {
            return visitor.visitChildren(this);
        }
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
    public properties_block(): Properties_blockContext | null {
        return this.getRuleContext(0, Properties_blockContext);
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
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public property_key_expr(): Property_key_exprContext[];
    public property_key_expr(i: number): Property_key_exprContext | null;
    public property_key_expr(i?: number): Property_key_exprContext[] | Property_key_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Property_key_exprContext);
        }

        return this.getRuleContext(i, Property_key_exprContext);
    }
    public Colon(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Colon, 0)!;
    }
    public property_value_expr(): Property_value_exprContext {
        return this.getRuleContext(0, Property_value_exprContext)!;
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
    public properties_block(): Properties_blockContext {
        return this.getRuleContext(0, Properties_blockContext)!;
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitNested_properties) {
            return visitor.visitNested_properties(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class WithBracketsPropertyContext extends Property_value_exprContext {
    public constructor(ctx: Property_value_exprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public LParen(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.LParen, 0)!;
    }
    public data_expr(): Data_exprContext[];
    public data_expr(i: number): Data_exprContext | null;
    public data_expr(i?: number): Data_exprContext[] | Data_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Data_exprContext);
        }

        return this.getRuleContext(i, Data_exprContext);
    }
    public RParen(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.RParen, 0)!;
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
        if (visitor.visitWithBracketsProperty) {
            return visitor.visitWithBracketsProperty(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Wire_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Wire(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.Wire, 0);
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
    public ID(): antlr.TerminalNode[];
    public ID(i: number): antlr.TerminalNode | null;
    public ID(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(CircuitScriptParser.ID);
    	} else {
    		return this.getToken(CircuitScriptParser.ID, i);
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
    public data_expr(): Data_exprContext {
        return this.getRuleContext(0, Data_exprContext)!;
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
    public STRING_VALUE(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.STRING_VALUE, 0)!;
    }
    public Multiply(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.Multiply, 0);
    }
    public annotation_comment_expr(): Annotation_comment_exprContext | null {
        return this.getRuleContext(0, Annotation_comment_exprContext);
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
    public STRING_VALUE(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.STRING_VALUE, 0)!;
    }
    public annotation_comment_expr(): Annotation_comment_exprContext | null {
        return this.getRuleContext(0, Annotation_comment_exprContext);
    }
    public override accept<Result>(visitor: CircuitScriptParserVisitor<Result>): Result | null {
        if (visitor.visitImport_simple) {
            return visitor.visitImport_simple(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Frame_exprContext extends antlr.ParserRuleContext {
    public _title?: Data_exprContext;
    public _ID?: Token | null;
    public _modifiers: antlr.Token[] = [];
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Colon(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Colon, 0)!;
    }
    public Frame(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.Frame, 0);
    }
    public Sheet(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.Sheet, 0);
    }
    public expressions_block(): Expressions_blockContext | null {
        return this.getRuleContext(0, Expressions_blockContext);
    }
    public data_expr(): Data_exprContext | null {
        return this.getRuleContext(0, Data_exprContext);
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
    public part_match_block(): Part_match_blockContext | null {
        return this.getRuleContext(0, Part_match_blockContext);
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
