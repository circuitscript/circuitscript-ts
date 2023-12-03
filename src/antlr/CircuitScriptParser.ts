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
	public static readonly Break = 8;
	public static readonly Branch = 9;
	public static readonly Create = 10;
	public static readonly Component = 11;
	public static readonly Wire = 12;
	public static readonly Pin = 13;
	public static readonly Add = 14;
	public static readonly At = 15;
	public static readonly To = 16;
	public static readonly Point = 17;
	public static readonly Return = 18;
	public static readonly Define = 19;
	public static readonly Import = 20;
	public static readonly If = 21;
	public static readonly Not = 22;
	public static readonly Equals = 23;
	public static readonly NotEquals = 24;
	public static readonly Addition = 25;
	public static readonly Minus = 26;
	public static readonly Divide = 27;
	public static readonly Multiply = 28;
	public static readonly OPEN_PAREN = 29;
	public static readonly CLOSE_PAREN = 30;
	public static readonly NOT_CONNECTED = 31;
	public static readonly BOOLEAN_VALUE = 32;
	public static readonly ID = 33;
	public static readonly INSTANCE_NAME_WITH_PROPERTY = 34;
	public static readonly INTEGER_VALUE = 35;
	public static readonly DECIMAL_VALUE = 36;
	public static readonly NUMERIC_VALUE = 37;
	public static readonly STRING_VALUE = 38;
	public static readonly PERCENTAGE_VALUE = 39;
	public static readonly ALPHA_NUMERIC = 40;
	public static readonly OPERATOR = 41;
	public static readonly WS = 42;
	public static readonly NEWLINE = 43;
	public static readonly SKIP_ = 44;
	public static readonly INDENT = 45;
	public static readonly DEDENT = 46;
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
	public static readonly RULE_print_expr = 30;
	public static readonly RULE_function_def_expr = 31;
	public static readonly RULE_function_expr = 32;
	public static readonly RULE_function_args_expr = 33;
	public static readonly RULE_function_call_expr = 34;
	public static readonly RULE_function_return_expr = 35;
	public static readonly RULE_create_component_expr = 36;
	public static readonly RULE_property_expr = 37;
	public static readonly RULE_property_key_expr = 38;
	public static readonly RULE_property_value_expr = 39;
	public static readonly RULE_rounded_brackets_expr = 40;
	public static readonly RULE_style_expr = 41;
	public static readonly RULE_blank_expr = 42;
	public static readonly RULE_wire_expr = 43;
	public static readonly RULE_point_expr = 44;
	public static readonly RULE_import_expr = 45;
	public static readonly literalNames: (string | null)[] = [ null, "':'", 
                                                            "','", "'='", 
                                                            "'..'", "'print'", 
                                                            "'['", "']'", 
                                                            "'break'", "'branch'", 
                                                            "'create'", 
                                                            "'component'", 
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
                                                             "Break", "Branch", 
                                                             "Create", "Component", 
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
                                                             "ID", "INSTANCE_NAME_WITH_PROPERTY", 
                                                             "INTEGER_VALUE", 
                                                             "DECIMAL_VALUE", 
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
		"script", "expression", "branch_blocks", "branch_block_inner", "property_set_expr2", 
		"assignment_expr2", "add_component_expr", "component_select_expr", "pin_select_expr", 
		"pin_select_expr2", "at_component_expr", "to_component_expr", "at_to_multiple_expr", 
		"at_to_multiple_line_expr", "at_to_multiple_line_expr_to_pin", "at_block", 
		"at_block_expressions", "at_block_pin_expr", "at_block_pin_expression_simple", 
		"at_block_pin_expression_complex", "break_keyword", "assignment_expr", 
		"keyword_assignment_expr", "parameters", "property_set_expr", "double_dot_property_set_expr", 
		"data_expr", "binary_operator", "unary_operator", "value_expr", "print_expr", 
		"function_def_expr", "function_expr", "function_args_expr", "function_call_expr", 
		"function_return_expr", "create_component_expr", "property_expr", "property_key_expr", 
		"property_value_expr", "rounded_brackets_expr", "style_expr", "blank_expr", 
		"wire_expr", "point_expr", "import_expr",
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
			this.state = 94;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				this.state = 94;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 4:
				case 5:
				case 6:
				case 8:
				case 9:
				case 12:
				case 14:
				case 15:
				case 16:
				case 17:
				case 19:
				case 20:
				case 33:
				case 34:
					{
					this.state = 92;
					this.expression();
					}
					break;
				case 43:
					{
					this.state = 93;
					this.match(CircuitScriptParser.NEWLINE);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 96;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1823600) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 1027) !== 0));
			this.state = 98;
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
			this.state = 118;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 2, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 100;
				this.add_component_expr();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 101;
				this.at_to_multiple_expr();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 102;
				this.to_component_expr();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 103;
				this.at_component_expr();
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 104;
				this.property_set_expr();
				}
				break;
			case 6:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 105;
				this.property_set_expr2();
				}
				break;
			case 7:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 106;
				this.double_dot_property_set_expr();
				}
				break;
			case 8:
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 107;
				this.break_keyword();
				}
				break;
			case 9:
				this.enterOuterAlt(localctx, 9);
				{
				this.state = 108;
				this.function_def_expr();
				}
				break;
			case 10:
				this.enterOuterAlt(localctx, 10);
				{
				this.state = 109;
				this.function_call_expr();
				}
				break;
			case 11:
				this.enterOuterAlt(localctx, 11);
				{
				this.state = 110;
				this.assignment_expr();
				}
				break;
			case 12:
				this.enterOuterAlt(localctx, 12);
				{
				this.state = 111;
				this.wire_expr();
				}
				break;
			case 13:
				this.enterOuterAlt(localctx, 13);
				{
				this.state = 112;
				this.point_expr();
				}
				break;
			case 14:
				this.enterOuterAlt(localctx, 14);
				{
				this.state = 113;
				this.import_expr();
				}
				break;
			case 15:
				this.enterOuterAlt(localctx, 15);
				{
				this.state = 114;
				this.at_block();
				}
				break;
			case 16:
				this.enterOuterAlt(localctx, 16);
				{
				this.state = 115;
				this.branch_blocks();
				}
				break;
			case 17:
				this.enterOuterAlt(localctx, 17);
				{
				this.state = 116;
				this.style_expr();
				}
				break;
			case 18:
				this.enterOuterAlt(localctx, 18);
				{
				this.state = 117;
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
			this.state = 121;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 120;
					this.branch_block_inner();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 123;
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
			this.state = 125;
			this.match(CircuitScriptParser.Branch);
			this.state = 126;
			this.match(CircuitScriptParser.T__0);
			this.state = 127;
			this.match(CircuitScriptParser.NEWLINE);
			this.state = 128;
			this.match(CircuitScriptParser.INDENT);
			this.state = 131;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				this.state = 131;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 43:
					{
					this.state = 129;
					this.match(CircuitScriptParser.NEWLINE);
					}
					break;
				case 4:
				case 5:
				case 6:
				case 8:
				case 9:
				case 12:
				case 14:
				case 15:
				case 16:
				case 17:
				case 19:
				case 20:
				case 33:
				case 34:
					{
					this.state = 130;
					this.expression();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 133;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1823600) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 1027) !== 0));
			this.state = 135;
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
			this.state = 137;
			this.match(CircuitScriptParser.INSTANCE_NAME_WITH_PROPERTY);
			this.state = 138;
			this.match(CircuitScriptParser.T__0);
			this.state = 139;
			this.match(CircuitScriptParser.NEWLINE);
			this.state = 140;
			this.match(CircuitScriptParser.INDENT);
			this.state = 143;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				this.state = 143;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 43:
					{
					this.state = 141;
					this.match(CircuitScriptParser.NEWLINE);
					}
					break;
				case 33:
				case 35:
					{
					this.state = 142;
					this.assignment_expr2();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 145;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 1029) !== 0));
			this.state = 147;
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
			this.state = 149;
			_la = this._input.LA(1);
			if(!(_la===33 || _la===35)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 150;
			this.match(CircuitScriptParser.T__0);
			this.state = 151;
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
			this.state = 153;
			this.match(CircuitScriptParser.Add);
			this.state = 154;
			this.data_expr(0);
			this.state = 156;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===13) {
				{
				this.state = 155;
				this.pin_select_expr();
				}
			}

			this.state = 159;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 9, this._ctx) ) {
			case 1:
				{
				this.state = 158;
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
			this.state = 166;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 6:
			case 10:
			case 22:
			case 29:
			case 32:
			case 33:
			case 35:
			case 36:
			case 37:
			case 38:
			case 39:
				this.enterOuterAlt(localctx, 1);
				{
				{
				this.state = 161;
				this.data_expr(0);
				this.state = 163;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===13) {
					{
					this.state = 162;
					this.pin_select_expr();
					}
				}

				}
				}
				break;
			case 13:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 165;
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
			this.state = 168;
			this.match(CircuitScriptParser.Pin);
			this.state = 169;
			_la = this._input.LA(1);
			if(!(_la===35 || _la===38)) {
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
			this.state = 171;
			_la = this._input.LA(1);
			if(!(_la===35 || _la===38)) {
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
			this.state = 173;
			this.match(CircuitScriptParser.At);
			this.state = 174;
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
		this.enterRule(localctx, 22, CircuitScriptParser.RULE_to_component_expr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 176;
			this.match(CircuitScriptParser.To);
			this.state = 177;
			this.component_select_expr();
			this.state = 182;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===2) {
				{
				{
				this.state = 178;
				this.match(CircuitScriptParser.T__1);
				this.state = 179;
				this.component_select_expr();
				}
				}
				this.state = 184;
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
		this.enterRule(localctx, 24, CircuitScriptParser.RULE_at_to_multiple_expr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 185;
			this.match(CircuitScriptParser.At);
			this.state = 186;
			this.component_select_expr();
			this.state = 187;
			this.match(CircuitScriptParser.To);
			this.state = 188;
			this.component_select_expr();
			this.state = 193;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===2) {
				{
				{
				this.state = 189;
				this.match(CircuitScriptParser.T__1);
				this.state = 190;
				this.component_select_expr();
				}
				}
				this.state = 195;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 196;
			this.match(CircuitScriptParser.T__0);
			this.state = 197;
			this.match(CircuitScriptParser.NEWLINE);
			this.state = 198;
			this.match(CircuitScriptParser.INDENT);
			this.state = 201;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				this.state = 201;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 43:
					{
					this.state = 199;
					this.match(CircuitScriptParser.NEWLINE);
					}
					break;
				case 35:
				case 38:
					{
					this.state = 200;
					this.at_to_multiple_line_expr();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 203;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & 265) !== 0));
			this.state = 205;
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
			this.state = 207;
			this.pin_select_expr2();
			this.state = 208;
			this.match(CircuitScriptParser.T__0);
			this.state = 209;
			this.at_to_multiple_line_expr_to_pin();
			this.state = 214;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===2) {
				{
				{
				this.state = 210;
				this.match(CircuitScriptParser.T__1);
				this.state = 211;
				this.at_to_multiple_line_expr_to_pin();
				}
				}
				this.state = 216;
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
			this.state = 217;
			_la = this._input.LA(1);
			if(!(_la===31 || _la===35)) {
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
			this.state = 219;
			this.at_component_expr();
			this.state = 220;
			this.match(CircuitScriptParser.T__0);
			this.state = 221;
			this.match(CircuitScriptParser.NEWLINE);
			this.state = 222;
			this.match(CircuitScriptParser.INDENT);
			this.state = 225;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				this.state = 225;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 43:
					{
					this.state = 223;
					this.match(CircuitScriptParser.NEWLINE);
					}
					break;
				case 4:
				case 5:
				case 6:
				case 8:
				case 9:
				case 12:
				case 14:
				case 15:
				case 16:
				case 17:
				case 19:
				case 20:
				case 33:
				case 34:
				case 35:
				case 38:
					{
					this.state = 224;
					this.at_block_expressions();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 227;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1823600) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 1063) !== 0));
			this.state = 229;
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
			this.state = 233;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 4:
			case 5:
			case 6:
			case 8:
			case 9:
			case 12:
			case 14:
			case 15:
			case 16:
			case 17:
			case 19:
			case 20:
			case 33:
			case 34:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 231;
				this.expression();
				}
				break;
			case 35:
			case 38:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 232;
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
			this.state = 235;
			this.pin_select_expr2();
			this.state = 236;
			this.match(CircuitScriptParser.T__0);
			this.state = 239;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 4:
			case 5:
			case 6:
			case 8:
			case 9:
			case 12:
			case 14:
			case 15:
			case 16:
			case 17:
			case 19:
			case 20:
			case 31:
			case 33:
			case 34:
				{
				this.state = 237;
				this.at_block_pin_expression_simple();
				}
				break;
			case 43:
				{
				this.state = 238;
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
			this.state = 243;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 4:
			case 5:
			case 6:
			case 8:
			case 9:
			case 12:
			case 14:
			case 15:
			case 16:
			case 17:
			case 19:
			case 20:
			case 33:
			case 34:
				{
				this.state = 241;
				this.expression();
				}
				break;
			case 31:
				{
				this.state = 242;
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
			this.state = 245;
			this.match(CircuitScriptParser.NEWLINE);
			this.state = 246;
			this.match(CircuitScriptParser.INDENT);
			this.state = 249;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				this.state = 249;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 43:
					{
					this.state = 247;
					this.match(CircuitScriptParser.NEWLINE);
					}
					break;
				case 4:
				case 5:
				case 6:
				case 8:
				case 9:
				case 12:
				case 14:
				case 15:
				case 16:
				case 17:
				case 19:
				case 20:
				case 33:
				case 34:
					{
					this.state = 248;
					this.expression();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 251;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1823600) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 1027) !== 0));
			this.state = 253;
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
			this.state = 255;
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
			this.state = 257;
			this.match(CircuitScriptParser.ID);
			this.state = 258;
			this.match(CircuitScriptParser.T__2);
			this.state = 259;
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
			this.state = 261;
			this.match(CircuitScriptParser.ID);
			this.state = 262;
			this.match(CircuitScriptParser.T__2);
			this.state = 263;
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
			this.state = 288;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 27, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				{
				this.state = 265;
				this.data_expr(0);
				this.state = 270;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 24, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 266;
						this.match(CircuitScriptParser.T__1);
						this.state = 267;
						this.data_expr(0);
						}
						}
					}
					this.state = 272;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 24, this._ctx);
				}
				this.state = 277;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===2) {
					{
					{
					this.state = 273;
					this.match(CircuitScriptParser.T__1);
					this.state = 274;
					this.keyword_assignment_expr();
					}
					}
					this.state = 279;
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
				this.state = 280;
				this.keyword_assignment_expr();
				this.state = 285;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===2) {
					{
					{
					this.state = 281;
					this.match(CircuitScriptParser.T__1);
					this.state = 282;
					this.keyword_assignment_expr();
					}
					}
					this.state = 287;
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
			this.state = 290;
			this.match(CircuitScriptParser.INSTANCE_NAME_WITH_PROPERTY);
			this.state = 291;
			this.match(CircuitScriptParser.T__2);
			this.state = 292;
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
			this.state = 294;
			this.match(CircuitScriptParser.T__3);
			this.state = 295;
			this.match(CircuitScriptParser.ID);
			this.state = 296;
			this.match(CircuitScriptParser.T__2);
			this.state = 297;
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
			this.state = 312;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 28, this._ctx) ) {
			case 1:
				{
				localctx = new DataExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 300;
				this.function_call_expr();
				}
				break;
			case 2:
				{
				localctx = new DataExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 301;
				this.match(CircuitScriptParser.ID);
				}
				break;
			case 3:
				{
				localctx = new DataExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 302;
				this.create_component_expr();
				}
				break;
			case 4:
				{
				localctx = new DataExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 303;
				this.assignment_expr();
				}
				break;
			case 5:
				{
				localctx = new UnaryOperatorExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 304;
				this.unary_operator();
				this.state = 305;
				this.data_expr(3);
				}
				break;
			case 6:
				{
				localctx = new RoundedBracketsExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 307;
				this.match(CircuitScriptParser.OPEN_PAREN);
				this.state = 308;
				this.data_expr(0);
				this.state = 309;
				this.match(CircuitScriptParser.CLOSE_PAREN);
				}
				break;
			case 7:
				{
				localctx = new DataExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 311;
				this.value_expr();
				}
				break;
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 326;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 30, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 324;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 29, this._ctx) ) {
					case 1:
						{
						localctx = new MultiplyExprContext(this, new Data_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, CircuitScriptParser.RULE_data_expr);
						this.state = 314;
						if (!(this.precpred(this._ctx, 10))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 10)");
						}
						this.state = 315;
						_la = this._input.LA(1);
						if(!(_la===27 || _la===28)) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 316;
						this.data_expr(11);
						}
						break;
					case 2:
						{
						localctx = new AdditionExprContext(this, new Data_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, CircuitScriptParser.RULE_data_expr);
						this.state = 317;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 318;
						_la = this._input.LA(1);
						if(!(_la===25 || _la===26)) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 319;
						this.data_expr(10);
						}
						break;
					case 3:
						{
						localctx = new BinaryOperatorExprContext(this, new Data_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, CircuitScriptParser.RULE_data_expr);
						this.state = 320;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 321;
						this.binary_operator();
						this.state = 322;
						this.data_expr(5);
						}
						break;
					}
					}
				}
				this.state = 328;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 30, this._ctx);
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
			this.state = 329;
			_la = this._input.LA(1);
			if(!(_la===23 || _la===24)) {
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
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 331;
			this.match(CircuitScriptParser.Not);
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
			this.state = 340;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 37:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 333;
				this.match(CircuitScriptParser.NUMERIC_VALUE);
				}
				break;
			case 36:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 334;
				this.match(CircuitScriptParser.DECIMAL_VALUE);
				}
				break;
			case 35:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 335;
				this.match(CircuitScriptParser.INTEGER_VALUE);
				}
				break;
			case 38:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 336;
				this.match(CircuitScriptParser.STRING_VALUE);
				}
				break;
			case 39:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 337;
				this.match(CircuitScriptParser.PERCENTAGE_VALUE);
				}
				break;
			case 32:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 338;
				this.match(CircuitScriptParser.BOOLEAN_VALUE);
				}
				break;
			case 6:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 339;
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
	public print_expr(): Print_exprContext {
		let localctx: Print_exprContext = new Print_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 60, CircuitScriptParser.RULE_print_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 342;
			this.match(CircuitScriptParser.T__4);
			this.state = 343;
			this.match(CircuitScriptParser.OPEN_PAREN);
			this.state = 344;
			this.data_expr(0);
			this.state = 345;
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
		this.enterRule(localctx, 62, CircuitScriptParser.RULE_function_def_expr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 347;
			this.match(CircuitScriptParser.Define);
			this.state = 348;
			this.match(CircuitScriptParser.ID);
			this.state = 349;
			this.match(CircuitScriptParser.OPEN_PAREN);
			this.state = 351;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===33) {
				{
				this.state = 350;
				this.function_args_expr();
				}
			}

			this.state = 353;
			this.match(CircuitScriptParser.CLOSE_PAREN);
			this.state = 354;
			this.match(CircuitScriptParser.T__0);
			this.state = 355;
			this.match(CircuitScriptParser.NEWLINE);
			this.state = 356;
			this.match(CircuitScriptParser.INDENT);
			this.state = 359;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				this.state = 359;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 43:
					{
					this.state = 357;
					this.match(CircuitScriptParser.NEWLINE);
					}
					break;
				case 4:
				case 5:
				case 6:
				case 8:
				case 9:
				case 12:
				case 14:
				case 15:
				case 16:
				case 17:
				case 18:
				case 19:
				case 20:
				case 33:
				case 34:
					{
					this.state = 358;
					this.function_expr();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 361;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2085744) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 1027) !== 0));
			this.state = 363;
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
		this.enterRule(localctx, 64, CircuitScriptParser.RULE_function_expr);
		try {
			this.state = 367;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 4:
			case 5:
			case 6:
			case 8:
			case 9:
			case 12:
			case 14:
			case 15:
			case 16:
			case 17:
			case 19:
			case 20:
			case 33:
			case 34:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 365;
				this.expression();
				}
				break;
			case 18:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 366;
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
		this.enterRule(localctx, 66, CircuitScriptParser.RULE_function_args_expr);
		let _la: number;
		try {
			let _alt: number;
			this.state = 398;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 39, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 369;
				this.match(CircuitScriptParser.ID);
				this.state = 374;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 36, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 370;
						this.match(CircuitScriptParser.T__1);
						this.state = 371;
						this.match(CircuitScriptParser.ID);
						}
						}
					}
					this.state = 376;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 36, this._ctx);
				}
				this.state = 383;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===2) {
					{
					{
					this.state = 377;
					this.match(CircuitScriptParser.T__1);
					this.state = 378;
					this.match(CircuitScriptParser.ID);
					this.state = 379;
					this.match(CircuitScriptParser.T__2);
					this.state = 380;
					this.value_expr();
					}
					}
					this.state = 385;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 386;
				this.match(CircuitScriptParser.ID);
				this.state = 387;
				this.match(CircuitScriptParser.T__2);
				this.state = 388;
				this.value_expr();
				this.state = 395;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===2) {
					{
					{
					this.state = 389;
					this.match(CircuitScriptParser.T__1);
					this.state = 390;
					this.match(CircuitScriptParser.ID);
					this.state = 391;
					this.match(CircuitScriptParser.T__2);
					this.state = 392;
					this.value_expr();
					}
					}
					this.state = 397;
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
	public function_call_expr(): Function_call_exprContext {
		let localctx: Function_call_exprContext = new Function_call_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 68, CircuitScriptParser.RULE_function_call_expr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 400;
			this.match(CircuitScriptParser.ID);
			this.state = 401;
			this.match(CircuitScriptParser.OPEN_PAREN);
			this.state = 403;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 541066304) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 251) !== 0)) {
				{
				this.state = 402;
				this.parameters();
				}
			}

			this.state = 405;
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
	public function_return_expr(): Function_return_exprContext {
		let localctx: Function_return_exprContext = new Function_return_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 70, CircuitScriptParser.RULE_function_return_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 407;
			this.match(CircuitScriptParser.Return);
			this.state = 408;
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
		this.enterRule(localctx, 72, CircuitScriptParser.RULE_create_component_expr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 410;
			this.match(CircuitScriptParser.Create);
			this.state = 411;
			this.match(CircuitScriptParser.Component);
			this.state = 412;
			this.match(CircuitScriptParser.T__0);
			this.state = 413;
			this.match(CircuitScriptParser.NEWLINE);
			this.state = 414;
			this.match(CircuitScriptParser.INDENT);
			this.state = 417;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				this.state = 417;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 43:
					{
					this.state = 415;
					this.match(CircuitScriptParser.NEWLINE);
					}
					break;
				case 33:
				case 35:
				case 38:
					{
					this.state = 416;
					this.property_expr();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 419;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 1061) !== 0));
			this.state = 421;
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
		this.enterRule(localctx, 74, CircuitScriptParser.RULE_property_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 423;
			this.property_key_expr();
			this.state = 424;
			this.match(CircuitScriptParser.T__0);
			this.state = 425;
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
		this.enterRule(localctx, 76, CircuitScriptParser.RULE_property_key_expr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 427;
			_la = this._input.LA(1);
			if(!(((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 37) !== 0))) {
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
		this.enterRule(localctx, 78, CircuitScriptParser.RULE_property_value_expr);
		let _la: number;
		try {
			this.state = 446;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 43:
				localctx = new Nested_propertiesContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 429;
				this.match(CircuitScriptParser.NEWLINE);
				this.state = 430;
				this.match(CircuitScriptParser.INDENT);
				this.state = 433;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					this.state = 433;
					this._errHandler.sync(this);
					switch (this._input.LA(1)) {
					case 43:
						{
						this.state = 431;
						this.match(CircuitScriptParser.NEWLINE);
						}
						break;
					case 33:
					case 35:
					case 38:
						{
						this.state = 432;
						this.property_expr();
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					}
					this.state = 435;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 1061) !== 0));
				this.state = 437;
				this.match(CircuitScriptParser.DEDENT);
				}
				break;
			case 6:
			case 10:
			case 22:
			case 29:
			case 32:
			case 33:
			case 35:
			case 36:
			case 37:
			case 38:
			case 39:
				localctx = new Single_line_propertyContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 438;
				this.data_expr(0);
				this.state = 443;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===2) {
					{
					{
					this.state = 439;
					this.match(CircuitScriptParser.T__1);
					this.state = 440;
					this.data_expr(0);
					}
					}
					this.state = 445;
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
		this.enterRule(localctx, 80, CircuitScriptParser.RULE_rounded_brackets_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 448;
			this.match(CircuitScriptParser.OPEN_PAREN);
			this.state = 451;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 47, this._ctx) ) {
			case 1:
				{
				this.state = 449;
				this.expression();
				}
				break;
			case 2:
				{
				this.state = 450;
				this.data_expr(0);
				}
				break;
			}
			this.state = 453;
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
		this.enterRule(localctx, 82, CircuitScriptParser.RULE_style_expr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 455;
			this.match(CircuitScriptParser.T__5);
			this.state = 456;
			this.match(CircuitScriptParser.ID);
			this.state = 457;
			this.match(CircuitScriptParser.T__2);
			this.state = 458;
			this.value_expr();
			this.state = 465;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===2) {
				{
				{
				this.state = 459;
				this.match(CircuitScriptParser.T__1);
				this.state = 460;
				this.match(CircuitScriptParser.ID);
				this.state = 461;
				this.match(CircuitScriptParser.T__2);
				this.state = 462;
				this.value_expr();
				}
				}
				this.state = 467;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 468;
			this.match(CircuitScriptParser.T__6);
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
		this.enterRule(localctx, 84, CircuitScriptParser.RULE_blank_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 470;
			this.match(CircuitScriptParser.T__5);
			this.state = 471;
			this.match(CircuitScriptParser.INTEGER_VALUE);
			this.state = 472;
			this.match(CircuitScriptParser.T__6);
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
		this.enterRule(localctx, 86, CircuitScriptParser.RULE_wire_expr);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 474;
			this.match(CircuitScriptParser.Wire);
			this.state = 475;
			this.match(CircuitScriptParser.ID);
			this.state = 479;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 49, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 476;
					_la = this._input.LA(1);
					if(!(_la===33 || _la===35)) {
					this._errHandler.recoverInline(this);
					}
					else {
						this._errHandler.reportMatch(this);
					    this.consume();
					}
					}
					}
				}
				this.state = 481;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 49, this._ctx);
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
		this.enterRule(localctx, 88, CircuitScriptParser.RULE_point_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 482;
			this.match(CircuitScriptParser.Point);
			this.state = 483;
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
		this.enterRule(localctx, 90, CircuitScriptParser.RULE_import_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 485;
			this.match(CircuitScriptParser.Import);
			this.state = 486;
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
			return this.precpred(this._ctx, 10);
		case 1:
			return this.precpred(this._ctx, 9);
		case 2:
			return this.precpred(this._ctx, 4);
		}
		return true;
	}

	public static readonly _serializedATN: number[] = [4,1,46,489,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,
	7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,
	24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,
	2,32,7,32,2,33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,
	39,7,39,2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,1,0,
	1,0,4,0,95,8,0,11,0,12,0,96,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,119,8,1,1,2,4,2,122,8,2,11,2,12,
	2,123,1,3,1,3,1,3,1,3,1,3,1,3,4,3,132,8,3,11,3,12,3,133,1,3,1,3,1,4,1,4,
	1,4,1,4,1,4,1,4,4,4,144,8,4,11,4,12,4,145,1,4,1,4,1,5,1,5,1,5,1,5,1,6,1,
	6,1,6,3,6,157,8,6,1,6,3,6,160,8,6,1,7,1,7,3,7,164,8,7,1,7,3,7,167,8,7,1,
	8,1,8,1,8,1,9,1,9,1,10,1,10,1,10,1,11,1,11,1,11,1,11,5,11,181,8,11,10,11,
	12,11,184,9,11,1,12,1,12,1,12,1,12,1,12,1,12,5,12,192,8,12,10,12,12,12,
	195,9,12,1,12,1,12,1,12,1,12,1,12,4,12,202,8,12,11,12,12,12,203,1,12,1,
	12,1,13,1,13,1,13,1,13,1,13,5,13,213,8,13,10,13,12,13,216,9,13,1,14,1,14,
	1,15,1,15,1,15,1,15,1,15,1,15,4,15,226,8,15,11,15,12,15,227,1,15,1,15,1,
	16,1,16,3,16,234,8,16,1,17,1,17,1,17,1,17,3,17,240,8,17,1,18,1,18,3,18,
	244,8,18,1,19,1,19,1,19,1,19,4,19,250,8,19,11,19,12,19,251,1,19,1,19,1,
	20,1,20,1,21,1,21,1,21,1,21,1,22,1,22,1,22,1,22,1,23,1,23,1,23,5,23,269,
	8,23,10,23,12,23,272,9,23,1,23,1,23,5,23,276,8,23,10,23,12,23,279,9,23,
	1,23,1,23,1,23,5,23,284,8,23,10,23,12,23,287,9,23,3,23,289,8,23,1,24,1,
	24,1,24,1,24,1,25,1,25,1,25,1,25,1,25,1,26,1,26,1,26,1,26,1,26,1,26,1,26,
	1,26,1,26,1,26,1,26,1,26,1,26,3,26,313,8,26,1,26,1,26,1,26,1,26,1,26,1,
	26,1,26,1,26,1,26,1,26,5,26,325,8,26,10,26,12,26,328,9,26,1,27,1,27,1,28,
	1,28,1,29,1,29,1,29,1,29,1,29,1,29,1,29,3,29,341,8,29,1,30,1,30,1,30,1,
	30,1,30,1,31,1,31,1,31,1,31,3,31,352,8,31,1,31,1,31,1,31,1,31,1,31,1,31,
	4,31,360,8,31,11,31,12,31,361,1,31,1,31,1,32,1,32,3,32,368,8,32,1,33,1,
	33,1,33,5,33,373,8,33,10,33,12,33,376,9,33,1,33,1,33,1,33,1,33,5,33,382,
	8,33,10,33,12,33,385,9,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,5,33,394,8,
	33,10,33,12,33,397,9,33,3,33,399,8,33,1,34,1,34,1,34,3,34,404,8,34,1,34,
	1,34,1,35,1,35,1,35,1,36,1,36,1,36,1,36,1,36,1,36,1,36,4,36,418,8,36,11,
	36,12,36,419,1,36,1,36,1,37,1,37,1,37,1,37,1,38,1,38,1,39,1,39,1,39,1,39,
	4,39,434,8,39,11,39,12,39,435,1,39,1,39,1,39,1,39,5,39,442,8,39,10,39,12,
	39,445,9,39,3,39,447,8,39,1,40,1,40,1,40,3,40,452,8,40,1,40,1,40,1,41,1,
	41,1,41,1,41,1,41,1,41,1,41,1,41,5,41,464,8,41,10,41,12,41,467,9,41,1,41,
	1,41,1,42,1,42,1,42,1,42,1,43,1,43,1,43,5,43,478,8,43,10,43,12,43,481,9,
	43,1,44,1,44,1,44,1,45,1,45,1,45,1,45,0,1,52,46,0,2,4,6,8,10,12,14,16,18,
	20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,
	68,70,72,74,76,78,80,82,84,86,88,90,0,7,2,0,33,33,35,35,2,0,35,35,38,38,
	2,0,31,31,35,35,1,0,27,28,1,0,25,26,1,0,23,24,3,0,33,33,35,35,38,38,519,
	0,94,1,0,0,0,2,118,1,0,0,0,4,121,1,0,0,0,6,125,1,0,0,0,8,137,1,0,0,0,10,
	149,1,0,0,0,12,153,1,0,0,0,14,166,1,0,0,0,16,168,1,0,0,0,18,171,1,0,0,0,
	20,173,1,0,0,0,22,176,1,0,0,0,24,185,1,0,0,0,26,207,1,0,0,0,28,217,1,0,
	0,0,30,219,1,0,0,0,32,233,1,0,0,0,34,235,1,0,0,0,36,243,1,0,0,0,38,245,
	1,0,0,0,40,255,1,0,0,0,42,257,1,0,0,0,44,261,1,0,0,0,46,288,1,0,0,0,48,
	290,1,0,0,0,50,294,1,0,0,0,52,312,1,0,0,0,54,329,1,0,0,0,56,331,1,0,0,0,
	58,340,1,0,0,0,60,342,1,0,0,0,62,347,1,0,0,0,64,367,1,0,0,0,66,398,1,0,
	0,0,68,400,1,0,0,0,70,407,1,0,0,0,72,410,1,0,0,0,74,423,1,0,0,0,76,427,
	1,0,0,0,78,446,1,0,0,0,80,448,1,0,0,0,82,455,1,0,0,0,84,470,1,0,0,0,86,
	474,1,0,0,0,88,482,1,0,0,0,90,485,1,0,0,0,92,95,3,2,1,0,93,95,5,43,0,0,
	94,92,1,0,0,0,94,93,1,0,0,0,95,96,1,0,0,0,96,94,1,0,0,0,96,97,1,0,0,0,97,
	98,1,0,0,0,98,99,5,0,0,1,99,1,1,0,0,0,100,119,3,12,6,0,101,119,3,24,12,
	0,102,119,3,22,11,0,103,119,3,20,10,0,104,119,3,48,24,0,105,119,3,8,4,0,
	106,119,3,50,25,0,107,119,3,40,20,0,108,119,3,62,31,0,109,119,3,68,34,0,
	110,119,3,42,21,0,111,119,3,86,43,0,112,119,3,88,44,0,113,119,3,90,45,0,
	114,119,3,30,15,0,115,119,3,4,2,0,116,119,3,82,41,0,117,119,3,60,30,0,118,
	100,1,0,0,0,118,101,1,0,0,0,118,102,1,0,0,0,118,103,1,0,0,0,118,104,1,0,
	0,0,118,105,1,0,0,0,118,106,1,0,0,0,118,107,1,0,0,0,118,108,1,0,0,0,118,
	109,1,0,0,0,118,110,1,0,0,0,118,111,1,0,0,0,118,112,1,0,0,0,118,113,1,0,
	0,0,118,114,1,0,0,0,118,115,1,0,0,0,118,116,1,0,0,0,118,117,1,0,0,0,119,
	3,1,0,0,0,120,122,3,6,3,0,121,120,1,0,0,0,122,123,1,0,0,0,123,121,1,0,0,
	0,123,124,1,0,0,0,124,5,1,0,0,0,125,126,5,9,0,0,126,127,5,1,0,0,127,128,
	5,43,0,0,128,131,5,45,0,0,129,132,5,43,0,0,130,132,3,2,1,0,131,129,1,0,
	0,0,131,130,1,0,0,0,132,133,1,0,0,0,133,131,1,0,0,0,133,134,1,0,0,0,134,
	135,1,0,0,0,135,136,5,46,0,0,136,7,1,0,0,0,137,138,5,34,0,0,138,139,5,1,
	0,0,139,140,5,43,0,0,140,143,5,45,0,0,141,144,5,43,0,0,142,144,3,10,5,0,
	143,141,1,0,0,0,143,142,1,0,0,0,144,145,1,0,0,0,145,143,1,0,0,0,145,146,
	1,0,0,0,146,147,1,0,0,0,147,148,5,46,0,0,148,9,1,0,0,0,149,150,7,0,0,0,
	150,151,5,1,0,0,151,152,3,58,29,0,152,11,1,0,0,0,153,154,5,14,0,0,154,156,
	3,52,26,0,155,157,3,16,8,0,156,155,1,0,0,0,156,157,1,0,0,0,157,159,1,0,
	0,0,158,160,5,33,0,0,159,158,1,0,0,0,159,160,1,0,0,0,160,13,1,0,0,0,161,
	163,3,52,26,0,162,164,3,16,8,0,163,162,1,0,0,0,163,164,1,0,0,0,164,167,
	1,0,0,0,165,167,3,16,8,0,166,161,1,0,0,0,166,165,1,0,0,0,167,15,1,0,0,0,
	168,169,5,13,0,0,169,170,7,1,0,0,170,17,1,0,0,0,171,172,7,1,0,0,172,19,
	1,0,0,0,173,174,5,15,0,0,174,175,3,14,7,0,175,21,1,0,0,0,176,177,5,16,0,
	0,177,182,3,14,7,0,178,179,5,2,0,0,179,181,3,14,7,0,180,178,1,0,0,0,181,
	184,1,0,0,0,182,180,1,0,0,0,182,183,1,0,0,0,183,23,1,0,0,0,184,182,1,0,
	0,0,185,186,5,15,0,0,186,187,3,14,7,0,187,188,5,16,0,0,188,193,3,14,7,0,
	189,190,5,2,0,0,190,192,3,14,7,0,191,189,1,0,0,0,192,195,1,0,0,0,193,191,
	1,0,0,0,193,194,1,0,0,0,194,196,1,0,0,0,195,193,1,0,0,0,196,197,5,1,0,0,
	197,198,5,43,0,0,198,201,5,45,0,0,199,202,5,43,0,0,200,202,3,26,13,0,201,
	199,1,0,0,0,201,200,1,0,0,0,202,203,1,0,0,0,203,201,1,0,0,0,203,204,1,0,
	0,0,204,205,1,0,0,0,205,206,5,46,0,0,206,25,1,0,0,0,207,208,3,18,9,0,208,
	209,5,1,0,0,209,214,3,28,14,0,210,211,5,2,0,0,211,213,3,28,14,0,212,210,
	1,0,0,0,213,216,1,0,0,0,214,212,1,0,0,0,214,215,1,0,0,0,215,27,1,0,0,0,
	216,214,1,0,0,0,217,218,7,2,0,0,218,29,1,0,0,0,219,220,3,20,10,0,220,221,
	5,1,0,0,221,222,5,43,0,0,222,225,5,45,0,0,223,226,5,43,0,0,224,226,3,32,
	16,0,225,223,1,0,0,0,225,224,1,0,0,0,226,227,1,0,0,0,227,225,1,0,0,0,227,
	228,1,0,0,0,228,229,1,0,0,0,229,230,5,46,0,0,230,31,1,0,0,0,231,234,3,2,
	1,0,232,234,3,34,17,0,233,231,1,0,0,0,233,232,1,0,0,0,234,33,1,0,0,0,235,
	236,3,18,9,0,236,239,5,1,0,0,237,240,3,36,18,0,238,240,3,38,19,0,239,237,
	1,0,0,0,239,238,1,0,0,0,240,35,1,0,0,0,241,244,3,2,1,0,242,244,5,31,0,0,
	243,241,1,0,0,0,243,242,1,0,0,0,244,37,1,0,0,0,245,246,5,43,0,0,246,249,
	5,45,0,0,247,250,5,43,0,0,248,250,3,2,1,0,249,247,1,0,0,0,249,248,1,0,0,
	0,250,251,1,0,0,0,251,249,1,0,0,0,251,252,1,0,0,0,252,253,1,0,0,0,253,254,
	5,46,0,0,254,39,1,0,0,0,255,256,5,8,0,0,256,41,1,0,0,0,257,258,5,33,0,0,
	258,259,5,3,0,0,259,260,3,52,26,0,260,43,1,0,0,0,261,262,5,33,0,0,262,263,
	5,3,0,0,263,264,3,52,26,0,264,45,1,0,0,0,265,270,3,52,26,0,266,267,5,2,
	0,0,267,269,3,52,26,0,268,266,1,0,0,0,269,272,1,0,0,0,270,268,1,0,0,0,270,
	271,1,0,0,0,271,277,1,0,0,0,272,270,1,0,0,0,273,274,5,2,0,0,274,276,3,44,
	22,0,275,273,1,0,0,0,276,279,1,0,0,0,277,275,1,0,0,0,277,278,1,0,0,0,278,
	289,1,0,0,0,279,277,1,0,0,0,280,285,3,44,22,0,281,282,5,2,0,0,282,284,3,
	44,22,0,283,281,1,0,0,0,284,287,1,0,0,0,285,283,1,0,0,0,285,286,1,0,0,0,
	286,289,1,0,0,0,287,285,1,0,0,0,288,265,1,0,0,0,288,280,1,0,0,0,289,47,
	1,0,0,0,290,291,5,34,0,0,291,292,5,3,0,0,292,293,3,52,26,0,293,49,1,0,0,
	0,294,295,5,4,0,0,295,296,5,33,0,0,296,297,5,3,0,0,297,298,3,52,26,0,298,
	51,1,0,0,0,299,300,6,26,-1,0,300,313,3,68,34,0,301,313,5,33,0,0,302,313,
	3,72,36,0,303,313,3,42,21,0,304,305,3,56,28,0,305,306,3,52,26,3,306,313,
	1,0,0,0,307,308,5,29,0,0,308,309,3,52,26,0,309,310,5,30,0,0,310,313,1,0,
	0,0,311,313,3,58,29,0,312,299,1,0,0,0,312,301,1,0,0,0,312,302,1,0,0,0,312,
	303,1,0,0,0,312,304,1,0,0,0,312,307,1,0,0,0,312,311,1,0,0,0,313,326,1,0,
	0,0,314,315,10,10,0,0,315,316,7,3,0,0,316,325,3,52,26,11,317,318,10,9,0,
	0,318,319,7,4,0,0,319,325,3,52,26,10,320,321,10,4,0,0,321,322,3,54,27,0,
	322,323,3,52,26,5,323,325,1,0,0,0,324,314,1,0,0,0,324,317,1,0,0,0,324,320,
	1,0,0,0,325,328,1,0,0,0,326,324,1,0,0,0,326,327,1,0,0,0,327,53,1,0,0,0,
	328,326,1,0,0,0,329,330,7,5,0,0,330,55,1,0,0,0,331,332,5,22,0,0,332,57,
	1,0,0,0,333,341,5,37,0,0,334,341,5,36,0,0,335,341,5,35,0,0,336,341,5,38,
	0,0,337,341,5,39,0,0,338,341,5,32,0,0,339,341,3,84,42,0,340,333,1,0,0,0,
	340,334,1,0,0,0,340,335,1,0,0,0,340,336,1,0,0,0,340,337,1,0,0,0,340,338,
	1,0,0,0,340,339,1,0,0,0,341,59,1,0,0,0,342,343,5,5,0,0,343,344,5,29,0,0,
	344,345,3,52,26,0,345,346,5,30,0,0,346,61,1,0,0,0,347,348,5,19,0,0,348,
	349,5,33,0,0,349,351,5,29,0,0,350,352,3,66,33,0,351,350,1,0,0,0,351,352,
	1,0,0,0,352,353,1,0,0,0,353,354,5,30,0,0,354,355,5,1,0,0,355,356,5,43,0,
	0,356,359,5,45,0,0,357,360,5,43,0,0,358,360,3,64,32,0,359,357,1,0,0,0,359,
	358,1,0,0,0,360,361,1,0,0,0,361,359,1,0,0,0,361,362,1,0,0,0,362,363,1,0,
	0,0,363,364,5,46,0,0,364,63,1,0,0,0,365,368,3,2,1,0,366,368,3,70,35,0,367,
	365,1,0,0,0,367,366,1,0,0,0,368,65,1,0,0,0,369,374,5,33,0,0,370,371,5,2,
	0,0,371,373,5,33,0,0,372,370,1,0,0,0,373,376,1,0,0,0,374,372,1,0,0,0,374,
	375,1,0,0,0,375,383,1,0,0,0,376,374,1,0,0,0,377,378,5,2,0,0,378,379,5,33,
	0,0,379,380,5,3,0,0,380,382,3,58,29,0,381,377,1,0,0,0,382,385,1,0,0,0,383,
	381,1,0,0,0,383,384,1,0,0,0,384,399,1,0,0,0,385,383,1,0,0,0,386,387,5,33,
	0,0,387,388,5,3,0,0,388,395,3,58,29,0,389,390,5,2,0,0,390,391,5,33,0,0,
	391,392,5,3,0,0,392,394,3,58,29,0,393,389,1,0,0,0,394,397,1,0,0,0,395,393,
	1,0,0,0,395,396,1,0,0,0,396,399,1,0,0,0,397,395,1,0,0,0,398,369,1,0,0,0,
	398,386,1,0,0,0,399,67,1,0,0,0,400,401,5,33,0,0,401,403,5,29,0,0,402,404,
	3,46,23,0,403,402,1,0,0,0,403,404,1,0,0,0,404,405,1,0,0,0,405,406,5,30,
	0,0,406,69,1,0,0,0,407,408,5,18,0,0,408,409,3,52,26,0,409,71,1,0,0,0,410,
	411,5,10,0,0,411,412,5,11,0,0,412,413,5,1,0,0,413,414,5,43,0,0,414,417,
	5,45,0,0,415,418,5,43,0,0,416,418,3,74,37,0,417,415,1,0,0,0,417,416,1,0,
	0,0,418,419,1,0,0,0,419,417,1,0,0,0,419,420,1,0,0,0,420,421,1,0,0,0,421,
	422,5,46,0,0,422,73,1,0,0,0,423,424,3,76,38,0,424,425,5,1,0,0,425,426,3,
	78,39,0,426,75,1,0,0,0,427,428,7,6,0,0,428,77,1,0,0,0,429,430,5,43,0,0,
	430,433,5,45,0,0,431,434,5,43,0,0,432,434,3,74,37,0,433,431,1,0,0,0,433,
	432,1,0,0,0,434,435,1,0,0,0,435,433,1,0,0,0,435,436,1,0,0,0,436,437,1,0,
	0,0,437,447,5,46,0,0,438,443,3,52,26,0,439,440,5,2,0,0,440,442,3,52,26,
	0,441,439,1,0,0,0,442,445,1,0,0,0,443,441,1,0,0,0,443,444,1,0,0,0,444,447,
	1,0,0,0,445,443,1,0,0,0,446,429,1,0,0,0,446,438,1,0,0,0,447,79,1,0,0,0,
	448,451,5,29,0,0,449,452,3,2,1,0,450,452,3,52,26,0,451,449,1,0,0,0,451,
	450,1,0,0,0,452,453,1,0,0,0,453,454,5,30,0,0,454,81,1,0,0,0,455,456,5,6,
	0,0,456,457,5,33,0,0,457,458,5,3,0,0,458,465,3,58,29,0,459,460,5,2,0,0,
	460,461,5,33,0,0,461,462,5,3,0,0,462,464,3,58,29,0,463,459,1,0,0,0,464,
	467,1,0,0,0,465,463,1,0,0,0,465,466,1,0,0,0,466,468,1,0,0,0,467,465,1,0,
	0,0,468,469,5,7,0,0,469,83,1,0,0,0,470,471,5,6,0,0,471,472,5,35,0,0,472,
	473,5,7,0,0,473,85,1,0,0,0,474,475,5,12,0,0,475,479,5,33,0,0,476,478,7,
	0,0,0,477,476,1,0,0,0,478,481,1,0,0,0,479,477,1,0,0,0,479,480,1,0,0,0,480,
	87,1,0,0,0,481,479,1,0,0,0,482,483,5,17,0,0,483,484,5,33,0,0,484,89,1,0,
	0,0,485,486,5,20,0,0,486,487,5,33,0,0,487,91,1,0,0,0,50,94,96,118,123,131,
	133,143,145,156,159,163,166,182,193,201,203,214,225,227,233,239,243,249,
	251,270,277,285,288,312,324,326,340,351,359,361,367,374,383,395,398,403,
	417,419,433,435,443,446,451,465,479];

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
	public function_call_expr(): Function_call_exprContext {
		return this.getTypedRuleContext(Function_call_exprContext, 0) as Function_call_exprContext;
	}
	public assignment_expr(): Assignment_exprContext {
		return this.getTypedRuleContext(Assignment_exprContext, 0) as Assignment_exprContext;
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
	public INSTANCE_NAME_WITH_PROPERTY(): TerminalNode {
		return this.getToken(CircuitScriptParser.INSTANCE_NAME_WITH_PROPERTY, 0);
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
	public function_call_expr(): Function_call_exprContext {
		return this.getTypedRuleContext(Function_call_exprContext, 0) as Function_call_exprContext;
	}
	public ID(): TerminalNode {
		return this.getToken(CircuitScriptParser.ID, 0);
	}
	public create_component_expr(): Create_component_exprContext {
		return this.getTypedRuleContext(Create_component_exprContext, 0) as Create_component_exprContext;
	}
	public assignment_expr(): Assignment_exprContext {
		return this.getTypedRuleContext(Assignment_exprContext, 0) as Assignment_exprContext;
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
	public NUMERIC_VALUE(): TerminalNode {
		return this.getToken(CircuitScriptParser.NUMERIC_VALUE, 0);
	}
	public DECIMAL_VALUE(): TerminalNode {
		return this.getToken(CircuitScriptParser.DECIMAL_VALUE, 0);
	}
	public INTEGER_VALUE(): TerminalNode {
		return this.getToken(CircuitScriptParser.INTEGER_VALUE, 0);
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


export class Function_call_exprContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
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
