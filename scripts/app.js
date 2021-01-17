const cityForm = document.querySelector("form");
const loadingAnimation = document.querySelector(".loading-animation");
const details = document.querySelector(".details");
const cityInput = document.querySelector(".change-location");
const forecast = document.querySelector(".forecast");
const card = document.querySelector(".card");



/* User Location erlaubt */
const permissionSuccess = async (position) => {
  const weather = await getWeatherByPermission(position.coords.latitude, position.coords.longitude);
  const forecastData = await getForecast(position.coords.latitude, position.coords.longitude);
  loadingAnimation.classList.add("d-none");
  displayCard(weather, forecastData);
  cityInput.classList.remove("d-none");
}

/* User Location abgelehnt */
const permissionDenied = () => {
  loadingAnimation.classList.add("d-none");
  cityInput.classList.remove("d-none");
};

/* Nachfrage User Location */
window.navigator.geolocation.getCurrentPosition(permissionSuccess, permissionDenied);

/* Anzeige auf der Card */
const displayCard = (data, forecastData) => {

  card.classList.add("rounded-corner");
  /* Aktuelle Wetterdaten anzeigen */
  details.innerHTML = `
    <div class="icon bg light mx-auto text-center">
    <div class="row">
    <div class="col my-auto">
    <div>Min</div>
    <div>${Math.round(data.main.temp_min * 10) / 10}<span>&deg;C</span></div>
  </div>
  <div class="col">
  <h5 class="mt-3 mb-0 bold text-upper">${data.name}</h5>
  <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Wetter Symbol">
    <div>${data.weather[0].description}</div>
    <div class="display-6 mb-3 bold">
      <span>${Math.round(data.main.temp * 10) / 10}</span>
      <span>&deg;C</span>
    </div>
  </div>
  <div class="col my-auto">
  <div>Max</div>
  <div>${Math.round(data.main.temp_max * 10) / 10}<span>&deg;C</span></div>
  </div>
  </div>
    
  `;

  /* Vorhersage auf die Karte setzen */
  forecast.innerHTML = ``;
  for (let i = 1; i < 7; i++) {

    /* Datum konvertieren */
    const milliseconds = forecastData.daily[i].dt * 1000;
    const dateObject = new Date(milliseconds).toLocaleDateString("de-DE", {
      weekday: "short",
      /* month: "short" */
    });

    forecast.innerHTML += `
      <div class="col my-4">
        <div>${dateObject}</div>
        <img src="http://openweathermap.org/img/wn/${forecastData.daily[i].weather[0].icon}@2x.png" height="90px" alt="Wetter Symbol">
         <div>
         <span>${Math.round(forecastData.daily[i].temp.day)}</span>
         <span>&deg;C</span>
      </div>
    </div>
    `;
  };
};

/* Ausgelesene Stadt benutzen um Wetter abzurufen */
const setCity = async (city) => {
  const weather = await getWeather(city);
  const forecastData = await getForecast(weather.coord.lat, weather.coord.lon);
  loadingAnimation.classList.add("d-none");
  displayCard(weather, forecastData);
};

/* Name Stadt auslesen */
cityForm.addEventListener("submit", e => {
  e.preventDefault();
  loadingAnimation.classList.remove("d-none");
  const city = cityForm.city.value.trim();
  cityForm.reset();
  setCity(city);
});