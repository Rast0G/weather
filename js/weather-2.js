
// DOM Elements
const mapElement = document.getElementById('map');
const mapPin = document.getElementById('map-pin');
const errorMessage = document.getElementById('error-message');
const loadingIndicator = document.getElementById('loading');
const weatherContainer = document.getElementById('weather-container');
const locationElement = document.getElementById('location');
const dateElement = document.getElementById('date');
const temperatureElement = document.getElementById('temperature');
const feelsLikeElement = document.getElementById('feels-like');
const weatherIcon = document.getElementById('weather-icon');
const weatherDescription = document.getElementById('weather-description');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('wind-speed');
const pressureElement = document.getElementById('pressure');
const visibilityElement = document.getElementById('visibility');
const forecastItems = document.getElementById('forecast-items');
const celsiusBtn = document.getElementById('celsius-btn');
const fahrenheitBtn = document.getElementById('fahrenheit-btn');
const bgGradient = document.getElementById('bg-gradient');

// API Key (in a real app, this would be secured)
const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

// Weather data storage
let weatherData = {
    current: null,
    forecast: null,
    units: 'metric', // Default to Celsius
    coordinates: {
        lat: 40.7128, // Default to New York
        lon: -74.0060
    }
};

// Event Listeners
mapElement.addEventListener('click', handleMapClick);
celsiusBtn.addEventListener('click', () => setTemperatureUnit('metric'));
fahrenheitBtn.addEventListener('click', () => setTemperatureUnit('imperial'));

// Initialize with default location
window.addEventListener('load', () => {
    getWeatherData(weatherData.coordinates.lat, weatherData.coordinates.lon);
});

// Handle map click
function handleMapClick(e) {
    // Get click coordinates relative to the map
    const rect = mapElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate percentage of click position
    const percentX = x / rect.width;
    const percentY = y / rect.height;
    
    // Position the pin
    mapPin.style.left = `${x}px`;
    mapPin.style.top = `${y}px`;
    mapPin.style.display = 'block';
    
    // Convert click position to geo coordinates (simplified for demo)
    // In a real app, you would use the Google Maps API to get actual coordinates
    const lat = 49 - (percentY * 25); // Rough approximation for US map
    const lon = -125 + (percentX * 60);
    
    // Update coordinates and get weather data
    weatherData.coordinates.lat = lat;
    weatherData.coordinates.lon = lon;
    getWeatherData(lat, lon);
}

// Get weather data from API
function getWeatherData(lat, lon) {
    showLoading();
    hideError();
    
    // In a real app, you would make actual API calls to OpenWeatherMap
    // For this demo, we'll simulate API responses with sample data
    
    setTimeout(() => {
        try {
            // Simulate successful API response
            const currentWeatherData = getSimulatedCurrentWeather(lat, lon);
            const forecastData = getSimulatedForecast(lat, lon);
            
            weatherData.current = currentWeatherData;
            weatherData.forecast = forecastData;
            
            updateUI();
            updateBackgroundGradient(currentWeatherData.weather[0].id);
            hideLoading();
        } catch (error) {
            showError(error.message);
            hideLoading();
        }
    }, 1000); // Simulate network delay
}

// Update UI with weather data
function updateUI() {
    const current = weatherData.current;
    const forecast = weatherData.forecast;
    
    // Update current weather
    locationElement.textContent = current.name;
    dateElement.textContent = formatDate(new Date());
    
    updateTemperatureDisplay();
    
    weatherIcon.src = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;
    weatherDescription.textContent = current.weather[0].description;
    
    humidityElement.textContent = `${current.main.humidity}%`;
    windSpeedElement.textContent = weatherData.units === 'metric' 
        ? `${current.wind.speed} m/s` 
        : `${current.wind.speed} mph`;
    pressureElement.textContent = `${current.main.pressure} hPa`;
    visibilityElement.textContent = `${(current.visibility / 1000).toFixed(1)} km`;
    
    // Update forecast
    updateForecastUI(forecast);
}

// Update temperature display based on selected unit
function updateTemperatureDisplay() {
    const current = weatherData.current;
    const temp = Math.round(current.main.temp);
    const feelsLike = Math.round(current.main.feels_like);
    
    const unit = weatherData.units === 'metric' ? '°' : '°';
    const unitLabel = weatherData.units === 'metric' ? '°C' : '°F';
    
    temperatureElement.innerHTML = `${temp}<span class="temperature-unit">${unit}</span>`;
    feelsLikeElement.textContent = `Feels like ${feelsLike}${unitLabel}`;
}

