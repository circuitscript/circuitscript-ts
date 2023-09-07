// Generated from CircuitScript.g4 by ANTLR 4.13.1
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
	public static readonly T__9 = 10;
	public static readonly T__10 = 11;
	public static readonly T__11 = 12;
	public static readonly T__12 = 13;
	public static readonly T__13 = 14;
	public static readonly T__14 = 15;
	public static readonly T__15 = 16;
	public static readonly T__16 = 17;
	public static readonly T__17 = 18;
	public static readonly T__18 = 19;
	public static readonly NOT_CONNECTED = 20;
	public static readonly DECORATOR = 21;
	public static readonly ID = 22;
	public static readonly INSTANCE_NAME_WITH_PROPERTY = 23;
	public static readonly INTEGER_VALUE = 24;
	public static readonly NUMERIC_VALUE = 25;
	public static readonly STRING_VALUE = 26;
	public static readonly PERCENTAGE_VALUE = 27;
	public static readonly ALPHA_NUMERIC = 28;
	public static readonly OPERATOR = 29;
	public static readonly WS = 30;
	public static readonly NEWLINE = 31;
	public static readonly SKIP_ = 32;
	public static readonly INDENT = 33;
	public static readonly DEDENT = 34;
	public static readonly EOF = Token.EOF;
	public static readonly RULE_script = 0;
	public static readonly RULE_expression = 1;
	public static readonly RULE_branch_blocks = 2;
	public static readonly RULE_branch_block_inner = 3;
	public static readonly RULE_section_block = 4;
	public static readonly RULE_property_set_expr2 = 5;
	public static readonly RULE_assignment_expr2 = 6;
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
	public static readonly RULE_data_expr = 26;
	public static readonly RULE_value_expr = 27;
	public static readonly RULE_function_def_expr = 28;
	public static readonly RULE_function_expr = 29;
	public static readonly RULE_function_args_expr = 30;
	public static readonly RULE_function_call_expr = 31;
	public static readonly RULE_function_return_expr = 32;
	public static readonly RULE_create_component_expr = 33;
	public static readonly RULE_property_expr = 34;
	public static readonly RULE_property_key_expr = 35;
	public static readonly RULE_property_value_expr = 36;
	public static readonly RULE_decorator_expr = 37;
	public static readonly RULE_style_expr = 38;
	public static readonly RULE_wire_expr = 39;
	public static readonly literalNames: (string | null)[] = [ null, "'branch'", 
                                                            "':'", "'section'", 
                                                            "'add'", "'pin'", 
                                                            "'at'", "'to'", 
                                                            "','", "'break'", 
                                                            "'='", "'def'", 
                                                            "'('", "')'", 
                                                            "'return'", 
                                                            "'create'", 
                                                            "'component'", 
                                                            "'['", "']'", 
                                                            "'wire'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             "NOT_CONNECTED", 
                                                             "DECORATOR", 
                                                             "ID", "INSTANCE_NAME_WITH_PROPERTY", 
                                                             "INTEGER_VALUE", 
                                                             "NUMERIC_VALUE", 
                                                             "STRING_VALUE", 
                                                             "PERCENTAGE_VALUE", 
                                                             "ALPHA_NUMERIC", 
                                                             "OPERATOR", 
                                                             "WS", "NEWLINE", 
                                                             "SKIP_", "INDENT", 
                                                             "DEDENT" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"script", "expression", "branch_blocks", "branch_block_inner", "section_block", 
		"property_set_expr2", "assignment_expr2", "add_component_expr", "component_select_expr", 
		"pin_select_expr", "pin_select_expr2", "at_component_expr", "to_component_expr", 
		"at_to_multiple_expr", "at_to_multiple_line_expr", "at_to_multiple_line_expr_to_pin", 
		"at_block", "at_block_expressions", "at_block_pin_expr", "at_block_pin_expression_simple", 
		"at_block_pin_expression_complex", "break_keyword", "assignment_expr", 
		"keyword_assignment_expr", "parameters", "property_set_expr", "data_expr", 
		"value_expr", "function_def_expr", "function_expr", "function_args_expr", 
		"function_call_expr", "function_return_expr", "create_component_expr", 
		"property_expr", "property_key_expr", "property_value_expr", "decorator_expr", 
		"style_expr", "wire_expr",
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
			this.state = 82;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				this.state = 82;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 1:
				case 3:
				case 4:
				case 6:
				case 7:
				case 9:
				case 11:
				case 17:
				case 19:
				case 21:
				case 22:
				case 23:
					{
					this.state = 80;
					this.expression();
					}
					break;
				case 31:
					{
					this.state = 81;
					this.match(CircuitScriptParser.NEWLINE);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 84;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2162821850) !== 0));
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
			this.state = 102;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 2, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 86;
				this.add_component_expr();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 87;
				this.at_to_multiple_expr();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 88;
				this.to_component_expr();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 89;
				this.at_component_expr();
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 90;
				this.property_set_expr();
				}
				break;
			case 6:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 91;
				this.property_set_expr2();
				}
				break;
			case 7:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 92;
				this.break_keyword();
				}
				break;
			case 8:
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 93;
				this.function_def_expr();
				}
				break;
			case 9:
				this.enterOuterAlt(localctx, 9);
				{
				this.state = 94;
				this.function_call_expr();
				}
				break;
			case 10:
				this.enterOuterAlt(localctx, 10);
				{
				this.state = 95;
				this.assignment_expr();
				}
				break;
			case 11:
				this.enterOuterAlt(localctx, 11);
				{
				this.state = 96;
				this.wire_expr();
				}
				break;
			case 12:
				this.enterOuterAlt(localctx, 12);
				{
				this.state = 97;
				this.at_block();
				}
				break;
			case 13:
				this.enterOuterAlt(localctx, 13);
				{
				this.state = 98;
				this.branch_blocks();
				}
				break;
			case 14:
				this.enterOuterAlt(localctx, 14);
				{
				this.state = 99;
				this.section_block();
				}
				break;
			case 15:
				this.enterOuterAlt(localctx, 15);
				{
				this.state = 100;
				this.decorator_expr();
				}
				break;
			case 16:
				this.enterOuterAlt(localctx, 16);
				{
				this.state = 101;
				this.style_expr();
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
			this.state = 105;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 104;
					this.branch_block_inner();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 107;
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
			this.state = 109;
			this.match(CircuitScriptParser.T__0);
			this.state = 110;
			this.match(CircuitScriptParser.T__1);
			this.state = 111;
			this.match(CircuitScriptParser.INDENT);
			this.state = 114;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				this.state = 114;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 31:
					{
					this.state = 112;
					this.match(CircuitScriptParser.NEWLINE);
					}
					break;
				case 1:
				case 3:
				case 4:
				case 6:
				case 7:
				case 9:
				case 11:
				case 17:
				case 19:
				case 21:
				case 22:
				case 23:
					{
					this.state = 113;
					this.expression();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 116;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2162821850) !== 0));
			this.state = 118;
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
	public section_block(): Section_blockContext {
		let localctx: Section_blockContext = new Section_blockContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, CircuitScriptParser.RULE_section_block);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 120;
			this.match(CircuitScriptParser.T__2);
			this.state = 122;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===26) {
				{
				this.state = 121;
				this.match(CircuitScriptParser.STRING_VALUE);
				}
			}

			this.state = 124;
			this.match(CircuitScriptParser.T__1);
			this.state = 125;
			this.match(CircuitScriptParser.INDENT);
			this.state = 128;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				this.state = 128;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 31:
					{
					this.state = 126;
					this.match(CircuitScriptParser.NEWLINE);
					}
					break;
				case 1:
				case 3:
				case 4:
				case 6:
				case 7:
				case 9:
				case 11:
				case 17:
				case 19:
				case 21:
				case 22:
				case 23:
					{
					this.state = 127;
					this.expression();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 130;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2162821850) !== 0));
			this.state = 132;
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
		this.enterRule(localctx, 10, CircuitScriptParser.RULE_property_set_expr2);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 134;
			this.match(CircuitScriptParser.INSTANCE_NAME_WITH_PROPERTY);
			this.state = 135;
			this.match(CircuitScriptParser.T__1);
			this.state = 136;
			this.match(CircuitScriptParser.INDENT);
			this.state = 139;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				this.state = 139;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 31:
					{
					this.state = 137;
					this.match(CircuitScriptParser.NEWLINE);
					}
					break;
				case 22:
				case 24:
					{
					this.state = 138;
					this.assignment_expr2();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 141;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2168455168) !== 0));
			this.state = 143;
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
		this.enterRule(localctx, 12, CircuitScriptParser.RULE_assignment_expr2);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 145;
			_la = this._input.LA(1);
			if(!(_la===22 || _la===24)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 146;
			this.match(CircuitScriptParser.T__1);
			this.state = 147;
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
		this.enterRule(localctx, 14, CircuitScriptParser.RULE_add_component_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 149;
			this.match(CircuitScriptParser.T__3);
			this.state = 150;
			this.data_expr();
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
		this.enterRule(localctx, 16, CircuitScriptParser.RULE_component_select_expr);
		let _la: number;
		try {
			this.state = 157;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 15:
			case 22:
			case 24:
			case 25:
			case 26:
			case 27:
				this.enterOuterAlt(localctx, 1);
				{
				{
				this.state = 152;
				this.data_expr();
				this.state = 154;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===5) {
					{
					this.state = 153;
					this.pin_select_expr();
					}
				}

				}
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 156;
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
		this.enterRule(localctx, 18, CircuitScriptParser.RULE_pin_select_expr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 159;
			this.match(CircuitScriptParser.T__4);
			this.state = 160;
			_la = this._input.LA(1);
			if(!(_la===24 || _la===26)) {
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
		this.enterRule(localctx, 20, CircuitScriptParser.RULE_pin_select_expr2);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 162;
			_la = this._input.LA(1);
			if(!(_la===24 || _la===26)) {
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
		this.enterRule(localctx, 22, CircuitScriptParser.RULE_at_component_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 164;
			this.match(CircuitScriptParser.T__5);
			this.state = 165;
			this.component_select_expr();
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
		this.enterRule(localctx, 24, CircuitScriptParser.RULE_to_component_expr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 167;
			this.match(CircuitScriptParser.T__6);
			this.state = 168;
			this.component_select_expr();
			this.state = 173;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===8) {
				{
				{
				this.state = 169;
				this.match(CircuitScriptParser.T__7);
				this.state = 170;
				this.component_select_expr();
				}
				}
				this.state = 175;
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
	public at_to_multiple_expr(): At_to_multiple_exprContext {
		let localctx: At_to_multiple_exprContext = new At_to_multiple_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 26, CircuitScriptParser.RULE_at_to_multiple_expr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 176;
			this.match(CircuitScriptParser.T__5);
			this.state = 177;
			this.component_select_expr();
			this.state = 178;
			this.match(CircuitScriptParser.T__6);
			this.state = 179;
			this.component_select_expr();
			this.state = 184;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===8) {
				{
				{
				this.state = 180;
				this.match(CircuitScriptParser.T__7);
				this.state = 181;
				this.component_select_expr();
				}
				}
				this.state = 186;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 187;
			this.match(CircuitScriptParser.T__1);
			this.state = 188;
			this.match(CircuitScriptParser.INDENT);
			this.state = 191;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				this.state = 191;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 31:
					{
					this.state = 189;
					this.match(CircuitScriptParser.NEWLINE);
					}
					break;
				case 24:
				case 26:
					{
					this.state = 190;
					this.at_to_multiple_line_expr();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 193;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2231369728) !== 0));
			this.state = 195;
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
		this.enterRule(localctx, 28, CircuitScriptParser.RULE_at_to_multiple_line_expr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 197;
			this.pin_select_expr2();
			this.state = 198;
			this.match(CircuitScriptParser.T__1);
			this.state = 199;
			this.at_to_multiple_line_expr_to_pin();
			this.state = 204;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===8) {
				{
				{
				this.state = 200;
				this.match(CircuitScriptParser.T__7);
				this.state = 201;
				this.at_to_multiple_line_expr_to_pin();
				}
				}
				this.state = 206;
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
		this.enterRule(localctx, 30, CircuitScriptParser.RULE_at_to_multiple_line_expr_to_pin);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 207;
			_la = this._input.LA(1);
			if(!(_la===20 || _la===24)) {
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
		this.enterRule(localctx, 32, CircuitScriptParser.RULE_at_block);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 209;
			this.at_component_expr();
			this.state = 210;
			this.match(CircuitScriptParser.T__1);
			this.state = 211;
			this.match(CircuitScriptParser.INDENT);
			this.state = 214;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				this.state = 214;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 31:
					{
					this.state = 212;
					this.match(CircuitScriptParser.NEWLINE);
					}
					break;
				case 1:
				case 3:
				case 4:
				case 6:
				case 7:
				case 9:
				case 11:
				case 17:
				case 19:
				case 21:
				case 22:
				case 23:
				case 24:
				case 26:
					{
					this.state = 213;
					this.at_block_expressions();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 216;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2246707930) !== 0));
			this.state = 218;
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
		this.enterRule(localctx, 34, CircuitScriptParser.RULE_at_block_expressions);
		try {
			this.state = 222;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 1:
			case 3:
			case 4:
			case 6:
			case 7:
			case 9:
			case 11:
			case 17:
			case 19:
			case 21:
			case 22:
			case 23:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 220;
				this.expression();
				}
				break;
			case 24:
			case 26:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 221;
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
		this.enterRule(localctx, 36, CircuitScriptParser.RULE_at_block_pin_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 224;
			this.pin_select_expr2();
			this.state = 225;
			this.match(CircuitScriptParser.T__1);
			this.state = 228;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 1:
			case 3:
			case 4:
			case 6:
			case 7:
			case 9:
			case 11:
			case 17:
			case 19:
			case 20:
			case 21:
			case 22:
			case 23:
				{
				this.state = 226;
				this.at_block_pin_expression_simple();
				}
				break;
			case 33:
				{
				this.state = 227;
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
		this.enterRule(localctx, 38, CircuitScriptParser.RULE_at_block_pin_expression_simple);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 232;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 1:
			case 3:
			case 4:
			case 6:
			case 7:
			case 9:
			case 11:
			case 17:
			case 19:
			case 21:
			case 22:
			case 23:
				{
				this.state = 230;
				this.expression();
				}
				break;
			case 20:
				{
				this.state = 231;
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
		this.enterRule(localctx, 40, CircuitScriptParser.RULE_at_block_pin_expression_complex);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 234;
			this.match(CircuitScriptParser.INDENT);
			this.state = 237;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				this.state = 237;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 31:
					{
					this.state = 235;
					this.match(CircuitScriptParser.NEWLINE);
					}
					break;
				case 1:
				case 3:
				case 4:
				case 6:
				case 7:
				case 9:
				case 11:
				case 17:
				case 19:
				case 21:
				case 22:
				case 23:
					{
					this.state = 236;
					this.expression();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 239;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2162821850) !== 0));
			this.state = 241;
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
		this.enterRule(localctx, 42, CircuitScriptParser.RULE_break_keyword);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 243;
			this.match(CircuitScriptParser.T__8);
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
		this.enterRule(localctx, 44, CircuitScriptParser.RULE_assignment_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 245;
			this.match(CircuitScriptParser.ID);
			this.state = 246;
			this.match(CircuitScriptParser.T__9);
			this.state = 247;
			this.data_expr();
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
		this.enterRule(localctx, 46, CircuitScriptParser.RULE_keyword_assignment_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 249;
			this.match(CircuitScriptParser.ID);
			this.state = 250;
			this.match(CircuitScriptParser.T__9);
			this.state = 251;
			this.data_expr();
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
		this.enterRule(localctx, 48, CircuitScriptParser.RULE_parameters);
		let _la: number;
		try {
			let _alt: number;
			this.state = 276;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 28, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				{
				this.state = 253;
				this.data_expr();
				this.state = 258;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 25, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 254;
						this.match(CircuitScriptParser.T__7);
						this.state = 255;
						this.data_expr();
						}
						}
					}
					this.state = 260;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 25, this._ctx);
				}
				this.state = 265;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===8) {
					{
					{
					this.state = 261;
					this.match(CircuitScriptParser.T__7);
					this.state = 262;
					this.keyword_assignment_expr();
					}
					}
					this.state = 267;
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
				this.state = 268;
				this.keyword_assignment_expr();
				this.state = 273;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===8) {
					{
					{
					this.state = 269;
					this.match(CircuitScriptParser.T__7);
					this.state = 270;
					this.keyword_assignment_expr();
					}
					}
					this.state = 275;
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
		this.enterRule(localctx, 50, CircuitScriptParser.RULE_property_set_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 278;
			this.match(CircuitScriptParser.INSTANCE_NAME_WITH_PROPERTY);
			this.state = 279;
			this.match(CircuitScriptParser.T__9);
			this.state = 280;
			this.data_expr();
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
	public data_expr(): Data_exprContext {
		let localctx: Data_exprContext = new Data_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 52, CircuitScriptParser.RULE_data_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 287;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 29, this._ctx) ) {
			case 1:
				{
				this.state = 282;
				this.value_expr();
				}
				break;
			case 2:
				{
				this.state = 283;
				this.match(CircuitScriptParser.ID);
				}
				break;
			case 3:
				{
				this.state = 284;
				this.function_call_expr();
				}
				break;
			case 4:
				{
				this.state = 285;
				this.create_component_expr();
				}
				break;
			case 5:
				{
				this.state = 286;
				this.assignment_expr();
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
	public value_expr(): Value_exprContext {
		let localctx: Value_exprContext = new Value_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 54, CircuitScriptParser.RULE_value_expr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 289;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 251658240) !== 0))) {
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
	public function_def_expr(): Function_def_exprContext {
		let localctx: Function_def_exprContext = new Function_def_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 56, CircuitScriptParser.RULE_function_def_expr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 291;
			this.match(CircuitScriptParser.T__10);
			this.state = 292;
			this.match(CircuitScriptParser.ID);
			this.state = 293;
			this.match(CircuitScriptParser.T__11);
			this.state = 295;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===22) {
				{
				this.state = 294;
				this.function_args_expr();
				}
			}

			this.state = 297;
			this.match(CircuitScriptParser.T__12);
			this.state = 298;
			this.match(CircuitScriptParser.T__1);
			this.state = 299;
			this.match(CircuitScriptParser.INDENT);
			this.state = 302;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				this.state = 302;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 31:
					{
					this.state = 300;
					this.match(CircuitScriptParser.NEWLINE);
					}
					break;
				case 1:
				case 3:
				case 4:
				case 6:
				case 7:
				case 9:
				case 11:
				case 14:
				case 17:
				case 19:
				case 21:
				case 22:
				case 23:
					{
					this.state = 301;
					this.function_expr();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 304;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2162838234) !== 0));
			this.state = 306;
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
		this.enterRule(localctx, 58, CircuitScriptParser.RULE_function_expr);
		try {
			this.state = 310;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 1:
			case 3:
			case 4:
			case 6:
			case 7:
			case 9:
			case 11:
			case 17:
			case 19:
			case 21:
			case 22:
			case 23:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 308;
				this.expression();
				}
				break;
			case 14:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 309;
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
		this.enterRule(localctx, 60, CircuitScriptParser.RULE_function_args_expr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 312;
			this.match(CircuitScriptParser.ID);
			this.state = 317;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===8) {
				{
				{
				this.state = 313;
				this.match(CircuitScriptParser.T__7);
				this.state = 314;
				this.match(CircuitScriptParser.ID);
				}
				}
				this.state = 319;
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
	public function_call_expr(): Function_call_exprContext {
		let localctx: Function_call_exprContext = new Function_call_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 62, CircuitScriptParser.RULE_function_call_expr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 320;
			this.match(CircuitScriptParser.ID);
			this.state = 321;
			this.match(CircuitScriptParser.T__11);
			this.state = 323;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 255885312) !== 0)) {
				{
				this.state = 322;
				this.parameters();
				}
			}

			this.state = 325;
			this.match(CircuitScriptParser.T__12);
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
		this.enterRule(localctx, 64, CircuitScriptParser.RULE_function_return_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 327;
			this.match(CircuitScriptParser.T__13);
			this.state = 328;
			this.data_expr();
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
		this.enterRule(localctx, 66, CircuitScriptParser.RULE_create_component_expr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 330;
			this.match(CircuitScriptParser.T__14);
			this.state = 331;
			this.match(CircuitScriptParser.T__15);
			this.state = 332;
			this.match(CircuitScriptParser.T__1);
			this.state = 333;
			this.match(CircuitScriptParser.INDENT);
			this.state = 336;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				this.state = 336;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 22:
				case 24:
				case 26:
					{
					this.state = 334;
					this.property_expr();
					}
					break;
				case 31:
					{
					this.state = 335;
					this.match(CircuitScriptParser.NEWLINE);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 338;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2235564032) !== 0));
			this.state = 340;
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
	public property_expr(): Property_exprContext {
		let localctx: Property_exprContext = new Property_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 68, CircuitScriptParser.RULE_property_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 342;
			this.property_key_expr();
			this.state = 343;
			this.match(CircuitScriptParser.T__1);
			this.state = 344;
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
		this.enterRule(localctx, 70, CircuitScriptParser.RULE_property_key_expr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 346;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 88080384) !== 0))) {
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
		this.enterRule(localctx, 72, CircuitScriptParser.RULE_property_value_expr);
		let _la: number;
		try {
			this.state = 364;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 33:
				localctx = new Nested_propertiesContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				{
				this.state = 348;
				this.match(CircuitScriptParser.INDENT);
				this.state = 351;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					this.state = 351;
					this._errHandler.sync(this);
					switch (this._input.LA(1)) {
					case 31:
						{
						this.state = 349;
						this.match(CircuitScriptParser.NEWLINE);
						}
						break;
					case 22:
					case 24:
					case 26:
						{
						this.state = 350;
						this.property_expr();
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					}
					this.state = 353;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2235564032) !== 0));
				this.state = 355;
				this.match(CircuitScriptParser.DEDENT);
				}
				}
				break;
			case 15:
			case 22:
			case 24:
			case 25:
			case 26:
			case 27:
				localctx = new Single_line_propertyContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 356;
				this.data_expr();
				this.state = 361;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===8) {
					{
					{
					this.state = 357;
					this.match(CircuitScriptParser.T__7);
					this.state = 358;
					this.data_expr();
					}
					}
					this.state = 363;
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
	public decorator_expr(): Decorator_exprContext {
		let localctx: Decorator_exprContext = new Decorator_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 74, CircuitScriptParser.RULE_decorator_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 366;
			this.match(CircuitScriptParser.DECORATOR);
			this.state = 367;
			this.match(CircuitScriptParser.NEWLINE);
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
		this.enterRule(localctx, 76, CircuitScriptParser.RULE_style_expr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 369;
			this.match(CircuitScriptParser.T__16);
			this.state = 370;
			this.match(CircuitScriptParser.ID);
			this.state = 371;
			this.match(CircuitScriptParser.T__9);
			this.state = 372;
			this.value_expr();
			this.state = 379;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===8) {
				{
				{
				this.state = 373;
				this.match(CircuitScriptParser.T__7);
				this.state = 374;
				this.match(CircuitScriptParser.ID);
				this.state = 375;
				this.match(CircuitScriptParser.T__9);
				this.state = 376;
				this.value_expr();
				}
				}
				this.state = 381;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 382;
			this.match(CircuitScriptParser.T__17);
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
		this.enterRule(localctx, 78, CircuitScriptParser.RULE_wire_expr);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 384;
			this.match(CircuitScriptParser.T__18);
			this.state = 387;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 385;
					this.match(CircuitScriptParser.ID);
					this.state = 386;
					this.match(CircuitScriptParser.INTEGER_VALUE);
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 389;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 43, this._ctx);
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

	public static readonly _serializedATN: number[] = [4,1,34,392,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,
	7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,
	24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,
	2,32,7,32,2,33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,
	39,7,39,1,0,1,0,4,0,83,8,0,11,0,12,0,84,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,103,8,1,1,2,4,2,106,8,2,11,2,12,2,107,
	1,3,1,3,1,3,1,3,1,3,4,3,115,8,3,11,3,12,3,116,1,3,1,3,1,4,1,4,3,4,123,8,
	4,1,4,1,4,1,4,1,4,4,4,129,8,4,11,4,12,4,130,1,4,1,4,1,5,1,5,1,5,1,5,1,5,
	4,5,140,8,5,11,5,12,5,141,1,5,1,5,1,6,1,6,1,6,1,6,1,7,1,7,1,7,1,8,1,8,3,
	8,155,8,8,1,8,3,8,158,8,8,1,9,1,9,1,9,1,10,1,10,1,11,1,11,1,11,1,12,1,12,
	1,12,1,12,5,12,172,8,12,10,12,12,12,175,9,12,1,13,1,13,1,13,1,13,1,13,1,
	13,5,13,183,8,13,10,13,12,13,186,9,13,1,13,1,13,1,13,1,13,4,13,192,8,13,
	11,13,12,13,193,1,13,1,13,1,14,1,14,1,14,1,14,1,14,5,14,203,8,14,10,14,
	12,14,206,9,14,1,15,1,15,1,16,1,16,1,16,1,16,1,16,4,16,215,8,16,11,16,12,
	16,216,1,16,1,16,1,17,1,17,3,17,223,8,17,1,18,1,18,1,18,1,18,3,18,229,8,
	18,1,19,1,19,3,19,233,8,19,1,20,1,20,1,20,4,20,238,8,20,11,20,12,20,239,
	1,20,1,20,1,21,1,21,1,22,1,22,1,22,1,22,1,23,1,23,1,23,1,23,1,24,1,24,1,
	24,5,24,257,8,24,10,24,12,24,260,9,24,1,24,1,24,5,24,264,8,24,10,24,12,
	24,267,9,24,1,24,1,24,1,24,5,24,272,8,24,10,24,12,24,275,9,24,3,24,277,
	8,24,1,25,1,25,1,25,1,25,1,26,1,26,1,26,1,26,1,26,3,26,288,8,26,1,27,1,
	27,1,28,1,28,1,28,1,28,3,28,296,8,28,1,28,1,28,1,28,1,28,1,28,4,28,303,
	8,28,11,28,12,28,304,1,28,1,28,1,29,1,29,3,29,311,8,29,1,30,1,30,1,30,5,
	30,316,8,30,10,30,12,30,319,9,30,1,31,1,31,1,31,3,31,324,8,31,1,31,1,31,
	1,32,1,32,1,32,1,33,1,33,1,33,1,33,1,33,1,33,4,33,337,8,33,11,33,12,33,
	338,1,33,1,33,1,34,1,34,1,34,1,34,1,35,1,35,1,36,1,36,1,36,4,36,352,8,36,
	11,36,12,36,353,1,36,1,36,1,36,1,36,5,36,360,8,36,10,36,12,36,363,9,36,
	3,36,365,8,36,1,37,1,37,1,37,1,38,1,38,1,38,1,38,1,38,1,38,1,38,1,38,5,
	38,378,8,38,10,38,12,38,381,9,38,1,38,1,38,1,39,1,39,1,39,4,39,388,8,39,
	11,39,12,39,389,1,39,0,0,40,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,
	32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,
	0,5,2,0,22,22,24,24,2,0,24,24,26,26,2,0,20,20,24,24,1,0,24,27,3,0,22,22,
	24,24,26,26,412,0,82,1,0,0,0,2,102,1,0,0,0,4,105,1,0,0,0,6,109,1,0,0,0,
	8,120,1,0,0,0,10,134,1,0,0,0,12,145,1,0,0,0,14,149,1,0,0,0,16,157,1,0,0,
	0,18,159,1,0,0,0,20,162,1,0,0,0,22,164,1,0,0,0,24,167,1,0,0,0,26,176,1,
	0,0,0,28,197,1,0,0,0,30,207,1,0,0,0,32,209,1,0,0,0,34,222,1,0,0,0,36,224,
	1,0,0,0,38,232,1,0,0,0,40,234,1,0,0,0,42,243,1,0,0,0,44,245,1,0,0,0,46,
	249,1,0,0,0,48,276,1,0,0,0,50,278,1,0,0,0,52,287,1,0,0,0,54,289,1,0,0,0,
	56,291,1,0,0,0,58,310,1,0,0,0,60,312,1,0,0,0,62,320,1,0,0,0,64,327,1,0,
	0,0,66,330,1,0,0,0,68,342,1,0,0,0,70,346,1,0,0,0,72,364,1,0,0,0,74,366,
	1,0,0,0,76,369,1,0,0,0,78,384,1,0,0,0,80,83,3,2,1,0,81,83,5,31,0,0,82,80,
	1,0,0,0,82,81,1,0,0,0,83,84,1,0,0,0,84,82,1,0,0,0,84,85,1,0,0,0,85,1,1,
	0,0,0,86,103,3,14,7,0,87,103,3,26,13,0,88,103,3,24,12,0,89,103,3,22,11,
	0,90,103,3,50,25,0,91,103,3,10,5,0,92,103,3,42,21,0,93,103,3,56,28,0,94,
	103,3,62,31,0,95,103,3,44,22,0,96,103,3,78,39,0,97,103,3,32,16,0,98,103,
	3,4,2,0,99,103,3,8,4,0,100,103,3,74,37,0,101,103,3,76,38,0,102,86,1,0,0,
	0,102,87,1,0,0,0,102,88,1,0,0,0,102,89,1,0,0,0,102,90,1,0,0,0,102,91,1,
	0,0,0,102,92,1,0,0,0,102,93,1,0,0,0,102,94,1,0,0,0,102,95,1,0,0,0,102,96,
	1,0,0,0,102,97,1,0,0,0,102,98,1,0,0,0,102,99,1,0,0,0,102,100,1,0,0,0,102,
	101,1,0,0,0,103,3,1,0,0,0,104,106,3,6,3,0,105,104,1,0,0,0,106,107,1,0,0,
	0,107,105,1,0,0,0,107,108,1,0,0,0,108,5,1,0,0,0,109,110,5,1,0,0,110,111,
	5,2,0,0,111,114,5,33,0,0,112,115,5,31,0,0,113,115,3,2,1,0,114,112,1,0,0,
	0,114,113,1,0,0,0,115,116,1,0,0,0,116,114,1,0,0,0,116,117,1,0,0,0,117,118,
	1,0,0,0,118,119,5,34,0,0,119,7,1,0,0,0,120,122,5,3,0,0,121,123,5,26,0,0,
	122,121,1,0,0,0,122,123,1,0,0,0,123,124,1,0,0,0,124,125,5,2,0,0,125,128,
	5,33,0,0,126,129,5,31,0,0,127,129,3,2,1,0,128,126,1,0,0,0,128,127,1,0,0,
	0,129,130,1,0,0,0,130,128,1,0,0,0,130,131,1,0,0,0,131,132,1,0,0,0,132,133,
	5,34,0,0,133,9,1,0,0,0,134,135,5,23,0,0,135,136,5,2,0,0,136,139,5,33,0,
	0,137,140,5,31,0,0,138,140,3,12,6,0,139,137,1,0,0,0,139,138,1,0,0,0,140,
	141,1,0,0,0,141,139,1,0,0,0,141,142,1,0,0,0,142,143,1,0,0,0,143,144,5,34,
	0,0,144,11,1,0,0,0,145,146,7,0,0,0,146,147,5,2,0,0,147,148,3,54,27,0,148,
	13,1,0,0,0,149,150,5,4,0,0,150,151,3,52,26,0,151,15,1,0,0,0,152,154,3,52,
	26,0,153,155,3,18,9,0,154,153,1,0,0,0,154,155,1,0,0,0,155,158,1,0,0,0,156,
	158,3,18,9,0,157,152,1,0,0,0,157,156,1,0,0,0,158,17,1,0,0,0,159,160,5,5,
	0,0,160,161,7,1,0,0,161,19,1,0,0,0,162,163,7,1,0,0,163,21,1,0,0,0,164,165,
	5,6,0,0,165,166,3,16,8,0,166,23,1,0,0,0,167,168,5,7,0,0,168,173,3,16,8,
	0,169,170,5,8,0,0,170,172,3,16,8,0,171,169,1,0,0,0,172,175,1,0,0,0,173,
	171,1,0,0,0,173,174,1,0,0,0,174,25,1,0,0,0,175,173,1,0,0,0,176,177,5,6,
	0,0,177,178,3,16,8,0,178,179,5,7,0,0,179,184,3,16,8,0,180,181,5,8,0,0,181,
	183,3,16,8,0,182,180,1,0,0,0,183,186,1,0,0,0,184,182,1,0,0,0,184,185,1,
	0,0,0,185,187,1,0,0,0,186,184,1,0,0,0,187,188,5,2,0,0,188,191,5,33,0,0,
	189,192,5,31,0,0,190,192,3,28,14,0,191,189,1,0,0,0,191,190,1,0,0,0,192,
	193,1,0,0,0,193,191,1,0,0,0,193,194,1,0,0,0,194,195,1,0,0,0,195,196,5,34,
	0,0,196,27,1,0,0,0,197,198,3,20,10,0,198,199,5,2,0,0,199,204,3,30,15,0,
	200,201,5,8,0,0,201,203,3,30,15,0,202,200,1,0,0,0,203,206,1,0,0,0,204,202,
	1,0,0,0,204,205,1,0,0,0,205,29,1,0,0,0,206,204,1,0,0,0,207,208,7,2,0,0,
	208,31,1,0,0,0,209,210,3,22,11,0,210,211,5,2,0,0,211,214,5,33,0,0,212,215,
	5,31,0,0,213,215,3,34,17,0,214,212,1,0,0,0,214,213,1,0,0,0,215,216,1,0,
	0,0,216,214,1,0,0,0,216,217,1,0,0,0,217,218,1,0,0,0,218,219,5,34,0,0,219,
	33,1,0,0,0,220,223,3,2,1,0,221,223,3,36,18,0,222,220,1,0,0,0,222,221,1,
	0,0,0,223,35,1,0,0,0,224,225,3,20,10,0,225,228,5,2,0,0,226,229,3,38,19,
	0,227,229,3,40,20,0,228,226,1,0,0,0,228,227,1,0,0,0,229,37,1,0,0,0,230,
	233,3,2,1,0,231,233,5,20,0,0,232,230,1,0,0,0,232,231,1,0,0,0,233,39,1,0,
	0,0,234,237,5,33,0,0,235,238,5,31,0,0,236,238,3,2,1,0,237,235,1,0,0,0,237,
	236,1,0,0,0,238,239,1,0,0,0,239,237,1,0,0,0,239,240,1,0,0,0,240,241,1,0,
	0,0,241,242,5,34,0,0,242,41,1,0,0,0,243,244,5,9,0,0,244,43,1,0,0,0,245,
	246,5,22,0,0,246,247,5,10,0,0,247,248,3,52,26,0,248,45,1,0,0,0,249,250,
	5,22,0,0,250,251,5,10,0,0,251,252,3,52,26,0,252,47,1,0,0,0,253,258,3,52,
	26,0,254,255,5,8,0,0,255,257,3,52,26,0,256,254,1,0,0,0,257,260,1,0,0,0,
	258,256,1,0,0,0,258,259,1,0,0,0,259,265,1,0,0,0,260,258,1,0,0,0,261,262,
	5,8,0,0,262,264,3,46,23,0,263,261,1,0,0,0,264,267,1,0,0,0,265,263,1,0,0,
	0,265,266,1,0,0,0,266,277,1,0,0,0,267,265,1,0,0,0,268,273,3,46,23,0,269,
	270,5,8,0,0,270,272,3,46,23,0,271,269,1,0,0,0,272,275,1,0,0,0,273,271,1,
	0,0,0,273,274,1,0,0,0,274,277,1,0,0,0,275,273,1,0,0,0,276,253,1,0,0,0,276,
	268,1,0,0,0,277,49,1,0,0,0,278,279,5,23,0,0,279,280,5,10,0,0,280,281,3,
	52,26,0,281,51,1,0,0,0,282,288,3,54,27,0,283,288,5,22,0,0,284,288,3,62,
	31,0,285,288,3,66,33,0,286,288,3,44,22,0,287,282,1,0,0,0,287,283,1,0,0,
	0,287,284,1,0,0,0,287,285,1,0,0,0,287,286,1,0,0,0,288,53,1,0,0,0,289,290,
	7,3,0,0,290,55,1,0,0,0,291,292,5,11,0,0,292,293,5,22,0,0,293,295,5,12,0,
	0,294,296,3,60,30,0,295,294,1,0,0,0,295,296,1,0,0,0,296,297,1,0,0,0,297,
	298,5,13,0,0,298,299,5,2,0,0,299,302,5,33,0,0,300,303,5,31,0,0,301,303,
	3,58,29,0,302,300,1,0,0,0,302,301,1,0,0,0,303,304,1,0,0,0,304,302,1,0,0,
	0,304,305,1,0,0,0,305,306,1,0,0,0,306,307,5,34,0,0,307,57,1,0,0,0,308,311,
	3,2,1,0,309,311,3,64,32,0,310,308,1,0,0,0,310,309,1,0,0,0,311,59,1,0,0,
	0,312,317,5,22,0,0,313,314,5,8,0,0,314,316,5,22,0,0,315,313,1,0,0,0,316,
	319,1,0,0,0,317,315,1,0,0,0,317,318,1,0,0,0,318,61,1,0,0,0,319,317,1,0,
	0,0,320,321,5,22,0,0,321,323,5,12,0,0,322,324,3,48,24,0,323,322,1,0,0,0,
	323,324,1,0,0,0,324,325,1,0,0,0,325,326,5,13,0,0,326,63,1,0,0,0,327,328,
	5,14,0,0,328,329,3,52,26,0,329,65,1,0,0,0,330,331,5,15,0,0,331,332,5,16,
	0,0,332,333,5,2,0,0,333,336,5,33,0,0,334,337,3,68,34,0,335,337,5,31,0,0,
	336,334,1,0,0,0,336,335,1,0,0,0,337,338,1,0,0,0,338,336,1,0,0,0,338,339,
	1,0,0,0,339,340,1,0,0,0,340,341,5,34,0,0,341,67,1,0,0,0,342,343,3,70,35,
	0,343,344,5,2,0,0,344,345,3,72,36,0,345,69,1,0,0,0,346,347,7,4,0,0,347,
	71,1,0,0,0,348,351,5,33,0,0,349,352,5,31,0,0,350,352,3,68,34,0,351,349,
	1,0,0,0,351,350,1,0,0,0,352,353,1,0,0,0,353,351,1,0,0,0,353,354,1,0,0,0,
	354,355,1,0,0,0,355,365,5,34,0,0,356,361,3,52,26,0,357,358,5,8,0,0,358,
	360,3,52,26,0,359,357,1,0,0,0,360,363,1,0,0,0,361,359,1,0,0,0,361,362,1,
	0,0,0,362,365,1,0,0,0,363,361,1,0,0,0,364,348,1,0,0,0,364,356,1,0,0,0,365,
	73,1,0,0,0,366,367,5,21,0,0,367,368,5,31,0,0,368,75,1,0,0,0,369,370,5,17,
	0,0,370,371,5,22,0,0,371,372,5,10,0,0,372,379,3,54,27,0,373,374,5,8,0,0,
	374,375,5,22,0,0,375,376,5,10,0,0,376,378,3,54,27,0,377,373,1,0,0,0,378,
	381,1,0,0,0,379,377,1,0,0,0,379,380,1,0,0,0,380,382,1,0,0,0,381,379,1,0,
	0,0,382,383,5,18,0,0,383,77,1,0,0,0,384,387,5,19,0,0,385,386,5,22,0,0,386,
	388,5,24,0,0,387,385,1,0,0,0,388,389,1,0,0,0,389,387,1,0,0,0,389,390,1,
	0,0,0,390,79,1,0,0,0,44,82,84,102,107,114,116,122,128,130,139,141,154,157,
	173,184,191,193,204,214,216,222,228,232,237,239,258,265,273,276,287,295,
	302,304,310,317,323,336,338,351,353,361,364,379,389];

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
	public property_set_expr(): Property_set_exprContext {
		return this.getTypedRuleContext(Property_set_exprContext, 0) as Property_set_exprContext;
	}
	public property_set_expr2(): Property_set_expr2Context {
		return this.getTypedRuleContext(Property_set_expr2Context, 0) as Property_set_expr2Context;
	}
	public break_keyword(): Break_keywordContext {
		return this.getTypedRuleContext(Break_keywordContext, 0) as Break_keywordContext;
	}
	public function_def_expr(): Function_def_exprContext {
		return this.getTypedRuleContext(Function_def_exprContext, 0) as Function_def_exprContext;
	}
	public function_call_expr(): Function_call_exprContext {
		return this.getTypedRuleContext(Function_call_exprContext, 0) as Function_call_exprContext;
	}
	public assignment_expr(): Assignment_exprContext {
		return this.getTypedRuleContext(Assignment_exprContext, 0) as Assignment_exprContext;
	}
	public wire_expr(): Wire_exprContext {
		return this.getTypedRuleContext(Wire_exprContext, 0) as Wire_exprContext;
	}
	public at_block(): At_blockContext {
		return this.getTypedRuleContext(At_blockContext, 0) as At_blockContext;
	}
	public branch_blocks(): Branch_blocksContext {
		return this.getTypedRuleContext(Branch_blocksContext, 0) as Branch_blocksContext;
	}
	public section_block(): Section_blockContext {
		return this.getTypedRuleContext(Section_blockContext, 0) as Section_blockContext;
	}
	public decorator_expr(): Decorator_exprContext {
		return this.getTypedRuleContext(Decorator_exprContext, 0) as Decorator_exprContext;
	}
	public style_expr(): Style_exprContext {
		return this.getTypedRuleContext(Style_exprContext, 0) as Style_exprContext;
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
	public INDENT(): TerminalNode {
		return this.getToken(CircuitScriptParser.INDENT, 0);
	}
	public DEDENT(): TerminalNode {
		return this.getToken(CircuitScriptParser.DEDENT, 0);
	}
	public NEWLINE_list(): TerminalNode[] {
	    	return this.getTokens(CircuitScriptParser.NEWLINE);
	}
	public NEWLINE(i: number): TerminalNode {
		return this.getToken(CircuitScriptParser.NEWLINE, i);
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


export class Section_blockContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public INDENT(): TerminalNode {
		return this.getToken(CircuitScriptParser.INDENT, 0);
	}
	public DEDENT(): TerminalNode {
		return this.getToken(CircuitScriptParser.DEDENT, 0);
	}
	public STRING_VALUE(): TerminalNode {
		return this.getToken(CircuitScriptParser.STRING_VALUE, 0);
	}
	public NEWLINE_list(): TerminalNode[] {
	    	return this.getTokens(CircuitScriptParser.NEWLINE);
	}
	public NEWLINE(i: number): TerminalNode {
		return this.getToken(CircuitScriptParser.NEWLINE, i);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_section_block;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitSection_block) {
			return visitor.visitSection_block(this);
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
	public INSTANCE_NAME_WITH_PROPERTY(): TerminalNode {
		return this.getToken(CircuitScriptParser.INSTANCE_NAME_WITH_PROPERTY, 0);
	}
	public INDENT(): TerminalNode {
		return this.getToken(CircuitScriptParser.INDENT, 0);
	}
	public DEDENT(): TerminalNode {
		return this.getToken(CircuitScriptParser.DEDENT, 0);
	}
	public NEWLINE_list(): TerminalNode[] {
	    	return this.getTokens(CircuitScriptParser.NEWLINE);
	}
	public NEWLINE(i: number): TerminalNode {
		return this.getToken(CircuitScriptParser.NEWLINE, i);
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
	public data_expr(): Data_exprContext {
		return this.getTypedRuleContext(Data_exprContext, 0) as Data_exprContext;
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
	public component_select_expr(): Component_select_exprContext {
		return this.getTypedRuleContext(Component_select_exprContext, 0) as Component_select_exprContext;
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
	public component_select_expr_list(): Component_select_exprContext[] {
		return this.getTypedRuleContexts(Component_select_exprContext) as Component_select_exprContext[];
	}
	public component_select_expr(i: number): Component_select_exprContext {
		return this.getTypedRuleContext(Component_select_exprContext, i) as Component_select_exprContext;
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
	public component_select_expr_list(): Component_select_exprContext[] {
		return this.getTypedRuleContexts(Component_select_exprContext) as Component_select_exprContext[];
	}
	public component_select_expr(i: number): Component_select_exprContext {
		return this.getTypedRuleContext(Component_select_exprContext, i) as Component_select_exprContext;
	}
	public INDENT(): TerminalNode {
		return this.getToken(CircuitScriptParser.INDENT, 0);
	}
	public DEDENT(): TerminalNode {
		return this.getToken(CircuitScriptParser.DEDENT, 0);
	}
	public NEWLINE_list(): TerminalNode[] {
	    	return this.getTokens(CircuitScriptParser.NEWLINE);
	}
	public NEWLINE(i: number): TerminalNode {
		return this.getToken(CircuitScriptParser.NEWLINE, i);
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
	public INDENT(): TerminalNode {
		return this.getToken(CircuitScriptParser.INDENT, 0);
	}
	public DEDENT(): TerminalNode {
		return this.getToken(CircuitScriptParser.DEDENT, 0);
	}
	public NEWLINE_list(): TerminalNode[] {
	    	return this.getTokens(CircuitScriptParser.NEWLINE);
	}
	public NEWLINE(i: number): TerminalNode {
		return this.getToken(CircuitScriptParser.NEWLINE, i);
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
	public INDENT(): TerminalNode {
		return this.getToken(CircuitScriptParser.INDENT, 0);
	}
	public DEDENT(): TerminalNode {
		return this.getToken(CircuitScriptParser.DEDENT, 0);
	}
	public NEWLINE_list(): TerminalNode[] {
	    	return this.getTokens(CircuitScriptParser.NEWLINE);
	}
	public NEWLINE(i: number): TerminalNode {
		return this.getToken(CircuitScriptParser.NEWLINE, i);
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
	public ID(): TerminalNode {
		return this.getToken(CircuitScriptParser.ID, 0);
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
	public INSTANCE_NAME_WITH_PROPERTY(): TerminalNode {
		return this.getToken(CircuitScriptParser.INSTANCE_NAME_WITH_PROPERTY, 0);
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


export class Data_exprContext extends ParserRuleContext {
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
	public function_call_expr(): Function_call_exprContext {
		return this.getTypedRuleContext(Function_call_exprContext, 0) as Function_call_exprContext;
	}
	public create_component_expr(): Create_component_exprContext {
		return this.getTypedRuleContext(Create_component_exprContext, 0) as Create_component_exprContext;
	}
	public assignment_expr(): Assignment_exprContext {
		return this.getTypedRuleContext(Assignment_exprContext, 0) as Assignment_exprContext;
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_data_expr;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitData_expr) {
			return visitor.visitData_expr(this);
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
	public INTEGER_VALUE(): TerminalNode {
		return this.getToken(CircuitScriptParser.INTEGER_VALUE, 0);
	}
	public NUMERIC_VALUE(): TerminalNode {
		return this.getToken(CircuitScriptParser.NUMERIC_VALUE, 0);
	}
	public STRING_VALUE(): TerminalNode {
		return this.getToken(CircuitScriptParser.STRING_VALUE, 0);
	}
	public PERCENTAGE_VALUE(): TerminalNode {
		return this.getToken(CircuitScriptParser.PERCENTAGE_VALUE, 0);
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


export class Function_def_exprContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ID(): TerminalNode {
		return this.getToken(CircuitScriptParser.ID, 0);
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
	public NEWLINE_list(): TerminalNode[] {
	    	return this.getTokens(CircuitScriptParser.NEWLINE);
	}
	public NEWLINE(i: number): TerminalNode {
		return this.getToken(CircuitScriptParser.NEWLINE, i);
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


export class Function_call_exprContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ID(): TerminalNode {
		return this.getToken(CircuitScriptParser.ID, 0);
	}
	public parameters(): ParametersContext {
		return this.getTypedRuleContext(ParametersContext, 0) as ParametersContext;
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_function_call_expr;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitFunction_call_expr) {
			return visitor.visitFunction_call_expr(this);
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
	public NEWLINE_list(): TerminalNode[] {
	    	return this.getTokens(CircuitScriptParser.NEWLINE);
	}
	public NEWLINE(i: number): TerminalNode {
		return this.getToken(CircuitScriptParser.NEWLINE, i);
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
	public INDENT(): TerminalNode {
		return this.getToken(CircuitScriptParser.INDENT, 0);
	}
	public DEDENT(): TerminalNode {
		return this.getToken(CircuitScriptParser.DEDENT, 0);
	}
	public NEWLINE_list(): TerminalNode[] {
	    	return this.getTokens(CircuitScriptParser.NEWLINE);
	}
	public NEWLINE(i: number): TerminalNode {
		return this.getToken(CircuitScriptParser.NEWLINE, i);
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


export class Decorator_exprContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public DECORATOR(): TerminalNode {
		return this.getToken(CircuitScriptParser.DECORATOR, 0);
	}
	public NEWLINE(): TerminalNode {
		return this.getToken(CircuitScriptParser.NEWLINE, 0);
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_decorator_expr;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitDecorator_expr) {
			return visitor.visitDecorator_expr(this);
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


export class Wire_exprContext extends ParserRuleContext {
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
