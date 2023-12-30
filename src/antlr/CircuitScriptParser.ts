// Generated from ./src/antlr/CircuitScript.g4 by ANTLR 4.13.1
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
	ATN,
	ATNDeserializer, DecisionState, DFA, FailedPredicateException,
	RecognitionException, NoViableAltException, BailErrorStrategy,
	Parser, ParserATNSimulator,
	RuleContext, ParserRuleContext, PredictionMode, PredictionContextCache,
	TerminalNode, RuleNode,
	Token, TokenStream,
	Interval, IntervalSet
} from 'antlr4';
import CircuitScriptVisitor from "./CircuitScriptVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class CircuitScriptParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly T__6 = 7;
	public static readonly T__7 = 8;
	public static readonly T__8 = 9;
	public static readonly Break = 10;
	public static readonly Branch = 11;
	public static readonly Create = 12;
	public static readonly Component = 13;
	public static readonly Graphic = 14;
	public static readonly Wire = 15;
	public static readonly Pin = 16;
	public static readonly Add = 17;
	public static readonly At = 18;
	public static readonly To = 19;
	public static readonly Point = 20;
	public static readonly Return = 21;
	public static readonly Define = 22;
	public static readonly Import = 23;
	public static readonly If = 24;
	public static readonly Not = 25;
	public static readonly Equals = 26;
	public static readonly NotEquals = 27;
	public static readonly Addition = 28;
	public static readonly Minus = 29;
	public static readonly Divide = 30;
	public static readonly Multiply = 31;
	public static readonly OPEN_PAREN = 32;
	public static readonly CLOSE_PAREN = 33;
	public static readonly NOT_CONNECTED = 34;
	public static readonly BOOLEAN_VALUE = 35;
	public static readonly ID = 36;
	public static readonly INTEGER_VALUE = 37;
	public static readonly DECIMAL_VALUE = 38;
	public static readonly NUMERIC_VALUE = 39;
	public static readonly STRING_VALUE = 40;
	public static readonly PERCENTAGE_VALUE = 41;
	public static readonly ALPHA_NUMERIC = 42;
	public static readonly WS = 43;
	public static readonly NEWLINE = 44;
	public static readonly SKIP_ = 45;
	public static readonly INDENT = 46;
	public static readonly DEDENT = 47;
	public static readonly EOF = Token.EOF;
	public static readonly RULE_script = 0;
	public static readonly RULE_expression = 1;
	public static readonly RULE_branch_blocks = 2;
	public static readonly RULE_branch_block_inner = 3;
	public static readonly RULE_property_set_expr2 = 4;
	public static readonly RULE_assignment_expr2 = 5;
	public static readonly RULE_add_component_expr = 6;
	public static readonly RULE_component_select_expr = 7;
	public static readonly RULE_pin_select_expr = 8;
	public static readonly RULE_pin_select_expr2 = 9;
	public static readonly RULE_at_component_expr = 10;
	public static readonly RULE_to_component_expr = 11;
	public static readonly RULE_at_to_multiple_expr = 12;
	public static readonly RULE_at_to_multiple_line_expr = 13;
	public static readonly RULE_at_to_multiple_line_expr_to_pin = 14;
	public static readonly RULE_at_block = 15;
	public static readonly RULE_at_block_expressions = 16;
	public static readonly RULE_at_block_pin_expr = 17;
	public static readonly RULE_at_block_pin_expression_simple = 18;
	public static readonly RULE_at_block_pin_expression_complex = 19;
	public static readonly RULE_break_keyword = 20;
	public static readonly RULE_assignment_expr = 21;
	public static readonly RULE_keyword_assignment_expr = 22;
	public static readonly RULE_parameters = 23;
	public static readonly RULE_property_set_expr = 24;
	public static readonly RULE_double_dot_property_set_expr = 25;
	public static readonly RULE_data_expr = 26;
	public static readonly RULE_binary_operator = 27;
	public static readonly RULE_unary_operator = 28;
	public static readonly RULE_value_expr = 29;
	public static readonly RULE_signed_value_expr = 30;
	public static readonly RULE_print_expr = 31;
	public static readonly RULE_function_def_expr = 32;
	public static readonly RULE_function_expr = 33;
	public static readonly RULE_function_args_expr = 34;
	public static readonly RULE_atom_expr = 35;
	public static readonly RULE_trailer_expr = 36;
	public static readonly RULE_function_return_expr = 37;
	public static readonly RULE_create_component_expr = 38;
	public static readonly RULE_create_graphic_expr = 39;
	public static readonly RULE_sub_expr = 40;
	public static readonly RULE_property_expr = 41;
	public static readonly RULE_property_key_expr = 42;
	public static readonly RULE_property_value_expr = 43;
	public static readonly RULE_rounded_brackets_expr = 44;
	public static readonly RULE_style_expr = 45;
	public static readonly RULE_blank_expr = 46;
	public static readonly RULE_wire_expr = 47;
	public static readonly RULE_point_expr = 48;
	public static readonly RULE_import_expr = 49;
	public static readonly RULE_frame_expr = 50;
	public static readonly literalNames: (string | null)[] = [ null, "':'", 
                                                            "','", "'='", 
                                                            "'..'", "'print'", 
                                                            "'.'", "'['", 
                                                            "']'", "'frame'", 
                                                            "'break'", "'branch'", 
                                                            "'create'", 
                                                            "'component'", 
                                                            "'graphic'", 
                                                            "'wire'", "'pin'", 
                                                            "'add'", "'at'", 
                                                            "'to'", "'point'", 
                                                            "'return'", 
                                                            "'def'", "'import'", 
                                                            "'if'", "'!'", 
                                                            "'=='", "'!='", 
                                                            "'+'", "'-'", 
                                                            "'/'", "'*'", 
                                                            "'('", "')'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             "Break", "Branch", 
                                                             "Create", "Component", 
                                                             "Graphic", 
                                                             "Wire", "Pin", 
                                                             "Add", "At", 
                                                             "To", "Point", 
                                                             "Return", "Define", 
                                                             "Import", "If", 
                                                             "Not", "Equals", 
                                                             "NotEquals", 
                                                             "Addition", 
                                                             "Minus", "Divide", 
                                                             "Multiply", 
                                                             "OPEN_PAREN", 
                                                             "CLOSE_PAREN", 
                                                             "NOT_CONNECTED", 
                                                             "BOOLEAN_VALUE", 
                                                             "ID", "INTEGER_VALUE", 
                                                             "DECIMAL_VALUE", 
                                                             "NUMERIC_VALUE", 
                                                             "STRING_VALUE", 
                                                             "PERCENTAGE_VALUE", 
                                                             "ALPHA_NUMERIC", 
                                                             "WS", "NEWLINE", 
                                                             "SKIP_", "INDENT", 
                                                             "DEDENT" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"script", "expression", "branch_blocks", "branch_block_inner", "property_set_expr2", 
		"assignment_expr2", "add_component_expr", "component_select_expr", "pin_select_expr", 
		"pin_select_expr2", "at_component_expr", "to_component_expr", "at_to_multiple_expr", 
		"at_to_multiple_line_expr", "at_to_multiple_line_expr_to_pin", "at_block", 
		"at_block_expressions", "at_block_pin_expr", "at_block_pin_expression_simple", 
		"at_block_pin_expression_complex", "break_keyword", "assignment_expr", 
		"keyword_assignment_expr", "parameters", "property_set_expr", "double_dot_property_set_expr", 
		"data_expr", "binary_operator", "unary_operator", "value_expr", "signed_value_expr", 
		"print_expr", "function_def_expr", "function_expr", "function_args_expr", 
		"atom_expr", "trailer_expr", "function_return_expr", "create_component_expr", 
		"create_graphic_expr", "sub_expr", "property_expr", "property_key_expr", 
		"property_value_expr", "rounded_brackets_expr", "style_expr", "blank_expr", 
		"wire_expr", "point_expr", "import_expr", "frame_expr",
	];
	public get grammarFileName(): string { return "CircuitScript.g4"; }
	public get literalNames(): (string | null)[] { return CircuitScriptParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return CircuitScriptParser.symbolicNames; }
	public get ruleNames(): string[] { return CircuitScriptParser.ruleNames; }
	public get serializedATN(): number[] { return CircuitScriptParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, CircuitScriptParser._ATN, CircuitScriptParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public script(): ScriptContext {
		let localctx: ScriptContext = new ScriptContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, CircuitScriptParser.RULE_script);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 104;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				this.state = 104;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 4:
				case 5:
				case 7:
				case 9:
				case 10:
				case 11:
				case 15:
				case 17:
				case 18:
				case 19:
				case 20:
				case 22:
				case 23:
				case 36:
					{
					this.state = 102;
					this.expression();
					}
					break;
				case 44:
					{
					this.state = 103;
					this.match(CircuitScriptParser.NEWLINE);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 106;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 14585520) !== 0) || _la===36 || _la===44);
			this.state = 108;
			this.match(CircuitScriptParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public expression(): ExpressionContext {
		let localctx: ExpressionContext = new ExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, CircuitScriptParser.RULE_expression);
		try {
			this.state = 129;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 2, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 110;
				this.add_component_expr();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 111;
				this.at_to_multiple_expr();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 112;
				this.to_component_expr();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 113;
				this.at_component_expr();
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 114;
				this.assignment_expr();
				}
				break;
			case 6:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 115;
				this.property_set_expr();
				}
				break;
			case 7:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 116;
				this.property_set_expr2();
				}
				break;
			case 8:
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 117;
				this.double_dot_property_set_expr();
				}
				break;
			case 9:
				this.enterOuterAlt(localctx, 9);
				{
				this.state = 118;
				this.break_keyword();
				}
				break;
			case 10:
				this.enterOuterAlt(localctx, 10);
				{
				this.state = 119;
				this.function_def_expr();
				}
				break;
			case 11:
				this.enterOuterAlt(localctx, 11);
				{
				this.state = 120;
				this.wire_expr();
				}
				break;
			case 12:
				this.enterOuterAlt(localctx, 12);
				{
				this.state = 121;
				this.point_expr();
				}
				break;
			case 13:
				this.enterOuterAlt(localctx, 13);
				{
				this.state = 122;
				this.import_expr();
				}
				break;
			case 14:
				this.enterOuterAlt(localctx, 14);
				{
				this.state = 123;
				this.frame_expr();
				}
				break;
			case 15:
				this.enterOuterAlt(localctx, 15);
				{
				this.state = 124;
				this.atom_expr();
				}
				break;
			case 16:
				this.enterOuterAlt(localctx, 16);
				{
				this.state = 125;
				this.at_block();
				}
				break;
			case 17:
				this.enterOuterAlt(localctx, 17);
				{
				this.state = 126;
				this.branch_blocks();
				}
				break;
			case 18:
				this.enterOuterAlt(localctx, 18);
				{
				this.state = 127;
				this.style_expr();
				}
				break;
			case 19:
				this.enterOuterAlt(localctx, 19);
				{
				this.state = 128;
				this.print_expr();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public branch_blocks(): Branch_blocksContext {
		let localctx: Branch_blocksContext = new Branch_blocksContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, CircuitScriptParser.RULE_branch_blocks);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 132;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 131;
					this.branch_block_inner();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 134;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 3, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public branch_block_inner(): Branch_block_innerContext {
		let localctx: Branch_block_innerContext = new Branch_block_innerContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, CircuitScriptParser.RULE_branch_block_inner);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 136;
			this.match(CircuitScriptParser.Branch);
			this.state = 137;
			this.match(CircuitScriptParser.T__0);
			this.state = 138;
			this.match(CircuitScriptParser.NEWLINE);
			this.state = 139;
			this.match(CircuitScriptParser.INDENT);
			this.state = 142;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				this.state = 142;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 44:
					{
					this.state = 140;
					this.match(CircuitScriptParser.NEWLINE);
					}
					break;
				case 4:
				case 5:
				case 7:
				case 9:
				case 10:
				case 11:
				case 15:
				case 17:
				case 18:
				case 19:
				case 20:
				case 22:
				case 23:
				case 36:
					{
					this.state = 141;
					this.expression();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 144;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 14585520) !== 0) || _la===36 || _la===44);
			this.state = 146;
			this.match(CircuitScriptParser.DEDENT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public property_set_expr2(): Property_set_expr2Context {
		let localctx: Property_set_expr2Context = new Property_set_expr2Context(this, this._ctx, this.state);
		this.enterRule(localctx, 8, CircuitScriptParser.RULE_property_set_expr2);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 148;
			this.atom_expr();
			this.state = 149;
			this.match(CircuitScriptParser.T__0);
			this.state = 150;
			this.match(CircuitScriptParser.NEWLINE);
			this.state = 151;
			this.match(CircuitScriptParser.INDENT);
			this.state = 154;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				this.state = 154;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 44:
					{
					this.state = 152;
					this.match(CircuitScriptParser.NEWLINE);
					}
					break;
				case 36:
				case 37:
					{
					this.state = 153;
					this.assignment_expr2();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 156;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & 259) !== 0));
			this.state = 158;
			this.match(CircuitScriptParser.DEDENT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public assignment_expr2(): Assignment_expr2Context {
		let localctx: Assignment_expr2Context = new Assignment_expr2Context(this, this._ctx, this.state);
		this.enterRule(localctx, 10, CircuitScriptParser.RULE_assignment_expr2);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 160;
			_la = this._input.LA(1);
			if(!(_la===36 || _la===37)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 161;
			this.match(CircuitScriptParser.T__0);
			this.state = 162;
			this.value_expr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public add_component_expr(): Add_component_exprContext {
		let localctx: Add_component_exprContext = new Add_component_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, CircuitScriptParser.RULE_add_component_expr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 164;
			this.match(CircuitScriptParser.Add);
			this.state = 165;
			this.data_expr(0);
			this.state = 167;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===16) {
				{
				this.state = 166;
				this.pin_select_expr();
				}
			}

			this.state = 170;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 9, this._ctx) ) {
			case 1:
				{
				this.state = 169;
				this.match(CircuitScriptParser.ID);
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public component_select_expr(): Component_select_exprContext {
		let localctx: Component_select_exprContext = new Component_select_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 14, CircuitScriptParser.RULE_component_select_expr);
		let _la: number;
		try {
			this.state = 177;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 7:
			case 12:
			case 25:
			case 29:
			case 32:
			case 35:
			case 36:
			case 37:
			case 38:
			case 39:
			case 40:
			case 41:
				this.enterOuterAlt(localctx, 1);
				{
				{
				this.state = 172;
				this.data_expr(0);
				this.state = 174;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===16) {
					{
					this.state = 173;
					this.pin_select_expr();
					}
				}

				}
				}
				break;
			case 16:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 176;
				this.pin_select_expr();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public pin_select_expr(): Pin_select_exprContext {
		let localctx: Pin_select_exprContext = new Pin_select_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, CircuitScriptParser.RULE_pin_select_expr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 179;
			this.match(CircuitScriptParser.Pin);
			this.state = 180;
			_la = this._input.LA(1);
			if(!(_la===37 || _la===40)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public pin_select_expr2(): Pin_select_expr2Context {
		let localctx: Pin_select_expr2Context = new Pin_select_expr2Context(this, this._ctx, this.state);
		this.enterRule(localctx, 18, CircuitScriptParser.RULE_pin_select_expr2);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 182;
			_la = this._input.LA(1);
			if(!(_la===37 || _la===40)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public at_component_expr(): At_component_exprContext {
		let localctx: At_component_exprContext = new At_component_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 20, CircuitScriptParser.RULE_at_component_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 184;
			this.match(CircuitScriptParser.At);
			this.state = 185;
			this.component_select_expr();
			this.state = 187;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 12, this._ctx) ) {
			case 1:
				{
				this.state = 186;
				this.match(CircuitScriptParser.ID);
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public to_component_expr(): To_component_exprContext {
		let localctx: To_component_exprContext = new To_component_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 22, CircuitScriptParser.RULE_to_component_expr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 189;
			this.match(CircuitScriptParser.To);
			this.state = 190;
			this.component_select_expr();
			this.state = 195;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===2) {
				{
				{
				this.state = 191;
				this.match(CircuitScriptParser.T__1);
				this.state = 192;
				this.component_select_expr();
				}
				}
				this.state = 197;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 199;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 14, this._ctx) ) {
			case 1:
				{
				this.state = 198;
				this.match(CircuitScriptParser.ID);
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public at_to_multiple_expr(): At_to_multiple_exprContext {
		let localctx: At_to_multiple_exprContext = new At_to_multiple_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 24, CircuitScriptParser.RULE_at_to_multiple_expr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 201;
			this.match(CircuitScriptParser.At);
			this.state = 202;
			this.component_select_expr();
			this.state = 203;
			this.match(CircuitScriptParser.To);
			this.state = 204;
			this.component_select_expr();
			this.state = 209;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===2) {
				{
				{
				this.state = 205;
				this.match(CircuitScriptParser.T__1);
				this.state = 206;
				this.component_select_expr();
				}
				}
				this.state = 211;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 212;
			this.match(CircuitScriptParser.T__0);
			this.state = 213;
			this.match(CircuitScriptParser.NEWLINE);
			this.state = 214;
			this.match(CircuitScriptParser.INDENT);
			this.state = 217;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				this.state = 217;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 44:
					{
					this.state = 215;
					this.match(CircuitScriptParser.NEWLINE);
					}
					break;
				case 37:
				case 40:
					{
					this.state = 216;
					this.at_to_multiple_line_expr();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 219;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 137) !== 0));
			this.state = 221;
			this.match(CircuitScriptParser.DEDENT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public at_to_multiple_line_expr(): At_to_multiple_line_exprContext {
		let localctx: At_to_multiple_line_exprContext = new At_to_multiple_line_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 26, CircuitScriptParser.RULE_at_to_multiple_line_expr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 223;
			this.pin_select_expr2();
			this.state = 224;
			this.match(CircuitScriptParser.T__0);
			this.state = 225;
			this.at_to_multiple_line_expr_to_pin();
			this.state = 230;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===2) {
				{
				{
				this.state = 226;
				this.match(CircuitScriptParser.T__1);
				this.state = 227;
				this.at_to_multiple_line_expr_to_pin();
				}
				}
				this.state = 232;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public at_to_multiple_line_expr_to_pin(): At_to_multiple_line_expr_to_pinContext {
		let localctx: At_to_multiple_line_expr_to_pinContext = new At_to_multiple_line_expr_to_pinContext(this, this._ctx, this.state);
		this.enterRule(localctx, 28, CircuitScriptParser.RULE_at_to_multiple_line_expr_to_pin);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 233;
			_la = this._input.LA(1);
			if(!(_la===34 || _la===37)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public at_block(): At_blockContext {
		let localctx: At_blockContext = new At_blockContext(this, this._ctx, this.state);
		this.enterRule(localctx, 30, CircuitScriptParser.RULE_at_block);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 235;
			this.at_component_expr();
			this.state = 236;
			this.match(CircuitScriptParser.T__0);
			this.state = 237;
			this.match(CircuitScriptParser.NEWLINE);
			this.state = 238;
			this.match(CircuitScriptParser.INDENT);
			this.state = 241;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				this.state = 241;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 44:
					{
					this.state = 239;
					this.match(CircuitScriptParser.NEWLINE);
					}
					break;
				case 4:
				case 5:
				case 7:
				case 9:
				case 10:
				case 11:
				case 15:
				case 17:
				case 18:
				case 19:
				case 20:
				case 22:
				case 23:
				case 36:
				case 37:
				case 40:
					{
					this.state = 240;
					this.at_block_expressions();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 243;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 14585520) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & 275) !== 0));
			this.state = 245;
			this.match(CircuitScriptParser.DEDENT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public at_block_expressions(): At_block_expressionsContext {
		let localctx: At_block_expressionsContext = new At_block_expressionsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 32, CircuitScriptParser.RULE_at_block_expressions);
		try {
			this.state = 249;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 4:
			case 5:
			case 7:
			case 9:
			case 10:
			case 11:
			case 15:
			case 17:
			case 18:
			case 19:
			case 20:
			case 22:
			case 23:
			case 36:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 247;
				this.expression();
				}
				break;
			case 37:
			case 40:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 248;
				this.at_block_pin_expr();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public at_block_pin_expr(): At_block_pin_exprContext {
		let localctx: At_block_pin_exprContext = new At_block_pin_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 34, CircuitScriptParser.RULE_at_block_pin_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 251;
			this.pin_select_expr2();
			this.state = 252;
			this.match(CircuitScriptParser.T__0);
			this.state = 255;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 4:
			case 5:
			case 7:
			case 9:
			case 10:
			case 11:
			case 15:
			case 17:
			case 18:
			case 19:
			case 20:
			case 22:
			case 23:
			case 34:
			case 36:
				{
				this.state = 253;
				this.at_block_pin_expression_simple();
				}
				break;
			case 44:
				{
				this.state = 254;
				this.at_block_pin_expression_complex();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public at_block_pin_expression_simple(): At_block_pin_expression_simpleContext {
		let localctx: At_block_pin_expression_simpleContext = new At_block_pin_expression_simpleContext(this, this._ctx, this.state);
		this.enterRule(localctx, 36, CircuitScriptParser.RULE_at_block_pin_expression_simple);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 259;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 4:
			case 5:
			case 7:
			case 9:
			case 10:
			case 11:
			case 15:
			case 17:
			case 18:
			case 19:
			case 20:
			case 22:
			case 23:
			case 36:
				{
				this.state = 257;
				this.expression();
				}
				break;
			case 34:
				{
				this.state = 258;
				this.match(CircuitScriptParser.NOT_CONNECTED);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public at_block_pin_expression_complex(): At_block_pin_expression_complexContext {
		let localctx: At_block_pin_expression_complexContext = new At_block_pin_expression_complexContext(this, this._ctx, this.state);
		this.enterRule(localctx, 38, CircuitScriptParser.RULE_at_block_pin_expression_complex);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 261;
			this.match(CircuitScriptParser.NEWLINE);
			this.state = 262;
			this.match(CircuitScriptParser.INDENT);
			this.state = 265;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				this.state = 265;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 44:
					{
					this.state = 263;
					this.match(CircuitScriptParser.NEWLINE);
					}
					break;
				case 4:
				case 5:
				case 7:
				case 9:
				case 10:
				case 11:
				case 15:
				case 17:
				case 18:
				case 19:
				case 20:
				case 22:
				case 23:
				case 36:
					{
					this.state = 264;
					this.expression();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 267;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 14585520) !== 0) || _la===36 || _la===44);
			this.state = 269;
			this.match(CircuitScriptParser.DEDENT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public break_keyword(): Break_keywordContext {
		let localctx: Break_keywordContext = new Break_keywordContext(this, this._ctx, this.state);
		this.enterRule(localctx, 40, CircuitScriptParser.RULE_break_keyword);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 271;
			this.match(CircuitScriptParser.Break);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public assignment_expr(): Assignment_exprContext {
		let localctx: Assignment_exprContext = new Assignment_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 42, CircuitScriptParser.RULE_assignment_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 273;
			this.atom_expr();
			this.state = 274;
			this.match(CircuitScriptParser.T__2);
			this.state = 275;
			this.data_expr(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public keyword_assignment_expr(): Keyword_assignment_exprContext {
		let localctx: Keyword_assignment_exprContext = new Keyword_assignment_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 44, CircuitScriptParser.RULE_keyword_assignment_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 277;
			this.match(CircuitScriptParser.ID);
			this.state = 278;
			this.match(CircuitScriptParser.T__2);
			this.state = 279;
			this.data_expr(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public parameters(): ParametersContext {
		let localctx: ParametersContext = new ParametersContext(this, this._ctx, this.state);
		this.enterRule(localctx, 46, CircuitScriptParser.RULE_parameters);
		let _la: number;
		try {
			let _alt: number;
			this.state = 304;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 29, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				{
				this.state = 281;
				this.data_expr(0);
				this.state = 286;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 26, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 282;
						this.match(CircuitScriptParser.T__1);
						this.state = 283;
						this.data_expr(0);
						}
						}
					}
					this.state = 288;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 26, this._ctx);
				}
				this.state = 293;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===2) {
					{
					{
					this.state = 289;
					this.match(CircuitScriptParser.T__1);
					this.state = 290;
					this.keyword_assignment_expr();
					}
					}
					this.state = 295;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				{
				this.state = 296;
				this.keyword_assignment_expr();
				this.state = 301;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===2) {
					{
					{
					this.state = 297;
					this.match(CircuitScriptParser.T__1);
					this.state = 298;
					this.keyword_assignment_expr();
					}
					}
					this.state = 303;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public property_set_expr(): Property_set_exprContext {
		let localctx: Property_set_exprContext = new Property_set_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 48, CircuitScriptParser.RULE_property_set_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 306;
			this.atom_expr();
			this.state = 307;
			this.match(CircuitScriptParser.T__2);
			this.state = 308;
			this.data_expr(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public double_dot_property_set_expr(): Double_dot_property_set_exprContext {
		let localctx: Double_dot_property_set_exprContext = new Double_dot_property_set_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 50, CircuitScriptParser.RULE_double_dot_property_set_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 310;
			this.match(CircuitScriptParser.T__3);
			this.state = 311;
			this.match(CircuitScriptParser.ID);
			this.state = 312;
			this.match(CircuitScriptParser.T__2);
			this.state = 313;
			this.data_expr(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public data_expr(): Data_exprContext;
	public data_expr(_p: number): Data_exprContext;
	// @RuleVersion(0)
	public data_expr(_p?: number): Data_exprContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let localctx: Data_exprContext = new Data_exprContext(this, this._ctx, _parentState);
		let _prevctx: Data_exprContext = localctx;
		let _startState: number = 52;
		this.enterRecursionRule(localctx, 52, CircuitScriptParser.RULE_data_expr, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 328;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 30, this._ctx) ) {
			case 1:
				{
				localctx = new UnaryOperatorExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 316;
				this.unary_operator();
				this.state = 317;
				this.data_expr(10);
				}
				break;
			case 2:
				{
				localctx = new DataExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 319;
				this.match(CircuitScriptParser.ID);
				}
				break;
			case 3:
				{
				localctx = new DataExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 320;
				this.atom_expr();
				}
				break;
			case 4:
				{
				localctx = new DataExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 321;
				this.create_component_expr();
				}
				break;
			case 5:
				{
				localctx = new DataExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 322;
				this.create_graphic_expr();
				}
				break;
			case 6:
				{
				localctx = new DataExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 323;
				this.value_expr();
				}
				break;
			case 7:
				{
				localctx = new RoundedBracketsExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 324;
				this.match(CircuitScriptParser.OPEN_PAREN);
				this.state = 325;
				this.data_expr(0);
				this.state = 326;
				this.match(CircuitScriptParser.CLOSE_PAREN);
				}
				break;
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 342;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 32, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 340;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 31, this._ctx) ) {
					case 1:
						{
						localctx = new MultiplyExprContext(this, new Data_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, CircuitScriptParser.RULE_data_expr);
						this.state = 330;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 331;
						_la = this._input.LA(1);
						if(!(_la===30 || _la===31)) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 332;
						this.data_expr(10);
						}
						break;
					case 2:
						{
						localctx = new AdditionExprContext(this, new Data_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, CircuitScriptParser.RULE_data_expr);
						this.state = 333;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 334;
						_la = this._input.LA(1);
						if(!(_la===28 || _la===29)) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 335;
						this.data_expr(9);
						}
						break;
					case 3:
						{
						localctx = new BinaryOperatorExprContext(this, new Data_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, CircuitScriptParser.RULE_data_expr);
						this.state = 336;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 337;
						this.binary_operator();
						this.state = 338;
						this.data_expr(3);
						}
						break;
					}
					}
				}
				this.state = 344;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 32, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return localctx;
	}
	// @RuleVersion(0)
	public binary_operator(): Binary_operatorContext {
		let localctx: Binary_operatorContext = new Binary_operatorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 54, CircuitScriptParser.RULE_binary_operator);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 345;
			_la = this._input.LA(1);
			if(!(_la===26 || _la===27)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public unary_operator(): Unary_operatorContext {
		let localctx: Unary_operatorContext = new Unary_operatorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 56, CircuitScriptParser.RULE_unary_operator);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 347;
			_la = this._input.LA(1);
			if(!(_la===25 || _la===29)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public value_expr(): Value_exprContext {
		let localctx: Value_exprContext = new Value_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 58, CircuitScriptParser.RULE_value_expr);
		try {
			this.state = 354;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 29:
			case 37:
			case 38:
			case 39:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 349;
				this.signed_value_expr();
				}
				break;
			case 40:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 350;
				this.match(CircuitScriptParser.STRING_VALUE);
				}
				break;
			case 41:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 351;
				this.match(CircuitScriptParser.PERCENTAGE_VALUE);
				}
				break;
			case 35:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 352;
				this.match(CircuitScriptParser.BOOLEAN_VALUE);
				}
				break;
			case 7:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 353;
				this.blank_expr();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public signed_value_expr(): Signed_value_exprContext {
		let localctx: Signed_value_exprContext = new Signed_value_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 60, CircuitScriptParser.RULE_signed_value_expr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 357;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===29) {
				{
				this.state = 356;
				this.match(CircuitScriptParser.Minus);
				}
			}

			this.state = 359;
			_la = this._input.LA(1);
			if(!(((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 7) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public print_expr(): Print_exprContext {
		let localctx: Print_exprContext = new Print_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 62, CircuitScriptParser.RULE_print_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 361;
			this.match(CircuitScriptParser.T__4);
			this.state = 362;
			this.match(CircuitScriptParser.OPEN_PAREN);
			this.state = 363;
			this.data_expr(0);
			this.state = 364;
			this.match(CircuitScriptParser.CLOSE_PAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public function_def_expr(): Function_def_exprContext {
		let localctx: Function_def_exprContext = new Function_def_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 64, CircuitScriptParser.RULE_function_def_expr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 366;
			this.match(CircuitScriptParser.Define);
			this.state = 367;
			this.match(CircuitScriptParser.ID);
			this.state = 368;
			this.match(CircuitScriptParser.OPEN_PAREN);
			this.state = 370;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===36) {
				{
				this.state = 369;
				this.function_args_expr();
				}
			}

			this.state = 372;
			this.match(CircuitScriptParser.CLOSE_PAREN);
			this.state = 373;
			this.match(CircuitScriptParser.T__0);
			this.state = 374;
			this.match(CircuitScriptParser.NEWLINE);
			this.state = 375;
			this.match(CircuitScriptParser.INDENT);
			this.state = 378;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				this.state = 378;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 44:
					{
					this.state = 376;
					this.match(CircuitScriptParser.NEWLINE);
					}
					break;
				case 4:
				case 5:
				case 7:
				case 9:
				case 10:
				case 11:
				case 15:
				case 17:
				case 18:
				case 19:
				case 20:
				case 21:
				case 22:
				case 23:
				case 36:
					{
					this.state = 377;
					this.function_expr();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 380;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 16682672) !== 0) || _la===36 || _la===44);
			this.state = 382;
			this.match(CircuitScriptParser.DEDENT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public function_expr(): Function_exprContext {
		let localctx: Function_exprContext = new Function_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 66, CircuitScriptParser.RULE_function_expr);
		try {
			this.state = 386;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 4:
			case 5:
			case 7:
			case 9:
			case 10:
			case 11:
			case 15:
			case 17:
			case 18:
			case 19:
			case 20:
			case 22:
			case 23:
			case 36:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 384;
				this.expression();
				}
				break;
			case 21:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 385;
				this.function_return_expr();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public function_args_expr(): Function_args_exprContext {
		let localctx: Function_args_exprContext = new Function_args_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 68, CircuitScriptParser.RULE_function_args_expr);
		let _la: number;
		try {
			let _alt: number;
			this.state = 417;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 42, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 388;
				this.match(CircuitScriptParser.ID);
				this.state = 393;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 39, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 389;
						this.match(CircuitScriptParser.T__1);
						this.state = 390;
						this.match(CircuitScriptParser.ID);
						}
						}
					}
					this.state = 395;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 39, this._ctx);
				}
				this.state = 402;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===2) {
					{
					{
					this.state = 396;
					this.match(CircuitScriptParser.T__1);
					this.state = 397;
					this.match(CircuitScriptParser.ID);
					this.state = 398;
					this.match(CircuitScriptParser.T__2);
					this.state = 399;
					this.value_expr();
					}
					}
					this.state = 404;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 405;
				this.match(CircuitScriptParser.ID);
				this.state = 406;
				this.match(CircuitScriptParser.T__2);
				this.state = 407;
				this.value_expr();
				this.state = 414;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===2) {
					{
					{
					this.state = 408;
					this.match(CircuitScriptParser.T__1);
					this.state = 409;
					this.match(CircuitScriptParser.ID);
					this.state = 410;
					this.match(CircuitScriptParser.T__2);
					this.state = 411;
					this.value_expr();
					}
					}
					this.state = 416;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public atom_expr(): Atom_exprContext {
		let localctx: Atom_exprContext = new Atom_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 70, CircuitScriptParser.RULE_atom_expr);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 419;
			this.match(CircuitScriptParser.ID);
			this.state = 423;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 43, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 420;
					this.trailer_expr();
					}
					}
				}
				this.state = 425;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 43, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public trailer_expr(): Trailer_exprContext {
		let localctx: Trailer_exprContext = new Trailer_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 72, CircuitScriptParser.RULE_trailer_expr);
		let _la: number;
		try {
			this.state = 433;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 32:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 426;
				this.match(CircuitScriptParser.OPEN_PAREN);
				this.state = 428;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 570429568) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 1017) !== 0)) {
					{
					this.state = 427;
					this.parameters();
					}
				}

				this.state = 430;
				this.match(CircuitScriptParser.CLOSE_PAREN);
				}
				break;
			case 6:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 431;
				this.match(CircuitScriptParser.T__5);
				this.state = 432;
				this.match(CircuitScriptParser.ID);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public function_return_expr(): Function_return_exprContext {
		let localctx: Function_return_exprContext = new Function_return_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 74, CircuitScriptParser.RULE_function_return_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 435;
			this.match(CircuitScriptParser.Return);
			this.state = 436;
			this.data_expr(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public create_component_expr(): Create_component_exprContext {
		let localctx: Create_component_exprContext = new Create_component_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 76, CircuitScriptParser.RULE_create_component_expr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 438;
			this.match(CircuitScriptParser.Create);
			this.state = 439;
			this.match(CircuitScriptParser.Component);
			this.state = 440;
			this.match(CircuitScriptParser.T__0);
			this.state = 441;
			this.match(CircuitScriptParser.NEWLINE);
			this.state = 442;
			this.match(CircuitScriptParser.INDENT);
			this.state = 445;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				this.state = 445;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 44:
					{
					this.state = 443;
					this.match(CircuitScriptParser.NEWLINE);
					}
					break;
				case 36:
				case 37:
				case 40:
					{
					this.state = 444;
					this.property_expr();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 447;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & 275) !== 0));
			this.state = 449;
			this.match(CircuitScriptParser.DEDENT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public create_graphic_expr(): Create_graphic_exprContext {
		let localctx: Create_graphic_exprContext = new Create_graphic_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 78, CircuitScriptParser.RULE_create_graphic_expr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 451;
			this.match(CircuitScriptParser.Create);
			this.state = 452;
			this.match(CircuitScriptParser.Graphic);
			this.state = 453;
			this.match(CircuitScriptParser.T__0);
			this.state = 454;
			this.match(CircuitScriptParser.NEWLINE);
			this.state = 455;
			this.match(CircuitScriptParser.INDENT);
			this.state = 458;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				this.state = 458;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 44:
					{
					this.state = 456;
					this.match(CircuitScriptParser.NEWLINE);
					}
					break;
				case 16:
				case 36:
					{
					this.state = 457;
					this.sub_expr();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 460;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (((((_la - 16)) & ~0x1F) === 0 && ((1 << (_la - 16)) & 269484033) !== 0));
			this.state = 462;
			this.match(CircuitScriptParser.DEDENT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public sub_expr(): Sub_exprContext {
		let localctx: Sub_exprContext = new Sub_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 80, CircuitScriptParser.RULE_sub_expr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 464;
			_la = this._input.LA(1);
			if(!(_la===16 || _la===36)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 465;
			this.match(CircuitScriptParser.T__0);
			this.state = 466;
			this.parameters();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public property_expr(): Property_exprContext {
		let localctx: Property_exprContext = new Property_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 82, CircuitScriptParser.RULE_property_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 468;
			this.property_key_expr();
			this.state = 469;
			this.match(CircuitScriptParser.T__0);
			this.state = 470;
			this.property_value_expr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public property_key_expr(): Property_key_exprContext {
		let localctx: Property_key_exprContext = new Property_key_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 84, CircuitScriptParser.RULE_property_key_expr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 472;
			_la = this._input.LA(1);
			if(!(((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & 19) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public property_value_expr(): Property_value_exprContext {
		let localctx: Property_value_exprContext = new Property_value_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 86, CircuitScriptParser.RULE_property_value_expr);
		let _la: number;
		try {
			this.state = 491;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 44:
				localctx = new Nested_propertiesContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 474;
				this.match(CircuitScriptParser.NEWLINE);
				this.state = 475;
				this.match(CircuitScriptParser.INDENT);
				this.state = 478;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					this.state = 478;
					this._errHandler.sync(this);
					switch (this._input.LA(1)) {
					case 44:
						{
						this.state = 476;
						this.match(CircuitScriptParser.NEWLINE);
						}
						break;
					case 36:
					case 37:
					case 40:
						{
						this.state = 477;
						this.property_expr();
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					}
					this.state = 480;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & 275) !== 0));
				this.state = 482;
				this.match(CircuitScriptParser.DEDENT);
				}
				break;
			case 7:
			case 12:
			case 25:
			case 29:
			case 32:
			case 35:
			case 36:
			case 37:
			case 38:
			case 39:
			case 40:
			case 41:
				localctx = new Single_line_propertyContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 483;
				this.data_expr(0);
				this.state = 488;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===2) {
					{
					{
					this.state = 484;
					this.match(CircuitScriptParser.T__1);
					this.state = 485;
					this.data_expr(0);
					}
					}
					this.state = 490;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public rounded_brackets_expr(): Rounded_brackets_exprContext {
		let localctx: Rounded_brackets_exprContext = new Rounded_brackets_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 88, CircuitScriptParser.RULE_rounded_brackets_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 493;
			this.match(CircuitScriptParser.OPEN_PAREN);
			this.state = 496;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 54, this._ctx) ) {
			case 1:
				{
				this.state = 494;
				this.expression();
				}
				break;
			case 2:
				{
				this.state = 495;
				this.data_expr(0);
				}
				break;
			}
			this.state = 498;
			this.match(CircuitScriptParser.CLOSE_PAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public style_expr(): Style_exprContext {
		let localctx: Style_exprContext = new Style_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 90, CircuitScriptParser.RULE_style_expr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 500;
			this.match(CircuitScriptParser.T__6);
			this.state = 501;
			this.match(CircuitScriptParser.ID);
			this.state = 502;
			this.match(CircuitScriptParser.T__2);
			this.state = 503;
			this.value_expr();
			this.state = 510;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===2) {
				{
				{
				this.state = 504;
				this.match(CircuitScriptParser.T__1);
				this.state = 505;
				this.match(CircuitScriptParser.ID);
				this.state = 506;
				this.match(CircuitScriptParser.T__2);
				this.state = 507;
				this.value_expr();
				}
				}
				this.state = 512;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 513;
			this.match(CircuitScriptParser.T__7);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public blank_expr(): Blank_exprContext {
		let localctx: Blank_exprContext = new Blank_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 92, CircuitScriptParser.RULE_blank_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 515;
			this.match(CircuitScriptParser.T__6);
			this.state = 516;
			this.match(CircuitScriptParser.INTEGER_VALUE);
			this.state = 517;
			this.match(CircuitScriptParser.T__7);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public wire_expr(): Wire_exprContext {
		let localctx: Wire_exprContext = new Wire_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 94, CircuitScriptParser.RULE_wire_expr);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 519;
			this.match(CircuitScriptParser.Wire);
			this.state = 520;
			this.match(CircuitScriptParser.ID);
			this.state = 524;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 56, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 521;
					_la = this._input.LA(1);
					if(!(_la===36 || _la===37)) {
					this._errHandler.recoverInline(this);
					}
					else {
						this._errHandler.reportMatch(this);
					    this.consume();
					}
					}
					}
				}
				this.state = 526;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 56, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public point_expr(): Point_exprContext {
		let localctx: Point_exprContext = new Point_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 96, CircuitScriptParser.RULE_point_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 527;
			this.match(CircuitScriptParser.Point);
			this.state = 528;
			this.match(CircuitScriptParser.ID);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public import_expr(): Import_exprContext {
		let localctx: Import_exprContext = new Import_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 98, CircuitScriptParser.RULE_import_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 530;
			this.match(CircuitScriptParser.Import);
			this.state = 531;
			this.match(CircuitScriptParser.ID);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public frame_expr(): Frame_exprContext {
		let localctx: Frame_exprContext = new Frame_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 100, CircuitScriptParser.RULE_frame_expr);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 533;
			this.match(CircuitScriptParser.T__8);
			this.state = 534;
			this.match(CircuitScriptParser.T__0);
			this.state = 535;
			this.match(CircuitScriptParser.NEWLINE);
			this.state = 536;
			this.match(CircuitScriptParser.INDENT);
			this.state = 543;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				this.state = 543;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 44:
					{
					this.state = 537;
					this.match(CircuitScriptParser.NEWLINE);
					}
					break;
				case 4:
				case 5:
				case 7:
				case 9:
				case 10:
				case 11:
				case 15:
				case 17:
				case 18:
				case 19:
				case 20:
				case 22:
				case 23:
				case 36:
					{
					this.state = 539;
					this._errHandler.sync(this);
					_alt = 1;
					do {
						switch (_alt) {
						case 1:
							{
							{
							this.state = 538;
							this.expression();
							}
							}
							break;
						default:
							throw new NoViableAltException(this);
						}
						this.state = 541;
						this._errHandler.sync(this);
						_alt = this._interp.adaptivePredict(this._input, 57, this._ctx);
					} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 545;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 14585520) !== 0) || _la===36 || _la===44);
			this.state = 547;
			this.match(CircuitScriptParser.DEDENT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public sempred(localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 26:
			return this.data_expr_sempred(localctx as Data_exprContext, predIndex);
		}
		return true;
	}
	private data_expr_sempred(localctx: Data_exprContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 9);
		case 1:
			return this.precpred(this._ctx, 8);
		case 2:
			return this.precpred(this._ctx, 2);
		}
		return true;
	}

	public static readonly _serializedATN: number[] = [4,1,47,550,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,
	7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,
	24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,
	2,32,7,32,2,33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,
	39,7,39,2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,46,
	7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,1,0,1,0,4,0,105,8,0,11,0,12,
	0,106,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	1,1,1,1,1,1,1,1,1,3,1,130,8,1,1,2,4,2,133,8,2,11,2,12,2,134,1,3,1,3,1,3,
	1,3,1,3,1,3,4,3,143,8,3,11,3,12,3,144,1,3,1,3,1,4,1,4,1,4,1,4,1,4,1,4,4,
	4,155,8,4,11,4,12,4,156,1,4,1,4,1,5,1,5,1,5,1,5,1,6,1,6,1,6,3,6,168,8,6,
	1,6,3,6,171,8,6,1,7,1,7,3,7,175,8,7,1,7,3,7,178,8,7,1,8,1,8,1,8,1,9,1,9,
	1,10,1,10,1,10,3,10,188,8,10,1,11,1,11,1,11,1,11,5,11,194,8,11,10,11,12,
	11,197,9,11,1,11,3,11,200,8,11,1,12,1,12,1,12,1,12,1,12,1,12,5,12,208,8,
	12,10,12,12,12,211,9,12,1,12,1,12,1,12,1,12,1,12,4,12,218,8,12,11,12,12,
	12,219,1,12,1,12,1,13,1,13,1,13,1,13,1,13,5,13,229,8,13,10,13,12,13,232,
	9,13,1,14,1,14,1,15,1,15,1,15,1,15,1,15,1,15,4,15,242,8,15,11,15,12,15,
	243,1,15,1,15,1,16,1,16,3,16,250,8,16,1,17,1,17,1,17,1,17,3,17,256,8,17,
	1,18,1,18,3,18,260,8,18,1,19,1,19,1,19,1,19,4,19,266,8,19,11,19,12,19,267,
	1,19,1,19,1,20,1,20,1,21,1,21,1,21,1,21,1,22,1,22,1,22,1,22,1,23,1,23,1,
	23,5,23,285,8,23,10,23,12,23,288,9,23,1,23,1,23,5,23,292,8,23,10,23,12,
	23,295,9,23,1,23,1,23,1,23,5,23,300,8,23,10,23,12,23,303,9,23,3,23,305,
	8,23,1,24,1,24,1,24,1,24,1,25,1,25,1,25,1,25,1,25,1,26,1,26,1,26,1,26,1,
	26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,1,26,3,26,329,8,26,1,26,1,26,1,26,
	1,26,1,26,1,26,1,26,1,26,1,26,1,26,5,26,341,8,26,10,26,12,26,344,9,26,1,
	27,1,27,1,28,1,28,1,29,1,29,1,29,1,29,1,29,3,29,355,8,29,1,30,3,30,358,
	8,30,1,30,1,30,1,31,1,31,1,31,1,31,1,31,1,32,1,32,1,32,1,32,3,32,371,8,
	32,1,32,1,32,1,32,1,32,1,32,1,32,4,32,379,8,32,11,32,12,32,380,1,32,1,32,
	1,33,1,33,3,33,387,8,33,1,34,1,34,1,34,5,34,392,8,34,10,34,12,34,395,9,
	34,1,34,1,34,1,34,1,34,5,34,401,8,34,10,34,12,34,404,9,34,1,34,1,34,1,34,
	1,34,1,34,1,34,1,34,5,34,413,8,34,10,34,12,34,416,9,34,3,34,418,8,34,1,
	35,1,35,5,35,422,8,35,10,35,12,35,425,9,35,1,36,1,36,3,36,429,8,36,1,36,
	1,36,1,36,3,36,434,8,36,1,37,1,37,1,37,1,38,1,38,1,38,1,38,1,38,1,38,1,
	38,4,38,446,8,38,11,38,12,38,447,1,38,1,38,1,39,1,39,1,39,1,39,1,39,1,39,
	1,39,4,39,459,8,39,11,39,12,39,460,1,39,1,39,1,40,1,40,1,40,1,40,1,41,1,
	41,1,41,1,41,1,42,1,42,1,43,1,43,1,43,1,43,4,43,479,8,43,11,43,12,43,480,
	1,43,1,43,1,43,1,43,5,43,487,8,43,10,43,12,43,490,9,43,3,43,492,8,43,1,
	44,1,44,1,44,3,44,497,8,44,1,44,1,44,1,45,1,45,1,45,1,45,1,45,1,45,1,45,
	1,45,5,45,509,8,45,10,45,12,45,512,9,45,1,45,1,45,1,46,1,46,1,46,1,46,1,
	47,1,47,1,47,5,47,523,8,47,10,47,12,47,526,9,47,1,48,1,48,1,48,1,49,1,49,
	1,49,1,50,1,50,1,50,1,50,1,50,1,50,4,50,540,8,50,11,50,12,50,541,4,50,544,
	8,50,11,50,12,50,545,1,50,1,50,1,50,0,1,52,51,0,2,4,6,8,10,12,14,16,18,
	20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,
	68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,0,10,1,0,36,37,2,0,
	37,37,40,40,2,0,34,34,37,37,1,0,30,31,1,0,28,29,1,0,26,27,2,0,25,25,29,
	29,1,0,37,39,2,0,16,16,36,36,2,0,36,37,40,40,584,0,104,1,0,0,0,2,129,1,
	0,0,0,4,132,1,0,0,0,6,136,1,0,0,0,8,148,1,0,0,0,10,160,1,0,0,0,12,164,1,
	0,0,0,14,177,1,0,0,0,16,179,1,0,0,0,18,182,1,0,0,0,20,184,1,0,0,0,22,189,
	1,0,0,0,24,201,1,0,0,0,26,223,1,0,0,0,28,233,1,0,0,0,30,235,1,0,0,0,32,
	249,1,0,0,0,34,251,1,0,0,0,36,259,1,0,0,0,38,261,1,0,0,0,40,271,1,0,0,0,
	42,273,1,0,0,0,44,277,1,0,0,0,46,304,1,0,0,0,48,306,1,0,0,0,50,310,1,0,
	0,0,52,328,1,0,0,0,54,345,1,0,0,0,56,347,1,0,0,0,58,354,1,0,0,0,60,357,
	1,0,0,0,62,361,1,0,0,0,64,366,1,0,0,0,66,386,1,0,0,0,68,417,1,0,0,0,70,
	419,1,0,0,0,72,433,1,0,0,0,74,435,1,0,0,0,76,438,1,0,0,0,78,451,1,0,0,0,
	80,464,1,0,0,0,82,468,1,0,0,0,84,472,1,0,0,0,86,491,1,0,0,0,88,493,1,0,
	0,0,90,500,1,0,0,0,92,515,1,0,0,0,94,519,1,0,0,0,96,527,1,0,0,0,98,530,
	1,0,0,0,100,533,1,0,0,0,102,105,3,2,1,0,103,105,5,44,0,0,104,102,1,0,0,
	0,104,103,1,0,0,0,105,106,1,0,0,0,106,104,1,0,0,0,106,107,1,0,0,0,107,108,
	1,0,0,0,108,109,5,0,0,1,109,1,1,0,0,0,110,130,3,12,6,0,111,130,3,24,12,
	0,112,130,3,22,11,0,113,130,3,20,10,0,114,130,3,42,21,0,115,130,3,48,24,
	0,116,130,3,8,4,0,117,130,3,50,25,0,118,130,3,40,20,0,119,130,3,64,32,0,
	120,130,3,94,47,0,121,130,3,96,48,0,122,130,3,98,49,0,123,130,3,100,50,
	0,124,130,3,70,35,0,125,130,3,30,15,0,126,130,3,4,2,0,127,130,3,90,45,0,
	128,130,3,62,31,0,129,110,1,0,0,0,129,111,1,0,0,0,129,112,1,0,0,0,129,113,
	1,0,0,0,129,114,1,0,0,0,129,115,1,0,0,0,129,116,1,0,0,0,129,117,1,0,0,0,
	129,118,1,0,0,0,129,119,1,0,0,0,129,120,1,0,0,0,129,121,1,0,0,0,129,122,
	1,0,0,0,129,123,1,0,0,0,129,124,1,0,0,0,129,125,1,0,0,0,129,126,1,0,0,0,
	129,127,1,0,0,0,129,128,1,0,0,0,130,3,1,0,0,0,131,133,3,6,3,0,132,131,1,
	0,0,0,133,134,1,0,0,0,134,132,1,0,0,0,134,135,1,0,0,0,135,5,1,0,0,0,136,
	137,5,11,0,0,137,138,5,1,0,0,138,139,5,44,0,0,139,142,5,46,0,0,140,143,
	5,44,0,0,141,143,3,2,1,0,142,140,1,0,0,0,142,141,1,0,0,0,143,144,1,0,0,
	0,144,142,1,0,0,0,144,145,1,0,0,0,145,146,1,0,0,0,146,147,5,47,0,0,147,
	7,1,0,0,0,148,149,3,70,35,0,149,150,5,1,0,0,150,151,5,44,0,0,151,154,5,
	46,0,0,152,155,5,44,0,0,153,155,3,10,5,0,154,152,1,0,0,0,154,153,1,0,0,
	0,155,156,1,0,0,0,156,154,1,0,0,0,156,157,1,0,0,0,157,158,1,0,0,0,158,159,
	5,47,0,0,159,9,1,0,0,0,160,161,7,0,0,0,161,162,5,1,0,0,162,163,3,58,29,
	0,163,11,1,0,0,0,164,165,5,17,0,0,165,167,3,52,26,0,166,168,3,16,8,0,167,
	166,1,0,0,0,167,168,1,0,0,0,168,170,1,0,0,0,169,171,5,36,0,0,170,169,1,
	0,0,0,170,171,1,0,0,0,171,13,1,0,0,0,172,174,3,52,26,0,173,175,3,16,8,0,
	174,173,1,0,0,0,174,175,1,0,0,0,175,178,1,0,0,0,176,178,3,16,8,0,177,172,
	1,0,0,0,177,176,1,0,0,0,178,15,1,0,0,0,179,180,5,16,0,0,180,181,7,1,0,0,
	181,17,1,0,0,0,182,183,7,1,0,0,183,19,1,0,0,0,184,185,5,18,0,0,185,187,
	3,14,7,0,186,188,5,36,0,0,187,186,1,0,0,0,187,188,1,0,0,0,188,21,1,0,0,
	0,189,190,5,19,0,0,190,195,3,14,7,0,191,192,5,2,0,0,192,194,3,14,7,0,193,
	191,1,0,0,0,194,197,1,0,0,0,195,193,1,0,0,0,195,196,1,0,0,0,196,199,1,0,
	0,0,197,195,1,0,0,0,198,200,5,36,0,0,199,198,1,0,0,0,199,200,1,0,0,0,200,
	23,1,0,0,0,201,202,5,18,0,0,202,203,3,14,7,0,203,204,5,19,0,0,204,209,3,
	14,7,0,205,206,5,2,0,0,206,208,3,14,7,0,207,205,1,0,0,0,208,211,1,0,0,0,
	209,207,1,0,0,0,209,210,1,0,0,0,210,212,1,0,0,0,211,209,1,0,0,0,212,213,
	5,1,0,0,213,214,5,44,0,0,214,217,5,46,0,0,215,218,5,44,0,0,216,218,3,26,
	13,0,217,215,1,0,0,0,217,216,1,0,0,0,218,219,1,0,0,0,219,217,1,0,0,0,219,
	220,1,0,0,0,220,221,1,0,0,0,221,222,5,47,0,0,222,25,1,0,0,0,223,224,3,18,
	9,0,224,225,5,1,0,0,225,230,3,28,14,0,226,227,5,2,0,0,227,229,3,28,14,0,
	228,226,1,0,0,0,229,232,1,0,0,0,230,228,1,0,0,0,230,231,1,0,0,0,231,27,
	1,0,0,0,232,230,1,0,0,0,233,234,7,2,0,0,234,29,1,0,0,0,235,236,3,20,10,
	0,236,237,5,1,0,0,237,238,5,44,0,0,238,241,5,46,0,0,239,242,5,44,0,0,240,
	242,3,32,16,0,241,239,1,0,0,0,241,240,1,0,0,0,242,243,1,0,0,0,243,241,1,
	0,0,0,243,244,1,0,0,0,244,245,1,0,0,0,245,246,5,47,0,0,246,31,1,0,0,0,247,
	250,3,2,1,0,248,250,3,34,17,0,249,247,1,0,0,0,249,248,1,0,0,0,250,33,1,
	0,0,0,251,252,3,18,9,0,252,255,5,1,0,0,253,256,3,36,18,0,254,256,3,38,19,
	0,255,253,1,0,0,0,255,254,1,0,0,0,256,35,1,0,0,0,257,260,3,2,1,0,258,260,
	5,34,0,0,259,257,1,0,0,0,259,258,1,0,0,0,260,37,1,0,0,0,261,262,5,44,0,
	0,262,265,5,46,0,0,263,266,5,44,0,0,264,266,3,2,1,0,265,263,1,0,0,0,265,
	264,1,0,0,0,266,267,1,0,0,0,267,265,1,0,0,0,267,268,1,0,0,0,268,269,1,0,
	0,0,269,270,5,47,0,0,270,39,1,0,0,0,271,272,5,10,0,0,272,41,1,0,0,0,273,
	274,3,70,35,0,274,275,5,3,0,0,275,276,3,52,26,0,276,43,1,0,0,0,277,278,
	5,36,0,0,278,279,5,3,0,0,279,280,3,52,26,0,280,45,1,0,0,0,281,286,3,52,
	26,0,282,283,5,2,0,0,283,285,3,52,26,0,284,282,1,0,0,0,285,288,1,0,0,0,
	286,284,1,0,0,0,286,287,1,0,0,0,287,293,1,0,0,0,288,286,1,0,0,0,289,290,
	5,2,0,0,290,292,3,44,22,0,291,289,1,0,0,0,292,295,1,0,0,0,293,291,1,0,0,
	0,293,294,1,0,0,0,294,305,1,0,0,0,295,293,1,0,0,0,296,301,3,44,22,0,297,
	298,5,2,0,0,298,300,3,44,22,0,299,297,1,0,0,0,300,303,1,0,0,0,301,299,1,
	0,0,0,301,302,1,0,0,0,302,305,1,0,0,0,303,301,1,0,0,0,304,281,1,0,0,0,304,
	296,1,0,0,0,305,47,1,0,0,0,306,307,3,70,35,0,307,308,5,3,0,0,308,309,3,
	52,26,0,309,49,1,0,0,0,310,311,5,4,0,0,311,312,5,36,0,0,312,313,5,3,0,0,
	313,314,3,52,26,0,314,51,1,0,0,0,315,316,6,26,-1,0,316,317,3,56,28,0,317,
	318,3,52,26,10,318,329,1,0,0,0,319,329,5,36,0,0,320,329,3,70,35,0,321,329,
	3,76,38,0,322,329,3,78,39,0,323,329,3,58,29,0,324,325,5,32,0,0,325,326,
	3,52,26,0,326,327,5,33,0,0,327,329,1,0,0,0,328,315,1,0,0,0,328,319,1,0,
	0,0,328,320,1,0,0,0,328,321,1,0,0,0,328,322,1,0,0,0,328,323,1,0,0,0,328,
	324,1,0,0,0,329,342,1,0,0,0,330,331,10,9,0,0,331,332,7,3,0,0,332,341,3,
	52,26,10,333,334,10,8,0,0,334,335,7,4,0,0,335,341,3,52,26,9,336,337,10,
	2,0,0,337,338,3,54,27,0,338,339,3,52,26,3,339,341,1,0,0,0,340,330,1,0,0,
	0,340,333,1,0,0,0,340,336,1,0,0,0,341,344,1,0,0,0,342,340,1,0,0,0,342,343,
	1,0,0,0,343,53,1,0,0,0,344,342,1,0,0,0,345,346,7,5,0,0,346,55,1,0,0,0,347,
	348,7,6,0,0,348,57,1,0,0,0,349,355,3,60,30,0,350,355,5,40,0,0,351,355,5,
	41,0,0,352,355,5,35,0,0,353,355,3,92,46,0,354,349,1,0,0,0,354,350,1,0,0,
	0,354,351,1,0,0,0,354,352,1,0,0,0,354,353,1,0,0,0,355,59,1,0,0,0,356,358,
	5,29,0,0,357,356,1,0,0,0,357,358,1,0,0,0,358,359,1,0,0,0,359,360,7,7,0,
	0,360,61,1,0,0,0,361,362,5,5,0,0,362,363,5,32,0,0,363,364,3,52,26,0,364,
	365,5,33,0,0,365,63,1,0,0,0,366,367,5,22,0,0,367,368,5,36,0,0,368,370,5,
	32,0,0,369,371,3,68,34,0,370,369,1,0,0,0,370,371,1,0,0,0,371,372,1,0,0,
	0,372,373,5,33,0,0,373,374,5,1,0,0,374,375,5,44,0,0,375,378,5,46,0,0,376,
	379,5,44,0,0,377,379,3,66,33,0,378,376,1,0,0,0,378,377,1,0,0,0,379,380,
	1,0,0,0,380,378,1,0,0,0,380,381,1,0,0,0,381,382,1,0,0,0,382,383,5,47,0,
	0,383,65,1,0,0,0,384,387,3,2,1,0,385,387,3,74,37,0,386,384,1,0,0,0,386,
	385,1,0,0,0,387,67,1,0,0,0,388,393,5,36,0,0,389,390,5,2,0,0,390,392,5,36,
	0,0,391,389,1,0,0,0,392,395,1,0,0,0,393,391,1,0,0,0,393,394,1,0,0,0,394,
	402,1,0,0,0,395,393,1,0,0,0,396,397,5,2,0,0,397,398,5,36,0,0,398,399,5,
	3,0,0,399,401,3,58,29,0,400,396,1,0,0,0,401,404,1,0,0,0,402,400,1,0,0,0,
	402,403,1,0,0,0,403,418,1,0,0,0,404,402,1,0,0,0,405,406,5,36,0,0,406,407,
	5,3,0,0,407,414,3,58,29,0,408,409,5,2,0,0,409,410,5,36,0,0,410,411,5,3,
	0,0,411,413,3,58,29,0,412,408,1,0,0,0,413,416,1,0,0,0,414,412,1,0,0,0,414,
	415,1,0,0,0,415,418,1,0,0,0,416,414,1,0,0,0,417,388,1,0,0,0,417,405,1,0,
	0,0,418,69,1,0,0,0,419,423,5,36,0,0,420,422,3,72,36,0,421,420,1,0,0,0,422,
	425,1,0,0,0,423,421,1,0,0,0,423,424,1,0,0,0,424,71,1,0,0,0,425,423,1,0,
	0,0,426,428,5,32,0,0,427,429,3,46,23,0,428,427,1,0,0,0,428,429,1,0,0,0,
	429,430,1,0,0,0,430,434,5,33,0,0,431,432,5,6,0,0,432,434,5,36,0,0,433,426,
	1,0,0,0,433,431,1,0,0,0,434,73,1,0,0,0,435,436,5,21,0,0,436,437,3,52,26,
	0,437,75,1,0,0,0,438,439,5,12,0,0,439,440,5,13,0,0,440,441,5,1,0,0,441,
	442,5,44,0,0,442,445,5,46,0,0,443,446,5,44,0,0,444,446,3,82,41,0,445,443,
	1,0,0,0,445,444,1,0,0,0,446,447,1,0,0,0,447,445,1,0,0,0,447,448,1,0,0,0,
	448,449,1,0,0,0,449,450,5,47,0,0,450,77,1,0,0,0,451,452,5,12,0,0,452,453,
	5,14,0,0,453,454,5,1,0,0,454,455,5,44,0,0,455,458,5,46,0,0,456,459,5,44,
	0,0,457,459,3,80,40,0,458,456,1,0,0,0,458,457,1,0,0,0,459,460,1,0,0,0,460,
	458,1,0,0,0,460,461,1,0,0,0,461,462,1,0,0,0,462,463,5,47,0,0,463,79,1,0,
	0,0,464,465,7,8,0,0,465,466,5,1,0,0,466,467,3,46,23,0,467,81,1,0,0,0,468,
	469,3,84,42,0,469,470,5,1,0,0,470,471,3,86,43,0,471,83,1,0,0,0,472,473,
	7,9,0,0,473,85,1,0,0,0,474,475,5,44,0,0,475,478,5,46,0,0,476,479,5,44,0,
	0,477,479,3,82,41,0,478,476,1,0,0,0,478,477,1,0,0,0,479,480,1,0,0,0,480,
	478,1,0,0,0,480,481,1,0,0,0,481,482,1,0,0,0,482,492,5,47,0,0,483,488,3,
	52,26,0,484,485,5,2,0,0,485,487,3,52,26,0,486,484,1,0,0,0,487,490,1,0,0,
	0,488,486,1,0,0,0,488,489,1,0,0,0,489,492,1,0,0,0,490,488,1,0,0,0,491,474,
	1,0,0,0,491,483,1,0,0,0,492,87,1,0,0,0,493,496,5,32,0,0,494,497,3,2,1,0,
	495,497,3,52,26,0,496,494,1,0,0,0,496,495,1,0,0,0,497,498,1,0,0,0,498,499,
	5,33,0,0,499,89,1,0,0,0,500,501,5,7,0,0,501,502,5,36,0,0,502,503,5,3,0,
	0,503,510,3,58,29,0,504,505,5,2,0,0,505,506,5,36,0,0,506,507,5,3,0,0,507,
	509,3,58,29,0,508,504,1,0,0,0,509,512,1,0,0,0,510,508,1,0,0,0,510,511,1,
	0,0,0,511,513,1,0,0,0,512,510,1,0,0,0,513,514,5,8,0,0,514,91,1,0,0,0,515,
	516,5,7,0,0,516,517,5,37,0,0,517,518,5,8,0,0,518,93,1,0,0,0,519,520,5,15,
	0,0,520,524,5,36,0,0,521,523,7,0,0,0,522,521,1,0,0,0,523,526,1,0,0,0,524,
	522,1,0,0,0,524,525,1,0,0,0,525,95,1,0,0,0,526,524,1,0,0,0,527,528,5,20,
	0,0,528,529,5,36,0,0,529,97,1,0,0,0,530,531,5,23,0,0,531,532,5,36,0,0,532,
	99,1,0,0,0,533,534,5,9,0,0,534,535,5,1,0,0,535,536,5,44,0,0,536,543,5,46,
	0,0,537,544,5,44,0,0,538,540,3,2,1,0,539,538,1,0,0,0,540,541,1,0,0,0,541,
	539,1,0,0,0,541,542,1,0,0,0,542,544,1,0,0,0,543,537,1,0,0,0,543,539,1,0,
	0,0,544,545,1,0,0,0,545,543,1,0,0,0,545,546,1,0,0,0,546,547,1,0,0,0,547,
	548,5,47,0,0,548,101,1,0,0,0,60,104,106,129,134,142,144,154,156,167,170,
	174,177,187,195,199,209,217,219,230,241,243,249,255,259,265,267,286,293,
	301,304,328,340,342,354,357,370,378,380,386,393,402,414,417,423,428,433,
	445,447,458,460,478,480,488,491,496,510,524,541,543,545];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!CircuitScriptParser.__ATN) {
			CircuitScriptParser.__ATN = new ATNDeserializer().deserialize(CircuitScriptParser._serializedATN);
		}

		return CircuitScriptParser.__ATN;
	}


	static DecisionsToDFA = CircuitScriptParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class ScriptContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public EOF(): TerminalNode {
		return this.getToken(CircuitScriptParser.EOF, 0);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public NEWLINE_list(): TerminalNode[] {
	    	return this.getTokens(CircuitScriptParser.NEWLINE);
	}
	public NEWLINE(i: number): TerminalNode {
		return this.getToken(CircuitScriptParser.NEWLINE, i);
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_script;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitScript) {
			return visitor.visitScript(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public add_component_expr(): Add_component_exprContext {
		return this.getTypedRuleContext(Add_component_exprContext, 0) as Add_component_exprContext;
	}
	public at_to_multiple_expr(): At_to_multiple_exprContext {
		return this.getTypedRuleContext(At_to_multiple_exprContext, 0) as At_to_multiple_exprContext;
	}
	public to_component_expr(): To_component_exprContext {
		return this.getTypedRuleContext(To_component_exprContext, 0) as To_component_exprContext;
	}
	public at_component_expr(): At_component_exprContext {
		return this.getTypedRuleContext(At_component_exprContext, 0) as At_component_exprContext;
	}
	public assignment_expr(): Assignment_exprContext {
		return this.getTypedRuleContext(Assignment_exprContext, 0) as Assignment_exprContext;
	}
	public property_set_expr(): Property_set_exprContext {
		return this.getTypedRuleContext(Property_set_exprContext, 0) as Property_set_exprContext;
	}
	public property_set_expr2(): Property_set_expr2Context {
		return this.getTypedRuleContext(Property_set_expr2Context, 0) as Property_set_expr2Context;
	}
	public double_dot_property_set_expr(): Double_dot_property_set_exprContext {
		return this.getTypedRuleContext(Double_dot_property_set_exprContext, 0) as Double_dot_property_set_exprContext;
	}
	public break_keyword(): Break_keywordContext {
		return this.getTypedRuleContext(Break_keywordContext, 0) as Break_keywordContext;
	}
	public function_def_expr(): Function_def_exprContext {
		return this.getTypedRuleContext(Function_def_exprContext, 0) as Function_def_exprContext;
	}
	public wire_expr(): Wire_exprContext {
		return this.getTypedRuleContext(Wire_exprContext, 0) as Wire_exprContext;
	}
	public point_expr(): Point_exprContext {
		return this.getTypedRuleContext(Point_exprContext, 0) as Point_exprContext;
	}
	public import_expr(): Import_exprContext {
		return this.getTypedRuleContext(Import_exprContext, 0) as Import_exprContext;
	}
	public frame_expr(): Frame_exprContext {
		return this.getTypedRuleContext(Frame_exprContext, 0) as Frame_exprContext;
	}
	public atom_expr(): Atom_exprContext {
		return this.getTypedRuleContext(Atom_exprContext, 0) as Atom_exprContext;
	}
	public at_block(): At_blockContext {
		return this.getTypedRuleContext(At_blockContext, 0) as At_blockContext;
	}
	public branch_blocks(): Branch_blocksContext {
		return this.getTypedRuleContext(Branch_blocksContext, 0) as Branch_blocksContext;
	}
	public style_expr(): Style_exprContext {
		return this.getTypedRuleContext(Style_exprContext, 0) as Style_exprContext;
	}
	public print_expr(): Print_exprContext {
		return this.getTypedRuleContext(Print_exprContext, 0) as Print_exprContext;
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_expression;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitExpression) {
			return visitor.visitExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Branch_blocksContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public branch_block_inner_list(): Branch_block_innerContext[] {
		return this.getTypedRuleContexts(Branch_block_innerContext) as Branch_block_innerContext[];
	}
	public branch_block_inner(i: number): Branch_block_innerContext {
		return this.getTypedRuleContext(Branch_block_innerContext, i) as Branch_block_innerContext;
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_branch_blocks;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitBranch_blocks) {
			return visitor.visitBranch_blocks(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Branch_block_innerContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Branch(): TerminalNode {
		return this.getToken(CircuitScriptParser.Branch, 0);
	}
	public NEWLINE_list(): TerminalNode[] {
	    	return this.getTokens(CircuitScriptParser.NEWLINE);
	}
	public NEWLINE(i: number): TerminalNode {
		return this.getToken(CircuitScriptParser.NEWLINE, i);
	}
	public INDENT(): TerminalNode {
		return this.getToken(CircuitScriptParser.INDENT, 0);
	}
	public DEDENT(): TerminalNode {
		return this.getToken(CircuitScriptParser.DEDENT, 0);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_branch_block_inner;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitBranch_block_inner) {
			return visitor.visitBranch_block_inner(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Property_set_expr2Context extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public atom_expr(): Atom_exprContext {
		return this.getTypedRuleContext(Atom_exprContext, 0) as Atom_exprContext;
	}
	public NEWLINE_list(): TerminalNode[] {
	    	return this.getTokens(CircuitScriptParser.NEWLINE);
	}
	public NEWLINE(i: number): TerminalNode {
		return this.getToken(CircuitScriptParser.NEWLINE, i);
	}
	public INDENT(): TerminalNode {
		return this.getToken(CircuitScriptParser.INDENT, 0);
	}
	public DEDENT(): TerminalNode {
		return this.getToken(CircuitScriptParser.DEDENT, 0);
	}
	public assignment_expr2_list(): Assignment_expr2Context[] {
		return this.getTypedRuleContexts(Assignment_expr2Context) as Assignment_expr2Context[];
	}
	public assignment_expr2(i: number): Assignment_expr2Context {
		return this.getTypedRuleContext(Assignment_expr2Context, i) as Assignment_expr2Context;
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_property_set_expr2;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitProperty_set_expr2) {
			return visitor.visitProperty_set_expr2(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Assignment_expr2Context extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public value_expr(): Value_exprContext {
		return this.getTypedRuleContext(Value_exprContext, 0) as Value_exprContext;
	}
	public ID(): TerminalNode {
		return this.getToken(CircuitScriptParser.ID, 0);
	}
	public INTEGER_VALUE(): TerminalNode {
		return this.getToken(CircuitScriptParser.INTEGER_VALUE, 0);
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_assignment_expr2;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitAssignment_expr2) {
			return visitor.visitAssignment_expr2(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Add_component_exprContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Add(): TerminalNode {
		return this.getToken(CircuitScriptParser.Add, 0);
	}
	public data_expr(): Data_exprContext {
		return this.getTypedRuleContext(Data_exprContext, 0) as Data_exprContext;
	}
	public pin_select_expr(): Pin_select_exprContext {
		return this.getTypedRuleContext(Pin_select_exprContext, 0) as Pin_select_exprContext;
	}
	public ID(): TerminalNode {
		return this.getToken(CircuitScriptParser.ID, 0);
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_add_component_expr;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitAdd_component_expr) {
			return visitor.visitAdd_component_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Component_select_exprContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public data_expr(): Data_exprContext {
		return this.getTypedRuleContext(Data_exprContext, 0) as Data_exprContext;
	}
	public pin_select_expr(): Pin_select_exprContext {
		return this.getTypedRuleContext(Pin_select_exprContext, 0) as Pin_select_exprContext;
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_component_select_expr;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitComponent_select_expr) {
			return visitor.visitComponent_select_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Pin_select_exprContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Pin(): TerminalNode {
		return this.getToken(CircuitScriptParser.Pin, 0);
	}
	public INTEGER_VALUE(): TerminalNode {
		return this.getToken(CircuitScriptParser.INTEGER_VALUE, 0);
	}
	public STRING_VALUE(): TerminalNode {
		return this.getToken(CircuitScriptParser.STRING_VALUE, 0);
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_pin_select_expr;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitPin_select_expr) {
			return visitor.visitPin_select_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Pin_select_expr2Context extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public INTEGER_VALUE(): TerminalNode {
		return this.getToken(CircuitScriptParser.INTEGER_VALUE, 0);
	}
	public STRING_VALUE(): TerminalNode {
		return this.getToken(CircuitScriptParser.STRING_VALUE, 0);
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_pin_select_expr2;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitPin_select_expr2) {
			return visitor.visitPin_select_expr2(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class At_component_exprContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public At(): TerminalNode {
		return this.getToken(CircuitScriptParser.At, 0);
	}
	public component_select_expr(): Component_select_exprContext {
		return this.getTypedRuleContext(Component_select_exprContext, 0) as Component_select_exprContext;
	}
	public ID(): TerminalNode {
		return this.getToken(CircuitScriptParser.ID, 0);
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_at_component_expr;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitAt_component_expr) {
			return visitor.visitAt_component_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class To_component_exprContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public To(): TerminalNode {
		return this.getToken(CircuitScriptParser.To, 0);
	}
	public component_select_expr_list(): Component_select_exprContext[] {
		return this.getTypedRuleContexts(Component_select_exprContext) as Component_select_exprContext[];
	}
	public component_select_expr(i: number): Component_select_exprContext {
		return this.getTypedRuleContext(Component_select_exprContext, i) as Component_select_exprContext;
	}
	public ID(): TerminalNode {
		return this.getToken(CircuitScriptParser.ID, 0);
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_to_component_expr;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitTo_component_expr) {
			return visitor.visitTo_component_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class At_to_multiple_exprContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public At(): TerminalNode {
		return this.getToken(CircuitScriptParser.At, 0);
	}
	public component_select_expr_list(): Component_select_exprContext[] {
		return this.getTypedRuleContexts(Component_select_exprContext) as Component_select_exprContext[];
	}
	public component_select_expr(i: number): Component_select_exprContext {
		return this.getTypedRuleContext(Component_select_exprContext, i) as Component_select_exprContext;
	}
	public To(): TerminalNode {
		return this.getToken(CircuitScriptParser.To, 0);
	}
	public NEWLINE_list(): TerminalNode[] {
	    	return this.getTokens(CircuitScriptParser.NEWLINE);
	}
	public NEWLINE(i: number): TerminalNode {
		return this.getToken(CircuitScriptParser.NEWLINE, i);
	}
	public INDENT(): TerminalNode {
		return this.getToken(CircuitScriptParser.INDENT, 0);
	}
	public DEDENT(): TerminalNode {
		return this.getToken(CircuitScriptParser.DEDENT, 0);
	}
	public at_to_multiple_line_expr_list(): At_to_multiple_line_exprContext[] {
		return this.getTypedRuleContexts(At_to_multiple_line_exprContext) as At_to_multiple_line_exprContext[];
	}
	public at_to_multiple_line_expr(i: number): At_to_multiple_line_exprContext {
		return this.getTypedRuleContext(At_to_multiple_line_exprContext, i) as At_to_multiple_line_exprContext;
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_at_to_multiple_expr;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitAt_to_multiple_expr) {
			return visitor.visitAt_to_multiple_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class At_to_multiple_line_exprContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public pin_select_expr2(): Pin_select_expr2Context {
		return this.getTypedRuleContext(Pin_select_expr2Context, 0) as Pin_select_expr2Context;
	}
	public at_to_multiple_line_expr_to_pin_list(): At_to_multiple_line_expr_to_pinContext[] {
		return this.getTypedRuleContexts(At_to_multiple_line_expr_to_pinContext) as At_to_multiple_line_expr_to_pinContext[];
	}
	public at_to_multiple_line_expr_to_pin(i: number): At_to_multiple_line_expr_to_pinContext {
		return this.getTypedRuleContext(At_to_multiple_line_expr_to_pinContext, i) as At_to_multiple_line_expr_to_pinContext;
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_at_to_multiple_line_expr;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitAt_to_multiple_line_expr) {
			return visitor.visitAt_to_multiple_line_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class At_to_multiple_line_expr_to_pinContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public INTEGER_VALUE(): TerminalNode {
		return this.getToken(CircuitScriptParser.INTEGER_VALUE, 0);
	}
	public NOT_CONNECTED(): TerminalNode {
		return this.getToken(CircuitScriptParser.NOT_CONNECTED, 0);
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_at_to_multiple_line_expr_to_pin;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitAt_to_multiple_line_expr_to_pin) {
			return visitor.visitAt_to_multiple_line_expr_to_pin(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class At_blockContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public at_component_expr(): At_component_exprContext {
		return this.getTypedRuleContext(At_component_exprContext, 0) as At_component_exprContext;
	}
	public NEWLINE_list(): TerminalNode[] {
	    	return this.getTokens(CircuitScriptParser.NEWLINE);
	}
	public NEWLINE(i: number): TerminalNode {
		return this.getToken(CircuitScriptParser.NEWLINE, i);
	}
	public INDENT(): TerminalNode {
		return this.getToken(CircuitScriptParser.INDENT, 0);
	}
	public DEDENT(): TerminalNode {
		return this.getToken(CircuitScriptParser.DEDENT, 0);
	}
	public at_block_expressions_list(): At_block_expressionsContext[] {
		return this.getTypedRuleContexts(At_block_expressionsContext) as At_block_expressionsContext[];
	}
	public at_block_expressions(i: number): At_block_expressionsContext {
		return this.getTypedRuleContext(At_block_expressionsContext, i) as At_block_expressionsContext;
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_at_block;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitAt_block) {
			return visitor.visitAt_block(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class At_block_expressionsContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public at_block_pin_expr(): At_block_pin_exprContext {
		return this.getTypedRuleContext(At_block_pin_exprContext, 0) as At_block_pin_exprContext;
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_at_block_expressions;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitAt_block_expressions) {
			return visitor.visitAt_block_expressions(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class At_block_pin_exprContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public pin_select_expr2(): Pin_select_expr2Context {
		return this.getTypedRuleContext(Pin_select_expr2Context, 0) as Pin_select_expr2Context;
	}
	public at_block_pin_expression_simple(): At_block_pin_expression_simpleContext {
		return this.getTypedRuleContext(At_block_pin_expression_simpleContext, 0) as At_block_pin_expression_simpleContext;
	}
	public at_block_pin_expression_complex(): At_block_pin_expression_complexContext {
		return this.getTypedRuleContext(At_block_pin_expression_complexContext, 0) as At_block_pin_expression_complexContext;
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_at_block_pin_expr;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitAt_block_pin_expr) {
			return visitor.visitAt_block_pin_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class At_block_pin_expression_simpleContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public NOT_CONNECTED(): TerminalNode {
		return this.getToken(CircuitScriptParser.NOT_CONNECTED, 0);
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_at_block_pin_expression_simple;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitAt_block_pin_expression_simple) {
			return visitor.visitAt_block_pin_expression_simple(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class At_block_pin_expression_complexContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public NEWLINE_list(): TerminalNode[] {
	    	return this.getTokens(CircuitScriptParser.NEWLINE);
	}
	public NEWLINE(i: number): TerminalNode {
		return this.getToken(CircuitScriptParser.NEWLINE, i);
	}
	public INDENT(): TerminalNode {
		return this.getToken(CircuitScriptParser.INDENT, 0);
	}
	public DEDENT(): TerminalNode {
		return this.getToken(CircuitScriptParser.DEDENT, 0);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_at_block_pin_expression_complex;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitAt_block_pin_expression_complex) {
			return visitor.visitAt_block_pin_expression_complex(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Break_keywordContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Break(): TerminalNode {
		return this.getToken(CircuitScriptParser.Break, 0);
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_break_keyword;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitBreak_keyword) {
			return visitor.visitBreak_keyword(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Assignment_exprContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public atom_expr(): Atom_exprContext {
		return this.getTypedRuleContext(Atom_exprContext, 0) as Atom_exprContext;
	}
	public data_expr(): Data_exprContext {
		return this.getTypedRuleContext(Data_exprContext, 0) as Data_exprContext;
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_assignment_expr;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitAssignment_expr) {
			return visitor.visitAssignment_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Keyword_assignment_exprContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ID(): TerminalNode {
		return this.getToken(CircuitScriptParser.ID, 0);
	}
	public data_expr(): Data_exprContext {
		return this.getTypedRuleContext(Data_exprContext, 0) as Data_exprContext;
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_keyword_assignment_expr;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitKeyword_assignment_expr) {
			return visitor.visitKeyword_assignment_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParametersContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public data_expr_list(): Data_exprContext[] {
		return this.getTypedRuleContexts(Data_exprContext) as Data_exprContext[];
	}
	public data_expr(i: number): Data_exprContext {
		return this.getTypedRuleContext(Data_exprContext, i) as Data_exprContext;
	}
	public keyword_assignment_expr_list(): Keyword_assignment_exprContext[] {
		return this.getTypedRuleContexts(Keyword_assignment_exprContext) as Keyword_assignment_exprContext[];
	}
	public keyword_assignment_expr(i: number): Keyword_assignment_exprContext {
		return this.getTypedRuleContext(Keyword_assignment_exprContext, i) as Keyword_assignment_exprContext;
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_parameters;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitParameters) {
			return visitor.visitParameters(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Property_set_exprContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public atom_expr(): Atom_exprContext {
		return this.getTypedRuleContext(Atom_exprContext, 0) as Atom_exprContext;
	}
	public data_expr(): Data_exprContext {
		return this.getTypedRuleContext(Data_exprContext, 0) as Data_exprContext;
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_property_set_expr;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitProperty_set_expr) {
			return visitor.visitProperty_set_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Double_dot_property_set_exprContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ID(): TerminalNode {
		return this.getToken(CircuitScriptParser.ID, 0);
	}
	public data_expr(): Data_exprContext {
		return this.getTypedRuleContext(Data_exprContext, 0) as Data_exprContext;
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_double_dot_property_set_expr;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitDouble_dot_property_set_expr) {
			return visitor.visitDouble_dot_property_set_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Data_exprContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_data_expr;
	}
	public copyFrom(ctx: Data_exprContext): void {
		super.copyFrom(ctx);
	}
}
export class AdditionExprContext extends Data_exprContext {
	constructor(parser: CircuitScriptParser, ctx: Data_exprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public data_expr_list(): Data_exprContext[] {
		return this.getTypedRuleContexts(Data_exprContext) as Data_exprContext[];
	}
	public data_expr(i: number): Data_exprContext {
		return this.getTypedRuleContext(Data_exprContext, i) as Data_exprContext;
	}
	public Addition(): TerminalNode {
		return this.getToken(CircuitScriptParser.Addition, 0);
	}
	public Minus(): TerminalNode {
		return this.getToken(CircuitScriptParser.Minus, 0);
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitAdditionExpr) {
			return visitor.visitAdditionExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MultiplyExprContext extends Data_exprContext {
	constructor(parser: CircuitScriptParser, ctx: Data_exprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public data_expr_list(): Data_exprContext[] {
		return this.getTypedRuleContexts(Data_exprContext) as Data_exprContext[];
	}
	public data_expr(i: number): Data_exprContext {
		return this.getTypedRuleContext(Data_exprContext, i) as Data_exprContext;
	}
	public Multiply(): TerminalNode {
		return this.getToken(CircuitScriptParser.Multiply, 0);
	}
	public Divide(): TerminalNode {
		return this.getToken(CircuitScriptParser.Divide, 0);
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitMultiplyExpr) {
			return visitor.visitMultiplyExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DataExprContext extends Data_exprContext {
	constructor(parser: CircuitScriptParser, ctx: Data_exprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public ID(): TerminalNode {
		return this.getToken(CircuitScriptParser.ID, 0);
	}
	public atom_expr(): Atom_exprContext {
		return this.getTypedRuleContext(Atom_exprContext, 0) as Atom_exprContext;
	}
	public create_component_expr(): Create_component_exprContext {
		return this.getTypedRuleContext(Create_component_exprContext, 0) as Create_component_exprContext;
	}
	public create_graphic_expr(): Create_graphic_exprContext {
		return this.getTypedRuleContext(Create_graphic_exprContext, 0) as Create_graphic_exprContext;
	}
	public value_expr(): Value_exprContext {
		return this.getTypedRuleContext(Value_exprContext, 0) as Value_exprContext;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitDataExpr) {
			return visitor.visitDataExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class UnaryOperatorExprContext extends Data_exprContext {
	constructor(parser: CircuitScriptParser, ctx: Data_exprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public unary_operator(): Unary_operatorContext {
		return this.getTypedRuleContext(Unary_operatorContext, 0) as Unary_operatorContext;
	}
	public data_expr(): Data_exprContext {
		return this.getTypedRuleContext(Data_exprContext, 0) as Data_exprContext;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitUnaryOperatorExpr) {
			return visitor.visitUnaryOperatorExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BinaryOperatorExprContext extends Data_exprContext {
	constructor(parser: CircuitScriptParser, ctx: Data_exprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public data_expr_list(): Data_exprContext[] {
		return this.getTypedRuleContexts(Data_exprContext) as Data_exprContext[];
	}
	public data_expr(i: number): Data_exprContext {
		return this.getTypedRuleContext(Data_exprContext, i) as Data_exprContext;
	}
	public binary_operator(): Binary_operatorContext {
		return this.getTypedRuleContext(Binary_operatorContext, 0) as Binary_operatorContext;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitBinaryOperatorExpr) {
			return visitor.visitBinaryOperatorExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class RoundedBracketsExprContext extends Data_exprContext {
	constructor(parser: CircuitScriptParser, ctx: Data_exprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public OPEN_PAREN(): TerminalNode {
		return this.getToken(CircuitScriptParser.OPEN_PAREN, 0);
	}
	public data_expr(): Data_exprContext {
		return this.getTypedRuleContext(Data_exprContext, 0) as Data_exprContext;
	}
	public CLOSE_PAREN(): TerminalNode {
		return this.getToken(CircuitScriptParser.CLOSE_PAREN, 0);
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitRoundedBracketsExpr) {
			return visitor.visitRoundedBracketsExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Binary_operatorContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Equals(): TerminalNode {
		return this.getToken(CircuitScriptParser.Equals, 0);
	}
	public NotEquals(): TerminalNode {
		return this.getToken(CircuitScriptParser.NotEquals, 0);
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_binary_operator;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitBinary_operator) {
			return visitor.visitBinary_operator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Unary_operatorContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Not(): TerminalNode {
		return this.getToken(CircuitScriptParser.Not, 0);
	}
	public Minus(): TerminalNode {
		return this.getToken(CircuitScriptParser.Minus, 0);
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_unary_operator;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitUnary_operator) {
			return visitor.visitUnary_operator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Value_exprContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public signed_value_expr(): Signed_value_exprContext {
		return this.getTypedRuleContext(Signed_value_exprContext, 0) as Signed_value_exprContext;
	}
	public STRING_VALUE(): TerminalNode {
		return this.getToken(CircuitScriptParser.STRING_VALUE, 0);
	}
	public PERCENTAGE_VALUE(): TerminalNode {
		return this.getToken(CircuitScriptParser.PERCENTAGE_VALUE, 0);
	}
	public BOOLEAN_VALUE(): TerminalNode {
		return this.getToken(CircuitScriptParser.BOOLEAN_VALUE, 0);
	}
	public blank_expr(): Blank_exprContext {
		return this.getTypedRuleContext(Blank_exprContext, 0) as Blank_exprContext;
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_value_expr;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitValue_expr) {
			return visitor.visitValue_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Signed_value_exprContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public NUMERIC_VALUE(): TerminalNode {
		return this.getToken(CircuitScriptParser.NUMERIC_VALUE, 0);
	}
	public DECIMAL_VALUE(): TerminalNode {
		return this.getToken(CircuitScriptParser.DECIMAL_VALUE, 0);
	}
	public INTEGER_VALUE(): TerminalNode {
		return this.getToken(CircuitScriptParser.INTEGER_VALUE, 0);
	}
	public Minus(): TerminalNode {
		return this.getToken(CircuitScriptParser.Minus, 0);
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_signed_value_expr;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitSigned_value_expr) {
			return visitor.visitSigned_value_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Print_exprContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public OPEN_PAREN(): TerminalNode {
		return this.getToken(CircuitScriptParser.OPEN_PAREN, 0);
	}
	public data_expr(): Data_exprContext {
		return this.getTypedRuleContext(Data_exprContext, 0) as Data_exprContext;
	}
	public CLOSE_PAREN(): TerminalNode {
		return this.getToken(CircuitScriptParser.CLOSE_PAREN, 0);
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_print_expr;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitPrint_expr) {
			return visitor.visitPrint_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Function_def_exprContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Define(): TerminalNode {
		return this.getToken(CircuitScriptParser.Define, 0);
	}
	public ID(): TerminalNode {
		return this.getToken(CircuitScriptParser.ID, 0);
	}
	public OPEN_PAREN(): TerminalNode {
		return this.getToken(CircuitScriptParser.OPEN_PAREN, 0);
	}
	public CLOSE_PAREN(): TerminalNode {
		return this.getToken(CircuitScriptParser.CLOSE_PAREN, 0);
	}
	public NEWLINE_list(): TerminalNode[] {
	    	return this.getTokens(CircuitScriptParser.NEWLINE);
	}
	public NEWLINE(i: number): TerminalNode {
		return this.getToken(CircuitScriptParser.NEWLINE, i);
	}
	public INDENT(): TerminalNode {
		return this.getToken(CircuitScriptParser.INDENT, 0);
	}
	public DEDENT(): TerminalNode {
		return this.getToken(CircuitScriptParser.DEDENT, 0);
	}
	public function_args_expr(): Function_args_exprContext {
		return this.getTypedRuleContext(Function_args_exprContext, 0) as Function_args_exprContext;
	}
	public function_expr_list(): Function_exprContext[] {
		return this.getTypedRuleContexts(Function_exprContext) as Function_exprContext[];
	}
	public function_expr(i: number): Function_exprContext {
		return this.getTypedRuleContext(Function_exprContext, i) as Function_exprContext;
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_function_def_expr;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitFunction_def_expr) {
			return visitor.visitFunction_def_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Function_exprContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public function_return_expr(): Function_return_exprContext {
		return this.getTypedRuleContext(Function_return_exprContext, 0) as Function_return_exprContext;
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_function_expr;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitFunction_expr) {
			return visitor.visitFunction_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Function_args_exprContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ID_list(): TerminalNode[] {
	    	return this.getTokens(CircuitScriptParser.ID);
	}
	public ID(i: number): TerminalNode {
		return this.getToken(CircuitScriptParser.ID, i);
	}
	public value_expr_list(): Value_exprContext[] {
		return this.getTypedRuleContexts(Value_exprContext) as Value_exprContext[];
	}
	public value_expr(i: number): Value_exprContext {
		return this.getTypedRuleContext(Value_exprContext, i) as Value_exprContext;
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_function_args_expr;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitFunction_args_expr) {
			return visitor.visitFunction_args_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Atom_exprContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ID(): TerminalNode {
		return this.getToken(CircuitScriptParser.ID, 0);
	}
	public trailer_expr_list(): Trailer_exprContext[] {
		return this.getTypedRuleContexts(Trailer_exprContext) as Trailer_exprContext[];
	}
	public trailer_expr(i: number): Trailer_exprContext {
		return this.getTypedRuleContext(Trailer_exprContext, i) as Trailer_exprContext;
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_atom_expr;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitAtom_expr) {
			return visitor.visitAtom_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Trailer_exprContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public OPEN_PAREN(): TerminalNode {
		return this.getToken(CircuitScriptParser.OPEN_PAREN, 0);
	}
	public CLOSE_PAREN(): TerminalNode {
		return this.getToken(CircuitScriptParser.CLOSE_PAREN, 0);
	}
	public parameters(): ParametersContext {
		return this.getTypedRuleContext(ParametersContext, 0) as ParametersContext;
	}
	public ID(): TerminalNode {
		return this.getToken(CircuitScriptParser.ID, 0);
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_trailer_expr;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitTrailer_expr) {
			return visitor.visitTrailer_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Function_return_exprContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Return(): TerminalNode {
		return this.getToken(CircuitScriptParser.Return, 0);
	}
	public data_expr(): Data_exprContext {
		return this.getTypedRuleContext(Data_exprContext, 0) as Data_exprContext;
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_function_return_expr;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitFunction_return_expr) {
			return visitor.visitFunction_return_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Create_component_exprContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Create(): TerminalNode {
		return this.getToken(CircuitScriptParser.Create, 0);
	}
	public Component(): TerminalNode {
		return this.getToken(CircuitScriptParser.Component, 0);
	}
	public NEWLINE_list(): TerminalNode[] {
	    	return this.getTokens(CircuitScriptParser.NEWLINE);
	}
	public NEWLINE(i: number): TerminalNode {
		return this.getToken(CircuitScriptParser.NEWLINE, i);
	}
	public INDENT(): TerminalNode {
		return this.getToken(CircuitScriptParser.INDENT, 0);
	}
	public DEDENT(): TerminalNode {
		return this.getToken(CircuitScriptParser.DEDENT, 0);
	}
	public property_expr_list(): Property_exprContext[] {
		return this.getTypedRuleContexts(Property_exprContext) as Property_exprContext[];
	}
	public property_expr(i: number): Property_exprContext {
		return this.getTypedRuleContext(Property_exprContext, i) as Property_exprContext;
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_create_component_expr;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitCreate_component_expr) {
			return visitor.visitCreate_component_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Create_graphic_exprContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Create(): TerminalNode {
		return this.getToken(CircuitScriptParser.Create, 0);
	}
	public Graphic(): TerminalNode {
		return this.getToken(CircuitScriptParser.Graphic, 0);
	}
	public NEWLINE_list(): TerminalNode[] {
	    	return this.getTokens(CircuitScriptParser.NEWLINE);
	}
	public NEWLINE(i: number): TerminalNode {
		return this.getToken(CircuitScriptParser.NEWLINE, i);
	}
	public INDENT(): TerminalNode {
		return this.getToken(CircuitScriptParser.INDENT, 0);
	}
	public DEDENT(): TerminalNode {
		return this.getToken(CircuitScriptParser.DEDENT, 0);
	}
	public sub_expr_list(): Sub_exprContext[] {
		return this.getTypedRuleContexts(Sub_exprContext) as Sub_exprContext[];
	}
	public sub_expr(i: number): Sub_exprContext {
		return this.getTypedRuleContext(Sub_exprContext, i) as Sub_exprContext;
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_create_graphic_expr;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitCreate_graphic_expr) {
			return visitor.visitCreate_graphic_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Sub_exprContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public parameters(): ParametersContext {
		return this.getTypedRuleContext(ParametersContext, 0) as ParametersContext;
	}
	public ID(): TerminalNode {
		return this.getToken(CircuitScriptParser.ID, 0);
	}
	public Pin(): TerminalNode {
		return this.getToken(CircuitScriptParser.Pin, 0);
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_sub_expr;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitSub_expr) {
			return visitor.visitSub_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Property_exprContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public property_key_expr(): Property_key_exprContext {
		return this.getTypedRuleContext(Property_key_exprContext, 0) as Property_key_exprContext;
	}
	public property_value_expr(): Property_value_exprContext {
		return this.getTypedRuleContext(Property_value_exprContext, 0) as Property_value_exprContext;
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_property_expr;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitProperty_expr) {
			return visitor.visitProperty_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Property_key_exprContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ID(): TerminalNode {
		return this.getToken(CircuitScriptParser.ID, 0);
	}
	public INTEGER_VALUE(): TerminalNode {
		return this.getToken(CircuitScriptParser.INTEGER_VALUE, 0);
	}
	public STRING_VALUE(): TerminalNode {
		return this.getToken(CircuitScriptParser.STRING_VALUE, 0);
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_property_key_expr;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitProperty_key_expr) {
			return visitor.visitProperty_key_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Property_value_exprContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_property_value_expr;
	}
	public copyFrom(ctx: Property_value_exprContext): void {
		super.copyFrom(ctx);
	}
}
export class Single_line_propertyContext extends Property_value_exprContext {
	constructor(parser: CircuitScriptParser, ctx: Property_value_exprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public data_expr_list(): Data_exprContext[] {
		return this.getTypedRuleContexts(Data_exprContext) as Data_exprContext[];
	}
	public data_expr(i: number): Data_exprContext {
		return this.getTypedRuleContext(Data_exprContext, i) as Data_exprContext;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitSingle_line_property) {
			return visitor.visitSingle_line_property(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class Nested_propertiesContext extends Property_value_exprContext {
	constructor(parser: CircuitScriptParser, ctx: Property_value_exprContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public NEWLINE_list(): TerminalNode[] {
	    	return this.getTokens(CircuitScriptParser.NEWLINE);
	}
	public NEWLINE(i: number): TerminalNode {
		return this.getToken(CircuitScriptParser.NEWLINE, i);
	}
	public INDENT(): TerminalNode {
		return this.getToken(CircuitScriptParser.INDENT, 0);
	}
	public DEDENT(): TerminalNode {
		return this.getToken(CircuitScriptParser.DEDENT, 0);
	}
	public property_expr_list(): Property_exprContext[] {
		return this.getTypedRuleContexts(Property_exprContext) as Property_exprContext[];
	}
	public property_expr(i: number): Property_exprContext {
		return this.getTypedRuleContext(Property_exprContext, i) as Property_exprContext;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitNested_properties) {
			return visitor.visitNested_properties(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Rounded_brackets_exprContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public OPEN_PAREN(): TerminalNode {
		return this.getToken(CircuitScriptParser.OPEN_PAREN, 0);
	}
	public CLOSE_PAREN(): TerminalNode {
		return this.getToken(CircuitScriptParser.CLOSE_PAREN, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public data_expr(): Data_exprContext {
		return this.getTypedRuleContext(Data_exprContext, 0) as Data_exprContext;
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_rounded_brackets_expr;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitRounded_brackets_expr) {
			return visitor.visitRounded_brackets_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Style_exprContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ID_list(): TerminalNode[] {
	    	return this.getTokens(CircuitScriptParser.ID);
	}
	public ID(i: number): TerminalNode {
		return this.getToken(CircuitScriptParser.ID, i);
	}
	public value_expr_list(): Value_exprContext[] {
		return this.getTypedRuleContexts(Value_exprContext) as Value_exprContext[];
	}
	public value_expr(i: number): Value_exprContext {
		return this.getTypedRuleContext(Value_exprContext, i) as Value_exprContext;
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_style_expr;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitStyle_expr) {
			return visitor.visitStyle_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Blank_exprContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public INTEGER_VALUE(): TerminalNode {
		return this.getToken(CircuitScriptParser.INTEGER_VALUE, 0);
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_blank_expr;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitBlank_expr) {
			return visitor.visitBlank_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Wire_exprContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Wire(): TerminalNode {
		return this.getToken(CircuitScriptParser.Wire, 0);
	}
	public ID_list(): TerminalNode[] {
	    	return this.getTokens(CircuitScriptParser.ID);
	}
	public ID(i: number): TerminalNode {
		return this.getToken(CircuitScriptParser.ID, i);
	}
	public INTEGER_VALUE_list(): TerminalNode[] {
	    	return this.getTokens(CircuitScriptParser.INTEGER_VALUE);
	}
	public INTEGER_VALUE(i: number): TerminalNode {
		return this.getToken(CircuitScriptParser.INTEGER_VALUE, i);
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_wire_expr;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitWire_expr) {
			return visitor.visitWire_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Point_exprContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Point(): TerminalNode {
		return this.getToken(CircuitScriptParser.Point, 0);
	}
	public ID(): TerminalNode {
		return this.getToken(CircuitScriptParser.ID, 0);
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_point_expr;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitPoint_expr) {
			return visitor.visitPoint_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Import_exprContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Import(): TerminalNode {
		return this.getToken(CircuitScriptParser.Import, 0);
	}
	public ID(): TerminalNode {
		return this.getToken(CircuitScriptParser.ID, 0);
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_import_expr;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitImport_expr) {
			return visitor.visitImport_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Frame_exprContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public NEWLINE_list(): TerminalNode[] {
	    	return this.getTokens(CircuitScriptParser.NEWLINE);
	}
	public NEWLINE(i: number): TerminalNode {
		return this.getToken(CircuitScriptParser.NEWLINE, i);
	}
	public INDENT(): TerminalNode {
		return this.getToken(CircuitScriptParser.INDENT, 0);
	}
	public DEDENT(): TerminalNode {
		return this.getToken(CircuitScriptParser.DEDENT, 0);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_frame_expr;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitFrame_expr) {
			return visitor.visitFrame_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
