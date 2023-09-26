const searchBtn = document.getElementById('search-btn');
const locationInput = document.getElementById('location');
const weatherInfo = document.getElementById('weather-info');

searchBtn.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location !== '') {
        getWeather(location);
    }
});

function getWeather(location) {
    // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
    const apiKey = 'YOUR_API_KEY';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            displayWeather(data);
        })
        .catch((error) => {
            weatherInfo.textContent = 'Error fetching weather data.';
        });
}

function displayWeather(data) {
    const cityName = data.name;
    const temperature = data.main.temp;
    const description = data.weather[0].description;

    weatherInfo.innerHTML = `
        <h2>Weather in ${cityName}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Description: ${description}</p>
    `;
}
