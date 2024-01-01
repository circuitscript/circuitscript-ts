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
	public static readonly Break = 9;
	public static readonly Branch = 10;
	public static readonly Create = 11;
	public static readonly Component = 12;
	public static readonly Graphic = 13;
	public static readonly Wire = 14;
	public static readonly Pin = 15;
	public static readonly Add = 16;
	public static readonly At = 17;
	public static readonly To = 18;
	public static readonly Point = 19;
	public static readonly Return = 20;
	public static readonly Define = 21;
	public static readonly Import = 22;
	public static readonly If = 23;
	public static readonly Not = 24;
	public static readonly Equals = 25;
	public static readonly NotEquals = 26;
	public static readonly Addition = 27;
	public static readonly Minus = 28;
	public static readonly Divide = 29;
	public static readonly Multiply = 30;
	public static readonly OPEN_PAREN = 31;
	public static readonly CLOSE_PAREN = 32;
	public static readonly NOT_CONNECTED = 33;
	public static readonly BOOLEAN_VALUE = 34;
	public static readonly ID = 35;
	public static readonly INTEGER_VALUE = 36;
	public static readonly DECIMAL_VALUE = 37;
	public static readonly NUMERIC_VALUE = 38;
	public static readonly STRING_VALUE = 39;
	public static readonly PERCENTAGE_VALUE = 40;
	public static readonly ALPHA_NUMERIC = 41;
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
	public static readonly RULE_function_return_expr = 36;
	public static readonly RULE_create_component_expr = 37;
	public static readonly RULE_create_graphic_expr = 38;
	public static readonly RULE_sub_expr = 39;
	public static readonly RULE_property_expr = 40;
	public static readonly RULE_property_key_expr = 41;
	public static readonly RULE_property_value_expr = 42;
	public static readonly RULE_blank_expr = 43;
	public static readonly RULE_wire_expr = 44;
	public static readonly RULE_point_expr = 45;
	public static readonly RULE_import_expr = 46;
	public static readonly RULE_frame_expr = 47;
	public static readonly literalNames: (string | null)[] = [ null, "':'", 
                                                            "','", "'='", 
                                                            "'..'", "'.'", 
                                                            "'['", "']'", 
                                                            "'frame'", "'break'", 
                                                            "'branch'", 
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
                                                             null, "Break", 
                                                             "Branch", "Create", 
                                                             "Component", 
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
		"assignment_expr2", "data_expr_with_assignment", "add_component_expr", 
		"component_select_expr", "pin_select_expr", "pin_select_expr2", "at_component_expr", 
		"to_component_expr", "at_to_multiple_expr", "at_to_multiple_line_expr", 
		"at_to_multiple_line_expr_to_pin", "at_block", "at_block_expressions", 
		"at_block_pin_expr", "at_block_pin_expression_simple", "at_block_pin_expression_complex", 
		"break_keyword", "assignment_expr", "keyword_assignment_expr", "parameters", 
		"property_set_expr", "double_dot_property_set_expr", "data_expr", "binary_operator", 
		"unary_operator", "value_expr", "function_def_expr", "function_expr", 
		"function_args_expr", "atom_expr", "trailer_expr", "function_return_expr", 
		"create_component_expr", "create_graphic_expr", "sub_expr", "property_expr", 
		"property_key_expr", "property_value_expr", "blank_expr", "wire_expr", 
		"point_expr", "import_expr", "frame_expr",
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
			this.state = 98;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				this.state = 98;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 4:
				case 8:
				case 9:
				case 10:
				case 14:
				case 16:
				case 17:
				case 18:
				case 19:
				case 21:
				case 22:
				case 35:
					{
					this.state = 96;
					this.expression();
					}
					break;
				case 43:
					{
					this.state = 97;
					this.match(CircuitScriptParser.NEWLINE);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 100;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 7292688) !== 0) || _la===35 || _la===43);
			this.state = 102;
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
			this.state = 120;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 2, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 104;
				this.add_component_expr();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 105;
				this.to_component_expr();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 106;
				this.at_component_expr();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 107;
				this.assignment_expr();
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 108;
				this.property_set_expr();
				}
				break;
			case 6:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 109;
				this.property_set_expr2();
				}
				break;
			case 7:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 110;
				this.double_dot_property_set_expr();
				}
				break;
			case 8:
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 111;
				this.break_keyword();
				}
				break;
			case 9:
				this.enterOuterAlt(localctx, 9);
				{
				this.state = 112;
				this.function_def_expr();
				}
				break;
			case 10:
				this.enterOuterAlt(localctx, 10);
				{
				this.state = 113;
				this.wire_expr();
				}
				break;
			case 11:
				this.enterOuterAlt(localctx, 11);
				{
				this.state = 114;
				this.point_expr();
				}
				break;
			case 12:
				this.enterOuterAlt(localctx, 12);
				{
				this.state = 115;
				this.import_expr();
				}
				break;
			case 13:
				this.enterOuterAlt(localctx, 13);
				{
				this.state = 116;
				this.frame_expr();
				}
				break;
			case 14:
				this.enterOuterAlt(localctx, 14);
				{
				this.state = 117;
				this.atom_expr();
				}
				break;
			case 15:
				this.enterOuterAlt(localctx, 15);
				{
				this.state = 118;
				this.at_block();
				}
				break;
			case 16:
				this.enterOuterAlt(localctx, 16);
				{
				this.state = 119;
				this.branch_blocks();
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
			this.state = 123;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 122;
					this.branch_block_inner();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 125;
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
			this.state = 127;
			this.match(CircuitScriptParser.Branch);
			this.state = 128;
			this.match(CircuitScriptParser.T__0);
			this.state = 129;
			this.match(CircuitScriptParser.NEWLINE);
			this.state = 130;
			this.match(CircuitScriptParser.INDENT);
			this.state = 133;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				this.state = 133;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 43:
					{
					this.state = 131;
					this.match(CircuitScriptParser.NEWLINE);
					}
					break;
				case 4:
				case 8:
				case 9:
				case 10:
				case 14:
				case 16:
				case 17:
				case 18:
				case 19:
				case 21:
				case 22:
				case 35:
					{
					this.state = 132;
					this.expression();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 135;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 7292688) !== 0) || _la===35 || _la===43);
			this.state = 137;
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
			this.state = 139;
			this.atom_expr();
			this.state = 140;
			this.match(CircuitScriptParser.T__0);
			this.state = 141;
			this.match(CircuitScriptParser.NEWLINE);
			this.state = 142;
			this.match(CircuitScriptParser.INDENT);
			this.state = 145;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				this.state = 145;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 43:
					{
					this.state = 143;
					this.match(CircuitScriptParser.NEWLINE);
					}
					break;
				case 35:
				case 36:
					{
					this.state = 144;
					this.assignment_expr2();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 147;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & 259) !== 0));
			this.state = 149;
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
			this.state = 151;
			_la = this._input.LA(1);
			if(!(_la===35 || _la===36)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 152;
			this.match(CircuitScriptParser.T__0);
			this.state = 153;
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
	public data_expr_with_assignment(): Data_expr_with_assignmentContext {
		let localctx: Data_expr_with_assignmentContext = new Data_expr_with_assignmentContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, CircuitScriptParser.RULE_data_expr_with_assignment);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 157;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 8, this._ctx) ) {
			case 1:
				{
				this.state = 155;
				this.data_expr(0);
				}
				break;
			case 2:
				{
				this.state = 156;
				this.assignment_expr();
				}
				break;
			}
			this.state = 160;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===15) {
				{
				this.state = 159;
				this.pin_select_expr();
				}
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
	public add_component_expr(): Add_component_exprContext {
		let localctx: Add_component_exprContext = new Add_component_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 14, CircuitScriptParser.RULE_add_component_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 162;
			this.match(CircuitScriptParser.Add);
			this.state = 163;
			this.data_expr_with_assignment();
			this.state = 165;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 10, this._ctx) ) {
			case 1:
				{
				this.state = 164;
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
		this.enterRule(localctx, 16, CircuitScriptParser.RULE_component_select_expr);
		try {
			this.state = 169;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 6:
			case 11:
			case 24:
			case 28:
			case 31:
			case 34:
			case 35:
			case 36:
			case 37:
			case 38:
			case 39:
			case 40:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 167;
				this.data_expr_with_assignment();
				}
				break;
			case 15:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 168;
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
			this.state = 171;
			this.match(CircuitScriptParser.Pin);
			this.state = 172;
			_la = this._input.LA(1);
			if(!(_la===36 || _la===39)) {
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
			this.state = 174;
			_la = this._input.LA(1);
			if(!(_la===36 || _la===39)) {
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
			this.state = 176;
			this.match(CircuitScriptParser.At);
			this.state = 177;
			this.component_select_expr();
			this.state = 179;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 12, this._ctx) ) {
			case 1:
				{
				this.state = 178;
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
		this.enterRule(localctx, 24, CircuitScriptParser.RULE_to_component_expr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 181;
			this.match(CircuitScriptParser.To);
			this.state = 182;
			this.component_select_expr();
			this.state = 187;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===2) {
				{
				{
				this.state = 183;
				this.match(CircuitScriptParser.T__1);
				this.state = 184;
				this.component_select_expr();
				}
				}
				this.state = 189;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 191;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 14, this._ctx) ) {
			case 1:
				{
				this.state = 190;
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
		this.enterRule(localctx, 26, CircuitScriptParser.RULE_at_to_multiple_expr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 193;
			this.match(CircuitScriptParser.At);
			this.state = 194;
			this.component_select_expr();
			this.state = 195;
			this.match(CircuitScriptParser.To);
			this.state = 196;
			this.component_select_expr();
			this.state = 201;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===2) {
				{
				{
				this.state = 197;
				this.match(CircuitScriptParser.T__1);
				this.state = 198;
				this.component_select_expr();
				}
				}
				this.state = 203;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 204;
			this.match(CircuitScriptParser.T__0);
			this.state = 205;
			this.match(CircuitScriptParser.NEWLINE);
			this.state = 206;
			this.match(CircuitScriptParser.INDENT);
			this.state = 209;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				this.state = 209;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 43:
					{
					this.state = 207;
					this.match(CircuitScriptParser.NEWLINE);
					}
					break;
				case 36:
				case 39:
					{
					this.state = 208;
					this.at_to_multiple_line_expr();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 211;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & 137) !== 0));
			this.state = 213;
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
			this.state = 215;
			this.pin_select_expr2();
			this.state = 216;
			this.match(CircuitScriptParser.T__0);
			this.state = 217;
			this.at_to_multiple_line_expr_to_pin();
			this.state = 222;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===2) {
				{
				{
				this.state = 218;
				this.match(CircuitScriptParser.T__1);
				this.state = 219;
				this.at_to_multiple_line_expr_to_pin();
				}
				}
				this.state = 224;
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
			this.state = 225;
			_la = this._input.LA(1);
			if(!(_la===33 || _la===36)) {
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
			this.state = 227;
			this.at_component_expr();
			this.state = 228;
			this.match(CircuitScriptParser.T__0);
			this.state = 229;
			this.match(CircuitScriptParser.NEWLINE);
			this.state = 230;
			this.match(CircuitScriptParser.INDENT);
			this.state = 233;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				this.state = 233;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 43:
					{
					this.state = 231;
					this.match(CircuitScriptParser.NEWLINE);
					}
					break;
				case 4:
				case 8:
				case 9:
				case 10:
				case 14:
				case 16:
				case 17:
				case 18:
				case 19:
				case 21:
				case 22:
				case 35:
				case 36:
				case 39:
					{
					this.state = 232;
					this.at_block_expressions();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 235;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 7292688) !== 0) || ((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & 275) !== 0));
			this.state = 237;
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
			this.state = 241;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 4:
			case 8:
			case 9:
			case 10:
			case 14:
			case 16:
			case 17:
			case 18:
			case 19:
			case 21:
			case 22:
			case 35:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 239;
				this.expression();
				}
				break;
			case 36:
			case 39:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 240;
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
			this.state = 243;
			this.pin_select_expr2();
			this.state = 244;
			this.match(CircuitScriptParser.T__0);
			this.state = 247;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 4:
			case 8:
			case 9:
			case 10:
			case 14:
			case 16:
			case 17:
			case 18:
			case 19:
			case 21:
			case 22:
			case 33:
			case 35:
				{
				this.state = 245;
				this.at_block_pin_expression_simple();
				}
				break;
			case 43:
				{
				this.state = 246;
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
			this.state = 251;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 4:
			case 8:
			case 9:
			case 10:
			case 14:
			case 16:
			case 17:
			case 18:
			case 19:
			case 21:
			case 22:
			case 35:
				{
				this.state = 249;
				this.expression();
				}
				break;
			case 33:
				{
				this.state = 250;
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
			this.state = 253;
			this.match(CircuitScriptParser.NEWLINE);
			this.state = 254;
			this.match(CircuitScriptParser.INDENT);
			this.state = 257;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				this.state = 257;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 43:
					{
					this.state = 255;
					this.match(CircuitScriptParser.NEWLINE);
					}
					break;
				case 4:
				case 8:
				case 9:
				case 10:
				case 14:
				case 16:
				case 17:
				case 18:
				case 19:
				case 21:
				case 22:
				case 35:
					{
					this.state = 256;
					this.expression();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 259;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 7292688) !== 0) || _la===35 || _la===43);
			this.state = 261;
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
			this.state = 263;
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
		this.enterRule(localctx, 44, CircuitScriptParser.RULE_assignment_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 265;
			this.atom_expr();
			this.state = 266;
			this.match(CircuitScriptParser.T__2);
			this.state = 267;
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
		this.enterRule(localctx, 46, CircuitScriptParser.RULE_keyword_assignment_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 269;
			this.match(CircuitScriptParser.ID);
			this.state = 270;
			this.match(CircuitScriptParser.T__2);
			this.state = 271;
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
		this.enterRule(localctx, 48, CircuitScriptParser.RULE_parameters);
		let _la: number;
		try {
			let _alt: number;
			this.state = 296;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 29, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				{
				this.state = 273;
				this.data_expr(0);
				this.state = 278;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 26, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 274;
						this.match(CircuitScriptParser.T__1);
						this.state = 275;
						this.data_expr(0);
						}
						}
					}
					this.state = 280;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 26, this._ctx);
				}
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
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				{
				this.state = 288;
				this.keyword_assignment_expr();
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
			this.state = 298;
			this.atom_expr();
			this.state = 299;
			this.match(CircuitScriptParser.T__2);
			this.state = 300;
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
		this.enterRule(localctx, 52, CircuitScriptParser.RULE_double_dot_property_set_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 302;
			this.match(CircuitScriptParser.T__3);
			this.state = 303;
			this.match(CircuitScriptParser.ID);
			this.state = 304;
			this.match(CircuitScriptParser.T__2);
			this.state = 305;
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
		let _startState: number = 54;
		this.enterRecursionRule(localctx, 54, CircuitScriptParser.RULE_data_expr, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 319;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 30, this._ctx) ) {
			case 1:
				{
				localctx = new UnaryOperatorExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 308;
				this.unary_operator();
				this.state = 309;
				this.data_expr(9);
				}
				break;
			case 2:
				{
				localctx = new DataExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 311;
				this.atom_expr();
				}
				break;
			case 3:
				{
				localctx = new DataExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 312;
				this.create_component_expr();
				}
				break;
			case 4:
				{
				localctx = new DataExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 313;
				this.create_graphic_expr();
				}
				break;
			case 5:
				{
				localctx = new DataExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 314;
				this.value_expr();
				}
				break;
			case 6:
				{
				localctx = new RoundedBracketsExprContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 315;
				this.match(CircuitScriptParser.OPEN_PAREN);
				this.state = 316;
				this.data_expr(0);
				this.state = 317;
				this.match(CircuitScriptParser.CLOSE_PAREN);
				}
				break;
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 333;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 32, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 331;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 31, this._ctx) ) {
					case 1:
						{
						localctx = new MultiplyExprContext(this, new Data_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, CircuitScriptParser.RULE_data_expr);
						this.state = 321;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 322;
						_la = this._input.LA(1);
						if(!(_la===29 || _la===30)) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 323;
						this.data_expr(9);
						}
						break;
					case 2:
						{
						localctx = new AdditionExprContext(this, new Data_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, CircuitScriptParser.RULE_data_expr);
						this.state = 324;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 325;
						_la = this._input.LA(1);
						if(!(_la===27 || _la===28)) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 326;
						this.data_expr(8);
						}
						break;
					case 3:
						{
						localctx = new BinaryOperatorExprContext(this, new Data_exprContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, CircuitScriptParser.RULE_data_expr);
						this.state = 327;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 328;
						this.binary_operator();
						this.state = 329;
						this.data_expr(3);
						}
						break;
					}
					}
				}
				this.state = 335;
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
		this.enterRule(localctx, 56, CircuitScriptParser.RULE_binary_operator);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 336;
			_la = this._input.LA(1);
			if(!(_la===25 || _la===26)) {
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
		this.enterRule(localctx, 58, CircuitScriptParser.RULE_unary_operator);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 338;
			_la = this._input.LA(1);
			if(!(_la===24 || _la===28)) {
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
		this.enterRule(localctx, 60, CircuitScriptParser.RULE_value_expr);
		let _la: number;
		try {
			this.state = 350;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 28:
			case 38:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 341;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===28) {
					{
					this.state = 340;
					this.match(CircuitScriptParser.Minus);
					}
				}

				this.state = 343;
				this.match(CircuitScriptParser.NUMERIC_VALUE);
				}
				break;
			case 37:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 344;
				this.match(CircuitScriptParser.DECIMAL_VALUE);
				}
				break;
			case 36:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 345;
				this.match(CircuitScriptParser.INTEGER_VALUE);
				}
				break;
			case 39:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 346;
				this.match(CircuitScriptParser.STRING_VALUE);
				}
				break;
			case 40:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 347;
				this.match(CircuitScriptParser.PERCENTAGE_VALUE);
				}
				break;
			case 34:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 348;
				this.match(CircuitScriptParser.BOOLEAN_VALUE);
				}
				break;
			case 6:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 349;
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
	public function_def_expr(): Function_def_exprContext {
		let localctx: Function_def_exprContext = new Function_def_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 62, CircuitScriptParser.RULE_function_def_expr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 352;
			this.match(CircuitScriptParser.Define);
			this.state = 353;
			this.match(CircuitScriptParser.ID);
			this.state = 354;
			this.match(CircuitScriptParser.OPEN_PAREN);
			this.state = 356;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===35) {
				{
				this.state = 355;
				this.function_args_expr();
				}
			}

			this.state = 358;
			this.match(CircuitScriptParser.CLOSE_PAREN);
			this.state = 359;
			this.match(CircuitScriptParser.T__0);
			this.state = 360;
			this.match(CircuitScriptParser.NEWLINE);
			this.state = 361;
			this.match(CircuitScriptParser.INDENT);
			this.state = 364;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				this.state = 364;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 43:
					{
					this.state = 362;
					this.match(CircuitScriptParser.NEWLINE);
					}
					break;
				case 4:
				case 8:
				case 9:
				case 10:
				case 14:
				case 16:
				case 17:
				case 18:
				case 19:
				case 20:
				case 21:
				case 22:
				case 35:
					{
					this.state = 363;
					this.function_expr();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 366;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 8341264) !== 0) || _la===35 || _la===43);
			this.state = 368;
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
			this.state = 372;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 4:
			case 8:
			case 9:
			case 10:
			case 14:
			case 16:
			case 17:
			case 18:
			case 19:
			case 21:
			case 22:
			case 35:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 370;
				this.expression();
				}
				break;
			case 20:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 371;
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
			this.state = 403;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 42, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 374;
				this.match(CircuitScriptParser.ID);
				this.state = 379;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 39, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 375;
						this.match(CircuitScriptParser.T__1);
						this.state = 376;
						this.match(CircuitScriptParser.ID);
						}
						}
					}
					this.state = 381;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 39, this._ctx);
				}
				this.state = 388;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===2) {
					{
					{
					this.state = 382;
					this.match(CircuitScriptParser.T__1);
					this.state = 383;
					this.match(CircuitScriptParser.ID);
					this.state = 384;
					this.match(CircuitScriptParser.T__2);
					this.state = 385;
					this.value_expr();
					}
					}
					this.state = 390;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 391;
				this.match(CircuitScriptParser.ID);
				this.state = 392;
				this.match(CircuitScriptParser.T__2);
				this.state = 393;
				this.value_expr();
				this.state = 400;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===2) {
					{
					{
					this.state = 394;
					this.match(CircuitScriptParser.T__1);
					this.state = 395;
					this.match(CircuitScriptParser.ID);
					this.state = 396;
					this.match(CircuitScriptParser.T__2);
					this.state = 397;
					this.value_expr();
					}
					}
					this.state = 402;
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
		this.enterRule(localctx, 68, CircuitScriptParser.RULE_atom_expr);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 405;
			this.match(CircuitScriptParser.ID);
			this.state = 409;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 43, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 406;
					this.trailer_expr();
					}
					}
				}
				this.state = 411;
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
		this.enterRule(localctx, 70, CircuitScriptParser.RULE_trailer_expr);
		let _la: number;
		try {
			this.state = 419;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 31:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 412;
				this.match(CircuitScriptParser.OPEN_PAREN);
				this.state = 414;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2432698432) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & 127) !== 0)) {
					{
					this.state = 413;
					this.parameters();
					}
				}

				this.state = 416;
				this.match(CircuitScriptParser.CLOSE_PAREN);
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 417;
				this.match(CircuitScriptParser.T__4);
				this.state = 418;
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
		this.enterRule(localctx, 72, CircuitScriptParser.RULE_function_return_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 421;
			this.match(CircuitScriptParser.Return);
			this.state = 422;
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
		this.enterRule(localctx, 74, CircuitScriptParser.RULE_create_component_expr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 424;
			this.match(CircuitScriptParser.Create);
			this.state = 425;
			this.match(CircuitScriptParser.Component);
			this.state = 426;
			this.match(CircuitScriptParser.T__0);
			this.state = 427;
			this.match(CircuitScriptParser.NEWLINE);
			this.state = 428;
			this.match(CircuitScriptParser.INDENT);
			this.state = 431;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				this.state = 431;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 43:
					{
					this.state = 429;
					this.match(CircuitScriptParser.NEWLINE);
					}
					break;
				case 35:
				case 36:
				case 39:
					{
					this.state = 430;
					this.property_expr();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 433;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & 275) !== 0));
			this.state = 435;
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
		this.enterRule(localctx, 76, CircuitScriptParser.RULE_create_graphic_expr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 437;
			this.match(CircuitScriptParser.Create);
			this.state = 438;
			this.match(CircuitScriptParser.Graphic);
			this.state = 439;
			this.match(CircuitScriptParser.T__0);
			this.state = 440;
			this.match(CircuitScriptParser.NEWLINE);
			this.state = 441;
			this.match(CircuitScriptParser.INDENT);
			this.state = 444;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				this.state = 444;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 43:
					{
					this.state = 442;
					this.match(CircuitScriptParser.NEWLINE);
					}
					break;
				case 15:
				case 35:
					{
					this.state = 443;
					this.sub_expr();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 446;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (((((_la - 15)) & ~0x1F) === 0 && ((1 << (_la - 15)) & 269484033) !== 0));
			this.state = 448;
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
		this.enterRule(localctx, 78, CircuitScriptParser.RULE_sub_expr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 450;
			_la = this._input.LA(1);
			if(!(_la===15 || _la===35)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 451;
			this.match(CircuitScriptParser.T__0);
			this.state = 457;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 50, this._ctx) ) {
			case 1:
				{
				this.state = 452;
				this.parameters();
				}
				break;
			case 2:
				{
				this.state = 453;
				this.match(CircuitScriptParser.OPEN_PAREN);
				this.state = 454;
				this.parameters();
				this.state = 455;
				this.match(CircuitScriptParser.CLOSE_PAREN);
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
	public property_expr(): Property_exprContext {
		let localctx: Property_exprContext = new Property_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 80, CircuitScriptParser.RULE_property_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 459;
			this.property_key_expr();
			this.state = 460;
			this.match(CircuitScriptParser.T__0);
			this.state = 461;
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
		this.enterRule(localctx, 82, CircuitScriptParser.RULE_property_key_expr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 463;
			_la = this._input.LA(1);
			if(!(((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & 19) !== 0))) {
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
		this.enterRule(localctx, 84, CircuitScriptParser.RULE_property_value_expr);
		let _la: number;
		try {
			this.state = 482;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 43:
				localctx = new Nested_propertiesContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 465;
				this.match(CircuitScriptParser.NEWLINE);
				this.state = 466;
				this.match(CircuitScriptParser.INDENT);
				this.state = 469;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					this.state = 469;
					this._errHandler.sync(this);
					switch (this._input.LA(1)) {
					case 43:
						{
						this.state = 467;
						this.match(CircuitScriptParser.NEWLINE);
						}
						break;
					case 35:
					case 36:
					case 39:
						{
						this.state = 468;
						this.property_expr();
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					}
					this.state = 471;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & 275) !== 0));
				this.state = 473;
				this.match(CircuitScriptParser.DEDENT);
				}
				break;
			case 6:
			case 11:
			case 24:
			case 28:
			case 31:
			case 34:
			case 35:
			case 36:
			case 37:
			case 38:
			case 39:
			case 40:
				localctx = new Single_line_propertyContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 474;
				this.data_expr(0);
				this.state = 479;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===2) {
					{
					{
					this.state = 475;
					this.match(CircuitScriptParser.T__1);
					this.state = 476;
					this.data_expr(0);
					}
					}
					this.state = 481;
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
	public blank_expr(): Blank_exprContext {
		let localctx: Blank_exprContext = new Blank_exprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 86, CircuitScriptParser.RULE_blank_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 484;
			this.match(CircuitScriptParser.T__5);
			this.state = 485;
			this.match(CircuitScriptParser.INTEGER_VALUE);
			this.state = 486;
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
		this.enterRule(localctx, 88, CircuitScriptParser.RULE_wire_expr);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 488;
			this.match(CircuitScriptParser.Wire);
			this.state = 489;
			this.match(CircuitScriptParser.ID);
			this.state = 493;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 55, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 490;
					_la = this._input.LA(1);
					if(!(_la===35 || _la===36)) {
					this._errHandler.recoverInline(this);
					}
					else {
						this._errHandler.reportMatch(this);
					    this.consume();
					}
					}
					}
				}
				this.state = 495;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 55, this._ctx);
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
		this.enterRule(localctx, 90, CircuitScriptParser.RULE_point_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 496;
			this.match(CircuitScriptParser.Point);
			this.state = 497;
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
		this.enterRule(localctx, 92, CircuitScriptParser.RULE_import_expr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 499;
			this.match(CircuitScriptParser.Import);
			this.state = 500;
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
		this.enterRule(localctx, 94, CircuitScriptParser.RULE_frame_expr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 502;
			this.match(CircuitScriptParser.T__7);
			this.state = 503;
			this.match(CircuitScriptParser.T__0);
			this.state = 504;
			this.match(CircuitScriptParser.NEWLINE);
			this.state = 505;
			this.match(CircuitScriptParser.INDENT);
			this.state = 508;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				this.state = 508;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 43:
					{
					this.state = 506;
					this.match(CircuitScriptParser.NEWLINE);
					}
					break;
				case 4:
				case 8:
				case 9:
				case 10:
				case 14:
				case 16:
				case 17:
				case 18:
				case 19:
				case 21:
				case 22:
				case 35:
					{
					this.state = 507;
					this.expression();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 510;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 7292688) !== 0) || _la===35 || _la===43);
			this.state = 512;
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
		case 27:
			return this.data_expr_sempred(localctx as Data_exprContext, predIndex);
		}
		return true;
	}
	private data_expr_sempred(localctx: Data_exprContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 8);
		case 1:
			return this.precpred(this._ctx, 7);
		case 2:
			return this.precpred(this._ctx, 2);
		}
		return true;
	}

	public static readonly _serializedATN: number[] = [4,1,46,515,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,
	7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,
	24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,
	2,32,7,32,2,33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,
	39,7,39,2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,46,
	7,46,2,47,7,47,1,0,1,0,4,0,99,8,0,11,0,12,0,100,1,0,1,0,1,1,1,1,1,1,1,1,
	1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,121,8,1,1,2,4,2,124,
	8,2,11,2,12,2,125,1,3,1,3,1,3,1,3,1,3,1,3,4,3,134,8,3,11,3,12,3,135,1,3,
	1,3,1,4,1,4,1,4,1,4,1,4,1,4,4,4,146,8,4,11,4,12,4,147,1,4,1,4,1,5,1,5,1,
	5,1,5,1,6,1,6,3,6,158,8,6,1,6,3,6,161,8,6,1,7,1,7,1,7,3,7,166,8,7,1,8,1,
	8,3,8,170,8,8,1,9,1,9,1,9,1,10,1,10,1,11,1,11,1,11,3,11,180,8,11,1,12,1,
	12,1,12,1,12,5,12,186,8,12,10,12,12,12,189,9,12,1,12,3,12,192,8,12,1,13,
	1,13,1,13,1,13,1,13,1,13,5,13,200,8,13,10,13,12,13,203,9,13,1,13,1,13,1,
	13,1,13,1,13,4,13,210,8,13,11,13,12,13,211,1,13,1,13,1,14,1,14,1,14,1,14,
	1,14,5,14,221,8,14,10,14,12,14,224,9,14,1,15,1,15,1,16,1,16,1,16,1,16,1,
	16,1,16,4,16,234,8,16,11,16,12,16,235,1,16,1,16,1,17,1,17,3,17,242,8,17,
	1,18,1,18,1,18,1,18,3,18,248,8,18,1,19,1,19,3,19,252,8,19,1,20,1,20,1,20,
	1,20,4,20,258,8,20,11,20,12,20,259,1,20,1,20,1,21,1,21,1,22,1,22,1,22,1,
	22,1,23,1,23,1,23,1,23,1,24,1,24,1,24,5,24,277,8,24,10,24,12,24,280,9,24,
	1,24,1,24,5,24,284,8,24,10,24,12,24,287,9,24,1,24,1,24,1,24,5,24,292,8,
	24,10,24,12,24,295,9,24,3,24,297,8,24,1,25,1,25,1,25,1,25,1,26,1,26,1,26,
	1,26,1,26,1,27,1,27,1,27,1,27,1,27,1,27,1,27,1,27,1,27,1,27,1,27,1,27,3,
	27,320,8,27,1,27,1,27,1,27,1,27,1,27,1,27,1,27,1,27,1,27,1,27,5,27,332,
	8,27,10,27,12,27,335,9,27,1,28,1,28,1,29,1,29,1,30,3,30,342,8,30,1,30,1,
	30,1,30,1,30,1,30,1,30,1,30,3,30,351,8,30,1,31,1,31,1,31,1,31,3,31,357,
	8,31,1,31,1,31,1,31,1,31,1,31,1,31,4,31,365,8,31,11,31,12,31,366,1,31,1,
	31,1,32,1,32,3,32,373,8,32,1,33,1,33,1,33,5,33,378,8,33,10,33,12,33,381,
	9,33,1,33,1,33,1,33,1,33,5,33,387,8,33,10,33,12,33,390,9,33,1,33,1,33,1,
	33,1,33,1,33,1,33,1,33,5,33,399,8,33,10,33,12,33,402,9,33,3,33,404,8,33,
	1,34,1,34,5,34,408,8,34,10,34,12,34,411,9,34,1,35,1,35,3,35,415,8,35,1,
	35,1,35,1,35,3,35,420,8,35,1,36,1,36,1,36,1,37,1,37,1,37,1,37,1,37,1,37,
	1,37,4,37,432,8,37,11,37,12,37,433,1,37,1,37,1,38,1,38,1,38,1,38,1,38,1,
	38,1,38,4,38,445,8,38,11,38,12,38,446,1,38,1,38,1,39,1,39,1,39,1,39,1,39,
	1,39,1,39,3,39,458,8,39,1,40,1,40,1,40,1,40,1,41,1,41,1,42,1,42,1,42,1,
	42,4,42,470,8,42,11,42,12,42,471,1,42,1,42,1,42,1,42,5,42,478,8,42,10,42,
	12,42,481,9,42,3,42,483,8,42,1,43,1,43,1,43,1,43,1,44,1,44,1,44,5,44,492,
	8,44,10,44,12,44,495,9,44,1,45,1,45,1,45,1,46,1,46,1,46,1,47,1,47,1,47,
	1,47,1,47,1,47,4,47,509,8,47,11,47,12,47,510,1,47,1,47,1,47,0,1,54,48,0,
	2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,
	52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,0,9,1,
	0,35,36,2,0,36,36,39,39,2,0,33,33,36,36,1,0,29,30,1,0,27,28,1,0,25,26,2,
	0,24,24,28,28,2,0,15,15,35,35,2,0,35,36,39,39,548,0,98,1,0,0,0,2,120,1,
	0,0,0,4,123,1,0,0,0,6,127,1,0,0,0,8,139,1,0,0,0,10,151,1,0,0,0,12,157,1,
	0,0,0,14,162,1,0,0,0,16,169,1,0,0,0,18,171,1,0,0,0,20,174,1,0,0,0,22,176,
	1,0,0,0,24,181,1,0,0,0,26,193,1,0,0,0,28,215,1,0,0,0,30,225,1,0,0,0,32,
	227,1,0,0,0,34,241,1,0,0,0,36,243,1,0,0,0,38,251,1,0,0,0,40,253,1,0,0,0,
	42,263,1,0,0,0,44,265,1,0,0,0,46,269,1,0,0,0,48,296,1,0,0,0,50,298,1,0,
	0,0,52,302,1,0,0,0,54,319,1,0,0,0,56,336,1,0,0,0,58,338,1,0,0,0,60,350,
	1,0,0,0,62,352,1,0,0,0,64,372,1,0,0,0,66,403,1,0,0,0,68,405,1,0,0,0,70,
	419,1,0,0,0,72,421,1,0,0,0,74,424,1,0,0,0,76,437,1,0,0,0,78,450,1,0,0,0,
	80,459,1,0,0,0,82,463,1,0,0,0,84,482,1,0,0,0,86,484,1,0,0,0,88,488,1,0,
	0,0,90,496,1,0,0,0,92,499,1,0,0,0,94,502,1,0,0,0,96,99,3,2,1,0,97,99,5,
	43,0,0,98,96,1,0,0,0,98,97,1,0,0,0,99,100,1,0,0,0,100,98,1,0,0,0,100,101,
	1,0,0,0,101,102,1,0,0,0,102,103,5,0,0,1,103,1,1,0,0,0,104,121,3,14,7,0,
	105,121,3,24,12,0,106,121,3,22,11,0,107,121,3,44,22,0,108,121,3,50,25,0,
	109,121,3,8,4,0,110,121,3,52,26,0,111,121,3,42,21,0,112,121,3,62,31,0,113,
	121,3,88,44,0,114,121,3,90,45,0,115,121,3,92,46,0,116,121,3,94,47,0,117,
	121,3,68,34,0,118,121,3,32,16,0,119,121,3,4,2,0,120,104,1,0,0,0,120,105,
	1,0,0,0,120,106,1,0,0,0,120,107,1,0,0,0,120,108,1,0,0,0,120,109,1,0,0,0,
	120,110,1,0,0,0,120,111,1,0,0,0,120,112,1,0,0,0,120,113,1,0,0,0,120,114,
	1,0,0,0,120,115,1,0,0,0,120,116,1,0,0,0,120,117,1,0,0,0,120,118,1,0,0,0,
	120,119,1,0,0,0,121,3,1,0,0,0,122,124,3,6,3,0,123,122,1,0,0,0,124,125,1,
	0,0,0,125,123,1,0,0,0,125,126,1,0,0,0,126,5,1,0,0,0,127,128,5,10,0,0,128,
	129,5,1,0,0,129,130,5,43,0,0,130,133,5,45,0,0,131,134,5,43,0,0,132,134,
	3,2,1,0,133,131,1,0,0,0,133,132,1,0,0,0,134,135,1,0,0,0,135,133,1,0,0,0,
	135,136,1,0,0,0,136,137,1,0,0,0,137,138,5,46,0,0,138,7,1,0,0,0,139,140,
	3,68,34,0,140,141,5,1,0,0,141,142,5,43,0,0,142,145,5,45,0,0,143,146,5,43,
	0,0,144,146,3,10,5,0,145,143,1,0,0,0,145,144,1,0,0,0,146,147,1,0,0,0,147,
	145,1,0,0,0,147,148,1,0,0,0,148,149,1,0,0,0,149,150,5,46,0,0,150,9,1,0,
	0,0,151,152,7,0,0,0,152,153,5,1,0,0,153,154,3,60,30,0,154,11,1,0,0,0,155,
	158,3,54,27,0,156,158,3,44,22,0,157,155,1,0,0,0,157,156,1,0,0,0,158,160,
	1,0,0,0,159,161,3,18,9,0,160,159,1,0,0,0,160,161,1,0,0,0,161,13,1,0,0,0,
	162,163,5,16,0,0,163,165,3,12,6,0,164,166,5,35,0,0,165,164,1,0,0,0,165,
	166,1,0,0,0,166,15,1,0,0,0,167,170,3,12,6,0,168,170,3,18,9,0,169,167,1,
	0,0,0,169,168,1,0,0,0,170,17,1,0,0,0,171,172,5,15,0,0,172,173,7,1,0,0,173,
	19,1,0,0,0,174,175,7,1,0,0,175,21,1,0,0,0,176,177,5,17,0,0,177,179,3,16,
	8,0,178,180,5,35,0,0,179,178,1,0,0,0,179,180,1,0,0,0,180,23,1,0,0,0,181,
	182,5,18,0,0,182,187,3,16,8,0,183,184,5,2,0,0,184,186,3,16,8,0,185,183,
	1,0,0,0,186,189,1,0,0,0,187,185,1,0,0,0,187,188,1,0,0,0,188,191,1,0,0,0,
	189,187,1,0,0,0,190,192,5,35,0,0,191,190,1,0,0,0,191,192,1,0,0,0,192,25,
	1,0,0,0,193,194,5,17,0,0,194,195,3,16,8,0,195,196,5,18,0,0,196,201,3,16,
	8,0,197,198,5,2,0,0,198,200,3,16,8,0,199,197,1,0,0,0,200,203,1,0,0,0,201,
	199,1,0,0,0,201,202,1,0,0,0,202,204,1,0,0,0,203,201,1,0,0,0,204,205,5,1,
	0,0,205,206,5,43,0,0,206,209,5,45,0,0,207,210,5,43,0,0,208,210,3,28,14,
	0,209,207,1,0,0,0,209,208,1,0,0,0,210,211,1,0,0,0,211,209,1,0,0,0,211,212,
	1,0,0,0,212,213,1,0,0,0,213,214,5,46,0,0,214,27,1,0,0,0,215,216,3,20,10,
	0,216,217,5,1,0,0,217,222,3,30,15,0,218,219,5,2,0,0,219,221,3,30,15,0,220,
	218,1,0,0,0,221,224,1,0,0,0,222,220,1,0,0,0,222,223,1,0,0,0,223,29,1,0,
	0,0,224,222,1,0,0,0,225,226,7,2,0,0,226,31,1,0,0,0,227,228,3,22,11,0,228,
	229,5,1,0,0,229,230,5,43,0,0,230,233,5,45,0,0,231,234,5,43,0,0,232,234,
	3,34,17,0,233,231,1,0,0,0,233,232,1,0,0,0,234,235,1,0,0,0,235,233,1,0,0,
	0,235,236,1,0,0,0,236,237,1,0,0,0,237,238,5,46,0,0,238,33,1,0,0,0,239,242,
	3,2,1,0,240,242,3,36,18,0,241,239,1,0,0,0,241,240,1,0,0,0,242,35,1,0,0,
	0,243,244,3,20,10,0,244,247,5,1,0,0,245,248,3,38,19,0,246,248,3,40,20,0,
	247,245,1,0,0,0,247,246,1,0,0,0,248,37,1,0,0,0,249,252,3,2,1,0,250,252,
	5,33,0,0,251,249,1,0,0,0,251,250,1,0,0,0,252,39,1,0,0,0,253,254,5,43,0,
	0,254,257,5,45,0,0,255,258,5,43,0,0,256,258,3,2,1,0,257,255,1,0,0,0,257,
	256,1,0,0,0,258,259,1,0,0,0,259,257,1,0,0,0,259,260,1,0,0,0,260,261,1,0,
	0,0,261,262,5,46,0,0,262,41,1,0,0,0,263,264,5,9,0,0,264,43,1,0,0,0,265,
	266,3,68,34,0,266,267,5,3,0,0,267,268,3,54,27,0,268,45,1,0,0,0,269,270,
	5,35,0,0,270,271,5,3,0,0,271,272,3,54,27,0,272,47,1,0,0,0,273,278,3,54,
	27,0,274,275,5,2,0,0,275,277,3,54,27,0,276,274,1,0,0,0,277,280,1,0,0,0,
	278,276,1,0,0,0,278,279,1,0,0,0,279,285,1,0,0,0,280,278,1,0,0,0,281,282,
	5,2,0,0,282,284,3,46,23,0,283,281,1,0,0,0,284,287,1,0,0,0,285,283,1,0,0,
	0,285,286,1,0,0,0,286,297,1,0,0,0,287,285,1,0,0,0,288,293,3,46,23,0,289,
	290,5,2,0,0,290,292,3,46,23,0,291,289,1,0,0,0,292,295,1,0,0,0,293,291,1,
	0,0,0,293,294,1,0,0,0,294,297,1,0,0,0,295,293,1,0,0,0,296,273,1,0,0,0,296,
	288,1,0,0,0,297,49,1,0,0,0,298,299,3,68,34,0,299,300,5,3,0,0,300,301,3,
	54,27,0,301,51,1,0,0,0,302,303,5,4,0,0,303,304,5,35,0,0,304,305,5,3,0,0,
	305,306,3,54,27,0,306,53,1,0,0,0,307,308,6,27,-1,0,308,309,3,58,29,0,309,
	310,3,54,27,9,310,320,1,0,0,0,311,320,3,68,34,0,312,320,3,74,37,0,313,320,
	3,76,38,0,314,320,3,60,30,0,315,316,5,31,0,0,316,317,3,54,27,0,317,318,
	5,32,0,0,318,320,1,0,0,0,319,307,1,0,0,0,319,311,1,0,0,0,319,312,1,0,0,
	0,319,313,1,0,0,0,319,314,1,0,0,0,319,315,1,0,0,0,320,333,1,0,0,0,321,322,
	10,8,0,0,322,323,7,3,0,0,323,332,3,54,27,9,324,325,10,7,0,0,325,326,7,4,
	0,0,326,332,3,54,27,8,327,328,10,2,0,0,328,329,3,56,28,0,329,330,3,54,27,
	3,330,332,1,0,0,0,331,321,1,0,0,0,331,324,1,0,0,0,331,327,1,0,0,0,332,335,
	1,0,0,0,333,331,1,0,0,0,333,334,1,0,0,0,334,55,1,0,0,0,335,333,1,0,0,0,
	336,337,7,5,0,0,337,57,1,0,0,0,338,339,7,6,0,0,339,59,1,0,0,0,340,342,5,
	28,0,0,341,340,1,0,0,0,341,342,1,0,0,0,342,343,1,0,0,0,343,351,5,38,0,0,
	344,351,5,37,0,0,345,351,5,36,0,0,346,351,5,39,0,0,347,351,5,40,0,0,348,
	351,5,34,0,0,349,351,3,86,43,0,350,341,1,0,0,0,350,344,1,0,0,0,350,345,
	1,0,0,0,350,346,1,0,0,0,350,347,1,0,0,0,350,348,1,0,0,0,350,349,1,0,0,0,
	351,61,1,0,0,0,352,353,5,21,0,0,353,354,5,35,0,0,354,356,5,31,0,0,355,357,
	3,66,33,0,356,355,1,0,0,0,356,357,1,0,0,0,357,358,1,0,0,0,358,359,5,32,
	0,0,359,360,5,1,0,0,360,361,5,43,0,0,361,364,5,45,0,0,362,365,5,43,0,0,
	363,365,3,64,32,0,364,362,1,0,0,0,364,363,1,0,0,0,365,366,1,0,0,0,366,364,
	1,0,0,0,366,367,1,0,0,0,367,368,1,0,0,0,368,369,5,46,0,0,369,63,1,0,0,0,
	370,373,3,2,1,0,371,373,3,72,36,0,372,370,1,0,0,0,372,371,1,0,0,0,373,65,
	1,0,0,0,374,379,5,35,0,0,375,376,5,2,0,0,376,378,5,35,0,0,377,375,1,0,0,
	0,378,381,1,0,0,0,379,377,1,0,0,0,379,380,1,0,0,0,380,388,1,0,0,0,381,379,
	1,0,0,0,382,383,5,2,0,0,383,384,5,35,0,0,384,385,5,3,0,0,385,387,3,60,30,
	0,386,382,1,0,0,0,387,390,1,0,0,0,388,386,1,0,0,0,388,389,1,0,0,0,389,404,
	1,0,0,0,390,388,1,0,0,0,391,392,5,35,0,0,392,393,5,3,0,0,393,400,3,60,30,
	0,394,395,5,2,0,0,395,396,5,35,0,0,396,397,5,3,0,0,397,399,3,60,30,0,398,
	394,1,0,0,0,399,402,1,0,0,0,400,398,1,0,0,0,400,401,1,0,0,0,401,404,1,0,
	0,0,402,400,1,0,0,0,403,374,1,0,0,0,403,391,1,0,0,0,404,67,1,0,0,0,405,
	409,5,35,0,0,406,408,3,70,35,0,407,406,1,0,0,0,408,411,1,0,0,0,409,407,
	1,0,0,0,409,410,1,0,0,0,410,69,1,0,0,0,411,409,1,0,0,0,412,414,5,31,0,0,
	413,415,3,48,24,0,414,413,1,0,0,0,414,415,1,0,0,0,415,416,1,0,0,0,416,420,
	5,32,0,0,417,418,5,5,0,0,418,420,5,35,0,0,419,412,1,0,0,0,419,417,1,0,0,
	0,420,71,1,0,0,0,421,422,5,20,0,0,422,423,3,54,27,0,423,73,1,0,0,0,424,
	425,5,11,0,0,425,426,5,12,0,0,426,427,5,1,0,0,427,428,5,43,0,0,428,431,
	5,45,0,0,429,432,5,43,0,0,430,432,3,80,40,0,431,429,1,0,0,0,431,430,1,0,
	0,0,432,433,1,0,0,0,433,431,1,0,0,0,433,434,1,0,0,0,434,435,1,0,0,0,435,
	436,5,46,0,0,436,75,1,0,0,0,437,438,5,11,0,0,438,439,5,13,0,0,439,440,5,
	1,0,0,440,441,5,43,0,0,441,444,5,45,0,0,442,445,5,43,0,0,443,445,3,78,39,
	0,444,442,1,0,0,0,444,443,1,0,0,0,445,446,1,0,0,0,446,444,1,0,0,0,446,447,
	1,0,0,0,447,448,1,0,0,0,448,449,5,46,0,0,449,77,1,0,0,0,450,451,7,7,0,0,
	451,457,5,1,0,0,452,458,3,48,24,0,453,454,5,31,0,0,454,455,3,48,24,0,455,
	456,5,32,0,0,456,458,1,0,0,0,457,452,1,0,0,0,457,453,1,0,0,0,458,79,1,0,
	0,0,459,460,3,82,41,0,460,461,5,1,0,0,461,462,3,84,42,0,462,81,1,0,0,0,
	463,464,7,8,0,0,464,83,1,0,0,0,465,466,5,43,0,0,466,469,5,45,0,0,467,470,
	5,43,0,0,468,470,3,80,40,0,469,467,1,0,0,0,469,468,1,0,0,0,470,471,1,0,
	0,0,471,469,1,0,0,0,471,472,1,0,0,0,472,473,1,0,0,0,473,483,5,46,0,0,474,
	479,3,54,27,0,475,476,5,2,0,0,476,478,3,54,27,0,477,475,1,0,0,0,478,481,
	1,0,0,0,479,477,1,0,0,0,479,480,1,0,0,0,480,483,1,0,0,0,481,479,1,0,0,0,
	482,465,1,0,0,0,482,474,1,0,0,0,483,85,1,0,0,0,484,485,5,6,0,0,485,486,
	5,36,0,0,486,487,5,7,0,0,487,87,1,0,0,0,488,489,5,14,0,0,489,493,5,35,0,
	0,490,492,7,0,0,0,491,490,1,0,0,0,492,495,1,0,0,0,493,491,1,0,0,0,493,494,
	1,0,0,0,494,89,1,0,0,0,495,493,1,0,0,0,496,497,5,19,0,0,497,498,5,35,0,
	0,498,91,1,0,0,0,499,500,5,22,0,0,500,501,5,35,0,0,501,93,1,0,0,0,502,503,
	5,8,0,0,503,504,5,1,0,0,504,505,5,43,0,0,505,508,5,45,0,0,506,509,5,43,
	0,0,507,509,3,2,1,0,508,506,1,0,0,0,508,507,1,0,0,0,509,510,1,0,0,0,510,
	508,1,0,0,0,510,511,1,0,0,0,511,512,1,0,0,0,512,513,5,46,0,0,513,95,1,0,
	0,0,58,98,100,120,125,133,135,145,147,157,160,165,169,179,187,191,201,209,
	211,222,233,235,241,247,251,257,259,278,285,293,296,319,331,333,341,350,
	356,364,366,372,379,388,400,403,409,414,419,431,433,444,446,457,469,471,
	479,482,493,508,510];

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


