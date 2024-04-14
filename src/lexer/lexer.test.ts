import { Token, TokenType } from "@/utils/token"
import Lexer from "@/lexer/lexer"
import { expect, test } from "bun:test"

test("lex sum of two numbers", () => {
    const source = "1+2"
    const expected = [new Token(TokenType.Number, 1), new Token(TokenType.Plus), new Token(TokenType.Number, 2), new Token(TokenType.EndOfFile)]
    const lexer = new Lexer(source)
    const tokens = lexer.lex()

    expect(tokens).toEqual(expected)
})

test("lex with blanks chars", () => {
    const source = `1     +
        2
    `
    const expected = [new Token(TokenType.Number, 1), new Token(TokenType.Plus), new Token(TokenType.Number, 2), new Token(TokenType.EndOfFile)]
    const lexer = new Lexer(source)
    const tokens = lexer.lex()

    expect(tokens).toEqual(expected)
})

test("lex subtraction of two numbers", () => {
    const source = "1 - 2"
    const expected = [new Token(TokenType.Number, 1), new Token(TokenType.Minus), new Token(TokenType.Number, 2), new Token(TokenType.EndOfFile)]
    const lexer = new Lexer(source)
    const tokens = lexer.lex()

    expect(tokens).toEqual(expected)
})

test("lex multiplication of two numbers", () => {
    const source = "1 * 2"
    const expected = [new Token(TokenType.Number, 1), new Token(TokenType.Multiply), new Token(TokenType.Number, 2), new Token(TokenType.EndOfFile)]
    const lexer = new Lexer(source)
    const tokens = lexer.lex()

    expect(tokens).toEqual(expected)
})

test("lex division of two numbers", () => {
    const source = "1 / 2"
    const expected = [new Token(TokenType.Number, 1), new Token(TokenType.Divide), new Token(TokenType.Number, 2), new Token(TokenType.EndOfFile)]
    const lexer = new Lexer(source)
    const tokens = lexer.lex()

    expect(tokens).toEqual(expected)
})

test("lex greater than 2 digits number", () => {
    const source = "12 + 255"
    const expected = [new Token(TokenType.Number, 12), new Token(TokenType.Plus), new Token(TokenType.Number, 255), new Token(TokenType.EndOfFile)]
    const lexer = new Lexer(source)
    const tokens = lexer.lex()

    expect(tokens).toEqual(expected)
})

test("lex greater than 2 operators", () => {
    const source = "1 + 2 - 3 * 4 / 5"
    const expected = [
        new Token(TokenType.Number, 1),
        new Token(TokenType.Plus),
        new Token(TokenType.Number, 2),
        new Token(TokenType.Minus),
        new Token(TokenType.Number, 3),
        new Token(TokenType.Multiply),
        new Token(TokenType.Number, 4),
        new Token(TokenType.Divide),
        new Token(TokenType.Number, 5),
        new Token(TokenType.EndOfFile)
    ]
    const lexer = new Lexer(source)
    const tokens = lexer.lex()

    expect(tokens).toEqual(expected)
})

test("lex parentheses", () => {
    const source = "(1 + 2)"
    const expected = [
        new Token(TokenType.LeftParenthesis),
        new Token(TokenType.Number, 1),
        new Token(TokenType.Plus),
        new Token(TokenType.Number, 2),
        new Token(TokenType.RightParenthesis),
        new Token(TokenType.EndOfFile)
    ]
    const lexer = new Lexer(source)
    const tokens = lexer.lex()

    expect(tokens).toEqual(expected)
})

test("lex parentheses inner parentheses", () => {
    const source = "(5 * (1 + 2))"
    const expected = [
        new Token(TokenType.LeftParenthesis),
        new Token(TokenType.Number, 5),
        new Token(TokenType.Multiply),
        new Token(TokenType.LeftParenthesis),
        new Token(TokenType.Number, 1),
        new Token(TokenType.Plus),
        new Token(TokenType.Number, 2),
        new Token(TokenType.RightParenthesis),
        new Token(TokenType.RightParenthesis),
        new Token(TokenType.EndOfFile)
    ]
    const lexer = new Lexer(source)
    const tokens = lexer.lex()

    expect(tokens).toEqual(expected)
})