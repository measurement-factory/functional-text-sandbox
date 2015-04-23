import Parser from "../functional-text";

console.log(Parser.ParsedItem);

class TagElement extends Parser.ParsedItem {
    constructor({name, children}) {
        super({children});
        this.type = "tag";
        this.name = name;
        this.classes = [];
    }
    toString() {
        let classes = this.classes.length > 0 ? ` class="${this.classes.join(" ")}"` : "";

        return global.JSON_OUTPUT ?
            JSON.stringify(this, undefined, 4)
            : `<${this.name}${classes}>${this.children.join("")}</${this.name}>`;
    }
    addClass(klass) {
        this.classes.push(klass);
    }
}

window.addEventListener("DOMContentLoaded", function () {
    let inputNode = document.querySelector("#input");
    let outputJsonNode = document.querySelector("#output-json");
    let outputHtmlNode = document.querySelector("#output-html");

    let str = `Sample Text for parsing`.trim();

    inputNode.value = str;
    inputNode.style.height = '200px';
    inputNode.style.width = '100%';

    function runParser() {
        let parser = new Parser();

        function createFunc(name) {
            let func = function (raw, stopRegex) {
                let result = this.parseRecursive(raw, stopRegex);
                return this.newResult(new TagElement({name, children: result.parsed}), result.raw);
            };

            parser.addFunction(name, func);
        }

        createFunc("p");
        createFunc("span");
        createFunc("ul");
        createFunc("li");

        global.JSON_OUTPUT = true;
        let parsedJson = parser.parse(inputNode.value);
        global.JSON_OUTPUT = false;
        let parsedHtml = parser.parse(inputNode.value);
        outputJsonNode.innerHTML = parsedJson.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        outputHtmlNode.innerHTML = parsedHtml.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    inputNode.addEventListener("input", runParser, 200);
    runParser();
});