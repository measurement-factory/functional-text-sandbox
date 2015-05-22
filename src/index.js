import functionalText from "functional-text";

window.addEventListener("DOMContentLoaded", function () {
    let inputNode = document.querySelector("#input");
    let outputHtmlNode = document.querySelector("#output-html");
    let outputJsonNode = document.querySelector("#output-json");

    let str = window.location.hash.length > 0 ?
        decodeURIComponent(window.location.hash.substr(1)) :
        `Sample Text for parsing`.trim();

    inputNode.value = str;
    inputNode.style.height = '200px';
    inputNode.style.width = '100%';

    let savedLog = console.log.bind(console);
    console.log = function (...args) {
        print(...args);
        savedLog(...args);
    };

    function print(...args) {
        outputHtmlNode.innerHTML += `<div>${args.join(" ")}</div>`;
    }

    function runParser() {
        outputHtmlNode.innerHTML = "";

        try {
            let parseResult = functionalText(inputNode.value);
            outputHtmlNode.style.borderColor = "black";

            print(parseResult.toString().replace(/</g, "&lt;").replace(/>/g, "&gt;"));
            outputJsonNode.innerHTML = JSON.stringify(parseResult, null, 4).replace(/</g, "&lt;").replace(/>/g, "&gt;");
        } catch (error) {
            outputHtmlNode.style.borderColor = "red";
            print(error);
        }

        window.location.hash = `#${encodeURIComponent(inputNode.value)}`;
    }

    inputNode.addEventListener("input", runParser);
    runParser();
});