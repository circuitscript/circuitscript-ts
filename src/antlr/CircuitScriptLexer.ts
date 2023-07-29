// Generated from CircuitScript.g4 by ANTLR 4.13.0
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
	public static readonly NOT_CONNECTED = 17;
	public static readonly DECORATOR = 18;
	public static readonly ID = 19;
	public static readonly INSTANCE_NAME_WITH_PROPERTY = 20;
	public static readonly INTEGER_VALUE = 21;
	public static readonly NUMERIC_VALUE = 22;
	public static readonly STRING_VALUE = 23;
	public static readonly PERCENTAGE_VALUE = 24;
	public static readonly ALPHA_NUMERIC = 25;
	public static readonly OPERATOR = 26;
	public static readonly WS = 27;
	public static readonly NEWLINE = 28;
	public static readonly SKIP_ = 29;
	public static readonly EOF = Token.EOF;

	public static readonly channelNames: string[] = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
	public static readonly literalNames: (string | null)[] = [ null, "'branch'", 
                                                            "':'", "'section'", 
                                                            "'add'", "'pin'", 
                                                            "'at'", "'to'", 
                                                            "','", "'break'", 
                                                            "'='", "'def'", 
                                                            "'('", "')'", 
                                                            "'return'", 
                                                            "'create'", 
                                                            "'component'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, "NOT_CONNECTED", 
                                                             "DECORATOR", 
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
		"T__9", "T__10", "T__11", "T__12", "T__13", "T__14", "T__15", "NOT_CONNECTED", 
		"DECORATOR", "ID", "INSTANCE_NAME_WITH_PROPERTY", "INTEGER_VALUE", "NUMERIC_VALUE", 
		"STRING_VALUE", "PERCENTAGE_VALUE", "ALPHA_NUMERIC", "OPERATOR", "WS", 
		"NEWLINE", "COMMENT", "SKIP_",
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

	public static readonly _serializedATN: number[] = [4,0,29,241,6,-1,2,0,
	7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,
	7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,
	16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,
	2,24,7,24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,1,0,1,0,1,0,
	1,0,1,0,1,0,1,0,1,1,1,1,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,3,1,3,1,3,1,3,
	1,4,1,4,1,4,1,4,1,5,1,5,1,5,1,6,1,6,1,6,1,7,1,7,1,8,1,8,1,8,1,8,1,8,1,8,
	1,9,1,9,1,10,1,10,1,10,1,10,1,11,1,11,1,12,1,12,1,13,1,13,1,13,1,13,1,13,
	1,13,1,13,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,15,1,15,1,15,1,15,1,15,1,
	15,1,15,1,15,1,15,1,15,1,16,1,16,1,16,1,16,3,16,139,8,16,1,17,1,17,4,17,
	143,8,17,11,17,12,17,144,1,18,1,18,5,18,149,8,18,10,18,12,18,152,9,18,1,
	19,1,19,1,19,1,19,4,19,158,8,19,11,19,12,19,159,1,20,3,20,163,8,20,1,20,
	4,20,166,8,20,11,20,12,20,167,1,20,5,20,171,8,20,10,20,12,20,174,9,20,1,
	20,3,20,177,8,20,1,21,1,21,3,21,181,8,21,1,22,1,22,5,22,185,8,22,10,22,
	12,22,188,9,22,1,22,1,22,1,23,4,23,193,8,23,11,23,12,23,194,1,23,5,23,198,
	8,23,10,23,12,23,201,9,23,1,23,1,23,1,24,4,24,206,8,24,11,24,12,24,207,
	1,25,1,25,1,26,4,26,213,8,26,11,26,12,26,214,1,26,1,26,1,27,3,27,220,8,
	27,1,27,1,27,5,27,224,8,27,10,27,12,27,227,9,27,1,28,1,28,5,28,231,8,28,
	10,28,12,28,234,9,28,1,29,1,29,3,29,238,8,29,1,29,1,29,1,186,0,30,1,1,3,
	2,5,3,7,4,9,5,11,6,13,7,15,8,17,9,19,10,21,11,23,12,25,13,27,14,29,15,31,
	16,33,17,35,18,37,19,39,20,41,21,43,22,45,23,47,24,49,25,51,26,53,27,55,
	28,57,0,59,29,1,0,12,4,0,48,57,65,90,95,95,97,122,3,0,65,90,95,95,97,122,
	2,0,65,90,97,122,1,0,45,45,1,0,49,57,1,0,48,57,1,0,48,48,5,0,77,77,107,
	107,109,110,112,112,117,117,3,0,48,57,65,90,97,122,3,0,42,43,45,45,47,47,
	2,0,9,9,32,32,2,0,10,10,12,13,257,0,1,1,0,0,0,0,3,1,0,0,0,0,5,1,0,0,0,0,
	7,1,0,0,0,0,9,1,0,0,0,0,11,1,0,0,0,0,13,1,0,0,0,0,15,1,0,0,0,0,17,1,0,0,
	0,0,19,1,0,0,0,0,21,1,0,0,0,0,23,1,0,0,0,0,25,1,0,0,0,0,27,1,0,0,0,0,29,
	1,0,0,0,0,31,1,0,0,0,0,33,1,0,0,0,0,35,1,0,0,0,0,37,1,0,0,0,0,39,1,0,0,
	0,0,41,1,0,0,0,0,43,1,0,0,0,0,45,1,0,0,0,0,47,1,0,0,0,0,49,1,0,0,0,0,51,
	1,0,0,0,0,53,1,0,0,0,0,55,1,0,0,0,0,59,1,0,0,0,1,61,1,0,0,0,3,68,1,0,0,
	0,5,70,1,0,0,0,7,78,1,0,0,0,9,82,1,0,0,0,11,86,1,0,0,0,13,89,1,0,0,0,15,
	92,1,0,0,0,17,94,1,0,0,0,19,100,1,0,0,0,21,102,1,0,0,0,23,106,1,0,0,0,25,
	108,1,0,0,0,27,110,1,0,0,0,29,117,1,0,0,0,31,124,1,0,0,0,33,138,1,0,0,0,
	35,140,1,0,0,0,37,146,1,0,0,0,39,153,1,0,0,0,41,176,1,0,0,0,43,178,1,0,
	0,0,45,182,1,0,0,0,47,192,1,0,0,0,49,205,1,0,0,0,51,209,1,0,0,0,53,212,
	1,0,0,0,55,219,1,0,0,0,57,228,1,0,0,0,59,237,1,0,0,0,61,62,5,98,0,0,62,
	63,5,114,0,0,63,64,5,97,0,0,64,65,5,110,0,0,65,66,5,99,0,0,66,67,5,104,
	0,0,67,2,1,0,0,0,68,69,5,58,0,0,69,4,1,0,0,0,70,71,5,115,0,0,71,72,5,101,
	0,0,72,73,5,99,0,0,73,74,5,116,0,0,74,75,5,105,0,0,75,76,5,111,0,0,76,77,
	5,110,0,0,77,6,1,0,0,0,78,79,5,97,0,0,79,80,5,100,0,0,80,81,5,100,0,0,81,
	8,1,0,0,0,82,83,5,112,0,0,83,84,5,105,0,0,84,85,5,110,0,0,85,10,1,0,0,0,
	86,87,5,97,0,0,87,88,5,116,0,0,88,12,1,0,0,0,89,90,5,116,0,0,90,91,5,111,
	0,0,91,14,1,0,0,0,92,93,5,44,0,0,93,16,1,0,0,0,94,95,5,98,0,0,95,96,5,114,
	0,0,96,97,5,101,0,0,97,98,5,97,0,0,98,99,5,107,0,0,99,18,1,0,0,0,100,101,
	5,61,0,0,101,20,1,0,0,0,102,103,5,100,0,0,103,104,5,101,0,0,104,105,5,102,
	0,0,105,22,1,0,0,0,106,107,5,40,0,0,107,24,1,0,0,0,108,109,5,41,0,0,109,
	26,1,0,0,0,110,111,5,114,0,0,111,112,5,101,0,0,112,113,5,116,0,0,113,114,
	5,117,0,0,114,115,5,114,0,0,115,116,5,110,0,0,116,28,1,0,0,0,117,118,5,
	99,0,0,118,119,5,114,0,0,119,120,5,101,0,0,120,121,5,97,0,0,121,122,5,116,
	0,0,122,123,5,101,0,0,123,30,1,0,0,0,124,125,5,99,0,0,125,126,5,111,0,0,
	126,127,5,109,0,0,127,128,5,112,0,0,128,129,5,111,0,0,129,130,5,110,0,0,
	130,131,5,101,0,0,131,132,5,110,0,0,132,133,5,116,0,0,133,32,1,0,0,0,134,
	135,5,110,0,0,135,139,5,99,0,0,136,137,5,78,0,0,137,139,5,67,0,0,138,134,
	1,0,0,0,138,136,1,0,0,0,139,34,1,0,0,0,140,142,5,64,0,0,141,143,7,0,0,0,
	142,141,1,0,0,0,143,144,1,0,0,0,144,142,1,0,0,0,144,145,1,0,0,0,145,36,
	1,0,0,0,146,150,7,1,0,0,147,149,7,0,0,0,148,147,1,0,0,0,149,152,1,0,0,0,
	150,148,1,0,0,0,150,151,1,0,0,0,151,38,1,0,0,0,152,150,1,0,0,0,153,154,
	3,37,18,0,154,155,5,46,0,0,155,157,7,2,0,0,156,158,7,0,0,0,157,156,1,0,
	0,0,158,159,1,0,0,0,159,157,1,0,0,0,159,160,1,0,0,0,160,40,1,0,0,0,161,
	163,7,3,0,0,162,161,1,0,0,0,162,163,1,0,0,0,163,165,1,0,0,0,164,166,7,4,
	0,0,165,164,1,0,0,0,166,167,1,0,0,0,167,165,1,0,0,0,167,168,1,0,0,0,168,
	172,1,0,0,0,169,171,7,5,0,0,170,169,1,0,0,0,171,174,1,0,0,0,172,170,1,0,
	0,0,172,173,1,0,0,0,173,177,1,0,0,0,174,172,1,0,0,0,175,177,7,6,0,0,176,
	162,1,0,0,0,176,175,1,0,0,0,177,42,1,0,0,0,178,180,3,41,20,0,179,181,7,
	7,0,0,180,179,1,0,0,0,180,181,1,0,0,0,181,44,1,0,0,0,182,186,5,34,0,0,183,
	185,9,0,0,0,184,183,1,0,0,0,185,188,1,0,0,0,186,187,1,0,0,0,186,184,1,0,
	0,0,187,189,1,0,0,0,188,186,1,0,0,0,189,190,5,34,0,0,190,46,1,0,0,0,191,
	193,7,4,0,0,192,191,1,0,0,0,193,194,1,0,0,0,194,192,1,0,0,0,194,195,1,0,
	0,0,195,199,1,0,0,0,196,198,7,5,0,0,197,196,1,0,0,0,198,201,1,0,0,0,199,
	197,1,0,0,0,199,200,1,0,0,0,200,202,1,0,0,0,201,199,1,0,0,0,202,203,5,37,
	0,0,203,48,1,0,0,0,204,206,7,8,0,0,205,204,1,0,0,0,206,207,1,0,0,0,207,
	205,1,0,0,0,207,208,1,0,0,0,208,50,1,0,0,0,209,210,7,9,0,0,210,52,1,0,0,
	0,211,213,7,10,0,0,212,211,1,0,0,0,213,214,1,0,0,0,214,212,1,0,0,0,214,
	215,1,0,0,0,215,216,1,0,0,0,216,217,6,26,0,0,217,54,1,0,0,0,218,220,5,13,
	0,0,219,218,1,0,0,0,219,220,1,0,0,0,220,221,1,0,0,0,221,225,5,10,0,0,222,
	224,5,32,0,0,223,222,1,0,0,0,224,227,1,0,0,0,225,223,1,0,0,0,225,226,1,
	0,0,0,226,56,1,0,0,0,227,225,1,0,0,0,228,232,5,35,0,0,229,231,8,11,0,0,
	230,229,1,0,0,0,231,234,1,0,0,0,232,230,1,0,0,0,232,233,1,0,0,0,233,58,
	1,0,0,0,234,232,1,0,0,0,235,238,3,53,26,0,236,238,3,57,28,0,237,235,1,0,
	0,0,237,236,1,0,0,0,238,239,1,0,0,0,239,240,6,29,0,0,240,60,1,0,0,0,19,
	0,138,144,150,159,162,167,172,176,180,186,194,199,207,214,219,225,232,237,
	1,6,0,0];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!CircuitScriptLexer.__ATN) {
			CircuitScriptLexer.__ATN = new ATNDeserializer().deserialize(CircuitScriptLexer._serializedATN);
		}

		return CircuitScriptLexer.__ATN;
	}


	static DecisionsToDFA = CircuitScriptLexer._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );
}