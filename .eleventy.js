const searchFilter = require('./filters/searchFilter');
const searchFilterUE = require('./filters/searchFilterUE');

const categorias = [
    "Servicios públicos generales",
    "Orden público y seguridad",
    "Asuntos económicos",
    "Protección del medio ambiente",
    "Vivienda y servicios comunitarios",
    "Salud",
    "Educación"
];

module.exports = function (eleventyConfig) {
    eleventyConfig.setTemplateFormats('css,png,jpg,njk,html,otf,ttf');

    categorias.forEach((categoria) => {
        eleventyConfig.addCollection(categoria, function (collectionApi) {

            let collection = collectionApi.getFilteredByTags('servicio').filter(function (item) {
                return item.data.servicio.Categoria === categoria;
            });

            return collection;
        });
    });

    eleventyConfig.addCollection("entidad", function(collectionApi) {
        return collectionApi.getFilteredByTag('entidad');
    });

    eleventyConfig.addFilter("search", searchFilter);
    eleventyConfig.addFilter("search2", searchFilterUE);
}