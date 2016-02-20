'use strict';

import _ from 'lodash';

const publicPath = '/assets/';

export default (config, options) => {

    if (!options.debug) {
        return config;
    }
    
    config.entry.app.push(
        //'webpack-dev-server/client?http://localhost:9090/', 'webpack/hot/dev-server'
        'eventsource-polyfill', // necessary for hot reloading with IE
        'webpack-hot-middleware/client'
    );

    return _.merge({}, config);
}