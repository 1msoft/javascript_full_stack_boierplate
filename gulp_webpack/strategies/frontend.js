'use strict';

import path from 'path';
import _ from 'lodash';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';

import styleConfigGenerator from './style';
import globalConfig from '../../global.config';

const rootPath = globalConfig.app.root;
const contextDir = path.resolve(process.cwd(), 'app');
const nodeModulesDir = path.resolve(process.cwd(), 'node_modules');
const outputDir = path.resolve(process.cwd(), 'build', 'frontend');
const pubPath = '/assets/';

export default (config, options) => {

    if (!options.frontend) {
        return config;
    }

    const debug = options.debug !== undefined ? options.debug : false;

    let thisConfig = {
        // The base directory (absolute path!) for resolving the entry option.
        context: contextDir,
        // 入口文件
        entry: {
            app: ['./app.jsx'],
            vendor: ['react', 'react-dom', 'react-router'],
        },

        output: {
            // 打包文件路径
            path: outputDir,
            // 网站运行时打包文件的访问路径
            publicPath: pubPath,
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
            extensions: ['', '.js', 'jsx', '.css', '.png', '.jpg'], // 自动补全识别后缀
        },
        plugins: [
            //Enables Hot Modules Replacement
            new webpack.HotModuleReplacementPlugin(),
            new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'vendor.bundle.js'),
        ]
    };

    thisConfig = styleConfigGenerator(_.merge({}, config, thisConfig), options);

    return thisConfig;

}