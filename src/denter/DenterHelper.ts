import { Token } from 'antlr4';

// https://github.com/yshavit/antlr-denter
// From: https://raw.githubusercontent.com/yshavit/antlr-denter/main/Python3/antlr_denter/DenterHelper.py

export class DenterHelper {
    dentsBuffer = [];
    indentations = [];

    // These are numbers that reference the token.
    NLToken: number;
    IndentToken: number;
    DedentToken: number;

    shouldIgnoreEOF: boolean;
    reachedEOF = false;

    pullToken: () => Token;

    constructor(
        NLToken: number,
        IndentToken: number,
        DedentToken: number,
        shouldIgnoreEOF: boolean,
        pullToken: () => Token,
    ) {
        this.NLToken = NLToken;
        this.IndentToken = IndentToken;
        this.DedentToken = DedentToken;

        this.shouldIgnoreEOF = shouldIgnoreEOF;
        this.pullToken = pullToken;
    }

    initIfFirstRun(): void {
        if (this.indentations.length === 0) {
            this.indentations.splice(0, 0, 0);

            let firstRealToken: Token;

            while (true) {
                firstRealToken = this.pullToken();
                if (firstRealToken.type !== this.NLToken) {
                    break;
                }
            }

            if (firstRealToken.column > 0) {
                this.indentations.splice(0, 0, firstRealToken.column);
                this.dentsBuffer.push(
                    this.createToken(this.IndentToken, firstRealToken),
                );
            }

            this.dentsBuffer.push(firstRealToken);
        }
    }

    nextToken(): Token {
        this.initIfFirstRun();

        let token: Token;

        if (this.dentsBuffer.length === 0) {
            // If there's nothing in the dents buffer, then
            // get a new token
            token = this.pullToken();
        } else {
            // If there is something in the buffer, then
            // return it.
            token = this.dentsBuffer.splice(0, 1)[0];
        }

        if (this.reachedEOF) {
            return token;
        }

        if (token.type === this.NLToken) {
            token = this.handleNewLineToken(token);
        } else if (token.type === Token.EOF) {
            token = this.apply(token);
        }

        return token;
    }

    createToken(tokenType: number, copyFrom: Token): Token {
        let tokenTypeStr = null;

        if (tokenType === this.NLToken) {
            tokenTypeStr = 'newLine';
        } else if (tokenType === this.IndentToken) {
            tokenTypeStr = 'indent';
        } else if (tokenType === this.DedentToken) {
            tokenTypeStr = 'dedent';
        } else {
            tokenTypeStr = null;
        }

        const tmpToken = this.getInjectedToken(copyFrom, tokenTypeStr);
        tmpToken.type = tokenType;

        return tmpToken;
    }

    getInjectedToken(copyFrom: Token, tokenTypeStr: string): Token {
        const newToken = copyFrom.clone();
        newToken.text = tokenTypeStr;
        return newToken;
    }

    handleNewLineToken(token: Token): Token {
        let nextNextToken = this.pullToken();

        // Find the next new line token
        while (nextNextToken.type === this.NLToken) {
            token = nextNextToken;
            nextNextToken = this.pullToken();
        }

        if (nextNextToken.type === Token.EOF) {
            return this.apply(nextNextToken);
        }

        const nlText = token.text;
        let indent = nlText.length - 1;

        if (indent > 0 && nlText[0] === '\r') {
            indent -= 1;
        }

        const prevIndent = this.indentations[0];

        let returnToken: Token;
        if (indent === prevIndent) {
            returnToken = token;
        } else if (indent > prevIndent) {
            returnToken = this.createToken(this.IndentToken, token);
            this.indentations.splice(0, 0, indent);
        } else {
            returnToken = this.unwindTo(indent, token);
        }

        this.dentsBuffer.push(nextNextToken);

        return returnToken;
    }

    unwindTo(targetIndent: number, copyFrom: Token): Token {
        this.dentsBuffer.push(this.createToken(this.NLToken, copyFrom));

        while (true) {
            const prevIndent = this.indentations.splice(0, 1)[0];
            if (prevIndent === targetIndent) {
                break;
            }

            if (targetIndent > prevIndent) {
                this.indentations.splice(0, 0, prevIndent);
                this.dentsBuffer.push(
                    this.createToken(this.IndentToken, copyFrom),
                );
                break;
            }

            this.dentsBuffer.push(this.createToken(this.DedentToken, copyFrom));
        }

        this.indentations.splice(0, 0, targetIndent);
        return this.dentsBuffer.splice(0, 1)[0];
    }

    apply(token: Token): Token {
        if (this.shouldIgnoreEOF) {
            this.reachedEOF = true;
            return token;
        } else {
            let returnToken: Token;

            if (this.indentations.length === 0) {
                returnToken = this.createToken(this.NLToken, token);
                this.dentsBuffer.push(token);
            } else {
                returnToken = this.unwindTo(0, token);
                this.dentsBuffer.push(token);
            }

            this.reachedEOF = true;
            return returnToken;
        }
    }
}
