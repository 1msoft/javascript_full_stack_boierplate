'use strict';

import _ from 'lodash';

const publicPath = '/assets/';

export default (config, options) => {

    if (!options.debug) {
        return config;
    }

    let thisConfig = {
        devServer: {
            hot: true,
            noInfo: false,
            inline: true,
            publicPath: publicPath,
            stats: {
                cached: false,
                colors: true,
            },
        },
    };

    return _.merge({}, config, thisConfig);
}