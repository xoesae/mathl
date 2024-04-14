export enum TokenType {
    Plus,
    Minus,
    Multiply,
    Divide,
    LeftParenthesis,
    RightParenthesis,
    Number,
    EndOfFile,
    Error,
}

export function tokenTypeName(kind: TokenType) {
    switch (kind) {
        case TokenType.Plus:
            return "Plus";
        case TokenType.Minus:
            return "Minus";
        case TokenType.Multiply:
            return "Multiply";
        case TokenType.Divide:
            return "Divide";
        case TokenType.LeftParenthesis:
            return "LeftParenthesis";
        case TokenType.RightParenthesis:
            return "RightParenthesis";
        case TokenType.Number:
            return "Number";
        case TokenType.EndOfFile:
            return "EndOfFile";
        case TokenType.Error:
            return "Error";
    }
}

export class Token {
    readonly kind: TokenType;
    readonly value: number | null;

    constructor(kind: TokenType, value: number | null = null) {
        this.kind = kind;
        this.value = value;
    }

    toString(): string {
        const value = this.value ? `(${this.value})` : "";
        const type = tokenTypeName(this.kind);

        return type + value;
    }
}