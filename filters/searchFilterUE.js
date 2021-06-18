const elasticlunr = require("elasticlunr");

module.exports = function (collection) {
    // what fields we'd like our index to consist of
    var index = elasticlunr(function () {
        this.addField("unidad_ejecutora");
        this.addField("ministerio");
        this.addField("web");
        this.setRef("id");
    });

    // loop through each page and add it to the index
    collection.forEach(item => {
        index.addDoc({
            id: item.url,
            unidad_ejecutora: item.data.unidad.unidad_ejecutora,
            ministerios: item.data.unidad.ministerio,
            pagina_web: item.data.unidad.web,
        });
    });

    return index.toJSON();
};