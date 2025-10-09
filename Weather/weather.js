
        //weather data for today
dataSourceToday = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,temperature_2m_min,weather_code&models=gfs_seamless&current=temperature_2m&forecast_days=1";
fetch(dataSourceToday)
    .then((response)=> {return response.json();})
    .then((data)=>{
        let date =data.daily.time[0];
        let temperatureMax =data.daily.temperature_2m_max[0];
        let temperatureMin =data.daily.temperature_2m_min[0];
       
        document.getElementById("dateToday").textContent = date;
        document.getElementById("maxTemperature").textContent = temperatureMax;
        document.getElementById("minTemperature").textContent = temperatureMin;
        })
        .catch((err)=>{console.log(err);});

        //weather data for multiple days
dataSourceMultiple = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,temperature_2m_min,weather_code&models=gfs_seamless&current=temperature_2m&past_days=7";
fetch(dataSourceMultiple)
    .then((response)=> {return response.json();})
    .then((data)=>{
        let weatherDaily =data.daily;
        let times = weatherDaily.time;
        let temperatureMax = weatherDaily.temperature_2m_max;
        let temperatureMin = weatherDaily.temperature_2m_min;
        for (let i = 0; i < times.length; i++) {
            let line = document.createElement("tr");
            line.innerHTML = `<td>${times[i]}</td><td>${temperatureMax[i]}°C</td><td>${temperatureMin[i]}°C</td>`;
            document.getElementById("multipleDates").appendChild(line);
        }
        
        })
        .catch((err)=>{console.log(err);});

