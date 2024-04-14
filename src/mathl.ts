import Runtime from "@/runtime/runtime";
import Parser from "@/parser/parser";
import Lexer from "@/lexer/lexer";

export default class Mathl {
    static interpret(source: string) {
        const runtime = new Runtime(
            (new Parser(
                (new Lexer(source)).lex())
            ).parse()
        )

        return runtime.execute();
    }
}