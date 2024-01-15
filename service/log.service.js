import Chalk from "chalk";
import dedent from "dedent-js";

const printError = (error) => {
  console.log(Chalk.bgRed('ERROR:') + ' ' + error);
}

const printSuccess = (message) => {
  console.log(Chalk.bgGreen('SUCCESS:') + ' ' + message);
}

const printHelp = () => {
  console.log(dedent(
    `${Chalk.bgCyan('HELP')}
    No parameters - weather info
    - s [CITY] to set city
    - h [HELP] for help
    - t [API KEY] for token`
  ));
}

const printWeather = (res, icon) => {
  console.log(dedent(
    `${Chalk.bgYellow(' WEATHER ')}
    Weather in ${res.name}: ${icon}: ${res.weather[0].description}
    Temperature: ${res.main.temp}, feels like: ${res.main.feels_like}
    Humidity: ${res.main.humidity}%
    Wind speed: ${res.wind.speed} m/s`
  ));
}

export { printError, printSuccess, printHelp, printWeather };