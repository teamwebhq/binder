const pascalToKebab = str => str[0].toLowerCase() + str.slice(1, str.length).replace(/[A-Z0-9]/g, letter => `-${letter.toLowerCase()}`);

const kebabToCamel = str => str[0].toLowerCase() + str.slice(1, str.length).replace(/-([a-z0-9])/g, letter => `${letter[1].toUpperCase()}`);

/**
 * Returns the permutations of an array for all combinations and lengths
 * @param {*} arr
 */
const permutations = (arr, toString = false) => {
    // Group each chunk of permutations of each length
    // ie. group all the length-1 permutations, and the length-2 permutations, etc...
    let chunks = {};

    // Add the initial array (length-1 permutations)
    chunks[1] = arr.map(item => [item]);

    // Add the permutations from length-2 to the full length of the initial array
    for (let targetLen = 2; targetLen <= arr.length; targetLen++) {
        let newChunk = [];

        // Go through each permutation of the previous length
        // and each value in the initial array
        // If the permutation does not contain the current loop value then make a new permutation
        // with the old permutation and the current loop value
        for (let permutation of chunks[targetLen - 1]) {
            for (let item of arr) {
                if (permutation.includes(item)) continue;
                newChunk.push([item, ...permutation]);
            }
        }

        chunks[targetLen] = newChunk;
    }

    let results = Object.values(chunks);

    // If we want the results as a flat list of strings (which we probably do)
    // Then do it...
    if (toString) {
        let formattedResults = [];
        for (let group of results) {
            for (let permutation of group) {
                formattedResults.push(permutation.join(""));
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
 */
const parseDuration = duration => {
    const [_, interval, unit] = /(\d+)(\w+)/.exec(duration);

    // Calculate the duration in milliseconds
    // Supported units are:
    // ms: milliseconds
    // s: seconds
    // m: minutes
    // h: hours
    let timeout = 0;
    switch (unit) {
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
const template = (strings, ...values) => {
    return strings.reduce((acc, str, i) => {
        return acc + str + (values[i] || "");
    }, "");
};

/**
 * Parse a string as a boolean
 * Falsey values are
 * - 0 or "0"
 * - false or "false" (case insensitive)
 * - null or undefined
 * NOTE: An empty string is **true**, this is so an empty HTML attribute is true, like normal HTML boolean attributes (eg. disabled and hidden)
 * @param {*} value
 * @returns {boolean}
 */
const parseBoolean = value => {
    if (value === null || value === undefined) {
        return false;
    }

    if (value === false) {
        return false;
    }

    if (value === 0 || value === "0") {
        return false;
    }

    if (value && value.toLowerCase && value.toLowerCase() === "false") {
        return false;
    }

    return true;
};

export { pascalToKebab, kebabToCamel, permutations, parseDuration, template as html, template as css, parseBoolean };
