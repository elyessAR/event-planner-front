import * as api from '../api/index.js';

export const getPosition = () => async (dispatch) => {
  try {
    console.log('getpositionworks');
    //
    await navigator.geolocation.getCurrentPosition((data) => dispatch({ type: 'POS', data }));
  } catch (error) {
    console.log(error);
  }
};
