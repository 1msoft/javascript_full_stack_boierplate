'use strict';

import webpack from 'webpack';
import _ from 'lodash';
import path from 'path';
import fs from 'fs';

const contextDir = path.resolve(process.cwd(), 'server');
const nodeModulesDir = path.resolve(process.cwd(), 'node_modules');
const outputDir = path.resolve(process.cwd(), 'build', 'backend');
const publicPath = '/assets/';

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

    let thisConfig = {
        // The base directory (absolute path!) for resolving the entry option.
        context: contextDir,
        // 入口文件
        entry: {
            server: './server.js',
            //vendor: ['koa'],
        },

        output: {
            // 打包文件路径
            path: outputDir,
            // 网站运行时打包文件的访问路径
            publicPath: publicPath,
            // 打包文件名称
            filename: debug ? '[name].js' : '[name].min.js',
            // The filename of non-entry chunks 
            chunkFilename: debug ? '[name].chunk.js' : '[chunkhash:8].[name].chunk.min.js',
            // 热更新 chunks 文件名称
            //hotUpdateChunkFilename: debug ? '[id].js' : '[id].[chunkhash:8].min.js',
            // The filename of the SourceMaps for the JavaScript files.
            //sourceMapFilename: "debugging/[file].map",
        },

        externals: nodeModules,

        target: 'node',

        node: {
            __dirname: true,
            __filename: true,
        },

        debug: debug ? true : false,

        module: {
            loaders: [
                { test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] },
            ]
        },

        plugins: [
            new webpack.IgnorePlugin(/\.(css|less)$/),
            new webpack.BannerPlugin(
                'require("source-map-support").install();',
                { raw: true, entryOnly: false }
            )
        ],

        // 查找依赖文件配置
        resolve: {
            extensions: ['', '.js'], // 自动补全识别后缀
        },
    };

    return _.merge({}, config, thisConfig);
}