import User from "model/User";
import Joi from "joi";
import getSocialProfile from "lib/getSocialProfile";

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
  ctx.body = { user }; //user객체 전체로 응답
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
  ctx.body = { user }; //user객체로 응답, {user : }형식으로 다 통일
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
  console.log(`user가 뭐지 : ${JSON.stringify(ctx.request.user)}`);

  if (!user) {
    ctx.status = 401; //401 : 익명의 사용자, 403 로그인은 했는데 허가 x
    return;
  }
  ctx.body = { user }; //{user : }형식으로 변환
};

//로그아웃
exports.logout = async ctx => {
  ctx.cookies.set("access_token", null, {
    maxAge: 0,
    httpOnly: true
  });
  ctx.status = 204;
};

exports.verifySocial = async ctx => {
  const { accessToken } = ctx.request.body;
  const { provider } = ctx.params;
  console.log(` exports.verifySocial 
  accessToken : ${accessToken}
  provider : ${provider}
  `);
  let profile = null;
  try {
    profile = await getSocialProfile(provider, accessToken);
    console.log(
      `/api/auth/auth.ctrl verifySocial after getSocialProfile profile : ${profile.toString()}`
    );
  } catch (e) {
    console.log(e);
    ctx.status = 401;
    ctx.body = {
      name: "WRONG_CREDENTIAL"
    };
  }

  if (!profile) {
    ctx.status = 401;
    ctx.body = {
      name: "WRONG_CREDENTIAL"
    };
    return;
  }

  let user = null;
  try {
    if (profile.email) {
      user = await User.findByEmail(profile.email);
      console.log(
        `/api/auth/auth.ctrl verifySocial after getSocialProfile user : ${user}`
      );
    }
    ctx.body = {
      profile,
      exists: !!user
    };
  } catch (e) {
    ctx.throw(500, e);
  }
};

//소셜 회원가입 (POST)
exports.socialRegister = async ctx => {
  //데이터 검증
  const schema = Joi.object().keys({
    email: Joi.string()
      .email()
      .required()
      .label("이메일"),
    username: Joi.string()
      .required()
      .label("네임"),
    thumbnail: Joi.string()
      .required()
      .label("썸네일"),
    type: Joi.string()
      .required()
      .label("타입"),
    id: Joi,
    token: Joi
  });

  const result = Joi.validate(ctx.request.body, schema);

  //스키마 검증 실패
  if (result.error) {
    console.log(`여기서 에러난당 ${JSON.stringify(result)}`);
    ctx.status = 400; //Bad Request
    return;
  }
  const { provider } = ctx.params;
  const { token: accessToken } = ctx.request.body; //새로운 변수 이름으로 구조분해 할당
  console.log(`[back/src/api/auth.. /socialRegister 
    provider : ${provider}
    accessToken : ${accessToken}
    `);

  let profile = null;
  try {
    profile = await getSocialProfile(provider, accessToken);
    console.log(`[back/src/api/auth.. /socialRegister 
      profile : ${profile}`);
  } catch (e) {
    ctx.status = 401;
    ctx.body = {
      name: "WRONG_CREDENTIALS"
    };
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

  //계정생성
  let user = null;
  try {
    user = await User.socialRegister(ctx.request.body);
  } catch (e) {
    ctx.throw(500, e);
  }

  ctx.cookies.set("access_token", ctx.request.body.token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7
  });
  console.log(`계정생성 던지기 전 user : ${user}`);
  ctx.body = { user };
  //★★{user} 던져야 user 프로퍼티까지할당됨
  //단순 = user 할당하면 user의 "값"만 할당되서
  //나중에 꺼내쓸때 user로 할당받지 못한다.
};

//소셜 로그인
exports.socialLogin = async ctx => {
  const { accessToken } = ctx.request.body;
  const { provider } = ctx.params;
  if (typeof accessToken !== "string") {
    ctx.status = 400;
    return;
  }
  let profile = null;

  try {
    profile = await getSocialProfile(provider, accessToken);
    if (profile === null || profile === undefined) {
      ctx.status = 401;
      ctx.body = {
        name: "WRONG_CREDENTIALS"
      };
      return;
    }

    let user = await User.findByEmail(profile.email);
    if (!user) {
      ctx.status = 401;
      ctx.body = {
        name: "NOT_REGISTERED"
      };
      return;
    }
    //if user is found,
    let token = null;
    token = await user.generateToken();

    ctx.cookies.set("access_token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7
    });
    console.log(`auth 컨트롤러user : ${JSON.stringify(user)}`);

    ctx.body = { user };
  } catch (e) {
    ctx.status = 401;
    ctx.body = {
      name: "WRONG_CREDENTIALS"
    };
  }
};
