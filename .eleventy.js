// Init Sass plugin
const pluginSass = require("eleventy-plugin-sass");
const sassPluginOptions = {
    sourcemaps: true,
    cleanCSS: true,
    watch: ["build/styles/**/*.scss"],
    outputDir: "_site/assets/styles",
};

// Init prettier
const prettier = require("prettier");

// Init markdown-it
const markdownIt = require("markdown-it");
const mdIterator = require('markdown-it-for-inline');


module.exports = function(eleventyConfig) {
  // Sass plugin
  eleventyConfig.addPlugin(pluginSass, sassPluginOptions);


  // Prettier, remove html whitespace
  eleventyConfig.addTransform("prettier", (content, outputPath) => {
    if (outputPath && outputPath.endsWith(".html")) {
      return prettier.format(content, { parser: "html" });
    }
    return content;
  });


  // Markdown-it, add target _blank to external markdown links
  const md = new markdownIt({
    html: true,
  }).use(mdIterator, 'url_new_win', 'link_open', function (tokens, idx) {
    const [attrName, href] = tokens[idx].attrs.find(attr => attr[0] === 'href');
    if (href && (!href.includes('colouring-in.com') && !href.startsWith('/') && !href.startsWith('#'))) {
      tokens[idx].attrPush([ 'target', '_blank' ]);
      //tokens[idx].attrPush([ 'rel', 'noopener noreferrer' ]);
    }
  });
  eleventyConfig.addFilter("markdown", (content) => {
      return md.render(content);
  });


  // Folder passthroughs
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("src/media/uploads");


  // Other Eleventy config
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addWatchTarget("./build/scripts/");


  return {
    // Use /src/ as input directory
    dir: {
			input: "src",
			output: "_site",
			data: "_data",
		},
    // _data folder already using json so disable conversion to json
    dataTemplateEngine: false,
  };
}
