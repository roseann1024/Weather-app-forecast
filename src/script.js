function displayTemp(response) {
  let temperatureElement = document.querySelector("#weather-app-temperature");
  let cityElement = document.querySelector("#weather-app-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let iconElement = document.querySelector("#weather-app-icon");
  let now = new Date(response.data.time * 1000);

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}"/>`;
  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(now);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);

  getForecast(response.data.city);
}

function formatDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = days[now.getDay()];
  let minutes = now.getMinutes();
  let hours = now.getHours();
  let month = months[now.getMonth()];
  let year = now.getFullYear();
  let dates = now.getDate();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `<strong>${hours}:${minutes}</strong>, ${day}
  | ${month} ${dates}, ${year}`;
}
function searchCity(city) {
  let apiKey = "f78a0dbafabf13190c441b8cod34ftff";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

function searchButton(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#form-input-city");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[date.getDay() + 1];
}

function getForecast(city) {
  let apiKey = "f78a0dbafabf13190c441b8cod34ftff";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `        
    <div class="weather-forecast-day" id="weather-forecast-day">
      <div class="weather-forecast-date">${formatDay(day.time)}</div>
      <div class="weather-forecast-icon"><img
        src="${day.condition.icon_url}" alt="" width="88px" /></div>
      <span class="weather-forecast-temperature"><strong>${Math.round(
        day.temperature.maximum
      )}°</strong></span>
         &nbsp; <span class="weather-forecast-temperature">${Math.round(
           day.temperature.minimum
         )}°</span>
    </div>`;
    }
  });

  let forecastElement = document.querySelector("#weather-app-forecast");
  forecastElement.innerHTML = forecastHtml;
}

let formInput = document.querySelector("#form-input");
formInput.addEventListener("submit", searchButton);

searchCity("Centennial");
