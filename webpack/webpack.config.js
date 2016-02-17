'use strict';

import _ from 'lodash';
import path from 'path';

import strategies from './strategies';

// 默认参数配置
const defaultOptions = {
    development: false,
    production: false,
    test: false,
    frontend: false,
    backend: false,
};

export default (options) => {

    options = _.merge({}, defaultOptions, options);

    let config = {};

    return strategies.reduce((conf, strategy) => {
        return strategy(conf, options);
    }, config);
};