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
     * @property url - The URL to fetch
     * @property executeScripts - If true will find and execute scripts in the response body
     * @property mountPoint - A selector used to find the element to mount to within the element (defaults to the root element)
     * @property autoRefresh - Will call `refresh()` automatically at the specified interval (Intervals are in the format `${num}${unit}` where unit is one of ms, s, m, h: `10s` = 10 seconds)
     * @property delay - An artificial delay applied before displaying the content
     */ function init() {
                var _this = this;
                return _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                    var interval;
                    return regeneratorRuntime.wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _this.contents = "";
                                // Keep track of pending requests so we can cancel when updating multiple things
                                _this._reqAbort = [];
                                _this.autoRefresh = parseBoolean(_this.autoRefresh);
                                _this.executeScripts = parseBoolean(_this.executeScripts);
                                if (_this.autoRefresh) {
                                    interval = parseDuration(_this.autoRefresh);
                                    _this.setAutoRefresh(interval);
                                }
                                if (!_this.delay) _this.delay = 0;
                            case 6:
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
            value: function render() {
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
     */ key: "bind",
            value: function bind() {
                _get(_getPrototypeOf(DynamicFrame.prototype), "bind", this).call(this);
                // Find the mount point
                if (this.mountPoint && typeof this.mountPoint === "string") {
                    this.mountPoint = this.querySelector(this.mountPoint);
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
     */ key: "setAutoRefresh",
            value: function setAutoRefresh(interval) {
                var _this = this;
                if (interval === undefined) {
                    console.error("[".concat(this.tag, "] Undefined interval passed to setAutoRefresh"));
                    return;
                }
                if (this.__internal__.autoRefreshInterval) {
                    window.clearInterval(this.__internal__.autoRefreshInterval);
                }
                this.__internal__.autoRefreshInterval = window.setInterval(function() {
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
     * @param mode - replace or append
     * @returns boolean - true on success
     */ function loadContent(e) {
                var mode = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "replace";
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
                                        return setTimeout(resolve, _this.delay);
                                    }),
                                    sendReq(), 
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
     */ key: "findAndExecuteScripts",
            value: function findAndExecuteScripts() {
                var _this = this;
                if (!this.executeScripts) return;
                var scripts = this.querySelectorAll("script");
                if (!scripts) return;
                _toConsumableArray(scripts).forEach(function(script) {
                    var newScript = document.createElement("script");
                    newScript.setAttribute("type", "text/javascript");
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
     * @param mode - replace or append
     */ key: "updateContent",
            value: function updateContent(content) {
                var mode = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "replace";
                // TODO: Might want to use morphdom here
                if (mode === "replace") {
                    this.mountPoint.innerHTML = content;
                } else if (mode === "append") {
                    this.mountPoint.insertAdjacentHTML("beforeEnd", content);
                }
            }
        },
        {
            /**
     * Returns the query string params for the request - expected to be overridden
     * Handles arrays as duplicated params (ie. a: [1,2] => ?a=1&a=2)
     * @returns {URLSearchParams}
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
                    for(var _iterator = this.root.attributes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
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
     */ key: "endpoint",
            value: function endpoint() {
                var url = this.url;
                if (!this.url) {
                    console.error("".concat(this.tag, ": No :url attribute specified"));
                    return;
                }
                if (!url.startsWith("http")) url = window.location.origin + url;
                return new URL(url);
            }
        }
    ]);
    return DynamicFrame;
}(Controller);
export { DynamicFrame };
