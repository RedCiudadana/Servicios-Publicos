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
            ministerios: item.data.servicio.Ministerios,
            unidad_ejecutora: item.data.servicio.Unidad_Ejecutora,
            pagina_web: item.data.servicio.Página_web,
            nombre: item.data.servicio.Nombre
        });
    });

    return index.toJSON();
};