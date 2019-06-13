import Post from "model/Post";
import Joi from "joi";

import { Types } from "mongoose";

/* 
  POST /api/posts
  {title, body, tags}
*/
exports.write = async ctx => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array()
      .items(Joi.string())
      .required()
  });

  const result = Joi.validate(ctx.request.body, schema);

  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { title, body, tags } = ctx.request.body;

  const post = new Post({
    title,
    body,
    tags
  });

  try {
    await post.save(); //기다려!
    ctx.body = post;
  } catch (e) {
    ctx.throw(e, 500); //5xx 서버 오류
  }
};

/* 
  GET /api/posts
*/
exports.list = async ctx => {
  //page가 주어지지 않았다면 1로 간주
  //query 는 문자열 형태로 받아 오므로 숫자로 변환
  const page = parseInt(ctx.query.page || 1, 10);
  const { tag } = ctx.query;

  const query = tag ? { tags: tag } : {};
  // tags 배열에 tag를 가진 포스트 찾기

  //잘못된 페이지 들어오면 에러 처리
  if (page < 1) {
    ctx.status = 400;
    return;
  }

  try {
    const posts = await Post.find(query)
      .sort({ _id: -1 }) //내림차순 <-> 오름차순 :1
      .limit(10)
      .skip((page - 1) * 10)
      .lean() //Json형태로
      .exec();

    const postCount = await Post.countDocuments(query).exec();
    const limitBodyLength = post => ({
      ...post,
      body: post.body.length < 120 ? post.body : `${post.body.slice(0, 120)}...`
    });
    ctx.body = posts.map(limitBodyLength);

    //마지막 페이지 알려주기
    //ctx.set은 response header를 설정해줌
    ctx.set("Last-Page", Math.ceil(postCount / 10));
  } catch (e) {
    ctx.throw(500, e);
  } //6/2
};

/* 
  PATCH /api/posts/:id
  {title, body, tags}
*/

exports.update = async ctx => {
  const { id } = ctx.params;

  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true //이값을 설정해줘야, 업뎃후 값 반환
    }).exec(); //기본값은 업뎃전 값 반환
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

/*
  GET /api/posts/:id
*/
exports.read = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findById(id).exec();
    // 포스트가 존재하지 않음
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

/* 
  DELETE /api/posts/:id
*/

exports.remove = async ctx => {
  const { id } = ctx.params;

  try{
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204;
  }catch(e) {
    ctx.throw(e, 500);
  }
};
