import { fromJS } from 'immutable';
import { FORECAST_MODES, SET_FORECAST_MODE, SET_FORECAST, LOCALISATION_MODES, SET_LOCALISATION_MODE, SET_LOCALISATION_NAME, SET_LOCALISATION_COORDS, SET_NICE, SET_GIF, SET_SUGGESTIONS, SET_NAME_FRAGMENT } from './const';

export const FORECAST_REDUCER_NAME = 'Forecast';

const initialState = fromJS({
    localisation_mode: LOCALISATION_MODES.MANUAL,
    localisation_name: '',
    mode: FORECAST_MODES.REALTIME,
    forecast: null,
    isStart: true,
    nice: 'Nice',
    gif: null,
    cachedForecast: {},
    nameFragment: '',
    suggestions: []
});

export const forecastReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FORECAST_MODE: {
            const { mode } = action;
            return state.set('mode', mode).set('forecast', null);
        }
        case SET_FORECAST: {
            const { forecastData } = action;
            return state.set('forecast', forecastData);
        }
        case SET_LOCALISATION_MODE: {
            const { mode } = action;
            if (mode === LOCALISATION_MODES.MANUAL) { state = state.set('isStart', true) }
            else { state = state.set('isStart', false)}
            return state.set('localisation_mode', mode).set('forecast', null);
        }
        case SET_LOCALISATION_NAME: {
            const { name } = action;
            return state.set('localisation_name', name).set('forecast', null).set("isStart", false);
        }
        case SET_LOCALISATION_COORDS: {
            const { longitude, latitude } = action;
            return state.set('longitude', longitude).set('latitude', latitude).set('forecast', null);
        }
        case SET_NICE: {
            const { nice } = action;
            return state.set('nice', nice);
        }
        case SET_GIF: {
            const { gif } = action;
            return state.set('gif', gif)
        }
        case SET_NAME_FRAGMENT: {
            const { fragment } = action;
            return state.set('nameFragment', fragment.trim())
        }
        case SET_SUGGESTIONS: {
            const { suggestions } = action;
            return state.set('suggestions', suggestions)
        }
        default:
            return state;
    }
}