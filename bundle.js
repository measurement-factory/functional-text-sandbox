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
	
	var _functionalText = __webpack_require__(50);
	
	var _functionalText2 = _interopRequireDefault(_functionalText);
	
	window.addEventListener("DOMContentLoaded", function () {
	    var inputNode = document.querySelector("#input");
	    var outputHtmlNode = document.querySelector("#output-html");
	
	    var str = window.location.hash.length > 0 ? decodeURIComponent(window.location.hash.substr(1)) : "Sample Text for parsing".trim();
	
	    inputNode.value = str;
	    inputNode.style.height = "200px";
	    inputNode.style.width = "100%";
	
	    var savedLog = console.log.bind(console);
	    console.log = function () {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }
	
	        print.apply(undefined, args);
	        savedLog.apply(undefined, args);
	    };
	
	    function print() {
	        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	            args[_key2] = arguments[_key2];
	        }
	
	        outputHtmlNode.innerHTML += "<div>" + args.join(" ") + "</div>";
	    }
	
	    function runParser() {
	        outputHtmlNode.innerHTML = "";
	
	        try {
	            var parsedHtml = (0, _functionalText2["default"])(inputNode.value);
	            outputHtmlNode.style.borderColor = "black";
	            print(parsedHtml.replace(/</g, "&lt;").replace(/>/g, "&gt;"));
	        } catch (error) {
	            outputHtmlNode.style.borderColor = "red";
	            print(error);
	        }
	
	        window.location.hash = "#" + encodeURIComponent(inputNode.value);
	    }
	
	    inputNode.addEventListener("input", runParser);
	    runParser();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(64)
	  , $def      = __webpack_require__(67)
	  , setProto  = __webpack_require__(80)
	  , $iter     = __webpack_require__(82)
	  , ITERATOR  = __webpack_require__(78)('iterator')
	  , ITER      = __webpack_require__(70).safe('iter')
	  , step      = $iter.step
	  , assert    = __webpack_require__(71)
	  , isObject  = $.isObject
	  , getProto  = $.getProto
	  , $Reflect  = $.g.Reflect
	  , _apply    = Function.apply
	  , assertObject = assert.obj
	  , _isExtensible = Object.isExtensible || $.isObject
	  , _preventExtensions = Object.preventExtensions || $.it
	  // IE TP has broken Reflect.enumerate
	  , buggyEnumerate = !($Reflect && $Reflect.enumerate && ITERATOR in $Reflect.enumerate({}));
	
	function Enumerate(iterated){
	  $.set(this, ITER, {o: iterated, k: undefined, i: 0});
	}
	$iter.create(Enumerate, 'Object', function(){
	  var iter = this[ITER]
	    , keys = iter.k
	    , key;
	  if(keys == undefined){
	    iter.k = keys = [];
	    for(key in iter.o)keys.push(key);
	  }
	  do {
	    if(iter.i >= keys.length)return step(1);
	  } while(!((key = keys[iter.i++]) in iter.o));
	  return step(0, key);
	});
	
	var reflect = {
	  // 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
	  apply: function apply(target, thisArgument, argumentsList){
	    return _apply.call(target, thisArgument, argumentsList);
	  },
	  // 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
	  construct: function construct(target, argumentsList /*, newTarget*/){
	    var proto    = assert.fn(arguments.length < 3 ? target : arguments[2]).prototype
	      , instance = $.create(isObject(proto) ? proto : Object.prototype)
	      , result   = _apply.call(target, instance, argumentsList);
	    return isObject(result) ? result : instance;
	  },
	  // 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
	  defineProperty: function defineProperty(target, propertyKey, attributes){
	    assertObject(target);
	    try {
	      $.setDesc(target, propertyKey, attributes);
	      return true;
	    } catch(e){
	      return false;
	    }
	  },
	  // 26.1.4 Reflect.deleteProperty(target, propertyKey)
	  deleteProperty: function deleteProperty(target, propertyKey){
	    var desc = $.getDesc(assertObject(target), propertyKey);
	    return desc && !desc.configurable ? false : delete target[propertyKey];
	  },
	  // 26.1.6 Reflect.get(target, propertyKey [, receiver])
	  get: function get(target, propertyKey/*, receiver*/){
	    var receiver = arguments.length < 3 ? target : arguments[2]
	      , desc = $.getDesc(assertObject(target), propertyKey), proto;
	    if(desc)return $.has(desc, 'value')
	      ? desc.value
	      : desc.get === undefined
	        ? undefined
	        : desc.get.call(receiver);
	    return isObject(proto = getProto(target))
	      ? get(proto, propertyKey, receiver)
	      : undefined;
	  },
	  // 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
	    return $.getDesc(assertObject(target), propertyKey);
	  },
	  // 26.1.8 Reflect.getPrototypeOf(target)
	  getPrototypeOf: function getPrototypeOf(target){
	    return getProto(assertObject(target));
	  },
	  // 26.1.9 Reflect.has(target, propertyKey)
	  has: function has(target, propertyKey){
	    return propertyKey in target;
	  },
	  // 26.1.10 Reflect.isExtensible(target)
	  isExtensible: function isExtensible(target){
	    return _isExtensible(assertObject(target));
	  },
	  // 26.1.11 Reflect.ownKeys(target)
	  ownKeys: __webpack_require__(96),
	  // 26.1.12 Reflect.preventExtensions(target)
	  preventExtensions: function preventExtensions(target){
	    assertObject(target);
	    try {
	      _preventExtensions(target);
	      return true;
	    } catch(e){
	      return false;
	    }
	  },
	  // 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
	  set: function set(target, propertyKey, V/*, receiver*/){
	    var receiver = arguments.length < 4 ? target : arguments[3]
	      , ownDesc  = $.getDesc(assertObject(target), propertyKey)
	      , existingDescriptor, proto;
	    if(!ownDesc){
	      if(isObject(proto = getProto(target))){
	        return set(proto, propertyKey, V, receiver);
	      }
	      ownDesc = $.desc(0);
	    }
	    if($.has(ownDesc, 'value')){
	      if(ownDesc.writable === false || !isObject(receiver))return false;
	      existingDescriptor = $.getDesc(receiver, propertyKey) || $.desc(0);
	      existingDescriptor.value = V;
	      $.setDesc(receiver, propertyKey, existingDescriptor);
	      return true;
	    }
	    return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
	  }
	};
	// 26.1.14 Reflect.setPrototypeOf(target, proto)
	if(setProto)reflect.setPrototypeOf = function setPrototypeOf(target, proto){
	  setProto.check(target, proto);
	  try {
	    setProto.set(target, proto);
	    return true;
	  } catch(e){
	    return false;
	  }
	};
	
	$def($def.G, {Reflect: {}});
	
	$def($def.S + $def.F * buggyEnumerate, 'Reflect', {
	  // 26.1.5 Reflect.enumerate(target)
	  enumerate: function enumerate(target){
	    return new Enumerate(assertObject(target));
	  }
	});
	
	$def($def.S, 'Reflect', reflect);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var _bind = Function.prototype.bind;
	
	var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	__webpack_require__(7);
	
	var _assert = __webpack_require__(6);
	
	var _assert2 = _interopRequireDefault(_assert);
	
	var _logger = __webpack_require__(5);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	var _functionRegistry = __webpack_require__(4);
	
	var functionRegistry = _interopRequireWildcard(_functionRegistry);
	
	var Boundary = (function () {
	    function Boundary(value) {
	        _classCallCheck(this, Boundary);
	
	        this.value = value;
	        this.name = this.constructor.name;
	    }
	
	    _createClass(Boundary, [{
	        key: "toString",
	        value: function toString() {
	            return "|" + this.value + "|@" + this.name;
	        }
	    }, {
	        key: "reached",
	        value: function reached() {
	            throw new Error("Not implemented by " + this.constructor.name);
	        }
	    }, {
	        key: "isQuote",
	        value: function isQuote() {
	            return /["'`]/.test(this.value);
	        }
	    }]);
	
	    return Boundary;
	})();
	
	var BoundaryDot = (function (_Boundary) {
	    function BoundaryDot() {
	        _classCallCheck(this, BoundaryDot);
	
	        if (_Boundary != null) {
	            _Boundary.apply(this, arguments);
	        }
	    }
	
	    _inherits(BoundaryDot, _Boundary);
	
	    _createClass(BoundaryDot, [{
	        key: "reached",
	        value: function reached() {
	            return true;
	        }
	    }]);
	
	    return BoundaryDot;
	})(Boundary);
	
	var BoundarySpace = (function (_Boundary2) {
	    function BoundarySpace() {
	        _classCallCheck(this, BoundarySpace);
	
	        if (_Boundary2 != null) {
	            _Boundary2.apply(this, arguments);
	        }
	    }
	
	    _inherits(BoundarySpace, _Boundary2);
	
	    _createClass(BoundarySpace, [{
	        key: "reached",
	        value: function reached(inputStream) {
	            return inputStream.atWordBoundary();
	        }
	    }]);
	
	    return BoundarySpace;
	})(Boundary);
	
	var BoundaryLine = (function (_Boundary3) {
	    function BoundaryLine() {
	        _classCallCheck(this, BoundaryLine);
	
	        if (_Boundary3 != null) {
	            _Boundary3.apply(this, arguments);
	        }
	    }
	
	    _inherits(BoundaryLine, _Boundary3);
	
	    _createClass(BoundaryLine, [{
	        key: "reached",
	        value: function reached(inputStream) {
	            return inputStream.sawNewLine();
	        }
	    }]);
	
	    return BoundaryLine;
	})(Boundary);
	
	var BoundaryParagraph = (function (_Boundary4) {
	    function BoundaryParagraph() {
	        _classCallCheck(this, BoundaryParagraph);
	
	        if (_Boundary4 != null) {
	            _Boundary4.apply(this, arguments);
	        }
	    }
	
	    _inherits(BoundaryParagraph, _Boundary4);
	
	    _createClass(BoundaryParagraph, [{
	        key: "reached",
	        value: function reached(inputStream) {
	            return inputStream.sawNewLine() && inputStream.peek().consume(/\n/) || inputStream.atEnd();
	        }
	    }]);
	
	    return BoundaryParagraph;
	})(Boundary);
	
	var BoundaryEOF = (function (_Boundary5) {
	    function BoundaryEOF() {
	        _classCallCheck(this, BoundaryEOF);
	
	        if (_Boundary5 != null) {
	            _Boundary5.apply(this, arguments);
	        }
	    }
	
	    _inherits(BoundaryEOF, _Boundary5);
	
	    _createClass(BoundaryEOF, [{
	        key: "reached",
	        value: function reached(inputStream) {
	            return inputStream.atEnd();
	        }
	    }]);
	
	    return BoundaryEOF;
	})(Boundary);
	
	var BoundaryOther = (function (_Boundary6) {
	    function BoundaryOther() {
	        _classCallCheck(this, BoundaryOther);
	
	        if (_Boundary6 != null) {
	            _Boundary6.apply(this, arguments);
	        }
	    }
	
	    _inherits(BoundaryOther, _Boundary6);
	
	    _createClass(BoundaryOther, [{
	        key: "reached",
	        value: function reached(inputStream) {
	            var Borders = {
	                "{": "}",
	                "[": "]",
	                "<": ">"
	            };
	            var delimiter = Borders[this.value] ? Borders[this.value] : this.value;
	            return inputStream.consume(delimiter);
	        }
	    }]);
	
	    return BoundaryOther;
	})(Boundary);
	
	var ParseItem = (function () {
	    function ParseItem(value) {
	        _classCallCheck(this, ParseItem);
	
	        this.type = this.constructor.name;
	        this.value = value;
	    }
	
	    _createClass(ParseItem, [{
	        key: "toString",
	        value: function toString() {
	            return this.value;
	        }
	    }]);
	
	    return ParseItem;
	})();
	
	exports.ParseItem = ParseItem;
	
	var HTMLOpen = (function (_ParseItem) {
	    function HTMLOpen() {
	        _classCallCheck(this, HTMLOpen);
	
	        if (_ParseItem != null) {
	            _ParseItem.apply(this, arguments);
	        }
	    }
	
	    _inherits(HTMLOpen, _ParseItem);
	
	    return HTMLOpen;
	})(ParseItem);
	
	exports.HTMLOpen = HTMLOpen;
	
	var HTMLClose = (function (_ParseItem2) {
	    function HTMLClose(value) {
	        _classCallCheck(this, HTMLClose);
	
	        _get(Object.getPrototypeOf(HTMLClose.prototype), "constructor", this).call(this);
	        this.value = "</" + value + ">";
	    }
	
	    _inherits(HTMLClose, _ParseItem2);
	
	    return HTMLClose;
	})(ParseItem);
	
	exports.HTMLClose = HTMLClose;
	
	var PlainText = (function (_ParseItem3) {
	    function PlainText() {
	        _classCallCheck(this, PlainText);
	
	        if (_ParseItem3 != null) {
	            _ParseItem3.apply(this, arguments);
	        }
	    }
	
	    _inherits(PlainText, _ParseItem3);
	
	    return PlainText;
	})(ParseItem);
	
	exports.PlainText = PlainText;
	
	var Parsed = (function () {
	    function Parsed() {
	        for (var _len = arguments.length, items = Array(_len), _key = 0; _key < _len; _key++) {
	            items[_key] = arguments[_key];
	        }
	
	        _classCallCheck(this, Parsed);
	
	        this.items = items;
	    }
	
	    _createClass(Parsed, [{
	        key: "push",
	        value: function push() {
	            var _items;
	
	            for (var _len2 = arguments.length, items = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	                items[_key2] = arguments[_key2];
	            }
	
	            (_items = this.items).push.apply(_items, items);
	        }
	    }, {
	        key: "toString",
	        value: function toString() {
	            return this.items.join("");
	        }
	    }, {
	        key: Symbol.iterator,
	
	        // allows spreading of Parsed
	        value: function () {
	            return this.items.values();
	        }
	    }]);
	
	    return Parsed;
	})();
	
	exports.Parsed = Parsed;
	
	function tag(callName, args, functionBody) {
	    var htmlArgs = Object.keys(args.byName).map(function (argName) {
	        return "" + argName + "=\"" + args.byName[argName].replace(/"/g, "\"") + "\"";
	    }).join(" ");
	
	    return new (_bind.apply(Parsed, [null].concat([new HTMLOpen("<" + callName + "" + (htmlArgs.length > 0 ? " " : "") + "" + htmlArgs + ">")], _toConsumableArray(functionBody), [new HTMLClose(callName)])))();
	}
	
	var interpretCallId = 0;
	
	var Interpreter = (function () {
	    function Interpreter(inputStream) {
	        _classCallCheck(this, Interpreter);
	
	        this.inputStream = inputStream;
	        this.result = new Parsed();
	    }
	
	    _createClass(Interpreter, [{
	        key: "interpret",
	
	        // Boundary is an optional parameter
	        value: function interpret(boundary) {
	            var _this = this;
	
	            var callFunctions = arguments[1] === undefined ? true : arguments[1];
	
	            interpretCallId++;
	            var myInterpretCallId = interpretCallId;
	            var reachedBoundary = function reachedBoundary() {
	                if (boundary && boundary.reached(_this.inputStream)) {
	                    (0, _logger2["default"])("Reached boundary:", boundary);
	                    return true;
	                } else {
	                    return false;
	                }
	            };
	
	            (0, _logger2["default"])("Started interpret while loop", myInterpretCallId, "with boundary", boundary);
	
	            while (!reachedBoundary()) {
	                (0, _logger2["default"])("\niteration starting: ", myInterpretCallId, "with stream", this.inputStream.id);
	
	                if (this.inputStream.atEnd()) {
	                    if (boundary) this.inputStream.croak("Unbounded function call");
	
	                    break;
	                }
	
	                var peekingStream = this.inputStream.peek();
	                if (callFunctions && peekingStream.consumeFunctionCall()) {
	                    // this is a function call
	
	                    (0, _logger2["default"])("found function call");
	
	                    this.inputStream.sync(peekingStream);
	                    var functionName = this.inputStream.consumed;
	
	                    this.interpretFunctionCall(functionName);
	                }
	                // Just text (one char at a time), not a function call
	                else {
	                    (0, _assert2["default"])(this.inputStream.consumeChar());
	                    this.interpretText(this.inputStream.consumed);
	                }
	
	                (0, _logger2["default"])("iteration ending: ", myInterpretCallId, "with stream", this.inputStream.id, "\n");
	            }
	
	            (0, _logger2["default"])("Finished interpret while loop", myInterpretCallId);
	
	            return this.result;
	        }
	    }, {
	        key: "interpretText",
	        value: function interpretText(char) {
	            (0, _logger2["default"])("Interpret text called with |" + char.replace(/\n/g, "\\n") + "|");
	            this.result.push(new PlainText(char));
	        }
	    }, {
	        key: "callFunction",
	        value: function callFunction(name, boundary, args) {
	            var position = this.inputStream.char;
	            (0, _logger2["default"])("calling " + name + ", with " + boundary);
	            try {
	                var interpreter = new Interpreter(this.inputStream);
	                var functionBody = interpreter.intelligentInterpret(boundary);
	
	                this.result.push(functionRegistry.exists(name) ? functionRegistry.get(name)(name, args, functionBody, interpreter) : tag(name, args, functionBody, interpreter));
	            } catch (e) {
	                console.log("In function " + name + " (started at " + position + "), at " + this.inputStream.char + ":");
	                throw e;
	            }
	        }
	    }, {
	        key: "callFunctionWithBody",
	        value: function callFunctionWithBody(name, args, body) {
	            var position = this.inputStream.char;
	            (0, _logger2["default"])("calling " + name + ", with body: " + body);
	            try {
	                return functionRegistry.exists(name) ? functionRegistry.get(name)(name, args, body, this) : tag(name, args, body, this);
	            } catch (e) {
	                console.log("In function " + name + " (started at " + position + "), at " + this.inputStream.char + ":");
	                throw e;
	            }
	        }
	    }, {
	        key: "consumeBoundary",
	
	        /*
	         * If boundary is consumed, returns Boundary,
	         * otherwise, returns null *without side effects*.
	         */
	        value: function consumeBoundary() {
	            var afterSpace = arguments[0] === undefined ? false : arguments[0];
	
	            var peekingStream = this.inputStream.peek();
	            var boundary = undefined;
	
	            if (!afterSpace && peekingStream.consume(".")) {
	                boundary = new BoundaryDot(peekingStream.consumed);
	            } else if (peekingStream.consume(/\s/)) {
	                boundary = new BoundarySpace(peekingStream.consumed);
	            } else if (!afterSpace && peekingStream.consume(/:+/)) {
	                var consumed = peekingStream.consumed;
	                var colonCount = consumed.length;
	
	                if (!peekingStream.consume(/ |(?:\n)/)) {
	                    peekingStream.croak("':' sequences must end with whitespace");
	                }
	
	                consumed += peekingStream.consumed;
	
	                if (colonCount === 1) {
	                    boundary = new BoundaryLine(consumed);
	                } else if (colonCount === 2) {
	                    boundary = new BoundaryParagraph(consumed);
	                } else if (colonCount === 3) {
	                    boundary = new BoundaryEOF(consumed);
	                } else {
	                    peekingStream.croak("More than three colons in a colon boundary");
	                }
	            } else if (peekingStream.consume(/[{}<>[\]`"'/@#$%|]/)) {
	                if (/}]>/.test(peekingStream.consumed)) {
	                    peekingStream.croak("Prohibited boundary " + peekingStream.consumed);
	                }
	                boundary = new BoundaryOther(peekingStream.consumed);
	            } else {
	                return null;
	            }
	
	            (0, _assert2["default"])(boundary);
	            this.inputStream.sync(peekingStream);
	            return boundary;
	        }
	    }, {
	        key: "parseArgument",
	        value: function parseArgument() {
	            var name = undefined;
	            var value = undefined;
	
	            this.inputStream.consumeOptionalWhitespace();
	            var peekingStream = this.inputStream.peek();
	            if (peekingStream.consumeWord() && peekingStream.consumeOptionalWhitespace() && peekingStream.consume("=")) {
	                // Named argument
	                (0, _assert2["default"])(this.inputStream.consumeWord());
	                name = this.inputStream.consumed;
	
	                (0, _assert2["default"])(this.inputStream.consumeOptionalWhitespace());
	                (0, _assert2["default"])(this.inputStream.consume("="));
	                (0, _assert2["default"])(this.inputStream.consumeOptionalWhitespace());
	            }
	            // else anonymous argument
	
	            // We cannot prohibit empty arguments by checking for input stream
	            // progress
	            var boundary = this.consumeBoundary() || new BoundarySpace(" ");
	
	            var interpreter = new Interpreter(this.inputStream);
	
	            (0, _logger2["default"])("parsing Argument", name);
	            value = interpreter.intelligentInterpret(boundary);
	
	            this.inputStream.consumeOptionalWhitespace();
	
	            return { name: name, value: value };
	        }
	    }, {
	        key: "interpretFunctionCall",
	        value: function interpretFunctionCall(name) {
	            var args = [];
	            args.byName = {};
	
	            if (this.inputStream.consume("(")) {
	                // we have an arguments block in this function
	
	                while (!this.inputStream.consume(")")) {
	                    var argument = this.parseArgument();
	                    args.push(argument);
	                    if (argument.name) args.byName[argument.name] = argument.value;
	
	                    if (this.inputStream.consume(",")) {
	                        continue;
	                    } else if (this.inputStream.consume(")")) {
	                        break;
	                    } else {
	                        this.inputStream.croak("Expecting comma or closing parenthese in an argument list");
	                    }
	                }
	            }
	
	            // Allow a space between the function call and the first boundary:
	            // .foo { } is equivalent to .foo{}
	            (0, _assert2["default"])(this.inputStream.consumeOptionalWhitespace());
	            var whitespaceBoundary = this.inputStream.consumed ? new BoundarySpace(this.inputStream.consumed) : null;
	            var boundary = this.consumeBoundary(this.inputStream.consumed) || whitespaceBoundary;
	
	            if (!boundary) this.inputStream.croak("Missing function call boundary");
	
	            this.callFunction(name, boundary, args);
	            this.inputStream.sawFunctionCall = true;
	        }
	    }, {
	        key: "intelligentInterpret",
	        value: function intelligentInterpret(boundary) {
	            return boundary.isQuote() ? this.interpretFlat(boundary) : this.interpretRecursive(boundary);
	        }
	    }, {
	        key: "interpretRecursive",
	        value: function interpretRecursive(boundary) {
	            return this.interpret(boundary);
	        }
	    }, {
	        key: "interpretFlat",
	        value: function interpretFlat(boundary) {
	            return this.interpret(boundary, false);
	        }
	    }]);
	
	    return Interpreter;
	})();
	
	exports["default"] = Interpreter;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9JbnRlcnByZXRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFBTyxnQkFBZ0I7O3NCQUNOLFFBQVE7Ozs7c0JBQ1QsVUFBVTs7OztnQ0FDUSxvQkFBb0I7O0lBQTFDLGdCQUFnQjs7SUFFdEIsUUFBUTtBQUNDLGFBRFQsUUFBUSxDQUNFLEtBQUssRUFBRTs4QkFEakIsUUFBUTs7QUFFTixZQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUNuQixZQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO0tBQ3JDOztpQkFKQyxRQUFROztlQUtGLG9CQUFHO0FBQ1AseUJBQVcsSUFBSSxDQUFDLEtBQUssVUFBSyxJQUFJLENBQUMsSUFBSSxDQUFHO1NBQ3pDOzs7ZUFDTSxtQkFBRztBQUNOLGtCQUFNLElBQUksS0FBSyx5QkFBdUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUcsQ0FBQztTQUNsRTs7O2VBQ00sbUJBQUc7QUFDTixtQkFBTyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNuQzs7O1dBYkMsUUFBUTs7O0lBZ0JSLFdBQVc7YUFBWCxXQUFXOzhCQUFYLFdBQVc7Ozs7Ozs7Y0FBWCxXQUFXOztpQkFBWCxXQUFXOztlQUNOLG1CQUFHO0FBQ04sbUJBQU8sSUFBSSxDQUFDO1NBQ2Y7OztXQUhDLFdBQVc7R0FBUyxRQUFROztJQU01QixhQUFhO2FBQWIsYUFBYTs4QkFBYixhQUFhOzs7Ozs7O2NBQWIsYUFBYTs7aUJBQWIsYUFBYTs7ZUFDUixpQkFBQyxXQUFXLEVBQUU7QUFDakIsbUJBQU8sV0FBVyxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3ZDOzs7V0FIQyxhQUFhO0dBQVMsUUFBUTs7SUFNOUIsWUFBWTthQUFaLFlBQVk7OEJBQVosWUFBWTs7Ozs7OztjQUFaLFlBQVk7O2lCQUFaLFlBQVk7O2VBQ1As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SSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDOztBQUV4RSxnQkFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3hDLGdCQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7U0FDM0M7OztlQUVtQiw4QkFBQyxRQUFRLEVBQUU7QUFDM0IsbUJBQU8sUUFBUSxDQUFDLE9BQU8sRUFBRSxHQUNyQixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxHQUM1QixJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDekM7OztlQUVpQiw0QkFBQyxRQUFRLEVBQUU7QUFDekIsbUJBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNuQzs7O2VBRVksdUJBQUMsUUFBUSxFQUFFO0FBQ3BCLG1CQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzFDOzs7V0EvTmdCLFdBQVc7OztxQkFBWCxXQUFXIiwiZmlsZSI6IkludGVycHJldGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwiYmFiZWwvcG9seWZpbGxcIjtcbmltcG9ydCBNdXN0IGZyb20gXCJhc3NlcnRcIjtcbmltcG9ydCBsb2cgZnJvbSBcIi4vbG9nZ2VyXCI7XG5pbXBvcnQgKiBhcyBmdW5jdGlvblJlZ2lzdHJ5IGZyb20gXCIuL2Z1bmN0aW9uUmVnaXN0cnlcIjtcblxuY2xhc3MgQm91bmRhcnkge1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5uYW1lID0gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIGB8JHt0aGlzLnZhbHVlfXxAJHt0aGlzLm5hbWV9YDtcbiAgICB9XG4gICAgcmVhY2hlZCgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3QgaW1wbGVtZW50ZWQgYnkgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9YCk7XG4gICAgfVxuICAgIGlzUXVvdGUoKSB7XG4gICAgICAgIHJldHVybiAvW1wiJ2BdLy50ZXN0KHRoaXMudmFsdWUpO1xuICAgIH1cbn1cblxuY2xhc3MgQm91bmRhcnlEb3QgZXh0ZW5kcyBCb3VuZGFyeSB7XG4gICAgcmVhY2hlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuXG5jbGFzcyBCb3VuZGFyeVNwYWNlIGV4dGVuZHMgQm91bmRhcnkge1xuICAgIHJlYWNoZWQoaW5wdXRTdHJlYW0pIHtcbiAgICAgICAgcmV0dXJuIGlucHV0U3RyZWFtLmF0V29yZEJvdW5kYXJ5KCk7XG4gICAgfVxufVxuXG5jbGFzcyBCb3VuZGFyeUxpbmUgZXh0ZW5kcyBCb3VuZGFyeSB7XG4gICAgcmVhY2hlZChpbnB1dFN0cmVhbSkge1xuICAgICAgICByZXR1cm4gaW5wdXRTdHJlYW0uc2F3TmV3TGluZSgpO1xuICAgIH1cbn1cblxuY2xhc3MgQm91bmRhcnlQYXJhZ3JhcGggZXh0ZW5kcyBCb3VuZGFyeSB7XG4gICAgcmVhY2hlZChpbnB1dFN0cmVhbSkge1xuICAgICAgICByZXR1cm4gKGlucHV0U3RyZWFtLnNhd05ld0xpbmUoKSAmJiBpbnB1dFN0cmVhbS5wZWVrKCkuY29uc3VtZSgvXFxuLykpIHx8IGlucHV0U3RyZWFtLmF0RW5kKCk7XG4gICAgfVxufVxuXG5jbGFzcyBCb3VuZGFyeUVPRiBleHRlbmRzIEJvdW5kYXJ5IHtcbiAgICByZWFjaGVkKGlucHV0U3RyZWFtKSB7XG4gICAgICAgIHJldHVybiBpbnB1dFN0cmVhbS5hdEVuZCgpO1xuICAgIH1cbn1cblxuY2xhc3MgQm91bmRhcnlPdGhlciBleHRlbmRzIEJvdW5kYXJ5IHtcbiAgICByZWFjaGVkKGlucHV0U3RyZWFtKSB7XG4gICAgICAgIGNvbnN0IEJvcmRlcnMgPSB7XG4gICAgICAgICAgICAneyc6ICd9JyxcbiAgICAgICAgICAgICdbJzogJ10nLFxuICAgICAgICAgICAgJzwnOiAnPidcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IGRlbGltaXRlciA9IEJvcmRlcnNbdGhpcy52YWx1ZV0gPyBCb3JkZXJzW3RoaXMudmFsdWVdIDogdGhpcy52YWx1ZTtcbiAgICAgICAgcmV0dXJuIGlucHV0U3RyZWFtLmNvbnN1bWUoZGVsaW1pdGVyKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQYXJzZUl0ZW0ge1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlKSB7XG4gICAgICAgIHRoaXMudHlwZSA9IHRoaXMuY29uc3RydWN0b3IubmFtZTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgSFRNTE9wZW4gZXh0ZW5kcyBQYXJzZUl0ZW0ge31cbmV4cG9ydCBjbGFzcyBIVE1MQ2xvc2UgZXh0ZW5kcyBQYXJzZUl0ZW0ge1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSBgPC8ke3ZhbHVlfT5gO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBQbGFpblRleHQgZXh0ZW5kcyBQYXJzZUl0ZW0ge31cblxuZXhwb3J0IGNsYXNzIFBhcnNlZCB7XG4gICAgY29uc3RydWN0b3IoLi4uaXRlbXMpIHtcbiAgICAgICAgdGhpcy5pdGVtcyA9IGl0ZW1zO1xuICAgIH1cbiAgICBwdXNoKC4uLml0ZW1zKSB7XG4gICAgICAgIHRoaXMuaXRlbXMucHVzaCguLi5pdGVtcyk7XG4gICAgfVxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtcy5qb2luKFwiXCIpO1xuICAgIH1cblxuICAgIC8vIGFsbG93cyBzcHJlYWRpbmcgb2YgUGFyc2VkXG4gICAgW1N5bWJvbC5pdGVyYXRvcl0oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zLnZhbHVlcygpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gdGFnKGNhbGxOYW1lLCBhcmdzLCBmdW5jdGlvbkJvZHkpIHtcbiAgICBsZXQgaHRtbEFyZ3MgPSBPYmplY3Qua2V5cyhhcmdzLmJ5TmFtZSkubWFwKGFyZ05hbWUgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGAke2FyZ05hbWV9PVwiJHthcmdzLmJ5TmFtZVthcmdOYW1lXS5yZXBsYWNlKC9cIi9nLCBcIlxcXCJcIil9XCJgO1xuICAgICAgICB9KS5qb2luKFwiIFwiKTtcblxuICAgIHJldHVybiBuZXcgUGFyc2VkKFxuICAgICAgICBuZXcgSFRNTE9wZW4oYDwke2NhbGxOYW1lfSR7aHRtbEFyZ3MubGVuZ3RoID4gMCA/IFwiIFwiIDogXCJcIn0ke2h0bWxBcmdzfT5gKSxcbiAgICAgICAgLi4uZnVuY3Rpb25Cb2R5LFxuICAgICAgICBuZXcgSFRNTENsb3NlKGNhbGxOYW1lKVxuICAgICk7XG59XG5cbmxldCBpbnRlcnByZXRDYWxsSWQgPSAwO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50ZXJwcmV0ZXIge1xuICAgIGNvbnN0cnVjdG9yKGlucHV0U3RyZWFtKSB7XG4gICAgICAgIHRoaXMuaW5wdXRTdHJlYW0gPSBpbnB1dFN0cmVhbTtcbiAgICAgICAgdGhpcy5yZXN1bHQgPSBuZXcgUGFyc2VkKCk7XG4gICAgfVxuXG4gICAgLy8gQm91bmRhcnkgaXMgYW4gb3B0aW9uYWwgcGFyYW1ldGVyXG4gICAgaW50ZXJwcmV0KGJvdW5kYXJ5LCBjYWxsRnVuY3Rpb25zID0gdHJ1ZSkge1xuICAgICAgICBpbnRlcnByZXRDYWxsSWQrKztcbiAgICAgICAgbGV0IG15SW50ZXJwcmV0Q2FsbElkID0gaW50ZXJwcmV0Q2FsbElkO1xuICAgICAgICBsZXQgcmVhY2hlZEJvdW5kYXJ5ID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGJvdW5kYXJ5ICYmIGJvdW5kYXJ5LnJlYWNoZWQodGhpcy5pbnB1dFN0cmVhbSkpIHtcbiAgICAgICAgICAgICAgICBsb2coXCJSZWFjaGVkIGJvdW5kYXJ5OlwiLCBib3VuZGFyeSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBsb2coXCJTdGFydGVkIGludGVycHJldCB3aGlsZSBsb29wXCIsIG15SW50ZXJwcmV0Q2FsbElkLCBcIndpdGggYm91bmRhcnlcIiwgYm91bmRhcnkpO1xuXG4gICAgICAgIHdoaWxlICghcmVhY2hlZEJvdW5kYXJ5KCkpIHtcbiAgICAgICAgICAgIGxvZyhcIlxcbml0ZXJhdGlvbiBzdGFydGluZzogXCIsIG15SW50ZXJwcmV0Q2FsbElkLCBcIndpdGggc3RyZWFtXCIsIHRoaXMuaW5wdXRTdHJlYW0uaWQpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5pbnB1dFN0cmVhbS5hdEVuZCgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGJvdW5kYXJ5KSB0aGlzLmlucHV0U3RyZWFtLmNyb2FrKFwiVW5ib3VuZGVkIGZ1bmN0aW9uIGNhbGxcIik7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHBlZWtpbmdTdHJlYW0gPSB0aGlzLmlucHV0U3RyZWFtLnBlZWsoKTtcbiAgICAgICAgICAgIGlmIChjYWxsRnVuY3Rpb25zICYmIHBlZWtpbmdTdHJlYW0uY29uc3VtZUZ1bmN0aW9uQ2FsbCgpKSB7XG4gICAgICAgICAgICAgICAgLy8gdGhpcyBpcyBhIGZ1bmN0aW9uIGNhbGxcblxuICAgICAgICAgICAgICAgIGxvZyhcImZvdW5kIGZ1bmN0aW9uIGNhbGxcIik7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0U3RyZWFtLnN5bmMocGVla2luZ1N0cmVhbSk7XG4gICAgICAgICAgICAgICAgY29uc3QgZnVuY3Rpb25OYW1lID0gdGhpcy5pbnB1dFN0cmVhbS5jb25zdW1lZDtcblxuICAgICAgICAgICAgICAgIHRoaXMuaW50ZXJwcmV0RnVuY3Rpb25DYWxsKGZ1bmN0aW9uTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBKdXN0IHRleHQgKG9uZSBjaGFyIGF0IGEgdGltZSksIG5vdCBhIGZ1bmN0aW9uIGNhbGxcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIE11c3QodGhpcy5pbnB1dFN0cmVhbS5jb25zdW1lQ2hhcigpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmludGVycHJldFRleHQodGhpcy5pbnB1dFN0cmVhbS5jb25zdW1lZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxvZyhcIml0ZXJhdGlvbiBlbmRpbmc6IFwiLCBteUludGVycHJldENhbGxJZCwgXCJ3aXRoIHN0cmVhbVwiLCB0aGlzLmlucHV0U3RyZWFtLmlkLCBcIlxcblwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxvZyhcIkZpbmlzaGVkIGludGVycHJldCB3aGlsZSBsb29wXCIsIG15SW50ZXJwcmV0Q2FsbElkKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5yZXN1bHQ7XG4gICAgfVxuXG4gICAgaW50ZXJwcmV0VGV4dChjaGFyKSB7XG4gICAgICAgIGxvZyhgSW50ZXJwcmV0IHRleHQgY2FsbGVkIHdpdGggfCR7Y2hhci5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKX18YCk7XG4gICAgICAgIHRoaXMucmVzdWx0LnB1c2gobmV3IFBsYWluVGV4dChjaGFyKSk7XG4gICAgfVxuXG4gICAgY2FsbEZ1bmN0aW9uKG5hbWUsIGJvdW5kYXJ5LCBhcmdzKSB7XG4gICAgICAgIGxldCBwb3NpdGlvbiA9IHRoaXMuaW5wdXRTdHJlYW0uY2hhcjtcbiAgICAgICAgbG9nKGBjYWxsaW5nICR7bmFtZX0sIHdpdGggJHtib3VuZGFyeX1gKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBpbnRlcnByZXRlciA9IG5ldyBJbnRlcnByZXRlcih0aGlzLmlucHV0U3RyZWFtKTtcbiAgICAgICAgICAgIGxldCBmdW5jdGlvbkJvZHkgPSBpbnRlcnByZXRlci5pbnRlbGxpZ2VudEludGVycHJldChib3VuZGFyeSk7XG5cbiAgICAgICAgICAgIHRoaXMucmVzdWx0LnB1c2goZnVuY3Rpb25SZWdpc3RyeS5leGlzdHMobmFtZSkgP1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uUmVnaXN0cnkuZ2V0KG5hbWUpKG5hbWUsIGFyZ3MsIGZ1bmN0aW9uQm9keSwgaW50ZXJwcmV0ZXIpIDpcbiAgICAgICAgICAgICAgICB0YWcobmFtZSwgYXJncywgZnVuY3Rpb25Cb2R5LCBpbnRlcnByZXRlcikpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgSW4gZnVuY3Rpb24gJHtuYW1lfSAoc3RhcnRlZCBhdCAke3Bvc2l0aW9ufSksIGF0ICR7dGhpcy5pbnB1dFN0cmVhbS5jaGFyfTpgKTtcbiAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYWxsRnVuY3Rpb25XaXRoQm9keShuYW1lLCBhcmdzLCBib2R5KSB7XG4gICAgICAgIGxldCBwb3NpdGlvbiA9IHRoaXMuaW5wdXRTdHJlYW0uY2hhcjtcbiAgICAgICAgbG9nKGBjYWxsaW5nICR7bmFtZX0sIHdpdGggYm9keTogJHtib2R5fWApO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uUmVnaXN0cnkuZXhpc3RzKG5hbWUpID9cbiAgICAgICAgICAgICAgICBmdW5jdGlvblJlZ2lzdHJ5LmdldChuYW1lKShuYW1lLCBhcmdzLCBib2R5LCB0aGlzKSA6XG4gICAgICAgICAgICAgICAgdGFnKG5hbWUsIGFyZ3MsIGJvZHksIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgSW4gZnVuY3Rpb24gJHtuYW1lfSAoc3RhcnRlZCBhdCAke3Bvc2l0aW9ufSksIGF0ICR7dGhpcy5pbnB1dFN0cmVhbS5jaGFyfTpgKTtcbiAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKlxuICAgICAqIElmIGJvdW5kYXJ5IGlzIGNvbnN1bWVkLCByZXR1cm5zIEJvdW5kYXJ5LFxuICAgICAqIG90aGVyd2lzZSwgcmV0dXJucyBudWxsICp3aXRob3V0IHNpZGUgZWZmZWN0cyouXG4gICAgICovXG4gICAgY29uc3VtZUJvdW5kYXJ5KGFmdGVyU3BhY2UgPSBmYWxzZSkge1xuICAgICAgICBsZXQgcGVla2luZ1N0cmVhbSA9IHRoaXMuaW5wdXRTdHJlYW0ucGVlaygpO1xuICAgICAgICBsZXQgYm91bmRhcnk7XG5cbiAgICAgICAgaWYgKCFhZnRlclNwYWNlICYmIHBlZWtpbmdTdHJlYW0uY29uc3VtZShcIi5cIikpIHtcbiAgICAgICAgICAgIGJvdW5kYXJ5ID0gbmV3IEJvdW5kYXJ5RG90KHBlZWtpbmdTdHJlYW0uY29uc3VtZWQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHBlZWtpbmdTdHJlYW0uY29uc3VtZSgvXFxzLykpIHtcbiAgICAgICAgICAgIGJvdW5kYXJ5ID0gbmV3IEJvdW5kYXJ5U3BhY2UocGVla2luZ1N0cmVhbS5jb25zdW1lZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIWFmdGVyU3BhY2UgJiYgcGVla2luZ1N0cmVhbS5jb25zdW1lKC86Ky8pKSB7XG4gICAgICAgICAgICBsZXQgY29uc3VtZWQgPSBwZWVraW5nU3RyZWFtLmNvbnN1bWVkO1xuICAgICAgICAgICAgbGV0IGNvbG9uQ291bnQgPSBjb25zdW1lZC5sZW5ndGg7XG5cbiAgICAgICAgICAgIGlmICghcGVla2luZ1N0cmVhbS5jb25zdW1lKC8gfCg/OlxcbikvKSkge1xuICAgICAgICAgICAgICAgIHBlZWtpbmdTdHJlYW0uY3JvYWsoXCInOicgc2VxdWVuY2VzIG11c3QgZW5kIHdpdGggd2hpdGVzcGFjZVwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3VtZWQgKz0gcGVla2luZ1N0cmVhbS5jb25zdW1lZDtcblxuICAgICAgICAgICAgaWYgKGNvbG9uQ291bnQgPT09IDEpIHtcbiAgICAgICAgICAgICAgICBib3VuZGFyeSA9IG5ldyBCb3VuZGFyeUxpbmUoY29uc3VtZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY29sb25Db3VudCA9PT0gMikge1xuICAgICAgICAgICAgICAgIGJvdW5kYXJ5ID0gbmV3IEJvdW5kYXJ5UGFyYWdyYXBoKGNvbnN1bWVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbG9uQ291bnQgPT09IDMpIHtcbiAgICAgICAgICAgICAgICBib3VuZGFyeSA9IG5ldyBCb3VuZGFyeUVPRihjb25zdW1lZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBwZWVraW5nU3RyZWFtLmNyb2FrKFwiTW9yZSB0aGFuIHRocmVlIGNvbG9ucyBpbiBhIGNvbG9uIGJvdW5kYXJ5XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHBlZWtpbmdTdHJlYW0uY29uc3VtZSgvW3t9PD5bXFxdYFwiJy9AIyQlfF0vKSkge1xuICAgICAgICAgICAgaWYgKC99XT4vLnRlc3QocGVla2luZ1N0cmVhbS5jb25zdW1lZCkpIHtcbiAgICAgICAgICAgICAgICBwZWVraW5nU3RyZWFtLmNyb2FrKGBQcm9oaWJpdGVkIGJvdW5kYXJ5ICR7cGVla2luZ1N0cmVhbS5jb25zdW1lZH1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJvdW5kYXJ5ID0gbmV3IEJvdW5kYXJ5T3RoZXIocGVla2luZ1N0cmVhbS5jb25zdW1lZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIE11c3QoYm91bmRhcnkpO1xuICAgICAgICB0aGlzLmlucHV0U3RyZWFtLnN5bmMocGVla2luZ1N0cmVhbSk7XG4gICAgICAgIHJldHVybiBib3VuZGFyeTtcbiAgICB9XG5cbiAgICBwYXJzZUFyZ3VtZW50KCkge1xuICAgICAgICBsZXQgbmFtZTtcbiAgICAgICAgbGV0IHZhbHVlO1xuXG4gICAgICAgIHRoaXMuaW5wdXRTdHJlYW0uY29uc3VtZU9wdGlvbmFsV2hpdGVzcGFjZSgpO1xuICAgICAgICBsZXQgcGVla2luZ1N0cmVhbSA9IHRoaXMuaW5wdXRTdHJlYW0ucGVlaygpO1xuICAgICAgICBpZiAocGVla2luZ1N0cmVhbS5jb25zdW1lV29yZCgpICYmIHBlZWtpbmdTdHJlYW0uY29uc3VtZU9wdGlvbmFsV2hpdGVzcGFjZSgpICYmIHBlZWtpbmdTdHJlYW0uY29uc3VtZShcIj1cIikpIHtcbiAgICAgICAgICAgIC8vIE5hbWVkIGFyZ3VtZW50XG4gICAgICAgICAgICBNdXN0KHRoaXMuaW5wdXRTdHJlYW0uY29uc3VtZVdvcmQoKSk7XG4gICAgICAgICAgICBuYW1lID0gdGhpcy5pbnB1dFN0cmVhbS5jb25zdW1lZDtcblxuICAgICAgICAgICAgTXVzdCh0aGlzLmlucHV0U3RyZWFtLmNvbnN1bWVPcHRpb25hbFdoaXRlc3BhY2UoKSk7XG4gICAgICAgICAgICBNdXN0KHRoaXMuaW5wdXRTdHJlYW0uY29uc3VtZShcIj1cIikpO1xuICAgICAgICAgICAgTXVzdCh0aGlzLmlucHV0U3RyZWFtLmNvbnN1bWVPcHRpb25hbFdoaXRlc3BhY2UoKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZWxzZSBhbm9ueW1vdXMgYXJndW1lbnRcblxuICAgICAgICAvLyBXZSBjYW5ub3QgcHJvaGliaXQgZW1wdHkgYXJndW1lbnRzIGJ5IGNoZWNraW5nIGZvciBpbnB1dCBzdHJlYW1cbiAgICAgICAgLy8gcHJvZ3Jlc3NcbiAgICAgICAgbGV0IGJvdW5kYXJ5ID0gdGhpcy5jb25zdW1lQm91bmRhcnkoKSB8fCBuZXcgQm91bmRhcnlTcGFjZShcIiBcIik7XG5cbiAgICAgICAgbGV0IGludGVycHJldGVyID0gbmV3IEludGVycHJldGVyKHRoaXMuaW5wdXRTdHJlYW0pO1xuXG4gICAgICAgIGxvZyhcInBhcnNpbmcgQXJndW1lbnRcIiwgbmFtZSk7XG4gICAgICAgIHZhbHVlID0gaW50ZXJwcmV0ZXIuaW50ZWxsaWdlbnRJbnRlcnByZXQoYm91bmRhcnkpO1xuXG4gICAgICAgIHRoaXMuaW5wdXRTdHJlYW0uY29uc3VtZU9wdGlvbmFsV2hpdGVzcGFjZSgpO1xuXG4gICAgICAgIHJldHVybiB7IG5hbWUsIHZhbHVlIH07XG4gICAgfVxuXG4gICAgaW50ZXJwcmV0RnVuY3Rpb25DYWxsKG5hbWUpIHtcbiAgICAgICAgbGV0IGFyZ3MgPSBbXTtcbiAgICAgICAgYXJncy5ieU5hbWUgPSB7fTtcblxuICAgICAgICBpZiAodGhpcy5pbnB1dFN0cmVhbS5jb25zdW1lKFwiKFwiKSkge1xuICAgICAgICAgICAgLy8gd2UgaGF2ZSBhbiBhcmd1bWVudHMgYmxvY2sgaW4gdGhpcyBmdW5jdGlvblxuXG4gICAgICAgICAgICB3aGlsZSAoIXRoaXMuaW5wdXRTdHJlYW0uY29uc3VtZShcIilcIikpIHtcbiAgICAgICAgICAgICAgICBsZXQgYXJndW1lbnQgPSB0aGlzLnBhcnNlQXJndW1lbnQoKTtcbiAgICAgICAgICAgICAgICBhcmdzLnB1c2goYXJndW1lbnQpO1xuICAgICAgICAgICAgICAgIGlmIChhcmd1bWVudC5uYW1lKSBhcmdzLmJ5TmFtZVthcmd1bWVudC5uYW1lXSA9IGFyZ3VtZW50LnZhbHVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaW5wdXRTdHJlYW0uY29uc3VtZShcIixcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaW5wdXRTdHJlYW0uY29uc3VtZShcIilcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlucHV0U3RyZWFtLmNyb2FrKFwiRXhwZWN0aW5nIGNvbW1hIG9yIGNsb3NpbmcgcGFyZW50aGVzZSBpbiBhbiBhcmd1bWVudCBsaXN0XCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFsbG93IGEgc3BhY2UgYmV0d2VlbiB0aGUgZnVuY3Rpb24gY2FsbCBhbmQgdGhlIGZpcnN0IGJvdW5kYXJ5OlxuICAgICAgICAvLyAuZm9vIHsgfSBpcyBlcXVpdmFsZW50IHRvIC5mb297fVxuICAgICAgICBNdXN0KHRoaXMuaW5wdXRTdHJlYW0uY29uc3VtZU9wdGlvbmFsV2hpdGVzcGFjZSgpKTtcbiAgICAgICAgbGV0IHdoaXRlc3BhY2VCb3VuZGFyeSA9IHRoaXMuaW5wdXRTdHJlYW0uY29uc3VtZWQgP1xuICAgICAgICAgICAgbmV3IEJvdW5kYXJ5U3BhY2UodGhpcy5pbnB1dFN0cmVhbS5jb25zdW1lZCkgOiBudWxsO1xuICAgICAgICBsZXQgYm91bmRhcnkgPSB0aGlzLmNvbnN1bWVCb3VuZGFyeSh0aGlzLmlucHV0U3RyZWFtLmNvbnN1bWVkKSB8fCB3aGl0ZXNwYWNlQm91bmRhcnk7XG5cbiAgICAgICAgaWYgKCFib3VuZGFyeSkgdGhpcy5pbnB1dFN0cmVhbS5jcm9hayhcIk1pc3NpbmcgZnVuY3Rpb24gY2FsbCBib3VuZGFyeVwiKTtcblxuICAgICAgICB0aGlzLmNhbGxGdW5jdGlvbihuYW1lLCBib3VuZGFyeSwgYXJncyk7XG4gICAgICAgIHRoaXMuaW5wdXRTdHJlYW0uc2F3RnVuY3Rpb25DYWxsID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpbnRlbGxpZ2VudEludGVycHJldChib3VuZGFyeSkge1xuICAgICAgICByZXR1cm4gYm91bmRhcnkuaXNRdW90ZSgpID9cbiAgICAgICAgICAgIHRoaXMuaW50ZXJwcmV0RmxhdChib3VuZGFyeSkgOlxuICAgICAgICAgICAgdGhpcy5pbnRlcnByZXRSZWN1cnNpdmUoYm91bmRhcnkpO1xuICAgIH1cblxuICAgIGludGVycHJldFJlY3Vyc2l2ZShib3VuZGFyeSkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnRlcnByZXQoYm91bmRhcnkpO1xuICAgIH1cblxuICAgIGludGVycHJldEZsYXQoYm91bmRhcnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW50ZXJwcmV0KGJvdW5kYXJ5LCBmYWxzZSk7XG4gICAgfVxufSJdfQ==

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	__webpack_require__(7);
	
	var _logger = __webpack_require__(5);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	var id = 0;
	
	var InputStream = (function () {
	    /// XXX: Should have a context (file/function+pos)
	
	    function InputStream(input) {
	        _classCallCheck(this, InputStream);
	
	        this.input = input;
	        this.char = 0;
	        this.line = 1;
	        this.col = 0;
	        this.consumed = null;
	        this.id = id;
	        this.sawFunctionCall = false;
	
	        id++;
	    }
	
	    _createClass(InputStream, [{
	        key: "clone",
	        value: function clone() {
	            var copy = new InputStream(this.input);
	            this._log("cloning to", copy.id);
	            copy.input = this.input;
	            copy.char = this.char;
	            copy.line = this.line;
	            copy.col = this.col;
	            copy.consumed = this.consumed;
	            copy.sawFunctionCall = this.sawFunctionCall;
	
	            return copy;
	        }
	    }, {
	        key: "_incrementHumanizedPosition",
	        value: function _incrementHumanizedPosition() {
	            var _this = this;
	
	            this.consumed.split("").forEach(function (ch) {
	                // log(`${this._clonePrint()}iHP: incremented over "${ch}"`);
	                if (ch === "\n") {
	                    _this.line++;
	                    _this.col = 0;
	                } else {
	                    _this.col++;
	                }
	            });
	        }
	    }, {
	        key: "_log",
	        value: function _log() {
	            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                args[_key] = arguments[_key];
	            }
	
	            _logger2["default"].apply(undefined, ["Stream " + this.id + " at " + this.char + "/" + this.input.length].concat(args));
	        }
	    }, {
	        key: "consume",
	        value: function consume(condition) {
	            this.consumed = null;
	
	            if (this.atEnd()) return false;
	
	            if (typeof condition === "string") {
	                if (this.input.startsWith(condition, this.char)) {
	                    // Starts with the condition
	                    this._log("consumed \"" + condition + "\" with \"" + condition + "\"");
	                    this.char += condition.length;
	                    this.consumed = condition;
	                    this._incrementHumanizedPosition();
	                    this.sawFunctionCall = false;
	                    return true;
	                } else {
	                    return false;
	                }
	            } else {
	                // Assume that it is a regex
	                // Will return even when the regex is empty (empty string match)
	                var result = condition.exec(this.input.slice(this.char));
	                if (result && result.index === 0) {
	                    this._log("consumed \"" + result[0].replace(/\n/g, "\\n") + "\" with " + condition);
	                    this.char += result[0].length; // the length of the match
	                    this.consumed = result[0];
	                    this._incrementHumanizedPosition();
	                    this.sawFunctionCall = false;
	                    return true;
	                } else {
	                    return false;
	                }
	            }
	        }
	    }, {
	        key: "sync",
	        value: function sync(other) {
	            this._log("syncing with", other.id);
	            this.input = other.input;
	            this.char = other.char;
	            this.line = other.line;
	            this.col = other.col;
	            this.consumed = other.consumed;
	            this.sawFunctionCall = other.sawFunctionCall;
	        }
	    }, {
	        key: "peek",
	        value: function peek() {
	            return this.clone();
	        }
	    }, {
	        key: "croak",
	        value: function croak(msg) {
	            throw new Error("" + msg + " at " + this.line + ":" + this.col + " (" + this.char + ")");
	        }
	    }, {
	        key: "sawNewLine",
	        value: function sawNewLine() {
	            return this.consumed && this.consumed.endsWith("\n") || this.atEnd();
	        }
	    }, {
	        key: "consumeFunctionCall",
	        value: function consumeFunctionCall() {
	            return this.consumeDot() && this.consumeWord();
	        }
	    }, {
	        key: "consumeDot",
	        value: function consumeDot() {
	            return this.consume(".");
	        }
	    }, {
	        key: "consumeWhitespace",
	        value: function consumeWhitespace() {
	            return this.consume(/\s+/);
	        }
	    }, {
	        key: "consumeOptionalWhitespace",
	        value: function consumeOptionalWhitespace() {
	            return this.consumeWhitespace() || true;
	        }
	    }, {
	        key: "consumeWord",
	        value: function consumeWord() {
	            return this.consume(/\w+/);
	        }
	    }, {
	        key: "consumeChar",
	        value: function consumeChar() {
	            return this.consume(/[\W\S]/);
	        }
	    }, {
	        key: "consumeOther",
	        value: function consumeOther() {
	            return this.consumeChar(); // TODO: Optimize: consume more?
	        }
	    }, {
	        key: "atWordBoundary",
	        value: function atWordBoundary() {
	            if (this.sawFunctionCall) return true;
	            var peekingStream = this.peek();
	            return !peekingStream.consumeFunctionCall() && peekingStream.consume(/\W/) || this.atEnd();
	        }
	    }, {
	        key: "atEnd",
	        value: function atEnd() {
	            return this.char >= this.input.length;
	        }
	    }]);
	
	    return InputStream;
	})();
	
	exports["default"] = InputStream;
	module.exports = exports["default"];
	//# sourceMappingURL=data:application/json;base64,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QyxtQkFBTyxBQUFDLENBQUMsYUFBYSxDQUFDLG1CQUFtQixFQUFFLElBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDaEc7OztlQUNJLGlCQUFHO0FBQ0osbUJBQU8sSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztTQUN6Qzs7O1dBbkhnQixXQUFXOzs7cUJBQVgsV0FBVyIsImZpbGUiOiJJbnB1dFN0cmVhbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcImJhYmVsL3BvbHlmaWxsXCI7XG5pbXBvcnQgbG9nIGZyb20gXCIuL2xvZ2dlclwiO1xuXG5sZXQgaWQgPSAwO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5wdXRTdHJlYW0geyAvLy8gWFhYOiBTaG91bGQgaGF2ZSBhIGNvbnRleHQgKGZpbGUvZnVuY3Rpb24rcG9zKVxuICAgIGNvbnN0cnVjdG9yKGlucHV0KSB7XG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcbiAgICAgICAgdGhpcy5jaGFyID0gMDtcbiAgICAgICAgdGhpcy5saW5lID0gMTtcbiAgICAgICAgdGhpcy5jb2wgPSAwO1xuICAgICAgICB0aGlzLmNvbnN1bWVkID0gbnVsbDtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLnNhd0Z1bmN0aW9uQ2FsbCA9IGZhbHNlO1xuXG4gICAgICAgIGlkKys7XG4gICAgfVxuICAgIGNsb25lKCkge1xuICAgICAgICBsZXQgY29weSA9IG5ldyBJbnB1dFN0cmVhbSh0aGlzLmlucHV0KTtcbiAgICAgICAgdGhpcy5fbG9nKFwiY2xvbmluZyB0b1wiLCBjb3B5LmlkKTtcbiAgICAgICAgY29weS5pbnB1dCA9IHRoaXMuaW5wdXQ7XG4gICAgICAgIGNvcHkuY2hhciA9IHRoaXMuY2hhcjtcbiAgICAgICAgY29weS5saW5lID0gdGhpcy5saW5lO1xuICAgICAgICBjb3B5LmNvbCA9IHRoaXMuY29sO1xuICAgICAgICBjb3B5LmNvbnN1bWVkID0gdGhpcy5jb25zdW1lZDtcbiAgICAgICAgY29weS5zYXdGdW5jdGlvbkNhbGwgPSB0aGlzLnNhd0Z1bmN0aW9uQ2FsbDtcblxuICAgICAgICByZXR1cm4gY29weTtcbiAgICB9XG4gICAgX2luY3JlbWVudEh1bWFuaXplZFBvc2l0aW9uKCkge1xuICAgICAgICB0aGlzLmNvbnN1bWVkLnNwbGl0KFwiXCIpLmZvckVhY2goY2ggPT4ge1xuICAgICAgICAgICAgLy8gbG9nKGAke3RoaXMuX2Nsb25lUHJpbnQoKX1pSFA6IGluY3JlbWVudGVkIG92ZXIgXCIke2NofVwiYCk7XG4gICAgICAgICAgICBpZiAoY2ggPT09IFwiXFxuXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmUrKztcbiAgICAgICAgICAgICAgICB0aGlzLmNvbCA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY29sKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfbG9nKC4uLmFyZ3MpIHtcbiAgICAgICAgbG9nKGBTdHJlYW0gJHt0aGlzLmlkfSBhdCAke3RoaXMuY2hhcn0vJHt0aGlzLmlucHV0Lmxlbmd0aH1gLCAuLi5hcmdzKTtcbiAgICB9XG4gICAgY29uc3VtZShjb25kaXRpb24pIHtcbiAgICAgICAgdGhpcy5jb25zdW1lZCA9IG51bGw7XG5cbiAgICAgICAgaWYgKHRoaXMuYXRFbmQoKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29uZGl0aW9uID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pbnB1dC5zdGFydHNXaXRoKGNvbmRpdGlvbiwgdGhpcy5jaGFyKSkgeyAvLyBTdGFydHMgd2l0aCB0aGUgY29uZGl0aW9uXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9nKGBjb25zdW1lZCBcIiR7Y29uZGl0aW9ufVwiIHdpdGggXCIke2NvbmRpdGlvbn1cImApO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhciArPSBjb25kaXRpb24ubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHRoaXMuY29uc3VtZWQgPSBjb25kaXRpb247XG4gICAgICAgICAgICAgICAgdGhpcy5faW5jcmVtZW50SHVtYW5pemVkUG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNhd0Z1bmN0aW9uQ2FsbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7IC8vIEFzc3VtZSB0aGF0IGl0IGlzIGEgcmVnZXhcbiAgICAgICAgICAgIC8vIFdpbGwgcmV0dXJuIGV2ZW4gd2hlbiB0aGUgcmVnZXggaXMgZW1wdHkgKGVtcHR5IHN0cmluZyBtYXRjaClcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBjb25kaXRpb24uZXhlYyh0aGlzLmlucHV0LnNsaWNlKHRoaXMuY2hhcikpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCAmJiByZXN1bHQuaW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2coYGNvbnN1bWVkIFwiJHtyZXN1bHRbMF0ucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIil9XCIgd2l0aCAke2NvbmRpdGlvbn1gKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYXIgKz0gcmVzdWx0WzBdLmxlbmd0aDsgLy8gdGhlIGxlbmd0aCBvZiB0aGUgbWF0Y2hcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnN1bWVkID0gcmVzdWx0WzBdO1xuICAgICAgICAgICAgICAgIHRoaXMuX2luY3JlbWVudEh1bWFuaXplZFBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zYXdGdW5jdGlvbkNhbGwgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHN5bmMob3RoZXIpIHtcbiAgICAgICAgdGhpcy5fbG9nKFwic3luY2luZyB3aXRoXCIsIG90aGVyLmlkKTtcbiAgICAgICAgdGhpcy5pbnB1dCA9IG90aGVyLmlucHV0O1xuICAgICAgICB0aGlzLmNoYXIgPSBvdGhlci5jaGFyO1xuICAgICAgICB0aGlzLmxpbmUgPSBvdGhlci5saW5lO1xuICAgICAgICB0aGlzLmNvbCA9IG90aGVyLmNvbDtcbiAgICAgICAgdGhpcy5jb25zdW1lZCA9IG90aGVyLmNvbnN1bWVkO1xuICAgICAgICB0aGlzLnNhd0Z1bmN0aW9uQ2FsbCA9IG90aGVyLnNhd0Z1bmN0aW9uQ2FsbDtcbiAgICB9XG4gICAgcGVlaygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoKTtcbiAgICB9XG4gICAgY3JvYWsobXNnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgJHttc2d9IGF0ICR7dGhpcy5saW5lfToke3RoaXMuY29sfSAoJHt0aGlzLmNoYXJ9KWApO1xuICAgIH1cbiAgICBzYXdOZXdMaW5lKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuY29uc3VtZWQgJiYgdGhpcy5jb25zdW1lZC5lbmRzV2l0aChcIlxcblwiKSkgfHwgdGhpcy5hdEVuZCgpO1xuICAgIH1cbiAgICBjb25zdW1lRnVuY3Rpb25DYWxsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25zdW1lRG90KCkgJiYgdGhpcy5jb25zdW1lV29yZCgpO1xuICAgIH1cbiAgICBjb25zdW1lRG90KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25zdW1lKFwiLlwiKTtcbiAgICB9XG4gICAgY29uc3VtZVdoaXRlc3BhY2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnN1bWUoL1xccysvKTtcbiAgICB9XG4gICAgY29uc3VtZU9wdGlvbmFsV2hpdGVzcGFjZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uc3VtZVdoaXRlc3BhY2UoKSB8fCB0cnVlO1xuICAgIH1cbiAgICBjb25zdW1lV29yZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uc3VtZSgvXFx3Ky8pO1xuICAgIH1cbiAgICBjb25zdW1lQ2hhcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uc3VtZSgvW1xcV1xcU10vKTtcbiAgICB9XG4gICAgY29uc3VtZU90aGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25zdW1lQ2hhcigpOyAvLyBUT0RPOiBPcHRpbWl6ZTogY29uc3VtZSBtb3JlP1xuICAgIH1cbiAgICBhdFdvcmRCb3VuZGFyeSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2F3RnVuY3Rpb25DYWxsKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgbGV0IHBlZWtpbmdTdHJlYW0gPSB0aGlzLnBlZWsoKTtcbiAgICAgICAgcmV0dXJuICghcGVla2luZ1N0cmVhbS5jb25zdW1lRnVuY3Rpb25DYWxsKCkgJiYgcGVla2luZ1N0cmVhbS5jb25zdW1lKC9cXFcvKSkgfHwgdGhpcy5hdEVuZCgpO1xuICAgIH1cbiAgICBhdEVuZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhciA+PSB0aGlzLmlucHV0Lmxlbmd0aDtcbiAgICB9XG59Il19

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.register = register;
	exports.get = get;
	exports.exists = exists;
	var functions = {};
	
	function register(name, func) {
	    if (functions[name]) throw new Error("Already registered " + name);
	    functions[name] = func;
	}
	
	function get(name) {
	    if (!functions[name]) throw new Error("Getting unregistered function");
	    return functions[name];
	}
	
	function exists(name) {
	    return functions[name] !== undefined;
	}
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9mdW5jdGlvblJlZ2lzdHJ5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O1FBQ2dCLFFBQVEsR0FBUixRQUFRO1FBS1IsR0FBRyxHQUFILEdBQUc7UUFLSCxNQUFNLEdBQU4sTUFBTTtBQVh0QixJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7O0FBQ1osU0FBUyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRTtBQUNqQyxRQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ25FLGFBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7Q0FDMUI7O0FBRU0sU0FBUyxHQUFHLENBQUMsSUFBSSxFQUFFO0FBQ3RCLFFBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0FBQ3ZFLFdBQU8sU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQzFCOztBQUVNLFNBQVMsTUFBTSxDQUFDLElBQUksRUFBRTtBQUN6QixXQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxTQUFTLENBQUM7Q0FDeEMiLCJmaWxlIjoiZnVuY3Rpb25SZWdpc3RyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCBmdW5jdGlvbnMgPSB7fTtcbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlcihuYW1lLCBmdW5jKSB7XG4gICAgaWYgKGZ1bmN0aW9uc1tuYW1lXSkgdGhyb3cgbmV3IEVycm9yKFwiQWxyZWFkeSByZWdpc3RlcmVkIFwiICsgbmFtZSk7XG4gICAgZnVuY3Rpb25zW25hbWVdID0gZnVuYztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldChuYW1lKSB7XG4gICAgaWYgKCFmdW5jdGlvbnNbbmFtZV0pIHRocm93IG5ldyBFcnJvcihcIkdldHRpbmcgdW5yZWdpc3RlcmVkIGZ1bmN0aW9uXCIpO1xuICAgIHJldHVybiBmdW5jdGlvbnNbbmFtZV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleGlzdHMobmFtZSkge1xuICAgIHJldHVybiBmdW5jdGlvbnNbbmFtZV0gIT09IHVuZGVmaW5lZDtcbn0iXX0=

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*eslint-env node*/
	
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = log;
	
	function log() {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	    }
	
	    if (process.env.DEBUG) {
	        var str = args.join(" ");
	        if (str.startsWith("\n")) str = str.slice(1);
	        var date = new Date();
	        var dateStr = "" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "." + date.getMilliseconds();
	        console.log("[ " + dateStr + " ] " + str);
	    }
	}
	
	module.exports = exports["default"];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2dnZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztxQkFFd0IsR0FBRzs7QUFBWixTQUFTLEdBQUcsR0FBVTtzQ0FBTixJQUFJO0FBQUosWUFBSTs7O0FBQy9CLFFBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUU7QUFDbkIsWUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN6QixZQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDN0MsWUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUN0QixZQUFJLE9BQU8sUUFBTSxJQUFJLENBQUMsUUFBUSxFQUFFLFNBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxTQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsU0FBSSxJQUFJLENBQUMsZUFBZSxFQUFFLEFBQUUsQ0FBQztBQUN2RyxlQUFPLENBQUMsR0FBRyxRQUFNLE9BQU8sV0FBTSxHQUFHLENBQUcsQ0FBQztLQUN4QztDQUNKIiwiZmlsZSI6ImxvZ2dlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qZXNsaW50LWVudiBub2RlKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbG9nKC4uLmFyZ3MpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuREVCVUcpIHtcbiAgICAgICAgbGV0IHN0ciA9IGFyZ3Muam9pbihcIiBcIik7XG4gICAgICAgIGlmIChzdHIuc3RhcnRzV2l0aChcIlxcblwiKSkgc3RyID0gc3RyLnNsaWNlKDEpO1xuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGxldCBkYXRlU3RyID0gYCR7ZGF0ZS5nZXRIb3VycygpfToke2RhdGUuZ2V0TWludXRlcygpfToke2RhdGUuZ2V0U2Vjb25kcygpfS4ke2RhdGUuZ2V0TWlsbGlzZWNvbmRzKCl9YDtcbiAgICAgICAgY29uc29sZS5sb2coYFsgJHtkYXRlU3RyfSBdICR7c3RyfWApO1xuICAgIH1cbn0iXX0=
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
	//
	// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
	//
	// Originally from narwhal.js (http://narwhaljs.org)
	// Copyright (c) 2009 Thomas Robinson <280north.com>
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the 'Software'), to
	// deal in the Software without restriction, including without limitation the
	// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
	// sell copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
	// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	// when used in node, this will actually load the util module we depend on
	// versus loading the builtin util module as happens otherwise
	// this is a bug in node module loading as far as I am concerned
	var util = __webpack_require__(9);
	
	var pSlice = Array.prototype.slice;
	var hasOwn = Object.prototype.hasOwnProperty;
	
	// 1. The assert module provides functions that throw
	// AssertionError's when particular conditions are not met. The
	// assert module must conform to the following interface.
	
	var assert = module.exports = ok;
	
	// 2. The AssertionError is defined in assert.
	// new assert.AssertionError({ message: message,
	//                             actual: actual,
	//                             expected: expected })
	
	assert.AssertionError = function AssertionError(options) {
	  this.name = 'AssertionError';
	  this.actual = options.actual;
	  this.expected = options.expected;
	  this.operator = options.operator;
	  if (options.message) {
	    this.message = options.message;
	    this.generatedMessage = false;
	  } else {
	    this.message = getMessage(this);
	    this.generatedMessage = true;
	  }
	  var stackStartFunction = options.stackStartFunction || fail;
	
	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, stackStartFunction);
	  }
	  else {
	    // non v8 browsers so we can have a stacktrace
	    var err = new Error();
	    if (err.stack) {
	      var out = err.stack;
	
	      // try to strip useless frames
	      var fn_name = stackStartFunction.name;
	      var idx = out.indexOf('\n' + fn_name);
	      if (idx >= 0) {
	        // once we have located the function frame
	        // we need to strip out everything before it (and its line)
	        var next_line = out.indexOf('\n', idx + 1);
	        out = out.substring(next_line + 1);
	      }
	
	      this.stack = out;
	    }
	  }
	};
	
	// assert.AssertionError instanceof Error
	util.inherits(assert.AssertionError, Error);
	
	function replacer(key, value) {
	  if (util.isUndefined(value)) {
	    return '' + value;
	  }
	  if (util.isNumber(value) && !isFinite(value)) {
	    return value.toString();
	  }
	  if (util.isFunction(value) || util.isRegExp(value)) {
	    return value.toString();
	  }
	  return value;
	}
	
	function truncate(s, n) {
	  if (util.isString(s)) {
	    return s.length < n ? s : s.slice(0, n);
	  } else {
	    return s;
	  }
	}
	
	function getMessage(self) {
	  return truncate(JSON.stringify(self.actual, replacer), 128) + ' ' +
	         self.operator + ' ' +
	         truncate(JSON.stringify(self.expected, replacer), 128);
	}
	
	// At present only the three keys mentioned above are used and
	// understood by the spec. Implementations or sub modules can pass
	// other keys to the AssertionError's constructor - they will be
	// ignored.
	
	// 3. All of the following functions must throw an AssertionError
	// when a corresponding condition is not met, with a message that
	// may be undefined if not provided.  All assertion methods provide
	// both the actual and expected values to the assertion error for
	// display purposes.
	
	function fail(actual, expected, message, operator, stackStartFunction) {
	  throw new assert.AssertionError({
	    message: message,
	    actual: actual,
	    expected: expected,
	    operator: operator,
	    stackStartFunction: stackStartFunction
	  });
	}
	
	// EXTENSION! allows for well behaved errors defined elsewhere.
	assert.fail = fail;
	
	// 4. Pure assertion tests whether a value is truthy, as determined
	// by !!guard.
	// assert.ok(guard, message_opt);
	// This statement is equivalent to assert.equal(true, !!guard,
	// message_opt);. To test strictly for the value true, use
	// assert.strictEqual(true, guard, message_opt);.
	
	function ok(value, message) {
	  if (!value) fail(value, true, message, '==', assert.ok);
	}
	assert.ok = ok;
	
	// 5. The equality assertion tests shallow, coercive equality with
	// ==.
	// assert.equal(actual, expected, message_opt);
	
	assert.equal = function equal(actual, expected, message) {
	  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
	};
	
	// 6. The non-equality assertion tests for whether two objects are not equal
	// with != assert.notEqual(actual, expected, message_opt);
	
	assert.notEqual = function notEqual(actual, expected, message) {
	  if (actual == expected) {
	    fail(actual, expected, message, '!=', assert.notEqual);
	  }
	};
	
	// 7. The equivalence assertion tests a deep equality relation.
	// assert.deepEqual(actual, expected, message_opt);
	
	assert.deepEqual = function deepEqual(actual, expected, message) {
	  if (!_deepEqual(actual, expected)) {
	    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
	  }
	};
	
	function _deepEqual(actual, expected) {
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;
	
	  } else if (util.isBuffer(actual) && util.isBuffer(expected)) {
	    if (actual.length != expected.length) return false;
	
	    for (var i = 0; i < actual.length; i++) {
	      if (actual[i] !== expected[i]) return false;
	    }
	
	    return true;
	
	  // 7.2. If the expected value is a Date object, the actual value is
	  // equivalent if it is also a Date object that refers to the same time.
	  } else if (util.isDate(actual) && util.isDate(expected)) {
	    return actual.getTime() === expected.getTime();
	
	  // 7.3 If the expected value is a RegExp object, the actual value is
	  // equivalent if it is also a RegExp object with the same source and
	  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
	  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
	    return actual.source === expected.source &&
	           actual.global === expected.global &&
	           actual.multiline === expected.multiline &&
	           actual.lastIndex === expected.lastIndex &&
	           actual.ignoreCase === expected.ignoreCase;
	
	  // 7.4. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if (!util.isObject(actual) && !util.isObject(expected)) {
	    return actual == expected;
	
	  // 7.5 For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else {
	    return objEquiv(actual, expected);
	  }
	}
	
	function isArguments(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	}
	
	function objEquiv(a, b) {
	  if (util.isNullOrUndefined(a) || util.isNullOrUndefined(b))
	    return false;
	  // an identical 'prototype' property.
	  if (a.prototype !== b.prototype) return false;
	  // if one is a primitive, the other must be same
	  if (util.isPrimitive(a) || util.isPrimitive(b)) {
	    return a === b;
	  }
	  var aIsArgs = isArguments(a),
	      bIsArgs = isArguments(b);
	  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
	    return false;
	  if (aIsArgs) {
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return _deepEqual(a, b);
	  }
	  var ka = objectKeys(a),
	      kb = objectKeys(b),
	      key, i;
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length != kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] != kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!_deepEqual(a[key], b[key])) return false;
	  }
	  return true;
	}
	
	// 8. The non-equivalence assertion tests for any deep inequality.
	// assert.notDeepEqual(actual, expected, message_opt);
	
	assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
	  if (_deepEqual(actual, expected)) {
	    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
	  }
	};
	
	// 9. The strict equality assertion tests strict equality, as determined by ===.
	// assert.strictEqual(actual, expected, message_opt);
	
	assert.strictEqual = function strictEqual(actual, expected, message) {
	  if (actual !== expected) {
	    fail(actual, expected, message, '===', assert.strictEqual);
	  }
	};
	
	// 10. The strict non-equality assertion tests for strict inequality, as
	// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);
	
	assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
	  if (actual === expected) {
	    fail(actual, expected, message, '!==', assert.notStrictEqual);
	  }
	};
	
	function expectedException(actual, expected) {
	  if (!actual || !expected) {
	    return false;
	  }
	
	  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
	    return expected.test(actual);
	  } else if (actual instanceof expected) {
	    return true;
	  } else if (expected.call({}, actual) === true) {
	    return true;
	  }
	
	  return false;
	}
	
	function _throws(shouldThrow, block, expected, message) {
	  var actual;
	
	  if (util.isString(expected)) {
	    message = expected;
	    expected = null;
	  }
	
	  try {
	    block();
	  } catch (e) {
	    actual = e;
	  }
	
	  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
	            (message ? ' ' + message : '.');
	
	  if (shouldThrow && !actual) {
	    fail(actual, expected, 'Missing expected exception' + message);
	  }
	
	  if (!shouldThrow && expectedException(actual, expected)) {
	    fail(actual, expected, 'Got unwanted exception' + message);
	  }
	
	  if ((shouldThrow && actual && expected &&
	      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
	    throw actual;
	  }
	}
	
	// 11. Expected to throw an error:
	// assert.throws(block, Error_opt, message_opt);
	
	assert.throws = function(block, /*optional*/error, /*optional*/message) {
	  _throws.apply(this, [true].concat(pSlice.call(arguments)));
	};
	
	// EXTENSION! This is annoying to write outside this module.
	assert.doesNotThrow = function(block, /*optional*/message) {
	  _throws.apply(this, [false].concat(pSlice.call(arguments)));
	};
	
	assert.ifError = function(err) { if (err) {throw err;}};
	
	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) {
	    if (hasOwn.call(obj, key)) keys.push(key);
	  }
	  return keys;
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(10);


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            currentQueue[queueIndex].run();
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }
	
	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};
	
	
	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }
	
	  if (process.noDeprecation === true) {
	    return fn;
	  }
	
	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }
	
	  return deprecated;
	};
	
	
	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};
	
	
	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;
	
	
	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};
	
	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};
	
	
	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];
	
	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}
	
	
	function stylizeNoColor(str, styleType) {
	  return str;
	}
	
	
	function arrayToHash(array) {
	  var hash = {};
	
	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });
	
	  return hash;
	}
	
	
	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }
	
	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }
	
	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);
	
	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }
	
	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }
	
	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }
	
	  var base = '', array = false, braces = ['{', '}'];
	
	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }
	
	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }
	
	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }
	
	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }
	
	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }
	
	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }
	
	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }
	
	  ctx.seen.push(value);
	
	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }
	
	  ctx.seen.pop();
	
	  return reduceToSingleString(output, base, braces);
	}
	
	
	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}
	
	
	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}
	
	
	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}
	
	
	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }
	
	  return name + ': ' + str;
	}
	
	
	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);
	
	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }
	
	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}
	
	
	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;
	
	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;
	
	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;
	
	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;
	
	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;
	
	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;
	
	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;
	
	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;
	
	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;
	
	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;
	
	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;
	
	exports.isBuffer = __webpack_require__(11);
	
	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}
	
	
	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}
	
	
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];
	
	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}
	
	
	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};
	
	
	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(13);
	
	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;
	
	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};
	
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(8)))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(12);


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
	__webpack_require__(14);
	
	__webpack_require__(15);
	
	if (global._babelPolyfill) {
	  throw new Error("only one instance of babel/polyfill is allowed");
	}
	global._babelPolyfill = true;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(16);
	__webpack_require__(17);
	__webpack_require__(18);
	__webpack_require__(19);
	__webpack_require__(20);
	__webpack_require__(21);
	__webpack_require__(22);
	__webpack_require__(23);
	__webpack_require__(24);
	__webpack_require__(25);
	__webpack_require__(26);
	__webpack_require__(27);
	__webpack_require__(28);
	__webpack_require__(29);
	__webpack_require__(30);
	__webpack_require__(31);
	__webpack_require__(32);
	__webpack_require__(33);
	__webpack_require__(34);
	__webpack_require__(35);
	__webpack_require__(36);
	__webpack_require__(37);
	__webpack_require__(38);
	__webpack_require__(39);
	__webpack_require__(40);
	__webpack_require__(41);
	__webpack_require__(42);
	__webpack_require__(43);
	__webpack_require__(44);
	__webpack_require__(45);
	__webpack_require__(46);
	__webpack_require__(47);
	__webpack_require__(48);
	__webpack_require__(49);
	__webpack_require__(1);
	__webpack_require__(51);
	__webpack_require__(52);
	__webpack_require__(53);
	__webpack_require__(54);
	__webpack_require__(55);
	__webpack_require__(56);
	__webpack_require__(57);
	__webpack_require__(58);
	__webpack_require__(59);
	__webpack_require__(60);
	__webpack_require__(61);
	__webpack_require__(62);
	__webpack_require__(63);
	module.exports = __webpack_require__(64).core;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */
	
	!(function(global) {
	  "use strict";
	
	  var hasOwn = Object.prototype.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var iteratorSymbol =
	    typeof Symbol === "function" && Symbol.iterator || "@@iterator";
	
	  var inModule = typeof module === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }
	
	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};
	
	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided, then outerFn.prototype instanceof Generator.
	    var generator = Object.create((outerFn || Generator).prototype);
	
	    generator._invoke = makeInvokeMethod(
	      innerFn, self || null,
	      new Context(tryLocsList || [])
	    );
	
	    return generator;
	  }
	  runtime.wrap = wrap;
	
	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }
	
	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";
	
	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};
	
	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}
	
	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunction.displayName = "GeneratorFunction";
	
	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };
	
	  runtime.mark = function(genFun) {
	    genFun.__proto__ = GeneratorFunctionPrototype;
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };
	
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    return new Promise(function(resolve, reject) {
	      var generator = wrap(innerFn, outerFn, self, tryLocsList);
	      var callNext = step.bind(generator, "next");
	      var callThrow = step.bind(generator, "throw");
	
	      function step(method, arg) {
	        var record = tryCatch(generator[method], generator, arg);
	        if (record.type === "throw") {
	          reject(record.arg);
	          return;
	        }
	
	        var info = record.arg;
	        if (info.done) {
	          resolve(info.value);
	        } else {
	          Promise.resolve(info.value).then(callNext, callThrow);
	        }
	      }
	
	      callNext();
	    });
	  };
	
	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;
	
	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }
	
	      if (state === GenStateCompleted) {
	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }
	
	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          if (method === "return" ||
	              (method === "throw" && delegate.iterator[method] === undefined)) {
	            // A return or throw (when the delegate iterator has no throw
	            // method) always terminates the yield* loop.
	            context.delegate = null;
	
	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            var returnMethod = delegate.iterator["return"];
	            if (returnMethod) {
	              var record = tryCatch(returnMethod, delegate.iterator, arg);
	              if (record.type === "throw") {
	                // If the return method threw an exception, let that
	                // exception prevail over the original return or throw.
	                method = "throw";
	                arg = record.arg;
	                continue;
	              }
	            }
	
	            if (method === "return") {
	              // Continue with the outer return, now that the delegate
	              // iterator has been terminated.
	              continue;
	            }
	          }
	
	          var record = tryCatch(
	            delegate.iterator[method],
	            delegate.iterator,
	            arg
	          );
	
	          if (record.type === "throw") {
	            context.delegate = null;
	
	            // Like returning generator.throw(uncaught), but without the
	            // overhead of an extra function call.
	            method = "throw";
	            arg = record.arg;
	            continue;
	          }
	
	          // Delegate generator ran and handled its own exceptions so
	          // regardless of what the method was, we continue as if it is
	          // "next" with an undefined arg.
	          method = "next";
	          arg = undefined;
	
	          var info = record.arg;
	          if (info.done) {
	            context[delegate.resultName] = info.value;
	            context.next = delegate.nextLoc;
	          } else {
	            state = GenStateSuspendedYield;
	            return info;
	          }
	
	          context.delegate = null;
	        }
	
	        if (method === "next") {
	          if (state === GenStateSuspendedYield) {
	            context.sent = arg;
	          } else {
	            delete context.sent;
	          }
	
	        } else if (method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw arg;
	          }
	
	          if (context.dispatchException(arg)) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            method = "next";
	            arg = undefined;
	          }
	
	        } else if (method === "return") {
	          context.abrupt("return", arg);
	        }
	
	        state = GenStateExecuting;
	
	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;
	
	          var info = {
	            value: record.arg,
	            done: context.done
	          };
	
	          if (record.arg === ContinueSentinel) {
	            if (context.delegate && method === "next") {
	              // Deliberately forget the last sent value so that we don't
	              // accidentally pass it on to the delegate.
	              arg = undefined;
	            }
	          } else {
	            return info;
	          }
	
	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(arg) call above.
	          method = "throw";
	          arg = record.arg;
	        }
	      }
	    };
	  }
	
	  function defineGeneratorMethod(method) {
	    Gp[method] = function(arg) {
	      return this._invoke(method, arg);
	    };
	  }
	  defineGeneratorMethod("next");
	  defineGeneratorMethod("throw");
	  defineGeneratorMethod("return");
	
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };
	
	  Gp.toString = function() {
	    return "[object Generator]";
	  };
	
	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };
	
	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }
	
	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }
	
	    this.tryEntries.push(entry);
	  }
	
	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }
	
	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset();
	  }
	
	  runtime.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();
	
	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }
	
	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };
	
	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }
	
	      if (typeof iterable.next === "function") {
	        return iterable;
	      }
	
	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }
	
	          next.value = undefined;
	          next.done = true;
	
	          return next;
	        };
	
	        return next.next = next;
	      }
	    }
	
	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;
	
	  function doneResult() {
	    return { value: undefined, done: true };
	  }
	
	  Context.prototype = {
	    constructor: Context,
	
	    reset: function() {
	      this.prev = 0;
	      this.next = 0;
	      this.sent = undefined;
	      this.done = false;
	      this.delegate = null;
	
	      this.tryEntries.forEach(resetTryEntry);
	
	      // Pre-initialize at least 20 temporary variables to enable hidden
	      // class optimizations for simple generators.
	      for (var tempIndex = 0, tempName;
	           hasOwn.call(this, tempName = "t" + tempIndex) || tempIndex < 20;
	           ++tempIndex) {
	        this[tempName] = null;
	      }
	    },
	
	    stop: function() {
	      this.done = true;
	
	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }
	
	      return this.rval;
	    },
	
	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }
	
	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;
	        return !!caught;
	      }
	
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;
	
	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }
	
	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");
	
	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	
	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }
	
	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	
	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },
	
	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }
	
	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }
	
	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;
	
	      if (finallyEntry) {
	        this.next = finallyEntry.finallyLoc;
	      } else {
	        this.complete(record);
	      }
	
	      return ContinueSentinel;
	    },
	
	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }
	
	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
	    },
	
	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },
	
	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }
	
	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },
	
	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };
	
	      return ContinueSentinel;
	    }
	  };
	})(
	  // Among the various tricks for obtaining a reference to the global
	  // object, this seems to be the most reliable technique that does not
	  // use indirect eval (which violates Content Security Policy).
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this
	);
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var $                = __webpack_require__(64)
	  , cel              = __webpack_require__(65)
	  , cof              = __webpack_require__(66)
	  , $def             = __webpack_require__(67)
	  , invoke           = __webpack_require__(68)
	  , arrayMethod      = __webpack_require__(69)
	  , IE_PROTO         = __webpack_require__(70).safe('__proto__')
	  , assert           = __webpack_require__(71)
	  , assertObject     = assert.obj
	  , ObjectProto      = Object.prototype
	  , html             = $.html
	  , A                = []
	  , _slice           = A.slice
	  , _join            = A.join
	  , classof          = cof.classof
	  , has              = $.has
	  , defineProperty   = $.setDesc
	  , getOwnDescriptor = $.getDesc
	  , defineProperties = $.setDescs
	  , isFunction       = $.isFunction
	  , toObject         = $.toObject
	  , toLength         = $.toLength
	  , toIndex          = $.toIndex
	  , IE8_DOM_DEFINE   = false
	  , $indexOf         = __webpack_require__(72)(false)
	  , $forEach         = arrayMethod(0)
	  , $map             = arrayMethod(1)
	  , $filter          = arrayMethod(2)
	  , $some            = arrayMethod(3)
	  , $every           = arrayMethod(4);
	
	if(!$.DESC){
	  try {
	    IE8_DOM_DEFINE = defineProperty(cel('div'), 'x',
	      {get: function(){ return 8; }}
	    ).x == 8;
	  } catch(e){ /* empty */ }
	  $.setDesc = function(O, P, Attributes){
	    if(IE8_DOM_DEFINE)try {
	      return defineProperty(O, P, Attributes);
	    } catch(e){ /* empty */ }
	    if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	    if('value' in Attributes)assertObject(O)[P] = Attributes.value;
	    return O;
	  };
	  $.getDesc = function(O, P){
	    if(IE8_DOM_DEFINE)try {
	      return getOwnDescriptor(O, P);
	    } catch(e){ /* empty */ }
	    if(has(O, P))return $.desc(!ObjectProto.propertyIsEnumerable.call(O, P), O[P]);
	  };
	  $.setDescs = defineProperties = function(O, Properties){
	    assertObject(O);
	    var keys   = $.getKeys(Properties)
	      , length = keys.length
	      , i = 0
	      , P;
	    while(length > i)$.setDesc(O, P = keys[i++], Properties[P]);
	    return O;
	  };
	}
	$def($def.S + $def.F * !$.DESC, 'Object', {
	  // 19.1.2.6 / 15.2.3.3 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $.getDesc,
	  // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	  defineProperty: $.setDesc,
	  // 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
	  defineProperties: defineProperties
	});
	
	  // IE 8- don't enum bug keys
	var keys1 = ('constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,' +
	            'toLocaleString,toString,valueOf').split(',')
	  // Additional keys for getOwnPropertyNames
	  , keys2 = keys1.concat('length', 'prototype')
	  , keysLen1 = keys1.length;
	
	// Create object with `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = cel('iframe')
	    , i      = keysLen1
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write('<script>document.F=Object</script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict.prototype[keys1[i]];
	  return createDict();
	};
	function createGetKeys(names, length){
	  return function(object){
	    var O      = toObject(object)
	      , i      = 0
	      , result = []
	      , key;
	    for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	    // Don't enum bug & hidden keys
	    while(length > i)if(has(O, key = names[i++])){
	      ~$indexOf(result, key) || result.push(key);
	    }
	    return result;
	  };
	}
	function isPrimitive(it){ return !$.isObject(it); }
	function Empty(){}
	$def($def.S, 'Object', {
	  // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	  getPrototypeOf: $.getProto = $.getProto || function(O){
	    O = Object(assert.def(O));
	    if(has(O, IE_PROTO))return O[IE_PROTO];
	    if(isFunction(O.constructor) && O instanceof O.constructor){
	      return O.constructor.prototype;
	    } return O instanceof Object ? ObjectProto : null;
	  },
	  // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $.getNames = $.getNames || createGetKeys(keys2, keys2.length, true),
	  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	  create: $.create = $.create || function(O, /*?*/Properties){
	    var result;
	    if(O !== null){
	      Empty.prototype = assertObject(O);
	      result = new Empty();
	      Empty.prototype = null;
	      // add "__proto__" for Object.getPrototypeOf shim
	      result[IE_PROTO] = O;
	    } else result = createDict();
	    return Properties === undefined ? result : defineProperties(result, Properties);
	  },
	  // 19.1.2.14 / 15.2.3.14 Object.keys(O)
	  keys: $.getKeys = $.getKeys || createGetKeys(keys1, keysLen1, false),
	  // 19.1.2.17 / 15.2.3.8 Object.seal(O)
	  seal: $.it, // <- cap
	  // 19.1.2.5 / 15.2.3.9 Object.freeze(O)
	  freeze: $.it, // <- cap
	  // 19.1.2.15 / 15.2.3.10 Object.preventExtensions(O)
	  preventExtensions: $.it, // <- cap
	  // 19.1.2.13 / 15.2.3.11 Object.isSealed(O)
	  isSealed: isPrimitive, // <- cap
	  // 19.1.2.12 / 15.2.3.12 Object.isFrozen(O)
	  isFrozen: isPrimitive, // <- cap
	  // 19.1.2.11 / 15.2.3.13 Object.isExtensible(O)
	  isExtensible: $.isObject // <- cap
	});
	
	// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
	$def($def.P, 'Function', {
	  bind: function(that /*, args... */){
	    var fn       = assert.fn(this)
	      , partArgs = _slice.call(arguments, 1);
	    function bound(/* args... */){
	      var args = partArgs.concat(_slice.call(arguments));
	      return invoke(fn, args, this instanceof bound ? $.create(fn.prototype) : that);
	    }
	    if(fn.prototype)bound.prototype = fn.prototype;
	    return bound;
	  }
	});
	
	// Fix for not array-like ES3 string and DOM objects
	if(!(0 in Object('z') && 'z'[0] == 'z')){
	  $.ES5Object = function(it){
	    return cof(it) == 'String' ? it.split('') : Object(it);
	  };
	}
	
	var buggySlice = true;
	try {
	  if(html)_slice.call(html);
	  buggySlice = false;
	} catch(e){ /* empty */ }
	
	$def($def.P + $def.F * buggySlice, 'Array', {
	  slice: function slice(begin, end){
	    var len   = toLength(this.length)
	      , klass = cof(this);
	    end = end === undefined ? len : end;
	    if(klass == 'Array')return _slice.call(this, begin, end);
	    var start  = toIndex(begin, len)
	      , upTo   = toIndex(end, len)
	      , size   = toLength(upTo - start)
	      , cloned = Array(size)
	      , i      = 0;
	    for(; i < size; i++)cloned[i] = klass == 'String'
	      ? this.charAt(start + i)
	      : this[start + i];
	    return cloned;
	  }
	});
	
	$def($def.P + $def.F * ($.ES5Object != Object), 'Array', {
	  join: function join(){
	    return _join.apply($.ES5Object(this), arguments);
	  }
	});
	
	// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
	$def($def.S, 'Array', {
	  isArray: function(arg){
	    return cof(arg) == 'Array';
	  }
	});
	function createArrayReduce(isRight){
	  return function(callbackfn, memo){
	    assert.fn(callbackfn);
	    var O      = toObject(this)
	      , length = toLength(O.length)
	      , index  = isRight ? length - 1 : 0
	      , i      = isRight ? -1 : 1;
	    if(arguments.length < 2)for(;;){
	      if(index in O){
	        memo = O[index];
	        index += i;
	        break;
	      }
	      index += i;
	      assert(isRight ? index >= 0 : length > index, 'Reduce of empty array with no initial value');
	    }
	    for(;isRight ? index >= 0 : length > index; index += i)if(index in O){
	      memo = callbackfn(memo, O[index], index, this);
	    }
	    return memo;
	  };
	}
	$def($def.P, 'Array', {
	  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
	  forEach: $.each = $.each || function forEach(callbackfn/*, that = undefined */){
	    return $forEach(this, callbackfn, arguments[1]);
	  },
	  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
	  map: function map(callbackfn/*, that = undefined */){
	    return $map(this, callbackfn, arguments[1]);
	  },
	  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
	  filter: function filter(callbackfn/*, that = undefined */){
	    return $filter(this, callbackfn, arguments[1]);
	  },
	  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
	  some: function some(callbackfn/*, that = undefined */){
	    return $some(this, callbackfn, arguments[1]);
	  },
	  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
	  every: function every(callbackfn/*, that = undefined */){
	    return $every(this, callbackfn, arguments[1]);
	  },
	  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
	  reduce: createArrayReduce(false),
	  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
	  reduceRight: createArrayReduce(true),
	  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
	  indexOf: function indexOf(el /*, fromIndex = 0 */){
	    return $indexOf(this, el, arguments[1]);
	  },
	  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
	  lastIndexOf: function(el, fromIndex /* = @[*-1] */){
	    var O      = toObject(this)
	      , length = toLength(O.length)
	      , index  = length - 1;
	    if(arguments.length > 1)index = Math.min(index, $.toInteger(fromIndex));
	    if(index < 0)index = toLength(length + index);
	    for(;index >= 0; index--)if(index in O)if(O[index] === el)return index;
	    return -1;
	  }
	});
	
	// 21.1.3.25 / 15.5.4.20 String.prototype.trim()
	$def($def.P, 'String', {trim: __webpack_require__(73)(/^\s*([\s\S]*\S)?\s*$/, '$1')});
	
	// 20.3.3.1 / 15.9.4.4 Date.now()
	$def($def.S, 'Date', {now: function(){
	  return +new Date;
	}});
	
	function lz(num){
	  return num > 9 ? num : '0' + num;
	}
	
	// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
	// PhantomJS and old webkit had a broken Date implementation.
	var date       = new Date(-5e13 - 1)
	  , brokenDate = !(date.toISOString && date.toISOString() == '0385-07-25T07:06:39.999Z'
	      && __webpack_require__(74)(function(){ new Date(NaN).toISOString(); }));
	$def($def.P + $def.F * brokenDate, 'Date', {toISOString: function(){
	  if(!isFinite(this))throw RangeError('Invalid time value');
	  var d = this
	    , y = d.getUTCFullYear()
	    , m = d.getUTCMilliseconds()
	    , s = y < 0 ? '-' : y > 9999 ? '+' : '';
	  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
	    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
	    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
	    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
	}});
	
	if(classof(function(){ return arguments; }()) == 'Object')cof.classof = function(it){
	  var tag = classof(it);
	  return tag == 'Object' && isFunction(it.callee) ? 'Arguments' : tag;
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $        = __webpack_require__(64)
	  , setTag   = __webpack_require__(66).set
	  , uid      = __webpack_require__(70)
	  , $def     = __webpack_require__(67)
	  , $redef   = __webpack_require__(75)
	  , keyOf    = __webpack_require__(76)
	  , enumKeys = __webpack_require__(77)
	  , assertObject = __webpack_require__(71).obj
	  , has      = $.has
	  , $create  = $.create
	  , getDesc  = $.getDesc
	  , setDesc  = $.setDesc
	  , desc     = $.desc
	  , getNames = $.getNames
	  , toObject = $.toObject
	  , $Symbol  = $.g.Symbol
	  , setter   = false
	  , TAG      = uid('tag')
	  , HIDDEN   = uid('hidden')
	  , _propertyIsEnumerable = {}.propertyIsEnumerable
	  , SymbolRegistry = {}
	  , AllSymbols = {}
	  , useNative = $.isFunction($Symbol);
	
	function wrap(tag){
	  var sym = AllSymbols[tag] = $.set($create($Symbol.prototype), TAG, tag);
	  $.DESC && setter && setDesc(Object.prototype, tag, {
	    configurable: true,
	    set: function(value){
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setDesc(this, tag, desc(1, value));
	    }
	  });
	  return sym;
	}
	
	function defineProperty(it, key, D){
	  if(D && has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))setDesc(it, HIDDEN, desc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = $create(D, {enumerable: desc(0, false)});
	    }
	  } return setDesc(it, key, D);
	}
	function defineProperties(it, P){
	  assertObject(it);
	  var keys = enumKeys(P = toObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)defineProperty(it, key = keys[i++], P[key]);
	  return it;
	}
	function create(it, P){
	  return P === undefined ? $create(it) : defineProperties($create(it), P);
	}
	function propertyIsEnumerable(key){
	  var E = _propertyIsEnumerable.call(this, key);
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
	    ? E : true;
	}
	function getOwnPropertyDescriptor(it, key){
	  var D = getDesc(it = toObject(it), key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	}
	function getOwnPropertyNames(it){
	  var names  = getNames(toObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
	  return result;
	}
	function getOwnPropertySymbols(it){
	  var names  = getNames(toObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
	  return result;
	}
	
	// 19.4.1.1 Symbol([description])
	if(!useNative){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor');
	    return wrap(uid(arguments[0]));
	  };
	  $redef($Symbol.prototype, 'toString', function(){
	    return this[TAG];
	  });
	
	  $.create     = create;
	  $.setDesc    = defineProperty;
	  $.getDesc    = getOwnPropertyDescriptor;
	  $.setDescs   = defineProperties;
	  $.getNames   = getOwnPropertyNames;
	  $.getSymbols = getOwnPropertySymbols;
	
	  if($.DESC && $.FW)$redef(Object.prototype, 'propertyIsEnumerable', propertyIsEnumerable, true);
	}
	
	var symbolStatics = {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    return keyOf(SymbolRegistry, key);
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	};
	// 19.4.2.2 Symbol.hasInstance
	// 19.4.2.3 Symbol.isConcatSpreadable
	// 19.4.2.4 Symbol.iterator
	// 19.4.2.6 Symbol.match
	// 19.4.2.8 Symbol.replace
	// 19.4.2.9 Symbol.search
	// 19.4.2.10 Symbol.species
	// 19.4.2.11 Symbol.split
	// 19.4.2.12 Symbol.toPrimitive
	// 19.4.2.13 Symbol.toStringTag
	// 19.4.2.14 Symbol.unscopables
	$.each.call((
	    'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
	    'species,split,toPrimitive,toStringTag,unscopables'
	  ).split(','), function(it){
	    var sym = __webpack_require__(78)(it);
	    symbolStatics[it] = useNative ? sym : wrap(sym);
	  }
	);
	
	setter = true;
	
	$def($def.G + $def.W, {Symbol: $Symbol});
	
	$def($def.S, 'Symbol', symbolStatics);
	
	$def($def.S + $def.F * !useNative, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: getOwnPropertySymbols
	});
	
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setTag($.g.JSON, 'JSON', true);

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $def = __webpack_require__(67);
	$def($def.S, 'Object', {assign: __webpack_require__(79)});

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.10 Object.is(value1, value2)
	var $def = __webpack_require__(67);
	$def($def.S, 'Object', {
	  is: function is(x, y){
	    return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	  }
	});

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $def = __webpack_require__(67);
	$def($def.S, 'Object', {setPrototypeOf: __webpack_require__(80).set});

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(66)
	  , tmp = {};
	tmp[__webpack_require__(78)('toStringTag')] = 'z';
	if(__webpack_require__(64).FW && cof(tmp) != 'z'){
	  __webpack_require__(75)(Object.prototype, 'toString', function toString(){
	    return '[object ' + cof.classof(this) + ']';
	  }, true);
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(64)
	  , $def     = __webpack_require__(67)
	  , isObject = $.isObject
	  , toObject = $.toObject;
	$.each.call(('freeze,seal,preventExtensions,isFrozen,isSealed,isExtensible,' +
	  'getOwnPropertyDescriptor,getPrototypeOf,keys,getOwnPropertyNames').split(',')
	, function(KEY, ID){
	  var fn     = ($.core.Object || {})[KEY] || Object[KEY]
	    , forced = 0
	    , method = {};
	  method[KEY] = ID == 0 ? function freeze(it){
	    return isObject(it) ? fn(it) : it;
	  } : ID == 1 ? function seal(it){
	    return isObject(it) ? fn(it) : it;
	  } : ID == 2 ? function preventExtensions(it){
	    return isObject(it) ? fn(it) : it;
	  } : ID == 3 ? function isFrozen(it){
	    return isObject(it) ? fn(it) : true;
	  } : ID == 4 ? function isSealed(it){
	    return isObject(it) ? fn(it) : true;
	  } : ID == 5 ? function isExtensible(it){
	    return isObject(it) ? fn(it) : false;
	  } : ID == 6 ? function getOwnPropertyDescriptor(it, key){
	    return fn(toObject(it), key);
	  } : ID == 7 ? function getPrototypeOf(it){
	    return fn(Object($.assertDefined(it)));
	  } : ID == 8 ? function keys(it){
	    return fn(toObject(it));
	  } : function getOwnPropertyNames(it){
	    return fn(toObject(it));
	  };
	  try {
	    fn('z');
	  } catch(e){
	    forced = 1;
	  }
	  $def($def.S + $def.F * forced, 'Object', method);
	});

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $    = __webpack_require__(64)
	  , NAME = 'name'
	  , setDesc = $.setDesc
	  , FunctionProto = Function.prototype;
	// 19.2.4.2 name
	NAME in FunctionProto || $.FW && $.DESC && setDesc(FunctionProto, NAME, {
	  configurable: true,
	  get: function(){
	    var match = String(this).match(/^\s*function ([^ (]*)/)
	      , name  = match ? match[1] : '';
	    $.has(this, NAME) || setDesc(this, NAME, $.desc(5, name));
	    return name;
	  },
	  set: function(value){
	    $.has(this, NAME) || setDesc(this, NAME, $.desc(0, value));
	  }
	});

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var $             = __webpack_require__(64)
	  , HAS_INSTANCE  = __webpack_require__(78)('hasInstance')
	  , FunctionProto = Function.prototype;
	// 19.2.3.6 Function.prototype[@@hasInstance](V)
	if(!(HAS_INSTANCE in FunctionProto))$.setDesc(FunctionProto, HAS_INSTANCE, {value: function(O){
	  if(!$.isFunction(this) || !$.isObject(O))return false;
	  if(!$.isObject(this.prototype))return O instanceof this;
	  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
	  while(O = $.getProto(O))if(this.prototype === O)return true;
	  return false;
	}});

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $          = __webpack_require__(64)
	  , isObject   = $.isObject
	  , isFunction = $.isFunction
	  , NUMBER     = 'Number'
	  , $Number    = $.g[NUMBER]
	  , Base       = $Number
	  , proto      = $Number.prototype;
	function toPrimitive(it){
	  var fn, val;
	  if(isFunction(fn = it.valueOf) && !isObject(val = fn.call(it)))return val;
	  if(isFunction(fn = it.toString) && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to number");
	}
	function toNumber(it){
	  if(isObject(it))it = toPrimitive(it);
	  if(typeof it == 'string' && it.length > 2 && it.charCodeAt(0) == 48){
	    var binary = false;
	    switch(it.charCodeAt(1)){
	      case 66 : case 98  : binary = true;
	      case 79 : case 111 : return parseInt(it.slice(2), binary ? 2 : 8);
	    }
	  } return +it;
	}
	if($.FW && !($Number('0o1') && $Number('0b1'))){
	  $Number = function Number(it){
	    return this instanceof $Number ? new Base(toNumber(it)) : toNumber(it);
	  };
	  $.each.call($.DESC ? $.getNames(Base) : (
	      // ES3:
	      'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	      // ES6 (in case, if modules with ES6 Number statics required before):
	      'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
	      'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
	    ).split(','), function(key){
	      if($.has(Base, key) && !$.has($Number, key)){
	        $.setDesc($Number, key, $.getDesc(Base, key));
	      }
	    }
	  );
	  $Number.prototype = proto;
	  proto.constructor = $Number;
	  __webpack_require__(75)($.g, NUMBER, $Number);
	}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var $     = __webpack_require__(64)
	  , $def  = __webpack_require__(67)
	  , abs   = Math.abs
	  , floor = Math.floor
	  , _isFinite = $.g.isFinite
	  , MAX_SAFE_INTEGER = 0x1fffffffffffff; // pow(2, 53) - 1 == 9007199254740991;
	function isInteger(it){
	  return !$.isObject(it) && _isFinite(it) && floor(it) === it;
	}
	$def($def.S, 'Number', {
	  // 20.1.2.1 Number.EPSILON
	  EPSILON: Math.pow(2, -52),
	  // 20.1.2.2 Number.isFinite(number)
	  isFinite: function isFinite(it){
	    return typeof it == 'number' && _isFinite(it);
	  },
	  // 20.1.2.3 Number.isInteger(number)
	  isInteger: isInteger,
	  // 20.1.2.4 Number.isNaN(number)
	  isNaN: function isNaN(number){
	    return number != number;
	  },
	  // 20.1.2.5 Number.isSafeInteger(number)
	  isSafeInteger: function isSafeInteger(number){
	    return isInteger(number) && abs(number) <= MAX_SAFE_INTEGER;
	  },
	  // 20.1.2.6 Number.MAX_SAFE_INTEGER
	  MAX_SAFE_INTEGER: MAX_SAFE_INTEGER,
	  // 20.1.2.10 Number.MIN_SAFE_INTEGER
	  MIN_SAFE_INTEGER: -MAX_SAFE_INTEGER,
	  // 20.1.2.12 Number.parseFloat(string)
	  parseFloat: parseFloat,
	  // 20.1.2.13 Number.parseInt(string, radix)
	  parseInt: parseInt
	});

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var Infinity = 1 / 0
	  , $def  = __webpack_require__(67)
	  , E     = Math.E
	  , pow   = Math.pow
	  , abs   = Math.abs
	  , exp   = Math.exp
	  , log   = Math.log
	  , sqrt  = Math.sqrt
	  , ceil  = Math.ceil
	  , floor = Math.floor
	  , EPSILON   = pow(2, -52)
	  , EPSILON32 = pow(2, -23)
	  , MAX32     = pow(2, 127) * (2 - EPSILON32)
	  , MIN32     = pow(2, -126);
	function roundTiesToEven(n){
	  return n + 1 / EPSILON - 1 / EPSILON;
	}
	
	// 20.2.2.28 Math.sign(x)
	function sign(x){
	  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	}
	// 20.2.2.5 Math.asinh(x)
	function asinh(x){
	  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : log(x + sqrt(x * x + 1));
	}
	// 20.2.2.14 Math.expm1(x)
	function expm1(x){
	  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : exp(x) - 1;
	}
	
	$def($def.S, 'Math', {
	  // 20.2.2.3 Math.acosh(x)
	  acosh: function acosh(x){
	    return (x = +x) < 1 ? NaN : isFinite(x) ? log(x / E + sqrt(x + 1) * sqrt(x - 1) / E) + 1 : x;
	  },
	  // 20.2.2.5 Math.asinh(x)
	  asinh: asinh,
	  // 20.2.2.7 Math.atanh(x)
	  atanh: function atanh(x){
	    return (x = +x) == 0 ? x : log((1 + x) / (1 - x)) / 2;
	  },
	  // 20.2.2.9 Math.cbrt(x)
	  cbrt: function cbrt(x){
	    return sign(x = +x) * pow(abs(x), 1 / 3);
	  },
	  // 20.2.2.11 Math.clz32(x)
	  clz32: function clz32(x){
	    return (x >>>= 0) ? 31 - floor(log(x + 0.5) * Math.LOG2E) : 32;
	  },
	  // 20.2.2.12 Math.cosh(x)
	  cosh: function cosh(x){
	    return (exp(x = +x) + exp(-x)) / 2;
	  },
	  // 20.2.2.14 Math.expm1(x)
	  expm1: expm1,
	  // 20.2.2.16 Math.fround(x)
	  fround: function fround(x){
	    var $abs  = abs(x)
	      , $sign = sign(x)
	      , a, result;
	    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
	    a = (1 + EPSILON32 / EPSILON) * $abs;
	    result = a - (a - $abs);
	    if(result > MAX32 || result != result)return $sign * Infinity;
	    return $sign * result;
	  },
	  // 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
	  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
	    var sum  = 0
	      , i    = 0
	      , len  = arguments.length
	      , args = Array(len)
	      , larg = 0
	      , arg;
	    while(i < len){
	      arg = args[i] = abs(arguments[i++]);
	      if(arg == Infinity)return Infinity;
	      if(arg > larg)larg = arg;
	    }
	    larg = larg || 1;
	    while(len--)sum += pow(args[len] / larg, 2);
	    return larg * sqrt(sum);
	  },
	  // 20.2.2.18 Math.imul(x, y)
	  imul: function imul(x, y){
	    var UInt16 = 0xffff
	      , xn = +x
	      , yn = +y
	      , xl = UInt16 & xn
	      , yl = UInt16 & yn;
	    return 0 | xl * yl + ((UInt16 & xn >>> 16) * yl + xl * (UInt16 & yn >>> 16) << 16 >>> 0);
	  },
	  // 20.2.2.20 Math.log1p(x)
	  log1p: function log1p(x){
	    return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : log(1 + x);
	  },
	  // 20.2.2.21 Math.log10(x)
	  log10: function log10(x){
	    return log(x) / Math.LN10;
	  },
	  // 20.2.2.22 Math.log2(x)
	  log2: function log2(x){
	    return log(x) / Math.LN2;
	  },
	  // 20.2.2.28 Math.sign(x)
	  sign: sign,
	  // 20.2.2.30 Math.sinh(x)
	  sinh: function sinh(x){
	    return abs(x = +x) < 1 ? (expm1(x) - expm1(-x)) / 2 : (exp(x - 1) - exp(-x - 1)) * (E / 2);
	  },
	  // 20.2.2.33 Math.tanh(x)
	  tanh: function tanh(x){
	    var a = expm1(x = +x)
	      , b = expm1(-x);
	    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
	  },
	  // 20.2.2.34 Math.trunc(x)
	  trunc: function trunc(it){
	    return (it > 0 ? floor : ceil)(it);
	  }
	});

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var $def    = __webpack_require__(67)
	  , toIndex = __webpack_require__(64).toIndex
	  , fromCharCode = String.fromCharCode
	  , $fromCodePoint = String.fromCodePoint;
	
	// length should be 1, old FF problem
	$def($def.S + $def.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
	  // 21.1.2.2 String.fromCodePoint(...codePoints)
	  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
	    var res = []
	      , len = arguments.length
	      , i   = 0
	      , code;
	    while(len > i){
	      code = +arguments[i++];
	      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
	      res.push(code < 0x10000
	        ? fromCharCode(code)
	        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
	      );
	    } return res.join('');
	  }
	});

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var $    = __webpack_require__(64)
	  , $def = __webpack_require__(67);
	
	$def($def.S, 'String', {
	  // 21.1.2.4 String.raw(callSite, ...substitutions)
	  raw: function raw(callSite){
	    var tpl = $.toObject(callSite.raw)
	      , len = $.toLength(tpl.length)
	      , sln = arguments.length
	      , res = []
	      , i   = 0;
	    while(len > i){
	      res.push(String(tpl[i++]));
	      if(i < sln)res.push(String(arguments[i]));
	    } return res.join('');
	  }
	});

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var set   = __webpack_require__(64).set
	  , $at   = __webpack_require__(81)(true)
	  , ITER  = __webpack_require__(70).safe('iter')
	  , $iter = __webpack_require__(82)
	  , step  = $iter.step;
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(83)(String, 'String', function(iterated){
	  set(this, ITER, {o: String(iterated), i: 0});
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var iter  = this[ITER]
	    , O     = iter.o
	    , index = iter.i
	    , point;
	  if(index >= O.length)return step(1);
	  point = $at(O, index);
	  iter.i += point.length;
	  return step(0, point);
	});

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $def = __webpack_require__(67)
	  , $at  = __webpack_require__(81)(false);
	$def($def.P, 'String', {
	  // 21.1.3.3 String.prototype.codePointAt(pos)
	  codePointAt: function codePointAt(pos){
	    return $at(this, pos);
	  }
	});

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $    = __webpack_require__(64)
	  , cof  = __webpack_require__(66)
	  , $def = __webpack_require__(67)
	  , toLength = $.toLength;
	
	// should throw error on regex
	$def($def.P + $def.F * !__webpack_require__(74)(function(){ 'q'.endsWith(/./); }), 'String', {
	  // 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
	  endsWith: function endsWith(searchString /*, endPosition = @length */){
	    if(cof(searchString) == 'RegExp')throw TypeError();
	    var that = String($.assertDefined(this))
	      , endPosition = arguments[1]
	      , len = toLength(that.length)
	      , end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
	    searchString += '';
	    return that.slice(end - searchString.length, end) === searchString;
	  }
	});

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $    = __webpack_require__(64)
	  , cof  = __webpack_require__(66)
	  , $def = __webpack_require__(67);
	
	$def($def.P, 'String', {
	  // 21.1.3.7 String.prototype.includes(searchString, position = 0)
	  includes: function includes(searchString /*, position = 0 */){
	    if(cof(searchString) == 'RegExp')throw TypeError();
	    return !!~String($.assertDefined(this)).indexOf(searchString, arguments[1]);
	  }
	});

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var $def = __webpack_require__(67);
	
	$def($def.P, 'String', {
	  // 21.1.3.13 String.prototype.repeat(count)
	  repeat: __webpack_require__(84)
	});

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $    = __webpack_require__(64)
	  , cof  = __webpack_require__(66)
	  , $def = __webpack_require__(67);
	
	// should throw error on regex
	$def($def.P + $def.F * !__webpack_require__(74)(function(){ 'q'.startsWith(/./); }), 'String', {
	  // 21.1.3.18 String.prototype.startsWith(searchString [, position ])
	  startsWith: function startsWith(searchString /*, position = 0 */){
	    if(cof(searchString) == 'RegExp')throw TypeError();
	    var that  = String($.assertDefined(this))
	      , index = $.toLength(Math.min(arguments[1], that.length));
	    searchString += '';
	    return that.slice(index, index + searchString.length) === searchString;
	  }
	});

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var $     = __webpack_require__(64)
	  , ctx   = __webpack_require__(85)
	  , $def  = __webpack_require__(67)
	  , $iter = __webpack_require__(82)
	  , call  = __webpack_require__(86);
	$def($def.S + $def.F * !__webpack_require__(87)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = Object($.assertDefined(arrayLike))
	      , mapfn   = arguments[1]
	      , mapping = mapfn !== undefined
	      , f       = mapping ? ctx(mapfn, arguments[2], 2) : undefined
	      , index   = 0
	      , length, result, step, iterator;
	    if($iter.is(O)){
	      iterator = $iter.get(O);
	      // strange IE quirks mode bug -> use typeof instead of isFunction
	      result   = new (typeof this == 'function' ? this : Array);
	      for(; !(step = iterator.next()).done; index++){
	        result[index] = mapping ? call(iterator, f, [step.value, index], true) : step.value;
	      }
	    } else {
	      // strange IE quirks mode bug -> use typeof instead of isFunction
	      result = new (typeof this == 'function' ? this : Array)(length = $.toLength(O.length));
	      for(; length > index; index++){
	        result[index] = mapping ? f(O[index], index) : O[index];
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var $def = __webpack_require__(67);
	$def($def.S, 'Array', {
	  // 22.1.2.3 Array.of( ...items)
	  of: function of(/* ...args */){
	    var index  = 0
	      , length = arguments.length
	      // strange IE quirks mode bug -> use typeof instead of isFunction
	      , result = new (typeof this == 'function' ? this : Array)(length);
	    while(length > index)result[index] = arguments[index++];
	    result.length = length;
	    return result;
	  }
	});

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(64)
	  , setUnscope = __webpack_require__(88)
	  , ITER       = __webpack_require__(70).safe('iter')
	  , $iter      = __webpack_require__(82)
	  , step       = $iter.step
	  , Iterators  = $iter.Iterators;
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	__webpack_require__(83)(Array, 'Array', function(iterated, kind){
	  $.set(this, ITER, {o: $.toObject(iterated), i: 0, k: kind});
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var iter  = this[ITER]
	    , O     = iter.o
	    , kind  = iter.k
	    , index = iter.i++;
	  if(!O || index >= O.length){
	    iter.o = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	setUnscope('keys');
	setUnscope('values');
	setUnscope('entries');

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(89)(Array);

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $       = __webpack_require__(64)
	  , $def    = __webpack_require__(67)
	  , toIndex = $.toIndex;
	$def($def.P, 'Array', {
	  // 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	  copyWithin: function copyWithin(target/* = 0 */, start /* = 0, end = @length */){
	    var O     = Object($.assertDefined(this))
	      , len   = $.toLength(O.length)
	      , to    = toIndex(target, len)
	      , from  = toIndex(start, len)
	      , end   = arguments[2]
	      , fin   = end === undefined ? len : toIndex(end, len)
	      , count = Math.min(fin - from, len - to)
	      , inc   = 1;
	    if(from < to && to < from + count){
	      inc  = -1;
	      from = from + count - 1;
	      to   = to   + count - 1;
	    }
	    while(count-- > 0){
	      if(from in O)O[to] = O[from];
	      else delete O[to];
	      to   += inc;
	      from += inc;
	    } return O;
	  }
	});
	__webpack_require__(88)('copyWithin');

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $       = __webpack_require__(64)
	  , $def    = __webpack_require__(67)
	  , toIndex = $.toIndex;
	$def($def.P, 'Array', {
	  // 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	  fill: function fill(value /*, start = 0, end = @length */){
	    var O      = Object($.assertDefined(this))
	      , length = $.toLength(O.length)
	      , index  = toIndex(arguments[1], length)
	      , end    = arguments[2]
	      , endPos = end === undefined ? length : toIndex(end, length);
	    while(endPos > index)O[index++] = value;
	    return O;
	  }
	});
	__webpack_require__(88)('fill');

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
	var KEY    = 'find'
	  , $def   = __webpack_require__(67)
	  , forced = true
	  , $find  = __webpack_require__(69)(5);
	// Shouldn't skip holes
	if(KEY in [])Array(1)[KEY](function(){ forced = false; });
	$def($def.P + $def.F * forced, 'Array', {
	  find: function find(callbackfn/*, that = undefined */){
	    return $find(this, callbackfn, arguments[1]);
	  }
	});
	__webpack_require__(88)(KEY);

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
	var KEY    = 'findIndex'
	  , $def   = __webpack_require__(67)
	  , forced = true
	  , $find  = __webpack_require__(69)(6);
	// Shouldn't skip holes
	if(KEY in [])Array(1)[KEY](function(){ forced = false; });
	$def($def.P + $def.F * forced, 'Array', {
	  findIndex: function findIndex(callbackfn/*, that = undefined */){
	    return $find(this, callbackfn, arguments[1]);
	  }
	});
	__webpack_require__(88)(KEY);

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var $       = __webpack_require__(64)
	  , cof     = __webpack_require__(66)
	  , $RegExp = $.g.RegExp
	  , Base    = $RegExp
	  , proto   = $RegExp.prototype
	  , re      = /a/g
	  // "new" creates a new object
	  , CORRECT_NEW = new $RegExp(re) !== re
	  // RegExp allows a regex with flags as the pattern
	  , ALLOWS_RE_WITH_FLAGS = function(){
	    try {
	      return $RegExp(re, 'i') == '/a/i';
	    } catch(e){ /* empty */ }
	  }();
	if($.FW && $.DESC){
	  if(!CORRECT_NEW || !ALLOWS_RE_WITH_FLAGS){
	    $RegExp = function RegExp(pattern, flags){
	      var patternIsRegExp  = cof(pattern) == 'RegExp'
	        , flagsIsUndefined = flags === undefined;
	      if(!(this instanceof $RegExp) && patternIsRegExp && flagsIsUndefined)return pattern;
	      return CORRECT_NEW
	        ? new Base(patternIsRegExp && !flagsIsUndefined ? pattern.source : pattern, flags)
	        : new Base(patternIsRegExp ? pattern.source : pattern
	          , patternIsRegExp && flagsIsUndefined ? pattern.flags : flags);
	    };
	    $.each.call($.getNames(Base), function(key){
	      key in $RegExp || $.setDesc($RegExp, key, {
	        configurable: true,
	        get: function(){ return Base[key]; },
	        set: function(it){ Base[key] = it; }
	      });
	    });
	    proto.constructor = $RegExp;
	    $RegExp.prototype = proto;
	    __webpack_require__(75)($.g, 'RegExp', $RegExp);
	  }
	  // 21.2.5.3 get RegExp.prototype.flags()
	  if(/./g.flags != 'g')$.setDesc(proto, 'flags', {
	    configurable: true,
	    get: __webpack_require__(73)(/^.*\/(\w*)$/, '$1')
	  });
	}
	__webpack_require__(89)($RegExp);

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $        = __webpack_require__(64)
	  , ctx      = __webpack_require__(85)
	  , cof      = __webpack_require__(66)
	  , $def     = __webpack_require__(67)
	  , assert   = __webpack_require__(71)
	  , forOf    = __webpack_require__(90)
	  , setProto = __webpack_require__(80).set
	  , species  = __webpack_require__(89)
	  , SPECIES  = __webpack_require__(78)('species')
	  , RECORD   = __webpack_require__(70).safe('record')
	  , PROMISE  = 'Promise'
	  , global   = $.g
	  , process  = global.process
	  , asap     = process && process.nextTick || __webpack_require__(91).set
	  , P        = global[PROMISE]
	  , isFunction     = $.isFunction
	  , isObject       = $.isObject
	  , assertFunction = assert.fn
	  , assertObject   = assert.obj;
	
	var useNative = function(){
	  var test, works = false;
	  function P2(x){
	    var self = new P(x);
	    setProto(self, P2.prototype);
	    return self;
	  }
	  try {
	    works = isFunction(P) && isFunction(P.resolve) && P.resolve(test = new P(function(){})) == test;
	    setProto(P2, P);
	    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
	    // actual Firefox has broken subclass support, test that
	    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
	      works = false;
	    }
	  } catch(e){ works = false; }
	  return works;
	}();
	
	// helpers
	function getConstructor(C){
	  var S = assertObject(C)[SPECIES];
	  return S != undefined ? S : C;
	}
	function isThenable(it){
	  var then;
	  if(isObject(it))then = it.then;
	  return isFunction(then) ? then : false;
	}
	function notify(record){
	  var chain = record.c;
	  if(chain.length)asap(function(){
	    var value = record.v
	      , ok    = record.s == 1
	      , i     = 0;
	    function run(react){
	      var cb = ok ? react.ok : react.fail
	        , ret, then;
	      try {
	        if(cb){
	          if(!ok)record.h = true;
	          ret = cb === true ? value : cb(value);
	          if(ret === react.P){
	            react.rej(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(ret)){
	            then.call(ret, react.res, react.rej);
	          } else react.res(ret);
	        } else react.rej(value);
	      } catch(err){
	        react.rej(err);
	      }
	    }
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    chain.length = 0;
	  });
	}
	function isUnhandled(promise){
	  var record = promise[RECORD]
	    , chain  = record.a || record.c
	    , i      = 0
	    , react;
	  if(record.h)return false;
	  while(chain.length > i){
	    react = chain[i++];
	    if(react.fail || !isUnhandled(react.P))return false;
	  } return true;
	}
	function $reject(value){
	  var record = this
	    , promise;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  record.v = value;
	  record.s = 2;
	  record.a = record.c.slice();
	  setTimeout(function(){
	    asap(function(){
	      if(isUnhandled(promise = record.p)){
	        if(cof(process) == 'process'){
	          process.emit('unhandledRejection', value, promise);
	        } else if(global.console && isFunction(console.error)){
	          console.error('Unhandled promise rejection', value);
	        }
	      }
	      record.a = undefined;
	    });
	  }, 1);
	  notify(record);
	}
	function $resolve(value){
	  var record = this
	    , then, wrapper;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  try {
	    if(then = isThenable(value)){
	      wrapper = {r: record, d: false}; // wrap
	      then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	    } else {
	      record.v = value;
	      record.s = 1;
	      notify(record);
	    }
	  } catch(err){
	    $reject.call(wrapper || {r: record, d: false}, err); // wrap
	  }
	}
	
	// constructor polyfill
	if(!useNative){
	  // 25.4.3.1 Promise(executor)
	  P = function Promise(executor){
	    assertFunction(executor);
	    var record = {
	      p: assert.inst(this, P, PROMISE),       // <- promise
	      c: [],                                  // <- awaiting reactions
	      a: undefined,                           // <- checked in isUnhandled reactions
	      s: 0,                                   // <- state
	      d: false,                               // <- done
	      v: undefined,                           // <- value
	      h: false                                // <- handled rejection
	    };
	    $.hide(this, RECORD, record);
	    try {
	      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
	    } catch(err){
	      $reject.call(record, err);
	    }
	  };
	  __webpack_require__(92)(P.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var S = assertObject(assertObject(this).constructor)[SPECIES];
	      var react = {
	        ok:   isFunction(onFulfilled) ? onFulfilled : true,
	        fail: isFunction(onRejected)  ? onRejected  : false
	      };
	      var promise = react.P = new (S != undefined ? S : P)(function(res, rej){
	        react.res = assertFunction(res);
	        react.rej = assertFunction(rej);
	      });
	      var record = this[RECORD];
	      record.c.push(react);
	      if(record.a)record.a.push(react);
	      record.s && notify(record);
	      return promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	}
	
	// export
	$def($def.G + $def.W + $def.F * !useNative, {Promise: P});
	cof.set(P, PROMISE);
	species(P);
	species($.core[PROMISE]); // for wrapper
	
	// statics
	$def($def.S + $def.F * !useNative, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    return new (getConstructor(this))(function(res, rej){
	      rej(r);
	    });
	  },
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    return isObject(x) && RECORD in x && $.getProto(x) === this.prototype
	      ? x : new (getConstructor(this))(function(res){
	        res(x);
	      });
	  }
	});
	$def($def.S + $def.F * !(useNative && __webpack_require__(87)(function(iter){
	  P.all(iter)['catch'](function(){});
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C      = getConstructor(this)
	      , values = [];
	    return new C(function(res, rej){
	      forOf(iterable, false, values.push, values);
	      var remaining = values.length
	        , results   = Array(remaining);
	      if(remaining)$.each.call(values, function(promise, index){
	        C.resolve(promise).then(function(value){
	          results[index] = value;
	          --remaining || res(results);
	        }, rej);
	      });
	      else res(results);
	    });
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C = getConstructor(this);
	    return new C(function(res, rej){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(res, rej);
	      });
	    });
	  }
	});

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(93);
	
	// 23.1 Map Objects
	__webpack_require__(94)('Map', {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key){
	    var entry = strong.getEntry(this, key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value){
	    return strong.def(this, key === 0 ? 0 : key, value);
	  }
	}, strong, true);

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(93);
	
	// 23.2 Set Objects
	__webpack_require__(94)('Set', {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value){
	    return strong.def(this, value = value === 0 ? 0 : value, value);
	  }
	}, strong);

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $         = __webpack_require__(64)
	  , weak      = __webpack_require__(95)
	  , leakStore = weak.leakStore
	  , ID        = weak.ID
	  , WEAK      = weak.WEAK
	  , has       = $.has
	  , isObject  = $.isObject
	  , isExtensible = Object.isExtensible || isObject
	  , tmp       = {};
	
	// 23.3 WeakMap Objects
	var WeakMap = __webpack_require__(94)('WeakMap', {
	  // 23.3.3.3 WeakMap.prototype.get(key)
	  get: function get(key){
	    if(isObject(key)){
	      if(!isExtensible(key))return leakStore(this).get(key);
	      if(has(key, WEAK))return key[WEAK][this[ID]];
	    }
	  },
	  // 23.3.3.5 WeakMap.prototype.set(key, value)
	  set: function set(key, value){
	    return weak.def(this, key, value);
	  }
	}, weak, true, true);
	
	// IE11 WeakMap frozen keys fix
	if($.FW && new WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
	  $.each.call(['delete', 'has', 'get', 'set'], function(key){
	    var proto  = WeakMap.prototype
	      , method = proto[key];
	    __webpack_require__(75)(proto, key, function(a, b){
	      // store frozen objects on leaky map
	      if(isObject(a) && !isExtensible(a)){
	        var result = leakStore(this)[key](a, b);
	        return key == 'set' ? this : result;
	      // store all the rest on native weakmap
	      } return method.call(this, a, b);
	    });
	  });
	}

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var weak = __webpack_require__(95);
	
	// 23.4 WeakSet Objects
	__webpack_require__(94)('WeakSet', {
	  // 23.4.3.1 WeakSet.prototype.add(value)
	  add: function add(value){
	    return weak.def(this, value, true);
	  }
	}, weak, false, true);

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = run;
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _Interpreter2 = __webpack_require__(2);
	
	var _Interpreter3 = _interopRequireDefault(_Interpreter2);
	
	var _InputStream2 = __webpack_require__(3);
	
	var _InputStream3 = _interopRequireDefault(_InputStream2);
	
	var _Interpreter4 = _interopRequireDefault(_Interpreter2);
	
	exports.Interpreter = _Interpreter4["default"];
	
	var _InputStream4 = _interopRequireDefault(_InputStream2);
	
	exports.InputStream = _InputStream4["default"];
	
	var _interpreterUtils = _interopRequireWildcard(_Interpreter2);
	
	exports.interpreterUtils = _interpreterUtils;
	
	var _functionRegistry2 = __webpack_require__(4);
	
	var _functionRegistry = _interopRequireWildcard(_functionRegistry2);
	
	exports.functionRegistry = _functionRegistry;
	
	function run(input) {
	    var inputStream = new _InputStream3["default"](input);
	    var interpreter = new _Interpreter3["default"](inputStream);
	
	    return interpreter.interpret();
	}
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztxQkFRd0IsR0FBRzs7Ozs7OzRCQVJILGVBQWU7Ozs7NEJBQ2YsZUFBZTs7Ozs7O1FBRWhDLFdBQVc7Ozs7UUFDWCxXQUFXOzs7O1FBQ04sZ0JBQWdCOztpQ0FDTSxvQkFBb0I7Ozs7UUFBMUMsZ0JBQWdCOztBQUViLFNBQVMsR0FBRyxDQUFDLEtBQUssRUFBRTtBQUMvQixRQUFJLFdBQVcsR0FBRyw2QkFBZ0IsS0FBSyxDQUFDLENBQUM7QUFDekMsUUFBSSxXQUFXLEdBQUcsNkJBQWdCLFdBQVcsQ0FBQyxDQUFDOztBQUUvQyxXQUFPLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztDQUNsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJbnRlcnByZXRlciBmcm9tIFwiLi9JbnRlcnByZXRlclwiO1xuaW1wb3J0IElucHV0U3RyZWFtIGZyb20gXCIuL0lucHV0U3RyZWFtXCI7XG5cbmV4cG9ydCBJbnRlcnByZXRlciBmcm9tIFwiLi9JbnRlcnByZXRlclwiO1xuZXhwb3J0IElucHV0U3RyZWFtIGZyb20gXCIuL0lucHV0U3RyZWFtXCI7XG5leHBvcnQgKiBhcyBpbnRlcnByZXRlclV0aWxzIGZyb20gXCIuL0ludGVycHJldGVyXCI7XG5leHBvcnQgKiBhcyBmdW5jdGlvblJlZ2lzdHJ5IGZyb20gXCIuL2Z1bmN0aW9uUmVnaXN0cnlcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcnVuKGlucHV0KSB7XG4gICAgbGV0IGlucHV0U3RyZWFtID0gbmV3IElucHV0U3RyZWFtKGlucHV0KTtcbiAgICBsZXQgaW50ZXJwcmV0ZXIgPSBuZXcgSW50ZXJwcmV0ZXIoaW5wdXRTdHJlYW0pO1xuXG4gICAgcmV0dXJuIGludGVycHJldGVyLmludGVycHJldCgpO1xufSJdfQ==

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/domenic/Array.prototype.includes
	var $def      = __webpack_require__(67)
	  , $includes = __webpack_require__(72)(true);
	$def($def.P, 'Array', {
	  includes: function includes(el /*, fromIndex = 0 */){
	    return $includes(this, el, arguments[1]);
	  }
	});
	__webpack_require__(88)('includes');

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/mathiasbynens/String.prototype.at
	'use strict';
	var $def = __webpack_require__(67)
	  , $at  = __webpack_require__(81)(true);
	$def($def.P, 'String', {
	  at: function at(pos){
	    return $at(this, pos);
	  }
	});

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $def = __webpack_require__(67)
	  , $pad = __webpack_require__(97);
	$def($def.P, 'String', {
	  lpad: function lpad(n){
	    return $pad(this, n, arguments[1], true);
	  }
	});

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $def = __webpack_require__(67)
	  , $pad = __webpack_require__(97);
	$def($def.P, 'String', {
	  rpad: function rpad(n){
	    return $pad(this, n, arguments[1], false);
	  }
	});

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	// https://gist.github.com/kangax/9698100
	var $def = __webpack_require__(67);
	$def($def.S, 'RegExp', {
	  escape: __webpack_require__(73)(/([\\\-[\]{}()*+?.,^$|])/g, '\\$1', true)
	});

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// https://gist.github.com/WebReflection/9353781
	var $       = __webpack_require__(64)
	  , $def    = __webpack_require__(67)
	  , ownKeys = __webpack_require__(96);
	
	$def($def.S, 'Object', {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
	    var O      = $.toObject(object)
	      , result = {};
	    $.each.call(ownKeys(O), function(key){
	      $.setDesc(result, key, $.desc(0, $.getDesc(O, key)));
	    });
	    return result;
	  }
	});

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// http://goo.gl/XkBrjD
	var $    = __webpack_require__(64)
	  , $def = __webpack_require__(67);
	function createObjectToArray(isEntries){
	  return function(object){
	    var O      = $.toObject(object)
	      , keys   = $.getKeys(O)
	      , length = keys.length
	      , i      = 0
	      , result = Array(length)
	      , key;
	    if(isEntries)while(length > i)result[i] = [key = keys[i++], O[key]];
	    else while(length > i)result[i] = O[keys[i++]];
	    return result;
	  };
	}
	$def($def.S, 'Object', {
	  values:  createObjectToArray(false),
	  entries: createObjectToArray(true)
	});

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	__webpack_require__(98)('Map');

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	__webpack_require__(98)('Set');

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	// JavaScript 1.6 / Strawman array statics shim
	var $       = __webpack_require__(64)
	  , $def    = __webpack_require__(67)
	  , $Array  = $.core.Array || Array
	  , statics = {};
	function setStatics(keys, length){
	  $.each.call(keys.split(','), function(key){
	    if(length == undefined && key in $Array)statics[key] = $Array[key];
	    else if(key in [])statics[key] = __webpack_require__(85)(Function.call, [][key], length);
	  });
	}
	setStatics('pop,reverse,shift,keys,values,entries', 1);
	setStatics('indexOf,every,some,forEach,map,filter,find,findIndex,includes', 3);
	setStatics('join,slice,concat,push,splice,unshift,sort,lastIndexOf,' +
	           'reduce,reduceRight,copyWithin,fill,turn');
	$def($def.S, 'Array', statics);

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	// ie9- setTimeout & setInterval additional parameters fix
	var $         = __webpack_require__(64)
	  , $def      = __webpack_require__(67)
	  , invoke    = __webpack_require__(68)
	  , partial   = __webpack_require__(99)
	  , navigator = $.g.navigator
	  , MSIE      = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
	function wrap(set){
	  return MSIE ? function(fn, time /*, ...args */){
	    return set(invoke(
	      partial,
	      [].slice.call(arguments, 2),
	      $.isFunction(fn) ? fn : Function(fn)
	    ), time);
	  } : set;
	}
	$def($def.G + $def.B + $def.F * MSIE, {
	  setTimeout:  wrap($.g.setTimeout),
	  setInterval: wrap($.g.setInterval)
	});

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var $def  = __webpack_require__(67)
	  , $task = __webpack_require__(91);
	$def($def.G + $def.B, {
	  setImmediate:   $task.set,
	  clearImmediate: $task.clear
	});

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(38);
	var $           = __webpack_require__(64)
	  , Iterators   = __webpack_require__(82).Iterators
	  , ITERATOR    = __webpack_require__(78)('iterator')
	  , ArrayValues = Iterators.Array
	  , NodeList    = $.g.NodeList;
	if($.FW && NodeList && !(ITERATOR in NodeList.prototype)){
	  $.hide(NodeList.prototype, ITERATOR, ArrayValues);
	}
	Iterators.NodeList = ArrayValues;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global = typeof self != 'undefined' ? self : Function('return this')()
	  , core   = {}
	  , defineProperty = Object.defineProperty
	  , hasOwnProperty = {}.hasOwnProperty
	  , ceil  = Math.ceil
	  , floor = Math.floor
	  , max   = Math.max
	  , min   = Math.min;
	// The engine works fine with descriptors? Thank's IE8 for his funny defineProperty.
	var DESC = !!function(){
	  try {
	    return defineProperty({}, 'a', {get: function(){ return 2; }}).a == 2;
	  } catch(e){ /* empty */ }
	}();
	var hide = createDefiner(1);
	// 7.1.4 ToInteger
	function toInteger(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	}
	function desc(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	}
	function simpleSet(object, key, value){
	  object[key] = value;
	  return object;
	}
	function createDefiner(bitmap){
	  return DESC ? function(object, key, value){
	    return $.setDesc(object, key, desc(bitmap, value));
	  } : simpleSet;
	}
	
	function isObject(it){
	  return it !== null && (typeof it == 'object' || typeof it == 'function');
	}
	function isFunction(it){
	  return typeof it == 'function';
	}
	function assertDefined(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	}
	
	var $ = module.exports = __webpack_require__(100)({
	  g: global,
	  core: core,
	  html: global.document && document.documentElement,
	  // http://jsperf.com/core-js-isobject
	  isObject:   isObject,
	  isFunction: isFunction,
	  it: function(it){
	    return it;
	  },
	  that: function(){
	    return this;
	  },
	  // 7.1.4 ToInteger
	  toInteger: toInteger,
	  // 7.1.15 ToLength
	  toLength: function(it){
	    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	  },
	  toIndex: function(index, length){
	    index = toInteger(index);
	    return index < 0 ? max(index + length, 0) : min(index, length);
	  },
	  has: function(it, key){
	    return hasOwnProperty.call(it, key);
	  },
	  create:     Object.create,
	  getProto:   Object.getPrototypeOf,
	  DESC:       DESC,
	  desc:       desc,
	  getDesc:    Object.getOwnPropertyDescriptor,
	  setDesc:    defineProperty,
	  setDescs:   Object.defineProperties,
	  getKeys:    Object.keys,
	  getNames:   Object.getOwnPropertyNames,
	  getSymbols: Object.getOwnPropertySymbols,
	  assertDefined: assertDefined,
	  // Dummy, fix for not array-like ES3 string in es5 module
	  ES5Object: Object,
	  toObject: function(it){
	    return $.ES5Object(assertDefined(it));
	  },
	  hide: hide,
	  def: createDefiner(0),
	  set: global.Symbol ? simpleSet : hide,
	  each: [].forEach
	});
	/* eslint-disable no-undef */
	if(typeof __e != 'undefined')__e = core;
	if(typeof __g != 'undefined')__g = global;

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(64)
	  , document = $.g.document
	  , isObject = $.isObject
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(64)
	  , TAG      = __webpack_require__(78)('toStringTag')
	  , toString = {}.toString;
	function cof(it){
	  return toString.call(it).slice(8, -1);
	}
	cof.classof = function(it){
	  var O, T;
	  return it == undefined ? it === undefined ? 'Undefined' : 'Null'
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T : cof(O);
	};
	cof.set = function(it, tag, stat){
	  if(it && !$.has(it = stat ? it : it.prototype, TAG))$.hide(it, TAG, tag);
	};
	module.exports = cof;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(64)
	  , global     = $.g
	  , core       = $.core
	  , isFunction = $.isFunction
	  , $redef     = __webpack_require__(75);
	function ctx(fn, that){
	  return function(){
	    return fn.apply(that, arguments);
	  };
	}
	global.core = core;
	// type bitmap
	$def.F = 1;  // forced
	$def.G = 2;  // global
	$def.S = 4;  // static
	$def.P = 8;  // proto
	$def.B = 16; // bind
	$def.W = 32; // wrap
	function $def(type, name, source){
	  var key, own, out, exp
	    , isGlobal = type & $def.G
	    , isProto  = type & $def.P
	    , target   = isGlobal ? global : type & $def.S
	        ? global[name] : (global[name] || {}).prototype
	    , exports  = isGlobal ? core : core[name] || (core[name] = {});
	  if(isGlobal)source = name;
	  for(key in source){
	    // contains in native
	    own = !(type & $def.F) && target && key in target;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    if(type & $def.B && own)exp = ctx(out, global);
	    else exp = isProto && isFunction(out) ? ctx(Function.call, out) : out;
	    // extend global
	    if(target && !own)$redef(target, key, out);
	    // export
	    if(exports[key] != out)$.hide(exports, key, exp);
	    if(isProto)(exports.prototype || (exports.prototype = {}))[key] = out;
	  }
	}
	module.exports = $def;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	// Fast apply
	// http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	    case 5: return un ? fn(args[0], args[1], args[2], args[3], args[4])
	                      : fn.call(that, args[0], args[1], args[2], args[3], args[4]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var $   = __webpack_require__(64)
	  , ctx = __webpack_require__(85);
	module.exports = function(TYPE){
	  var IS_MAP        = TYPE == 1
	    , IS_FILTER     = TYPE == 2
	    , IS_SOME       = TYPE == 3
	    , IS_EVERY      = TYPE == 4
	    , IS_FIND_INDEX = TYPE == 6
	    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX;
	  return function($this, callbackfn, that){
	    var O      = Object($.assertDefined($this))
	      , self   = $.ES5Object(O)
	      , f      = ctx(callbackfn, that, 3)
	      , length = $.toLength(self.length)
	      , index  = 0
	      , result = IS_MAP ? Array(length) : IS_FILTER ? [] : undefined
	      , val, res;
	    for(;length > index; index++)if(NO_HOLES || index in self){
	      val = self[index];
	      res = f(val, index, O);
	      if(TYPE){
	        if(IS_MAP)result[index] = res;            // map
	        else if(res)switch(TYPE){
	          case 3: return true;                    // some
	          case 5: return val;                     // find
	          case 6: return index;                   // findIndex
	          case 2: result.push(val);               // filter
	        } else if(IS_EVERY)return false;          // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var sid = 0;
	function uid(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++sid + Math.random()).toString(36));
	}
	uid.safe = __webpack_require__(64).g.Symbol || uid;
	module.exports = uid;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(64);
	function assert(condition, msg1, msg2){
	  if(!condition)throw TypeError(msg2 ? msg1 + msg2 : msg1);
	}
	assert.def = $.assertDefined;
	assert.fn = function(it){
	  if(!$.isFunction(it))throw TypeError(it + ' is not a function!');
	  return it;
	};
	assert.obj = function(it){
	  if(!$.isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};
	assert.inst = function(it, Constructor, name){
	  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};
	module.exports = assert;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var $ = __webpack_require__(64);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = $.toObject($this)
	      , length = $.toLength(O.length)
	      , index  = $.toIndex(fromIndex, length)
	      , value;
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = function(regExp, replace, isStatic){
	  var replacer = replace === Object(replace) ? function(part){
	    return replace[part];
	  } : replace;
	  return function(it){
	    return String(isStatic ? it : this).replace(regExp, replacer);
	  };
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(exec){
	  try {
	    exec();
	    return false;
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var $   = __webpack_require__(64)
	  , tpl = String({}.hasOwnProperty)
	  , SRC = __webpack_require__(70).safe('src')
	  , _toString = Function.toString;
	
	function $redef(O, key, val, safe){
	  if($.isFunction(val)){
	    var base = O[key];
	    $.hide(val, SRC, base ? String(base) : tpl.replace(/hasOwnProperty/, String(key)));
	  }
	  if(O === $.g){
	    O[key] = val;
	  } else {
	    if(!safe)delete O[key];
	    $.hide(O, key, val);
	  }
	}
	
	// add fake Function#toString for correct work wrapped methods / constructors
	// with methods similar to LoDash isNative
	$redef(Function.prototype, 'toString', function toString(){
	  return $.has(this, SRC) ? this[SRC] : _toString.call(this);
	});
	
	$.core.inspectSource = function(it){
	  return _toString.call(it);
	};
	
	module.exports = $redef;

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(64);
	module.exports = function(object, el){
	  var O      = $.toObject(object)
	    , keys   = $.getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(64);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getDesc    = $.getDesc
	    , getSymbols = $.getSymbols;
	  if(getSymbols)$.each.call(getSymbols(it), function(key){
	    if(getDesc(it, key).enumerable)keys.push(key);
	  });
	  return keys;
	};

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(64).g
	  , store  = {};
	module.exports = function(name){
	  return store[name] || (store[name] =
	    global.Symbol && global.Symbol[name] || __webpack_require__(70).safe('Symbol.' + name));
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(64)
	  , enumKeys = __webpack_require__(77);
	// 19.1.2.1 Object.assign(target, source, ...)
	/* eslint-disable no-unused-vars */
	module.exports = Object.assign || function assign(target, source){
	/* eslint-enable no-unused-vars */
	  var T = Object($.assertDefined(target))
	    , l = arguments.length
	    , i = 1;
	  while(l > i){
	    var S      = $.ES5Object(arguments[i++])
	      , keys   = enumKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)T[key = keys[j++]] = S[key];
	  }
	  return T;
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var $      = __webpack_require__(64)
	  , assert = __webpack_require__(71);
	function check(O, proto){
	  assert.obj(O);
	  assert(proto === null || $.isObject(proto), proto, ": can't set as prototype!");
	}
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} // eslint-disable-line
	    ? function(buggy, set){
	        try {
	          set = __webpack_require__(85)(Function.call, $.getDesc(Object.prototype, '__proto__').set, 2);
	          set({}, []);
	        } catch(e){ buggy = true; }
	        return function setPrototypeOf(O, proto){
	          check(O, proto);
	          if(buggy)O.__proto__ = proto;
	          else set(O, proto);
	          return O;
	        };
	      }()
	    : undefined),
	  check: check
	};

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	// true  -> String#at
	// false -> String#codePointAt
	var $ = __webpack_require__(64);
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String($.assertDefined(that))
	      , i = $.toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l
	      || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	        ? TO_STRING ? s.charAt(i) : a
	        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $                 = __webpack_require__(64)
	  , cof               = __webpack_require__(66)
	  , assertObject      = __webpack_require__(71).obj
	  , SYMBOL_ITERATOR   = __webpack_require__(78)('iterator')
	  , FF_ITERATOR       = '@@iterator'
	  , Iterators         = {}
	  , IteratorPrototype = {};
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	setIterator(IteratorPrototype, $.that);
	function setIterator(O, value){
	  $.hide(O, SYMBOL_ITERATOR, value);
	  // Add iterator for FF iterator protocol
	  if(FF_ITERATOR in [])$.hide(O, FF_ITERATOR, value);
	}
	
	module.exports = {
	  // Safari has buggy iterators w/o `next`
	  BUGGY: 'keys' in [] && !('next' in [].keys()),
	  Iterators: Iterators,
	  step: function(done, value){
	    return {value: value, done: !!done};
	  },
	  is: function(it){
	    var O      = Object(it)
	      , Symbol = $.g.Symbol
	      , SYM    = Symbol && Symbol.iterator || FF_ITERATOR;
	    return SYM in O || SYMBOL_ITERATOR in O || $.has(Iterators, cof.classof(O));
	  },
	  get: function(it){
	    var Symbol  = $.g.Symbol
	      , ext     = it[Symbol && Symbol.iterator || FF_ITERATOR]
	      , getIter = ext || it[SYMBOL_ITERATOR] || Iterators[cof.classof(it)];
	    return assertObject(getIter.call(it));
	  },
	  set: setIterator,
	  create: function(Constructor, NAME, next, proto){
	    Constructor.prototype = $.create(proto || IteratorPrototype, {next: $.desc(1, next)});
	    cof.set(Constructor, NAME + ' Iterator');
	  }
	};

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var $def            = __webpack_require__(67)
	  , $redef          = __webpack_require__(75)
	  , $               = __webpack_require__(64)
	  , cof             = __webpack_require__(66)
	  , $iter           = __webpack_require__(82)
	  , SYMBOL_ITERATOR = __webpack_require__(78)('iterator')
	  , FF_ITERATOR     = '@@iterator'
	  , KEYS            = 'keys'
	  , VALUES          = 'values'
	  , Iterators       = $iter.Iterators;
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
	  $iter.create(Constructor, NAME, next);
	  function createMethod(kind){
	    function $$(that){
	      return new Constructor(that, kind);
	    }
	    switch(kind){
	      case KEYS: return function keys(){ return $$(this); };
	      case VALUES: return function values(){ return $$(this); };
	    } return function entries(){ return $$(this); };
	  }
	  var TAG      = NAME + ' Iterator'
	    , proto    = Base.prototype
	    , _native  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , _default = _native || createMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if(_native){
	    var IteratorPrototype = $.getProto(_default.call(new Base));
	    // Set @@toStringTag to native iterators
	    cof.set(IteratorPrototype, TAG, true);
	    // FF fix
	    if($.FW && $.has(proto, FF_ITERATOR))$iter.set(IteratorPrototype, $.that);
	  }
	  // Define iterator
	  if($.FW)$iter.set(proto, _default);
	  // Plug for library
	  Iterators[NAME] = _default;
	  Iterators[TAG]  = $.that;
	  if(DEFAULT){
	    methods = {
	      keys:    IS_SET            ? _default : createMethod(KEYS),
	      values:  DEFAULT == VALUES ? _default : createMethod(VALUES),
	      entries: DEFAULT != VALUES ? _default : createMethod('entries')
	    };
	    if(FORCE)for(key in methods){
	      if(!(key in proto))$redef(proto, key, methods[key]);
	    } else $def($def.P + $def.F * $iter.BUGGY, NAME, methods);
	  }
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $ = __webpack_require__(64);
	
	module.exports = function repeat(count){
	  var str = String($.assertDefined(this))
	    , res = ''
	    , n   = $.toInteger(count);
	  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
	  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
	  return res;
	};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	// Optional / simple context binding
	var assertFunction = __webpack_require__(71).fn;
	module.exports = function(fn, that, length){
	  assertFunction(fn);
	  if(~length && that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  } return function(/* ...args */){
	      return fn.apply(that, arguments);
	    };
	};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var assertObject = __webpack_require__(71).obj;
	function close(iterator){
	  var ret = iterator['return'];
	  if(ret !== undefined)assertObject(ret.call(iterator));
	}
	function call(iterator, fn, value, entries){
	  try {
	    return entries ? fn(assertObject(value)[0], value[1]) : fn(value);
	  } catch(e){
	    close(iterator);
	    throw e;
	  }
	}
	call.close = close;
	module.exports = call;

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var SYMBOL_ITERATOR = __webpack_require__(78)('iterator')
	  , SAFE_CLOSING    = false;
	try {
	  var riter = [7][SYMBOL_ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	module.exports = function(exec){
	  if(!SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[SYMBOL_ITERATOR]();
	    iter.next = function(){ safe = true; };
	    arr[SYMBOL_ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.31 Array.prototype[@@unscopables]
	var $           = __webpack_require__(64)
	  , UNSCOPABLES = __webpack_require__(78)('unscopables');
	if($.FW && !(UNSCOPABLES in []))$.hide(Array.prototype, UNSCOPABLES, {});
	module.exports = function(key){
	  if($.FW)[][UNSCOPABLES][key] = true;
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var $       = __webpack_require__(64)
	  , SPECIES = __webpack_require__(78)('species');
	module.exports = function(C){
	  if($.DESC && !(SPECIES in C))$.setDesc(C, SPECIES, {
	    configurable: true,
	    get: $.that
	  });
	};

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var ctx  = __webpack_require__(85)
	  , get  = __webpack_require__(82).get
	  , call = __webpack_require__(86);
	module.exports = function(iterable, entries, fn, that){
	  var iterator = get(iterable)
	    , f        = ctx(fn, that, entries ? 2 : 1)
	    , step;
	  while(!(step = iterator.next()).done){
	    if(call(iterator, f, step.value, entries) === false){
	      return call.close(iterator);
	    }
	  }
	};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $      = __webpack_require__(64)
	  , ctx    = __webpack_require__(85)
	  , cof    = __webpack_require__(66)
	  , invoke = __webpack_require__(68)
	  , cel    = __webpack_require__(65)
	  , global             = $.g
	  , isFunction         = $.isFunction
	  , html               = $.html
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , postMessage        = global.postMessage
	  , addEventListener   = global.addEventListener
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	function run(){
	  var id = +this;
	  if($.has(queue, id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	}
	function listner(event){
	  run.call(event.data);
	}
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!isFunction(setTask) || !isFunction(clearTask)){
	  setTask = function(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(isFunction(fn) ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(cof(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Modern browsers, skip implementation for WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is object
	  } else if(addEventListener && isFunction(postMessage) && !global.importScripts){
	    defer = function(id){
	      postMessage(id, '*');
	    };
	    addEventListener('message', listner, false);
	  // WebWorkers
	  } else if(isFunction(MessageChannel)){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listner;
	    defer = ctx(port.postMessage, port, 1);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var $redef = __webpack_require__(75);
	module.exports = function(target, src){
	  for(var key in src)$redef(target, key, src[key]);
	  return target;
	};

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $        = __webpack_require__(64)
	  , ctx      = __webpack_require__(85)
	  , safe     = __webpack_require__(70).safe
	  , assert   = __webpack_require__(71)
	  , forOf    = __webpack_require__(90)
	  , step     = __webpack_require__(82).step
	  , has      = $.has
	  , set      = $.set
	  , isObject = $.isObject
	  , hide     = $.hide
	  , isExtensible = Object.isExtensible || isObject
	  , ID       = safe('id')
	  , O1       = safe('O1')
	  , LAST     = safe('last')
	  , FIRST    = safe('first')
	  , ITER     = safe('iter')
	  , SIZE     = $.DESC ? safe('size') : 'size'
	  , id       = 0;
	
	function fastKey(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, ID)){
	    // can't set id to frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add id
	    if(!create)return 'E';
	    // add missing object id
	    hide(it, ID, ++id);
	  // return object id with prefix
	  } return 'O' + it[ID];
	}
	
	function getEntry(that, key){
	  // fast case
	  var index = fastKey(key), entry;
	  if(index != 'F')return that[O1][index];
	  // frozen object case
	  for(entry = that[FIRST]; entry; entry = entry.n){
	    if(entry.k == key)return entry;
	  }
	}
	
	module.exports = {
	  getConstructor: function(NAME, IS_MAP, ADDER){
	    function C(){
	      var that     = assert.inst(this, C, NAME)
	        , iterable = arguments[0];
	      set(that, O1, $.create(null));
	      set(that, SIZE, 0);
	      set(that, LAST, undefined);
	      set(that, FIRST, undefined);
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    }
	    __webpack_require__(92)(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear(){
	        for(var that = this, data = that[O1], entry = that[FIRST]; entry; entry = entry.n){
	          entry.r = true;
	          if(entry.p)entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that[FIRST] = that[LAST] = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function(key){
	        var that  = this
	          , entry = getEntry(that, key);
	        if(entry){
	          var next = entry.n
	            , prev = entry.p;
	          delete that[O1][entry.i];
	          entry.r = true;
	          if(prev)prev.n = next;
	          if(next)next.p = prev;
	          if(that[FIRST] == entry)that[FIRST] = next;
	          if(that[LAST] == entry)that[LAST] = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */){
	        var f = ctx(callbackfn, arguments[1], 3)
	          , entry;
	        while(entry = entry ? entry.n : this[FIRST]){
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while(entry && entry.r)entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key){
	        return !!getEntry(this, key);
	      }
	    });
	    if($.DESC)$.setDesc(C.prototype, 'size', {
	      get: function(){
	        return assert.def(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry){
	      entry.v = value;
	    // create new entry
	    } else {
	      that[LAST] = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that[LAST],          // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that[FIRST])that[FIRST] = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index != 'F')that[O1][index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  // add .keys, .values, .entries, [@@iterator]
	  // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	  setIter: function(C, NAME, IS_MAP){
	    __webpack_require__(83)(C, NAME, function(iterated, kind){
	      set(this, ITER, {o: iterated, k: kind});
	    }, function(){
	      var iter  = this[ITER]
	        , kind  = iter.k
	        , entry = iter.l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!iter.o || !(iter.l = entry = entry ? entry.n : iter.o[FIRST])){
	        // or finish the iteration
	        iter.o = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if(kind == 'keys'  )return step(0, entry.k);
	      if(kind == 'values')return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);
	  }
	};

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $     = __webpack_require__(64)
	  , $def  = __webpack_require__(67)
	  , BUGGY = __webpack_require__(82).BUGGY
	  , forOf = __webpack_require__(90)
	  , species = __webpack_require__(89)
	  , assertInstance = __webpack_require__(71).inst;
	
	module.exports = function(NAME, methods, common, IS_MAP, IS_WEAK){
	  var Base  = $.g[NAME]
	    , C     = Base
	    , ADDER = IS_MAP ? 'set' : 'add'
	    , proto = C && C.prototype
	    , O     = {};
	  function fixMethod(KEY, CHAIN){
	    if($.FW){
	      var method = proto[KEY];
	      __webpack_require__(75)(proto, KEY, function(a, b){
	        var result = method.call(this, a === 0 ? 0 : a, b);
	        return CHAIN ? this : result;
	      });
	    }
	  }
	  if(!$.isFunction(C) || !(IS_WEAK || !BUGGY && proto.forEach && proto.entries)){
	    // create collection constructor
	    C = common.getConstructor(NAME, IS_MAP, ADDER);
	    __webpack_require__(92)(C.prototype, methods);
	  } else {
	    var inst  = new C
	      , chain = inst[ADDER](IS_WEAK ? {} : -0, 1)
	      , buggyZero;
	    // wrap for init collections from iterable
	    if(!__webpack_require__(87)(function(iter){ new C(iter); })){ // eslint-disable-line no-new
	      C = function(){
	        assertInstance(this, C, NAME);
	        var that     = new Base
	          , iterable = arguments[0];
	        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	        return that;
	      };
	      C.prototype = proto;
	      if($.FW)proto.constructor = C;
	    }
	    IS_WEAK || inst.forEach(function(val, key){
	      buggyZero = 1 / key === -Infinity;
	    });
	    // fix converting -0 key to +0
	    if(buggyZero){
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }
	    // + fix .add & .set for chaining
	    if(buggyZero || chain !== inst)fixMethod(ADDER, true);
	  }
	
	  __webpack_require__(66).set(C, NAME);
	
	  O[NAME] = C;
	  $def($def.G + $def.W + $def.F * (C != Base), O);
	  species(C);
	  species($.core[NAME]); // for wrapper
	
	  if(!IS_WEAK)common.setIter(C, NAME, IS_MAP);
	
	  return C;
	};

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $         = __webpack_require__(64)
	  , safe      = __webpack_require__(70).safe
	  , assert    = __webpack_require__(71)
	  , forOf     = __webpack_require__(90)
	  , _has      = $.has
	  , isObject  = $.isObject
	  , hide      = $.hide
	  , isExtensible = Object.isExtensible || isObject
	  , id        = 0
	  , ID        = safe('id')
	  , WEAK      = safe('weak')
	  , LEAK      = safe('leak')
	  , method    = __webpack_require__(69)
	  , find      = method(5)
	  , findIndex = method(6);
	function findFrozen(store, key){
	  return find(store.array, function(it){
	    return it[0] === key;
	  });
	}
	// fallback for frozen keys
	function leakStore(that){
	  return that[LEAK] || hide(that, LEAK, {
	    array: [],
	    get: function(key){
	      var entry = findFrozen(this, key);
	      if(entry)return entry[1];
	    },
	    has: function(key){
	      return !!findFrozen(this, key);
	    },
	    set: function(key, value){
	      var entry = findFrozen(this, key);
	      if(entry)entry[1] = value;
	      else this.array.push([key, value]);
	    },
	    'delete': function(key){
	      var index = findIndex(this.array, function(it){
	        return it[0] === key;
	      });
	      if(~index)this.array.splice(index, 1);
	      return !!~index;
	    }
	  })[LEAK];
	}
	
	module.exports = {
	  getConstructor: function(NAME, IS_MAP, ADDER){
	    function C(){
	      $.set(assert.inst(this, C, NAME), ID, id++);
	      var iterable = arguments[0];
	      if(iterable != undefined)forOf(iterable, IS_MAP, this[ADDER], this);
	    }
	    __webpack_require__(92)(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function(key){
	        if(!isObject(key))return false;
	        if(!isExtensible(key))return leakStore(this)['delete'](key);
	        return _has(key, WEAK) && _has(key[WEAK], this[ID]) && delete key[WEAK][this[ID]];
	      },
	      // 23.3.3.4 WeakMap.prototype.has(key)
	      // 23.4.3.4 WeakSet.prototype.has(value)
	      has: function has(key){
	        if(!isObject(key))return false;
	        if(!isExtensible(key))return leakStore(this).has(key);
	        return _has(key, WEAK) && _has(key[WEAK], this[ID]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    if(!isExtensible(assert.obj(key))){
	      leakStore(that).set(key, value);
	    } else {
	      _has(key, WEAK) || hide(key, WEAK, {});
	      key[WEAK][that[ID]] = value;
	    } return that;
	  },
	  leakStore: leakStore,
	  WEAK: WEAK,
	  ID: ID
	};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var $            = __webpack_require__(64)
	  , assertObject = __webpack_require__(71).obj;
	module.exports = function ownKeys(it){
	  assertObject(it);
	  var keys       = $.getNames(it)
	    , getSymbols = $.getSymbols;
	  return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	// http://wiki.ecmascript.org/doku.php?id=strawman:string_padding
	var $      = __webpack_require__(64)
	  , repeat = __webpack_require__(84);
	
	module.exports = function(that, minLength, fillChar, left){
	  // 1. Let O be CheckObjectCoercible(this value).
	  // 2. Let S be ToString(O).
	  var S = String($.assertDefined(that));
	  // 4. If intMinLength is undefined, return S.
	  if(minLength === undefined)return S;
	  // 4. Let intMinLength be ToInteger(minLength).
	  var intMinLength = $.toInteger(minLength);
	  // 5. Let fillLen be the number of characters in S minus intMinLength.
	  var fillLen = intMinLength - S.length;
	  // 6. If fillLen < 0, then throw a RangeError exception.
	  // 7. If fillLen is +∞, then throw a RangeError exception.
	  if(fillLen < 0 || fillLen === Infinity){
	    throw new RangeError('Cannot satisfy string length ' + minLength + ' for string: ' + S);
	  }
	  // 8. Let sFillStr be the string represented by fillStr.
	  // 9. If sFillStr is undefined, let sFillStr be a space character.
	  var sFillStr = fillChar === undefined ? ' ' : String(fillChar);
	  // 10. Let sFillVal be a String made of sFillStr, repeated until fillLen is met.
	  var sFillVal = repeat.call(sFillStr, Math.ceil(fillLen / sFillStr.length));
	  // truncate if we overflowed
	  if(sFillVal.length > fillLen)sFillVal = left
	    ? sFillVal.slice(sFillVal.length - fillLen)
	    : sFillVal.slice(0, fillLen);
	  // 11. Return a string made from sFillVal, followed by S.
	  // 11. Return a String made from S, followed by sFillVal.
	  return left ? sFillVal.concat(S) : S.concat(sFillVal);
	};

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $def  = __webpack_require__(67)
	  , forOf = __webpack_require__(90);
	module.exports = function(NAME){
	  $def($def.P, NAME, {
	    toJSON: function toJSON(){
	      var arr = [];
	      forOf(this, false, arr.push, arr);
	      return arr;
	    }
	  });
	};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $      = __webpack_require__(64)
	  , invoke = __webpack_require__(68)
	  , assertFunction = __webpack_require__(71).fn;
	module.exports = function(/* ...pargs */){
	  var fn     = assertFunction(this)
	    , length = arguments.length
	    , pargs  = Array(length)
	    , i      = 0
	    , _      = $.path._
	    , holder = false;
	  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
	  return function(/* ...args */){
	    var that    = this
	      , _length = arguments.length
	      , j = 0, k = 0, args;
	    if(!holder && !_length)return invoke(fn, pargs, that);
	    args = pargs.slice();
	    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = arguments[k++];
	    while(_length > k)args.push(arguments[k++]);
	    return invoke(fn, args, that);
	  };
	};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function($){
	  $.FW   = true;
	  $.path = $.g;
	  return $;
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=bundle.js.map