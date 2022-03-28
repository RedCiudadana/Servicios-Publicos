const elasticlunr = require("elasticlunr");

module.exports = function (collection) {
    // what fields we'd like our index to consist of
    var index = elasticlunr(function () {
        this.addField("ministerio");
        this.addField("unidad_ejecutora");
        this.addField("enlace");
        this.addField("nombre");
        this.setRef("id");
    });

    // loop through each page and add it to the index
    collection.forEach(item => {
        index.addDoc({
            id: item.url,
            ministerio: item.data.ministerio,
            unidad_ejecutora: item.data.unidad_ejecutora,
            enlace: item.data.enlace,
            nombre: item.data.nombre
        });
    });

    return index.toJSON();
};