// Update forecast UI
function updateForecastUI(forecast) {
    forecastItems.innerHTML = '';
    
    forecast.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const day = formatDay(date);
        const temp = Math.round(item.main.temp);
        const unit = weatherData.units === 'metric' ? '°' : '°';
        const description = item.weather[0].description;
        const icon = item.weather[0].icon;
        
        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');
        forecastItem.innerHTML = `
            <p class="forecast-day">${day}</p>
            <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon" class="forecast-icon">
            <p class="forecast-temp">${temp}${unit}</p>
            <p class="forecast-description">${description}</p>
        `;
        
        forecastItems.appendChild(forecastItem);
    });
}

// Set temperature unit (Celsius or Fahrenheit)
function setTemperatureUnit(unit) {
    if (weatherData.units === unit) return;
    
    weatherData.units = unit;
    
    // Update UI to reflect unit change
    if (unit === 'metric') {
        celsiusBtn.classList.add('active');
        fahrenheitBtn.classList.remove('active');
    } else {
        celsiusBtn.classList.remove('active');
        fahrenheitBtn.classList.add('active');
    }
    
    // Convert temperatures
    if (weatherData.current) {
        // In a real app, you would either convert the temperatures or fetch new data
        // For this demo, we'll simulate new data with the selected unit
        getWeatherData(weatherData.coordinates.lat, weatherData.coordinates.lon);
    }
}

// Update background gradient based on weather condition
function updateBackgroundGradient(weatherId) {
    let primaryColor, secondaryColor;
    
    // Check time of day (simplified)
    const hour = new Date().getHours();
    const isDay = hour >= 6 && hour < 20;
    
    // Set colors based on weather condition and time
    if (weatherId >= 200 && weatherId < 300) {
        // Thunderstorm
        primaryColor = '#2c3e50';
        secondaryColor = '#4a6572';
    } else if (weatherId >= 300 && weatherId < 400) {
        // Drizzle
        primaryColor = '#3498db';
        secondaryColor = '#2c3e50';
    } else if (weatherId >= 500 && weatherId < 600) {
        // Rain
        primaryColor = '#2980b9';
        secondaryColor = '#3498db';
    } else if (weatherId >= 600 && weatherId < 700) {
        // Snow
        primaryColor = '#ecf0f1';
        secondaryColor = '#bdc3c7';
    } else if (weatherId >= 700 && weatherId < 800) {
        // Atmosphere (fog, mist, etc.)
        primaryColor = '#95a5a6';
        secondaryColor = '#7f8c8d';
    } else if (weatherId === 800) {
        // Clear sky
        if (isDay) {
            primaryColor = '#3498db';
            secondaryColor = '#00c6ff';
        } else {
            primaryColor = '#2c3e50';
            secondaryColor = '#4a6572';
        }
    } else if (weatherId > 800) {
        // Clouds
        if (isDay) {
            primaryColor = '#5C9CE5';
            secondaryColor = '#83B8E7';
        } else {
            primaryColor = '#2c3e50';
            secondaryColor = '#34495e';
        }
    }
    
    // Update CSS variables
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--secondary-color', secondaryColor);
    
    // Update gradient
    bgGradient.style.background = `linear-gradient(to bottom, ${primaryColor}, ${secondaryColor})`;
}

// Helper Functions
function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function formatDay(date) {
    const options = { weekday: 'short' };
    return date.toLocaleDateString('en-US', options);
}

function showLoading() {
    loadingIndicator.style.display = 'block';
}

function hideLoading() {
    loadingIndicator.style.display = 'none';
}

function showError(message) {
    errorMessage.textContent = message || 'An error occurred. Please try again.';
    errorMessage.style.display = 'block';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 3000);
}

function hideError() {
    errorMessage.style.display = 'none';
}

