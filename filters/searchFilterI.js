const elasticlunr = require("elasticlunr");

module.exports = function (collection) {
    // what fields we'd like our index to consist of
    var index = elasticlunr(function () {
        this.addField("nombre");
        this.setRef("id");
    });

    // loop through each page and add it to the index
    collection.forEach(item => {
        index.addDoc({
            id: item.url,
            nombre: item.data.instituciones.name,
        });
    });

    return index.toJSON();
};