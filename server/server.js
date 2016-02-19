'use strict';

import 'babel-polyfill';

import webpack from 'webpack';
import koa from 'koa';
import views from 'co-view';

const app = koa();

app.use(function *(next) {
    this.body = 'ff';
});
app.listen(3000);