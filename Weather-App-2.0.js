const searchBtn = document.getElementById('search-btn');
const locationInput = document.getElementById('location');
const weatherInfo = document.getElementById('weather-info');

searchBtn.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location !== '') {
        getWeather(location);
    }
});


const getWeather = (location) => {
    // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
    const apiKey = 'cd91157f12ce9e57fd64dc3a66e598e6';
    // const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=cd91157f12ce9e57fd64dc3a66e598e6&units=metric`;

    fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {displayWeather(data);})
    .catch((error) => { weatherInfo.textContent = 'Error fetching weather data.';});
    }

function displayWeather(data) {
    const cityName = data.name;
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const atmPressure = data.main.pressure;
// change the index to 1 and see what happens, make sure you are connected to the internet
    weatherInfo.innerHTML = `
        <h2>Weather in ${cityName}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Description: ${description}</p>
        <p>Description: ${humidity }%</p>
        <p>Description: ${windSpeed}m/s</p>    
        <p>Description: ${atmPressure}hPa</p>

    `;
}

