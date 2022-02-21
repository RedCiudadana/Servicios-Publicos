const searchFilter = require('./filters/searchFilter');
const searchFilterUE = require('./filters/searchFilterUE');

const moment = require("moment");
const now = new Date();

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
    
    eleventyConfig.setTemplateFormats("njk,html,md");
    
    eleventyConfig.addPassthroughCopy('src');
    eleventyConfig.addPassthroughCopy('css');
    eleventyConfig.addPassthroughCopy('js');
    eleventyConfig.addPassthroughCopy('ELEMENTOS');
    eleventyConfig.addPassthroughCopy('images');
    eleventyConfig.addPassthroughCopy('admin');

    categorias.forEach((categoria) => {
        eleventyConfig.addCollection(categoria, function (collectionApi) {

            let collection = collectionApi.getFilteredByTags('servicio').filter(function (item) {
                return item.data.servicio.Categoria === categoria;
            });

            return collection;
        });
    });

    eleventyConfig.addFilter("search", searchFilter);
    eleventyConfig.addCollection("servicios", function(collectionApi) {
        return collectionApi.getFilteredByTag('servicio');
    });

    eleventyConfig.addCollection("entidad", function(collectionApi) {
        return collectionApi.getFilteredByTag('entidad');
    });

    eleventyConfig.addCollection("unidad", function(collectionApi) {
        return collectionApi.getFilteredByTag('unidad');
    });

    
    eleventyConfig.addFilter("search2", searchFilterUE);

    eleventyConfig.addNunjucksFilter("limit", function(array, limit) {
        return array.slice(0, limit);
    });

    eleventyConfig.addFilter("dateFormat", function(date, format) {
        return moment(date).format(format);
    });

}