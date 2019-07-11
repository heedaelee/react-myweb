/*
  몽고DB 스키마(Schema) 생성(포스트 작성 항목)
    1. title: 제목(문자열-String)
    2. body: 내용(문자열-String)
    3. publishedDate: 작성 날짜(날짜-Date)
*/

import mongoose from 'mongoose';

const { Schema } = mongoose;

const Post = new Schema({
  username: String,
  title: String,
  body: String,
  tags: [String], // 문자열의 배열
  publishedDate: {
    type: Date,
    default: new Date() // 현재 날짜를 기본값으로 지정
  }
});

const post = mongoose.model('Post', Post);
export default post;