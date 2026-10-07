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
    public static readonly RULE_callable_expr = 31;
    public static readonly RULE_trailer = 32;
    public static readonly RULE_property_block_expr = 33;
    public static readonly RULE_properties_block = 34;
    public static readonly RULE_graphic_expressions_block = 35;
    public static readonly RULE_create_expr = 36;
    public static readonly RULE_behavior_state_expr = 37;
    public static readonly RULE_behavior_block_expr = 38;
    public static readonly RULE_behavior_block = 39;
    public static readonly RULE_create_scenario_expr = 40;
    public static readonly RULE_if_inner_graphic_expr = 41;
    public static readonly RULE_else_graphic_expr = 42;
    public static readonly RULE_graphic_expr = 43;
    public static readonly RULE_property_expr = 44;
    public static readonly RULE_property_key_expr = 45;
    public static readonly RULE_property_value_expr = 46;
    public static readonly RULE_wire_expr = 47;
    public static readonly RULE_point_expr = 48;
    public static readonly RULE_import_expr = 49;
    public static readonly RULE_frame_expr = 50;
    public static readonly RULE_if_expr = 51;
    public static readonly RULE_if_inner_expr = 52;
    public static readonly RULE_else_expr = 53;
    public static readonly RULE_while_expr = 54;
    public static readonly RULE_for_expr = 55;
    public static readonly RULE_part_set_expr = 56;
    public static readonly RULE_part_set_key = 57;
    public static readonly RULE_part_match_block = 58;
    public static readonly RULE_part_sub_expr = 59;
    public static readonly RULE_part_condition_expr = 60;
    public static readonly RULE_part_value_expr = 61;
    public static readonly RULE_annotation_comment_expr = 62;

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
        "callable_expr", "trailer", "property_block_expr", "properties_block", 
        "graphic_expressions_block", "create_expr", "behavior_state_expr", 
        "behavior_block_expr", "behavior_block", "create_scenario_expr", 
        "if_inner_graphic_expr", "else_graphic_expr", "graphic_expr", "property_expr", 
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
            this.state = 130;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 1, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    this.state = 128;
                    this.errorHandler.sync(this);
                    switch (this.tokenStream.LA(1)) {
                    case CircuitScriptParser.Import:
                    case CircuitScriptParser.From:
                        {
                        this.state = 126;
                        this.import_expr();
                        }
                        break;
                    case CircuitScriptParser.NEWLINE:
                        {
                        this.state = 127;
                        this.match(CircuitScriptParser.NEWLINE);
                        }
                        break;
                    default:
                        throw new antlr.NoViableAltException(this);
                    }
                    }
                }
                this.state = 132;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 1, this.context);
            }
            this.state = 136;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2637158424) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 538705987) !== 0) || _la === 68 || _la === 74) {
                {
                {
                this.state = 133;
                this.expression();
                }
                }
                this.state = 138;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 139;
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
            this.state = 143;
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
                this.state = 141;
                this.non_newline_expression();
                }
                break;
            case CircuitScriptParser.NEWLINE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 142;
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
            this.state = 155;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 4, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 145;
                this.flow_expressions();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 146;
                this.graph_expressions();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 147;
                this.function_def_expr();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 148;
                this.frame_expr();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 149;
                this.part_set_expr();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 150;
                this.annotation_comment_expr();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 151;
                this.double_dot_property_set_expr();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 152;
                this.assignment_expr();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 153;
                this.callable_expr();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 154;
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
            this.state = 162;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.If:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 157;
                this.if_expr();
                }
                break;
            case CircuitScriptParser.While:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 158;
                this.while_expr();
                }
                break;
            case CircuitScriptParser.For:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 159;
                this.for_expr();
                }
                break;
            case CircuitScriptParser.Break:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 160;
                this.match(CircuitScriptParser.Break);
                }
                break;
            case CircuitScriptParser.Continue:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 161;
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
            this.state = 171;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 6, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 164;
                this.add_component_expr();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 165;
                this.at_component_expr();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 166;
                this.at_block();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 167;
                this.to_component_expr();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 168;
                this.wire_expr();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 169;
                this.point_expr();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 170;
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
            this.state = 173;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 174;
            this.match(CircuitScriptParser.INDENT);
            this.state = 176;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 175;
                this.expression();
                }
                }
                this.state = 178;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2637158424) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 538705987) !== 0) || _la === 68 || _la === 74);
            this.state = 180;
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
            this.state = 182;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 917520) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 183;
            this.match(CircuitScriptParser.Colon);
            this.state = 191;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 9, this.context) ) {
            case 1:
                {
                this.state = 185;
                this.errorHandler.sync(this);
                alternative = 1;
                do {
                    switch (alternative) {
                    case 1:
                        {
                        {
                        this.state = 184;
                        this.non_newline_expression();
                        }
                        }
                        break;
                    default:
                        throw new antlr.NoViableAltException(this);
                    }
                    this.state = 187;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 8, this.context);
                } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                }
                break;
            case 2:
                {
                this.state = 189;
                this.expressions_block();
                }
                break;
            case 3:
                {
                this.state = 190;
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
            this.state = 193;
            this.match(CircuitScriptParser.Pin);
            this.state = 194;
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
            this.state = 196;
            this.match(CircuitScriptParser.ID);
            this.state = 197;
            this.match(CircuitScriptParser.Colon);
            this.state = 198;
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
            this.state = 202;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 10, this.context) ) {
            case 1:
                {
                this.state = 200;
                this.data_expr(0);
                }
                break;
            case 2:
                {
                this.state = 201;
                this.assignment_expr();
                }
                break;
            }
            this.state = 207;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 11, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 204;
                    this.component_modifier_expr();
                    }
                    }
                }
                this.state = 209;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 11, this.context);
            }
            this.state = 211;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 13) {
                {
                this.state = 210;
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
            this.state = 213;
            this.callable_expr();
            this.state = 214;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 507905) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 215;
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
            this.state = 217;
            this.match(CircuitScriptParser.Add);
            this.state = 218;
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
            this.state = 223;
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
                this.state = 220;
                this.data_expr_with_assignment();
                }
                break;
            case CircuitScriptParser.Pin:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 221;
                this.pin_select_expr();
                }
                break;
            case CircuitScriptParser.Point:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 222;
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
            this.state = 225;
            this.match(CircuitScriptParser.At);
            this.state = 226;
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
        this.enterRule(localContext, 28, CircuitScriptParser.RULE_to_component_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 228;
            this.match(CircuitScriptParser.To);
            this.state = 229;
            this.component_select_expr();
            this.state = 234;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 36) {
                {
                {
                this.state = 230;
                this.match(CircuitScriptParser.Comma);
                this.state = 231;
                this.component_select_expr();
                }
                }
                this.state = 236;
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
            this.state = 237;
            this.at_component_expr();
            this.state = 238;
            this.match(CircuitScriptParser.Colon);
            this.state = 242;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 68) {
                {
                {
                this.state = 239;
                this.annotation_comment_expr();
                }
                }
                this.state = 244;
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
            this.state = 245;
            this.at_block_header();
            this.state = 246;
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
            this.state = 248;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 249;
            this.match(CircuitScriptParser.INDENT);
            this.state = 251;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 250;
                this.at_block_expressions_inner();
                }
                }
                this.state = 253;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2637158424) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 538705987) !== 0) || ((((_la - 68)) & ~0x1F) === 0 && ((1 << (_la - 68)) & 99) !== 0));
            this.state = 255;
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
            this.state = 259;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 17, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 257;
                this.at_block_pin_expr();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 258;
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
            this.state = 261;
            this.property_key_expr();
            this.state = 266;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 36) {
                {
                {
                this.state = 262;
                this.match(CircuitScriptParser.Comma);
                this.state = 263;
                this.property_key_expr();
                }
                }
                this.state = 268;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 269;
            this.match(CircuitScriptParser.Colon);
            this.state = 277;
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
                this.state = 271;
                this.errorHandler.sync(this);
                alternative = 1;
                do {
                    switch (alternative) {
                    case 1:
                        {
                        {
                        this.state = 270;
                        this.non_newline_expression();
                        }
                        }
                        break;
                    default:
                        throw new antlr.NoViableAltException(this);
                    }
                    this.state = 273;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 19, this.context);
                } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                }
                break;
            case CircuitScriptParser.NEWLINE:
                {
                this.state = 275;
                this.expressions_block();
                }
                break;
            case CircuitScriptParser.NOT_CONNECTED:
                {
                this.state = 276;
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
            this.state = 281;
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
                this.state = 279;
                this.data_expr(0);
                }
                break;
            case CircuitScriptParser.DoubleDot:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 280;
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
            this.state = 283;
            this.match(CircuitScriptParser.ID);
            this.state = 284;
            this.match(CircuitScriptParser.Assign);
            this.state = 285;
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
            this.state = 296;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 23, this.context) ) {
            case 1:
                {
                {
                this.state = 287;
                this.data_expr_with_doubledot();
                this.state = 292;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 22, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 288;
                        this.match(CircuitScriptParser.Comma);
                        this.state = 289;
                        this.data_expr_with_doubledot();
                        }
                        }
                    }
                    this.state = 294;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 22, this.context);
                }
                }
                }
                break;
            case 2:
                {
                this.state = 295;
                this.keyword_assignment_expr();
                }
                break;
            }
            this.state = 302;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 36) {
                {
                {
                this.state = 298;
                this.match(CircuitScriptParser.Comma);
                this.state = 299;
                this.keyword_assignment_expr();
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
    public double_dot_property_set_expr(): Double_dot_property_set_exprContext {
        let localContext = new Double_dot_property_set_exprContext(this.context, this.state);
        this.enterRule(localContext, 46, CircuitScriptParser.RULE_double_dot_property_set_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 305;
            this.match(CircuitScriptParser.DoubleDot);
            this.state = 306;
            this.match(CircuitScriptParser.ID);
            this.state = 310;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 134217733) !== 0)) {
                {
                {
                this.state = 307;
                this.trailer();
                }
                }
                this.state = 312;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 313;
            this.match(CircuitScriptParser.Assign);
            this.state = 314;
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
            this.state = 341;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 28, this.context) ) {
            case 1:
                {
                localContext = new RoundedBracketsExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;

                this.state = 317;
                this.match(CircuitScriptParser.LParen);
                this.state = 318;
                this.data_expr(0);
                this.state = 319;
                this.match(CircuitScriptParser.RParen);
                }
                break;
            case 2:
                {
                localContext = new CreateExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 321;
                this.create_expr();
                }
                break;
            case 3:
                {
                localContext = new UnaryOperatorExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 322;
                _la = this.tokenStream.LA(1);
                if(!(_la === 30 || _la === 51)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 323;
                this.data_expr(8);
                }
                break;
            case 4:
                {
                localContext = new ArrayExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 324;
                this.match(CircuitScriptParser.LSquare);
                this.state = 335;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1073743840) !== 0) || ((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 3523229697) !== 0) || ((((_la - 71)) & ~0x1F) === 0 && ((1 << (_la - 71)) & 15) !== 0)) {
                    {
                    {
                    this.state = 325;
                    this.data_expr(0);
                    this.state = 330;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 36) {
                        {
                        {
                        this.state = 326;
                        this.match(CircuitScriptParser.Comma);
                        this.state = 327;
                        this.data_expr(0);
                        }
                        }
                        this.state = 332;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    }
                    }
                    this.state = 337;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 338;
                this.match(CircuitScriptParser.RSquare);
                }
                break;
            case 5:
                {
                localContext = new ValueExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 339;
                this.value_expr();
                }
                break;
            case 6:
                {
                localContext = new CallableExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 340;
                this.callable_expr();
                }
                break;
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 357;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 30, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 355;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 29, this.context) ) {
                    case 1:
                        {
                        localContext = new MultiplyExprContext(new Data_exprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CircuitScriptParser.RULE_data_expr);
                        this.state = 343;
                        if (!(this.precpred(this.context, 6))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 6)");
                        }
                        this.state = 344;
                        _la = this.tokenStream.LA(1);
                        if(!(((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 7) !== 0))) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 345;
                        this.data_expr(7);
                        }
                        break;
                    case 2:
                        {
                        localContext = new AdditionExprContext(new Data_exprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CircuitScriptParser.RULE_data_expr);
                        this.state = 346;
                        if (!(this.precpred(this.context, 5))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 5)");
                        }
                        this.state = 347;
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 50 || _la === 51)) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 348;
                        this.data_expr(6);
                        }
                        break;
                    case 3:
                        {
                        localContext = new BinaryOperatorExprContext(new Data_exprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CircuitScriptParser.RULE_data_expr);
                        this.state = 349;
                        if (!(this.precpred(this.context, 4))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 4)");
                        }
                        this.state = 350;
                        _la = this.tokenStream.LA(1);
                        if(!(((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 63) !== 0))) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 351;
                        this.data_expr(5);
                        }
                        break;
                    case 4:
                        {
                        localContext = new LogicalOperatorExprContext(new Data_exprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CircuitScriptParser.RULE_data_expr);
                        this.state = 352;
                        if (!(this.precpred(this.context, 3))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 3)");
                        }
                        this.state = 353;
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 48 || _la === 49)) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 354;
                        this.data_expr(4);
                        }
                        break;
                    }
                    }
                }
                this.state = 359;
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
    public value_expr(): Value_exprContext {
        let localContext = new Value_exprContext(this.context, this.state);
        this.enterRule(localContext, 50, CircuitScriptParser.RULE_value_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 361;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 51) {
                {
                this.state = 360;
                this.match(CircuitScriptParser.Minus);
                }
            }

            this.state = 363;
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
            this.state = 365;
            this.match(CircuitScriptParser.Define);
            this.state = 366;
            this.match(CircuitScriptParser.ID);
            this.state = 367;
            this.match(CircuitScriptParser.LParen);
            this.state = 369;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 74) {
                {
                this.state = 368;
                this.function_args_expr();
                }
            }

            this.state = 371;
            this.match(CircuitScriptParser.RParen);
            this.state = 372;
            this.match(CircuitScriptParser.Colon);
            this.state = 373;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 374;
            this.match(CircuitScriptParser.INDENT);
            this.state = 376;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 375;
                this.function_expr();
                }
                }
                this.state = 378;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2638207000) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 538705987) !== 0) || _la === 68 || _la === 74);
            this.state = 380;
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
            this.state = 384;
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
                this.state = 382;
                this.expression();
                }
                break;
            case CircuitScriptParser.Return:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 383;
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
            this.state = 386;
            this.match(CircuitScriptParser.ID);
            this.state = 396;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.Comma:
            case CircuitScriptParser.RParen:
                {
                this.state = 391;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 35, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 387;
                        this.match(CircuitScriptParser.Comma);
                        this.state = 388;
                        this.match(CircuitScriptParser.ID);
                        }
                        }
                    }
                    this.state = 393;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 35, this.context);
                }
                }
                break;
            case CircuitScriptParser.Assign:
                {
                {
                this.state = 394;
                this.match(CircuitScriptParser.Assign);
                this.state = 395;
                this.value_expr();
                }
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.state = 404;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 36) {
                {
                {
                this.state = 398;
                this.match(CircuitScriptParser.Comma);
                this.state = 399;
                this.match(CircuitScriptParser.ID);
                this.state = 400;
                this.match(CircuitScriptParser.Assign);
                this.state = 401;
                this.value_expr();
                }
                }
                this.state = 406;
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
            this.state = 407;
            this.match(CircuitScriptParser.Return);
            this.state = 408;
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
            this.state = 411;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 50) {
                {
                this.state = 410;
                this.match(CircuitScriptParser.Addition);
                }
            }

            this.state = 413;
            this.match(CircuitScriptParser.Divide);
            this.state = 415;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 39, this.context) ) {
            case 1:
                {
                this.state = 414;
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
    public callable_expr(): Callable_exprContext {
        let localContext = new Callable_exprContext(this.context, this.state);
        this.enterRule(localContext, 62, CircuitScriptParser.RULE_callable_expr);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 418;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 50 || _la === 52) {
                {
                this.state = 417;
                this.net_namespace_expr();
                }
            }

            this.state = 420;
            this.match(CircuitScriptParser.ID);
            this.state = 424;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 41, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 421;
                    this.trailer();
                    }
                    }
                }
                this.state = 426;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 41, this.context);
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
        this.enterRule(localContext, 64, CircuitScriptParser.RULE_trailer);
        let _la: number;
        try {
            this.state = 438;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.LParen:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 427;
                this.match(CircuitScriptParser.LParen);
                this.state = 429;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1073743840) !== 0) || ((((_la - 38)) & ~0x1F) === 0 && ((1 << (_la - 38)) & 2751492099) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & 31) !== 0)) {
                    {
                    this.state = 428;
                    this.parameters();
                    }
                }

                this.state = 431;
                this.match(CircuitScriptParser.RParen);
                }
                break;
            case CircuitScriptParser.Dot:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 432;
                this.match(CircuitScriptParser.Dot);
                this.state = 433;
                this.match(CircuitScriptParser.ID);
                }
                break;
            case CircuitScriptParser.LSquare:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 434;
                this.match(CircuitScriptParser.LSquare);
                this.state = 435;
                this.data_expr(0);
                this.state = 436;
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
    public property_block_expr(): Property_block_exprContext {
        let localContext = new Property_block_exprContext(this.context, this.state);
        this.enterRule(localContext, 66, CircuitScriptParser.RULE_property_block_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 440;
            this.property_key_expr();
            this.state = 441;
            this.match(CircuitScriptParser.Colon);
            this.state = 442;
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
        this.enterRule(localContext, 68, CircuitScriptParser.RULE_properties_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 444;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 445;
            this.match(CircuitScriptParser.INDENT);
            this.state = 448;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 448;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.INTEGER_VALUE:
                case CircuitScriptParser.STRING_VALUE:
                case CircuitScriptParser.ID:
                    {
                    this.state = 446;
                    this.property_expr();
                    }
                    break;
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 447;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 450;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 61)) & ~0x1F) === 0 && ((1 << (_la - 61)) & 12545) !== 0));
            this.state = 452;
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
        this.enterRule(localContext, 70, CircuitScriptParser.RULE_graphic_expressions_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 454;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 455;
            this.match(CircuitScriptParser.INDENT);
            this.state = 458;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 458;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 456;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case CircuitScriptParser.Pin:
                case CircuitScriptParser.For:
                case CircuitScriptParser.If:
                case CircuitScriptParser.ID:
                    {
                    this.state = 457;
                    this.graphic_expr();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 460;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 285220864) !== 0) || _la === 61 || _la === 74);
            this.state = 462;
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
        this.enterRule(localContext, 72, CircuitScriptParser.RULE_create_expr);
        let _la: number;
        try {
            this.state = 496;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.CreateComponent:
                localContext = new CreateComponentExprContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 464;
                this.match(CircuitScriptParser.CreateComponent);
                this.state = 465;
                this.match(CircuitScriptParser.Colon);
                this.state = 466;
                this.properties_block();
                }
                break;
            case CircuitScriptParser.CreateNetClass:
                localContext = new CreateNetClassExprContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 467;
                this.match(CircuitScriptParser.CreateNetClass);
                this.state = 468;
                this.match(CircuitScriptParser.Colon);
                this.state = 469;
                this.properties_block();
                }
                break;
            case CircuitScriptParser.CreateBus:
                localContext = new CreateBusExprContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 470;
                this.match(CircuitScriptParser.CreateBus);
                this.state = 471;
                this.match(CircuitScriptParser.Colon);
                this.state = 472;
                this.properties_block();
                }
                break;
            case CircuitScriptParser.CreateBehavior:
                localContext = new CreateBehaviorExprContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 473;
                this.match(CircuitScriptParser.CreateBehavior);
                this.state = 474;
                this.match(CircuitScriptParser.Colon);
                this.state = 475;
                this.behavior_block();
                }
                break;
            case CircuitScriptParser.CreateGraphic:
                localContext = new CreateGraphicExprContext(localContext);
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 476;
                this.match(CircuitScriptParser.CreateGraphic);
                this.state = 480;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 64) {
                    {
                    this.state = 477;
                    this.match(CircuitScriptParser.LParen);
                    this.state = 478;
                    this.match(CircuitScriptParser.ID);
                    this.state = 479;
                    this.match(CircuitScriptParser.RParen);
                    }
                }

                this.state = 482;
                this.match(CircuitScriptParser.Colon);
                this.state = 483;
                this.graphic_expressions_block();
                }
                break;
            case CircuitScriptParser.CreateModule:
                localContext = new CreateModuleExprContext(localContext);
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 484;
                this.match(CircuitScriptParser.CreateModule);
                this.state = 485;
                this.match(CircuitScriptParser.Colon);
                this.state = 486;
                this.match(CircuitScriptParser.NEWLINE);
                this.state = 487;
                this.match(CircuitScriptParser.INDENT);
                this.state = 491;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                do {
                    {
                    this.state = 491;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 49, this.context) ) {
                    case 1:
                        {
                        this.state = 488;
                        this.property_expr();
                        }
                        break;
                    case 2:
                        {
                        this.state = 489;
                        this.property_block_expr();
                        }
                        break;
                    case 3:
                        {
                        this.state = 490;
                        this.match(CircuitScriptParser.NEWLINE);
                        }
                        break;
                    }
                    }
                    this.state = 493;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                } while (((((_la - 61)) & ~0x1F) === 0 && ((1 << (_la - 61)) & 12545) !== 0));
                this.state = 495;
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
        this.enterRule(localContext, 74, CircuitScriptParser.RULE_behavior_state_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 498;
            this.match(CircuitScriptParser.State);
            this.state = 500;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 499;
                this.data_expr(0);
                }
                }
                this.state = 502;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1073743840) !== 0) || ((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 3523229697) !== 0) || ((((_la - 71)) & ~0x1F) === 0 && ((1 << (_la - 71)) & 15) !== 0));
            this.state = 504;
            this.match(CircuitScriptParser.Colon);
            this.state = 505;
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
        this.enterRule(localContext, 76, CircuitScriptParser.RULE_behavior_block_expr);
        try {
            this.state = 511;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 53, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 507;
                this.assignment_expr();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 508;
                this.flow_expressions();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 509;
                this.callable_expr();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 510;
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
        this.enterRule(localContext, 78, CircuitScriptParser.RULE_behavior_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 513;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 514;
            this.match(CircuitScriptParser.INDENT);
            this.state = 517;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 517;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.Break:
                case CircuitScriptParser.For:
                case CircuitScriptParser.While:
                case CircuitScriptParser.Continue:
                case CircuitScriptParser.If:
                case CircuitScriptParser.State:
                case CircuitScriptParser.Addition:
                case CircuitScriptParser.Divide:
                case CircuitScriptParser.ID:
                    {
                    this.state = 515;
                    this.behavior_block_expr();
                    }
                    break;
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 516;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 519;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 3)) & ~0x1F) === 0 && ((1 << (_la - 3)) & 2208301057) !== 0) || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 16779269) !== 0));
            this.state = 521;
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
        this.enterRule(localContext, 80, CircuitScriptParser.RULE_create_scenario_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 523;
            this.match(CircuitScriptParser.CreateScenario);
            this.state = 525;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1073743840) !== 0) || ((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 3523229697) !== 0) || ((((_la - 71)) & ~0x1F) === 0 && ((1 << (_la - 71)) & 15) !== 0)) {
                {
                this.state = 524;
                this.data_expr(0);
                }
            }

            this.state = 527;
            this.match(CircuitScriptParser.Colon);
            this.state = 528;
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
        this.enterRule(localContext, 82, CircuitScriptParser.RULE_if_inner_graphic_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 530;
            this.match(CircuitScriptParser.Else);
            this.state = 531;
            this.match(CircuitScriptParser.If);
            this.state = 532;
            this.data_expr(0);
            this.state = 533;
            this.match(CircuitScriptParser.Colon);
            this.state = 534;
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
        this.enterRule(localContext, 84, CircuitScriptParser.RULE_else_graphic_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 536;
            this.match(CircuitScriptParser.Else);
            this.state = 537;
            this.match(CircuitScriptParser.Colon);
            this.state = 538;
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
    public graphic_expr(): Graphic_exprContext {
        let localContext = new Graphic_exprContext(this.context, this.state);
        this.enterRule(localContext, 86, CircuitScriptParser.RULE_graphic_expr);
        let _la: number;
        try {
            let alternative: number;
            this.state = 577;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.For:
                localContext = new GraphicForExprContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 540;
                this.match(CircuitScriptParser.For);
                this.state = 541;
                this.match(CircuitScriptParser.ID);
                this.state = 546;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 36) {
                    {
                    {
                    this.state = 542;
                    this.match(CircuitScriptParser.Comma);
                    this.state = 543;
                    this.match(CircuitScriptParser.ID);
                    }
                    }
                    this.state = 548;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 549;
                this.match(CircuitScriptParser.In);
                this.state = 550;
                this.data_expr(0);
                this.state = 551;
                this.match(CircuitScriptParser.Colon);
                this.state = 552;
                this.graphic_expressions_block();
                }
                break;
            case CircuitScriptParser.If:
                localContext = new GraphicIfExprContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 554;
                this.match(CircuitScriptParser.If);
                this.state = 555;
                this.data_expr(0);
                this.state = 556;
                this.match(CircuitScriptParser.Colon);
                this.state = 557;
                this.graphic_expressions_block();
                this.state = 561;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 58, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 558;
                        this.if_inner_graphic_expr();
                        }
                        }
                    }
                    this.state = 563;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 58, this.context);
                }
                this.state = 565;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 29) {
                    {
                    this.state = 564;
                    this.else_graphic_expr();
                    }
                }

                }
                break;
            case CircuitScriptParser.Pin:
            case CircuitScriptParser.ID:
                localContext = new GraphicCommandExprContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 567;
                (localContext as GraphicCommandExprContext)._command = this.tokenStream.LT(1);
                _la = this.tokenStream.LA(1);
                if(!(_la === 13 || _la === 74)) {
                    (localContext as GraphicCommandExprContext)._command = this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 568;
                this.match(CircuitScriptParser.Colon);
                this.state = 575;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 60, this.context) ) {
                case 1:
                    {
                    this.state = 569;
                    this.parameters();
                    }
                    break;
                case 2:
                    {
                    this.state = 570;
                    this.match(CircuitScriptParser.LParen);
                    this.state = 571;
                    this.parameters();
                    this.state = 572;
                    this.match(CircuitScriptParser.RParen);
                    }
                    break;
                case 3:
                    {
                    this.state = 574;
                    this.properties_block();
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
        this.enterRule(localContext, 88, CircuitScriptParser.RULE_property_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 579;
            this.property_key_expr();
            this.state = 584;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 36) {
                {
                {
                this.state = 580;
                this.match(CircuitScriptParser.Comma);
                this.state = 581;
                this.property_key_expr();
                }
                }
                this.state = 586;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 587;
            this.match(CircuitScriptParser.Colon);
            this.state = 588;
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
        this.enterRule(localContext, 90, CircuitScriptParser.RULE_property_key_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 590;
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
        this.enterRule(localContext, 92, CircuitScriptParser.RULE_property_value_expr);
        let _la: number;
        try {
            this.state = 612;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 65, this.context) ) {
            case 1:
                localContext = new Nested_propertiesContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 592;
                this.properties_block();
                }
                break;
            case 2:
                localContext = new Single_line_propertyContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 593;
                this.data_expr(0);
                this.state = 598;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 36) {
                    {
                    {
                    this.state = 594;
                    this.match(CircuitScriptParser.Comma);
                    this.state = 595;
                    this.data_expr(0);
                    }
                    }
                    this.state = 600;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                break;
            case 3:
                localContext = new WithBracketsPropertyContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 601;
                this.match(CircuitScriptParser.LParen);
                this.state = 602;
                this.data_expr(0);
                this.state = 607;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 36) {
                    {
                    {
                    this.state = 603;
                    this.match(CircuitScriptParser.Comma);
                    this.state = 604;
                    this.data_expr(0);
                    }
                    }
                    this.state = 609;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 610;
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
        this.enterRule(localContext, 94, CircuitScriptParser.RULE_wire_expr);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 617;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.Wire:
                {
                this.state = 614;
                this.match(CircuitScriptParser.Wire);
                }
                break;
            case CircuitScriptParser.Minus:
                {
                this.state = 615;
                this.match(CircuitScriptParser.Minus);
                this.state = 616;
                this.match(CircuitScriptParser.Minus);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.state = 623;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 619;
                    this.match(CircuitScriptParser.ID);
                    this.state = 621;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 67, this.context) ) {
                    case 1:
                        {
                        this.state = 620;
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
                this.state = 625;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 68, this.context);
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
        this.enterRule(localContext, 96, CircuitScriptParser.RULE_point_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 627;
            this.match(CircuitScriptParser.Point);
            this.state = 628;
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
        this.enterRule(localContext, 98, CircuitScriptParser.RULE_import_expr);
        let _la: number;
        try {
            this.state = 652;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.Import:
                localContext = new Import_simpleContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 630;
                this.match(CircuitScriptParser.Import);
                this.state = 631;
                (localContext as Import_simpleContext)._libraryName = this.match(CircuitScriptParser.STRING_VALUE);
                this.state = 633;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 69, this.context) ) {
                case 1:
                    {
                    this.state = 632;
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
                this.state = 635;
                this.match(CircuitScriptParser.From);
                this.state = 636;
                (localContext as Import_specific_or_allContext)._libraryName = this.match(CircuitScriptParser.STRING_VALUE);
                this.state = 637;
                this.match(CircuitScriptParser.Import);
                this.state = 647;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.Multiply:
                    {
                    this.state = 638;
                    (localContext as Import_specific_or_allContext)._all = this.match(CircuitScriptParser.Multiply);
                    }
                    break;
                case CircuitScriptParser.ID:
                    {
                    {
                    this.state = 639;
                    (localContext as Import_specific_or_allContext)._ID = this.match(CircuitScriptParser.ID);
                    (localContext as Import_specific_or_allContext)._funcNames.push((localContext as Import_specific_or_allContext)._ID!);
                    this.state = 644;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 36) {
                        {
                        {
                        this.state = 640;
                        this.match(CircuitScriptParser.Comma);
                        this.state = 641;
                        (localContext as Import_specific_or_allContext)._ID = this.match(CircuitScriptParser.ID);
                        (localContext as Import_specific_or_allContext)._funcNames.push((localContext as Import_specific_or_allContext)._ID!);
                        }
                        }
                        this.state = 646;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 650;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 72, this.context) ) {
                case 1:
                    {
                    this.state = 649;
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
        this.enterRule(localContext, 100, CircuitScriptParser.RULE_frame_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 654;
            _la = this.tokenStream.LA(1);
            if(!(_la === 31 || _la === 32)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 656;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 74, this.context) ) {
            case 1:
                {
                this.state = 655;
                localContext._title = this.data_expr(0);
                }
                break;
            }
            this.state = 661;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 74) {
                {
                {
                this.state = 658;
                localContext._ID = this.match(CircuitScriptParser.ID);
                localContext._modifiers.push(localContext._ID!);
                }
                }
                this.state = 663;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 664;
            this.match(CircuitScriptParser.Colon);
            this.state = 666;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 76, this.context) ) {
            case 1:
                {
                this.state = 665;
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
        this.enterRule(localContext, 102, CircuitScriptParser.RULE_if_expr);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 668;
            this.match(CircuitScriptParser.If);
            this.state = 669;
            this.data_expr(0);
            this.state = 670;
            this.match(CircuitScriptParser.Colon);
            this.state = 671;
            this.expressions_block();
            this.state = 675;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 77, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 672;
                    this.if_inner_expr();
                    }
                    }
                }
                this.state = 677;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 77, this.context);
            }
            this.state = 679;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 29) {
                {
                this.state = 678;
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
        this.enterRule(localContext, 104, CircuitScriptParser.RULE_if_inner_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 681;
            this.match(CircuitScriptParser.Else);
            this.state = 682;
            this.match(CircuitScriptParser.If);
            this.state = 683;
            this.data_expr(0);
            this.state = 684;
            this.match(CircuitScriptParser.Colon);
            this.state = 685;
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
        this.enterRule(localContext, 106, CircuitScriptParser.RULE_else_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 687;
            this.match(CircuitScriptParser.Else);
            this.state = 688;
            this.match(CircuitScriptParser.Colon);
            this.state = 689;
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
        this.enterRule(localContext, 108, CircuitScriptParser.RULE_while_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 691;
            this.match(CircuitScriptParser.While);
            this.state = 692;
            this.data_expr(0);
            this.state = 693;
            this.match(CircuitScriptParser.Colon);
            this.state = 694;
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
        this.enterRule(localContext, 110, CircuitScriptParser.RULE_for_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 696;
            this.match(CircuitScriptParser.For);
            this.state = 697;
            this.match(CircuitScriptParser.ID);
            this.state = 702;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 36) {
                {
                {
                this.state = 698;
                this.match(CircuitScriptParser.Comma);
                this.state = 699;
                this.match(CircuitScriptParser.ID);
                }
                }
                this.state = 704;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 705;
            this.match(CircuitScriptParser.In);
            this.state = 706;
            this.data_expr(0);
            this.state = 707;
            this.match(CircuitScriptParser.Colon);
            this.state = 708;
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
        this.enterRule(localContext, 112, CircuitScriptParser.RULE_part_set_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 710;
            this.match(CircuitScriptParser.Set);
            this.state = 711;
            this.match(CircuitScriptParser.Colon);
            this.state = 712;
            this.data_expr(0);
            this.state = 717;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 36) {
                {
                {
                this.state = 713;
                this.match(CircuitScriptParser.Comma);
                this.state = 714;
                this.data_expr(0);
                }
                }
                this.state = 719;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 720;
            this.match(CircuitScriptParser.Colon);
            this.state = 721;
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
        this.enterRule(localContext, 114, CircuitScriptParser.RULE_part_set_key);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 723;
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
        this.enterRule(localContext, 116, CircuitScriptParser.RULE_part_match_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 725;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 726;
            this.match(CircuitScriptParser.INDENT);
            this.state = 728;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 727;
                this.part_sub_expr();
                }
                }
                this.state = 730;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 61)) & ~0x1F) === 0 && ((1 << (_la - 61)) & 15617) !== 0));
            this.state = 732;
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
        this.enterRule(localContext, 118, CircuitScriptParser.RULE_part_sub_expr);
        try {
            this.state = 737;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 82, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 734;
                this.part_condition_expr();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 735;
                this.part_value_expr();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 736;
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
        this.enterRule(localContext, 120, CircuitScriptParser.RULE_part_condition_expr);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 739;
            localContext._part_set_key = this.part_set_key();
            localContext._key_id.push(localContext._part_set_key!);
            this.state = 740;
            this.match(CircuitScriptParser.Colon);
            this.state = 741;
            localContext._data_expr = this.data_expr(0);
            localContext._values.push(localContext._data_expr!);
            this.state = 749;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 83, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 742;
                    this.match(CircuitScriptParser.Comma);
                    this.state = 743;
                    localContext._part_set_key = this.part_set_key();
                    localContext._key_id.push(localContext._part_set_key!);
                    this.state = 744;
                    this.match(CircuitScriptParser.Colon);
                    this.state = 745;
                    localContext._data_expr = this.data_expr(0);
                    localContext._values.push(localContext._data_expr!);
                    }
                    }
                }
                this.state = 751;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 83, this.context);
            }
            this.state = 756;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 36) {
                {
                {
                this.state = 752;
                this.match(CircuitScriptParser.Comma);
                this.state = 753;
                localContext._id_only = this.part_set_key();
                }
                }
                this.state = 758;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 759;
            this.match(CircuitScriptParser.Colon);
            this.state = 769;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.NEWLINE:
                {
                this.state = 760;
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
                this.state = 761;
                localContext._data_expr = this.data_expr(0);
                localContext._last_data.push(localContext._data_expr!);
                this.state = 766;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 36) {
                    {
                    {
                    this.state = 762;
                    this.match(CircuitScriptParser.Comma);
                    this.state = 763;
                    localContext._data_expr = this.data_expr(0);
                    localContext._last_data.push(localContext._data_expr!);
                    }
                    }
                    this.state = 768;
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
        this.enterRule(localContext, 122, CircuitScriptParser.RULE_part_value_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 771;
            this.part_set_key();
            this.state = 772;
            this.match(CircuitScriptParser.Colon);
            this.state = 782;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.NEWLINE:
                {
                this.state = 773;
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
                this.state = 774;
                this.data_expr(0);
                this.state = 779;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 36) {
                    {
                    {
                    this.state = 775;
                    this.match(CircuitScriptParser.Comma);
                    this.state = 776;
                    this.data_expr(0);
                    }
                    }
                    this.state = 781;
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
        this.enterRule(localContext, 124, CircuitScriptParser.RULE_annotation_comment_expr);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 784;
            this.match(CircuitScriptParser.ANNOTATION_START);
            this.state = 788;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 89, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 785;
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
                this.state = 790;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 89, this.context);
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
            return this.precpred(this.context, 6);
        case 1:
            return this.precpred(this.context, 5);
        case 2:
            return this.precpred(this.context, 4);
        case 3:
            return this.precpred(this.context, 3);
        }
        return true;
    }

    public static readonly _serializedATN: number[] = [
        4,1,74,792,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,
        7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,
        2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,33,
        7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,39,
        2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,46,
        7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,52,
        2,53,7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,59,
        7,59,2,60,7,60,2,61,7,61,2,62,7,62,1,0,1,0,5,0,129,8,0,10,0,12,0,
        132,9,0,1,0,5,0,135,8,0,10,0,12,0,138,9,0,1,0,1,0,1,1,1,1,3,1,144,
        8,1,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,3,2,156,8,2,1,3,1,3,
        1,3,1,3,1,3,3,3,163,8,3,1,4,1,4,1,4,1,4,1,4,1,4,1,4,3,4,172,8,4,
        1,5,1,5,1,5,4,5,177,8,5,11,5,12,5,178,1,5,1,5,1,6,1,6,1,6,4,6,186,
        8,6,11,6,12,6,187,1,6,1,6,3,6,192,8,6,1,7,1,7,1,7,1,8,1,8,1,8,1,
        8,1,9,1,9,3,9,203,8,9,1,9,5,9,206,8,9,10,9,12,9,209,9,9,1,9,3,9,
        212,8,9,1,10,1,10,1,10,1,10,1,11,1,11,1,11,1,12,1,12,1,12,3,12,224,
        8,12,1,13,1,13,1,13,1,14,1,14,1,14,1,14,5,14,233,8,14,10,14,12,14,
        236,9,14,1,15,1,15,1,15,5,15,241,8,15,10,15,12,15,244,9,15,1,16,
        1,16,1,16,1,17,1,17,1,17,4,17,252,8,17,11,17,12,17,253,1,17,1,17,
        1,18,1,18,3,18,260,8,18,1,19,1,19,1,19,5,19,265,8,19,10,19,12,19,
        268,9,19,1,19,1,19,4,19,272,8,19,11,19,12,19,273,1,19,1,19,3,19,
        278,8,19,1,20,1,20,3,20,282,8,20,1,21,1,21,1,21,1,21,1,22,1,22,1,
        22,5,22,291,8,22,10,22,12,22,294,9,22,1,22,3,22,297,8,22,1,22,1,
        22,5,22,301,8,22,10,22,12,22,304,9,22,1,23,1,23,1,23,5,23,309,8,
        23,10,23,12,23,312,9,23,1,23,1,23,1,23,1,24,1,24,1,24,1,24,1,24,
        1,24,1,24,1,24,1,24,1,24,1,24,1,24,5,24,329,8,24,10,24,12,24,332,
        9,24,5,24,334,8,24,10,24,12,24,337,9,24,1,24,1,24,1,24,3,24,342,
        8,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,
        5,24,356,8,24,10,24,12,24,359,9,24,1,25,3,25,362,8,25,1,25,1,25,
        1,26,1,26,1,26,1,26,3,26,370,8,26,1,26,1,26,1,26,1,26,1,26,4,26,
        377,8,26,11,26,12,26,378,1,26,1,26,1,27,1,27,3,27,385,8,27,1,28,
        1,28,1,28,5,28,390,8,28,10,28,12,28,393,9,28,1,28,1,28,3,28,397,
        8,28,1,28,1,28,1,28,1,28,5,28,403,8,28,10,28,12,28,406,9,28,1,29,
        1,29,1,29,1,30,3,30,412,8,30,1,30,1,30,3,30,416,8,30,1,31,3,31,419,
        8,31,1,31,1,31,5,31,423,8,31,10,31,12,31,426,9,31,1,32,1,32,3,32,
        430,8,32,1,32,1,32,1,32,1,32,1,32,1,32,1,32,3,32,439,8,32,1,33,1,
        33,1,33,1,33,1,34,1,34,1,34,1,34,4,34,449,8,34,11,34,12,34,450,1,
        34,1,34,1,35,1,35,1,35,1,35,4,35,459,8,35,11,35,12,35,460,1,35,1,
        35,1,36,1,36,1,36,1,36,1,36,1,36,1,36,1,36,1,36,1,36,1,36,1,36,1,
        36,1,36,1,36,1,36,3,36,481,8,36,1,36,1,36,1,36,1,36,1,36,1,36,1,
        36,1,36,1,36,4,36,492,8,36,11,36,12,36,493,1,36,3,36,497,8,36,1,
        37,1,37,4,37,501,8,37,11,37,12,37,502,1,37,1,37,1,37,1,38,1,38,1,
        38,1,38,3,38,512,8,38,1,39,1,39,1,39,1,39,4,39,518,8,39,11,39,12,
        39,519,1,39,1,39,1,40,1,40,3,40,526,8,40,1,40,1,40,1,40,1,41,1,41,
        1,41,1,41,1,41,1,41,1,42,1,42,1,42,1,42,1,43,1,43,1,43,1,43,5,43,
        545,8,43,10,43,12,43,548,9,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,
        1,43,1,43,1,43,5,43,560,8,43,10,43,12,43,563,9,43,1,43,3,43,566,
        8,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,3,43,576,8,43,3,43,
        578,8,43,1,44,1,44,1,44,5,44,583,8,44,10,44,12,44,586,9,44,1,44,
        1,44,1,44,1,45,1,45,1,46,1,46,1,46,1,46,5,46,597,8,46,10,46,12,46,
        600,9,46,1,46,1,46,1,46,1,46,5,46,606,8,46,10,46,12,46,609,9,46,
        1,46,1,46,3,46,613,8,46,1,47,1,47,1,47,3,47,618,8,47,1,47,1,47,3,
        47,622,8,47,4,47,624,8,47,11,47,12,47,625,1,48,1,48,1,48,1,49,1,
        49,1,49,3,49,634,8,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,5,49,643,
        8,49,10,49,12,49,646,9,49,3,49,648,8,49,1,49,3,49,651,8,49,3,49,
        653,8,49,1,50,1,50,3,50,657,8,50,1,50,5,50,660,8,50,10,50,12,50,
        663,9,50,1,50,1,50,3,50,667,8,50,1,51,1,51,1,51,1,51,1,51,5,51,674,
        8,51,10,51,12,51,677,9,51,1,51,3,51,680,8,51,1,52,1,52,1,52,1,52,
        1,52,1,52,1,53,1,53,1,53,1,53,1,54,1,54,1,54,1,54,1,54,1,55,1,55,
        1,55,1,55,5,55,701,8,55,10,55,12,55,704,9,55,1,55,1,55,1,55,1,55,
        1,55,1,56,1,56,1,56,1,56,1,56,5,56,716,8,56,10,56,12,56,719,9,56,
        1,56,1,56,1,56,1,57,1,57,1,58,1,58,1,58,4,58,729,8,58,11,58,12,58,
        730,1,58,1,58,1,59,1,59,1,59,3,59,738,8,59,1,60,1,60,1,60,1,60,1,
        60,1,60,1,60,1,60,5,60,748,8,60,10,60,12,60,751,9,60,1,60,1,60,5,
        60,755,8,60,10,60,12,60,758,9,60,1,60,1,60,1,60,1,60,1,60,5,60,765,
        8,60,10,60,12,60,768,9,60,3,60,770,8,60,1,61,1,61,1,61,1,61,1,61,
        1,61,5,61,778,8,61,10,61,12,61,781,9,61,3,61,783,8,61,1,62,1,62,
        5,62,787,8,62,10,62,12,62,790,9,62,1,62,0,1,48,63,0,2,4,6,8,10,12,
        14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,
        58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,
        102,104,106,108,110,112,114,116,118,120,122,124,0,13,2,0,4,4,17,
        19,2,0,41,41,55,59,2,0,30,30,51,51,1,0,52,54,1,0,50,51,1,0,42,47,
        1,0,48,49,2,0,67,67,69,73,2,0,13,13,74,74,2,0,69,69,73,74,1,0,31,
        32,2,0,69,69,71,74,2,0,51,51,74,74,855,0,130,1,0,0,0,2,143,1,0,0,
        0,4,155,1,0,0,0,6,162,1,0,0,0,8,171,1,0,0,0,10,173,1,0,0,0,12,182,
        1,0,0,0,14,193,1,0,0,0,16,196,1,0,0,0,18,202,1,0,0,0,20,213,1,0,
        0,0,22,217,1,0,0,0,24,223,1,0,0,0,26,225,1,0,0,0,28,228,1,0,0,0,
        30,237,1,0,0,0,32,245,1,0,0,0,34,248,1,0,0,0,36,259,1,0,0,0,38,261,
        1,0,0,0,40,281,1,0,0,0,42,283,1,0,0,0,44,296,1,0,0,0,46,305,1,0,
        0,0,48,341,1,0,0,0,50,361,1,0,0,0,52,365,1,0,0,0,54,384,1,0,0,0,
        56,386,1,0,0,0,58,407,1,0,0,0,60,411,1,0,0,0,62,418,1,0,0,0,64,438,
        1,0,0,0,66,440,1,0,0,0,68,444,1,0,0,0,70,454,1,0,0,0,72,496,1,0,
        0,0,74,498,1,0,0,0,76,511,1,0,0,0,78,513,1,0,0,0,80,523,1,0,0,0,
        82,530,1,0,0,0,84,536,1,0,0,0,86,577,1,0,0,0,88,579,1,0,0,0,90,590,
        1,0,0,0,92,612,1,0,0,0,94,617,1,0,0,0,96,627,1,0,0,0,98,652,1,0,
        0,0,100,654,1,0,0,0,102,668,1,0,0,0,104,681,1,0,0,0,106,687,1,0,
        0,0,108,691,1,0,0,0,110,696,1,0,0,0,112,710,1,0,0,0,114,723,1,0,
        0,0,116,725,1,0,0,0,118,737,1,0,0,0,120,739,1,0,0,0,122,771,1,0,
        0,0,124,784,1,0,0,0,126,129,3,98,49,0,127,129,5,61,0,0,128,126,1,
        0,0,0,128,127,1,0,0,0,129,132,1,0,0,0,130,128,1,0,0,0,130,131,1,
        0,0,0,131,136,1,0,0,0,132,130,1,0,0,0,133,135,3,2,1,0,134,133,1,
        0,0,0,135,138,1,0,0,0,136,134,1,0,0,0,136,137,1,0,0,0,137,139,1,
        0,0,0,138,136,1,0,0,0,139,140,5,0,0,1,140,1,1,0,0,0,141,144,3,4,
        2,0,142,144,5,61,0,0,143,141,1,0,0,0,143,142,1,0,0,0,144,3,1,0,0,
        0,145,156,3,6,3,0,146,156,3,8,4,0,147,156,3,52,26,0,148,156,3,100,
        50,0,149,156,3,112,56,0,150,156,3,124,62,0,151,156,3,46,23,0,152,
        156,3,20,10,0,153,156,3,62,31,0,154,156,3,80,40,0,155,145,1,0,0,
        0,155,146,1,0,0,0,155,147,1,0,0,0,155,148,1,0,0,0,155,149,1,0,0,
        0,155,150,1,0,0,0,155,151,1,0,0,0,155,152,1,0,0,0,155,153,1,0,0,
        0,155,154,1,0,0,0,156,5,1,0,0,0,157,163,3,102,51,0,158,163,3,108,
        54,0,159,163,3,110,55,0,160,163,5,3,0,0,161,163,5,27,0,0,162,157,
        1,0,0,0,162,158,1,0,0,0,162,159,1,0,0,0,162,160,1,0,0,0,162,161,
        1,0,0,0,163,7,1,0,0,0,164,172,3,22,11,0,165,172,3,26,13,0,166,172,
        3,32,16,0,167,172,3,28,14,0,168,172,3,94,47,0,169,172,3,96,48,0,
        170,172,3,12,6,0,171,164,1,0,0,0,171,165,1,0,0,0,171,166,1,0,0,0,
        171,167,1,0,0,0,171,168,1,0,0,0,171,169,1,0,0,0,171,170,1,0,0,0,
        172,9,1,0,0,0,173,174,5,61,0,0,174,176,5,1,0,0,175,177,3,2,1,0,176,
        175,1,0,0,0,177,178,1,0,0,0,178,176,1,0,0,0,178,179,1,0,0,0,179,
        180,1,0,0,0,180,181,5,2,0,0,181,11,1,0,0,0,182,183,7,0,0,0,183,191,
        5,35,0,0,184,186,3,4,2,0,185,184,1,0,0,0,186,187,1,0,0,0,187,185,
        1,0,0,0,187,188,1,0,0,0,188,192,1,0,0,0,189,192,3,10,5,0,190,192,
        3,34,17,0,191,185,1,0,0,0,191,189,1,0,0,0,191,190,1,0,0,0,192,13,
        1,0,0,0,193,194,5,13,0,0,194,195,3,48,24,0,195,15,1,0,0,0,196,197,
        5,74,0,0,197,198,5,35,0,0,198,199,3,48,24,0,199,17,1,0,0,0,200,203,
        3,48,24,0,201,203,3,20,10,0,202,200,1,0,0,0,202,201,1,0,0,0,203,
        207,1,0,0,0,204,206,3,16,8,0,205,204,1,0,0,0,206,209,1,0,0,0,207,
        205,1,0,0,0,207,208,1,0,0,0,208,211,1,0,0,0,209,207,1,0,0,0,210,
        212,3,14,7,0,211,210,1,0,0,0,211,212,1,0,0,0,212,19,1,0,0,0,213,
        214,3,62,31,0,214,215,7,1,0,0,215,216,3,48,24,0,216,21,1,0,0,0,217,
        218,5,14,0,0,218,219,3,18,9,0,219,23,1,0,0,0,220,224,3,18,9,0,221,
        224,3,14,7,0,222,224,5,17,0,0,223,220,1,0,0,0,223,221,1,0,0,0,223,
        222,1,0,0,0,224,25,1,0,0,0,225,226,5,15,0,0,226,227,3,24,12,0,227,
        27,1,0,0,0,228,229,5,16,0,0,229,234,3,24,12,0,230,231,5,36,0,0,231,
        233,3,24,12,0,232,230,1,0,0,0,233,236,1,0,0,0,234,232,1,0,0,0,234,
        235,1,0,0,0,235,29,1,0,0,0,236,234,1,0,0,0,237,238,3,26,13,0,238,
        242,5,35,0,0,239,241,3,124,62,0,240,239,1,0,0,0,241,244,1,0,0,0,
        242,240,1,0,0,0,242,243,1,0,0,0,243,31,1,0,0,0,244,242,1,0,0,0,245,
        246,3,30,15,0,246,247,3,34,17,0,247,33,1,0,0,0,248,249,5,61,0,0,
        249,251,5,1,0,0,250,252,3,36,18,0,251,250,1,0,0,0,252,253,1,0,0,
        0,253,251,1,0,0,0,253,254,1,0,0,0,254,255,1,0,0,0,255,256,5,2,0,
        0,256,35,1,0,0,0,257,260,3,38,19,0,258,260,3,2,1,0,259,257,1,0,0,
        0,259,258,1,0,0,0,260,37,1,0,0,0,261,266,3,90,45,0,262,263,5,36,
        0,0,263,265,3,90,45,0,264,262,1,0,0,0,265,268,1,0,0,0,266,264,1,
        0,0,0,266,267,1,0,0,0,267,269,1,0,0,0,268,266,1,0,0,0,269,277,5,
        35,0,0,270,272,3,4,2,0,271,270,1,0,0,0,272,273,1,0,0,0,273,271,1,
        0,0,0,273,274,1,0,0,0,274,278,1,0,0,0,275,278,3,10,5,0,276,278,5,
        66,0,0,277,271,1,0,0,0,277,275,1,0,0,0,277,276,1,0,0,0,278,39,1,
        0,0,0,279,282,3,48,24,0,280,282,5,38,0,0,281,279,1,0,0,0,281,280,
        1,0,0,0,282,41,1,0,0,0,283,284,5,74,0,0,284,285,5,41,0,0,285,286,
        3,40,20,0,286,43,1,0,0,0,287,292,3,40,20,0,288,289,5,36,0,0,289,
        291,3,40,20,0,290,288,1,0,0,0,291,294,1,0,0,0,292,290,1,0,0,0,292,
        293,1,0,0,0,293,297,1,0,0,0,294,292,1,0,0,0,295,297,3,42,21,0,296,
        287,1,0,0,0,296,295,1,0,0,0,297,302,1,0,0,0,298,299,5,36,0,0,299,
        301,3,42,21,0,300,298,1,0,0,0,301,304,1,0,0,0,302,300,1,0,0,0,302,
        303,1,0,0,0,303,45,1,0,0,0,304,302,1,0,0,0,305,306,5,38,0,0,306,
        310,5,74,0,0,307,309,3,64,32,0,308,307,1,0,0,0,309,312,1,0,0,0,310,
        308,1,0,0,0,310,311,1,0,0,0,311,313,1,0,0,0,312,310,1,0,0,0,313,
        314,5,41,0,0,314,315,3,48,24,0,315,47,1,0,0,0,316,317,6,24,-1,0,
        317,318,5,64,0,0,318,319,3,48,24,0,319,320,5,65,0,0,320,342,1,0,
        0,0,321,342,3,72,36,0,322,323,7,2,0,0,323,342,3,48,24,8,324,335,
        5,39,0,0,325,330,3,48,24,0,326,327,5,36,0,0,327,329,3,48,24,0,328,
        326,1,0,0,0,329,332,1,0,0,0,330,328,1,0,0,0,330,331,1,0,0,0,331,
        334,1,0,0,0,332,330,1,0,0,0,333,325,1,0,0,0,334,337,1,0,0,0,335,
        333,1,0,0,0,335,336,1,0,0,0,336,338,1,0,0,0,337,335,1,0,0,0,338,
        342,5,40,0,0,339,342,3,50,25,0,340,342,3,62,31,0,341,316,1,0,0,0,
        341,321,1,0,0,0,341,322,1,0,0,0,341,324,1,0,0,0,341,339,1,0,0,0,
        341,340,1,0,0,0,342,357,1,0,0,0,343,344,10,6,0,0,344,345,7,3,0,0,
        345,356,3,48,24,7,346,347,10,5,0,0,347,348,7,4,0,0,348,356,3,48,
        24,6,349,350,10,4,0,0,350,351,7,5,0,0,351,356,3,48,24,5,352,353,
        10,3,0,0,353,354,7,6,0,0,354,356,3,48,24,4,355,343,1,0,0,0,355,346,
        1,0,0,0,355,349,1,0,0,0,355,352,1,0,0,0,356,359,1,0,0,0,357,355,
        1,0,0,0,357,358,1,0,0,0,358,49,1,0,0,0,359,357,1,0,0,0,360,362,5,
        51,0,0,361,360,1,0,0,0,361,362,1,0,0,0,362,363,1,0,0,0,363,364,7,
        7,0,0,364,51,1,0,0,0,365,366,5,21,0,0,366,367,5,74,0,0,367,369,5,
        64,0,0,368,370,3,56,28,0,369,368,1,0,0,0,369,370,1,0,0,0,370,371,
        1,0,0,0,371,372,5,65,0,0,372,373,5,35,0,0,373,374,5,61,0,0,374,376,
        5,1,0,0,375,377,3,54,27,0,376,375,1,0,0,0,377,378,1,0,0,0,378,376,
        1,0,0,0,378,379,1,0,0,0,379,380,1,0,0,0,380,381,5,2,0,0,381,53,1,
        0,0,0,382,385,3,2,1,0,383,385,3,58,29,0,384,382,1,0,0,0,384,383,
        1,0,0,0,385,55,1,0,0,0,386,396,5,74,0,0,387,388,5,36,0,0,388,390,
        5,74,0,0,389,387,1,0,0,0,390,393,1,0,0,0,391,389,1,0,0,0,391,392,
        1,0,0,0,392,397,1,0,0,0,393,391,1,0,0,0,394,395,5,41,0,0,395,397,
        3,50,25,0,396,391,1,0,0,0,396,394,1,0,0,0,397,404,1,0,0,0,398,399,
        5,36,0,0,399,400,5,74,0,0,400,401,5,41,0,0,401,403,3,50,25,0,402,
        398,1,0,0,0,403,406,1,0,0,0,404,402,1,0,0,0,404,405,1,0,0,0,405,
        57,1,0,0,0,406,404,1,0,0,0,407,408,5,20,0,0,408,409,3,48,24,0,409,
        59,1,0,0,0,410,412,5,50,0,0,411,410,1,0,0,0,411,412,1,0,0,0,412,
        413,1,0,0,0,413,415,5,52,0,0,414,416,3,48,24,0,415,414,1,0,0,0,415,
        416,1,0,0,0,416,61,1,0,0,0,417,419,3,60,30,0,418,417,1,0,0,0,418,
        419,1,0,0,0,419,420,1,0,0,0,420,424,5,74,0,0,421,423,3,64,32,0,422,
        421,1,0,0,0,423,426,1,0,0,0,424,422,1,0,0,0,424,425,1,0,0,0,425,
        63,1,0,0,0,426,424,1,0,0,0,427,429,5,64,0,0,428,430,3,44,22,0,429,
        428,1,0,0,0,429,430,1,0,0,0,430,431,1,0,0,0,431,439,5,65,0,0,432,
        433,5,37,0,0,433,439,5,74,0,0,434,435,5,39,0,0,435,436,3,48,24,0,
        436,437,5,40,0,0,437,439,1,0,0,0,438,427,1,0,0,0,438,432,1,0,0,0,
        438,434,1,0,0,0,439,65,1,0,0,0,440,441,3,90,45,0,441,442,5,35,0,
        0,442,443,3,10,5,0,443,67,1,0,0,0,444,445,5,61,0,0,445,448,5,1,0,
        0,446,449,3,88,44,0,447,449,5,61,0,0,448,446,1,0,0,0,448,447,1,0,
        0,0,449,450,1,0,0,0,450,448,1,0,0,0,450,451,1,0,0,0,451,452,1,0,
        0,0,452,453,5,2,0,0,453,69,1,0,0,0,454,455,5,61,0,0,455,458,5,1,
        0,0,456,459,5,61,0,0,457,459,3,86,43,0,458,456,1,0,0,0,458,457,1,
        0,0,0,459,460,1,0,0,0,460,458,1,0,0,0,460,461,1,0,0,0,461,462,1,
        0,0,0,462,463,5,2,0,0,463,71,1,0,0,0,464,465,5,5,0,0,465,466,5,35,
        0,0,466,497,3,68,34,0,467,468,5,8,0,0,468,469,5,35,0,0,469,497,3,
        68,34,0,470,471,5,9,0,0,471,472,5,35,0,0,472,497,3,68,34,0,473,474,
        5,10,0,0,474,475,5,35,0,0,475,497,3,78,39,0,476,480,5,6,0,0,477,
        478,5,64,0,0,478,479,5,74,0,0,479,481,5,65,0,0,480,477,1,0,0,0,480,
        481,1,0,0,0,481,482,1,0,0,0,482,483,5,35,0,0,483,497,3,70,35,0,484,
        485,5,7,0,0,485,486,5,35,0,0,486,487,5,61,0,0,487,491,5,1,0,0,488,
        492,3,88,44,0,489,492,3,66,33,0,490,492,5,61,0,0,491,488,1,0,0,0,
        491,489,1,0,0,0,491,490,1,0,0,0,492,493,1,0,0,0,493,491,1,0,0,0,
        493,494,1,0,0,0,494,495,1,0,0,0,495,497,5,2,0,0,496,464,1,0,0,0,
        496,467,1,0,0,0,496,470,1,0,0,0,496,473,1,0,0,0,496,476,1,0,0,0,
        496,484,1,0,0,0,497,73,1,0,0,0,498,500,5,34,0,0,499,501,3,48,24,
        0,500,499,1,0,0,0,501,502,1,0,0,0,502,500,1,0,0,0,502,503,1,0,0,
        0,503,504,1,0,0,0,504,505,5,35,0,0,505,506,3,10,5,0,506,75,1,0,0,
        0,507,512,3,20,10,0,508,512,3,6,3,0,509,512,3,62,31,0,510,512,3,
        74,37,0,511,507,1,0,0,0,511,508,1,0,0,0,511,509,1,0,0,0,511,510,
        1,0,0,0,512,77,1,0,0,0,513,514,5,61,0,0,514,517,5,1,0,0,515,518,
        3,76,38,0,516,518,5,61,0,0,517,515,1,0,0,0,517,516,1,0,0,0,518,519,
        1,0,0,0,519,517,1,0,0,0,519,520,1,0,0,0,520,521,1,0,0,0,521,522,
        5,2,0,0,522,79,1,0,0,0,523,525,5,11,0,0,524,526,3,48,24,0,525,524,
        1,0,0,0,525,526,1,0,0,0,526,527,1,0,0,0,527,528,5,35,0,0,528,529,
        3,10,5,0,529,81,1,0,0,0,530,531,5,29,0,0,531,532,5,28,0,0,532,533,
        3,48,24,0,533,534,5,35,0,0,534,535,3,70,35,0,535,83,1,0,0,0,536,
        537,5,29,0,0,537,538,5,35,0,0,538,539,3,70,35,0,539,85,1,0,0,0,540,
        541,5,24,0,0,541,546,5,74,0,0,542,543,5,36,0,0,543,545,5,74,0,0,
        544,542,1,0,0,0,545,548,1,0,0,0,546,544,1,0,0,0,546,547,1,0,0,0,
        547,549,1,0,0,0,548,546,1,0,0,0,549,550,5,25,0,0,550,551,3,48,24,
        0,551,552,5,35,0,0,552,553,3,70,35,0,553,578,1,0,0,0,554,555,5,28,
        0,0,555,556,3,48,24,0,556,557,5,35,0,0,557,561,3,70,35,0,558,560,
        3,82,41,0,559,558,1,0,0,0,560,563,1,0,0,0,561,559,1,0,0,0,561,562,
        1,0,0,0,562,565,1,0,0,0,563,561,1,0,0,0,564,566,3,84,42,0,565,564,
        1,0,0,0,565,566,1,0,0,0,566,578,1,0,0,0,567,568,7,8,0,0,568,575,
        5,35,0,0,569,576,3,44,22,0,570,571,5,64,0,0,571,572,3,44,22,0,572,
        573,5,65,0,0,573,576,1,0,0,0,574,576,3,68,34,0,575,569,1,0,0,0,575,
        570,1,0,0,0,575,574,1,0,0,0,576,578,1,0,0,0,577,540,1,0,0,0,577,
        554,1,0,0,0,577,567,1,0,0,0,578,87,1,0,0,0,579,584,3,90,45,0,580,
        581,5,36,0,0,581,583,3,90,45,0,582,580,1,0,0,0,583,586,1,0,0,0,584,
        582,1,0,0,0,584,585,1,0,0,0,585,587,1,0,0,0,586,584,1,0,0,0,587,
        588,5,35,0,0,588,589,3,92,46,0,589,89,1,0,0,0,590,591,7,9,0,0,591,
        91,1,0,0,0,592,613,3,68,34,0,593,598,3,48,24,0,594,595,5,36,0,0,
        595,597,3,48,24,0,596,594,1,0,0,0,597,600,1,0,0,0,598,596,1,0,0,
        0,598,599,1,0,0,0,599,613,1,0,0,0,600,598,1,0,0,0,601,602,5,64,0,
        0,602,607,3,48,24,0,603,604,5,36,0,0,604,606,3,48,24,0,605,603,1,
        0,0,0,606,609,1,0,0,0,607,605,1,0,0,0,607,608,1,0,0,0,608,610,1,
        0,0,0,609,607,1,0,0,0,610,611,5,65,0,0,611,613,1,0,0,0,612,592,1,
        0,0,0,612,593,1,0,0,0,612,601,1,0,0,0,613,93,1,0,0,0,614,618,5,12,
        0,0,615,616,5,51,0,0,616,618,5,51,0,0,617,614,1,0,0,0,617,615,1,
        0,0,0,618,623,1,0,0,0,619,621,5,74,0,0,620,622,3,48,24,0,621,620,
        1,0,0,0,621,622,1,0,0,0,622,624,1,0,0,0,623,619,1,0,0,0,624,625,
        1,0,0,0,625,623,1,0,0,0,625,626,1,0,0,0,626,95,1,0,0,0,627,628,5,
        17,0,0,628,629,3,48,24,0,629,97,1,0,0,0,630,631,5,22,0,0,631,633,
        5,73,0,0,632,634,3,124,62,0,633,632,1,0,0,0,633,634,1,0,0,0,634,
        653,1,0,0,0,635,636,5,23,0,0,636,637,5,73,0,0,637,647,5,22,0,0,638,
        648,5,53,0,0,639,644,5,74,0,0,640,641,5,36,0,0,641,643,5,74,0,0,
        642,640,1,0,0,0,643,646,1,0,0,0,644,642,1,0,0,0,644,645,1,0,0,0,
        645,648,1,0,0,0,646,644,1,0,0,0,647,638,1,0,0,0,647,639,1,0,0,0,
        648,650,1,0,0,0,649,651,3,124,62,0,650,649,1,0,0,0,650,651,1,0,0,
        0,651,653,1,0,0,0,652,630,1,0,0,0,652,635,1,0,0,0,653,99,1,0,0,0,
        654,656,7,10,0,0,655,657,3,48,24,0,656,655,1,0,0,0,656,657,1,0,0,
        0,657,661,1,0,0,0,658,660,5,74,0,0,659,658,1,0,0,0,660,663,1,0,0,
        0,661,659,1,0,0,0,661,662,1,0,0,0,662,664,1,0,0,0,663,661,1,0,0,
        0,664,666,5,35,0,0,665,667,3,10,5,0,666,665,1,0,0,0,666,667,1,0,
        0,0,667,101,1,0,0,0,668,669,5,28,0,0,669,670,3,48,24,0,670,671,5,
        35,0,0,671,675,3,10,5,0,672,674,3,104,52,0,673,672,1,0,0,0,674,677,
        1,0,0,0,675,673,1,0,0,0,675,676,1,0,0,0,676,679,1,0,0,0,677,675,
        1,0,0,0,678,680,3,106,53,0,679,678,1,0,0,0,679,680,1,0,0,0,680,103,
        1,0,0,0,681,682,5,29,0,0,682,683,5,28,0,0,683,684,3,48,24,0,684,
        685,5,35,0,0,685,686,3,10,5,0,686,105,1,0,0,0,687,688,5,29,0,0,688,
        689,5,35,0,0,689,690,3,10,5,0,690,107,1,0,0,0,691,692,5,26,0,0,692,
        693,3,48,24,0,693,694,5,35,0,0,694,695,3,10,5,0,695,109,1,0,0,0,
        696,697,5,24,0,0,697,702,5,74,0,0,698,699,5,36,0,0,699,701,5,74,
        0,0,700,698,1,0,0,0,701,704,1,0,0,0,702,700,1,0,0,0,702,703,1,0,
        0,0,703,705,1,0,0,0,704,702,1,0,0,0,705,706,5,25,0,0,706,707,3,48,
        24,0,707,708,5,35,0,0,708,709,3,10,5,0,709,111,1,0,0,0,710,711,5,
        33,0,0,711,712,5,35,0,0,712,717,3,48,24,0,713,714,5,36,0,0,714,716,
        3,48,24,0,715,713,1,0,0,0,716,719,1,0,0,0,717,715,1,0,0,0,717,718,
        1,0,0,0,718,720,1,0,0,0,719,717,1,0,0,0,720,721,5,35,0,0,721,722,
        3,116,58,0,722,113,1,0,0,0,723,724,7,11,0,0,724,115,1,0,0,0,725,
        726,5,61,0,0,726,728,5,1,0,0,727,729,3,118,59,0,728,727,1,0,0,0,
        729,730,1,0,0,0,730,728,1,0,0,0,730,731,1,0,0,0,731,732,1,0,0,0,
        732,733,5,2,0,0,733,117,1,0,0,0,734,738,3,120,60,0,735,738,3,122,
        61,0,736,738,5,61,0,0,737,734,1,0,0,0,737,735,1,0,0,0,737,736,1,
        0,0,0,738,119,1,0,0,0,739,740,3,114,57,0,740,741,5,35,0,0,741,749,
        3,48,24,0,742,743,5,36,0,0,743,744,3,114,57,0,744,745,5,35,0,0,745,
        746,3,48,24,0,746,748,1,0,0,0,747,742,1,0,0,0,748,751,1,0,0,0,749,
        747,1,0,0,0,749,750,1,0,0,0,750,756,1,0,0,0,751,749,1,0,0,0,752,
        753,5,36,0,0,753,755,3,114,57,0,754,752,1,0,0,0,755,758,1,0,0,0,
        756,754,1,0,0,0,756,757,1,0,0,0,757,759,1,0,0,0,758,756,1,0,0,0,
        759,769,5,35,0,0,760,770,3,116,58,0,761,766,3,48,24,0,762,763,5,
        36,0,0,763,765,3,48,24,0,764,762,1,0,0,0,765,768,1,0,0,0,766,764,
        1,0,0,0,766,767,1,0,0,0,767,770,1,0,0,0,768,766,1,0,0,0,769,760,
        1,0,0,0,769,761,1,0,0,0,770,121,1,0,0,0,771,772,3,114,57,0,772,782,
        5,35,0,0,773,783,3,116,58,0,774,779,3,48,24,0,775,776,5,36,0,0,776,
        778,3,48,24,0,777,775,1,0,0,0,778,781,1,0,0,0,779,777,1,0,0,0,779,
        780,1,0,0,0,780,783,1,0,0,0,781,779,1,0,0,0,782,773,1,0,0,0,782,
        774,1,0,0,0,783,123,1,0,0,0,784,788,5,68,0,0,785,787,7,12,0,0,786,
        785,1,0,0,0,787,790,1,0,0,0,788,786,1,0,0,0,788,789,1,0,0,0,789,
        125,1,0,0,0,790,788,1,0,0,0,90,128,130,136,143,155,162,171,178,187,
        191,202,207,211,223,234,242,253,259,266,273,277,281,292,296,302,
        310,330,335,341,355,357,361,369,378,384,391,396,404,411,415,418,
        424,429,438,448,450,458,460,480,491,493,496,502,511,517,519,525,
        546,561,565,575,577,584,598,607,612,617,621,625,633,644,647,650,
        652,656,661,666,675,679,702,717,730,737,749,756,766,769,779,782,
        788
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


export class Callable_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.ID, 0)!;
    }
    public net_namespace_expr(): Net_namespace_exprContext | null {
        return this.getRuleContext(0, Net_namespace_exprContext);
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
    public LParen(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.LParen, 0);
    }
    public RParen(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.RParen, 0);
    }
    public parameters(): ParametersContext | null {
        return this.getRuleContext(0, ParametersContext);
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
