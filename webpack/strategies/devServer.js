'use strict';

import _ from 'lodash';

const publicPath = '/assets/';

export default (config, options) => {

    if (!options.debug) {
        return config;
    }

    let entries = Object.keys(config.entry).filter( (entry) => entry !== 'vendor' );

    for ( let entryName of entries) {
        config.entry[entryName] = config.entry[entryName].concat([
            //'webpack-dev-server/client?http://localhost:9090/', 'webpack/hot/dev-server'
            'eventsource-polyfill', // necessary for hot reloading with IE
            'webpack-hot-middleware/client'
        ]);
    }

    return _.merge({}, config);
}