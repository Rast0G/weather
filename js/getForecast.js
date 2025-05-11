import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';


export function generateForecastHTML (data) {
    let fiveDayArray = {};
    let html = '';
    data.list.forEach((interval) => {
        let date = interval.dt_txt.split(' ')[0]

        if (!fiveDayArray[date]) {
            fiveDayArray[date] = []
        }
        
        fiveDayArray[date].push(interval)
    })

    delete fiveDayArray[Object.keys(fiveDayArray)[0]]; // Remove first key
    delete fiveDayArray[Object.keys(fiveDayArray)[Object.keys(fiveDayArray).length - 1]]; // Remove last key

    let i = 1;
    Object.entries(fiveDayArray).forEach((day) => {
        //console.log(day)
        let averageTemp = 0;
        let lowestTemp = day[1][0].main.temp;
        let highestTemp = day[1][0].main.temp;
        const counts = {};
        const iconDescriptions = {};

        day[1].forEach((interval) => {
            const intervalTemp = interval.main.temp
            averageTemp += intervalTemp/8

            if (interval.weather[0].icon[2] === 'd') {
                const icon = interval.weather[0].icon;
                const description = interval.weather[0].main;
                counts[icon] = (counts[icon] || 0) + 1;
                if (!iconDescriptions[icon]) {
                    iconDescriptions[icon] = description;
                }
            }

            if (intervalTemp < lowestTemp) {
                lowestTemp = intervalTemp;
            }
            if (intervalTemp > highestTemp) {
                highestTemp = intervalTemp;
            }
        })

        const mostUsedIcon = Object.entries(counts).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
        const mostUsedDescription = iconDescriptions[mostUsedIcon];

        const showIcon = mostUsedIcon[0] + mostUsedIcon[1]
        html += `
            <div class="forecast-item">
                <p class="forecast-day">${dayjs().add(i, 'days').format('dddd')}</p>
                <img src="https://openweathermap.org/img/wn/${showIcon}d.png" alt="Weather Icon" class="forecast-icon">
                <p class="forecast-temp">${Math.round(lowestTemp)}° - ${Math.round(highestTemp)}°</p>
                <p class="forecast-description">${mostUsedDescription}</p>
            </div>
        `
        i++;
    })

    return html
}