import User from "model/User";
import Joi from "joi";

// 로컬 회원가입
exports.localRegister = async ctx => {
  // 데이터 검증
  const schema = Joi.object().keys({
    username: Joi.string()
      .alphanum()
      .min(4)
      .max(15)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .required()
      .min(6)
  });

  const result = Joi.validate(ctx.request.body, schema);

  //스키마 검증 실패
  if (result.error) {
    ctx.status = 400; //Bad request
    return;
  }

  // 아이디 / 이메일 중복 체크
  let existing = null;
  try {
    existing = await User.findByEmailOrUsername(ctx.request.body);
  } catch (e) {
    ctx.throw(500, e);
  }

  if (existing) {
    //중복되는 아이디/ 이메일이 있을 경우
    ctx.status = 409; //conflict
    //어떤 값이 중복 되었는지 알려줍니다.
    ctx.body = {
      key: existing.email === ctx.request.body.email ? "email" : "username"
    };
    return;
  }

  // 계정 생성
  let user = null;
  try {
    user = await User.localRegister(ctx.request.body);
  } catch (e) {
    ctx.throw(500, e);
  }

  let token = null;
  try {
    token = await user.generateToken();
  } catch (e) {
    ctx.throw(500, e);
  }

  ctx.cookies.set("access_token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7
  });
  ctx.body = user.profile; //프로필 정보로 응답합니다.
};

//로컬 로그인 (POST)
exports.localLogin = async ctx => {
  //데이터 검증
  const schema = Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required()
  });

  const result = Joi.validate(ctx.request.body, schema);

  if (result.error) {
    ctx.status = 400; //Bad Request
    return;
  }

  const { email, password } = ctx.request.body;

  let user = null;
  try {
    //이메일로 계정 찾기
    user = await User.findByEmail(email); //리턴값 : user = return this.findOne({ email }).exec();
  } catch (e) {
    ctx.throw(500, e);
  }

  if (!user || !user.validatePassword(password)) {
    //유저가 존재하지 않거나 || 비밀번호가 일치하지 않으면
    ctx.status = 403; //Forbidden
    return;
  }

  //로그인 검증 완료함!! 이후 로직은 =>
  // TODO: 1.토큰 발행 2.쿠키에 set 3.ctx.body <= 유저 profile
  let token = null;
  try {
    token = await user.generateToken();
  } catch (e) {
    ctx.throw(500, e);
  }

  ctx.cookies.set("access_token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7
  });
  ctx.body = user.profile; //프로필 정보로 응답합니다.
  console.log('back login api',user.profile);
};

//이메일 / 아이디 체크
exports.exists = async ctx => {
  const { key, value } = ctx.params;
  let user = null;

  try {
    // key에 따라 findByEmail 혹은 findByUsername을 실행합니다.
    user = await (key === "email"
      ? User.findByEmail(value)
      : User.findByUsername(value));
    // await 뒤에 ()로 감싸줘야 함
  } catch (e) {
    ctx.throw(500, e);
  }

  ctx.body = {
    exists: user !== null //  =>  3 !== 3;  false 반환
  };
};


// 현재 로그인 check API (쿠키에 access_token 여부에 따라)
exports.check = ctx => {
  const { user } = ctx.request; //로그인 될시 user가 들어감
  console.log("user", user);
  if (!user) {
    ctx.status = 403; //Forbidden
    return;
  }

  ctx.body = user.profile; //{username: , thumbnail: }
};

//로그아웃
exports.logout = async ctx => {
  ctx.cookies.set("access_token", null, {
    maxAge: 0,
    httpOnly: true
  });
  ctx.status = 204;
};
/* exports.logout = (ctx) => {
  ctx.session = null;
  ctx.status= 204; //no content
}; */
