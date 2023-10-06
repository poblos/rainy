import { useSelector, useDispatch } from "react-redux"
import { forecastModeSelector, forecastSelector, niceSelector, gifSelector, localisationModeSelector, isStartSelector, suggestionsSelector } from "./selectors"
import { FORECAST_MODES, LOCALISATION_MODES } from "./const";
import React, { useCallback} from "react";
import { setForecastMode, setLocalisationMode, setLocalisationName, setNameFragment } from "./actions";
import { InputsWrapper } from "./components/InputsWrapper";
import { ForecastWrapper } from "./components/ForecastWrapper";
import { ForecastItem } from "./components/ForecastItem";
import { ModesWrapper } from "./components/ModesWrapper";
import { NiceBanner } from "./components/NiceBanner";
import {Audio} from 'react-loader-spinner';
import { ReactSearchAutocomplete } from "react-search-autocomplete";

export const Forecast = () => {
    const forecastMode = useSelector(forecastModeSelector);
    const isStart = useSelector(isStartSelector)
    const forecastData = useSelector(forecastSelector);
    const gif = useSelector(gifSelector);
    const nice = useSelector(niceSelector);
    const localisationMode = useSelector(localisationModeSelector);
    const suggestions = useSelector(suggestionsSelector)
    const dispatch = useDispatch();

    const onForecastModeChange = useCallback(
        (event) => {
            const mode = event.target.value;
            dispatch(setForecastMode(mode));
        },
        [dispatch]
    );

    const onLocalisationModeChange = useCallback(
        (event) => {
            const mode = event.target.value;
            dispatch(setLocalisationMode(mode));
        },
        [dispatch]
    )

    const onCityChosen = useCallback(
        (city) => {
            dispatch(setLocalisationName(city.name));
        },
        [dispatch]
    );

    const onCityChange = useCallback(
            (string, results) => {
                if(string.length > 0) {
                dispatch(setNameFragment(string));}
            },
            [dispatch]
        );


    return (
        <div>
            <label>localisation mode: </label>
            <button onClick={onLocalisationModeChange} value={localisationMode === LOCALISATION_MODES.AUTO ? LOCALISATION_MODES.MANUAL : LOCALISATION_MODES.AUTO}>{localisationMode === LOCALISATION_MODES.AUTO ? "Auto" : "Manual"}</button>
            <InputsWrapper>
                {localisationMode === LOCALISATION_MODES.MANUAL && 
                    <ReactSearchAutocomplete items={suggestions} onSelect={onCityChosen} onSearch={onCityChange} />
                }

                {forecastData != null && <ModesWrapper>
                    <button onClick={onForecastModeChange} value={FORECAST_MODES.REALTIME}> REALTIME </button>
                    <button onClick={onForecastModeChange} value={FORECAST_MODES.DAILY}> DAILY </button>
                    <button onClick={onForecastModeChange} value={FORECAST_MODES.HOURLY}> HOURLY </button>
                </ModesWrapper>}
            </InputsWrapper>
            {forecastData === null && !isStart && <Audio
                height="200"
                width="200"
                radius="9"
                color="green"
                ariaLabel="loading"
            />}
            {forecastData != null && <ForecastWrapper>
                {forecastMode === FORECAST_MODES.DAILY && <NiceBanner nice={nice} />}
                {forecastMode === FORECAST_MODES.REALTIME && <img src={gif} alt="Gif depicting weather"></img>}
                {forecastData.map((forecastItem) => (
                    <ForecastItem
                        key={'forecast-item' + forecastItem.key}
                        temperature={forecastItem.temperature}
                        rain={forecastItem.rain}
                        label={forecastItem.label}
                        icon={forecastItem.icon}
                    />
                ))}
            </ForecastWrapper>}


        </div>
    );
};