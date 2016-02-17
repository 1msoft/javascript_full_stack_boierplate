'use strict';

import webpack from 'webpack';
import fs from 'fs';

export default (config, options) => {

    if (!options.backend) {
        return config;
    }

    let nodeModules = {};
    fs.readdirSync('node_modules')
        .filter( (x) => {
            return ['.bin'].indexOf(x) === -1;
        })
        .forEach( (mod) => {
            nodeModules[mod] = 'commonjs ' + mod;
        });

    config['entry'] = './src/server.js';
    config['output'] = {
        path: './build',
        filename: 'backend.js'
    };
    config['externals'] = nodeModules;
    config['target'] = 'node';
    config['node'] = {
        __dirname: true,
        __filename: true
    };

    config['plugins'] = [
        new webpack.IgnorePlugin(/\.(css|less)$/),
        new webpack.BannerPlugin(
            'require("source-map-support").install();',
            { raw: true, entryOnly: false }
        )
    ]

    return config;
}