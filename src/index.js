import functionalText from "functional-text";

window.addEventListener("DOMContentLoaded", function () {
    let inputNode = document.querySelector("#input");
    let outputHtmlNode = document.querySelector("#output-html");

    let str = `Sample Text for parsing`.trim();

    inputNode.value = str;
    inputNode.style.height = '200px';
    inputNode.style.width = '100%';

    function runParser() {
        try {
            let parsedHtml = functionalText(inputNode.value);
            outputHtmlNode.style.borderColor = "black";
            outputHtmlNode.innerHTML = parsedHtml.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        } catch (error) {
            outputHtmlNode.style.borderColor = "red";
            outputHtmlNode.innerHTML = error;
        }
    }

    inputNode.addEventListener("input", runParser, 200);
    runParser();
});