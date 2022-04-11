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
function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
import { pascalToKebab } from "./util.js";
/**
 * Register a controller (or multiple controllers)
 * 
 * Example
 * ```js
 * registerControllers(MyController, MyOtherController);
 * ```
 * 
 * ```js
 * registerControllers(
 *  MyController,
 *  [ MyOtherController, { name: "my-custom-controller" } ],
 *  [ MyOtherOtherController ],
 * )
 * ```
 * @param  {...any} controllers 
 */ var registerControllers = function() {
    for(var _len = arguments.length, controllers = new Array(_len), _key = 0; _key < _len; _key++){
        controllers[_key] = arguments[_key];
    }
    // First find all undefined elements and assume they are custom elements
    // We can then add the `data-controller` attribute to them
    // This makes it easy for us to find which controller a given DOM element belongs to
    // We also set the `data-controller` attr during the `connectedCallback` so any elements defined later will still work
    var allUndefinedElements = _toConsumableArray(document.querySelectorAll(":not(:defined)"));
    allUndefinedElements.forEach(function(el) {
        return el.setAttribute("data-controller", el.localName);
    });
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = controllers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var controller = _step.value;
            var config = {};
            if (Array.isArray(controller)) {
                var ref, ref1;
                ref = _slicedToArray(controller, 2), controller = ref[0], ref1 = ref[1], config = ref1 === void 0 ? {} : ref1, ref;
            }
            var controllerName = controller.name;
            var controllerTag = config && config.name ? config.name : pascalToKebab(controllerName.replace("Controller", ""));
            // All custom elements required a hyphenated tag name
            if (!controllerTag.includes("-")) {
                console.error("[".concat(controllerName, "] Controller tag name must contain a hyphen but got <").concat(controllerTag, ">"));
            }
            // If our controller has a __tag__ property then it extends that tag
            var opts = {};
            if (controller.__extendTag__) opts.extends = controller.__extendTag__;
            // Create an anonymous class here to avoid name clashes when using the bare controller with a custom name
            window.customElements.define(controllerTag, controller, opts);
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
};
export { registerControllers };
