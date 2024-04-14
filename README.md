# Mathl

Math interpreter for learning programming languages.

## Grammar

```bnf
<exp> ::= <term> | <exp> "+" <term> | <exp> "-" <term>
<term> ::= <factor> | <term> "*" <factor> | <term> "/" <factor>
<factor> ::= <number> | "(" <exp> ")"
<number> ::= <digit> | <digit> <number>
<digit> ::= "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
```


## Installation

To install dependencies:

```bash
bun install
```

To run:

```bash
bun mathl
```
