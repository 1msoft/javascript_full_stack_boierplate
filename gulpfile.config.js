'use strict';

import gulp from 'gulp';
import webpack from 'webpack';

import fs from 'fs';
import path from 'path';

import webpackConfigGenerator from './webpack/webpack.config';

var DeepMerge = require('deep-merge');

var deepmerge = DeepMerge(function(target, source, key) {
  if(target instanceof Array) {
    return [].concat(target, source);
  }
  return source;
});

// generic

var defaultConfig = {
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] },
    ]
  }
};

if(process.env.NODE_ENV !== 'production') {
  defaultConfig.devtool = '#eval-source-map';
  defaultConfig.debug = true;
}

function config(overrides) {
  return deepmerge(defaultConfig, overrides || {});
}

// backend

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

var backendConfig = config({
  entry: './src/server.js',
  //target: 'node',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'backend.js'
  },
  node: {
    __dirname: true,
    __filename: true
  },
  externals: nodeModules,
  plugins: [
    new webpack.IgnorePlugin(/\.(css|less)$/),
    new webpack.BannerPlugin('require("source-map-support").install();',
                             { raw: true, entryOnly: false })
  ]
});

/**
 * 构建处理函数
 */
function onBuild (done) {
    return (err, stats) => {
        if (err) {
            console.log( 'Error', err );
        } else {
            console.log( stats.toString() );
        }
        if (done) {
            done();
        }
    }
}

// 前端任务 - for development
gulp.task('dev-front-end', (done) => {
    let config = webpackConfigGenerator({ frontend: true });
    webpack( config ).run( onBuild(done) );
});

// // 前端任务 - for production
// gulp.task('prod-front-end', (done) => {
//     webpack( config ).run( onBuild(done) );
// });

// 后端任务 - for development
gulp.task('dev-back-end', (done) => {
    let config = webpackConfigGenerator({ backend: true });
    webpack( config ).run( onBuild(done) );
});

gulp.task('dev', ['dev-front-end', 'dev-back-end']);

// // 后端任务 - for production
// gulp.task('prod-front-end', (done) => {
//     webpack( config ).run( onBuild(done) );
// });