export class Data_expr_with_assignmentContext extends ParserRuleContext {
	constructor(parser?: CircuitScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public data_expr(): Data_exprContext {
		return this.getTypedRuleContext(Data_exprContext, 0) as Data_exprContext;
	}
	public assignment_expr(): Assignment_exprContext {
		return this.getTypedRuleContext(Assignment_exprContext, 0) as Assignment_exprContext;
	}
	public pin_select_expr(): Pin_select_exprContext {
		return this.getTypedRuleContext(Pin_select_exprContext, 0) as Pin_select_exprContext;
	}
    public get ruleIndex(): number {
    	return CircuitScriptParser.RULE_data_expr_with_assignment;
	}
	// @Override
	public accept<Result>(visitor: CircuitScriptVisitor<Result>): Result {
		if (visitor.visitData_expr_with_assignment) {
			return visitor.visitData_expr_with_assignment(this);
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
	public data_expr_with_assignment(): Data_expr_with_assignmentContext {
		return this.getTypedRuleContext(Data_expr_with_assignmentContext, 0) as Data_expr_with_assignmentContext;
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
	public data_expr_with_assignment(): Data_expr_with_assignmentContext {
		return this.getTypedRuleContext(Data_expr_with_assignmentContext, 0) as Data_expr_with_assignmentContext;
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
	public NUMERIC_VALUE(): TerminalNode {
		return this.getToken(CircuitScriptParser.NUMERIC_VALUE, 0);
	}
	public Minus(): TerminalNode {
		return this.getToken(CircuitScriptParser.Minus, 0);
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
	public ID(): TerminalNode {
		return this.getToken(CircuitScriptParser.ID, 0);
	}
	public Pin(): TerminalNode {
		return this.getToken(CircuitScriptParser.Pin, 0);
	}
	public parameters(): ParametersContext {
		return this.getTypedRuleContext(ParametersContext, 0) as ParametersContext;
	}
	public OPEN_PAREN(): TerminalNode {
		return this.getToken(CircuitScriptParser.OPEN_PAREN, 0);
	}
	public CLOSE_PAREN(): TerminalNode {
		return this.getToken(CircuitScriptParser.CLOSE_PAREN, 0);
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
