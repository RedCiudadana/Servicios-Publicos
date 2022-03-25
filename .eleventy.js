const searchFilter = require('./filters/searchFilter');

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
            
            let collection = collectionApi.getFilteredByTags('servicios').filter(function (item) {
                return item.data.categoria === categoria;
            });

            return collection;
        });
    });

    
    eleventyConfig.addCollection("servicios", function(collectionApi) {
        return collectionApi.getFilteredByTag('servicio');
    });

    eleventyConfig.addCollection('serviciosHighlighted', (collectionApi) => {
        return collectionApi.getFilteredByTag('servicio').filter((item) => {
          return item.data.highlight == true;
        });
    });

    //FILTROS
    eleventyConfig.addFilter("search", searchFilter);

    eleventyConfig.addNunjucksFilter("limit", function(array, limit) {
        return array.slice(0, limit);
    });

    eleventyConfig.addNunjucksFilter("limitSinPrimero", function(array, limit) {
        return array.slice(1, limit);
    });

    eleventyConfig.addFilter("dateFormat", function(date, format) {
        return moment(date).format(format);
    });

}