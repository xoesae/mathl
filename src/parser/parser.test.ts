import { Token, TokenType } from "@/utils/token"
import { Node } from "@/utils/ast"
import Parser from "@/parser/parser"
import { expect, test } from "bun:test"

test("parse a sum of two numbers", () => {
    const tokens = [new Token(TokenType.Number, 1), new Token(TokenType.Plus), new Token(TokenType.Number, 2), new Token(TokenType.EndOfFile)]
    const expected = new Node(TokenType.Plus, null, [
        new Node(TokenType.Number, 1),
        new Node(TokenType.Number, 2),
    ])
    const parser = new Parser(tokens)
    const ast = parser.parse()

    expect(ast).toEqual(expected)
})

test("parse multiplication precedence", () => {
    const tokens = [
        new Token(TokenType.Number, 1),
        new Token(TokenType.Multiply), 
        new Token(TokenType.Number, 2), 
        new Token(TokenType.Plus), 
        new Token(TokenType.Number, 3),
        new Token(TokenType.EndOfFile)
    ]
    const expected = new Node(TokenType.Plus, null, [
        new Node(TokenType.Multiply, null, [
            new Node(TokenType.Number, 1),
            new Node(TokenType.Number, 2),
        ]),
        new Node(TokenType.Number, 3),
    ])
    const parser = new Parser(tokens)
    const ast = parser.parse()

    expect(ast).toEqual(expected)
})

test("parse division precedence", () => {
    const tokens = [
        new Token(TokenType.Number, 1),
        new Token(TokenType.Divide), 
        new Token(TokenType.Number, 2), 
        new Token(TokenType.Plus), 
        new Token(TokenType.Number, 3),
        new Token(TokenType.EndOfFile)
    ]
    const expected = new Node(TokenType.Plus, null, [
        new Node(TokenType.Divide, null, [
            new Node(TokenType.Number, 1),
            new Node(TokenType.Number, 2),
        ]),
        new Node(TokenType.Number, 3),
    ])
    const parser = new Parser(tokens)
    const ast = parser.parse()

    expect(ast).toEqual(expected)
})

test("parse parentheses precedence", () => {
    const tokens = [
        new Token(TokenType.LeftParenthesis),
        new Token(TokenType.Number, 1),
        new Token(TokenType.Plus), 
        new Token(TokenType.Number, 2), 
        new Token(TokenType.RightParenthesis),
        new Token(TokenType.Divide), 
        new Token(TokenType.Number, 3),
        new Token(TokenType.EndOfFile)
    ]

    const expected = new Node(TokenType.Divide, null, [
        new Node(TokenType.Plus, null, [
            new Node(TokenType.Number, 1),
            new Node(TokenType.Number, 2),
        ]),
        new Node(TokenType.Number, 3),
    ])
    const parser = new Parser(tokens)
    const ast = parser.parse()

    expect(ast).toEqual(expected)
})