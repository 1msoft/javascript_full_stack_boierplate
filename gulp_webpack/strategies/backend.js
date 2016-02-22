'use strict';

import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import _ from 'lodash';
import path from 'path';
import fs from 'fs';

const rootPath = process.cwd();
const contextDir = path.resolve(process.cwd(), 'server');
const nodeModulesDir = path.resolve(process.cwd(), 'node_modules');
const outputDir = path.resolve(process.cwd(), 'build', 'backend');
const pubPath = '/assets/';

export default (config, options) => {

    if (!options.backend) {
        return config;
    }

    const debug = options.debug !== undefined ? options.debug : false;

    let nodeModules = {};
    fs.readdirSync('node_modules')
        .filter( (x) => {
            return ['.bin'].indexOf(x) === -1;
        })
        .forEach( (mod) => {
            nodeModules[mod] = 'commonjs ' + mod;
        });
    
    let externalModules = _.merge(nodeModules, {'../global.config': 'commonjs ../global.config'});

    let thisConfig = {
        // The base directory (absolute path!) for resolving the entry option.
        context: contextDir,
        // 入口文件
        entry: {
            server: './server.js',
        },

        output: {
            // 打包文件路径
            path: outputDir,
            // 网站运行时打包文件的访问路径
            publicPath: pubPath,
            // 打包文件名称
            filename: debug ? '[name].js' : '[name].min.js',
            // The filename of non-entry chunks 
            chunkFilename: debug ? '[name].chunk.js' : '[chunkhash:8].[name].chunk.min.js',
            // 热更新 chunks 文件名称
            //hotUpdateChunkFilename: debug ? '[id].js' : '[id].[chunkhash:8].min.js',
            // The filename of the SourceMaps for the JavaScript files.
            //sourceMapFilename: "debugging/[file].map",
        },

        externals: externalModules,

        target: 'node',

        node: {
            __dirname: true,
            __filename: true,
        },

        debug: debug ? true : false,

        module: {
            loaders: [],
        },

        plugins: [
            new webpack.IgnorePlugin(/\.(css|less)$/),
            new webpack.BannerPlugin(
                'require("source-map-support").install();',
                { raw: true, entryOnly: false }
            ),
            new CopyWebpackPlugin([
                { from: './templates/index.html', to: '..' },
                { from: '../global.config.js', to: '..' },
            ]),
        ],

        // 查找依赖文件配置
        resolve: {
            extensions: ['', '.js'], // 自动补全识别后缀
        },
    };

    return _.merge({}, config, thisConfig);
}