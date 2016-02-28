var server = require('./server').default;
var destroyable = require('server-destroy');
destroyable(server);

// check if HMR is enabled
if(module.hot) {
    // accept update of dependency
    module.hot.accept();
    module.hot.accept('./server', ()=> { 
        server.destroy();
        server = require('./server').default;
        destroyable(server);
    });
}