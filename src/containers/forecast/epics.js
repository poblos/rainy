import { ofType } from 'redux-observable';
import { FORECAST_MODES, LOCALISATION_MODES, SET_FORECAST_MODE, SET_LOCALISATION_MODE, SET_LOCALISATION_NAME, SET_FORECAST, SET_LOCALISATION_COORDS, SET_GIF, SET_NAME_FRAGMENT } from './const';
import { cachedForecastSelector, forecastModeSelector, forecastSelector, localisationCoordsSelector, localisationModeSelector, localisationNameSelector, nameFragmentSelector } from './selectors';
import { getFreshForecastByCoords, getFreshForecastByName, getNiceAttribute, getGif, geolocationObservable, getSuggestions } from './api';
import { setForecast, setLocalisationCoords, setNice, setGif, setSuggestions } from './actions';
import { map, switchMap, filter, mergeMap, take, delay } from 'rxjs/operators';
import { from, of } from 'rxjs';

export const fetchForecastByNameEpic = (action$, state$) =>
    action$.pipe(
        ofType(SET_FORECAST_MODE, SET_LOCALISATION_NAME),
        filter(() => localisationModeSelector(state$.value) === LOCALISATION_MODES.MANUAL),
        map(() => ({
            forecastMode: forecastModeSelector(state$.value),
            name: localisationNameSelector(state$.value),
            cachedForecast: cachedForecastSelector(state$.value)
        })),
        switchMap(({ forecastMode, name, cachedForecast }) =>
            from(getFreshForecastByName(forecastMode, name, cachedForecast)).pipe(map((forecastData) => setForecast(forecastData)))
        )

    );


export const fetchForecastByCoordsEpic = (action$, state$) =>
    action$.pipe(
        ofType(SET_LOCALISATION_COORDS, SET_FORECAST_MODE),
        filter(() => localisationModeSelector(state$.value) === LOCALISATION_MODES.AUTO),
        map(() => ({
            forecastMode: forecastModeSelector(state$.value),
            localisation: localisationCoordsSelector(state$.value)
        })),
        switchMap(({ forecastMode, localisation }) =>
            from(getFreshForecastByCoords(forecastMode, localisation.longitude, localisation.latitude)).pipe(map((forecastData) => setForecast(forecastData)))
        )

    );

export const currentPosition$ = geolocationObservable({
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 15000
});


export const getCurrentPositionEpic = (action$, state$) =>
    action$.pipe(
        ofType(SET_LOCALISATION_MODE),
        filter(() => localisationModeSelector(state$.value) === LOCALISATION_MODES.AUTO),
        mergeMap(() =>
            currentPosition$.pipe(
                take(1),
                mergeMap(position => of(
                    setLocalisationCoords(position.coords.latitude, position.coords.longitude)
                ))))
    );

export const getNiceEpic = (action$, state$) =>
    action$.pipe(
        ofType(SET_FORECAST),
        filter(() => forecastModeSelector(state$.value) === FORECAST_MODES.DAILY),
        map(() => ({
            forecastData: forecastSelector(state$.value)
        })),
        map(({ forecastData }) => getNiceAttribute(forecastData)),
        map((nice) => setNice(nice))
    );

export const getGifEpic = (action$, state$) =>
    action$.pipe(
        ofType(SET_FORECAST),
        filter(() => forecastModeSelector(state$.value) === FORECAST_MODES.REALTIME),
        map(() => ({
            forecastData: forecastSelector(state$.value)
        })),
        map(({ forecastData }) => ({
            climate: forecastData[0].climate
        })),
        switchMap(({ climate }) =>
            from(getGif(climate)).pipe(map((gif) => setGif(gif)))
        )

    )


export const changeGifEpic = (action$, state$) =>
    action$.pipe(
        ofType(SET_GIF),
        filter(() => forecastModeSelector(state$.value) === FORECAST_MODES.REALTIME),
        filter(() => !forecastSelector(state$.value).length === 0),
        map(() => ({
            forecastData: forecastSelector(state$.value)
        })),
        map(({ forecastData }) => ({
            climate: forecastData[0].climate
        })),
        delay(30000),
        switchMap(({ climate }) =>
            from(getGif(climate)).pipe(map((gif) => setGif(gif))
            ))

    )

export const getSuggestionsEpic = (action$, state$) =>
    action$.pipe(
        ofType(SET_NAME_FRAGMENT),
        map(() => ({
            fragment: nameFragmentSelector(state$.value)
        })),
        switchMap(({ fragment }) =>
        from(getSuggestions(fragment)).pipe(map((suggestions) => setSuggestions(suggestions)))
    )
    )