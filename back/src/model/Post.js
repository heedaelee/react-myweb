/*
  몽고DB 스키마(Schema) 생성(포스트 작성 항목)
    1. title: 제목(문자열-String)
    2. body: 내용(문자열-String)
    3. tags: 태그들(배열-Array)
    4. thumnail: 섬네일url(문자열-String)
    4. publishedDate: 작성 날짜(날짜-Date)
*/

import mongoose from "mongoose";

const { Schema } = mongoose;

const Post = new Schema({
  username: String,
  title: String,
  body: String,
  tags: [String], // 문자열의 배열
  thumnail:String,
  publishedDate: {
    type: Date,
    default: new Date() // 현재 날짜를 기본값으로 지정
  }
});

//모든태그 가져오기
Post.statics.getTags = function() {
  return this.find(
    { $where: "this.tags.length!==0" },//mlab에 where 안먹힘
    { _id: false, tags: true }
  ).exec();
};

const post = mongoose.model("Post", Post);
export default post;
