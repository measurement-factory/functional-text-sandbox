import functionalText from "functional-text";

window.addEventListener("DOMContentLoaded", function () {
    let inputNode = document.querySelector("#input");
    let outputHtmlNode = document.querySelector("#output-html");

    let str = `Sample Text for parsing`.trim();

    inputNode.value = str;
    inputNode.style.height = '200px';
    inputNode.style.width = '100%';

    function runParser() {
        let parsedHtml = functionalText(inputNode.value);
        outputHtmlNode.innerHTML = parsedHtml.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    inputNode.addEventListener("input", runParser, 200);
    try {
        runParser();
    } catch (err) {
        console.error(err);
    }
});