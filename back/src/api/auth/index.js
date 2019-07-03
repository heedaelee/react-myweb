import Router from 'koa-router';
const auth = new Router();
import authCtrl from './auth.ctrl';

auth.post('/register/local', authCtrl.localRegister)
auth.post('/login/local', authCtrl.localLogin)
auth.get('/exists/:key(email|username)/:value', authCtrl.exists) //key라는 파라미터를 설정하는데, 이 값들이 email이나 username일때만 허용 & value를 키로 값 받음
auth.post('/logout', authCtrl.logout)
auth.get('/check', authCtrl.check)

export default auth;

