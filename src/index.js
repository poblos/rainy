import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { createReducer } from './reducer';
import { createEpicMiddleware } from 'redux-observable';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootEpic } from './epics';

const DEBUG = true;

const reducer = createReducer();
const epicMiddleware = createEpicMiddleware();
const middleware = applyMiddleware(epicMiddleware);

let composeEnhancers, store;

if (DEBUG) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    store = createStore(reducer, undefined, composeEnhancers(middleware));
} else {
    composeEnhancers = compose;
    store = createStore(reducer, undefined, composeEnhancers(middleware));
}

epicMiddleware.run(rootEpic);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>,
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
