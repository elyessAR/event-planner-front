// eslint-disable-next-line import/no-anonymous-default-export
export default (events = [], action) => {
  switch (action.type) {
    case 'DELETE':
      return events.filter((event) => event._id !== action.payload);
    case 'UPDATE':
      return events.map((event) => (event.id === action.payload._id ? action.payload : event)); // .id and ._id are sooo much different try it in the like case and the like count won't refresh
    case 'LIKE':
      return events.map((event) => (event._id === action.payload._id ? action.payload : event));

    case 'FETCH_ALL':
      return action.payload;
    case 'CREATE':
      return [...events, action.payload];
    default:
      return events;
  }
};
