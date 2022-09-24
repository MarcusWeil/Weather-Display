// ? Open Weather API
const apiKey = "2263d43a2f1bd15d4dd9f9f9c9060605";
const apiCountryURL = "https://countryflagsapi.com/png/";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

// ** Functions


// ** Events

// Evento de clique no botão
searchBtn.addEventListener("click", (e) => {

    // Evita erro ao fazer submit do formulário
    e.preventDefault();

    console.log('clickEvent');

})