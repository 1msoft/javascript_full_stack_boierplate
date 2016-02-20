'use strict';

import gulp from 'gulp';
import webpack from 'webpack';
import nodemon from 'nodemon';
import fs from 'fs';
import path from 'path';

import webpackConfigGenerator from './webpack.config';

/**
 * 构建处理函数
 */
function onBuild (done) {
    return (err, stats) => {
        if (err) {
            console.log( 'Error', err );
        } else {
            console.log( '\n[webpack]', stats.toString({ colors: true }) );
        }
        if (done) {
            done();
        }
    }
}

// 前端打包任务 - for development
gulp.task('dev-front-end', (done) => {
    let config = webpackConfigGenerator({ frontend: true, debug: true });
    webpack( config ).run( onBuild(done) );
});

// 前端打包任务 - for production
gulp.task('prod-front-end', (done) => {
    let config = webpackConfigGenerator({ frontend: true });
    webpack( config ).run( onBuild(done) );
});

// 后端打包任务 - for production
gulp.task('prod-back-end', (done) => {
    let config = webpackConfigGenerator({ backend: true });
    webpack( config ).run( onBuild(done) );
});

// 清理发布文件夹任务
gulp.task('clean');

// 重建数据库任务
gulp.task('data:init');

// 构建任务 - for development
gulp.task('dev', ['dev-front-end'], () => {
    nodemon({
        execMap: {
            js: 'node --harmony'
        },
        script: 'server/server.dev.js',
        env: { 'NODE_ENV': 'development' },
        //ignore: ['*'],
        watch: ['server', 'gulp_webpack'],
        ext: 'js html json',
    }).on('start', () => {
        console.log('\n[nodemon] Server has started!\n');
    }).on('quit', () => {
        console.log('\n[nodemon] Server has quit!\n');
    }).on('restart', (files) => {
        for (let file of files) {
            console.log(`\n[nodemon] file changed: ${file}`);
        }
    });
});

// 构建任务 - for production
gulp.task('build', ['prod-front-end', 'prod-back-end']);