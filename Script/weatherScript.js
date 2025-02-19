const weather_codes = {
    0: {
        name: "Clear Sky",
        icon: "../Assets/WeatherIcon/sun.svg"
    },
    1: {
        name: "Mainly Clear",
        icon: "../Assets/WeatherIcon/sun.svg"
    },
    2: {
         name: "Partly Cloudy",
         icon: "../Assets/WeatherIcon/cloudy.svg"
    },
    3: {
        name: "Overcast",
        icon: "../Assets/WeatherIcon/cloudy.svg"
    },
    45: {
        name: "Fog",
        icon: "../Assets/WeatherIcon/fog.svg"
    },
    48: {
        name: "Rime Fog",
        icon: "../Assets/WeatherIcon/fog.svg"
    },
    51: {
         name: "Light Drizzle",
         icon: "../Assets/WeatherIcon/rain.svg"
    },
    53: {
         name: "Moderate Drizzle",
         icon: "../Assets/WeatherIcon/rain.svg"
    },
    55: {
         name: "Heavy Drizzle",
         icon: "../Assets/WeatherIcon/rain.svg"
    },
    56: {
         name: "Light Freezing Drizzle",
         icon: "../Assets/WeatherIcon/rain.svg"
    },
    57: {
         name: "Dense Freezing Drizzle",
         icon: "../Assets/WeatherIcon/rain.svg"
    },
    61: {
         name: "Slight Rain",
         icon: "../Assets/WeatherIcon/rain.svg"
    },
    63: {
         name: "Moderate Rain",
         icon: "../Assets/WeatherIcon/rain.svg"
    },
    65: {
         name: "Heavy Rain",
         icon: "../Assets/WeatherIcon/rain.svg"
    },
    66: {
         name: "Light Freezing Rain",
         icon: "../Assets/WeatherIcon/rain.svg"
    },
    67: {
         name: "Heavy Freezing Rain",
         icon: "../Assets/WeatherIcon/rain.svg"
    },
    71: {
         name: "Slight snowfall",
         icon: "../Assets/WeatherIcon/snow.svg"
    },
    73: {
         name: "Moderate snowfall",
         icon: "../Assets/WeatherIcon/snow.svg"
    },
    75: {
         name: "Heavy snowfall",
         icon: "../Assets/WeatherIcon/snow.svg"
    },
    77: {
         name: "Snow Grains",
         icon: "../Assets/WeatherIcon/snow.svg"
    },
    80: {
         name: "Slight Rain Showers",
         icon: "../Assets/WeatherIcon/rain.svg"
    },
    81: {
         name: "Moderate Rain Showers",
         icon: "../Assets/WeatherIcon/rain.svg"
    },
    82: {
         name: "Violent Rain Showers",
         icon: "../Assets/WeatherIcon/rain.svg"
    },
    85: {
         name: "Light Snow Showers",
         icon: "../Assets/WeatherIcon/snow.svg"
    },
    86: {
         name: "Heavy Snow Showers",
         icon: "../Assets/WeatherIcon/snow.svg"
    },
    95: {
         name: "Thunderstorm",
         icon: "../Assets/WeatherIcon/rain.svg"
    },
    96: {
         name: "Slight Hailstorm",
         icon: "../Assets/WeatherIcon/snow.svg"
    },
    99: {
         name: "Heavy Hailstorm",
         icon: "../Assets/WeatherIcon/snow.svg"
    }
};
let lat = 0;
let long = 0;

const temperature = document.querySelector(".temperature");
const weather = document.querySelector(".weather-code");
const windSpeed = document.querySelector(".speed");
const humid = document.querySelector(".humid-percent");
const weatherIcon = document.querySelector(".weatherIcon");
const container = document.querySelector(".container");

let cityTemp = 0;
let cityHumid = 0;
let cityWeather = 0;
let cityWind = 0;

async function getData() {
    const cityInput = document.querySelector(".city-input").value.trim();
    
    if (!cityInput) {
        alert("Please enter a city name.");
        return false;
    }

    try {
        console.log("Fetching city data...");
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityInput}&language=en&format=json`);

        if (!response.ok) {
            throw new Error("City not found.");
        }

        const cityData = await response.json();

        if (!cityData.results || cityData.results.length === 0) {
            throw new Error("Invalid city name.");
        }

        console.log("City data fetched:", cityData);
        lat = cityData.results[0].latitude;
        long = cityData.results[0].longitude;

        return true; 
    } catch (error) {
        console.error("Error fetching city data:", error);
        alert(error.message);
        return false;
    }
}

async function getWeather() {
    try {
        console.log("Fetching weather data...");
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`);

        if (!response.ok) {
            throw new Error("Error fetching weather data.");
        }

        const weatherData = await response.json();

        if (!weatherData.current) {
            throw new Error("Weather data unavailable.");
        }

        const currentWeather = weatherData.current;
        cityTemp = Math.round(currentWeather.temperature_2m);
        cityHumid = currentWeather.relative_humidity_2m;
        cityWeather = currentWeather.weather_code;
        cityWind = currentWeather.wind_speed_10m;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert(error.message);
    }
}

async function displayResult() {
    if (!(await getData())) return; 
    await getWeather();

    container.classList.add("active");

    temperature.textContent = `${cityTemp}°C`;
    humid.textContent = `${cityHumid}%`;
    weather.textContent = weather_codes[cityWeather]?.name || "Unknown";
    windSpeed.textContent = `${cityWind} Km/h`;

    if (weather_codes[cityWeather]?.icon) {
        weatherIcon.src = weather_codes[cityWeather].icon;
    } else {
        weatherIcon.src = "default-weather-icon.png"; 
    }
}
