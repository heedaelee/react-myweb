/* require('dotenv').config(); */
import { config } from 'dotenv';

import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import morgan from 'koa-morgan';

//MongoDB 모듈
import mongoose from 'mongoose';

import api from 'api';
import {jwtMiddleware} from 'jwt/jwt_token'

//Dotenv 설정파일 사용(/.env)
config()

const app = new Koa();
const router = new Router();

//비구조화 할당 문으로 process.env 내부 값에 대한 레퍼런스 작성
const {
  PORT:port=4000, //값이 존재하지 않는다면 포트 4000번을 기본값으로 사용
  MONGO_URI: mongoURI,
} = process.env;

// MongoDB NodeJS 프라미스 사용 선언
mongoose.Promise = global.Promise;

//몽고 DB 접속
mongoose.connect(mongoURI)
  .then(() => {console.log('몽고 DB 접속 완료'); })
  .catch((err) => { console.log(err); });

  //api 라우트 사용
  router.use('/api', api.routes());

  // 라우터 적용 전에 먼저 BodyParser 미들웨어 사용
  app.use(morgan('dev'))
  .use(bodyParser()) //라우터 적용코드보다 상단에 있어야 합니다.
  .use(jwtMiddleware)//토큰 체크 후, 토큰 갱신이나 유저 정보 ctx.request에 넣어줌(따라서 항상 로그인후 토큰이 있다면 유저 정보를 request에 넣어서 돌아다닐 수 있다?)
  .use(router.routes())//'/api' 라우터 적용 코드
  .use(router.allowedMethods())



  // 서버 가동
  app.listen(port, () => {console.log(`koa 서버 작동 중 : ${port} 포트`); });