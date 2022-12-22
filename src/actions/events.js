import * as api from '../api';
import { useNavigate } from 'react-router-dom';

export const getEvent = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'START_LOADING' });
    const { data } = await api.fetchEvent(id);

    dispatch({ type: 'FETCH_EVENT', payload: data });
    dispatch({ type: 'END_LOADING' });
  } catch (error) {
    console.log(error.message);
  }
};

export const getEvents = (page) => async (dispatch) => {
  try {
    dispatch({ type: 'START_LOADING' });
    const { data } = await api.fetchEvents(page);

    dispatch({ type: 'FETCH_ALL', payload: data });
    dispatch({ type: 'END_LOADING' });
  } catch (error) {
    console.log(error.message);
  }
};
export const getEventsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: 'START_LOADING' });
    const { data } = await api.fetchEventsBySearch(searchQuery);
    dispatch({ type: 'FETCH_BY_SEARCH', payload: data });
    dispatch({ type: 'END_LOADING' });
  } catch (error) {
    console.log(error);
  }
};
export const getEventsByLocation = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: 'START_LOADING' });
    const { data } = await api.fetchEventsByLocation(searchQuery);
    dispatch({ type: 'FETCH_BY_LOCATION', payload: data });
    dispatch({ type: 'END_LOADING' });
  } catch (error) {
    console.log(error);
  }
};
export const createEvent = (event, navigate) => async (dispatch) => {
  try {
    dispatch({ type: 'START_LOADING' });
    const { data } = await api.createEvent(event);
    console.log(data);
    console.log(data.title);
    dispatch({ type: 'CREATE', payload: data });
    navigate(`/events/${data._id}`);
  } catch (error) {
    console.log(error);
  }
};
export const updateEvent = (id, event) => async (dispatch) => {
  try {
    const { data } = await api.updateEvent(id, event);
    dispatch({ type: 'UPDATE', payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const deleteEvent = (id) => async (dispatch) => {
  try {
    await api.deleteEvent(id);
    dispatch({ type: 'DELETE', payload: id });
  } catch (error) {
    console.log(error);
  }
};
export const likeEvent = (id) => async (dispatch) => {
  try {
    const { data } = await api.likeEvent(id);
    dispatch({ type: 'LIKE', payload: data });
  } catch (error) {
    console.log(error);
  }
};
