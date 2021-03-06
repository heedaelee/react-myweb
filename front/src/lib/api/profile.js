import axios from "axios";
import queryString from "query-string";

export const getProfile = id => axios.get(`/api/profile/${id}`);
export const uploadThumbnail = data => axios.post(`/api/upload`, data);
export const updateProfile = ({ id, username, thumbnail }) =>
  axios.post(`/api/profile`, { id, username, thumbnail });
export const unregister = username => axios.delete(`/api/profile/${username}`);
