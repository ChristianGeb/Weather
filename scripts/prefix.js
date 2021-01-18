/* Methode zu https://erikflowers.github.io/weather-icons/ von ze-gomes auf GitHub */

const declarePrefix = (data) => {
  // Create new date representing the local Time
  const now = new Date();
  // Convert to UTC Date
  const date = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
  // Timezone returns shift in seconds from UTC, convert to miliseconds and add to the date epoch time to get localTime
  const millisecondsOffsetUTC = date.getTime() + data.timezone * 1000;
  const localTime = new Date(millisecondsOffsetUTC);
  // Get local sun phases and convert a unix timestamp to time
  const sunrise = new Date(data.sys.sunrise * 1000);
  const sunset = new Date(data.sys.sunset * 1000);
  // Get correct weather icon for day/night periods
  if (date > sunrise && date < sunset) {
    let weatherIconID = `wi wi-owm-day-${data.weather[0].id}`;
    return weatherIconID
  } else {
    let weatherIconID = `night wi wi-owm-night-${data.weather[0].id}`;
    return weatherIconID
  }
};

/* Hintergrund Farbe nach Tageszeit anpassen */
const themeSwitcher = () => {
  const themeSwitcher = document.querySelector(".themeSwitcher");
  console.log(themeSwitcher.classList);
  if (themeSwitcher.classList.contains("night")) {
    body.classList.replace("light", "dark")
  } else {
    body.classList.replace("dark", "light");
  }
};