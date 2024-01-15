#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { printHelp, printSuccess, printError, printWeather } from './service/log.service.js';
import { saveKeyValue, getKeyValue, TOKEN_DICTIONARY } from './service/storage.service.js';
import { getWeather, getIcon } from './service/api.service.js';
import 'dotenv/config'; // и больше ничего не нужно писать, ENV-переменные сами подтянутся из .env-файла в process.env

const saveToken = async (token) => {
  if (!token.length) {
    printError('No token provided');
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess('Token was saved successfully');
  } catch (e) {
    printError(e.message);
  }
}

const saveCity = async (city) => {
  if (!city.length) {
    printError('No city provided');
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess('City was saved successfully');
  } catch (e) {
    printError(e.message);
  }
}

const getForecast = async () => {
  try {
    const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
    const weather = await getWeather(city);
    printWeather(weather, getIcon(weather.weather[0].icon));
  } catch (e) {
    if (e?.response?.status == 404) {
      printError('City is wrong');
    } else if (e?.response?.status == 401) {
      printError('Token is wrong');
    } else {
      printError(e.message);
    }
  }
}

const initCLI = () => {
  console.log(process.env);

  const args = getArgs(process.argv);

  if (args.h) {
    return printHelp();
  }

  if (args.s) {
    return saveCity(args.s);
  }

  if (args.t) {
    return saveToken(args.t);
  }

  return getForecast();
}

initCLI();