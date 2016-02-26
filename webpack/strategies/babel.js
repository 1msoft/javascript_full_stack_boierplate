'use strict';

import _ from 'lodash';
import path from 'path';

const nodeModulesDir = path.resolve(process.cwd(), 'node_modules');

export default (config, options) => {

    config.module.loaders.unshift({
        test: /\.(js|jsx)$/,
        exclude: [nodeModulesDir],
        loader: 'babel',
        query: {
            presets: ['react', 'es2015'],
            babelrc: true,
            env: {
                development: {
                    plugins: [
                        ['react-transform', {
                            transforms: [{
                                transform: 'react-transform-hmr',
                                imports: ['react'],
                                locals: ['module'],
                            }, {
                                transform: 'react-transform-catch-errors',
                                imports: ['react', 'redbox-react'],
                            }]
                        }]
                    ]
                }
            }
        },
    });

    return _.merge({}, config);
}