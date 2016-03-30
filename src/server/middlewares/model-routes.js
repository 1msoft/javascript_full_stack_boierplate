import mount from 'koa-mount';
import router from 'falcor-koa-router';
import fs from 'fs';
import path from 'path';

let combineRoutes = () => {
    let modelPath = path.resolve(process.cwd(), 'src', 'server', 'models');
    let files = fs
        .readdirSync(modelPath)
        .filter( (file) => file.indexOf('.route') !== -1 );
    
    let combineRoutes = files.reduce( (routes, file) => {
        let thisRoute = require( `../models/${file}` ).default;
        return routes.concat( thisRoute );
    }, []);

    return combineRoutes;
}

export default (app) => {
    let routes = combineRoutes();
    app.use( mount( '/model.json', router.routes(routes) ) );
}