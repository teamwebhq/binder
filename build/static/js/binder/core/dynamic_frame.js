function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
        _get = Reflect.get;
    } else {
        _get = function _get(target, property, receiver) {
            var base = _superPropBase(target, property);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
                return desc.get.call(receiver);
            }
            return desc.value;
        };
    }
    return _get(target, property, receiver || target);
}
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}
function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _superPropBase(object, property) {
    while(!Object.prototype.hasOwnProperty.call(object, property)){
        object = _getPrototypeOf(object);
        if (object === null) break;
    }
    return object;
}
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
var _typeof = function(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
    };
}
import regeneratorRuntime from "regenerator-runtime";
import { Controller } from "../controller.js";
import { parseDuration, parseBoolean } from "../util.js";
/*
This is the base controller for DynamicFrames
Extend this and override params() and optionally replaceContent()

The root HTML node must have a `:url` attribute - this can be relative or absolute
To pass params use the attribute format `:param-name`

Example HTML:
<dynamic-frame :url="/some/url" :param-day="Monday"></dynamic-frame>
*/ /**
 * @class
 * @name DynamicFrame
 * @namespace DynamicFrame
 * @property url - The URL to fetch
 * @property executeScripts - If true will find and execute scripts in the response body
 * @property mode - The mode to use for adding the response content, either `replace`, `append` or `prepend` (Defaults to `replace`)
 * @property mountPoint - A selector used to find the element to mount to within the element (defaults to the root element)
 * @property autoRefresh - Will call `refresh()` automatically at the specified interval (Intervals are in the format `${num}${unit}` where unit is one of ms, s, m, h: `10s` = 10 seconds)
 * @property delay - An artificial delay applied before displaying the content
 * @property stateKey - An optional key, if specified the frame state will be stored and loaded from the page query string
 * @property contained - If `true` then the frame will be self contained, clicking links and submitting forms will be handled within the frame and **not** impact the surrounding page
 * @example
 *  <dynamic-frame :url="/some/url" :param-day="Monday" :mount-point=".content">
 *     <div class="content"></div>
 *  </dynamic-frame>
 */ var DynamicFrame = /*#__PURE__*/ function(Controller1) {
    "use strict";
    _inherits(DynamicFrame, Controller1);
    var _super = _createSuper(DynamicFrame);
    function DynamicFrame() {
        _classCallCheck(this, DynamicFrame);
        return _super.apply(this, arguments);
    }
    _createClass(DynamicFrame, [
        {
            key: "init",
            value: /**
     * Setup the DynamicFrame and do the initial request/load
     * @memberof! DynamicFrame
     *
     */ function init() {
                var _this = this;
                return _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                    var interval, handleStateChange;
                    return regeneratorRuntime.wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _this.contents = "";
                                // Keep track of pending requests so we can cancel when updating multiple things
                                _this._reqAbort = [];
                                _this.args.executeScripts = parseBoolean(_this.args.executeScripts);
                                if (_this.args.autoRefresh) {
                                    interval = parseDuration(_this.args.autoRefresh);
                                    _this.setAutoRefresh(interval);
                                }
                                if (!_this.args.delay) _this.args.delay = 0;
                                // If we have a stateKey then track and handle the state
                                if (_this.args.stateKey) {
                                    _this.loadState();
                                    handleStateChange = function() {
                                        var qs = _this.loadState();
                                        if (_this._internal.currentQs !== qs) {
                                            _this._internal.currentQs = qs;
                                            _this.refresh();
                                        }
                                    };
                                    // When the history state changes then reload our state
                                    // This is triggered when going back and forward in the browser
                                    window.addEventListener("popstate", function() {
                                        return handleStateChange();
                                    });
                                    window.addEventListener("pushstate", function() {
                                        return handleStateChange();
                                    });
                                }
                                if (parseBoolean(_this.args.contained)) {
                                    _this.containFrame();
                                }
                            case 7:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee);
                }))();
            }
        },
        {
            key: "refresh",
            value: /**
     * Alias for `render()`
     * @memberof! DynamicFrame
     */ function refresh() {
                var _this = this;
                return _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                    return regeneratorRuntime.wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.next = 2;
                                return _this.render();
                            case 2:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee);
                }))();
            }
        },
        {
            key: "render",
            value: /**
     * Reload the frame content
     * @memberof! DynamicFrame
     */ function render() {
                var _this = this;
                var _this1 = this, _superprop_get_render = function() {
                    return _get(_getPrototypeOf(DynamicFrame.prototype), "render", _this);
                };
                return _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                    return regeneratorRuntime.wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.next = 2;
                                return _this1.loadContent();
                            case 2:
                                _ctx.next = 4;
                                return _superprop_get_render().call(_this1);
                            case 4:
                                _this1.saveState();
                            case 5:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee);
                }))();
            }
        },
        {
            /**
     * Call the base `bind()` and re-find the mountPoint in case it's changed
     * @memberof! DynamicFrame
     */ key: "bind",
            value: function bind() {
                _get(_getPrototypeOf(DynamicFrame.prototype), "bind", this).call(this);
                // Find the mount point
                if (this.args.mountPoint && typeof this.args.mountPoint === "string") {
                    this.mountPoint = this.querySelector(this.args.mountPoint);
                }
                if (!this.mountPoint) {
                    this.mountPoint = this.root;
                }
            }
        },
        {
            /**
     * Sets an interval to auto call `this.refresh()`
     * Overwrites previously set refresh intervals
     * @param {*} interval Duration in milliseconds
     * @memberof! DynamicFrame
     */ key: "setAutoRefresh",
            value: function setAutoRefresh(interval) {
                var _this = this;
                if (interval === undefined) {
                    console.error("[".concat(this.tag, "] Undefined interval passed to setAutoRefresh"));
                    return;
                }
                if (this._internal.autoRefreshInterval) {
                    window.clearInterval(this._internal.autoRefreshInterval);
                }
                this._internal.autoRefreshInterval = window.setInterval(function() {
                    return _this.refresh();
                }, interval);
            }
        },
        {
            key: "loadContent",
            value: /**
     * [async] Makes a new request and replaces or appends the response to the mountPoint
     * Returns true on success
     * Multiple calls will abort previous requests and return false
     * @returns boolean - true on success
     * @memberof! DynamicFrame
     */ function loadContent(e) {
                var _this = this;
                return _asyncToGenerator(regeneratorRuntime.mark(function _callee1() {
                    var url, abortController, ok, sendReq;
                    return regeneratorRuntime.wrap(function _callee$(_ctx1) {
                        while(1)switch(_ctx1.prev = _ctx1.next){
                            case 0:
                                url = _this.endpoint();
                                url.search = new URLSearchParams(_this.params());
                                // Keep track of all pending requests so we can abort them on duplicate calls
                                _this._reqAbort.forEach(function(controller) {
                                    return controller.abort();
                                });
                                _this._reqAbort = [];
                                abortController = new AbortController();
                                _this._reqAbort.push(abortController);
                                ok = true;
                                sendReq = function() {
                                    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                                        var response, text;
                                        return regeneratorRuntime.wrap(function _callee$(_ctx) {
                                            while(1)switch(_ctx.prev = _ctx.next){
                                                case 0:
                                                    _ctx.prev = 0;
                                                    _ctx.next = 3;
                                                    return fetch(url, {
                                                        signal: abortController.signal
                                                    });
                                                case 3:
                                                    response = _ctx.sent;
                                                    _ctx.next = 6;
                                                    return response.text();
                                                case 6:
                                                    text = _ctx.sent;
                                                    _this.updateContent(text);
                                                    _this.findAndExecuteScripts();
                                                    _ctx.next = 15;
                                                    break;
                                                case 11:
                                                    _ctx.prev = 11;
                                                    _ctx.t0 = _ctx["catch"](0);
                                                    console.error(_ctx.t0);
                                                    ok = false;
                                                case 15:
                                                case "end":
                                                    return _ctx.stop();
                                            }
                                        }, _callee, null, [
                                            [
                                                0,
                                                11
                                            ]
                                        ]);
                                    }));
                                    return function sendReq() {
                                        return _ref.apply(this, arguments);
                                    };
                                }();
                                _ctx1.next = 10;
                                return Promise.allSettled([
                                    new Promise(function(resolve) {
                                        return setTimeout(resolve, _this.args.delay);
                                    }),
                                    sendReq()
                                ]);
                            case 10:
                                return _ctx1.abrupt("return", ok);
                            case 11:
                            case "end":
                                return _ctx1.stop();
                        }
                    }, _callee1);
                }))();
            }
        },
        {
            /**
     * Called during `loadContent()`
     * Will find all script tags within the frame and execute them
     * Only if the frame has the `execute-scripts` attribute set to true
     * @memberof! DynamicFrame
     */ key: "findAndExecuteScripts",
            value: function findAndExecuteScripts() {
                var _this = this;
                if (!this.args.executeScripts) return;
                var scripts = this.querySelectorAll("script");
                if (!scripts) return;
                _toConsumableArray(scripts).forEach(function(script) {
                    var newScript = document.createElement("script");
                    newScript.setAttribute("type", script.type || "text/javascript");
                    if (script.getAttribute("src")) {
                        newScript.setAttribute("src", script.getAttribute("src"));
                        _this.appendChild(newScript);
                    } else {
                        newScript.appendChild(document.createTextNode(script.innerHTML));
                        _this.appendChild(newScript);
                    }
                });
            }
        },
        {
            /**
     * Actually updates the content
     * This is where the artificial delay is applied
     * @param content - The content to use
     * @param mode - replace or append, defaults to `this.args.mode`
     * @memberof! DynamicFrame
     */ key: "updateContent",
            value: function updateContent(content) {
                var mode = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
                if (!mode) mode = this.args.mode || "replace";
                if (mode === "replace") {
                    this.mountPoint.innerHTML = content;
                } else if (mode === "append") {
                    this.mountPoint.insertAdjacentHTML("beforeEnd", content);
                } else if (mode === "prepend") {
                    this.mountPoint.insertAdjacentHTML("afterBegin", content);
                }
            }
        },
        {
            /**
     * Returns the query string params for the request - expected to be overridden
     * Handles arrays as duplicated params (ie. a: [1,2] => ?a=1&a=2)
     * @returns {URLSearchParams}
     * @memberof! DynamicFrame
     */ key: "params",
            value: function params() {
                var values = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                var params1 = new URLSearchParams(values);
                // Annoyingly URLSearchParams can't handle array params unless you call .append each time
                // So find any array params and re-add them manually
                Object.entries(values).forEach(function(param) {
                    var _param = _slicedToArray(param, 2), key = _param[0], val = _param[1];
                    if (Array.isArray(val)) {
                        params1.delete(key);
                        val.forEach(function(item) {
                            return params1.append(key, item);
                        });
                    }
                });
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this.attributes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var attr = _step.value;
                        if (attr.nodeName.startsWith(":param-")) {
                            params1.append(attr.nodeName.substr(7), attr.nodeValue);
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return params1;
            }
        },
        {
            /**
     * Returns the endpoint to call - from the data-url attr on the root element
     * @returns {string}
     * @memberof! DynamicFrame
     */ key: "endpoint",
            value: function endpoint() {
                var url = this.args.url;
                if (!this.args.url) {
                    console.error("".concat(this.tag, ": No :url attribute specified"));
                    return;
                }
                if (!url.startsWith("http")) url = window.location.origin + url;
                return new URL(url);
            }
        },
        {
            /**
     * Load the frame state based on the URL query string
     */ key: "loadState",
            value: function loadState() {
                if (!this.args.stateKey) return;
                var qs = window.location.search;
                if (!qs) return;
                qs = qs.substring(1);
                var qsParts = Object.fromEntries(qs.split("&").map(function(part) {
                    return part.split("=");
                }));
                if (qsParts["".concat(this.args.stateKey, "-url")]) {
                    this.args.url = qsParts["".concat(this.args.stateKey, "-url")];
                    delete qsParts["".concat(this.args.stateKey, "-url")];
                }
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = Object.entries(qsParts)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _value = _slicedToArray(_step.value, 2), key = _value[0], value = _value[1];
                        // Ignore other state keys
                        // TODO: It might be better to make the state keys easier to identify
                        // I can see these two cases being used for real parameters, in which case we drop them
                        if (key.endsWith("-url") || key.includes("-param-")) continue;
                        key = key.replace("".concat(this.args.stateKey, "-param-"), "");
                        this.setAttribute(":param-".concat(key), value);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return qs;
            }
        },
        {
            /**
     * Save the frame state to the URL query string
     * Only saves if the state has changed
     */ key: "saveState",
            value: function saveState() {
                if (!this.args.stateKey) return;
                var qsParts = Object.fromEntries(new URLSearchParams(window.location.search));
                qsParts["".concat(this.args.stateKey, "-url")] = this.args.url;
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this.params()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var _value = _slicedToArray(_step.value, 2), key = _value[0], value = _value[1];
                        qsParts["".concat(this.args.stateKey, "-param-").concat(key)] = value;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                var qs = Object.entries(qsParts).map(function(part) {
                    return "".concat(part[0], "=").concat(part[1]);
                }).join("&");
                if (this._internal.currentQs !== qs) {
                    window.history.pushState(qs, "", "?".concat(qs));
                    this._internal.currentQs = qs;
                }
            }
        },
        {
            /**
     * Makes the frame self contained
     * Clicking any links or submitting any forms will only impact the frame, not the surrounding page
     */ key: "containFrame",
            value: function containFrame() {
                var _this = this;
                // Capture all clicks and if it was on an <a> tag load the href within the frame
                this.addEventListener("click", function(e) {
                    var target = e.target || e.srcElement;
                    if (target.tagName === "A" && _this.belongsToController(target)) {
                        var href = target.getAttribute("href");
                        _this.args.url = href;
                        _this.render();
                        e.preventDefault();
                    }
                });
                var _this2 = this;
                // Intercept form submits
                // To do this we need to submit the form ourselves
                // Aims to have near-full feature parity with regular HTML forms
                // We do not support the `target` attribute or the `method="dialog"` value
                // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form
                this.addEventListener("submit", function() {
                    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(e) {
                        var method, action, encoding, skipValidation, formData, response, query;
                        return regeneratorRuntime.wrap(function _callee$(_ctx) {
                            while(1)switch(_ctx.prev = _ctx.next){
                                case 0:
                                    e.preventDefault();
                                    method = e.target.getAttribute("method") || "GET";
                                    action = e.target.getAttribute("action") || "/";
                                    encoding = e.target.getAttribute("enctype") || "application/x-www-form-urlencoded";
                                    skipValidation = e.target.getAttribute("novalidate") !== undefined;
                                    if (!(!skipValidation && !e.target.checkValidity())) {
                                        _ctx.next = 8;
                                        break;
                                    }
                                    console.warn("Form is not valid");
                                    return _ctx.abrupt("return");
                                case 8:
                                    formData = new FormData(e.target);
                                    if (!(method.toUpperCase() == "POST")) {
                                        _ctx.next = 22;
                                        break;
                                    }
                                    _ctx.next = 12;
                                    return fetch(action, {
                                        method: "POST",
                                        body: formData,
                                        headers: {
                                            "Content-Type": encoding
                                        }
                                    });
                                case 12:
                                    response = _ctx.sent;
                                    if (!response.redirected) {
                                        _ctx.next = 17;
                                        break;
                                    }
                                    {
                                        // If we have a redirect then follow it
                                        _this2.args.url = response.url;
                                        _this2.render();
                                    }
                                    _ctx.next = 20;
                                    break;
                                case 17:
                                    _ctx.next = 19;
                                    return response.text();
                                case 19:
                                    // Otherwise show the response body
                                    _this2.innerHTML = _ctx.sent;
                                case 20:
                                    _ctx.next = 23;
                                    break;
                                case 22:
                                    if (method.toUpperCase() == "GET") {
                                        query = new URLSearchParams(formData);
                                        _this2.args.url = "".concat(action, "?").concat(query.toString());
                                        _this2.render();
                                    }
                                case 23:
                                    return _ctx.abrupt("return", false);
                                case 24:
                                case "end":
                                    return _ctx.stop();
                            }
                        }, _callee);
                    }));
                    return function(e) {
                        return _ref.apply(this, arguments);
                    };
                }());
            }
        }
    ]);
    return DynamicFrame;
}(Controller);
export { DynamicFrame };
