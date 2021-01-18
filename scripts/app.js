const cityForm = document.querySelector("form");
const loadingAnimation = document.querySelector(".loading-animation");
const details = document.querySelector(".details");
const cityInput = document.querySelector(".change-location");
const forecast = document.querySelector(".forecast");
const card = document.querySelector(".card");
const title = document.querySelector(".titleName");
const body = document.body;


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


/* Anzeige auf der Card */
const displayCard = (data, forecastData) => {

  /* Box vor dem Laden verstecken */
  card.classList.add("rounded-corner");

  /* Title ändern */
  title.innerHTML = `
  <h3 class="titleName text-center pt-4 pb-2">${data.name}</h3>
  `

  /* Aktuelle Wetterdaten anzeigen */
  details.innerHTML = `
    <div class="icon bg light mx-auto text-center">
    <div class="row">
    <div class="col-7 ps-3 mb-3">
  <i class="mb-3 mt-5 themeSwitcher ${declarePrefix(data)}" style="font-size:80px;"></i>
    <div>${data.weather[0].description}</div>
    <h3 class="mb-3 bold">
      <span>${Math.round(data.main.temp * 10) / 10}</span>
      <span>&deg;C</span>
      </h3>
    </div>
    <div class="col-5 pe-5 mt-5 mb-3 text-end">
    <div class="bold">Luftfeuchte</div>
    <div class="mb-2">${Math.round(data.main.humidity * 10) / 10}%</div>
    <div class="bold">Gefühlt</div>
    <div class="mb-2">${Math.round(data.main.feels_like * 10) / 10}<span>&deg;C</span></div>
    <div class="bold">Min/Max</div>
    <div class="mb-2">${Math.round(data.main.temp_min * 10) / 10}<span>&deg;C</span>/${Math.round(data.main.temp_max * 10) / 10}<span>&deg;C</span></div>
    <div></div>
  </div>
  </div>
  </div>
  `;

  /* Hintergrund Farbe nach Tageszeit anpassen */
  themeSwitcher();

  /* Vorhersage auf die Karte setzen */
  forecast.innerHTML = ``;
  for (let i = 1; i < 6; i++) {

    /* Datum konvertieren */
    const milliseconds = forecastData.daily[i].dt * 1000;
    const dateObject = new Date(milliseconds).toLocaleDateString("de-DE", {
      weekday: "short",
    });

    forecast.innerHTML += `
      <div class="col my-2">
        <div>${dateObject}</div>
        <i class="my-2 wi wi-owm-${forecastData.daily[i].weather[0].id}"style="font-size: 30px;"></i>
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
  localStorage.setItem("city", city);
});

/* Stadt im LocalStorage speichern */
if (localStorage.getItem("city")) {
  setCity(localStorage.getItem("city"));
  cityInput.classList.remove("d-none");
} else {
  /* Nachfrage User Location */
  window.navigator.geolocation.getCurrentPosition(permissionSuccess, permissionDenied);
}