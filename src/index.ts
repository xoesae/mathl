import readline from 'node:readline'
import Mathl from '@/mathl';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})


function repl() {
    rl.question("> ", (text) => {
        if (text === "exit") {
            rl.close();
        } else {
            const result = Mathl.interpret(text);
            console.log(result);
            repl()
        }
    })
}
  

repl()