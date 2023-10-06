import { combineEpics } from 'redux-observable';

import { fetchForecastByNameEpic, fetchForecastByCoordsEpic, getCurrentPositionEpic, getNiceEpic, getGifEpic, changeGifEpic, getSuggestionsEpic } from './containers/forecast/epics';

export const rootEpic = combineEpics(fetchForecastByNameEpic, fetchForecastByCoordsEpic, getCurrentPositionEpic, getNiceEpic, getGifEpic, changeGifEpic, getSuggestionsEpic);