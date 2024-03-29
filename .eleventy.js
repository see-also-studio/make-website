// Init Sass plugin
const pluginSass = require("eleventy-plugin-sass");
const sassPluginOptions = {
    sourcemaps: true,
    cleanCSS: true,
    watch: ["src/build/styles/**/*.scss"],
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

  // Terser, minify javascript
  const { minify } = require('terser');
  eleventyConfig.addNunjucksAsyncFilter('jsmin', async function(code, callback) {
    try {
      const minified = await minify(code);
      callback(null, minified.code);
    } catch (err) {
      console.error('Terser error: ', err);
      // Fail gracefully.
      callback(null, code);
    }
  });


  // Markdown-it, add target _blank to external markdown links
  const md = new markdownIt({
    html: true,
  }).use(mdIterator, 'url_new_win', 'link_open', function (tokens, idx) {
    const [attrName, href] = tokens[idx].attrs.find(attr => attr[0] === 'href');
    if (href && (!href.includes('makeatsomerstown.com') && !href.startsWith('/') && !href.startsWith('#'))) {
      tokens[idx].attrPush([ 'target', '_blank' ]);
      //tokens[idx].attrPush([ 'rel', 'noopener noreferrer' ]);
    }
  });
  eleventyConfig.addFilter("markdown", (content) => {
      return md.render(content);
  });


  // Add shortcode and filter to output current year
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);
  eleventyConfig.addFilter('parsecurrentyear', function(value) {
    return value.replace('{{currentYear}}', `${new Date().getFullYear()}`);
  });

  // Filter to parse json linebreaks
  eleventyConfig.addFilter('parselinebreak', function(value) {
    return value.split('\n').join('<br>');
  });


  // Folder passthroughs
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/assets");
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
