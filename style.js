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

function displayForecast() {
    let forecastElement = document.querySelector("#forecast");
     let days= ["Thu", "Fri", "Sat", "Sun"];

    let forecastHTML = `<div class="row">`;

    days.forEach(function (day) {
   
      forecastHTML =
      forecastHTML +
      `                 
        <div class="col-2">
          <div class="weather-forecast-date">${day}</div>
             <img src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png" alt="" width="42" />
                <span class="weather-forecast-temp-max"> 18º </span>
                <span class="weather-forecast-temp-min"> 12º </span>
                    </div>
                    </div>
                `;
          });
                forecastHTML = forecastHTML + `</div>`;
                 forecastElement.innerHTML = forecastHTML;

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
}
 
function search(city) {
    let apiKey = "ca0db41e2e878c74a1dfc7ffece370d4";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);

}
function handlesearch(event) {
    event.preventDefault();
    let cityNameElement = document.querySelector("#city-name");
    search(cityNameElement.value);
}

function displayFahrenheitTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    let fahrenheitTemp = (celciusTemp * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelciusTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celciusTemp);
}

let celciusTemp = null;


let form = document.querySelector("#search-form");
form.addEventListener("submit", handlesearch);

let fahrenheitlink = document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click", displayFahrenheitTemp);

let celciuslink = document.querySelector("#celcius-link");
celciuslink.addEventListener("click", displayCelciusTemp);


search("Chicago");
displayForecast();
