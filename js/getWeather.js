export async function getWeather(lat, lng, appid) {
    try {
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${appid}&units=metric`);
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${appid}&units=metric`);
        const weatherData = await weatherResponse.json()
        const forecastData = await forecastResponse.json();
        console.log(weatherData);
        console.log(forecastData);
        //showData(weatherData);
        //showData(forecastData);
    } catch (err) {
        console.error('Fetch error:', err);
    }
}

export function showData(weatherData, forecastData) {
    
    const name = weatherData.name;
    const temp = Math.round(weatherData.main.temp);
    const tempFeels = Math.round(weatherData.main.feels_like);
    const humidity = weatherData.main.humidity;
    const wind = weatherData.wind.speed
    const pressure = weatherData.main.pressure
    const visibility = Math.round(weatherData.visibility/1000)

    const windDir = weatherData.wind.deg
    const main = weatherData.weather[0].main;
    const desc = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon
    

    /*
    const name = 'Kosice';
    const temp = 13;
    const tempFeels = 11;
    const humidity = 60;
    const wind = 2
    const deg = 360
    const compas = dirToCompass(deg)
    console.log(compas)
    const predp = compas === 'severu' || compas === 'severovýchodu' || compas === 'západu' || compas === 'severozápadu' ? 'zo' :'z';
    */

    const html = `
        <h2 class="location" id="location">${name}</h2>
            <p class="date" id="date">Monday, June 10, 2023</p>
            
            <div class="temperature-container">
                <img src="https://openweathermap.org/img/wn/01d@2x.png" alt="Weather Icon" class="weather-icon" id="weather-icon">
                <div class="temperature" id="temperature">
                    ${temp}<span class="temperature-unit">°</span>
                </div>
                <h3 class="weather-description" id="weather-description">${desc}</h3>
                <p class="feels-like" id="feels-like">Feels like ${tempFeels}°</p>
                <div class="unit-toggle">
                    <button class="unit-btn active" id="celsius-btn">°C</button>
                    <button class="unit-btn" id="fahrenheit-btn">°F</button>
                </div>
            </div>

            
        <div class="weather-details js-weather-details">
            <div class="detail-item">
                <p class="detail-label">Humidity</p>
                <p class="detail-value" id="humidity">${humidity}%</p>
            </div>
            <div class="detail-item">
                <p class="detail-label">Wind</p>
                <p class="detail-value" id="wind-speed">${wind} m/s</p>
            </div>
            <div class="detail-item">
                <p class="detail-label">Pressure</p>
                <p class="detail-value" id="pressure">${pressure} hPa</p>
            </div>
            <div class="detail-item">
                <p class="detail-label">Visibility</p>
                <p class="detail-value" id="visibility">${visibility} km</p>
            </div>
        </div>
        
        <div class="forecast-container">
            <h3 class="forecast-title">5-Day Forecast</h3>
            <div class="forecast-items" id="forecast-items">
                <div class="forecast-item">
                    <p class="forecast-day">Tue</p>
                    <img src="https://openweathermap.org/img/wn/01d.png" alt="Weather Icon" class="forecast-icon">
                    <p class="forecast-temp">26°</p>
                    <p class="forecast-description">Clear</p>
                </div>
                <div class="forecast-item">
                    <p class="forecast-day">Wed</p>
                    <img src="https://openweathermap.org/img/wn/02d.png" alt="Weather Icon" class="forecast-icon">
                    <p class="forecast-temp">24°</p>
                    <p class="forecast-description">Few clouds</p>
                </div>
                <div class="forecast-item">
                    <p class="forecast-day">Thu</p>
                    <img src="https://openweathermap.org/img/wn/10d.png" alt="Weather Icon" class="forecast-icon">
                    <p class="forecast-temp">22°</p>
                    <p class="forecast-description">Rain</p>
                </div>
                <div class="forecast-item">
                    <p class="forecast-day">Fri</p>
                    <img src="https://openweathermap.org/img/wn/03d.png" alt="Weather Icon" class="forecast-icon">
                    <p class="forecast-temp">25°</p>
                    <p class="forecast-description">Clouds</p>
                </div>
                <div class="forecast-item">
                    <p class="forecast-day">Sat</p>
                    <img src="https://openweathermap.org/img/wn/01d.png" alt="Weather Icon" class="forecast-icon">
                    <p class="forecast-temp">27°</p>
                    <p class="forecast-description">Clear</p>
                </div>
            </div>
        </div>
    `;
    document.querySelector('.js-weather-container').innerHTML = html;
}

function dirToCompass (deg) {
    const compas = ['severu', 'severovýchodu', 'východu', 'juhovýchodu', 'juhu', 'juhozápadu', 'západu', 'severozápadu'];
    return compas[Math.round((deg/45)%8)];
}