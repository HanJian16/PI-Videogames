
const initialState = {
  allgames: [],
  games: [],
  genres: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_GAMES:
      return {
        ...state,
        countgamesries: action.payload,
        allgames: action.payload,
      };
    
    default:
      return { ...state };
  }
}