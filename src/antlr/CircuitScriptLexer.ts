// Generated from CircuitScript.g4 by ANTLR 4.13.1
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols
import {
	ATN,
	ATNDeserializer,
	CharStream,
	DecisionState, DFA,
	Lexer,
	LexerATNSimulator,
	RuleContext,
	PredictionContextCache,
	Token
} from "antlr4";

import CircuitScriptParser from './CircuitScriptParser';
import { DenterHelper } from './../denter/DenterHelper';

export default class CircuitScriptLexer extends Lexer {
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
	public static readonly NOT_CONNECTED = 19;
	public static readonly ID = 20;
	public static readonly INSTANCE_NAME_WITH_PROPERTY = 21;
	public static readonly INTEGER_VALUE = 22;
	public static readonly NUMERIC_VALUE = 23;
	public static readonly STRING_VALUE = 24;
	public static readonly PERCENTAGE_VALUE = 25;
	public static readonly ALPHA_NUMERIC = 26;
	public static readonly OPERATOR = 27;
	public static readonly WS = 28;
	public static readonly NEWLINE = 29;
	public static readonly SKIP_ = 30;
	public static readonly EOF = Token.EOF;

	public static readonly channelNames: string[] = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
	public static readonly literalNames: (string | null)[] = [ null, "'branch'", 
                                                            "':'", "'add'", 
                                                            "'pin'", "'at'", 
                                                            "'to'", "','", 
                                                            "'break'", "'='", 
                                                            "'def'", "'('", 
                                                            "')'", "'return'", 
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
                                                             null, "NOT_CONNECTED", 
                                                             "ID", "INSTANCE_NAME_WITH_PROPERTY", 
                                                             "INTEGER_VALUE", 
                                                             "NUMERIC_VALUE", 
                                                             "STRING_VALUE", 
                                                             "PERCENTAGE_VALUE", 
                                                             "ALPHA_NUMERIC", 
                                                             "OPERATOR", 
                                                             "WS", "NEWLINE", 
                                                             "SKIP_" ];
	public static readonly modeNames: string[] = [ "DEFAULT_MODE", ];

	public static readonly ruleNames: string[] = [
		"T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "T__6", "T__7", "T__8", 
		"T__9", "T__10", "T__11", "T__12", "T__13", "T__14", "T__15", "T__16", 
		"T__17", "NOT_CONNECTED", "ID", "INSTANCE_NAME_WITH_PROPERTY", "INTEGER_VALUE", 
		"NUMERIC_VALUE", "STRING_VALUE", "PERCENTAGE_VALUE", "ALPHA_NUMERIC", 
		"OPERATOR", "WS", "NEWLINE", "COMMENT", "SKIP_",
	];


	    denter: DenterHelper | null = null;

