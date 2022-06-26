function formatDate(day) {
  let date = day.getDate();
  let monthIndex = day.getMonth();
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

  let year = day.getFullYear();
  let dayIndex = day.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[dayIndex];
  let currentMonth = months[monthIndex];

  return `${currentDay}, ${date} ${currentMonth} ${year}`;
}

function formatTime(time) {
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#weather-forecast");

  forecastElement.innerHTML = "Forecast";
}

function displayCurrentWeather(response) {
  celsiusTemp = response.data.main.temp;

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
}

function searchCity(city) {
  let apiKey = "72f1b4e7ce1197f7931955c56328d81b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "72f1b4e7ce1197f7931955c56328d81b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("celsius-link");
  fahrenheitLink.classList.add("celsius-link");

  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.add("celsius-link");
  fahrenheitLink.classList.remove("celsius-link");

  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let dayDateElement = document.querySelector("#day-full-date");
let timeElement = document.querySelector("#full-time");
let currentTime = new Date();
dayDateElement.innerHTML = formatDate(currentTime);
timeElement.innerHTML = formatTime(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let celsiusTemp = null;

let iconElement = document.querySelector("#icon");
iconElement.setAttribute("src", `images/rain.png`);

searchCity("New York");
displayForecast();
