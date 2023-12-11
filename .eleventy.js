const searchFilter = require('./filters/searchFilter');
const searchFilterI = require('./filters/searchFilterI');
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
    eleventyConfig.addPassthroughCopy({ 'netlify': '/' });

    eleventyConfig.addCollection("servicios", function (collectionApi) {
        return collectionApi.getFilteredByTag('servicio');
    });

    eleventyConfig.addCollection("instituciones_comp", function (collectionApi) {
        return collectionApi.getFilteredByTag('instituciones');
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

    eleventyConfig.addCollection('ministerios', (collectionApi) => {
        return collectionApi.getFilteredByTag('instituciones').filter((item) => {
            return item.data.instituciones.type == 'Ministerio';
        });
    });

    eleventyConfig.addCollection('comisionados', (collectionApi) => {
        return collectionApi.getFilteredByTag('instituciones').filter((item) => {
            return item.data.instituciones.type == 'Comisión';
        });
    });

    eleventyConfig.addCollection('autoridades', (collectionApi) => {
        return collectionApi.getFilteredByTag('instituciones').filter((item) => {
            return item.data.instituciones.type == 'Autoridad';
        });
    });

    eleventyConfig.addCollection('consejos', (collectionApi) => {
        return collectionApi.getFilteredByTag('instituciones').filter((item) => {
            return item.data.instituciones.type == 'Consejo';
        });
    });

    eleventyConfig.addCollection('defensorias', (collectionApi) => {
        return collectionApi.getFilteredByTag('instituciones').filter((item) => {
            return item.data.instituciones.type == 'Defensoría';
        });
    });

    eleventyConfig.addCollection('fondos', (collectionApi) => {
        return collectionApi.getFilteredByTag('instituciones').filter((item) => {
            return item.data.instituciones.type == 'Fondo';
        });
    });

    eleventyConfig.addCollection('gobernaciones', (collectionApi) => {
        return collectionApi.getFilteredByTag('instituciones').filter((item) => {
            return item.data.instituciones.type == 'Gobernación';
        });
    });

    eleventyConfig.addCollection('secretarias', (collectionApi) => {
        return collectionApi.getFilteredByTag('instituciones').filter((item) => {
            return item.data.instituciones.type == 'Secretaría';
        });
    });

    eleventyConfig.addCollection('coordinadoras', (collectionApi) => {
        return collectionApi.getFilteredByTag('instituciones').filter((item) => {
            return item.data.instituciones.type == 'Coordinadora';
        });
    });

    eleventyConfig.addCollection("categorias", function (collectionApi) {
        return collectionApi.getFilteredByTag('categoria');
    });

    eleventyConfig.addCollection("categorias2", function (collectionApi) {
        return collectionApi.getFilteredByTag('categoria2');
    });

    eleventyConfig.addCollection("categoriaesp", function (collectionApi) {
        return collectionApi.getFilteredByTag('categoriaesp');
    });

    eleventyConfig.addCollection('podcastHighlighted', (collectionApi) => {
        return collectionApi.getFilteredByTag('podcast_cms').filter((item) => {
            return item.data.highlight == true;
        });
    });

    eleventyConfig.addCollection("podcasts", function (collectionApi) {
        return collectionApi.getFilteredByTag('podcast_cms');
    });

    // Custom filter to filter services by institution name
    eleventyConfig.addFilter("filterByInstitution", (services, institutionName) => {
        return services.filter(service => service.data.servicio.institution.name === institutionName);
    });

    // Custom filter to filter services by category name
    eleventyConfig.addFilter("filterByCategory", (services, categoryName) => {
        return services.filter(service => service.data.servicio.subcategory.name === categoryName);
    });

    eleventyConfig.addFilter("sortAlphabetically", services => {
        return services.sort((a, b) => {
            const titleA = a.data.servicio.name || '';
            const titleB = b.data.servicio.name || '';
    
            // Función de comparación que tiene en cuenta números
            const compareFunction = (strA, strB) => {
                const numA = parseFloat(strA);
                const numB = parseFloat(strB);
    
                // Si ambos son números, compáralos numéricamente
                if (!isNaN(numA) && !isNaN(numB)) {
                    return numA - numB;
                }
    
                // Si al menos uno no es un número, usa localeCompare para ordenar alfabéticamente
                return strA.localeCompare(strB);
            };
    
            return compareFunction(titleA, titleB);
        });
    });
    
      
      
    //FILTROS
    eleventyConfig.addFilter("search", searchFilter);
    eleventyConfig.addFilter("searchI", searchFilterI);

    eleventyConfig.addFilter("json", function(value) {
        return JSON.stringify(value, null, 2);
    });

    eleventyConfig.addNunjucksFilter("rmj", function (content) {
        return rmj(content);
    });

    eleventyConfig.addNunjucksFilter("limit", function (array, limit) {
        return array.slice(0, limit);
    });

    eleventyConfig.addNunjucksFilter("limitPart", function (array, limit1, limit2) {
        return array.slice(limit1, limit2);
    });

    eleventyConfig.addNunjucksFilter("limitSinPrimero", function (array, limit) {
        return array.slice(1, limit);
    });

    eleventyConfig.addFilter("dateFormat", function (date, format) {
        return moment(date).format(format);
    });

    eleventyConfig.addFilter("lastSlash", function (string) {
        var n = string.lastIndexOf('/');
        var result = string.substring(n + 1);
        return result;
    });

    eleventyConfig.addFilter('log', value => {
        console.log(value)
    });

    eleventyConfig.addFilter("rem_accent", function (string) {
        return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    })

    eleventyConfig.addFilter("sub_string", function (string) {
        return string.substring(0, 150);
    })

    eleventyConfig.addFilter("parse", function (string) {
        return string.replace(/[\r\n]/gm, '').replace('•', '').replace('	', '').replace('	', '');
    })

    eleventyConfig.addFilter('jsonify', function(obj) {
        return JSON.stringify(obj, null, 2);
    });

}
