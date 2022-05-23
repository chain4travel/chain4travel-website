const now = String(Date.now())
const htmlmin = require('html-minifier')

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget('./styles/tailwind.config.js')
  eleventyConfig.addWatchTarget('./styles/tailwind.css')

  eleventyConfig.addPassthroughCopy({ './_tmp/style.css': './style.css' })

  eleventyConfig.addPassthroughCopy({
    './node_modules/alpinejs/dist/cdn.js': './js/alpine.js',
  })

  eleventyConfig.addPassthroughCopy('images')
  eleventyConfig.addPassthroughCopy('static')
  
  eleventyConfig.addPassthroughCopy('favicon.ico')
  eleventyConfig.addPassthroughCopy('favicon-16x16.png')
  eleventyConfig.addPassthroughCopy('favicon-32x32.png')
  eleventyConfig.addPassthroughCopy('android-chrome-192x192.png')
  eleventyConfig.addPassthroughCopy('android-chrome-512x512.png')
  eleventyConfig.addPassthroughCopy('site.webmanifest')

  eleventyConfig.addShortcode('version', function () {
    return now
  })

  eleventyConfig.addFilter("randomItem", (arr) => {
    arr.sort(() => {
      return 0.5 - Math.random();
    });
    return arr.slice(0, 1);
  });

  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (
      process.env.ELEVENTY_PRODUCTION &&
      outputPath &&
      outputPath.endsWith('.html')
    ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified
    }

        return content
    })
  
  return {
    htmlTemplateEngine: "njk"
  };
};