'use strict';

import frontend from './frontend';
import backend from './backend';
//import optimize from './optimize';
import devServer from './devServer';
import eslint from './eslint';
import babel from './babel';

export default [
    frontend,
    backend,
    //optimize,
    devServer,
    eslint,
    babel,
];