import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchEvent = (id) => API.get(`/events/${id}`);

export const fetchEvents = (page) => API.get(`/events?page=${page}`);

export const createEvent = (newEvent) => API.post('/events', newEvent);
export const updateEvent = (id, eventData) => API.patch(`/events/${id}`, eventData);
export const deleteEvent = (id) => API.delete(`/events/${id}`);
export const likeEvent = (id) => API.patch(`/events/${id}/likeEvent`);
export const fetchEventsBySearch = (searchQuery) => API.get(`/events/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const fetchEventsByLocation = (searchQuery) =>
  API.get(`/events/searchLocation?searchQuery=${searchQuery.searchLocation || 'none'}&tags=${searchQuery.tags}`);

export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);
