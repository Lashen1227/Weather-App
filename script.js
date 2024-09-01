const apiKey = "f378934a7de2f8947019e3f5b1f39691";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const toggleUnitBtn = document.querySelector(".toggle-unit");

// Check weather function
async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        } else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "images/snow.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

    }
}

// Event listeners
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Toggle between Celsius and Fahrenheit
toggleUnitBtn.addEventListener("click", () => {
    const tempElement = document.querySelector(".temp");
    const currentTemp = parseFloat(tempElement.innerHTML);

    if (tempElement.innerHTML.includes("°c")) {
        const fahrenheitTemp = (currentTemp * 9 / 5) + 32;
        tempElement.innerHTML = Math.round(fahrenheitTemp) + "°f";
    } else {
        const celsiusTemp = (currentTemp - 32) * 5 / 9;
        tempElement.innerHTML = Math.round(celsiusTemp) + "°c";
    }
});

// Allow pressing enter key to trigger search
searchBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});