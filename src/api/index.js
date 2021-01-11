import axios from "axios";

const url = "http://localhost:5000/posts";
const userUrl = "http://localhost:5000/user";
export const fetchPost = () => axios.get(url);
export const createPost = (newPost, config) => axios.post(url, newPost, config);
export const updatePost = (id, updatedPost, config) =>
  axios.patch(`${url}/${id}`, updatedPost, config);
export const deletePost = (id, config) => axios.delete(`${url}/${id}`, config);
export const likePost = (id, config) =>
  axios.patch(`${url}/${id}/likePost`, {}, config);

export const getUser = (config) => axios.get(userUrl, config);
export const userLogin = (userData) => axios.post(`${userUrl}/login`, userData);
export const userRegister = (userData) =>
  axios.post(`${userUrl}/register`, userData);