// Simulated API responses (for demo purposes)
function getSimulatedCurrentWeather(lat, lon) {
    // Generate city name based on coordinates (simplified)
    const cities = [
        { name: 'New York', lat: 40.7128, lon: -74.0060 },
        { name: 'Los Angeles', lat: 34.0522, lon: -118.2437 },
        { name: 'Chicago', lat: 41.8781, lon: -87.6298 },
        { name: 'Houston', lat: 29.7604, lon: -95.3698 },
        { name: 'Phoenix', lat: 33.4484, lon: -112.0740 },
        { name: 'Philadelphia', lat: 39.9526, lon: -75.1652 },
        { name: 'San Antonio', lat: 29.4241, lon: -98.4936 },
        { name: 'San Diego', lat: 32.7157, lon: -117.1611 },
        { name: 'Dallas', lat: 32.7767, lon: -96.7970 },
        { name: 'San Francisco', lat: 37.7749, lon: -122.4194 }
    ];
    
    // Find closest city (very simplified)
    let closestCity = cities[0];
    let minDistance = 999999;
    
    cities.forEach(city => {
        const distance = Math.sqrt(
            Math.pow(city.lat - lat, 2) + 
            Math.pow(city.lon - lon, 2)
        );
        
        if (distance < minDistance) {
            minDistance = distance;
            closestCity = city;
        }
    });
    
    // Generate random temperature based on unit
    const tempBase = Math.floor(Math.random() * 15) + 15; // 15-30°C
    const temp = weatherData.units === 'metric' ? tempBase : celsiusToFahrenheit(tempBase);
    const feelsLike = temp + (Math.random() * 4 - 2); // +/- 2 degrees
    
    // Random weather conditions
    const conditions = [
        { id: 800, description: 'clear sky', icon: '01d' },
        { id: 801, description: 'few clouds', icon: '02d' },
        { id: 802, description: 'scattered clouds', icon: '03d' },
        { id: 803, description: 'broken clouds', icon: '04d' },
        { id: 500, description: 'light rain', icon: '10d' },
        { id: 501, description: 'moderate rain', icon: '10d' },
        { id: 200, description: 'thunderstorm', icon: '11d' },
        { id: 600, description: 'light snow', icon: '13d' },
        { id: 741, description: 'fog', icon: '50d' }
    ];
    
    const weatherCondition = conditions[Math.floor(Math.random() * conditions.length)];
    
    return {
        name: closestCity.name,
        main: {
            temp: temp,
            feels_like: feelsLike,
            humidity: Math.floor(Math.random() * 50) + 30, // 30-80%
            pressure: Math.floor(Math.random() * 50) + 1000 // 1000-1050 hPa
        },
        weather: [
            {
                id: weatherCondition.id,
                description: weatherCondition.description,
                icon: weatherCondition.icon
            }
        ],
        wind: {
            speed: (Math.random() * 10).toFixed(1) // 0-10 m/s or mph
        },
        visibility: Math.floor(Math.random() * 5000) + 5000 // 5000-10000 meters
    };
}

function getSimulatedForecast(lat, lon) {
    // Generate 5-day forecast
    const forecast = {
        list: []
    };
    
    const conditions = [
        { id: 800, description: 'clear sky', icon: '01d' },
        { id: 801, description: 'few clouds', icon: '02d' },
        { id: 802, description: 'scattered clouds', icon: '03d' },
        { id: 803, description: 'broken clouds', icon: '04d' },
        { id: 500, description: 'light rain', icon: '10d' },
        { id: 501, description: 'moderate rain', icon: '10d' },
        { id: 200, description: 'thunderstorm', icon: '11d' },
        { id: 600, description: 'light snow', icon: '13d' },
        { id: 741, description: 'fog', icon: '50d' }
    ];
    
    // Current date
    const now = new Date();
    
    // Generate forecast for next 5 days
    for (let i = 1; i <= 5; i++) {
        const date = new Date();
        date.setDate(now.getDate() + i);
        
        const tempBase = Math.floor(Math.random() * 15) + 15; // 15-30°C
        const temp = weatherData.units === 'metric' ? tempBase : celsiusToFahrenheit(tempBase);
        
        const weatherCondition = conditions[Math.floor(Math.random() * conditions.length)];
        
        forecast.list.push({
            dt: date.getTime() / 1000,
            main: {
                temp: temp
            },
            weather: [
                {
                    id: weatherCondition.id,
                    description: weatherCondition.description,
                    icon: weatherCondition.icon
                }
            ]
        });
    }
    
    return forecast;
}

function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}
