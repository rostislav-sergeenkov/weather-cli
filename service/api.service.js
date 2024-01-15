import * as https from 'https';
import axios from 'axios';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';

const getIcon = (icon) => {
  switch (icon.slice(0, -1)) {
    case '01':
      return '☀️';
    case '02':
      return '🌤️';
    case '03':
      return '☁️';
    case '04':
      return '☁️';
    case '09':
      return '🌧️';
    case '10':
      return '🌦️';
    case '11':
      return '🌩️';
    case '13':
      return '❄️';
    case '50':
      return '🌫️';
  }
};
const getWeather = async (city) => {
  const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);

  if (!token) {
    throw new Error('API key not set. Set it using -t [API_KEY] command.');
  }

  // Реализация API-запроса с помощью пакета 'axios'
  const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      q: city,
      appid: token,
      lang: 'en',
      units: 'metric'
    }
  });

  return data;
}

export { getWeather, getIcon };