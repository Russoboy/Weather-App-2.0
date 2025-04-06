// const { createProxyMiddleware } = require('http-proxy-middleware');
// app.use('/api', createProxyMiddleware({ target: 'https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric', changeOrigin: true }));


const searchBtn = document.getElementById('search-btn');
const locationInput = document.getElementById('location');
const weatherInfo = document.getElementById('weather-info');
const loading = document.getElementById('loading');
const inputError = document.getElementById('Error');
const refreshBtn = document.getElementById('refresh-btn');

searchBtn.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location !== '') {
        getWeather(location);
        refreshBtn.style.display = "block"; // Show button
        refreshBtn.innerHTML = '<button id="refresh-btn" >Refresh</button>'; 

    } else {
        inputError.textContent = "Please enter a location.";
        inputError.style.display = "block"; // Show error message
        weatherInfo.innerHTML = ""; // Clear weather data
        
        setTimeout(()=>{
            inputError.style.display="none";
           }, 5000);
           
    }
});

refreshBtn.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location !== '') {
        getWeather(location);
    }
})


const getWeather = (location) => {
    const apiKey = 'PUT YOUR API_KEY';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    loading.style.display = "block"; // Show the loading indicator
    weatherInfo.innerHTML = ""; // Clear previous weather info
    inputError.style.display = "none"; // Hide any previous error messages
 
    setTimeout(()=>{
        inputError.style.display="none";
       }, 5000);
       
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            
                if (data.cod === "404") {
                // If city is not found
                inputError.textContent = "Invalid city. Please try again.";
                inputError.style.display = "block"; // Show error
                weatherInfo.innerHTML = ""; // Clear weather info
                setTimeout(()=>{
                    inputError.style.display="none";
                   }, 5000);
                   
            } else {
                // Display the weather data
                displayWeather(data);
            }
        })
        .catch((error) => {
            // Handle fetch errors (e.g., network issues)
            inputError.textContent = "Error fetching data. Please check your connection.";
            inputError.style.display = "block"; // Show error
            inputError.style.color = "red"; // Show error
            setTimeout(()=>{ inputError.style.display="none";
               }, 5000);
               
        })
        .finally(() => {
            loading.style.display = "none"; // Hide the loading indicator
        });
};



function displayWeather(data) {
    const cityName = data.name;
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const atmPressure = data.main.pressure;
    const weatherIcon = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    const timeZone = data.timezone;
    const latitudeCord = data.coord.lon;
    const longitudeCord = data.coord.lat;

    weatherInfo.innerHTML = `
        <h2>Weather in ${cityName}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Description: ${description}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
        <p>Pressure: ${atmPressure} hPa</p>
        <img src="${iconUrl}" alt="Weather Icon"  style="width: 100px; height: 100px;">
        <p>timeZone: ${timeZone}</p>
        <p>latitude: ${latitudeCord}</p>
        <p>longitude : ${longitudeCord}</p>  
        `;
}
