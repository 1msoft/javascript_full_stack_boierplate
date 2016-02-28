'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory, Route, IndexRoute, NotFoundRoute, Redirect } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './store';
import Root from './containers/Root';

// store
const store = configureStore();

// history
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Root store={store} history={history} />,
    document.getElementById('app')
);