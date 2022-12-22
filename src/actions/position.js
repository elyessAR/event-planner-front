import * as api from "../api/index.js";

export const getPosition = () => async (dispatch) => {
  try {
    await navigator.geolocation.getCurrentPosition((data) =>
      dispatch({ type: "POS", data })
    );
  } catch (error) {
    console.log(error);
  }
};
