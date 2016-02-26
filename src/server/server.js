'use strict';

require('babel-polyfill'); // es6 generator support

var Koa = require('koa');

/**
 * Config import
 */
var globalConfig = require('../../global.config').default;
var koaConfig = require('./config/koa').default;
//import passportConfig from './config/passport';
var routeConfig = require('./config/routes').default;

/**
 * Server
 */
const app = new Koa();
koaConfig(app, globalConfig);

/**
 * Passport
 */
//passportConfig();

/**
 * Routes
 */
routeConfig(app);

/**
 * Start Server
 */
app.listen(globalConfig.app.port);

console.log('Server started, listening on port: ' + globalConfig.app.port);
console.log('Environment:' + globalConfig.app.env);

//check if HMR is enabled

if(module.hot) {
    // accept update of dependency
    module.hot.accept('./config/routes', function() {
        console.log('./config/routes');
        // replace request handler of server
        //server.removeListener("request", requestHandler);
        routeConfig = require('./config/routes');
        //server.on("request", requestHandler);
    });
    // accept update of dependency
    module.hot.accept('./config/koa', function() {
        console.log('./config/koa');
        // replace request handler of server
        //server.removeListener("request", requestHandler);
        routeConfig = require('./config/koa').default;
        console.log('gengxin')
        //server.on("request", requestHandler);
    });
    // accept update of dependency
    module.hot.accept('../../global.config', function() {
        console.log('../../global.config');
        // replace request handler of server
        //server.removeListener("request", requestHandler);
        routeConfig = require('../../global.config').default;
        //server.on("request", requestHandler);
    });
}

module.exports = app;