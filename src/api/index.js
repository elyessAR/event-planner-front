import axios from 'axios';

const url = 'http://localhost:5000/posts';

export const fetchEvents = () => axios.get(url);
export const createEvent = (newEvent) => axios.post(url, newEvent);
export const updateEvent = (id, eventData) => axios.patch(`${url}/${id}`, eventData);
export const deleteEvent = (id) => axios.delete(`${url}/${id}`);
export const likeEvent = (id) => axios.patch(`${url}/${id}/likePost`);
