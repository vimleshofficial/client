import axios from 'axios';

const url='http://localhost:5000/posts';
const userUrl='http://localhost:5000/user/';
export const fetchPost=()=>axios.get(url);
export const createPost=(newPost)=>axios.post(url,newPost);
export const updatePost=(id,updatedPost)=>axios.patch(`${url}/${id}`,updatedPost);
export const deletePost=(id)=>axios.delete(`${url}/${id}`);
export const likePost=(id)=>axios.patch(`${url}/${id}/likePost`);
export const userLogin=(userData)=>axios.post(`${userUrl}/login`,userData);

