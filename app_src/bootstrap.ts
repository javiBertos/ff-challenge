function bracify (text: string): string {
    return "{" + text + "}";
}

var bracified = bracify("Hello world!");
console.log( bracified );
