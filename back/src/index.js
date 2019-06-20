require('dotenv').config();

import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';

import api from 'api';
import session from 'koa-session';

const app = new Koa();
const router = new Router();

//비구조화 할당 문으로 process.env 내부 값에 대한 레퍼런스 작성
const {
  PORT:port=4000, //값이 존재하지 않는다면 포트 4000번을 기본값으로 사용
  MONGO_URI: mongoURI,
  COOKIE_SIGN_KEY : signKey
} = process.env;


//몽고 DB 프라미스 사용을 위한 글로벌 선언
mongoose.Promise = global.Promise;

//몽고 DB 접속
mongoose.connect(mongoURI)
  .then(() => {console.log('몽고 DB 접속 완료'); })
  .catch((err) => { console.log(err); });

  router.use('/api', api.routes());

  // 라우터 적용 전에 먼저 BodyParser 미들웨어 사용
  app.use(bodyParser());

  
  //세션/키 적용
  const sessionConfig = {
    maxAge: 864000000, //하루
    // signed: true(기본으로 설정되어 있습니다.)
  };
  
  app.use(session(sessionConfig, app));
  app.keys= [signKey];

  // 라우터 사용 선언
  app.use(router.routes()).use(router.allowedMethods());
  
  // 서버 가동
  app.listen(port, () => {console.log(`koa 서버 작동 중 : ${port} 포트`); });