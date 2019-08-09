import axios from "axios";
import queryString from "query-string";

//auth
export const checkEmailExists = email =>
  axios.get("/api/auth/exists/email/" + email);
export const checkUsernameExists = username =>
  axios.get("/api/auth/exists/username/" + username);

export const localRegister = ({ email, username, password }) =>
  axios.post("/api/auth/register/local", { email, username, password });
export const socialRegister = ({
  id,
  email,
  username,
  thumbnail,
  type,
  token,
  provider
}) =>
  axios.post(`/api/auth/register/${provider}`, {
    id,
    email,
    username,
    thumbnail,
    type,
    token
  });
export const localLogin = ({ email, password }) =>
  axios.post("/api/auth/login/local", { email, password });
export const socialLogin = ({ provider, accessToken }) =>
  axios.post(`/api/auth/login/${provider}`, { accessToken });

export const checkStatus = () => axios.get("/api/auth/check");
export const logout = () => axios.post("/api/auth/logout");
export const getProviderToken = key =>
  axios.get(`api/auth/callback/token?key=${key}`);
export const verifySocial = ({ provider, accessToken }) =>
  axios.post(`api/auth/verify-social/${provider}`, { accessToken });
