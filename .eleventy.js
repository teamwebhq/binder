const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/static/");

    eleventyConfig.setUseGitIgnore(false);
    eleventyConfig.ignores.add("README.md");
    eleventyConfig.ignores.add("node_modules/**");
    eleventyConfig.ignores.add("build/**");
    eleventyConfig.ignores.add("dist/**");

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
