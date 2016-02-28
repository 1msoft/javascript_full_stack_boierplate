'use strict';

import _ from 'lodash';
import path from 'path';
import webpack from 'webpack';
import fs from 'fs';

import globalConfig from '../global.config';
import strategiesGenerator from './strategies';

const strategies = strategiesGenerator('client');

// 默认参数配置
const defaultOptions = {
    debug: false,
};

export default (options) => {

    options = _.merge({}, defaultOptions, options);

    const debug = options.debug !== undefined ? options.debug : false;

    // 前端多入口文件
    const clientEntries = fs.readdirSync(globalConfig.app.clientPath)
        .reduce( (entries, entry) => {
            return Object.assign(entries, {
                [entry]: [path.resolve(globalConfig.app.clientPath, entry, 'app.jsx')]
            });
        }, {});

    let config = {
        // The base directory (absolute path!) for resolving the entry option.
        context: globalConfig.app.clientPath,
        // 入口文件
        entry: Object.assign(clientEntries, {
            vendor: ['react', 'react-dom', 'react-router'],
        }),

        output: {
            // 打包文件路径
            path: globalConfig.app.clientOutputPath,
            // 网站运行时打包文件的访问路径
            publicPath: globalConfig.app.publicPath,
            // 打包文件名称
            filename: debug ? '[name].js' : '[chunkhash:8].[name].min.js',
            // The filename of non-entry chunks 
            chunkFilename: debug ? '[name].chunk.js' : '[chunkhash:8].[name].chunk.min.js',
            // 热更新 chunks 文件名称
            //hotUpdateChunkFilename: debug ? '[id].js' : '[id].[chunkhash:8].min.js',
            // The filename of the SourceMaps for the JavaScript files.
            sourceMapFilename: 'debugging/[file].map',
        },

        devtool: debug ? 'cheap-module-eval-source-map' : 'source-map',

        debug: debug ? true : false,

        module: {
            loaders: [
                { test: /\.json/, loader: 'json' },
                { test: /\.(woff|woff2)/, loader: 'url?limit=100000' },
                { test: /\.(png|jpg|jpeg|gif|svg)/, loader: 'url?limit=100000' },
                { test: /\.(ttf|eot)/, loader: 'file' },
            ]
        },

        // 查找依赖文件配置
        resolve: {
            extensions: ['', '.js', '.jsx', '.css', '.png', '.jpg'], // 自动补全识别后缀
        },
        plugins: [
            //Enables Hot Modules Replacement
            new webpack.HotModuleReplacementPlugin(),
            new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'vendor.bundle.js'),
        ]
    };

    return strategies.reduce((conf, strategy) => {
        return strategy(conf, options);
    }, config);
};