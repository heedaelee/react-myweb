import axios from "axios";
import queryString from "query-string";

//post
export const getPost = id => axios.get(`/api/posts/${id}`);
export const getPostList = ({ tag, page }) =>
  axios.get(`/api/posts/?${queryString.stringify({ tag, page })}`);
export const writePost = ({ title, body, tags, username }) =>
  axios.post(`/api/posts`, { title, body, tags, username });
export const editPost = ({ id, title, body, tags, username }) =>
  axios.patch(`/api/posts/${id}`, { title, body, tags, username });
export const deletePost = ({ id }) =>
  axios.delete(`/api/posts/${id}`);
