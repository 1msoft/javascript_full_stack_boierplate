'use strict';

import path from 'path';
import webpack from 'webpack';

export default (config, options) => {

    if (!options.frontend) {
        return config;
    }

    config['entry'] = './app/app.jsx';
    config['output'] = {
        path: './build',
        filename: 'frontend.js'
    };
     // 查找依赖文件配置
    config['resolve'] = {
        extensions: ['', '.js', '.jsx'], // 自动补全识别后缀
    };
    config['module'] = {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loaders: [
                    // 'react-hot', 
                    'babel?presets[]=react,presets[]=es2015'
                ], //react-hot is like browser sync and babel loads jsx and es6-7
                exclude: [path.resolve(__dirname, 'node_modules')],
                plugins: ['transform-runtime'],
            },
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.json/, loader: 'json' },
            { test: /\.(woff|woff2)/, loader: 'url?limit=100000' },
            { test: /\.(png|jpg|jpeg|gif|svg)/, loader: 'url?limit=100000' },
            { test: /\.(ttf|eot)/, loader: 'file' },
        ]
    };
    config['plugins'] = [
        //Enables Hot Modules Replacement
        // new webpack.HotModuleReplacementPlugin(),
        //Allows error warnings but does not stop compiling. Will remove when eslint is added
        new webpack.NoErrorsPlugin(),
        // // 移动文件
        // new TransferWebpackPlugin([
        //     { from: './' }
        // ], path.resolve(__dirname, 'app')),
    ]

    return config;
}