import Lexer from "@/lexer/lexer";
import Parser from "@/parser/parser"
import { TokenType } from "@/utils/token";
import { Node } from "@/utils/ast";

export default class Runtime {
    ast: Node;

    constructor(ast: Node) {
        this.ast = ast;
    }

    private sum(left: number, right: number): number {
        return left + right;
    }

    private subtract(left: number, right: number): number {
        return left - right;
    }

    private multiply(left: number, right: number): number {
        return left * right;
    }

    private divide(left: number, right: number): number {
        if (right === 0) {
            throw new Error('Erro de divisão por zero');
        }

        return left / right;
    }


    private interpret(node: Node): number {
        if (node.kind === TokenType.Number) {
            return node.value;
        }

        const left = this.interpret(node.children[0]);
        const right = this.interpret(node.children[1]);

        switch (node.kind) {
            case TokenType.Plus:
                return this.sum(left, right);
            case TokenType.Minus:
                return this.subtract(left, right);
            case TokenType.Multiply:
                return this.multiply(left, right);
            case TokenType.Divide:
                return this.divide(left, right);
            default:
                throw new Error('Operador inválido: ' + node.kind);
        }
    }

    execute(): number {
        return this.interpret(this.ast);
    }
}