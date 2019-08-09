import axios from "axios";
import queryString from "query-string";

export const getProfile = username => axios.get(`/api/profile/${username}`);
export const uploadThumbnail = data => axios.post(`/api/upload`, data);
export const updateProfile = ({ username, thumbnail }) =>
  axios.post(`/api/profile/${username}`, { username, thumbnail });
export const unregister = username => axios.delete(`/api/profile/${username}`);
