// ? Open Weather API
// ? Country Flag API
const apiKey = "2263d43a2f1bd15d4dd9f9f9c9060605";
const apiCountryURL = "https://countryflagsapi.com/png/";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const temperatureElement = document.querySelector("#temperature span");
const conditionElement = document.querySelector("#description");
const countryFlagElement = document.querySelector("#country-flag");
const weatherIconElement = document.querySelector("#weather-icon");
const umidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");

// ** Functions

const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

    // response vai esperar pela conclusão dessa requisição na API
    const res = await fetch(apiWeatherURL)
    //Resultado vai vir em JSON, portanto usa-se .json()
    const data = await res.json();

    console.log(data)
}

const showWeatherData = (city) => {

    getWeatherData(city)

}



// ** Events

// Evento de clique no botão
searchBtn.addEventListener("click", (e) => {
    // Evita erro ao fazer submit do formulário
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city);

})