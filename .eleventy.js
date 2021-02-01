const searchFilter = require('./filters/searchFilter');

const categorias = [
    "1 Servicios públicos generales",
    "3 Orden público y seguridad",
    "4 Asuntos económicos",
    "5 Protección del medio ambiente",
    "6 Vivienda y servicios comunitarios",
    "7 Salud",
    "9 Educación"
];

module.exports = function (eleventyConfig) {
    eleventyConfig.setTemplateFormats('css,png,jpg,njk,html,otf,ttf');

    categorias.forEach((categoria) => {
        eleventyConfig.addCollection(categoria, function (collectionApi) {

            let collection = collectionApi.getFilteredByTags('servicio').filter(function (item) {
                return item.data.servicio.categoria === categoria;
            });

            return collection;
        });
    });

    eleventyConfig.addFilter("search", searchFilter);
}