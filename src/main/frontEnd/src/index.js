/**
 * Created by wqiu on 18/02/16.
 */

'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import webbaReducers from './reducers/reducers';
import App from './containers/App';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { compose, applyMiddleware, combineReducers, createStore} from 'redux';
import bows from 'bows';

const log = bows('app');
const logger = createLogger();

const finalCreateStore = compose(
    applyMiddleware(
        thunkMiddleware,
        logger
    ),
    window.devToolsExtension ? window.devToolsExtension() : f=>f
)(createStore);

const store = finalCreateStore(webbaReducers);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('react')
);
