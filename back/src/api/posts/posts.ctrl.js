import Post from "model/Post";
import Joi from "joi";

import { Types } from "mongoose";

export const checkObjectId = (ctx, next) => {
  const { id } = ctx.params;
  const { ObjectId } = Types;

  //검증실패
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; // 400 Bad Request
    return null;
  }
  return next(); // next를 리턴해주어야 ctx.body가 제대로 설정됩니다.
};

/* 
  POST /api/posts
  {title, body, tags}
*/
export const write = async ctx => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array()
      .items(Joi.string())
      .required(),
    username: Joi.string().required()
  });

  const result = Joi.validate(ctx.request.body, schema);

  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { title, body, tags, username } = ctx.request.body;
  console.log("in post.ctrl export const write=> username=", username);

  const post = new Post({
    username,
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
export const list = async ctx => {
  console.log('동작!');
  
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

export const update = async ctx => {
  const { id } = ctx.params;
  console.log("PATCH /api/posts/:id", id);
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
export const read = async ctx => {
  const { id } = ctx.params;
  try {
    const post = await Post.findById(id); //.exec() 삭제함
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
export const remove = async ctx => {
  const { id } = ctx.params;
  console.log("DELETE /api/posts/:id", id);

  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

/* 
  GET /api/posts/tags
*/
export const getTags = async ctx => {
  console.log("  GET /api/posts/tags 탐");

  try {
    let mixArray = [];
    const Tags = await Post.getTags();
    Tags.map(x => {
      mixArray = mixArray.concat(x.tags);
    }); //concat은 원본을 카피해서 붙임!
    //console.log(`mixArray: ${JSON.stringify(mixArray)}`); //[, , , , ,]

    const TagsNewArray = arrayUnique(mixArray);
    //console.log(`tags중복값제거: ${TagsNewArray}`);

    //중복값 제거 함수
    function arrayUnique(a) {
      //console.log(`let a : ${JSON.stringify(a)}`);
      for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
          if (a[i] === a[j]) {
            //console.log(`i의a[${i}] : ${a[i]} , j의a[${j}] : ${a[j]}`);
            a.splice(j, 1);
            //제거명령 : [i]와 [j]번 째 같은게 있으면, 두번째[j]번째 나온건 제거해!
            //splice (index, 갯수)
          }
        }
      }
      return a;
    }
    ctx.body = TagsNewArray;
  } catch (e) {
    ctx.throw(500, e);
  }
};
