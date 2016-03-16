import Router from 'koa-router';
import indexCtrl from '../controllers/indexCtrl';
//const authCtrl = require('../controllers/authCtrl');

const common = new Router();
const router = new Router();

export default (app) => {

    common.get('/', indexCtrl.index);
    //common.get('/auth/login', authCtrl.getCurrentUser);
    //common.post('/auth/login', authCtrl.login);
    //common.all('/auth/logout', authCtrl.logout);

    app
        .use(common.routes())
        .use(common.allowedMethods());

    app
        .use(router.routes())
        .use(router.allowedMethods());
}