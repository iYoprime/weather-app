const apiKey = 'YOUR_API_KEY';  // Replace with your OpenWeatherMap API Key

// Check if geolocation is available
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showWeather, showError);
} else {
    alert("Geolocation is not supported by this browser.");
}

// Show weather based on geolocation
async function showWeather(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            alert("Unable to fetch weather data.");
            return;
        }

        const { name, weather, main, wind } = data;
        const temperature = main.temp;
        const weatherDescription = weather[0].description;
        const weatherIcon = weather[0].icon;
        const humidity = main.humidity;
        const windSpeed = wind.speed;

        document.getElementById('city-name').textContent = name;
        document.getElementById('temperature').textContent = `${temperature} °C`;
        document.getElementById('condition').textContent = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
        document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
        document.getElementById('wind-speed').textContent = `Wind: ${windSpeed} m/s`;

        // Set weather icon image
        document.getElementById('weather-icon').style.backgroundImage = `url('https://openweathermap.org/img/wn/${weatherIcon}@2x.png')`;

        // Change background based on weather condition
        const condition = weatherDescription.toLowerCase();
        if (condition.includes('clear')) {
            document.body.style.backgroundImage = "url('https://example.com/clear-sky.jpg')";
        } else if (condition.includes('cloud')) {
            document.body.style.backgroundImage = "url('https://example.com/cloudy-sky.jpg')";
        } else if (condition.includes('rain')) {
            document.body.style.backgroundImage = "url('https://example.com/rainy-sky.jpg')";
        } else if (condition.includes('snow')) {
            document.body.style.backgroundImage = "url('https://example.com/snowy-sky.jpg')";
        } else {
            document.body.style.backgroundImage = "url('https://example.com/default-sky.jpg')";
        }

    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Error fetching weather data.");
    }
}

// Show error if geolocation fails
function showError(error) {
    alert("Error fetching your location: " + error.message);
}
