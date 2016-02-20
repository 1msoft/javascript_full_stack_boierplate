"use strict";

const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport');
const session = require('koa-generic-session');
const logger = require('koa-logger');
var path = require("path");
var serve = require("koa-static-cache");
const errorHandler = require('koa-errorhandler');
const views = require('co-view');

const config = require('../../global.config');
var STATIC_FILES_MAP = {};
var SERVE_OPTIONS = { prefix:'assets', maxAge: 365 * 24 * 60 * 60 };

import webpack from 'webpack';
import webpackDevMiddleware from 'koa-webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfigGenerator from '../../gulp_webpack/webpack.config';

module.exports = function (app, config) {

    if (!config.app.keys) {
        throw new Error("Please add session secret key in the config file!");
    }
    app.keys = config.app.keys;

    if (config.app.env !== "test") {
        app.use(logger());
    }

    if (config.app.env === 'development') {
        const webpackConfig = webpackConfigGenerator({ frontend: true, debug: true });
        let compiler = webpack(webpackConfig);

        app.use(webpackDevMiddleware(compiler, {
            noInfo: true,
            watchOptions: {
                aggregateTimeout: 300,
                poll: true,
            },
            stats: {
                colors: true,
            },
            publicPath: webpackConfig.output.publicPath,
        }));

        app.use(function* (next) {
            yield webpackHotMiddleware(compiler).bind(null, this.req, this.res);
            yield next;
        });
    }

    //app.use(errorHandler({ debug: true }));
    /**
     * 全局错误处理
     */
    app.use(function* (next) {
        try {
            yield next;

            if (!this.status) {
                this.status = 200;
            }
        } catch (e) {
            this.status = 500;
            console.log('\n========================== 系统错误 ==========================\n');
            console.log(e.stack);
            this.body = { error: e.message };
        }
    });

    if (config.app.env === "production") {
        app.use(serve(path.resolve(config.app.root, "build", "frontend"), SERVE_OPTIONS, STATIC_FILES_MAP));
    }

    app.use(function *(next) {
        this.render = views(path.resolve(config.app.root, './server/templates'), {
        map: { html: "swig" },
            cache : config.app.env === "development" ? "memory" : false,
        });
        yield next;
    });

    app.use(session({ key: 'bid_bond_management_system.sid' }));
    app.use(bodyParser());

    // passport
    app.use(passport.initialize());
    app.use(passport.session());
}