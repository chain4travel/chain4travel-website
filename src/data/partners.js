const axios = require("axios");
module.exports = async function () {
    let {
        data: { data: partners, meta: meta },
    } = await axios.get(
        "https://api.strapi.camino.network/partners?populate=*&pagination[page]=1&pagination[pageSize]=100"
    );
    for (
        let currentPage = 2;
        currentPage <= meta.pagination.pageCount;
        currentPage++
    ) {
        let res = await axios.get(
            `https://api.strapi.camino.network/partners?pagination[page]=${currentPage}&pagination[pageSize]=100`
        );
        partners = [...partners, ...res.data.data];
    }
    return { data: partners };
};
