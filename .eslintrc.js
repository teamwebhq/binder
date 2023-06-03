// eslint-disable-next-line
module.exports = {
    extends: ["eslint:recommended"],
    env: {
        browser: true,
        es6: true,
    },
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    rules: {
        quotes: 1,
        semi: ["error", "always"],
        camelcase: 1,
        indent: [
            "error",
            4,
            {
                SwitchCase: 1,
            },
        ],
        "comma-dangle": 0,
        "no-unused-vars": [
            "error",
            {
                destructuredArrayIgnorePattern: "^_",
                argsIgnorePattern: "^_",
            },
        ],
        "no-inner-declarations": 1,
    },
    globals: {},
};
