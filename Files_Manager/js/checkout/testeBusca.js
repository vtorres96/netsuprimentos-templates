busca.onkeyup = function(e) {
  var valorDigitado = this.value;

  if (!valorDigitado) {
    return;
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
        Object.entries(response.products).forEach(([key, value]) => {
          console.log(
            " value nome => " + value.name + " value preco => " + value.price
          );
        });
      });

    // Search
    // let valorDigitado = "cartucho";
    // const createSlug = str => {
    //   const stringWithoutSpecialCaracters = str.replace(/[^\w\s]/gi, "");
    //   const stringWithOneSpace = stringWithoutSpecialCaracters.replace(
    //     /\s\s+/g,
    //     " "
    //   );
    //   const stringWithoutSpaces = stringWithOneSpace.replace(/ /g, "-");
    //   const loweredString = stringWithoutSpaces.toLowerCase();

    //   return loweredString;
    // };
    // fetch(
    //   "https://api.linximpulse.com/engage/search/v3/search?apiKey=netsuprimentos&secretKey=kYmCE9OyMNmhZuOOcZlacQ==&terms=" +
    //     valorDigitado,
    //   {
    //     method: "GET",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json"
    //     }
    //   }
    // )
    //   .then(response => response.json())
    //   .then(response => {
    //     Object.entries(response.products).forEach(([key, value]) => {
    //       console.log(
    //         "urlProduct => " +
    //           value.url +
    //           "\n" +
    //           " value nome => " +
    //           value.name +
    //           "\n" +
    //           " value preco => " +
    //           value.price
    //       );
    //     });
    //   });
  }, 500);
};
