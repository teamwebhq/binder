const markdownIt = require("markdown-it");
const eleventyPluginSyntaxHighlighter = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/static/");

    eleventyConfig.setUseGitIgnore(false);
    eleventyConfig.ignores.add("README.md");
    eleventyConfig.ignores.add("node_modules/**");
    eleventyConfig.ignores.add("build/**");
    eleventyConfig.ignores.add("dist/**");

    // Mermaid diagrams
    eleventyConfig.addPlugin(eleventyPluginSyntaxHighlighter);
    const highlighter = eleventyConfig.markdownHighlighter;
    eleventyConfig.addMarkdownHighlighter((str, language) => {
        if (language === "mermaid") {
            return `<pre class="mermaid">${str}</pre>`;
        }
        return highlighter(str, language);
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
