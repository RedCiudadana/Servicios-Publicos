(function (window, document) {
    "use strict";
    
    const cuadro = document.getElementById('searchResultsv2');
    const resEl = document.getElementById("searchResultsv2");
    let debounceTimer;

    const search = (e) => {
        clearTimeout(debounceTimer);

        debounceTimer = setTimeout(() => {
            const results = window.searchIndex.search(e.target.value, {
                bool: "OR",
                expand: true,
            });

            resEl.innerHTML = "";
            if (results) {
                cuadro.style.display = "block"
                cuadro.classList.add("search-border");
                cuadro.classList.add("searchResultsv2");
                results.forEach((r) => {
                    const { id, nombre } = r.doc;
                    const el = document.createElement("li");
                    const p = document.createElement("p");
                    const a = document.createElement("a");

                    a.setAttribute("href", id);
                    a.textContent = nombre;
                    p.appendChild(a);
                    el.appendChild(p);
                    resEl.appendChild(el);
                });
            }
            if (cuadro.childNodes.length < 1) {
                cuadro.classList.remove("search-border", "searchResultsv2");
            }
        }, 150); // Ajusta el tiempo de espera según sea necesario
    };

    fetch("/search-index.json").then((response) =>
        response.json().then((rawIndex) => {
            window.searchIndex = elasticlunr.Index.load(rawIndex);
            document.getElementById("searchFieldv2").addEventListener("input", search);
            document.getElementById("keypress", function(event) {
                if (event.key === "Enter") {
                    alert(event.key  + " " + event.which);
                    event.preventDefault();
                }
            });
        })
    );
})(window, document);
