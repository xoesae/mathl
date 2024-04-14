import { test, expect } from 'bun:test'
import { Token, TokenType } from '@/utils/token'
import { Node } from '@/utils/ast'
import Runtime from '@/runtime/runtime'


test("sum of two numbers", () => {
    const ast = new Node(TokenType.Plus, null, [
        new Node(TokenType.Number, 1),
        new Node(TokenType.Number, 1),
    ]);
    const expected = 2;

    const runtime = new Runtime(ast)

    expect(runtime.execute()).toEqual(expected)
})

test("subtraction of two numbers", () => {
    const ast = new Node(TokenType.Minus, null, [
        new Node(TokenType.Number, 1),
        new Node(TokenType.Number, 1),
    ]);
    const expected = 0;

    const runtime = new Runtime(ast)

    expect(runtime.execute()).toEqual(expected)
})


test("multiply of two numbers", () => {
    const ast = new Node(TokenType.Multiply, null, [
        new Node(TokenType.Number, 1),
        new Node(TokenType.Number, 2),
    ]);
    const expected = 2;

    const runtime = new Runtime(ast)

    expect(runtime.execute()).toEqual(expected)
})

test("division of two numbers", () => {
    const ast = new Node(TokenType.Divide, null, [
        new Node(TokenType.Number, 1),
        new Node(TokenType.Number, 2),
    ]);
    const expected = 1/2;

    const runtime = new Runtime(ast)

    expect(runtime.execute()).toEqual(expected)
})

test("division by zero", () => {
    const ast = new Node(TokenType.Divide, null, [
        new Node(TokenType.Number, 1),
        new Node(TokenType.Number, 0),
    ]);

    const runtime = new Runtime(ast)

    expect(runtime.execute).toThrow(Error)
})

test("multiply precedence", () => {
    const ast = new Node(TokenType.Plus, null, [
        new Node(TokenType.Multiply, null, [
            new Node(TokenType.Number, 2),
            new Node(TokenType.Number, 2),
        ]),
        new Node(TokenType.Number, 3),
    ]);
    const expected = 7;

    const runtime = new Runtime(ast)

    expect(runtime.execute()).toEqual(expected)
})

test("parentheses precedence", () => {
    const ast = new Node(TokenType.Plus, null, [
        new Node(TokenType.Multiply, null, [
            new Node(TokenType.Number, 2),
            new Node(TokenType.Number, 2),
        ]),
        new Node(TokenType.Number, 3),
    ]);
    const expected = 7;

    const runtime = new Runtime(ast)

    expect(runtime.execute()).toEqual(expected)
})