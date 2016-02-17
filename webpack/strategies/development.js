'use strict';

export default (config, options) => {

    if (!options.development) {
        return config;
    }

    return config;
}