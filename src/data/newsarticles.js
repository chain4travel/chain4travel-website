const Cache = require('@11ty/eleventy-cache-assets')

module.exports = async function () {
	return Cache('https://api.strapi.camino.network/news-articles?populate=*&pagination[limit]=-1', { type: 'json' })
}