const markdownIt = require("markdown-it");
const sass = require("sass");

module.exports = function (eleventyConfig) {
    // Add static files
    eleventyConfig.addPassthroughCopy("src/static/");

    // Add ignored files
    eleventyConfig.setUseGitIgnore(false);
    eleventyConfig.ignores.add("README.md");
    eleventyConfig.ignores.add("node_modules/**");
    eleventyConfig.ignores.add("build/**");
    eleventyConfig.ignores.add("dist/**");

    // Add sass
    eleventyConfig.addTemplateFormats("scss");

    // Creates the extension for use
    eleventyConfig.addExtension("scss", {
        outputFileExtension: "css", // optional, default: "html"

        // `compile` is called once per .scss file in the input directory
        compile: async function (inputContent) {
            let result = sass.compileString(inputContent);

            // This is the render function, `data` is the full data cascade
            return async data => {
                return result.css;
            };
        },
    });

    // Add a new filter called "markdown" that converts the contents from md -> html
    const md = new markdownIt({
        html: true,
    });

    eleventyConfig.addPairedShortcode("markdown", content => {
        return md.render(content);
    });

    return {
        dir: {
            input: "src",
            output: "build/site",
        },
        markdownTemplateEngine: "njk",
    };
};
