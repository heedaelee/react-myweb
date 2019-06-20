import Router from 'koa-router';

const auth = new Router();
import authCtrl from './auth.ctrl';

auth.post('/login', authCtrl.login);
auth.get('/check', authCtrl.check);
auth.post('/logout', authCtrl.logout);

export default auth;

