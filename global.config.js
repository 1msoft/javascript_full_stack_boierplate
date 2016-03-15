'use strict';

import path from 'path';
import _ from 'lodash';

const NODE_ENV = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * 应用基本配置
 */
let base = {
    app: {
        env: NODE_ENV,
        root: process.cwd(),

        clientPath: path.resolve(process.cwd(), 'src', 'client'),         // 前端代码目录
        serverPath: path.resolve(process.cwd(), 'src', 'server'),         // 后端代码目录
        modelsPath: './test/mock/base_data',                              // models 目录
        
        publicPath: '/assets/',                                           // 浏览器访问路径
        outputPath: path.resolve(process.cwd(), 'build'),                  // 项目发布路径
        clientOutputPath: path.resolve(process.cwd(), 'build', 'client'), // 前端文件发布路径
        serverOutputPath: path.resolve(process.cwd(), 'build', 'server'), // 后端文件发布路径
        
        nodeModulesPath: path.resolve(process.cwd(), 'node_modules'),     // npm 安装依赖包文件夹路径
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
            database : 'js_fullstack',
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
            database : 'js_fullstack',
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