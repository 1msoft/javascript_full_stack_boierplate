import 'babel-polyfill'; // es6 generator support

import Koa from 'koa';
import http from 'http';

/**
 * Config import
 */
import globalConfig from '../../global.config';
import koaConfig from './middlewares/koa';
//import passportConfig from './middlewares/passport';
import routeConfig from './middlewares/routes';
import modelRoutesConfig from './middlewares/model-routes'

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
 * Model Routes
 */
modelRoutesConfig(app);

/**
 * Routes
 */
routeConfig(app);

/**
 * Start Server
 */
var server = http.createServer(app.callback());
server.listen(globalConfig.app.port);

console.log('Server started, listening on port: ' + globalConfig.app.port);
console.log('Environment:' + globalConfig.app.env);

export default server;