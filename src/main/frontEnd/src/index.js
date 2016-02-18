/**
 * Created by wqiu on 18/02/16.
 */

'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import webbaReducers from './reducers/reducers';
import App from './components/App';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import { compose, applyMiddleware, combineReducers, createStore} from 'redux';
import bows from 'bows';

const log = bows('app');

const allReducers = combineReducers({
    tasks: webbaReducers
});

const finalCreateStore = compose(
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
)(createStore);

const store = finalCreateStore(allReducers);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('react')
);
