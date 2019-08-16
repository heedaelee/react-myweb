import User from "model/User";
import Joi from "joi";

exports.checkLogin = (ctx, next) => {
  if (!ctx.request.header.cookie) {
    ctx.status = 401; //Unauthorized
    return null;
  }
  return next();
};

/*
  GET /api/profile/:id
*/

exports.read = async ctx => {
  const { id } = ctx.params;
  // console.log("[서버]profile.ctrl/ id: ", id);
  try {
    // 닉넴으로 회원 찾기, 이거 썼다가 취소함
    // const user = await User.findByUsername(username)
    const user = await User.findById(id);
    // console.log(`[서버]profile.ctrl/ user: ${user}`)
    if (!user) {
      ctx.status = 404;
      return;
    }
      ctx.body = user;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

exports.update = async ctx => {
  const { id, username, thumbnail } = ctx.request.body;
  console.log(
    `profile.ctrl/update id:${id} 
    username:${username} 
    thumbnail:${thumbnail}`
  );
  let updatingValue;
  if (!username && !thumbnail) {
    ctx.throw("not username&thumbnail", 400);
  }
  if (!username) {
    updatingValue = { "profile.thumbnail": thumbnail };
  } else if (!thumbnail) {
    updatingValue = { "profile.username": username };
    //닉네임 변경시 중복 체크
    let existing = null;
    try {
      existing = await User.findByUsername(username);
    } catch (e) {
      ctx.throw(500, e);
    }
    //중복일경우
    if (existing) {
      ctx.status = 409;
      ctx.body = { key: "username" };
      return;
    }
  } /* else if (username && thumbnail) {
    updatingValue = {
      "profile.username": username,
      "profile.thumbnail": thumbnail
    };
  } */
  console.log(`updatingValue : ${JSON.stringify(updatingValue)}`);
  try {
    const user = await User.findByIdAndUpdate(id, updatingValue, {
      new: true
    });
    if (!user) {
      ctx.status = 404;
    }
    console.log(`modefied user : ${user}`);
    ctx.body = user;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

exports.remove = async ctx => {
  const { username } = ctx.params;
  try {
    const query = { "profile.username": username };
    const result = await User.findOneAndRemove(query);
    ctx.cookies.set("access_token", "");
    // process unregister
    ctx.status = 204;
    console.log(result);
  } catch (e) {
    ctx.status = 400;
  }
};
