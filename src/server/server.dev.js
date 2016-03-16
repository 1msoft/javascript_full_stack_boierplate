import http from 'http';

import globalConfig from '../../global.config';
import app from './server';

/**
 * Start Server - for development
 */
const server = http.createServer();
let originApp = app.callback();
server.on('request', originApp);
server.listen(globalConfig.app.port, () => {
    console.log('Server started, listening on port: ' + globalConfig.app.port);
    console.log('Environment:' + globalConfig.app.env);
});

// check if HMR is enabled
if(module.hot) {
    // accept update of dependency
    module.hot.accept('./server', ()=> { 
        let hotApp = null;
        try {
            hotApp = require('./server').default;
        } catch (err) {
            console.error(err.stack);
        }
        server.removeListener('request', originApp);
        originApp = hotApp.callback();
        server.on('request', originApp);
    });
}