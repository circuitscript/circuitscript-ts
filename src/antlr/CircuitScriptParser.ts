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
    public static readonly If = 28;
    public static readonly Else = 29;
    public static readonly Not = 30;
    public static readonly Frame = 31;
    public static readonly Sheet = 32;
    public static readonly Equals = 33;
    public static readonly NotEquals = 34;
    public static readonly GreaterThan = 35;
    public static readonly GreatOrEqualThan = 36;
    public static readonly LessThan = 37;
    public static readonly LessOrEqualThan = 38;
    public static readonly LogicalAnd = 39;
    public static readonly LogicalOr = 40;
    public static readonly Addition = 41;
    public static readonly Minus = 42;
    public static readonly Divide = 43;
    public static readonly Multiply = 44;
    public static readonly OPEN_PAREN = 45;
    public static readonly CLOSE_PAREN = 46;
    public static readonly NOT_CONNECTED = 47;
    public static readonly BOOLEAN_VALUE = 48;
    public static readonly ID = 49;
    public static readonly INTEGER_VALUE = 50;
    public static readonly DECIMAL_VALUE = 51;
    public static readonly NUMERIC_VALUE = 52;
    public static readonly STRING_VALUE = 53;
    public static readonly PERCENTAGE_VALUE = 54;
    public static readonly ALPHA_NUMERIC = 55;
    public static readonly WS = 56;
    public static readonly NEWLINE = 57;
    public static readonly COMMENT = 58;
    public static readonly INDENT = 59;
    public static readonly DEDENT = 60;
    public static readonly RULE_script = 0;
    public static readonly RULE_expression = 1;
    public static readonly RULE_expressions_block = 2;
    public static readonly RULE_path_blocks = 3;
    public static readonly RULE_path_block_inner = 4;
    public static readonly RULE_property_set_expr2 = 5;
    public static readonly RULE_assignment_expr2 = 6;
    public static readonly RULE_pin_select_expr = 7;
    public static readonly RULE_component_modifier_expr = 8;
    public static readonly RULE_data_expr_with_assignment = 9;
    public static readonly RULE_add_component_expr = 10;
    public static readonly RULE_component_select_expr = 11;
    public static readonly RULE_pin_select_expr2 = 12;
    public static readonly RULE_at_component_expr = 13;
    public static readonly RULE_to_component_expr = 14;
    public static readonly RULE_at_to_multiple_expr = 15;
    public static readonly RULE_at_to_multiple_line_expr = 16;
    public static readonly RULE_at_to_multiple_line_expr_to_pin = 17;
    public static readonly RULE_at_block = 18;
    public static readonly RULE_at_block_expressions = 19;
    public static readonly RULE_at_block_pin_expr = 20;
    public static readonly RULE_at_block_pin_expression_simple = 21;
    public static readonly RULE_at_block_pin_expression_complex = 22;
    public static readonly RULE_break_keyword = 23;
    public static readonly RULE_assignment_expr = 24;
    public static readonly RULE_keyword_assignment_expr = 25;
    public static readonly RULE_parameters = 26;
    public static readonly RULE_property_set_expr = 27;
    public static readonly RULE_double_dot_property_set_expr = 28;
    public static readonly RULE_data_expr = 29;
    public static readonly RULE_binary_operator = 30;
    public static readonly RULE_unary_operator = 31;
    public static readonly RULE_value_expr = 32;
    public static readonly RULE_function_def_expr = 33;
    public static readonly RULE_function_expr = 34;
    public static readonly RULE_function_args_expr = 35;
    public static readonly RULE_atom_expr = 36;
    public static readonly RULE_trailer_expr = 37;
    public static readonly RULE_function_call_expr = 38;
    public static readonly RULE_net_namespace_expr = 39;
    public static readonly RULE_function_return_expr = 40;
    public static readonly RULE_property_block_expr = 41;
    public static readonly RULE_create_component_expr = 42;
    public static readonly RULE_create_graphic_expr = 43;
    public static readonly RULE_create_module_expr = 44;
    public static readonly RULE_nested_properties_inner = 45;
    public static readonly RULE_graphic_expr = 46;
    public static readonly RULE_property_expr = 47;
    public static readonly RULE_property_key_expr = 48;
    public static readonly RULE_property_value_expr = 49;
    public static readonly RULE_wire_atom_expr = 50;
    public static readonly RULE_wire_expr = 51;
    public static readonly RULE_array_expr = 52;
    public static readonly RULE_point_expr = 53;
    public static readonly RULE_import_expr = 54;
    public static readonly RULE_frame_expr = 55;
    public static readonly RULE_if_expr = 56;
    public static readonly RULE_if_inner_expr = 57;
    public static readonly RULE_else_expr = 58;
    public static readonly RULE_while_expr = 59;

    public static readonly literalNames = [
        null, "':'", "','", "'='", "'..'", "'.'", "'['", "']'", "'break'", 
        "'branch'", "'create'", "'component'", "'graphic'", "'module'", 
        "'wire'", "'pin'", "'add'", "'at'", "'to'", "'point'", "'join'", 
        "'parallel'", "'return'", "'def'", "'import'", "'for'", "'in'", 
        "'while'", "'if'", "'else'", "'!'", "'frame'", "'sheet'", "'=='", 
        "'!='", "'>'", "'>='", "'<'", "'<='", "'&&'", "'||'", "'+'", "'-'", 
        "'/'", "'*'", "'('", "')'"
    ];

    public static readonly symbolicNames = [
        null, null, null, null, null, null, null, null, "Break", "Branch", 
        "Create", "Component", "Graphic", "Module", "Wire", "Pin", "Add", 
        "At", "To", "Point", "Join", "Parallel", "Return", "Define", "Import", 
        "For", "In", "While", "If", "Else", "Not", "Frame", "Sheet", "Equals", 
        "NotEquals", "GreaterThan", "GreatOrEqualThan", "LessThan", "LessOrEqualThan", 
        "LogicalAnd", "LogicalOr", "Addition", "Minus", "Divide", "Multiply", 
        "OPEN_PAREN", "CLOSE_PAREN", "NOT_CONNECTED", "BOOLEAN_VALUE", "ID", 
        "INTEGER_VALUE", "DECIMAL_VALUE", "NUMERIC_VALUE", "STRING_VALUE", 
        "PERCENTAGE_VALUE", "ALPHA_NUMERIC", "WS", "NEWLINE", "COMMENT", 
        "INDENT", "DEDENT"
    ];
    public static readonly ruleNames = [
        "script", "expression", "expressions_block", "path_blocks", "path_block_inner", 
        "property_set_expr2", "assignment_expr2", "pin_select_expr", "component_modifier_expr", 
        "data_expr_with_assignment", "add_component_expr", "component_select_expr", 
        "pin_select_expr2", "at_component_expr", "to_component_expr", "at_to_multiple_expr", 
        "at_to_multiple_line_expr", "at_to_multiple_line_expr_to_pin", "at_block", 
        "at_block_expressions", "at_block_pin_expr", "at_block_pin_expression_simple", 
        "at_block_pin_expression_complex", "break_keyword", "assignment_expr", 
        "keyword_assignment_expr", "parameters", "property_set_expr", "double_dot_property_set_expr", 
        "data_expr", "binary_operator", "unary_operator", "value_expr", 
        "function_def_expr", "function_expr", "function_args_expr", "atom_expr", 
        "trailer_expr", "function_call_expr", "net_namespace_expr", "function_return_expr", 
        "property_block_expr", "create_component_expr", "create_graphic_expr", 
        "create_module_expr", "nested_properties_inner", "graphic_expr", 
        "property_expr", "property_key_expr", "property_value_expr", "wire_atom_expr", 
        "wire_expr", "array_expr", "point_expr", "import_expr", "frame_expr", 
        "if_expr", "if_inner_expr", "else_expr", "while_expr",
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
            this.state = 122;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 122;
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
                case CircuitScriptParser.While:
                case CircuitScriptParser.If:
                case CircuitScriptParser.Frame:
                case CircuitScriptParser.Sheet:
                case CircuitScriptParser.Addition:
                case CircuitScriptParser.Divide:
                case CircuitScriptParser.ID:
                    {
                    this.state = 120;
                    this.expression();
                    }
                    break;
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 121;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 124;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2579448592) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 33688065) !== 0));
            this.state = 126;
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
            this.state = 147;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 2, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 128;
                this.add_component_expr();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 129;
                this.to_component_expr();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 130;
                this.at_component_expr();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 131;
                this.assignment_expr();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 132;
                this.property_set_expr();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 133;
                this.property_set_expr2();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 134;
                this.double_dot_property_set_expr();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 135;
                this.break_keyword();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 136;
                this.function_def_expr();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 137;
                this.function_call_expr();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 138;
                this.wire_expr();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 139;
                this.import_expr();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 140;
                this.frame_expr();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 141;
                this.atom_expr();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 142;
                this.at_block();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 143;
                this.path_blocks();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 144;
                this.point_expr();
                }
                break;
            case 18:
                this.enterOuterAlt(localContext, 18);
                {
                this.state = 145;
                this.if_expr();
                }
                break;
            case 19:
                this.enterOuterAlt(localContext, 19);
                {
                this.state = 146;
                this.while_expr();
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
        this.enterRule(localContext, 4, CircuitScriptParser.RULE_expressions_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 149;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 150;
            this.match(CircuitScriptParser.INDENT);
            this.state = 153;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 153;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 151;
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
                case CircuitScriptParser.While:
                case CircuitScriptParser.If:
                case CircuitScriptParser.Frame:
                case CircuitScriptParser.Sheet:
                case CircuitScriptParser.Addition:
                case CircuitScriptParser.Divide:
                case CircuitScriptParser.ID:
                    {
                    this.state = 152;
                    this.expression();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 155;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2579448592) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 33688065) !== 0));
            this.state = 157;
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
    public path_blocks(): Path_blocksContext {
        let localContext = new Path_blocksContext(this.context, this.state);
        this.enterRule(localContext, 6, CircuitScriptParser.RULE_path_blocks);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 160;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 159;
                    this.path_block_inner();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 162;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 5, this.context);
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
        this.enterRule(localContext, 8, CircuitScriptParser.RULE_path_block_inner);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 164;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 3670528) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 165;
            this.match(CircuitScriptParser.T__0);
            this.state = 166;
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
        this.enterRule(localContext, 10, CircuitScriptParser.RULE_property_set_expr2);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 168;
            this.atom_expr();
            this.state = 169;
            this.match(CircuitScriptParser.T__0);
            this.state = 170;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 171;
            this.match(CircuitScriptParser.INDENT);
            this.state = 174;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 174;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 172;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case CircuitScriptParser.ID:
                case CircuitScriptParser.INTEGER_VALUE:
                    {
                    this.state = 173;
                    this.assignment_expr2();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 176;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 259) !== 0));
            this.state = 178;
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
        this.enterRule(localContext, 12, CircuitScriptParser.RULE_assignment_expr2);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 180;
            _la = this.tokenStream.LA(1);
            if(!(_la === 49 || _la === 50)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 181;
            this.match(CircuitScriptParser.T__0);
            this.state = 182;
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
        this.enterRule(localContext, 14, CircuitScriptParser.RULE_pin_select_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 184;
            this.match(CircuitScriptParser.Pin);
            this.state = 185;
            _la = this.tokenStream.LA(1);
            if(!(_la === 50 || _la === 53)) {
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
    public component_modifier_expr(): Component_modifier_exprContext {
        let localContext = new Component_modifier_exprContext(this.context, this.state);
        this.enterRule(localContext, 16, CircuitScriptParser.RULE_component_modifier_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 187;
            this.match(CircuitScriptParser.ID);
            this.state = 188;
            this.match(CircuitScriptParser.T__0);
            this.state = 191;
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
                this.state = 189;
                this.value_expr();
                }
                break;
            case CircuitScriptParser.ID:
                {
                this.state = 190;
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
        this.enterRule(localContext, 18, CircuitScriptParser.RULE_data_expr_with_assignment);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 195;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 9, this.context) ) {
            case 1:
                {
                this.state = 193;
                this.data_expr(0);
                }
                break;
            case 2:
                {
                this.state = 194;
                this.assignment_expr();
                }
                break;
            }
            this.state = 200;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 10, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 197;
                    this.component_modifier_expr();
                    }
                    }
                }
                this.state = 202;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 10, this.context);
            }
            this.state = 204;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 15) {
                {
                this.state = 203;
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
        this.enterRule(localContext, 20, CircuitScriptParser.RULE_add_component_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 206;
            this.match(CircuitScriptParser.Add);
            this.state = 207;
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
        this.enterRule(localContext, 22, CircuitScriptParser.RULE_component_select_expr);
        try {
            this.state = 211;
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
                this.state = 209;
                this.data_expr_with_assignment();
                }
                break;
            case CircuitScriptParser.Pin:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 210;
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
    public pin_select_expr2(): Pin_select_expr2Context {
        let localContext = new Pin_select_expr2Context(this.context, this.state);
        this.enterRule(localContext, 24, CircuitScriptParser.RULE_pin_select_expr2);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 213;
            _la = this.tokenStream.LA(1);
            if(!(_la === 50 || _la === 53)) {
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
        this.enterRule(localContext, 26, CircuitScriptParser.RULE_at_component_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 215;
            this.match(CircuitScriptParser.At);
            this.state = 218;
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
                this.state = 216;
                this.component_select_expr();
                }
                break;
            case CircuitScriptParser.Point:
                {
                this.state = 217;
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
        this.enterRule(localContext, 28, CircuitScriptParser.RULE_to_component_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 220;
            this.match(CircuitScriptParser.To);
            this.state = 230;
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
                this.state = 221;
                this.component_select_expr();
                this.state = 226;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                    {
                    {
                    this.state = 222;
                    this.match(CircuitScriptParser.T__1);
                    this.state = 223;
                    this.component_select_expr();
                    }
                    }
                    this.state = 228;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                }
                break;
            case CircuitScriptParser.Point:
                {
                this.state = 229;
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
        this.enterRule(localContext, 30, CircuitScriptParser.RULE_at_to_multiple_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 232;
            this.match(CircuitScriptParser.At);
            this.state = 233;
            this.component_select_expr();
            this.state = 234;
            this.match(CircuitScriptParser.To);
            this.state = 235;
            this.component_select_expr();
            this.state = 240;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 236;
                this.match(CircuitScriptParser.T__1);
                this.state = 237;
                this.component_select_expr();
                }
                }
                this.state = 242;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 243;
            this.match(CircuitScriptParser.T__0);
            this.state = 244;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 245;
            this.match(CircuitScriptParser.INDENT);
            this.state = 248;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 248;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 246;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case CircuitScriptParser.INTEGER_VALUE:
                case CircuitScriptParser.STRING_VALUE:
                    {
                    this.state = 247;
                    this.at_to_multiple_line_expr();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 250;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 137) !== 0));
            this.state = 252;
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
        this.enterRule(localContext, 32, CircuitScriptParser.RULE_at_to_multiple_line_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 254;
            this.pin_select_expr2();
            this.state = 255;
            this.match(CircuitScriptParser.T__0);
            this.state = 256;
            this.at_to_multiple_line_expr_to_pin();
            this.state = 261;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 257;
                this.match(CircuitScriptParser.T__1);
                this.state = 258;
                this.at_to_multiple_line_expr_to_pin();
                }
                }
                this.state = 263;
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
        this.enterRule(localContext, 34, CircuitScriptParser.RULE_at_to_multiple_line_expr_to_pin);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 264;
            _la = this.tokenStream.LA(1);
            if(!(_la === 47 || _la === 50)) {
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
        this.enterRule(localContext, 36, CircuitScriptParser.RULE_at_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 266;
            this.at_component_expr();
            this.state = 267;
            this.match(CircuitScriptParser.T__0);
            this.state = 268;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 269;
            this.match(CircuitScriptParser.INDENT);
            this.state = 272;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 272;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 270;
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
                case CircuitScriptParser.While:
                case CircuitScriptParser.If:
                case CircuitScriptParser.Frame:
                case CircuitScriptParser.Sheet:
                case CircuitScriptParser.Addition:
                case CircuitScriptParser.Divide:
                case CircuitScriptParser.ID:
                case CircuitScriptParser.INTEGER_VALUE:
                case CircuitScriptParser.STRING_VALUE:
                    {
                    this.state = 271;
                    this.at_block_expressions();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 274;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2579448592) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 36047361) !== 0));
            this.state = 276;
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
        this.enterRule(localContext, 38, CircuitScriptParser.RULE_at_block_expressions);
        try {
            this.state = 280;
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
            case CircuitScriptParser.While:
            case CircuitScriptParser.If:
            case CircuitScriptParser.Frame:
            case CircuitScriptParser.Sheet:
            case CircuitScriptParser.Addition:
            case CircuitScriptParser.Divide:
            case CircuitScriptParser.ID:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 278;
                this.expression();
                }
                break;
            case CircuitScriptParser.INTEGER_VALUE:
            case CircuitScriptParser.STRING_VALUE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 279;
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
        this.enterRule(localContext, 40, CircuitScriptParser.RULE_at_block_pin_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 282;
            this.pin_select_expr2();
            this.state = 283;
            this.match(CircuitScriptParser.T__0);
            this.state = 286;
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
            case CircuitScriptParser.While:
            case CircuitScriptParser.If:
            case CircuitScriptParser.Frame:
            case CircuitScriptParser.Sheet:
            case CircuitScriptParser.Addition:
            case CircuitScriptParser.Divide:
            case CircuitScriptParser.NOT_CONNECTED:
            case CircuitScriptParser.ID:
                {
                this.state = 284;
                this.at_block_pin_expression_simple();
                }
                break;
            case CircuitScriptParser.NEWLINE:
                {
                this.state = 285;
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
        this.enterRule(localContext, 42, CircuitScriptParser.RULE_at_block_pin_expression_simple);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 290;
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
            case CircuitScriptParser.While:
            case CircuitScriptParser.If:
            case CircuitScriptParser.Frame:
            case CircuitScriptParser.Sheet:
            case CircuitScriptParser.Addition:
            case CircuitScriptParser.Divide:
            case CircuitScriptParser.ID:
                {
                this.state = 288;
                this.expression();
                }
                break;
            case CircuitScriptParser.NOT_CONNECTED:
                {
                this.state = 289;
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
        this.enterRule(localContext, 44, CircuitScriptParser.RULE_at_block_pin_expression_complex);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 292;
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
    public break_keyword(): Break_keywordContext {
        let localContext = new Break_keywordContext(this.context, this.state);
        this.enterRule(localContext, 46, CircuitScriptParser.RULE_break_keyword);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 294;
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
        this.enterRule(localContext, 48, CircuitScriptParser.RULE_assignment_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 296;
            this.atom_expr();
            this.state = 297;
            this.match(CircuitScriptParser.T__2);
            this.state = 298;
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
        this.enterRule(localContext, 50, CircuitScriptParser.RULE_keyword_assignment_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 300;
            this.match(CircuitScriptParser.ID);
            this.state = 301;
            this.match(CircuitScriptParser.T__2);
            this.state = 302;
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
        this.enterRule(localContext, 52, CircuitScriptParser.RULE_parameters);
        let _la: number;
        try {
            let alternative: number;
            this.state = 327;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 28, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                {
                this.state = 304;
                this.data_expr(0);
                this.state = 309;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 25, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 305;
                        this.match(CircuitScriptParser.T__1);
                        this.state = 306;
                        this.data_expr(0);
                        }
                        }
                    }
                    this.state = 311;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 25, this.context);
                }
                this.state = 316;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                    {
                    {
                    this.state = 312;
                    this.match(CircuitScriptParser.T__1);
                    this.state = 313;
                    this.keyword_assignment_expr();
                    }
                    }
                    this.state = 318;
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
                this.state = 319;
                this.keyword_assignment_expr();
                this.state = 324;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                    {
                    {
                    this.state = 320;
                    this.match(CircuitScriptParser.T__1);
                    this.state = 321;
                    this.keyword_assignment_expr();
                    }
                    }
                    this.state = 326;
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
        this.enterRule(localContext, 54, CircuitScriptParser.RULE_property_set_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 329;
            this.atom_expr();
            this.state = 330;
            this.match(CircuitScriptParser.T__2);
            this.state = 331;
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
        this.enterRule(localContext, 56, CircuitScriptParser.RULE_double_dot_property_set_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 333;
            this.match(CircuitScriptParser.T__3);
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
        let _startState = 58;
        this.enterRecursionRule(localContext, 58, CircuitScriptParser.RULE_data_expr, _p);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 355;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 30, this.context) ) {
            case 1:
                {
                localContext = new RoundedBracketsExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;

                this.state = 339;
                this.match(CircuitScriptParser.OPEN_PAREN);
                this.state = 340;
                this.data_expr(0);
                this.state = 341;
                this.match(CircuitScriptParser.CLOSE_PAREN);
                }
                break;
            case 2:
                {
                localContext = new ValueAtomExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 345;
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
                    this.state = 343;
                    this.value_expr();
                    }
                    break;
                case CircuitScriptParser.ID:
                    {
                    this.state = 344;
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
                this.state = 347;
                this.unary_operator();
                this.state = 348;
                this.data_expr(10);
                }
                break;
            case 4:
                {
                localContext = new DataExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 350;
                this.create_component_expr();
                }
                break;
            case 5:
                {
                localContext = new DataExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 351;
                this.create_graphic_expr();
                }
                break;
            case 6:
                {
                localContext = new DataExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 352;
                this.create_module_expr();
                }
                break;
            case 7:
                {
                localContext = new FunctionCallExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 353;
                this.function_call_expr();
                }
                break;
            case 8:
                {
                localContext = new ArrayExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 354;
                this.array_expr();
                }
                break;
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 372;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 32, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 370;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 31, this.context) ) {
                    case 1:
                        {
                        localContext = new MultiplyExprContext(new Data_exprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CircuitScriptParser.RULE_data_expr);
                        this.state = 357;
                        if (!(this.precpred(this.context, 9))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 9)");
                        }
                        this.state = 358;
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 43 || _la === 44)) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 359;
                        this.data_expr(10);
                        }
                        break;
                    case 2:
                        {
                        localContext = new AdditionExprContext(new Data_exprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CircuitScriptParser.RULE_data_expr);
                        this.state = 360;
                        if (!(this.precpred(this.context, 8))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 8)");
                        }
                        this.state = 361;
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 41 || _la === 42)) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 362;
                        this.data_expr(9);
                        }
                        break;
                    case 3:
                        {
                        localContext = new BinaryOperatorExprContext(new Data_exprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CircuitScriptParser.RULE_data_expr);
                        this.state = 363;
                        if (!(this.precpred(this.context, 7))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 7)");
                        }
                        this.state = 364;
                        this.binary_operator();
                        this.state = 365;
                        this.data_expr(8);
                        }
                        break;
                    case 4:
                        {
                        localContext = new LogicalOperatorExprContext(new Data_exprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CircuitScriptParser.RULE_data_expr);
                        this.state = 367;
                        if (!(this.precpred(this.context, 6))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 6)");
                        }
                        this.state = 368;
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 39 || _la === 40)) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 369;
                        this.data_expr(7);
                        }
                        break;
                    }
                    }
                }
                this.state = 374;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 32, this.context);
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
        this.enterRule(localContext, 60, CircuitScriptParser.RULE_binary_operator);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 375;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 63) !== 0))) {
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
        this.enterRule(localContext, 62, CircuitScriptParser.RULE_unary_operator);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 377;
            _la = this.tokenStream.LA(1);
            if(!(_la === 30 || _la === 42)) {
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
        this.enterRule(localContext, 64, CircuitScriptParser.RULE_value_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            {
            this.state = 380;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 42) {
                {
                this.state = 379;
                this.match(CircuitScriptParser.Minus);
                }
            }

            this.state = 382;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 48)) & ~0x1F) === 0 && ((1 << (_la - 48)) & 125) !== 0))) {
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
        this.enterRule(localContext, 66, CircuitScriptParser.RULE_function_def_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 384;
            this.match(CircuitScriptParser.Define);
            this.state = 385;
            this.match(CircuitScriptParser.ID);
            this.state = 386;
            this.match(CircuitScriptParser.OPEN_PAREN);
            this.state = 388;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 49) {
                {
                this.state = 387;
                this.function_args_expr();
                }
            }

            this.state = 390;
            this.match(CircuitScriptParser.CLOSE_PAREN);
            this.state = 391;
            this.match(CircuitScriptParser.T__0);
            this.state = 392;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 393;
            this.match(CircuitScriptParser.INDENT);
            this.state = 396;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 396;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 394;
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
                case CircuitScriptParser.While:
                case CircuitScriptParser.If:
                case CircuitScriptParser.Frame:
                case CircuitScriptParser.Sheet:
                case CircuitScriptParser.Addition:
                case CircuitScriptParser.Divide:
                case CircuitScriptParser.ID:
                    {
                    this.state = 395;
                    this.function_expr();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 398;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2583642896) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 33688065) !== 0));
            this.state = 400;
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
        this.enterRule(localContext, 68, CircuitScriptParser.RULE_function_expr);
        try {
            this.state = 404;
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
            case CircuitScriptParser.While:
            case CircuitScriptParser.If:
            case CircuitScriptParser.Frame:
            case CircuitScriptParser.Sheet:
            case CircuitScriptParser.Addition:
            case CircuitScriptParser.Divide:
            case CircuitScriptParser.ID:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 402;
                this.expression();
                }
                break;
            case CircuitScriptParser.Return:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 403;
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
        this.enterRule(localContext, 70, CircuitScriptParser.RULE_function_args_expr);
        let _la: number;
        try {
            let alternative: number;
            this.state = 435;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 41, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 406;
                this.match(CircuitScriptParser.ID);
                this.state = 411;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 38, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 407;
                        this.match(CircuitScriptParser.T__1);
                        this.state = 408;
                        this.match(CircuitScriptParser.ID);
                        }
                        }
                    }
                    this.state = 413;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 38, this.context);
                }
                this.state = 420;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                    {
                    {
                    this.state = 414;
                    this.match(CircuitScriptParser.T__1);
                    this.state = 415;
                    this.match(CircuitScriptParser.ID);
                    this.state = 416;
                    this.match(CircuitScriptParser.T__2);
                    this.state = 417;
                    this.value_expr();
                    }
                    }
                    this.state = 422;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 423;
                this.match(CircuitScriptParser.ID);
                this.state = 424;
                this.match(CircuitScriptParser.T__2);
                this.state = 425;
                this.value_expr();
                this.state = 432;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                    {
                    {
                    this.state = 426;
                    this.match(CircuitScriptParser.T__1);
                    this.state = 427;
                    this.match(CircuitScriptParser.ID);
                    this.state = 428;
                    this.match(CircuitScriptParser.T__2);
                    this.state = 429;
                    this.value_expr();
                    }
                    }
                    this.state = 434;
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
        this.enterRule(localContext, 72, CircuitScriptParser.RULE_atom_expr);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 437;
            this.match(CircuitScriptParser.ID);
            this.state = 442;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 42, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 438;
                    this.match(CircuitScriptParser.T__4);
                    this.state = 439;
                    this.match(CircuitScriptParser.ID);
                    }
                    }
                }
                this.state = 444;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 42, this.context);
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
        this.enterRule(localContext, 74, CircuitScriptParser.RULE_trailer_expr);
        let _la: number;
        try {
            this.state = 452;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.OPEN_PAREN:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 445;
                this.match(CircuitScriptParser.OPEN_PAREN);
                this.state = 447;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1073742912) !== 0) || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 16279) !== 0)) {
                    {
                    this.state = 446;
                    this.parameters();
                    }
                }

                this.state = 449;
                this.match(CircuitScriptParser.CLOSE_PAREN);
                }
                break;
            case CircuitScriptParser.T__4:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 450;
                this.match(CircuitScriptParser.T__4);
                this.state = 451;
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
        this.enterRule(localContext, 76, CircuitScriptParser.RULE_function_call_expr);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 455;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 41 || _la === 43) {
                {
                this.state = 454;
                this.net_namespace_expr();
                }
            }

            this.state = 457;
            this.match(CircuitScriptParser.ID);
            this.state = 459;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 458;
                    this.trailer_expr();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 461;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 46, this.context);
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
        this.enterRule(localContext, 78, CircuitScriptParser.RULE_net_namespace_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 464;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 41) {
                {
                this.state = 463;
                this.match(CircuitScriptParser.Addition);
                }
            }

            this.state = 466;
            this.match(CircuitScriptParser.Divide);
            this.state = 468;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 48, this.context) ) {
            case 1:
                {
                this.state = 467;
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
        this.enterRule(localContext, 80, CircuitScriptParser.RULE_function_return_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 470;
            this.match(CircuitScriptParser.Return);
            this.state = 471;
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
        this.enterRule(localContext, 82, CircuitScriptParser.RULE_property_block_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 473;
            this.property_key_expr();
            this.state = 474;
            this.match(CircuitScriptParser.T__0);
            this.state = 475;
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
        this.enterRule(localContext, 84, CircuitScriptParser.RULE_create_component_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 477;
            this.match(CircuitScriptParser.Create);
            this.state = 478;
            this.match(CircuitScriptParser.Component);
            this.state = 479;
            this.match(CircuitScriptParser.T__0);
            this.state = 480;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 481;
            this.match(CircuitScriptParser.INDENT);
            this.state = 484;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 484;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 482;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case CircuitScriptParser.ID:
                case CircuitScriptParser.INTEGER_VALUE:
                case CircuitScriptParser.STRING_VALUE:
                    {
                    this.state = 483;
                    this.property_expr();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 486;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 275) !== 0));
            this.state = 488;
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
        this.enterRule(localContext, 86, CircuitScriptParser.RULE_create_graphic_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 490;
            this.match(CircuitScriptParser.Create);
            this.state = 491;
            this.match(CircuitScriptParser.Graphic);
            this.state = 492;
            this.match(CircuitScriptParser.T__0);
            this.state = 493;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 494;
            this.match(CircuitScriptParser.INDENT);
            this.state = 497;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 497;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 495;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case CircuitScriptParser.Pin:
                case CircuitScriptParser.ID:
                    {
                    this.state = 496;
                    this.graphic_expr();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 499;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 15 || _la === 49 || _la === 57);
            this.state = 501;
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
    public create_module_expr(): Create_module_exprContext {
        let localContext = new Create_module_exprContext(this.context, this.state);
        this.enterRule(localContext, 88, CircuitScriptParser.RULE_create_module_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 503;
            this.match(CircuitScriptParser.Create);
            this.state = 504;
            this.match(CircuitScriptParser.Module);
            this.state = 505;
            this.match(CircuitScriptParser.T__0);
            this.state = 506;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 507;
            this.match(CircuitScriptParser.INDENT);
            this.state = 511;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 511;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 53, this.context) ) {
                case 1:
                    {
                    this.state = 508;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case 2:
                    {
                    this.state = 509;
                    this.property_expr();
                    }
                    break;
                case 3:
                    {
                    this.state = 510;
                    this.property_block_expr();
                    }
                    break;
                }
                }
                this.state = 513;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 275) !== 0));
            this.state = 515;
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
        this.enterRule(localContext, 90, CircuitScriptParser.RULE_nested_properties_inner);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            {
            this.state = 517;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 518;
            this.match(CircuitScriptParser.INDENT);
            this.state = 521;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 521;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 519;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case CircuitScriptParser.ID:
                case CircuitScriptParser.INTEGER_VALUE:
                case CircuitScriptParser.STRING_VALUE:
                    {
                    this.state = 520;
                    this.property_expr();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 523;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 275) !== 0));
            this.state = 525;
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
        this.enterRule(localContext, 92, CircuitScriptParser.RULE_graphic_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 527;
            localContext._command = this.tokenStream.LT(1);
            _la = this.tokenStream.LA(1);
            if(!(_la === 15 || _la === 49)) {
                localContext._command = this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 529;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 1) {
                {
                this.state = 528;
                this.match(CircuitScriptParser.T__0);
                }
            }

            this.state = 537;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 58, this.context) ) {
            case 1:
                {
                this.state = 531;
                this.parameters();
                }
                break;
            case 2:
                {
                this.state = 532;
                this.match(CircuitScriptParser.OPEN_PAREN);
                this.state = 533;
                this.parameters();
                this.state = 534;
                this.match(CircuitScriptParser.CLOSE_PAREN);
                }
                break;
            case 3:
                {
                this.state = 536;
                this.nested_properties_inner();
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
        this.enterRule(localContext, 94, CircuitScriptParser.RULE_property_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 539;
            this.property_key_expr();
            this.state = 540;
            this.match(CircuitScriptParser.T__0);
            this.state = 541;
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
        this.enterRule(localContext, 96, CircuitScriptParser.RULE_property_key_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 543;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 19) !== 0))) {
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
        this.enterRule(localContext, 98, CircuitScriptParser.RULE_property_value_expr);
        let _la: number;
        try {
            this.state = 554;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.NEWLINE:
                localContext = new Nested_propertiesContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 545;
                this.nested_properties_inner();
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
                this.state = 546;
                this.data_expr(0);
                this.state = 551;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                    {
                    {
                    this.state = 547;
                    this.match(CircuitScriptParser.T__1);
                    this.state = 548;
                    this.data_expr(0);
                    }
                    }
                    this.state = 553;
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
        this.enterRule(localContext, 100, CircuitScriptParser.RULE_wire_atom_expr);
        try {
            this.state = 562;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 62, this.context) ) {
            case 1:
                localContext = new Wire_expr_direction_valueContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 556;
                this.match(CircuitScriptParser.ID);
                this.state = 559;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 61, this.context) ) {
                case 1:
                    {
                    this.state = 557;
                    this.match(CircuitScriptParser.INTEGER_VALUE);
                    }
                    break;
                case 2:
                    {
                    this.state = 558;
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
                this.state = 561;
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
        this.enterRule(localContext, 102, CircuitScriptParser.RULE_wire_expr);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 564;
            this.match(CircuitScriptParser.Wire);
            this.state = 568;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 63, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 565;
                    this.wire_atom_expr();
                    }
                    }
                }
                this.state = 570;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 63, this.context);
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
        this.enterRule(localContext, 104, CircuitScriptParser.RULE_array_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 571;
            this.match(CircuitScriptParser.T__5);
            this.state = 572;
            this.data_expr(0);
            this.state = 577;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 573;
                this.match(CircuitScriptParser.T__1);
                this.state = 574;
                this.data_expr(0);
                }
                }
                this.state = 579;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 580;
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
    public point_expr(): Point_exprContext {
        let localContext = new Point_exprContext(this.context, this.state);
        this.enterRule(localContext, 106, CircuitScriptParser.RULE_point_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 582;
            this.match(CircuitScriptParser.Point);
            this.state = 583;
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
        this.enterRule(localContext, 108, CircuitScriptParser.RULE_import_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 585;
            this.match(CircuitScriptParser.Import);
            this.state = 586;
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
        this.enterRule(localContext, 110, CircuitScriptParser.RULE_frame_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 588;
            _la = this.tokenStream.LA(1);
            if(!(_la === 31 || _la === 32)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 589;
            this.match(CircuitScriptParser.T__0);
            this.state = 590;
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
        this.enterRule(localContext, 112, CircuitScriptParser.RULE_if_expr);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 592;
            this.match(CircuitScriptParser.If);
            this.state = 593;
            this.data_expr(0);
            this.state = 594;
            this.match(CircuitScriptParser.T__0);
            this.state = 595;
            this.expressions_block();
            this.state = 599;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 65, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 596;
                    this.if_inner_expr();
                    }
                    }
                }
                this.state = 601;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 65, this.context);
            }
            this.state = 603;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 29) {
                {
                this.state = 602;
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
            this.state = 605;
            this.match(CircuitScriptParser.Else);
            this.state = 606;
            this.match(CircuitScriptParser.If);
            this.state = 607;
            this.data_expr(0);
            this.state = 608;
            this.match(CircuitScriptParser.T__0);
            this.state = 609;
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
            this.state = 611;
            this.match(CircuitScriptParser.Else);
            this.state = 612;
            this.match(CircuitScriptParser.T__0);
            this.state = 613;
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
            this.state = 615;
            this.match(CircuitScriptParser.While);
            this.state = 616;
            this.data_expr(0);
            this.state = 617;
            this.match(CircuitScriptParser.T__0);
            this.state = 618;
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

    public override sempred(localContext: antlr.ParserRuleContext | null, ruleIndex: number, predIndex: number): boolean {
        switch (ruleIndex) {
        case 29:
            return this.data_expr_sempred(localContext as Data_exprContext, predIndex);
        }
        return true;
    }
    private data_expr_sempred(localContext: Data_exprContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 0:
            return this.precpred(this.context, 9);
        case 1:
            return this.precpred(this.context, 8);
        case 2:
            return this.precpred(this.context, 7);
        case 3:
            return this.precpred(this.context, 6);
        }
        return true;
    }

    public static readonly _serializedATN: number[] = [
        4,1,60,621,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,
        7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,
        2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,33,
        7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,39,
        2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,46,
        7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,52,
        2,53,7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,59,
        7,59,1,0,1,0,4,0,123,8,0,11,0,12,0,124,1,0,1,0,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,148,
        8,1,1,2,1,2,1,2,1,2,4,2,154,8,2,11,2,12,2,155,1,2,1,2,1,3,4,3,161,
        8,3,11,3,12,3,162,1,4,1,4,1,4,1,4,1,5,1,5,1,5,1,5,1,5,1,5,4,5,175,
        8,5,11,5,12,5,176,1,5,1,5,1,6,1,6,1,6,1,6,1,7,1,7,1,7,1,8,1,8,1,
        8,1,8,3,8,192,8,8,1,9,1,9,3,9,196,8,9,1,9,5,9,199,8,9,10,9,12,9,
        202,9,9,1,9,3,9,205,8,9,1,10,1,10,1,10,1,11,1,11,3,11,212,8,11,1,
        12,1,12,1,13,1,13,1,13,3,13,219,8,13,1,14,1,14,1,14,1,14,5,14,225,
        8,14,10,14,12,14,228,9,14,1,14,3,14,231,8,14,1,15,1,15,1,15,1,15,
        1,15,1,15,5,15,239,8,15,10,15,12,15,242,9,15,1,15,1,15,1,15,1,15,
        1,15,4,15,249,8,15,11,15,12,15,250,1,15,1,15,1,16,1,16,1,16,1,16,
        1,16,5,16,260,8,16,10,16,12,16,263,9,16,1,17,1,17,1,18,1,18,1,18,
        1,18,1,18,1,18,4,18,273,8,18,11,18,12,18,274,1,18,1,18,1,19,1,19,
        3,19,281,8,19,1,20,1,20,1,20,1,20,3,20,287,8,20,1,21,1,21,3,21,291,
        8,21,1,22,1,22,1,23,1,23,1,24,1,24,1,24,1,24,1,25,1,25,1,25,1,25,
        1,26,1,26,1,26,5,26,308,8,26,10,26,12,26,311,9,26,1,26,1,26,5,26,
        315,8,26,10,26,12,26,318,9,26,1,26,1,26,1,26,5,26,323,8,26,10,26,
        12,26,326,9,26,3,26,328,8,26,1,27,1,27,1,27,1,27,1,28,1,28,1,28,
        1,28,1,28,1,29,1,29,1,29,1,29,1,29,1,29,1,29,3,29,346,8,29,1,29,
        1,29,1,29,1,29,1,29,1,29,1,29,1,29,3,29,356,8,29,1,29,1,29,1,29,
        1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,5,29,371,8,29,
        10,29,12,29,374,9,29,1,30,1,30,1,31,1,31,1,32,3,32,381,8,32,1,32,
        1,32,1,33,1,33,1,33,1,33,3,33,389,8,33,1,33,1,33,1,33,1,33,1,33,
        1,33,4,33,397,8,33,11,33,12,33,398,1,33,1,33,1,34,1,34,3,34,405,
        8,34,1,35,1,35,1,35,5,35,410,8,35,10,35,12,35,413,9,35,1,35,1,35,
        1,35,1,35,5,35,419,8,35,10,35,12,35,422,9,35,1,35,1,35,1,35,1,35,
        1,35,1,35,1,35,5,35,431,8,35,10,35,12,35,434,9,35,3,35,436,8,35,
        1,36,1,36,1,36,5,36,441,8,36,10,36,12,36,444,9,36,1,37,1,37,3,37,
        448,8,37,1,37,1,37,1,37,3,37,453,8,37,1,38,3,38,456,8,38,1,38,1,
        38,4,38,460,8,38,11,38,12,38,461,1,39,3,39,465,8,39,1,39,1,39,3,
        39,469,8,39,1,40,1,40,1,40,1,41,1,41,1,41,1,41,1,42,1,42,1,42,1,
        42,1,42,1,42,1,42,4,42,485,8,42,11,42,12,42,486,1,42,1,42,1,43,1,
        43,1,43,1,43,1,43,1,43,1,43,4,43,498,8,43,11,43,12,43,499,1,43,1,
        43,1,44,1,44,1,44,1,44,1,44,1,44,1,44,1,44,4,44,512,8,44,11,44,12,
        44,513,1,44,1,44,1,45,1,45,1,45,1,45,4,45,522,8,45,11,45,12,45,523,
        1,45,1,45,1,46,1,46,3,46,530,8,46,1,46,1,46,1,46,1,46,1,46,1,46,
        3,46,538,8,46,1,47,1,47,1,47,1,47,1,48,1,48,1,49,1,49,1,49,1,49,
        5,49,550,8,49,10,49,12,49,553,9,49,3,49,555,8,49,1,50,1,50,1,50,
        3,50,560,8,50,1,50,3,50,563,8,50,1,51,1,51,5,51,567,8,51,10,51,12,
        51,570,9,51,1,52,1,52,1,52,1,52,5,52,576,8,52,10,52,12,52,579,9,
        52,1,52,1,52,1,53,1,53,1,53,1,54,1,54,1,54,1,55,1,55,1,55,1,55,1,
        56,1,56,1,56,1,56,1,56,5,56,598,8,56,10,56,12,56,601,9,56,1,56,3,
        56,604,8,56,1,57,1,57,1,57,1,57,1,57,1,57,1,58,1,58,1,58,1,58,1,
        59,1,59,1,59,1,59,1,59,1,59,0,1,58,60,0,2,4,6,8,10,12,14,16,18,20,
        22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,
        66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,102,104,106,
        108,110,112,114,116,118,0,13,2,0,9,9,19,21,1,0,49,50,2,0,50,50,53,
        53,2,0,47,47,50,50,1,0,43,44,1,0,41,42,1,0,39,40,1,0,33,38,2,0,30,
        30,42,42,2,0,48,48,50,54,2,0,15,15,49,49,2,0,49,50,53,53,1,0,31,
        32,654,0,122,1,0,0,0,2,147,1,0,0,0,4,149,1,0,0,0,6,160,1,0,0,0,8,
        164,1,0,0,0,10,168,1,0,0,0,12,180,1,0,0,0,14,184,1,0,0,0,16,187,
        1,0,0,0,18,195,1,0,0,0,20,206,1,0,0,0,22,211,1,0,0,0,24,213,1,0,
        0,0,26,215,1,0,0,0,28,220,1,0,0,0,30,232,1,0,0,0,32,254,1,0,0,0,
        34,264,1,0,0,0,36,266,1,0,0,0,38,280,1,0,0,0,40,282,1,0,0,0,42,290,
        1,0,0,0,44,292,1,0,0,0,46,294,1,0,0,0,48,296,1,0,0,0,50,300,1,0,
        0,0,52,327,1,0,0,0,54,329,1,0,0,0,56,333,1,0,0,0,58,355,1,0,0,0,
        60,375,1,0,0,0,62,377,1,0,0,0,64,380,1,0,0,0,66,384,1,0,0,0,68,404,
        1,0,0,0,70,435,1,0,0,0,72,437,1,0,0,0,74,452,1,0,0,0,76,455,1,0,
        0,0,78,464,1,0,0,0,80,470,1,0,0,0,82,473,1,0,0,0,84,477,1,0,0,0,
        86,490,1,0,0,0,88,503,1,0,0,0,90,517,1,0,0,0,92,527,1,0,0,0,94,539,
        1,0,0,0,96,543,1,0,0,0,98,554,1,0,0,0,100,562,1,0,0,0,102,564,1,
        0,0,0,104,571,1,0,0,0,106,582,1,0,0,0,108,585,1,0,0,0,110,588,1,
        0,0,0,112,592,1,0,0,0,114,605,1,0,0,0,116,611,1,0,0,0,118,615,1,
        0,0,0,120,123,3,2,1,0,121,123,5,57,0,0,122,120,1,0,0,0,122,121,1,
        0,0,0,123,124,1,0,0,0,124,122,1,0,0,0,124,125,1,0,0,0,125,126,1,
        0,0,0,126,127,5,0,0,1,127,1,1,0,0,0,128,148,3,20,10,0,129,148,3,
        28,14,0,130,148,3,26,13,0,131,148,3,48,24,0,132,148,3,54,27,0,133,
        148,3,10,5,0,134,148,3,56,28,0,135,148,3,46,23,0,136,148,3,66,33,
        0,137,148,3,76,38,0,138,148,3,102,51,0,139,148,3,108,54,0,140,148,
        3,110,55,0,141,148,3,72,36,0,142,148,3,36,18,0,143,148,3,6,3,0,144,
        148,3,106,53,0,145,148,3,112,56,0,146,148,3,118,59,0,147,128,1,0,
        0,0,147,129,1,0,0,0,147,130,1,0,0,0,147,131,1,0,0,0,147,132,1,0,
        0,0,147,133,1,0,0,0,147,134,1,0,0,0,147,135,1,0,0,0,147,136,1,0,
        0,0,147,137,1,0,0,0,147,138,1,0,0,0,147,139,1,0,0,0,147,140,1,0,
        0,0,147,141,1,0,0,0,147,142,1,0,0,0,147,143,1,0,0,0,147,144,1,0,
        0,0,147,145,1,0,0,0,147,146,1,0,0,0,148,3,1,0,0,0,149,150,5,57,0,
        0,150,153,5,59,0,0,151,154,5,57,0,0,152,154,3,2,1,0,153,151,1,0,
        0,0,153,152,1,0,0,0,154,155,1,0,0,0,155,153,1,0,0,0,155,156,1,0,
        0,0,156,157,1,0,0,0,157,158,5,60,0,0,158,5,1,0,0,0,159,161,3,8,4,
        0,160,159,1,0,0,0,161,162,1,0,0,0,162,160,1,0,0,0,162,163,1,0,0,
        0,163,7,1,0,0,0,164,165,7,0,0,0,165,166,5,1,0,0,166,167,3,4,2,0,
        167,9,1,0,0,0,168,169,3,72,36,0,169,170,5,1,0,0,170,171,5,57,0,0,
        171,174,5,59,0,0,172,175,5,57,0,0,173,175,3,12,6,0,174,172,1,0,0,
        0,174,173,1,0,0,0,175,176,1,0,0,0,176,174,1,0,0,0,176,177,1,0,0,
        0,177,178,1,0,0,0,178,179,5,60,0,0,179,11,1,0,0,0,180,181,7,1,0,
        0,181,182,5,1,0,0,182,183,3,64,32,0,183,13,1,0,0,0,184,185,5,15,
        0,0,185,186,7,2,0,0,186,15,1,0,0,0,187,188,5,49,0,0,188,191,5,1,
        0,0,189,192,3,64,32,0,190,192,5,49,0,0,191,189,1,0,0,0,191,190,1,
        0,0,0,192,17,1,0,0,0,193,196,3,58,29,0,194,196,3,48,24,0,195,193,
        1,0,0,0,195,194,1,0,0,0,196,200,1,0,0,0,197,199,3,16,8,0,198,197,
        1,0,0,0,199,202,1,0,0,0,200,198,1,0,0,0,200,201,1,0,0,0,201,204,
        1,0,0,0,202,200,1,0,0,0,203,205,3,14,7,0,204,203,1,0,0,0,204,205,
        1,0,0,0,205,19,1,0,0,0,206,207,5,16,0,0,207,208,3,18,9,0,208,21,
        1,0,0,0,209,212,3,18,9,0,210,212,3,14,7,0,211,209,1,0,0,0,211,210,
        1,0,0,0,212,23,1,0,0,0,213,214,7,2,0,0,214,25,1,0,0,0,215,218,5,
        17,0,0,216,219,3,22,11,0,217,219,5,19,0,0,218,216,1,0,0,0,218,217,
        1,0,0,0,219,27,1,0,0,0,220,230,5,18,0,0,221,226,3,22,11,0,222,223,
        5,2,0,0,223,225,3,22,11,0,224,222,1,0,0,0,225,228,1,0,0,0,226,224,
        1,0,0,0,226,227,1,0,0,0,227,231,1,0,0,0,228,226,1,0,0,0,229,231,
        5,19,0,0,230,221,1,0,0,0,230,229,1,0,0,0,231,29,1,0,0,0,232,233,
        5,17,0,0,233,234,3,22,11,0,234,235,5,18,0,0,235,240,3,22,11,0,236,
        237,5,2,0,0,237,239,3,22,11,0,238,236,1,0,0,0,239,242,1,0,0,0,240,
        238,1,0,0,0,240,241,1,0,0,0,241,243,1,0,0,0,242,240,1,0,0,0,243,
        244,5,1,0,0,244,245,5,57,0,0,245,248,5,59,0,0,246,249,5,57,0,0,247,
        249,3,32,16,0,248,246,1,0,0,0,248,247,1,0,0,0,249,250,1,0,0,0,250,
        248,1,0,0,0,250,251,1,0,0,0,251,252,1,0,0,0,252,253,5,60,0,0,253,
        31,1,0,0,0,254,255,3,24,12,0,255,256,5,1,0,0,256,261,3,34,17,0,257,
        258,5,2,0,0,258,260,3,34,17,0,259,257,1,0,0,0,260,263,1,0,0,0,261,
        259,1,0,0,0,261,262,1,0,0,0,262,33,1,0,0,0,263,261,1,0,0,0,264,265,
        7,3,0,0,265,35,1,0,0,0,266,267,3,26,13,0,267,268,5,1,0,0,268,269,
        5,57,0,0,269,272,5,59,0,0,270,273,5,57,0,0,271,273,3,38,19,0,272,
        270,1,0,0,0,272,271,1,0,0,0,273,274,1,0,0,0,274,272,1,0,0,0,274,
        275,1,0,0,0,275,276,1,0,0,0,276,277,5,60,0,0,277,37,1,0,0,0,278,
        281,3,2,1,0,279,281,3,40,20,0,280,278,1,0,0,0,280,279,1,0,0,0,281,
        39,1,0,0,0,282,283,3,24,12,0,283,286,5,1,0,0,284,287,3,42,21,0,285,
        287,3,44,22,0,286,284,1,0,0,0,286,285,1,0,0,0,287,41,1,0,0,0,288,
        291,3,2,1,0,289,291,5,47,0,0,290,288,1,0,0,0,290,289,1,0,0,0,291,
        43,1,0,0,0,292,293,3,4,2,0,293,45,1,0,0,0,294,295,5,8,0,0,295,47,
        1,0,0,0,296,297,3,72,36,0,297,298,5,3,0,0,298,299,3,58,29,0,299,
        49,1,0,0,0,300,301,5,49,0,0,301,302,5,3,0,0,302,303,3,58,29,0,303,
        51,1,0,0,0,304,309,3,58,29,0,305,306,5,2,0,0,306,308,3,58,29,0,307,
        305,1,0,0,0,308,311,1,0,0,0,309,307,1,0,0,0,309,310,1,0,0,0,310,
        316,1,0,0,0,311,309,1,0,0,0,312,313,5,2,0,0,313,315,3,50,25,0,314,
        312,1,0,0,0,315,318,1,0,0,0,316,314,1,0,0,0,316,317,1,0,0,0,317,
        328,1,0,0,0,318,316,1,0,0,0,319,324,3,50,25,0,320,321,5,2,0,0,321,
        323,3,50,25,0,322,320,1,0,0,0,323,326,1,0,0,0,324,322,1,0,0,0,324,
        325,1,0,0,0,325,328,1,0,0,0,326,324,1,0,0,0,327,304,1,0,0,0,327,
        319,1,0,0,0,328,53,1,0,0,0,329,330,3,72,36,0,330,331,5,3,0,0,331,
        332,3,58,29,0,332,55,1,0,0,0,333,334,5,4,0,0,334,335,5,49,0,0,335,
        336,5,3,0,0,336,337,3,58,29,0,337,57,1,0,0,0,338,339,6,29,-1,0,339,
        340,5,45,0,0,340,341,3,58,29,0,341,342,5,46,0,0,342,356,1,0,0,0,
        343,346,3,64,32,0,344,346,3,72,36,0,345,343,1,0,0,0,345,344,1,0,
        0,0,346,356,1,0,0,0,347,348,3,62,31,0,348,349,3,58,29,10,349,356,
        1,0,0,0,350,356,3,84,42,0,351,356,3,86,43,0,352,356,3,88,44,0,353,
        356,3,76,38,0,354,356,3,104,52,0,355,338,1,0,0,0,355,345,1,0,0,0,
        355,347,1,0,0,0,355,350,1,0,0,0,355,351,1,0,0,0,355,352,1,0,0,0,
        355,353,1,0,0,0,355,354,1,0,0,0,356,372,1,0,0,0,357,358,10,9,0,0,
        358,359,7,4,0,0,359,371,3,58,29,10,360,361,10,8,0,0,361,362,7,5,
        0,0,362,371,3,58,29,9,363,364,10,7,0,0,364,365,3,60,30,0,365,366,
        3,58,29,8,366,371,1,0,0,0,367,368,10,6,0,0,368,369,7,6,0,0,369,371,
        3,58,29,7,370,357,1,0,0,0,370,360,1,0,0,0,370,363,1,0,0,0,370,367,
        1,0,0,0,371,374,1,0,0,0,372,370,1,0,0,0,372,373,1,0,0,0,373,59,1,
        0,0,0,374,372,1,0,0,0,375,376,7,7,0,0,376,61,1,0,0,0,377,378,7,8,
        0,0,378,63,1,0,0,0,379,381,5,42,0,0,380,379,1,0,0,0,380,381,1,0,
        0,0,381,382,1,0,0,0,382,383,7,9,0,0,383,65,1,0,0,0,384,385,5,23,
        0,0,385,386,5,49,0,0,386,388,5,45,0,0,387,389,3,70,35,0,388,387,
        1,0,0,0,388,389,1,0,0,0,389,390,1,0,0,0,390,391,5,46,0,0,391,392,
        5,1,0,0,392,393,5,57,0,0,393,396,5,59,0,0,394,397,5,57,0,0,395,397,
        3,68,34,0,396,394,1,0,0,0,396,395,1,0,0,0,397,398,1,0,0,0,398,396,
        1,0,0,0,398,399,1,0,0,0,399,400,1,0,0,0,400,401,5,60,0,0,401,67,
        1,0,0,0,402,405,3,2,1,0,403,405,3,80,40,0,404,402,1,0,0,0,404,403,
        1,0,0,0,405,69,1,0,0,0,406,411,5,49,0,0,407,408,5,2,0,0,408,410,
        5,49,0,0,409,407,1,0,0,0,410,413,1,0,0,0,411,409,1,0,0,0,411,412,
        1,0,0,0,412,420,1,0,0,0,413,411,1,0,0,0,414,415,5,2,0,0,415,416,
        5,49,0,0,416,417,5,3,0,0,417,419,3,64,32,0,418,414,1,0,0,0,419,422,
        1,0,0,0,420,418,1,0,0,0,420,421,1,0,0,0,421,436,1,0,0,0,422,420,
        1,0,0,0,423,424,5,49,0,0,424,425,5,3,0,0,425,432,3,64,32,0,426,427,
        5,2,0,0,427,428,5,49,0,0,428,429,5,3,0,0,429,431,3,64,32,0,430,426,
        1,0,0,0,431,434,1,0,0,0,432,430,1,0,0,0,432,433,1,0,0,0,433,436,
        1,0,0,0,434,432,1,0,0,0,435,406,1,0,0,0,435,423,1,0,0,0,436,71,1,
        0,0,0,437,442,5,49,0,0,438,439,5,5,0,0,439,441,5,49,0,0,440,438,
        1,0,0,0,441,444,1,0,0,0,442,440,1,0,0,0,442,443,1,0,0,0,443,73,1,
        0,0,0,444,442,1,0,0,0,445,447,5,45,0,0,446,448,3,52,26,0,447,446,
        1,0,0,0,447,448,1,0,0,0,448,449,1,0,0,0,449,453,5,46,0,0,450,451,
        5,5,0,0,451,453,5,49,0,0,452,445,1,0,0,0,452,450,1,0,0,0,453,75,
        1,0,0,0,454,456,3,78,39,0,455,454,1,0,0,0,455,456,1,0,0,0,456,457,
        1,0,0,0,457,459,5,49,0,0,458,460,3,74,37,0,459,458,1,0,0,0,460,461,
        1,0,0,0,461,459,1,0,0,0,461,462,1,0,0,0,462,77,1,0,0,0,463,465,5,
        41,0,0,464,463,1,0,0,0,464,465,1,0,0,0,465,466,1,0,0,0,466,468,5,
        43,0,0,467,469,3,58,29,0,468,467,1,0,0,0,468,469,1,0,0,0,469,79,
        1,0,0,0,470,471,5,22,0,0,471,472,3,58,29,0,472,81,1,0,0,0,473,474,
        3,96,48,0,474,475,5,1,0,0,475,476,3,4,2,0,476,83,1,0,0,0,477,478,
        5,10,0,0,478,479,5,11,0,0,479,480,5,1,0,0,480,481,5,57,0,0,481,484,
        5,59,0,0,482,485,5,57,0,0,483,485,3,94,47,0,484,482,1,0,0,0,484,
        483,1,0,0,0,485,486,1,0,0,0,486,484,1,0,0,0,486,487,1,0,0,0,487,
        488,1,0,0,0,488,489,5,60,0,0,489,85,1,0,0,0,490,491,5,10,0,0,491,
        492,5,12,0,0,492,493,5,1,0,0,493,494,5,57,0,0,494,497,5,59,0,0,495,
        498,5,57,0,0,496,498,3,92,46,0,497,495,1,0,0,0,497,496,1,0,0,0,498,
        499,1,0,0,0,499,497,1,0,0,0,499,500,1,0,0,0,500,501,1,0,0,0,501,
        502,5,60,0,0,502,87,1,0,0,0,503,504,5,10,0,0,504,505,5,13,0,0,505,
        506,5,1,0,0,506,507,5,57,0,0,507,511,5,59,0,0,508,512,5,57,0,0,509,
        512,3,94,47,0,510,512,3,82,41,0,511,508,1,0,0,0,511,509,1,0,0,0,
        511,510,1,0,0,0,512,513,1,0,0,0,513,511,1,0,0,0,513,514,1,0,0,0,
        514,515,1,0,0,0,515,516,5,60,0,0,516,89,1,0,0,0,517,518,5,57,0,0,
        518,521,5,59,0,0,519,522,5,57,0,0,520,522,3,94,47,0,521,519,1,0,
        0,0,521,520,1,0,0,0,522,523,1,0,0,0,523,521,1,0,0,0,523,524,1,0,
        0,0,524,525,1,0,0,0,525,526,5,60,0,0,526,91,1,0,0,0,527,529,7,10,
        0,0,528,530,5,1,0,0,529,528,1,0,0,0,529,530,1,0,0,0,530,537,1,0,
        0,0,531,538,3,52,26,0,532,533,5,45,0,0,533,534,3,52,26,0,534,535,
        5,46,0,0,535,538,1,0,0,0,536,538,3,90,45,0,537,531,1,0,0,0,537,532,
        1,0,0,0,537,536,1,0,0,0,538,93,1,0,0,0,539,540,3,96,48,0,540,541,
        5,1,0,0,541,542,3,98,49,0,542,95,1,0,0,0,543,544,7,11,0,0,544,97,
        1,0,0,0,545,555,3,90,45,0,546,551,3,58,29,0,547,548,5,2,0,0,548,
        550,3,58,29,0,549,547,1,0,0,0,550,553,1,0,0,0,551,549,1,0,0,0,551,
        552,1,0,0,0,552,555,1,0,0,0,553,551,1,0,0,0,554,545,1,0,0,0,554,
        546,1,0,0,0,555,99,1,0,0,0,556,559,5,49,0,0,557,560,5,50,0,0,558,
        560,3,58,29,0,559,557,1,0,0,0,559,558,1,0,0,0,560,563,1,0,0,0,561,
        563,5,49,0,0,562,556,1,0,0,0,562,561,1,0,0,0,563,101,1,0,0,0,564,
        568,5,14,0,0,565,567,3,100,50,0,566,565,1,0,0,0,567,570,1,0,0,0,
        568,566,1,0,0,0,568,569,1,0,0,0,569,103,1,0,0,0,570,568,1,0,0,0,
        571,572,5,6,0,0,572,577,3,58,29,0,573,574,5,2,0,0,574,576,3,58,29,
        0,575,573,1,0,0,0,576,579,1,0,0,0,577,575,1,0,0,0,577,578,1,0,0,
        0,578,580,1,0,0,0,579,577,1,0,0,0,580,581,5,7,0,0,581,105,1,0,0,
        0,582,583,5,19,0,0,583,584,5,49,0,0,584,107,1,0,0,0,585,586,5,24,
        0,0,586,587,5,49,0,0,587,109,1,0,0,0,588,589,7,12,0,0,589,590,5,
        1,0,0,590,591,3,4,2,0,591,111,1,0,0,0,592,593,5,28,0,0,593,594,3,
        58,29,0,594,595,5,1,0,0,595,599,3,4,2,0,596,598,3,114,57,0,597,596,
        1,0,0,0,598,601,1,0,0,0,599,597,1,0,0,0,599,600,1,0,0,0,600,603,
        1,0,0,0,601,599,1,0,0,0,602,604,3,116,58,0,603,602,1,0,0,0,603,604,
        1,0,0,0,604,113,1,0,0,0,605,606,5,29,0,0,606,607,5,28,0,0,607,608,
        3,58,29,0,608,609,5,1,0,0,609,610,3,4,2,0,610,115,1,0,0,0,611,612,
        5,29,0,0,612,613,5,1,0,0,613,614,3,4,2,0,614,117,1,0,0,0,615,616,
        5,27,0,0,616,617,3,58,29,0,617,618,5,1,0,0,618,619,3,4,2,0,619,119,
        1,0,0,0,67,122,124,147,153,155,162,174,176,191,195,200,204,211,218,
        226,230,240,248,250,261,272,274,280,286,290,309,316,324,327,345,
        355,370,372,380,388,396,398,404,411,420,432,435,442,447,452,455,
        461,464,468,484,486,497,499,511,513,521,523,529,537,551,554,559,
        562,568,577,599,603
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
    public if_expr(): If_exprContext | null {
        return this.getRuleContext(0, If_exprContext);
    }
    public while_expr(): While_exprContext | null {
        return this.getRuleContext(0, While_exprContext);
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
    public component_select_expr(): Component_select_exprContext | null {
        return this.getRuleContext(0, Component_select_exprContext);
    }
    public Point(): antlr.TerminalNode | null {
        return this.getToken(CircuitScriptParser.Point, 0);
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
    public graphic_expr(): Graphic_exprContext[];
    public graphic_expr(i: number): Graphic_exprContext | null;
    public graphic_expr(i?: number): Graphic_exprContext[] | Graphic_exprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Graphic_exprContext);
        }

        return this.getRuleContext(i, Graphic_exprContext);
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
    public nested_properties_inner(): Nested_properties_innerContext | null {
        return this.getRuleContext(0, Nested_properties_innerContext);
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_graphic_expr;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitGraphic_expr) {
            return visitor.visitGraphic_expr(this);
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
