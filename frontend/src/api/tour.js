import axios from 'axios';
const API = axios.create({
  baseURL:
  //  process.env.REACT_APP_API_URL || 
   'https://6mqmf6l1-5000.inc1.devtunnels.ms/api'
});

export const getTours = (params = {}) => API.get('/tours', { params }).then(r => r.data);
export const getTour = (id) => API.get(`/tours/${id}`).then(r => r.data);
export const createTour = (payload) => API.post('/tours', payload).then(r => r.data);
export const updateTour = (id, payload) => API.put(`/tours/${id}`, payload).then(r => r.data);
export const deleteTour = (id) => API.delete(`/tours/${id}`).then(r => r.data);
