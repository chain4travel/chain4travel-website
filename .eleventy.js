const now = String(Date.now())
const htmlmin = require('html-minifier')
const Image = require("@11ty/eleventy-img")
const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget('./styles/tailwind.config.js')
  eleventyConfig.addWatchTarget('./styles/tailwind.css')

  eleventyConfig.addPassthroughCopy({ './_tmp/style.css': './style.css' })

  eleventyConfig.addPassthroughCopy({
    './node_modules/alpinejs/dist/cdn.min.js': './js/alpine.js',
  })

  eleventyConfig.addPassthroughCopy({ 'src/img/meta': '/' })
  eleventyConfig.addPassthroughCopy('src/img')
  eleventyConfig.addPassthroughCopy('src/fonts')
  eleventyConfig.addPassthroughCopy('src/js')
  eleventyConfig.addPassthroughCopy('images')
  eleventyConfig.addPassthroughCopy('src/video/unchained-aftermovie-header.mp4')
  
  eleventyConfig.addPassthroughCopy('robots.txt')
  eleventyConfig.addPassthroughCopy('site.webmanifest')

  eleventyConfig.addPassthroughCopy({ 'src/Chain4Travel-Logo-Kit.zip': './Chain4Travel-Logo-Kit.zip' })

  eleventyConfig.addShortcode('version', function () {
    return now
  })
  
  eleventyConfig.addShortcode("image", async function(src, alt, pictureClass, imgClass, sizes = "100vw") {
		if(alt === undefined) {
			// You bet we throw an error on missing alt (alt="" works okay)
			throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
		}

		let metadata = await Image(src, {
			widths: [300, 600, 1200],
			formats: ["avif", "png"],
      outputDir: "./_site/img/"
		});

		let lowsrc = metadata.png[0];
		let highsrc = metadata.png[metadata.png.length - 1];

		return `<picture class="${pictureClass}">
			${Object.values(metadata).map(imageFormat => {
				return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat.map(entry => entry.srcset).join(", ")}" sizes="${sizes}">`;
			}).join("\n")}
				<img
					src="${lowsrc.url}"
					width="${highsrc.width}"
					height="${highsrc.height}"
          class="${imgClass}"
          style="font-size: 0px"
					alt="${alt}"
					loading="lazy"
					decoding="async">
			</picture>`;
	});

  eleventyConfig.addFilter('sortBy', function (arr, prop) {
    const isNum = val => val == +val;
    const sorter = (a, b) => isNum(a[prop]) && isNum(b[prop]) ? +a[prop] - b[prop] : a[prop] < b[prop];
    arr.sort(sorter);
    return arr; 
  });

  // Create collection for all elements inside posts folder
  eleventyConfig.addCollection("blogposts", function(collectionsBlogposts) {
    return collectionsBlogposts.getFilteredByGlob("./src/posts/*.{html,md}");
  });

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("LLLL dd, yyyy");
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
    dir: {
      input: "src",
      output: "_site",
      includes: "includes",
      layouts: "layouts",
      data: "data"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};