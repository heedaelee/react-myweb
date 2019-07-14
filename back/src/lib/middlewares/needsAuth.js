import {Context} from 'Koa'

export default (ctx ,next) => {
  const { user } = ctx.request; //로그인 될시 user가 들어감
  if (!user) {
    ctx.status = 401; //401 : 익명의 사용자, 403 로그인은 했는데 허가 x
    return;
  }
  ctx.body = user.profile; //{username: , thumbnail: }

  return next()
}