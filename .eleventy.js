const searchFilter = require('./filters/searchFilter');
const rmj = require('render-markdown-js');
const moment = require("moment");
const now = new Date();

module.exports = function (eleventyConfig) {
    
    eleventyConfig.setTemplateFormats("njk,html,md");
    
    eleventyConfig.addPassthroughCopy('src');
    eleventyConfig.addPassthroughCopy('css');
    eleventyConfig.addPassthroughCopy('js');
    eleventyConfig.addPassthroughCopy('ELEMENTOS');
    eleventyConfig.addPassthroughCopy('images');
    eleventyConfig.addPassthroughCopy('admin');
    eleventyConfig.addPassthroughCopy('assets');
    
    eleventyConfig.addCollection("servicios", function(collectionApi) {
        return collectionApi.getFilteredByTag('servicio');
    });

    eleventyConfig.addCollection('serviciosHighlighted', (collectionApi) => {
        return collectionApi.getFilteredByTag('servicio').filter((item) => {
          return item.data.servicio.highlight == true;
        });
    });

    eleventyConfig.addCollection('categoriasespecificasHighlighted', (collectionApi) => {
        return collectionApi.getFilteredByTag('categoriaesp').filter((item) => {
          return item.data.categoriaesp.highlight == true;
        });
    });

    eleventyConfig.addCollection("categorias", function(collectionApi) {
        return collectionApi.getFilteredByTag('categoria');
    });

    eleventyConfig.addCollection("categoriaesp", function(collectionApi) {
        return collectionApi.getFilteredByTag('categoriaesp');
    });

    eleventyConfig.addCollection('podcastHighlighted', (collectionApi) => {
        return collectionApi.getFilteredByTag('podcast_cms').filter((item) => {
          return item.data.highlight == true;
        });
    });

    eleventyConfig.addCollection("podcasts", function(collectionApi) {
        return collectionApi.getFilteredByTag('podcast_cms');
    });

    //FILTROS
    eleventyConfig.addFilter("search", searchFilter);

    eleventyConfig.addNunjucksFilter("rmj", function(content) {
        return rmj(content);
    });

    eleventyConfig.addNunjucksFilter("limit", function(array, limit) {
        return array.slice(0, limit);
    });

    eleventyConfig.addNunjucksFilter("limitSinPrimero", function(array, limit) {
        return array.slice(1, limit);
    });

    eleventyConfig.addFilter("dateFormat", function(date, format) {
        return moment(date).format(format);
    });

    eleventyConfig.addFilter('log', value => {
        console.log(value)
    })

}