	    nextToken(): Token {
	        if (this.denter === null) {
	            this.denter = new DenterHelper(
	                CircuitScriptParser.NEWLINE, CircuitScriptParser.INDENT, CircuitScriptParser.DEDENT, false, () => {
	                    return super.nextToken();
	                });
	        }

	        return this.denter.nextToken();
	    }


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(this, CircuitScriptLexer._ATN, CircuitScriptLexer.DecisionsToDFA, new PredictionContextCache());
	}

	public get grammarFileName(): string { return "CircuitScript.g4"; }

	public get literalNames(): (string | null)[] { return CircuitScriptLexer.literalNames; }
	public get symbolicNames(): (string | null)[] { return CircuitScriptLexer.symbolicNames; }
	public get ruleNames(): string[] { return CircuitScriptLexer.ruleNames; }

	public get serializedATN(): number[] { return CircuitScriptLexer._serializedATN; }

	public get channelNames(): string[] { return CircuitScriptLexer.channelNames; }

	public get modeNames(): string[] { return CircuitScriptLexer.modeNames; }

	public static readonly _serializedATN: number[] = [4,0,30,238,6,-1,2,0,
	7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,
	7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,
	16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,
	2,24,7,24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,1,
	0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,2,1,2,1,2,1,2,1,3,1,3,1,3,1,3,1,4,1,
	4,1,4,1,5,1,5,1,5,1,6,1,6,1,7,1,7,1,7,1,7,1,7,1,7,1,8,1,8,1,9,1,9,1,9,1,
	9,1,10,1,10,1,11,1,11,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,13,1,13,1,13,
	1,13,1,13,1,13,1,13,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,
	15,1,15,1,16,1,16,1,17,1,17,1,17,1,17,1,17,1,18,1,18,1,18,1,18,3,18,142,
	8,18,1,19,1,19,5,19,146,8,19,10,19,12,19,149,9,19,1,20,1,20,1,20,1,20,4,
	20,155,8,20,11,20,12,20,156,1,21,3,21,160,8,21,1,21,4,21,163,8,21,11,21,
	12,21,164,1,21,5,21,168,8,21,10,21,12,21,171,9,21,1,21,3,21,174,8,21,1,
	22,1,22,3,22,178,8,22,1,23,1,23,5,23,182,8,23,10,23,12,23,185,9,23,1,23,
	1,23,1,24,4,24,190,8,24,11,24,12,24,191,1,24,5,24,195,8,24,10,24,12,24,
	198,9,24,1,24,1,24,1,25,4,25,203,8,25,11,25,12,25,204,1,26,1,26,1,27,4,
	27,210,8,27,11,27,12,27,211,1,27,1,27,1,28,3,28,217,8,28,1,28,1,28,5,28,
	221,8,28,10,28,12,28,224,9,28,1,29,1,29,5,29,228,8,29,10,29,12,29,231,9,
	29,1,30,1,30,3,30,235,8,30,1,30,1,30,1,183,0,31,1,1,3,2,5,3,7,4,9,5,11,
	6,13,7,15,8,17,9,19,10,21,11,23,12,25,13,27,14,29,15,31,16,33,17,35,18,
	37,19,39,20,41,21,43,22,45,23,47,24,49,25,51,26,53,27,55,28,57,29,59,0,
	61,30,1,0,12,3,0,65,90,95,95,97,122,4,0,48,57,65,90,95,95,97,122,2,0,65,
	90,97,122,1,0,45,45,1,0,49,57,1,0,48,57,1,0,48,48,5,0,77,77,107,107,109,
	110,112,112,117,117,3,0,48,57,65,90,97,122,3,0,42,43,45,45,47,47,2,0,9,
	9,32,32,2,0,10,10,12,13,253,0,1,1,0,0,0,0,3,1,0,0,0,0,5,1,0,0,0,0,7,1,0,
	0,0,0,9,1,0,0,0,0,11,1,0,0,0,0,13,1,0,0,0,0,15,1,0,0,0,0,17,1,0,0,0,0,19,
	1,0,0,0,0,21,1,0,0,0,0,23,1,0,0,0,0,25,1,0,0,0,0,27,1,0,0,0,0,29,1,0,0,
	0,0,31,1,0,0,0,0,33,1,0,0,0,0,35,1,0,0,0,0,37,1,0,0,0,0,39,1,0,0,0,0,41,
	1,0,0,0,0,43,1,0,0,0,0,45,1,0,0,0,0,47,1,0,0,0,0,49,1,0,0,0,0,51,1,0,0,
	0,0,53,1,0,0,0,0,55,1,0,0,0,0,57,1,0,0,0,0,61,1,0,0,0,1,63,1,0,0,0,3,70,
	1,0,0,0,5,72,1,0,0,0,7,76,1,0,0,0,9,80,1,0,0,0,11,83,1,0,0,0,13,86,1,0,
	0,0,15,88,1,0,0,0,17,94,1,0,0,0,19,96,1,0,0,0,21,100,1,0,0,0,23,102,1,0,
	0,0,25,104,1,0,0,0,27,111,1,0,0,0,29,118,1,0,0,0,31,128,1,0,0,0,33,130,
	1,0,0,0,35,132,1,0,0,0,37,141,1,0,0,0,39,143,1,0,0,0,41,150,1,0,0,0,43,
	173,1,0,0,0,45,175,1,0,0,0,47,179,1,0,0,0,49,189,1,0,0,0,51,202,1,0,0,0,
	53,206,1,0,0,0,55,209,1,0,0,0,57,216,1,0,0,0,59,225,1,0,0,0,61,234,1,0,
	0,0,63,64,5,98,0,0,64,65,5,114,0,0,65,66,5,97,0,0,66,67,5,110,0,0,67,68,
	5,99,0,0,68,69,5,104,0,0,69,2,1,0,0,0,70,71,5,58,0,0,71,4,1,0,0,0,72,73,
	5,97,0,0,73,74,5,100,0,0,74,75,5,100,0,0,75,6,1,0,0,0,76,77,5,112,0,0,77,
	78,5,105,0,0,78,79,5,110,0,0,79,8,1,0,0,0,80,81,5,97,0,0,81,82,5,116,0,
	0,82,10,1,0,0,0,83,84,5,116,0,0,84,85,5,111,0,0,85,12,1,0,0,0,86,87,5,44,
	0,0,87,14,1,0,0,0,88,89,5,98,0,0,89,90,5,114,0,0,90,91,5,101,0,0,91,92,
	5,97,0,0,92,93,5,107,0,0,93,16,1,0,0,0,94,95,5,61,0,0,95,18,1,0,0,0,96,
	97,5,100,0,0,97,98,5,101,0,0,98,99,5,102,0,0,99,20,1,0,0,0,100,101,5,40,
	0,0,101,22,1,0,0,0,102,103,5,41,0,0,103,24,1,0,0,0,104,105,5,114,0,0,105,
	106,5,101,0,0,106,107,5,116,0,0,107,108,5,117,0,0,108,109,5,114,0,0,109,
	110,5,110,0,0,110,26,1,0,0,0,111,112,5,99,0,0,112,113,5,114,0,0,113,114,
	5,101,0,0,114,115,5,97,0,0,115,116,5,116,0,0,116,117,5,101,0,0,117,28,1,
	0,0,0,118,119,5,99,0,0,119,120,5,111,0,0,120,121,5,109,0,0,121,122,5,112,
	0,0,122,123,5,111,0,0,123,124,5,110,0,0,124,125,5,101,0,0,125,126,5,110,
	0,0,126,127,5,116,0,0,127,30,1,0,0,0,128,129,5,91,0,0,129,32,1,0,0,0,130,
	131,5,93,0,0,131,34,1,0,0,0,132,133,5,119,0,0,133,134,5,105,0,0,134,135,
	5,114,0,0,135,136,5,101,0,0,136,36,1,0,0,0,137,138,5,110,0,0,138,142,5,
	99,0,0,139,140,5,78,0,0,140,142,5,67,0,0,141,137,1,0,0,0,141,139,1,0,0,
	0,142,38,1,0,0,0,143,147,7,0,0,0,144,146,7,1,0,0,145,144,1,0,0,0,146,149,
	1,0,0,0,147,145,1,0,0,0,147,148,1,0,0,0,148,40,1,0,0,0,149,147,1,0,0,0,
	150,151,3,39,19,0,151,152,5,46,0,0,152,154,7,2,0,0,153,155,7,1,0,0,154,
	153,1,0,0,0,155,156,1,0,0,0,156,154,1,0,0,0,156,157,1,0,0,0,157,42,1,0,
	0,0,158,160,7,3,0,0,159,158,1,0,0,0,159,160,1,0,0,0,160,162,1,0,0,0,161,
	163,7,4,0,0,162,161,1,0,0,0,163,164,1,0,0,0,164,162,1,0,0,0,164,165,1,0,
	0,0,165,169,1,0,0,0,166,168,7,5,0,0,167,166,1,0,0,0,168,171,1,0,0,0,169,
	167,1,0,0,0,169,170,1,0,0,0,170,174,1,0,0,0,171,169,1,0,0,0,172,174,7,6,
	0,0,173,159,1,0,0,0,173,172,1,0,0,0,174,44,1,0,0,0,175,177,3,43,21,0,176,
	178,7,7,0,0,177,176,1,0,0,0,177,178,1,0,0,0,178,46,1,0,0,0,179,183,5,34,
	0,0,180,182,9,0,0,0,181,180,1,0,0,0,182,185,1,0,0,0,183,184,1,0,0,0,183,
	181,1,0,0,0,184,186,1,0,0,0,185,183,1,0,0,0,186,187,5,34,0,0,187,48,1,0,
	0,0,188,190,7,4,0,0,189,188,1,0,0,0,190,191,1,0,0,0,191,189,1,0,0,0,191,
	192,1,0,0,0,192,196,1,0,0,0,193,195,7,5,0,0,194,193,1,0,0,0,195,198,1,0,
	0,0,196,194,1,0,0,0,196,197,1,0,0,0,197,199,1,0,0,0,198,196,1,0,0,0,199,
	200,5,37,0,0,200,50,1,0,0,0,201,203,7,8,0,0,202,201,1,0,0,0,203,204,1,0,
	0,0,204,202,1,0,0,0,204,205,1,0,0,0,205,52,1,0,0,0,206,207,7,9,0,0,207,
	54,1,0,0,0,208,210,7,10,0,0,209,208,1,0,0,0,210,211,1,0,0,0,211,209,1,0,
	0,0,211,212,1,0,0,0,212,213,1,0,0,0,213,214,6,27,0,0,214,56,1,0,0,0,215,
	217,5,13,0,0,216,215,1,0,0,0,216,217,1,0,0,0,217,218,1,0,0,0,218,222,5,
	10,0,0,219,221,5,32,0,0,220,219,1,0,0,0,221,224,1,0,0,0,222,220,1,0,0,0,
	222,223,1,0,0,0,223,58,1,0,0,0,224,222,1,0,0,0,225,229,5,35,0,0,226,228,
	8,11,0,0,227,226,1,0,0,0,228,231,1,0,0,0,229,227,1,0,0,0,229,230,1,0,0,
	0,230,60,1,0,0,0,231,229,1,0,0,0,232,235,3,55,27,0,233,235,3,59,29,0,234,
	232,1,0,0,0,234,233,1,0,0,0,235,236,1,0,0,0,236,237,6,30,0,0,237,62,1,0,
	0,0,18,0,141,147,156,159,164,169,173,177,183,191,196,204,211,216,222,229,
	234,1,6,0,0];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!CircuitScriptLexer.__ATN) {
			CircuitScriptLexer.__ATN = new ATNDeserializer().deserialize(CircuitScriptLexer._serializedATN);
		}

		return CircuitScriptLexer.__ATN;
	}


	static DecisionsToDFA = CircuitScriptLexer._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );
}