import { getWeatherDataForLocation } from './network/api.js';

const location = process.argv[2];

if (!location) throw new Error('Please provide a location name');

getWeatherDataForLocation(location);
