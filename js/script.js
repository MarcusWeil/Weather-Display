// ? Open Weather API
// ? Country Flag API
const apiKey = "2263d43a2f1bd15d4dd9f9f9c9060605";
const apiConditionURL = "http://openweathermap.org/img/wn/"
const apiCountryURL = "https://countryflagsapi.com/png/";
const apiUnsplash = "https://source.unsplash.com/1600x900/?"

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const weatherContainer = document.querySelector("#weather-data");
const cityElement = document.querySelector("#city");
const temperatureElement = document.querySelector("#temperature span");
const conditionElement = document.querySelector("#description");
const countryFlagElement = document.querySelector("#country-flag");
const weatherIconElement = document.querySelector("#weather-icon");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");
const loader = document.querySelector("#loader");
const error = document.querySelector("#search-error");

// ** Functions

const displayError = () => {
    error.classList.remove('hide');
}

//Exibe o Loading
const toggleLoader = () => {
    loader.classList.toggle("hide");
};
const hideData = () => {
    weatherContainer.classList.add('hide');
    error.classList.add('hide');
};

//Tornar a primeira letra de uma string maiúscula.
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const getWeatherData = async (city) => {
    toggleLoader();
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

    // response vai esperar pela conclusão dessa requisição na API
    const res = await fetch(apiWeatherURL)
    //Resultado vai vir em JSON, portanto usa-se .json()
    const data = await res.json();


    toggleLoader();
    return data;
}

const showWeatherData = async (city) => {
    //Oculta qualquer informação antes da nova solicitação
    hideData();
    // data vai aguardar pelo resultado desse método, que vai retornar o JSON anterior.
    const data = await getWeatherData(city);

    if (data.cod == 404) {
        displayError();
    }

    cityElement.innerText = data.name;
    temperatureElement.innerText = data.main.temp.toFixed(1);
    conditionElement.innerText = capitalizeFirstLetter(data.weather[0].description);
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed.toFixed(1)}km/h`;
    //CountryFlagElement que representa country-flag no HTML terá o atributo src setado para o seguinte valor:
    countryFlagElement.setAttribute("src", apiCountryURL + data.sys.country);
    weatherIconElement.setAttribute("src", apiConditionURL + `${data.weather[0].icon}.png`);
    document.body.style.background = `url("${apiUnsplash + data.weather[0].main}")`
    weatherContainer.classList.remove("hide");
}



// ** Events

// Evento de clique no botão
searchBtn.addEventListener("click", (e) => {
    // Evita erro ao fazer submit do formulário
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city);

});

//Evento de "tecla pressionada" que deve ser percebida dentro do cityInput
cityInput.addEventListener("keyup", (e) => {
    //se a tecla pressionada neste elemento for Enter, então:
    if (e.code === "Enter") {
        //Atribui à city o valor atual do field nesse contexto e realiza a busca
        const city = e.target.value;
        showWeatherData(city);
    }
})