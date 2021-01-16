const getWeatherByPermission = async (lat, lon) => {
  const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}&lang=de`;

  const response = await fetch(api);
  const data = await response.json();
  return data;
}

const getWeather = async (city) => {

  const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}&lang=de`;

  const response = await fetch(api);
  const data = await response.json();
  return data;
}