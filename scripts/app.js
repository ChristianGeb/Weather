const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
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

  /* Aktuelle Wetterdaten anzeigen */
  details.innerHTML = `
    <div class="icon bg light mx-auto text-center">
      <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Wetter Symbol">
       </div>
        <h5 class="my-3">${data.name}</h5>
        <div class="my-3">${data.weather[0].description}</div>
        <div class="display-4 my-2">
          <span>${Math.round(data.main.temp)}</span>
          <span>&deg;C</span>
        </div>
        <div class="mt-5 mb-2">Vorhersage</div>
  `;

  /* Vorhersage auf die Karte setzen */
  for (let i = 1; i < 7; i++) {

    /* Datum konvertieren */
    const milliseconds = forecastData.daily[i].dt * 1000;
    const dateObject = new Date(milliseconds).toLocaleDateString("de-DE", {
      day: "numeric",
      month: "long"
    });

    forecast.innerHTML += `
      <div class="col my-4">
        <div>${dateObject}</div>
        <img src="http://openweathermap.org/img/wn/${forecastData.daily[i].weather[0].icon}@2x.png" alt="Wetter Symbol">
         <div>
         <span>${Math.round(forecastData.daily[i].temp.day)}</span>
         <span>&deg;C</span>
      </div>
    </div>
    `;
  };

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