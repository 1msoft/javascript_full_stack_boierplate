'use strict';

export default (config, options) => {

    if (!options.production) {
        return config;
    }

    return config;
}