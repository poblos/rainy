import {SET_FORECAST_MODE, SET_FORECAST, SET_LOCALISATION_MODE, SET_LOCALISATION_NAME, SET_LOCALISATION_COORDS, SET_NICE, SET_GIF, SET_NAME_FRAGMENT, SET_SUGGESTIONS} from './const';

export const setForecastMode = (mode) => ({
    type: SET_FORECAST_MODE,
    mode
})

export const setForecast = (forecastData) => ({
    type: SET_FORECAST,
    forecastData
})

export const setLocalisationMode = (mode) => ({
    type: SET_LOCALISATION_MODE,
    mode
})

export const setLocalisationName = (name) => ({
    type: SET_LOCALISATION_NAME,
    name
})

export const setLocalisationCoords = (longitude, latitude) => ({
    type: SET_LOCALISATION_COORDS,
    longitude,
    latitude
})

export const setNice = (nice) => ({
    type: SET_NICE,
    nice
})

export const setGif = (gif) => ({
    type: SET_GIF,
    gif
})


export const setNameFragment = (fragment) => ({
    type: SET_NAME_FRAGMENT,
    fragment
})

export const setSuggestions = (suggestions) => ({
    type: SET_SUGGESTIONS,
    suggestions
})