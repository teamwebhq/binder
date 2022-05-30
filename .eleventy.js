module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/static/");

    eleventyConfig.setUseGitIgnore(false);
    eleventyConfig.ignores.add("README.md");
    eleventyConfig.ignores.add("node_modules/**");
    eleventyConfig.ignores.add("build/**");
    eleventyConfig.ignores.add("dist/**");

    return {
        dir: {
            input: "src",
            output: "build/site",
        }
    }
}
