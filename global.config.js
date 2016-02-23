'use strict';

import path from 'path';
import _ from 'lodash';

const NODE_ENV = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * 应用基本配置
 */
let base = {
    app: {
        root: process.cwd(),
        env: NODE_ENV,
        modelsPath: './test/mock/base_data',// models 目录
    },
};

/**
 * 环境配置
 */
let specific = {
    development: {
        app: {
            port: 3000,
            name: 'javascript_full_stack_boilerplate - Dev',
            keys: ['javascript_full_stack_boilerplate_hurr_durr'],
        },
        mysql: {
            host     : '127.0.0.1',
            user     : 'root',
            password : 'emsoft',
            database : 'javascript_full_stack_boilerplate',
        },
    },
    production: {
        app: {
            port: 3000,
            name: 'javascript_full_stack_boilerplate',
            keys: ['javascript_full_stack_boilerplate_hurr_durr'],
        },
        mysql: {
            host     : '127.0.0.1',
            user     : 'root',
            password : 'emsoft',
            database : 'javascript_full_stack_boilerplate',
        },
    },
};

/**
 * 默认运行参数配置
 */
let sysConfig = {
    // 系统运行一些必要参数的配置
};

/**
 * 合并并返回配置对象
 */
export default _.merge(base, specific[NODE_ENV], sysConfig);