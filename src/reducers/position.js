const positionReducer = (state = { positionData: null }, action) => {
  console.log('reducerworks');
  console.log(state);

  if (action.type === 'POS') {
    console.log('this is action data');

    console.log(action?.data);

    return { ...state, positionData: action?.data };
  } // need this for default case
  else return state;
};

export default positionReducer;
