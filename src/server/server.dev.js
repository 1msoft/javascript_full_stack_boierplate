import http from 'http';
//import destroyable from 'server-destroy';
import globalConfig from '../../global.config';
import  app from './server';

/**
 * Start Server - for development
 */
let server = http.createServer();
let tmpApp = app.callback();
server.on('request', tmpApp);
//destroyable(server);
server.listen(globalConfig.app.port, () => {
    console.log('Server started, listening on port: ' + globalConfig.app.port);
    console.log('Environment:' + globalConfig.app.env);
});

export default server;

// check if HMR is enabled
if(module.hot) {
    // accept update of dependency
    module.hot.accept();
    module.hot.accept('./server', ()=> { 
        let hotApp = null;
        try {
            hotApp = require('./server').default;
        } catch (err) {
            console.error(err.stack);
            return;
        }
        server.removeListener('request', tmpApp);
        tmpApp = hotApp.callback();
        server.on('request', tmpApp);
        // tmpApp = require('./server').default;
        // server.destroy();

        // server = http.createServer(tmpApp.callback());
        // destroyable(server);
        // server.listen(globalConfig.app.port, () => {
        //     console.log('Server started, listening on port: ' + globalConfig.app.port);
        //     console.log('Environment:' + globalConfig.app.env);
        // });
    });
}