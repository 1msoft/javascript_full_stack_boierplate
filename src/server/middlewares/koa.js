import koa from 'koa';
import bodyParser from 'koa-bodyparser';
import passport from 'koa-passport';
import session from 'koa-generic-session';
import logger from 'koa-logger';
import path from 'path';
import serve from 'koa-static-cache';
import errorHandler from 'koa-errorhandler';
import views from 'co-view';

import config from '../../../global.config';
import frontDevMiddleware from './front-dev-middleware';

let STATIC_FILES_MAP = {};
let SERVE_OPTIONS = { prefix:'/assets/', maxAge: 365 * 24 * 60 * 60 };

export default function (app, config) {

    if (!config.app.keys) {
        throw new Error('Please add session secret key in the config file!');
    }
    app.keys = config.app.keys;

    if (config.app.env !== 'test') {
        app.use(logger());
    }

    /**
     * webpack 的 webpack-dev-middleware 配置 - for development
     */
    if (config.app.env === 'development') {
        frontDevMiddleware(app);
    }

    //app.use(errorHandler({ debug: true }));
    /**
     * 全局错误处理
     */
    app.use(function *(next) {
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

    if (config.app.env === 'production') {
        app.use(serve(path.resolve(config.app.outputPath, 'client'), SERVE_OPTIONS, STATIC_FILES_MAP));
    }

    app.use(function *(next) {
        let indexPath = config.app.env === 'production'
            ? config.app.outputPath
            : path.resolve(config.app.serverPath, 'templates');

        this.render = views(indexPath, {
            map: { html: 'swig' },
            cache : config.app.env === 'development' ? 'memory' : false,
        });
        yield next;
    });

    app.use(session({ key: 'bid_bond_management_system.sid' }));
    app.use(bodyParser());

    // passport
    app.use(passport.initialize());
    app.use(passport.session());
}