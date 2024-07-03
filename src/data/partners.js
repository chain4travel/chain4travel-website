const axios = require("axios");

module.exports = async function () {
    // Fetch the first page to get the total number of pages
    let { data: { data: partners, meta: meta } } = await axios.get(
        "https://api.strapi.camino.network/partners?populate=*&pagination[page]=1&pagination[pageSize]=100"
    );

    const totalPages = meta.pagination.pageCount;

    // Create an array of promises for the remaining pages
    const pagePromises = [];
    for (let currentPage = 2; currentPage <= totalPages; currentPage++) {
        pagePromises.push(
            axios.get(
                `https://api.strapi.camino.network/partners?populate=*&pagination[page]=${currentPage}&pagination[pageSize]=100`
            )
        );
    }

    // Fetch all pages in parallel
    const pageResults = await Promise.all(pagePromises);

    // Combine results from all pages
    for (let res of pageResults) {
        partners = [...partners, ...res.data.data];
    }

    return { data: partners };
};
