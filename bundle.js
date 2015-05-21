(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _functionalText = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"functional-text\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _functionalText2 = _interopRequireDefault(_functionalText);
	
	window.addEventListener("DOMContentLoaded", function () {
	    var inputNode = document.querySelector("#input");
	    var outputHtmlNode = document.querySelector("#output-html");
	
	    var str = "Sample Text for parsing".trim();
	
	    inputNode.value = str;
	    inputNode.style.height = "200px";
	    inputNode.style.width = "100%";
	
	    function runParser() {
	        var parsedHtml = (0, _functionalText2["default"])(inputNode.value);
	        outputHtmlNode.innerHTML = parsedHtml.replace(/</g, "&lt;").replace(/>/g, "&gt;");
	    }
	
	    inputNode.addEventListener("input", runParser, 200);
	    try {
	        runParser();
	    } catch (err) {
	        console.error(err);
	    }
	});

/***/ }
/******/ ])
});
;
//# sourceMappingURL=bundle.js.map