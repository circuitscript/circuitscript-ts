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
    public static readonly OPEN_PAREN = 52;
    public static readonly CLOSE_PAREN = 53;
    public static readonly NOT_CONNECTED = 54;
    public static readonly BOOLEAN_VALUE = 55;
    public static readonly ID = 56;
    public static readonly INTEGER_VALUE = 57;
    public static readonly DECIMAL_VALUE = 58;
    public static readonly NUMERIC_VALUE = 59;
    public static readonly STRING_VALUE = 60;
    public static readonly PERCENTAGE_VALUE = 61;
    public static readonly ALPHA_NUMERIC = 62;
    public static readonly WS = 63;
    public static readonly NEWLINE = 64;
    public static readonly COMMENT = 65;
    public static readonly INDENT = 66;
    public static readonly DEDENT = 67;
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
    public static readonly RULE_continue_keyword = 24;
    public static readonly RULE_assignment_expr = 25;
    public static readonly RULE_operator_assignment_expr = 26;
    public static readonly RULE_keyword_assignment_expr = 27;
    public static readonly RULE_parameters = 28;
    public static readonly RULE_property_set_expr = 29;
    public static readonly RULE_double_dot_property_set_expr = 30;
    public static readonly RULE_data_expr = 31;
    public static readonly RULE_binary_operator = 32;
    public static readonly RULE_unary_operator = 33;
    public static readonly RULE_value_expr = 34;
    public static readonly RULE_function_def_expr = 35;
    public static readonly RULE_function_expr = 36;
    public static readonly RULE_function_args_expr = 37;
    public static readonly RULE_atom_expr = 38;
    public static readonly RULE_trailer_expr = 39;
    public static readonly RULE_function_call_expr = 40;
    public static readonly RULE_net_namespace_expr = 41;
    public static readonly RULE_function_return_expr = 42;
    public static readonly RULE_property_block_expr = 43;
    public static readonly RULE_create_component_expr = 44;
    public static readonly RULE_create_graphic_expr = 45;
    public static readonly RULE_create_module_expr = 46;
    public static readonly RULE_nested_properties_inner = 47;
    public static readonly RULE_graphic_expr = 48;
    public static readonly RULE_property_expr = 49;
    public static readonly RULE_property_key_expr = 50;
    public static readonly RULE_property_value_expr = 51;
    public static readonly RULE_wire_atom_expr = 52;
    public static readonly RULE_wire_expr = 53;
    public static readonly RULE_array_expr = 54;
    public static readonly RULE_point_expr = 55;
    public static readonly RULE_import_expr = 56;
    public static readonly RULE_frame_expr = 57;
    public static readonly RULE_if_expr = 58;
    public static readonly RULE_if_inner_expr = 59;
    public static readonly RULE_else_expr = 60;
    public static readonly RULE_while_expr = 61;
    public static readonly RULE_for_expr = 62;

    public static readonly literalNames = [
        null, "':'", "','", "'='", "'..'", "'.'", "'['", "']'", "'break'", 
        "'branch'", "'create'", "'component'", "'graphic'", "'module'", 
        "'wire'", "'pin'", "'add'", "'at'", "'to'", "'point'", "'join'", 
        "'parallel'", "'return'", "'def'", "'import'", "'for'", "'in'", 
        "'while'", "'continue'", "'if'", "'else'", "'!'", "'frame'", "'sheet'", 
        "'=='", "'!='", "'>'", "'>='", "'<'", "'<='", "'&&'", "'||'", "'+'", 
        "'-'", "'/'", "'*'", "'%'", "'+='", "'-='", "'/='", "'*='", "'%='", 
        "'('", "')'"
    ];

    public static readonly symbolicNames = [
        null, null, null, null, null, null, null, null, "Break", "Branch", 
        "Create", "Component", "Graphic", "Module", "Wire", "Pin", "Add", 
        "At", "To", "Point", "Join", "Parallel", "Return", "Define", "Import", 
        "For", "In", "While", "Continue", "If", "Else", "Not", "Frame", 
        "Sheet", "Equals", "NotEquals", "GreaterThan", "GreatOrEqualThan", 
        "LessThan", "LessOrEqualThan", "LogicalAnd", "LogicalOr", "Addition", 
        "Minus", "Divide", "Multiply", "Modulus", "AdditionAssign", "MinusAssign", 
        "DivideAssign", "MultiplyAssign", "ModulusAssign", "OPEN_PAREN", 
        "CLOSE_PAREN", "NOT_CONNECTED", "BOOLEAN_VALUE", "ID", "INTEGER_VALUE", 
        "DECIMAL_VALUE", "NUMERIC_VALUE", "STRING_VALUE", "PERCENTAGE_VALUE", 
        "ALPHA_NUMERIC", "WS", "NEWLINE", "COMMENT", "INDENT", "DEDENT"
    ];
    public static readonly ruleNames = [
        "script", "expression", "expressions_block", "path_blocks", "path_block_inner", 
        "property_set_expr2", "assignment_expr2", "pin_select_expr", "component_modifier_expr", 
        "data_expr_with_assignment", "add_component_expr", "component_select_expr", 
        "pin_select_expr2", "at_component_expr", "to_component_expr", "at_to_multiple_expr", 
        "at_to_multiple_line_expr", "at_to_multiple_line_expr_to_pin", "at_block", 
        "at_block_expressions", "at_block_pin_expr", "at_block_pin_expression_simple", 
        "at_block_pin_expression_complex", "break_keyword", "continue_keyword", 
        "assignment_expr", "operator_assignment_expr", "keyword_assignment_expr", 
        "parameters", "property_set_expr", "double_dot_property_set_expr", 
        "data_expr", "binary_operator", "unary_operator", "value_expr", 
        "function_def_expr", "function_expr", "function_args_expr", "atom_expr", 
        "trailer_expr", "function_call_expr", "net_namespace_expr", "function_return_expr", 
        "property_block_expr", "create_component_expr", "create_graphic_expr", 
        "create_module_expr", "nested_properties_inner", "graphic_expr", 
        "property_expr", "property_key_expr", "property_value_expr", "wire_atom_expr", 
        "wire_expr", "array_expr", "point_expr", "import_expr", "frame_expr", 
        "if_expr", "if_inner_expr", "else_expr", "while_expr", "for_expr",
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
            this.state = 128;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 128;
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
                case CircuitScriptParser.ID:
                    {
                    this.state = 126;
                    this.expression();
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
                this.state = 130;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 4)) & ~0x1F) === 0 && ((1 << (_la - 4)) & 867955761) !== 0) || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 4210693) !== 0));
            this.state = 132;
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
            this.state = 156;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 2, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 134;
                this.add_component_expr();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 135;
                this.to_component_expr();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 136;
                this.at_component_expr();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 137;
                this.assignment_expr();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 138;
                this.operator_assignment_expr();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 139;
                this.property_set_expr();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 140;
                this.property_set_expr2();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 141;
                this.double_dot_property_set_expr();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 142;
                this.break_keyword();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 143;
                this.continue_keyword();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 144;
                this.function_def_expr();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 145;
                this.function_call_expr();
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 146;
                this.wire_expr();
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 147;
                this.import_expr();
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 148;
                this.frame_expr();
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 149;
                this.atom_expr();
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 150;
                this.at_block();
                }
                break;
            case 18:
                this.enterOuterAlt(localContext, 18);
                {
                this.state = 151;
                this.path_blocks();
                }
                break;
            case 19:
                this.enterOuterAlt(localContext, 19);
                {
                this.state = 152;
                this.point_expr();
                }
                break;
            case 20:
                this.enterOuterAlt(localContext, 20);
                {
                this.state = 153;
                this.if_expr();
                }
                break;
            case 21:
                this.enterOuterAlt(localContext, 21);
                {
                this.state = 154;
                this.while_expr();
                }
                break;
            case 22:
                this.enterOuterAlt(localContext, 22);
                {
                this.state = 155;
                this.for_expr();
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
            this.state = 158;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 159;
            this.match(CircuitScriptParser.INDENT);
            this.state = 162;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 162;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 160;
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
                case CircuitScriptParser.ID:
                    {
                    this.state = 161;
                    this.expression();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 164;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 4)) & ~0x1F) === 0 && ((1 << (_la - 4)) & 867955761) !== 0) || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 4210693) !== 0));
            this.state = 166;
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
            this.state = 169;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 168;
                    this.path_block_inner();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 171;
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
            this.state = 173;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 3670528) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 174;
            this.match(CircuitScriptParser.T__0);
            this.state = 175;
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
            this.state = 177;
            this.atom_expr();
            this.state = 178;
            this.match(CircuitScriptParser.T__0);
            this.state = 179;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 180;
            this.match(CircuitScriptParser.INDENT);
            this.state = 183;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 183;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 181;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case CircuitScriptParser.ID:
                case CircuitScriptParser.INTEGER_VALUE:
                    {
                    this.state = 182;
                    this.assignment_expr2();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 185;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 259) !== 0));
            this.state = 187;
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
            this.state = 189;
            _la = this.tokenStream.LA(1);
            if(!(_la === 56 || _la === 57)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 190;
            this.match(CircuitScriptParser.T__0);
            this.state = 191;
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
            this.state = 193;
            this.match(CircuitScriptParser.Pin);
            this.state = 194;
            _la = this.tokenStream.LA(1);
            if(!(_la === 57 || _la === 60)) {
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
            this.state = 196;
            this.match(CircuitScriptParser.ID);
            this.state = 197;
            this.match(CircuitScriptParser.T__0);
            this.state = 200;
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
                this.state = 198;
                this.value_expr();
                }
                break;
            case CircuitScriptParser.ID:
                {
                this.state = 199;
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
            this.state = 204;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 9, this.context) ) {
            case 1:
                {
                this.state = 202;
                this.data_expr(0);
                }
                break;
            case 2:
                {
                this.state = 203;
                this.assignment_expr();
                }
                break;
            }
            this.state = 209;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 10, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 206;
                    this.component_modifier_expr();
                    }
                    }
                }
                this.state = 211;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 10, this.context);
            }
            this.state = 213;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 15) {
                {
                this.state = 212;
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
            this.state = 215;
            this.match(CircuitScriptParser.Add);
            this.state = 216;
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
            this.state = 220;
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
                this.state = 218;
                this.data_expr_with_assignment();
                }
                break;
            case CircuitScriptParser.Pin:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 219;
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
            this.state = 222;
            _la = this.tokenStream.LA(1);
            if(!(_la === 57 || _la === 60)) {
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
            this.state = 224;
            this.match(CircuitScriptParser.At);
            this.state = 227;
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
                this.state = 225;
                this.component_select_expr();
                }
                break;
            case CircuitScriptParser.Point:
                {
                this.state = 226;
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
            this.state = 229;
            this.match(CircuitScriptParser.To);
            this.state = 239;
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
                this.state = 230;
                this.component_select_expr();
                this.state = 235;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                    {
                    {
                    this.state = 231;
                    this.match(CircuitScriptParser.T__1);
                    this.state = 232;
                    this.component_select_expr();
                    }
                    }
                    this.state = 237;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                }
                break;
            case CircuitScriptParser.Point:
                {
                this.state = 238;
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
            this.state = 241;
            this.match(CircuitScriptParser.At);
            this.state = 242;
            this.component_select_expr();
            this.state = 243;
            this.match(CircuitScriptParser.To);
            this.state = 244;
            this.component_select_expr();
            this.state = 249;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 245;
                this.match(CircuitScriptParser.T__1);
                this.state = 246;
                this.component_select_expr();
                }
                }
                this.state = 251;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 252;
            this.match(CircuitScriptParser.T__0);
            this.state = 253;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 254;
            this.match(CircuitScriptParser.INDENT);
            this.state = 257;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 257;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 255;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case CircuitScriptParser.INTEGER_VALUE:
                case CircuitScriptParser.STRING_VALUE:
                    {
                    this.state = 256;
                    this.at_to_multiple_line_expr();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 259;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 137) !== 0));
            this.state = 261;
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
            this.state = 263;
            this.pin_select_expr2();
            this.state = 264;
            this.match(CircuitScriptParser.T__0);
            this.state = 265;
            this.at_to_multiple_line_expr_to_pin();
            this.state = 270;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 2) {
                {
                {
                this.state = 266;
                this.match(CircuitScriptParser.T__1);
                this.state = 267;
                this.at_to_multiple_line_expr_to_pin();
                }
                }
                this.state = 272;
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
            this.state = 273;
            _la = this.tokenStream.LA(1);
            if(!(_la === 54 || _la === 57)) {
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
            this.state = 275;
            this.at_component_expr();
            this.state = 276;
            this.match(CircuitScriptParser.T__0);
            this.state = 277;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 278;
            this.match(CircuitScriptParser.INDENT);
            this.state = 281;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 281;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 279;
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
                case CircuitScriptParser.ID:
                case CircuitScriptParser.INTEGER_VALUE:
                case CircuitScriptParser.STRING_VALUE:
                    {
                    this.state = 280;
                    this.at_block_expressions();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 283;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 4)) & ~0x1F) === 0 && ((1 << (_la - 4)) & 867955761) !== 0) || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 4505605) !== 0));
            this.state = 285;
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
            this.state = 289;
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
            case CircuitScriptParser.ID:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 287;
                this.expression();
                }
                break;
            case CircuitScriptParser.INTEGER_VALUE:
            case CircuitScriptParser.STRING_VALUE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 288;
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
            this.state = 291;
            this.pin_select_expr2();
            this.state = 292;
            this.match(CircuitScriptParser.T__0);
            this.state = 295;
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
            case CircuitScriptParser.NOT_CONNECTED:
            case CircuitScriptParser.ID:
                {
                this.state = 293;
                this.at_block_pin_expression_simple();
                }
                break;
            case CircuitScriptParser.NEWLINE:
                {
                this.state = 294;
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
            this.state = 299;
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
            case CircuitScriptParser.ID:
                {
                this.state = 297;
                this.expression();
                }
                break;
            case CircuitScriptParser.NOT_CONNECTED:
                {
                this.state = 298;
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
            this.state = 301;
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
            this.state = 303;
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
    public continue_keyword(): Continue_keywordContext {
        let localContext = new Continue_keywordContext(this.context, this.state);
        this.enterRule(localContext, 48, CircuitScriptParser.RULE_continue_keyword);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 305;
            this.match(CircuitScriptParser.Continue);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
        this.enterRule(localContext, 50, CircuitScriptParser.RULE_assignment_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 307;
            this.atom_expr();
            this.state = 308;
            this.match(CircuitScriptParser.T__2);
            this.state = 309;
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
        this.enterRule(localContext, 52, CircuitScriptParser.RULE_operator_assignment_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 311;
            this.atom_expr();
            this.state = 312;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 47)) & ~0x1F) === 0 && ((1 << (_la - 47)) & 31) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
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
    public keyword_assignment_expr(): Keyword_assignment_exprContext {
        let localContext = new Keyword_assignment_exprContext(this.context, this.state);
        this.enterRule(localContext, 54, CircuitScriptParser.RULE_keyword_assignment_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 315;
            this.match(CircuitScriptParser.ID);
            this.state = 316;
            this.match(CircuitScriptParser.T__2);
            this.state = 317;
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
        this.enterRule(localContext, 56, CircuitScriptParser.RULE_parameters);
        let _la: number;
        try {
            let alternative: number;
            this.state = 342;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 28, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                {
                this.state = 319;
                this.data_expr(0);
                this.state = 324;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 25, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 320;
                        this.match(CircuitScriptParser.T__1);
                        this.state = 321;
                        this.data_expr(0);
                        }
                        }
                    }
                    this.state = 326;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 25, this.context);
                }
                this.state = 331;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                    {
                    {
                    this.state = 327;
                    this.match(CircuitScriptParser.T__1);
                    this.state = 328;
                    this.keyword_assignment_expr();
                    }
                    }
                    this.state = 333;
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
                this.state = 334;
                this.keyword_assignment_expr();
                this.state = 339;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                    {
                    {
                    this.state = 335;
                    this.match(CircuitScriptParser.T__1);
                    this.state = 336;
                    this.keyword_assignment_expr();
                    }
                    }
                    this.state = 341;
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
        this.enterRule(localContext, 58, CircuitScriptParser.RULE_property_set_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 344;
            this.atom_expr();
            this.state = 345;
            this.match(CircuitScriptParser.T__2);
            this.state = 346;
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
        this.enterRule(localContext, 60, CircuitScriptParser.RULE_double_dot_property_set_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 348;
            this.match(CircuitScriptParser.T__3);
            this.state = 349;
            this.match(CircuitScriptParser.ID);
            this.state = 350;
            this.match(CircuitScriptParser.T__2);
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
        let _startState = 62;
        this.enterRecursionRule(localContext, 62, CircuitScriptParser.RULE_data_expr, _p);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 370;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 30, this.context) ) {
            case 1:
                {
                localContext = new RoundedBracketsExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;

                this.state = 354;
                this.match(CircuitScriptParser.OPEN_PAREN);
                this.state = 355;
                this.data_expr(0);
                this.state = 356;
                this.match(CircuitScriptParser.CLOSE_PAREN);
                }
                break;
            case 2:
                {
                localContext = new ValueAtomExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 360;
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
                    this.state = 358;
                    this.value_expr();
                    }
                    break;
                case CircuitScriptParser.ID:
                    {
                    this.state = 359;
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
                this.state = 362;
                this.unary_operator();
                this.state = 363;
                this.data_expr(10);
                }
                break;
            case 4:
                {
                localContext = new DataExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 365;
                this.create_component_expr();
                }
                break;
            case 5:
                {
                localContext = new DataExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 366;
                this.create_graphic_expr();
                }
                break;
            case 6:
                {
                localContext = new DataExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 367;
                this.create_module_expr();
                }
                break;
            case 7:
                {
                localContext = new FunctionCallExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 368;
                this.function_call_expr();
                }
                break;
            case 8:
                {
                localContext = new ArrayExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 369;
                this.array_expr();
                }
                break;
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 387;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 32, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 385;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 31, this.context) ) {
                    case 1:
                        {
                        localContext = new MultiplyExprContext(new Data_exprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CircuitScriptParser.RULE_data_expr);
                        this.state = 372;
                        if (!(this.precpred(this.context, 9))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 9)");
                        }
                        this.state = 373;
                        _la = this.tokenStream.LA(1);
                        if(!(((((_la - 44)) & ~0x1F) === 0 && ((1 << (_la - 44)) & 7) !== 0))) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 374;
                        this.data_expr(10);
                        }
                        break;
                    case 2:
                        {
                        localContext = new AdditionExprContext(new Data_exprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CircuitScriptParser.RULE_data_expr);
                        this.state = 375;
                        if (!(this.precpred(this.context, 8))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 8)");
                        }
                        this.state = 376;
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 42 || _la === 43)) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 377;
                        this.data_expr(9);
                        }
                        break;
                    case 3:
                        {
                        localContext = new BinaryOperatorExprContext(new Data_exprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CircuitScriptParser.RULE_data_expr);
                        this.state = 378;
                        if (!(this.precpred(this.context, 7))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 7)");
                        }
                        this.state = 379;
                        this.binary_operator();
                        this.state = 380;
                        this.data_expr(8);
                        }
                        break;
                    case 4:
                        {
                        localContext = new LogicalOperatorExprContext(new Data_exprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CircuitScriptParser.RULE_data_expr);
                        this.state = 382;
                        if (!(this.precpred(this.context, 6))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 6)");
                        }
                        this.state = 383;
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 40 || _la === 41)) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 384;
                        this.data_expr(7);
                        }
                        break;
                    }
                    }
                }
                this.state = 389;
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
        this.enterRule(localContext, 64, CircuitScriptParser.RULE_binary_operator);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 390;
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
        this.enterRule(localContext, 66, CircuitScriptParser.RULE_unary_operator);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 392;
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
        this.enterRule(localContext, 68, CircuitScriptParser.RULE_value_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            {
            this.state = 395;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 43) {
                {
                this.state = 394;
                this.match(CircuitScriptParser.Minus);
                }
            }

            this.state = 397;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & 125) !== 0))) {
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
        this.enterRule(localContext, 70, CircuitScriptParser.RULE_function_def_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 399;
            this.match(CircuitScriptParser.Define);
            this.state = 400;
            this.match(CircuitScriptParser.ID);
            this.state = 401;
            this.match(CircuitScriptParser.OPEN_PAREN);
            this.state = 403;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 56) {
                {
                this.state = 402;
                this.function_args_expr();
                }
            }

            this.state = 405;
            this.match(CircuitScriptParser.CLOSE_PAREN);
            this.state = 406;
            this.match(CircuitScriptParser.T__0);
            this.state = 407;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 408;
            this.match(CircuitScriptParser.INDENT);
            this.state = 411;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 411;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 409;
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
                case CircuitScriptParser.ID:
                    {
                    this.state = 410;
                    this.function_expr();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 413;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 4)) & ~0x1F) === 0 && ((1 << (_la - 4)) & 868217905) !== 0) || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 4210693) !== 0));
            this.state = 415;
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
        this.enterRule(localContext, 72, CircuitScriptParser.RULE_function_expr);
        try {
            this.state = 419;
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
            case CircuitScriptParser.ID:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 417;
                this.expression();
                }
                break;
            case CircuitScriptParser.Return:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 418;
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
        this.enterRule(localContext, 74, CircuitScriptParser.RULE_function_args_expr);
        let _la: number;
        try {
            let alternative: number;
            this.state = 450;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 41, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 421;
                this.match(CircuitScriptParser.ID);
                this.state = 426;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 38, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 422;
                        this.match(CircuitScriptParser.T__1);
                        this.state = 423;
                        this.match(CircuitScriptParser.ID);
                        }
                        }
                    }
                    this.state = 428;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 38, this.context);
                }
                this.state = 435;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                    {
                    {
                    this.state = 429;
                    this.match(CircuitScriptParser.T__1);
                    this.state = 430;
                    this.match(CircuitScriptParser.ID);
                    this.state = 431;
                    this.match(CircuitScriptParser.T__2);
                    this.state = 432;
                    this.value_expr();
                    }
                    }
                    this.state = 437;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 438;
                this.match(CircuitScriptParser.ID);
                this.state = 439;
                this.match(CircuitScriptParser.T__2);
                this.state = 440;
                this.value_expr();
                this.state = 447;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                    {
                    {
                    this.state = 441;
                    this.match(CircuitScriptParser.T__1);
                    this.state = 442;
                    this.match(CircuitScriptParser.ID);
                    this.state = 443;
                    this.match(CircuitScriptParser.T__2);
                    this.state = 444;
                    this.value_expr();
                    }
                    }
                    this.state = 449;
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
        this.enterRule(localContext, 76, CircuitScriptParser.RULE_atom_expr);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 452;
            this.match(CircuitScriptParser.ID);
            this.state = 457;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 42, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 453;
                    this.match(CircuitScriptParser.T__4);
                    this.state = 454;
                    this.match(CircuitScriptParser.ID);
                    }
                    }
                }
                this.state = 459;
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
        this.enterRule(localContext, 78, CircuitScriptParser.RULE_trailer_expr);
        let _la: number;
        try {
            this.state = 467;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.OPEN_PAREN:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 460;
                this.match(CircuitScriptParser.OPEN_PAREN);
                this.state = 462;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2147484736) !== 0) || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 1041415) !== 0)) {
                    {
                    this.state = 461;
                    this.parameters();
                    }
                }

                this.state = 464;
                this.match(CircuitScriptParser.CLOSE_PAREN);
                }
                break;
            case CircuitScriptParser.T__4:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 465;
                this.match(CircuitScriptParser.T__4);
                this.state = 466;
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
        this.enterRule(localContext, 80, CircuitScriptParser.RULE_function_call_expr);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 470;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 42 || _la === 44) {
                {
                this.state = 469;
                this.net_namespace_expr();
                }
            }

            this.state = 472;
            this.match(CircuitScriptParser.ID);
            this.state = 474;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 473;
                    this.trailer_expr();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 476;
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
        this.enterRule(localContext, 82, CircuitScriptParser.RULE_net_namespace_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 479;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 42) {
                {
                this.state = 478;
                this.match(CircuitScriptParser.Addition);
                }
            }

            this.state = 481;
            this.match(CircuitScriptParser.Divide);
            this.state = 483;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 48, this.context) ) {
            case 1:
                {
                this.state = 482;
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
        this.enterRule(localContext, 84, CircuitScriptParser.RULE_function_return_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 485;
            this.match(CircuitScriptParser.Return);
            this.state = 486;
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
        this.enterRule(localContext, 86, CircuitScriptParser.RULE_property_block_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 488;
            this.property_key_expr();
            this.state = 489;
            this.match(CircuitScriptParser.T__0);
            this.state = 490;
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
        this.enterRule(localContext, 88, CircuitScriptParser.RULE_create_component_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 492;
            this.match(CircuitScriptParser.Create);
            this.state = 493;
            this.match(CircuitScriptParser.Component);
            this.state = 494;
            this.match(CircuitScriptParser.T__0);
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
            } while (((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 275) !== 0));
            this.state = 503;
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
        this.enterRule(localContext, 90, CircuitScriptParser.RULE_create_graphic_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 505;
            this.match(CircuitScriptParser.Create);
            this.state = 506;
            this.match(CircuitScriptParser.Graphic);
            this.state = 507;
            this.match(CircuitScriptParser.T__0);
            this.state = 508;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 509;
            this.match(CircuitScriptParser.INDENT);
            this.state = 512;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 512;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 510;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case CircuitScriptParser.Pin:
                case CircuitScriptParser.ID:
                    {
                    this.state = 511;
                    this.graphic_expr();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 514;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 15 || _la === 56 || _la === 64);
            this.state = 516;
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
        this.enterRule(localContext, 92, CircuitScriptParser.RULE_create_module_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 518;
            this.match(CircuitScriptParser.Create);
            this.state = 519;
            this.match(CircuitScriptParser.Module);
            this.state = 520;
            this.match(CircuitScriptParser.T__0);
            this.state = 521;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 522;
            this.match(CircuitScriptParser.INDENT);
            this.state = 526;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 526;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 53, this.context) ) {
                case 1:
                    {
                    this.state = 523;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case 2:
                    {
                    this.state = 524;
                    this.property_expr();
                    }
                    break;
                case 3:
                    {
                    this.state = 525;
                    this.property_block_expr();
                    }
                    break;
                }
                }
                this.state = 528;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 275) !== 0));
            this.state = 530;
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
        this.enterRule(localContext, 94, CircuitScriptParser.RULE_nested_properties_inner);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            {
            this.state = 532;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 533;
            this.match(CircuitScriptParser.INDENT);
            this.state = 536;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 536;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 534;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case CircuitScriptParser.ID:
                case CircuitScriptParser.INTEGER_VALUE:
                case CircuitScriptParser.STRING_VALUE:
                    {
                    this.state = 535;
                    this.property_expr();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 538;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 275) !== 0));
            this.state = 540;
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
        this.enterRule(localContext, 96, CircuitScriptParser.RULE_graphic_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 542;
            localContext._command = this.tokenStream.LT(1);
            _la = this.tokenStream.LA(1);
            if(!(_la === 15 || _la === 56)) {
                localContext._command = this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 544;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 1) {
                {
                this.state = 543;
                this.match(CircuitScriptParser.T__0);
                }
            }

            this.state = 552;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 58, this.context) ) {
            case 1:
                {
                this.state = 546;
                this.parameters();
                }
                break;
            case 2:
                {
                this.state = 547;
                this.match(CircuitScriptParser.OPEN_PAREN);
                this.state = 548;
                this.parameters();
                this.state = 549;
                this.match(CircuitScriptParser.CLOSE_PAREN);
                }
                break;
            case 3:
                {
                this.state = 551;
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
        this.enterRule(localContext, 98, CircuitScriptParser.RULE_property_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 554;
            this.property_key_expr();
            this.state = 555;
            this.match(CircuitScriptParser.T__0);
            this.state = 556;
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
            this.state = 558;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 19) !== 0))) {
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
            this.state = 569;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.NEWLINE:
                localContext = new Nested_propertiesContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 560;
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
                this.state = 561;
                this.data_expr(0);
                this.state = 566;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                    {
                    {
                    this.state = 562;
                    this.match(CircuitScriptParser.T__1);
                    this.state = 563;
                    this.data_expr(0);
                    }
                    }
                    this.state = 568;
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
        this.enterRule(localContext, 104, CircuitScriptParser.RULE_wire_atom_expr);
        try {
            this.state = 577;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 62, this.context) ) {
            case 1:
                localContext = new Wire_expr_direction_valueContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 571;
                this.match(CircuitScriptParser.ID);
                this.state = 574;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 61, this.context) ) {
                case 1:
                    {
                    this.state = 572;
                    this.match(CircuitScriptParser.INTEGER_VALUE);
                    }
                    break;
                case 2:
                    {
                    this.state = 573;
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
                this.state = 576;
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
        this.enterRule(localContext, 106, CircuitScriptParser.RULE_wire_expr);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 579;
            this.match(CircuitScriptParser.Wire);
            this.state = 583;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 63, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 580;
                    this.wire_atom_expr();
                    }
                    }
                }
                this.state = 585;
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
        this.enterRule(localContext, 108, CircuitScriptParser.RULE_array_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 586;
            this.match(CircuitScriptParser.T__5);
            this.state = 597;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2147484736) !== 0) || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 1041415) !== 0)) {
                {
                {
                this.state = 587;
                this.data_expr(0);
                this.state = 592;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                    {
                    {
                    this.state = 588;
                    this.match(CircuitScriptParser.T__1);
                    this.state = 589;
                    this.data_expr(0);
                    }
                    }
                    this.state = 594;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
                }
                this.state = 599;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 600;
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
        this.enterRule(localContext, 110, CircuitScriptParser.RULE_point_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 602;
            this.match(CircuitScriptParser.Point);
            this.state = 603;
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
        this.enterRule(localContext, 112, CircuitScriptParser.RULE_import_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 605;
            this.match(CircuitScriptParser.Import);
            this.state = 606;
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
        this.enterRule(localContext, 114, CircuitScriptParser.RULE_frame_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 608;
            _la = this.tokenStream.LA(1);
            if(!(_la === 32 || _la === 33)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 609;
            this.match(CircuitScriptParser.T__0);
            this.state = 610;
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
        this.enterRule(localContext, 116, CircuitScriptParser.RULE_if_expr);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 612;
            this.match(CircuitScriptParser.If);
            this.state = 613;
            this.data_expr(0);
            this.state = 614;
            this.match(CircuitScriptParser.T__0);
            this.state = 615;
            this.expressions_block();
            this.state = 619;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 66, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 616;
                    this.if_inner_expr();
                    }
                    }
                }
                this.state = 621;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 66, this.context);
            }
            this.state = 623;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 30) {
                {
                this.state = 622;
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
        this.enterRule(localContext, 118, CircuitScriptParser.RULE_if_inner_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 625;
            this.match(CircuitScriptParser.Else);
            this.state = 626;
            this.match(CircuitScriptParser.If);
            this.state = 627;
            this.data_expr(0);
            this.state = 628;
            this.match(CircuitScriptParser.T__0);
            this.state = 629;
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
        this.enterRule(localContext, 120, CircuitScriptParser.RULE_else_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 631;
            this.match(CircuitScriptParser.Else);
            this.state = 632;
            this.match(CircuitScriptParser.T__0);
            this.state = 633;
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
        this.enterRule(localContext, 122, CircuitScriptParser.RULE_while_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 635;
            this.match(CircuitScriptParser.While);
            this.state = 636;
            this.data_expr(0);
            this.state = 637;
            this.match(CircuitScriptParser.T__0);
            this.state = 638;
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
        this.enterRule(localContext, 124, CircuitScriptParser.RULE_for_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 640;
            this.match(CircuitScriptParser.For);
            this.state = 641;
            this.match(CircuitScriptParser.ID);
            this.state = 642;
            this.match(CircuitScriptParser.In);
            this.state = 643;
            this.data_expr(0);
            this.state = 644;
            this.match(CircuitScriptParser.T__0);
            this.state = 645;
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
        case 31:
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
        4,1,67,648,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,
        7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,
        2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,33,
        7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,39,
        2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,46,
        7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,52,
        2,53,7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,59,
        7,59,2,60,7,60,2,61,7,61,2,62,7,62,1,0,1,0,4,0,129,8,0,11,0,12,0,
        130,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,157,8,1,1,2,1,2,1,2,1,2,
        4,2,163,8,2,11,2,12,2,164,1,2,1,2,1,3,4,3,170,8,3,11,3,12,3,171,
        1,4,1,4,1,4,1,4,1,5,1,5,1,5,1,5,1,5,1,5,4,5,184,8,5,11,5,12,5,185,
        1,5,1,5,1,6,1,6,1,6,1,6,1,7,1,7,1,7,1,8,1,8,1,8,1,8,3,8,201,8,8,
        1,9,1,9,3,9,205,8,9,1,9,5,9,208,8,9,10,9,12,9,211,9,9,1,9,3,9,214,
        8,9,1,10,1,10,1,10,1,11,1,11,3,11,221,8,11,1,12,1,12,1,13,1,13,1,
        13,3,13,228,8,13,1,14,1,14,1,14,1,14,5,14,234,8,14,10,14,12,14,237,
        9,14,1,14,3,14,240,8,14,1,15,1,15,1,15,1,15,1,15,1,15,5,15,248,8,
        15,10,15,12,15,251,9,15,1,15,1,15,1,15,1,15,1,15,4,15,258,8,15,11,
        15,12,15,259,1,15,1,15,1,16,1,16,1,16,1,16,1,16,5,16,269,8,16,10,
        16,12,16,272,9,16,1,17,1,17,1,18,1,18,1,18,1,18,1,18,1,18,4,18,282,
        8,18,11,18,12,18,283,1,18,1,18,1,19,1,19,3,19,290,8,19,1,20,1,20,
        1,20,1,20,3,20,296,8,20,1,21,1,21,3,21,300,8,21,1,22,1,22,1,23,1,
        23,1,24,1,24,1,25,1,25,1,25,1,25,1,26,1,26,1,26,1,26,1,27,1,27,1,
        27,1,27,1,28,1,28,1,28,5,28,323,8,28,10,28,12,28,326,9,28,1,28,1,
        28,5,28,330,8,28,10,28,12,28,333,9,28,1,28,1,28,1,28,5,28,338,8,
        28,10,28,12,28,341,9,28,3,28,343,8,28,1,29,1,29,1,29,1,29,1,30,1,
        30,1,30,1,30,1,30,1,31,1,31,1,31,1,31,1,31,1,31,1,31,3,31,361,8,
        31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,3,31,371,8,31,1,31,1,
        31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,5,31,386,
        8,31,10,31,12,31,389,9,31,1,32,1,32,1,33,1,33,1,34,3,34,396,8,34,
        1,34,1,34,1,35,1,35,1,35,1,35,3,35,404,8,35,1,35,1,35,1,35,1,35,
        1,35,1,35,4,35,412,8,35,11,35,12,35,413,1,35,1,35,1,36,1,36,3,36,
        420,8,36,1,37,1,37,1,37,5,37,425,8,37,10,37,12,37,428,9,37,1,37,
        1,37,1,37,1,37,5,37,434,8,37,10,37,12,37,437,9,37,1,37,1,37,1,37,
        1,37,1,37,1,37,1,37,5,37,446,8,37,10,37,12,37,449,9,37,3,37,451,
        8,37,1,38,1,38,1,38,5,38,456,8,38,10,38,12,38,459,9,38,1,39,1,39,
        3,39,463,8,39,1,39,1,39,1,39,3,39,468,8,39,1,40,3,40,471,8,40,1,
        40,1,40,4,40,475,8,40,11,40,12,40,476,1,41,3,41,480,8,41,1,41,1,
        41,3,41,484,8,41,1,42,1,42,1,42,1,43,1,43,1,43,1,43,1,44,1,44,1,
        44,1,44,1,44,1,44,1,44,4,44,500,8,44,11,44,12,44,501,1,44,1,44,1,
        45,1,45,1,45,1,45,1,45,1,45,1,45,4,45,513,8,45,11,45,12,45,514,1,
        45,1,45,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,4,46,527,8,46,11,
        46,12,46,528,1,46,1,46,1,47,1,47,1,47,1,47,4,47,537,8,47,11,47,12,
        47,538,1,47,1,47,1,48,1,48,3,48,545,8,48,1,48,1,48,1,48,1,48,1,48,
        1,48,3,48,553,8,48,1,49,1,49,1,49,1,49,1,50,1,50,1,51,1,51,1,51,
        1,51,5,51,565,8,51,10,51,12,51,568,9,51,3,51,570,8,51,1,52,1,52,
        1,52,3,52,575,8,52,1,52,3,52,578,8,52,1,53,1,53,5,53,582,8,53,10,
        53,12,53,585,9,53,1,54,1,54,1,54,1,54,5,54,591,8,54,10,54,12,54,
        594,9,54,5,54,596,8,54,10,54,12,54,599,9,54,1,54,1,54,1,55,1,55,
        1,55,1,56,1,56,1,56,1,57,1,57,1,57,1,57,1,58,1,58,1,58,1,58,1,58,
        5,58,618,8,58,10,58,12,58,621,9,58,1,58,3,58,624,8,58,1,59,1,59,
        1,59,1,59,1,59,1,59,1,60,1,60,1,60,1,60,1,61,1,61,1,61,1,61,1,61,
        1,62,1,62,1,62,1,62,1,62,1,62,1,62,1,62,0,1,62,63,0,2,4,6,8,10,12,
        14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,
        58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,
        102,104,106,108,110,112,114,116,118,120,122,124,0,14,2,0,9,9,19,
        21,1,0,56,57,2,0,57,57,60,60,2,0,54,54,57,57,1,0,47,51,1,0,44,46,
        1,0,42,43,1,0,40,41,1,0,34,39,2,0,31,31,43,43,2,0,55,55,57,61,2,
        0,15,15,56,56,2,0,56,57,60,60,1,0,32,33,682,0,128,1,0,0,0,2,156,
        1,0,0,0,4,158,1,0,0,0,6,169,1,0,0,0,8,173,1,0,0,0,10,177,1,0,0,0,
        12,189,1,0,0,0,14,193,1,0,0,0,16,196,1,0,0,0,18,204,1,0,0,0,20,215,
        1,0,0,0,22,220,1,0,0,0,24,222,1,0,0,0,26,224,1,0,0,0,28,229,1,0,
        0,0,30,241,1,0,0,0,32,263,1,0,0,0,34,273,1,0,0,0,36,275,1,0,0,0,
        38,289,1,0,0,0,40,291,1,0,0,0,42,299,1,0,0,0,44,301,1,0,0,0,46,303,
        1,0,0,0,48,305,1,0,0,0,50,307,1,0,0,0,52,311,1,0,0,0,54,315,1,0,
        0,0,56,342,1,0,0,0,58,344,1,0,0,0,60,348,1,0,0,0,62,370,1,0,0,0,
        64,390,1,0,0,0,66,392,1,0,0,0,68,395,1,0,0,0,70,399,1,0,0,0,72,419,
        1,0,0,0,74,450,1,0,0,0,76,452,1,0,0,0,78,467,1,0,0,0,80,470,1,0,
        0,0,82,479,1,0,0,0,84,485,1,0,0,0,86,488,1,0,0,0,88,492,1,0,0,0,
        90,505,1,0,0,0,92,518,1,0,0,0,94,532,1,0,0,0,96,542,1,0,0,0,98,554,
        1,0,0,0,100,558,1,0,0,0,102,569,1,0,0,0,104,577,1,0,0,0,106,579,
        1,0,0,0,108,586,1,0,0,0,110,602,1,0,0,0,112,605,1,0,0,0,114,608,
        1,0,0,0,116,612,1,0,0,0,118,625,1,0,0,0,120,631,1,0,0,0,122,635,
        1,0,0,0,124,640,1,0,0,0,126,129,3,2,1,0,127,129,5,64,0,0,128,126,
        1,0,0,0,128,127,1,0,0,0,129,130,1,0,0,0,130,128,1,0,0,0,130,131,
        1,0,0,0,131,132,1,0,0,0,132,133,5,0,0,1,133,1,1,0,0,0,134,157,3,
        20,10,0,135,157,3,28,14,0,136,157,3,26,13,0,137,157,3,50,25,0,138,
        157,3,52,26,0,139,157,3,58,29,0,140,157,3,10,5,0,141,157,3,60,30,
        0,142,157,3,46,23,0,143,157,3,48,24,0,144,157,3,70,35,0,145,157,
        3,80,40,0,146,157,3,106,53,0,147,157,3,112,56,0,148,157,3,114,57,
        0,149,157,3,76,38,0,150,157,3,36,18,0,151,157,3,6,3,0,152,157,3,
        110,55,0,153,157,3,116,58,0,154,157,3,122,61,0,155,157,3,124,62,
        0,156,134,1,0,0,0,156,135,1,0,0,0,156,136,1,0,0,0,156,137,1,0,0,
        0,156,138,1,0,0,0,156,139,1,0,0,0,156,140,1,0,0,0,156,141,1,0,0,
        0,156,142,1,0,0,0,156,143,1,0,0,0,156,144,1,0,0,0,156,145,1,0,0,
        0,156,146,1,0,0,0,156,147,1,0,0,0,156,148,1,0,0,0,156,149,1,0,0,
        0,156,150,1,0,0,0,156,151,1,0,0,0,156,152,1,0,0,0,156,153,1,0,0,
        0,156,154,1,0,0,0,156,155,1,0,0,0,157,3,1,0,0,0,158,159,5,64,0,0,
        159,162,5,66,0,0,160,163,5,64,0,0,161,163,3,2,1,0,162,160,1,0,0,
        0,162,161,1,0,0,0,163,164,1,0,0,0,164,162,1,0,0,0,164,165,1,0,0,
        0,165,166,1,0,0,0,166,167,5,67,0,0,167,5,1,0,0,0,168,170,3,8,4,0,
        169,168,1,0,0,0,170,171,1,0,0,0,171,169,1,0,0,0,171,172,1,0,0,0,
        172,7,1,0,0,0,173,174,7,0,0,0,174,175,5,1,0,0,175,176,3,4,2,0,176,
        9,1,0,0,0,177,178,3,76,38,0,178,179,5,1,0,0,179,180,5,64,0,0,180,
        183,5,66,0,0,181,184,5,64,0,0,182,184,3,12,6,0,183,181,1,0,0,0,183,
        182,1,0,0,0,184,185,1,0,0,0,185,183,1,0,0,0,185,186,1,0,0,0,186,
        187,1,0,0,0,187,188,5,67,0,0,188,11,1,0,0,0,189,190,7,1,0,0,190,
        191,5,1,0,0,191,192,3,68,34,0,192,13,1,0,0,0,193,194,5,15,0,0,194,
        195,7,2,0,0,195,15,1,0,0,0,196,197,5,56,0,0,197,200,5,1,0,0,198,
        201,3,68,34,0,199,201,5,56,0,0,200,198,1,0,0,0,200,199,1,0,0,0,201,
        17,1,0,0,0,202,205,3,62,31,0,203,205,3,50,25,0,204,202,1,0,0,0,204,
        203,1,0,0,0,205,209,1,0,0,0,206,208,3,16,8,0,207,206,1,0,0,0,208,
        211,1,0,0,0,209,207,1,0,0,0,209,210,1,0,0,0,210,213,1,0,0,0,211,
        209,1,0,0,0,212,214,3,14,7,0,213,212,1,0,0,0,213,214,1,0,0,0,214,
        19,1,0,0,0,215,216,5,16,0,0,216,217,3,18,9,0,217,21,1,0,0,0,218,
        221,3,18,9,0,219,221,3,14,7,0,220,218,1,0,0,0,220,219,1,0,0,0,221,
        23,1,0,0,0,222,223,7,2,0,0,223,25,1,0,0,0,224,227,5,17,0,0,225,228,
        3,22,11,0,226,228,5,19,0,0,227,225,1,0,0,0,227,226,1,0,0,0,228,27,
        1,0,0,0,229,239,5,18,0,0,230,235,3,22,11,0,231,232,5,2,0,0,232,234,
        3,22,11,0,233,231,1,0,0,0,234,237,1,0,0,0,235,233,1,0,0,0,235,236,
        1,0,0,0,236,240,1,0,0,0,237,235,1,0,0,0,238,240,5,19,0,0,239,230,
        1,0,0,0,239,238,1,0,0,0,240,29,1,0,0,0,241,242,5,17,0,0,242,243,
        3,22,11,0,243,244,5,18,0,0,244,249,3,22,11,0,245,246,5,2,0,0,246,
        248,3,22,11,0,247,245,1,0,0,0,248,251,1,0,0,0,249,247,1,0,0,0,249,
        250,1,0,0,0,250,252,1,0,0,0,251,249,1,0,0,0,252,253,5,1,0,0,253,
        254,5,64,0,0,254,257,5,66,0,0,255,258,5,64,0,0,256,258,3,32,16,0,
        257,255,1,0,0,0,257,256,1,0,0,0,258,259,1,0,0,0,259,257,1,0,0,0,
        259,260,1,0,0,0,260,261,1,0,0,0,261,262,5,67,0,0,262,31,1,0,0,0,
        263,264,3,24,12,0,264,265,5,1,0,0,265,270,3,34,17,0,266,267,5,2,
        0,0,267,269,3,34,17,0,268,266,1,0,0,0,269,272,1,0,0,0,270,268,1,
        0,0,0,270,271,1,0,0,0,271,33,1,0,0,0,272,270,1,0,0,0,273,274,7,3,
        0,0,274,35,1,0,0,0,275,276,3,26,13,0,276,277,5,1,0,0,277,278,5,64,
        0,0,278,281,5,66,0,0,279,282,5,64,0,0,280,282,3,38,19,0,281,279,
        1,0,0,0,281,280,1,0,0,0,282,283,1,0,0,0,283,281,1,0,0,0,283,284,
        1,0,0,0,284,285,1,0,0,0,285,286,5,67,0,0,286,37,1,0,0,0,287,290,
        3,2,1,0,288,290,3,40,20,0,289,287,1,0,0,0,289,288,1,0,0,0,290,39,
        1,0,0,0,291,292,3,24,12,0,292,295,5,1,0,0,293,296,3,42,21,0,294,
        296,3,44,22,0,295,293,1,0,0,0,295,294,1,0,0,0,296,41,1,0,0,0,297,
        300,3,2,1,0,298,300,5,54,0,0,299,297,1,0,0,0,299,298,1,0,0,0,300,
        43,1,0,0,0,301,302,3,4,2,0,302,45,1,0,0,0,303,304,5,8,0,0,304,47,
        1,0,0,0,305,306,5,28,0,0,306,49,1,0,0,0,307,308,3,76,38,0,308,309,
        5,3,0,0,309,310,3,62,31,0,310,51,1,0,0,0,311,312,3,76,38,0,312,313,
        7,4,0,0,313,314,3,62,31,0,314,53,1,0,0,0,315,316,5,56,0,0,316,317,
        5,3,0,0,317,318,3,62,31,0,318,55,1,0,0,0,319,324,3,62,31,0,320,321,
        5,2,0,0,321,323,3,62,31,0,322,320,1,0,0,0,323,326,1,0,0,0,324,322,
        1,0,0,0,324,325,1,0,0,0,325,331,1,0,0,0,326,324,1,0,0,0,327,328,
        5,2,0,0,328,330,3,54,27,0,329,327,1,0,0,0,330,333,1,0,0,0,331,329,
        1,0,0,0,331,332,1,0,0,0,332,343,1,0,0,0,333,331,1,0,0,0,334,339,
        3,54,27,0,335,336,5,2,0,0,336,338,3,54,27,0,337,335,1,0,0,0,338,
        341,1,0,0,0,339,337,1,0,0,0,339,340,1,0,0,0,340,343,1,0,0,0,341,
        339,1,0,0,0,342,319,1,0,0,0,342,334,1,0,0,0,343,57,1,0,0,0,344,345,
        3,76,38,0,345,346,5,3,0,0,346,347,3,62,31,0,347,59,1,0,0,0,348,349,
        5,4,0,0,349,350,5,56,0,0,350,351,5,3,0,0,351,352,3,62,31,0,352,61,
        1,0,0,0,353,354,6,31,-1,0,354,355,5,52,0,0,355,356,3,62,31,0,356,
        357,5,53,0,0,357,371,1,0,0,0,358,361,3,68,34,0,359,361,3,76,38,0,
        360,358,1,0,0,0,360,359,1,0,0,0,361,371,1,0,0,0,362,363,3,66,33,
        0,363,364,3,62,31,10,364,371,1,0,0,0,365,371,3,88,44,0,366,371,3,
        90,45,0,367,371,3,92,46,0,368,371,3,80,40,0,369,371,3,108,54,0,370,
        353,1,0,0,0,370,360,1,0,0,0,370,362,1,0,0,0,370,365,1,0,0,0,370,
        366,1,0,0,0,370,367,1,0,0,0,370,368,1,0,0,0,370,369,1,0,0,0,371,
        387,1,0,0,0,372,373,10,9,0,0,373,374,7,5,0,0,374,386,3,62,31,10,
        375,376,10,8,0,0,376,377,7,6,0,0,377,386,3,62,31,9,378,379,10,7,
        0,0,379,380,3,64,32,0,380,381,3,62,31,8,381,386,1,0,0,0,382,383,
        10,6,0,0,383,384,7,7,0,0,384,386,3,62,31,7,385,372,1,0,0,0,385,375,
        1,0,0,0,385,378,1,0,0,0,385,382,1,0,0,0,386,389,1,0,0,0,387,385,
        1,0,0,0,387,388,1,0,0,0,388,63,1,0,0,0,389,387,1,0,0,0,390,391,7,
        8,0,0,391,65,1,0,0,0,392,393,7,9,0,0,393,67,1,0,0,0,394,396,5,43,
        0,0,395,394,1,0,0,0,395,396,1,0,0,0,396,397,1,0,0,0,397,398,7,10,
        0,0,398,69,1,0,0,0,399,400,5,23,0,0,400,401,5,56,0,0,401,403,5,52,
        0,0,402,404,3,74,37,0,403,402,1,0,0,0,403,404,1,0,0,0,404,405,1,
        0,0,0,405,406,5,53,0,0,406,407,5,1,0,0,407,408,5,64,0,0,408,411,
        5,66,0,0,409,412,5,64,0,0,410,412,3,72,36,0,411,409,1,0,0,0,411,
        410,1,0,0,0,412,413,1,0,0,0,413,411,1,0,0,0,413,414,1,0,0,0,414,
        415,1,0,0,0,415,416,5,67,0,0,416,71,1,0,0,0,417,420,3,2,1,0,418,
        420,3,84,42,0,419,417,1,0,0,0,419,418,1,0,0,0,420,73,1,0,0,0,421,
        426,5,56,0,0,422,423,5,2,0,0,423,425,5,56,0,0,424,422,1,0,0,0,425,
        428,1,0,0,0,426,424,1,0,0,0,426,427,1,0,0,0,427,435,1,0,0,0,428,
        426,1,0,0,0,429,430,5,2,0,0,430,431,5,56,0,0,431,432,5,3,0,0,432,
        434,3,68,34,0,433,429,1,0,0,0,434,437,1,0,0,0,435,433,1,0,0,0,435,
        436,1,0,0,0,436,451,1,0,0,0,437,435,1,0,0,0,438,439,5,56,0,0,439,
        440,5,3,0,0,440,447,3,68,34,0,441,442,5,2,0,0,442,443,5,56,0,0,443,
        444,5,3,0,0,444,446,3,68,34,0,445,441,1,0,0,0,446,449,1,0,0,0,447,
        445,1,0,0,0,447,448,1,0,0,0,448,451,1,0,0,0,449,447,1,0,0,0,450,
        421,1,0,0,0,450,438,1,0,0,0,451,75,1,0,0,0,452,457,5,56,0,0,453,
        454,5,5,0,0,454,456,5,56,0,0,455,453,1,0,0,0,456,459,1,0,0,0,457,
        455,1,0,0,0,457,458,1,0,0,0,458,77,1,0,0,0,459,457,1,0,0,0,460,462,
        5,52,0,0,461,463,3,56,28,0,462,461,1,0,0,0,462,463,1,0,0,0,463,464,
        1,0,0,0,464,468,5,53,0,0,465,466,5,5,0,0,466,468,5,56,0,0,467,460,
        1,0,0,0,467,465,1,0,0,0,468,79,1,0,0,0,469,471,3,82,41,0,470,469,
        1,0,0,0,470,471,1,0,0,0,471,472,1,0,0,0,472,474,5,56,0,0,473,475,
        3,78,39,0,474,473,1,0,0,0,475,476,1,0,0,0,476,474,1,0,0,0,476,477,
        1,0,0,0,477,81,1,0,0,0,478,480,5,42,0,0,479,478,1,0,0,0,479,480,
        1,0,0,0,480,481,1,0,0,0,481,483,5,44,0,0,482,484,3,62,31,0,483,482,
        1,0,0,0,483,484,1,0,0,0,484,83,1,0,0,0,485,486,5,22,0,0,486,487,
        3,62,31,0,487,85,1,0,0,0,488,489,3,100,50,0,489,490,5,1,0,0,490,
        491,3,4,2,0,491,87,1,0,0,0,492,493,5,10,0,0,493,494,5,11,0,0,494,
        495,5,1,0,0,495,496,5,64,0,0,496,499,5,66,0,0,497,500,5,64,0,0,498,
        500,3,98,49,0,499,497,1,0,0,0,499,498,1,0,0,0,500,501,1,0,0,0,501,
        499,1,0,0,0,501,502,1,0,0,0,502,503,1,0,0,0,503,504,5,67,0,0,504,
        89,1,0,0,0,505,506,5,10,0,0,506,507,5,12,0,0,507,508,5,1,0,0,508,
        509,5,64,0,0,509,512,5,66,0,0,510,513,5,64,0,0,511,513,3,96,48,0,
        512,510,1,0,0,0,512,511,1,0,0,0,513,514,1,0,0,0,514,512,1,0,0,0,
        514,515,1,0,0,0,515,516,1,0,0,0,516,517,5,67,0,0,517,91,1,0,0,0,
        518,519,5,10,0,0,519,520,5,13,0,0,520,521,5,1,0,0,521,522,5,64,0,
        0,522,526,5,66,0,0,523,527,5,64,0,0,524,527,3,98,49,0,525,527,3,
        86,43,0,526,523,1,0,0,0,526,524,1,0,0,0,526,525,1,0,0,0,527,528,
        1,0,0,0,528,526,1,0,0,0,528,529,1,0,0,0,529,530,1,0,0,0,530,531,
        5,67,0,0,531,93,1,0,0,0,532,533,5,64,0,0,533,536,5,66,0,0,534,537,
        5,64,0,0,535,537,3,98,49,0,536,534,1,0,0,0,536,535,1,0,0,0,537,538,
        1,0,0,0,538,536,1,0,0,0,538,539,1,0,0,0,539,540,1,0,0,0,540,541,
        5,67,0,0,541,95,1,0,0,0,542,544,7,11,0,0,543,545,5,1,0,0,544,543,
        1,0,0,0,544,545,1,0,0,0,545,552,1,0,0,0,546,553,3,56,28,0,547,548,
        5,52,0,0,548,549,3,56,28,0,549,550,5,53,0,0,550,553,1,0,0,0,551,
        553,3,94,47,0,552,546,1,0,0,0,552,547,1,0,0,0,552,551,1,0,0,0,553,
        97,1,0,0,0,554,555,3,100,50,0,555,556,5,1,0,0,556,557,3,102,51,0,
        557,99,1,0,0,0,558,559,7,12,0,0,559,101,1,0,0,0,560,570,3,94,47,
        0,561,566,3,62,31,0,562,563,5,2,0,0,563,565,3,62,31,0,564,562,1,
        0,0,0,565,568,1,0,0,0,566,564,1,0,0,0,566,567,1,0,0,0,567,570,1,
        0,0,0,568,566,1,0,0,0,569,560,1,0,0,0,569,561,1,0,0,0,570,103,1,
        0,0,0,571,574,5,56,0,0,572,575,5,57,0,0,573,575,3,62,31,0,574,572,
        1,0,0,0,574,573,1,0,0,0,575,578,1,0,0,0,576,578,5,56,0,0,577,571,
        1,0,0,0,577,576,1,0,0,0,578,105,1,0,0,0,579,583,5,14,0,0,580,582,
        3,104,52,0,581,580,1,0,0,0,582,585,1,0,0,0,583,581,1,0,0,0,583,584,
        1,0,0,0,584,107,1,0,0,0,585,583,1,0,0,0,586,597,5,6,0,0,587,592,
        3,62,31,0,588,589,5,2,0,0,589,591,3,62,31,0,590,588,1,0,0,0,591,
        594,1,0,0,0,592,590,1,0,0,0,592,593,1,0,0,0,593,596,1,0,0,0,594,
        592,1,0,0,0,595,587,1,0,0,0,596,599,1,0,0,0,597,595,1,0,0,0,597,
        598,1,0,0,0,598,600,1,0,0,0,599,597,1,0,0,0,600,601,5,7,0,0,601,
        109,1,0,0,0,602,603,5,19,0,0,603,604,5,56,0,0,604,111,1,0,0,0,605,
        606,5,24,0,0,606,607,5,56,0,0,607,113,1,0,0,0,608,609,7,13,0,0,609,
        610,5,1,0,0,610,611,3,4,2,0,611,115,1,0,0,0,612,613,5,29,0,0,613,
        614,3,62,31,0,614,615,5,1,0,0,615,619,3,4,2,0,616,618,3,118,59,0,
        617,616,1,0,0,0,618,621,1,0,0,0,619,617,1,0,0,0,619,620,1,0,0,0,
        620,623,1,0,0,0,621,619,1,0,0,0,622,624,3,120,60,0,623,622,1,0,0,
        0,623,624,1,0,0,0,624,117,1,0,0,0,625,626,5,30,0,0,626,627,5,29,
        0,0,627,628,3,62,31,0,628,629,5,1,0,0,629,630,3,4,2,0,630,119,1,
        0,0,0,631,632,5,30,0,0,632,633,5,1,0,0,633,634,3,4,2,0,634,121,1,
        0,0,0,635,636,5,27,0,0,636,637,3,62,31,0,637,638,5,1,0,0,638,639,
        3,4,2,0,639,123,1,0,0,0,640,641,5,25,0,0,641,642,5,56,0,0,642,643,
        5,26,0,0,643,644,3,62,31,0,644,645,5,1,0,0,645,646,3,4,2,0,646,125,
        1,0,0,0,68,128,130,156,162,164,171,183,185,200,204,209,213,220,227,
        235,239,249,257,259,270,281,283,289,295,299,324,331,339,342,360,
        370,385,387,395,403,411,413,419,426,435,447,450,457,462,467,470,
        476,479,483,499,501,512,514,526,528,536,538,544,552,566,569,574,
        577,583,592,597,619,623
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
    public break_keyword(): Break_keywordContext | null {
        return this.getRuleContext(0, Break_keywordContext);
    }
    public continue_keyword(): Continue_keywordContext | null {
        return this.getRuleContext(0, Continue_keywordContext);
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
    public for_expr(): For_exprContext | null {
        return this.getRuleContext(0, For_exprContext);
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


export class Continue_keywordContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public Continue(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.Continue, 0)!;
    }
    public override get ruleIndex(): number {
        return CircuitScriptParser.RULE_continue_keyword;
    }
    public override accept<Result>(visitor: CircuitScriptVisitor<Result>): Result | null {
        if (visitor.visitContinue_keyword) {
            return visitor.visitContinue_keyword(this);
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


export class For_exprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public For(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.For, 0)!;
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(CircuitScriptParser.ID, 0)!;
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
