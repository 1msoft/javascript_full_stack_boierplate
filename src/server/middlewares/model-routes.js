import mount from 'koa-mount';
import router from 'falcor-koa-router';

import User from '../models/User'

let routes = [
    {
        route: 'usersById',
        get: async (pathSet) => {
            let users = await User.get();
            
            let aa = {};
            users.forEach( (item) => {
                aa[item.id] = item;
            });

            return { path: ['usersById'], value: aa };
        },

    }, {
        route: 'users.length',
        get: async () => {
            var users = await user.count();
            
            users = users.map( (item) => {
                return { ['' + item.id]: item };
            });

            return { path: ['xxx'], value: users };
        },
    },
];

export default (app) => {
    app.use( mount( '/model.json', router.routes(routes) ) );
}