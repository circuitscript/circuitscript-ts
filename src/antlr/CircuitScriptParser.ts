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
    public static readonly Wire = 13;
    public static readonly Pin = 14;
    public static readonly Add = 15;
    public static readonly At = 16;
    public static readonly To = 17;
    public static readonly Point = 18;
    public static readonly Join = 19;
    public static readonly Parallel = 20;
    public static readonly Return = 21;
    public static readonly Define = 22;
    public static readonly Import = 23;
    public static readonly If = 24;
    public static readonly Not = 25;
    public static readonly Frame = 26;
    public static readonly Equals = 27;
    public static readonly NotEquals = 28;
    public static readonly Addition = 29;
    public static readonly Minus = 30;
    public static readonly Divide = 31;
    public static readonly Multiply = 32;
    public static readonly OPEN_PAREN = 33;
    public static readonly CLOSE_PAREN = 34;
    public static readonly NOT_CONNECTED = 35;
    public static readonly BOOLEAN_VALUE = 36;
    public static readonly ID = 37;
    public static readonly INTEGER_VALUE = 38;
    public static readonly DECIMAL_VALUE = 39;
    public static readonly NUMERIC_VALUE = 40;
    public static readonly STRING_VALUE = 41;
    public static readonly PERCENTAGE_VALUE = 42;
    public static readonly ALPHA_NUMERIC = 43;
    public static readonly WS = 44;
    public static readonly NEWLINE = 45;
    public static readonly COMMENT = 46;
    public static readonly INDENT = 47;
    public static readonly DEDENT = 48;
    public static readonly RULE_script = 0;
    public static readonly RULE_expression = 1;
    public static readonly RULE_path_blocks = 2;
    public static readonly RULE_path_block_inner = 3;
    public static readonly RULE_property_set_expr2 = 4;
    public static readonly RULE_assignment_expr2 = 5;
    public static readonly RULE_data_expr_with_assignment = 6;
    public static readonly RULE_add_component_expr = 7;
    public static readonly RULE_component_select_expr = 8;
    public static readonly RULE_pin_select_expr = 9;
    public static readonly RULE_pin_select_expr2 = 10;
    public static readonly RULE_at_component_expr = 11;
    public static readonly RULE_to_component_expr = 12;
    public static readonly RULE_at_to_multiple_expr = 13;
    public static readonly RULE_at_to_multiple_line_expr = 14;
    public static readonly RULE_at_to_multiple_line_expr_to_pin = 15;
    public static readonly RULE_at_block = 16;
    public static readonly RULE_at_block_expressions = 17;
    public static readonly RULE_at_block_pin_expr = 18;
    public static readonly RULE_at_block_pin_expression_simple = 19;
    public static readonly RULE_at_block_pin_expression_complex = 20;
    public static readonly RULE_break_keyword = 21;
    public static readonly RULE_assignment_expr = 22;
    public static readonly RULE_keyword_assignment_expr = 23;
    public static readonly RULE_parameters = 24;
    public static readonly RULE_property_set_expr = 25;
    public static readonly RULE_double_dot_property_set_expr = 26;
    public static readonly RULE_data_expr = 27;
    public static readonly RULE_binary_operator = 28;
    public static readonly RULE_unary_operator = 29;
    public static readonly RULE_value_expr = 30;
    public static readonly RULE_function_def_expr = 31;
    public static readonly RULE_function_expr = 32;
    public static readonly RULE_function_args_expr = 33;
    public static readonly RULE_atom_expr = 34;
    public static readonly RULE_trailer_expr = 35;
    public static readonly RULE_function_call_expr = 36;
    public static readonly RULE_net_namespace_expr = 37;
    public static readonly RULE_function_return_expr = 38;
    public static readonly RULE_create_component_expr = 39;
    public static readonly RULE_create_graphic_expr = 40;
    public static readonly RULE_sub_expr = 41;
    public static readonly RULE_property_expr = 42;
    public static readonly RULE_property_key_expr = 43;
    public static readonly RULE_property_value_expr = 44;
    public static readonly RULE_blank_expr = 45;
    public static readonly RULE_wire_atom_expr = 46;
    public static readonly RULE_wire_expr = 47;
    public static readonly RULE_point_expr = 48;
    public static readonly RULE_import_expr = 49;
    public static readonly RULE_frame_expr = 50;

    public static readonly literalNames = [
        null, "':'", "','", "'='", "'..'", "'.'", "'['", "']'", "'break'", 
        "'branch'", "'create'", "'component'", "'graphic'", "'wire'", "'pin'", 
        "'add'", "'at'", "'to'", "'point'", "'join'", "'parallel'", "'return'", 
        "'def'", "'import'", "'if'", "'!'", "'frame'", "'=='", "'!='", "'+'", 
        "'-'", "'/'", "'*'", "'('", "')'"
    ];

    public static readonly symbolicNames = [
        null, null, null, null, null, null, null, null, "Break", "Branch", 
        "Create", "Component", "Graphic", "Wire", "Pin", "Add", "At", "To", 
        "Point", "Join", "Parallel", "Return", "Define", "Import", "If", 
        "Not", "Frame", "Equals", "NotEquals", "Addition", "Minus", "Divide", 
        "Multiply", "OPEN_PAREN", "CLOSE_PAREN", "NOT_CONNECTED", "BOOLEAN_VALUE", 
        "ID", "INTEGER_VALUE", "DECIMAL_VALUE", "NUMERIC_VALUE", "STRING_VALUE", 
        "PERCENTAGE_VALUE", "ALPHA_NUMERIC", "WS", "NEWLINE", "COMMENT", 
        "INDENT", "DEDENT"
    ];
    public static readonly ruleNames = [
        "script", "expression", "path_blocks", "path_block_inner", "property_set_expr2", 
        "assignment_expr2", "data_expr_with_assignment", "add_component_expr", 
        "component_select_expr", "pin_select_expr", "pin_select_expr2", 
        "at_component_expr", "to_component_expr", "at_to_multiple_expr", 
        "at_to_multiple_line_expr", "at_to_multiple_line_expr_to_pin", "at_block", 
        "at_block_expressions", "at_block_pin_expr", "at_block_pin_expression_simple", 
        "at_block_pin_expression_complex", "break_keyword", "assignment_expr", 
        "keyword_assignment_expr", "parameters", "property_set_expr", "double_dot_property_set_expr", 
        "data_expr", "binary_operator", "unary_operator", "value_expr", 
        "function_def_expr", "function_expr", "function_args_expr", "atom_expr", 
        "trailer_expr", "function_call_expr", "net_namespace_expr", "function_return_expr", 
        "create_component_expr", "create_graphic_expr", "sub_expr", "property_expr", 
        "property_key_expr", "property_value_expr", "blank_expr", "wire_atom_expr", 
        "wire_expr", "point_expr", "import_expr", "frame_expr",
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
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 104;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 104;
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
                case CircuitScriptParser.Frame:
                case CircuitScriptParser.Addition:
                case CircuitScriptParser.Divide:
                case CircuitScriptParser.ID:
                    {
                    this.state = 102;
                    this.expression();
                    }
                    break;
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 103;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 106;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2766119696) !== 0) || _la === 37 || _la === 45);
            this.state = 108;
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
            this.state = 127;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 2, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 110;
                this.add_component_expr();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 111;
                this.to_component_expr();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 112;
                this.at_component_expr();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 113;
                this.assignment_expr();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 114;
                this.property_set_expr();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 115;
                this.property_set_expr2();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 116;
                this.double_dot_property_set_expr();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 117;
                this.break_keyword();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 118;
                this.function_def_expr();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 119;
                this.function_call_expr();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 120;
                this.wire_expr();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 121;
                this.import_expr();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 122;
                this.frame_expr();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 123;
                this.atom_expr();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 124;
                this.at_block();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 125;
                this.path_blocks();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 126;
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
    public path_blocks(): Path_blocksContext {
        let localContext = new Path_blocksContext(this.context, this.state);
        this.enterRule(localContext, 4, CircuitScriptParser.RULE_path_blocks);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 130;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 129;
                    this.path_block_inner();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 132;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 3, this.context);
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
    public path_block_inner(): Path_block_innerContext {
        let localContext = new Path_block_innerContext(this.context, this.state);
        this.enterRule(localContext, 6, CircuitScriptParser.RULE_path_block_inner);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 134;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 1835520) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 135;
            this.match(CircuitScriptParser.T__0);
            this.state = 136;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 137;
            this.match(CircuitScriptParser.INDENT);
            this.state = 140;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 140;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 138;
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
                case CircuitScriptParser.Frame:
                case CircuitScriptParser.Addition:
                case CircuitScriptParser.Divide:
                case CircuitScriptParser.ID:
                    {
                    this.state = 139;
                    this.expression();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 142;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2766119696) !== 0) || _la === 37 || _la === 45);
            this.state = 144;
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
    public property_set_expr2(): Property_set_expr2Context {
        let localContext = new Property_set_expr2Context(this.context, this.state);
        this.enterRule(localContext, 8, CircuitScriptParser.RULE_property_set_expr2);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 146;
            this.atom_expr();
            this.state = 147;
            this.match(CircuitScriptParser.T__0);
            this.state = 148;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 149;
            this.match(CircuitScriptParser.INDENT);
            this.state = 152;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 152;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 150;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case CircuitScriptParser.ID:
                case CircuitScriptParser.INTEGER_VALUE:
                    {
                    this.state = 151;
                    this.assignment_expr2();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 154;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 259) !== 0));
            this.state = 156;
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
        this.enterRule(localContext, 10, CircuitScriptParser.RULE_assignment_expr2);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 158;
            _la = this.tokenStream.LA(1);
            if(!(_la === 37 || _la === 38)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 159;
            this.match(CircuitScriptParser.T__0);
            this.state = 160;
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
    public data_expr_with_assignment(): Data_expr_with_assignmentContext {
        let localContext = new Data_expr_with_assignmentContext(this.context, this.state);
        this.enterRule(localContext, 12, CircuitScriptParser.RULE_data_expr_with_assignment);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 164;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 8, this.context) ) {
            case 1:
                {
                this.state = 162;
                this.data_expr(0);
                }
                break;
            case 2:
                {
                this.state = 163;
                this.assignment_expr();
                }
                break;
            }
            this.state = 167;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 14) {
                {
                this.state = 166;
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
        this.enterRule(localContext, 14, CircuitScriptParser.RULE_add_component_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 169;
            this.match(CircuitScriptParser.Add);
            this.state = 170;
            this.data_expr_with_assignment();
            this.state = 172;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 10, this.context) ) {
            case 1:
                {
                this.state = 171;
                this.match(CircuitScriptParser.ID);
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
    public component_select_expr(): Component_select_exprContext {
        let localContext = new Component_select_exprContext(this.context, this.state);
        this.enterRule(localContext, 16, CircuitScriptParser.RULE_component_select_expr);
        try {
            this.state = 176;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.T__5:
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
                this.state = 174;
                this.data_expr_with_assignment();
                }
                break;
            case CircuitScriptParser.Pin:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 175;
                this.pin_select_expr();
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
    public pin_select_expr(): Pin_select_exprContext {
        let localContext = new Pin_select_exprContext(this.context, this.state);
        this.enterRule(localContext, 18, CircuitScriptParser.RULE_pin_select_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 178;
            this.match(CircuitScriptParser.Pin);
            this.state = 179;
            _la = this.tokenStream.LA(1);
            if(!(_la === 38 || _la === 41)) {
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
    public pin_select_expr2(): Pin_select_expr2Context {
        let localContext = new Pin_select_expr2Context(this.context, this.state);
        this.enterRule(localContext, 20, CircuitScriptParser.RULE_pin_select_expr2);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 181;
            _la = this.tokenStream.LA(1);
            if(!(_la === 38 || _la === 41)) {
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
        this.enterRule(localContext, 22, CircuitScriptParser.RULE_at_component_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 183;
            this.match(CircuitScriptParser.At);
            this.state = 189;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.T__5:
            case CircuitScriptParser.Create:
            case CircuitScriptParser.Pin:
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
                this.state = 184;
                this.component_select_expr();
                this.state = 186;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 12, this.context) ) {
                case 1:
                    {
                    this.state = 185;
                    this.match(CircuitScriptParser.ID);
                    }
                    break;
                }
                }
                }
                break;
            case CircuitScriptParser.Point:
                {
                this.state = 188;
                this.match(CircuitScriptParser.Point);
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
    public to_component_expr(): To_component_exprContext {
        let localContext = new To_component_exprContext(this.context, this.state);
        this.enterRule(localContext, 24, CircuitScriptParser.RULE_to_component_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 191;
            this.match(CircuitScriptParser.To);
            this.state = 204;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.T__5:
            case CircuitScriptParser.Create:
            case CircuitScriptParser.Pin:
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
                this.state = 192;
                this.component_select_expr();
                this.state = 197;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                    {
                    {
                    this.state = 193;
                    this.match(CircuitScriptParser.T__1);
                    this.state = 194;
                    this.component_select_expr();
                    }
                    }
                    this.state = 199;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 201;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 15, this.context) ) {
                case 1:
                    {
                    this.state = 200;
                    this.match(CircuitScriptParser.ID);
                    }
                    break;
                }
                }
                }
                break;
            case CircuitScriptParser.Point:
                {
                this.state = 203;
                this.match(CircuitScriptParser.Point);
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
    public at_to_multiple_expr(): At_to_multiple_exprContext {
        let localContext = new At_to_multiple_exprContext(this.context, this.state);
        this.enterRule(localContext, 26, CircuitScriptParser.RULE_at_to_multiple_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 206;
            this.match(CircuitScriptParser.At);
            this.state = 207;
            this.component_select_expr();
            this.state = 208;
            this.match(CircuitScriptParser.To);
            this.state = 209;
            this.component_select_expr();
            this.state = 214;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 210;
                this.match(CircuitScriptParser.T__1);
                this.state = 211;
                this.component_select_expr();
                }
                }
                this.state = 216;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 217;
            this.match(CircuitScriptParser.T__0);
            this.state = 218;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 219;
            this.match(CircuitScriptParser.INDENT);
            this.state = 222;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 222;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 220;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case CircuitScriptParser.INTEGER_VALUE:
                case CircuitScriptParser.STRING_VALUE:
                    {
                    this.state = 221;
                    this.at_to_multiple_line_expr();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 224;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 38)) & ~0x1F) === 0 && ((1 << (_la - 38)) & 137) !== 0));
            this.state = 226;
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
        this.enterRule(localContext, 28, CircuitScriptParser.RULE_at_to_multiple_line_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 228;
            this.pin_select_expr2();
            this.state = 229;
            this.match(CircuitScriptParser.T__0);
            this.state = 230;
            this.at_to_multiple_line_expr_to_pin();
            this.state = 235;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 231;
                this.match(CircuitScriptParser.T__1);
                this.state = 232;
                this.at_to_multiple_line_expr_to_pin();
                }
                }
                this.state = 237;
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
        this.enterRule(localContext, 30, CircuitScriptParser.RULE_at_to_multiple_line_expr_to_pin);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 238;
            _la = this.tokenStream.LA(1);
            if(!(_la === 35 || _la === 38)) {
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
        this.enterRule(localContext, 32, CircuitScriptParser.RULE_at_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 240;
            this.at_component_expr();
            this.state = 241;
            this.match(CircuitScriptParser.T__0);
            this.state = 242;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 243;
            this.match(CircuitScriptParser.INDENT);
            this.state = 246;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 246;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 244;
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
                case CircuitScriptParser.Frame:
                case CircuitScriptParser.Addition:
                case CircuitScriptParser.Divide:
                case CircuitScriptParser.ID:
                case CircuitScriptParser.INTEGER_VALUE:
                case CircuitScriptParser.STRING_VALUE:
                    {
                    this.state = 245;
                    this.at_block_expressions();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 248;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2766119696) !== 0) || ((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 275) !== 0));
            this.state = 250;
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
            this.state = 254;
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
            case CircuitScriptParser.Frame:
            case CircuitScriptParser.Addition:
            case CircuitScriptParser.Divide:
            case CircuitScriptParser.ID:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 252;
                this.expression();
                }
                break;
            case CircuitScriptParser.INTEGER_VALUE:
            case CircuitScriptParser.STRING_VALUE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 253;
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
    public at_block_pin_expr(): At_block_pin_exprContext {
        let localContext = new At_block_pin_exprContext(this.context, this.state);
        this.enterRule(localContext, 36, CircuitScriptParser.RULE_at_block_pin_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 256;
            this.pin_select_expr2();
            this.state = 257;
            this.match(CircuitScriptParser.T__0);
            this.state = 260;
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
            case CircuitScriptParser.Frame:
            case CircuitScriptParser.Addition:
            case CircuitScriptParser.Divide:
            case CircuitScriptParser.NOT_CONNECTED:
            case CircuitScriptParser.ID:
                {
                this.state = 258;
                this.at_block_pin_expression_simple();
                }
                break;
            case CircuitScriptParser.NEWLINE:
                {
                this.state = 259;
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
        this.enterRule(localContext, 38, CircuitScriptParser.RULE_at_block_pin_expression_simple);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 264;
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
            case CircuitScriptParser.Frame:
            case CircuitScriptParser.Addition:
            case CircuitScriptParser.Divide:
            case CircuitScriptParser.ID:
                {
                this.state = 262;
                this.expression();
                }
                break;
            case CircuitScriptParser.NOT_CONNECTED:
                {
                this.state = 263;
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
        this.enterRule(localContext, 40, CircuitScriptParser.RULE_at_block_pin_expression_complex);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 266;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 267;
            this.match(CircuitScriptParser.INDENT);
            this.state = 270;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 270;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 268;
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
                case CircuitScriptParser.Frame:
                case CircuitScriptParser.Addition:
                case CircuitScriptParser.Divide:
                case CircuitScriptParser.ID:
                    {
                    this.state = 269;
                    this.expression();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 272;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2766119696) !== 0) || _la === 37 || _la === 45);
            this.state = 274;
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
    public break_keyword(): Break_keywordContext {
        let localContext = new Break_keywordContext(this.context, this.state);
        this.enterRule(localContext, 42, CircuitScriptParser.RULE_break_keyword);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 276;
            this.match(CircuitScriptParser.Break);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
            this.state = 278;
            this.atom_expr();
            this.state = 279;
            this.match(CircuitScriptParser.T__2);
            this.state = 280;
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
        this.enterRule(localContext, 46, CircuitScriptParser.RULE_keyword_assignment_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 282;
            this.match(CircuitScriptParser.ID);
            this.state = 283;
            this.match(CircuitScriptParser.T__2);
            this.state = 284;
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
        this.enterRule(localContext, 48, CircuitScriptParser.RULE_parameters);
        let _la: number;
        try {
            let alternative: number;
            this.state = 309;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 31, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                {
                this.state = 286;
                this.data_expr(0);
                this.state = 291;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 28, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 287;
                        this.match(CircuitScriptParser.T__1);
                        this.state = 288;
                        this.data_expr(0);
                        }
                        }
                    }
                    this.state = 293;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 28, this.context);
                }
                this.state = 298;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                    {
                    {
                    this.state = 294;
                    this.match(CircuitScriptParser.T__1);
                    this.state = 295;
                    this.keyword_assignment_expr();
                    }
                    }
                    this.state = 300;
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
                this.state = 301;
                this.keyword_assignment_expr();
                this.state = 306;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                    {
                    {
                    this.state = 302;
                    this.match(CircuitScriptParser.T__1);
                    this.state = 303;
                    this.keyword_assignment_expr();
                    }
                    }
                    this.state = 308;
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
        this.enterRule(localContext, 50, CircuitScriptParser.RULE_property_set_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 311;
            this.atom_expr();
            this.state = 312;
            this.match(CircuitScriptParser.T__2);
            this.state = 313;
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
        this.enterRule(localContext, 52, CircuitScriptParser.RULE_double_dot_property_set_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 315;
            this.match(CircuitScriptParser.T__3);
            this.state = 316;
            this.match(CircuitScriptParser.ID);
            this.state = 317;
            this.match(CircuitScriptParser.T__2);
            this.state = 318;
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
        let _startState = 54;
        this.enterRecursionRule(localContext, 54, CircuitScriptParser.RULE_data_expr, _p);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 335;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 33, this.context) ) {
            case 1:
                {
                localContext = new RoundedBracketsExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;

                this.state = 321;
                this.match(CircuitScriptParser.OPEN_PAREN);
                this.state = 322;
                this.data_expr(0);
                this.state = 323;
                this.match(CircuitScriptParser.CLOSE_PAREN);
                }
                break;
            case 2:
                {
                localContext = new ValueAtomExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 327;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.T__5:
                case CircuitScriptParser.Minus:
                case CircuitScriptParser.BOOLEAN_VALUE:
                case CircuitScriptParser.INTEGER_VALUE:
                case CircuitScriptParser.DECIMAL_VALUE:
                case CircuitScriptParser.NUMERIC_VALUE:
                case CircuitScriptParser.STRING_VALUE:
                case CircuitScriptParser.PERCENTAGE_VALUE:
                    {
                    this.state = 325;
                    this.value_expr();
                    }
                    break;
                case CircuitScriptParser.ID:
                    {
                    this.state = 326;
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
                this.state = 329;
                this.unary_operator();
                this.state = 330;
                this.data_expr(7);
                }
                break;
            case 4:
                {
                localContext = new DataExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 332;
                this.create_component_expr();
                }
                break;
            case 5:
                {
                localContext = new DataExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 333;
                this.create_graphic_expr();
                }
                break;
            case 6:
                {
                localContext = new FunctionCallExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 334;
                this.function_call_expr();
                }
                break;
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 349;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 35, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 347;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 34, this.context) ) {
                    case 1:
                        {
                        localContext = new MultiplyExprContext(new Data_exprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CircuitScriptParser.RULE_data_expr);
                        this.state = 337;
                        if (!(this.precpred(this.context, 6))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 6)");
                        }
                        this.state = 338;
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 31 || _la === 32)) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 339;
                        this.data_expr(7);
                        }
                        break;
                    case 2:
                        {
                        localContext = new AdditionExprContext(new Data_exprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CircuitScriptParser.RULE_data_expr);
                        this.state = 340;
                        if (!(this.precpred(this.context, 5))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 5)");
                        }
                        this.state = 341;
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 29 || _la === 30)) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 342;
                        this.data_expr(6);
                        }
                        break;
                    case 3:
                        {
                        localContext = new BinaryOperatorExprContext(new Data_exprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CircuitScriptParser.RULE_data_expr);
                        this.state = 343;
                        if (!(this.precpred(this.context, 4))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 4)");
                        }
                        this.state = 344;
                        this.binary_operator();
                        this.state = 345;
                        this.data_expr(5);
                        }
                        break;
                    }
                    }
                }
                this.state = 351;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 35, this.context);
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
        this.enterRule(localContext, 56, CircuitScriptParser.RULE_binary_operator);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 352;
            _la = this.tokenStream.LA(1);
            if(!(_la === 27 || _la === 28)) {
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
        this.enterRule(localContext, 58, CircuitScriptParser.RULE_unary_operator);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 354;
            _la = this.tokenStream.LA(1);
            if(!(_la === 25 || _la === 30)) {
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
            this.state = 361;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.Minus:
            case CircuitScriptParser.BOOLEAN_VALUE:
            case CircuitScriptParser.INTEGER_VALUE:
            case CircuitScriptParser.DECIMAL_VALUE:
            case CircuitScriptParser.NUMERIC_VALUE:
            case CircuitScriptParser.STRING_VALUE:
            case CircuitScriptParser.PERCENTAGE_VALUE:
                this.enterOuterAlt(localContext, 1);
                {
                {
                this.state = 357;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 30) {
                    {
                    this.state = 356;
                    this.match(CircuitScriptParser.Minus);
                    }
                }

                this.state = 359;
                _la = this.tokenStream.LA(1);
                if(!(((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & 125) !== 0))) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                }
                }
                break;
            case CircuitScriptParser.T__5:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 360;
                this.blank_expr();
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
    public function_def_expr(): Function_def_exprContext {
        let localContext = new Function_def_exprContext(this.context, this.state);
        this.enterRule(localContext, 62, CircuitScriptParser.RULE_function_def_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 363;
            this.match(CircuitScriptParser.Define);
            this.state = 364;
            this.match(CircuitScriptParser.ID);
            this.state = 365;
            this.match(CircuitScriptParser.OPEN_PAREN);
            this.state = 367;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 37) {
                {
                this.state = 366;
                this.function_args_expr();
                }
            }

            this.state = 369;
            this.match(CircuitScriptParser.CLOSE_PAREN);
            this.state = 370;
            this.match(CircuitScriptParser.T__0);
            this.state = 371;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 372;
            this.match(CircuitScriptParser.INDENT);
            this.state = 375;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 375;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 373;
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
                case CircuitScriptParser.Frame:
                case CircuitScriptParser.Addition:
                case CircuitScriptParser.Divide:
                case CircuitScriptParser.ID:
                    {
                    this.state = 374;
                    this.function_expr();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 377;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2768216848) !== 0) || _la === 37 || _la === 45);
            this.state = 379;
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
            this.state = 383;
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
            case CircuitScriptParser.Frame:
            case CircuitScriptParser.Addition:
            case CircuitScriptParser.Divide:
            case CircuitScriptParser.ID:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 381;
                this.expression();
                }
                break;
            case CircuitScriptParser.Return:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 382;
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
            this.state = 414;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 45, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 385;
                this.match(CircuitScriptParser.ID);
                this.state = 390;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 42, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 386;
                        this.match(CircuitScriptParser.T__1);
                        this.state = 387;
                        this.match(CircuitScriptParser.ID);
                        }
                        }
                    }
                    this.state = 392;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 42, this.context);
                }
                this.state = 399;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                    {
                    {
                    this.state = 393;
                    this.match(CircuitScriptParser.T__1);
                    this.state = 394;
                    this.match(CircuitScriptParser.ID);
                    this.state = 395;
                    this.match(CircuitScriptParser.T__2);
                    this.state = 396;
                    this.value_expr();
                    }
                    }
                    this.state = 401;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 402;
                this.match(CircuitScriptParser.ID);
                this.state = 403;
                this.match(CircuitScriptParser.T__2);
                this.state = 404;
                this.value_expr();
                this.state = 411;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                    {
                    {
                    this.state = 405;
                    this.match(CircuitScriptParser.T__1);
                    this.state = 406;
                    this.match(CircuitScriptParser.ID);
                    this.state = 407;
                    this.match(CircuitScriptParser.T__2);
                    this.state = 408;
                    this.value_expr();
                    }
                    }
                    this.state = 413;
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
            this.state = 416;
            this.match(CircuitScriptParser.ID);
            this.state = 421;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 46, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 417;
                    this.match(CircuitScriptParser.T__4);
                    this.state = 418;
                    this.match(CircuitScriptParser.ID);
                    }
                    }
                }
                this.state = 423;
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
        this.enterRule(localContext, 70, CircuitScriptParser.RULE_trailer_expr);
        let _la: number;
        try {
            this.state = 431;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.OPEN_PAREN:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 424;
                this.match(CircuitScriptParser.OPEN_PAREN);
                this.state = 426;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3791651904) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 1017) !== 0)) {
                    {
                    this.state = 425;
                    this.parameters();
                    }
                }

                this.state = 428;
                this.match(CircuitScriptParser.CLOSE_PAREN);
                }
                break;
            case CircuitScriptParser.T__4:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 429;
                this.match(CircuitScriptParser.T__4);
                this.state = 430;
                this.match(CircuitScriptParser.ID);
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
        this.enterRule(localContext, 72, CircuitScriptParser.RULE_function_call_expr);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 434;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 29 || _la === 31) {
                {
                this.state = 433;
                this.net_namespace_expr();
                }
            }

            this.state = 436;
            this.match(CircuitScriptParser.ID);
            this.state = 438;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 437;
                    this.trailer_expr();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 440;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 50, this.context);
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
        this.enterRule(localContext, 74, CircuitScriptParser.RULE_net_namespace_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 443;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 29) {
                {
                this.state = 442;
                this.match(CircuitScriptParser.Addition);
                }
            }

            this.state = 445;
            this.match(CircuitScriptParser.Divide);
            this.state = 447;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 52, this.context) ) {
            case 1:
                {
                this.state = 446;
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
        this.enterRule(localContext, 76, CircuitScriptParser.RULE_function_return_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 449;
            this.match(CircuitScriptParser.Return);
            this.state = 450;
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
    public create_component_expr(): Create_component_exprContext {
        let localContext = new Create_component_exprContext(this.context, this.state);
        this.enterRule(localContext, 78, CircuitScriptParser.RULE_create_component_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 452;
            this.match(CircuitScriptParser.Create);
            this.state = 453;
            this.match(CircuitScriptParser.Component);
            this.state = 454;
            this.match(CircuitScriptParser.T__0);
            this.state = 455;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 456;
            this.match(CircuitScriptParser.INDENT);
            this.state = 459;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 459;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 457;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case CircuitScriptParser.ID:
                case CircuitScriptParser.INTEGER_VALUE:
                case CircuitScriptParser.STRING_VALUE:
                    {
                    this.state = 458;
                    this.property_expr();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 461;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 275) !== 0));
            this.state = 463;
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
        this.enterRule(localContext, 80, CircuitScriptParser.RULE_create_graphic_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 465;
            this.match(CircuitScriptParser.Create);
            this.state = 466;
            this.match(CircuitScriptParser.Graphic);
            this.state = 467;
            this.match(CircuitScriptParser.T__0);
            this.state = 468;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 469;
            this.match(CircuitScriptParser.INDENT);
            this.state = 472;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 472;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 470;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case CircuitScriptParser.Pin:
                case CircuitScriptParser.ID:
                    {
                    this.state = 471;
                    this.sub_expr();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 474;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 14)) & ~0x1F) === 0 && ((1 << (_la - 14)) & 2155872257) !== 0));
            this.state = 476;
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
    public sub_expr(): Sub_exprContext {
        let localContext = new Sub_exprContext(this.context, this.state);
        this.enterRule(localContext, 82, CircuitScriptParser.RULE_sub_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 478;
            localContext._command = this.tokenStream.LT(1);
            _la = this.tokenStream.LA(1);
            if(!(_la === 14 || _la === 37)) {
                localContext._command = this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 480;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 1) {
                {
                this.state = 479;
                this.match(CircuitScriptParser.T__0);
                }
            }

            this.state = 487;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 58, this.context) ) {
            case 1:
                {
                this.state = 482;
                this.parameters();
                }
                break;
            case 2:
                {
                this.state = 483;
                this.match(CircuitScriptParser.OPEN_PAREN);
                this.state = 484;
                this.parameters();
                this.state = 485;
                this.match(CircuitScriptParser.CLOSE_PAREN);
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
    public property_expr(): Property_exprContext {
        let localContext = new Property_exprContext(this.context, this.state);
        this.enterRule(localContext, 84, CircuitScriptParser.RULE_property_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 489;
            this.property_key_expr();
            this.state = 490;
            this.match(CircuitScriptParser.T__0);
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
        this.enterRule(localContext, 86, CircuitScriptParser.RULE_property_key_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 493;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 19) !== 0))) {
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
        this.enterRule(localContext, 88, CircuitScriptParser.RULE_property_value_expr);
        let _la: number;
        try {
            this.state = 512;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.NEWLINE:
                localContext = new Nested_propertiesContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 495;
                this.match(CircuitScriptParser.NEWLINE);
                this.state = 496;
                this.match(CircuitScriptParser.INDENT);
                this.state = 499;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                do {
                    {
                    this.state = 499;
                    this.errorHandler.sync(this);
                    switch (this.tokenStream.LA(1)) {
                    case CircuitScriptParser.NEWLINE:
                        {
                        this.state = 497;
                        this.match(CircuitScriptParser.NEWLINE);
                        }
                        break;
                    case CircuitScriptParser.ID:
                    case CircuitScriptParser.INTEGER_VALUE:
                    case CircuitScriptParser.STRING_VALUE:
                        {
                        this.state = 498;
                        this.property_expr();
                        }
                        break;
                    default:
                        throw new antlr.NoViableAltException(this);
                    }
                    }
                    this.state = 501;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                } while (((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 275) !== 0));
                this.state = 503;
                this.match(CircuitScriptParser.DEDENT);
                }
                break;
            case CircuitScriptParser.T__5:
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
                this.state = 504;
                this.data_expr(0);
                this.state = 509;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                    {
                    {
                    this.state = 505;
                    this.match(CircuitScriptParser.T__1);
                    this.state = 506;
                    this.data_expr(0);
                    }
                    }
                    this.state = 511;
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
    public blank_expr(): Blank_exprContext {
        let localContext = new Blank_exprContext(this.context, this.state);
        this.enterRule(localContext, 90, CircuitScriptParser.RULE_blank_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 514;
            this.match(CircuitScriptParser.T__5);
            this.state = 515;
            this.match(CircuitScriptParser.INTEGER_VALUE);
            this.state = 516;
            this.match(CircuitScriptParser.T__6);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 92, CircuitScriptParser.RULE_wire_atom_expr);
        try {
            this.state = 524;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 64, this.context) ) {
            case 1:
                localContext = new Wire_expr_direction_valueContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 518;
                this.match(CircuitScriptParser.ID);
                this.state = 521;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 63, this.context) ) {
                case 1:
                    {
                    this.state = 519;
                    this.match(CircuitScriptParser.INTEGER_VALUE);
                    }
                    break;
                case 2:
                    {
                    this.state = 520;
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
                this.state = 523;
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
        this.enterRule(localContext, 94, CircuitScriptParser.RULE_wire_expr);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 526;
            this.match(CircuitScriptParser.Wire);
            this.state = 530;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 65, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 527;
                    this.wire_atom_expr();
                    }
                    }
                }
                this.state = 532;
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
        this.enterRule(localContext, 96, CircuitScriptParser.RULE_point_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 533;
            this.match(CircuitScriptParser.Point);
            this.state = 534;
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
    public import_expr(): Import_exprContext {
        let localContext = new Import_exprContext(this.context, this.state);
        this.enterRule(localContext, 98, CircuitScriptParser.RULE_import_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 536;
            this.match(CircuitScriptParser.Import);
            this.state = 537;
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
        this.enterRule(localContext, 100, CircuitScriptParser.RULE_frame_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 539;
            this.match(CircuitScriptParser.Frame);
            this.state = 540;
            this.match(CircuitScriptParser.T__0);
            this.state = 541;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 542;
            this.match(CircuitScriptParser.INDENT);
            this.state = 545;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 545;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 543;
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
                case CircuitScriptParser.Frame:
                case CircuitScriptParser.Addition:
                case CircuitScriptParser.Divide:
                case CircuitScriptParser.ID:
                    {
                    this.state = 544;
                    this.expression();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 547;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2766119696) !== 0) || _la === 37 || _la === 45);
            this.state = 549;
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

    public override sempred(localContext: antlr.ParserRuleContext | null, ruleIndex: number, predIndex: number): boolean {
        switch (ruleIndex) {
        case 27:
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
        }
        return true;
    }

    public static readonly _serializedATN: number[] = [
        4,1,48,552,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,
        7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,
        2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,33,
        7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,39,
        2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,46,
        7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,1,0,1,0,4,0,105,8,0,
        11,0,12,0,106,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,128,8,1,1,2,4,2,131,8,2,11,2,12,2,
        132,1,3,1,3,1,3,1,3,1,3,1,3,4,3,141,8,3,11,3,12,3,142,1,3,1,3,1,
        4,1,4,1,4,1,4,1,4,1,4,4,4,153,8,4,11,4,12,4,154,1,4,1,4,1,5,1,5,
        1,5,1,5,1,6,1,6,3,6,165,8,6,1,6,3,6,168,8,6,1,7,1,7,1,7,3,7,173,
        8,7,1,8,1,8,3,8,177,8,8,1,9,1,9,1,9,1,10,1,10,1,11,1,11,1,11,3,11,
        187,8,11,1,11,3,11,190,8,11,1,12,1,12,1,12,1,12,5,12,196,8,12,10,
        12,12,12,199,9,12,1,12,3,12,202,8,12,1,12,3,12,205,8,12,1,13,1,13,
        1,13,1,13,1,13,1,13,5,13,213,8,13,10,13,12,13,216,9,13,1,13,1,13,
        1,13,1,13,1,13,4,13,223,8,13,11,13,12,13,224,1,13,1,13,1,14,1,14,
        1,14,1,14,1,14,5,14,234,8,14,10,14,12,14,237,9,14,1,15,1,15,1,16,
        1,16,1,16,1,16,1,16,1,16,4,16,247,8,16,11,16,12,16,248,1,16,1,16,
        1,17,1,17,3,17,255,8,17,1,18,1,18,1,18,1,18,3,18,261,8,18,1,19,1,
        19,3,19,265,8,19,1,20,1,20,1,20,1,20,4,20,271,8,20,11,20,12,20,272,
        1,20,1,20,1,21,1,21,1,22,1,22,1,22,1,22,1,23,1,23,1,23,1,23,1,24,
        1,24,1,24,5,24,290,8,24,10,24,12,24,293,9,24,1,24,1,24,5,24,297,
        8,24,10,24,12,24,300,9,24,1,24,1,24,1,24,5,24,305,8,24,10,24,12,
        24,308,9,24,3,24,310,8,24,1,25,1,25,1,25,1,25,1,26,1,26,1,26,1,26,
        1,26,1,27,1,27,1,27,1,27,1,27,1,27,1,27,3,27,328,8,27,1,27,1,27,
        1,27,1,27,1,27,1,27,3,27,336,8,27,1,27,1,27,1,27,1,27,1,27,1,27,
        1,27,1,27,1,27,1,27,5,27,348,8,27,10,27,12,27,351,9,27,1,28,1,28,
        1,29,1,29,1,30,3,30,358,8,30,1,30,1,30,3,30,362,8,30,1,31,1,31,1,
        31,1,31,3,31,368,8,31,1,31,1,31,1,31,1,31,1,31,1,31,4,31,376,8,31,
        11,31,12,31,377,1,31,1,31,1,32,1,32,3,32,384,8,32,1,33,1,33,1,33,
        5,33,389,8,33,10,33,12,33,392,9,33,1,33,1,33,1,33,1,33,5,33,398,
        8,33,10,33,12,33,401,9,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,5,33,
        410,8,33,10,33,12,33,413,9,33,3,33,415,8,33,1,34,1,34,1,34,5,34,
        420,8,34,10,34,12,34,423,9,34,1,35,1,35,3,35,427,8,35,1,35,1,35,
        1,35,3,35,432,8,35,1,36,3,36,435,8,36,1,36,1,36,4,36,439,8,36,11,
        36,12,36,440,1,37,3,37,444,8,37,1,37,1,37,3,37,448,8,37,1,38,1,38,
        1,38,1,39,1,39,1,39,1,39,1,39,1,39,1,39,4,39,460,8,39,11,39,12,39,
        461,1,39,1,39,1,40,1,40,1,40,1,40,1,40,1,40,1,40,4,40,473,8,40,11,
        40,12,40,474,1,40,1,40,1,41,1,41,3,41,481,8,41,1,41,1,41,1,41,1,
        41,1,41,3,41,488,8,41,1,42,1,42,1,42,1,42,1,43,1,43,1,44,1,44,1,
        44,1,44,4,44,500,8,44,11,44,12,44,501,1,44,1,44,1,44,1,44,5,44,508,
        8,44,10,44,12,44,511,9,44,3,44,513,8,44,1,45,1,45,1,45,1,45,1,46,
        1,46,1,46,3,46,522,8,46,1,46,3,46,525,8,46,1,47,1,47,5,47,529,8,
        47,10,47,12,47,532,9,47,1,48,1,48,1,48,1,49,1,49,1,49,1,50,1,50,
        1,50,1,50,1,50,1,50,4,50,546,8,50,11,50,12,50,547,1,50,1,50,1,50,
        0,1,54,51,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,
        40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,
        84,86,88,90,92,94,96,98,100,0,11,2,0,9,9,18,20,1,0,37,38,2,0,38,
        38,41,41,2,0,35,35,38,38,1,0,31,32,1,0,29,30,1,0,27,28,2,0,25,25,
        30,30,2,0,36,36,38,42,2,0,14,14,37,37,2,0,37,38,41,41,588,0,104,
        1,0,0,0,2,127,1,0,0,0,4,130,1,0,0,0,6,134,1,0,0,0,8,146,1,0,0,0,
        10,158,1,0,0,0,12,164,1,0,0,0,14,169,1,0,0,0,16,176,1,0,0,0,18,178,
        1,0,0,0,20,181,1,0,0,0,22,183,1,0,0,0,24,191,1,0,0,0,26,206,1,0,
        0,0,28,228,1,0,0,0,30,238,1,0,0,0,32,240,1,0,0,0,34,254,1,0,0,0,
        36,256,1,0,0,0,38,264,1,0,0,0,40,266,1,0,0,0,42,276,1,0,0,0,44,278,
        1,0,0,0,46,282,1,0,0,0,48,309,1,0,0,0,50,311,1,0,0,0,52,315,1,0,
        0,0,54,335,1,0,0,0,56,352,1,0,0,0,58,354,1,0,0,0,60,361,1,0,0,0,
        62,363,1,0,0,0,64,383,1,0,0,0,66,414,1,0,0,0,68,416,1,0,0,0,70,431,
        1,0,0,0,72,434,1,0,0,0,74,443,1,0,0,0,76,449,1,0,0,0,78,452,1,0,
        0,0,80,465,1,0,0,0,82,478,1,0,0,0,84,489,1,0,0,0,86,493,1,0,0,0,
        88,512,1,0,0,0,90,514,1,0,0,0,92,524,1,0,0,0,94,526,1,0,0,0,96,533,
        1,0,0,0,98,536,1,0,0,0,100,539,1,0,0,0,102,105,3,2,1,0,103,105,5,
        45,0,0,104,102,1,0,0,0,104,103,1,0,0,0,105,106,1,0,0,0,106,104,1,
        0,0,0,106,107,1,0,0,0,107,108,1,0,0,0,108,109,5,0,0,1,109,1,1,0,
        0,0,110,128,3,14,7,0,111,128,3,24,12,0,112,128,3,22,11,0,113,128,
        3,44,22,0,114,128,3,50,25,0,115,128,3,8,4,0,116,128,3,52,26,0,117,
        128,3,42,21,0,118,128,3,62,31,0,119,128,3,72,36,0,120,128,3,94,47,
        0,121,128,3,98,49,0,122,128,3,100,50,0,123,128,3,68,34,0,124,128,
        3,32,16,0,125,128,3,4,2,0,126,128,3,96,48,0,127,110,1,0,0,0,127,
        111,1,0,0,0,127,112,1,0,0,0,127,113,1,0,0,0,127,114,1,0,0,0,127,
        115,1,0,0,0,127,116,1,0,0,0,127,117,1,0,0,0,127,118,1,0,0,0,127,
        119,1,0,0,0,127,120,1,0,0,0,127,121,1,0,0,0,127,122,1,0,0,0,127,
        123,1,0,0,0,127,124,1,0,0,0,127,125,1,0,0,0,127,126,1,0,0,0,128,
        3,1,0,0,0,129,131,3,6,3,0,130,129,1,0,0,0,131,132,1,0,0,0,132,130,
        1,0,0,0,132,133,1,0,0,0,133,5,1,0,0,0,134,135,7,0,0,0,135,136,5,
        1,0,0,136,137,5,45,0,0,137,140,5,47,0,0,138,141,5,45,0,0,139,141,
        3,2,1,0,140,138,1,0,0,0,140,139,1,0,0,0,141,142,1,0,0,0,142,140,
        1,0,0,0,142,143,1,0,0,0,143,144,1,0,0,0,144,145,5,48,0,0,145,7,1,
        0,0,0,146,147,3,68,34,0,147,148,5,1,0,0,148,149,5,45,0,0,149,152,
        5,47,0,0,150,153,5,45,0,0,151,153,3,10,5,0,152,150,1,0,0,0,152,151,
        1,0,0,0,153,154,1,0,0,0,154,152,1,0,0,0,154,155,1,0,0,0,155,156,
        1,0,0,0,156,157,5,48,0,0,157,9,1,0,0,0,158,159,7,1,0,0,159,160,5,
        1,0,0,160,161,3,60,30,0,161,11,1,0,0,0,162,165,3,54,27,0,163,165,
        3,44,22,0,164,162,1,0,0,0,164,163,1,0,0,0,165,167,1,0,0,0,166,168,
        3,18,9,0,167,166,1,0,0,0,167,168,1,0,0,0,168,13,1,0,0,0,169,170,
        5,15,0,0,170,172,3,12,6,0,171,173,5,37,0,0,172,171,1,0,0,0,172,173,
        1,0,0,0,173,15,1,0,0,0,174,177,3,12,6,0,175,177,3,18,9,0,176,174,
        1,0,0,0,176,175,1,0,0,0,177,17,1,0,0,0,178,179,5,14,0,0,179,180,
        7,2,0,0,180,19,1,0,0,0,181,182,7,2,0,0,182,21,1,0,0,0,183,189,5,
        16,0,0,184,186,3,16,8,0,185,187,5,37,0,0,186,185,1,0,0,0,186,187,
        1,0,0,0,187,190,1,0,0,0,188,190,5,18,0,0,189,184,1,0,0,0,189,188,
        1,0,0,0,190,23,1,0,0,0,191,204,5,17,0,0,192,197,3,16,8,0,193,194,
        5,2,0,0,194,196,3,16,8,0,195,193,1,0,0,0,196,199,1,0,0,0,197,195,
        1,0,0,0,197,198,1,0,0,0,198,201,1,0,0,0,199,197,1,0,0,0,200,202,
        5,37,0,0,201,200,1,0,0,0,201,202,1,0,0,0,202,205,1,0,0,0,203,205,
        5,18,0,0,204,192,1,0,0,0,204,203,1,0,0,0,205,25,1,0,0,0,206,207,
        5,16,0,0,207,208,3,16,8,0,208,209,5,17,0,0,209,214,3,16,8,0,210,
        211,5,2,0,0,211,213,3,16,8,0,212,210,1,0,0,0,213,216,1,0,0,0,214,
        212,1,0,0,0,214,215,1,0,0,0,215,217,1,0,0,0,216,214,1,0,0,0,217,
        218,5,1,0,0,218,219,5,45,0,0,219,222,5,47,0,0,220,223,5,45,0,0,221,
        223,3,28,14,0,222,220,1,0,0,0,222,221,1,0,0,0,223,224,1,0,0,0,224,
        222,1,0,0,0,224,225,1,0,0,0,225,226,1,0,0,0,226,227,5,48,0,0,227,
        27,1,0,0,0,228,229,3,20,10,0,229,230,5,1,0,0,230,235,3,30,15,0,231,
        232,5,2,0,0,232,234,3,30,15,0,233,231,1,0,0,0,234,237,1,0,0,0,235,
        233,1,0,0,0,235,236,1,0,0,0,236,29,1,0,0,0,237,235,1,0,0,0,238,239,
        7,3,0,0,239,31,1,0,0,0,240,241,3,22,11,0,241,242,5,1,0,0,242,243,
        5,45,0,0,243,246,5,47,0,0,244,247,5,45,0,0,245,247,3,34,17,0,246,
        244,1,0,0,0,246,245,1,0,0,0,247,248,1,0,0,0,248,246,1,0,0,0,248,
        249,1,0,0,0,249,250,1,0,0,0,250,251,5,48,0,0,251,33,1,0,0,0,252,
        255,3,2,1,0,253,255,3,36,18,0,254,252,1,0,0,0,254,253,1,0,0,0,255,
        35,1,0,0,0,256,257,3,20,10,0,257,260,5,1,0,0,258,261,3,38,19,0,259,
        261,3,40,20,0,260,258,1,0,0,0,260,259,1,0,0,0,261,37,1,0,0,0,262,
        265,3,2,1,0,263,265,5,35,0,0,264,262,1,0,0,0,264,263,1,0,0,0,265,
        39,1,0,0,0,266,267,5,45,0,0,267,270,5,47,0,0,268,271,5,45,0,0,269,
        271,3,2,1,0,270,268,1,0,0,0,270,269,1,0,0,0,271,272,1,0,0,0,272,
        270,1,0,0,0,272,273,1,0,0,0,273,274,1,0,0,0,274,275,5,48,0,0,275,
        41,1,0,0,0,276,277,5,8,0,0,277,43,1,0,0,0,278,279,3,68,34,0,279,
        280,5,3,0,0,280,281,3,54,27,0,281,45,1,0,0,0,282,283,5,37,0,0,283,
        284,5,3,0,0,284,285,3,54,27,0,285,47,1,0,0,0,286,291,3,54,27,0,287,
        288,5,2,0,0,288,290,3,54,27,0,289,287,1,0,0,0,290,293,1,0,0,0,291,
        289,1,0,0,0,291,292,1,0,0,0,292,298,1,0,0,0,293,291,1,0,0,0,294,
        295,5,2,0,0,295,297,3,46,23,0,296,294,1,0,0,0,297,300,1,0,0,0,298,
        296,1,0,0,0,298,299,1,0,0,0,299,310,1,0,0,0,300,298,1,0,0,0,301,
        306,3,46,23,0,302,303,5,2,0,0,303,305,3,46,23,0,304,302,1,0,0,0,
        305,308,1,0,0,0,306,304,1,0,0,0,306,307,1,0,0,0,307,310,1,0,0,0,
        308,306,1,0,0,0,309,286,1,0,0,0,309,301,1,0,0,0,310,49,1,0,0,0,311,
        312,3,68,34,0,312,313,5,3,0,0,313,314,3,54,27,0,314,51,1,0,0,0,315,
        316,5,4,0,0,316,317,5,37,0,0,317,318,5,3,0,0,318,319,3,54,27,0,319,
        53,1,0,0,0,320,321,6,27,-1,0,321,322,5,33,0,0,322,323,3,54,27,0,
        323,324,5,34,0,0,324,336,1,0,0,0,325,328,3,60,30,0,326,328,3,68,
        34,0,327,325,1,0,0,0,327,326,1,0,0,0,328,336,1,0,0,0,329,330,3,58,
        29,0,330,331,3,54,27,7,331,336,1,0,0,0,332,336,3,78,39,0,333,336,
        3,80,40,0,334,336,3,72,36,0,335,320,1,0,0,0,335,327,1,0,0,0,335,
        329,1,0,0,0,335,332,1,0,0,0,335,333,1,0,0,0,335,334,1,0,0,0,336,
        349,1,0,0,0,337,338,10,6,0,0,338,339,7,4,0,0,339,348,3,54,27,7,340,
        341,10,5,0,0,341,342,7,5,0,0,342,348,3,54,27,6,343,344,10,4,0,0,
        344,345,3,56,28,0,345,346,3,54,27,5,346,348,1,0,0,0,347,337,1,0,
        0,0,347,340,1,0,0,0,347,343,1,0,0,0,348,351,1,0,0,0,349,347,1,0,
        0,0,349,350,1,0,0,0,350,55,1,0,0,0,351,349,1,0,0,0,352,353,7,6,0,
        0,353,57,1,0,0,0,354,355,7,7,0,0,355,59,1,0,0,0,356,358,5,30,0,0,
        357,356,1,0,0,0,357,358,1,0,0,0,358,359,1,0,0,0,359,362,7,8,0,0,
        360,362,3,90,45,0,361,357,1,0,0,0,361,360,1,0,0,0,362,61,1,0,0,0,
        363,364,5,22,0,0,364,365,5,37,0,0,365,367,5,33,0,0,366,368,3,66,
        33,0,367,366,1,0,0,0,367,368,1,0,0,0,368,369,1,0,0,0,369,370,5,34,
        0,0,370,371,5,1,0,0,371,372,5,45,0,0,372,375,5,47,0,0,373,376,5,
        45,0,0,374,376,3,64,32,0,375,373,1,0,0,0,375,374,1,0,0,0,376,377,
        1,0,0,0,377,375,1,0,0,0,377,378,1,0,0,0,378,379,1,0,0,0,379,380,
        5,48,0,0,380,63,1,0,0,0,381,384,3,2,1,0,382,384,3,76,38,0,383,381,
        1,0,0,0,383,382,1,0,0,0,384,65,1,0,0,0,385,390,5,37,0,0,386,387,
        5,2,0,0,387,389,5,37,0,0,388,386,1,0,0,0,389,392,1,0,0,0,390,388,
        1,0,0,0,390,391,1,0,0,0,391,399,1,0,0,0,392,390,1,0,0,0,393,394,
        5,2,0,0,394,395,5,37,0,0,395,396,5,3,0,0,396,398,3,60,30,0,397,393,
        1,0,0,0,398,401,1,0,0,0,399,397,1,0,0,0,399,400,1,0,0,0,400,415,
        1,0,0,0,401,399,1,0,0,0,402,403,5,37,0,0,403,404,5,3,0,0,404,411,
        3,60,30,0,405,406,5,2,0,0,406,407,5,37,0,0,407,408,5,3,0,0,408,410,
        3,60,30,0,409,405,1,0,0,0,410,413,1,0,0,0,411,409,1,0,0,0,411,412,
        1,0,0,0,412,415,1,0,0,0,413,411,1,0,0,0,414,385,1,0,0,0,414,402,
        1,0,0,0,415,67,1,0,0,0,416,421,5,37,0,0,417,418,5,5,0,0,418,420,
        5,37,0,0,419,417,1,0,0,0,420,423,1,0,0,0,421,419,1,0,0,0,421,422,
        1,0,0,0,422,69,1,0,0,0,423,421,1,0,0,0,424,426,5,33,0,0,425,427,
        3,48,24,0,426,425,1,0,0,0,426,427,1,0,0,0,427,428,1,0,0,0,428,432,
        5,34,0,0,429,430,5,5,0,0,430,432,5,37,0,0,431,424,1,0,0,0,431,429,
        1,0,0,0,432,71,1,0,0,0,433,435,3,74,37,0,434,433,1,0,0,0,434,435,
        1,0,0,0,435,436,1,0,0,0,436,438,5,37,0,0,437,439,3,70,35,0,438,437,
        1,0,0,0,439,440,1,0,0,0,440,438,1,0,0,0,440,441,1,0,0,0,441,73,1,
        0,0,0,442,444,5,29,0,0,443,442,1,0,0,0,443,444,1,0,0,0,444,445,1,
        0,0,0,445,447,5,31,0,0,446,448,3,54,27,0,447,446,1,0,0,0,447,448,
        1,0,0,0,448,75,1,0,0,0,449,450,5,21,0,0,450,451,3,54,27,0,451,77,
        1,0,0,0,452,453,5,10,0,0,453,454,5,11,0,0,454,455,5,1,0,0,455,456,
        5,45,0,0,456,459,5,47,0,0,457,460,5,45,0,0,458,460,3,84,42,0,459,
        457,1,0,0,0,459,458,1,0,0,0,460,461,1,0,0,0,461,459,1,0,0,0,461,
        462,1,0,0,0,462,463,1,0,0,0,463,464,5,48,0,0,464,79,1,0,0,0,465,
        466,5,10,0,0,466,467,5,12,0,0,467,468,5,1,0,0,468,469,5,45,0,0,469,
        472,5,47,0,0,470,473,5,45,0,0,471,473,3,82,41,0,472,470,1,0,0,0,
        472,471,1,0,0,0,473,474,1,0,0,0,474,472,1,0,0,0,474,475,1,0,0,0,
        475,476,1,0,0,0,476,477,5,48,0,0,477,81,1,0,0,0,478,480,7,9,0,0,
        479,481,5,1,0,0,480,479,1,0,0,0,480,481,1,0,0,0,481,487,1,0,0,0,
        482,488,3,48,24,0,483,484,5,33,0,0,484,485,3,48,24,0,485,486,5,34,
        0,0,486,488,1,0,0,0,487,482,1,0,0,0,487,483,1,0,0,0,488,83,1,0,0,
        0,489,490,3,86,43,0,490,491,5,1,0,0,491,492,3,88,44,0,492,85,1,0,
        0,0,493,494,7,10,0,0,494,87,1,0,0,0,495,496,5,45,0,0,496,499,5,47,
        0,0,497,500,5,45,0,0,498,500,3,84,42,0,499,497,1,0,0,0,499,498,1,
        0,0,0,500,501,1,0,0,0,501,499,1,0,0,0,501,502,1,0,0,0,502,503,1,
        0,0,0,503,513,5,48,0,0,504,509,3,54,27,0,505,506,5,2,0,0,506,508,
        3,54,27,0,507,505,1,0,0,0,508,511,1,0,0,0,509,507,1,0,0,0,509,510,
        1,0,0,0,510,513,1,0,0,0,511,509,1,0,0,0,512,495,1,0,0,0,512,504,
        1,0,0,0,513,89,1,0,0,0,514,515,5,6,0,0,515,516,5,38,0,0,516,517,
        5,7,0,0,517,91,1,0,0,0,518,521,5,37,0,0,519,522,5,38,0,0,520,522,
        3,54,27,0,521,519,1,0,0,0,521,520,1,0,0,0,522,525,1,0,0,0,523,525,
        5,37,0,0,524,518,1,0,0,0,524,523,1,0,0,0,525,93,1,0,0,0,526,530,
        5,13,0,0,527,529,3,92,46,0,528,527,1,0,0,0,529,532,1,0,0,0,530,528,
        1,0,0,0,530,531,1,0,0,0,531,95,1,0,0,0,532,530,1,0,0,0,533,534,5,
        18,0,0,534,535,5,37,0,0,535,97,1,0,0,0,536,537,5,23,0,0,537,538,
        5,37,0,0,538,99,1,0,0,0,539,540,5,26,0,0,540,541,5,1,0,0,541,542,
        5,45,0,0,542,545,5,47,0,0,543,546,5,45,0,0,544,546,3,2,1,0,545,543,
        1,0,0,0,545,544,1,0,0,0,546,547,1,0,0,0,547,545,1,0,0,0,547,548,
        1,0,0,0,548,549,1,0,0,0,549,550,5,48,0,0,550,101,1,0,0,0,68,104,
        106,127,132,140,142,152,154,164,167,172,176,186,189,197,201,204,
        214,222,224,235,246,248,254,260,264,270,272,291,298,306,309,327,
        335,347,349,357,361,367,375,377,383,390,399,411,414,421,426,431,
        434,440,443,447,459,461,472,474,480,487,499,501,509,512,521,524,
        530,545,547
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
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
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
    public add_component_expr(): Add_component_exprContext | null {
        return this.getRuleContext(0, Add_component_exprContext);
    }
    public to_component_expr(): To_component_exprContext | null {
        return this.getRuleContext(0, To_component_exprContext);
    }
    public at_component_expr(): At_component_exprContext | null {
        return this.getRuleContext(0, At_component_exprContext);
    }
    public assignment_expr(): Assignment_exprContext | null {
        return this.getRuleContext(0, Assignment_exprContext);
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
    public break_keyword(): Break_keywordContext | null {
        return this.getRuleContext(0, Break_keywordContext);
    }
    public function_def_expr(): Function_def_exprContext | null {
        return this.getRuleContext(0, Function_def_exprContext);
    }
    public function_call_expr(): Function_call_exprContext | null {
        return this.getRuleContext(0, Function_call_exprContext);
    }
    public wire_expr(): Wire_exprContext | null {
        return this.getRuleContext(0, Wire_exprContext);
    }
    public import_expr(): Import_exprContext | null {
        return this.getRuleContext(0, Import_exprContext);
    }
    public frame_expr(): Frame_exprContext | null {
        return this.getRuleContext(0, Frame_exprContext);
    }
    public atom_expr(): Atom_exprContext | null {
        return this.getRuleContext(0, Atom_exprContext);
    }
    public at_block(): At_blockContext | null {
        return this.getRuleContext(0, At_blockContext);
    }
    public path_blocks(): Path_blocksContext | null {
        return this.getRuleContext(0, Path_blocksContext);
    }
    public point_expr(): Point_exprContext | null {
        return this.getRuleContext(0, Point_exprContext);
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


export class Path_blocksContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public path_block_inner(): Path_block_innerContext[];
    public path_block_inner(i: number): Path_block_innerContext | null;
    public path_block_inner(i?: number): Path_block_innerContext[] | Path_block_innerContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Path_block_innerContext);
        }

        return this.getRuleContext(i, Path_block_innerContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_path_blocks;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitPath_blocks) {
            return visitor.visitPath_blocks(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Path_block_innerContext extends antlr.ParserRuleContext {
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
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_path_block_inner;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitPath_block_inner) {
            return visitor.visitPath_block_inner(this);
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
    public ID(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.ID, 0);
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


export class Pin_select_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Pin(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Pin, 0)!;
    }
    public INTEGER_VALUE(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.INTEGER_VALUE, 0);
    }
    public STRING_VALUE(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.STRING_VALUE, 0);
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
    public Point(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.Point, 0);
    }
    public component_select_expr(): Component_select_exprContext | null {
        return this.getRuleContext(0, Component_select_exprContext);
    }
    public ID(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.ID, 0);
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
    public Point(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.Point, 0);
    }
    public component_select_expr(): Component_select_exprContext[];
    public component_select_expr(i: number): Component_select_exprContext | null;
    public component_select_expr(i?: number): Component_select_exprContext[] | Component_select_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Component_select_exprContext);
        }

        return this.getRuleContext(i, Component_select_exprContext);
    }
    public ID(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.ID, 0);
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
    public at_component_expr(): At_component_exprContext {
        return this.getRuleContext(0, At_component_exprContext)!;
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


export class Break_keywordContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Break(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Break, 0)!;
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_break_keyword;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitBreak_keyword) {
            return visitor.visitBreak_keyword(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Assignment_exprContext extends antlr.ParserRuleContext {
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
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitMultiplyExpr) {
            return visitor.visitMultiplyExpr(this);
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
    public blank_expr(): Blank_exprContext | null {
        return this.getRuleContext(0, Blank_exprContext);
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
    public ID(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.ID, 0);
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
    public sub_expr(): Sub_exprContext[];
    public sub_expr(i: number): Sub_exprContext | null;
    public sub_expr(i?: number): Sub_exprContext[] | Sub_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Sub_exprContext);
        }

        return this.getRuleContext(i, Sub_exprContext);
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


export class Sub_exprContext extends antlr.ParserRuleContext {
    public _command?: Token | null;
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
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
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_sub_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitSub_expr) {
            return visitor.visitSub_expr(this);
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
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitNested_properties) {
            return visitor.visitNested_properties(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Blank_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public INTEGER_VALUE(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.INTEGER_VALUE, 0)!;
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_blank_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitBlank_expr) {
            return visitor.visitBlank_expr(this);
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


export class Point_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Point(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Point, 0)!;
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.ID, 0)!;
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
    public Frame(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Frame, 0)!;
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
