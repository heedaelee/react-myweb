import axios from "axios";
import queryString from "query-string";

//post
export const getPost = (id) => axios.get(`/api/posts/${id}`);
export const getPostList = ({ tag, page }) =>
  axios.get(`/api/posts/?${queryString.stringify({ tag, page })}`);
export const writePost = ({ title, body, tags }) =>
  axios.post(`/api/posts`, { title, body, tags });
export const editPost = ({ id, title, body, tags }) =>
  axios.patch(`/api/posts/${id}`, { title, body, tags });
export const deletePost = (id) => axios.delete(`/api/posts/${id}`);

//auth
export const login = (password) => axios.post('/api/auth/login', { password });
export const checkLogin = () => axios.get('/api/auth/check');
export const logout = () => axios.post('/api/auth/logout');
