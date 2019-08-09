/*
  몽고DB 스키마(Schema) 생성(유저 작성 항목)
    
*/

import mongoose from "mongoose";
import crypto from "crypto";

// JWT 토큰 생성 함수
import { generateToken } from "jwt/jwt_token";

const { Schema } = mongoose;

function hash(password) {
  return crypto
    .createHmac("sha256", process.env.SECRET_KEY)
    .update(password)
    .digest("hex");
}

/*
  몽고DB 스키마(Schema) 생성(회원)
    1. profile
     1-1. username: 닉네임(문자열-String)
     1-2. thumbnail: 프로필 사진(문자열-String)
    2. email: 이메일(문자열-String)
    3. social
     3-1. facebook
      3-1-1. id: 페이스북 회원키(문자열-String)
      3-1-2. accessToken: 페이스북 토큰(문자열-String)
     3-2. naver
      3-2-1. id: 네이버 회원키(문자열-String)
      3-2-2. accessToken: 네이버 토큰(문자열-String)
    4. password: 패스워드 해싱값(문자열-String)
    5. thoughtCount: 포인트(숫자-Number)
    6. createdAt: 글 생성 날짜(날짜-Date)
    7. isCertificated: 회원인증코드(문자열-String)
*/

const User = new Schema({
  profile: {
    username: String,
    thumbnail: String //{ type: String, default: "/static/images/default_thumbnail.png" }
  },
  email: { type: String },
  //소셜 계정으로 회원가입을 할 경우엔 각 서비스에서 제공되는 id와 accessToken을 저장합니다.
  social: {
    facebook: {
      id: String,
      accessToken: String
    },
    naver: {
      id: String,
      accessToken: String
    }
  },
  password: String, //로컬 계정의 경우엔 비밀번호를 해싱해서 저장합니다.
  thoughtCount: { type: Number, default: 0 }, //서비스에서 포스트를 작성 할 때마다 1씩 올라갑니다
  createdAt: {
    type: Date,
    default: Date.now
  },
  isCertificated: String
});

//이름으로 유저 찾기
User.statics.findByUsername = function(username) {
  //객체에 내장되어 있는 값을 사용 할 때는 객체명. 키 이런식으로 쿼리하면 됨
  return this.findOne({ "profile.username": username }).exec();
};

//이메일로 유저 찾기
User.statics.findByEmail = function(email) {
  return this.findOne({ email }).exec();
};

//이메일 또는 유저 이름으로 찾기
User.statics.findByEmailOrUsername = function({ username, email }) {
  return this.findOne({
    // $or 연산자를 통해 둘중에 하나를 만족하는 데이터를 찾습니다.
    $or: [{ "profile.username": username }, { email }]
  }).exec();
};

//사용자 등록 메소드
User.statics.localRegister = function({ username, email, password }) {
  //데이터를 생성 할 때는 new this()를 사용합니다.
  const user = new this({
    profile: {
      username
      // thumbnail 값을 설정하지 않으면 기본값으로 설정됩니다.
    },
    email,
    password: hash(password)
  });

  return user.save();
};

//사용자 소셜 등록 메소드
User.statics.socialRegister = function({
  id,
  thumbnail,
  email,
  username,
  type,
  token
}) {
  //데이터를 생성 할 때는 new this()를 사용합니다.
  const user = new this({
    profile: {
      username,
      thumbnail
    },
    email,
    social: {
      [type]: {
        id: id,
        accessToken: token
      }
    },
    isCertificated: 0
  });

  return user.save();
};

//비밀번호 검증
User.methods.validatePassword = function(password) {
  // 함수로 전달받은 password 의 해시값과, 데이터에 담겨있는 해시값과 비교를 합니다.
  const hashed = hash(password);
  return this.password === hashed;
};

//jwt payload로 토큰 발행
User.methods.generateToken = function() {
  const payload = {
    _id: this.id,
    profile: this.profile
  };
  return generateToken(payload, "user");
};

export default mongoose.model("User", User);
