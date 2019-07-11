import User from 'model/User'
import Joi from "joi"

exports.checkLogin = (ctx, next) => {
  if(!ctx.request.header.cookie) {
    ctx.status = 401; //Unauthorized
    return null;
  }
  return next ();
}

/*
  GET /api/profile/:id
*/

exports.read = async ctx => {
  const { username } = ctx.params;
  console.log('[back]exports.read username: ', username)
  try{
    const user = await User.findByUsername(username);
    if(!user) {
      ctx.status = 404
      return
    }
    ctx.body = user
  }catch(e) {
    ctx.throw(e, 500)
  }
}