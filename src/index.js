import he from "he";
import functionalText from "functional-text";

function encode(str) {
    return he.encode(str, { useNamedReferences: true });
}

window.addEventListener("DOMContentLoaded", function () {
    let inputNode = document.querySelector("#input");
    let outputTextNode = document.querySelector("#output-text");
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

    function output(parseResult) {
        let stringResult = parseResult.toString();

        if (openedWindow) openedWindow.location = "data:text/html," + stringResult;
        outputTextNode.innerHTML = `<div>${encode(stringResult)}</div>`;
        outputHtmlNode.innerHTML = `<div>${stringResult}</div>`;
        outputJsonNode.innerHTML = encode(JSON.stringify(parseResult, null, 4));
    }

    let openedWindow;

    function runParser() {
        outputHtmlNode.innerHTML = "";
        outputTextNode.style.borderColor = "black";

        let parseResult;
        try {
            parseResult = functionalText(inputNode.value);
        } catch (error) {
            console.error(error);
            outputTextNode.style.borderColor = "red";
            outputTextNode.innerHTML = error;
        }

        if (parseResult) output(parseResult);
        window.location.hash = `#${encodeURIComponent(inputNode.value)}`;
    }

    inputNode.addEventListener("input", runParser);

    document.querySelector("#preview-button").addEventListener("click", () => {
        openedWindow = window.open();
        runParser();
    });

    runParser();
});