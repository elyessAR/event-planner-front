const positionReducer = (state = { positionData: null }, action) => {
  console.log(state);

  if (action.type === "POS") {
    return { ...state, positionData: action?.data };
  } // need this for default case
  else return state;
};

export default positionReducer;
