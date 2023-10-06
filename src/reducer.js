import { combineReducers } from "redux";

import { FORECAST_REDUCER_NAME, forecastReducer } from "./containers/forecast/reducer";

export function createReducer() {
    return combineReducers({
        [FORECAST_REDUCER_NAME]: forecastReducer,
    });
}