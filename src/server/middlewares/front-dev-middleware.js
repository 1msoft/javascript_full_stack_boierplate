import webpack from 'webpack';
import webpackDevMiddleware from 'koa-webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import clientConfigGenerator from '../../../webpack/webpack.client.config';

const webpackConfig = clientConfigGenerator({ debug: true });
const compiler = webpack(webpackConfig);

const devMiddleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: true,
    },
    stats: {
        colors: true,
    },
    publicPath: webpackConfig.output.publicPath,
});

const hotMiddleware = function *(next) {
    yield webpackHotMiddleware(compiler).bind(null, this.req, this.res);
    yield next;
}

const frontDevMiddleware = (app) => {
    app.use(devMiddleware);
    app.use(hotMiddleware);
}

export default frontDevMiddleware;