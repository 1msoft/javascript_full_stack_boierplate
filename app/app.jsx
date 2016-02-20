'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import {Router, browserHistory, Route, IndexRoute, NotFoundRoute, Redirect } from 'react-router';

class App extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return <div>1f11ffffffxffffffxff</div>;
    }

}

const routes = (
    <Route path='/' component={App}>
    </Route>
);

ReactDOM.render(
    <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>{routes}</Router>,
    document.getElementById('app')
);