const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon");
const border = document.querySelector(".form-control");
const forecast = document.querySelector(".forecast");



/* User Location erlaubt */
const permissionSuccess = async (position) => {
  const weather = await getWeatherByPermission(position.coords.latitude, position.coords.longitude);
  const forecastData = await getForecast(position.coords.latitude, position.coords.longitude);
  displayCard(weather, forecastData);
}

/* User Location abgelehnt */
const permissionDenied = () => {
  border.classList.add("animation-border");
};

/* Nachfrage User Location */
window.navigator.geolocation.getCurrentPosition(permissionSuccess, permissionDenied);

/* Anzeige auf der Card */
const displayCard = (data, forecastData) => {

  /* Daten anzeigen */
  details.innerHTML = `
  <h5 class="my-3">${data.name}</h5>
        <div class="my-3">${data.weather[0].description}</div>
        <div class="display-4 my-4">
          <span>${Math.round(data.main.temp)}</span>
          <span>&deg;C</span>
        </div>
  `;

  /* Wetter icons setzen */
  icon.innerHTML = `
  <div class="icon bg light mx-auto text-center">
  <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Wetter Symbol">
  </div>
  `;

  for (let i = 1; i < 8; i++) {
    forecast.innerHTML += `
      <div class="col">
        <img src="http://openweathermap.org/img/wn/${forecastData.daily[i].weather[0].icon}@2x.png" alt="Wetter Symbol">
         <div class="my-1">
         <span>${Math.round(forecastData.daily[i].temp.day)}</span>
         <span>&deg;C</span>
      </div>
    </div>`;
  }

  /* d-none Klasse entfernen falls vorhanden */
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

/* Ausgelesene Stadt benutzen um Wetter abzurufen */
const setCity = async (city) => {
  const weather = await getWeather(city);
  const forecastData = await getForecast(weather.coord.lat, weather.coord.lon);
  displayCard(weather, forecastData);
};

/* Name Stadt auslesen */
cityForm.addEventListener("submit", e => {
  e.preventDefault();
  const city = cityForm.city.value.trim();
  cityForm.reset();
  setCity(city);
});