import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchEvents = () => API.get('/posts');
export const createEvent = (newEvent) => API.post('/posts', newEvent);
export const updateEvent = (id, eventData) => API.patch(`/posts/${id}`, eventData);
export const deleteEvent = (id) => API.delete(`/posts/${id}`);
export const likeEvent = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);
