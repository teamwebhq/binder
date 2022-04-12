function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
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
function _checkPrivateRedeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
        throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _classPrivateMethodGet(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return fn;
}
function _classPrivateMethodInit(obj, privateSet) {
    _checkPrivateRedeclaration(obj, privateSet);
    privateSet.add(obj);
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
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
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
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key]);
        });
    }
    return target;
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
import { kebabToCamel, permutations, parseDuration, parseBoolean } from "./util.js";
/**
 * Dynamically create a new Controller class extending an existing element class
 * @param {Element} base The element to inherit from
 * @param {string} name The name of the built in HTML tag to extend
 * @returns Controller class
 */ var makeController = function() {
    var base1 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : HTMLElement, extendTag = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    var /**
         * @method
         * @private
         * @name findRenderableElements
         * @memberof! Controller
         * @description Find all elements on the controller which have @render attributes
         * @render is a special action that let's the controller know to render this elements content when the render() method is called
         */ findRenderableElements = function findRenderableElements() {
        var _this = this;
        return _toConsumableArray(this.root.querySelectorAll("[\\@render]")).concat(_toConsumableArray(this.root.querySelectorAll("[\\@render\\.eval]"))).filter(function(el) {
            return _classPrivateMethodGet(_this, _belongsToController, belongsToController).call(_this, el);
        });
    };
    var /**
         * @method
         * @private
         * @name bindArgs
         * @memberof! Controller
         * @description Bind all attributes on the controller tag into the instance under `this`
         * Convert kebab-case to camelCase
         * EG. <controller :some-arg="150" /> will set `this.someArg = 150`
         */ bindArgs = function bindArgs() {
        var _this = this;
        this.args = {};
        this.getAttributeNames().forEach(function(attr) {
            var value = _this.getAttribute(attr);
            var key = kebabToCamel(attr).replace(":", "");
            _this.args[key] = value;
        });
    };
    var /**
         * @method
         * @private
         * @name bindEvents
         * @memberof! Controller
         * @description Finds all events within a controller element
         * Events are in the format `@{eventType}={method}"`
         * EG. @click="handleClick"
         *
         * The attribute key can also end with a combination of modifiers:
         * - `.prevent`: Automatically calls `event.preventDefault()`
         * - `.eval`: Will evaluate the attribute value
         */ bindEvents = function bindEvents() {
        var _this3 = this;
        // We need to delete all events and before binding
        // Otherwise we would end up with duplicate events upon muliple bind() calls
        this._events.forEach(function(e) {
            return e.el.removeEventListener(e.eventType, e.event);
        });
        this._events = [];
        // Now find all configured events
        var eventTypes = [
            "click",
            "change",
            "mouseover",
            "mouseout",
            "keydown",
            "keyup",
            "load"
        ];
        var modifiers = [
            ""
        ].concat(_toConsumableArray(permutations([
            ".prevent",
            ".eval"
        ], true)));
        var bindEvent = function(el, eventType, modifier) {
            var _this1 = _this3;
            var value = el.getAttribute("@".concat(eventType).concat(modifier));
            var action = value.replace("this.", "").replace("()", "");
            var callable = function(event) {
                if (modifier.includes(".prevent")) event.preventDefault();
                if (modifier.includes(".eval")) {
                    var fn = new Function("".concat(value));
                    fn.call(_this1);
                } else {
                    _this1[action](event);
                }
            };
            el.addEventListener(eventType, callable);
            _this3._events.push({
                el: el,
                event: callable,
                eventType: eventType
            });
        };
        eventTypes.forEach(function(eventType) {
            var _this2 = _this3;
            modifiers.forEach(function(modifier) {
                var _this = _this2;
                var escapedModifier = modifier.replace(/\./g, "\\.");
                // Handle events on the root node
                if (_this2.root.hasAttribute("@".concat(eventType).concat(modifier))) {
                    bindEvent(_this2.root, eventType, modifier);
                }
                // Handle events on any children
                _this2.root.querySelectorAll("[\\@".concat(eventType).concat(escapedModifier, "]")).forEach(function(el) {
                    if (!_classPrivateMethodGet(_this, _belongsToController, belongsToController).call(_this, el)) return;
                    bindEvent(el, eventType, modifier);
                });
            });
        });
    };
    var /**
         * @method
         * @private
         * @name bindDataValues
         * @memberof! Controller
         * @description Find all elements within the controller that has a `@bind` attribute
         * Each element will have it's value bound to the controller under `this`
         * The value of the attribute will be converted from kebab-case to camelCase
         *
         * EG. <input @bind="the-input" /> will have it's value bound to `this.theInput`
         */ bindDataValues = function bindDataValues() {
        var _this = this;
        this.data = {};
        var instance1 = this;
        var tagToEvent = {
            "input|text": "keyup",
            "default": "change"
        };
        // Event handlers for various element types
        var handlers = {
            "input|checkbox": function(instance, varName, e) {
                if (!instance.data[varName]) instance.data[varName] = [];
                if (e.target.checked) {
                    instance.data[varName].push(e.target.value);
                } else {
                    instance.data[varName] = instance.data[varName].filter(function(item) {
                        return item !== e.target.value;
                    });
                }
            },
            "select": function(instance, varName, e) {
                if (e.target.getAttribute("multiple") !== null) {
                    instance.data[varName] = Array.from(e.target.selectedOptions).map(function(item) {
                        return item.value;
                    });
                } else {
                    instance.data[varName] = e.target.value;
                }
            },
            "default": function(instance, varName, e) {
                return instance.data[varName] = e.target.value;
            }
        };
        // Logic to actually bind an element to the controller
        var bindData = function(el, modifier) {
            var elType = _classPrivateMethodGet(_this, _getElementType, getElementType).call(_this, el);
            var eventType = tagToEvent[elType] || tagToEvent.default;
            el.addEventListener(eventType, function(e) {
                var varName = el.getAttribute("@bind".concat(modifier)).replace("this.data.", "").replace("this.", "");
                var handler = handlers[elType] || handlers.default;
                handler(instance1, varName, e);
                // If this element is @bind.render this call render()
                if (modifiers.includes(".render")) instance1.render();
            });
        };
        var modifiers = [
            ""
        ].concat(_toConsumableArray(permutations([
            ".render"
        ], true)));
        modifiers.forEach(function(modifier) {
            var _this4 = _this;
            // Handle any binds on the root node
            if (_this.hasAttribute("@bind".concat(modifier))) {
                bindData(_this.root, modifier);
            }
            // Handle any binds on the children
            var escapedModifier = modifier.replace(/\./g, "\\.");
            _this.root.querySelectorAll("[\\@bind".concat(escapedModifier, "]")).forEach(function(el) {
                if (!_classPrivateMethodGet(_this4, _belongsToController, belongsToController).call(_this4, el)) return;
                bindData(el, modifier);
            });
        });
    };
    var /**
         * @method
         * @private
         * @name getElementType
         * @memberof! Controller
         * @description Return the type of an element
         * @param {Element} el The DOM element to check
         * @returns {String} The element type, e.g. 'input|text'
         */ getElementType = function getElementType(el) {
        if (el.tagName.toLowerCase() === "input") {
            return [
                el.tagName,
                el.type
            ].map(function(item) {
                return item.toLowerCase();
            }).join("|");
        }
        return el.tagName.toLowerCase();
    };
    var /**
         * @method
         * @private
         * @name belongsToController
         * @memberof! Controller
         * @description Return true if the given element belongs to this controller
         * @param {Element} el The controller root DOM element
         * @returns {Boolean} True if the element belongs to the controller
         */ belongsToController = function belongsToController(el) {
        // If we're using the shadow DOM then we only see this controllers children so it must belong to the controller
        if (this.hasShadow) return true;
        var closestController = el.closest("[data-controller]");
        if (closestController == null) return false;
        if (closestController.getAttribute("data-controller") !== this.localName) return false;
        return true;
    };
    var _findRenderableElements, _bindArgs, _bindEvents, _bindDataValues, _getElementType, _belongsToController, _class1;
    /**
     * @class
     * @name Controller
     * @namespace Controller
     */ var CoreController = (_findRenderableElements = /*#__PURE__*/ new WeakSet(), _bindArgs = /*#__PURE__*/ new WeakSet(), _bindEvents = /*#__PURE__*/ new WeakSet(), _bindDataValues = /*#__PURE__*/ new WeakSet(), _getElementType = /*#__PURE__*/ new WeakSet(), _belongsToController = /*#__PURE__*/ new WeakSet(), _class1 = /*#__PURE__*/ function(base) {
        "use strict";
        _inherits(_class, base);
        var _super = _createSuper(_class);
        function _class(args) {
            _classCallCheck(this, _class);
            var _this;
            _this = _super.call(this);
            _classPrivateMethodInit(_assertThisInitialized(_this), _findRenderableElements);
            _classPrivateMethodInit(_assertThisInitialized(_this), _bindArgs);
            _classPrivateMethodInit(_assertThisInitialized(_this), _bindEvents);
            _classPrivateMethodInit(_assertThisInitialized(_this), _bindDataValues);
            _classPrivateMethodInit(_assertThisInitialized(_this), _getElementType);
            _classPrivateMethodInit(_assertThisInitialized(_this), _belongsToController);
            // Store for internal data
            _this._internal = {};
            _this.root = _assertThisInitialized(_this);
            _this.args = args;
            // Keep track of all attached events
            _this._events = [];
            // Handle <self> node
            // By default an empty element will only contain it's `self` content
            // Can also be added manually using <self></self>
            if (_this.innerHTML.trim() === "") _this.innerHTML = "<self></self>";
            _this.self = _this.querySelector("self");
            // Add the data-controller attribute to the element
            _this.setAttribute("data-controller", _this.localName);
            _this.template = _this.root.querySelector("template");
            // If the component has a template then we will clone it and render that to the DOM
            // If the template has the :use-shadow attribute then we will clone it onto the shadow DOM
            // This allows isolating the component from the regular DOM (including styles)
            // The template is optional, if not specified then we will do everything directly on the DOM within the component
            if (_this.template) {
                _this.content = _this.template.content.cloneNode(true);
                // Only use the shadowDOM when specified
                if (_this.template.hasAttribute(":use-shadow")) {
                    _this.attachShadow({
                        mode: "open"
                    }).appendChild(_this.content.cloneNode(true));
                    _this.root = _this.shadowRoot;
                    _this.hasShadow = true;
                } else {
                    _this.appendChild(_this.content.cloneNode(true));
                    _this.hasShadow = false;
                }
            }
            return _this;
        }
        _createClass(_class, [
            {
                key: "connectedCallback",
                value: /**
         * @method
         * @name connectCallback
         * @memberof! Controller
         * @description Called when element is rendered in the DOM
         * See: {@link https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks}
         */ function connectedCallback() {
                    var _this = this;
                    return _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                        var interval;
                        return regeneratorRuntime.wrap(function _callee$(_ctx) {
                            while(1)switch(_ctx.prev = _ctx.next){
                                case 0:
                                    if (_this.isConnected) {
                                        _ctx.next = 2;
                                        break;
                                    }
                                    return _ctx.abrupt("return");
                                case 2:
                                    _this.renderOnInit = parseBoolean(_this.renderOnInit || "true");
                                    _this.bind();
                                    _ctx.next = 6;
                                    return _this.init(_this.args);
                                case 6:
                                    if (_this.autoRender) {
                                        interval = parseDuration(_this.autoRender);
                                        _this.setAutoRender(interval);
                                    }
                                    if (_this.renderOnInit) _this.render();
                                case 8:
                                case "end":
                                    return _ctx.stop();
                            }
                        }, _callee);
                    }))();
                }
            },
            {
                /**
         * @method
         * @name attributeChangedCallback
         * @memberof! Controller
         * @description The default implementation of attributeChangedCallback
         * See: {@link https://developers.google.com/web/fundamentals/web-components/customelements#attrchanges}
         * We will convert the attribute name to camel case, strip out the leading `data-` or `aria-` parts and call `set{AttributeName}(oldValue, newValue)` (if it exists)
         * Eg. A change to `data-disabled` will call `setDisabled(oldValue, newValue)`
         * @param {string} name The name of the attribute that changed
         * @param {string} oldValue The old value of the attribute
         * @param {string} newValue The new value of the attribute
         */ key: "attributeChangedCallback",
                value: function attributeChangedCallback(name, oldValue, newValue) {
                    var handler = name.replace(/^data-/, "");
                    handler = handler.replace(/^aria-/, "");
                    handler = kebabToCamel(handler);
                    handler = "set".concat(handler.charAt(0).toUpperCase()).concat(handler.slice(1));
                    if (handler in this && typeof this[handler] === "function") {
                        this[handler](oldValue, newValue);
                    }
                }
            },
            {
                /**
         * @method
         * @name Controller#emit
         * @memberof! Controller
         * @description Emit a new event from this controller
         * @param {string} eventName The name of the event, automatically prefixed with `${this.localName}:`
         * @param {object} detail Optional object that is passed in the event under the key `detail`
         * @param {object} config Optional configuration object that can be passed to `new CustomEvent()`
         */ key: "emit",
                value: function emit(eventName) {
                    var detail = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, config = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                    window.dispatchEvent(new CustomEvent(eventName, _objectSpread({
                        bubbles: true,
                        cancelable: true,
                        composed: true,
                        detail: detail
                    }, config)));
                }
            },
            {
                /**
         * @method
         * @name listenFor
         * @memberof! Controller
         * @description Listens for an event to be fired from a child element
         * @param {string} elementName The child element tag name to listen for
         * @param {string} eventName The name of the event to listen for
         * @param {function} callback The callback to call when the event is fired
         */ key: "listenFor",
                value: function listenFor(eventName, callback) {
                    window.addEventListener(eventName, function(e) {
                        return callback(e);
                    });
                }
            },
            {
                /**
         * @method
         * @name bind
         * @memberof! Controller
         * @description Initializes the controller instance
         * Can be called manaually when the child elements change to force refreshing the controller state
         * eg. re-attach events etc...
         */ key: "bind",
                value: function bind() {
                    // TODO: Might be useful to bind a specific node/tree
                    // We only want to configure the arguments on the first bind()
                    if (!this._internal.bound) {
                        _classPrivateMethodGet(this, _bindArgs, bindArgs).call(this);
                    }
                    ;
                    _classPrivateMethodGet(this, _bindEvents, bindEvents).call(this);
                    _classPrivateMethodGet(this, _bindDataValues, bindDataValues).call(this);
                    this._internal.bound = true;
                }
            },
            {
                /**
         * @method
         * @name setAutoRender
         * @memberof! Controller
         * @description Sets an interval to auto call `this.render()`
         * Overwrites previously set render intervals
         * @param {*} interval Duration in milliseconds
         */ key: "setAutoRender",
                value: function setAutoRender(interval) {
                    var _this = this;
                    if (interval === undefined) {
                        console.error("[".concat(this.localName, "] Undefined interval passed to setAutoRender"));
                        return;
                    }
                    if (this._internal.autoRenderInterval) {
                        window.clearInterval(this._internal.autoRenderInterval);
                    }
                    this._internal.autoRenderInterval = window.setInterval(function() {
                        return _this.render();
                    }, interval);
                }
            },
            {
                key: "init",
                value: /**
         * @method
         * @name init
         * @memberof! Controller
         * @description Called during the `connectedCallback()` (when an element is created in the DOM)
         * Expected to be overridden
         * @param {*} args
         */ function init(args) {
                    return _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                        return regeneratorRuntime.wrap(function _callee$(_ctx) {
                            while(1)switch(_ctx.prev = _ctx.next){
                                case 0:
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
         * @method
         * @name render
         * @memberof! Controller
         * @description Re-renders everything with the @render attribute
         */ function render() {
                    var _this = this;
                    return _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                        return regeneratorRuntime.wrap(function _callee$(_ctx) {
                            while(1)switch(_ctx.prev = _ctx.next){
                                case 0:
                                    // TODO: Might be handy to be able to render one element or element tree
                                    // Render self
                                    // TODO: Better way to do this?
                                    if (_this.renderSelf && typeof _this.renderSelf === "function") {
                                        _this.renderSelf();
                                    }
                                    _classPrivateMethodGet(_this, _findRenderableElements, findRenderableElements).call(_this).forEach(function(el) {
                                        // Store the original template as an attribute on the element on first render
                                        var template = el.getAttribute("_template");
                                        if (!template) {
                                            template = el.innerText;
                                            el.setAttribute("_template", template);
                                        }
                                        // If the element has the attribute with .eval then eval the template
                                        // This should be used sparingly and only when the content is trusted
                                        var evalMode = el.hasAttribute("@render.eval");
                                        var replacerRegex = /\$\{(.*?)\}/g; // Find template vars: ${var}
                                        template.replace(replacerRegex, function(replacer, key) {
                                            if (evalMode) {
                                                var fn = new Function("return ".concat(key));
                                                template = template.replace(replacer, fn.call(_this));
                                            } else {
                                                // If not in `evalMode` then we do an eval-like replacement
                                                // We will dig into the controller instance and replace in the variables
                                                // This handles dot notation and array notation
                                                var pos = null;
                                                // Split on dots and brackets and strip out any quotes
                                                key.split(/[\.\[\]]/).filter(function(item) {
                                                    return !!item;
                                                }).forEach(function(part) {
                                                    part = part.replace(/["']/g, ""); // Strip out square brackets
                                                    part = part.replace(/\(\)/g, ""); // Strip out function parens
                                                    if (pos == null && part === "this") {
                                                        pos = _this;
                                                        return;
                                                    }
                                                    if (pos && part in pos) {
                                                        pos = pos[part];
                                                    } else {
                                                        pos = null;
                                                        return;
                                                    }
                                                });
                                                if (pos == null) pos = "";
                                                if (typeof pos === "function") pos = pos.call(_this);
                                                template = template.replace(replacer, pos.toString() || "");
                                            }
                                        });
                                        // TODO: This may be innefecient
                                        el.innerHTML = template;
                                    });
                                case 2:
                                case "end":
                                    return _ctx.stop();
                            }
                        }, _callee);
                    }))();
                }
            }
        ]);
        return _class;
    }(base1), _defineProperty(_class1, "_extendTag", extendTag), /**
         * @static
         * @name observedAttributes
         * @type String[]
         * @memberof! Controller
         * @description These are the attributes to watch for and react to changes
         * This is handled by `attributeChangedCallback()`
         * The default implementation will call `set{AttributeName}(oldValue, newValue)`
         */ _defineProperty(_class1, "observedAttributes", []), _class1);
    return CoreController;
};
var Controller = makeController();
export { makeController, Controller };
