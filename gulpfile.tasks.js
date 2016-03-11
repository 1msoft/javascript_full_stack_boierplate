'use strict';

import webpack from 'webpack';
import fs from 'fs';
import path from 'path';
import del from 'del';

import clientConfigGenerator from './webpack/webpack.client.config';
import serverConfigGenerator from './webpack/webpack.server.config';

import db_init from './src/server/config/models';

/**
 * webpack 构建过程的控制台日志显示
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

export default (gulp) => {
    
    let Tasks = {};

    /**
     * 项目初始化任务 - 数据库初始化数据装载
     */
    Tasks.dbInit = () => {
        db_init(true);
    }

    /**
     * 清理 build 文件夹
     */
    Tasks.clean = (done) => {
        // 删除 build 文件夹
        del(['build']);

        // 新建并拷贝 global.config.js 文件
        gulp
            .src('./global.config.js')
            .pipe(gulp.dest('build'));
    }

    /**
     * 前端打包任务 - for development
     */
    Tasks.devClient = (done) => {
        let config = clientConfigGenerator({ debug: true });
        webpack( config ).run( onBuild(done) );
    }

    /**
     * 前端打包任务 - for production
     */
    Tasks.prodClient = (done) => {
        let config = clientConfigGenerator({});
        webpack( config ).run( onBuild(done) );
    }

    /**
     * 后端打包任务 - for development
     */
    Tasks.devServer = (done) => {
        let config = serverConfigGenerator({ debug: true });
        webpack( config ).watch({
            aggregateTimeout: 300, // wait so long for more changes
            poll: true,
        }, onBuild() );
    }

    /**
     * 后端打包任务 - for production
     */
    Tasks.prodServer = (done) => {
        let config = serverConfigGenerator({});
        webpack( config ).run( onBuild(done) );
    }

    /**
     * 数据库模拟数据装载 - for test
     */
    Tasks.dbMork = () => {
        //db_init(true);
    }

    return Tasks;

}