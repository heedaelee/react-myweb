import jwt from "jsonwebtoken";

/* 
JWT 토큰 만들기
@param {any} payload
@returns {string} token
 */

function generateToken(payload) {
  return new Promise((resolve, reject) => {
    // jwt.sign(토큰에 들어갈 데이터, 비밀키, 옵션, 콜백함수)
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        // 만료는 7일
        expiresIn: "7d"
      },
      (error, token) => {
        if (error) reject(error);
        resolve(token);
      }
    );
  });
}

function decodeToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) reject(error);
      resolve(decoded);
    });
  });
}

//jwt미들웨어 : token 여부 체크 후
//              1. 하루도 안남을 시 토큰 재발급
//              2. 유저 정보 ctx.request에 넣어줌
exports.jwtMiddleware = async (ctx, next) => {
  const token = ctx.cookies.get("access_token");
  //ctx서 'access_token' 토큰 읽어옴

  if (!token) return next(); //토큰이 없으면 바로 다음 작업

  try {
    const decoded = await decodeToken(token); //토큰을 디코딩 함

    //토큰 만료일이 하루밖에 안남으면 토큰을 재발급합니다.
    if (Date.now() / 1000 - decoded.iat > 60 * 60 * 24) {
      // 하루가 지나면 갱신해준다.
      const { _id, email } = decoded;
      const newToken = await generateToken({ _id, email }, "user");

      ctx.cookies.set("access_token", newToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7
      });
    }

    // ctx.request.user 에 디코딩된 값을 넣어줍니다.
    ctx.request.user = decoded;
  } catch (err) {
    // token validate 실패
    ctx.request.user = null;
  }

  return next();
};

exports.generateToken = generateToken;
