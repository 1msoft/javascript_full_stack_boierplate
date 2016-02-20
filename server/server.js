'use strict';

import 'babel-polyfill'; // es6 import support

import koa from 'koa';

/**
 * Config import
 */
import globalConfig from '../global.config';
import koaConfig from './config/koa';
//import passportConfig from './config/passport';
import routeConfig from './config/routes';

/**
 * Server
 */
const app = koa();
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

export default app;