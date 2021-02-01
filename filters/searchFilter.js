const elasticlunr = require("elasticlunr");

module.exports = function (collection) {
    // what fields we'd like our index to consist of
    var index = elasticlunr(function () {
        this.addField("ministerios");
        this.addField("unidad_ejecutora");
        this.addField("pagina_web");
        this.addField("nombre");
        this.setRef("id");
    });

    // loop through each page and add it to the index
    collection.forEach(item => {
        index.addDoc({
            id: item.url,
            ministerios: item.data.servicio.ministerios,
            unidad_ejecutora: item.data.servicio.unidad_ejecutora,
            pagina_web: item.data.servicio.pagina_web,
            nombre: item.data.servicio.nombre
        });
    });

    return index.toJSON();
};