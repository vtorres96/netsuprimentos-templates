campoBusca.onkeyup = function(e) {
  var valorDigitado = this.value;
  var listaProdutosFiltrados = document.querySelector(
    "#listaProdutosFiltrados"
  );

  if (!valorDigitado || valorDigitado.length <= 0) {
    listaProdutosFiltrados.innerHTML = "";
  }

  if (e.key === "Backspace") {
    return;
  }

  window.clearInterval(window.espera);

  window.espera = setTimeout(function() {
    // AutoComplete
    fetch(
      "https://api.linximpulse.com/engage/search/v3/autocompletes?apiKey=netsuprimentos&secretKey=kYmCE9OyMNmhZuOOcZlacQ==&prefix=" +
        valorDigitado,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(response => {
        var products = Object.entries(response.products);

        var productsMap = [];

        productsMap = products
          .map(([key, product]) => {
            var htmlTarefa = `
            <a href="https://netsuprimentos.com.br/${product.url}" target="blank">
                <li class="list-group-item">
                    <div><img class="d-inline-block" src="https://b2bnaweb.vteximg.com.br/${product.images.default}" width="50" height="50"/></div>
                    <div>${product.name}</div>
                    <div>R$ ${product.price}</div>
                </li>
            </a>
           `;
            return htmlTarefa;
          })
          .join("");
        listaProdutosFiltrados.innerHTML = productsMap;
      });
  }, 100);
};
