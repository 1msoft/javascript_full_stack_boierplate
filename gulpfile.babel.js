'use strict';

import gulp from 'gulp';

import gulpTaskGenerator from './gulpfile.tasks';

const gulpTasks = gulpTaskGenerator(gulp);

/**
 * 项目初始化任务集合
 */
gulp.task('db:init', gulpTasks.dbInit);                      // 项目初始化任务：数据库初始化数据装载
gulp.task('clean', gulpTasks.clean);                         // 项目初始化任务：清理 build 目录
gulp.task('init', ['db:init', 'clean']);                     // 项目初始化任务

/**
 * 开发环境构建任务集合
 */
gulp.task('dev:client', gulpTasks.devClient);                // 开发环境构建任务：客户端构建
gulp.task('dev:server', gulpTasks.devServer);                // 开发环境构建任务：服务端构建
gulp.task('dev', ['dev:client', 'dev:server']);              // 开发环境构建任务

/**
 * 生产环境构建任务集合
 */
gulp.task('prod:client', gulpTasks.prodClient);              // 生产环境构建任务：客户端构建
gulp.task('prod:server', gulpTasks.prodClient);              // 生产环境构建任务：客户端构建
gulp.task('prod', ['prod:client', 'prod:server']);           // 生产环境构建任务

/**
 * 测试环境构建任务集合
 */
gulp.task('db:mock', gulpTasks.dbMock);                      // 测试环境构建任务：数据库模拟数据装载
//gulp.task('test', ['init','db:mock']);                       // 测试环境构建任务
