import { isNumeric, isWhitespace } from "@/utils/helpers";
import { Token, TokenType } from "@/utils/token";

export default class Lexer {
    current: number = 0;
    tokens: Token[] = [];
    source: string;

    constructor(source: string) {
        this.source = source;
    }

    private addToken(kind: TokenType, value: number | null = null): void {
        this.tokens.push(new Token(kind, value));
    }

    private getCurrentChar(): string {
        return this.source[this.current];
    }

    private isAtEnd(): boolean {
        return this.current >= this.source.length;
    }

    private number(): number {
        let number = this.getCurrentChar();
        this.current++;

        while (!this.isAtEnd() && isNumeric(this.getCurrentChar())) {
            number += this.getCurrentChar();
            this.current++;
        }

        return parseInt(number);
    }

    lex(): Token[] {
        while (!this.isAtEnd()) {
            const currentChar = this.getCurrentChar();

            if (isNumeric(currentChar)) {
                this.addToken(TokenType.Number, this.number());
                continue;
            }

            switch (currentChar) {
                case '+':
                    this.addToken(TokenType.Plus);
                    break;
                case '-':
                    this.addToken(TokenType.Minus);
                    break;
                case '*':
                    this.addToken(TokenType.Multiply);
                    break;
                case '/':
                    this.addToken(TokenType.Divide);
                    break;
                case '(':
                    this.addToken(TokenType.LeftParenthesis);
                    break;
                case ')':
                    this.addToken(TokenType.RightParenthesis);
                    break;
                default:
                    if (!isWhitespace(currentChar)) {
                        this.addToken(TokenType.Error);
                    }
            }

            this.current++;
        }

        this.addToken(TokenType.EndOfFile);

        return this.tokens;
    }
}