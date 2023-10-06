import { createSelector } from 'reselect';
import { prop } from 'ramda';

import { FORECAST_REDUCER_NAME } from './reducer';

const getForecastReducerState = prop(FORECAST_REDUCER_NAME);

export const forecastModeSelector = createSelector(
    getForecastReducerState,
    (act_state) => act_state.get('mode')
);

export const forecastSelector = createSelector(
    getForecastReducerState,
    (act_state) => act_state.get('forecast')
);

export const localisationModeSelector = createSelector(
    getForecastReducerState,
    (act_state) => act_state.get('localisation_mode')
);

export const localisationCoordsSelector = createSelector(
    getForecastReducerState,
    (act_state) => ({longitude: act_state.get('longitude'), latitude: act_state.get('latitude')})
);

export const localisationNameSelector = createSelector(
    getForecastReducerState,
    (act_state) =>act_state.get('localisation_name')
);

export const niceSelector = createSelector(
    getForecastReducerState,
    (act_state) => act_state.get('nice')
);

export const gifSelector = createSelector(
    getForecastReducerState,
    (act_state) => act_state.get('gif')
);

export const isStartSelector = createSelector(
    getForecastReducerState,
    (act_state) => act_state.get('isStart')
);

export const cachedForecastSelector = createSelector(
    getForecastReducerState,
    (act_state) => act_state.get('cachedForecast')
);

export const nameFragmentSelector = createSelector(
    getForecastReducerState,
    (act_state) => act_state.get('nameFragment')
);

export const suggestionsSelector = createSelector(
    getForecastReducerState,
    (act_state) => act_state.get('suggestions')
);