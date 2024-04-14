import { Token, TokenType } from "@/utils/token";
import { Node } from '@/utils/ast';

export default class Parser {
    current: number = 0;
    tokens: Token[] = [];

    constructor(tokens: Token[]) {
        this.tokens = tokens;
    }

    private nextToken(): Token {
        return this.tokens[this.current++];
    }

    private isAtEnd(): boolean {
        return this.current >= this.tokens.length;
    }

    private match(kind: TokenType): boolean {
        if (this.isAtEnd()) {
            return false;
        }

        return this.tokens[this.current].kind === kind
    }

    private factor(): Node {
        let currentToken = this.nextToken();

        if (currentToken.kind === TokenType.LeftParenthesis) {
            let left = this.expression();
            // Verifica se o próximo token é um ')' e consome-o
            if (this.nextToken().kind !== TokenType.RightParenthesis) {
                throw new Error("Expressão mal formada: parêntese de fechamento ausente.");
            }

            return left;
        }

        return new Node(currentToken.kind, currentToken.value);
    }

    private term(): Node {
        let left = this.factor()

        while (!this.isAtEnd() && (this.match(TokenType.Multiply) || this.match(TokenType.Divide))) {
            let operator = this.nextToken();
            let right = this.factor();
            let newNode = new Node(operator.kind, null);
            newNode.children.push(left);
            newNode.children.push(right);
            left = newNode;
        }

        return left;
    }

    private expression(): Node {
        let left = this.term();

        while (!this.isAtEnd() && (this.match(TokenType.Plus) || this.match(TokenType.Minus))) {
            let operator = this.nextToken();
            let right = this.term();
            let newNode = new Node(operator.kind, null);
            newNode.children.push(left);
            newNode.children.push(right);
            left = newNode;
        }

        return left;
    }

    parse(): Node {
        return this.expression();
    }
}