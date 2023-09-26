function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
     if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

    function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days=["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"]

    return days[day];
    }
     

     function displayForecast(response) {
     let forecast= response.data.daily;
     let forecastElement = document.querySelector("#forecast");
     

    let forecastHTML = `<div class="row">`;

       forecast.forEach(function (forecastday, index) {
        if (index < 6) {
      forecastHTML =
        forecastHTML +
        `                 
        <div class="col-2">
          <div class="weather-forecast-date">${formatDay(forecastday.dt)}</div>
          
             <img src="http://openweathermap.org/img/wn/${forecastday.weather[0].icon}@2x.png" alt="" width="42" />
                <span class="weather-forecast-temp-max">${Math.round(forecastday.temp.max)}º </span>
                <span class="weather-forecast-temp-min"> ${Math.round(forecastday.temp.min)}º </span>
                    </div>
                    
                `;
          }
          });
                forecastHTML = forecastHTML + `</div>`;
                 forecastElement.innerHTML = forecastHTML;

        }

        function getForecast(coordinates) {
            console.log(coordinates);
            let apiKey = "ca0db41e2e878c74a1dfc7ffece370d4";
            let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
            axios.get(apiUrl).then(displayForecast);
        }

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");


  celciusTemp = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celciusTemp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  getForecast(response.data.coord);
}
 

function search(city) {
    let apiKey = "ca0db41e2e878c74a1dfc7ffece370d4";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayTemperature);

}
function handlesearch(event) {
    event.preventDefault();
    let cityNameElement = document.querySelector("#city-name");
    search(cityNameElement.value);
}


let form = document.querySelector("#search-form");
form.addEventListener("submit", handlesearch);



search("Chicago");

