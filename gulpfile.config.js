'use strict';

import gulp from 'gulp';
import webpack from 'webpack';
import nodemon from 'nodemon';
import fs from 'fs';
import path from 'path';

import webpackConfigGenerator from './webpack/webpack.config';

/**
 * 构建处理函数
 */
function onBuild (done) {
    return (err, stats) => {
        if (err) {
            console.log( 'Error', err );
        } else {
            console.log( '\n[webpack]', stats.toString({ color: true }) );
        }
        if (done) {
            done();
        }
    }
}

// 前端任务 - for development
gulp.task('dev-front-end', (done) => {
    let config = webpackConfigGenerator({ frontend: true, debug: true });
    webpack( config ).run( onBuild(done) );
});

// 前端任务 - for production
gulp.task('prod-front-end', (done) => {
    let config = webpackConfigGenerator({ frontend: true });
    webpack( config ).run( onBuild(done) );
});

// 后端任务 - for development
gulp.task('dev-back-end', () => {
    let config = webpackConfigGenerator({ backend: true, debug: true });

    webpack( config ).watch({ aggregateTimeout: 10, poll: true }, (err, stats) => {
        onBuild()(err, stats);
    });
});

// 后端任务 - for production
gulp.task('prod-back-end', (done) => {
    let config = webpackConfigGenerator({ backend: true });
    webpack( config ).run( onBuild(done) );
});

// 开发模式构建任务
gulp.task('dev', ['dev-front-end', 'dev-back-end'], () => {
    nodemon({
        execMap: {
            js: 'node --harmony'
        },
        script: 'build/backend/server.js',
        env: { 'NODE_ENV': 'development' },
        //ignore: ['*'],
        watch: ['build/backend'],
        ext: 'js html json',
    }).on('start', () => {
        console.log('\n[nodemon] Server is started!\n');
    }).on('restart', (files) => {
        for (let file of files) {
            console.log(`\n[nodemon] file changed: ${file}`);
        }
    });
});

// 生产模式构建任务
gulp.task('prod', ['prod-front-end', 'prod-back-end']);
