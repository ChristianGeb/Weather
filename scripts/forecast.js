const key = "8d8308303ea5ef0b133658a7f39c2075";

/* Wetter durch Koordinaten */
const getWeatherByPermission = async (lat, lon) => {
  const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}&lang=de`;

  const response = await fetch(api);
  const data = await response.json();
  return data;
}

/* Wetter durch Stadtname */
const getWeather = async (city) => {
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}&lang=de`;

  const response = await fetch(api);
  const data = await response.json();
  return data;
}

const getForecast = async (lat, lon) => {
  const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${key}`;

  const response = await fetch(api);
  const data = await response.json();
  return data;
}