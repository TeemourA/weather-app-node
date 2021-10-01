import axios from 'axios';

import { weatherStackUrl, mapBoxUrl } from './constants/index.js';

const getWeatherData = async () => {
  const { data } = await axios(weatherStackUrl);

  return data;
};

const printCurrentWeatherMessage = async () => {
  try {
    const {
      current: { temperature, feelslike, weather_descriptions },
    } = await getWeatherData();

    const weatherDescription = weather_descriptions.join(',');

    const message = `${weatherDescription}. It is currently ${temperature}°C and it feels like ${feelslike}°C.`;

    console.log(message);
  } catch (e) {
    console.log(`[weatherstack api] Something went wrong: ${e.message}`);
  }
};

const getLAGeoData = async () => {
  const {
    data: {
      features: [searchResult],
    },
  } = await axios(mapBoxUrl);

  const { center } = searchResult;

  return center;
};

const printLACoords = async () => {
  try {
    const [lon, lat] = await getLAGeoData();
    console.log(`LA longitude: ${lon} and latitude: ${lat}`);
  } catch (e) {
    console.log(`[mapbox api] Something went wrong: ${e.message}`);
  }
};

// printCurrentWeatherMessage();
// printLACoords();
