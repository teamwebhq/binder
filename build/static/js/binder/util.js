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
var pascalToKebab = function(str) {
    return str[0].toLowerCase() + str.slice(1, str.length).replace(/[A-Z0-9]/g, function(letter) {
        return "-".concat(letter.toLowerCase());
    });
};
var kebabToCamel = function(str) {
    return str[0].toLowerCase() + str.slice(1, str.length).replace(/-([a-z0-9])/g, function(letter) {
        return "".concat(letter[1].toUpperCase());
    });
};
/**
 * Returns the permutations of an array for all combinations and lengths
 * @param {*} arr
 */ var permutations = function(arr) {
    var toString = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    // Group each chunk of permutations of each length
    // ie. group all the length-1 permutations, and the length-2 permutations, etc...
    var chunks = {};
    // Add the initial array (length-1 permutations)
    chunks[1] = arr.map(function(item) {
        return [
            item
        ];
    });
    // Add the permutations from length-2 to the full length of the initial array
    for(var targetLen = 2; targetLen <= arr.length; targetLen++){
        var newChunk = [];
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            // Go through each permutation of the previous length
            // and each value in the initial array
            // If the permutation does not contain the current loop value then make a new permutation
            // with the old permutation and the current loop value
            for(var _iterator = chunks[targetLen - 1][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var permutation = _step.value;
                var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
                try {
                    for(var _iterator1 = arr[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                        var item1 = _step1.value;
                        if (permutation.includes(item1)) continue;
                        newChunk.push([
                            item1
                        ].concat(_toConsumableArray(permutation)));
                    }
                } catch (err) {
                    _didIteratorError1 = true;
                    _iteratorError1 = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                            _iterator1.return();
                        }
                    } finally{
                        if (_didIteratorError1) {
                            throw _iteratorError1;
                        }
                    }
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
        chunks[targetLen] = newChunk;
    }
    var results = Object.values(chunks);
    // If we want the results as a flat list of strings (which we probably do)
    // Then do it...
    if (toString) {
        var formattedResults = [];
        var _iteratorNormalCompletion2 = true, _didIteratorError2 = false, _iteratorError2 = undefined;
        try {
            for(var _iterator2 = results[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true){
                var group = _step2.value;
                var _iteratorNormalCompletion3 = true, _didIteratorError3 = false, _iteratorError3 = undefined;
                try {
                    for(var _iterator3 = group[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true){
                        var permutation1 = _step3.value;
                        formattedResults.push(permutation1.join(""));
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                            _iterator3.return();
                        }
                    } finally{
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                    _iterator2.return();
                }
            } finally{
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }
        return formattedResults;
    }
    return results;
};
/**
 * Parses a duration string and returns the time in milliseconds
 * Durations are in the form: ${duration: number}${unit: string}
 * EG.
 * 5ms => 5 milliseconds
 * 30s => 30 seconds
 * 5m => 5 minutes
 * 2h => 2 hours
 * @param {string} duration A string duration
 */ var parseDuration = function(duration) {
    var ref = _slicedToArray(/(\d+)(\w+)/.exec(duration), 3), _ = ref[0], interval = ref[1], unit = ref[2];
    // Calculate the duration in milliseconds
    // Supported units are:
    // ms: milliseconds
    // s: seconds
    // m: minutes
    // h: hours
    var timeout = 0;
    switch(unit){
        case "ms":
            timeout = interval;
            break;
        case "s":
            timeout = interval * 1000;
            break;
        case "m":
            timeout = interval * 1000 * 60;
            break;
        case "h":
            timeout = interval * 1000 * 60 * 60;
            break;
    }
    return timeout;
};
// Allows defining template literals with syntax highlighting
var template = function(strings) {
    for(var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
        values[_key - 1] = arguments[_key];
    }
    return strings.reduce(function(acc, str, i) {
        return acc + str + (values[i] || "");
    }, "");
};
// Parse a string as a boolean
// Falsey values are
// "" (empty string)
// 0 or "0"
// false or "false"
var parseBoolean = function(value) {
    if (!value || value == "" || value == "0" || value.toLowerCase() == "false") {
        return false;
    }
    return true;
};
export { pascalToKebab, kebabToCamel, permutations, parseDuration, template as html, template as css, parseBoolean };
