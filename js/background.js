// Update background gradient based on weather condition
export function updateBackgroundGradient(weatherId, localTime) {
    const bgGradient = document.getElementById('bg-gradient');
    let primaryColor, secondaryColor;
    
    // Check time of day (simplified)
    const hour = new Date(localTime.formatted.replace(' ', 'T')).getHours();
    console.log(hour)
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

function showLoading() {
    loadingIndicator.style.display = 'block';
}

function hideLoading() {
    loadingIndicator.style.display = 'none';
}

