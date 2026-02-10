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
    public static readonly RULE_flow_expressions = 2;
    public static readonly RULE_graph_expressions = 3;
    public static readonly RULE_expressions_block = 4;
    public static readonly RULE_path_block = 5;
    public static readonly RULE_pin_select_expr = 6;
    public static readonly RULE_component_modifier_expr = 7;
    public static readonly RULE_data_expr_with_assignment = 8;
    public static readonly RULE_add_component_expr = 9;
    public static readonly RULE_component_select_expr = 10;
    public static readonly RULE_pin_select_expr2 = 11;
    public static readonly RULE_at_component_expr = 12;
    public static readonly RULE_to_component_expr = 13;
    public static readonly RULE_at_block = 14;
    public static readonly RULE_at_block_expressions = 15;
    public static readonly RULE_at_block_header = 16;
    public static readonly RULE_at_block_pin_expr = 17;
    public static readonly RULE_at_block_pin_expression_simple = 18;
    public static readonly RULE_at_block_pin_expression_complex = 19;
    public static readonly RULE_assignment_expr = 20;
    public static readonly RULE_operator_assignment_expr = 21;
    public static readonly RULE_keyword_assignment_expr = 22;
    public static readonly RULE_parameters = 23;
    public static readonly RULE_double_dot_property_set_expr = 24;
    public static readonly RULE_data_expr = 25;
    public static readonly RULE_value_expr = 26;
    public static readonly RULE_function_def_expr = 27;
    public static readonly RULE_function_expr = 28;
    public static readonly RULE_function_args_expr = 29;
    public static readonly RULE_atom_expr = 30;
    public static readonly RULE_trailer_expr = 31;
    public static readonly RULE_trailer_expr2 = 32;
    public static readonly RULE_function_call_expr = 33;
    public static readonly RULE_net_namespace_expr = 34;
    public static readonly RULE_function_return_expr = 35;
    public static readonly RULE_property_block_expr = 36;
    public static readonly RULE_graphic_expressions_block = 37;
    public static readonly RULE_create_expr = 38;
    public static readonly RULE_create_component_expr = 39;
    public static readonly RULE_create_graphic_expr = 40;
    public static readonly RULE_create_module_expr = 41;
    public static readonly RULE_nested_properties_inner = 42;
    public static readonly RULE_graphic_expr = 43;
    public static readonly RULE_property_expr = 44;
    public static readonly RULE_property_key_expr = 45;
    public static readonly RULE_property_value_expr = 46;
    public static readonly RULE_wire_atom_expr = 47;
    public static readonly RULE_wire_expr = 48;
    public static readonly RULE_point_expr = 49;
    public static readonly RULE_import_expr = 50;
    public static readonly RULE_import_annotation_expr = 51;
    public static readonly RULE_frame_expr = 52;
    public static readonly RULE_if_expr = 53;
    public static readonly RULE_if_inner_expr = 54;
    public static readonly RULE_else_expr = 55;
    public static readonly RULE_while_expr = 56;
    public static readonly RULE_for_expr = 57;
    public static readonly RULE_part_set_expr = 58;
    public static readonly RULE_part_set_key = 59;
    public static readonly RULE_part_match_block = 60;
    public static readonly RULE_part_sub_expr = 61;
    public static readonly RULE_part_condition_expr = 62;
    public static readonly RULE_part_condition_key_only_expr = 63;
    public static readonly RULE_part_value_expr = 64;
    public static readonly RULE_annotation_comment_expr = 65;

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
        "DivideAssign", "MultiplyAssign", "ModulusAssign", "NEWLINE", "WS", 
        "COMMENT", "LParen", "RParen", "NOT_CONNECTED", "BOOLEAN_VALUE", 
        "ANNOTATION_START", "INTEGER_VALUE", "DECIMAL_VALUE", "NUMERIC_VALUE", 
        "PERCENTAGE_VALUE", "STRING_VALUE", "ID"
    ];
    public static readonly ruleNames = [
        "script", "expression", "flow_expressions", "graph_expressions", 
        "expressions_block", "path_block", "pin_select_expr", "component_modifier_expr", 
        "data_expr_with_assignment", "add_component_expr", "component_select_expr", 
        "pin_select_expr2", "at_component_expr", "to_component_expr", "at_block", 
        "at_block_expressions", "at_block_header", "at_block_pin_expr", 
        "at_block_pin_expression_simple", "at_block_pin_expression_complex", 
        "assignment_expr", "operator_assignment_expr", "keyword_assignment_expr", 
        "parameters", "double_dot_property_set_expr", "data_expr", "value_expr", 
        "function_def_expr", "function_expr", "function_args_expr", "atom_expr", 
        "trailer_expr", "trailer_expr2", "function_call_expr", "net_namespace_expr", 
        "function_return_expr", "property_block_expr", "graphic_expressions_block", 
        "create_expr", "create_component_expr", "create_graphic_expr", "create_module_expr", 
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
            this.state = 136;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 1, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    this.state = 134;
                    this.errorHandler.sync(this);
                    switch (this.tokenStream.LA(1)) {
                    case CircuitScriptParser.Import:
                    case CircuitScriptParser.From:
                        {
                        this.state = 132;
                        this.import_expr();
                        }
                        break;
                    case CircuitScriptParser.NEWLINE:
                        {
                        this.state = 133;
                        this.match(CircuitScriptParser.NEWLINE);
                        }
                        break;
                    default:
                        throw new antlr.NoViableAltException(this);
                    }
                    }
                }
                this.state = 138;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 1, this.context);
            }
            this.state = 142;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 3)) & ~0x1F) === 0 && ((1 << (_la - 3)) & 2390015811) !== 0) || ((((_la - 46)) & ~0x1F) === 0 && ((1 << (_la - 46)) & 8520709) !== 0)) {
                {
                {
                this.state = 139;
                this.expression();
                }
                }
                this.state = 144;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 145;
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
            this.state = 159;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 147;
                this.flow_expressions();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 148;
                this.graph_expressions();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 149;
                this.function_def_expr();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 150;
                this.frame_expr();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 151;
                this.part_set_expr();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 152;
                this.annotation_comment_expr();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 153;
                this.double_dot_property_set_expr();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 154;
                this.assignment_expr();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 155;
                this.operator_assignment_expr();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 156;
                this.atom_expr();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 157;
                this.function_call_expr();
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 158;
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
            this.state = 166;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.If:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 161;
                this.if_expr();
                }
                break;
            case CircuitScriptParser.While:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 162;
                this.while_expr();
                }
                break;
            case CircuitScriptParser.For:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 163;
                this.for_expr();
                }
                break;
            case CircuitScriptParser.Break:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 164;
                this.match(CircuitScriptParser.Break);
                }
                break;
            case CircuitScriptParser.Continue:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 165;
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
            this.state = 175;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 5, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 168;
                this.add_component_expr();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 169;
                this.to_component_expr();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 170;
                this.at_component_expr();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 171;
                this.at_block();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 172;
                this.wire_expr();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 173;
                this.point_expr();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 174;
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
            this.state = 177;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 178;
            this.match(CircuitScriptParser.INDENT);
            this.state = 180;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 179;
                this.expression();
                }
                }
                this.state = 182;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 3)) & ~0x1F) === 0 && ((1 << (_la - 3)) & 2390015811) !== 0) || ((((_la - 46)) & ~0x1F) === 0 && ((1 << (_la - 46)) & 8520709) !== 0));
            this.state = 184;
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
            this.state = 186;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 114704) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 187;
            this.match(CircuitScriptParser.Colon);
            this.state = 188;
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
    public pin_select_expr(): Pin_select_exprContext {
        let localContext = new Pin_select_exprContext(this.context, this.state);
        this.enterRule(localContext, 12, CircuitScriptParser.RULE_pin_select_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 190;
            this.match(CircuitScriptParser.Pin);
            this.state = 191;
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
        this.enterRule(localContext, 14, CircuitScriptParser.RULE_component_modifier_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 193;
            this.match(CircuitScriptParser.ID);
            this.state = 194;
            this.match(CircuitScriptParser.Colon);
            this.state = 195;
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
        this.enterRule(localContext, 16, CircuitScriptParser.RULE_data_expr_with_assignment);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 199;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 7, this.context) ) {
            case 1:
                {
                this.state = 197;
                this.data_expr(0);
                }
                break;
            case 2:
                {
                this.state = 198;
                this.assignment_expr();
                }
                break;
            }
            this.state = 204;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 8, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 201;
                    this.component_modifier_expr();
                    }
                    }
                }
                this.state = 206;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 8, this.context);
            }
            this.state = 208;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 10) {
                {
                this.state = 207;
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
        this.enterRule(localContext, 18, CircuitScriptParser.RULE_add_component_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 210;
            this.match(CircuitScriptParser.Add);
            this.state = 211;
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
        this.enterRule(localContext, 20, CircuitScriptParser.RULE_component_select_expr);
        try {
            this.state = 216;
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
                this.state = 213;
                this.data_expr_with_assignment();
                }
                break;
            case CircuitScriptParser.Pin:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 214;
                this.pin_select_expr();
                }
                break;
            case CircuitScriptParser.Point:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 215;
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
        this.enterRule(localContext, 22, CircuitScriptParser.RULE_pin_select_expr2);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 218;
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
        this.enterRule(localContext, 24, CircuitScriptParser.RULE_at_component_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 220;
            this.match(CircuitScriptParser.At);
            this.state = 221;
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
        this.enterRule(localContext, 26, CircuitScriptParser.RULE_to_component_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 223;
            this.match(CircuitScriptParser.To);
            this.state = 224;
            this.component_select_expr();
            this.state = 229;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 32) {
                {
                {
                this.state = 225;
                this.match(CircuitScriptParser.Comma);
                this.state = 226;
                this.component_select_expr();
                }
                }
                this.state = 231;
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
        this.enterRule(localContext, 28, CircuitScriptParser.RULE_at_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 232;
            this.at_block_header();
            this.state = 233;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 234;
            this.match(CircuitScriptParser.INDENT);
            this.state = 237;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 237;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 12, this.context) ) {
                case 1:
                    {
                    this.state = 235;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case 2:
                    {
                    this.state = 236;
                    this.at_block_expressions();
                    }
                    break;
                }
                }
                this.state = 239;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 3)) & ~0x1F) === 0 && ((1 << (_la - 3)) & 2390015811) !== 0) || ((((_la - 46)) & ~0x1F) === 0 && ((1 << (_la - 46)) & 12977157) !== 0));
            this.state = 241;
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
        this.enterRule(localContext, 30, CircuitScriptParser.RULE_at_block_expressions);
        try {
            this.state = 245;
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
                this.state = 243;
                this.expression();
                }
                break;
            case CircuitScriptParser.INTEGER_VALUE:
            case CircuitScriptParser.STRING_VALUE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 244;
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
        this.enterRule(localContext, 32, CircuitScriptParser.RULE_at_block_header);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 247;
            this.at_component_expr();
            this.state = 248;
            this.match(CircuitScriptParser.Colon);
            this.state = 252;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 63) {
                {
                {
                this.state = 249;
                this.annotation_comment_expr();
                }
                }
                this.state = 254;
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
        this.enterRule(localContext, 34, CircuitScriptParser.RULE_at_block_pin_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 255;
            this.pin_select_expr2();
            this.state = 256;
            this.match(CircuitScriptParser.Colon);
            this.state = 259;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 16, this.context) ) {
            case 1:
                {
                this.state = 257;
                this.at_block_pin_expression_simple();
                }
                break;
            case 2:
                {
                this.state = 258;
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
        this.enterRule(localContext, 36, CircuitScriptParser.RULE_at_block_pin_expression_simple);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 263;
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
                this.state = 261;
                this.expression();
                }
                break;
            case CircuitScriptParser.NOT_CONNECTED:
                {
                this.state = 262;
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
        this.enterRule(localContext, 38, CircuitScriptParser.RULE_at_block_pin_expression_complex);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 265;
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
        this.enterRule(localContext, 40, CircuitScriptParser.RULE_assignment_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 269;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 18, this.context) ) {
            case 1:
                {
                this.state = 267;
                this.atom_expr();
                }
                break;
            case 2:
                {
                this.state = 268;
                this.function_call_expr();
                }
                break;
            }
            this.state = 271;
            this.match(CircuitScriptParser.Assign);
            this.state = 272;
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
        this.enterRule(localContext, 42, CircuitScriptParser.RULE_operator_assignment_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 274;
            this.atom_expr();
            this.state = 275;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 31) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 276;
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
        this.enterRule(localContext, 44, CircuitScriptParser.RULE_keyword_assignment_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 278;
            this.match(CircuitScriptParser.ID);
            this.state = 279;
            this.match(CircuitScriptParser.Assign);
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
    public parameters(): ParametersContext {
        let localContext = new ParametersContext(this.context, this.state);
        this.enterRule(localContext, 46, CircuitScriptParser.RULE_parameters);
        let _la: number;
        try {
            let alternative: number;
            this.state = 305;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 22, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                {
                this.state = 282;
                this.data_expr(0);
                this.state = 287;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 19, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 283;
                        this.match(CircuitScriptParser.Comma);
                        this.state = 284;
                        this.data_expr(0);
                        }
                        }
                    }
                    this.state = 289;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 19, this.context);
                }
                this.state = 294;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 32) {
                    {
                    {
                    this.state = 290;
                    this.match(CircuitScriptParser.Comma);
                    this.state = 291;
                    this.keyword_assignment_expr();
                    }
                    }
                    this.state = 296;
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
                this.state = 297;
                this.keyword_assignment_expr();
                this.state = 302;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 32) {
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
    public double_dot_property_set_expr(): Double_dot_property_set_exprContext {
        let localContext = new Double_dot_property_set_exprContext(this.context, this.state);
        this.enterRule(localContext, 48, CircuitScriptParser.RULE_double_dot_property_set_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 307;
            this.match(CircuitScriptParser.DoubleDot);
            this.state = 308;
            this.match(CircuitScriptParser.ID);
            this.state = 309;
            this.match(CircuitScriptParser.Assign);
            this.state = 310;
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
        let _startState = 50;
        this.enterRecursionRule(localContext, 50, CircuitScriptParser.RULE_data_expr, _p);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 339;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 25, this.context) ) {
            case 1:
                {
                localContext = new RoundedBracketsExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;

                this.state = 313;
                this.match(CircuitScriptParser.LParen);
                this.state = 314;
                this.data_expr(0);
                this.state = 315;
                this.match(CircuitScriptParser.RParen);
                }
                break;
            case 2:
                {
                localContext = new CreateExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 317;
                this.match(CircuitScriptParser.Create);
                this.state = 318;
                this.create_expr();
                }
                break;
            case 3:
                {
                localContext = new UnaryOperatorExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 319;
                _la = this.tokenStream.LA(1);
                if(!(_la === 27 || _la === 47)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 320;
                this.data_expr(9);
                }
                break;
            case 4:
                {
                localContext = new ArrayExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 321;
                this.match(CircuitScriptParser.LSquare);
                this.state = 332;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (((((_la - 5)) & ~0x1F) === 0 && ((1 << (_la - 5)) & 1077936129) !== 0) || ((((_la - 46)) & ~0x1F) === 0 && ((1 << (_la - 46)) & 16588807) !== 0)) {
                    {
                    {
                    this.state = 322;
                    this.data_expr(0);
                    this.state = 327;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 32) {
                        {
                        {
                        this.state = 323;
                        this.match(CircuitScriptParser.Comma);
                        this.state = 324;
                        this.data_expr(0);
                        }
                        }
                        this.state = 329;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    }
                    }
                    this.state = 334;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 335;
                this.match(CircuitScriptParser.RSquare);
                }
                break;
            case 5:
                {
                localContext = new AtomExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 336;
                this.atom_expr();
                }
                break;
            case 6:
                {
                localContext = new FunctionCallExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 337;
                this.function_call_expr();
                }
                break;
            case 7:
                {
                localContext = new ValueExprContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 338;
                this.value_expr();
                }
                break;
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 355;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 27, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 353;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 26, this.context) ) {
                    case 1:
                        {
                        localContext = new MultiplyExprContext(new Data_exprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CircuitScriptParser.RULE_data_expr);
                        this.state = 341;
                        if (!(this.precpred(this.context, 7))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 7)");
                        }
                        this.state = 342;
                        _la = this.tokenStream.LA(1);
                        if(!(((((_la - 48)) & ~0x1F) === 0 && ((1 << (_la - 48)) & 7) !== 0))) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 343;
                        this.data_expr(8);
                        }
                        break;
                    case 2:
                        {
                        localContext = new AdditionExprContext(new Data_exprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CircuitScriptParser.RULE_data_expr);
                        this.state = 344;
                        if (!(this.precpred(this.context, 6))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 6)");
                        }
                        this.state = 345;
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 46 || _la === 47)) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 346;
                        this.data_expr(7);
                        }
                        break;
                    case 3:
                        {
                        localContext = new BinaryOperatorExprContext(new Data_exprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CircuitScriptParser.RULE_data_expr);
                        this.state = 347;
                        if (!(this.precpred(this.context, 5))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 5)");
                        }
                        this.state = 348;
                        _la = this.tokenStream.LA(1);
                        if(!(((((_la - 38)) & ~0x1F) === 0 && ((1 << (_la - 38)) & 63) !== 0))) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 349;
                        this.data_expr(6);
                        }
                        break;
                    case 4:
                        {
                        localContext = new LogicalOperatorExprContext(new Data_exprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CircuitScriptParser.RULE_data_expr);
                        this.state = 350;
                        if (!(this.precpred(this.context, 4))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 4)");
                        }
                        this.state = 351;
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 44 || _la === 45)) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 352;
                        this.data_expr(5);
                        }
                        break;
                    }
                    }
                }
                this.state = 357;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 27, this.context);
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
        this.enterRule(localContext, 52, CircuitScriptParser.RULE_value_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            {
            this.state = 359;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 47) {
                {
                this.state = 358;
                this.match(CircuitScriptParser.Minus);
                }
            }

            this.state = 361;
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
        this.enterRule(localContext, 54, CircuitScriptParser.RULE_function_def_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 363;
            this.match(CircuitScriptParser.Define);
            this.state = 364;
            this.match(CircuitScriptParser.ID);
            this.state = 365;
            this.match(CircuitScriptParser.LParen);
            this.state = 367;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 69) {
                {
                this.state = 366;
                this.function_args_expr();
                }
            }

            this.state = 369;
            this.match(CircuitScriptParser.RParen);
            this.state = 370;
            this.match(CircuitScriptParser.Colon);
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
                switch (this.interpreter.adaptivePredict(this.tokenStream, 30, this.context) ) {
                case 1:
                    {
                    this.state = 373;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case 2:
                    {
                    this.state = 374;
                    this.function_expr();
                    }
                    break;
                }
                }
                this.state = 377;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 3)) & ~0x1F) === 0 && ((1 << (_la - 3)) & 2390032195) !== 0) || ((((_la - 46)) & ~0x1F) === 0 && ((1 << (_la - 46)) & 8520709) !== 0));
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
        this.enterRule(localContext, 56, CircuitScriptParser.RULE_function_expr);
        try {
            this.state = 383;
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
        this.enterRule(localContext, 58, CircuitScriptParser.RULE_function_args_expr);
        let _la: number;
        try {
            let alternative: number;
            this.state = 414;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 36, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 385;
                this.match(CircuitScriptParser.ID);
                this.state = 390;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 33, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        {
                        this.state = 386;
                        this.match(CircuitScriptParser.Comma);
                        this.state = 387;
                        this.match(CircuitScriptParser.ID);
                        }
                        }
                    }
                    this.state = 392;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 33, this.context);
                }
                this.state = 399;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 32) {
                    {
                    {
                    this.state = 393;
                    this.match(CircuitScriptParser.Comma);
                    this.state = 394;
                    this.match(CircuitScriptParser.ID);
                    this.state = 395;
                    this.match(CircuitScriptParser.Assign);
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
                this.match(CircuitScriptParser.Assign);
                this.state = 404;
                this.value_expr();
                this.state = 411;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 32) {
                    {
                    {
                    this.state = 405;
                    this.match(CircuitScriptParser.Comma);
                    this.state = 406;
                    this.match(CircuitScriptParser.ID);
                    this.state = 407;
                    this.match(CircuitScriptParser.Assign);
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
        this.enterRule(localContext, 60, CircuitScriptParser.RULE_atom_expr);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 416;
            this.match(CircuitScriptParser.ID);
            this.state = 420;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 37, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 417;
                    this.trailer_expr2();
                    }
                    }
                }
                this.state = 422;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 37, this.context);
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
        this.enterRule(localContext, 62, CircuitScriptParser.RULE_trailer_expr);
        let _la: number;
        try {
            this.state = 429;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.LParen:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 423;
                this.match(CircuitScriptParser.LParen);
                this.state = 425;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (((((_la - 5)) & ~0x1F) === 0 && ((1 << (_la - 5)) & 1077936129) !== 0) || ((((_la - 46)) & ~0x1F) === 0 && ((1 << (_la - 46)) & 16588807) !== 0)) {
                    {
                    this.state = 424;
                    this.parameters();
                    }
                }

                this.state = 427;
                this.match(CircuitScriptParser.RParen);
                }
                break;
            case CircuitScriptParser.Dot:
            case CircuitScriptParser.LSquare:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 428;
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
        this.enterRule(localContext, 64, CircuitScriptParser.RULE_trailer_expr2);
        try {
            this.state = 437;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.Dot:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 431;
                this.match(CircuitScriptParser.Dot);
                this.state = 432;
                this.match(CircuitScriptParser.ID);
                }
                break;
            case CircuitScriptParser.LSquare:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 433;
                this.match(CircuitScriptParser.LSquare);
                this.state = 434;
                this.data_expr(0);
                this.state = 435;
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
        this.enterRule(localContext, 66, CircuitScriptParser.RULE_function_call_expr);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 440;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 46 || _la === 48) {
                {
                this.state = 439;
                this.net_namespace_expr();
                }
            }

            this.state = 442;
            this.match(CircuitScriptParser.ID);
            this.state = 444;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 443;
                    this.trailer_expr();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 446;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 42, this.context);
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
        this.enterRule(localContext, 68, CircuitScriptParser.RULE_net_namespace_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 449;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 46) {
                {
                this.state = 448;
                this.match(CircuitScriptParser.Addition);
                }
            }

            this.state = 451;
            this.match(CircuitScriptParser.Divide);
            this.state = 453;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 44, this.context) ) {
            case 1:
                {
                this.state = 452;
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
        this.enterRule(localContext, 70, CircuitScriptParser.RULE_function_return_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 455;
            this.match(CircuitScriptParser.Return);
            this.state = 456;
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
        this.enterRule(localContext, 72, CircuitScriptParser.RULE_property_block_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 458;
            this.property_key_expr();
            this.state = 459;
            this.match(CircuitScriptParser.Colon);
            this.state = 460;
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
        this.enterRule(localContext, 74, CircuitScriptParser.RULE_graphic_expressions_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 462;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 463;
            this.match(CircuitScriptParser.INDENT);
            this.state = 466;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 466;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 464;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case CircuitScriptParser.Pin:
                case CircuitScriptParser.For:
                case CircuitScriptParser.ID:
                    {
                    this.state = 465;
                    this.graphic_expr();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 468;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 10 || _la === 21 || _la === 56 || _la === 69);
            this.state = 470;
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
        this.enterRule(localContext, 76, CircuitScriptParser.RULE_create_expr);
        try {
            this.state = 475;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.Component:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 472;
                this.create_component_expr();
                }
                break;
            case CircuitScriptParser.Graphic:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 473;
                this.create_graphic_expr();
                }
                break;
            case CircuitScriptParser.Module:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 474;
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
        this.enterRule(localContext, 78, CircuitScriptParser.RULE_create_component_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 477;
            this.match(CircuitScriptParser.Component);
            this.state = 478;
            this.match(CircuitScriptParser.Colon);
            this.state = 479;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 480;
            this.match(CircuitScriptParser.INDENT);
            this.state = 483;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 483;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 481;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case CircuitScriptParser.INTEGER_VALUE:
                case CircuitScriptParser.STRING_VALUE:
                case CircuitScriptParser.ID:
                    {
                    this.state = 482;
                    this.property_expr();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 485;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 12545) !== 0));
            this.state = 487;
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
            this.state = 489;
            this.match(CircuitScriptParser.Graphic);
            this.state = 493;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 59) {
                {
                this.state = 490;
                this.match(CircuitScriptParser.LParen);
                this.state = 491;
                this.match(CircuitScriptParser.ID);
                this.state = 492;
                this.match(CircuitScriptParser.RParen);
                }
            }

            this.state = 495;
            this.match(CircuitScriptParser.Colon);
            this.state = 496;
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
        this.enterRule(localContext, 82, CircuitScriptParser.RULE_create_module_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 498;
            this.match(CircuitScriptParser.Module);
            this.state = 499;
            this.match(CircuitScriptParser.Colon);
            this.state = 500;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 501;
            this.match(CircuitScriptParser.INDENT);
            this.state = 505;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 505;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 51, this.context) ) {
                case 1:
                    {
                    this.state = 502;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case 2:
                    {
                    this.state = 503;
                    this.property_expr();
                    }
                    break;
                case 3:
                    {
                    this.state = 504;
                    this.property_block_expr();
                    }
                    break;
                }
                }
                this.state = 507;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 12545) !== 0));
            this.state = 509;
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
        this.enterRule(localContext, 84, CircuitScriptParser.RULE_nested_properties_inner);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            {
            this.state = 511;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 512;
            this.match(CircuitScriptParser.INDENT);
            this.state = 515;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 515;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.NEWLINE:
                    {
                    this.state = 513;
                    this.match(CircuitScriptParser.NEWLINE);
                    }
                    break;
                case CircuitScriptParser.INTEGER_VALUE:
                case CircuitScriptParser.STRING_VALUE:
                case CircuitScriptParser.ID:
                    {
                    this.state = 514;
                    this.property_expr();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 517;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 12545) !== 0));
            this.state = 519;
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
        this.enterRule(localContext, 86, CircuitScriptParser.RULE_graphic_expr);
        let _la: number;
        try {
            this.state = 545;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.For:
                localContext = new GraphicForExprContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 521;
                this.match(CircuitScriptParser.For);
                this.state = 522;
                this.match(CircuitScriptParser.ID);
                this.state = 527;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 32) {
                    {
                    {
                    this.state = 523;
                    this.match(CircuitScriptParser.Comma);
                    this.state = 524;
                    this.match(CircuitScriptParser.ID);
                    }
                    }
                    this.state = 529;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 530;
                this.match(CircuitScriptParser.In);
                this.state = 531;
                this.data_expr(0);
                this.state = 532;
                this.match(CircuitScriptParser.Colon);
                this.state = 533;
                this.graphic_expressions_block();
                }
                break;
            case CircuitScriptParser.Pin:
            case CircuitScriptParser.ID:
                localContext = new GraphicCommandExprContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 535;
                (localContext as GraphicCommandExprContext)._command = this.tokenStream.LT(1);
                _la = this.tokenStream.LA(1);
                if(!(_la === 10 || _la === 69)) {
                    (localContext as GraphicCommandExprContext)._command = this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 536;
                this.match(CircuitScriptParser.Colon);
                this.state = 543;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 56, this.context) ) {
                case 1:
                    {
                    this.state = 537;
                    this.parameters();
                    }
                    break;
                case 2:
                    {
                    this.state = 538;
                    this.match(CircuitScriptParser.LParen);
                    this.state = 539;
                    this.parameters();
                    this.state = 540;
                    this.match(CircuitScriptParser.RParen);
                    }
                    break;
                case 3:
                    {
                    this.state = 542;
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
        this.enterRule(localContext, 88, CircuitScriptParser.RULE_property_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 547;
            this.property_key_expr();
            this.state = 551;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 68) {
                {
                {
                this.state = 548;
                localContext._extra = this.match(CircuitScriptParser.STRING_VALUE);
                }
                }
                this.state = 553;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 554;
            this.match(CircuitScriptParser.Colon);
            this.state = 555;
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
            this.state = 557;
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
        this.enterRule(localContext, 92, CircuitScriptParser.RULE_property_value_expr);
        let _la: number;
        try {
            this.state = 568;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.NEWLINE:
                localContext = new Nested_propertiesContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 559;
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
                this.state = 560;
                this.data_expr(0);
                this.state = 565;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 32) {
                    {
                    {
                    this.state = 561;
                    this.match(CircuitScriptParser.Comma);
                    this.state = 562;
                    this.data_expr(0);
                    }
                    }
                    this.state = 567;
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
        this.enterRule(localContext, 94, CircuitScriptParser.RULE_wire_atom_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 570;
            this.match(CircuitScriptParser.ID);
            this.state = 572;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 61, this.context) ) {
            case 1:
                {
                this.state = 571;
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
        this.enterRule(localContext, 96, CircuitScriptParser.RULE_wire_expr);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 574;
            this.match(CircuitScriptParser.Wire);
            this.state = 578;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 62, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 575;
                    this.wire_atom_expr();
                    }
                    }
                }
                this.state = 580;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 62, this.context);
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
        this.enterRule(localContext, 98, CircuitScriptParser.RULE_point_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 581;
            this.match(CircuitScriptParser.Point);
            this.state = 584;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 63, this.context) ) {
            case 1:
                {
                this.state = 582;
                this.match(CircuitScriptParser.ID);
                }
                break;
            case 2:
                {
                this.state = 583;
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
        this.enterRule(localContext, 100, CircuitScriptParser.RULE_import_expr);
        let _la: number;
        try {
            this.state = 608;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.Import:
                localContext = new Import_simpleContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 586;
                this.match(CircuitScriptParser.Import);
                this.state = 587;
                (localContext as Import_simpleContext)._libraryName = this.match(CircuitScriptParser.ID);
                this.state = 589;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 64, this.context) ) {
                case 1:
                    {
                    this.state = 588;
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
                this.state = 591;
                this.match(CircuitScriptParser.From);
                this.state = 592;
                (localContext as Import_specific_or_allContext)._libraryName = this.match(CircuitScriptParser.ID);
                this.state = 593;
                this.match(CircuitScriptParser.Import);
                this.state = 603;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case CircuitScriptParser.Multiply:
                    {
                    this.state = 594;
                    (localContext as Import_specific_or_allContext)._all = this.match(CircuitScriptParser.Multiply);
                    }
                    break;
                case CircuitScriptParser.ID:
                    {
                    {
                    this.state = 595;
                    (localContext as Import_specific_or_allContext)._ID = this.match(CircuitScriptParser.ID);
                    (localContext as Import_specific_or_allContext)._funcNames.push((localContext as Import_specific_or_allContext)._ID!);
                    this.state = 600;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 32) {
                        {
                        {
                        this.state = 596;
                        this.match(CircuitScriptParser.Comma);
                        this.state = 597;
                        (localContext as Import_specific_or_allContext)._ID = this.match(CircuitScriptParser.ID);
                        (localContext as Import_specific_or_allContext)._funcNames.push((localContext as Import_specific_or_allContext)._ID!);
                        }
                        }
                        this.state = 602;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 606;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 67, this.context) ) {
                case 1:
                    {
                    this.state = 605;
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
        this.enterRule(localContext, 102, CircuitScriptParser.RULE_import_annotation_expr);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 610;
            this.match(CircuitScriptParser.ANNOTATION_START);
            this.state = 614;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 69, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 611;
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
                this.state = 616;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 69, this.context);
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
        this.enterRule(localContext, 104, CircuitScriptParser.RULE_frame_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 617;
            _la = this.tokenStream.LA(1);
            if(!(_la === 28 || _la === 29)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 618;
            this.match(CircuitScriptParser.Colon);
            this.state = 619;
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
        this.enterRule(localContext, 106, CircuitScriptParser.RULE_if_expr);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 621;
            this.match(CircuitScriptParser.If);
            this.state = 622;
            this.data_expr(0);
            this.state = 623;
            this.match(CircuitScriptParser.Colon);
            this.state = 624;
            this.expressions_block();
            this.state = 628;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 70, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 625;
                    this.if_inner_expr();
                    }
                    }
                }
                this.state = 630;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 70, this.context);
            }
            this.state = 632;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 26) {
                {
                this.state = 631;
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
        this.enterRule(localContext, 108, CircuitScriptParser.RULE_if_inner_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 634;
            this.match(CircuitScriptParser.Else);
            this.state = 635;
            this.match(CircuitScriptParser.If);
            this.state = 636;
            this.data_expr(0);
            this.state = 637;
            this.match(CircuitScriptParser.Colon);
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
    public else_expr(): Else_exprContext {
        let localContext = new Else_exprContext(this.context, this.state);
        this.enterRule(localContext, 110, CircuitScriptParser.RULE_else_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 640;
            this.match(CircuitScriptParser.Else);
            this.state = 641;
            this.match(CircuitScriptParser.Colon);
            this.state = 642;
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
        this.enterRule(localContext, 112, CircuitScriptParser.RULE_while_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 644;
            this.match(CircuitScriptParser.While);
            this.state = 645;
            this.data_expr(0);
            this.state = 646;
            this.match(CircuitScriptParser.Colon);
            this.state = 647;
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
        this.enterRule(localContext, 114, CircuitScriptParser.RULE_for_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 649;
            this.match(CircuitScriptParser.For);
            this.state = 650;
            this.match(CircuitScriptParser.ID);
            this.state = 655;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 32) {
                {
                {
                this.state = 651;
                this.match(CircuitScriptParser.Comma);
                this.state = 652;
                this.match(CircuitScriptParser.ID);
                }
                }
                this.state = 657;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 658;
            this.match(CircuitScriptParser.In);
            this.state = 659;
            this.data_expr(0);
            this.state = 660;
            this.match(CircuitScriptParser.Colon);
            this.state = 661;
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
        this.enterRule(localContext, 116, CircuitScriptParser.RULE_part_set_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 663;
            this.match(CircuitScriptParser.Set);
            this.state = 664;
            this.match(CircuitScriptParser.Colon);
            this.state = 665;
            this.data_expr(0);
            this.state = 670;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 32) {
                {
                {
                this.state = 666;
                this.match(CircuitScriptParser.Comma);
                this.state = 667;
                this.data_expr(0);
                }
                }
                this.state = 672;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 673;
            this.match(CircuitScriptParser.Colon);
            this.state = 674;
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
        this.enterRule(localContext, 118, CircuitScriptParser.RULE_part_set_key);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 676;
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
        this.enterRule(localContext, 120, CircuitScriptParser.RULE_part_match_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 678;
            this.match(CircuitScriptParser.NEWLINE);
            this.state = 679;
            this.match(CircuitScriptParser.INDENT);
            this.state = 681;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 680;
                this.part_sub_expr();
                }
                }
                this.state = 683;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 15617) !== 0));
            this.state = 685;
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
        this.enterRule(localContext, 122, CircuitScriptParser.RULE_part_sub_expr);
        try {
            this.state = 691;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 75, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 687;
                this.part_condition_expr();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 688;
                this.part_value_expr();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 689;
                this.part_condition_key_only_expr();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 690;
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
        this.enterRule(localContext, 124, CircuitScriptParser.RULE_part_condition_expr);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 693;
            localContext._part_set_key = this.part_set_key();
            localContext._key_id.push(localContext._part_set_key!);
            this.state = 694;
            this.match(CircuitScriptParser.Colon);
            this.state = 695;
            localContext._data_expr = this.data_expr(0);
            localContext._values.push(localContext._data_expr!);
            this.state = 703;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 76, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 696;
                    this.match(CircuitScriptParser.Comma);
                    this.state = 697;
                    localContext._part_set_key = this.part_set_key();
                    localContext._key_id.push(localContext._part_set_key!);
                    this.state = 698;
                    this.match(CircuitScriptParser.Colon);
                    this.state = 699;
                    localContext._data_expr = this.data_expr(0);
                    localContext._values.push(localContext._data_expr!);
                    }
                    }
                }
                this.state = 705;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 76, this.context);
            }
            this.state = 710;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 32) {
                {
                {
                this.state = 706;
                this.match(CircuitScriptParser.Comma);
                this.state = 707;
                localContext._id_only = this.part_set_key();
                }
                }
                this.state = 712;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 713;
            this.match(CircuitScriptParser.Colon);
            this.state = 723;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CircuitScriptParser.NEWLINE:
                {
                this.state = 714;
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
                this.state = 715;
                localContext._data_expr = this.data_expr(0);
                localContext._last_data.push(localContext._data_expr!);
                this.state = 720;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 32) {
                    {
                    {
                    this.state = 716;
                    this.match(CircuitScriptParser.Comma);
                    this.state = 717;
                    localContext._data_expr = this.data_expr(0);
                    localContext._last_data.push(localContext._data_expr!);
                    }
                    }
                    this.state = 722;
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
        this.enterRule(localContext, 126, CircuitScriptParser.RULE_part_condition_key_only_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 725;
            this.part_set_key();
            this.state = 726;
            this.match(CircuitScriptParser.Colon);
            this.state = 727;
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
        this.enterRule(localContext, 128, CircuitScriptParser.RULE_part_value_expr);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 729;
            this.part_set_key();
            this.state = 730;
            this.match(CircuitScriptParser.Colon);
            this.state = 731;
            this.data_expr(0);
            this.state = 736;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 32) {
                {
                {
                this.state = 732;
                this.match(CircuitScriptParser.Comma);
                this.state = 733;
                this.data_expr(0);
                }
                }
                this.state = 738;
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
        this.enterRule(localContext, 130, CircuitScriptParser.RULE_annotation_comment_expr);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 739;
            this.match(CircuitScriptParser.ANNOTATION_START);
            this.state = 740;
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
        case 25:
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
        4,1,69,743,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,
        7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,
        2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,33,
        7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,39,
        2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,46,
        7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,52,
        2,53,7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,59,
        7,59,2,60,7,60,2,61,7,61,2,62,7,62,2,63,7,63,2,64,7,64,2,65,7,65,
        1,0,1,0,5,0,135,8,0,10,0,12,0,138,9,0,1,0,5,0,141,8,0,10,0,12,0,
        144,9,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        3,1,160,8,1,1,2,1,2,1,2,1,2,1,2,3,2,167,8,2,1,3,1,3,1,3,1,3,1,3,
        1,3,1,3,3,3,176,8,3,1,4,1,4,1,4,4,4,181,8,4,11,4,12,4,182,1,4,1,
        4,1,5,1,5,1,5,1,5,1,6,1,6,1,6,1,7,1,7,1,7,1,7,1,8,1,8,3,8,200,8,
        8,1,8,5,8,203,8,8,10,8,12,8,206,9,8,1,8,3,8,209,8,8,1,9,1,9,1,9,
        1,10,1,10,1,10,3,10,217,8,10,1,11,1,11,1,12,1,12,1,12,1,13,1,13,
        1,13,1,13,5,13,228,8,13,10,13,12,13,231,9,13,1,14,1,14,1,14,1,14,
        1,14,4,14,238,8,14,11,14,12,14,239,1,14,1,14,1,15,1,15,3,15,246,
        8,15,1,16,1,16,1,16,5,16,251,8,16,10,16,12,16,254,9,16,1,17,1,17,
        1,17,1,17,3,17,260,8,17,1,18,1,18,3,18,264,8,18,1,19,1,19,1,20,1,
        20,3,20,270,8,20,1,20,1,20,1,20,1,21,1,21,1,21,1,21,1,22,1,22,1,
        22,1,22,1,23,1,23,1,23,5,23,286,8,23,10,23,12,23,289,9,23,1,23,1,
        23,5,23,293,8,23,10,23,12,23,296,9,23,1,23,1,23,1,23,5,23,301,8,
        23,10,23,12,23,304,9,23,3,23,306,8,23,1,24,1,24,1,24,1,24,1,24,1,
        25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,5,
        25,326,8,25,10,25,12,25,329,9,25,5,25,331,8,25,10,25,12,25,334,9,
        25,1,25,1,25,1,25,1,25,3,25,340,8,25,1,25,1,25,1,25,1,25,1,25,1,
        25,1,25,1,25,1,25,1,25,1,25,1,25,5,25,354,8,25,10,25,12,25,357,9,
        25,1,26,3,26,360,8,26,1,26,1,26,1,27,1,27,1,27,1,27,3,27,368,8,27,
        1,27,1,27,1,27,1,27,1,27,1,27,4,27,376,8,27,11,27,12,27,377,1,27,
        1,27,1,28,1,28,3,28,384,8,28,1,29,1,29,1,29,5,29,389,8,29,10,29,
        12,29,392,9,29,1,29,1,29,1,29,1,29,5,29,398,8,29,10,29,12,29,401,
        9,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,5,29,410,8,29,10,29,12,29,
        413,9,29,3,29,415,8,29,1,30,1,30,5,30,419,8,30,10,30,12,30,422,9,
        30,1,31,1,31,3,31,426,8,31,1,31,1,31,3,31,430,8,31,1,32,1,32,1,32,
        1,32,1,32,1,32,3,32,438,8,32,1,33,3,33,441,8,33,1,33,1,33,4,33,445,
        8,33,11,33,12,33,446,1,34,3,34,450,8,34,1,34,1,34,3,34,454,8,34,
        1,35,1,35,1,35,1,36,1,36,1,36,1,36,1,37,1,37,1,37,1,37,4,37,467,
        8,37,11,37,12,37,468,1,37,1,37,1,38,1,38,1,38,3,38,476,8,38,1,39,
        1,39,1,39,1,39,1,39,1,39,4,39,484,8,39,11,39,12,39,485,1,39,1,39,
        1,40,1,40,1,40,1,40,3,40,494,8,40,1,40,1,40,1,40,1,41,1,41,1,41,
        1,41,1,41,1,41,1,41,4,41,506,8,41,11,41,12,41,507,1,41,1,41,1,42,
        1,42,1,42,1,42,4,42,516,8,42,11,42,12,42,517,1,42,1,42,1,43,1,43,
        1,43,1,43,5,43,526,8,43,10,43,12,43,529,9,43,1,43,1,43,1,43,1,43,
        1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,3,43,544,8,43,3,43,
        546,8,43,1,44,1,44,5,44,550,8,44,10,44,12,44,553,9,44,1,44,1,44,
        1,44,1,45,1,45,1,46,1,46,1,46,1,46,5,46,564,8,46,10,46,12,46,567,
        9,46,3,46,569,8,46,1,47,1,47,3,47,573,8,47,1,48,1,48,5,48,577,8,
        48,10,48,12,48,580,9,48,1,49,1,49,1,49,3,49,585,8,49,1,50,1,50,1,
        50,3,50,590,8,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,5,50,599,8,50,
        10,50,12,50,602,9,50,3,50,604,8,50,1,50,3,50,607,8,50,3,50,609,8,
        50,1,51,1,51,5,51,613,8,51,10,51,12,51,616,9,51,1,52,1,52,1,52,1,
        52,1,53,1,53,1,53,1,53,1,53,5,53,627,8,53,10,53,12,53,630,9,53,1,
        53,3,53,633,8,53,1,54,1,54,1,54,1,54,1,54,1,54,1,55,1,55,1,55,1,
        55,1,56,1,56,1,56,1,56,1,56,1,57,1,57,1,57,1,57,5,57,654,8,57,10,
        57,12,57,657,9,57,1,57,1,57,1,57,1,57,1,57,1,58,1,58,1,58,1,58,1,
        58,5,58,669,8,58,10,58,12,58,672,9,58,1,58,1,58,1,58,1,59,1,59,1,
        60,1,60,1,60,4,60,682,8,60,11,60,12,60,683,1,60,1,60,1,61,1,61,1,
        61,1,61,3,61,692,8,61,1,62,1,62,1,62,1,62,1,62,1,62,1,62,1,62,5,
        62,702,8,62,10,62,12,62,705,9,62,1,62,1,62,5,62,709,8,62,10,62,12,
        62,712,9,62,1,62,1,62,1,62,1,62,1,62,5,62,719,8,62,10,62,12,62,722,
        9,62,3,62,724,8,62,1,63,1,63,1,63,1,63,1,64,1,64,1,64,1,64,1,64,
        5,64,735,8,64,10,64,12,64,738,9,64,1,65,1,65,1,65,1,65,0,1,50,66,
        0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,
        46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,
        90,92,94,96,98,100,102,104,106,108,110,112,114,116,118,120,122,124,
        126,128,130,0,14,2,0,4,4,14,16,2,0,64,64,68,68,1,0,51,55,2,0,27,
        27,47,47,1,0,48,50,1,0,46,47,1,0,38,43,1,0,44,45,2,0,62,62,64,68,
        2,0,10,10,69,69,2,0,64,64,68,69,2,0,47,47,69,69,1,0,28,29,2,0,64,
        64,66,69,788,0,136,1,0,0,0,2,159,1,0,0,0,4,166,1,0,0,0,6,175,1,0,
        0,0,8,177,1,0,0,0,10,186,1,0,0,0,12,190,1,0,0,0,14,193,1,0,0,0,16,
        199,1,0,0,0,18,210,1,0,0,0,20,216,1,0,0,0,22,218,1,0,0,0,24,220,
        1,0,0,0,26,223,1,0,0,0,28,232,1,0,0,0,30,245,1,0,0,0,32,247,1,0,
        0,0,34,255,1,0,0,0,36,263,1,0,0,0,38,265,1,0,0,0,40,269,1,0,0,0,
        42,274,1,0,0,0,44,278,1,0,0,0,46,305,1,0,0,0,48,307,1,0,0,0,50,339,
        1,0,0,0,52,359,1,0,0,0,54,363,1,0,0,0,56,383,1,0,0,0,58,414,1,0,
        0,0,60,416,1,0,0,0,62,429,1,0,0,0,64,437,1,0,0,0,66,440,1,0,0,0,
        68,449,1,0,0,0,70,455,1,0,0,0,72,458,1,0,0,0,74,462,1,0,0,0,76,475,
        1,0,0,0,78,477,1,0,0,0,80,489,1,0,0,0,82,498,1,0,0,0,84,511,1,0,
        0,0,86,545,1,0,0,0,88,547,1,0,0,0,90,557,1,0,0,0,92,568,1,0,0,0,
        94,570,1,0,0,0,96,574,1,0,0,0,98,581,1,0,0,0,100,608,1,0,0,0,102,
        610,1,0,0,0,104,617,1,0,0,0,106,621,1,0,0,0,108,634,1,0,0,0,110,
        640,1,0,0,0,112,644,1,0,0,0,114,649,1,0,0,0,116,663,1,0,0,0,118,
        676,1,0,0,0,120,678,1,0,0,0,122,691,1,0,0,0,124,693,1,0,0,0,126,
        725,1,0,0,0,128,729,1,0,0,0,130,739,1,0,0,0,132,135,3,100,50,0,133,
        135,5,56,0,0,134,132,1,0,0,0,134,133,1,0,0,0,135,138,1,0,0,0,136,
        134,1,0,0,0,136,137,1,0,0,0,137,142,1,0,0,0,138,136,1,0,0,0,139,
        141,3,2,1,0,140,139,1,0,0,0,141,144,1,0,0,0,142,140,1,0,0,0,142,
        143,1,0,0,0,143,145,1,0,0,0,144,142,1,0,0,0,145,146,5,0,0,1,146,
        1,1,0,0,0,147,160,3,4,2,0,148,160,3,6,3,0,149,160,3,54,27,0,150,
        160,3,104,52,0,151,160,3,116,58,0,152,160,3,130,65,0,153,160,3,48,
        24,0,154,160,3,40,20,0,155,160,3,42,21,0,156,160,3,60,30,0,157,160,
        3,66,33,0,158,160,5,56,0,0,159,147,1,0,0,0,159,148,1,0,0,0,159,149,
        1,0,0,0,159,150,1,0,0,0,159,151,1,0,0,0,159,152,1,0,0,0,159,153,
        1,0,0,0,159,154,1,0,0,0,159,155,1,0,0,0,159,156,1,0,0,0,159,157,
        1,0,0,0,159,158,1,0,0,0,160,3,1,0,0,0,161,167,3,106,53,0,162,167,
        3,112,56,0,163,167,3,114,57,0,164,167,5,3,0,0,165,167,5,24,0,0,166,
        161,1,0,0,0,166,162,1,0,0,0,166,163,1,0,0,0,166,164,1,0,0,0,166,
        165,1,0,0,0,167,5,1,0,0,0,168,176,3,18,9,0,169,176,3,26,13,0,170,
        176,3,24,12,0,171,176,3,28,14,0,172,176,3,96,48,0,173,176,3,98,49,
        0,174,176,3,10,5,0,175,168,1,0,0,0,175,169,1,0,0,0,175,170,1,0,0,
        0,175,171,1,0,0,0,175,172,1,0,0,0,175,173,1,0,0,0,175,174,1,0,0,
        0,176,7,1,0,0,0,177,178,5,56,0,0,178,180,5,1,0,0,179,181,3,2,1,0,
        180,179,1,0,0,0,181,182,1,0,0,0,182,180,1,0,0,0,182,183,1,0,0,0,
        183,184,1,0,0,0,184,185,5,2,0,0,185,9,1,0,0,0,186,187,7,0,0,0,187,
        188,5,31,0,0,188,189,3,8,4,0,189,11,1,0,0,0,190,191,5,10,0,0,191,
        192,3,50,25,0,192,13,1,0,0,0,193,194,5,69,0,0,194,195,5,31,0,0,195,
        196,3,50,25,0,196,15,1,0,0,0,197,200,3,50,25,0,198,200,3,40,20,0,
        199,197,1,0,0,0,199,198,1,0,0,0,200,204,1,0,0,0,201,203,3,14,7,0,
        202,201,1,0,0,0,203,206,1,0,0,0,204,202,1,0,0,0,204,205,1,0,0,0,
        205,208,1,0,0,0,206,204,1,0,0,0,207,209,3,12,6,0,208,207,1,0,0,0,
        208,209,1,0,0,0,209,17,1,0,0,0,210,211,5,11,0,0,211,212,3,16,8,0,
        212,19,1,0,0,0,213,217,3,16,8,0,214,217,3,12,6,0,215,217,5,14,0,
        0,216,213,1,0,0,0,216,214,1,0,0,0,216,215,1,0,0,0,217,21,1,0,0,0,
        218,219,7,1,0,0,219,23,1,0,0,0,220,221,5,12,0,0,221,222,3,20,10,
        0,222,25,1,0,0,0,223,224,5,13,0,0,224,229,3,20,10,0,225,226,5,32,
        0,0,226,228,3,20,10,0,227,225,1,0,0,0,228,231,1,0,0,0,229,227,1,
        0,0,0,229,230,1,0,0,0,230,27,1,0,0,0,231,229,1,0,0,0,232,233,3,32,
        16,0,233,234,5,56,0,0,234,237,5,1,0,0,235,238,5,56,0,0,236,238,3,
        30,15,0,237,235,1,0,0,0,237,236,1,0,0,0,238,239,1,0,0,0,239,237,
        1,0,0,0,239,240,1,0,0,0,240,241,1,0,0,0,241,242,5,2,0,0,242,29,1,
        0,0,0,243,246,3,2,1,0,244,246,3,34,17,0,245,243,1,0,0,0,245,244,
        1,0,0,0,246,31,1,0,0,0,247,248,3,24,12,0,248,252,5,31,0,0,249,251,
        3,130,65,0,250,249,1,0,0,0,251,254,1,0,0,0,252,250,1,0,0,0,252,253,
        1,0,0,0,253,33,1,0,0,0,254,252,1,0,0,0,255,256,3,22,11,0,256,259,
        5,31,0,0,257,260,3,36,18,0,258,260,3,38,19,0,259,257,1,0,0,0,259,
        258,1,0,0,0,260,35,1,0,0,0,261,264,3,2,1,0,262,264,5,61,0,0,263,
        261,1,0,0,0,263,262,1,0,0,0,264,37,1,0,0,0,265,266,3,8,4,0,266,39,
        1,0,0,0,267,270,3,60,30,0,268,270,3,66,33,0,269,267,1,0,0,0,269,
        268,1,0,0,0,270,271,1,0,0,0,271,272,5,37,0,0,272,273,3,50,25,0,273,
        41,1,0,0,0,274,275,3,60,30,0,275,276,7,2,0,0,276,277,3,50,25,0,277,
        43,1,0,0,0,278,279,5,69,0,0,279,280,5,37,0,0,280,281,3,50,25,0,281,
        45,1,0,0,0,282,287,3,50,25,0,283,284,5,32,0,0,284,286,3,50,25,0,
        285,283,1,0,0,0,286,289,1,0,0,0,287,285,1,0,0,0,287,288,1,0,0,0,
        288,294,1,0,0,0,289,287,1,0,0,0,290,291,5,32,0,0,291,293,3,44,22,
        0,292,290,1,0,0,0,293,296,1,0,0,0,294,292,1,0,0,0,294,295,1,0,0,
        0,295,306,1,0,0,0,296,294,1,0,0,0,297,302,3,44,22,0,298,299,5,32,
        0,0,299,301,3,44,22,0,300,298,1,0,0,0,301,304,1,0,0,0,302,300,1,
        0,0,0,302,303,1,0,0,0,303,306,1,0,0,0,304,302,1,0,0,0,305,282,1,
        0,0,0,305,297,1,0,0,0,306,47,1,0,0,0,307,308,5,34,0,0,308,309,5,
        69,0,0,309,310,5,37,0,0,310,311,3,50,25,0,311,49,1,0,0,0,312,313,
        6,25,-1,0,313,314,5,59,0,0,314,315,3,50,25,0,315,316,5,60,0,0,316,
        340,1,0,0,0,317,318,5,5,0,0,318,340,3,76,38,0,319,320,7,3,0,0,320,
        340,3,50,25,9,321,332,5,35,0,0,322,327,3,50,25,0,323,324,5,32,0,
        0,324,326,3,50,25,0,325,323,1,0,0,0,326,329,1,0,0,0,327,325,1,0,
        0,0,327,328,1,0,0,0,328,331,1,0,0,0,329,327,1,0,0,0,330,322,1,0,
        0,0,331,334,1,0,0,0,332,330,1,0,0,0,332,333,1,0,0,0,333,335,1,0,
        0,0,334,332,1,0,0,0,335,340,5,36,0,0,336,340,3,60,30,0,337,340,3,
        66,33,0,338,340,3,52,26,0,339,312,1,0,0,0,339,317,1,0,0,0,339,319,
        1,0,0,0,339,321,1,0,0,0,339,336,1,0,0,0,339,337,1,0,0,0,339,338,
        1,0,0,0,340,355,1,0,0,0,341,342,10,7,0,0,342,343,7,4,0,0,343,354,
        3,50,25,8,344,345,10,6,0,0,345,346,7,5,0,0,346,354,3,50,25,7,347,
        348,10,5,0,0,348,349,7,6,0,0,349,354,3,50,25,6,350,351,10,4,0,0,
        351,352,7,7,0,0,352,354,3,50,25,5,353,341,1,0,0,0,353,344,1,0,0,
        0,353,347,1,0,0,0,353,350,1,0,0,0,354,357,1,0,0,0,355,353,1,0,0,
        0,355,356,1,0,0,0,356,51,1,0,0,0,357,355,1,0,0,0,358,360,5,47,0,
        0,359,358,1,0,0,0,359,360,1,0,0,0,360,361,1,0,0,0,361,362,7,8,0,
        0,362,53,1,0,0,0,363,364,5,18,0,0,364,365,5,69,0,0,365,367,5,59,
        0,0,366,368,3,58,29,0,367,366,1,0,0,0,367,368,1,0,0,0,368,369,1,
        0,0,0,369,370,5,60,0,0,370,371,5,31,0,0,371,372,5,56,0,0,372,375,
        5,1,0,0,373,376,5,56,0,0,374,376,3,56,28,0,375,373,1,0,0,0,375,374,
        1,0,0,0,376,377,1,0,0,0,377,375,1,0,0,0,377,378,1,0,0,0,378,379,
        1,0,0,0,379,380,5,2,0,0,380,55,1,0,0,0,381,384,3,2,1,0,382,384,3,
        70,35,0,383,381,1,0,0,0,383,382,1,0,0,0,384,57,1,0,0,0,385,390,5,
        69,0,0,386,387,5,32,0,0,387,389,5,69,0,0,388,386,1,0,0,0,389,392,
        1,0,0,0,390,388,1,0,0,0,390,391,1,0,0,0,391,399,1,0,0,0,392,390,
        1,0,0,0,393,394,5,32,0,0,394,395,5,69,0,0,395,396,5,37,0,0,396,398,
        3,52,26,0,397,393,1,0,0,0,398,401,1,0,0,0,399,397,1,0,0,0,399,400,
        1,0,0,0,400,415,1,0,0,0,401,399,1,0,0,0,402,403,5,69,0,0,403,404,
        5,37,0,0,404,411,3,52,26,0,405,406,5,32,0,0,406,407,5,69,0,0,407,
        408,5,37,0,0,408,410,3,52,26,0,409,405,1,0,0,0,410,413,1,0,0,0,411,
        409,1,0,0,0,411,412,1,0,0,0,412,415,1,0,0,0,413,411,1,0,0,0,414,
        385,1,0,0,0,414,402,1,0,0,0,415,59,1,0,0,0,416,420,5,69,0,0,417,
        419,3,64,32,0,418,417,1,0,0,0,419,422,1,0,0,0,420,418,1,0,0,0,420,
        421,1,0,0,0,421,61,1,0,0,0,422,420,1,0,0,0,423,425,5,59,0,0,424,
        426,3,46,23,0,425,424,1,0,0,0,425,426,1,0,0,0,426,427,1,0,0,0,427,
        430,5,60,0,0,428,430,3,64,32,0,429,423,1,0,0,0,429,428,1,0,0,0,430,
        63,1,0,0,0,431,432,5,33,0,0,432,438,5,69,0,0,433,434,5,35,0,0,434,
        435,3,50,25,0,435,436,5,36,0,0,436,438,1,0,0,0,437,431,1,0,0,0,437,
        433,1,0,0,0,438,65,1,0,0,0,439,441,3,68,34,0,440,439,1,0,0,0,440,
        441,1,0,0,0,441,442,1,0,0,0,442,444,5,69,0,0,443,445,3,62,31,0,444,
        443,1,0,0,0,445,446,1,0,0,0,446,444,1,0,0,0,446,447,1,0,0,0,447,
        67,1,0,0,0,448,450,5,46,0,0,449,448,1,0,0,0,449,450,1,0,0,0,450,
        451,1,0,0,0,451,453,5,48,0,0,452,454,3,50,25,0,453,452,1,0,0,0,453,
        454,1,0,0,0,454,69,1,0,0,0,455,456,5,17,0,0,456,457,3,50,25,0,457,
        71,1,0,0,0,458,459,3,90,45,0,459,460,5,31,0,0,460,461,3,8,4,0,461,
        73,1,0,0,0,462,463,5,56,0,0,463,466,5,1,0,0,464,467,5,56,0,0,465,
        467,3,86,43,0,466,464,1,0,0,0,466,465,1,0,0,0,467,468,1,0,0,0,468,
        466,1,0,0,0,468,469,1,0,0,0,469,470,1,0,0,0,470,471,5,2,0,0,471,
        75,1,0,0,0,472,476,3,78,39,0,473,476,3,80,40,0,474,476,3,82,41,0,
        475,472,1,0,0,0,475,473,1,0,0,0,475,474,1,0,0,0,476,77,1,0,0,0,477,
        478,5,6,0,0,478,479,5,31,0,0,479,480,5,56,0,0,480,483,5,1,0,0,481,
        484,5,56,0,0,482,484,3,88,44,0,483,481,1,0,0,0,483,482,1,0,0,0,484,
        485,1,0,0,0,485,483,1,0,0,0,485,486,1,0,0,0,486,487,1,0,0,0,487,
        488,5,2,0,0,488,79,1,0,0,0,489,493,5,7,0,0,490,491,5,59,0,0,491,
        492,5,69,0,0,492,494,5,60,0,0,493,490,1,0,0,0,493,494,1,0,0,0,494,
        495,1,0,0,0,495,496,5,31,0,0,496,497,3,74,37,0,497,81,1,0,0,0,498,
        499,5,8,0,0,499,500,5,31,0,0,500,501,5,56,0,0,501,505,5,1,0,0,502,
        506,5,56,0,0,503,506,3,88,44,0,504,506,3,72,36,0,505,502,1,0,0,0,
        505,503,1,0,0,0,505,504,1,0,0,0,506,507,1,0,0,0,507,505,1,0,0,0,
        507,508,1,0,0,0,508,509,1,0,0,0,509,510,5,2,0,0,510,83,1,0,0,0,511,
        512,5,56,0,0,512,515,5,1,0,0,513,516,5,56,0,0,514,516,3,88,44,0,
        515,513,1,0,0,0,515,514,1,0,0,0,516,517,1,0,0,0,517,515,1,0,0,0,
        517,518,1,0,0,0,518,519,1,0,0,0,519,520,5,2,0,0,520,85,1,0,0,0,521,
        522,5,21,0,0,522,527,5,69,0,0,523,524,5,32,0,0,524,526,5,69,0,0,
        525,523,1,0,0,0,526,529,1,0,0,0,527,525,1,0,0,0,527,528,1,0,0,0,
        528,530,1,0,0,0,529,527,1,0,0,0,530,531,5,22,0,0,531,532,3,50,25,
        0,532,533,5,31,0,0,533,534,3,74,37,0,534,546,1,0,0,0,535,536,7,9,
        0,0,536,543,5,31,0,0,537,544,3,46,23,0,538,539,5,59,0,0,539,540,
        3,46,23,0,540,541,5,60,0,0,541,544,1,0,0,0,542,544,3,84,42,0,543,
        537,1,0,0,0,543,538,1,0,0,0,543,542,1,0,0,0,544,546,1,0,0,0,545,
        521,1,0,0,0,545,535,1,0,0,0,546,87,1,0,0,0,547,551,3,90,45,0,548,
        550,5,68,0,0,549,548,1,0,0,0,550,553,1,0,0,0,551,549,1,0,0,0,551,
        552,1,0,0,0,552,554,1,0,0,0,553,551,1,0,0,0,554,555,5,31,0,0,555,
        556,3,92,46,0,556,89,1,0,0,0,557,558,7,10,0,0,558,91,1,0,0,0,559,
        569,3,84,42,0,560,565,3,50,25,0,561,562,5,32,0,0,562,564,3,50,25,
        0,563,561,1,0,0,0,564,567,1,0,0,0,565,563,1,0,0,0,565,566,1,0,0,
        0,566,569,1,0,0,0,567,565,1,0,0,0,568,559,1,0,0,0,568,560,1,0,0,
        0,569,93,1,0,0,0,570,572,5,69,0,0,571,573,3,50,25,0,572,571,1,0,
        0,0,572,573,1,0,0,0,573,95,1,0,0,0,574,578,5,9,0,0,575,577,3,94,
        47,0,576,575,1,0,0,0,577,580,1,0,0,0,578,576,1,0,0,0,578,579,1,0,
        0,0,579,97,1,0,0,0,580,578,1,0,0,0,581,584,5,14,0,0,582,585,5,69,
        0,0,583,585,3,50,25,0,584,582,1,0,0,0,584,583,1,0,0,0,585,99,1,0,
        0,0,586,587,5,19,0,0,587,589,5,69,0,0,588,590,3,102,51,0,589,588,
        1,0,0,0,589,590,1,0,0,0,590,609,1,0,0,0,591,592,5,20,0,0,592,593,
        5,69,0,0,593,603,5,19,0,0,594,604,5,49,0,0,595,600,5,69,0,0,596,
        597,5,32,0,0,597,599,5,69,0,0,598,596,1,0,0,0,599,602,1,0,0,0,600,
        598,1,0,0,0,600,601,1,0,0,0,601,604,1,0,0,0,602,600,1,0,0,0,603,
        594,1,0,0,0,603,595,1,0,0,0,604,606,1,0,0,0,605,607,3,102,51,0,606,
        605,1,0,0,0,606,607,1,0,0,0,607,609,1,0,0,0,608,586,1,0,0,0,608,
        591,1,0,0,0,609,101,1,0,0,0,610,614,5,63,0,0,611,613,7,11,0,0,612,
        611,1,0,0,0,613,616,1,0,0,0,614,612,1,0,0,0,614,615,1,0,0,0,615,
        103,1,0,0,0,616,614,1,0,0,0,617,618,7,12,0,0,618,619,5,31,0,0,619,
        620,3,8,4,0,620,105,1,0,0,0,621,622,5,25,0,0,622,623,3,50,25,0,623,
        624,5,31,0,0,624,628,3,8,4,0,625,627,3,108,54,0,626,625,1,0,0,0,
        627,630,1,0,0,0,628,626,1,0,0,0,628,629,1,0,0,0,629,632,1,0,0,0,
        630,628,1,0,0,0,631,633,3,110,55,0,632,631,1,0,0,0,632,633,1,0,0,
        0,633,107,1,0,0,0,634,635,5,26,0,0,635,636,5,25,0,0,636,637,3,50,
        25,0,637,638,5,31,0,0,638,639,3,8,4,0,639,109,1,0,0,0,640,641,5,
        26,0,0,641,642,5,31,0,0,642,643,3,8,4,0,643,111,1,0,0,0,644,645,
        5,23,0,0,645,646,3,50,25,0,646,647,5,31,0,0,647,648,3,8,4,0,648,
        113,1,0,0,0,649,650,5,21,0,0,650,655,5,69,0,0,651,652,5,32,0,0,652,
        654,5,69,0,0,653,651,1,0,0,0,654,657,1,0,0,0,655,653,1,0,0,0,655,
        656,1,0,0,0,656,658,1,0,0,0,657,655,1,0,0,0,658,659,5,22,0,0,659,
        660,3,50,25,0,660,661,5,31,0,0,661,662,3,8,4,0,662,115,1,0,0,0,663,
        664,5,30,0,0,664,665,5,31,0,0,665,670,3,50,25,0,666,667,5,32,0,0,
        667,669,3,50,25,0,668,666,1,0,0,0,669,672,1,0,0,0,670,668,1,0,0,
        0,670,671,1,0,0,0,671,673,1,0,0,0,672,670,1,0,0,0,673,674,5,31,0,
        0,674,675,3,120,60,0,675,117,1,0,0,0,676,677,7,13,0,0,677,119,1,
        0,0,0,678,679,5,56,0,0,679,681,5,1,0,0,680,682,3,122,61,0,681,680,
        1,0,0,0,682,683,1,0,0,0,683,681,1,0,0,0,683,684,1,0,0,0,684,685,
        1,0,0,0,685,686,5,2,0,0,686,121,1,0,0,0,687,692,3,124,62,0,688,692,
        3,128,64,0,689,692,3,126,63,0,690,692,5,56,0,0,691,687,1,0,0,0,691,
        688,1,0,0,0,691,689,1,0,0,0,691,690,1,0,0,0,692,123,1,0,0,0,693,
        694,3,118,59,0,694,695,5,31,0,0,695,703,3,50,25,0,696,697,5,32,0,
        0,697,698,3,118,59,0,698,699,5,31,0,0,699,700,3,50,25,0,700,702,
        1,0,0,0,701,696,1,0,0,0,702,705,1,0,0,0,703,701,1,0,0,0,703,704,
        1,0,0,0,704,710,1,0,0,0,705,703,1,0,0,0,706,707,5,32,0,0,707,709,
        3,118,59,0,708,706,1,0,0,0,709,712,1,0,0,0,710,708,1,0,0,0,710,711,
        1,0,0,0,711,713,1,0,0,0,712,710,1,0,0,0,713,723,5,31,0,0,714,724,
        3,120,60,0,715,720,3,50,25,0,716,717,5,32,0,0,717,719,3,50,25,0,
        718,716,1,0,0,0,719,722,1,0,0,0,720,718,1,0,0,0,720,721,1,0,0,0,
        721,724,1,0,0,0,722,720,1,0,0,0,723,714,1,0,0,0,723,715,1,0,0,0,
        724,125,1,0,0,0,725,726,3,118,59,0,726,727,5,31,0,0,727,728,3,120,
        60,0,728,127,1,0,0,0,729,730,3,118,59,0,730,731,5,31,0,0,731,736,
        3,50,25,0,732,733,5,32,0,0,733,735,3,50,25,0,734,732,1,0,0,0,735,
        738,1,0,0,0,736,734,1,0,0,0,736,737,1,0,0,0,737,129,1,0,0,0,738,
        736,1,0,0,0,739,740,5,63,0,0,740,741,5,69,0,0,741,131,1,0,0,0,81,
        134,136,142,159,166,175,182,199,204,208,216,229,237,239,245,252,
        259,263,269,287,294,302,305,327,332,339,353,355,359,367,375,377,
        383,390,399,411,414,420,425,429,437,440,446,449,453,466,468,475,
        483,485,493,505,507,515,517,527,543,545,551,565,568,572,578,584,
        589,600,603,606,608,614,628,632,655,670,683,691,703,710,720,723,
        736
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
    public operator_assignment_expr(): Operator_assignment_exprContext | null {
        return this.getRuleContext(0, Operator_assignment_exprContext);
    }
    public atom_expr(): Atom_exprContext | null {
        return this.getRuleContext(0, Atom_exprContext);
    }
    public function_call_expr(): Function_call_exprContext | null {
        return this.getRuleContext(0, Function_call_exprContext);
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
