const Cache = require('@11ty/eleventy-cache-assets')

module.exports = async function () {
    return Cache('https://api.strapi.camino.network/events-pasts?populate=*', { type: 'json' })
}