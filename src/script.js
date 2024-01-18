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

  return `${hours}:${minutes}, ${day}
  (${month} ${dates}, ${year})`;
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

let formInput = document.querySelector("#form-input");
formInput.addEventListener("submit", searchButton);

searchCity("Centennial");
