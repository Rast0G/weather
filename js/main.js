import {getWeather, showData} from './getWeather.js';
import {weatherData} from './weatherData.js';
import {forecastData} from './forecastData.js';


let lat;
let lng;
const appid = '84762e6c3fa09b7f49dd16d20b6543d0'
const map = L.map('map').setView([48.729116, 19.146423], 7); // Bratislava

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '© OpenStreetMap contributors'
}).addTo(map);

map.on('click', function(e) {
    lat = e.latlng.lat;
    lng = e.latlng.lng;;
    console.log(lat, lng)
    //showData(weatherData, forecastData)
    getWeather(lat, lng, appid);
});