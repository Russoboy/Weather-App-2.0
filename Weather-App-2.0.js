const searchBtn = document.getElementById('search-btn');
const locationInput = document.getElementById('location');
const weatherInfo = document.getElementById('weather-info');
const loading = document.getElementById('loading');

searchBtn.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location !== '') {
        getWeather(location);
    } else {
        weatherInfo.innerHTML = '<p>Please enter a city name!</p>';
    }
});

const getWeather = (location) => {
    const apiKey = 'cd91157f12ce9e57fd64dc3a66e598e6';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    loading.style.display = 'block';
    weatherInfo.innerHTML = '';

    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`City not found (Error: ${response.status})`);
            }
            return response.json();
        })
        .then((data) => {
            displayWeather(data);
        })
        .catch((error) => {
            weatherInfo.innerHTML = `<p>${error.message}</p>`;
        })
        .finally(() => {
            loading.style.display = 'none';
        });
};

function displayWeather(data) {
    const cityName = data.name;
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const atmPressure = data.main.pressure;

    weatherInfo.innerHTML = `
        <h2>Weather in ${cityName}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Description: ${description}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
        <p>Pressure: ${atmPressure} hPa</p>
    `;
}
