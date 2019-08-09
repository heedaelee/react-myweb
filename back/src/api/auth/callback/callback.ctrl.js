import axios from "axios";
import qs from "qs";
import { config } from "dotenv";
import crypto from "crypto";

//Dotenv 설정파일 사용(/.env)
config();

const hash = function(password) {
  return crypto
    .createHmac("sha256", process.env.SECRET_KEY)
    .update(password)
    .digest("hex");
};
const baseUrl = "http://localhost:3000/";
const { FACEBOOK_ID, FACEBOOK_SECRET } = process.env;

export const redirectFacebookLogin = async ctx => {
  const state = "/trending";
  const callbackUrl = "http://localhost:4000/api/auth/callback/facebook";

  const authUrl = `https://www.facebook.com/v3.3/dialog/oauth?client_id=${FACEBOOK_ID}&redirect_uri=${callbackUrl}&state=${state}&scope=email,public_profile`;
  console.log(`api/auth/callback.ctrl 페북 요청 url ${authUrl}`);

  ctx.redirect(encodeURI(authUrl));
};

export const facebookCallback = async ctx => {
  const { code, state } = ctx.query;
  console.log(`code : ${code}  state : ${state}`);
  const callbackUrl = "http://localhost:4000/api/auth/callback/facebook";
  if (!code) {
    ctx.redirect(`${baseUrl}/?callback?error=1`);
    return;
  }
  if (!FACEBOOK_ID || !FACEBOOK_SECRET) {
    console.log("Facebook ENVVAR is missing");
    ctx.throw(500);
  }
  try {
    const response = await axios.get(
      `https://graph.facebook.com/v3.3/oauth/access_token?${qs.stringify({
        client_id: FACEBOOK_ID,
        redirect_uri: callbackUrl,
        client_secret: FACEBOOK_SECRET,
        code
      })}`
    );
    console.log(
      `[back/src/api/auth/callback.ctrl facebookCallback response.data: ${
        response.data
      } ]`
    );
    const { access_token } = response.data;
    console.log(`페이스북 받아온 access_token : ${access_token}`);

    if (!access_token) {
      ctx.redirect(`${baseUrl}/?callback?error=1`);
      return;
    }

    let nextUrl = `${baseUrl}callback?type=facebook&key=${access_token}`;
    if (state) {
      const next = state;
      nextUrl += `&next=${next}`;
    }
    ctx.redirect(encodeURI(nextUrl));
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const getToken = async ctx => {
  //facebook, google

  const { key } = ctx.query;
  console.log(
    `[back/src/api/auth/callback.callback.ctrl.js getToken key:${key.toString()} ]`
  );
  try {
    const token = hash(key);
    if (!token) {
      ctx.status = 400;
      return;
    }
    console.log(
      `[back/src/api/auth/callback.callback.ctrl.js getToken after converting token:${token} ]`
    );
    ctx.body = {
      token
    };
  } catch (e) {
    ctx.throw(500, e);
  }
};
