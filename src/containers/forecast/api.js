import axios from "axios";
import { isNil } from "ramda";
import { GIF_CLIENT, GIF_API_KEY, WEATHER_API_KEY } from "../../config";
import { FORECAST_MODES } from "./const";
import { Observable } from "rxjs";

const REAL_API_URL = "http://api.weatherapi.com/v1/current.json";
const DAILY_API_URL = "http://api.weatherapi.com/v1/forecast.json";
const AUTOCOMPLETE_API_URL = "http://api.weatherapi.com/v1/search.json";
const GIF_API_URL = "https://tenor.googleapis.com/v2/search";

export const getFreshForecastByName = async (forecastMode, city, cachedForecast) => {
    if(!isNil(cachedForecast[city]) && !isNil(cachedForecast[city][forecastMode])) {
        return cachedForecast[city][forecastMode];
    }
    if (forecastMode === FORECAST_MODES.REALTIME) {
        const response = await axios.post(REAL_API_URL + '?key=' + WEATHER_API_KEY + '&q=' + city + '&aqi=no');
        let freshForecast = response.data;

        if (isNil(freshForecast)) {
            return 0;
        }

        return [{ label: "Now", temperature: freshForecast.current.temp_c, icon: freshForecast.current.condition.icon,
                rain: freshForecast.current.precip_mm, climate: freshForecast.current.condition.text }];
    } else if (forecastMode === FORECAST_MODES.DAILY) {
        const response = await axios.post(DAILY_API_URL + '?key=' + WEATHER_API_KEY + '&q=' + city + '&days=3&aqi=no&alerts=no');
        let freshForecast = response.data;
        if (isNil(freshForecast)) {
            return 0;
        }

        let finalForecast = [];
        let i = 0;
        for (const day of freshForecast.forecast.forecastday) {
            finalForecast.push({
                key: i, label: day.date, temperature: day.day.avgtemp_c,
                icon: day.day.condition.icon, rain: day.day.totalprecip_mm,
                minttemp_c: day.day.minttemp_c, maxtemp_c: day.day.maxtemp_c
            });
            i++;
        }

        return finalForecast;
    } else if (forecastMode === FORECAST_MODES.HOURLY) {
        const response = await axios.post(DAILY_API_URL + '?key=' + WEATHER_API_KEY + '&q=' + city + '&days=1&aqi=no&alerts=no');
        let freshForecast = response.data;
        if (isNil(freshForecast)) {
            return 0;
        }

        let finalForecast = [];
        let i = 0;
        for (const hour of freshForecast.forecast.forecastday[0].hour) {
            finalForecast.push({ key: i, label: hour.time, temperature: hour.temp_c, icon: hour.condition.icon, rain: hour.precip_mm });
            i++;
        }
        return finalForecast;
    }
    return 0;

};

export const getFreshForecastByCoords = async (forecastMode, longitude, latitude) => {
    if (forecastMode === FORECAST_MODES.REALTIME) {
        const response = await axios.post(REAL_API_URL + '?key=' + WEATHER_API_KEY + '&q=' + longitude + ',' + latitude + '&aqi=no');
        let freshForecast = response.data;

        if (isNil(freshForecast)) {
            return 0;
        }

        return [{ label: "Now", temperature: freshForecast.current.temp_c, icon: freshForecast.current.condition.icon,
                rain: freshForecast.current.precip_mm, climate: freshForecast.current.condition.text }];
    } else if (forecastMode === FORECAST_MODES.DAILY) {
        const response = await axios.post(DAILY_API_URL + '?key=' + WEATHER_API_KEY + '&q=' + longitude + ',' + latitude + '&days=3&aqi=no&alerts=no');
        let freshForecast = response.data;

        if (isNil(freshForecast)) {
            return 0;
        }

        let finalForecast = [];
        let i = 0;
        for (const day of freshForecast.forecast.forecastday) {
            finalForecast.push({
                key: i, label: day.date, temperature: day.day.avgtemp_c,
                icon: day.day.condition.icon, rain: day.day.totalprecip_mm,
                minttemp_c: day.day.minttemp_c, maxtemp_c: day.day.maxtemp_c
            });
            i++;
        }
        return finalForecast;
    } else if (forecastMode === FORECAST_MODES.HOURLY) {
        const response = await axios.post(DAILY_API_URL + '?key=' + WEATHER_API_KEY + '&q=' + longitude + ',' + latitude + '&days=1&aqi=no&alerts=no');
        let freshForecast = response.data;

        if (isNil(freshForecast)) {
            return 0;
        }

        let finalForecast = [];
        let i = 0;
        for (const hour of freshForecast.forecast.forecastday[0].hour) {
            finalForecast.push({ key: i, label: hour.time, temperature: hour.temp_c, icon: hour.condition.icon, rain: hour.precip_mm });
            i++;
        }
        return finalForecast;
    }
    return 0;
};


export function geolocationObservable(options) {
    return new Observable(observer => {
        // This function is called when someone subscribes.

        const id = navigator.geolocation.watchPosition(
            (position) => {
                observer.next(position);
            },
            error => {
                observer.error(error);
            },
            options
        );

        // Our teardown function. Will be called if they unsubscribe
        return () => {
            navigator.geolocation.clearWatch(id);
        };
    });
}

const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random()
        * (max - min + 1)) + min;
};


export const getGif = async (climate) => {
    const response = await axios.get(GIF_API_URL + '?q=' + climate + '&key=' + GIF_API_KEY + '&client_key=' + GIF_CLIENT + '&limit=5');
    let gif = response.data;

    if (isNil(gif)) {
        return 0;
    }

    return gif.results[randomNumberInRange(0,4)].media_formats.gif.url;
}

export const getSuggestions = async (text) => {
    const response = await axios.post(AUTOCOMPLETE_API_URL + '?key=' + WEATHER_API_KEY + '&q=' + text);
    let suggestions = response.data;

    return suggestions;

}

export const getNiceAttribute = (forecastData) => {
    let point = 3;
    for (const day of forecastData) {
        if (day.temperature < 18 || day.temperature > 25) {
            point--;
            break;
        }
    }

    for (const day of forecastData) {
        if (day.rain > 0) {
            point--;
            break;
        }
    }

    for (const day of forecastData) {
        if (day.minttemp_c < 15 || day.maxtemp_c > 30) {
            point--;
            break;
        }

    }

    if (point === 3) {
        return "nice";
    } else if (point === 2) {
        return "passable";
    } else {
        return "not nice";
    }

}