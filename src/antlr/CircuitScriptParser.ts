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
    public static readonly Wire = 8;
    public static readonly Pin = 9;
    public static readonly Add = 10;
    public static readonly At = 11;
    public static readonly To = 12;
    public static readonly Point = 13;
    public static readonly Join = 14;
    public static readonly Parallel = 15;
    public static readonly Return = 16;
    public static readonly Define = 17;
    public static readonly Import = 18;
    public static readonly From = 19;
    public static readonly For = 20;
    public static readonly In = 21;
    public static readonly While = 22;
    public static readonly Continue = 23;
    public static readonly If = 24;
    public static readonly Else = 25;
    public static readonly Not = 26;
    public static readonly Frame = 27;
    public static readonly Sheet = 28;
    public static readonly Set = 29;
    public static readonly Colon = 30;
    public static readonly Comma = 31;
    public static readonly Dot = 32;
    public static readonly DoubleDot = 33;
    public static readonly LSquare = 34;
    public static readonly RSquare = 35;
    public static readonly Assign = 36;
    public static readonly Equals = 37;
    public static readonly NotEquals = 38;
    public static readonly GreaterThan = 39;
    public static readonly GreatOrEqualThan = 40;
    public static readonly LessThan = 41;
    public static readonly LessOrEqualThan = 42;
    public static readonly LogicalAnd = 43;
    public static readonly LogicalOr = 44;
    public static readonly Addition = 45;
    public static readonly Minus = 46;
    public static readonly Divide = 47;
    public static readonly Multiply = 48;
    public static readonly Modulus = 49;
    public static readonly AdditionAssign = 50;
    public static readonly MinusAssign = 51;
    public static readonly DivideAssign = 52;
    public static readonly MultiplyAssign = 53;
    public static readonly ModulusAssign = 54;
    public static readonly LINE_CONTINUATION = 55;
    public static readonly NEWLINE = 56;
    public static readonly WS = 57;
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
    public static readonly RULE_keyword_assignment_expr = 20;
    public static readonly RULE_parameters = 21;
    public static readonly RULE_double_dot_property_set_expr = 22;
    public static readonly RULE_data_expr = 23;
    public static readonly RULE_value_expr = 24;
    public static readonly RULE_function_def_expr = 25;
    public static readonly RULE_function_expr = 26;
    public static readonly RULE_function_args_expr = 27;
    public static readonly RULE_function_return_expr = 28;
    public static readonly RULE_net_namespace_expr = 29;
    public static readonly RULE_callable_expr = 30;
    public static readonly RULE_trailer = 31;
    public static readonly RULE_property_block_expr = 32;
    public static readonly RULE_properties_block = 33;
    public static readonly RULE_graphic_expressions_block = 34;
    public static readonly RULE_create_expr = 35;
    public static readonly RULE_graphic_expr = 36;
    public static readonly RULE_property_expr = 37;
    public static readonly RULE_property_key_expr = 38;
    public static readonly RULE_property_value_expr = 39;
    public static readonly RULE_wire_expr = 40;
    public static readonly RULE_point_expr = 41;
    public static readonly RULE_import_expr = 42;
    public static readonly RULE_frame_expr = 43;
    public static readonly RULE_if_expr = 44;
    public static readonly RULE_if_inner_expr = 45;
    public static readonly RULE_else_expr = 46;
    public static readonly RULE_while_expr = 47;
    public static readonly RULE_for_expr = 48;
    public static readonly RULE_part_set_expr = 49;
    public static readonly RULE_part_set_key = 50;
    public static readonly RULE_part_match_block = 51;
    public static readonly RULE_part_sub_expr = 52;
    public static readonly RULE_part_condition_expr = 53;
    public static readonly RULE_part_value_expr = 54;
    public static readonly RULE_annotation_comment_expr = 55;

    public static readonly literalNames = [
        null, null, null, "'break'", "'branch'", null, null, null, "'wire'", 
        "'pin'", "'add'", "'at'", "'to'", "'point'", "'join'", "'parallel'", 
        "'return'", "'def'", "'import'", "'from'", "'for'", "'in'", "'while'", 
        "'continue'", "'if'", "'else'", null, "'frame'", "'sheet'", "'set'", 
        "':'", "','", "'.'", "'..'", "'['", "']'", "'='", "'=='", "'!='", 
        "'>'", "'>='", "'<'", "'<='", null, null, "'+'", "'-'", "'/'", "'*'", 
        "'%'", "'+='", "'-='", "'/='", "'*='", "'%='", null, null, null, 
        null, "'('", "')'", null, null, "'#='"
    ];

    public static readonly symbolicNames = [
        null, "INDENT", "DEDENT", "Break", "Branch", "CreateComponent", 
        "CreateGraphic", "CreateModule", "Wire", "Pin", "Add", "At", "To", 
        "Point", "Join", "Parallel", "Return", "Define", "Import", "From", 
        "For", "In", "While", "Continue", "If", "Else", "Not", "Frame", 
        "Sheet", "Set", "Colon", "Comma", "Dot", "DoubleDot", "LSquare", 
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
        "at_block_expressions_inner", "at_block_pin_expr", "keyword_assignment_expr", 
        "parameters", "double_dot_property_set_expr", "data_expr", "value_expr", 
        "function_def_expr", "function_expr", "function_args_expr", "function_return_expr", 
        "net_namespace_expr", "callable_expr", "trailer", "property_block_expr", 
        "properties_block", "graphic_expressions_block", "create_expr", 
        "graphic_expr", "property_expr", "property_key_expr", "property_value_expr", 
        "wire_expr", "point_expr", "import_expr", "frame_expr", "if_expr", 
        "if_inner_expr", "else_expr", "while_expr", "for_expr", "part_set_expr", 
        "part_set_key", "part_match_block", "part_sub_expr", "part_condition_expr", 
        "part_value_expr", "annotation_comment_expr",
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
            this.state = 116;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 1, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    this.state = 114;
                    this.errorHandler.sync(this);
                    switch (this.tokenStream.LA(1)) {
                    case CircuitScriptParser.Import:
                    case CircuitScriptParser.From:
                        {
                        this.state = 112;
                        this.import_expr();
                        }
                        break;
                    case CircuitScriptParser.NEWLINE:
                        {
                        this.state = 113;
                        this.match(CircuitScriptParser.NEWLINE);
                        }
                        break;
                    default:
                        throw new antlr.NoViableAltException(this);
                    }
                    }
                }
                this.state = 118;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 1, this.context);
            }
            this.state = 122;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 3)) & ~0x1F) === 0 && ((1 << (_la - 3)) & 1195007907) !== 0) || ((((_la - 45)) & ~0x1F) === 0 && ((1 << (_la - 45)) & 17041415) !== 0)) {
                {
                {
                this.state = 119;
                this.expression();
                }
                }
                this.state = 124;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 125;
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
            this.state = 129;
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
            case CircuitScriptParser.Minus:
            case CircuitScriptParser.Divide:
            case CircuitScriptParser.ANNOTATION_START:
            case CircuitScriptParser.ID:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 127;
                this.non_newline_expression();
                }
                break;
            case CircuitScriptParser.NEWLINE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 128;
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
            this.state = 140;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 4, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 131;
                this.flow_expressions();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 132;
                this.graph_expressions();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 133;
                this.function_def_expr();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 134;
                this.frame_expr();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 135;
                this.part_set_expr();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 136;
                this.annotation_comment_expr();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 137;
                this.double_dot_property_set_expr();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 138;
                this.assignment_expr();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 139;
                this.callable_expr();
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
            this.state = 147;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.If:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 142;
                this.if_expr();
                }
                break;
            case CircuitScriptParser.While:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 143;
                this.while_expr();
                }
                break;
            case CircuitScriptParser.For:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 144;
                this.for_expr();
                }
                break;
            case CircuitScriptParser.Break:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 145;
                this.match(CircuitScriptParser.Break);
                }
                break;
            case CircuitScriptParser.Continue:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 146;
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
            this.state = 156;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 6, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 149;
                this.add_component_expr();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 150;
                this.at_component_expr();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 151;
                this.at_block();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 152;
                this.to_component_expr();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 153;
                this.wire_expr();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 154;
                this.point_expr();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 155;
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
            this.state = 158;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 159;
            this.match(CircuitScriptParser.INDENT);
            this.state = 161;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 160;
                this.expression();
                }
                }
                this.state = 163;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 3)) & ~0x1F) === 0 && ((1 << (_la - 3)) & 1195007907) !== 0) || ((((_la - 45)) & ~0x1F) === 0 && ((1 << (_la - 45)) & 17041415) !== 0));
            this.state = 165;
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
            this.state = 167;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 57360) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 168;
            this.match(CircuitScriptParser.Colon);
            this.state = 176;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 9, this.context) ) {
            case 1:
                {
                this.state = 170;
                this.errorHandler.sync(this);
                alternative = 1;
                do {
                    switch (alternative) {
                    case 1:
                        {
                        {
                        this.state = 169;
                        this.non_newline_expression();
                        }
                        }
                        break;
                    default:
                        throw new antlr.NoViableAltException(this);
                    }
                    this.state = 172;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 8, this.context);
                } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                }
                break;
            case 2:
                {
                this.state = 174;
                this.expressions_block();
                }
                break;
            case 3:
                {
                this.state = 175;
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
            this.state = 178;
            this.match(CircuitScriptParser.Pin);
            this.state = 179;
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
            this.state = 181;
            this.match(CircuitScriptParser.ID);
            this.state = 182;
            this.match(CircuitScriptParser.Colon);
            this.state = 183;
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
            this.state = 187;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 10, this.context) ) {
            case 1:
                {
                this.state = 185;
                this.data_expr(0);
                }
                break;
            case 2:
                {
                this.state = 186;
                this.assignment_expr();
                }
                break;
            }
            this.state = 192;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 11, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 189;
                    this.component_modifier_expr();
                    }
                    }
                }
                this.state = 194;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 11, this.context);
            }
            this.state = 196;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 9) {
                {
                this.state = 195;
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
            this.state = 198;
            this.callable_expr();
            this.state = 199;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & 507905) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 200;
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
            this.state = 202;
            this.match(CircuitScriptParser.Add);
            this.state = 203;
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
            this.state = 208;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.CreateComponent:
            case CircuitScriptParser.CreateGraphic:
            case CircuitScriptParser.CreateModule:
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
                this.state = 205;
                this.data_expr_with_assignment();
                }
                break;
            case CircuitScriptParser.Pin:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 206;
                this.pin_select_expr();
                }
                break;
            case CircuitScriptParser.Point:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 207;
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
            this.state = 210;
            this.match(CircuitScriptParser.At);
            this.state = 211;
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
            this.state = 213;
            this.match(CircuitScriptParser.To);
            this.state = 214;
            this.component_select_expr();
            this.state = 219;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 31) {
                {
                {
                this.state = 215;
                this.match(CircuitScriptParser.Comma);
                this.state = 216;
                this.component_select_expr();
                }
                }
                this.state = 221;
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
            this.state = 222;
            this.at_component_expr();
            this.state = 223;
            this.match(CircuitScriptParser.Colon);
            this.state = 227;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 63) {
                {
                {
                this.state = 224;
                this.annotation_comment_expr();
                }
                }
                this.state = 229;
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
            this.state = 230;
            this.at_block_header();
            this.state = 231;
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
            this.state = 233;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 234;
            this.match(CircuitScriptParser.INDENT);
            this.state = 236;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 235;
                this.at_block_expressions_inner();
                }
                }
                this.state = 238;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 3)) & ~0x1F) === 0 && ((1 << (_la - 3)) & 1195007907) !== 0) || ((((_la - 45)) & ~0x1F) === 0 && ((1 << (_la - 45)) & 25954311) !== 0));
            this.state = 240;
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
            this.state = 244;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 17, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 242;
                this.at_block_pin_expr();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 243;
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
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 246;
            this.property_key_expr();
            this.state = 247;
            this.match(CircuitScriptParser.Colon);
            this.state = 255;
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
            case CircuitScriptParser.Minus:
            case CircuitScriptParser.Divide:
            case CircuitScriptParser.ANNOTATION_START:
            case CircuitScriptParser.ID:
                {
                this.state = 249;
                this.errorHandler.sync(this);
                alternative = 1;
                do {
                    switch (alternative) {
                    case 1:
                        {
                        {
                        this.state = 248;
                        this.non_newline_expression();
                        }
                        }
                        break;
                    default:
                        throw new antlr.NoViableAltException(this);
                    }
                    this.state = 251;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 18, this.context);
                } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
                }
                break;
            case CircuitScriptParser.NEWLINE:
                {
                this.state = 253;
                this.expressions_block();
                }
                break;
            case CircuitScriptParser.NOT_CONNECTED:
                {
                this.state = 254;
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
    public keyword_assignment_expr(): Keyword_assignment_exprContext {
        let localContext = new Keyword_assignment_exprContext(this.context, this.state);
        this.enterRule(localContext, 40, CircuitScriptParser.RULE_keyword_assignment_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 257;
            this.match(CircuitScriptParser.ID);
            this.state = 258;
            this.match(CircuitScriptParser.Assign);
            this.state = 259;
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
        this.enterRule(localContext, 42, CircuitScriptParser.RULE_parameters);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 270;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 21, this.context) ) {
            case 1:
                {
                {
                this.state = 261;
                this.data_expr(0);
                this.state = 266;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 20, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 262;
                        this.match(CircuitScriptParser.Comma);
                        this.state = 263;
                        this.data_expr(0);
                        }
                        }
                    }
                    this.state = 268;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 20, this.context);
                }
                }
                }
                break;
            case 2:
                {
                this.state = 269;
                this.keyword_assignment_expr();
                }
                break;
            }
            this.state = 276;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 31) {
                {
                {
                this.state = 272;
                this.match(CircuitScriptParser.Comma);
                this.state = 273;
                this.keyword_assignment_expr();
                }
                }
                this.state = 278;
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
        this.enterRule(localContext, 44, CircuitScriptParser.RULE_double_dot_property_set_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 279;
            this.match(CircuitScriptParser.DoubleDot);
            this.state = 280;
            this.match(CircuitScriptParser.ID);
            this.state = 284;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 134217733) !== 0)) {
                {
                {
                this.state = 281;
                this.trailer();
                }
                }
                this.state = 286;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 287;
            this.match(CircuitScriptParser.Assign);
            this.state = 288;
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
        let _startState = 46;
        this.enterRecursionRule(localContext, 46, CircuitScriptParser.RULE_data_expr, _p);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 315;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 26, this.context) ) {
            case 1:
                {
                localContext = new RoundedBracketsExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;

                this.state = 291;
                this.match(CircuitScriptParser.LParen);
                this.state = 292;
                this.data_expr(0);
                this.state = 293;
                this.match(CircuitScriptParser.RParen);
                }
                break;
            case 2:
                {
                localContext = new CreateExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 295;
                this.create_expr();
                }
                break;
            case 3:
                {
                localContext = new UnaryOperatorExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 296;
                _la = this.tokenStream.LA(1);
                if(!(_la === 26 || _la === 46)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 297;
                this.data_expr(8);
                }
                break;
            case 4:
                {
                localContext = new ArrayExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 298;
                this.match(CircuitScriptParser.LSquare);
                this.state = 309;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (((((_la - 5)) & ~0x1F) === 0 && ((1 << (_la - 5)) & 538968071) !== 0) || ((((_la - 45)) & ~0x1F) === 0 && ((1 << (_la - 45)) & 33177607) !== 0)) {
                    {
                    {
                    this.state = 299;
                    this.data_expr(0);
                    this.state = 304;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 31) {
                        {
                        {
                        this.state = 300;
                        this.match(CircuitScriptParser.Comma);
                        this.state = 301;
                        this.data_expr(0);
                        }
                        }
                        this.state = 306;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    }
                    }
                    this.state = 311;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 312;
                this.match(CircuitScriptParser.RSquare);
                }
                break;
            case 5:
                {
                localContext = new ValueExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 313;
                this.value_expr();
                }
                break;
            case 6:
                {
                localContext = new CallableExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 314;
                this.callable_expr();
                }
                break;
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 331;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 28, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 329;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 27, this.context) ) {
                    case 1:
                        {
                        localContext = new MultiplyExprContext(new Data_exprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CircuitScriptParser.RULE_data_expr);
                        this.state = 317;
                        if (!(this.precpred(this.context, 6))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 6)");
                        }
                        this.state = 318;
                        _la = this.tokenStream.LA(1);
                        if(!(((((_la - 47)) & ~0x1F) === 0 && ((1 << (_la - 47)) & 7) !== 0))) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 319;
                        this.data_expr(7);
                        }
                        break;
                    case 2:
                        {
                        localContext = new AdditionExprContext(new Data_exprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CircuitScriptParser.RULE_data_expr);
                        this.state = 320;
                        if (!(this.precpred(this.context, 5))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 5)");
                        }
                        this.state = 321;
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 45 || _la === 46)) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 322;
                        this.data_expr(6);
                        }
                        break;
                    case 3:
                        {
                        localContext = new BinaryOperatorExprContext(new Data_exprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CircuitScriptParser.RULE_data_expr);
                        this.state = 323;
                        if (!(this.precpred(this.context, 4))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 4)");
                        }
                        this.state = 324;
                        _la = this.tokenStream.LA(1);
                        if(!(((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 63) !== 0))) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 325;
                        this.data_expr(5);
                        }
                        break;
                    case 4:
                        {
                        localContext = new LogicalOperatorExprContext(new Data_exprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CircuitScriptParser.RULE_data_expr);
                        this.state = 326;
                        if (!(this.precpred(this.context, 3))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 3)");
                        }
                        this.state = 327;
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 43 || _la === 44)) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 328;
                        this.data_expr(4);
                        }
                        break;
                    }
                    }
                }
                this.state = 333;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 28, this.context);
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
        this.enterRule(localContext, 48, CircuitScriptParser.RULE_value_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 335;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 46) {
                {
                this.state = 334;
                this.match(CircuitScriptParser.Minus);
                }
            }

            this.state = 337;
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
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 50, CircuitScriptParser.RULE_function_def_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 339;
            this.match(CircuitScriptParser.Define);
            this.state = 340;
            this.match(CircuitScriptParser.ID);
            this.state = 341;
            this.match(CircuitScriptParser.LParen);
            this.state = 343;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 69) {
                {
                this.state = 342;
                this.function_args_expr();
                }
            }

            this.state = 345;
            this.match(CircuitScriptParser.RParen);
            this.state = 346;
            this.match(CircuitScriptParser.Colon);
            this.state = 347;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 348;
            this.match(CircuitScriptParser.INDENT);
            this.state = 350;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 349;
                this.function_expr();
                }
                }
                this.state = 352;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 3)) & ~0x1F) === 0 && ((1 << (_la - 3)) & 1195016099) !== 0) || ((((_la - 45)) & ~0x1F) === 0 && ((1 << (_la - 45)) & 17041415) !== 0));
            this.state = 354;
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
        this.enterRule(localContext, 52, CircuitScriptParser.RULE_function_expr);
        try {
            this.state = 358;
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
            case CircuitScriptParser.Minus:
            case CircuitScriptParser.Divide:
            case CircuitScriptParser.NEWLINE:
            case CircuitScriptParser.ANNOTATION_START:
            case CircuitScriptParser.ID:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 356;
                this.expression();
                }
                break;
            case CircuitScriptParser.Return:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 357;
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
        this.enterRule(localContext, 54, CircuitScriptParser.RULE_function_args_expr);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 360;
            this.match(CircuitScriptParser.ID);
            this.state = 370;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.Comma:
            case CircuitScriptParser.RParen:
                {
                this.state = 365;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 33, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 361;
                        this.match(CircuitScriptParser.Comma);
                        this.state = 362;
                        this.match(CircuitScriptParser.ID);
                        }
                        }
                    }
                    this.state = 367;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 33, this.context);
                }
                }
                break;
            case CircuitScriptParser.Assign:
                {
                {
                this.state = 368;
                this.match(CircuitScriptParser.Assign);
                this.state = 369;
                this.value_expr();
                }
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.state = 378;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 31) {
                {
                {
                this.state = 372;
                this.match(CircuitScriptParser.Comma);
                this.state = 373;
                this.match(CircuitScriptParser.ID);
                this.state = 374;
                this.match(CircuitScriptParser.Assign);
                this.state = 375;
                this.value_expr();
                }
                }
                this.state = 380;
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
        this.enterRule(localContext, 56, CircuitScriptParser.RULE_function_return_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 381;
            this.match(CircuitScriptParser.Return);
            this.state = 382;
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
        this.enterRule(localContext, 58, CircuitScriptParser.RULE_net_namespace_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 385;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 45) {
                {
                this.state = 384;
                this.match(CircuitScriptParser.Addition);
                }
            }

            this.state = 387;
            this.match(CircuitScriptParser.Divide);
            this.state = 389;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 37, this.context) ) {
            case 1:
                {
                this.state = 388;
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
        this.enterRule(localContext, 60, CircuitScriptParser.RULE_callable_expr);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 392;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 45 || _la === 47) {
                {
                this.state = 391;
                this.net_namespace_expr();
                }
            }

            this.state = 394;
            this.match(CircuitScriptParser.ID);
            this.state = 398;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 39, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 395;
                    this.trailer();
                    }
                    }
                }
                this.state = 400;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 39, this.context);
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
        this.enterRule(localContext, 62, CircuitScriptParser.RULE_trailer);
        let _la: number;
        try {
            this.state = 412;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.LParen:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 401;
                this.match(CircuitScriptParser.LParen);
                this.state = 403;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (((((_la - 5)) & ~0x1F) === 0 && ((1 << (_la - 5)) & 538968071) !== 0) || ((((_la - 45)) & ~0x1F) === 0 && ((1 << (_la - 45)) & 33177607) !== 0)) {
                    {
                    this.state = 402;
                    this.parameters();
                    }
                }

                this.state = 405;
                this.match(CircuitScriptParser.RParen);
                }
                break;
            case CircuitScriptParser.Dot:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 406;
                this.match(CircuitScriptParser.Dot);
                this.state = 407;
                this.match(CircuitScriptParser.ID);
                }
                break;
            case CircuitScriptParser.LSquare:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 408;
                this.match(CircuitScriptParser.LSquare);
                this.state = 409;
                this.data_expr(0);
                this.state = 410;
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
        this.enterRule(localContext, 64, CircuitScriptParser.RULE_property_block_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 414;
            this.property_key_expr();
            this.state = 415;
            this.match(CircuitScriptParser.Colon);
            this.state = 416;
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
        this.enterRule(localContext, 66, CircuitScriptParser.RULE_properties_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 418;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 419;
            this.match(CircuitScriptParser.INDENT);
            this.state = 422;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 422;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.INTEGER_VALUE:
                case CircuitScriptParser.STRING_VALUE:
                case CircuitScriptParser.ID:
                    {
                    this.state = 420;
                    this.property_expr();
                    }
                    break;
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 421;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 424;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 12545) !== 0));
            this.state = 426;
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
        this.enterRule(localContext, 68, CircuitScriptParser.RULE_graphic_expressions_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 428;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 429;
            this.match(CircuitScriptParser.INDENT);
            this.state = 432;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 432;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 430;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case CircuitScriptParser.Pin:
                case CircuitScriptParser.For:
                case CircuitScriptParser.ID:
                    {
                    this.state = 431;
                    this.graphic_expr();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 434;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 9 || _la === 20 || _la === 56 || _la === 69);
            this.state = 436;
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
        this.enterRule(localContext, 70, CircuitScriptParser.RULE_create_expr);
        let _la: number;
        try {
            this.state = 461;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.CreateComponent:
                localContext = new CreateComponentExprContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 438;
                this.match(CircuitScriptParser.CreateComponent);
                this.state = 439;
                this.match(CircuitScriptParser.Colon);
                this.state = 440;
                this.properties_block();
                }
                break;
            case CircuitScriptParser.CreateGraphic:
                localContext = new CreateGraphicExprContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 441;
                this.match(CircuitScriptParser.CreateGraphic);
                this.state = 445;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 59) {
                    {
                    this.state = 442;
                    this.match(CircuitScriptParser.LParen);
                    this.state = 443;
                    this.match(CircuitScriptParser.ID);
                    this.state = 444;
                    this.match(CircuitScriptParser.RParen);
                    }
                }

                this.state = 447;
                this.match(CircuitScriptParser.Colon);
                this.state = 448;
                this.graphic_expressions_block();
                }
                break;
            case CircuitScriptParser.CreateModule:
                localContext = new CreateModuleExprContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 449;
                this.match(CircuitScriptParser.CreateModule);
                this.state = 450;
                this.match(CircuitScriptParser.Colon);
                this.state = 451;
                this.match(CircuitScriptParser.NEWLINE);
                this.state = 452;
                this.match(CircuitScriptParser.INDENT);
                this.state = 456;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                do {
                    {
                    this.state = 456;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 47, this.context) ) {
                    case 1:
                        {
                        this.state = 453;
                        this.property_expr();
                        }
                        break;
                    case 2:
                        {
                        this.state = 454;
                        this.property_block_expr();
                        }
                        break;
                    case 3:
                        {
                        this.state = 455;
                        this.match(CircuitScriptParser.NEWLINE);
                        }
                        break;
                    }
                    }
                    this.state = 458;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                } while (((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 12545) !== 0));
                this.state = 460;
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
    public graphic_expr(): Graphic_exprContext {
        let localContext = new Graphic_exprContext(this.context, this.state);
        this.enterRule(localContext, 72, CircuitScriptParser.RULE_graphic_expr);
        let _la: number;
        try {
            this.state = 487;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.For:
                localContext = new GraphicForExprContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 463;
                this.match(CircuitScriptParser.For);
                this.state = 464;
                this.match(CircuitScriptParser.ID);
                this.state = 469;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 31) {
                    {
                    {
                    this.state = 465;
                    this.match(CircuitScriptParser.Comma);
                    this.state = 466;
                    this.match(CircuitScriptParser.ID);
                    }
                    }
                    this.state = 471;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 472;
                this.match(CircuitScriptParser.In);
                this.state = 473;
                this.data_expr(0);
                this.state = 474;
                this.match(CircuitScriptParser.Colon);
                this.state = 475;
                this.graphic_expressions_block();
                }
                break;
            case CircuitScriptParser.Pin:
            case CircuitScriptParser.ID:
                localContext = new GraphicCommandExprContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 477;
                (localContext as GraphicCommandExprContext)._command = this.tokenStream.LT(1);
                _la = this.tokenStream.LA(1);
                if(!(_la === 9 || _la === 69)) {
                    (localContext as GraphicCommandExprContext)._command = this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 478;
                this.match(CircuitScriptParser.Colon);
                this.state = 485;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 51, this.context) ) {
                case 1:
                    {
                    this.state = 479;
                    this.parameters();
                    }
                    break;
                case 2:
                    {
                    this.state = 480;
                    this.match(CircuitScriptParser.LParen);
                    this.state = 481;
                    this.parameters();
                    this.state = 482;
                    this.match(CircuitScriptParser.RParen);
                    }
                    break;
                case 3:
                    {
                    this.state = 484;
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
        this.enterRule(localContext, 74, CircuitScriptParser.RULE_property_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 489;
            this.property_key_expr();
            this.state = 490;
            this.match(CircuitScriptParser.Colon);
            this.state = 491;
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
        this.enterRule(localContext, 76, CircuitScriptParser.RULE_property_key_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 493;
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
        this.enterRule(localContext, 78, CircuitScriptParser.RULE_property_value_expr);
        let _la: number;
        try {
            this.state = 515;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 55, this.context) ) {
            case 1:
                localContext = new Nested_propertiesContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 495;
                this.properties_block();
                }
                break;
            case 2:
                localContext = new Single_line_propertyContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 496;
                this.data_expr(0);
                this.state = 501;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 31) {
                    {
                    {
                    this.state = 497;
                    this.match(CircuitScriptParser.Comma);
                    this.state = 498;
                    this.data_expr(0);
                    }
                    }
                    this.state = 503;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                break;
            case 3:
                localContext = new WithBracketsPropertyContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 504;
                this.match(CircuitScriptParser.LParen);
                this.state = 505;
                this.data_expr(0);
                this.state = 510;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 31) {
                    {
                    {
                    this.state = 506;
                    this.match(CircuitScriptParser.Comma);
                    this.state = 507;
                    this.data_expr(0);
                    }
                    }
                    this.state = 512;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 513;
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
        this.enterRule(localContext, 80, CircuitScriptParser.RULE_wire_expr);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 520;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.Wire:
                {
                this.state = 517;
                this.match(CircuitScriptParser.Wire);
                }
                break;
            case CircuitScriptParser.Minus:
                {
                this.state = 518;
                this.match(CircuitScriptParser.Minus);
                this.state = 519;
                this.match(CircuitScriptParser.Minus);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.state = 526;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 522;
                    this.match(CircuitScriptParser.ID);
                    this.state = 524;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 57, this.context) ) {
                    case 1:
                        {
                        this.state = 523;
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
                this.state = 528;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 58, this.context);
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
        this.enterRule(localContext, 82, CircuitScriptParser.RULE_point_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 530;
            this.match(CircuitScriptParser.Point);
            this.state = 531;
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
        this.enterRule(localContext, 84, CircuitScriptParser.RULE_import_expr);
        let _la: number;
        try {
            this.state = 555;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.Import:
                localContext = new Import_simpleContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 533;
                this.match(CircuitScriptParser.Import);
                this.state = 534;
                (localContext as Import_simpleContext)._libraryName = this.match(CircuitScriptParser.STRING_VALUE);
                this.state = 536;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 59, this.context) ) {
                case 1:
                    {
                    this.state = 535;
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
                this.state = 538;
                this.match(CircuitScriptParser.From);
                this.state = 539;
                (localContext as Import_specific_or_allContext)._libraryName = this.match(CircuitScriptParser.STRING_VALUE);
                this.state = 540;
                this.match(CircuitScriptParser.Import);
                this.state = 550;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.Multiply:
                    {
                    this.state = 541;
                    (localContext as Import_specific_or_allContext)._all = this.match(CircuitScriptParser.Multiply);
                    }
                    break;
                case CircuitScriptParser.ID:
                    {
                    {
                    this.state = 542;
                    (localContext as Import_specific_or_allContext)._ID = this.match(CircuitScriptParser.ID);
                    (localContext as Import_specific_or_allContext)._funcNames.push((localContext as Import_specific_or_allContext)._ID!);
                    this.state = 547;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 31) {
                        {
                        {
                        this.state = 543;
                        this.match(CircuitScriptParser.Comma);
                        this.state = 544;
                        (localContext as Import_specific_or_allContext)._ID = this.match(CircuitScriptParser.ID);
                        (localContext as Import_specific_or_allContext)._funcNames.push((localContext as Import_specific_or_allContext)._ID!);
                        }
                        }
                        this.state = 549;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 553;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 62, this.context) ) {
                case 1:
                    {
                    this.state = 552;
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
        this.enterRule(localContext, 86, CircuitScriptParser.RULE_frame_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 557;
            _la = this.tokenStream.LA(1);
            if(!(_la === 27 || _la === 28)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 558;
            this.match(CircuitScriptParser.Colon);
            this.state = 560;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 64, this.context) ) {
            case 1:
                {
                this.state = 559;
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
        this.enterRule(localContext, 88, CircuitScriptParser.RULE_if_expr);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 562;
            this.match(CircuitScriptParser.If);
            this.state = 563;
            this.data_expr(0);
            this.state = 564;
            this.match(CircuitScriptParser.Colon);
            this.state = 565;
            this.expressions_block();
            this.state = 569;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 65, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 566;
                    this.if_inner_expr();
                    }
                    }
                }
                this.state = 571;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 65, this.context);
            }
            this.state = 573;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 25) {
                {
                this.state = 572;
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
        this.enterRule(localContext, 90, CircuitScriptParser.RULE_if_inner_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 575;
            this.match(CircuitScriptParser.Else);
            this.state = 576;
            this.match(CircuitScriptParser.If);
            this.state = 577;
            this.data_expr(0);
            this.state = 578;
            this.match(CircuitScriptParser.Colon);
            this.state = 579;
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
        this.enterRule(localContext, 92, CircuitScriptParser.RULE_else_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 581;
            this.match(CircuitScriptParser.Else);
            this.state = 582;
            this.match(CircuitScriptParser.Colon);
            this.state = 583;
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
        this.enterRule(localContext, 94, CircuitScriptParser.RULE_while_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 585;
            this.match(CircuitScriptParser.While);
            this.state = 586;
            this.data_expr(0);
            this.state = 587;
            this.match(CircuitScriptParser.Colon);
            this.state = 588;
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
        this.enterRule(localContext, 96, CircuitScriptParser.RULE_for_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 590;
            this.match(CircuitScriptParser.For);
            this.state = 591;
            this.match(CircuitScriptParser.ID);
            this.state = 596;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 31) {
                {
                {
                this.state = 592;
                this.match(CircuitScriptParser.Comma);
                this.state = 593;
                this.match(CircuitScriptParser.ID);
                }
                }
                this.state = 598;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 599;
            this.match(CircuitScriptParser.In);
            this.state = 600;
            this.data_expr(0);
            this.state = 601;
            this.match(CircuitScriptParser.Colon);
            this.state = 602;
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
        this.enterRule(localContext, 98, CircuitScriptParser.RULE_part_set_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 604;
            this.match(CircuitScriptParser.Set);
            this.state = 605;
            this.match(CircuitScriptParser.Colon);
            this.state = 606;
            this.data_expr(0);
            this.state = 611;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 31) {
                {
                {
                this.state = 607;
                this.match(CircuitScriptParser.Comma);
                this.state = 608;
                this.data_expr(0);
                }
                }
                this.state = 613;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 614;
            this.match(CircuitScriptParser.Colon);
            this.state = 615;
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
        this.enterRule(localContext, 100, CircuitScriptParser.RULE_part_set_key);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 617;
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
        this.enterRule(localContext, 102, CircuitScriptParser.RULE_part_match_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 619;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 620;
            this.match(CircuitScriptParser.INDENT);
            this.state = 622;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 621;
                this.part_sub_expr();
                }
                }
                this.state = 624;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 15617) !== 0));
            this.state = 626;
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
        this.enterRule(localContext, 104, CircuitScriptParser.RULE_part_sub_expr);
        try {
            this.state = 631;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 70, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 628;
                this.part_condition_expr();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 629;
                this.part_value_expr();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 630;
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
        this.enterRule(localContext, 106, CircuitScriptParser.RULE_part_condition_expr);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 633;
            localContext._part_set_key = this.part_set_key();
            localContext._key_id.push(localContext._part_set_key!);
            this.state = 634;
            this.match(CircuitScriptParser.Colon);
            this.state = 635;
            localContext._data_expr = this.data_expr(0);
            localContext._values.push(localContext._data_expr!);
            this.state = 643;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 71, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 636;
                    this.match(CircuitScriptParser.Comma);
                    this.state = 637;
                    localContext._part_set_key = this.part_set_key();
                    localContext._key_id.push(localContext._part_set_key!);
                    this.state = 638;
                    this.match(CircuitScriptParser.Colon);
                    this.state = 639;
                    localContext._data_expr = this.data_expr(0);
                    localContext._values.push(localContext._data_expr!);
                    }
                    }
                }
                this.state = 645;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 71, this.context);
            }
            this.state = 650;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 31) {
                {
                {
                this.state = 646;
                this.match(CircuitScriptParser.Comma);
                this.state = 647;
                localContext._id_only = this.part_set_key();
                }
                }
                this.state = 652;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 653;
            this.match(CircuitScriptParser.Colon);
            this.state = 663;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.NEWLINE:
                {
                this.state = 654;
                this.part_match_block();
                }
                break;
            case CircuitScriptParser.CreateComponent:
            case CircuitScriptParser.CreateGraphic:
            case CircuitScriptParser.CreateModule:
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
                this.state = 655;
                localContext._data_expr = this.data_expr(0);
                localContext._last_data.push(localContext._data_expr!);
                this.state = 660;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 31) {
                    {
                    {
                    this.state = 656;
                    this.match(CircuitScriptParser.Comma);
                    this.state = 657;
                    localContext._data_expr = this.data_expr(0);
                    localContext._last_data.push(localContext._data_expr!);
                    }
                    }
                    this.state = 662;
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
        this.enterRule(localContext, 108, CircuitScriptParser.RULE_part_value_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 665;
            this.part_set_key();
            this.state = 666;
            this.match(CircuitScriptParser.Colon);
            this.state = 676;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.NEWLINE:
                {
                this.state = 667;
                this.part_match_block();
                }
                break;
            case CircuitScriptParser.CreateComponent:
            case CircuitScriptParser.CreateGraphic:
            case CircuitScriptParser.CreateModule:
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
                this.state = 668;
                this.data_expr(0);
                this.state = 673;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 31) {
                    {
                    {
                    this.state = 669;
                    this.match(CircuitScriptParser.Comma);
                    this.state = 670;
                    this.data_expr(0);
                    }
                    }
                    this.state = 675;
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
        this.enterRule(localContext, 110, CircuitScriptParser.RULE_annotation_comment_expr);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 678;
            this.match(CircuitScriptParser.ANNOTATION_START);
            this.state = 682;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 77, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 679;
                    _la = this.tokenStream.LA(1);
                    if(!(_la === 46 || _la === 69)) {
                    this.errorHandler.recoverInline(this);
                    }
                    else {
                        this.errorHandler.reportMatch(this);
                        this.consume();
                    }
                    }
                    }
                }
                this.state = 684;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 77, this.context);
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
        case 23:
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
        4,1,69,686,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,
        7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,
        2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,33,
        7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,39,
        2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,46,
        7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,52,
        2,53,7,53,2,54,7,54,2,55,7,55,1,0,1,0,5,0,115,8,0,10,0,12,0,118,
        9,0,1,0,5,0,121,8,0,10,0,12,0,124,9,0,1,0,1,0,1,1,1,1,3,1,130,8,
        1,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,3,2,141,8,2,1,3,1,3,1,3,1,
        3,1,3,3,3,148,8,3,1,4,1,4,1,4,1,4,1,4,1,4,1,4,3,4,157,8,4,1,5,1,
        5,1,5,4,5,162,8,5,11,5,12,5,163,1,5,1,5,1,6,1,6,1,6,4,6,171,8,6,
        11,6,12,6,172,1,6,1,6,3,6,177,8,6,1,7,1,7,1,7,1,8,1,8,1,8,1,8,1,
        9,1,9,3,9,188,8,9,1,9,5,9,191,8,9,10,9,12,9,194,9,9,1,9,3,9,197,
        8,9,1,10,1,10,1,10,1,10,1,11,1,11,1,11,1,12,1,12,1,12,3,12,209,8,
        12,1,13,1,13,1,13,1,14,1,14,1,14,1,14,5,14,218,8,14,10,14,12,14,
        221,9,14,1,15,1,15,1,15,5,15,226,8,15,10,15,12,15,229,9,15,1,16,
        1,16,1,16,1,17,1,17,1,17,4,17,237,8,17,11,17,12,17,238,1,17,1,17,
        1,18,1,18,3,18,245,8,18,1,19,1,19,1,19,4,19,250,8,19,11,19,12,19,
        251,1,19,1,19,3,19,256,8,19,1,20,1,20,1,20,1,20,1,21,1,21,1,21,5,
        21,265,8,21,10,21,12,21,268,9,21,1,21,3,21,271,8,21,1,21,1,21,5,
        21,275,8,21,10,21,12,21,278,9,21,1,22,1,22,1,22,5,22,283,8,22,10,
        22,12,22,286,9,22,1,22,1,22,1,22,1,23,1,23,1,23,1,23,1,23,1,23,1,
        23,1,23,1,23,1,23,1,23,1,23,5,23,303,8,23,10,23,12,23,306,9,23,5,
        23,308,8,23,10,23,12,23,311,9,23,1,23,1,23,1,23,3,23,316,8,23,1,
        23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,5,23,330,
        8,23,10,23,12,23,333,9,23,1,24,3,24,336,8,24,1,24,1,24,1,25,1,25,
        1,25,1,25,3,25,344,8,25,1,25,1,25,1,25,1,25,1,25,4,25,351,8,25,11,
        25,12,25,352,1,25,1,25,1,26,1,26,3,26,359,8,26,1,27,1,27,1,27,5,
        27,364,8,27,10,27,12,27,367,9,27,1,27,1,27,3,27,371,8,27,1,27,1,
        27,1,27,1,27,5,27,377,8,27,10,27,12,27,380,9,27,1,28,1,28,1,28,1,
        29,3,29,386,8,29,1,29,1,29,3,29,390,8,29,1,30,3,30,393,8,30,1,30,
        1,30,5,30,397,8,30,10,30,12,30,400,9,30,1,31,1,31,3,31,404,8,31,
        1,31,1,31,1,31,1,31,1,31,1,31,1,31,3,31,413,8,31,1,32,1,32,1,32,
        1,32,1,33,1,33,1,33,1,33,4,33,423,8,33,11,33,12,33,424,1,33,1,33,
        1,34,1,34,1,34,1,34,4,34,433,8,34,11,34,12,34,434,1,34,1,34,1,35,
        1,35,1,35,1,35,1,35,1,35,1,35,3,35,446,8,35,1,35,1,35,1,35,1,35,
        1,35,1,35,1,35,1,35,1,35,4,35,457,8,35,11,35,12,35,458,1,35,3,35,
        462,8,35,1,36,1,36,1,36,1,36,5,36,468,8,36,10,36,12,36,471,9,36,
        1,36,1,36,1,36,1,36,1,36,1,36,1,36,1,36,1,36,1,36,1,36,1,36,1,36,
        3,36,486,8,36,3,36,488,8,36,1,37,1,37,1,37,1,37,1,38,1,38,1,39,1,
        39,1,39,1,39,5,39,500,8,39,10,39,12,39,503,9,39,1,39,1,39,1,39,1,
        39,5,39,509,8,39,10,39,12,39,512,9,39,1,39,1,39,3,39,516,8,39,1,
        40,1,40,1,40,3,40,521,8,40,1,40,1,40,3,40,525,8,40,4,40,527,8,40,
        11,40,12,40,528,1,41,1,41,1,41,1,42,1,42,1,42,3,42,537,8,42,1,42,
        1,42,1,42,1,42,1,42,1,42,1,42,5,42,546,8,42,10,42,12,42,549,9,42,
        3,42,551,8,42,1,42,3,42,554,8,42,3,42,556,8,42,1,43,1,43,1,43,3,
        43,561,8,43,1,44,1,44,1,44,1,44,1,44,5,44,568,8,44,10,44,12,44,571,
        9,44,1,44,3,44,574,8,44,1,45,1,45,1,45,1,45,1,45,1,45,1,46,1,46,
        1,46,1,46,1,47,1,47,1,47,1,47,1,47,1,48,1,48,1,48,1,48,5,48,595,
        8,48,10,48,12,48,598,9,48,1,48,1,48,1,48,1,48,1,48,1,49,1,49,1,49,
        1,49,1,49,5,49,610,8,49,10,49,12,49,613,9,49,1,49,1,49,1,49,1,50,
        1,50,1,51,1,51,1,51,4,51,623,8,51,11,51,12,51,624,1,51,1,51,1,52,
        1,52,1,52,3,52,632,8,52,1,53,1,53,1,53,1,53,1,53,1,53,1,53,1,53,
        5,53,642,8,53,10,53,12,53,645,9,53,1,53,1,53,5,53,649,8,53,10,53,
        12,53,652,9,53,1,53,1,53,1,53,1,53,1,53,5,53,659,8,53,10,53,12,53,
        662,9,53,3,53,664,8,53,1,54,1,54,1,54,1,54,1,54,1,54,5,54,672,8,
        54,10,54,12,54,675,9,54,3,54,677,8,54,1,55,1,55,5,55,681,8,55,10,
        55,12,55,684,9,55,1,55,0,1,46,56,0,2,4,6,8,10,12,14,16,18,20,22,
        24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,
        68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,102,104,106,
        108,110,0,13,2,0,4,4,13,15,2,0,36,36,50,54,2,0,26,26,46,46,1,0,47,
        49,1,0,45,46,1,0,37,42,1,0,43,44,2,0,62,62,64,68,2,0,9,9,69,69,2,
        0,64,64,68,69,1,0,27,28,2,0,64,64,66,69,2,0,46,46,69,69,737,0,116,
        1,0,0,0,2,129,1,0,0,0,4,140,1,0,0,0,6,147,1,0,0,0,8,156,1,0,0,0,
        10,158,1,0,0,0,12,167,1,0,0,0,14,178,1,0,0,0,16,181,1,0,0,0,18,187,
        1,0,0,0,20,198,1,0,0,0,22,202,1,0,0,0,24,208,1,0,0,0,26,210,1,0,
        0,0,28,213,1,0,0,0,30,222,1,0,0,0,32,230,1,0,0,0,34,233,1,0,0,0,
        36,244,1,0,0,0,38,246,1,0,0,0,40,257,1,0,0,0,42,270,1,0,0,0,44,279,
        1,0,0,0,46,315,1,0,0,0,48,335,1,0,0,0,50,339,1,0,0,0,52,358,1,0,
        0,0,54,360,1,0,0,0,56,381,1,0,0,0,58,385,1,0,0,0,60,392,1,0,0,0,
        62,412,1,0,0,0,64,414,1,0,0,0,66,418,1,0,0,0,68,428,1,0,0,0,70,461,
        1,0,0,0,72,487,1,0,0,0,74,489,1,0,0,0,76,493,1,0,0,0,78,515,1,0,
        0,0,80,520,1,0,0,0,82,530,1,0,0,0,84,555,1,0,0,0,86,557,1,0,0,0,
        88,562,1,0,0,0,90,575,1,0,0,0,92,581,1,0,0,0,94,585,1,0,0,0,96,590,
        1,0,0,0,98,604,1,0,0,0,100,617,1,0,0,0,102,619,1,0,0,0,104,631,1,
        0,0,0,106,633,1,0,0,0,108,665,1,0,0,0,110,678,1,0,0,0,112,115,3,
        84,42,0,113,115,5,56,0,0,114,112,1,0,0,0,114,113,1,0,0,0,115,118,
        1,0,0,0,116,114,1,0,0,0,116,117,1,0,0,0,117,122,1,0,0,0,118,116,
        1,0,0,0,119,121,3,2,1,0,120,119,1,0,0,0,121,124,1,0,0,0,122,120,
        1,0,0,0,122,123,1,0,0,0,123,125,1,0,0,0,124,122,1,0,0,0,125,126,
        5,0,0,1,126,1,1,0,0,0,127,130,3,4,2,0,128,130,5,56,0,0,129,127,1,
        0,0,0,129,128,1,0,0,0,130,3,1,0,0,0,131,141,3,6,3,0,132,141,3,8,
        4,0,133,141,3,50,25,0,134,141,3,86,43,0,135,141,3,98,49,0,136,141,
        3,110,55,0,137,141,3,44,22,0,138,141,3,20,10,0,139,141,3,60,30,0,
        140,131,1,0,0,0,140,132,1,0,0,0,140,133,1,0,0,0,140,134,1,0,0,0,
        140,135,1,0,0,0,140,136,1,0,0,0,140,137,1,0,0,0,140,138,1,0,0,0,
        140,139,1,0,0,0,141,5,1,0,0,0,142,148,3,88,44,0,143,148,3,94,47,
        0,144,148,3,96,48,0,145,148,5,3,0,0,146,148,5,23,0,0,147,142,1,0,
        0,0,147,143,1,0,0,0,147,144,1,0,0,0,147,145,1,0,0,0,147,146,1,0,
        0,0,148,7,1,0,0,0,149,157,3,22,11,0,150,157,3,26,13,0,151,157,3,
        32,16,0,152,157,3,28,14,0,153,157,3,80,40,0,154,157,3,82,41,0,155,
        157,3,12,6,0,156,149,1,0,0,0,156,150,1,0,0,0,156,151,1,0,0,0,156,
        152,1,0,0,0,156,153,1,0,0,0,156,154,1,0,0,0,156,155,1,0,0,0,157,
        9,1,0,0,0,158,159,5,56,0,0,159,161,5,1,0,0,160,162,3,2,1,0,161,160,
        1,0,0,0,162,163,1,0,0,0,163,161,1,0,0,0,163,164,1,0,0,0,164,165,
        1,0,0,0,165,166,5,2,0,0,166,11,1,0,0,0,167,168,7,0,0,0,168,176,5,
        30,0,0,169,171,3,4,2,0,170,169,1,0,0,0,171,172,1,0,0,0,172,170,1,
        0,0,0,172,173,1,0,0,0,173,177,1,0,0,0,174,177,3,10,5,0,175,177,3,
        34,17,0,176,170,1,0,0,0,176,174,1,0,0,0,176,175,1,0,0,0,177,13,1,
        0,0,0,178,179,5,9,0,0,179,180,3,46,23,0,180,15,1,0,0,0,181,182,5,
        69,0,0,182,183,5,30,0,0,183,184,3,46,23,0,184,17,1,0,0,0,185,188,
        3,46,23,0,186,188,3,20,10,0,187,185,1,0,0,0,187,186,1,0,0,0,188,
        192,1,0,0,0,189,191,3,16,8,0,190,189,1,0,0,0,191,194,1,0,0,0,192,
        190,1,0,0,0,192,193,1,0,0,0,193,196,1,0,0,0,194,192,1,0,0,0,195,
        197,3,14,7,0,196,195,1,0,0,0,196,197,1,0,0,0,197,19,1,0,0,0,198,
        199,3,60,30,0,199,200,7,1,0,0,200,201,3,46,23,0,201,21,1,0,0,0,202,
        203,5,10,0,0,203,204,3,18,9,0,204,23,1,0,0,0,205,209,3,18,9,0,206,
        209,3,14,7,0,207,209,5,13,0,0,208,205,1,0,0,0,208,206,1,0,0,0,208,
        207,1,0,0,0,209,25,1,0,0,0,210,211,5,11,0,0,211,212,3,24,12,0,212,
        27,1,0,0,0,213,214,5,12,0,0,214,219,3,24,12,0,215,216,5,31,0,0,216,
        218,3,24,12,0,217,215,1,0,0,0,218,221,1,0,0,0,219,217,1,0,0,0,219,
        220,1,0,0,0,220,29,1,0,0,0,221,219,1,0,0,0,222,223,3,26,13,0,223,
        227,5,30,0,0,224,226,3,110,55,0,225,224,1,0,0,0,226,229,1,0,0,0,
        227,225,1,0,0,0,227,228,1,0,0,0,228,31,1,0,0,0,229,227,1,0,0,0,230,
        231,3,30,15,0,231,232,3,34,17,0,232,33,1,0,0,0,233,234,5,56,0,0,
        234,236,5,1,0,0,235,237,3,36,18,0,236,235,1,0,0,0,237,238,1,0,0,
        0,238,236,1,0,0,0,238,239,1,0,0,0,239,240,1,0,0,0,240,241,5,2,0,
        0,241,35,1,0,0,0,242,245,3,38,19,0,243,245,3,2,1,0,244,242,1,0,0,
        0,244,243,1,0,0,0,245,37,1,0,0,0,246,247,3,76,38,0,247,255,5,30,
        0,0,248,250,3,4,2,0,249,248,1,0,0,0,250,251,1,0,0,0,251,249,1,0,
        0,0,251,252,1,0,0,0,252,256,1,0,0,0,253,256,3,10,5,0,254,256,5,61,
        0,0,255,249,1,0,0,0,255,253,1,0,0,0,255,254,1,0,0,0,256,39,1,0,0,
        0,257,258,5,69,0,0,258,259,5,36,0,0,259,260,3,46,23,0,260,41,1,0,
        0,0,261,266,3,46,23,0,262,263,5,31,0,0,263,265,3,46,23,0,264,262,
        1,0,0,0,265,268,1,0,0,0,266,264,1,0,0,0,266,267,1,0,0,0,267,271,
        1,0,0,0,268,266,1,0,0,0,269,271,3,40,20,0,270,261,1,0,0,0,270,269,
        1,0,0,0,271,276,1,0,0,0,272,273,5,31,0,0,273,275,3,40,20,0,274,272,
        1,0,0,0,275,278,1,0,0,0,276,274,1,0,0,0,276,277,1,0,0,0,277,43,1,
        0,0,0,278,276,1,0,0,0,279,280,5,33,0,0,280,284,5,69,0,0,281,283,
        3,62,31,0,282,281,1,0,0,0,283,286,1,0,0,0,284,282,1,0,0,0,284,285,
        1,0,0,0,285,287,1,0,0,0,286,284,1,0,0,0,287,288,5,36,0,0,288,289,
        3,46,23,0,289,45,1,0,0,0,290,291,6,23,-1,0,291,292,5,59,0,0,292,
        293,3,46,23,0,293,294,5,60,0,0,294,316,1,0,0,0,295,316,3,70,35,0,
        296,297,7,2,0,0,297,316,3,46,23,8,298,309,5,34,0,0,299,304,3,46,
        23,0,300,301,5,31,0,0,301,303,3,46,23,0,302,300,1,0,0,0,303,306,
        1,0,0,0,304,302,1,0,0,0,304,305,1,0,0,0,305,308,1,0,0,0,306,304,
        1,0,0,0,307,299,1,0,0,0,308,311,1,0,0,0,309,307,1,0,0,0,309,310,
        1,0,0,0,310,312,1,0,0,0,311,309,1,0,0,0,312,316,5,35,0,0,313,316,
        3,48,24,0,314,316,3,60,30,0,315,290,1,0,0,0,315,295,1,0,0,0,315,
        296,1,0,0,0,315,298,1,0,0,0,315,313,1,0,0,0,315,314,1,0,0,0,316,
        331,1,0,0,0,317,318,10,6,0,0,318,319,7,3,0,0,319,330,3,46,23,7,320,
        321,10,5,0,0,321,322,7,4,0,0,322,330,3,46,23,6,323,324,10,4,0,0,
        324,325,7,5,0,0,325,330,3,46,23,5,326,327,10,3,0,0,327,328,7,6,0,
        0,328,330,3,46,23,4,329,317,1,0,0,0,329,320,1,0,0,0,329,323,1,0,
        0,0,329,326,1,0,0,0,330,333,1,0,0,0,331,329,1,0,0,0,331,332,1,0,
        0,0,332,47,1,0,0,0,333,331,1,0,0,0,334,336,5,46,0,0,335,334,1,0,
        0,0,335,336,1,0,0,0,336,337,1,0,0,0,337,338,7,7,0,0,338,49,1,0,0,
        0,339,340,5,17,0,0,340,341,5,69,0,0,341,343,5,59,0,0,342,344,3,54,
        27,0,343,342,1,0,0,0,343,344,1,0,0,0,344,345,1,0,0,0,345,346,5,60,
        0,0,346,347,5,30,0,0,347,348,5,56,0,0,348,350,5,1,0,0,349,351,3,
        52,26,0,350,349,1,0,0,0,351,352,1,0,0,0,352,350,1,0,0,0,352,353,
        1,0,0,0,353,354,1,0,0,0,354,355,5,2,0,0,355,51,1,0,0,0,356,359,3,
        2,1,0,357,359,3,56,28,0,358,356,1,0,0,0,358,357,1,0,0,0,359,53,1,
        0,0,0,360,370,5,69,0,0,361,362,5,31,0,0,362,364,5,69,0,0,363,361,
        1,0,0,0,364,367,1,0,0,0,365,363,1,0,0,0,365,366,1,0,0,0,366,371,
        1,0,0,0,367,365,1,0,0,0,368,369,5,36,0,0,369,371,3,48,24,0,370,365,
        1,0,0,0,370,368,1,0,0,0,371,378,1,0,0,0,372,373,5,31,0,0,373,374,
        5,69,0,0,374,375,5,36,0,0,375,377,3,48,24,0,376,372,1,0,0,0,377,
        380,1,0,0,0,378,376,1,0,0,0,378,379,1,0,0,0,379,55,1,0,0,0,380,378,
        1,0,0,0,381,382,5,16,0,0,382,383,3,46,23,0,383,57,1,0,0,0,384,386,
        5,45,0,0,385,384,1,0,0,0,385,386,1,0,0,0,386,387,1,0,0,0,387,389,
        5,47,0,0,388,390,3,46,23,0,389,388,1,0,0,0,389,390,1,0,0,0,390,59,
        1,0,0,0,391,393,3,58,29,0,392,391,1,0,0,0,392,393,1,0,0,0,393,394,
        1,0,0,0,394,398,5,69,0,0,395,397,3,62,31,0,396,395,1,0,0,0,397,400,
        1,0,0,0,398,396,1,0,0,0,398,399,1,0,0,0,399,61,1,0,0,0,400,398,1,
        0,0,0,401,403,5,59,0,0,402,404,3,42,21,0,403,402,1,0,0,0,403,404,
        1,0,0,0,404,405,1,0,0,0,405,413,5,60,0,0,406,407,5,32,0,0,407,413,
        5,69,0,0,408,409,5,34,0,0,409,410,3,46,23,0,410,411,5,35,0,0,411,
        413,1,0,0,0,412,401,1,0,0,0,412,406,1,0,0,0,412,408,1,0,0,0,413,
        63,1,0,0,0,414,415,3,76,38,0,415,416,5,30,0,0,416,417,3,10,5,0,417,
        65,1,0,0,0,418,419,5,56,0,0,419,422,5,1,0,0,420,423,3,74,37,0,421,
        423,5,56,0,0,422,420,1,0,0,0,422,421,1,0,0,0,423,424,1,0,0,0,424,
        422,1,0,0,0,424,425,1,0,0,0,425,426,1,0,0,0,426,427,5,2,0,0,427,
        67,1,0,0,0,428,429,5,56,0,0,429,432,5,1,0,0,430,433,5,56,0,0,431,
        433,3,72,36,0,432,430,1,0,0,0,432,431,1,0,0,0,433,434,1,0,0,0,434,
        432,1,0,0,0,434,435,1,0,0,0,435,436,1,0,0,0,436,437,5,2,0,0,437,
        69,1,0,0,0,438,439,5,5,0,0,439,440,5,30,0,0,440,462,3,66,33,0,441,
        445,5,6,0,0,442,443,5,59,0,0,443,444,5,69,0,0,444,446,5,60,0,0,445,
        442,1,0,0,0,445,446,1,0,0,0,446,447,1,0,0,0,447,448,5,30,0,0,448,
        462,3,68,34,0,449,450,5,7,0,0,450,451,5,30,0,0,451,452,5,56,0,0,
        452,456,5,1,0,0,453,457,3,74,37,0,454,457,3,64,32,0,455,457,5,56,
        0,0,456,453,1,0,0,0,456,454,1,0,0,0,456,455,1,0,0,0,457,458,1,0,
        0,0,458,456,1,0,0,0,458,459,1,0,0,0,459,460,1,0,0,0,460,462,5,2,
        0,0,461,438,1,0,0,0,461,441,1,0,0,0,461,449,1,0,0,0,462,71,1,0,0,
        0,463,464,5,20,0,0,464,469,5,69,0,0,465,466,5,31,0,0,466,468,5,69,
        0,0,467,465,1,0,0,0,468,471,1,0,0,0,469,467,1,0,0,0,469,470,1,0,
        0,0,470,472,1,0,0,0,471,469,1,0,0,0,472,473,5,21,0,0,473,474,3,46,
        23,0,474,475,5,30,0,0,475,476,3,68,34,0,476,488,1,0,0,0,477,478,
        7,8,0,0,478,485,5,30,0,0,479,486,3,42,21,0,480,481,5,59,0,0,481,
        482,3,42,21,0,482,483,5,60,0,0,483,486,1,0,0,0,484,486,3,66,33,0,
        485,479,1,0,0,0,485,480,1,0,0,0,485,484,1,0,0,0,486,488,1,0,0,0,
        487,463,1,0,0,0,487,477,1,0,0,0,488,73,1,0,0,0,489,490,3,76,38,0,
        490,491,5,30,0,0,491,492,3,78,39,0,492,75,1,0,0,0,493,494,7,9,0,
        0,494,77,1,0,0,0,495,516,3,66,33,0,496,501,3,46,23,0,497,498,5,31,
        0,0,498,500,3,46,23,0,499,497,1,0,0,0,500,503,1,0,0,0,501,499,1,
        0,0,0,501,502,1,0,0,0,502,516,1,0,0,0,503,501,1,0,0,0,504,505,5,
        59,0,0,505,510,3,46,23,0,506,507,5,31,0,0,507,509,3,46,23,0,508,
        506,1,0,0,0,509,512,1,0,0,0,510,508,1,0,0,0,510,511,1,0,0,0,511,
        513,1,0,0,0,512,510,1,0,0,0,513,514,5,60,0,0,514,516,1,0,0,0,515,
        495,1,0,0,0,515,496,1,0,0,0,515,504,1,0,0,0,516,79,1,0,0,0,517,521,
        5,8,0,0,518,519,5,46,0,0,519,521,5,46,0,0,520,517,1,0,0,0,520,518,
        1,0,0,0,521,526,1,0,0,0,522,524,5,69,0,0,523,525,3,46,23,0,524,523,
        1,0,0,0,524,525,1,0,0,0,525,527,1,0,0,0,526,522,1,0,0,0,527,528,
        1,0,0,0,528,526,1,0,0,0,528,529,1,0,0,0,529,81,1,0,0,0,530,531,5,
        13,0,0,531,532,3,46,23,0,532,83,1,0,0,0,533,534,5,18,0,0,534,536,
        5,68,0,0,535,537,3,110,55,0,536,535,1,0,0,0,536,537,1,0,0,0,537,
        556,1,0,0,0,538,539,5,19,0,0,539,540,5,68,0,0,540,550,5,18,0,0,541,
        551,5,48,0,0,542,547,5,69,0,0,543,544,5,31,0,0,544,546,5,69,0,0,
        545,543,1,0,0,0,546,549,1,0,0,0,547,545,1,0,0,0,547,548,1,0,0,0,
        548,551,1,0,0,0,549,547,1,0,0,0,550,541,1,0,0,0,550,542,1,0,0,0,
        551,553,1,0,0,0,552,554,3,110,55,0,553,552,1,0,0,0,553,554,1,0,0,
        0,554,556,1,0,0,0,555,533,1,0,0,0,555,538,1,0,0,0,556,85,1,0,0,0,
        557,558,7,10,0,0,558,560,5,30,0,0,559,561,3,10,5,0,560,559,1,0,0,
        0,560,561,1,0,0,0,561,87,1,0,0,0,562,563,5,24,0,0,563,564,3,46,23,
        0,564,565,5,30,0,0,565,569,3,10,5,0,566,568,3,90,45,0,567,566,1,
        0,0,0,568,571,1,0,0,0,569,567,1,0,0,0,569,570,1,0,0,0,570,573,1,
        0,0,0,571,569,1,0,0,0,572,574,3,92,46,0,573,572,1,0,0,0,573,574,
        1,0,0,0,574,89,1,0,0,0,575,576,5,25,0,0,576,577,5,24,0,0,577,578,
        3,46,23,0,578,579,5,30,0,0,579,580,3,10,5,0,580,91,1,0,0,0,581,582,
        5,25,0,0,582,583,5,30,0,0,583,584,3,10,5,0,584,93,1,0,0,0,585,586,
        5,22,0,0,586,587,3,46,23,0,587,588,5,30,0,0,588,589,3,10,5,0,589,
        95,1,0,0,0,590,591,5,20,0,0,591,596,5,69,0,0,592,593,5,31,0,0,593,
        595,5,69,0,0,594,592,1,0,0,0,595,598,1,0,0,0,596,594,1,0,0,0,596,
        597,1,0,0,0,597,599,1,0,0,0,598,596,1,0,0,0,599,600,5,21,0,0,600,
        601,3,46,23,0,601,602,5,30,0,0,602,603,3,10,5,0,603,97,1,0,0,0,604,
        605,5,29,0,0,605,606,5,30,0,0,606,611,3,46,23,0,607,608,5,31,0,0,
        608,610,3,46,23,0,609,607,1,0,0,0,610,613,1,0,0,0,611,609,1,0,0,
        0,611,612,1,0,0,0,612,614,1,0,0,0,613,611,1,0,0,0,614,615,5,30,0,
        0,615,616,3,102,51,0,616,99,1,0,0,0,617,618,7,11,0,0,618,101,1,0,
        0,0,619,620,5,56,0,0,620,622,5,1,0,0,621,623,3,104,52,0,622,621,
        1,0,0,0,623,624,1,0,0,0,624,622,1,0,0,0,624,625,1,0,0,0,625,626,
        1,0,0,0,626,627,5,2,0,0,627,103,1,0,0,0,628,632,3,106,53,0,629,632,
        3,108,54,0,630,632,5,56,0,0,631,628,1,0,0,0,631,629,1,0,0,0,631,
        630,1,0,0,0,632,105,1,0,0,0,633,634,3,100,50,0,634,635,5,30,0,0,
        635,643,3,46,23,0,636,637,5,31,0,0,637,638,3,100,50,0,638,639,5,
        30,0,0,639,640,3,46,23,0,640,642,1,0,0,0,641,636,1,0,0,0,642,645,
        1,0,0,0,643,641,1,0,0,0,643,644,1,0,0,0,644,650,1,0,0,0,645,643,
        1,0,0,0,646,647,5,31,0,0,647,649,3,100,50,0,648,646,1,0,0,0,649,
        652,1,0,0,0,650,648,1,0,0,0,650,651,1,0,0,0,651,653,1,0,0,0,652,
        650,1,0,0,0,653,663,5,30,0,0,654,664,3,102,51,0,655,660,3,46,23,
        0,656,657,5,31,0,0,657,659,3,46,23,0,658,656,1,0,0,0,659,662,1,0,
        0,0,660,658,1,0,0,0,660,661,1,0,0,0,661,664,1,0,0,0,662,660,1,0,
        0,0,663,654,1,0,0,0,663,655,1,0,0,0,664,107,1,0,0,0,665,666,3,100,
        50,0,666,676,5,30,0,0,667,677,3,102,51,0,668,673,3,46,23,0,669,670,
        5,31,0,0,670,672,3,46,23,0,671,669,1,0,0,0,672,675,1,0,0,0,673,671,
        1,0,0,0,673,674,1,0,0,0,674,677,1,0,0,0,675,673,1,0,0,0,676,667,
        1,0,0,0,676,668,1,0,0,0,677,109,1,0,0,0,678,682,5,63,0,0,679,681,
        7,12,0,0,680,679,1,0,0,0,681,684,1,0,0,0,682,680,1,0,0,0,682,683,
        1,0,0,0,683,111,1,0,0,0,684,682,1,0,0,0,78,114,116,122,129,140,147,
        156,163,172,176,187,192,196,208,219,227,238,244,251,255,266,270,
        276,284,304,309,315,329,331,335,343,352,358,365,370,378,385,389,
        392,398,403,412,422,424,432,434,445,456,458,461,469,485,487,501,
        510,515,520,524,528,536,547,550,553,555,560,569,573,596,611,624,
        631,643,650,660,663,673,676,682
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
    public property_key_expr(): Property_key_exprContext {
        return this.getRuleContext(0, Property_key_exprContext)!;
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
    public data_expr(): Data_exprContext[];
    public data_expr(i: number): Data_exprContext | null;
    public data_expr(i?: number): Data_exprContext[] | Data_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Data_exprContext);
        }

        return this.getRuleContext(i, Data_exprContext);
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
    public property_key_expr(): Property_key_exprContext {
        return this.getRuleContext(0, Property_key_exprContext)!;
    }
    public Colon(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Colon, 0)!;
    }
    public property_value_expr(): Property_value_exprContext {
        return this.getRuleContext(0, Property_value_exprContext)!;
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
