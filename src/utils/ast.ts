import { TokenType, tokenTypeName } from "@/utils/token";

export class Node {
    kind: TokenType;
    value: any;
    children: Node[];
    
    constructor(kind: TokenType, value: number|null = null, children: Node[] = []) {
        this.kind = kind;
        this.value = value;
        this.children = children;
    }
}

export function printAST(node: Node, depth: number = 0) {
    const indent = '-'.repeat(depth);
    let output = indent + tokenTypeName(node.kind);

    if (node.value !== null) {
        output += ': ' + node.value;
    }

    console.log(output);

    for (const child of node.children) {
        printAST(child, depth + 1);
    }
}