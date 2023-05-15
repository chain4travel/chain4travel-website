const now = String(Date.now())
const htmlmin = require('html-minifier')
const Image = require("@11ty/eleventy-img")

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget('./styles/tailwind.config.js')
  eleventyConfig.addWatchTarget('./styles/tailwind.css')

  eleventyConfig.addPassthroughCopy({ './_tmp/style.css': './style.css' })

  eleventyConfig.addPassthroughCopy({
    './node_modules/alpinejs/dist/cdn.min.js': './js/alpine.js',
  })

  eleventyConfig.addPassthroughCopy('src/img')
  eleventyConfig.addPassthroughCopy('src/fonts')
  eleventyConfig.addPassthroughCopy('images')
  
  eleventyConfig.addPassthroughCopy('robots.txt')
  eleventyConfig.addPassthroughCopy('site.webmanifest')

  eleventyConfig.addShortcode('version', function () {
    return now
  })
  
  eleventyConfig.addShortcode("image", async function(src, alt, imgClass, sizes = "100vw") {
		if(alt === undefined) {
			// You bet we throw an error on missing alt (alt="" works okay)
			throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
		}

		let metadata = await Image(src, {
			widths: [300, 600, 1200, 2000],
			formats: ["avif", "png", "jpg"],
      outputDir: "./_site/images/",
      urlPath: "/images/"
		});

		let lowsrc = metadata.png[0];
		let highsrc = metadata.png[metadata.png.length - 1];

		return `<picture>
			${Object.values(metadata).map(imageFormat => {
				return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat.map(entry => entry.srcset).join(", ")}" sizes="${sizes}">`;
			}).join("\n")}
				<img
					src="${lowsrc.url}"
					width="${highsrc.width}"
					height="${highsrc.height}"
          class="${imgClass} object-cover"
					alt="${alt}"
					loading="lazy"
					decoding="async">
			</picture>`;
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