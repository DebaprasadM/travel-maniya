import axios from 'axios';
const API = axios.create({ 
  baseURL: 
  // process.env.REACT_APP_API_URL || 
  'https://6mqmf6l1-5000.inc1.devtunnels.ms/api' });

export const getPosts = (params = {}) => API.get('/posts', { params }).then(r => r.data);
export const getPost = (id) => API.get(`/posts/${id}`).then(r => r.data);
export const createPost = (payload) => API.post('/posts', payload).then(r => r.data);
export const updatePost = (id, payload) => API.put(`/posts/${id}`, payload).then(r => r.data);
export const deletePost = (id) => API.delete(`/posts/${id}`).then(r => r.data);
