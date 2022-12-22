// eslint-disable-next-line import/no-anonymous-default-export
export default (state = { isLoading: true, events: [] }, action) => {
  switch (action.type) {
    case 'FETCH_EVENT':
      return { ...state, event: action.payload };
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };
    case 'DELETE':
      return { ...state, events: state.events.filter((event) => event._id !== action.payload) };
    case 'UPDATE':
      return { ...state, events: state.events.map((event) => (event.id === action.payload._id ? action.payload : event)) }; // .id and ._id are sooo much different try it in the like case and the like count won't refresh
    case 'LIKE':
      return { ...state, events: state.events.map((event) => (event._id === action.payload._id ? action.payload : event)) };

    case 'FETCH_ALL':
      return {
        ...state,
        events: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case 'CREATE':
      return { ...state, events: action.payload };

    case 'FETCH_BY_SEARCH':
      return { ...state, events: action.payload.data };
    case 'FETCH_BY_LOCATION':
      return { ...state, events: action.payload.data };

    default:
      return state;
  }
};
